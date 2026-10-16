"""Retarget the verification QR codes inside a policy PDF to a new URL.

The QR is pure vector graphics: the origin draws it as PDF path operators inside
a 200x200 local coordinate space, positioned by a `cm` matrix. We keep the
origin's own positioning matrices verbatim and swap only the module paths, so
the new symbol lands exactly on the old footprint.

The matrices in BLOCKS are specific to this document's layout: one QR in the
header table and one on the RCV card. Re-derive them with
`pdfium` + `zxingcpp` if the template changes.

Usage:
    python tools/retarget-qr.py <in.pdf> <out.pdf> <new-url>

Requires: see tools/requirements.txt
"""
import re
import sys
import zlib
from pathlib import Path

import pypdf
import qrcode

SRC = Path(sys.argv[1])
OUT = Path(sys.argv[2])
NEW_URL = sys.argv[3]
ECC = {"L": qrcode.constants.ERROR_CORRECT_L, "M": qrcode.constants.ERROR_CORRECT_M,
       "Q": qrcode.constants.ERROR_CORRECT_Q, "H": qrcode.constants.ERROR_CORRECT_H}

TOK = re.compile(r"(?<![A-Za-z0-9])(q|Q)(?![A-Za-z0-9])")

# Each entry: a marker that uniquely identifies the block's opening `q`,
# and the literal matrix prefix to reuse (which may open extra `q` levels).
BLOCKS = [
    {
        "marker": "q\n0.251 0.000 0.000 0.251 402.526 705.951 cm",
        "cm": ("0.251 0.000 0.000 0.251 402.526 705.951 cm\n"
               "1.000 0.000 0.000 -1.000 0.000 200.000 cm\n"),
        "label": "header QR",
    },
    {
        "marker": ("q\n1.000 0.000 0.000 1.000 -14.137 0.000 cm\n"
                   "q\n0.244 0.000 0.000 0.244 347.586 123.882 cm"),
        "cm": ("1.000 0.000 0.000 1.000 -14.137 0.000 cm\n"
               "q\n0.244 0.000 0.000 0.244 347.586 123.882 cm\n"
               "1.000 0.000 0.000 -1.000 0.000 200.000 cm\n"),
        "label": "RCV card QR",
    },
]


def block_span(stream: str, marker: str):
    """Return (start, end) of the balanced q...Q group opened at `marker`."""
    start = stream.index(marker)
    depth, started = 0, False
    for m in TOK.finditer(stream):
        pos, t = m.start(), m.group(0)
        if pos < start:
            continue
        if not started:
            if t != "q":
                continue
            started, depth = True, 1
            continue
        depth += 1 if t == "q" else -1
        if depth == 0:
            return start, m.end()
    raise RuntimeError(f"unbalanced block at {start}")


def qr_paths(url: str, ecc_level: str):
    """QR matrix -> run-merged PDF `re` operators in module units."""
    qr = qrcode.QRCode(error_correction=ECC[ecc_level], border=0)
    qr.add_data(url)
    qr.make(fit=True)
    matrix = qr.get_matrix()
    n = len(matrix)
    rects = []
    for r, row in enumerate(matrix):
        c = 0
        while c < n:
            if row[c]:
                a = c
                while c < n and row[c]:
                    c += 1
                rects.append(f"{a} {r} {c - a} 1 re")
            else:
                c += 1
    return n, "\n".join(rects)


def make_block(cm_prefix: str, paths: str, scale: float) -> str:
    """Balanced q...Q group: white backing plate, then the module paths."""
    body = ("q\n" + cm_prefix +
            "q\n1.000 1.000 1.000 rg\n0.000 0.000 200.000 200.000 re\nf\nQ\n"
            f"q\n0.000 0.000 0.000 rg\n"
            f"{scale:.6f} 0.000 0.000 {scale:.6f} 0.000 0.000 cm\n"
            f"q\n{paths}\nf\n")
    toks = TOK.findall(body)
    return body + "Q\n" * (toks.count("q") - toks.count("Q"))


def main():
    ecc = "H"
    n, paths = qr_paths(NEW_URL, ecc)
    scale = 200.0 / n
    print(f"url      : {NEW_URL}")
    print(f"symbol   : {n}x{n} modules (version {(n - 17) // 4}), ECC={ecc}")
    print(f"module   : {scale:.6f} units of the 200x200 box")

    writer = pypdf.PdfWriter(clone_from=SRC)
    page = writer.pages[0]
    contents = page["/Contents"]

    target = None
    for i, item in enumerate(contents):
        obj = item.get_object()
        data = obj.get_data().decode("latin-1")
        if all(b["marker"].split("\n")[1] in data for b in BLOCKS):
            target, entry = obj, i
            break
    if target is None:
        raise SystemExit("no content stream contains the QR blocks")

    data = target.get_data().decode("latin-1")
    print(f"stream   : /Contents[{entry}], {len(data)} bytes")

    spans = []
    for b in BLOCKS:
        start, end = block_span(data, b["marker"])
        replacement = make_block(b["cm"], paths, scale)
        spans.append((start, end, replacement))
        print(f"  {b['label']:<14} [{start},{end}) {end - start:>6} -> "
              f"{len(replacement):>5} bytes")

    for start, end, replacement in sorted(spans, reverse=True):
        data = data[:start] + replacement + data[end:]

    raw = data.encode("latin-1")
    target.set_data(raw)  # pypdf re-applies /FlateDecode itself; give it decoded bytes
    print(f"stream   : {len(raw)} bytes (pypdf re-compresses on write)")

    writer.write(OUT)
    print(f"wrote    : {OUT} ({OUT.stat().st_size} bytes, source {SRC.stat().st_size})")


if __name__ == "__main__":
    main()
