/* BeautyPod — Blog: búsqueda y filtros por tema.
   Se carga desde blog.html con defer. Sin dependencias.
   Sin JavaScript, la página muestra todos los artículos. */
/* Búsqueda y filtros. Sin JavaScript, todos los artículos se ven igual. */
(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll('#biblioteca .vcard[data-cat]'));
  var input = document.getElementById('buscar');
  var chips = document.getElementById('chips');
  var estado = document.getElementById('estado');
  var vacio = document.getElementById('vacio');
  var filtro = 'todos';
  chips.hidden = false;

  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }

  function aplicar() {
    var q = norm(input.value.trim());
    var n = 0;
    cards.forEach(function (c) {
      var esAviso = c.classList.contains('vcard--soon');
      var okCat = filtro === 'todos' || c.getAttribute('data-cat').indexOf(filtro) > -1;
      var okTxt = !q || norm(c.textContent).indexOf(q) > -1;
      var ver = esAviso ? (filtro === 'todos' && !q) : (okCat && okTxt);
      c.hidden = !ver;
      if (ver && !esAviso) n++;
    });
    estado.textContent = n === 1 ? '1 artículo' : n + ' artículos';
    vacio.hidden = n > 0;
  }

  chips.addEventListener('click', function (e) {
    var b = e.target.closest('.chip');
    if (!b) return;
    filtro = b.getAttribute('data-filter');
    Array.prototype.forEach.call(chips.querySelectorAll('.chip'), function (x) {
      x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
    });
    aplicar();
  });
  input.addEventListener('input', aplicar);
})();