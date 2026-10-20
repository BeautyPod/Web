/* Almacén del Club BeautyPod — conectado a Firebase (Firestore + Authentication).
   Requiere cargar antes los scripts "compat" de Firebase (app, auth, firestore). */
(function () {
  if (typeof firebase === 'undefined') return; // Firebase no cargó (sin internet/VPN)
  var firebaseConfig = {
    apiKey: "AIzaSyD9xC8u8nAWSa_d0V4DImOF50_UCpc-sUY",
    authDomain: "beautypod-club.firebaseapp.com",
    projectId: "beautypod-club",
    storageBucket: "beautypod-club.firebasestorage.app",
    messagingSenderId: "561396060916",
    appId: "1:561396060916:web:5c2d1e8385cefeb02284a1"
  };
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore(), auth = firebase.auth();
  var COL = 'clientas', LIGA = 'liga', GOAL = 5, DAY = 864e5;

  // La sesión queda abierta en este dispositivo hasta que se toque "Cerrar sesión"
  var persistReady = auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function () {});

  function ref(t) { return db.collection(COL).doc(t); }
  function pack(s) { return Object.assign({ token: s.id }, s.data()); }

  // ID público de la clienta en la liga: hash del token (no permite deducir el enlace)
  function hid(t) {
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)).then(function (d) {
      return Array.from(new Uint8Array(d).slice(0, 8), function (x) { return ('0' + x.toString(16)).slice(-2); }).join('');
    });
  }
  // Publica solo primer nombre y estrellas (sin teléfono ni token)
  function publish(t, c) {
    return hid(t).then(function (h) {
      return db.collection(LIGA).doc(h).set({ n: String(c.name).split(' ')[0], s: c.stars, r: c.stars >= GOAL, ts: Date.now() });
    });
  }

  // Cada cambio se hace en una transacción: dos toques seguidos no duplican estrellas
  function act(t, fn) {
    var last;
    return db.runTransaction(function (tx) {
      return tx.get(ref(t)).then(function (s) {
        if (!s.exists) return { ok: false, msg: 'Clienta no encontrada.' };
        var c = s.data(), r = fn(c);
        if (r.ok) { tx.set(ref(t), c); last = c; }
        return r;
      });
    }).then(function (r) {
      if (r.ok && last) return publish(t, last).then(function () { return r; }, function () { return r; });
      return r;
    }).catch(function () { return { ok: false, msg: 'No se pudo guardar. Revisa la conexión e inténtalo de nuevo.' }; });
  }

  window.ClubStore = {
    GOAL: GOAL, demo: false,

    // Sesión de la especialista
    login: function (email, pass) {
      return persistReady.then(function () { return auth.signInWithEmailAndPassword(email, pass); });
    },
    logout: function () { return auth.signOut(); },
    onAuth: function (fn) { return auth.onAuthStateChanged(fn); },

    // Vista de la clienta: una sola lectura y se actualiza en vivo.
    // fn(tarjeta, errorDeRed): errorDeRed = true cuando no hay conexión con el servidor
    watchClient: function (t, fn) {
      return ref(t).onSnapshot({ includeMetadataChanges: true }, function (s) {
        if (!s.exists && s.metadata.fromCache) { fn(null, true); return; } // sin servidor: no es "no existe"
        fn(s.exists ? pack(s) : null, false);
      }, function () { fn(null, true); });
    },
    // Tabla de la especialista
    watchAll: function (fn, onError) {
      return db.collection(COL).onSnapshot(function (q) {
        var list = q.docs.map(pack);
        list.sort(function (a, b) { return a.name.localeCompare(b.name, 'es'); });
        fn(list);
      }, onError);
    },

    // Liga del Club (pública): ordenada por estrellas, de más a menos
    myId: hid,
    watchLeague: function (fn) {
      return db.collection(LIGA).onSnapshot(function (q) {
        var l = q.docs.map(function (d) { return Object.assign({ h: d.id }, d.data()); });
        l.sort(function (a, b) { return (b.s - a.s) || a.n.localeCompare(b.n, 'es'); });
        fn(l);
      }, function () { fn([]); });
    },
    // Copia a la liga las clientas que ya existían
    syncLeague: function (list) {
      return Promise.all(list.map(function (c) { return publish(c.token, c); })).catch(function () {});
    },

    add: function (name, phone) {
      var t = Array.from(crypto.getRandomValues(new Uint8Array(10)), function (b) { return (b % 36).toString(36); }).join('');
      return ref(t).set({ name: name, phone: phone, stars: 0, reward: null, last: null, redeemedAt: null, created: Date.now() })
        .then(function () { return publish(t, { name: name, stars: 0 }); })
        .then(function () { return t; });
    },
    // Elimina a una clienta (su tarjeta y su fila en la liga; no afecta la cuenta de la especialista)
    remove: function (t) {
      return hid(t)
        .then(function (h) { return db.collection(LIGA).doc(h).delete(); })
        .then(function () { return ref(t).delete(); })
        .then(function () { return { ok: true }; },
              function () { return { ok: false, msg: 'No se pudo eliminar. Revisa la conexión o los permisos.' }; });
    },
    star: function (t) {
      return act(t, function (c) {
        if (c.stars >= GOAL) return { ok: false, msg: 'Ya tiene la recompensa. Canjéala primero.' };
        if (c.last && Date.now() - c.last < 60000) return { ok: false, msg: 'Ya se registró una estrella hace menos de 1 minuto.' };
        c.stars++; c.last = Date.now(); c.redeemedAt = null;
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
    }
  };
})();
