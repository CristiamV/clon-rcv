# Clon estático — La Venezolana de Seguros

Copia estática, sin backend, de dos pantallas del portal de La Venezolana de Seguros:

- `index.html` — detalle del contrato **#62505** (póliza de automóvil individual, FIAT IDEA, placa RAP86X).
- `login.html` — pantalla de ingreso.

Se usa para pruebas y se publica en GitHub Pages. Todos los assets (CSS, JS, tipografías de iconos e imágenes) se copiaron localmente, así que el clon **no depende del servidor de producción** para renderizar.

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

## Qué NO funciona (y es esperado)

Este clon es sólo front-end. Todas las rutas que necesitan servidor se dejaron inertes a propósito, para no golpear producción desde un entorno de prueba:

- **DESCARGAR CARNET** — deshabilitado. El carnet es otro documento y no se incluyó ningún PDF para él. Para habilitarlo, dejá el archivo en `assets/pdf/` y apuntá el `href` a esa ruta.
- **Formularios** (`contracts/create`, `login`, `pictures/edit`, `pictures/save`) — neutralizados con `onsubmit="return false;"`. No envían nada.
- **Olvidaste tu contrasena?** — deshabilitado, requiere backend.
- **VOLVER** — apunta a `index.html`, porque no hay panel de administración en el clon.
- `markAsRead()` / `markAllAsRead()` — quedaron en el JS heredado, pero no los dispara ningún elemento de estas dos pantallas.

## Notas

- Los `<meta name="csrf-token">` y los `_token` de los formularios son los del HTML original. Son tokens de sesión ya vencidos e inservibles sin la cookie de sesión, pero conviene saber que están ahí.
- `instascan` se vendorizó desde jsDelivr porque el `rawgit.com` original ya no existe (devuelve 404). La página original tampoco lo cargaba.
- La única dependencia remota que queda es Google Fonts (Open Sans).
