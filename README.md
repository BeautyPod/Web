# BeautyPod — sitio web

Sitio web estático (HTML + CSS, con JavaScript solo donde aporta valor) de **BeautyPod**, negocio de podología preventiva y pedicura en **Matanzas, Cuba**. Migrado desde WordPress a un proyecto estático, publicado con GitHub Pages.

- **Sitio publicado:** https://beautypod.github.io/Web/
- **Palabra clave principal:** Pedicura y podología en Matanzas
- **Contacto / reservas:** WhatsApp +53 5371 9118

---

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Portada: servicios, por qué confiar, equipo, opiniones, preguntas frecuentes y reserva |
| `podology.html` | Podología preventiva (grietas, callosidades, uñas, hongos, mal olor), opiniones y preguntas frecuentes |
| `estetica.html` | Servicios estéticos (hidratación, pedicura, terapia y masajes), combos y opiniones |
| `sobre-nosotros.html` | Sobre BeautyPod y la especialista |
| `digital_card.html` | Tarjeta de presentación digital de la especialista |
| `blog.html` | Biblioteca de artículos con buscador y filtros por tema |
| `articles/` | Doce artículos: hongos, uñas encarnadas, durezas, grietas, callosidades, antifúngicos, cremas, talones y calzado para entrenar |
| `tienda.html` | Productos y recomendaciones, con pedido por WhatsApp |
| `robots.txt` | Reglas para buscadores |
| `sitemap.xml` | Mapa del sitio (todas las páginas y los 12 artículos) |
| `llms.txt` | Resumen del sitio para asistentes de IA y modelos de lenguaje |
| `google2fcfd2d2203d5d6a.html` | Verificación de Google Search Console (archivo HTML, no etiqueta meta) |

> Los nombres de archivo deben coincidir con los enlaces del menú y del sitemap. Si renombras uno, actualiza ambos.

## Estructura del proyecto

```
Web/
├── index.html
├── podology.html
├── estetica.html
├── sobre-nosotros.html
├── digital_card.html
├── blog.html
├── tienda.html
├── google2fcfd2d2203d5d6a.html
├── robots.txt
├── sitemap.xml
├── llms.txt
├── articles/
│   ├── article_antifungicos.html
│   ├── article_callovph.html
│   ├── article_cremas.html
│   ├── article_durezas.html
│   ├── article_encarnadas.html
│   ├── article_hongos_recurrentes.html
│   ├── article_onico.html
│   ├── article_talones.html
│   ├── article_zapatillas_calzado_hiperflexible.html
│   ├── article_zapatillas_hipertrofia.html
│   ├── article_zapatillas_riesgos.html
│   └── article_zapatillas_running.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── blog.js
│   │   └── components.js
│   └── img/
│       ├── beautypod-logo.svg
│       ├── favicon.svg
│       ├── og/ (imágenes para compartir en redes)
│       ├── hero.webp, hero-600.webp, hero-900.webp
│       ├── EsteticaHero.webp, EsteticaHero-600.webp, EsteticaHero-900.webp
│       └── imágenes de servicios, productos y artículos (WebP/JPG)
└── README.md
```

## Decisiones de arquitectura

- **HTML semántico:** `header`, `nav`, `main`, `section`, `article`, `footer`; un solo `<h1>` por página; preguntas frecuentes con `<details>/<summary>` nativos.
- **Estilos coherentes:** variables en `:root` (color, tipografía, espaciado) y componentes reutilizables (`.card`, `.btn`, tiras de WhatsApp) en una sola hoja de estilos.
- **Mobile-first:** estilos base para móvil y `@media (min-width)` para tablet y escritorio.
- **Tipografías:** Cardo e Inter, cargadas sin bloquear el renderizado (con `<noscript>` de respaldo), y *system serif* / *system sans-serif* como respaldo.
- **Header y footer:** se insertan con `assets/js/components.js`. Cada página lleva un `<noscript>` con los enlaces principales.
- **JavaScript mínimo:** menú, buscador del blog y tienda. La tienda se edita en el bloque de configuración al final de `tienda.html` (número, mensaje, productos y precios).
- **Rendimiento:** imágenes con `width`/`height`, `srcset` responsivo, `loading="lazy"` fuera de la primera pantalla y preload con `fetchpriority="high"` para los heroes.
- **SEO técnico y de contenido:** `title` y `meta description` únicos por página, Open Graph, `twitter:card`, `canonical`, datos estructurados JSON-LD, `alt` en imágenes, URLs limpias, `sitemap.xml` y `robots.txt`.
- **Analítica:** Google Analytics 4, cargado después de que la página termina de cargar.
- **Mensajes de WhatsApp:** todos empiezan con `[PW]` (página web) para saber de dónde viene el mensaje.
- **Accesibilidad:** enlace "Saltar al contenido", foco visible, navegación por teclado, contraste suficiente, enlaces y botones con nombre claro, iconos decorativos con `aria-hidden`.
- **Seguridad:** sin formularios propios ni backend (el contacto es un enlace a WhatsApp) y enlaces externos con `rel="noopener noreferrer"`.
- **Precios orientativos:** no se añaden por privacidad y la competencia".
- **Dominio propio:** no por ahora ya q hay sanciones internacionales para Cuba
- **Mapa:** esta en el pie de components.js

## Información del negocio

- **Ubicación:** BeautyPod, Calle 298 y Calle 131, Matanzas
- **Reservas (mensaje/WhatsApp):** lunes a viernes, 9:00 am – 8:00 pm; sábados y domingos, horario variable
- **Atención con la especialista (solo con cita previa):** lunes a viernes, 10:00 am – 3:00 pm
- **Pagos:** efectivo (CUP y otras monedas) y transferencia (Transfermóvil)

## Cómo publicar cambios

Sin necesidad de instalar nada:

1. Entra a https://github.com/BeautyPod/Web
2. **Add file → Upload files** y arrastra los archivos nuevos o modificados (respeta las carpetas, por ejemplo `assets/css/`).
3. Escribe un mensaje breve del cambio y pulsa **Commit changes**.
4. En 1–2 minutos GitHub Pages actualiza https://beautypod.github.io/Web/.

Para cambios pequeños, abre el archivo en GitHub, pulsa el lápiz (**Edit**), cambia el texto y pulsa **Commit changes**.

Para ver el sitio en tu computadora antes de subirlo, abre la carpeta en VS Code y usa la extensión *Live Server*.

**Al añadir un artículo nuevo:** súbelo a `articles/`, agrégalo a `blog.html` (tarjeta y lista JSON-LD) y a `sitemap.xml`.




## Créditos

Contenido y marca: BeautyPod. Algunas imágenes provisionales: [Unsplash](https://unsplash.com).