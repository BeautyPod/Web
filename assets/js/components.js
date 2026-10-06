// ============================================================
// BeautyPod - Componentes reutilizables
// Header y Footer compartidos en las páginas
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

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
              src="assets/img/beautypod-logo.svg"
              alt=""
              width="42"
              height="42"
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
    // Detectar automáticamente la página actual
    // ========================================================

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    const navLinks =
      headerContainer.querySelectorAll(".main-nav a");

    navLinks.forEach(link => {

      const linkPage =
        link.getAttribute("href");

      if (linkPage === currentPage) {

        link.setAttribute("aria-current", "page");

      }

    });

  }


  // ==========================================================
  // FOOTER
  // ==========================================================

  const footerContainer = document.getElementById("site-footer");

  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-inner">

        <div class="footer-brand">

          <p
            class="logo"
            style="
              display:flex;
              align-items:center;
              gap:8px;
            "
          >
            <img
              src="assets/img/beautypod-logo.svg"
              alt=""
              width="42"
              height="42"
              style="
                display:block;
                width:42px;
                height:42px;
                object-fit:contain;
                flex:0 0 42px;
              "
            >
            <span>BeautyPod</span>
          </p>

          <p>Podología y cuidado de pies en Matanzas, Cuba.</p>

        </div>

        <address class="footer-address">
          Calle 298 y Calle 131, Pueblo Nuevo, Matanzas, Cuba<br>

          <a
            href="https://maps.app.goo.gl/Axdd4hyurDcGLANy8"
            target="_blank"
            rel="noopener noreferrer">
            Ver ubicación en Google Maps
            <span class="sr-only">
              (se abre en una pestaña nueva)
            </span>
          </a>
          <br>

          <a href="sms:+5353719118">
            SMS: +53 5371 9118
          </a>
        </address>

        <nav
          class="footer-social"
          aria-label="Redes sociales y reseñas de BeautyPod">

          <!-- Facebook -->
          <a
            class="social-icon"
            href="https://www.facebook.com/bpodpedicure"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BeautyPod en Facebook (se abre en una pestaña nueva)">

            <svg viewBox="0 0 24 24" width="20" height="20"
                 aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M15 8.5h1.7V5.6c-.3 0-1.3-.1-2.5-.1
                   -2.5 0-4.2 1.5-4.2 4.3v2.3H7.3V15h2.7v8h3.1v-8h2.6l.4-2.9h-3v-2c0-.8.2-1.6 1.9-1.6Z"/>
            </svg>
          </a>

          <!-- Instagram -->
          <a
            class="social-icon"
            href="https://www.instagram.com/beautypodlinet?stkn=NXRxM3owdnd5Mzd5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BeautyPod en Instagram (se abre en una pestaña nueva)">

            <svg viewBox="0 0 24 24" width="20" height="20"
                 aria-hidden="true" focusable="false">
              <rect
                x="3.2"
                y="3.2"
                width="17.6"
                height="17.6"
                rx="5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"/>

              <circle
                cx="12"
                cy="12"
                r="4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"/>

              <circle
                cx="17.4"
                cy="6.6"
                r="1.1"
                fill="currentColor"/>
            </svg>
          </a>

          <!-- Telegram -->
          <a
            class="social-icon"
            href="https://t.me/bpplinet"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BeautyPod en Telegram (se abre en una pestaña nueva)">

            <svg viewBox="0 0 24 24" width="20" height="20"
                 aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M9.78 18.65c-.4 0-.33-.15-.47-.53l-1.18-3.87
                   9-5.35c.4-.24.06-.35-.22-.14l-11.1 6.98-1.9-.6
                   c-.44-.14-.44-.43.09-.65l16.4-6.32c.36-.16.71.09.57.66
                   l-2.79 13.14c-.2.9-.75 1.11-1.51.7l-4.16-3.07
                   -2 1.93c-.23.23-.42.42-.73.42Z"/>
            </svg>
          </a>

          <!-- WhatsApp -->
          <a
            class="social-icon"
            href="https://wa.me/5353719118?text=%5BPW%5D%20Hola%2C%20quiero%20reservar%20una%20cita"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BeautyPod en WhatsApp (se abre en una pestaña nueva)">

            <svg viewBox="0 0 24 24" width="20" height="20"
                 aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21l4.3-1.3
                   A9.5 9.5 0 1 0 12 2.5Zm5.4 13.6c-.24.66-1.2 1.24-1.86
                   1.34-.5.08-1.1.11-1.78-.1-.4-.13-.93-.3-1.6-.6
                   -2.8-1.2-4.63-4.06-4.77-4.25-.14-.19-1.14-1.52-1.14-2.9
                   0-1.37.72-2.05.97-2.33.26-.28.57-.35.76-.35h.55
                   c.17 0 .4-.07.63.48.24.56.8 1.96.88 2.1.08.15.13.32.03.51
                   -.1.19-.15.31-.28.47-.14.17-.3.38-.42.52-.14.16-.29.32-.13.6
                   .17.29.75 1.19 1.6 1.93 1.1.94 2 1.22 2.3 1.36
                   .29.14.46.12.63-.08.17-.19.71-.82.9-1.1.19-.28.37-.24.64-.14
                   .27.1 1.68.79 1.97.93.29.14.48.21.55.33.07.12.07.68-.16 1.33Z"/>
            </svg>
          </a>

          <!-- Tripadvisor -->
          <a
            class="social-icon"
            href="https://www.tripadvisor.com/Attraction_Review-g663510-d28549168-Reviews-Beautypod_Podologia_y_Pedicura-Matanzas_Matanzas_Province_Cuba.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="BeautyPod en Tripadvisor (se abre en una pestaña nueva)">

            <svg viewBox="0 0 24 24" width="20" height="20"
                 aria-hidden="true" focusable="false">

              <path
                d="M2.4 9.6C5 7 8.3 5.8 12 5.8s7 1.2 9.6 3.8"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"/>

              <circle
                cx="7.6"
                cy="14"
                r="3.8"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"/>

              <circle
                cx="16.4"
                cy="14"
                r="3.8"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"/>

              <circle
                cx="7.6"
                cy="14"
                r="1.4"
                fill="currentColor"/>

              <circle
                cx="16.4"
                cy="14"
                r="1.4"
                fill="currentColor"/>

              <path
                d="M12 14.2l-1.3 1.9h2.6z"
                fill="currentColor"/>
            </svg>
          </a>

        </nav>

        <p class="footer-copy">
          © ${new Date().getFullYear()} BeautyPod. Todos los derechos reservados.
        </p>

      </div>
    </footer>
  `;

});