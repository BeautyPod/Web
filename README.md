# BeautyPod — sitio web

Landing page estática (HTML + CSS puro, sin JavaScript) para el negocio de podología y cuidado de pies **BeautyPod**, en Matanzas, Cuba. Migrado desde WordPress a un sitio estático listo para GitHub Pages, Netlify, Vercel o cualquier hosting estático.

## Estructura del proyecto

```
beautypod-site/
├── index.html          # Toda la página (una sola landing, con anclas por sección)
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   └── styles.css  # Única hoja de estilos: tokens + componentes reutilizables
│   └── img/
│       └── favicon.svg
└── README.md
```

## Decisiones de arquitectura

- **HTML semántico**: `header` / `nav` / `main` / `section` / `article` / `footer`, encabezados jerárquicos (un solo `<h1>`), `<address>` para el contacto, `<details>/<summary>` nativos para las preguntas frecuentes (accesibles sin una línea de JavaScript).
- **CSS coherente**: variables (`:root`) para color, tipografía y espaciado; una sola hoja de estilos con componentes reutilizables (`.card`, `.btn`, `.whatsapp-strip`) en vez de estilos repetidos por sección como en el WordPress original.
- **Mobile-first**: todos los estilos base son para móvil; los `@media` usan `min-width` para escalar hacia tablet (600px) y escritorio (960px / 1200px).
- **Cero JavaScript**: no aportaba valor suficiente para justificarlo (el acordeón de FAQ usa `<details>` nativo).
- **Rendimiento**: imágenes con `width`/`height` explícitos (evita saltos de layout), `loading="lazy"` en todo lo que no es la primera pantalla, `fetchpriority="high"` en la imagen del hero, `preconnect` a Unsplash.
- **SEO**: `title`/`meta description` únicos, Open Graph, `rel="canonical"`, datos estructurados `LocalBusiness` (JSON-LD) con dirección, teléfono y horarios, `robots.txt` y `sitemap.xml`.
- **Accesibilidad**: enlace "saltar al contenido", foco visible (`:focus-visible`), iconos decorativos marcados `aria-hidden`, contraste alto sobre fondo oscuro, `aria-labelledby` en cada sección.
- **Seguridad / superficie de ataque mínima**: sin formularios propios ni backend (el contacto es por enlace a WhatsApp), sin dependencias de JavaScript de terceros, todos los enlaces externos usan `rel="noopener noreferrer"`.

## Pendientes antes de publicar

- [ ] **Dominio real**: reemplazar `https://www.beautypod-matanzas.cu/` en `index.html` (canonical, Open Graph, JSON-LD) y en `robots.txt` / `sitemap.xml`.
- [ ] **Respuestas del FAQ**: las 4 respuestas actuales son de ejemplo (marcadas con `<!-- TODO -->` en el código); pídele el contenido real al negocio.
- [ ] **Segunda tarjeta de "Especialista"**: el texto de "Sobre BeautyPod" es un borrador de ejemplo (marcado con `<!-- TODO -->`); reemplázalo con contenido real del negocio.
- [ ] **Imágenes**: se mantienen las de stock de Unsplash (hotlinked) que ya traía el sitio, tal como se pidió. Para producción se recomienda descargarlas, convertirlas a **WebP** u **AVIF**, y servirlas desde `assets/img/` para no depender de un dominio externo ni de su disponibilidad/rendimiento.
- [ ] **Favicon**: el de `assets/img/favicon.svg` es un placeholder con los colores de marca; sustitúyelo por el logo real si existe.

## Cómo publicarlo en GitHub Pages

1. Sube esta carpeta como la raíz de tu repositorio (o de la rama `gh-pages`).
2. En GitHub: Settings → Pages → Source → selecciona la rama y carpeta raíz.
3. GitHub te da una URL `https://usuario.github.io/repositorio/`; si usas un dominio propio, agrégalo en Settings → Pages → Custom domain y actualiza los TODOs de dominio mencionados arriba.
