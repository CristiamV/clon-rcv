"""Derive an AB073XT policy PDF from the 62505 one by rewriting its text runs.

The document uses Helvetica base-14 with WinAnsiEncoding and no embedded
subsets, so text lives in the content streams as literal `(...)` strings and
can be rewritten in place without touching any font resource.

Administrative fields (cedula, address, phone, certificate, receipt number,
dates, coverage amounts) are intentionally left as they are: they are fixture
values shared with the source document.
"""
import re
import sys
from pathlib import Path

import pypdf

SRC = Path(sys.argv[1])  # source 62505 policy
OUT = Path(sys.argv[2])

NAME_OLD = "CRISTIAM VASQUEZ"
NAME_NEW = "EDGAR JESUS COVA MANEIRO"

# literal-string replacements; the leading space some runs carry is preserved
REPLACEMENTS = [
    (f"( {NAME_OLD})", f"( {NAME_NEW})"),          # table rows (regular face)
    (f"({NAME_OLD})", f"({NAME_NEW})"),            # RCV card + signature page (bold)
    ("( RAP86X)", "( AB073XT)"),
    ("(RAP86X)", "(AB073XT)"),
    ("( FIAT)", "( TOYOTA)"),
    ("(FIAT)", "(TOYOTA)"),
    ("( IDEA ADVENTURE / IDEA)", "( PRADO)"),
    ("(IDEA ADVENTURE / IDEA)", "(PRADO)"),
    ("( 2007)", "( 2000)"),
    ("(2007)", "(2000)"),
    ("( VERDE)", "( BLANCO)"),
    ("(VERDE)", "(BLANCO)"),
    ("( L30286202)", "( 9FH11VJ95Y9002113)"),
    ("( SEDAN)", "( SPORT WAGON)"),
    ("( 9BD1351872050373)", "( 9FH11VJ95Y9002113)"),
    ("(9BD1351872050373)", "(9FH11VJ95Y9002113)"),
    ("(62505)", "(AB073XT)"),
    # RCV card label, drawn as a hex string: "POLIZA - 062505" with the source's
    # own mojibake on the O. Only the numeric tail changes.
    ("504F4CCD5A41202D20303632353035", "504F4CCD5A41202D2041423037335854"),
]

writer = pypdf.PdfWriter(clone_from=SRC)
total = 0
for pi in (0, 3):
    page = writer.pages[pi]
    contents = page["/Contents"]
    items = contents if isinstance(contents, list) else [contents]
    for item in items:
        obj = item.get_object()
        text = obj.get_data().decode("latin-1")
        before = text
        for old, new in REPLACEMENTS:
            text = text.replace(old, new)
        if text != before:
            n = sum(before.count(o) for o, _ in REPLACEMENTS)
            total += n
            obj.set_data(text.encode("latin-1"))
            print(f"  pagina {pi}: {n} reemplazos")
            for old, new in REPLACEMENTS:
                c = before.count(old)
                if c:
                    print(f"      {old!r:<32} x{c} -> {new!r}")

writer.write(OUT)
print(f"\ntotal reemplazos: {total}")
print(f"escrito: {OUT} ({OUT.stat().st_size} bytes)")

# sanity: nothing from the old identity should survive in the text layer
r = pypdf.PdfReader(OUT)
leftovers = []
for pi, page in enumerate(r.pages):
    t = page.extract_text() or ""
    for needle in ("CRISTIAM", "VASQUEZ", "RAP86X", "9BD1351872050373", "L30286202"):
        if needle in t:
            leftovers.append((pi, needle))
print("restos del original:", leftovers if leftovers else "ninguno")
