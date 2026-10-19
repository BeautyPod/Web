// ============================================================
// BeautyPod - Componentes reutilizables
// Header y Footer compartidos en las páginas
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const assetPrefix = window.location.pathname.includes("/articles/") ? "../" : "";

  // ==========================================================
  // HEADER (inyectamos el contenido dentro de #site-header, no un <header> adicional)
  // ==========================================================
  const headerContainer = document.getElementById("site-header");

  try {
    if (headerContainer) {
      headerContainer.innerHTML = `
        <div class="container header-inner">

          <a href="${assetPrefix}index.html" class="logo">
            <img
              src="${assetPrefix}assets/img/beautypod-logo.svg"
              alt=""
              width="42"
              height="42"
              loading="eager"
              decoding="async"
              style="display:inline-block; width:42px; height:42px; object-fit:contain; vertical-align:middle; margin-right:8px;"
            >
            BeautyPod
          </a>

          <nav class="main-nav" aria-label="Navegación principal">
            <ul class="nav-list">

              <li><a href="${assetPrefix}index.html">Inicio</a></li>
              <li><a href="${assetPrefix}podology.html">Podología</a></li>
              <li><a href="${assetPrefix}estetica.html">Estética</a></li>
              <li><a href="${assetPrefix}blog.html">Blog</a></li>
              <li><a href="${assetPrefix}tienda.html">Tienda</a></li>
              <li><a href="${assetPrefix}sobre-nosotros.html">Sobre nosotros</a></li>

            </ul>
          </nav>

          <a
            class="btn btn--primary btn--sm"
            href="https://wa.me/5353719118?text=%5BPW%5D%20Hola%2C%20quiero%20reservar%20una%20cita"
            target="_blank"
            rel="noopener noreferrer">
            Reservar cita
            <span class="sr-only"> por WhatsApp (se abre en una pestaña nueva)</span>
          </a>

        </div>
      `;

      // ========================================================
      // Detectar automáticamente la página y marcar el enlace activo
      // ========================================================
      (function markCurrentLink() {
        const links = headerContainer.querySelectorAll('.nav-list a');
        if (!links.length) return;

        // Obtén el segmento final del path (p. ej. 'podology.html')
        let path = window.location.pathname.split('/').pop();
        if (!path) path = 'index.html';

        links.forEach(a => {
          // Normaliza las rutas relativas (quita posible prefijo ../ en href)
          const href = a.getAttribute('href').replace(/^(\.\.\/)+/, '');
          if (href === path || (href === 'index.html' && (path === '' || path === 'index.html'))) {
            a.setAttribute('aria-current', 'page');
          } else {
            a.removeAttribute('aria-current');
          }
        });
      })();
    }
  } catch (err) {
    console.error('Error al renderizar el header:', err);
  }

  // ==========================================================
  // FOOTER (contenido básico, puedes ampliarlo)
  // ==========================================================
  const footerContainer = document.getElementById("site-footer");

  try {
    if (footerContainer) {
      footerContainer.innerHTML = `
        <div class="footer-inner container">
          <div class="footer-brand">
            <a href="${assetPrefix}index.html" class="logo">BeautyPod</a>
            <p class="footer-copy">© ${new Date().getFullYear()} BeautyPod. Todos los derechos reservados.</p>
          </div>

          <nav class="footer-nav" aria-label="Enlaces secundarios">
            <a href="${assetPrefix}podology.html">Podología</a>
            <a href="${assetPrefix}estetica.html">Estética</a>
            <a href="${assetPrefix}blog.html">Blog</a>
            <a href="${assetPrefix}tienda.html">Tienda</a>
            <a href="${assetPrefix}sobre-nosotros.html">Sobre nosotros</a>
          </nav>

          <div class="footer-contact">
            <p class="footer-address">Calle 298 y Calle 131, Matanzas</p>
            <p><a href="https://wa.me/5353719118?text=%5BPW%5D%20Hola%2C%20quiero%20reservar%20una%20cita" rel="noopener noreferrer">WhatsApp: +53 5371 9118</a></p>
          </div>
        </div>
      `;
    }
  } catch (err) {
    console.error('Error al renderizar el footer:', err);
  }

});