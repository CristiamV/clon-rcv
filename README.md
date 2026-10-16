# Clon estático — La Venezolana de Seguros

Copia estática, sin backend, de dos pantallas del portal de La Venezolana de Seguros:

- `index.html` — detalle del contrato **#62505** (póliza de automóvil individual, FIAT IDEA, placa RAP86X).
- `login.html` — pantalla de ingreso.

Se usa para pruebas y se publica en GitHub Pages. Todos los assets (CSS, JS, tipografías de iconos e imágenes) se copiaron localmente, así que el clon **no depende del servidor de producción** para renderizar.

> ⚠️ **El PDF de este repo no es un documento válido.** Su QR de verificación fue reapuntado a un clon personal, mientras el texto impreso sigue afirmando que la verificación ocurre en el dominio oficial de la aseguradora. Un documento así es indistinguible de una póliza falsificada: no lo distribuyas, no lo presentes como comprobante y no lo saques del entorno de prueba.

## Correr localmente

```bash
python -m http.server 8000
# abrir http://localhost:8000/
```

Abrirlo con doble clic (`file://`) también funciona, pero conviene el servidor para que las rutas relativas se comporten igual que en Pages.

## Descargar el PDF

El botón **DESCARGAR CONTRATO** de `index.html` descarga el Cuadro Póliza local:

| Archivo | Vigencia | Uso |
| --- | --- | --- |
| `assets/pdf/contrato-62505.pdf` | 16/10/2026 – 16/10/2027 | Descarga del botón (vigente) |
| `assets/pdf/contrato-62505-old.pdf` | 16/10/2025 – 16/10/2026 | Versión anterior, sin enlace en la UI |

## QR de verificación

`assets/pdf/contrato-62505.pdf` trae **dos** QR en la primera página (uno en el encabezado, otro en el carnet de RCV). Los dos apuntan ahora a:

```
https://cristiamv.github.io/clon-rcv/
```

El original apuntaba a `https://canal.lavenezolanadeseguros.com/contracts/ver/<token>`. El QR es **vectorial** (paths PDF en un espacio local de 200×200), así que el script conserva las matrices de posicionamiento del original y reemplaza sólo los paths de los módulos: el símbolo cae exactamente sobre la huella anterior. Se regeneró como versión 5 (37×37) con corrección de errores H, así que los módulos quedaron **más grandes** que los originales (0.88pt → 1.32pt) y por lo tanto más fáciles de escanear.

Para cambiar la URL destino:

```bash
pip install -r tools/requirements.txt
python tools/retarget-qr.py assets/pdf/contrato-62505.pdf /tmp/out.pdf "https://otra-url/"
```

Después verificar **siempre** que decodifique antes de reemplazar el archivo:

```bash
python -c "
import pypdfium2 as pdfium, zxingcpp
d = pdfium.PdfDocument('/tmp/out.pdf')
for b in zxingcpp.read_barcodes(d[0].render(scale=150/72).to_pil()): print(b.text)
"
```

> ⚠️ El texto impreso junto al QR sigue diciendo *"Documento válido únicamente si su verificación mediante código QR se realiza desde nuestro dominio oficial. canal.lavenezolanadeseguros.com"*. Con el QR apuntando al clon, esa frase ya no describe lo que hace el documento.

## Qué NO funciona (y es esperado)

Este clon es sólo front-end. Todas las rutas que necesitan servidor se dejaron inertes a propósito, para no golpear producción desde un entorno de prueba:

- **DESCARGAR CARNET** — deshabilitado: no existe un PDF de carnet suelto. El contenido del carnet (la tarjeta «Seguro de RCV») **sí** está incluido al pie de la primera página de `contrato-62505.pdf`, pero no como archivo aparte. Si querés el botón activo, recortá esa sección a su propio PDF y apuntá el `href` ahí.
- **Formularios** (`contracts/create`, `login`, `pictures/edit`, `pictures/save`) — neutralizados con `onsubmit="return false;"`. No envían nada.
- **Olvidaste tu contrasena?** — deshabilitado, requiere backend.
- **VOLVER** — apunta a `index.html`, porque no hay panel de administración en el clon.
- `markAsRead()` / `markAllAsRead()` — quedaron en el JS heredado, pero no los dispara ningún elemento de estas dos pantallas.

## Notas

- Los `<meta name="csrf-token">` y los `_token` de los formularios son los del HTML original. Son tokens de sesión ya vencidos e inservibles sin la cookie de sesión, pero conviene saber que están ahí.
- `instascan` se vendorizó desde jsDelivr porque el `rawgit.com` original ya no existe (devuelve 404). La página original tampoco lo cargaba.
- La única dependencia remota que queda es Google Fonts (Open Sans).
