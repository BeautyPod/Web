/* Almacén del Club BeautyPod — MODO DEMOSTRACIÓN (guarda en el navegador).
   Para conectar Firebase solo se reemplaza este archivo; las dos páginas no cambian. */
(function () {
  var KEY = 'bp_club_demo', GOAL = 5, DAY = 864e5;

  function save(d) { localStorage.setItem(KEY, JSON.stringify(d)); }
  function load() {
    try { var x = JSON.parse(localStorage.getItem(KEY)); if (x && x.clients) return x; } catch (e) {}
    var d = { clients: {
      'blanca-demo': { name: 'Blanca', phone: '53000001', stars: 3 },
      'maria-demo':  { name: 'María',  phone: '53000002', stars: 1 },
      'ana-demo':    { name: 'Ana',    phone: '53000003', stars: 5, reward: { issued: Date.now(), expires: Date.now() + 30 * DAY } }
    } };
    save(d); return d;
  }
  function act(t, fn) {
    var d = load(), c = d.clients[t];
    if (!c) return { ok: false, msg: 'Clienta no encontrada.' };
    var r = fn(c);
    if (r.ok) save(d);
    return r;
  }

  window.ClubStore = {
    GOAL: GOAL, demo: true,
    all: function () {
      var c = load().clients;
      return Object.keys(c).map(function (t) { return Object.assign({ token: t }, c[t]); });
    },
    get: function (t) { var c = load().clients[t]; return c ? Object.assign({ token: t }, c) : null; },
    add: function (name, phone) {
      var d = load(), t = Array.from(crypto.getRandomValues(new Uint8Array(10)), function (b) { return (b % 36).toString(36); }).join('');
      d.clients[t] = { name: name, phone: phone, stars: 0 };
      save(d); return t;
    },
    // Regla: una estrella por visita válida, registrada una sola vez
    star: function (t) {
      return act(t, function (c) {
        if (c.stars >= GOAL) return { ok: false, msg: 'Ya tiene la recompensa. Canjéala primero.' };
        if (c.last && Date.now() - c.last < 60000) return { ok: false, msg: 'Ya se registró una estrella hace menos de 1 minuto.' };
        c.stars++; c.last = Date.now(); c.redeemedAt = null;
        // Regla: al llegar a 5 se emite la recompensa, válida 30 días naturales
        if (c.stars === GOAL) c.reward = { issued: Date.now(), expires: Date.now() + 30 * DAY };
        return { ok: true };
      });
    },
    undo: function (t) {
      return act(t, function (c) {
        if (c.stars < 1) return { ok: false, msg: 'No hay estrellas que quitar.' };
        c.stars--; c.reward = null; c.last = null;
        return { ok: true };
      });
    },
    reset: function (t) {
      return act(t, function (c) {
        c.stars = 0; c.reward = null; c.last = null; c.redeemedAt = null;
        return { ok: true };
      });
    },
    redeem: function (t) {
      return act(t, function (c) {
        if (c.stars < GOAL) return { ok: false, msg: 'Aún no completa las cinco estrellas.' };
        c.stars = 0; c.reward = null; c.last = null; c.redeemedAt = Date.now();
        return { ok: true };
      });
    },
    watch: function (fn) {
      window.addEventListener('storage', function (e) { if (e.key === KEY) fn(); });
    }
  };
})();
