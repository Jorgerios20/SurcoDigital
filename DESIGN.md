# Surco Digital — Guía de diseño

Versión 1.0 · Enfoque griego

## 1. Concepto del logo

El isotipo son las iniciales **JR** trazadas como una **greca griega**: tres líneas paralelas en ángulo recto que forman un surco. Cuenta la historia de Jorge (*Georgios*, "el que trabaja la tierra").

| Elemento | Significado |
|---|---|
| **Greca de tres líneas** | El surco: la base que se abre para sembrar |
| **Teselas** (pierna de la R) | El mosaico griego convertido en píxeles: lo digital |
| **Rama de laurel geométrica** | Crecimiento y logro. Equilibra en diagonal a las teselas: lo clásico arriba, lo digital abajo |
| **Inclinación de 10°** | Movimiento hacia adelante: el negocio avanza |

## 2. Construcción

- Retícula base: **u = 12**.
- Cada franja son 3 líneas de 7 de grosor con 12 de separación. La franja completa mide **31 de ancho**.
- La J y la R comparten el fuste vertical.
- Las teselas miden 8 × 8 y están en una escalera de 5 filas × 3 columnas, sobre la retícula.
- El laurel crece a 45° desde la esquina superior izquierda del fuste. Sus hojas son rombos en dos tonos.
- Todo el isotipo va inclinado (skewX) **−10°**.

## 3. Versiones

| Versión | Cuándo usarla |
|---|---|
| **Logotipo horizontal** | Versión principal: web, encabezados, facturas, firmas de correo |
| **Logotipo vertical** | Espacios cuadrados o altos: portadas, tarjetas, redes |
| **Isotipo** | Cuando la marca ya se conoce: sellos, marcas de agua, papelería |
| **Isotipo simplificado** | Tamaños pequeños (menos de 48 px): favicon, iconos de pestaña |
| **App icon** | Ícono de app, acceso directo, PWA |
| **Avatar** | Foto de perfil en redes sociales y WhatsApp Business |

Cada versión existe en estas variantes:

- **color**: para fondos blancos o claros.
- **negativo**: para fondos verde noche `#14301F` o verde bosque `#1F4A34`.
- **mono-negro** y **mono-blanco**: para una sola tinta (sellos, grabado, fotocopias).
- **mono-verde**: isotipo en un solo verde.

## 4. Área de protección y tamaños mínimos

- **Área de protección:** alrededor del logo deja libre al menos **x**, donde x = el ancho de una franja de la greca (las 3 líneas juntas, ≈ 14 % de la altura del isotipo). Ningún texto ni imagen entra en esa zona.
- **Tamaños mínimos:**

| Pieza | Pantalla | Impresión |
|---|---|---|
| Isotipo completo | 48 px | 15 mm |
| Isotipo simplificado | 16 px | 6 mm |
| Logotipo horizontal | 180 px de ancho | 45 mm |
| Logotipo vertical | 120 px de ancho | 30 mm |

## 5. Paleta de color

| Nombre | HEX | RGB | Uso |
|---|---|---|---|
| Verde bosque | `#1F4A34` | 31, 74, 52 | Color principal: isotipo, "SURCO", botones |
| Verde medio | `#4E7F2E` | 78, 127, 46 | "DIGITAL", enlaces, acentos sobre fondo claro |
| Verde brote | `#7CB342` | 124, 179, 66 | Greca, teselas, detalles (no para texto chico sobre blanco) |
| Verde brote claro | `#8BC34A` | 139, 195, 74 | Acentos sobre fondos oscuros |
| Noche | `#14301F` | 20, 48, 31 | Fondos oscuros |
| Marfil verde | `#E8EFE3` | 232, 239, 227 | Isotipo y texto sobre fondos oscuros |
| Gris pizarra | `#3B4740` | 59, 71, 64 | Texto de párrafo |

Para imprenta, pide prueba de color: los valores CMYK/Pantone se definen con el impresor a partir de los HEX.

```css
:root {
  --surco-bosque: #1F4A34;
  --surco-medio: #4E7F2E;
  --surco-brote: #7CB342;
  --surco-brote-claro: #8BC34A;
  --surco-noche: #14301F;
  --surco-marfil: #E8EFE3;
  --surco-texto: #3B4740;
}
```

## 6. Tipografía

**Sora** (Google Fonts, licencia libre OFL).

| Uso | Estilo |
|---|---|
| Logotipo | "SURCO" en Bold 700 y "DIGITAL" en Regular 400, MAYÚSCULAS, espaciado entre letras +0.12 em |
| Títulos | Sora Bold 700 o SemiBold 600 |
| Texto | Sora Regular 400 |

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
```

En los archivos del logo el texto ya está **convertido a curvas**, así que no hace falta instalar la fuente para usarlos.

## 7. Uso en web

Copia el contenido de `web/` a la raíz pública del sitio y agrega en el `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#1F4A34">
```

Logo en el encabezado:

```html
<a href="/" aria-label="Surco Digital — inicio">
  <img src="/logo.svg" alt="Surco Digital" height="56">
</a>
```

Usa siempre **SVG** en web porque se ve nítido en cualquier pantalla. Usa PNG solo donde no se acepte SVG (redes sociales, correos).

## 8. Usos incorrectos

- No cambies los colores fuera de la paleta.
- No estires ni deformes el logo. Escala siempre proporcionalmente.
- No le agregues sombras, brillos ni contornos.
- No cambies la inclinación ni rotes el isotipo.
- No separes el laurel ni las teselas del isotipo.
- No pongas la versión color sobre fondos oscuros ni sobre fotos con mucho detalle; usa la negativa.
- No reescribas "Surco Digital" con otra tipografía.

## 9. Contenido del paquete

```
surco-digital-logo/
├── Surco-Digital-Logo.pdf      Logos en vector, uno por página
├── PRODUCTO.md                  Producto y marca
├── DESIGN.md                    Esta guía
├── svg/
│   ├── isotipo/                 color, negativo, mono-verde, mono-negro, mono-blanco, simplificado
│   ├── logotipo/                horizontal y vertical: color, negativo, mono-negro, mono-blanco
│   └── iconos/                  app icon, app icon simplificado, avatar para redes
├── png/
│   ├── isotipo/                 64, 128, 256, 512, 1024 px (fondo transparente)
│   ├── logotipo/                horizontal 1200 y 2400 px · vertical 800 y 1600 px
│   └── iconos/                  app icon 180–1024 px · simplificado 16–64 px · avatar 512 y 1080 px
└── web/                         favicon.ico, favicon.svg, apple-touch-icon.png, icon-192/512.png,
                                 site.webmanifest, logo.svg, logo-negativo.svg
```

Para editar en Illustrator, abre cualquier `.svg` o el PDF: todas las piezas son vectoriales y editables por nodos.
