var my = Object.defineProperty;
var ag = (a) => {
  throw TypeError(a);
};
var py = (a, i, o) => i in a ? my(a, i, { enumerable: !0, configurable: !0, writable: !0, value: o }) : a[i] = o;
var jn = (a, i, o) => py(a, typeof i != "symbol" ? i + "" : i, o), ld = (a, i, o) => i.has(a) || ag("Cannot " + o);
var Z = (a, i, o) => (ld(a, i, "read from private field"), o ? o.call(a) : i.get(a)), Gt = (a, i, o) => i.has(a) ? ag("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(a) : i.set(a, o), jt = (a, i, o, r) => (ld(a, i, "write to private field"), r ? r.call(a, o) : i.set(a, o), o), Ge = (a, i, o) => (ld(a, i, "access private method"), o);
var _s = (a, i, o, r) => ({
  set _(c) {
    jt(a, i, c, o);
  },
  get _() {
    return Z(a, i, r);
  }
});
function Ex(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var od = { exports: {} }, Eo = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ig;
function gy() {
  if (ig) return Eo;
  ig = 1;
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
  return Eo.Fragment = i, Eo.jsx = o, Eo.jsxs = o, Eo;
}
var lg;
function xy() {
  return lg || (lg = 1, od.exports = gy()), od.exports;
}
var d = xy(), rd = { exports: {} }, Rt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var og;
function by() {
  if (og) return Rt;
  og = 1;
  var a = Symbol.for("react.transitional.element"), i = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), c = Symbol.for("react.profiler"), f = Symbol.for("react.consumer"), m = Symbol.for("react.context"), p = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), x = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), y = Symbol.for("react.activity"), C = Symbol.iterator;
  function E(_) {
    return _ === null || typeof _ != "object" ? null : (_ = C && _[C] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var B = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, M = Object.assign, z = {};
  function A(_, Q, X) {
    this.props = _, this.context = Q, this.refs = z, this.updater = X || B;
  }
  A.prototype.isReactComponent = {}, A.prototype.setState = function(_, Q) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, _, Q, "setState");
  }, A.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function O() {
  }
  O.prototype = A.prototype;
  function k(_, Q, X) {
    this.props = _, this.context = Q, this.refs = z, this.updater = X || B;
  }
  var v = k.prototype = new O();
  v.constructor = k, M(v, A.prototype), v.isPureReactComponent = !0;
  var T = Array.isArray;
  function N() {
  }
  var S = { H: null, A: null, T: null, S: null }, D = Object.prototype.hasOwnProperty;
  function Y(_, Q, X) {
    var it = X.ref;
    return {
      $$typeof: a,
      type: _,
      key: Q,
      ref: it !== void 0 ? it : null,
      props: X
    };
  }
  function F(_, Q) {
    return Y(_.type, Q, _.props);
  }
  function et(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === a;
  }
  function st(_) {
    var Q = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(X) {
      return Q[X];
    });
  }
  var ut = /\/+/g;
  function ot(_, Q) {
    return typeof _ == "object" && _ !== null && _.key != null ? st("" + _.key) : Q.toString(36);
  }
  function vt(_) {
    switch (_.status) {
      case "fulfilled":
        return _.value;
      case "rejected":
        throw _.reason;
      default:
        switch (typeof _.status == "string" ? _.then(N, N) : (_.status = "pending", _.then(
          function(Q) {
            _.status === "pending" && (_.status = "fulfilled", _.value = Q);
          },
          function(Q) {
            _.status === "pending" && (_.status = "rejected", _.reason = Q);
          }
        )), _.status) {
          case "fulfilled":
            return _.value;
          case "rejected":
            throw _.reason;
        }
    }
    throw _;
  }
  function q(_, Q, X, it, pt) {
    var St = typeof _;
    (St === "undefined" || St === "boolean") && (_ = null);
    var At = !1;
    if (_ === null) At = !0;
    else
      switch (St) {
        case "bigint":
        case "string":
        case "number":
          At = !0;
          break;
        case "object":
          switch (_.$$typeof) {
            case a:
            case i:
              At = !0;
              break;
            case w:
              return At = _._init, q(
                At(_._payload),
                Q,
                X,
                it,
                pt
              );
          }
      }
    if (At)
      return pt = pt(_), At = it === "" ? "." + ot(_, 0) : it, T(pt) ? (X = "", At != null && (X = At.replace(ut, "$&/") + "/"), q(pt, Q, X, "", function(re) {
        return re;
      })) : pt != null && (et(pt) && (pt = F(
        pt,
        X + (pt.key == null || _ && _.key === pt.key ? "" : ("" + pt.key).replace(
          ut,
          "$&/"
        ) + "/") + At
      )), Q.push(pt)), 1;
    At = 0;
    var at = it === "" ? "." : it + ":";
    if (T(_))
      for (var bt = 0; bt < _.length; bt++)
        it = _[bt], St = at + ot(it, bt), At += q(
          it,
          Q,
          X,
          St,
          pt
        );
    else if (bt = E(_), typeof bt == "function")
      for (_ = bt.call(_), bt = 0; !(it = _.next()).done; )
        it = it.value, St = at + ot(it, bt++), At += q(
          it,
          Q,
          X,
          St,
          pt
        );
    else if (St === "object") {
      if (typeof _.then == "function")
        return q(
          vt(_),
          Q,
          X,
          it,
          pt
        );
      throw Q = String(_), Error(
        "Objects are not valid as a React child (found: " + (Q === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : Q) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return At;
  }
  function W(_, Q, X) {
    if (_ == null) return _;
    var it = [], pt = 0;
    return q(_, it, "", "", function(St) {
      return Q.call(X, St, pt++);
    }), it;
  }
  function $(_) {
    if (_._status === -1) {
      var Q = _._result;
      Q = Q(), Q.then(
        function(X) {
          (_._status === 0 || _._status === -1) && (_._status = 1, _._result = X);
        },
        function(X) {
          (_._status === 0 || _._status === -1) && (_._status = 2, _._result = X);
        }
      ), _._status === -1 && (_._status = 0, _._result = Q);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var ht = typeof reportError == "function" ? reportError : function(_) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var Q = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof _ == "object" && _ !== null && typeof _.message == "string" ? String(_.message) : String(_),
        error: _
      });
      if (!window.dispatchEvent(Q)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", _);
      return;
    }
    console.error(_);
  }, rt = {
    map: W,
    forEach: function(_, Q, X) {
      W(
        _,
        function() {
          Q.apply(this, arguments);
        },
        X
      );
    },
    count: function(_) {
      var Q = 0;
      return W(_, function() {
        Q++;
      }), Q;
    },
    toArray: function(_) {
      return W(_, function(Q) {
        return Q;
      }) || [];
    },
    only: function(_) {
      if (!et(_))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return _;
    }
  };
  return Rt.Activity = y, Rt.Children = rt, Rt.Component = A, Rt.Fragment = o, Rt.Profiler = c, Rt.PureComponent = k, Rt.StrictMode = r, Rt.Suspense = g, Rt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = S, Rt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(_) {
      return S.H.useMemoCache(_);
    }
  }, Rt.cache = function(_) {
    return function() {
      return _.apply(null, arguments);
    };
  }, Rt.cacheSignal = function() {
    return null;
  }, Rt.cloneElement = function(_, Q, X) {
    if (_ == null)
      throw Error(
        "The argument must be a React element, but you passed " + _ + "."
      );
    var it = M({}, _.props), pt = _.key;
    if (Q != null)
      for (St in Q.key !== void 0 && (pt = "" + Q.key), Q)
        !D.call(Q, St) || St === "key" || St === "__self" || St === "__source" || St === "ref" && Q.ref === void 0 || (it[St] = Q[St]);
    var St = arguments.length - 2;
    if (St === 1) it.children = X;
    else if (1 < St) {
      for (var At = Array(St), at = 0; at < St; at++)
        At[at] = arguments[at + 2];
      it.children = At;
    }
    return Y(_.type, pt, it);
  }, Rt.createContext = function(_) {
    return _ = {
      $$typeof: m,
      _currentValue: _,
      _currentValue2: _,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, _.Provider = _, _.Consumer = {
      $$typeof: f,
      _context: _
    }, _;
  }, Rt.createElement = function(_, Q, X) {
    var it, pt = {}, St = null;
    if (Q != null)
      for (it in Q.key !== void 0 && (St = "" + Q.key), Q)
        D.call(Q, it) && it !== "key" && it !== "__self" && it !== "__source" && (pt[it] = Q[it]);
    var At = arguments.length - 2;
    if (At === 1) pt.children = X;
    else if (1 < At) {
      for (var at = Array(At), bt = 0; bt < At; bt++)
        at[bt] = arguments[bt + 2];
      pt.children = at;
    }
    if (_ && _.defaultProps)
      for (it in At = _.defaultProps, At)
        pt[it] === void 0 && (pt[it] = At[it]);
    return Y(_, St, pt);
  }, Rt.createRef = function() {
    return { current: null };
  }, Rt.forwardRef = function(_) {
    return { $$typeof: p, render: _ };
  }, Rt.isValidElement = et, Rt.lazy = function(_) {
    return {
      $$typeof: w,
      _payload: { _status: -1, _result: _ },
      _init: $
    };
  }, Rt.memo = function(_, Q) {
    return {
      $$typeof: x,
      type: _,
      compare: Q === void 0 ? null : Q
    };
  }, Rt.startTransition = function(_) {
    var Q = S.T, X = {};
    S.T = X;
    try {
      var it = _(), pt = S.S;
      pt !== null && pt(X, it), typeof it == "object" && it !== null && typeof it.then == "function" && it.then(N, ht);
    } catch (St) {
      ht(St);
    } finally {
      Q !== null && X.types !== null && (Q.types = X.types), S.T = Q;
    }
  }, Rt.unstable_useCacheRefresh = function() {
    return S.H.useCacheRefresh();
  }, Rt.use = function(_) {
    return S.H.use(_);
  }, Rt.useActionState = function(_, Q, X) {
    return S.H.useActionState(_, Q, X);
  }, Rt.useCallback = function(_, Q) {
    return S.H.useCallback(_, Q);
  }, Rt.useContext = function(_) {
    return S.H.useContext(_);
  }, Rt.useDebugValue = function() {
  }, Rt.useDeferredValue = function(_, Q) {
    return S.H.useDeferredValue(_, Q);
  }, Rt.useEffect = function(_, Q) {
    return S.H.useEffect(_, Q);
  }, Rt.useEffectEvent = function(_) {
    return S.H.useEffectEvent(_);
  }, Rt.useId = function() {
    return S.H.useId();
  }, Rt.useImperativeHandle = function(_, Q, X) {
    return S.H.useImperativeHandle(_, Q, X);
  }, Rt.useInsertionEffect = function(_, Q) {
    return S.H.useInsertionEffect(_, Q);
  }, Rt.useLayoutEffect = function(_, Q) {
    return S.H.useLayoutEffect(_, Q);
  }, Rt.useMemo = function(_, Q) {
    return S.H.useMemo(_, Q);
  }, Rt.useOptimistic = function(_, Q) {
    return S.H.useOptimistic(_, Q);
  }, Rt.useReducer = function(_, Q, X) {
    return S.H.useReducer(_, Q, X);
  }, Rt.useRef = function(_) {
    return S.H.useRef(_);
  }, Rt.useState = function(_) {
    return S.H.useState(_);
  }, Rt.useSyncExternalStore = function(_, Q, X) {
    return S.H.useSyncExternalStore(
      _,
      Q,
      X
    );
  }, Rt.useTransition = function() {
    return S.H.useTransition();
  }, Rt.version = "19.2.6", Rt;
}
var rg;
function Hd() {
  return rg || (rg = 1, rd.exports = by()), rd.exports;
}
var I = Hd();
const ct = /* @__PURE__ */ Ex(I);
var sd = { exports: {} }, Ro = {}, ud = { exports: {} }, cd = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sg;
function vy() {
  return sg || (sg = 1, (function(a) {
    function i(q, W) {
      var $ = q.length;
      q.push(W);
      t: for (; 0 < $; ) {
        var ht = $ - 1 >>> 1, rt = q[ht];
        if (0 < c(rt, W))
          q[ht] = W, q[$] = rt, $ = ht;
        else break t;
      }
    }
    function o(q) {
      return q.length === 0 ? null : q[0];
    }
    function r(q) {
      if (q.length === 0) return null;
      var W = q[0], $ = q.pop();
      if ($ !== W) {
        q[0] = $;
        t: for (var ht = 0, rt = q.length, _ = rt >>> 1; ht < _; ) {
          var Q = 2 * (ht + 1) - 1, X = q[Q], it = Q + 1, pt = q[it];
          if (0 > c(X, $))
            it < rt && 0 > c(pt, X) ? (q[ht] = pt, q[it] = $, ht = it) : (q[ht] = X, q[Q] = $, ht = Q);
          else if (it < rt && 0 > c(pt, $))
            q[ht] = pt, q[it] = $, ht = it;
          else break t;
        }
      }
      return W;
    }
    function c(q, W) {
      var $ = q.sortIndex - W.sortIndex;
      return $ !== 0 ? $ : q.id - W.id;
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
    var g = [], x = [], w = 1, y = null, C = 3, E = !1, B = !1, M = !1, z = !1, A = typeof setTimeout == "function" ? setTimeout : null, O = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    function v(q) {
      for (var W = o(x); W !== null; ) {
        if (W.callback === null) r(x);
        else if (W.startTime <= q)
          r(x), W.sortIndex = W.expirationTime, i(g, W);
        else break;
        W = o(x);
      }
    }
    function T(q) {
      if (M = !1, v(q), !B)
        if (o(g) !== null)
          B = !0, N || (N = !0, st());
        else {
          var W = o(x);
          W !== null && vt(T, W.startTime - q);
        }
    }
    var N = !1, S = -1, D = 5, Y = -1;
    function F() {
      return z ? !0 : !(a.unstable_now() - Y < D);
    }
    function et() {
      if (z = !1, N) {
        var q = a.unstable_now();
        Y = q;
        var W = !0;
        try {
          t: {
            B = !1, M && (M = !1, O(S), S = -1), E = !0;
            var $ = C;
            try {
              e: {
                for (v(q), y = o(g); y !== null && !(y.expirationTime > q && F()); ) {
                  var ht = y.callback;
                  if (typeof ht == "function") {
                    y.callback = null, C = y.priorityLevel;
                    var rt = ht(
                      y.expirationTime <= q
                    );
                    if (q = a.unstable_now(), typeof rt == "function") {
                      y.callback = rt, v(q), W = !0;
                      break e;
                    }
                    y === o(g) && r(g), v(q);
                  } else r(g);
                  y = o(g);
                }
                if (y !== null) W = !0;
                else {
                  var _ = o(x);
                  _ !== null && vt(
                    T,
                    _.startTime - q
                  ), W = !1;
                }
              }
              break t;
            } finally {
              y = null, C = $, E = !1;
            }
            W = void 0;
          }
        } finally {
          W ? st() : N = !1;
        }
      }
    }
    var st;
    if (typeof k == "function")
      st = function() {
        k(et);
      };
    else if (typeof MessageChannel < "u") {
      var ut = new MessageChannel(), ot = ut.port2;
      ut.port1.onmessage = et, st = function() {
        ot.postMessage(null);
      };
    } else
      st = function() {
        A(et, 0);
      };
    function vt(q, W) {
      S = A(function() {
        q(a.unstable_now());
      }, W);
    }
    a.unstable_IdlePriority = 5, a.unstable_ImmediatePriority = 1, a.unstable_LowPriority = 4, a.unstable_NormalPriority = 3, a.unstable_Profiling = null, a.unstable_UserBlockingPriority = 2, a.unstable_cancelCallback = function(q) {
      q.callback = null;
    }, a.unstable_forceFrameRate = function(q) {
      0 > q || 125 < q ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : D = 0 < q ? Math.floor(1e3 / q) : 5;
    }, a.unstable_getCurrentPriorityLevel = function() {
      return C;
    }, a.unstable_next = function(q) {
      switch (C) {
        case 1:
        case 2:
        case 3:
          var W = 3;
          break;
        default:
          W = C;
      }
      var $ = C;
      C = W;
      try {
        return q();
      } finally {
        C = $;
      }
    }, a.unstable_requestPaint = function() {
      z = !0;
    }, a.unstable_runWithPriority = function(q, W) {
      switch (q) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          q = 3;
      }
      var $ = C;
      C = q;
      try {
        return W();
      } finally {
        C = $;
      }
    }, a.unstable_scheduleCallback = function(q, W, $) {
      var ht = a.unstable_now();
      switch (typeof $ == "object" && $ !== null ? ($ = $.delay, $ = typeof $ == "number" && 0 < $ ? ht + $ : ht) : $ = ht, q) {
        case 1:
          var rt = -1;
          break;
        case 2:
          rt = 250;
          break;
        case 5:
          rt = 1073741823;
          break;
        case 4:
          rt = 1e4;
          break;
        default:
          rt = 5e3;
      }
      return rt = $ + rt, q = {
        id: w++,
        callback: W,
        priorityLevel: q,
        startTime: $,
        expirationTime: rt,
        sortIndex: -1
      }, $ > ht ? (q.sortIndex = $, i(x, q), o(g) === null && q === o(x) && (M ? (O(S), S = -1) : M = !0, vt(T, $ - ht))) : (q.sortIndex = rt, i(g, q), B || E || (B = !0, N || (N = !0, st()))), q;
    }, a.unstable_shouldYield = F, a.unstable_wrapCallback = function(q) {
      var W = C;
      return function() {
        var $ = C;
        C = W;
        try {
          return q.apply(this, arguments);
        } finally {
          C = $;
        }
      };
    };
  })(cd)), cd;
}
var ug;
function yy() {
  return ug || (ug = 1, ud.exports = vy()), ud.exports;
}
var dd = { exports: {} }, Qe = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cg;
function wy() {
  if (cg) return Qe;
  cg = 1;
  var a = Hd();
  function i(g) {
    var x = "https://react.dev/errors/" + g;
    if (1 < arguments.length) {
      x += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var w = 2; w < arguments.length; w++)
        x += "&args[]=" + encodeURIComponent(arguments[w]);
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
  function f(g, x, w) {
    var y = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: c,
      key: y == null ? null : "" + y,
      children: g,
      containerInfo: x,
      implementation: w
    };
  }
  var m = a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(g, x) {
    if (g === "font") return "";
    if (typeof x == "string")
      return x === "use-credentials" ? x : "";
  }
  return Qe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, Qe.createPortal = function(g, x) {
    var w = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!x || x.nodeType !== 1 && x.nodeType !== 9 && x.nodeType !== 11)
      throw Error(i(299));
    return f(g, x, null, w);
  }, Qe.flushSync = function(g) {
    var x = m.T, w = r.p;
    try {
      if (m.T = null, r.p = 2, g) return g();
    } finally {
      m.T = x, r.p = w, r.d.f();
    }
  }, Qe.preconnect = function(g, x) {
    typeof g == "string" && (x ? (x = x.crossOrigin, x = typeof x == "string" ? x === "use-credentials" ? x : "" : void 0) : x = null, r.d.C(g, x));
  }, Qe.prefetchDNS = function(g) {
    typeof g == "string" && r.d.D(g);
  }, Qe.preinit = function(g, x) {
    if (typeof g == "string" && x && typeof x.as == "string") {
      var w = x.as, y = p(w, x.crossOrigin), C = typeof x.integrity == "string" ? x.integrity : void 0, E = typeof x.fetchPriority == "string" ? x.fetchPriority : void 0;
      w === "style" ? r.d.S(
        g,
        typeof x.precedence == "string" ? x.precedence : void 0,
        {
          crossOrigin: y,
          integrity: C,
          fetchPriority: E
        }
      ) : w === "script" && r.d.X(g, {
        crossOrigin: y,
        integrity: C,
        fetchPriority: E,
        nonce: typeof x.nonce == "string" ? x.nonce : void 0
      });
    }
  }, Qe.preinitModule = function(g, x) {
    if (typeof g == "string")
      if (typeof x == "object" && x !== null) {
        if (x.as == null || x.as === "script") {
          var w = p(
            x.as,
            x.crossOrigin
          );
          r.d.M(g, {
            crossOrigin: w,
            integrity: typeof x.integrity == "string" ? x.integrity : void 0,
            nonce: typeof x.nonce == "string" ? x.nonce : void 0
          });
        }
      } else x == null && r.d.M(g);
  }, Qe.preload = function(g, x) {
    if (typeof g == "string" && typeof x == "object" && x !== null && typeof x.as == "string") {
      var w = x.as, y = p(w, x.crossOrigin);
      r.d.L(g, w, {
        crossOrigin: y,
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
        var w = p(x.as, x.crossOrigin);
        r.d.m(g, {
          as: typeof x.as == "string" && x.as !== "script" ? x.as : void 0,
          crossOrigin: w,
          integrity: typeof x.integrity == "string" ? x.integrity : void 0
        });
      } else r.d.m(g);
  }, Qe.requestFormReset = function(g) {
    r.d.r(g);
  }, Qe.unstable_batchedUpdates = function(g, x) {
    return g(x);
  }, Qe.useFormState = function(g, x, w) {
    return m.H.useFormState(g, x, w);
  }, Qe.useFormStatus = function() {
    return m.H.useHostTransitionStatus();
  }, Qe.version = "19.2.6", Qe;
}
var dg;
function Rx() {
  if (dg) return dd.exports;
  dg = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), dd.exports = wy(), dd.exports;
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
var fg;
function Sy() {
  if (fg) return Ro;
  fg = 1;
  var a = yy(), i = Hd(), o = Rx();
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
  function w(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = w(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  var y = Object.assign, C = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), B = Symbol.for("react.portal"), M = Symbol.for("react.fragment"), z = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), O = Symbol.for("react.consumer"), k = Symbol.for("react.context"), v = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), Y = Symbol.for("react.activity"), F = Symbol.for("react.memo_cache_sentinel"), et = Symbol.iterator;
  function st(t) {
    return t === null || typeof t != "object" ? null : (t = et && t[et] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var ut = Symbol.for("react.client.reference");
  function ot(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === ut ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case M:
        return "Fragment";
      case A:
        return "Profiler";
      case z:
        return "StrictMode";
      case T:
        return "Suspense";
      case N:
        return "SuspenseList";
      case Y:
        return "Activity";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case B:
          return "Portal";
        case k:
          return t.displayName || "Context";
        case O:
          return (t._context.displayName || "Context") + ".Consumer";
        case v:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case S:
          return e = t.displayName || null, e !== null ? e : ot(t.type) || "Memo";
        case D:
          e = t._payload, t = t._init;
          try {
            return ot(t(e));
          } catch {
          }
      }
    return null;
  }
  var vt = Array.isArray, q = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, W = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ht = [], rt = -1;
  function _(t) {
    return { current: t };
  }
  function Q(t) {
    0 > rt || (t.current = ht[rt], ht[rt] = null, rt--);
  }
  function X(t, e) {
    rt++, ht[rt] = t.current, t.current = e;
  }
  var it = _(null), pt = _(null), St = _(null), At = _(null);
  function at(t, e) {
    switch (X(St, e), X(pt, t), X(it, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? jp(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = jp(e), t = zp(e, t);
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
    Q(it), X(it, t);
  }
  function bt() {
    Q(it), Q(pt), Q(St);
  }
  function re(t) {
    t.memoizedState !== null && X(At, t);
    var e = it.current, n = zp(e, t.type);
    e !== n && (X(pt, t), X(it, n));
  }
  function Vt(t) {
    pt.current === t && (Q(it), Q(pt)), At.current === t && (Q(At), _o._currentValue = $);
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
                  var G = V;
                }
                Reflect.construct(t, [], P);
              } else {
                try {
                  P.call();
                } catch (V) {
                  G = V;
                }
                t.call(P.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (V) {
                G = V;
              }
              (P = t()) && typeof P.catch == "function" && P.catch(function() {
              });
            }
          } catch (V) {
            if (V && G && typeof V.stack == "string")
              return [V.stack, G.stack];
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
`), L = b.split(`
`);
        for (s = l = 0; l < j.length && !j[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; s < L.length && !L[s].includes(
          "DetermineComponentFrameRoot"
        ); )
          s++;
        if (l === j.length || s === L.length)
          for (l = j.length - 1, s = L.length - 1; 1 <= l && 0 <= s && j[l] !== L[s]; )
            s--;
        for (; 1 <= l && 0 <= s; l--, s--)
          if (j[l] !== L[s]) {
            if (l !== 1 || s !== 1)
              do
                if (l--, s--, 0 > s || j[l] !== L[s]) {
                  var K = `
` + j[l].replace(" at new ", " at ");
                  return t.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", t.displayName)), K;
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
  var tt = Object.prototype.hasOwnProperty, Et = a.unstable_scheduleCallback, we = a.unstable_cancelCallback, $n = a.unstable_shouldYield, ba = a.unstable_requestPaint, pe = a.unstable_now, pn = a.unstable_getCurrentPriorityLevel, va = a.unstable_ImmediatePriority, oi = a.unstable_UserBlockingPriority, ri = a.unstable_NormalPriority, or = a.unstable_LowPriority, rr = a.unstable_IdlePriority, sr = a.log, Ks = a.unstable_setDisableYieldValue, Hl = null, nn = null;
  function ya(t) {
    if (typeof sr == "function" && Ks(t), nn && typeof nn.setStrictMode == "function")
      try {
        nn.setStrictMode(Hl, t);
      } catch {
      }
  }
  var an = Math.clz32 ? Math.clz32 : tv, Wb = Math.log, Pb = Math.LN2;
  function tv(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Wb(t) / Pb | 0) | 0;
  }
  var ur = 256, cr = 262144, dr = 4194304;
  function si(t) {
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
  function fr(t, e, n) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var s = 0, u = t.suspendedLanes, h = t.pingedLanes;
    t = t.warmLanes;
    var b = l & 134217727;
    return b !== 0 ? (l = b & ~u, l !== 0 ? s = si(l) : (h &= b, h !== 0 ? s = si(h) : n || (n = b & ~t, n !== 0 && (s = si(n))))) : (b = l & ~u, b !== 0 ? s = si(b) : h !== 0 ? s = si(h) : n || (n = l & ~t, n !== 0 && (s = si(n)))), s === 0 ? 0 : e !== 0 && e !== s && (e & u) === 0 && (u = s & -s, n = e & -e, u >= n || u === 32 && (n & 4194048) !== 0) ? e : s;
  }
  function kl(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function ev(t, e) {
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
  function rf() {
    var t = dr;
    return dr <<= 1, (dr & 62914560) === 0 && (dr = 4194304), t;
  }
  function Zs(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function ql(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function nv(t, e, n, l, s, u) {
    var h = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var b = t.entanglements, j = t.expirationTimes, L = t.hiddenUpdates;
    for (n = h & ~n; 0 < n; ) {
      var K = 31 - an(n), P = 1 << K;
      b[K] = 0, j[K] = -1;
      var G = L[K];
      if (G !== null)
        for (L[K] = null, K = 0; K < G.length; K++) {
          var V = G[K];
          V !== null && (V.lane &= -536870913);
        }
      n &= ~P;
    }
    l !== 0 && sf(t, l, 0), u !== 0 && s === 0 && t.tag !== 0 && (t.suspendedLanes |= u & ~(h & ~e));
  }
  function sf(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var l = 31 - an(e);
    t.entangledLanes |= e, t.entanglements[l] = t.entanglements[l] | 1073741824 | n & 261930;
  }
  function uf(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var l = 31 - an(n), s = 1 << l;
      s & e | t[l] & e && (t[l] |= e), n &= ~s;
    }
  }
  function cf(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : Is(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function Is(t) {
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
  function $s(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function df() {
    var t = W.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Fp(t.type));
  }
  function ff(t, e) {
    var n = W.p;
    try {
      return W.p = t, e();
    } finally {
      W.p = n;
    }
  }
  var wa = Math.random().toString(36).slice(2), He = "__reactFiber$" + wa, $e = "__reactProps$" + wa, ki = "__reactContainer$" + wa, Fs = "__reactEvents$" + wa, av = "__reactListeners$" + wa, iv = "__reactHandles$" + wa, hf = "__reactResources$" + wa, Ul = "__reactMarker$" + wa;
  function Js(t) {
    delete t[He], delete t[$e], delete t[Fs], delete t[av], delete t[iv];
  }
  function qi(t) {
    var e = t[He];
    if (e) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[ki] || n[He]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = Op(t); t !== null; ) {
            if (n = t[He]) return n;
            t = Op(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function Ui(t) {
    if (t = t[He] || t[ki]) {
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
    var e = t[hf];
    return e || (e = t[hf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function De(t) {
    t[Ul] = !0;
  }
  var mf = /* @__PURE__ */ new Set(), pf = {};
  function ui(t, e) {
    Gi(t, e), Gi(t + "Capture", e);
  }
  function Gi(t, e) {
    for (pf[t] = e, t = 0; t < e.length; t++)
      mf.add(e[t]);
  }
  var lv = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), gf = {}, xf = {};
  function ov(t) {
    return tt.call(xf, t) ? !0 : tt.call(gf, t) ? !1 : lv.test(t) ? xf[t] = !0 : (gf[t] = !0, !1);
  }
  function hr(t, e, n) {
    if (ov(e))
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
  function mr(t, e, n) {
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
  function gn(t) {
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
  function bf(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function rv(t, e, n) {
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
  function Ws(t) {
    if (!t._valueTracker) {
      var e = bf(t) ? "checked" : "value";
      t._valueTracker = rv(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function vf(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), l = "";
    return t && (l = bf(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== n ? (e.setValue(t), !0) : !1;
  }
  function pr(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  var sv = /[\n"\\]/g;
  function xn(t) {
    return t.replace(
      sv,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Ps(t, e, n, l, s, u, h, b) {
    t.name = "", h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? t.type = h : t.removeAttribute("type"), e != null ? h === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + gn(e)) : t.value !== "" + gn(e) && (t.value = "" + gn(e)) : h !== "submit" && h !== "reset" || t.removeAttribute("value"), e != null ? tu(t, h, gn(e)) : n != null ? tu(t, h, gn(n)) : l != null && t.removeAttribute("value"), s == null && u != null && (t.defaultChecked = !!u), s != null && (t.checked = s && typeof s != "function" && typeof s != "symbol"), b != null && typeof b != "function" && typeof b != "symbol" && typeof b != "boolean" ? t.name = "" + gn(b) : t.removeAttribute("name");
  }
  function yf(t, e, n, l, s, u, h, b) {
    if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (t.type = u), e != null || n != null) {
      if (!(u !== "submit" && u !== "reset" || e != null)) {
        Ws(t);
        return;
      }
      n = n != null ? "" + gn(n) : "", e = e != null ? "" + gn(e) : n, b || e === t.value || (t.value = e), t.defaultValue = e;
    }
    l = l ?? s, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = b ? t.checked : !!l, t.defaultChecked = !!l, h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" && (t.name = h), Ws(t);
  }
  function tu(t, e, n) {
    e === "number" && pr(t.ownerDocument) === t || t.defaultValue === "" + n || (t.defaultValue = "" + n);
  }
  function Qi(t, e, n, l) {
    if (t = t.options, e) {
      e = {};
      for (var s = 0; s < n.length; s++)
        e["$" + n[s]] = !0;
      for (n = 0; n < t.length; n++)
        s = e.hasOwnProperty("$" + t[n].value), t[n].selected !== s && (t[n].selected = s), s && l && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + gn(n), e = null, s = 0; s < t.length; s++) {
        if (t[s].value === n) {
          t[s].selected = !0, l && (t[s].defaultSelected = !0);
          return;
        }
        e !== null || t[s].disabled || (e = t[s]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function wf(t, e, n) {
    if (e != null && (e = "" + gn(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + gn(n) : "";
  }
  function Sf(t, e, n, l) {
    if (e == null) {
      if (l != null) {
        if (n != null) throw Error(r(92));
        if (vt(l)) {
          if (1 < l.length) throw Error(r(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), e = n;
    }
    n = gn(e), t.defaultValue = n, l = t.textContent, l === n && l !== "" && l !== null && (t.value = l), Ws(t);
  }
  function Yi(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var uv = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Cf(t, e, n) {
    var l = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : l ? t.setProperty(e, n) : typeof n != "number" || n === 0 || uv.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Tf(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(r(62));
    if (t = t.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || e != null && e.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
      for (var s in e)
        l = e[s], e.hasOwnProperty(s) && n[s] !== l && Cf(t, s, l);
    } else
      for (var u in e)
        e.hasOwnProperty(u) && Cf(t, u, e[u]);
  }
  function eu(t) {
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
  var cv = /* @__PURE__ */ new Map([
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
  ]), dv = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function gr(t) {
    return dv.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function Jn() {
  }
  var nu = null;
  function au(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Vi = null, Xi = null;
  function _f(t) {
    var e = Ui(t);
    if (e && (t = e.stateNode)) {
      var n = t[$e] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Ps(
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
              'input[name="' + xn(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var l = n[e];
              if (l !== t && l.form === t.form) {
                var s = l[$e] || null;
                if (!s) throw Error(r(90));
                Ps(
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
              l = n[e], l.form === t.form && vf(l);
          }
          break t;
        case "textarea":
          wf(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && Qi(t, !!n.multiple, e, !1);
      }
    }
  }
  var iu = !1;
  function jf(t, e, n) {
    if (iu) return t(e, n);
    iu = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (iu = !1, (Vi !== null || Xi !== null) && (as(), Vi && (e = Vi, t = Xi, Xi = Vi = null, _f(e), t)))
        for (e = 0; e < t.length; e++) _f(t[e]);
    }
  }
  function Gl(t, e) {
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
  var Wn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), lu = !1;
  if (Wn)
    try {
      var Ql = {};
      Object.defineProperty(Ql, "passive", {
        get: function() {
          lu = !0;
        }
      }), window.addEventListener("test", Ql, Ql), window.removeEventListener("test", Ql, Ql);
    } catch {
      lu = !1;
    }
  var Sa = null, ou = null, xr = null;
  function zf() {
    if (xr) return xr;
    var t, e = ou, n = e.length, l, s = "value" in Sa ? Sa.value : Sa.textContent, u = s.length;
    for (t = 0; t < n && e[t] === s[t]; t++) ;
    var h = n - t;
    for (l = 1; l <= h && e[n - l] === s[u - l]; l++) ;
    return xr = s.slice(t, 1 < l ? 1 - l : void 0);
  }
  function br(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function vr() {
    return !0;
  }
  function Af() {
    return !1;
  }
  function Fe(t) {
    function e(n, l, s, u, h) {
      this._reactName = n, this._targetInst = s, this.type = l, this.nativeEvent = u, this.target = h, this.currentTarget = null;
      for (var b in t)
        t.hasOwnProperty(b) && (n = t[b], this[b] = n ? n(u) : u[b]);
      return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? vr : Af, this.isPropagationStopped = Af, this;
    }
    return y(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = vr);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = vr);
      },
      persist: function() {
      },
      isPersistent: vr
    }), e;
  }
  var ci = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, yr = Fe(ci), Yl = y({}, ci, { view: 0, detail: 0 }), fv = Fe(Yl), ru, su, Vl, wr = y({}, Yl, {
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
    getModifierState: cu,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Vl && (Vl && t.type === "mousemove" ? (ru = t.screenX - Vl.screenX, su = t.screenY - Vl.screenY) : su = ru = 0, Vl = t), ru);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : su;
    }
  }), Ef = Fe(wr), hv = y({}, wr, { dataTransfer: 0 }), mv = Fe(hv), pv = y({}, Yl, { relatedTarget: 0 }), uu = Fe(pv), gv = y({}, ci, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), xv = Fe(gv), bv = y({}, ci, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), vv = Fe(bv), yv = y({}, ci, { data: 0 }), Rf = Fe(yv), wv = {
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
  }, Sv = {
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
  }, Cv = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Tv(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = Cv[t]) ? !!e[t] : !1;
  }
  function cu() {
    return Tv;
  }
  var _v = y({}, Yl, {
    key: function(t) {
      if (t.key) {
        var e = wv[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = br(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? Sv[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: cu,
    charCode: function(t) {
      return t.type === "keypress" ? br(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? br(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), jv = Fe(_v), zv = y({}, wr, {
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
  }), Nf = Fe(zv), Av = y({}, Yl, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: cu
  }), Ev = Fe(Av), Rv = y({}, ci, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Nv = Fe(Rv), Mv = y({}, wr, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Dv = Fe(Mv), Ov = y({}, ci, {
    newState: 0,
    oldState: 0
  }), Bv = Fe(Ov), Hv = [9, 13, 27, 32], du = Wn && "CompositionEvent" in window, Xl = null;
  Wn && "documentMode" in document && (Xl = document.documentMode);
  var kv = Wn && "TextEvent" in window && !Xl, Mf = Wn && (!du || Xl && 8 < Xl && 11 >= Xl), Df = " ", Of = !1;
  function Bf(t, e) {
    switch (t) {
      case "keyup":
        return Hv.indexOf(e.keyCode) !== -1;
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
  function Hf(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Ki = !1;
  function qv(t, e) {
    switch (t) {
      case "compositionend":
        return Hf(e);
      case "keypress":
        return e.which !== 32 ? null : (Of = !0, Df);
      case "textInput":
        return t = e.data, t === Df && Of ? null : t;
      default:
        return null;
    }
  }
  function Uv(t, e) {
    if (Ki)
      return t === "compositionend" || !du && Bf(t, e) ? (t = zf(), xr = ou = Sa = null, Ki = !1, t) : null;
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
        return Mf && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var Lv = {
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
  function kf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!Lv[t.type] : e === "textarea";
  }
  function qf(t, e, n, l) {
    Vi ? Xi ? Xi.push(l) : Xi = [l] : Vi = l, e = cs(e, "onChange"), 0 < e.length && (n = new yr(
      "onChange",
      "change",
      null,
      n,
      l
    ), t.push({ event: n, listeners: e }));
  }
  var Kl = null, Zl = null;
  function Gv(t) {
    yp(t, 0);
  }
  function Sr(t) {
    var e = Ll(t);
    if (vf(e)) return t;
  }
  function Uf(t, e) {
    if (t === "change") return e;
  }
  var Lf = !1;
  if (Wn) {
    var fu;
    if (Wn) {
      var hu = "oninput" in document;
      if (!hu) {
        var Gf = document.createElement("div");
        Gf.setAttribute("oninput", "return;"), hu = typeof Gf.oninput == "function";
      }
      fu = hu;
    } else fu = !1;
    Lf = fu && (!document.documentMode || 9 < document.documentMode);
  }
  function Qf() {
    Kl && (Kl.detachEvent("onpropertychange", Yf), Zl = Kl = null);
  }
  function Yf(t) {
    if (t.propertyName === "value" && Sr(Zl)) {
      var e = [];
      qf(
        e,
        Zl,
        t,
        au(t)
      ), jf(Gv, e);
    }
  }
  function Qv(t, e, n) {
    t === "focusin" ? (Qf(), Kl = e, Zl = n, Kl.attachEvent("onpropertychange", Yf)) : t === "focusout" && Qf();
  }
  function Yv(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Sr(Zl);
  }
  function Vv(t, e) {
    if (t === "click") return Sr(e);
  }
  function Xv(t, e) {
    if (t === "input" || t === "change")
      return Sr(e);
  }
  function Kv(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var ln = typeof Object.is == "function" ? Object.is : Kv;
  function Il(t, e) {
    if (ln(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), l = Object.keys(e);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var s = n[l];
      if (!tt.call(e, s) || !ln(t[s], e[s]))
        return !1;
    }
    return !0;
  }
  function Vf(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Xf(t, e) {
    var n = Vf(t);
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
      n = Vf(n);
    }
  }
  function Kf(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Kf(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Zf(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = pr(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = pr(t.document);
    }
    return e;
  }
  function mu(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Zv = Wn && "documentMode" in document && 11 >= document.documentMode, Zi = null, pu = null, $l = null, gu = !1;
  function If(t, e, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    gu || Zi == null || Zi !== pr(l) || (l = Zi, "selectionStart" in l && mu(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), $l && Il($l, l) || ($l = l, l = cs(pu, "onSelect"), 0 < l.length && (e = new yr(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }), e.target = Zi)));
  }
  function di(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var Ii = {
    animationend: di("Animation", "AnimationEnd"),
    animationiteration: di("Animation", "AnimationIteration"),
    animationstart: di("Animation", "AnimationStart"),
    transitionrun: di("Transition", "TransitionRun"),
    transitionstart: di("Transition", "TransitionStart"),
    transitioncancel: di("Transition", "TransitionCancel"),
    transitionend: di("Transition", "TransitionEnd")
  }, xu = {}, $f = {};
  Wn && ($f = document.createElement("div").style, "AnimationEvent" in window || (delete Ii.animationend.animation, delete Ii.animationiteration.animation, delete Ii.animationstart.animation), "TransitionEvent" in window || delete Ii.transitionend.transition);
  function fi(t) {
    if (xu[t]) return xu[t];
    if (!Ii[t]) return t;
    var e = Ii[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in $f)
        return xu[t] = e[n];
    return t;
  }
  var Ff = fi("animationend"), Jf = fi("animationiteration"), Wf = fi("animationstart"), Iv = fi("transitionrun"), $v = fi("transitionstart"), Fv = fi("transitioncancel"), Pf = fi("transitionend"), th = /* @__PURE__ */ new Map(), bu = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  bu.push("scrollEnd");
  function Rn(t, e) {
    th.set(t, e), ui(e, [t]);
  }
  var Cr = typeof reportError == "function" ? reportError : function(t) {
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
  }, bn = [], $i = 0, vu = 0;
  function Tr() {
    for (var t = $i, e = vu = $i = 0; e < t; ) {
      var n = bn[e];
      bn[e++] = null;
      var l = bn[e];
      bn[e++] = null;
      var s = bn[e];
      bn[e++] = null;
      var u = bn[e];
      if (bn[e++] = null, l !== null && s !== null) {
        var h = l.pending;
        h === null ? s.next = s : (s.next = h.next, h.next = s), l.pending = s;
      }
      u !== 0 && eh(n, s, u);
    }
  }
  function _r(t, e, n, l) {
    bn[$i++] = t, bn[$i++] = e, bn[$i++] = n, bn[$i++] = l, vu |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function yu(t, e, n, l) {
    return _r(t, e, n, l), jr(t);
  }
  function hi(t, e) {
    return _r(t, null, null, e), jr(t);
  }
  function eh(t, e, n) {
    t.lanes |= n;
    var l = t.alternate;
    l !== null && (l.lanes |= n);
    for (var s = !1, u = t.return; u !== null; )
      u.childLanes |= n, l = u.alternate, l !== null && (l.childLanes |= n), u.tag === 22 && (t = u.stateNode, t === null || t._visibility & 1 || (s = !0)), t = u, u = u.return;
    return t.tag === 3 ? (u = t.stateNode, s && e !== null && (s = 31 - an(n), t = u.hiddenUpdates, l = t[s], l === null ? t[s] = [e] : l.push(e), e.lane = n | 536870912), u) : null;
  }
  function jr(t) {
    if (50 < bo)
      throw bo = 0, Ec = null, Error(r(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Fi = {};
  function Jv(t, e, n, l) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function on(t, e, n, l) {
    return new Jv(t, e, n, l);
  }
  function wu(t) {
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
  function nh(t, e) {
    t.flags &= 65011714;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function zr(t, e, n, l, s, u) {
    var h = 0;
    if (l = t, typeof t == "function") wu(t) && (h = 1);
    else if (typeof t == "string")
      h = ny(
        t,
        n,
        it.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (t) {
        case Y:
          return t = on(31, n, e, s), t.elementType = Y, t.lanes = u, t;
        case M:
          return mi(n.children, s, u, e);
        case z:
          h = 8, s |= 24;
          break;
        case A:
          return t = on(12, n, e, s | 2), t.elementType = A, t.lanes = u, t;
        case T:
          return t = on(13, n, e, s), t.elementType = T, t.lanes = u, t;
        case N:
          return t = on(19, n, e, s), t.elementType = N, t.lanes = u, t;
        default:
          if (typeof t == "object" && t !== null)
            switch (t.$$typeof) {
              case k:
                h = 10;
                break t;
              case O:
                h = 9;
                break t;
              case v:
                h = 11;
                break t;
              case S:
                h = 14;
                break t;
              case D:
                h = 16, l = null;
                break t;
            }
          h = 29, n = Error(
            r(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return e = on(h, n, e, s), e.elementType = t, e.type = l, e.lanes = u, e;
  }
  function mi(t, e, n, l) {
    return t = on(7, t, l, e), t.lanes = n, t;
  }
  function Su(t, e, n) {
    return t = on(6, t, null, e), t.lanes = n, t;
  }
  function ah(t) {
    var e = on(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Cu(t, e, n) {
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
  var ih = /* @__PURE__ */ new WeakMap();
  function vn(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = ih.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Wt(e)
      }, ih.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Wt(e)
    };
  }
  var Ji = [], Wi = 0, Ar = null, Fl = 0, yn = [], wn = 0, Ca = null, qn = 1, Un = "";
  function ta(t, e) {
    Ji[Wi++] = Fl, Ji[Wi++] = Ar, Ar = t, Fl = e;
  }
  function lh(t, e, n) {
    yn[wn++] = qn, yn[wn++] = Un, yn[wn++] = Ca, Ca = t;
    var l = qn;
    t = Un;
    var s = 32 - an(l) - 1;
    l &= ~(1 << s), n += 1;
    var u = 32 - an(e) + s;
    if (30 < u) {
      var h = s - s % 5;
      u = (l & (1 << h) - 1).toString(32), l >>= h, s -= h, qn = 1 << 32 - an(e) + s | n << s | l, Un = u + t;
    } else
      qn = 1 << u | n << s | l, Un = t;
  }
  function Tu(t) {
    t.return !== null && (ta(t, 1), lh(t, 1, 0));
  }
  function _u(t) {
    for (; t === Ar; )
      Ar = Ji[--Wi], Ji[Wi] = null, Fl = Ji[--Wi], Ji[Wi] = null;
    for (; t === Ca; )
      Ca = yn[--wn], yn[wn] = null, Un = yn[--wn], yn[wn] = null, qn = yn[--wn], yn[wn] = null;
  }
  function oh(t, e) {
    yn[wn++] = qn, yn[wn++] = Un, yn[wn++] = Ca, qn = e.id, Un = e.overflow, Ca = t;
  }
  var ke = null, ue = null, Qt = !1, Ta = null, Sn = !1, ju = Error(r(519));
  function _a(t) {
    var e = Error(
      r(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Jl(vn(e, t)), ju;
  }
  function rh(t) {
    var e = t.stateNode, n = t.type, l = t.memoizedProps;
    switch (e[He] = t, e[$e] = l, n) {
      case "dialog":
        kt("cancel", e), kt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        kt("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < yo.length; n++)
          kt(yo[n], e);
        break;
      case "source":
        kt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        kt("error", e), kt("load", e);
        break;
      case "details":
        kt("toggle", e);
        break;
      case "input":
        kt("invalid", e), yf(
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
        kt("invalid", e);
        break;
      case "textarea":
        kt("invalid", e), Sf(e, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || l.suppressHydrationWarning === !0 || Tp(e.textContent, n) ? (l.popover != null && (kt("beforetoggle", e), kt("toggle", e)), l.onScroll != null && kt("scroll", e), l.onScrollEnd != null && kt("scrollend", e), l.onClick != null && (e.onclick = Jn), e = !0) : e = !1, e || _a(t, !0);
  }
  function sh(t) {
    for (ke = t.return; ke; )
      switch (ke.tag) {
        case 5:
        case 31:
        case 13:
          Sn = !1;
          return;
        case 27:
        case 3:
          Sn = !0;
          return;
        default:
          ke = ke.return;
      }
  }
  function Pi(t) {
    if (t !== ke) return !1;
    if (!Qt) return sh(t), Qt = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || Vc(t.type, t.memoizedProps)), n = !n), n && ue && _a(t), sh(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      ue = Dp(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(317));
      ue = Dp(t);
    } else
      e === 27 ? (e = ue, Ua(t.type) ? (t = $c, $c = null, ue = t) : ue = e) : ue = ke ? Tn(t.stateNode.nextSibling) : null;
    return !0;
  }
  function pi() {
    ue = ke = null, Qt = !1;
  }
  function zu() {
    var t = Ta;
    return t !== null && (tn === null ? tn = t : tn.push.apply(
      tn,
      t
    ), Ta = null), t;
  }
  function Jl(t) {
    Ta === null ? Ta = [t] : Ta.push(t);
  }
  var Au = _(null), gi = null, ea = null;
  function ja(t, e, n) {
    X(Au, e._currentValue), e._currentValue = n;
  }
  function na(t) {
    t._currentValue = Au.current, Q(Au);
  }
  function Eu(t, e, n) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, l !== null && (l.childLanes |= e)) : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function Ru(t, e, n, l) {
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
              u.lanes |= n, b = u.alternate, b !== null && (b.lanes |= n), Eu(
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
        h.lanes |= n, u = h.alternate, u !== null && (u.lanes |= n), Eu(h, n, t), h = null;
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
  function tl(t, e, n, l) {
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
        h.memoizedState.memoizedState !== s.memoizedState.memoizedState && (t !== null ? t.push(_o) : t = [_o]);
      }
      s = s.return;
    }
    t !== null && Ru(
      e,
      t,
      n,
      l
    ), e.flags |= 262144;
  }
  function Er(t) {
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
  function xi(t) {
    gi = t, ea = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function qe(t) {
    return uh(gi, t);
  }
  function Rr(t, e) {
    return gi === null && xi(t), uh(t, e);
  }
  function uh(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, ea === null) {
      if (t === null) throw Error(r(308));
      ea = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else ea = ea.next = e;
    return n;
  }
  var Wv = typeof AbortController < "u" ? AbortController : function() {
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
  }, Pv = a.unstable_scheduleCallback, t0 = a.unstable_NormalPriority, Te = {
    $$typeof: k,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Nu() {
    return {
      controller: new Wv(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Wl(t) {
    t.refCount--, t.refCount === 0 && Pv(t0, function() {
      t.controller.abort();
    });
  }
  var Pl = null, Mu = 0, el = 0, nl = null;
  function e0(t, e) {
    if (Pl === null) {
      var n = Pl = [];
      Mu = 0, el = Bc(), nl = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return Mu++, e.then(ch, ch), e;
  }
  function ch() {
    if (--Mu === 0 && Pl !== null) {
      nl !== null && (nl.status = "fulfilled");
      var t = Pl;
      Pl = null, el = 0, nl = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function n0(t, e) {
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
  var dh = q.S;
  q.S = function(t, e) {
    Im = pe(), typeof e == "object" && e !== null && typeof e.then == "function" && e0(t, e), dh !== null && dh(t, e);
  };
  var bi = _(null);
  function Du() {
    var t = bi.current;
    return t !== null ? t : se.pooledCache;
  }
  function Nr(t, e) {
    e === null ? X(bi, bi.current) : X(bi, e.pool);
  }
  function fh() {
    var t = Du();
    return t === null ? null : { parent: Te._currentValue, pool: t };
  }
  var al = Error(r(460)), Ou = Error(r(474)), Mr = Error(r(542)), Dr = { then: function() {
  } };
  function hh(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function mh(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(Jn, Jn), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, gh(t), t;
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
            throw t = e.reason, gh(t), t;
        }
        throw yi = e, al;
    }
  }
  function vi(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (yi = n, al) : n;
    }
  }
  var yi = null;
  function ph() {
    if (yi === null) throw Error(r(459));
    var t = yi;
    return yi = null, t;
  }
  function gh(t) {
    if (t === al || t === Mr)
      throw Error(r(483));
  }
  var il = null, to = 0;
  function Or(t) {
    var e = to;
    return to += 1, il === null && (il = []), mh(il, t, e);
  }
  function eo(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Br(t, e) {
    throw e.$$typeof === C ? Error(r(525)) : (t = Object.prototype.toString.call(e), Error(
      r(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function xh(t) {
    function e(H, R) {
      if (t) {
        var U = H.deletions;
        U === null ? (H.deletions = [R], H.flags |= 16) : U.push(R);
      }
    }
    function n(H, R) {
      if (!t) return null;
      for (; R !== null; )
        e(H, R), R = R.sibling;
      return null;
    }
    function l(H) {
      for (var R = /* @__PURE__ */ new Map(); H !== null; )
        H.key !== null ? R.set(H.key, H) : R.set(H.index, H), H = H.sibling;
      return R;
    }
    function s(H, R) {
      return H = Pn(H, R), H.index = 0, H.sibling = null, H;
    }
    function u(H, R, U) {
      return H.index = U, t ? (U = H.alternate, U !== null ? (U = U.index, U < R ? (H.flags |= 67108866, R) : U) : (H.flags |= 67108866, R)) : (H.flags |= 1048576, R);
    }
    function h(H) {
      return t && H.alternate === null && (H.flags |= 67108866), H;
    }
    function b(H, R, U, J) {
      return R === null || R.tag !== 6 ? (R = Su(U, H.mode, J), R.return = H, R) : (R = s(R, U), R.return = H, R);
    }
    function j(H, R, U, J) {
      var yt = U.type;
      return yt === M ? K(
        H,
        R,
        U.props.children,
        J,
        U.key
      ) : R !== null && (R.elementType === yt || typeof yt == "object" && yt !== null && yt.$$typeof === D && vi(yt) === R.type) ? (R = s(R, U.props), eo(R, U), R.return = H, R) : (R = zr(
        U.type,
        U.key,
        U.props,
        null,
        H.mode,
        J
      ), eo(R, U), R.return = H, R);
    }
    function L(H, R, U, J) {
      return R === null || R.tag !== 4 || R.stateNode.containerInfo !== U.containerInfo || R.stateNode.implementation !== U.implementation ? (R = Cu(U, H.mode, J), R.return = H, R) : (R = s(R, U.children || []), R.return = H, R);
    }
    function K(H, R, U, J, yt) {
      return R === null || R.tag !== 7 ? (R = mi(
        U,
        H.mode,
        J,
        yt
      ), R.return = H, R) : (R = s(R, U), R.return = H, R);
    }
    function P(H, R, U) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return R = Su(
          "" + R,
          H.mode,
          U
        ), R.return = H, R;
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case E:
            return U = zr(
              R.type,
              R.key,
              R.props,
              null,
              H.mode,
              U
            ), eo(U, R), U.return = H, U;
          case B:
            return R = Cu(
              R,
              H.mode,
              U
            ), R.return = H, R;
          case D:
            return R = vi(R), P(H, R, U);
        }
        if (vt(R) || st(R))
          return R = mi(
            R,
            H.mode,
            U,
            null
          ), R.return = H, R;
        if (typeof R.then == "function")
          return P(H, Or(R), U);
        if (R.$$typeof === k)
          return P(
            H,
            Rr(H, R),
            U
          );
        Br(H, R);
      }
      return null;
    }
    function G(H, R, U, J) {
      var yt = R !== null ? R.key : null;
      if (typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint")
        return yt !== null ? null : b(H, R, "" + U, J);
      if (typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case E:
            return U.key === yt ? j(H, R, U, J) : null;
          case B:
            return U.key === yt ? L(H, R, U, J) : null;
          case D:
            return U = vi(U), G(H, R, U, J);
        }
        if (vt(U) || st(U))
          return yt !== null ? null : K(H, R, U, J, null);
        if (typeof U.then == "function")
          return G(
            H,
            R,
            Or(U),
            J
          );
        if (U.$$typeof === k)
          return G(
            H,
            R,
            Rr(H, U),
            J
          );
        Br(H, U);
      }
      return null;
    }
    function V(H, R, U, J, yt) {
      if (typeof J == "string" && J !== "" || typeof J == "number" || typeof J == "bigint")
        return H = H.get(U) || null, b(R, H, "" + J, yt);
      if (typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case E:
            return H = H.get(
              J.key === null ? U : J.key
            ) || null, j(R, H, J, yt);
          case B:
            return H = H.get(
              J.key === null ? U : J.key
            ) || null, L(R, H, J, yt);
          case D:
            return J = vi(J), V(
              H,
              R,
              U,
              J,
              yt
            );
        }
        if (vt(J) || st(J))
          return H = H.get(U) || null, K(R, H, J, yt, null);
        if (typeof J.then == "function")
          return V(
            H,
            R,
            U,
            Or(J),
            yt
          );
        if (J.$$typeof === k)
          return V(
            H,
            R,
            U,
            Rr(R, J),
            yt
          );
        Br(R, J);
      }
      return null;
    }
    function mt(H, R, U, J) {
      for (var yt = null, Zt = null, gt = R, Mt = R = 0, Lt = null; gt !== null && Mt < U.length; Mt++) {
        gt.index > Mt ? (Lt = gt, gt = null) : Lt = gt.sibling;
        var It = G(
          H,
          gt,
          U[Mt],
          J
        );
        if (It === null) {
          gt === null && (gt = Lt);
          break;
        }
        t && gt && It.alternate === null && e(H, gt), R = u(It, R, Mt), Zt === null ? yt = It : Zt.sibling = It, Zt = It, gt = Lt;
      }
      if (Mt === U.length)
        return n(H, gt), Qt && ta(H, Mt), yt;
      if (gt === null) {
        for (; Mt < U.length; Mt++)
          gt = P(H, U[Mt], J), gt !== null && (R = u(
            gt,
            R,
            Mt
          ), Zt === null ? yt = gt : Zt.sibling = gt, Zt = gt);
        return Qt && ta(H, Mt), yt;
      }
      for (gt = l(gt); Mt < U.length; Mt++)
        Lt = V(
          gt,
          H,
          Mt,
          U[Mt],
          J
        ), Lt !== null && (t && Lt.alternate !== null && gt.delete(
          Lt.key === null ? Mt : Lt.key
        ), R = u(
          Lt,
          R,
          Mt
        ), Zt === null ? yt = Lt : Zt.sibling = Lt, Zt = Lt);
      return t && gt.forEach(function(Va) {
        return e(H, Va);
      }), Qt && ta(H, Mt), yt;
    }
    function Ct(H, R, U, J) {
      if (U == null) throw Error(r(151));
      for (var yt = null, Zt = null, gt = R, Mt = R = 0, Lt = null, It = U.next(); gt !== null && !It.done; Mt++, It = U.next()) {
        gt.index > Mt ? (Lt = gt, gt = null) : Lt = gt.sibling;
        var Va = G(H, gt, It.value, J);
        if (Va === null) {
          gt === null && (gt = Lt);
          break;
        }
        t && gt && Va.alternate === null && e(H, gt), R = u(Va, R, Mt), Zt === null ? yt = Va : Zt.sibling = Va, Zt = Va, gt = Lt;
      }
      if (It.done)
        return n(H, gt), Qt && ta(H, Mt), yt;
      if (gt === null) {
        for (; !It.done; Mt++, It = U.next())
          It = P(H, It.value, J), It !== null && (R = u(It, R, Mt), Zt === null ? yt = It : Zt.sibling = It, Zt = It);
        return Qt && ta(H, Mt), yt;
      }
      for (gt = l(gt); !It.done; Mt++, It = U.next())
        It = V(gt, H, Mt, It.value, J), It !== null && (t && It.alternate !== null && gt.delete(It.key === null ? Mt : It.key), R = u(It, R, Mt), Zt === null ? yt = It : Zt.sibling = It, Zt = It);
      return t && gt.forEach(function(hy) {
        return e(H, hy);
      }), Qt && ta(H, Mt), yt;
    }
    function le(H, R, U, J) {
      if (typeof U == "object" && U !== null && U.type === M && U.key === null && (U = U.props.children), typeof U == "object" && U !== null) {
        switch (U.$$typeof) {
          case E:
            t: {
              for (var yt = U.key; R !== null; ) {
                if (R.key === yt) {
                  if (yt = U.type, yt === M) {
                    if (R.tag === 7) {
                      n(
                        H,
                        R.sibling
                      ), J = s(
                        R,
                        U.props.children
                      ), J.return = H, H = J;
                      break t;
                    }
                  } else if (R.elementType === yt || typeof yt == "object" && yt !== null && yt.$$typeof === D && vi(yt) === R.type) {
                    n(
                      H,
                      R.sibling
                    ), J = s(R, U.props), eo(J, U), J.return = H, H = J;
                    break t;
                  }
                  n(H, R);
                  break;
                } else e(H, R);
                R = R.sibling;
              }
              U.type === M ? (J = mi(
                U.props.children,
                H.mode,
                J,
                U.key
              ), J.return = H, H = J) : (J = zr(
                U.type,
                U.key,
                U.props,
                null,
                H.mode,
                J
              ), eo(J, U), J.return = H, H = J);
            }
            return h(H);
          case B:
            t: {
              for (yt = U.key; R !== null; ) {
                if (R.key === yt)
                  if (R.tag === 4 && R.stateNode.containerInfo === U.containerInfo && R.stateNode.implementation === U.implementation) {
                    n(
                      H,
                      R.sibling
                    ), J = s(R, U.children || []), J.return = H, H = J;
                    break t;
                  } else {
                    n(H, R);
                    break;
                  }
                else e(H, R);
                R = R.sibling;
              }
              J = Cu(U, H.mode, J), J.return = H, H = J;
            }
            return h(H);
          case D:
            return U = vi(U), le(
              H,
              R,
              U,
              J
            );
        }
        if (vt(U))
          return mt(
            H,
            R,
            U,
            J
          );
        if (st(U)) {
          if (yt = st(U), typeof yt != "function") throw Error(r(150));
          return U = yt.call(U), Ct(
            H,
            R,
            U,
            J
          );
        }
        if (typeof U.then == "function")
          return le(
            H,
            R,
            Or(U),
            J
          );
        if (U.$$typeof === k)
          return le(
            H,
            R,
            Rr(H, U),
            J
          );
        Br(H, U);
      }
      return typeof U == "string" && U !== "" || typeof U == "number" || typeof U == "bigint" ? (U = "" + U, R !== null && R.tag === 6 ? (n(H, R.sibling), J = s(R, U), J.return = H, H = J) : (n(H, R), J = Su(U, H.mode, J), J.return = H, H = J), h(H)) : n(H, R);
    }
    return function(H, R, U, J) {
      try {
        to = 0;
        var yt = le(
          H,
          R,
          U,
          J
        );
        return il = null, yt;
      } catch (gt) {
        if (gt === al || gt === Mr) throw gt;
        var Zt = on(29, gt, null, H.mode);
        return Zt.lanes = J, Zt.return = H, Zt;
      } finally {
      }
    };
  }
  var wi = xh(!0), bh = xh(!1), za = !1;
  function Bu(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Hu(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function Aa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function Ea(t, e, n) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (Ft & 2) !== 0) {
      var s = l.pending;
      return s === null ? e.next = e : (e.next = s.next, s.next = e), l.pending = e, e = jr(t), eh(t, null, n), e;
    }
    return _r(t, l, e, n), jr(t);
  }
  function no(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, uf(t, n);
    }
  }
  function ku(t, e) {
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
  var qu = !1;
  function ao() {
    if (qu) {
      var t = nl;
      if (t !== null) throw t;
    }
  }
  function io(t, e, n, l) {
    qu = !1;
    var s = t.updateQueue;
    za = !1;
    var u = s.firstBaseUpdate, h = s.lastBaseUpdate, b = s.shared.pending;
    if (b !== null) {
      s.shared.pending = null;
      var j = b, L = j.next;
      j.next = null, h === null ? u = L : h.next = L, h = j;
      var K = t.alternate;
      K !== null && (K = K.updateQueue, b = K.lastBaseUpdate, b !== h && (b === null ? K.firstBaseUpdate = L : b.next = L, K.lastBaseUpdate = j));
    }
    if (u !== null) {
      var P = s.baseState;
      h = 0, K = L = j = null, b = u;
      do {
        var G = b.lane & -536870913, V = G !== b.lane;
        if (V ? (Ut & G) === G : (l & G) === G) {
          G !== 0 && G === el && (qu = !0), K !== null && (K = K.next = {
            lane: 0,
            tag: b.tag,
            payload: b.payload,
            callback: null,
            next: null
          });
          t: {
            var mt = t, Ct = b;
            G = e;
            var le = n;
            switch (Ct.tag) {
              case 1:
                if (mt = Ct.payload, typeof mt == "function") {
                  P = mt.call(le, P, G);
                  break t;
                }
                P = mt;
                break t;
              case 3:
                mt.flags = mt.flags & -65537 | 128;
              case 0:
                if (mt = Ct.payload, G = typeof mt == "function" ? mt.call(le, P, G) : mt, G == null) break t;
                P = y({}, P, G);
                break t;
              case 2:
                za = !0;
            }
          }
          G = b.callback, G !== null && (t.flags |= 64, V && (t.flags |= 8192), V = s.callbacks, V === null ? s.callbacks = [G] : V.push(G));
        } else
          V = {
            lane: G,
            tag: b.tag,
            payload: b.payload,
            callback: b.callback,
            next: null
          }, K === null ? (L = K = V, j = P) : K = K.next = V, h |= G;
        if (b = b.next, b === null) {
          if (b = s.shared.pending, b === null)
            break;
          V = b, b = V.next, V.next = null, s.lastBaseUpdate = V, s.shared.pending = null;
        }
      } while (!0);
      K === null && (j = P), s.baseState = j, s.firstBaseUpdate = L, s.lastBaseUpdate = K, u === null && (s.shared.lanes = 0), Oa |= h, t.lanes = h, t.memoizedState = P;
    }
  }
  function vh(t, e) {
    if (typeof t != "function")
      throw Error(r(191, t));
    t.call(e);
  }
  function yh(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        vh(n[t], e);
  }
  var ll = _(null), Hr = _(0);
  function wh(t, e) {
    t = da, X(Hr, t), X(ll, e), da = t | e.baseLanes;
  }
  function Uu() {
    X(Hr, da), X(ll, ll.current);
  }
  function Lu() {
    da = Hr.current, Q(ll), Q(Hr);
  }
  var rn = _(null), Cn = null;
  function Ra(t) {
    var e = t.alternate;
    X(Se, Se.current & 1), X(rn, t), Cn === null && (e === null || ll.current !== null || e.memoizedState !== null) && (Cn = t);
  }
  function Gu(t) {
    X(Se, Se.current), X(rn, t), Cn === null && (Cn = t);
  }
  function Sh(t) {
    t.tag === 22 ? (X(Se, Se.current), X(rn, t), Cn === null && (Cn = t)) : Na();
  }
  function Na() {
    X(Se, Se.current), X(rn, rn.current);
  }
  function sn(t) {
    Q(rn), Cn === t && (Cn = null), Q(Se);
  }
  var Se = _(0);
  function kr(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Zc(n) || Ic(n)))
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
  var aa = 0, Nt = null, ae = null, _e = null, qr = !1, ol = !1, Si = !1, Ur = 0, lo = 0, rl = null, a0 = 0;
  function be() {
    throw Error(r(321));
  }
  function Qu(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!ln(t[n], e[n])) return !1;
    return !0;
  }
  function Yu(t, e, n, l, s, u) {
    return aa = u, Nt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, q.H = t === null || t.memoizedState === null ? lm : ic, Si = !1, u = n(l, s), Si = !1, ol && (u = Th(
      e,
      n,
      l,
      s
    )), Ch(t), u;
  }
  function Ch(t) {
    q.H = so;
    var e = ae !== null && ae.next !== null;
    if (aa = 0, _e = ae = Nt = null, qr = !1, lo = 0, rl = null, e) throw Error(r(300));
    t === null || je || (t = t.dependencies, t !== null && Er(t) && (je = !0));
  }
  function Th(t, e, n, l) {
    Nt = t;
    var s = 0;
    do {
      if (ol && (rl = null), lo = 0, ol = !1, 25 <= s) throw Error(r(301));
      if (s += 1, _e = ae = null, t.updateQueue != null) {
        var u = t.updateQueue;
        u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0);
      }
      q.H = om, u = e(n, l);
    } while (ol);
    return u;
  }
  function i0() {
    var t = q.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? oo(e) : e, t = t.useState()[0], (ae !== null ? ae.memoizedState : null) !== t && (Nt.flags |= 1024), e;
  }
  function Vu() {
    var t = Ur !== 0;
    return Ur = 0, t;
  }
  function Xu(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function Ku(t) {
    if (qr) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      qr = !1;
    }
    aa = 0, _e = ae = Nt = null, ol = !1, lo = Ur = 0, rl = null;
  }
  function Ke() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return _e === null ? Nt.memoizedState = _e = t : _e = _e.next = t, _e;
  }
  function Ce() {
    if (ae === null) {
      var t = Nt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = ae.next;
    var e = _e === null ? Nt.memoizedState : _e.next;
    if (e !== null)
      _e = e, ae = t;
    else {
      if (t === null)
        throw Nt.alternate === null ? Error(r(467)) : Error(r(310));
      ae = t, t = {
        memoizedState: ae.memoizedState,
        baseState: ae.baseState,
        baseQueue: ae.baseQueue,
        queue: ae.queue,
        next: null
      }, _e === null ? Nt.memoizedState = _e = t : _e = _e.next = t;
    }
    return _e;
  }
  function Lr() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function oo(t) {
    var e = lo;
    return lo += 1, rl === null && (rl = []), t = mh(rl, t, e), e = Nt, (_e === null ? e.memoizedState : _e.next) === null && (e = e.alternate, q.H = e === null || e.memoizedState === null ? lm : ic), t;
  }
  function Gr(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return oo(t);
      if (t.$$typeof === k) return qe(t);
    }
    throw Error(r(438, String(t)));
  }
  function Zu(t) {
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
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Lr(), Nt.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), l = 0; l < t; l++)
        n[l] = F;
    return e.index++, n;
  }
  function ia(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Qr(t) {
    var e = Ce();
    return Iu(e, ae, t);
  }
  function Iu(t, e, n) {
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
      var b = h = null, j = null, L = e, K = !1;
      do {
        var P = L.lane & -536870913;
        if (P !== L.lane ? (Ut & P) === P : (aa & P) === P) {
          var G = L.revertLane;
          if (G === 0)
            j !== null && (j = j.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: L.action,
              hasEagerState: L.hasEagerState,
              eagerState: L.eagerState,
              next: null
            }), P === el && (K = !0);
          else if ((aa & G) === G) {
            L = L.next, G === el && (K = !0);
            continue;
          } else
            P = {
              lane: 0,
              revertLane: L.revertLane,
              gesture: null,
              action: L.action,
              hasEagerState: L.hasEagerState,
              eagerState: L.eagerState,
              next: null
            }, j === null ? (b = j = P, h = u) : j = j.next = P, Nt.lanes |= G, Oa |= G;
          P = L.action, Si && n(u, P), u = L.hasEagerState ? L.eagerState : n(u, P);
        } else
          G = {
            lane: P,
            revertLane: L.revertLane,
            gesture: L.gesture,
            action: L.action,
            hasEagerState: L.hasEagerState,
            eagerState: L.eagerState,
            next: null
          }, j === null ? (b = j = G, h = u) : j = j.next = G, Nt.lanes |= P, Oa |= P;
        L = L.next;
      } while (L !== null && L !== e);
      if (j === null ? h = u : j.next = b, !ln(u, t.memoizedState) && (je = !0, K && (n = nl, n !== null)))
        throw n;
      t.memoizedState = u, t.baseState = h, t.baseQueue = j, l.lastRenderedState = u;
    }
    return s === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function $u(t) {
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
  function _h(t, e, n) {
    var l = Nt, s = Ce(), u = Qt;
    if (u) {
      if (n === void 0) throw Error(r(407));
      n = n();
    } else n = e();
    var h = !ln(
      (ae || s).memoizedState,
      n
    );
    if (h && (s.memoizedState = n, je = !0), s = s.queue, Wu(Ah.bind(null, l, s, t), [
      t
    ]), s.getSnapshot !== e || h || _e !== null && _e.memoizedState.tag & 1) {
      if (l.flags |= 2048, sl(
        9,
        { destroy: void 0 },
        zh.bind(
          null,
          l,
          s,
          n,
          e
        ),
        null
      ), se === null) throw Error(r(349));
      u || (aa & 127) !== 0 || jh(l, e, n);
    }
    return n;
  }
  function jh(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = Nt.updateQueue, e === null ? (e = Lr(), Nt.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function zh(t, e, n, l) {
    e.value = n, e.getSnapshot = l, Eh(e) && Rh(t);
  }
  function Ah(t, e, n) {
    return n(function() {
      Eh(e) && Rh(t);
    });
  }
  function Eh(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !ln(t, n);
    } catch {
      return !0;
    }
  }
  function Rh(t) {
    var e = hi(t, 2);
    e !== null && en(e, t, 2);
  }
  function Fu(t) {
    var e = Ke();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), Si) {
        ya(!0);
        try {
          n();
        } finally {
          ya(!1);
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
  function Nh(t, e, n, l) {
    return t.baseState = n, Iu(
      t,
      ae,
      typeof l == "function" ? l : ia
    );
  }
  function l0(t, e, n, l, s) {
    if (Xr(t)) throw Error(r(485));
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
      q.T !== null ? n(!0) : u.isTransition = !1, l(u), n = e.pending, n === null ? (u.next = e.pending = u, Mh(e, u)) : (u.next = n.next, e.pending = n.next = u);
    }
  }
  function Mh(t, e) {
    var n = e.action, l = e.payload, s = t.state;
    if (e.isTransition) {
      var u = q.T, h = {};
      q.T = h;
      try {
        var b = n(s, l), j = q.S;
        j !== null && j(h, b), Dh(t, e, b);
      } catch (L) {
        Ju(t, e, L);
      } finally {
        u !== null && h.types !== null && (u.types = h.types), q.T = u;
      }
    } else
      try {
        u = n(s, l), Dh(t, e, u);
      } catch (L) {
        Ju(t, e, L);
      }
  }
  function Dh(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Oh(t, e, l);
      },
      function(l) {
        return Ju(t, e, l);
      }
    ) : Oh(t, e, n);
  }
  function Oh(t, e, n) {
    e.status = "fulfilled", e.value = n, Bh(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Mh(t, n)));
  }
  function Ju(t, e, n) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        e.status = "rejected", e.reason = n, Bh(e), e = e.next;
      while (e !== l);
    }
    t.action = null;
  }
  function Bh(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Hh(t, e) {
    return e;
  }
  function kh(t, e) {
    if (Qt) {
      var n = se.formState;
      if (n !== null) {
        t: {
          var l = Nt;
          if (Qt) {
            if (ue) {
              e: {
                for (var s = ue, u = Sn; s.nodeType !== 8; ) {
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
            _a(l);
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
      lastRenderedReducer: Hh,
      lastRenderedState: e
    }, n.queue = l, n = nm.bind(
      null,
      Nt,
      l
    ), l.dispatch = n, l = Fu(!1), u = ac.bind(
      null,
      Nt,
      !1,
      l.queue
    ), l = Ke(), s = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = s, n = l0.bind(
      null,
      Nt,
      s,
      u,
      n
    ), s.dispatch = n, l.memoizedState = t, [e, n, !1];
  }
  function qh(t) {
    var e = Ce();
    return Uh(e, ae, t);
  }
  function Uh(t, e, n) {
    if (e = Iu(
      t,
      e,
      Hh
    )[0], t = Qr(ia)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var l = oo(e);
      } catch (h) {
        throw h === al ? Mr : h;
      }
    else l = e;
    e = Ce();
    var s = e.queue, u = s.dispatch;
    return n !== e.memoizedState && (Nt.flags |= 2048, sl(
      9,
      { destroy: void 0 },
      o0.bind(null, s, n),
      null
    )), [l, u, t];
  }
  function o0(t, e) {
    t.action = e;
  }
  function Lh(t) {
    var e = Ce(), n = ae;
    if (n !== null)
      return Uh(e, n, t);
    Ce(), e = e.memoizedState, n = Ce();
    var l = n.queue.dispatch;
    return n.memoizedState = t, [e, l, !1];
  }
  function sl(t, e, n, l) {
    return t = { tag: t, create: n, deps: l, inst: e, next: null }, e = Nt.updateQueue, e === null && (e = Lr(), Nt.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (l = n.next, n.next = t, t.next = l, e.lastEffect = t), t;
  }
  function Gh() {
    return Ce().memoizedState;
  }
  function Yr(t, e, n, l) {
    var s = Ke();
    Nt.flags |= t, s.memoizedState = sl(
      1 | e,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Vr(t, e, n, l) {
    var s = Ce();
    l = l === void 0 ? null : l;
    var u = s.memoizedState.inst;
    ae !== null && l !== null && Qu(l, ae.memoizedState.deps) ? s.memoizedState = sl(e, u, n, l) : (Nt.flags |= t, s.memoizedState = sl(
      1 | e,
      u,
      n,
      l
    ));
  }
  function Qh(t, e) {
    Yr(8390656, 8, t, e);
  }
  function Wu(t, e) {
    Vr(2048, 8, t, e);
  }
  function r0(t) {
    Nt.flags |= 4;
    var e = Nt.updateQueue;
    if (e === null)
      e = Lr(), Nt.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function Yh(t) {
    var e = Ce().memoizedState;
    return r0({ ref: e, nextImpl: t }), function() {
      if ((Ft & 2) !== 0) throw Error(r(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Vh(t, e) {
    return Vr(4, 2, t, e);
  }
  function Xh(t, e) {
    return Vr(4, 4, t, e);
  }
  function Kh(t, e) {
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
  function Zh(t, e, n) {
    n = n != null ? n.concat([t]) : null, Vr(4, 4, Kh.bind(null, e, t), n);
  }
  function Pu() {
  }
  function Ih(t, e) {
    var n = Ce();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    return e !== null && Qu(e, l[1]) ? l[0] : (n.memoizedState = [t, e], t);
  }
  function $h(t, e) {
    var n = Ce();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    if (e !== null && Qu(e, l[1]))
      return l[0];
    if (l = t(), Si) {
      ya(!0);
      try {
        t();
      } finally {
        ya(!1);
      }
    }
    return n.memoizedState = [l, e], l;
  }
  function tc(t, e, n) {
    return n === void 0 || (aa & 1073741824) !== 0 && (Ut & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = Fm(), Nt.lanes |= t, Oa |= t, n);
  }
  function Fh(t, e, n, l) {
    return ln(n, e) ? n : ll.current !== null ? (t = tc(t, n, l), ln(t, e) || (je = !0), t) : (aa & 42) === 0 || (aa & 1073741824) !== 0 && (Ut & 261930) === 0 ? (je = !0, t.memoizedState = n) : (t = Fm(), Nt.lanes |= t, Oa |= t, e);
  }
  function Jh(t, e, n, l, s) {
    var u = W.p;
    W.p = u !== 0 && 8 > u ? u : 8;
    var h = q.T, b = {};
    q.T = b, ac(t, !1, e, n);
    try {
      var j = s(), L = q.S;
      if (L !== null && L(b, j), j !== null && typeof j == "object" && typeof j.then == "function") {
        var K = n0(
          j,
          l
        );
        ro(
          t,
          e,
          K,
          dn(t)
        );
      } else
        ro(
          t,
          e,
          l,
          dn(t)
        );
    } catch (P) {
      ro(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: P },
        dn()
      );
    } finally {
      W.p = u, h !== null && b.types !== null && (h.types = b.types), q.T = h;
    }
  }
  function s0() {
  }
  function ec(t, e, n, l) {
    if (t.tag !== 5) throw Error(r(476));
    var s = Wh(t).queue;
    Jh(
      t,
      s,
      e,
      $,
      n === null ? s0 : function() {
        return Ph(t), n(l);
      }
    );
  }
  function Wh(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: $,
      baseState: $,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ia,
        lastRenderedState: $
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
  function Ph(t) {
    var e = Wh(t);
    e.next === null && (e = t.alternate.memoizedState), ro(
      t,
      e.next.queue,
      {},
      dn()
    );
  }
  function nc() {
    return qe(_o);
  }
  function tm() {
    return Ce().memoizedState;
  }
  function em() {
    return Ce().memoizedState;
  }
  function u0(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = dn();
          t = Aa(n);
          var l = Ea(e, t, n);
          l !== null && (en(l, e, n), no(l, e, n)), e = { cache: Nu() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function c0(t, e, n) {
    var l = dn();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xr(t) ? am(e, n) : (n = yu(t, e, n, l), n !== null && (en(n, t, l), im(n, e, l)));
  }
  function nm(t, e, n) {
    var l = dn();
    ro(t, e, n, l);
  }
  function ro(t, e, n, l) {
    var s = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Xr(t)) am(e, s);
    else {
      var u = t.alternate;
      if (t.lanes === 0 && (u === null || u.lanes === 0) && (u = e.lastRenderedReducer, u !== null))
        try {
          var h = e.lastRenderedState, b = u(h, n);
          if (s.hasEagerState = !0, s.eagerState = b, ln(b, h))
            return _r(t, e, s, 0), se === null && Tr(), !1;
        } catch {
        } finally {
        }
      if (n = yu(t, e, s, l), n !== null)
        return en(n, t, l), im(n, e, l), !0;
    }
    return !1;
  }
  function ac(t, e, n, l) {
    if (l = {
      lane: 2,
      revertLane: Bc(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Xr(t)) {
      if (e) throw Error(r(479));
    } else
      e = yu(
        t,
        n,
        l,
        2
      ), e !== null && en(e, t, 2);
  }
  function Xr(t) {
    var e = t.alternate;
    return t === Nt || e !== null && e === Nt;
  }
  function am(t, e) {
    ol = qr = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function im(t, e, n) {
    if ((n & 4194048) !== 0) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, uf(t, n);
    }
  }
  var so = {
    readContext: qe,
    use: Gr,
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
  so.useEffectEvent = be;
  var lm = {
    readContext: qe,
    use: Gr,
    useCallback: function(t, e) {
      return Ke().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: qe,
    useEffect: Qh,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Yr(
        4194308,
        4,
        Kh.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return Yr(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Yr(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = Ke();
      e = e === void 0 ? null : e;
      var l = t();
      if (Si) {
        ya(!0);
        try {
          t();
        } finally {
          ya(!1);
        }
      }
      return n.memoizedState = [l, e], l;
    },
    useReducer: function(t, e, n) {
      var l = Ke();
      if (n !== void 0) {
        var s = n(e);
        if (Si) {
          ya(!0);
          try {
            n(e);
          } finally {
            ya(!1);
          }
        }
      } else s = e;
      return l.memoizedState = l.baseState = s, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: s
      }, l.queue = t, t = t.dispatch = c0.bind(
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
      t = Fu(t);
      var e = t.queue, n = nm.bind(null, Nt, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: Pu,
    useDeferredValue: function(t, e) {
      var n = Ke();
      return tc(n, t, e);
    },
    useTransition: function() {
      var t = Fu(!1);
      return t = Jh.bind(
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
        (Ut & 127) !== 0 || jh(l, e, n);
      }
      s.memoizedState = n;
      var u = { value: n, getSnapshot: e };
      return s.queue = u, Qh(Ah.bind(null, l, u, t), [
        t
      ]), l.flags |= 2048, sl(
        9,
        { destroy: void 0 },
        zh.bind(
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
        var n = Un, l = qn;
        n = (l & ~(1 << 32 - an(l) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = Ur++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = a0++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: nc,
    useFormState: kh,
    useActionState: kh,
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
      return e.queue = n, e = ac.bind(
        null,
        Nt,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: Zu,
    useCacheRefresh: function() {
      return Ke().memoizedState = u0.bind(
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
  }, ic = {
    readContext: qe,
    use: Gr,
    useCallback: Ih,
    useContext: qe,
    useEffect: Wu,
    useImperativeHandle: Zh,
    useInsertionEffect: Vh,
    useLayoutEffect: Xh,
    useMemo: $h,
    useReducer: Qr,
    useRef: Gh,
    useState: function() {
      return Qr(ia);
    },
    useDebugValue: Pu,
    useDeferredValue: function(t, e) {
      var n = Ce();
      return Fh(
        n,
        ae.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Qr(ia)[0], e = Ce().memoizedState;
      return [
        typeof t == "boolean" ? t : oo(t),
        e
      ];
    },
    useSyncExternalStore: _h,
    useId: tm,
    useHostTransitionStatus: nc,
    useFormState: qh,
    useActionState: qh,
    useOptimistic: function(t, e) {
      var n = Ce();
      return Nh(n, ae, t, e);
    },
    useMemoCache: Zu,
    useCacheRefresh: em
  };
  ic.useEffectEvent = Yh;
  var om = {
    readContext: qe,
    use: Gr,
    useCallback: Ih,
    useContext: qe,
    useEffect: Wu,
    useImperativeHandle: Zh,
    useInsertionEffect: Vh,
    useLayoutEffect: Xh,
    useMemo: $h,
    useReducer: $u,
    useRef: Gh,
    useState: function() {
      return $u(ia);
    },
    useDebugValue: Pu,
    useDeferredValue: function(t, e) {
      var n = Ce();
      return ae === null ? tc(n, t, e) : Fh(
        n,
        ae.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = $u(ia)[0], e = Ce().memoizedState;
      return [
        typeof t == "boolean" ? t : oo(t),
        e
      ];
    },
    useSyncExternalStore: _h,
    useId: tm,
    useHostTransitionStatus: nc,
    useFormState: Lh,
    useActionState: Lh,
    useOptimistic: function(t, e) {
      var n = Ce();
      return ae !== null ? Nh(n, ae, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: Zu,
    useCacheRefresh: em
  };
  om.useEffectEvent = Yh;
  function lc(t, e, n, l) {
    e = t.memoizedState, n = n(l, e), n = n == null ? e : y({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var oc = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var l = dn(), s = Aa(l);
      s.payload = e, n != null && (s.callback = n), e = Ea(t, s, l), e !== null && (en(e, t, l), no(e, t, l));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var l = dn(), s = Aa(l);
      s.tag = 1, s.payload = e, n != null && (s.callback = n), e = Ea(t, s, l), e !== null && (en(e, t, l), no(e, t, l));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = dn(), l = Aa(n);
      l.tag = 2, e != null && (l.callback = e), e = Ea(t, l, n), e !== null && (en(e, t, n), no(e, t, n));
    }
  };
  function rm(t, e, n, l, s, u, h) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, u, h) : e.prototype && e.prototype.isPureReactComponent ? !Il(n, l) || !Il(s, u) : !0;
  }
  function sm(t, e, n, l) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, l), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, l), e.state !== t && oc.enqueueReplaceState(e, e.state, null);
  }
  function Ci(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var l in e)
        l !== "ref" && (n[l] = e[l]);
    }
    if (t = t.defaultProps) {
      n === e && (n = y({}, n));
      for (var s in t)
        n[s] === void 0 && (n[s] = t[s]);
    }
    return n;
  }
  function um(t) {
    Cr(t);
  }
  function cm(t) {
    console.error(t);
  }
  function dm(t) {
    Cr(t);
  }
  function Kr(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function fm(t, e, n) {
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
  function rc(t, e, n) {
    return n = Aa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Kr(t, e);
    }, n;
  }
  function hm(t) {
    return t = Aa(t), t.tag = 3, t;
  }
  function mm(t, e, n, l) {
    var s = n.type.getDerivedStateFromError;
    if (typeof s == "function") {
      var u = l.value;
      t.payload = function() {
        return s(u);
      }, t.callback = function() {
        fm(e, n, l);
      };
    }
    var h = n.stateNode;
    h !== null && typeof h.componentDidCatch == "function" && (t.callback = function() {
      fm(e, n, l), typeof s != "function" && (Ba === null ? Ba = /* @__PURE__ */ new Set([this]) : Ba.add(this));
      var b = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: b !== null ? b : ""
      });
    });
  }
  function d0(t, e, n, l, s) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (e = n.alternate, e !== null && tl(
        e,
        n,
        s,
        !0
      ), n = rn.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
            return Cn === null ? is() : n.alternate === null && ve === 0 && (ve = 3), n.flags &= -257, n.flags |= 65536, n.lanes = s, l === Dr ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : e.add(l), Mc(t, l, s)), !1;
          case 22:
            return n.flags |= 65536, l === Dr ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), Mc(t, l, s)), !1;
        }
        throw Error(r(435, n.tag));
      }
      return Mc(t, l, s), is(), !1;
    }
    if (Qt)
      return e = rn.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = s, l !== ju && (t = Error(r(422), { cause: l }), Jl(vn(t, n)))) : (l !== ju && (e = Error(r(423), {
        cause: l
      }), Jl(
        vn(e, n)
      )), t = t.current.alternate, t.flags |= 65536, s &= -s, t.lanes |= s, l = vn(l, n), s = rc(
        t.stateNode,
        l,
        s
      ), ku(t, s), ve !== 4 && (ve = 2)), !1;
    var u = Error(r(520), { cause: l });
    if (u = vn(u, n), xo === null ? xo = [u] : xo.push(u), ve !== 4 && (ve = 2), e === null) return !0;
    l = vn(l, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = s & -s, n.lanes |= t, t = rc(n.stateNode, l, t), ku(n, t), !1;
        case 1:
          if (e = n.type, u = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Ba === null || !Ba.has(u))))
            return n.flags |= 65536, s &= -s, n.lanes |= s, s = hm(s), mm(
              s,
              t,
              n,
              l
            ), ku(n, s), !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var sc = Error(r(461)), je = !1;
  function Ue(t, e, n, l) {
    e.child = t === null ? bh(e, null, n, l) : wi(
      e,
      t.child,
      n,
      l
    );
  }
  function pm(t, e, n, l, s) {
    n = n.render;
    var u = e.ref;
    if ("ref" in l) {
      var h = {};
      for (var b in l)
        b !== "ref" && (h[b] = l[b]);
    } else h = l;
    return xi(e), l = Yu(
      t,
      e,
      n,
      h,
      u,
      s
    ), b = Vu(), t !== null && !je ? (Xu(t, e, s), la(t, e, s)) : (Qt && b && Tu(e), e.flags |= 1, Ue(t, e, l, s), e.child);
  }
  function gm(t, e, n, l, s) {
    if (t === null) {
      var u = n.type;
      return typeof u == "function" && !wu(u) && u.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = u, xm(
        t,
        e,
        u,
        l,
        s
      )) : (t = zr(
        n.type,
        null,
        l,
        e,
        e.mode,
        s
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (u = t.child, !gc(t, s)) {
      var h = u.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Il, n(h, l) && t.ref === e.ref)
        return la(t, e, s);
    }
    return e.flags |= 1, t = Pn(u, l), t.ref = e.ref, t.return = e, e.child = t;
  }
  function xm(t, e, n, l, s) {
    if (t !== null) {
      var u = t.memoizedProps;
      if (Il(u, l) && t.ref === e.ref)
        if (je = !1, e.pendingProps = l = u, gc(t, s))
          (t.flags & 131072) !== 0 && (je = !0);
        else
          return e.lanes = t.lanes, la(t, e, s);
    }
    return uc(
      t,
      e,
      n,
      l,
      s
    );
  }
  function bm(t, e, n, l) {
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
        return vm(
          t,
          e,
          u,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Nr(
          e,
          u !== null ? u.cachePool : null
        ), u !== null ? wh(e, u) : Uu(), Sh(e);
      else
        return l = e.lanes = 536870912, vm(
          t,
          e,
          u !== null ? u.baseLanes | n : n,
          n,
          l
        );
    } else
      u !== null ? (Nr(e, u.cachePool), wh(e, u), Na(), e.memoizedState = null) : (t !== null && Nr(e, null), Uu(), Na());
    return Ue(t, e, s, n), e.child;
  }
  function uo(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function vm(t, e, n, l, s) {
    var u = Du();
    return u = u === null ? null : { parent: Te._currentValue, pool: u }, e.memoizedState = {
      baseLanes: n,
      cachePool: u
    }, t !== null && Nr(e, null), Uu(), Sh(e), t !== null && tl(t, e, l, !0), e.childLanes = s, null;
  }
  function Zr(t, e) {
    return e = $r(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function ym(t, e, n) {
    return wi(e, t.child, null, n), t = Zr(e, e.pendingProps), t.flags |= 2, sn(e), e.memoizedState = null, t;
  }
  function f0(t, e, n) {
    var l = e.pendingProps, s = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (Qt) {
        if (l.mode === "hidden")
          return t = Zr(e, l), e.lanes = 536870912, uo(null, t);
        if (Gu(e), (t = ue) ? (t = Mp(
          t,
          Sn
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Ca !== null ? { id: qn, overflow: Un } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = ah(t), n.return = e, e.child = n, ke = e, ue = null)) : t = null, t === null) throw _a(e);
        return e.lanes = 536870912, null;
      }
      return Zr(e, l);
    }
    var u = t.memoizedState;
    if (u !== null) {
      var h = u.dehydrated;
      if (Gu(e), s)
        if (e.flags & 256)
          e.flags &= -257, e = ym(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(r(558));
      else if (je || tl(t, e, n, !1), s = (n & t.childLanes) !== 0, je || s) {
        if (l = se, l !== null && (h = cf(l, n), h !== 0 && h !== u.retryLane))
          throw u.retryLane = h, hi(t, h), en(l, t, h), sc;
        is(), e = ym(
          t,
          e,
          n
        );
      } else
        t = u.treeContext, ue = Tn(h.nextSibling), ke = e, Qt = !0, Ta = null, Sn = !1, t !== null && oh(e, t), e = Zr(e, l), e.flags |= 4096;
      return e;
    }
    return t = Pn(t.child, {
      mode: l.mode,
      children: l.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Ir(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(r(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function uc(t, e, n, l, s) {
    return xi(e), n = Yu(
      t,
      e,
      n,
      l,
      void 0,
      s
    ), l = Vu(), t !== null && !je ? (Xu(t, e, s), la(t, e, s)) : (Qt && l && Tu(e), e.flags |= 1, Ue(t, e, n, s), e.child);
  }
  function wm(t, e, n, l, s, u) {
    return xi(e), e.updateQueue = null, n = Th(
      e,
      l,
      n,
      s
    ), Ch(t), l = Vu(), t !== null && !je ? (Xu(t, e, u), la(t, e, u)) : (Qt && l && Tu(e), e.flags |= 1, Ue(t, e, n, u), e.child);
  }
  function Sm(t, e, n, l, s) {
    if (xi(e), e.stateNode === null) {
      var u = Fi, h = n.contextType;
      typeof h == "object" && h !== null && (u = qe(h)), u = new n(l, u), e.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = oc, e.stateNode = u, u._reactInternals = e, u = e.stateNode, u.props = l, u.state = e.memoizedState, u.refs = {}, Bu(e), h = n.contextType, u.context = typeof h == "object" && h !== null ? qe(h) : Fi, u.state = e.memoizedState, h = n.getDerivedStateFromProps, typeof h == "function" && (lc(
        e,
        n,
        h,
        l
      ), u.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (h = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), h !== u.state && oc.enqueueReplaceState(u, u.state, null), io(e, l, u, s), ao(), u.state = e.memoizedState), typeof u.componentDidMount == "function" && (e.flags |= 4194308), l = !0;
    } else if (t === null) {
      u = e.stateNode;
      var b = e.memoizedProps, j = Ci(n, b);
      u.props = j;
      var L = u.context, K = n.contextType;
      h = Fi, typeof K == "object" && K !== null && (h = qe(K));
      var P = n.getDerivedStateFromProps;
      K = typeof P == "function" || typeof u.getSnapshotBeforeUpdate == "function", b = e.pendingProps !== b, K || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (b || L !== h) && sm(
        e,
        u,
        l,
        h
      ), za = !1;
      var G = e.memoizedState;
      u.state = G, io(e, l, u, s), ao(), L = e.memoizedState, b || G !== L || za ? (typeof P == "function" && (lc(
        e,
        n,
        P,
        l
      ), L = e.memoizedState), (j = za || rm(
        e,
        n,
        j,
        l,
        G,
        L,
        h
      )) ? (K || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = l, e.memoizedState = L), u.props = l, u.state = L, u.context = h, l = j) : (typeof u.componentDidMount == "function" && (e.flags |= 4194308), l = !1);
    } else {
      u = e.stateNode, Hu(t, e), h = e.memoizedProps, K = Ci(n, h), u.props = K, P = e.pendingProps, G = u.context, L = n.contextType, j = Fi, typeof L == "object" && L !== null && (j = qe(L)), b = n.getDerivedStateFromProps, (L = typeof b == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (h !== P || G !== j) && sm(
        e,
        u,
        l,
        j
      ), za = !1, G = e.memoizedState, u.state = G, io(e, l, u, s), ao();
      var V = e.memoizedState;
      h !== P || G !== V || za || t !== null && t.dependencies !== null && Er(t.dependencies) ? (typeof b == "function" && (lc(
        e,
        n,
        b,
        l
      ), V = e.memoizedState), (K = za || rm(
        e,
        n,
        K,
        l,
        G,
        V,
        j
      ) || t !== null && t.dependencies !== null && Er(t.dependencies)) ? (L || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(l, V, j), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(
        l,
        V,
        j
      )), typeof u.componentDidUpdate == "function" && (e.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || h === t.memoizedProps && G === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || h === t.memoizedProps && G === t.memoizedState || (e.flags |= 1024), e.memoizedProps = l, e.memoizedState = V), u.props = l, u.state = V, u.context = j, l = K) : (typeof u.componentDidUpdate != "function" || h === t.memoizedProps && G === t.memoizedState || (e.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || h === t.memoizedProps && G === t.memoizedState || (e.flags |= 1024), l = !1);
    }
    return u = l, Ir(t, e), l = (e.flags & 128) !== 0, u || l ? (u = e.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : u.render(), e.flags |= 1, t !== null && l ? (e.child = wi(
      e,
      t.child,
      null,
      s
    ), e.child = wi(
      e,
      null,
      n,
      s
    )) : Ue(t, e, n, s), e.memoizedState = u.state, t = e.child) : t = la(
      t,
      e,
      s
    ), t;
  }
  function Cm(t, e, n, l) {
    return pi(), e.flags |= 256, Ue(t, e, n, l), e.child;
  }
  var cc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function dc(t) {
    return { baseLanes: t, cachePool: fh() };
  }
  function fc(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= cn), t;
  }
  function Tm(t, e, n) {
    var l = e.pendingProps, s = !1, u = (e.flags & 128) !== 0, h;
    if ((h = u) || (h = t !== null && t.memoizedState === null ? !1 : (Se.current & 2) !== 0), h && (s = !0, e.flags &= -129), h = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (Qt) {
        if (s ? Ra(e) : Na(), (t = ue) ? (t = Mp(
          t,
          Sn
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: Ca !== null ? { id: qn, overflow: Un } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = ah(t), n.return = e, e.child = n, ke = e, ue = null)) : t = null, t === null) throw _a(e);
        return Ic(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      var b = l.children;
      return l = l.fallback, s ? (Na(), s = e.mode, b = $r(
        { mode: "hidden", children: b },
        s
      ), l = mi(
        l,
        s,
        n,
        null
      ), b.return = e, l.return = e, b.sibling = l, e.child = b, l = e.child, l.memoizedState = dc(n), l.childLanes = fc(
        t,
        h,
        n
      ), e.memoizedState = cc, uo(null, l)) : (Ra(e), hc(e, b));
    }
    var j = t.memoizedState;
    if (j !== null && (b = j.dehydrated, b !== null)) {
      if (u)
        e.flags & 256 ? (Ra(e), e.flags &= -257, e = mc(
          t,
          e,
          n
        )) : e.memoizedState !== null ? (Na(), e.child = t.child, e.flags |= 128, e = null) : (Na(), b = l.fallback, s = e.mode, l = $r(
          { mode: "visible", children: l.children },
          s
        ), b = mi(
          b,
          s,
          n,
          null
        ), b.flags |= 2, l.return = e, b.return = e, l.sibling = b, e.child = l, wi(
          e,
          t.child,
          null,
          n
        ), l = e.child, l.memoizedState = dc(n), l.childLanes = fc(
          t,
          h,
          n
        ), e.memoizedState = cc, e = uo(null, l));
      else if (Ra(e), Ic(b)) {
        if (h = b.nextSibling && b.nextSibling.dataset, h) var L = h.dgst;
        h = L, l = Error(r(419)), l.stack = "", l.digest = h, Jl({ value: l, source: null, stack: null }), e = mc(
          t,
          e,
          n
        );
      } else if (je || tl(t, e, n, !1), h = (n & t.childLanes) !== 0, je || h) {
        if (h = se, h !== null && (l = cf(h, n), l !== 0 && l !== j.retryLane))
          throw j.retryLane = l, hi(t, l), en(h, t, l), sc;
        Zc(b) || is(), e = mc(
          t,
          e,
          n
        );
      } else
        Zc(b) ? (e.flags |= 192, e.child = t.child, e = null) : (t = j.treeContext, ue = Tn(
          b.nextSibling
        ), ke = e, Qt = !0, Ta = null, Sn = !1, t !== null && oh(e, t), e = hc(
          e,
          l.children
        ), e.flags |= 4096);
      return e;
    }
    return s ? (Na(), b = l.fallback, s = e.mode, j = t.child, L = j.sibling, l = Pn(j, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = j.subtreeFlags & 65011712, L !== null ? b = Pn(
      L,
      b
    ) : (b = mi(
      b,
      s,
      n,
      null
    ), b.flags |= 2), b.return = e, l.return = e, l.sibling = b, e.child = l, uo(null, l), l = e.child, b = t.child.memoizedState, b === null ? b = dc(n) : (s = b.cachePool, s !== null ? (j = Te._currentValue, s = s.parent !== j ? { parent: j, pool: j } : s) : s = fh(), b = {
      baseLanes: b.baseLanes | n,
      cachePool: s
    }), l.memoizedState = b, l.childLanes = fc(
      t,
      h,
      n
    ), e.memoizedState = cc, uo(t.child, l)) : (Ra(e), n = t.child, t = n.sibling, n = Pn(n, {
      mode: "visible",
      children: l.children
    }), n.return = e, n.sibling = null, t !== null && (h = e.deletions, h === null ? (e.deletions = [t], e.flags |= 16) : h.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function hc(t, e) {
    return e = $r(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function $r(t, e) {
    return t = on(22, t, null, e), t.lanes = 0, t;
  }
  function mc(t, e, n) {
    return wi(e, t.child, null, n), t = hc(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function _m(t, e, n) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e), Eu(t.return, e, n);
  }
  function pc(t, e, n, l, s, u) {
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
  function jm(t, e, n) {
    var l = e.pendingProps, s = l.revealOrder, u = l.tail;
    l = l.children;
    var h = Se.current, b = (h & 2) !== 0;
    if (b ? (h = h & 1 | 2, e.flags |= 128) : h &= 1, X(Se, h), Ue(t, e, l, n), l = Qt ? Fl : 0, !b && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && _m(t, n, e);
        else if (t.tag === 19)
          _m(t, n, e);
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
          t = n.alternate, t !== null && kr(t) === null && (s = n), n = n.sibling;
        n = s, n === null ? (s = e.child, e.child = null) : (s = n.sibling, n.sibling = null), pc(
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
          if (t = s.alternate, t !== null && kr(t) === null) {
            e.child = s;
            break;
          }
          t = s.sibling, s.sibling = n, n = s, s = t;
        }
        pc(
          e,
          !0,
          n,
          null,
          u,
          l
        );
        break;
      case "together":
        pc(
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
    if (t !== null && (e.dependencies = t.dependencies), Oa |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (tl(
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
  function gc(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Er(t)));
  }
  function h0(t, e, n) {
    switch (e.tag) {
      case 3:
        at(e, e.stateNode.containerInfo), ja(e, Te, t.memoizedState.cache), pi();
        break;
      case 27:
      case 5:
        re(e);
        break;
      case 4:
        at(e, e.stateNode.containerInfo);
        break;
      case 10:
        ja(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, Gu(e), null;
        break;
      case 13:
        var l = e.memoizedState;
        if (l !== null)
          return l.dehydrated !== null ? (Ra(e), e.flags |= 128, null) : (n & e.child.childLanes) !== 0 ? Tm(t, e, n) : (Ra(e), t = la(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        Ra(e);
        break;
      case 19:
        var s = (t.flags & 128) !== 0;
        if (l = (n & e.childLanes) !== 0, l || (tl(
          t,
          e,
          n,
          !1
        ), l = (n & e.childLanes) !== 0), s) {
          if (l)
            return jm(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (s = e.memoizedState, s !== null && (s.rendering = null, s.tail = null, s.lastEffect = null), X(Se, Se.current), l) break;
        return null;
      case 22:
        return e.lanes = 0, bm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        ja(e, Te, t.memoizedState.cache);
    }
    return la(t, e, n);
  }
  function zm(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        je = !0;
      else {
        if (!gc(t, n) && (e.flags & 128) === 0)
          return je = !1, h0(
            t,
            e,
            n
          );
        je = (t.flags & 131072) !== 0;
      }
    else
      je = !1, Qt && (e.flags & 1048576) !== 0 && lh(e, Fl, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var l = e.pendingProps;
          if (t = vi(e.elementType), e.type = t, typeof t == "function")
            wu(t) ? (l = Ci(t, l), e.tag = 1, e = Sm(
              null,
              e,
              t,
              l,
              n
            )) : (e.tag = 0, e = uc(
              null,
              e,
              t,
              l,
              n
            ));
          else {
            if (t != null) {
              var s = t.$$typeof;
              if (s === v) {
                e.tag = 11, e = pm(
                  null,
                  e,
                  t,
                  l,
                  n
                );
                break t;
              } else if (s === S) {
                e.tag = 14, e = gm(
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
        return uc(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return l = e.type, s = Ci(
          l,
          e.pendingProps
        ), Sm(
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
          s = u.element, Hu(t, e), io(e, l, null, n);
          var h = e.memoizedState;
          if (l = h.cache, ja(e, Te, l), l !== u.cache && Ru(
            e,
            [Te],
            n,
            !0
          ), ao(), l = h.element, u.isDehydrated)
            if (u = {
              element: l,
              isDehydrated: !1,
              cache: h.cache
            }, e.updateQueue.baseState = u, e.memoizedState = u, e.flags & 256) {
              e = Cm(
                t,
                e,
                l,
                n
              );
              break t;
            } else if (l !== s) {
              s = vn(
                Error(r(424)),
                e
              ), Jl(s), e = Cm(
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
              for (ue = Tn(t.firstChild), ke = e, Qt = !0, Ta = null, Sn = !0, n = bh(
                e,
                null,
                l,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 4096, n = n.sibling;
            }
          else {
            if (pi(), l === s) {
              e = la(
                t,
                e,
                n
              );
              break t;
            }
            Ue(t, e, l, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Ir(t, e), t === null ? (n = qp(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : Qt || (n = e.type, t = e.pendingProps, l = ds(
          St.current
        ).createElement(n), l[He] = e, l[$e] = t, Le(l, n, t), De(l), e.stateNode = l) : e.memoizedState = qp(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return re(e), t === null && Qt && (l = e.stateNode = Bp(
          e.type,
          e.pendingProps,
          St.current
        ), ke = e, Sn = !0, s = ue, Ua(e.type) ? ($c = s, ue = Tn(l.firstChild)) : ue = s), Ue(
          t,
          e,
          e.pendingProps.children,
          n
        ), Ir(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && Qt && ((s = l = ue) && (l = Y0(
          l,
          e.type,
          e.pendingProps,
          Sn
        ), l !== null ? (e.stateNode = l, ke = e, ue = Tn(l.firstChild), Sn = !1, s = !0) : s = !1), s || _a(e)), re(e), s = e.type, u = e.pendingProps, h = t !== null ? t.memoizedProps : null, l = u.children, Vc(s, u) ? l = null : h !== null && Vc(s, h) && (e.flags |= 32), e.memoizedState !== null && (s = Yu(
          t,
          e,
          i0,
          null,
          null,
          n
        ), _o._currentValue = s), Ir(t, e), Ue(t, e, l, n), e.child;
      case 6:
        return t === null && Qt && ((t = n = ue) && (n = V0(
          n,
          e.pendingProps,
          Sn
        ), n !== null ? (e.stateNode = n, ke = e, ue = null, t = !0) : t = !1), t || _a(e)), null;
      case 13:
        return Tm(t, e, n);
      case 4:
        return at(
          e,
          e.stateNode.containerInfo
        ), l = e.pendingProps, t === null ? e.child = wi(
          e,
          null,
          l,
          n
        ) : Ue(t, e, l, n), e.child;
      case 11:
        return pm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return Ue(
          t,
          e,
          e.pendingProps,
          n
        ), e.child;
      case 8:
        return Ue(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return Ue(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return l = e.pendingProps, ja(e, e.type, l.value), Ue(t, e, l.children, n), e.child;
      case 9:
        return s = e.type._context, l = e.pendingProps.children, xi(e), s = qe(s), l = l(s), e.flags |= 1, Ue(t, e, l, n), e.child;
      case 14:
        return gm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return xm(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return jm(t, e, n);
      case 31:
        return f0(t, e, n);
      case 22:
        return bm(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return xi(e), l = qe(Te), t === null ? (s = Du(), s === null && (s = se, u = Nu(), s.pooledCache = u, u.refCount++, u !== null && (s.pooledCacheLanes |= n), s = u), e.memoizedState = { parent: l, cache: s }, Bu(e), ja(e, Te, s)) : ((t.lanes & n) !== 0 && (Hu(t, e), io(e, null, null, n), ao()), s = t.memoizedState, u = e.memoizedState, s.parent !== l ? (s = { parent: l, cache: l }, e.memoizedState = s, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = s), ja(e, Te, l)) : (l = u.cache, ja(e, Te, l), l !== s.cache && Ru(
          e,
          [Te],
          n,
          !0
        ))), Ue(
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
  function xc(t, e, n, l, s) {
    if ((e = (t.mode & 32) !== 0) && (e = !1), e) {
      if (t.flags |= 16777216, (s & 335544128) === s)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (tp()) t.flags |= 8192;
        else
          throw yi = Dr, Ou;
    } else t.flags &= -16777217;
  }
  function Am(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !Yp(e))
      if (tp()) t.flags |= 8192;
      else
        throw yi = Dr, Ou;
  }
  function Fr(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? rf() : 536870912, t.lanes |= e, fl |= e);
  }
  function co(t, e) {
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
  function m0(t, e, n) {
    var l = e.pendingProps;
    switch (_u(e), e.tag) {
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
        return n = e.stateNode, l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), na(Te), bt(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Pi(e) ? oa(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, zu())), ce(e), null;
      case 26:
        var s = e.type, u = e.memoizedState;
        return t === null ? (oa(e), u !== null ? (ce(e), Am(e, u)) : (ce(e), xc(
          e,
          s,
          null,
          l,
          n
        ))) : u ? u !== t.memoizedState ? (oa(e), ce(e), Am(e, u)) : (ce(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== l && oa(e), ce(e), xc(
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
          t = it.current, Pi(e) ? rh(e) : (t = Bp(s, l, n), e.stateNode = t, oa(e));
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
          if (u = it.current, Pi(e))
            rh(e);
          else {
            var h = ds(
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
            u[He] = e, u[$e] = l;
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
            t: switch (Le(u, s, l), s) {
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
        return ce(e), xc(
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
          if (t = St.current, Pi(e)) {
            if (t = e.stateNode, n = e.memoizedProps, l = null, s = ke, s !== null)
              switch (s.tag) {
                case 27:
                case 5:
                  l = s.memoizedProps;
              }
            t[He] = e, t = !!(t.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Tp(t.nodeValue, n)), t || _a(e, !0);
          } else
            t = ds(t).createTextNode(
              l
            ), t[He] = e, e.stateNode = t;
        }
        return ce(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (l = Pi(e), n !== null) {
            if (t === null) {
              if (!l) throw Error(r(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(r(557));
              t[He] = e;
            } else
              pi(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            ce(e), t = !1;
          } else
            n = zu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (sn(e), e) : (sn(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(r(558));
        }
        return ce(e), null;
      case 13:
        if (l = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (s = Pi(e), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!s) throw Error(r(318));
              if (s = e.memoizedState, s = s !== null ? s.dehydrated : null, !s) throw Error(r(317));
              s[He] = e;
            } else
              pi(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            ce(e), s = !1;
          } else
            s = zu(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = s), s = !0;
          if (!s)
            return e.flags & 256 ? (sn(e), e) : (sn(e), null);
        }
        return sn(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = l !== null, t = t !== null && t.memoizedState !== null, n && (l = e.child, s = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (s = l.alternate.memoizedState.cachePool.pool), u = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), u !== s && (l.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), Fr(e, e.updateQueue), ce(e), null);
      case 4:
        return bt(), t === null && Uc(e.stateNode.containerInfo), ce(e), null;
      case 10:
        return na(e.type), ce(e), null;
      case 19:
        if (Q(Se), l = e.memoizedState, l === null) return ce(e), null;
        if (s = (e.flags & 128) !== 0, u = l.rendering, u === null)
          if (s) co(l, !1);
          else {
            if (ve !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (u = kr(t), u !== null) {
                  for (e.flags |= 128, co(l, !1), t = u.updateQueue, e.updateQueue = t, Fr(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    nh(n, t), n = n.sibling;
                  return X(
                    Se,
                    Se.current & 1 | 2
                  ), Qt && ta(e, l.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            l.tail !== null && pe() > es && (e.flags |= 128, s = !0, co(l, !1), e.lanes = 4194304);
          }
        else {
          if (!s)
            if (t = kr(u), t !== null) {
              if (e.flags |= 128, s = !0, t = t.updateQueue, e.updateQueue = t, Fr(e, t), co(l, !0), l.tail === null && l.tailMode === "hidden" && !u.alternate && !Qt)
                return ce(e), null;
            } else
              2 * pe() - l.renderingStartTime > es && n !== 536870912 && (e.flags |= 128, s = !0, co(l, !1), e.lanes = 4194304);
          l.isBackwards ? (u.sibling = e.child, e.child = u) : (t = l.last, t !== null ? t.sibling = u : e.child = u, l.last = u);
        }
        return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = pe(), t.sibling = null, n = Se.current, X(
          Se,
          s ? n & 1 | 2 : n & 1
        ), Qt && ta(e, l.treeForkCount), t) : (ce(e), null);
      case 22:
      case 23:
        return sn(e), Lu(), l = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (e.flags |= 8192) : l && (e.flags |= 8192), l ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (ce(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : ce(e), n = e.updateQueue, n !== null && Fr(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== n && (e.flags |= 2048), t !== null && Q(bi), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), na(Te), ce(e), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(r(156, e.tag));
  }
  function p0(t, e) {
    switch (_u(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return na(Te), bt(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Vt(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (sn(e), e.alternate === null)
            throw Error(r(340));
          pi();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (sn(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(r(340));
          pi();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return Q(Se), null;
      case 4:
        return bt(), null;
      case 10:
        return na(e.type), null;
      case 22:
      case 23:
        return sn(e), Lu(), t !== null && Q(bi), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return na(Te), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Em(t, e) {
    switch (_u(e), e.tag) {
      case 3:
        na(Te), bt();
        break;
      case 26:
      case 27:
      case 5:
        Vt(e);
        break;
      case 4:
        bt();
        break;
      case 31:
        e.memoizedState !== null && sn(e);
        break;
      case 13:
        sn(e);
        break;
      case 19:
        Q(Se);
        break;
      case 10:
        na(e.type);
        break;
      case 22:
      case 23:
        sn(e), Lu(), t !== null && Q(bi);
        break;
      case 24:
        na(Te);
    }
  }
  function fo(t, e) {
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
      ee(e, e.return, b);
    }
  }
  function Ma(t, e, n) {
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
              var j = n, L = b;
              try {
                L();
              } catch (K) {
                ee(
                  s,
                  j,
                  K
                );
              }
            }
          }
          l = l.next;
        } while (l !== u);
      }
    } catch (K) {
      ee(e, e.return, K);
    }
  }
  function Rm(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        yh(e, n);
      } catch (l) {
        ee(t, t.return, l);
      }
    }
  }
  function Nm(t, e, n) {
    n.props = Ci(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      ee(t, e, l);
    }
  }
  function ho(t, e) {
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
      ee(t, e, s);
    }
  }
  function Ln(t, e) {
    var n = t.ref, l = t.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (s) {
          ee(t, e, s);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (s) {
          ee(t, e, s);
        }
      else n.current = null;
  }
  function Mm(t) {
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
      ee(t, t.return, s);
    }
  }
  function bc(t, e, n) {
    try {
      var l = t.stateNode;
      k0(l, t.type, n, e), l[$e] = e;
    } catch (s) {
      ee(t, t.return, s);
    }
  }
  function Dm(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && Ua(t.type) || t.tag === 4;
  }
  function vc(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Dm(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && Ua(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function yc(t, e, n) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(t, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(t), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = Jn));
    else if (l !== 4 && (l === 27 && Ua(t.type) && (n = t.stateNode, e = null), t = t.child, t !== null))
      for (yc(t, e, n), t = t.sibling; t !== null; )
        yc(t, e, n), t = t.sibling;
  }
  function Jr(t, e, n) {
    var l = t.tag;
    if (l === 5 || l === 6)
      t = t.stateNode, e ? n.insertBefore(t, e) : n.appendChild(t);
    else if (l !== 4 && (l === 27 && Ua(t.type) && (n = t.stateNode), t = t.child, t !== null))
      for (Jr(t, e, n), t = t.sibling; t !== null; )
        Jr(t, e, n), t = t.sibling;
  }
  function Om(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var l = t.type, s = e.attributes; s.length; )
        e.removeAttributeNode(s[0]);
      Le(e, l, n), e[He] = t, e[$e] = n;
    } catch (u) {
      ee(t, t.return, u);
    }
  }
  var ra = !1, ze = !1, wc = !1, Bm = typeof WeakSet == "function" ? WeakSet : Set, Oe = null;
  function g0(t, e) {
    if (t = t.containerInfo, Qc = bs, t = Zf(t), mu(t)) {
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
            var h = 0, b = -1, j = -1, L = 0, K = 0, P = t, G = null;
            e: for (; ; ) {
              for (var V; P !== n || s !== 0 && P.nodeType !== 3 || (b = h + s), P !== u || l !== 0 && P.nodeType !== 3 || (j = h + l), P.nodeType === 3 && (h += P.nodeValue.length), (V = P.firstChild) !== null; )
                G = P, P = V;
              for (; ; ) {
                if (P === t) break e;
                if (G === n && ++L === s && (b = h), G === u && ++K === l && (j = h), (V = P.nextSibling) !== null) break;
                P = G, G = P.parentNode;
              }
              P = V;
            }
            n = b === -1 || j === -1 ? null : { start: b, end: j };
          } else n = null;
        }
      n = n || { start: 0, end: 0 };
    } else n = null;
    for (Yc = { focusedElem: t, selectionRange: n }, bs = !1, Oe = e; Oe !== null; )
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
                  var mt = Ci(
                    n.type,
                    s
                  );
                  t = l.getSnapshotBeforeUpdate(
                    mt,
                    u
                  ), l.__reactInternalSnapshotBeforeUpdate = t;
                } catch (Ct) {
                  ee(
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
                  Kc(t);
                else if (n === 1)
                  switch (t.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Kc(t);
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
  function Hm(t, e, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ua(t, n), l & 4 && fo(5, n);
        break;
      case 1:
        if (ua(t, n), l & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (h) {
              ee(n, n.return, h);
            }
          else {
            var s = Ci(
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
              ee(
                n,
                n.return,
                h
              );
            }
          }
        l & 64 && Rm(n), l & 512 && ho(n, n.return);
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
            yh(t, e);
          } catch (h) {
            ee(n, n.return, h);
          }
        }
        break;
      case 27:
        e === null && l & 4 && Om(n);
      case 26:
      case 5:
        ua(t, n), e === null && l & 4 && Mm(n), l & 512 && ho(n, n.return);
        break;
      case 12:
        ua(t, n);
        break;
      case 31:
        ua(t, n), l & 4 && Um(t, n);
        break;
      case 13:
        ua(t, n), l & 4 && Lm(t, n), l & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = _0.bind(
          null,
          n
        ), X0(t, n))));
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
  function km(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, km(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && Js(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var ge = null, Je = !1;
  function sa(t, e, n) {
    for (n = n.child; n !== null; )
      qm(t, e, n), n = n.sibling;
  }
  function qm(t, e, n) {
    if (nn && typeof nn.onCommitFiberUnmount == "function")
      try {
        nn.onCommitFiberUnmount(Hl, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        ze || Ln(n, e), sa(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        ze || Ln(n, e);
        var l = ge, s = Je;
        Ua(n.type) && (ge = n.stateNode, Je = !1), sa(
          t,
          e,
          n
        ), So(n.stateNode), ge = l, Je = s;
        break;
      case 5:
        ze || Ln(n, e);
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
              ee(
                n,
                e,
                u
              );
            }
          else
            try {
              ge.removeChild(n.stateNode);
            } catch (u) {
              ee(
                n,
                e,
                u
              );
            }
        break;
      case 18:
        ge !== null && (Je ? (t = ge, Rp(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), yl(t)) : Rp(ge, n.stateNode));
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
        Ma(2, n, e), ze || Ma(4, n, e), sa(
          t,
          e,
          n
        );
        break;
      case 1:
        ze || (Ln(n, e), l = n.stateNode, typeof l.componentWillUnmount == "function" && Nm(
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
  function Um(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        yl(t);
      } catch (n) {
        ee(e, e.return, n);
      }
    }
  }
  function Lm(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        yl(t);
      } catch (n) {
        ee(e, e.return, n);
      }
  }
  function x0(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Bm()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Bm()), e;
      default:
        throw Error(r(435, t.tag));
    }
  }
  function Wr(t, e) {
    var n = x0(t);
    e.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var s = j0.bind(null, t, l);
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
        qm(u, h, s), ge = null, Je = !1, u = s.alternate, u !== null && (u.return = null), s.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Gm(e, t), e = e.sibling;
  }
  var Nn = null;
  function Gm(t, e) {
    var n = t.alternate, l = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        We(e, t), Pe(t), l & 4 && (Ma(3, t, t.return), fo(3, t), Ma(5, t, t.return));
        break;
      case 1:
        We(e, t), Pe(t), l & 512 && (ze || n === null || Ln(n, n.return)), l & 64 && ra && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? l : n.concat(l))));
        break;
      case 26:
        var s = Nn;
        if (We(e, t), Pe(t), l & 512 && (ze || n === null || Ln(n, n.return)), l & 4) {
          var u = n !== null ? n.memoizedState : null;
          if (l = t.memoizedState, n === null)
            if (l === null)
              if (t.stateNode === null) {
                t: {
                  l = t.type, n = t.memoizedProps, s = s.ownerDocument || s;
                  e: switch (l) {
                    case "title":
                      u = s.getElementsByTagName("title")[0], (!u || u[Ul] || u[He] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = s.createElement(l), s.head.insertBefore(
                        u,
                        s.querySelector("head > title")
                      )), Le(u, l, n), u[He] = t, De(u), l = u;
                      break t;
                    case "link":
                      var h = Gp(
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
                      u = s.createElement(l), Le(u, l, n), s.head.appendChild(u);
                      break;
                    case "meta":
                      if (h = Gp(
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
                      u = s.createElement(l), Le(u, l, n), s.head.appendChild(u);
                      break;
                    default:
                      throw Error(r(468, l));
                  }
                  u[He] = t, De(u), l = u;
                }
                t.stateNode = l;
              } else
                Qp(
                  s,
                  t.type,
                  t.stateNode
                );
            else
              t.stateNode = Lp(
                s,
                l,
                t.memoizedProps
              );
          else
            u !== l ? (u === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : u.count--, l === null ? Qp(
              s,
              t.type,
              t.stateNode
            ) : Lp(
              s,
              l,
              t.memoizedProps
            )) : l === null && t.stateNode !== null && bc(
              t,
              t.memoizedProps,
              n.memoizedProps
            );
        }
        break;
      case 27:
        We(e, t), Pe(t), l & 512 && (ze || n === null || Ln(n, n.return)), n !== null && l & 4 && bc(
          t,
          t.memoizedProps,
          n.memoizedProps
        );
        break;
      case 5:
        if (We(e, t), Pe(t), l & 512 && (ze || n === null || Ln(n, n.return)), t.flags & 32) {
          s = t.stateNode;
          try {
            Yi(s, "");
          } catch (mt) {
            ee(t, t.return, mt);
          }
        }
        l & 4 && t.stateNode != null && (s = t.memoizedProps, bc(
          t,
          s,
          n !== null ? n.memoizedProps : s
        )), l & 1024 && (wc = !0);
        break;
      case 6:
        if (We(e, t), Pe(t), l & 4) {
          if (t.stateNode === null)
            throw Error(r(162));
          l = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = l;
          } catch (mt) {
            ee(t, t.return, mt);
          }
        }
        break;
      case 3:
        if (ms = null, s = Nn, Nn = fs(e.containerInfo), We(e, t), Nn = s, Pe(t), l & 4 && n !== null && n.memoizedState.isDehydrated)
          try {
            yl(e.containerInfo);
          } catch (mt) {
            ee(t, t.return, mt);
          }
        wc && (wc = !1, Qm(t));
        break;
      case 4:
        l = Nn, Nn = fs(
          t.stateNode.containerInfo
        ), We(e, t), Pe(t), Nn = l;
        break;
      case 12:
        We(e, t), Pe(t);
        break;
      case 31:
        We(e, t), Pe(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Wr(t, l)));
        break;
      case 13:
        We(e, t), Pe(t), t.child.flags & 8192 && t.memoizedState !== null != (n !== null && n.memoizedState !== null) && (ts = pe()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Wr(t, l)));
        break;
      case 22:
        s = t.memoizedState !== null;
        var j = n !== null && n.memoizedState !== null, L = ra, K = ze;
        if (ra = L || s, ze = K || j, We(e, t), ze = K, ra = L, Pe(t), l & 8192)
          t: for (e = t.stateNode, e._visibility = s ? e._visibility & -2 : e._visibility | 1, s && (n === null || j || ra || ze || Ti(t)), n = null, e = t; ; ) {
            if (e.tag === 5 || e.tag === 26) {
              if (n === null) {
                j = n = e;
                try {
                  if (u = j.stateNode, s)
                    h = u.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none";
                  else {
                    b = j.stateNode;
                    var P = j.memoizedProps.style, G = P != null && P.hasOwnProperty("display") ? P.display : null;
                    b.style.display = G == null || typeof G == "boolean" ? "" : ("" + G).trim();
                  }
                } catch (mt) {
                  ee(j, j.return, mt);
                }
              }
            } else if (e.tag === 6) {
              if (n === null) {
                j = e;
                try {
                  j.stateNode.nodeValue = s ? "" : j.memoizedProps;
                } catch (mt) {
                  ee(j, j.return, mt);
                }
              }
            } else if (e.tag === 18) {
              if (n === null) {
                j = e;
                try {
                  var V = j.stateNode;
                  s ? Np(V, !0) : Np(j.stateNode, !1);
                } catch (mt) {
                  ee(j, j.return, mt);
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
        l & 4 && (l = t.updateQueue, l !== null && (n = l.retryQueue, n !== null && (l.retryQueue = null, Wr(t, n))));
        break;
      case 19:
        We(e, t), Pe(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Wr(t, l)));
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
          if (Dm(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        if (n == null) throw Error(r(160));
        switch (n.tag) {
          case 27:
            var s = n.stateNode, u = vc(t);
            Jr(t, u, s);
            break;
          case 5:
            var h = n.stateNode;
            n.flags & 32 && (Yi(h, ""), n.flags &= -33);
            var b = vc(t);
            Jr(t, b, h);
            break;
          case 3:
          case 4:
            var j = n.stateNode.containerInfo, L = vc(t);
            yc(
              t,
              L,
              j
            );
            break;
          default:
            throw Error(r(161));
        }
      } catch (K) {
        ee(t, t.return, K);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Qm(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Qm(e), e.tag === 5 && e.flags & 1024 && e.stateNode.reset(), t = t.sibling;
      }
  }
  function ua(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Hm(t, e.alternate, e), e = e.sibling;
  }
  function Ti(t) {
    for (t = t.child; t !== null; ) {
      var e = t;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Ma(4, e, e.return), Ti(e);
          break;
        case 1:
          Ln(e, e.return);
          var n = e.stateNode;
          typeof n.componentWillUnmount == "function" && Nm(
            e,
            e.return,
            n
          ), Ti(e);
          break;
        case 27:
          So(e.stateNode);
        case 26:
        case 5:
          Ln(e, e.return), Ti(e);
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
          ), fo(4, u);
          break;
        case 1:
          if (ca(
            s,
            u,
            n
          ), l = u, s = l.stateNode, typeof s.componentDidMount == "function")
            try {
              s.componentDidMount();
            } catch (L) {
              ee(l, l.return, L);
            }
          if (l = u, s = l.updateQueue, s !== null) {
            var b = l.stateNode;
            try {
              var j = s.shared.hiddenCallbacks;
              if (j !== null)
                for (s.shared.hiddenCallbacks = null, s = 0; s < j.length; s++)
                  vh(j[s], b);
            } catch (L) {
              ee(l, l.return, L);
            }
          }
          n && h & 64 && Rm(u), ho(u, u.return);
          break;
        case 27:
          Om(u);
        case 26:
        case 5:
          ca(
            s,
            u,
            n
          ), n && l === null && h & 4 && Mm(u), ho(u, u.return);
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
          ), n && h & 4 && Um(s, u);
          break;
        case 13:
          ca(
            s,
            u,
            n
          ), n && h & 4 && Lm(s, u);
          break;
        case 22:
          u.memoizedState === null && ca(
            s,
            u,
            n
          ), ho(u, u.return);
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
  function Sc(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Wl(n));
  }
  function Cc(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Wl(t));
  }
  function Mn(t, e, n, l) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; )
        Ym(
          t,
          e,
          n,
          l
        ), e = e.sibling;
  }
  function Ym(t, e, n, l) {
    var s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Mn(
          t,
          e,
          n,
          l
        ), s & 2048 && fo(9, e);
        break;
      case 1:
        Mn(
          t,
          e,
          n,
          l
        );
        break;
      case 3:
        Mn(
          t,
          e,
          n,
          l
        ), s & 2048 && (t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Wl(t)));
        break;
      case 12:
        if (s & 2048) {
          Mn(
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
            ee(e, e.return, j);
          }
        } else
          Mn(
            t,
            e,
            n,
            l
          );
        break;
      case 31:
        Mn(
          t,
          e,
          n,
          l
        );
        break;
      case 13:
        Mn(
          t,
          e,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        u = e.stateNode, h = e.alternate, e.memoizedState !== null ? u._visibility & 2 ? Mn(
          t,
          e,
          n,
          l
        ) : mo(t, e) : u._visibility & 2 ? Mn(
          t,
          e,
          n,
          l
        ) : (u._visibility |= 2, ul(
          t,
          e,
          n,
          l,
          (e.subtreeFlags & 10256) !== 0 || !1
        )), s & 2048 && Sc(h, e);
        break;
      case 24:
        Mn(
          t,
          e,
          n,
          l
        ), s & 2048 && Cc(e.alternate, e);
        break;
      default:
        Mn(
          t,
          e,
          n,
          l
        );
    }
  }
  function ul(t, e, n, l, s) {
    for (s = s && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var u = t, h = e, b = n, j = l, L = h.flags;
      switch (h.tag) {
        case 0:
        case 11:
        case 15:
          ul(
            u,
            h,
            b,
            j,
            s
          ), fo(8, h);
          break;
        case 23:
          break;
        case 22:
          var K = h.stateNode;
          h.memoizedState !== null ? K._visibility & 2 ? ul(
            u,
            h,
            b,
            j,
            s
          ) : mo(
            u,
            h
          ) : (K._visibility |= 2, ul(
            u,
            h,
            b,
            j,
            s
          )), s && L & 2048 && Sc(
            h.alternate,
            h
          );
          break;
        case 24:
          ul(
            u,
            h,
            b,
            j,
            s
          ), s && L & 2048 && Cc(h.alternate, h);
          break;
        default:
          ul(
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
  function mo(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, l = e, s = l.flags;
        switch (l.tag) {
          case 22:
            mo(n, l), s & 2048 && Sc(
              l.alternate,
              l
            );
            break;
          case 24:
            mo(n, l), s & 2048 && Cc(l.alternate, l);
            break;
          default:
            mo(n, l);
        }
        e = e.sibling;
      }
  }
  var po = 8192;
  function cl(t, e, n) {
    if (t.subtreeFlags & po)
      for (t = t.child; t !== null; )
        Vm(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function Vm(t, e, n) {
    switch (t.tag) {
      case 26:
        cl(
          t,
          e,
          n
        ), t.flags & po && t.memoizedState !== null && ay(
          n,
          Nn,
          t.memoizedState,
          t.memoizedProps
        );
        break;
      case 5:
        cl(
          t,
          e,
          n
        );
        break;
      case 3:
      case 4:
        var l = Nn;
        Nn = fs(t.stateNode.containerInfo), cl(
          t,
          e,
          n
        ), Nn = l;
        break;
      case 22:
        t.memoizedState === null && (l = t.alternate, l !== null && l.memoizedState !== null ? (l = po, po = 16777216, cl(
          t,
          e,
          n
        ), po = l) : cl(
          t,
          e,
          n
        ));
        break;
      default:
        cl(
          t,
          e,
          n
        );
    }
  }
  function Xm(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function go(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          Oe = l, Zm(
            l,
            t
          );
        }
      Xm(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        Km(t), t = t.sibling;
  }
  function Km(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        go(t), t.flags & 2048 && Ma(9, t, t.return);
        break;
      case 3:
        go(t);
        break;
      case 12:
        go(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, Pr(t)) : go(t);
        break;
      default:
        go(t);
    }
  }
  function Pr(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          Oe = l, Zm(
            l,
            t
          );
        }
      Xm(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          Ma(8, e, e.return), Pr(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, Pr(e));
          break;
        default:
          Pr(e);
      }
      t = t.sibling;
    }
  }
  function Zm(t, e) {
    for (; Oe !== null; ) {
      var n = Oe;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Ma(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Wl(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, Oe = l;
      else
        t: for (n = t; Oe !== null; ) {
          l = Oe;
          var s = l.sibling, u = l.return;
          if (km(l), l === n) {
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
  var b0 = {
    getCacheForType: function(t) {
      var e = qe(Te), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return qe(Te).controller.signal;
    }
  }, v0 = typeof WeakMap == "function" ? WeakMap : Map, Ft = 0, se = null, Ht = null, Ut = 0, te = 0, un = null, Da = !1, dl = !1, Tc = !1, da = 0, ve = 0, Oa = 0, _i = 0, _c = 0, cn = 0, fl = 0, xo = null, tn = null, jc = !1, ts = 0, Im = 0, es = 1 / 0, ns = null, Ba = null, Re = 0, Ha = null, hl = null, fa = 0, zc = 0, Ac = null, $m = null, bo = 0, Ec = null;
  function dn() {
    return (Ft & 2) !== 0 && Ut !== 0 ? Ut & -Ut : q.T !== null ? Bc() : df();
  }
  function Fm() {
    if (cn === 0)
      if ((Ut & 536870912) === 0 || Qt) {
        var t = cr;
        cr <<= 1, (cr & 3932160) === 0 && (cr = 262144), cn = t;
      } else cn = 536870912;
    return t = rn.current, t !== null && (t.flags |= 32), cn;
  }
  function en(t, e, n) {
    (t === se && (te === 2 || te === 9) || t.cancelPendingCommit !== null) && (ml(t, 0), ka(
      t,
      Ut,
      cn,
      !1
    )), ql(t, n), ((Ft & 2) === 0 || t !== se) && (t === se && ((Ft & 2) === 0 && (_i |= n), ve === 4 && ka(
      t,
      Ut,
      cn,
      !1
    )), Gn(t));
  }
  function Jm(t, e, n) {
    if ((Ft & 6) !== 0) throw Error(r(327));
    var l = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || kl(t, e), s = l ? S0(t, e) : Nc(t, e, !0), u = l;
    do {
      if (s === 0) {
        dl && !l && ka(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, u && !y0(n)) {
          s = Nc(t, e, !1), u = !1;
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
              s = xo;
              var j = b.current.memoizedState.isDehydrated;
              if (j && (ml(b, h).flags |= 256), h = Nc(
                b,
                h,
                !1
              ), h !== 2) {
                if (Tc && !j) {
                  b.errorRecoveryDisabledLanes |= u, _i |= u, s = 4;
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
          ml(t, 0), ka(t, e, 0, !0);
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
              ka(
                l,
                e,
                cn,
                !Da
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
          if ((e & 62914560) === e && (s = ts + 300 - pe(), 10 < s)) {
            if (ka(
              l,
              e,
              cn,
              !Da
            ), fr(l, 0, !0) !== 0) break t;
            fa = e, l.timeoutHandle = Ap(
              Wm.bind(
                null,
                l,
                n,
                tn,
                ns,
                jc,
                e,
                cn,
                _i,
                fl,
                Da,
                u,
                "Throttled",
                -0,
                0
              ),
              s
            );
            break t;
          }
          Wm(
            l,
            n,
            tn,
            ns,
            jc,
            e,
            cn,
            _i,
            fl,
            Da,
            u,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Gn(t);
  }
  function Wm(t, e, n, l, s, u, h, b, j, L, K, P, G, V) {
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
      }, Vm(
        e,
        u,
        P
      );
      var mt = (u & 62914560) === u ? ts - pe() : (u & 4194048) === u ? Im - pe() : 0;
      if (mt = iy(
        P,
        mt
      ), mt !== null) {
        fa = u, t.cancelPendingCommit = mt(
          op.bind(
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
            K,
            P,
            null,
            G,
            V
          )
        ), ka(t, u, h, !L);
        return;
      }
    }
    op(
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
  function y0(t) {
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
  function ka(t, e, n, l) {
    e &= ~_c, e &= ~_i, t.suspendedLanes |= e, t.pingedLanes &= ~e, l && (t.warmLanes |= e), l = t.expirationTimes;
    for (var s = e; 0 < s; ) {
      var u = 31 - an(s), h = 1 << u;
      l[u] = -1, s &= ~h;
    }
    n !== 0 && sf(t, n, e);
  }
  function as() {
    return (Ft & 6) === 0 ? (vo(0), !1) : !0;
  }
  function Rc() {
    if (Ht !== null) {
      if (te === 0)
        var t = Ht.return;
      else
        t = Ht, ea = gi = null, Ku(t), il = null, to = 0, t = Ht;
      for (; t !== null; )
        Em(t.alternate, t), t = t.return;
      Ht = null;
    }
  }
  function ml(t, e) {
    var n = t.timeoutHandle;
    n !== -1 && (t.timeoutHandle = -1, L0(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), fa = 0, Rc(), se = t, Ht = n = Pn(t.current, null), Ut = e, te = 0, un = null, Da = !1, dl = kl(t, e), Tc = !1, fl = cn = _c = _i = Oa = ve = 0, tn = xo = null, jc = !1, (e & 8) !== 0 && (e |= e & 32);
    var l = t.entangledLanes;
    if (l !== 0)
      for (t = t.entanglements, l &= e; 0 < l; ) {
        var s = 31 - an(l), u = 1 << s;
        e |= t[s], l &= ~u;
      }
    return da = e, Tr(), n;
  }
  function Pm(t, e) {
    Nt = null, q.H = so, e === al || e === Mr ? (e = ph(), te = 3) : e === Ou ? (e = ph(), te = 4) : te = e === sc ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, un = e, Ht === null && (ve = 1, Kr(
      t,
      vn(e, t.current)
    ));
  }
  function tp() {
    var t = rn.current;
    return t === null ? !0 : (Ut & 4194048) === Ut ? Cn === null : (Ut & 62914560) === Ut || (Ut & 536870912) !== 0 ? t === Cn : !1;
  }
  function ep() {
    var t = q.H;
    return q.H = so, t === null ? so : t;
  }
  function np() {
    var t = q.A;
    return q.A = b0, t;
  }
  function is() {
    ve = 4, Da || (Ut & 4194048) !== Ut && rn.current !== null || (dl = !0), (Oa & 134217727) === 0 && (_i & 134217727) === 0 || se === null || ka(
      se,
      Ut,
      cn,
      !1
    );
  }
  function Nc(t, e, n) {
    var l = Ft;
    Ft |= 2;
    var s = ep(), u = np();
    (se !== t || Ut !== e) && (ns = null, ml(t, e)), e = !1;
    var h = ve;
    t: do
      try {
        if (te !== 0 && Ht !== null) {
          var b = Ht, j = un;
          switch (te) {
            case 8:
              Rc(), h = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              rn.current === null && (e = !0);
              var L = te;
              if (te = 0, un = null, pl(t, b, j, L), n && dl) {
                h = 0;
                break t;
              }
              break;
            default:
              L = te, te = 0, un = null, pl(t, b, j, L);
          }
        }
        w0(), h = ve;
        break;
      } catch (K) {
        Pm(t, K);
      }
    while (!0);
    return e && t.shellSuspendCounter++, ea = gi = null, Ft = l, q.H = s, q.A = u, Ht === null && (se = null, Ut = 0, Tr()), h;
  }
  function w0() {
    for (; Ht !== null; ) ap(Ht);
  }
  function S0(t, e) {
    var n = Ft;
    Ft |= 2;
    var l = ep(), s = np();
    se !== t || Ut !== e ? (ns = null, es = pe() + 500, ml(t, e)) : dl = kl(
      t,
      e
    );
    t: do
      try {
        if (te !== 0 && Ht !== null) {
          e = Ht;
          var u = un;
          e: switch (te) {
            case 1:
              te = 0, un = null, pl(t, e, u, 1);
              break;
            case 2:
            case 9:
              if (hh(u)) {
                te = 0, un = null, ip(e);
                break;
              }
              e = function() {
                te !== 2 && te !== 9 || se !== t || (te = 7), Gn(t);
              }, u.then(e, e);
              break t;
            case 3:
              te = 7;
              break t;
            case 4:
              te = 5;
              break t;
            case 7:
              hh(u) ? (te = 0, un = null, ip(e)) : (te = 0, un = null, pl(t, e, u, 7));
              break;
            case 5:
              var h = null;
              switch (Ht.tag) {
                case 26:
                  h = Ht.memoizedState;
                case 5:
                case 27:
                  var b = Ht;
                  if (h ? Yp(h) : b.stateNode.complete) {
                    te = 0, un = null;
                    var j = b.sibling;
                    if (j !== null) Ht = j;
                    else {
                      var L = b.return;
                      L !== null ? (Ht = L, ls(L)) : Ht = null;
                    }
                    break e;
                  }
              }
              te = 0, un = null, pl(t, e, u, 5);
              break;
            case 6:
              te = 0, un = null, pl(t, e, u, 6);
              break;
            case 8:
              Rc(), ve = 6;
              break t;
            default:
              throw Error(r(462));
          }
        }
        C0();
        break;
      } catch (K) {
        Pm(t, K);
      }
    while (!0);
    return ea = gi = null, q.H = l, q.A = s, Ft = n, Ht !== null ? 0 : (se = null, Ut = 0, Tr(), ve);
  }
  function C0() {
    for (; Ht !== null && !$n(); )
      ap(Ht);
  }
  function ap(t) {
    var e = zm(t.alternate, t, da);
    t.memoizedProps = t.pendingProps, e === null ? ls(t) : Ht = e;
  }
  function ip(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = wm(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          Ut
        );
        break;
      case 11:
        e = wm(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Ut
        );
        break;
      case 5:
        Ku(e);
      default:
        Em(n, e), e = Ht = nh(e, da), e = zm(n, e, da);
    }
    t.memoizedProps = t.pendingProps, e === null ? ls(t) : Ht = e;
  }
  function pl(t, e, n, l) {
    ea = gi = null, Ku(e), il = null, to = 0;
    var s = e.return;
    try {
      if (d0(
        t,
        s,
        e,
        n,
        Ut
      )) {
        ve = 1, Kr(
          t,
          vn(n, t.current)
        ), Ht = null;
        return;
      }
    } catch (u) {
      if (s !== null) throw Ht = s, u;
      ve = 1, Kr(
        t,
        vn(n, t.current)
      ), Ht = null;
      return;
    }
    e.flags & 32768 ? (Qt || l === 1 ? t = !0 : dl || (Ut & 536870912) !== 0 ? t = !1 : (Da = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = rn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), lp(e, t)) : ls(e);
  }
  function ls(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        lp(
          e,
          Da
        );
        return;
      }
      t = e.return;
      var n = m0(
        e.alternate,
        e,
        da
      );
      if (n !== null) {
        Ht = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        Ht = e;
        return;
      }
      Ht = e = t;
    } while (e !== null);
    ve === 0 && (ve = 5);
  }
  function lp(t, e) {
    do {
      var n = p0(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, Ht = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        Ht = t;
        return;
      }
      Ht = t = n;
    } while (t !== null);
    ve = 6, Ht = null;
  }
  function op(t, e, n, l, s, u, h, b, j) {
    t.cancelPendingCommit = null;
    do
      os();
    while (Re !== 0);
    if ((Ft & 6) !== 0) throw Error(r(327));
    if (e !== null) {
      if (e === t.current) throw Error(r(177));
      if (u = e.lanes | e.childLanes, u |= vu, nv(
        t,
        n,
        u,
        h,
        b,
        j
      ), t === se && (Ht = se = null, Ut = 0), hl = e, Ha = t, fa = n, zc = u, Ac = s, $m = l, (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, z0(ri, function() {
        return dp(), null;
      })) : (t.callbackNode = null, t.callbackPriority = 0), l = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || l) {
        l = q.T, q.T = null, s = W.p, W.p = 2, h = Ft, Ft |= 4;
        try {
          g0(t, e, n);
        } finally {
          Ft = h, W.p = s, q.T = l;
        }
      }
      Re = 1, rp(), sp(), up();
    }
  }
  function rp() {
    if (Re === 1) {
      Re = 0;
      var t = Ha, e = hl, n = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || n) {
        n = q.T, q.T = null;
        var l = W.p;
        W.p = 2;
        var s = Ft;
        Ft |= 4;
        try {
          Gm(e, t);
          var u = Yc, h = Zf(t.containerInfo), b = u.focusedElem, j = u.selectionRange;
          if (h !== b && b && b.ownerDocument && Kf(
            b.ownerDocument.documentElement,
            b
          )) {
            if (j !== null && mu(b)) {
              var L = j.start, K = j.end;
              if (K === void 0 && (K = L), "selectionStart" in b)
                b.selectionStart = L, b.selectionEnd = Math.min(
                  K,
                  b.value.length
                );
              else {
                var P = b.ownerDocument || document, G = P && P.defaultView || window;
                if (G.getSelection) {
                  var V = G.getSelection(), mt = b.textContent.length, Ct = Math.min(j.start, mt), le = j.end === void 0 ? Ct : Math.min(j.end, mt);
                  !V.extend && Ct > le && (h = le, le = Ct, Ct = h);
                  var H = Xf(
                    b,
                    Ct
                  ), R = Xf(
                    b,
                    le
                  );
                  if (H && R && (V.rangeCount !== 1 || V.anchorNode !== H.node || V.anchorOffset !== H.offset || V.focusNode !== R.node || V.focusOffset !== R.offset)) {
                    var U = P.createRange();
                    U.setStart(H.node, H.offset), V.removeAllRanges(), Ct > le ? (V.addRange(U), V.extend(R.node, R.offset)) : (U.setEnd(R.node, R.offset), V.addRange(U));
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
          bs = !!Qc, Yc = Qc = null;
        } finally {
          Ft = s, W.p = l, q.T = n;
        }
      }
      t.current = e, Re = 2;
    }
  }
  function sp() {
    if (Re === 2) {
      Re = 0;
      var t = Ha, e = hl, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = q.T, q.T = null;
        var l = W.p;
        W.p = 2;
        var s = Ft;
        Ft |= 4;
        try {
          Hm(t, e.alternate, e);
        } finally {
          Ft = s, W.p = l, q.T = n;
        }
      }
      Re = 3;
    }
  }
  function up() {
    if (Re === 4 || Re === 3) {
      Re = 0, ba();
      var t = Ha, e = hl, n = fa, l = $m;
      (e.subtreeFlags & 10256) !== 0 || (e.flags & 10256) !== 0 ? Re = 5 : (Re = 0, hl = Ha = null, cp(t, t.pendingLanes));
      var s = t.pendingLanes;
      if (s === 0 && (Ba = null), $s(n), e = e.stateNode, nn && typeof nn.onCommitFiberRoot == "function")
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
        e = q.T, s = W.p, W.p = 2, q.T = null;
        try {
          for (var u = t.onRecoverableError, h = 0; h < l.length; h++) {
            var b = l[h];
            u(b.value, {
              componentStack: b.stack
            });
          }
        } finally {
          q.T = e, W.p = s;
        }
      }
      (fa & 3) !== 0 && os(), Gn(t), s = t.pendingLanes, (n & 261930) !== 0 && (s & 42) !== 0 ? t === Ec ? bo++ : (bo = 0, Ec = t) : bo = 0, vo(0);
    }
  }
  function cp(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Wl(e)));
  }
  function os() {
    return rp(), sp(), up(), dp();
  }
  function dp() {
    if (Re !== 5) return !1;
    var t = Ha, e = zc;
    zc = 0;
    var n = $s(fa), l = q.T, s = W.p;
    try {
      W.p = 32 > n ? 32 : n, q.T = null, n = Ac, Ac = null;
      var u = Ha, h = fa;
      if (Re = 0, hl = Ha = null, fa = 0, (Ft & 6) !== 0) throw Error(r(331));
      var b = Ft;
      if (Ft |= 4, Km(u.current), Ym(
        u,
        u.current,
        h,
        n
      ), Ft = b, vo(0, !1), nn && typeof nn.onPostCommitFiberRoot == "function")
        try {
          nn.onPostCommitFiberRoot(Hl, u);
        } catch {
        }
      return !0;
    } finally {
      W.p = s, q.T = l, cp(t, e);
    }
  }
  function fp(t, e, n) {
    e = vn(n, e), e = rc(t.stateNode, e, 2), t = Ea(t, e, 2), t !== null && (ql(t, 2), Gn(t));
  }
  function ee(t, e, n) {
    if (t.tag === 3)
      fp(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          fp(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Ba === null || !Ba.has(l))) {
            t = vn(n, t), n = hm(2), l = Ea(e, n, 2), l !== null && (mm(
              n,
              l,
              e,
              t
            ), ql(l, 2), Gn(l));
            break;
          }
        }
        e = e.return;
      }
  }
  function Mc(t, e, n) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new v0();
      var s = /* @__PURE__ */ new Set();
      l.set(e, s);
    } else
      s = l.get(e), s === void 0 && (s = /* @__PURE__ */ new Set(), l.set(e, s));
    s.has(n) || (Tc = !0, s.add(n), t = T0.bind(null, t, e, n), e.then(t, t));
  }
  function T0(t, e, n) {
    var l = t.pingCache;
    l !== null && l.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, se === t && (Ut & n) === n && (ve === 4 || ve === 3 && (Ut & 62914560) === Ut && 300 > pe() - ts ? (Ft & 2) === 0 && ml(t, 0) : _c |= n, fl === Ut && (fl = 0)), Gn(t);
  }
  function hp(t, e) {
    e === 0 && (e = rf()), t = hi(t, e), t !== null && (ql(t, e), Gn(t));
  }
  function _0(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), hp(t, n);
  }
  function j0(t, e) {
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
    l !== null && l.delete(e), hp(t, n);
  }
  function z0(t, e) {
    return Et(t, e);
  }
  var rs = null, gl = null, Dc = !1, ss = !1, Oc = !1, qa = 0;
  function Gn(t) {
    t !== gl && t.next === null && (gl === null ? rs = gl = t : gl = gl.next = t), ss = !0, Dc || (Dc = !0, E0());
  }
  function vo(t, e) {
    if (!Oc && ss) {
      Oc = !0;
      do
        for (var n = !1, l = rs; l !== null; ) {
          if (t !== 0) {
            var s = l.pendingLanes;
            if (s === 0) var u = 0;
            else {
              var h = l.suspendedLanes, b = l.pingedLanes;
              u = (1 << 31 - an(42 | t) + 1) - 1, u &= s & ~(h & ~b), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0;
            }
            u !== 0 && (n = !0, xp(l, u));
          } else
            u = Ut, u = fr(
              l,
              l === se ? u : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (u & 3) === 0 || kl(l, u) || (n = !0, xp(l, u));
          l = l.next;
        }
      while (n);
      Oc = !1;
    }
  }
  function A0() {
    mp();
  }
  function mp() {
    ss = Dc = !1;
    var t = 0;
    qa !== 0 && U0() && (t = qa);
    for (var e = pe(), n = null, l = rs; l !== null; ) {
      var s = l.next, u = pp(l, e);
      u === 0 ? (l.next = null, n === null ? rs = s : n.next = s, s === null && (gl = n)) : (n = l, (t !== 0 || (u & 3) !== 0) && (ss = !0)), l = s;
    }
    Re !== 0 && Re !== 5 || vo(t), qa !== 0 && (qa = 0);
  }
  function pp(t, e) {
    for (var n = t.suspendedLanes, l = t.pingedLanes, s = t.expirationTimes, u = t.pendingLanes & -62914561; 0 < u; ) {
      var h = 31 - an(u), b = 1 << h, j = s[h];
      j === -1 ? ((b & n) === 0 || (b & l) !== 0) && (s[h] = ev(b, e)) : j <= e && (t.expiredLanes |= b), u &= ~b;
    }
    if (e = se, n = Ut, n = fr(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, n === 0 || t === e && (te === 2 || te === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && we(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || kl(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (l !== null && we(l), $s(n)) {
        case 2:
        case 8:
          n = oi;
          break;
        case 32:
          n = ri;
          break;
        case 268435456:
          n = rr;
          break;
        default:
          n = ri;
      }
      return l = gp.bind(null, t), n = Et(n, l), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return l !== null && l !== null && we(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function gp(t, e) {
    if (Re !== 0 && Re !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (os() && t.callbackNode !== n)
      return null;
    var l = Ut;
    return l = fr(
      t,
      t === se ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (Jm(t, l, e), pp(t, pe()), t.callbackNode != null && t.callbackNode === n ? gp.bind(null, t) : null);
  }
  function xp(t, e) {
    if (os()) return null;
    Jm(t, e, !0);
  }
  function E0() {
    G0(function() {
      (Ft & 6) !== 0 ? Et(
        va,
        A0
      ) : mp();
    });
  }
  function Bc() {
    if (qa === 0) {
      var t = el;
      t === 0 && (t = ur, ur <<= 1, (ur & 261888) === 0 && (ur = 256)), qa = t;
    }
    return qa;
  }
  function bp(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : gr("" + t);
  }
  function vp(t, e) {
    var n = e.ownerDocument.createElement("input");
    return n.name = e.name, n.value = e.value, t.id && n.setAttribute("form", t.id), e.parentNode.insertBefore(n, e), t = new FormData(t), n.parentNode.removeChild(n), t;
  }
  function R0(t, e, n, l, s) {
    if (e === "submit" && n && n.stateNode === s) {
      var u = bp(
        (s[$e] || null).action
      ), h = l.submitter;
      h && (e = (e = h[$e] || null) ? bp(e.formAction) : h.getAttribute("formAction"), e !== null && (u = e, h = null));
      var b = new yr(
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
                if (qa !== 0) {
                  var j = h ? vp(s, h) : new FormData(s);
                  ec(
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
                typeof u == "function" && (b.preventDefault(), j = h ? vp(s, h) : new FormData(s), ec(
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
  for (var Hc = 0; Hc < bu.length; Hc++) {
    var kc = bu[Hc], N0 = kc.toLowerCase(), M0 = kc[0].toUpperCase() + kc.slice(1);
    Rn(
      N0,
      "on" + M0
    );
  }
  Rn(Ff, "onAnimationEnd"), Rn(Jf, "onAnimationIteration"), Rn(Wf, "onAnimationStart"), Rn("dblclick", "onDoubleClick"), Rn("focusin", "onFocus"), Rn("focusout", "onBlur"), Rn(Iv, "onTransitionRun"), Rn($v, "onTransitionStart"), Rn(Fv, "onTransitionCancel"), Rn(Pf, "onTransitionEnd"), Gi("onMouseEnter", ["mouseout", "mouseover"]), Gi("onMouseLeave", ["mouseout", "mouseover"]), Gi("onPointerEnter", ["pointerout", "pointerover"]), Gi("onPointerLeave", ["pointerout", "pointerover"]), ui(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), ui(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), ui("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), ui(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), ui(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), ui(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var yo = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), D0 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yo)
  );
  function yp(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var l = t[n], s = l.event;
      l = l.listeners;
      t: {
        var u = void 0;
        if (e)
          for (var h = l.length - 1; 0 <= h; h--) {
            var b = l[h], j = b.instance, L = b.currentTarget;
            if (b = b.listener, j !== u && s.isPropagationStopped())
              break t;
            u = b, s.currentTarget = L;
            try {
              u(s);
            } catch (K) {
              Cr(K);
            }
            s.currentTarget = null, u = j;
          }
        else
          for (h = 0; h < l.length; h++) {
            if (b = l[h], j = b.instance, L = b.currentTarget, b = b.listener, j !== u && s.isPropagationStopped())
              break t;
            u = b, s.currentTarget = L;
            try {
              u(s);
            } catch (K) {
              Cr(K);
            }
            s.currentTarget = null, u = j;
          }
      }
    }
  }
  function kt(t, e) {
    var n = e[Fs];
    n === void 0 && (n = e[Fs] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    n.has(l) || (wp(e, t, 2, !1), n.add(l));
  }
  function qc(t, e, n) {
    var l = 0;
    e && (l |= 4), wp(
      n,
      t,
      l,
      e
    );
  }
  var us = "_reactListening" + Math.random().toString(36).slice(2);
  function Uc(t) {
    if (!t[us]) {
      t[us] = !0, mf.forEach(function(n) {
        n !== "selectionchange" && (D0.has(n) || qc(n, !1, t), qc(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[us] || (e[us] = !0, qc("selectionchange", !1, e));
    }
  }
  function wp(t, e, n, l) {
    switch (Fp(e)) {
      case 2:
        var s = ry;
        break;
      case 8:
        s = sy;
        break;
      default:
        s = td;
    }
    n = s.bind(
      null,
      e,
      n,
      t
    ), s = void 0, !lu || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (s = !0), l ? s !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: s
    }) : t.addEventListener(e, n, !0) : s !== void 0 ? t.addEventListener(e, n, {
      passive: s
    }) : t.addEventListener(e, n, !1);
  }
  function Lc(t, e, n, l, s) {
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
            if (h = qi(b), h === null) return;
            if (j = h.tag, j === 5 || j === 6 || j === 26 || j === 27) {
              l = u = h;
              continue t;
            }
            b = b.parentNode;
          }
        }
        l = l.return;
      }
    jf(function() {
      var L = u, K = au(n), P = [];
      t: {
        var G = th.get(t);
        if (G !== void 0) {
          var V = yr, mt = t;
          switch (t) {
            case "keypress":
              if (br(n) === 0) break t;
            case "keydown":
            case "keyup":
              V = jv;
              break;
            case "focusin":
              mt = "focus", V = uu;
              break;
            case "focusout":
              mt = "blur", V = uu;
              break;
            case "beforeblur":
            case "afterblur":
              V = uu;
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
              V = Ef;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              V = mv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              V = Ev;
              break;
            case Ff:
            case Jf:
            case Wf:
              V = xv;
              break;
            case Pf:
              V = Nv;
              break;
            case "scroll":
            case "scrollend":
              V = fv;
              break;
            case "wheel":
              V = Dv;
              break;
            case "copy":
            case "cut":
            case "paste":
              V = vv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              V = Nf;
              break;
            case "toggle":
            case "beforetoggle":
              V = Bv;
          }
          var Ct = (e & 4) !== 0, le = !Ct && (t === "scroll" || t === "scrollend"), H = Ct ? G !== null ? G + "Capture" : null : G;
          Ct = [];
          for (var R = L, U; R !== null; ) {
            var J = R;
            if (U = J.stateNode, J = J.tag, J !== 5 && J !== 26 && J !== 27 || U === null || H === null || (J = Gl(R, H), J != null && Ct.push(
              wo(R, J, U)
            )), le) break;
            R = R.return;
          }
          0 < Ct.length && (G = new V(
            G,
            mt,
            null,
            n,
            K
          ), P.push({ event: G, listeners: Ct }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (G = t === "mouseover" || t === "pointerover", V = t === "mouseout" || t === "pointerout", G && n !== nu && (mt = n.relatedTarget || n.fromElement) && (qi(mt) || mt[ki]))
            break t;
          if ((V || G) && (G = K.window === K ? K : (G = K.ownerDocument) ? G.defaultView || G.parentWindow : window, V ? (mt = n.relatedTarget || n.toElement, V = L, mt = mt ? qi(mt) : null, mt !== null && (le = f(mt), Ct = mt.tag, mt !== le || Ct !== 5 && Ct !== 27 && Ct !== 6) && (mt = null)) : (V = null, mt = L), V !== mt)) {
            if (Ct = Ef, J = "onMouseLeave", H = "onMouseEnter", R = "mouse", (t === "pointerout" || t === "pointerover") && (Ct = Nf, J = "onPointerLeave", H = "onPointerEnter", R = "pointer"), le = V == null ? G : Ll(V), U = mt == null ? G : Ll(mt), G = new Ct(
              J,
              R + "leave",
              V,
              n,
              K
            ), G.target = le, G.relatedTarget = U, J = null, qi(K) === L && (Ct = new Ct(
              H,
              R + "enter",
              mt,
              n,
              K
            ), Ct.target = U, Ct.relatedTarget = le, J = Ct), le = J, V && mt)
              e: {
                for (Ct = O0, H = V, R = mt, U = 0, J = H; J; J = Ct(J))
                  U++;
                J = 0;
                for (var yt = R; yt; yt = Ct(yt))
                  J++;
                for (; 0 < U - J; )
                  H = Ct(H), U--;
                for (; 0 < J - U; )
                  R = Ct(R), J--;
                for (; U--; ) {
                  if (H === R || R !== null && H === R.alternate) {
                    Ct = H;
                    break e;
                  }
                  H = Ct(H), R = Ct(R);
                }
                Ct = null;
              }
            else Ct = null;
            V !== null && Sp(
              P,
              G,
              V,
              Ct,
              !1
            ), mt !== null && le !== null && Sp(
              P,
              le,
              mt,
              Ct,
              !0
            );
          }
        }
        t: {
          if (G = L ? Ll(L) : window, V = G.nodeName && G.nodeName.toLowerCase(), V === "select" || V === "input" && G.type === "file")
            var Zt = Uf;
          else if (kf(G))
            if (Lf)
              Zt = Xv;
            else {
              Zt = Yv;
              var gt = Qv;
            }
          else
            V = G.nodeName, !V || V.toLowerCase() !== "input" || G.type !== "checkbox" && G.type !== "radio" ? L && eu(L.elementType) && (Zt = Uf) : Zt = Vv;
          if (Zt && (Zt = Zt(t, L))) {
            qf(
              P,
              Zt,
              n,
              K
            );
            break t;
          }
          gt && gt(t, G, L), t === "focusout" && L && G.type === "number" && L.memoizedProps.value != null && tu(G, "number", G.value);
        }
        switch (gt = L ? Ll(L) : window, t) {
          case "focusin":
            (kf(gt) || gt.contentEditable === "true") && (Zi = gt, pu = L, $l = null);
            break;
          case "focusout":
            $l = pu = Zi = null;
            break;
          case "mousedown":
            gu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gu = !1, If(P, n, K);
            break;
          case "selectionchange":
            if (Zv) break;
          case "keydown":
          case "keyup":
            If(P, n, K);
        }
        var Mt;
        if (du)
          t: {
            switch (t) {
              case "compositionstart":
                var Lt = "onCompositionStart";
                break t;
              case "compositionend":
                Lt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Lt = "onCompositionUpdate";
                break t;
            }
            Lt = void 0;
          }
        else
          Ki ? Bf(t, n) && (Lt = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (Lt = "onCompositionStart");
        Lt && (Mf && n.locale !== "ko" && (Ki || Lt !== "onCompositionStart" ? Lt === "onCompositionEnd" && Ki && (Mt = zf()) : (Sa = K, ou = "value" in Sa ? Sa.value : Sa.textContent, Ki = !0)), gt = cs(L, Lt), 0 < gt.length && (Lt = new Rf(
          Lt,
          t,
          null,
          n,
          K
        ), P.push({ event: Lt, listeners: gt }), Mt ? Lt.data = Mt : (Mt = Hf(n), Mt !== null && (Lt.data = Mt)))), (Mt = kv ? qv(t, n) : Uv(t, n)) && (Lt = cs(L, "onBeforeInput"), 0 < Lt.length && (gt = new Rf(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          K
        ), P.push({
          event: gt,
          listeners: Lt
        }), gt.data = Mt)), R0(
          P,
          t,
          L,
          n,
          K
        );
      }
      yp(P, e);
    });
  }
  function wo(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function cs(t, e) {
    for (var n = e + "Capture", l = []; t !== null; ) {
      var s = t, u = s.stateNode;
      if (s = s.tag, s !== 5 && s !== 26 && s !== 27 || u === null || (s = Gl(t, n), s != null && l.unshift(
        wo(t, s, u)
      ), s = Gl(t, e), s != null && l.push(
        wo(t, s, u)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function O0(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Sp(t, e, n, l, s) {
    for (var u = e._reactName, h = []; n !== null && n !== l; ) {
      var b = n, j = b.alternate, L = b.stateNode;
      if (b = b.tag, j !== null && j === l) break;
      b !== 5 && b !== 26 && b !== 27 || L === null || (j = L, s ? (L = Gl(n, u), L != null && h.unshift(
        wo(n, L, j)
      )) : s || (L = Gl(n, u), L != null && h.push(
        wo(n, L, j)
      ))), n = n.return;
    }
    h.length !== 0 && t.push({ event: e, listeners: h });
  }
  var B0 = /\r\n?/g, H0 = /\u0000|\uFFFD/g;
  function Cp(t) {
    return (typeof t == "string" ? t : "" + t).replace(B0, `
`).replace(H0, "");
  }
  function Tp(t, e) {
    return e = Cp(e), Cp(t) === e;
  }
  function ie(t, e, n, l, s, u) {
    switch (n) {
      case "children":
        typeof l == "string" ? e === "body" || e === "textarea" && l === "" || Yi(t, l) : (typeof l == "number" || typeof l == "bigint") && e !== "body" && Yi(t, "" + l);
        break;
      case "className":
        mr(t, "class", l);
        break;
      case "tabIndex":
        mr(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        mr(t, n, l);
        break;
      case "style":
        Tf(t, l, u);
        break;
      case "data":
        if (e !== "object") {
          mr(t, "data", l);
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
        l = gr("" + l), t.setAttribute(n, l);
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
        l = gr("" + l), t.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (t.onclick = Jn);
        break;
      case "onScroll":
        l != null && kt("scroll", t);
        break;
      case "onScrollEnd":
        l != null && kt("scrollend", t);
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
        n = gr("" + l), t.setAttributeNS(
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
        kt("beforetoggle", t), kt("toggle", t), hr(t, "popover", l);
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
        hr(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = cv.get(n) || n, hr(t, n, l));
    }
  }
  function Gc(t, e, n, l, s, u) {
    switch (n) {
      case "style":
        Tf(t, l, u);
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
        typeof l == "string" ? Yi(t, l) : (typeof l == "number" || typeof l == "bigint") && Yi(t, "" + l);
        break;
      case "onScroll":
        l != null && kt("scroll", t);
        break;
      case "onScrollEnd":
        l != null && kt("scrollend", t);
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
        if (!pf.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (s = n.endsWith("Capture"), e = n.slice(2, s ? n.length - 7 : void 0), u = t[$e] || null, u = u != null ? u[n] : null, typeof u == "function" && t.removeEventListener(e, u, s), typeof l == "function")) {
              typeof u != "function" && u !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(e, l, s);
              break t;
            }
            n in t ? t[n] = l : l === !0 ? t.setAttribute(n, "") : hr(t, n, l);
          }
    }
  }
  function Le(t, e, n) {
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
        kt("error", t), kt("load", t);
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
        kt("invalid", t);
        var b = u = h = s = null, j = null, L = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var K = n[l];
            if (K != null)
              switch (l) {
                case "name":
                  s = K;
                  break;
                case "type":
                  h = K;
                  break;
                case "checked":
                  j = K;
                  break;
                case "defaultChecked":
                  L = K;
                  break;
                case "value":
                  u = K;
                  break;
                case "defaultValue":
                  b = K;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (K != null)
                    throw Error(r(137, e));
                  break;
                default:
                  ie(t, e, l, K, n, null);
              }
          }
        yf(
          t,
          u,
          b,
          j,
          L,
          h,
          s,
          !1
        );
        return;
      case "select":
        kt("invalid", t), l = h = u = null;
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
        e = u, n = h, t.multiple = !!l, e != null ? Qi(t, !!l, e, !1) : n != null && Qi(t, !!l, n, !0);
        return;
      case "textarea":
        kt("invalid", t), u = s = l = null;
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
        Sf(t, l, s, u);
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
        kt("beforetoggle", t), kt("toggle", t), kt("cancel", t), kt("close", t);
        break;
      case "iframe":
      case "object":
        kt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < yo.length; l++)
          kt(yo[l], t);
        break;
      case "image":
        kt("error", t), kt("load", t);
        break;
      case "details":
        kt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        kt("error", t), kt("load", t);
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
        for (L in n)
          if (n.hasOwnProperty(L) && (l = n[L], l != null))
            switch (L) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(r(137, e));
              default:
                ie(t, e, L, l, n, null);
            }
        return;
      default:
        if (eu(e)) {
          for (K in n)
            n.hasOwnProperty(K) && (l = n[K], l !== void 0 && Gc(
              t,
              e,
              K,
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
  function k0(t, e, n, l) {
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
        var s = null, u = null, h = null, b = null, j = null, L = null, K = null;
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
        for (var G in l) {
          var V = l[G];
          if (P = n[G], l.hasOwnProperty(G) && (V != null || P != null))
            switch (G) {
              case "type":
                u = V;
                break;
              case "name":
                s = V;
                break;
              case "checked":
                L = V;
                break;
              case "defaultChecked":
                K = V;
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
                  G,
                  V,
                  l,
                  P
                );
            }
        }
        Ps(
          t,
          h,
          b,
          j,
          L,
          K,
          u,
          s
        );
        return;
      case "select":
        V = h = b = G = null;
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
                G = u;
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
        e = b, n = h, l = V, G != null ? Qi(t, !!n, G, !1) : !!l != !!n && (e != null ? Qi(t, !!n, e, !0) : Qi(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        V = G = null;
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
                G = s;
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
        wf(t, G, V);
        return;
      case "option":
        for (var mt in n)
          if (G = n[mt], n.hasOwnProperty(mt) && G != null && !l.hasOwnProperty(mt))
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
                  G
                );
            }
        for (j in l)
          if (G = l[j], V = n[j], l.hasOwnProperty(j) && G !== V && (G != null || V != null))
            switch (j) {
              case "selected":
                t.selected = G && typeof G != "function" && typeof G != "symbol";
                break;
              default:
                ie(
                  t,
                  e,
                  j,
                  G,
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
          G = n[Ct], n.hasOwnProperty(Ct) && G != null && !l.hasOwnProperty(Ct) && ie(t, e, Ct, null, l, G);
        for (L in l)
          if (G = l[L], V = n[L], l.hasOwnProperty(L) && G !== V && (G != null || V != null))
            switch (L) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(r(137, e));
                break;
              default:
                ie(
                  t,
                  e,
                  L,
                  G,
                  l,
                  V
                );
            }
        return;
      default:
        if (eu(e)) {
          for (var le in n)
            G = n[le], n.hasOwnProperty(le) && G !== void 0 && !l.hasOwnProperty(le) && Gc(
              t,
              e,
              le,
              void 0,
              l,
              G
            );
          for (K in l)
            G = l[K], V = n[K], !l.hasOwnProperty(K) || G === V || G === void 0 && V === void 0 || Gc(
              t,
              e,
              K,
              G,
              l,
              V
            );
          return;
        }
    }
    for (var H in n)
      G = n[H], n.hasOwnProperty(H) && G != null && !l.hasOwnProperty(H) && ie(t, e, H, null, l, G);
    for (P in l)
      G = l[P], V = n[P], !l.hasOwnProperty(P) || G === V || G == null && V == null || ie(t, e, P, G, l, V);
  }
  function _p(t) {
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
  function q0() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var s = n[l], u = s.transferSize, h = s.initiatorType, b = s.duration;
        if (u && b && _p(h)) {
          for (h = 0, b = s.responseEnd, l += 1; l < n.length; l++) {
            var j = n[l], L = j.startTime;
            if (L > b) break;
            var K = j.transferSize, P = j.initiatorType;
            K && _p(P) && (j = j.responseEnd, h += K * (j < b ? 1 : (b - L) / (j - L)));
          }
          if (--l, e += 8 * (u + h) / (s.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Qc = null, Yc = null;
  function ds(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function jp(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function zp(t, e) {
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
  function Vc(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Xc = null;
  function U0() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Xc ? !1 : (Xc = t, !0) : (Xc = null, !1);
  }
  var Ap = typeof setTimeout == "function" ? setTimeout : void 0, L0 = typeof clearTimeout == "function" ? clearTimeout : void 0, Ep = typeof Promise == "function" ? Promise : void 0, G0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ep < "u" ? function(t) {
    return Ep.resolve(null).then(t).catch(Q0);
  } : Ap;
  function Q0(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function Ua(t) {
    return t === "head";
  }
  function Rp(t, e) {
    var n = e, l = 0;
    do {
      var s = n.nextSibling;
      if (t.removeChild(n), s && s.nodeType === 8)
        if (n = s.data, n === "/$" || n === "/&") {
          if (l === 0) {
            t.removeChild(s), yl(e);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          So(t.ownerDocument.documentElement);
        else if (n === "head") {
          n = t.ownerDocument.head, So(n);
          for (var u = n.firstChild; u; ) {
            var h = u.nextSibling, b = u.nodeName;
            u[Ul] || b === "SCRIPT" || b === "STYLE" || b === "LINK" && u.rel.toLowerCase() === "stylesheet" || n.removeChild(u), u = h;
          }
        } else
          n === "body" && So(t.ownerDocument.body);
      n = s;
    } while (n);
    yl(e);
  }
  function Np(t, e) {
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
  function Kc(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Kc(n), Js(n);
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
  function Y0(t, e, n, l) {
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
  function V0(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Tn(t.nextSibling), t === null)) return null;
    return t;
  }
  function Mp(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Tn(t.nextSibling), t === null)) return null;
    return t;
  }
  function Zc(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Ic(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function X0(t, e) {
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
  var $c = null;
  function Dp(t) {
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
  function Op(t) {
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
  function Bp(t, e, n) {
    switch (e = ds(n), t) {
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
  function So(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    Js(t);
  }
  var _n = /* @__PURE__ */ new Map(), Hp = /* @__PURE__ */ new Set();
  function fs(t) {
    return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument;
  }
  var ha = W.d;
  W.d = {
    f: K0,
    r: Z0,
    D: I0,
    C: $0,
    L: F0,
    m: J0,
    X: P0,
    S: W0,
    M: ty
  };
  function K0() {
    var t = ha.f(), e = as();
    return t || e;
  }
  function Z0(t) {
    var e = Ui(t);
    e !== null && e.tag === 5 && e.type === "form" ? Ph(e) : ha.r(t);
  }
  var xl = typeof document > "u" ? null : document;
  function kp(t, e, n) {
    var l = xl;
    if (l && typeof e == "string" && e) {
      var s = xn(e);
      s = 'link[rel="' + t + '"][href="' + s + '"]', typeof n == "string" && (s += '[crossorigin="' + n + '"]'), Hp.has(s) || (Hp.add(s), t = { rel: t, crossOrigin: n, href: e }, l.querySelector(s) === null && (e = l.createElement("link"), Le(e, "link", t), De(e), l.head.appendChild(e)));
    }
  }
  function I0(t) {
    ha.D(t), kp("dns-prefetch", t, null);
  }
  function $0(t, e) {
    ha.C(t, e), kp("preconnect", t, e);
  }
  function F0(t, e, n) {
    ha.L(t, e, n);
    var l = xl;
    if (l && t && e) {
      var s = 'link[rel="preload"][as="' + xn(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (s += '[imagesrcset="' + xn(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (s += '[imagesizes="' + xn(
        n.imageSizes
      ) + '"]')) : s += '[href="' + xn(t) + '"]';
      var u = s;
      switch (e) {
        case "style":
          u = bl(t);
          break;
        case "script":
          u = vl(t);
      }
      _n.has(u) || (t = y(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), _n.set(u, t), l.querySelector(s) !== null || e === "style" && l.querySelector(Co(u)) || e === "script" && l.querySelector(To(u)) || (e = l.createElement("link"), Le(e, "link", t), De(e), l.head.appendChild(e)));
    }
  }
  function J0(t, e) {
    ha.m(t, e);
    var n = xl;
    if (n && t) {
      var l = e && typeof e.as == "string" ? e.as : "script", s = 'link[rel="modulepreload"][as="' + xn(l) + '"][href="' + xn(t) + '"]', u = s;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          u = vl(t);
      }
      if (!_n.has(u) && (t = y({ rel: "modulepreload", href: t }, e), _n.set(u, t), n.querySelector(s) === null)) {
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
        l = n.createElement("link"), Le(l, "link", t), De(l), n.head.appendChild(l);
      }
    }
  }
  function W0(t, e, n) {
    ha.S(t, e, n);
    var l = xl;
    if (l && t) {
      var s = Li(l).hoistableStyles, u = bl(t);
      e = e || "default";
      var h = s.get(u);
      if (!h) {
        var b = { loading: 0, preload: null };
        if (h = l.querySelector(
          Co(u)
        ))
          b.loading = 5;
        else {
          t = y(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = _n.get(u)) && Fc(t, n);
          var j = h = l.createElement("link");
          De(j), Le(j, "link", t), j._p = new Promise(function(L, K) {
            j.onload = L, j.onerror = K;
          }), j.addEventListener("load", function() {
            b.loading |= 1;
          }), j.addEventListener("error", function() {
            b.loading |= 2;
          }), b.loading |= 4, hs(h, e, l);
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
  function P0(t, e) {
    ha.X(t, e);
    var n = xl;
    if (n && t) {
      var l = Li(n).hoistableScripts, s = vl(t), u = l.get(s);
      u || (u = n.querySelector(To(s)), u || (t = y({ src: t, async: !0 }, e), (e = _n.get(s)) && Jc(t, e), u = n.createElement("script"), De(u), Le(u, "link", t), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(s, u));
    }
  }
  function ty(t, e) {
    ha.M(t, e);
    var n = xl;
    if (n && t) {
      var l = Li(n).hoistableScripts, s = vl(t), u = l.get(s);
      u || (u = n.querySelector(To(s)), u || (t = y({ src: t, async: !0, type: "module" }, e), (e = _n.get(s)) && Jc(t, e), u = n.createElement("script"), De(u), Le(u, "link", t), n.head.appendChild(u)), u = {
        type: "script",
        instance: u,
        count: 1,
        state: null
      }, l.set(s, u));
    }
  }
  function qp(t, e, n, l) {
    var s = (s = St.current) ? fs(s) : null;
    if (!s) throw Error(r(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (e = bl(n.href), n = Li(
          s
        ).hoistableStyles, l = n.get(e), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, n.set(e, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = bl(n.href);
          var u = Li(
            s
          ).hoistableStyles, h = u.get(t);
          if (h || (s = s.ownerDocument || s, h = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, u.set(t, h), (u = s.querySelector(
            Co(t)
          )) && !u._p && (h.instance = u, h.state.loading = 5), _n.has(t) || (n = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, _n.set(t, n), u || ey(
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
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (e = vl(n), n = Li(
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
  function bl(t) {
    return 'href="' + xn(t) + '"';
  }
  function Co(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function Up(t) {
    return y({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function ey(t, e, n, l) {
    t.querySelector('link[rel="preload"][as="style"][' + e + "]") ? l.loading = 1 : (e = t.createElement("link"), l.preload = e, e.addEventListener("load", function() {
      return l.loading |= 1;
    }), e.addEventListener("error", function() {
      return l.loading |= 2;
    }), Le(e, "link", n), De(e), t.head.appendChild(e));
  }
  function vl(t) {
    return '[src="' + xn(t) + '"]';
  }
  function To(t) {
    return "script[async]" + t;
  }
  function Lp(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + xn(n.href) + '"]'
          );
          if (l)
            return e.instance = l, De(l), l;
          var s = y({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), De(l), Le(l, "style", s), hs(l, n.precedence, t), e.instance = l;
        case "stylesheet":
          s = bl(n.href);
          var u = t.querySelector(
            Co(s)
          );
          if (u)
            return e.state.loading |= 4, e.instance = u, De(u), u;
          l = Up(n), (s = _n.get(s)) && Fc(l, s), u = (t.ownerDocument || t).createElement("link"), De(u);
          var h = u;
          return h._p = new Promise(function(b, j) {
            h.onload = b, h.onerror = j;
          }), Le(u, "link", l), e.state.loading |= 4, hs(u, n.precedence, t), e.instance = u;
        case "script":
          return u = vl(n.src), (s = t.querySelector(
            To(u)
          )) ? (e.instance = s, De(s), s) : (l = n, (s = _n.get(u)) && (l = y({}, n), Jc(l, s)), t = t.ownerDocument || t, s = t.createElement("script"), De(s), Le(s, "link", l), t.head.appendChild(s), e.instance = s);
        case "void":
          return null;
        default:
          throw Error(r(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (l = e.instance, e.state.loading |= 4, hs(l, n.precedence, t));
    return e.instance;
  }
  function hs(t, e, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), s = l.length ? l[l.length - 1] : null, u = s, h = 0; h < l.length; h++) {
      var b = l[h];
      if (b.dataset.precedence === e) u = b;
      else if (u !== s) break;
    }
    u ? u.parentNode.insertBefore(t, u.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function Fc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Jc(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var ms = null;
  function Gp(t, e, n) {
    if (ms === null) {
      var l = /* @__PURE__ */ new Map(), s = ms = /* @__PURE__ */ new Map();
      s.set(n, l);
    } else
      s = ms, l = s.get(n), l || (l = /* @__PURE__ */ new Map(), s.set(n, l));
    if (l.has(t)) return l;
    for (l.set(t, null), n = n.getElementsByTagName(t), s = 0; s < n.length; s++) {
      var u = n[s];
      if (!(u[Ul] || u[He] || t === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
        var h = u.getAttribute(e) || "";
        h = t + h;
        var b = l.get(h);
        b ? b.push(u) : l.set(h, [u]);
      }
    }
    return l;
  }
  function Qp(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function ny(t, e, n) {
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
  function Yp(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function ay(t, e, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var s = bl(l.href), u = e.querySelector(
          Co(s)
        );
        if (u) {
          e = u._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ps.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = u, De(u);
          return;
        }
        u = e.ownerDocument || e, l = Up(l), (s = _n.get(s)) && Fc(l, s), u = u.createElement("link"), De(u);
        var h = u;
        h._p = new Promise(function(b, j) {
          h.onload = b, h.onerror = j;
        }), Le(u, "link", l), n.instance = u;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = ps.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var Wc = 0;
  function iy(t, e) {
    return t.stylesheets && t.count === 0 && xs(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (t.stylesheets && xs(t, t.stylesheets), t.unsuspend) {
          var u = t.unsuspend;
          t.unsuspend = null, u();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Wc === 0 && (Wc = 62500 * q0());
      var s = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && xs(t, t.stylesheets), t.unsuspend)) {
            var u = t.unsuspend;
            t.unsuspend = null, u();
          }
        },
        (t.imgBytes > Wc ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(l), clearTimeout(s);
      };
    } : null;
  }
  function ps() {
    if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
      if (this.stylesheets) xs(this, this.stylesheets);
      else if (this.unsuspend) {
        var t = this.unsuspend;
        this.unsuspend = null, t();
      }
    }
  }
  var gs = null;
  function xs(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, gs = /* @__PURE__ */ new Map(), e.forEach(ly, t), gs = null, ps.call(t));
  }
  function ly(t, e) {
    if (!(e.state.loading & 4)) {
      var n = gs.get(t);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), gs.set(t, n);
        for (var s = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), u = 0; u < s.length; u++) {
          var h = s[u];
          (h.nodeName === "LINK" || h.getAttribute("media") !== "not all") && (n.set(h.dataset.precedence, h), l = h);
        }
        l && n.set(null, l);
      }
      s = e.instance, h = s.getAttribute("data-precedence"), u = n.get(h) || l, u === l && n.set(null, s), n.set(h, s), this.count++, l = ps.bind(this), s.addEventListener("load", l), s.addEventListener("error", l), u ? u.parentNode.insertBefore(s, u.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(s, t.firstChild)), e.state.loading |= 4;
    }
  }
  var _o = {
    $$typeof: k,
    Provider: null,
    Consumer: null,
    _currentValue: $,
    _currentValue2: $,
    _threadCount: 0
  };
  function oy(t, e, n, l, s, u, h, b, j) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Zs(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Zs(0), this.hiddenUpdates = Zs(null), this.identifierPrefix = l, this.onUncaughtError = s, this.onCaughtError = u, this.onRecoverableError = h, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = j, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function Vp(t, e, n, l, s, u, h, b, j, L, K, P) {
    return t = new oy(
      t,
      e,
      n,
      h,
      j,
      L,
      K,
      P,
      b
    ), e = 1, u === !0 && (e |= 24), u = on(3, null, null, e), t.current = u, u.stateNode = t, e = Nu(), e.refCount++, t.pooledCache = e, e.refCount++, u.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: e
    }, Bu(u), t;
  }
  function Xp(t) {
    return t ? (t = Fi, t) : Fi;
  }
  function Kp(t, e, n, l, s, u) {
    s = Xp(s), l.context === null ? l.context = s : l.pendingContext = s, l = Aa(e), l.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (l.callback = u), n = Ea(t, l, e), n !== null && (en(n, t, e), no(n, t, e));
  }
  function Zp(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Pc(t, e) {
    Zp(t, e), (t = t.alternate) && Zp(t, e);
  }
  function Ip(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = hi(t, 67108864);
      e !== null && en(e, t, 67108864), Pc(t, 67108864);
    }
  }
  function $p(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = dn();
      e = Is(e);
      var n = hi(t, e);
      n !== null && en(n, t, e), Pc(t, e);
    }
  }
  var bs = !0;
  function ry(t, e, n, l) {
    var s = q.T;
    q.T = null;
    var u = W.p;
    try {
      W.p = 2, td(t, e, n, l);
    } finally {
      W.p = u, q.T = s;
    }
  }
  function sy(t, e, n, l) {
    var s = q.T;
    q.T = null;
    var u = W.p;
    try {
      W.p = 8, td(t, e, n, l);
    } finally {
      W.p = u, q.T = s;
    }
  }
  function td(t, e, n, l) {
    if (bs) {
      var s = ed(l);
      if (s === null)
        Lc(
          t,
          e,
          l,
          vs,
          n
        ), Jp(t, l);
      else if (cy(
        s,
        t,
        e,
        n,
        l
      ))
        l.stopPropagation();
      else if (Jp(t, l), e & 4 && -1 < uy.indexOf(t)) {
        for (; s !== null; ) {
          var u = Ui(s);
          if (u !== null)
            switch (u.tag) {
              case 3:
                if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                  var h = si(u.pendingLanes);
                  if (h !== 0) {
                    var b = u;
                    for (b.pendingLanes |= 2, b.entangledLanes |= 2; h; ) {
                      var j = 1 << 31 - an(h);
                      b.entanglements[1] |= j, h &= ~j;
                    }
                    Gn(u), (Ft & 6) === 0 && (es = pe() + 500, vo(0));
                  }
                }
                break;
              case 31:
              case 13:
                b = hi(u, 2), b !== null && en(b, u, 2), as(), Pc(u, 2);
            }
          if (u = ed(l), u === null && Lc(
            t,
            e,
            l,
            vs,
            n
          ), u === s) break;
          s = u;
        }
        s !== null && l.stopPropagation();
      } else
        Lc(
          t,
          e,
          l,
          null,
          n
        );
    }
  }
  function ed(t) {
    return t = au(t), nd(t);
  }
  var vs = null;
  function nd(t) {
    if (vs = null, t = qi(t), t !== null) {
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
    return vs = t, null;
  }
  function Fp(t) {
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
        switch (pn()) {
          case va:
            return 2;
          case oi:
            return 8;
          case ri:
          case or:
            return 32;
          case rr:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ad = !1, La = null, Ga = null, Qa = null, jo = /* @__PURE__ */ new Map(), zo = /* @__PURE__ */ new Map(), Ya = [], uy = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Jp(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        La = null;
        break;
      case "dragenter":
      case "dragleave":
        Ga = null;
        break;
      case "mouseover":
      case "mouseout":
        Qa = null;
        break;
      case "pointerover":
      case "pointerout":
        jo.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        zo.delete(e.pointerId);
    }
  }
  function Ao(t, e, n, l, s, u) {
    return t === null || t.nativeEvent !== u ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: u,
      targetContainers: [s]
    }, e !== null && (e = Ui(e), e !== null && Ip(e)), t) : (t.eventSystemFlags |= l, e = t.targetContainers, s !== null && e.indexOf(s) === -1 && e.push(s), t);
  }
  function cy(t, e, n, l, s) {
    switch (e) {
      case "focusin":
        return La = Ao(
          La,
          t,
          e,
          n,
          l,
          s
        ), !0;
      case "dragenter":
        return Ga = Ao(
          Ga,
          t,
          e,
          n,
          l,
          s
        ), !0;
      case "mouseover":
        return Qa = Ao(
          Qa,
          t,
          e,
          n,
          l,
          s
        ), !0;
      case "pointerover":
        var u = s.pointerId;
        return jo.set(
          u,
          Ao(
            jo.get(u) || null,
            t,
            e,
            n,
            l,
            s
          )
        ), !0;
      case "gotpointercapture":
        return u = s.pointerId, zo.set(
          u,
          Ao(
            zo.get(u) || null,
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
  function Wp(t) {
    var e = qi(t.target);
    if (e !== null) {
      var n = f(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = m(n), e !== null) {
            t.blockedOn = e, ff(t.priority, function() {
              $p(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = p(n), e !== null) {
            t.blockedOn = e, ff(t.priority, function() {
              $p(n);
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
  function ys(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = ed(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        nu = l, n.target.dispatchEvent(l), nu = null;
      } else
        return e = Ui(n), e !== null && Ip(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function Pp(t, e, n) {
    ys(t) && n.delete(e);
  }
  function dy() {
    ad = !1, La !== null && ys(La) && (La = null), Ga !== null && ys(Ga) && (Ga = null), Qa !== null && ys(Qa) && (Qa = null), jo.forEach(Pp), zo.forEach(Pp);
  }
  function ws(t, e) {
    t.blockedOn === e && (t.blockedOn = null, ad || (ad = !0, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      dy
    )));
  }
  var Ss = null;
  function tg(t) {
    Ss !== t && (Ss = t, a.unstable_scheduleCallback(
      a.unstable_NormalPriority,
      function() {
        Ss === t && (Ss = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], l = t[e + 1], s = t[e + 2];
          if (typeof l != "function") {
            if (nd(l || n) === null)
              continue;
            break;
          }
          var u = Ui(n);
          u !== null && (t.splice(e, 3), e -= 3, ec(
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
  function yl(t) {
    function e(j) {
      return ws(j, t);
    }
    La !== null && ws(La, t), Ga !== null && ws(Ga, t), Qa !== null && ws(Qa, t), jo.forEach(e), zo.forEach(e);
    for (var n = 0; n < Ya.length; n++) {
      var l = Ya[n];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < Ya.length && (n = Ya[0], n.blockedOn === null); )
      Wp(n), n.blockedOn === null && Ya.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var s = n[l], u = n[l + 1], h = s[$e] || null;
        if (typeof u == "function")
          h || tg(n);
        else if (h) {
          var b = null;
          if (u && u.hasAttribute("formAction")) {
            if (s = u, h = u[$e] || null)
              b = h.formAction;
            else if (nd(s) !== null) continue;
          } else b = h.action;
          typeof b == "function" ? n[l + 1] = b : (n.splice(l, 3), l -= 3), tg(n);
        }
      }
  }
  function eg() {
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
  function id(t) {
    this._internalRoot = t;
  }
  Cs.prototype.render = id.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(r(409));
    var n = e.current, l = dn();
    Kp(n, l, t, e, null, null);
  }, Cs.prototype.unmount = id.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      Kp(t.current, 2, null, t, null, null), as(), e[ki] = null;
    }
  };
  function Cs(t) {
    this._internalRoot = t;
  }
  Cs.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = df();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Ya.length && e !== 0 && e < Ya[n].priority; n++) ;
      Ya.splice(n, 0, t), n === 0 && Wp(t);
    }
  };
  var ng = i.version;
  if (ng !== "19.2.6")
    throw Error(
      r(
        527,
        ng,
        "19.2.6"
      )
    );
  W.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(r(188)) : (t = Object.keys(t).join(","), Error(r(268, t)));
    return t = x(e), t = t !== null ? w(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var fy = {
    bundleType: 0,
    version: "19.2.6",
    rendererPackageName: "react-dom",
    currentDispatcherRef: q,
    reconcilerVersion: "19.2.6"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ts = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ts.isDisabled && Ts.supportsFiber)
      try {
        Hl = Ts.inject(
          fy
        ), nn = Ts;
      } catch {
      }
  }
  return Ro.createRoot = function(t, e) {
    if (!c(t)) throw Error(r(299));
    var n = !1, l = "", s = um, u = cm, h = dm;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (l = e.identifierPrefix), e.onUncaughtError !== void 0 && (s = e.onUncaughtError), e.onCaughtError !== void 0 && (u = e.onCaughtError), e.onRecoverableError !== void 0 && (h = e.onRecoverableError)), e = Vp(
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
      eg
    ), t[ki] = e.current, Uc(t), new id(e);
  }, Ro.hydrateRoot = function(t, e, n) {
    if (!c(t)) throw Error(r(299));
    var l = !1, s = "", u = um, h = cm, b = dm, j = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (s = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (h = n.onCaughtError), n.onRecoverableError !== void 0 && (b = n.onRecoverableError), n.formState !== void 0 && (j = n.formState)), e = Vp(
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
      eg
    ), e.context = Xp(null), n = e.current, l = dn(), l = Is(l), s = Aa(l), s.callback = null, Ea(n, s, l), n = l, e.current.lanes = n, ql(e, n), Gn(e), t[ki] = e.current, Uc(t), new Cs(e);
  }, Ro.version = "19.2.6", Ro;
}
var hg;
function Cy() {
  if (hg) return sd.exports;
  hg = 1;
  function a() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(a);
      } catch (i) {
        console.error(i);
      }
  }
  return a(), sd.exports = Sy(), sd.exports;
}
var Ty = Cy(), Ls = class {
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
}, Ai, Ia, Tl, yx, _y = (yx = class extends Ls {
  constructor() {
    super();
    Gt(this, Ai);
    Gt(this, Ia);
    Gt(this, Tl);
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
    Z(this, Ia) || this.setEventListener(Z(this, Tl));
  }
  onUnsubscribe() {
    var i;
    this.hasListeners() || ((i = Z(this, Ia)) == null || i.call(this), jt(this, Ia, void 0));
  }
  setEventListener(i) {
    var o;
    jt(this, Tl, i), (o = Z(this, Ia)) == null || o.call(this), jt(this, Ia, i((r) => {
      typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
    }));
  }
  setFocused(i) {
    Z(this, Ai) !== i && (jt(this, Ai, i), this.onFocus());
  }
  onFocus() {
    const i = this.isFocused();
    this.listeners.forEach((o) => {
      o(i);
    });
  }
  isFocused() {
    var i;
    return typeof Z(this, Ai) == "boolean" ? Z(this, Ai) : ((i = globalThis.document) == null ? void 0 : i.visibilityState) !== "hidden";
  }
}, Ai = new WeakMap(), Ia = new WeakMap(), Tl = new WeakMap(), yx), Nx = new _y(), jy = {
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
}, $a, Bd, wx, zy = (wx = class {
  constructor() {
    // We cannot have TimeoutManager<T> as we must instantiate it with a concrete
    // type at app boot; and if we leave that type, then any new timer provider
    // would need to support the default provider's concrete timer ID, which is
    // infeasible across environments.
    //
    // We settle for type safety for the TimeoutProvider type, and accept that
    // this class is unsafe internally to allow for extension.
    Gt(this, $a, jy);
    Gt(this, Bd, !1);
  }
  setTimeoutProvider(a) {
    jt(this, $a, a);
  }
  setTimeout(a, i) {
    return Z(this, $a).setTimeout(a, i);
  }
  clearTimeout(a) {
    Z(this, $a).clearTimeout(a);
  }
  setInterval(a, i) {
    return Z(this, $a).setInterval(a, i);
  }
  clearInterval(a) {
    Z(this, $a).clearInterval(a);
  }
}, $a = new WeakMap(), Bd = new WeakMap(), wx), xd = new zy();
function Ay(a) {
  setTimeout(a, 0);
}
var Ey = typeof window > "u" || "Deno" in globalThis;
function Dn() {
}
function Ry(a, i) {
  return typeof a == "function" ? a(i) : a;
}
function Ny(a) {
  return typeof a == "number" && a >= 0 && a !== 1 / 0;
}
function My(a, i) {
  return Math.max(a + (i || 0) - Date.now(), 0);
}
function bd(a, i) {
  return typeof a == "function" ? a(i) : a;
}
function Dy(a, i) {
  return typeof a == "function" ? a(i) : a;
}
function mg(a, i) {
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
      if (i.queryHash !== kd(m, i.options))
        return !1;
    } else if (!Uo(i.queryKey, m))
      return !1;
  }
  if (o !== "all") {
    const g = i.isActive();
    if (o === "active" && !g || o === "inactive" && g)
      return !1;
  }
  return !(typeof p == "boolean" && i.isStale() !== p || c && c !== i.state.fetchStatus || f && !f(i));
}
function pg(a, i) {
  const { exact: o, status: r, predicate: c, mutationKey: f } = a;
  if (f) {
    if (!i.options.mutationKey)
      return !1;
    if (o) {
      if (qo(i.options.mutationKey) !== qo(f))
        return !1;
    } else if (!Uo(i.options.mutationKey, f))
      return !1;
  }
  return !(r && i.state.status !== r || c && !c(i));
}
function kd(a, i) {
  return ((i == null ? void 0 : i.queryKeyHashFn) || qo)(a);
}
function qo(a) {
  return JSON.stringify(
    a,
    (i, o) => vd(o) ? Object.keys(o).sort().reduce((r, c) => (r[c] = o[c], r), {}) : o
  );
}
function Uo(a, i) {
  return a === i ? !0 : typeof a != typeof i ? !1 : a && i && typeof a == "object" && typeof i == "object" ? Object.keys(i).every((o) => Uo(a[o], i[o])) : !1;
}
var Oy = Object.prototype.hasOwnProperty;
function Mx(a, i, o = 0) {
  if (a === i)
    return a;
  if (o > 500) return i;
  const r = gg(a) && gg(i);
  if (!r && !(vd(a) && vd(i))) return i;
  const f = (r ? a : Object.keys(a)).length, m = r ? i : Object.keys(i), p = m.length, g = r ? new Array(p) : {};
  let x = 0;
  for (let w = 0; w < p; w++) {
    const y = r ? w : m[w], C = a[y], E = i[y];
    if (C === E) {
      g[y] = C, (r ? w < f : Oy.call(a, y)) && x++;
      continue;
    }
    if (C === null || E === null || typeof C != "object" || typeof E != "object") {
      g[y] = E;
      continue;
    }
    const B = Mx(C, E, o + 1);
    g[y] = B, B === C && x++;
  }
  return f === p && x === f ? a : g;
}
function gg(a) {
  return Array.isArray(a) && a.length === Object.keys(a).length;
}
function vd(a) {
  if (!xg(a))
    return !1;
  const i = a.constructor;
  if (i === void 0)
    return !0;
  const o = i.prototype;
  return !(!xg(o) || !o.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(a) !== Object.prototype);
}
function xg(a) {
  return Object.prototype.toString.call(a) === "[object Object]";
}
function By(a) {
  return new Promise((i) => {
    xd.setTimeout(i, a);
  });
}
function Hy(a, i, o) {
  return typeof o.structuralSharing == "function" ? o.structuralSharing(a, i) : o.structuralSharing !== !1 ? Mx(a, i) : i;
}
function ky(a, i, o = 0) {
  const r = [...a, i];
  return o && r.length > o ? r.slice(1) : r;
}
function qy(a, i, o = 0) {
  const r = [i, ...a];
  return o && r.length > o ? r.slice(0, -1) : r;
}
var qd = /* @__PURE__ */ Symbol();
function Dx(a, i) {
  return !a.queryFn && (i != null && i.initialPromise) ? () => i.initialPromise : !a.queryFn || a.queryFn === qd ? () => Promise.reject(new Error(`Missing queryFn: '${a.queryHash}'`)) : a.queryFn;
}
function Uy(a, i, o) {
  let r = !1, c;
  return Object.defineProperty(a, "signal", {
    enumerable: !0,
    get: () => (c ?? (c = i()), r || (r = !0, c.aborted ? o() : c.addEventListener("abort", o, { once: !0 })), c)
  }), a;
}
var Ox = /* @__PURE__ */ (() => {
  let a = () => Ey;
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
function Ly() {
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
var Gy = Ay;
function Qy() {
  let a = [], i = 0, o = (p) => {
    p();
  }, r = (p) => {
    p();
  }, c = Gy;
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
var Ze = Qy(), _l, Fa, jl, Sx, Yy = (Sx = class extends Ls {
  constructor() {
    super();
    Gt(this, _l, !0);
    Gt(this, Fa);
    Gt(this, jl);
    jt(this, jl, (i) => {
      if (typeof window < "u" && window.addEventListener) {
        const o = () => i(!0), r = () => i(!1);
        return window.addEventListener("online", o, !1), window.addEventListener("offline", r, !1), () => {
          window.removeEventListener("online", o), window.removeEventListener("offline", r);
        };
      }
    });
  }
  onSubscribe() {
    Z(this, Fa) || this.setEventListener(Z(this, jl));
  }
  onUnsubscribe() {
    var i;
    this.hasListeners() || ((i = Z(this, Fa)) == null || i.call(this), jt(this, Fa, void 0));
  }
  setEventListener(i) {
    var o;
    jt(this, jl, i), (o = Z(this, Fa)) == null || o.call(this), jt(this, Fa, i(this.setOnline.bind(this)));
  }
  setOnline(i) {
    Z(this, _l) !== i && (jt(this, _l, i), this.listeners.forEach((r) => {
      r(i);
    }));
  }
  isOnline() {
    return Z(this, _l);
  }
}, _l = new WeakMap(), Fa = new WeakMap(), jl = new WeakMap(), Sx), Ds = new Yy();
function Vy(a) {
  return Math.min(1e3 * 2 ** a, 3e4);
}
function Bx(a) {
  return (a ?? "online") === "online" ? Ds.isOnline() : !0;
}
var yd = class extends Error {
  constructor(a) {
    super("CancelledError"), this.revert = a == null ? void 0 : a.revert, this.silent = a == null ? void 0 : a.silent;
  }
};
function Hx(a) {
  let i = !1, o = 0, r;
  const c = Ly(), f = () => c.status !== "pending", m = (M) => {
    var z;
    if (!f()) {
      const A = new yd(M);
      C(A), (z = a.onCancel) == null || z.call(a, A);
    }
  }, p = () => {
    i = !0;
  }, g = () => {
    i = !1;
  }, x = () => Nx.isFocused() && (a.networkMode === "always" || Ds.isOnline()) && a.canRun(), w = () => Bx(a.networkMode) && a.canRun(), y = (M) => {
    f() || (r == null || r(), c.resolve(M));
  }, C = (M) => {
    f() || (r == null || r(), c.reject(M));
  }, E = () => new Promise((M) => {
    var z;
    r = (A) => {
      (f() || x()) && M(A);
    }, (z = a.onPause) == null || z.call(a);
  }).then(() => {
    var M;
    r = void 0, f() || (M = a.onContinue) == null || M.call(a);
  }), B = () => {
    if (f())
      return;
    let M;
    const z = o === 0 ? a.initialPromise : void 0;
    try {
      M = z ?? a.fn();
    } catch (A) {
      M = Promise.reject(A);
    }
    Promise.resolve(M).then(y).catch((A) => {
      var N;
      if (f())
        return;
      const O = a.retry ?? (Ox.isServer() ? 0 : 3), k = a.retryDelay ?? Vy, v = typeof k == "function" ? k(o, A) : k, T = O === !0 || typeof O == "number" && o < O || typeof O == "function" && O(o, A);
      if (i || !T) {
        C(A);
        return;
      }
      o++, (N = a.onFail) == null || N.call(a, o, A), By(v).then(() => x() ? void 0 : E()).then(() => {
        i ? C(A) : B();
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
    canStart: w,
    start: () => (w() ? B() : E().then(B), c)
  };
}
var Ei, Cx, kx = (Cx = class {
  constructor() {
    Gt(this, Ei);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(), Ny(this.gcTime) && jt(this, Ei, xd.setTimeout(() => {
      this.optionalRemove();
    }, this.gcTime));
  }
  updateGcTime(a) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      a ?? (Ox.isServer() ? 1 / 0 : 300 * 1e3)
    );
  }
  clearGcTimeout() {
    Z(this, Ei) !== void 0 && (xd.clearTimeout(Z(this, Ei)), jt(this, Ei, void 0));
  }
}, Ei = new WeakMap(), Cx);
function Xy(a) {
  return {
    onFetch: (i, o) => {
      var w, y, C, E, B;
      const r = i.options, c = (C = (y = (w = i.fetchOptions) == null ? void 0 : w.meta) == null ? void 0 : y.fetchMore) == null ? void 0 : C.direction, f = ((E = i.state.data) == null ? void 0 : E.pages) || [], m = ((B = i.state.data) == null ? void 0 : B.pageParams) || [];
      let p = { pages: [], pageParams: [] }, g = 0;
      const x = async () => {
        let M = !1;
        const z = (k) => {
          Uy(
            k,
            () => i.signal,
            () => M = !0
          );
        }, A = Dx(i.options, i.fetchOptions), O = async (k, v, T) => {
          if (M)
            return Promise.reject(i.signal.reason);
          if (v == null && k.pages.length)
            return Promise.resolve(k);
          const S = (() => {
            const et = {
              client: i.client,
              queryKey: i.queryKey,
              pageParam: v,
              direction: T ? "backward" : "forward",
              meta: i.options.meta
            };
            return z(et), et;
          })(), D = await A(S), { maxPages: Y } = i.options, F = T ? qy : ky;
          return {
            pages: F(k.pages, D, Y),
            pageParams: F(k.pageParams, v, Y)
          };
        };
        if (c && f.length) {
          const k = c === "backward", v = k ? Ky : bg, T = {
            pages: f,
            pageParams: m
          }, N = v(r, T);
          p = await O(T, N, k);
        } else {
          const k = a ?? f.length;
          do {
            const v = g === 0 ? m[0] ?? r.initialPageParam : bg(r, p);
            if (g > 0 && v == null)
              break;
            p = await O(p, v), g++;
          } while (g < k);
        }
        return p;
      };
      i.options.persister ? i.fetchFn = () => {
        var M, z;
        return (z = (M = i.options).persister) == null ? void 0 : z.call(
          M,
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
function bg(a, { pages: i, pageParams: o }) {
  const r = i.length - 1;
  return i.length > 0 ? a.getNextPageParam(
    i[r],
    i,
    o[r],
    o
  ) : void 0;
}
function Ky(a, { pages: i, pageParams: o }) {
  var r;
  return i.length > 0 ? (r = a.getPreviousPageParam) == null ? void 0 : r.call(a, i[0], i, o[0], o) : void 0;
}
var zl, Ri, Al, zn, Ni, Be, Wo, Mi, fn, qx, ma, Tx, Zy = (Tx = class extends kx {
  constructor(i) {
    super();
    Gt(this, fn);
    Gt(this, zl);
    Gt(this, Ri);
    Gt(this, Al);
    Gt(this, zn);
    Gt(this, Ni);
    Gt(this, Be);
    Gt(this, Wo);
    Gt(this, Mi);
    jt(this, Mi, !1), jt(this, Wo, i.defaultOptions), this.setOptions(i.options), this.observers = [], jt(this, Ni, i.client), jt(this, zn, Z(this, Ni).getQueryCache()), this.queryKey = i.queryKey, this.queryHash = i.queryHash, jt(this, Ri, yg(this.options)), this.state = i.state ?? Z(this, Ri), this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get queryType() {
    return Z(this, zl);
  }
  get promise() {
    var i;
    return (i = Z(this, Be)) == null ? void 0 : i.promise;
  }
  setOptions(i) {
    if (this.options = { ...Z(this, Wo), ...i }, i != null && i._type && jt(this, zl, i._type), this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
      const o = yg(this.options);
      o.data !== void 0 && (this.setState(
        vg(o.data, o.dataUpdatedAt)
      ), jt(this, Ri, o));
    }
  }
  optionalRemove() {
    !this.observers.length && this.state.fetchStatus === "idle" && Z(this, zn).remove(this);
  }
  setData(i, o) {
    const r = Hy(this.state.data, i, this.options);
    return Ge(this, fn, ma).call(this, {
      data: r,
      type: "success",
      dataUpdatedAt: o == null ? void 0 : o.updatedAt,
      manual: o == null ? void 0 : o.manual
    }), r;
  }
  setState(i) {
    Ge(this, fn, ma).call(this, { type: "setState", state: i });
  }
  cancel(i) {
    var r, c;
    const o = (r = Z(this, Be)) == null ? void 0 : r.promise;
    return (c = Z(this, Be)) == null || c.cancel(i), o ? o.then(Dn).catch(Dn) : Promise.resolve();
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  get resetState() {
    return Z(this, Ri);
  }
  reset() {
    this.destroy(), this.setState(this.resetState);
  }
  isActive() {
    return this.observers.some(
      (i) => Dy(i.options.enabled, this) !== !1
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === qd || !this.isFetched();
  }
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  isStatic() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (i) => bd(i.options.staleTime, this) === "static"
    ) : !1;
  }
  isStale() {
    return this.getObserversCount() > 0 ? this.observers.some(
      (i) => i.getCurrentResult().isStale
    ) : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(i = 0) {
    return this.state.data === void 0 ? !0 : i === "static" ? !1 : this.state.isInvalidated ? !0 : !My(this.state.dataUpdatedAt, i);
  }
  onFocus() {
    var o;
    const i = this.observers.find((r) => r.shouldFetchOnWindowFocus());
    i == null || i.refetch({ cancelRefetch: !1 }), (o = Z(this, Be)) == null || o.continue();
  }
  onOnline() {
    var o;
    const i = this.observers.find((r) => r.shouldFetchOnReconnect());
    i == null || i.refetch({ cancelRefetch: !1 }), (o = Z(this, Be)) == null || o.continue();
  }
  addObserver(i) {
    this.observers.includes(i) || (this.observers.push(i), this.clearGcTimeout(), Z(this, zn).notify({ type: "observerAdded", query: this, observer: i }));
  }
  removeObserver(i) {
    this.observers.includes(i) && (this.observers = this.observers.filter((o) => o !== i), this.observers.length || (Z(this, Be) && (Z(this, Mi) || Ge(this, fn, qx).call(this) ? Z(this, Be).cancel({ revert: !0 }) : Z(this, Be).cancelRetry()), this.scheduleGc()), Z(this, zn).notify({ type: "observerRemoved", query: this, observer: i }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || Ge(this, fn, ma).call(this, { type: "invalidate" });
  }
  async fetch(i, o) {
    var x, w, y, C, E, B, M, z, A, O, k;
    if (this.state.fetchStatus !== "idle" && // If the promise in the retryer is already rejected, we have to definitely
    // re-start the fetch; there is a chance that the query is still in a
    // pending state when that happens
    ((x = Z(this, Be)) == null ? void 0 : x.status()) !== "rejected") {
      if (this.state.data !== void 0 && (o != null && o.cancelRefetch))
        this.cancel({ silent: !0 });
      else if (Z(this, Be))
        return Z(this, Be).continueRetry(), Z(this, Be).promise;
    }
    if (i && this.setOptions(i), !this.options.queryFn) {
      const v = this.observers.find((T) => T.options.queryFn);
      v && this.setOptions(v.options);
    }
    const r = new AbortController(), c = (v) => {
      Object.defineProperty(v, "signal", {
        enumerable: !0,
        get: () => (jt(this, Mi, !0), r.signal)
      });
    }, f = () => {
      const v = Dx(this.options, o), N = (() => {
        const S = {
          client: Z(this, Ni),
          queryKey: this.queryKey,
          meta: this.meta
        };
        return c(S), S;
      })();
      return jt(this, Mi, !1), this.options.persister ? this.options.persister(
        v,
        N,
        this
      ) : v(N);
    }, p = (() => {
      const v = {
        fetchOptions: o,
        options: this.options,
        queryKey: this.queryKey,
        client: Z(this, Ni),
        state: this.state,
        fetchFn: f
      };
      return c(v), v;
    })(), g = Z(this, zl) === "infinite" ? Xy(
      this.options.pages
    ) : this.options.behavior;
    g == null || g.onFetch(p, this), jt(this, Al, this.state), (this.state.fetchStatus === "idle" || this.state.fetchMeta !== ((w = p.fetchOptions) == null ? void 0 : w.meta)) && Ge(this, fn, ma).call(this, { type: "fetch", meta: (y = p.fetchOptions) == null ? void 0 : y.meta }), jt(this, Be, Hx({
      initialPromise: o == null ? void 0 : o.initialPromise,
      fn: p.fetchFn,
      onCancel: (v) => {
        v instanceof yd && v.revert && this.setState({
          ...Z(this, Al),
          fetchStatus: "idle"
        }), r.abort();
      },
      onFail: (v, T) => {
        Ge(this, fn, ma).call(this, { type: "failed", failureCount: v, error: T });
      },
      onPause: () => {
        Ge(this, fn, ma).call(this, { type: "pause" });
      },
      onContinue: () => {
        Ge(this, fn, ma).call(this, { type: "continue" });
      },
      retry: p.options.retry,
      retryDelay: p.options.retryDelay,
      networkMode: p.options.networkMode,
      canRun: () => !0
    }));
    try {
      const v = await Z(this, Be).start();
      if (v === void 0)
        throw new Error(`${this.queryHash} data is undefined`);
      return this.setData(v), (E = (C = Z(this, zn).config).onSuccess) == null || E.call(C, v, this), (M = (B = Z(this, zn).config).onSettled) == null || M.call(
        B,
        v,
        this.state.error,
        this
      ), v;
    } catch (v) {
      if (v instanceof yd) {
        if (v.silent)
          return Z(this, Be).promise;
        if (v.revert) {
          if (this.state.data === void 0)
            throw v;
          return this.state.data;
        }
      }
      throw Ge(this, fn, ma).call(this, {
        type: "error",
        error: v
      }), (A = (z = Z(this, zn).config).onError) == null || A.call(
        z,
        v,
        this
      ), (k = (O = Z(this, zn).config).onSettled) == null || k.call(
        O,
        this.state.data,
        v,
        this
      ), v;
    } finally {
      this.scheduleGc();
    }
  }
}, zl = new WeakMap(), Ri = new WeakMap(), Al = new WeakMap(), zn = new WeakMap(), Ni = new WeakMap(), Be = new WeakMap(), Wo = new WeakMap(), Mi = new WeakMap(), fn = new WeakSet(), qx = function() {
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
          ...Iy(r.data, this.options),
          fetchMeta: i.meta ?? null
        };
      case "success":
        const c = {
          ...r,
          ...vg(i.data, i.dataUpdatedAt),
          dataUpdateCount: r.dataUpdateCount + 1,
          ...!i.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
        return jt(this, Al, i.manual ? c : void 0), c;
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
  this.state = o(this.state), Ze.batch(() => {
    this.observers.forEach((r) => {
      r.onQueryUpdate();
    }), Z(this, zn).notify({ query: this, type: "updated", action: i });
  });
}, Tx);
function Iy(a, i) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: Bx(i.networkMode) ? "fetching" : "paused",
    ...a === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function vg(a, i) {
  return {
    data: a,
    dataUpdatedAt: i ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: "success"
  };
}
function yg(a) {
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
var Po, Yn, Ye, Di, Vn, Za, _x, $y = (_x = class extends kx {
  constructor(i) {
    super();
    Gt(this, Vn);
    Gt(this, Po);
    Gt(this, Yn);
    Gt(this, Ye);
    Gt(this, Di);
    jt(this, Po, i.client), this.mutationId = i.mutationId, jt(this, Ye, i.mutationCache), jt(this, Yn, []), this.state = i.state || Fy(), this.setOptions(i.options), this.scheduleGc();
  }
  setOptions(i) {
    this.options = i, this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(i) {
    Z(this, Yn).includes(i) || (Z(this, Yn).push(i), this.clearGcTimeout(), Z(this, Ye).notify({
      type: "observerAdded",
      mutation: this,
      observer: i
    }));
  }
  removeObserver(i) {
    jt(this, Yn, Z(this, Yn).filter((o) => o !== i)), this.scheduleGc(), Z(this, Ye).notify({
      type: "observerRemoved",
      mutation: this,
      observer: i
    });
  }
  optionalRemove() {
    Z(this, Yn).length || (this.state.status === "pending" ? this.scheduleGc() : Z(this, Ye).remove(this));
  }
  continue() {
    var i;
    return ((i = Z(this, Di)) == null ? void 0 : i.continue()) ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(i) {
    var m, p, g, x, w, y, C, E, B, M, z, A, O, k, v, T, N, S;
    const o = () => {
      Ge(this, Vn, Za).call(this, { type: "continue" });
    }, r = {
      client: Z(this, Po),
      meta: this.options.meta,
      mutationKey: this.options.mutationKey
    };
    jt(this, Di, Hx({
      fn: () => this.options.mutationFn ? this.options.mutationFn(i, r) : Promise.reject(new Error("No mutationFn found")),
      onFail: (D, Y) => {
        Ge(this, Vn, Za).call(this, { type: "failed", failureCount: D, error: Y });
      },
      onPause: () => {
        Ge(this, Vn, Za).call(this, { type: "pause" });
      },
      onContinue: o,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => Z(this, Ye).canRun(this)
    }));
    const c = this.state.status === "pending", f = !Z(this, Di).canStart();
    try {
      if (c)
        o();
      else {
        Ge(this, Vn, Za).call(this, { type: "pending", variables: i, isPaused: f }), Z(this, Ye).config.onMutate && await Z(this, Ye).config.onMutate(
          i,
          this,
          r
        );
        const Y = await ((p = (m = this.options).onMutate) == null ? void 0 : p.call(
          m,
          i,
          r
        ));
        Y !== this.state.context && Ge(this, Vn, Za).call(this, {
          type: "pending",
          context: Y,
          variables: i,
          isPaused: f
        });
      }
      const D = await Z(this, Di).start();
      return await ((x = (g = Z(this, Ye).config).onSuccess) == null ? void 0 : x.call(
        g,
        D,
        i,
        this.state.context,
        this,
        r
      )), await ((y = (w = this.options).onSuccess) == null ? void 0 : y.call(
        w,
        D,
        i,
        this.state.context,
        r
      )), await ((E = (C = Z(this, Ye).config).onSettled) == null ? void 0 : E.call(
        C,
        D,
        null,
        this.state.variables,
        this.state.context,
        this,
        r
      )), await ((M = (B = this.options).onSettled) == null ? void 0 : M.call(
        B,
        D,
        null,
        i,
        this.state.context,
        r
      )), Ge(this, Vn, Za).call(this, { type: "success", data: D }), D;
    } catch (D) {
      try {
        await ((A = (z = Z(this, Ye).config).onError) == null ? void 0 : A.call(
          z,
          D,
          i,
          this.state.context,
          this,
          r
        ));
      } catch (Y) {
        Promise.reject(Y);
      }
      try {
        await ((k = (O = this.options).onError) == null ? void 0 : k.call(
          O,
          D,
          i,
          this.state.context,
          r
        ));
      } catch (Y) {
        Promise.reject(Y);
      }
      try {
        await ((T = (v = Z(this, Ye).config).onSettled) == null ? void 0 : T.call(
          v,
          void 0,
          D,
          this.state.variables,
          this.state.context,
          this,
          r
        ));
      } catch (Y) {
        Promise.reject(Y);
      }
      try {
        await ((S = (N = this.options).onSettled) == null ? void 0 : S.call(
          N,
          void 0,
          D,
          i,
          this.state.context,
          r
        ));
      } catch (Y) {
        Promise.reject(Y);
      }
      throw Ge(this, Vn, Za).call(this, { type: "error", error: D }), D;
    } finally {
      Z(this, Ye).runNext(this);
    }
  }
}, Po = new WeakMap(), Yn = new WeakMap(), Ye = new WeakMap(), Di = new WeakMap(), Vn = new WeakSet(), Za = function(i) {
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
  this.state = o(this.state), Ze.batch(() => {
    Z(this, Yn).forEach((r) => {
      r.onMutationUpdate(i);
    }), Z(this, Ye).notify({
      mutation: this,
      type: "updated",
      action: i
    });
  });
}, _x);
function Fy() {
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
var pa, On, tr, jx, Jy = (jx = class extends Ls {
  constructor(i = {}) {
    super();
    Gt(this, pa);
    Gt(this, On);
    Gt(this, tr);
    this.config = i, jt(this, pa, /* @__PURE__ */ new Set()), jt(this, On, /* @__PURE__ */ new Map()), jt(this, tr, 0);
  }
  build(i, o, r) {
    const c = new $y({
      client: i,
      mutationCache: this,
      mutationId: ++_s(this, tr)._,
      options: i.defaultMutationOptions(o),
      state: r
    });
    return this.add(c), c;
  }
  add(i) {
    Z(this, pa).add(i);
    const o = js(i);
    if (typeof o == "string") {
      const r = Z(this, On).get(o);
      r ? r.push(i) : Z(this, On).set(o, [i]);
    }
    this.notify({ type: "added", mutation: i });
  }
  remove(i) {
    if (Z(this, pa).delete(i)) {
      const o = js(i);
      if (typeof o == "string") {
        const r = Z(this, On).get(o);
        if (r)
          if (r.length > 1) {
            const c = r.indexOf(i);
            c !== -1 && r.splice(c, 1);
          } else r[0] === i && Z(this, On).delete(o);
      }
    }
    this.notify({ type: "removed", mutation: i });
  }
  canRun(i) {
    const o = js(i);
    if (typeof o == "string") {
      const r = Z(this, On).get(o), c = r == null ? void 0 : r.find(
        (f) => f.state.status === "pending"
      );
      return !c || c === i;
    } else
      return !0;
  }
  runNext(i) {
    var r;
    const o = js(i);
    if (typeof o == "string") {
      const c = (r = Z(this, On).get(o)) == null ? void 0 : r.find((f) => f !== i && f.state.isPaused);
      return (c == null ? void 0 : c.continue()) ?? Promise.resolve();
    } else
      return Promise.resolve();
  }
  clear() {
    Ze.batch(() => {
      Z(this, pa).forEach((i) => {
        this.notify({ type: "removed", mutation: i });
      }), Z(this, pa).clear(), Z(this, On).clear();
    });
  }
  getAll() {
    return Array.from(Z(this, pa));
  }
  find(i) {
    const o = { exact: !0, ...i };
    return this.getAll().find(
      (r) => pg(o, r)
    );
  }
  findAll(i = {}) {
    return this.getAll().filter((o) => pg(i, o));
  }
  notify(i) {
    Ze.batch(() => {
      this.listeners.forEach((o) => {
        o(i);
      });
    });
  }
  resumePausedMutations() {
    const i = this.getAll().filter((o) => o.state.isPaused);
    return Ze.batch(
      () => Promise.all(
        i.map((o) => o.continue().catch(Dn))
      )
    );
  }
}, pa = new WeakMap(), On = new WeakMap(), tr = new WeakMap(), jx);
function js(a) {
  var i;
  return (i = a.options.scope) == null ? void 0 : i.id;
}
var Xn, zx, Wy = (zx = class extends Ls {
  constructor(i = {}) {
    super();
    Gt(this, Xn);
    this.config = i, jt(this, Xn, /* @__PURE__ */ new Map());
  }
  build(i, o, r) {
    const c = o.queryKey, f = o.queryHash ?? kd(c, o);
    let m = this.get(f);
    return m || (m = new Zy({
      client: i,
      queryKey: c,
      queryHash: f,
      options: i.defaultQueryOptions(o),
      state: r,
      defaultOptions: i.getQueryDefaults(c)
    }), this.add(m)), m;
  }
  add(i) {
    Z(this, Xn).has(i.queryHash) || (Z(this, Xn).set(i.queryHash, i), this.notify({
      type: "added",
      query: i
    }));
  }
  remove(i) {
    const o = Z(this, Xn).get(i.queryHash);
    o && (i.destroy(), o === i && Z(this, Xn).delete(i.queryHash), this.notify({ type: "removed", query: i }));
  }
  clear() {
    Ze.batch(() => {
      this.getAll().forEach((i) => {
        this.remove(i);
      });
    });
  }
  get(i) {
    return Z(this, Xn).get(i);
  }
  getAll() {
    return [...Z(this, Xn).values()];
  }
  find(i) {
    const o = { exact: !0, ...i };
    return this.getAll().find(
      (r) => mg(o, r)
    );
  }
  findAll(i = {}) {
    const o = this.getAll();
    return Object.keys(i).length > 0 ? o.filter((r) => mg(i, r)) : o;
  }
  notify(i) {
    Ze.batch(() => {
      this.listeners.forEach((o) => {
        o(i);
      });
    });
  }
  onFocus() {
    Ze.batch(() => {
      this.getAll().forEach((i) => {
        i.onFocus();
      });
    });
  }
  onOnline() {
    Ze.batch(() => {
      this.getAll().forEach((i) => {
        i.onOnline();
      });
    });
  }
}, Xn = new WeakMap(), zx), ye, Ja, Wa, El, Rl, Pa, Nl, Ml, Ax, Py = (Ax = class {
  constructor(a = {}) {
    Gt(this, ye);
    Gt(this, Ja);
    Gt(this, Wa);
    Gt(this, El);
    Gt(this, Rl);
    Gt(this, Pa);
    Gt(this, Nl);
    Gt(this, Ml);
    jt(this, ye, a.queryCache || new Wy()), jt(this, Ja, a.mutationCache || new Jy()), jt(this, Wa, a.defaultOptions || {}), jt(this, El, /* @__PURE__ */ new Map()), jt(this, Rl, /* @__PURE__ */ new Map()), jt(this, Pa, 0);
  }
  mount() {
    _s(this, Pa)._++, Z(this, Pa) === 1 && (jt(this, Nl, Nx.subscribe(async (a) => {
      a && (await this.resumePausedMutations(), Z(this, ye).onFocus());
    })), jt(this, Ml, Ds.subscribe(async (a) => {
      a && (await this.resumePausedMutations(), Z(this, ye).onOnline());
    })));
  }
  unmount() {
    var a, i;
    _s(this, Pa)._--, Z(this, Pa) === 0 && ((a = Z(this, Nl)) == null || a.call(this), jt(this, Nl, void 0), (i = Z(this, Ml)) == null || i.call(this), jt(this, Ml, void 0));
  }
  isFetching(a) {
    return Z(this, ye).findAll({ ...a, fetchStatus: "fetching" }).length;
  }
  isMutating(a) {
    return Z(this, Ja).findAll({ ...a, status: "pending" }).length;
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
    return (o = Z(this, ye).get(i.queryHash)) == null ? void 0 : o.state.data;
  }
  ensureQueryData(a) {
    const i = this.defaultQueryOptions(a), o = Z(this, ye).build(this, i), r = o.state.data;
    return r === void 0 ? this.fetchQuery(a) : (a.revalidateIfStale && o.isStaleByTime(bd(i.staleTime, o)) && this.prefetchQuery(i), Promise.resolve(r));
  }
  getQueriesData(a) {
    return Z(this, ye).findAll(a).map(({ queryKey: i, state: o }) => {
      const r = o.data;
      return [i, r];
    });
  }
  setQueryData(a, i, o) {
    const r = this.defaultQueryOptions({ queryKey: a }), c = Z(this, ye).get(
      r.queryHash
    ), f = c == null ? void 0 : c.state.data, m = Ry(i, f);
    if (m !== void 0)
      return Z(this, ye).build(this, r).setData(m, { ...o, manual: !0 });
  }
  setQueriesData(a, i, o) {
    return Ze.batch(
      () => Z(this, ye).findAll(a).map(({ queryKey: r }) => [
        r,
        this.setQueryData(r, i, o)
      ])
    );
  }
  getQueryState(a) {
    var o;
    const i = this.defaultQueryOptions({ queryKey: a });
    return (o = Z(this, ye).get(
      i.queryHash
    )) == null ? void 0 : o.state;
  }
  removeQueries(a) {
    const i = Z(this, ye);
    Ze.batch(() => {
      i.findAll(a).forEach((o) => {
        i.remove(o);
      });
    });
  }
  resetQueries(a, i) {
    const o = Z(this, ye);
    return Ze.batch(() => (o.findAll(a).forEach((r) => {
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
    const o = { revert: !0, ...i }, r = Ze.batch(
      () => Z(this, ye).findAll(a).map((c) => c.cancel(o))
    );
    return Promise.all(r).then(Dn).catch(Dn);
  }
  invalidateQueries(a, i = {}) {
    return Ze.batch(() => (Z(this, ye).findAll(a).forEach((o) => {
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
    }, r = Ze.batch(
      () => Z(this, ye).findAll(a).filter((c) => !c.isDisabled() && !c.isStatic()).map((c) => {
        let f = c.fetch(void 0, o);
        return o.throwOnError || (f = f.catch(Dn)), c.state.fetchStatus === "paused" ? Promise.resolve() : f;
      })
    );
    return Promise.all(r).then(Dn);
  }
  fetchQuery(a) {
    const i = this.defaultQueryOptions(a);
    i.retry === void 0 && (i.retry = !1);
    const o = Z(this, ye).build(this, i);
    return o.isStaleByTime(
      bd(i.staleTime, o)
    ) ? o.fetch(i) : Promise.resolve(o.state.data);
  }
  prefetchQuery(a) {
    return this.fetchQuery(a).then(Dn).catch(Dn);
  }
  fetchInfiniteQuery(a) {
    return a._type = "infinite", this.fetchQuery(a);
  }
  prefetchInfiniteQuery(a) {
    return this.fetchInfiniteQuery(a).then(Dn).catch(Dn);
  }
  ensureInfiniteQueryData(a) {
    return a._type = "infinite", this.ensureQueryData(a);
  }
  resumePausedMutations() {
    return Ds.isOnline() ? Z(this, Ja).resumePausedMutations() : Promise.resolve();
  }
  getQueryCache() {
    return Z(this, ye);
  }
  getMutationCache() {
    return Z(this, Ja);
  }
  getDefaultOptions() {
    return Z(this, Wa);
  }
  setDefaultOptions(a) {
    jt(this, Wa, a);
  }
  setQueryDefaults(a, i) {
    Z(this, El).set(qo(a), {
      queryKey: a,
      defaultOptions: i
    });
  }
  getQueryDefaults(a) {
    const i = [...Z(this, El).values()], o = {};
    return i.forEach((r) => {
      Uo(a, r.queryKey) && Object.assign(o, r.defaultOptions);
    }), o;
  }
  setMutationDefaults(a, i) {
    Z(this, Rl).set(qo(a), {
      mutationKey: a,
      defaultOptions: i
    });
  }
  getMutationDefaults(a) {
    const i = [...Z(this, Rl).values()], o = {};
    return i.forEach((r) => {
      Uo(a, r.mutationKey) && Object.assign(o, r.defaultOptions);
    }), o;
  }
  defaultQueryOptions(a) {
    if (a._defaulted)
      return a;
    const i = {
      ...Z(this, Wa).queries,
      ...this.getQueryDefaults(a.queryKey),
      ...a,
      _defaulted: !0
    };
    return i.queryHash || (i.queryHash = kd(
      i.queryKey,
      i
    )), i.refetchOnReconnect === void 0 && (i.refetchOnReconnect = i.networkMode !== "always"), i.throwOnError === void 0 && (i.throwOnError = !!i.suspense), !i.networkMode && i.persister && (i.networkMode = "offlineFirst"), i.queryFn === qd && (i.enabled = !1), i;
  }
  defaultMutationOptions(a) {
    return a != null && a._defaulted ? a : {
      ...Z(this, Wa).mutations,
      ...(a == null ? void 0 : a.mutationKey) && this.getMutationDefaults(a.mutationKey),
      ...a,
      _defaulted: !0
    };
  }
  clear() {
    Z(this, ye).clear(), Z(this, Ja).clear();
  }
}, ye = new WeakMap(), Ja = new WeakMap(), Wa = new WeakMap(), El = new WeakMap(), Rl = new WeakMap(), Pa = new WeakMap(), Nl = new WeakMap(), Ml = new WeakMap(), Ax), t1 = I.createContext(
  void 0
), e1 = ({
  client: a,
  children: i
}) => (I.useEffect(() => (a.mount(), () => {
  a.unmount();
}), [a]), /* @__PURE__ */ d.jsx(t1.Provider, { value: a, children: i }));
function wg(a, i = []) {
  const o = typeof a == "string" ? { prompt: a, context: i } : a;
  return {
    prompt: o.prompt,
    ...o.context.length ? { context: o.context } : {},
    ...o.runPrompt ? { run_prompt: o.runPrompt } : {},
    ...o.metadata ? { metadata: o.metadata } : {},
    ...o.runSettings ? { run_settings: o.runSettings } : {}
  };
}
class n1 {
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
    const c = wg(o, r);
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
    const c = wg(o, r);
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
    return this.callWS({ type: "ha_codex/git/commit_push", message: i, files: Sg(o) });
  }
  discard(i) {
    return this.callWS({ type: "ha_codex/git/discard", files: Sg(i) });
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
function Sg(a) {
  return a.map((i) => ({
    path: i.path,
    ...i.old_path ? { old_path: i.old_path } : {}
  }));
}
const Cg = (a) => {
  let i;
  const o = /* @__PURE__ */ new Set(), r = (x, w) => {
    const y = typeof x == "function" ? x(i) : x;
    if (!Object.is(y, i)) {
      const C = i;
      i = w ?? (typeof y != "object" || y === null) ? y : Object.assign({}, i, y), o.forEach((E) => E(i, C));
    }
  }, c = () => i, p = { setState: r, getState: c, getInitialState: () => g, subscribe: (x) => (o.add(x), () => o.delete(x)) }, g = i = a(r, c, p);
  return p;
}, a1 = ((a) => a ? Cg(a) : Cg), i1 = (a) => a;
function l1(a, i = i1) {
  const o = ct.useSyncExternalStore(
    a.subscribe,
    ct.useCallback(() => i(a.getState()), [a, i]),
    ct.useCallback(() => i(a.getInitialState()), [a, i])
  );
  return ct.useDebugValue(o), o;
}
const Tg = (a) => {
  const i = a1(a), o = (r) => l1(i, r);
  return Object.assign(o, i), o;
}, Ux = ((a) => a ? Tg(a) : Tg);
function Gs(a) {
  return (a == null ? void 0 : a.command) === "ha core restart" && String(a.reason || "").startsWith("restart_required:");
}
function ei(a) {
  return ((a == null ? void 0 : a.approvals) || []).filter((i) => i.status === "pending" && !Gs(i));
}
function Ud(a) {
  return ((a == null ? void 0 : a.approvals) || []).some((i) => i.status === "pending" && Gs(i));
}
function o1(a) {
  return a.map((i) => {
    const o = (i.approvals || []).find((r) => r.status === "pending" && Gs(r));
    return o ? { session: i, approval: o } : null;
  }).filter(Boolean);
}
function Lx(a) {
  if (!r1(a)) return null;
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
function r1(a) {
  var i;
  return a ? a.role === "assistant" ? !0 : a.role === "event" && String(((i = a.metadata) == null ? void 0 : i.kind) || "") === "run_finished" : !1;
}
function s1(a) {
  return String(a || "").replace(/<ha_codex_question>[\s\S]*?<\/ha_codex_question>/gi, "").trim();
}
function u1(a, i = []) {
  const o = String(a || "").trim();
  if (!o || !i.length || !/^\s*File changes:\s*$/im.test(o)) return o;
  const r = new Set(i.map((f) => wd(f.path)).filter(Boolean));
  if (!r.size) return o;
  const c = o.split(/\r?\n/);
  for (let f = 0; f < c.length; f += 1) {
    if (!/^\s*File changes:\s*$/i.test(c[f])) continue;
    const m = [];
    let p = !1, g = f + 1;
    for (; g < c.length; g += 1) {
      const w = c[g];
      if (!w.trim()) continue;
      const y = c1(w);
      if (!y) break;
      p = !0, y.path && m.push(y.path);
    }
    const x = [...new Set(m)];
    if (!(!p || !x.length) && x.every((w) => r.has(w)))
      return [...c.slice(0, f), ...c.slice(g)].join(`
`).trim();
  }
  return o;
}
function c1(a) {
  let i = a.trim();
  if (!i) return null;
  if (/^[-*]?\s*\d+\s+more files? changed\.?$/i.test(i)) return {};
  i = i.replace(/^[-*]\s+/, "").trim(), i = i.replace(/^(added|modified|deleted|renamed|changed|untracked|copied)\s+/i, "").trim(), i = i.replace(/^[MADRC?]{1,2}\s+/, "").trim();
  const o = [...i.matchAll(/`([^`]+)`/g)].map((f) => f[1]);
  if (o.length) {
    const f = wd(o[o.length - 1]);
    return f ? { path: f } : null;
  }
  const r = i.split(/\s+->\s+/);
  if (i = r[r.length - 1].replace(/^["'`]+|["'`,.;:]+$/g, "").trim(), !/[/.\\]/.test(i)) return null;
  const c = wd(i);
  return c ? { path: c } : null;
}
function wd(a = "") {
  return String(a || "").replace(/\\/g, "/").replace(/^\/+/, "").replace(/^homeassistant\//, "").replace(/^config\//, "");
}
function d1(a) {
  return !a || !Array.isArray(a.messages) && a.has_pending_question !== void 0 ? null : Gx(a, a.messages || []);
}
function Gx(a, i = []) {
  if (["planning", "running", "working"].includes(a.status || "")) return null;
  for (let o = i.length - 1; o >= 0; o -= 1) {
    const r = i[o];
    if (r.role === "user") break;
    const c = Lx(r);
    if (c) return { ...c, messageIndex: o };
  }
  return null;
}
function Lo(a) {
  return a && !Array.isArray(a.messages) && a.has_pending_question !== void 0 ? !!a.has_pending_question : !!d1(a);
}
function Go(a) {
  var o;
  const i = (o = a == null ? void 0 : a.metadata) == null ? void 0 : o.pending_plan;
  return !!(i && i.status === "pending");
}
function Do(a) {
  return a ? ["planning", "running", "working"].includes(a.status || "") ? !0 : a.status === "waiting_approval" && !!ei(a).length : !1;
}
function f1(a = []) {
  return a.filter((o) => {
    var r;
    return !["restart_required", "restart_deferred"].includes(String(((r = o.metadata) == null ? void 0 : r.kind) || ""));
  }).filter((o, r, c) => r === 0 ? !0 : Sd(o) !== Sd(c[r - 1]));
}
function Sd(a) {
  var i;
  return [a.role || "", ((i = a.metadata) == null ? void 0 : i.kind) || "", (a.content || "").trim()].join(`
`);
}
function h1(a, i) {
  var o;
  return a.id !== void 0 && a.id !== null ? `id:${a.id}` : a.created_at ? `created:${a.created_at}:${a.role || ""}:${((o = a.metadata) == null ? void 0 : o.kind) || ""}` : `content:${i}:${Sd(a)}`;
}
function m1(a) {
  const i = Oo(a.updated_at);
  if (i !== null) return i;
  const o = [...a.messages || []].reverse().map((r) => Oo(r.created_at)).find((r) => r !== null);
  return o !== void 0 ? o : Oo(a.created_at) ?? 0;
}
function p1(a) {
  const i = Oo(a.last_user_message_at);
  if (i !== null) return i;
  const o = [...a.messages || []].reverse().map((r) => r.role === "user" ? Oo(r.created_at) : null).find((r) => r !== null);
  return o !== void 0 ? o : m1(a);
}
function Cd(a) {
  return p1(a);
}
function Oo(a) {
  if (a == null || a === "") return null;
  const i = Number(a);
  return Number.isFinite(i) && i > 0 ? i : null;
}
function _g(a) {
  const i = (a.approvals || []).some((r) => !Gs(r));
  return Array.isArray(a.messages) ? !(a.messages || []).some(
    (r) => {
      var c;
      return !["restart_required", "restart_deferred"].includes(String(((c = r.metadata) == null ? void 0 : c.kind) || ""));
    }
  ) && !Number(a.last_message_id || 0) && !i && !a.codex_session_id : !Number(a.last_message_id || 0) && !i && !a.codex_session_id;
}
function jg(a) {
  return ei(a).length || Lo(a) || Go(a) || a.status === "waiting_approval" && ei(a).length ? 0 : ["planning", "running", "working"].includes(a.status || "") ? 1 : a.status === "error" ? 2 : 3;
}
function g1(a, i = !1) {
  return [...a].sort((o, r) => {
    const c = {
      activity: Cd(o),
      empty: _g(o),
      rank: jg(o),
      title: String(o.title || "")
    }, f = {
      activity: Cd(r),
      empty: _g(r),
      rank: jg(r),
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
const Qo = 20;
function ti(a) {
  return `${a.kind}:${a.id}`;
}
function x1(a, i) {
  const o = ti(i);
  return a.some((r) => ti(r) === o) || a.length >= Qo ? a : [...a, i];
}
function b1(a, i) {
  return a.filter((o) => ti(o) !== i);
}
function Ld(a = []) {
  return a.slice(0, Qo).map(w1).filter((i) => !!i);
}
function Rs(a, i = [], o = {}) {
  var c;
  const r = (c = o.runPrompt) == null ? void 0 : c.trim();
  return {
    prompt: a.trim(),
    context: Ld(i),
    ...r ? { runPrompt: r } : {},
    ...o.metadata ? { metadata: o.metadata } : {},
    ...o.runSettings ? { runSettings: o.runSettings } : {}
  };
}
function zg(a, i, o = [], r = {}) {
  const c = Rs(i, o, r);
  return {
    id: a,
    content: c.prompt,
    ...c
  };
}
function v1(a) {
  const i = a == null ? void 0 : a.context;
  return Array.isArray(i) ? i.map(Yx).filter((o) => !!o).slice(0, Qo) : [];
}
function y1(a) {
  return Ld(a).map(({ id: i, kind: o, label: r, subtitle: c }) => ({
    id: i,
    kind: o,
    label: r,
    ...c ? { subtitle: c } : {}
  }));
}
function Qx(a) {
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
function Ag(a) {
  return a === "sent" || a === "queued";
}
function w1(a) {
  const i = Yx(a);
  if (!i) return null;
  const o = a.payload && typeof a.payload == "object" && !Array.isArray(a.payload) ? a.payload : void 0;
  return {
    ...i,
    ...o ? { payload: o } : {}
  };
}
function Yx(a) {
  if (!a || typeof a != "object") return null;
  const i = a;
  if (!S1(i.kind)) return null;
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
function S1(a) {
  return a === "entity" || a === "device" || a === "area" || a === "automation" || a === "script" || a === "log" || a === "config_file";
}
let Eg = 0;
function C1(a) {
  const { messages: i, ...o } = a;
  return o;
}
function Vx(a, i, o = []) {
  const r = C1(a);
  return {
    ...i,
    ...r,
    last_user_message_at: Td(
      o,
      r.last_user_message_at ?? (i == null ? void 0 : i.last_user_message_at)
    )
  };
}
function T1(a, i = {}) {
  const o = {}, r = {};
  return a.forEach((c) => {
    Array.isArray(c.messages) ? r[c.id] = c.messages : i[c.id] && (r[c.id] = i[c.id]), o[c.id] = Vx(c, void 0, r[c.id] || []);
  }), { chatsById: o, messagesByChatId: r };
}
function Qn(a, i) {
  return g1(
    Object.values(a).filter((o) => !!o.archived === i),
    i
  ).map((o) => o.id);
}
function Xx(a, i) {
  return a != null && i !== void 0 && i !== null && String(a) === String(i);
}
function Os(a) {
  const i = Number(a);
  return Number.isFinite(i) ? i : null;
}
function Rg(a, i = 0) {
  const o = Number(i);
  return a.reduce((r, c, f) => {
    const m = Os(c.id) ?? f + 1;
    return Math.max(r, m);
  }, Number.isFinite(o) ? o : 0);
}
function Td(a, i) {
  const o = Ng(i);
  return a.reduce((r, c) => {
    if (c.role !== "user") return r;
    const f = Ng(c.created_at);
    return f === null ? r : r === null ? f : Math.max(r, f);
  }, o);
}
function Ng(a) {
  if (a == null || a === "") return null;
  const i = Number(a);
  return Number.isFinite(i) && i > 0 ? i : null;
}
function Mg(a, i) {
  const o = [...a];
  return i.forEach((r) => {
    const c = o.findIndex((m) => Xx(m.id, r.id));
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
    const f = Os(r.id), m = Os(c.id);
    return f !== null && m !== null ? f - m : f !== null ? -1 : m !== null ? 1 : 0;
  });
}
const qt = Ux((a, i) => ({
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
    const c = T1(o, r.messagesByChatId), f = Qn(c.chatsById, !1), m = Qn(c.chatsById, !0), p = r.showArchived ? m : f, g = r.activeId && p.includes(r.activeId) ? r.activeId : p[0] || null, x = Object.fromEntries(
      o.map((w) => [w.id, ["planning", "running", "working"].includes(w.status || "")])
    );
    return { ...c, activeChatIds: f, archivedChatIds: m, activeId: g, streamingByChatId: x };
  }),
  upsertSession: (o) => a((r) => {
    const c = Array.isArray(o.messages) ? o.messages : r.messagesByChatId[o.id], f = {
      ...r.chatsById,
      [o.id]: Vx(o, r.chatsById[o.id], c || [])
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
    const { [o]: c, ...f } = r.chatsById, { [o]: m, ...p } = r.messagesByChatId, { [o]: g, ...x } = r.contextByChatId, w = Qn(f, !1), y = Qn(f, !0), C = r.showArchived ? y : w;
    return {
      chatsById: f,
      messagesByChatId: p,
      contextByChatId: x,
      activeChatIds: w,
      archivedChatIds: y,
      activeId: r.activeId === o ? C[0] || null : r.activeId
    };
  }),
  appendMessage: (o, r, c = !0) => a((f) => {
    const m = f.chatsById[o];
    if (!m) return {};
    const p = Mg(f.messagesByChatId[o] || [], [r]), g = {
      ...f.chatsById,
      [o]: {
        ...m,
        last_message_id: Rg(p, m.last_message_id),
        last_user_message_at: Td(p, m.last_user_message_at),
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
    const p = Mg(f.messagesByChatId[o] || [], r), g = {
      ...f.chatsById,
      [o]: {
        ...m,
        last_message_id: Rg(p, m.last_message_id),
        last_user_message_at: Td(p, m.last_user_message_at),
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
    const p = f.messagesByChatId[o] || [], g = Os(c);
    if (!p.length && g !== null && g > 1) return {};
    const x = [...p];
    let w = c == null ? -1 : x.findIndex((B) => Xx(B.id, c));
    if (w === -1) {
      for (let B = x.length - 1; B >= 0; B -= 1)
        if (x[B].role === "assistant") {
          w = B;
          break;
        }
    }
    w === -1 ? x.push({ id: c, role: "assistant", content: r, created_at: Date.now() / 1e3 }) : x[w] = { ...x[w], content: `${x[w].content || ""}${r}` };
    const y = Number(m.last_message_id || 0), C = g !== null ? Math.max(y, g) : y;
    return {
      chatsById: C !== y ? { ...f.chatsById, [o]: { ...m, last_message_id: C } } : f.chatsById,
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
    const f = x1(c.contextByChatId[o] || [], r);
    return { contextByChatId: { ...c.contextByChatId, [o]: f } };
  }),
  removeContextItem: (o, r) => a((c) => {
    const f = b1(c.contextByChatId[o] || [], r);
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
    const f = Ld(r);
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
    const f = typeof r == "string" ? zg(String(++Eg), r, c) : zg(String(++Eg), r.prompt, r.context, {
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
function Dg(a) {
  return a.trim() === "??" ? "untracked" : a.includes("D") && !/[MARCA]/.test(a) ? "deleted" : a.includes("A") ? "added" : a.includes("R") ? "renamed" : a.includes("C") ? "copied" : a.includes("M") ? "modified" : "changed";
}
function xa(a, i = "") {
  return `${i || ""}
${a || ""}`;
}
function Kx(a) {
  const i = String(a || ""), o = i.lastIndexOf("/");
  return o === -1 ? { folder: ".", name: i } : { folder: i.slice(0, o), name: i.slice(o + 1) };
}
function _1(a) {
  const i = /* @__PURE__ */ new Map();
  return a.forEach((o) => {
    var m;
    const { folder: r, name: c } = Kx(o.path), f = r || ".";
    i.has(f) || i.set(f, []), (m = i.get(f)) == null || m.push({ ...o, display_name: c });
  }), [...i.entries()].sort(([o], [r]) => o.localeCompare(r)).map(([o, r]) => ({
    folder: o,
    files: r.sort((c, f) => String(c.display_name || c.path).localeCompare(String(f.display_name || f.path)))
  }));
}
function er(a = []) {
  return a;
}
function Bs(a = []) {
  return er(a).length;
}
function j1(a = []) {
  return Object.fromEntries(er(a).map((i) => [xa(i.path, i.old_path || ""), !0]));
}
function _d(a = [], i = {}) {
  return er(a).filter((o) => i[xa(o.path, o.old_path || "")]);
}
function Gd(a = [], i = {}) {
  return _d(a, i).length;
}
function z1(a, i = {}) {
  const o = xa(a.path, a.old_path || "");
  if (i[o]) {
    const { [o]: r, ...c } = i;
    return c;
  }
  return { ...i, [o]: !0 };
}
function Og(a = [], i = {}, o = !1) {
  return o || Gd(a, i) === 0;
}
function A1(a) {
  return String(a || "").split(`
`).filter((i) => !i.startsWith("diff --git ")).filter((i) => !i.startsWith("index ")).filter((i) => !i.startsWith("new file mode ")).filter((i) => !i.startsWith("deleted file mode ")).map((i) => i.startsWith("@@") ? { type: "hunk", content: i } : i.startsWith("+") && !i.startsWith("+++") ? { type: "added", content: i } : i.startsWith("-") && !i.startsWith("---") ? { type: "deleted", content: i } : i.startsWith("+++") || i.startsWith("---") ? { type: "meta", content: i } : { type: "context", content: i });
}
function E1(a) {
  const i = String(a || "changed").toLowerCase();
  return i === "added" || i === "untracked" ? "mdi:file-plus-outline" : i === "modified" ? "mdi:file-edit-outline" : i === "deleted" ? "mdi:file-remove-outline" : i === "renamed" ? "mdi:file-move-outline" : i === "copied" ? "mdi:file-multiple-outline" : "mdi:file-outline";
}
const Dl = "gpt_5_5", Qd = "codex_default", Hs = [
  { id: "gpt_5_5", label: "GPT-5.5", model: "gpt-5.5" },
  { id: "gpt_5_4", label: "GPT-5.4", model: "gpt-5.4" },
  { id: "gpt_5_4_mini", label: "GPT-5.4-Mini", model: "gpt-5.4-mini" },
  { id: "gpt_5_3_codex", label: "GPT-5.3-Codex", model: "gpt-5.3-codex" },
  { id: "gpt_5_3_codex_spark", label: "GPT-5.3-Codex-Spark", model: "gpt-5.3-codex-spark" },
  { id: "gpt_5_2", label: "GPT-5.2", model: "gpt-5.2" }
], wl = new Set(Hs.map((a) => a.id)), Zx = {
  mode: "auto",
  model_preset_id: Dl,
  reasoning_effort: "auto",
  verbosity: "auto",
  plan_mode: "auto",
  validation_depth: "auto",
  tool_visibility: "normal",
  approval_mode: "ask"
}, R1 = {
  mode: ["auto", "manual"],
  reasoning_effort: ["auto", "minimal", "low", "medium", "high", "xhigh"],
  verbosity: ["auto", "low", "medium", "high"],
  plan_mode: ["auto", "always", "off"],
  validation_depth: ["auto", "none", "full"],
  tool_visibility: ["compact", "normal", "verbose"],
  approval_mode: ["ask", "auto_readonly"]
};
function Ix() {
  return {
    defaults: { ...Zx },
    model_presets: Hs.map((a) => ({ ...a })),
    context_budget_chars: 4e4
  };
}
function Yd(a, i = Zx) {
  const o = { ...i };
  if (!a || typeof a != "object") return o;
  if (Object.entries(R1).forEach(([r, c]) => {
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
function Yo(a) {
  const i = Ix();
  if (!a || typeof a != "object") return i;
  const o = N1(a.model_presets), r = {
    defaults: Yd(a.defaults, i.defaults),
    model_presets: o,
    context_budget_chars: H1(a.context_budget_chars)
  };
  return r.model_presets.some((c) => c.id === r.defaults.model_preset_id) ? r.defaults.model_preset_id === Qd && (r.defaults.model_preset_id = Dl) : r.defaults.model_preset_id = Dl, r;
}
function N1(a) {
  const i = Hs.map((r) => ({ ...r })), o = /* @__PURE__ */ new Set([...Hs.map((r) => r.id), Qd]);
  return Array.isArray(a) && a.forEach((r) => {
    if (!r || typeof r != "object") return;
    const c = r, f = String(c.id || "").trim();
    if (!f || o.has(f)) return;
    const m = String(c.label || f).trim() || f, p = c.model === null || c.model === void 0 ? null : String(c.model).trim() || null;
    i.push({ id: f, label: m, model: p }), o.add(f);
  }), i;
}
function $x(a, i) {
  const o = Yo(a), r = String(i.id || Fx(i.label || i.model || "model")).trim();
  if (!r || wl.has(r)) return o;
  const c = {
    id: r,
    label: String(i.label || r).trim() || r,
    model: i.model === null ? null : String(i.model || "").trim() || null
  }, f = o.model_presets.findIndex((p) => p.id === r), m = [...o.model_presets];
  return f === -1 ? m.push(c) : m[f] = c, { ...o, model_presets: m };
}
function M1(a, i) {
  const o = Yo(a);
  if (wl.has(i)) return o;
  const r = o.model_presets.filter((f) => f.id !== i), c = o.defaults.model_preset_id === i ? { ...o.defaults, model_preset_id: Dl } : o.defaults;
  return { ...o, defaults: c, model_presets: r };
}
function D1(a, i) {
  var f;
  const o = Yo(i), r = (f = a == null ? void 0 : a.metadata) == null ? void 0 : f.run_settings, c = Yd(
    r && typeof r == "object" ? r : void 0,
    o.defaults
  );
  return o.model_presets.some((m) => m.id === c.model_preset_id) ? c.model_preset_id === Qd && (c.model_preset_id = Dl) : c.model_preset_id = Dl, c;
}
function O1(a, i = 4e4) {
  const o = Math.max(1e3, Number.isFinite(Number(i)) ? Number(i) : 4e4), r = B1(a), c = r / o, f = c >= 0.9 ? "danger" : c >= 0.7 ? "warning" : "ok";
  return {
    used: r,
    budget: o,
    ratio: c,
    level: f,
    label: `${Bg(r)} / ${Bg(o)}`
  };
}
function B1(a) {
  return a.reduce((i, o) => i + JSON.stringify(o).length, 0);
}
function Fx(a) {
  return a.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || `model_${Date.now()}`;
}
function H1(a) {
  const i = Number(a);
  return Number.isFinite(i) ? Math.min(2e5, Math.max(1e3, Math.round(i))) : 4e4;
}
function Bg(a) {
  return a < 1e3 ? String(Math.round(a)) : `${Math.round(a / 1e3)}k`;
}
const wt = Ux((a, i) => ({
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
  settings: Ix(),
  settingsLoading: !1,
  settingsSaving: !1,
  settingsTab: "run",
  gitPanelOpen: !1,
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
  setGitChanges: (o) => a({ gitChanges: o, gitSelection: j1((o == null ? void 0 : o.files) || []), gitVisibleLimit: i().gitPageSize }),
  setGitChangedCount: (o) => a({ gitChangedCount: o }),
  setGitLoading: (o) => a({ gitLoading: o }),
  setOpenGitDiffKey: (o) => a({ openGitDiffKey: o }),
  setGitFileDiff: (o, r) => a((c) => ({ gitFileDiffs: { ...c.gitFileDiffs, [o]: r } })),
  setGitFileDiffLoading: (o, r) => a((c) => ({ gitFileDiffLoading: { ...c.gitFileDiffLoading, [o]: r } })),
  toggleGitFileSelected: (o) => a((r) => ({ gitSelection: z1(o, r.gitSelection), gitDiscardConfirming: !1 })),
  setGitFileSelected: (o, r) => a((c) => {
    const f = xa(o.path, o.old_path || "");
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
})), k1 = {
  session_updated: "ha_codex/session_updated",
  session_deleted: "ha_codex/session_deleted",
  message_appended: "ha_codex/message_appended",
  message_delta: "ha_codex/message_delta",
  run_finished: "ha_codex/run_finished",
  approval_required: "ha_codex/approval_required",
  validation_finished: "ha_codex/validation_finished"
}, q1 = 200;
class U1 {
  constructor() {
    jn(this, "hass", null);
    jn(this, "panel", null);
    jn(this, "subscribed", !1);
    jn(this, "unsubscribers", []);
    jn(this, "reconnectTimer", null);
    jn(this, "deltaFrame", null);
    jn(this, "pendingDeltas", /* @__PURE__ */ new Map());
  }
  configure(i, o) {
    this.hass = i, this.panel = o, this.connect();
  }
  connect() {
    var r, c, f;
    if (this.subscribed || !((r = this.hass) != null && r.connection)) return;
    const i = ((f = (c = this.panel) == null ? void 0 : c.config) == null ? void 0 : f.events) || k1, o = Object.values(i).filter(Boolean);
    o.length && (this.subscribed = !0, o.forEach((m) => {
      var p, g;
      try {
        const x = (g = (p = this.hass) == null ? void 0 : p.connection) == null ? void 0 : g.subscribeEvents((w) => this.handleEvent(w), m);
        Promise.resolve(x).then((w) => {
          typeof w == "function" && this.unsubscribers.push(w);
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
    o.session_id && o.message && (this.flushDeltas(), r.appendMessage(o.session_id, o.message)), o.session_id && o.delta && this.queueDelta(o.session_id, o.delta, o.message_id), o.session && (this.flushDeltas(), r.upsertSession(o.session), this.recoverMissingMessages(o.session.id)), o.deleted_session_id && r.deleteSession(o.deleted_session_id), o.validation && (r.setValidation(o.validation), wt.getState().showToast(
      o.validation.status === "passed" ? "Validation passed" : "Validation finished",
      o.validation.status === "passed" ? "success" : "error"
    )), o.approval && (r.bumpRestartToast(), o.approval.command !== "ha core restart" && wt.getState().showToast("Codex needs approval for a shell command", "info"));
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
          ...c ? {} : { limit: q1 }
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
const Hg = new U1();
function Hn(a) {
  return String(a || "").replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, "");
}
function Jx(a, i = {}) {
  const o = Wx(a);
  if (o === null) return "";
  const r = new Date(o * 1e3), c = Math.floor((Date.now() - r.getTime()) / 1e3), f = Math.abs(c), m = c >= 0 ? "ago" : "", p = c < 0 ? "in " : "";
  if (f < 60) return c < 0 && !i.pastOnly ? "in less than a minute" : "just now";
  if (f < 3600) {
    const y = Math.floor(f / 60);
    return `${p}${y} minute${y === 1 ? "" : "s"}${m ? ` ${m}` : ""}`;
  }
  if (f < 86400) {
    const y = Math.floor(f / 3600);
    return `${p}${y} hour${y === 1 ? "" : "s"}${m ? ` ${m}` : ""}`;
  }
  if (f < 172800 && c >= 0) return "yesterday";
  if (f < 172800 && !i.pastOnly) return "tomorrow";
  if (c < 0 && !i.pastOnly && f < 2592e3) {
    const y = Math.floor(f / 86400);
    return `in ${y} day${y === 1 ? "" : "s"}`;
  }
  const g = r.getFullYear(), x = String(r.getMonth() + 1).padStart(2, "0"), w = String(r.getDate()).padStart(2, "0");
  return `${g}-${x}-${w}`;
}
function nr(a) {
  return Jx(a, { pastOnly: !0 });
}
function L1(a) {
  const i = Number(a);
  if (!Number.isFinite(i) || i < 0) return "";
  const o = Math.floor(i / 86400), r = Math.floor(i % 86400 / 3600), c = Math.floor(i % 3600 / 60);
  return o > 0 ? `${o}d ${r}h` : r > 0 ? `${r}h ${c}m` : c > 0 ? `${c}m` : `${Math.floor(i)}s`;
}
function ks(a) {
  const i = Wx(a);
  return i === null ? "" : new Date(i * 1e3).toLocaleString();
}
function Wx(a) {
  if (a == null || a === "") return null;
  const i = Number(a);
  return Number.isFinite(i) && i > 0 ? i : null;
}
function ne(a) {
  if (a instanceof Error && a.message) return a.message;
  if (typeof a == "object" && a && "code" in a) {
    const i = a;
    return `${i.name || "Error"} code ${i.code}`;
  }
  return String(a);
}
async function Px(a) {
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
function Vd(a) {
  var o;
  const i = (o = a == null ? void 0 : a.metadata) == null ? void 0 : o.pending_plan;
  return !i || i.status !== "pending" || !i.id ? null : i;
}
function tb(a) {
  var o;
  const i = (o = a == null ? void 0 : a.metadata) == null ? void 0 : o.pending_plan;
  return !!(i && i.status === "planning");
}
function G1(a) {
  var i;
  return String(((i = Vd(a)) == null ? void 0 : i.prompt) || "").trim();
}
function Q1() {
  var a;
  return (a = window.crypto) != null && a.randomUUID ? `local-${window.crypto.randomUUID()}` : `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function kg(a, i) {
  var r;
  const o = (r = a.results) == null ? void 0 : r.find((c) => c.ok === !1);
  return Hn([o == null ? void 0 : o.stdout, o == null ? void 0 : o.stderr, a.stdout, a.stderr].filter(Boolean).join(`
`)).trim() || i;
}
function qg(a) {
  var i;
  return JSON.stringify(((i = a == null ? void 0 : a.metadata) == null ? void 0 : i.run_settings) || null);
}
function Y1(a) {
  return I.useMemo(() => {
    const i = () => wt.getState(), o = () => qt.getState();
    let r = null;
    const c = async (v) => {
      const [T, N] = await Promise.all([a.gitStatus(), a.gitDiff()]), S = Hn(T.stdout || "").split(`
`).filter((Y) => Y.trim()), D = er(S.map((Y) => {
        const F = Y.slice(0, 2);
        return {
          path: Y.slice(3),
          code: F,
          status: Dg(F),
          added_lines: null,
          deleted_lines: null
        };
      }));
      return {
        ok: !!(T.ok && N.ok),
        returncode: N.returncode,
        stdout: T.stdout,
        stderr: [T.stderr, N.stderr, ne(v)].filter(Boolean).join(`
`),
        changed_count: D.length,
        files: D,
        legacy: !0
      };
    }, f = async () => {
      const v = await a.listSessions();
      o().setSessions(v.sessions || []);
    }, m = async () => {
      try {
        i().setStatus(await a.status());
      } catch (v) {
        i().setStatus({ error: ne(v) });
      }
    }, p = async () => {
      i().setAccountLoading(!0);
      try {
        i().setAccount(await a.accountStatus());
      } catch (v) {
        i().setAccount({ ok: !1, logged_in: !1, error: ne(v) });
      } finally {
        i().setAccountLoading(!1);
      }
    }, g = () => {
      r !== null && window.clearInterval(r), r = window.setInterval(() => {
        a.accountDeviceLoginStatus().then(async (v) => {
          i().setDeviceLogin(v), v.status === "succeeded" ? (r !== null && window.clearInterval(r), r = null, await Promise.all([p(), m()]), i().showToast("Codex account connected", "success")) : (v.status === "failed" || v.status === "canceled") && (r !== null && window.clearInterval(r), r = null, v.status === "failed" && i().showToast(v.error || "Device login failed", "error"));
        }).catch((v) => {
          r !== null && window.clearInterval(r), r = null, i().showToast(ne(v), "error");
        });
      }, 2e3);
    }, x = async () => {
      i().setSettingsLoading(!0);
      try {
        const v = await a.settings();
        i().setSettings(Yo(v.settings));
      } catch (v) {
        i().showToast(`Settings failed to load: ${ne(v)}`, "error");
      } finally {
        i().setSettingsLoading(!1);
      }
    }, w = async () => {
      i().setBridgeLogLoading(!0);
      try {
        i().setBridgeLog(await a.bridgeLog());
      } catch (v) {
        i().setBridgeLog({ error: ne(v), lines: "" });
      } finally {
        i().setBridgeLogLoading(!1);
      }
    }, y = async () => {
      i().setBridgeLogLoading(!0);
      try {
        const v = await a.bridgeLogClear();
        i().setBridgeLog(v), v.error ? i().showToast(`Bridge log clear failed: ${v.error}`, "error") : i().showToast("Bridge log cleared", "success");
      } catch (v) {
        i().showToast(`Bridge log clear failed: ${ne(v)}`, "error");
      } finally {
        i().setBridgeLogLoading(!1);
      }
    }, C = async () => {
      try {
        const v = await a.gitStatus(), T = Hn(v.stdout || "").split(`
`).filter((N) => N.trim()).map((N) => ({ path: N.slice(3), status: Dg(N.slice(0, 2)) }));
        i().setGitChangedCount(Bs(T));
      } catch {
        i().setGitChangedCount(0);
      }
    }, E = async (v = !0) => {
      if (!i().gitLoading) {
        i().setGitLoading(!0);
        try {
          let T;
          try {
            T = await a.gitChanges();
          } catch (N) {
            T = await c(N);
          }
          i().setGitChanges(T), i().setOpenGitDiffKey(null), i().setGitDiscardConfirming(!1), i().setGitChangedCount(Bs(T.files || [])), v && i().showToast("Git changes refreshed", "success");
        } catch (T) {
          i().setGitChanges({ ok: !1, changed_count: 0, files: [], stderr: ne(T) }), v && i().showToast(`Git reload failed: ${ne(T)}`, "error");
        } finally {
          i().setGitLoading(!1);
        }
      }
    }, B = async () => {
      const v = Q1(), T = {
        id: v,
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
      o().upsertSession(T), o().setActiveId(v);
      try {
        const N = await a.createSession(), S = o().drafts[v], D = o().contextByChatId[v] || [];
        o().deleteSession(v), o().upsertSession(N.session), o().setActiveId(N.session.id), S !== void 0 && o().setDraft(N.session.id, S), D.forEach((Y) => o().addContextItem(N.session.id, Y));
      } catch (N) {
        o().deleteSession(v), i().showToast(ne(N), "error");
      }
    }, M = (v, T = []) => typeof v == "string" ? Rs(v, T) : v, z = async (v, T) => {
      const N = o().chatsById[v];
      if (!N) return;
      const S = o().contextByChatId[v] || [], D = M(T, S);
      if (!D.prompt.trim()) return;
      if (Do(N)) {
        o().enqueueMessage(v, D), Ag("queued") && o().clearContext(v), i().showToast("Message queued", "info");
        return;
      }
      const Y = y1(D.context), F = {
        role: "user",
        content: D.prompt,
        created_at: Date.now() / 1e3,
        metadata: {
          optimistic: !0,
          ...D.metadata || {},
          ...Y.length ? { context: Y } : {}
        }
      };
      o().appendMessage(v, F);
      const et = o().chatsById[v] || N;
      o().upsertSession({ ...et, status: "running", updated_at: Date.now() / 1e3 });
      try {
        const st = await a.send(v, D);
        o().upsertSession(st.session), Ag("sent") && o().clearContext(v);
      } catch (st) {
        i().showToast(ne(st), "error"), await f();
      }
    }, A = async (v, T) => {
      const N = T.trim();
      N && (o().clearQuestionDraft(v), await z(v, `Answer to your question: ${N}`));
    }, O = async (v, T) => {
      const N = o().chatsById[v];
      if (N) {
        o().upsertSession({ ...N, archived: T, archived_at: T ? Date.now() / 1e3 : null, updated_at: Date.now() / 1e3 }), T || (o().setShowArchived(!1), o().setActiveId(v));
        try {
          const S = await a.archive(v, T);
          S.deleted_session_id ? (o().deleteSession(S.deleted_session_id), i().showToast("Empty chat removed", "success")) : S.session && (o().upsertSession(S.session), i().showToast(T ? "Chat archived" : "Chat restored", "success"));
        } catch (S) {
          o().upsertSession(N), i().showToast(ne(S), "error");
        }
      }
    }, k = async (v) => {
      const N = (o().queuesByChatId[v] || [])[0];
      if (!(!N || o().queueStartsByChatId[v])) {
        o().setQueueStarting(v, !0);
        try {
          const S = o().chatsById[v], D = Rs(N.prompt || N.content, N.context || [], {
            runPrompt: N.runPrompt,
            metadata: N.metadata,
            runSettings: N.runSettings
          }), Y = S && (Do(S) || Ud(S)) ? await a.steer(v, D) : await a.send(v, D);
          o().removeQueuedMessage(v, N.id), o().upsertSession(Y.session), i().showToast("Started queued message", "success");
        } catch (S) {
          i().showToast(ne(S), "error");
        } finally {
          o().setQueueStarting(v, !1);
        }
      }
    };
    return {
      loadInitial: async () => {
        await Promise.all([f(), m(), x(), p()]), await C();
      },
      loadSessions: f,
      loadStatus: m,
      loadAccountStatus: p,
      loadSettings: x,
      loadBridgeLog: w,
      clearBridgeLog: y,
      loadGitChanges: E,
      createSession: B,
      sendPrompt: z,
      answerQuestion: A,
      startRename: (v) => {
        const T = o().chatsById[v];
        i().setRenaming(v, (T == null ? void 0 : T.title) || "");
      },
      saveRename: async (v) => {
        const T = i().renameTitle.trim();
        if (!T) return;
        const N = await a.rename(v, T);
        i().setRenaming(null), o().upsertSession(N.session), i().showToast("Chat renamed", "success");
      },
      archiveSession: O,
      cancelSession: async (v) => {
        const T = await a.cancel(v);
        o().upsertSession(T.session), i().showToast("Run canceled", "success");
      },
      retryContinueSession: async (v) => {
        const T = await a.retryContinue(v);
        o().upsertSession(T.session), i().showToast("Retrying chat", "info");
      },
      editQueuedMessage: (v, T) => {
        const N = (o().queuesByChatId[v] || []).find((S) => S.id === T);
        N && (o().removeQueuedMessage(v, T), o().setDraft(v, N.content), o().setContextItems(v, N.context || []));
      },
      clearQueuedMessage: (v, T) => o().removeQueuedMessage(v, T),
      steerQueuedMessage: async (v, T) => {
        const N = (o().queuesByChatId[v] || []).find((Y) => Y.id === T);
        if (!N) return;
        const S = Rs(N.prompt || N.content, N.context || [], {
          runPrompt: N.runPrompt,
          metadata: N.metadata,
          runSettings: N.runSettings
        }), D = await a.steer(v, S);
        o().removeQueuedMessage(v, T), o().upsertSession(D.session), i().showToast("Steering queued for this run", "success");
      },
      respondApproval: async (v, T, N, S) => {
        const D = await a.respondApproval(v, T, N);
        o().upsertSession(D.session), i().showToast(S || (N ? "Action approved" : "Action canceled"), "success");
      },
      respondRunPlan: async (v, T, N) => {
        var Y;
        const S = o().chatsById[v], D = N === "revise" ? G1(S) : "";
        if (N === "approve" && S) {
          const F = (Y = S.metadata) == null ? void 0 : Y.pending_plan;
          o().upsertSession({
            ...S,
            metadata: {
              ...S.metadata,
              pending_plan: typeof F == "object" && F !== null ? { ...F, status: "approved" } : F
            }
          });
        }
        try {
          const F = await a.respondRunPlan(v, T, N);
          o().upsertSession(F.session), D && o().setDraft(v, D), i().showToast(N === "approve" ? "Run plan approved" : N === "revise" ? "Prompt ready to revise" : "Run plan canceled", "success");
        } catch (F) {
          throw N === "approve" && S && o().upsertSession(S), F;
        }
      },
      updateSettings: async (v) => {
        i().setSettingsSaving(!0);
        try {
          const T = await a.updateSettings(v);
          i().setSettings(Yo(T.settings)), i().showToast("Settings saved", "success");
        } finally {
          i().setSettingsSaving(!1);
        }
      },
      updateSessionRunSettings: async (v, T) => {
        const N = o().chatsById[v];
        if (!N) return;
        const S = Yd(T, i().settings.defaults), D = JSON.stringify(S);
        o().upsertSession({
          ...N,
          metadata: {
            ...N.metadata || {},
            run_settings: S
          },
          updated_at: Date.now() / 1e3
        });
        try {
          const Y = await a.updateSessionRunSettings(v, S);
          qg(o().chatsById[v]) === D && o().upsertSession(Y.session);
        } catch (Y) {
          throw qg(o().chatsById[v]) === D && o().upsertSession(N), Y;
        }
      },
      rollbackRun: async (v, T) => {
        const N = await a.rollbackRun(v, T);
        if (await f(), await E(!1), !N.ok) {
          i().showToast(N.reason || "Rollback needs manual review", "error");
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
        const v = o();
        if (!v.scheduledRestart || (Object.values(v.chatsById).forEach((D) => {
          (v.queuesByChatId[D.id] || []).length && !Do(D) && !ei(D).length && !Lo(D) && !Go(D) && k(D.id);
        }), Object.values(v.chatsById).some(
          (D) => (v.queuesByChatId[D.id] || []).length || v.queueStartsByChatId[D.id] || Do(D) || ei(D).length || Lo(D) || Go(D)
        ))) return;
        const N = v.chatsById ? Object.values(v.chatsById).flatMap(
          (D) => (D.approvals || []).filter((Y) => Y.status === "pending" && Y.command === "ha core restart").map((Y) => ({ session: D, approval: Y }))
        )[0] : null;
        if (!N) {
          o().setScheduledRestart(!1);
          return;
        }
        o().setScheduledRestart(!1);
        const S = await a.respondApproval(N.session.id, N.approval.id, !0);
        o().upsertSession(S.session);
      },
      toggleGitPanel: async () => {
        const v = !i().gitPanelOpen;
        i().setGitPanelOpen(v), v && !i().gitChanges && await E(!1);
      },
      showMoreGitFiles: () => i().showMoreGitFiles(),
      toggleGitFileDiff: async (v, T = "") => {
        const N = xa(v, T);
        if (i().openGitDiffKey === N) {
          i().setOpenGitDiffKey(null);
          return;
        }
        if (i().setOpenGitDiffKey(N), !(i().gitFileDiffs[N] || i().gitFileDiffLoading[N])) {
          i().setGitFileDiffLoading(N, !0);
          try {
            i().setGitFileDiff(N, await a.gitFileDiff(v, T));
          } catch (S) {
            i().setGitFileDiff(N, { ok: !1, path: v, old_path: T, patch: "", stderr: ne(S) });
          } finally {
            i().setGitFileDiffLoading(N, !1);
          }
        }
      },
      commitAndPush: async (v) => {
        var S;
        const T = v.trim(), N = _d(((S = i().gitChanges) == null ? void 0 : S.files) || [], i().gitSelection);
        if (!T) {
          i().showToast("Commit message is required", "error");
          return;
        }
        if (!N.length) {
          i().setGitOperationResult({ ok: !1, stderr: "No files selected." }), i().showToast("Select at least one file", "error");
          return;
        }
        i().setCommitRunning(!0), i().setGitOperationResult(null);
        try {
          const D = await a.commitPush(T, N);
          if (i().setGitOperationResult(D), !D.ok)
            throw new Error(kg(D, "Commit and push failed"));
          i().setCommitMessage(""), i().setGitDiscardConfirming(!1), i().showToast("Changes committed and pushed", "success"), await E(!1), i().setGitOperationResult(D);
        } catch (D) {
          throw i().gitOperationResult || i().setGitOperationResult({ ok: !1, stderr: ne(D) }), D;
        } finally {
          i().setCommitRunning(!1);
        }
      },
      discardSelectedGitFiles: async () => {
        var T;
        const v = _d(((T = i().gitChanges) == null ? void 0 : T.files) || [], i().gitSelection);
        if (!v.length) {
          i().setGitOperationResult({ ok: !1, stderr: "No files selected." }), i().showToast("Select at least one file", "error");
          return;
        }
        i().setDiscardRunning(!0), i().setGitOperationResult(null);
        try {
          const N = await a.discard(v);
          if (i().setGitOperationResult(N), !N.ok)
            throw new Error(kg(N, "Discard failed"));
          i().setGitDiscardConfirming(!1), i().showToast("Selected changes discarded", "success"), await E(!1), i().setGitOperationResult(N);
        } catch (N) {
          throw i().gitOperationResult || i().setGitOperationResult({ ok: !1, stderr: ne(N) }), N;
        } finally {
          i().setDiscardRunning(!1);
        }
      },
      runValidation: async (v) => {
        if (!o().validationRunning) {
          o().setValidationRunning(!0);
          try {
            const T = await a.runValidation(v);
            o().setValidation(T.validation);
          } catch (T) {
            throw o().setValidation({ status: "failed", stderr: ne(T), created_at: Date.now() / 1e3 }), T;
          } finally {
            o().setValidationRunning(!1);
          }
        }
      },
      reloadValidationDomains: async (v) => {
        if (!(await a.reloadValidationDomains(v)).ok) throw new Error("Reload failed");
        i().showToast(`Reloaded ${v.join(", ")}`, "success");
      },
      startOrRestartBridge: async () => {
        var T;
        const v = ((T = i().status.runtime) == null ? void 0 : T.bridge_available) === !0;
        i().setBridgeActionRunning(!0);
        try {
          const N = await a.bridgeRestart();
          if (!(N != null && N.ok)) throw new Error((N == null ? void 0 : N.error) || "Bridge helper failed");
          await Promise.all([m(), w()]), i().showToast(v ? "Bridge restarted" : "Bridge started", "success");
        } catch (N) {
          i().showToast(ne(N), "error");
        } finally {
          i().setBridgeActionRunning(!1);
        }
      },
      restartHomeAssistant: async () => {
        if (window.confirm("Restart Home Assistant Core now?")) {
          i().setCoreActionRunning(!0);
          try {
            const v = await a.coreRestart();
            if (!(v != null && v.ok)) throw new Error((v == null ? void 0 : v.error) || "Home Assistant restart failed");
            i().showToast("Home Assistant restart requested", "success");
          } finally {
            i().setCoreActionRunning(!1);
          }
        }
      },
      startDeviceLogin: async () => {
        i().setAccountActionRunning(!0);
        try {
          const v = await a.accountDeviceLoginStart();
          if (i().setDeviceLogin(v), v.status === "pending")
            g(), i().showToast("Device login started", "info");
          else if (v.status === "succeeded")
            await Promise.all([p(), m()]), i().showToast("Codex account connected", "success");
          else if (!v.ok)
            throw new Error(v.error || "Device login failed");
        } finally {
          i().setAccountActionRunning(!1);
        }
      },
      cancelDeviceLogin: async () => {
        const v = await a.accountDeviceLoginCancel();
        r !== null && window.clearInterval(r), r = null, i().setDeviceLogin(v), i().showToast("Device login canceled", "success");
      },
      logoutAccount: async () => {
        i().setAccountActionRunning(!0);
        try {
          const v = await a.accountLogout();
          if (!v.ok) throw new Error(v.error || "Logout failed");
          i().setAccount(v.account || await a.accountStatus()), i().setDeviceLogin(null), await m(), i().showToast("Codex account logged out", "success");
        } finally {
          i().setAccountActionRunning(!1);
        }
      }
    };
  }, [a]);
}
var V1 = Rx();
const X1 = /* @__PURE__ */ Ex(V1), Qs = 0, ai = 1, Ol = 2, eb = 4;
function Ug(a) {
  return () => a;
}
function K1(a) {
  a();
}
function nb(a, i) {
  return (o) => a(i(o));
}
function Lg(a, i) {
  return () => a(i);
}
function Z1(a, i) {
  return (o) => a(i, o);
}
function Xd(a) {
  return a !== void 0;
}
function I1(...a) {
  return () => {
    a.map(K1);
  };
}
function Bl() {
}
function Ys(a, i) {
  return i(a), a;
}
function $1(a, i) {
  return i(a);
}
function he(...a) {
  return a;
}
function Pt(a, i) {
  return a(ai, i);
}
function Dt(a, i) {
  a(Qs, i);
}
function Kd(a) {
  a(Ol);
}
function xe(a) {
  return a(eb);
}
function xt(a, i) {
  return Pt(a, Z1(i, Qs));
}
function Bn(a, i) {
  const o = a(ai, (r) => {
    o(), i(r);
  });
  return o;
}
function Gg(a) {
  let i, o;
  return (r) => (c) => {
    i = c, o && clearTimeout(o), o = setTimeout(() => {
      r(i);
    }, a);
  };
}
function ab(a, i) {
  return a === i;
}
function fe(a = ab) {
  let i;
  return (o) => (r) => {
    a(i, r) || (i = r, o(r));
  };
}
function _t(a) {
  return (i) => (o) => {
    a(o) && i(o);
  };
}
function dt(a) {
  return (i) => nb(i, a);
}
function Kn(a) {
  return (i) => () => {
    i(a);
  };
}
function nt(a, ...i) {
  const o = F1(...i);
  return ((r, c) => {
    switch (r) {
      case Ol:
        Kd(a);
        return;
      case ai:
        return Pt(a, o(c));
    }
  });
}
function Zn(a, i) {
  return (o) => (r) => {
    o(i = a(i, r));
  };
}
function Oi(a) {
  return (i) => (o) => {
    a > 0 ? a-- : i(o);
  };
}
function ga(a) {
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
    Pt(f, (g) => {
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
function F1(...a) {
  return (i) => a.reduceRight($1, i);
}
function J1(a) {
  let i, o;
  const r = () => i == null ? void 0 : i();
  return function(c, f) {
    switch (c) {
      case ai:
        return f ? o === f ? void 0 : (r(), o = f, i = Pt(a, f), i) : (r(), Bl);
      case Ol:
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
      case Qs:
        i = c;
        break;
      case ai: {
        c(i);
        break;
      }
      case eb:
        return i;
    }
    return o(r, c);
  });
}
function Xe(a, i) {
  return Ys(lt(i), (o) => xt(a, o));
}
function Yt() {
  const a = [];
  return ((i, o) => {
    switch (i) {
      case Qs:
        a.slice().forEach((r) => {
          r(o);
        });
        return;
      case Ol:
        a.splice(0, a.length);
        return;
      case ai:
        return a.push(o), () => {
          const r = a.indexOf(o);
          r > -1 && a.splice(r, 1);
        };
    }
  });
}
function mn(a) {
  return Ys(Yt(), (i) => xt(a, i));
}
function $t(a, i = [], { singleton: o } = { singleton: !0 }) {
  return {
    constructor: a,
    dependencies: i,
    id: W1(),
    singleton: o
  };
}
const W1 = () => Symbol();
function P1(a) {
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
    Pt(f, (g) => {
      o[m] = g, r |= p, r === c && Dt(i, o);
    });
  }), function(f, m) {
    switch (f) {
      case Ol: {
        Kd(i);
        return;
      }
      case ai:
        return r === c && m(o), Pt(i, m);
    }
  };
}
function Tt(a, i = ab) {
  return nt(a, fe(i));
}
function jd(...a) {
  return function(i, o) {
    switch (i) {
      case Ol:
        return;
      case ai:
        return I1(...a.map((r) => Pt(r, o)));
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
}, tw = {
  [Me.DEBUG]: "debug",
  [Me.ERROR]: "error",
  [Me.INFO]: "log",
  [Me.WARN]: "warn"
}, ew = () => typeof globalThis > "u" ? window : globalThis, ii = $t(
  () => {
    const a = lt(Me.ERROR);
    return {
      log: lt((i, o, r = Me.INFO) => {
        const c = ew().VIRTUOSO_LOG_LEVEL ?? xe(a);
        r >= c && console[tw[r]](
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
), zd = /* @__PURE__ */ new WeakMap();
function ib(a) {
  return "self" in a ? a.document.documentElement : a;
}
function nw(a) {
  const i = ib(a), o = zd.get(i);
  if (o !== void 0)
    return o;
  const r = i.ownerDocument.defaultView.getComputedStyle(i).direction === "rtl";
  return zd.set(i, r), r;
}
function Qg(a) {
  zd.delete(ib(a));
}
function lb(a, i) {
  return nw(a) ? -i : i;
}
const ji = lb;
function Yg(a, i) {
  return lb(a, i);
}
function Bi(a, i, o) {
  return Zd(a, i, o).callbackRef;
}
function Zd(a, i, o) {
  const r = ct.useRef(null);
  let c = (m) => {
  };
  const f = ct.useMemo(() => typeof ResizeObserver < "u" ? new ResizeObserver((m) => {
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
function aw(a, i, o, r, c, f, m, p, g) {
  const x = ct.useCallback(
    (w) => {
      const y = iw(w.children, i, p ? "offsetWidth" : "offsetHeight", c);
      let C = w.parentElement;
      for (; C.dataset.virtuosoScroller === void 0; )
        C = C.parentElement;
      const E = C.lastElementChild.dataset.viewportType === "window";
      let B;
      E && (B = C.ownerDocument.defaultView);
      const M = m ? p ? m.scrollWidth : m.scrollHeight : E ? p ? B.document.documentElement.scrollWidth : B.document.documentElement.scrollHeight : p ? C.scrollWidth : C.scrollHeight, z = m ? p ? m.offsetWidth : m.offsetHeight : E ? p ? B.innerWidth : B.innerHeight : p ? C.offsetWidth : C.offsetHeight, A = m ? p ? ji(m, m.scrollLeft) : m.scrollTop : E ? p ? ji(B, B.scrollX || B.document.documentElement.scrollLeft) : B.scrollY || B.document.documentElement.scrollTop : p ? ji(C, C.scrollLeft) : C.scrollTop;
      r({
        scrollHeight: M,
        scrollTop: Math.max(A, 0),
        viewportHeight: z
      }), f == null || f(
        p ? Vg("column-gap", getComputedStyle(w).columnGap, c) : Vg("row-gap", getComputedStyle(w).rowGap, c)
      ), y !== null && a(y);
    },
    [a, i, c, f, m, r, p]
  );
  return Zd(x, o, g);
}
function iw(a, i, o, r) {
  const c = a.length;
  if (c === 0)
    return null;
  const f = [];
  for (let m = 0; m < c; m++) {
    const p = a.item(m);
    if (p.dataset.index === void 0)
      continue;
    const g = parseInt(p.dataset.index), x = parseFloat(p.dataset.knownSize), w = i(p, o);
    if (w === 0 && r("Zero-sized element, this should not happen", { child: p }, Me.ERROR), w === x)
      continue;
    const y = f[f.length - 1];
    f.length === 0 || y.size !== w || y.endIndex !== g - 1 ? f.push({ endIndex: g, size: w, startIndex: g }) : f[f.length - 1].endIndex++;
  }
  return f;
}
function Vg(a, i, o) {
  return i !== "normal" && (i == null ? void 0 : i.endsWith("px")) !== !0 && o(`${a} was not resolved to pixel value correctly`, i, Me.WARN), i === "normal" ? 0 : parseInt(i ?? "0", 10);
}
function ob(a, i, o) {
  const r = ct.useRef(null), c = ct.useCallback(
    (g) => {
      if (!(g != null && g.offsetParent))
        return;
      const x = g.getBoundingClientRect(), w = x.width;
      let y, C;
      if (i) {
        const E = i.getBoundingClientRect(), B = x.top - E.top;
        C = E.height - Math.max(0, B), y = B + i.scrollTop;
      } else {
        const E = m.current.ownerDocument.defaultView;
        C = E.innerHeight - Math.max(0, x.top), y = x.top + E.scrollY;
      }
      r.current = {
        listHeight: x.height,
        offsetTop: y,
        visibleHeight: C,
        visibleWidth: w
      }, a(r.current);
    },
    // oxlint-disable-next-line exhaustive-deps
    [a, i]
  ), { callbackRef: f, ref: m } = Zd(c, !0, o), p = ct.useCallback(() => {
    c(m.current);
  }, [c, m]);
  return ct.useEffect(() => {
    var x;
    if (i) {
      i.addEventListener("scroll", p);
      const w = new ResizeObserver(() => {
        requestAnimationFrame(p);
      });
      return w.observe(i), () => {
        i.removeEventListener("scroll", p), w.unobserve(i);
      };
    }
    const g = (x = m.current) == null ? void 0 : x.ownerDocument.defaultView;
    return g == null || g.addEventListener("scroll", p), g == null || g.addEventListener("resize", p), () => {
      g == null || g.removeEventListener("scroll", p), g == null || g.removeEventListener("resize", p);
    };
  }, [p, i, m]), f;
}
const Ie = $t(
  () => {
    const a = Yt(), i = Yt(), o = lt(0), r = Yt(), c = lt(0), f = Yt(), m = Yt(), p = lt(0), g = lt(0), x = lt(0), w = lt(0), y = Yt(), C = Yt(), E = lt(!1), B = lt(!1), M = lt(!1);
    return xt(
      nt(
        a,
        dt(({ scrollTop: z }) => z)
      ),
      i
    ), xt(
      nt(
        a,
        dt(({ scrollHeight: z }) => z)
      ),
      m
    ), xt(i, c), {
      deviation: o,
      fixedFooterHeight: x,
      fixedHeaderHeight: g,
      footerHeight: w,
      headerHeight: p,
      horizontalDirection: B,
      scrollBy: C,
      // input
      scrollContainerState: a,
      scrollHeight: m,
      scrollingInProgress: E,
      // signals
      scrollTo: y,
      scrollTop: i,
      skipAnimationFrameInResizeObserver: M,
      smoothScrollTargetReached: r,
      // state
      statefulScrollTop: c,
      viewportHeight: f
    };
  },
  [],
  { singleton: !0 }
), Vo = { lvl: 0 };
function rb(a, i) {
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
  return a === Vo;
}
function Xo(a, i) {
  if (!oe(a))
    return i === a.k ? a.v : i < a.k ? Xo(a.l, i) : Xo(a.r, i);
}
function kn(a, i, o = "k") {
  if (oe(a))
    return [-1 / 0, void 0];
  if (Number(a[o]) === i)
    return [a.k, a.v];
  if (Number(a[o]) < i) {
    const r = kn(a.r, i, o);
    return r[0] === -1 / 0 ? [a.k, a.v] : r;
  }
  return kn(a.l, i, o);
}
function hn(a, i, o) {
  return oe(a) ? cb(i, o, 1) : i === a.k ? Ne(a, { k: i, v: o }) : i < a.k ? Xg(Ne(a, { l: hn(a.l, i, o) })) : Xg(Ne(a, { r: hn(a.r, i, o) }));
}
function Sl() {
  return Vo;
}
function Cl(a, i, o) {
  if (oe(a))
    return [];
  const r = kn(a, i)[0];
  return lw(Ed(a, r, o));
}
function Ad(a, i) {
  if (oe(a))
    return Vo;
  const { k: o, l: r, r: c } = a;
  if (i === o) {
    if (oe(r))
      return c;
    if (oe(c))
      return r;
    const [f, m] = ub(r);
    return Ns(Ne(a, { k: f, l: sb(r), v: m }));
  }
  return i < o ? Ns(Ne(a, { l: Ad(r, i) })) : Ns(Ne(a, { r: Ad(c, i) }));
}
function zi(a) {
  return oe(a) ? [] : [...zi(a.l), { k: a.k, v: a.v }, ...zi(a.r)];
}
function Ed(a, i, o) {
  if (oe(a))
    return [];
  const { k: r, l: c, r: f, v: m } = a;
  let p = [];
  return r > i && (p = p.concat(Ed(c, i, o))), r >= i && r <= o && p.push({ k: r, v: m }), r <= o && (p = p.concat(Ed(f, i, o))), p;
}
function Ns(a) {
  const { l: i, lvl: o, r } = a;
  if (r.lvl >= o - 1 && i.lvl >= o - 1)
    return a;
  if (o > r.lvl + 1) {
    if (fd(i))
      return db(Ne(a, { lvl: o - 1 }));
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
  if (fd(a))
    return Rd(Ne(a, { lvl: o - 1 }));
  if (!oe(r) && !oe(r.l)) {
    const c = r.l, f = fd(c) ? r.lvl - 1 : r.lvl;
    return Ne(c, {
      l: Ne(a, {
        lvl: o - 1,
        r: c.l
      }),
      lvl: c.lvl + 1,
      r: Rd(Ne(r, { l: c.r, lvl: f }))
    });
  }
  throw new Error("Unexpected empty nodes");
}
function Ne(a, i) {
  return cb(
    i.k !== void 0 ? i.k : a.k,
    i.v !== void 0 ? i.v : a.v,
    i.lvl !== void 0 ? i.lvl : a.lvl,
    i.l !== void 0 ? i.l : a.l,
    i.r !== void 0 ? i.r : a.r
  );
}
function sb(a) {
  return oe(a.r) ? a.l : Ns(Ne(a, { r: sb(a.r) }));
}
function fd(a) {
  return oe(a) || a.lvl > a.r.lvl;
}
function ub(a) {
  return oe(a.r) ? [a.k, a.v] : ub(a.r);
}
function cb(a, i, o, r = Vo, c = Vo) {
  return { k: a, l: r, lvl: o, r: c, v: i };
}
function Xg(a) {
  return Rd(db(a));
}
function db(a) {
  const { l: i } = a;
  return !oe(i) && i.lvl === a.lvl ? Ne(i, { r: Ne(a, { l: i.r }) }) : a;
}
function Rd(a) {
  const { lvl: i, r: o } = a;
  return !oe(o) && !oe(o.r) && o.lvl === i && o.r.lvl === i ? Ne(o, { l: Ne(a, { r: o.l }), lvl: i + 1 }) : a;
}
function lw(a) {
  return rb(a, ({ k: i, v: o }) => ({ index: i, value: o }));
}
function fb(a, i) {
  return !!(a && a.startIndex === i.startIndex && a.endIndex === i.endIndex);
}
function Ko(a, i) {
  return !!(a && a[0] === i[0] && a[1] === i[1]);
}
const Id = $t(
  () => ({ recalcInProgress: lt(!1) }),
  [],
  { singleton: !0 }
);
function hb(a, i, o) {
  return a[qs(a, i, o)];
}
function qs(a, i, o, r = 0) {
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
function ow(a, i, o, r) {
  const c = qs(a, i, r), f = qs(a, o, r, c);
  return a.slice(c, f + 1);
}
function ni(a, i) {
  return Math.round(a.getBoundingClientRect()[i]);
}
function Vs(a) {
  return !oe(a.groupOffsetTree);
}
function $d({ index: a }, i) {
  return i === a ? 0 : i < a ? -1 : 1;
}
function rw() {
  return {
    groupIndices: [],
    groupOffsetTree: Sl(),
    lastIndex: 0,
    lastOffset: 0,
    lastSize: 0,
    offsetTree: [],
    sizeTree: Sl()
  };
}
function sw(a, i) {
  let o = oe(a) ? 0 : 1 / 0;
  for (const r of i) {
    const { endIndex: c, size: f, startIndex: m } = r;
    if (o = Math.min(o, m), oe(a)) {
      a = hn(a, 0, f);
      continue;
    }
    const p = Cl(a, m - 1, c + 1);
    if (p.some(pw(r)))
      continue;
    let g = !1, x = !1;
    for (const { end: w, start: y, value: C } of p)
      g ? (c >= y || f === C) && (a = Ad(a, y)) : (x = C !== f, g = !0), w > c && c >= y && C !== f && (a = hn(a, c + 1, C));
    x && (a = hn(a, m, f));
  }
  return [a, o];
}
function uw(a) {
  return typeof a.groupIndex < "u";
}
function cw({ offset: a }, i) {
  return i === a ? 0 : i < a ? -1 : 1;
}
function Zo(a, i, o) {
  if (i.length === 0)
    return 0;
  const { index: r, offset: c, size: f } = hb(i, a, $d), m = a - r, p = f * m + (m - 1) * o + c;
  return p > 0 ? p + o : p;
}
function mb(a, i) {
  if (!Vs(i))
    return a;
  let o = 0;
  for (; i.groupIndices[o] <= a + o; )
    o++;
  return a + o;
}
function pb(a, i, o) {
  if (uw(a))
    return i.groupIndices[a.groupIndex] + 1;
  const r = a.index === "LAST" ? o : a.index;
  let c = mb(r, i);
  return c = Math.max(0, c, Math.min(o, c)), c;
}
function dw(a, i, o, r = 0) {
  return r > 0 && (i = Math.max(i, hb(a, r, $d).offset)), rb(ow(a, i, o, cw), mw);
}
function fw(a, [i, o, r, c]) {
  i.length > 0 && r("received item sizes", i, Me.DEBUG);
  const f = a.sizeTree;
  let m = f, p = 0;
  if (o.length > 0 && oe(f) && i.length === 2) {
    const C = i[0].size, E = i[1].size;
    m = o.reduce((B, M) => hn(hn(B, M, C), M + 1, E), m);
  } else
    [m, p] = sw(m, i);
  if (m === f)
    return a;
  const { lastIndex: g, lastOffset: x, lastSize: w, offsetTree: y } = Nd(a.offsetTree, p, m, c);
  return {
    groupIndices: o,
    groupOffsetTree: o.reduce((C, E) => hn(C, E, Zo(E, y, c)), Sl()),
    lastIndex: g,
    lastOffset: x,
    lastSize: w,
    offsetTree: y,
    sizeTree: m
  };
}
function hw(a) {
  return zi(a).map(({ k: i, v: o }, r, c) => {
    const f = c[r + 1];
    return { endIndex: f !== void 0 ? f.k - 1 : 1 / 0, size: o, startIndex: i };
  });
}
function Kg(a, i) {
  let o = 0, r = 0;
  for (; o < a; )
    o += i[r + 1] - i[r] - 1, r++;
  return r - (o === a ? 0 : 1);
}
function Nd(a, i, o, r) {
  let c = a, f = 0, m = 0, p = 0, g = 0;
  if (i !== 0) {
    g = qs(c, i - 1, $d), p = c[g].offset;
    const x = kn(o, i - 1);
    f = x[0], m = x[1], c.length && c[g].size === kn(o, i)[1] && (g -= 1), c = c.slice(0, g + 1);
  } else
    c = [];
  for (const { start: x, value: w } of Cl(o, i, 1 / 0)) {
    const y = x - f, C = y * m + p + y * r;
    c.push({
      index: x,
      offset: C,
      size: w
    }), f = x, p = C, m = w;
  }
  return {
    lastIndex: f,
    lastOffset: p,
    lastSize: m,
    offsetTree: c
  };
}
function mw(a) {
  return { index: a.index, value: a };
}
function pw(a) {
  const { endIndex: i, size: o, startIndex: r } = a;
  return (c) => c.start === r && (c.end === i || c.end === 1 / 0) && c.value === o;
}
const gw = {
  offsetHeight: "height",
  offsetWidth: "width"
}, In = $t(
  ([{ log: a }, { recalcInProgress: i }]) => {
    const o = Yt(), r = Yt(), c = Xe(r, 0), f = Yt(), m = Yt(), p = lt(0), g = lt([]), x = lt(void 0), w = lt(void 0), y = lt(void 0), C = lt(void 0), E = lt((S, D) => ni(S, gw[D])), B = lt(void 0), M = lt(0), z = rw(), A = Xe(
      nt(o, Ot(g, a, M), Zn(fw, z), fe()),
      z
    ), O = Xe(
      nt(
        g,
        fe(),
        Zn((S, D) => ({ current: D, prev: S.current }), {
          current: [],
          prev: []
        }),
        dt(({ prev: S }) => S)
      ),
      []
    );
    xt(
      nt(
        g,
        _t((S) => S.length > 0),
        Ot(A, M),
        dt(([S, D, Y]) => {
          const F = S.reduce((et, st, ut) => hn(et, st, Zo(st, D.offsetTree, Y) || ut), Sl());
          return {
            ...D,
            groupIndices: S,
            groupOffsetTree: F
          };
        })
      ),
      A
    ), xt(
      nt(
        r,
        Ot(A),
        _t(([S, { lastIndex: D }]) => S < D),
        dt(([S, { lastIndex: D, lastSize: Y }]) => [
          {
            endIndex: D,
            size: Y,
            startIndex: S
          }
        ])
      ),
      o
    ), xt(x, w);
    const k = Xe(
      nt(
        x,
        dt((S) => S === void 0)
      ),
      !0
    );
    xt(
      nt(
        w,
        _t((S) => S !== void 0 && oe(xe(A).sizeTree)),
        dt((S) => {
          const D = xe(y), Y = xe(g).length > 0;
          return D !== void 0 && D !== 0 ? Y ? [
            { endIndex: 0, size: D, startIndex: 0 },
            { endIndex: 1, size: S, startIndex: 1 }
          ] : [] : [{ endIndex: 0, size: S, startIndex: 0 }];
        })
      ),
      o
    ), xt(
      nt(
        C,
        _t((S) => S !== void 0 && S.length > 0 && oe(xe(A).sizeTree)),
        dt((S) => {
          const D = [];
          let Y = S[0], F = 0;
          for (let et = 1; et < S.length; et++) {
            const st = S[et];
            st !== Y && (D.push({
              endIndex: et - 1,
              size: Y,
              startIndex: F
            }), Y = st, F = et);
          }
          return D.push({
            endIndex: S.length - 1,
            size: Y,
            startIndex: F
          }), D;
        })
      ),
      o
    ), xt(
      nt(
        g,
        Ot(y, w),
        _t(([, S, D]) => S !== void 0 && D !== void 0),
        dt(([S, D, Y]) => {
          const F = [];
          for (let et = 0; et < S.length; et++) {
            const st = S[et], ut = S[et + 1];
            F.push({
              startIndex: st,
              endIndex: st,
              size: D
            }), ut !== void 0 && F.push({
              startIndex: st + 1,
              endIndex: ut - 1,
              size: Y
            });
          }
          return F;
        })
      ),
      o
    );
    const v = mn(
      nt(
        o,
        Ot(A),
        Zn(
          ({ sizes: S }, [D, Y]) => ({
            changed: Y !== S,
            sizes: Y
          }),
          { changed: !1, sizes: z }
        ),
        dt((S) => S.changed)
      )
    );
    Pt(
      nt(
        p,
        Zn(
          (S, D) => ({ diff: S.prev - D, prev: D }),
          { diff: 0, prev: 0 }
        ),
        dt((S) => S.diff)
      ),
      (S) => {
        const { groupIndices: D } = xe(A);
        if (S > 0)
          Dt(i, !0), Dt(f, S + Kg(S, D));
        else if (S < 0) {
          const Y = xe(O);
          Y.length > 0 && (S -= Kg(-S, Y)), Dt(m, S);
        }
      }
    ), Pt(nt(p, Ot(a)), ([S, D]) => {
      S < 0 && D(
        "`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value",
        { firstItemIndex: p },
        Me.ERROR
      );
    });
    const T = mn(f);
    xt(
      nt(
        f,
        Ot(A),
        dt(([S, D]) => {
          const Y = D.groupIndices.length > 0, F = [], et = D.lastSize;
          if (Y) {
            const st = Xo(D.sizeTree, 0);
            let ut = 0, ot = 0;
            for (; ut < S; ) {
              const q = D.groupIndices[ot], W = D.groupIndices.length === ot + 1 ? 1 / 0 : D.groupIndices[ot + 1] - q - 1;
              F.push({
                endIndex: q,
                size: st,
                startIndex: q
              }), F.push({
                endIndex: q + 1 + W - 1,
                size: et,
                startIndex: q + 1
              }), ot++, ut += W + 1;
            }
            const vt = zi(D.sizeTree);
            return ut !== S && vt.shift(), vt.reduce(
              (q, { k: W, v: $ }) => {
                let ht = q.ranges;
                return q.prevSize !== 0 && (ht = [
                  ...q.ranges,
                  {
                    endIndex: W + S - 1,
                    size: q.prevSize,
                    startIndex: q.prevIndex
                  }
                ]), {
                  prevIndex: W + S,
                  prevSize: $,
                  ranges: ht
                };
              },
              {
                prevIndex: S,
                prevSize: 0,
                ranges: F
              }
            ).ranges;
          }
          return zi(D.sizeTree).reduce(
            (st, { k: ut, v: ot }) => ({
              prevIndex: ut + S,
              prevSize: ot,
              ranges: [...st.ranges, { endIndex: ut + S - 1, size: st.prevSize, startIndex: st.prevIndex }]
            }),
            {
              prevIndex: 0,
              prevSize: et,
              ranges: []
            }
          ).ranges;
        })
      ),
      o
    );
    const N = mn(
      nt(
        m,
        Ot(A, M),
        dt(([S, { offsetTree: D }, Y]) => {
          const F = -S;
          return Zo(F, D, Y);
        })
      )
    );
    return xt(
      nt(
        m,
        Ot(A, M),
        dt(([S, D, Y]) => {
          if (D.groupIndices.length > 0) {
            if (oe(D.sizeTree))
              return D;
            let et = Sl();
            const st = xe(O);
            let ut = 0, ot = 0, vt = 0;
            for (; ut < -S; ) {
              vt = st[ot];
              const q = st[ot + 1] - vt - 1;
              ot++, ut += q + 1;
            }
            if (et = zi(D.sizeTree).reduce((q, { k: W, v: $ }) => hn(q, Math.max(0, W + S), $), et), ut !== -S) {
              const q = Xo(D.sizeTree, vt);
              et = hn(et, 0, q);
              const W = kn(D.sizeTree, -S + 1)[1];
              et = hn(et, 1, W);
            }
            return {
              ...D,
              sizeTree: et,
              ...Nd(D.offsetTree, 0, et, Y)
            };
          }
          const F = zi(D.sizeTree).reduce((et, { k: st, v: ut }) => hn(et, Math.max(0, st + S), ut), Sl());
          return {
            ...D,
            sizeTree: F,
            ...Nd(D.offsetTree, 0, F, Y)
          };
        })
      ),
      A
    ), {
      beforeUnshiftWith: T,
      // input
      data: B,
      defaultItemSize: w,
      firstItemIndex: p,
      fixedItemSize: x,
      fixedGroupSize: y,
      gap: M,
      groupIndices: g,
      heightEstimates: C,
      itemSize: E,
      listRefresh: v,
      shiftWith: m,
      shiftWithOffset: N,
      sizeRanges: o,
      // output
      sizes: A,
      statefulTotalCount: c,
      totalCount: r,
      trackItemSizes: k,
      unshiftWith: f
    };
  },
  he(ii, Id),
  { singleton: !0 }
);
function xw(a) {
  return a.reduce(
    (i, o) => (i.groupIndices.push(i.totalCount), i.totalCount += o + 1, i),
    {
      groupIndices: [],
      totalCount: 0
    }
  );
}
const gb = $t(
  ([{ groupIndices: a, sizes: i, totalCount: o }, { headerHeight: r, scrollTop: c }]) => {
    const f = Yt(), m = Yt(), p = mn(nt(f, dt(xw)));
    return xt(
      nt(
        p,
        dt((g) => g.totalCount)
      ),
      o
    ), xt(
      nt(
        p,
        dt((g) => g.groupIndices)
      ),
      a
    ), xt(
      nt(
        Ae(c, i, r),
        _t(([g, x]) => Vs(x)),
        dt(([g, x, w]) => kn(x.groupOffsetTree, Math.max(g - w, 0), "v")[0]),
        fe(),
        dt((g) => [g])
      ),
      m
    ), { groupCounts: f, topItemsIndexes: m };
  },
  he(In, Ie)
), li = $t(
  ([{ log: a }]) => {
    const i = lt(!1), o = mn(
      nt(
        i,
        _t((r) => r),
        fe()
      )
    );
    return Pt(i, (r) => {
      r && xe(a)("props updated", {}, Me.DEBUG);
    }), { didMount: o, propsReady: i };
  },
  he(ii),
  { singleton: !0 }
), bw = typeof document < "u" && "scrollBehavior" in document.documentElement.style;
function xb(a) {
  const i = typeof a == "number" ? { index: a } : a;
  return i.align || (i.align = "start"), (!i.behavior || !bw) && (i.behavior = "auto"), i.offset === void 0 && (i.offset = 0), i;
}
const ar = $t(
  ([
    { gap: a, listRefresh: i, sizes: o, totalCount: r },
    {
      fixedFooterHeight: c,
      fixedHeaderHeight: f,
      footerHeight: m,
      headerHeight: p,
      scrollingInProgress: g,
      scrollTo: x,
      smoothScrollTargetReached: w,
      viewportHeight: y
    },
    { log: C }
  ]) => {
    const E = Yt(), B = Yt(), M = lt(0);
    let z = null, A = null, O = null;
    function k() {
      z !== null && (z(), z = null), O !== null && (O(), O = null), A && (clearTimeout(A), A = null), Dt(g, !1);
    }
    return xt(
      nt(
        E,
        Ot(o, y, r, M, p, m, C),
        Ot(a, f, c),
        dt(
          ([
            [v, T, N, S, D, Y, F, et],
            st,
            ut,
            ot
          ]) => {
            const vt = xb(v), { align: q, behavior: W, offset: $ } = vt, ht = S - 1, rt = pb(vt, T, ht);
            let _ = Zo(rt, T.offsetTree, st) + Y;
            q === "end" ? (_ += ut + kn(T.sizeTree, rt)[1] - N + ot, rt === ht && (_ += F)) : q === "center" ? _ += (ut + kn(T.sizeTree, rt)[1] - N + ot) / 2 : _ -= D, $ !== void 0 && $ !== 0 && (_ += $);
            const Q = (X) => {
              k(), X ? (et("retrying to scroll to", { location: v }, Me.DEBUG), Dt(E, v)) : (Dt(B, !0), et("list did not change, scroll successful", {}, Me.DEBUG));
            };
            if (k(), W === "smooth") {
              let X = !1;
              O = Pt(i, (it) => {
                X = X || it;
              }), z = Bn(w, () => {
                Q(X);
              });
            } else
              z = Bn(nt(i, vw(150)), Q);
            return A = setTimeout(() => {
              k();
            }, 1200), Dt(g, !0), et("scrolling from index to", { behavior: W, index: rt, top: _ }, Me.DEBUG), { behavior: W, top: _ };
          }
        )
      ),
      x
    ), {
      scrollTargetReached: B,
      scrollToIndex: E,
      topListHeight: M
    };
  },
  he(In, Ie, ii),
  { singleton: !0 }
);
function vw(a) {
  return (i) => {
    const o = setTimeout(() => {
      i(!1);
    }, a);
    return (r) => {
      r && (i(!0), clearTimeout(o));
    };
  };
}
function Fd(a, i) {
  a === 0 ? i() : requestAnimationFrame(() => {
    Fd(a - 1, i);
  });
}
function Jd(a, i) {
  const o = i - 1;
  return typeof a == "number" ? a : a.index === "LAST" ? o : a.index;
}
const ir = $t(
  ([{ defaultItemSize: a, listRefresh: i, sizes: o }, { scrollTop: r }, { scrollTargetReached: c, scrollToIndex: f }, { didMount: m }]) => {
    const p = lt(!0), g = lt(0), x = lt(!0);
    return xt(
      nt(
        m,
        Ot(g),
        _t(([w, y]) => y !== 0),
        Kn(!1)
      ),
      p
    ), xt(
      nt(
        m,
        Ot(g),
        _t(([w, y]) => y !== 0),
        Kn(!1)
      ),
      x
    ), Pt(
      nt(
        Ae(i, m),
        Ot(p, o, a, x),
        _t(([[, w], y, { sizeTree: C }, E, B]) => w && (!oe(C) || Xd(E)) && !y && !B),
        Ot(g)
      ),
      ([, w]) => {
        Bn(c, () => {
          Dt(x, !0);
        }), Fd(4, () => {
          Bn(r, () => {
            Dt(p, !0);
          }), Dt(f, w);
        });
      }
    ), {
      initialItemFinalLocationReached: x,
      initialTopMostItemIndex: g,
      scrolledToInitialItem: p
    };
  },
  he(In, Ie, ar, li),
  { singleton: !0 }
);
function bb(a, i) {
  return Math.abs(a - i) < 1.01;
}
const Io = "up", Bo = "down", yw = "none", ww = {
  atBottom: !1,
  notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
  state: {
    offsetBottom: 0,
    scrollHeight: 0,
    scrollTop: 0,
    viewportHeight: 0
  }
}, Sw = 0, lr = $t(([{ footerHeight: a, headerHeight: i, scrollBy: o, scrollContainerState: r, scrollTop: c, viewportHeight: f }]) => {
  const m = lt(!1), p = lt(!0), g = Yt(), x = Yt(), w = lt(4), y = lt(Sw), C = Xe(
    nt(
      jd(nt(Tt(c), Oi(1), Kn(!0)), nt(Tt(c), Oi(1), Kn(!1), Gg(100))),
      fe()
    ),
    !1
  ), E = Xe(
    nt(jd(nt(o, Kn(!0)), nt(o, Kn(!1), Gg(200))), fe()),
    !1
  );
  xt(
    nt(
      Ae(Tt(c), Tt(y)),
      dt(([O, k]) => O <= k),
      fe()
    ),
    p
  ), xt(nt(p, ga(50)), x);
  const B = mn(
    nt(
      Ae(r, Tt(f), Tt(i), Tt(a), Tt(w)),
      Zn((O, [{ scrollHeight: k, scrollTop: v }, T, N, S, D]) => {
        const Y = v + T - k > -D, F = {
          scrollHeight: k,
          scrollTop: v,
          viewportHeight: T
        };
        if (Y) {
          let st, ut;
          return v > O.state.scrollTop ? (st = "SCROLLED_DOWN", ut = O.state.scrollTop - v) : (st = "SIZE_DECREASED", ut = O.state.scrollTop - v || O.scrollTopDelta), {
            atBottom: !0,
            atBottomBecause: st,
            scrollTopDelta: ut,
            state: F
          };
        }
        let et;
        return F.scrollHeight > O.state.scrollHeight ? et = "SIZE_INCREASED" : T < O.state.viewportHeight ? et = "VIEWPORT_HEIGHT_DECREASING" : v < O.state.scrollTop ? et = "SCROLLING_UPWARDS" : et = "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM", {
          atBottom: !1,
          notAtBottomBecause: et,
          state: F
        };
      }, ww),
      fe((O, k) => O !== void 0 && O.atBottom === k.atBottom)
    )
  ), M = Xe(
    nt(
      r,
      Zn(
        (O, { scrollHeight: k, scrollTop: v, viewportHeight: T }) => {
          if (!bb(O.scrollHeight, k)) {
            const N = k - (v + T) < 1;
            return O.scrollTop !== v && N ? {
              changed: !0,
              jump: O.scrollTop - v,
              scrollHeight: k,
              scrollTop: v
            } : {
              changed: !0,
              jump: 0,
              scrollHeight: k,
              scrollTop: v
            };
          }
          return {
            changed: !1,
            jump: 0,
            scrollHeight: k,
            scrollTop: v
          };
        },
        { changed: !1, jump: 0, scrollHeight: 0, scrollTop: 0 }
      ),
      _t((O) => O.changed),
      dt((O) => O.jump)
    ),
    0
  );
  xt(
    nt(
      B,
      dt((O) => O.atBottom)
    ),
    m
  ), xt(nt(m, ga(50)), g);
  const z = lt(Bo);
  xt(
    nt(
      r,
      dt(({ scrollTop: O }) => O),
      fe(),
      Zn(
        (O, k) => xe(E) ? { direction: O.direction, prevScrollTop: k } : { direction: k < O.prevScrollTop ? Io : Bo, prevScrollTop: k },
        { direction: Bo, prevScrollTop: 0 }
      ),
      dt((O) => O.direction)
    ),
    z
  ), xt(nt(r, ga(50), Kn(yw)), z);
  const A = lt(0);
  return xt(
    nt(
      C,
      _t((O) => !O),
      Kn(0)
    ),
    A
  ), xt(
    nt(
      c,
      ga(100),
      Ot(C),
      _t(([O, k]) => k),
      Zn(([O, k], [v]) => [k, v], [0, 0]),
      dt(([O, k]) => k - O)
    ),
    A
  ), {
    atBottomState: B,
    atBottomStateChange: g,
    atBottomThreshold: w,
    atTopStateChange: x,
    atTopThreshold: y,
    isAtBottom: m,
    isAtTop: p,
    isScrolling: C,
    lastJumpDueToItemResize: M,
    scrollDirection: z,
    scrollVelocity: A
  };
}, he(Ie)), $o = "top", Fo = "bottom", Zg = "none";
function Ig(a, i, o) {
  return typeof a == "number" ? o === Io && i === $o || o === Bo && i === Fo ? a : 0 : o === Io ? i === $o ? a.main : a.reverse : i === Fo ? a.main : a.reverse;
}
function $g(a, i) {
  return typeof a == "number" ? a : a[i] ?? 0;
}
const Wd = $t(
  ([{ deviation: a, fixedHeaderHeight: i, headerHeight: o, scrollTop: r, viewportHeight: c }]) => {
    const f = Yt(), m = lt(0), p = lt(0), g = lt(0), x = Xe(
      nt(
        Ae(
          Tt(r),
          Tt(c),
          Tt(o),
          Tt(f, Ko),
          Tt(g),
          Tt(m),
          Tt(i),
          Tt(a),
          Tt(p)
        ),
        dt(
          ([
            w,
            y,
            C,
            [E, B],
            M,
            z,
            A,
            O,
            k
          ]) => {
            const v = w - O, T = z + A, N = Math.max(C - v, 0);
            let S = Zg;
            const D = $g(k, $o), Y = $g(k, Fo);
            return E -= O, E += C + A, B += C + A, B -= O, E > w + T - D && (S = Io), B < w - N + y + Y && (S = Bo), S !== Zg ? [
              Math.max(v - C - Ig(M, $o, S) - D, 0),
              v - N - A + y + Ig(M, Fo, S) + Y
            ] : null;
          }
        ),
        _t((w) => w !== null),
        fe(Ko)
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
  he(Ie),
  { singleton: !0 }
);
function Cw(a, i, o) {
  if (Vs(i)) {
    const r = mb(a, i);
    return [
      { index: kn(i.groupOffsetTree, r)[0], offset: 0, size: 0 },
      { data: o == null ? void 0 : o[0], index: r, offset: 0, size: 0 }
    ];
  }
  return [{ data: o == null ? void 0 : o[0], index: a, offset: 0, size: 0 }];
}
const hd = {
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
function Ms(a, i, o, r, c, f) {
  const { lastIndex: m, lastOffset: p, lastSize: g } = c;
  let x = 0, w = 0;
  if (a.length > 0) {
    x = a[0].offset;
    const M = a[a.length - 1];
    w = M.offset + M.size;
  }
  const y = o - m, C = p + y * g + (y - 1) * r, E = x, B = C - w;
  return {
    bottom: w,
    firstItemIndex: f,
    items: Fg(a, c, f),
    offsetBottom: B,
    offsetTop: x,
    top: E,
    topItems: Fg(i, c, f),
    topListHeight: i.reduce((M, z) => z.size + M, 0),
    totalCount: o
  };
}
function vb(a, i, o, r, c, f) {
  let m = 0;
  if (o.groupIndices.length > 0)
    for (const w of o.groupIndices) {
      if (w - m >= a)
        break;
      m++;
    }
  const p = a + m, g = Jd(i, p), x = Array.from({ length: p }).map((w, y) => ({
    data: f[y + g],
    index: y + g,
    offset: 0,
    size: 0
  }));
  return Ms(x, [], p, c, o, r);
}
function Fg(a, i, o) {
  if (a.length === 0)
    return [];
  if (!Vs(i))
    return a.map((x) => ({ ...x, index: x.index + o, originalIndex: x.index }));
  const r = a[0].index, c = a[a.length - 1].index, f = [], m = Cl(i.groupOffsetTree, r, c);
  let p, g = 0;
  for (const x of a) {
    (!p || p.end < x.index) && (p = m.shift(), g = i.groupIndices.indexOf(p.start));
    let w;
    x.index === p.start ? w = {
      index: g,
      type: "group"
    } : w = {
      groupIndex: g,
      index: x.index - (g + 1) + o
    }, f.push({
      ...w,
      data: x.data,
      offset: x.offset,
      originalIndex: x.index,
      size: x.size
    });
  }
  return f;
}
function Jg(a, i) {
  return a === void 0 ? 0 : typeof a == "number" ? a : a[i] ?? 0;
}
const Hi = $t(
  ([
    { data: a, firstItemIndex: i, gap: o, sizes: r, totalCount: c },
    f,
    { listBoundary: m, topListHeight: p, visibleRange: g },
    { initialTopMostItemIndex: x, scrolledToInitialItem: w },
    { topListHeight: y },
    C,
    { didMount: E },
    { recalcInProgress: B }
  ]) => {
    const M = lt([]), z = lt(0), A = Yt(), O = lt(0);
    xt(f.topItemsIndexes, M);
    const k = Xe(
      nt(
        Ae(
          E,
          B,
          Tt(g, Ko),
          Tt(c),
          Tt(r),
          Tt(x),
          w,
          Tt(M),
          Tt(i),
          Tt(o),
          Tt(O),
          a
        ),
        _t(([S, D, , Y, , , , , , , , F]) => {
          const et = F !== void 0 && F.length !== Y;
          return S && !D && !et;
        }),
        dt(
          ([
            ,
            ,
            [S, D],
            Y,
            F,
            et,
            st,
            ut,
            ot,
            vt,
            q,
            W
          ]) => {
            var bt, re;
            const $ = F, { offsetTree: ht, sizeTree: rt } = $, _ = xe(z);
            if (Y === 0)
              return { ...hd, totalCount: Y };
            if (S === 0 && D === 0)
              return _ === 0 ? { ...hd, totalCount: Y } : vb(_, et, F, ot, vt, W || []);
            if (oe(rt))
              return _ > 0 ? null : Ms(
                Cw(Jd(et, Y), $, W),
                [],
                Y,
                vt,
                $,
                ot
              );
            const Q = [];
            if (ut.length > 0) {
              const Vt = ut[0], Jt = ut[ut.length - 1];
              let me = 0;
              for (const Xt of Cl(rt, Vt, Jt)) {
                const Kt = Xt.value, Bt = Math.max(Xt.start, Vt), Ee = Math.min(Xt.end, Jt);
                for (let Wt = Bt; Wt <= Ee; Wt++)
                  Q.push({ data: W == null ? void 0 : W[Wt], index: Wt, offset: me, size: Kt }), me += Kt;
              }
            }
            if (!st)
              return Ms([], Q, Y, vt, $, ot);
            const X = ut.length > 0 ? ut[ut.length - 1] + 1 : 0, it = dw(ht, S, D, X);
            if (it.length === 0)
              return null;
            const pt = Y - 1, St = Ys([], (Vt) => {
              for (const Jt of it) {
                const me = Jt.value;
                let Xt = me.offset, Kt = Jt.start;
                const Bt = me.size;
                if (me.offset < S) {
                  Kt += Math.floor((S - me.offset + vt) / (Bt + vt));
                  const Wt = Kt - Jt.start;
                  Xt += Wt * Bt + Wt * vt;
                }
                Kt < X && (Xt += (X - Kt) * Bt, Kt = X);
                const Ee = Math.min(Jt.end, pt);
                for (let Wt = Kt; Wt <= Ee && !(Xt >= D); Wt++)
                  Vt.push({ data: W == null ? void 0 : W[Wt], index: Wt, offset: Xt, size: Bt }), Xt += Bt + vt;
              }
            }), At = Jg(q, $o), at = Jg(q, Fo);
            if (St.length > 0 && (At > 0 || at > 0)) {
              const Vt = St[0], Jt = St[St.length - 1];
              if (At > 0 && Vt.index > X) {
                const me = Math.min(At, Vt.index - X), Xt = [];
                let Kt = Vt.offset;
                for (let Bt = Vt.index - 1; Bt >= Vt.index - me; Bt--) {
                  const Ee = ((bt = Cl(rt, Bt, Bt)[0]) == null ? void 0 : bt.value) ?? Vt.size;
                  Kt -= Ee + vt, Xt.unshift({ data: W == null ? void 0 : W[Bt], index: Bt, offset: Kt, size: Ee });
                }
                St.unshift(...Xt);
              }
              if (at > 0 && Jt.index < pt) {
                const me = Math.min(at, pt - Jt.index);
                let Xt = Jt.offset + Jt.size + vt;
                for (let Kt = Jt.index + 1; Kt <= Jt.index + me; Kt++) {
                  const Bt = ((re = Cl(rt, Kt, Kt)[0]) == null ? void 0 : re.value) ?? Jt.size;
                  St.push({ data: W == null ? void 0 : W[Kt], index: Kt, offset: Xt, size: Bt }), Xt += Bt + vt;
                }
              }
            }
            return Ms(St, Q, Y, vt, $, ot);
          }
        ),
        //@ts-expect-error filter needs to be fixed
        _t((S) => S !== null),
        fe()
      ),
      hd
    );
    xt(
      nt(
        a,
        _t(Xd),
        dt((S) => S == null ? void 0 : S.length)
      ),
      c
    ), xt(
      nt(
        k,
        dt((S) => S.topListHeight)
      ),
      y
    ), xt(y, p), xt(
      nt(
        k,
        dt((S) => [S.top, S.bottom])
      ),
      m
    ), xt(
      nt(
        k,
        dt((S) => S.items)
      ),
      A
    );
    const v = mn(
      nt(
        k,
        _t(({ items: S }) => S.length > 0),
        Ot(c, a),
        _t(([{ items: S }, D]) => S[S.length - 1].originalIndex === D - 1),
        dt(([, S, D]) => [S - 1, D]),
        fe(Ko),
        dt(([S]) => S)
      )
    ), T = mn(
      nt(
        k,
        ga(200),
        _t(({ items: S, topItems: D }) => S.length > 0 && S[0].originalIndex === D.length),
        dt(({ items: S }) => S[0].index),
        fe()
      )
    ), N = mn(
      nt(
        k,
        _t(({ items: S }) => S.length > 0),
        dt(({ items: S }) => {
          let D = 0, Y = S.length - 1;
          for (; S[D].type === "group" && D < Y; )
            D++;
          for (; S[Y].type === "group" && Y > D; )
            Y--;
          return {
            endIndex: S[Y].index,
            startIndex: S[D].index
          };
        }),
        fe(fb)
      )
    );
    return {
      endReached: v,
      initialItemCount: z,
      itemsRendered: A,
      listState: k,
      minOverscanItemCount: O,
      rangeChanged: N,
      startReached: T,
      topItemsIndexes: M,
      ...C
    };
  },
  he(
    In,
    gb,
    Wd,
    ir,
    ar,
    lr,
    li,
    Id
  ),
  { singleton: !0 }
), yb = $t(
  ([{ fixedFooterHeight: a, fixedHeaderHeight: i, footerHeight: o, headerHeight: r }, { listState: c }]) => {
    const f = Yt(), m = Xe(
      nt(
        Ae(o, a, r, i, c),
        dt(([p, g, x, w, y]) => p + g + x + w + y.offsetBottom + y.bottom)
      ),
      0
    );
    return xt(Tt(m), f), { totalListHeight: m, totalListHeightChanged: f };
  },
  he(Ie, Hi),
  { singleton: !0 }
), Tw = $t(
  ([{ viewportHeight: a }, { totalListHeight: i }]) => {
    const o = lt(!1), r = Xe(
      nt(
        Ae(o, a, i),
        _t(([c]) => c),
        dt(([, c, f]) => Math.max(0, c - f)),
        ga(0),
        fe()
      ),
      0
    );
    return { alignToBottom: o, paddingTopAddition: r };
  },
  he(Ie, yb),
  { singleton: !0 }
), wb = $t(() => ({
  context: lt(null)
})), _w = ({
  itemBottom: a,
  itemTop: i,
  locationParams: { align: o, behavior: r, ...c },
  viewportBottom: f,
  viewportTop: m
}) => i < m ? { ...c, align: o ?? "start", ...r !== void 0 ? { behavior: r } : {} } : a > f ? { ...c, align: o ?? "end", ...r !== void 0 ? { behavior: r } : {} } : null, Sb = $t(
  ([
    { gap: a, sizes: i, totalCount: o },
    { fixedFooterHeight: r, fixedHeaderHeight: c, headerHeight: f, scrollingInProgress: m, scrollTop: p, viewportHeight: g },
    { scrollToIndex: x }
  ]) => {
    const w = Yt();
    return xt(
      nt(
        w,
        Ot(i, g, o, f, c, r, p),
        Ot(a),
        dt(([[y, C, E, B, M, z, A, O], k]) => {
          const { calculateViewLocation: v = _w, done: T, ...N } = y, S = pb(y, C, B - 1), D = Zo(S, C.offsetTree, k) + M + z, Y = D + kn(C.sizeTree, S)[1], F = O + z, et = O + E - A, st = v({
            itemBottom: Y,
            itemTop: D,
            locationParams: N,
            viewportBottom: et,
            viewportTop: F
          });
          return st !== null ? T && Bn(
            nt(
              m,
              _t((ut) => !ut),
              // skips the initial publish of false, and the cleanup call.
              // but if scrollingInProgress is true, we skip the initial publish.
              Oi(xe(m) ? 1 : 2)
            ),
            T
          ) : T == null || T(), st;
        }),
        _t((y) => y !== null)
      ),
      x
    ), {
      scrollIntoView: w
    };
  },
  he(In, Ie, ar, Hi, ii),
  { singleton: !0 }
);
function Wg(a) {
  return a === !1 ? !1 : a === "smooth" ? "smooth" : "auto";
}
const jw = (a, i) => typeof a == "function" ? Wg(a(i)) : i && Wg(a), zw = $t(
  ([
    { listRefresh: a, totalCount: i, fixedItemSize: o, data: r },
    { atBottomState: c, isAtBottom: f },
    { scrollToIndex: m },
    { scrolledToInitialItem: p },
    { didMount: g, propsReady: x },
    { log: w },
    { scrollingInProgress: y },
    { context: C },
    { scrollIntoView: E }
  ]) => {
    const B = lt(!1), M = Yt();
    let z = null;
    function A(T) {
      Dt(m, {
        align: "end",
        behavior: T,
        index: "LAST"
      });
    }
    Pt(
      nt(
        Ae(nt(Tt(i), Oi(1)), g),
        Ot(Tt(B), f, p, y),
        dt(([[T, N], S, D, Y, F]) => {
          let et = N && Y, st = "auto";
          return et && (st = jw(S, D || F), et = et && st !== !1), { followOutputBehavior: st, shouldFollow: et, totalCount: T };
        }),
        _t(({ shouldFollow: T }) => T)
      ),
      ({ followOutputBehavior: T, totalCount: N }) => {
        z !== null && (z(), z = null), xe(o) !== void 0 ? requestAnimationFrame(() => {
          xe(w)("following output to ", { totalCount: N }, Me.DEBUG), A(T);
        }) : z = Bn(a, () => {
          xe(w)("following output to ", { totalCount: N }, Me.DEBUG), A(T), z = null;
        });
      }
    );
    function O(T) {
      const N = Bn(c, (S) => {
        T && !S.atBottom && S.notAtBottomBecause === "SIZE_INCREASED" && z === null && (xe(w)("scrolling to bottom due to increased size", {}, Me.DEBUG), A("auto"));
      });
      setTimeout(N, 100);
    }
    Pt(
      nt(
        Ae(Tt(B), i, x),
        _t(([T, , N]) => T !== !1 && N),
        Zn(
          ({ value: T }, [, N]) => ({ refreshed: T === N, value: N }),
          { refreshed: !1, value: 0 }
        ),
        _t(({ refreshed: T }) => T),
        Ot(B, i)
      ),
      ([, T]) => {
        xe(p) && O(T !== !1);
      }
    ), Pt(M, () => {
      O(xe(B) !== !1);
    }), Pt(Ae(Tt(B), c), ([T, N]) => {
      T !== !1 && !N.atBottom && N.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING" && A("auto");
    });
    const k = lt(null), v = Yt();
    return xt(
      jd(
        nt(
          Tt(r),
          dt((T) => (T == null ? void 0 : T.length) ?? 0)
        ),
        nt(Tt(i))
      ),
      v
    ), Pt(
      nt(
        Ae(nt(v, Oi(1)), g),
        Ot(Tt(k), p, y, C),
        dt(([[T, N], S, D, Y, F]) => N && D && (S == null ? void 0 : S({ context: F, totalCount: T, scrollingInProgress: Y }))),
        _t((T) => !!T),
        ga(0)
      ),
      (T) => {
        z !== null && (z(), z = null), xe(o) !== void 0 ? requestAnimationFrame(() => {
          xe(w)("scrolling into view", {}), Dt(E, T);
        }) : z = Bn(a, () => {
          xe(w)("scrolling into view", {}), Dt(E, T), z = null;
        });
      }
    ), { autoscrollToBottom: M, followOutput: B, scrollIntoViewOnChange: k };
  },
  he(
    In,
    lr,
    ar,
    ir,
    li,
    ii,
    Ie,
    wb,
    Sb
  )
), Aw = $t(
  ([{ data: a, firstItemIndex: i, gap: o, sizes: r }, { initialTopMostItemIndex: c }, { initialItemCount: f, listState: m }, { didMount: p }]) => (xt(
    nt(
      p,
      Ot(f),
      _t(([, g]) => g !== 0),
      Ot(c, r, i, o, a),
      dt(([[, g], x, w, y, C, E = []]) => vb(g, x, w, y, C, E))
    ),
    m
  ), {}),
  he(In, ir, Hi, li),
  { singleton: !0 }
), Ew = $t(
  ([{ didMount: a }, { scrollTo: i }, { listState: o }]) => {
    const r = lt(0);
    return Pt(
      nt(
        a,
        Ot(r),
        _t(([, c]) => c !== 0),
        dt(([, c]) => ({ top: c }))
      ),
      (c) => {
        Bn(
          nt(
            o,
            Oi(1),
            _t((f) => f.items.length > 1)
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
  he(li, Ie, Hi),
  { singleton: !0 }
), Cb = $t(
  ([{ scrollVelocity: a }]) => {
    const i = lt(!1), o = Yt(), r = lt(!1);
    return xt(
      nt(
        a,
        Ot(r, i, o),
        _t(([c, f]) => f !== !1 && f !== void 0),
        dt(([c, f, m, p]) => {
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
    ), Pt(
      nt(Ae(i, a, o), Ot(r)),
      ([[c, f, m], p]) => {
        c && p !== !1 && p !== void 0 && p.change && p.change(f, m);
      }
    ), { isSeeking: i, scrollSeekConfiguration: r, scrollSeekRangeChanged: o, scrollVelocity: a };
  },
  he(lr),
  { singleton: !0 }
), Pd = $t(([{ scrollContainerState: a, scrollTo: i }]) => {
  const o = Yt(), r = Yt(), c = Yt(), f = lt(!1), m = lt(void 0);
  return xt(
    nt(
      Ae(o, r),
      dt(([{ scrollTop: p, viewportHeight: g }, { offsetTop: x, listHeight: w }]) => ({
        scrollHeight: w,
        scrollTop: Math.max(0, p - x),
        viewportHeight: g
      }))
    ),
    a
  ), xt(
    nt(
      i,
      Ot(r),
      dt(([p, { offsetTop: g }]) => ({
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
}, he(Ie)), Rw = $t(
  ([
    { sizeRanges: a, sizes: i },
    { headerHeight: o, scrollTop: r },
    { initialTopMostItemIndex: c },
    { didMount: f },
    { useWindowScroll: m, windowScrollContainerState: p, windowViewportRect: g }
  ]) => {
    const x = Yt(), w = lt(void 0), y = lt(null), C = lt(null);
    return xt(p, y), xt(g, C), Pt(
      nt(
        x,
        Ot(i, r, m, y, C, o)
      ),
      ([E, B, M, z, A, O, k]) => {
        const v = hw(B.sizeTree);
        z && A !== null && O !== null && (M = A.scrollTop - O.offsetTop), M -= k, E({ ranges: v, scrollTop: M });
      }
    ), xt(nt(w, _t(Xd), dt(Nw)), c), xt(
      nt(
        f,
        Ot(w),
        _t(([, E]) => E !== void 0),
        fe(),
        dt(([, E]) => E.ranges)
      ),
      a
    ), {
      getState: x,
      restoreStateFrom: w
    };
  },
  he(In, Ie, ir, li, Pd)
);
function Nw(a) {
  return { align: "start", index: 0, offset: a.scrollTop };
}
const Mw = $t(([{ topItemsIndexes: a }]) => {
  const i = lt(0);
  return xt(
    nt(
      i,
      _t((o) => o >= 0),
      dt((o) => Array.from({ length: o }).map((r, c) => c))
    ),
    a
  ), { topItemCount: i };
}, he(Hi));
function Tb(a) {
  let i = !1, o;
  return (() => (i || (i = !0, o = a()), o));
}
const Dw = Tb(() => /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent)), Ow = $t(
  ([
    { deviation: a, scrollBy: i, scrollingInProgress: o, scrollTop: r },
    { isAtBottom: c, isScrolling: f, lastJumpDueToItemResize: m, scrollDirection: p },
    { listState: g },
    { beforeUnshiftWith: x, gap: w, shiftWithOffset: y, sizes: C },
    { log: E },
    { recalcInProgress: B }
  ]) => {
    const M = mn(
      nt(
        g,
        Ot(m),
        Zn(
          ([, A, O, k], [{ bottom: v, items: T, offsetBottom: N, totalCount: S }, D]) => {
            const Y = v + N;
            let F = 0;
            return O === S && A.length > 0 && T.length > 0 && (T[0].originalIndex === 0 && A[0].originalIndex === 0 || (F = Y - k, F !== 0 && (F += D))), [F, T, S, Y];
          },
          [0, [], 0, 0]
        ),
        _t(([A]) => A !== 0),
        Ot(r, p, o, c, E, B),
        _t(([, A, O, k, , , v]) => !v && !k && A !== 0 && O === Io),
        dt(([[A], , , , , O]) => (O("Upward scrolling compensation", { amount: A }, Me.DEBUG), A))
      )
    );
    function z(A) {
      A > 0 ? (Dt(i, { behavior: "auto", top: -A }), Dt(a, 0)) : (Dt(a, 0), Dt(i, { behavior: "auto", top: -A }));
    }
    return Pt(nt(M, Ot(a, f)), ([A, O, k]) => {
      k && Dw() ? Dt(a, O - A) : z(-A);
    }), Pt(
      nt(
        Ae(Xe(f, !1), a, B),
        _t(([A, O, k]) => !A && !k && O !== 0),
        dt(([A, O]) => O),
        ga(1)
      ),
      z
    ), xt(
      nt(
        y,
        dt((A) => ({ top: -A }))
      ),
      i
    ), Pt(
      nt(
        x,
        Ot(C, w),
        dt(([A, { groupIndices: O, lastSize: k, sizeTree: v }, T]) => {
          function N(et) {
            return et * (k + T);
          }
          if (O.length === 0)
            return N(A);
          let S = 0;
          const D = Xo(v, 0);
          let Y = 0, F = 0;
          for (; Y < A; ) {
            Y++, S += D;
            let et = O.length === F + 1 ? 1 / 0 : O[F + 1] - O[F] - 1;
            Y + et > A && (S -= D, et = A - Y + 1), Y += et, S += N(et), F++;
          }
          return S;
        })
      ),
      (A) => {
        Dt(a, A), requestAnimationFrame(() => {
          Dt(i, { top: A }), requestAnimationFrame(() => {
            Dt(a, 0), Dt(B, !1);
          });
        });
      }
    ), { deviation: a };
  },
  he(Ie, lr, Hi, In, ii, Id)
), Bw = $t(
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
    w
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
    ...w
  }),
  he(
    Wd,
    Aw,
    li,
    Cb,
    yb,
    Ew,
    Tw,
    Pd,
    Sb,
    ii,
    wb
  )
), _b = $t(
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
      sizes: w,
      statefulTotalCount: y,
      totalCount: C,
      trackItemSizes: E
    },
    { initialItemFinalLocationReached: B, initialTopMostItemIndex: M, scrolledToInitialItem: z },
    A,
    O,
    k,
    v,
    { scrollToIndex: T },
    N,
    { topItemCount: S },
    { groupCounts: D },
    Y
  ]) => {
    const { listState: F, minOverscanItemCount: et, topItemsIndexes: st, rangeChanged: ut, ...ot } = v;
    return xt(ut, Y.scrollSeekRangeChanged), xt(
      nt(
        Y.windowViewportRect,
        dt((vt) => vt.visibleHeight)
      ),
      A.viewportHeight
    ), {
      data: a,
      defaultItemHeight: i,
      firstItemIndex: o,
      fixedItemHeight: r,
      fixedGroupHeight: c,
      gap: f,
      groupCounts: D,
      heightEstimates: p,
      initialItemFinalLocationReached: B,
      initialTopMostItemIndex: M,
      scrolledToInitialItem: z,
      sizeRanges: x,
      topItemCount: S,
      topItemsIndexes: st,
      // input
      totalCount: C,
      ...k,
      groupIndices: m,
      itemSize: g,
      listState: F,
      minOverscanItemCount: et,
      scrollToIndex: T,
      // output
      statefulTotalCount: y,
      trackItemSizes: E,
      // exported from stateFlagsSystem
      rangeChanged: ut,
      ...ot,
      // the bag of IO from featureGroup1System
      ...Y,
      ...A,
      sizes: w,
      ...O
    };
  },
  he(
    In,
    ir,
    Ie,
    Rw,
    zw,
    Hi,
    ar,
    Ow,
    Mw,
    gb,
    Bw
  )
);
function Hw(a, i) {
  const o = {}, r = {};
  let c = 0;
  const f = a.length;
  for (; c < f; )
    r[a[c]] = 1, c += 1;
  for (const m in i)
    Object.hasOwn(r, m) || (o[m] = i[m]);
  return o;
}
const zs = typeof document < "u" ? ct.useLayoutEffect : ct.useEffect;
function jb(a, i, o) {
  const r = Object.keys(i.required || {}), c = Object.keys(i.optional || {}), f = Object.keys(i.methods || {}), m = Object.keys(i.events || {}), p = ct.createContext({});
  function g(z, A) {
    z.propsReady !== void 0 && Dt(z.propsReady, !1);
    for (const O of r) {
      const k = z[i.required[O]];
      Dt(k, A[O]);
    }
    for (const O of c)
      if (O in A) {
        const k = z[i.optional[O]];
        Dt(k, A[O]);
      }
    z.propsReady !== void 0 && Dt(z.propsReady, !0);
  }
  function x(z) {
    return f.reduce((A, O) => (A[O] = (k) => {
      const v = z[i.methods[O]];
      Dt(v, k);
    }, A), {});
  }
  function w(z) {
    return m.reduce((A, O) => (A[O] = J1(z[i.events[O]]), A), {});
  }
  const y = ct.forwardRef(function(z, A) {
    const { children: O, ...k } = z, [v] = ct.useState(() => Ys(P1(a), (S) => {
      g(S, k);
    })), [T] = ct.useState(Lg(w, v));
    zs(() => {
      for (const S of m)
        S in k && Pt(T[S], k[S]);
      return () => {
        Object.values(T).map(Kd);
      };
    }, [k, T, v]), zs(() => {
      g(v, k);
    }), ct.useImperativeHandle(A, Ug(x(v)));
    const N = o;
    return /* @__PURE__ */ d.jsx(p.Provider, { value: v, children: o !== void 0 ? /* @__PURE__ */ d.jsx(N, { ...Hw([...r, ...c, ...m], k), children: O }) : O });
  }), C = (z) => {
    const A = ct.useContext(p);
    return ct.useCallback(
      (O) => {
        Dt(A[z], O);
      },
      [A, z]
    );
  }, E = (z) => {
    const A = ct.useContext(p)[z], O = ct.useCallback(
      (k) => Pt(A, k),
      [A]
    );
    return ct.useSyncExternalStore(
      O,
      () => xe(A),
      () => xe(A)
    );
  }, B = (z) => {
    const A = ct.useContext(p)[z], [O, k] = ct.useState(Lg(xe, A));
    return zs(
      () => Pt(A, (v) => {
        v !== O && k(Ug(v));
      }),
      [A, O]
    ), O;
  }, M = parseInt(ct.version) >= 18 ? E : B;
  return {
    Component: y,
    useEmitter: (z, A) => {
      const O = ct.useContext(p)[z];
      zs(() => Pt(O, A), [A, O]);
    },
    useEmitterValue: M,
    usePublisher: C
  };
}
const zb = ct.createContext(void 0), Ab = ct.createContext(void 0), md = "-webkit-sticky", Pg = "sticky", tf = Tb(() => {
  if (typeof document > "u")
    return Pg;
  const a = document.createElement("div");
  return a.style.position = md, a.style.position === md ? md : Pg;
}), Eb = typeof document < "u" ? ct.useLayoutEffect : ct.useEffect;
function pd(a) {
  return "self" in a;
}
function kw(a) {
  return "body" in a;
}
function Rb(a, i, o, r = Bl, c, f) {
  const m = ct.useRef(null), p = ct.useRef(null), g = ct.useRef(null), x = ct.useCallback(
    (C) => {
      let E, B, M;
      const z = C.target;
      if (kw(z) || pd(z)) {
        const O = pd(z) ? z : z.defaultView;
        M = f === !0 ? ji(O, O.scrollX) : O.scrollY, E = f === !0 ? O.document.documentElement.scrollWidth : O.document.documentElement.scrollHeight, B = f === !0 ? O.innerWidth : O.innerHeight;
      } else
        M = f === !0 ? ji(z, z.scrollLeft) : z.scrollTop, E = f === !0 ? z.scrollWidth : z.scrollHeight, B = f === !0 ? z.offsetWidth : z.offsetHeight;
      const A = () => {
        a({
          scrollHeight: E,
          scrollTop: Math.max(M, 0),
          viewportHeight: B
        });
      };
      C.suppressFlushSync === !0 ? A() : X1.flushSync(A), p.current !== null && (M === p.current || M <= 0 || M === E - B) && (p.current = null, i(!0), g.current && (clearTimeout(g.current), g.current = null));
    },
    [a, i, f]
  );
  ct.useEffect(() => {
    const C = c || m.current;
    return Qg(C), r(c || m.current), x({ suppressFlushSync: !0, target: C }), C.addEventListener("scroll", x, { passive: !0 }), () => {
      Qg(C), r(null), C.removeEventListener("scroll", x);
    };
  }, [m, x, o, r, c]);
  function w(C) {
    const E = m.current;
    if (!E || (f === !0 ? "offsetWidth" in E && E.offsetWidth === 0 : "offsetHeight" in E && E.offsetHeight === 0))
      return;
    const B = C.behavior === "smooth";
    let M, z, A;
    pd(E) ? (z = Math.max(
      ni(E.document.documentElement, f === !0 ? "width" : "height"),
      f === !0 ? E.document.documentElement.scrollWidth : E.document.documentElement.scrollHeight
    ), M = f === !0 ? E.innerWidth : E.innerHeight, A = f === !0 ? ji(E, E.scrollX) : E.scrollY) : (z = E[f === !0 ? "scrollWidth" : "scrollHeight"], M = ni(E, f === !0 ? "width" : "height"), A = f === !0 ? ji(E, E.scrollLeft) : E.scrollTop);
    const O = z - M;
    if (C.top === void 0) {
      E.scrollTo(C);
      return;
    }
    const k = Math.ceil(Math.max(Math.min(O, C.top), 0));
    if (C.top = k, bb(M, z) || k === A) {
      a({ scrollHeight: z, scrollTop: A, viewportHeight: M }), B && i(!0);
      return;
    }
    B ? (p.current = k, g.current && clearTimeout(g.current), g.current = setTimeout(() => {
      g.current = null, p.current = null, i(!0);
    }, 1e3)) : p.current = null, f === !0 && (C = {
      ...C.behavior !== void 0 ? { behavior: C.behavior } : {},
      left: Yg(E, k)
    }), E.scrollTo(C);
  }
  function y(C) {
    f === !0 && (C = {
      ...C.behavior !== void 0 ? { behavior: C.behavior } : {},
      ...C.top !== void 0 ? { left: Yg(m.current, C.top) } : {}
    }), m.current.scrollBy(C);
  }
  return { scrollByCallback: y, scrollerRef: m, scrollToCallback: w };
}
function ef(a) {
  return a;
}
const qw = /* @__PURE__ */ $t(() => {
  const a = lt((p) => `Item ${p}`), i = lt((p) => `Group ${p}`), o = lt({}), r = lt(ef), c = lt("div"), f = lt(Bl), m = (p, g = null) => Xe(
    nt(
      o,
      dt((x) => x[p]),
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
}), Uw = /* @__PURE__ */ $t(
  ([a, i]) => ({ ...a, ...i }),
  he(_b, qw)
), Lw = ({ height: a }) => /* @__PURE__ */ d.jsx("div", { style: { height: a } }), Gw = { overflowAnchor: "none", position: tf(), zIndex: 1 }, Nb = { overflowAnchor: "none" }, Qw = { ...Nb, display: "inline-block", height: "100%" }, tx = /* @__PURE__ */ ct.memo(function({ showTopList: a = !1 }) {
  const i = zt("listState"), o = An("sizeRanges"), r = zt("useWindowScroll"), c = zt("customScrollParent"), f = An("windowScrollContainerState"), m = An("scrollContainerState"), p = c || r ? f : m, g = zt("itemContent"), x = zt("context"), w = zt("groupContent"), y = zt("trackItemSizes"), C = zt("itemSize"), E = zt("log"), B = An("gap"), M = zt("horizontalDirection"), { callbackRef: z } = aw(
    o,
    C,
    y,
    a ? Bl : p,
    E,
    B,
    c,
    M,
    zt("skipAnimationFrameInResizeObserver")
  ), [A, O] = ct.useState(0);
  af("deviation", (ot) => {
    A !== ot && O(ot);
  });
  const k = zt("EmptyPlaceholder"), v = zt("ScrollSeekPlaceholder") ?? Lw, T = zt("ListComponent"), N = zt("ItemComponent"), S = zt("GroupComponent"), D = zt("computeItemKey"), Y = zt("isSeeking"), F = zt("groupIndices").length > 0, et = zt("alignToBottom"), st = zt("initialItemFinalLocationReached"), ut = a ? {} : {
    boxSizing: "border-box",
    ...M ? {
      display: "inline-block",
      height: "100%",
      marginInlineStart: A !== 0 ? A : et ? "auto" : 0,
      paddingInlineEnd: i.offsetBottom,
      paddingInlineStart: i.offsetTop,
      whiteSpace: "nowrap"
    } : {
      marginTop: A !== 0 ? A : et ? "auto" : 0,
      paddingBottom: i.offsetBottom,
      paddingTop: i.offsetTop
    },
    ...st ? {} : { visibility: "hidden" }
  };
  return !a && i.totalCount === 0 && k !== null && k !== void 0 ? /* @__PURE__ */ d.jsx(k, { ...Ve(k, x) }) : /* @__PURE__ */ d.jsx(
    T,
    {
      ...Ve(T, x),
      "data-testid": a ? "virtuoso-top-item-list" : "virtuoso-item-list",
      ref: z,
      style: ut,
      children: (a ? i.topItems : i.items).map((ot) => {
        const vt = ot.originalIndex, q = D(vt + i.firstItemIndex, ot.data, x);
        return Y ? /* @__PURE__ */ I.createElement(
          v,
          {
            ...Ve(v, x),
            height: ot.size,
            index: ot.index,
            key: q,
            type: ot.type || "item",
            ...ot.type === "group" ? {} : { groupIndex: ot.groupIndex }
          }
        ) : ot.type === "group" ? /* @__PURE__ */ I.createElement(
          S,
          {
            ...Ve(S, x),
            "data-index": vt,
            "data-item-index": ot.index,
            "data-known-size": ot.size,
            key: q,
            style: Gw
          },
          w(ot.index, x)
        ) : /* @__PURE__ */ I.createElement(
          N,
          {
            ...Ve(N, x),
            ...Kw(N, ot.data),
            "data-index": vt,
            "data-item-group-index": ot.groupIndex,
            "data-item-index": ot.index,
            "data-known-size": ot.size,
            key: q,
            style: M ? Qw : Nb
          },
          F ? g(ot.index, ot.groupIndex, ot.data, x) : g(ot.index, ot.data, x)
        );
      })
    }
  );
}), Yw = {
  height: "100%",
  outline: "none",
  overflowY: "auto",
  position: "relative",
  WebkitOverflowScrolling: "touch"
}, Vw = {
  outline: "none",
  overflowX: "auto",
  position: "relative"
}, nf = (a) => ({
  height: "100%",
  position: "absolute",
  top: 0,
  width: "100%",
  ...a ? { display: "flex", flexDirection: "column" } : void 0
}), Mb = (a, i, o = 0) => ({
  ...nf(a),
  position: i ? "relative" : "absolute",
  top: i ? -o : 0
}), Xw = {
  position: tf(),
  top: 0,
  width: "100%",
  zIndex: 1
};
function Ve(a, i) {
  if (typeof a != "string")
    return { context: i };
}
function Kw(a, i) {
  return { item: typeof a == "string" ? void 0 : i };
}
const Zw = /* @__PURE__ */ ct.memo(function() {
  const a = zt("HeaderComponent"), i = An("headerHeight"), o = zt("HeaderFooterTag"), r = Bi(
    ct.useMemo(
      () => (f) => {
        i(ni(f, "height"));
      },
      [i]
    ),
    !0,
    zt("skipAnimationFrameInResizeObserver")
  ), c = zt("context");
  return a != null ? /* @__PURE__ */ d.jsx(o, { ref: r, children: /* @__PURE__ */ d.jsx(a, { ...Ve(a, c) }) }) : null;
}), Iw = /* @__PURE__ */ ct.memo(function() {
  const a = zt("FooterComponent"), i = An("footerHeight"), o = zt("HeaderFooterTag"), r = Bi(
    ct.useMemo(
      () => (f) => {
        i(ni(f, "height"));
      },
      [i]
    ),
    !0,
    zt("skipAnimationFrameInResizeObserver")
  ), c = zt("context");
  return a != null ? /* @__PURE__ */ d.jsx(o, { ref: r, children: /* @__PURE__ */ d.jsx(a, { ...Ve(a, c) }) }) : null;
});
function Db({ useEmitter: a, useEmitterValue: i, usePublisher: o }) {
  return ct.memo(function({ children: r, style: c, context: f, ...m }) {
    const p = o("scrollContainerState"), g = i("ScrollerComponent"), x = o("smoothScrollTargetReached"), w = i("scrollerRef"), y = i("horizontalDirection") || !1, { scrollByCallback: C, scrollerRef: E, scrollToCallback: B } = Rb(
      p,
      x,
      g,
      w,
      void 0,
      y
    );
    return a("scrollTo", B), a("scrollBy", C), /* @__PURE__ */ d.jsx(
      g,
      {
        "data-testid": "virtuoso-scroller",
        "data-virtuoso-scroller": !0,
        ref: E,
        style: { ...y ? Vw : Yw, ...c },
        tabIndex: 0,
        ...m,
        ...Ve(g, f),
        children: r
      }
    );
  });
}
function Ob({ useEmitter: a, useEmitterValue: i, usePublisher: o }) {
  return ct.memo(function({ children: r, style: c, context: f, ...m }) {
    const p = o("windowScrollContainerState"), g = i("ScrollerComponent"), x = o("smoothScrollTargetReached"), w = i("totalListHeight"), y = i("deviation"), C = i("customScrollParent"), E = ct.useRef(null), B = i("scrollerRef"), { scrollByCallback: M, scrollerRef: z, scrollToCallback: A } = Rb(
      p,
      x,
      g,
      B,
      C
    );
    return Eb(() => {
      var O;
      return z.current = C || ((O = E.current) == null ? void 0 : O.ownerDocument.defaultView), () => {
        z.current = null;
      };
    }, [z, C]), a("windowScrollTo", A), a("scrollBy", M), /* @__PURE__ */ d.jsx(
      g,
      {
        ref: E,
        "data-virtuoso-scroller": !0,
        style: { position: "relative", ...c, ...w !== 0 ? { height: w + y } : void 0 },
        ...m,
        ...Ve(g, f),
        children: r
      }
    );
  });
}
const $w = ({ children: a }) => {
  const i = ct.useContext(zb), o = An("viewportHeight"), r = An("fixedItemHeight"), c = zt("alignToBottom"), f = zt("horizontalDirection"), m = ct.useMemo(
    () => nb(o, (g) => ni(g, f ? "width" : "height")),
    [o, f]
  ), p = Bi(m, !0, zt("skipAnimationFrameInResizeObserver"));
  return ct.useEffect(() => {
    i && (o(i.viewportHeight), r(i.itemHeight));
  }, [i, o, r]), /* @__PURE__ */ d.jsx("div", { "data-viewport-type": "element", ref: p, style: nf(c), children: a });
}, Fw = ({ children: a }) => {
  const i = ct.useContext(zb), o = An("windowViewportRect"), r = An("fixedItemHeight"), c = zt("customScrollParent"), f = zt("useWindowScroll"), m = zt("topListHeight"), p = ob(
    o,
    c,
    zt("skipAnimationFrameInResizeObserver")
  ), g = zt("alignToBottom");
  return ct.useEffect(() => {
    i && (r(i.itemHeight), o({ listHeight: 0, offsetTop: 0, visibleHeight: i.viewportHeight, visibleWidth: 100 }));
  }, [i, o, r]), /* @__PURE__ */ d.jsx("div", { "data-viewport-type": "window", ref: p, style: Mb(g, f, m), children: a });
}, Jw = ({ children: a }) => {
  const i = zt("TopItemListComponent") ?? "div", o = zt("headerHeight"), r = { ...Xw, marginTop: `${o}px` }, c = zt("context");
  return /* @__PURE__ */ d.jsx(i, { style: r, ...Ve(i, c), children: a });
}, Ww = /* @__PURE__ */ ct.memo(function(a) {
  const i = zt("useWindowScroll"), o = zt("topItemsIndexes").length > 0, r = zt("customScrollParent"), c = zt("context");
  return /* @__PURE__ */ d.jsxs(r || i ? eS : tS, { ...a, context: c, children: [
    o && /* @__PURE__ */ d.jsx(Jw, { children: /* @__PURE__ */ d.jsx(tx, { showTopList: !0 }) }),
    /* @__PURE__ */ d.jsxs(r || i ? Fw : $w, { children: [
      /* @__PURE__ */ d.jsx(Zw, {}),
      /* @__PURE__ */ d.jsx(tx, {}),
      /* @__PURE__ */ d.jsx(Iw, {})
    ] })
  ] });
}), {
  Component: Pw,
  useEmitter: af,
  useEmitterValue: zt,
  usePublisher: An
} = /* @__PURE__ */ jb(
  Uw,
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
  Ww
), tS = /* @__PURE__ */ Db({ useEmitter: af, useEmitterValue: zt, usePublisher: An }), eS = /* @__PURE__ */ Ob({ useEmitter: af, useEmitterValue: zt, usePublisher: An }), Xs = Pw, nS = /* @__PURE__ */ $t(() => {
  const a = lt((x) => /* @__PURE__ */ d.jsxs("td", { children: [
    "Item $",
    x
  ] })), i = lt(null), o = lt((x) => /* @__PURE__ */ d.jsxs("td", { colSpan: 1e3, children: [
    "Group ",
    x
  ] })), r = lt(null), c = lt(null), f = lt({}), m = lt(ef), p = lt(Bl), g = (x, w = null) => Xe(
    nt(
      f,
      dt((y) => y[x]),
      fe()
    ),
    w
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
he(_b, nS);
tf();
const ex = {
  bottom: 0,
  itemHeight: 0,
  items: [],
  itemWidth: 0,
  offsetBottom: 0,
  offsetTop: 0,
  top: 0
}, aS = {
  bottom: 0,
  itemHeight: 0,
  items: [{ index: 0 }],
  itemWidth: 0,
  offsetBottom: 0,
  offsetTop: 0,
  top: 0
}, { ceil: nx, floor: Us, max: Ho, min: gd, round: ax } = Math;
function ix(a, i, o) {
  return Array.from({ length: i - a + 1 }).map((r, c) => ({ data: o === null ? null : o[c + a], index: c + a }));
}
function iS(a) {
  return {
    ...aS,
    items: a
  };
}
function As(a, i) {
  return a !== void 0 && a.width === i.width && a.height === i.height;
}
function lS(a, i) {
  return a !== void 0 && a.column === i.column && a.row === i.row;
}
const oS = /* @__PURE__ */ $t(
  ([
    { increaseViewportBy: a, listBoundary: i, overscan: o, visibleRange: r },
    { footerHeight: c, headerHeight: f, scrollBy: m, scrollContainerState: p, scrollTo: g, scrollTop: x, smoothScrollTargetReached: w, viewportHeight: y },
    C,
    E,
    { didMount: B, propsReady: M },
    { customScrollParent: z, useWindowScroll: A, windowScrollContainerState: O, windowScrollTo: k, windowViewportRect: v },
    T
  ]) => {
    const N = lt(0), S = lt(0), D = lt(ex), Y = lt({ height: 0, width: 0 }), F = lt({ height: 0, width: 0 }), et = Yt(), st = Yt(), ut = lt(0), ot = lt(null), vt = lt({ column: 0, row: 0 }), q = Yt(), W = Yt(), $ = lt(!1), ht = lt(0), rt = lt(!0), _ = lt(!1), Q = lt(!1);
    Pt(
      nt(
        B,
        Ot(ht),
        _t(([at, bt]) => bt !== 0)
      ),
      () => {
        Dt(rt, !1);
      }
    ), Pt(
      nt(
        Ae(B, rt, F, Y, ht, _),
        _t(([at, bt, re, Vt, , Jt]) => at && !bt && re.height !== 0 && Vt.height !== 0 && !Jt)
      ),
      ([, , , , at]) => {
        Dt(_, !0), Fd(1, () => {
          Dt(et, at);
        }), Bn(nt(x), () => {
          Dt(i, [0, 0]), Dt(rt, !0);
        });
      }
    ), xt(
      nt(
        W,
        _t((at) => at != null && at.scrollTop > 0),
        Kn(0)
      ),
      S
    ), Pt(
      nt(
        B,
        Ot(W),
        _t(([, at]) => at != null)
      ),
      ([, at]) => {
        at && (Dt(Y, at.viewport), Dt(F, at.item), Dt(vt, at.gap), at.scrollTop > 0 && (Dt($, !0), Bn(nt(x, Oi(1)), (bt) => {
          Dt($, !1);
        }), Dt(g, { top: at.scrollTop })));
      }
    ), xt(
      nt(
        Y,
        dt(({ height: at }) => at)
      ),
      y
    ), xt(
      nt(
        Ae(
          Tt(Y, As),
          Tt(F, As),
          Tt(vt, (at, bt) => at !== void 0 && at.column === bt.column && at.row === bt.row),
          Tt(x)
        ),
        dt(([at, bt, re, Vt]) => ({
          gap: re,
          item: bt,
          scrollTop: Vt,
          viewport: at
        }))
      ),
      q
    ), xt(
      nt(
        Ae(
          Tt(N),
          r,
          Tt(vt, lS),
          Tt(F, As),
          Tt(Y, As),
          Tt(ot),
          Tt(S),
          Tt($),
          Tt(rt),
          Tt(ht)
        ),
        _t(([, , , , , , , at]) => !at),
        dt(
          ([
            at,
            [bt, re],
            Vt,
            Jt,
            me,
            Xt,
            Kt,
            ,
            Bt,
            Ee
          ]) => {
            const { column: Wt, row: tt } = Vt, { height: Et, width: we } = Jt, { width: $n } = me;
            if (Kt === 0 && (at === 0 || $n === 0))
              return ex;
            if (we === 0) {
              const sr = Jd(Ee, at), Ks = sr + Math.max(Kt - 1, 0);
              return iS(ix(sr, Ks, Xt));
            }
            const ba = Bb($n, we, Wt);
            let pe, pn;
            Bt ? bt === 0 && re === 0 && Kt > 0 ? (pe = 0, pn = Kt - 1) : (pe = ba * Us((bt + tt) / (Et + tt)), pn = ba * nx((re + tt) / (Et + tt)) - 1, pn = gd(at - 1, Ho(pn, ba - 1)), pe = gd(pn, Ho(0, pe))) : (pe = 0, pn = -1);
            const va = ix(pe, pn, Xt), { bottom: oi, top: ri } = lx(me, Vt, Jt, va), or = nx(at / ba), rr = or * Et + (or - 1) * tt - oi;
            return { bottom: oi, itemHeight: Et, items: va, itemWidth: we, offsetBottom: rr, offsetTop: ri, top: ri };
          }
        )
      ),
      D
    ), xt(
      nt(
        ot,
        _t((at) => at !== null),
        dt((at) => at.length)
      ),
      N
    ), xt(
      nt(
        Ae(Y, F, D, vt),
        _t(([at, bt, { items: re }]) => re.length > 0 && bt.height !== 0 && at.height !== 0),
        dt(([at, bt, { items: re }, Vt]) => {
          const { bottom: Jt, top: me } = lx(at, Vt, bt, re);
          return [me, Jt];
        }),
        fe(Ko)
      ),
      i
    );
    const X = lt(!1);
    xt(
      nt(
        x,
        Ot(X),
        dt(([at, bt]) => bt || at !== 0)
      ),
      X
    );
    const it = mn(
      nt(
        Ae(D, N),
        _t(([{ items: at }]) => at.length > 0),
        Ot(X),
        _t(([[at, bt], re]) => {
          const Vt = at.items[at.items.length - 1].index === bt - 1;
          return (re || at.bottom > 0 && at.itemHeight > 0 && at.offsetBottom === 0 && at.items.length === bt) && Vt;
        }),
        dt(([[, at]]) => at - 1),
        fe()
      )
    ), pt = mn(
      nt(
        Tt(D),
        _t(({ items: at }) => at.length > 0 && at[0].index === 0),
        Kn(0),
        fe()
      )
    ), St = mn(
      nt(
        Tt(D),
        Ot($),
        _t(([{ items: at }, bt]) => at.length > 0 && !bt),
        dt(([{ items: at }]) => ({
          endIndex: at[at.length - 1].index,
          startIndex: at[0].index
        })),
        fe(fb),
        ga(0)
      )
    );
    xt(St, E.scrollSeekRangeChanged), xt(
      nt(
        et,
        Ot(Y, F, N, vt),
        dt(([at, bt, re, Vt, Jt]) => {
          const me = xb(at), { align: Xt, behavior: Kt, offset: Bt } = me;
          let Ee = me.index;
          Ee === "LAST" && (Ee = Vt - 1), Ee = Ho(0, Ee, gd(Vt - 1, Ee));
          let Wt = Md(bt, Jt, re, Ee);
          return Xt === "end" ? Wt = ax(Wt - bt.height + re.height) : Xt === "center" && (Wt = ax(Wt - bt.height / 2 + re.height / 2)), Bt !== void 0 && Bt !== 0 && (Wt += Bt), { behavior: Kt, top: Wt };
        })
      ),
      g
    );
    const At = Xe(
      nt(
        D,
        dt((at) => at.offsetBottom + at.bottom)
      ),
      0
    );
    return xt(
      nt(
        v,
        dt((at) => ({ height: at.visibleHeight, width: at.visibleWidth }))
      ),
      Y
    ), {
      customScrollParent: z,
      // input
      data: ot,
      deviation: ut,
      footerHeight: c,
      gap: vt,
      headerHeight: f,
      increaseViewportBy: a,
      initialItemCount: S,
      itemDimensions: F,
      overscan: o,
      restoreStateFrom: W,
      scrollBy: m,
      scrollContainerState: p,
      scrollHeight: st,
      scrollTo: g,
      scrollToIndex: et,
      scrollTop: x,
      smoothScrollTargetReached: w,
      totalCount: N,
      useWindowScroll: A,
      viewportDimensions: Y,
      windowScrollContainerState: O,
      windowScrollTo: k,
      windowViewportRect: v,
      ...E,
      // output
      gridState: D,
      horizontalDirection: Q,
      initialTopMostItemIndex: ht,
      totalListHeight: At,
      ...C,
      endReached: it,
      propsReady: M,
      rangeChanged: St,
      startReached: pt,
      stateChanged: q,
      stateRestoreInProgress: $,
      ...T
    };
  },
  he(Wd, Ie, lr, Cb, li, Pd, ii)
);
function Bb(a, i, o) {
  return Ho(1, Us((a + o) / (Us(i) + o)));
}
function lx(a, i, o, r) {
  const { height: c } = o;
  if (c === void 0 || r.length === 0)
    return { bottom: 0, top: 0 };
  const f = Md(a, i, o, r[0].index);
  return { bottom: Md(a, i, o, r[r.length - 1].index) + c, top: f };
}
function Md(a, i, o, r) {
  const c = Bb(a.width, o.width, i.column), f = Us(r / c), m = f * o.height + Ho(0, f - 1) * i.row;
  return m > 0 ? m + i.row : m;
}
const rS = /* @__PURE__ */ $t(() => {
  const a = lt((y) => `Item ${y}`), i = lt({}), o = lt(null), r = lt("virtuoso-grid-item"), c = lt("virtuoso-grid-list"), f = lt(ef), m = lt("div"), p = lt(Bl), g = (y, C = null) => Xe(
    nt(
      i,
      dt((E) => E[y]),
      fe()
    ),
    C
  ), x = lt(!1), w = lt(!1);
  return xt(Tt(w), x), {
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
    reportReadyState: w,
    ScrollerComponent: g("Scroller", "div"),
    scrollerRef: p,
    ScrollSeekPlaceholder: g("ScrollSeekPlaceholder", "div")
  };
}), sS = /* @__PURE__ */ $t(
  ([a, i]) => ({ ...a, ...i }),
  he(oS, rS)
), uS = /* @__PURE__ */ ct.memo(function() {
  const a = de("gridState"), i = de("listClassName"), o = de("itemClassName"), r = de("itemContent"), c = de("computeItemKey"), f = de("isSeeking"), m = En("scrollHeight"), p = de("ItemComponent"), g = de("ListComponent"), x = de("ScrollSeekPlaceholder"), w = de("context"), y = En("itemDimensions"), C = En("gap"), E = de("log"), B = de("stateRestoreInProgress"), M = En("reportReadyState"), z = Bi(
    ct.useMemo(
      () => (A) => {
        const O = A.parentElement.parentElement.scrollHeight;
        m(O);
        const k = A.firstChild;
        if (k !== null) {
          const { height: v, width: T } = k.getBoundingClientRect();
          y({ height: v, width: T });
        }
        C({
          column: ox("column-gap", getComputedStyle(A).columnGap, E),
          row: ox("row-gap", getComputedStyle(A).rowGap, E)
        });
      },
      [m, y, C, E]
    ),
    !0,
    !1
  );
  return Eb(() => {
    a.itemHeight > 0 && a.itemWidth > 0 && M(!0);
  }, [a]), B ? null : /* @__PURE__ */ d.jsx(
    g,
    {
      className: i,
      ref: z,
      ...Ve(g, w),
      "data-testid": "virtuoso-item-list",
      style: { paddingBottom: a.offsetBottom, paddingTop: a.offsetTop },
      children: a.items.map((A) => {
        const O = c(A.index, A.data, w);
        return f ? /* @__PURE__ */ d.jsx(
          x,
          {
            ...Ve(x, w),
            height: a.itemHeight,
            index: A.index,
            width: a.itemWidth
          },
          O
        ) : /* @__PURE__ */ I.createElement(
          p,
          {
            ...Ve(p, w),
            className: o,
            "data-index": A.index,
            key: O
          },
          r(A.index, A.data, w)
        );
      })
    }
  );
}), cS = ct.memo(function() {
  const a = de("HeaderComponent"), i = En("headerHeight"), o = de("headerFooterTag"), r = Bi(
    ct.useMemo(
      () => (f) => {
        i(ni(f, "height"));
      },
      [i]
    ),
    !0,
    !1
  ), c = de("context");
  return a != null ? /* @__PURE__ */ d.jsx(o, { ref: r, children: /* @__PURE__ */ d.jsx(a, { ...Ve(a, c) }) }) : null;
}), dS = ct.memo(function() {
  const a = de("FooterComponent"), i = En("footerHeight"), o = de("headerFooterTag"), r = Bi(
    ct.useMemo(
      () => (f) => {
        i(ni(f, "height"));
      },
      [i]
    ),
    !0,
    !1
  ), c = de("context");
  return a != null ? /* @__PURE__ */ d.jsx(o, { ref: r, children: /* @__PURE__ */ d.jsx(a, { ...Ve(a, c) }) }) : null;
}), fS = ({ children: a }) => {
  const i = ct.useContext(Ab), o = En("itemDimensions"), r = En("viewportDimensions"), c = Bi(
    ct.useMemo(
      () => (f) => {
        r(f.getBoundingClientRect());
      },
      [r]
    ),
    !0,
    !1
  );
  return ct.useEffect(() => {
    i && (r({ height: i.viewportHeight, width: i.viewportWidth }), o({ height: i.itemHeight, width: i.itemWidth }));
  }, [i, r, o]), /* @__PURE__ */ d.jsx("div", { ref: c, style: nf(!1), children: a });
}, hS = ({ children: a }) => {
  const i = ct.useContext(Ab), o = En("windowViewportRect"), r = En("itemDimensions"), c = de("customScrollParent"), f = de("useWindowScroll"), m = ob(o, c, !1);
  return ct.useEffect(() => {
    i && (r({ height: i.itemHeight, width: i.itemWidth }), o({ listHeight: 0, offsetTop: 0, visibleHeight: i.viewportHeight, visibleWidth: i.viewportWidth }));
  }, [i, o, r]), /* @__PURE__ */ d.jsx("div", { ref: m, style: Mb(!1, f), children: a });
}, mS = /* @__PURE__ */ ct.memo(function({ ...a }) {
  const i = de("useWindowScroll"), o = de("customScrollParent"), r = o || i ? gS : pS, c = o || i ? hS : fS, f = de("context");
  return /* @__PURE__ */ d.jsx(r, { ...a, ...Ve(r, f), children: /* @__PURE__ */ d.jsxs(c, { children: [
    /* @__PURE__ */ d.jsx(cS, {}),
    /* @__PURE__ */ d.jsx(uS, {}),
    /* @__PURE__ */ d.jsx(dS, {})
  ] }) });
}), {
  useEmitter: Hb,
  useEmitterValue: de,
  usePublisher: En
} = /* @__PURE__ */ jb(
  sS,
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
  mS
), pS = /* @__PURE__ */ Db({ useEmitter: Hb, useEmitterValue: de, usePublisher: En }), gS = /* @__PURE__ */ Ob({ useEmitter: Hb, useEmitterValue: de, usePublisher: En });
function ox(a, i, o) {
  return i !== "normal" && (i == null ? void 0 : i.endsWith("px")) !== !0 && o(`${a} was not resolved to pixel value correctly`, i, Me.WARN), i === "normal" ? 0 : parseInt(i ?? "0", 10);
}
function ft({ icon: a, className: i, title: o }) {
  return ct.createElement("ha-icon", { icon: a, className: i, title: o });
}
function xS(a) {
  const i = ei(a).length;
  return a.status === "error" ? "error" : i || Lo(a) || Go(a) || a.status === "waiting_approval" && i ? "approval" : Ud(a) ? "restart" : ["planning", "running", "working"].includes(a.status || "") ? "working" : "idle";
}
function bS(a, i) {
  return i ? "running" : a ? a.status === "passed" || a.ok === !0 || a.returncode === 0 ? "success" : a.status === "failed" || a.ok === !1 || Number.isInteger(a.returncode) && a.returncode !== 0 ? "error" : a.status === "unavailable" ? "warning" : "unknown" : "unknown";
}
function vS(a) {
  return a === "success" ? "mdi:check-circle" : a === "error" ? "mdi:alert-circle" : a === "warning" ? "mdi:alert-outline" : a === "running" ? "mdi:progress-clock" : "mdi:help-circle-outline";
}
function yS(a) {
  var Y;
  const i = qt((F) => F.showArchived ? F.archivedChatIds : F.activeChatIds), o = qt((F) => F.activeId), r = qt((F) => F.showArchived), c = qt((F) => F.archivedChatIds.length), f = qt((F) => F.scheduledRestart), m = qt((F) => F.chatsById), p = I.useMemo(() => o1(Object.values(m)), [m]), g = qt((F) => F.validation), x = qt((F) => F.validationRunning), w = wt((F) => F.status), y = w.usage || {}, C = ((Y = w.runtime) == null ? void 0 : Y.bridge_available) === !1, E = bS(g, x), B = r ? "Current chats" : "Archived chats", [M, z] = I.useState({ active: !1, ids: [], phase: 0 }), [A, O] = I.useState(!1), k = I.useRef(null), v = I.useRef(null), T = I.useRef(null), N = r ? "archived" : "current", S = I.useMemo(() => new Set(M.ids), [M.ids]);
  I.useEffect(() => {
    const F = k.current;
    if (k.current = { ids: i, mode: N }, !F || F.mode !== N || F.ids.length !== i.length) return;
    const et = new Map(F.ids.map((ut, ot) => [ut, ot]));
    if (!i.every((ut) => et.has(ut))) return;
    const st = i.filter((ut, ot) => et.get(ut) !== ot);
    st.length && (T.current && window.clearTimeout(T.current), z((ut) => ({ active: !0, ids: st, phase: ut.phase === 1 ? 2 : 1 })), T.current = window.setTimeout(() => {
      z((ut) => ({ ...ut, active: !1, ids: [] })), T.current = null;
    }, 340));
  }, [N, i]), I.useEffect(() => () => {
    T.current && window.clearTimeout(T.current);
  }, []), I.useEffect(() => {
    p.length || O(!1);
  }, [p.length]), I.useEffect(() => {
    if (!A) return;
    const F = (et) => {
      const st = et.composedPath();
      v.current && st.includes(v.current) || O(!1);
    };
    return window.addEventListener("pointerdown", F), () => window.removeEventListener("pointerdown", F);
  }, [A]);
  const D = p[0];
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
        Xs,
        {
          className: "sessions-virtual-list",
          data: i,
          computeItemKey: (F, et) => et,
          itemContent: (F, et) => /* @__PURE__ */ d.jsx(
            SS,
            {
              id: et,
              active: et === o,
              switching: M.active && S.has(et),
              switchPhase: M.phase,
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
            /* @__PURE__ */ d.jsx("strong", { children: rx(y.five_hour_remaining_percent) })
          ] }),
          sx(y.five_hour_reset_at)
        ] }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsxs("span", { className: "usage-main", children: [
            /* @__PURE__ */ d.jsx("span", { children: "Weekly" }),
            /* @__PURE__ */ d.jsx("strong", { children: rx(y.weekly_remaining_percent) })
          ] }),
          sx(y.weekly_reset_at)
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: `rail-footer-actions ${p.length ? "restart-pending" : ""}`, children: [
        /* @__PURE__ */ d.jsxs("button", { className: `archive-toggle ${r ? "active" : ""}`, onClick: a.onToggleArchived, children: [
          /* @__PURE__ */ d.jsx(ft, { icon: "mdi:archive-outline" }),
          /* @__PURE__ */ d.jsx("span", { className: "overflow-title", title: B, children: B }),
          /* @__PURE__ */ d.jsx("b", { children: c })
        ] }),
        D ? /* @__PURE__ */ d.jsx(
          wS,
          {
            approval: D.approval,
            count: p.length,
            menuOpen: A,
            actionRef: v,
            scheduled: f,
            session: D.session,
            onMenuOpen: O,
            onRestartNow: a.onRestartNow,
            onRestartSchedule: a.onRestartSchedule,
            onRestartScheduleCancel: a.onRestartScheduleCancel
          }
        ) : null,
        /* @__PURE__ */ d.jsxs("button", { className: `validation-status-button ${E}`, onClick: a.onValidate, title: "Run HA config validation", "aria-label": "Run HA config validation", "aria-disabled": x, children: [
          /* @__PURE__ */ d.jsx(ft, { icon: vS(E) }),
          /* @__PURE__ */ d.jsxs("span", { className: "validation-tooltip", role: "tooltip", children: [
            /* @__PURE__ */ d.jsx("strong", { children: "HA Config Validation" }),
            /* @__PURE__ */ d.jsx("span", { children: x ? "Running Home Assistant config validation..." : g ? g.status || "done" : "No validation result yet. Click to run check." })
          ] })
        ] }),
        /* @__PURE__ */ d.jsx("button", { className: `debug-button ${C ? "bridge-unavailable" : ""}`, onClick: a.onDebug, title: "Open settings", "aria-label": "Open settings", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:cog-outline" }) })
      ] })
    ] })
  ] });
}
const wS = I.memo(function({
  approval: i,
  count: o,
  menuOpen: r,
  actionRef: c,
  scheduled: f,
  session: m,
  onMenuOpen: p,
  onRestartNow: g,
  onRestartSchedule: x,
  onRestartScheduleCancel: w
}) {
  const y = f ? "Restart scheduled after pending completion" : `${o} pending restart${o === 1 ? "" : "s"}`;
  return /* @__PURE__ */ d.jsxs("div", { className: "restart-action-wrap", ref: c, children: [
    /* @__PURE__ */ d.jsx(
      "button",
      {
        className: `restart-action ${f ? "scheduled" : "pending"}`,
        onClick: () => p(!r),
        title: y,
        "aria-label": y,
        "aria-expanded": r,
        "aria-haspopup": "menu",
        children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:restart" })
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
            p(!1), f ? w() : x();
          },
          children: f ? "Cancel auto restart" : "Restart after pending completion"
        }
      )
    ] }) : null
  ] });
}), SS = I.memo(function({ id: i, active: o, switching: r, switchPhase: c, onSelect: f, onArchive: m }) {
  const p = qt((x) => x.chatsById[i]);
  if (!p) return null;
  const g = !!p.archived;
  return /* @__PURE__ */ d.jsxs("div", { className: `session-row ${o ? "active" : ""} ${g ? "archived" : ""} ${r ? `switching switching-${c}` : ""}`, "data-session-id": i, children: [
    /* @__PURE__ */ d.jsx("button", { className: "session", onClick: () => f(i), children: /* @__PURE__ */ d.jsxs("span", { className: "session-text", children: [
      /* @__PURE__ */ d.jsxs("span", { className: "title-line", children: [
        /* @__PURE__ */ d.jsx("span", { className: `status-dot status-dot-${xS(p)}`, "aria-hidden": "true" }),
        /* @__PURE__ */ d.jsx("span", { className: "title overflow-title", title: p.title, children: p.title })
      ] }),
      /* @__PURE__ */ d.jsx("span", { className: "meta", children: nr(Cd(p)) })
    ] }) }),
    /* @__PURE__ */ d.jsx("button", { className: "icon-button session-archive", onClick: () => m(i, !g), title: g ? "Restore chat" : "Archive chat", "aria-label": g ? "Restore chat" : "Archive chat", children: /* @__PURE__ */ d.jsx(ft, { icon: g ? "mdi:archive-arrow-up-outline" : "mdi:archive-arrow-down-outline" }) })
  ] });
});
function rx(a) {
  if (a == null || a === "") return "--%";
  const i = Number(a);
  return Number.isFinite(i) ? `${Math.round(i)}%` : "--%";
}
function sx(a) {
  const i = Jx(a);
  return i ? /* @__PURE__ */ d.jsxs("small", { title: ks(a), children: [
    "Resets ",
    i
  ] }) : /* @__PURE__ */ d.jsx("small", { children: "--" });
}
function CS(a) {
  var o;
  const i = (o = a == null ? void 0 : a.summary) == null ? void 0 : o.recommendation;
  return i === "fix_validation_errors" ? "error" : i === "restart_required" ? "restart" : i === "reload_may_be_enough" || i === "validation_unavailable" ? "warning" : i === "no_action_needed" ? "success" : (a == null ? void 0 : a.status) === "failed" || (a == null ? void 0 : a.ok) === !1 ? "error" : (a == null ? void 0 : a.status) === "passed" || (a == null ? void 0 : a.ok) === !0 || (a == null ? void 0 : a.returncode) === 0 ? "success" : "unknown";
}
function TS(a) {
  var i;
  return (i = a == null ? void 0 : a.summary) != null && i.label ? a.summary.label : a ? a.status === "passed" ? "No action needed" : a.status === "failed" ? "Fix validation errors first" : a.status === "unavailable" ? "Validation unavailable" : "Validation finished" : "No validation result yet";
}
function _S(a) {
  var i;
  return ((i = a == null ? void 0 : a.summary) == null ? void 0 : i.recommendation) !== "reload_may_be_enough" ? [] : [...a.summary.reload_domains || []];
}
function jS(a) {
  return ((a == null ? void 0 : a.command) || []).join(" ");
}
function zS({ validation: a, compact: i = !1, onReloadDomains: o }) {
  if (!a) return null;
  const r = a.summary || {}, c = CS(a), f = TS(a), m = jS(a), p = r.affected_domains || [], g = r.changed_files || [], x = _S(a), w = Hn([a.stdout, a.stderr].filter(Boolean).join(`
`)).trim(), y = [r.session_title, r.session_id && !r.session_title ? r.session_id : ""].filter(Boolean).join(" · ");
  return /* @__PURE__ */ d.jsxs("section", { className: `validation-card ${c} ${i ? "compact" : ""}`, children: [
    /* @__PURE__ */ d.jsxs("header", { children: [
      /* @__PURE__ */ d.jsx(ft, { icon: c === "error" ? "mdi:alert-circle-outline" : c === "restart" ? "mdi:restart-alert" : c === "warning" ? "mdi:reload-alert" : "mdi:check-circle-outline" }),
      /* @__PURE__ */ d.jsxs("div", { children: [
        /* @__PURE__ */ d.jsx("strong", { children: f }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          a.status || "unknown",
          a.returncode !== void 0 && a.returncode !== null ? ` · exit ${a.returncode}` : "",
          a.created_at ? ` · ${nr(a.created_at)}` : ""
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("div", { className: "validation-meta", children: [
      m ? /* @__PURE__ */ d.jsxs("span", { title: m, children: [
        /* @__PURE__ */ d.jsx("b", { children: "Command" }),
        m
      ] }) : null,
      y ? /* @__PURE__ */ d.jsxs("span", { title: y, children: [
        /* @__PURE__ */ d.jsx("b", { children: "Chat" }),
        y
      ] }) : null,
      a.created_at ? /* @__PURE__ */ d.jsxs("span", { title: ks(a.created_at), children: [
        /* @__PURE__ */ d.jsx("b", { children: "Timestamp" }),
        ks(a.created_at)
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
      /* @__PURE__ */ d.jsx(ft, { icon: "mdi:reload" }),
      /* @__PURE__ */ d.jsxs("span", { children: [
        "Reload ",
        AS(C)
      ] })
    ] }, C)) }) : null,
    w ? /* @__PURE__ */ d.jsxs("details", { className: "validation-output", open: !i && c === "error", children: [
      /* @__PURE__ */ d.jsx("summary", { children: "Validation output" }),
      /* @__PURE__ */ d.jsx("pre", { children: w })
    ] }) : null
  ] });
}
function AS(a) {
  return {
    automations: "automations",
    scripts: "scripts",
    scenes: "scenes",
    themes: "themes"
  }[a] || a;
}
const ES = 180, kb = [];
function RS(a) {
  const i = wt((r) => {
    var c;
    return (c = r.gitChanges) != null && c.files ? Bs(r.gitChanges.files) : r.gitChangedCount;
  }), o = wt((r) => {
    var c;
    return (c = r.gitChanges) != null && c.files ? Gd(r.gitChanges.files, r.gitSelection) : 0;
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
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", onClick: a.onRefresh, title: "Refresh changes", "aria-label": "Refresh changes", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:refresh" }) }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", onClick: a.onClose, title: "Close Git panel", "aria-label": "Close Git panel", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:close" }) })
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "drawer-body git-review", children: /* @__PURE__ */ d.jsx(NS, { ...a }) }),
    /* @__PURE__ */ d.jsx(OS, { onCommit: a.onCommit, onDiscard: a.onDiscard })
  ] });
}
function NS({ onToggleFile: a }) {
  var m;
  const i = wt((p) => p.gitLoading), o = wt((p) => p.gitChanges), r = (o == null ? void 0 : o.files) || kb, c = I.useMemo(() => er(r), [r]), f = I.useMemo(() => _1(c).flatMap((p) => [
    { type: "folder", folder: p.folder },
    ...p.files.map((g) => ({ type: "file", file: g }))
  ]), [c]);
  return i && !o ? /* @__PURE__ */ d.jsx("div", { className: "loading-state", children: "Loading Git changes..." }) : o && o.ok === !1 && !((m = o.files) != null && m.length) ? /* @__PURE__ */ d.jsx("div", { className: "loading-state error", children: Hn(o.stderr || "Git reload failed.") }) : c.length ? /* @__PURE__ */ d.jsx(
    Xs,
    {
      className: "git-virtual-list",
      data: f,
      itemContent: (p, g) => g.type === "folder" ? /* @__PURE__ */ d.jsx("h3", { className: "git-folder-heading", title: g.folder, children: g.folder }) : /* @__PURE__ */ d.jsx(qb, { file: g.file, onToggleFile: a }, xa(g.file.path, g.file.old_path || ""))
    }
  ) : /* @__PURE__ */ d.jsx("p", { className: "muted pad", children: i ? "Refreshing changes..." : "No changed files." });
}
function qb({
  file: a,
  onToggleFile: i,
  open: o,
  diff: r,
  loading: c = !1,
  selectable: f = !0,
  displayPath: m = "name"
}) {
  const p = xa(a.path, a.old_path || ""), g = wt((O) => O.openGitDiffKey === p), x = wt((O) => O.gitFileDiffs[p] || (a.patch ? a : null)), w = wt((O) => O.gitFileDiffLoading[p]), y = o ?? g, C = r === void 0 ? x : r, E = c || o === void 0 && !!w, B = I.useMemo(() => A1((C == null ? void 0 : C.patch) || ""), [C == null ? void 0 : C.patch]), M = m === "path" ? a.path : a.display_name || Kx(a.path).name, z = a.status !== "deleted", A = String(a.status || "changed").toLowerCase();
  return /* @__PURE__ */ d.jsxs("section", { className: `diff-file ${y ? "open" : ""}`, "data-diff-key": p, children: [
    /* @__PURE__ */ d.jsxs("div", { className: `diff-card ${z ? "" : "no-line-stats"} ${f ? "" : "no-select"}`, onClick: () => i(a.path, a.old_path || ""), role: "button", tabIndex: 0, title: a.path, onKeyDown: (O) => {
      O.target instanceof HTMLInputElement || (O.key === "Enter" || O.key === " ") && (O.preventDefault(), i(a.path, a.old_path || ""));
    }, children: [
      f ? /* @__PURE__ */ d.jsx(MS, { file: a, displayName: M }) : null,
      /* @__PURE__ */ d.jsxs("span", { className: "diff-file-main", children: [
        /* @__PURE__ */ d.jsx("strong", { children: M }),
        a.old_path ? /* @__PURE__ */ d.jsxs("span", { children: [
          a.old_path,
          " -> ",
          a.path
        ] }) : null
      ] }),
      z ? /* @__PURE__ */ d.jsxs("span", { className: "line-stats", children: [
        /* @__PURE__ */ d.jsx(cx, { value: a.added_lines, type: "added" }),
        /* @__PURE__ */ d.jsx(cx, { value: a.deleted_lines, type: "deleted" })
      ] }) : null,
      /* @__PURE__ */ d.jsx("b", { className: `file-status ${A}`, children: /* @__PURE__ */ d.jsx(ft, { icon: E1(A) }) }),
      /* @__PURE__ */ d.jsxs("span", { className: "diff-open-action", children: [
        /* @__PURE__ */ d.jsx(ft, { icon: y ? "mdi:chevron-up" : "mdi:chevron-down" }),
        /* @__PURE__ */ d.jsx("span", { children: y ? "Hide" : "Diff" })
      ] })
    ] }),
    y ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsx(DS, { loading: !!E, lines: B }),
      C != null && C.stderr || C != null && C.patch_error ? /* @__PURE__ */ d.jsx("pre", { className: "diff-error", children: Hn(C.stderr || C.patch_error || "").trim() }) : null
    ] }) : null
  ] });
}
function MS({ file: a, displayName: i }) {
  const o = xa(a.path, a.old_path || ""), r = wt((f) => f.gitSelection[o] === !0), c = wt((f) => f.setGitFileSelected);
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
function DS({ loading: a, lines: i }) {
  return a ? /* @__PURE__ */ d.jsx("div", { className: "diff-lines", children: /* @__PURE__ */ d.jsx("div", { className: "diff-empty", children: "Loading diff..." }) }) : i.length ? i.length >= ES ? /* @__PURE__ */ d.jsx("div", { className: "diff-lines virtualized", children: /* @__PURE__ */ d.jsx(
    Xs,
    {
      data: i,
      itemContent: (o, r) => /* @__PURE__ */ d.jsx(ux, { line: r }, o)
    }
  ) }) : /* @__PURE__ */ d.jsx("div", { className: "diff-lines", children: i.map((o, r) => /* @__PURE__ */ d.jsx(ux, { line: o }, r)) }) : /* @__PURE__ */ d.jsx("div", { className: "diff-lines", children: /* @__PURE__ */ d.jsx("div", { className: "diff-empty", children: "No textual diff available." }) });
}
function ux({ line: a }) {
  return /* @__PURE__ */ d.jsxs("div", { className: `diff-line ${a.type}`, children: [
    /* @__PURE__ */ d.jsx("span", { className: "marker", children: a.type === "added" ? "+" : a.type === "deleted" ? "-" : a.type === "hunk" ? "@" : "" }),
    /* @__PURE__ */ d.jsx("code", { children: a.content })
  ] });
}
function cx({ value: a, type: i }) {
  return a == null ? /* @__PURE__ */ d.jsx("span", { className: i, children: "--" }) : /* @__PURE__ */ d.jsxs("span", { className: i, children: [
    i === "added" ? "+" : "-",
    Number(a)
  ] });
}
function OS({ onCommit: a, onDiscard: i }) {
  const o = wt((E) => E.commitMessage), r = wt((E) => E.setCommitMessage), c = wt((E) => E.commitRunning), f = wt((E) => E.discardRunning), m = wt((E) => E.gitDiscardConfirming), p = wt((E) => E.setGitDiscardConfirming), g = wt((E) => {
    var B;
    return ((B = E.gitChanges) == null ? void 0 : B.files) || kb;
  }), x = wt((E) => E.gitSelection), w = Gd(g, x), y = Og(g, x, c), C = Og(g, x, c || f);
  return /* @__PURE__ */ d.jsxs("form", { className: "commit-box", onSubmit: (E) => {
    E.preventDefault(), a(o);
  }, children: [
    /* @__PURE__ */ d.jsx("textarea", { name: "commit-message", placeholder: "Commit message", rows: 1, disabled: c, value: o, onChange: (E) => r(E.target.value) }),
    /* @__PURE__ */ d.jsxs("div", { className: "git-action-row", children: [
      /* @__PURE__ */ d.jsxs("button", { type: "submit", disabled: y, children: [
        /* @__PURE__ */ d.jsx(ft, { icon: c ? "mdi:progress-clock" : "mdi:source-commit" }),
        /* @__PURE__ */ d.jsx("span", { children: c ? "Pushing..." : "Commit & Push" })
      ] }),
      /* @__PURE__ */ d.jsxs("button", { type: "button", className: "danger", disabled: C, onClick: () => p(!0), children: [
        /* @__PURE__ */ d.jsx(ft, { icon: "mdi:trash-can-outline" }),
        /* @__PURE__ */ d.jsx("span", { children: "Discard selected" })
      ] })
    ] }),
    m && w ? /* @__PURE__ */ d.jsxs("div", { className: "discard-confirm", children: [
      /* @__PURE__ */ d.jsxs("span", { children: [
        "Discard ",
        w,
        " selected ",
        w === 1 ? "file" : "files",
        "?"
      ] }),
      /* @__PURE__ */ d.jsxs("button", { type: "button", className: "danger", disabled: f, onClick: i, children: [
        /* @__PURE__ */ d.jsx(ft, { icon: f ? "mdi:progress-clock" : "mdi:check" }),
        /* @__PURE__ */ d.jsx("span", { children: f ? "Discarding..." : "Confirm discard" })
      ] }),
      /* @__PURE__ */ d.jsx("button", { type: "button", className: "ghost", disabled: f, onClick: () => p(!1), children: "Cancel" })
    ] }) : null,
    /* @__PURE__ */ d.jsx(BS, {})
  ] });
}
function BS() {
  const a = wt((c) => c.gitOperationResult);
  if (!a) return null;
  const i = a.discarded_paths || a.selected_paths || [], o = Hn([
    a.stdout,
    a.stderr,
    ...(a.results || []).flatMap((c) => [c.stdout, c.stderr])
  ].filter(Boolean).join(`
`)).trim(), r = a.ok ? a.step === "discard" ? "Discarded selected files" : "Commit pushed" : `${a.step || "Git operation"} failed`;
  return /* @__PURE__ */ d.jsxs("section", { className: `git-operation-result ${a.ok ? "success" : "error"}`, children: [
    /* @__PURE__ */ d.jsx("strong", { children: r }),
    i.length ? /* @__PURE__ */ d.jsx("span", { children: HS(i) }) : null,
    o ? /* @__PURE__ */ d.jsx("pre", { children: o }) : null
  ] });
}
function HS(a) {
  const i = a.slice(0, 4).join(", "), o = a.length - 4;
  return o > 0 ? `${i} and ${o} more` : i;
}
function kS(a) {
  const i = String(a ?? "").trim();
  return i && (/^(https?:|mailto:)/i.test(i) || i.startsWith("/") || i.startsWith("#")) ? i : "";
}
function Es(a) {
  const i = [], o = /(`([^`]+)`|\[([^\]\n]+)\]\(([^)\s]+)\)|(\*\*|__)(.+?)\5|(\*|_)([^*_]+?)\7)/g;
  let r = 0, c;
  for (; (c = o.exec(a)) !== null; ) {
    if (c.index > r && i.push(a.slice(r, c.index)), c[2] !== void 0) i.push(/* @__PURE__ */ d.jsx("code", { children: c[2] }, i.length));
    else if (c[3] !== void 0) {
      const f = kS(c[4]);
      i.push(f ? /* @__PURE__ */ d.jsx("a", { href: f, target: "_blank", rel: "noreferrer", children: c[3] }, i.length) : `${c[3]} (${c[4]})`);
    } else c[6] !== void 0 ? i.push(/* @__PURE__ */ d.jsx("strong", { children: c[6] }, i.length)) : c[8] !== void 0 && i.push(/* @__PURE__ */ d.jsx("em", { children: c[8] }, i.length));
    r = o.lastIndex;
  }
  return r < a.length && i.push(a.slice(r)), i;
}
function dx({ value: a }) {
  const i = a.split(`
`), o = [];
  let r = [], c = null, f = [];
  const m = () => {
    r.length && (o.push(/* @__PURE__ */ d.jsx("p", { children: r.map((w, y) => /* @__PURE__ */ d.jsxs(ct.Fragment, { children: [
      y > 0 ? /* @__PURE__ */ d.jsx("br", {}) : null,
      Es(w)
    ] }, y)) }, o.length)), r = []);
  }, p = () => {
    if (!c) return;
    const w = c.items.map((y, C) => /* @__PURE__ */ d.jsx("li", { children: Es(y) }, C));
    o.push(c.type === "ul" ? /* @__PURE__ */ d.jsx("ul", { children: w }, o.length) : /* @__PURE__ */ d.jsx("ol", { children: w }, o.length)), c = null;
  }, g = () => {
    f.length && (o.push(/* @__PURE__ */ d.jsx("blockquote", { children: f.map((w, y) => /* @__PURE__ */ d.jsxs(ct.Fragment, { children: [
      y > 0 ? /* @__PURE__ */ d.jsx("br", {}) : null,
      Es(w)
    ] }, y)) }, o.length)), f = []);
  }, x = () => {
    m(), p(), g();
  };
  return i.forEach((w) => {
    var z;
    const y = w.trim();
    if (!y) {
      x();
      return;
    }
    const C = y.match(/^(#{1,6})\s+(.+)$/);
    if (C) {
      x();
      const A = `h${C[1].length}`;
      o.push(ct.createElement(A, { key: o.length }, Es(C[2])));
      return;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(y)) {
      x(), o.push(/* @__PURE__ */ d.jsx("hr", {}, o.length));
      return;
    }
    const E = y.match(/^>\s?(.*)$/);
    if (E) {
      m(), p(), f.push(E[1]);
      return;
    }
    const B = y.match(/^[-*+]\s+(.+)$/), M = y.match(/^\d+[.)]\s+(.+)$/);
    if (B || M) {
      m(), g();
      const A = B ? "ul" : "ol";
      (!c || c.type !== A) && p(), c || (c = { type: A, items: [] }), c.items.push(((z = B || M) == null ? void 0 : z[1]) || "");
      return;
    }
    p(), g(), r.push(w);
  }), x(), /* @__PURE__ */ d.jsx(d.Fragment, { children: o });
}
const qS = ct.memo(function({ value: i }) {
  var p;
  const o = String(i ?? "").replaceAll(`\r
`, `
`).replaceAll("\r", `
`);
  if (!o.trim()) return null;
  const r = [], c = /```([^\n`]*)\n?([\s\S]*?)```/g;
  let f = 0, m;
  for (; (m = c.exec(o)) !== null; ) {
    m.index > f && r.push(/* @__PURE__ */ d.jsx(dx, { value: o.slice(f, m.index) }, r.length));
    const g = (p = m[1]) == null ? void 0 : p.trim();
    r.push(/* @__PURE__ */ d.jsx("pre", { children: /* @__PURE__ */ d.jsx("code", { className: g ? `language-${g}` : void 0, children: m[2] || "" }) }, r.length)), f = c.lastIndex;
  }
  return f < o.length && r.push(/* @__PURE__ */ d.jsx(dx, { value: o.slice(f) }, r.length)), /* @__PURE__ */ d.jsx(d.Fragment, { children: r });
}), US = 20, Ub = [
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
function lf(a) {
  const i = Ub.find((o) => o.id === a);
  if (!i) throw new Error(`Unknown builder template: ${a}`);
  return i;
}
function Lb(a, i, o = []) {
  var f;
  const r = lf(a), c = r.fields.filter((m) => m.required && !ko(i, m.id)).map((m) => $S(m));
  return (f = r.requiredContextKinds) != null && f.length && !ZS(o, r.requiredContextKinds) && c.push("Select an automation or script as context."), c;
}
function LS(a, i, o = []) {
  const r = Lb(a, i, o);
  if (r.length) throw new Error(r.join(" "));
  const c = lf(a), f = KS(c, i), m = XS(c, i, o), p = YS(c, f, Gb(o));
  return GS(m, o, {
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
function GS(a, i, o) {
  return {
    prompt: a.trim(),
    context: Gb(i),
    runPrompt: o.runPrompt.trim(),
    metadata: o.metadata
  };
}
function QS(a) {
  const i = a == null ? void 0 : a.builder;
  if (!i || typeof i != "object" || Array.isArray(i)) return null;
  const o = i, r = String(o.template_label || "").trim(), c = Array.isArray(o.selections) ? o.selections.flatMap((f) => {
    if (!f || typeof f != "object" || Array.isArray(f)) return [];
    const m = f, p = String(m.label || "").trim(), g = String(m.value || "").trim();
    return p && g ? [{ label: p, value: g }] : [];
  }) : [];
  return r ? { label: r, selections: c } : null;
}
function YS(a, i, o) {
  const r = [
    VS(a.id),
    "",
    "Use the selected Home Assistant context and inspect the workspace before editing.",
    "Keep edits minimal and scoped to the automation, script, blueprint, or related config files needed for this request.",
    "Do not bypass existing command approvals or restart approval flow."
  ];
  return FS(a.id) && (r.push("Validate the Home Assistant YAML when possible and report the validation result."), r.push("Prefer reload recommendations for automations/scripts; recommend a Home Assistant Core restart only when required.")), o.length && (r.push("", "Selected context:"), o.forEach((c) => {
    r.push(`- ${c.kind}: ${c.label}${c.subtitle ? ` (${c.subtitle})` : ""}`);
  })), i.length && (r.push("", "Builder inputs:"), i.forEach((c) => {
    r.push(`- ${c.label}: ${c.value}`);
  })), r.push("", "After the run, surface changed files, validation status, and any reload or restart recommendation using the existing HA Codex mechanisms."), r.join(`
`);
}
function VS(a) {
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
function XS(a, i, o) {
  const r = ko(i, "goal"), c = ko(i, "source") || IS(o, a.requiredContextKinds);
  switch (a.id) {
    case "create_automation":
      return `Create automation: ${r}`;
    case "fix_automation":
      return `Fix automation: ${ko(i, "issue")}`;
    case "create_script":
      return `Create script: ${r}`;
    case "convert_blueprint":
      return `Convert to blueprint: ${c || "selected automation/script"}`;
    case "explain_simplify":
      return `Explain or simplify: ${c || "selected automation/script"}`;
  }
}
function KS(a, i) {
  return a.fields.flatMap((o) => {
    const r = ko(i, o.id);
    return r ? [{ label: o.label, value: r }] : [];
  });
}
function ZS(a, i) {
  return a.some((o) => i.includes(o.kind));
}
function Gb(a) {
  return a.slice(0, US).map((i) => ({
    id: i.id,
    kind: i.kind,
    label: i.label,
    ...i.subtitle ? { subtitle: i.subtitle } : {},
    ...i.payload ? { payload: { ...i.payload } } : {}
  }));
}
function IS(a, i) {
  const o = a.find((r) => !(i != null && i.length) || i.includes(r.kind));
  return (o == null ? void 0 : o.label) || "";
}
function ko(a, i) {
  return String(a[i] || "").trim();
}
function $S(a) {
  return a.id === "issue" ? "Describe what is broken." : `${a.label} is required.`;
}
function FS(a) {
  return a === "create_automation" || a === "fix_automation" || a === "create_script";
}
const JS = I.memo(function({ api: i, message: o, sessionId: r, canRetry: c, onCopy: f, onRetry: m, onRollback: p, onValidationReload: g }) {
  var ut, ot, vt, q, W, $, ht, rt, _, Q;
  const x = o.content || "", w = String(((ut = o.metadata) == null ? void 0 : ut.kind) || "") === "error", y = !!Lx(o), C = Array.isArray((ot = o.metadata) == null ? void 0 : ot.file_changes) ? o.metadata.file_changes : [], E = u1(s1(x), C) || (w ? s2(o) : "") || (y ? "Codex needs direction before continuing." : ""), B = String(((vt = o.metadata) == null ? void 0 : vt.kind) || o.role || "message"), M = o.role === "event" && !!((q = o.metadata) != null && q.command), z = M ? "command" : o.role === "event" ? "response" : o.role || "message", A = { user: "mdi:account-circle", assistant: "mdi:robot", event: "mdi:progress-wrench", system: "mdi:information-outline" }[String(o.role)] || "mdi:message-text-outline", O = { user: "message-row-user", assistant: "message-row-codex" }[String(o.role)] || "", k = {
    user: "message-style-user",
    assistant: "message-style-codex",
    event: "message-style-event",
    system: "message-style-system",
    action: "message-style-action"
  }[String(((W = o.metadata) == null ? void 0 : W.kind) || o.role)] || "", v = w ? "message-style-error" : M ? "message-style-command" : k, T = c && w, N = WS(o), S = v1(o.metadata), D = QS(o.metadata), Y = wt((X) => X.settings.defaults.tool_visibility), F = qt((X) => {
    var it, pt, St;
    return (St = (pt = (it = X.chatsById[r]) == null ? void 0 : it.metadata) == null ? void 0 : pt.run_settings) == null ? void 0 : St.tool_visibility;
  }), et = PS(o, F || Y), st = C.length === 0;
  if (M) {
    const X = String((($ = o.metadata) == null ? void 0 : $.command) || E);
    return /* @__PURE__ */ d.jsx("div", { className: `message-row ${O || "message-row-center"}`, children: /* @__PURE__ */ d.jsxs("article", { className: `message ${o.role || ""} ${v} ${B} tool-visibility-${et}`, children: [
      /* @__PURE__ */ d.jsxs("div", { className: "command-line", children: [
        /* @__PURE__ */ d.jsx("code", { className: "command-text", children: X }),
        N,
        /* @__PURE__ */ d.jsx("button", { className: "icon-button copy-button", onClick: () => f(X), title: "Copy", "aria-label": "Copy command", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:content-copy" }) })
      ] }),
      /* @__PURE__ */ d.jsx(fx, { raw: (ht = o.metadata) == null ? void 0 : ht.raw, visible: et === "verbose" })
    ] }) });
  }
  return /* @__PURE__ */ d.jsx("div", { className: `message-row ${O || "message-row-center"}`, children: /* @__PURE__ */ d.jsxs("article", { className: `message ${o.role || ""} ${v} ${B} tool-visibility-${et}`, children: [
    /* @__PURE__ */ d.jsxs("div", { className: "role", children: [
      /* @__PURE__ */ d.jsx(ft, { icon: A }),
      /* @__PURE__ */ d.jsx("span", { children: z }),
      N
    ] }),
    /* @__PURE__ */ d.jsx("div", { className: "markdown-body", children: /* @__PURE__ */ d.jsx(qS, { value: E }) }),
    /* @__PURE__ */ d.jsx(e2, { summary: D }),
    /* @__PURE__ */ d.jsx(n2, { attachments: S }),
    /* @__PURE__ */ d.jsx(t2, { validation: (rt = o.metadata) == null ? void 0 : rt.validation, onReloadDomains: g }),
    /* @__PURE__ */ d.jsx(i2, { api: i, changes: C }),
    /* @__PURE__ */ d.jsx(a2, { sessionId: r, rollback: (_ = o.metadata) == null ? void 0 : _.rollback, onRollback: p }),
    /* @__PURE__ */ d.jsx(fx, { raw: (Q = o.metadata) == null ? void 0 : Q.raw, visible: et === "verbose" }),
    st ? /* @__PURE__ */ d.jsx("button", { className: "icon-button copy-button", onClick: () => f(E), title: "Copy", "aria-label": "Copy message", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:content-copy" }) }) : null,
    T ? /* @__PURE__ */ d.jsx("button", { className: "icon-button retry-button", onClick: () => m(r), title: "Retry / continue", "aria-label": "Retry / continue", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:refresh" }) }) : null
  ] }) });
});
function WS(a) {
  return a.created_at ? /* @__PURE__ */ d.jsx("span", { className: "message-time", title: ks(a.created_at), children: nr(a.created_at) }) : null;
}
function PS(a, i) {
  var c, f;
  const o = (f = (c = a.metadata) == null ? void 0 : c.run_settings) == null ? void 0 : f.resolved, r = (o == null ? void 0 : o.tool_visibility) || i;
  return r === "compact" || r === "verbose" ? r : "normal";
}
function fx({ raw: a, visible: i }) {
  return !i || !a ? null : /* @__PURE__ */ d.jsxs("details", { className: "raw-event-details", children: [
    /* @__PURE__ */ d.jsx("summary", { children: "Raw event" }),
    /* @__PURE__ */ d.jsx("pre", { children: JSON.stringify(a, null, 2) })
  ] });
}
function t2({ validation: a, onReloadDomains: i }) {
  return a ? /* @__PURE__ */ d.jsx(zS, { validation: a, onReloadDomains: i, compact: !0 }) : null;
}
function e2({ summary: a }) {
  return a ? /* @__PURE__ */ d.jsxs("div", { className: "message-builder-summary", "aria-label": "Builder mode", children: [
    /* @__PURE__ */ d.jsxs("span", { className: "message-builder-chip strong", children: [
      /* @__PURE__ */ d.jsx(ft, { icon: "mdi:robot-industrial-outline" }),
      a.label
    ] }),
    a.selections.slice(0, 4).map((i) => /* @__PURE__ */ d.jsxs("span", { className: "message-builder-chip", children: [
      /* @__PURE__ */ d.jsx("b", { children: i.label }),
      /* @__PURE__ */ d.jsx("span", { children: i.value })
    ] }, `${i.label}:${i.value}`))
  ] }) : null;
}
function n2({ attachments: a }) {
  return a.length ? /* @__PURE__ */ d.jsx("div", { className: "message-context-attachments", "aria-label": "Attached context", children: a.map((i) => /* @__PURE__ */ d.jsxs("span", { className: "message-context-chip", title: i.subtitle || i.label, children: [
    /* @__PURE__ */ d.jsx(ft, { icon: Qx(i.kind) }),
    /* @__PURE__ */ d.jsx("span", { children: i.label })
  ] }, `${i.kind}:${i.id}`)) }) : null;
}
function a2({ sessionId: a, rollback: i, onRollback: o }) {
  return i != null && i.checkpoint_id ? i.status === "available" ? /* @__PURE__ */ d.jsx("div", { className: "rollback-action", children: /* @__PURE__ */ d.jsxs("button", { type: "button", className: "danger", onClick: () => o(a, i.checkpoint_id || ""), children: [
    /* @__PURE__ */ d.jsx(ft, { icon: "mdi:restore" }),
    /* @__PURE__ */ d.jsx("span", { children: "Rollback this run" })
  ] }) }) : i.status === "rolled_back" ? /* @__PURE__ */ d.jsxs("div", { className: "rollback-note", children: [
    /* @__PURE__ */ d.jsx(ft, { icon: "mdi:check-circle-outline" }),
    /* @__PURE__ */ d.jsx("span", { children: "Run rolled back" })
  ] }) : i.status === "blocked" ? /* @__PURE__ */ d.jsxs("div", { className: "rollback-note blocked", children: [
    /* @__PURE__ */ d.jsx(ft, { icon: "mdi:alert-circle-outline" }),
    /* @__PURE__ */ d.jsx("span", { children: i.reason || "Rollback needs manual review" })
  ] }) : null : null;
}
const hx = 6;
function i2({ api: a, changes: i }) {
  const [o, r] = I.useState(!1), [c, f] = I.useState(null);
  if (I.useEffect(() => {
    if (!i.length) {
      f(null);
      return;
    }
    let x = !1;
    return a.gitChanges().then((w) => {
      x || f(w.files || []);
    }).catch(() => {
      x || f([]);
    }), () => {
      x = !0;
    };
  }, [a, i]), !i.length) return null;
  const m = l2(i, c), p = o ? m : m.slice(0, hx), g = Math.max(0, m.length - p.length);
  return /* @__PURE__ */ d.jsxs("div", { className: "message-file-changes", children: [
    /* @__PURE__ */ d.jsx("div", { className: "message-file-changes-head", children: /* @__PURE__ */ d.jsxs("span", { children: [
      m.length,
      " changed ",
      m.length === 1 ? "file" : "files"
    ] }) }),
    p.map((x) => /* @__PURE__ */ d.jsx(r2, { api: a, file: x }, `${x.old_path || ""}:${x.path}`)),
    m.length > hx ? /* @__PURE__ */ d.jsx("div", { className: "message-file-changes-toggle", children: /* @__PURE__ */ d.jsxs("button", { type: "button", className: "secondary", onClick: () => r((x) => !x), children: [
      /* @__PURE__ */ d.jsx(ft, { icon: o ? "mdi:chevron-up" : "mdi:chevron-down" }),
      /* @__PURE__ */ d.jsx("span", { children: o ? "Show fewer" : `Show ${g} more` })
    ] }) }) : null
  ] });
}
function l2(a, i) {
  const o = /* @__PURE__ */ new Map();
  return (i || []).forEach((r) => {
    o.set(mx(r.path, r.old_path), r);
  }), a.map((r) => {
    const c = o.get(mx(r.path, r.old_path));
    return c ? { ...r, ...c, path: c.path || r.path, old_path: c.old_path || r.old_path } : r;
  }).filter((r) => !o2(r.path));
}
function mx(a, i = "") {
  return xa(Dd(a), Dd(i));
}
function Dd(a = "") {
  return String(a || "").replace(/\\/g, "/").replace(/^\/+/, "").replace(/^homeassistant\//, "").replace(/^config\//, "");
}
function o2(a) {
  return Dd(a).split("/").includes("dist");
}
function r2({ api: a, file: i }) {
  const [o, r] = I.useState(!1), [c, f] = I.useState(i.patch ? i : null), [m, p] = I.useState(!1), g = wt((y) => y.showToast), x = c ? { ...i, ...c, path: c.path || i.path, old_path: c.old_path || i.old_path } : i;
  I.useEffect(() => {
    if (c || m) return;
    let y = !1;
    return p(!0), a.gitFileDiff(i.path, i.old_path || "").then((C) => {
      y || f(C);
    }).catch((C) => {
      y || f({ ...i, patch: "", patch_error: ne(C) });
    }).finally(() => {
      y || p(!1);
    }), () => {
      y = !0;
    };
  }, [a, i.path, i.old_path]);
  const w = () => {
    const y = !o;
    r(y), !(!y || c || m) && (p(!0), a.gitFileDiff(i.path, i.old_path || "").then((C) => f(C)).catch((C) => {
      const E = ne(C);
      f({ ...i, patch: "", patch_error: E }), g(`Diff load failed: ${E}`, "error");
    }).finally(() => p(!1)));
  };
  return /* @__PURE__ */ d.jsx(
    qb,
    {
      file: x,
      open: o,
      diff: c,
      loading: m,
      selectable: !1,
      displayPath: "path",
      onToggleFile: w
    }
  );
}
function s2(a) {
  var o, r, c;
  const i = ((o = a.metadata) == null ? void 0 : o.error) || ((r = a.metadata) == null ? void 0 : r.stderr) || ((c = a.metadata) == null ? void 0 : c.message);
  return i ? String(i).trim() : "Codex reported an error without additional details.";
}
const Qb = [
  { kind: "entity", label: "Entities", icon: "mdi:home-assistant" },
  { kind: "device", label: "Devices", icon: "mdi:devices" },
  { kind: "area", label: "Areas", icon: "mdi:floor-plan" },
  { kind: "automation", label: "Automations", icon: "mdi:robot-industrial-outline" },
  { kind: "script", label: "Scripts", icon: "mdi:script-text-outline" },
  { kind: "log", label: "Logs", icon: "mdi:text-box-search-outline" },
  { kind: "config_file", label: "Config files", icon: "mdi:file-document-outline" }
];
function u2(a) {
  const { api: i, hass: o, open: r, selected: c, onAdd: f, onRemove: m, onClear: p, onClose: g } = a, [x, w] = I.useState("entity"), [y, C] = I.useState(""), [E, B] = I.useState([]), [M, z] = I.useState([]), [A, O] = I.useState([]), [k, v] = I.useState([]), [T, N] = I.useState([]), [S, D] = I.useState(!1), [Y, F] = I.useState([]), [et, st] = I.useState(null), ut = I.useMemo(() => new Set(c.map(ti)), [c]);
  I.useEffect(() => {
    if (!r) return;
    let $ = !1;
    return D(!0), F([]), Promise.allSettled([
      i.entityRegistry(),
      i.deviceRegistry(),
      i.areaRegistry(),
      i.contextLogs(200),
      i.contextConfigFiles()
    ]).then((ht) => {
      if ($) return;
      const rt = [], [_, Q, X, it, pt] = ht;
      _.status === "fulfilled" ? B(_.value || []) : rt.push(`Entity registry: ${ne(_.reason)}`), Q.status === "fulfilled" ? z(Q.value || []) : rt.push(`Device registry: ${ne(Q.reason)}`), X.status === "fulfilled" ? O(X.value || []) : rt.push(`Area registry: ${ne(X.reason)}`), it.status === "fulfilled" ? v(it.value.logs || []) : rt.push(`Logs: ${ne(it.reason)}`), pt.status === "fulfilled" ? N(pt.value.files || []) : rt.push(`Config files: ${ne(pt.reason)}`), F(rt), D(!1);
    }), () => {
      $ = !0;
    };
  }, [i, r]), I.useEffect(() => {
    r || C("");
  }, [r]), I.useEffect(() => {
    if (!r) return;
    const $ = (ht) => {
      ht.key === "Escape" && g();
    };
    return window.addEventListener("keydown", $), () => window.removeEventListener("keydown", $);
  }, [g, r]);
  const ot = I.useMemo(() => {
    const $ = new Map(A.map((X) => [X.area_id, X])), ht = new Map(M.map((X) => [X.id, X])), rt = new Map(E.map((X) => [X.entity_id, X])), _ = (o == null ? void 0 : o.states) || {}, Q = Object.entries(_).map(([X, it]) => d2(X, it, rt, ht, $));
    return {
      entity: Q.filter((X) => {
        var pt;
        const it = String(((pt = X.payload) == null ? void 0 : pt.domain) || "");
        return it !== "automation" && it !== "script";
      }),
      automation: Q.filter((X) => {
        var it;
        return ((it = X.payload) == null ? void 0 : it.domain) === "automation";
      }).map((X) => ({ ...X, kind: "automation", id: `automation:${X.id}` })),
      script: Q.filter((X) => {
        var it;
        return ((it = X.payload) == null ? void 0 : it.domain) === "script";
      }).map((X) => ({ ...X, kind: "script", id: `script:${X.id}` })),
      device: M.map((X) => f2(X, $)),
      area: A.map(h2),
      log: k.map(m2),
      config_file: T.map(p2)
    };
  }, [A, T, M, E, o == null ? void 0 : o.states, k]), vt = I.useMemo(() => {
    const $ = y.trim().toLowerCase(), ht = ot[x] || [];
    return $ ? ht.filter((rt) => [rt.label, rt.subtitle, rt.id].some((_) => String(_ || "").toLowerCase().includes($))) : ht;
  }, [x, ot, y]);
  if (!r) return null;
  const q = c.length >= Qo, W = async ($) => {
    var _;
    const ht = ti($);
    if (ut.has(ht)) {
      m(ht);
      return;
    }
    if (q) return;
    if ($.kind !== "config_file") {
      f($);
      return;
    }
    const rt = String(((_ = $.payload) == null ? void 0 : _.path) || $.id);
    st(rt);
    try {
      const Q = await i.contextConfigFile(rt);
      f({
        ...$,
        subtitle: `${Vb(Q.size || 0)}${Q.truncated ? " truncated" : ""}`,
        payload: {
          path: Q.path,
          size: Q.size,
          modified: Q.modified,
          content: Q.content,
          truncated: !!Q.truncated
        }
      });
    } catch (Q) {
      F((X) => [`Config file ${rt}: ${ne(Q)}`, ...X].slice(0, 4));
    } finally {
      st(null);
    }
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "modal-backdrop context-modal-backdrop", role: "presentation", children: [
    /* @__PURE__ */ d.jsx("button", { className: "modal-scrim", type: "button", onClick: g, "aria-label": "Close context picker" }),
    /* @__PURE__ */ d.jsxs("section", { className: "modal context-modal", role: "dialog", "aria-modal": "true", "aria-label": "Add context", children: [
      /* @__PURE__ */ d.jsxs("header", { className: "modal-header", children: [
        /* @__PURE__ */ d.jsx("h2", { children: "Add context" }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", type: "button", onClick: g, title: "Close", "aria-label": "Close context picker", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:close" }) })
      ] }),
      /* @__PURE__ */ d.jsx("nav", { className: "modal-tabs context-tabs", "aria-label": "Context type", children: Qb.map(($) => /* @__PURE__ */ d.jsxs("button", { className: x === $.kind ? "active" : "", type: "button", onClick: () => w($.kind), children: [
        /* @__PURE__ */ d.jsx(ft, { icon: $.icon }),
        /* @__PURE__ */ d.jsx("span", { children: $.label })
      ] }, $.kind)) }),
      /* @__PURE__ */ d.jsxs("div", { className: "context-toolbar", children: [
        /* @__PURE__ */ d.jsx("input", { value: y, onChange: ($) => C($.target.value), placeholder: "Search", "aria-label": "Search context" }),
        /* @__PURE__ */ d.jsxs("span", { children: [
          c.length,
          "/",
          Qo
        ] }),
        c.length ? /* @__PURE__ */ d.jsx("button", { className: "ghost", type: "button", onClick: p, children: "Clear" }) : null
      ] }),
      Y.length ? /* @__PURE__ */ d.jsx("div", { className: "context-errors", role: "status", children: Y.slice(0, 3).map(($) => /* @__PURE__ */ d.jsx("p", { children: $ }, $)) }) : null,
      /* @__PURE__ */ d.jsx("div", { className: "context-list", "aria-busy": S, children: S ? /* @__PURE__ */ d.jsx("div", { className: "context-empty", children: "Loading" }) : vt.length ? vt.map(($) => {
        var X;
        const ht = ti($), rt = ut.has(ht), _ = !rt && q, Q = et === ((X = $.payload) == null ? void 0 : X.path);
        return /* @__PURE__ */ d.jsxs(
          "button",
          {
            className: `context-row ${rt ? "selected" : ""}`,
            disabled: _ || Q,
            type: "button",
            onClick: () => void W($),
            children: [
              /* @__PURE__ */ d.jsx("span", { className: "context-checkbox", "aria-hidden": "true", children: rt ? /* @__PURE__ */ d.jsx(ft, { icon: "mdi:check" }) : null }),
              /* @__PURE__ */ d.jsx(ft, { className: "context-kind-icon", icon: Yb($.kind) }),
              /* @__PURE__ */ d.jsxs("span", { className: "context-row-main", children: [
                /* @__PURE__ */ d.jsx("strong", { children: $.label }),
                $.subtitle ? /* @__PURE__ */ d.jsx("small", { children: $.subtitle }) : null
              ] }),
              Q ? /* @__PURE__ */ d.jsx("span", { className: "context-row-status", children: "Loading" }) : null
            ]
          },
          ht
        );
      }) : /* @__PURE__ */ d.jsx("div", { className: "context-empty", children: "No matches" }) })
    ] })
  ] });
}
function c2({ items: a, onRemove: i, onClear: o }) {
  return a.length ? /* @__PURE__ */ d.jsxs("div", { className: "context-chips", "aria-label": "Selected context", children: [
    a.map((r) => /* @__PURE__ */ d.jsxs("button", { className: "context-chip", type: "button", onClick: () => i(ti(r)), title: r.subtitle || r.label, children: [
      /* @__PURE__ */ d.jsx(ft, { icon: Yb(r.kind) }),
      /* @__PURE__ */ d.jsx("span", { children: r.label }),
      /* @__PURE__ */ d.jsx(ft, { icon: "mdi:close" })
    ] }, ti(r))),
    /* @__PURE__ */ d.jsx("button", { className: "context-clear", type: "button", onClick: o, children: "Clear" })
  ] }) : null;
}
function d2(a, i, o, r, c) {
  const f = o.get(a), m = f != null && f.device_id ? r.get(f.device_id) : void 0, p = (f == null ? void 0 : f.area_id) || (m == null ? void 0 : m.area_id) || null, g = p ? c.get(p) : void 0, x = g2(i.attributes || {}), w = String(x.friendly_name || (f == null ? void 0 : f.name) || (f == null ? void 0 : f.original_name) || a), y = a.split(".")[0] || "entity", C = i.state ? `state ${i.state}` : "unknown", E = [a, C, g == null ? void 0 : g.name, Od(m)].filter(Boolean).join(" - ");
  return {
    id: a,
    kind: "entity",
    label: w,
    subtitle: E,
    payload: {
      entity_id: a,
      domain: y,
      state: i.state,
      friendly_name: w,
      area: (g == null ? void 0 : g.name) || null,
      device: Od(m) || null,
      attributes: x,
      last_changed: i.last_changed,
      last_updated: i.last_updated
    }
  };
}
function f2(a, i) {
  const o = Od(a) || a.id, r = a.area_id ? i.get(a.area_id) : void 0;
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
function h2(a) {
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
function m2(a) {
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
function p2(a) {
  return {
    id: a.path,
    kind: "config_file",
    label: a.path.split("/").pop() || a.path,
    subtitle: `${a.path} - ${Vb(a.size || 0)}`,
    payload: {
      path: a.path,
      size: a.size,
      modified: a.modified
    }
  };
}
function g2(a) {
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
function Od(a) {
  return String((a == null ? void 0 : a.name_by_user) || (a == null ? void 0 : a.name) || "").trim();
}
function Yb(a) {
  var i;
  return ((i = Qb.find((o) => o.kind === a)) == null ? void 0 : i.icon) || "mdi:plus";
}
function Vb(a) {
  return !Number.isFinite(a) || a <= 0 ? "0 B" : a < 1024 ? `${a} B` : a < 1024 * 1024 ? `${Math.round(a / 102.4) / 10} KB` : `${Math.round(a / 1024 / 102.4) / 10} MB`;
}
function x2({ open: a, hass: i, contextItems: o, onClose: r, onSubmit: c }) {
  const [f, m] = I.useState("create_automation"), [p, g] = I.useState({}), [x, w] = I.useState(!1), [y, C] = I.useState({}), E = lf(f), B = I.useMemo(() => Lb(f, p, o), [o, f, p]), M = I.useMemo(() => _2((i == null ? void 0 : i.states) || {}), [i == null ? void 0 : i.states]), z = I.useMemo(() => j2(y), [y]), A = I.useMemo(() => z.filter((T) => T.domain === "notify"), [z]), O = f === "create_automation";
  if (I.useEffect(() => {
    if (!a || !i) return;
    let T = !1;
    return i.callWS({ type: "get_services" }).then((N) => {
      T || C(N || {});
    }).catch(() => {
      T || C({});
    }), () => {
      T = !0;
    };
  }, [i, a]), !a) return null;
  const k = (T, N) => g((S) => ({ ...S, [T]: N })), v = (T) => {
    m(T), g({}), w(!1);
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "modal-backdrop builder-modal-backdrop", role: "presentation", children: [
    /* @__PURE__ */ d.jsx("button", { className: "modal-scrim", type: "button", onClick: r, "aria-label": "Close builder" }),
    /* @__PURE__ */ d.jsxs("section", { className: `modal builder-modal ${O ? "builder-modal-simple" : ""}`, role: "dialog", "aria-modal": "true", "aria-label": "Automation and script builder", children: [
      /* @__PURE__ */ d.jsxs("header", { className: "modal-header", children: [
        /* @__PURE__ */ d.jsx("h2", { children: "Automation builder" }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", type: "button", onClick: r, title: "Close", "aria-label": "Close builder", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:close" }) })
      ] }),
      /* @__PURE__ */ d.jsx("nav", { className: "modal-tabs builder-tabs", "aria-label": "Builder mode", children: Ub.map((T) => /* @__PURE__ */ d.jsxs("button", { className: f === T.id ? "active" : "", type: "button", onClick: () => v(T.id), children: [
        /* @__PURE__ */ d.jsx(ft, { icon: T.icon }),
        /* @__PURE__ */ d.jsx("span", { children: T.label })
      ] }, T.id)) }),
      /* @__PURE__ */ d.jsxs("form", { className: "builder-form", onSubmit: (T) => {
        T.preventDefault(), w(!0), !B.length && (c(LS(f, p, o)), g({}), w(!1));
      }, children: [
        /* @__PURE__ */ d.jsxs("div", { className: `builder-scroll ${O ? "builder-scroll-simple" : ""}`, children: [
          x && B.length ? /* @__PURE__ */ d.jsx("div", { className: "builder-errors", role: "status", children: B.map((T) => /* @__PURE__ */ d.jsx("p", { children: T }, T)) }) : null,
          /* @__PURE__ */ d.jsx("div", { className: `builder-fields ${O ? "builder-fields-simple" : ""}`, children: E.fields.map((T) => {
            var N;
            return /* @__PURE__ */ d.jsxs("div", { className: `builder-field ${O || T.multiline || ((N = T.control) == null ? void 0 : N.type) === "action" ? "wide" : ""}`, children: [
              /* @__PURE__ */ d.jsxs("span", { children: [
                T.label,
                T.required ? " *" : ""
              ] }),
              /* @__PURE__ */ d.jsx(
                b2,
                {
                  field: T,
                  entityOptions: M,
                  serviceOptions: z,
                  notifyServiceOptions: A,
                  value: p[T.id] || "",
                  onChange: (S) => k(T.id, S)
                }
              )
            ] }, `${E.id}:${T.id}`);
          }) }),
          /* @__PURE__ */ d.jsxs("div", { className: "builder-context", "aria-label": "Builder context", children: [
            /* @__PURE__ */ d.jsx("span", { children: "Context" }),
            /* @__PURE__ */ d.jsxs("div", { className: "builder-context-list", children: [
              o.length ? o.slice(0, 6).map((T) => /* @__PURE__ */ d.jsxs("span", { className: "builder-context-chip", title: T.subtitle || T.label, children: [
                /* @__PURE__ */ d.jsx(ft, { icon: Qx(T.kind) }),
                T.label
              ] }, `${T.kind}:${T.id}`)) : /* @__PURE__ */ d.jsx("span", { className: "builder-context-empty", children: "None selected" }),
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
            /* @__PURE__ */ d.jsx(ft, { icon: E.icon }),
            /* @__PURE__ */ d.jsx("span", { children: E.label })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function b2({ field: a, entityOptions: i, serviceOptions: o, notifyServiceOptions: r, value: c, onChange: f }) {
  const m = a.control;
  return (m == null ? void 0 : m.type) === "entity" ? /* @__PURE__ */ d.jsx(
    Jo,
    {
      label: a.label,
      placeholder: a.placeholder,
      options: i,
      selector: m,
      value: c,
      onChange: f
    }
  ) : (m == null ? void 0 : m.type) === "select" ? /* @__PURE__ */ d.jsx(v2, { ariaLabel: a.label, options: m.options, placeholder: a.placeholder, value: c, onChange: f }) : (m == null ? void 0 : m.type) === "trigger" ? /* @__PURE__ */ d.jsx(y2, { entityOptions: i, value: c, onChange: f }) : (m == null ? void 0 : m.type) === "condition" ? /* @__PURE__ */ d.jsx(w2, { entityOptions: i, value: c, onChange: f }) : (m == null ? void 0 : m.type) === "action" ? /* @__PURE__ */ d.jsx(S2, { entityOptions: i, serviceOptions: o, notifyServiceOptions: r, value: c, onChange: f }) : (m == null ? void 0 : m.type) === "notification" ? /* @__PURE__ */ d.jsx(C2, { serviceOptions: r, value: c, onChange: f }) : a.multiline ? /* @__PURE__ */ d.jsx(
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
function v2({ ariaLabel: a, options: i, placeholder: o, value: r, onChange: c }) {
  return /* @__PURE__ */ d.jsxs("select", { "aria-label": a, value: r, onChange: (f) => c(f.currentTarget.value), children: [
    /* @__PURE__ */ d.jsx("option", { value: "", children: o || "Select" }),
    i.map((f) => /* @__PURE__ */ d.jsx("option", { value: f.value, children: f.label }, f.value))
  ] });
}
function y2({ entityOptions: a, value: i, onChange: o }) {
  const [r, c] = I.useState("State"), [f, m] = I.useState(""), [p, g] = I.useState("on"), x = r === "Numeric state" ? ["sensor", "number", "input_number"] : void 0, w = (y = r, C = f, E = p) => {
    o(A2(y, C, E));
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "builder-compound", children: [
    /* @__PURE__ */ d.jsxs("select", { value: r, "aria-label": "Trigger type", onChange: (y) => {
      const C = y.currentTarget.value;
      c(C), w(C);
    }, children: [
      /* @__PURE__ */ d.jsx("option", { children: "State" }),
      /* @__PURE__ */ d.jsx("option", { children: "Numeric state" }),
      /* @__PURE__ */ d.jsx("option", { children: "Time" }),
      /* @__PURE__ */ d.jsx("option", { children: "Sun" }),
      /* @__PURE__ */ d.jsx("option", { children: "Event" })
    ] }),
    r === "State" || r === "Numeric state" ? /* @__PURE__ */ d.jsx(
      Jo,
      {
        label: "Trigger entity",
        placeholder: "Search trigger entity",
        options: a,
        selector: { domains: x },
        value: f,
        onChange: (y) => {
          m(y), w(r, y);
        }
      }
    ) : null,
    /* @__PURE__ */ d.jsx(
      "input",
      {
        value: p,
        placeholder: N2(r),
        onChange: (y) => {
          const C = y.currentTarget.value;
          g(C), w(r, f, C);
        }
      }
    ),
    /* @__PURE__ */ d.jsx("small", { children: i || "No trigger selected" })
  ] });
}
function w2({ entityOptions: a, value: i, onChange: o }) {
  const [r, c] = I.useState("None"), [f, m] = I.useState(""), [p, g] = I.useState(""), x = (w = r, y = f, C = p) => {
    o(E2(w, y, C));
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "builder-compound", children: [
    /* @__PURE__ */ d.jsxs("select", { value: r, "aria-label": "Condition type", onChange: (w) => {
      const y = w.currentTarget.value;
      c(y), x(y);
    }, children: [
      /* @__PURE__ */ d.jsx("option", { children: "None" }),
      /* @__PURE__ */ d.jsx("option", { children: "State" }),
      /* @__PURE__ */ d.jsx("option", { children: "Numeric state" }),
      /* @__PURE__ */ d.jsx("option", { children: "Time" }),
      /* @__PURE__ */ d.jsx("option", { children: "Sun" }),
      /* @__PURE__ */ d.jsx("option", { children: "Template" })
    ] }),
    r === "State" || r === "Numeric state" ? /* @__PURE__ */ d.jsx(
      Jo,
      {
        label: "Condition entity",
        placeholder: "Search condition entity",
        options: a,
        selector: { domains: r === "Numeric state" ? ["sensor", "number", "input_number"] : void 0 },
        value: f,
        onChange: (w) => {
          m(w), x(r, w);
        }
      }
    ) : null,
    r !== "None" ? /* @__PURE__ */ d.jsx(
      "input",
      {
        value: p,
        placeholder: M2(r),
        onChange: (w) => {
          const y = w.currentTarget.value;
          g(y), x(r, f, y);
        }
      }
    ) : null,
    /* @__PURE__ */ d.jsx("small", { children: i || "No condition" })
  ] });
}
function S2({ entityOptions: a, serviceOptions: i, notifyServiceOptions: o, value: r, onChange: c }) {
  const [f, m] = I.useState("Call service"), [p, g] = I.useState(""), [x, w] = I.useState(""), [y, C] = I.useState(""), E = f === "Notify" ? o : i, B = (M = f, z = p, A = x, O = y) => {
    c(R2(M, z, A, O));
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "builder-compound action", children: [
    /* @__PURE__ */ d.jsxs("select", { value: f, "aria-label": "Action type", onChange: (M) => {
      const z = M.currentTarget.value;
      m(z), B(z);
    }, children: [
      /* @__PURE__ */ d.jsx("option", { children: "Call service" }),
      /* @__PURE__ */ d.jsx("option", { children: "Activate scene" }),
      /* @__PURE__ */ d.jsx("option", { children: "Notify" }),
      /* @__PURE__ */ d.jsx("option", { children: "Delay" }),
      /* @__PURE__ */ d.jsx("option", { children: "Wait for trigger" })
    ] }),
    f === "Call service" || f === "Notify" ? /* @__PURE__ */ d.jsx(
      Xb,
      {
        label: "Service",
        options: E,
        placeholder: f === "Notify" ? "Search notify service" : "Search service",
        value: p,
        onChange: (M) => {
          g(M), B(f, M);
        }
      }
    ) : null,
    f === "Call service" ? /* @__PURE__ */ d.jsx(
      Jo,
      {
        label: "Action targets",
        placeholder: "Search target entities",
        options: a,
        selector: { domains: O2(p), multiple: !0 },
        value: x,
        onChange: (M) => {
          w(M), B(f, p, M);
        }
      }
    ) : null,
    f === "Activate scene" ? /* @__PURE__ */ d.jsx(
      Jo,
      {
        label: "Scene",
        placeholder: "Search scene",
        options: a,
        selector: { domains: ["scene"] },
        value: x,
        onChange: (M) => {
          w(M), B(f, p, M);
        }
      }
    ) : null,
    /* @__PURE__ */ d.jsx(
      "textarea",
      {
        value: y,
        placeholder: D2(f),
        rows: 2,
        onChange: (M) => {
          const z = M.currentTarget.value;
          C(z), B(f, p, x, z);
        }
      }
    ),
    /* @__PURE__ */ d.jsx("small", { children: r || "No action selected" })
  ] });
}
function C2({ serviceOptions: a, value: i, onChange: o }) {
  const [r, c] = I.useState(""), [f, m] = I.useState(""), p = (g = r, x = f) => {
    o(g || x ? `Notify using ${g || "selected notify service"}${x ? `: ${x}` : ""}` : "");
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "builder-compound", children: [
    /* @__PURE__ */ d.jsx(
      Xb,
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
function Jo({ label: a, placeholder: i, options: o, selector: r, value: c, onChange: f }) {
  const [m, p] = I.useState(""), [g, x] = I.useState(!1), w = z2(c), y = I.useMemo(() => {
    const B = r.domains ? new Set(r.domains) : null, M = new Set(r.multiple ? w : []);
    return o.filter((z) => B && !B.has(Kb(z.entityId)) ? !1 : !M.has(z.entityId));
  }, [o, w, r.domains, r.multiple]), C = I.useMemo(() => {
    const B = (r.multiple ? m : m || c).trim().toLowerCase();
    return (B ? y.filter((z) => z.searchText.includes(B)) : y).slice(0, 10);
  }, [y, m, r.multiple, c]), E = (B) => {
    if (r.multiple) {
      const M = [...w, B];
      f(M.join(", ")), p(""), x(!1);
      return;
    }
    f(B), p(""), x(!1);
  };
  return r.multiple ? /* @__PURE__ */ d.jsxs("div", { className: "entity-combobox", children: [
    w.length ? /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-chips", children: w.map((B) => /* @__PURE__ */ d.jsxs(
      "button",
      {
        "aria-label": `Remove ${B}`,
        className: "entity-combobox-chip",
        type: "button",
        onClick: () => f(w.filter((M) => M !== B).join(", ")),
        children: [
          /* @__PURE__ */ d.jsx("span", { children: B }),
          /* @__PURE__ */ d.jsx(ft, { icon: "mdi:close" })
        ]
      },
      B
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
        onChange: (B) => {
          p(B.currentTarget.value), x(!0);
        },
        onFocus: () => x(!0),
        onKeyDown: (B) => {
          B.key === "Enter" && C[0] && (B.preventDefault(), E(C[0].entityId));
        }
      }
    ),
    g ? /* @__PURE__ */ d.jsx(px, { options: C, onSelect: E }) : null
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
        onChange: (B) => {
          p(B.currentTarget.value), f(B.currentTarget.value), x(!0);
        },
        onFocus: () => x(!0),
        onKeyDown: (B) => {
          B.key === "Enter" && C[0] && (B.preventDefault(), E(C[0].entityId));
        }
      }
    ),
    g ? /* @__PURE__ */ d.jsx(px, { options: C, onSelect: E }) : null
  ] });
}
function Xb({ label: a, options: i, placeholder: o, value: r, onChange: c }) {
  const [f, m] = I.useState(""), [p, g] = I.useState(!1), x = I.useMemo(() => {
    const y = (f || r).trim().toLowerCase();
    return (y ? i.filter((E) => E.searchText.includes(y)) : i).slice(0, 10);
  }, [i, f, r]), w = (y) => {
    c(y), m(""), g(!1);
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
        onChange: (y) => {
          m(y.currentTarget.value), c(y.currentTarget.value), g(!0);
        },
        onFocus: () => g(!0),
        onKeyDown: (y) => {
          y.key === "Enter" && x[0] && (y.preventDefault(), w(x[0].serviceId));
        }
      }
    ),
    p ? /* @__PURE__ */ d.jsx(T2, { options: x, onSelect: w }) : null
  ] });
}
function T2({ options: a, onSelect: i }) {
  return /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-menu", role: "listbox", children: a.length ? a.map((o) => /* @__PURE__ */ d.jsxs("button", { type: "button", role: "option", onMouseDown: (r) => r.preventDefault(), onClick: () => i(o.serviceId), children: [
    /* @__PURE__ */ d.jsx("strong", { children: o.label }),
    /* @__PURE__ */ d.jsx("small", { children: o.serviceId })
  ] }, o.serviceId)) : /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-empty", children: "No matches" }) });
}
function px({ options: a, onSelect: i }) {
  return /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-menu", role: "listbox", children: a.length ? a.map((o) => /* @__PURE__ */ d.jsxs("button", { type: "button", role: "option", onMouseDown: (r) => r.preventDefault(), onClick: () => i(o.entityId), children: [
    /* @__PURE__ */ d.jsx("strong", { children: o.label }),
    /* @__PURE__ */ d.jsx("small", { children: o.subtitle })
  ] }, o.entityId)) : /* @__PURE__ */ d.jsx("div", { className: "entity-combobox-empty", children: "No matches" }) });
}
function _2(a) {
  return Object.entries(a).map(([i, o]) => {
    var m;
    const r = String(((m = o.attributes) == null ? void 0 : m.friendly_name) || i), c = Kb(i), f = r === i ? c : `${i} - ${c}`;
    return {
      entityId: i,
      label: r,
      subtitle: f,
      searchText: `${i} ${r} ${c}`.toLowerCase()
    };
  }).sort((i, o) => i.entityId.localeCompare(o.entityId));
}
function j2(a) {
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
function z2(a) {
  return a.split(",").map((i) => i.trim()).filter(Boolean);
}
function Kb(a) {
  return a.split(".")[0] || "";
}
function A2(a, i, o) {
  return a === "Time" ? o ? `At ${o}` : "" : a === "Sun" ? o ? `Sun ${o}` : "" : a === "Event" ? o ? `Event ${o}` : "" : i ? a === "Numeric state" ? `${i} numeric state ${o || "matches threshold"}` : `${i} turns ${o || "on"}` : "";
}
function E2(a, i, o) {
  return a === "None" ? "" : a === "Time" ? o ? `Time condition: ${o}` : "" : a === "Sun" ? o ? `Sun condition: ${o}` : "" : a === "Template" ? o ? `Template condition: ${o}` : "" : i ? a === "Numeric state" ? `${i} numeric condition ${o || "matches threshold"}` : `${i} is ${o || "on"}` : "";
}
function R2(a, i, o, r) {
  return a === "Delay" ? r ? `Delay ${r}` : "" : a === "Wait for trigger" ? r ? `Wait for ${r}` : "" : a === "Activate scene" ? o ? `Activate ${o}` : "" : a === "Notify" ? i || r ? `Notify using ${i || "selected notify service"}${r ? `: ${r}` : ""}` : "" : !i && !o && !r ? "" : `Call ${i || "selected service"}${o ? ` on ${o}` : ""}${r ? ` with ${r}` : ""}`;
}
function N2(a) {
  return a === "Numeric state" ? "above 20, below 50" : a === "Time" ? "07:30:00" : a === "Sun" ? "sunset offset -00:30:00" : a === "Event" ? "event_type or event data" : "on, off, home, open";
}
function M2(a) {
  return a === "Numeric state" ? "above 20" : a === "Time" ? "after 22:00 before 06:00" : a === "Sun" ? "after sunset" : a === "Template" ? "{{ condition }}" : "state value";
}
function D2(a) {
  return a === "Delay" ? "00:05:00" : a === "Wait for trigger" ? "binary_sensor.door turns off" : a === "Notify" ? "Notification message" : "Optional service data";
}
function O2(a) {
  const i = a.split(".")[0];
  if (!(!i || i === "homeassistant"))
    return i === "scene" ? ["scene"] : i === "script" ? ["script"] : [i];
}
const B2 = Object.freeze([]), H2 = Object.freeze([]), k2 = [];
function q2(a) {
  const i = qt((o) => o.activeId);
  return i ? /* @__PURE__ */ d.jsx(U2, { activeId: i, ...a }) : /* @__PURE__ */ d.jsx($b, { onNew: a.onNew, onGitToggle: a.onGitToggle });
}
function U2({ activeId: a, ...i }) {
  const o = qt((tt) => tt.chatsById[a]), r = qt((tt) => tt.messagesByChatId[a] || B2), c = qt((tt) => tt.drafts[a] || ""), f = qt((tt) => tt.setDraft), m = qt((tt) => tt.clearDraft), p = qt((tt) => tt.contextByChatId[a] || k2), g = qt((tt) => tt.addContextItem), x = qt((tt) => tt.removeContextItem), w = qt((tt) => tt.clearContext), y = qt((tt) => tt.questionDrafts[a] || ""), C = qt((tt) => tt.setQuestionDraft), E = qt((tt) => tt.queuesByChatId[a] || H2), B = wt((tt) => tt.settings), M = wt((tt) => tt.renamingId), z = wt((tt) => tt.renameTitle), A = wt((tt) => tt.setRenaming), O = I.useRef(null), k = I.useRef(null), v = I.useRef(!0), T = I.useRef({ activeId: a, messageCount: 0, thinkingVisible: !1 }), N = I.useRef(null), S = I.useRef(null), [D, Y] = I.useState(!1), [F, et] = I.useState(!1), [st, ut] = I.useState(!0), [ot, vt] = I.useState(a), [q, W] = I.useState(0), $ = I.useMemo(() => f1(r), [r]), ht = I.useMemo(() => o ? Gx(o, r) : null, [o, r]), rt = !!(o != null && o.archived), _ = Do(o), Q = Vd(o), X = I.useMemo(() => D1(o, B), [o, B]), it = I.useMemo(() => O1(p, B.context_budget_chars), [p, B.context_budget_chars]), pt = tb(o), St = (o == null ? void 0 : o.status) === "error" && !rt, At = _ && !ht, at = I.useMemo(() => ({ Footer: () => At ? /* @__PURE__ */ d.jsx(K2, {}) : null }), [At]), bt = I.useCallback(() => {
    v.current = !0, ut(!0), W((tt) => tt + 1);
  }, []), re = I.useCallback((tt) => {
    tt && (v.current = !0), ut(tt);
  }, []), Vt = I.useCallback((tt) => {
    tt.deltaY < 0 && (v.current = !1);
  }, []), Jt = I.useCallback((tt) => {
    var Et;
    N.current = ((Et = tt.touches[0]) == null ? void 0 : Et.clientY) ?? null;
  }, []), me = I.useCallback((tt) => {
    var we;
    const Et = ((we = tt.touches[0]) == null ? void 0 : we.clientY) ?? null;
    N.current !== null && Et !== null && Et > N.current && (v.current = !1), N.current = Et;
  }, []), Xt = I.useCallback(() => {
    N.current = null;
  }, []), Kt = I.useCallback((tt) => {
    k.current = tt;
  }, []), Bt = I.useCallback((tt) => {
    var we, $n;
    $.length && ((we = O.current) == null || we.scrollToIndex({ index: $.length - 1, align: "end", behavior: tt })), ($n = O.current) == null || $n.scrollTo({ top: Number.MAX_SAFE_INTEGER, behavior: tt });
    const Et = k.current;
    Et && (Et instanceof HTMLElement ? Et.scrollTo({ top: Et.scrollHeight, behavior: tt }) : Et.scrollTo({ top: Et.document.documentElement.scrollHeight, behavior: tt }));
  }, [$.length]), Ee = I.useCallback(() => {
    $.length && (v.current = !0, ut(!0), Bt("smooth"));
  }, [$.length, Bt]);
  if (I.useEffect(() => {
    v.current = !0, ut(!0), vt(a);
  }, [a]), I.useEffect(() => {
    const tt = v.current || ot === a, Et = T.current, we = Et.activeId !== a, $n = !we && $.length > Et.messageCount, ba = !we && At && !Et.thinkingVisible;
    if (T.current = { activeId: a, messageCount: $.length, thinkingVisible: At }, !tt && !q || !$.length && !At) return;
    const pe = ot === a && !q ? "auto" : q || $n || ba ? "smooth" : "auto";
    let pn = 0, va = 0;
    const oi = requestAnimationFrame(() => {
      Bt(pe), pn = requestAnimationFrame(() => Bt(pe)), va = window.setTimeout(() => Bt(pe), 120), ot === a && vt(null), q && W(0);
    });
    return () => {
      cancelAnimationFrame(oi), cancelAnimationFrame(pn), window.clearTimeout(va);
    };
  }, [a, ot, $, Bt, q, At]), I.useEffect(() => {
    const tt = v.current || ot === a;
    if (!At || !tt) return;
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
    const tt = S.current;
    tt && (tt.style.height = "52px", tt.style.height = `${Math.min(tt.scrollHeight, 180)}px`);
  }, [c]), I.useEffect(() => {
    if (!o || rt || ht) return;
    const tt = requestAnimationFrame(() => {
      const Et = S.current;
      if (!Et) return;
      Et.focus({ preventScroll: !0 });
      const we = Et.value.length;
      Et.setSelectionRange(we, we);
    });
    return () => cancelAnimationFrame(tt);
  }, [o == null ? void 0 : o.id, rt, ht]), !o) return /* @__PURE__ */ d.jsx($b, { onNew: i.onNew, onGitToggle: i.onGitToggle });
  const Wt = M === o.id;
  return /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxs("header", { className: "chat-header", children: [
      /* @__PURE__ */ d.jsx("div", { className: "title-area", children: /* @__PURE__ */ d.jsxs("div", { className: "title-row", children: [
        Wt ? /* @__PURE__ */ d.jsx("input", { className: "title-input", name: "session-title", value: z, "aria-label": "Chat title", onChange: (tt) => A(o.id, tt.target.value), onKeyDown: (tt) => {
          tt.key === "Enter" && i.onRenameSave(o.id), tt.key === "Escape" && A(null);
        }, autoFocus: !0 }) : /* @__PURE__ */ d.jsx("h1", { children: o.title }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", onClick: () => Wt ? i.onRenameSave(o.id) : i.onRenameStart(o.id), title: Wt ? "Save title" : "Rename chat", "aria-label": Wt ? "Save title" : "Rename chat", children: /* @__PURE__ */ d.jsx(ft, { icon: Wt ? "mdi:content-save" : "mdi:pencil" }) })
      ] }) }),
      /* @__PURE__ */ d.jsxs("div", { className: "header-actions", children: [
        rt ? /* @__PURE__ */ d.jsx("button", { onClick: () => i.onArchive(o.id, !1), children: "Restore" }) : null,
        _ ? /* @__PURE__ */ d.jsx("button", { className: "icon-button stop-button danger", onClick: () => i.onCancel(o.id), title: "Stop", "aria-label": "Stop chat", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:stop" }) }) : null,
        /* @__PURE__ */ d.jsx(Zb, { onClick: i.onGitToggle })
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
            Xs,
            {
              ref: O,
              style: { height: "100%" },
              data: $,
              scrollerRef: Kt,
              followOutput: (tt) => tt || v.current ? "smooth" : !1,
              atBottomStateChange: re,
              itemContent: (tt, Et) => /* @__PURE__ */ d.jsx(JS, { api: i.api, message: Et, sessionId: o.id, canRetry: St, onCopy: i.onCopy, onRetry: i.onRetry, onRollback: i.onRollback, onValidationReload: i.onValidationReload }, h1(Et, tt)),
              components: at
            }
          ),
          !st && $.length ? /* @__PURE__ */ d.jsx("button", { className: "scroll-to-bottom", type: "button", onClick: Ee, title: "Scroll to bottom", "aria-label": "Scroll to bottom", children: /* @__PURE__ */ d.jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "#0F766E", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ d.jsx("path", { fill: "none", stroke: "#0F766E", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", d: "m6 9 6 6 6-6" }) }) }) : null
        ]
      }
    ),
    rt ? /* @__PURE__ */ d.jsx("div", { className: "archived-note", children: "Archived chat" }) : ht ? /* @__PURE__ */ d.jsx(
      X2,
      {
        session: o,
        question: ht,
        value: y,
        onChange: (tt) => C(o.id, tt),
        onAnswer: (tt, Et) => {
          bt(), i.onAnswer(tt, Et);
        }
      }
    ) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
      /* @__PURE__ */ d.jsxs("form", { className: "composer", onSubmit: (tt) => {
        if (tt.preventDefault(), Q || pt) return;
        const Et = c.trim();
        Et && (m(o.id), bt(), i.onSend(o.id, Et));
      }, children: [
        /* @__PURE__ */ d.jsx(Q2, { session: o, onRunPlan: i.onRunPlan }),
        /* @__PURE__ */ d.jsx(Y2, { session: o, onApprove: i.onApprove }),
        !Q && !pt ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
          /* @__PURE__ */ d.jsx(
            L2,
            {
              settings: B,
              runSettings: X,
              onChange: (tt) => i.onRunSettingsChange(o.id, { ...X, ...tt })
            }
          ),
          /* @__PURE__ */ d.jsx(
            G2,
            {
              value: X.plan_mode,
              onChange: (tt) => i.onRunSettingsChange(o.id, { ...X, plan_mode: tt })
            }
          ),
          /* @__PURE__ */ d.jsx(V2, { sessionId: o.id, queues: E, onEdit: i.onQueueEdit, onSteer: i.onQueueSteer, onClear: i.onQueueClear }),
          /* @__PURE__ */ d.jsxs("div", { className: "context-chip-row", children: [
            /* @__PURE__ */ d.jsx(c2, { items: p, onRemove: (tt) => x(o.id, tt), onClear: () => w(o.id) }),
            p.length ? /* @__PURE__ */ d.jsx("span", { className: `context-budget ${it.level}`, children: it.label }) : null
          ] }),
          /* @__PURE__ */ d.jsxs("div", { className: "composer-input-row", children: [
            /* @__PURE__ */ d.jsx("textarea", { ref: S, name: "prompt", placeholder: "Ask Codex to change Home Assistant...", rows: 1, value: c, onChange: (tt) => f(o.id, tt.target.value), onKeyDown: (tt) => {
              var Et;
              tt.key === "Enter" && !tt.shiftKey && !tt.metaKey && !tt.ctrlKey && !tt.altKey && !tt.nativeEvent.isComposing && (tt.preventDefault(), (Et = tt.currentTarget.form) == null || Et.requestSubmit());
            } }),
            /* @__PURE__ */ d.jsxs("button", { className: "context-button", type: "button", onClick: () => Y(!0), title: "Add context", "aria-label": "Add context", children: [
              /* @__PURE__ */ d.jsx(ft, { icon: "mdi:paperclip" }),
              p.length ? /* @__PURE__ */ d.jsx("b", { children: p.length }) : null
            ] }),
            /* @__PURE__ */ d.jsx("button", { className: "builder-button", type: "button", onClick: () => et(!0), title: "Automation builder", "aria-label": "Automation builder", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:robot-industrial-outline" }) }),
            /* @__PURE__ */ d.jsx("button", { className: "send-button", type: "submit", title: "Send", "aria-label": "Send", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:send" }) })
          ] })
        ] }) : null
      ] }),
      /* @__PURE__ */ d.jsx(
        x2,
        {
          open: F,
          hass: i.hass,
          contextItems: p,
          onClose: () => et(!1),
          onSubmit: (tt) => {
            et(!1), bt(), i.onSend(o.id, tt);
          }
        }
      ),
      /* @__PURE__ */ d.jsx(
        u2,
        {
          api: i.api,
          hass: i.hass,
          open: D,
          selected: p,
          onAdd: (tt) => g(o.id, tt),
          onRemove: (tt) => x(o.id, tt),
          onClear: () => w(o.id),
          onClose: () => Y(!1)
        }
      )
    ] })
  ] });
}
function Zb({ onClick: a }) {
  const i = wt((r) => r.gitPanelOpen), o = wt((r) => {
    var c;
    return (c = r.gitChanges) != null && c.files ? Bs(r.gitChanges.files) : r.gitChangedCount;
  });
  return i ? null : /* @__PURE__ */ d.jsxs("button", { className: "git-toggle", onClick: a, title: "Open Git panel", "aria-label": "Open Git panel", children: [
    /* @__PURE__ */ d.jsx(ft, { icon: "mdi:source-branch" }),
    /* @__PURE__ */ d.jsx("span", { children: "Git" }),
    o ? /* @__PURE__ */ d.jsx("b", { children: o }) : null
  ] });
}
function L2({
  settings: a,
  runSettings: i,
  onChange: o
}) {
  const r = i.mode === "manual";
  return /* @__PURE__ */ d.jsxs("div", { className: `run-controls ${r ? "manual" : "auto"}`, children: [
    /* @__PURE__ */ d.jsx(
      Ib,
      {
        ariaLabel: "Model preset",
        value: i.model_preset_id,
        options: a.model_presets.map((c) => [c.id, c.label]),
        onChange: (c) => o({ model_preset_id: c })
      }
    ),
    /* @__PURE__ */ d.jsxs("button", { type: "button", className: r ? "" : "active", onClick: () => o({ mode: r ? "auto" : "manual" }), children: [
      /* @__PURE__ */ d.jsx(ft, { icon: r ? "mdi:tune" : "mdi:auto-mode" }),
      /* @__PURE__ */ d.jsx("span", { children: r ? "Manual" : "Auto" })
    ] }),
    r ? /* @__PURE__ */ d.jsxs("div", { className: "run-controls-extra", children: [
      /* @__PURE__ */ d.jsx(No, { label: "Reasoning", value: i.reasoning_effort, options: ["auto", "minimal", "low", "medium", "high", "xhigh"], onChange: (c) => o({ reasoning_effort: c }) }),
      /* @__PURE__ */ d.jsx(No, { label: "Verbosity", value: i.verbosity, options: ["auto", "low", "medium", "high"], onChange: (c) => o({ verbosity: c }) }),
      /* @__PURE__ */ d.jsx(No, { label: "Validation", value: i.validation_depth, options: ["auto", "none", "full"], onChange: (c) => o({ validation_depth: c }) }),
      /* @__PURE__ */ d.jsx(No, { label: "Tools", value: i.tool_visibility, options: ["compact", "normal", "verbose"], onChange: (c) => o({ tool_visibility: c }) }),
      /* @__PURE__ */ d.jsx(No, { label: "Approvals", value: i.approval_mode, options: ["ask", "auto_readonly"], onChange: (c) => o({ approval_mode: c }) })
    ] }) : null
  ] });
}
function G2({ value: a, onChange: i }) {
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
          /* @__PURE__ */ d.jsx(ft, { icon: r.icon }),
          /* @__PURE__ */ d.jsx("span", { children: r.label })
        ]
      },
      r.value
    )) })
  ] });
}
function Ib({ ariaLabel: a, value: i, options: o, onChange: r }) {
  var g;
  const [c, f] = I.useState(!1), m = I.useRef(null), p = ((g = o.find(([x]) => x === i)) == null ? void 0 : g[1]) || i;
  return I.useEffect(() => {
    if (!c) return;
    const x = (w) => {
      const y = m.current;
      if (!y) return;
      w.composedPath().includes(y) || f(!1);
    };
    return document.addEventListener("pointerdown", x), () => document.removeEventListener("pointerdown", x);
  }, [c]), /* @__PURE__ */ d.jsxs("div", { className: "run-select", ref: m, children: [
    /* @__PURE__ */ d.jsxs("button", { type: "button", className: "run-select-button", "aria-label": a, "aria-haspopup": "listbox", "aria-expanded": c, onClick: () => f((x) => !x), children: [
      /* @__PURE__ */ d.jsx("span", { children: p }),
      /* @__PURE__ */ d.jsx(ft, { icon: "mdi:chevron-up" })
    ] }),
    c ? /* @__PURE__ */ d.jsx("div", { className: "run-select-menu", role: "listbox", "aria-label": a, children: o.map(([x, w]) => /* @__PURE__ */ d.jsx("button", { type: "button", role: "option", "aria-selected": x === i, className: x === i ? "selected" : "", onClick: () => {
      r(x), f(!1);
    }, children: w }, x)) }) : null
  ] });
}
function No({ label: a, value: i, options: o, onChange: r }) {
  return /* @__PURE__ */ d.jsxs("label", { children: [
    /* @__PURE__ */ d.jsx("span", { children: a }),
    /* @__PURE__ */ d.jsx(Ib, { ariaLabel: a, value: i, options: o.map((c) => [c, c.replace("_", " ")]), onChange: r })
  ] });
}
function Q2({ session: a, onRunPlan: i }) {
  var f, m;
  const o = Vd(a), r = tb(a);
  if (!o && !r) return null;
  const c = (o == null ? void 0 : o.id) || String(((m = (f = a.metadata) == null ? void 0 : f.pending_plan) == null ? void 0 : m.id) || "");
  return /* @__PURE__ */ d.jsxs("section", { className: "run-plan-review", "aria-label": "Run plan review", children: [
    /* @__PURE__ */ d.jsx("label", { children: r ? "Preparing run plan" : "Review run plan" }),
    /* @__PURE__ */ d.jsx("div", { className: "run-plan-copy", children: r ? "Codex is preparing a plan before edits begin." : "Approve the plan to create a rollback checkpoint and start execution." }),
    !r && c ? /* @__PURE__ */ d.jsxs("div", { className: "row", children: [
      /* @__PURE__ */ d.jsxs("button", { type: "button", onClick: () => i(a.id, c, "approve"), children: [
        /* @__PURE__ */ d.jsx(ft, { icon: "mdi:check" }),
        /* @__PURE__ */ d.jsx("span", { children: "Approve" })
      ] }),
      /* @__PURE__ */ d.jsxs("button", { type: "button", onClick: () => i(a.id, c, "revise"), children: [
        /* @__PURE__ */ d.jsx(ft, { icon: "mdi:pencil" }),
        /* @__PURE__ */ d.jsx("span", { children: "Revise" })
      ] }),
      /* @__PURE__ */ d.jsxs("button", { type: "button", className: "danger", onClick: () => i(a.id, c, "cancel"), children: [
        /* @__PURE__ */ d.jsx(ft, { icon: "mdi:close" }),
        /* @__PURE__ */ d.jsx("span", { children: "Cancel" })
      ] })
    ] }) : null
  ] });
}
function Y2({ session: a, onApprove: i }) {
  const o = ei(a);
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
function V2({ sessionId: a, queues: i, onEdit: o, onSteer: r, onClear: c }) {
  return i.length ? /* @__PURE__ */ d.jsx("div", { className: "message-queue", "aria-label": "Queued messages", children: i.map((f) => /* @__PURE__ */ d.jsxs("div", { className: "queued-message", children: [
    /* @__PURE__ */ d.jsx("span", { children: f.content }),
    /* @__PURE__ */ d.jsxs("div", { className: "queued-actions", children: [
      /* @__PURE__ */ d.jsx("button", { className: "icon-button queue-edit", type: "button", onClick: () => o(a, f.id), "data-tooltip": "Edit", "aria-label": "Edit queued message", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:pencil" }) }),
      /* @__PURE__ */ d.jsx("button", { className: "icon-button queue-steer", type: "button", onClick: () => r(a, f.id), "data-tooltip": "Steer", "aria-label": "Steer current conversation", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:send" }) }),
      /* @__PURE__ */ d.jsx("button", { className: "icon-button queue-clear", type: "button", onClick: () => c(a, f.id), "data-tooltip": "Clear", "aria-label": "Clear queued message", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:close" }) })
    ] })
  ] }, f.id)) }) : null;
}
function X2({ session: a, question: i, value: o, onChange: r, onAnswer: c }) {
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
        /* @__PURE__ */ d.jsx(ft, { className: "question-info", icon: "mdi:information-outline" }),
        /* @__PURE__ */ d.jsx("span", { className: "question-choice-tooltip", role: "tooltip", children: m.description || "Use this answer." })
      ] }),
      /* @__PURE__ */ d.jsx("span", { children: m.label })
    ] }, m.label)) }),
    /* @__PURE__ */ d.jsxs("div", { className: "question-custom-row", children: [
      /* @__PURE__ */ d.jsx("input", { ref: f, name: "question-custom", value: o, placeholder: i.customPlaceholder, "aria-label": "Custom answer", onChange: (m) => r(m.target.value) }),
      /* @__PURE__ */ d.jsx("button", { className: "send-button question-send", type: "submit", title: "Send custom answer", "aria-label": "Send custom answer", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:send" }) })
    ] })
  ] });
}
function K2() {
  return /* @__PURE__ */ d.jsx("div", { className: "message-row message-row-codex", children: /* @__PURE__ */ d.jsxs("article", { className: "message assistant message-style-codex message-style-thinking", "aria-live": "polite", "aria-label": "Codex is thinking", children: [
    /* @__PURE__ */ d.jsxs("div", { className: "role", children: [
      /* @__PURE__ */ d.jsx(ft, { icon: "mdi:robot" }),
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
function $b({ onNew: a, onGitToggle: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: "empty", children: [
    /* @__PURE__ */ d.jsx("h1", { children: "Start a Codex chat" }),
    /* @__PURE__ */ d.jsx("p", { children: "Create a session to edit Home Assistant config from this console." }),
    /* @__PURE__ */ d.jsxs("div", { className: "empty-actions", children: [
      /* @__PURE__ */ d.jsx("button", { onClick: a, children: "New chat" }),
      /* @__PURE__ */ d.jsx(Zb, { onClick: i })
    ] })
  ] });
}
const Z2 = [
  { id: "account", label: "Account" },
  { id: "run", label: "Run" },
  { id: "models", label: "Models" },
  { id: "debug", label: "Debug" },
  { id: "bridge-log", label: "Bridge Log" }
];
function I2({ onClose: a, onTab: i, onSettingsSave: o, onBridgeRestart: r, onCoreRestart: c, onBridgeLogRefresh: f, onBridgeLogClear: m, onDeviceLogin: p, onDeviceLoginCancel: g, onAccountLogout: x }) {
  var O;
  const w = wt((k) => k.settingsTab), y = wt((k) => k.settings), C = wt((k) => k.settingsSaving), B = ((O = wt((k) => k.status).runtime) == null ? void 0 : O.bridge_available) === !0, M = wt((k) => k.bridgeActionRunning), z = wt((k) => k.coreActionRunning), A = B ? "Restart" : "Start";
  return /* @__PURE__ */ d.jsxs("div", { className: "modal-backdrop", children: [
    /* @__PURE__ */ d.jsx("div", { className: "modal-scrim", onClick: a }),
    /* @__PURE__ */ d.jsxs("section", { className: "modal settings-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "settings-title", children: [
      /* @__PURE__ */ d.jsxs("header", { className: "modal-header", children: [
        /* @__PURE__ */ d.jsx("h2", { id: "settings-title", children: "Settings" }),
        /* @__PURE__ */ d.jsx("button", { className: "icon-button", onClick: a, title: "Close", "aria-label": "Close", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:close" }) })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "modal-tabs", children: [
        /* @__PURE__ */ d.jsx("div", { className: "debug-tabs", role: "tablist", "aria-label": "Settings views", children: Z2.map((k) => /* @__PURE__ */ d.jsx("button", { className: w === k.id ? "active" : "", onClick: () => i(k.id), role: "tab", "aria-selected": w === k.id, children: k.label }, k.id)) }),
        /* @__PURE__ */ d.jsx("span", { className: "modal-tab-spacer" }),
        C ? /* @__PURE__ */ d.jsx("span", { className: "settings-saving", children: "Saving..." }) : null,
        /* @__PURE__ */ d.jsxs("button", { className: `bridge-action ${B ? "bridge-action-restart" : "bridge-action-start"}`, onClick: r, title: `${A} bridge`, disabled: M, children: [
          /* @__PURE__ */ d.jsx(ft, { icon: M ? "mdi:progress-clock" : B ? "mdi:restart" : "mdi:play" }),
          /* @__PURE__ */ d.jsx("span", { children: M ? "Working..." : `${A} Bridge` })
        ] }),
        /* @__PURE__ */ d.jsxs("button", { className: "core-action", onClick: c, title: "Restart Home Assistant Core", disabled: z, children: [
          /* @__PURE__ */ d.jsx(ft, { icon: z ? "mdi:progress-clock" : "mdi:restart-alert" }),
          /* @__PURE__ */ d.jsx("span", { children: z ? "Working..." : "Restart HA" })
        ] })
      ] }),
      /* @__PURE__ */ d.jsxs("div", { className: "modal-body", children: [
        w === "account" ? /* @__PURE__ */ d.jsx($2, { onDeviceLogin: p, onDeviceLoginCancel: g, onAccountLogout: x }) : null,
        w === "run" ? /* @__PURE__ */ d.jsx(W2, { settings: y, onSave: o }) : null,
        w === "models" ? /* @__PURE__ */ d.jsx(tC, { settings: y, onSave: o }) : null,
        w === "debug" ? /* @__PURE__ */ d.jsx(eC, {}) : null,
        w === "bridge-log" ? /* @__PURE__ */ d.jsx(nC, { onRefresh: f, onClear: m }) : null
      ] })
    ] })
  ] });
}
function $2({ onDeviceLogin: a, onDeviceLoginCancel: i, onAccountLogout: o }) {
  const r = wt((v) => v.account), c = wt((v) => v.accountLoading), f = wt((v) => v.accountActionRunning), m = wt((v) => v.deviceLogin), g = wt((v) => v.status).usage || {}, [x, w] = I.useState(!1), y = (r == null ? void 0 : r.logged_in) === !0, C = (m == null ? void 0 : m.status) === "pending" || (m == null ? void 0 : m.active), E = (r == null ? void 0 : r.error) || (r == null ? void 0 : r.status_text) || (y ? "Logged in" : "Not logged in"), B = Hn((m == null ? void 0 : m.output) || "").replace(/(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?/gi, ""), M = Fb(m == null ? void 0 : m.verification_uri) || F2(B), z = Jb(m == null ? void 0 : m.user_code) || J2(B), A = C || (m == null ? void 0 : m.status) === "failed" || (m == null ? void 0 : m.status) === "canceled", O = wt((v) => v.showToast), k = async () => {
    z && (await Px(z), w(!0), window.setTimeout(() => w(!1), 1600), O("Device code copied", "success"));
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "settings-account", children: [
    /* @__PURE__ */ d.jsxs("div", { className: `account-status-card ${y ? "success" : r != null && r.error ? "error" : ""}`, children: [
      /* @__PURE__ */ d.jsxs("div", { className: "account-status-main", children: [
        /* @__PURE__ */ d.jsx(ft, { icon: y ? "mdi:account-check-outline" : "mdi:account-outline" }),
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("strong", { children: c ? "Checking account..." : y ? "Codex account connected" : "Codex account not connected" }),
          /* @__PURE__ */ d.jsx("span", { children: E })
        ] })
      ] }),
      y ? /* @__PURE__ */ d.jsxs("button", { className: "danger", onClick: o, disabled: f, children: [
        /* @__PURE__ */ d.jsx(ft, { icon: f ? "mdi:progress-clock" : "mdi:logout" }),
        /* @__PURE__ */ d.jsx("span", { children: f ? "Working..." : "Log out" })
      ] }) : /* @__PURE__ */ d.jsxs("button", { onClick: a, disabled: f || C, children: [
        /* @__PURE__ */ d.jsx(ft, { icon: f ? "mdi:progress-clock" : "mdi:cellphone-key" }),
        /* @__PURE__ */ d.jsx("span", { children: f ? "Starting..." : C ? "Login pending" : "Log in with device code" })
      ] })
    ] }),
    y ? /* @__PURE__ */ d.jsxs("div", { className: "account-details", children: [
      /* @__PURE__ */ d.jsx(Mo, { label: "Mode", value: (r == null ? void 0 : r.auth_mode) || "ChatGPT" }),
      /* @__PURE__ */ d.jsx(Mo, { label: "Account ID", value: (r == null ? void 0 : r.account_id) || "Not reported" }),
      /* @__PURE__ */ d.jsx(Mo, { label: "Last refresh", value: P2(r == null ? void 0 : r.last_refresh) }),
      /* @__PURE__ */ d.jsx(Mo, { label: "5-hour usage", value: gx(g.five_hour_remaining_percent) }),
      /* @__PURE__ */ d.jsx(Mo, { label: "Weekly usage", value: gx(g.weekly_remaining_percent) })
    ] }) : null,
    A ? /* @__PURE__ */ d.jsxs("div", { className: `device-login-panel ${(m == null ? void 0 : m.status) === "failed" ? "error" : ""}`, children: [
      /* @__PURE__ */ d.jsxs("div", { className: "device-login-header", children: [
        /* @__PURE__ */ d.jsxs("div", { children: [
          /* @__PURE__ */ d.jsx("strong", { children: (m == null ? void 0 : m.status) === "failed" ? "Device login failed" : (m == null ? void 0 : m.status) === "canceled" ? "Device login canceled" : "Device login pending" }),
          /* @__PURE__ */ d.jsx("span", { children: (m == null ? void 0 : m.error) || "Open the URL, enter the code, then return here." })
        ] }),
        C ? /* @__PURE__ */ d.jsxs("button", { className: "ghost", onClick: i, children: [
          /* @__PURE__ */ d.jsx(ft, { icon: "mdi:close-circle-outline" }),
          /* @__PURE__ */ d.jsx("span", { children: "Cancel" })
        ] }) : null
      ] }),
      M ? /* @__PURE__ */ d.jsxs("div", { className: "device-login-field", children: [
        /* @__PURE__ */ d.jsx("span", { children: "URL" }),
        /* @__PURE__ */ d.jsx("a", { className: "device-login-link", href: M, target: "_blank", rel: "noreferrer", children: M })
      ] }) : null,
      z ? /* @__PURE__ */ d.jsxs("div", { className: "device-login-field", children: [
        /* @__PURE__ */ d.jsx("span", { children: "Code" }),
        /* @__PURE__ */ d.jsx("div", { className: "device-login-code-row", children: /* @__PURE__ */ d.jsxs("div", { className: `device-login-code ${x ? "copied" : ""}`, children: [
          /* @__PURE__ */ d.jsx("span", { children: z }),
          /* @__PURE__ */ d.jsx("button", { className: "device-login-copy", onClick: k, title: x ? "Copied" : "Copy code", "aria-label": x ? "Copied" : "Copy device code", children: /* @__PURE__ */ d.jsx(ft, { icon: x ? "mdi:check" : "mdi:content-copy" }) })
        ] }) })
      ] }) : null,
      B ? /* @__PURE__ */ d.jsx("pre", { className: "device-login-output", children: B }) : null
    ] }) : null
  ] });
}
function Fb(a) {
  return Hn(a).replace(/(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?/gi, "").replace(/[.,;:]+$/g, "").trim();
}
function F2(a) {
  const i = a.match(/https?:\/\/[^\s)>\]"']+/g) || [], o = i.find((r) => /device|openai|auth/i.test(r)) || i[0] || "";
  return Fb(o);
}
function Jb(a) {
  const i = Hn(a).toUpperCase().match(/\b[A-Z0-9]{4,8}(?:-[A-Z0-9]{4,8}){1,3}\b/);
  return (i == null ? void 0 : i[0]) || "";
}
function J2(a) {
  return Jb(a);
}
function Mo({ label: a, value: i }) {
  return /* @__PURE__ */ d.jsxs("div", { className: "account-detail", children: [
    /* @__PURE__ */ d.jsx("span", { children: a }),
    /* @__PURE__ */ d.jsx("strong", { children: i })
  ] });
}
function W2({ settings: a, onSave: i }) {
  const o = a.defaults;
  return /* @__PURE__ */ d.jsxs("div", { className: "settings-run", children: [
    /* @__PURE__ */ d.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ d.jsx("h3", { children: "Run" }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings-grid", children: [
        /* @__PURE__ */ d.jsx(Xa, { label: "Default mode", value: o.mode, options: [["auto", "Auto"], ["manual", "Manual"]], onChange: (r) => Ka(a, i, { mode: r }) }),
        /* @__PURE__ */ d.jsx(Xa, { label: "Model preset", value: o.model_preset_id, options: a.model_presets.map((r) => [r.id, r.label]), onChange: (r) => Ka(a, i, { model_preset_id: r }) }),
        /* @__PURE__ */ d.jsx(Xa, { label: "Reasoning", value: o.reasoning_effort, options: oC(), onChange: (r) => Ka(a, i, { reasoning_effort: r }) }),
        /* @__PURE__ */ d.jsx(Xa, { label: "Verbosity", value: o.verbosity, options: rC(), onChange: (r) => Ka(a, i, { verbosity: r }) }),
        /* @__PURE__ */ d.jsx(Xa, { label: "Plan mode", value: o.plan_mode, options: sC(), onChange: (r) => Ka(a, i, { plan_mode: r }) })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ d.jsx("h3", { children: "Validation" }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings-grid", children: [
        /* @__PURE__ */ d.jsx(Xa, { label: "Validation depth", value: o.validation_depth, options: uC(), onChange: (r) => Ka(a, i, { validation_depth: r }) }),
        /* @__PURE__ */ d.jsxs("label", { className: "setting-field", children: [
          /* @__PURE__ */ d.jsx("span", { children: "Context budget" }),
          /* @__PURE__ */ d.jsx("input", { type: "number", min: 1e3, max: 2e5, step: 1e3, defaultValue: a.context_budget_chars, onBlur: (r) => i({ ...a, context_budget_chars: Number(r.currentTarget.value) }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsxs("section", { className: "settings-section", children: [
      /* @__PURE__ */ d.jsx("h3", { children: "Safety" }),
      /* @__PURE__ */ d.jsxs("div", { className: "settings-grid", children: [
        /* @__PURE__ */ d.jsx(Xa, { label: "Tool visibility", value: o.tool_visibility, options: [["compact", "Compact"], ["normal", "Normal"], ["verbose", "Verbose"]], onChange: (r) => Ka(a, i, { tool_visibility: r }) }),
        /* @__PURE__ */ d.jsx(Xa, { label: "Approvals", value: o.approval_mode, options: [["ask", "Ask"], ["auto_readonly", "Auto read-only"]], onChange: (r) => Ka(a, i, { approval_mode: r }) })
      ] })
    ] })
  ] });
}
function P2(a) {
  if (!a) return "Not reported";
  const i = Number(a);
  return Number.isFinite(i) && i > 0 ? nr(i) : String(a);
}
function gx(a) {
  const i = Number(a);
  return Number.isFinite(i) ? `${Math.round(i)}% remaining` : "Not reported";
}
function tC({ settings: a, onSave: i }) {
  const [o, r] = I.useState(""), [c, f] = I.useState(""), m = () => {
    const p = o.trim(), g = c.trim();
    if (!p || !g) return;
    const x = $x(a, { id: Fx(p), label: p, model: g });
    i(x), r(""), f("");
  };
  return /* @__PURE__ */ d.jsxs("div", { className: "settings-models", children: [
    a.model_presets.map((p) => /* @__PURE__ */ d.jsxs("div", { className: "settings-model-row", children: [
      /* @__PURE__ */ d.jsx("input", { "aria-label": `${p.label} label`, defaultValue: p.label, disabled: wl.has(p.id), onBlur: (g) => xx(a, i, p, { label: g.currentTarget.value }) }),
      /* @__PURE__ */ d.jsx("input", { "aria-label": `${p.label} model`, defaultValue: p.model || "", disabled: wl.has(p.id), placeholder: "Model id", onBlur: (g) => xx(a, i, p, { model: g.currentTarget.value || null }) }),
      /* @__PURE__ */ d.jsx("button", { className: "icon-button danger", disabled: wl.has(p.id), onClick: () => i(M1(a, p.id)), title: "Delete model preset", "aria-label": "Delete model preset", children: /* @__PURE__ */ d.jsx(ft, { icon: "mdi:trash-can-outline" }) })
    ] }, p.id)),
    /* @__PURE__ */ d.jsxs("div", { className: "settings-model-row add", children: [
      /* @__PURE__ */ d.jsx("input", { value: o, onChange: (p) => r(p.currentTarget.value), placeholder: "Preset label", "aria-label": "New preset label" }),
      /* @__PURE__ */ d.jsx("input", { value: c, onChange: (p) => f(p.currentTarget.value), placeholder: "Model id", "aria-label": "New model id" }),
      /* @__PURE__ */ d.jsxs("button", { onClick: m, disabled: !o.trim() || !c.trim(), children: [
        /* @__PURE__ */ d.jsx(ft, { icon: "mdi:plus" }),
        /* @__PURE__ */ d.jsx("span", { children: "Add" })
      ] })
    ] })
  ] });
}
function eC() {
  return /* @__PURE__ */ d.jsxs("div", { className: "settings-debug", children: [
    /* @__PURE__ */ d.jsx(iC, {}),
    /* @__PURE__ */ d.jsx(aC, {})
  ] });
}
function nC({ onRefresh: a, onClear: i }) {
  return /* @__PURE__ */ d.jsx("div", { className: "settings-bridge-log", children: /* @__PURE__ */ d.jsx(lC, { onRefresh: a, onClear: i }) });
}
function aC() {
  const a = wt((o) => o.status), i = {
    ...a,
    sessions: Array.isArray(a.sessions) ? a.sessions.filter((o) => !o.archived) : a.sessions
  };
  return /* @__PURE__ */ d.jsx("pre", { className: "result", children: JSON.stringify(i, null, 2) });
}
function iC() {
  var r, c;
  const i = wt((f) => f.status).runtime || {}, o = [
    { label: "Runner", value: i.runner_type || "unknown", detail: i.codex_exec_available === !1 ? "Codex exec unavailable" : "Codex exec ready", tone: i.codex_exec_available === !1 ? "error" : "" },
    { label: "Bridge", value: i.bridge_available === !1 ? "Unavailable" : i.bridge_available ? "Available" : "Unknown", detail: i.bridge_url || "No bridge URL", tone: i.bridge_available === !1 ? "error" : i.bridge_available ? "success" : "" },
    { label: "Uptime", value: L1(i.bridge_uptime_seconds) || "Not reported", detail: i.bridge_started_at ? `Started ${nr(i.bridge_started_at)}` : ((r = i.bridge_health) == null ? void 0 : r.error) || "No bridge health data", tone: (c = i.bridge_health) != null && c.error ? "warning" : "" },
    { label: "Codex", value: i.codex_version || "No version", detail: i.codex_path || i.codex_command || "No command", tone: i.codex_path ? "" : "warning" },
    { label: "Workspace", value: i.workspace_exists === !1 ? "Missing" : i.workspace_exists ? "Ready" : "Unknown", detail: i.workspace_path || "No workspace path", tone: i.workspace_exists === !1 ? "error" : "" }
  ];
  return /* @__PURE__ */ d.jsx("div", { className: "runtime-cards", children: o.map((f) => /* @__PURE__ */ d.jsxs("div", { className: `runtime-card ${f.tone || ""}`, children: [
    /* @__PURE__ */ d.jsx("span", { children: f.label }),
    /* @__PURE__ */ d.jsx("strong", { children: String(f.value) }),
    /* @__PURE__ */ d.jsx("small", { children: String(f.detail) })
  ] }, f.label)) });
}
function lC({ onRefresh: a, onClear: i }) {
  const o = wt((p) => p.bridgeLog), r = wt((p) => p.bridgeLogLoading), c = I.useRef(null), f = Hn((o == null ? void 0 : o.lines) || "No bridge log output.");
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
          /* @__PURE__ */ d.jsx(ft, { icon: "mdi:refresh" }),
          /* @__PURE__ */ d.jsx("span", { children: r ? "Refreshing..." : "Refresh" })
        ] }),
        /* @__PURE__ */ d.jsxs("button", { className: "ghost bridge-log-clear", onClick: i, disabled: r, children: [
          /* @__PURE__ */ d.jsx(ft, { icon: "mdi:broom" }),
          /* @__PURE__ */ d.jsx("span", { children: "Clear Log" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ d.jsx("pre", { className: "result bridge-log-result", ref: c, children: f })
  ] });
}
function Xa({ label: a, value: i, options: o, onChange: r }) {
  return /* @__PURE__ */ d.jsxs("label", { className: "setting-field", children: [
    /* @__PURE__ */ d.jsx("span", { children: a }),
    /* @__PURE__ */ d.jsx("select", { value: i, onChange: (c) => r(c.currentTarget.value), children: o.map(([c, f]) => /* @__PURE__ */ d.jsx("option", { value: c, children: f }, c)) })
  ] });
}
function Ka(a, i, o) {
  i({ ...a, defaults: { ...a.defaults, ...o } });
}
function xx(a, i, o, r) {
  wl.has(o.id) || i($x(a, { ...o, ...r }));
}
function oC() {
  return [["auto", "Auto"], ["minimal", "Minimal"], ["low", "Low"], ["medium", "Medium"], ["high", "High"], ["xhigh", "XHigh"]];
}
function rC() {
  return [["auto", "Auto"], ["low", "Low"], ["medium", "Medium"], ["high", "High"]];
}
function sC() {
  return [["auto", "Auto"], ["always", "Always"], ["off", "Off"]];
}
function uC() {
  return [["auto", "Auto"], ["none", "None"], ["full", "Full"]];
}
function cC() {
  const a = wt((i) => i.toasts);
  return /* @__PURE__ */ d.jsx("div", { className: "toast-stack", "aria-live": "polite", children: a.map((i) => /* @__PURE__ */ d.jsxs("div", { className: `toast ${i.tone}${i.entering ? " entering" : ""}${i.exiting ? " exiting" : ""}`, children: [
    /* @__PURE__ */ d.jsx(ft, { icon: i.tone === "error" ? "mdi:alert-circle" : i.tone === "success" ? "mdi:check-circle" : "mdi:information" }),
    /* @__PURE__ */ d.jsx("span", { children: i.message })
  ] }, i.id)) });
}
let of = [], bx = "";
const dC = [
  "ha-sidebar",
  "home-assistant",
  "home-assistant-main",
  "ha-drawer",
  "ha-panel-lovelace",
  "partial-panel-resolver"
], fC = 50;
function hC() {
  const a = Object.values(qt.getState().chatsById).filter((f) => !f.archived), i = a.filter((f) => ei(f).length > 0 || Lo(f) || Go(f)).length;
  if (i > 0) return { count: i, tone: "action", label: `${i} chats waiting for action` };
  const o = a.filter((f) => f.status === "error").length;
  if (o > 0) return { count: o, tone: "error", label: `${o} chats with errors` };
  const r = a.filter((f) => ["planning", "running", "working"].includes(f.status || "")).length;
  if (r > 0) return { count: r, tone: "working", label: `${r} chats working` };
  const c = a.filter((f) => Ud(f)).length;
  return c > 0 ? { count: c, tone: "restart", label: `${c} chats waiting for restart` } : null;
}
function mC() {
  const a = performance.now(), i = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Set(), r = (f) => {
    var m;
    !f || o.has(f) || (o.add(f), (m = f.querySelectorAll) == null || m.call(f, dC.join(",")).forEach((p) => {
      p.localName === "ha-sidebar" && p.shadowRoot && i.add(p.shadowRoot), p.shadowRoot && r(p.shadowRoot);
    }));
  };
  r(document);
  const c = performance.now() - a;
  return c > fC && console.debug(`[ha_codex] sidebar badge root lookup took ${c.toFixed(1)}ms`), [...i];
}
function pC(a) {
  return a ? `${a.tone}:${a.count}:${a.label}` : "none";
}
function gC(a) {
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
function xC(a, i) {
  const o = a.querySelector("#sidebar-panel-ha-codex");
  if (!o) return;
  gC(a);
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
function vx(a = !1) {
  const i = hC(), o = pC(i);
  !a && o === bx || (bx = o, of.forEach((r) => xC(r, i)));
}
function bC() {
  return of.some((a) => a.host.isConnected && a.querySelector("#sidebar-panel-ha-codex"));
}
function vC() {
  I.useEffect(() => {
    let a = null, i = null;
    const o = () => {
      a === null && (a = requestAnimationFrame(() => {
        a = null, vx();
      }));
    }, r = () => {
      i === null && (i = requestAnimationFrame(() => {
        i = null, of = mC(), vx(!0);
      }));
    }, c = qt.subscribe(o), f = new MutationObserver(() => {
      if (bC()) {
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
const yC = new Py(), wC = 200;
function SC({ hass: a, panel: i }) {
  return /* @__PURE__ */ d.jsx(e1, { client: yC, children: /* @__PURE__ */ d.jsx(CC, { hass: a, panel: i }) });
}
function CC({ hass: a, panel: i }) {
  const o = I.useMemo(() => new n1(() => a), [a]), r = Y1(o), c = I.useRef(r), f = wt((z) => z.gitPanelOpen), m = wt((z) => z.showStatusDebug), p = qt((z) => z.setShowArchived), g = qt((z) => z.showArchived), x = qt((z) => z.setActiveId), w = qt((z) => z.activeId), y = wt((z) => z.setGitPanelOpen), C = wt((z) => z.setShowStatusDebug), E = wt((z) => z.setSettingsTab), B = wt((z) => z.showToast);
  vC(), I.useEffect(() => {
    c.current = r;
  }, [r]), I.useEffect(() => (Hg.configure(a, i), () => Hg.cleanup()), [a, i]), I.useEffect(() => {
    a && r.loadInitial().catch((z) => B(ne(z), "error"));
  }, [a, r, B]), I.useEffect(() => {
    if (!w) return;
    const z = qt.getState().chatsById[w], A = Math.max(
      0,
      ...(qt.getState().messagesByChatId[w] || []).map((v) => Number(v.id)).filter((v) => Number.isFinite(v))
    ), O = Number((z == null ? void 0 : z.last_message_id) || 0);
    if (!O || O <= A) return;
    let k = !1;
    return o.messagesAfter(w, A, A ? void 0 : wC).then((v) => {
      k || qt.getState().appendMessages(w, v.messages || [], !1);
    }).catch((v) => B(ne(v), "error")), () => {
      k = !0;
    };
  }, [w, o, B]), I.useEffect(() => {
    const z = window.setInterval(() => {
      c.current.maybeRunScheduledRestart();
    }, 1e3);
    return () => window.clearInterval(z);
  }, []), I.useEffect(() => {
    const z = (A) => {
      A.key === "Escape" && wt.getState().showStatusDebug && C(!1);
    };
    return window.addEventListener("keydown", z), () => window.removeEventListener("keydown", z);
  }, [C]);
  const M = (z) => (...A) => {
    Promise.resolve(z(...A)).catch((O) => B(ne(O), "error"));
  };
  return /* @__PURE__ */ d.jsxs("main", { className: `shell ${f ? "git-open" : "git-closed"}`, children: [
    /* @__PURE__ */ d.jsx(
      yS,
      {
        onNew: M(r.createSession),
        onSelect: x,
        onArchive: M(r.archiveSession),
        onToggleArchived: () => p(!g),
        onValidate: M(() => r.runValidation(w)),
        onRestartNow: M((z, A) => r.respondApproval(z, A, !0, "Restarting Home Assistant")),
        onRestartSchedule: r.scheduleRestartAfterChats,
        onRestartScheduleCancel: r.cancelScheduledRestart,
        onDebug: M(async () => {
          await Promise.all([r.loadStatus(), r.loadSettings()]), E("run"), C(!0);
        })
      }
    ),
    /* @__PURE__ */ d.jsx("section", { className: "chat", children: /* @__PURE__ */ d.jsx(
      q2,
      {
        api: o,
        hass: a,
        onNew: M(r.createSession),
        onGitToggle: M(r.toggleGitPanel),
        onRenameStart: r.startRename,
        onRenameSave: M(r.saveRename),
        onArchive: M(r.archiveSession),
        onCancel: M(r.cancelSession),
        onRetry: M(r.retryContinueSession),
        onSend: M(r.sendPrompt),
        onAnswer: M(r.answerQuestion),
        onApprove: M(r.respondApproval),
        onRunPlan: M(r.respondRunPlan),
        onRollback: M(r.rollbackRun),
        onCopy: M(async (z) => {
          await Px(z), B("Copied to clipboard", "success");
        }),
        onQueueEdit: r.editQueuedMessage,
        onQueueSteer: M(r.steerQueuedMessage),
        onQueueClear: r.clearQueuedMessage,
        onValidationReload: M(r.reloadValidationDomains),
        onRunSettingsChange: M(r.updateSessionRunSettings)
      }
    ) }),
    /* @__PURE__ */ d.jsx(
      RS,
      {
        open: f,
        onClose: () => y(!1),
        onRefresh: M(() => r.loadGitChanges(!0)),
        onLoadMore: r.showMoreGitFiles,
        onToggleFile: M(r.toggleGitFileDiff),
        onCommit: M(r.commitAndPush),
        onDiscard: M(r.discardSelectedGitFiles)
      }
    ),
    m ? /* @__PURE__ */ d.jsx(
      I2,
      {
        onClose: () => C(!1),
        onTab: M(async (z) => {
          E(z), z === "bridge-log" && !wt.getState().bridgeLog && await r.loadBridgeLog(), z === "account" && await r.loadAccountStatus();
        }),
        onSettingsSave: M(r.updateSettings),
        onBridgeRestart: M(r.startOrRestartBridge),
        onCoreRestart: M(r.restartHomeAssistant),
        onBridgeLogRefresh: M(r.loadBridgeLog),
        onBridgeLogClear: M(r.clearBridgeLog),
        onDeviceLogin: M(r.startDeviceLogin),
        onDeviceLoginCancel: M(r.cancelDeviceLogin),
        onAccountLogout: M(r.logoutAccount)
      }
    ) : null,
    /* @__PURE__ */ d.jsx(cC, {})
  ] });
}
const TC = ".ha-codex-root{height:100%;min-height:100%;display:block}.ha-codex-root{--tw-bg: #0b1120;--tw-panel: #111827;--tw-panel-soft: #172033;--tw-panel-strong: #1f2937;--tw-border: #2d3748;--tw-muted: #94a3b8;--tw-text: #e5edf7;--tw-text-strong: #f8fafc;--tw-primary: #38bdf8;--tw-primary-soft: #0c344f;--tw-accent: #2dd4bf;--tw-accent-soft: #123a3a;--tw-warning: #f59e0b;--tw-danger: #ef4444;--tw-danger-soft: #3b1118;--tw-success: #22c55e;--tw-action-soft: #123044;--tw-shadow: 0 18px 50px rgba(0, 0, 0, .38);--tw-ring: 0 0 0 3px rgba(56, 189, 248, .22);--tw-button-shadow: 0 10px 24px rgba(2, 6, 23, .28);--tw-button-primary-shadow: 0 12px 28px rgba(56, 189, 248, .26);--tw-button-danger-shadow: 0 12px 28px rgba(239, 68, 68, .24);display:block;height:100%;min-height:100%;color:var(--tw-text);background:var(--tw-bg);font-family:var(--ha-font-family-body, system-ui, sans-serif)}*{box-sizing:border-box}.shell{display:grid;grid-template-columns:292px minmax(0,1fr) 372px;height:100%;min-height:0;position:relative;background:radial-gradient(circle at 24% 0%,rgba(56,189,248,.12),transparent 30%),linear-gradient(180deg,#0f172a 0%,var(--tw-bg) 100%);overflow:hidden;transition:grid-template-columns .22s cubic-bezier(.2,0,0,1)}.shell.git-closed{grid-template-columns:292px minmax(0,1fr) 0}.rail,.drawer{background:#111827f0;border-right:1px solid var(--tw-border);min-width:0;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.rail{display:grid;grid-template-rows:auto minmax(0,1fr) auto;min-height:0;overflow:hidden}.drawer{border-left:1px solid var(--tw-border);border-right:0;display:grid;grid-template-rows:auto minmax(0,1fr) auto;min-height:0;overflow:hidden;transform:translate(0);transition:opacity .18s cubic-bezier(.2,0,0,1),transform .22s cubic-bezier(.2,0,0,1),visibility 0ms linear 0ms;width:372px;will-change:transform}.shell.git-closed .drawer{opacity:0;pointer-events:none;transform:translate(100%);transition:opacity .16s cubic-bezier(.2,0,0,1),transform .2s cubic-bezier(.4,0,1,1),visibility 0ms linear .2s;visibility:hidden}.brand{align-items:center;display:flex;justify-content:space-between;padding:18px;position:sticky;top:0;z-index:1;background:inherit}.brand button{border-radius:999px;height:34px;min-height:34px;padding:0;width:34px}.brand strong{display:block;font-size:18px;line-height:1.2}.brand span,.meta,.muted,.chat-header p{color:var(--tw-muted);font-size:12px}.sessions{align-content:start;display:block;gap:8px;grid-auto-rows:66px;overflow:auto;padding:0 12px 18px}.sessions-virtual-list{height:100%}.rail-footer{background:inherit;border-top:1px solid var(--tw-border);display:grid;gap:10px;padding:12px}.usage-summary{display:grid;gap:8px;grid-template-columns:1fr 1fr}.usage-summary div{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:4px;padding:7px 9px}.usage-summary span{color:var(--tw-muted);font-size:11px}.usage-main{align-items:center;display:flex;gap:6px;justify-content:space-between;min-width:0}.usage-summary strong{color:var(--tw-text-strong);font-size:14px;line-height:1.2}.usage-summary small{color:var(--tw-muted);font-size:10px;line-height:1.2;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rail-footer-actions{display:grid;gap:8px;grid-template-columns:minmax(0,1fr) 34px 34px;position:relative}.rail-footer-actions.restart-pending{grid-template-columns:minmax(0,1fr) 34px 34px 34px}.archive-toggle{background:transparent;border-color:var(--tw-border);color:var(--tw-text);display:grid;grid-template-columns:22px minmax(0,1fr) auto;justify-content:initial;text-align:left;width:100%}.archive-toggle.active{background:var(--tw-primary-soft);border-color:#38bdf86b}.archive-toggle:hover{background:var(--tw-panel-soft);border-color:#38bdf86b;color:var(--tw-text-strong);filter:none}.archive-toggle.active:hover{background:#0c344fd6;border-color:#38bdf89e}.archive-toggle ha-icon{--mdc-icon-size: 18px}.restart-action-wrap{position:static}.restart-action{height:34px;min-height:34px;padding:0;width:34px}.restart-action.pending{background:#f59e0b29;border-color:#f59e0b94;color:var(--tw-warning)}.restart-action.scheduled{background:var(--tw-primary-soft);border-color:#38bdf89e;color:var(--tw-primary)}.restart-action:hover{background:var(--tw-panel-soft);border-color:currentColor;filter:none}.restart-action ha-icon{--mdc-icon-size: 18px}.restart-action.scheduled ha-icon{animation:restart-spin 1.1s linear infinite}.restart-action-menu{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;bottom:calc(100% + 8px);box-shadow:var(--tw-shadow);display:grid;gap:3px;left:50%;padding:5px;position:absolute;right:auto;transform:translate(-50%);width:min(260px,100%);z-index:15}.restart-action-menu button{background:transparent;border-color:transparent;color:var(--tw-text);justify-content:flex-start;min-height:30px;padding:6px 8px;text-align:left;width:100%}.restart-action-menu button:hover{background:var(--tw-primary-soft);border-color:#38bdf859;color:var(--tw-text-strong)}@keyframes restart-spin{to{transform:rotate(-360deg)}}.archive-toggle span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.archive-toggle b{background:var(--tw-panel-soft);border-radius:999px;color:var(--tw-text);min-width:24px;padding:1px 7px;text-align:center}.validation-status-button{background:transparent;border-color:var(--tw-border);color:var(--tw-muted);height:34px;min-height:34px;padding:0;position:relative;width:34px}.validation-status-button:hover{background:var(--tw-panel-soft);border-color:currentColor}.validation-status-button[aria-disabled=true]{cursor:wait}.validation-status-button.success{color:var(--tw-success)}.validation-status-button.error{color:var(--tw-danger)}.validation-status-button.warning,.validation-status-button.running{color:var(--tw-warning)}.validation-status-button ha-icon{--mdc-icon-size: 18px}.validation-tooltip{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;bottom:calc(100% + 8px);box-shadow:var(--tw-shadow);color:var(--tw-text);display:none;gap:6px;right:-42px;max-height:min(360px,60vh);overflow:auto;padding:10px 12px;pointer-events:none;position:absolute;text-align:left;width:min(260px,calc(100vw - 32px));white-space:pre-wrap;z-index:12}.validation-tooltip strong{color:var(--tw-text-strong);display:block;font-size:12px;line-height:18px;margin-bottom:4px}.validation-tooltip span{display:block;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px}.validation-status-button:hover .validation-tooltip,.validation-status-button:focus-visible .validation-tooltip{display:block}.session-row{align-items:center;border:1px solid transparent;border-radius:8px;contain:layout paint;display:grid;grid-template-columns:minmax(0,1fr) 34px;gap:4px;height:66px;margin-bottom:8px;min-height:66px;transition:transform .18s ease,background-color .14s ease,border-color .14s ease;will-change:transform}.session{background:transparent;border:0;border-radius:8px;color:inherit;cursor:pointer;display:block;height:100%;min-width:0;padding:11px 10px;text-align:left}.session-row.active,.session-row:hover{background:var(--tw-panel-soft);border-color:var(--tw-border)}.session-row.active{box-shadow:inset 3px 0 0 var(--tw-primary)}.session-row.switching-1{animation:session-switch-1 .32s cubic-bezier(.2,0,0,1)}.session-row.switching-2{animation:session-switch-2 .32s cubic-bezier(.2,0,0,1)}@keyframes session-switch-1{0%{opacity:.72;transform:translateY(10px) scale(.985)}58%{opacity:1;transform:translateY(-2px) scale(1)}to{opacity:1;transform:translateY(0) scale(1)}}@keyframes session-switch-2{0%{opacity:.72;transform:translateY(10px) scale(.985)}58%{opacity:1;transform:translateY(-2px) scale(1)}to{opacity:1;transform:translateY(0) scale(1)}}@media(prefers-reduced-motion:reduce){.session-row.switching-1,.session-row.switching-2{animation:none}}.session-archive{opacity:.68}.session-archive:hover{color:var(--tw-danger);opacity:1}.session-archive[data-action=unarchive]:hover{color:var(--tw-primary)}.session-text{align-items:flex-start;display:grid;gap:4px;justify-items:start;min-width:0;width:100%}.title-line{align-items:center;display:flex;gap:8px;min-width:0;width:100%}.title{flex:1 1 auto;max-width:100%;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.meta{align-items:center;display:flex;gap:8px;justify-content:flex-start;min-width:0;text-align:left}.status-dot{border-radius:999px;display:inline-block;flex:0 0 8px;height:8px;width:8px}.status-dot-error{background:var(--tw-danger)}.status-dot-working{background:#facc15}.status-dot-approval{background:var(--tw-warning)}.status-dot-restart{background:var(--tw-primary)}.status-dot-idle{background:var(--tw-success)}.chat{display:grid;grid-template-rows:auto minmax(0,1fr) auto;min-width:0;min-height:0;background:transparent}.chat-header{align-items:center;-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);background:#111827e0;border-bottom:1px solid var(--tw-border);display:flex;gap:16px;justify-content:space-between;padding:16px 22px}h1{font-size:20px;line-height:1.25;margin:0}.title-area{flex:1 1 auto;min-width:0}.title-row{align-items:center;display:flex;gap:6px;min-width:0}.title-row h1{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.run-controls{align-items:center;display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.composer .run-controls{margin-top:0}.run-controls select,.run-controls-extra select,.run-select-button,.setting-field select,.setting-field input,.settings-model-row input{background:#0f172ac2;border:1px solid var(--tw-border);border-radius:7px;color:var(--tw-text);min-height:32px;min-width:0;padding:5px 8px}.run-controls>select{max-width:180px}.run-controls>.run-select{max-width:180px}.run-controls>button{gap:6px;min-height:32px;padding:5px 9px}.run-controls>button.active{background:var(--tw-primary-soft);border-color:#38bdf87a;color:var(--tw-text-strong)}.run-controls-extra{align-items:center;display:flex;flex-wrap:wrap;gap:6px}.run-controls-extra label{align-items:center;color:var(--tw-muted);display:inline-flex;font-size:11px;gap:5px}.run-controls-extra select{max-width:112px;min-height:30px}.run-controls-extra .run-select{max-width:112px}.run-select{display:inline-flex;min-width:0;position:relative}.run-select-button{align-items:center;display:inline-flex;gap:6px;justify-content:space-between;min-height:32px;min-width:0;padding:5px 8px;width:100%}.run-controls-extra .run-select-button{min-height:30px}.run-select-button span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.run-select-button ha-icon{--mdc-icon-size: 16px;flex:0 0 auto}.run-select-menu{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;bottom:calc(100% + 6px);box-shadow:var(--tw-shadow);display:grid;gap:2px;left:0;max-height:min(260px,45vh);min-width:100%;overflow:auto;padding:5px;position:absolute;width:max-content;z-index:16}.run-select-menu button{background:transparent;border-color:transparent;color:var(--tw-text);justify-content:flex-start;min-height:28px;padding:5px 8px;text-align:left;white-space:nowrap}.run-select-menu button:hover,.run-select-menu button.selected{background:var(--tw-primary-soft);border-color:#38bdf859;color:var(--tw-text-strong)}.title-input{background:var(--tw-panel);border:1px solid var(--tw-primary);border-radius:8px;color:var(--tw-text-strong);font:inherit;font-size:20px;line-height:1.25;min-height:34px;min-width:min(320px,60vw);padding:4px 8px}.header-actions,.row,.tabs{display:flex;gap:8px}.header-actions{align-items:center;flex:0 0 auto;margin-left:auto}.git-toggle{background:transparent;border-color:var(--tw-border);color:var(--tw-text);gap:7px;min-width:0}.git-toggle.active{background:var(--tw-primary-soft);border-color:#38bdf86b}.git-toggle:hover{background:var(--tw-panel-soft);border-color:#38bdf86b;color:var(--tw-text-strong);filter:none}.git-toggle ha-icon{--mdc-icon-size: 18px}.git-toggle b{background:var(--tw-danger);border-radius:999px;color:#fff;font-size:11px;line-height:18px;min-width:18px;padding:0 6px}.transcript{--message-side-margin: clamp(20px, 8vw, 140px);min-height:0;overflow:hidden;padding:24px;position:relative;scroll-behavior:smooth}.scroll-to-bottom{background:var(--tw-panel-strong);border-color:#38bdf86b;bottom:16px;box-shadow:0 12px 30px #00000057;color:var(--tw-text-strong);height:18px;left:50%;min-height:18px;padding:0;position:absolute;transform:translate(-50%);width:24px;z-index:4}.scroll-to-bottom:hover{background:var(--tw-primary-soft);border-color:var(--tw-primary);filter:none}.scroll-to-bottom svg{display:block;height:16px;width:16px}.show-older{background:var(--tw-panel-soft);border-color:var(--tw-border);color:var(--tw-text);display:flex;gap:8px;justify-content:center;margin:0 auto 18px;max-width:420px;width:100%}.show-older span{color:var(--tw-muted)}.message{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;box-shadow:0 10px 30px #0000003d;box-sizing:border-box;color:var(--tw-text);flex:0 1 920px;margin:0;max-width:920px;padding:14px 42px 14px 14px;position:relative;width:100%}.message-row{box-sizing:border-box;contain:layout paint;display:flex;margin:0 0 14px;width:100%}.message-row-center{justify-content:center}.message-row-user{justify-content:flex-end;padding-left:var(--message-side-margin)}.message-row-codex{justify-content:flex-start;padding-right:var(--message-side-margin)}.message.new-message{opacity:0;transform:translateY(18px) scale(.985);transform-origin:50% 0;will-change:opacity,transform,box-shadow}.message.new-message.enter-active{box-shadow:0 14px 38px #0000004d,0 0 0 1px #38bdf82e;opacity:1;transform:translateY(0) scale(1);transition:opacity .42s cubic-bezier(.2,.8,.2,1),transform .42s cubic-bezier(.2,.8,.2,1),box-shadow .62s ease}.message-row-user .message{padding-left:42px;padding-right:14px}.message-style-user{background:var(--tw-primary-soft);border-color:#38bdf857}.message-style-command{background:#080d18f0;border-color:#4755696b;box-shadow:0 6px 18px #00000038;color:#cbd5e1;flex-basis:760px;font-size:12px;max-width:760px;padding:8px 10px}.command-line{align-items:flex-start;display:flex;gap:8px;min-width:0}.command-text{color:#cbd5e1;flex:1 1 auto;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:18px;min-width:0;overflow-wrap:anywhere;white-space:pre-wrap}.message-style-command .message-time{flex:0 0 auto;line-height:18px;margin-left:0}.message-style-command .copy-button{flex:0 0 auto;height:24px;min-height:24px;position:static;width:24px}.message-style-command .copy-button ha-icon{--mdc-icon-size: 14px}.message-style-event,.message-style-system{background:var(--tw-accent-soft);border-color:#2dd4bf47}.message-style-action{background:var(--tw-action-soft);border-color:#7dd3fc4d}.message-style-error{background:var(--tw-danger-soft);border-color:#f8717157;padding-bottom:50px}.role{align-items:center;color:var(--tw-muted);display:flex;gap:6px;font-size:11px;font-weight:700;letter-spacing:0;margin-bottom:8px;text-transform:uppercase}.role ha-icon{--mdc-icon-size: 15px}.role b{background:#2dd4bf24;border-radius:999px;color:var(--tw-accent);font-size:10px;padding:2px 7px;text-transform:none}.message-time{color:var(--tw-muted);font-weight:600;margin-left:auto;text-transform:none}.message-row-user .role{justify-content:flex-end}.message-row-user .message-time{margin-left:0;margin-right:auto;order:-1}.markdown-body{line-height:1.5;overflow-wrap:anywhere}.markdown-body>:first-child{margin-top:0}.markdown-body>:last-child{margin-bottom:0}.message-context-attachments,.message-builder-summary{align-items:center;display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.message-builder-chip{align-items:center;background:#0f172a6b;border:1px solid rgba(45,212,191,.22);border-radius:8px;color:var(--tw-text);display:inline-flex;font-size:12px;gap:5px;line-height:18px;max-width:260px;min-width:0;padding:4px 7px}.message-builder-chip.strong{border-color:#38bdf857;color:var(--tw-text-strong);font-weight:700}.message-builder-chip ha-icon{--mdc-icon-size: 15px;color:var(--tw-primary);flex:0 0 auto}.message-builder-chip b{color:var(--tw-muted);flex:0 0 auto;font-weight:700}.message-builder-chip span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.message-context-chip{align-items:center;background:#0f172a6b;border:1px solid rgba(56,189,248,.24);border-radius:8px;color:var(--tw-text);display:inline-flex;font-size:12px;gap:5px;line-height:18px;max-width:220px;min-width:0;padding:4px 7px}.message-context-chip ha-icon{--mdc-icon-size: 15px;color:var(--tw-primary);flex:0 0 auto}.message-context-chip span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.validation-card{background:#0f172a9e;border:1px solid var(--tw-border);border-left:4px solid var(--tw-border);border-radius:8px;display:grid;gap:8px;margin-top:10px;min-width:0;padding:10px}.validation-card.success{border-left-color:var(--tw-success)}.validation-card.warning{border-left-color:#f59e0b}.validation-card.error{background:var(--tw-danger-soft);border-left-color:var(--tw-danger)}.validation-card.restart{border-left-color:var(--tw-primary)}.validation-card header{align-items:center;display:grid;gap:8px;grid-template-columns:22px minmax(0,1fr)}.validation-card header ha-icon{--mdc-icon-size: 20px;color:var(--tw-primary)}.validation-card.error header ha-icon{color:var(--tw-danger)}.validation-card header strong,.validation-card header span{display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.validation-card header strong{color:var(--tw-text-strong);font-size:13px;line-height:18px}.validation-card header span,.validation-meta span{color:var(--tw-muted);font-size:12px;line-height:16px}.validation-meta{display:grid;gap:5px;min-width:0}.validation-meta span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.validation-meta b,.validation-files b{color:var(--tw-text-strong);display:inline-block;font-size:11px;margin-right:6px;text-transform:uppercase}.validation-domains,.validation-actions{display:flex;flex-wrap:wrap;gap:6px}.validation-domains span{background:var(--tw-primary-soft);border:1px solid rgba(56,189,248,.28);border-radius:999px;color:var(--tw-text);font-size:11px;font-weight:700;line-height:22px;max-width:180px;overflow:hidden;padding:0 8px;text-overflow:ellipsis;white-space:nowrap}.validation-files{color:var(--tw-muted);display:grid;font-size:12px;gap:4px;line-height:16px;list-style:none;margin:0;padding:0}.validation-files li{min-width:0;overflow-wrap:anywhere}.validation-actions button{gap:6px;min-height:30px}.validation-output{border-top:1px solid var(--tw-border);padding-top:6px}.validation-output summary{color:var(--tw-muted);cursor:pointer;font-size:12px;font-weight:700}.validation-output pre{background:#050914;border-radius:6px;color:var(--tw-text);font-size:11px;line-height:16px;margin:7px 0 0;max-height:260px;overflow:auto;padding:8px;white-space:pre-wrap}.validation-card.compact .validation-meta,.validation-card.compact .validation-domains,.validation-card.compact .validation-actions{gap:4px}.markdown-body p{margin:0 0 10px}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{color:var(--tw-text-strong);font-size:14px;line-height:20px;margin:12px 0 6px}.markdown-body ul,.markdown-body ol{margin:0 0 10px;padding-left:22px}.markdown-body li{margin:3px 0}.markdown-body blockquote{border-left:3px solid rgba(148,163,184,.45);color:var(--tw-muted);margin:0 0 10px;padding:2px 0 2px 12px}.markdown-body a{color:var(--tw-primary)}.markdown-body code,.markdown-body pre{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.markdown-body code{background:#94a3b824;border-radius:4px;color:var(--tw-text-strong);font-size:.92em;padding:1px 4px}.markdown-body pre{background:#0f172a80;border:1px solid rgba(148,163,184,.18);border-radius:8px;margin:0;overflow:auto;padding:10px 12px;white-space:pre-wrap;word-break:break-word}.markdown-body pre code{background:transparent;border-radius:0;color:inherit;font-size:12px;padding:0}.markdown-body hr{border:0;border-top:1px solid var(--tw-border);margin:12px 0}.copy-button{position:absolute;right:8px;top:8px}.message-row-user .copy-button{left:8px;right:auto}.retry-button{bottom:8px;color:var(--tw-text-strong);left:8px;position:absolute}.message-style-error .retry-button{background:#f8717124;border-color:#f8717157}.message-style-error .retry-button:hover{background:#f8717138}.message-style-thinking{background:var(--tw-panel-soft);border-color:#38bdf847}.thinking-content{align-items:center;color:var(--tw-text);display:inline-flex;font-size:14px;gap:8px;line-height:20px}.thinking-dots{align-items:center;display:inline-flex;gap:4px;height:18px}.thinking-dots i{animation:thinking-pulse 1s ease-in-out infinite;background:var(--tw-primary);border-radius:999px;display:block;height:6px;opacity:.35;width:6px}.thinking-dots i:nth-child(2){animation-delay:.15s}.thinking-dots i:nth-child(3){animation-delay:.3s}@keyframes thinking-pulse{0%,80%,to{opacity:.35;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}@media(prefers-reduced-motion:reduce){.message.new-message{transform:none}.message.new-message.enter-active{opacity:1;transition:opacity .18s ease-out}}.composer{background:#111827eb;border-top:1px solid var(--tw-border);display:grid;gap:10px;padding:14px 22px 18px;position:relative;-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}.message-queue{display:grid;gap:8px}.context-chips{align-items:center;display:flex;flex-wrap:wrap;gap:6px}.context-chip-row,.plan-mode-toggle{align-items:center;display:flex;flex-wrap:wrap;gap:8px}.plan-mode-toggle>span{color:var(--tw-muted);font-size:12px;font-weight:700;line-height:18px;text-transform:uppercase}.plan-mode-options{align-items:center;background:#0f172ac2;border:1px solid var(--tw-border);border-radius:8px;display:inline-flex;gap:2px;min-width:0;padding:2px}.plan-mode-options button{background:transparent;border-color:transparent;color:var(--tw-muted);gap:5px;min-height:28px;padding:4px 8px}.plan-mode-options button.active{background:var(--tw-primary-soft);border-color:#38bdf87a;color:var(--tw-text-strong)}.plan-mode-options button ha-icon{--mdc-icon-size: 16px;flex:0 0 auto}.context-budget{border:1px solid var(--tw-border);border-radius:999px;color:var(--tw-muted);font-size:11px;min-height:24px;padding:3px 8px}.context-budget.warning{border-color:#f59e0b8c;color:#fbbf24}.context-budget.danger{border-color:#f87171a6;color:#fca5a5}.context-chip,.context-clear{background:var(--tw-panel);border-color:var(--tw-border);color:var(--tw-text);gap:5px;min-height:28px;max-width:220px;padding:4px 8px}.context-chip span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.context-chip ha-icon{--mdc-icon-size: 15px;flex:0 0 auto}.context-clear{color:var(--tw-muted)}.composer-input-row{position:relative}.composer-input-row textarea{padding-left:94px}.context-button,.builder-button{background:transparent;border-color:transparent;bottom:8px;color:var(--tw-muted);height:36px;min-height:36px;padding:0;position:absolute;left:10px;width:36px}.builder-button{left:50px}.context-button:hover,.builder-button:hover{background:var(--tw-panel-soft);border-color:var(--tw-border);color:var(--tw-text)}.context-button ha-icon,.builder-button ha-icon{--mdc-icon-size: 18px}.context-button b{align-items:center;background:var(--tw-primary);border-radius:999px;color:#03111f;display:inline-flex;font-size:10px;height:16px;justify-content:center;min-width:16px;padding:0 4px;position:absolute;right:-2px;top:-2px}.queued-message{align-items:center;background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:8px;grid-template-columns:minmax(0,1fr) auto;min-height:38px;padding:5px 5px 5px 10px}.queued-message span{color:var(--tw-text);font-size:13px;line-height:18px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.queued-actions{display:flex;flex:0 0 auto;gap:2px}.queued-actions .icon-button{height:28px;min-height:28px;position:relative;width:28px}.queued-actions .queue-edit{color:var(--tw-primary)}.queued-actions .queue-steer{color:var(--tw-success)}.queued-actions .queue-clear{color:var(--tw-danger)}.queued-actions .icon-button ha-icon{--mdc-icon-size: 16px;height:16px;width:16px}.queued-actions .icon-button:after{background:var(--tw-panel-strong);border:1px solid var(--tw-border);border-radius:6px;bottom:calc(100% + 8px);box-shadow:var(--tw-shadow);color:var(--tw-text-strong);content:attr(data-tooltip);display:none;font-size:12px;font-weight:600;left:50%;line-height:16px;padding:5px 8px;pointer-events:none;position:absolute;transform:translate(-50%);white-space:nowrap;z-index:15}.queued-actions .queue-clear:after{left:auto;right:0;transform:none}.queued-actions .icon-button:hover:after,.queued-actions .icon-button:focus-visible:after{display:block}.question-composer{gap:12px}.question-composer label{margin-bottom:0}.question-text{color:var(--tw-text-strong);font-size:14px;line-height:20px}.question-choices{display:grid;gap:8px;grid-template-columns:repeat(3,minmax(0,1fr))}.question-choice{background:var(--tw-panel);border-color:var(--tw-border);color:var(--tw-text);display:grid;gap:8px;grid-template-columns:18px minmax(0,1fr);justify-content:initial;min-height:42px;padding:8px 10px;position:relative;text-align:left}.question-choice:hover{background:var(--tw-primary-soft);border-color:#38bdf873;filter:none}.question-choice ha-icon{--mdc-icon-size: 18px;color:var(--tw-primary)}.question-info-wrap{align-self:start;display:inline-flex;height:18px;position:relative;width:18px}.question-choice .question-choice-tooltip{background:var(--tw-panel-strong);border:1px solid var(--tw-border);border-radius:6px;bottom:calc(100% + 8px);box-shadow:var(--tw-shadow);color:var(--tw-text-strong);display:none;font-size:12px;font-weight:600;left:-8px;line-height:16px;max-width:min(280px,calc(100vw - 32px));min-width:180px;overflow-wrap:anywhere;padding:6px 8px;pointer-events:none;position:absolute;white-space:normal;z-index:15}.question-info-wrap:hover .question-choice-tooltip,.question-choice:focus-visible .question-choice-tooltip{display:block}.question-choice span{min-width:0;overflow-wrap:anywhere}.question-custom-row{display:grid;gap:8px;grid-template-columns:minmax(0,1fr) 36px;position:relative}.archived-note{background:#111827eb;border-top:1px solid var(--tw-border);color:var(--tw-muted);font-size:13px;padding:15px 22px}textarea,input[name=question-custom]{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-text-strong);display:block;font:inherit;line-height:20px;min-height:52px;padding:15px 58px 15px 14px;resize:none;width:100%;box-shadow:0 8px 24px #00000042}input[name=question-custom]{min-height:42px;padding:10px 12px}textarea::placeholder{color:var(--tw-muted)}input[name=question-custom]::placeholder{color:var(--tw-muted)}textarea:focus,.title-input:focus,input[name=question-custom]:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:0}button{align-items:center;background:var(--tw-primary);border:1px solid transparent;border-radius:8px;color:#03111f;cursor:pointer;display:inline-flex;font:inherit;justify-content:center;min-height:34px;padding:7px 10px;transition:background-color .14s ease,border-color .14s ease,box-shadow .16s ease,color .14s ease,opacity .12s ease,transform .16s cubic-bezier(.2,0,0,1)}button:hover{filter:brightness(.97)}button:not(:disabled):not(.modal-scrim):not(.scroll-to-bottom):hover{box-shadow:var(--tw-button-shadow);transform:translateY(-1px)}button:not(:disabled):not(.modal-scrim):not(.scroll-to-bottom):active{box-shadow:none;transform:translateY(0);transition-duration:80ms}button:disabled{cursor:wait;opacity:.68}button.ghost,.tabs button,.header-actions button{background:transparent;border-color:var(--tw-border);color:var(--tw-text)}.icon-button{align-items:center;background:transparent;border-color:transparent;color:var(--tw-text);display:inline-flex;justify-content:center;min-height:32px;padding:5px;width:32px}.icon-button:hover{background:var(--tw-panel-soft);border-color:var(--tw-border)}.icon-button ha-icon{--mdc-icon-size: 18px;height:18px;width:18px}.stop-button{height:28px;min-height:28px;padding:0;width:28px}.stop-button ha-icon{--mdc-icon-size: 16px;align-items:center;display:inline-flex;height:16px;justify-content:center;line-height:1;width:16px}.send-button{height:36px;min-height:36px;padding:0;position:absolute;right:32px;bottom:26px;width:36px;box-shadow:0 10px 24px #38bdf83d}.send-button:not(:disabled):hover{background:#67d4ff;box-shadow:var(--tw-button-primary-shadow);filter:none}.send-button:not(:disabled):hover ha-icon{transform:translate(1px) rotate(-6deg)}.composer-input-row .send-button{bottom:8px;right:10px}.send-button ha-icon{--mdc-icon-size: 18px;transition:transform .16s cubic-bezier(.2,0,0,1)}.question-send{bottom:auto;position:static;right:auto}button.danger{background:var(--tw-danger);color:#fff}button.danger:not(:disabled):hover{background:#f05252;box-shadow:var(--tw-button-danger-shadow);filter:none}.drawer-header{align-items:center;background:inherit;border-bottom:1px solid var(--tw-border);display:flex;gap:12px;justify-content:space-between;padding:14px}.drawer-header h2{color:var(--tw-text-strong);font-size:18px;line-height:1.2;margin:0}.drawer-header span{color:var(--tw-muted);display:block;font-size:12px;margin-top:2px}.drawer-actions{display:flex;gap:4px}.drawer-body{min-height:0;overflow:auto;padding:14px}.git-review{display:block}.git-virtual-list{height:100%}.git-folder-heading{color:var(--tw-muted);font-size:11px;font-weight:700;letter-spacing:0;line-height:16px;margin:0 0 8px;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.diff-folder{display:grid;gap:8px;min-width:0}.diff-folder h3{color:var(--tw-muted);font-size:11px;font-weight:700;letter-spacing:0;line-height:16px;margin:0;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap}.diff-folder-files{display:grid;gap:8px;min-width:0}.git-load-more{background:transparent;border-color:var(--tw-border);color:var(--tw-text);display:grid;gap:2px;justify-items:center;min-height:44px;width:100%}.git-load-more b{color:var(--tw-muted);font-size:11px;font-weight:600}.message-file-changes{display:grid;gap:8px;margin-top:10px}.message-file-changes-head{align-items:center;display:flex;gap:8px;justify-content:flex-start;min-width:0}.message-file-changes-head span{color:var(--tw-muted);font-size:12px;line-height:18px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.message-file-changes-toggle{display:flex;justify-content:center;min-width:0}.message-file-changes-toggle button{color:#000;flex:0 0 auto;gap:6px;min-height:30px;padding:5px 8px}.message-file-changes-toggle button:hover{color:#000}.message-file-changes-toggle button ha-icon{--mdc-icon-size: 16px}.message-file-changes .diff-file{background:#080d187a}.rollback-action,.rollback-note{align-items:center;display:flex;gap:8px;margin-top:10px}.rollback-action button{min-height:34px}.rollback-note{color:var(--tw-muted);font-size:12px}.rollback-note ha-icon{--mdc-icon-size: 16px;color:var(--tw-accent)}.rollback-note.blocked ha-icon{color:var(--tw-danger)}.diff-file{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;contain:layout paint;display:block;margin-bottom:8px;min-height:48px;min-width:0;overflow:visible}.diff-card{align-items:center;background:var(--tw-panel-soft);border:0;border-radius:8px;cursor:pointer;color:var(--tw-text);display:grid;grid-template-columns:24px minmax(0,1fr) auto auto auto;gap:8px;min-height:48px;min-width:0;padding:10px 12px;text-align:left;width:100%}.diff-card:focus-visible{box-shadow:var(--tw-ring);outline:0}.diff-card.no-line-stats{grid-template-columns:24px minmax(0,1fr) auto auto}.diff-card.no-select{grid-template-columns:minmax(0,1fr) auto auto auto}.diff-card.no-select.no-line-stats{grid-template-columns:minmax(0,1fr) auto auto}.diff-file.open .diff-card{border-bottom:1px solid var(--tw-border);border-radius:8px 8px 0 0}.diff-card:hover{background:var(--tw-panel-strong);filter:none}.git-file-select{align-items:center;display:inline-flex;height:24px;justify-content:center;margin:0;min-width:24px}.git-file-select input{accent-color:var(--tw-primary);cursor:pointer;height:16px;margin:0;width:16px}.diff-file-main{display:block;min-width:0;overflow:hidden}.diff-file strong{color:var(--tw-text-strong);display:block;font-size:12px;line-height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.diff-file-main span{color:var(--tw-muted);display:block;font-size:11px;line-height:16px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.line-stats{align-items:center;display:flex;flex:0 0 auto;gap:4px}.line-stats span{border-radius:999px;font-size:11px;font-weight:700;line-height:18px;min-width:30px;padding:0 6px;text-align:center}.line-stats .added{background:#22c55e24;color:#bbf7d0}.line-stats .deleted{background:#ef444424;color:#fecaca}.file-status{align-items:center;border:1px solid var(--tw-border);border-radius:999px;color:var(--tw-muted);display:inline-flex;flex:0 0 auto;height:24px;justify-content:center;width:24px}.file-status ha-icon{--mdc-icon-size: 16px;color:inherit}.diff-open-action{align-items:center;border:1px solid var(--tw-border);border-radius:999px;color:var(--tw-muted);display:inline-flex;flex:0 0 auto;font-size:11px;font-weight:700;gap:4px;height:24px;line-height:18px;padding:0 7px 0 5px;text-transform:uppercase}.diff-open-action ha-icon{--mdc-icon-size: 16px;color:inherit;flex:0 0 auto}.file-status.added,.file-status.untracked{border-color:#22c55e73;color:var(--tw-success)}.file-status.modified{border-color:#f59e0b73;color:#fbbf24}.file-status.deleted{border-color:#ef444473;color:var(--tw-danger)}.diff-lines{background:#050914;border-radius:0 0 8px 8px;max-height:min(52vh,640px);min-width:0;overflow:auto;overscroll-behavior:contain;scrollbar-gutter:stable}.diff-lines.virtualized{height:min(52vh,640px)}.diff-line{display:grid;grid-template-columns:28px minmax(0,1fr);min-height:20px;min-width:0}.diff-line .marker{border-right:1px solid rgba(148,163,184,.15);color:var(--tw-muted);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:20px;text-align:center}.diff-line code{color:var(--tw-text);display:block;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:20px;min-width:0;overflow-wrap:anywhere;padding:0 8px;white-space:pre-wrap}.diff-line.added{background:#22c55e24}.diff-line.added .marker,.diff-line.added code{color:#bbf7d0}.diff-line.deleted{background:#ef444424}.diff-line.deleted .marker,.diff-line.deleted code{color:#fecaca}.diff-line.hunk{background:#38bdf81f}.diff-line.hunk .marker,.diff-line.hunk code{color:#bae6fd}.diff-line.meta code{color:var(--tw-muted)}.diff-empty,.diff-error{color:var(--tw-muted);font-size:12px;padding:12px}.diff-error{background:var(--tw-danger-soft);border-top:1px solid rgba(248,113,113,.28);color:#fecaca;margin:0;overflow-wrap:anywhere;white-space:pre-wrap}.commit-box{background:#111827f5;border-top:1px solid var(--tw-border);display:grid;gap:8px;grid-template-columns:minmax(0,1fr);padding:12px 14px 14px}.commit-box textarea{min-height:42px;padding:10px 12px}.commit-box button{gap:8px;width:100%}.commit-box button[type=submit]:not(:disabled):hover{background:#67d4ff;border-color:#bae6fd61;box-shadow:var(--tw-button-primary-shadow);filter:none}.commit-box button ha-icon{--mdc-icon-size: 18px;transition:transform .16s cubic-bezier(.2,0,0,1)}.commit-box button:not(:disabled):hover ha-icon,.discard-confirm button:not(:disabled):hover ha-icon{transform:scale(1.08)}.git-action-row{display:grid;gap:8px;grid-template-columns:repeat(2,minmax(0,1fr))}.discard-confirm{align-items:center;background:var(--tw-danger-soft);border:1px solid rgba(248,113,113,.32);border-radius:8px;display:grid;gap:8px;grid-template-columns:minmax(0,1fr) auto auto;padding:8px}.discard-confirm span{color:#fecaca;font-size:12px;font-weight:700;line-height:16px;min-width:0;overflow-wrap:anywhere}.discard-confirm button{min-height:30px;width:auto}.git-operation-result{border:1px solid var(--tw-border);border-left:4px solid var(--tw-border);border-radius:8px;display:grid;gap:5px;padding:9px 10px}.git-operation-result.success{border-left-color:var(--tw-success)}.git-operation-result.error{background:var(--tw-danger-soft);border-left-color:var(--tw-danger)}.git-operation-result strong{color:var(--tw-text-strong);font-size:13px;line-height:18px}.git-operation-result span{color:var(--tw-muted);font-size:12px;line-height:16px;overflow-wrap:anywhere}.git-operation-result pre{background:#050914;border-radius:6px;color:var(--tw-text);font-size:11px;line-height:16px;margin:3px 0 0;max-height:140px;overflow:auto;padding:8px;white-space:pre-wrap}.approval{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;margin-bottom:12px;padding:12px}.run-plan-review{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:10px;padding:12px}.run-plan-copy{color:var(--tw-text);font-size:13px;line-height:1.4}.run-plan-review .row button{gap:6px}.run-plan-review .row ha-icon{--mdc-icon-size: 16px}.approval-reason{background:var(--tw-primary-soft);border:1px solid #bfdbfe;border-radius:8px;color:var(--tw-text);font-size:13px;line-height:1.4;margin:10px 0;padding:9px 10px}label{color:var(--tw-muted);display:block;font-size:11px;font-weight:700;margin-bottom:6px;text-transform:uppercase}.result-head{align-items:center;display:flex;gap:10px;margin:12px 0 8px}.result{background:#050914;border:0;border-left:4px solid var(--tw-border);border-radius:0 8px 8px 0;color:var(--tw-text);max-height:55vh;overflow:auto;padding:12px}.result.success{border-left-color:var(--tw-success)}.result.error{border-left-color:var(--tw-danger)}.loading-state{background:var(--tw-panel);border:1px solid var(--tw-primary);border-radius:8px;color:var(--tw-text);margin:12px 0;padding:12px}.loading-state.error{border-color:var(--tw-danger);color:#fecaca;white-space:pre-wrap}.empty{align-self:center;justify-self:center;text-align:center;max-width:360px}.empty-actions{display:flex;gap:10px;justify-content:center}.pad{padding:10px}.debug-button{background:transparent;border-color:var(--tw-border);color:var(--tw-muted);height:34px;min-height:34px;padding:0;width:34px}.debug-button:hover{background:var(--tw-panel-soft);border-color:currentColor;color:var(--tw-text)}.debug-button:focus-visible{border-color:currentColor;color:var(--tw-text)}.debug-button ha-icon{--mdc-icon-size: 18px}.debug-button.bridge-unavailable ha-icon{color:var(--tw-danger)}.modal-backdrop{align-items:center;display:flex;top:0;right:0;bottom:0;left:0;justify-content:center;padding:22px;position:fixed;z-index:20}.modal-scrim{background:#030712b8;border:0;border-radius:0;top:0;right:0;bottom:0;left:0;min-height:0;padding:0;position:absolute}.modal{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;box-shadow:var(--tw-shadow);display:flex;flex-direction:column;height:min(720px,calc(100vh - 44px));max-height:min(720px,calc(100vh - 44px));max-width:min(860px,calc(100vw - 44px));min-width:min(620px,calc(100vw - 44px));overflow:hidden;position:relative;width:100%}.modal-header{align-items:center;border-bottom:1px solid var(--tw-border);display:flex;justify-content:space-between;padding:12px 14px}.modal-header h2{color:var(--tw-text-strong);font-size:16px;line-height:1.25;margin:0}.modal-tabs{align-items:center;border-bottom:1px solid var(--tw-border);display:flex;gap:6px;padding:8px 14px}.debug-tabs{display:flex;gap:6px}.modal-tabs button{background:transparent;border-color:var(--tw-border);color:var(--tw-muted);min-height:32px}.modal-tabs button:hover{background:var(--tw-panel-soft);border-color:#38bdf861;color:var(--tw-text-strong);filter:none}.modal-tabs button.active{background:var(--tw-primary-soft);border-color:#38bdf87a;color:var(--tw-text-strong)}.modal-tabs button.active:hover{background:#0c344fe0;border-color:#38bdf8ad}.modal-tab-spacer{flex:1 1 auto}.modal-tabs .bridge-action,.modal-tabs .core-action{align-items:center;display:inline-flex;gap:6px}.modal-tabs .bridge-action-start{background:#22c55e2e;border-color:#22c55e8c;color:#bbf7d0}.modal-tabs .bridge-action:not(:disabled):hover{background:var(--tw-primary);border-color:transparent;box-shadow:var(--tw-button-primary-shadow);color:#03111f}.modal-tabs .bridge-action-start:not(:disabled):hover{background:var(--tw-success);border-color:transparent;box-shadow:0 12px 28px #22c55e3d;color:#03140a}.modal-tabs .core-action:not(:disabled):hover{background:#fb718529;border-color:#fb71857a;color:#fecdd3}.modal-tabs .bridge-action ha-icon,.modal-tabs .core-action ha-icon{--mdc-icon-size: 16px;transition:transform .16s cubic-bezier(.2,0,0,1)}.modal-tabs .bridge-action-restart:not(:disabled):hover ha-icon,.modal-tabs .core-action:not(:disabled):hover ha-icon{transform:rotate(-18deg)}.context-modal{max-width:min(980px,calc(100vw - 44px))}.builder-modal{height:min(720px,calc(100vh - 44px));max-height:min(720px,calc(100vh - 44px));max-width:min(820px,calc(100vw - 44px));min-width:min(820px,calc(100vw - 44px));width:min(820px,calc(100vw - 44px))}.builder-modal-simple{height:min(650px,calc(100vh - 44px));max-height:min(650px,calc(100vh - 44px));max-width:min(760px,calc(100vw - 44px));min-width:min(760px,calc(100vw - 44px));width:min(760px,calc(100vw - 44px))}.settings-modal{max-width:min(980px,calc(100vw - 44px))}.settings-modal .modal-body{grid-template-rows:minmax(0,1fr);overflow:auto}.settings-saving{color:var(--tw-muted);font-size:12px}.settings-grid,.settings-run,.settings-models,.settings-debug,.settings-bridge-log,.settings-account{display:grid;gap:12px;padding:14px}.settings-account{align-content:start}.account-status-card{align-items:center;background:#0f172aa3;border:1px solid var(--tw-border);border-radius:8px;display:flex;gap:12px;justify-content:space-between;min-width:0;padding:12px}.account-status-card.success{border-color:#22c55e70}.account-status-card.error,.device-login-panel.error{border-color:#f8717199}.account-status-main{align-items:center;display:flex;gap:10px;min-width:0}.account-status-main ha-icon{--mdc-icon-size: 24px;color:var(--tw-primary);flex:0 0 auto}.account-status-main div,.device-login-header div{display:grid;gap:3px;min-width:0}.account-status-main strong,.device-login-header strong{color:var(--tw-text-strong);font-size:14px;line-height:19px}.account-status-main span,.device-login-header span{color:var(--tw-muted);font-size:12px;line-height:17px}.account-details{display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(160px,1fr))}.account-detail{background:#0f172a75;border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:5px;min-width:0;padding:10px}.account-detail span{color:var(--tw-muted);font-size:11px;font-weight:700;text-transform:uppercase}.account-detail strong{color:var(--tw-text-strong);font-size:13px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.device-login-panel{background:#0f172aa3;border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:10px;min-width:0;padding:12px}.device-login-header{align-items:start;display:flex;gap:10px;justify-content:space-between;min-width:0}.device-login-link{color:var(--tw-primary);font-size:15px;font-weight:700;min-width:0;overflow-wrap:anywhere}.device-login-field{display:grid;gap:6px;min-width:0}.device-login-field>span{color:var(--tw-muted);font-size:11px;font-weight:700;letter-spacing:0;line-height:14px;text-transform:uppercase}.device-login-code-row{align-items:center;display:flex;flex-wrap:wrap;gap:8px;min-width:0}.device-login-code{align-items:center;background:#020617;border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-text-strong);display:inline-flex;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:22px;font-weight:700;gap:10px;letter-spacing:0;min-width:0;padding:8px 8px 8px 12px;overflow-wrap:anywhere;transition:border-color .14s ease,color .14s ease;width:fit-content}.device-login-code.copied{border-color:#22c55eb8;color:#86efac}.device-login-code>span{min-width:0}.device-login-copy{align-items:center;background:#94a3b81f;border:1px solid rgba(148,163,184,.24);border-radius:6px;color:var(--tw-muted);cursor:pointer;display:inline-flex;flex:0 0 auto;height:32px;justify-content:center;padding:0;transition:background .14s ease,border-color .14s ease,color .14s ease;width:32px}.device-login-copy:hover{background:#94a3b833;color:var(--tw-text-strong)}.device-login-code.copied .device-login-copy{background:#22c55e29;border-color:#22c55e85;color:#86efac}.device-login-copy ha-icon{--mdc-icon-size: 18px}.device-login-output{background:#020617;border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-muted);font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px;margin:0;max-height:160px;overflow:auto;padding:8px;white-space:pre-wrap}.settings-bridge-log{gap:0;grid-template-rows:auto minmax(0,1fr);min-height:0;overflow:hidden;padding:0}.settings-models{align-content:start;grid-auto-rows:max-content}.settings-run{align-content:start}.settings-section{border-bottom:1px solid var(--tw-border);display:grid;gap:10px;padding-bottom:14px}.settings-section:last-child{border-bottom:0;padding-bottom:0}.settings-section h3{color:var(--tw-text-strong);font-size:13px;line-height:18px;margin:0}.settings-grid{align-items:start;grid-template-columns:repeat(auto-fit,minmax(150px,max-content));justify-content:start;padding:0}.setting-field{display:grid;gap:6px;min-width:0;width:fit-content}.setting-field span{color:var(--tw-muted);font-size:12px;font-weight:700;text-transform:uppercase}.settings-model-row{align-items:center;display:grid;gap:8px;grid-template-columns:minmax(120px,.8fr) minmax(180px,1fr) auto;min-height:38px}.settings-model-row.add{border-top:1px solid var(--tw-border);padding-top:12px}.settings-model-row button{gap:6px}.settings-modal select{cursor:pointer}.setting-field select,.setting-field input{max-width:min(260px,100%);width:auto}.builder-tabs{flex-wrap:wrap}.builder-tabs button{gap:6px}.builder-tabs button ha-icon{--mdc-icon-size: 16px}.builder-tabs button span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.builder-form{display:grid;grid-template-rows:minmax(0,1fr) auto;flex:1 1 auto;gap:0;min-height:0;overflow:hidden}.builder-scroll{display:grid;gap:12px;min-height:0;overflow:auto;padding:14px}.builder-scroll-simple{align-content:start;gap:14px;padding:18px}.builder-errors{background:var(--tw-danger-soft);border:1px solid rgba(248,113,113,.35);border-radius:8px;color:#fecaca;display:grid;gap:3px;padding:8px 10px}.builder-errors p{font-size:12px;line-height:16px;margin:0}.builder-fields{display:grid;gap:10px;grid-template-columns:repeat(2,minmax(0,1fr))}.builder-fields-simple{gap:14px;grid-template-columns:minmax(0,1fr);margin:0 auto;max-width:680px;width:100%}.builder-field{display:grid;gap:5px;min-width:0}.builder-fields-simple .builder-field{gap:7px}.builder-field.wide{grid-column:1 / -1}.builder-field span,.builder-context>span{color:var(--tw-muted);font-size:12px;font-weight:700;letter-spacing:0}.builder-field input,.builder-field select,.builder-field textarea{background:var(--tw-panel-soft);border:1px solid var(--tw-border);border-radius:8px;box-shadow:none;color:var(--tw-text-strong);font:inherit;line-height:20px;min-height:38px;min-width:0;padding:8px 10px;resize:vertical;width:100%}.builder-field textarea{min-height:86px}.builder-fields-simple .builder-field input,.builder-fields-simple .builder-field textarea{background:#0f172ac7;min-height:42px}.builder-fields-simple .builder-field textarea{min-height:96px}.builder-fields-simple .builder-field:first-child textarea{min-height:112px}.builder-field input:focus,.builder-field select:focus,.builder-field textarea:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:0}.builder-compound{display:grid;gap:7px;min-width:0}.builder-compound.action{grid-template-columns:minmax(150px,.7fr) minmax(200px,1fr)}.builder-compound.action textarea,.builder-compound.action small{grid-column:1 / -1}.builder-compound small{color:var(--tw-muted);font-size:11px;line-height:15px;min-height:15px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.entity-combobox{display:grid;gap:6px;min-width:0;position:relative}.entity-combobox-chips{display:flex;flex-wrap:wrap;gap:5px;min-width:0}.entity-combobox-chip{align-items:center;background:#3b82f61f;border:1px solid rgba(96,165,250,.28);border-radius:8px;color:var(--tw-text);display:inline-flex;font-size:12px;gap:4px;line-height:18px;max-width:100%;min-height:28px;min-width:0;padding:4px 7px}.entity-combobox-chip span{color:inherit;font-size:inherit;font-weight:600;min-width:0;overflow:hidden;text-overflow:ellipsis;text-transform:none;white-space:nowrap}.entity-combobox-chip ha-icon{--mdc-icon-size: 14px;flex:0 0 auto}.entity-combobox-menu{background:#0f172a;border:1px solid var(--tw-border);border-radius:8px;box-shadow:0 18px 50px #0000006b;display:grid;left:0;max-height:248px;min-width:100%;overflow:auto;position:absolute;right:0;top:calc(100% + 4px);z-index:40}.entity-combobox-menu button{background:transparent;border:0;border-radius:0;color:var(--tw-text);display:grid;gap:2px;justify-items:start;min-height:46px;padding:8px 10px;text-align:left}.entity-combobox-menu button:hover,.entity-combobox-menu button:focus{background:#3b82f624;outline:0}.entity-combobox-menu strong{color:var(--tw-text-strong);font-size:13px;font-weight:700;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.entity-combobox-menu small,.entity-combobox-empty{color:var(--tw-muted);font-size:12px;line-height:16px}.entity-combobox-menu small{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%}.entity-combobox-empty{padding:10px}@media(max-width:720px){.builder-compound.action{grid-template-columns:minmax(0,1fr)}.builder-compound.action textarea,.builder-compound.action small{grid-column:auto}}.builder-context{border-top:1px solid var(--tw-border);display:grid;gap:8px;padding-top:12px}.builder-scroll-simple .builder-context{margin:0 auto;max-width:680px;width:100%}.builder-context-list{align-items:center;display:flex;flex-wrap:wrap;gap:6px;min-width:0}.builder-context-chip,.builder-context-empty{align-items:center;background:#0f172ab8;border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-text);display:inline-flex;font-size:12px;gap:5px;line-height:18px;max-width:220px;min-height:28px;min-width:0;overflow:hidden;padding:4px 8px;text-overflow:ellipsis;white-space:nowrap}.builder-context-chip ha-icon{--mdc-icon-size: 15px;color:var(--tw-primary);flex:0 0 auto}.builder-context-empty{color:var(--tw-muted)}.builder-actions{background:var(--tw-panel);border-top:1px solid var(--tw-border);display:flex;gap:8px;justify-content:flex-end;padding:12px 14px}.builder-actions button{gap:6px}.context-tabs{flex-wrap:wrap}.context-tabs button{gap:6px}.context-tabs button ha-icon{--mdc-icon-size: 16px}.context-tabs button span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.context-toolbar{align-items:center;border-bottom:1px solid var(--tw-border);display:grid;gap:8px;grid-template-columns:minmax(0,1fr) auto auto;padding:10px 14px}.context-toolbar input{background:var(--tw-panel-soft);border:1px solid var(--tw-border);border-radius:8px;color:var(--tw-text-strong);font:inherit;min-height:34px;min-width:0;padding:7px 10px}.context-toolbar input:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:0}.context-toolbar span{color:var(--tw-muted);font-size:12px}.context-errors{background:var(--tw-danger-soft);border-bottom:1px solid rgba(248,113,113,.35);color:#fecaca;display:grid;gap:3px;padding:8px 14px}.context-errors p{font-size:12px;line-height:16px;margin:0;overflow-wrap:anywhere}.context-list{align-content:start;display:grid;flex:1 1 auto;gap:6px;min-height:0;overflow:auto;padding:10px 14px 14px}.context-row{align-items:center;background:#0f172ab8;border-color:var(--tw-border);color:var(--tw-text);display:grid;gap:10px;grid-template-columns:20px 24px minmax(0,1fr) auto;justify-content:initial;min-height:48px;padding:7px 10px;text-align:left;width:100%}.context-row:hover{background:var(--tw-panel-soft);filter:none}.context-row.selected{background:var(--tw-primary-soft);border-color:#38bdf87a}.context-row:disabled{cursor:not-allowed}.context-checkbox{align-items:center;border:1px solid var(--tw-border);border-radius:5px;display:inline-flex;height:18px;justify-content:center;width:18px}.context-row.selected .context-checkbox{background:var(--tw-primary);border-color:var(--tw-primary);color:#03111f}.context-checkbox ha-icon{--mdc-icon-size: 14px}.context-kind-icon{color:var(--tw-primary)}.context-kind-icon ha-icon,.context-row>ha-icon{--mdc-icon-size: 19px}.context-row-main{display:grid;gap:2px;min-width:0}.context-row-main strong{color:var(--tw-text-strong);font-size:13px;line-height:18px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.context-row-main small,.context-row-status{color:var(--tw-muted);font-size:11px;line-height:15px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.context-empty{align-items:center;color:var(--tw-muted);display:flex;font-size:13px;justify-content:center;min-height:160px}.modal-body{display:grid;flex:1 1 auto;grid-template-rows:auto minmax(0,1fr);min-height:0;overflow:hidden}.runtime-cards{border-bottom:1px solid var(--tw-border);display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));padding:10px 14px}.runtime-card{background:#0f172aa3;border:1px solid var(--tw-border);border-radius:8px;display:grid;gap:5px;min-width:0;padding:10px}.runtime-card span{color:var(--tw-muted);font-size:11px;font-weight:700;text-transform:uppercase}.runtime-card strong{color:var(--tw-text-strong);font-size:14px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.runtime-card small{color:var(--tw-muted);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.runtime-card.success{border-color:#22c55e70}.runtime-card.warning{border-color:#f59e0b80}.runtime-card.error{border-color:#f8717199}.modal-toolbar{align-items:center;border-bottom:1px solid var(--tw-border);color:var(--tw-muted);display:flex;font-size:12px;gap:10px;justify-content:space-between;min-width:0;padding:8px 14px}.modal-toolbar span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.modal-toolbar-actions{display:flex;flex:0 0 auto;gap:6px}.modal-toolbar button{flex:0 0 auto;gap:6px;min-height:30px;padding:5px 8px}.modal-toolbar .bridge-log-refresh:not(:disabled):hover{border-color:#38bdf8a3}.modal-toolbar .bridge-log-clear:not(:disabled):hover{border-color:#f8717194;color:#fecaca}.modal-toolbar ha-icon{--mdc-icon-size: 16px}.bridge-log-end{display:block;height:0}.modal .result{border-radius:0;border-left:0;margin:0;max-height:none;min-height:0}.raw-event-details{border-top:1px solid var(--tw-border);color:var(--tw-muted);margin-top:10px;padding-top:8px}.raw-event-details summary{cursor:pointer;font-size:12px}.raw-event-details pre{background:#0206176b;border:1px solid var(--tw-border);border-radius:7px;color:var(--tw-text);max-height:220px;overflow:auto;padding:8px;white-space:pre-wrap}.tool-visibility-compact.message-style-event .markdown-body,.tool-visibility-compact.message-style-action .markdown-body{max-height:120px;overflow:hidden}.validation-panel-body{min-height:0;overflow:auto;padding:14px}.validation-panel-body .validation-card{margin-top:0}.toast-stack{--toast-slide-offset: 18px;display:grid;gap:10px;max-width:calc(100% - 36px);position:absolute;right:18px;top:58px;width:min(360px,calc(100vw - 36px));z-index:10}.toast{align-items:center;background:var(--tw-panel);border:1px solid var(--tw-border);border-left:4px solid var(--tw-primary);border-radius:8px;box-shadow:var(--tw-shadow);color:var(--tw-text);display:flex;gap:10px;min-width:0;padding:11px 12px}.toast>span{min-width:0;overflow-wrap:anywhere}.toast.entering{animation:toast-slide-in .26s cubic-bezier(.2,0,0,1)}.toast.exiting{animation:toast-slide-out .26s cubic-bezier(.4,0,1,1) forwards}@keyframes toast-slide-in{0%{opacity:0;transform:translate(-10px,-6px) scale(.98)}to{opacity:1;transform:translate(0)}}@keyframes toast-slide-out{0%{opacity:1;transform:translate(0)}to{opacity:0;transform:translate(var(--toast-slide-offset))}}.toast.success{border-left-color:var(--tw-success)}.toast.error{border-left-color:var(--tw-danger)}.toast.restart{align-items:flex-start;border-left-color:var(--tw-primary);flex-wrap:wrap}.toast ha-icon{--mdc-icon-size: 20px;flex:0 0 auto}.toast-content{display:grid;flex:1 1 180px;gap:3px;min-width:0}.toast-content strong{font-size:13px}.toast-content span{color:var(--tw-muted);font-size:12px;line-height:1.35}.toast-chat-list{color:var(--tw-muted);display:grid;font-size:12px;gap:2px;line-height:1.35;list-style:none;margin:0;padding:0}.toast-chat-list li{overflow-wrap:anywhere}.toast-actions{display:flex;flex:0 0 auto;flex-wrap:wrap;gap:6px;justify-content:flex-end;margin-left:auto}.toast.restart .toast-actions{margin-left:30px}.toast-actions button{min-height:30px;padding:6px 10px}.toast-actions .secondary{background:var(--tw-surface);border-color:var(--tw-border);color:var(--tw-text)}@media(prefers-reduced-motion:reduce){.shell,.drawer,button,button ha-icon{transition-duration:1ms!important}button:not(:disabled):not(.modal-scrim):not(.scroll-to-bottom):hover,.send-button:not(:disabled):hover ha-icon,.commit-box button:not(:disabled):hover ha-icon,.discard-confirm button:not(:disabled):hover ha-icon,.modal-tabs .bridge-action:not(:disabled):hover ha-icon{transform:none}}@media(max-width:1100px){.shell,.shell.git-closed{grid-template-columns:240px minmax(0,1fr)}.drawer{bottom:0;box-shadow:var(--tw-shadow);position:fixed;right:0;top:0;width:min(420px,calc(100vw - 240px));z-index:8}}@media(max-width:720px){.shell,.shell.git-closed{grid-template-columns:1fr}.rail{display:none}.drawer{width:min(100vw,440px)}.chat-header{align-items:center;padding:14px 16px}.header-actions{flex-wrap:nowrap}.transcript{padding:16px}.composer{padding:12px 14px 16px}.send-button{right:24px;bottom:24px}.question-choices{grid-template-columns:minmax(0,1fr)}.question-send{bottom:auto;right:auto}.queued-message{align-items:start;grid-template-columns:minmax(0,1fr)}.queued-actions{justify-content:flex-end}.diff-card{grid-template-columns:24px minmax(0,1fr) auto}.diff-card.no-select{grid-template-columns:minmax(0,1fr) auto auto}.line-stats{grid-column:2 / -1;justify-content:flex-start}.git-action-row,.discard-confirm{grid-template-columns:minmax(0,1fr)}.discard-confirm button{width:100%}.diff-lines{max-height:44vh}.runtime-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}";
class _C extends HTMLElement {
  constructor() {
    super();
    jn(this, "root", null);
    jn(this, "mount");
    jn(this, "_hass", null);
    jn(this, "_panel", null);
    const o = this.attachShadow({ mode: "open" }), r = document.createElement("style");
    r.textContent = TC, o.appendChild(r), this.mount = document.createElement("div"), this.mount.className = "ha-codex-root", o.appendChild(this.mount);
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
    this.isConnected && (this.root || (this.root = Ty.createRoot(this.mount)), this.root.render(/* @__PURE__ */ d.jsx(ct.StrictMode, { children: /* @__PURE__ */ d.jsx(SC, { hass: this._hass, panel: this._panel }) })));
  }
}
customElements.get("ha-codex-panel") || customElements.define("ha-codex-panel", _C);
