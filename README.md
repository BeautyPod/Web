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
| `podology.html` | Podología preventiva (grietas, callosidades, uñas, hongos, mal olor) |
| `estetica.html` | Servicios estéticos (hidratación, pedicura, terapia y masajes) |
| `sobre-nosotros.html` | Sobre BeautyPod y la especialista |
| `digital_card.html` | Tarjeta de presentación digital de la especialista |
| `blog.html` | Listado del blog y artículos |
| `articles/` | Ocho artículos sobre hongos, uñas encarnadas, durezas, grietas, callosidades y cuidado de los pies |
| `tienda.html` | Productos y recomendaciones |
| `robots.txt` | Reglas para buscadores |
| `sitemap.xml` | Mapa del sitio |
| `llms.txt` | Resumen del sitio para asistentes de IA y modelos de lenguaje |
| `google2fcfd2d2203d5d6a.html` | Verificación de Google Search Console |

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
│   └── article_talones.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── blog.js
│   │   └── components.js
│   └── img/
│       ├── beautypod-logo.svg
│       ├── favicon.svg
│       ├── hero.webp, hero-600.webp, hero-900.webp
│       ├── EsteticaHero.webp, EsteticaHero-600.webp, EsteticaHero-900.webp
│       └── imágenes de servicios y artículos (WebP/JPG)
└── README.md
```

## Decisiones de arquitectura

- **HTML semántico:** `header`, `nav`, `main`, `section`, `article`, `footer`; un solo `<h1>` por página; preguntas frecuentes con `<details>/<summary>` nativos.
- **Estilos coherentes:** variables en `:root` (color, tipografía, espaciado) y componentes reutilizables (`.card`, `.btn`, tiras de WhatsApp) en una sola hoja de estilos.
- **Mobile-first:** estilos base para móvil y `@media (min-width)` para tablet y escritorio.
- **Tipografías:** Cardo e Inter, con *system serif* y *system sans-serif* como respaldo.
- **JavaScript mínimo:** solo si aporta un valor real; el sitio funciona sin él.
- **Rendimiento:** imágenes con `width`/`height`, `srcset` responsivo, `loading="lazy"` fuera de la primera pantalla y preload con `fetchpriority="high"` para los heroes.
- **SEO técnico y de contenido:** `title` y `meta description` únicos por página, Open Graph, `canonical`, datos estructurados `LocalBusiness` (JSON-LD), `alt` en imágenes, URLs limpias y descriptivas.
- **Accesibilidad:** enlace "Saltar al contenido", foco visible, navegación por teclado, contraste suficiente, enlaces y botones con nombre claro, iconos decorativos con `aria-hidden`.
- **Seguridad:** sin formularios propios ni backend (el contacto es un enlace a WhatsApp) y enlaces externos con `rel="noopener noreferrer"`.

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

Para ver el sitio en tu computadora antes de subirlo, abre la carpeta en VS Code y usa la extensión *Live Server*.

## Pendientes

- [ ] **Dominio propio:** hoy el sitio vive en `beautypod.github.io/Web/`. Al tener dominio, actualizar `canonical`, Open Graph, JSON-LD, `robots.txt` y `sitemap.xml`, y añadirlo en *Settings → Pages → Custom domain*.
- [ ] **Opiniones:** añadir más testimonios reales (con permiso de los clientes). 
- [ ] **`llms.txt`:** actualizar las URLs cuando haya dominio propio.

## Créditos

Contenido y marca: BeautyPod. Imágenes provisionales: [Unsplash](https://unsplash.com).
