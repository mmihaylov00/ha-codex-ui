var xy = Object.defineProperty;
var rg = (a) => {
  throw TypeError(a);
};
var by = (a, i, o) => i in a ? xy(a, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : a[i] = o;
var zn = (a, i, o) => by(a, typeof i != "symbol" ? i + "" : i, o), rd = (a, i, o) => i.has(a) || rg("Cannot " + o);
var $ = (a, i, o) => (rd(a, i, "read from private field"), o ? o.call(a) : i.get(a)), Lt = (a, i, o) => i.has(a) ? rg("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(a) : i.set(a, o), jt = (a, i, o, r) => (rd(a, i, "write to private field"), r ? r.call(a, o) : i.set(a, o), o), Le = (a, i, o) => (rd(a, i, "access private method"), o);
var zs = (a, i, o, r) => ({
  set _(c) {
    jt(a, i, c, o);
  },
  get _() {
    return $(a, i, r);
  }
});
function Dx(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var sd = { exports: {} }, Ro = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sg;
function vy() {
  if (sg) return Ro;
  sg = 1;
  var a = Symbol.for("react.transitional.element"), i = Symbol.for("react.fragment");
  function o(r, c, f) {
    var m = null;
    if (f !== void 0 && (m = "" + f), c.key !== void 0 && (m = "" + c.key), "key" in c) {
      f = {};
      for (var p in c)
        p !== "key" && (f[p] = c[p]);
    } else f = c;
    return c = f.ref, {
      $$typeof: a,
      type: r,
      key: m,
      ref: c !== void 0 ? c : null,
      props: f
    };
  }
  return Ro.Fragment = i, Ro.jsx = o, Ro.jsxs = o, Ro;
}
var ug;
function yy() {
  return ug || (ug = 1, sd.exports = vy()), sd.exports;
}
var d = yy(), ud = { exports: {} }, Rt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cg;
function wy() {
  if (cg) return Rt;
  cg = 1;
  var a = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), f = Symbol.for("react.consumer"), m = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), w = Symbol.for("react.activity"), C = Symbol.iterator;
  function A(T) {
    return T === null || typeof T != "object" ? null : (T = C && T[C] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var N = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, B = Object.assign, z = {};
  function _(T, Y, X) {
    this.props = T, this.context = Y, this.refs = z, this.updater = X || N;
  }
  _.prototype.isReactComponent = {}, _.prototype.setState = function(T, Y) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, Y, "setState");
  }, _.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function R() {
  }
  R.prototype = _.prototype;
  function L(T, Y, X) {
    this.props = T, this.context = Y, this.refs = z, this.updater = X || N;
  }
  var q = L.prototype = new R();
  q.constructor = L, B(q, _.prototype), q.isPureReactComponent = !0;
  var y = Array.isArray;
  function D() {
  }
  var v = { H: null, A: null, T: null, S: null }, M = Object.prototype.hasOwnProperty;
  function k(T, Y, X) {
    var it = X.ref;
    return {
      $$typeof: a,
      type: T,
      key: Y,
      ref: it !== void 0 ? it : null,
      props: X
    };
  }
  function K(T, Y) {
    return k(T.type, Y, T.props);
  }
  function tt(T) {
    return typeof T == "object" && T !== null && T.$$typeof === a;
  }
  function ct(T) {
    var Y = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(X) {
      return Y[X];
    });
  }
  var rt = /\/+/g;
  function ot(T, Y) {
    return typeof T == "object" && T !== null && T.key != null ? ct("" + T.key) : Y.toString(36);
  }
  function yt(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(D, D) : (T.status = "pending", T.then(
          function(Y) {
            T.status === "pending" && (T.status = "fulfilled", T.value = Y);
          },
          function(Y) {
            T.status === "pending" && (T.status = "rejected", T.reason = Y);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function H(T, Y, X, it, gt) {
    var St = typeof T;
    (St === "undefined" || St === "boolean") && (T = null);
    var At = !1;
    if (T === null) At = !0;
    else
      switch (St) {
        case "bigint":
        case "string":
        case "number":
          At = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case a:
            case i:
              At = !0;
              break;
            case S:
              return At = T._init, H(
                At(T._payload),
                Y,
                X,
                it,
                gt
              );
          }
      }
    if (At)
      return gt = gt(T), At = it === "" ? "." + ot(T, 0) : it, y(gt) ? (X = "", At != null && (X = At.replace(rt, "$&/") + "/"), H(gt, Y, X, "", function(re) {
        return re;
      })) : gt != null && (tt(gt) && (gt = K(
        gt,
        X + (gt.key == null || T && T.key === gt.key ? "" : ("" + gt.key).replace(
          rt,
          "$&/"
        ) + "/") + At
      )), Y.push(gt)), 1;
    At = 0;
    var at = it === "" ? "." : it + ":";
    if (y(T))
      for (var vt = 0; vt < T.length; vt++)
        it = T[vt], St = at + ot(it, vt), At += H(
          it,
          Y,
          X,
          St,
          gt
        );
    else if (vt = A(T), typeof vt == "function")
      for (T = vt.call(T), vt = 0; !(it = T.next()).done; )
        it = it.value, St = at + ot(it, vt++), At += H(
          it,
          Y,
          X,
          St,
          gt
        );
    else if (St === "object") {
      if (typeof T.then == "function")
        return H(
          yt(T),
          Y,
          X,
          it,
          gt
        );
      throw Y = String(T), Error(
        "Objects are not valid as a React child (found: " + (Y === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : Y) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return At;
  }
  function W(T, Y, X) {
    if (T == null) return T;
    var it = [], gt = 0;
    return H(T, it, "", "", function(St) {
      return Y.call(X, St, gt++);
    }), it;
  }
  function F(T) {
    if (T._status === -1) {
      var Y = T._result;
      Y = Y(), Y.then(
        function(X) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = X);
        },
        function(X) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = X);
        }
      ), T._status === -1 && (T._status = 0, T._result = Y);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var ht = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Y = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(Y)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  }, st = {
    map: W,
    forEach: function(T, Y, X) {
      W(
        T,
        function() {
          Y.apply(this, arguments);
        },
        X
      );
    },
    count: function(T) {
      var Y = 0;
      return W(T, function() {
        Y++;
      }), Y;
    },
    toArray: function(T) {
      return W(T, function(Y) {
        return Y;
      }) || [];
    },
    only: function(T) {
      if (!tt(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  };
  return Rt.Activity = w, Rt.Children = st, Rt.Component = _, Rt.Fragment = o, Rt.Profiler = c, Rt.PureComponent = L, Rt.StrictMode = r, Rt.Suspense = g, Rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = v, Rt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return v.H.useMemoCache(T);
    }
  }, Rt.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, Rt.cacheSignal = function() {
    return null;
  }, Rt.cloneElement = function(T, Y, X) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var it = B({}, T.props), gt = T.key;
    if (Y != null)
      for (St in Y.key !== void 0 && (gt = "" + Y.key), Y)
        !M.call(Y, St) || St === "key" || St === "__self" || St === "__source" || St === "ref" && Y.ref === void 0 || (it[St] = Y[St]);
    var St = arguments.length - 2;
    if (St === 1) it.children = X;
    else if (1 < St) {
      for (var At = Array(St), at = 0; at < St; at++)
        At[at] = arguments[at + 2];
      it.children = At;
    }
    return k(T.type, gt, it);
  }, Rt.createContext = function(T) {
    return T = {
      $$typeof: m,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: f,
      _context: T
    }, T;
  }, Rt.createElement = function(T, Y, X) {
    var it, gt = {}, St = null;
    if (Y != null)
      for (it in Y.key !== void 0 && (St = "" + Y.key), Y)
        M.call(Y, it) && it !== "key" && it !== "__self" && it !== "__source" && (gt[it] = Y[it]);
    var At = arguments.length - 2;
    if (At === 1) gt.children = X;
    else if (1 < At) {
      for (var at = Array(At), vt = 0; vt < At; vt++)
        at[vt] = arguments[vt + 2];
      gt.children = at;
    }
    if (T && T.defaultProps)
      for (it in At = T.defaultProps, At)
        gt[it] === void 0 && (gt[it] = At[it]);
    return k(T, St, gt);
  }, Rt.createRef = function() {
    return { current: null };
  }, Rt.forwardRef = function(T) {
    return { $$typeof: p, render: T };
  }, Rt.isValidElement = tt, Rt.lazy = function(T) {
    return {
      $$typeof: S,
      _payload: { _status: -1, _result: T },
      _init: F
    };
  }, Rt.memo = function(T, Y) {
    return {
      $$typeof: x,
      type: T,
      compare: Y === void 0 ? null : Y
    };
  }, Rt.startTransition = function(T) {
    var Y = v.T, X = {};
    v.T = X;
    try {
      var it = T(), gt = v.S;
      gt !== null && gt(X, it), typeof it == "object" && it !== null && typeof it.then == "function" && it.then(D, ht);
    } catch (St) {
      ht(St);
    } finally {
      Y !== null && X.types !== null && (Y.types = X.types), v.T = Y;
    }
  }, Rt.unstable_useCacheRefresh = function() {
    return v.H.useCacheRefresh();
  }, Rt.use = function(T) {
    return v.H.use(T);
  }, Rt.useActionState = function(T, Y, X) {
    return v.H.useActionState(T, Y, X);
  }, Rt.useCallback = function(T, Y) {
    return v.H.useCallback(T, Y);
  }, Rt.useContext = function(T) {
    return v.H.useContext(T);
  }, Rt.useDebugValue = function() {
  }, Rt.useDeferredValue = function(T, Y) {
    return v.H.useDeferredValue(T, Y);
  }, Rt.useEffect = function(T, Y) {
    return v.H.useEffect(T, Y);
  }, Rt.useEffectEvent = function(T) {
    return v.H.useEffectEvent(T);
  }, Rt.useId = function() {
    return v.H.useId();
  }, Rt.useImperativeHandle = function(T, Y, X) {
    return v.H.useImperativeHandle(T, Y, X);
  }, Rt.useInsertionEffect = function(T, Y) {
    return v.H.useInsertionEffect(T, Y);
  }, Rt.useLayoutEffect = function(T, Y) {
    return v.H.useLayoutEffect(T, Y);
  }, Rt.useMemo = function(T, Y) {
    return v.H.useMemo(T, Y);
  }, Rt.useOptimistic = function(T, Y) {
    return v.H.useOptimistic(T, Y);
  }, Rt.useReducer = function(T, Y, X) {
    return v.H.useReducer(T, Y, X);
  }, Rt.useRef = function(T) {
    return v.H.useRef(T);
  }, Rt.useState = function(T) {
    return v.H.useState(T);
  }, Rt.useSyncExternalStore = function(T, Y, X) {
    return v.H.useSyncExternalStore(
      T,
      Y,
      X
    );
  }, Rt.useTransition = function() {
    return v.H.useTransition();
  }, Rt.version = "19.2.6", Rt;
}
var dg;
function Gd() {
  return dg || (dg = 1, ud.exports = wy()), ud.exports;
}
var I = Gd();
const dt = /* @__PURE__ */ Dx(I);
var cd = { exports: {} }, No = {}, dd = { exports: {} }, fd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fg;
function Sy() {
  return fg || (fg = 1, (function(a) {
    function i(H, W) {
      var F = H.length;
      H.push(W);
      t: for (; 0 < F; ) {
        var ht = F - 1 >>> 1, st = H[ht];
        if (0 < c(st, W))
          H[ht] = W, H[F] = st, F = ht;
        else break t;
      }
    }
    function o(H) {
      return H.length === 0 ? null : H[0];
    }
    function r(H) {
      if (H.length === 0) return null;
      var W = H[0], F = H.pop();
      if (F !== W) {
        H[0] = F;
        t: for (var ht = 0, st = H.length, T = st >>> 1; ht < T; ) {
          var Y = 2 * (ht + 1) - 1, X = H[Y], it = Y + 1, gt = H[it];
          if (0 > c(X, F))
            it < st && 0 > c(gt, X) ? (H[ht] = gt, H[it] = F, ht = it) : (H[ht] = X, H[Y] = F, ht = Y);
          else if (it < st && 0 > c(gt, F))
            H[ht] = gt, H[it] = F, ht = it;
          else break t;
        }
      }
      return W;
    }
    function c(H, W) {
      var F = H.sortIndex - W.sortIndex;
      return F !== 0 ? F : H.id - W.id;
    }
    if (a.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      a.unstable_now = function() {
        return f.now();
      };
    } else {
      var m = Date, p = m.now();
      a.unstable_now = function() {
        return m.now() - p;
      };
    }
    var g = [], x = [], S = 1, w = null, C = 3, A = !1, N = !1, B = !1, z = !1, _ = typeof setTimeout == "function" ? setTimeout : null, R = typeof clearTimeout == "function" ? clearTimeout : null, L = typeof setImmediate < "u" ? setImmediate : null;
    function q(H) {
      for (var W = o(x); W !== null; ) {
        if (W.callback === null) r(x);
        else if (W.startTime <= H)
          r(x), W.sortIndex = W.expirationTime, i(g, W);
        else break;
        W = o(x);
      }
    }
    function y(H) {
      if (B = !1, q(H), !N)
        if (o(g) !== null)
          N = !0, D || (D = !0, ct());
        else {
          var W = o(x);
          W !== null && yt(y, W.startTime - H);
        }
    }
    var D = !1, v = -1, M = 5, k = -1;
    function K() {
      return z ? !0 : !(a.unstable_now() - k < M);
    }
    function tt() {
      if (z = !1, D) {
        var H = a.unstable_now();
        k = H;
        var W = !0;
        try {
          t: {
            N = !1, B && (B = !1, R(v), v = -1), A = !0;
            var F = C;
            try {
              e: {
                for (q(H), w = o(g); w !== null && !(w.expirationTime > H && K()); ) {
                  var ht = w.callback;
                  if (typeof ht == "function") {
                    w.callback = null, C = w.priorityLevel;
                    var st = ht(
                      w.expirationTime <= H
                    );
                    if (H = a.unstable_now(), typeof st == "function") {
                      w.callback = st, q(H), W = !0;
                      break e;
                    }
                    w === o(g) && r(g), q(H);
                  } else r(g);
                  w = o(g);
                }
                if (w !== null) W = !0;
                else {
                  var T = o(x);
                  T !== null && yt(
                    y,
                    T.startTime - H
                  ), W = !1;
                }
              }
              break t;
            } finally {
              w = null, C = F, A = !1;
            }
            W = void 0;
          }
        } finally {
          W ? ct() : D = !1;
        }
      }
    }
    var ct;
    if (typeof L == "function")
      ct = function() {
        L(tt);
      };
    else if (typeof MessageChannel < "u") {
      var rt = new MessageChannel(), ot = rt.port2;
      rt.port1.onmessage = tt, ct = function() {
        ot.postMessage(null);
      };
    } else
      ct = function() {
        _(tt, 0);
      };
    function yt(H, W) {
      v = _(function() {
        H(a.unstable_now());
      }, W);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(H) {
      H.callback = null;
    }, a.unstable_forceFrameRate = function(H) {
      0 > H || 125 < H ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : M = 0 < H ? Math.floor(1e3 / H) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return C;
    }, a.unstable_next = function(H) {
      switch (C) {
        case 1:
        case 2:
        case 3:
          var W = 3;
          break;
        default:
          W = C;
      }
      var F = C;
      C = W;
      try {
        return H();
      } finally {
        C = F;
      }
    }, a.unstable_requestPaint = function() {
      z = !0;
    }, a.unstable_runWithPriority = function(H, W) {
      switch (H) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          H = 3;
      }
      var F = C;
      C = H;
      try {
        return W();
      } finally {
        C = F;
      }
    }, a.unstable_scheduleCallback = function(H, W, F) {
      var ht = a.unstable_now();
      switch (typeof F == "object" && F !== null ? (F = F.delay, F = typeof F == "number" && 0 < F ? ht + F : ht) : F = ht, H) {
        case 1:
          var st = -1;
          break;
        case 2:
          st = 250;
          break;
        case 5:
          st = 1073741823;
          break;
        case 4:
          st = 1e4;
          break;
        default:
          st = 5e3;
      }
      return st = F + st, H = {
        id: S++,
        callback: W,
        priorityLevel: H,
        startTime: F,
        expirationTime: st,
        sortIndex: -1
      }, F > ht ? (H.sortIndex = F, i(x, H), o(g) === null && H === o(x) && (B ? (R(v), v = -1) : B = !0, yt(y, F - ht))) : (H.sortIndex = st, i(g, H), N || A || (N = !0, D || (D = !0, ct()))), H;
    }, a.unstable_shouldYield = K, a.unstable_wrapCallback = function(H) {
      var W = C;
      return function() {
        var F = C;
        C = W;
        try {
          return H.apply(this, arguments);
        } finally {
          C = F;
        }
      };
    };
  })(fd)), fd;
}
var hg;
function Cy() {
  return hg || (hg = 1, dd.exports = Sy()), dd.exports;
}
var hd = { exports: {} }, Qe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mg;
function _y() {
  if (mg) return Qe;
  mg = 1;
  var a = Gd();
  function i(g) {
    var x = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      x += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        x += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + g + "; visit " + x + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o() {
  }
  var r = {
    d: {
      f: o,
      r: function() {
        throw Error(i(522));
      },
      D: o,
      C: o,
      L: o,
      m: o,
      X: o,
      S: o,
      M: o
    },
    p: 0,
    findDOMNode: null
  }, c = Symbol.for("react.portal");
  function f(g, x, S) {
    var w = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: w == null ? null : "" + w,
      children: g,
      containerInfo: x,
      implementation: S
    };
  }
  var m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, x) {
    if (g === "font") return "";
    if (typeof x == "string")
      return x === "use-credentials" ? x : "";
  }
  return Qe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Qe.createPortal = function(g, x) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!x || x.nodeType !== 1 && x.nodeType !== 9 && x.nodeType !== 11)
      throw Error(i(299));
    return f(g, x, null, S);
  }, Qe.flushSync = function(g) {
    var x = m.T, S = r.p;
    try {
      if (m.T = null, r.p = 2, g) return g();
    } finally {
      m.T = x, r.p = S, r.d.f();
    }
  }, Qe.preconnect = function(g, x) {
    typeof g == "string" && (x ? (x = x.crossOrigin, x = typeof x == "string" ? x === "use-credentials" ? x : "" : void 0) : x = null, r.d.C(g, x));
  }, Qe.prefetchDNS = function(g) {
    typeof g == "string" && r.d.D(g);
  }, Qe.preinit = function(g, x) {
    if (typeof g == "string" && x && typeof x.as == "string") {
      var S = x.as, w = p(S, x.crossOrigin), C = typeof x.integrity == "string" ? x.integrity : void 0, A = typeof x.fetchPriority == "string" ? x.fetchPriority : void 0;
      S === "style" ? r.d.S(
        g,
        typeof x.precedence == "string" ? x.precedence : void 0,
        {
          crossOrigin: w,
          integrity: C,
          fetchPriority: A
        }
      ) : S === "script" && r.d.X(g, {
        crossOrigin: w,
        integrity: C,
        fetchPriority: A,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0
      });
    }
  }, Qe.preinitModule = function(g, x) {
    if (typeof g == "string")
      if (typeof x == "object" && x !== null) {
        if (x.as == null || x.as === "script") {
          var S = p(
            x.as,
            x.crossOrigin
          );
          r.d.M(g, {
            crossOrigin: S,
            integrity: typeof x.integrity == "string" ? x.integrity : void 0,
            nonce: typeof x.nonce == "string" ? x.nonce : void 0
          });
        }
      } else x == null && r.d.M(g);
  }, Qe.preload = function(g, x) {
    if (typeof g == "string" && typeof x == "object" && x !== null && typeof x.as == "string") {
      var S = x.as, w = p(S, x.crossOrigin);
      r.d.L(g, S, {
        crossOrigin: w,
        integrity: typeof x.integrity == "string" ? x.integrity : void 0,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0,
        type: typeof x.type == "string" ? x.type : void 0,
        fetchPriority: typeof x.fetchPriority == "string" ? x.fetchPriority : void 0,
        referrerPolicy: typeof x.referrerPolicy == "string" ? x.referrerPolicy : void 0,
        imageSrcSet: typeof x.imageSrcSet == "string" ? x.imageSrcSet : void 0,
        imageSizes: typeof x.imageSizes == "string" ? x.imageSizes : void 0,
        media: typeof x.media == "string" ? x.media : void 0
      });
    }
  }, Qe.preloadModule = function(g, x) {
    if (typeof g == "string")
      if (x) {
        var S = p(x.as, x.crossOrigin);
        r.d.m(g, {
          as: typeof x.as == "string" && x.as !== "script" ? x.as : void 0,
          crossOrigin: S,
          integrity: typeof x.integrity == "string" ? x.integrity : void 0
        });
      } else r.d.m(g);
  }, Qe.requestFormReset = function(g) {
    r.d.r(g);
  }, Qe.unstable_batchedUpdates = function(g, x) {
    return g(x);
  }, Qe.useFormState = function(g, x, S) {
    return m.H.useFormState(g, x, S);
  }, Qe.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, Qe.version = "19.2.6", Qe;
}
var pg;
function Ox() {
  if (pg) return hd.exports;
  pg = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), hd.exports = _y(), hd.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gg;
function Ty() {
  if (gg) return No;
  gg = 1;
  var a = Cy(), i = Gd(), o = Ox();
  function r(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function c(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function f(t) {
    var e = t, n = t;
    if (t.alternate) for (; e.return; ) e = e.return;
    else {
      t = e;
      do
        e = t, (e.flags & 4098) !== 0 && (n = e.return), t = e.return;
      while (t);
    }
    return e.tag === 3 ? n : null;
  }
  function m(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function p(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (f(t) !== t)
      throw Error(r(188));
  }
  function x(t) {
    var e = t.alternate;
    if (!e) {
      if (e = f(t), e === null) throw Error(r(188));
      return e !== t ? null : t;
    }
    for (var n = t, l = e; ; ) {
      var s = n.return;
      if (s === null) break;
      var u = s.alternate;
      if (u === null) {
        if (l = s.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (s.child === u.child) {
        for (u = s.child; u; ) {
          if (u === n) return g(s), t;
          if (u === l) return g(s), e;
          u = u.sibling;
        }
        throw Error(r(188));
      }
      if (n.return !== l.return) n = s, l = u;
      else {
        for (var h = !1, b = s.child; b; ) {
          if (b === n) {
            h = !0, n = s, l = u;
            break;
          }
          if (b === l) {
            h = !0, l = s, n = u;
            break;
          }
          b = b.sibling;
        }
        if (!h) {
          for (b = u.child; b; ) {
            if (b === n) {
              h = !0, n = u, l = s;
              break;
            }
            if (b === l) {
              h = !0, l = u, n = s;
              break;
            }
            b = b.sibling;
          }
          if (!h) throw Error(r(189));
        }
      }
      if (n.alternate !== l) throw Error(r(190));
    }
    if (n.tag !== 3) throw Error(r(188));
    return n.stateNode.current === n ? t : e;
  }
  function S(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = S(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var w = Object.assign, C = Symbol.for("react.element"), A = Symbol.for("react.transitional.element"), N = Symbol.for("react.portal"), B = Symbol.for("react.fragment"), z = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), R = Symbol.for("react.consumer"), L = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), y = Symbol.for("react.suspense"), D = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), k = Symbol.for("react.activity"), K = Symbol.for("react.memo_cache_sentinel"), tt = Symbol.iterator;
  function ct(t) {
    return t === null || typeof t != "object" ? null : (t = tt && t[tt] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var rt = Symbol.for("react.client.reference");
  function ot(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === rt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case B:
        return "Fragment";
      case _:
        return "Profiler";
      case z:
        return "StrictMode";
      case y:
        return "Suspense";
      case D:
        return "SuspenseList";
      case k:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case N:
          return "Portal";
        case L:
          return t.displayName || "Context";
        case R:
          return (t._context.displayName || "Context") + ".Consumer";
        case q:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case v:
          return e = t.displayName || null, e !== null ? e : ot(t.type) || "Memo";
        case M:
          e = t._payload, t = t._init;
          try {
            return ot(t(e));
          } catch {
          }
      }
    return null;
  }
  var yt = Array.isArray, H = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ht = [], st = -1;
  function T(t) {
    return { current: t };
  }
  function Y(t) {
    0 > st || (t.current = ht[st], ht[st] = null, st--);
  }
  function X(t, e) {
    st++, ht[st] = t.current, t.current = e;
  }
  var it = T(null), gt = T(null), St = T(null), At = T(null);
  function at(t, e) {
    switch (X(St, e), X(gt, t), X(it, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Rp(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Rp(e), t = Np(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    Y(it), X(it, t);
  }
  function vt() {
    Y(it), Y(gt), Y(St);
  }
  function re(t) {
    t.memoizedState !== null && X(At, t);
    var e = it.current, n = Np(e, t.type);
    e !== n && (X(gt, t), X(it, n));
  }
  function Vt(t) {
    gt.current === t && (Y(it), Y(gt)), At.current === t && (Y(At), jo._currentValue = F);
  }
  var Jt, me;
  function Xt(t) {
    if (Jt === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        Jt = e && e[1] || "", me = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + Jt + t + me;
  }
  var Kt = !1;
  function Bt(t, e) {
    if (!t || Kt) return "";
    Kt = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var P = function() {
                throw Error();
              };
              if (Object.defineProperty(P.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(P, []);
                } catch (V) {
                  var Q = V;
                }
                Reflect.construct(t, [], P);
              } else {
                try {
                  P.call();
                } catch (V) {
                  Q = V;
                }
                t.call(P.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (V) {
                Q = V;
              }
              (P = t()) && typeof P.catch == "function" && P.catch(function() {
              });
            }
          } catch (V) {
            if (V && Q && typeof V.stack == "string")
              return [V.stack, Q.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var s = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      s && s.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var u = l.DetermineComponentFrameRoot(), h = u[0], b = u[1];
      if (h && b) {
        var j = h.split(`
`), U = b.split(`
`);
        for (s = l = 0; l < j.length && !j[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; s < U.length && !U[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (l === j.length || s === U.length)
          for (l = j.length - 1, s = U.length - 1; 1 <= l && 0 <= s && j[l] !== U[s]; )
            s--;
        for (; 1 <= l && 0 <= s; l--, s--)
          if (j[l] !== U[s]) {
            if (l !== 1 || s !== 1)
              do
                if (l--, s--, 0 > s || j[l] !== U[s]) {
                  var Z = `
` + j[l].replace(" at new ", " at ");
                  return t.displayName && Z.includes("<anonymous>") && (Z = Z.replace("<anonymous>", t.displayName)), Z;
                }
              while (1 <= l && 0 <= s);
            break;
          }
      }
    } finally {
      Kt = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? Xt(n) : "";
  }
  function Ee(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Xt(t.type);
      case 16:
        return Xt("Lazy");
      case 13:
        return t.child !== e && e !== null ? Xt("Suspense Fallback") : Xt("Suspense");
      case 19:
        return Xt("SuspenseList");
      case 0:
      case 15:
        return Bt(t.type, !1);
      case 11:
        return Bt(t.type.render, !1);
      case 1:
        return Bt(t.type, !0);
      case 31:
        return Xt("Activity");
      default:
        return "";
    }
  }
  function Wt(t) {
    try {
      var e = "", n = null;
      do
        e += Ee(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var et = Object.prototype.hasOwnProperty, Et = a.unstable_scheduleCallback, we = a.unstable_cancelCallback, $n = a.unstable_shouldYield, va = a.unstable_requestPaint, pe = a.unstable_now, gn = a.unstable_getCurrentPriorityLevel, ya = a.unstable_ImmediatePriority, ri = a.unstable_UserBlockingPriority, si = a.unstable_NormalPriority, sr = a.unstable_LowPriority, ur = a.unstable_IdlePriority, cr = a.log, Zs = a.unstable_setDisableYieldValue, Hl = null, nn = null;
  function wa(t) {
    if (typeof cr == "function" && Zs(t), nn && typeof nn.setStrictMode == "function")
      try {
        nn.setStrictMode(Hl, t);
      } catch {
      }
  }
  var an = Math.clz32 ? Math.clz32 : av, ev = Math.log, nv = Math.LN2;
  function av(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (ev(t) / nv | 0) | 0;
  }
  var dr = 256, fr = 262144, hr = 4194304;
  function ui(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & 261888;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function mr(t, e, n) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var s = 0, u = t.suspendedLanes, h = t.pingedLanes;
    t = t.warmLanes;
    var b = l & 134217727;
    return b !== 0 ? (l = b & ~u, l !== 0 ? s = ui(l) : (h &= b, h !== 0 ? s = ui(h) : n || (n = b & ~t, n !== 0 && (s = ui(n))))) : (b = l & ~u, b !== 0 ? s = ui(b) : h !== 0 ? s = ui(h) : n || (n = l & ~t, n !== 0 && (s = ui(n)))), s === 0 ? 0 : e !== 0 && e !== s && (e & u) === 0 && (u = s & -s, n = e & -e, u >= n || u === 32 && (n & 4194048) !== 0) ? e : s;
  }
  function ql(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function iv(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function df() {
    var t = hr;
    return hr <<= 1, (hr & 62914560) === 0 && (hr = 4194304), t;
  }
  function $s(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function Gl(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function lv(t, e, n, l, s, u) {
    var h = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var b = t.entanglements, j = t.expirationTimes, U = t.hiddenUpdates;
    for (n = h & ~n; 0 < n; ) {
      var Z = 31 - an(n), P = 1 << Z;
      b[Z] = 0, j[Z] = -1;
      var Q = U[Z];
      if (Q !== null)
        for (U[Z] = null, Z = 0; Z < Q.length; Z++) {
          var V = Q[Z];
          V !== null && (V.lane &= -536870913);
        }
      n &= ~P;
    }
    l !== 0 && ff(t, l, 0), u !== 0 && s === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(h & ~e));
  }
  function ff(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var l = 31 - an(e);
    t.entangledLanes |= e, t.entanglements[l] = t.entanglements[l] | 1073741824 | n & 261930;
  }
  function hf(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var l = 31 - an(n), s = 1 << l;
      s & e | t[l] & e && (t[l] |= e), n &= ~s;
    }
  }
  function mf(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : Fs(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function Fs(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Js(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function pf() {
    var t = W.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : tg(t.type));
  }
  function gf(t, e) {
    var n = W.p;
    try {
      return W.p = t, e();
    } finally {
      W.p = n;
    }
  }
  var Sa = Math.random().toString(36).slice(2), ke = "__reactFiber$" + Sa, $e = "__reactProps$" + Sa, qi = "__reactContainer$" + Sa, Ws = "__reactEvents$" + Sa, ov = "__reactListeners$" + Sa, rv = "__reactHandles$" + Sa, xf = "__reactResources$" + Sa, Ul = "__reactMarker$" + Sa;
  function Ps(t) {
    delete t[ke], delete t[$e], delete t[Ws], delete t[ov], delete t[rv];
  }
  function Gi(t) {
    var e = t[ke];
    if (e) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[qi] || n[ke]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = qp(t); t !== null; ) {
            if (n = t[ke]) return n;
            t = qp(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function Ui(t) {
    if (t = t[ke] || t[qi]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Ll(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(r(33));
  }
  function Li(t) {
    var e = t[xf];
    return e || (e = t[xf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function De(t) {
    t[Ul] = !0;
  }
  var bf = /* @__PURE__ */ new Set(), vf = {};
  function ci(t, e) {
    Qi(t, e), Qi(t + "Capture", e);
  }
  function Qi(t, e) {
    for (vf[t] = e, t = 0; t < e.length; t++)
      bf.add(e[t]);
  }
  var sv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), yf = {}, wf = {};
  function uv(t) {
    return et.call(wf, t) ? !0 : et.call(yf, t) ? !1 : sv.test(t) ? wf[t] = !0 : (yf[t] = !0, !1);
  }
  function pr(t, e, n) {
    if (uv(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var l = e.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, "" + n);
      }
  }
  function gr(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, "" + n);
    }
  }
  function Fn(t, e, n, l) {
    if (l === null) t.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, "" + l);
    }
  }
  function xn(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Sf(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function cv(t, e, n) {
    var l = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var s = l.get, u = l.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return s.call(this);
        },
        set: function(h) {
          n = "" + h, u.call(this, h);
        }
      }), Object.defineProperty(t, e, {
        enumerable: l.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(h) {
          n = "" + h;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function tu(t) {
    if (!t._valueTracker) {
      var e = Sf(t) ? "checked" : "value";
      t._valueTracker = cv(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Cf(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), l = "";
    return t && (l = Sf(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== n ? (e.setValue(t), !0) : !1;
  }
  function xr(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var dv = /[\n"\\]/g;
  function bn(t) {
    return t.replace(
      dv,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function eu(t, e, n, l, s, u, h, b) {
    t.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? t.type = h : t.removeAttribute("type"), e != null ? h === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + xn(e)) : t.value !== "" + xn(e) && (t.value = "" + xn(e)) : h !== "submit" && h !== "reset" || t.removeAttribute("value"), e != null ? nu(t, h, xn(e)) : n != null ? nu(t, h, xn(n)) : l != null && t.removeAttribute("value"), s == null && u != null && (t.defaultChecked = !!u), s != null && (t.checked = s && typeof s != "function" && typeof s != "symbol"), b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? t.name = "" + xn(b) : t.removeAttribute("name");
  }
  function _f(t, e, n, l, s, u, h, b) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || n != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        tu(t);
        return;
      }
      n = n != null ? "" + xn(n) : "", e = e != null ? "" + xn(e) : n, b || e === t.value || (t.value = e), t.defaultValue = e;
    }
    l = l ?? s, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = b ? t.checked : !!l, t.defaultChecked = !!l, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.name = h), tu(t);
  }
  function nu(t, e, n) {
    e === "number" && xr(t.ownerDocument) === t || t.defaultValue === "" + n || (t.defaultValue = "" + n);
  }
  function Yi(t, e, n, l) {
    if (t = t.options, e) {
      e = {};
      for (var s = 0; s < n.length; s++)
        e["$" + n[s]] = !0;
      for (n = 0; n < t.length; n++)
        s = e.hasOwnProperty("$" + t[n].value), t[n].selected !== s && (t[n].selected = s), s && l && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + xn(n), e = null, s = 0; s < t.length; s++) {
        if (t[s].value === n) {
          t[s].selected = !0, l && (t[s].defaultSelected = !0);
          return;
        }
        e !== null || t[s].disabled || (e = t[s]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Tf(t, e, n) {
    if (e != null && (e = "" + xn(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + xn(n) : "";
  }
  function jf(t, e, n, l) {
    if (e == null) {
      if (l != null) {
        if (n != null) throw Error(r(92));
        if (yt(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), e = n;
    }
    n = xn(e), t.defaultValue = n, l = t.textContent, l === n && l !== "" && l !== null && (t.value = l), tu(t);
  }
  function Vi(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var fv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function zf(t, e, n) {
    var l = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : l ? t.setProperty(e, n) : typeof n != "number" || n === 0 || fv.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Af(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || e != null && e.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
      for (var s in e)
        l = e[s], e.hasOwnProperty(s) && n[s] !== l && zf(t, s, l);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && zf(t, u, e[u]);
  }
  function au(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var hv = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), mv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function br(t) {
    return mv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Jn() {
  }
  var iu = null;
  function lu(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Xi = null, Ki = null;
  function Ef(t) {
    var e = Ui(t);
    if (e && (t = e.stateNode)) {
      var n = t[$e] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (eu(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), e = n.name, n.type === "radio" && e != null) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + bn(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var l = n[e];
              if (l !== t && l.form === t.form) {
                var s = l[$e] || null;
                if (!s) throw Error(r(90));
                eu(
                  l,
                  s.value,
                  s.defaultValue,
                  s.defaultValue,
                  s.checked,
                  s.defaultChecked,
                  s.type,
                  s.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              l = n[e], l.form === t.form && Cf(l);
          }
          break t;
        case "textarea":
          Tf(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && Yi(t, !!n.multiple, e, !1);
      }
    }
  }
  var ou = !1;
  function Rf(t, e, n) {
    if (ou) return t(e, n);
    ou = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (ou = !1, (Xi !== null || Ki !== null) && (ls(), Xi && (e = Xi, t = Ki, Ki = Xi = null, Ef(e), t)))
        for (e = 0; e < t.length; e++) Ef(t[e]);
    }
  }
  function Ql(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var l = n[$e] || null;
    if (l === null) return null;
    n = l[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (l = !l.disabled) || (t = t.type, l = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !l;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function")
      throw Error(
        r(231, e, typeof n)
      );
    return n;
  }
  var Wn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ru = !1;
  if (Wn)
    try {
      var Yl = {};
      Object.defineProperty(Yl, "passive", {
        get: function() {
          ru = !0;
        }
      }), window.addEventListener("test", Yl, Yl), window.removeEventListener("test", Yl, Yl);
    } catch {
      ru = !1;
    }
  var Ca = null, su = null, vr = null;
  function Nf() {
    if (vr) return vr;
    var t, e = su, n = e.length, l, s = "value" in Ca ? Ca.value : Ca.textContent, u = s.length;
    for (t = 0; t < n && e[t] === s[t]; t++) ;
    var h = n - t;
    for (l = 1; l <= h && e[n - l] === s[u - l]; l++) ;
    return vr = s.slice(t, 1 < l ? 1 - l : void 0);
  }
  function yr(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function wr() {
    return !0;
  }
  function Mf() {
    return !1;
  }
  function Fe(t) {
    function e(n, l, s, u, h) {
      this._reactName = n, this._targetInst = s, this.type = l, this.nativeEvent = u, this.target = h, this.currentTarget = null;
      for (var b in t)
        t.hasOwnProperty(b) && (n = t[b], this[b] = n ? n(u) : u[b]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? wr : Mf, this.isPropagationStopped = Mf, this;
    }
    return w(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = wr);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = wr);
      },
      persist: function() {
      },
      isPersistent: wr
    }), e;
  }
  var di = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Sr = Fe(di), Vl = w({}, di, { view: 0, detail: 0 }), pv = Fe(Vl), uu, cu, Xl, Cr = w({}, Vl, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: fu,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Xl && (Xl && t.type === "mousemove" ? (uu = t.screenX - Xl.screenX, cu = t.screenY - Xl.screenY) : cu = uu = 0, Xl = t), uu);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : cu;
    }
  }), Df = Fe(Cr), gv = w({}, Cr, { dataTransfer: 0 }), xv = Fe(gv), bv = w({}, Vl, { relatedTarget: 0 }), du = Fe(bv), vv = w({}, di, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yv = Fe(vv), wv = w({}, di, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), Sv = Fe(wv), Cv = w({}, di, { data: 0 }), Of = Fe(Cv), _v = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Tv = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, jv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function zv(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = jv[t]) ? !!e[t] : !1;
  }
  function fu() {
    return zv;
  }
  var Av = w({}, Vl, {
    key: function(t) {
      if (t.key) {
        var e = _v[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = yr(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Tv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: fu,
    charCode: function(t) {
      return t.type === "keypress" ? yr(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? yr(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), Ev = Fe(Av), Rv = w({}, Cr, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Bf = Fe(Rv), Nv = w({}, Vl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: fu
  }), Mv = Fe(Nv), Dv = w({}, di, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Ov = Fe(Dv), Bv = w({}, Cr, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), kv = Fe(Bv), Hv = w({}, di, {
    newState: 0,
    oldState: 0
  }), qv = Fe(Hv), Gv = [9, 13, 27, 32], hu = Wn && "CompositionEvent" in window, Kl = null;
  Wn && "documentMode" in document && (Kl = document.documentMode);
  var Uv = Wn && "TextEvent" in window && !Kl, kf = Wn && (!hu || Kl && 8 < Kl && 11 >= Kl), Hf = " ", qf = !1;
  function Gf(t, e) {
    switch (t) {
      case "keyup":
        return Gv.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Uf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ii = !1;
  function Lv(t, e) {
    switch (t) {
      case "compositionend":
        return Uf(e);
      case "keypress":
        return e.which !== 32 ? null : (qf = !0, Hf);
      case "textInput":
        return t = e.data, t === Hf && qf ? null : t;
      default:
        return null;
    }
  }
  function Qv(t, e) {
    if (Ii)
      return t === "compositionend" || !hu && Gf(t, e) ? (t = Nf(), vr = su = Ca = null, Ii = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return kf && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Yv = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Lf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Yv[t.type] : e === "textarea";
  }
  function Qf(t, e, n, l) {
    Xi ? Ki ? Ki.push(l) : Ki = [l] : Xi = l, e = fs(e, "onChange"), 0 < e.length && (n = new Sr(
      "onChange",
      "change",
      null,
      n,
      l
    ), t.push({ event: n, listeners: e }));
  }
  var Il = null, Zl = null;
  function Vv(t) {
    _p(t, 0);
  }
  function _r(t) {
    var e = Ll(t);
    if (Cf(e)) return t;
  }
  function Yf(t, e) {
    if (t === "change") return e;
  }
  var Vf = !1;
  if (Wn) {
    var mu;
    if (Wn) {
      var pu = "oninput" in document;
      if (!pu) {
        var Xf = document.createElement("div");
        Xf.setAttribute("oninput", "return;"), pu = typeof Xf.oninput == "function";
      }
      mu = pu;
    } else mu = !1;
    Vf = mu && (!document.documentMode || 9 < document.documentMode);
  }
  function Kf() {
    Il && (Il.detachEvent("onpropertychange", If), Zl = Il = null);
  }
  function If(t) {
    if (t.propertyName === "value" && _r(Zl)) {
      var e = [];
      Qf(
        e,
        Zl,
        t,
        lu(t)
      ), Rf(Vv, e);
    }
  }
  function Xv(t, e, n) {
    t === "focusin" ? (Kf(), Il = e, Zl = n, Il.attachEvent("onpropertychange", If)) : t === "focusout" && Kf();
  }
  function Kv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return _r(Zl);
  }
  function Iv(t, e) {
    if (t === "click") return _r(e);
  }
  function Zv(t, e) {
    if (t === "input" || t === "change")
      return _r(e);
  }
  function $v(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var ln = typeof Object.is == "function" ? Object.is : $v;
  function $l(t, e) {
    if (ln(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), l = Object.keys(e);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var s = n[l];
      if (!et.call(e, s) || !ln(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  function Zf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function $f(t, e) {
    var n = Zf(t);
    t = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (l = t + n.textContent.length, t <= e && l >= e)
          return { node: n, offset: e - t };
        t = l;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Zf(n);
    }
  }
  function Ff(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Ff(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Jf(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = xr(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = xr(t.document);
    }
    return e;
  }
  function gu(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Fv = Wn && "documentMode" in document && 11 >= document.documentMode, Zi = null, xu = null, Fl = null, bu = !1;
  function Wf(t, e, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    bu || Zi == null || Zi !== xr(l) || (l = Zi, "selectionStart" in l && gu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Fl && $l(Fl, l) || (Fl = l, l = fs(xu, "onSelect"), 0 < l.length && (e = new Sr(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }), e.target = Zi)));
  }
  function fi(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var $i = {
    animationend: fi("Animation", "AnimationEnd"),
    animationiteration: fi("Animation", "AnimationIteration"),
    animationstart: fi("Animation", "AnimationStart"),
    transitionrun: fi("Transition", "TransitionRun"),
    transitionstart: fi("Transition", "TransitionStart"),
    transitioncancel: fi("Transition", "TransitionCancel"),
    transitionend: fi("Transition", "TransitionEnd")
  }, vu = {}, Pf = {};
  Wn && (Pf = document.createElement("div").style, "AnimationEvent" in window || (delete $i.animationend.animation, delete $i.animationiteration.animation, delete $i.animationstart.animation), "TransitionEvent" in window || delete $i.transitionend.transition);
  function hi(t) {
    if (vu[t]) return vu[t];
    if (!$i[t]) return t;
    var e = $i[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in Pf)
        return vu[t] = e[n];
    return t;
  }
  var th = hi("animationend"), eh = hi("animationiteration"), nh = hi("animationstart"), Jv = hi("transitionrun"), Wv = hi("transitionstart"), Pv = hi("transitioncancel"), ah = hi("transitionend"), ih = /* @__PURE__ */ new Map(), yu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  yu.push("scrollEnd");
  function Nn(t, e) {
    ih.set(t, e), ci(e, [t]);
  }
  var Tr = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, vn = [], Fi = 0, wu = 0;
  function jr() {
    for (var t = Fi, e = wu = Fi = 0; e < t; ) {
      var n = vn[e];
      vn[e++] = null;
      var l = vn[e];
      vn[e++] = null;
      var s = vn[e];
      vn[e++] = null;
      var u = vn[e];
      if (vn[e++] = null, l !== null && s !== null) {
        var h = l.pending;
        h === null ? s.next = s : (s.next = h.next, h.next = s), l.pending = s;
      }
      u !== 0 && lh(n, s, u);
    }
  }
  function zr(t, e, n, l) {
    vn[Fi++] = t, vn[Fi++] = e, vn[Fi++] = n, vn[Fi++] = l, wu |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function Su(t, e, n, l) {
    return zr(t, e, n, l), Ar(t);
  }
  function mi(t, e) {
    return zr(t, null, null, e), Ar(t);
  }
  function lh(t, e, n) {
    t.lanes |= n;
    var l = t.alternate;
    l !== null && (l.lanes |= n);
    for (var s = !1, u = t.return; u !== null; )
      u.childLanes |= n, l = u.alternate, l !== null && (l.childLanes |= n), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (s = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, s && e !== null && (s = 31 - an(n), t = u.hiddenUpdates, l = t[s], l === null ? t[s] = [e] : l.push(e), e.lane = n | 536870912), u) : null;
  }
  function Ar(t) {
    if (50 < vo)
      throw vo = 0, Nc = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Ji = {};
  function t0(t, e, n, l) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function on(t, e, n, l) {
    return new t0(t, e, n, l);
  }
  function Cu(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Pn(t, e) {
    var n = t.alternate;
    return n === null ? (n = on(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 65011712, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function oh(t, e) {
    t.flags &= 65011714;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Er(t, e, n, l, s, u) {
    var h = 0;
    if (l = t, typeof t == "function") Cu(t) && (h = 1);
    else if (typeof t == "string")
      h = ly(
        t,
        n,
        it.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case k:
          return t = on(31, n, e, s), t.elementType = k, t.lanes = u, t;
        case B:
          return pi(n.children, s, u, e);
        case z:
          h = 8, s |= 24;
          break;
        case _:
          return t = on(12, n, e, s | 2), t.elementType = _, t.lanes = u, t;
        case y:
          return t = on(13, n, e, s), t.elementType = y, t.lanes = u, t;
        case D:
          return t = on(19, n, e, s), t.elementType = D, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case L:
                h = 10;
                break t;
              case R:
                h = 9;
                break t;
              case q:
                h = 11;
                break t;
              case v:
                h = 14;
                break t;
              case M:
                h = 16, l = null;
                break t;
            }
          h = 29, n = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return e = on(h, n, e, s), e.elementType = t, e.type = l, e.lanes = u, e;
  }
  function pi(t, e, n, l) {
    return t = on(7, t, l, e), t.lanes = n, t;
  }
  function _u(t, e, n) {
    return t = on(6, t, null, e), t.lanes = n, t;
  }
  function rh(t) {
    var e = on(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Tu(t, e, n) {
    return e = on(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = n, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var sh = /* @__PURE__ */ new WeakMap();
  function yn(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = sh.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Wt(e)
      }, sh.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Wt(e)
    };
  }
  var Wi = [], Pi = 0, Rr = null, Jl = 0, wn = [], Sn = 0, _a = null, qn = 1, Gn = "";
  function ta(t, e) {
    Wi[Pi++] = Jl, Wi[Pi++] = Rr, Rr = t, Jl = e;
  }
  function uh(t, e, n) {
    wn[Sn++] = qn, wn[Sn++] = Gn, wn[Sn++] = _a, _a = t;
    var l = qn;
    t = Gn;
    var s = 32 - an(l) - 1;
    l &= ~(1 << s), n += 1;
    var u = 32 - an(e) + s;
    if (30 < u) {
      var h = s - s % 5;
      u = (l & (1 << h) - 1).toString(32), l >>= h, s -= h, qn = 1 << 32 - an(e) + s | n << s | l, Gn = u + t;
    } else
      qn = 1 << u | n << s | l, Gn = t;
  }
  function ju(t) {
    t.return !== null && (ta(t, 1), uh(t, 1, 0));
  }
  function zu(t) {
    for (; t === Rr; )
      Rr = Wi[--Pi], Wi[Pi] = null, Jl = Wi[--Pi], Wi[Pi] = null;
    for (; t === _a; )
      _a = wn[--Sn], wn[Sn] = null, Gn = wn[--Sn], wn[Sn] = null, qn = wn[--Sn], wn[Sn] = null;
  }
  function ch(t, e) {
    wn[Sn++] = qn, wn[Sn++] = Gn, wn[Sn++] = _a, qn = e.id, Gn = e.overflow, _a = t;
  }
  var He = null, ue = null, Qt = !1, Ta = null, Cn = !1, Au = Error(r(519));
  function ja(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Wl(yn(e, t)), Au;
  }
  function dh(t) {
    var e = t.stateNode, n = t.type, l = t.memoizedProps;
    switch (e[ke] = t, e[$e] = l, n) {
      case "dialog":
        Ht("cancel", e), Ht("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ht("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < wo.length; n++)
          Ht(wo[n], e);
        break;
      case "source":
        Ht("error", e);
        break;
      case "img":
      case "image":
      case "link":
        Ht("error", e), Ht("load", e);
        break;
      case "details":
        Ht("toggle", e);
        break;
      case "input":
        Ht("invalid", e), _f(
          e,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        Ht("invalid", e);
        break;
      case "textarea":
        Ht("invalid", e), jf(e, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || l.suppressHydrationWarning === !0 || Ap(e.textContent, n) ? (l.popover != null && (Ht("beforetoggle", e), Ht("toggle", e)), l.onScroll != null && Ht("scroll", e), l.onScrollEnd != null && Ht("scrollend", e), l.onClick != null && (e.onclick = Jn), e = !0) : e = !1, e || ja(t, !0);
  }
  function fh(t) {
    for (He = t.return; He; )
      switch (He.tag) {
        case 5:
        case 31:
        case 13:
          Cn = !1;
          return;
        case 27:
        case 3:
          Cn = !0;
          return;
        default:
          He = He.return;
      }
  }
  function tl(t) {
    if (t !== He) return !1;
    if (!Qt) return fh(t), Qt = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || Kc(t.type, t.memoizedProps)), n = !n), n && ue && ja(t), fh(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      ue = Hp(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      ue = Hp(t);
    } else
      e === 27 ? (e = ue, Ua(t.type) ? (t = Jc, Jc = null, ue = t) : ue = e) : ue = He ? Tn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function gi() {
    ue = He = null, Qt = !1;
  }
  function Eu() {
    var t = Ta;
    return t !== null && (tn === null ? tn = t : tn.push.apply(
      tn,
      t
    ), Ta = null), t;
  }
  function Wl(t) {
    Ta === null ? Ta = [t] : Ta.push(t);
  }
  var Ru = T(null), xi = null, ea = null;
  function za(t, e, n) {
    X(Ru, e._currentValue), e._currentValue = n;
  }
  function na(t) {
    t._currentValue = Ru.current, Y(Ru);
  }
  function Nu(t, e, n) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, l !== null && (l.childLanes |= e)) : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function Mu(t, e, n, l) {
    var s = t.child;
    for (s !== null && (s.return = t); s !== null; ) {
      var u = s.dependencies;
      if (u !== null) {
        var h = s.child;
        u = u.firstContext;
        t: for (; u !== null; ) {
          var b = u;
          u = s;
          for (var j = 0; j < e.length; j++)
            if (b.context === e[j]) {
              u.lanes |= n, b = u.alternate, b !== null && (b.lanes |= n), Nu(
                u.return,
                n,
                t
              ), l || (h = null);
              break t;
            }
          u = b.next;
        }
      } else if (s.tag === 18) {
        if (h = s.return, h === null) throw Error(r(341));
        h.lanes |= n, u = h.alternate, u !== null && (u.lanes |= n), Nu(h, n, t), h = null;
      } else h = s.child;
      if (h !== null) h.return = s;
      else
        for (h = s; h !== null; ) {
          if (h === t) {
            h = null;
            break;
          }
          if (s = h.sibling, s !== null) {
            s.return = h.return, h = s;
            break;
          }
          h = h.return;
        }
      s = h;
    }
  }
  function el(t, e, n, l) {
    t = null;
    for (var s = e, u = !1; s !== null; ) {
      if (!u) {
        if ((s.flags & 524288) !== 0) u = !0;
        else if ((s.flags & 262144) !== 0) break;
      }
      if (s.tag === 10) {
        var h = s.alternate;
        if (h === null) throw Error(r(387));
        if (h = h.memoizedProps, h !== null) {
          var b = s.type;
          ln(s.pendingProps.value, h.value) || (t !== null ? t.push(b) : t = [b]);
        }
      } else if (s === At.current) {
        if (h = s.alternate, h === null) throw Error(r(387));
        h.memoizedState.memoizedState !== s.memoizedState.memoizedState && (t !== null ? t.push(jo) : t = [jo]);
      }
      s = s.return;
    }
    t !== null && Mu(
      e,
      t,
      n,
      l
    ), e.flags |= 262144;
  }
  function Nr(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!ln(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function bi(t) {
    xi = t, ea = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function qe(t) {
    return hh(xi, t);
  }
  function Mr(t, e) {
    return xi === null && bi(t), hh(t, e);
  }
  function hh(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, ea === null) {
      if (t === null) throw Error(r(308));
      ea = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else ea = ea.next = e;
    return n;
  }
  var e0 = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, l) {
        t.push(l);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, n0 = a.unstable_scheduleCallback, a0 = a.unstable_NormalPriority, _e = {
    $$typeof: L,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Du() {
    return {
      controller: new e0(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Pl(t) {
    t.refCount--, t.refCount === 0 && n0(a0, function() {
      t.controller.abort();
    });
  }
  var to = null, Ou = 0, nl = 0, al = null;
  function i0(t, e) {
    if (to === null) {
      var n = to = [];
      Ou = 0, nl = Hc(), al = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return Ou++, e.then(mh, mh), e;
  }
  function mh() {
    if (--Ou === 0 && to !== null) {
      al !== null && (al.status = "fulfilled");
      var t = to;
      to = null, nl = 0, al = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function l0(t, e) {
    var n = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(s) {
        n.push(s);
      }
    };
    return t.then(
      function() {
        l.status = "fulfilled", l.value = e;
        for (var s = 0; s < n.length; s++) (0, n[s])(e);
      },
      function(s) {
        for (l.status = "rejected", l.reason = s, s = 0; s < n.length; s++)
          (0, n[s])(void 0);
      }
    ), l;
  }
  var ph = H.S;
  H.S = function(t, e) {
    Wm = pe(), typeof e == "object" && e !== null && typeof e.then == "function" && i0(t, e), ph !== null && ph(t, e);
  };
  var vi = T(null);
  function Bu() {
    var t = vi.current;
    return t !== null ? t : se.pooledCache;
  }
  function Dr(t, e) {
    e === null ? X(vi, vi.current) : X(vi, e.pool);
  }
  function gh() {
    var t = Bu();
    return t === null ? null : { parent: _e._currentValue, pool: t };
  }
  var il = Error(r(460)), ku = Error(r(474)), Or = Error(r(542)), Br = { then: function() {
  } };
  function xh(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function bh(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(Jn, Jn), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, yh(t), t;
      default:
        if (typeof e.status == "string") e.then(Jn, Jn);
        else {
          if (t = se, t !== null && 100 < t.shellSuspendCounter)
            throw Error(r(482));
          t = e, t.status = "pending", t.then(
            function(l) {
              if (e.status === "pending") {
                var s = e;
                s.status = "fulfilled", s.value = l;
              }
            },
            function(l) {
              if (e.status === "pending") {
                var s = e;
                s.status = "rejected", s.reason = l;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, yh(t), t;
        }
        throw wi = e, il;
    }
  }
  function yi(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (wi = n, il) : n;
    }
  }
  var wi = null;
  function vh() {
    if (wi === null) throw Error(r(459));
    var t = wi;
    return wi = null, t;
  }
  function yh(t) {
    if (t === il || t === Or)
      throw Error(r(483));
  }
  var ll = null, eo = 0;
  function kr(t) {
    var e = eo;
    return eo += 1, ll === null && (ll = []), bh(ll, t, e);
  }
  function no(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Hr(t, e) {
    throw e.$$typeof === C ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function wh(t) {
    function e(O, E) {
      if (t) {
        var G = O.deletions;
        G === null ? (O.deletions = [E], O.flags |= 16) : G.push(E);
      }
    }
    function n(O, E) {
      if (!t) return null;
      for (; E !== null; )
        e(O, E), E = E.sibling;
      return null;
    }
    function l(O) {
      for (var E = /* @__PURE__ */ new Map(); O !== null; )
        O.key !== null ? E.set(O.key, O) : E.set(O.index, O), O = O.sibling;
      return E;
    }
    function s(O, E) {
      return O = Pn(O, E), O.index = 0, O.sibling = null, O;
    }
    function u(O, E, G) {
      return O.index = G, t ? (G = O.alternate, G !== null ? (G = G.index, G < E ? (O.flags |= 67108866, E) : G) : (O.flags |= 67108866, E)) : (O.flags |= 1048576, E);
    }
    function h(O) {
      return t && O.alternate === null && (O.flags |= 67108866), O;
    }
    function b(O, E, G, J) {
      return E === null || E.tag !== 6 ? (E = _u(G, O.mode, J), E.return = O, E) : (E = s(E, G), E.return = O, E);
    }
    function j(O, E, G, J) {
      var wt = G.type;
      return wt === B ? Z(
        O,
        E,
        G.props.children,
        J,
        G.key
      ) : E !== null && (E.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === M && yi(wt) === E.type) ? (E = s(E, G.props), no(E, G), E.return = O, E) : (E = Er(
        G.type,
        G.key,
        G.props,
        null,
        O.mode,
        J
      ), no(E, G), E.return = O, E);
    }
    function U(O, E, G, J) {
      return E === null || E.tag !== 4 || E.stateNode.containerInfo !== G.containerInfo || E.stateNode.implementation !== G.implementation ? (E = Tu(G, O.mode, J), E.return = O, E) : (E = s(E, G.children || []), E.return = O, E);
    }
    function Z(O, E, G, J, wt) {
      return E === null || E.tag !== 7 ? (E = pi(
        G,
        O.mode,
        J,
        wt
      ), E.return = O, E) : (E = s(E, G), E.return = O, E);
    }
    function P(O, E, G) {
      if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
        return E = _u(
          "" + E,
          O.mode,
          G
        ), E.return = O, E;
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case A:
            return G = Er(
              E.type,
              E.key,
              E.props,
              null,
              O.mode,
              G
            ), no(G, E), G.return = O, G;
          case N:
            return E = Tu(
              E,
              O.mode,
              G
            ), E.return = O, E;
          case M:
            return E = yi(E), P(O, E, G);
        }
        if (yt(E) || ct(E))
          return E = pi(
            E,
            O.mode,
            G,
            null
          ), E.return = O, E;
        if (typeof E.then == "function")
          return P(O, kr(E), G);
        if (E.$$typeof === L)
          return P(
            O,
            Mr(O, E),
            G
          );
        Hr(O, E);
      }
      return null;
    }
    function Q(O, E, G, J) {
      var wt = E !== null ? E.key : null;
      if (typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint")
        return wt !== null ? null : b(O, E, "" + G, J);
      if (typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case A:
            return G.key === wt ? j(O, E, G, J) : null;
          case N:
            return G.key === wt ? U(O, E, G, J) : null;
          case M:
            return G = yi(G), Q(O, E, G, J);
        }
        if (yt(G) || ct(G))
          return wt !== null ? null : Z(O, E, G, J, null);
        if (typeof G.then == "function")
          return Q(
            O,
            E,
            kr(G),
            J
          );
        if (G.$$typeof === L)
          return Q(
            O,
            E,
            Mr(O, G),
            J
          );
        Hr(O, G);
      }
      return null;
    }
    function V(O, E, G, J, wt) {
      if (typeof J == "string" && J !== "" || typeof J == "number" || typeof J == "bigint")
        return O = O.get(G) || null, b(E, O, "" + J, wt);
      if (typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case A:
            return O = O.get(
              J.key === null ? G : J.key
            ) || null, j(E, O, J, wt);
          case N:
            return O = O.get(
              J.key === null ? G : J.key
            ) || null, U(E, O, J, wt);
          case M:
            return J = yi(J), V(
              O,
              E,
              G,
              J,
              wt
            );
        }
        if (yt(J) || ct(J))
          return O = O.get(G) || null, Z(E, O, J, wt, null);
        if (typeof J.then == "function")
          return V(
            O,
            E,
            G,
            kr(J),
            wt
          );
        if (J.$$typeof === L)
          return V(
            O,
            E,
            G,
            Mr(E, J),
            wt
          );
        Hr(E, J);
      }
      return null;
    }
    function mt(O, E, G, J) {
      for (var wt = null, It = null, xt = E, Mt = E = 0, Ut = null; xt !== null && Mt < G.length; Mt++) {
        xt.index > Mt ? (Ut = xt, xt = null) : Ut = xt.sibling;
        var Zt = Q(
          O,
          xt,
          G[Mt],
          J
        );
        if (Zt === null) {
          xt === null && (xt = Ut);
          break;
        }
        t && xt && Zt.alternate === null && e(O, xt), E = u(Zt, E, Mt), It === null ? wt = Zt : It.sibling = Zt, It = Zt, xt = Ut;
      }
      if (Mt === G.length)
        return n(O, xt), Qt && ta(O, Mt), wt;
      if (xt === null) {
        for (; Mt < G.length; Mt++)
          xt = P(O, G[Mt], J), xt !== null && (E = u(
            xt,
            E,
            Mt
          ), It === null ? wt = xt : It.sibling = xt, It = xt);
        return Qt && ta(O, Mt), wt;
      }
      for (xt = l(xt); Mt < G.length; Mt++)
        Ut = V(
          xt,
          O,
          Mt,
          G[Mt],
          J
        ), Ut !== null && (t && Ut.alternate !== null && xt.delete(
          Ut.key === null ? Mt : Ut.key
        ), E = u(
          Ut,
          E,
          Mt
        ), It === null ? wt = Ut : It.sibling = Ut, It = Ut);
      return t && xt.forEach(function(Xa) {
        return e(O, Xa);
      }), Qt && ta(O, Mt), wt;
    }
    function Ct(O, E, G, J) {
      if (G == null) throw Error(r(151));
      for (var wt = null, It = null, xt = E, Mt = E = 0, Ut = null, Zt = G.next(); xt !== null && !Zt.done; Mt++, Zt = G.next()) {
        xt.index > Mt ? (Ut = xt, xt = null) : Ut = xt.sibling;
        var Xa = Q(O, xt, Zt.value, J);
        if (Xa === null) {
          xt === null && (xt = Ut);
          break;
        }
        t && xt && Xa.alternate === null && e(O, xt), E = u(Xa, E, Mt), It === null ? wt = Xa : It.sibling = Xa, It = Xa, xt = Ut;
      }
      if (Zt.done)
        return n(O, xt), Qt && ta(O, Mt), wt;
      if (xt === null) {
        for (; !Zt.done; Mt++, Zt = G.next())
          Zt = P(O, Zt.value, J), Zt !== null && (E = u(Zt, E, Mt), It === null ? wt = Zt : It.sibling = Zt, It = Zt);
        return Qt && ta(O, Mt), wt;
      }
      for (xt = l(xt); !Zt.done; Mt++, Zt = G.next())
        Zt = V(xt, O, Mt, Zt.value, J), Zt !== null && (t && Zt.alternate !== null && xt.delete(Zt.key === null ? Mt : Zt.key), E = u(Zt, E, Mt), It === null ? wt = Zt : It.sibling = Zt, It = Zt);
      return t && xt.forEach(function(gy) {
        return e(O, gy);
      }), Qt && ta(O, Mt), wt;
    }
    function le(O, E, G, J) {
      if (typeof G == "object" && G !== null && G.type === B && G.key === null && (G = G.props.children), typeof G == "object" && G !== null) {
        switch (G.$$typeof) {
          case A:
            t: {
              for (var wt = G.key; E !== null; ) {
                if (E.key === wt) {
                  if (wt = G.type, wt === B) {
                    if (E.tag === 7) {
                      n(
                        O,
                        E.sibling
                      ), J = s(
                        E,
                        G.props.children
                      ), J.return = O, O = J;
                      break t;
                    }
                  } else if (E.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === M && yi(wt) === E.type) {
                    n(
                      O,
                      E.sibling
                    ), J = s(E, G.props), no(J, G), J.return = O, O = J;
                    break t;
                  }
                  n(O, E);
                  break;
                } else e(O, E);
                E = E.sibling;
              }
              G.type === B ? (J = pi(
                G.props.children,
                O.mode,
                J,
                G.key
              ), J.return = O, O = J) : (J = Er(
                G.type,
                G.key,
                G.props,
                null,
                O.mode,
                J
              ), no(J, G), J.return = O, O = J);
            }
            return h(O);
          case N:
            t: {
              for (wt = G.key; E !== null; ) {
                if (E.key === wt)
                  if (E.tag === 4 && E.stateNode.containerInfo === G.containerInfo && E.stateNode.implementation === G.implementation) {
                    n(
                      O,
                      E.sibling
                    ), J = s(E, G.children || []), J.return = O, O = J;
                    break t;
                  } else {
                    n(O, E);
                    break;
                  }
                else e(O, E);
                E = E.sibling;
              }
              J = Tu(G, O.mode, J), J.return = O, O = J;
            }
            return h(O);
          case M:
            return G = yi(G), le(
              O,
              E,
              G,
              J
            );
        }
        if (yt(G))
          return mt(
            O,
            E,
            G,
            J
          );
        if (ct(G)) {
          if (wt = ct(G), typeof wt != "function") throw Error(r(150));
          return G = wt.call(G), Ct(
            O,
            E,
            G,
            J
          );
        }
        if (typeof G.then == "function")
          return le(
            O,
            E,
            kr(G),
            J
          );
        if (G.$$typeof === L)
          return le(
            O,
            E,
            Mr(O, G),
            J
          );
        Hr(O, G);
      }
      return typeof G == "string" && G !== "" || typeof G == "number" || typeof G == "bigint" ? (G = "" + G, E !== null && E.tag === 6 ? (n(O, E.sibling), J = s(E, G), J.return = O, O = J) : (n(O, E), J = _u(G, O.mode, J), J.return = O, O = J), h(O)) : n(O, E);
    }
    return function(O, E, G, J) {
      try {
        eo = 0;
        var wt = le(
          O,
          E,
          G,
          J
        );
        return ll = null, wt;
      } catch (xt) {
        if (xt === il || xt === Or) throw xt;
        var It = on(29, xt, null, O.mode);
        return It.lanes = J, It.return = O, It;
      } finally {
      }
    };
  }
  var Si = wh(!0), Sh = wh(!1), Aa = !1;
  function Hu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function qu(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Ea(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ra(t, e, n) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ft & 2) !== 0) {
      var s = l.pending;
      return s === null ? e.next = e : (e.next = s.next, s.next = e), l.pending = e, e = Ar(t), lh(t, null, n), e;
    }
    return zr(t, l, e, n), Ar(t);
  }
  function ao(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, hf(t, n);
    }
  }
  function Gu(t, e) {
    var n = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
      var s = null, u = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var h = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          u === null ? s = u = h : u = u.next = h, n = n.next;
        } while (n !== null);
        u === null ? s = u = e : u = u.next = e;
      } else s = u = e;
      n = {
        baseState: l.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: u,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var Uu = !1;
  function io() {
    if (Uu) {
      var t = al;
      if (t !== null) throw t;
    }
  }
  function lo(t, e, n, l) {
    Uu = !1;
    var s = t.updateQueue;
    Aa = !1;
    var u = s.firstBaseUpdate, h = s.lastBaseUpdate, b = s.shared.pending;
    if (b !== null) {
      s.shared.pending = null;
      var j = b, U = j.next;
      j.next = null, h === null ? u = U : h.next = U, h = j;
      var Z = t.alternate;
      Z !== null && (Z = Z.updateQueue, b = Z.lastBaseUpdate, b !== h && (b === null ? Z.firstBaseUpdate = U : b.next = U, Z.lastBaseUpdate = j));
    }
    if (u !== null) {
      var P = s.baseState;
      h = 0, Z = U = j = null, b = u;
      do {
        var Q = b.lane & -536870913, V = Q !== b.lane;
        if (V ? (Gt & Q) === Q : (l & Q) === Q) {
          Q !== 0 && Q === nl && (Uu = !0), Z !== null && (Z = Z.next = {
            lane: 0,
            tag: b.tag,
            payload: b.payload,
            callback: null,
            next: null
          });
          t: {
            var mt = t, Ct = b;
            Q = e;
            var le = n;
            switch (Ct.tag) {
              case 1:
                if (mt = Ct.payload, typeof mt == "function") {
                  P = mt.call(le, P, Q);
                  break t;
                }
                P = mt;
                break t;
              case 3:
                mt.flags = mt.flags & -65537 | 128;
              case 0:
                if (mt = Ct.payload, Q = typeof mt == "function" ? mt.call(le, P, Q) : mt, Q == null) break t;
                P = w({}, P, Q);
                break t;
              case 2:
                Aa = !0;
            }
          }
          Q = b.callback, Q !== null && (t.flags |= 64, V && (t.flags |= 8192), V = s.callbacks, V === null ? s.callbacks = [Q] : V.push(Q));
        } else
          V = {
            lane: Q,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null
          }, Z === null ? (U = Z = V, j = P) : Z = Z.next = V, h |= Q;
        if (b = b.next, b === null) {
          if (b = s.shared.pending, b === null)
            break;
          V = b, b = V.next, V.next = null, s.lastBaseUpdate = V, s.shared.pending = null;
        }
      } while (!0);
      Z === null && (j = P), s.baseState = j, s.firstBaseUpdate = U, s.lastBaseUpdate = Z, u === null && (s.shared.lanes = 0), Ba |= h, t.lanes = h, t.memoizedState = P;
    }
  }
  function Ch(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function _h(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        Ch(n[t], e);
  }
  var ol = T(null), qr = T(0);
  function Th(t, e) {
    t = da, X(qr, t), X(ol, e), da = t | e.baseLanes;
  }
  function Lu() {
    X(qr, da), X(ol, ol.current);
  }
  function Qu() {
    da = qr.current, Y(ol), Y(qr);
  }
  var rn = T(null), _n = null;
  function Na(t) {
    var e = t.alternate;
    X(Se, Se.current & 1), X(rn, t), _n === null && (e === null || ol.current !== null || e.memoizedState !== null) && (_n = t);
  }
  function Yu(t) {
    X(Se, Se.current), X(rn, t), _n === null && (_n = t);
  }
  function jh(t) {
    t.tag === 22 ? (X(Se, Se.current), X(rn, t), _n === null && (_n = t)) : Ma();
  }
  function Ma() {
    X(Se, Se.current), X(rn, rn.current);
  }
  function sn(t) {
    Y(rn), _n === t && (_n = null), Y(Se);
  }
  var Se = T(0);
  function Gr(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || $c(n) || Fc(n)))
          return e;
      } else if (e.tag === 19 && (e.memoizedProps.revealOrder === "forwards" || e.memoizedProps.revealOrder === "backwards" || e.memoizedProps.revealOrder === "unstable_legacy-backwards" || e.memoizedProps.revealOrder === "together")) {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var aa = 0, Nt = null, ae = null, Te = null, Ur = !1, rl = !1, Ci = !1, Lr = 0, oo = 0, sl = null, o0 = 0;
  function be() {
    throw Error(r(321));
  }
  function Vu(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!ln(t[n], e[n])) return !1;
    return !0;
  }
  function Xu(t, e, n, l, s, u) {
    return aa = u, Nt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, H.H = t === null || t.memoizedState === null ? um : oc, Ci = !1, u = n(l, s), Ci = !1, rl && (u = Ah(
      e,
      n,
      l,
      s
    )), zh(t), u;
  }
  function zh(t) {
    H.H = uo;
    var e = ae !== null && ae.next !== null;
    if (aa = 0, Te = ae = Nt = null, Ur = !1, oo = 0, sl = null, e) throw Error(r(300));
    t === null || je || (t = t.dependencies, t !== null && Nr(t) && (je = !0));
  }
  function Ah(t, e, n, l) {
    Nt = t;
    var s = 0;
    do {
      if (rl && (sl = null), oo = 0, rl = !1, 25 <= s) throw Error(r(301));
      if (s += 1, Te = ae = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      H.H = cm, u = e(n, l);
    } while (rl);
    return u;
  }
  function r0() {
    var t = H.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? ro(e) : e, t = t.useState()[0], (ae !== null ? ae.memoizedState : null) !== t && (Nt.flags |= 1024), e;
  }
  function Ku() {
    var t = Lr !== 0;
    return Lr = 0, t;
  }
  function Iu(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function Zu(t) {
    if (Ur) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Ur = !1;
    }
    aa = 0, Te = ae = Nt = null, rl = !1, oo = Lr = 0, sl = null;
  }
  function Ke() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Te === null ? Nt.memoizedState = Te = t : Te = Te.next = t, Te;
  }
  function Ce() {
    if (ae === null) {
      var t = Nt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = ae.next;
    var e = Te === null ? Nt.memoizedState : Te.next;
    if (e !== null)
      Te = e, ae = t;
    else {
      if (t === null)
        throw Nt.alternate === null ? Error(r(467)) : Error(r(310));
      ae = t, t = {
        memoizedState: ae.memoizedState,
        baseState: ae.baseState,
        baseQueue: ae.baseQueue,
        queue: ae.queue,
        next: null
      }, Te === null ? Nt.memoizedState = Te = t : Te = Te.next = t;
    }
    return Te;
  }
  function Qr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ro(t) {
    var e = oo;
    return oo += 1, sl === null && (sl = []), t = bh(sl, t, e), e = Nt, (Te === null ? e.memoizedState : Te.next) === null && (e = e.alternate, H.H = e === null || e.memoizedState === null ? um : oc), t;
  }
  function Yr(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return ro(t);
      if (t.$$typeof === L) return qe(t);
    }
    throw Error(r(438, String(t)));
  }
  function $u(t) {
    var e = null, n = Nt.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var l = Nt.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (e = {
        data: l.data.map(function(s) {
          return s.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Qr(), Nt.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), l = 0; l < t; l++)
        n[l] = K;
    return e.index++, n;
  }
  function ia(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Vr(t) {
    var e = Ce();
    return Fu(e, ae, t);
  }
  function Fu(t, e, n) {
    var l = t.queue;
    if (l === null) throw Error(r(311));
    l.lastRenderedReducer = n;
    var s = t.baseQueue, u = l.pending;
    if (u !== null) {
      if (s !== null) {
        var h = s.next;
        s.next = u.next, u.next = h;
      }
      e.baseQueue = s = u, l.pending = null;
    }
    if (u = t.baseState, s === null) t.memoizedState = u;
    else {
      e = s.next;
      var b = h = null, j = null, U = e, Z = !1;
      do {
        var P = U.lane & -536870913;
        if (P !== U.lane ? (Gt & P) === P : (aa & P) === P) {
          var Q = U.revertLane;
          if (Q === 0)
            j !== null && (j = j.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), P === nl && (Z = !0);
          else if ((aa & Q) === Q) {
            U = U.next, Q === nl && (Z = !0);
            continue;
          } else
            P = {
              lane: 0,
              revertLane: U.revertLane,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }, j === null ? (b = j = P, h = u) : j = j.next = P, Nt.lanes |= Q, Ba |= Q;
          P = U.action, Ci && n(u, P), u = U.hasEagerState ? U.eagerState : n(u, P);
        } else
          Q = {
            lane: P,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, j === null ? (b = j = Q, h = u) : j = j.next = Q, Nt.lanes |= P, Ba |= P;
        U = U.next;
      } while (U !== null && U !== e);
      if (j === null ? h = u : j.next = b, !ln(u, t.memoizedState) && (je = !0, Z && (n = al, n !== null)))
        throw n;
      t.memoizedState = u, t.baseState = h, t.baseQueue = j, l.lastRenderedState = u;
    }
    return s === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function Ju(t) {
    var e = Ce(), n = e.queue;
    if (n === null) throw Error(r(311));
    n.lastRenderedReducer = t;
    var l = n.dispatch, s = n.pending, u = e.memoizedState;
    if (s !== null) {
      n.pending = null;
      var h = s = s.next;
      do
        u = t(u, h.action), h = h.next;
      while (h !== s);
      ln(u, e.memoizedState) || (je = !0), e.memoizedState = u, e.baseQueue === null && (e.baseState = u), n.lastRenderedState = u;
    }
    return [u, l];
  }
  function Eh(t, e, n) {
    var l = Nt, s = Ce(), u = Qt;
    if (u) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = e();
    var h = !ln(
      (ae || s).memoizedState,
      n
    );
    if (h && (s.memoizedState = n, je = !0), s = s.queue, tc(Mh.bind(null, l, s, t), [
      t
    ]), s.getSnapshot !== e || h || Te !== null && Te.memoizedState.tag & 1) {
      if (l.flags |= 2048, ul(
        9,
        { destroy: void 0 },
        Nh.bind(
          null,
          l,
          s,
          n,
          e
        ),
        null
      ), se === null) throw Error(r(349));
      u || (aa & 127) !== 0 || Rh(l, e, n);
    }
    return n;
  }
  function Rh(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = Nt.updateQueue, e === null ? (e = Qr(), Nt.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function Nh(t, e, n, l) {
    e.value = n, e.getSnapshot = l, Dh(e) && Oh(t);
  }
  function Mh(t, e, n) {
    return n(function() {
      Dh(e) && Oh(t);
    });
  }
  function Dh(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !ln(t, n);
    } catch {
      return !0;
    }
  }
  function Oh(t) {
    var e = mi(t, 2);
    e !== null && en(e, t, 2);
  }
  function Wu(t) {
    var e = Ke();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), Ci) {
        wa(!0);
        try {
          n();
        } finally {
          wa(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: ia,
      lastRenderedState: t
    }, e;
  }
  function Bh(t, e, n, l) {
    return t.baseState = n, Fu(
      t,
      ae,
      typeof l == "function" ? l : ia
    );
  }
  function s0(t, e, n, l, s) {
    if (Ir(t)) throw Error(r(485));
    if (t = e.action, t !== null) {
      var u = {
        payload: s,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(h) {
          u.listeners.push(h);
        }
      };
      H.T !== null ? n(!0) : u.isTransition = !1, l(u), n = e.pending, n === null ? (u.next = e.pending = u, kh(e, u)) : (u.next = n.next, e.pending = n.next = u);
    }
  }
  function kh(t, e) {
    var n = e.action, l = e.payload, s = t.state;
    if (e.isTransition) {
      var u = H.T, h = {};
      H.T = h;
      try {
        var b = n(s, l), j = H.S;
        j !== null && j(h, b), Hh(t, e, b);
      } catch (U) {
        Pu(t, e, U);
      } finally {
        u !== null && h.types !== null && (u.types = h.types), H.T = u;
      }
    } else
      try {
        u = n(s, l), Hh(t, e, u);
      } catch (U) {
        Pu(t, e, U);
      }
  }
  function Hh(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        qh(t, e, l);
      },
      function(l) {
        return Pu(t, e, l);
      }
    ) : qh(t, e, n);
  }
  function qh(t, e, n) {
    e.status = "fulfilled", e.value = n, Gh(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, kh(t, n)));
  }
  function Pu(t, e, n) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        e.status = "rejected", e.reason = n, Gh(e), e = e.next;
      while (e !== l);
    }
    t.action = null;
  }
  function Gh(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Uh(t, e) {
    return e;
  }
  function Lh(t, e) {
    if (Qt) {
      var n = se.formState;
      if (n !== null) {
        t: {
          var l = Nt;
          if (Qt) {
            if (ue) {
              e: {
                for (var s = ue, u = Cn; s.nodeType !== 8; ) {
                  if (!u) {
                    s = null;
                    break e;
                  }
                  if (s = Tn(
                    s.nextSibling
                  ), s === null) {
                    s = null;
                    break e;
                  }
                }
                u = s.data, s = u === "F!" || u === "F" ? s : null;
              }
              if (s) {
                ue = Tn(
                  s.nextSibling
                ), l = s.data === "F!";
                break t;
              }
            }
            ja(l);
          }
          l = !1;
        }
        l && (e = n[0]);
      }
    }
    return n = Ke(), n.memoizedState = n.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Uh,
      lastRenderedState: e
    }, n.queue = l, n = om.bind(
      null,
      Nt,
      l
    ), l.dispatch = n, l = Wu(!1), u = lc.bind(
      null,
      Nt,
      !1,
      l.queue
    ), l = Ke(), s = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = s, n = s0.bind(
      null,
      Nt,
      s,
      u,
      n
    ), s.dispatch = n, l.memoizedState = t, [e, n, !1];
  }
  function Qh(t) {
    var e = Ce();
    return Yh(e, ae, t);
  }
  function Yh(t, e, n) {
    if (e = Fu(
      t,
      e,
      Uh
    )[0], t = Vr(ia)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var l = ro(e);
      } catch (h) {
        throw h === il ? Or : h;
      }
    else l = e;
    e = Ce();
    var s = e.queue, u = s.dispatch;
    return n !== e.memoizedState && (Nt.flags |= 2048, ul(
      9,
      { destroy: void 0 },
      u0.bind(null, s, n),
      null
    )), [l, u, t];
  }
  function u0(t, e) {
    t.action = e;
  }
  function Vh(t) {
    var e = Ce(), n = ae;
    if (n !== null)
      return Yh(e, n, t);
    Ce(), e = e.memoizedState, n = Ce();
    var l = n.queue.dispatch;
    return n.memoizedState = t, [e, l, !1];
  }
  function ul(t, e, n, l) {
    return t = { tag: t, create: n, deps: l, inst: e, next: null }, e = Nt.updateQueue, e === null && (e = Qr(), Nt.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (l = n.next, n.next = t, t.next = l, e.lastEffect = t), t;
  }
  function Xh() {
    return Ce().memoizedState;
  }
  function Xr(t, e, n, l) {
    var s = Ke();
    Nt.flags |= t, s.memoizedState = ul(
      1 | e,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Kr(t, e, n, l) {
    var s = Ce();
    l = l === void 0 ? null : l;
    var u = s.memoizedState.inst;
    ae !== null && l !== null && Vu(l, ae.memoizedState.deps) ? s.memoizedState = ul(e, u, n, l) : (Nt.flags |= t, s.memoizedState = ul(
      1 | e,
      u,
      n,
      l
    ));
  }
  function Kh(t, e) {
    Xr(8390656, 8, t, e);
  }
  function tc(t, e) {
    Kr(2048, 8, t, e);
  }
  function c0(t) {
    Nt.flags |= 4;
    var e = Nt.updateQueue;
    if (e === null)
      e = Qr(), Nt.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function Ih(t) {
    var e = Ce().memoizedState;
    return c0({ ref: e, nextImpl: t }), function() {
      if ((Ft & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Zh(t, e) {
    return Kr(4, 2, t, e);
  }
  function $h(t, e) {
    return Kr(4, 4, t, e);
  }
  function Fh(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function() {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Jh(t, e, n) {
    n = n != null ? n.concat([t]) : null, Kr(4, 4, Fh.bind(null, e, t), n);
  }
  function ec() {
  }
  function Wh(t, e) {
    var n = Ce();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    return e !== null && Vu(e, l[1]) ? l[0] : (n.memoizedState = [t, e], t);
  }
  function Ph(t, e) {
    var n = Ce();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    if (e !== null && Vu(e, l[1]))
      return l[0];
    if (l = t(), Ci) {
      wa(!0);
      try {
        t();
      } finally {
        wa(!1);
      }
    }
    return n.memoizedState = [l, e], l;
  }
  function nc(t, e, n) {
    return n === void 0 || (aa & 1073741824) !== 0 && (Gt & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = tp(), Nt.lanes |= t, Ba |= t, n);
  }
  function tm(t, e, n, l) {
    return ln(n, e) ? n : ol.current !== null ? (t = nc(t, n, l), ln(t, e) || (je = !0), t) : (aa & 42) === 0 || (aa & 1073741824) !== 0 && (Gt & 261930) === 0 ? (je = !0, t.memoizedState = n) : (t = tp(), Nt.lanes |= t, Ba |= t, e);
  }
  function em(t, e, n, l, s) {
    var u = W.p;
    W.p = u !== 0 && 8 > u ? u : 8;
    var h = H.T, b = {};
    H.T = b, lc(t, !1, e, n);
    try {
      var j = s(), U = H.S;
      if (U !== null && U(b, j), j !== null && typeof j == "object" && typeof j.then == "function") {
        var Z = l0(
          j,
          l
        );
        so(
          t,
          e,
          Z,
          dn(t)
        );
      } else
        so(
          t,
          e,
          l,
          dn(t)
        );
    } catch (P) {
      so(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: P },
        dn()
      );
    } finally {
      W.p = u, h !== null && b.types !== null && (h.types = b.types), H.T = h;
    }
  }
  function d0() {
  }
  function ac(t, e, n, l) {
    if (t.tag !== 5) throw Error(r(476));
    var s = nm(t).queue;
    em(
      t,
      s,
      e,
      F,
      n === null ? d0 : function() {
        return am(t), n(l);
      }
    );
  }
  function nm(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: F,
      baseState: F,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ia,
        lastRenderedState: F
      },
      next: null
    };
    var n = {};
    return e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ia,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function am(t) {
    var e = nm(t);
    e.next === null && (e = t.alternate.memoizedState), so(
      t,
      e.next.queue,
      {},
      dn()
    );
  }
  function ic() {
    return qe(jo);
  }
  function im() {
    return Ce().memoizedState;
  }
  function lm() {
    return Ce().memoizedState;
  }
  function f0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = dn();
          t = Ea(n);
          var l = Ra(e, t, n);
          l !== null && (en(l, e, n), ao(l, e, n)), e = { cache: Du() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function h0(t, e, n) {
    var l = dn();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ir(t) ? rm(e, n) : (n = Su(t, e, n, l), n !== null && (en(n, t, l), sm(n, e, l)));
  }
  function om(t, e, n) {
    var l = dn();
    so(t, e, n, l);
  }
  function so(t, e, n, l) {
    var s = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ir(t)) rm(e, s);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var h = e.lastRenderedState, b = u(h, n);
          if (s.hasEagerState = !0, s.eagerState = b, ln(b, h))
            return zr(t, e, s, 0), se === null && jr(), !1;
        } catch {
        } finally {
        }
      if (n = Su(t, e, s, l), n !== null)
        return en(n, t, l), sm(n, e, l), !0;
    }
    return !1;
  }
  function lc(t, e, n, l) {
    if (l = {
      lane: 2,
      revertLane: Hc(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ir(t)) {
      if (e) throw Error(r(479));
    } else
      e = Su(
        t,
        n,
        l,
        2
      ), e !== null && en(e, t, 2);
  }
  function Ir(t) {
    var e = t.alternate;
    return t === Nt || e !== null && e === Nt;
  }
  function rm(t, e) {
    rl = Ur = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function sm(t, e, n) {
    if ((n & 4194048) !== 0) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, hf(t, n);
    }
  }
  var uo = {
    readContext: qe,
    use: Yr,
    useCallback: be,
    useContext: be,
    useEffect: be,
    useImperativeHandle: be,
    useLayoutEffect: be,
    useInsertionEffect: be,
    useMemo: be,
    useReducer: be,
    useRef: be,
    useState: be,
    useDebugValue: be,
    useDeferredValue: be,
    useTransition: be,
    useSyncExternalStore: be,
    useId: be,
    useHostTransitionStatus: be,
    useFormState: be,
    useActionState: be,
    useOptimistic: be,
    useMemoCache: be,
    useCacheRefresh: be
  };
  uo.useEffectEvent = be;
  var um = {
    readContext: qe,
    use: Yr,
    useCallback: function(t, e) {
      return Ke().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: qe,
    useEffect: Kh,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Xr(
        4194308,
        4,
        Fh.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return Xr(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Xr(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = Ke();
      e = e === void 0 ? null : e;
      var l = t();
      if (Ci) {
        wa(!0);
        try {
          t();
        } finally {
          wa(!1);
        }
      }
      return n.memoizedState = [l, e], l;
    },
    useReducer: function(t, e, n) {
      var l = Ke();
      if (n !== void 0) {
        var s = n(e);
        if (Ci) {
          wa(!0);
          try {
            n(e);
          } finally {
            wa(!1);
          }
        }
      } else s = e;
      return l.memoizedState = l.baseState = s, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: s
      }, l.queue = t, t = t.dispatch = h0.bind(
        null,
        Nt,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var e = Ke();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Wu(t);
      var e = t.queue, n = om.bind(null, Nt, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: ec,
    useDeferredValue: function(t, e) {
      var n = Ke();
      return nc(n, t, e);
    },
    useTransition: function() {
      var t = Wu(!1);
      return t = em.bind(
        null,
        Nt,
        t.queue,
        !0,
        !1
      ), Ke().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var l = Nt, s = Ke();
      if (Qt) {
        if (n === void 0)
          throw Error(r(407));
        n = n();
      } else {
        if (n = e(), se === null)
          throw Error(r(349));
        (Gt & 127) !== 0 || Rh(l, e, n);
      }
      s.memoizedState = n;
      var u = { value: n, getSnapshot: e };
      return s.queue = u, Kh(Mh.bind(null, l, u, t), [
        t
      ]), l.flags |= 2048, ul(
        9,
        { destroy: void 0 },
        Nh.bind(
          null,
          l,
          u,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = Ke(), e = se.identifierPrefix;
      if (Qt) {
        var n = Gn, l = qn;
        n = (l & ~(1 << 32 - an(l) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = Lr++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = o0++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: ic,
    useFormState: Lh,
    useActionState: Lh,
    useOptimistic: function(t) {
      var e = Ke();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = lc.bind(
        null,
        Nt,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: $u,
    useCacheRefresh: function() {
      return Ke().memoizedState = f0.bind(
        null,
        Nt
      );
    },
    useEffectEvent: function(t) {
      var e = Ke(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((Ft & 2) !== 0)
          throw Error(r(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, oc = {
    readContext: qe,
    use: Yr,
    useCallback: Wh,
    useContext: qe,
    useEffect: tc,
    useImperativeHandle: Jh,
    useInsertionEffect: Zh,
    useLayoutEffect: $h,
    useMemo: Ph,
    useReducer: Vr,
    useRef: Xh,
    useState: function() {
      return Vr(ia);
    },
    useDebugValue: ec,
    useDeferredValue: function(t, e) {
      var n = Ce();
      return tm(
        n,
        ae.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Vr(ia)[0], e = Ce().memoizedState;
      return [
        typeof t == "boolean" ? t : ro(t),
        e
      ];
    },
    useSyncExternalStore: Eh,
    useId: im,
    useHostTransitionStatus: ic,
    useFormState: Qh,
    useActionState: Qh,
    useOptimistic: function(t, e) {
      var n = Ce();
      return Bh(n, ae, t, e);
    },
    useMemoCache: $u,
    useCacheRefresh: lm
  };
  oc.useEffectEvent = Ih;
  var cm = {
    readContext: qe,
    use: Yr,
    useCallback: Wh,
    useContext: qe,
    useEffect: tc,
    useImperativeHandle: Jh,
    useInsertionEffect: Zh,
    useLayoutEffect: $h,
    useMemo: Ph,
    useReducer: Ju,
    useRef: Xh,
    useState: function() {
      return Ju(ia);
    },
    useDebugValue: ec,
    useDeferredValue: function(t, e) {
      var n = Ce();
      return ae === null ? nc(n, t, e) : tm(
        n,
        ae.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Ju(ia)[0], e = Ce().memoizedState;
      return [
        typeof t == "boolean" ? t : ro(t),
        e
      ];
    },
    useSyncExternalStore: Eh,
    useId: im,
    useHostTransitionStatus: ic,
    useFormState: Vh,
    useActionState: Vh,
    useOptimistic: function(t, e) {
      var n = Ce();
      return ae !== null ? Bh(n, ae, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: $u,
    useCacheRefresh: lm
  };
  cm.useEffectEvent = Ih;
  function rc(t, e, n, l) {
    e = t.memoizedState, n = n(l, e), n = n == null ? e : w({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var sc = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var l = dn(), s = Ea(l);
      s.payload = e, n != null && (s.callback = n), e = Ra(t, s, l), e !== null && (en(e, t, l), ao(e, t, l));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var l = dn(), s = Ea(l);
      s.tag = 1, s.payload = e, n != null && (s.callback = n), e = Ra(t, s, l), e !== null && (en(e, t, l), ao(e, t, l));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = dn(), l = Ea(n);
      l.tag = 2, e != null && (l.callback = e), e = Ra(t, l, n), e !== null && (en(e, t, n), ao(e, t, n));
    }
  };
  function dm(t, e, n, l, s, u, h) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, u, h) : e.prototype && e.prototype.isPureReactComponent ? !$l(n, l) || !$l(s, u) : !0;
  }
  function fm(t, e, n, l) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, l), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, l), e.state !== t && sc.enqueueReplaceState(e, e.state, null);
  }
  function _i(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var l in e)
        l !== "ref" && (n[l] = e[l]);
    }
    if (t = t.defaultProps) {
      n === e && (n = w({}, n));
      for (var s in t)
        n[s] === void 0 && (n[s] = t[s]);
    }
    return n;
  }
  function hm(t) {
    Tr(t);
  }
  function mm(t) {
    console.error(t);
  }
  function pm(t) {
    Tr(t);
  }
  function Zr(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function gm(t, e, n) {
    try {
      var l = t.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (s) {
      setTimeout(function() {
        throw s;
      });
    }
  }
  function uc(t, e, n) {
    return n = Ea(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Zr(t, e);
    }, n;
  }
  function xm(t) {
    return t = Ea(t), t.tag = 3, t;
  }
  function bm(t, e, n, l) {
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = l.value;
      t.payload = function() {
        return s(u);
      }, t.callback = function() {
        gm(e, n, l);
      };
    }
    var h = n.stateNode;
    h !== null && typeof h.componentDidCatch == "function" && (t.callback = function() {
      gm(e, n, l), typeof s != "function" && (ka === null ? ka = /* @__PURE__ */ new Set([this]) : ka.add(this));
      var b = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: b !== null ? b : ""
      });
    });
  }
  function m0(t, e, n, l, s) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (e = n.alternate, e !== null && el(
        e,
        n,
        s,
        !0
      ), n = rn.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return _n === null ? os() : n.alternate === null && ve === 0 && (ve = 3), n.flags &= -257, n.flags |= 65536, n.lanes = s, l === Br ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : e.add(l), Oc(t, l, s)), !1;
          case 22:
            return n.flags |= 65536, l === Br ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Oc(t, l, s)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return Oc(t, l, s), os(), !1;
    }
    if (Qt)
      return e = rn.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = s, l !== Au && (t = Error(r(422), { cause: l }), Wl(yn(t, n)))) : (l !== Au && (e = Error(r(423), {
        cause: l
      }), Wl(
        yn(e, n)
      )), t = t.current.alternate, t.flags |= 65536, s &= -s, t.lanes |= s, l = yn(l, n), s = uc(
        t.stateNode,
        l,
        s
      ), Gu(t, s), ve !== 4 && (ve = 2)), !1;
    var u = Error(r(520), { cause: l });
    if (u = yn(u, n), bo === null ? bo = [u] : bo.push(u), ve !== 4 && (ve = 2), e === null) return !0;
    l = yn(l, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = s & -s, n.lanes |= t, t = uc(n.stateNode, l, t), Gu(n, t), !1;
        case 1:
          if (e = n.type, u = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (ka === null || !ka.has(u))))
            return n.flags |= 65536, s &= -s, n.lanes |= s, s = xm(s), bm(
              s,
              t,
              n,
              l
            ), Gu(n, s), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var cc = Error(r(461)), je = !1;
  function Ge(t, e, n, l) {
    e.child = t === null ? Sh(e, null, n, l) : Si(
      e,
      t.child,
      n,
      l
    );
  }
  function vm(t, e, n, l, s) {
    n = n.render;
    var u = e.ref;
    if ("ref" in l) {
      var h = {};
      for (var b in l)
        b !== "ref" && (h[b] = l[b]);
    } else h = l;
    return bi(e), l = Xu(
      t,
      e,
      n,
      h,
      u,
      s
    ), b = Ku(), t !== null && !je ? (Iu(t, e, s), la(t, e, s)) : (Qt && b && ju(e), e.flags |= 1, Ge(t, e, l, s), e.child);
  }
  function ym(t, e, n, l, s) {
    if (t === null) {
      var u = n.type;
      return typeof u == "function" && !Cu(u) && u.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = u, wm(
        t,
        e,
        u,
        l,
        s
      )) : (t = Er(
        n.type,
        null,
        l,
        e,
        e.mode,
        s
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !bc(t, s)) {
      var h = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : $l, n(h, l) && t.ref === e.ref)
        return la(t, e, s);
    }
    return e.flags |= 1, t = Pn(u, l), t.ref = e.ref, t.return = e, e.child = t;
  }
  function wm(t, e, n, l, s) {
    if (t !== null) {
      var u = t.memoizedProps;
      if ($l(u, l) && t.ref === e.ref)
        if (je = !1, e.pendingProps = l = u, bc(t, s))
          (t.flags & 131072) !== 0 && (je = !0);
        else
          return e.lanes = t.lanes, la(t, e, s);
    }
    return dc(
      t,
      e,
      n,
      l,
      s
    );
  }
  function Sm(t, e, n, l) {
    var s = l.children, u = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (u = u !== null ? u.baseLanes | n : n, t !== null) {
          for (l = e.child = t.child, s = 0; l !== null; )
            s = s | l.lanes | l.childLanes, l = l.sibling;
          l = s & ~u;
        } else l = 0, e.child = null;
        return Cm(
          t,
          e,
          u,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Dr(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? Th(e, u) : Lu(), jh(e);
      else
        return l = e.lanes = 536870912, Cm(
          t,
          e,
          u !== null ? u.baseLanes | n : n,
          n,
          l
        );
    } else
      u !== null ? (Dr(e, u.cachePool), Th(e, u), Ma(), e.memoizedState = null) : (t !== null && Dr(e, null), Lu(), Ma());
    return Ge(t, e, s, n), e.child;
  }
  function co(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Cm(t, e, n, l, s) {
    var u = Bu();
    return u = u === null ? null : { parent: _e._currentValue, pool: u }, e.memoizedState = {
      baseLanes: n,
      cachePool: u
    }, t !== null && Dr(e, null), Lu(), jh(e), t !== null && el(t, e, l, !0), e.childLanes = s, null;
  }
  function $r(t, e) {
    return e = Jr(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function _m(t, e, n) {
    return Si(e, t.child, null, n), t = $r(e, e.pendingProps), t.flags |= 2, sn(e), e.memoizedState = null, t;
  }
  function p0(t, e, n) {
    var l = e.pendingProps, s = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (Qt) {
        if (l.mode === "hidden")
          return t = $r(e, l), e.lanes = 536870912, co(null, t);
        if (Yu(e), (t = ue) ? (t = kp(
          t,
          Cn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: _a !== null ? { id: qn, overflow: Gn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = rh(t), n.return = e, e.child = n, He = e, ue = null)) : t = null, t === null) throw ja(e);
        return e.lanes = 536870912, null;
      }
      return $r(e, l);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var h = u.dehydrated;
      if (Yu(e), s)
        if (e.flags & 256)
          e.flags &= -257, e = _m(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (je || el(t, e, n, !1), s = (n & t.childLanes) !== 0, je || s) {
        if (l = se, l !== null && (h = mf(l, n), h !== 0 && h !== u.retryLane))
          throw u.retryLane = h, mi(t, h), en(l, t, h), cc;
        os(), e = _m(
          t,
          e,
          n
        );
      } else
        t = u.treeContext, ue = Tn(h.nextSibling), He = e, Qt = !0, Ta = null, Cn = !1, t !== null && ch(e, t), e = $r(e, l), e.flags |= 4096;
      return e;
    }
    return t = Pn(t.child, {
      mode: l.mode,
      children: l.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Fr(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function dc(t, e, n, l, s) {
    return bi(e), n = Xu(
      t,
      e,
      n,
      l,
      void 0,
      s
    ), l = Ku(), t !== null && !je ? (Iu(t, e, s), la(t, e, s)) : (Qt && l && ju(e), e.flags |= 1, Ge(t, e, n, s), e.child);
  }
  function Tm(t, e, n, l, s, u) {
    return bi(e), e.updateQueue = null, n = Ah(
      e,
      l,
      n,
      s
    ), zh(t), l = Ku(), t !== null && !je ? (Iu(t, e, u), la(t, e, u)) : (Qt && l && ju(e), e.flags |= 1, Ge(t, e, n, u), e.child);
  }
  function jm(t, e, n, l, s) {
    if (bi(e), e.stateNode === null) {
      var u = Ji, h = n.contextType;
      typeof h == "object" && h !== null && (u = qe(h)), u = new n(l, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = sc, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = l, u.state = e.memoizedState, u.refs = {}, Hu(e), h = n.contextType, u.context = typeof h == "object" && h !== null ? qe(h) : Ji, u.state = e.memoizedState, h = n.getDerivedStateFromProps, typeof h == "function" && (rc(
        e,
        n,
        h,
        l
      ), u.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (h = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), h !== u.state && sc.enqueueReplaceState(u, u.state, null), lo(e, l, u, s), io(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), l = !0;
    } else if (t === null) {
      u = e.stateNode;
      var b = e.memoizedProps, j = _i(n, b);
      u.props = j;
      var U = u.context, Z = n.contextType;
      h = Ji, typeof Z == "object" && Z !== null && (h = qe(Z));
      var P = n.getDerivedStateFromProps;
      Z = typeof P == "function" || typeof u.getSnapshotBeforeUpdate == "function", b = e.pendingProps !== b, Z || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (b || U !== h) && fm(
        e,
        u,
        l,
        h
      ), Aa = !1;
      var Q = e.memoizedState;
      u.state = Q, lo(e, l, u, s), io(), U = e.memoizedState, b || Q !== U || Aa ? (typeof P == "function" && (rc(
        e,
        n,
        P,
        l
      ), U = e.memoizedState), (j = Aa || dm(
        e,
        n,
        j,
        l,
        Q,
        U,
        h
      )) ? (Z || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = l, e.memoizedState = U), u.props = l, u.state = U, u.context = h, l = j) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), l = !1);
    } else {
      u = e.stateNode, qu(t, e), h = e.memoizedProps, Z = _i(n, h), u.props = Z, P = e.pendingProps, Q = u.context, U = n.contextType, j = Ji, typeof U == "object" && U !== null && (j = qe(U)), b = n.getDerivedStateFromProps, (U = typeof b == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (h !== P || Q !== j) && fm(
        e,
        u,
        l,
        j
      ), Aa = !1, Q = e.memoizedState, u.state = Q, lo(e, l, u, s), io();
      var V = e.memoizedState;
      h !== P || Q !== V || Aa || t !== null && t.dependencies !== null && Nr(t.dependencies) ? (typeof b == "function" && (rc(
        e,
        n,
        b,
        l
      ), V = e.memoizedState), (Z = Aa || dm(
        e,
        n,
        Z,
        l,
        Q,
        V,
        j
      ) || t !== null && t.dependencies !== null && Nr(t.dependencies)) ? (U || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, V, j), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        V,
        j
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || h === t.memoizedProps && Q === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || h === t.memoizedProps && Q === t.memoizedState || (e.flags |= 1024), e.memoizedProps = l, e.memoizedState = V), u.props = l, u.state = V, u.context = j, l = Z) : (typeof u.componentDidUpdate != "function" || h === t.memoizedProps && Q === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || h === t.memoizedProps && Q === t.memoizedState || (e.flags |= 1024), l = !1);
    }
    return u = l, Fr(t, e), l = (e.flags & 128) !== 0, u || l ? (u = e.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && l ? (e.child = Si(
      e,
      t.child,
      null,
      s
    ), e.child = Si(
      e,
      null,
      n,
      s
    )) : Ge(t, e, n, s), e.memoizedState = u.state, t = e.child) : t = la(
      t,
      e,
      s
    ), t;
  }
  function zm(t, e, n, l) {
    return gi(), e.flags |= 256, Ge(t, e, n, l), e.child;
  }
  var fc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function hc(t) {
    return { baseLanes: t, cachePool: gh() };
  }
  function mc(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= cn), t;
  }
  function Am(t, e, n) {
    var l = e.pendingProps, s = !1, u = (e.flags & 128) !== 0, h;
    if ((h = u) || (h = t !== null && t.memoizedState === null ? !1 : (Se.current & 2) !== 0), h && (s = !0, e.flags &= -129), h = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (Qt) {
        if (s ? Na(e) : Ma(), (t = ue) ? (t = kp(
          t,
          Cn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: _a !== null ? { id: qn, overflow: Gn } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = rh(t), n.return = e, e.child = n, He = e, ue = null)) : t = null, t === null) throw ja(e);
        return Fc(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var b = l.children;
      return l = l.fallback, s ? (Ma(), s = e.mode, b = Jr(
        { mode: "hidden", children: b },
        s
      ), l = pi(
        l,
        s,
        n,
        null
      ), b.return = e, l.return = e, b.sibling = l, e.child = b, l = e.child, l.memoizedState = hc(n), l.childLanes = mc(
        t,
        h,
        n
      ), e.memoizedState = fc, co(null, l)) : (Na(e), pc(e, b));
    }
    var j = t.memoizedState;
    if (j !== null && (b = j.dehydrated, b !== null)) {
      if (u)
        e.flags & 256 ? (Na(e), e.flags &= -257, e = gc(
          t,
          e,
          n
        )) : e.memoizedState !== null ? (Ma(), e.child = t.child, e.flags |= 128, e = null) : (Ma(), b = l.fallback, s = e.mode, l = Jr(
          { mode: "visible", children: l.children },
          s
        ), b = pi(
          b,
          s,
          n,
          null
        ), b.flags |= 2, l.return = e, b.return = e, l.sibling = b, e.child = l, Si(
          e,
          t.child,
          null,
          n
        ), l = e.child, l.memoizedState = hc(n), l.childLanes = mc(
          t,
          h,
          n
        ), e.memoizedState = fc, e = co(null, l));
      else if (Na(e), Fc(b)) {
        if (h = b.nextSibling && b.nextSibling.dataset, h) var U = h.dgst;
        h = U, l = Error(r(419)), l.stack = "", l.digest = h, Wl({ value: l, source: null, stack: null }), e = gc(
          t,
          e,
          n
        );
      } else if (je || el(t, e, n, !1), h = (n & t.childLanes) !== 0, je || h) {
        if (h = se, h !== null && (l = mf(h, n), l !== 0 && l !== j.retryLane))
          throw j.retryLane = l, mi(t, l), en(h, t, l), cc;
        $c(b) || os(), e = gc(
          t,
          e,
          n
        );
      } else
        $c(b) ? (e.flags |= 192, e.child = t.child, e = null) : (t = j.treeContext, ue = Tn(
          b.nextSibling
        ), He = e, Qt = !0, Ta = null, Cn = !1, t !== null && ch(e, t), e = pc(
          e,
          l.children
        ), e.flags |= 4096);
      return e;
    }
    return s ? (Ma(), b = l.fallback, s = e.mode, j = t.child, U = j.sibling, l = Pn(j, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = j.subtreeFlags & 65011712, U !== null ? b = Pn(
      U,
      b
    ) : (b = pi(
      b,
      s,
      n,
      null
    ), b.flags |= 2), b.return = e, l.return = e, l.sibling = b, e.child = l, co(null, l), l = e.child, b = t.child.memoizedState, b === null ? b = hc(n) : (s = b.cachePool, s !== null ? (j = _e._currentValue, s = s.parent !== j ? { parent: j, pool: j } : s) : s = gh(), b = {
      baseLanes: b.baseLanes | n,
      cachePool: s
    }), l.memoizedState = b, l.childLanes = mc(
      t,
      h,
      n
    ), e.memoizedState = fc, co(t.child, l)) : (Na(e), n = t.child, t = n.sibling, n = Pn(n, {
      mode: "visible",
      children: l.children
    }), n.return = e, n.sibling = null, t !== null && (h = e.deletions, h === null ? (e.deletions = [t], e.flags |= 16) : h.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function pc(t, e) {
    return e = Jr(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Jr(t, e) {
    return t = on(22, t, null, e), t.lanes = 0, t;
  }
  function gc(t, e, n) {
    return Si(e, t.child, null, n), t = pc(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function Em(t, e, n) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e), Nu(t.return, e, n);
  }
  function xc(t, e, n, l, s, u) {
    var h = t.memoizedState;
    h === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: s,
      treeForkCount: u
    } : (h.isBackwards = e, h.rendering = null, h.renderingStartTime = 0, h.last = l, h.tail = n, h.tailMode = s, h.treeForkCount = u);
  }
  function Rm(t, e, n) {
    var l = e.pendingProps, s = l.revealOrder, u = l.tail;
    l = l.children;
    var h = Se.current, b = (h & 2) !== 0;
    if (b ? (h = h & 1 | 2, e.flags |= 128) : h &= 1, X(Se, h), Ge(t, e, l, n), l = Qt ? Jl : 0, !b && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Em(t, n, e);
        else if (t.tag === 19)
          Em(t, n, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (s) {
      case "forwards":
        for (n = e.child, s = null; n !== null; )
          t = n.alternate, t !== null && Gr(t) === null && (s = n), n = n.sibling;
        n = s, n === null ? (s = e.child, e.child = null) : (s = n.sibling, n.sibling = null), xc(
          e,
          !1,
          s,
          n,
          u,
          l
        );
        break;
      case "backwards":
      case "unstable_legacy-backwards":
        for (n = null, s = e.child, e.child = null; s !== null; ) {
          if (t = s.alternate, t !== null && Gr(t) === null) {
            e.child = s;
            break;
          }
          t = s.sibling, s.sibling = n, n = s, s = t;
        }
        xc(
          e,
          !0,
          n,
          null,
          u,
          l
        );
        break;
      case "together":
        xc(
          e,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      default:
        e.memoizedState = null;
    }
    return e.child;
  }
  function la(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), Ba |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (el(
          t,
          e,
          n,
          !1
        ), (n & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(r(153));
    if (e.child !== null) {
      for (t = e.child, n = Pn(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = Pn(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function bc(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Nr(t)));
  }
  function g0(t, e, n) {
    switch (e.tag) {
      case 3:
        at(e, e.stateNode.containerInfo), za(e, _e, t.memoizedState.cache), gi();
        break;
      case 27:
      case 5:
        re(e);
        break;
      case 4:
        at(e, e.stateNode.containerInfo);
        break;
      case 10:
        za(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Yu(e), null;
        break;
      case 13:
        var l = e.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Na(e), e.flags |= 128, null) : (n & e.child.childLanes) !== 0 ? Am(t, e, n) : (Na(e), t = la(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        Na(e);
        break;
      case 19:
        var s = (t.flags & 128) !== 0;
        if (l = (n & e.childLanes) !== 0, l || (el(
          t,
          e,
          n,
          !1
        ), l = (n & e.childLanes) !== 0), s) {
          if (l)
            return Rm(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (s = e.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), X(Se, Se.current), l) break;
        return null;
      case 22:
        return e.lanes = 0, Sm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        za(e, _e, t.memoizedState.cache);
    }
    return la(t, e, n);
  }
  function Nm(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        je = !0;
      else {
        if (!bc(t, n) && (e.flags & 128) === 0)
          return je = !1, g0(
            t,
            e,
            n
          );
        je = (t.flags & 131072) !== 0;
      }
    else
      je = !1, Qt && (e.flags & 1048576) !== 0 && uh(e, Jl, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var l = e.pendingProps;
          if (t = yi(e.elementType), e.type = t, typeof t == "function")
            Cu(t) ? (l = _i(t, l), e.tag = 1, e = jm(
              null,
              e,
              t,
              l,
              n
            )) : (e.tag = 0, e = dc(
              null,
              e,
              t,
              l,
              n
            ));
          else {
            if (t != null) {
              var s = t.$$typeof;
              if (s === q) {
                e.tag = 11, e = vm(
                  null,
                  e,
                  t,
                  l,
                  n
                );
                break t;
              } else if (s === v) {
                e.tag = 14, e = ym(
                  null,
                  e,
                  t,
                  l,
                  n
                );
                break t;
              }
            }
            throw e = ot(t) || t, Error(r(306, e, ""));
          }
        }
        return e;
      case 0:
        return dc(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return l = e.type, s = _i(
          l,
          e.pendingProps
        ), jm(
          t,
          e,
          l,
          s,
          n
        );
      case 3:
        t: {
          if (at(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(r(387));
          l = e.pendingProps;
          var u = e.memoizedState;
          s = u.element, qu(t, e), lo(e, l, null, n);
          var h = e.memoizedState;
          if (l = h.cache, za(e, _e, l), l !== u.cache && Mu(
            e,
            [_e],
            n,
            !0
          ), io(), l = h.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: h.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = zm(
                t,
                e,
                l,
                n
              );
              break t;
            } else if (l !== s) {
              s = yn(
                Error(r(424)),
                e
              ), Wl(s), e = zm(
                t,
                e,
                l,
                n
              );
              break t;
            } else {
              switch (t = e.stateNode.containerInfo, t.nodeType) {
                case 9:
                  t = t.body;
                  break;
                default:
                  t = t.nodeName === "HTML" ? t.ownerDocument.body : t;
              }
              for (ue = Tn(t.firstChild), He = e, Qt = !0, Ta = null, Cn = !0, n = Sh(
                e,
                null,
                l,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (gi(), l === s) {
              e = la(
                t,
                e,
                n
              );
              break t;
            }
            Ge(t, e, l, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Fr(t, e), t === null ? (n = Qp(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : Qt || (n = e.type, t = e.pendingProps, l = hs(
          St.current
        ).createElement(n), l[ke] = e, l[$e] = t, Ue(l, n, t), De(l), e.stateNode = l) : e.memoizedState = Qp(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return re(e), t === null && Qt && (l = e.stateNode = Gp(
          e.type,
          e.pendingProps,
          St.current
        ), He = e, Cn = !0, s = ue, Ua(e.type) ? (Jc = s, ue = Tn(l.firstChild)) : ue = s), Ge(
          t,
          e,
          e.pendingProps.children,
          n
        ), Fr(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && Qt && ((s = l = ue) && (l = K0(
          l,
          e.type,
          e.pendingProps,
          Cn
        ), l !== null ? (e.stateNode = l, He = e, ue = Tn(l.firstChild), Cn = !1, s = !0) : s = !1), s || ja(e)), re(e), s = e.type, u = e.pendingProps, h = t !== null ? t.memoizedProps : null, l = u.children, Kc(s, u) ? l = null : h !== null && Kc(s, h) && (e.flags |= 32), e.memoizedState !== null && (s = Xu(
          t,
          e,
          r0,
          null,
          null,
          n
        ), jo._currentValue = s), Fr(t, e), Ge(t, e, l, n), e.child;
      case 6:
        return t === null && Qt && ((t = n = ue) && (n = I0(
          n,
          e.pendingProps,
          Cn
        ), n !== null ? (e.stateNode = n, He = e, ue = null, t = !0) : t = !1), t || ja(e)), null;
      case 13:
        return Am(t, e, n);
      case 4:
        return at(
          e,
          e.stateNode.containerInfo
        ), l = e.pendingProps, t === null ? e.child = Si(
          e,
          null,
          l,
          n
        ) : Ge(t, e, l, n), e.child;
      case 11:
        return vm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return Ge(
          t,
          e,
          e.pendingProps,
          n
        ), e.child;
      case 8:
        return Ge(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return Ge(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return l = e.pendingProps, za(e, e.type, l.value), Ge(t, e, l.children, n), e.child;
      case 9:
        return s = e.type._context, l = e.pendingProps.children, bi(e), s = qe(s), l = l(s), e.flags |= 1, Ge(t, e, l, n), e.child;
      case 14:
        return ym(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return wm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Rm(t, e, n);
      case 31:
        return p0(t, e, n);
      case 22:
        return Sm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return bi(e), l = qe(_e), t === null ? (s = Bu(), s === null && (s = se, u = Du(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= n), s = u), e.memoizedState = { parent: l, cache: s }, Hu(e), za(e, _e, s)) : ((t.lanes & n) !== 0 && (qu(t, e), lo(e, null, null, n), io()), s = t.memoizedState, u = e.memoizedState, s.parent !== l ? (s = { parent: l, cache: l }, e.memoizedState = s, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = s), za(e, _e, l)) : (l = u.cache, za(e, _e, l), l !== s.cache && Mu(
          e,
          [_e],
          n,
          !0
        ))), Ge(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(r(156, e.tag));
  }
  function oa(t) {
    t.flags |= 4;
  }
  function vc(t, e, n, l, s) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (s & 335544128) === s)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (ip()) t.flags |= 8192;
        else
          throw wi = Br, ku;
    } else t.flags &= -16777217;
  }
  function Mm(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Ip(e))
      if (ip()) t.flags |= 8192;
      else
        throw wi = Br, ku;
  }
  function Wr(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? df() : 536870912, t.lanes |= e, hl |= e);
  }
  function fo(t, e) {
    if (!Qt)
      switch (t.tailMode) {
        case "hidden":
          e = t.tail;
          for (var n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
          break;
        case "collapsed":
          n = t.tail;
          for (var l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
      }
  }
  function ce(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, l = 0;
    if (e)
      for (var s = t.child; s !== null; )
        n |= s.lanes | s.childLanes, l |= s.subtreeFlags & 65011712, l |= s.flags & 65011712, s.return = t, s = s.sibling;
    else
      for (s = t.child; s !== null; )
        n |= s.lanes | s.childLanes, l |= s.subtreeFlags, l |= s.flags, s.return = t, s = s.sibling;
    return t.subtreeFlags |= l, t.childLanes = n, e;
  }
  function x0(t, e, n) {
    var l = e.pendingProps;
    switch (zu(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return ce(e), null;
      case 1:
        return ce(e), null;
      case 3:
        return n = e.stateNode, l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), na(_e), vt(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (tl(e) ? oa(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Eu())), ce(e), null;
      case 26:
        var s = e.type, u = e.memoizedState;
        return t === null ? (oa(e), u !== null ? (ce(e), Mm(e, u)) : (ce(e), vc(
          e,
          s,
          null,
          l,
          n
        ))) : u ? u !== t.memoizedState ? (oa(e), ce(e), Mm(e, u)) : (ce(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== l && oa(e), ce(e), vc(
          e,
          s,
          t,
          l,
          n
        )), null;
      case 27:
        if (Vt(e), n = St.current, s = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && oa(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(r(166));
            return ce(e), null;
          }
          t = it.current, tl(e) ? dh(e) : (t = Gp(s, l, n), e.stateNode = t, oa(e));
        }
        return ce(e), null;
      case 5:
        if (Vt(e), s = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && oa(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(r(166));
            return ce(e), null;
          }
          if (u = it.current, tl(e))
            dh(e);
          else {
            var h = hs(
              St.current
            );
            switch (u) {
              case 1:
                u = h.createElementNS(
                  "http://www.w3.org/2000/svg",
                  s
                );
                break;
              case 2:
                u = h.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  s
                );
                break;
              default:
                switch (s) {
                  case "svg":
                    u = h.createElementNS(
                      "http://www.w3.org/2000/svg",
                      s
                    );
                    break;
                  case "math":
                    u = h.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      s
                    );
                    break;
                  case "script":
                    u = h.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(
                      u.firstChild
                    );
                    break;
                  case "select":
                    u = typeof l.is == "string" ? h.createElement("select", {
                      is: l.is
                    }) : h.createElement("select"), l.multiple ? u.multiple = !0 : l.size && (u.size = l.size);
                    break;
                  default:
                    u = typeof l.is == "string" ? h.createElement(s, { is: l.is }) : h.createElement(s);
                }
            }
            u[ke] = e, u[$e] = l;
            t: for (h = e.child; h !== null; ) {
              if (h.tag === 5 || h.tag === 6)
                u.appendChild(h.stateNode);
              else if (h.tag !== 4 && h.tag !== 27 && h.child !== null) {
                h.child.return = h, h = h.child;
                continue;
              }
              if (h === e) break t;
              for (; h.sibling === null; ) {
                if (h.return === null || h.return === e)
                  break t;
                h = h.return;
              }
              h.sibling.return = h.return, h = h.sibling;
            }
            e.stateNode = u;
            t: switch (Ue(u, s, l), s) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break t;
              case "img":
                l = !0;
                break t;
              default:
                l = !1;
            }
            l && oa(e);
          }
        }
        return ce(e), vc(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== l && oa(e);
        else {
          if (typeof l != "string" && e.stateNode === null)
            throw Error(r(166));
          if (t = St.current, tl(e)) {
            if (t = e.stateNode, n = e.memoizedProps, l = null, s = He, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  l = s.memoizedProps;
              }
            t[ke] = e, t = !!(t.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Ap(t.nodeValue, n)), t || ja(e, !0);
          } else
            t = hs(t).createTextNode(
              l
            ), t[ke] = e, e.stateNode = t;
        }
        return ce(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (l = tl(e), n !== null) {
            if (t === null) {
              if (!l) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[ke] = e;
            } else
              gi(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            ce(e), t = !1;
          } else
            n = Eu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (sn(e), e) : (sn(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return ce(e), null;
      case 13:
        if (l = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (s = tl(e), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!s) throw Error(r(318));
              if (s = e.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(r(317));
              s[ke] = e;
            } else
              gi(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            ce(e), s = !1;
          } else
            s = Eu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return e.flags & 256 ? (sn(e), e) : (sn(e), null);
        }
        return sn(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = l !== null, t = t !== null && t.memoizedState !== null, n && (l = e.child, s = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (s = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== s && (l.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), Wr(e, e.updateQueue), ce(e), null);
      case 4:
        return vt(), t === null && Lc(e.stateNode.containerInfo), ce(e), null;
      case 10:
        return na(e.type), ce(e), null;
      case 19:
        if (Y(Se), l = e.memoizedState, l === null) return ce(e), null;
        if (s = (e.flags & 128) !== 0, u = l.rendering, u === null)
          if (s) fo(l, !1);
          else {
            if (ve !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = Gr(t), u !== null) {
                  for (e.flags |= 128, fo(l, !1), t = u.updateQueue, e.updateQueue = t, Wr(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    oh(n, t), n = n.sibling;
                  return X(
                    Se,
                    Se.current & 1 | 2
                  ), Qt && ta(e, l.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            l.tail !== null && pe() > as && (e.flags |= 128, s = !0, fo(l, !1), e.lanes = 4194304);
          }
        else {
          if (!s)
            if (t = Gr(u), t !== null) {
              if (e.flags |= 128, s = !0, t = t.updateQueue, e.updateQueue = t, Wr(e, t), fo(l, !0), l.tail === null && l.tailMode === "hidden" && !u.alternate && !Qt)
                return ce(e), null;
            } else
              2 * pe() - l.renderingStartTime > as && n !== 536870912 && (e.flags |= 128, s = !0, fo(l, !1), e.lanes = 4194304);
          l.isBackwards ? (u.sibling = e.child, e.child = u) : (t = l.last, t !== null ? t.sibling = u : e.child = u, l.last = u);
        }
        return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = pe(), t.sibling = null, n = Se.current, X(
          Se,
          s ? n & 1 | 2 : n & 1
        ), Qt && ta(e, l.treeForkCount), t) : (ce(e), null);
      case 22:
      case 23:
        return sn(e), Qu(), l = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (e.flags |= 8192) : l && (e.flags |= 8192), l ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (ce(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : ce(e), n = e.updateQueue, n !== null && Wr(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== n && (e.flags |= 2048), t !== null && Y(vi), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), na(_e), ce(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function b0(t, e) {
    switch (zu(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return na(_e), vt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Vt(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (sn(e), e.alternate === null)
            throw Error(r(340));
          gi();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (sn(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          gi();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return Y(Se), null;
      case 4:
        return vt(), null;
      case 10:
        return na(e.type), null;
      case 22:
      case 23:
        return sn(e), Qu(), t !== null && Y(vi), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return na(_e), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Dm(t, e) {
    switch (zu(e), e.tag) {
      case 3:
        na(_e), vt();
        break;
      case 26:
      case 27:
      case 5:
        Vt(e);
        break;
      case 4:
        vt();
        break;
      case 31:
        e.memoizedState !== null && sn(e);
        break;
      case 13:
        sn(e);
        break;
      case 19:
        Y(Se);
        break;
      case 10:
        na(e.type);
        break;
      case 22:
      case 23:
        sn(e), Qu(), t !== null && Y(vi);
        break;
      case 24:
        na(_e);
    }
  }
  function ho(t, e) {
    try {
      var n = e.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var s = l.next;
        n = s;
        do {
          if ((n.tag & t) === t) {
            l = void 0;
            var u = n.create, h = n.inst;
            l = u(), h.destroy = l;
          }
          n = n.next;
        } while (n !== s);
      }
    } catch (b) {
      ne(e, e.return, b);
    }
  }
  function Da(t, e, n) {
    try {
      var l = e.updateQueue, s = l !== null ? l.lastEffect : null;
      if (s !== null) {
        var u = s.next;
        l = u;
        do {
          if ((l.tag & t) === t) {
            var h = l.inst, b = h.destroy;
            if (b !== void 0) {
              h.destroy = void 0, s = e;
              var j = n, U = b;
              try {
                U();
              } catch (Z) {
                ne(
                  s,
                  j,
                  Z
                );
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (Z) {
      ne(e, e.return, Z);
    }
  }
  function Om(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        _h(e, n);
      } catch (l) {
        ne(t, t.return, l);
      }
    }
  }
  function Bm(t, e, n) {
    n.props = _i(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      ne(t, e, l);
    }
  }
  function mo(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(l) : n.current = l;
      }
    } catch (s) {
      ne(t, e, s);
    }
  }
  function Un(t, e) {
    var n = t.ref, l = t.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (s) {
          ne(t, e, s);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (s) {
          ne(t, e, s);
        }
      else n.current = null;
  }
  function km(t) {
    var e = t.type, n = t.memoizedProps, l = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break t;
        case "img":
          n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (s) {
      ne(t, t.return, s);
    }
  }
  function yc(t, e, n) {
    try {
      var l = t.stateNode;
      U0(l, t.type, n, e), l[$e] = e;
    } catch (s) {
      ne(t, t.return, s);
    }
  }
  function Hm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ua(t.type) || t.tag === 4;
  }
  function wc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Hm(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ua(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Sc(t, e, n) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(t, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(t), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Jn));
    else if (l !== 4 && (l === 27 && Ua(t.type) && (n = t.stateNode, e = null), t = t.child, t !== null))
      for (Sc(t, e, n), t = t.sibling; t !== null; )
        Sc(t, e, n), t = t.sibling;
  }
  function Pr(t, e, n) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
    else if (l !== 4 && (l === 27 && Ua(t.type) && (n = t.stateNode), t = t.child, t !== null))
      for (Pr(t, e, n), t = t.sibling; t !== null; )
        Pr(t, e, n), t = t.sibling;
  }
  function qm(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var l = t.type, s = e.attributes; s.length; )
        e.removeAttributeNode(s[0]);
      Ue(e, l, n), e[ke] = t, e[$e] = n;
    } catch (u) {
      ne(t, t.return, u);
    }
  }
  var ra = !1, ze = !1, Cc = !1, Gm = typeof WeakSet == "function" ? WeakSet : Set, Oe = null;
  function v0(t, e) {
    if (t = t.containerInfo, Vc = ys, t = Jf(t), gu(t)) {
      if ("selectionStart" in t)
        var n = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          n = (n = t.ownerDocument) && n.defaultView || window;
          var l = n.getSelection && n.getSelection();
          if (l && l.rangeCount !== 0) {
            n = l.anchorNode;
            var s = l.anchorOffset, u = l.focusNode;
            l = l.focusOffset;
            try {
              n.nodeType, u.nodeType;
            } catch {
              n = null;
              break t;
            }
            var h = 0, b = -1, j = -1, U = 0, Z = 0, P = t, Q = null;
            e: for (; ; ) {
              for (var V; P !== n || s !== 0 && P.nodeType !== 3 || (b = h + s), P !== u || l !== 0 && P.nodeType !== 3 || (j = h + l), P.nodeType === 3 && (h += P.nodeValue.length), (V = P.firstChild) !== null; )
                Q = P, P = V;
              for (; ; ) {
                if (P === t) break e;
                if (Q === n && ++U === s && (b = h), Q === u && ++Z === l && (j = h), (V = P.nextSibling) !== null) break;
                P = Q, Q = P.parentNode;
              }
              P = V;
            }
            n = b === -1 || j === -1 ? null : { start: b, end: j };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Xc = { focusedElem: t, selectionRange: n }, ys = !1, Oe = e; Oe !== null; )
      if (e = Oe, t = e.child, (e.subtreeFlags & 1028) !== 0 && t !== null)
        t.return = e, Oe = t;
      else
        for (; Oe !== null; ) {
          switch (e = Oe, u = e.alternate, t = e.flags, e.tag) {
            case 0:
              if ((t & 4) !== 0 && (t = e.updateQueue, t = t !== null ? t.events : null, t !== null))
                for (n = 0; n < t.length; n++)
                  s = t[n], s.ref.impl = s.nextImpl;
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((t & 1024) !== 0 && u !== null) {
                t = void 0, n = e, s = u.memoizedProps, u = u.memoizedState, l = n.stateNode;
                try {
                  var mt = _i(
                    n.type,
                    s
                  );
                  t = l.getSnapshotBeforeUpdate(
                    mt,
                    u
                  ), l.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Ct) {
                  ne(
                    n,
                    n.return,
                    Ct
                  );
                }
              }
              break;
            case 3:
              if ((t & 1024) !== 0) {
                if (t = e.stateNode.containerInfo, n = t.nodeType, n === 9)
                  Zc(t);
                else if (n === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Zc(t);
                      break;
                    default:
                      t.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((t & 1024) !== 0) throw Error(r(163));
          }
          if (t = e.sibling, t !== null) {
            t.return = e.return, Oe = t;
            break;
          }
          Oe = e.return;
        }
  }
  function Um(t, e, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ua(t, n), l & 4 && ho(5, n);
        break;
      case 1:
        if (ua(t, n), l & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (h) {
              ne(n, n.return, h);
            }
          else {
            var s = _i(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                s,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (h) {
              ne(
                n,
                n.return,
                h
              );
            }
          }
        l & 64 && Om(n), l & 512 && mo(n, n.return);
        break;
      case 3:
        if (ua(t, n), l & 64 && (t = n.updateQueue, t !== null)) {
          if (e = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            _h(t, e);
          } catch (h) {
            ne(n, n.return, h);
          }
        }
        break;
      case 27:
        e === null && l & 4 && qm(n);
      case 26:
      case 5:
        ua(t, n), e === null && l & 4 && km(n), l & 512 && mo(n, n.return);
        break;
      case 12:
        ua(t, n);
        break;
      case 31:
        ua(t, n), l & 4 && Ym(t, n);
        break;
      case 13:
        ua(t, n), l & 4 && Vm(t, n), l & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = A0.bind(
          null,
          n
        ), Z0(t, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || ra, !l) {
          e = e !== null && e.memoizedState !== null || ze, s = ra;
          var u = ze;
          ra = l, (ze = e) && !u ? ca(
            t,
            n,
            (n.subtreeFlags & 8772) !== 0
          ) : ua(t, n), ra = s, ze = u;
        }
        break;
      case 30:
        break;
      default:
        ua(t, n);
    }
  }
  function Lm(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Lm(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Ps(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var ge = null, Je = !1;
  function sa(t, e, n) {
    for (n = n.child; n !== null; )
      Qm(t, e, n), n = n.sibling;
  }
  function Qm(t, e, n) {
    if (nn && typeof nn.onCommitFiberUnmount == "function")
      try {
        nn.onCommitFiberUnmount(Hl, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        ze || Un(n, e), sa(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        ze || Un(n, e);
        var l = ge, s = Je;
        Ua(n.type) && (ge = n.stateNode, Je = !1), sa(
          t,
          e,
          n
        ), Co(n.stateNode), ge = l, Je = s;
        break;
      case 5:
        ze || Un(n, e);
      case 6:
        if (l = ge, s = Je, ge = null, sa(
          t,
          e,
          n
        ), ge = l, Je = s, ge !== null)
          if (Je)
            try {
              (ge.nodeType === 9 ? ge.body : ge.nodeName === "HTML" ? ge.ownerDocument.body : ge).removeChild(n.stateNode);
            } catch (u) {
              ne(
                n,
                e,
                u
              );
            }
          else
            try {
              ge.removeChild(n.stateNode);
            } catch (u) {
              ne(
                n,
                e,
                u
              );
            }
        break;
      case 18:
        ge !== null && (Je ? (t = ge, Op(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), wl(t)) : Op(ge, n.stateNode));
        break;
      case 4:
        l = ge, s = Je, ge = n.stateNode.containerInfo, Je = !0, sa(
          t,
          e,
          n
        ), ge = l, Je = s;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Da(2, n, e), ze || Da(4, n, e), sa(
          t,
          e,
          n
        );
        break;
      case 1:
        ze || (Un(n, e), l = n.stateNode, typeof l.componentWillUnmount == "function" && Bm(
          n,
          e,
          l
        )), sa(
          t,
          e,
          n
        );
        break;
      case 21:
        sa(
          t,
          e,
          n
        );
        break;
      case 22:
        ze = (l = ze) || n.memoizedState !== null, sa(
          t,
          e,
          n
        ), ze = l;
        break;
      default:
        sa(
          t,
          e,
          n
        );
    }
  }
  function Ym(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        wl(t);
      } catch (n) {
        ne(e, e.return, n);
      }
    }
  }
  function Vm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        wl(t);
      } catch (n) {
        ne(e, e.return, n);
      }
  }
  function y0(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Gm()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Gm()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function ts(t, e) {
    var n = y0(t);
    e.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var s = E0.bind(null, t, l);
        l.then(s, s);
      }
    });
  }
  function We(t, e) {
    var n = e.deletions;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var s = n[l], u = t, h = e, b = h;
        t: for (; b !== null; ) {
          switch (b.tag) {
            case 27:
              if (Ua(b.type)) {
                ge = b.stateNode, Je = !1;
                break t;
              }
              break;
            case 5:
              ge = b.stateNode, Je = !1;
              break t;
            case 3:
            case 4:
              ge = b.stateNode.containerInfo, Je = !0;
              break t;
          }
          b = b.return;
        }
        if (ge === null) throw Error(r(160));
        Qm(u, h, s), ge = null, Je = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Xm(e, t), e = e.sibling;
  }
  var Mn = null;
  function Xm(t, e) {
    var n = t.alternate, l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        We(e, t), Pe(t), l & 4 && (Da(3, t, t.return), ho(3, t), Da(5, t, t.return));
        break;
      case 1:
        We(e, t), Pe(t), l & 512 && (ze || n === null || Un(n, n.return)), l & 64 && ra && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var s = Mn;
        if (We(e, t), Pe(t), l & 512 && (ze || n === null || Un(n, n.return)), l & 4) {
          var u = n !== null ? n.memoizedState : null;
          if (l = t.memoizedState, n === null)
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  l = t.type, n = t.memoizedProps, s = s.ownerDocument || s;
                  e: switch (l) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[Ul] || u[ke] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(l), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), Ue(u, l, n), u[ke] = t, De(u), l = u;
                      break t;
                    case "link":
                      var h = Xp(
                        "link",
                        "href",
                        s
                      ).get(l + (n.href || ""));
                      if (h) {
                        for (var b = 0; b < h.length; b++)
                          if (u = h[b], u.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && u.getAttribute("rel") === (n.rel == null ? null : n.rel) && u.getAttribute("title") === (n.title == null ? null : n.title) && u.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                            h.splice(b, 1);
                            break e;
                          }
                      }
                      u = s.createElement(l), Ue(u, l, n), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (h = Xp(
                        "meta",
                        "content",
                        s
                      ).get(l + (n.content || ""))) {
                        for (b = 0; b < h.length; b++)
                          if (u = h[b], u.getAttribute("content") === (n.content == null ? null : "" + n.content) && u.getAttribute("name") === (n.name == null ? null : n.name) && u.getAttribute("property") === (n.property == null ? null : n.property) && u.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && u.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                            h.splice(b, 1);
                            break e;
                          }
                      }
                      u = s.createElement(l), Ue(u, l, n), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(r(468, l));
                  }
                  u[ke] = t, De(u), l = u;
                }
                t.stateNode = l;
              } else
                Kp(
                  s,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Vp(
                s,
                l,
                t.memoizedProps
              );
          else
            u !== l ? (u === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : u.count--, l === null ? Kp(
              s,
              t.type,
              t.stateNode
            ) : Vp(
              s,
              l,
              t.memoizedProps
            )) : l === null && t.stateNode !== null && yc(
              t,
              t.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        We(e, t), Pe(t), l & 512 && (ze || n === null || Un(n, n.return)), n !== null && l & 4 && yc(
          t,
          t.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (We(e, t), Pe(t), l & 512 && (ze || n === null || Un(n, n.return)), t.flags & 32) {
          s = t.stateNode;
          try {
            Vi(s, "");
          } catch (mt) {
            ne(t, t.return, mt);
          }
        }
        l & 4 && t.stateNode != null && (s = t.memoizedProps, yc(
          t,
          s,
          n !== null ? n.memoizedProps : s
        )), l & 1024 && (Cc = !0);
        break;
      case 6:
        if (We(e, t), Pe(t), l & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          l = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = l;
          } catch (mt) {
            ne(t, t.return, mt);
          }
        }
        break;
      case 3:
        if (gs = null, s = Mn, Mn = ms(e.containerInfo), We(e, t), Mn = s, Pe(t), l & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            wl(e.containerInfo);
          } catch (mt) {
            ne(t, t.return, mt);
          }
        Cc && (Cc = !1, Km(t));
        break;
      case 4:
        l = Mn, Mn = ms(
          t.stateNode.containerInfo
        ), We(e, t), Pe(t), Mn = l;
        break;
      case 12:
        We(e, t), Pe(t);
        break;
      case 31:
        We(e, t), Pe(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, ts(t, l)));
        break;
      case 13:
        We(e, t), Pe(t), t.child.flags & 8192 && t.memoizedState !== null != (n !== null && n.memoizedState !== null) && (ns = pe()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, ts(t, l)));
        break;
      case 22:
        s = t.memoizedState !== null;
        var j = n !== null && n.memoizedState !== null, U = ra, Z = ze;
        if (ra = U || s, ze = Z || j, We(e, t), ze = Z, ra = U, Pe(t), l & 8192)
          t: for (e = t.stateNode, e._visibility = s ? e._visibility & -2 : e._visibility | 1, s && (n === null || j || ra || ze || Ti(t)), n = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                j = n = e;
                try {
                  if (u = j.stateNode, s)
                    h = u.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none";
                  else {
                    b = j.stateNode;
                    var P = j.memoizedProps.style, Q = P != null && P.hasOwnProperty("display") ? P.display : null;
                    b.style.display = Q == null || typeof Q == "boolean" ? "" : ("" + Q).trim();
                  }
                } catch (mt) {
                  ne(j, j.return, mt);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                j = e;
                try {
                  j.stateNode.nodeValue = s ? "" : j.memoizedProps;
                } catch (mt) {
                  ne(j, j.return, mt);
                }
              }
            } else if (e.tag === 18) {
              if (n === null) {
                j = e;
                try {
                  var V = j.stateNode;
                  s ? Bp(V, !0) : Bp(j.stateNode, !1);
                } catch (mt) {
                  ne(j, j.return, mt);
                }
              }
            } else if ((e.tag !== 22 && e.tag !== 23 || e.memoizedState === null || e === t) && e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break t;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t) break t;
              n === e && (n = null), e = e.return;
            }
            n === e && (n = null), e.sibling.return = e.return, e = e.sibling;
          }
        l & 4 && (l = t.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, ts(t, n))));
        break;
      case 19:
        We(e, t), Pe(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, ts(t, l)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        We(e, t), Pe(t);
    }
  }
  function Pe(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, l = t.return; l !== null; ) {
          if (Hm(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var s = n.stateNode, u = wc(t);
            Pr(t, u, s);
            break;
          case 5:
            var h = n.stateNode;
            n.flags & 32 && (Vi(h, ""), n.flags &= -33);
            var b = wc(t);
            Pr(t, b, h);
            break;
          case 3:
          case 4:
            var j = n.stateNode.containerInfo, U = wc(t);
            Sc(
              t,
              U,
              j
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (Z) {
        ne(t, t.return, Z);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Km(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Km(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function ua(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Um(t, e.alternate, e), e = e.sibling;
  }
  function Ti(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Da(4, e, e.return), Ti(e);
          break;
        case 1:
          Un(e, e.return);
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && Bm(
            e,
            e.return,
            n
          ), Ti(e);
          break;
        case 27:
          Co(e.stateNode);
        case 26:
        case 5:
          Un(e, e.return), Ti(e);
          break;
        case 22:
          e.memoizedState === null && Ti(e);
          break;
        case 30:
          Ti(e);
          break;
        default:
          Ti(e);
      }
      t = t.sibling;
    }
  }
  function ca(t, e, n) {
    for (n = n && (e.subtreeFlags & 8772) !== 0, e = e.child; e !== null; ) {
      var l = e.alternate, s = t, u = e, h = u.flags;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          ca(
            s,
            u,
            n
          ), ho(4, u);
          break;
        case 1:
          if (ca(
            s,
            u,
            n
          ), l = u, s = l.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (U) {
              ne(l, l.return, U);
            }
          if (l = u, s = l.updateQueue, s !== null) {
            var b = l.stateNode;
            try {
              var j = s.shared.hiddenCallbacks;
              if (j !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < j.length; s++)
                  Ch(j[s], b);
            } catch (U) {
              ne(l, l.return, U);
            }
          }
          n && h & 64 && Om(u), mo(u, u.return);
          break;
        case 27:
          qm(u);
        case 26:
        case 5:
          ca(
            s,
            u,
            n
          ), n && l === null && h & 4 && km(u), mo(u, u.return);
          break;
        case 12:
          ca(
            s,
            u,
            n
          );
          break;
        case 31:
          ca(
            s,
            u,
            n
          ), n && h & 4 && Ym(s, u);
          break;
        case 13:
          ca(
            s,
            u,
            n
          ), n && h & 4 && Vm(s, u);
          break;
        case 22:
          u.memoizedState === null && ca(
            s,
            u,
            n
          ), mo(u, u.return);
          break;
        case 30:
          break;
        default:
          ca(
            s,
            u,
            n
          );
      }
      e = e.sibling;
    }
  }
  function _c(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Pl(n));
  }
  function Tc(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Pl(t));
  }
  function Dn(t, e, n, l) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Im(
          t,
          e,
          n,
          l
        ), e = e.sibling;
  }
  function Im(t, e, n, l) {
    var s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Dn(
          t,
          e,
          n,
          l
        ), s & 2048 && ho(9, e);
        break;
      case 1:
        Dn(
          t,
          e,
          n,
          l
        );
        break;
      case 3:
        Dn(
          t,
          e,
          n,
          l
        ), s & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Pl(t)));
        break;
      case 12:
        if (s & 2048) {
          Dn(
            t,
            e,
            n,
            l
          ), t = e.stateNode;
          try {
            var u = e.memoizedProps, h = u.id, b = u.onPostCommit;
            typeof b == "function" && b(
              h,
              e.alternate === null ? "mount" : "update",
              t.passiveEffectDuration,
              -0
            );
          } catch (j) {
            ne(e, e.return, j);
          }
        } else
          Dn(
            t,
            e,
            n,
            l
          );
        break;
      case 31:
        Dn(
          t,
          e,
          n,
          l
        );
        break;
      case 13:
        Dn(
          t,
          e,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        u = e.stateNode, h = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? Dn(
          t,
          e,
          n,
          l
        ) : po(t, e) : u._visibility & 2 ? Dn(
          t,
          e,
          n,
          l
        ) : (u._visibility |= 2, cl(
          t,
          e,
          n,
          l,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && _c(h, e);
        break;
      case 24:
        Dn(
          t,
          e,
          n,
          l
        ), s & 2048 && Tc(e.alternate, e);
        break;
      default:
        Dn(
          t,
          e,
          n,
          l
        );
    }
  }
  function cl(t, e, n, l, s) {
    for (s = s && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, h = e, b = n, j = l, U = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          cl(
            u,
            h,
            b,
            j,
            s
          ), ho(8, h);
          break;
        case 23:
          break;
        case 22:
          var Z = h.stateNode;
          h.memoizedState !== null ? Z._visibility & 2 ? cl(
            u,
            h,
            b,
            j,
            s
          ) : po(
            u,
            h
          ) : (Z._visibility |= 2, cl(
            u,
            h,
            b,
            j,
            s
          )), s && U & 2048 && _c(
            h.alternate,
            h
          );
          break;
        case 24:
          cl(
            u,
            h,
            b,
            j,
            s
          ), s && U & 2048 && Tc(h.alternate, h);
          break;
        default:
          cl(
            u,
            h,
            b,
            j,
            s
          );
      }
      e = e.sibling;
    }
  }
  function po(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, l = e, s = l.flags;
        switch (l.tag) {
          case 22:
            po(n, l), s & 2048 && _c(
              l.alternate,
              l
            );
            break;
          case 24:
            po(n, l), s & 2048 && Tc(l.alternate, l);
            break;
          default:
            po(n, l);
        }
        e = e.sibling;
      }
  }
  var go = 8192;
  function dl(t, e, n) {
    if (t.subtreeFlags & go)
      for (t = t.child; t !== null; )
        Zm(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function Zm(t, e, n) {
    switch (t.tag) {
      case 26:
        dl(
          t,
          e,
          n
        ), t.flags & go && t.memoizedState !== null && oy(
          n,
          Mn,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        dl(
          t,
          e,
          n
        );
        break;
      case 3:
      case 4:
        var l = Mn;
        Mn = ms(t.stateNode.containerInfo), dl(
          t,
          e,
          n
        ), Mn = l;
        break;
      case 22:
        t.memoizedState === null && (l = t.alternate, l !== null && l.memoizedState !== null ? (l = go, go = 16777216, dl(
          t,
          e,
          n
        ), go = l) : dl(
          t,
          e,
          n
        ));
        break;
      default:
        dl(
          t,
          e,
          n
        );
    }
  }
  function $m(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function xo(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          Oe = l, Jm(
            l,
            t
          );
        }
      $m(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Fm(t), t = t.sibling;
  }
  function Fm(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        xo(t), t.flags & 2048 && Da(9, t, t.return);
        break;
      case 3:
        xo(t);
        break;
      case 12:
        xo(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, es(t)) : xo(t);
        break;
      default:
        xo(t);
    }
  }
  function es(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          Oe = l, Jm(
            l,
            t
          );
        }
      $m(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          Da(8, e, e.return), es(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, es(e));
          break;
        default:
          es(e);
      }
      t = t.sibling;
    }
  }
  function Jm(t, e) {
    for (; Oe !== null; ) {
      var n = Oe;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Da(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Pl(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, Oe = l;
      else
        t: for (n = t; Oe !== null; ) {
          l = Oe;
          var s = l.sibling, u = l.return;
          if (Lm(l), l === n) {
            Oe = null;
            break t;
          }
          if (s !== null) {
            s.return = u, Oe = s;
            break t;
          }
          Oe = u;
        }
    }
  }
  var w0 = {
    getCacheForType: function(t) {
      var e = qe(_e), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return qe(_e).controller.signal;
    }
  }, S0 = typeof WeakMap == "function" ? WeakMap : Map, Ft = 0, se = null, kt = null, Gt = 0, ee = 0, un = null, Oa = !1, fl = !1, jc = !1, da = 0, ve = 0, Ba = 0, ji = 0, zc = 0, cn = 0, hl = 0, bo = null, tn = null, Ac = !1, ns = 0, Wm = 0, as = 1 / 0, is = null, ka = null, Re = 0, Ha = null, ml = null, fa = 0, Ec = 0, Rc = null, Pm = null, vo = 0, Nc = null;
  function dn() {
    return (Ft & 2) !== 0 && Gt !== 0 ? Gt & -Gt : H.T !== null ? Hc() : pf();
  }
  function tp() {
    if (cn === 0)
      if ((Gt & 536870912) === 0 || Qt) {
        var t = fr;
        fr <<= 1, (fr & 3932160) === 0 && (fr = 262144), cn = t;
      } else cn = 536870912;
    return t = rn.current, t !== null && (t.flags |= 32), cn;
  }
  function en(t, e, n) {
    (t === se && (ee === 2 || ee === 9) || t.cancelPendingCommit !== null) && (pl(t, 0), qa(
      t,
      Gt,
      cn,
      !1
    )), Gl(t, n), ((Ft & 2) === 0 || t !== se) && (t === se && ((Ft & 2) === 0 && (ji |= n), ve === 4 && qa(
      t,
      Gt,
      cn,
      !1
    )), Ln(t));
  }
  function ep(t, e, n) {
    if ((Ft & 6) !== 0) throw Error(r(327));
    var l = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || ql(t, e), s = l ? T0(t, e) : Dc(t, e, !0), u = l;
    do {
      if (s === 0) {
        fl && !l && qa(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, u && !C0(n)) {
          s = Dc(t, e, !1), u = !1;
          continue;
        }
        if (s === 2) {
          if (u = e, t.errorRecoveryDisabledLanes & u)
            var h = 0;
          else
            h = t.pendingLanes & -536870913, h = h !== 0 ? h : h & 536870912 ? 536870912 : 0;
          if (h !== 0) {
            e = h;
            t: {
              var b = t;
              s = bo;
              var j = b.current.memoizedState.isDehydrated;
              if (j && (pl(b, h).flags |= 256), h = Dc(
                b,
                h,
                !1
              ), h !== 2) {
                if (jc && !j) {
                  b.errorRecoveryDisabledLanes |= u, ji |= u, s = 4;
                  break t;
                }
                u = tn, tn = s, u !== null && (tn === null ? tn = u : tn.push.apply(
                  tn,
                  u
                ));
              }
              s = h;
            }
            if (u = !1, s !== 2) continue;
          }
        }
        if (s === 1) {
          pl(t, 0), qa(t, e, 0, !0);
          break;
        }
        t: {
          switch (l = t, u = s, u) {
            case 0:
            case 1:
              throw Error(r(345));
            case 4:
              if ((e & 4194048) !== e) break;
            case 6:
              qa(
                l,
                e,
                cn,
                !Oa
              );
              break t;
            case 2:
              tn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(r(329));
          }
          if ((e & 62914560) === e && (s = ns + 300 - pe(), 10 < s)) {
            if (qa(
              l,
              e,
              cn,
              !Oa
            ), mr(l, 0, !0) !== 0) break t;
            fa = e, l.timeoutHandle = Mp(
              np.bind(
                null,
                l,
                n,
                tn,
                is,
                Ac,
                e,
                cn,
                ji,
                hl,
                Oa,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break t;
          }
          np(
            l,
            n,
            tn,
            is,
            Ac,
            e,
            cn,
            ji,
            hl,
            Oa,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ln(t);
  }
  function np(t, e, n, l, s, u, h, b, j, U, Z, P, Q, V) {
    if (t.timeoutHandle = -1, P = e.subtreeFlags, P & 8192 || (P & 16785408) === 16785408) {
      P = {
        stylesheets: null,
        count: 0,
        imgCount: 0,
        imgBytes: 0,
        suspenseyImages: [],
        waitingForImages: !0,
        waitingForViewTransition: !1,
        unsuspend: Jn
      }, Zm(
        e,
        u,
        P
      );
      var mt = (u & 62914560) === u ? ns - pe() : (u & 4194048) === u ? Wm - pe() : 0;
      if (mt = ry(
        P,
        mt
      ), mt !== null) {
        fa = u, t.cancelPendingCommit = mt(
          cp.bind(
            null,
            t,
            e,
            u,
            n,
            l,
            s,
            h,
            b,
            j,
            Z,
            P,
            null,
            Q,
            V
          )
        ), qa(t, u, h, !U);
        return;
      }
    }
    cp(
      t,
      e,
      u,
      n,
      l,
      s,
      h,
      b,
      j
    );
  }
  function C0(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var s = n[l], u = s.getSnapshot;
          s = s.value;
          try {
            if (!ln(u(), s)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = e.child, e.subtreeFlags & 16384 && n !== null)
        n.return = e, e = n;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function qa(t, e, n, l) {
    e &= ~zc, e &= ~ji, t.suspendedLanes |= e, t.pingedLanes &= ~e, l && (t.warmLanes |= e), l = t.expirationTimes;
    for (var s = e; 0 < s; ) {
      var u = 31 - an(s), h = 1 << u;
      l[u] = -1, s &= ~h;
    }
    n !== 0 && ff(t, n, e);
  }
  function ls() {
    return (Ft & 6) === 0 ? (yo(0), !1) : !0;
  }
  function Mc() {
    if (kt !== null) {
      if (ee === 0)
        var t = kt.return;
      else
        t = kt, ea = xi = null, Zu(t), ll = null, eo = 0, t = kt;
      for (; t !== null; )
        Dm(t.alternate, t), t = t.return;
      kt = null;
    }
  }
  function pl(t, e) {
    var n = t.timeoutHandle;
    n !== -1 && (t.timeoutHandle = -1, Y0(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), fa = 0, Mc(), se = t, kt = n = Pn(t.current, null), Gt = e, ee = 0, un = null, Oa = !1, fl = ql(t, e), jc = !1, hl = cn = zc = ji = Ba = ve = 0, tn = bo = null, Ac = !1, (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var s = 31 - an(l), u = 1 << s;
        e |= t[s], l &= ~u;
      }
    return da = e, jr(), n;
  }
  function ap(t, e) {
    Nt = null, H.H = uo, e === il || e === Or ? (e = vh(), ee = 3) : e === ku ? (e = vh(), ee = 4) : ee = e === cc ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, un = e, kt === null && (ve = 1, Zr(
      t,
      yn(e, t.current)
    ));
  }
  function ip() {
    var t = rn.current;
    return t === null ? !0 : (Gt & 4194048) === Gt ? _n === null : (Gt & 62914560) === Gt || (Gt & 536870912) !== 0 ? t === _n : !1;
  }
  function lp() {
    var t = H.H;
    return H.H = uo, t === null ? uo : t;
  }
  function op() {
    var t = H.A;
    return H.A = w0, t;
  }
  function os() {
    ve = 4, Oa || (Gt & 4194048) !== Gt && rn.current !== null || (fl = !0), (Ba & 134217727) === 0 && (ji & 134217727) === 0 || se === null || qa(
      se,
      Gt,
      cn,
      !1
    );
  }
  function Dc(t, e, n) {
    var l = Ft;
    Ft |= 2;
    var s = lp(), u = op();
    (se !== t || Gt !== e) && (is = null, pl(t, e)), e = !1;
    var h = ve;
    t: do
      try {
        if (ee !== 0 && kt !== null) {
          var b = kt, j = un;
          switch (ee) {
            case 8:
              Mc(), h = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              rn.current === null && (e = !0);
              var U = ee;
              if (ee = 0, un = null, gl(t, b, j, U), n && fl) {
                h = 0;
                break t;
              }
              break;
            default:
              U = ee, ee = 0, un = null, gl(t, b, j, U);
          }
        }
        _0(), h = ve;
        break;
      } catch (Z) {
        ap(t, Z);
      }
    while (!0);
    return e && t.shellSuspendCounter++, ea = xi = null, Ft = l, H.H = s, H.A = u, kt === null && (se = null, Gt = 0, jr()), h;
  }
  function _0() {
    for (; kt !== null; ) rp(kt);
  }
  function T0(t, e) {
    var n = Ft;
    Ft |= 2;
    var l = lp(), s = op();
    se !== t || Gt !== e ? (is = null, as = pe() + 500, pl(t, e)) : fl = ql(
      t,
      e
    );
    t: do
      try {
        if (ee !== 0 && kt !== null) {
          e = kt;
          var u = un;
          e: switch (ee) {
            case 1:
              ee = 0, un = null, gl(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (xh(u)) {
                ee = 0, un = null, sp(e);
                break;
              }
              e = function() {
                ee !== 2 && ee !== 9 || se !== t || (ee = 7), Ln(t);
              }, u.then(e, e);
              break t;
            case 3:
              ee = 7;
              break t;
            case 4:
              ee = 5;
              break t;
            case 7:
              xh(u) ? (ee = 0, un = null, sp(e)) : (ee = 0, un = null, gl(t, e, u, 7));
              break;
            case 5:
              var h = null;
              switch (kt.tag) {
                case 26:
                  h = kt.memoizedState;
                case 5:
                case 27:
                  var b = kt;
                  if (h ? Ip(h) : b.stateNode.complete) {
                    ee = 0, un = null;
                    var j = b.sibling;
                    if (j !== null) kt = j;
                    else {
                      var U = b.return;
                      U !== null ? (kt = U, rs(U)) : kt = null;
                    }
                    break e;
                  }
              }
              ee = 0, un = null, gl(t, e, u, 5);
              break;
            case 6:
              ee = 0, un = null, gl(t, e, u, 6);
              break;
            case 8:
              Mc(), ve = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        j0();
        break;
      } catch (Z) {
        ap(t, Z);
      }
    while (!0);
    return ea = xi = null, H.H = l, H.A = s, Ft = n, kt !== null ? 0 : (se = null, Gt = 0, jr(), ve);
  }
  function j0() {
    for (; kt !== null && !$n(); )
      rp(kt);
  }
  function rp(t) {
    var e = Nm(t.alternate, t, da);
    t.memoizedProps = t.pendingProps, e === null ? rs(t) : kt = e;
  }
  function sp(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Tm(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          Gt
        );
        break;
      case 11:
        e = Tm(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Gt
        );
        break;
      case 5:
        Zu(e);
      default:
        Dm(n, e), e = kt = oh(e, da), e = Nm(n, e, da);
    }
    t.memoizedProps = t.pendingProps, e === null ? rs(t) : kt = e;
  }
  function gl(t, e, n, l) {
    ea = xi = null, Zu(e), ll = null, eo = 0;
    var s = e.return;
    try {
      if (m0(
        t,
        s,
        e,
        n,
        Gt
      )) {
        ve = 1, Zr(
          t,
          yn(n, t.current)
        ), kt = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw kt = s, u;
      ve = 1, Zr(
        t,
        yn(n, t.current)
      ), kt = null;
      return;
    }
    e.flags & 32768 ? (Qt || l === 1 ? t = !0 : fl || (Gt & 536870912) !== 0 ? t = !1 : (Oa = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = rn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), up(e, t)) : rs(e);
  }
  function rs(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        up(
          e,
          Oa
        );
        return;
      }
      t = e.return;
      var n = x0(
        e.alternate,
        e,
        da
      );
      if (n !== null) {
        kt = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        kt = e;
        return;
      }
      kt = e = t;
    } while (e !== null);
    ve === 0 && (ve = 5);
  }
  function up(t, e) {
    do {
      var n = b0(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, kt = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        kt = t;
        return;
      }
      kt = t = n;
    } while (t !== null);
    ve = 6, kt = null;
  }
  function cp(t, e, n, l, s, u, h, b, j) {
    t.cancelPendingCommit = null;
    do
      ss();
    while (Re !== 0);
    if ((Ft & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (u = e.lanes | e.childLanes, u |= wu, lv(
        t,
        n,
        u,
        h,
        b,
        j
      ), t === se && (kt = se = null, Gt = 0), ml = e, Ha = t, fa = n, Ec = u, Rc = s, Pm = l, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, R0(si, function() {
        return pp(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), l = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || l) {
        l = H.T, H.T = null, s = W.p, W.p = 2, h = Ft, Ft |= 4;
        try {
          v0(t, e, n);
        } finally {
          Ft = h, W.p = s, H.T = l;
        }
      }
      Re = 1, dp(), fp(), hp();
    }
  }
  function dp() {
    if (Re === 1) {
      Re = 0;
      var t = Ha, e = ml, n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        n = H.T, H.T = null;
        var l = W.p;
        W.p = 2;
        var s = Ft;
        Ft |= 4;
        try {
          Xm(e, t);
          var u = Xc, h = Jf(t.containerInfo), b = u.focusedElem, j = u.selectionRange;
          if (h !== b && b && b.ownerDocument && Ff(
            b.ownerDocument.documentElement,
            b
          )) {
            if (j !== null && gu(b)) {
              var U = j.start, Z = j.end;
              if (Z === void 0 && (Z = U), "selectionStart" in b)
                b.selectionStart = U, b.selectionEnd = Math.min(
                  Z,
                  b.value.length
                );
              else {
                var P = b.ownerDocument || document, Q = P && P.defaultView || window;
                if (Q.getSelection) {
                  var V = Q.getSelection(), mt = b.textContent.length, Ct = Math.min(j.start, mt), le = j.end === void 0 ? Ct : Math.min(j.end, mt);
                  !V.extend && Ct > le && (h = le, le = Ct, Ct = h);
                  var O = $f(
                    b,
                    Ct
                  ), E = $f(
                    b,
                    le
                  );
                  if (O && E && (V.rangeCount !== 1 || V.anchorNode !== O.node || V.anchorOffset !== O.offset || V.focusNode !== E.node || V.focusOffset !== E.offset)) {
                    var G = P.createRange();
                    G.setStart(O.node, O.offset), V.removeAllRanges(), Ct > le ? (V.addRange(G), V.extend(E.node, E.offset)) : (G.setEnd(E.node, E.offset), V.addRange(G));
                  }
                }
              }
            }
            for (P = [], V = b; V = V.parentNode; )
              V.nodeType === 1 && P.push({
                element: V,
                left: V.scrollLeft,
                top: V.scrollTop
              });
            for (typeof b.focus == "function" && b.focus(), b = 0; b < P.length; b++) {
              var J = P[b];
              J.element.scrollLeft = J.left, J.element.scrollTop = J.top;
            }
          }
          ys = !!Vc, Xc = Vc = null;
        } finally {
          Ft = s, W.p = l, H.T = n;
        }
      }
      t.current = e, Re = 2;
    }
  }
  function fp() {
    if (Re === 2) {
      Re = 0;
      var t = Ha, e = ml, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = H.T, H.T = null;
        var l = W.p;
        W.p = 2;
        var s = Ft;
        Ft |= 4;
        try {
          Um(t, e.alternate, e);
        } finally {
          Ft = s, W.p = l, H.T = n;
        }
      }
      Re = 3;
    }
  }
  function hp() {
    if (Re === 4 || Re === 3) {
      Re = 0, va();
      var t = Ha, e = ml, n = fa, l = Pm;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Re = 5 : (Re = 0, ml = Ha = null, mp(t, t.pendingLanes));
      var s = t.pendingLanes;
      if (s === 0 && (ka = null), Js(n), e = e.stateNode, nn && typeof nn.onCommitFiberRoot == "function")
        try {
          nn.onCommitFiberRoot(
            Hl,
            e,
            void 0,
            (e.current.flags & 128) === 128
          );
        } catch {
        }
      if (l !== null) {
        e = H.T, s = W.p, W.p = 2, H.T = null;
        try {
          for (var u = t.onRecoverableError, h = 0; h < l.length; h++) {
            var b = l[h];
            u(b.value, {
              componentStack: b.stack
            });
          }
        } finally {
          H.T = e, W.p = s;
        }
      }
      (fa & 3) !== 0 && ss(), Ln(t), s = t.pendingLanes, (n & 261930) !== 0 && (s & 42) !== 0 ? t === Nc ? vo++ : (vo = 0, Nc = t) : vo = 0, yo(0);
    }
  }
  function mp(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Pl(e)));
  }
  function ss() {
    return dp(), fp(), hp(), pp();
  }
  function pp() {
    if (Re !== 5) return !1;
    var t = Ha, e = Ec;
    Ec = 0;
    var n = Js(fa), l = H.T, s = W.p;
    try {
      W.p = 32 > n ? 32 : n, H.T = null, n = Rc, Rc = null;
      var u = Ha, h = fa;
      if (Re = 0, ml = Ha = null, fa = 0, (Ft & 6) !== 0) throw Error(r(331));
      var b = Ft;
      if (Ft |= 4, Fm(u.current), Im(
        u,
        u.current,
        h,
        n
      ), Ft = b, yo(0, !1), nn && typeof nn.onPostCommitFiberRoot == "function")
        try {
          nn.onPostCommitFiberRoot(Hl, u);
        } catch {
        }
      return !0;
    } finally {
      W.p = s, H.T = l, mp(t, e);
    }
  }
  function gp(t, e, n) {
    e = yn(n, e), e = uc(t.stateNode, e, 2), t = Ra(t, e, 2), t !== null && (Gl(t, 2), Ln(t));
  }
  function ne(t, e, n) {
    if (t.tag === 3)
      gp(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          gp(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (ka === null || !ka.has(l))) {
            t = yn(n, t), n = xm(2), l = Ra(e, n, 2), l !== null && (bm(
              n,
              l,
              e,
              t
            ), Gl(l, 2), Ln(l));
            break;
          }
        }
        e = e.return;
      }
  }
  function Oc(t, e, n) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new S0();
      var s = /* @__PURE__ */ new Set();
      l.set(e, s);
    } else
      s = l.get(e), s === void 0 && (s = /* @__PURE__ */ new Set(), l.set(e, s));
    s.has(n) || (jc = !0, s.add(n), t = z0.bind(null, t, e, n), e.then(t, t));
  }
  function z0(t, e, n) {
    var l = t.pingCache;
    l !== null && l.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, se === t && (Gt & n) === n && (ve === 4 || ve === 3 && (Gt & 62914560) === Gt && 300 > pe() - ns ? (Ft & 2) === 0 && pl(t, 0) : zc |= n, hl === Gt && (hl = 0)), Ln(t);
  }
  function xp(t, e) {
    e === 0 && (e = df()), t = mi(t, e), t !== null && (Gl(t, e), Ln(t));
  }
  function A0(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), xp(t, n);
  }
  function E0(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var l = t.stateNode, s = t.memoizedState;
        s !== null && (n = s.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(r(314));
    }
    l !== null && l.delete(e), xp(t, n);
  }
  function R0(t, e) {
    return Et(t, e);
  }
  var us = null, xl = null, Bc = !1, cs = !1, kc = !1, Ga = 0;
  function Ln(t) {
    t !== xl && t.next === null && (xl === null ? us = xl = t : xl = xl.next = t), cs = !0, Bc || (Bc = !0, M0());
  }
  function yo(t, e) {
    if (!kc && cs) {
      kc = !0;
      do
        for (var n = !1, l = us; l !== null; ) {
          if (t !== 0) {
            var s = l.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var h = l.suspendedLanes, b = l.pingedLanes;
              u = (1 << 31 - an(42 | t) + 1) - 1, u &= s & ~(h & ~b), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (n = !0, wp(l, u));
          } else
            u = Gt, u = mr(
              l,
              l === se ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || ql(l, u) || (n = !0, wp(l, u));
          l = l.next;
        }
      while (n);
      kc = !1;
    }
  }
  function N0() {
    bp();
  }
  function bp() {
    cs = Bc = !1;
    var t = 0;
    Ga !== 0 && Q0() && (t = Ga);
    for (var e = pe(), n = null, l = us; l !== null; ) {
      var s = l.next, u = vp(l, e);
      u === 0 ? (l.next = null, n === null ? us = s : n.next = s, s === null && (xl = n)) : (n = l, (t !== 0 || (u & 3) !== 0) && (cs = !0)), l = s;
    }
    Re !== 0 && Re !== 5 || yo(t), Ga !== 0 && (Ga = 0);
  }
  function vp(t, e) {
    for (var n = t.suspendedLanes, l = t.pingedLanes, s = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var h = 31 - an(u), b = 1 << h, j = s[h];
      j === -1 ? ((b & n) === 0 || (b & l) !== 0) && (s[h] = iv(b, e)) : j <= e && (t.expiredLanes |= b), u &= ~b;
    }
    if (e = se, n = Gt, n = mr(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, n === 0 || t === e && (ee === 2 || ee === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && we(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || ql(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (l !== null && we(l), Js(n)) {
        case 2:
        case 8:
          n = ri;
          break;
        case 32:
          n = si;
          break;
        case 268435456:
          n = ur;
          break;
        default:
          n = si;
      }
      return l = yp.bind(null, t), n = Et(n, l), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return l !== null && l !== null && we(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function yp(t, e) {
    if (Re !== 0 && Re !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (ss() && t.callbackNode !== n)
      return null;
    var l = Gt;
    return l = mr(
      t,
      t === se ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (ep(t, l, e), vp(t, pe()), t.callbackNode != null && t.callbackNode === n ? yp.bind(null, t) : null);
  }
  function wp(t, e) {
    if (ss()) return null;
    ep(t, e, !0);
  }
  function M0() {
    V0(function() {
      (Ft & 6) !== 0 ? Et(
        ya,
        N0
      ) : bp();
    });
  }
  function Hc() {
    if (Ga === 0) {
      var t = nl;
      t === 0 && (t = dr, dr <<= 1, (dr & 261888) === 0 && (dr = 256)), Ga = t;
    }
    return Ga;
  }
  function Sp(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : br("" + t);
  }
  function Cp(t, e) {
    var n = e.ownerDocument.createElement("input");
    return n.name = e.name, n.value = e.value, t.id && n.setAttribute("form", t.id), e.parentNode.insertBefore(n, e), t = new FormData(t), n.parentNode.removeChild(n), t;
  }
  function D0(t, e, n, l, s) {
    if (e === "submit" && n && n.stateNode === s) {
      var u = Sp(
        (s[$e] || null).action
      ), h = l.submitter;
      h && (e = (e = h[$e] || null) ? Sp(e.formAction) : h.getAttribute("formAction"), e !== null && (u = e, h = null));
      var b = new Sr(
        "action",
        "action",
        null,
        l,
        s
      );
      t.push({
        event: b,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (Ga !== 0) {
                  var j = h ? Cp(s, h) : new FormData(s);
                  ac(
                    n,
                    {
                      pending: !0,
                      data: j,
                      method: s.method,
                      action: u
                    },
                    null,
                    j
                  );
                }
              } else
                typeof u == "function" && (b.preventDefault(), j = h ? Cp(s, h) : new FormData(s), ac(
                  n,
                  {
                    pending: !0,
                    data: j,
                    method: s.method,
                    action: u
                  },
                  u,
                  j
                ));
            },
            currentTarget: s
          }
        ]
      });
    }
  }
  for (var qc = 0; qc < yu.length; qc++) {
    var Gc = yu[qc], O0 = Gc.toLowerCase(), B0 = Gc[0].toUpperCase() + Gc.slice(1);
    Nn(
      O0,
      "on" + B0
    );
  }
  Nn(th, "onAnimationEnd"), Nn(eh, "onAnimationIteration"), Nn(nh, "onAnimationStart"), Nn("dblclick", "onDoubleClick"), Nn("focusin", "onFocus"), Nn("focusout", "onBlur"), Nn(Jv, "onTransitionRun"), Nn(Wv, "onTransitionStart"), Nn(Pv, "onTransitionCancel"), Nn(ah, "onTransitionEnd"), Qi("onMouseEnter", ["mouseout", "mouseover"]), Qi("onMouseLeave", ["mouseout", "mouseover"]), Qi("onPointerEnter", ["pointerout", "pointerover"]), Qi("onPointerLeave", ["pointerout", "pointerover"]), ci(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ci(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ci("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ci(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ci(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ci(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var wo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), k0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wo)
  );
  function _p(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var l = t[n], s = l.event;
      l = l.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var h = l.length - 1; 0 <= h; h--) {
            var b = l[h], j = b.instance, U = b.currentTarget;
            if (b = b.listener, j !== u && s.isPropagationStopped())
              break t;
            u = b, s.currentTarget = U;
            try {
              u(s);
            } catch (Z) {
              Tr(Z);
            }
            s.currentTarget = null, u = j;
          }
        else
          for (h = 0; h < l.length; h++) {
            if (b = l[h], j = b.instance, U = b.currentTarget, b = b.listener, j !== u && s.isPropagationStopped())
              break t;
            u = b, s.currentTarget = U;
            try {
              u(s);
            } catch (Z) {
              Tr(Z);
            }
            s.currentTarget = null, u = j;
          }
      }
    }
  }
  function Ht(t, e) {
    var n = e[Ws];
    n === void 0 && (n = e[Ws] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    n.has(l) || (Tp(e, t, 2, !1), n.add(l));
  }
  function Uc(t, e, n) {
    var l = 0;
    e && (l |= 4), Tp(
      n,
      t,
      l,
      e
    );
  }
  var ds = "_reactListening" + Math.random().toString(36).slice(2);
  function Lc(t) {
    if (!t[ds]) {
      t[ds] = !0, bf.forEach(function(n) {
        n !== "selectionchange" && (k0.has(n) || Uc(n, !1, t), Uc(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[ds] || (e[ds] = !0, Uc("selectionchange", !1, e));
    }
  }
  function Tp(t, e, n, l) {
    switch (tg(e)) {
      case 2:
        var s = cy;
        break;
      case 8:
        s = dy;
        break;
      default:
        s = nd;
    }
    n = s.bind(
      null,
      e,
      n,
      t
    ), s = void 0, !ru || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (s = !0), l ? s !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: s
    }) : t.addEventListener(e, n, !0) : s !== void 0 ? t.addEventListener(e, n, {
      passive: s
    }) : t.addEventListener(e, n, !1);
  }
  function Qc(t, e, n, l, s) {
    var u = l;
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (; ; ) {
        if (l === null) return;
        var h = l.tag;
        if (h === 3 || h === 4) {
          var b = l.stateNode.containerInfo;
          if (b === s) break;
          if (h === 4)
            for (h = l.return; h !== null; ) {
              var j = h.tag;
              if ((j === 3 || j === 4) && h.stateNode.containerInfo === s)
                return;
              h = h.return;
            }
          for (; b !== null; ) {
            if (h = Gi(b), h === null) return;
            if (j = h.tag, j === 5 || j === 6 || j === 26 || j === 27) {
              l = u = h;
              continue t;
            }
            b = b.parentNode;
          }
        }
        l = l.return;
      }
    Rf(function() {
      var U = u, Z = lu(n), P = [];
      t: {
        var Q = ih.get(t);
        if (Q !== void 0) {
          var V = Sr, mt = t;
          switch (t) {
            case "keypress":
              if (yr(n) === 0) break t;
            case "keydown":
            case "keyup":
              V = Ev;
              break;
            case "focusin":
              mt = "focus", V = du;
              break;
            case "focusout":
              mt = "blur", V = du;
              break;
            case "beforeblur":
            case "afterblur":
              V = du;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              V = Df;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              V = xv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              V = Mv;
              break;
            case th:
            case eh:
            case nh:
              V = yv;
              break;
            case ah:
              V = Ov;
              break;
            case "scroll":
            case "scrollend":
              V = pv;
              break;
            case "wheel":
              V = kv;
              break;
            case "copy":
            case "cut":
            case "paste":
              V = Sv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              V = Bf;
              break;
            case "toggle":
            case "beforetoggle":
              V = qv;
          }
          var Ct = (e & 4) !== 0, le = !Ct && (t === "scroll" || t === "scrollend"), O = Ct ? Q !== null ? Q + "Capture" : null : Q;
          Ct = [];
          for (var E = U, G; E !== null; ) {
            var J = E;
            if (G = J.stateNode, J = J.tag, J !== 5 && J !== 26 && J !== 27 || G === null || O === null || (J = Ql(E, O), J != null && Ct.push(
              So(E, J, G)
            )), le) break;
            E = E.return;
          }
          0 < Ct.length && (Q = new V(
            Q,
            mt,
            null,
            n,
            Z
          ), P.push({ event: Q, listeners: Ct }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (Q = t === "mouseover" || t === "pointerover", V = t === "mouseout" || t === "pointerout", Q && n !== iu && (mt = n.relatedTarget || n.fromElement) && (Gi(mt) || mt[qi]))
            break t;
          if ((V || Q) && (Q = Z.window === Z ? Z : (Q = Z.ownerDocument) ? Q.defaultView || Q.parentWindow : window, V ? (mt = n.relatedTarget || n.toElement, V = U, mt = mt ? Gi(mt) : null, mt !== null && (le = f(mt), Ct = mt.tag, mt !== le || Ct !== 5 && Ct !== 27 && Ct !== 6) && (mt = null)) : (V = null, mt = U), V !== mt)) {
            if (Ct = Df, J = "onMouseLeave", O = "onMouseEnter", E = "mouse", (t === "pointerout" || t === "pointerover") && (Ct = Bf, J = "onPointerLeave", O = "onPointerEnter", E = "pointer"), le = V == null ? Q : Ll(V), G = mt == null ? Q : Ll(mt), Q = new Ct(
              J,
              E + "leave",
              V,
              n,
              Z
            ), Q.target = le, Q.relatedTarget = G, J = null, Gi(Z) === U && (Ct = new Ct(
              O,
              E + "enter",
              mt,
              n,
              Z
            ), Ct.target = G, Ct.relatedTarget = le, J = Ct), le = J, V && mt)
              e: {
                for (Ct = H0, O = V, E = mt, G = 0, J = O; J; J = Ct(J))
                  G++;
                J = 0;
                for (var wt = E; wt; wt = Ct(wt))
                  J++;
                for (; 0 < G - J; )
                  O = Ct(O), G--;
                for (; 0 < J - G; )
                  E = Ct(E), J--;
                for (; G--; ) {
                  if (O === E || E !== null && O === E.alternate) {
                    Ct = O;
                    break e;
                  }
                  O = Ct(O), E = Ct(E);
                }
                Ct = null;
              }
            else Ct = null;
            V !== null && jp(
              P,
              Q,
              V,
              Ct,
              !1
            ), mt !== null && le !== null && jp(
              P,
              le,
              mt,
              Ct,
              !0
            );
          }
        }
        t: {
          if (Q = U ? Ll(U) : window, V = Q.nodeName && Q.nodeName.toLowerCase(), V === "select" || V === "input" && Q.type === "file")
            var It = Yf;
          else if (Lf(Q))
            if (Vf)
              It = Zv;
            else {
              It = Kv;
              var xt = Xv;
            }
          else
            V = Q.nodeName, !V || V.toLowerCase() !== "input" || Q.type !== "checkbox" && Q.type !== "radio" ? U && au(U.elementType) && (It = Yf) : It = Iv;
          if (It && (It = It(t, U))) {
            Qf(
              P,
              It,
              n,
              Z
            );
            break t;
          }
          xt && xt(t, Q, U), t === "focusout" && U && Q.type === "number" && U.memoizedProps.value != null && nu(Q, "number", Q.value);
        }
        switch (xt = U ? Ll(U) : window, t) {
          case "focusin":
            (Lf(xt) || xt.contentEditable === "true") && (Zi = xt, xu = U, Fl = null);
            break;
          case "focusout":
            Fl = xu = Zi = null;
            break;
          case "mousedown":
            bu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            bu = !1, Wf(P, n, Z);
            break;
          case "selectionchange":
            if (Fv) break;
          case "keydown":
          case "keyup":
            Wf(P, n, Z);
        }
        var Mt;
        if (hu)
          t: {
            switch (t) {
              case "compositionstart":
                var Ut = "onCompositionStart";
                break t;
              case "compositionend":
                Ut = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Ut = "onCompositionUpdate";
                break t;
            }
            Ut = void 0;
          }
        else
          Ii ? Gf(t, n) && (Ut = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (Ut = "onCompositionStart");
        Ut && (kf && n.locale !== "ko" && (Ii || Ut !== "onCompositionStart" ? Ut === "onCompositionEnd" && Ii && (Mt = Nf()) : (Ca = Z, su = "value" in Ca ? Ca.value : Ca.textContent, Ii = !0)), xt = fs(U, Ut), 0 < xt.length && (Ut = new Of(
          Ut,
          t,
          null,
          n,
          Z
        ), P.push({ event: Ut, listeners: xt }), Mt ? Ut.data = Mt : (Mt = Uf(n), Mt !== null && (Ut.data = Mt)))), (Mt = Uv ? Lv(t, n) : Qv(t, n)) && (Ut = fs(U, "onBeforeInput"), 0 < Ut.length && (xt = new Of(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          Z
        ), P.push({
          event: xt,
          listeners: Ut
        }), xt.data = Mt)), D0(
          P,
          t,
          U,
          n,
          Z
        );
      }
      _p(P, e);
    });
  }
  function So(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function fs(t, e) {
    for (var n = e + "Capture", l = []; t !== null; ) {
      var s = t, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = Ql(t, n), s != null && l.unshift(
        So(t, s, u)
      ), s = Ql(t, e), s != null && l.push(
        So(t, s, u)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function H0(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function jp(t, e, n, l, s) {
    for (var u = e._reactName, h = []; n !== null && n !== l; ) {
      var b = n, j = b.alternate, U = b.stateNode;
      if (b = b.tag, j !== null && j === l) break;
      b !== 5 && b !== 26 && b !== 27 || U === null || (j = U, s ? (U = Ql(n, u), U != null && h.unshift(
        So(n, U, j)
      )) : s || (U = Ql(n, u), U != null && h.push(
        So(n, U, j)
      ))), n = n.return;
    }
    h.length !== 0 && t.push({ event: e, listeners: h });
  }
  var q0 = /\r\n?/g, G0 = /\u0000|\uFFFD/g;
  function zp(t) {
    return (typeof t == "string" ? t : "" + t).replace(q0, `
`).replace(G0, "");
  }
  function Ap(t, e) {
    return e = zp(e), zp(t) === e;
  }
  function ie(t, e, n, l, s, u) {
    switch (n) {
      case "children":
        typeof l == "string" ? e === "body" || e === "textarea" && l === "" || Vi(t, l) : (typeof l == "number" || typeof l == "bigint") && e !== "body" && Vi(t, "" + l);
        break;
      case "className":
        gr(t, "class", l);
        break;
      case "tabIndex":
        gr(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        gr(t, n, l);
        break;
      case "style":
        Af(t, l, u);
        break;
      case "data":
        if (e !== "object") {
          gr(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(n);
          break;
        }
        l = br("" + l), t.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof u == "function" && (n === "formAction" ? (e !== "input" && ie(t, e, "name", s.name, s, null), ie(
            t,
            e,
            "formEncType",
            s.formEncType,
            s,
            null
          ), ie(
            t,
            e,
            "formMethod",
            s.formMethod,
            s,
            null
          ), ie(
            t,
            e,
            "formTarget",
            s.formTarget,
            s,
            null
          )) : (ie(t, e, "encType", s.encType, s, null), ie(t, e, "method", s.method, s, null), ie(t, e, "target", s.target, s, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(n);
          break;
        }
        l = br("" + l), t.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (t.onclick = Jn);
        break;
      case "onScroll":
        l != null && Ht("scroll", t);
        break;
      case "onScrollEnd":
        l != null && Ht("scrollend", t);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (n = l.__html, n != null) {
            if (s.children != null) throw Error(r(60));
            t.innerHTML = n;
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = br("" + l), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, "" + l) : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0 ? t.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, l) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(n, l) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(n) : t.setAttribute(n, l);
        break;
      case "popover":
        Ht("beforetoggle", t), Ht("toggle", t), pr(t, "popover", l);
        break;
      case "xlinkActuate":
        Fn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Fn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Fn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Fn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Fn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Fn(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Fn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Fn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Fn(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        pr(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = hv.get(n) || n, pr(t, n, l));
    }
  }
  function Yc(t, e, n, l, s, u) {
    switch (n) {
      case "style":
        Af(t, l, u);
        break;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(r(61));
          if (n = l.__html, n != null) {
            if (s.children != null) throw Error(r(60));
            t.innerHTML = n;
          }
        }
        break;
      case "children":
        typeof l == "string" ? Vi(t, l) : (typeof l == "number" || typeof l == "bigint") && Vi(t, "" + l);
        break;
      case "onScroll":
        l != null && Ht("scroll", t);
        break;
      case "onScrollEnd":
        l != null && Ht("scrollend", t);
        break;
      case "onClick":
        l != null && (t.onclick = Jn);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!vf.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (s = n.endsWith("Capture"), e = n.slice(2, s ? n.length - 7 : void 0), u = t[$e] || null, u = u != null ? u[n] : null, typeof u == "function" && t.removeEventListener(e, u, s), typeof l == "function")) {
              typeof u != "function" && u !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(e, l, s);
              break t;
            }
            n in t ? t[n] = l : l === !0 ? t.setAttribute(n, "") : pr(t, n, l);
          }
    }
  }
  function Ue(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Ht("error", t), Ht("load", t);
        var l = !1, s = !1, u;
        for (u in n)
          if (n.hasOwnProperty(u)) {
            var h = n[u];
            if (h != null)
              switch (u) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  s = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(r(137, e));
                default:
                  ie(t, e, u, h, n, null);
              }
          }
        s && ie(t, e, "srcSet", n.srcSet, n, null), l && ie(t, e, "src", n.src, n, null);
        return;
      case "input":
        Ht("invalid", t);
        var b = u = h = s = null, j = null, U = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var Z = n[l];
            if (Z != null)
              switch (l) {
                case "name":
                  s = Z;
                  break;
                case "type":
                  h = Z;
                  break;
                case "checked":
                  j = Z;
                  break;
                case "defaultChecked":
                  U = Z;
                  break;
                case "value":
                  u = Z;
                  break;
                case "defaultValue":
                  b = Z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Z != null)
                    throw Error(r(137, e));
                  break;
                default:
                  ie(t, e, l, Z, n, null);
              }
          }
        _f(
          t,
          u,
          b,
          j,
          U,
          h,
          s,
          !1
        );
        return;
      case "select":
        Ht("invalid", t), l = h = u = null;
        for (s in n)
          if (n.hasOwnProperty(s) && (b = n[s], b != null))
            switch (s) {
              case "value":
                u = b;
                break;
              case "defaultValue":
                h = b;
                break;
              case "multiple":
                l = b;
              default:
                ie(t, e, s, b, n, null);
            }
        e = u, n = h, t.multiple = !!l, e != null ? Yi(t, !!l, e, !1) : n != null && Yi(t, !!l, n, !0);
        return;
      case "textarea":
        Ht("invalid", t), u = s = l = null;
        for (h in n)
          if (n.hasOwnProperty(h) && (b = n[h], b != null))
            switch (h) {
              case "value":
                l = b;
                break;
              case "defaultValue":
                s = b;
                break;
              case "children":
                u = b;
                break;
              case "dangerouslySetInnerHTML":
                if (b != null) throw Error(r(91));
                break;
              default:
                ie(t, e, h, b, n, null);
            }
        jf(t, l, s, u);
        return;
      case "option":
        for (j in n)
          if (n.hasOwnProperty(j) && (l = n[j], l != null))
            switch (j) {
              case "selected":
                t.selected = l && typeof l != "function" && typeof l != "symbol";
                break;
              default:
                ie(t, e, j, l, n, null);
            }
        return;
      case "dialog":
        Ht("beforetoggle", t), Ht("toggle", t), Ht("cancel", t), Ht("close", t);
        break;
      case "iframe":
      case "object":
        Ht("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < wo.length; l++)
          Ht(wo[l], t);
        break;
      case "image":
        Ht("error", t), Ht("load", t);
        break;
      case "details":
        Ht("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        Ht("error", t), Ht("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (U in n)
          if (n.hasOwnProperty(U) && (l = n[U], l != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                ie(t, e, U, l, n, null);
            }
        return;
      default:
        if (au(e)) {
          for (Z in n)
            n.hasOwnProperty(Z) && (l = n[Z], l !== void 0 && Yc(
              t,
              e,
              Z,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (b in n)
      n.hasOwnProperty(b) && (l = n[b], l != null && ie(t, e, b, l, n, null));
  }
  function U0(t, e, n, l) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var s = null, u = null, h = null, b = null, j = null, U = null, Z = null;
        for (V in n) {
          var P = n[V];
          if (n.hasOwnProperty(V) && P != null)
            switch (V) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                j = P;
              default:
                l.hasOwnProperty(V) || ie(t, e, V, null, l, P);
            }
        }
        for (var Q in l) {
          var V = l[Q];
          if (P = n[Q], l.hasOwnProperty(Q) && (V != null || P != null))
            switch (Q) {
              case "type":
                u = V;
                break;
              case "name":
                s = V;
                break;
              case "checked":
                U = V;
                break;
              case "defaultChecked":
                Z = V;
                break;
              case "value":
                h = V;
                break;
              case "defaultValue":
                b = V;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (V != null)
                  throw Error(r(137, e));
                break;
              default:
                V !== P && ie(
                  t,
                  e,
                  Q,
                  V,
                  l,
                  P
                );
            }
        }
        eu(
          t,
          h,
          b,
          j,
          U,
          Z,
          u,
          s
        );
        return;
      case "select":
        V = h = b = Q = null;
        for (u in n)
          if (j = n[u], n.hasOwnProperty(u) && j != null)
            switch (u) {
              case "value":
                break;
              case "multiple":
                V = j;
              default:
                l.hasOwnProperty(u) || ie(
                  t,
                  e,
                  u,
                  null,
                  l,
                  j
                );
            }
        for (s in l)
          if (u = l[s], j = n[s], l.hasOwnProperty(s) && (u != null || j != null))
            switch (s) {
              case "value":
                Q = u;
                break;
              case "defaultValue":
                b = u;
                break;
              case "multiple":
                h = u;
              default:
                u !== j && ie(
                  t,
                  e,
                  s,
                  u,
                  l,
                  j
                );
            }
        e = b, n = h, l = V, Q != null ? Yi(t, !!n, Q, !1) : !!l != !!n && (e != null ? Yi(t, !!n, e, !0) : Yi(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        V = Q = null;
        for (b in n)
          if (s = n[b], n.hasOwnProperty(b) && s != null && !l.hasOwnProperty(b))
            switch (b) {
              case "value":
                break;
              case "children":
                break;
              default:
                ie(t, e, b, null, l, s);
            }
        for (h in l)
          if (s = l[h], u = n[h], l.hasOwnProperty(h) && (s != null || u != null))
            switch (h) {
              case "value":
                Q = s;
                break;
              case "defaultValue":
                V = s;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(r(91));
                break;
              default:
                s !== u && ie(t, e, h, s, l, u);
            }
        Tf(t, Q, V);
        return;
      case "option":
        for (var mt in n)
          if (Q = n[mt], n.hasOwnProperty(mt) && Q != null && !l.hasOwnProperty(mt))
            switch (mt) {
              case "selected":
                t.selected = !1;
                break;
              default:
                ie(
                  t,
                  e,
                  mt,
                  null,
                  l,
                  Q
                );
            }
        for (j in l)
          if (Q = l[j], V = n[j], l.hasOwnProperty(j) && Q !== V && (Q != null || V != null))
            switch (j) {
              case "selected":
                t.selected = Q && typeof Q != "function" && typeof Q != "symbol";
                break;
              default:
                ie(
                  t,
                  e,
                  j,
                  Q,
                  l,
                  V
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Ct in n)
          Q = n[Ct], n.hasOwnProperty(Ct) && Q != null && !l.hasOwnProperty(Ct) && ie(t, e, Ct, null, l, Q);
        for (U in l)
          if (Q = l[U], V = n[U], l.hasOwnProperty(U) && Q !== V && (Q != null || V != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (Q != null)
                  throw Error(r(137, e));
                break;
              default:
                ie(
                  t,
                  e,
                  U,
                  Q,
                  l,
                  V
                );
            }
        return;
      default:
        if (au(e)) {
          for (var le in n)
            Q = n[le], n.hasOwnProperty(le) && Q !== void 0 && !l.hasOwnProperty(le) && Yc(
              t,
              e,
              le,
              void 0,
              l,
              Q
            );
          for (Z in l)
            Q = l[Z], V = n[Z], !l.hasOwnProperty(Z) || Q === V || Q === void 0 && V === void 0 || Yc(
              t,
              e,
              Z,
              Q,
              l,
              V
            );
          return;
        }
    }
    for (var O in n)
      Q = n[O], n.hasOwnProperty(O) && Q != null && !l.hasOwnProperty(O) && ie(t, e, O, null, l, Q);
    for (P in l)
      Q = l[P], V = n[P], !l.hasOwnProperty(P) || Q === V || Q == null && V == null || ie(t, e, P, Q, l, V);
  }
  function Ep(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function L0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var s = n[l], u = s.transferSize, h = s.initiatorType, b = s.duration;
        if (u && b && Ep(h)) {
          for (h = 0, b = s.responseEnd, l += 1; l < n.length; l++) {
            var j = n[l], U = j.startTime;
            if (U > b) break;
            var Z = j.transferSize, P = j.initiatorType;
            Z && Ep(P) && (j = j.responseEnd, h += Z * (j < b ? 1 : (b - U) / (j - U)));
          }
          if (--l, e += 8 * (u + h) / (s.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Vc = null, Xc = null;
  function hs(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Rp(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Np(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function Kc(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Ic = null;
  function Q0() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Ic ? !1 : (Ic = t, !0) : (Ic = null, !1);
  }
  var Mp = typeof setTimeout == "function" ? setTimeout : void 0, Y0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Dp = typeof Promise == "function" ? Promise : void 0, V0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Dp < "u" ? function(t) {
    return Dp.resolve(null).then(t).catch(X0);
  } : Mp;
  function X0(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ua(t) {
    return t === "head";
  }
  function Op(t, e) {
    var n = e, l = 0;
    do {
      var s = n.nextSibling;
      if (t.removeChild(n), s && s.nodeType === 8)
        if (n = s.data, n === "/$" || n === "/&") {
          if (l === 0) {
            t.removeChild(s), wl(e);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          Co(t.ownerDocument.documentElement);
        else if (n === "head") {
          n = t.ownerDocument.head, Co(n);
          for (var u = n.firstChild; u; ) {
            var h = u.nextSibling, b = u.nodeName;
            u[Ul] || b === "SCRIPT" || b === "STYLE" || b === "LINK" && u.rel.toLowerCase() === "stylesheet" || n.removeChild(u), u = h;
          }
        } else
          n === "body" && Co(t.ownerDocument.body);
      n = s;
    } while (n);
    wl(e);
  }
  function Bp(t, e) {
    var n = t;
    t = 0;
    do {
      var l = n.nextSibling;
      if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), l && l.nodeType === 8)
        if (n = l.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
      n = l;
    } while (n);
  }
  function Zc(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Zc(n), Ps(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function K0(t, e, n, l) {
    for (; t.nodeType === 1; ) {
      var s = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[Ul])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (u = t.getAttribute("rel"), u === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (u !== s.rel || t.getAttribute("href") !== (s.href == null || s.href === "" ? null : s.href) || t.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin) || t.getAttribute("title") !== (s.title == null ? null : s.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (u = t.getAttribute("src"), (u !== (s.src == null ? null : s.src) || t.getAttribute("type") !== (s.type == null ? null : s.type) || t.getAttribute("crossorigin") !== (s.crossOrigin == null ? null : s.crossOrigin)) && u && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var u = s.name == null ? null : "" + s.name;
        if (s.type === "hidden" && t.getAttribute("name") === u)
          return t;
      } else return t;
      if (t = Tn(t.nextSibling), t === null) break;
    }
    return null;
  }
  function I0(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Tn(t.nextSibling), t === null)) return null;
    return t;
  }
  function kp(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Tn(t.nextSibling), t === null)) return null;
    return t;
  }
  function $c(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Fc(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function Z0(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading")
      e();
    else {
      var l = function() {
        e(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
    }
  }
  function Tn(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var Jc = null;
  function Hp(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return Tn(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function qp(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else n !== "/$" && n !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function Gp(t, e, n) {
    switch (e = hs(n), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(r(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(r(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(r(454));
        return t;
      default:
        throw Error(r(451));
    }
  }
  function Co(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Ps(t);
  }
  var jn = /* @__PURE__ */ new Map(), Up = /* @__PURE__ */ new Set();
  function ms(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ha = W.d;
  W.d = {
    f: $0,
    r: F0,
    D: J0,
    C: W0,
    L: P0,
    m: ty,
    X: ny,
    S: ey,
    M: ay
  };
  function $0() {
    var t = ha.f(), e = ls();
    return t || e;
  }
  function F0(t) {
    var e = Ui(t);
    e !== null && e.tag === 5 && e.type === "form" ? am(e) : ha.r(t);
  }
  var bl = typeof document > "u" ? null : document;
  function Lp(t, e, n) {
    var l = bl;
    if (l && typeof e == "string" && e) {
      var s = bn(e);
      s = 'link[rel="' + t + '"][href="' + s + '"]', typeof n == "string" && (s += '[crossorigin="' + n + '"]'), Up.has(s) || (Up.add(s), t = { rel: t, crossOrigin: n, href: e }, l.querySelector(s) === null && (e = l.createElement("link"), Ue(e, "link", t), De(e), l.head.appendChild(e)));
    }
  }
  function J0(t) {
    ha.D(t), Lp("dns-prefetch", t, null);
  }
  function W0(t, e) {
    ha.C(t, e), Lp("preconnect", t, e);
  }
  function P0(t, e, n) {
    ha.L(t, e, n);
    var l = bl;
    if (l && t && e) {
      var s = 'link[rel="preload"][as="' + bn(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (s += '[imagesrcset="' + bn(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (s += '[imagesizes="' + bn(
        n.imageSizes
      ) + '"]')) : s += '[href="' + bn(t) + '"]';
      var u = s;
      switch (e) {
        case "style":
          u = vl(t);
          break;
        case "script":
          u = yl(t);
      }
      jn.has(u) || (t = w(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), jn.set(u, t), l.querySelector(s) !== null || e === "style" && l.querySelector(_o(u)) || e === "script" && l.querySelector(To(u)) || (e = l.createElement("link"), Ue(e, "link", t), De(e), l.head.appendChild(e)));
    }
  }
  function ty(t, e) {
    ha.m(t, e);
    var n = bl;
    if (n && t) {
      var l = e && typeof e.as == "string" ? e.as : "script", s = 'link[rel="modulepreload"][as="' + bn(l) + '"][href="' + bn(t) + '"]', u = s;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = yl(t);
      }
      if (!jn.has(u) && (t = w({ rel: "modulepreload", href: t }, e), jn.set(u, t), n.querySelector(s) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(To(u)))
              return;
        }
        l = n.createElement("link"), Ue(l, "link", t), De(l), n.head.appendChild(l);
      }
    }
  }
  function ey(t, e, n) {
    ha.S(t, e, n);
    var l = bl;
    if (l && t) {
      var s = Li(l).hoistableStyles, u = vl(t);
      e = e || "default";
      var h = s.get(u);
      if (!h) {
        var b = { loading: 0, preload: null };
        if (h = l.querySelector(
          _o(u)
        ))
          b.loading = 5;
        else {
          t = w(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = jn.get(u)) && Wc(t, n);
          var j = h = l.createElement("link");
          De(j), Ue(j, "link", t), j._p = new Promise(function(U, Z) {
            j.onload = U, j.onerror = Z;
          }), j.addEventListener("load", function() {
            b.loading |= 1;
          }), j.addEventListener("error", function() {
            b.loading |= 2;
          }), b.loading |= 4, ps(h, e, l);
        }
        h = {
          type: "stylesheet",
          instance: h,
          count: 1,
          state: b
        }, s.set(u, h);
      }
    }
  }
  function ny(t, e) {
    ha.X(t, e);
    var n = bl;
    if (n && t) {
      var l = Li(n).hoistableScripts, s = yl(t), u = l.get(s);
      u || (u = n.querySelector(To(s)), u || (t = w({ src: t, async: !0 }, e), (e = jn.get(s)) && Pc(t, e), u = n.createElement("script"), De(u), Ue(u, "link", t), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(s, u));
    }
  }
  function ay(t, e) {
    ha.M(t, e);
    var n = bl;
    if (n && t) {
      var l = Li(n).hoistableScripts, s = yl(t), u = l.get(s);
      u || (u = n.querySelector(To(s)), u || (t = w({ src: t, async: !0, type: "module" }, e), (e = jn.get(s)) && Pc(t, e), u = n.createElement("script"), De(u), Ue(u, "link", t), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(s, u));
    }
  }
  function Qp(t, e, n, l) {
    var s = (s = St.current) ? ms(s) : null;
    if (!s) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (e = vl(n.href), n = Li(
          s
        ).hoistableStyles, l = n.get(e), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = vl(n.href);
          var u = Li(
            s
          ).hoistableStyles, h = u.get(t);
          if (h || (s = s.ownerDocument || s, h = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, h), (u = s.querySelector(
            _o(t)
          )) && !u._p && (h.instance = u, h.state.loading = 5), jn.has(t) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, jn.set(t, n), u || iy(
            s,
            t,
            n,
            h.state
          ))), e && l === null)
            throw Error(r(528, ""));
          return h;
        }
        if (e && l !== null)
          throw Error(r(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = yl(n), n = Li(
          s
        ).hoistableScripts, l = n.get(e), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(r(444, t));
    }
  }
  function vl(t) {
    return 'href="' + bn(t) + '"';
  }
  function _o(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Yp(t) {
    return w({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function iy(t, e, n, l) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? l.loading = 1 : (e = t.createElement("link"), l.preload = e, e.addEventListener("load", function() {
      return l.loading |= 1;
    }), e.addEventListener("error", function() {
      return l.loading |= 2;
    }), Ue(e, "link", n), De(e), t.head.appendChild(e));
  }
  function yl(t) {
    return '[src="' + bn(t) + '"]';
  }
  function To(t) {
    return "script[async]" + t;
  }
  function Vp(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + bn(n.href) + '"]'
          );
          if (l)
            return e.instance = l, De(l), l;
          var s = w({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), De(l), Ue(l, "style", s), ps(l, n.precedence, t), e.instance = l;
        case "stylesheet":
          s = vl(n.href);
          var u = t.querySelector(
            _o(s)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, De(u), u;
          l = Yp(n), (s = jn.get(s)) && Wc(l, s), u = (t.ownerDocument || t).createElement("link"), De(u);
          var h = u;
          return h._p = new Promise(function(b, j) {
            h.onload = b, h.onerror = j;
          }), Ue(u, "link", l), e.state.loading |= 4, ps(u, n.precedence, t), e.instance = u;
        case "script":
          return u = yl(n.src), (s = t.querySelector(
            To(u)
          )) ? (e.instance = s, De(s), s) : (l = n, (s = jn.get(u)) && (l = w({}, n), Pc(l, s)), t = t.ownerDocument || t, s = t.createElement("script"), De(s), Ue(s, "link", l), t.head.appendChild(s), e.instance = s);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (l = e.instance, e.state.loading |= 4, ps(l, n.precedence, t));
    return e.instance;
  }
  function ps(t, e, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = l.length ? l[l.length - 1] : null, u = s, h = 0; h < l.length; h++) {
      var b = l[h];
      if (b.dataset.precedence === e) u = b;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function Wc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Pc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var gs = null;
  function Xp(t, e, n) {
    if (gs === null) {
      var l = /* @__PURE__ */ new Map(), s = gs = /* @__PURE__ */ new Map();
      s.set(n, l);
    } else
      s = gs, l = s.get(n), l || (l = /* @__PURE__ */ new Map(), s.set(n, l));
    if (l.has(t)) return l;
    for (l.set(t, null), n = n.getElementsByTagName(t), s = 0; s < n.length; s++) {
      var u = n[s];
      if (!(u[Ul] || u[ke] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var h = u.getAttribute(e) || "";
        h = t + h;
        var b = l.get(h);
        b ? b.push(u) : l.set(h, [u]);
      }
    }
    return l;
  }
  function Kp(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function ly(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        switch (e.rel) {
          case "stylesheet":
            return t = e.disabled, typeof e.precedence == "string" && t == null;
          default:
            return !0;
        }
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function Ip(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function oy(t, e, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = vl(l.href), u = e.querySelector(
          _o(s)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = xs.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = u, De(u);
          return;
        }
        u = e.ownerDocument || e, l = Yp(l), (s = jn.get(s)) && Wc(l, s), u = u.createElement("link"), De(u);
        var h = u;
        h._p = new Promise(function(b, j) {
          h.onload = b, h.onerror = j;
        }), Ue(u, "link", l), n.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = xs.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var td = 0;
  function ry(t, e) {
    return t.stylesheets && t.count === 0 && vs(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (t.stylesheets && vs(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && td === 0 && (td = 62500 * L0());
      var s = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && vs(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > td ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(l), clearTimeout(s);
      };
    } : null;
  }
  function xs() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) vs(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var bs = null;
  function vs(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, bs = /* @__PURE__ */ new Map(), e.forEach(sy, t), bs = null, xs.call(t));
  }
  function sy(t, e) {
    if (!(e.state.loading & 4)) {
      var n = bs.get(t);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), bs.set(t, n);
        for (var s = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var h = s[u];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (n.set(h.dataset.precedence, h), l = h);
        }
        l && n.set(null, l);
      }
      s = e.instance, h = s.getAttribute("data-precedence"), u = n.get(h) || l, u === l && n.set(null, s), n.set(h, s), this.count++, l = xs.bind(this), s.addEventListener("load", l), s.addEventListener("error", l), u ? u.parentNode.insertBefore(s, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(s, t.firstChild)), e.state.loading |= 4;
    }
  }
  var jo = {
    $$typeof: L,
    Provider: null,
    Consumer: null,
    _currentValue: F,
    _currentValue2: F,
    _threadCount: 0
  };
  function uy(t, e, n, l, s, u, h, b, j) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $s(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $s(0), this.hiddenUpdates = $s(null), this.identifierPrefix = l, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = j, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Zp(t, e, n, l, s, u, h, b, j, U, Z, P) {
    return t = new uy(
      t,
      e,
      n,
      h,
      j,
      U,
      Z,
      P,
      b
    ), e = 1, u === !0 && (e |= 24), u = on(3, null, null, e), t.current = u, u.stateNode = t, e = Du(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: e
    }, Hu(u), t;
  }
  function $p(t) {
    return t ? (t = Ji, t) : Ji;
  }
  function Fp(t, e, n, l, s, u) {
    s = $p(s), l.context === null ? l.context = s : l.pendingContext = s, l = Ea(e), l.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (l.callback = u), n = Ra(t, l, e), n !== null && (en(n, t, e), ao(n, t, e));
  }
  function Jp(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function ed(t, e) {
    Jp(t, e), (t = t.alternate) && Jp(t, e);
  }
  function Wp(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = mi(t, 67108864);
      e !== null && en(e, t, 67108864), ed(t, 67108864);
    }
  }
  function Pp(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = dn();
      e = Fs(e);
      var n = mi(t, e);
      n !== null && en(n, t, e), ed(t, e);
    }
  }
  var ys = !0;
  function cy(t, e, n, l) {
    var s = H.T;
    H.T = null;
    var u = W.p;
    try {
      W.p = 2, nd(t, e, n, l);
    } finally {
      W.p = u, H.T = s;
    }
  }
  function dy(t, e, n, l) {
    var s = H.T;
    H.T = null;
    var u = W.p;
    try {
      W.p = 8, nd(t, e, n, l);
    } finally {
      W.p = u, H.T = s;
    }
  }
  function nd(t, e, n, l) {
    if (ys) {
      var s = ad(l);
      if (s === null)
        Qc(
          t,
          e,
          l,
          ws,
          n
        ), eg(t, l);
      else if (hy(
        s,
        t,
        e,
        n,
        l
      ))
        l.stopPropagation();
      else if (eg(t, l), e & 4 && -1 < fy.indexOf(t)) {
        for (; s !== null; ) {
          var u = Ui(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var h = ui(u.pendingLanes);
                  if (h !== 0) {
                    var b = u;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; h; ) {
                      var j = 1 << 31 - an(h);
                      b.entanglements[1] |= j, h &= ~j;
                    }
                    Ln(u), (Ft & 6) === 0 && (as = pe() + 500, yo(0));
                  }
                }
                break;
              case 31:
              case 13:
                b = mi(u, 2), b !== null && en(b, u, 2), ls(), ed(u, 2);
            }
          if (u = ad(l), u === null && Qc(
            t,
            e,
            l,
            ws,
            n
          ), u === s) break;
          s = u;
        }
        s !== null && l.stopPropagation();
      } else
        Qc(
          t,
          e,
          l,
          null,
          n
        );
    }
  }
  function ad(t) {
    return t = lu(t), id(t);
  }
  var ws = null;
  function id(t) {
    if (ws = null, t = Gi(t), t !== null) {
      var e = f(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (t = m(e), t !== null) return t;
          t = null;
        } else if (n === 31) {
          if (t = p(e), t !== null) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return ws = t, null;
  }
  function tg(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (gn()) {
          case ya:
            return 2;
          case ri:
            return 8;
          case si:
          case sr:
            return 32;
          case ur:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ld = !1, La = null, Qa = null, Ya = null, zo = /* @__PURE__ */ new Map(), Ao = /* @__PURE__ */ new Map(), Va = [], fy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function eg(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        La = null;
        break;
      case "dragenter":
      case "dragleave":
        Qa = null;
        break;
      case "mouseover":
      case "mouseout":
        Ya = null;
        break;
      case "pointerover":
      case "pointerout":
        zo.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ao.delete(e.pointerId);
    }
  }
  function Eo(t, e, n, l, s, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [s]
    }, e !== null && (e = Ui(e), e !== null && Wp(e)), t) : (t.eventSystemFlags |= l, e = t.targetContainers, s !== null && e.indexOf(s) === -1 && e.push(s), t);
  }
  function hy(t, e, n, l, s) {
    switch (e) {
      case "focusin":
        return La = Eo(
          La,
          t,
          e,
          n,
          l,
          s
        ), !0;
      case "dragenter":
        return Qa = Eo(
          Qa,
          t,
          e,
          n,
          l,
          s
        ), !0;
      case "mouseover":
        return Ya = Eo(
          Ya,
          t,
          e,
          n,
          l,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return zo.set(
          u,
          Eo(
            zo.get(u) || null,
            t,
            e,
            n,
            l,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, Ao.set(
          u,
          Eo(
            Ao.get(u) || null,
            t,
            e,
            n,
            l,
            s
          )
        ), !0;
    }
    return !1;
  }
  function ng(t) {
    var e = Gi(t.target);
    if (e !== null) {
      var n = f(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = m(n), e !== null) {
            t.blockedOn = e, gf(t.priority, function() {
              Pp(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = p(n), e !== null) {
            t.blockedOn = e, gf(t.priority, function() {
              Pp(n);
            });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Ss(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = ad(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        iu = l, n.target.dispatchEvent(l), iu = null;
      } else
        return e = Ui(n), e !== null && Wp(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function ag(t, e, n) {
    Ss(t) && n.delete(e);
  }
  function my() {
    ld = !1, La !== null && Ss(La) && (La = null), Qa !== null && Ss(Qa) && (Qa = null), Ya !== null && Ss(Ya) && (Ya = null), zo.forEach(ag), Ao.forEach(ag);
  }
  function Cs(t, e) {
    t.blockedOn === e && (t.blockedOn = null, ld || (ld = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      my
    )));
  }
  var _s = null;
  function ig(t) {
    _s !== t && (_s = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        _s === t && (_s = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], l = t[e + 1], s = t[e + 2];
          if (typeof l != "function") {
            if (id(l || n) === null)
              continue;
            break;
          }
          var u = Ui(n);
          u !== null && (t.splice(e, 3), e -= 3, ac(
            u,
            {
              pending: !0,
              data: s,
              method: n.method,
              action: l
            },
            l,
            s
          ));
        }
      }
    ));
  }
  function wl(t) {
    function e(j) {
      return Cs(j, t);
    }
    La !== null && Cs(La, t), Qa !== null && Cs(Qa, t), Ya !== null && Cs(Ya, t), zo.forEach(e), Ao.forEach(e);
    for (var n = 0; n < Va.length; n++) {
      var l = Va[n];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < Va.length && (n = Va[0], n.blockedOn === null); )
      ng(n), n.blockedOn === null && Va.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var s = n[l], u = n[l + 1], h = s[$e] || null;
        if (typeof u == "function")
          h || ig(n);
        else if (h) {
          var b = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, h = u[$e] || null)
              b = h.formAction;
            else if (id(s) !== null) continue;
          } else b = h.action;
          typeof b == "function" ? n[l + 1] = b : (n.splice(l, 3), l -= 3), ig(n);
        }
      }
  }
  function lg() {
    function t(u) {
      u.canIntercept && u.info === "react-transition" && u.intercept({
        handler: function() {
          return new Promise(function(h) {
            return s = h;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      s !== null && (s(), s = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var u = navigation.currentEntry;
        u && u.url != null && navigation.navigate(u.url, {
          state: u.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, s = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        l = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), s !== null && (s(), s = null);
      };
    }
  }
  function od(t) {
    this._internalRoot = t;
  }
  Ts.prototype.render = od.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var n = e.current, l = dn();
    Fp(n, l, t, e, null, null);
  }, Ts.prototype.unmount = od.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Fp(t.current, 2, null, t, null, null), ls(), e[qi] = null;
    }
  };
  function Ts(t) {
    this._internalRoot = t;
  }
  Ts.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = pf();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Va.length && e !== 0 && e < Va[n].priority; n++) ;
      Va.splice(n, 0, t), n === 0 && ng(t);
    }
  };
  var og = i.version;
  if (og !== "19.2.6")
    throw Error(
      r(
        527,
        og,
        "19.2.6"
      )
    );
  W.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = x(e), t = t !== null ? S(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var py = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: H,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var js = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!js.isDisabled && js.supportsFiber)
      try {
        Hl = js.inject(
          py
        ), nn = js;
      } catch {
      }
  }
  return No.createRoot = function(t, e) {
    if (!c(t)) throw Error(r(299));
    var n = !1, l = "", s = hm, u = mm, h = pm;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (l = e.identifierPrefix), e.onUncaughtError !== void 0 && (s = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (h = e.onRecoverableError)), e = Zp(
      t,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      s,
      u,
      h,
      lg
    ), t[qi] = e.current, Lc(t), new od(e);
  }, No.hydrateRoot = function(t, e, n) {
    if (!c(t)) throw Error(r(299));
    var l = !1, s = "", u = hm, h = mm, b = pm, j = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (b = n.onRecoverableError), n.formState !== void 0 && (j = n.formState)), e = Zp(
      t,
      1,
      !0,
      e,
      n ?? null,
      l,
      s,
      j,
      u,
      h,
      b,
      lg
    ), e.context = $p(null), n = e.current, l = dn(), l = Fs(l), s = Ea(l), s.callback = null, Ra(n, s, l), n = l, e.current.lanes = n, Gl(e, n), Ln(e), t[qi] = e.current, Lc(t), new Ts(e);
  }, No.version = "19.2.6", No;
}
var xg;
function jy() {
  if (xg) return cd.exports;
  xg = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), cd.exports = Ty(), cd.exports;
}
var zy = jy(), Qs = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
  }
  subscribe(a) {
    return this.listeners.add(a), this.onSubscribe(), () => {
      this.listeners.delete(a), this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
}, Ei, $a, Tl, _x, Ay = (_x = class extends Qs {
  constructor() {
    super();
    Lt(this, Ei);
    Lt(this, $a);
    Lt(this, Tl);
    jt(this, Tl, (i) => {
      if (typeof window < "u" && window.addEventListener) {
        const o = () => i();
        return window.addEventListener("visibilitychange", o, !1), () => {
          window.removeEventListener("visibilitychange", o);
        };
      }
    });
  }
  onSubscribe() {
    $(this, $a) || this.setEventListener($(this, Tl));
  }
  onUnsubscribe() {
    var i;
    this.hasListeners() || ((i = $(this, $a)) == null || i.call(this), jt(this, $a, void 0));
  }
  setEventListener(i) {
    var o;
    jt(this, Tl, i), (o = $(this, $a)) == null || o.call(this), jt(this, $a, i((r) => {
      typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
    }));
  }
  setFocused(i) {
    $(this, Ei) !== i && (jt(this, Ei, i), this.onFocus());
  }
  onFocus() {
    const i = this.isFocused();
    this.listeners.forEach((o) => {
      o(i);
    });
  }
  isFocused() {
    var i;
    return typeof $(this, Ei) == "boolean" ? $(this, Ei) : ((i = globalThis.document) == null ? void 0 : i.visibilityState) !== "hidden";
  }
}, Ei = new WeakMap(), $a = new WeakMap(), Tl = new WeakMap(), _x), Bx = new Ay(), Ey = {
  // We need the wrapper function syntax below instead of direct references to
  // global setTimeout etc.
  //
  // BAD: `setTimeout: setTimeout`
  // GOOD: `setTimeout: (cb, delay) => setTimeout(cb, delay)`
  //
  // If we use direct references here, then anything that wants to spy on or
  // replace the global setTimeout (like tests) won't work since we'll already
  // have a hard reference to the original implementation at the time when this
  // file was imported.
  setTimeout: (a, i) => setTimeout(a, i),
  clearTimeout: (a) => clearTimeout(a),
  setInterval: (a, i) => setInterval(a, i),
  clearInterval: (a) => clearInterval(a)
}, Fa, qd, Tx, Ry = (Tx = class {
  constructor() {
    // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
    // type at app boot; and if we leave that type, then any new timer provider
    // would need to support the default provider's concrete timer ID, which is
    // infeasible across environments.
    //
    // We settle for type safety for the TimeoutProvider type, and accept that
    // this class is unsafe internally to allow for extension.
    Lt(this, Fa, Ey);
    Lt(this, qd, !1);
  }
  setTimeoutProvider(a) {
    jt(this, Fa, a);
  }
  setTimeout(a, i) {
    return $(this, Fa).setTimeout(a, i);
  }
  clearTimeout(a) {
    $(this, Fa).clearTimeout(a);
  }
  setInterval(a, i) {
    return $(this, Fa).setInterval(a, i);
  }
  clearInterval(a) {
    $(this, Fa).clearInterval(a);
  }
}, Fa = new WeakMap(), qd = new WeakMap(), Tx), yd = new Ry();
function Ny(a) {
  setTimeout(a, 0);
}
var My = typeof window > "u" || "Deno" in globalThis;
function On() {
}
function Dy(a, i) {
  return typeof a == "function" ? a(i) : a;
}
function Oy(a) {
  return typeof a == "number" && a >= 0 && a !== 1 / 0;
}
function By(a, i) {
  return Math.max(a + (i || 0) - Date.now(), 0);
}
function wd(a, i) {
  return typeof a == "function" ? a(i) : a;
}
function ky(a, i) {
  return typeof a == "function" ? a(i) : a;
}
function bg(a, i) {
  const {
    type: o = "all",
    exact: r,
    fetchStatus: c,
    predicate: f,
    queryKey: m,
    stale: p
  } = a;
  if (m) {
    if (r) {
      if (i.queryHash !== Ud(m, i.options))
        return !1;
    } else if (!Lo(i.queryKey, m))
      return !1;
  }
  if (o !== "all") {
    const g = i.isActive();
    if (o === "active" && !g || o === "inactive" && g)
      return !1;
  }
  return !(typeof p == "boolean" && i.isStale() !== p || c && c !== i.state.fetchStatus || f && !f(i));
}
function vg(a, i) {
  const { exact: o, status: r, predicate: c, mutationKey: f } = a;
  if (f) {
    if (!i.options.mutationKey)
      return !1;
    if (o) {
      if (Uo(i.options.mutationKey) !== Uo(f))
        return !1;
    } else if (!Lo(i.options.mutationKey, f))
      return !1;
  }
  return !(r && i.state.status !== r || c && !c(i));
}
function Ud(a, i) {
  return ((i == null ? void 0 : i.queryKeyHashFn) || Uo)(a);
}
function Uo(a) {
  return JSON.stringify(
    a,
    (i, o) => Sd(o) ? Object.keys(o).sort().reduce((r, c) => (r[c] = o[c], r), {}) : o
  );
}
function Lo(a, i) {
  return a === i ? !0 : typeof a != typeof i ? !1 : a && i && typeof a == "object" && typeof i == "object" ? Object.keys(i).every((o) => Lo(a[o], i[o])) : !1;
}
var Hy = Object.prototype.hasOwnProperty;
function kx(a, i, o = 0) {
  if (a === i)
    return a;
  if (o > 500) return i;
  const r = yg(a) && yg(i);
  if (!r && !(Sd(a) && Sd(i))) return i;
  const f = (r ? a : Object.keys(a)).length, m = r ? i : Object.keys(i), p = m.length, g = r ? new Array(p) : {};
  let x = 0;
  for (let S = 0; S < p; S++) {
    const w = r ? S : m[S], C = a[w], A = i[w];
    if (C === A) {
      g[w] = C, (r ? S < f : Hy.call(a, w)) && x++;
      continue;
    }
    if (C === null || A === null || typeof C != "object" || typeof A != "object") {
      g[w] = A;
      continue;
    }
    const N = kx(C, A, o + 1);
    g[w] = N, N === C && x++;
  }
  return f === p && x === f ? a : g;
}
function yg(a) {
  return Array.isArray(a) && a.length === Object.keys(a).length;
}
function Sd(a) {
  if (!wg(a))
    return !1;
  const i = a.constructor;
  if (i === void 0)
    return !0;
  const o = i.prototype;
  return !(!wg(o) || !o.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(a) !== Object.prototype);
}
function wg(a) {
  return Object.prototype.toString.call(a) === "[object Object]";
}
function qy(a) {
  return new Promise((i) => {
    yd.setTimeout(i, a);
  });
}
function Gy(a, i, o) {
  return typeof o.structuralSharing == "function" ? o.structuralSharing(a, i) : o.structuralSharing !== !1 ? kx(a, i) : i;
}
function Uy(a, i, o = 0) {
  const r = [...a, i];
  return o && r.length > o ? r.slice(1) : r;
}
function Ly(a, i, o = 0) {
  const r = [i, ...a];
  return o && r.length > o ? r.slice(0, -1) : r;
}
var Ld = /* @__PURE__ */ Symbol();
function Hx(a, i) {
  return !a.queryFn && (i != null && i.initialPromise) ? () => i.initialPromise : !a.queryFn || a.queryFn === Ld ? () => Promise.reject(new Error(`Missing queryFn: '${a.queryHash}'`)) : a.queryFn;
}
function Qy(a, i, o) {
  let r = !1, c;
  return Object.defineProperty(a, "signal", {
    enumerable: !0,
    get: () => (c ?? (c = i()), r || (r = !0, c.aborted ? o() : c.addEventListener("abort", o, { once: !0 })), c)
  }), a;
}
var qx = /* @__PURE__ */ (() => {
  let a = () => My;
  return {
    /**
     * Returns whether the current runtime should be treated as a server environment.
     */
    isServer() {
      return a();
    },
    /**
     * Overrides the server check globally.
     */
    setIsServer(i) {
      a = i;
    }
  };
})();
function Yy() {
  let a, i;
  const o = new Promise((c, f) => {
    a = c, i = f;
  });
  o.status = "pending", o.catch(() => {
  });
  function r(c) {
    Object.assign(o, c), delete o.resolve, delete o.reject;
  }
  return o.resolve = (c) => {
    r({
      status: "fulfilled",
      value: c
    }), a(c);
  }, o.reject = (c) => {
    r({
      status: "rejected",
      reason: c
    }), i(c);
  }, o;
}
var Vy = Ny;
function Xy() {
  let a = [], i = 0, o = (p) => {
    p();
  }, r = (p) => {
    p();
  }, c = Vy;
  const f = (p) => {
    i ? a.push(p) : c(() => {
      o(p);
    });
  }, m = () => {
    const p = a;
    a = [], p.length && c(() => {
      r(() => {
        p.forEach((g) => {
          o(g);
        });
      });
    });
  };
  return {
    batch: (p) => {
      let g;
      i++;
      try {
        g = p();
      } finally {
        i--, i || m();
      }
      return g;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (p) => (...g) => {
      f(() => {
        p(...g);
      });
    },
    schedule: f,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (p) => {
      o = p;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (p) => {
      r = p;
    },
    setScheduler: (p) => {
      c = p;
    }
  };
}
var Ie = Xy(), jl, Ja, zl, jx, Ky = (jx = class extends Qs {
  constructor() {
    super();
    Lt(this, jl, !0);
    Lt(this, Ja);
    Lt(this, zl);
    jt(this, zl, (i) => {
      if (typeof window < "u" && window.addEventListener) {
        const o = () => i(!0), r = () => i(!1);
        return window.addEventListener("online", o, !1), window.addEventListener("offline", r, !1), () => {
          window.removeEventListener("online", o), window.removeEventListener("offline", r);
        };
      }
    });
  }
  onSubscribe() {
    $(this, Ja) || this.setEventListener($(this, zl));
  }
  onUnsubscribe() {
    var i;
    this.hasListeners() || ((i = $(this, Ja)) == null || i.call(this), jt(this, Ja, void 0));
  }
  setEventListener(i) {
    var o;
    jt(this, zl, i), (o = $(this, Ja)) == null || o.call(this), jt(this, Ja, i(this.setOnline.bind(this)));
  }
  setOnline(i) {
    $(this, jl) !== i && (jt(this, jl, i), this.listeners.forEach((r) => {
      r(i);
    }));
  }
  isOnline() {
    return $(this, jl);
  }
}, jl = new WeakMap(), Ja = new WeakMap(), zl = new WeakMap(), jx), Bs = new Ky();
function Iy(a) {
  return Math.min(1e3 * 2 ** a, 3e4);
}
function Gx(a) {
  return (a ?? "online") === "online" ? Bs.isOnline() : !0;
}
var Cd = class extends Error {
  constructor(a) {
    super("CancelledError"), this.revert = a == null ? void 0 : a.revert, this.silent = a == null ? void 0 : a.silent;
  }
};
function Ux(a) {
  let i = !1, o = 0, r;
  const c = Yy(), f = () => c.status !== "pending", m = (B) => {
    var z;
    if (!f()) {
      const _ = new Cd(B);
      C(_), (z = a.onCancel) == null || z.call(a, _);
    }
  }, p = () => {
    i = !0;
  }, g = () => {
    i = !1;
  }, x = () => Bx.isFocused() && (a.networkMode === "always" || Bs.isOnline()) && a.canRun(), S = () => Gx(a.networkMode) && a.canRun(), w = (B) => {
    f() || (r == null || r(), c.resolve(B));
  }, C = (B) => {
    f() || (r == null || r(), c.reject(B));
  }, A = () => new Promise((B) => {
    var z;
    r = (_) => {
      (f() || x()) && B(_);
    }, (z = a.onPause) == null || z.call(a);
  }).then(() => {
    var B;
    r = void 0, f() || (B = a.onContinue) == null || B.call(a);
  }), N = () => {
    if (f())
      return;
    let B;
    const z = o === 0 ? a.initialPromise : void 0;
    try {
      B = z ?? a.fn();
    } catch (_) {
      B = Promise.reject(_);
    }
    Promise.resolve(B).then(w).catch((_) => {
      var D;
      if (f())
        return;
      const R = a.retry ?? (qx.isServer() ? 0 : 3), L = a.retryDelay ?? Iy, q = typeof L == "function" ? L(o, _) : L, y = R === !0 || typeof R == "number" && o < R || typeof R == "function" && R(o, _);
      if (i || !y) {
        C(_);
        return;
      }
      o++, (D = a.onFail) == null || D.call(a, o, _), qy(q).then(() => x() ? void 0 : A()).then(() => {
        i ? C(_) : N();
      });
    });
  };
  return {
    promise: c,
    status: () => c.status,
    cancel: m,
    continue: () => (r == null || r(), c),
    cancelRetry: p,
    continueRetry: g,
    canStart: S,
    start: () => (S() ? N() : A().then(N), c)
  };
}
var Ri, zx, Lx = (zx = class {
  constructor() {
    Lt(this, Ri);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), Oy(this.gcTime) && jt(this, Ri, yd.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(a) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      a ?? (qx.isServer() ? 1 / 0 : 300 * 1e3)
    );
  }
  clearGcTimeout() {
    $(this, Ri) !== void 0 && (yd.clearTimeout($(this, Ri)), jt(this, Ri, void 0));
  }
}, Ri = new WeakMap(), zx);
function Zy(a) {
  return {
    onFetch: (i, o) => {
      var S, w, C, A, N;
      const r = i.options, c = (C = (w = (S = i.fetchOptions) == null ? void 0 : S.meta) == null ? void 0 : w.fetchMore) == null ? void 0 : C.direction, f = ((A = i.state.data) == null ? void 0 : A.pages) || [], m = ((N = i.state.data) == null ? void 0 : N.pageParams) || [];
      let p = { pages: [], pageParams: [] }, g = 0;
      const x = async () => {
        let B = !1;
        const z = (L) => {
          Qy(
            L,
            () => i.signal,
            () => B = !0
          );
        }, _ = Hx(i.options, i.fetchOptions), R = async (L, q, y) => {
          if (B)
            return Promise.reject(i.signal.reason);
          if (q == null && L.pages.length)
            return Promise.resolve(L);
          const v = (() => {
            const tt = {
              client: i.client,
              queryKey: i.queryKey,
              pageParam: q,
              direction: y ? "backward" : "forward",
              meta: i.options.meta
            };
            return z(tt), tt;
          })(), M = await _(v), { maxPages: k } = i.options, K = y ? Ly : Uy;
          return {
            pages: K(L.pages, M, k),
            pageParams: K(L.pageParams, q, k)
          };
        };
        if (c && f.length) {
          const L = c === "backward", q = L ? $y : Sg, y = {
            pages: f,
            pageParams: m
          }, D = q(r, y);
          p = await R(y, D, L);
        } else {
          const L = a ?? f.length;
          do {
            const q = g === 0 ? m[0] ?? r.initialPageParam : Sg(r, p);
            if (g > 0 && q == null)
              break;
            p = await R(p, q), g++;
          } while (g < L);
        }
        return p;
      };
      i.options.persister ? i.fetchFn = () => {
        var B, z;
        return (z = (B = i.options).persister) == null ? void 0 : z.call(
          B,
          x,
          {
            client: i.client,
            queryKey: i.queryKey,
            meta: i.options.meta,
            signal: i.signal
          },
          o
        );
      } : i.fetchFn = x;
    }
  };
}
function Sg(a, { pages: i, pageParams: o }) {
  const r = i.length - 1;
  return i.length > 0 ? a.getNextPageParam(
    i[r],
    i,
    o[r],
    o
  ) : void 0;
}
function $y(a, { pages: i, pageParams: o }) {
  var r;
  return i.length > 0 ? (r = a.getPreviousPageParam) == null ? void 0 : r.call(a, i[0], i, o[0], o) : void 0;
}
var Al, Ni, El, An, Mi, Be, tr, Di, fn, Qx, ma, Ax, Fy = (Ax = class extends Lx {
  constructor(i) {
    super();
    Lt(this, fn);
    Lt(this, Al);
    Lt(this, Ni);
    Lt(this, El);
    Lt(this, An);
    Lt(this, Mi);
    Lt(this, Be);
    Lt(this, tr);
    Lt(this, Di);
    jt(this, Di, !1), jt(this, tr, i.defaultOptions), this.setOptions(i.options), this.observers = [], jt(this, Mi, i.client), jt(this, An, $(this, Mi).getQueryCache()), this.queryKey = i.queryKey, this.queryHash = i.queryHash, jt(this, Ni, _g(this.options)), this.state = i.state ?? $(this, Ni), this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get queryType() {
    return $(this, Al);
  }
  get promise() {
    var i;
    return (i = $(this, Be)) == null ? void 0 : i.promise;
  }
  setOptions(i) {
    if (this.options = { ...$(this, tr), ...i }, i != null && i._type && jt(this, Al, i._type), this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
      const o = _g(this.options);
      o.data !== void 0 && (this.setState(
        Cg(o.data, o.dataUpdatedAt)
      ), jt(this, Ni, o));
    }
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && $(this, An).remove(this);
  }
  setData(i, o) {
    const r = Gy(this.state.data, i, this.options);
    return Le(this, fn, ma).call(this, {
      data: r,
      type: "success",
      dataUpdatedAt: o == null ? void 0 : o.updatedAt,
      manual: o == null ? void 0 : o.manual
    }), r;
  }
  setState(i) {
    Le(this, fn, ma).call(this, { type: "setState", state: i });
  }
  cancel(i) {
    var r, c;
    const o = (r = $(this, Be)) == null ? void 0 : r.promise;
    return (c = $(this, Be)) == null || c.cancel(i), o ? o.then(On).catch(On) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  get resetState() {
    return $(this, Ni);
  }
  reset() {
    this.destroy(), this.setState(this.resetState);
  }
  isActive() {
    return this.observers.some(
      (i) => ky(i.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Ld || !this.isFetched();
  }
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (i) => wd(i.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (i) => i.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(i = 0) {
    return this.state.data === void 0 ? !0 : i === "static" ? !1 : this.state.isInvalidated ? !0 : !By(this.state.dataUpdatedAt, i);
  }
  onFocus() {
    var o;
    const i = this.observers.find((r) => r.shouldFetchOnWindowFocus());
    i == null || i.refetch({ cancelRefetch: !1 }), (o = $(this, Be)) == null || o.continue();
  }
  onOnline() {
    var o;
    const i = this.observers.find((r) => r.shouldFetchOnReconnect());
    i == null || i.refetch({ cancelRefetch: !1 }), (o = $(this, Be)) == null || o.continue();
  }
  addObserver(i) {
    this.observers.includes(i) || (this.observers.push(i), this.clearGcTimeout(), $(this, An).notify({ type: "observerAdded", query: this, observer: i }));
  }
  removeObserver(i) {
    this.observers.includes(i) && (this.observers = this.observers.filter((o) => o !== i), this.observers.length || ($(this, Be) && ($(this, Di) || Le(this, fn, Qx).call(this) ? $(this, Be).cancel({ revert: !0 }) : $(this, Be).cancelRetry()), this.scheduleGc()), $(this, An).notify({ type: "observerRemoved", query: this, observer: i }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || Le(this, fn, ma).call(this, { type: "invalidate" });
  }
  async fetch(i, o) {
    var x, S, w, C, A, N, B, z, _, R, L;
    if (this.state.fetchStatus !== "idle" && // If the promise in the retryer is already rejected, we have to definitely
    // re-start the fetch; there is a chance that the query is still in a
    // pending state when that happens
    ((x = $(this, Be)) == null ? void 0 : x.status()) !== "rejected") {
      if (this.state.data !== void 0 && (o != null && o.cancelRefetch))
        this.cancel({ silent: !0 });
      else if ($(this, Be))
        return $(this, Be).continueRetry(), $(this, Be).promise;
    }
    if (i && this.setOptions(i), !this.options.queryFn) {
      const q = this.observers.find((y) => y.options.queryFn);
      q && this.setOptions(q.options);
    }
    const r = new AbortController(), c = (q) => {
      Object.defineProperty(q, "signal", {
        enumerable: !0,
        get: () => (jt(this, Di, !0), r.signal)
      });
    }, f = () => {
      const q = Hx(this.options, o), D = (() => {
        const v = {
          client: $(this, Mi),
          queryKey: this.queryKey,
          meta: this.meta
        };
        return c(v), v;
      })();
      return jt(this, Di, !1), this.options.persister ? this.options.persister(
        q,
        D,
        this
      ) : q(D);
    }, p = (() => {
      const q = {
        fetchOptions: o,
        options: this.options,
        queryKey: this.queryKey,
        client: $(this, Mi),
        state: this.state,
        fetchFn: f
      };
      return c(q), q;
    })(), g = $(this, Al) === "infinite" ? Zy(
      this.options.pages
    ) : this.options.behavior;
    g == null || g.onFetch(p, this), jt(this, El, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((S = p.fetchOptions) == null ? void 0 : S.meta)) && Le(this, fn, ma).call(this, { type: "fetch", meta: (w = p.fetchOptions) == null ? void 0 : w.meta }), jt(this, Be, Ux({
      initialPromise: o == null ? void 0 : o.initialPromise,
      fn: p.fetchFn,
      onCancel: (q) => {
        q instanceof Cd && q.revert && this.setState({
          ...$(this, El),
          fetchStatus: "idle"
        }), r.abort();
      },
      onFail: (q, y) => {
        Le(this, fn, ma).call(this, { type: "failed", failureCount: q, error: y });
      },
      onPause: () => {
        Le(this, fn, ma).call(this, { type: "pause" });
      },
      onContinue: () => {
        Le(this, fn, ma).call(this, { type: "continue" });
      },
      retry: p.options.retry,
      retryDelay: p.options.retryDelay,
      networkMode: p.options.networkMode,
      canRun: () => !0
    }));
    try {
      const q = await $(this, Be).start();
      if (q === void 0)
        throw new Error(`${this.queryHash} data is undefined`);
      return this.setData(q), (A = (C = $(this, An).config).onSuccess) == null || A.call(C, q, this), (B = (N = $(this, An).config).onSettled) == null || B.call(
        N,
        q,
        this.state.error,
        this
      ), q;
    } catch (q) {
      if (q instanceof Cd) {
        if (q.silent)
          return $(this, Be).promise;
        if (q.revert) {
          if (this.state.data === void 0)
            throw q;
          return this.state.data;
        }
      }
      throw Le(this, fn, ma).call(this, {
        type: "error",
        error: q
      }), (_ = (z = $(this, An).config).onError) == null || _.call(
        z,
        q,
        this
      ), (L = (R = $(this, An).config).onSettled) == null || L.call(
        R,
        this.state.data,
        q,
        this
      ), q;
    } finally {
      this.scheduleGc();
    }
  }
}, Al = new WeakMap(), Ni = new WeakMap(), El = new WeakMap(), An = new WeakMap(), Mi = new WeakMap(), Be = new WeakMap(), tr = new WeakMap(), Di = new WeakMap(), fn = new WeakSet(), Qx = function() {
  return this.state.fetchStatus === "paused" && this.state.status === "pending";
}, ma = function(i) {
  const o = (r) => {
    switch (i.type) {
      case "failed":
        return {
          ...r,
          fetchFailureCount: i.failureCount,
          fetchFailureReason: i.error
        };
      case "pause":
        return {
          ...r,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...r,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...r,
          ...Jy(r.data, this.options),
          fetchMeta: i.meta ?? null
        };
      case "success":
        const c = {
          ...r,
          ...Cg(i.data, i.dataUpdatedAt),
          dataUpdateCount: r.dataUpdateCount + 1,
          ...!i.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
        return jt(this, El, i.manual ? c : void 0), c;
      case "error":
        const f = i.error;
        return {
          ...r,
          error: f,
          errorUpdateCount: r.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: r.fetchFailureCount + 1,
          fetchFailureReason: f,
          fetchStatus: "idle",
          status: "error",
          // flag existing data as invalidated if we get a background error
          // note that "no data" always means stale so we can set unconditionally here
          isInvalidated: !0
        };
      case "invalidate":
        return {
          ...r,
          isInvalidated: !0
        };
      case "setState":
        return {
          ...r,
          ...i.state
        };
    }
  };
  this.state = o(this.state), Ie.batch(() => {
    this.observers.forEach((r) => {
      r.onQueryUpdate();
    }), $(this, An).notify({ query: this, type: "updated", action: i });
  });
}, Ax);
function Jy(a, i) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Gx(i.networkMode) ? "fetching" : "paused",
    ...a === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function Cg(a, i) {
  return {
    data: a,
    dataUpdatedAt: i ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  };
}
function _g(a) {
  const i = typeof a.initialData == "function" ? a.initialData() : a.initialData, o = i !== void 0, r = o ? typeof a.initialDataUpdatedAt == "function" ? a.initialDataUpdatedAt() : a.initialDataUpdatedAt : 0;
  return {
    data: i,
    dataUpdateCount: 0,
    dataUpdatedAt: o ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: o ? "success" : "pending",
    fetchStatus: "idle"
  };
}
var er, Yn, Ye, Oi, Vn, Za, Ex, Wy = (Ex = class extends Lx {
  constructor(i) {
    super();
    Lt(this, Vn);
    Lt(this, er);
    Lt(this, Yn);
    Lt(this, Ye);
    Lt(this, Oi);
    jt(this, er, i.client), this.mutationId = i.mutationId, jt(this, Ye, i.mutationCache), jt(this, Yn, []), this.state = i.state || Py(), this.setOptions(i.options), this.scheduleGc();
  }
  setOptions(i) {
    this.options = i, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(i) {
    $(this, Yn).includes(i) || ($(this, Yn).push(i), this.clearGcTimeout(), $(this, Ye).notify({
      type: "observerAdded",
      mutation: this,
      observer: i
    }));
  }
  removeObserver(i) {
    jt(this, Yn, $(this, Yn).filter((o) => o !== i)), this.scheduleGc(), $(this, Ye).notify({
      type: "observerRemoved",
      mutation: this,
      observer: i
    });
  }
  optionalRemove() {
    $(this, Yn).length || (this.state.status === "pending" ? this.scheduleGc() : $(this, Ye).remove(this));
  }
  continue() {
    var i;
    return ((i = $(this, Oi)) == null ? void 0 : i.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(i) {
    var m, p, g, x, S, w, C, A, N, B, z, _, R, L, q, y, D, v;
    const o = () => {
      Le(this, Vn, Za).call(this, { type: "continue" });
    }, r = {
      client: $(this, er),
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    jt(this, Oi, Ux({
      fn: () => this.options.mutationFn ? this.options.mutationFn(i, r) : Promise.reject(new Error("No mutationFn found")),
      onFail: (M, k) => {
        Le(this, Vn, Za).call(this, { type: "failed", failureCount: M, error: k });
      },
      onPause: () => {
        Le(this, Vn, Za).call(this, { type: "pause" });
      },
      onContinue: o,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => $(this, Ye).canRun(this)
    }));
    const c = this.state.status === "pending", f = !$(this, Oi).canStart();
    try {
      if (c)
        o();
      else {
        Le(this, Vn, Za).call(this, { type: "pending", variables: i, isPaused: f }), $(this, Ye).config.onMutate && await $(this, Ye).config.onMutate(
          i,
          this,
          r
        );
        const k = await ((p = (m = this.options).onMutate) == null ? void 0 : p.call(
          m,
          i,
          r
        ));
        k !== this.state.context && Le(this, Vn, Za).call(this, {
          type: "pending",
          context: k,
          variables: i,
          isPaused: f
        });
      }
      const M = await $(this, Oi).start();
      return await ((x = (g = $(this, Ye).config).onSuccess) == null ? void 0 : x.call(
        g,
        M,
        i,
        this.state.context,
        this,
        r
      )), await ((w = (S = this.options).onSuccess) == null ? void 0 : w.call(
        S,
        M,
        i,
        this.state.context,
        r
      )), await ((A = (C = $(this, Ye).config).onSettled) == null ? void 0 : A.call(
        C,
        M,
        null,
        this.state.variables,
        this.state.context,
        this,
        r
      )), await ((B = (N = this.options).onSettled) == null ? void 0 : B.call(
        N,
        M,
        null,
        i,
        this.state.context,
        r
      )), Le(this, Vn, Za).call(this, { type: "success", data: M }), M;
    } catch (M) {
      try {
        await ((_ = (z = $(this, Ye).config).onError) == null ? void 0 : _.call(
          z,
          M,
          i,
          this.state.context,
          this,
          r
        ));
      } catch (k) {
        Promise.reject(k);
      }
      try {
        await ((L = (R = this.options).onError) == null ? void 0 : L.call(
          R,
          M,
          i,
          this.state.context,
          r
        ));
      } catch (k) {
        Promise.reject(k);
      }
      try {
        await ((y = (q = $(this, Ye).config).onSettled) == null ? void 0 : y.call(
          q,
          void 0,
          M,
          this.state.variables,
          this.state.context,
          this,
          r
        ));
      } catch (k) {
        Promise.reject(k);
      }
      try {
        await ((v = (D = this.options).onSettled) == null ? void 0 : v.call(
          D,
          void 0,
          M,
          i,
          this.state.context,
          r
        ));
      } catch (k) {
        Promise.reject(k);
      }
      throw Le(this, Vn, Za).call(this, { type: "error", error: M }), M;
    } finally {
      $(this, Ye).runNext(this);
    }
  }
}, er = new WeakMap(), Yn = new WeakMap(), Ye = new WeakMap(), Oi = new WeakMap(), Vn = new WeakSet(), Za = function(i) {
  const o = (r) => {
    switch (i.type) {
      case "failed":
        return {
          ...r,
          failureCount: i.failureCount,
          failureReason: i.error
        };
      case "pause":
        return {
          ...r,
          isPaused: !0
        };
      case "continue":
        return {
          ...r,
          isPaused: !1
        };
      case "pending":
        return {
          ...r,
          context: i.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: i.isPaused,
          status: "pending",
          variables: i.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...r,
          data: i.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: !1
        };
      case "error":
        return {
          ...r,
          data: void 0,
          error: i.error,
          failureCount: r.failureCount + 1,
          failureReason: i.error,
          isPaused: !1,
          status: "error"
        };
    }
  };
  this.state = o(this.state), Ie.batch(() => {
    $(this, Yn).forEach((r) => {
      r.onMutationUpdate(i);
    }), $(this, Ye).notify({
      mutation: this,
      type: "updated",
      action: i
    });
  });
}, Ex);
function Py() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}
var ga, Bn, nr, Rx, t1 = (Rx = class extends Qs {
  constructor(i = {}) {
    super();
    Lt(this, ga);
    Lt(this, Bn);
    Lt(this, nr);
    this.config = i, jt(this, ga, /* @__PURE__ */ new Set()), jt(this, Bn, /* @__PURE__ */ new Map()), jt(this, nr, 0);
  }
  build(i, o, r) {
    const c = new Wy({
      client: i,
      mutationCache: this,
      mutationId: ++zs(this, nr)._,
      options: i.defaultMutationOptions(o),
      state: r
    });
    return this.add(c), c;
  }
  add(i) {
    $(this, ga).add(i);
    const o = As(i);
    if (typeof o == "string") {
      const r = $(this, Bn).get(o);
      r ? r.push(i) : $(this, Bn).set(o, [i]);
    }
    this.notify({ type: "added", mutation: i });
  }
  remove(i) {
    if ($(this, ga).delete(i)) {
      const o = As(i);
      if (typeof o == "string") {
        const r = $(this, Bn).get(o);
        if (r)
          if (r.length > 1) {
            const c = r.indexOf(i);
            c !== -1 && r.splice(c, 1);
          } else r[0] === i && $(this, Bn).delete(o);
      }
    }
    this.notify({ type: "removed", mutation: i });
  }
  canRun(i) {
    const o = As(i);
    if (typeof o == "string") {
      const r = $(this, Bn).get(o), c = r == null ? void 0 : r.find(
        (f) => f.state.status === "pending"
      );
      return !c || c === i;
    } else
      return !0;
  }
  runNext(i) {
    var r;
    const o = As(i);
    if (typeof o == "string") {
      const c = (r = $(this, Bn).get(o)) == null ? void 0 : r.find((f) => f !== i && f.state.isPaused);
      return (c == null ? void 0 : c.continue()) ?? Promise.resolve();
    } else
      return Promise.resolve();
  }
  clear() {
    Ie.batch(() => {
      $(this, ga).forEach((i) => {
        this.notify({ type: "removed", mutation: i });
      }), $(this, ga).clear(), $(this, Bn).clear();
    });
  }
  getAll() {
    return Array.from($(this, ga));
  }
  find(i) {
    const o = { exact: !0, ...i };
    return this.getAll().find(
      (r) => vg(o, r)
    );
  }
  findAll(i = {}) {
    return this.getAll().filter((o) => vg(i, o));
  }
  notify(i) {
    Ie.batch(() => {
      this.listeners.forEach((o) => {
        o(i);
      });
    });
  }
  resumePausedMutations() {
    const i = this.getAll().filter((o) => o.state.isPaused);
    return Ie.batch(
      () => Promise.all(
        i.map((o) => o.continue().catch(On))
      )
    );
  }
}, ga = new WeakMap(), Bn = new WeakMap(), nr = new WeakMap(), Rx);
function As(a) {
  var i;
  return (i = a.options.scope) == null ? void 0 : i.id;
}
var Xn, Nx, e1 = (Nx = class extends Qs {
  constructor(i = {}) {
    super();
    Lt(this, Xn);
    this.config = i, jt(this, Xn, /* @__PURE__ */ new Map());
  }
  build(i, o, r) {
    const c = o.queryKey, f = o.queryHash ?? Ud(c, o);
    let m = this.get(f);
    return m || (m = new Fy({
      client: i,
      queryKey: c,
      queryHash: f,
      options: i.defaultQueryOptions(o),
      state: r,
      defaultOptions: i.getQueryDefaults(c)
    }), this.add(m)), m;
  }
  add(i) {
    $(this, Xn).has(i.queryHash) || ($(this, Xn).set(i.queryHash, i), this.notify({
      type: "added",
      query: i
    }));
  }
  remove(i) {
    const o = $(this, Xn).get(i.queryHash);
    o && (i.destroy(), o === i && $(this, Xn).delete(i.queryHash), this.notify({ type: "removed", query: i }));
  }
  clear() {
    Ie.batch(() => {
      this.getAll().forEach((i) => {
        this.remove(i);
      });
    });
  }
  get(i) {
    return $(this, Xn).get(i);
  }
  getAll() {
    return [...$(this, Xn).values()];
  }
  find(i) {
    const o = { exact: !0, ...i };
    return this.getAll().find(
      (r) => bg(o, r)
    );
  }
  findAll(i = {}) {
    const o = this.getAll();
    return Object.keys(i).length > 0 ? o.filter((r) => bg(i, r)) : o;
  }
  notify(i) {
    Ie.batch(() => {
      this.listeners.forEach((o) => {
        o(i);
      });
    });
  }
  onFocus() {
    Ie.batch(() => {
      this.getAll().forEach((i) => {
        i.onFocus();
      });
    });
  }
  onOnline() {
    Ie.batch(() => {
      this.getAll().forEach((i) => {
        i.onOnline();
      });
    });
  }
}, Xn = new WeakMap(), Nx), ye, Wa, Pa, Rl, Nl, ti, Ml, Dl, Mx, n1 = (Mx = class {
  constructor(a = {}) {
    Lt(this, ye);
    Lt(this, Wa);
    Lt(this, Pa);
    Lt(this, Rl);
    Lt(this, Nl);
    Lt(this, ti);
    Lt(this, Ml);
    Lt(this, Dl);
    jt(this, ye, a.queryCache || new e1()), jt(this, Wa, a.mutationCache || new t1()), jt(this, Pa, a.defaultOptions || {}), jt(this, Rl, /* @__PURE__ */ new Map()), jt(this, Nl, /* @__PURE__ */ new Map()), jt(this, ti, 0);
  }
  mount() {
    zs(this, ti)._++, $(this, ti) === 1 && (jt(this, Ml, Bx.subscribe(async (a) => {
      a && (await this.resumePausedMutations(), $(this, ye).onFocus());
    })), jt(this, Dl, Bs.subscribe(async (a) => {
      a && (await this.resumePausedMutations(), $(this, ye).onOnline());
    })));
  }
  unmount() {
    var a, i;
    zs(this, ti)._--, $(this, ti) === 0 && ((a = $(this, Ml)) == null || a.call(this), jt(this, Ml, void 0), (i = $(this, Dl)) == null || i.call(this), jt(this, Dl, void 0));
  }
  isFetching(a) {
    return $(this, ye).findAll({ ...a, fetchStatus: "fetching" }).length;
  }
  isMutating(a) {
    return $(this, Wa).findAll({ ...a, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(a) {
    var o;
    const i = this.defaultQueryOptions({ queryKey: a });
    return (o = $(this, ye).get(i.queryHash)) == null ? void 0 : o.state.data;
  }
  ensureQueryData(a) {
    const i = this.defaultQueryOptions(a), o = $(this, ye).build(this, i), r = o.state.data;
    return r === void 0 ? this.fetchQuery(a) : (a.revalidateIfStale && o.isStaleByTime(wd(i.staleTime, o)) && this.prefetchQuery(i), Promise.resolve(r));
  }
  getQueriesData(a) {
    return $(this, ye).findAll(a).map(({ queryKey: i, state: o }) => {
      const r = o.data;
      return [i, r];
    });
  }
  setQueryData(a, i, o) {
    const r = this.defaultQueryOptions({ queryKey: a }), c = $(this, ye).get(
      r.queryHash
    ), f = c == null ? void 0 : c.state.data, m = Dy(i, f);
    if (m !== void 0)
      return $(this, ye).build(this, r).setData(m, { ...o, manual: !0 });
  }
  setQueriesData(a, i, o) {
    return Ie.batch(
      () => $(this, ye).findAll(a).map(({ queryKey: r }) => [
        r,
        this.setQueryData(r, i, o)
      ])
    );
  }
  getQueryState(a) {
    var o;
    const i = this.defaultQueryOptions({ queryKey: a });
    return (o = $(this, ye).get(
      i.queryHash
    )) == null ? void 0 : o.state;
  }
  removeQueries(a) {
    const i = $(this, ye);
    Ie.batch(() => {
      i.findAll(a).forEach((o) => {
        i.remove(o);
      });
    });
  }
  resetQueries(a, i) {
    const o = $(this, ye);
    return Ie.batch(() => (o.findAll(a).forEach((r) => {
      r.reset();
    }), this.refetchQueries(
      {
        type: "active",
        ...a
      },
      i
    )));
  }
  cancelQueries(a, i = {}) {
    const o = { revert: !0, ...i }, r = Ie.batch(
      () => $(this, ye).findAll(a).map((c) => c.cancel(o))
    );
    return Promise.all(r).then(On).catch(On);
  }
  invalidateQueries(a, i = {}) {
    return Ie.batch(() => ($(this, ye).findAll(a).forEach((o) => {
      o.invalidate();
    }), (a == null ? void 0 : a.refetchType) === "none" ? Promise.resolve() : this.refetchQueries(
      {
        ...a,
        type: (a == null ? void 0 : a.refetchType) ?? (a == null ? void 0 : a.type) ?? "active"
      },
      i
    )));
  }
  refetchQueries(a, i = {}) {
    const o = {
      ...i,
      cancelRefetch: i.cancelRefetch ?? !0
    }, r = Ie.batch(
      () => $(this, ye).findAll(a).filter((c) => !c.isDisabled() && !c.isStatic()).map((c) => {
        let f = c.fetch(void 0, o);
        return o.throwOnError || (f = f.catch(On)), c.state.fetchStatus === "paused" ? Promise.resolve() : f;
      })
    );
    return Promise.all(r).then(On);
  }
  fetchQuery(a) {
    const i = this.defaultQueryOptions(a);
    i.retry === void 0 && (i.retry = !1);
    const o = $(this, ye).build(this, i);
    return o.isStaleByTime(
      wd(i.staleTime, o)
    ) ? o.fetch(i) : Promise.resolve(o.state.data);
  }
  prefetchQuery(a) {
    return this.fetchQuery(a).then(On).catch(On);
  }
  fetchInfiniteQuery(a) {
    return a._type = "infinite", this.fetchQuery(a);
  }
  prefetchInfiniteQuery(a) {
    return this.fetchInfiniteQuery(a).then(On).catch(On);
  }
  ensureInfiniteQueryData(a) {
    return a._type = "infinite", this.ensureQueryData(a);
  }
  resumePausedMutations() {
    return Bs.isOnline() ? $(this, Wa).resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return $(this, ye);
  }
  getMutationCache() {
    return $(this, Wa);
  }
  getDefaultOptions() {
    return $(this, Pa);
  }
  setDefaultOptions(a) {
    jt(this, Pa, a);
  }
  setQueryDefaults(a, i) {
    $(this, Rl).set(Uo(a), {
      queryKey: a,
      defaultOptions: i
    });
  }
  getQueryDefaults(a) {
    const i = [...$(this, Rl).values()], o = {};
    return i.forEach((r) => {
      Lo(a, r.queryKey) && Object.assign(o, r.defaultOptions);
    }), o;
  }
  setMutationDefaults(a, i) {
    $(this, Nl).set(Uo(a), {
      mutationKey: a,
      defaultOptions: i
    });
  }
  getMutationDefaults(a) {
    const i = [...$(this, Nl).values()], o = {};
    return i.forEach((r) => {
      Lo(a, r.mutationKey) && Object.assign(o, r.defaultOptions);
    }), o;
  }
  defaultQueryOptions(a) {
    if (a._defaulted)
      return a;
    const i = {
      ...$(this, Pa).queries,
      ...this.getQueryDefaults(a.queryKey),
      ...a,
      _defaulted: !0
    };
    return i.queryHash || (i.queryHash = Ud(
      i.queryKey,
      i
    )), i.refetchOnReconnect === void 0 && (i.refetchOnReconnect = i.networkMode !== "always"), i.throwOnError === void 0 && (i.throwOnError = !!i.suspense), !i.networkMode && i.persister && (i.networkMode = "offlineFirst"), i.queryFn === Ld && (i.enabled = !1), i;
  }
  defaultMutationOptions(a) {
    return a != null && a._defaulted ? a : {
      ...$(this, Pa).mutations,
      ...(a == null ? void 0 : a.mutationKey) && this.getMutationDefaults(a.mutationKey),
      ...a,
      _defaulted: !0
    };
  }
  clear() {
    $(this, ye).clear(), $(this, Wa).clear();
  }
}, ye = new WeakMap(), Wa = new WeakMap(), Pa = new WeakMap(), Rl = new WeakMap(), Nl = new WeakMap(), ti = new WeakMap(), Ml = new WeakMap(), Dl = new WeakMap(), Mx), a1 = I.createContext(
  void 0
), i1 = ({
  client: a,
  children: i
}) => (I.useEffect(() => (a.mount(), () => {
  a.unmount();
}), [a]), /* @__PURE__ */ d.jsx(a1.Provider, { value: a, children: i }));
function Tg(a, i = []) {
  const o = typeof a == "string" ? { prompt: a, context: i } : a;
  return {
    prompt: o.prompt,
    ...o.context.length ? { context: o.context } : {},
    ...o.runPrompt ? { run_prompt: o.runPrompt } : {},
    ...o.metadata ? { metadata: o.metadata } : {},
    ...o.runSettings ? { run_settings: o.runSettings } : {}
  };
}
class l1 {
  constructor(i) {
    this.getHass = i;
  }
  async callWS(i) {
    const o = this.getHass();
    if (!o) throw new Error("Home Assistant connection is not ready");
    return o.callWS(i);
  }
  status() {
    return this.callWS({ type: "ha_codex/status" });
  }
  settings() {
    return this.callWS({ type: "ha_codex/settings/get" });
  }
  updateSettings(i) {
    return this.callWS({ type: "ha_codex/settings/update", settings: i });
  }
  bridgeLog(i = 500) {
    return this.callWS({ type: "ha_codex/bridge_log", lines: i });
  }
  bridgeLogClear() {
    return this.callWS({ type: "ha_codex/bridge_log/clear" });
  }
  bridgeRestart() {
    return this.callWS({ type: "ha_codex/bridge_restart" });
  }
  coreRestart() {
    return this.callWS({ type: "ha_codex/core_restart" });
  }
  accountStatus() {
    return this.callWS({ type: "ha_codex/account/status" });
  }
  accountDeviceLoginStart() {
    return this.callWS({ type: "ha_codex/account/device_login/start" });
  }
  accountDeviceLoginStatus() {
    return this.callWS({ type: "ha_codex/account/device_login/status" });
  }
  accountDeviceLoginCancel() {
    return this.callWS({ type: "ha_codex/account/device_login/cancel" });
  }
  accountLogout() {
    return this.callWS({ type: "ha_codex/account/logout" });
  }
  entityRegistry() {
    return this.callWS({ type: "config/entity_registry/list" });
  }
  deviceRegistry() {
    return this.callWS({ type: "config/device_registry/list" });
  }
  areaRegistry() {
    return this.callWS({ type: "config/area_registry/list" });
  }
  contextLogs(i = 200) {
    return this.callWS({ type: "ha_codex/context/logs", lines: i });
  }
  contextConfigFiles() {
    return this.callWS({ type: "ha_codex/context/config_files" });
  }
  contextConfigFile(i) {
    return this.callWS({ type: "ha_codex/context/config_file", path: i });
  }
  listSessions() {
    return this.callWS({ type: "ha_codex/sessions/list" });
  }
  messagesAfter(i, o, r) {
    return this.callWS({
      type: "ha_codex/sessions/messages_after",
      session_id: i,
      after_id: o,
      ...r ? { limit: r } : {}
    });
  }
  createSession() {
    return this.callWS({ type: "ha_codex/sessions/create" });
  }
  send(i, o, r = []) {
    const c = Tg(o, r);
    return this.callWS({
      type: "ha_codex/sessions/send",
      session_id: i,
      ...c
    });
  }
  updateSessionRunSettings(i, o) {
    return this.callWS({
      type: "ha_codex/sessions/run_settings/update",
      session_id: i,
      run_settings: o
    });
  }
  respondRunPlan(i, o, r) {
    return this.callWS({
      type: "ha_codex/sessions/run_plan/respond",
      session_id: i,
      plan_id: o,
      action: r
    });
  }
  rollbackRun(i, o) {
    return this.callWS({
      type: "ha_codex/sessions/rollback_run",
      session_id: i,
      checkpoint_id: o
    });
  }
  steer(i, o, r = []) {
    const c = Tg(o, r);
    return this.callWS({
      type: "ha_codex/sessions/steer",
      session_id: i,
      ...c
    });
  }
  retryContinue(i) {
    return this.callWS({
      type: "ha_codex/sessions/retry_continue",
      session_id: i
    });
  }
  cancel(i) {
    return this.callWS({ type: "ha_codex/sessions/cancel", session_id: i });
  }
  rename(i, o) {
    return this.callWS({ type: "ha_codex/sessions/rename", session_id: i, title: o });
  }
  archive(i, o) {
    return this.callWS({
      type: "ha_codex/sessions/archive",
      session_id: i,
      archived: o
    });
  }
  respondApproval(i, o, r) {
    return this.callWS({
      type: "ha_codex/approvals/respond",
      session_id: i,
      approval_id: o,
      approved: r
    });
  }
  gitStatus() {
    return this.callWS({ type: "ha_codex/git/status" });
  }
  gitSetupStatus() {
    return this.callWS({ type: "ha_codex/git/setup/status" });
  }
  gitSetupGenerateKey() {
    return this.callWS({ type: "ha_codex/git/setup/generate_key" });
  }
  gitSetupSetRemote(i) {
    return this.callWS({ type: "ha_codex/git/setup/set_remote", remote_url: i });
  }
  gitSetupPull() {
    return this.callWS({ type: "ha_codex/git/setup/pull" });
  }
  gitChanges() {
    return this.callWS({ type: "ha_codex/git/changes" });
  }
  gitDiff() {
    return this.callWS({ type: "ha_codex/git/diff" });
  }
  gitFileDiff(i, o = "") {
    return this.callWS({ type: "ha_codex/git/file_diff", path: i, ...o ? { old_path: o } : {} });
  }
  commitPush(i, o) {
    return this.callWS({ type: "ha_codex/git/commit_push", message: i, files: jg(o) });
  }
  discard(i) {
    return this.callWS({ type: "ha_codex/git/discard", files: jg(i) });
  }
  runValidation(i) {
    return this.callWS({
      type: "ha_codex/validation/run",
      session_id: i || ""
    });
  }
  reloadValidationDomains(i) {
    return this.callWS({
      type: "ha_codex/validation/reload",
      domains: i
    });
  }
}
function jg(a) {
  return a.map((i) => ({
    path: i.path,
    ...i.old_path ? { old_path: i.old_path } : {}
  }));
}
const zg = (a) => {
  let i;
  const o = /* @__PURE__ */ new Set(), r = (x, S) => {
    const w = typeof x == "function" ? x(i) : x;
    if (!Object.is(w, i)) {
      const C = i;
      i = S ?? (typeof w != "object" || w === null) ? w : Object.assign({}, i, w), o.forEach((A) => A(i, C));
    }
  }, c = () => i, p = { setState: r, getState: c, getInitialState: () => g, subscribe: (x) => (o.add(x), () => o.delete(x)) }, g = i = a(r, c, p);
  return p;
}, o1 = ((a) => a ? zg(a) : zg), r1 = (a) => a;
function s1(a, i = r1) {
  const o = dt.useSyncExternalStore(
    a.subscribe,
    dt.useCallback(() => i(a.getState()), [a, i]),
    dt.useCallback(() => i(a.getInitialState()), [a, i])
  );
  return dt.useDebugValue(o), o;
}
const Ag = (a) => {
  const i = o1(a), o = (r) => s1(i, r);
  return Object.assign(o, i), o;
}, Yx = ((a) => a ? Ag(a) : Ag);
function Ys(a) {
  return (a == null ? void 0 : a.command) === "ha core restart" && String(a.reason || "").startsWith("restart_required:");
}
function ni(a) {
  return ((a == null ? void 0 : a.approvals) || []).filter((i) => i.status === "pending" && !Ys(i));
}
function Qd(a) {
  return ((a == null ? void 0 : a.approvals) || []).some((i) => i.status === "pending" && Ys(i));
}
function u1(a) {
  return a.map((i) => {
    const o = (i.approvals || []).find((r) => r.status === "pending" && Ys(r));
    return o ? { session: i, approval: o } : null;
  }).filter(Boolean);
}
function Vx(a) {
  if (!c1(a)) return null;
  const o = String(a.content || "").match(/<ha_codex_question>\s*([\s\S]*?)\s*<\/ha_codex_question>\s*$/i);
  if (!o) return null;
  try {
    const r = JSON.parse(o[1]), c = Array.isArray(r.choices) ? r.choices.slice(0, 3) : [];
    if (!r.question || c.length !== 3) return null;
    const f = c.map((m) => ({
      label: String((m == null ? void 0 : m.label) || "").trim(),
      description: String((m == null ? void 0 : m.description) || "").trim()
    })).filter((m) => m.label);
    return f.length !== 3 ? null : {
      question: String(r.question),
      choices: f,
      customPlaceholder: String(r.custom_placeholder || "Type a custom answer...")
    };
  } catch {
    return null;
  }
}
function c1(a) {
  var i;
  return a ? a.role === "assistant" ? !0 : a.role === "event" && String(((i = a.metadata) == null ? void 0 : i.kind) || "") === "run_finished" : !1;
}
function d1(a) {
  return String(a || "").replace(/<ha_codex_question>[\s\S]*?<\/ha_codex_question>/gi, "").trim();
}
function f1(a, i = []) {
  const o = String(a || "").trim();
  if (!o || !i.length || !/^\s*File changes:\s*$/im.test(o)) return o;
  const r = new Set(i.map((f) => _d(f.path)).filter(Boolean));
  if (!r.size) return o;
  const c = o.split(/\r?\n/);
  for (let f = 0; f < c.length; f += 1) {
    if (!/^\s*File changes:\s*$/i.test(c[f])) continue;
    const m = [];
    let p = !1, g = f + 1;
    for (; g < c.length; g += 1) {
      const S = c[g];
      if (!S.trim()) continue;
      const w = h1(S);
      if (!w) break;
      p = !0, w.path && m.push(w.path);
    }
    const x = [...new Set(m)];
    if (!(!p || !x.length) && x.every((S) => r.has(S)))
      return [...c.slice(0, f), ...c.slice(g)].join(`
`).trim();
  }
  return o;
}
function h1(a) {
  let i = a.trim();
  if (!i) return null;
  if (/^[-*]?\s*\d+\s+more files? changed\.?$/i.test(i)) return {};
  i = i.replace(/^[-*]\s+/, "").trim(), i = i.replace(/^(added|modified|deleted|renamed|changed|untracked|copied)\s+/i, "").trim(), i = i.replace(/^[MADRC?]{1,2}\s+/, "").trim();
  const o = [...i.matchAll(/`([^`]+)`/g)].map((f) => f[1]);
  if (o.length) {
    const f = _d(o[o.length - 1]);
    return f ? { path: f } : null;
  }
  const r = i.split(/\s+->\s+/);
  if (i = r[r.length - 1].replace(/^["'`]+|["'`,.;:]+$/g, "").trim(), !/[/.\\]/.test(i)) return null;
  const c = _d(i);
  return c ? { path: c } : null;
}
function _d(a = "") {
  return String(a || "").replace(/\\/g, "/").replace(/^\/+/, "").replace(/^homeassistant\//, "").replace(/^config\//, "");
}
function m1(a) {
  return !a || !Array.isArray(a.messages) && a.has_pending_question !== void 0 ? null : Xx(a, a.messages || []);
}
function Xx(a, i = []) {
  if (["planning", "running", "working"].includes(a.status || "")) return null;
  for (let o = i.length - 1; o >= 0; o -= 1) {
    const r = i[o];
    if (r.role === "user") break;
    const c = Vx(r);
    if (c) return { ...c, messageIndex: o };
  }
  return null;
}
function Qo(a) {
  return a && !Array.isArray(a.messages) && a.has_pending_question !== void 0 ? !!a.has_pending_question : !!m1(a);
}
function Yo(a) {
  var o;
  const i = (o = a == null ? void 0 : a.metadata) == null ? void 0 : o.pending_plan;
  return !!(i && i.status === "pending");
}
function Bo(a) {
  return a ? ["planning", "running", "working"].includes(a.status || "") ? !0 : a.status === "waiting_approval" && !!ni(a).length : !1;
}
function p1(a = []) {
  return a.filter((o) => {
    var r;
    return !["restart_required", "restart_deferred"].includes(String(((r = o.metadata) == null ? void 0 : r.kind) || ""));
  }).filter((o, r, c) => r === 0 ? !0 : Td(o) !== Td(c[r - 1]));
}
function Td(a) {
  var i;
  return [a.role || "", ((i = a.metadata) == null ? void 0 : i.kind) || "", (a.content || "").trim()].join(`
`);
}
function g1(a, i) {
  var o;
  return a.id !== void 0 && a.id !== null ? `id:${a.id}` : a.created_at ? `created:${a.created_at}:${a.role || ""}:${((o = a.metadata) == null ? void 0 : o.kind) || ""}` : `content:${i}:${Td(a)}`;
}
function x1(a) {
  const i = ko(a.updated_at);
  if (i !== null) return i;
  const o = [...a.messages || []].reverse().map((r) => ko(r.created_at)).find((r) => r !== null);
  return o !== void 0 ? o : ko(a.created_at) ?? 0;
}
function b1(a) {
  const i = ko(a.last_user_message_at);
  if (i !== null) return i;
  const o = [...a.messages || []].reverse().map((r) => r.role === "user" ? ko(r.created_at) : null).find((r) => r !== null);
  return o !== void 0 ? o : x1(a);
}
function jd(a) {
  return b1(a);
}
function ko(a) {
  if (a == null || a === "") return null;
  const i = Number(a);
  return Number.isFinite(i) && i > 0 ? i : null;
}
function Eg(a) {
  const i = (a.approvals || []).some((r) => !Ys(r));
  return Array.isArray(a.messages) ? !(a.messages || []).some(
    (r) => {
      var c;
      return !["restart_required", "restart_deferred"].includes(String(((c = r.metadata) == null ? void 0 : c.kind) || ""));
    }
  ) && !Number(a.last_message_id || 0) && !i && !a.codex_session_id : !Number(a.last_message_id || 0) && !i && !a.codex_session_id;
}
function Rg(a) {
  return ni(a).length || Qo(a) || Yo(a) || a.status === "waiting_approval" && ni(a).length ? 0 : ["planning", "running", "working"].includes(a.status || "") ? 1 : a.status === "error" ? 2 : 3;
}
function v1(a, i = !1) {
  return [...a].sort((o, r) => {
    const c = {
      activity: jd(o),
      empty: Eg(o),
      rank: Rg(o),
      title: String(o.title || "")
    }, f = {
      activity: jd(r),
      empty: Eg(r),
      rank: Rg(r),
      title: String(r.title || "")
    };
    if (i) {
      const x = f.activity - c.activity;
      return x !== 0 ? x : c.title.localeCompare(f.title);
    }
    const m = Number(f.empty) - Number(c.empty);
    if (m !== 0) return m;
    const p = c.rank - f.rank;
    if (p !== 0) return p;
    const g = f.activity - c.activity;
    return g !== 0 ? g : c.title.localeCompare(f.title);
  });
}
const Vo = 20;
function ei(a) {
  return `${a.kind}:${a.id}`;
}
function y1(a, i) {
  const o = ei(i);
  return a.some((r) => ei(r) === o) || a.length >= Vo ? a : [...a, i];
}
function w1(a, i) {
  return a.filter((o) => ei(o) !== i);
}
function Yd(a = []) {
  return a.slice(0, Vo).map(_1).filter((i) => !!i);
}
function Ms(a, i = [], o = {}) {
  var c;
  const r = (c = o.runPrompt) == null ? void 0 : c.trim();
  return {
    prompt: a.trim(),
    context: Yd(i),
    ...r ? { runPrompt: r } : {},
    ...o.metadata ? { metadata: o.metadata } : {},
    ...o.runSettings ? { runSettings: o.runSettings } : {}
  };
}
function Ng(a, i, o = [], r = {}) {
  const c = Ms(i, o, r);
  return {
    id: a,
    content: c.prompt,
    ...c
  };
}
function S1(a) {
  const i = a == null ? void 0 : a.context;
  return Array.isArray(i) ? i.map(Ix).filter((o) => !!o).slice(0, Vo) : [];
}
function C1(a) {
  return Yd(a).map(({ id: i, kind: o, label: r, subtitle: c }) => ({
    id: i,
    kind: o,
    label: r,
    ...c ? { subtitle: c } : {}
  }));
}
function Kx(a) {
  return {
    area: "mdi:floor-plan",
    automation: "mdi:robot-industrial-outline",
    config_file: "mdi:file-document-outline",
    device: "mdi:devices",
    entity: "mdi:home-assistant",
    log: "mdi:text-box-search-outline",
    script: "mdi:script-text-outline"
  }[a] || "mdi:paperclip";
}
function Mg(a) {
  return a === "sent" || a === "queued";
}
function _1(a) {
  const i = Ix(a);
  if (!i) return null;
  const o = a.payload && typeof a.payload == "object" && !Array.isArray(a.payload) ? a.payload : void 0;
  return {
    ...i,
    ...o ? { payload: o } : {}
  };
}
function Ix(a) {
  if (!a || typeof a != "object") return null;
  const i = a;
  if (!T1(i.kind)) return null;
  const o = String(i.id || "").trim(), r = String(i.label || "").trim();
  if (!o || !r) return null;
  const c = String(i.subtitle || "").trim();
  return {
    id: o,
    kind: i.kind,
    label: r,
    ...c ? { subtitle: c } : {}
  };
}
function T1(a) {
  return a === "entity" || a === "device" || a === "area" || a === "automation" || a === "script" || a === "log" || a === "config_file";
}
let Dg = 0;
function j1(a) {
  const { messages: i, ...o } = a;
  return o;
}
function Zx(a, i, o = []) {
  const r = j1(a);
  return {
    ...i,
    ...r,
    last_user_message_at: zd(
      o,
      r.last_user_message_at ?? (i == null ? void 0 : i.last_user_message_at)
    )
  };
}
function z1(a, i = {}) {
  const o = {}, r = {};
  return a.forEach((c) => {
    Array.isArray(c.messages) ? r[c.id] = c.messages : i[c.id] && (r[c.id] = i[c.id]), o[c.id] = Zx(c, void 0, r[c.id] || []);
  }), { chatsById: o, messagesByChatId: r };
}
function Qn(a, i) {
  return v1(
    Object.values(a).filter((o) => !!o.archived === i),
    i
  ).map((o) => o.id);
}
function $x(a, i) {
  return a != null && i !== void 0 && i !== null && String(a) === String(i);
}
function ks(a) {
  const i = Number(a);
  return Number.isFinite(i) ? i : null;
}
function Og(a, i = 0) {
  const o = Number(i);
  return a.reduce((r, c, f) => {
    const m = ks(c.id) ?? f + 1;
    return Math.max(r, m);
  }, Number.isFinite(o) ? o : 0);
}
function zd(a, i) {
  const o = Bg(i);
  return a.reduce((r, c) => {
    if (c.role !== "user") return r;
    const f = Bg(c.created_at);
    return f === null ? r : r === null ? f : Math.max(r, f);
  }, o);
}
function Bg(a) {
  if (a == null || a === "") return null;
  const i = Number(a);
  return Number.isFinite(i) && i > 0 ? i : null;
}
function kg(a, i) {
  const o = [...a];
  return i.forEach((r) => {
    const c = o.findIndex((m) => $x(m.id, r.id));
    if (c !== -1) {
      o[c] = r;
      return;
    }
    const f = o.findIndex(
      (m) => {
        var p;
        return ((p = m.metadata) == null ? void 0 : p.optimistic) && m.role === r.role && String(m.content || "") === String(r.content || "");
      }
    );
    if (f !== -1) {
      o[f] = r;
      return;
    }
    o.push(r);
  }), o.sort((r, c) => {
    const f = ks(r.id), m = ks(c.id);
    return f !== null && m !== null ? f - m : f !== null ? -1 : m !== null ? 1 : 0;
  });
}
const qt = Yx((a, i) => ({
  chatsById: {},
  messagesByChatId: {},
  activeChatIds: [],
  archivedChatIds: [],
  streamingByChatId: {},
  activeId: null,
  showArchived: !1,
  drafts: {},
  contextByChatId: {},
  questionDrafts: {},
  queuesByChatId: {},
  queueStartsByChatId: {},
  scheduledRestart: !1,
  validation: null,
  validationRunning: !1,
  restartToastNonce: 0,
  setSessions: (o) => a((r) => {
    const c = z1(o, r.messagesByChatId), f = Qn(c.chatsById, !1), m = Qn(c.chatsById, !0), p = r.showArchived ? m : f, g = r.activeId && p.includes(r.activeId) ? r.activeId : p[0] || null, x = Object.fromEntries(
      o.map((S) => [S.id, ["planning", "running", "working"].includes(S.status || "")])
    );
    return { ...c, activeChatIds: f, archivedChatIds: m, activeId: g, streamingByChatId: x };
  }),
  upsertSession: (o) => a((r) => {
    const c = Array.isArray(o.messages) ? o.messages : r.messagesByChatId[o.id], f = {
      ...r.chatsById,
      [o.id]: Zx(o, r.chatsById[o.id], c || [])
    }, m = Qn(f, !1), p = Qn(f, !0), g = r.showArchived ? p : m, x = r.activeId && g.includes(r.activeId) ? r.activeId : g[0] || null;
    return {
      chatsById: f,
      messagesByChatId: c ? { ...r.messagesByChatId, [o.id]: c } : r.messagesByChatId,
      activeChatIds: m,
      archivedChatIds: p,
      activeId: x,
      streamingByChatId: {
        ...r.streamingByChatId,
        [o.id]: ["planning", "running", "working"].includes(o.status || "")
      }
    };
  }),
  deleteSession: (o) => a((r) => {
    const { [o]: c, ...f } = r.chatsById, { [o]: m, ...p } = r.messagesByChatId, { [o]: g, ...x } = r.contextByChatId, S = Qn(f, !1), w = Qn(f, !0), C = r.showArchived ? w : S;
    return {
      chatsById: f,
      messagesByChatId: p,
      contextByChatId: x,
      activeChatIds: S,
      archivedChatIds: w,
      activeId: r.activeId === o ? C[0] || null : r.activeId
    };
  }),
  appendMessage: (o, r, c = !0) => a((f) => {
    const m = f.chatsById[o];
    if (!m) return {};
    const p = kg(f.messagesByChatId[o] || [], [r]), g = {
      ...f.chatsById,
      [o]: {
        ...m,
        last_message_id: Og(p, m.last_message_id),
        last_user_message_at: zd(p, m.last_user_message_at),
        updated_at: c ? Date.now() / 1e3 : m.updated_at
      }
    };
    return {
      chatsById: g,
      messagesByChatId: { ...f.messagesByChatId, [o]: p },
      activeChatIds: Qn(g, !1),
      archivedChatIds: Qn(g, !0)
    };
  }),
  appendMessages: (o, r, c = !1) => a((f) => {
    const m = f.chatsById[o];
    if (!m || !r.length) return {};
    const p = kg(f.messagesByChatId[o] || [], r), g = {
      ...f.chatsById,
      [o]: {
        ...m,
        last_message_id: Og(p, m.last_message_id),
        last_user_message_at: zd(p, m.last_user_message_at),
        updated_at: c ? Date.now() / 1e3 : m.updated_at
      }
    };
    return {
      chatsById: g,
      messagesByChatId: { ...f.messagesByChatId, [o]: p },
      activeChatIds: c ? Qn(g, !1) : f.activeChatIds,
      archivedChatIds: c ? Qn(g, !0) : f.archivedChatIds
    };
  }),
  appendDelta: (o, r, c) => a((f) => {
    const m = f.chatsById[o];
    if (!m) return {};
    const p = f.messagesByChatId[o] || [], g = ks(c);
    if (!p.length && g !== null && g > 1) return {};
    const x = [...p];
    let S = c == null ? -1 : x.findIndex((N) => $x(N.id, c));
    if (S === -1) {
      for (let N = x.length - 1; N >= 0; N -= 1)
        if (x[N].role === "assistant") {
          S = N;
          break;
        }
    }
    S === -1 ? x.push({ id: c, role: "assistant", content: r, created_at: Date.now() / 1e3 }) : x[S] = { ...x[S], content: `${x[S].content || ""}${r}` };
    const w = Number(m.last_message_id || 0), C = g !== null ? Math.max(w, g) : w;
    return {
      chatsById: C !== w ? { ...f.chatsById, [o]: { ...m, last_message_id: C } } : f.chatsById,
      messagesByChatId: { ...f.messagesByChatId, [o]: x }
    };
  }),
  setActiveId: (o) => a({ activeId: o }),
  setShowArchived: (o) => a((r) => {
    const c = o ? r.archivedChatIds : r.activeChatIds;
    return {
      showArchived: o,
      activeId: r.activeId && c.includes(r.activeId) ? r.activeId : c[0] || null
    };
  }),
  setDraft: (o, r) => a((c) => ({ drafts: { ...c.drafts, [o]: r } })),
  clearDraft: (o) => a((r) => {
    const { [o]: c, ...f } = r.drafts;
    return { drafts: f };
  }),
  addContextItem: (o, r) => a((c) => {
    const f = y1(c.contextByChatId[o] || [], r);
    return { contextByChatId: { ...c.contextByChatId, [o]: f } };
  }),
  removeContextItem: (o, r) => a((c) => {
    const f = w1(c.contextByChatId[o] || [], r);
    if (!f.length) {
      const { [o]: m, ...p } = c.contextByChatId;
      return { contextByChatId: p };
    }
    return { contextByChatId: { ...c.contextByChatId, [o]: f } };
  }),
  clearContext: (o) => a((r) => {
    const { [o]: c, ...f } = r.contextByChatId;
    return { contextByChatId: f };
  }),
  setContextItems: (o, r) => a((c) => {
    const f = Yd(r);
    if (!f.length) {
      const { [o]: m, ...p } = c.contextByChatId;
      return { contextByChatId: p };
    }
    return { contextByChatId: { ...c.contextByChatId, [o]: f } };
  }),
  setQuestionDraft: (o, r) => a((c) => ({ questionDrafts: { ...c.questionDrafts, [o]: r } })),
  clearQuestionDraft: (o) => a((r) => {
    const { [o]: c, ...f } = r.questionDrafts;
    return { questionDrafts: f };
  }),
  enqueueMessage: (o, r, c = []) => {
    const f = typeof r == "string" ? Ng(String(++Dg), r, c) : Ng(String(++Dg), r.prompt, r.context, {
      runPrompt: r.runPrompt,
      metadata: r.metadata
    });
    return a((m) => ({ queuesByChatId: { ...m.queuesByChatId, [o]: [...m.queuesByChatId[o] || [], f] } })), f;
  },
  removeQueuedMessage: (o, r) => a((c) => ({
    queuesByChatId: {
      ...c.queuesByChatId,
      [o]: (c.queuesByChatId[o] || []).filter((f) => f.id !== r)
    }
  })),
  setQueueStarting: (o, r) => a((c) => ({
    queueStartsByChatId: { ...c.queueStartsByChatId, [o]: r }
  })),
  setScheduledRestart: (o) => a({ scheduledRestart: o }),
  setValidation: (o) => a({ validation: o }),
  setValidationRunning: (o) => a({ validationRunning: o }),
  bumpRestartToast: () => a((o) => ({ restartToastNonce: o.restartToastNonce + 1 }))
}));
function Hg(a) {
  return a.trim() === "??" ? "untracked" : a.includes("D") && !/[MARCA]/.test(a) ? "deleted" : a.includes("A") ? "added" : a.includes("R") ? "renamed" : a.includes("C") ? "copied" : a.includes("M") ? "modified" : "changed";
}
function ba(a, i = "") {
  return `${i || ""}
${a || ""}`;
}
function Fx(a) {
  const i = String(a || ""), o = i.lastIndexOf("/");
  return o === -1 ? { folder: ".", name: i } : { folder: i.slice(0, o), name: i.slice(o + 1) };
}
function A1(a) {
  const i = /* @__PURE__ */ new Map();
  return a.forEach((o) => {
    var m;
    const { folder: r, name: c } = Fx(o.path), f = r || ".";
    i.has(f) || i.set(f, []), (m = i.get(f)) == null || m.push({ ...o, display_name: c });
  }), [...i.entries()].sort(([o], [r]) => o.localeCompare(r)).map(([o, r]) => ({
    folder: o,
    files: r.sort((c, f) => String(c.display_name || c.path).localeCompare(String(f.display_name || f.path)))
  }));
}
function ar(a = []) {
  return a;
}
function Hs(a = []) {
  return ar(a).length;
}
function E1(a = []) {
  return Object.fromEntries(ar(a).map((i) => [ba(i.path, i.old_path || ""), !0]));
}
function Ad(a = [], i = {}) {
  return ar(a).filter((o) => i[ba(o.path, o.old_path || "")]);
}
function Vd(a = [], i = {}) {
  return Ad(a, i).length;
}
function R1(a, i = {}) {
  const o = ba(a.path, a.old_path || "");
  if (i[o]) {
    const { [o]: r, ...c } = i;
    return c;
  }
  return { ...i, [o]: !0 };
}
function qg(a = [], i = {}, o = !1) {
  return o || Vd(a, i) === 0;
}
function pa(a) {
  return (a == null ? void 0 : a.setup_complete) === !0;
}
function N1(a) {
  var i;
  return a ? (i = a.missing) != null && i.length ? a.missing : [] : ["setup status"];
}
function M1(a) {
  return String(a || "").split(`
`).filter((i) => !i.startsWith("diff --git ")).filter((i) => !i.startsWith("index ")).filter((i) => !i.startsWith("new file mode ")).filter((i) => !i.startsWith("deleted file mode ")).map((i) => i.startsWith("@@") ? { type: "hunk", content: i } : i.startsWith("+") && !i.startsWith("+++") ? { type: "added", content: i } : i.startsWith("-") && !i.startsWith("---") ? { type: "deleted", content: i } : i.startsWith("+++") || i.startsWith("---") ? { type: "meta", content: i } : { type: "context", content: i });
}
function D1(a) {
  const i = String(a || "changed").toLowerCase();
  return i === "added" || i === "untracked" ? "mdi:file-plus-outline" : i === "modified" ? "mdi:file-edit-outline" : i === "deleted" ? "mdi:file-remove-outline" : i === "renamed" ? "mdi:file-move-outline" : i === "copied" ? "mdi:file-multiple-outline" : "mdi:file-outline";
}
const Ol = "gpt_5_5", Xd = "codex_default", qs = [
  { id: "gpt_5_5", label: "GPT-5.5", model: "gpt-5.5" },
  { id: "gpt_5_4", label: "GPT-5.4", model: "gpt-5.4" },
  { id: "gpt_5_4_mini", label: "GPT-5.4-Mini", model: "gpt-5.4-mini" },
  { id: "gpt_5_3_codex", label: "GPT-5.3-Codex", model: "gpt-5.3-codex" },
  { id: "gpt_5_3_codex_spark", label: "GPT-5.3-Codex-Spark", model: "gpt-5.3-codex-spark" },
  { id: "gpt_5_2", label: "GPT-5.2", model: "gpt-5.2" }
], Sl = new Set(qs.map((a) => a.id)), Jx = {
  mode: "auto",
  model_preset_id: Ol,
  reasoning_effort: "auto",
  verbosity: "auto",
  plan_mode: "auto",
  validation_depth: "auto",
  tool_visibility: "normal",
  approval_mode: "ask"
}, O1 = {
  mode: ["auto", "manual"],
  reasoning_effort: ["auto", "minimal", "low", "medium", "high", "xhigh"],
  verbosity: ["auto", "low", "medium", "high"],
  plan_mode: ["auto", "always", "off"],
  validation_depth: ["auto", "none", "full"],
  tool_visibility: ["compact", "normal", "verbose"],
  approval_mode: ["ask", "auto_readonly"]
};
function Wx() {
  return {
    defaults: { ...Jx },
    model_presets: qs.map((a) => ({ ...a })),
    context_budget_chars: 4e4
  };
}
function Kd(a, i = Jx) {
  const o = { ...i };
  if (!a || typeof a != "object") return o;
  if (Object.entries(O1).forEach(([r, c]) => {
    if (!(r in a)) return;
    const f = String(a[r] || "");
    if (!c.includes(f))
      throw new Error(`${r} must be one of ${c.join(", ")}`);
    o[r] = f;
  }), "model_preset_id" in a) {
    const r = String(a.model_preset_id || "").trim();
    if (!r) throw new Error("model_preset_id is required");
    o.model_preset_id = r;
  }
  return o;
}
function Xo(a) {
  const i = Wx();
  if (!a || typeof a != "object") return i;
  const o = B1(a.model_presets), r = {
    defaults: Kd(a.defaults, i.defaults),
    model_presets: o,
    context_budget_chars: U1(a.context_budget_chars)
  };
  return r.model_presets.some((c) => c.id === r.defaults.model_preset_id) ? r.defaults.model_preset_id === Xd && (r.defaults.model_preset_id = Ol) : r.defaults.model_preset_id = Ol, r;
}
function B1(a) {
  const i = qs.map((r) => ({ ...r })), o = /* @__PURE__ */ new Set([...qs.map((r) => r.id), Xd]);
  return Array.isArray(a) && a.forEach((r) => {
    if (!r || typeof r != "object") return;
    const c = r, f = String(c.id || "").trim();
    if (!f || o.has(f)) return;
    const m = String(c.label || f).trim() || f, p = c.model === null || c.model === void 0 ? null : String(c.model).trim() || null;
    i.push({ id: f, label: m, model: p }), o.add(f);
  }), i;
}
function Px(a, i) {
  const o = Xo(a), r = String(i.id || tb(i.label || i.model || "model")).trim();
  if (!r || Sl.has(r)) return o;
  const c = {
    id: r,
    label: String(i.label || r).trim() || r,
    model: i.model === null ? null : String(i.model || "").trim() || null
  }, f = o.model_presets.findIndex((p) => p.id === r), m = [...o.model_presets];
  return f === -1 ? m.push(c) : m[f] = c, { ...o, model_presets: m };
}
function k1(a, i) {
  const o = Xo(a);
  if (Sl.has(i)) return o;
  const r = o.model_presets.filter((f) => f.id !== i), c = o.defaults.model_preset_id === i ? { ...o.defaults, model_preset_id: Ol } : o.defaults;
  return { ...o, defaults: c, model_presets: r };
}
function H1(a, i) {
  var f;
  const o = Xo(i), r = (f = a == null ? void 0 : a.metadata) == null ? void 0 : f.run_settings, c = Kd(
    r && typeof r == "object" ? r : void 0,
    o.defaults
  );
  return o.model_presets.some((m) => m.id === c.model_preset_id) ? c.model_preset_id === Xd && (c.model_preset_id = Ol) : c.model_preset_id = Ol, c;
}
function q1(a, i = 4e4) {
  const o = Math.max(1e3, Number.isFinite(Number(i)) ? Number(i) : 4e4), r = G1(a), c = r / o, f = c >= 0.9 ? "danger" : c >= 0.7 ? "warning" : "ok";
  return {
    used: r,
    budget: o,
    ratio: c,
    level: f,
    label: `${Gg(r)} / ${Gg(o)}`
  };
}
function G1(a) {
  return a.reduce((i, o) => i + JSON.stringify(o).length, 0);
}
function tb(a) {
  return a.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || `model_${Date.now()}`;
}
function U1(a) {
  const i = Number(a);
  return Number.isFinite(i) ? Math.min(2e5, Math.max(1e3, Math.round(i))) : 4e4;
}
function Gg(a) {
  return a < 1e3 ? String(Math.round(a)) : `${Math.round(a / 1e3)}k`;
}
const pt = Yx((a, i) => ({
  status: {},
  bridgeLog: null,
  bridgeLogLoading: !1,
  bridgeActionRunning: !1,
  coreActionRunning: !1,
  account: null,
  accountLoading: !1,
  accountActionRunning: !1,
  deviceLogin: null,
  showStatusDebug: !1,
  statusDebugTab: "status",
  settings: Wx(),
  settingsLoading: !1,
  settingsSaving: !1,
  settingsTab: "run",
  gitPanelOpen: !1,
  gitSetupStatus: null,
  gitSetupLoading: !1,
  gitSetupActionRunning: !1,
  gitSetupResult: null,
  gitChanges: null,
  gitChangedCount: 0,
  gitLoading: !1,
  openGitDiffKey: null,
  gitFileDiffs: {},
  gitFileDiffLoading: {},
  gitSelection: {},
  gitOperationResult: null,
  gitDiscardConfirming: !1,
  gitVisibleLimit: 40,
  gitPageSize: 40,
  commitMessage: "",
  commitRunning: !1,
  discardRunning: !1,
  renamingId: null,
  renameTitle: "",
  toasts: [],
  toastId: 0,
  setStatus: (o) => a({ status: o }),
  setBridgeLog: (o) => a({ bridgeLog: o }),
  setBridgeLogLoading: (o) => a({ bridgeLogLoading: o }),
  setBridgeActionRunning: (o) => a({ bridgeActionRunning: o }),
  setCoreActionRunning: (o) => a({ coreActionRunning: o }),
  setAccount: (o) => a({ account: o }),
  setAccountLoading: (o) => a({ accountLoading: o }),
  setAccountActionRunning: (o) => a({ accountActionRunning: o }),
  setDeviceLogin: (o) => a({ deviceLogin: o }),
  setShowStatusDebug: (o) => a({ showStatusDebug: o }),
  setStatusDebugTab: (o) => a({ statusDebugTab: o }),
  setSettings: (o) => a({ settings: o }),
  setSettingsLoading: (o) => a({ settingsLoading: o }),
  setSettingsSaving: (o) => a({ settingsSaving: o }),
  setSettingsTab: (o) => a({ settingsTab: o }),
  setGitPanelOpen: (o) => a({ gitPanelOpen: o }),
  setGitSetupStatus: (o) => a({ gitSetupStatus: o }),
  setGitSetupLoading: (o) => a({ gitSetupLoading: o }),
  setGitSetupActionRunning: (o) => a({ gitSetupActionRunning: o }),
  setGitSetupResult: (o) => a({ gitSetupResult: o }),
  setGitChanges: (o) => a({ gitChanges: o, gitSelection: E1((o == null ? void 0 : o.files) || []), gitVisibleLimit: i().gitPageSize }),
  setGitChangedCount: (o) => a({ gitChangedCount: o }),
  setGitLoading: (o) => a({ gitLoading: o }),
  setOpenGitDiffKey: (o) => a({ openGitDiffKey: o }),
  setGitFileDiff: (o, r) => a((c) => ({ gitFileDiffs: { ...c.gitFileDiffs, [o]: r } })),
  setGitFileDiffLoading: (o, r) => a((c) => ({ gitFileDiffLoading: { ...c.gitFileDiffLoading, [o]: r } })),
  toggleGitFileSelected: (o) => a((r) => ({ gitSelection: R1(o, r.gitSelection), gitDiscardConfirming: !1 })),
  setGitFileSelected: (o, r) => a((c) => {
    const f = ba(o.path, o.old_path || "");
    if (r) return { gitSelection: { ...c.gitSelection, [f]: !0 }, gitDiscardConfirming: !1 };
    const { [f]: m, ...p } = c.gitSelection;
    return { gitSelection: p, gitDiscardConfirming: !1 };
  }),
  setGitOperationResult: (o) => a({ gitOperationResult: o }),
  setGitDiscardConfirming: (o) => a({ gitDiscardConfirming: o }),
  showMoreGitFiles: () => a((o) => ({ gitVisibleLimit: o.gitVisibleLimit + o.gitPageSize })),
  setCommitMessage: (o) => a({ commitMessage: o }),
  setCommitRunning: (o) => a({ commitRunning: o }),
  setDiscardRunning: (o) => a({ discardRunning: o }),
  setRenaming: (o, r = "") => a({ renamingId: o, renameTitle: r }),
  showToast: (o, r = "info") => {
    const c = i().toastId + 1;
    a((f) => ({
      toastId: c,
      toasts: [...f.toasts, { id: c, message: o, tone: r, entering: !0, exiting: !1 }].slice(-4)
    })), window.setTimeout(() => {
      a((f) => ({ toasts: f.toasts.map((m) => m.id === c ? { ...m, entering: !1 } : m) }));
    }, 280), window.setTimeout(() => {
      a((f) => ({ toasts: f.toasts.map((m) => m.id === c ? { ...m, exiting: !0 } : m) }));
    }, 3900), window.setTimeout(() => i().removeToast(c), 4200);
  },
  removeToast: (o) => a((r) => ({ toasts: r.toasts.filter((c) => c.id !== o) }))
})), L1 = {
  session_updated: "ha_codex/session_updated",
  session_deleted: "ha_codex/session_deleted",
  message_appended: "ha_codex/message_appended",
  message_delta: "ha_codex/message_delta",
  run_finished: "ha_codex/run_finished",
  approval_required: "ha_codex/approval_required",
  validation_finished: "ha_codex/validation_finished"
}, Q1 = 200;
class Y1 {
  constructor() {
    zn(this, "hass", null);
    zn(this, "panel", null);
    zn(this, "subscribed", !1);
    zn(this, "unsubscribers", []);
    zn(this, "reconnectTimer", null);
    zn(this, "deltaFrame", null);
    zn(this, "pendingDeltas", /* @__PURE__ */ new Map());
  }
  configure(i, o) {
    this.hass = i, this.panel = o, this.connect();
  }
  connect() {
    var r, c, f;
    if (this.subscribed || !((r = this.hass) != null && r.connection)) return;
    const i = ((f = (c = this.panel) == null ? void 0 : c.config) == null ? void 0 : f.events) || L1, o = Object.values(i).filter(Boolean);
    o.length && (this.subscribed = !0, o.forEach((m) => {
      var p, g;
      try {
        const x = (g = (p = this.hass) == null ? void 0 : p.connection) == null ? void 0 : g.subscribeEvents((S) => this.handleEvent(S), m);
        Promise.resolve(x).then((S) => {
          typeof S == "function" && this.unsubscribers.push(S);
        });
      } catch (x) {
        throw this.subscribed = !1, this.scheduleReconnect(), x;
      }
    }));
  }
  cleanup() {
    this.unsubscribers.forEach((i) => i()), this.unsubscribers = [], this.subscribed = !1, this.reconnectTimer && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null), this.deltaFrame !== null && (window.cancelAnimationFrame(this.deltaFrame), this.deltaFrame = null), this.pendingDeltas.clear();
  }
  scheduleReconnect() {
    this.reconnectTimer || (this.reconnectTimer = window.setTimeout(() => {
      this.reconnectTimer = null, this.connect();
    }, 1500));
  }
  handleEvent(i) {
    const o = i.data || {}, r = qt.getState();
    o.session_id && o.message && (this.flushDeltas(), r.appendMessage(o.session_id, o.message)), o.session_id && o.delta && this.queueDelta(o.session_id, o.delta, o.message_id), o.session && (this.flushDeltas(), r.upsertSession(o.session), this.recoverMissingMessages(o.session.id)), o.deleted_session_id && r.deleteSession(o.deleted_session_id), o.validation && (r.setValidation(o.validation), pt.getState().showToast(
      o.validation.status === "passed" ? "Validation passed" : "Validation finished",
      o.validation.status === "passed" ? "success" : "error"
    )), o.approval && (r.bumpRestartToast(), o.approval.command !== "ha core restart" && pt.getState().showToast("Codex needs approval for a shell command", "info"));
  }
  async recoverMissingMessages(i) {
    if (!this.hass) return;
    const o = qt.getState(), r = o.chatsById[i], c = Math.max(
      0,
      ...(o.messagesByChatId[i] || []).map((m) => Number(m.id)).filter((m) => Number.isFinite(m))
    ), f = Number((r == null ? void 0 : r.last_message_id) || 0);
    if (!(!f || f <= c))
      try {
        const m = await this.hass.callWS({
          type: "ha_codex/sessions/messages_after",
          session_id: i,
          after_id: c,
          ...c ? {} : { limit: Q1 }
        });
        qt.getState().appendMessages(i, m.messages || [], !1);
      } catch {
      }
  }
  queueDelta(i, o, r) {
    const c = `${i}:${r ?? "latest"}`, f = this.pendingDeltas.get(c);
    this.pendingDeltas.set(c, {
      chatId: i,
      messageId: r,
      delta: `${(f == null ? void 0 : f.delta) || ""}${o}`
    }), this.deltaFrame === null && (this.deltaFrame = window.requestAnimationFrame(() => {
      this.deltaFrame = null, this.flushDeltas();
    }));
  }
  flushDeltas() {
    if (!this.pendingDeltas.size) return;
    const i = [...this.pendingDeltas.values()];
    this.pendingDeltas.clear();
    const o = qt.getState();
    i.forEach((r) => o.appendDelta(r.chatId, r.delta, r.messageId));
  }
}
const Ug = new Y1();
function pn(a) {
  return String(a || "").replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, "");
}
function eb(a, i = {}) {
  const o = nb(a);
  if (o === null) return "";
  const r = new Date(o * 1e3), c = Math.floor((Date.now() - r.getTime()) / 1e3), f = Math.abs(c), m = c >= 0 ? "ago" : "", p = c < 0 ? "in " : "";
  if (f < 60) return c < 0 && !i.pastOnly ? "in less than a minute" : "just now";
  if (f < 3600) {
    const w = Math.floor(f / 60);
    return `${p}${w} minute${w === 1 ? "" : "s"}${m ? ` ${m}` : ""}`;
  }
  if (f < 86400) {
    const w = Math.floor(f / 3600);
    return `${p}${w} hour${w === 1 ? "" : "s"}${m ? ` ${m}` : ""}`;
  }
  if (f < 172800 && c >= 0) return "yesterday";
  if (f < 172800 && !i.pastOnly) return "tomorrow";
  if (c < 0 && !i.pastOnly && f < 2592e3) {
    const w = Math.floor(f / 86400);
    return `in ${w} day${w === 1 ? "" : "s"}`;
  }
  const g = r.getFullYear(), x = String(r.getMonth() + 1).padStart(2, "0"), S = String(r.getDate()).padStart(2, "0");
  return `${g}-${x}-${S}`;
}
function ir(a) {
  return eb(a, { pastOnly: !0 });
}
function V1(a) {
  const i = Number(a);
  if (!Number.isFinite(i) || i < 0) return "";
  const o = Math.floor(i / 86400), r = Math.floor(i % 86400 / 3600), c = Math.floor(i % 3600 / 60);
  return o > 0 ? `${o}d ${r}h` : r > 0 ? `${r}h ${c}m` : c > 0 ? `${c}m` : `${Math.floor(i)}s`;
}
function Gs(a) {
  const i = nb(a);
  return i === null ? "" : new Date(i * 1e3).toLocaleString();
}
function nb(a) {
  if (a == null || a === "") return null;
  const i = Number(a);
  return Number.isFinite(i) && i > 0 ? i : null;
}
function Pt(a) {
  if (a instanceof Error && a.message) return a.message;
  if (typeof a == "object" && a && "code" in a) {
    const i = a;
    return `${i.name || "Error"} code ${i.code}`;
  }
  return String(a);
}
async function Id(a) {
  var o;
  if ((o = navigator.clipboard) != null && o.writeText) {
    await navigator.clipboard.writeText(a);
    return;
  }
  const i = document.createElement("textarea");
  i.value = a, i.setAttribute("readonly", ""), i.style.position = "fixed", i.style.left = "-9999px", i.style.top = "0", document.body.appendChild(i), i.focus(), i.select();
  try {
    if (!document.execCommand("copy")) throw new Error("Copy command failed");
  } finally {
    i.remove();
  }
}
function Zd(a) {
  var o;
  const i = (o = a == null ? void 0 : a.metadata) == null ? void 0 : o.pending_plan;
  return !i || i.status !== "pending" || !i.id ? null : i;
}
function ab(a) {
  var o;
  const i = (o = a == null ? void 0 : a.metadata) == null ? void 0 : o.pending_plan;
  return !!(i && i.status === "planning");
}
function X1(a) {
  var i;
  return String(((i = Zd(a)) == null ? void 0 : i.prompt) || "").trim();
}
function K1() {
  var a;
  return (a = window.crypto) != null && a.randomUUID ? `local-${window.crypto.randomUUID()}` : `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function Lg(a, i) {
  var r;
  const o = (r = a.results) == null ? void 0 : r.find((c) => c.ok === !1);
  return pn([o == null ? void 0 : o.stdout, o == null ? void 0 : o.stderr, a.stdout, a.stderr].filter(Boolean).join(`
`)).trim() || i;
}
function md(a, i) {
  var r;
  const o = (r = a.results) == null ? void 0 : r.find((c) => c.ok === !1);
  return pn([o == null ? void 0 : o.stdout, o == null ? void 0 : o.stderr, a.stdout, a.stderr].filter(Boolean).join(`
`)).trim() || i;
}
function Qg(a) {
  var i;
  return JSON.stringify(((i = a == null ? void 0 : a.metadata) == null ? void 0 : i.run_settings) || null);
}
function I1(a) {
  return I.useMemo(() => {
    const i = () => pt.getState(), o = () => qt.getState();
    let r = null;
    const c = async (y) => {
      const [D, v] = await Promise.all([a.gitStatus(), a.gitDiff()]), M = pn(D.stdout || "").split(`
`).filter((K) => K.trim()), k = ar(M.map((K) => {
        const tt = K.slice(0, 2);
        return {
          path: K.slice(3),
          code: tt,
          status: Hg(tt),
          added_lines: null,
          deleted_lines: null
        };
      }));
      return {
        ok: !!(D.ok && v.ok),
        returncode: v.returncode,
        stdout: D.stdout,
        stderr: [D.stderr, v.stderr, Pt(y)].filter(Boolean).join(`
`),
        changed_count: k.length,
        files: k,
        legacy: !0
      };
    }, f = async () => {
      const y = await a.listSessions();
      o().setSessions(y.sessions || []);
    }, m = async () => {
      try {
        i().setStatus(await a.status());
      } catch (y) {
        i().setStatus({ error: Pt(y) });
      }
    }, p = async () => {
      i().setAccountLoading(!0);
      try {
        i().setAccount(await a.accountStatus());
      } catch (y) {
        i().setAccount({ ok: !1, logged_in: !1, error: Pt(y) });
      } finally {
        i().setAccountLoading(!1);
      }
    }, g = () => {
      r !== null && window.clearInterval(r), r = window.setInterval(() => {
        a.accountDeviceLoginStatus().then(async (y) => {
          i().setDeviceLogin(y), y.status === "succeeded" ? (r !== null && window.clearInterval(r), r = null, await Promise.all([p(), m()]), i().showToast("Codex account connected", "success")) : (y.status === "failed" || y.status === "canceled") && (r !== null && window.clearInterval(r), r = null, y.status === "failed" && i().showToast(y.error || "Device login failed", "error"));
        }).catch((y) => {
          r !== null && window.clearInterval(r), r = null, i().showToast(Pt(y), "error");
        });
      }, 2e3);
    }, x = async () => {
      i().setSettingsLoading(!0);
      try {
        const y = await a.settings();
        i().setSettings(Xo(y.settings));
      } catch (y) {
        i().showToast(`Settings failed to load: ${Pt(y)}`, "error");
      } finally {
        i().setSettingsLoading(!1);
      }
    }, S = async () => {
      i().setBridgeLogLoading(!0);
      try {
        i().setBridgeLog(await a.bridgeLog());
      } catch (y) {
        i().setBridgeLog({ error: Pt(y), lines: "" });
      } finally {
        i().setBridgeLogLoading(!1);
      }
    }, w = async () => {
      i().setBridgeLogLoading(!0);
      try {
        const y = await a.bridgeLogClear();
        i().setBridgeLog(y), y.error ? i().showToast(`Bridge log clear failed: ${y.error}`, "error") : i().showToast("Bridge log cleared", "success");
      } catch (y) {
        i().showToast(`Bridge log clear failed: ${Pt(y)}`, "error");
      } finally {
        i().setBridgeLogLoading(!1);
      }
    }, C = async (y = !0) => {
      y && i().setGitSetupLoading(!0);
      try {
        const D = await a.gitSetupStatus();
        return i().setGitSetupStatus(D), pa(D) || (i().setGitPanelOpen(!1), i().setGitChangedCount(0), i().setGitChanges(null)), D;
      } catch (D) {
        const v = { ok: !1, setup_complete: !1, missing: ["setup status"], repo_error: Pt(D) };
        return i().setGitSetupStatus(v), i().setGitPanelOpen(!1), i().setGitChangedCount(0), v;
      } finally {
        y && i().setGitSetupLoading(!1);
      }
    }, A = async () => {
      if (!pa(i().gitSetupStatus)) {
        i().setGitChangedCount(0);
        return;
      }
      try {
        const y = await a.gitStatus(), D = pn(y.stdout || "").split(`
`).filter((v) => v.trim()).map((v) => ({ path: v.slice(3), status: Hg(v.slice(0, 2)) }));
        i().setGitChangedCount(Hs(D));
      } catch {
        i().setGitChangedCount(0);
      }
    }, N = async (y = !0) => {
      if (!i().gitLoading) {
        if (!pa(i().gitSetupStatus)) {
          i().setGitPanelOpen(!1), i().setGitChanges(null), i().setGitChangedCount(0), y && i().showToast("Set up Git in Settings before reviewing changes", "error");
          return;
        }
        i().setGitLoading(!0);
        try {
          let D;
          try {
            D = await a.gitChanges();
          } catch (v) {
            D = await c(v);
          }
          i().setGitChanges(D), i().setOpenGitDiffKey(null), i().setGitDiscardConfirming(!1), i().setGitChangedCount(Hs(D.files || [])), y && i().showToast("Git changes refreshed", "success");
        } catch (D) {
          i().setGitChanges({ ok: !1, changed_count: 0, files: [], stderr: Pt(D) }), y && i().showToast(`Git reload failed: ${Pt(D)}`, "error");
        } finally {
          i().setGitLoading(!1);
        }
      }
    }, B = async () => {
      const y = K1(), D = {
        id: y,
        title: "New chat",
        messages: [],
        approvals: [],
        codex_session_id: null,
        status: "idle",
        validation: null,
        archived: o().showArchived,
        archived_at: o().showArchived ? Date.now() / 1e3 : null,
        created_at: Date.now() / 1e3,
        updated_at: Date.now() / 1e3,
        metadata: { optimistic: !0 }
      };
      o().upsertSession(D), o().setActiveId(y);
      try {
        const v = await a.createSession(), M = o().drafts[y], k = o().contextByChatId[y] || [];
        o().deleteSession(y), o().upsertSession(v.session), o().setActiveId(v.session.id), M !== void 0 && o().setDraft(v.session.id, M), k.forEach((K) => o().addContextItem(v.session.id, K));
      } catch (v) {
        o().deleteSession(y), i().showToast(Pt(v), "error");
      }
    }, z = (y, D = []) => typeof y == "string" ? Ms(y, D) : y, _ = async (y, D) => {
      const v = o().chatsById[y];
      if (!v) return;
      const M = o().contextByChatId[y] || [], k = z(D, M);
      if (!k.prompt.trim()) return;
      if (Bo(v)) {
        o().enqueueMessage(y, k), Mg("queued") && o().clearContext(y), i().showToast("Message queued", "info");
        return;
      }
      const K = C1(k.context), tt = {
        role: "user",
        content: k.prompt,
        created_at: Date.now() / 1e3,
        metadata: {
          optimistic: !0,
          ...k.metadata || {},
          ...K.length ? { context: K } : {}
        }
      };
      o().appendMessage(y, tt);
      const ct = o().chatsById[y] || v;
      o().upsertSession({ ...ct, status: "running", updated_at: Date.now() / 1e3 });
      try {
        const rt = await a.send(y, k);
        o().upsertSession(rt.session), Mg("sent") && o().clearContext(y);
      } catch (rt) {
        i().showToast(Pt(rt), "error"), await f();
      }
    }, R = async (y, D) => {
      const v = D.trim();
      v && (o().clearQuestionDraft(y), await _(y, `Answer to your question: ${v}`));
    }, L = async (y, D) => {
      const v = o().chatsById[y];
      if (v) {
        o().upsertSession({ ...v, archived: D, archived_at: D ? Date.now() / 1e3 : null, updated_at: Date.now() / 1e3 }), D || (o().setShowArchived(!1), o().setActiveId(y));
        try {
          const M = await a.archive(y, D);
          M.deleted_session_id ? (o().deleteSession(M.deleted_session_id), i().showToast("Empty chat removed", "success")) : M.session && (o().upsertSession(M.session), i().showToast(D ? "Chat archived" : "Chat restored", "success"));
        } catch (M) {
          o().upsertSession(v), i().showToast(Pt(M), "error");
        }
      }
    }, q = async (y) => {
      const v = (o().queuesByChatId[y] || [])[0];
      if (!(!v || o().queueStartsByChatId[y])) {
        o().setQueueStarting(y, !0);
        try {
          const M = o().chatsById[y], k = Ms(v.prompt || v.content, v.context || [], {
            runPrompt: v.runPrompt,
            metadata: v.metadata,
            runSettings: v.runSettings
          }), K = M && (Bo(M) || Qd(M)) ? await a.steer(y, k) : await a.send(y, k);
          o().removeQueuedMessage(y, v.id), o().upsertSession(K.session), i().showToast("Started queued message", "success");
        } catch (M) {
          i().showToast(Pt(M), "error");
        } finally {
          o().setQueueStarting(y, !1);
        }
      }
    };
    return {
      loadInitial: async () => {
        await Promise.all([f(), m(), x(), p(), C(!1)]), await A();
      },
      loadSessions: f,
      loadStatus: m,
      loadAccountStatus: p,
      loadSettings: x,
      loadBridgeLog: S,
      clearBridgeLog: w,
      loadGitSetupStatus: C,
      loadGitChanges: N,
      createSession: B,
      sendPrompt: _,
      answerQuestion: R,
      startRename: (y) => {
        const D = o().chatsById[y];
        i().setRenaming(y, (D == null ? void 0 : D.title) || "");
      },
      saveRename: async (y) => {
        const D = i().renameTitle.trim();
        if (!D) return;
        const v = await a.rename(y, D);
        i().setRenaming(null), o().upsertSession(v.session), i().showToast("Chat renamed", "success");
      },
      archiveSession: L,
      cancelSession: async (y) => {
        const D = await a.cancel(y);
        o().upsertSession(D.session), i().showToast("Run canceled", "success");
      },
      retryContinueSession: async (y) => {
        const D = await a.retryContinue(y);
        o().upsertSession(D.session), i().showToast("Retrying chat", "info");
      },
      editQueuedMessage: (y, D) => {
        const v = (o().queuesByChatId[y] || []).find((M) => M.id === D);
        v && (o().removeQueuedMessage(y, D), o().setDraft(y, v.content), o().setContextItems(y, v.context || []));
      },
      clearQueuedMessage: (y, D) => o().removeQueuedMessage(y, D),
      steerQueuedMessage: async (y, D) => {
        const v = (o().queuesByChatId[y] || []).find((K) => K.id === D);
        if (!v) return;
        const M = Ms(v.prompt || v.content, v.context || [], {
          runPrompt: v.runPrompt,
          metadata: v.metadata,
          runSettings: v.runSettings
        }), k = await a.steer(y, M);
        o().removeQueuedMessage(y, D), o().upsertSession(k.session), i().showToast("Steering queued for this run", "success");
      },
      respondApproval: async (y, D, v, M) => {
        const k = await a.respondApproval(y, D, v);
        o().upsertSession(k.session), i().showToast(M || (v ? "Action approved" : "Action canceled"), "success");
      },
      respondRunPlan: async (y, D, v) => {
        var K;
        const M = o().chatsById[y], k = v === "revise" ? X1(M) : "";
        if (v === "approve" && M) {
          const tt = (K = M.metadata) == null ? void 0 : K.pending_plan;
          o().upsertSession({
            ...M,
            metadata: {
              ...M.metadata,
              pending_plan: typeof tt == "object" && tt !== null ? { ...tt, status: "approved" } : tt
            }
          });
        }
        try {
          const tt = await a.respondRunPlan(y, D, v);
          o().upsertSession(tt.session), k && o().setDraft(y, k), i().showToast(v === "approve" ? "Run plan approved" : v === "revise" ? "Prompt ready to revise" : "Run plan canceled", "success");
        } catch (tt) {
          throw v === "approve" && M && o().upsertSession(M), tt;
        }
      },
      updateSettings: async (y) => {
        i().setSettingsSaving(!0);
        try {
          const D = await a.updateSettings(y);
          i().setSettings(Xo(D.settings)), i().showToast("Settings saved", "success");
        } finally {
          i().setSettingsSaving(!1);
        }
      },
      updateSessionRunSettings: async (y, D) => {
        const v = o().chatsById[y];
        if (!v) return;
        const M = Kd(D, i().settings.defaults), k = JSON.stringify(M);
        o().upsertSession({
          ...v,
          metadata: {
            ...v.metadata || {},
            run_settings: M
          },
          updated_at: Date.now() / 1e3
        });
        try {
          const K = await a.updateSessionRunSettings(y, M);
          Qg(o().chatsById[y]) === k && o().upsertSession(K.session);
        } catch (K) {
          throw Qg(o().chatsById[y]) === k && o().upsertSession(v), K;
        }
      },
      rollbackRun: async (y, D) => {
        const v = await a.rollbackRun(y, D);
        if (await f(), pa(i().gitSetupStatus) && await N(!1), !v.ok) {
          i().showToast(v.reason || "Rollback needs manual review", "error");
          return;
        }
        i().showToast("Run rolled back", "success");
      },
      scheduleRestartAfterChats: () => {
        o().setScheduledRestart(!0), o().bumpRestartToast(), i().showToast("Restart scheduled after chats complete", "success");
      },
      cancelScheduledRestart: () => {
        o().setScheduledRestart(!1), i().showToast("Scheduled restart canceled", "success");
      },
      maybeRunScheduledRestart: async () => {
        const y = o();
        if (!y.scheduledRestart || (Object.values(y.chatsById).forEach((k) => {
          (y.queuesByChatId[k.id] || []).length && !Bo(k) && !ni(k).length && !Qo(k) && !Yo(k) && q(k.id);
        }), Object.values(y.chatsById).some(
          (k) => (y.queuesByChatId[k.id] || []).length || y.queueStartsByChatId[k.id] || Bo(k) || ni(k).length || Qo(k) || Yo(k)
        ))) return;
        const v = y.chatsById ? Object.values(y.chatsById).flatMap(
          (k) => (k.approvals || []).filter((K) => K.status === "pending" && K.command === "ha core restart").map((K) => ({ session: k, approval: K }))
        )[0] : null;
        if (!v) {
          o().setScheduledRestart(!1);
          return;
        }
        o().setScheduledRestart(!1);
        const M = await a.respondApproval(v.session.id, v.approval.id, !0);
        o().upsertSession(M.session);
      },
      toggleGitPanel: async () => {
        if (!pa(i().gitSetupStatus) && (await C(), !pa(i().gitSetupStatus))) {
          i().setSettingsTab("git"), i().setShowStatusDebug(!0), i().showToast("Set up Git before opening the review panel", "error");
          return;
        }
        const y = !i().gitPanelOpen;
        i().setGitPanelOpen(y), y && !i().gitChanges && await N(!1);
      },
      generateGitSetupKey: async () => {
        i().setGitSetupActionRunning(!0), i().setGitSetupResult(null);
        try {
          const y = await a.gitSetupGenerateKey();
          if (i().setGitSetupResult(y), y.status && i().setGitSetupStatus(y.status), !y.ok) throw new Error(md(y, "SSH key generation failed"));
          i().showToast("Git SSH key ready", "success");
        } finally {
          i().setGitSetupActionRunning(!1);
        }
      },
      saveGitSetupRemote: async (y) => {
        const D = y.trim();
        if (!D) {
          i().showToast("Remote URL is required", "error");
          return;
        }
        i().setGitSetupActionRunning(!0), i().setGitSetupResult(null);
        try {
          const v = await a.gitSetupSetRemote(D);
          if (i().setGitSetupResult(v), v.status && i().setGitSetupStatus(v.status), !v.ok) throw new Error(md(v, "Remote setup failed"));
          i().showToast("Git remote linked", "success"), await A();
        } finally {
          i().setGitSetupActionRunning(!1);
        }
      },
      pullGitSetupRemote: async () => {
        i().setGitSetupActionRunning(!0), i().setGitSetupResult(null);
        try {
          const y = await a.gitSetupPull();
          if (i().setGitSetupResult(y), y.status && i().setGitSetupStatus(y.status), !y.ok) throw new Error(md(y, "Git pull failed"));
          i().showToast("Git pull completed", "success"), await A();
        } finally {
          i().setGitSetupActionRunning(!1);
        }
      },
      showMoreGitFiles: () => i().showMoreGitFiles(),
      toggleGitFileDiff: async (y, D = "") => {
        const v = ba(y, D);
        if (i().openGitDiffKey === v) {
          i().setOpenGitDiffKey(null);
          return;
        }
        if (i().setOpenGitDiffKey(v), !(i().gitFileDiffs[v] || i().gitFileDiffLoading[v])) {
          i().setGitFileDiffLoading(v, !0);
          try {
            i().setGitFileDiff(v, await a.gitFileDiff(y, D));
          } catch (M) {
            i().setGitFileDiff(v, { ok: !1, path: y, old_path: D, patch: "", stderr: Pt(M) });
          } finally {
            i().setGitFileDiffLoading(v, !1);
          }
        }
      },
      commitAndPush: async (y) => {
        var M;
        const D = y.trim(), v = Ad(((M = i().gitChanges) == null ? void 0 : M.files) || [], i().gitSelection);
        if (!D) {
          i().showToast("Commit message is required", "error");
          return;
        }
        if (!v.length) {
          i().setGitOperationResult({ ok: !1, stderr: "No files selected." }), i().showToast("Select at least one file", "error");
          return;
        }
        i().setCommitRunning(!0), i().setGitOperationResult(null);
        try {
          const k = await a.commitPush(D, v);
          if (i().setGitOperationResult(k), !k.ok)
            throw new Error(Lg(k, "Commit and push failed"));
          i().setCommitMessage(""), i().setGitDiscardConfirming(!1), i().showToast("Changes committed and pushed", "success"), await N(!1), i().setGitOperationResult(k);
        } catch (k) {
          throw i().gitOperationResult || i().setGitOperationResult({ ok: !1, stderr: Pt(k) }), k;
        } finally {
          i().setCommitRunning(!1);
        }
      },
      discardSelectedGitFiles: async () => {
        var D;
        const y = Ad(((D = i().gitChanges) == null ? void 0 : D.files) || [], i().gitSelection);
        if (!y.length) {
          i().setGitOperationResult({ ok: !1, stderr: "No files selected." }), i().showToast("Select at least one file", "error");
          return;
        }
        i().setDiscardRunning(!0), i().setGitOperationResult(null);
        try {
          const v = await a.discard(y);
          if (i().setGitOperationResult(v), !v.ok)
            throw new Error(Lg(v, "Discard failed"));
          i().setGitDiscardConfirming(!1), i().showToast("Selected changes discarded", "success"), await N(!1), i().setGitOperationResult(v);
        } catch (v) {
          throw i().gitOperationResult || i().setGitOperationResult({ ok: !1, stderr: Pt(v) }), v;
        } finally {
          i().setDiscardRunning(!1);
        }
      },
      runValidation: async (y) => {
        if (!o().validationRunning) {
          o().setValidationRunning(!0);
          try {
            const D = await a.runValidation(y);
            o().setValidation(D.validation);
          } catch (D) {
            throw o().setValidation({ status: "failed", stderr: Pt(D), created_at: Date.now() / 1e3 }), D;
          } finally {
            o().setValidationRunning(!1);
          }
        }
      },
      reloadValidationDomains: async (y) => {
        if (!(await a.reloadValidationDomains(y)).ok) throw new Error("Reload failed");
        i().showToast(`Reloaded ${y.join(", ")}`, "success");
      },
      startOrRestartBridge: async () => {
        var D;
        const y = ((D = i().status.runtime) == null ? void 0 : D.bridge_available) === !0;
        i().setBridgeActionRunning(!0);
        try {
          const v = await a.bridgeRestart();
          if (!(v != null && v.ok)) throw new Error((v == null ? void 0 : v.error) || "Bridge helper failed");
          await Promise.all([m(), S()]), i().showToast(y ? "Bridge restarted" : "Bridge started", "success");
        } catch (v) {
          i().showToast(Pt(v), "error");
        } finally {
          i().setBridgeActionRunning(!1);
        }
      },
      restartHomeAssistant: async () => {
        if (window.confirm("Restart Home Assistant Core now?")) {
          i().setCoreActionRunning(!0);
          try {
            const y = await a.coreRestart();
            if (!(y != null && y.ok)) throw new Error((y == null ? void 0 : y.error) || "Home Assistant restart failed");
            i().showToast("Home Assistant restart requested", "success");
          } finally {
            i().setCoreActionRunning(!1);
          }
        }
      },
      startDeviceLogin: async () => {
        i().setAccountActionRunning(!0);
        try {
          const y = await a.accountDeviceLoginStart();
          if (i().setDeviceLogin(y), y.status === "pending")
            g(), i().showToast("Device login started", "info");
          else if (y.status === "succeeded")
            await Promise.all([p(), m()]), i().showToast("Codex account connected", "success");
          else if (!y.ok)
            throw new Error(y.error || "Device login failed");
        } finally {
          i().setAccountActionRunning(!1);
        }
      },
      cancelDeviceLogin: async () => {
        const y = await a.accountDeviceLoginCancel();
        r !== null && window.clearInterval(r), r = null, i().setDeviceLogin(y), i().showToast("Device login canceled", "success");
      },
      logoutAccount: async () => {
        i().setAccountActionRunning(!0);
        try {
          const y = await a.accountLogout();
          if (!y.ok) throw new Error(y.error || "Logout failed");
          i().setAccount(y.account || await a.accountStatus()), i().setDeviceLogin(null), await m(), i().showToast("Codex account logged out", "success");
        } finally {
          i().setAccountActionRunning(!1);
        }
      }
    };
  }, [a]);
}
var Z1 = Ox();
const $1 = /* @__PURE__ */ Dx(Z1), Vs = 0, ii = 1, Bl = 2, ib = 4;
function Yg(a) {
  return () => a;
}
function F1(a) {
  a();
}
function lb(a, i) {
  return (o) => a(i(o));
}
function Vg(a, i) {
  return () => a(i);
}
function J1(a, i) {
  return (o) => a(i, o);
}
function $d(a) {
  return a !== void 0;
}
function W1(...a) {
  return () => {
    a.map(F1);
  };
}
function kl() {
}
function Xs(a, i) {
  return i(a), a;
}
function P1(a, i) {
  return i(a);
}
function he(...a) {
  return a;
}
function te(a, i) {
  return a(ii, i);
}
function Dt(a, i) {
  a(Vs, i);
}
function Fd(a) {
  a(Bl);
}
function xe(a) {
  return a(ib);
}
function bt(a, i) {
  return te(a, J1(i, Vs));
}
function kn(a, i) {
  const o = a(ii, (r) => {
    o(), i(r);
  });
  return o;
}
function Xg(a) {
  let i, o;
  return (r) => (c) => {
    i = c, o && clearTimeout(o), o = setTimeout(() => {
      r(i);
    }, a);
  };
}
function ob(a, i) {
  return a === i;
}
function fe(a = ob) {
  let i;
  return (o) => (r) => {
    a(i, r) || (i = r, o(r));
  };
}
function Tt(a) {
  return (i) => (o) => {
    a(o) && i(o);
  };
}
function ft(a) {
  return (i) => lb(i, a);
}
function Kn(a) {
  return (i) => () => {
    i(a);
  };
}
function nt(a, ...i) {
  const o = tw(...i);
  return ((r, c) => {
    switch (r) {
      case Bl:
        Fd(a);
        return;
      case ii:
        return te(a, o(c));
    }
  });
}
function In(a, i) {
  return (o) => (r) => {
    o(i = a(i, r));
  };
}
function Bi(a) {
  return (i) => (o) => {
    a > 0 ? a-- : i(o);
  };
}
function xa(a) {
  let i = null, o;
  return (r) => (c) => {
    i = c, !o && (o = setTimeout(() => {
      o = void 0, r(i);
    }, a));
  };
}
function Ot(...a) {
  const i = new Array(a.length);
  let o = 0, r = null;
  const c = 2 ** a.length - 1;
  return a.forEach((f, m) => {
    const p = 2 ** m;
    te(f, (g) => {
      const x = o;
      o |= p, i[m] = g, x !== c && o === c && r && (r(), r = null);
    });
  }), (f) => (m) => {
    const p = () => {
      f([m].concat(i));
    };
    o === c ? p() : r = p;
  };
}
function tw(...a) {
  return (i) => a.reduceRight(P1, i);
}
function ew(a) {
  let i, o;
  const r = () => i == null ? void 0 : i();
  return function(c, f) {
    switch (c) {
      case ii:
        return f ? o === f ? void 0 : (r(), o = f, i = te(a, f), i) : (r(), kl);
      case Bl:
        r(), o = null;
        return;
    }
  };
}
function lt(a) {
  let i = a;
  const o = Yt();
  return ((r, c) => {
    switch (r) {
      case Vs:
        i = c;
        break;
      case ii: {
        c(i);
        break;
      }
      case ib:
        return i;
    }
    return o(r, c);
  });
}
function Xe(a, i) {
  return Xs(lt(i), (o) => bt(a, o));
}
function Yt() {
  const a = [];
  return ((i, o) => {
    switch (i) {
      case Vs:
        a.slice().forEach((r) => {
          r(o);
        });
        return;
      case Bl:
        a.splice(0, a.length);
        return;
      case ii:
        return a.push(o), () => {
          const r = a.indexOf(o);
          r > -1 && a.splice(r, 1);
        };
    }
  });
}
function mn(a) {
  return Xs(Yt(), (i) => bt(a, i));
}
function $t(a, i = [], { singleton: o } = { singleton: !0 }) {
  return {
    constructor: a,
    dependencies: i,
    id: nw(),
    singleton: o
  };
}
const nw = () => Symbol();
function aw(a) {
  const i = /* @__PURE__ */ new Map(), o = ({ constructor: r, dependencies: c, id: f, singleton: m }) => {
    if (m && i.has(f))
      return i.get(f);
    const p = r(c.map((g) => o(g)));
    return m && i.set(f, p), p;
  };
  return o(a);
}
function Ae(...a) {
  const i = Yt(), o = new Array(a.length);
  let r = 0;
  const c = 2 ** a.length - 1;
  return a.forEach((f, m) => {
    const p = 2 ** m;
    te(f, (g) => {
      o[m] = g, r |= p, r === c && Dt(i, o);
    });
  }), function(f, m) {
    switch (f) {
      case Bl: {
        Fd(i);
        return;
      }
      case ii:
        return r === c && m(o), te(i, m);
    }
  };
}
function _t(a, i = ob) {
  return nt(a, fe(i));
}
function Ed(...a) {
  return function(i, o) {
    switch (i) {
      case Bl:
        return;
      case ii:
        return W1(...a.map((r) => te(r, o)));
    }
  };
}
const Me = {
  /** Detailed debugging information including item measurements */
  DEBUG: 0,
  /** General informational messages */
  INFO: 1,
  /** Warning messages for potential issues */
  WARN: 2,
  /** Error messages for failures (default level) */
  ERROR: 3
}, iw = {
  [Me.DEBUG]: "debug",
  [Me.ERROR]: "error",
  [Me.INFO]: "log",
  [Me.WARN]: "warn"
}, lw = () => typeof globalThis > "u" ? window : globalThis, li = $t(
  () => {
    const a = lt(Me.ERROR);
    return {
      log: lt((i, o, r = Me.INFO) => {
        const c = lw().VIRTUOSO_LOG_LEVEL ?? xe(a);
        r >= c && console[iw[r]](
          "%creact-virtuoso: %c%s %o",
          "color: #0253b3; font-weight: bold",
          "color: initial",
          i,
          o
        );
      }),
      logLevel: a
    };
  },
  [],
  { singleton: !0 }
), Rd = /* @__PURE__ */ new WeakMap();
function rb(a) {
  return "self" in a ? a.document.documentElement : a;
}
function ow(a) {
  const i = rb(a), o = Rd.get(i);
  if (o !== void 0)
    return o;
  const r = i.ownerDocument.defaultView.getComputedStyle(i).direction === "rtl";
  return Rd.set(i, r), r;
}
function Kg(a) {
  Rd.delete(rb(a));
}
function sb(a, i) {
  return ow(a) ? -i : i;
}
const zi = sb;
function Ig(a, i) {
  return sb(a, i);
}
function ki(a, i, o) {
  return Jd(a, i, o).callbackRef;
}
function Jd(a, i, o) {
  const r = dt.useRef(null);
  let c = (m) => {
  };
  const f = dt.useMemo(() => typeof ResizeObserver < "u" ? new ResizeObserver((m) => {
    const p = () => {
      const g = m[0].target;
      g.offsetParent !== null && a(g);
    };
    o ? p() : requestAnimationFrame(p);
  }) : null, [a, o]);
  return c = (m) => {
    m && i ? (f == null || f.observe(m), r.current = m) : (r.current && (f == null || f.unobserve(r.current)), r.current = null);
  }, { callbackRef: c, ref: r };
}
function rw(a, i, o, r, c, f, m, p, g) {
  const x = dt.useCallback(
    (S) => {
      const w = sw(S.children, i, p ? "offsetWidth" : "offsetHeight", c);
      let C = S.parentElement;
      for (; C.dataset.virtuosoScroller === void 0; )
        C = C.parentElement;
      const A = C.lastElementChild.dataset.viewportType === "window";
      let N;
      A && (N = C.ownerDocument.defaultView);
      const B = m ? p ? m.scrollWidth : m.scrollHeight : A ? p ? N.document.documentElement.scrollWidth : N.document.documentElement.scrollHeight : p ? C.scrollWidth : C.scrollHeight, z = m ? p ? m.offsetWidth : m.offsetHeight : A ? p ? N.innerWidth : N.innerHeight : p ? C.offsetWidth : C.offsetHeight, _ = m ? p ? zi(m, m.scrollLeft) : m.scrollTop : A ? p ? zi(N, N.scrollX || N.document.documentElement.scrollLeft) : N.scrollY || N.document.documentElement.scrollTop : p ? zi(C, C.scrollLeft) : C.scrollTop;
      r({
        scrollHeight: B,
        scrollTop: Math.max(_, 0),
        viewportHeight: z
      }), f == null || f(
        p ? Zg("column-gap", getComputedStyle(S).columnGap, c) : Zg("row-gap", getComputedStyle(S).rowGap, c)
      ), w !== null && a(w);
    },
    [a, i, c, f, m, r, p]
  );
  return Jd(x, o, g);
}
function sw(a, i, o, r) {
  const c = a.length;
  if (c === 0)
    return null;
  const f = [];
  for (let m = 0; m < c; m++) {
    const p = a.item(m);
    if (p.dataset.index === void 0)
      continue;
    const g = parseInt(p.dataset.index), x = parseFloat(p.dataset.knownSize), S = i(p, o);
    if (S === 0 && r("Zero-sized element, this should not happen", { child: p }, Me.ERROR), S === x)
      continue;
    const w = f[f.length - 1];
    f.length === 0 || w.size !== S || w.endIndex !== g - 1 ? f.push({ endIndex: g, size: S, startIndex: g }) : f[f.length - 1].endIndex++;
  }
  return f;
}
function Zg(a, i, o) {
  return i !== "normal" && (i == null ? void 0 : i.endsWith("px")) !== !0 && o(`${a} was not resolved to pixel value correctly`, i, Me.WARN), i === "normal" ? 0 : parseInt(i ?? "0", 10);
}
function ub(a, i, o) {
  const r = dt.useRef(null), c = dt.useCallback(
    (g) => {
      if (!(g != null && g.offsetParent))
        return;
      const x = g.getBoundingClientRect(), S = x.width;
      let w, C;
      if (i) {
        const A = i.getBoundingClientRect(), N = x.top - A.top;
        C = A.height - Math.max(0, N), w = N + i.scrollTop;
      } else {
        const A = m.current.ownerDocument.defaultView;
        C = A.innerHeight - Math.max(0, x.top), w = x.top + A.scrollY;
      }
      r.current = {
        listHeight: x.height,
        offsetTop: w,
        visibleHeight: C,
        visibleWidth: S
      }, a(r.current);
    },
    // oxlint-disable-next-line exhaustive-deps
    [a, i]
  ), { callbackRef: f, ref: m } = Jd(c, !0, o), p = dt.useCallback(() => {
    c(m.current);
  }, [c, m]);
  return dt.useEffect(() => {
    var x;
    if (i) {
      i.addEventListener("scroll", p);
      const S = new ResizeObserver(() => {
        requestAnimationFrame(p);
      });
      return S.observe(i), () => {
        i.removeEventListener("scroll", p), S.unobserve(i);
      };
    }
    const g = (x = m.current) == null ? void 0 : x.ownerDocument.defaultView;
    return g == null || g.addEventListener("scroll", p), g == null || g.addEventListener("resize", p), () => {
      g == null || g.removeEventListener("scroll", p), g == null || g.removeEventListener("resize", p);
    };
  }, [p, i, m]), f;
}
const Ze = $t(
  () => {
    const a = Yt(), i = Yt(), o = lt(0), r = Yt(), c = lt(0), f = Yt(), m = Yt(), p = lt(0), g = lt(0), x = lt(0), S = lt(0), w = Yt(), C = Yt(), A = lt(!1), N = lt(!1), B = lt(!1);
    return bt(
      nt(
        a,
        ft(({ scrollTop: z }) => z)
      ),
      i
    ), bt(
      nt(
        a,
        ft(({ scrollHeight: z }) => z)
      ),
      m
    ), bt(i, c), {
      deviation: o,
      fixedFooterHeight: x,
      fixedHeaderHeight: g,
      footerHeight: S,
      headerHeight: p,
      horizontalDirection: N,
      scrollBy: C,
      // input
      scrollContainerState: a,
      scrollHeight: m,
      scrollingInProgress: A,
      // signals
      scrollTo: w,
      scrollTop: i,
      skipAnimationFrameInResizeObserver: B,
      smoothScrollTargetReached: r,
      // state
      statefulScrollTop: c,
      viewportHeight: f
    };
  },
  [],
  { singleton: !0 }
), Ko = { lvl: 0 };
function cb(a, i) {
  const o = a.length;
  if (o === 0)
    return [];
  let { index: r, value: c } = i(a[0]);
  const f = [];
  for (let m = 1; m < o; m++) {
    const { index: p, value: g } = i(a[m]);
    f.push({ end: p - 1, start: r, value: c }), r = p, c = g;
  }
  return f.push({ end: 1 / 0, start: r, value: c }), f;
}
function oe(a) {
  return a === Ko;
}
function Io(a, i) {
  if (!oe(a))
    return i === a.k ? a.v : i < a.k ? Io(a.l, i) : Io(a.r, i);
}
function Hn(a, i, o = "k") {
  if (oe(a))
    return [-1 / 0, void 0];
  if (Number(a[o]) === i)
    return [a.k, a.v];
  if (Number(a[o]) < i) {
    const r = Hn(a.r, i, o);
    return r[0] === -1 / 0 ? [a.k, a.v] : r;
  }
  return Hn(a.l, i, o);
}
function hn(a, i, o) {
  return oe(a) ? hb(i, o, 1) : i === a.k ? Ne(a, { k: i, v: o }) : i < a.k ? $g(Ne(a, { l: hn(a.l, i, o) })) : $g(Ne(a, { r: hn(a.r, i, o) }));
}
function Cl() {
  return Ko;
}
function _l(a, i, o) {
  if (oe(a))
    return [];
  const r = Hn(a, i)[0];
  return uw(Md(a, r, o));
}
function Nd(a, i) {
  if (oe(a))
    return Ko;
  const { k: o, l: r, r: c } = a;
  if (i === o) {
    if (oe(r))
      return c;
    if (oe(c))
      return r;
    const [f, m] = fb(r);
    return Ds(Ne(a, { k: f, l: db(r), v: m }));
  }
  return i < o ? Ds(Ne(a, { l: Nd(r, i) })) : Ds(Ne(a, { r: Nd(c, i) }));
}
function Ai(a) {
  return oe(a) ? [] : [...Ai(a.l), { k: a.k, v: a.v }, ...Ai(a.r)];
}
function Md(a, i, o) {
  if (oe(a))
    return [];
  const { k: r, l: c, r: f, v: m } = a;
  let p = [];
  return r > i && (p = p.concat(Md(c, i, o))), r >= i && r <= o && p.push({ k: r, v: m }), r <= o && (p = p.concat(Md(f, i, o))), p;
}
function Ds(a) {
  const { l: i, lvl: o, r } = a;
  if (r.lvl >= o - 1 && i.lvl >= o - 1)
    return a;
  if (o > r.lvl + 1) {
    if (pd(i))
      return mb(Ne(a, { lvl: o - 1 }));
    if (!oe(i) && !oe(i.r))
      return Ne(i.r, {
        l: Ne(i, { r: i.r.l }),
        lvl: o,
        r: Ne(a, {
          l: i.r.r,
          lvl: o - 1
        })
      });
    throw new Error("Unexpected empty nodes");
  }
  if (pd(a))
    return Dd(Ne(a, { lvl: o - 1 }));
  if (!oe(r) && !oe(r.l)) {
    const c = r.l, f = pd(c) ? r.lvl - 1 : r.lvl;
    return Ne(c, {
      l: Ne(a, {
        lvl: o - 1,
        r: c.l
      }),
      lvl: c.lvl + 1,
      r: Dd(Ne(r, { l: c.r, lvl: f }))
    });
  }
  throw new Error("Unexpected empty nodes");
}
function Ne(a, i) {
  return hb(
    i.k !== void 0 ? i.k : a.k,
    i.v !== void 0 ? i.v : a.v,
    i.lvl !== void 0 ? i.lvl : a.lvl,
    i.l !== void 0 ? i.l : a.l,
    i.r !== void 0 ? i.r : a.r
  );
}
function db(a) {
  return oe(a.r) ? a.l : Ds(Ne(a, { r: db(a.r) }));
}
function pd(a) {
  return oe(a) || a.lvl > a.r.lvl;
}
function fb(a) {
  return oe(a.r) ? [a.k, a.v] : fb(a.r);
}
function hb(a, i, o, r = Ko, c = Ko) {
  return { k: a, l: r, lvl: o, r: c, v: i };
}
function $g(a) {
  return Dd(mb(a));
}
function mb(a) {
  const { l: i } = a;
  return !oe(i) && i.lvl === a.lvl ? Ne(i, { r: Ne(a, { l: i.r }) }) : a;
}
function Dd(a) {
  const { lvl: i, r: o } = a;
  return !oe(o) && !oe(o.r) && o.lvl === i && o.r.lvl === i ? Ne(o, { l: Ne(a, { r: o.l }), lvl: i + 1 }) : a;
}
function uw(a) {
  return cb(a, ({ k: i, v: o }) => ({ index: i, value: o }));
}
function pb(a, i) {
  return !!(a && a.startIndex === i.startIndex && a.endIndex === i.endIndex);
}
function Zo(a, i) {
  return !!(a && a[0] === i[0] && a[1] === i[1]);
}
const Wd = $t(
  () => ({ recalcInProgress: lt(!1) }),
  [],
  { singleton: !0 }
);
function gb(a, i, o) {
  return a[Us(a, i, o)];
}
function Us(a, i, o, r = 0) {
  let c = a.length - 1;
  for (; r <= c; ) {
    const f = Math.floor((r + c) / 2), m = a[f], p = o(m, i);
    if (p === 0)
      return f;
    if (p === -1) {
      if (c - r < 2)
        return f - 1;
      c = f - 1;
    } else {
      if (c === r)
        return f;
      r = f + 1;
    }
  }
  throw new Error(`Failed binary finding record in array - ${a.join(",")}, searched for ${i}`);
}
function cw(a, i, o, r) {
  const c = Us(a, i, r), f = Us(a, o, r, c);
  return a.slice(c, f + 1);
}
function ai(a, i) {
  return Math.round(a.getBoundingClientRect()[i]);
}
function Ks(a) {
  return !oe(a.groupOffsetTree);
}
function Pd({ index: a }, i) {
  return i === a ? 0 : i < a ? -1 : 1;
}
function dw() {
  return {
    groupIndices: [],
    groupOffsetTree: Cl(),
    lastIndex: 0,
    lastOffset: 0,
    lastSize: 0,
    offsetTree: [],
    sizeTree: Cl()
  };
}
function fw(a, i) {
  let o = oe(a) ? 0 : 1 / 0;
  for (const r of i) {
    const { endIndex: c, size: f, startIndex: m } = r;
    if (o = Math.min(o, m), oe(a)) {
      a = hn(a, 0, f);
      continue;
    }
    const p = _l(a, m - 1, c + 1);
    if (p.some(vw(r)))
      continue;
    let g = !1, x = !1;
    for (const { end: S, start: w, value: C } of p)
      g ? (c >= w || f === C) && (a = Nd(a, w)) : (x = C !== f, g = !0), S > c && c >= w && C !== f && (a = hn(a, c + 1, C));
    x && (a = hn(a, m, f));
  }
  return [a, o];
}
function hw(a) {
  return typeof a.groupIndex < "u";
}
function mw({ offset: a }, i) {
  return i === a ? 0 : i < a ? -1 : 1;
}
function $o(a, i, o) {
  if (i.length === 0)
    return 0;
  const { index: r, offset: c, size: f } = gb(i, a, Pd), m = a - r, p = f * m + (m - 1) * o + c;
  return p > 0 ? p + o : p;
}
function xb(a, i) {
  if (!Ks(i))
    return a;
  let o = 0;
  for (; i.groupIndices[o] <= a + o; )
    o++;
  return a + o;
}
function bb(a, i, o) {
  if (hw(a))
    return i.groupIndices[a.groupIndex] + 1;
  const r = a.index === "LAST" ? o : a.index;
  let c = xb(r, i);
  return c = Math.max(0, c, Math.min(o, c)), c;
}
function pw(a, i, o, r = 0) {
  return r > 0 && (i = Math.max(i, gb(a, r, Pd).offset)), cb(cw(a, i, o, mw), bw);
}
function gw(a, [i, o, r, c]) {
  i.length > 0 && r("received item sizes", i, Me.DEBUG);
  const f = a.sizeTree;
  let m = f, p = 0;
  if (o.length > 0 && oe(f) && i.length === 2) {
    const C = i[0].size, A = i[1].size;
    m = o.reduce((N, B) => hn(hn(N, B, C), B + 1, A), m);
  } else
    [m, p] = fw(m, i);
  if (m === f)
    return a;
  const { lastIndex: g, lastOffset: x, lastSize: S, offsetTree: w } = Od(a.offsetTree, p, m, c);
  return {
    groupIndices: o,
    groupOffsetTree: o.reduce((C, A) => hn(C, A, $o(A, w, c)), Cl()),
    lastIndex: g,
    lastOffset: x,
    lastSize: S,
    offsetTree: w,
    sizeTree: m
  };
}
function xw(a) {
  return Ai(a).map(({ k: i, v: o }, r, c) => {
    const f = c[r + 1];
    return { endIndex: f !== void 0 ? f.k - 1 : 1 / 0, size: o, startIndex: i };
  });
}
function Fg(a, i) {
  let o = 0, r = 0;
  for (; o < a; )
    o += i[r + 1] - i[r] - 1, r++;
  return r - (o === a ? 0 : 1);
}
function Od(a, i, o, r) {
  let c = a, f = 0, m = 0, p = 0, g = 0;
  if (i !== 0) {
    g = Us(c, i - 1, Pd), p = c[g].offset;
    const x = Hn(o, i - 1);
    f = x[0], m = x[1], c.length && c[g].size === Hn(o, i)[1] && (g -= 1), c = c.slice(0, g + 1);
  } else
    c = [];
  for (const { start: x, value: S } of _l(o, i, 1 / 0)) {
    const w = x - f, C = w * m + p + w * r;
    c.push({
      index: x,
      offset: C,
      size: S
    }), f = x, p = C, m = S;
  }
  return {
    lastIndex: f,
    lastOffset: p,
    lastSize: m,
    offsetTree: c
  };
}
function bw(a) {
  return { index: a.index, value: a };
}
function vw(a) {
  const { endIndex: i, size: o, startIndex: r } = a;
  return (c) => c.start === r && (c.end === i || c.end === 1 / 0) && c.value === o;
}
const yw = {
  offsetHeight: "height",
  offsetWidth: "width"
}, Zn = $t(
  ([{ log: a }, { recalcInProgress: i }]) => {
    const o = Yt(), r = Yt(), c = Xe(r, 0), f = Yt(), m = Yt(), p = lt(0), g = lt([]), x = lt(void 0), S = lt(void 0), w = lt(void 0), C = lt(void 0), A = lt((v, M) => ai(v, yw[M])), N = lt(void 0), B = lt(0), z = dw(), _ = Xe(
      nt(o, Ot(g, a, B), In(gw, z), fe()),
      z
    ), R = Xe(
      nt(
        g,
        fe(),
        In((v, M) => ({ current: M, prev: v.current }), {
          current: [],
          prev: []
        }),
        ft(({ prev: v }) => v)
      ),
      []
    );
    bt(
      nt(
        g,
        Tt((v) => v.length > 0),
        Ot(_, B),
        ft(([v, M, k]) => {
          const K = v.reduce((tt, ct, rt) => hn(tt, ct, $o(ct, M.offsetTree, k) || rt), Cl());
          return {
            ...M,
            groupIndices: v,
            groupOffsetTree: K
          };
        })
      ),
      _
    ), bt(
      nt(
        r,
        Ot(_),
        Tt(([v, { lastIndex: M }]) => v < M),
        ft(([v, { lastIndex: M, lastSize: k }]) => [
          {
            endIndex: M,
            size: k,
            startIndex: v
          }
        ])
      ),
      o
    ), bt(x, S);
    const L = Xe(
      nt(
        x,
        ft((v) => v === void 0)
      ),
      !0
    );
    bt(
      nt(
        S,
        Tt((v) => v !== void 0 && oe(xe(_).sizeTree)),
        ft((v) => {
          const M = xe(w), k = xe(g).length > 0;
          return M !== void 0 && M !== 0 ? k ? [
            { endIndex: 0, size: M, startIndex: 0 },
            { endIndex: 1, size: v, startIndex: 1 }
          ] : [] : [{ endIndex: 0, size: v, startIndex: 0 }];
        })
      ),
      o
    ), bt(
      nt(
        C,
        Tt((v) => v !== void 0 && v.length > 0 && oe(xe(_).sizeTree)),
        ft((v) => {
          const M = [];
          let k = v[0], K = 0;
          for (let tt = 1; tt < v.length; tt++) {
            const ct = v[tt];
            ct !== k && (M.push({
              endIndex: tt - 1,
              size: k,
              startIndex: K
            }), k = ct, K = tt);
          }
          return M.push({
            endIndex: v.length - 1,
            size: k,
            startIndex: K
          }), M;
        })
      ),
      o
    ), bt(
      nt(
        g,
        Ot(w, S),
        Tt(([, v, M]) => v !== void 0 && M !== void 0),
        ft(([v, M, k]) => {
          const K = [];
          for (let tt = 0; tt < v.length; tt++) {
            const ct = v[tt], rt = v[tt + 1];
            K.push({
              startIndex: ct,
              endIndex: ct,
              size: M
            }), rt !== void 0 && K.push({
              startIndex: ct + 1,
              endIndex: rt - 1,
              size: k
            });
          }
          return K;
        })
      ),
      o
    );
    const q = mn(
      nt(
        o,
        Ot(_),
        In(
          ({ sizes: v }, [M, k]) => ({
            changed: k !== v,
            sizes: k
          }),
          { changed: !1, sizes: z }
        ),
        ft((v) => v.changed)
      )
    );
    te(
      nt(
        p,
        In(
          (v, M) => ({ diff: v.prev - M, prev: M }),
          { diff: 0, prev: 0 }
        ),
        ft((v) => v.diff)
      ),
      (v) => {
        const { groupIndices: M } = xe(_);
        if (v > 0)
          Dt(i, !0), Dt(f, v + Fg(v, M));
        else if (v < 0) {
          const k = xe(R);
          k.length > 0 && (v -= Fg(-v, k)), Dt(m, v);
        }
      }
    ), te(nt(p, Ot(a)), ([v, M]) => {
      v < 0 && M(
        "`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value",
        { firstItemIndex: p },
        Me.ERROR
      );
    });
    const y = mn(f);
    bt(
      nt(
        f,
        Ot(_),
        ft(([v, M]) => {
          const k = M.groupIndices.length > 0, K = [], tt = M.lastSize;
          if (k) {
            const ct = Io(M.sizeTree, 0);
            let rt = 0, ot = 0;
            for (; rt < v; ) {
              const H = M.groupIndices[ot], W = M.groupIndices.length === ot + 1 ? 1 / 0 : M.groupIndices[ot + 1] - H - 1;
              K.push({
                endIndex: H,
                size: ct,
                startIndex: H
              }), K.push({
                endIndex: H + 1 + W - 1,
                size: tt,
                startIndex: H + 1
              }), ot++, rt += W + 1;
            }
            const yt = Ai(M.sizeTree);
            return rt !== v && yt.shift(), yt.reduce(
              (H, { k: W, v: F }) => {
                let ht = H.ranges;
                return H.prevSize !== 0 && (ht = [
                  ...H.ranges,
                  {
                    endIndex: W + v - 1,
                    size: H.prevSize,
                    startIndex: H.prevIndex
                  }
                ]), {
                  prevIndex: W + v,
                  prevSize: F,
                  ranges: ht
                };
              },
              {
                prevIndex: v,
                prevSize: 0,
                ranges: K
              }
            ).ranges;
          }
          return Ai(M.sizeTree).reduce(
            (ct, { k: rt, v: ot }) => ({
              prevIndex: rt + v,
              prevSize: ot,
              ranges: [...ct.ranges, { endIndex: rt + v - 1, size: ct.prevSize, startIndex: ct.prevIndex }]
            }),
            {
              prevIndex: 0,
              prevSize: tt,
              ranges: []
            }
          ).ranges;
        })
      ),
      o
    );
    const D = mn(
      nt(
        m,
        Ot(_, B),
        ft(([v, { offsetTree: M }, k]) => {
          const K = -v;
          return $o(K, M, k);
        })
      )
    );
    return bt(
      nt(
        m,
        Ot(_, B),
        ft(([v, M, k]) => {
          if (M.groupIndices.length > 0) {
            if (oe(M.sizeTree))
              return M;
            let tt = Cl();
            const ct = xe(R);
            let rt = 0, ot = 0, yt = 0;
            for (; rt < -v; ) {
              yt = ct[ot];
              const H = ct[ot + 1] - yt - 1;
              ot++, rt += H + 1;
            }
            if (tt = Ai(M.sizeTree).reduce((H, { k: W, v: F }) => hn(H, Math.max(0, W + v), F), tt), rt !== -v) {
              const H = Io(M.sizeTree, yt);
              tt = hn(tt, 0, H);
              const W = Hn(M.sizeTree, -v + 1)[1];
              tt = hn(tt, 1, W);
            }
            return {
              ...M,
              sizeTree: tt,
              ...Od(M.offsetTree, 0, tt, k)
            };
          }
          const K = Ai(M.sizeTree).reduce((tt, { k: ct, v: rt }) => hn(tt, Math.max(0, ct + v), rt), Cl());
          return {
            ...M,
            sizeTree: K,
            ...Od(M.offsetTree, 0, K, k)
          };
        })
      ),
      _
    ), {
      beforeUnshiftWith: y,
      // input
      data: N,
      defaultItemSize: S,
      firstItemIndex: p,
      fixedItemSize: x,
      fixedGroupSize: w,
      gap: B,
      groupIndices: g,
      heightEstimates: C,
      itemSize: A,
      listRefresh: q,
      shiftWith: m,
      shiftWithOffset: D,
      sizeRanges: o,
      // output
      sizes: _,
      statefulTotalCount: c,
      totalCount: r,
      trackItemSizes: L,
      unshiftWith: f
    };
  },
  he(li, Wd),
  { singleton: !0 }
);
function ww(a) {
  return a.reduce(
    (i, o) => (i.groupIndices.push(i.totalCount), i.totalCount += o + 1, i),
    {
      groupIndices: [],
      totalCount: 0
    }
  );
}
const vb = $t(
  ([{ groupIndices: a, sizes: i, totalCount: o }, { headerHeight: r, scrollTop: c }]) => {
    const f = Yt(), m = Yt(), p = mn(nt(f, ft(ww)));
    return bt(
      nt(
        p,
        ft((g) => g.totalCount)
      ),
      o
    ), bt(
      nt(
        p,
        ft((g) => g.groupIndices)
      ),
      a
    ), bt(
      nt(
        Ae(c, i, r),
        Tt(([g, x]) => Ks(x)),
        ft(([g, x, S]) => Hn(x.groupOffsetTree, Math.max(g - S, 0), "v")[0]),
        fe(),
        ft((g) => [g])
      ),
      m
    ), { groupCounts: f, topItemsIndexes: m };
  },
  he(Zn, Ze)
), oi = $t(
  ([{ log: a }]) => {
    const i = lt(!1), o = mn(
      nt(
        i,
        Tt((r) => r),
        fe()
      )
    );
    return te(i, (r) => {
      r && xe(a)("props updated", {}, Me.DEBUG);
    }), { didMount: o, propsReady: i };
  },
  he(li),
  { singleton: !0 }
), Sw = typeof document < "u" && "scrollBehavior" in document.documentElement.style;
function yb(a) {
  const i = typeof a == "number" ? { index: a } : a;
  return i.align || (i.align = "start"), (!i.behavior || !Sw) && (i.behavior = "auto"), i.offset === void 0 && (i.offset = 0), i;
}
const lr = $t(
  ([
    { gap: a, listRefresh: i, sizes: o, totalCount: r },
    {
      fixedFooterHeight: c,
      fixedHeaderHeight: f,
      footerHeight: m,
      headerHeight: p,
      scrollingInProgress: g,
      scrollTo: x,
      smoothScrollTargetReached: S,
      viewportHeight: w
    },
    { log: C }
  ]) => {
    const A = Yt(), N = Yt(), B = lt(0);
    let z = null, _ = null, R = null;
    function L() {
      z !== null && (z(), z = null), R !== null && (R(), R = null), _ && (clearTimeout(_), _ = null), Dt(g, !1);
    }
    return bt(
      nt(
        A,
        Ot(o, w, r, B, p, m, C),
        Ot(a, f, c),
        ft(
          ([
            [q, y, D, v, M, k, K, tt],
            ct,
            rt,
            ot
          ]) => {
            const yt = yb(q), { align: H, behavior: W, offset: F } = yt, ht = v - 1, st = bb(yt, y, ht);
            let T = $o(st, y.offsetTree, ct) + k;
            H === "end" ? (T += rt + Hn(y.sizeTree, st)[1] - D + ot, st === ht && (T += K)) : H === "center" ? T += (rt + Hn(y.sizeTree, st)[1] - D + ot) / 2 : T -= M, F !== void 0 && F !== 0 && (T += F);
            const Y = (X) => {
              L(), X ? (tt("retrying to scroll to", { location: q }, Me.DEBUG), Dt(A, q)) : (Dt(N, !0), tt("list did not change, scroll successful", {}, Me.DEBUG));
            };
            if (L(), W === "smooth") {
              let X = !1;
              R = te(i, (it) => {
                X = X || it;
              }), z = kn(S, () => {
                Y(X);
              });
            } else
              z = kn(nt(i, Cw(150)), Y);
            return _ = setTimeout(() => {
              L();
            }, 1200), Dt(g, !0), tt("scrolling from index to", { behavior: W, index: st, top: T }, Me.DEBUG), { behavior: W, top: T };
          }
        )
      ),
      x
    ), {
      scrollTargetReached: N,
      scrollToIndex: A,
      topListHeight: B
    };
  },
  he(Zn, Ze, li),
  { singleton: !0 }
);
function Cw(a) {
  return (i) => {
    const o = setTimeout(() => {
      i(!1);
    }, a);
    return (r) => {
      r && (i(!0), clearTimeout(o));
    };
  };
}
function tf(a, i) {
  a === 0 ? i() : requestAnimationFrame(() => {
    tf(a - 1, i);
  });
}
function ef(a, i) {
  const o = i - 1;
  return typeof a == "number" ? a : a.index === "LAST" ? o : a.index;
}
const or = $t(
  ([{ defaultItemSize: a, listRefresh: i, sizes: o }, { scrollTop: r }, { scrollTargetReached: c, scrollToIndex: f }, { didMount: m }]) => {
    const p = lt(!0), g = lt(0), x = lt(!0);
    return bt(
      nt(
        m,
        Ot(g),
        Tt(([S, w]) => w !== 0),
        Kn(!1)
      ),
      p
    ), bt(
      nt(
        m,
        Ot(g),
        Tt(([S, w]) => w !== 0),
        Kn(!1)
      ),
      x
    ), te(
      nt(
        Ae(i, m),
        Ot(p, o, a, x),
        Tt(([[, S], w, { sizeTree: C }, A, N]) => S && (!oe(C) || $d(A)) && !w && !N),
        Ot(g)
      ),
      ([, S]) => {
        kn(c, () => {
          Dt(x, !0);
        }), tf(4, () => {
          kn(r, () => {
            Dt(p, !0);
          }), Dt(f, S);
        });
      }
    ), {
      initialItemFinalLocationReached: x,
      initialTopMostItemIndex: g,
      scrolledToInitialItem: p
    };
  },
  he(Zn, Ze, lr, oi),
  { singleton: !0 }
);
function wb(a, i) {
  return Math.abs(a - i) < 1.01;
}
const Fo = "up", Ho = "down", _w = "none", Tw = {
  atBottom: !1,
  notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
  state: {
    offsetBottom: 0,
    scrollHeight: 0,
    scrollTop: 0,
    viewportHeight: 0
  }
}, jw = 0, rr = $t(([{ footerHeight: a, headerHeight: i, scrollBy: o, scrollContainerState: r, scrollTop: c, viewportHeight: f }]) => {
  const m = lt(!1), p = lt(!0), g = Yt(), x = Yt(), S = lt(4), w = lt(jw), C = Xe(
    nt(
      Ed(nt(_t(c), Bi(1), Kn(!0)), nt(_t(c), Bi(1), Kn(!1), Xg(100))),
      fe()
    ),
    !1
  ), A = Xe(
    nt(Ed(nt(o, Kn(!0)), nt(o, Kn(!1), Xg(200))), fe()),
    !1
  );
  bt(
    nt(
      Ae(_t(c), _t(w)),
      ft(([R, L]) => R <= L),
      fe()
    ),
    p
  ), bt(nt(p, xa(50)), x);
  const N = mn(
    nt(
      Ae(r, _t(f), _t(i), _t(a), _t(S)),
      In((R, [{ scrollHeight: L, scrollTop: q }, y, D, v, M]) => {
        const k = q + y - L > -M, K = {
          scrollHeight: L,
          scrollTop: q,
          viewportHeight: y
        };
        if (k) {
          let ct, rt;
          return q > R.state.scrollTop ? (ct = "SCROLLED_DOWN", rt = R.state.scrollTop - q) : (ct = "SIZE_DECREASED", rt = R.state.scrollTop - q || R.scrollTopDelta), {
            atBottom: !0,
            atBottomBecause: ct,
            scrollTopDelta: rt,
            state: K
          };
        }
        let tt;
        return K.scrollHeight > R.state.scrollHeight ? tt = "SIZE_INCREASED" : y < R.state.viewportHeight ? tt = "VIEWPORT_HEIGHT_DECREASING" : q < R.state.scrollTop ? tt = "SCROLLING_UPWARDS" : tt = "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM", {
          atBottom: !1,
          notAtBottomBecause: tt,
          state: K
        };
      }, Tw),
      fe((R, L) => R !== void 0 && R.atBottom === L.atBottom)
    )
  ), B = Xe(
    nt(
      r,
      In(
        (R, { scrollHeight: L, scrollTop: q, viewportHeight: y }) => {
          if (!wb(R.scrollHeight, L)) {
            const D = L - (q + y) < 1;
            return R.scrollTop !== q && D ? {
              changed: !0,
              jump: R.scrollTop - q,
              scrollHeight: L,
              scrollTop: q
            } : {
              changed: !0,
              jump: 0,
              scrollHeight: L,
              scrollTop: q
            };
          }
          return {
            changed: !1,
            jump: 0,
            scrollHeight: L,
            scrollTop: q
          };
        },
        { changed: !1, jump: 0, scrollHeight: 0, scrollTop: 0 }
      ),
      Tt((R) => R.changed),
      ft((R) => R.jump)
    ),
    0
  );
  bt(
    nt(
      N,
      ft((R) => R.atBottom)
    ),
    m
  ), bt(nt(m, xa(50)), g);
  const z = lt(Ho);
  bt(
    nt(
      r,
      ft(({ scrollTop: R }) => R),
      fe(),
      In(
        (R, L) => xe(A) ? { direction: R.direction, prevScrollTop: L } : { direction: L < R.prevScrollTop ? Fo : Ho, prevScrollTop: L },
        { direction: Ho, prevScrollTop: 0 }
      ),
      ft((R) => R.direction)
    ),
    z
  ), bt(nt(r, xa(50), Kn(_w)), z);
  const _ = lt(0);
  return bt(
    nt(
      C,
      Tt((R) => !R),
      Kn(0)
    ),
    _
  ), bt(
    nt(
      c,
      xa(100),
      Ot(C),
      Tt(([R, L]) => L),
      In(([R, L], [q]) => [L, q], [0, 0]),
      ft(([R, L]) => L - R)
    ),
    _
  ), {
    atBottomState: N,
    atBottomStateChange: g,
    atBottomThreshold: S,
    atTopStateChange: x,
    atTopThreshold: w,
    isAtBottom: m,
    isAtTop: p,
    isScrolling: C,
    lastJumpDueToItemResize: B,
    scrollDirection: z,
    scrollVelocity: _
  };
}, he(Ze)), Jo = "top", Wo = "bottom", Jg = "none";
function Wg(a, i, o) {
  return typeof a == "number" ? o === Fo && i === Jo || o === Ho && i === Wo ? a : 0 : o === Fo ? i === Jo ? a.main : a.reverse : i === Wo ? a.main : a.reverse;
}
function Pg(a, i) {
  return typeof a == "number" ? a : a[i] ?? 0;
}
const nf = $t(
  ([{ deviation: a, fixedHeaderHeight: i, headerHeight: o, scrollTop: r, viewportHeight: c }]) => {
    const f = Yt(), m = lt(0), p = lt(0), g = lt(0), x = Xe(
      nt(
        Ae(
          _t(r),
          _t(c),
          _t(o),
          _t(f, Zo),
          _t(g),
          _t(m),
          _t(i),
          _t(a),
          _t(p)
        ),
        ft(
          ([
            S,
            w,
            C,
            [A, N],
            B,
            z,
            _,
            R,
            L
          ]) => {
            const q = S - R, y = z + _, D = Math.max(C - q, 0);
            let v = Jg;
            const M = Pg(L, Jo), k = Pg(L, Wo);
            return A -= R, A += C + _, N += C + _, N -= R, A > S + y - M && (v = Fo), N < S - D + w + k && (v = Ho), v !== Jg ? [
              Math.max(q - C - Wg(B, Jo, v) - M, 0),
              q - D - _ + w + Wg(B, Wo, v) + k
            ] : null;
          }
        ),
        Tt((S) => S !== null),
        fe(Zo)
      ),
      [0, 0]
    );
    return {
      increaseViewportBy: p,
      // input
      listBoundary: f,
      overscan: g,
      topListHeight: m,
      // output
      visibleRange: x
    };
  },
  he(Ze),
  { singleton: !0 }
);
function zw(a, i, o) {
  if (Ks(i)) {
    const r = xb(a, i);
    return [
      { index: Hn(i.groupOffsetTree, r)[0], offset: 0, size: 0 },
      { data: o == null ? void 0 : o[0], index: r, offset: 0, size: 0 }
    ];
  }
  return [{ data: o == null ? void 0 : o[0], index: a, offset: 0, size: 0 }];
}
const gd = {
  bottom: 0,
  firstItemIndex: 0,
  items: [],
  offsetBottom: 0,
  offsetTop: 0,
  top: 0,
  topItems: [],
  topListHeight: 0,
  totalCount: 0
};
function Os(a, i, o, r, c, f) {
  const { lastIndex: m, lastOffset: p, lastSize: g } = c;
  let x = 0, S = 0;
  if (a.length > 0) {
    x = a[0].offset;
    const B = a[a.length - 1];
    S = B.offset + B.size;
  }
  const w = o - m, C = p + w * g + (w - 1) * r, A = x, N = C - S;
  return {
    bottom: S,
    firstItemIndex: f,
    items: tx(a, c, f),
    offsetBottom: N,
    offsetTop: x,
    top: A,
    topItems: tx(i, c, f),
    topListHeight: i.reduce((B, z) => z.size + B, 0),
    totalCount: o
  };
}
function Sb(a, i, o, r, c, f) {
  let m = 0;
  if (o.groupIndices.length > 0)
    for (const S of o.groupIndices) {
      if (S - m >= a)
        break;
      m++;
    }
  const p = a + m, g = ef(i, p), x = Array.from({ length: p }).map((S, w) => ({
    data: f[w + g],
    index: w + g,
    offset: 0,
    size: 0
  }));
  return Os(x, [], p, c, o, r);
}
function tx(a, i, o) {
  if (a.length === 0)
    return [];
  if (!Ks(i))
    return a.map((x) => ({ ...x, index: x.index + o, originalIndex: x.index }));
  const r = a[0].index, c = a[a.length - 1].index, f = [], m = _l(i.groupOffsetTree, r, c);
  let p, g = 0;
  for (const x of a) {
    (!p || p.end < x.index) && (p = m.shift(), g = i.groupIndices.indexOf(p.start));
    let S;
    x.index === p.start ? S = {
      index: g,
      type: "group"
    } : S = {
      groupIndex: g,
      index: x.index - (g + 1) + o
    }, f.push({
      ...S,
      data: x.data,
      offset: x.offset,
      originalIndex: x.index,
      size: x.size
    });
  }
  return f;
}
function ex(a, i) {
  return a === void 0 ? 0 : typeof a == "number" ? a : a[i] ?? 0;
}
const Hi = $t(
  ([
    { data: a, firstItemIndex: i, gap: o, sizes: r, totalCount: c },
    f,
    { listBoundary: m, topListHeight: p, visibleRange: g },
    { initialTopMostItemIndex: x, scrolledToInitialItem: S },
    { topListHeight: w },
    C,
    { didMount: A },
    { recalcInProgress: N }
  ]) => {
    const B = lt([]), z = lt(0), _ = Yt(), R = lt(0);
    bt(f.topItemsIndexes, B);
    const L = Xe(
      nt(
        Ae(
          A,
          N,
          _t(g, Zo),
          _t(c),
          _t(r),
          _t(x),
          S,
          _t(B),
          _t(i),
          _t(o),
          _t(R),
          a
        ),
        Tt(([v, M, , k, , , , , , , , K]) => {
          const tt = K !== void 0 && K.length !== k;
          return v && !M && !tt;
        }),
        ft(
          ([
            ,
            ,
            [v, M],
            k,
            K,
            tt,
            ct,
            rt,
            ot,
            yt,
            H,
            W
          ]) => {
            var vt, re;
            const F = K, { offsetTree: ht, sizeTree: st } = F, T = xe(z);
            if (k === 0)
              return { ...gd, totalCount: k };
            if (v === 0 && M === 0)
              return T === 0 ? { ...gd, totalCount: k } : Sb(T, tt, K, ot, yt, W || []);
            if (oe(st))
              return T > 0 ? null : Os(
                zw(ef(tt, k), F, W),
                [],
                k,
                yt,
                F,
                ot
              );
            const Y = [];
            if (rt.length > 0) {
              const Vt = rt[0], Jt = rt[rt.length - 1];
              let me = 0;
              for (const Xt of _l(st, Vt, Jt)) {
                const Kt = Xt.value, Bt = Math.max(Xt.start, Vt), Ee = Math.min(Xt.end, Jt);
                for (let Wt = Bt; Wt <= Ee; Wt++)
                  Y.push({ data: W == null ? void 0 : W[Wt], index: Wt, offset: me, size: Kt }), me += Kt;
              }
            }
            if (!ct)
              return Os([], Y, k, yt, F, ot);
            const X = rt.length > 0 ? rt[rt.length - 1] + 1 : 0, it = pw(ht, v, M, X);
            if (it.length === 0)
              return null;
            const gt = k - 1, St = Xs([], (Vt) => {
              for (const Jt of it) {
                const me = Jt.value;
                let Xt = me.offset, Kt = Jt.start;
                const Bt = me.size;
                if (me.offset < v) {
                  Kt += Math.floor((v - me.offset + yt) / (Bt + yt));
                  const Wt = Kt - Jt.start;
                  Xt += Wt * Bt + Wt * yt;
                }
                Kt < X && (Xt += (X - Kt) * Bt, Kt = X);
                const Ee = Math.min(Jt.end, gt);
                for (let Wt = Kt; Wt <= Ee && !(Xt >= M); Wt++)
                  Vt.push({ data: W == null ? void 0 : W[Wt], index: Wt, offset: Xt, size: Bt }), Xt += Bt + yt;
              }
            }), At = ex(H, Jo), at = ex(H, Wo);
            if (St.length > 0 && (At > 0 || at > 0)) {
              const Vt = St[0], Jt = St[St.length - 1];
              if (At > 0 && Vt.index > X) {
                const me = Math.min(At, Vt.index - X), Xt = [];
                let Kt = Vt.offset;
                for (let Bt = Vt.index - 1; Bt >= Vt.index - me; Bt--) {
                  const Ee = ((vt = _l(st, Bt, Bt)[0]) == null ? void 0 : vt.value) ?? Vt.size;
                  Kt -= Ee + yt, Xt.unshift({ data: W == null ? void 0 : W[Bt], index: Bt, offset: Kt, size: Ee });
                }
                St.unshift(...Xt);
              }
              if (at > 0 && Jt.index < gt) {
                const me = Math.min(at, gt - Jt.index);
                let Xt = Jt.offset + Jt.size + yt;
                for (let Kt = Jt.index + 1; Kt <= Jt.index + me; Kt++) {
                  const Bt = ((re = _l(st, Kt, Kt)[0]) == null ? void 0 : re.value) ?? Jt.size;
                  St.push({ data: W == null ? void 0 : W[Kt], index: Kt, offset: Xt, size: Bt }), Xt += Bt + yt;
                }
              }
            }
            return Os(St, Y, k, yt, F, ot);
          }
        ),
        //@ts-expect-error filter needs to be fixed
        Tt((v) => v !== null),
        fe()
      ),
      gd
    );
    bt(
      nt(
        a,
        Tt($d),
        ft((v) => v == null ? void 0 : v.length)
      ),
      c
    ), bt(
      nt(
        L,
        ft((v) => v.topListHeight)
      ),
      w
    ), bt(w, p), bt(
      nt(
        L,
        ft((v) => [v.top, v.bottom])
      ),
      m
    ), bt(
      nt(
        L,
        ft((v) => v.items)
      ),
      _
    );
    const q = mn(
      nt(
        L,
        Tt(({ items: v }) => v.length > 0),
        Ot(c, a),
        Tt(([{ items: v }, M]) => v[v.length - 1].originalIndex === M - 1),
        ft(([, v, M]) => [v - 1, M]),
        fe(Zo),
        ft(([v]) => v)
      )
    ), y = mn(
      nt(
        L,
        xa(200),
        Tt(({ items: v, topItems: M }) => v.length > 0 && v[0].originalIndex === M.length),
        ft(({ items: v }) => v[0].index),
        fe()
      )
    ), D = mn(
      nt(
        L,
        Tt(({ items: v }) => v.length > 0),
        ft(({ items: v }) => {
          let M = 0, k = v.length - 1;
          for (; v[M].type === "group" && M < k; )
            M++;
          for (; v[k].type === "group" && k > M; )
            k--;
          return {
            endIndex: v[k].index,
            startIndex: v[M].index
          };
        }),
        fe(pb)
      )
    );
    return {
      endReached: q,
      initialItemCount: z,
      itemsRendered: _,
      listState: L,
      minOverscanItemCount: R,
      rangeChanged: D,
      startReached: y,
      topItemsIndexes: B,
      ...C
    };
  },
  he(
    Zn,
    vb,
    nf,
    or,
    lr,
    rr,
    oi,
    Wd
  ),
  { singleton: !0 }
), Cb = $t(
  ([{ fixedFooterHeight: a, fixedHeaderHeight: i, footerHeight: o, headerHeight: r }, { listState: c }]) => {
    const f = Yt(), m = Xe(
      nt(
        Ae(o, a, r, i, c),
        ft(([p, g, x, S, w]) => p + g + x + S + w.offsetBottom + w.bottom)
      ),
      0
    );
    return bt(_t(m), f), { totalListHeight: m, totalListHeightChanged: f };
  },
  he(Ze, Hi),
  { singleton: !0 }
), Aw = $t(
  ([{ viewportHeight: a }, { totalListHeight: i }]) => {
    const o = lt(!1), r = Xe(
      nt(
        Ae(o, a, i),
        Tt(([c]) => c),
        ft(([, c, f]) => Math.max(0, c - f)),
        xa(0),
        fe()
      ),
      0
    );
    return { alignToBottom: o, paddingTopAddition: r };
  },
  he(Ze, Cb),
  { singleton: !0 }
), _b = $t(() => ({
  context: lt(null)
})), Ew = ({
  itemBottom: a,
  itemTop: i,
  locationParams: { align: o, behavior: r, ...c },
  viewportBottom: f,
  viewportTop: m
}) => i < m ? { ...c, align: o ?? "start", ...r !== void 0 ? { behavior: r } : {} } : a > f ? { ...c, align: o ?? "end", ...r !== void 0 ? { behavior: r } : {} } : null, Tb = $t(
  ([
    { gap: a, sizes: i, totalCount: o },
    { fixedFooterHeight: r, fixedHeaderHeight: c, headerHeight: f, scrollingInProgress: m, scrollTop: p, viewportHeight: g },
    { scrollToIndex: x }
  ]) => {
    const S = Yt();
    return bt(
      nt(
        S,
        Ot(i, g, o, f, c, r, p),
        Ot(a),
        ft(([[w, C, A, N, B, z, _, R], L]) => {
          const { calculateViewLocation: q = Ew, done: y, ...D } = w, v = bb(w, C, N - 1), M = $o(v, C.offsetTree, L) + B + z, k = M + Hn(C.sizeTree, v)[1], K = R + z, tt = R + A - _, ct = q({
            itemBottom: k,
            itemTop: M,
            locationParams: D,
            viewportBottom: tt,
            viewportTop: K
          });
          return ct !== null ? y && kn(
            nt(
              m,
              Tt((rt) => !rt),
              // skips the initial publish of false, and the cleanup call.
              // but if scrollingInProgress is true, we skip the initial publish.
              Bi(xe(m) ? 1 : 2)
            ),
            y
          ) : y == null || y(), ct;
        }),
        Tt((w) => w !== null)
      ),
      x
    ), {
      scrollIntoView: S
    };
  },
  he(Zn, Ze, lr, Hi, li),
  { singleton: !0 }
);
function nx(a) {
  return a === !1 ? !1 : a === "smooth" ? "smooth" : "auto";
}
const Rw = (a, i) => typeof a == "function" ? nx(a(i)) : i && nx(a), Nw = $t(
  ([
    { listRefresh: a, totalCount: i, fixedItemSize: o, data: r },
    { atBottomState: c, isAtBottom: f },
    { scrollToIndex: m },
    { scrolledToInitialItem: p },
    { didMount: g, propsReady: x },
    { log: S },
    { scrollingInProgress: w },
    { context: C },
    { scrollIntoView: A }
  ]) => {
    const N = lt(!1), B = Yt();
    let z = null;
    function _(y) {
      Dt(m, {
        align: "end",
        behavior: y,
        index: "LAST"
      });
    }
    te(
      nt(
        Ae(nt(_t(i), Bi(1)), g),
        Ot(_t(N), f, p, w),
        ft(([[y, D], v, M, k, K]) => {
          let tt = D && k, ct = "auto";
          return tt && (ct = Rw(v, M || K), tt = tt && ct !== !1), { followOutputBehavior: ct, shouldFollow: tt, totalCount: y };
        }),
        Tt(({ shouldFollow: y }) => y)
      ),
      ({ followOutputBehavior: y, totalCount: D }) => {
        z !== null && (z(), z = null), xe(o) !== void 0 ? requestAnimationFrame(() => {
          xe(S)("following output to ", { totalCount: D }, Me.DEBUG), _(y);
        }) : z = kn(a, () => {
          xe(S)("following output to ", { totalCount: D }, Me.DEBUG), _(y), z = null;
        });
      }
    );
    function R(y) {
      const D = kn(c, (v) => {
        y && !v.atBottom && v.notAtBottomBecause === "SIZE_INCREASED" && z === null && (xe(S)("scrolling to bottom due to increased size", {}, Me.DEBUG), _("auto"));
      });
      setTimeout(D, 100);
    }
    te(
      nt(
        Ae(_t(N), i, x),
        Tt(([y, , D]) => y !== !1 && D),
        In(
          ({ value: y }, [, D]) => ({ refreshed: y === D, value: D }),
          { refreshed: !1, value: 0 }
        ),
        Tt(({ refreshed: y }) => y),
        Ot(N, i)
      ),
      ([, y]) => {
        xe(p) && R(y !== !1);
      }
    ), te(B, () => {
      R(xe(N) !== !1);
    }), te(Ae(_t(N), c), ([y, D]) => {
      y !== !1 && !D.atBottom && D.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING" && _("auto");
    });
    const L = lt(null), q = Yt();
    return bt(
      Ed(
        nt(
          _t(r),
          ft((y) => (y == null ? void 0 : y.length) ?? 0)
        ),
        nt(_t(i))
      ),
      q
    ), te(
      nt(
        Ae(nt(q, Bi(1)), g),
        Ot(_t(L), p, w, C),
        ft(([[y, D], v, M, k, K]) => D && M && (v == null ? void 0 : v({ context: K, totalCount: y, scrollingInProgress: k }))),
        Tt((y) => !!y),
        xa(0)
      ),
      (y) => {
        z !== null && (z(), z = null), xe(o) !== void 0 ? requestAnimationFrame(() => {
          xe(S)("scrolling into view", {}), Dt(A, y);
        }) : z = kn(a, () => {
          xe(S)("scrolling into view", {}), Dt(A, y), z = null;
        });
      }
    ), { autoscrollToBottom: B, followOutput: N, scrollIntoViewOnChange: L };
  },
  he(
    Zn,
    rr,
    lr,
    or,
    oi,
    li,
    Ze,
    _b,
    Tb
  )
), Mw = $t(
  ([{ data: a, firstItemIndex: i, gap: o, sizes: r }, { initialTopMostItemIndex: c }, { initialItemCount: f, listState: m }, { didMount: p }]) => (bt(
    nt(
      p,
      Ot(f),
      Tt(([, g]) => g !== 0),
      Ot(c, r, i, o, a),
      ft(([[, g], x, S, w, C, A = []]) => Sb(g, x, S, w, C, A))
    ),
    m
  ), {}),
  he(Zn, or, Hi, oi),
  { singleton: !0 }
), Dw = $t(
  ([{ didMount: a }, { scrollTo: i }, { listState: o }]) => {
    const r = lt(0);
    return te(
      nt(
        a,
        Ot(r),
        Tt(([, c]) => c !== 0),
        ft(([, c]) => ({ top: c }))
      ),
      (c) => {
        kn(
          nt(
            o,
            Bi(1),
            Tt((f) => f.items.length > 1)
          ),
          () => {
            requestAnimationFrame(() => {
              Dt(i, c);
            });
          }
        );
      }
    ), {
      initialScrollTop: r
    };
  },
  he(oi, Ze, Hi),
  { singleton: !0 }
), jb = $t(
  ([{ scrollVelocity: a }]) => {
    const i = lt(!1), o = Yt(), r = lt(!1);
    return bt(
      nt(
        a,
        Ot(r, i, o),
        Tt(([c, f]) => f !== !1 && f !== void 0),
        ft(([c, f, m, p]) => {
          const { enter: g, exit: x } = f;
          if (m) {
            if (x(c, p))
              return !1;
          } else if (g(c, p))
            return !0;
          return m;
        }),
        fe()
      ),
      i
    ), te(
      nt(Ae(i, a, o), Ot(r)),
      ([[c, f, m], p]) => {
        c && p !== !1 && p !== void 0 && p.change && p.change(f, m);
      }
    ), { isSeeking: i, scrollSeekConfiguration: r, scrollSeekRangeChanged: o, scrollVelocity: a };
  },
  he(rr),
  { singleton: !0 }
), af = $t(([{ scrollContainerState: a, scrollTo: i }]) => {
  const o = Yt(), r = Yt(), c = Yt(), f = lt(!1), m = lt(void 0);
  return bt(
    nt(
      Ae(o, r),
      ft(([{ scrollTop: p, viewportHeight: g }, { offsetTop: x, listHeight: S }]) => ({
        scrollHeight: S,
        scrollTop: Math.max(0, p - x),
        viewportHeight: g
      }))
    ),
    a
  ), bt(
    nt(
      i,
      Ot(r),
      ft(([p, { offsetTop: g }]) => ({
        ...p,
        top: p.top + g
      }))
    ),
    c
  ), {
    customScrollParent: m,
    // config
    useWindowScroll: f,
    // input
    windowScrollContainerState: o,
    // signals
    windowScrollTo: c,
    windowViewportRect: r
  };
}, he(Ze)), Ow = $t(
  ([
    { sizeRanges: a, sizes: i },
    { headerHeight: o, scrollTop: r },
    { initialTopMostItemIndex: c },
    { didMount: f },
    { useWindowScroll: m, windowScrollContainerState: p, windowViewportRect: g }
  ]) => {
    const x = Yt(), S = lt(void 0), w = lt(null), C = lt(null);
    return bt(p, w), bt(g, C), te(
      nt(
        x,
        Ot(i, r, m, w, C, o)
      ),
      ([A, N, B, z, _, R, L]) => {
        const q = xw(N.sizeTree);
        z && _ !== null && R !== null && (B = _.scrollTop - R.offsetTop), B -= L, A({ ranges: q, scrollTop: B });
      }
    ), bt(nt(S, Tt($d), ft(Bw)), c), bt(
      nt(
        f,
        Ot(S),
        Tt(([, A]) => A !== void 0),
        fe(),
        ft(([, A]) => A.ranges)
      ),
      a
    ), {
      getState: x,
      restoreStateFrom: S
    };
  },
  he(Zn, Ze, or, oi, af)
);
function Bw(a) {
  return { align: "start", index: 0, offset: a.scrollTop };
}
const kw = $t(([{ topItemsIndexes: a }]) => {
  const i = lt(0);
  return bt(
    nt(
      i,
      Tt((o) => o >= 0),
      ft((o) => Array.from({ length: o }).map((r, c) => c))
    ),
    a
  ), { topItemCount: i };
}, he(Hi));
function zb(a) {
  let i = !1, o;
  return (() => (i || (i = !0, o = a()), o));
}
const Hw = zb(() => /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent)), qw = $t(
  ([
    { deviation: a, scrollBy: i, scrollingInProgress: o, scrollTop: r },
    { isAtBottom: c, isScrolling: f, lastJumpDueToItemResize: m, scrollDirection: p },
    { listState: g },
    { beforeUnshiftWith: x, gap: S, shiftWithOffset: w, sizes: C },
    { log: A },
    { recalcInProgress: N }
  ]) => {
    const B = mn(
      nt(
        g,
        Ot(m),
        In(
          ([, _, R, L], [{ bottom: q, items: y, offsetBottom: D, totalCount: v }, M]) => {
            const k = q + D;
            let K = 0;
            return R === v && _.length > 0 && y.length > 0 && (y[0].originalIndex === 0 && _[0].originalIndex === 0 || (K = k - L, K !== 0 && (K += M))), [K, y, v, k];
          },
          [0, [], 0, 0]
        ),
        Tt(([_]) => _ !== 0),
        Ot(r, p, o, c, A, N),
        Tt(([, _, R, L, , , q]) => !q && !L && _ !== 0 && R === Fo),
        ft(([[_], , , , , R]) => (R("Upward scrolling compensation", { amount: _ }, Me.DEBUG), _))
      )
    );
    function z(_) {
      _ > 0 ? (Dt(i, { behavior: "auto", top: -_ }), Dt(a, 0)) : (Dt(a, 0), Dt(i, { behavior: "auto", top: -_ }));
    }
    return te(nt(B, Ot(a, f)), ([_, R, L]) => {
      L && Hw() ? Dt(a, R - _) : z(-_);
    }), te(
      nt(
        Ae(Xe(f, !1), a, N),
        Tt(([_, R, L]) => !_ && !L && R !== 0),
        ft(([_, R]) => R),
        xa(1)
      ),
      z
    ), bt(
      nt(
        w,
        ft((_) => ({ top: -_ }))
      ),
      i
    ), te(
      nt(
        x,
        Ot(C, S),
        ft(([_, { groupIndices: R, lastSize: L, sizeTree: q }, y]) => {
          function D(tt) {
            return tt * (L + y);
          }
          if (R.length === 0)
            return D(_);
          let v = 0;
          const M = Io(q, 0);
          let k = 0, K = 0;
          for (; k < _; ) {
            k++, v += M;
            let tt = R.length === K + 1 ? 1 / 0 : R[K + 1] - R[K] - 1;
            k + tt > _ && (v -= M, tt = _ - k + 1), k += tt, v += D(tt), K++;
          }
          return v;
        })
      ),
      (_) => {
        Dt(a, _), requestAnimationFrame(() => {
          Dt(i, { top: _ }), requestAnimationFrame(() => {
            Dt(a, 0), Dt(N, !1);
          });
        });
      }
    ), { deviation: a };
  },
  he(Ze, rr, Hi, Zn, li, Wd)
), Gw = $t(
  ([
    a,
    i,
    o,
    r,
    c,
    f,
    m,
    p,
    g,
    x,
    S
  ]) => ({
    ...a,
    ...i,
    ...o,
    ...r,
    ...c,
    ...f,
    ...m,
    ...p,
    ...g,
    ...x,
    ...S
  }),
  he(
    nf,
    Mw,
    oi,
    jb,
    Cb,
    Dw,
    Aw,
    af,
    Tb,
    li,
    _b
  )
), Ab = $t(
  ([
    {
      data: a,
      defaultItemSize: i,
      firstItemIndex: o,
      fixedItemSize: r,
      fixedGroupSize: c,
      gap: f,
      groupIndices: m,
      heightEstimates: p,
      itemSize: g,
      sizeRanges: x,
      sizes: S,
      statefulTotalCount: w,
      totalCount: C,
      trackItemSizes: A
    },
    { initialItemFinalLocationReached: N, initialTopMostItemIndex: B, scrolledToInitialItem: z },
    _,
    R,
    L,
    q,
    { scrollToIndex: y },
    D,
    { topItemCount: v },
    { groupCounts: M },
    k
  ]) => {
    const { listState: K, minOverscanItemCount: tt, topItemsIndexes: ct, rangeChanged: rt, ...ot } = q;
    return bt(rt, k.scrollSeekRangeChanged), bt(
      nt(
        k.windowViewportRect,
        ft((yt) => yt.visibleHeight)
      ),
      _.viewportHeight
    ), {
      data: a,
      defaultItemHeight: i,
      firstItemIndex: o,
      fixedItemHeight: r,
      fixedGroupHeight: c,
      gap: f,
      groupCounts: M,
      heightEstimates: p,
      initialItemFinalLocationReached: N,
      initialTopMostItemIndex: B,
      scrolledToInitialItem: z,
      sizeRanges: x,
      topItemCount: v,
      topItemsIndexes: ct,
      // input
      totalCount: C,
      ...L,
      groupIndices: m,
      itemSize: g,
      listState: K,
      minOverscanItemCount: tt,
      scrollToIndex: y,
      // output
      statefulTotalCount: w,
      trackItemSizes: A,
      // exported from stateFlagsSystem
      rangeChanged: rt,
      ...ot,
      // the bag of IO from featureGroup1System
      ...k,
      ..._,
      sizes: S,
      ...R
    };
  },
  he(
    Zn,
    or,
    Ze,
    Ow,
    Nw,
    Hi,
    lr,
    qw,
    kw,
    vb,
    Gw
  )
);
function Uw(a, i) {
  const o = {}, r = {};
  let c = 0;
  const f = a.length;
  for (; c < f; )
    r[a[c]] = 1, c += 1;
  for (const m in i)
    Object.hasOwn(r, m) || (o[m] = i[m]);
  return o;
}
const Es = typeof document < "u" ? dt.useLayoutEffect : dt.useEffect;
function Eb(a, i, o) {
  const r = Object.keys(i.required || {}), c = Object.keys(i.optional || {}), f = Object.keys(i.methods || {}), m = Object.keys(i.events || {}), p = dt.createContext({});
  function g(z, _) {
    z.propsReady !== void 0 && Dt(z.propsReady, !1);
    for (const R of r) {
      const L = z[i.required[R]];
      Dt(L, _[R]);
    }
    for (const R of c)
      if (R in _) {
        const L = z[i.optional[R]];
        Dt(L, _[R]);
      }
    z.propsReady !== void 0 && Dt(z.propsReady, !0);
  }
  function x(z) {
    return f.reduce((_, R) => (_[R] = (L) => {
      const q = z[i.methods[R]];
      Dt(q, L);
    }, _), {});
  }
  function S(z) {
    return m.reduce((_, R) => (_[R] = ew(z[i.events[R]]), _), {});
  }
  const w = dt.forwardRef(function(z, _) {
    const { children: R, ...L } = z, [q] = dt.useState(() => Xs(aw(a), (v) => {
      g(v, L);
    })), [y] = dt.useState(Vg(S, q));
    Es(() => {
      for (const v of m)
        v in L && te(y[v], L[v]);
      return () => {
        Object.values(y).map(Fd);
      };
    }, [L, y, q]), Es(() => {
      g(q, L);
    }), dt.useImperativeHandle(_, Yg(x(q)));
    const D = o;
    return /* @__PURE__ */ d.jsx(p.Provider, { value: q, children: o !== void 0 ? /* @__PURE__ */ d.jsx(D, { ...Uw([...r, ...c, ...m], L), children: R }) : R });
  }), C = (z) => {
    const _ = dt.useContext(p);
    return dt.useCallback(
      (R) => {
        Dt(_[z], R);
      },
      [_, z]
    );
  }, A = (z) => {
    const _ = dt.useContext(p)[z], R = dt.useCallback(
      (L) => te(_, L),
      [_]
    );
    return dt.useSyncExternalStore(
      R,
      () => xe(_),
      () => xe(_)
    );
  }, N = (z) => {
    const _ = dt.useContext(p)[z], [R, L] = dt.useState(Vg(xe, _));
    return Es(
      () => te(_, (q) => {
        q !== R && L(Yg(q));
      }),
      [_, R]
    ), R;
  }, B = parseInt(dt.version) >= 18 ? A : N;
  return {
    Component: w,
    useEmitter: (z, _) => {
      const R = dt.useContext(p)[z];
      Es(() => te(R, _), [_, R]);
    },
    useEmitterValue: B,
    usePublisher: C
  };
}
const Rb = dt.createContext(void 0), Nb = dt.createContext(void 0), xd = "-webkit-sticky", ax = "sticky", lf = zb(() => {
  if (typeof document > "u")
    return ax;
  const a = document.createElement("div");
  return a.style.position = xd, a.style.position === xd ? xd : ax;
}), Mb = typeof document < "u" ? dt.useLayoutEffect : dt.useEffect;
function bd(a) {
  return "self" in a;
}
function Lw(a) {
  return "body" in a;
}
function Db(a, i, o, r = kl, c, f) {
  const m = dt.useRef(null), p = dt.useRef(null), g = dt.useRef(null), x = dt.useCallback(
    (C) => {
      let A, N, B;
      const z = C.target;
      if (Lw(z) || bd(z)) {
        const R = bd(z) ? z : z.defaultView;
        B = f === !0 ? zi(R, R.scrollX) : R.scrollY, A = f === !0 ? R.document.documentElement.scrollWidth : R.document.documentElement.scrollHeight, N = f === !0 ? R.innerWidth : R.innerHeight;
      } else
        B = f === !0 ? zi(z, z.scrollLeft) : z.scrollTop, A = f === !0 ? z.scrollWidth : z.scrollHeight, N = f === !0 ? z.offsetWidth : z.offsetHeight;
      const _ = () => {
        a({
          scrollHeight: A,
          scrollTop: Math.max(B, 0),
          viewportHeight: N
        });
      };
      C.suppressFlushSync === !0 ? _() : $1.flushSync(_), p.current !== null && (B === p.current || B <= 0 || B === A - N) && (p.current = null, i(!0), g.current && (clearTimeout(g.current), g.current = null));
    },
    [a, i, f]
  );
  dt.useEffect(() => {
    const C = c || m.current;
    return Kg(C), r(c || m.current), x({ suppressFlushSync: !0, target: C }), C.addEventListener("scroll", x, { passive: !0 }), () => {
      Kg(C), r(null), C.removeEventListener("scroll", x);
    };
  }, [m, x, o, r, c]);
  function S(C) {
    const A = m.current;
    if (!A || (f === !0 ? "offsetWidth" in A && A.offsetWidth === 0 : "offsetHeight" in A && A.offsetHeight === 0))
      return;
    const N = C.behavior === "smooth";
    let B, z, _;
    bd(A) ? (z = Math.max(
      ai(A.document.documentElement, f === !0 ? "width" : "height"),
      f === !0 ? A.document.documentElement.scrollWidth : A.document.documentElement.scrollHeight
    ), B = f === !0 ? A.innerWidth : A.innerHeight, _ = f === !0 ? zi(A, A.scrollX) : A.scrollY) : (z = A[f === !0 ? "scrollWidth" : "scrollHeight"], B = ai(A, f === !0 ? "width" : "height"), _ = f === !0 ? zi(A, A.scrollLeft) : A.scrollTop);
    const R = z - B;
    if (C.top === void 0) {
      A.scrollTo(C);
      return;
    }
    const L = Math.ceil(Math.max(Math.min(R, C.top), 0));
    if (C.top = L, wb(B, z) || L === _) {
      a({ scrollHeight: z, scrollTop: _, viewportHeight: B }), N && i(!0);
      return;
    }
    N ? (p.current = L, g.current && clearTimeout(g.current), g.current = setTimeout(() => {
      g.current = null, p.current = null, i(!0);
    }, 1e3)) : p.current = null, f === !0 && (C = {
      ...C.behavior !== void 0 ? { behavior: C.behavior } : {},
      left: Ig(A, L)
    }), A.scrollTo(C);
  }
  function w(C) {
    f === !0 && (C = {
      ...C.behavior !== void 0 ? { behavior: C.behavior } : {},
      ...C.top !== void 0 ? { left: Ig(m.current, C.top) } : {}
    }), m.current.scrollBy(C);
  }
  return { scrollByCallback: w, scrollerRef: m, scrollToCallback: S };
}
function of(a) {
  return a;
}
const Qw = /* @__PURE__ */ $t(() => {
  const a = lt((p) => `Item ${p}`), i = lt((p) => `Group ${p}`), o = lt({}), r = lt(of), c = lt("div"), f = lt(kl), m = (p, g = null) => Xe(
    nt(
      o,
      ft((x) => x[p]),
      fe()
    ),
    g
  );
  return {
    components: o,
    computeItemKey: r,
    EmptyPlaceholder: m("EmptyPlaceholder"),
    FooterComponent: m("Footer"),
    GroupComponent: m("Group", "div"),
    groupContent: i,
    HeaderComponent: m("Header"),
    HeaderFooterTag: c,
    ItemComponent: m("Item", "div"),
    itemContent: a,
    ListComponent: m("List", "div"),
    ScrollerComponent: m("Scroller", "div"),
    scrollerRef: f,
    ScrollSeekPlaceholder: m("ScrollSeekPlaceholder"),
    TopItemListComponent: m("TopItemList")
  };
}), Yw = /* @__PURE__ */ $t(
  ([a, i]) => ({ ...a, ...i }),
  he(Ab, Qw)
), Vw = ({ height: a }) => /* @__PURE__ */ d.jsx("div", { style: { height: a } }), Xw = { overflowAnchor: "none", position: lf(), zIndex: 1 }, Ob = { overflowAnchor: "none" }, Kw = { ...Ob, display: "inline-block", height: "100%" }, ix = /* @__PURE__ */ dt.memo(function({ showTopList: a = !1 }) {
  const i = zt("listState"), o = En("sizeRanges"), r = zt("useWindowScroll"), c = zt("customScrollParent"), f = En("windowScrollContainerState"), m = En("scrollContainerState"), p = c || r ? f : m, g = zt("itemContent"), x = zt("context"), S = zt("groupContent"), w = zt("trackItemSizes"), C = zt("itemSize"), A = zt("log"), N = En("gap"), B = zt("horizontalDirection"), { callbackRef: z } = rw(
    o,
    C,
    w,
    a ? kl : p,
    A,
    N,
    c,
    B,
    zt("skipAnimationFrameInResizeObserver")
  ), [_, R] = dt.useState(0);
  sf("deviation", (ot) => {
    _ !== ot && R(ot);
  });
  const L = zt("EmptyPlaceholder"), q = zt("ScrollSeekPlaceholder") ?? Vw, y = zt("ListComponent"), D = zt("ItemComponent"), v = zt("GroupComponent"), M = zt("computeItemKey"), k = zt("isSeeking"), K = zt("groupIndices").length > 0, tt = zt("alignToBottom"), ct = zt("initialItemFinalLocationReached"), rt = a ? {} : {
    boxSizing: "border-box",
    ...B ? {
      display: "inline-block",
      height: "100%",
      marginInlineStart: _ !== 0 ? _ : tt ? "auto" : 0,
      paddingInlineEnd: i.offsetBottom,
      paddingInlineStart: i.offsetTop,
      whiteSpace: "nowrap"
    } : {
      marginTop: _ !== 0 ? _ : tt ? "auto" : 0,
      paddingBottom: i.offsetBottom,
      paddingTop: i.offsetTop
    },
    ...ct ? {} : { visibility: "hidden" }
  };
  return !a && i.totalCount === 0 && L !== null && L !== void 0 ? /* @__PURE__ */ d.jsx(L, { ...Ve(L, x) }) : /* @__PURE__ */ d.jsx(
    y,
    {
      ...Ve(y, x),
      "data-testid": a ? "virtuoso-top-item-list" : "virtuoso-item-list",
      ref: z,
      style: rt,
      children: (a ? i.topItems : i.items).map((ot) => {
        const yt = ot.originalIndex, H = M(yt + i.firstItemIndex, ot.data, x);
        return k ? /* @__PURE__ */ I.createElement(
          q,
          {
            ...Ve(q, x),
            height: ot.size,
            index: ot.index,
            key: H,
            type: ot.type || "item",
            ...ot.type === "group" ? {} : { groupIndex: ot.groupIndex }
          }
        ) : ot.type === "group" ? /* @__PURE__ */ I.createElement(
          v,
          {
            ...Ve(v, x),
            "data-index": yt,
            "data-item-index": ot.index,
            "data-known-size": ot.size,
            key: H,
            style: Xw
          },
          S(ot.index, x)
        ) : /* @__PURE__ */ I.createElement(
          D,
          {
            ...Ve(D, x),
            ...Fw(D, ot.data),
            "data-index": yt,
            "data-item-group-index": ot.groupIndex,
            "data-item-index": ot.index,
            "data-known-size": ot.size,
            key: H,
            style: B ? Kw : Ob
          },
          K ? g(ot.index, ot.groupIndex, ot.data, x) : g(ot.index, ot.data, x)
        );
      })
    }
  );
}), Iw = {
  height: "100%",
  outline: "none",
  overflowY: "auto",
  position: "relative",
  WebkitOverflowScrolling: "touch"
}, Zw = {
  outline: "none",
  overflowX: "auto",
  position: "relative"
}, rf = (a) => ({
  height: "100%",
  position: "absolute",
  top: 0,
  width: "100%",
  ...a ? { display: "flex", flexDirection: "column" } : void 0
}), Bb = (a, i, o = 0) => ({
  ...rf(a),
  position: i ? "relative" : "absolute",
  top: i ? -o : 0
}), $w = {
  position: lf(),
  top: 0,
  width: "100%",
  zIndex: 1
};
function Ve(a, i) {
  if (typeof a != "string")
    return { context: i };
}
function Fw(a, i) {
  return { item: typeof a == "string" ? void 0 : i };
}
const Jw = /* @__PURE__ */ dt.memo(function() {
  const a = zt("HeaderComponent"), i = En("headerHeight"), o = zt("HeaderFooterTag"), r = ki(
    dt.useMemo(
      () => (f) => {
        i(ai(f, "height"));
      },
      [i]
    ),
    !0,
    zt("skipAnimationFrameInResizeObserver")
  ), c = zt("context");
  return a != null ? /* @__PURE__ */ d.jsx(o, { ref: r, children: /* @__PURE__ */ d.jsx(a, { ...Ve(a, c) }) }) : null;
}), Ww = /* @__PURE__ */ dt.memo(function() {
  const a = zt("FooterComponent"), i = En("footerHeight"), o = zt("HeaderFooterTag"), r = ki(
    dt.useMemo(
      () => (f) => {
        i(ai(f, "height"));
      },
      [i]
    ),
    !0,
    zt("skipAnimationFrameInResizeObserver")
  ), c = zt("context");
  return a != null ? /* @__PURE__ */ d.jsx(o, { ref: r, children: /* @__PURE__ */ d.jsx(a, { ...Ve(a, c) }) }) : null;
});
function kb({ useEmitter: a, useEmitterValue: i, usePublisher: o }) {
  return dt.memo(function({ children: r, style: c, context: f, ...m }) {
    const p = o("scrollContainerState"), g = i("ScrollerComponent"), x = o("smoothScrollTargetReached"), S = i("scrollerRef"), w = i("horizontalDirection") || !1, { scrollByCallback: C, scrollerRef: A, scrollToCallback: N } = Db(
      p,
      x,
      g,
      S,
      void 0,
      w
    );
    return a("scrollTo", N), a("scrollBy", C), /* @__PURE__ */ d.jsx(
      g,
      {
        "data-testid": "virtuoso-scroller",
        "data-virtuoso-scroller": !0,
        ref: A,
        style: { ...w ? Zw : Iw, ...c },
        tabIndex: 0,
        ...m,
        ...Ve(g, f),
        children: r
      }
    );
  });
}
function Hb({ useEmitter: a, useEmitterValue: i, usePublisher: o }) {
  return dt.memo(function({ children: r, style: c, context: f, ...m }) {
    const p = o("windowScrollContainerState"), g = i("ScrollerComponent"), x = o("smoothScrollTargetReached"), S = i("totalListHeight"), w = i("deviation"), C = i("customScrollParent"), A = dt.useRef(null), N = i("scrollerRef"), { scrollByCallback: B, scrollerRef: z, scrollToCallback: _ } = Db(
      p,
      x,
      g,
      N,
      C
    );
    return Mb(() => {
      var R;
      return z.current = C || ((R = A.current) == null ? void 0 : R.ownerDocument.defaultView), () => {
        z.current = null;
      };
    }, [z, C]), a("windowScrollTo", _), a("scrollBy", B), /* @__PURE__ */ d.jsx(
      g,
      {
        ref: A,
        "data-virtuoso-scroller": !0,
        style: { position: "relative", ...c, ...S !== 0 ? { height: S + w } : void 0 },
        ...m,
        ...Ve(g, f),
        children: r
      }
    );
  });
}
const Pw = ({ children: a }) => {
  const i = dt.useContext(Rb), o = En("viewportHeight"), r = En("fixedItemHeight"), c = zt("alignToBottom"), f = zt("horizontalDirection"), m = dt.useMemo(
    () => lb(o, (g) => ai(g, f ? "width" : "height")),
    [o, f]
  ), p = ki(m, !0, zt("skipAnimationFrameInResizeObserver"));
  return dt.useEffect(() => {
    i && (o(i.viewportHeight), r(i.itemHeight));
  }, [i, o, r]), /* @__PURE__ */ d.jsx("div", { "data-viewport-type": "element", ref: p, style: rf(c), children: a });
}, tS = ({ children: a }) => {
  const i = dt.useContext(Rb), o = En("windowViewportRect"), r = En("fixedItemHeight"), c = zt("customScrollParent"), f = zt("useWindowScroll"), m = zt("topListHeight"), p = ub(
    o,
    c,
    zt("skipAnimationFrameInResizeObserver")
  ), g = zt("alignToBottom");
  return dt.useEffect(() => {
    i && (r(i.itemHeight), o({ listHeight: 0, offsetTop: 0, visibleHeight: i.viewportHeight, visibleWidth: 100 }));
  }, [i, o, r]), /* @__PURE__ */ d.jsx("div", { "data-viewport-type": "window", ref: p, style: Bb(g, f, m), children: a });
}, eS = ({ children: a }) => {
  const i = zt("TopItemListComponent") ?? "div", o = zt("headerHeight"), r = { ...$w, marginTop: `${o}px` }, c = zt("context");
  return /* @__PURE__ */ d.jsx(i, { style: r, ...Ve(i, c), children: a });
}, nS = /* @__PURE__ */ dt.memo(function(a) {
  const i = zt("useWindowScroll"), o = zt("topItemsIndexes").length > 0, r = zt("customScrollParent"), c = zt("context");
  return /* @__PURE__ */ d.jsxs(r || i ? lS : iS, { ...a, context: c, children: [
    o && /* @__PURE__ */ d.jsx(eS, { children: /* @__PURE__ */ d.jsx(ix, { showTopList: !0 }) }),
    /* @__PURE__ */ d.jsxs(r || i ? tS : Pw, { children: [
      /* @__PURE__ */ d.jsx(Jw, {}),
      /* @__PURE__ */ d.jsx(ix, {}),
      /* @__PURE__ */ d.jsx(Ww, {})
    ] })
  ] });
}), {
  Component: aS,
  useEmitter: sf,
  useEmitterValue: zt,
  usePublisher: En
} = /* @__PURE__ */ Eb(
  Yw,
  {
    optional: {
      restoreStateFrom: "restoreStateFrom",
      context: "context",
      followOutput: "followOutput",
      scrollIntoViewOnChange: "scrollIntoViewOnChange",
      itemContent: "itemContent",
      groupContent: "groupContent",
      overscan: "overscan",
      increaseViewportBy: "increaseViewportBy",
      minOverscanItemCount: "minOverscanItemCount",
      totalCount: "totalCount",
      groupCounts: "groupCounts",
      topItemCount: "topItemCount",
      firstItemIndex: "firstItemIndex",
      initialTopMostItemIndex: "initialTopMostItemIndex",
      components: "components",
      atBottomThreshold: "atBottomThreshold",
      atTopThreshold: "atTopThreshold",
      computeItemKey: "computeItemKey",
      defaultItemHeight: "defaultItemHeight",
      fixedGroupHeight: "fixedGroupHeight",
      // Must be set above 'fixedItemHeight'
      fixedItemHeight: "fixedItemHeight",
      heightEstimates: "heightEstimates",
      itemSize: "itemSize",
      scrollSeekConfiguration: "scrollSeekConfiguration",
      headerFooterTag: "HeaderFooterTag",
      data: "data",
      initialItemCount: "initialItemCount",
      initialScrollTop: "initialScrollTop",
      alignToBottom: "alignToBottom",
      useWindowScroll: "useWindowScroll",
      customScrollParent: "customScrollParent",
      scrollerRef: "scrollerRef",
      logLevel: "logLevel",
      horizontalDirection: "horizontalDirection",
      skipAnimationFrameInResizeObserver: "skipAnimationFrameInResizeObserver"
    },
    methods: {
      scrollToIndex: "scrollToIndex",
      scrollIntoView: "scrollIntoView",
      scrollTo: "scrollTo",
      scrollBy: "scrollBy",
      autoscrollToBottom: "autoscrollToBottom",
      getState: "getState"
    },
    events: {
      isScrolling: "isScrolling",
      endReached: "endReached",
      startReached: "startReached",
      rangeChanged: "rangeChanged",
      atBottomStateChange: "atBottomStateChange",
      atTopStateChange: "atTopStateChange",
      totalListHeightChanged: "totalListHeightChanged",
      itemsRendered: "itemsRendered",
      groupIndices: "groupIndices"
    }
  },
  nS
), iS = /* @__PURE__ */ kb({ useEmitter: sf, useEmitterValue: zt, usePublisher: En }), lS = /* @__PURE__ */ Hb({ useEmitter: sf, useEmitterValue: zt, usePublisher: En }), Is = aS, oS = /* @__PURE__ */ $t(() => {
  const a = lt((x) => /* @__PURE__ */ d.jsxs("td", { children: [
    "Item $",
    x
  ] })), i = lt(null), o = lt((x) => /* @__PURE__ */ d.jsxs("td", { colSpan: 1e3, children: [
    "Group ",
    x
  ] })), r = lt(null), c = lt(null), f = lt({}), m = lt(of), p = lt(kl), g = (x, S = null) => Xe(
    nt(
      f,
      ft((w) => w[x]),
      fe()
    ),
    S
  );
  return {
    components: f,
    computeItemKey: m,
    context: i,
    EmptyPlaceholder: g("EmptyPlaceholder"),
    FillerRow: g("FillerRow"),
    fixedFooterContent: c,
    fixedHeaderContent: r,
    itemContent: a,
    groupContent: o,
    ScrollerComponent: g("Scroller", "div"),
    scrollerRef: p,
    ScrollSeekPlaceholder: g("ScrollSeekPlaceholder"),
    TableBodyComponent: g("TableBody", "tbody"),
    TableComponent: g("Table", "table"),
    TableFooterComponent: g("TableFoot", "tfoot"),
    TableHeadComponent: g("TableHead", "thead"),
    TableRowComponent: g("TableRow", "tr"),
    GroupComponent: g("Group", "tr")
  };
});
he(Ab, oS);
lf();
const lx = {
  bottom: 0,
  itemHeight: 0,
  items: [],
  itemWidth: 0,
  offsetBottom: 0,
  offsetTop: 0,
  top: 0
}, rS = {
  bottom: 0,
  itemHeight: 0,
  items: [{ index: 0 }],
  itemWidth: 0,
  offsetBottom: 0,
  offsetTop: 0,
  top: 0
}, { ceil: ox, floor: Ls, max: qo, min: vd, round: rx } = Math;
function sx(a, i, o) {
  return Array.from({ length: i - a + 1 }).map((r, c) => ({ data: o === null ? null : o[c + a], index: c + a }));
}
function sS(a) {
  return {
    ...rS,
    items: a
  };
}
function Rs(a, i) {
  return a !== void 0 && a.width === i.width && a.height === i.height;
}
function uS(a, i) {
  return a !== void 0 && a.column === i.column && a.row === i.row;
}
const cS = /* @__PURE__ */ $t(
  ([
    { increaseViewportBy: a, listBoundary: i, overscan: o, visibleRange: r },
    { footerHeight: c, headerHeight: f, scrollBy: m, scrollContainerState: p, scrollTo: g, scrollTop: x, smoothScrollTargetReached: S, viewportHeight: w },
    C,
    A,
    { didMount: N, propsReady: B },
    { customScrollParent: z, useWindowScroll: _, windowScrollContainerState: R, windowScrollTo: L, windowViewportRect: q },
    y
  ]) => {
    const D = lt(0), v = lt(0), M = lt(lx), k = lt({ height: 0, width: 0 }), K = lt({ height: 0, width: 0 }), tt = Yt(), ct = Yt(), rt = lt(0), ot = lt(null), yt = lt({ column: 0, row: 0 }), H = Yt(), W = Yt(), F = lt(!1), ht = lt(0), st = lt(!0), T = lt(!1), Y = lt(!1);
    te(
      nt(
        N,
        Ot(ht),
        Tt(([at, vt]) => vt !== 0)
      ),
      () => {
        Dt(st, !1);
      }
    ), te(
      nt(
        Ae(N, st, K, k, ht, T),
        Tt(([at, vt, re, Vt, , Jt]) => at && !vt && re.height !== 0 && Vt.height !== 0 && !Jt)
      ),
      ([, , , , at]) => {
        Dt(T, !0), tf(1, () => {
          Dt(tt, at);
        }), kn(nt(x), () => {
          Dt(i, [0, 0]), Dt(st, !0);
        });
      }
    ), bt(
      nt(
        W,
        Tt((at) => at != null && at.scrollTop > 0),
        Kn(0)
      ),
      v
    ), te(
      nt(
        N,
        Ot(W),
        Tt(([, at]) => at != null)
      ),
      ([, at]) => {
        at && (Dt(k, at.viewport), Dt(K, at.item), Dt(yt, at.gap), at.scrollTop > 0 && (Dt(F, !0), kn(nt(x, Bi(1)), (vt) => {
          Dt(F, !1);
        }), Dt(g, { top: at.scrollTop })));
      }
    ), bt(
      nt(
        k,
        ft(({ height: at }) => at)
      ),
      w
    ), bt(
      nt(
        Ae(
          _t(k, Rs),
          _t(K, Rs),
          _t(yt, (at, vt) => at !== void 0 && at.column === vt.column && at.row === vt.row),
          _t(x)
        ),
        ft(([at, vt, re, Vt]) => ({
          gap: re,
          item: vt,
          scrollTop: Vt,
          viewport: at
        }))
      ),
      H
    ), bt(
      nt(
        Ae(
          _t(D),
          r,
          _t(yt, uS),
          _t(K, Rs),
          _t(k, Rs),
          _t(ot),
          _t(v),
          _t(F),
          _t(st),
          _t(ht)
        ),
        Tt(([, , , , , , , at]) => !at),
        ft(
          ([
            at,
            [vt, re],
            Vt,
            Jt,
            me,
            Xt,
            Kt,
            ,
            Bt,
            Ee
          ]) => {
            const { column: Wt, row: et } = Vt, { height: Et, width: we } = Jt, { width: $n } = me;
            if (Kt === 0 && (at === 0 || $n === 0))
              return lx;
            if (we === 0) {
              const cr = ef(Ee, at), Zs = cr + Math.max(Kt - 1, 0);
              return sS(sx(cr, Zs, Xt));
            }
            const va = qb($n, we, Wt);
            let pe, gn;
            Bt ? vt === 0 && re === 0 && Kt > 0 ? (pe = 0, gn = Kt - 1) : (pe = va * Ls((vt + et) / (Et + et)), gn = va * ox((re + et) / (Et + et)) - 1, gn = vd(at - 1, qo(gn, va - 1)), pe = vd(gn, qo(0, pe))) : (pe = 0, gn = -1);
            const ya = sx(pe, gn, Xt), { bottom: ri, top: si } = ux(me, Vt, Jt, ya), sr = ox(at / va), ur = sr * Et + (sr - 1) * et - ri;
            return { bottom: ri, itemHeight: Et, items: ya, itemWidth: we, offsetBottom: ur, offsetTop: si, top: si };
          }
        )
      ),
      M
    ), bt(
      nt(
        ot,
        Tt((at) => at !== null),
        ft((at) => at.length)
      ),
      D
    ), bt(
      nt(
        Ae(k, K, M, yt),
        Tt(([at, vt, { items: re }]) => re.length > 0 && vt.height !== 0 && at.height !== 0),
        ft(([at, vt, { items: re }, Vt]) => {
          const { bottom: Jt, top: me } = ux(at, Vt, vt, re);
          return [me, Jt];
        }),
        fe(Zo)
      ),
      i
    );
    const X = lt(!1);
    bt(
      nt(
        x,
        Ot(X),
        ft(([at, vt]) => vt || at !== 0)
      ),
      X
    );
    const it = mn(
      nt(
        Ae(M, D),
        Tt(([{ items: at }]) => at.length > 0),
        Ot(X),
        Tt(([[at, vt], re]) => {
          const Vt = at.items[at.items.length - 1].index === vt - 1;
          return (re || at.bottom > 0 && at.itemHeight > 0 && at.offsetBottom === 0 && at.items.length === vt) && Vt;
        }),
        ft(([[, at]]) => at - 1),
        fe()
      )
    ), gt = mn(
      nt(
        _t(M),
        Tt(({ items: at }) => at.length > 0 && at[0].index === 0),
        Kn(0),
        fe()
      )
    ), St = mn(
      nt(
        _t(M),
        Ot(F),
        Tt(([{ items: at }, vt]) => at.length > 0 && !vt),
        ft(([{ items: at }]) => ({
          endIndex: at[at.length - 1].index,
          startIndex: at[0].index
        })),
        fe(pb),
        xa(0)
      )
    );
    bt(St, A.scrollSeekRangeChanged), bt(
      nt(
        tt,
        Ot(k, K, D, yt),
        ft(([at, vt, re, Vt, Jt]) => {
          const me = yb(at), { align: Xt, behavior: Kt, offset: Bt } = me;
          let Ee = me.index;
          Ee === "LAST" && (Ee = Vt - 1), Ee = qo(0, Ee, vd(Vt - 1, Ee));
          let Wt = Bd(vt, Jt, re, Ee);
          return Xt === "end" ? Wt = rx(Wt - vt.height + re.height) : Xt === "center" && (Wt = rx(Wt - vt.height / 2 + re.height / 2)), Bt !== void 0 && Bt !== 0 && (Wt += Bt), { behavior: Kt, top: Wt };
        })
      ),
      g
    );
    const At = Xe(
      nt(
        M,
        ft((at) => at.offsetBottom + at.bottom)
      ),
      0
    );
    return bt(
      nt(
        q,
        ft((at) => ({ height: at.visibleHeight, width: at.visibleWidth }))
      ),
      k
    ), {
      customScrollParent: z,
      // input
      data: ot,
      deviation: rt,
      footerHeight: c,
      gap: yt,
      headerHeight: f,
      increaseViewportBy: a,
      initialItemCount: v,
      itemDimensions: K,
      overscan: o,
      restoreStateFrom: W,
      scrollBy: m,
      scrollContainerState: p,
      scrollHeight: ct,
      scrollTo: g,
      scrollToIndex: tt,
      scrollTop: x,
      smoothScrollTargetReached: S,
      totalCount: D,
      useWindowScroll: _,
      viewportDimensions: k,
      windowScrollContainerState: R,
      windowScrollTo: L,
      windowViewportRect: q,
      ...A,
      // output
      gridState: M,
      horizontalDirection: Y,
      initialTopMostItemIndex: ht,
      totalListHeight: At,
      ...C,
      endReached: it,
      propsReady: B,
      rangeChanged: St,
      startReached: gt,
      stateChanged: H,
      stateRestoreInProgress: F,
      ...y
    };
  },
  he(nf, Ze, rr, jb, oi, af, li)
);
function qb(a, i, o) {
  return qo(1, Ls((a + o) / (Ls(i) + o)));
}
function ux(a, i, o, r) {
  const { height: c } = o;
  if (c === void 0 || r.length === 0)
    return { bottom: 0, top: 0 };
  const f = Bd(a, i, o, r[0].index);
  return { bottom: Bd(a, i, o, r[r.length - 1].index) + c, top: f };
}
function Bd(a, i, o, r) {
  const c = qb(a.width, o.width, i.column), f = Ls(r / c), m = f * o.height + qo(0, f - 1) * i.row;
  return m > 0 ? m + i.row : m;
}
const dS = /* @__PURE__ */ $t(() => {
  const a = lt((w) => `Item ${w}`), i = lt({}), o = lt(null), r = lt("virtuoso-grid-item"), c = lt("virtuoso-grid-list"), f = lt(of), m = lt("div"), p = lt(kl), g = (w, C = null) => Xe(
    nt(
      i,
      ft((A) => A[w]),
      fe()
    ),
    C
  ), x = lt(!1), S = lt(!1);
  return bt(_t(S), x), {
    components: i,
    computeItemKey: f,
    context: o,
    FooterComponent: g("Footer"),
    HeaderComponent: g("Header"),
    headerFooterTag: m,
    itemClassName: r,
    ItemComponent: g("Item", "div"),
    itemContent: a,
    listClassName: c,
    ListComponent: g("List", "div"),
    readyStateChanged: x,
    reportReadyState: S,
    ScrollerComponent: g("Scroller", "div"),
    scrollerRef: p,
    ScrollSeekPlaceholder: g("ScrollSeekPlaceholder", "div")
  };
}), fS = /* @__PURE__ */ $t(
  ([a, i]) => ({ ...a, ...i }),
  he(cS, dS)
), hS = /* @__PURE__ */ dt.memo(function() {
  const a = de("gridState"), i = de("listClassName"), o = de("itemClassName"), r = de("itemContent"), c = de("computeItemKey"), f = de("isSeeking"), m = Rn("scrollHeight"), p = de("ItemComponent"), g = de("ListComponent"), x = de("ScrollSeekPlaceholder"), S = de("context"), w = Rn("itemDimensions"), C = Rn("gap"), A = de("log"), N = de("stateRestoreInProgress"), B = Rn("reportReadyState"), z = ki(
    dt.useMemo(
      () => (_) => {
        const R = _.parentElement.parentElement.scrollHeight;
        m(R);
        const L = _.firstChild;
        if (L !== null) {
          const { height: q, width: y } = L.getBoundingClientRect();
          w({ height: q, width: y });
        }
        C({
          column: cx("column-gap", getComputedStyle(_).columnGap, A),
          row: cx("row-gap", getComputedStyle(_).rowGap, A)
        });
      },
      [m, w, C, A]
    ),
    !0,
    !1
  );
  return Mb(() => {
    a.itemHeight > 0 && a.itemWidth > 0 && B(!0);
  }, [a]), N ? null : /* @__PURE__ */ d.jsx(
    g,
    {
      className: i,
      ref: z,
      ...Ve(g, S),
      "data-testid": "virtuoso-item-list",
      style: { paddingBottom: a.offsetBottom, paddingTop: a.offsetTop },
      children: a.items.map((_) => {
        const R = c(_.index, _.data, S);
        return f ? /* @__PURE__ */ d.jsx(
          x,
          {
            ...Ve(x, S),
            height: a.itemHeight,
            index: _.index,
            width: a.itemWidth
          },
          R
        ) : /* @__PURE__ */ I.createElement(
          p,
          {
            ...Ve(p, S),
            className: o,
            "data-index": _.index,
            key: R
          },
          r(_.index, _.data, S)
        );
      })
    }
  );
}), mS = dt.memo(function() {
  const a = de("HeaderComponent"), i = Rn("headerHeight"), o = de("headerFooterTag"), r = ki(
    dt.useMemo(
      () => (f) => {
        i(ai(f, "height"));
      },
      [i]
    ),
    !0,
    !1
  ), c = de("context");
  return a != null ? /* @__PURE__ */ d.jsx(o, { ref: r, children: /* @__PURE__ */ d.jsx(a, { ...Ve(a, c) }) }) : null;
}), pS = dt.memo(function() {
  const a = de("FooterComponent"), i = Rn("footerHeight"), o = de("headerFooterTag"), r = ki(
    dt.useMemo(
      () => (f) => {
        i(ai(f, "height"));
      },
      [i]
    ),
    !0,
    !1
  ), c = de("context");
  return a != null ? /* @__PURE__ */ d.jsx(o, { ref: r, children: /* @__PURE__ */ d.jsx(a, { ...Ve(a, c) }) }) : null;
}), gS = ({ children: a }) => {
  const i = dt.useContext(Nb), o = Rn("itemDimensions"), r = Rn("viewportDimensions"), c = ki(
    dt.useMemo(
      () => (f) => {
        r(f.getBoundingClientRect());
      },
      [r]
    ),
    !0,
    !1
  );
  return dt.useEffect(() => {
    i && (r({ height: i.viewportHeight, width: i.viewportWidth }), o({ height: i.itemHeight, width: i.itemWidth }));
  }, [i, r, o]), /* @__PURE__ */ d.jsx("div", { ref: c, style: rf(!1), children: a });
}, xS = ({ children: a }) => {
  const i = dt.useContext(Nb), o = Rn("windowViewportRect"), r = Rn("itemDimensions"), c = de("customScrollParent"), f = de("useWindowScroll"), m = ub(o, c, !1);
  return dt.useEffect(() => {
    i && (r({ height: i.itemHeight, width: i.itemWidth }), o({ listHeight: 0, offsetTop: 0, visibleHeight: i.viewportHeight, visibleWidth: i.viewportWidth }));
  }, [i, o, r]), /* @__PURE__ */ d.jsx("div", { ref: m, style: Bb(!1, f), children: a });
}, bS = /* @__PURE__ */ dt.memo(function({ ...a }) {
  const i = de("useWindowScroll"), o = de("customScrollParent"), r = o || i ? yS : vS, c = o || i ? xS : gS, f = de("context");
  return /* @__PURE__ */ d.jsx(r, { ...a, ...Ve(r, f), children: /* @__PURE__ */ d.jsxs(c, { children: [
    /* @__PURE__ */ d.jsx(mS, {}),
    /* @__PURE__ */ d.jsx(hS, {}),
    /* @__PURE__ */ d.jsx(pS, {})
  ] }) });
}), {
  useEmitter: Gb,
  useEmitterValue: de,
  usePublisher: Rn
} = /* @__PURE__ */ Eb(
  fS,
  {
    optional: {
      context: "context",
      totalCount: "totalCount",
      overscan: "overscan",
      itemContent: "itemContent",
      components: "components",
      computeItemKey: "computeItemKey",
      data: "data",
      initialItemCount: "initialItemCount",
      scrollSeekConfiguration: "scrollSeekConfiguration",
      headerFooterTag: "headerFooterTag",
      listClassName: "listClassName",
      itemClassName: "itemClassName",
      useWindowScroll: "useWindowScroll",
      customScrollParent: "customScrollParent",
      scrollerRef: "scrollerRef",
      logLevel: "logLevel",
      restoreStateFrom: "restoreStateFrom",
      initialTopMostItemIndex: "initialTopMostItemIndex",
      increaseViewportBy: "increaseViewportBy"
    },
    methods: {
      scrollTo: "scrollTo",
      scrollBy: "scrollBy",
      scrollToIndex: "scrollToIndex"
    },
    events: {
      isScrolling: "isScrolling",
      endReached: "endReached",
      startReached: "startReached",
      rangeChanged: "rangeChanged",
      atBottomStateChange: "atBottomStateChange",
      atTopStateChange: "atTopStateChange",
      stateChanged: "stateChanged",
      readyStateChanged: "readyStateChanged"
    }
  },
  bS
), vS = /* @__PURE__ */ kb({ useEmitter: Gb, useEmitterValue: de, usePublisher: Rn }), yS = /* @__PURE__ */ Hb({ useEmitter: Gb, useEmitterValue: de, usePublisher: Rn });
function cx(a, i, o) {
  return i !== "normal" && (i == null ? void 0 : i.endsWith("px")) !== !0 && o(`${a} was not resolved to pixel value correctly`, i, Me.WARN), i === "normal" ? 0 : parseInt(i ?? "0", 10);
}
function ut({ icon: a, className: i, title: o }) {
  return dt.createElement("ha-icon", { icon: a, className: i, title: o });
}
function wS(a) {
  const i = ni(a).length;
  return a.status === "error" ? "error" : i || Qo(a) || Yo(a) || a.status === "waiting_approval" && i ? "approval" : Qd(a) ? "restart" : ["planning", "running", "working"].includes(a.status || "") ? "working" : "idle";
}
function SS(a, i) {
  return i ? "running" : a ? a.status === "passed" || a.ok === !0 || a.returncode === 0 ? "success" : a.status === "failed" || a.ok === !1 || Number.isInteger(a.returncode) && a.returncode !== 0 ? "error" : a.status === "unavailable" ? "warning" : "unknown" : "unknown";
}
function CS(a) {
  return a === "success" ? "mdi:check-circle" : a === "error" ? "mdi:alert-circle" : a === "warning" ? "mdi:alert-outline" : a === "running" ? "mdi:progress-clock" : "mdi:help-circle-outline";
}
function _S(a) {
  var k;
  const i = qt((K) => K.showArchived ? K.archivedChatIds : K.activeChatIds), o = qt((K) => K.activeId), r = qt((K) => K.showArchived), c = qt((K) => K.archivedChatIds.length), f = qt((K) => K.scheduledRestart), m = qt((K) => K.chatsById), p = I.useMemo(() => u1(Object.values(m)), [m]), g = qt((K) => K.validation), x = qt((K) => K.validationRunning), S = pt((K) => K.status), w = S.usage || {}, C = ((k = S.runtime) == null ? void 0 : k.bridge_available) === !1, A = SS(g, x), N = r ? "Current chats" : "Archived chats", [B, z] = I.useState({ active: !1, ids: [], phase: 0 }), [_, R] = I.useState(!1), L = I.useRef(null), q = I.useRef(null), y = I.useRef(null), D = r ? "archived" : "current", v = I.useMemo(() => new Set(B.ids), [B.ids]);
  I.useEffect(() => {
    const K = L.current;
    if (L.current = { ids: i, mode: D }, !K || K.mode !== D || K.ids.length !== i.length) return;
    const tt = new Map(K.ids.map((rt, ot) => [rt, ot]));
    if (!i.every((rt) => tt.has(rt))) return;
    const ct = i.filter((rt, ot) => tt.get(rt) !== ot);
    ct.length && (y.current && window.clearTimeout(y.current), z((rt) => ({ active: !0, ids: ct, phase: rt.phase === 1 ? 2 : 1 })), y.current = window.setTimeout(() => {
      z((rt) => ({ ...rt, active: !1, ids: [] })), y.current = null;
    }, 340));
  }, [D, i]), I.useEffect(() => () => {
    y.current && window.clearTimeout(y.current);
  }, []), I.useEffect(() => {
    p.length || R(!1);
  }, [p.length]), I.useEffect(() => {
    if (!_) return;
    const K = (tt) => {
      const ct = tt.composedPath();
      q.current && ct.includes(q.current) || R(!1);
    };
    return window.addEventListener("pointerdown", K), () => window.removeEventListener("pointerdown", K);
  }, [_]);
  const M = p[0];
  return /* @__PURE__ */ d.jsxs("aside", { className: "rail", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "brand", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("strong", { children: "Codex" }),
        /* @__PURE__ */ d.jsx("span", { children: "Home Assistant" })
      ] }),
      /* @__PURE__ */ d.jsx("button", { onClick: a.onNew, title: "New chat", children: "+" })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "sessions", "data-sessions-mode": r ? "archived" : "current", children: [
      i.length ? null : /* @__PURE__ */ d.jsx("p", { className: "muted pad", children: r ? "No archived chats." : "No chats yet." }),
      i.length ? /* @__PURE__ */ d.jsx(
        Is,
        {
          className: "sessions-virtual-list",
          data: i,
          computeItemKey: (K, tt) => tt,
          itemContent: (K, tt) => /* @__PURE__ */ d.jsx(
            jS,
            {
              id: tt,
              active: tt === o,
              switching: B.active && v.has(tt),
              switchPhase: B.phase,
              onSelect: a.onSelect,
              onArchive: a.onArchive
            }
          )
        }
      ) : null
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "rail-footer", children: [
      /* @__PURE__ */ d.jsxs("div", { className: "usage-summary", title: "Codex usage remaining", children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsxs("span", { className: "usage-main", children: [
            /* @__PURE__ */ d.jsx("span", { children: "5h" }),
            /* @__PURE__ */ d.jsx("strong", { children: dx(w.five_hour_remaining_percent) })
          ] }),
          fx(w.five_hour_reset_at)
        ] }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsxs("span", { className: "usage-main", children: [
            /* @__PURE__ */ d.jsx("span", { children: "Weekly" }),
            /* @__PURE__ */ d.jsx("strong", { children: dx(w.weekly_remaining_percent) })
          ] }),
          fx(w.weekly_reset_at)
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: `rail-footer-actions ${p.length ? "restart-pending" : ""}`, children: [
        /* @__PURE__ */ d.jsxs("button", { className: `archive-toggle ${r ? "active" : ""}`, onClick: a.onToggleArchived, children: [
          /* @__PURE__ */ d.jsx(ut, { icon: "mdi:archive-outline" }),
          /* @__PURE__ */ d.jsx("span", { className: "overflow-title", title: N, children: N }),
          /* @__PURE__ */ d.jsx("b", { children: c })
        ] }),
        M ? /* @__PURE__ */ d.jsx(
          TS,
          {
            approval: M.approval,
            count: p.length,
            menuOpen: _,
            actionRef: q,
            scheduled: f,
            session: M.session,
            onMenuOpen: R,
            onRestartNow: a.onRestartNow,
            onRestartSchedule: a.onRestartSchedule,
            onRestartScheduleCancel: a.onRestartScheduleCancel
          }
        ) : null,
        /* @__PURE__ */ d.jsxs("button", { className: `validation-status-button ${A}`, onClick: a.onValidate, title: "Run HA config validation", "aria-label": "Run HA config validation", "aria-disabled": x, children: [
          /* @__PURE__ */ d.jsx(ut, { icon: CS(A) }),
          /* @__PURE__ */ d.jsxs("span", { className: "validation-tooltip", role: "tooltip", children: [
            /* @__PURE__ */ d.jsx("strong", { children: "HA Config Validation" }),
            /* @__PURE__ */ d.jsx("span", { children: x ? "Running Home Assistant config validation..." : g ? g.status || "done" : "No validation result yet. Click to run check." })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { className: `debug-button ${C ? "bridge-unavailable" : ""}`, onClick: a.onDebug, title: "Open settings", "aria-label": "Open settings", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:cog-outline" }) })
      ] })
    ] })
  ] });
}
const TS = I.memo(function({
  approval: i,
  count: o,
  menuOpen: r,
  actionRef: c,
  scheduled: f,
  session: m,
  onMenuOpen: p,
  onRestartNow: g,
  onRestartSchedule: x,
  onRestartScheduleCancel: S
}) {
  const w = f ? "Restart scheduled after pending completion" : `${o} pending restart${o === 1 ? "" : "s"}`;
  return /* @__PURE__ */ d.jsxs("div", { className: "restart-action-wrap", ref: c, children: [
    /* @__PURE__ */ d.jsx(
      "button",
      {
        className: `restart-action ${f ? "scheduled" : "pending"}`,
        onClick: () => p(!r),
        title: w,
        "aria-label": w,
        "aria-expanded": r,
        "aria-haspopup": "menu",
        children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:restart" })
      }
    ),
    r ? /* @__PURE__ */ d.jsxs("div", { className: "restart-action-menu", role: "menu", children: [
      /* @__PURE__ */ d.jsx(
        "button",
        {
          role: "menuitem",
          onClick: () => {
            p(!1), g(m.id, i.id);
          },
          children: "Restart now"
        }
      ),
      /* @__PURE__ */ d.jsx(
        "button",
        {
          role: "menuitem",
          onClick: () => {
            p(!1), f ? S() : x();
          },
          children: f ? "Cancel auto restart" : "Restart after pending completion"
        }
      )
    ] }) : null
  ] });
}), jS = I.memo(function({ id: i, active: o, switching: r, switchPhase: c, onSelect: f, onArchive: m }) {
  const p = qt((x) => x.chatsById[i]);
  if (!p) return null;
  const g = !!p.archived;
  return /* @__PURE__ */ d.jsxs("div", { className: `session-row ${o ? "active" : ""} ${g ? "archived" : ""} ${r ? `switching switching-${c}` : ""}`, "data-session-id": i, children: [
    /* @__PURE__ */ d.jsx("button", { className: "session", onClick: () => f(i), children: /* @__PURE__ */ d.jsxs("span", { className: "session-text", children: [
      /* @__PURE__ */ d.jsxs("span", { className: "title-line", children: [
        /* @__PURE__ */ d.jsx("span", { className: `status-dot status-dot-${wS(p)}`, "aria-hidden": "true" }),
        /* @__PURE__ */ d.jsx("span", { className: "title overflow-title", title: p.title, children: p.title })
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: "meta", children: ir(jd(p)) })
    ] }) }),
    /* @__PURE__ */ d.jsx("button", { className: "icon-button session-archive", onClick: () => m(i, !g), title: g ? "Restore chat" : "Archive chat", "aria-label": g ? "Restore chat" : "Archive chat", children: /* @__PURE__ */ d.jsx(ut, { icon: g ? "mdi:archive-arrow-up-outline" : "mdi:archive-arrow-down-outline" }) })
  ] });
});
function dx(a) {
  if (a == null || a === "") return "--%";
  const i = Number(a);
  return Number.isFinite(i) ? `${Math.round(i)}%` : "--%";
}
function fx(a) {
  const i = eb(a);
  return i ? /* @__PURE__ */ d.jsxs("small", { title: Gs(a), children: [
    "Resets ",
    i
  ] }) : /* @__PURE__ */ d.jsx("small", { children: "--" });
}
function zS(a) {
  var o;
  const i = (o = a == null ? void 0 : a.summary) == null ? void 0 : o.recommendation;
  return i === "fix_validation_errors" ? "error" : i === "restart_required" ? "restart" : i === "reload_may_be_enough" || i === "validation_unavailable" ? "warning" : i === "no_action_needed" ? "success" : (a == null ? void 0 : a.status) === "failed" || (a == null ? void 0 : a.ok) === !1 ? "error" : (a == null ? void 0 : a.status) === "passed" || (a == null ? void 0 : a.ok) === !0 || (a == null ? void 0 : a.returncode) === 0 ? "success" : "unknown";
}
function AS(a) {
  var i;
  return (i = a == null ? void 0 : a.summary) != null && i.label ? a.summary.label : a ? a.status === "passed" ? "No action needed" : a.status === "failed" ? "Fix validation errors first" : a.status === "unavailable" ? "Validation unavailable" : "Validation finished" : "No validation result yet";
}
function ES(a) {
  var i;
  return ((i = a == null ? void 0 : a.summary) == null ? void 0 : i.recommendation) !== "reload_may_be_enough" ? [] : [...a.summary.reload_domains || []];
}
function RS(a) {
  return ((a == null ? void 0 : a.command) || []).join(" ");
}
function NS({ validation: a, compact: i = !1, onReloadDomains: o }) {
  if (!a) return null;
  const r = a.summary || {}, c = zS(a), f = AS(a), m = RS(a), p = r.affected_domains || [], g = r.changed_files || [], x = ES(a), S = pn([a.stdout, a.stderr].filter(Boolean).join(`
`)).trim(), w = [r.session_title, r.session_id && !r.session_title ? r.session_id : ""].filter(Boolean).join(" · ");
  return /* @__PURE__ */ d.jsxs("section", { className: `validation-card ${c} ${i ? "compact" : ""}`, children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx(ut, { icon: c === "error" ? "mdi:alert-circle-outline" : c === "restart" ? "mdi:restart-alert" : c === "warning" ? "mdi:reload-alert" : "mdi:check-circle-outline" }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("strong", { children: f }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          a.status || "unknown",
          a.returncode !== void 0 && a.returncode !== null ? ` · exit ${a.returncode}` : "",
          a.created_at ? ` · ${ir(a.created_at)}` : ""
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "validation-meta", children: [
      m ? /* @__PURE__ */ d.jsxs("span", { title: m, children: [
        /* @__PURE__ */ d.jsx("b", { children: "Command" }),
        m
      ] }) : null,
      w ? /* @__PURE__ */ d.jsxs("span", { title: w, children: [
        /* @__PURE__ */ d.jsx("b", { children: "Chat" }),
        w
      ] }) : null,
      a.created_at ? /* @__PURE__ */ d.jsxs("span", { title: Gs(a.created_at), children: [
        /* @__PURE__ */ d.jsx("b", { children: "Timestamp" }),
        Gs(a.created_at)
      ] }) : null
    ] }),
    p.length ? /* @__PURE__ */ d.jsx("div", { className: "validation-domains", "aria-label": "Affected Home Assistant domains", children: p.map((C) => /* @__PURE__ */ d.jsx("span", { title: (C.paths || []).join(", "), children: C.label || C.id }, C.id)) }) : null,
    g.length && !i ? /* @__PURE__ */ d.jsxs("ul", { className: "validation-files", "aria-label": "Changed Home Assistant files", children: [
      g.slice(0, 8).map((C) => /* @__PURE__ */ d.jsxs("li", { children: [
        /* @__PURE__ */ d.jsx("b", { children: C.status || "changed" }),
        C.path
      ] }, `${C.status}:${C.path}`)),
      g.length > 8 ? /* @__PURE__ */ d.jsxs("li", { children: [
        /* @__PURE__ */ d.jsx("b", { children: "more" }),
        g.length - 8,
        " additional files"
      ] }) : null
    ] }) : null,
    x.length && o ? /* @__PURE__ */ d.jsx("div", { className: "validation-actions", children: x.map((C) => /* @__PURE__ */ d.jsxs("button", { type: "button", className: "ghost", onClick: () => o([C]), children: [
      /* @__PURE__ */ d.jsx(ut, { icon: "mdi:reload" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        "Reload ",
        MS(C)
      ] })
    ] }, C)) }) : null,
    S ? /* @__PURE__ */ d.jsxs("details", { className: "validation-output", open: !i && c === "error", children: [
      /* @__PURE__ */ d.jsx("summary", { children: "Validation output" }),
      /* @__PURE__ */ d.jsx("pre", { children: S })
    ] }) : null
  ] });
}
function MS(a) {
  return {
    automations: "automations",
    scripts: "scripts",
    scenes: "scenes",
    themes: "themes"
  }[a] || a;
}
const DS = 180, Ub = [];
function OS(a) {
  const i = pt((r) => {
    var c;
    return (c = r.gitChanges) != null && c.files ? Hs(r.gitChanges.files) : r.gitChangedCount;
  }), o = pt((r) => {
    var c;
    return (c = r.gitChanges) != null && c.files ? Vd(r.gitChanges.files, r.gitSelection) : 0;
  });
  return /* @__PURE__ */ d.jsxs("aside", { className: "drawer", "aria-hidden": a.open === !1 ? "true" : "false", children: [
    /* @__PURE__ */ d.jsxs("header", { className: "drawer-header", children: [
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("h2", { children: "Git" }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          i,
          " changed ",
          i === 1 ? "file" : "files",
          " · ",
          o,
          " selected"
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "drawer-actions", children: [
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", onClick: a.onRefresh, title: "Refresh changes", "aria-label": "Refresh changes", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:refresh" }) }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", onClick: a.onClose, title: "Close Git panel", "aria-label": "Close Git panel", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:close" }) })
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "drawer-body git-review", children: /* @__PURE__ */ d.jsx(BS, { ...a }) }),
    /* @__PURE__ */ d.jsx(qS, { onCommit: a.onCommit, onDiscard: a.onDiscard })
  ] });
}
function BS({ onToggleFile: a }) {
  var m;
  const i = pt((p) => p.gitLoading), o = pt((p) => p.gitChanges), r = (o == null ? void 0 : o.files) || Ub, c = I.useMemo(() => ar(r), [r]), f = I.useMemo(() => A1(c).flatMap((p) => [
    { type: "folder", folder: p.folder },
    ...p.files.map((g) => ({ type: "file", file: g }))
  ]), [c]);
  return i && !o ? /* @__PURE__ */ d.jsx("div", { className: "loading-state", children: "Loading Git changes..." }) : o && o.ok === !1 && !((m = o.files) != null && m.length) ? /* @__PURE__ */ d.jsx("div", { className: "loading-state error", children: pn(o.stderr || "Git reload failed.") }) : c.length ? /* @__PURE__ */ d.jsx(
    Is,
    {
      className: "git-virtual-list",
      data: f,
      itemContent: (p, g) => g.type === "folder" ? /* @__PURE__ */ d.jsx("h3", { className: "git-folder-heading", title: g.folder, children: g.folder }) : /* @__PURE__ */ d.jsx(Lb, { file: g.file, onToggleFile: a }, ba(g.file.path, g.file.old_path || ""))
    }
  ) : /* @__PURE__ */ d.jsx("p", { className: "muted pad", children: i ? "Refreshing changes..." : "No changed files." });
}
function Lb({
  file: a,
  onToggleFile: i,
  open: o,
  diff: r,
  loading: c = !1,
  selectable: f = !0,
  displayPath: m = "name"
}) {
  const p = ba(a.path, a.old_path || ""), g = pt((R) => R.openGitDiffKey === p), x = pt((R) => R.gitFileDiffs[p] || (a.patch ? a : null)), S = pt((R) => R.gitFileDiffLoading[p]), w = o ?? g, C = r === void 0 ? x : r, A = c || o === void 0 && !!S, N = I.useMemo(() => M1((C == null ? void 0 : C.patch) || ""), [C == null ? void 0 : C.patch]), B = m === "path" ? a.path : a.display_name || Fx(a.path).name, z = a.status !== "deleted", _ = String(a.status || "changed").toLowerCase();
  return /* @__PURE__ */ d.jsxs("section", { className: `diff-file ${w ? "open" : ""}`, "data-diff-key": p, children: [
    /* @__PURE__ */ d.jsxs("div", { className: `diff-card ${z ? "" : "no-line-stats"} ${f ? "" : "no-select"}`, onClick: () => i(a.path, a.old_path || ""), role: "button", tabIndex: 0, title: a.path, onKeyDown: (R) => {
      R.target instanceof HTMLInputElement || (R.key === "Enter" || R.key === " ") && (R.preventDefault(), i(a.path, a.old_path || ""));
    }, children: [
      f ? /* @__PURE__ */ d.jsx(kS, { file: a, displayName: B }) : null,
      /* @__PURE__ */ d.jsxs("span", { className: "diff-file-main", children: [
        /* @__PURE__ */ d.jsx("strong", { children: B }),
        a.old_path ? /* @__PURE__ */ d.jsxs("span", { children: [
          a.old_path,
          " -> ",
          a.path
        ] }) : null
      ] }),
      z ? /* @__PURE__ */ d.jsxs("span", { className: "line-stats", children: [
        /* @__PURE__ */ d.jsx(mx, { value: a.added_lines, type: "added" }),
        /* @__PURE__ */ d.jsx(mx, { value: a.deleted_lines, type: "deleted" })
      ] }) : null,
      /* @__PURE__ */ d.jsx("b", { className: `file-status ${_}`, children: /* @__PURE__ */ d.jsx(ut, { icon: D1(_) }) }),
      /* @__PURE__ */ d.jsxs("span", { className: "diff-open-action", children: [
        /* @__PURE__ */ d.jsx(ut, { icon: w ? "mdi:chevron-up" : "mdi:chevron-down" }),
        /* @__PURE__ */ d.jsx("span", { children: w ? "Hide" : "Diff" })
      ] })
    ] }),
    w ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(HS, { loading: !!A, lines: N }),
      C != null && C.stderr || C != null && C.patch_error ? /* @__PURE__ */ d.jsx("pre", { className: "diff-error", children: pn(C.stderr || C.patch_error || "").trim() }) : null
    ] }) : null
  ] });
}
function kS({ file: a, displayName: i }) {
  const o = ba(a.path, a.old_path || ""), r = pt((f) => f.gitSelection[o] === !0), c = pt((f) => f.setGitFileSelected);
  return /* @__PURE__ */ d.jsx("label", { className: "git-file-select", title: r ? "Deselect file" : "Select file", onClick: (f) => f.stopPropagation(), children: /* @__PURE__ */ d.jsx(
    "input",
    {
      type: "checkbox",
      checked: r,
      "aria-label": `Select ${i}`,
      onChange: (f) => c(a, f.currentTarget.checked)
    }
  ) });
}
function HS({ loading: a, lines: i }) {
  return a ? /* @__PURE__ */ d.jsx("div", { className: "diff-lines", children: /* @__PURE__ */ d.jsx("div", { className: "diff-empty", children: "Loading diff..." }) }) : i.length ? i.length >= DS ? /* @__PURE__ */ d.jsx("div", { className: "diff-lines virtualized", children: /* @__PURE__ */ d.jsx(
    Is,
    {
      data: i,
      itemContent: (o, r) => /* @__PURE__ */ d.jsx(hx, { line: r }, o)
    }
  ) }) : /* @__PURE__ */ d.jsx("div", { className: "diff-lines", children: i.map((o, r) => /* @__PURE__ */ d.jsx(hx, { line: o }, r)) }) : /* @__PURE__ */ d.jsx("div", { className: "diff-lines", children: /* @__PURE__ */ d.jsx("div", { className: "diff-empty", children: "No textual diff available." }) });
}
function hx({ line: a }) {
  return /* @__PURE__ */ d.jsxs("div", { className: `diff-line ${a.type}`, children: [
    /* @__PURE__ */ d.jsx("span", { className: "marker", children: a.type === "added" ? "+" : a.type === "deleted" ? "-" : a.type === "hunk" ? "@" : "" }),
    /* @__PURE__ */ d.jsx("code", { children: a.content })
  ] });
}
function mx({ value: a, type: i }) {
  return a == null ? /* @__PURE__ */ d.jsx("span", { className: i, children: "--" }) : /* @__PURE__ */ d.jsxs("span", { className: i, children: [
    i === "added" ? "+" : "-",
    Number(a)
  ] });
}
function qS({ onCommit: a, onDiscard: i }) {
  const o = pt((A) => A.commitMessage), r = pt((A) => A.setCommitMessage), c = pt((A) => A.commitRunning), f = pt((A) => A.discardRunning), m = pt((A) => A.gitDiscardConfirming), p = pt((A) => A.setGitDiscardConfirming), g = pt((A) => {
    var N;
    return ((N = A.gitChanges) == null ? void 0 : N.files) || Ub;
  }), x = pt((A) => A.gitSelection), S = Vd(g, x), w = qg(g, x, c), C = qg(g, x, c || f);
  return /* @__PURE__ */ d.jsxs("form", { className: "commit-box", onSubmit: (A) => {
    A.preventDefault(), a(o);
  }, children: [
    /* @__PURE__ */ d.jsx("textarea", { name: "commit-message", placeholder: "Commit message", rows: 1, disabled: c, value: o, onChange: (A) => r(A.target.value) }),
    /* @__PURE__ */ d.jsxs("div", { className: "git-action-row", children: [
      /* @__PURE__ */ d.jsxs("button", { type: "submit", disabled: w, children: [
        /* @__PURE__ */ d.jsx(ut, { icon: c ? "mdi:progress-clock" : "mdi:source-commit" }),
        /* @__PURE__ */ d.jsx("span", { children: c ? "Pushing..." : "Commit & Push" })
      ] }),
      /* @__PURE__ */ d.jsxs("button", { type: "button", className: "danger", disabled: C, onClick: () => p(!0), children: [
        /* @__PURE__ */ d.jsx(ut, { icon: "mdi:trash-can-outline" }),
        /* @__PURE__ */ d.jsx("span", { children: "Discard selected" })
      ] })
    ] }),
    m && S ? /* @__PURE__ */ d.jsxs("div", { className: "discard-confirm", children: [
      /* @__PURE__ */ d.jsxs("span", { children: [
        "Discard ",
        S,
        " selected ",
        S === 1 ? "file" : "files",
        "?"
      ] }),
      /* @__PURE__ */ d.jsxs("button", { type: "button", className: "danger", disabled: f, onClick: i, children: [
        /* @__PURE__ */ d.jsx(ut, { icon: f ? "mdi:progress-clock" : "mdi:check" }),
        /* @__PURE__ */ d.jsx("span", { children: f ? "Discarding..." : "Confirm discard" })
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", className: "ghost", disabled: f, onClick: () => p(!1), children: "Cancel" })
    ] }) : null,
    /* @__PURE__ */ d.jsx(GS, {})
  ] });
}
function GS() {
  const a = pt((c) => c.gitOperationResult);
  if (!a) return null;
  const i = a.discarded_paths || a.selected_paths || [], o = pn([
    a.stdout,
    a.stderr,
    ...(a.results || []).flatMap((c) => [c.stdout, c.stderr])
  ].filter(Boolean).join(`
`)).trim(), r = a.ok ? a.step === "discard" ? "Discarded selected files" : "Commit pushed" : `${a.step || "Git operation"} failed`;
  return /* @__PURE__ */ d.jsxs("section", { className: `git-operation-result ${a.ok ? "success" : "error"}`, children: [
    /* @__PURE__ */ d.jsx("strong", { children: r }),
    i.length ? /* @__PURE__ */ d.jsx("span", { children: US(i) }) : null,
    o ? /* @__PURE__ */ d.jsx("pre", { children: o }) : null
  ] });
}
function US(a) {
  const i = a.slice(0, 4).join(", "), o = a.length - 4;
  return o > 0 ? `${i} and ${o} more` : i;
}
function LS(a) {
  const i = String(a ?? "").trim();
  return i && (/^(https?:|mailto:)/i.test(i) || i.startsWith("/") || i.startsWith("#")) ? i : "";
}
function Ns(a) {
  const i = [], o = /(`([^`]+)`|\[([^\]\n]+)\]\(([^)\s]+)\)|(\*\*|__)(.+?)\5|(\*|_)([^*_]+?)\7)/g;
  let r = 0, c;
  for (; (c = o.exec(a)) !== null; ) {
    if (c.index > r && i.push(a.slice(r, c.index)), c[2] !== void 0) i.push(/* @__PURE__ */ d.jsx("code", { children: c[2] }, i.length));
    else if (c[3] !== void 0) {
      const f = LS(c[4]);
      i.push(f ? /* @__PURE__ */ d.jsx("a", { href: f, target: "_blank", rel: "noreferrer", children: c[3] }, i.length) : `${c[3]} (${c[4]})`);
    } else c[6] !== void 0 ? i.push(/* @__PURE__ */ d.jsx("strong", { children: c[6] }, i.length)) : c[8] !== void 0 && i.push(/* @__PURE__ */ d.jsx("em", { children: c[8] }, i.length));
    r = o.lastIndex;
  }
  return r < a.length && i.push(a.slice(r)), i;
}
function px({ value: a }) {
  const i = a.split(`
`), o = [];
  let r = [], c = null, f = [];
  const m = () => {
    r.length && (o.push(/* @__PURE__ */ d.jsx("p", { children: r.map((S, w) => /* @__PURE__ */ d.jsxs(dt.Fragment, { children: [
      w > 0 ? /* @__PURE__ */ d.jsx("br", {}) : null,
      Ns(S)
    ] }, w)) }, o.length)), r = []);
  }, p = () => {
    if (!c) return;
    const S = c.items.map((w, C) => /* @__PURE__ */ d.jsx("li", { children: Ns(w) }, C));
    o.push(c.type === "ul" ? /* @__PURE__ */ d.jsx("ul", { children: S }, o.length) : /* @__PURE__ */ d.jsx("ol", { children: S }, o.length)), c = null;
  }, g = () => {
    f.length && (o.push(/* @__PURE__ */ d.jsx("blockquote", { children: f.map((S, w) => /* @__PURE__ */ d.jsxs(dt.Fragment, { children: [
      w > 0 ? /* @__PURE__ */ d.jsx("br", {}) : null,
      Ns(S)
    ] }, w)) }, o.length)), f = []);
  }, x = () => {
    m(), p(), g();
  };
  return i.forEach((S) => {
    var z;
    const w = S.trim();
    if (!w) {
      x();
      return;
    }
    const C = w.match(/^(#{1,6})\s+(.+)$/);
    if (C) {
      x();
      const _ = `h${C[1].length}`;
      o.push(dt.createElement(_, { key: o.length }, Ns(C[2])));
      return;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(w)) {
      x(), o.push(/* @__PURE__ */ d.jsx("hr", {}, o.length));
      return;
    }
    const A = w.match(/^>\s?(.*)$/);
    if (A) {
      m(), p(), f.push(A[1]);
      return;
    }
    const N = w.match(/^[-*+]\s+(.+)$/), B = w.match(/^\d+[.)]\s+(.+)$/);
    if (N || B) {
      m(), g();
      const _ = N ? "ul" : "ol";
      (!c || c.type !== _) && p(), c || (c = { type: _, items: [] }), c.items.push(((z = N || B) == null ? void 0 : z[1]) || "");
      return;
    }
    p(), g(), r.push(S);
  }), x(), /* @__PURE__ */ d.jsx(d.Fragment, { children: o });
}
const QS = dt.memo(function({ value: i }) {
  var p;
  const o = String(i ?? "").replaceAll(`\r
`, `
`).replaceAll("\r", `
`);
  if (!o.trim()) return null;
  const r = [], c = /```([^\n`]*)\n?([\s\S]*?)```/g;
  let f = 0, m;
  for (; (m = c.exec(o)) !== null; ) {
    m.index > f && r.push(/* @__PURE__ */ d.jsx(px, { value: o.slice(f, m.index) }, r.length));
    const g = (p = m[1]) == null ? void 0 : p.trim();
    r.push(/* @__PURE__ */ d.jsx("pre", { children: /* @__PURE__ */ d.jsx("code", { className: g ? `language-${g}` : void 0, children: m[2] || "" }) }, r.length)), f = c.lastIndex;
  }
  return f < o.length && r.push(/* @__PURE__ */ d.jsx(px, { value: o.slice(f) }, r.length)), /* @__PURE__ */ d.jsx(d.Fragment, { children: r });
}), YS = 20, Qb = [
  {
    id: "create_automation",
    label: "Create automation",
    icon: "mdi:robot-industrial-outline",
    fields: [
      { id: "goal", label: "Goal", required: !0, multiline: !0, placeholder: "Turn on the kitchen light when motion is detected after sunset." },
      { id: "trigger", label: "Trigger", placeholder: "Motion is detected in the kitchen after sunset." },
      { id: "actions", label: "Action", placeholder: "Turn on light.kitchen at 60%." },
      { id: "details", label: "Details", multiline: !0, placeholder: "Optional conditions, notifications, timing, or edge cases." }
    ]
  },
  {
    id: "fix_automation",
    label: "Fix automation",
    icon: "mdi:wrench-clock",
    requiredContextKinds: ["automation", "script"],
    fields: [
      { id: "issue", label: "Issue", required: !0, multiline: !0, placeholder: "It no longer triggers when the door opens." },
      { id: "expected", label: "Expected behavior", multiline: !0 },
      {
        id: "reload",
        label: "Reload expectation",
        placeholder: "Tell me whether automations/scripts need reload.",
        control: {
          type: "select",
          options: [
            { label: "Recommend automation/script reload", value: "Recommend reloading automations/scripts if YAML changed." },
            { label: "No reload needed", value: "No reload should be needed unless files are changed." },
            { label: "Mention restart only if required", value: "Mention a Home Assistant Core restart only if the change truly requires it." }
          ]
        }
      }
    ]
  },
  {
    id: "create_script",
    label: "Create script",
    icon: "mdi:script-text-outline",
    fields: [
      { id: "goal", label: "Goal", required: !0, multiline: !0, placeholder: "Set movie mode in the living room." },
      { id: "target", label: "Targets", placeholder: "light.living_room, media_player.tv", control: { type: "entity", domains: ["light", "switch", "fan", "cover", "climate", "media_player", "lock", "scene", "script", "input_boolean", "input_button", "button"], multiple: !0 } },
      { id: "actions", label: "Actions", placeholder: "Dim lights, close covers, set TV input.", control: { type: "action" } },
      { id: "fields", label: "Script fields", placeholder: "Optional variables to expose" }
    ]
  },
  {
    id: "convert_blueprint",
    label: "Convert to blueprint",
    icon: "mdi:file-tree-outline",
    requiredContextKinds: ["automation", "script"],
    fields: [
      { id: "source", label: "Source", required: !0, placeholder: "automation.porch_light", control: { type: "entity", domains: ["automation", "script"] } },
      { id: "goal", label: "Blueprint goal", multiline: !0, placeholder: "Make entity IDs configurable for other rooms." },
      { id: "inputs", label: "Inputs", multiline: !0, placeholder: "motion sensor, light target, delay" }
    ]
  },
  {
    id: "explain_simplify",
    label: "Explain or simplify",
    icon: "mdi:text-box-search-outline",
    requiredContextKinds: ["automation", "script"],
    fields: [
      { id: "source", label: "Source", placeholder: "automation.porch_light", control: { type: "entity", domains: ["automation", "script"] } },
      { id: "goal", label: "Focus", multiline: !0, placeholder: "Explain what it does and simplify duplicate conditions." },
      { id: "constraints", label: "Keep behavior", placeholder: "Preserve current behavior unless clearly broken." }
    ]
  }
];
function uf(a) {
  const i = Qb.find((o) => o.id === a);
  if (!i) throw new Error(`Unknown builder template: ${a}`);
  return i;
}
function Yb(a, i, o = []) {
  var f;
  const r = uf(a), c = r.fields.filter((m) => m.required && !Go(i, m.id)).map((m) => PS(m));
  return (f = r.requiredContextKinds) != null && f.length && !JS(o, r.requiredContextKinds) && c.push("Select an automation or script as context."), c;
}
function VS(a, i, o = []) {
  const r = Yb(a, i, o);
  if (r.length) throw new Error(r.join(" "));
  const c = uf(a), f = FS(c, i), m = $S(c, i, o), p = IS(c, f, Vb(o));
  return XS(m, o, {
    runPrompt: p,
    metadata: {
      builder: {
        template_id: c.id,
        template_label: c.label,
        selections: f
      }
    }
  });
}
function XS(a, i, o) {
  return {
    prompt: a.trim(),
    context: Vb(i),
    runPrompt: o.runPrompt.trim(),
    metadata: o.metadata
  };
}
function KS(a) {
  const i = a == null ? void 0 : a.builder;
  if (!i || typeof i != "object" || Array.isArray(i)) return null;
  const o = i, r = String(o.template_label || "").trim(), c = Array.isArray(o.selections) ? o.selections.flatMap((f) => {
    if (!f || typeof f != "object" || Array.isArray(f)) return [];
    const m = f, p = String(m.label || "").trim(), g = String(m.value || "").trim();
    return p && g ? [{ label: p, value: g }] : [];
  }) : [];
  return r ? { label: r, selections: c } : null;
}
function IS(a, i, o) {
  const r = [
    ZS(a.id),
    "",
    "Use the selected Home Assistant context and inspect the workspace before editing.",
    "Keep edits minimal and scoped to the automation, script, blueprint, or related config files needed for this request.",
    "Do not bypass existing command approvals or restart approval flow."
  ];
  return t2(a.id) && (r.push("Validate the Home Assistant YAML when possible and report the validation result."), r.push("Prefer reload recommendations for automations/scripts; recommend a Home Assistant Core restart only when required.")), o.length && (r.push("", "Selected context:"), o.forEach((c) => {
    r.push(`- ${c.kind}: ${c.label}${c.subtitle ? ` (${c.subtitle})` : ""}`);
  })), i.length && (r.push("", "Builder inputs:"), i.forEach((c) => {
    r.push(`- ${c.label}: ${c.value}`);
  })), r.push("", "After the run, surface changed files, validation status, and any reload or restart recommendation using the existing HA Codex mechanisms."), r.join(`
`);
}
function ZS(a) {
  switch (a) {
    case "create_automation":
      return "Create a Home Assistant automation from these structured inputs.";
    case "fix_automation":
      return "Fix the selected Home Assistant automation or script.";
    case "create_script":
      return "Create a Home Assistant script from these structured inputs.";
    case "convert_blueprint":
      return "Convert the selected automation or script into a Home Assistant blueprint and preserve the current behavior.";
    case "explain_simplify":
      return "Explain or simplify the selected Home Assistant automation or script.";
  }
}
function $S(a, i, o) {
  const r = Go(i, "goal"), c = Go(i, "source") || WS(o, a.requiredContextKinds);
  switch (a.id) {
    case "create_automation":
      return `Create automation: ${r}`;
    case "fix_automation":
      return `Fix automation: ${Go(i, "issue")}`;
    case "create_script":
      return `Create script: ${r}`;
    case "convert_blueprint":
      return `Convert to blueprint: ${c || "selected automation/script"}`;
    case "explain_simplify":
      return `Explain or simplify: ${c || "selected automation/script"}`;
  }
}
function FS(a, i) {
  return a.fields.flatMap((o) => {
    const r = Go(i, o.id);
    return r ? [{ label: o.label, value: r }] : [];
  });
}
function JS(a, i) {
  return a.some((o) => i.includes(o.kind));
}
function Vb(a) {
  return a.slice(0, YS).map((i) => ({
    id: i.id,
    kind: i.kind,
    label: i.label,
    ...i.subtitle ? { subtitle: i.subtitle } : {},
    ...i.payload ? { payload: { ...i.payload } } : {}
  }));
}
function WS(a, i) {
  const o = a.find((r) => !(i != null && i.length) || i.includes(r.kind));
  return (o == null ? void 0 : o.label) || "";
}
function Go(a, i) {
  return String(a[i] || "").trim();
}
function PS(a) {
  return a.id === "issue" ? "Describe what is broken." : `${a.label} is required.`;
}
function t2(a) {
  return a === "create_automation" || a === "fix_automation" || a === "create_script";
}
const e2 = I.memo(function({ api: i, message: o, sessionId: r, canRetry: c, onCopy: f, onRetry: m, onRollback: p, onValidationReload: g }) {
  var rt, ot, yt, H, W, F, ht, st, T, Y;
  const x = o.content || "", S = String(((rt = o.metadata) == null ? void 0 : rt.kind) || "") === "error", w = !!Vx(o), C = Array.isArray((ot = o.metadata) == null ? void 0 : ot.file_changes) ? o.metadata.file_changes : [], A = f1(d1(x), C) || (S ? f2(o) : "") || (w ? "Codex needs direction before continuing." : ""), N = String(((yt = o.metadata) == null ? void 0 : yt.kind) || o.role || "message"), B = o.role === "event" && !!((H = o.metadata) != null && H.command), z = B ? "command" : o.role === "event" ? "response" : o.role || "message", _ = { user: "mdi:account-circle", assistant: "mdi:robot", event: "mdi:progress-wrench", system: "mdi:information-outline" }[String(o.role)] || "mdi:message-text-outline", R = { user: "message-row-user", assistant: "message-row-codex" }[String(o.role)] || "", L = {
    user: "message-style-user",
    assistant: "message-style-codex",
    event: "message-style-event",
    system: "message-style-system",
    action: "message-style-action"
  }[String(((W = o.metadata) == null ? void 0 : W.kind) || o.role)] || "", q = S ? "message-style-error" : B ? "message-style-command" : L, y = c && S, D = n2(o), v = S1(o.metadata), M = KS(o.metadata), k = pt((X) => X.settings.defaults.tool_visibility), K = qt((X) => {
    var it, gt, St;
    return (St = (gt = (it = X.chatsById[r]) == null ? void 0 : it.metadata) == null ? void 0 : gt.run_settings) == null ? void 0 : St.tool_visibility;
  }), tt = a2(o, K || k), ct = C.length === 0;
  if (B) {
    const X = String(((F = o.metadata) == null ? void 0 : F.command) || A);
    return /* @__PURE__ */ d.jsx("div", { className: `message-row ${R || "message-row-center"}`, children: /* @__PURE__ */ d.jsxs("article", { className: `message ${o.role || ""} ${q} ${N} tool-visibility-${tt}`, children: [
      /* @__PURE__ */ d.jsxs("div", { className: "command-line", children: [
        /* @__PURE__ */ d.jsx("code", { className: "command-text", children: X }),
        D,
        /* @__PURE__ */ d.jsx("button", { className: "icon-button copy-button", onClick: () => f(X), title: "Copy", "aria-label": "Copy command", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:content-copy" }) })
      ] }),
      /* @__PURE__ */ d.jsx(gx, { raw: (ht = o.metadata) == null ? void 0 : ht.raw, visible: tt === "verbose" })
    ] }) });
  }
  return /* @__PURE__ */ d.jsx("div", { className: `message-row ${R || "message-row-center"}`, children: /* @__PURE__ */ d.jsxs("article", { className: `message ${o.role || ""} ${q} ${N} tool-visibility-${tt}`, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "role", children: [
      /* @__PURE__ */ d.jsx(ut, { icon: _ }),
      /* @__PURE__ */ d.jsx("span", { children: z }),
      D
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "markdown-body", children: /* @__PURE__ */ d.jsx(QS, { value: A }) }),
    /* @__PURE__ */ d.jsx(l2, { summary: M }),
    /* @__PURE__ */ d.jsx(o2, { attachments: v }),
    /* @__PURE__ */ d.jsx(i2, { validation: (st = o.metadata) == null ? void 0 : st.validation, onReloadDomains: g }),
    /* @__PURE__ */ d.jsx(s2, { api: i, changes: C }),
    /* @__PURE__ */ d.jsx(r2, { sessionId: r, rollback: (T = o.metadata) == null ? void 0 : T.rollback, onRollback: p }),
    /* @__PURE__ */ d.jsx(gx, { raw: (Y = o.metadata) == null ? void 0 : Y.raw, visible: tt === "verbose" }),
    ct ? /* @__PURE__ */ d.jsx("button", { className: "icon-button copy-button", onClick: () => f(A), title: "Copy", "aria-label": "Copy message", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:content-copy" }) }) : null,
    y ? /* @__PURE__ */ d.jsx("button", { className: "icon-button retry-button", onClick: () => m(r), title: "Retry / continue", "aria-label": "Retry / continue", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:refresh" }) }) : null
  ] }) });
});
function n2(a) {
  return a.created_at ? /* @__PURE__ */ d.jsx("span", { className: "message-time", title: Gs(a.created_at), children: ir(a.created_at) }) : null;
}
function a2(a, i) {
  var c, f;
  const o = (f = (c = a.metadata) == null ? void 0 : c.run_settings) == null ? void 0 : f.resolved, r = (o == null ? void 0 : o.tool_visibility) || i;
  return r === "compact" || r === "verbose" ? r : "normal";
}
function gx({ raw: a, visible: i }) {
  return !i || !a ? null : /* @__PURE__ */ d.jsxs("details", { className: "raw-event-details", children: [
    /* @__PURE__ */ d.jsx("summary", { children: "Raw event" }),
    /* @__PURE__ */ d.jsx("pre", { children: JSON.stringify(a, null, 2) })
  ] });
}
function i2({ validation: a, onReloadDomains: i }) {
  return a ? /* @__PURE__ */ d.jsx(NS, { validation: a, onReloadDomains: i, compact: !0 }) : null;
}
function l2({ summary: a }) {
  return a ? /* @__PURE__ */ d.jsxs("div", { className: "message-builder-summary", "aria-label": "Builder mode", children: [
    /* @__PURE__ */ d.jsxs("span", { className: "message-builder-chip strong", children: [
      /* @__PURE__ */ d.jsx(ut, { icon: "mdi:robot-industrial-outline" }),
      a.label
    ] }),
    a.selections.slice(0, 4).map((i) => /* @__PURE__ */ d.jsxs("span", { className: "message-builder-chip", children: [
      /* @__PURE__ */ d.jsx("b", { children: i.label }),
      /* @__PURE__ */ d.jsx("span", { children: i.value })
    ] }, `${i.label}:${i.value}`))
  ] }) : null;
}
function o2({ attachments: a }) {
  return a.length ? /* @__PURE__ */ d.jsx("div", { className: "message-context-attachments", "aria-label": "Attached context", children: a.map((i) => /* @__PURE__ */ d.jsxs("span", { className: "message-context-chip", title: i.subtitle || i.label, children: [
    /* @__PURE__ */ d.jsx(ut, { icon: Kx(i.kind) }),
    /* @__PURE__ */ d.jsx("span", { children: i.label })
  ] }, `${i.kind}:${i.id}`)) }) : null;
}
function r2({ sessionId: a, rollback: i, onRollback: o }) {
  return i != null && i.checkpoint_id ? i.status === "available" ? /* @__PURE__ */ d.jsx("div", { className: "rollback-action", children: /* @__PURE__ */ d.jsxs("button", { type: "button", className: "danger", onClick: () => o(a, i.checkpoint_id || ""), children: [
    /* @__PURE__ */ d.jsx(ut, { icon: "mdi:restore" }),
    /* @__PURE__ */ d.jsx("span", { children: "Rollback this run" })
  ] }) }) : i.status === "rolled_back" ? /* @__PURE__ */ d.jsxs("div", { className: "rollback-note", children: [
    /* @__PURE__ */ d.jsx(ut, { icon: "mdi:check-circle-outline" }),
    /* @__PURE__ */ d.jsx("span", { children: "Run rolled back" })
  ] }) : i.status === "blocked" ? /* @__PURE__ */ d.jsxs("div", { className: "rollback-note blocked", children: [
    /* @__PURE__ */ d.jsx(ut, { icon: "mdi:alert-circle-outline" }),
    /* @__PURE__ */ d.jsx("span", { children: i.reason || "Rollback needs manual review" })
  ] }) : null : null;
}
const xx = 6;
function s2({ api: a, changes: i }) {
  const [o, r] = I.useState(!1), [c, f] = I.useState(null);
  if (I.useEffect(() => {
    if (!i.length) {
      f(null);
      return;
    }
    let x = !1;
    return a.gitChanges().then((S) => {
      x || f(S.files || []);
    }).catch(() => {
      x || f([]);
    }), () => {
      x = !0;
    };
  }, [a, i]), !i.length) return null;
  const m = u2(i, c), p = o ? m : m.slice(0, xx), g = Math.max(0, m.length - p.length);
  return /* @__PURE__ */ d.jsxs("div", { className: "message-file-changes", children: [
    /* @__PURE__ */ d.jsx("div", { className: "message-file-changes-head", children: /* @__PURE__ */ d.jsxs("span", { children: [
      m.length,
      " changed ",
      m.length === 1 ? "file" : "files"
    ] }) }),
    p.map((x) => /* @__PURE__ */ d.jsx(d2, { api: a, file: x }, `${x.old_path || ""}:${x.path}`)),
    m.length > xx ? /* @__PURE__ */ d.jsx("div", { className: "message-file-changes-toggle", children: /* @__PURE__ */ d.jsxs("button", { type: "button", className: "secondary", onClick: () => r((x) => !x), children: [
      /* @__PURE__ */ d.jsx(ut, { icon: o ? "mdi:chevron-up" : "mdi:chevron-down" }),
      /* @__PURE__ */ d.jsx("span", { children: o ? "Show fewer" : `Show ${g} more` })
    ] }) }) : null
  ] });
}
function u2(a, i) {
  const o = /* @__PURE__ */ new Map();
  return (i || []).forEach((r) => {
    o.set(bx(r.path, r.old_path), r);
  }), a.map((r) => {
    const c = o.get(bx(r.path, r.old_path));
    return c ? { ...r, ...c, path: c.path || r.path, old_path: c.old_path || r.old_path } : r;
  }).filter((r) => !c2(r.path));
}
function bx(a, i = "") {
  return ba(kd(a), kd(i));
}
function kd(a = "") {
  return String(a || "").replace(/\\/g, "/").replace(/^\/+/, "").replace(/^homeassistant\//, "").replace(/^config\//, "");
}
function c2(a) {
  return kd(a).split("/").includes("dist");
}
function d2({ api: a, file: i }) {
  const [o, r] = I.useState(!1), [c, f] = I.useState(i.patch ? i : null), [m, p] = I.useState(!1), g = pt((w) => w.showToast), x = c ? { ...i, ...c, path: c.path || i.path, old_path: c.old_path || i.old_path } : i;
  I.useEffect(() => {
    if (c || m) return;
    let w = !1;
    return p(!0), a.gitFileDiff(i.path, i.old_path || "").then((C) => {
      w || f(C);
    }).catch((C) => {
      w || f({ ...i, patch: "", patch_error: Pt(C) });
    }).finally(() => {
      w || p(!1);
    }), () => {
      w = !0;
    };
  }, [a, i.path, i.old_path]);
  const S = () => {
    const w = !o;
    r(w), !(!w || c || m) && (p(!0), a.gitFileDiff(i.path, i.old_path || "").then((C) => f(C)).catch((C) => {
      const A = Pt(C);
      f({ ...i, patch: "", patch_error: A }), g(`Diff load failed: ${A}`, "error");
    }).finally(() => p(!1)));
  };
  return /* @__PURE__ */ d.jsx(
    Lb,
    {
      file: x,
      open: o,
      diff: c,
      loading: m,
      selectable: !1,
      displayPath: "path",
      onToggleFile: S
    }
  );
}
function f2(a) {
  var o, r, c;
  const i = ((o = a.metadata) == null ? void 0 : o.error) || ((r = a.metadata) == null ? void 0 : r.stderr) || ((c = a.metadata) == null ? void 0 : c.message);
  return i ? String(i).trim() : "Codex reported an error without additional details.";
}
const Xb = [
  { kind: "entity", label: "Entities", icon: "mdi:home-assistant" },
  { kind: "device", label: "Devices", icon: "mdi:devices" },
  { kind: "area", label: "Areas", icon: "mdi:floor-plan" },
  { kind: "automation", label: "Automations", icon: "mdi:robot-industrial-outline" },
  { kind: "script", label: "Scripts", icon: "mdi:script-text-outline" },
  { kind: "log", label: "Logs", icon: "mdi:text-box-search-outline" },
  { kind: "config_file", label: "Config files", icon: "mdi:file-document-outline" }
];
function h2(a) {
  const { api: i, hass: o, open: r, selected: c, onAdd: f, onRemove: m, onClear: p, onClose: g } = a, [x, S] = I.useState("entity"), [w, C] = I.useState(""), [A, N] = I.useState([]), [B, z] = I.useState([]), [_, R] = I.useState([]), [L, q] = I.useState([]), [y, D] = I.useState([]), [v, M] = I.useState(!1), [k, K] = I.useState([]), [tt, ct] = I.useState(null), rt = I.useMemo(() => new Set(c.map(ei)), [c]);
  I.useEffect(() => {
    if (!r) return;
    let F = !1;
    return M(!0), K([]), Promise.allSettled([
      i.entityRegistry(),
      i.deviceRegistry(),
      i.areaRegistry(),
      i.contextLogs(200),
      i.contextConfigFiles()
    ]).then((ht) => {
      if (F) return;
      const st = [], [T, Y, X, it, gt] = ht;
      T.status === "fulfilled" ? N(T.value || []) : st.push(`Entity registry: ${Pt(T.reason)}`), Y.status === "fulfilled" ? z(Y.value || []) : st.push(`Device registry: ${Pt(Y.reason)}`), X.status === "fulfilled" ? R(X.value || []) : st.push(`Area registry: ${Pt(X.reason)}`), it.status === "fulfilled" ? q(it.value.logs || []) : st.push(`Logs: ${Pt(it.reason)}`), gt.status === "fulfilled" ? D(gt.value.files || []) : st.push(`Config files: ${Pt(gt.reason)}`), K(st), M(!1);
    }), () => {
      F = !0;
    };
  }, [i, r]), I.useEffect(() => {
    r || C("");
  }, [r]), I.useEffect(() => {
    if (!r) return;
    const F = (ht) => {
      ht.key === "Escape" && g();
    };
    return window.addEventListener("keydown", F), () => window.removeEventListener("keydown", F);
  }, [g, r]);
  const ot = I.useMemo(() => {
    const F = new Map(_.map((X) => [X.area_id, X])), ht = new Map(B.map((X) => [X.id, X])), st = new Map(A.map((X) => [X.entity_id, X])), T = (o == null ? void 0 : o.states) || {}, Y = Object.entries(T).map(([X, it]) => p2(X, it, st, ht, F));
    return {
      entity: Y.filter((X) => {
        var gt;
        const it = String(((gt = X.payload) == null ? void 0 : gt.domain) || "");
        return it !== "automation" && it !== "script";
      }),
      automation: Y.filter((X) => {
        var it;
        return ((it = X.payload) == null ? void 0 : it.domain) === "automation";
      }).map((X) => ({ ...X, kind: "automation", id: `automation:${X.id}` })),
      script: Y.filter((X) => {
        var it;
        return ((it = X.payload) == null ? void 0 : it.domain) === "script";
      }).map((X) => ({ ...X, kind: "script", id: `script:${X.id}` })),
      device: B.map((X) => g2(X, F)),
      area: _.map(x2),
      log: L.map(b2),
      config_file: y.map(v2)
    };
  }, [_, y, B, A, o == null ? void 0 : o.states, L]), yt = I.useMemo(() => {
    const F = w.trim().toLowerCase(), ht = ot[x] || [];
    return F ? ht.filter((st) => [st.label, st.subtitle, st.id].some((T) => String(T || "").toLowerCase().includes(F))) : ht;
  }, [x, ot, w]);
  if (!r) return null;
  const H = c.length >= Vo, W = async (F) => {
    var T;
    const ht = ei(F);
    if (rt.has(ht)) {
      m(ht);
      return;
    }
    if (H) return;
    if (F.kind !== "config_file") {
      f(F);
      return;
    }
    const st = String(((T = F.payload) == null ? void 0 : T.path) || F.id);
    ct(st);
    try {
      const Y = await i.contextConfigFile(st);
      f({
        ...F,
        subtitle: `${Ib(Y.size || 0)}${Y.truncated ? " truncated" : ""}`,
        payload: {
          path: Y.path,
          size: Y.size,
          modified: Y.modified,
          content: Y.content,
          truncated: !!Y.truncated
        }
      });
    } catch (Y) {
      K((X) => [`Config file ${st}: ${Pt(Y)}`, ...X].slice(0, 4));
    } finally {
      ct(null);
    }
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "modal-backdrop context-modal-backdrop", role: "presentation", children: [
    /* @__PURE__ */ d.jsx("button", { className: "modal-scrim", type: "button", onClick: g, "aria-label": "Close context picker" }),
    /* @__PURE__ */ d.jsxs("section", { className: "modal context-modal", role: "dialog", "aria-modal": "true", "aria-label": "Add context", children: [
      /* @__PURE__ */ d.jsxs("header", { className: "modal-header", children: [
        /* @__PURE__ */ d.jsx("h2", { children: "Add context" }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", type: "button", onClick: g, title: "Close", "aria-label": "Close context picker", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:close" }) })
      ] }),
      /* @__PURE__ */ d.jsx("nav", { className: "modal-tabs context-tabs", "aria-label": "Context type", children: Xb.map((F) => /* @__PURE__ */ d.jsxs("button", { className: x === F.kind ? "active" : "", type: "button", onClick: () => S(F.kind), children: [
        /* @__PURE__ */ d.jsx(ut, { icon: F.icon }),
        /* @__PURE__ */ d.jsx("span", { children: F.label })
      ] }, F.kind)) }),
      /* @__PURE__ */ d.jsxs("div", { className: "context-toolbar", children: [
        /* @__PURE__ */ d.jsx("input", { value: w, onChange: (F) => C(F.target.value), placeholder: "Search", "aria-label": "Search context" }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          c.length,
          "/",
          Vo
        ] }),
        c.length ? /* @__PURE__ */ d.jsx("button", { className: "ghost", type: "button", onClick: p, children: "Clear" }) : null
      ] }),
      k.length ? /* @__PURE__ */ d.jsx("div", { className: "context-errors", role: "status", children: k.slice(0, 3).map((F) => /* @__PURE__ */ d.jsx("p", { children: F }, F)) }) : null,
      /* @__PURE__ */ d.jsx("div", { className: "context-list", "aria-busy": v, children: v ? /* @__PURE__ */ d.jsx("div", { className: "context-empty", children: "Loading" }) : yt.length ? yt.map((F) => {
        var X;
        const ht = ei(F), st = rt.has(ht), T = !st && H, Y = tt === ((X = F.payload) == null ? void 0 : X.path);
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            className: `context-row ${st ? "selected" : ""}`,
            disabled: T || Y,
            type: "button",
            onClick: () => void W(F),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: "context-checkbox", "aria-hidden": "true", children: st ? /* @__PURE__ */ d.jsx(ut, { icon: "mdi:check" }) : null }),
              /* @__PURE__ */ d.jsx(ut, { className: "context-kind-icon", icon: Kb(F.kind) }),
              /* @__PURE__ */ d.jsxs("span", { className: "context-row-main", children: [
                /* @__PURE__ */ d.jsx("strong", { children: F.label }),
                F.subtitle ? /* @__PURE__ */ d.jsx("small", { children: F.subtitle }) : null
              ] }),
              Y ? /* @__PURE__ */ d.jsx("span", { className: "context-row-status", children: "Loading" }) : null
            ]
          },
          ht
        );
      }) : /* @__PURE__ */ d.jsx("div", { className: "context-empty", children: "No matches" }) })
    ] })
  ] });
}
function m2({ items: a, onRemove: i, onClear: o }) {
  return a.length ? /* @__PURE__ */ d.jsxs("div", { className: "context-chips", "aria-label": "Selected context", children: [
    a.map((r) => /* @__PURE__ */ d.jsxs("button", { className: "context-chip", type: "button", onClick: () => i(ei(r)), title: r.subtitle || r.label, children: [
      /* @__PURE__ */ d.jsx(ut, { icon: Kb(r.kind) }),
      /* @__PURE__ */ d.jsx("span", { children: r.label }),
      /* @__PURE__ */ d.jsx(ut, { icon: "mdi:close" })
    ] }, ei(r))),
    /* @__PURE__ */ d.jsx("button", { className: "context-clear", type: "button", onClick: o, children: "Clear" })
  ] }) : null;
}
function p2(a, i, o, r, c) {
  const f = o.get(a), m = f != null && f.device_id ? r.get(f.device_id) : void 0, p = (f == null ? void 0 : f.area_id) || (m == null ? void 0 : m.area_id) || null, g = p ? c.get(p) : void 0, x = y2(i.attributes || {}), S = String(x.friendly_name || (f == null ? void 0 : f.name) || (f == null ? void 0 : f.original_name) || a), w = a.split(".")[0] || "entity", C = i.state ? `state ${i.state}` : "unknown", A = [a, C, g == null ? void 0 : g.name, Hd(m)].filter(Boolean).join(" - ");
  return {
    id: a,
    kind: "entity",
    label: S,
    subtitle: A,
    payload: {
      entity_id: a,
      domain: w,
      state: i.state,
      friendly_name: S,
      area: (g == null ? void 0 : g.name) || null,
      device: Hd(m) || null,
      attributes: x,
      last_changed: i.last_changed,
      last_updated: i.last_updated
    }
  };
}
function g2(a, i) {
  const o = Hd(a) || a.id, r = a.area_id ? i.get(a.area_id) : void 0;
  return {
    id: a.id,
    kind: "device",
    label: o,
    subtitle: [a.manufacturer, a.model, r == null ? void 0 : r.name].filter(Boolean).join(" - "),
    payload: {
      device_id: a.id,
      name: o,
      manufacturer: a.manufacturer || null,
      model: a.model || null,
      area: (r == null ? void 0 : r.name) || null,
      disabled_by: a.disabled_by || null
    }
  };
}
function x2(a) {
  return {
    id: a.area_id,
    kind: "area",
    label: a.name,
    subtitle: a.area_id,
    payload: {
      area_id: a.area_id,
      name: a.name,
      aliases: a.aliases || []
    }
  };
}
function b2(a) {
  return {
    id: a.id,
    kind: "log",
    label: a.name,
    subtitle: a.exists ? `${a.line_count || 0} lines${a.truncated ? " truncated" : ""}` : "missing",
    payload: {
      source: a.name,
      path: a.path,
      exists: !!a.exists,
      lines: a.lines || "",
      line_count: a.line_count || 0,
      truncated: !!a.truncated,
      error: a.error || null
    }
  };
}
function v2(a) {
  return {
    id: a.path,
    kind: "config_file",
    label: a.path.split("/").pop() || a.path,
    subtitle: `${a.path} - ${Ib(a.size || 0)}`,
    payload: {
      path: a.path,
      size: a.size,
      modified: a.modified
    }
  };
}
function y2(a) {
  return Object.fromEntries([
    "friendly_name",
    "device_class",
    "unit_of_measurement",
    "icon",
    "supported_features",
    "battery_level",
    "brightness",
    "color_mode",
    "current_temperature",
    "temperature",
    "hvac_mode",
    "last_triggered",
    "mode"
  ].filter((o) => o in a).map((o) => [o, a[o]]));
}
function Hd(a) {
  return String((a == null ? void 0 : a.name_by_user) || (a == null ? void 0 : a.name) || "").trim();
}
function Kb(a) {
  var i;
  return ((i = Xb.find((o) => o.kind === a)) == null ? void 0 : i.icon) || "mdi:plus";
}
function Ib(a) {
  return !Number.isFinite(a) || a <= 0 ? "0 B" : a < 1024 ? `${a} B` : a < 1024 * 1024 ? `${Math.round(a / 102.4) / 10} KB` : `${Math.round(a / 1024 / 102.4) / 10} MB`;
}
function w2({ open: a, hass: i, contextItems: o, onClose: r, onSubmit: c }) {
  const [f, m] = I.useState("create_automation"), [p, g] = I.useState({}), [x, S] = I.useState(!1), [w, C] = I.useState({}), A = uf(f), N = I.useMemo(() => Yb(f, p, o), [o, f, p]), B = I.useMemo(() => E2((i == null ? void 0 : i.states) || {}), [i == null ? void 0 : i.states]), z = I.useMemo(() => R2(w), [w]), _ = I.useMemo(() => z.filter((y) => y.domain === "notify"), [z]), R = f === "create_automation";
  if (I.useEffect(() => {
    if (!a || !i) return;
    let y = !1;
    return i.callWS({ type: "get_services" }).then((D) => {
      y || C(D || {});
    }).catch(() => {
      y || C({});
    }), () => {
      y = !0;
    };
  }, [i, a]), !a) return null;
  const L = (y, D) => g((v) => ({ ...v, [y]: D })), q = (y) => {
    m(y), g({}), S(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "modal-backdrop builder-modal-backdrop", role: "presentation", children: [
    /* @__PURE__ */ d.jsx("button", { className: "modal-scrim", type: "button", onClick: r, "aria-label": "Close builder" }),
    /* @__PURE__ */ d.jsxs("section", { className: `modal builder-modal ${R ? "builder-modal-simple" : ""}`, role: "dialog", "aria-modal": "true", "aria-label": "Automation and script builder", children: [
      /* @__PURE__ */ d.jsxs("header", { className: "modal-header", children: [
        /* @__PURE__ */ d.jsx("h2", { children: "Automation builder" }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", type: "button", onClick: r, title: "Close", "aria-label": "Close builder", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:close" }) })
      ] }),
      /* @__PURE__ */ d.jsx("nav", { className: "modal-tabs builder-tabs", "aria-label": "Builder mode", children: Qb.map((y) => /* @__PURE__ */ d.jsxs("button", { className: f === y.id ? "active" : "", type: "button", onClick: () => q(y.id), children: [
        /* @__PURE__ */ d.jsx(ut, { icon: y.icon }),
        /* @__PURE__ */ d.jsx("span", { children: y.label })
      ] }, y.id)) }),
      /* @__PURE__ */ d.jsxs("form", { className: "builder-form", onSubmit: (y) => {
        y.preventDefault(), S(!0), !N.length && (c(VS(f, p, o)), g({}), S(!1));
      }, children: [
        /* @__PURE__ */ d.jsxs("div", { className: `builder-scroll ${R ? "builder-scroll-simple" : ""}`, children: [
          x && N.length ? /* @__PURE__ */ d.jsx("div", { className: "builder-errors", role: "status", children: N.map((y) => /* @__PURE__ */ d.jsx("p", { children: y }, y)) }) : null,
          /* @__PURE__ */ d.jsx("div", { className: `builder-fields ${R ? "builder-fields-simple" : ""}`, children: A.fields.map((y) => {
            var D;
            return /* @__PURE__ */ d.jsxs("div", { className: `builder-field ${R || y.multiline || ((D = y.control) == null ? void 0 : D.type) === "action" ? "wide" : ""}`, children: [
              /* @__PURE__ */ d.jsxs("span", { children: [
                y.label,
                y.required ? " *" : ""
              ] }),
              /* @__PURE__ */ d.jsx(
                S2,
                {
                  field: y,
                  entityOptions: B,
                  serviceOptions: z,
                  notifyServiceOptions: _,
                  value: p[y.id] || "",
                  onChange: (v) => L(y.id, v)
                }
              )
            ] }, `${A.id}:${y.id}`);
          }) }),
          /* @__PURE__ */ d.jsxs("div", { className: "builder-context", "aria-label": "Builder context", children: [
            /* @__PURE__ */ d.jsx("span", { children: "Context" }),
            /* @__PURE__ */ d.jsxs("div", { className: "builder-context-list", children: [
              o.length ? o.slice(0, 6).map((y) => /* @__PURE__ */ d.jsxs("span", { className: "builder-context-chip", title: y.subtitle || y.label, children: [
                /* @__PURE__ */ d.jsx(ut, { icon: Kx(y.kind) }),
                y.label
              ] }, `${y.kind}:${y.id}`)) : /* @__PURE__ */ d.jsx("span", { className: "builder-context-empty", children: "None selected" }),
              o.length > 6 ? /* @__PURE__ */ d.jsxs("span", { className: "builder-context-empty", children: [
                "+",
                o.length - 6
              ] }) : null
            ] })
          ] })
        ] }),
        /* @__PURE__ */ d.jsxs("div", { className: "builder-actions", children: [
          /* @__PURE__ */ d.jsx("button", { className: "ghost", type: "button", onClick: r, children: "Cancel" }),
          /* @__PURE__ */ d.jsxs("button", { type: "submit", children: [
            /* @__PURE__ */ d.jsx(ut, { icon: A.icon }),
            /* @__PURE__ */ d.jsx("span", { children: A.label })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function S2({ field: a, entityOptions: i, serviceOptions: o, notifyServiceOptions: r, value: c, onChange: f }) {
  const m = a.control;
  return (m == null ? void 0 : m.type) === "entity" ? /* @__PURE__ */ d.jsx(
    Po,
    {
      label: a.label,
      placeholder: a.placeholder,
      options: i,
      selector: m,
      value: c,
      onChange: f
    }
  ) : (m == null ? void 0 : m.type) === "select" ? /* @__PURE__ */ d.jsx(C2, { ariaLabel: a.label, options: m.options, placeholder: a.placeholder, value: c, onChange: f }) : (m == null ? void 0 : m.type) === "trigger" ? /* @__PURE__ */ d.jsx(_2, { entityOptions: i, value: c, onChange: f }) : (m == null ? void 0 : m.type) === "condition" ? /* @__PURE__ */ d.jsx(T2, { entityOptions: i, value: c, onChange: f }) : (m == null ? void 0 : m.type) === "action" ? /* @__PURE__ */ d.jsx(j2, { entityOptions: i, serviceOptions: o, notifyServiceOptions: r, value: c, onChange: f }) : (m == null ? void 0 : m.type) === "notification" ? /* @__PURE__ */ d.jsx(z2, { serviceOptions: r, value: c, onChange: f }) : a.multiline ? /* @__PURE__ */ d.jsx(
    "textarea",
    {
      value: c,
      placeholder: a.placeholder,
      rows: 3,
      onChange: (p) => f(p.target.value)
    }
  ) : /* @__PURE__ */ d.jsx(
    "input",
    {
      value: c,
      placeholder: a.placeholder,
      onChange: (p) => f(p.target.value)
    }
  );
}
function C2({ ariaLabel: a, options: i, placeholder: o, value: r, onChange: c }) {
  return /* @__PURE__ */ d.jsxs("select", { "aria-label": a, value: r, onChange: (f) => c(f.currentTarget.value), children: [
    /* @__PURE__ */ d.jsx("option", { value: "", children: o || "Select" }),
    i.map((f) => /* @__PURE__ */ d.jsx("option", { value: f.value, children: f.label }, f.value))
  ] });
}
function _2({ entityOptions: a, value: i, onChange: o }) {
  const [r, c] = I.useState("State"), [f, m] = I.useState(""), [p, g] = I.useState("on"), x = r === "Numeric state" ? ["sensor", "number", "input_number"] : void 0, S = (w = r, C = f, A = p) => {
    o(M2(w, C, A));
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "builder-compound", children: [
    /* @__PURE__ */ d.jsxs("select", { value: r, "aria-label": "Trigger type", onChange: (w) => {
      const C = w.currentTarget.value;
      c(C), S(C);
    }, children: [
      /* @__PURE__ */ d.jsx("option", { children: "State" }),
      /* @__PURE__ */ d.jsx("option", { children: "Numeric state" }),
      /* @__PURE__ */ d.jsx("option", { children: "Time" }),
      /* @__PURE__ */ d.jsx("option", { children: "Sun" }),
      /* @__PURE__ */ d.jsx("option", { children: "Event" })
    ] }),
    r === "State" || r === "Numeric state" ? /* @__PURE__ */ d.jsx(
      Po,
      {
        label: "Trigger entity",
        placeholder: "Search trigger entity",
        options: a,
        selector: { domains: x },
        value: f,
        onChange: (w) => {
          m(w), S(r, w);
        }
      }
    ) : null,
    /* @__PURE__ */ d.jsx(
      "input",
      {
        value: p,
        placeholder: B2(r),
        onChange: (w) => {
          const C = w.currentTarget.value;
          g(C), S(r, f, C);
        }
      }
    ),
    /* @__PURE__ */ d.jsx("small", { children: i || "No trigger selected" })
  ] });
}
function T2({ entityOptions: a, value: i, onChange: o }) {
  const [r, c] = I.useState("None"), [f, m] = I.useState(""), [p, g] = I.useState(""), x = (S = r, w = f, C = p) => {
    o(D2(S, w, C));
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "builder-compound", children: [
    /* @__PURE__ */ d.jsxs("select", { value: r, "aria-label": "Condition type", onChange: (S) => {
      const w = S.currentTarget.value;
      c(w), x(w);
    }, children: [
      /* @__PURE__ */ d.jsx("option", { children: "None" }),
      /* @__PURE__ */ d.jsx("option", { children: "State" }),
      /* @__PURE__ */ d.jsx("option", { children: "Numeric state" }),
      /* @__PURE__ */ d.jsx("option", { children: "Time" }),
      /* @__PURE__ */ d.jsx("option", { children: "Sun" }),
      /* @__PURE__ */ d.jsx("option", { children: "Template" })
    ] }),
    r === "State" || r === "Numeric state" ? /* @__PURE__ */ d.jsx(
      Po,
      {
        label: "Condition entity",
        placeholder: "Search condition entity",
        options: a,
        selector: { domains: r === "Numeric state" ? ["sensor", "number", "input_number"] : void 0 },
        value: f,
        onChange: (S) => {
          m(S), x(r, S);
        }
      }
    ) : null,
    r !== "None" ? /* @__PURE__ */ d.jsx(
      "input",
      {
        value: p,
        placeholder: k2(r),
        onChange: (S) => {
          const w = S.currentTarget.value;
          g(w), x(r, f, w);
        }
      }
    ) : null,
    /* @__PURE__ */ d.jsx("small", { children: i || "No condition" })
  ] });
}
function j2({ entityOptions: a, serviceOptions: i, notifyServiceOptions: o, value: r, onChange: c }) {
  const [f, m] = I.useState("Call service"), [p, g] = I.useState(""), [x, S] = I.useState(""), [w, C] = I.useState(""), A = f === "Notify" ? o : i, N = (B = f, z = p, _ = x, R = w) => {
    c(O2(B, z, _, R));
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "builder-compound action", children: [
    /* @__PURE__ */ d.jsxs("select", { value: f, "aria-label": "Action type", onChange: (B) => {
      const z = B.currentTarget.value;
      m(z), N(z);
    }, children: [
      /* @__PURE__ */ d.jsx("option", { children: "Call service" }),
      /* @__PURE__ */ d.jsx("option", { children: "Activate scene" }),
      /* @__PURE__ */ d.jsx("option", { children: "Notify" }),
      /* @__PURE__ */ d.jsx("option", { children: "Delay" }),
      /* @__PURE__ */ d.jsx("option", { children: "Wait for trigger" })
    ] }),
    f === "Call service" || f === "Notify" ? /* @__PURE__ */ d.jsx(
      Zb,
      {
        label: "Service",
        options: A,
        placeholder: f === "Notify" ? "Search notify service" : "Search service",
        value: p,
        onChange: (B) => {
          g(B), N(f, B);
        }
      }
    ) : null,
    f === "Call service" ? /* @__PURE__ */ d.jsx(
      Po,
      {
        label: "Action targets",
        placeholder: "Search target entities",
        options: a,
        selector: { domains: q2(p), multiple: !0 },
        value: x,
        onChange: (B) => {
          S(B), N(f, p, B);
        }
      }
    ) : null,
    f === "Activate scene" ? /* @__PURE__ */ d.jsx(
      Po,
      {
        label: "Scene",
        placeholder: "Search scene",
        options: a,
        selector: { domains: ["scene"] },
        value: x,
        onChange: (B) => {
          S(B), N(f, p, B);
        }
      }
    ) : null,
    /* @__PURE__ */ d.jsx(
      "textarea",
      {
        value: w,
        placeholder: H2(f),
        rows: 2,
        onChange: (B) => {
          const z = B.currentTarget.value;
          C(z), N(f, p, x, z);
        }
      }
    ),
    /* @__PURE__ */ d.jsx("small", { children: r || "No action selected" })
  ] });
}
function z2({ serviceOptions: a, value: i, onChange: o }) {
  const [r, c] = I.useState(""), [f, m] = I.useState(""), p = (g = r, x = f) => {
    o(g || x ? `Notify using ${g || "selected notify service"}${x ? `: ${x}` : ""}` : "");
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "builder-compound", children: [
    /* @__PURE__ */ d.jsx(
      Zb,
      {
        label: "Notify service",
        options: a,
        placeholder: "Search notify service",
        value: r,
        onChange: (g) => {
          c(g), p(g);
        }
      }
    ),
    /* @__PURE__ */ d.jsx(
      "input",
      {
        value: f,
        placeholder: "Notification message",
        onChange: (g) => {
          const x = g.currentTarget.value;
          m(x), p(r, x);
        }
      }
    ),
    /* @__PURE__ */ d.jsx("small", { children: i || "No notification" })
  ] });
}
function Po({ label: a, placeholder: i, options: o, selector: r, value: c, onChange: f }) {
  const [m, p] = I.useState(""), [g, x] = I.useState(!1), S = N2(c), w = I.useMemo(() => {
    const N = r.domains ? new Set(r.domains) : null, B = new Set(r.multiple ? S : []);
    return o.filter((z) => N && !N.has($b(z.entityId)) ? !1 : !B.has(z.entityId));
  }, [o, S, r.domains, r.multiple]), C = I.useMemo(() => {
    const N = (r.multiple ? m : m || c).trim().toLowerCase();
    return (N ? w.filter((z) => z.searchText.includes(N)) : w).slice(0, 10);
  }, [w, m, r.multiple, c]), A = (N) => {
    if (r.multiple) {
      const B = [...S, N];
      f(B.join(", ")), p(""), x(!1);
      return;
    }
    f(N), p(""), x(!1);
  };
  return r.multiple ? /* @__PURE__ */ d.jsxs("div", { className: "entity-combobox", children: [
    S.length ? /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-chips", children: S.map((N) => /* @__PURE__ */ d.jsxs(
      "button",
      {
        "aria-label": `Remove ${N}`,
        className: "entity-combobox-chip",
        type: "button",
        onClick: () => f(S.filter((B) => B !== N).join(", ")),
        children: [
          /* @__PURE__ */ d.jsx("span", { children: N }),
          /* @__PURE__ */ d.jsx(ut, { icon: "mdi:close" })
        ]
      },
      N
    )) }) : null,
    /* @__PURE__ */ d.jsx(
      "input",
      {
        "aria-autocomplete": "list",
        "aria-expanded": g,
        "aria-label": `${a} entity search`,
        autoComplete: "off",
        placeholder: i,
        role: "combobox",
        value: m,
        onBlur: () => window.setTimeout(() => x(!1), 120),
        onChange: (N) => {
          p(N.currentTarget.value), x(!0);
        },
        onFocus: () => x(!0),
        onKeyDown: (N) => {
          N.key === "Enter" && C[0] && (N.preventDefault(), A(C[0].entityId));
        }
      }
    ),
    g ? /* @__PURE__ */ d.jsx(vx, { options: C, onSelect: A }) : null
  ] }) : /* @__PURE__ */ d.jsxs("div", { className: "entity-combobox", children: [
    /* @__PURE__ */ d.jsx(
      "input",
      {
        "aria-autocomplete": "list",
        "aria-expanded": g,
        "aria-label": `${a} entity search`,
        autoComplete: "off",
        placeholder: i,
        role: "combobox",
        value: m || c,
        onBlur: () => window.setTimeout(() => x(!1), 120),
        onChange: (N) => {
          p(N.currentTarget.value), f(N.currentTarget.value), x(!0);
        },
        onFocus: () => x(!0),
        onKeyDown: (N) => {
          N.key === "Enter" && C[0] && (N.preventDefault(), A(C[0].entityId));
        }
      }
    ),
    g ? /* @__PURE__ */ d.jsx(vx, { options: C, onSelect: A }) : null
  ] });
}
function Zb({ label: a, options: i, placeholder: o, value: r, onChange: c }) {
  const [f, m] = I.useState(""), [p, g] = I.useState(!1), x = I.useMemo(() => {
    const w = (f || r).trim().toLowerCase();
    return (w ? i.filter((A) => A.searchText.includes(w)) : i).slice(0, 10);
  }, [i, f, r]), S = (w) => {
    c(w), m(""), g(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "entity-combobox", children: [
    /* @__PURE__ */ d.jsx(
      "input",
      {
        "aria-autocomplete": "list",
        "aria-expanded": p,
        "aria-label": `${a} search`,
        autoComplete: "off",
        placeholder: o,
        role: "combobox",
        value: f || r,
        onBlur: () => window.setTimeout(() => g(!1), 120),
        onChange: (w) => {
          m(w.currentTarget.value), c(w.currentTarget.value), g(!0);
        },
        onFocus: () => g(!0),
        onKeyDown: (w) => {
          w.key === "Enter" && x[0] && (w.preventDefault(), S(x[0].serviceId));
        }
      }
    ),
    p ? /* @__PURE__ */ d.jsx(A2, { options: x, onSelect: S }) : null
  ] });
}
function A2({ options: a, onSelect: i }) {
  return /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-menu", role: "listbox", children: a.length ? a.map((o) => /* @__PURE__ */ d.jsxs("button", { type: "button", role: "option", onMouseDown: (r) => r.preventDefault(), onClick: () => i(o.serviceId), children: [
    /* @__PURE__ */ d.jsx("strong", { children: o.label }),
    /* @__PURE__ */ d.jsx("small", { children: o.serviceId })
  ] }, o.serviceId)) : /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-empty", children: "No matches" }) });
}
function vx({ options: a, onSelect: i }) {
  return /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-menu", role: "listbox", children: a.length ? a.map((o) => /* @__PURE__ */ d.jsxs("button", { type: "button", role: "option", onMouseDown: (r) => r.preventDefault(), onClick: () => i(o.entityId), children: [
    /* @__PURE__ */ d.jsx("strong", { children: o.label }),
    /* @__PURE__ */ d.jsx("small", { children: o.subtitle })
  ] }, o.entityId)) : /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-empty", children: "No matches" }) });
}
function E2(a) {
  return Object.entries(a).map(([i, o]) => {
    var m;
    const r = String(((m = o.attributes) == null ? void 0 : m.friendly_name) || i), c = $b(i), f = r === i ? c : `${i} - ${c}`;
    return {
      entityId: i,
      label: r,
      subtitle: f,
      searchText: `${i} ${r} ${c}`.toLowerCase()
    };
  }).sort((i, o) => i.entityId.localeCompare(o.entityId));
}
function R2(a) {
  return Object.entries(a).flatMap(([i, o]) => Object.entries(o || {}).map(([r, c]) => {
    const f = `${i}.${r}`, m = c.name || f;
    return {
      serviceId: f,
      label: m,
      domain: i,
      searchText: `${f} ${m} ${c.description || ""}`.toLowerCase()
    };
  })).sort((i, o) => i.serviceId.localeCompare(o.serviceId));
}
function N2(a) {
  return a.split(",").map((i) => i.trim()).filter(Boolean);
}
function $b(a) {
  return a.split(".")[0] || "";
}
function M2(a, i, o) {
  return a === "Time" ? o ? `At ${o}` : "" : a === "Sun" ? o ? `Sun ${o}` : "" : a === "Event" ? o ? `Event ${o}` : "" : i ? a === "Numeric state" ? `${i} numeric state ${o || "matches threshold"}` : `${i} turns ${o || "on"}` : "";
}
function D2(a, i, o) {
  return a === "None" ? "" : a === "Time" ? o ? `Time condition: ${o}` : "" : a === "Sun" ? o ? `Sun condition: ${o}` : "" : a === "Template" ? o ? `Template condition: ${o}` : "" : i ? a === "Numeric state" ? `${i} numeric condition ${o || "matches threshold"}` : `${i} is ${o || "on"}` : "";
}
function O2(a, i, o, r) {
  return a === "Delay" ? r ? `Delay ${r}` : "" : a === "Wait for trigger" ? r ? `Wait for ${r}` : "" : a === "Activate scene" ? o ? `Activate ${o}` : "" : a === "Notify" ? i || r ? `Notify using ${i || "selected notify service"}${r ? `: ${r}` : ""}` : "" : !i && !o && !r ? "" : `Call ${i || "selected service"}${o ? ` on ${o}` : ""}${r ? ` with ${r}` : ""}`;
}
function B2(a) {
  return a === "Numeric state" ? "above 20, below 50" : a === "Time" ? "07:30:00" : a === "Sun" ? "sunset offset -00:30:00" : a === "Event" ? "event_type or event data" : "on, off, home, open";
}
function k2(a) {
  return a === "Numeric state" ? "above 20" : a === "Time" ? "after 22:00 before 06:00" : a === "Sun" ? "after sunset" : a === "Template" ? "{{ condition }}" : "state value";
}
function H2(a) {
  return a === "Delay" ? "00:05:00" : a === "Wait for trigger" ? "binary_sensor.door turns off" : a === "Notify" ? "Notification message" : "Optional service data";
}
function q2(a) {
  const i = a.split(".")[0];
  if (!(!i || i === "homeassistant"))
    return i === "scene" ? ["scene"] : i === "script" ? ["script"] : [i];
}
const G2 = Object.freeze([]), U2 = Object.freeze([]), L2 = [];
function Q2(a) {
  const i = qt((o) => o.activeId);
  return i ? /* @__PURE__ */ d.jsx(Y2, { activeId: i, ...a }) : /* @__PURE__ */ d.jsx(Wb, { onNew: a.onNew, onGitToggle: a.onGitToggle });
}
function Y2({ activeId: a, ...i }) {
  const o = qt((et) => et.chatsById[a]), r = qt((et) => et.messagesByChatId[a] || G2), c = qt((et) => et.drafts[a] || ""), f = qt((et) => et.setDraft), m = qt((et) => et.clearDraft), p = qt((et) => et.contextByChatId[a] || L2), g = qt((et) => et.addContextItem), x = qt((et) => et.removeContextItem), S = qt((et) => et.clearContext), w = qt((et) => et.questionDrafts[a] || ""), C = qt((et) => et.setQuestionDraft), A = qt((et) => et.queuesByChatId[a] || U2), N = pt((et) => et.settings), B = pt((et) => et.renamingId), z = pt((et) => et.renameTitle), _ = pt((et) => et.setRenaming), R = I.useRef(null), L = I.useRef(null), q = I.useRef(!0), y = I.useRef({ activeId: a, messageCount: 0, thinkingVisible: !1 }), D = I.useRef(null), v = I.useRef(null), [M, k] = I.useState(!1), [K, tt] = I.useState(!1), [ct, rt] = I.useState(!0), [ot, yt] = I.useState(a), [H, W] = I.useState(0), F = I.useMemo(() => p1(r), [r]), ht = I.useMemo(() => o ? Xx(o, r) : null, [o, r]), st = !!(o != null && o.archived), T = Bo(o), Y = Zd(o), X = I.useMemo(() => H1(o, N), [o, N]), it = I.useMemo(() => q1(p, N.context_budget_chars), [p, N.context_budget_chars]), gt = ab(o), St = (o == null ? void 0 : o.status) === "error" && !st, At = T && !ht, at = I.useMemo(() => ({ Footer: () => At ? /* @__PURE__ */ d.jsx(F2, {}) : null }), [At]), vt = I.useCallback(() => {
    q.current = !0, rt(!0), W((et) => et + 1);
  }, []), re = I.useCallback((et) => {
    et && (q.current = !0), rt(et);
  }, []), Vt = I.useCallback((et) => {
    et.deltaY < 0 && (q.current = !1);
  }, []), Jt = I.useCallback((et) => {
    var Et;
    D.current = ((Et = et.touches[0]) == null ? void 0 : Et.clientY) ?? null;
  }, []), me = I.useCallback((et) => {
    var we;
    const Et = ((we = et.touches[0]) == null ? void 0 : we.clientY) ?? null;
    D.current !== null && Et !== null && Et > D.current && (q.current = !1), D.current = Et;
  }, []), Xt = I.useCallback(() => {
    D.current = null;
  }, []), Kt = I.useCallback((et) => {
    L.current = et;
  }, []), Bt = I.useCallback((et) => {
    var we, $n;
    F.length && ((we = R.current) == null || we.scrollToIndex({ index: F.length - 1, align: "end", behavior: et })), ($n = R.current) == null || $n.scrollTo({ top: Number.MAX_SAFE_INTEGER, behavior: et });
    const Et = L.current;
    Et && (Et instanceof HTMLElement ? Et.scrollTo({ top: Et.scrollHeight, behavior: et }) : Et.scrollTo({ top: Et.document.documentElement.scrollHeight, behavior: et }));
  }, [F.length]), Ee = I.useCallback(() => {
    F.length && (q.current = !0, rt(!0), Bt("smooth"));
  }, [F.length, Bt]);
  if (I.useEffect(() => {
    q.current = !0, rt(!0), yt(a);
  }, [a]), I.useEffect(() => {
    const et = q.current || ot === a, Et = y.current, we = Et.activeId !== a, $n = !we && F.length > Et.messageCount, va = !we && At && !Et.thinkingVisible;
    if (y.current = { activeId: a, messageCount: F.length, thinkingVisible: At }, !et && !H || !F.length && !At) return;
    const pe = ot === a && !H ? "auto" : H || $n || va ? "smooth" : "auto";
    let gn = 0, ya = 0;
    const ri = requestAnimationFrame(() => {
      Bt(pe), gn = requestAnimationFrame(() => Bt(pe)), ya = window.setTimeout(() => Bt(pe), 120), ot === a && yt(null), H && W(0);
    });
    return () => {
      cancelAnimationFrame(ri), cancelAnimationFrame(gn), window.clearTimeout(ya);
    };
  }, [a, ot, F, Bt, H, At]), I.useEffect(() => {
    const et = q.current || ot === a;
    if (!At || !et) return;
    let Et = 0;
    const we = requestAnimationFrame(() => {
      Bt("smooth"), Et = requestAnimationFrame(() => {
        Bt("smooth");
      });
    });
    return () => {
      cancelAnimationFrame(we), cancelAnimationFrame(Et);
    };
  }, [a, ot, Bt, At]), I.useEffect(() => {
    const et = v.current;
    et && (et.style.height = "52px", et.style.height = `${Math.min(et.scrollHeight, 180)}px`);
  }, [c]), I.useEffect(() => {
    if (!o || st || ht) return;
    const et = requestAnimationFrame(() => {
      const Et = v.current;
      if (!Et) return;
      Et.focus({ preventScroll: !0 });
      const we = Et.value.length;
      Et.setSelectionRange(we, we);
    });
    return () => cancelAnimationFrame(et);
  }, [o == null ? void 0 : o.id, st, ht]), !o) return /* @__PURE__ */ d.jsx(Wb, { onNew: i.onNew, onGitToggle: i.onGitToggle });
  const Wt = B === o.id;
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("header", { className: "chat-header", children: [
      /* @__PURE__ */ d.jsx("div", { className: "title-area", children: /* @__PURE__ */ d.jsxs("div", { className: "title-row", children: [
        Wt ? /* @__PURE__ */ d.jsx("input", { className: "title-input", name: "session-title", value: z, "aria-label": "Chat title", onChange: (et) => _(o.id, et.target.value), onKeyDown: (et) => {
          et.key === "Enter" && i.onRenameSave(o.id), et.key === "Escape" && _(null);
        }, autoFocus: !0 }) : /* @__PURE__ */ d.jsx("h1", { children: o.title }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", onClick: () => Wt ? i.onRenameSave(o.id) : i.onRenameStart(o.id), title: Wt ? "Save title" : "Rename chat", "aria-label": Wt ? "Save title" : "Rename chat", children: /* @__PURE__ */ d.jsx(ut, { icon: Wt ? "mdi:content-save" : "mdi:pencil" }) })
      ] }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "header-actions", children: [
        st ? /* @__PURE__ */ d.jsx("button", { onClick: () => i.onArchive(o.id, !1), children: "Restore" }) : null,
        T ? /* @__PURE__ */ d.jsx("button", { className: "icon-button stop-button danger", onClick: () => i.onCancel(o.id), title: "Stop", "aria-label": "Stop chat", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:stop" }) }) : null,
        /* @__PURE__ */ d.jsx(Fb, { onClick: i.onGitToggle })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs(
      "div",
      {
        className: "transcript",
        onWheelCapture: Vt,
        onTouchStartCapture: Jt,
        onTouchMoveCapture: me,
        onTouchEndCapture: Xt,
        onTouchCancelCapture: Xt,
        children: [
          /* @__PURE__ */ d.jsx(
            Is,
            {
              ref: R,
              style: { height: "100%" },
              data: F,
              scrollerRef: Kt,
              followOutput: (et) => et || q.current ? "smooth" : !1,
              atBottomStateChange: re,
              itemContent: (et, Et) => /* @__PURE__ */ d.jsx(e2, { api: i.api, message: Et, sessionId: o.id, canRetry: St, onCopy: i.onCopy, onRetry: i.onRetry, onRollback: i.onRollback, onValidationReload: i.onValidationReload }, g1(Et, et)),
              components: at
            }
          ),
          !ct && F.length ? /* @__PURE__ */ d.jsx("button", { className: "scroll-to-bottom", type: "button", onClick: Ee, title: "Scroll to bottom", "aria-label": "Scroll to bottom", children: /* @__PURE__ */ d.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#0F766E", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ d.jsx("path", { fill: "none", stroke: "#0F766E", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", d: "m6 9 6 6 6-6" }) }) }) : null
        ]
      }
    ),
    st ? /* @__PURE__ */ d.jsx("div", { className: "archived-note", children: "Archived chat" }) : ht ? /* @__PURE__ */ d.jsx(
      $2,
      {
        session: o,
        question: ht,
        value: w,
        onChange: (et) => C(o.id, et),
        onAnswer: (et, Et) => {
          vt(), i.onAnswer(et, Et);
        }
      }
    ) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("form", { className: "composer", onSubmit: (et) => {
        if (et.preventDefault(), Y || gt) return;
        const Et = c.trim();
        Et && (m(o.id), vt(), i.onSend(o.id, Et));
      }, children: [
        /* @__PURE__ */ d.jsx(K2, { session: o, onRunPlan: i.onRunPlan }),
        /* @__PURE__ */ d.jsx(I2, { session: o, onApprove: i.onApprove }),
        !Y && !gt ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            V2,
            {
              settings: N,
              runSettings: X,
              onChange: (et) => i.onRunSettingsChange(o.id, { ...X, ...et })
            }
          ),
          /* @__PURE__ */ d.jsx(
            X2,
            {
              value: X.plan_mode,
              onChange: (et) => i.onRunSettingsChange(o.id, { ...X, plan_mode: et })
            }
          ),
          /* @__PURE__ */ d.jsx(Z2, { sessionId: o.id, queues: A, onEdit: i.onQueueEdit, onSteer: i.onQueueSteer, onClear: i.onQueueClear }),
          /* @__PURE__ */ d.jsxs("div", { className: "context-chip-row", children: [
            /* @__PURE__ */ d.jsx(m2, { items: p, onRemove: (et) => x(o.id, et), onClear: () => S(o.id) }),
            p.length ? /* @__PURE__ */ d.jsx("span", { className: `context-budget ${it.level}`, children: it.label }) : null
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "composer-input-row", children: [
            /* @__PURE__ */ d.jsx("textarea", { ref: v, name: "prompt", placeholder: "Ask Codex to change Home Assistant...", rows: 1, value: c, onChange: (et) => f(o.id, et.target.value), onKeyDown: (et) => {
              var Et;
              et.key === "Enter" && !et.shiftKey && !et.metaKey && !et.ctrlKey && !et.altKey && !et.nativeEvent.isComposing && (et.preventDefault(), (Et = et.currentTarget.form) == null || Et.requestSubmit());
            } }),
            /* @__PURE__ */ d.jsxs("button", { className: "context-button", type: "button", onClick: () => k(!0), title: "Add context", "aria-label": "Add context", children: [
              /* @__PURE__ */ d.jsx(ut, { icon: "mdi:paperclip" }),
              p.length ? /* @__PURE__ */ d.jsx("b", { children: p.length }) : null
            ] }),
            /* @__PURE__ */ d.jsx("button", { className: "builder-button", type: "button", onClick: () => tt(!0), title: "Automation builder", "aria-label": "Automation builder", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:robot-industrial-outline" }) }),
            /* @__PURE__ */ d.jsx("button", { className: "send-button", type: "submit", title: "Send", "aria-label": "Send", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:send" }) })
          ] })
        ] }) : null
      ] }),
      /* @__PURE__ */ d.jsx(
        w2,
        {
          open: K,
          hass: i.hass,
          contextItems: p,
          onClose: () => tt(!1),
          onSubmit: (et) => {
            tt(!1), vt(), i.onSend(o.id, et);
          }
        }
      ),
      /* @__PURE__ */ d.jsx(
        h2,
        {
          api: i.api,
          hass: i.hass,
          open: M,
          selected: p,
          onAdd: (et) => g(o.id, et),
          onRemove: (et) => x(o.id, et),
          onClear: () => S(o.id),
          onClose: () => k(!1)
        }
      )
    ] })
  ] });
}
function Fb({ onClick: a }) {
  const i = pt((c) => c.gitPanelOpen), o = pt((c) => pa(c.gitSetupStatus)), r = pt((c) => {
    var f;
    return (f = c.gitChanges) != null && f.files ? Hs(c.gitChanges.files) : c.gitChangedCount;
  });
  return i || !o ? null : /* @__PURE__ */ d.jsxs("button", { className: "git-toggle", onClick: a, title: "Open Git panel", "aria-label": "Open Git panel", children: [
    /* @__PURE__ */ d.jsx(ut, { icon: "mdi:source-branch" }),
    /* @__PURE__ */ d.jsx("span", { children: "Git" }),
    r ? /* @__PURE__ */ d.jsx("b", { children: r }) : null
  ] });
}
function V2({
  settings: a,
  runSettings: i,
  onChange: o
}) {
  const r = i.mode === "manual";
  return /* @__PURE__ */ d.jsxs("div", { className: `run-controls ${r ? "manual" : "auto"}`, children: [
    /* @__PURE__ */ d.jsx(
      Jb,
      {
        ariaLabel: "Model preset",
        value: i.model_preset_id,
        options: a.model_presets.map((c) => [c.id, c.label]),
        onChange: (c) => o({ model_preset_id: c })
      }
    ),
    /* @__PURE__ */ d.jsxs("button", { type: "button", className: r ? "" : "active", onClick: () => o({ mode: r ? "auto" : "manual" }), children: [
      /* @__PURE__ */ d.jsx(ut, { icon: r ? "mdi:tune" : "mdi:auto-mode" }),
      /* @__PURE__ */ d.jsx("span", { children: r ? "Manual" : "Auto" })
    ] }),
    r ? /* @__PURE__ */ d.jsxs("div", { className: "run-controls-extra", children: [
      /* @__PURE__ */ d.jsx(Mo, { label: "Reasoning", value: i.reasoning_effort, options: ["auto", "minimal", "low", "medium", "high", "xhigh"], onChange: (c) => o({ reasoning_effort: c }) }),
      /* @__PURE__ */ d.jsx(Mo, { label: "Verbosity", value: i.verbosity, options: ["auto", "low", "medium", "high"], onChange: (c) => o({ verbosity: c }) }),
      /* @__PURE__ */ d.jsx(Mo, { label: "Validation", value: i.validation_depth, options: ["auto", "none", "full"], onChange: (c) => o({ validation_depth: c }) }),
      /* @__PURE__ */ d.jsx(Mo, { label: "Tools", value: i.tool_visibility, options: ["compact", "normal", "verbose"], onChange: (c) => o({ tool_visibility: c }) }),
      /* @__PURE__ */ d.jsx(Mo, { label: "Approvals", value: i.approval_mode, options: ["ask", "auto_readonly"], onChange: (c) => o({ approval_mode: c }) })
    ] }) : null
  ] });
}
function X2({ value: a, onChange: i }) {
  const o = [
    { value: "auto", label: "Auto", icon: "mdi:auto-mode", title: "Plan automatically when Codex expects to edit files" },
    { value: "always", label: "On", icon: "mdi:clipboard-check-outline", title: "Always request a plan before running" },
    { value: "off", label: "Off", icon: "mdi:clipboard-off-outline", title: "Run without requesting a plan first" }
  ];
  return /* @__PURE__ */ d.jsxs("div", { className: "plan-mode-toggle", "aria-label": "Plan mode", children: [
    /* @__PURE__ */ d.jsx("span", { children: "Plan" }),
    /* @__PURE__ */ d.jsx("div", { className: "plan-mode-options", role: "group", "aria-label": "Plan mode", children: o.map((r) => /* @__PURE__ */ d.jsxs(
      "button",
      {
        type: "button",
        className: a === r.value ? "active" : "",
        title: r.title,
        "aria-pressed": a === r.value,
        onClick: () => i(r.value),
        children: [
          /* @__PURE__ */ d.jsx(ut, { icon: r.icon }),
          /* @__PURE__ */ d.jsx("span", { children: r.label })
        ]
      },
      r.value
    )) })
  ] });
}
function Jb({ ariaLabel: a, value: i, options: o, onChange: r }) {
  var g;
  const [c, f] = I.useState(!1), m = I.useRef(null), p = ((g = o.find(([x]) => x === i)) == null ? void 0 : g[1]) || i;
  return I.useEffect(() => {
    if (!c) return;
    const x = (S) => {
      const w = m.current;
      if (!w) return;
      S.composedPath().includes(w) || f(!1);
    };
    return document.addEventListener("pointerdown", x), () => document.removeEventListener("pointerdown", x);
  }, [c]), /* @__PURE__ */ d.jsxs("div", { className: "run-select", ref: m, children: [
    /* @__PURE__ */ d.jsxs("button", { type: "button", className: "run-select-button", "aria-label": a, "aria-haspopup": "listbox", "aria-expanded": c, onClick: () => f((x) => !x), children: [
      /* @__PURE__ */ d.jsx("span", { children: p }),
      /* @__PURE__ */ d.jsx(ut, { icon: "mdi:chevron-up" })
    ] }),
    c ? /* @__PURE__ */ d.jsx("div", { className: "run-select-menu", role: "listbox", "aria-label": a, children: o.map(([x, S]) => /* @__PURE__ */ d.jsx("button", { type: "button", role: "option", "aria-selected": x === i, className: x === i ? "selected" : "", onClick: () => {
      r(x), f(!1);
    }, children: S }, x)) }) : null
  ] });
}
function Mo({ label: a, value: i, options: o, onChange: r }) {
  return /* @__PURE__ */ d.jsxs("label", { children: [
    /* @__PURE__ */ d.jsx("span", { children: a }),
    /* @__PURE__ */ d.jsx(Jb, { ariaLabel: a, value: i, options: o.map((c) => [c, c.replace("_", " ")]), onChange: r })
  ] });
}
function K2({ session: a, onRunPlan: i }) {
  var f, m;
  const o = Zd(a), r = ab(a);
  if (!o && !r) return null;
  const c = (o == null ? void 0 : o.id) || String(((m = (f = a.metadata) == null ? void 0 : f.pending_plan) == null ? void 0 : m.id) || "");
  return /* @__PURE__ */ d.jsxs("section", { className: "run-plan-review", "aria-label": "Run plan review", children: [
    /* @__PURE__ */ d.jsx("label", { children: r ? "Preparing run plan" : "Review run plan" }),
    /* @__PURE__ */ d.jsx("div", { className: "run-plan-copy", children: r ? "Codex is preparing a plan before edits begin." : "Approve the plan to create a rollback checkpoint and start execution." }),
    !r && c ? /* @__PURE__ */ d.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ d.jsxs("button", { type: "button", onClick: () => i(a.id, c, "approve"), children: [
        /* @__PURE__ */ d.jsx(ut, { icon: "mdi:check" }),
        /* @__PURE__ */ d.jsx("span", { children: "Approve" })
      ] }),
      /* @__PURE__ */ d.jsxs("button", { type: "button", onClick: () => i(a.id, c, "revise"), children: [
        /* @__PURE__ */ d.jsx(ut, { icon: "mdi:pencil" }),
        /* @__PURE__ */ d.jsx("span", { children: "Revise" })
      ] }),
      /* @__PURE__ */ d.jsxs("button", { type: "button", className: "danger", onClick: () => i(a.id, c, "cancel"), children: [
        /* @__PURE__ */ d.jsx(ut, { icon: "mdi:close" }),
        /* @__PURE__ */ d.jsx("span", { children: "Cancel" })
      ] })
    ] }) : null
  ] });
}
function I2({ session: a, onApprove: i }) {
  const o = ni(a);
  return o.length ? /* @__PURE__ */ d.jsx("div", { className: "approvals", "aria-label": "Pending approvals", children: o.map((r) => /* @__PURE__ */ d.jsxs("section", { className: "approval", children: [
    /* @__PURE__ */ d.jsx("label", { children: "Approval needed" }),
    /* @__PURE__ */ d.jsx("pre", { children: r.command }),
    r.reason ? /* @__PURE__ */ d.jsx("p", { className: "approval-reason", children: r.reason.replace(/^restart_required:\s*/, "") }) : null,
    r.cwd ? /* @__PURE__ */ d.jsx("p", { className: "muted", children: r.cwd }) : null,
    /* @__PURE__ */ d.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ d.jsx("button", { type: "button", onClick: () => i(a.id, r.id, !0), children: "Approve" }),
      /* @__PURE__ */ d.jsx("button", { type: "button", className: "danger", onClick: () => i(a.id, r.id, !1), children: "Reject" })
    ] })
  ] }, r.id)) }) : null;
}
function Z2({ sessionId: a, queues: i, onEdit: o, onSteer: r, onClear: c }) {
  return i.length ? /* @__PURE__ */ d.jsx("div", { className: "message-queue", "aria-label": "Queued messages", children: i.map((f) => /* @__PURE__ */ d.jsxs("div", { className: "queued-message", children: [
    /* @__PURE__ */ d.jsx("span", { children: f.content }),
    /* @__PURE__ */ d.jsxs("div", { className: "queued-actions", children: [
      /* @__PURE__ */ d.jsx("button", { className: "icon-button queue-edit", type: "button", onClick: () => o(a, f.id), "data-tooltip": "Edit", "aria-label": "Edit queued message", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:pencil" }) }),
      /* @__PURE__ */ d.jsx("button", { className: "icon-button queue-steer", type: "button", onClick: () => r(a, f.id), "data-tooltip": "Steer", "aria-label": "Steer current conversation", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:send" }) }),
      /* @__PURE__ */ d.jsx("button", { className: "icon-button queue-clear", type: "button", onClick: () => c(a, f.id), "data-tooltip": "Clear", "aria-label": "Clear queued message", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:close" }) })
    ] })
  ] }, f.id)) }) : null;
}
function $2({ session: a, question: i, value: o, onChange: r, onAnswer: c }) {
  const f = I.useRef(null);
  return I.useEffect(() => {
    const m = requestAnimationFrame(() => {
      const p = f.current;
      if (!p) return;
      p.focus({ preventScroll: !0 });
      const g = p.value.length;
      p.setSelectionRange(g, g);
    });
    return () => cancelAnimationFrame(m);
  }, [a.id, i]), /* @__PURE__ */ d.jsxs("form", { className: "composer question-composer", onSubmit: (m) => {
    m.preventDefault(), c(a.id, o);
  }, children: [
    /* @__PURE__ */ d.jsx("label", { children: "Codex needs direction" }),
    /* @__PURE__ */ d.jsx("div", { className: "question-text", children: i.question }),
    /* @__PURE__ */ d.jsx("div", { className: "question-choices", children: i.choices.map((m) => /* @__PURE__ */ d.jsxs("button", { className: "question-choice", type: "button", onClick: () => c(a.id, m.label), children: [
      /* @__PURE__ */ d.jsxs("span", { className: "question-info-wrap", children: [
        /* @__PURE__ */ d.jsx(ut, { className: "question-info", icon: "mdi:information-outline" }),
        /* @__PURE__ */ d.jsx("span", { className: "question-choice-tooltip", role: "tooltip", children: m.description || "Use this answer." })
      ] }),
      /* @__PURE__ */ d.jsx("span", { children: m.label })
    ] }, m.label)) }),
    /* @__PURE__ */ d.jsxs("div", { className: "question-custom-row", children: [
      /* @__PURE__ */ d.jsx("input", { ref: f, name: "question-custom", value: o, placeholder: i.customPlaceholder, "aria-label": "Custom answer", onChange: (m) => r(m.target.value) }),
      /* @__PURE__ */ d.jsx("button", { className: "send-button question-send", type: "submit", title: "Send custom answer", "aria-label": "Send custom answer", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:send" }) })
    ] })
  ] });
}
function F2() {
  return /* @__PURE__ */ d.jsx("div", { className: "message-row message-row-codex", children: /* @__PURE__ */ d.jsxs("article", { className: "message assistant message-style-codex message-style-thinking", "aria-live": "polite", "aria-label": "Codex is thinking", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "role", children: [
      /* @__PURE__ */ d.jsx(ut, { icon: "mdi:robot" }),
      /* @__PURE__ */ d.jsx("span", { children: "assistant" })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "thinking-content", children: [
      /* @__PURE__ */ d.jsx("span", { children: "Thinking" }),
      /* @__PURE__ */ d.jsxs("span", { className: "thinking-dots", "aria-hidden": "true", children: [
        /* @__PURE__ */ d.jsx("i", {}),
        /* @__PURE__ */ d.jsx("i", {}),
        /* @__PURE__ */ d.jsx("i", {})
      ] })
    ] })
  ] }) });
}
function Wb({ onNew: a, onGitToggle: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: "empty", children: [
    /* @__PURE__ */ d.jsx("h1", { children: "Start a Codex chat" }),
    /* @__PURE__ */ d.jsx("p", { children: "Create a session to edit Home Assistant config from this console." }),
    /* @__PURE__ */ d.jsxs("div", { className: "empty-actions", children: [
      /* @__PURE__ */ d.jsx("button", { onClick: a, children: "New chat" }),
      /* @__PURE__ */ d.jsx(Fb, { onClick: i })
    ] })
  ] });
}
const J2 = [
  { id: "account", label: "Account" },
  { id: "git", label: "Git" },
  { id: "run", label: "Run" },
  { id: "models", label: "Models" },
  { id: "debug", label: "Debug" },
  { id: "bridge-log", label: "Bridge Log" }
];
function W2({ onClose: a, onTab: i, onSettingsSave: o, onBridgeRestart: r, onCoreRestart: c, onBridgeLogRefresh: f, onBridgeLogClear: m, onDeviceLogin: p, onDeviceLoginCancel: g, onAccountLogout: x, onGitSetupRefresh: S, onGitSetupGenerateKey: w, onGitSetupRemoteSave: C, onGitSetupPull: A }) {
  var D;
  const N = pt((v) => v.settingsTab), B = pt((v) => v.settings), z = pt((v) => v.settingsSaving), R = ((D = pt((v) => v.status).runtime) == null ? void 0 : D.bridge_available) === !0, L = pt((v) => v.bridgeActionRunning), q = pt((v) => v.coreActionRunning), y = R ? "Restart" : "Start";
  return /* @__PURE__ */ d.jsxs("div", { className: "modal-backdrop", children: [
    /* @__PURE__ */ d.jsx("div", { className: "modal-scrim", onClick: a }),
    /* @__PURE__ */ d.jsxs("section", { className: "modal settings-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "settings-title", children: [
      /* @__PURE__ */ d.jsxs("header", { className: "modal-header", children: [
        /* @__PURE__ */ d.jsx("h2", { id: "settings-title", children: "Settings" }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", onClick: a, title: "Close", "aria-label": "Close", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:close" }) })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "modal-tabs", children: [
        /* @__PURE__ */ d.jsx("div", { className: "debug-tabs", role: "tablist", "aria-label": "Settings views", children: J2.map((v) => /* @__PURE__ */ d.jsx("button", { className: N === v.id ? "active" : "", onClick: () => i(v.id), role: "tab", "aria-selected": N === v.id, children: v.label }, v.id)) }),
        /* @__PURE__ */ d.jsx("span", { className: "modal-tab-spacer" }),
        z ? /* @__PURE__ */ d.jsx("span", { className: "settings-saving", children: "Saving..." }) : null,
        /* @__PURE__ */ d.jsxs("button", { className: `bridge-action ${R ? "bridge-action-restart" : "bridge-action-start"}`, onClick: r, title: `${y} bridge`, disabled: L, children: [
          /* @__PURE__ */ d.jsx(ut, { icon: L ? "mdi:progress-clock" : R ? "mdi:restart" : "mdi:play" }),
          /* @__PURE__ */ d.jsx("span", { children: L ? "Working..." : `${y} Bridge` })
        ] }),
        /* @__PURE__ */ d.jsxs("button", { className: "core-action", onClick: c, title: "Restart Home Assistant Core", disabled: q, children: [
          /* @__PURE__ */ d.jsx(ut, { icon: q ? "mdi:progress-clock" : "mdi:restart-alert" }),
          /* @__PURE__ */ d.jsx("span", { children: q ? "Working..." : "Restart HA" })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "modal-body", children: [
        N === "account" ? /* @__PURE__ */ d.jsx(P2, { onDeviceLogin: p, onDeviceLoginCancel: g, onAccountLogout: x }) : null,
        N === "git" ? /* @__PURE__ */ d.jsx(nC, { onRefresh: S, onGenerateKey: w, onRemoteSave: C, onPull: A }) : null,
        N === "run" ? /* @__PURE__ */ d.jsx(lC, { settings: B, onSave: o }) : null,
        N === "models" ? /* @__PURE__ */ d.jsx(rC, { settings: B, onSave: o }) : null,
        N === "debug" ? /* @__PURE__ */ d.jsx(sC, {}) : null,
        N === "bridge-log" ? /* @__PURE__ */ d.jsx(uC, { onRefresh: f, onClear: m }) : null
      ] })
    ] })
  ] });
}
function P2({ onDeviceLogin: a, onDeviceLoginCancel: i, onAccountLogout: o }) {
  const r = pt((q) => q.account), c = pt((q) => q.accountLoading), f = pt((q) => q.accountActionRunning), m = pt((q) => q.deviceLogin), g = pt((q) => q.status).usage || {}, [x, S] = I.useState(!1), w = (r == null ? void 0 : r.logged_in) === !0, C = (m == null ? void 0 : m.status) === "pending" || (m == null ? void 0 : m.active), A = (r == null ? void 0 : r.error) || (r == null ? void 0 : r.status_text) || (w ? "Logged in" : "Not logged in"), N = pn((m == null ? void 0 : m.output) || "").replace(/(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?/gi, ""), B = Pb(m == null ? void 0 : m.verification_uri) || tC(N), z = tv(m == null ? void 0 : m.user_code) || eC(N), _ = C || (m == null ? void 0 : m.status) === "failed" || (m == null ? void 0 : m.status) === "canceled", R = pt((q) => q.showToast), L = async () => {
    z && (await Id(z), S(!0), window.setTimeout(() => S(!1), 1600), R("Device code copied", "success"));
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "settings-account", children: [
    /* @__PURE__ */ d.jsxs("div", { className: `account-status-card ${w ? "success" : r != null && r.error ? "error" : ""}`, children: [
      /* @__PURE__ */ d.jsxs("div", { className: "account-status-main", children: [
        /* @__PURE__ */ d.jsx(ut, { icon: w ? "mdi:account-check-outline" : "mdi:account-outline" }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("strong", { children: c ? "Checking account..." : w ? "Codex account connected" : "Codex account not connected" }),
          /* @__PURE__ */ d.jsx("span", { children: A })
        ] })
      ] }),
      w ? /* @__PURE__ */ d.jsxs("button", { className: "danger", onClick: o, disabled: f, children: [
        /* @__PURE__ */ d.jsx(ut, { icon: f ? "mdi:progress-clock" : "mdi:logout" }),
        /* @__PURE__ */ d.jsx("span", { children: f ? "Working..." : "Log out" })
      ] }) : /* @__PURE__ */ d.jsxs("button", { onClick: a, disabled: f || C, children: [
        /* @__PURE__ */ d.jsx(ut, { icon: f ? "mdi:progress-clock" : "mdi:cellphone-key" }),
        /* @__PURE__ */ d.jsx("span", { children: f ? "Starting..." : C ? "Login pending" : "Log in with device code" })
      ] })
    ] }),
    w ? /* @__PURE__ */ d.jsxs("div", { className: "account-details", children: [
      /* @__PURE__ */ d.jsx(Do, { label: "Mode", value: (r == null ? void 0 : r.auth_mode) || "ChatGPT" }),
      /* @__PURE__ */ d.jsx(Do, { label: "Account ID", value: (r == null ? void 0 : r.account_id) || "Not reported" }),
      /* @__PURE__ */ d.jsx(Do, { label: "Last refresh", value: oC(r == null ? void 0 : r.last_refresh) }),
      /* @__PURE__ */ d.jsx(Do, { label: "5-hour usage", value: yx(g.five_hour_remaining_percent) }),
      /* @__PURE__ */ d.jsx(Do, { label: "Weekly usage", value: yx(g.weekly_remaining_percent) })
    ] }) : null,
    _ ? /* @__PURE__ */ d.jsxs("div", { className: `device-login-panel ${(m == null ? void 0 : m.status) === "failed" ? "error" : ""}`, children: [
      /* @__PURE__ */ d.jsxs("div", { className: "device-login-header", children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("strong", { children: (m == null ? void 0 : m.status) === "failed" ? "Device login failed" : (m == null ? void 0 : m.status) === "canceled" ? "Device login canceled" : "Device login pending" }),
          /* @__PURE__ */ d.jsx("span", { children: (m == null ? void 0 : m.error) || "Open the URL, enter the code, then return here." })
        ] }),
        C ? /* @__PURE__ */ d.jsxs("button", { className: "ghost", onClick: i, children: [
          /* @__PURE__ */ d.jsx(ut, { icon: "mdi:close-circle-outline" }),
          /* @__PURE__ */ d.jsx("span", { children: "Cancel" })
        ] }) : null
      ] }),
      B ? /* @__PURE__ */ d.jsxs("div", { className: "device-login-field", children: [
        /* @__PURE__ */ d.jsx("span", { children: "URL" }),
        /* @__PURE__ */ d.jsx("a", { className: "device-login-link", href: B, target: "_blank", rel: "noreferrer", children: B })
      ] }) : null,
      z ? /* @__PURE__ */ d.jsxs("div", { className: "device-login-field", children: [
        /* @__PURE__ */ d.jsx("span", { children: "Code" }),
        /* @__PURE__ */ d.jsx("div", { className: "device-login-code-row", children: /* @__PURE__ */ d.jsxs("div", { className: `device-login-code ${x ? "copied" : ""}`, children: [
          /* @__PURE__ */ d.jsx("span", { children: z }),
          /* @__PURE__ */ d.jsx("button", { className: "device-login-copy", onClick: L, title: x ? "Copied" : "Copy code", "aria-label": x ? "Copied" : "Copy device code", children: /* @__PURE__ */ d.jsx(ut, { icon: x ? "mdi:check" : "mdi:content-copy" }) })
        ] }) })
      ] }) : null,
      N ? /* @__PURE__ */ d.jsx("pre", { className: "device-login-output", children: N }) : null
    ] }) : null
  ] });
}
function Pb(a) {
  return pn(a).replace(/(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?/gi, "").replace(/[.,;:]+$/g, "").trim();
}
function tC(a) {
  const i = a.match(/https?:\/\/[^\s)>\]"']+/g) || [], o = i.find((r) => /device|openai|auth/i.test(r)) || i[0] || "";
  return Pb(o);
}
function tv(a) {
  const i = pn(a).toUpperCase().match(/\b[A-Z0-9]{4,8}(?:-[A-Z0-9]{4,8}){1,3}\b/);
  return (i == null ? void 0 : i[0]) || "";
}
function eC(a) {
  return tv(a);
}
function Do({ label: a, value: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: "account-detail", children: [
    /* @__PURE__ */ d.jsx("span", { children: a }),
    /* @__PURE__ */ d.jsx("strong", { children: i })
  ] });
}
function nC({
  onRefresh: a,
  onGenerateKey: i,
  onRemoteSave: o,
  onPull: r
}) {
  const c = pt((_) => _.gitSetupStatus), f = pt((_) => _.gitSetupLoading), m = pt((_) => _.gitSetupActionRunning), p = pt((_) => _.gitSetupResult), g = pt((_) => _.showToast), x = pa(c), S = N1(c), w = (c == null ? void 0 : c.public_key) || (p == null ? void 0 : p.public_key) || "", [C, A] = I.useState((c == null ? void 0 : c.remote_url) || ""), [N, B] = I.useState(!1);
  I.useLayoutEffect(() => {
    A((c == null ? void 0 : c.remote_url) || "");
  }, [c == null ? void 0 : c.remote_url]);
  const z = async () => {
    w && (await Id(w), B(!0), window.setTimeout(() => B(!1), 1600), g("Git public key copied", "success"));
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "settings-git", children: [
    /* @__PURE__ */ d.jsxs("section", { className: `git-setup-summary ${x ? "success" : "warning"}`, children: [
      /* @__PURE__ */ d.jsxs("div", { className: "account-status-main", children: [
        /* @__PURE__ */ d.jsx(ut, { icon: x ? "mdi:source-branch-check" : "mdi:source-branch-sync" }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("strong", { children: f ? "Checking Git setup..." : x ? "Git integration ready" : "Git setup incomplete" }),
          /* @__PURE__ */ d.jsx("span", { children: x ? "Review, commit, and push controls are enabled." : `Missing: ${S.join(", ") || "setup status"}` })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("button", { className: "ghost", onClick: a, disabled: f || m, children: [
        /* @__PURE__ */ d.jsx(ut, { icon: f ? "mdi:progress-clock" : "mdi:refresh" }),
        /* @__PURE__ */ d.jsx("span", { children: f ? "Checking..." : "Refresh" })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "git-setup-cards", children: [
      /* @__PURE__ */ d.jsx(Oo, { label: "Git", value: c != null && c.git_available ? "Available" : "Missing", detail: (c == null ? void 0 : c.git_version) || "git command", ok: (c == null ? void 0 : c.git_available) === !0 }),
      /* @__PURE__ */ d.jsx(Oo, { label: "Repository", value: c != null && c.repository ? "Initialized" : "Not initialized", detail: (c == null ? void 0 : c.work_tree) || (c == null ? void 0 : c.repo_error) || "Home Assistant config", ok: (c == null ? void 0 : c.repository) === !0 }),
      /* @__PURE__ */ d.jsx(Oo, { label: "SSH key", value: c != null && c.ssh_key_exists ? "Created" : "Missing", detail: (c == null ? void 0 : c.ssh_key_path) || "/config/.ssh", ok: (c == null ? void 0 : c.ssh_key_exists) === !0 || (c == null ? void 0 : c.remote_uses_ssh) === !1 }),
      /* @__PURE__ */ d.jsx(Oo, { label: "Origin", value: c != null && c.remote_configured ? "Linked" : "Missing", detail: (c == null ? void 0 : c.remote_url) || "No origin remote", ok: (c == null ? void 0 : c.remote_configured) === !0 }),
      /* @__PURE__ */ d.jsx(Oo, { label: "Branch", value: (c == null ? void 0 : c.branch) || "Missing", detail: (c == null ? void 0 : c.upstream) || "No upstream reported", ok: !!(c != null && c.branch) })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: "settings-section git-setup-section", children: [
      /* @__PURE__ */ d.jsx("h3", { children: "SSH key" }),
      /* @__PURE__ */ d.jsxs("div", { className: "git-setup-row", children: [
        /* @__PURE__ */ d.jsxs("button", { onClick: i, disabled: m || (c == null ? void 0 : c.ssh_key_exists) === !0, children: [
          /* @__PURE__ */ d.jsx(ut, { icon: m ? "mdi:progress-clock" : "mdi:key-plus" }),
          /* @__PURE__ */ d.jsx("span", { children: c != null && c.ssh_key_exists ? "Key ready" : "Generate key" })
        ] }),
        /* @__PURE__ */ d.jsx("a", { href: "https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account", target: "_blank", rel: "noreferrer", children: "GitHub SSH keys" })
      ] }),
      w ? /* @__PURE__ */ d.jsxs("div", { className: `git-public-key ${N ? "copied" : ""}`, children: [
        /* @__PURE__ */ d.jsx("pre", { children: w }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", onClick: z, title: N ? "Copied" : "Copy public key", "aria-label": N ? "Copied" : "Copy public key", children: /* @__PURE__ */ d.jsx(ut, { icon: N ? "mdi:check" : "mdi:content-copy" }) })
      ] }) : null
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: "settings-section git-setup-section", children: [
      /* @__PURE__ */ d.jsx("h3", { children: "Remote repository" }),
      /* @__PURE__ */ d.jsxs("div", { className: "git-remote-form", children: [
        /* @__PURE__ */ d.jsx("input", { value: C, onChange: (_) => A(_.currentTarget.value), placeholder: "git@github.com:owner/repository.git", "aria-label": "Git origin remote URL" }),
        /* @__PURE__ */ d.jsxs("button", { onClick: () => o(C), disabled: m || !C.trim(), children: [
          /* @__PURE__ */ d.jsx(ut, { icon: m ? "mdi:progress-clock" : "mdi:link-variant-plus" }),
          /* @__PURE__ */ d.jsx("span", { children: "Save remote" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: "settings-section git-setup-section", children: [
      /* @__PURE__ */ d.jsx("h3", { children: "Pull" }),
      /* @__PURE__ */ d.jsxs("div", { className: "git-setup-row", children: [
        /* @__PURE__ */ d.jsxs("button", { onClick: r, disabled: m || !(c != null && c.remote_configured), children: [
          /* @__PURE__ */ d.jsx(ut, { icon: m ? "mdi:progress-clock" : "mdi:source-pull" }),
          /* @__PURE__ */ d.jsx("span", { children: "Pull from origin" })
        ] }),
        /* @__PURE__ */ d.jsx("span", { className: "muted", children: c != null && c.branch ? `Current branch: ${c.branch}` : "Initialize and link a remote first." })
      ] })
    ] }),
    /* @__PURE__ */ d.jsx(aC, { result: p })
  ] });
}
function Oo({ label: a, value: i, detail: o, ok: r }) {
  return /* @__PURE__ */ d.jsxs("div", { className: `runtime-card ${r ? "success" : "warning"}`, children: [
    /* @__PURE__ */ d.jsx("span", { children: a }),
    /* @__PURE__ */ d.jsx("strong", { children: i }),
    /* @__PURE__ */ d.jsx("small", { title: o, children: o })
  ] });
}
function aC({ result: a }) {
  if (!a) return null;
  const i = iC(a);
  return /* @__PURE__ */ d.jsxs("section", { className: `git-setup-result ${a.ok ? "success" : "error"}`, children: [
    /* @__PURE__ */ d.jsx("strong", { children: a.ok ? "Last Git setup action completed" : "Last Git setup action failed" }),
    a.step ? /* @__PURE__ */ d.jsx("span", { children: a.step }) : null,
    i ? /* @__PURE__ */ d.jsx("pre", { children: i }) : null
  ] });
}
function iC(a) {
  return pn([
    a.stdout,
    a.stderr,
    ...(a.results || []).flatMap((i) => [i.stdout, i.stderr])
  ].filter(Boolean).join(`
`)).trim();
}
function lC({ settings: a, onSave: i }) {
  const o = a.defaults;
  return /* @__PURE__ */ d.jsxs("div", { className: "settings-run", children: [
    /* @__PURE__ */ d.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ d.jsx("h3", { children: "Run" }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings-grid", children: [
        /* @__PURE__ */ d.jsx(Ka, { label: "Default mode", value: o.mode, options: [["auto", "Auto"], ["manual", "Manual"]], onChange: (r) => Ia(a, i, { mode: r }) }),
        /* @__PURE__ */ d.jsx(Ka, { label: "Model preset", value: o.model_preset_id, options: a.model_presets.map((r) => [r.id, r.label]), onChange: (r) => Ia(a, i, { model_preset_id: r }) }),
        /* @__PURE__ */ d.jsx(Ka, { label: "Reasoning", value: o.reasoning_effort, options: hC(), onChange: (r) => Ia(a, i, { reasoning_effort: r }) }),
        /* @__PURE__ */ d.jsx(Ka, { label: "Verbosity", value: o.verbosity, options: mC(), onChange: (r) => Ia(a, i, { verbosity: r }) }),
        /* @__PURE__ */ d.jsx(Ka, { label: "Plan mode", value: o.plan_mode, options: pC(), onChange: (r) => Ia(a, i, { plan_mode: r }) })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ d.jsx("h3", { children: "Validation" }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings-grid", children: [
        /* @__PURE__ */ d.jsx(Ka, { label: "Validation depth", value: o.validation_depth, options: gC(), onChange: (r) => Ia(a, i, { validation_depth: r }) }),
        /* @__PURE__ */ d.jsxs("label", { className: "setting-field", children: [
          /* @__PURE__ */ d.jsx("span", { children: "Context budget" }),
          /* @__PURE__ */ d.jsx("input", { type: "number", min: 1e3, max: 2e5, step: 1e3, defaultValue: a.context_budget_chars, onBlur: (r) => i({ ...a, context_budget_chars: Number(r.currentTarget.value) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ d.jsx("h3", { children: "Safety" }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings-grid", children: [
        /* @__PURE__ */ d.jsx(Ka, { label: "Tool visibility", value: o.tool_visibility, options: [["compact", "Compact"], ["normal", "Normal"], ["verbose", "Verbose"]], onChange: (r) => Ia(a, i, { tool_visibility: r }) }),
        /* @__PURE__ */ d.jsx(Ka, { label: "Approvals", value: o.approval_mode, options: [["ask", "Ask"], ["auto_readonly", "Auto read-only"]], onChange: (r) => Ia(a, i, { approval_mode: r }) })
      ] })
    ] })
  ] });
}
function oC(a) {
  if (!a) return "Not reported";
  const i = Number(a);
  return Number.isFinite(i) && i > 0 ? ir(i) : String(a);
}
function yx(a) {
  const i = Number(a);
  return Number.isFinite(i) ? `${Math.round(i)}% remaining` : "Not reported";
}
function rC({ settings: a, onSave: i }) {
  const [o, r] = I.useState(""), [c, f] = I.useState(""), m = () => {
    const p = o.trim(), g = c.trim();
    if (!p || !g) return;
    const x = Px(a, { id: tb(p), label: p, model: g });
    i(x), r(""), f("");
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "settings-models", children: [
    a.model_presets.map((p) => /* @__PURE__ */ d.jsxs("div", { className: "settings-model-row", children: [
      /* @__PURE__ */ d.jsx("input", { "aria-label": `${p.label} label`, defaultValue: p.label, disabled: Sl.has(p.id), onBlur: (g) => wx(a, i, p, { label: g.currentTarget.value }) }),
      /* @__PURE__ */ d.jsx("input", { "aria-label": `${p.label} model`, defaultValue: p.model || "", disabled: Sl.has(p.id), placeholder: "Model id", onBlur: (g) => wx(a, i, p, { model: g.currentTarget.value || null }) }),
      /* @__PURE__ */ d.jsx("button", { className: "icon-button danger", disabled: Sl.has(p.id), onClick: () => i(k1(a, p.id)), title: "Delete model preset", "aria-label": "Delete model preset", children: /* @__PURE__ */ d.jsx(ut, { icon: "mdi:trash-can-outline" }) })
    ] }, p.id)),
    /* @__PURE__ */ d.jsxs("div", { className: "settings-model-row add", children: [
      /* @__PURE__ */ d.jsx("input", { value: o, onChange: (p) => r(p.currentTarget.value), placeholder: "Preset label", "aria-label": "New preset label" }),
      /* @__PURE__ */ d.jsx("input", { value: c, onChange: (p) => f(p.currentTarget.value), placeholder: "Model id", "aria-label": "New model id" }),
      /* @__PURE__ */ d.jsxs("button", { onClick: m, disabled: !o.trim() || !c.trim(), children: [
        /* @__PURE__ */ d.jsx(ut, { icon: "mdi:plus" }),
        /* @__PURE__ */ d.jsx("span", { children: "Add" })
      ] })
    ] })
  ] });
}
function sC() {
  return /* @__PURE__ */ d.jsxs("div", { className: "settings-debug", children: [
    /* @__PURE__ */ d.jsx(dC, {}),
    /* @__PURE__ */ d.jsx(cC, {})
  ] });
}
function uC({ onRefresh: a, onClear: i }) {
  return /* @__PURE__ */ d.jsx("div", { className: "settings-bridge-log", children: /* @__PURE__ */ d.jsx(fC, { onRefresh: a, onClear: i }) });
}
function cC() {
  const a = pt((o) => o.status), i = {
    ...a,
    sessions: Array.isArray(a.sessions) ? a.sessions.filter((o) => !o.archived) : a.sessions
  };
  return /* @__PURE__ */ d.jsx("pre", { className: "result", children: JSON.stringify(i, null, 2) });
}
function dC() {
  var r, c;
  const i = pt((f) => f.status).runtime || {}, o = [
    { label: "Runner", value: i.runner_type || "unknown", detail: i.codex_exec_available === !1 ? "Codex exec unavailable" : "Codex exec ready", tone: i.codex_exec_available === !1 ? "error" : "" },
    { label: "Bridge", value: i.bridge_available === !1 ? "Unavailable" : i.bridge_available ? "Available" : "Unknown", detail: i.bridge_url || "No bridge URL", tone: i.bridge_available === !1 ? "error" : i.bridge_available ? "success" : "" },
    { label: "Uptime", value: V1(i.bridge_uptime_seconds) || "Not reported", detail: i.bridge_started_at ? `Started ${ir(i.bridge_started_at)}` : ((r = i.bridge_health) == null ? void 0 : r.error) || "No bridge health data", tone: (c = i.bridge_health) != null && c.error ? "warning" : "" },
    { label: "Codex", value: i.codex_version || "No version", detail: i.codex_path || i.codex_command || "No command", tone: i.codex_path ? "" : "warning" },
    { label: "Workspace", value: i.workspace_exists === !1 ? "Missing" : i.workspace_exists ? "Ready" : "Unknown", detail: i.workspace_path || "No workspace path", tone: i.workspace_exists === !1 ? "error" : "" }
  ];
  return /* @__PURE__ */ d.jsx("div", { className: "runtime-cards", children: o.map((f) => /* @__PURE__ */ d.jsxs("div", { className: `runtime-card ${f.tone || ""}`, children: [
    /* @__PURE__ */ d.jsx("span", { children: f.label }),
    /* @__PURE__ */ d.jsx("strong", { children: String(f.value) }),
    /* @__PURE__ */ d.jsx("small", { children: String(f.detail) })
  ] }, f.label)) });
}
function fC({ onRefresh: a, onClear: i }) {
  const o = pt((p) => p.bridgeLog), r = pt((p) => p.bridgeLogLoading), c = I.useRef(null), f = pn((o == null ? void 0 : o.lines) || "No bridge log output.");
  if (I.useLayoutEffect(() => {
    const p = c.current;
    if (!p || !(o != null && o.exists) || o != null && o.error) return;
    const g = () => {
      p.scrollTop = p.scrollHeight;
    };
    g();
    const x = window.requestAnimationFrame(g);
    return () => window.cancelAnimationFrame(x);
  }, [o == null ? void 0 : o.exists, o == null ? void 0 : o.error, f]), r && !o) return /* @__PURE__ */ d.jsx("div", { className: "loading-state", children: "Loading bridge log..." });
  if (o != null && o.error) return /* @__PURE__ */ d.jsx("pre", { className: "result error", children: o.error });
  if (!(o != null && o.exists)) return /* @__PURE__ */ d.jsxs("pre", { className: "result", children: [
    "Bridge log not found at ",
    (o == null ? void 0 : o.path) || "/config/ha_codex_bridge.log",
    "."
  ] });
  const m = [o.path, `${o.line_count || 0} lines`, o.truncated ? "tail only" : ""].filter(Boolean).join(" - ");
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("div", { className: "modal-toolbar", children: [
      /* @__PURE__ */ d.jsx("span", { children: m }),
      /* @__PURE__ */ d.jsxs("div", { className: "modal-toolbar-actions", children: [
        /* @__PURE__ */ d.jsxs("button", { className: "ghost bridge-log-refresh", onClick: a, disabled: r, children: [
          /* @__PURE__ */ d.jsx(ut, { icon: "mdi:refresh" }),
          /* @__PURE__ */ d.jsx("span", { children: r ? "Refreshing..." : "Refresh" })
        ] }),
        /* @__PURE__ */ d.jsxs("button", { className: "ghost bridge-log-clear", onClick: i, disabled: r, children: [
          /* @__PURE__ */ d.jsx(ut, { icon: "mdi:broom" }),
          /* @__PURE__ */ d.jsx("span", { children: "Clear Log" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("pre", { className: "result bridge-log-result", ref: c, children: f })
  ] });
}
function Ka({ label: a, value: i, options: o, onChange: r }) {
  return /* @__PURE__ */ d.jsxs("label", { className: "setting-field", children: [
    /* @__PURE__ */ d.jsx("span", { children: a }),
    /* @__PURE__ */ d.jsx("select", { value: i, onChange: (c) => r(c.currentTarget.value), children: o.map(([c, f]) => /* @__PURE__ */ d.jsx("option", { value: c, children: f }, c)) })
  ] });
}
function Ia(a, i, o) {
  i({ ...a, defaults: { ...a.defaults, ...o } });
}
function wx(a, i, o, r) {
  Sl.has(o.id) || i(Px(a, { ...o, ...r }));
}
function hC() {
  return [["auto", "Auto"], ["minimal", "Minimal"], ["low", "Low"], ["medium", "Medium"], ["high", "High"], ["xhigh", "XHigh"]];
}
function mC() {
  return [["auto", "Auto"], ["low", "Low"], ["medium", "Medium"], ["high", "High"]];
}
function pC() {
  return [["auto", "Auto"], ["always", "Always"], ["off", "Off"]];
}
function gC() {
  return [["auto", "Auto"], ["none", "None"], ["full", "Full"]];
}
function xC() {
  const a = pt((i) => i.toasts);
  return /* @__PURE__ */ d.jsx("div", { className: "toast-stack", "aria-live": "polite", children: a.map((i) => /* @__PURE__ */ d.jsxs("div", { className: `toast ${i.tone}${i.entering ? " entering" : ""}${i.exiting ? " exiting" : ""}`, children: [
    /* @__PURE__ */ d.jsx(ut, { icon: i.tone === "error" ? "mdi:alert-circle" : i.tone === "success" ? "mdi:check-circle" : "mdi:information" }),
    /* @__PURE__ */ d.jsx("span", { children: i.message })
  ] }, i.id)) });
}
let cf = [], Sx = "";
const bC = [
  "ha-sidebar",
  "home-assistant",
  "home-assistant-main",
  "ha-drawer",
  "ha-panel-lovelace",
  "partial-panel-resolver"
], vC = 50;
function yC() {
  const a = Object.values(qt.getState().chatsById).filter((f) => !f.archived), i = a.filter((f) => ni(f).length > 0 || Qo(f) || Yo(f)).length;
  if (i > 0) return { count: i, tone: "action", label: `${i} chats waiting for action` };
  const o = a.filter((f) => f.status === "error").length;
  if (o > 0) return { count: o, tone: "error", label: `${o} chats with errors` };
  const r = a.filter((f) => ["planning", "running", "working"].includes(f.status || "")).length;
  if (r > 0) return { count: r, tone: "working", label: `${r} chats working` };
  const c = a.filter((f) => Qd(f)).length;
  return c > 0 ? { count: c, tone: "restart", label: `${c} chats waiting for restart` } : null;
}
function wC() {
  const a = performance.now(), i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), r = (f) => {
    var m;
    !f || o.has(f) || (o.add(f), (m = f.querySelectorAll) == null || m.call(f, bC.join(",")).forEach((p) => {
      p.localName === "ha-sidebar" && p.shadowRoot && i.add(p.shadowRoot), p.shadowRoot && r(p.shadowRoot);
    }));
  };
  r(document);
  const c = performance.now() - a;
  return c > vC && console.debug(`[ha_codex] sidebar badge root lookup took ${c.toFixed(1)}ms`), [...i];
}
function SC(a) {
  return a ? `${a.tone}:${a.count}:${a.label}` : "none";
}
function CC(a) {
  if (a.querySelector("style[data-ha-codex-sidebar-badge]")) return;
  const i = document.createElement("style");
  i.dataset.haCodexSidebarBadge = "true", i.textContent = `
    #sidebar-panel-ha-codex { position: relative; }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge[slot="start"] {
      position: absolute;
      top: var(--ha-space-1, 4px);
      left: 26px;
      border-radius: var(--ha-border-radius-md, 6px);
      font-size: 0.65em;
      line-height: var(--ha-line-height-expanded, 1.6);
      padding: 0 var(--ha-space-1, 4px);
    }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.action { background: #f97316; color: #111827; }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.error { background: #ef4444; color: #ffffff; }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.working { background: #facc15; color: #111827; }
    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.restart { background: #38bdf8; color: #0f172a; }
  `, a.appendChild(i);
}
function _C(a, i) {
  const o = a.querySelector("#sidebar-panel-ha-codex");
  if (!o) return;
  CC(a);
  const r = [...o.querySelectorAll(".ha-codex-sidebar-badge")];
  if (!i) {
    r.forEach((c) => c.remove());
    return;
  }
  ["start", "end"].forEach((c) => {
    let f = r.find((m) => m.slot === c);
    f || (f = document.createElement("span"), f.slot = c, o.appendChild(f)), f.className = `badge ha-codex-sidebar-badge ${i.tone}`, f.textContent = String(i.count), f.setAttribute("aria-label", i.label), f.title = i.label;
  });
}
function Cx(a = !1) {
  const i = yC(), o = SC(i);
  !a && o === Sx || (Sx = o, cf.forEach((r) => _C(r, i)));
}
function TC() {
  return cf.some((a) => a.host.isConnected && a.querySelector("#sidebar-panel-ha-codex"));
}
function jC() {
  I.useEffect(() => {
    let a = null, i = null;
    const o = () => {
      a === null && (a = requestAnimationFrame(() => {
        a = null, Cx();
      }));
    }, r = () => {
      i === null && (i = requestAnimationFrame(() => {
        i = null, cf = wC(), Cx(!0);
      }));
    }, c = qt.subscribe(o), f = new MutationObserver(() => {
      if (TC()) {
        o();
        return;
      }
      r();
    });
    return f.observe(document.body, { childList: !0, subtree: !0 }), r(), o(), () => {
      c(), f.disconnect(), a !== null && cancelAnimationFrame(a), i !== null && cancelAnimationFrame(i);
    };
  }, []);
}
const zC = new n1(), AC = 200;
function EC({ hass: a, panel: i }) {
  return /* @__PURE__ */ d.jsx(i1, { client: zC, children: /* @__PURE__ */ d.jsx(RC, { hass: a, panel: i }) });
}
function RC({ hass: a, panel: i }) {
  const o = I.useMemo(() => new l1(() => a), [a]), r = I1(o), c = I.useRef(r), f = pt((_) => _.gitPanelOpen), m = pt((_) => pa(_.gitSetupStatus)), p = pt((_) => _.showStatusDebug), g = qt((_) => _.setShowArchived), x = qt((_) => _.showArchived), S = qt((_) => _.setActiveId), w = qt((_) => _.activeId), C = pt((_) => _.setGitPanelOpen), A = pt((_) => _.setShowStatusDebug), N = pt((_) => _.setSettingsTab), B = pt((_) => _.showToast);
  jC(), I.useEffect(() => {
    c.current = r;
  }, [r]), I.useEffect(() => (Ug.configure(a, i), () => Ug.cleanup()), [a, i]), I.useEffect(() => {
    a && r.loadInitial().catch((_) => B(Pt(_), "error"));
  }, [a, r, B]), I.useEffect(() => {
    if (!w) return;
    const _ = qt.getState().chatsById[w], R = Math.max(
      0,
      ...(qt.getState().messagesByChatId[w] || []).map((y) => Number(y.id)).filter((y) => Number.isFinite(y))
    ), L = Number((_ == null ? void 0 : _.last_message_id) || 0);
    if (!L || L <= R) return;
    let q = !1;
    return o.messagesAfter(w, R, R ? void 0 : AC).then((y) => {
      q || qt.getState().appendMessages(w, y.messages || [], !1);
    }).catch((y) => B(Pt(y), "error")), () => {
      q = !0;
    };
  }, [w, o, B]), I.useEffect(() => {
    const _ = window.setInterval(() => {
      c.current.maybeRunScheduledRestart();
    }, 1e3);
    return () => window.clearInterval(_);
  }, []), I.useEffect(() => {
    const _ = (R) => {
      R.key === "Escape" && pt.getState().showStatusDebug && A(!1);
    };
    return window.addEventListener("keydown", _), () => window.removeEventListener("keydown", _);
  }, [A]);
  const z = (_) => (...R) => {
    Promise.resolve(_(...R)).catch((L) => B(Pt(L), "error"));
  };
  return /* @__PURE__ */ d.jsxs("main", { className: `shell ${f && m ? "git-open" : "git-closed"}`, children: [
    /* @__PURE__ */ d.jsx(
      _S,
      {
        onNew: z(r.createSession),
        onSelect: S,
        onArchive: z(r.archiveSession),
        onToggleArchived: () => g(!x),
        onValidate: z(() => r.runValidation(w)),
        onRestartNow: z((_, R) => r.respondApproval(_, R, !0, "Restarting Home Assistant")),
        onRestartSchedule: r.scheduleRestartAfterChats,
        onRestartScheduleCancel: r.cancelScheduledRestart,
        onDebug: z(async () => {
          await Promise.all([r.loadStatus(), r.loadSettings()]), N("run"), A(!0);
        })
      }
    ),
    /* @__PURE__ */ d.jsx("section", { className: "chat", children: /* @__PURE__ */ d.jsx(
      Q2,
      {
        api: o,
        hass: a,
        onNew: z(r.createSession),
        onGitToggle: z(r.toggleGitPanel),
        onRenameStart: r.startRename,
        onRenameSave: z(r.saveRename),
        onArchive: z(r.archiveSession),
        onCancel: z(r.cancelSession),
        onRetry: z(r.retryContinueSession),
        onSend: z(r.sendPrompt),
        onAnswer: z(r.answerQuestion),
        onApprove: z(r.respondApproval),
        onRunPlan: z(r.respondRunPlan),
        onRollback: z(r.rollbackRun),
        onCopy: z(async (_) => {
          await Id(_), B("Copied to clipboard", "success");
        }),
        onQueueEdit: r.editQueuedMessage,
        onQueueSteer: z(r.steerQueuedMessage),
        onQueueClear: r.clearQueuedMessage,
        onValidationReload: z(r.reloadValidationDomains),
        onRunSettingsChange: z(r.updateSessionRunSettings)
      }
    ) }),
    m ? /* @__PURE__ */ d.jsx(
      OS,
      {
        open: f,
        onClose: () => C(!1),
        onRefresh: z(() => r.loadGitChanges(!0)),
        onLoadMore: r.showMoreGitFiles,
        onToggleFile: z(r.toggleGitFileDiff),
        onCommit: z(r.commitAndPush),
        onDiscard: z(r.discardSelectedGitFiles)
      }
    ) : null,
    p ? /* @__PURE__ */ d.jsx(
      W2,
      {
        onClose: () => A(!1),
        onTab: z(async (_) => {
          N(_), _ === "bridge-log" && !pt.getState().bridgeLog && await r.loadBridgeLog(), _ === "account" && await r.loadAccountStatus(), _ === "git" && await r.loadGitSetupStatus();
        }),
        onSettingsSave: z(r.updateSettings),
        onBridgeRestart: z(r.startOrRestartBridge),
        onCoreRestart: z(r.restartHomeAssistant),
        onBridgeLogRefresh: z(r.loadBridgeLog),
        onBridgeLogClear: z(r.clearBridgeLog),
        onDeviceLogin: z(r.startDeviceLogin),
        onDeviceLoginCancel: z(r.cancelDeviceLogin),
        onAccountLogout: z(r.logoutAccount),
        onGitSetupRefresh: z(async () => {
          await r.loadGitSetupStatus();
        }),
        onGitSetupGenerateKey: z(r.generateGitSetupKey),
        onGitSetupRemoteSave: z(r.saveGitSetupRemote),
        onGitSetupPull: z(r.pullGitSetupRemote)
      }
    ) : null,
    /* @__PURE__ */ d.jsx(xC, {})
  ] });
}
const NC = ".ha-codex-root{height:100%;min-height:100%;display:block}.ha-codex-root{--tw-bg: #0b1120;--tw-panel: #111827;--tw-panel-soft: #172033;--tw-panel-strong: #1f2937;--tw-border: #2d3748;--tw-muted: #94a3b8;--tw-text: #e5edf7;--tw-text-strong: #f8fafc;--tw-primary: #38bdf8;--tw-primary-soft: #0c344f;--tw-accent: #2dd4bf;--tw-accent-soft: #123a3a;--tw-warning: #f59e0b;--tw-danger: #ef4444;--tw-danger-soft: #3b1118;--tw-success: #22c55e;--tw-action-soft: #123044;--tw-shadow: 0 18px 50px rgba(0, 0, 0, .38);--tw-ring: 0 0 0 3px rgba(56, 189, 248, .22);--tw-button-shadow: 0 10px 24px rgba(2, 6, 23, .28);--tw-button-primary-shadow: 0 12px 28px rgba(56, 189, 248, .26);--tw-button-danger-shadow: 0 12px 28px rgba(239, 68, 68, .24);display:block;height:100%;min-height:100%;color:var(--tw-text);background:var(--tw-bg);font-family:var(--ha-font-family-body, system-ui, sans-serif)}*{box-sizing:border-box}.shell{display:grid;grid-template-columns:292px minmax(0,1fr) 372px;height:100%;min-height:0;position:relative;background:radial-gradient(circle at 24% 0%,rgba(56,189,248,.12),transparent 30%),linear-gradient(180deg,#0f172a 0%,var(--tw-bg) 100%);overflow:hidden;transition:grid-template-columns .22s cubic-bezier(.2,0,0,1)}.shell.git-closed{grid-template-columns:292px minmax(0,1fr) 0}.rail,.drawer{background:#111827f0;border-right:1px solid var(--tw-border);min-width:0;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.rail{display:grid;grid-template-rows:auto minmax(0,1fr) auto;min-height:0;overflow:hidden}.drawer{border-left:1px solid var(--tw-border);border-right:0;display:grid;grid-template-rows:auto minmax(0,1fr) auto;min-height:0;overflow:hidden;transform:translate(0);transition:opacity .18s cubic-bezier(.2,0,0,1),transform .22s cubic-bezier(.2,0,0,1),visibility 0ms linear 0ms;width:372px;will-change:transform}.shell.git-closed .drawer{opacity:0;pointer-events:none;transform:translate(100%);transition:opacity .16s cubic-bezier(.2,0,0,1),transform .2s cubic-bezier(.4,0,1,1),visibility 0ms linear .2s;visibility:hidden}.brand{align-items:center;display:flex;justify-content:space-between;padding:18px;position:sticky;top:0;z-index:1;background:inherit}.brand button{border-radius:999px;height:34px;min-height:34px;padding:0;width:34px}.brand strong{display:block;font-size:18px;line-height:1.2}.brand span,.meta,.muted,.chat-header p{color:var(--tw-muted);font-size:12px}.sessions{align-content:start;display:block;gap:8px;grid-auto-rows:66px;overflow:auto;padding:0 12px 18px}.sessions-virtual-list{height:100%}.rail-footer{background:inherit;border-top:1px solid var(--tw-border);display:grid;gap:10px;padding:12px}.usage-summary{display:grid;gap:8px;grid-template-columns:1fr 1fr}.usage-summary div{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:4px;padding:7px 9px}.usage-summary span{color:var(--tw-muted);font-size:11px}.usage-main{align-items:center;display:flex;gap:6px;justify-content:space-between;min-width:0}.usage-summary strong{color:var(--tw-text-strong);font-size:14px;line-height:1.2}.usage-summary small{color:var(--tw-muted);font-size:10px;line-height:1.2;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rail-footer-actions{display:grid;gap:8px;grid-template-columns:minmax(0,1fr) 34px 34px;position:relative}.rail-footer-actions.restart-pending{grid-template-columns:minmax(0,1fr) 34px 34px 34px}.archive-toggle{background:transparent;border-color:var(--tw-border);color:var(--tw-text);display:grid;grid-template-columns:22px minmax(0,1fr) auto;justify-content:initial;text-align:left;width:100%}.archive-toggle.active{background:var(--tw-primary-soft);border-color:#38bdf86b}.archive-toggle:hover{background:var(--tw-panel-soft);border-color:#38bdf86b;color:var(--tw-text-strong);filter:none}.archive-toggle.active:hover{background:#0c344fd6;border-color:#38bdf89e}.archive-toggle ha-icon{--mdc-icon-size: 18px}.restart-action-wrap{position:static}.restart-action{height:34px;min-height:34px;padding:0;width:34px}.restart-action.pending{background:#f59e0b29;border-color:#f59e0b94;color:var(--tw-warning)}.restart-action.scheduled{background:var(--tw-primary-soft);border-color:#38bdf89e;color:var(--tw-primary)}.restart-action:hover{background:var(--tw-panel-soft);border-color:currentColor;filter:none}.restart-action ha-icon{--mdc-icon-size: 18px}.restart-action.scheduled ha-icon{animation:restart-spin 1.1s linear infinite}.restart-action-menu{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;bottom:calc(100% + 8px);box-shadow:var(--tw-shadow);display:grid;gap:3px;left:50%;padding:5px;position:absolute;right:auto;transform:translate(-50%);width:min(260px,100%);z-index:15}.restart-action-menu button{background:transparent;border-color:transparent;color:var(--tw-text);justify-content:flex-start;min-height:30px;padding:6px 8px;text-align:left;width:100%}.restart-action-menu button:hover{background:var(--tw-primary-soft);border-color:#38bdf859;color:var(--tw-text-strong)}@keyframes restart-spin{to{transform:rotate(-360deg)}}.archive-toggle span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.archive-toggle b{background:var(--tw-panel-soft);border-radius:999px;color:var(--tw-text);min-width:24px;padding:1px 7px;text-align:center}.validation-status-button{background:transparent;border-color:var(--tw-border);color:var(--tw-muted);height:34px;min-height:34px;padding:0;position:relative;width:34px}.validation-status-button:hover{background:var(--tw-panel-soft);border-color:currentColor}.validation-status-button[aria-disabled=true]{cursor:wait}.validation-status-button.success{color:var(--tw-success)}.validation-status-button.error{color:var(--tw-danger)}.validation-status-button.warning,.validation-status-button.running{color:var(--tw-warning)}.validation-status-button ha-icon{--mdc-icon-size: 18px}.validation-tooltip{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;bottom:calc(100% + 8px);box-shadow:var(--tw-shadow);color:var(--tw-text);display:none;gap:6px;right:-42px;max-height:min(360px,60vh);overflow:auto;padding:10px 12px;pointer-events:none;position:absolute;text-align:left;width:min(260px,calc(100vw - 32px));white-space:pre-wrap;z-index:12}.validation-tooltip strong{color:var(--tw-text-strong);display:block;font-size:12px;line-height:18px;margin-bottom:4px}.validation-tooltip span{display:block;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px}.validation-status-button:hover .validation-tooltip,.validation-status-button:focus-visible .validation-tooltip{display:block}.session-row{align-items:center;border:1px solid transparent;border-radius:8px;contain:layout paint;display:grid;grid-template-columns:minmax(0,1fr) 34px;gap:4px;height:66px;margin-bottom:8px;min-height:66px;transition:transform .18s ease,background-color .14s ease,border-color .14s ease;will-change:transform}.session{background:transparent;border:0;border-radius:8px;color:inherit;cursor:pointer;display:block;height:100%;min-width:0;padding:11px 10px;text-align:left}.session-row.active,.session-row:hover{background:var(--tw-panel-soft);border-color:var(--tw-border)}.session-row.active{box-shadow:inset 3px 0 0 var(--tw-primary)}.session-row.switching-1{animation:session-switch-1 .32s cubic-bezier(.2,0,0,1)}.session-row.switching-2{animation:session-switch-2 .32s cubic-bezier(.2,0,0,1)}@keyframes session-switch-1{0%{opacity:.72;transform:translateY(10px) scale(.985)}58%{opacity:1;transform:translateY(-2px) scale(1)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes session-switch-2{0%{opacity:.72;transform:translateY(10px) scale(.985)}58%{opacity:1;transform:translateY(-2px) scale(1)}to{opacity:1;transform:translateY(0) scale(1)}}@media(prefers-reduced-motion:reduce){.session-row.switching-1,.session-row.switching-2{animation:none}}.session-archive{opacity:.68}.session-archive:hover{color:var(--tw-danger);opacity:1}.session-archive[data-action=unarchive]:hover{color:var(--tw-primary)}.session-text{align-items:flex-start;display:grid;gap:4px;justify-items:start;min-width:0;width:100%}.title-line{align-items:center;display:flex;gap:8px;min-width:0;width:100%}.title{flex:1 1 auto;max-width:100%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.meta{align-items:center;display:flex;gap:8px;justify-content:flex-start;min-width:0;text-align:left}.status-dot{border-radius:999px;display:inline-block;flex:0 0 8px;height:8px;width:8px}.status-dot-error{background:var(--tw-danger)}.status-dot-working{background:#facc15}.status-dot-approval{background:var(--tw-warning)}.status-dot-restart{background:var(--tw-primary)}.status-dot-idle{background:var(--tw-success)}.chat{display:grid;grid-template-rows:auto minmax(0,1fr) auto;min-width:0;min-height:0;background:transparent}.chat-header{align-items:center;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);background:#111827e0;border-bottom:1px solid var(--tw-border);display:flex;gap:16px;justify-content:space-between;padding:16px 22px}h1{font-size:20px;line-height:1.25;margin:0}.title-area{flex:1 1 auto;min-width:0}.title-row{align-items:center;display:flex;gap:6px;min-width:0}.title-row h1{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.run-controls{align-items:center;display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.composer .run-controls{margin-top:0}.run-controls select,.run-controls-extra select,.run-select-button,.setting-field select,.setting-field input,.settings-model-row input{background:#0f172ac2;border:1px solid var(--tw-border);border-radius:7px;color:var(--tw-text);min-height:32px;min-width:0;padding:5px 8px}.run-controls>select{max-width:180px}.run-controls>.run-select{max-width:180px}.run-controls>button{gap:6px;min-height:32px;padding:5px 9px}.run-controls>button.active{background:var(--tw-primary-soft);border-color:#38bdf87a;color:var(--tw-text-strong)}.run-controls-extra{align-items:center;display:flex;flex-wrap:wrap;gap:6px}.run-controls-extra label{align-items:center;color:var(--tw-muted);display:inline-flex;font-size:11px;gap:5px}.run-controls-extra select{max-width:112px;min-height:30px}.run-controls-extra .run-select{max-width:112px}.run-select{display:inline-flex;min-width:0;position:relative}.run-select-button{align-items:center;display:inline-flex;gap:6px;justify-content:space-between;min-height:32px;min-width:0;padding:5px 8px;width:100%}.run-controls-extra .run-select-button{min-height:30px}.run-select-button span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.run-select-button ha-icon{--mdc-icon-size: 16px;flex:0 0 auto}.run-select-menu{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;bottom:calc(100% + 6px);box-shadow:var(--tw-shadow);display:grid;gap:2px;left:0;max-height:min(260px,45vh);min-width:100%;overflow:auto;padding:5px;position:absolute;width:max-content;z-index:16}.run-select-menu button{background:transparent;border-color:transparent;color:var(--tw-text);justify-content:flex-start;min-height:28px;padding:5px 8px;text-align:left;white-space:nowrap}.run-select-menu button:hover,.run-select-menu button.selected{background:var(--tw-primary-soft);border-color:#38bdf859;color:var(--tw-text-strong)}.title-input{background:var(--tw-panel);border:1px solid var(--tw-primary);border-radius:8px;color:var(--tw-text-strong);font:inherit;font-size:20px;line-height:1.25;min-height:34px;min-width:min(320px,60vw);padding:4px 8px}.header-actions,.row,.tabs{display:flex;gap:8px}.header-actions{align-items:center;flex:0 0 auto;margin-left:auto}.git-toggle{background:transparent;border-color:var(--tw-border);color:var(--tw-text);gap:7px;min-width:0}.git-toggle.active{background:var(--tw-primary-soft);border-color:#38bdf86b}.git-toggle:hover{background:var(--tw-panel-soft);border-color:#38bdf86b;color:var(--tw-text-strong);filter:none}.git-toggle ha-icon{--mdc-icon-size: 18px}.git-toggle b{background:var(--tw-danger);border-radius:999px;color:#fff;font-size:11px;line-height:18px;min-width:18px;padding:0 6px}.transcript{--message-side-margin: clamp(20px, 8vw, 140px);min-height:0;overflow:hidden;padding:24px;position:relative;scroll-behavior:smooth}.scroll-to-bottom{background:var(--tw-panel-strong);border-color:#38bdf86b;bottom:16px;box-shadow:0 12px 30px #00000057;color:var(--tw-text-strong);height:18px;left:50%;min-height:18px;padding:0;position:absolute;transform:translate(-50%);width:24px;z-index:4}.scroll-to-bottom:hover{background:var(--tw-primary-soft);border-color:var(--tw-primary);filter:none}.scroll-to-bottom svg{display:block;height:16px;width:16px}.show-older{background:var(--tw-panel-soft);border-color:var(--tw-border);color:var(--tw-text);display:flex;gap:8px;justify-content:center;margin:0 auto 18px;max-width:420px;width:100%}.show-older span{color:var(--tw-muted)}.message{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;box-shadow:0 10px 30px #0000003d;box-sizing:border-box;color:var(--tw-text);flex:0 1 920px;margin:0;max-width:920px;padding:14px 42px 14px 14px;position:relative;width:100%}.message-row{box-sizing:border-box;contain:layout paint;display:flex;margin:0 0 14px;width:100%}.message-row-center{justify-content:center}.message-row-user{justify-content:flex-end;padding-left:var(--message-side-margin)}.message-row-codex{justify-content:flex-start;padding-right:var(--message-side-margin)}.message.new-message{opacity:0;transform:translateY(18px) scale(.985);transform-origin:50% 0;will-change:opacity,transform,box-shadow}.message.new-message.enter-active{box-shadow:0 14px 38px #0000004d,0 0 0 1px #38bdf82e;opacity:1;transform:translateY(0) scale(1);transition:opacity .42s cubic-bezier(.2,.8,.2,1),transform .42s cubic-bezier(.2,.8,.2,1),box-shadow .62s ease}.message-row-user .message{padding-left:42px;padding-right:14px}.message-style-user{background:var(--tw-primary-soft);border-color:#38bdf857}.message-style-command{background:#080d18f0;border-color:#4755696b;box-shadow:0 6px 18px #00000038;color:#cbd5e1;flex-basis:760px;font-size:12px;max-width:760px;padding:8px 10px}.command-line{align-items:flex-start;display:flex;gap:8px;min-width:0}.command-text{color:#cbd5e1;flex:1 1 auto;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:18px;min-width:0;overflow-wrap:anywhere;white-space:pre-wrap}.message-style-command .message-time{flex:0 0 auto;line-height:18px;margin-left:0}.message-style-command .copy-button{flex:0 0 auto;height:24px;min-height:24px;position:static;width:24px}.message-style-command .copy-button ha-icon{--mdc-icon-size: 14px}.message-style-event,.message-style-system{background:var(--tw-accent-soft);border-color:#2dd4bf47}.message-style-action{background:var(--tw-action-soft);border-color:#7dd3fc4d}.message-style-error{background:var(--tw-danger-soft);border-color:#f8717157;padding-bottom:50px}.role{align-items:center;color:var(--tw-muted);display:flex;gap:6px;font-size:11px;font-weight:700;letter-spacing:0;margin-bottom:8px;text-transform:uppercase}.role ha-icon{--mdc-icon-size: 15px}.role b{background:#2dd4bf24;border-radius:999px;color:var(--tw-accent);font-size:10px;padding:2px 7px;text-transform:none}.message-time{color:var(--tw-muted);font-weight:600;margin-left:auto;text-transform:none}.message-row-user .role{justify-content:flex-end}.message-row-user .message-time{margin-left:0;margin-right:auto;order:-1}.markdown-body{line-height:1.5;overflow-wrap:anywhere}.markdown-body>:first-child{margin-top:0}.markdown-body>:last-child{margin-bottom:0}.message-context-attachments,.message-builder-summary{align-items:center;display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.message-builder-chip{align-items:center;background:#0f172a6b;border:1px solid rgba(45,212,191,.22);border-radius:8px;color:var(--tw-text);display:inline-flex;font-size:12px;gap:5px;line-height:18px;max-width:260px;min-width:0;padding:4px 7px}.message-builder-chip.strong{border-color:#38bdf857;color:var(--tw-text-strong);font-weight:700}.message-builder-chip ha-icon{--mdc-icon-size: 15px;color:var(--tw-primary);flex:0 0 auto}.message-builder-chip b{color:var(--tw-muted);flex:0 0 auto;font-weight:700}.message-builder-chip span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.message-context-chip{align-items:center;background:#0f172a6b;border:1px solid rgba(56,189,248,.24);border-radius:8px;color:var(--tw-text);display:inline-flex;font-size:12px;gap:5px;line-height:18px;max-width:220px;min-width:0;padding:4px 7px}.message-context-chip ha-icon{--mdc-icon-size: 15px;color:var(--tw-primary);flex:0 0 auto}.message-context-chip span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.validation-card{background:#0f172a9e;border:1px solid var(--tw-border);border-left:4px solid var(--tw-border);border-radius:8px;display:grid;gap:8px;margin-top:10px;min-width:0;padding:10px}.validation-card.success{border-left-color:var(--tw-success)}.validation-card.warning{border-left-color:#f59e0b}.validation-card.error{background:var(--tw-danger-soft);border-left-color:var(--tw-danger)}.validation-card.restart{border-left-color:var(--tw-primary)}.validation-card header{align-items:center;display:grid;gap:8px;grid-template-columns:22px minmax(0,1fr)}.validation-card header ha-icon{--mdc-icon-size: 20px;color:var(--tw-primary)}.validation-card.error header ha-icon{color:var(--tw-danger)}.validation-card header strong,.validation-card header span{display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.validation-card header strong{color:var(--tw-text-strong);font-size:13px;line-height:18px}.validation-card header span,.validation-meta span{color:var(--tw-muted);font-size:12px;line-height:16px}.validation-meta{display:grid;gap:5px;min-width:0}.validation-meta span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.validation-meta b,.validation-files b{color:var(--tw-text-strong);display:inline-block;font-size:11px;margin-right:6px;text-transform:uppercase}.validation-domains,.validation-actions{display:flex;flex-wrap:wrap;gap:6px}.validation-domains span{background:var(--tw-primary-soft);border:1px solid rgba(56,189,248,.28);border-radius:999px;color:var(--tw-text);font-size:11px;font-weight:700;line-height:22px;max-width:180px;overflow:hidden;padding:0 8px;text-overflow:ellipsis;white-space:nowrap}.validation-files{color:var(--tw-muted);display:grid;font-size:12px;gap:4px;line-height:16px;list-style:none;margin:0;padding:0}.validation-files li{min-width:0;overflow-wrap:anywhere}.validation-actions button{gap:6px;min-height:30px}.validation-output{border-top:1px solid var(--tw-border);padding-top:6px}.validation-output summary{color:var(--tw-muted);cursor:pointer;font-size:12px;font-weight:700}.validation-output pre{background:#050914;border-radius:6px;color:var(--tw-text);font-size:11px;line-height:16px;margin:7px 0 0;max-height:260px;overflow:auto;padding:8px;white-space:pre-wrap}.validation-card.compact .validation-meta,.validation-card.compact .validation-domains,.validation-card.compact .validation-actions{gap:4px}.markdown-body p{margin:0 0 10px}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{color:var(--tw-text-strong);font-size:14px;line-height:20px;margin:12px 0 6px}.markdown-body ul,.markdown-body ol{margin:0 0 10px;padding-left:22px}.markdown-body li{margin:3px 0}.markdown-body blockquote{border-left:3px solid rgba(148,163,184,.45);color:var(--tw-muted);margin:0 0 10px;padding:2px 0 2px 12px}.markdown-body a{color:var(--tw-primary)}.markdown-body code,.markdown-body pre{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.markdown-body code{background:#94a3b824;border-radius:4px;color:var(--tw-text-strong);font-size:.92em;padding:1px 4px}.markdown-body pre{background:#0f172a80;border:1px solid rgba(148,163,184,.18);border-radius:8px;margin:0;overflow:auto;padding:10px 12px;white-space:pre-wrap;word-break:break-word}.markdown-body pre code{background:transparent;border-radius:0;color:inherit;font-size:12px;padding:0}.markdown-body hr{border:0;border-top:1px solid var(--tw-border);margin:12px 0}.copy-button{position:absolute;right:8px;top:8px}.message-row-user .copy-button{left:8px;right:auto}.retry-button{bottom:8px;color:var(--tw-text-strong);left:8px;position:absolute}.message-style-error .retry-button{background:#f8717124;border-color:#f8717157}.message-style-error .retry-button:hover{background:#f8717138}.message-style-thinking{background:var(--tw-panel-soft);border-color:#38bdf847}.thinking-content{align-items:center;color:var(--tw-text);display:inline-flex;font-size:14px;gap:8px;line-height:20px}.thinking-dots{align-items:center;display:inline-flex;gap:4px;height:18px}.thinking-dots i{animation:thinking-pulse 1s ease-in-out infinite;background:var(--tw-primary);border-radius:999px;display:block;height:6px;opacity:.35;width:6px}.thinking-dots i:nth-child(2){animation-delay:.15s}.thinking-dots i:nth-child(3){animation-delay:.3s}@keyframes thinking-pulse{0%,80%,to{opacity:.35;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}@media(prefers-reduced-motion:reduce){.message.new-message{transform:none}.message.new-message.enter-active{opacity:1;transition:opacity .18s ease-out}}.composer{background:#111827eb;border-top:1px solid var(--tw-border);display:grid;gap:10px;padding:14px 22px 18px;position:relative;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.message-queue{display:grid;gap:8px}.context-chips{align-items:center;display:flex;flex-wrap:wrap;gap:6px}.context-chip-row,.plan-mode-toggle{align-items:center;display:flex;flex-wrap:wrap;gap:8px}.plan-mode-toggle>span{color:var(--tw-muted);font-size:12px;font-weight:700;line-height:18px;text-transform:uppercase}.plan-mode-options{align-items:center;background:#0f172ac2;border:1px solid var(--tw-border);border-radius:8px;display:inline-flex;gap:2px;min-width:0;padding:2px}.plan-mode-options button{background:transparent;border-color:transparent;color:var(--tw-muted);gap:5px;min-height:28px;padding:4px 8px}.plan-mode-options button.active{background:var(--tw-primary-soft);border-color:#38bdf87a;color:var(--tw-text-strong)}.plan-mode-options button ha-icon{--mdc-icon-size: 16px;flex:0 0 auto}.context-budget{border:1px solid var(--tw-border);border-radius:999px;color:var(--tw-muted);font-size:11px;min-height:24px;padding:3px 8px}.context-budget.warning{border-color:#f59e0b8c;color:#fbbf24}.context-budget.danger{border-color:#f87171a6;color:#fca5a5}.context-chip,.context-clear{background:var(--tw-panel);border-color:var(--tw-border);color:var(--tw-text);gap:5px;min-height:28px;max-width:220px;padding:4px 8px}.context-chip span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.context-chip ha-icon{--mdc-icon-size: 15px;flex:0 0 auto}.context-clear{color:var(--tw-muted)}.composer-input-row{position:relative}.composer-input-row textarea{padding-left:94px}.context-button,.builder-button{background:transparent;border-color:transparent;bottom:8px;color:var(--tw-muted);height:36px;min-height:36px;padding:0;position:absolute;left:10px;width:36px}.builder-button{left:50px}.context-button:hover,.builder-button:hover{background:var(--tw-panel-soft);border-color:var(--tw-border);color:var(--tw-text)}.context-button ha-icon,.builder-button ha-icon{--mdc-icon-size: 18px}.context-button b{align-items:center;background:var(--tw-primary);border-radius:999px;color:#03111f;display:inline-flex;font-size:10px;height:16px;justify-content:center;min-width:16px;padding:0 4px;position:absolute;right:-2px;top:-2px}.queued-message{align-items:center;background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:8px;grid-template-columns:minmax(0,1fr) auto;min-height:38px;padding:5px 5px 5px 10px}.queued-message span{color:var(--tw-text);font-size:13px;line-height:18px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.queued-actions{display:flex;flex:0 0 auto;gap:2px}.queued-actions .icon-button{height:28px;min-height:28px;position:relative;width:28px}.queued-actions .queue-edit{color:var(--tw-primary)}.queued-actions .queue-steer{color:var(--tw-success)}.queued-actions .queue-clear{color:var(--tw-danger)}.queued-actions .icon-button ha-icon{--mdc-icon-size: 16px;height:16px;width:16px}.queued-actions .icon-button:after{background:var(--tw-panel-strong);border:1px solid var(--tw-border);border-radius:6px;bottom:calc(100% + 8px);box-shadow:var(--tw-shadow);color:var(--tw-text-strong);content:attr(data-tooltip);display:none;font-size:12px;font-weight:600;left:50%;line-height:16px;padding:5px 8px;pointer-events:none;position:absolute;transform:translate(-50%);white-space:nowrap;z-index:15}.queued-actions .queue-clear:after{left:auto;right:0;transform:none}.queued-actions .icon-button:hover:after,.queued-actions .icon-button:focus-visible:after{display:block}.question-composer{gap:12px}.question-composer label{margin-bottom:0}.question-text{color:var(--tw-text-strong);font-size:14px;line-height:20px}.question-choices{display:grid;gap:8px;grid-template-columns:repeat(3,minmax(0,1fr))}.question-choice{background:var(--tw-panel);border-color:var(--tw-border);color:var(--tw-text);display:grid;gap:8px;grid-template-columns:18px minmax(0,1fr);justify-content:initial;min-height:42px;padding:8px 10px;position:relative;text-align:left}.question-choice:hover{background:var(--tw-primary-soft);border-color:#38bdf873;filter:none}.question-choice ha-icon{--mdc-icon-size: 18px;color:var(--tw-primary)}.question-info-wrap{align-self:start;display:inline-flex;height:18px;position:relative;width:18px}.question-choice .question-choice-tooltip{background:var(--tw-panel-strong);border:1px solid var(--tw-border);border-radius:6px;bottom:calc(100% + 8px);box-shadow:var(--tw-shadow);color:var(--tw-text-strong);display:none;font-size:12px;font-weight:600;left:-8px;line-height:16px;max-width:min(280px,calc(100vw - 32px));min-width:180px;overflow-wrap:anywhere;padding:6px 8px;pointer-events:none;position:absolute;white-space:normal;z-index:15}.question-info-wrap:hover .question-choice-tooltip,.question-choice:focus-visible .question-choice-tooltip{display:block}.question-choice span{min-width:0;overflow-wrap:anywhere}.question-custom-row{display:grid;gap:8px;grid-template-columns:minmax(0,1fr) 36px;position:relative}.archived-note{background:#111827eb;border-top:1px solid var(--tw-border);color:var(--tw-muted);font-size:13px;padding:15px 22px}textarea,input[name=question-custom]{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-text-strong);display:block;font:inherit;line-height:20px;min-height:52px;padding:15px 58px 15px 14px;resize:none;width:100%;box-shadow:0 8px 24px #00000042}input[name=question-custom]{min-height:42px;padding:10px 12px}textarea::placeholder{color:var(--tw-muted)}input[name=question-custom]::placeholder{color:var(--tw-muted)}textarea:focus,.title-input:focus,input[name=question-custom]:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:0}button{align-items:center;background:var(--tw-primary);border:1px solid transparent;border-radius:8px;color:#03111f;cursor:pointer;display:inline-flex;font:inherit;justify-content:center;min-height:34px;padding:7px 10px;transition:background-color .14s ease,border-color .14s ease,box-shadow .16s ease,color .14s ease,opacity .12s ease,transform .16s cubic-bezier(.2,0,0,1)}button:hover{filter:brightness(.97)}button:not(:disabled):not(.modal-scrim):not(.scroll-to-bottom):hover{box-shadow:var(--tw-button-shadow);transform:translateY(-1px)}button:not(:disabled):not(.modal-scrim):not(.scroll-to-bottom):active{box-shadow:none;transform:translateY(0);transition-duration:80ms}button:disabled{cursor:wait;opacity:.68}button.ghost,.tabs button,.header-actions button{background:transparent;border-color:var(--tw-border);color:var(--tw-text)}.icon-button{align-items:center;background:transparent;border-color:transparent;color:var(--tw-text);display:inline-flex;justify-content:center;min-height:32px;padding:5px;width:32px}.icon-button:hover{background:var(--tw-panel-soft);border-color:var(--tw-border)}.icon-button ha-icon{--mdc-icon-size: 18px;height:18px;width:18px}.stop-button{height:28px;min-height:28px;padding:0;width:28px}.stop-button ha-icon{--mdc-icon-size: 16px;align-items:center;display:inline-flex;height:16px;justify-content:center;line-height:1;width:16px}.send-button{height:36px;min-height:36px;padding:0;position:absolute;right:32px;bottom:26px;width:36px;box-shadow:0 10px 24px #38bdf83d}.send-button:not(:disabled):hover{background:#67d4ff;box-shadow:var(--tw-button-primary-shadow);filter:none}.send-button:not(:disabled):hover ha-icon{transform:translate(1px) rotate(-6deg)}.composer-input-row .send-button{bottom:8px;right:10px}.send-button ha-icon{--mdc-icon-size: 18px;transition:transform .16s cubic-bezier(.2,0,0,1)}.question-send{bottom:auto;position:static;right:auto}button.danger{background:var(--tw-danger);color:#fff}button.danger:not(:disabled):hover{background:#f05252;box-shadow:var(--tw-button-danger-shadow);filter:none}.drawer-header{align-items:center;background:inherit;border-bottom:1px solid var(--tw-border);display:flex;gap:12px;justify-content:space-between;padding:14px}.drawer-header h2{color:var(--tw-text-strong);font-size:18px;line-height:1.2;margin:0}.drawer-header span{color:var(--tw-muted);display:block;font-size:12px;margin-top:2px}.drawer-actions{display:flex;gap:4px}.drawer-body{min-height:0;overflow:auto;padding:14px}.git-review{display:block}.git-virtual-list{height:100%}.git-folder-heading{color:var(--tw-muted);font-size:11px;font-weight:700;letter-spacing:0;line-height:16px;margin:0 0 8px;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.diff-folder{display:grid;gap:8px;min-width:0}.diff-folder h3{color:var(--tw-muted);font-size:11px;font-weight:700;letter-spacing:0;line-height:16px;margin:0;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.diff-folder-files{display:grid;gap:8px;min-width:0}.git-load-more{background:transparent;border-color:var(--tw-border);color:var(--tw-text);display:grid;gap:2px;justify-items:center;min-height:44px;width:100%}.git-load-more b{color:var(--tw-muted);font-size:11px;font-weight:600}.message-file-changes{display:grid;gap:8px;margin-top:10px}.message-file-changes-head{align-items:center;display:flex;gap:8px;justify-content:flex-start;min-width:0}.message-file-changes-head span{color:var(--tw-muted);font-size:12px;line-height:18px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.message-file-changes-toggle{display:flex;justify-content:center;min-width:0}.message-file-changes-toggle button{color:#000;flex:0 0 auto;gap:6px;min-height:30px;padding:5px 8px}.message-file-changes-toggle button:hover{color:#000}.message-file-changes-toggle button ha-icon{--mdc-icon-size: 16px}.message-file-changes .diff-file{background:#080d187a}.rollback-action,.rollback-note{align-items:center;display:flex;gap:8px;margin-top:10px}.rollback-action button{min-height:34px}.rollback-note{color:var(--tw-muted);font-size:12px}.rollback-note ha-icon{--mdc-icon-size: 16px;color:var(--tw-accent)}.rollback-note.blocked ha-icon{color:var(--tw-danger)}.diff-file{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;contain:layout paint;display:block;margin-bottom:8px;min-height:48px;min-width:0;overflow:visible}.diff-card{align-items:center;background:var(--tw-panel-soft);border:0;border-radius:8px;cursor:pointer;color:var(--tw-text);display:grid;grid-template-columns:24px minmax(0,1fr) auto auto auto;gap:8px;min-height:48px;min-width:0;padding:10px 12px;text-align:left;width:100%}.diff-card:focus-visible{box-shadow:var(--tw-ring);outline:0}.diff-card.no-line-stats{grid-template-columns:24px minmax(0,1fr) auto auto}.diff-card.no-select{grid-template-columns:minmax(0,1fr) auto auto auto}.diff-card.no-select.no-line-stats{grid-template-columns:minmax(0,1fr) auto auto}.diff-file.open .diff-card{border-bottom:1px solid var(--tw-border);border-radius:8px 8px 0 0}.diff-card:hover{background:var(--tw-panel-strong);filter:none}.git-file-select{align-items:center;display:inline-flex;height:24px;justify-content:center;margin:0;min-width:24px}.git-file-select input{accent-color:var(--tw-primary);cursor:pointer;height:16px;margin:0;width:16px}.diff-file-main{display:block;min-width:0;overflow:hidden}.diff-file strong{color:var(--tw-text-strong);display:block;font-size:12px;line-height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.diff-file-main span{color:var(--tw-muted);display:block;font-size:11px;line-height:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.line-stats{align-items:center;display:flex;flex:0 0 auto;gap:4px}.line-stats span{border-radius:999px;font-size:11px;font-weight:700;line-height:18px;min-width:30px;padding:0 6px;text-align:center}.line-stats .added{background:#22c55e24;color:#bbf7d0}.line-stats .deleted{background:#ef444424;color:#fecaca}.file-status{align-items:center;border:1px solid var(--tw-border);border-radius:999px;color:var(--tw-muted);display:inline-flex;flex:0 0 auto;height:24px;justify-content:center;width:24px}.file-status ha-icon{--mdc-icon-size: 16px;color:inherit}.diff-open-action{align-items:center;border:1px solid var(--tw-border);border-radius:999px;color:var(--tw-muted);display:inline-flex;flex:0 0 auto;font-size:11px;font-weight:700;gap:4px;height:24px;line-height:18px;padding:0 7px 0 5px;text-transform:uppercase}.diff-open-action ha-icon{--mdc-icon-size: 16px;color:inherit;flex:0 0 auto}.file-status.added,.file-status.untracked{border-color:#22c55e73;color:var(--tw-success)}.file-status.modified{border-color:#f59e0b73;color:#fbbf24}.file-status.deleted{border-color:#ef444473;color:var(--tw-danger)}.diff-lines{background:#050914;border-radius:0 0 8px 8px;max-height:min(52vh,640px);min-width:0;overflow:auto;overscroll-behavior:contain;scrollbar-gutter:stable}.diff-lines.virtualized{height:min(52vh,640px)}.diff-line{display:grid;grid-template-columns:28px minmax(0,1fr);min-height:20px;min-width:0}.diff-line .marker{border-right:1px solid rgba(148,163,184,.15);color:var(--tw-muted);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:20px;text-align:center}.diff-line code{color:var(--tw-text);display:block;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:20px;min-width:0;overflow-wrap:anywhere;padding:0 8px;white-space:pre-wrap}.diff-line.added{background:#22c55e24}.diff-line.added .marker,.diff-line.added code{color:#bbf7d0}.diff-line.deleted{background:#ef444424}.diff-line.deleted .marker,.diff-line.deleted code{color:#fecaca}.diff-line.hunk{background:#38bdf81f}.diff-line.hunk .marker,.diff-line.hunk code{color:#bae6fd}.diff-line.meta code{color:var(--tw-muted)}.diff-empty,.diff-error{color:var(--tw-muted);font-size:12px;padding:12px}.diff-error{background:var(--tw-danger-soft);border-top:1px solid rgba(248,113,113,.28);color:#fecaca;margin:0;overflow-wrap:anywhere;white-space:pre-wrap}.commit-box{background:#111827f5;border-top:1px solid var(--tw-border);display:grid;gap:8px;grid-template-columns:minmax(0,1fr);padding:12px 14px 14px}.commit-box textarea{min-height:42px;padding:10px 12px}.commit-box button{gap:8px;width:100%}.commit-box button[type=submit]:not(:disabled):hover{background:#67d4ff;border-color:#bae6fd61;box-shadow:var(--tw-button-primary-shadow);filter:none}.commit-box button ha-icon{--mdc-icon-size: 18px;transition:transform .16s cubic-bezier(.2,0,0,1)}.commit-box button:not(:disabled):hover ha-icon,.discard-confirm button:not(:disabled):hover ha-icon{transform:scale(1.08)}.git-action-row{display:grid;gap:8px;grid-template-columns:repeat(2,minmax(0,1fr))}.discard-confirm{align-items:center;background:var(--tw-danger-soft);border:1px solid rgba(248,113,113,.32);border-radius:8px;display:grid;gap:8px;grid-template-columns:minmax(0,1fr) auto auto;padding:8px}.discard-confirm span{color:#fecaca;font-size:12px;font-weight:700;line-height:16px;min-width:0;overflow-wrap:anywhere}.discard-confirm button{min-height:30px;width:auto}.git-operation-result{border:1px solid var(--tw-border);border-left:4px solid var(--tw-border);border-radius:8px;display:grid;gap:5px;padding:9px 10px}.git-operation-result.success{border-left-color:var(--tw-success)}.git-operation-result.error{background:var(--tw-danger-soft);border-left-color:var(--tw-danger)}.git-operation-result strong{color:var(--tw-text-strong);font-size:13px;line-height:18px}.git-operation-result span{color:var(--tw-muted);font-size:12px;line-height:16px;overflow-wrap:anywhere}.git-operation-result pre{background:#050914;border-radius:6px;color:var(--tw-text);font-size:11px;line-height:16px;margin:3px 0 0;max-height:140px;overflow:auto;padding:8px;white-space:pre-wrap}.approval{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;margin-bottom:12px;padding:12px}.run-plan-review{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:10px;padding:12px}.run-plan-copy{color:var(--tw-text);font-size:13px;line-height:1.4}.run-plan-review .row button{gap:6px}.run-plan-review .row ha-icon{--mdc-icon-size: 16px}.approval-reason{background:var(--tw-primary-soft);border:1px solid #bfdbfe;border-radius:8px;color:var(--tw-text);font-size:13px;line-height:1.4;margin:10px 0;padding:9px 10px}label{color:var(--tw-muted);display:block;font-size:11px;font-weight:700;margin-bottom:6px;text-transform:uppercase}.result-head{align-items:center;display:flex;gap:10px;margin:12px 0 8px}.result{background:#050914;border:0;border-left:4px solid var(--tw-border);border-radius:0 8px 8px 0;color:var(--tw-text);max-height:55vh;overflow:auto;padding:12px}.result.success{border-left-color:var(--tw-success)}.result.error{border-left-color:var(--tw-danger)}.loading-state{background:var(--tw-panel);border:1px solid var(--tw-primary);border-radius:8px;color:var(--tw-text);margin:12px 0;padding:12px}.loading-state.error{border-color:var(--tw-danger);color:#fecaca;white-space:pre-wrap}.empty{align-self:center;justify-self:center;text-align:center;max-width:360px}.empty-actions{display:flex;gap:10px;justify-content:center}.pad{padding:10px}.debug-button{background:transparent;border-color:var(--tw-border);color:var(--tw-muted);height:34px;min-height:34px;padding:0;width:34px}.debug-button:hover{background:var(--tw-panel-soft);border-color:currentColor;color:var(--tw-text)}.debug-button:focus-visible{border-color:currentColor;color:var(--tw-text)}.debug-button ha-icon{--mdc-icon-size: 18px}.debug-button.bridge-unavailable ha-icon{color:var(--tw-danger)}.modal-backdrop{align-items:center;display:flex;top:0;right:0;bottom:0;left:0;justify-content:center;padding:22px;position:fixed;z-index:20}.modal-scrim{background:#030712b8;border:0;border-radius:0;top:0;right:0;bottom:0;left:0;min-height:0;padding:0;position:absolute}.modal{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;box-shadow:var(--tw-shadow);display:flex;flex-direction:column;height:min(720px,calc(100vh - 44px));max-height:min(720px,calc(100vh - 44px));max-width:min(860px,calc(100vw - 44px));min-width:min(620px,calc(100vw - 44px));overflow:hidden;position:relative;width:100%}.modal-header{align-items:center;border-bottom:1px solid var(--tw-border);display:flex;justify-content:space-between;padding:12px 14px}.modal-header h2{color:var(--tw-text-strong);font-size:16px;line-height:1.25;margin:0}.modal-tabs{align-items:center;border-bottom:1px solid var(--tw-border);display:flex;gap:6px;padding:8px 14px}.debug-tabs{display:flex;gap:6px}.modal-tabs button{background:transparent;border-color:var(--tw-border);color:var(--tw-muted);min-height:32px}.modal-tabs button:hover{background:var(--tw-panel-soft);border-color:#38bdf861;color:var(--tw-text-strong);filter:none}.modal-tabs button.active{background:var(--tw-primary-soft);border-color:#38bdf87a;color:var(--tw-text-strong)}.modal-tabs button.active:hover{background:#0c344fe0;border-color:#38bdf8ad}.modal-tab-spacer{flex:1 1 auto}.modal-tabs .bridge-action,.modal-tabs .core-action{align-items:center;display:inline-flex;gap:6px}.modal-tabs .bridge-action-start{background:#22c55e2e;border-color:#22c55e8c;color:#bbf7d0}.modal-tabs .bridge-action:not(:disabled):hover{background:var(--tw-primary);border-color:transparent;box-shadow:var(--tw-button-primary-shadow);color:#03111f}.modal-tabs .bridge-action-start:not(:disabled):hover{background:var(--tw-success);border-color:transparent;box-shadow:0 12px 28px #22c55e3d;color:#03140a}.modal-tabs .core-action:not(:disabled):hover{background:#fb718529;border-color:#fb71857a;color:#fecdd3}.modal-tabs .bridge-action ha-icon,.modal-tabs .core-action ha-icon{--mdc-icon-size: 16px;transition:transform .16s cubic-bezier(.2,0,0,1)}.modal-tabs .bridge-action-restart:not(:disabled):hover ha-icon,.modal-tabs .core-action:not(:disabled):hover ha-icon{transform:rotate(-18deg)}.context-modal{max-width:min(980px,calc(100vw - 44px))}.builder-modal{height:min(720px,calc(100vh - 44px));max-height:min(720px,calc(100vh - 44px));max-width:min(820px,calc(100vw - 44px));min-width:min(820px,calc(100vw - 44px));width:min(820px,calc(100vw - 44px))}.builder-modal-simple{height:min(650px,calc(100vh - 44px));max-height:min(650px,calc(100vh - 44px));max-width:min(760px,calc(100vw - 44px));min-width:min(760px,calc(100vw - 44px));width:min(760px,calc(100vw - 44px))}.settings-modal{max-width:min(980px,calc(100vw - 44px))}.settings-modal .modal-body{grid-template-rows:minmax(0,1fr);overflow:auto}.settings-saving{color:var(--tw-muted);font-size:12px}.settings-grid,.settings-run,.settings-models,.settings-debug,.settings-bridge-log,.settings-git,.settings-account{display:grid;gap:12px;padding:14px}.settings-account{align-content:start}.account-status-card{align-items:center;background:#0f172aa3;border:1px solid var(--tw-border);border-radius:8px;display:flex;gap:12px;justify-content:space-between;min-width:0;padding:12px}.account-status-card.success{border-color:#22c55e70}.account-status-card.error,.device-login-panel.error{border-color:#f8717199}.account-status-main{align-items:center;display:flex;gap:10px;min-width:0}.account-status-main ha-icon{--mdc-icon-size: 24px;color:var(--tw-primary);flex:0 0 auto}.account-status-main div,.device-login-header div{display:grid;gap:3px;min-width:0}.account-status-main strong,.device-login-header strong{color:var(--tw-text-strong);font-size:14px;line-height:19px}.account-status-main span,.device-login-header span{color:var(--tw-muted);font-size:12px;line-height:17px}.account-details{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}.account-detail{background:#0f172a75;border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:5px;min-width:0;padding:10px}.account-detail span{color:var(--tw-muted);font-size:11px;font-weight:700;text-transform:uppercase}.account-detail strong{color:var(--tw-text-strong);font-size:13px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.device-login-panel{background:#0f172aa3;border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:10px;min-width:0;padding:12px}.device-login-header{align-items:start;display:flex;gap:10px;justify-content:space-between;min-width:0}.device-login-link{color:var(--tw-primary);font-size:15px;font-weight:700;min-width:0;overflow-wrap:anywhere}.device-login-field{display:grid;gap:6px;min-width:0}.device-login-field>span{color:var(--tw-muted);font-size:11px;font-weight:700;letter-spacing:0;line-height:14px;text-transform:uppercase}.device-login-code-row{align-items:center;display:flex;flex-wrap:wrap;gap:8px;min-width:0}.device-login-code{align-items:center;background:#020617;border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-text-strong);display:inline-flex;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:22px;font-weight:700;gap:10px;letter-spacing:0;min-width:0;padding:8px 8px 8px 12px;overflow-wrap:anywhere;transition:border-color .14s ease,color .14s ease;width:fit-content}.device-login-code.copied{border-color:#22c55eb8;color:#86efac}.device-login-code>span{min-width:0}.device-login-copy{align-items:center;background:#94a3b81f;border:1px solid rgba(148,163,184,.24);border-radius:6px;color:var(--tw-muted);cursor:pointer;display:inline-flex;flex:0 0 auto;height:32px;justify-content:center;padding:0;transition:background .14s ease,border-color .14s ease,color .14s ease;width:32px}.device-login-copy:hover{background:#94a3b833;color:var(--tw-text-strong)}.device-login-code.copied .device-login-copy{background:#22c55e29;border-color:#22c55e85;color:#86efac}.device-login-copy ha-icon{--mdc-icon-size: 18px}.device-login-output{background:#020617;border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-muted);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px;margin:0;max-height:160px;overflow:auto;padding:8px;white-space:pre-wrap}.settings-bridge-log{gap:0;grid-template-rows:auto minmax(0,1fr);min-height:0;overflow:hidden;padding:0}.settings-models{align-content:start;grid-auto-rows:max-content}.settings-run,.settings-git{align-content:start}.git-setup-summary{align-items:center;background:#0f172aa3;border:1px solid var(--tw-border);border-radius:8px;display:flex;gap:12px;justify-content:space-between;min-width:0;padding:12px}.git-setup-summary.success{border-color:#22c55e70}.git-setup-summary.warning{border-color:#f59e0b80}.git-setup-cards{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}.git-setup-section{gap:10px}.git-setup-row{align-items:center;display:flex;flex-wrap:wrap;gap:8px;min-width:0}.git-setup-row a{color:var(--tw-primary);font-size:12px;font-weight:700;text-decoration:none}.git-setup-row .muted{color:var(--tw-muted);font-size:12px;min-width:0;overflow-wrap:anywhere}.git-public-key{align-items:stretch;background:#020617;border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:8px;grid-template-columns:minmax(0,1fr) auto;min-width:0;padding:8px}.git-public-key.copied{border-color:#22c55eb8}.git-public-key pre{color:var(--tw-muted);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px;margin:0;min-width:0;overflow:auto;white-space:pre-wrap;word-break:break-all}.git-remote-form{align-items:center;display:grid;gap:8px;grid-template-columns:minmax(180px,1fr) auto;min-width:0}.git-remote-form input{min-width:0;width:100%}.git-setup-result{background:#0f172aa3;border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:6px;min-width:0;padding:10px}.git-setup-result.success{border-color:#22c55e70}.git-setup-result.error{border-color:#f8717199}.git-setup-result strong{color:var(--tw-text-strong);font-size:13px}.git-setup-result span{color:var(--tw-muted);font-size:12px}.git-setup-result pre{background:#020617;border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-muted);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px;margin:0;max-height:170px;overflow:auto;padding:8px;white-space:pre-wrap}.settings-section{border-bottom:1px solid var(--tw-border);display:grid;gap:10px;padding-bottom:14px}.settings-section:last-child{border-bottom:0;padding-bottom:0}.settings-section h3{color:var(--tw-text-strong);font-size:13px;line-height:18px;margin:0}.settings-grid{align-items:start;grid-template-columns:repeat(auto-fit,minmax(150px,max-content));justify-content:start;padding:0}.setting-field{display:grid;gap:6px;min-width:0;width:fit-content}.setting-field span{color:var(--tw-muted);font-size:12px;font-weight:700;text-transform:uppercase}.settings-model-row{align-items:center;display:grid;gap:8px;grid-template-columns:minmax(120px,.8fr) minmax(180px,1fr) auto;min-height:38px}.settings-model-row.add{border-top:1px solid var(--tw-border);padding-top:12px}.settings-model-row button{gap:6px}.settings-modal select{cursor:pointer}.setting-field select,.setting-field input{max-width:min(260px,100%);width:auto}.builder-tabs{flex-wrap:wrap}.builder-tabs button{gap:6px}.builder-tabs button ha-icon{--mdc-icon-size: 16px}.builder-tabs button span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.builder-form{display:grid;grid-template-rows:minmax(0,1fr) auto;flex:1 1 auto;gap:0;min-height:0;overflow:hidden}.builder-scroll{display:grid;gap:12px;min-height:0;overflow:auto;padding:14px}.builder-scroll-simple{align-content:start;gap:14px;padding:18px}.builder-errors{background:var(--tw-danger-soft);border:1px solid rgba(248,113,113,.35);border-radius:8px;color:#fecaca;display:grid;gap:3px;padding:8px 10px}.builder-errors p{font-size:12px;line-height:16px;margin:0}.builder-fields{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))}.builder-fields-simple{gap:14px;grid-template-columns:minmax(0,1fr);margin:0 auto;max-width:680px;width:100%}.builder-field{display:grid;gap:5px;min-width:0}.builder-fields-simple .builder-field{gap:7px}.builder-field.wide{grid-column:1 / -1}.builder-field span,.builder-context>span{color:var(--tw-muted);font-size:12px;font-weight:700;letter-spacing:0}.builder-field input,.builder-field select,.builder-field textarea{background:var(--tw-panel-soft);border:1px solid var(--tw-border);border-radius:8px;box-shadow:none;color:var(--tw-text-strong);font:inherit;line-height:20px;min-height:38px;min-width:0;padding:8px 10px;resize:vertical;width:100%}.builder-field textarea{min-height:86px}.builder-fields-simple .builder-field input,.builder-fields-simple .builder-field textarea{background:#0f172ac7;min-height:42px}.builder-fields-simple .builder-field textarea{min-height:96px}.builder-fields-simple .builder-field:first-child textarea{min-height:112px}.builder-field input:focus,.builder-field select:focus,.builder-field textarea:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:0}.builder-compound{display:grid;gap:7px;min-width:0}.builder-compound.action{grid-template-columns:minmax(150px,.7fr) minmax(200px,1fr)}.builder-compound.action textarea,.builder-compound.action small{grid-column:1 / -1}.builder-compound small{color:var(--tw-muted);font-size:11px;line-height:15px;min-height:15px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.entity-combobox{display:grid;gap:6px;min-width:0;position:relative}.entity-combobox-chips{display:flex;flex-wrap:wrap;gap:5px;min-width:0}.entity-combobox-chip{align-items:center;background:#3b82f61f;border:1px solid rgba(96,165,250,.28);border-radius:8px;color:var(--tw-text);display:inline-flex;font-size:12px;gap:4px;line-height:18px;max-width:100%;min-height:28px;min-width:0;padding:4px 7px}.entity-combobox-chip span{color:inherit;font-size:inherit;font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;text-transform:none;white-space:nowrap}.entity-combobox-chip ha-icon{--mdc-icon-size: 14px;flex:0 0 auto}.entity-combobox-menu{background:#0f172a;border:1px solid var(--tw-border);border-radius:8px;box-shadow:0 18px 50px #0000006b;display:grid;left:0;max-height:248px;min-width:100%;overflow:auto;position:absolute;right:0;top:calc(100% + 4px);z-index:40}.entity-combobox-menu button{background:transparent;border:0;border-radius:0;color:var(--tw-text);display:grid;gap:2px;justify-items:start;min-height:46px;padding:8px 10px;text-align:left}.entity-combobox-menu button:hover,.entity-combobox-menu button:focus{background:#3b82f624;outline:0}.entity-combobox-menu strong{color:var(--tw-text-strong);font-size:13px;font-weight:700;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.entity-combobox-menu small,.entity-combobox-empty{color:var(--tw-muted);font-size:12px;line-height:16px}.entity-combobox-menu small{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.entity-combobox-empty{padding:10px}@media(max-width:720px){.builder-compound.action{grid-template-columns:minmax(0,1fr)}.builder-compound.action textarea,.builder-compound.action small{grid-column:auto}}.builder-context{border-top:1px solid var(--tw-border);display:grid;gap:8px;padding-top:12px}.builder-scroll-simple .builder-context{margin:0 auto;max-width:680px;width:100%}.builder-context-list{align-items:center;display:flex;flex-wrap:wrap;gap:6px;min-width:0}.builder-context-chip,.builder-context-empty{align-items:center;background:#0f172ab8;border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-text);display:inline-flex;font-size:12px;gap:5px;line-height:18px;max-width:220px;min-height:28px;min-width:0;overflow:hidden;padding:4px 8px;text-overflow:ellipsis;white-space:nowrap}.builder-context-chip ha-icon{--mdc-icon-size: 15px;color:var(--tw-primary);flex:0 0 auto}.builder-context-empty{color:var(--tw-muted)}.builder-actions{background:var(--tw-panel);border-top:1px solid var(--tw-border);display:flex;gap:8px;justify-content:flex-end;padding:12px 14px}.builder-actions button{gap:6px}.context-tabs{flex-wrap:wrap}.context-tabs button{gap:6px}.context-tabs button ha-icon{--mdc-icon-size: 16px}.context-tabs button span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.context-toolbar{align-items:center;border-bottom:1px solid var(--tw-border);display:grid;gap:8px;grid-template-columns:minmax(0,1fr) auto auto;padding:10px 14px}.context-toolbar input{background:var(--tw-panel-soft);border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-text-strong);font:inherit;min-height:34px;min-width:0;padding:7px 10px}.context-toolbar input:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:0}.context-toolbar span{color:var(--tw-muted);font-size:12px}.context-errors{background:var(--tw-danger-soft);border-bottom:1px solid rgba(248,113,113,.35);color:#fecaca;display:grid;gap:3px;padding:8px 14px}.context-errors p{font-size:12px;line-height:16px;margin:0;overflow-wrap:anywhere}.context-list{align-content:start;display:grid;flex:1 1 auto;gap:6px;min-height:0;overflow:auto;padding:10px 14px 14px}.context-row{align-items:center;background:#0f172ab8;border-color:var(--tw-border);color:var(--tw-text);display:grid;gap:10px;grid-template-columns:20px 24px minmax(0,1fr) auto;justify-content:initial;min-height:48px;padding:7px 10px;text-align:left;width:100%}.context-row:hover{background:var(--tw-panel-soft);filter:none}.context-row.selected{background:var(--tw-primary-soft);border-color:#38bdf87a}.context-row:disabled{cursor:not-allowed}.context-checkbox{align-items:center;border:1px solid var(--tw-border);border-radius:5px;display:inline-flex;height:18px;justify-content:center;width:18px}.context-row.selected .context-checkbox{background:var(--tw-primary);border-color:var(--tw-primary);color:#03111f}.context-checkbox ha-icon{--mdc-icon-size: 14px}.context-kind-icon{color:var(--tw-primary)}.context-kind-icon ha-icon,.context-row>ha-icon{--mdc-icon-size: 19px}.context-row-main{display:grid;gap:2px;min-width:0}.context-row-main strong{color:var(--tw-text-strong);font-size:13px;line-height:18px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.context-row-main small,.context-row-status{color:var(--tw-muted);font-size:11px;line-height:15px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.context-empty{align-items:center;color:var(--tw-muted);display:flex;font-size:13px;justify-content:center;min-height:160px}.modal-body{display:grid;flex:1 1 auto;grid-template-rows:auto minmax(0,1fr);min-height:0;overflow:hidden}.runtime-cards{border-bottom:1px solid var(--tw-border);display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));padding:10px 14px}.runtime-card{background:#0f172aa3;border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:5px;min-width:0;padding:10px}.runtime-card span{color:var(--tw-muted);font-size:11px;font-weight:700;text-transform:uppercase}.runtime-card strong{color:var(--tw-text-strong);font-size:14px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.runtime-card small{color:var(--tw-muted);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.runtime-card.success{border-color:#22c55e70}.runtime-card.warning{border-color:#f59e0b80}.runtime-card.error{border-color:#f8717199}.modal-toolbar{align-items:center;border-bottom:1px solid var(--tw-border);color:var(--tw-muted);display:flex;font-size:12px;gap:10px;justify-content:space-between;min-width:0;padding:8px 14px}.modal-toolbar span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.modal-toolbar-actions{display:flex;flex:0 0 auto;gap:6px}.modal-toolbar button{flex:0 0 auto;gap:6px;min-height:30px;padding:5px 8px}.modal-toolbar .bridge-log-refresh:not(:disabled):hover{border-color:#38bdf8a3}.modal-toolbar .bridge-log-clear:not(:disabled):hover{border-color:#f8717194;color:#fecaca}.modal-toolbar ha-icon{--mdc-icon-size: 16px}.bridge-log-end{display:block;height:0}.modal .result{border-radius:0;border-left:0;margin:0;max-height:none;min-height:0}.raw-event-details{border-top:1px solid var(--tw-border);color:var(--tw-muted);margin-top:10px;padding-top:8px}.raw-event-details summary{cursor:pointer;font-size:12px}.raw-event-details pre{background:#0206176b;border:1px solid var(--tw-border);border-radius:7px;color:var(--tw-text);max-height:220px;overflow:auto;padding:8px;white-space:pre-wrap}.tool-visibility-compact.message-style-event .markdown-body,.tool-visibility-compact.message-style-action .markdown-body{max-height:120px;overflow:hidden}.validation-panel-body{min-height:0;overflow:auto;padding:14px}.validation-panel-body .validation-card{margin-top:0}.toast-stack{--toast-slide-offset: 18px;display:grid;gap:10px;max-width:calc(100% - 36px);position:absolute;right:18px;top:58px;width:min(360px,calc(100vw - 36px));z-index:10}.toast{align-items:center;background:var(--tw-panel);border:1px solid var(--tw-border);border-left:4px solid var(--tw-primary);border-radius:8px;box-shadow:var(--tw-shadow);color:var(--tw-text);display:flex;gap:10px;min-width:0;padding:11px 12px}.toast>span{min-width:0;overflow-wrap:anywhere}.toast.entering{animation:toast-slide-in .26s cubic-bezier(.2,0,0,1)}.toast.exiting{animation:toast-slide-out .26s cubic-bezier(.4,0,1,1) forwards}@keyframes toast-slide-in{0%{opacity:0;transform:translate(-10px,-6px) scale(.98)}to{opacity:1;transform:translate(0)}}@keyframes toast-slide-out{0%{opacity:1;transform:translate(0)}to{opacity:0;transform:translate(var(--toast-slide-offset))}}.toast.success{border-left-color:var(--tw-success)}.toast.error{border-left-color:var(--tw-danger)}.toast.restart{align-items:flex-start;border-left-color:var(--tw-primary);flex-wrap:wrap}.toast ha-icon{--mdc-icon-size: 20px;flex:0 0 auto}.toast-content{display:grid;flex:1 1 180px;gap:3px;min-width:0}.toast-content strong{font-size:13px}.toast-content span{color:var(--tw-muted);font-size:12px;line-height:1.35}.toast-chat-list{color:var(--tw-muted);display:grid;font-size:12px;gap:2px;line-height:1.35;list-style:none;margin:0;padding:0}.toast-chat-list li{overflow-wrap:anywhere}.toast-actions{display:flex;flex:0 0 auto;flex-wrap:wrap;gap:6px;justify-content:flex-end;margin-left:auto}.toast.restart .toast-actions{margin-left:30px}.toast-actions button{min-height:30px;padding:6px 10px}.toast-actions .secondary{background:var(--tw-surface);border-color:var(--tw-border);color:var(--tw-text)}@media(prefers-reduced-motion:reduce){.shell,.drawer,button,button ha-icon{transition-duration:1ms!important}button:not(:disabled):not(.modal-scrim):not(.scroll-to-bottom):hover,.send-button:not(:disabled):hover ha-icon,.commit-box button:not(:disabled):hover ha-icon,.discard-confirm button:not(:disabled):hover ha-icon,.modal-tabs .bridge-action:not(:disabled):hover ha-icon{transform:none}}@media(max-width:1100px){.shell,.shell.git-closed{grid-template-columns:240px minmax(0,1fr)}.drawer{bottom:0;box-shadow:var(--tw-shadow);position:fixed;right:0;top:0;width:min(420px,calc(100vw - 240px));z-index:8}}@media(max-width:720px){.shell,.shell.git-closed{grid-template-columns:1fr}.rail{display:none}.drawer{width:min(100vw,440px)}.chat-header{align-items:center;padding:14px 16px}.header-actions{flex-wrap:nowrap}.transcript{padding:16px}.composer{padding:12px 14px 16px}.send-button{right:24px;bottom:24px}.question-choices{grid-template-columns:minmax(0,1fr)}.question-send{bottom:auto;right:auto}.queued-message{align-items:start;grid-template-columns:minmax(0,1fr)}.queued-actions{justify-content:flex-end}.diff-card{grid-template-columns:24px minmax(0,1fr) auto}.diff-card.no-select{grid-template-columns:minmax(0,1fr) auto auto}.line-stats{grid-column:2 / -1;justify-content:flex-start}.git-action-row,.discard-confirm{grid-template-columns:minmax(0,1fr)}.discard-confirm button{width:100%}.diff-lines{max-height:44vh}.runtime-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}";
class MC extends HTMLElement {
  constructor() {
    super();
    zn(this, "root", null);
    zn(this, "mount");
    zn(this, "_hass", null);
    zn(this, "_panel", null);
    const o = this.attachShadow({ mode: "open" }), r = document.createElement("style");
    r.textContent = NC, o.appendChild(r), this.mount = document.createElement("div"), this.mount.className = "ha-codex-root", o.appendChild(this.mount);
  }
  connectedCallback() {
    this.renderReact();
  }
  disconnectedCallback() {
    var o;
    (o = this.root) == null || o.unmount(), this.root = null;
  }
  set hass(o) {
    this._hass = o, this.renderReact();
  }
  get hass() {
    return this._hass;
  }
  set panel(o) {
    this._panel = o, this.renderReact();
  }
  get panel() {
    return this._panel;
  }
  renderReact() {
    this.isConnected && (this.root || (this.root = zy.createRoot(this.mount)), this.root.render(/* @__PURE__ */ d.jsx(dt.StrictMode, { children: /* @__PURE__ */ d.jsx(EC, { hass: this._hass, panel: this._panel }) })));
  }
}
customElements.get("ha-codex-panel") || customElements.define("ha-codex-panel", MC);
