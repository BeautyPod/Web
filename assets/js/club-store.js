/* Almacén del Club BeautyPod — conectado a Firebase (Firestore + Authentication).
   Requiere cargar antes los scripts "compat" de Firebase (app, auth, firestore). */
(function () {
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
  var COL = 'clientas', GOAL = 5, DAY = 864e5;

  // La sesión queda abierta en este dispositivo hasta que se toque "Cerrar sesión"
  var persistReady = auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(function () {});

  function ref(t) { return db.collection(COL).doc(t); }
  function pack(s) { return Object.assign({ token: s.id }, s.data()); }

  // Cada cambio se hace en una transacción: dos toques seguidos no duplican estrellas
  function act(t, fn) {
    return db.runTransaction(function (tx) {
      return tx.get(ref(t)).then(function (s) {
        if (!s.exists) return { ok: false, msg: 'Clienta no encontrada.' };
        var c = s.data(), r = fn(c);
        if (r.ok) tx.set(ref(t), c);
        return r;
      });
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

    // Vista de la clienta: una sola lectura y se actualiza en vivo
    watchClient: function (t, fn) {
      return ref(t).onSnapshot(function (s) { fn(s.exists ? pack(s) : null); }, function () { fn(null); });
    },
    // Tabla de la especialista
    watchAll: function (fn, onError) {
      return db.collection(COL).onSnapshot(function (q) {
        var list = q.docs.map(pack);
        list.sort(function (a, b) { return a.name.localeCompare(b.name, 'es'); });
        fn(list);
      }, onError);
    },

    add: function (name, phone) {
      var t = Array.from(crypto.getRandomValues(new Uint8Array(10)), function (b) { return (b % 36).toString(36); }).join('');
      return ref(t).set({ name: name, phone: phone, stars: 0, reward: null, last: null, redeemedAt: null, created: Date.now() })
        .then(function () { return t; });
    },
    // Elimina a una clienta (solo su tarjeta; no afecta la cuenta de la especialista)
    remove: function (t) {
      return ref(t).delete()
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
