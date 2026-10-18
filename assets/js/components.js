// ============================================================
// BeautyPod - Componentes reutilizables
// Header y Footer compartidos en las páginas
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const assetPrefix = window.location.pathname.includes("/articles/") ? "../" : "";

  // ==========================================================
  // HEADER
  // ==========================================================

  const headerContainer = document.getElementById("site-header");

  if (headerContainer) {

    headerContainer.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">

          <a href="index.html" class="logo">
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

              <li>
                <a href="index.html">
                  Inicio
                </a>
              </li>

              <li>
                <a href="podology.html">
                  Podología
                </a>
              </li>

              <li>
                <a href="estetica.html">
                  Estética
                </a>
              </li>

              <li>
                <a href="blog.html">
                  Blog
                </a>
              </li>
              
              <li>
                <a href="tienda.html">
                  Tienda
                </a>
              </li>

              <li>
                <a href="sobre-nosotros.html">
                  Sobre nosotros
                </a>
              </li>

            </ul>
          </nav>

          <a
            class="btn btn--primary btn--sm"
            href="https://wa.me/5353719118?text=%5BPW%5D%20Hola%2C%20quiero%20reservar%20una%20cita"
            target="_blank"
            rel="noopener noreferrer">

            Reservar cita

            <span class="sr-only">
              por WhatsApp (se abre en una pestaña nueva)
            </span>

          </a>

        </div>
      </header>
    `;

    // ========================================================
    // Detectar automáticamente la página