//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, T = Object.prototype.hasOwnProperty;
	function ee(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function te(e, t) {
		return ee(e.type, t, e.props);
	}
	function ne(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function re(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ie = /\/+/g;
	function ae(e, t) {
		return typeof e == "object" && e && e.key != null ? re("" + e.key) : t.toString(36);
	}
	function oe(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function se(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, se(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + ae(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(ie, "$&/") + "/"), se(o, r, i, "", function(e) {
			return e;
		})) : o != null && (ne(o) && (o = te(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ie, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + ae(a, u), c += se(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + ae(a, u++), c += se(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return se(oe(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ce(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return se(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function le(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var E = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, D = {
		map: ce,
		forEach: function(e, t, n) {
			ce(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ce(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ce(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!ne(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = D, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !T.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return ee(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) T.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return ee(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = ne, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: le
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, E);
		} catch (e) {
			E(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.7";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, ne());
		else {
			var t = n(l);
			t !== null && ae(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function ee() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function te() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ee());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && ae(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? ne() : S = !1;
			}
		}
	}
	var ne;
	if (typeof y == "function") ne = function() {
		y(te);
	};
	else if (typeof MessageChannel < "u") {
		var re = new MessageChannel(), ie = re.port2;
		re.port1.onmessage = te, ne = function() {
			ie.postMessage(null);
		};
	} else ne = function() {
		_(te, 0);
	};
	function ae(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, ae(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, ne()))), r;
	}, e.unstable_shouldYield = ee, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.7";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), ee = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), ne = Symbol.for("react.lazy"), re = Symbol.for("react.activity"), ie = Symbol.for("react.memo_cache_sentinel"), ae = Symbol.iterator;
	function oe(e) {
		return typeof e != "object" || !e ? null : (e = ae && e[ae] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var se = Symbol.for("react.client.reference");
	function ce(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === se ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case T: return "Suspense";
			case ee: return "SuspenseList";
			case re: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case te: return t = e.displayName || null, t === null ? ce(e.type) || "Memo" : t;
			case ne:
				t = e._payload, e = e._init;
				try {
					return ce(e(t));
				} catch {}
		}
		return null;
	}
	var le = Array.isArray, E = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, D = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ue = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, de = [], fe = -1;
	function pe(e) {
		return { current: e };
	}
	function me(e) {
		0 > fe || (e.current = de[fe], de[fe] = null, fe--);
	}
	function O(e, t) {
		fe++, de[fe] = e.current, e.current = t;
	}
	var he = pe(null), ge = pe(null), _e = pe(null), ve = pe(null);
	function ye(e, t) {
		switch (O(_e, t), O(ge, e), O(he, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		me(he), O(he, e);
	}
	function be() {
		me(he), me(ge), me(_e);
	}
	function xe(e) {
		e.memoizedState !== null && O(ve, e);
		var t = he.current, n = Hd(t, e.type);
		t !== n && (O(ge, e), O(he, n));
	}
	function Se(e) {
		ge.current === e && (me(he), me(ge)), ve.current === e && (me(ve), Qf._currentValue = ue);
	}
	var Ce, we;
	function Te(e) {
		if (Ce === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			Ce = t && t[1] || "", we = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + Ce + e + we;
	}
	var Ee = !1;
	function De(e, t) {
		if (!e || Ee) return "";
		Ee = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Ee = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Te(n) : "";
	}
	function Oe(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Te(e.type);
			case 16: return Te("Lazy");
			case 13: return e.child !== t && t !== null ? Te("Suspense Fallback") : Te("Suspense");
			case 19: return Te("SuspenseList");
			case 0:
			case 15: return De(e.type, !1);
			case 11: return De(e.type.render, !1);
			case 1: return De(e.type, !0);
			case 31: return Te("Activity");
			default: return "";
		}
	}
	function ke(e) {
		try {
			var t = "", n = null;
			do
				t += Oe(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ae = Object.prototype.hasOwnProperty, je = t.unstable_scheduleCallback, Me = t.unstable_cancelCallback, Ne = t.unstable_shouldYield, Pe = t.unstable_requestPaint, Fe = t.unstable_now, Ie = t.unstable_getCurrentPriorityLevel, Le = t.unstable_ImmediatePriority, Re = t.unstable_UserBlockingPriority, ze = t.unstable_NormalPriority, Be = t.unstable_LowPriority, Ve = t.unstable_IdlePriority, He = t.log, k = t.unstable_setDisableYieldValue, A = null, Ue = null;
	function We(e) {
		if (typeof He == "function" && k(e), Ue && typeof Ue.setStrictMode == "function") try {
			Ue.setStrictMode(A, e);
		} catch {}
	}
	var Ge = Math.clz32 ? Math.clz32 : Je, Ke = Math.log, qe = Math.LN2;
	function Je(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ke(e) / qe | 0) | 0;
	}
	var Ye = 256, Xe = 262144, Ze = 4194304;
	function Qe(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function $e(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Qe(n))) : i = Qe(o) : i = Qe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Qe(n))) : i = Qe(o)) : i = Qe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function et(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function tt(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
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
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function nt() {
		var e = Ze;
		return Ze <<= 1, !(Ze & 62914560) && (Ze = 4194304), e;
	}
	function rt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function it(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function at(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ge(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ot(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ot(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ge(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function st(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ge(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function ct(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : lt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function lt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
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
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function ut(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function dt() {
		var e = D.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function ft(e, t) {
		var n = D.p;
		try {
			return D.p = e, t();
		} finally {
			D.p = n;
		}
	}
	var pt = Math.random().toString(36).slice(2), mt = "__reactFiber$" + pt, ht = "__reactProps$" + pt, gt = "__reactContainer$" + pt, _t = "__reactEvents$" + pt, vt = "__reactListeners$" + pt, yt = "__reactHandles$" + pt, bt = "__reactResources$" + pt, xt = "__reactMarker$" + pt;
	function St(e) {
		delete e[mt], delete e[ht], delete e[_t], delete e[vt], delete e[yt];
	}
	function Ct(e) {
		var t = e[mt];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[gt] || n[mt]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[mt]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function wt(e) {
		if (e = e[mt] || e[gt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Tt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Et(e) {
		var t = e[bt];
		return t ||= e[bt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function Dt(e) {
		e[xt] = !0;
	}
	var Ot = /* @__PURE__ */ new Set(), kt = {};
	function At(e, t) {
		jt(e, t), jt(e + "Capture", t);
	}
	function jt(e, t) {
		for (kt[e] = t, e = 0; e < t.length; e++) Ot.add(t[e]);
	}
	var Mt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Nt = {}, Pt = {};
	function Ft(e) {
		return Ae.call(Pt, e) ? !0 : Ae.call(Nt, e) ? !1 : Mt.test(e) ? Pt[e] = !0 : (Nt[e] = !0, !1);
	}
	function It(e, t, n) {
		if (Ft(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Lt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function Rt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function zt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Bt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Vt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Ht(e) {
		if (!e._valueTracker) {
			var t = Bt(e) ? "checked" : "value";
			e._valueTracker = Vt(e, t, "" + e[t]);
		}
	}
	function Ut(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Bt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Wt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Gt = /[\n"\\]/g;
	function Kt(e) {
		return e.replace(Gt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function qt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + zt(t)) : e.value !== "" + zt(t) && (e.value = "" + zt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Yt(e, o, zt(n)) : Yt(e, o, zt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + zt(s) : e.removeAttribute("name");
	}
	function Jt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Ht(e);
				return;
			}
			n = n == null ? "" : "" + zt(n), t = t == null ? n : "" + zt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Ht(e);
	}
	function Yt(e, t, n) {
		t === "number" && Wt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Xt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + zt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Zt(e, t, n) {
		if (t != null && (t = "" + zt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + zt(n);
	}
	function Qt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (le(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = zt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Ht(e);
	}
	function $t(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var en = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function j(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || en.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function tn(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && j(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && j(e, o, t[o]);
	}
	function nn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var rn = new Map([
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
	]), an = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function on(e) {
		return an.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function sn() {}
	var cn = null;
	function ln(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var un = null, dn = null;
	function fn(e) {
		var t = wt(e);
		if (t && (e = t.stateNode)) {
			var n = e[ht] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (qt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Kt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[ht] || null;
								if (!a) throw Error(i(90));
								qt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Ut(r);
					}
					break a;
				case "textarea":
					Zt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Xt(e, !!n.multiple, t, !1);
			}
		}
	}
	var pn = !1;
	function mn(e, t, n) {
		if (pn) return e(t, n);
		pn = !0;
		try {
			return e(t);
		} finally {
			if (pn = !1, (un !== null || dn !== null) && (vu(), un && (t = un, e = dn, dn = un = null, fn(t), e))) for (t = 0; t < e.length; t++) fn(e[t]);
		}
	}
	function hn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[ht] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
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
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var gn = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), _n = !1;
	if (gn) try {
		var vn = {};
		Object.defineProperty(vn, "passive", { get: function() {
			_n = !0;
		} }), window.addEventListener("test", vn, vn), window.removeEventListener("test", vn, vn);
	} catch {
		_n = !1;
	}
	var yn = null, bn = null, xn = null;
	function Sn() {
		if (xn) return xn;
		var e, t = bn, n = t.length, r, i = "value" in yn ? yn.value : yn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return xn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function Cn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function wn() {
		return !0;
	}
	function Tn() {
		return !1;
	}
	function En(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? wn : Tn, this.isPropagationStopped = Tn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = wn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = wn);
			},
			persist: function() {},
			isPersistent: wn
		}), t;
	}
	var Dn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, On = En(Dn), kn = h({}, Dn, {
		view: 0,
		detail: 0
	}), An = En(kn), jn, Mn, Nn, Pn = h({}, kn, {
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
		getModifierState: Wn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Nn && (Nn && e.type === "mousemove" ? (jn = e.screenX - Nn.screenX, Mn = e.screenY - Nn.screenY) : Mn = jn = 0, Nn = e), jn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Mn;
		}
	}), Fn = En(Pn), In = En(h({}, Pn, { dataTransfer: 0 })), Ln = En(h({}, kn, { relatedTarget: 0 })), M = En(h({}, Dn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Rn = En(h({}, Dn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), zn = En(h({}, Dn, { data: 0 })), Bn = {
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
	}, Vn = {
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
	}, Hn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Un(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Hn[e]) ? !!t[e] : !1;
	}
	function Wn() {
		return Un;
	}
	var Gn = En(h({}, kn, {
		key: function(e) {
			if (e.key) {
				var t = Bn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = Cn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Vn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Wn,
		charCode: function(e) {
			return e.type === "keypress" ? Cn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? Cn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Kn = En(h({}, Pn, {
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
	})), qn = En(h({}, kn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Wn
	})), N = En(h({}, Dn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Jn = En(h({}, Pn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Yn = En(h({}, Dn, {
		newState: 0,
		oldState: 0
	})), Xn = [
		9,
		13,
		27,
		32
	], Zn = gn && "CompositionEvent" in window, Qn = null;
	gn && "documentMode" in document && (Qn = document.documentMode);
	var $n = gn && "TextEvent" in window && !Qn, er = gn && (!Zn || Qn && 8 < Qn && 11 >= Qn), tr = " ", nr = !1;
	function rr(e, t) {
		switch (e) {
			case "keyup": return Xn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function ir(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var ar = !1;
	function or(e, t) {
		switch (e) {
			case "compositionend": return ir(t);
			case "keypress": return t.which === 32 ? (nr = !0, tr) : null;
			case "textInput": return e = t.data, e === tr && nr ? null : e;
			default: return null;
		}
	}
	function sr(e, t) {
		if (ar) return e === "compositionend" || !Zn && rr(e, t) ? (e = Sn(), xn = bn = yn = null, ar = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return er && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var cr = {
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
	function lr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!cr[e.type] : t === "textarea";
	}
	function ur(e, t, n, r) {
		un ? dn ? dn.push(r) : dn = [r] : un = r, t = Td(t, "onChange"), 0 < t.length && (n = new On("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var dr = null, fr = null;
	function pr(e) {
		vd(e, 0);
	}
	function mr(e) {
		if (Ut(Tt(e))) return e;
	}
	function hr(e, t) {
		if (e === "change") return t;
	}
	var gr = !1;
	if (gn) {
		var _r;
		if (gn) {
			var vr = "oninput" in document;
			if (!vr) {
				var yr = document.createElement("div");
				yr.setAttribute("oninput", "return;"), vr = typeof yr.oninput == "function";
			}
			_r = vr;
		} else _r = !1;
		gr = _r && (!document.documentMode || 9 < document.documentMode);
	}
	function P() {
		dr && (dr.detachEvent("onpropertychange", br), fr = dr = null);
	}
	function br(e) {
		if (e.propertyName === "value" && mr(fr)) {
			var t = [];
			ur(t, fr, e, ln(e)), mn(pr, t);
		}
	}
	function xr(e, t, n) {
		e === "focusin" ? (P(), dr = t, fr = n, dr.attachEvent("onpropertychange", br)) : e === "focusout" && P();
	}
	function F(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return mr(fr);
	}
	function Sr(e, t) {
		if (e === "click") return mr(t);
	}
	function Cr(e, t) {
		if (e === "input" || e === "change") return mr(t);
	}
	function wr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var I = typeof Object.is == "function" ? Object.is : wr;
	function L(e, t) {
		if (I(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ae.call(t, i) || !I(e[i], t[i])) return !1;
		}
		return !0;
	}
	function R(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Tr(e, t) {
		var n = R(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = R(n);
		}
	}
	function z(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? z(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Er(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Wt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Wt(e.document);
		}
		return t;
	}
	function Dr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Or = gn && "documentMode" in document && 11 >= document.documentMode, B = null, kr = null, Ar = null, V = !1;
	function jr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		V || B == null || B !== Wt(r) || (r = B, "selectionStart" in r && Dr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Ar && L(Ar, r) || (Ar = r, r = Td(kr, "onSelect"), 0 < r.length && (t = new On("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = B)));
	}
	function H(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Mr = {
		animationend: H("Animation", "AnimationEnd"),
		animationiteration: H("Animation", "AnimationIteration"),
		animationstart: H("Animation", "AnimationStart"),
		transitionrun: H("Transition", "TransitionRun"),
		transitionstart: H("Transition", "TransitionStart"),
		transitioncancel: H("Transition", "TransitionCancel"),
		transitionend: H("Transition", "TransitionEnd")
	}, U = {}, Nr = {};
	gn && (Nr = document.createElement("div").style, "AnimationEvent" in window || (delete Mr.animationend.animation, delete Mr.animationiteration.animation, delete Mr.animationstart.animation), "TransitionEvent" in window || delete Mr.transitionend.transition);
	function Pr(e) {
		if (U[e]) return U[e];
		if (!Mr[e]) return e;
		var t = Mr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Nr) return U[e] = t[n];
		return e;
	}
	var Fr = Pr("animationend"), W = Pr("animationiteration"), Ir = Pr("animationstart"), Lr = Pr("transitionrun"), Rr = Pr("transitionstart"), zr = Pr("transitioncancel"), Br = Pr("transitionend"), Vr = /* @__PURE__ */ new Map(), Hr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Hr.push("scrollEnd");
	function Ur(e, t) {
		Vr.set(e, t), At(t, [e]);
	}
	var Wr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Gr = [], Kr = 0, qr = 0;
	function Jr() {
		for (var e = Kr, t = qr = Kr = 0; t < e;) {
			var n = Gr[t];
			Gr[t++] = null;
			var r = Gr[t];
			Gr[t++] = null;
			var i = Gr[t];
			Gr[t++] = null;
			var a = Gr[t];
			if (Gr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Qr(n, i, a);
		}
	}
	function Yr(e, t, n, r) {
		Gr[Kr++] = e, Gr[Kr++] = t, Gr[Kr++] = n, Gr[Kr++] = r, qr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Xr(e, t, n, r) {
		return Yr(e, t, n, r), $r(e);
	}
	function Zr(e, t) {
		return Yr(e, null, null, t), $r(e);
	}
	function Qr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ge(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function $r(e) {
		if (50 < lu) throw lu = 0, uu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ei = {};
	function ti(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ni(e, t, n, r) {
		return new ti(e, t, n, r);
	}
	function ri(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ii(e, t) {
		var n = e.alternate;
		return n === null ? (n = ni(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ai(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function oi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ri(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, he.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case re: return e = ni(31, n, t, a), e.elementType = re, e.lanes = o, e;
			case y: return si(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = ni(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case T: return e = ni(13, n, t, a), e.elementType = T, e.lanes = o, e;
			case ee: return e = ni(19, n, t, a), e.elementType = ee, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case te:
						s = 14;
						break a;
					case ne:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = ni(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function si(e, t, n, r) {
		return e = ni(7, e, r, t), e.lanes = n, e;
	}
	function ci(e, t, n) {
		return e = ni(6, e, null, t), e.lanes = n, e;
	}
	function li(e) {
		var t = ni(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function ui(e, t, n) {
		return t = ni(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var di = /* @__PURE__ */ new WeakMap();
	function fi(e, t) {
		if (typeof e == "object" && e) {
			var n = di.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: ke(t)
			}, di.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: ke(t)
		};
	}
	var pi = [], mi = 0, hi = null, gi = 0, _i = [], vi = 0, yi = null, bi = 1, xi = "";
	function Si(e, t) {
		pi[mi++] = gi, pi[mi++] = hi, hi = e, gi = t;
	}
	function Ci(e, t, n) {
		_i[vi++] = bi, _i[vi++] = xi, _i[vi++] = yi, yi = e;
		var r = bi;
		e = xi;
		var i = 32 - Ge(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ge(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, bi = 1 << 32 - Ge(t) + i | n << i | r, xi = a + e;
		} else bi = 1 << a | n << i | r, xi = e;
	}
	function wi(e) {
		e.return !== null && (Si(e, 1), Ci(e, 1, 0));
	}
	function Ti(e) {
		for (; e === hi;) hi = pi[--mi], pi[mi] = null, gi = pi[--mi], pi[mi] = null;
		for (; e === yi;) yi = _i[--vi], _i[vi] = null, xi = _i[--vi], _i[vi] = null, bi = _i[--vi], _i[vi] = null;
	}
	function Ei(e, t) {
		_i[vi++] = bi, _i[vi++] = xi, _i[vi++] = yi, bi = t.id, xi = t.overflow, yi = e;
	}
	var Di = null, G = null, K = !1, Oi = null, ki = !1, Ai = Error(i(519));
	function ji(e) {
		throw Li(fi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ai;
	}
	function Mi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[mt] = e, t[ht] = r, n) {
			case "dialog":
				$("cancel", t), $("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				$("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < gd.length; n++) $(gd[n], t);
				break;
			case "source":
				$("error", t);
				break;
			case "img":
			case "image":
			case "link":
				$("error", t), $("load", t);
				break;
			case "details":
				$("toggle", t);
				break;
			case "input":
				$("invalid", t), Jt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				$("invalid", t);
				break;
			case "textarea": $("invalid", t), Qt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && ($("beforetoggle", t), $("toggle", t)), r.onScroll != null && $("scroll", t), r.onScrollEnd != null && $("scrollend", t), r.onClick != null && (t.onclick = sn), t = !0) : t = !1, t || ji(e, !0);
	}
	function Ni(e) {
		for (Di = e.return; Di;) switch (Di.tag) {
			case 5:
			case 31:
			case 13:
				ki = !1;
				return;
			case 27:
			case 3:
				ki = !0;
				return;
			default: Di = Di.return;
		}
	}
	function Pi(e) {
		if (e !== Di) return !1;
		if (!K) return Ni(e), K = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && G && ji(e), Ni(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			G = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			G = uf(e);
		} else t === 27 ? (t = G, Zd(e.type) ? (e = lf, lf = null, G = e) : G = t) : G = Di ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Fi() {
		G = Di = null, K = !1;
	}
	function Ii() {
		var e = Oi;
		return e !== null && (Yl === null ? Yl = e : Yl.push.apply(Yl, e), Oi = null), e;
	}
	function Li(e) {
		Oi === null ? Oi = [e] : Oi.push(e);
	}
	var Ri = pe(null), zi = null, Bi = null;
	function Vi(e, t, n) {
		O(Ri, t._currentValue), t._currentValue = n;
	}
	function Hi(e) {
		e._currentValue = Ri.current, me(Ri);
	}
	function Ui(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Wi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ui(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ui(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Gi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					I(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ve.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Wi(t, e, n, r), t.flags |= 262144;
	}
	function Ki(e) {
		for (e = e.firstContext; e !== null;) {
			if (!I(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function qi(e) {
		zi = e, Bi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Ji(e) {
		return Xi(zi, e);
	}
	function Yi(e, t) {
		return zi === null && qi(e), Xi(e, t);
	}
	function Xi(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Bi === null) {
			if (e === null) throw Error(i(308));
			Bi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Bi = Bi.next = t;
		return n;
	}
	var Zi = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, Qi = t.unstable_scheduleCallback, $i = t.unstable_NormalPriority, ea = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ta() {
		return {
			controller: new Zi(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function na(e) {
		e.refCount--, e.refCount === 0 && Qi($i, function() {
			e.controller.abort();
		});
	}
	var ra = null, ia = 0, aa = 0, oa = null;
	function sa(e, t) {
		if (ra === null) {
			var n = ra = [];
			ia = 0, aa = ud(), oa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ia++, t.then(ca, ca), t;
	}
	function ca() {
		if (--ia === 0 && ra !== null) {
			oa !== null && (oa.status = "fulfilled");
			var e = ra;
			ra = null, aa = 0, oa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function la(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var ua = E.S;
	E.S = function(e, t) {
		Ql = Fe(), typeof t == "object" && t && typeof t.then == "function" && sa(e, t), ua !== null && ua(e, t);
	};
	var da = pe(null);
	function fa() {
		var e = da.current;
		return e === null ? Fl.pooledCache : e;
	}
	function pa(e, t) {
		t === null ? O(da, da.current) : O(da, t.pool);
	}
	function ma() {
		var e = fa();
		return e === null ? null : {
			parent: ea._currentValue,
			pool: e
		};
	}
	var ha = Error(i(460)), ga = Error(i(474)), _a = Error(i(542)), va = { then: function() {} };
	function ya(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function ba(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(sn, sn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, wa(e), e;
			default:
				if (typeof t.status == "string") t.then(sn, sn);
				else {
					if (e = Fl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, wa(e), e;
				}
				throw Sa = t, ha;
		}
	}
	function xa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Sa = e, ha) : e;
		}
	}
	var Sa = null;
	function Ca() {
		if (Sa === null) throw Error(i(459));
		var e = Sa;
		return Sa = null, e;
	}
	function wa(e) {
		if (e === ha || e === _a) throw Error(i(483));
	}
	var Ta = null, Ea = 0;
	function Da(e) {
		var t = Ea;
		return Ea += 1, Ta === null && (Ta = []), ba(Ta, e, t);
	}
	function Oa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function ka(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Aa(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = ii(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ci(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === ne && xa(i) === t.type) ? (t = a(t, n.props), Oa(t, n), t.return = e, t) : (t = oi(n.type, n.key, n.props, null, e.mode, r), Oa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = ui(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = si(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ci("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = oi(t.type, t.key, t.props, null, e.mode, n), Oa(n, t), n.return = e, n;
					case v: return t = ui(t, e.mode, n), t.return = e, t;
					case ne: return t = xa(t), f(e, t, n);
				}
				if (le(t) || oe(t)) return t = si(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Da(t), n);
				if (t.$$typeof === C) return f(e, Yi(e, t), n);
				ka(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case ne: return n = xa(n), p(e, t, n, r);
				}
				if (le(n) || oe(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Da(n), r);
				if (n.$$typeof === C) return p(e, t, Yi(e, n), r);
				ka(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ne: return r = xa(r), m(e, t, n, r, i);
				}
				if (le(r) || oe(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Da(r), i);
				if (r.$$typeof === C) return m(e, t, n, Yi(t, r), i);
				ka(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), K && Si(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return K && Si(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), K && Si(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), K && Si(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return K && Si(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), K && Si(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ne && xa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Oa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = si(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = oi(o.type, o.key, o.props, null, e.mode, c), Oa(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = ui(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case ne: return o = xa(o), b(e, r, o, c);
				}
				if (le(o)) return h(e, r, o, c);
				if (oe(o)) {
					if (l = oe(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Da(o), c);
				if (o.$$typeof === C) return b(e, r, Yi(e, o), c);
				ka(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ci(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ea = 0;
				var i = b(e, t, n, r);
				return Ta = null, i;
			} catch (t) {
				if (t === ha || t === _a) throw t;
				var a = ni(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var ja = Aa(!0), Ma = Aa(!1), Na = !1;
	function Pa(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Fa(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ia(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function La(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, Pl & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = $r(e), Qr(e, null, n), t;
		}
		return Yr(e, r, t, n), $r(e);
	}
	function Ra(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	function za(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ba = !1;
	function Va() {
		if (Ba) {
			var e = oa;
			if (e !== null) throw e;
		}
	}
	function Ha(e, t, n, r) {
		Ba = !1;
		var i = e.updateQueue;
		Na = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Q & f) === f : (r & f) === f) {
					f !== 0 && f === aa && (Ba = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: Na = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Ul |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ua(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Wa(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ua(n[e], t);
	}
	var Ga = pe(null), Ka = pe(0);
	function qa(e, t) {
		e = Vl, O(Ka, e), O(Ga, t), Vl = e | t.baseLanes;
	}
	function Ja() {
		O(Ka, Vl), O(Ga, Ga.current);
	}
	function Ya() {
		Vl = Ka.current, me(Ga), me(Ka);
	}
	var Xa = pe(null), Za = null;
	function Qa(e) {
		var t = e.alternate;
		O(ro, ro.current & 1), O(Xa, e), Za === null && (t === null || Ga.current !== null || t.memoizedState !== null) && (Za = e);
	}
	function $a(e) {
		O(ro, ro.current), O(Xa, e), Za === null && (Za = e);
	}
	function eo(e) {
		e.tag === 22 ? (O(ro, ro.current), O(Xa, e), Za === null && (Za = e)) : to(e);
	}
	function to() {
		O(ro, ro.current), O(Xa, Xa.current);
	}
	function no(e) {
		me(Xa), Za === e && (Za = null), me(ro);
	}
	var ro = pe(0);
	function io(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var ao = 0, q = null, oo = null, so = null, co = !1, lo = !1, uo = !1, fo = 0, po = 0, mo = null, ho = 0;
	function go() {
		throw Error(i(321));
	}
	function _o(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!I(e[n], t[n])) return !1;
		return !0;
	}
	function vo(e, t, n, r, i, a) {
		return ao = a, q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, E.H = e === null || e.memoizedState === null ? Ms : Ns, uo = !1, a = n(r, i), uo = !1, lo && (a = J(t, n, r, i)), yo(e), a;
	}
	function yo(e) {
		E.H = js;
		var t = oo !== null && oo.next !== null;
		if (ao = 0, so = oo = q = null, co = !1, po = 0, mo = null, t) throw Error(i(300));
		e === null || Xs || (e = e.dependencies, e !== null && Ki(e) && (Xs = !0));
	}
	function J(e, t, n, r) {
		q = e;
		var a = 0;
		do {
			if (lo && (mo = null), po = 0, lo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, so = oo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			E.H = Ps, o = t(n, r);
		} while (lo);
		return o;
	}
	function bo() {
		var e = E.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Do(t) : t, e = e.useState()[0], (oo === null ? null : oo.memoizedState) !== e && (q.flags |= 1024), t;
	}
	function xo() {
		var e = fo !== 0;
		return fo = 0, e;
	}
	function So(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Co(e) {
		if (co) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			co = !1;
		}
		ao = 0, so = oo = q = null, lo = !1, po = fo = 0, mo = null;
	}
	function wo() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return so === null ? q.memoizedState = so = e : so = so.next = e, so;
	}
	function To() {
		if (oo === null) {
			var e = q.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = oo.next;
		var t = so === null ? q.memoizedState : so.next;
		if (t !== null) so = t, oo = e;
		else {
			if (e === null) throw q.alternate === null ? Error(i(467)) : Error(i(310));
			oo = e, e = {
				memoizedState: oo.memoizedState,
				baseState: oo.baseState,
				baseQueue: oo.baseQueue,
				queue: oo.queue,
				next: null
			}, so === null ? q.memoizedState = so = e : so = so.next = e;
		}
		return so;
	}
	function Eo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Do(e) {
		var t = po;
		return po += 1, mo === null && (mo = []), e = ba(mo, e, t), t = q, (so === null ? t.memoizedState : so.next) === null && (t = t.alternate, E.H = t === null || t.memoizedState === null ? Ms : Ns), e;
	}
	function Oo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Do(e);
			if (e.$$typeof === C) return Ji(e);
		}
		throw Error(i(438, String(e)));
	}
	function ko(e) {
		var t = null, n = q.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = q.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Eo(), q.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ie;
		return t.index++, n;
	}
	function Ao(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function jo(e) {
		return Mo(To(), oo, e);
	}
	function Mo(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (ao & f) === f : (Q & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === aa && (d = !0);
					else if ((ao & p) === p) {
						u = u.next, p === aa && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, q.lanes |= p, Ul |= p;
					f = u.action, uo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, q.lanes |= f, Ul |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !I(o, e.memoizedState) && (Xs = !0, d && (n = oa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function No(e) {
		var t = To(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			I(o, t.memoizedState) || (Xs = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Po(e, t, n) {
		var r = q, a = To(), o = K;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !I((oo || a).memoizedState, n);
		if (s && (a.memoizedState = n, Xs = !0), a = a.queue, is(Io.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || so !== null && so.memoizedState.tag & 1) {
			if (r.flags |= 2048, $o(9, { destroy: void 0 }, Fo.bind(null, r, a, n, t), null), Fl === null) throw Error(i(349));
			o || ao & 127 || Y(r, t, n);
		}
		return n;
	}
	function Y(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = q.updateQueue, t === null ? (t = Eo(), q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Fo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Lo(t) && Ro(e);
	}
	function Io(e, t, n) {
		return n(function() {
			Lo(t) && Ro(e);
		});
	}
	function Lo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !I(e, n);
		} catch {
			return !0;
		}
	}
	function Ro(e) {
		var t = Zr(e, 2);
		t !== null && pu(t, e, 2);
	}
	function zo(e) {
		var t = wo();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), uo) {
				We(!0);
				try {
					n();
				} finally {
					We(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Ao,
			lastRenderedState: e
		}, t;
	}
	function Bo(e, t, n, r) {
		return e.baseState = n, Mo(e, oo, typeof r == "function" ? r : Ao);
	}
	function Vo(e, t, n, r, a) {
		if (Os(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			E.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ho(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ho(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = E.T, o = {};
			E.T = o;
			try {
				var s = n(i, r), c = E.S;
				c !== null && c(o, s), Uo(e, t, s);
			} catch (n) {
				Go(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), E.T = a;
			}
		} else try {
			a = n(i, r), Uo(e, t, a);
		} catch (n) {
			Go(e, t, n);
		}
	}
	function Uo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Wo(e, t, n);
		}, function(n) {
			return Go(e, t, n);
		}) : Wo(e, t, n);
	}
	function Wo(e, t, n) {
		t.status = "fulfilled", t.value = n, Ko(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ho(e, n)));
	}
	function Go(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ko(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ko(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function qo(e, t) {
		return t;
	}
	function Jo(e, t) {
		if (K) {
			var n = Fl.formState;
			if (n !== null) {
				a: {
					var r = q;
					if (K) {
						if (G) {
							b: {
								for (var i = G, a = ki; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								G = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ji(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = wo(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: qo,
			lastRenderedState: t
		}, n.queue = r, n = Ts.bind(null, q, r), r.dispatch = n, r = zo(!1), a = Ds.bind(null, q, !1, r.queue), r = wo(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Vo.bind(null, q, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Yo(e) {
		return Xo(To(), oo, e);
	}
	function Xo(e, t, n) {
		if (t = Mo(e, t, qo)[0], e = jo(Ao)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Do(t);
		} catch (e) {
			throw e === ha ? _a : e;
		}
		else r = t;
		t = To();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (q.flags |= 2048, $o(9, { destroy: void 0 }, Zo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Zo(e, t) {
		e.action = t;
	}
	function Qo(e) {
		var t = To(), n = oo;
		if (n !== null) return Xo(t, n, e);
		To(), t = t.memoizedState, n = To();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function $o(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = q.updateQueue, t === null && (t = Eo(), q.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function es() {
		return To().memoizedState;
	}
	function ts(e, t, n, r) {
		var i = wo();
		q.flags |= e, i.memoizedState = $o(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ns(e, t, n, r) {
		var i = To();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		oo !== null && r !== null && _o(r, oo.memoizedState.deps) ? i.memoizedState = $o(t, a, n, r) : (q.flags |= e, i.memoizedState = $o(1 | t, a, n, r));
	}
	function rs(e, t) {
		ts(8390656, 8, e, t);
	}
	function is(e, t) {
		ns(2048, 8, e, t);
	}
	function as(e) {
		q.flags |= 4;
		var t = q.updateQueue;
		if (t === null) t = Eo(), q.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function os(e) {
		var t = To().memoizedState;
		return as({
			ref: t,
			nextImpl: e
		}), function() {
			if (Pl & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ss(e, t) {
		return ns(4, 2, e, t);
	}
	function cs(e, t) {
		return ns(4, 4, e, t);
	}
	function ls(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function us(e, t, n) {
		n = n == null ? null : n.concat([e]), ns(4, 4, ls.bind(null, t, e), n);
	}
	function ds() {}
	function X(e, t) {
		var n = To();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && _o(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function fs(e, t) {
		var n = To();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && _o(t, r[1])) return r[0];
		if (r = e(), uo) {
			We(!0);
			try {
				e();
			} finally {
				We(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ps(e, t, n) {
		return n === void 0 || ao & 1073741824 && !(Q & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = fu(), q.lanes |= e, Ul |= e, n);
	}
	function ms(e, t, n, r) {
		return I(n, t) ? n : Ga.current === null ? !(ao & 42) || ao & 1073741824 && !(Q & 261930) ? (Xs = !0, e.memoizedState = n) : (e = fu(), q.lanes |= e, Ul |= e, t) : (e = ps(e, n, r), I(e, t) || (Xs = !0), e);
	}
	function hs(e, t, n, r, i) {
		var a = D.p;
		D.p = a !== 0 && 8 > a ? a : 8;
		var o = E.T, s = {};
		E.T = s, Ds(e, !1, t, n);
		try {
			var c = i(), l = E.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Es(e, t, la(c, r), du(e)) : Es(e, t, r, du(e));
		} catch (n) {
			Es(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, du());
		} finally {
			D.p = a, o !== null && s.types !== null && (o.types = s.types), E.T = o;
		}
	}
	function gs() {}
	function _s(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = vs(e).queue;
		hs(e, a, t, ue, n === null ? gs : function() {
			return ys(e), n(r);
		});
	}
	function vs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ue,
			baseState: ue,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ao,
				lastRenderedState: ue
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Ao,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ys(e) {
		var t = vs(e);
		t.next === null && (t = e.alternate.memoizedState), Es(e, t.next.queue, {}, du());
	}
	function bs() {
		return Ji(Qf);
	}
	function xs() {
		return To().memoizedState;
	}
	function Ss() {
		return To().memoizedState;
	}
	function Cs(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = du();
					e = Ia(n);
					var r = La(t, e, n);
					r !== null && (pu(r, t, n), Ra(r, t, n)), t = { cache: ta() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function ws(e, t, n) {
		var r = du();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Os(e) ? ks(t, n) : (n = Xr(e, t, n, r), n !== null && (pu(n, e, r), As(n, t, r)));
	}
	function Ts(e, t, n) {
		Es(e, t, n, du());
	}
	function Es(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Os(e)) ks(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, I(s, o)) return Yr(e, t, i, 0), Fl === null && Jr(), !1;
			} catch {}
			if (n = Xr(e, t, i, r), n !== null) return pu(n, e, r), As(n, t, r), !0;
		}
		return !1;
	}
	function Ds(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ud(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Os(e)) {
			if (t) throw Error(i(479));
		} else t = Xr(e, n, r, 2), t !== null && pu(t, e, 2);
	}
	function Os(e) {
		var t = e.alternate;
		return e === q || t !== null && t === q;
	}
	function ks(e, t) {
		lo = co = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function As(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, st(e, n);
		}
	}
	var js = {
		readContext: Ji,
		use: Oo,
		useCallback: go,
		useContext: go,
		useEffect: go,
		useImperativeHandle: go,
		useLayoutEffect: go,
		useInsertionEffect: go,
		useMemo: go,
		useReducer: go,
		useRef: go,
		useState: go,
		useDebugValue: go,
		useDeferredValue: go,
		useTransition: go,
		useSyncExternalStore: go,
		useId: go,
		useHostTransitionStatus: go,
		useFormState: go,
		useActionState: go,
		useOptimistic: go,
		useMemoCache: go,
		useCacheRefresh: go
	};
	js.useEffectEvent = go;
	var Ms = {
		readContext: Ji,
		use: Oo,
		useCallback: function(e, t) {
			return wo().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ji,
		useEffect: rs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ts(4194308, 4, ls.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ts(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ts(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = wo();
			t = t === void 0 ? null : t;
			var r = e();
			if (uo) {
				We(!0);
				try {
					e();
				} finally {
					We(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = wo();
			if (n !== void 0) {
				var i = n(t);
				if (uo) {
					We(!0);
					try {
						n(t);
					} finally {
						We(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ws.bind(null, q, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = wo();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = zo(e);
			var t = e.queue, n = Ts.bind(null, q, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ds,
		useDeferredValue: function(e, t) {
			return ps(wo(), e, t);
		},
		useTransition: function() {
			var e = zo(!1);
			return e = hs.bind(null, q, e.queue, !0, !1), wo().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = q, a = wo();
			if (K) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Fl === null) throw Error(i(349));
				Q & 127 || Y(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, rs(Io.bind(null, r, o, e), [e]), r.flags |= 2048, $o(9, { destroy: void 0 }, Fo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = wo(), t = Fl.identifierPrefix;
			if (K) {
				var n = xi, r = bi;
				n = (r & ~(1 << 32 - Ge(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = fo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = ho++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: bs,
		useFormState: Jo,
		useActionState: Jo,
		useOptimistic: function(e) {
			var t = wo();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ds.bind(null, q, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: ko,
		useCacheRefresh: function() {
			return wo().memoizedState = Cs.bind(null, q);
		},
		useEffectEvent: function(e) {
			var t = wo(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (Pl & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ns = {
		readContext: Ji,
		use: Oo,
		useCallback: X,
		useContext: Ji,
		useEffect: is,
		useImperativeHandle: us,
		useInsertionEffect: ss,
		useLayoutEffect: cs,
		useMemo: fs,
		useReducer: jo,
		useRef: es,
		useState: function() {
			return jo(Ao);
		},
		useDebugValue: ds,
		useDeferredValue: function(e, t) {
			return ms(To(), oo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = jo(Ao)[0], t = To().memoizedState;
			return [typeof e == "boolean" ? e : Do(e), t];
		},
		useSyncExternalStore: Po,
		useId: xs,
		useHostTransitionStatus: bs,
		useFormState: Yo,
		useActionState: Yo,
		useOptimistic: function(e, t) {
			return Bo(To(), oo, e, t);
		},
		useMemoCache: ko,
		useCacheRefresh: Ss
	};
	Ns.useEffectEvent = os;
	var Ps = {
		readContext: Ji,
		use: Oo,
		useCallback: X,
		useContext: Ji,
		useEffect: is,
		useImperativeHandle: us,
		useInsertionEffect: ss,
		useLayoutEffect: cs,
		useMemo: fs,
		useReducer: No,
		useRef: es,
		useState: function() {
			return No(Ao);
		},
		useDebugValue: ds,
		useDeferredValue: function(e, t) {
			var n = To();
			return oo === null ? ps(n, e, t) : ms(n, oo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = No(Ao)[0], t = To().memoizedState;
			return [typeof e == "boolean" ? e : Do(e), t];
		},
		useSyncExternalStore: Po,
		useId: xs,
		useHostTransitionStatus: bs,
		useFormState: Qo,
		useActionState: Qo,
		useOptimistic: function(e, t) {
			var n = To();
			return oo === null ? (n.baseState = e, [e, n.queue.dispatch]) : Bo(n, oo, e, t);
		},
		useMemoCache: ko,
		useCacheRefresh: Ss
	};
	Ps.useEffectEvent = os;
	function Fs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Is = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Ia(r);
			i.payload = t, n != null && (i.callback = n), t = La(e, i, r), t !== null && (pu(t, e, r), Ra(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Ia(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = La(e, i, r), t !== null && (pu(t, e, r), Ra(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = du(), r = Ia(n);
			r.tag = 2, t != null && (r.callback = t), t = La(e, r, n), t !== null && (pu(t, e, n), Ra(t, e, n));
		}
	};
	function Ls(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !L(n, r) || !L(i, a) : !0;
	}
	function Rs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Is.enqueueReplaceState(t, t.state, null);
	}
	function zs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Bs(e) {
		Wr(e);
	}
	function Vs(e) {
		console.error(e);
	}
	function Hs(e) {
		Wr(e);
	}
	function Us(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ws(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Gs(e, t, n) {
		return n = Ia(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Us(e, t);
		}, n;
	}
	function Ks(e) {
		return e = Ia(e), e.tag = 3, e;
	}
	function qs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ws(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ws(t, n, r), typeof i != "function" && (tu === null ? tu = new Set([this]) : tu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Js(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Gi(t, n, a, !0), n = Xa.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Za === null ? Tu() : n.alternate === null && Hl === 0 && (Hl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === va ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Wu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === va ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Wu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Wu(e, r, a), Tu(), !1;
		}
		if (K) return t = Xa.current, t === null ? (r !== Ai && (t = Error(i(423), { cause: r }), Li(fi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = fi(r, n), a = Gs(e.stateNode, r, a), za(e, a), Hl !== 4 && (Hl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ai && (e = Error(i(422), { cause: r }), Li(fi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = fi(o, n), Jl === null ? Jl = [o] : Jl.push(o), Hl !== 4 && (Hl = 2), t === null) return !0;
		r = fi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Gs(n.stateNode, r, e), za(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (tu === null || !tu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Ks(a), qs(a, e, n, r), za(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Ys = Error(i(461)), Xs = !1;
	function Zs(e, t, n, r) {
		t.child = e === null ? Ma(t, null, n, r) : ja(t, e.child, n, r);
	}
	function Qs(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return qi(t), r = vo(e, t, n, o, a, i), s = xo(), e !== null && !Xs ? (So(e, t, i), Sc(e, t, i)) : (K && s && wi(t), t.flags |= 1, Zs(e, t, r, i), t.child);
	}
	function $s(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ri(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, ec(e, t, a, r, i)) : (e = oi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Cc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? L : n, n(o, r) && e.ref === t.ref) return Sc(e, t, i);
		}
		return t.flags |= 1, e = ii(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function ec(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (L(a, r) && e.ref === t.ref) if (Xs = !1, t.pendingProps = r = a, Cc(e, i)) e.flags & 131072 && (Xs = !0);
			else return t.lanes = e.lanes, Sc(e, t, i);
		}
		return cc(e, t, n, r, i);
	}
	function tc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return rc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && pa(t, a === null ? null : a.cachePool), a === null ? Ja() : qa(t, a), eo(t);
			else return r = t.lanes = 536870912, rc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && pa(t, null), Ja(), to(t)) : (pa(t, a.cachePool), qa(t, a), to(t), t.memoizedState = null);
		return Zs(e, t, i, n), t.child;
	}
	function nc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function rc(e, t, n, r, i) {
		var a = fa();
		return a = a === null ? null : {
			parent: ea._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && pa(t, null), Ja(), eo(t), e !== null && Gi(e, t, r, !0), t.childLanes = i, null;
	}
	function ic(e, t) {
		return t = _c({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function ac(e, t, n) {
		return ja(t, e.child, null, n), e = ic(t, t.pendingProps), e.flags |= 2, no(t), t.memoizedState = null, e;
	}
	function oc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (K) {
				if (r.mode === "hidden") return e = ic(t, r), t.lanes = 536870912, nc(null, e);
				if ($a(t), (e = G) ? (e = rf(e, ki), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: yi === null ? null : {
						id: bi,
						overflow: xi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = li(e), n.return = t, t.child = n, Di = t, G = null)) : e = null, e === null) throw ji(t);
				return t.lanes = 536870912, null;
			}
			return ic(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if ($a(t), a) if (t.flags & 256) t.flags &= -257, t = ac(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (Xs || Gi(e, t, n, !1), a = (n & e.childLanes) !== 0, Xs || a) {
				if (r = Fl, r !== null && (s = ct(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Zr(e, s), pu(r, e, s), Ys;
				Tu(), t = ac(e, t, n);
			} else e = o.treeContext, G = cf(s.nextSibling), Di = t, K = !0, Oi = null, ki = !1, e !== null && Ei(t, e), t = ic(t, r), t.flags |= 4096;
			return t;
		}
		return e = ii(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function sc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function cc(e, t, n, r, i) {
		return qi(t), n = vo(e, t, n, r, void 0, i), r = xo(), e !== null && !Xs ? (So(e, t, i), Sc(e, t, i)) : (K && r && wi(t), t.flags |= 1, Zs(e, t, n, i), t.child);
	}
	function lc(e, t, n, r, i, a) {
		return qi(t), t.updateQueue = null, n = J(t, r, n, i), yo(e), r = xo(), e !== null && !Xs ? (So(e, t, a), Sc(e, t, a)) : (K && r && wi(t), t.flags |= 1, Zs(e, t, n, a), t.child);
	}
	function uc(e, t, n, r, i) {
		if (qi(t), t.stateNode === null) {
			var a = ei, o = n.contextType;
			typeof o == "object" && o && (a = Ji(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Is, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Pa(t), o = n.contextType, a.context = typeof o == "object" && o ? Ji(o) : ei, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Fs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Is.enqueueReplaceState(a, a.state, null), Ha(t, r, a, i), Va(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = zs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ei, typeof u == "object" && u && (o = Ji(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Rs(t, a, r, o), Na = !1;
			var f = t.memoizedState;
			a.state = f, Ha(t, r, a, i), Va(), l = t.memoizedState, s || f !== l || Na ? (typeof d == "function" && (Fs(t, n, d, r), l = t.memoizedState), (c = Na || Ls(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Fa(e, t), o = t.memoizedProps, u = zs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ei, typeof l == "object" && l && (c = Ji(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Rs(t, a, r, c), Na = !1, f = t.memoizedState, a.state = f, Ha(t, r, a, i), Va();
			var p = t.memoizedState;
			o !== d || f !== p || Na || e !== null && e.dependencies !== null && Ki(e.dependencies) ? (typeof s == "function" && (Fs(t, n, s, r), p = t.memoizedState), (u = Na || Ls(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Ki(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, sc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = ja(t, e.child, null, i), t.child = ja(t, null, n, i)) : Zs(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Sc(e, t, i), e;
	}
	function dc(e, t, n, r) {
		return Fi(), t.flags |= 256, Zs(e, t, n, r), t.child;
	}
	var fc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function pc(e) {
		return {
			baseLanes: e,
			cachePool: ma()
		};
	}
	function mc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Kl), e;
	}
	function hc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (ro.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (K) {
				if (a ? Qa(t) : to(t), (e = G) ? (e = rf(e, ki), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: yi === null ? null : {
						id: bi,
						overflow: xi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = li(e), n.return = t, t.child = n, Di = t, G = null)) : e = null, e === null) throw ji(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (to(t), a = t.mode, c = _c({
				mode: "hidden",
				children: c
			}, a), r = si(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = pc(n), r.childLanes = mc(e, s, n), t.memoizedState = fc, nc(null, r)) : (Qa(t), gc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Qa(t), t.flags &= -257, t = vc(e, t, n)) : t.memoizedState === null ? (to(t), c = r.fallback, a = t.mode, r = _c({
				mode: "visible",
				children: r.children
			}, a), c = si(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, ja(t, e.child, null, n), r = t.child, r.memoizedState = pc(n), r.childLanes = mc(e, s, n), t.memoizedState = fc, t = nc(null, r)) : (to(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Qa(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Li({
					value: r,
					source: null,
					stack: null
				}), t = vc(e, t, n);
			} else if (Xs || Gi(e, t, n, !1), s = (n & e.childLanes) !== 0, Xs || s) {
				if (s = Fl, s !== null && (r = ct(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Zr(e, r), pu(s, e, r), Ys;
				af(c) || Tu(), t = vc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, G = cf(c.nextSibling), Di = t, K = !0, Oi = null, ki = !1, e !== null && Ei(t, e), t = gc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (to(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ii(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = si(c, a, n, null), c.flags |= 2) : c = ii(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, nc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = pc(n) : (a = c.cachePool, a === null ? a = ma() : (l = ea._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = mc(e, s, n), t.memoizedState = fc, nc(e.child, r)) : (Qa(t), n = e.child, e = n.sibling, n = ii(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function gc(e, t) {
		return t = _c({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function _c(e, t) {
		return e = ni(22, e, null, t), e.lanes = 0, e;
	}
	function vc(e, t, n) {
		return ja(t, e.child, null, n), e = gc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function yc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ui(e.return, t, n);
	}
	function bc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function xc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = ro.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, O(ro, o), Zs(e, t, r, n), r = K ? gi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && yc(e, n, t);
			else if (e.tag === 19) yc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && io(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), bc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && io(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				bc(t, !0, n, null, a, r);
				break;
			case "together":
				bc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Sc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Ul |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Gi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ii(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ii(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Cc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Ki(e))) : !0;
	}
	function wc(e, t, n) {
		switch (t.tag) {
			case 3:
				ye(t, t.stateNode.containerInfo), Vi(t, ea, e.memoizedState.cache), Fi();
				break;
			case 27:
			case 5:
				xe(t);
				break;
			case 4:
				ye(t, t.stateNode.containerInfo);
				break;
			case 10:
				Vi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, $a(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Qa(t), e = Sc(e, t, n), e === null ? null : e.sibling) : hc(e, t, n) : (Qa(t), t.flags |= 128, null);
				Qa(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Gi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return xc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), O(ro, ro.current), r) break;
				return null;
			case 22: return t.lanes = 0, tc(e, t, n, t.pendingProps);
			case 24: Vi(t, ea, e.memoizedState.cache);
		}
		return Sc(e, t, n);
	}
	function Tc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) Xs = !0;
		else {
			if (!Cc(e, n) && !(t.flags & 128)) return Xs = !1, wc(e, t, n);
			Xs = !!(e.flags & 131072);
		}
		else Xs = !1, K && t.flags & 1048576 && Ci(t, gi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = xa(t.elementType), t.type = e, typeof e == "function") ri(e) ? (r = zs(e, r), t.tag = 1, t = uc(null, t, e, r, n)) : (t.tag = 0, t = cc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = Qs(null, t, e, r, n);
								break a;
							} else if (a === te) {
								t.tag = 14, t = $s(null, t, e, r, n);
								break a;
							}
						}
						throw t = ce(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return cc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = zs(r, t.pendingProps), uc(e, t, r, a, n);
			case 3:
				a: {
					if (ye(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Fa(e, t), Ha(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Vi(t, ea, r), r !== o.cache && Wi(t, [ea], n, !0), Va(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = dc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = fi(Error(i(424)), t), Li(a), t = dc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (G = cf(e.firstChild), Di = t, K = !0, Oi = null, ki = !0, n = Ma(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Fi(), r === a) {
							t = Sc(e, t, n);
							break a;
						}
						Zs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return sc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : K || (n = t.type, e = t.pendingProps, r = Bd(_e.current).createElement(n), r[mt] = t, r[ht] = e, Pd(r, n, e), Dt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return xe(t), e === null && K && (r = t.stateNode = ff(t.type, t.pendingProps, _e.current), Di = t, ki = !0, a = G, Zd(t.type) ? (lf = a, G = cf(r.firstChild)) : G = a), Zs(e, t, t.pendingProps.children, n), sc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && K && ((a = r = G) && (r = tf(r, t.type, t.pendingProps, ki), r === null ? a = !1 : (t.stateNode = r, Di = t, G = cf(r.firstChild), ki = !1, a = !0)), a || ji(t)), xe(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = vo(e, t, bo, null, null, n), Qf._currentValue = a), sc(e, t), Zs(e, t, r, n), t.child;
			case 6: return e === null && K && ((e = n = G) && (n = nf(n, t.pendingProps, ki), n === null ? e = !1 : (t.stateNode = n, Di = t, G = null, e = !0)), e || ji(t)), null;
			case 13: return hc(e, t, n);
			case 4: return ye(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ja(t, null, r, n) : Zs(e, t, r, n), t.child;
			case 11: return Qs(e, t, t.type, t.pendingProps, n);
			case 7: return Zs(e, t, t.pendingProps, n), t.child;
			case 8: return Zs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Zs(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Vi(t, t.type, r.value), Zs(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, qi(t), a = Ji(a), r = r(a), t.flags |= 1, Zs(e, t, r, n), t.child;
			case 14: return $s(e, t, t.type, t.pendingProps, n);
			case 15: return ec(e, t, t.type, t.pendingProps, n);
			case 19: return xc(e, t, n);
			case 31: return oc(e, t, n);
			case 22: return tc(e, t, n, t.pendingProps);
			case 24: return qi(t), r = Ji(ea), e === null ? (a = fa(), a === null && (a = Fl, o = ta(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Pa(t), Vi(t, ea, a)) : ((e.lanes & n) !== 0 && (Fa(e, t), Ha(t, null, null, n), Va()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Vi(t, ea, r), r !== a.cache && Wi(t, [ea], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Vi(t, ea, r))), Zs(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Ec(e) {
		e.flags |= 4;
	}
	function Dc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Su()) e.flags |= 8192;
			else throw Sa = va, ga;
		} else e.flags &= -16777217;
	}
	function Oc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (Su()) e.flags |= 8192;
		else throw Sa = va, ga;
	}
	function kc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : nt(), e.lanes |= t, ql |= t);
	}
	function Ac(e, t) {
		if (!K) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function jc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Mc(e, t, n) {
		var r = t.pendingProps;
		switch (Ti(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return jc(t), null;
			case 1: return jc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Hi(ea), be(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Pi(t) ? Ec(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ii())), jc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Ec(t), o === null ? (jc(t), Dc(t, a, null, r, n)) : (jc(t), Oc(t, o))) : o ? o === e.memoizedState ? (jc(t), t.flags &= -16777217) : (Ec(t), jc(t), Oc(t, o)) : (e = e.memoizedProps, e !== r && Ec(t), jc(t), Dc(t, a, e, r, n)), null;
			case 27:
				if (Se(t), n = _e.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ec(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return jc(t), null;
					}
					e = he.current, Pi(t) ? Mi(t, e) : (e = ff(a, r, n), t.stateNode = e, Ec(t));
				}
				return jc(t), null;
			case 5:
				if (Se(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Ec(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return jc(t), null;
					}
					if (o = he.current, Pi(t)) Mi(t, o);
					else {
						var s = Bd(_e.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[mt] = t, o[ht] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Ec(t);
					}
				}
				return jc(t), Dc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Ec(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = _e.current, Pi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Di, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[mt] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || ji(t, !0);
					} else e = Bd(e).createTextNode(r), e[mt] = t, t.stateNode = e;
				}
				return jc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Pi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[mt] = t;
						} else Fi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						jc(t), e = !1;
					} else n = Ii(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (no(t), t) : (no(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return jc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Pi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[mt] = t;
						} else Fi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						jc(t), a = !1;
					} else a = Ii(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (no(t), t) : (no(t), null);
				}
				return no(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), kc(t, t.updateQueue), jc(t), null);
			case 4: return be(), e === null && xd(t.stateNode.containerInfo), jc(t), null;
			case 10: return Hi(t.type), jc(t), null;
			case 19:
				if (me(ro), r = t.memoizedState, r === null) return jc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Ac(r, !1);
				else {
					if (Hl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = io(e), o !== null) {
							for (t.flags |= 128, Ac(r, !1), e = o.updateQueue, t.updateQueue = e, kc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ai(n, e), n = n.sibling;
							return O(ro, ro.current & 1 | 2), K && Si(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Fe() > $l && (t.flags |= 128, a = !0, Ac(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = io(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, kc(t, e), Ac(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !K) return jc(t), null;
					} else 2 * Fe() - r.renderingStartTime > $l && n !== 536870912 && (t.flags |= 128, a = !0, Ac(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (jc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Fe(), e.sibling = null, n = ro.current, O(ro, a ? n & 1 | 2 : n & 1), K && Si(t, r.treeForkCount), e);
			case 22:
			case 23: return no(t), Ya(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (jc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : jc(t), n = t.updateQueue, n !== null && kc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && me(da), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Hi(ea), jc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Nc(e, t) {
		switch (Ti(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Hi(ea), be(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Se(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (no(t), t.alternate === null) throw Error(i(340));
					Fi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (no(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Fi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return me(ro), null;
			case 4: return be(), null;
			case 10: return Hi(t.type), null;
			case 22:
			case 23: return no(t), Ya(), e !== null && me(da), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Hi(ea), null;
			case 25: return null;
			default: return null;
		}
	}
	function Pc(e, t) {
		switch (Ti(t), t.tag) {
			case 3:
				Hi(ea), be();
				break;
			case 26:
			case 27:
			case 5:
				Se(t);
				break;
			case 4:
				be();
				break;
			case 31:
				t.memoizedState !== null && no(t);
				break;
			case 13:
				no(t);
				break;
			case 19:
				me(ro);
				break;
			case 10:
				Hi(t.type);
				break;
			case 22:
			case 23:
				no(t), Ya(), e !== null && me(da);
				break;
			case 24: Hi(ea);
		}
	}
	function Fc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function Ic(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Uu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function Lc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Wa(t, n);
			} catch (t) {
				Uu(e, e.return, t);
			}
		}
	}
	function Rc(e, t, n) {
		n.props = zs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function zc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function Bc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Uu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Uu(e, t, n);
		}
		else n.current = null;
	}
	function Vc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Hc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[ht] = t;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Uc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Wc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Uc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Gc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = sn));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Gc(e, t, n), e = e.sibling; e !== null;) Gc(e, t, n), e = e.sibling;
	}
	function Kc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Kc(e, t, n), e = e.sibling; e !== null;) Kc(e, t, n), e = e.sibling;
	}
	function qc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[mt] = e, t[ht] = n;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	var Jc = !1, Yc = !1, Xc = !1, Zc = typeof WeakSet == "function" ? WeakSet : Set, Qc = null;
	function $c(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Er(e), Dr(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, Qc = t; Qc !== null;) if (t = Qc, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, Qc = e;
		else for (; Qc !== null;) {
			switch (t = Qc, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = zs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Uu(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, Qc = e;
				break;
			}
			Qc = t.return;
		}
	}
	function el(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				hl(e, n), r & 4 && Fc(5, n);
				break;
			case 1:
				if (hl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Uu(n, n.return, e);
				}
				else {
					var i = zs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				r & 64 && Lc(n), r & 512 && zc(n, n.return);
				break;
			case 3:
				if (hl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Wa(e, t);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && qc(n);
			case 26:
			case 5:
				hl(e, n), t === null && r & 4 && Vc(n), r & 512 && zc(n, n.return);
				break;
			case 12:
				hl(e, n);
				break;
			case 31:
				hl(e, n), r & 4 && ol(e, n);
				break;
			case 13:
				hl(e, n), r & 4 && sl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = qu.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Jc, !r) {
					t = t !== null && t.memoizedState !== null || Yc, i = Jc;
					var a = Yc;
					Jc = r, (Yc = t) && !a ? _l(e, n, (n.subtreeFlags & 8772) != 0) : hl(e, n), Jc = i, Yc = a;
				}
				break;
			case 30: break;
			default: hl(e, n);
		}
	}
	function tl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, tl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && St(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var nl = null, rl = !1;
	function il(e, t, n) {
		for (n = n.child; n !== null;) al(e, t, n), n = n.sibling;
	}
	function al(e, t, n) {
		if (Ue && typeof Ue.onCommitFiberUnmount == "function") try {
			Ue.onCommitFiberUnmount(A, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Yc || Bc(n, t), il(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Yc || Bc(n, t);
				var r = nl, i = rl;
				Zd(n.type) && (nl = n.stateNode, rl = !1), il(e, t, n), pf(n.stateNode), nl = r, rl = i;
				break;
			case 5: Yc || Bc(n, t);
			case 6:
				if (r = nl, i = rl, nl = null, il(e, t, n), nl = r, rl = i, nl !== null) if (rl) try {
					(nl.nodeType === 9 ? nl.body : nl.nodeName === "HTML" ? nl.ownerDocument.body : nl).removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				else try {
					nl.removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				break;
			case 18:
				nl !== null && (rl ? (e = nl, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(nl, n.stateNode));
				break;
			case 4:
				r = nl, i = rl, nl = n.stateNode.containerInfo, rl = !0, il(e, t, n), nl = r, rl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Ic(2, n, t), Yc || Ic(4, n, t), il(e, t, n);
				break;
			case 1:
				Yc || (Bc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Rc(n, t, r)), il(e, t, n);
				break;
			case 21:
				il(e, t, n);
				break;
			case 22:
				Yc = (r = Yc) || n.memoizedState !== null, il(e, t, n), Yc = r;
				break;
			default: il(e, t, n);
		}
	}
	function ol(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Uu(t, t.return, e);
			}
		}
	}
	function sl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function cl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Zc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Zc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ll(e, t) {
		var n = cl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Ju.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function ul(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							nl = c.stateNode, rl = !1;
							break a;
						}
						break;
					case 5:
						nl = c.stateNode, rl = !1;
						break a;
					case 3:
					case 4:
						nl = c.stateNode.containerInfo, rl = !0;
						break a;
				}
				c = c.return;
			}
			if (nl === null) throw Error(i(160));
			al(o, s, a), nl = null, rl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) fl(t, e), t = t.sibling;
	}
	var dl = null;
	function fl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				ul(t, e), pl(e), r & 4 && (Ic(3, e, e.return), Fc(3, e), Ic(5, e, e.return));
				break;
			case 1:
				ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), r & 64 && Jc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = dl;
				if (ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[xt] || o[mt] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[mt] = e, Dt(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[mt] = e, Dt(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Hc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), n !== null && r & 4 && Hc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (ul(t, e), pl(e), r & 512 && (Yc || n === null || Bc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						$t(a, "");
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Hc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Xc = !0);
				break;
			case 6:
				if (ul(t, e), pl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = dl, dl = gf(t.containerInfo), ul(t, e), dl = a, pl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Uu(e, e.return, t);
				}
				Xc && (Xc = !1, ml(e));
				break;
			case 4:
				r = dl, dl = gf(e.stateNode.containerInfo), ul(t, e), pl(e), dl = r;
				break;
			case 12:
				ul(t, e), pl(e);
				break;
			case 31:
				ul(t, e), pl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ll(e, r)));
				break;
			case 13:
				ul(t, e), pl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Zl = Fe()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ll(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Jc, d = Yc;
				if (Jc = u || a, Yc = d || l, ul(t, e), Yc = d, Jc = u, pl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Jc || Yc || gl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ll(e, n))));
				break;
			case 19:
				ul(t, e), pl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ll(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: ul(t, e), pl(e);
		}
	}
	function pl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Uc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Kc(e, Wc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && ($t(o, ""), n.flags &= -33), Kc(e, Wc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Gc(e, Wc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Uu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function ml(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			ml(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function hl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) el(e, t.alternate, t), t = t.sibling;
	}
	function gl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Ic(4, t, t.return), gl(t);
					break;
				case 1:
					Bc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Rc(t, t.return, n), gl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Bc(t, t.return), gl(t);
					break;
				case 22:
					t.memoizedState === null && gl(t);
					break;
				case 30:
					gl(t);
					break;
				default: gl(t);
			}
			e = e.sibling;
		}
	}
	function _l(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					_l(i, a, n), Fc(4, a);
					break;
				case 1:
					if (_l(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Uu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ua(c[i], s);
						} catch (e) {
							Uu(r, r.return, e);
						}
					}
					n && o & 64 && Lc(a), zc(a, a.return);
					break;
				case 27: qc(a);
				case 26:
				case 5:
					_l(i, a, n), n && r === null && o & 4 && Vc(a), zc(a, a.return);
					break;
				case 12:
					_l(i, a, n);
					break;
				case 31:
					_l(i, a, n), n && o & 4 && ol(i, a);
					break;
				case 13:
					_l(i, a, n), n && o & 4 && sl(i, a);
					break;
				case 22:
					a.memoizedState === null && _l(i, a, n), zc(a, a.return);
					break;
				case 30: break;
				default: _l(i, a, n);
			}
			t = t.sibling;
		}
	}
	function vl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && na(n));
	}
	function yl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && na(e));
	}
	function bl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) xl(e, t, n, r), t = t.sibling;
	}
	function xl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				bl(e, t, n, r), i & 2048 && Fc(9, t);
				break;
			case 1:
				bl(e, t, n, r);
				break;
			case 3:
				bl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && na(e)));
				break;
			case 12:
				if (i & 2048) {
					bl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Uu(t, t.return, e);
					}
				} else bl(e, t, n, r);
				break;
			case 31:
				bl(e, t, n, r);
				break;
			case 13:
				bl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? bl(e, t, n, r) : (a._visibility |= 2, Sl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? bl(e, t, n, r) : Cl(e, t), i & 2048 && vl(o, t);
				break;
			case 24:
				bl(e, t, n, r), i & 2048 && yl(t.alternate, t);
				break;
			default: bl(e, t, n, r);
		}
	}
	function Sl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Sl(a, o, s, c, i), Fc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Sl(a, o, s, c, i)) : u._visibility & 2 ? Sl(a, o, s, c, i) : Cl(a, o), i && l & 2048 && vl(o.alternate, o);
					break;
				case 24:
					Sl(a, o, s, c, i), i && l & 2048 && yl(o.alternate, o);
					break;
				default: Sl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Cl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Cl(n, r), i & 2048 && vl(r.alternate, r);
					break;
				case 24:
					Cl(n, r), i & 2048 && yl(r.alternate, r);
					break;
				default: Cl(n, r);
			}
			t = t.sibling;
		}
	}
	var wl = 8192;
	function Tl(e, t, n) {
		if (e.subtreeFlags & wl) for (e = e.child; e !== null;) El(e, t, n), e = e.sibling;
	}
	function El(e, t, n) {
		switch (e.tag) {
			case 26:
				Tl(e, t, n), e.flags & wl && e.memoizedState !== null && Gf(n, dl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Tl(e, t, n);
				break;
			case 3:
			case 4:
				var r = dl;
				dl = gf(e.stateNode.containerInfo), Tl(e, t, n), dl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = wl, wl = 16777216, Tl(e, t, n), wl = r) : Tl(e, t, n));
				break;
			default: Tl(e, t, n);
		}
	}
	function Dl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Ol(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Qc = r, jl(r, e);
			}
			Dl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) kl(e), e = e.sibling;
	}
	function kl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Ol(e), e.flags & 2048 && Ic(9, e, e.return);
				break;
			case 3:
				Ol(e);
				break;
			case 12:
				Ol(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Al(e)) : Ol(e);
				break;
			default: Ol(e);
		}
	}
	function Al(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				Qc = r, jl(r, e);
			}
			Dl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Ic(8, t, t.return), Al(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Al(t));
					break;
				default: Al(t);
			}
			e = e.sibling;
		}
	}
	function jl(e, t) {
		for (; Qc !== null;) {
			var n = Qc;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Ic(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: na(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, Qc = r;
			else a: for (n = e; Qc !== null;) {
				r = Qc;
				var i = r.sibling, a = r.return;
				if (tl(r), r === n) {
					Qc = null;
					break a;
				}
				if (i !== null) {
					i.return = a, Qc = i;
					break a;
				}
				Qc = a;
			}
		}
	}
	var Ml = {
		getCacheForType: function(e) {
			var t = Ji(ea), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Ji(ea).controller.signal;
		}
	}, Nl = typeof WeakMap == "function" ? WeakMap : Map, Pl = 0, Fl = null, Z = null, Q = 0, Il = 0, Ll = null, Rl = !1, zl = !1, Bl = !1, Vl = 0, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = null, Yl = null, Xl = !1, Zl = 0, Ql = 0, $l = Infinity, eu = null, tu = null, nu = 0, ru = null, iu = null, au = 0, ou = 0, su = null, cu = null, lu = 0, uu = null;
	function du() {
		return Pl & 2 && Q !== 0 ? Q & -Q : E.T === null ? dt() : ud();
	}
	function fu() {
		if (Kl === 0) if (!(Q & 536870912) || K) {
			var e = Xe;
			Xe <<= 1, !(Xe & 3932160) && (Xe = 262144), Kl = e;
		} else Kl = 536870912;
		return e = Xa.current, e !== null && (e.flags |= 32), Kl;
	}
	function pu(e, t, n) {
		(e === Fl && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) && (bu(e, 0), _u(e, Q, Kl, !1)), it(e, n), (!(Pl & 2) || e !== Fl) && (e === Fl && (!(Pl & 2) && (Wl |= n), Hl === 4 && _u(e, Q, Kl, !1)), nd(e));
	}
	function mu(e, t, n) {
		if (Pl & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || et(e, t), a = r ? Ou(e, t) : Eu(e, t, !0), o = r;
		do {
			if (a === 0) {
				zl && !r && _u(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !gu(n)) {
					a = Eu(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Jl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (bu(c, s).flags |= 256), s = Eu(c, s, !1), s !== 2) {
								if (Bl && !l) {
									c.errorRecoveryDisabledLanes |= o, Wl |= o, a = 4;
									break a;
								}
								o = Yl, Yl = a, o !== null && (Yl === null ? Yl = o : Yl.push.apply(Yl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					bu(e, 0), _u(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							_u(r, t, Kl, !Rl);
							break a;
						case 2:
							Yl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = Zl + 300 - Fe(), 10 < a)) {
						if (_u(r, t, Kl, !Rl), $e(r, 0, !0) !== 0) break a;
						au = t, r.timeoutHandle = Kd(hu.bind(null, r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, "Throttled", -0, 0), a);
						break a;
					}
					hu(r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		nd(e);
	}
	function hu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: sn
			}, El(t, a, d);
			var m = (a & 62914560) === a ? Zl - Fe() : (a & 4194048) === a ? Ql - Fe() : 0;
			if (m = qf(d, m), m !== null) {
				au = a, e.cancelPendingCommit = m(Fu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), _u(e, a, o, !l);
				return;
			}
		}
		Fu(e, t, a, n, r, i, o, s, c);
	}
	function gu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!I(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function _u(e, t, n, r) {
		t &= ~Gl, t &= ~Wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - Ge(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ot(e, n, t);
	}
	function vu() {
		return Pl & 6 ? !0 : (rd(0, !1), !1);
	}
	function yu() {
		if (Z !== null) {
			if (Il === 0) var e = Z.return;
			else e = Z, Bi = zi = null, Co(e), Ta = null, Ea = 0, e = Z;
			for (; e !== null;) Pc(e.alternate, e), e = e.return;
			Z = null;
		}
	}
	function bu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), au = 0, yu(), Fl = e, Z = n = ii(e.current, null), Q = t, Il = 0, Ll = null, Rl = !1, zl = et(e, t), Bl = !1, ql = Kl = Gl = Wl = Ul = Hl = 0, Yl = Jl = null, Xl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ge(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Vl = t, Jr(), n;
	}
	function xu(e, t) {
		q = null, E.H = js, t === ha || t === _a ? (t = Ca(), Il = 3) : t === ga ? (t = Ca(), Il = 4) : Il = t === Ys ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Ll = t, Z === null && (Hl = 1, Us(e, fi(t, e.current)));
	}
	function Su() {
		var e = Xa.current;
		return e === null ? !0 : (Q & 4194048) === Q ? Za === null : (Q & 62914560) === Q || Q & 536870912 ? e === Za : !1;
	}
	function Cu() {
		var e = E.H;
		return E.H = js, e === null ? js : e;
	}
	function wu() {
		var e = E.A;
		return E.A = Ml, e;
	}
	function Tu() {
		Hl = 4, Rl || (Q & 4194048) !== Q && Xa.current !== null || (zl = !0), !(Ul & 134217727) && !(Wl & 134217727) || Fl === null || _u(Fl, Q, Kl, !1);
	}
	function Eu(e, t, n) {
		var r = Pl;
		Pl |= 2;
		var i = Cu(), a = wu();
		(Fl !== e || Q !== t) && (eu = null, bu(e, t)), t = !1;
		var o = Hl;
		a: do
			try {
				if (Il !== 0 && Z !== null) {
					var s = Z, c = Ll;
					switch (Il) {
						case 8:
							yu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Xa.current === null && (t = !0);
							var l = Il;
							if (Il = 0, Ll = null, Mu(e, s, c, l), n && zl) {
								o = 0;
								break a;
							}
							break;
						default: l = Il, Il = 0, Ll = null, Mu(e, s, c, l);
					}
				}
				Du(), o = Hl;
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Bi = zi = null, Pl = r, E.H = i, E.A = a, Z === null && (Fl = null, Q = 0, Jr()), o;
	}
	function Du() {
		for (; Z !== null;) Au(Z);
	}
	function Ou(e, t) {
		var n = Pl;
		Pl |= 2;
		var r = Cu(), a = wu();
		Fl !== e || Q !== t ? (eu = null, $l = Fe() + 500, bu(e, t)) : zl = et(e, t);
		a: do
			try {
				if (Il !== 0 && Z !== null) {
					t = Z;
					var o = Ll;
					b: switch (Il) {
						case 1:
							Il = 0, Ll = null, Mu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (ya(o)) {
								Il = 0, Ll = null, ju(t);
								break;
							}
							t = function() {
								Il !== 2 && Il !== 9 || Fl !== e || (Il = 7), nd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Il = 7;
							break a;
						case 4:
							Il = 5;
							break a;
						case 7:
							ya(o) ? (Il = 0, Ll = null, ju(t)) : (Il = 0, Ll = null, Mu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Z.tag) {
								case 26: s = Z.memoizedState;
								case 5:
								case 27:
									var c = Z;
									if (s ? Wf(s) : c.stateNode.complete) {
										Il = 0, Ll = null;
										var l = c.sibling;
										if (l !== null) Z = l;
										else {
											var u = c.return;
											u === null ? Z = null : (Z = u, Nu(u));
										}
										break b;
									}
							}
							Il = 0, Ll = null, Mu(e, t, o, 5);
							break;
						case 6:
							Il = 0, Ll = null, Mu(e, t, o, 6);
							break;
						case 8:
							yu(), Hl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ku();
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return Bi = zi = null, E.H = r, E.A = a, Pl = n, Z === null ? (Fl = null, Q = 0, Jr(), Hl) : 0;
	}
	function ku() {
		for (; Z !== null && !Ne();) Au(Z);
	}
	function Au(e) {
		var t = Tc(e.alternate, e, Vl);
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Z = t;
	}
	function ju(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = lc(n, t, t.pendingProps, t.type, void 0, Q);
				break;
			case 11:
				t = lc(n, t, t.pendingProps, t.type.render, t.ref, Q);
				break;
			case 5: Co(t);
			default: Pc(n, t), t = Z = ai(t, Vl), t = Tc(n, t, Vl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Z = t;
	}
	function Mu(e, t, n, r) {
		Bi = zi = null, Co(t), Ta = null, Ea = 0;
		var i = t.return;
		try {
			if (Js(e, i, t, n, Q)) {
				Hl = 1, Us(e, fi(n, e.current)), Z = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Z = i, t;
			Hl = 1, Us(e, fi(n, e.current)), Z = null;
			return;
		}
		t.flags & 32768 ? (K || r === 1 ? e = !0 : zl || Q & 536870912 ? e = !1 : (Rl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Xa.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Pu(t, e)) : Nu(t);
	}
	function Nu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Pu(t, Rl);
				return;
			}
			e = t.return;
			var n = Mc(t.alternate, t, Vl);
			if (n !== null) {
				Z = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Z = t;
				return;
			}
			Z = t = e;
		} while (t !== null);
		Hl === 0 && (Hl = 5);
	}
	function Pu(e, t) {
		do {
			var n = Nc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Z = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Z = e;
				return;
			}
			Z = e = n;
		} while (e !== null);
		Hl = 6, Z = null;
	}
	function Fu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Bu();
		while (nu !== 0);
		if (Pl & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= qr, at(e, n, o, s, c, l), e === Fl && (Z = Fl = null, Q = 0), iu = t, ru = e, au = n, ou = o, su = a, cu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(ze, function() {
				return Vu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = E.T, E.T = null, a = D.p, D.p = 2, s = Pl, Pl |= 4;
				try {
					$c(e, t, n);
				} finally {
					Pl = s, D.p = a, E.T = r;
				}
			}
			nu = 1, Iu(), Lu(), Ru();
		}
	}
	function Iu() {
		if (nu === 1) {
			nu = 0;
			var e = ru, t = iu, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = Pl;
				Pl |= 4;
				try {
					fl(t, e);
					var a = zd, o = Er(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && z(s.ownerDocument.documentElement, s)) {
						if (c !== null && Dr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Tr(s, h), v = Tr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					Pl = i, D.p = r, E.T = n;
				}
			}
			e.current = t, nu = 2;
		}
	}
	function Lu() {
		if (nu === 2) {
			nu = 0;
			var e = ru, t = iu, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = E.T, E.T = null;
				var r = D.p;
				D.p = 2;
				var i = Pl;
				Pl |= 4;
				try {
					el(e, t.alternate, t);
				} finally {
					Pl = i, D.p = r, E.T = n;
				}
			}
			nu = 3;
		}
	}
	function Ru() {
		if (nu === 4 || nu === 3) {
			nu = 0, Pe();
			var e = ru, t = iu, n = au, r = cu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? nu = 5 : (nu = 0, iu = ru = null, zu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (tu = null), ut(n), t = t.stateNode, Ue && typeof Ue.onCommitFiberRoot == "function") try {
				Ue.onCommitFiberRoot(A, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = E.T, i = D.p, D.p = 2, E.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					E.T = t, D.p = i;
				}
			}
			au & 3 && Bu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === uu ? lu++ : (lu = 0, uu = e) : lu = 0, rd(0, !1);
		}
	}
	function zu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, na(t)));
	}
	function Bu() {
		return Iu(), Lu(), Ru(), Vu();
	}
	function Vu() {
		if (nu !== 5) return !1;
		var e = ru, t = ou;
		ou = 0;
		var n = ut(au), r = E.T, a = D.p;
		try {
			D.p = 32 > n ? 32 : n, E.T = null, n = su, su = null;
			var o = ru, s = au;
			if (nu = 0, iu = ru = null, au = 0, Pl & 6) throw Error(i(331));
			var c = Pl;
			if (Pl |= 4, kl(o.current), xl(o, o.current, s, n), Pl = c, rd(0, !1), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
				Ue.onPostCommitFiberRoot(A, o);
			} catch {}
			return !0;
		} finally {
			D.p = a, E.T = r, zu(e, t);
		}
	}
	function Hu(e, t, n) {
		t = fi(n, t), t = Gs(e.stateNode, t, 2), e = La(e, t, 2), e !== null && (it(e, 2), nd(e));
	}
	function Uu(e, t, n) {
		if (e.tag === 3) Hu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Hu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (tu === null || !tu.has(r))) {
					e = fi(n, e), n = Ks(2), r = La(t, n, 2), r !== null && (qs(n, r, t, e), it(r, 2), nd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Nl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Bl = !0, i.add(n), e = Gu.bind(null, e, t, n), t.then(e, e));
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Fl === e && (Q & n) === n && (Hl === 4 || Hl === 3 && (Q & 62914560) === Q && 300 > Fe() - Zl ? !(Pl & 2) && bu(e, 0) : Gl |= n, ql === Q && (ql = 0)), nd(e);
	}
	function Ku(e, t) {
		t === 0 && (t = nt()), e = Zr(e, t), e !== null && (it(e, t), nd(e));
	}
	function qu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ku(e, n);
	}
	function Ju(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), Ku(e, n);
	}
	function Yu(e, t) {
		return je(e, t);
	}
	var Xu = null, Zu = null, Qu = !1, $u = !1, ed = !1, td = 0;
	function nd(e) {
		e !== Zu && e.next === null && (Zu === null ? Xu = Zu = e : Zu = Zu.next = e), $u = !0, Qu || (Qu = !0, ld());
	}
	function rd(e, t) {
		if (!ed && $u) {
			ed = !0;
			do
				for (var n = !1, r = Xu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - Ge(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, cd(r, a));
					} else a = Q, a = $e(r, r === Fl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || et(r, a) || (n = !0, cd(r, a));
					r = r.next;
				}
			while (n);
			ed = !1;
		}
	}
	function id() {
		ad();
	}
	function ad() {
		$u = Qu = !1;
		var e = 0;
		td !== 0 && Gd() && (e = td);
		for (var t = Fe(), n = null, r = Xu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Xu = i : n.next = i, i === null && (Zu = n)) : (n = r, (e !== 0 || a & 3) && ($u = !0)), r = i;
		}
		nu !== 0 && nu !== 5 || rd(e, !1), td !== 0 && (td = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ge(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = tt(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Fl, n = Q, n = $e(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Me(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || et(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Me(r), ut(n)) {
				case 2:
				case 8:
					n = Re;
					break;
				case 32:
					n = ze;
					break;
				case 268435456:
					n = Ve;
					break;
				default: n = ze;
			}
			return r = sd.bind(null, e), n = je(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Me(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (nu !== 0 && nu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Bu() && e.callbackNode !== n) return null;
		var r = Q;
		return r = $e(e, e === Fl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (mu(e, r, t), od(e, Fe()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Bu()) return null;
		mu(e, t, !0);
	}
	function ld() {
		Yd(function() {
			Pl & 6 ? je(Le, id) : ad();
		});
	}
	function ud() {
		if (td === 0) {
			var e = aa;
			e === 0 && (e = Ye, Ye <<= 1, !(Ye & 261888) && (Ye = 256)), td = e;
		}
		return td;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : on("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[ht] || null).action), o = r.submitter;
			o && (t = (t = o[ht] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new On("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (td !== 0) {
								var e = o ? fd(i, o) : new FormData(i);
								_s(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? fd(i, o) : new FormData(i), _s(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var md = 0; md < Hr.length; md++) {
		var hd = Hr[md];
		Ur(hd.toLowerCase(), "on" + (hd[0].toUpperCase() + hd.slice(1)));
	}
	Ur(Fr, "onAnimationEnd"), Ur(W, "onAnimationIteration"), Ur(Ir, "onAnimationStart"), Ur("dblclick", "onDoubleClick"), Ur("focusin", "onFocus"), Ur("focusout", "onBlur"), Ur(Lr, "onTransitionRun"), Ur(Rr, "onTransitionStart"), Ur(zr, "onTransitionCancel"), Ur(Br, "onTransitionEnd"), jt("onMouseEnter", ["mouseout", "mouseover"]), jt("onMouseLeave", ["mouseout", "mouseover"]), jt("onPointerEnter", ["pointerout", "pointerover"]), jt("onPointerLeave", ["pointerout", "pointerover"]), At("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), At("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), At("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), At("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), At("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), At("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var gd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _d = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gd));
	function vd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Wr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Wr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function $(e, t) {
		var n = t[_t];
		n === void 0 && (n = t[_t] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Sd(t, e, 2, !1), n.add(r));
	}
	function yd(e, t, n) {
		var r = 0;
		t && (r |= 4), Sd(n, e, r, t);
	}
	var bd = "_reactListening" + Math.random().toString(36).slice(2);
	function xd(e) {
		if (!e[bd]) {
			e[bd] = !0, Ot.forEach(function(t) {
				t !== "selectionchange" && (_d.has(t) || yd(t, !1, e), yd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[bd] || (t[bd] = !0, yd("selectionchange", !1, t));
		}
	}
	function Sd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !_n || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Cd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Ct(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		mn(function() {
			var r = a, i = ln(n), s = [];
			a: {
				var c = Vr.get(e);
				if (c !== void 0) {
					var l = On, u = e;
					switch (e) {
						case "keypress": if (Cn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Gn;
							break;
						case "focusin":
							u = "focus", l = Ln;
							break;
						case "focusout":
							u = "blur", l = Ln;
							break;
						case "beforeblur":
						case "afterblur":
							l = Ln;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Fn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = In;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = qn;
							break;
						case Fr:
						case W:
						case Ir:
							l = M;
							break;
						case Br:
							l = N;
							break;
						case "scroll":
						case "scrollend":
							l = An;
							break;
						case "wheel":
							l = Jn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Rn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Kn;
							break;
						case "toggle":
						case "beforetoggle": l = Yn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = hn(m, p), g != null && d.push(wd(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== cn && (u = n.relatedTarget || n.fromElement) && (Ct(u) || u[gt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? Ct(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = Fn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Kn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : Tt(l), h = u == null ? c : Tt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, Ct(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ed, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Dd(s, c, l, d, !1), u !== null && f !== null && Dd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? Tt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = hr;
					else if (lr(c)) if (gr) v = Cr;
					else {
						v = F;
						var y = xr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && nn(r.elementType) && (v = hr) : v = Sr;
					if (v &&= v(e, r)) {
						ur(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Yt(c, "number", c.value);
				}
				switch (y = r ? Tt(r) : window, e) {
					case "focusin":
						(lr(y) || y.contentEditable === "true") && (B = y, kr = r, Ar = null);
						break;
					case "focusout":
						Ar = kr = B = null;
						break;
					case "mousedown":
						V = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						V = !1, jr(s, n, i);
						break;
					case "selectionchange": if (Or) break;
					case "keydown":
					case "keyup": jr(s, n, i);
				}
				var b;
				if (Zn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else ar ? rr(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (er && n.locale !== "ko" && (ar || x !== "onCompositionStart" ? x === "onCompositionEnd" && ar && (b = Sn()) : (yn = i, bn = "value" in yn ? yn.value : yn.textContent, ar = !0)), y = Td(r, x), 0 < y.length && (x = new zn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = ir(n), b !== null && (x.data = b)))), (b = $n ? or(e, n) : sr(e, n)) && (x = Td(r, "onBeforeInput"), 0 < x.length && (y = new zn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), pd(s, e, r, n, i);
			}
			vd(s, t);
		});
	}
	function wd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Td(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = hn(e, n), i != null && r.unshift(wd(e, i, a)), i = hn(e, t), i != null && r.push(wd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ed(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Dd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = hn(n, a), l != null && o.unshift(wd(n, l, c))) : i || (l = hn(n, a), l != null && o.push(wd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Od = /\r\n?/g, kd = /\u0000|\uFFFD/g;
	function Ad(e) {
		return (typeof e == "string" ? e : "" + e).replace(Od, "\n").replace(kd, "");
	}
	function jd(e, t) {
		return t = Ad(t), Ad(e) === t;
	}
	function Md(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || $t(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && $t(e, "" + r);
				break;
			case "className":
				Lt(e, "class", r);
				break;
			case "tabIndex":
				Lt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Lt(e, n, r);
				break;
			case "style":
				tn(e, r, o);
				break;
			case "data": if (t !== "object") {
				Lt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = on("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Md(e, t, "name", a.name, a, null), Md(e, t, "formEncType", a.formEncType, a, null), Md(e, t, "formMethod", a.formMethod, a, null), Md(e, t, "formTarget", a.formTarget, a, null)) : (Md(e, t, "encType", a.encType, a, null), Md(e, t, "method", a.method, a, null), Md(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = on("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = sn);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = on("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
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
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				$("beforetoggle", e), $("toggle", e), It(e, "popover", r);
				break;
			case "xlinkActuate":
				Rt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Rt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Rt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Rt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Rt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Rt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Rt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Rt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Rt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				It(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = rn.get(n) || n, It(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				tn(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? $t(e, r) : (typeof r == "number" || typeof r == "bigint") && $t(e, "" + r);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = sn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!kt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[ht] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : It(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				$("error", e), $("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: Md(e, t, o, s, n, null);
					}
				}
				a && Md(e, t, "srcSet", n.srcSet, n, null), r && Md(e, t, "src", n.src, n, null);
				return;
			case "input":
				$("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: Md(e, t, r, d, n, null);
					}
				}
				Jt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in $("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Md(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Xt(e, !!r, n, !0) : Xt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in $("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: Md(e, t, s, c, n, null);
				}
				Qt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Md(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				$("beforetoggle", e), $("toggle", e), $("cancel", e), $("close", e);
				break;
			case "iframe":
			case "object":
				$("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < gd.length; r++) $(gd[r], e);
				break;
			case "image":
				$("error", e), $("load", e);
				break;
			case "details":
				$("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": $("error", e), $("load", e);
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
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: Md(e, t, u, r, n, null);
				}
				return;
			default: if (nn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Md(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || Md(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && Md(e, t, p, m, r, f);
					}
				}
				qt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Md(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Md(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Xt(e, !!n, n ? [] : "", !1) : Xt(e, !!n, t, !0)) : Xt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Md(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && Md(e, t, s, a, r, o);
				}
				Zt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Md(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Md(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Md(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Md(e, t, u, p, r, m);
				}
				return;
			default: if (nn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Md(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Md(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Wd ? !1 : (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") pf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, pf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[xt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && pf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), St(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[xt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		St(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = D.d;
	D.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = vu();
		return e || t;
	}
	function yf(e) {
		var t = wt(e);
		t !== null && t.tag === 5 && t.type === "form" ? ys(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Kt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), Dt(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + Kt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Kt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Kt(n.imageSizes) + "\"]")) : i += "[href=\"" + Kt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), Dt(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Kt(r) + "\"][href=\"" + Kt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), Dt(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = Et(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					Dt(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = Et(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), Dt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = Et(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), Dt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = _e.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = Et(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = Et(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = Et(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + Kt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), Dt(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Kt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Kt(n.href) + "\"]");
				if (r) return t.instance = r, Dt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), Dt(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, Dt(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), Dt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, Dt(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), Dt(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[xt] || a[mt] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, Dt(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), Dt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: ue,
		_currentValue2: ue,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = rt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = rt(0), this.hiddenUpdates = rt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ni(3, null, null, t), e.current = a, a.stateNode = e, t = ta(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Pa(a), e;
	}
	function tp(e) {
		return e ? (e = ei, e) : ei;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ia(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = La(e, r, t), n !== null && (pu(n, e, t), Ra(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = Zr(e, 67108864);
			t !== null && pu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = du();
			t = lt(t);
			var n = Zr(e, t);
			n !== null && pu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 2, up(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = E.T;
		E.T = null;
		var a = D.p;
		try {
			D.p = 8, up(e, t, n, r);
		} finally {
			D.p = a, E.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Cd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = wt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Qe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ge(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									nd(a), !(Pl & 6) && ($l = Fe() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Zr(a, 2), s !== null && pu(s, a, 2), vu(), ip(a, 2);
					}
					if (a = dp(r), a === null && Cd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Cd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = ln(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = Ct(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
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
			case "selectstart": return 2;
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
			case "pointerleave": return 8;
			case "message": switch (Ie()) {
				case Le: return 2;
				case Re: return 8;
				case ze:
				case Be: return 32;
				case Ve: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = wt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = Ct(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ft(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ft(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				cn = r, n.target.dispatchEvent(r), cn = null;
			} else return t = wt(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = wt(n);
				a !== null && (e.splice(t, 3), t -= 3, _s(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[ht] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[ht] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, du(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), vu(), t[gt] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = dt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.7") throw Error(i(527, Lp, "19.2.7"));
	D.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.7",
		rendererPackageName: "react-dom",
		currentDispatcherRef: E,
		reconcilerVersion: "19.2.7"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			A = zp.inject(Rp), Ue = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Bs, s = Vs, c = Hs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[gt] = t.current, xd(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
	}
	subscribe(e) {
		return this.listeners.add(e), this.onSubscribe(), () => {
			this.listeners.delete(e), this.onUnsubscribe();
		};
	}
	hasListeners() {
		return this.listeners.size > 0;
	}
	onSubscribe() {}
	onUnsubscribe() {}
}, v = new class extends _ {
	#e;
	#t;
	#n;
	constructor() {
		super(), this.#n = (e) => {
			if (typeof window < "u" && window.addEventListener) {
				let t = () => e();
				return window.addEventListener("visibilitychange", t, !1), () => {
					window.removeEventListener("visibilitychange", t);
				};
			}
		};
	}
	onSubscribe() {
		this.#t || this.setEventListener(this.#n);
	}
	onUnsubscribe() {
		this.hasListeners() || (this.#t?.(), this.#t = void 0);
	}
	setEventListener(e) {
		this.#n = e, this.#t?.(), this.#t = e((e) => {
			typeof e == "boolean" ? this.setFocused(e) : this.onFocus();
		});
	}
	setFocused(e) {
		this.#e !== e && (this.#e = e, this.onFocus());
	}
	onFocus() {
		let e = this.isFocused();
		this.listeners.forEach((t) => {
			t(e);
		});
	}
	isFocused() {
		return typeof this.#e == "boolean" ? this.#e : globalThis.document?.visibilityState !== "hidden";
	}
}(), y = {
	setTimeout: (e, t) => setTimeout(e, t),
	clearTimeout: (e) => clearTimeout(e),
	setInterval: (e, t) => setInterval(e, t),
	clearInterval: (e) => clearInterval(e)
}, b = new class {
	#e = y;
	setTimeoutProvider(e) {
		this.#e = e;
	}
	setTimeout(e, t) {
		return this.#e.setTimeout(e, t);
	}
	clearTimeout(e) {
		this.#e.clearTimeout(e);
	}
	setInterval(e, t) {
		return this.#e.setInterval(e, t);
	}
	clearInterval(e) {
		this.#e.clearInterval(e);
	}
}();
function x(e) {
	setTimeout(e, 0);
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/utils.js
var S = typeof window > "u" || "Deno" in globalThis;
function C() {}
function w(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function T(e) {
	return typeof e == "number" && e >= 0 && e !== Infinity;
}
function ee(e, t) {
	return Math.max(e + (t || 0) - Date.now(), 0);
}
function te(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function ne(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function re(e, t) {
	let { type: n = "all", exact: r, fetchStatus: i, predicate: a, queryKey: o, stale: s } = e;
	if (o) {
		if (r) {
			if (t.queryHash !== ae(o, t.options)) return !1;
		} else if (!se(t.queryKey, o)) return !1;
	}
	if (n !== "all") {
		let e = t.isActive();
		if (n === "active" && !e || n === "inactive" && e) return !1;
	}
	return !(typeof s == "boolean" && t.isStale() !== s || i && i !== t.state.fetchStatus || a && !a(t));
}
function ie(e, t) {
	let { exact: n, status: r, predicate: i, mutationKey: a } = e;
	if (a) {
		if (!t.options.mutationKey) return !1;
		if (n) {
			if (oe(t.options.mutationKey) !== oe(a)) return !1;
		} else if (!se(t.options.mutationKey, a)) return !1;
	}
	return !(r && t.state.status !== r || i && !i(t));
}
function ae(e, t) {
	return (t?.queryKeyHashFn || oe)(e);
}
function oe(e) {
	return JSON.stringify(e, (e, t) => D(t) ? Object.keys(t).sort().reduce((e, n) => (e[n] = t[n], e), {}) : t);
}
function se(e, t) {
	return e === t ? !0 : typeof e == typeof t && e && t && typeof e == "object" && typeof t == "object" ? Object.keys(t).every((n) => se(e[n], t[n])) : !1;
}
var ce = Object.prototype.hasOwnProperty;
function le(e, t, n = 0) {
	if (e === t) return e;
	if (n > 500) return t;
	let r = E(e) && E(t);
	if (!r && !(D(e) && D(t))) return t;
	let i = (r ? e : Object.keys(e)).length, a = r ? t : Object.keys(t), o = a.length, s = r ? Array(o) : {}, c = 0;
	for (let l = 0; l < o; l++) {
		let o = r ? l : a[l], u = e[o], d = t[o];
		if (u === d) {
			s[o] = u, (r ? l < i : ce.call(e, o)) && c++;
			continue;
		}
		if (u === null || d === null || typeof u != "object" || typeof d != "object") {
			s[o] = d;
			continue;
		}
		let f = le(u, d, n + 1);
		s[o] = f, f === u && c++;
	}
	return i === o && c === i ? e : s;
}
function E(e) {
	return Array.isArray(e) && e.length === Object.keys(e).length;
}
function D(e) {
	if (!ue(e)) return !1;
	let t = e.constructor;
	if (t === void 0) return !0;
	let n = t.prototype;
	return !(!ue(n) || !n.hasOwnProperty("isPrototypeOf") || Object.getPrototypeOf(e) !== Object.prototype);
}
function ue(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
function de(e) {
	return new Promise((t) => {
		b.setTimeout(t, e);
	});
}
function fe(e, t, n) {
	return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing === !1 ? t : le(e, t);
}
function pe(e, t, n = 0) {
	let r = [...e, t];
	return n && r.length > n ? r.slice(1) : r;
}
function me(e, t, n = 0) {
	let r = [t, ...e];
	return n && r.length > n ? r.slice(0, -1) : r;
}
var O = /* @__PURE__ */ Symbol();
function he(e, t) {
	return !e.queryFn && t?.initialPromise ? () => t.initialPromise : !e.queryFn || e.queryFn === O ? () => Promise.reject(/* @__PURE__ */ Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn;
}
function ge(e, t, n) {
	let r = !1, i;
	return Object.defineProperty(e, "signal", {
		enumerable: !0,
		get: () => (i ??= t(), r ? i : (r = !0, i.aborted ? n() : i.addEventListener("abort", n, { once: !0 }), i))
	}), e;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/environmentManager.js
var _e = /* @__PURE__ */ (() => {
	let e = () => S;
	return {
		isServer() {
			return e();
		},
		setIsServer(t) {
			e = t;
		}
	};
})();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/thenable.js
function ve() {
	let e, t, n = new Promise((n, r) => {
		e = n, t = r;
	});
	n.status = "pending", n.catch(() => {});
	function r(e) {
		Object.assign(n, e), delete n.resolve, delete n.reject;
	}
	return n.resolve = (t) => {
		r({
			status: "fulfilled",
			value: t
		}), e(t);
	}, n.reject = (e) => {
		r({
			status: "rejected",
			reason: e
		}), t(e);
	}, n;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/notifyManager.js
var ye = x;
function be() {
	let e = [], t = 0, n = (e) => {
		e();
	}, r = (e) => {
		e();
	}, i = ye, a = (r) => {
		t ? e.push(r) : i(() => {
			n(r);
		});
	}, o = () => {
		let t = e;
		e = [], t.length && i(() => {
			r(() => {
				t.forEach((e) => {
					n(e);
				});
			});
		});
	};
	return {
		batch: (e) => {
			let n;
			t++;
			try {
				n = e();
			} finally {
				t--, t || o();
			}
			return n;
		},
		batchCalls: (e) => (...t) => {
			a(() => {
				e(...t);
			});
		},
		schedule: a,
		setNotifyFunction: (e) => {
			n = e;
		},
		setBatchNotifyFunction: (e) => {
			r = e;
		},
		setScheduler: (e) => {
			i = e;
		}
	};
}
var xe = be(), Se = new class extends _ {
	#e = !0;
	#t;
	#n;
	constructor() {
		super(), this.#n = (e) => {
			if (typeof window < "u" && window.addEventListener) {
				let t = () => e(!0), n = () => e(!1);
				return window.addEventListener("online", t, !1), window.addEventListener("offline", n, !1), () => {
					window.removeEventListener("online", t), window.removeEventListener("offline", n);
				};
			}
		};
	}
	onSubscribe() {
		this.#t || this.setEventListener(this.#n);
	}
	onUnsubscribe() {
		this.hasListeners() || (this.#t?.(), this.#t = void 0);
	}
	setEventListener(e) {
		this.#n = e, this.#t?.(), this.#t = e(this.setOnline.bind(this));
	}
	setOnline(e) {
		this.#e !== e && (this.#e = e, this.listeners.forEach((t) => {
			t(e);
		}));
	}
	isOnline() {
		return this.#e;
	}
}();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/retryer.js
function Ce(e) {
	return Math.min(1e3 * 2 ** e, 3e4);
}
function we(e) {
	return (e ?? "online") === "online" ? Se.isOnline() : !0;
}
var Te = class extends Error {
	constructor(e) {
		super("CancelledError"), this.revert = e?.revert, this.silent = e?.silent;
	}
};
function Ee(e) {
	let t = !1, n = 0, r, i = ve(), a = () => i.status !== "pending", o = (t) => {
		if (!a()) {
			let n = new Te(t);
			f(n), e.onCancel?.(n);
		}
	}, s = () => {
		t = !0;
	}, c = () => {
		t = !1;
	}, l = () => v.isFocused() && (e.networkMode === "always" || Se.isOnline()) && e.canRun(), u = () => we(e.networkMode) && e.canRun(), d = (e) => {
		a() || (r?.(), i.resolve(e));
	}, f = (e) => {
		a() || (r?.(), i.reject(e));
	}, p = () => new Promise((t) => {
		r = (e) => {
			(a() || l()) && t(e);
		}, e.onPause?.();
	}).then(() => {
		r = void 0, a() || e.onContinue?.();
	}), m = () => {
		if (a()) return;
		let r, i = n === 0 ? e.initialPromise : void 0;
		try {
			r = i ?? e.fn();
		} catch (e) {
			r = Promise.reject(e);
		}
		Promise.resolve(r).then(d).catch((r) => {
			if (a()) return;
			let i = e.retry ?? (_e.isServer() ? 0 : 3), o = e.retryDelay ?? Ce, s = typeof o == "function" ? o(n, r) : o, c = i === !0 || typeof i == "number" && n < i || typeof i == "function" && i(n, r);
			if (t || !c) {
				f(r);
				return;
			}
			n++, e.onFail?.(n, r), de(s).then(() => l() ? void 0 : p()).then(() => {
				t ? f(r) : m();
			});
		});
	};
	return {
		promise: i,
		status: () => i.status,
		cancel: o,
		continue: () => (r?.(), i),
		cancelRetry: s,
		continueRetry: c,
		canStart: u,
		start: () => (u() ? m() : p().then(m), i)
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/removable.js
var De = class {
	#e;
	destroy() {
		this.clearGcTimeout();
	}
	scheduleGc() {
		this.clearGcTimeout(), T(this.gcTime) && (this.#e = b.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime));
	}
	updateGcTime(e) {
		this.gcTime = Math.max(this.gcTime || 0, e ?? (_e.isServer() ? Infinity : 300 * 1e3));
	}
	clearGcTimeout() {
		this.#e !== void 0 && (b.clearTimeout(this.#e), this.#e = void 0);
	}
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function Oe(e) {
	return { onFetch: (t, n) => {
		let r = t.options, i = t.fetchOptions?.meta?.fetchMore?.direction, a = t.state.data?.pages || [], o = t.state.data?.pageParams || [], s = {
			pages: [],
			pageParams: []
		}, c = 0, l = async () => {
			let n = !1, l = (e) => {
				ge(e, () => t.signal, () => n = !0);
			}, u = he(t.options, t.fetchOptions), d = async (e, r, i) => {
				if (n) return Promise.reject(t.signal.reason);
				if (r == null && e.pages.length) return Promise.resolve(e);
				let a = await u((() => {
					let e = {
						client: t.client,
						queryKey: t.queryKey,
						pageParam: r,
						direction: i ? "backward" : "forward",
						meta: t.options.meta
					};
					return l(e), e;
				})()), { maxPages: o } = t.options, s = i ? me : pe;
				return {
					pages: s(e.pages, a, o),
					pageParams: s(e.pageParams, r, o)
				};
			};
			if (i && a.length) {
				let e = i === "backward", t = e ? Ae : ke, n = {
					pages: a,
					pageParams: o
				};
				s = await d(n, t(r, n), e);
			} else {
				let t = e ?? a.length;
				do {
					let e = c === 0 ? o[0] ?? r.initialPageParam : ke(r, s);
					if (c > 0 && e == null) break;
					s = await d(s, e), c++;
				} while (c < t);
			}
			return s;
		};
		t.options.persister ? t.fetchFn = () => t.options.persister?.(l, {
			client: t.client,
			queryKey: t.queryKey,
			meta: t.options.meta,
			signal: t.signal
		}, n) : t.fetchFn = l;
	} };
}
function ke(e, { pages: t, pageParams: n }) {
	let r = t.length - 1;
	return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function Ae(e, { pages: t, pageParams: n }) {
	return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/query.js
var je = class extends De {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	constructor(e) {
		super(), this.#s = !1, this.#o = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.#i = e.client, this.#r = this.#i.getQueryCache(), this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#t = Pe(this.options), this.state = e.state ?? this.#t, this.scheduleGc();
	}
	get meta() {
		return this.options.meta;
	}
	get queryType() {
		return this.#e;
	}
	get promise() {
		return this.#a?.promise;
	}
	setOptions(e) {
		if (this.options = {
			...this.#o,
			...e
		}, e?._type && (this.#e = e._type), this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
			let e = Pe(this.options);
			e.data !== void 0 && (this.setState(Ne(e.data, e.dataUpdatedAt)), this.#t = e);
		}
	}
	optionalRemove() {
		!this.observers.length && this.state.fetchStatus === "idle" && this.#r.remove(this);
	}
	setData(e, t) {
		let n = fe(this.state.data, e, this.options);
		return this.#l({
			data: n,
			type: "success",
			dataUpdatedAt: t?.updatedAt,
			manual: t?.manual
		}), n;
	}
	setState(e) {
		this.#l({
			type: "setState",
			state: e
		});
	}
	cancel(e) {
		let t = this.#a?.promise;
		return this.#a?.cancel(e), t ? t.then(C).catch(C) : Promise.resolve();
	}
	destroy() {
		super.destroy(), this.cancel({ silent: !0 });
	}
	get resetState() {
		return this.#t;
	}
	reset() {
		this.destroy(), this.setState(this.resetState);
	}
	isActive() {
		return this.observers.some((e) => ne(e.options.enabled, this) !== !1);
	}
	isDisabled() {
		return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === O || !this.isFetched();
	}
	isFetched() {
		return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
	}
	isStatic() {
		return this.getObserversCount() > 0 ? this.observers.some((e) => te(e.options.staleTime, this) === "static") : !1;
	}
	isStale() {
		return this.getObserversCount() > 0 ? this.observers.some((e) => e.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated;
	}
	isStaleByTime(e = 0) {
		return this.state.data === void 0 ? !0 : e === "static" ? !1 : this.state.isInvalidated ? !0 : !ee(this.state.dataUpdatedAt, e);
	}
	onFocus() {
		this.observers.find((e) => e.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#a?.continue();
	}
	onOnline() {
		this.observers.find((e) => e.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#a?.continue();
	}
	addObserver(e) {
		this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), this.#r.notify({
			type: "observerAdded",
			query: this,
			observer: e
		}));
	}
	removeObserver(e) {
		this.observers.includes(e) && (this.observers = this.observers.filter((t) => t !== e), this.observers.length || (this.#a && (this.#s || this.#c() ? this.#a.cancel({ revert: !0 }) : this.#a.cancelRetry()), this.scheduleGc()), this.#r.notify({
			type: "observerRemoved",
			query: this,
			observer: e
		}));
	}
	getObserversCount() {
		return this.observers.length;
	}
	#c() {
		return this.state.fetchStatus === "paused" && this.state.status === "pending";
	}
	invalidate() {
		this.state.isInvalidated || this.#l({ type: "invalidate" });
	}
	async fetch(e, t) {
		if (this.state.fetchStatus !== "idle" && this.#a?.status() !== "rejected") {
			if (this.state.data !== void 0 && t?.cancelRefetch) this.cancel({ silent: !0 });
			else if (this.#a) return this.#a.continueRetry(), this.#a.promise;
		}
		if (e && this.setOptions(e), !this.options.queryFn) {
			let e = this.observers.find((e) => e.options.queryFn);
			e && this.setOptions(e.options);
		}
		let n = new AbortController(), r = (e) => {
			Object.defineProperty(e, "signal", {
				enumerable: !0,
				get: () => (this.#s = !0, n.signal)
			});
		}, i = () => {
			let e = he(this.options, t), n = (() => {
				let e = {
					client: this.#i,
					queryKey: this.queryKey,
					meta: this.meta
				};
				return r(e), e;
			})();
			return this.#s = !1, this.options.persister ? this.options.persister(e, n, this) : e(n);
		}, a = (() => {
			let e = {
				fetchOptions: t,
				options: this.options,
				queryKey: this.queryKey,
				client: this.#i,
				state: this.state,
				fetchFn: i
			};
			return r(e), e;
		})();
		(this.#e === "infinite" ? Oe(this.options.pages) : this.options.behavior)?.onFetch(a, this), this.#n = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== a.fetchOptions?.meta) && this.#l({
			type: "fetch",
			meta: a.fetchOptions?.meta
		}), this.#a = Ee({
			initialPromise: t?.initialPromise,
			fn: a.fetchFn,
			onCancel: (e) => {
				e instanceof Te && e.revert && this.setState({
					...this.#n,
					fetchStatus: "idle"
				}), n.abort();
			},
			onFail: (e, t) => {
				this.#l({
					type: "failed",
					failureCount: e,
					error: t
				});
			},
			onPause: () => {
				this.#l({ type: "pause" });
			},
			onContinue: () => {
				this.#l({ type: "continue" });
			},
			retry: a.options.retry,
			retryDelay: a.options.retryDelay,
			networkMode: a.options.networkMode,
			canRun: () => !0
		});
		try {
			let e = await this.#a.start();
			if (e === void 0) throw Error(`${this.queryHash} data is undefined`);
			return this.setData(e), this.#r.config.onSuccess?.(e, this), this.#r.config.onSettled?.(e, this.state.error, this), e;
		} catch (e) {
			if (e instanceof Te) {
				if (e.silent) return this.#a.promise;
				if (e.revert) {
					if (this.state.data === void 0) throw e;
					return this.state.data;
				}
			}
			throw this.#l({
				type: "error",
				error: e
			}), this.#r.config.onError?.(e, this), this.#r.config.onSettled?.(this.state.data, e, this), e;
		} finally {
			this.scheduleGc();
		}
	}
	#l(e) {
		let t = (t) => {
			switch (e.type) {
				case "failed": return {
					...t,
					fetchFailureCount: e.failureCount,
					fetchFailureReason: e.error
				};
				case "pause": return {
					...t,
					fetchStatus: "paused"
				};
				case "continue": return {
					...t,
					fetchStatus: "fetching"
				};
				case "fetch": return {
					...t,
					...Me(t.data, this.options),
					fetchMeta: e.meta ?? null
				};
				case "success":
					let n = {
						...t,
						...Ne(e.data, e.dataUpdatedAt),
						dataUpdateCount: t.dataUpdateCount + 1,
						...!e.manual && {
							fetchStatus: "idle",
							fetchFailureCount: 0,
							fetchFailureReason: null
						}
					};
					return this.#n = e.manual ? n : void 0, n;
				case "error":
					let r = e.error;
					return {
						...t,
						error: r,
						errorUpdateCount: t.errorUpdateCount + 1,
						errorUpdatedAt: Date.now(),
						fetchFailureCount: t.fetchFailureCount + 1,
						fetchFailureReason: r,
						fetchStatus: "idle",
						status: "error",
						isInvalidated: !0
					};
				case "invalidate": return {
					...t,
					isInvalidated: !0
				};
				case "setState": return {
					...t,
					...e.state
				};
			}
		};
		this.state = t(this.state), xe.batch(() => {
			this.observers.forEach((e) => {
				e.onQueryUpdate();
			}), this.#r.notify({
				query: this,
				type: "updated",
				action: e
			});
		});
	}
};
function Me(e, t) {
	return {
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchStatus: we(t.networkMode) ? "fetching" : "paused",
		...e === void 0 && {
			error: null,
			status: "pending"
		}
	};
}
function Ne(e, t) {
	return {
		data: e,
		dataUpdatedAt: t ?? Date.now(),
		error: null,
		isInvalidated: !1,
		status: "success"
	};
}
function Pe(e) {
	let t = typeof e.initialData == "function" ? e.initialData() : e.initialData, n = t !== void 0, r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
	return {
		data: t,
		dataUpdateCount: 0,
		dataUpdatedAt: n ? r ?? Date.now() : 0,
		error: null,
		errorUpdateCount: 0,
		errorUpdatedAt: 0,
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchMeta: null,
		isInvalidated: !1,
		status: n ? "success" : "pending",
		fetchStatus: "idle"
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutation.js
var Fe = class extends De {
	#e;
	#t;
	#n;
	#r;
	constructor(e) {
		super(), this.#e = e.client, this.mutationId = e.mutationId, this.#n = e.mutationCache, this.#t = [], this.state = e.state || Ie(), this.setOptions(e.options), this.scheduleGc();
	}
	setOptions(e) {
		this.options = e, this.updateGcTime(this.options.gcTime);
	}
	get meta() {
		return this.options.meta;
	}
	addObserver(e) {
		this.#t.includes(e) || (this.#t.push(e), this.clearGcTimeout(), this.#n.notify({
			type: "observerAdded",
			mutation: this,
			observer: e
		}));
	}
	removeObserver(e) {
		this.#t = this.#t.filter((t) => t !== e), this.scheduleGc(), this.#n.notify({
			type: "observerRemoved",
			mutation: this,
			observer: e
		});
	}
	optionalRemove() {
		this.#t.length || (this.state.status === "pending" ? this.scheduleGc() : this.#n.remove(this));
	}
	continue() {
		return this.#r?.continue() ?? this.execute(this.state.variables);
	}
	async execute(e) {
		let t = () => {
			this.#i({ type: "continue" });
		}, n = {
			client: this.#e,
			meta: this.options.meta,
			mutationKey: this.options.mutationKey
		};
		this.#r = Ee({
			fn: () => this.options.mutationFn ? this.options.mutationFn(e, n) : Promise.reject(/* @__PURE__ */ Error("No mutationFn found")),
			onFail: (e, t) => {
				this.#i({
					type: "failed",
					failureCount: e,
					error: t
				});
			},
			onPause: () => {
				this.#i({ type: "pause" });
			},
			onContinue: t,
			retry: this.options.retry ?? 0,
			retryDelay: this.options.retryDelay,
			networkMode: this.options.networkMode,
			canRun: () => this.#n.canRun(this)
		});
		let r = this.state.status === "pending", i = !this.#r.canStart();
		try {
			if (r) t();
			else {
				this.#i({
					type: "pending",
					variables: e,
					isPaused: i
				}), this.#n.config.onMutate && await this.#n.config.onMutate(e, this, n);
				let t = await this.options.onMutate?.(e, n);
				t !== this.state.context && this.#i({
					type: "pending",
					context: t,
					variables: e,
					isPaused: i
				});
			}
			let a = await this.#r.start();
			return await this.#n.config.onSuccess?.(a, e, this.state.context, this, n), await this.options.onSuccess?.(a, e, this.state.context, n), await this.#n.config.onSettled?.(a, null, this.state.variables, this.state.context, this, n), await this.options.onSettled?.(a, null, e, this.state.context, n), this.#i({
				type: "success",
				data: a
			}), a;
		} catch (t) {
			try {
				await this.#n.config.onError?.(t, e, this.state.context, this, n);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onError?.(t, e, this.state.context, n);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.#n.config.onSettled?.(void 0, t, this.state.variables, this.state.context, this, n);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onSettled?.(void 0, t, e, this.state.context, n);
			} catch (e) {
				Promise.reject(e);
			}
			throw this.#i({
				type: "error",
				error: t
			}), t;
		} finally {
			this.#n.runNext(this);
		}
	}
	#i(e) {
		let t = (t) => {
			switch (e.type) {
				case "failed": return {
					...t,
					failureCount: e.failureCount,
					failureReason: e.error
				};
				case "pause": return {
					...t,
					isPaused: !0
				};
				case "continue": return {
					...t,
					isPaused: !1
				};
				case "pending": return {
					...t,
					context: e.context,
					data: void 0,
					failureCount: 0,
					failureReason: null,
					error: null,
					isPaused: e.isPaused,
					status: "pending",
					variables: e.variables,
					submittedAt: Date.now()
				};
				case "success": return {
					...t,
					data: e.data,
					failureCount: 0,
					failureReason: null,
					error: null,
					status: "success",
					isPaused: !1
				};
				case "error": return {
					...t,
					data: void 0,
					error: e.error,
					failureCount: t.failureCount + 1,
					failureReason: e.error,
					isPaused: !1,
					status: "error"
				};
			}
		};
		this.state = t(this.state), xe.batch(() => {
			this.#t.forEach((t) => {
				t.onMutationUpdate(e);
			}), this.#n.notify({
				mutation: this,
				type: "updated",
				action: e
			});
		});
	}
};
function Ie() {
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
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutationCache.js
var Le = class extends _ {
	constructor(e = {}) {
		super(), this.config = e, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#n = 0;
	}
	#e;
	#t;
	#n;
	build(e, t, n) {
		let r = new Fe({
			client: e,
			mutationCache: this,
			mutationId: ++this.#n,
			options: e.defaultMutationOptions(t),
			state: n
		});
		return this.add(r), r;
	}
	add(e) {
		this.#e.add(e);
		let t = Re(e);
		if (typeof t == "string") {
			let n = this.#t.get(t);
			n ? n.push(e) : this.#t.set(t, [e]);
		}
		this.notify({
			type: "added",
			mutation: e
		});
	}
	remove(e) {
		if (this.#e.delete(e)) {
			let t = Re(e);
			if (typeof t == "string") {
				let n = this.#t.get(t);
				if (n) if (n.length > 1) {
					let t = n.indexOf(e);
					t !== -1 && n.splice(t, 1);
				} else n[0] === e && this.#t.delete(t);
			}
		}
		this.notify({
			type: "removed",
			mutation: e
		});
	}
	canRun(e) {
		let t = Re(e);
		if (typeof t == "string") {
			let n = this.#t.get(t)?.find((e) => e.state.status === "pending");
			return !n || n === e;
		} else return !0;
	}
	runNext(e) {
		let t = Re(e);
		return typeof t == "string" ? (this.#t.get(t)?.find((t) => t !== e && t.state.isPaused))?.continue() ?? Promise.resolve() : Promise.resolve();
	}
	clear() {
		xe.batch(() => {
			this.#e.forEach((e) => {
				this.notify({
					type: "removed",
					mutation: e
				});
			}), this.#e.clear(), this.#t.clear();
		});
	}
	getAll() {
		return Array.from(this.#e);
	}
	find(e) {
		let t = {
			exact: !0,
			...e
		};
		return this.getAll().find((e) => ie(t, e));
	}
	findAll(e = {}) {
		return this.getAll().filter((t) => ie(e, t));
	}
	notify(e) {
		xe.batch(() => {
			this.listeners.forEach((t) => {
				t(e);
			});
		});
	}
	resumePausedMutations() {
		let e = this.getAll().filter((e) => e.state.isPaused);
		return xe.batch(() => Promise.all(e.map((e) => e.continue().catch(C))));
	}
};
function Re(e) {
	return e.options.scope?.id;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/queryCache.js
var ze = class extends _ {
	constructor(e = {}) {
		super(), this.config = e, this.#e = /* @__PURE__ */ new Map();
	}
	#e;
	build(e, t, n) {
		let r = t.queryKey, i = t.queryHash ?? ae(r, t), a = this.get(i);
		return a || (a = new je({
			client: e,
			queryKey: r,
			queryHash: i,
			options: e.defaultQueryOptions(t),
			state: n,
			defaultOptions: e.getQueryDefaults(r)
		}), this.add(a)), a;
	}
	add(e) {
		this.#e.has(e.queryHash) || (this.#e.set(e.queryHash, e), this.notify({
			type: "added",
			query: e
		}));
	}
	remove(e) {
		let t = this.#e.get(e.queryHash);
		t && (e.destroy(), t === e && this.#e.delete(e.queryHash), this.notify({
			type: "removed",
			query: e
		}));
	}
	clear() {
		xe.batch(() => {
			this.getAll().forEach((e) => {
				this.remove(e);
			});
		});
	}
	get(e) {
		return this.#e.get(e);
	}
	getAll() {
		return [...this.#e.values()];
	}
	find(e) {
		let t = {
			exact: !0,
			...e
		};
		return this.getAll().find((e) => re(t, e));
	}
	findAll(e = {}) {
		let t = this.getAll();
		return Object.keys(e).length > 0 ? t.filter((t) => re(e, t)) : t;
	}
	notify(e) {
		xe.batch(() => {
			this.listeners.forEach((t) => {
				t(e);
			});
		});
	}
	onFocus() {
		xe.batch(() => {
			this.getAll().forEach((e) => {
				e.onFocus();
			});
		});
	}
	onOnline() {
		xe.batch(() => {
			this.getAll().forEach((e) => {
				e.onOnline();
			});
		});
	}
}, Be = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	constructor(e = {}) {
		this.#e = e.queryCache || new ze(), this.#t = e.mutationCache || new Le(), this.#n = e.defaultOptions || {}, this.#r = /* @__PURE__ */ new Map(), this.#i = /* @__PURE__ */ new Map(), this.#a = 0;
	}
	mount() {
		this.#a++, this.#a === 1 && (this.#o = v.subscribe(async (e) => {
			e && (await this.resumePausedMutations(), this.#e.onFocus());
		}), this.#s = Se.subscribe(async (e) => {
			e && (await this.resumePausedMutations(), this.#e.onOnline());
		}));
	}
	unmount() {
		this.#a--, this.#a === 0 && (this.#o?.(), this.#o = void 0, this.#s?.(), this.#s = void 0);
	}
	isFetching(e) {
		return this.#e.findAll({
			...e,
			fetchStatus: "fetching"
		}).length;
	}
	isMutating(e) {
		return this.#t.findAll({
			...e,
			status: "pending"
		}).length;
	}
	getQueryData(e) {
		let t = this.defaultQueryOptions({ queryKey: e });
		return this.#e.get(t.queryHash)?.state.data;
	}
	ensureQueryData(e) {
		let t = this.defaultQueryOptions(e), n = this.#e.build(this, t), r = n.state.data;
		return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(te(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r));
	}
	getQueriesData(e) {
		return this.#e.findAll(e).map(({ queryKey: e, state: t }) => [e, t.data]);
	}
	setQueryData(e, t, n) {
		let r = this.defaultQueryOptions({ queryKey: e }), i = this.#e.get(r.queryHash)?.state.data, a = w(t, i);
		if (a !== void 0) return this.#e.build(this, r).setData(a, {
			...n,
			manual: !0
		});
	}
	setQueriesData(e, t, n) {
		return xe.batch(() => this.#e.findAll(e).map(({ queryKey: e }) => [e, this.setQueryData(e, t, n)]));
	}
	getQueryState(e) {
		let t = this.defaultQueryOptions({ queryKey: e });
		return this.#e.get(t.queryHash)?.state;
	}
	removeQueries(e) {
		let t = this.#e;
		xe.batch(() => {
			t.findAll(e).forEach((e) => {
				t.remove(e);
			});
		});
	}
	resetQueries(e, t) {
		let n = this.#e;
		return xe.batch(() => (n.findAll(e).forEach((e) => {
			e.reset();
		}), this.refetchQueries({
			type: "active",
			...e
		}, t)));
	}
	cancelQueries(e, t = {}) {
		let n = {
			revert: !0,
			...t
		}, r = xe.batch(() => this.#e.findAll(e).map((e) => e.cancel(n)));
		return Promise.all(r).then(C).catch(C);
	}
	invalidateQueries(e, t = {}) {
		return xe.batch(() => (this.#e.findAll(e).forEach((e) => {
			e.invalidate();
		}), e?.refetchType === "none" ? Promise.resolve() : this.refetchQueries({
			...e,
			type: e?.refetchType ?? e?.type ?? "active"
		}, t)));
	}
	refetchQueries(e, t = {}) {
		let n = {
			...t,
			cancelRefetch: t.cancelRefetch ?? !0
		}, r = xe.batch(() => this.#e.findAll(e).filter((e) => !e.isDisabled() && !e.isStatic()).map((e) => {
			let t = e.fetch(void 0, n);
			return n.throwOnError || (t = t.catch(C)), e.state.fetchStatus === "paused" ? Promise.resolve() : t;
		}));
		return Promise.all(r).then(C);
	}
	fetchQuery(e) {
		let t = this.defaultQueryOptions(e);
		t.retry === void 0 && (t.retry = !1);
		let n = this.#e.build(this, t);
		return n.isStaleByTime(te(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data);
	}
	prefetchQuery(e) {
		return this.fetchQuery(e).then(C).catch(C);
	}
	fetchInfiniteQuery(e) {
		return e._type = "infinite", this.fetchQuery(e);
	}
	prefetchInfiniteQuery(e) {
		return this.fetchInfiniteQuery(e).then(C).catch(C);
	}
	ensureInfiniteQueryData(e) {
		return e._type = "infinite", this.ensureQueryData(e);
	}
	resumePausedMutations() {
		return Se.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
	}
	getQueryCache() {
		return this.#e;
	}
	getMutationCache() {
		return this.#t;
	}
	getDefaultOptions() {
		return this.#n;
	}
	setDefaultOptions(e) {
		this.#n = e;
	}
	setQueryDefaults(e, t) {
		this.#r.set(oe(e), {
			queryKey: e,
			defaultOptions: t
		});
	}
	getQueryDefaults(e) {
		let t = [...this.#r.values()], n = {};
		return t.forEach((t) => {
			se(e, t.queryKey) && Object.assign(n, t.defaultOptions);
		}), n;
	}
	setMutationDefaults(e, t) {
		this.#i.set(oe(e), {
			mutationKey: e,
			defaultOptions: t
		});
	}
	getMutationDefaults(e) {
		let t = [...this.#i.values()], n = {};
		return t.forEach((t) => {
			se(e, t.mutationKey) && Object.assign(n, t.defaultOptions);
		}), n;
	}
	defaultQueryOptions(e) {
		if (e._defaulted) return e;
		let t = {
			...this.#n.queries,
			...this.getQueryDefaults(e.queryKey),
			...e,
			_defaulted: !0
		};
		return t.queryHash ||= ae(t.queryKey, t), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === O && (t.enabled = !1), t;
	}
	defaultMutationOptions(e) {
		return e?._defaulted ? e : {
			...this.#n.mutations,
			...e?.mutationKey && this.getMutationDefaults(e.mutationKey),
			...e,
			_defaulted: !0
		};
	}
	clear() {
		this.#e.clear(), this.#t.clear();
	}
}, Ve = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), He = /* @__PURE__ */ o(((e, t) => {
	t.exports = Ve();
})), k = /* @__PURE__ */ c(u(), 1), A = He(), Ue = k.createContext(void 0), We = ({ client: e, children: t }) => (k.useEffect(() => (e.mount(), () => {
	e.unmount();
}), [e]), /* @__PURE__ */ (0, A.jsx)(Ue.Provider, {
	value: e,
	children: t
})), Ge = g();
function Ke(e, t = []) {
	let n = typeof e == "string" ? {
		prompt: e,
		context: t
	} : e;
	return {
		prompt: n.prompt,
		...n.context.length ? { context: n.context } : {},
		...n.runPrompt ? { run_prompt: n.runPrompt } : {},
		...n.metadata ? { metadata: n.metadata } : {},
		...n.runSettings ? { run_settings: n.runSettings } : {}
	};
}
var qe = class {
	getHass;
	constructor(e) {
		this.getHass = e;
	}
	async callWS(e) {
		let t = this.getHass();
		if (!t) throw Error("Home Assistant connection is not ready");
		return t.callWS(e);
	}
	status() {
		return this.callWS({ type: "ha_codex/status" });
	}
	settings() {
		return this.callWS({ type: "ha_codex/settings/get" });
	}
	updateSettings(e) {
		return this.callWS({
			type: "ha_codex/settings/update",
			settings: e
		});
	}
	bridgeLog(e = 500) {
		return this.callWS({
			type: "ha_codex/bridge_log",
			lines: e
		});
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
	contextLogs(e = 200) {
		return this.callWS({
			type: "ha_codex/context/logs",
			lines: e
		});
	}
	contextConfigFiles() {
		return this.callWS({ type: "ha_codex/context/config_files" });
	}
	contextConfigFile(e) {
		return this.callWS({
			type: "ha_codex/context/config_file",
			path: e
		});
	}
	listSessions() {
		return this.callWS({ type: "ha_codex/sessions/list" });
	}
	messagesAfter(e, t, n) {
		return this.callWS({
			type: "ha_codex/sessions/messages_after",
			session_id: e,
			after_id: t,
			...n ? { limit: n } : {}
		});
	}
	createSession() {
		return this.callWS({ type: "ha_codex/sessions/create" });
	}
	send(e, t, n = []) {
		let r = Ke(t, n);
		return this.callWS({
			type: "ha_codex/sessions/send",
			session_id: e,
			...r
		});
	}
	updateSessionRunSettings(e, t) {
		return this.callWS({
			type: "ha_codex/sessions/run_settings/update",
			session_id: e,
			run_settings: t
		});
	}
	respondRunPlan(e, t, n) {
		return this.callWS({
			type: "ha_codex/sessions/run_plan/respond",
			session_id: e,
			plan_id: t,
			action: n
		});
	}
	rollbackRun(e, t) {
		return this.callWS({
			type: "ha_codex/sessions/rollback_run",
			session_id: e,
			checkpoint_id: t
		});
	}
	steer(e, t, n = []) {
		let r = Ke(t, n);
		return this.callWS({
			type: "ha_codex/sessions/steer",
			session_id: e,
			...r
		});
	}
	retryContinue(e) {
		return this.callWS({
			type: "ha_codex/sessions/retry_continue",
			session_id: e
		});
	}
	cancel(e) {
		return this.callWS({
			type: "ha_codex/sessions/cancel",
			session_id: e
		});
	}
	rename(e, t) {
		return this.callWS({
			type: "ha_codex/sessions/rename",
			session_id: e,
			title: t
		});
	}
	archive(e, t) {
		return this.callWS({
			type: "ha_codex/sessions/archive",
			session_id: e,
			archived: t
		});
	}
	deleteSession(e) {
		return this.callWS({
			type: "ha_codex/sessions/delete",
			session_id: e
		});
	}
	respondApproval(e, t, n) {
		return this.callWS({
			type: "ha_codex/approvals/respond",
			session_id: e,
			approval_id: t,
			approved: n
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
	gitSetupSetRemote(e) {
		return this.callWS({
			type: "ha_codex/git/setup/set_remote",
			remote_url: e
		});
	}
	gitSetupPull() {
		return this.callWS({ type: "ha_codex/git/setup/pull" });
	}
	gitSetupChangeBranch(e) {
		return this.callWS({
			type: "ha_codex/git/setup/change_branch",
			branch: e
		});
	}
	gitSetupCheckoutCommit(e) {
		return this.callWS({
			type: "ha_codex/git/setup/checkout_commit",
			commit: e
		});
	}
	gitChanges() {
		return this.callWS({ type: "ha_codex/git/changes" });
	}
	gitDiff() {
		return this.callWS({ type: "ha_codex/git/diff" });
	}
	gitFileDiff(e, t = "") {
		return this.callWS({
			type: "ha_codex/git/file_diff",
			path: e,
			...t ? { old_path: t } : {}
		});
	}
	commitPush(e, t) {
		return this.callWS({
			type: "ha_codex/git/commit_push",
			message: e,
			files: Je(t)
		});
	}
	discard(e) {
		return this.callWS({
			type: "ha_codex/git/discard",
			files: Je(e)
		});
	}
	runValidation(e) {
		return this.callWS({
			type: "ha_codex/validation/run",
			session_id: e || ""
		});
	}
	reloadValidationDomains(e) {
		return this.callWS({
			type: "ha_codex/validation/reload",
			domains: e
		});
	}
};
function Je(e) {
	return e.map((e) => ({
		path: e.path,
		...e.old_path ? { old_path: e.old_path } : {}
	}));
}
//#endregion
//#region node_modules/zustand/esm/vanilla.mjs
var Ye = (e) => {
	let t, n = /* @__PURE__ */ new Set(), r = (e, r) => {
		let i = typeof e == "function" ? e(t) : e;
		if (!Object.is(i, t)) {
			let e = t;
			t = r ?? (typeof i != "object" || !i) ? i : Object.assign({}, t, i), n.forEach((n) => n(t, e));
		}
	}, i = () => t, a = {
		setState: r,
		getState: i,
		getInitialState: () => o,
		subscribe: (e) => (n.add(e), () => n.delete(e))
	}, o = t = e(r, i, a);
	return a;
}, Xe = ((e) => e ? Ye(e) : Ye), Ze = (e) => e;
function Qe(e, t = Ze) {
	let n = k.useSyncExternalStore(e.subscribe, k.useCallback(() => t(e.getState()), [e, t]), k.useCallback(() => t(e.getInitialState()), [e, t]));
	return k.useDebugValue(n), n;
}
var $e = (e) => {
	let t = Xe(e), n = (e) => Qe(t, e);
	return Object.assign(n, t), n;
}, et = ((e) => e ? $e(e) : $e);
//#endregion
//#region src/features/chat/chatUtils.ts
function tt(e) {
	return e?.command === "ha core restart" && String(e.reason || "").startsWith("restart_required:");
}
function nt(e) {
	return (e?.approvals || []).filter((e) => e.status === "pending" && !tt(e));
}
function rt(e) {
	return (e?.approvals || []).some((e) => e.status === "pending" && tt(e));
}
function it(e) {
	return e.map((e) => {
		let t = (e.approvals || []).find((e) => e.status === "pending" && tt(e));
		return t ? {
			session: e,
			approval: t
		} : null;
	}).filter(Boolean);
}
function at(e) {
	if (!ot(e)) return null;
	let t = String(e.content || "").match(/<ha_codex_question>\s*([\s\S]*?)\s*<\/ha_codex_question>\s*$/i);
	if (!t) return null;
	try {
		let e = JSON.parse(t[1]), n = Array.isArray(e.choices) ? e.choices.slice(0, 3) : [];
		if (!e.question || n.length !== 3) return null;
		let r = n.map((e) => ({
			label: String(e?.label || "").trim(),
			description: String(e?.description || "").trim()
		})).filter((e) => e.label);
		return r.length === 3 ? {
			question: String(e.question),
			choices: r,
			customPlaceholder: String(e.custom_placeholder || "Type a custom answer...")
		} : null;
	} catch {
		return null;
	}
}
function ot(e) {
	return e ? e.role === "assistant" ? !0 : e.role === "event" && String(e.metadata?.kind || "") === "run_finished" : !1;
}
function st(e) {
	return String(e || "").replace(/<ha_codex_question>[\s\S]*?<\/ha_codex_question>/gi, "").trim();
}
function ct(e, t = []) {
	let n = String(e || "").trim();
	if (!n || !t.length || !/^\s*File changes:\s*$/im.test(n)) return n;
	let r = new Set(t.map((e) => ut(e.path)).filter(Boolean));
	if (!r.size) return n;
	let i = n.split(/\r?\n/);
	for (let e = 0; e < i.length; e += 1) {
		if (!/^\s*File changes:\s*$/i.test(i[e])) continue;
		let t = [], n = !1, a = e + 1;
		for (; a < i.length; a += 1) {
			let e = i[a];
			if (!e.trim()) continue;
			let r = lt(e);
			if (!r) break;
			n = !0, r.path && t.push(r.path);
		}
		let o = [...new Set(t)];
		if (!(!n || !o.length) && o.every((e) => r.has(e))) return [...i.slice(0, e), ...i.slice(a)].join("\n").trim();
	}
	return n;
}
function lt(e) {
	let t = e.trim();
	if (!t) return null;
	if (/^[-*]?\s*\d+\s+more files? changed\.?$/i.test(t)) return {};
	t = t.replace(/^[-*]\s+/, "").trim(), t = t.replace(/^(added|modified|deleted|renamed|changed|untracked|copied)\s+/i, "").trim(), t = t.replace(/^[MADRC?]{1,2}\s+/, "").trim();
	let n = [...t.matchAll(/`([^`]+)`/g)].map((e) => e[1]);
	if (n.length) {
		let e = ut(n[n.length - 1]);
		return e ? { path: e } : null;
	}
	let r = t.split(/\s+->\s+/);
	if (t = r[r.length - 1].replace(/^["'`]+|["'`,.;:]+$/g, "").trim(), !/[/.\\]/.test(t)) return null;
	let i = ut(t);
	return i ? { path: i } : null;
}
function ut(e = "") {
	return String(e || "").replace(/\\/g, "/").replace(/^\/+/, "").replace(/^homeassistant\//, "").replace(/^config\//, "");
}
function dt(e) {
	return !e || !Array.isArray(e.messages) && e.has_pending_question !== void 0 ? null : ft(e, e.messages || []);
}
function ft(e, t = []) {
	if ([
		"planning",
		"running",
		"working"
	].includes(e.status || "")) return null;
	for (let e = t.length - 1; e >= 0; --e) {
		let n = t[e];
		if (n.role === "user") break;
		let r = at(n);
		if (r) return {
			...r,
			messageIndex: e
		};
	}
	return null;
}
function pt(e) {
	return e && !Array.isArray(e.messages) && e.has_pending_question !== void 0 ? !!e.has_pending_question : !!dt(e);
}
function mt(e) {
	let t = e?.metadata?.pending_plan;
	return !!(t && t.status === "pending");
}
function ht(e) {
	return e ? [
		"planning",
		"running",
		"working"
	].includes(e.status || "") ? !0 : e.status === "waiting_approval" && !!nt(e).length : !1;
}
function gt(e = []) {
	return e.filter((e) => !["restart_required", "restart_deferred"].includes(String(e.metadata?.kind || ""))).filter((e, t, n) => t === 0 ? !0 : _t(e) !== _t(n[t - 1]));
}
function _t(e) {
	return [
		e.role || "",
		e.metadata?.kind || "",
		(e.content || "").trim()
	].join("\n");
}
function vt(e, t) {
	return e.id !== void 0 && e.id !== null ? `id:${e.id}` : e.created_at ? `created:${e.created_at}:${e.role || ""}:${e.metadata?.kind || ""}` : `content:${t}:${_t(e)}`;
}
function yt(e, t) {
	if (t < 0 || t >= e.length - 1) return e;
	let n = [...e], [r] = n.splice(t, 1);
	return n.push(r), n;
}
function bt(e, t, n) {
	if (t < 0 || t >= e.length) return e;
	let r = [...e];
	return r[t] = {
		...r[t],
		content: `${r[t].content || ""}${n}`
	}, r[t].role === "assistant" && r.slice(t + 1).some((e) => e.role === "event") ? yt(r, t) : r;
}
function xt(e) {
	let t = wt(e.updated_at);
	if (t !== null) return t;
	let n = [...e.messages || []].reverse().map((e) => wt(e.created_at)).find((e) => e !== null);
	return n === void 0 ? wt(e.created_at) ?? 0 : n;
}
function St(e) {
	let t = wt(e.last_user_message_at);
	if (t !== null) return t;
	let n = [...e.messages || []].reverse().map((e) => e.role === "user" ? wt(e.created_at) : null).find((e) => e !== null);
	return n === void 0 ? xt(e) : n;
}
function Ct(e) {
	return St(e);
}
function wt(e) {
	if (e == null || e === "") return null;
	let t = Number(e);
	return Number.isFinite(t) && t > 0 ? t : null;
}
function Tt(e) {
	let t = (e.approvals || []).some((e) => !tt(e));
	return Array.isArray(e.messages) ? !(e.messages || []).some((e) => !["restart_required", "restart_deferred"].includes(String(e.metadata?.kind || ""))) && !Number(e.last_message_id || 0) && !t && !e.codex_session_id : !Number(e.last_message_id || 0) && !t && !e.codex_session_id;
}
function Et(e) {
	return nt(e).length || pt(e) || mt(e) || e.status === "waiting_approval" && nt(e).length ? 0 : [
		"planning",
		"running",
		"working"
	].includes(e.status || "") ? 1 : e.status === "error" ? 2 : 3;
}
function Dt(e, t) {
	return t && String(e.title || "") === "New chat";
}
function Ot(e, t = !1) {
	return [...e].sort((e, n) => {
		let r = Tt(e), i = Tt(n), a = {
			activity: Ct(e),
			empty: r,
			newEmpty: Dt(e, r),
			rank: Et(e),
			title: String(e.title || "")
		}, o = {
			activity: Ct(n),
			empty: i,
			newEmpty: Dt(n, i),
			rank: Et(n),
			title: String(n.title || "")
		};
		if (t) {
			let e = o.activity - a.activity;
			return e === 0 ? a.title.localeCompare(o.title) : e;
		}
		let s = Number(o.newEmpty) - Number(a.newEmpty);
		if (s !== 0) return s;
		let c = a.rank - o.rank;
		if (c !== 0) return c;
		let l = Number(a.empty) - Number(o.empty);
		if (l !== 0) return l;
		let u = o.activity - a.activity;
		return u === 0 ? a.title.localeCompare(o.title) : u;
	});
}
function kt(e, t, n) {
	let r = n.trim().toLowerCase();
	return r ? e.filter((e) => {
		let n = t[e];
		return n ? [
			n.title,
			n.id,
			n.codex_session_id
		].filter((e) => e != null).some((e) => String(e).toLowerCase().includes(r)) : !1;
	}) : e;
}
function At(e, t) {
	return e.filter((e) => !!t[e]?.archived);
}
function jt(e) {
	return `${e.kind}:${e.id}`;
}
function Mt(e, t) {
	let n = jt(t);
	return e.some((e) => jt(e) === n) || e.length >= 20 ? e : [...e, t];
}
function Nt(e, t) {
	return e.filter((e) => jt(e) !== t);
}
function Pt(e = []) {
	return e.slice(0, 20).map(Vt).filter((e) => !!e);
}
function Ft(e, t = [], n = {}) {
	let r = n.runPrompt?.trim();
	return {
		prompt: e.trim(),
		context: Pt(t),
		...r ? { runPrompt: r } : {},
		...n.metadata ? { metadata: n.metadata } : {},
		...n.runSettings ? { runSettings: n.runSettings } : {}
	};
}
function It(e, t, n = [], r = {}) {
	let i = Ft(t, n, r);
	return {
		id: e,
		content: i.prompt,
		...i
	};
}
function Lt(e) {
	let t = e?.context;
	return Array.isArray(t) ? t.map(Ht).filter((e) => !!e).slice(0, 20) : [];
}
function Rt(e) {
	return Pt(e).map(({ id: e, kind: t, label: n, subtitle: r }) => ({
		id: e,
		kind: t,
		label: n,
		...r ? { subtitle: r } : {}
	}));
}
function zt(e) {
	return {
		area: "mdi:floor-plan",
		automation: "mdi:robot-industrial-outline",
		config_file: "mdi:file-document-outline",
		device: "mdi:devices",
		entity: "mdi:home-assistant",
		log: "mdi:text-box-search-outline",
		script: "mdi:script-text-outline"
	}[e] || "mdi:paperclip";
}
function Bt(e) {
	return e === "sent" || e === "queued";
}
function Vt(e) {
	let t = Ht(e);
	if (!t) return null;
	let n = e.payload && typeof e.payload == "object" && !Array.isArray(e.payload) ? e.payload : void 0;
	return {
		...t,
		...n ? { payload: n } : {}
	};
}
function Ht(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (!Ut(t.kind)) return null;
	let n = String(t.id || "").trim(), r = String(t.label || "").trim();
	if (!n || !r) return null;
	let i = String(t.subtitle || "").trim();
	return {
		id: n,
		kind: t.kind,
		label: r,
		...i ? { subtitle: i } : {}
	};
}
function Ut(e) {
	return e === "entity" || e === "device" || e === "area" || e === "automation" || e === "script" || e === "log" || e === "config_file";
}
//#endregion
//#region src/stores/chatStore.ts
var Wt = 0;
function Gt(e) {
	let { messages: t, ...n } = e;
	return n;
}
function Kt(e, t, n = []) {
	let r = Gt(e);
	return {
		...t,
		...r,
		last_user_message_at: Qt(n, r.last_user_message_at ?? t?.last_user_message_at)
	};
}
function qt(e, t = {}) {
	let n = {}, r = {};
	return e.forEach((e) => {
		Array.isArray(e.messages) ? r[e.id] = e.messages : t[e.id] && (r[e.id] = t[e.id]), n[e.id] = Kt(e, void 0, r[e.id] || []);
	}), {
		chatsById: n,
		messagesByChatId: r
	};
}
function Jt(e, t) {
	return Ot(Object.values(e).filter((e) => !!e.archived === t), t).map((e) => e.id);
}
function Yt(e, t) {
	return e != null && t != null && String(e) === String(t);
}
function Xt(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : null;
}
function Zt(e, t = 0) {
	let n = Number(t);
	return e.reduce((e, t, n) => {
		let r = Xt(t.id) ?? n + 1;
		return Math.max(e, r);
	}, Number.isFinite(n) ? n : 0);
}
function Qt(e, t) {
	let n = $t(t);
	return e.reduce((e, t) => {
		if (t.role !== "user") return e;
		let n = $t(t.created_at);
		return n === null ? e : e === null ? n : Math.max(e, n);
	}, n);
}
function $t(e) {
	if (e == null || e === "") return null;
	let t = Number(e);
	return Number.isFinite(t) && t > 0 ? t : null;
}
function en(e, t) {
	let n = [...e];
	return t.forEach((e) => {
		let t = n.findIndex((t) => Yt(t.id, e.id));
		if (t !== -1) {
			n[t] = e;
			return;
		}
		let r = n.findIndex((t) => t.metadata?.optimistic && t.role === e.role && String(t.content || "") === String(e.content || ""));
		if (r !== -1) {
			n[r] = e;
			return;
		}
		n.push(e);
	}), n;
}
var j = et((e, t) => ({
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
	setSessions: (t) => e((e) => {
		let n = qt(t, e.messagesByChatId), r = Jt(n.chatsById, !1), i = Jt(n.chatsById, !0), a = e.showArchived ? i : r, o = e.activeId && a.includes(e.activeId) ? e.activeId : a[0] || null, s = Object.fromEntries(t.map((e) => [e.id, [
			"planning",
			"running",
			"working"
		].includes(e.status || "")]));
		return {
			...n,
			activeChatIds: r,
			archivedChatIds: i,
			activeId: o,
			streamingByChatId: s
		};
	}),
	upsertSession: (t) => e((e) => {
		let n = Array.isArray(t.messages) ? t.messages : e.messagesByChatId[t.id], r = {
			...e.chatsById,
			[t.id]: Kt(t, e.chatsById[t.id], n || [])
		}, i = Jt(r, !1), a = Jt(r, !0), o = e.showArchived ? a : i, s = e.activeId && o.includes(e.activeId) ? e.activeId : o[0] || null;
		return {
			chatsById: r,
			messagesByChatId: n ? {
				...e.messagesByChatId,
				[t.id]: n
			} : e.messagesByChatId,
			activeChatIds: i,
			archivedChatIds: a,
			activeId: s,
			streamingByChatId: {
				...e.streamingByChatId,
				[t.id]: [
					"planning",
					"running",
					"working"
				].includes(t.status || "")
			}
		};
	}),
	deleteSession: (t) => e((e) => {
		let { [t]: n, ...r } = e.chatsById, { [t]: i, ...a } = e.messagesByChatId, { [t]: o, ...s } = e.contextByChatId, c = Jt(r, !1), l = Jt(r, !0), u = e.showArchived ? l : c;
		return {
			chatsById: r,
			messagesByChatId: a,
			contextByChatId: s,
			activeChatIds: c,
			archivedChatIds: l,
			activeId: e.activeId === t ? u[0] || null : e.activeId
		};
	}),
	appendMessage: (t, n, r = !0) => e((e) => {
		let i = e.chatsById[t];
		if (!i) return {};
		let a = en(e.messagesByChatId[t] || [], [n]), o = {
			...e.chatsById,
			[t]: {
				...i,
				last_message_id: Zt(a, i.last_message_id),
				last_user_message_at: Qt(a, i.last_user_message_at),
				updated_at: r ? Date.now() / 1e3 : i.updated_at
			}
		};
		return {
			chatsById: o,
			messagesByChatId: {
				...e.messagesByChatId,
				[t]: a
			},
			activeChatIds: Jt(o, !1),
			archivedChatIds: Jt(o, !0)
		};
	}),
	appendMessages: (t, n, r = !1) => e((e) => {
		let i = e.chatsById[t];
		if (!i || !n.length) return {};
		let a = en(e.messagesByChatId[t] || [], n), o = {
			...e.chatsById,
			[t]: {
				...i,
				last_message_id: Zt(a, i.last_message_id),
				last_user_message_at: Qt(a, i.last_user_message_at),
				updated_at: r ? Date.now() / 1e3 : i.updated_at
			}
		};
		return {
			chatsById: o,
			messagesByChatId: {
				...e.messagesByChatId,
				[t]: a
			},
			activeChatIds: r ? Jt(o, !1) : e.activeChatIds,
			archivedChatIds: r ? Jt(o, !0) : e.archivedChatIds
		};
	}),
	appendDelta: (t, n, r) => e((e) => {
		let i = e.chatsById[t];
		if (!i) return {};
		let a = e.messagesByChatId[t] || [], o = Xt(r);
		if (!a.length && o !== null && o > 1) return {};
		let s = [...a], c = r == null ? -1 : s.findIndex((e) => Yt(e.id, r));
		if (c === -1) {
			for (let e = s.length - 1; e >= 0; --e) if (s[e].role === "assistant") {
				c = e;
				break;
			}
		}
		c === -1 ? s.push({
			id: r,
			role: "assistant",
			content: n,
			created_at: Date.now() / 1e3
		}) : s.splice(0, s.length, ...bt(s, c, n));
		let l = Number(i.last_message_id || 0), u = o === null ? l : Math.max(l, o);
		return {
			chatsById: u === l ? e.chatsById : {
				...e.chatsById,
				[t]: {
					...i,
					last_message_id: u
				}
			},
			messagesByChatId: {
				...e.messagesByChatId,
				[t]: s
			}
		};
	}),
	setActiveId: (t) => e({ activeId: t }),
	setShowArchived: (t) => e((e) => {
		let n = t ? e.archivedChatIds : e.activeChatIds;
		return {
			showArchived: t,
			activeId: e.activeId && n.includes(e.activeId) ? e.activeId : n[0] || null
		};
	}),
	setDraft: (t, n) => e((e) => ({ drafts: {
		...e.drafts,
		[t]: n
	} })),
	clearDraft: (t) => e((e) => {
		let { [t]: n, ...r } = e.drafts;
		return { drafts: r };
	}),
	addContextItem: (t, n) => e((e) => {
		let r = Mt(e.contextByChatId[t] || [], n);
		return { contextByChatId: {
			...e.contextByChatId,
			[t]: r
		} };
	}),
	removeContextItem: (t, n) => e((e) => {
		let r = Nt(e.contextByChatId[t] || [], n);
		if (!r.length) {
			let { [t]: n, ...r } = e.contextByChatId;
			return { contextByChatId: r };
		}
		return { contextByChatId: {
			...e.contextByChatId,
			[t]: r
		} };
	}),
	clearContext: (t) => e((e) => {
		let { [t]: n, ...r } = e.contextByChatId;
		return { contextByChatId: r };
	}),
	setContextItems: (t, n) => e((e) => {
		let r = Pt(n);
		if (!r.length) {
			let { [t]: n, ...r } = e.contextByChatId;
			return { contextByChatId: r };
		}
		return { contextByChatId: {
			...e.contextByChatId,
			[t]: r
		} };
	}),
	setQuestionDraft: (t, n) => e((e) => ({ questionDrafts: {
		...e.questionDrafts,
		[t]: n
	} })),
	clearQuestionDraft: (t) => e((e) => {
		let { [t]: n, ...r } = e.questionDrafts;
		return { questionDrafts: r };
	}),
	enqueueMessage: (t, n, r = []) => {
		let i = typeof n == "string" ? It(String(++Wt), n, r) : It(String(++Wt), n.prompt, n.context, {
			runPrompt: n.runPrompt,
			metadata: n.metadata
		});
		return e((e) => ({ queuesByChatId: {
			...e.queuesByChatId,
			[t]: [...e.queuesByChatId[t] || [], i]
		} })), i;
	},
	removeQueuedMessage: (t, n) => e((e) => ({ queuesByChatId: {
		...e.queuesByChatId,
		[t]: (e.queuesByChatId[t] || []).filter((e) => e.id !== n)
	} })),
	setQueueStarting: (t, n) => e((e) => ({ queueStartsByChatId: {
		...e.queueStartsByChatId,
		[t]: n
	} })),
	setScheduledRestart: (t) => e({ scheduledRestart: t }),
	setValidation: (t) => e({ validation: t }),
	setValidationRunning: (t) => e({ validationRunning: t }),
	bumpRestartToast: () => e((e) => ({ restartToastNonce: e.restartToastNonce + 1 }))
}));
//#endregion
//#region src/features/git/gitUtils.ts
function tn(e) {
	return e.trim() === "??" ? "untracked" : e.includes("D") && !/[MARCA]/.test(e) ? "deleted" : e.includes("A") ? "added" : e.includes("R") ? "renamed" : e.includes("C") ? "copied" : e.includes("M") ? "modified" : "changed";
}
function nn(e, t = "") {
	return `${t || ""}\n${e || ""}`;
}
function rn(e) {
	let t = String(e || ""), n = t.lastIndexOf("/");
	return n === -1 ? {
		folder: ".",
		name: t
	} : {
		folder: t.slice(0, n),
		name: t.slice(n + 1)
	};
}
function an(e) {
	let t = /* @__PURE__ */ new Map();
	return e.forEach((e) => {
		let { folder: n, name: r } = rn(e.path), i = n || ".";
		t.has(i) || t.set(i, []), t.get(i)?.push({
			...e,
			display_name: r
		});
	}), [...t.entries()].sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => ({
		folder: e,
		files: t.sort((e, t) => String(e.display_name || e.path).localeCompare(String(t.display_name || t.path)))
	}));
}
function on(e = []) {
	return e;
}
function sn(e = []) {
	return on(e).length;
}
function cn(e = []) {
	return Object.fromEntries(on(e).map((e) => [nn(e.path, e.old_path || ""), !0]));
}
function ln(e = [], t = {}) {
	return on(e).filter((e) => t[nn(e.path, e.old_path || "")]);
}
function un(e = [], t = {}) {
	return ln(e, t).length;
}
function dn(e, t = {}) {
	let n = nn(e.path, e.old_path || "");
	if (t[n]) {
		let { [n]: e, ...r } = t;
		return r;
	}
	return {
		...t,
		[n]: !0
	};
}
function fn(e = [], t = {}, n = !1) {
	return n || un(e, t) === 0;
}
function pn(e) {
	return e?.setup_complete === !0;
}
function mn(e) {
	return e ? e.missing?.length ? e.missing : [] : ["setup status"];
}
function hn(e) {
	return !!e?.missing?.includes("setup status");
}
function gn(e, t = !1) {
	return !e || t || hn(e) ? {
		tone: "checking",
		title: "Checking Git setup...",
		detail: e?.repo_error || "Loading setup status..."
	} : pn(e) ? {
		tone: "success",
		title: "Git integration ready",
		detail: "Review, commit, and push controls are enabled."
	} : {
		tone: "warning",
		title: "Git setup incomplete",
		detail: `Missing: ${mn(e).join(", ") || "setup status"}`
	};
}
function _n(e = [], t = 0, n = 6) {
	let r = Math.max(1, Math.floor(n)), i = e.length ? Math.ceil(e.length / r) : 0, a = i ? Math.min(Math.max(0, Math.floor(t)), i - 1) : 0, o = a * r, s = e.slice(o, o + r);
	return {
		items: s,
		page: a,
		pageCount: i,
		start: s.length ? o + 1 : 0,
		end: o + s.length
	};
}
function vn(e) {
	return String(e || "").split("\n").filter((e) => !e.startsWith("diff --git ")).filter((e) => !e.startsWith("index ")).filter((e) => !e.startsWith("new file mode ")).filter((e) => !e.startsWith("deleted file mode ")).map((e) => e.startsWith("@@") ? {
		type: "hunk",
		content: e
	} : e.startsWith("+") && !e.startsWith("+++") ? {
		type: "added",
		content: e
	} : e.startsWith("-") && !e.startsWith("---") ? {
		type: "deleted",
		content: e
	} : e.startsWith("+++") || e.startsWith("---") ? {
		type: "meta",
		content: e
	} : {
		type: "context",
		content: e
	});
}
function yn(e) {
	let t = String(e || "changed").toLowerCase();
	return t === "added" || t === "untracked" ? "mdi:file-plus-outline" : t === "modified" ? "mdi:file-edit-outline" : t === "deleted" ? "mdi:file-remove-outline" : t === "renamed" ? "mdi:file-move-outline" : t === "copied" ? "mdi:file-multiple-outline" : "mdi:file-outline";
}
//#endregion
//#region src/features/settings/runtimeSettingsUtils.ts
var bn = "gpt_5_5", xn = "codex_default", Sn = [
	{
		id: "gpt_5_5",
		label: "GPT-5.5",
		model: "gpt-5.5"
	},
	{
		id: "gpt_5_4",
		label: "GPT-5.4",
		model: "gpt-5.4"
	},
	{
		id: "gpt_5_4_mini",
		label: "GPT-5.4-Mini",
		model: "gpt-5.4-mini"
	},
	{
		id: "gpt_5_3_codex",
		label: "GPT-5.3-Codex",
		model: "gpt-5.3-codex"
	},
	{
		id: "gpt_5_3_codex_spark",
		label: "GPT-5.3-Codex-Spark",
		model: "gpt-5.3-codex-spark"
	},
	{
		id: "gpt_5_2",
		label: "GPT-5.2",
		model: "gpt-5.2"
	}
], Cn = new Set(Sn.map((e) => e.id)), wn = {
	mode: "auto",
	model_preset_id: bn,
	reasoning_effort: "auto",
	verbosity: "auto",
	plan_mode: "auto",
	validation_depth: "auto",
	tool_visibility: "normal",
	approval_mode: "ask"
}, Tn = {
	mode: ["auto", "manual"],
	reasoning_effort: [
		"auto",
		"minimal",
		"low",
		"medium",
		"high",
		"xhigh"
	],
	verbosity: [
		"auto",
		"low",
		"medium",
		"high"
	],
	plan_mode: [
		"auto",
		"always",
		"off"
	],
	validation_depth: [
		"auto",
		"none",
		"full"
	],
	tool_visibility: [
		"compact",
		"normal",
		"verbose"
	],
	approval_mode: ["ask", "auto_readonly"]
};
function En() {
	return {
		defaults: { ...wn },
		model_presets: Sn.map((e) => ({ ...e })),
		context_budget_chars: 4e4
	};
}
function Dn(e, t = wn) {
	let n = { ...t };
	if (!e || typeof e != "object") return n;
	if (Object.entries(Tn).forEach(([t, r]) => {
		if (!(t in e)) return;
		let i = String(e[t] || "");
		if (!r.includes(i)) throw Error(`${t} must be one of ${r.join(", ")}`);
		n[t] = i;
	}), "model_preset_id" in e) {
		let t = String(e.model_preset_id || "").trim();
		if (!t) throw Error("model_preset_id is required");
		n.model_preset_id = t;
	}
	return n;
}
function On(e) {
	let t = En();
	if (!e || typeof e != "object") return t;
	let n = kn(e.model_presets), r = {
		defaults: Dn(e.defaults, t.defaults),
		model_presets: n,
		context_budget_chars: In(e.context_budget_chars)
	};
	return r.model_presets.some((e) => e.id === r.defaults.model_preset_id) ? r.defaults.model_preset_id === "codex_default" && (r.defaults.model_preset_id = bn) : r.defaults.model_preset_id = bn, r;
}
function kn(e) {
	let t = Sn.map((e) => ({ ...e })), n = new Set([...Sn.map((e) => e.id), xn]);
	return Array.isArray(e) && e.forEach((e) => {
		if (!e || typeof e != "object") return;
		let r = e, i = String(r.id || "").trim();
		if (!i || n.has(i)) return;
		let a = String(r.label || i).trim() || i, o = r.model === null || r.model === void 0 ? null : String(r.model).trim() || null;
		t.push({
			id: i,
			label: a,
			model: o
		}), n.add(i);
	}), t;
}
function An(e, t) {
	let n = On(e), r = String(t.id || Fn(t.label || t.model || "model")).trim();
	if (!r || Cn.has(r)) return n;
	let i = {
		id: r,
		label: String(t.label || r).trim() || r,
		model: t.model === null ? null : String(t.model || "").trim() || null
	}, a = n.model_presets.findIndex((e) => e.id === r), o = [...n.model_presets];
	return a === -1 ? o.push(i) : o[a] = i, {
		...n,
		model_presets: o
	};
}
function jn(e, t) {
	let n = On(e);
	if (Cn.has(t)) return n;
	let r = n.model_presets.filter((e) => e.id !== t), i = n.defaults.model_preset_id === t ? {
		...n.defaults,
		model_preset_id: bn
	} : n.defaults;
	return {
		...n,
		defaults: i,
		model_presets: r
	};
}
function Mn(e, t) {
	let n = On(t), r = e?.metadata?.run_settings, i = Dn(r && typeof r == "object" ? r : void 0, n.defaults);
	return n.model_presets.some((e) => e.id === i.model_preset_id) ? i.model_preset_id === "codex_default" && (i.model_preset_id = bn) : i.model_preset_id = bn, i;
}
function Nn(e, t = 4e4) {
	let n = Math.max(1e3, Number.isFinite(Number(t)) ? Number(t) : 4e4), r = Pn(e), i = r / n;
	return {
		used: r,
		budget: n,
		ratio: i,
		level: i >= .9 ? "danger" : i >= .7 ? "warning" : "ok",
		label: `${Ln(r)} / ${Ln(n)}`
	};
}
function Pn(e) {
	return e.reduce((e, t) => e + JSON.stringify(t).length, 0);
}
function Fn(e) {
	return e.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || `model_${Date.now()}`;
}
function In(e) {
	let t = Number(e);
	return Number.isFinite(t) ? Math.min(2e5, Math.max(1e3, Math.round(t))) : 4e4;
}
function Ln(e) {
	return e < 1e3 ? String(Math.round(e)) : `${Math.round(e / 1e3)}k`;
}
//#endregion
//#region src/stores/uiStore.ts
var M = et((e, t) => ({
	status: {},
	bridgeLog: null,
	bridgeLogLoading: !1,
	bridgeActionRunning: !1,
	coreActionRunning: !1,
	archiveCleanupRunning: !1,
	account: null,
	accountLoading: !1,
	accountActionRunning: !1,
	deviceLogin: null,
	showStatusDebug: !1,
	statusDebugTab: "status",
	settings: En(),
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
	setStatus: (t) => e({ status: t }),
	setBridgeLog: (t) => e({ bridgeLog: t }),
	setBridgeLogLoading: (t) => e({ bridgeLogLoading: t }),
	setBridgeActionRunning: (t) => e({ bridgeActionRunning: t }),
	setCoreActionRunning: (t) => e({ coreActionRunning: t }),
	setArchiveCleanupRunning: (t) => e({ archiveCleanupRunning: t }),
	setAccount: (t) => e({ account: t }),
	setAccountLoading: (t) => e({ accountLoading: t }),
	setAccountActionRunning: (t) => e({ accountActionRunning: t }),
	setDeviceLogin: (t) => e({ deviceLogin: t }),
	setShowStatusDebug: (t) => e({ showStatusDebug: t }),
	setStatusDebugTab: (t) => e({ statusDebugTab: t }),
	setSettings: (t) => e({ settings: t }),
	setSettingsLoading: (t) => e({ settingsLoading: t }),
	setSettingsSaving: (t) => e({ settingsSaving: t }),
	setSettingsTab: (t) => e({ settingsTab: t }),
	setGitPanelOpen: (t) => e({ gitPanelOpen: t }),
	setGitSetupStatus: (t) => e({ gitSetupStatus: t }),
	setGitSetupLoading: (t) => e({ gitSetupLoading: t }),
	setGitSetupActionRunning: (t) => e({ gitSetupActionRunning: t }),
	setGitSetupResult: (t) => e({ gitSetupResult: t }),
	setGitChanges: (n) => e({
		gitChanges: n,
		gitSelection: cn(n?.files || []),
		gitVisibleLimit: t().gitPageSize
	}),
	setGitChangedCount: (t) => e({ gitChangedCount: t }),
	setGitLoading: (t) => e({ gitLoading: t }),
	setOpenGitDiffKey: (t) => e({ openGitDiffKey: t }),
	setGitFileDiff: (t, n) => e((e) => ({ gitFileDiffs: {
		...e.gitFileDiffs,
		[t]: n
	} })),
	setGitFileDiffLoading: (t, n) => e((e) => ({ gitFileDiffLoading: {
		...e.gitFileDiffLoading,
		[t]: n
	} })),
	toggleGitFileSelected: (t) => e((e) => ({
		gitSelection: dn(t, e.gitSelection),
		gitDiscardConfirming: !1
	})),
	setGitFileSelected: (t, n) => e((e) => {
		let r = nn(t.path, t.old_path || "");
		if (n) return {
			gitSelection: {
				...e.gitSelection,
				[r]: !0
			},
			gitDiscardConfirming: !1
		};
		let { [r]: i, ...a } = e.gitSelection;
		return {
			gitSelection: a,
			gitDiscardConfirming: !1
		};
	}),
	setGitOperationResult: (t) => e({ gitOperationResult: t }),
	setGitDiscardConfirming: (t) => e({ gitDiscardConfirming: t }),
	showMoreGitFiles: () => e((e) => ({ gitVisibleLimit: e.gitVisibleLimit + e.gitPageSize })),
	setCommitMessage: (t) => e({ commitMessage: t }),
	setCommitRunning: (t) => e({ commitRunning: t }),
	setDiscardRunning: (t) => e({ discardRunning: t }),
	setRenaming: (t, n = "") => e({
		renamingId: t,
		renameTitle: n
	}),
	showToast: (n, r = "info") => {
		let i = t().toastId + 1;
		e((e) => ({
			toastId: i,
			toasts: [...e.toasts, {
				id: i,
				message: n,
				tone: r,
				entering: !0,
				exiting: !1
			}].slice(-4)
		})), window.setTimeout(() => {
			e((e) => ({ toasts: e.toasts.map((e) => e.id === i ? {
				...e,
				entering: !1
			} : e) }));
		}, 280), window.setTimeout(() => {
			e((e) => ({ toasts: e.toasts.map((e) => e.id === i ? {
				...e,
				exiting: !0
			} : e) }));
		}, 3900), window.setTimeout(() => t().removeToast(i), 4200);
	},
	removeToast: (t) => e((e) => ({ toasts: e.toasts.filter((e) => e.id !== t) }))
})), Rn = {
	session_updated: "ha_codex/session_updated",
	session_deleted: "ha_codex/session_deleted",
	message_appended: "ha_codex/message_appended",
	message_delta: "ha_codex/message_delta",
	run_finished: "ha_codex/run_finished",
	approval_required: "ha_codex/approval_required",
	validation_finished: "ha_codex/validation_finished"
};
//#endregion
//#region src/services/subscriptionState.ts
function zn(e, t, n) {
	return n && e === t;
}
//#endregion
//#region src/services/websocketManager.ts
var Bn = 200, Vn = new class {
	hass = null;
	panel = null;
	subscribed = !1;
	unsubscribers = [];
	reconnectTimer = null;
	deltaFrame = null;
	pendingDeltas = /* @__PURE__ */ new Map();
	subscriptionGeneration = 0;
	configure(e, t) {
		this.hass = e, this.panel = t, this.connect();
	}
	connect() {
		if (this.subscribed || !this.hass?.connection) return;
		let e = this.panel?.config?.events || Rn, t = Object.values(e).filter(Boolean);
		if (!t.length) return;
		this.subscribed = !0;
		let n = ++this.subscriptionGeneration;
		t.forEach((e) => {
			try {
				let t = this.hass?.connection?.subscribeEvents((e) => this.handleEvent(e), e);
				Promise.resolve(t).then((e) => {
					typeof e == "function" && (zn(this.subscriptionGeneration, n, this.subscribed) ? this.unsubscribers.push(e) : e());
				});
			} catch (e) {
				throw this.subscribed = !1, this.scheduleReconnect(), e;
			}
		});
	}
	cleanup() {
		this.unsubscribers.forEach((e) => e()), this.unsubscribers = [], this.subscribed = !1, this.subscriptionGeneration += 1, this.reconnectTimer &&= (window.clearTimeout(this.reconnectTimer), null), this.deltaFrame !== null && (window.cancelAnimationFrame(this.deltaFrame), this.deltaFrame = null), this.pendingDeltas.clear();
	}
	scheduleReconnect() {
		this.reconnectTimer ||= window.setTimeout(() => {
			this.reconnectTimer = null, this.connect();
		}, 1500);
	}
	handleEvent(e) {
		let t = e.data || {}, n = j.getState();
		t.session_id && t.message && (this.flushDeltas(), n.appendMessage(t.session_id, t.message)), t.session_id && t.delta && this.queueDelta(t.session_id, t.delta, t.message_id), t.session && (this.flushDeltas(), n.upsertSession(t.session), this.recoverMissingMessages(t.session.id)), t.deleted_session_id && n.deleteSession(t.deleted_session_id), t.validation && (n.setValidation(t.validation), M.getState().showToast(t.validation.status === "passed" ? "Validation passed" : "Validation finished", t.validation.status === "passed" ? "success" : "error")), t.approval && (n.bumpRestartToast(), t.approval.command !== "ha core restart" && M.getState().showToast("Codex needs approval for a shell command", "info"));
	}
	async recoverMissingMessages(e) {
		if (!this.hass) return;
		let t = j.getState(), n = t.chatsById[e], r = Math.max(0, ...(t.messagesByChatId[e] || []).map((e) => Number(e.id)).filter((e) => Number.isFinite(e))), i = Number(n?.last_message_id || 0);
		if (!(!i || i <= r)) try {
			let t = await this.hass.callWS({
				type: "ha_codex/sessions/messages_after",
				session_id: e,
				after_id: r,
				...r ? {} : { limit: Bn }
			});
			j.getState().appendMessages(e, t.messages || [], !1);
		} catch {}
	}
	queueDelta(e, t, n) {
		let r = `${e}:${n ?? "latest"}`, i = this.pendingDeltas.get(r);
		this.pendingDeltas.set(r, {
			chatId: e,
			messageId: n,
			delta: `${i?.delta || ""}${t}`
		}), this.deltaFrame === null && (this.deltaFrame = window.requestAnimationFrame(() => {
			this.deltaFrame = null, this.flushDeltas();
		}));
	}
	flushDeltas() {
		if (!this.pendingDeltas.size) return;
		let e = [...this.pendingDeltas.values()];
		this.pendingDeltas.clear();
		let t = j.getState();
		e.forEach((e) => t.appendDelta(e.chatId, e.delta, e.messageId));
	}
}();
//#endregion
//#region src/utils/format.ts
function Hn(e) {
	return String(e || "").replace(/\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g, "");
}
function Un(e, t = {}) {
	let n = qn(e);
	if (n === null) return "";
	let r = /* @__PURE__ */ new Date(n * 1e3), i = Math.floor((Date.now() - r.getTime()) / 1e3), a = Math.abs(i);
	if (i < 0 && t.pastOnly) return "just now";
	let o = i >= 0 ? "ago" : "", s = i < 0 ? "in " : "";
	if (a < 60) return i < 0 && !t.pastOnly ? "in less than a minute" : "just now";
	if (a < 3600) {
		let e = Math.floor(a / 60);
		return `${s}${e} minute${e === 1 ? "" : "s"}${o ? ` ${o}` : ""}`;
	}
	if (a < 86400) {
		let e = Math.floor(a / 3600);
		return `${s}${e} hour${e === 1 ? "" : "s"}${o ? ` ${o}` : ""}`;
	}
	if (a < 172800 && i >= 0) return "yesterday";
	if (a < 172800 && !t.pastOnly) return "tomorrow";
	if (i < 0 && !t.pastOnly && a < 2592e3) {
		let e = Math.floor(a / 86400);
		return `in ${e} day${e === 1 ? "" : "s"}`;
	}
	return `${r.getFullYear()}-${String(r.getMonth() + 1).padStart(2, "0")}-${String(r.getDate()).padStart(2, "0")}`;
}
function Wn(e) {
	return Un(e, { pastOnly: !0 });
}
function Gn(e) {
	let t = Number(e);
	if (!Number.isFinite(t) || t < 0) return "";
	let n = Math.floor(t / 86400), r = Math.floor(t % 86400 / 3600), i = Math.floor(t % 3600 / 60);
	return n > 0 ? `${n}d ${r}h` : r > 0 ? `${r}h ${i}m` : i > 0 ? `${i}m` : `${Math.floor(t)}s`;
}
function Kn(e) {
	let t = qn(e);
	return t === null ? "" : (/* @__PURE__ */ new Date(t * 1e3)).toLocaleString();
}
function qn(e) {
	if (e == null || e === "") return null;
	let t = Number(e);
	return Number.isFinite(t) && t > 0 ? t : null;
}
function N(e) {
	if (e instanceof Error && e.message) return e.message;
	if (typeof e == "object" && e && "code" in e) {
		let t = e;
		return `${t.name || "Error"} code ${t.code}`;
	}
	return String(e);
}
async function Jn(e) {
	if (navigator.clipboard?.writeText) {
		await navigator.clipboard.writeText(e);
		return;
	}
	let t = document.createElement("textarea");
	t.value = e, t.setAttribute("readonly", ""), t.style.position = "fixed", t.style.left = "-9999px", t.style.top = "0", document.body.appendChild(t), t.focus(), t.select();
	try {
		if (!document.execCommand("copy")) throw Error("Copy command failed");
	} finally {
		t.remove();
	}
}
//#endregion
//#region src/features/runPlan/runPlanUtils.ts
function Yn(e) {
	let t = e?.metadata?.pending_plan;
	return !t || t.status !== "pending" || !t.id ? null : t;
}
function Xn(e) {
	let t = e?.metadata?.pending_plan;
	return !!(t && t.status === "planning");
}
function Zn(e) {
	return String(Yn(e)?.prompt || "").trim();
}
//#endregion
//#region src/hooks/useHaCodexActions.ts
function Qn() {
	return window.crypto?.randomUUID ? `local-${window.crypto.randomUUID()}` : `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function $n(e, t) {
	let n = e.results?.find((e) => e.ok === !1);
	return Hn([
		n?.stdout,
		n?.stderr,
		e.stdout,
		e.stderr
	].filter(Boolean).join("\n")).trim() || t;
}
function er(e, t) {
	let n = e.results?.find((e) => e.ok === !1);
	return Hn([
		n?.stdout,
		n?.stderr,
		e.stdout,
		e.stderr
	].filter(Boolean).join("\n")).trim() || t;
}
function tr(e) {
	return JSON.stringify(e?.metadata?.run_settings || null);
}
function nr(e) {
	return (0, k.useMemo)(() => {
		let t = () => M.getState(), n = () => j.getState(), r = null, i = async (t) => {
			let [n, r] = await Promise.all([e.gitStatus(), e.gitDiff()]), i = on(Hn(n.stdout || "").split("\n").filter((e) => e.trim()).map((e) => {
				let t = e.slice(0, 2);
				return {
					path: e.slice(3),
					code: t,
					status: tn(t),
					added_lines: null,
					deleted_lines: null
				};
			}));
			return {
				ok: !!(n.ok && r.ok),
				returncode: r.returncode,
				stdout: n.stdout,
				stderr: [
					n.stderr,
					r.stderr,
					N(t)
				].filter(Boolean).join("\n"),
				changed_count: i.length,
				files: i,
				legacy: !0
			};
		}, a = async () => {
			let t = await e.listSessions();
			n().setSessions(t.sessions || []);
		}, o = async () => {
			try {
				t().setStatus(await e.status());
			} catch (e) {
				t().setStatus({ error: N(e) });
			}
		}, s = async () => {
			t().setAccountLoading(!0);
			try {
				t().setAccount(await e.accountStatus());
			} catch (e) {
				t().setAccount({
					ok: !1,
					logged_in: !1,
					error: N(e)
				});
			} finally {
				t().setAccountLoading(!1);
			}
		}, c = () => {
			r !== null && window.clearInterval(r), r = window.setInterval(() => {
				e.accountDeviceLoginStatus().then(async (e) => {
					t().setDeviceLogin(e), e.status === "succeeded" ? (r !== null && window.clearInterval(r), r = null, await Promise.all([s(), o()]), t().showToast("Codex account connected", "success")) : (e.status === "failed" || e.status === "canceled") && (r !== null && window.clearInterval(r), r = null, e.status === "failed" && t().showToast(e.error || "Device login failed", "error"));
				}).catch((e) => {
					r !== null && window.clearInterval(r), r = null, t().showToast(N(e), "error");
				});
			}, 2e3);
		}, l = async () => {
			t().setSettingsLoading(!0);
			try {
				let n = await e.settings();
				t().setSettings(On(n.settings));
			} catch (e) {
				t().showToast(`Settings failed to load: ${N(e)}`, "error");
			} finally {
				t().setSettingsLoading(!1);
			}
		}, u = async () => {
			t().setBridgeLogLoading(!0);
			try {
				t().setBridgeLog(await e.bridgeLog());
			} catch (e) {
				t().setBridgeLog({
					error: N(e),
					lines: ""
				});
			} finally {
				t().setBridgeLogLoading(!1);
			}
		}, d = async () => {
			t().setBridgeLogLoading(!0);
			try {
				let n = await e.bridgeLogClear();
				t().setBridgeLog(n), n.error ? t().showToast(`Bridge log clear failed: ${n.error}`, "error") : t().showToast("Bridge log cleared", "success");
			} catch (e) {
				t().showToast(`Bridge log clear failed: ${N(e)}`, "error");
			} finally {
				t().setBridgeLogLoading(!1);
			}
		}, f = async (n = !0) => {
			n && t().setGitSetupLoading(!0);
			try {
				let n = await e.gitSetupStatus();
				return t().setGitSetupStatus(n), pn(n) || (t().setGitPanelOpen(!1), t().setGitChangedCount(0), t().setGitChanges(null)), n;
			} catch (e) {
				let r = {
					ok: !1,
					setup_complete: !1,
					missing: ["setup status"],
					repo_error: N(e)
				};
				return !t().gitSetupStatus || hn(t().gitSetupStatus) ? (t().setGitSetupStatus(r), t().setGitPanelOpen(!1), t().setGitChangedCount(0)) : n && t().showToast(`Git setup refresh failed: ${r.repo_error}`, "error"), r;
			} finally {
				n && t().setGitSetupLoading(!1);
			}
		}, p = async () => {
			if (!pn(t().gitSetupStatus)) {
				t().setGitChangedCount(0);
				return;
			}
			try {
				let n = Hn((await e.gitStatus()).stdout || "").split("\n").filter((e) => e.trim()).map((e) => ({
					path: e.slice(3),
					status: tn(e.slice(0, 2))
				}));
				t().setGitChangedCount(sn(n));
			} catch {
				t().setGitChangedCount(0);
			}
		}, m = (e = 1) => {
			window.setTimeout(() => {
				(async () => {
					if (!hn(t().gitSetupStatus)) return;
					let n = await f(!1);
					await p(), hn(n) && e < 5 && m(e + 1);
				})().catch(() => {
					e < 5 && m(e + 1);
				});
			}, e * 1e3);
		}, h = async (n = !0) => {
			if (!t().gitLoading) {
				if (!pn(t().gitSetupStatus)) {
					t().setGitPanelOpen(!1), t().setGitChanges(null), t().setGitChangedCount(0), n && t().showToast("Set up Git in Settings before reviewing changes", "error");
					return;
				}
				t().setGitLoading(!0);
				try {
					let r;
					try {
						r = await e.gitChanges();
					} catch (e) {
						r = await i(e);
					}
					t().setGitChanges(r), t().setOpenGitDiffKey(null), t().setGitDiscardConfirming(!1), t().setGitChangedCount(sn(r.files || [])), n && t().showToast("Git changes refreshed", "success");
				} catch (e) {
					t().setGitChanges({
						ok: !1,
						changed_count: 0,
						files: [],
						stderr: N(e)
					}), n && t().showToast(`Git reload failed: ${N(e)}`, "error");
				} finally {
					t().setGitLoading(!1);
				}
			}
		}, g = async () => {
			let r = Qn();
			n().showArchived && n().setShowArchived(!1);
			let i = {
				id: r,
				title: "New chat",
				messages: [],
				approvals: [],
				codex_session_id: null,
				status: "idle",
				validation: null,
				archived: !1,
				archived_at: null,
				created_at: Date.now() / 1e3,
				updated_at: Date.now() / 1e3,
				metadata: { optimistic: !0 }
			};
			n().upsertSession(i), n().setActiveId(r);
			try {
				let t = await e.createSession(), i = n().drafts[r], a = n().contextByChatId[r] || [];
				n().deleteSession(r), n().upsertSession(t.session), n().setActiveId(t.session.id), i !== void 0 && n().setDraft(t.session.id, i), a.forEach((e) => n().addContextItem(t.session.id, e));
			} catch (e) {
				n().deleteSession(r), t().showToast(N(e), "error");
			}
		}, _ = (e, t = []) => typeof e == "string" ? Ft(e, t) : e, v = async (r, i) => {
			let o = n().chatsById[r];
			if (!o) return;
			let s = _(i, n().contextByChatId[r] || []);
			if (!s.prompt.trim()) return;
			if (ht(o)) {
				n().enqueueMessage(r, s), Bt("queued") && n().clearContext(r), t().showToast("Message queued", "info");
				return;
			}
			let c = Rt(s.context), l = {
				role: "user",
				content: s.prompt,
				created_at: Date.now() / 1e3,
				metadata: {
					optimistic: !0,
					...s.metadata || {},
					...c.length ? { context: c } : {}
				}
			};
			n().appendMessage(r, l);
			let u = n().chatsById[r] || o;
			n().upsertSession({
				...u,
				status: "running",
				updated_at: Date.now() / 1e3
			});
			try {
				let t = await e.send(r, s);
				n().upsertSession(t.session), Bt("sent") && n().clearContext(r);
			} catch (e) {
				t().showToast(N(e), "error"), await a();
			}
		}, y = async (e, t) => {
			let r = t.trim();
			r && (n().clearQuestionDraft(e), await v(e, `Answer to your question: ${r}`));
		}, b = async (r, i) => {
			let a = n().chatsById[r];
			if (a) {
				n().upsertSession({
					...a,
					archived: i,
					archived_at: i ? Date.now() / 1e3 : null,
					updated_at: Date.now() / 1e3
				}), i || (n().setShowArchived(!1), n().setActiveId(r));
				try {
					let a = await e.archive(r, i);
					a.deleted_session_id ? (n().deleteSession(a.deleted_session_id), t().showToast("Empty chat removed", "success")) : a.session && (n().upsertSession(a.session), t().showToast(i ? "Chat archived" : "Chat restored", "success"));
				} catch (e) {
					n().upsertSession(a), t().showToast(N(e), "error");
				}
			}
		}, x = async (r) => {
			let i = n().chatsById[r];
			if (!i || !i.archived) return;
			let a = String(i.title || "").trim(), o = a ? `Delete "${a}" from the archive? This cannot be undone.` : "Delete this archived chat? This cannot be undone.";
			if (window.confirm(o)) {
				n().deleteSession(r);
				try {
					await e.deleteSession(r), t().showToast("Archived chat deleted", "success");
				} catch (e) {
					n().upsertSession(i), t().showToast(N(e), "error");
				}
			}
		}, S = async () => {
			let r = n(), i = At(r.archivedChatIds, r.chatsById);
			if (!i.length) {
				t().showToast("No archived chats to clean up", "info");
				return;
			}
			if (!window.confirm(`Delete all ${i.length} archived chat${i.length === 1 ? "" : "s"}? This cannot be undone.`)) return;
			let a = i.map((e) => r.chatsById[e]).filter(Boolean);
			t().setArchiveCleanupRunning(!0), i.forEach((e) => n().deleteSession(e));
			try {
				let r = await Promise.allSettled(i.map((t) => e.deleteSession(t))), o = i.filter((e, t) => r[t].status === "rejected");
				if (o.length) throw a.filter((e) => o.includes(e.id)).forEach((e) => n().upsertSession(e)), Error(`${o.length} archived chat${o.length === 1 ? "" : "s"} could not be deleted`);
				t().showToast(`Deleted ${i.length} archived chat${i.length === 1 ? "" : "s"}`, "success");
			} catch (e) {
				t().showToast(N(e), "error");
			} finally {
				t().setArchiveCleanupRunning(!1);
			}
		}, C = async (r) => {
			let i = (n().queuesByChatId[r] || [])[0];
			if (!(!i || n().queueStartsByChatId[r])) {
				n().setQueueStarting(r, !0);
				try {
					let a = n().chatsById[r], o = Ft(i.prompt || i.content, i.context || [], {
						runPrompt: i.runPrompt,
						metadata: i.metadata,
						runSettings: i.runSettings
					}), s = a && (ht(a) || rt(a)) ? await e.steer(r, o) : await e.send(r, o);
					n().removeQueuedMessage(r, i.id), n().upsertSession(s.session), t().showToast("Started queued message", "success");
				} catch (e) {
					t().showToast(N(e), "error");
				} finally {
					n().setQueueStarting(r, !1);
				}
			}
		}, w = async (n = "Restart Home Assistant Core now?") => {
			if (window.confirm(n)) {
				t().setCoreActionRunning(!0);
				try {
					let n = await e.coreRestart();
					if (!n?.ok) throw Error(n?.error || "Home Assistant restart failed");
					t().showToast("Home Assistant restart requested", "success");
				} finally {
					t().setCoreActionRunning(!1);
				}
			}
		};
		return {
			loadInitial: async () => {
				let e = await Promise.all([
					a(),
					o(),
					l(),
					s(),
					f(!1)
				]);
				await p();
				let t = e[4];
				hn(t) && m();
			},
			loadSessions: a,
			loadStatus: o,
			loadAccountStatus: s,
			loadSettings: l,
			loadBridgeLog: u,
			clearBridgeLog: d,
			loadGitSetupStatus: f,
			loadGitChanges: h,
			createSession: g,
			sendPrompt: v,
			answerQuestion: y,
			startRename: (e) => {
				let r = n().chatsById[e];
				t().setRenaming(e, r?.title || "");
			},
			saveRename: async (r) => {
				let i = t().renameTitle.trim();
				if (!i) return;
				let a = await e.rename(r, i);
				t().setRenaming(null), n().upsertSession(a.session), t().showToast("Chat renamed", "success");
			},
			archiveSession: b,
			deleteArchivedSession: x,
			cleanupArchivedSessions: S,
			cancelSession: async (r) => {
				let i = await e.cancel(r);
				n().upsertSession(i.session), t().showToast("Run canceled", "success");
			},
			retryContinueSession: async (r) => {
				let i = await e.retryContinue(r);
				n().upsertSession(i.session), t().showToast("Retrying chat", "info");
			},
			editQueuedMessage: (e, t) => {
				let r = (n().queuesByChatId[e] || []).find((e) => e.id === t);
				r && (n().removeQueuedMessage(e, t), n().setDraft(e, r.content), n().setContextItems(e, r.context || []));
			},
			clearQueuedMessage: (e, t) => n().removeQueuedMessage(e, t),
			steerQueuedMessage: async (r, i) => {
				let a = (n().queuesByChatId[r] || []).find((e) => e.id === i);
				if (!a) return;
				let o = Ft(a.prompt || a.content, a.context || [], {
					runPrompt: a.runPrompt,
					metadata: a.metadata,
					runSettings: a.runSettings
				}), s = await e.steer(r, o);
				n().removeQueuedMessage(r, i), n().upsertSession(s.session), t().showToast("Steering queued for this run", "success");
			},
			respondApproval: async (r, i, a, o) => {
				let s = await e.respondApproval(r, i, a);
				n().upsertSession(s.session), t().showToast(o || (a ? "Action approved" : "Action canceled"), "success");
			},
			respondRunPlan: async (r, i, a) => {
				let o = n().chatsById[r], s = a === "revise" ? Zn(o) : "";
				if (a === "approve" && o) {
					let e = o.metadata?.pending_plan;
					n().upsertSession({
						...o,
						metadata: {
							...o.metadata,
							pending_plan: typeof e == "object" && e ? {
								...e,
								status: "approved"
							} : e
						}
					});
				}
				try {
					let o = await e.respondRunPlan(r, i, a);
					n().upsertSession(o.session), s && n().setDraft(r, s), t().showToast(a === "approve" ? "Run plan approved" : a === "revise" ? "Prompt ready to revise" : "Run plan canceled", "success");
				} catch (e) {
					throw a === "approve" && o && n().upsertSession(o), e;
				}
			},
			updateSettings: async (n) => {
				t().setSettingsSaving(!0);
				try {
					let r = await e.updateSettings(n);
					t().setSettings(On(r.settings)), t().showToast("Settings saved", "success");
				} finally {
					t().setSettingsSaving(!1);
				}
			},
			updateSessionRunSettings: async (r, i) => {
				let a = n().chatsById[r];
				if (!a) return;
				let o = Dn(i, t().settings.defaults), s = JSON.stringify(o);
				n().upsertSession({
					...a,
					metadata: {
						...a.metadata || {},
						run_settings: o
					},
					updated_at: Date.now() / 1e3
				});
				try {
					let t = await e.updateSessionRunSettings(r, o);
					tr(n().chatsById[r]) === s && n().upsertSession(t.session);
				} catch (e) {
					throw tr(n().chatsById[r]) === s && n().upsertSession(a), e;
				}
			},
			rollbackRun: async (n, r) => {
				let i = await e.rollbackRun(n, r);
				if (await a(), pn(t().gitSetupStatus) && await h(!1), !i.ok) {
					t().showToast(i.reason || "Rollback needs manual review", "error");
					return;
				}
				t().showToast("Run rolled back", "success");
			},
			scheduleRestartAfterChats: () => {
				n().setScheduledRestart(!0), n().bumpRestartToast(), t().showToast("Restart scheduled after chats complete", "success");
			},
			cancelScheduledRestart: () => {
				n().setScheduledRestart(!1), t().showToast("Scheduled restart canceled", "success");
			},
			maybeRunScheduledRestart: async () => {
				let t = n();
				if (!t.scheduledRestart || (Object.values(t.chatsById).forEach((e) => {
					(t.queuesByChatId[e.id] || []).length && !ht(e) && !nt(e).length && !pt(e) && !mt(e) && C(e.id);
				}), Object.values(t.chatsById).some((e) => (t.queuesByChatId[e.id] || []).length || t.queueStartsByChatId[e.id] || ht(e) || nt(e).length || pt(e) || mt(e)))) return;
				let r = t.chatsById ? Object.values(t.chatsById).flatMap((e) => (e.approvals || []).filter((e) => e.status === "pending" && e.command === "ha core restart").map((t) => ({
					session: e,
					approval: t
				})))[0] : null;
				if (!r) {
					n().setScheduledRestart(!1);
					return;
				}
				n().setScheduledRestart(!1);
				let i = await e.respondApproval(r.session.id, r.approval.id, !0);
				n().upsertSession(i.session);
			},
			toggleGitPanel: async () => {
				if (!pn(t().gitSetupStatus) && (await f(), !pn(t().gitSetupStatus))) {
					t().setSettingsTab("git"), t().setShowStatusDebug(!0), t().showToast("Set up Git before opening the review panel", "error");
					return;
				}
				let e = !t().gitPanelOpen;
				t().setGitPanelOpen(e), e && !t().gitChanges && await h(!1);
			},
			generateGitSetupKey: async () => {
				t().setGitSetupActionRunning(!0), t().setGitSetupResult(null);
				try {
					let n = await e.gitSetupGenerateKey();
					if (t().setGitSetupResult(n), n.status && t().setGitSetupStatus(n.status), !n.ok) throw Error(er(n, "SSH key generation failed"));
					t().showToast("Git SSH key ready", "success");
				} finally {
					t().setGitSetupActionRunning(!1);
				}
			},
			saveGitSetupRemote: async (n) => {
				let r = n.trim();
				if (!r) {
					t().showToast("Remote URL is required", "error");
					return;
				}
				t().setGitSetupActionRunning(!0), t().setGitSetupResult(null);
				try {
					let n = await e.gitSetupSetRemote(r);
					if (t().setGitSetupResult(n), n.status && t().setGitSetupStatus(n.status), !n.ok) throw Error(er(n, "Remote setup failed"));
					t().showToast("Git remote linked", "success"), await p();
				} finally {
					t().setGitSetupActionRunning(!1);
				}
			},
			pullGitSetupRemote: async () => {
				t().setGitSetupActionRunning(!0), t().setGitSetupResult(null);
				try {
					let n = await e.gitSetupPull();
					if (t().setGitSetupResult(n), n.status && t().setGitSetupStatus(n.status), !n.ok) throw Error(er(n, "Git pull failed"));
					let r = n.step === "up_to_date";
					t().showToast(r ? "Git is already up to date" : "Git pull completed", "success"), await p(), r || await w("Git pull completed. Restart Home Assistant Core now?");
				} finally {
					t().setGitSetupActionRunning(!1);
				}
			},
			changeGitSetupBranch: async (n) => {
				let r = n.trim();
				if (!r) {
					t().showToast("Branch name is required", "error");
					return;
				}
				t().setGitSetupActionRunning(!0), t().setGitSetupResult(null);
				try {
					let n = await e.gitSetupChangeBranch(r);
					if (t().setGitSetupResult(n), n.status && t().setGitSetupStatus(n.status), !n.ok) throw Error(er(n, "Branch change failed"));
					await f(!1), t().showToast("Git branch changed", "success"), await p(), await w("Git branch changed. Restart Home Assistant Core now?");
				} finally {
					t().setGitSetupActionRunning(!1);
				}
			},
			checkoutGitSetupCommit: async (n) => {
				let r = n.trim();
				if (!r) {
					t().showToast("Commit is required", "error");
					return;
				}
				t().setGitSetupActionRunning(!0), t().setGitSetupResult(null);
				try {
					let n = await e.gitSetupCheckoutCommit(r);
					if (t().setGitSetupResult(n), n.status && t().setGitSetupStatus(n.status), !n.ok) throw Error(er(n, "Commit restore failed"));
					t().showToast("Git commit restored", "success"), await p(), await w("Git commit restored. Restart Home Assistant Core now?");
				} finally {
					t().setGitSetupActionRunning(!1);
				}
			},
			showMoreGitFiles: () => t().showMoreGitFiles(),
			toggleGitFileDiff: async (n, r = "") => {
				let i = nn(n, r);
				if (t().openGitDiffKey === i) {
					t().setOpenGitDiffKey(null);
					return;
				}
				if (t().setOpenGitDiffKey(i), !(t().gitFileDiffs[i] || t().gitFileDiffLoading[i])) {
					t().setGitFileDiffLoading(i, !0);
					try {
						t().setGitFileDiff(i, await e.gitFileDiff(n, r));
					} catch (e) {
						t().setGitFileDiff(i, {
							ok: !1,
							path: n,
							old_path: r,
							patch: "",
							stderr: N(e)
						});
					} finally {
						t().setGitFileDiffLoading(i, !1);
					}
				}
			},
			commitAndPush: async (n) => {
				let r = n.trim(), i = ln(t().gitChanges?.files || [], t().gitSelection);
				if (!r) {
					t().showToast("Commit message is required", "error");
					return;
				}
				if (!i.length) {
					t().setGitOperationResult({
						ok: !1,
						stderr: "No files selected."
					}), t().showToast("Select at least one file", "error");
					return;
				}
				t().setCommitRunning(!0), t().setGitOperationResult(null);
				try {
					let n = await e.commitPush(r, i);
					if (t().setGitOperationResult(n), !n.ok) throw Error($n(n, "Commit and push failed"));
					t().setCommitMessage(""), t().setGitDiscardConfirming(!1), t().showToast("Changes committed and pushed", "success"), await h(!1), t().setGitOperationResult(n);
				} catch (e) {
					throw t().gitOperationResult || t().setGitOperationResult({
						ok: !1,
						stderr: N(e)
					}), e;
				} finally {
					t().setCommitRunning(!1);
				}
			},
			discardSelectedGitFiles: async () => {
				let n = ln(t().gitChanges?.files || [], t().gitSelection);
				if (!n.length) {
					t().setGitOperationResult({
						ok: !1,
						stderr: "No files selected."
					}), t().showToast("Select at least one file", "error");
					return;
				}
				t().setDiscardRunning(!0), t().setGitOperationResult(null);
				try {
					let r = await e.discard(n);
					if (t().setGitOperationResult(r), !r.ok) throw Error($n(r, "Discard failed"));
					t().setGitDiscardConfirming(!1), t().showToast("Selected changes discarded", "success"), await h(!1), t().setGitOperationResult(r);
				} catch (e) {
					throw t().gitOperationResult || t().setGitOperationResult({
						ok: !1,
						stderr: N(e)
					}), e;
				} finally {
					t().setDiscardRunning(!1);
				}
			},
			runValidation: async (t) => {
				if (!n().validationRunning) {
					n().setValidationRunning(!0);
					try {
						let r = await e.runValidation(t);
						n().setValidation(r.validation);
					} catch (e) {
						throw n().setValidation({
							status: "failed",
							stderr: N(e),
							created_at: Date.now() / 1e3
						}), e;
					} finally {
						n().setValidationRunning(!1);
					}
				}
			},
			reloadValidationDomains: async (n) => {
				if (!(await e.reloadValidationDomains(n)).ok) throw Error("Reload failed");
				t().showToast(`Reloaded ${n.join(", ")}`, "success");
			},
			startOrRestartBridge: async () => {
				let n = t().status.runtime?.bridge_available === !0;
				t().setBridgeActionRunning(!0);
				try {
					let r = await e.bridgeRestart();
					if (!r?.ok) throw Error(r?.error || "Bridge helper failed");
					await Promise.all([o(), u()]), t().showToast(n ? "Bridge restarted" : "Bridge started", "success");
				} catch (e) {
					t().showToast(N(e), "error");
				} finally {
					t().setBridgeActionRunning(!1);
				}
			},
			restartHomeAssistant: async () => {
				await w();
			},
			startDeviceLogin: async () => {
				t().setAccountActionRunning(!0);
				try {
					let n = await e.accountDeviceLoginStart();
					if (t().setDeviceLogin(n), n.status === "pending") c(), t().showToast("Device login started", "info");
					else if (n.status === "succeeded") await Promise.all([s(), o()]), t().showToast("Codex account connected", "success");
					else if (!n.ok) throw Error(n.error || "Device login failed");
				} finally {
					t().setAccountActionRunning(!1);
				}
			},
			cancelDeviceLogin: async () => {
				let n = await e.accountDeviceLoginCancel();
				r !== null && window.clearInterval(r), r = null, t().setDeviceLogin(n), t().showToast("Device login canceled", "success");
			},
			logoutAccount: async () => {
				t().setAccountActionRunning(!0);
				try {
					let n = await e.accountLogout();
					if (!n.ok) throw Error(n.error || "Logout failed");
					t().setAccount(n.account || await e.accountStatus()), t().setDeviceLogin(null), await o(), t().showToast("Codex account logged out", "success");
				} finally {
					t().setAccountActionRunning(!1);
				}
			}
		};
	}, [e]);
}
//#endregion
//#region node_modules/react-virtuoso/dist/index.mjs
var rr = /* @__PURE__ */ c(m(), 1), ir = 0, ar = 1, or = 2, sr = 4;
function cr(e) {
	return () => e;
}
function lr(e) {
	e();
}
function ur(e, t) {
	return (n) => e(t(n));
}
function dr(e, t) {
	return () => e(t);
}
function fr(e, t) {
	return (n) => e(t, n);
}
function pr(e) {
	return e !== void 0;
}
function mr(...e) {
	return () => {
		e.map(lr);
	};
}
function hr() {}
function gr(e, t) {
	return t(e), e;
}
function _r(e, t) {
	return t(e);
}
function vr(...e) {
	return e;
}
function yr(e, t) {
	return e(ar, t);
}
function P(e, t) {
	e(ir, t);
}
function br(e) {
	e(or);
}
function xr(e) {
	return e(sr);
}
function F(e, t) {
	return yr(e, fr(t, ir));
}
function Sr(e, t) {
	let n = e(ar, (e) => {
		n(), t(e);
	});
	return n;
}
function Cr(e) {
	let t, n;
	return (r) => (i) => {
		t = i, n && clearTimeout(n), n = setTimeout(() => {
			r(t);
		}, e);
	};
}
function wr(e, t) {
	return e === t;
}
function I(e = wr) {
	let t;
	return (n) => (r) => {
		e(t, r) || (t = r, n(r));
	};
}
function L(e) {
	return (t) => (n) => {
		e(n) && t(n);
	};
}
function R(e) {
	return (t) => ur(t, e);
}
function Tr(e) {
	return (t) => () => {
		t(e);
	};
}
function z(e, ...t) {
	let n = kr(...t);
	return ((t, r) => {
		switch (t) {
			case or:
				br(e);
				return;
			case ar: return yr(e, n(r));
		}
	});
}
function Er(e, t) {
	return (n) => (r) => {
		n(t = e(t, r));
	};
}
function Dr(e) {
	return (t) => (n) => {
		e > 0 ? e-- : t(n);
	};
}
function Or(e) {
	let t = null, n;
	return (r) => (i) => {
		t = i, !n && (n = setTimeout(() => {
			n = void 0, r(t);
		}, e));
	};
}
function B(...e) {
	let t = Array(e.length), n = 0, r = null, i = 2 ** e.length - 1;
	return e.forEach((e, a) => {
		let o = 2 ** a;
		yr(e, (e) => {
			let s = n;
			n |= o, t[a] = e, s !== i && n === i && r && (r(), r = null);
		});
	}), (e) => (a) => {
		let o = () => {
			e([a].concat(t));
		};
		n === i ? o() : r = o;
	};
}
function kr(...e) {
	return (t) => e.reduceRight(_r, t);
}
function Ar(e) {
	let t, n, r = () => t?.();
	return function(i, a) {
		switch (i) {
			case ar: return a ? n === a ? void 0 : (r(), n = a, t = yr(e, a), t) : (r(), hr);
			case or:
				r(), n = null;
				return;
		}
	};
}
function V(e) {
	let t = e, n = H();
	return ((e, r) => {
		switch (e) {
			case ir:
				t = r;
				break;
			case ar:
				r(t);
				break;
			case sr: return t;
		}
		return n(e, r);
	});
}
function jr(e, t) {
	return gr(V(t), (t) => F(e, t));
}
function H() {
	let e = [];
	return ((t, n) => {
		switch (t) {
			case ir:
				e.slice().forEach((e) => {
					e(n);
				});
				return;
			case or:
				e.splice(0, e.length);
				return;
			case ar: return e.push(n), () => {
				let t = e.indexOf(n);
				t > -1 && e.splice(t, 1);
			};
		}
	});
}
function Mr(e) {
	return gr(H(), (t) => F(e, t));
}
function U(e, t = [], { singleton: n } = { singleton: !0 }) {
	return {
		constructor: e,
		dependencies: t,
		id: Nr(),
		singleton: n
	};
}
var Nr = () => Symbol();
function Pr(e) {
	let t = /* @__PURE__ */ new Map(), n = ({ constructor: e, dependencies: r, id: i, singleton: a }) => {
		if (a && t.has(i)) return t.get(i);
		let o = e(r.map((e) => n(e)));
		return a && t.set(i, o), o;
	};
	return n(e);
}
function Fr(...e) {
	let t = H(), n = Array(e.length), r = 0, i = 2 ** e.length - 1;
	return e.forEach((e, a) => {
		let o = 2 ** a;
		yr(e, (e) => {
			n[a] = e, r |= o, r === i && P(t, n);
		});
	}), function(e, a) {
		switch (e) {
			case or:
				br(t);
				return;
			case ar: return r === i && a(n), yr(t, a);
		}
	};
}
function W(e, t = wr) {
	return z(e, I(t));
}
function Ir(...e) {
	return function(t, n) {
		switch (t) {
			case or: return;
			case ar: return mr(...e.map((e) => yr(e, n)));
		}
	};
}
var Lr = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3
}, Rr = {
	[Lr.DEBUG]: "debug",
	[Lr.ERROR]: "error",
	[Lr.INFO]: "log",
	[Lr.WARN]: "warn"
}, zr = () => typeof globalThis > "u" ? window : globalThis, Br = U(() => {
	let e = V(Lr.ERROR);
	return {
		log: V((t, n, r = Lr.INFO) => {
			r >= (zr().VIRTUOSO_LOG_LEVEL ?? xr(e)) && console[Rr[r]]("%creact-virtuoso: %c%s %o", "color: #0253b3; font-weight: bold", "color: initial", t, n);
		}),
		logLevel: e
	};
}, [], { singleton: !0 }), Vr = /* @__PURE__ */ new WeakMap();
function Hr(e) {
	return "self" in e ? e.document.documentElement : e;
}
function Ur(e) {
	let t = Hr(e), n = Vr.get(t);
	if (n !== void 0) return n;
	let r = t.ownerDocument.defaultView.getComputedStyle(t).direction === "rtl";
	return Vr.set(t, r), r;
}
function Wr(e) {
	Vr.delete(Hr(e));
}
function Gr(e, t) {
	return Ur(e) ? -t : t;
}
var Kr = Gr;
function qr(e, t) {
	return Gr(e, t);
}
function Jr(e, t, n) {
	return Yr(e, t, n).callbackRef;
}
function Yr(e, t, n) {
	let r = k.useRef(null), i = (e) => {}, a = k.useMemo(() => typeof ResizeObserver < "u" ? new ResizeObserver((t) => {
		let r = () => {
			let n = t[0].target;
			n.offsetParent !== null && e(n);
		};
		n ? r() : requestAnimationFrame(r);
	}) : null, [e, n]);
	return i = (e) => {
		e && t ? (a?.observe(e), r.current = e) : (r.current && a?.unobserve(r.current), r.current = null);
	}, {
		callbackRef: i,
		ref: r
	};
}
function Xr(e, t, n, r, i, a, o, s, c) {
	return Yr(k.useCallback((n) => {
		let c = Zr(n.children, t, s ? "offsetWidth" : "offsetHeight", i), l = n.parentElement;
		for (; l.dataset.virtuosoScroller === void 0;) l = l.parentElement;
		let u = l.lastElementChild.dataset.viewportType === "window", d;
		u && (d = l.ownerDocument.defaultView);
		let f = o ? s ? o.scrollWidth : o.scrollHeight : u ? s ? d.document.documentElement.scrollWidth : d.document.documentElement.scrollHeight : s ? l.scrollWidth : l.scrollHeight, p = o ? s ? o.offsetWidth : o.offsetHeight : u ? s ? d.innerWidth : d.innerHeight : s ? l.offsetWidth : l.offsetHeight, m = o ? s ? Kr(o, o.scrollLeft) : o.scrollTop : u ? s ? Kr(d, d.scrollX || d.document.documentElement.scrollLeft) : d.scrollY || d.document.documentElement.scrollTop : s ? Kr(l, l.scrollLeft) : l.scrollTop;
		r({
			scrollHeight: f,
			scrollTop: Math.max(m, 0),
			viewportHeight: p
		}), a?.(s ? Qr("column-gap", getComputedStyle(n).columnGap, i) : Qr("row-gap", getComputedStyle(n).rowGap, i)), c !== null && e(c);
	}, [
		e,
		t,
		i,
		a,
		o,
		r,
		s
	]), n, c);
}
function Zr(e, t, n, r) {
	let i = e.length;
	if (i === 0) return null;
	let a = [];
	for (let o = 0; o < i; o++) {
		let i = e.item(o);
		if (i.dataset.index === void 0) continue;
		let s = parseInt(i.dataset.index), c = parseFloat(i.dataset.knownSize), l = t(i, n);
		if (l === 0 && r("Zero-sized element, this should not happen", { child: i }, Lr.ERROR), l === c) continue;
		let u = a[a.length - 1];
		a.length === 0 || u.size !== l || u.endIndex !== s - 1 ? a.push({
			endIndex: s,
			size: l,
			startIndex: s
		}) : a[a.length - 1].endIndex++;
	}
	return a;
}
function Qr(e, t, n) {
	return t !== "normal" && t?.endsWith("px") !== !0 && n(`${e} was not resolved to pixel value correctly`, t, Lr.WARN), t === "normal" ? 0 : parseInt(t ?? "0", 10);
}
function $r(e, t, n) {
	let r = k.useRef(null), i = k.useCallback((n) => {
		if (!n?.offsetParent) return;
		let i = n.getBoundingClientRect(), a = i.width, s, c;
		if (t) {
			let e = t.getBoundingClientRect(), n = i.top - e.top;
			c = e.height - Math.max(0, n), s = n + t.scrollTop;
		} else {
			let e = o.current.ownerDocument.defaultView;
			c = e.innerHeight - Math.max(0, i.top), s = i.top + e.scrollY;
		}
		r.current = {
			listHeight: i.height,
			offsetTop: s,
			visibleHeight: c,
			visibleWidth: a
		}, e(r.current);
	}, [e, t]), { callbackRef: a, ref: o } = Yr(i, !0, n), s = k.useCallback(() => {
		i(o.current);
	}, [i, o]);
	return k.useEffect(() => {
		if (t) {
			t.addEventListener("scroll", s);
			let e = new ResizeObserver(() => {
				requestAnimationFrame(s);
			});
			return e.observe(t), () => {
				t.removeEventListener("scroll", s), e.unobserve(t);
			};
		}
		let e = o.current?.ownerDocument.defaultView;
		return e?.addEventListener("scroll", s), e?.addEventListener("resize", s), () => {
			e?.removeEventListener("scroll", s), e?.removeEventListener("resize", s);
		};
	}, [
		s,
		t,
		o
	]), a;
}
var ei = U(() => {
	let e = H(), t = H(), n = V(0), r = H(), i = V(0), a = H(), o = H(), s = V(0), c = V(0), l = V(0), u = V(0), d = H(), f = H(), p = V(!1), m = V(!1), h = V(!1);
	return F(z(e, R(({ scrollTop: e }) => e)), t), F(z(e, R(({ scrollHeight: e }) => e)), o), F(t, i), {
		deviation: n,
		fixedFooterHeight: l,
		fixedHeaderHeight: c,
		footerHeight: u,
		headerHeight: s,
		horizontalDirection: m,
		scrollBy: f,
		scrollContainerState: e,
		scrollHeight: o,
		scrollingInProgress: p,
		scrollTo: d,
		scrollTop: t,
		skipAnimationFrameInResizeObserver: h,
		smoothScrollTargetReached: r,
		statefulScrollTop: i,
		viewportHeight: a
	};
}, [], { singleton: !0 }), ti = { lvl: 0 };
function ni(e, t) {
	let n = e.length;
	if (n === 0) return [];
	let { index: r, value: i } = t(e[0]), a = [];
	for (let o = 1; o < n; o++) {
		let { index: n, value: s } = t(e[o]);
		a.push({
			end: n - 1,
			start: r,
			value: i
		}), r = n, i = s;
	}
	return a.push({
		end: Infinity,
		start: r,
		value: i
	}), a;
}
function ri(e) {
	return e === ti;
}
function ii(e, t) {
	if (!ri(e)) return t === e.k ? e.v : t < e.k ? ii(e.l, t) : ii(e.r, t);
}
function ai(e, t, n = "k") {
	if (ri(e)) return [-Infinity, void 0];
	if (Number(e[n]) === t) return [e.k, e.v];
	if (Number(e[n]) < t) {
		let r = ai(e.r, t, n);
		return r[0] === -Infinity ? [e.k, e.v] : r;
	}
	return ai(e.l, t, n);
}
function oi(e, t, n) {
	return ri(e) ? _i(t, n, 1) : t === e.k ? pi(e, {
		k: t,
		v: n
	}) : t < e.k ? vi(pi(e, { l: oi(e.l, t, n) })) : vi(pi(e, { r: oi(e.r, t, n) }));
}
function si() {
	return ti;
}
function ci(e, t, n) {
	if (ri(e)) return [];
	let r = ai(e, t)[0];
	return xi(di(e, r, n));
}
function li(e, t) {
	if (ri(e)) return ti;
	let { k: n, l: r, r: i } = e;
	if (t === n) {
		if (ri(r)) return i;
		if (ri(i)) return r;
		let [t, n] = gi(r);
		return fi(pi(e, {
			k: t,
			l: mi(r),
			v: n
		}));
	}
	return fi(t < n ? pi(e, { l: li(r, t) }) : pi(e, { r: li(i, t) }));
}
function ui(e) {
	return ri(e) ? [] : [
		...ui(e.l),
		{
			k: e.k,
			v: e.v
		},
		...ui(e.r)
	];
}
function di(e, t, n) {
	if (ri(e)) return [];
	let { k: r, l: i, r: a, v: o } = e, s = [];
	return r > t && (s = s.concat(di(i, t, n))), r >= t && r <= n && s.push({
		k: r,
		v: o
	}), r <= n && (s = s.concat(di(a, t, n))), s;
}
function fi(e) {
	let { l: t, lvl: n, r } = e;
	if (r.lvl >= n - 1 && t.lvl >= n - 1) return e;
	if (n > r.lvl + 1) {
		if (hi(t)) return yi(pi(e, { lvl: n - 1 }));
		if (!ri(t) && !ri(t.r)) return pi(t.r, {
			l: pi(t, { r: t.r.l }),
			lvl: n,
			r: pi(e, {
				l: t.r.r,
				lvl: n - 1
			})
		});
		throw Error("Unexpected empty nodes");
	}
	if (hi(e)) return bi(pi(e, { lvl: n - 1 }));
	if (!ri(r) && !ri(r.l)) {
		let t = r.l, i = hi(t) ? r.lvl - 1 : r.lvl;
		return pi(t, {
			l: pi(e, {
				lvl: n - 1,
				r: t.l
			}),
			lvl: t.lvl + 1,
			r: bi(pi(r, {
				l: t.r,
				lvl: i
			}))
		});
	}
	throw Error("Unexpected empty nodes");
}
function pi(e, t) {
	return _i(t.k === void 0 ? e.k : t.k, t.v === void 0 ? e.v : t.v, t.lvl === void 0 ? e.lvl : t.lvl, t.l === void 0 ? e.l : t.l, t.r === void 0 ? e.r : t.r);
}
function mi(e) {
	return ri(e.r) ? e.l : fi(pi(e, { r: mi(e.r) }));
}
function hi(e) {
	return ri(e) || e.lvl > e.r.lvl;
}
function gi(e) {
	return ri(e.r) ? [e.k, e.v] : gi(e.r);
}
function _i(e, t, n, r = ti, i = ti) {
	return {
		k: e,
		l: r,
		lvl: n,
		r: i,
		v: t
	};
}
function vi(e) {
	return bi(yi(e));
}
function yi(e) {
	let { l: t } = e;
	return !ri(t) && t.lvl === e.lvl ? pi(t, { r: pi(e, { l: t.r }) }) : e;
}
function bi(e) {
	let { lvl: t, r: n } = e;
	return !ri(n) && !ri(n.r) && n.lvl === t && n.r.lvl === t ? pi(n, {
		l: pi(e, { r: n.l }),
		lvl: t + 1
	}) : e;
}
function xi(e) {
	return ni(e, ({ k: e, v: t }) => ({
		index: e,
		value: t
	}));
}
function Si(e, t) {
	return !!(e && e.startIndex === t.startIndex && e.endIndex === t.endIndex);
}
function Ci(e, t) {
	return !!(e && e[0] === t[0] && e[1] === t[1]);
}
var wi = U(() => ({ recalcInProgress: V(!1) }), [], { singleton: !0 });
function Ti(e, t, n) {
	return e[Ei(e, t, n)];
}
function Ei(e, t, n, r = 0) {
	let i = e.length - 1;
	for (; r <= i;) {
		let a = Math.floor((r + i) / 2), o = e[a], s = n(o, t);
		if (s === 0) return a;
		if (s === -1) {
			if (i - r < 2) return a - 1;
			i = a - 1;
		} else {
			if (i === r) return a;
			r = a + 1;
		}
	}
	throw Error(`Failed binary finding record in array - ${e.join(",")}, searched for ${t}`);
}
function Di(e, t, n, r) {
	let i = Ei(e, t, r), a = Ei(e, n, r, i);
	return e.slice(i, a + 1);
}
function G(e, t) {
	return Math.round(e.getBoundingClientRect()[t]);
}
function K(e) {
	return !ri(e.groupOffsetTree);
}
function Oi({ index: e }, t) {
	return t === e ? 0 : t < e ? -1 : 1;
}
function ki() {
	return {
		groupIndices: [],
		groupOffsetTree: si(),
		lastIndex: 0,
		lastOffset: 0,
		lastSize: 0,
		offsetTree: [],
		sizeTree: si()
	};
}
function Ai(e, t) {
	let n = ri(e) ? 0 : Infinity;
	for (let r of t) {
		let { endIndex: t, size: i, startIndex: a } = r;
		if (n = Math.min(n, a), ri(e)) {
			e = oi(e, 0, i);
			continue;
		}
		let o = ci(e, a - 1, t + 1);
		if (o.some(Hi(r))) continue;
		let s = !1, c = !1;
		for (let { end: n, start: r, value: a } of o) s ? (t >= r || i === a) && (e = li(e, r)) : (c = a !== i, s = !0), n > t && t >= r && a !== i && (e = oi(e, t + 1, a));
		c && (e = oi(e, a, i));
	}
	return [e, n];
}
function ji(e) {
	return typeof e.groupIndex < "u";
}
function Mi({ offset: e }, t) {
	return t === e ? 0 : t < e ? -1 : 1;
}
function Ni(e, t, n) {
	if (t.length === 0) return 0;
	let { index: r, offset: i, size: a } = Ti(t, e, Oi), o = e - r, s = a * o + (o - 1) * n + i;
	return s > 0 ? s + n : s;
}
function Pi(e, t) {
	if (!K(t)) return e;
	let n = 0;
	for (; t.groupIndices[n] <= e + n;) n++;
	return e + n;
}
function Fi(e, t, n) {
	if (ji(e)) return t.groupIndices[e.groupIndex] + 1;
	let r = Pi(e.index === "LAST" ? n : e.index, t);
	return r = Math.max(0, r, Math.min(n, r)), r;
}
function Ii(e, t, n, r = 0) {
	return r > 0 && (t = Math.max(t, Ti(e, r, Oi).offset)), ni(Di(e, t, n, Mi), Vi);
}
function Li(e, [t, n, r, i]) {
	t.length > 0 && r("received item sizes", t, Lr.DEBUG);
	let a = e.sizeTree, o = a, s = 0;
	if (n.length > 0 && ri(a) && t.length === 2) {
		let e = t[0].size, r = t[1].size;
		o = n.reduce((t, n) => oi(oi(t, n, e), n + 1, r), o);
	} else [o, s] = Ai(o, t);
	if (o === a) return e;
	let { lastIndex: c, lastOffset: l, lastSize: u, offsetTree: d } = Bi(e.offsetTree, s, o, i);
	return {
		groupIndices: n,
		groupOffsetTree: n.reduce((e, t) => oi(e, t, Ni(t, d, i)), si()),
		lastIndex: c,
		lastOffset: l,
		lastSize: u,
		offsetTree: d,
		sizeTree: o
	};
}
function Ri(e) {
	return ui(e).map(({ k: e, v: t }, n, r) => {
		let i = r[n + 1];
		return {
			endIndex: i === void 0 ? Infinity : i.k - 1,
			size: t,
			startIndex: e
		};
	});
}
function zi(e, t) {
	let n = 0, r = 0;
	for (; n < e;) n += t[r + 1] - t[r] - 1, r++;
	return r - (n === e ? 0 : 1);
}
function Bi(e, t, n, r) {
	let i = e, a = 0, o = 0, s = 0, c = 0;
	if (t !== 0) {
		c = Ei(i, t - 1, Oi), s = i[c].offset;
		let e = ai(n, t - 1);
		a = e[0], o = e[1], i.length && i[c].size === ai(n, t)[1] && --c, i = i.slice(0, c + 1);
	} else i = [];
	for (let { start: e, value: c } of ci(n, t, Infinity)) {
		let t = e - a, n = t * o + s + t * r;
		i.push({
			index: e,
			offset: n,
			size: c
		}), a = e, s = n, o = c;
	}
	return {
		lastIndex: a,
		lastOffset: s,
		lastSize: o,
		offsetTree: i
	};
}
function Vi(e) {
	return {
		index: e.index,
		value: e
	};
}
function Hi(e) {
	let { endIndex: t, size: n, startIndex: r } = e;
	return (e) => e.start === r && (e.end === t || e.end === Infinity) && e.value === n;
}
var Ui = {
	offsetHeight: "height",
	offsetWidth: "width"
}, Wi = U(([{ log: e }, { recalcInProgress: t }]) => {
	let n = H(), r = H(), i = jr(r, 0), a = H(), o = H(), s = V(0), c = V([]), l = V(void 0), u = V(void 0), d = V(void 0), f = V(void 0), p = V((e, t) => G(e, Ui[t])), m = V(void 0), h = V(0), g = ki(), _ = jr(z(n, B(c, e, h), Er(Li, g), I()), g), v = jr(z(c, I(), Er((e, t) => ({
		current: t,
		prev: e.current
	}), {
		current: [],
		prev: []
	}), R(({ prev: e }) => e)), []);
	F(z(c, L((e) => e.length > 0), B(_, h), R(([e, t, n]) => {
		let r = e.reduce((e, r, i) => oi(e, r, Ni(r, t.offsetTree, n) || i), si());
		return {
			...t,
			groupIndices: e,
			groupOffsetTree: r
		};
	})), _), F(z(r, B(_), L(([e, { lastIndex: t }]) => e < t), R(([e, { lastIndex: t, lastSize: n }]) => [{
		endIndex: t,
		size: n,
		startIndex: e
	}])), n), F(l, u);
	let y = jr(z(l, R((e) => e === void 0)), !0);
	F(z(u, L((e) => e !== void 0 && ri(xr(_).sizeTree)), R((e) => {
		let t = xr(d), n = xr(c).length > 0;
		return t !== void 0 && t !== 0 ? n ? [{
			endIndex: 0,
			size: t,
			startIndex: 0
		}, {
			endIndex: 1,
			size: e,
			startIndex: 1
		}] : [] : [{
			endIndex: 0,
			size: e,
			startIndex: 0
		}];
	})), n), F(z(f, L((e) => e !== void 0 && e.length > 0 && ri(xr(_).sizeTree)), R((e) => {
		let t = [], n = e[0], r = 0;
		for (let i = 1; i < e.length; i++) {
			let a = e[i];
			a !== n && (t.push({
				endIndex: i - 1,
				size: n,
				startIndex: r
			}), n = a, r = i);
		}
		return t.push({
			endIndex: e.length - 1,
			size: n,
			startIndex: r
		}), t;
	})), n), F(z(c, B(d, u), L(([, e, t]) => e !== void 0 && t !== void 0), R(([e, t, n]) => {
		let r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = e[i + 1];
			r.push({
				startIndex: a,
				endIndex: a,
				size: t
			}), o !== void 0 && r.push({
				startIndex: a + 1,
				endIndex: o - 1,
				size: n
			});
		}
		return r;
	})), n);
	let b = Mr(z(n, B(_), Er(({ sizes: e }, [t, n]) => ({
		changed: n !== e,
		sizes: n
	}), {
		changed: !1,
		sizes: g
	}), R((e) => e.changed)));
	yr(z(s, Er((e, t) => ({
		diff: e.prev - t,
		prev: t
	}), {
		diff: 0,
		prev: 0
	}), R((e) => e.diff)), (e) => {
		let { groupIndices: n } = xr(_);
		if (e > 0) P(t, !0), P(a, e + zi(e, n));
		else if (e < 0) {
			let t = xr(v);
			t.length > 0 && (e -= zi(-e, t)), P(o, e);
		}
	}), yr(z(s, B(e)), ([e, t]) => {
		e < 0 && t("`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value", { firstItemIndex: s }, Lr.ERROR);
	});
	let x = Mr(a);
	F(z(a, B(_), R(([e, t]) => {
		let n = t.groupIndices.length > 0, r = [], i = t.lastSize;
		if (n) {
			let n = ii(t.sizeTree, 0), a = 0, o = 0;
			for (; a < e;) {
				let e = t.groupIndices[o], s = t.groupIndices.length === o + 1 ? Infinity : t.groupIndices[o + 1] - e - 1;
				r.push({
					endIndex: e,
					size: n,
					startIndex: e
				}), r.push({
					endIndex: e + 1 + s - 1,
					size: i,
					startIndex: e + 1
				}), o++, a += s + 1;
			}
			let s = ui(t.sizeTree);
			return a !== e && s.shift(), s.reduce((t, { k: n, v: r }) => {
				let i = t.ranges;
				return t.prevSize !== 0 && (i = [...t.ranges, {
					endIndex: n + e - 1,
					size: t.prevSize,
					startIndex: t.prevIndex
				}]), {
					prevIndex: n + e,
					prevSize: r,
					ranges: i
				};
			}, {
				prevIndex: e,
				prevSize: 0,
				ranges: r
			}).ranges;
		}
		return ui(t.sizeTree).reduce((t, { k: n, v: r }) => ({
			prevIndex: n + e,
			prevSize: r,
			ranges: [...t.ranges, {
				endIndex: n + e - 1,
				size: t.prevSize,
				startIndex: t.prevIndex
			}]
		}), {
			prevIndex: 0,
			prevSize: i,
			ranges: []
		}).ranges;
	})), n);
	let S = Mr(z(o, B(_, h), R(([e, { offsetTree: t }, n]) => Ni(-e, t, n))));
	return F(z(o, B(_, h), R(([e, t, n]) => {
		if (t.groupIndices.length > 0) {
			if (ri(t.sizeTree)) return t;
			let r = si(), i = xr(v), a = 0, o = 0, s = 0;
			for (; a < -e;) {
				s = i[o];
				let e = i[o + 1] - s - 1;
				o++, a += e + 1;
			}
			if (r = ui(t.sizeTree).reduce((t, { k: n, v: r }) => oi(t, Math.max(0, n + e), r), r), a !== -e) {
				let n = ii(t.sizeTree, s);
				r = oi(r, 0, n);
				let i = ai(t.sizeTree, -e + 1)[1];
				r = oi(r, 1, i);
			}
			return {
				...t,
				sizeTree: r,
				...Bi(t.offsetTree, 0, r, n)
			};
		}
		let r = ui(t.sizeTree).reduce((t, { k: n, v: r }) => oi(t, Math.max(0, n + e), r), si());
		return {
			...t,
			sizeTree: r,
			...Bi(t.offsetTree, 0, r, n)
		};
	})), _), {
		beforeUnshiftWith: x,
		data: m,
		defaultItemSize: u,
		firstItemIndex: s,
		fixedItemSize: l,
		fixedGroupSize: d,
		gap: h,
		groupIndices: c,
		heightEstimates: f,
		itemSize: p,
		listRefresh: b,
		shiftWith: o,
		shiftWithOffset: S,
		sizeRanges: n,
		sizes: _,
		statefulTotalCount: i,
		totalCount: r,
		trackItemSizes: y,
		unshiftWith: a
	};
}, vr(Br, wi), { singleton: !0 });
function Gi(e) {
	return e.reduce((e, t) => (e.groupIndices.push(e.totalCount), e.totalCount += t + 1, e), {
		groupIndices: [],
		totalCount: 0
	});
}
var Ki = U(([{ groupIndices: e, sizes: t, totalCount: n }, { headerHeight: r, scrollTop: i }]) => {
	let a = H(), o = H(), s = Mr(z(a, R(Gi)));
	return F(z(s, R((e) => e.totalCount)), n), F(z(s, R((e) => e.groupIndices)), e), F(z(Fr(i, t, r), L(([e, t]) => K(t)), R(([e, t, n]) => ai(t.groupOffsetTree, Math.max(e - n, 0), "v")[0]), I(), R((e) => [e])), o), {
		groupCounts: a,
		topItemsIndexes: o
	};
}, vr(Wi, ei)), qi = U(([{ log: e }]) => {
	let t = V(!1), n = Mr(z(t, L((e) => e), I()));
	return yr(t, (t) => {
		t && xr(e)("props updated", {}, Lr.DEBUG);
	}), {
		didMount: n,
		propsReady: t
	};
}, vr(Br), { singleton: !0 }), Ji = typeof document < "u" && "scrollBehavior" in document.documentElement.style;
function Yi(e) {
	let t = typeof e == "number" ? { index: e } : e;
	return t.align ||= "start", (!t.behavior || !Ji) && (t.behavior = "auto"), t.offset === void 0 && (t.offset = 0), t;
}
var Xi = U(([{ gap: e, listRefresh: t, sizes: n, totalCount: r }, { fixedFooterHeight: i, fixedHeaderHeight: a, footerHeight: o, headerHeight: s, scrollingInProgress: c, scrollTo: l, smoothScrollTargetReached: u, viewportHeight: d }, { log: f }]) => {
	let p = H(), m = H(), h = V(0), g = null, _ = null, v = null;
	function y() {
		g !== null && (g(), g = null), v !== null && (v(), v = null), _ &&= (clearTimeout(_), null), P(c, !1);
	}
	return F(z(p, B(n, d, r, h, s, o, f), B(e, a, i), R(([[e, n, r, i, a, o, s, l], d, f, h]) => {
		let b = Yi(e), { align: x, behavior: S, offset: C } = b, w = i - 1, T = Fi(b, n, w), ee = Ni(T, n.offsetTree, d) + o;
		x === "end" ? (ee += f + ai(n.sizeTree, T)[1] - r + h, T === w && (ee += s)) : x === "center" ? ee += (f + ai(n.sizeTree, T)[1] - r + h) / 2 : ee -= a, C !== void 0 && C !== 0 && (ee += C);
		let te = (t) => {
			y(), t ? (l("retrying to scroll to", { location: e }, Lr.DEBUG), P(p, e)) : (P(m, !0), l("list did not change, scroll successful", {}, Lr.DEBUG));
		};
		if (y(), S === "smooth") {
			let e = !1;
			v = yr(t, (t) => {
				e ||= t;
			}), g = Sr(u, () => {
				te(e);
			});
		} else g = Sr(z(t, Zi(150)), te);
		return _ = setTimeout(() => {
			y();
		}, 1200), P(c, !0), l("scrolling from index to", {
			behavior: S,
			index: T,
			top: ee
		}, Lr.DEBUG), {
			behavior: S,
			top: ee
		};
	})), l), {
		scrollTargetReached: m,
		scrollToIndex: p,
		topListHeight: h
	};
}, vr(Wi, ei, Br), { singleton: !0 });
function Zi(e) {
	return (t) => {
		let n = setTimeout(() => {
			t(!1);
		}, e);
		return (e) => {
			e && (t(!0), clearTimeout(n));
		};
	};
}
function Qi(e, t) {
	e === 0 ? t() : requestAnimationFrame(() => {
		Qi(e - 1, t);
	});
}
function $i(e, t) {
	let n = t - 1;
	return typeof e == "number" ? e : e.index === "LAST" ? n : e.index;
}
var ea = U(([{ defaultItemSize: e, listRefresh: t, sizes: n }, { scrollTop: r }, { scrollTargetReached: i, scrollToIndex: a }, { didMount: o }]) => {
	let s = V(!0), c = V(0), l = V(!0);
	return F(z(o, B(c), L(([e, t]) => t !== 0), Tr(!1)), s), F(z(o, B(c), L(([e, t]) => t !== 0), Tr(!1)), l), yr(z(Fr(t, o), B(s, n, e, l), L(([[, e], t, { sizeTree: n }, r, i]) => e && (!ri(n) || pr(r)) && !t && !i), B(c)), ([, e]) => {
		Sr(i, () => {
			P(l, !0);
		}), Qi(4, () => {
			Sr(r, () => {
				P(s, !0);
			}), P(a, e);
		});
	}), {
		initialItemFinalLocationReached: l,
		initialTopMostItemIndex: c,
		scrolledToInitialItem: s
	};
}, vr(Wi, ei, Xi, qi), { singleton: !0 });
function ta(e, t) {
	return Math.abs(e - t) < 1.01;
}
var na = "up", ra = "down", ia = "none", aa = {
	atBottom: !1,
	notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
	state: {
		offsetBottom: 0,
		scrollHeight: 0,
		scrollTop: 0,
		viewportHeight: 0
	}
}, oa = 0, sa = U(([{ footerHeight: e, headerHeight: t, scrollBy: n, scrollContainerState: r, scrollTop: i, viewportHeight: a }]) => {
	let o = V(!1), s = V(!0), c = H(), l = H(), u = V(4), d = V(oa), f = jr(z(Ir(z(W(i), Dr(1), Tr(!0)), z(W(i), Dr(1), Tr(!1), Cr(100))), I()), !1), p = jr(z(Ir(z(n, Tr(!0)), z(n, Tr(!1), Cr(200))), I()), !1);
	F(z(Fr(W(i), W(d)), R(([e, t]) => e <= t), I()), s), F(z(s, Or(50)), l);
	let m = Mr(z(Fr(r, W(a), W(t), W(e), W(u)), Er((e, [{ scrollHeight: t, scrollTop: n }, r, i, a, o]) => {
		let s = n + r - t > -o, c = {
			scrollHeight: t,
			scrollTop: n,
			viewportHeight: r
		};
		if (s) {
			let t, r;
			return n > e.state.scrollTop ? (t = "SCROLLED_DOWN", r = e.state.scrollTop - n) : (t = "SIZE_DECREASED", r = e.state.scrollTop - n || e.scrollTopDelta), {
				atBottom: !0,
				atBottomBecause: t,
				scrollTopDelta: r,
				state: c
			};
		}
		let l;
		return l = c.scrollHeight > e.state.scrollHeight ? "SIZE_INCREASED" : r < e.state.viewportHeight ? "VIEWPORT_HEIGHT_DECREASING" : n < e.state.scrollTop ? "SCROLLING_UPWARDS" : "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM", {
			atBottom: !1,
			notAtBottomBecause: l,
			state: c
		};
	}, aa), I((e, t) => e !== void 0 && e.atBottom === t.atBottom))), h = jr(z(r, Er((e, { scrollHeight: t, scrollTop: n, viewportHeight: r }) => {
		if (!ta(e.scrollHeight, t)) {
			let i = t - (n + r) < 1;
			return e.scrollTop !== n && i ? {
				changed: !0,
				jump: e.scrollTop - n,
				scrollHeight: t,
				scrollTop: n
			} : {
				changed: !0,
				jump: 0,
				scrollHeight: t,
				scrollTop: n
			};
		}
		return {
			changed: !1,
			jump: 0,
			scrollHeight: t,
			scrollTop: n
		};
	}, {
		changed: !1,
		jump: 0,
		scrollHeight: 0,
		scrollTop: 0
	}), L((e) => e.changed), R((e) => e.jump)), 0);
	F(z(m, R((e) => e.atBottom)), o), F(z(o, Or(50)), c);
	let g = V(ra);
	F(z(r, R(({ scrollTop: e }) => e), I(), Er((e, t) => xr(p) ? {
		direction: e.direction,
		prevScrollTop: t
	} : {
		direction: t < e.prevScrollTop ? na : ra,
		prevScrollTop: t
	}, {
		direction: ra,
		prevScrollTop: 0
	}), R((e) => e.direction)), g), F(z(r, Or(50), Tr(ia)), g);
	let _ = V(0);
	return F(z(f, L((e) => !e), Tr(0)), _), F(z(i, Or(100), B(f), L(([e, t]) => t), Er(([e, t], [n]) => [t, n], [0, 0]), R(([e, t]) => t - e)), _), {
		atBottomState: m,
		atBottomStateChange: c,
		atBottomThreshold: u,
		atTopStateChange: l,
		atTopThreshold: d,
		isAtBottom: o,
		isAtTop: s,
		isScrolling: f,
		lastJumpDueToItemResize: h,
		scrollDirection: g,
		scrollVelocity: _
	};
}, vr(ei)), ca = "top", la = "bottom", ua = "none";
function da(e, t, n) {
	return typeof e == "number" ? n === na && t === ca || n === ra && t === la ? e : 0 : n === na ? t === ca ? e.main : e.reverse : t === la ? e.main : e.reverse;
}
function fa(e, t) {
	return typeof e == "number" ? e : e[t] ?? 0;
}
var pa = U(([{ deviation: e, fixedHeaderHeight: t, headerHeight: n, scrollTop: r, viewportHeight: i }]) => {
	let a = H(), o = V(0), s = V(0), c = V(0);
	return {
		increaseViewportBy: s,
		listBoundary: a,
		overscan: c,
		topListHeight: o,
		visibleRange: jr(z(Fr(W(r), W(i), W(n), W(a, Ci), W(c), W(o), W(t), W(e), W(s)), R(([e, t, n, [r, i], a, o, s, c, l]) => {
			let u = e - c, d = o + s, f = Math.max(n - u, 0), p = ua, m = fa(l, ca), h = fa(l, la);
			return r -= c, r += n + s, i += n + s, i -= c, r > e + d - m && (p = na), i < e - f + t + h && (p = ra), p === ua ? null : [Math.max(u - n - da(a, ca, p) - m, 0), u - f - s + t + da(a, la, p) + h];
		}), L((e) => e !== null), I(Ci)), [0, 0])
	};
}, vr(ei), { singleton: !0 });
function ma(e, t, n) {
	if (K(t)) {
		let r = Pi(e, t);
		return [{
			index: ai(t.groupOffsetTree, r)[0],
			offset: 0,
			size: 0
		}, {
			data: n?.[0],
			index: r,
			offset: 0,
			size: 0
		}];
	}
	return [{
		data: n?.[0],
		index: e,
		offset: 0,
		size: 0
	}];
}
var ha = {
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
function ga(e, t, n, r, i, a) {
	let { lastIndex: o, lastOffset: s, lastSize: c } = i, l = 0, u = 0;
	if (e.length > 0) {
		l = e[0].offset;
		let t = e[e.length - 1];
		u = t.offset + t.size;
	}
	let d = n - o, f = s + d * c + (d - 1) * r, p = l, m = f - u;
	return {
		bottom: u,
		firstItemIndex: a,
		items: va(e, i, a),
		offsetBottom: m,
		offsetTop: l,
		top: p,
		topItems: va(t, i, a),
		topListHeight: t.reduce((e, t) => t.size + e, 0),
		totalCount: n
	};
}
function _a(e, t, n, r, i, a) {
	let o = 0;
	if (n.groupIndices.length > 0) for (let t of n.groupIndices) {
		if (t - o >= e) break;
		o++;
	}
	let s = e + o, c = $i(t, s);
	return ga(Array.from({ length: s }).map((e, t) => ({
		data: a[t + c],
		index: t + c,
		offset: 0,
		size: 0
	})), [], s, i, n, r);
}
function va(e, t, n) {
	if (e.length === 0) return [];
	if (!K(t)) return e.map((e) => ({
		...e,
		index: e.index + n,
		originalIndex: e.index
	}));
	let r = e[0].index, i = e[e.length - 1].index, a = [], o = ci(t.groupOffsetTree, r, i), s, c = 0;
	for (let r of e) {
		(!s || s.end < r.index) && (s = o.shift(), c = t.groupIndices.indexOf(s.start));
		let e;
		e = r.index === s.start ? {
			index: c,
			type: "group"
		} : {
			groupIndex: c,
			index: r.index - (c + 1) + n
		}, a.push({
			...e,
			data: r.data,
			offset: r.offset,
			originalIndex: r.index,
			size: r.size
		});
	}
	return a;
}
function ya(e, t) {
	return e === void 0 ? 0 : typeof e == "number" ? e : e[t] ?? 0;
}
var ba = U(([{ data: e, firstItemIndex: t, gap: n, sizes: r, totalCount: i }, a, { listBoundary: o, topListHeight: s, visibleRange: c }, { initialTopMostItemIndex: l, scrolledToInitialItem: u }, { topListHeight: d }, f, { didMount: p }, { recalcInProgress: m }]) => {
	let h = V([]), g = V(0), _ = H(), v = V(0);
	F(a.topItemsIndexes, h);
	let y = jr(z(Fr(p, m, W(c, Ci), W(i), W(r), W(l), u, W(h), W(t), W(n), W(v), e), L(([e, t, , n, , , , , , , , r]) => {
		let i = r !== void 0 && r.length !== n;
		return e && !t && !i;
	}), R(([, , [e, t], n, r, i, a, o, s, c, l, u]) => {
		let d = r, { offsetTree: f, sizeTree: p } = d, m = xr(g);
		if (n === 0) return {
			...ha,
			totalCount: n
		};
		if (e === 0 && t === 0) return m === 0 ? {
			...ha,
			totalCount: n
		} : _a(m, i, r, s, c, u || []);
		if (ri(p)) return m > 0 ? null : ga(ma($i(i, n), d, u), [], n, c, d, s);
		let h = [];
		if (o.length > 0) {
			let e = o[0], t = o[o.length - 1], n = 0;
			for (let r of ci(p, e, t)) {
				let i = r.value, a = Math.max(r.start, e), o = Math.min(r.end, t);
				for (let e = a; e <= o; e++) h.push({
					data: u?.[e],
					index: e,
					offset: n,
					size: i
				}), n += i;
			}
		}
		if (!a) return ga([], h, n, c, d, s);
		let _ = o.length > 0 ? o[o.length - 1] + 1 : 0, v = Ii(f, e, t, _);
		if (v.length === 0) return null;
		let y = n - 1, b = gr([], (n) => {
			for (let r of v) {
				let i = r.value, a = i.offset, o = r.start, s = i.size;
				if (i.offset < e) {
					o += Math.floor((e - i.offset + c) / (s + c));
					let t = o - r.start;
					a += t * s + t * c;
				}
				o < _ && (a += (_ - o) * s, o = _);
				let l = Math.min(r.end, y);
				for (let e = o; e <= l && !(a >= t); e++) n.push({
					data: u?.[e],
					index: e,
					offset: a,
					size: s
				}), a += s + c;
			}
		}), x = ya(l, ca), S = ya(l, la);
		if (b.length > 0 && (x > 0 || S > 0)) {
			let e = b[0], t = b[b.length - 1];
			if (x > 0 && e.index > _) {
				let t = Math.min(x, e.index - _), n = [], r = e.offset;
				for (let i = e.index - 1; i >= e.index - t; i--) {
					let t = ci(p, i, i)[0]?.value ?? e.size;
					r -= t + c, n.unshift({
						data: u?.[i],
						index: i,
						offset: r,
						size: t
					});
				}
				b.unshift(...n);
			}
			if (S > 0 && t.index < y) {
				let e = Math.min(S, y - t.index), n = t.offset + t.size + c;
				for (let r = t.index + 1; r <= t.index + e; r++) {
					let e = ci(p, r, r)[0]?.value ?? t.size;
					b.push({
						data: u?.[r],
						index: r,
						offset: n,
						size: e
					}), n += e + c;
				}
			}
		}
		return ga(b, h, n, c, d, s);
	}), L((e) => e !== null), I()), ha);
	F(z(e, L(pr), R((e) => e?.length)), i), F(z(y, R((e) => e.topListHeight)), d), F(d, s), F(z(y, R((e) => [e.top, e.bottom])), o), F(z(y, R((e) => e.items)), _);
	let b = Mr(z(y, L(({ items: e }) => e.length > 0), B(i, e), L(([{ items: e }, t]) => e[e.length - 1].originalIndex === t - 1), R(([, e, t]) => [e - 1, t]), I(Ci), R(([e]) => e))), x = Mr(z(y, Or(200), L(({ items: e, topItems: t }) => e.length > 0 && e[0].originalIndex === t.length), R(({ items: e }) => e[0].index), I()));
	return {
		endReached: b,
		initialItemCount: g,
		itemsRendered: _,
		listState: y,
		minOverscanItemCount: v,
		rangeChanged: Mr(z(y, L(({ items: e }) => e.length > 0), R(({ items: e }) => {
			let t = 0, n = e.length - 1;
			for (; e[t].type === "group" && t < n;) t++;
			for (; e[n].type === "group" && n > t;) n--;
			return {
				endIndex: e[n].index,
				startIndex: e[t].index
			};
		}), I(Si))),
		startReached: x,
		topItemsIndexes: h,
		...f
	};
}, vr(Wi, Ki, pa, ea, Xi, sa, qi, wi), { singleton: !0 }), xa = U(([{ fixedFooterHeight: e, fixedHeaderHeight: t, footerHeight: n, headerHeight: r }, { listState: i }]) => {
	let a = H(), o = jr(z(Fr(n, e, r, t, i), R(([e, t, n, r, i]) => e + t + n + r + i.offsetBottom + i.bottom)), 0);
	return F(W(o), a), {
		totalListHeight: o,
		totalListHeightChanged: a
	};
}, vr(ei, ba), { singleton: !0 }), Sa = U(([{ viewportHeight: e }, { totalListHeight: t }]) => {
	let n = V(!1);
	return {
		alignToBottom: n,
		paddingTopAddition: jr(z(Fr(n, e, t), L(([e]) => e), R(([, e, t]) => Math.max(0, e - t)), Or(0), I()), 0)
	};
}, vr(ei, xa), { singleton: !0 }), Ca = U(() => ({ context: V(null) })), wa = ({ itemBottom: e, itemTop: t, locationParams: { align: n, behavior: r, ...i }, viewportBottom: a, viewportTop: o }) => t < o ? {
	...i,
	align: n ?? "start",
	...r === void 0 ? {} : { behavior: r }
} : e > a ? {
	...i,
	align: n ?? "end",
	...r === void 0 ? {} : { behavior: r }
} : null, Ta = U(([{ gap: e, sizes: t, totalCount: n }, { fixedFooterHeight: r, fixedHeaderHeight: i, headerHeight: a, scrollingInProgress: o, scrollTop: s, viewportHeight: c }, { scrollToIndex: l }]) => {
	let u = H();
	return F(z(u, B(t, c, n, a, i, r, s), B(e), R(([[e, t, n, r, i, a, s, c], l]) => {
		let { calculateViewLocation: u = wa, done: d, ...f } = e, p = Fi(e, t, r - 1), m = Ni(p, t.offsetTree, l) + i + a, h = m + ai(t.sizeTree, p)[1], g = c + a, _ = u({
			itemBottom: h,
			itemTop: m,
			locationParams: f,
			viewportBottom: c + n - s,
			viewportTop: g
		});
		return _ === null ? d?.() : d && Sr(z(o, L((e) => !e), Dr(xr(o) ? 1 : 2)), d), _;
	}), L((e) => e !== null)), l), { scrollIntoView: u };
}, vr(Wi, ei, Xi, ba, Br), { singleton: !0 });
function Ea(e) {
	return e === !1 ? !1 : e === "smooth" ? "smooth" : "auto";
}
var Da = (e, t) => typeof e == "function" ? Ea(e(t)) : t && Ea(e), Oa = U(([{ listRefresh: e, totalCount: t, fixedItemSize: n, data: r }, { atBottomState: i, isAtBottom: a }, { scrollToIndex: o }, { scrolledToInitialItem: s }, { didMount: c, propsReady: l }, { log: u }, { scrollingInProgress: d }, { context: f }, { scrollIntoView: p }]) => {
	let m = V(!1), h = H(), g = null;
	function _(e) {
		P(o, {
			align: "end",
			behavior: e,
			index: "LAST"
		});
	}
	yr(z(Fr(z(W(t), Dr(1)), c), B(W(m), a, s, d), R(([[e, t], n, r, i, a]) => {
		let o = t && i, s = "auto";
		return o && (s = Da(n, r || a), o &&= s !== !1), {
			followOutputBehavior: s,
			shouldFollow: o,
			totalCount: e
		};
	}), L(({ shouldFollow: e }) => e)), ({ followOutputBehavior: t, totalCount: r }) => {
		g !== null && (g(), g = null), xr(n) === void 0 ? g = Sr(e, () => {
			xr(u)("following output to ", { totalCount: r }, Lr.DEBUG), _(t), g = null;
		}) : requestAnimationFrame(() => {
			xr(u)("following output to ", { totalCount: r }, Lr.DEBUG), _(t);
		});
	});
	function v(e) {
		let t = Sr(i, (t) => {
			e && !t.atBottom && t.notAtBottomBecause === "SIZE_INCREASED" && g === null && (xr(u)("scrolling to bottom due to increased size", {}, Lr.DEBUG), _("auto"));
		});
		setTimeout(t, 100);
	}
	yr(z(Fr(W(m), t, l), L(([e, , t]) => e !== !1 && t), Er(({ value: e }, [, t]) => ({
		refreshed: e === t,
		value: t
	}), {
		refreshed: !1,
		value: 0
	}), L(({ refreshed: e }) => e), B(m, t)), ([, e]) => {
		xr(s) && v(e !== !1);
	}), yr(h, () => {
		v(xr(m) !== !1);
	}), yr(Fr(W(m), i), ([e, t]) => {
		e !== !1 && !t.atBottom && t.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING" && _("auto");
	});
	let y = V(null), b = H();
	return F(Ir(z(W(r), R((e) => e?.length ?? 0)), z(W(t))), b), yr(z(Fr(z(b, Dr(1)), c), B(W(y), s, d, f), R(([[e, t], n, r, i, a]) => t && r && n?.({
		context: a,
		totalCount: e,
		scrollingInProgress: i
	})), L((e) => !!e), Or(0)), (t) => {
		g !== null && (g(), g = null), xr(n) === void 0 ? g = Sr(e, () => {
			xr(u)("scrolling into view", {}), P(p, t), g = null;
		}) : requestAnimationFrame(() => {
			xr(u)("scrolling into view", {}), P(p, t);
		});
	}), {
		autoscrollToBottom: h,
		followOutput: m,
		scrollIntoViewOnChange: y
	};
}, vr(Wi, sa, Xi, ea, qi, Br, ei, Ca, Ta)), ka = U(([{ data: e, firstItemIndex: t, gap: n, sizes: r }, { initialTopMostItemIndex: i }, { initialItemCount: a, listState: o }, { didMount: s }]) => (F(z(s, B(a), L(([, e]) => e !== 0), B(i, r, t, n, e), R(([[, e], t, n, r, i, a = []]) => _a(e, t, n, r, i, a))), o), {}), vr(Wi, ea, ba, qi), { singleton: !0 }), Aa = U(([{ didMount: e }, { scrollTo: t }, { listState: n }]) => {
	let r = V(0);
	return yr(z(e, B(r), L(([, e]) => e !== 0), R(([, e]) => ({ top: e }))), (e) => {
		Sr(z(n, Dr(1), L((e) => e.items.length > 1)), () => {
			requestAnimationFrame(() => {
				P(t, e);
			});
		});
	}), { initialScrollTop: r };
}, vr(qi, ei, ba), { singleton: !0 }), ja = U(([{ scrollVelocity: e }]) => {
	let t = V(!1), n = H(), r = V(!1);
	return F(z(e, B(r, t, n), L(([e, t]) => t !== !1 && t !== void 0), R(([e, t, n, r]) => {
		let { enter: i, exit: a } = t;
		if (n) {
			if (a(e, r)) return !1;
		} else if (i(e, r)) return !0;
		return n;
	}), I()), t), yr(z(Fr(t, e, n), B(r)), ([[e, t, n], r]) => {
		e && r !== !1 && r !== void 0 && r.change && r.change(t, n);
	}), {
		isSeeking: t,
		scrollSeekConfiguration: r,
		scrollSeekRangeChanged: n,
		scrollVelocity: e
	};
}, vr(sa), { singleton: !0 }), Ma = U(([{ scrollContainerState: e, scrollTo: t }]) => {
	let n = H(), r = H(), i = H(), a = V(!1), o = V(void 0);
	return F(z(Fr(n, r), R(([{ scrollTop: e, viewportHeight: t }, { offsetTop: n, listHeight: r }]) => ({
		scrollHeight: r,
		scrollTop: Math.max(0, e - n),
		viewportHeight: t
	}))), e), F(z(t, B(r), R(([e, { offsetTop: t }]) => ({
		...e,
		top: e.top + t
	}))), i), {
		customScrollParent: o,
		useWindowScroll: a,
		windowScrollContainerState: n,
		windowScrollTo: i,
		windowViewportRect: r
	};
}, vr(ei)), Na = U(([{ sizeRanges: e, sizes: t }, { headerHeight: n, scrollTop: r }, { initialTopMostItemIndex: i }, { didMount: a }, { useWindowScroll: o, windowScrollContainerState: s, windowViewportRect: c }]) => {
	let l = H(), u = V(void 0), d = V(null), f = V(null);
	return F(s, d), F(c, f), yr(z(l, B(t, r, o, d, f, n)), ([e, t, n, r, i, a, o]) => {
		let s = Ri(t.sizeTree);
		r && i !== null && a !== null && (n = i.scrollTop - a.offsetTop), n -= o, e({
			ranges: s,
			scrollTop: n
		});
	}), F(z(u, L(pr), R(Pa)), i), F(z(a, B(u), L(([, e]) => e !== void 0), I(), R(([, e]) => e.ranges)), e), {
		getState: l,
		restoreStateFrom: u
	};
}, vr(Wi, ei, ea, qi, Ma));
function Pa(e) {
	return {
		align: "start",
		index: 0,
		offset: e.scrollTop
	};
}
var Fa = U(([{ topItemsIndexes: e }]) => {
	let t = V(0);
	return F(z(t, L((e) => e >= 0), R((e) => Array.from({ length: e }).map((e, t) => t))), e), { topItemCount: t };
}, vr(ba));
function Ia(e) {
	let t = !1, n;
	return (() => (t || (t = !0, n = e()), n));
}
var La = Ia(() => /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent)), Ra = U(([{ data: e, defaultItemSize: t, firstItemIndex: n, fixedItemSize: r, fixedGroupSize: i, gap: a, groupIndices: o, heightEstimates: s, itemSize: c, sizeRanges: l, sizes: u, statefulTotalCount: d, totalCount: f, trackItemSizes: p }, { initialItemFinalLocationReached: m, initialTopMostItemIndex: h, scrolledToInitialItem: g }, _, v, y, b, { scrollToIndex: x }, S, { topItemCount: C }, { groupCounts: w }, T]) => {
	let { listState: ee, minOverscanItemCount: te, topItemsIndexes: ne, rangeChanged: re, ...ie } = b;
	return F(re, T.scrollSeekRangeChanged), F(z(T.windowViewportRect, R((e) => e.visibleHeight)), _.viewportHeight), {
		data: e,
		defaultItemHeight: t,
		firstItemIndex: n,
		fixedItemHeight: r,
		fixedGroupHeight: i,
		gap: a,
		groupCounts: w,
		heightEstimates: s,
		initialItemFinalLocationReached: m,
		initialTopMostItemIndex: h,
		scrolledToInitialItem: g,
		sizeRanges: l,
		topItemCount: C,
		topItemsIndexes: ne,
		totalCount: f,
		...y,
		groupIndices: o,
		itemSize: c,
		listState: ee,
		minOverscanItemCount: te,
		scrollToIndex: x,
		statefulTotalCount: d,
		trackItemSizes: p,
		rangeChanged: re,
		...ie,
		...T,
		..._,
		sizes: u,
		...v
	};
}, vr(Wi, ea, ei, Na, Oa, ba, Xi, U(([{ deviation: e, scrollBy: t, scrollingInProgress: n, scrollTop: r }, { isAtBottom: i, isScrolling: a, lastJumpDueToItemResize: o, scrollDirection: s }, { listState: c }, { beforeUnshiftWith: l, gap: u, shiftWithOffset: d, sizes: f }, { log: p }, { recalcInProgress: m }]) => {
	let h = Mr(z(c, B(o), Er(([, e, t, n], [{ bottom: r, items: i, offsetBottom: a, totalCount: o }, s]) => {
		let c = r + a, l = 0;
		return t === o && e.length > 0 && i.length > 0 && (i[0].originalIndex === 0 && e[0].originalIndex === 0 || (l = c - n, l !== 0 && (l += s))), [
			l,
			i,
			o,
			c
		];
	}, [
		0,
		[],
		0,
		0
	]), L(([e]) => e !== 0), B(r, s, n, i, p, m), L(([, e, t, n, , , r]) => !r && !n && e !== 0 && t === na), R(([[e], , , , , t]) => (t("Upward scrolling compensation", { amount: e }, Lr.DEBUG), e))));
	function g(n) {
		n > 0 ? (P(t, {
			behavior: "auto",
			top: -n
		}), P(e, 0)) : (P(e, 0), P(t, {
			behavior: "auto",
			top: -n
		}));
	}
	return yr(z(h, B(e, a)), ([t, n, r]) => {
		r && La() ? P(e, n - t) : g(-t);
	}), yr(z(Fr(jr(a, !1), e, m), L(([e, t, n]) => !e && !n && t !== 0), R(([e, t]) => t), Or(1)), g), F(z(d, R((e) => ({ top: -e }))), t), yr(z(l, B(f, u), R(([e, { groupIndices: t, lastSize: n, sizeTree: r }, i]) => {
		function a(e) {
			return e * (n + i);
		}
		if (t.length === 0) return a(e);
		let o = 0, s = ii(r, 0), c = 0, l = 0;
		for (; c < e;) {
			c++, o += s;
			let n = t.length === l + 1 ? Infinity : t[l + 1] - t[l] - 1;
			c + n > e && (o -= s, n = e - c + 1), c += n, o += a(n), l++;
		}
		return o;
	})), (n) => {
		P(e, n), requestAnimationFrame(() => {
			P(t, { top: n }), requestAnimationFrame(() => {
				P(e, 0), P(m, !1);
			});
		});
	}), { deviation: e };
}, vr(ei, sa, ba, Wi, Br, wi)), Fa, Ki, U(([e, t, n, r, i, a, o, s, c, l, u]) => ({
	...e,
	...t,
	...n,
	...r,
	...i,
	...a,
	...o,
	...s,
	...c,
	...l,
	...u
}), vr(pa, ka, qi, ja, xa, Aa, Sa, Ma, Ta, Br, Ca))));
function za(e, t) {
	let n = {}, r = {}, i = 0, a = e.length;
	for (; i < a;) r[e[i]] = 1, i += 1;
	for (let e in t) Object.hasOwn(r, e) || (n[e] = t[e]);
	return n;
}
var Ba = typeof document < "u" ? k.useLayoutEffect : k.useEffect;
function Va(e, t, n) {
	let r = Object.keys(t.required || {}), i = Object.keys(t.optional || {}), a = Object.keys(t.methods || {}), o = Object.keys(t.events || {}), s = k.createContext({});
	function c(e, n) {
		e.propsReady !== void 0 && P(e.propsReady, !1);
		for (let i of r) {
			let r = e[t.required[i]];
			P(r, n[i]);
		}
		for (let r of i) if (r in n) {
			let i = e[t.optional[r]];
			P(i, n[r]);
		}
		e.propsReady !== void 0 && P(e.propsReady, !0);
	}
	function l(e) {
		return a.reduce((n, r) => (n[r] = (n) => {
			let i = e[t.methods[r]];
			P(i, n);
		}, n), {});
	}
	function u(e) {
		return o.reduce((n, r) => (n[r] = Ar(e[t.events[r]]), n), {});
	}
	return {
		Component: k.forwardRef(function(t, a) {
			let { children: d, ...f } = t, [p] = k.useState(() => gr(Pr(e), (e) => {
				c(e, f);
			})), [m] = k.useState(dr(u, p));
			Ba(() => {
				for (let e of o) e in f && yr(m[e], f[e]);
				return () => {
					Object.values(m).map(br);
				};
			}, [
				f,
				m,
				p
			]), Ba(() => {
				c(p, f);
			}), k.useImperativeHandle(a, cr(l(p)));
			let h = n;
			return /* @__PURE__ */ (0, A.jsx)(s.Provider, {
				value: p,
				children: n === void 0 ? d : /* @__PURE__ */ (0, A.jsx)(h, {
					...za([
						...r,
						...i,
						...o
					], f),
					children: d
				})
			});
		}),
		useEmitter: (e, t) => {
			let n = k.useContext(s)[e];
			Ba(() => yr(n, t), [t, n]);
		},
		useEmitterValue: (e) => {
			let t = k.useContext(s)[e], n = k.useCallback((e) => yr(t, e), [t]);
			return k.useSyncExternalStore(n, () => xr(t), () => xr(t));
		},
		usePublisher: (e) => {
			let t = k.useContext(s);
			return k.useCallback((n) => {
				P(t[e], n);
			}, [t, e]);
		}
	};
}
var Ha = k.createContext(void 0), Ua = k.createContext(void 0), Wa = "-webkit-sticky", Ga = "sticky", Ka = Ia(() => {
	if (typeof document > "u") return Ga;
	let e = document.createElement("div");
	return e.style.position = Wa, e.style.position === Wa ? Wa : Ga;
}), qa = typeof document < "u" ? k.useLayoutEffect : k.useEffect;
function Ja(e) {
	return "self" in e;
}
function Ya(e) {
	return "body" in e;
}
function Xa(e, t, n, r = hr, i, a) {
	let o = k.useRef(null), s = k.useRef(null), c = k.useRef(null), l = k.useCallback((n) => {
		let r, i, o, l = n.target;
		if (Ya(l) || Ja(l)) {
			let e = Ja(l) ? l : l.defaultView;
			o = a === !0 ? Kr(e, e.scrollX) : e.scrollY, r = a === !0 ? e.document.documentElement.scrollWidth : e.document.documentElement.scrollHeight, i = a === !0 ? e.innerWidth : e.innerHeight;
		} else o = a === !0 ? Kr(l, l.scrollLeft) : l.scrollTop, r = a === !0 ? l.scrollWidth : l.scrollHeight, i = a === !0 ? l.offsetWidth : l.offsetHeight;
		let u = () => {
			e({
				scrollHeight: r,
				scrollTop: Math.max(o, 0),
				viewportHeight: i
			});
		};
		n.suppressFlushSync === !0 ? u() : rr.flushSync(u), s.current !== null && (o === s.current || o <= 0 || o === r - i) && (s.current = null, t(!0), c.current &&= (clearTimeout(c.current), null));
	}, [
		e,
		t,
		a
	]);
	k.useEffect(() => {
		let e = i || o.current;
		return Wr(e), r(i || o.current), l({
			suppressFlushSync: !0,
			target: e
		}), e.addEventListener("scroll", l, { passive: !0 }), () => {
			Wr(e), r(null), e.removeEventListener("scroll", l);
		};
	}, [
		o,
		l,
		n,
		r,
		i
	]);
	function u(n) {
		let r = o.current;
		if (!r || (a === !0 ? "offsetWidth" in r && r.offsetWidth === 0 : "offsetHeight" in r && r.offsetHeight === 0)) return;
		let i = n.behavior === "smooth", l, u, d;
		Ja(r) ? (u = Math.max(G(r.document.documentElement, a === !0 ? "width" : "height"), a === !0 ? r.document.documentElement.scrollWidth : r.document.documentElement.scrollHeight), l = a === !0 ? r.innerWidth : r.innerHeight, d = a === !0 ? Kr(r, r.scrollX) : r.scrollY) : (u = r[a === !0 ? "scrollWidth" : "scrollHeight"], l = G(r, a === !0 ? "width" : "height"), d = a === !0 ? Kr(r, r.scrollLeft) : r.scrollTop);
		let f = u - l;
		if (n.top === void 0) {
			r.scrollTo(n);
			return;
		}
		let p = Math.ceil(Math.max(Math.min(f, n.top), 0));
		if (n.top = p, ta(l, u) || p === d) {
			e({
				scrollHeight: u,
				scrollTop: d,
				viewportHeight: l
			}), i && t(!0);
			return;
		}
		i ? (s.current = p, c.current && clearTimeout(c.current), c.current = setTimeout(() => {
			c.current = null, s.current = null, t(!0);
		}, 1e3)) : s.current = null, a === !0 && (n = {
			...n.behavior === void 0 ? {} : { behavior: n.behavior },
			left: qr(r, p)
		}), r.scrollTo(n);
	}
	function d(e) {
		a === !0 && (e = {
			...e.behavior === void 0 ? {} : { behavior: e.behavior },
			...e.top === void 0 ? {} : { left: qr(o.current, e.top) }
		}), o.current.scrollBy(e);
	}
	return {
		scrollByCallback: d,
		scrollerRef: o,
		scrollToCallback: u
	};
}
function Za(e) {
	return e;
}
var Qa = /* @__PURE__ */ U(([e, t]) => ({
	...e,
	...t
}), vr(Ra, /* @__PURE__ */ U(() => {
	let e = V((e) => `Item ${e}`), t = V((e) => `Group ${e}`), n = V({}), r = V(Za), i = V("div"), a = V(hr), o = (e, t = null) => jr(z(n, R((t) => t[e]), I()), t);
	return {
		components: n,
		computeItemKey: r,
		EmptyPlaceholder: o("EmptyPlaceholder"),
		FooterComponent: o("Footer"),
		GroupComponent: o("Group", "div"),
		groupContent: t,
		HeaderComponent: o("Header"),
		HeaderFooterTag: i,
		ItemComponent: o("Item", "div"),
		itemContent: e,
		ListComponent: o("List", "div"),
		ScrollerComponent: o("Scroller", "div"),
		scrollerRef: a,
		ScrollSeekPlaceholder: o("ScrollSeekPlaceholder"),
		TopItemListComponent: o("TopItemList")
	};
}))), $a = ({ height: e }) => /* @__PURE__ */ (0, A.jsx)("div", { style: { height: e } }), eo = {
	overflowAnchor: "none",
	position: Ka(),
	zIndex: 1
}, to = { overflowAnchor: "none" }, no = {
	...to,
	display: "inline-block",
	height: "100%"
}, ro = /* @__PURE__ */ k.memo(function({ showTopList: e = !1 }) {
	let t = J("listState"), n = bo("sizeRanges"), r = J("useWindowScroll"), i = J("customScrollParent"), a = bo("windowScrollContainerState"), o = bo("scrollContainerState"), s = i || r ? a : o, c = J("itemContent"), l = J("context"), u = J("groupContent"), d = J("trackItemSizes"), f = J("itemSize"), p = J("log"), m = bo("gap"), h = J("horizontalDirection"), { callbackRef: g } = Xr(n, f, d, e ? hr : s, p, m, i, h, J("skipAnimationFrameInResizeObserver")), [_, v] = k.useState(0);
	yo("deviation", (e) => {
		_ !== e && v(e);
	});
	let y = J("EmptyPlaceholder"), b = J("ScrollSeekPlaceholder") ?? $a, x = J("ListComponent"), S = J("ItemComponent"), C = J("GroupComponent"), w = J("computeItemKey"), T = J("isSeeking"), ee = J("groupIndices").length > 0, te = J("alignToBottom"), ne = J("initialItemFinalLocationReached"), re = e ? {} : {
		boxSizing: "border-box",
		...h ? {
			display: "inline-block",
			height: "100%",
			marginInlineStart: _ === 0 ? te ? "auto" : 0 : _,
			paddingInlineEnd: t.offsetBottom,
			paddingInlineStart: t.offsetTop,
			whiteSpace: "nowrap"
		} : {
			marginTop: _ === 0 ? te ? "auto" : 0 : _,
			paddingBottom: t.offsetBottom,
			paddingTop: t.offsetTop
		},
		...ne ? {} : { visibility: "hidden" }
	};
	return !e && t.totalCount === 0 && y != null ? /* @__PURE__ */ (0, A.jsx)(y, { ...co(y, l) }) : /* @__PURE__ */ (0, A.jsx)(x, {
		...co(x, l),
		"data-testid": e ? "virtuoso-top-item-list" : "virtuoso-item-list",
		ref: g,
		style: re,
		children: (e ? t.topItems : t.items).map((e) => {
			let n = e.originalIndex, r = w(n + t.firstItemIndex, e.data, l);
			return T ? /* @__PURE__ */ (0, k.createElement)(b, {
				...co(b, l),
				height: e.size,
				index: e.index,
				key: r,
				type: e.type || "item",
				...e.type === "group" ? {} : { groupIndex: e.groupIndex }
			}) : e.type === "group" ? /* @__PURE__ */ (0, k.createElement)(C, {
				...co(C, l),
				"data-index": n,
				"data-item-index": e.index,
				"data-known-size": e.size,
				key: r,
				style: eo
			}, u(e.index, l)) : /* @__PURE__ */ (0, k.createElement)(S, {
				...co(S, l),
				...lo(S, e.data),
				"data-index": n,
				"data-item-group-index": e.groupIndex,
				"data-item-index": e.index,
				"data-known-size": e.size,
				key: r,
				style: h ? no : to
			}, ee ? c(e.index, e.groupIndex, e.data, l) : c(e.index, e.data, l));
		})
	});
}), io = {
	height: "100%",
	outline: "none",
	overflowY: "auto",
	position: "relative",
	WebkitOverflowScrolling: "touch"
}, ao = {
	outline: "none",
	overflowX: "auto",
	position: "relative"
}, q = (e) => ({
	height: "100%",
	position: "absolute",
	top: 0,
	width: "100%",
	...e ? {
		display: "flex",
		flexDirection: "column"
	} : void 0
}), oo = (e, t, n = 0) => ({
	...q(e),
	position: t ? "relative" : "absolute",
	top: t ? -n : 0
}), so = {
	position: Ka(),
	top: 0,
	width: "100%",
	zIndex: 1
};
function co(e, t) {
	if (typeof e != "string") return { context: t };
}
function lo(e, t) {
	return { item: typeof e == "string" ? void 0 : t };
}
var uo = /* @__PURE__ */ k.memo(function() {
	let e = J("HeaderComponent"), t = bo("headerHeight"), n = J("HeaderFooterTag"), r = Jr(k.useMemo(() => (e) => {
		t(G(e, "height"));
	}, [t]), !0, J("skipAnimationFrameInResizeObserver")), i = J("context");
	return e == null ? null : /* @__PURE__ */ (0, A.jsx)(n, {
		ref: r,
		children: /* @__PURE__ */ (0, A.jsx)(e, { ...co(e, i) })
	});
}), fo = /* @__PURE__ */ k.memo(function() {
	let e = J("FooterComponent"), t = bo("footerHeight"), n = J("HeaderFooterTag"), r = Jr(k.useMemo(() => (e) => {
		t(G(e, "height"));
	}, [t]), !0, J("skipAnimationFrameInResizeObserver")), i = J("context");
	return e == null ? null : /* @__PURE__ */ (0, A.jsx)(n, {
		ref: r,
		children: /* @__PURE__ */ (0, A.jsx)(e, { ...co(e, i) })
	});
});
function po({ useEmitter: e, useEmitterValue: t, usePublisher: n }) {
	return k.memo(function({ children: r, style: i, context: a, ...o }) {
		let s = n("scrollContainerState"), c = t("ScrollerComponent"), l = n("smoothScrollTargetReached"), u = t("scrollerRef"), d = t("horizontalDirection") || !1, { scrollByCallback: f, scrollerRef: p, scrollToCallback: m } = Xa(s, l, c, u, void 0, d);
		return e("scrollTo", m), e("scrollBy", f), /* @__PURE__ */ (0, A.jsx)(c, {
			"data-testid": "virtuoso-scroller",
			"data-virtuoso-scroller": !0,
			ref: p,
			style: {
				...d ? ao : io,
				...i
			},
			tabIndex: 0,
			...o,
			...co(c, a),
			children: r
		});
	});
}
function mo({ useEmitter: e, useEmitterValue: t, usePublisher: n }) {
	return k.memo(function({ children: r, style: i, context: a, ...o }) {
		let s = n("windowScrollContainerState"), c = t("ScrollerComponent"), l = n("smoothScrollTargetReached"), u = t("totalListHeight"), d = t("deviation"), f = t("customScrollParent"), p = k.useRef(null), { scrollByCallback: m, scrollerRef: h, scrollToCallback: g } = Xa(s, l, c, t("scrollerRef"), f);
		return qa(() => (h.current = f || p.current?.ownerDocument.defaultView, () => {
			h.current = null;
		}), [h, f]), e("windowScrollTo", g), e("scrollBy", m), /* @__PURE__ */ (0, A.jsx)(c, {
			ref: p,
			"data-virtuoso-scroller": !0,
			style: {
				position: "relative",
				...i,
				...u === 0 ? void 0 : { height: u + d }
			},
			...o,
			...co(c, a),
			children: r
		});
	});
}
var ho = ({ children: e }) => {
	let t = k.useContext(Ha), n = bo("viewportHeight"), r = bo("fixedItemHeight"), i = J("alignToBottom"), a = J("horizontalDirection"), o = Jr(k.useMemo(() => ur(n, (e) => G(e, a ? "width" : "height")), [n, a]), !0, J("skipAnimationFrameInResizeObserver"));
	return k.useEffect(() => {
		t && (n(t.viewportHeight), r(t.itemHeight));
	}, [
		t,
		n,
		r
	]), /* @__PURE__ */ (0, A.jsx)("div", {
		"data-viewport-type": "element",
		ref: o,
		style: q(i),
		children: e
	});
}, go = ({ children: e }) => {
	let t = k.useContext(Ha), n = bo("windowViewportRect"), r = bo("fixedItemHeight"), i = J("customScrollParent"), a = J("useWindowScroll"), o = J("topListHeight"), s = $r(n, i, J("skipAnimationFrameInResizeObserver")), c = J("alignToBottom");
	return k.useEffect(() => {
		t && (r(t.itemHeight), n({
			listHeight: 0,
			offsetTop: 0,
			visibleHeight: t.viewportHeight,
			visibleWidth: 100
		}));
	}, [
		t,
		n,
		r
	]), /* @__PURE__ */ (0, A.jsx)("div", {
		"data-viewport-type": "window",
		ref: s,
		style: oo(c, a, o),
		children: e
	});
}, _o = ({ children: e }) => {
	let t = J("TopItemListComponent") ?? "div", n = J("headerHeight");
	return /* @__PURE__ */ (0, A.jsx)(t, {
		style: {
			...so,
			marginTop: `${n}px`
		},
		...co(t, J("context")),
		children: e
	});
}, { Component: vo, useEmitter: yo, useEmitterValue: J, usePublisher: bo } = /* @__PURE__ */ Va(Qa, {
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
}, /* @__PURE__ */ k.memo(function(e) {
	let t = J("useWindowScroll"), n = J("topItemsIndexes").length > 0, r = J("customScrollParent"), i = J("context");
	return /* @__PURE__ */ (0, A.jsxs)(r || t ? So : xo, {
		...e,
		context: i,
		children: [n && /* @__PURE__ */ (0, A.jsx)(_o, { children: /* @__PURE__ */ (0, A.jsx)(ro, { showTopList: !0 }) }), /* @__PURE__ */ (0, A.jsxs)(r || t ? go : ho, { children: [
			/* @__PURE__ */ (0, A.jsx)(uo, {}),
			/* @__PURE__ */ (0, A.jsx)(ro, {}),
			/* @__PURE__ */ (0, A.jsx)(fo, {})
		] })]
	});
})), xo = /* @__PURE__ */ po({
	useEmitter: yo,
	useEmitterValue: J,
	usePublisher: bo
}), So = /* @__PURE__ */ mo({
	useEmitter: yo,
	useEmitterValue: J,
	usePublisher: bo
}), Co = vo, wo = /* @__PURE__ */ U(([e, t]) => ({
	...e,
	...t
}), vr(Ra, /* @__PURE__ */ U(() => {
	let e = V((e) => /* @__PURE__ */ (0, A.jsxs)("td", { children: ["Item $", e] })), t = V(null), n = V((e) => /* @__PURE__ */ (0, A.jsxs)("td", {
		colSpan: 1e3,
		children: ["Group ", e]
	})), r = V(null), i = V(null), a = V({}), o = V(Za), s = V(hr), c = (e, t = null) => jr(z(a, R((t) => t[e]), I()), t);
	return {
		components: a,
		computeItemKey: o,
		context: t,
		EmptyPlaceholder: c("EmptyPlaceholder"),
		FillerRow: c("FillerRow"),
		fixedFooterContent: i,
		fixedHeaderContent: r,
		itemContent: e,
		groupContent: n,
		ScrollerComponent: c("Scroller", "div"),
		scrollerRef: s,
		ScrollSeekPlaceholder: c("ScrollSeekPlaceholder"),
		TableBodyComponent: c("TableBody", "tbody"),
		TableComponent: c("Table", "table"),
		TableFooterComponent: c("TableFoot", "tfoot"),
		TableHeadComponent: c("TableHead", "thead"),
		TableRowComponent: c("TableRow", "tr"),
		GroupComponent: c("Group", "tr")
	};
}))), To = ({ height: e }) => /* @__PURE__ */ (0, A.jsx)("tr", { children: /* @__PURE__ */ (0, A.jsx)("td", { style: { height: e } }) }), Eo = ({ height: e }) => /* @__PURE__ */ (0, A.jsx)("tr", { children: /* @__PURE__ */ (0, A.jsx)("td", { style: {
	border: 0,
	height: e,
	padding: 0
} }) }), Do = { overflowAnchor: "none" }, Oo = {
	position: Ka(),
	zIndex: 2,
	overflowAnchor: "none"
}, ko = /* @__PURE__ */ k.memo(function({ showTopList: e = !1 }) {
	let t = Y("listState"), n = Y("computeItemKey"), r = Y("firstItemIndex"), i = Y("context"), a = Y("isSeeking"), o = Y("fixedHeaderHeight"), s = Y("groupIndices").length > 0, c = Y("itemContent"), l = Y("groupContent"), u = Y("ScrollSeekPlaceholder") ?? To, d = Y("GroupComponent"), f = Y("TableRowComponent"), p = (e ? t.topItems : []).reduce((e, t, n) => (n === 0 ? e.push(t.size) : e.push(e[n - 1] + t.size), e), []);
	return (e ? t.topItems : t.items).map((t) => {
		let m = t.originalIndex, h = n(m + r, t.data, i), g = e ? m === 0 ? 0 : p[m - 1] : 0;
		return a ? /* @__PURE__ */ (0, k.createElement)(u, {
			...co(u, i),
			height: t.size,
			index: t.index,
			key: h,
			type: t.type || "item"
		}) : t.type === "group" ? /* @__PURE__ */ (0, k.createElement)(d, {
			...co(d, i),
			"data-index": m,
			"data-item-index": t.index,
			"data-known-size": t.size,
			key: h,
			style: {
				...Oo,
				top: o
			}
		}, l(t.index, i)) : /* @__PURE__ */ (0, k.createElement)(f, {
			...co(f, i),
			...lo(f, t.data),
			"data-index": m,
			"data-item-index": t.index,
			"data-known-size": t.size,
			"data-item-group-index": t.groupIndex,
			key: h,
			style: e ? {
				...Oo,
				top: o + g
			} : Do
		}, s ? c(t.index, t.groupIndex, t.data, i) : c(t.index, t.data, i));
	});
}), Ao = /* @__PURE__ */ k.memo(function() {
	let e = Y("listState"), t = Y("topItemsIndexes").length > 0, n = Fo("sizeRanges"), r = Y("useWindowScroll"), i = Y("customScrollParent"), a = Fo("windowScrollContainerState"), o = Fo("scrollContainerState"), s = i || r ? a : o, c = Y("trackItemSizes"), { callbackRef: l, ref: u } = Xr(n, Y("itemSize"), c, s, Y("log"), void 0, i, !1, Y("skipAnimationFrameInResizeObserver")), [d, f] = k.useState(0);
	Po("deviation", (e) => {
		d !== e && (u.current.style.marginTop = `${e}px`, f(e));
	});
	let p = Y("EmptyPlaceholder"), m = Y("FillerRow") ?? Eo, h = Y("TableBodyComponent"), g = Y("paddingTopAddition"), _ = Y("statefulTotalCount"), v = Y("context");
	if (_ === 0 && p != null) return /* @__PURE__ */ (0, A.jsx)(p, { ...co(p, v) });
	let y = (t ? e.topItems : []).reduce((e, t) => e + t.size, 0), b = e.offsetTop + g + d - y, x = e.offsetBottom, S = b > 0 ? /* @__PURE__ */ (0, A.jsx)(m, {
		context: v,
		height: b
	}, "padding-top") : null, C = x > 0 ? /* @__PURE__ */ (0, A.jsx)(m, {
		context: v,
		height: x
	}, "padding-bottom") : null;
	return /* @__PURE__ */ (0, A.jsxs)(h, {
		"data-testid": "virtuoso-item-list",
		ref: l,
		...co(h, v),
		children: [
			S,
			t && /* @__PURE__ */ (0, A.jsx)(ko, { showTopList: !0 }),
			/* @__PURE__ */ (0, A.jsx)(ko, {}),
			C
		]
	});
}), jo = ({ children: e }) => {
	let t = k.useContext(Ha), n = Fo("viewportHeight"), r = Fo("fixedItemHeight"), i = Jr(k.useMemo(() => ur(n, (e) => G(e, "height")), [n]), !0, Y("skipAnimationFrameInResizeObserver"));
	return k.useEffect(() => {
		t && (n(t.viewportHeight), r(t.itemHeight));
	}, [
		t,
		n,
		r
	]), /* @__PURE__ */ (0, A.jsx)("div", {
		"data-viewport-type": "element",
		ref: i,
		style: q(!1),
		children: e
	});
}, Mo = ({ children: e }) => {
	let t = k.useContext(Ha), n = Fo("windowViewportRect"), r = Fo("fixedItemHeight"), i = Y("customScrollParent"), a = Y("useWindowScroll"), o = $r(n, i, Y("skipAnimationFrameInResizeObserver"));
	return k.useEffect(() => {
		t && (r(t.itemHeight), n({
			listHeight: 0,
			offsetTop: 0,
			visibleHeight: t.viewportHeight,
			visibleWidth: 100
		}));
	}, [
		t,
		n,
		r
	]), /* @__PURE__ */ (0, A.jsx)("div", {
		"data-viewport-type": "window",
		ref: o,
		style: oo(!1, a),
		children: e
	});
}, { Component: No, useEmitter: Po, useEmitterValue: Y, usePublisher: Fo } = /* @__PURE__ */ Va(wo, {
	optional: {
		restoreStateFrom: "restoreStateFrom",
		context: "context",
		followOutput: "followOutput",
		firstItemIndex: "firstItemIndex",
		itemContent: "itemContent",
		groupContent: "groupContent",
		fixedHeaderContent: "fixedHeaderContent",
		fixedFooterContent: "fixedFooterContent",
		overscan: "overscan",
		increaseViewportBy: "increaseViewportBy",
		minOverscanItemCount: "minOverscanItemCount",
		totalCount: "totalCount",
		topItemCount: "topItemCount",
		initialTopMostItemIndex: "initialTopMostItemIndex",
		components: "components",
		groupCounts: "groupCounts",
		atBottomThreshold: "atBottomThreshold",
		atTopThreshold: "atTopThreshold",
		computeItemKey: "computeItemKey",
		defaultItemHeight: "defaultItemHeight",
		fixedGroupHeight: "fixedGroupHeight",
		fixedItemHeight: "fixedItemHeight",
		itemSize: "itemSize",
		scrollSeekConfiguration: "scrollSeekConfiguration",
		data: "data",
		initialItemCount: "initialItemCount",
		initialScrollTop: "initialScrollTop",
		alignToBottom: "alignToBottom",
		useWindowScroll: "useWindowScroll",
		customScrollParent: "customScrollParent",
		scrollerRef: "scrollerRef",
		logLevel: "logLevel"
	},
	methods: {
		scrollToIndex: "scrollToIndex",
		scrollIntoView: "scrollIntoView",
		scrollTo: "scrollTo",
		scrollBy: "scrollBy",
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
}, /* @__PURE__ */ k.memo(function(e) {
	let t = Y("useWindowScroll"), n = Y("customScrollParent"), r = Fo("fixedHeaderHeight"), i = Fo("fixedFooterHeight"), a = Y("fixedHeaderContent"), o = Y("fixedFooterContent"), s = Y("context"), c = Jr(k.useMemo(() => ur(r, (e) => G(e, "height")), [r]), !0, Y("skipAnimationFrameInResizeObserver")), l = Jr(k.useMemo(() => ur(i, (e) => G(e, "height")), [i]), !0, Y("skipAnimationFrameInResizeObserver")), u = n || t ? Lo : Io, d = n || t ? Mo : jo, f = Y("TableComponent"), p = Y("TableHeadComponent"), m = Y("TableFooterComponent"), h = a ? /* @__PURE__ */ (0, A.jsx)(p, {
		ref: c,
		style: {
			position: "sticky",
			top: 0,
			zIndex: 2
		},
		...co(p, s),
		children: a()
	}, "TableHead") : null, g = o ? /* @__PURE__ */ (0, A.jsx)(m, {
		ref: l,
		style: {
			bottom: 0,
			position: "sticky",
			zIndex: 1
		},
		...co(m, s),
		children: o()
	}, "TableFoot") : null;
	return /* @__PURE__ */ (0, A.jsx)(u, {
		...e,
		...co(u, s),
		children: /* @__PURE__ */ (0, A.jsx)(d, { children: /* @__PURE__ */ (0, A.jsxs)(f, {
			style: {
				borderSpacing: 0,
				overflowAnchor: "none"
			},
			...co(f, s),
			children: [
				h,
				/* @__PURE__ */ (0, A.jsx)(Ao, {}, "TableBody"),
				g
			]
		}) })
	});
})), Io = /* @__PURE__ */ po({
	useEmitter: Po,
	useEmitterValue: Y,
	usePublisher: Fo
}), Lo = /* @__PURE__ */ mo({
	useEmitter: Po,
	useEmitterValue: Y,
	usePublisher: Fo
}), Ro = {
	bottom: 0,
	itemHeight: 0,
	items: [],
	itemWidth: 0,
	offsetBottom: 0,
	offsetTop: 0,
	top: 0
}, zo = {
	bottom: 0,
	itemHeight: 0,
	items: [{ index: 0 }],
	itemWidth: 0,
	offsetBottom: 0,
	offsetTop: 0,
	top: 0
}, { ceil: Bo, floor: Vo, max: Ho, min: Uo, round: Wo } = Math;
function Go(e, t, n) {
	return Array.from({ length: t - e + 1 }).map((t, r) => ({
		data: n === null ? null : n[r + e],
		index: r + e
	}));
}
function Ko(e) {
	return {
		...zo,
		items: e
	};
}
function qo(e, t) {
	return e !== void 0 && e.width === t.width && e.height === t.height;
}
function Jo(e, t) {
	return e !== void 0 && e.column === t.column && e.row === t.row;
}
var Yo = /* @__PURE__ */ U(([{ increaseViewportBy: e, listBoundary: t, overscan: n, visibleRange: r }, { footerHeight: i, headerHeight: a, scrollBy: o, scrollContainerState: s, scrollTo: c, scrollTop: l, smoothScrollTargetReached: u, viewportHeight: d }, f, p, { didMount: m, propsReady: h }, { customScrollParent: g, useWindowScroll: _, windowScrollContainerState: v, windowScrollTo: y, windowViewportRect: b }, x]) => {
	let S = V(0), C = V(0), w = V(Ro), T = V({
		height: 0,
		width: 0
	}), ee = V({
		height: 0,
		width: 0
	}), te = H(), ne = H(), re = V(0), ie = V(null), ae = V({
		column: 0,
		row: 0
	}), oe = H(), se = H(), ce = V(!1), le = V(0), E = V(!0), D = V(!1), ue = V(!1);
	yr(z(m, B(le), L(([e, t]) => t !== 0)), () => {
		P(E, !1);
	}), yr(z(Fr(m, E, ee, T, le, D), L(([e, t, n, r, , i]) => e && !t && n.height !== 0 && r.height !== 0 && !i)), ([, , , , e]) => {
		P(D, !0), Qi(1, () => {
			P(te, e);
		}), Sr(z(l), () => {
			P(t, [0, 0]), P(E, !0);
		});
	}), F(z(se, L((e) => e != null && e.scrollTop > 0), Tr(0)), C), yr(z(m, B(se), L(([, e]) => e != null)), ([, e]) => {
		e && (P(T, e.viewport), P(ee, e.item), P(ae, e.gap), e.scrollTop > 0 && (P(ce, !0), Sr(z(l, Dr(1)), (e) => {
			P(ce, !1);
		}), P(c, { top: e.scrollTop })));
	}), F(z(T, R(({ height: e }) => e)), d), F(z(Fr(W(T, qo), W(ee, qo), W(ae, (e, t) => e !== void 0 && e.column === t.column && e.row === t.row), W(l)), R(([e, t, n, r]) => ({
		gap: n,
		item: t,
		scrollTop: r,
		viewport: e
	}))), oe), F(z(Fr(W(S), r, W(ae, Jo), W(ee, qo), W(T, qo), W(ie), W(C), W(ce), W(E), W(le)), L(([, , , , , , , e]) => !e), R(([e, [t, n], r, i, a, o, s, , c, l]) => {
		let { column: u, row: d } = r, { height: f, width: p } = i, { width: m } = a;
		if (s === 0 && (e === 0 || m === 0)) return Ro;
		if (p === 0) {
			let t = $i(l, e);
			return Ko(Go(t, t + Math.max(s - 1, 0), o));
		}
		let h = Xo(m, p, u), g, _;
		c ? t === 0 && n === 0 && s > 0 ? (g = 0, _ = s - 1) : (g = h * Vo((t + d) / (f + d)), _ = h * Bo((n + d) / (f + d)) - 1, _ = Uo(e - 1, Ho(_, h - 1)), g = Uo(_, Ho(0, g))) : (g = 0, _ = -1);
		let v = Go(g, _, o), { bottom: y, top: b } = Zo(a, r, i, v), x = Bo(e / h);
		return {
			bottom: y,
			itemHeight: f,
			items: v,
			itemWidth: p,
			offsetBottom: x * f + (x - 1) * d - y,
			offsetTop: b,
			top: b
		};
	})), w), F(z(ie, L((e) => e !== null), R((e) => e.length)), S), F(z(Fr(T, ee, w, ae), L(([e, t, { items: n }]) => n.length > 0 && t.height !== 0 && e.height !== 0), R(([e, t, { items: n }, r]) => {
		let { bottom: i, top: a } = Zo(e, r, t, n);
		return [a, i];
	}), I(Ci)), t);
	let de = V(!1);
	F(z(l, B(de), R(([e, t]) => t || e !== 0)), de);
	let fe = Mr(z(Fr(w, S), L(([{ items: e }]) => e.length > 0), B(de), L(([[e, t], n]) => {
		let r = e.items[e.items.length - 1].index === t - 1;
		return (n || e.bottom > 0 && e.itemHeight > 0 && e.offsetBottom === 0 && e.items.length === t) && r;
	}), R(([[, e]]) => e - 1), I())), pe = Mr(z(W(w), L(({ items: e }) => e.length > 0 && e[0].index === 0), Tr(0), I())), me = Mr(z(W(w), B(ce), L(([{ items: e }, t]) => e.length > 0 && !t), R(([{ items: e }]) => ({
		endIndex: e[e.length - 1].index,
		startIndex: e[0].index
	})), I(Si), Or(0)));
	F(me, p.scrollSeekRangeChanged), F(z(te, B(T, ee, S, ae), R(([e, t, n, r, i]) => {
		let a = Yi(e), { align: o, behavior: s, offset: c } = a, l = a.index;
		l === "LAST" && (l = r - 1), l = Ho(0, l, Uo(r - 1, l));
		let u = Qo(t, i, n, l);
		return o === "end" ? u = Wo(u - t.height + n.height) : o === "center" && (u = Wo(u - t.height / 2 + n.height / 2)), c !== void 0 && c !== 0 && (u += c), {
			behavior: s,
			top: u
		};
	})), c);
	let O = jr(z(w, R((e) => e.offsetBottom + e.bottom)), 0);
	return F(z(b, R((e) => ({
		height: e.visibleHeight,
		width: e.visibleWidth
	}))), T), {
		customScrollParent: g,
		data: ie,
		deviation: re,
		footerHeight: i,
		gap: ae,
		headerHeight: a,
		increaseViewportBy: e,
		initialItemCount: C,
		itemDimensions: ee,
		overscan: n,
		restoreStateFrom: se,
		scrollBy: o,
		scrollContainerState: s,
		scrollHeight: ne,
		scrollTo: c,
		scrollToIndex: te,
		scrollTop: l,
		smoothScrollTargetReached: u,
		totalCount: S,
		useWindowScroll: _,
		viewportDimensions: T,
		windowScrollContainerState: v,
		windowScrollTo: y,
		windowViewportRect: b,
		...p,
		gridState: w,
		horizontalDirection: ue,
		initialTopMostItemIndex: le,
		totalListHeight: O,
		...f,
		endReached: fe,
		propsReady: h,
		rangeChanged: me,
		startReached: pe,
		stateChanged: oe,
		stateRestoreInProgress: ce,
		...x
	};
}, vr(pa, ei, sa, ja, qi, Ma, Br));
function Xo(e, t, n) {
	return Ho(1, Vo((e + n) / (Vo(t) + n)));
}
function Zo(e, t, n, r) {
	let { height: i } = n;
	if (i === void 0 || r.length === 0) return {
		bottom: 0,
		top: 0
	};
	let a = Qo(e, t, n, r[0].index);
	return {
		bottom: Qo(e, t, n, r[r.length - 1].index) + i,
		top: a
	};
}
function Qo(e, t, n, r) {
	let i = Vo(r / Xo(e.width, n.width, t.column)), a = i * n.height + Ho(0, i - 1) * t.row;
	return a > 0 ? a + t.row : a;
}
var $o = /* @__PURE__ */ U(([e, t]) => ({
	...e,
	...t
}), vr(Yo, /* @__PURE__ */ U(() => {
	let e = V((e) => `Item ${e}`), t = V({}), n = V(null), r = V("virtuoso-grid-item"), i = V("virtuoso-grid-list"), a = V(Za), o = V("div"), s = V(hr), c = (e, n = null) => jr(z(t, R((t) => t[e]), I()), n), l = V(!1), u = V(!1);
	return F(W(u), l), {
		components: t,
		computeItemKey: a,
		context: n,
		FooterComponent: c("Footer"),
		HeaderComponent: c("Header"),
		headerFooterTag: o,
		itemClassName: r,
		ItemComponent: c("Item", "div"),
		itemContent: e,
		listClassName: i,
		ListComponent: c("List", "div"),
		readyStateChanged: l,
		reportReadyState: u,
		ScrollerComponent: c("Scroller", "div"),
		scrollerRef: s,
		ScrollSeekPlaceholder: c("ScrollSeekPlaceholder", "div")
	};
}))), es = /* @__PURE__ */ k.memo(function() {
	let e = ss("gridState"), t = ss("listClassName"), n = ss("itemClassName"), r = ss("itemContent"), i = ss("computeItemKey"), a = ss("isSeeking"), o = cs("scrollHeight"), s = ss("ItemComponent"), c = ss("ListComponent"), l = ss("ScrollSeekPlaceholder"), u = ss("context"), d = cs("itemDimensions"), f = cs("gap"), p = ss("log"), m = ss("stateRestoreInProgress"), h = cs("reportReadyState"), g = Jr(k.useMemo(() => (e) => {
		let t = e.parentElement.parentElement.scrollHeight;
		o(t);
		let n = e.firstChild;
		if (n !== null) {
			let { height: e, width: t } = n.getBoundingClientRect();
			d({
				height: e,
				width: t
			});
		}
		f({
			column: ds("column-gap", getComputedStyle(e).columnGap, p),
			row: ds("row-gap", getComputedStyle(e).rowGap, p)
		});
	}, [
		o,
		d,
		f,
		p
	]), !0, !1);
	return qa(() => {
		e.itemHeight > 0 && e.itemWidth > 0 && h(!0);
	}, [e]), m ? null : /* @__PURE__ */ (0, A.jsx)(c, {
		className: t,
		ref: g,
		...co(c, u),
		"data-testid": "virtuoso-item-list",
		style: {
			paddingBottom: e.offsetBottom,
			paddingTop: e.offsetTop
		},
		children: e.items.map((t) => {
			let o = i(t.index, t.data, u);
			return a ? /* @__PURE__ */ (0, A.jsx)(l, {
				...co(l, u),
				height: e.itemHeight,
				index: t.index,
				width: e.itemWidth
			}, o) : /* @__PURE__ */ (0, k.createElement)(s, {
				...co(s, u),
				className: n,
				"data-index": t.index,
				key: o
			}, r(t.index, t.data, u));
		})
	});
}), ts = k.memo(function() {
	let e = ss("HeaderComponent"), t = cs("headerHeight"), n = ss("headerFooterTag"), r = Jr(k.useMemo(() => (e) => {
		t(G(e, "height"));
	}, [t]), !0, !1), i = ss("context");
	return e == null ? null : /* @__PURE__ */ (0, A.jsx)(n, {
		ref: r,
		children: /* @__PURE__ */ (0, A.jsx)(e, { ...co(e, i) })
	});
}), ns = k.memo(function() {
	let e = ss("FooterComponent"), t = cs("footerHeight"), n = ss("headerFooterTag"), r = Jr(k.useMemo(() => (e) => {
		t(G(e, "height"));
	}, [t]), !0, !1), i = ss("context");
	return e == null ? null : /* @__PURE__ */ (0, A.jsx)(n, {
		ref: r,
		children: /* @__PURE__ */ (0, A.jsx)(e, { ...co(e, i) })
	});
}), rs = ({ children: e }) => {
	let t = k.useContext(Ua), n = cs("itemDimensions"), r = cs("viewportDimensions"), i = Jr(k.useMemo(() => (e) => {
		r(e.getBoundingClientRect());
	}, [r]), !0, !1);
	return k.useEffect(() => {
		t && (r({
			height: t.viewportHeight,
			width: t.viewportWidth
		}), n({
			height: t.itemHeight,
			width: t.itemWidth
		}));
	}, [
		t,
		r,
		n
	]), /* @__PURE__ */ (0, A.jsx)("div", {
		ref: i,
		style: q(!1),
		children: e
	});
}, is = ({ children: e }) => {
	let t = k.useContext(Ua), n = cs("windowViewportRect"), r = cs("itemDimensions"), i = ss("customScrollParent"), a = ss("useWindowScroll"), o = $r(n, i, !1);
	return k.useEffect(() => {
		t && (r({
			height: t.itemHeight,
			width: t.itemWidth
		}), n({
			listHeight: 0,
			offsetTop: 0,
			visibleHeight: t.viewportHeight,
			visibleWidth: t.viewportWidth
		}));
	}, [
		t,
		n,
		r
	]), /* @__PURE__ */ (0, A.jsx)("div", {
		ref: o,
		style: oo(!1, a),
		children: e
	});
}, { Component: as, useEmitter: os, useEmitterValue: ss, usePublisher: cs } = /* @__PURE__ */ Va($o, {
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
}, /* @__PURE__ */ k.memo(function({ ...e }) {
	let t = ss("useWindowScroll"), n = ss("customScrollParent"), r = n || t ? us : ls, i = n || t ? is : rs, a = ss("context");
	return /* @__PURE__ */ (0, A.jsx)(r, {
		...e,
		...co(r, a),
		children: /* @__PURE__ */ (0, A.jsxs)(i, { children: [
			/* @__PURE__ */ (0, A.jsx)(ts, {}),
			/* @__PURE__ */ (0, A.jsx)(es, {}),
			/* @__PURE__ */ (0, A.jsx)(ns, {})
		] })
	});
})), ls = /* @__PURE__ */ po({
	useEmitter: os,
	useEmitterValue: ss,
	usePublisher: cs
}), us = /* @__PURE__ */ mo({
	useEmitter: os,
	useEmitterValue: ss,
	usePublisher: cs
});
function ds(e, t, n) {
	return t !== "normal" && t?.endsWith("px") !== !0 && n(`${e} was not resolved to pixel value correctly`, t, Lr.WARN), t === "normal" ? 0 : parseInt(t ?? "0", 10);
}
//#endregion
//#region src/components/Icon.tsx
function X({ icon: e, className: t, title: n }) {
	return k.createElement("ha-icon", {
		icon: e,
		className: t,
		title: n
	});
}
//#endregion
//#region src/components/Rail.tsx
function fs(e) {
	let t = nt(e).length;
	return e.status === "error" ? "error" : t || pt(e) || mt(e) || e.status === "waiting_approval" && t ? "approval" : rt(e) ? "restart" : [
		"planning",
		"running",
		"working"
	].includes(e.status || "") ? "working" : "idle";
}
function ps(e, t) {
	return t ? "running" : e ? e.status === "passed" || e.ok === !0 || e.returncode === 0 ? "success" : e.status === "failed" || e.ok === !1 || Number.isInteger(e.returncode) && e.returncode !== 0 ? "error" : e.status === "unavailable" ? "warning" : "unknown" : "unknown";
}
function ms(e) {
	return e === "success" ? "mdi:check-circle" : e === "error" ? "mdi:alert-circle" : e === "warning" ? "mdi:alert-outline" : e === "running" ? "mdi:progress-clock" : "mdi:help-circle-outline";
}
function hs(e) {
	let t = j((e) => e.showArchived ? e.archivedChatIds : e.activeChatIds), n = j((e) => e.activeId), r = j((e) => e.showArchived), i = j((e) => e.archivedChatIds.length), a = j((e) => e.scheduledRestart), o = j((e) => e.chatsById), s = (0, k.useMemo)(() => it(Object.values(o)), [o]), c = j((e) => e.validation), l = j((e) => e.validationRunning), u = M((e) => e.status), d = u.usage || {}, f = u.runtime?.bridge_available === !1, p = ps(c, l), m = r ? "Current chats" : "Archived chats", [h, g] = (0, k.useState)(""), [_, v] = (0, k.useState)({
		active: !1,
		ids: [],
		phase: 0
	}), [y, b] = (0, k.useState)(!1), x = (0, k.useRef)(null), S = (0, k.useRef)(null), C = (0, k.useRef)(null), w = r ? "archived" : "current", T = (0, k.useMemo)(() => r ? kt(t, o, h) : t, [
		h,
		o,
		r,
		t
	]), ee = (0, k.useMemo)(() => new Set(_.ids), [_.ids]), te = r && !!h.trim();
	(0, k.useEffect)(() => {
		let e = x.current;
		if (x.current = {
			ids: t,
			mode: w
		}, !e || e.mode !== w || e.ids.length !== t.length) return;
		let n = new Map(e.ids.map((e, t) => [e, t]));
		if (!t.every((e) => n.has(e))) return;
		let r = t.filter((e, t) => n.get(e) !== t);
		r.length && (C.current && window.clearTimeout(C.current), v((e) => ({
			active: !0,
			ids: r,
			phase: e.phase === 1 ? 2 : 1
		})), C.current = window.setTimeout(() => {
			v((e) => ({
				...e,
				active: !1,
				ids: []
			})), C.current = null;
		}, 340));
	}, [w, t]), (0, k.useEffect)(() => () => {
		C.current && window.clearTimeout(C.current);
	}, []), (0, k.useEffect)(() => {
		!r && h && g("");
	}, [h, r]), (0, k.useEffect)(() => {
		s.length || b(!1);
	}, [s.length]), (0, k.useEffect)(() => {
		if (!y) return;
		let e = (e) => {
			let t = e.composedPath();
			S.current && t.includes(S.current) || b(!1);
		};
		return window.addEventListener("pointerdown", e), () => window.removeEventListener("pointerdown", e);
	}, [y]);
	let ne = s[0];
	return /* @__PURE__ */ (0, A.jsxs)("aside", {
		className: "rail",
		children: [
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "brand",
				children: [/* @__PURE__ */ (0, A.jsxs)("div", { children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: "Codex" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Home Assistant" })] }), /* @__PURE__ */ (0, A.jsx)("button", {
					onClick: e.onNew,
					title: "New chat",
					children: "+"
				})]
			}),
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "sessions",
				"data-sessions-mode": r ? "archived" : "current",
				children: [
					r ? /* @__PURE__ */ (0, A.jsxs)("label", {
						className: "archive-search",
						children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:magnify" }), /* @__PURE__ */ (0, A.jsx)("input", {
							type: "search",
							value: h,
							onChange: (e) => g(e.currentTarget.value),
							placeholder: "Search archived chats",
							"aria-label": "Search archived chats"
						})]
					}) : null,
					T.length ? null : /* @__PURE__ */ (0, A.jsx)("p", {
						className: "muted pad",
						children: r ? te && t.length ? "No archived chats match your search." : "No archived chats." : "No chats yet."
					}),
					T.length ? /* @__PURE__ */ (0, A.jsx)(Co, {
						className: "sessions-virtual-list",
						data: T,
						computeItemKey: (e, t) => t,
						itemContent: (t, r) => /* @__PURE__ */ (0, A.jsx)(_s, {
							id: r,
							active: r === n,
							switching: _.active && ee.has(r),
							switchPhase: _.phase,
							onSelect: e.onSelect,
							onArchive: e.onArchive,
							onDeleteArchived: e.onDeleteArchived
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "rail-footer",
				children: [/* @__PURE__ */ (0, A.jsxs)("div", {
					className: "usage-summary",
					title: "Codex usage remaining",
					children: [/* @__PURE__ */ (0, A.jsxs)("div", { children: [/* @__PURE__ */ (0, A.jsxs)("span", {
						className: "usage-main",
						children: [/* @__PURE__ */ (0, A.jsx)("span", { children: "5h" }), /* @__PURE__ */ (0, A.jsx)("strong", { children: vs(d.five_hour_remaining_percent) })]
					}), ys(d.five_hour_reset_at)] }), /* @__PURE__ */ (0, A.jsxs)("div", { children: [/* @__PURE__ */ (0, A.jsxs)("span", {
						className: "usage-main",
						children: [/* @__PURE__ */ (0, A.jsx)("span", { children: "Weekly" }), /* @__PURE__ */ (0, A.jsx)("strong", { children: vs(d.weekly_remaining_percent) })]
					}), ys(d.weekly_reset_at)] })]
				}), /* @__PURE__ */ (0, A.jsxs)("div", {
					className: `rail-footer-actions ${s.length ? "restart-pending" : ""}`,
					children: [
						/* @__PURE__ */ (0, A.jsxs)("button", {
							className: `archive-toggle ${r ? "active" : ""}`,
							onClick: e.onToggleArchived,
							children: [
								/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:archive-outline" }),
								/* @__PURE__ */ (0, A.jsx)("span", {
									className: "overflow-title",
									title: m,
									children: m
								}),
								/* @__PURE__ */ (0, A.jsx)("b", { children: i })
							]
						}),
						ne ? /* @__PURE__ */ (0, A.jsx)(gs, {
							approval: ne.approval,
							count: s.length,
							menuOpen: y,
							actionRef: S,
							scheduled: a,
							session: ne.session,
							onMenuOpen: b,
							onRestartNow: e.onRestartNow,
							onRestartSchedule: e.onRestartSchedule,
							onRestartScheduleCancel: e.onRestartScheduleCancel
						}) : null,
						/* @__PURE__ */ (0, A.jsxs)("button", {
							className: `validation-status-button ${p}`,
							onClick: e.onValidate,
							title: "Run HA config validation",
							"aria-label": "Run HA config validation",
							"aria-disabled": l,
							children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: ms(p) }), /* @__PURE__ */ (0, A.jsxs)("span", {
								className: "validation-tooltip",
								role: "tooltip",
								children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: "HA Config Validation" }), /* @__PURE__ */ (0, A.jsx)("span", { children: l ? "Running Home Assistant config validation..." : c ? c.status || "done" : "No validation result yet. Click to run check." })]
							})]
						}),
						/* @__PURE__ */ (0, A.jsx)("button", {
							className: `debug-button ${f ? "bridge-unavailable" : ""}`,
							onClick: e.onDebug,
							title: "Open settings",
							"aria-label": "Open settings",
							children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:cog-outline" })
						})
					]
				})]
			})
		]
	});
}
var gs = (0, k.memo)(function({ approval: e, count: t, menuOpen: n, actionRef: r, scheduled: i, session: a, onMenuOpen: o, onRestartNow: s, onRestartSchedule: c, onRestartScheduleCancel: l }) {
	let u = i ? "Restart scheduled after pending completion" : `${t} pending restart${t === 1 ? "" : "s"}`;
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "restart-action-wrap",
		ref: r,
		children: [/* @__PURE__ */ (0, A.jsx)("button", {
			className: `restart-action ${i ? "scheduled" : "pending"}`,
			onClick: () => o(!n),
			title: u,
			"aria-label": u,
			"aria-expanded": n,
			"aria-haspopup": "menu",
			children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:restart" })
		}), n ? /* @__PURE__ */ (0, A.jsxs)("div", {
			className: "restart-action-menu",
			role: "menu",
			children: [/* @__PURE__ */ (0, A.jsx)("button", {
				role: "menuitem",
				onClick: () => {
					o(!1), s(a.id, e.id);
				},
				children: "Restart now"
			}), /* @__PURE__ */ (0, A.jsx)("button", {
				role: "menuitem",
				onClick: () => {
					o(!1), i ? l() : c();
				},
				children: i ? "Cancel auto restart" : "Restart after pending completion"
			})]
		}) : null]
	});
}), _s = (0, k.memo)(function({ id: e, active: t, switching: n, switchPhase: r, onSelect: i, onArchive: a, onDeleteArchived: o }) {
	let s = j((t) => t.chatsById[e]);
	if (!s) return null;
	let c = !!s.archived;
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: `session-row ${t ? "active" : ""} ${c ? "archived" : ""} ${n ? `switching switching-${r}` : ""}`,
		"data-session-id": e,
		children: [
			/* @__PURE__ */ (0, A.jsx)("button", {
				className: "session",
				onClick: () => i(e),
				children: /* @__PURE__ */ (0, A.jsxs)("span", {
					className: "session-text",
					children: [/* @__PURE__ */ (0, A.jsxs)("span", {
						className: "title-line",
						children: [/* @__PURE__ */ (0, A.jsx)("span", {
							className: `status-dot status-dot-${fs(s)}`,
							"aria-hidden": "true"
						}), /* @__PURE__ */ (0, A.jsx)("span", {
							className: "title overflow-title",
							title: s.title,
							children: s.title
						})]
					}), /* @__PURE__ */ (0, A.jsx)("span", {
						className: "meta",
						children: Wn(Ct(s))
					})]
				})
			}),
			/* @__PURE__ */ (0, A.jsx)("button", {
				className: "icon-button session-archive",
				"data-action": c ? "unarchive" : "archive",
				onClick: () => a(e, !c),
				title: c ? "Restore chat" : "Archive chat",
				"aria-label": c ? "Restore chat" : "Archive chat",
				children: /* @__PURE__ */ (0, A.jsx)(X, { icon: c ? "mdi:archive-arrow-up-outline" : "mdi:archive-arrow-down-outline" })
			}),
			c ? /* @__PURE__ */ (0, A.jsx)("button", {
				className: "icon-button session-delete",
				onClick: () => o(e),
				title: "Delete archived chat",
				"aria-label": "Delete archived chat",
				children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:trash-can-outline" })
			}) : null
		]
	});
});
function vs(e) {
	if (e == null || e === "") return "--%";
	let t = Number(e);
	return Number.isFinite(t) ? `${Math.round(t)}%` : "--%";
}
function ys(e) {
	let t = Un(e);
	return t ? /* @__PURE__ */ (0, A.jsxs)("small", {
		title: Kn(e),
		children: ["Resets ", t]
	}) : /* @__PURE__ */ (0, A.jsx)("small", { children: "--" });
}
//#endregion
//#region src/features/validation/validationUtils.ts
function bs(e) {
	let t = e?.summary?.recommendation;
	return t === "fix_validation_errors" ? "error" : t === "restart_required" ? "restart" : t === "reload_may_be_enough" || t === "validation_unavailable" ? "warning" : t === "no_action_needed" ? "success" : e?.status === "failed" || e?.ok === !1 ? "error" : e?.status === "passed" || e?.ok === !0 || e?.returncode === 0 ? "success" : "unknown";
}
function xs(e) {
	return e?.summary?.label ? e.summary.label : e ? e.status === "passed" ? "No action needed" : e.status === "failed" ? "Fix validation errors first" : e.status === "unavailable" ? "Validation unavailable" : "Validation finished" : "No validation result yet";
}
function Ss(e) {
	return e?.summary?.recommendation === "reload_may_be_enough" ? [...e.summary.reload_domains || []] : [];
}
function Cs(e) {
	return (e?.command || []).join(" ");
}
//#endregion
//#region src/components/ValidationSummaryCard.tsx
function ws({ validation: e, compact: t = !1, onReloadDomains: n }) {
	if (!e) return null;
	let r = e.summary || {}, i = bs(e), a = xs(e), o = Cs(e), s = r.affected_domains || [], c = r.changed_files || [], l = Ss(e), u = Hn([e.stdout, e.stderr].filter(Boolean).join("\n")).trim(), d = [r.session_title, r.session_id && !r.session_title ? r.session_id : ""].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, A.jsxs)("section", {
		className: `validation-card ${i} ${t ? "compact" : ""}`,
		children: [
			/* @__PURE__ */ (0, A.jsxs)("header", { children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: i === "error" ? "mdi:alert-circle-outline" : i === "restart" ? "mdi:restart-alert" : i === "warning" ? "mdi:reload-alert" : "mdi:check-circle-outline" }), /* @__PURE__ */ (0, A.jsxs)("div", { children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: a }), /* @__PURE__ */ (0, A.jsxs)("span", { children: [
				e.status || "unknown",
				e.returncode !== void 0 && e.returncode !== null ? ` · exit ${e.returncode}` : "",
				e.created_at ? ` · ${Wn(e.created_at)}` : ""
			] })] })] }),
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "validation-meta",
				children: [
					o ? /* @__PURE__ */ (0, A.jsxs)("span", {
						title: o,
						children: [/* @__PURE__ */ (0, A.jsx)("b", { children: "Command" }), o]
					}) : null,
					d ? /* @__PURE__ */ (0, A.jsxs)("span", {
						title: d,
						children: [/* @__PURE__ */ (0, A.jsx)("b", { children: "Chat" }), d]
					}) : null,
					e.created_at ? /* @__PURE__ */ (0, A.jsxs)("span", {
						title: Kn(e.created_at),
						children: [/* @__PURE__ */ (0, A.jsx)("b", { children: "Timestamp" }), Kn(e.created_at)]
					}) : null
				]
			}),
			s.length ? /* @__PURE__ */ (0, A.jsx)("div", {
				className: "validation-domains",
				"aria-label": "Affected Home Assistant domains",
				children: s.map((e) => /* @__PURE__ */ (0, A.jsx)("span", {
					title: (e.paths || []).join(", "),
					children: e.label || e.id
				}, e.id))
			}) : null,
			c.length && !t ? /* @__PURE__ */ (0, A.jsxs)("ul", {
				className: "validation-files",
				"aria-label": "Changed Home Assistant files",
				children: [c.slice(0, 8).map((e) => /* @__PURE__ */ (0, A.jsxs)("li", { children: [/* @__PURE__ */ (0, A.jsx)("b", { children: e.status || "changed" }), e.path] }, `${e.status}:${e.path}`)), c.length > 8 ? /* @__PURE__ */ (0, A.jsxs)("li", { children: [
					/* @__PURE__ */ (0, A.jsx)("b", { children: "more" }),
					c.length - 8,
					" additional files"
				] }) : null]
			}) : null,
			l.length && n ? /* @__PURE__ */ (0, A.jsx)("div", {
				className: "validation-actions",
				children: l.map((e) => /* @__PURE__ */ (0, A.jsxs)("button", {
					type: "button",
					className: "ghost",
					onClick: () => n([e]),
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:reload" }), /* @__PURE__ */ (0, A.jsxs)("span", { children: ["Reload ", Ts(e)] })]
				}, e))
			}) : null,
			u ? /* @__PURE__ */ (0, A.jsxs)("details", {
				className: "validation-output",
				open: !t && i === "error",
				children: [/* @__PURE__ */ (0, A.jsx)("summary", { children: "Validation output" }), /* @__PURE__ */ (0, A.jsx)("pre", { children: u })]
			}) : null
		]
	});
}
function Ts(e) {
	return {
		automations: "automations",
		scripts: "scripts",
		scenes: "scenes",
		themes: "themes"
	}[e] || e;
}
//#endregion
//#region src/components/GitDrawer.tsx
var Es = 180, Ds = [];
function Os(e) {
	let t = M((e) => e.gitChanges?.files ? sn(e.gitChanges.files) : e.gitChangedCount), n = M((e) => e.gitChanges?.files ? un(e.gitChanges.files, e.gitSelection) : 0);
	return /* @__PURE__ */ (0, A.jsxs)("aside", {
		className: "drawer",
		"aria-hidden": e.open === !1 ? "true" : "false",
		children: [
			/* @__PURE__ */ (0, A.jsxs)("header", {
				className: "drawer-header",
				children: [/* @__PURE__ */ (0, A.jsxs)("div", { children: [/* @__PURE__ */ (0, A.jsx)("h2", { children: "Git" }), /* @__PURE__ */ (0, A.jsxs)("span", { children: [
					t,
					" changed ",
					t === 1 ? "file" : "files",
					" · ",
					n,
					" selected"
				] })] }), /* @__PURE__ */ (0, A.jsxs)("div", {
					className: "drawer-actions",
					children: [/* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button",
						onClick: e.onRefresh,
						title: "Refresh changes",
						"aria-label": "Refresh changes",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:refresh" })
					}), /* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button",
						onClick: e.onClose,
						title: "Close Git panel",
						"aria-label": "Close Git panel",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:close" })
					})]
				})]
			}),
			/* @__PURE__ */ (0, A.jsx)("div", {
				className: "drawer-body git-review",
				children: /* @__PURE__ */ (0, A.jsx)(ks, { ...e })
			}),
			/* @__PURE__ */ (0, A.jsx)(Fs, { onCommit: e.onCommit })
		]
	});
}
function ks({ onToggleFile: e }) {
	let t = M((e) => e.gitLoading), n = M((e) => e.gitChanges), r = n?.files || Ds, i = (0, k.useMemo)(() => on(r), [r]), a = (0, k.useMemo)(() => an(i).flatMap((e) => [{
		type: "folder",
		folder: e.folder
	}, ...e.files.map((e) => ({
		type: "file",
		file: e
	}))]), [i]);
	return t && !n ? /* @__PURE__ */ (0, A.jsx)("div", {
		className: "loading-state",
		children: "Loading Git changes..."
	}) : n && n.ok === !1 && !n.files?.length ? /* @__PURE__ */ (0, A.jsx)("div", {
		className: "loading-state error",
		children: Hn(n.stderr || "Git reload failed.")
	}) : i.length ? /* @__PURE__ */ (0, A.jsx)(Co, {
		className: "git-virtual-list",
		data: a,
		itemContent: (t, n) => n.type === "folder" ? /* @__PURE__ */ (0, A.jsx)("h3", {
			className: "git-folder-heading",
			title: n.folder,
			children: n.folder
		}) : /* @__PURE__ */ (0, A.jsx)(As, {
			file: n.file,
			onToggleFile: e
		}, nn(n.file.path, n.file.old_path || ""))
	}) : /* @__PURE__ */ (0, A.jsx)("p", {
		className: "muted pad",
		children: t ? "Refreshing changes..." : "No changed files."
	});
}
function As({ file: e, onToggleFile: t, open: n, diff: r, loading: i = !1, selectable: a = !0, displayPath: o = "name" }) {
	let s = nn(e.path, e.old_path || ""), c = M((e) => e.openGitDiffKey === s), l = M((t) => t.gitFileDiffs[s] || (e.patch ? e : null)), u = M((e) => e.gitFileDiffLoading[s]), d = n ?? c, f = r === void 0 ? l : r, p = i || n === void 0 && !!u, m = (0, k.useMemo)(() => vn(f?.patch || ""), [f?.patch]), h = o === "path" ? e.path : e.display_name || rn(e.path).name, g = e.status !== "deleted", _ = String(e.status || "changed").toLowerCase();
	return /* @__PURE__ */ (0, A.jsxs)("section", {
		className: `diff-file ${d ? "open" : ""}`,
		"data-diff-key": s,
		children: [/* @__PURE__ */ (0, A.jsxs)("div", {
			className: `diff-card ${g ? "" : "no-line-stats"} ${a ? "" : "no-select"}`,
			onClick: () => t(e.path, e.old_path || ""),
			role: "button",
			tabIndex: 0,
			title: e.path,
			onKeyDown: (n) => {
				n.target instanceof HTMLInputElement || (n.key === "Enter" || n.key === " ") && (n.preventDefault(), t(e.path, e.old_path || ""));
			},
			children: [
				a ? /* @__PURE__ */ (0, A.jsx)(js, {
					file: e,
					displayName: h
				}) : null,
				/* @__PURE__ */ (0, A.jsxs)("span", {
					className: "diff-file-main",
					children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: h }), e.old_path ? /* @__PURE__ */ (0, A.jsxs)("span", { children: [
						e.old_path,
						" -> ",
						e.path
					] }) : null]
				}),
				g ? /* @__PURE__ */ (0, A.jsxs)("span", {
					className: "line-stats",
					children: [/* @__PURE__ */ (0, A.jsx)(Ps, {
						value: e.added_lines,
						type: "added"
					}), /* @__PURE__ */ (0, A.jsx)(Ps, {
						value: e.deleted_lines,
						type: "deleted"
					})]
				}) : null,
				/* @__PURE__ */ (0, A.jsx)("b", {
					className: `file-status ${_}`,
					children: /* @__PURE__ */ (0, A.jsx)(X, { icon: yn(_) })
				}),
				/* @__PURE__ */ (0, A.jsxs)("span", {
					className: "diff-open-action",
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: d ? "mdi:chevron-up" : "mdi:chevron-down" }), /* @__PURE__ */ (0, A.jsx)("span", { children: d ? "Hide" : "Diff" })]
				})
			]
		}), d ? /* @__PURE__ */ (0, A.jsxs)(A.Fragment, { children: [/* @__PURE__ */ (0, A.jsx)(Ms, {
			loading: !!p,
			lines: m
		}), f?.stderr || f?.patch_error ? /* @__PURE__ */ (0, A.jsx)("pre", {
			className: "diff-error",
			children: Hn(f.stderr || f.patch_error || "").trim()
		}) : null] }) : null]
	});
}
function js({ file: e, displayName: t }) {
	let n = nn(e.path, e.old_path || ""), r = M((e) => e.gitSelection[n] === !0), i = M((e) => e.setGitFileSelected);
	return /* @__PURE__ */ (0, A.jsx)("label", {
		className: "git-file-select",
		title: r ? "Deselect file" : "Select file",
		onClick: (e) => e.stopPropagation(),
		children: /* @__PURE__ */ (0, A.jsx)("input", {
			type: "checkbox",
			checked: r,
			"aria-label": `Select ${t}`,
			onChange: (t) => i(e, t.currentTarget.checked)
		})
	});
}
function Ms({ loading: e, lines: t }) {
	return e ? /* @__PURE__ */ (0, A.jsx)("div", {
		className: "diff-lines",
		children: /* @__PURE__ */ (0, A.jsx)("div", {
			className: "diff-empty",
			children: "Loading diff..."
		})
	}) : t.length ? t.length >= Es ? /* @__PURE__ */ (0, A.jsx)("div", {
		className: "diff-lines virtualized",
		children: /* @__PURE__ */ (0, A.jsx)(Co, {
			data: t,
			itemContent: (e, t) => /* @__PURE__ */ (0, A.jsx)(Ns, { line: t }, e)
		})
	}) : /* @__PURE__ */ (0, A.jsx)("div", {
		className: "diff-lines",
		children: t.map((e, t) => /* @__PURE__ */ (0, A.jsx)(Ns, { line: e }, t))
	}) : /* @__PURE__ */ (0, A.jsx)("div", {
		className: "diff-lines",
		children: /* @__PURE__ */ (0, A.jsx)("div", {
			className: "diff-empty",
			children: "No textual diff available."
		})
	});
}
function Ns({ line: e }) {
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: `diff-line ${e.type}`,
		children: [/* @__PURE__ */ (0, A.jsx)("span", {
			className: "marker",
			children: e.type === "added" ? "+" : e.type === "deleted" ? "-" : e.type === "hunk" ? "@" : ""
		}), /* @__PURE__ */ (0, A.jsx)("code", { children: e.content })]
	});
}
function Ps({ value: e, type: t }) {
	return e == null ? /* @__PURE__ */ (0, A.jsx)("span", {
		className: t,
		children: "--"
	}) : /* @__PURE__ */ (0, A.jsxs)("span", {
		className: t,
		children: [t === "added" ? "+" : "-", Number(e)]
	});
}
function Fs({ onCommit: e }) {
	let t = M((e) => e.commitMessage), n = M((e) => e.setCommitMessage), r = M((e) => e.commitRunning), i = M((e) => e.discardRunning), a = M((e) => e.setGitDiscardConfirming), o = M((e) => e.gitChanges?.files || Ds), s = M((e) => e.gitSelection), c = fn(o, s, r), l = fn(o, s, r || i);
	return /* @__PURE__ */ (0, A.jsxs)("form", {
		className: "commit-box",
		onSubmit: (n) => {
			n.preventDefault(), e(t);
		},
		children: [
			/* @__PURE__ */ (0, A.jsx)("textarea", {
				name: "commit-message",
				placeholder: "Commit message",
				rows: 1,
				disabled: r,
				value: t,
				onChange: (e) => n(e.target.value)
			}),
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "git-action-row",
				children: [/* @__PURE__ */ (0, A.jsxs)("button", {
					type: "submit",
					disabled: c,
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: r ? "mdi:progress-clock" : "mdi:source-commit" }), /* @__PURE__ */ (0, A.jsx)("span", { children: r ? "Pushing..." : "Commit & Push" })]
				}), /* @__PURE__ */ (0, A.jsxs)("button", {
					type: "button",
					className: "danger",
					disabled: l,
					onClick: () => a(!0),
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:trash-can-outline" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Discard selected" })]
				})]
			}),
			/* @__PURE__ */ (0, A.jsx)(Is, {})
		]
	});
}
function Is() {
	let e = M((e) => e.gitOperationResult);
	if (!e) return null;
	let t = e.discarded_paths || e.selected_paths || [], n = Hn([
		e.stdout,
		e.stderr,
		...(e.results || []).flatMap((e) => [e.stdout, e.stderr])
	].filter(Boolean).join("\n")).trim(), r = e.ok ? e.step === "discard" ? "Discarded selected files" : "Commit pushed" : `${e.step || "Git operation"} failed`;
	return /* @__PURE__ */ (0, A.jsxs)("section", {
		className: `git-operation-result ${e.ok ? "success" : "error"}`,
		children: [
			/* @__PURE__ */ (0, A.jsx)("strong", { children: r }),
			t.length ? /* @__PURE__ */ (0, A.jsx)("span", { children: Ls(t) }) : null,
			n ? /* @__PURE__ */ (0, A.jsx)("pre", { children: n }) : null
		]
	});
}
function Ls(e) {
	let t = e.slice(0, 4).join(", "), n = e.length - 4;
	return n > 0 ? `${t} and ${n} more` : t;
}
//#endregion
//#region src/features/chat/markdown.tsx
function Rs(e) {
	let t = String(e ?? "").trim();
	return t && (/^(https?:|mailto:)/i.test(t) || t.startsWith("/") || t.startsWith("#")) ? t : "";
}
function zs(e) {
	let t = [], n = /(`([^`]+)`|\[([^\]\n]+)\]\(([^)\s]+)\)|(\*\*|__)(.+?)\5|(\*|_)([^*_]+?)\7)/g, r = 0, i;
	for (; (i = n.exec(e)) !== null;) {
		if (i.index > r && t.push(e.slice(r, i.index)), i[2] !== void 0) t.push(/* @__PURE__ */ (0, A.jsx)("code", { children: i[2] }, t.length));
		else if (i[3] !== void 0) {
			let e = Rs(i[4]);
			t.push(e ? /* @__PURE__ */ (0, A.jsx)("a", {
				href: e,
				target: "_blank",
				rel: "noreferrer",
				children: i[3]
			}, t.length) : `${i[3]} (${i[4]})`);
		} else i[6] === void 0 ? i[8] !== void 0 && t.push(/* @__PURE__ */ (0, A.jsx)("em", { children: i[8] }, t.length)) : t.push(/* @__PURE__ */ (0, A.jsx)("strong", { children: i[6] }, t.length));
		r = n.lastIndex;
	}
	return r < e.length && t.push(e.slice(r)), t;
}
function Bs({ value: e }) {
	let t = e.split("\n"), n = [], r = [], i = null, a = [], o = () => {
		r.length && (n.push(/* @__PURE__ */ (0, A.jsx)("p", { children: r.map((e, t) => /* @__PURE__ */ (0, A.jsxs)(k.Fragment, { children: [t > 0 ? /* @__PURE__ */ (0, A.jsx)("br", {}) : null, zs(e)] }, t)) }, n.length)), r = []);
	}, s = () => {
		if (!i) return;
		let e = i.items.map((e, t) => /* @__PURE__ */ (0, A.jsx)("li", { children: zs(e) }, t));
		n.push(i.type === "ul" ? /* @__PURE__ */ (0, A.jsx)("ul", { children: e }, n.length) : /* @__PURE__ */ (0, A.jsx)("ol", { children: e }, n.length)), i = null;
	}, c = () => {
		a.length && (n.push(/* @__PURE__ */ (0, A.jsx)("blockquote", { children: a.map((e, t) => /* @__PURE__ */ (0, A.jsxs)(k.Fragment, { children: [t > 0 ? /* @__PURE__ */ (0, A.jsx)("br", {}) : null, zs(e)] }, t)) }, n.length)), a = []);
	}, l = () => {
		o(), s(), c();
	};
	return t.forEach((e) => {
		let t = e.trim();
		if (!t) {
			l();
			return;
		}
		let u = t.match(/^(#{1,6})\s+(.+)$/);
		if (u) {
			l();
			let e = `h${u[1].length}`;
			n.push(k.createElement(e, { key: n.length }, zs(u[2])));
			return;
		}
		if (/^(-{3,}|\*{3,}|_{3,})$/.test(t)) {
			l(), n.push(/* @__PURE__ */ (0, A.jsx)("hr", {}, n.length));
			return;
		}
		let d = t.match(/^>\s?(.*)$/);
		if (d) {
			o(), s(), a.push(d[1]);
			return;
		}
		let f = t.match(/^[-*+]\s+(.+)$/), p = t.match(/^\d+[.)]\s+(.+)$/);
		if (f || p) {
			o(), c();
			let e = f ? "ul" : "ol";
			(!i || i.type !== e) && s(), i ||= {
				type: e,
				items: []
			}, i.items.push((f || p)?.[1] || "");
			return;
		}
		s(), c(), r.push(e);
	}), l(), /* @__PURE__ */ (0, A.jsx)(A.Fragment, { children: n });
}
var Vs = k.memo(function({ value: e }) {
	let t = String(e ?? "").replaceAll("\r\n", "\n").replaceAll("\r", "\n");
	if (!t.trim()) return null;
	let n = [], r = /```([^\n`]*)\n?([\s\S]*?)```/g, i = 0, a;
	for (; (a = r.exec(t)) !== null;) {
		a.index > i && n.push(/* @__PURE__ */ (0, A.jsx)(Bs, { value: t.slice(i, a.index) }, n.length));
		let e = a[1]?.trim();
		n.push(/* @__PURE__ */ (0, A.jsx)("pre", { children: /* @__PURE__ */ (0, A.jsx)("code", {
			className: e ? `language-${e}` : void 0,
			children: a[2] || ""
		}) }, n.length)), i = r.lastIndex;
	}
	return i < t.length && n.push(/* @__PURE__ */ (0, A.jsx)(Bs, { value: t.slice(i) }, n.length)), /* @__PURE__ */ (0, A.jsx)(A.Fragment, { children: n });
}), Hs = 20, Us = [
	{
		id: "create_automation",
		label: "Create automation",
		icon: "mdi:robot-industrial-outline",
		fields: [
			{
				id: "goal",
				label: "Goal",
				required: !0,
				multiline: !0,
				placeholder: "Turn on the kitchen light when motion is detected after sunset."
			},
			{
				id: "trigger",
				label: "Trigger",
				placeholder: "Motion is detected in the kitchen after sunset."
			},
			{
				id: "actions",
				label: "Action",
				placeholder: "Turn on light.kitchen at 60%."
			},
			{
				id: "details",
				label: "Details",
				multiline: !0,
				placeholder: "Optional conditions, notifications, timing, or edge cases."
			}
		]
	},
	{
		id: "fix_automation",
		label: "Fix automation",
		icon: "mdi:wrench-clock",
		requiredContextKinds: ["automation", "script"],
		fields: [
			{
				id: "issue",
				label: "Issue",
				required: !0,
				multiline: !0,
				placeholder: "It no longer triggers when the door opens."
			},
			{
				id: "expected",
				label: "Expected behavior",
				multiline: !0
			},
			{
				id: "reload",
				label: "Reload expectation",
				placeholder: "Tell me whether automations/scripts need reload.",
				control: {
					type: "select",
					options: [
						{
							label: "Recommend automation/script reload",
							value: "Recommend reloading automations/scripts if YAML changed."
						},
						{
							label: "No reload needed",
							value: "No reload should be needed unless files are changed."
						},
						{
							label: "Mention restart only if required",
							value: "Mention a Home Assistant Core restart only if the change truly requires it."
						}
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
			{
				id: "goal",
				label: "Goal",
				required: !0,
				multiline: !0,
				placeholder: "Set movie mode in the living room."
			},
			{
				id: "target",
				label: "Targets",
				placeholder: "light.living_room, media_player.tv",
				control: {
					type: "entity",
					domains: [
						"light",
						"switch",
						"fan",
						"cover",
						"climate",
						"media_player",
						"lock",
						"scene",
						"script",
						"input_boolean",
						"input_button",
						"button"
					],
					multiple: !0
				}
			},
			{
				id: "actions",
				label: "Actions",
				placeholder: "Dim lights, close covers, set TV input.",
				control: { type: "action" }
			},
			{
				id: "fields",
				label: "Script fields",
				placeholder: "Optional variables to expose"
			}
		]
	},
	{
		id: "convert_blueprint",
		label: "Convert to blueprint",
		icon: "mdi:file-tree-outline",
		requiredContextKinds: ["automation", "script"],
		fields: [
			{
				id: "source",
				label: "Source",
				required: !0,
				placeholder: "automation.porch_light",
				control: {
					type: "entity",
					domains: ["automation", "script"]
				}
			},
			{
				id: "goal",
				label: "Blueprint goal",
				multiline: !0,
				placeholder: "Make entity IDs configurable for other rooms."
			},
			{
				id: "inputs",
				label: "Inputs",
				multiline: !0,
				placeholder: "motion sensor, light target, delay"
			}
		]
	},
	{
		id: "explain_simplify",
		label: "Explain or simplify",
		icon: "mdi:text-box-search-outline",
		requiredContextKinds: ["automation", "script"],
		fields: [
			{
				id: "source",
				label: "Source",
				placeholder: "automation.porch_light",
				control: {
					type: "entity",
					domains: ["automation", "script"]
				}
			},
			{
				id: "goal",
				label: "Focus",
				multiline: !0,
				placeholder: "Explain what it does and simplify duplicate conditions."
			},
			{
				id: "constraints",
				label: "Keep behavior",
				placeholder: "Preserve current behavior unless clearly broken."
			}
		]
	}
];
function Ws(e) {
	let t = Us.find((t) => t.id === e);
	if (!t) throw Error(`Unknown builder template: ${e}`);
	return t;
}
function Gs(e, t, n = []) {
	let r = Ws(e), i = r.fields.filter((e) => e.required && !nc(t, e.id)).map((e) => rc(e));
	return r.requiredContextKinds?.length && !$s(n, r.requiredContextKinds) && i.push("Select an automation or script as context."), i;
}
function Ks(e, t, n = []) {
	let r = Gs(e, t, n);
	if (r.length) throw Error(r.join(" "));
	let i = Ws(e), a = Qs(i, t);
	return qs(Zs(i, t, n), n, {
		runPrompt: Ys(i, a, ec(n)),
		metadata: { builder: {
			template_id: i.id,
			template_label: i.label,
			selections: a
		} }
	});
}
function qs(e, t, n) {
	return {
		prompt: e.trim(),
		context: ec(t),
		runPrompt: n.runPrompt.trim(),
		metadata: n.metadata
	};
}
function Js(e) {
	let t = e?.builder;
	if (!t || typeof t != "object" || Array.isArray(t)) return null;
	let n = t, r = String(n.template_label || "").trim(), i = Array.isArray(n.selections) ? n.selections.flatMap((e) => {
		if (!e || typeof e != "object" || Array.isArray(e)) return [];
		let t = e, n = String(t.label || "").trim(), r = String(t.value || "").trim();
		return n && r ? [{
			label: n,
			value: r
		}] : [];
	}) : [];
	return r ? {
		label: r,
		selections: i
	} : null;
}
function Ys(e, t, n) {
	let r = [
		Xs(e.id),
		"",
		"Use the selected Home Assistant context and inspect the workspace before editing.",
		"Keep edits minimal and scoped to the automation, script, blueprint, or related config files needed for this request.",
		"Do not bypass existing command approvals or restart approval flow."
	];
	return ic(e.id) && (r.push("Validate the Home Assistant YAML when possible and report the validation result."), r.push("Prefer reload recommendations for automations/scripts; recommend a Home Assistant Core restart only when required.")), n.length && (r.push("", "Selected context:"), n.forEach((e) => {
		r.push(`- ${e.kind}: ${e.label}${e.subtitle ? ` (${e.subtitle})` : ""}`);
	})), t.length && (r.push("", "Builder inputs:"), t.forEach((e) => {
		r.push(`- ${e.label}: ${e.value}`);
	})), r.push("", "After the run, surface changed files, validation status, and any reload or restart recommendation using the existing HA Codex mechanisms."), r.join("\n");
}
function Xs(e) {
	switch (e) {
		case "create_automation": return "Create a Home Assistant automation from these structured inputs.";
		case "fix_automation": return "Fix the selected Home Assistant automation or script.";
		case "create_script": return "Create a Home Assistant script from these structured inputs.";
		case "convert_blueprint": return "Convert the selected automation or script into a Home Assistant blueprint and preserve the current behavior.";
		case "explain_simplify": return "Explain or simplify the selected Home Assistant automation or script.";
	}
}
function Zs(e, t, n) {
	let r = nc(t, "goal"), i = nc(t, "source") || tc(n, e.requiredContextKinds);
	switch (e.id) {
		case "create_automation": return `Create automation: ${r}`;
		case "fix_automation": return `Fix automation: ${nc(t, "issue")}`;
		case "create_script": return `Create script: ${r}`;
		case "convert_blueprint": return `Convert to blueprint: ${i || "selected automation/script"}`;
		case "explain_simplify": return `Explain or simplify: ${i || "selected automation/script"}`;
	}
}
function Qs(e, t) {
	return e.fields.flatMap((e) => {
		let n = nc(t, e.id);
		return n ? [{
			label: e.label,
			value: n
		}] : [];
	});
}
function $s(e, t) {
	return e.some((e) => t.includes(e.kind));
}
function ec(e) {
	return e.slice(0, Hs).map((e) => ({
		id: e.id,
		kind: e.kind,
		label: e.label,
		...e.subtitle ? { subtitle: e.subtitle } : {},
		...e.payload ? { payload: { ...e.payload } } : {}
	}));
}
function tc(e, t) {
	return e.find((e) => !t?.length || t.includes(e.kind))?.label || "";
}
function nc(e, t) {
	return String(e[t] || "").trim();
}
function rc(e) {
	return e.id === "issue" ? "Describe what is broken." : `${e.label} is required.`;
}
function ic(e) {
	return e === "create_automation" || e === "fix_automation" || e === "create_script";
}
//#endregion
//#region src/components/Message.tsx
var ac = (0, k.memo)(function({ api: e, message: t, sessionId: n, canRetry: r, onCopy: i, onRetry: a, onRollback: o, onValidationReload: s }) {
	let c = t.content || "", l = String(t.metadata?.kind || "") === "error", u = !!at(t), d = Array.isArray(t.metadata?.file_changes) ? t.metadata.file_changes : [], f = ct(st(c), d) || (l ? xc(t) : "") || (u ? "Codex needs direction before continuing." : ""), p = String(t.metadata?.kind || t.role || "message"), m = t.role === "event" && !!t.metadata?.command, h = m ? "command" : t.role === "event" ? "response" : t.role || "message", g = {
		user: "mdi:account-circle",
		assistant: "mdi:robot",
		event: "mdi:progress-wrench",
		system: "mdi:information-outline"
	}[String(t.role)] || "mdi:message-text-outline", _ = {
		user: "message-row-user",
		assistant: "message-row-codex"
	}[String(t.role)] || "", v = {
		user: "message-style-user",
		assistant: "message-style-codex",
		event: "message-style-event",
		system: "message-style-system",
		action: "message-style-action"
	}[String(t.metadata?.kind || t.role)] || "", y = l ? "message-style-error" : m ? "message-style-command" : v, b = r && l, x = oc(t), S = Lt(t.metadata), C = Js(t.metadata), w = M((e) => e.settings.defaults.tool_visibility), T = sc(t, j((e) => e.chatsById[n]?.metadata?.run_settings?.tool_visibility) || w), ee = d.length === 0;
	if (m) {
		let e = String(t.metadata?.command || f);
		return /* @__PURE__ */ (0, A.jsx)("div", {
			className: `message-row ${_ || "message-row-center"}`,
			children: /* @__PURE__ */ (0, A.jsxs)("article", {
				className: `message ${t.role || ""} ${y} ${p} tool-visibility-${T}`,
				children: [/* @__PURE__ */ (0, A.jsxs)("div", {
					className: "command-line",
					children: [
						/* @__PURE__ */ (0, A.jsx)("code", {
							className: "command-text",
							children: e
						}),
						x,
						/* @__PURE__ */ (0, A.jsx)("button", {
							className: "icon-button copy-button",
							onClick: () => i(e),
							title: "Copy",
							"aria-label": "Copy command",
							children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:content-copy" })
						})
					]
				}), /* @__PURE__ */ (0, A.jsx)(cc, {
					raw: t.metadata?.raw,
					visible: T === "verbose"
				})]
			})
		});
	}
	return /* @__PURE__ */ (0, A.jsx)("div", {
		className: `message-row ${_ || "message-row-center"}`,
		children: /* @__PURE__ */ (0, A.jsxs)("article", {
			className: `message ${t.role || ""} ${y} ${p} tool-visibility-${T}`,
			children: [
				/* @__PURE__ */ (0, A.jsxs)("div", {
					className: "role",
					children: [
						/* @__PURE__ */ (0, A.jsx)(X, { icon: g }),
						/* @__PURE__ */ (0, A.jsx)("span", { children: h }),
						x
					]
				}),
				/* @__PURE__ */ (0, A.jsx)("div", {
					className: "markdown-body",
					children: /* @__PURE__ */ (0, A.jsx)(Vs, { value: f })
				}),
				/* @__PURE__ */ (0, A.jsx)(uc, { summary: C }),
				/* @__PURE__ */ (0, A.jsx)(dc, { attachments: S }),
				/* @__PURE__ */ (0, A.jsx)(lc, {
					validation: t.metadata?.validation,
					onReloadDomains: s
				}),
				/* @__PURE__ */ (0, A.jsx)(mc, {
					api: e,
					changes: d
				}),
				/* @__PURE__ */ (0, A.jsx)(fc, {
					sessionId: n,
					rollback: t.metadata?.rollback,
					onRollback: o
				}),
				/* @__PURE__ */ (0, A.jsx)(cc, {
					raw: t.metadata?.raw,
					visible: T === "verbose"
				}),
				ee ? /* @__PURE__ */ (0, A.jsx)("button", {
					className: "icon-button copy-button",
					onClick: () => i(f),
					title: "Copy",
					"aria-label": "Copy message",
					children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:content-copy" })
				}) : null,
				b ? /* @__PURE__ */ (0, A.jsx)("button", {
					className: "icon-button retry-button",
					onClick: () => a(n),
					title: "Retry / continue",
					"aria-label": "Retry / continue",
					children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:refresh" })
				}) : null
			]
		})
	});
});
function oc(e) {
	return e.created_at ? /* @__PURE__ */ (0, A.jsx)("span", {
		className: "message-time",
		title: Kn(e.created_at),
		children: Wn(e.created_at)
	}) : null;
}
function sc(e, t) {
	let n = e.metadata?.run_settings?.resolved?.tool_visibility || t;
	return n === "compact" || n === "verbose" ? n : "normal";
}
function cc({ raw: e, visible: t }) {
	return !t || !e ? null : /* @__PURE__ */ (0, A.jsxs)("details", {
		className: "raw-event-details",
		children: [/* @__PURE__ */ (0, A.jsx)("summary", { children: "Raw event" }), /* @__PURE__ */ (0, A.jsx)("pre", { children: JSON.stringify(e, null, 2) })]
	});
}
function lc({ validation: e, onReloadDomains: t }) {
	return e ? /* @__PURE__ */ (0, A.jsx)(ws, {
		validation: e,
		onReloadDomains: t,
		compact: !0
	}) : null;
}
function uc({ summary: e }) {
	return e ? /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "message-builder-summary",
		"aria-label": "Builder mode",
		children: [/* @__PURE__ */ (0, A.jsxs)("span", {
			className: "message-builder-chip strong",
			children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:robot-industrial-outline" }), e.label]
		}), e.selections.slice(0, 4).map((e) => /* @__PURE__ */ (0, A.jsxs)("span", {
			className: "message-builder-chip",
			children: [/* @__PURE__ */ (0, A.jsx)("b", { children: e.label }), /* @__PURE__ */ (0, A.jsx)("span", { children: e.value })]
		}, `${e.label}:${e.value}`))]
	}) : null;
}
function dc({ attachments: e }) {
	return e.length ? /* @__PURE__ */ (0, A.jsx)("div", {
		className: "message-context-attachments",
		"aria-label": "Attached context",
		children: e.map((e) => /* @__PURE__ */ (0, A.jsxs)("span", {
			className: "message-context-chip",
			title: e.subtitle || e.label,
			children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: zt(e.kind) }), /* @__PURE__ */ (0, A.jsx)("span", { children: e.label })]
		}, `${e.kind}:${e.id}`))
	}) : null;
}
function fc({ sessionId: e, rollback: t, onRollback: n }) {
	return t?.checkpoint_id ? t.status === "available" ? /* @__PURE__ */ (0, A.jsx)("div", {
		className: "rollback-action",
		children: /* @__PURE__ */ (0, A.jsxs)("button", {
			type: "button",
			className: "danger",
			onClick: () => n(e, t.checkpoint_id || ""),
			children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:restore" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Rollback this run" })]
		})
	}) : t.status === "rolled_back" ? /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "rollback-note",
		children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:check-circle-outline" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Run rolled back" })]
	}) : t.status === "blocked" ? /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "rollback-note blocked",
		children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:alert-circle-outline" }), /* @__PURE__ */ (0, A.jsx)("span", { children: t.reason || "Rollback needs manual review" })]
	}) : null : null;
}
var pc = 6;
function mc({ api: e, changes: t }) {
	let [n, r] = (0, k.useState)(!1), [i, a] = (0, k.useState)(null), [o, s] = (0, k.useState)(0), c = hc(t);
	if ((0, k.useEffect)(() => {
		if (!t.length) {
			a(null);
			return;
		}
		let n = !1;
		return a(null), e.gitChanges().then((e) => {
			n || (a(e.files || []), s((e) => e + 1));
		}).catch(() => {
			n || (a([]), s((e) => e + 1));
		}), () => {
			n = !0;
		};
	}, [e, c]), !t.length) return null;
	let l = gc(t, i), u = n ? l : l.slice(0, pc), d = Math.max(0, l.length - u.length), f = `${c}:${o}`;
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "message-file-changes",
		children: [
			/* @__PURE__ */ (0, A.jsx)("div", {
				className: "message-file-changes-head",
				children: /* @__PURE__ */ (0, A.jsxs)("span", { children: [
					l.length,
					" changed ",
					l.length === 1 ? "file" : "files"
				] })
			}),
			u.map((t) => /* @__PURE__ */ (0, A.jsx)(bc, {
				api: e,
				file: t,
				version: f
			}, `${t.old_path || ""}:${t.path}`)),
			l.length > pc ? /* @__PURE__ */ (0, A.jsx)("div", {
				className: "message-file-changes-toggle",
				children: /* @__PURE__ */ (0, A.jsxs)("button", {
					type: "button",
					className: "secondary",
					onClick: () => r((e) => !e),
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: n ? "mdi:chevron-up" : "mdi:chevron-down" }), /* @__PURE__ */ (0, A.jsx)("span", { children: n ? "Show fewer" : `Show ${d} more` })]
				})
			}) : null
		]
	});
}
function hc(e) {
	return e.map((e) => [
		vc(e.old_path || ""),
		vc(e.path),
		e.status || "",
		e.code || "",
		e.added_lines ?? "",
		e.deleted_lines ?? "",
		e.patch || "",
		e.patch_error || "",
		e.stderr || ""
	].join("\0")).join("");
}
function gc(e, t) {
	let n = /* @__PURE__ */ new Map();
	return (t || []).forEach((e) => {
		n.set(_c(e.path, e.old_path), e);
	}), e.map((e) => {
		let t = n.get(_c(e.path, e.old_path));
		return t ? {
			...e,
			...t,
			path: t.path || e.path,
			old_path: t.old_path || e.old_path
		} : e;
	}).filter((e) => !yc(e.path));
}
function _c(e, t = "") {
	return nn(vc(e), vc(t));
}
function vc(e = "") {
	return String(e || "").replace(/\\/g, "/").replace(/^\/+/, "").replace(/^homeassistant\//, "").replace(/^config\//, "");
}
function yc(e) {
	return vc(e).split("/").includes("dist");
}
function bc({ api: e, file: t, version: n }) {
	let [r, i] = (0, k.useState)(!1), [a, o] = (0, k.useState)(t.patch ? t : null), [s, c] = (0, k.useState)(!1), l = M((e) => e.showToast), u = `${n}:${_c(t.path, t.old_path || "")}`, d = a ? {
		...t,
		...a,
		path: a.path || t.path,
		old_path: a.old_path || t.old_path
	} : t;
	return (0, k.useEffect)(() => {
		o(t.patch ? t : null), c(!1);
	}, [u]), (0, k.useEffect)(() => {
		if (!r || a || s) return;
		let n = !1;
		return c(!0), e.gitFileDiff(t.path, t.old_path || "").then((e) => {
			n || o(e);
		}).catch((e) => {
			if (!n) {
				let n = N(e);
				o({
					...t,
					patch: "",
					patch_error: n
				}), l(`Diff load failed: ${n}`, "error");
			}
		}).finally(() => {
			n || c(!1);
		}), () => {
			n = !0;
		};
	}, [
		e,
		u,
		r,
		t.path,
		t.old_path,
		l
	]), /* @__PURE__ */ (0, A.jsx)(As, {
		file: d,
		open: r,
		diff: a,
		loading: s,
		selectable: !1,
		displayPath: "path",
		onToggleFile: () => {
			i((e) => !e);
		}
	});
}
function xc(e) {
	let t = e.metadata?.error || e.metadata?.stderr || e.metadata?.message;
	return t ? String(t).trim() : "Codex reported an error without additional details.";
}
//#endregion
//#region src/components/ContextPicker.tsx
var Sc = [
	{
		kind: "entity",
		label: "Entities",
		icon: "mdi:home-assistant"
	},
	{
		kind: "device",
		label: "Devices",
		icon: "mdi:devices"
	},
	{
		kind: "area",
		label: "Areas",
		icon: "mdi:floor-plan"
	},
	{
		kind: "automation",
		label: "Automations",
		icon: "mdi:robot-industrial-outline"
	},
	{
		kind: "script",
		label: "Scripts",
		icon: "mdi:script-text-outline"
	},
	{
		kind: "log",
		label: "Logs",
		icon: "mdi:text-box-search-outline"
	},
	{
		kind: "config_file",
		label: "Config files",
		icon: "mdi:file-document-outline"
	}
];
function Cc(e) {
	let { api: t, hass: n, open: r, selected: i, onAdd: a, onRemove: o, onClear: s, onClose: c } = e, [l, u] = (0, k.useState)("entity"), [d, f] = (0, k.useState)(""), [p, m] = (0, k.useState)([]), [h, g] = (0, k.useState)([]), [_, v] = (0, k.useState)([]), [y, b] = (0, k.useState)([]), [x, S] = (0, k.useState)([]), [C, w] = (0, k.useState)(!1), [T, ee] = (0, k.useState)([]), [te, ne] = (0, k.useState)(null), re = (0, k.useMemo)(() => new Set(i.map(jt)), [i]);
	(0, k.useEffect)(() => {
		if (!r) return;
		let e = !1;
		return w(!0), ee([]), Promise.allSettled([
			t.entityRegistry(),
			t.deviceRegistry(),
			t.areaRegistry(),
			t.contextLogs(200),
			t.contextConfigFiles()
		]).then((t) => {
			if (e) return;
			let n = [], [r, i, a, o, s] = t;
			r.status === "fulfilled" ? m(r.value || []) : n.push(`Entity registry: ${N(r.reason)}`), i.status === "fulfilled" ? g(i.value || []) : n.push(`Device registry: ${N(i.reason)}`), a.status === "fulfilled" ? v(a.value || []) : n.push(`Area registry: ${N(a.reason)}`), o.status === "fulfilled" ? b(o.value.logs || []) : n.push(`Logs: ${N(o.reason)}`), s.status === "fulfilled" ? S(s.value.files || []) : n.push(`Config files: ${N(s.reason)}`), ee(n), w(!1);
		}), () => {
			e = !0;
		};
	}, [t, r]), (0, k.useEffect)(() => {
		r || f("");
	}, [r]), (0, k.useEffect)(() => {
		if (!r) return;
		let e = (e) => {
			e.key === "Escape" && c();
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [c, r]);
	let ie = (0, k.useMemo)(() => {
		let e = new Map(_.map((e) => [e.area_id, e])), t = new Map(h.map((e) => [e.id, e])), r = new Map(p.map((e) => [e.entity_id, e])), i = n?.states || {}, a = Object.entries(i).map(([n, i]) => Tc(n, i, r, t, e));
		return {
			entity: a.filter((e) => {
				let t = String(e.payload?.domain || "");
				return t !== "automation" && t !== "script";
			}),
			automation: a.filter((e) => e.payload?.domain === "automation").map((e) => ({
				...e,
				kind: "automation",
				id: `automation:${e.id}`
			})),
			script: a.filter((e) => e.payload?.domain === "script").map((e) => ({
				...e,
				kind: "script",
				id: `script:${e.id}`
			})),
			device: h.map((t) => Ec(t, e)),
			area: _.map(Dc),
			log: y.map(Oc),
			config_file: x.map(kc)
		};
	}, [
		_,
		x,
		h,
		p,
		n?.states,
		y
	]), ae = (0, k.useMemo)(() => {
		let e = d.trim().toLowerCase(), t = ie[l] || [];
		return e ? t.filter((t) => [
			t.label,
			t.subtitle,
			t.id
		].some((t) => String(t || "").toLowerCase().includes(e))) : t;
	}, [
		l,
		ie,
		d
	]);
	if (!r) return null;
	let oe = i.length >= 20, se = async (e) => {
		let n = jt(e);
		if (re.has(n)) {
			o(n);
			return;
		}
		if (oe) return;
		if (e.kind !== "config_file") {
			a(e);
			return;
		}
		let r = String(e.payload?.path || e.id);
		ne(r);
		try {
			let n = await t.contextConfigFile(r);
			a({
				...e,
				subtitle: `${Nc(n.size || 0)}${n.truncated ? " truncated" : ""}`,
				payload: {
					path: n.path,
					size: n.size,
					modified: n.modified,
					content: n.content,
					truncated: !!n.truncated
				}
			});
		} catch (e) {
			ee((t) => [`Config file ${r}: ${N(e)}`, ...t].slice(0, 4));
		} finally {
			ne(null);
		}
	};
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "modal-backdrop context-modal-backdrop",
		role: "presentation",
		children: [/* @__PURE__ */ (0, A.jsx)("button", {
			className: "modal-scrim",
			type: "button",
			onClick: c,
			"aria-label": "Close context picker"
		}), /* @__PURE__ */ (0, A.jsxs)("section", {
			className: "modal context-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Add context",
			children: [
				/* @__PURE__ */ (0, A.jsxs)("header", {
					className: "modal-header",
					children: [/* @__PURE__ */ (0, A.jsx)("h2", { children: "Add context" }), /* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button",
						type: "button",
						onClick: c,
						title: "Close",
						"aria-label": "Close context picker",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:close" })
					})]
				}),
				/* @__PURE__ */ (0, A.jsx)("nav", {
					className: "modal-tabs context-tabs",
					"aria-label": "Context type",
					children: Sc.map((e) => /* @__PURE__ */ (0, A.jsxs)("button", {
						className: l === e.kind ? "active" : "",
						type: "button",
						onClick: () => u(e.kind),
						children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: e.icon }), /* @__PURE__ */ (0, A.jsx)("span", { children: e.label })]
					}, e.kind))
				}),
				/* @__PURE__ */ (0, A.jsxs)("div", {
					className: "context-toolbar",
					children: [
						/* @__PURE__ */ (0, A.jsx)("input", {
							value: d,
							onChange: (e) => f(e.target.value),
							placeholder: "Search",
							"aria-label": "Search context"
						}),
						/* @__PURE__ */ (0, A.jsxs)("span", { children: [
							i.length,
							"/",
							20
						] }),
						i.length ? /* @__PURE__ */ (0, A.jsx)("button", {
							className: "ghost",
							type: "button",
							onClick: s,
							children: "Clear"
						}) : null
					]
				}),
				T.length ? /* @__PURE__ */ (0, A.jsx)("div", {
					className: "context-errors",
					role: "status",
					children: T.slice(0, 3).map((e) => /* @__PURE__ */ (0, A.jsx)("p", { children: e }, e))
				}) : null,
				/* @__PURE__ */ (0, A.jsx)("div", {
					className: "context-list",
					"aria-busy": C,
					children: C ? /* @__PURE__ */ (0, A.jsx)("div", {
						className: "context-empty",
						children: "Loading"
					}) : ae.length ? ae.map((e) => {
						let t = jt(e), n = re.has(t), r = !n && oe, i = te === e.payload?.path;
						return /* @__PURE__ */ (0, A.jsxs)("button", {
							className: `context-row ${n ? "selected" : ""}`,
							disabled: r || i,
							type: "button",
							onClick: () => void se(e),
							children: [
								/* @__PURE__ */ (0, A.jsx)("span", {
									className: "context-checkbox",
									"aria-hidden": "true",
									children: n ? /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:check" }) : null
								}),
								/* @__PURE__ */ (0, A.jsx)(X, {
									className: "context-kind-icon",
									icon: Mc(e.kind)
								}),
								/* @__PURE__ */ (0, A.jsxs)("span", {
									className: "context-row-main",
									children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: e.label }), e.subtitle ? /* @__PURE__ */ (0, A.jsx)("small", { children: e.subtitle }) : null]
								}),
								i ? /* @__PURE__ */ (0, A.jsx)("span", {
									className: "context-row-status",
									children: "Loading"
								}) : null
							]
						}, t);
					}) : /* @__PURE__ */ (0, A.jsx)("div", {
						className: "context-empty",
						children: "No matches"
					})
				})
			]
		})]
	});
}
function wc({ items: e, onRemove: t, onClear: n }) {
	return e.length ? /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "context-chips",
		"aria-label": "Selected context",
		children: [e.map((e) => /* @__PURE__ */ (0, A.jsxs)("button", {
			className: "context-chip",
			type: "button",
			onClick: () => t(jt(e)),
			title: e.subtitle || e.label,
			children: [
				/* @__PURE__ */ (0, A.jsx)(X, { icon: Mc(e.kind) }),
				/* @__PURE__ */ (0, A.jsx)("span", { children: e.label }),
				/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:close" })
			]
		}, jt(e))), /* @__PURE__ */ (0, A.jsx)("button", {
			className: "context-clear",
			type: "button",
			onClick: n,
			children: "Clear"
		})]
	}) : null;
}
function Tc(e, t, n, r, i) {
	let a = n.get(e), o = a?.device_id ? r.get(a.device_id) : void 0, s = a?.area_id || o?.area_id || null, c = s ? i.get(s) : void 0, l = Ac(t.attributes || {}), u = String(l.friendly_name || a?.name || a?.original_name || e), d = e.split(".")[0] || "entity";
	return {
		id: e,
		kind: "entity",
		label: u,
		subtitle: [
			e,
			t.state ? `state ${t.state}` : "unknown",
			c?.name,
			jc(o)
		].filter(Boolean).join(" - "),
		payload: {
			entity_id: e,
			domain: d,
			state: t.state,
			friendly_name: u,
			area: c?.name || null,
			device: jc(o) || null,
			attributes: l,
			last_changed: t.last_changed,
			last_updated: t.last_updated
		}
	};
}
function Ec(e, t) {
	let n = jc(e) || e.id, r = e.area_id ? t.get(e.area_id) : void 0;
	return {
		id: e.id,
		kind: "device",
		label: n,
		subtitle: [
			e.manufacturer,
			e.model,
			r?.name
		].filter(Boolean).join(" - "),
		payload: {
			device_id: e.id,
			name: n,
			manufacturer: e.manufacturer || null,
			model: e.model || null,
			area: r?.name || null,
			disabled_by: e.disabled_by || null
		}
	};
}
function Dc(e) {
	return {
		id: e.area_id,
		kind: "area",
		label: e.name,
		subtitle: e.area_id,
		payload: {
			area_id: e.area_id,
			name: e.name,
			aliases: e.aliases || []
		}
	};
}
function Oc(e) {
	return {
		id: e.id,
		kind: "log",
		label: e.name,
		subtitle: e.exists ? `${e.line_count || 0} lines${e.truncated ? " truncated" : ""}` : "missing",
		payload: {
			source: e.name,
			path: e.path,
			exists: !!e.exists,
			lines: e.lines || "",
			line_count: e.line_count || 0,
			truncated: !!e.truncated,
			error: e.error || null
		}
	};
}
function kc(e) {
	return {
		id: e.path,
		kind: "config_file",
		label: e.path.split("/").pop() || e.path,
		subtitle: `${e.path} - ${Nc(e.size || 0)}`,
		payload: {
			path: e.path,
			size: e.size,
			modified: e.modified
		}
	};
}
function Ac(e) {
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
	].filter((t) => t in e).map((t) => [t, e[t]]));
}
function jc(e) {
	return String(e?.name_by_user || e?.name || "").trim();
}
function Mc(e) {
	return Sc.find((t) => t.kind === e)?.icon || "mdi:plus";
}
function Nc(e) {
	return !Number.isFinite(e) || e <= 0 ? "0 B" : e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${Math.round(e / 102.4) / 10} KB` : `${Math.round(e / 1024 / 102.4) / 10} MB`;
}
//#endregion
//#region src/components/AutomationBuilder.tsx
function Pc({ open: e, hass: t, contextItems: n, onClose: r, onSubmit: i }) {
	let [a, o] = (0, k.useState)("create_automation"), [s, c] = (0, k.useState)({}), [l, u] = (0, k.useState)(!1), [d, f] = (0, k.useState)({}), p = Ws(a), m = (0, k.useMemo)(() => Gs(a, s, n), [
		n,
		a,
		s
	]), h = (0, k.useMemo)(() => Gc(t?.states || {}), [t?.states]), g = (0, k.useMemo)(() => Kc(d), [d]), _ = (0, k.useMemo)(() => g.filter((e) => e.domain === "notify"), [g]);
	if ((0, k.useEffect)(() => {
		if (!e || !t) return;
		let n = !1;
		return t.callWS({ type: "get_services" }).then((e) => {
			n || f(e || {});
		}).catch(() => {
			n || f({});
		}), () => {
			n = !0;
		};
	}, [t, e]), !e) return null;
	let v = (e, t) => c((n) => ({
		...n,
		[e]: t
	})), y = (e) => {
		o(e), c({}), u(!1);
	};
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "modal-backdrop builder-modal-backdrop",
		role: "presentation",
		children: [/* @__PURE__ */ (0, A.jsx)("button", {
			className: "modal-scrim",
			type: "button",
			onClick: r,
			"aria-label": "Close builder"
		}), /* @__PURE__ */ (0, A.jsxs)("section", {
			className: "modal builder-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-label": "Automation and script builder",
			children: [
				/* @__PURE__ */ (0, A.jsxs)("header", {
					className: "modal-header",
					children: [/* @__PURE__ */ (0, A.jsx)("h2", { children: "Automation builder" }), /* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button",
						type: "button",
						onClick: r,
						title: "Close",
						"aria-label": "Close builder",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:close" })
					})]
				}),
				/* @__PURE__ */ (0, A.jsx)("nav", {
					className: "modal-tabs builder-tabs",
					"aria-label": "Builder mode",
					children: Us.map((e) => /* @__PURE__ */ (0, A.jsxs)("button", {
						className: a === e.id ? "active" : "",
						type: "button",
						onClick: () => y(e.id),
						children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: e.icon }), /* @__PURE__ */ (0, A.jsx)("span", { children: e.label })]
					}, e.id))
				}),
				/* @__PURE__ */ (0, A.jsxs)("form", {
					className: "builder-form",
					onSubmit: (e) => {
						e.preventDefault(), u(!0), !m.length && (i(Ks(a, s, n)), c({}), u(!1));
					},
					children: [/* @__PURE__ */ (0, A.jsxs)("div", {
						className: "builder-scroll",
						children: [
							l && m.length ? /* @__PURE__ */ (0, A.jsx)("div", {
								className: "builder-errors",
								role: "status",
								children: m.map((e) => /* @__PURE__ */ (0, A.jsx)("p", { children: e }, e))
							}) : null,
							/* @__PURE__ */ (0, A.jsx)("div", {
								className: "builder-fields",
								children: p.fields.map((e) => /* @__PURE__ */ (0, A.jsxs)("div", {
									className: `builder-field ${e.multiline || e.control?.type === "action" ? "wide" : ""}`,
									children: [/* @__PURE__ */ (0, A.jsxs)("span", { children: [e.label, e.required ? " *" : ""] }), /* @__PURE__ */ (0, A.jsx)(Fc, {
										field: e,
										entityOptions: h,
										serviceOptions: g,
										notifyServiceOptions: _,
										value: s[e.id] || "",
										onChange: (t) => v(e.id, t)
									})]
								}, `${p.id}:${e.id}`))
							}),
							/* @__PURE__ */ (0, A.jsxs)("div", {
								className: "builder-context",
								"aria-label": "Builder context",
								children: [/* @__PURE__ */ (0, A.jsx)("span", { children: "Context" }), /* @__PURE__ */ (0, A.jsxs)("div", {
									className: "builder-context-list",
									children: [n.length ? n.slice(0, 6).map((e) => /* @__PURE__ */ (0, A.jsxs)("span", {
										className: "builder-context-chip",
										title: e.subtitle || e.label,
										children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: zt(e.kind) }), e.label]
									}, `${e.kind}:${e.id}`)) : /* @__PURE__ */ (0, A.jsx)("span", {
										className: "builder-context-empty",
										children: "None selected"
									}), n.length > 6 ? /* @__PURE__ */ (0, A.jsxs)("span", {
										className: "builder-context-empty",
										children: ["+", n.length - 6]
									}) : null]
								})]
							})
						]
					}), /* @__PURE__ */ (0, A.jsxs)("div", {
						className: "builder-actions",
						children: [/* @__PURE__ */ (0, A.jsx)("button", {
							className: "ghost",
							type: "button",
							onClick: r,
							children: "Cancel"
						}), /* @__PURE__ */ (0, A.jsxs)("button", {
							type: "submit",
							children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: p.icon }), /* @__PURE__ */ (0, A.jsx)("span", { children: p.label })]
						})]
					})]
				})
			]
		})]
	});
}
function Fc({ field: e, entityOptions: t, serviceOptions: n, notifyServiceOptions: r, value: i, onChange: a }) {
	let o = e.control;
	return o?.type === "entity" ? /* @__PURE__ */ (0, A.jsx)(Vc, {
		label: e.label,
		placeholder: e.placeholder,
		options: t,
		selector: o,
		value: i,
		onChange: a
	}) : o?.type === "select" ? /* @__PURE__ */ (0, A.jsx)(Ic, {
		ariaLabel: e.label,
		options: o.options,
		placeholder: e.placeholder,
		value: i,
		onChange: a
	}) : o?.type === "trigger" ? /* @__PURE__ */ (0, A.jsx)(Lc, {
		entityOptions: t,
		value: i,
		onChange: a
	}) : o?.type === "condition" ? /* @__PURE__ */ (0, A.jsx)(Rc, {
		entityOptions: t,
		value: i,
		onChange: a
	}) : o?.type === "action" ? /* @__PURE__ */ (0, A.jsx)(zc, {
		entityOptions: t,
		serviceOptions: n,
		notifyServiceOptions: r,
		value: i,
		onChange: a
	}) : o?.type === "notification" ? /* @__PURE__ */ (0, A.jsx)(Bc, {
		serviceOptions: r,
		value: i,
		onChange: a
	}) : e.multiline ? /* @__PURE__ */ (0, A.jsx)("textarea", {
		value: i,
		placeholder: e.placeholder,
		rows: 3,
		onChange: (e) => a(e.target.value)
	}) : /* @__PURE__ */ (0, A.jsx)("input", {
		value: i,
		placeholder: e.placeholder,
		onChange: (e) => a(e.target.value)
	});
}
function Ic({ ariaLabel: e, options: t, placeholder: n, value: r, onChange: i }) {
	return /* @__PURE__ */ (0, A.jsxs)("select", {
		"aria-label": e,
		value: r,
		onChange: (e) => i(e.currentTarget.value),
		children: [/* @__PURE__ */ (0, A.jsx)("option", {
			value: "",
			children: n || "Select"
		}), t.map((e) => /* @__PURE__ */ (0, A.jsx)("option", {
			value: e.value,
			children: e.label
		}, e.value))]
	});
}
function Lc({ entityOptions: e, value: t, onChange: n }) {
	let [r, i] = (0, k.useState)("State"), [a, o] = (0, k.useState)(""), [s, c] = (0, k.useState)("on"), l = r === "Numeric state" ? [
		"sensor",
		"number",
		"input_number"
	] : void 0, u = (e = r, t = a, i = s) => {
		n(Qc(e, t, i));
	};
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "builder-compound",
		children: [
			/* @__PURE__ */ (0, A.jsxs)("select", {
				value: r,
				"aria-label": "Trigger type",
				onChange: (e) => {
					let t = e.currentTarget.value;
					i(t), u(t);
				},
				children: [
					/* @__PURE__ */ (0, A.jsx)("option", { children: "State" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Numeric state" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Time" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Sun" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Event" })
				]
			}),
			r === "State" || r === "Numeric state" ? /* @__PURE__ */ (0, A.jsx)(Vc, {
				label: "Trigger entity",
				placeholder: "Search trigger entity",
				options: e,
				selector: { domains: l },
				value: a,
				onChange: (e) => {
					o(e), u(r, e);
				}
			}) : null,
			/* @__PURE__ */ (0, A.jsx)("input", {
				value: s,
				placeholder: tl(r),
				onChange: (e) => {
					let t = e.currentTarget.value;
					c(t), u(r, a, t);
				}
			}),
			/* @__PURE__ */ (0, A.jsx)("small", { children: t || "No trigger selected" })
		]
	});
}
function Rc({ entityOptions: e, value: t, onChange: n }) {
	let [r, i] = (0, k.useState)("None"), [a, o] = (0, k.useState)(""), [s, c] = (0, k.useState)(""), l = (e = r, t = a, i = s) => {
		n($c(e, t, i));
	};
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "builder-compound",
		children: [
			/* @__PURE__ */ (0, A.jsxs)("select", {
				value: r,
				"aria-label": "Condition type",
				onChange: (e) => {
					let t = e.currentTarget.value;
					i(t), l(t);
				},
				children: [
					/* @__PURE__ */ (0, A.jsx)("option", { children: "None" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "State" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Numeric state" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Time" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Sun" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Template" })
				]
			}),
			r === "State" || r === "Numeric state" ? /* @__PURE__ */ (0, A.jsx)(Vc, {
				label: "Condition entity",
				placeholder: "Search condition entity",
				options: e,
				selector: { domains: r === "Numeric state" ? [
					"sensor",
					"number",
					"input_number"
				] : void 0 },
				value: a,
				onChange: (e) => {
					o(e), l(r, e);
				}
			}) : null,
			r === "None" ? null : /* @__PURE__ */ (0, A.jsx)("input", {
				value: s,
				placeholder: nl(r),
				onChange: (e) => {
					let t = e.currentTarget.value;
					c(t), l(r, a, t);
				}
			}),
			/* @__PURE__ */ (0, A.jsx)("small", { children: t || "No condition" })
		]
	});
}
function zc({ entityOptions: e, serviceOptions: t, notifyServiceOptions: n, value: r, onChange: i }) {
	let [a, o] = (0, k.useState)("Call service"), [s, c] = (0, k.useState)(""), [l, u] = (0, k.useState)(""), [d, f] = (0, k.useState)(""), p = a === "Notify" ? n : t, m = (e = a, t = s, n = l, r = d) => {
		i(el(e, t, n, r));
	};
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "builder-compound action",
		children: [
			/* @__PURE__ */ (0, A.jsxs)("select", {
				value: a,
				"aria-label": "Action type",
				onChange: (e) => {
					let t = e.currentTarget.value;
					o(t), m(t);
				},
				children: [
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Call service" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Activate scene" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Notify" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Delay" }),
					/* @__PURE__ */ (0, A.jsx)("option", { children: "Wait for trigger" })
				]
			}),
			a === "Call service" || a === "Notify" ? /* @__PURE__ */ (0, A.jsx)(Hc, {
				label: "Service",
				options: p,
				placeholder: a === "Notify" ? "Search notify service" : "Search service",
				value: s,
				onChange: (e) => {
					c(e), m(a, e);
				}
			}) : null,
			a === "Call service" ? /* @__PURE__ */ (0, A.jsx)(Vc, {
				label: "Action targets",
				placeholder: "Search target entities",
				options: e,
				selector: {
					domains: il(s),
					multiple: !0
				},
				value: l,
				onChange: (e) => {
					u(e), m(a, s, e);
				}
			}) : null,
			a === "Activate scene" ? /* @__PURE__ */ (0, A.jsx)(Vc, {
				label: "Scene",
				placeholder: "Search scene",
				options: e,
				selector: { domains: ["scene"] },
				value: l,
				onChange: (e) => {
					u(e), m(a, s, e);
				}
			}) : null,
			/* @__PURE__ */ (0, A.jsx)("textarea", {
				value: d,
				placeholder: rl(a),
				rows: 2,
				onChange: (e) => {
					let t = e.currentTarget.value;
					f(t), m(a, s, l, t);
				}
			}),
			/* @__PURE__ */ (0, A.jsx)("small", { children: r || "No action selected" })
		]
	});
}
function Bc({ serviceOptions: e, value: t, onChange: n }) {
	let [r, i] = (0, k.useState)(""), [a, o] = (0, k.useState)(""), s = (e = r, t = a) => {
		n(e || t ? `Notify using ${e || "selected notify service"}${t ? `: ${t}` : ""}` : "");
	};
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "builder-compound",
		children: [
			/* @__PURE__ */ (0, A.jsx)(Hc, {
				label: "Notify service",
				options: e,
				placeholder: "Search notify service",
				value: r,
				onChange: (e) => {
					i(e), s(e);
				}
			}),
			/* @__PURE__ */ (0, A.jsx)("input", {
				value: a,
				placeholder: "Notification message",
				onChange: (e) => {
					let t = e.currentTarget.value;
					o(t), s(r, t);
				}
			}),
			/* @__PURE__ */ (0, A.jsx)("small", { children: t || "No notification" })
		]
	});
}
function Vc({ label: e, placeholder: t, options: n, selector: r, value: i, onChange: a }) {
	let [o, s] = (0, k.useState)(""), [c, l] = (0, k.useState)(!1), u = Jc(i), d = (0, k.useMemo)(() => new Map(n.map((e) => [e.entityId, e])), [n]), f = (0, k.useMemo)(() => {
		let e = r.domains ? new Set(r.domains) : null, t = new Set(r.multiple ? u : []);
		return n.filter((n) => e && !e.has(Yc(n.entityId)) ? !1 : !t.has(n.entityId));
	}, [
		n,
		u,
		r.domains,
		r.multiple
	]), p = (0, k.useMemo)(() => {
		let e = (r.multiple ? o : o || i).trim().toLowerCase();
		return (e ? f.filter((t) => t.searchText.includes(e)) : f).slice(0, 10);
	}, [
		f,
		o,
		r.multiple,
		i
	]), m = (e) => {
		if (r.multiple) {
			a([...u, e].join(", ")), s(""), l(!0);
			return;
		}
		a(e), s(""), l(!1);
	};
	return r.multiple ? /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "entity-combobox",
		children: [
			u.length ? /* @__PURE__ */ (0, A.jsx)("div", {
				className: "entity-combobox-chips",
				children: u.map((e) => /* @__PURE__ */ (0, A.jsxs)("button", {
					"aria-label": `Remove ${e}`,
					className: "entity-combobox-chip",
					type: "button",
					onClick: () => a(u.filter((t) => t !== e).join(", ")),
					children: [
						/* @__PURE__ */ (0, A.jsx)(X, {
							className: "entity-combobox-chip-entity-icon",
							icon: Xc(d.get(e), e)
						}),
						/* @__PURE__ */ (0, A.jsx)("span", { children: e }),
						/* @__PURE__ */ (0, A.jsx)(X, {
							className: "entity-combobox-chip-remove-icon",
							icon: "mdi:close"
						})
					]
				}, e))
			}) : null,
			/* @__PURE__ */ (0, A.jsx)("input", {
				"aria-autocomplete": "list",
				"aria-expanded": c,
				"aria-label": `${e} entity search`,
				autoComplete: "off",
				placeholder: t,
				role: "combobox",
				value: o,
				onBlur: () => window.setTimeout(() => l(!1), 120),
				onChange: (e) => {
					s(e.currentTarget.value), l(!0);
				},
				onFocus: () => l(!0),
				onKeyDown: (e) => {
					e.key === "Enter" && p[0] && (e.preventDefault(), m(p[0].entityId));
				}
			}),
			c ? /* @__PURE__ */ (0, A.jsx)(Wc, {
				options: p,
				onSelect: m
			}) : null
		]
	}) : /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "entity-combobox",
		children: [/* @__PURE__ */ (0, A.jsx)("input", {
			"aria-autocomplete": "list",
			"aria-expanded": c,
			"aria-label": `${e} entity search`,
			autoComplete: "off",
			placeholder: t,
			role: "combobox",
			value: o || i,
			onBlur: () => window.setTimeout(() => l(!1), 120),
			onChange: (e) => {
				s(e.currentTarget.value), a(e.currentTarget.value), l(!0);
			},
			onFocus: () => l(!0),
			onKeyDown: (e) => {
				e.key === "Enter" && p[0] && (e.preventDefault(), m(p[0].entityId));
			}
		}), c ? /* @__PURE__ */ (0, A.jsx)(Wc, {
			options: p,
			onSelect: m
		}) : null]
	});
}
function Hc({ label: e, options: t, placeholder: n, value: r, onChange: i }) {
	let [a, o] = (0, k.useState)(""), [s, c] = (0, k.useState)(!1), l = (0, k.useMemo)(() => {
		let e = (a || r).trim().toLowerCase();
		return (e ? t.filter((t) => t.searchText.includes(e)) : t).slice(0, 10);
	}, [
		t,
		a,
		r
	]), u = (e) => {
		i(e), o(""), c(!1);
	};
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "entity-combobox",
		children: [/* @__PURE__ */ (0, A.jsx)("input", {
			"aria-autocomplete": "list",
			"aria-expanded": s,
			"aria-label": `${e} search`,
			autoComplete: "off",
			placeholder: n,
			role: "combobox",
			value: a || r,
			onBlur: () => window.setTimeout(() => c(!1), 120),
			onChange: (e) => {
				o(e.currentTarget.value), i(e.currentTarget.value), c(!0);
			},
			onFocus: () => c(!0),
			onKeyDown: (e) => {
				e.key === "Enter" && l[0] && (e.preventDefault(), u(l[0].serviceId));
			}
		}), s ? /* @__PURE__ */ (0, A.jsx)(Uc, {
			options: l,
			onSelect: u
		}) : null]
	});
}
function Uc({ options: e, onSelect: t }) {
	return /* @__PURE__ */ (0, A.jsx)("div", {
		className: "entity-combobox-menu",
		role: "listbox",
		children: e.length ? e.map((e) => /* @__PURE__ */ (0, A.jsxs)("button", {
			className: "entity-combobox-option",
			type: "button",
			role: "option",
			onMouseDown: (e) => e.preventDefault(),
			onClick: () => t(e.serviceId),
			children: [
				/* @__PURE__ */ (0, A.jsx)(X, {
					className: "entity-combobox-option-icon",
					icon: qc(e.domain)
				}),
				/* @__PURE__ */ (0, A.jsxs)("span", {
					className: "entity-combobox-option-main",
					children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, A.jsx)("small", { children: e.serviceId })]
				}),
				/* @__PURE__ */ (0, A.jsx)("span", {
					className: "entity-combobox-option-badge",
					children: e.domain
				})
			]
		}, e.serviceId)) : /* @__PURE__ */ (0, A.jsx)("div", {
			className: "entity-combobox-empty",
			children: "No matches"
		})
	});
}
function Wc({ options: e, onSelect: t }) {
	return /* @__PURE__ */ (0, A.jsx)("div", {
		className: "entity-combobox-menu",
		role: "listbox",
		children: e.length ? e.map((e) => /* @__PURE__ */ (0, A.jsxs)("button", {
			className: "entity-combobox-option",
			type: "button",
			role: "option",
			onMouseDown: (e) => e.preventDefault(),
			onClick: () => t(e.entityId),
			children: [
				/* @__PURE__ */ (0, A.jsx)(X, {
					className: "entity-combobox-option-icon",
					icon: Xc(e, e.entityId)
				}),
				/* @__PURE__ */ (0, A.jsxs)("span", {
					className: "entity-combobox-option-main",
					children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: e.label }), e.subtitle ? /* @__PURE__ */ (0, A.jsx)("small", { children: e.subtitle }) : null]
				}),
				/* @__PURE__ */ (0, A.jsx)("span", {
					className: "entity-combobox-option-badge",
					children: Yc(e.entityId)
				})
			]
		}, e.entityId)) : /* @__PURE__ */ (0, A.jsx)("div", {
			className: "entity-combobox-empty",
			children: "No matches"
		})
	});
}
function Gc(e) {
	return Object.entries(e).map(([e, t]) => {
		let n = String(t.attributes?.friendly_name || e), r = Yc(e), i = n === e ? "" : e;
		return {
			entityId: e,
			icon: typeof t.attributes?.icon == "string" ? t.attributes.icon : void 0,
			label: n,
			subtitle: i,
			searchText: `${e} ${n} ${r}`.toLowerCase()
		};
	}).sort((e, t) => e.entityId.localeCompare(t.entityId));
}
function Kc(e) {
	return Object.entries(e).flatMap(([e, t]) => Object.entries(t || {}).map(([t, n]) => {
		let r = `${e}.${t}`, i = n.name || r;
		return {
			serviceId: r,
			label: i,
			domain: e,
			searchText: `${r} ${i} ${n.description || ""}`.toLowerCase()
		};
	})).sort((e, t) => e.serviceId.localeCompare(t.serviceId));
}
function qc(e) {
	switch (e) {
		case "automation": return "mdi:robot-industrial-outline";
		case "climate": return "mdi:thermostat";
		case "cover": return "mdi:window-shutter";
		case "fan": return "mdi:fan";
		case "homeassistant": return "mdi:home-assistant";
		case "light": return "mdi:lightbulb-outline";
		case "media_player": return "mdi:play-circle-outline";
		case "notify": return "mdi:bell-outline";
		case "scene": return "mdi:palette-outline";
		case "script": return "mdi:script-text-outline";
		case "switch": return "mdi:toggle-switch-outline";
		default: return "mdi:cog-outline";
	}
}
function Jc(e) {
	return e.split(",").map((e) => e.trim()).filter(Boolean);
}
function Yc(e) {
	return e.split(".")[0] || "";
}
function Xc(e, t) {
	return e?.icon || Zc(t);
}
function Zc(e) {
	switch (Yc(e)) {
		case "automation": return "mdi:robot-industrial-outline";
		case "binary_sensor": return "mdi:checkbox-marked-circle-outline";
		case "button":
		case "input_button": return "mdi:gesture-tap-button";
		case "climate": return "mdi:thermostat";
		case "cover": return "mdi:window-shutter";
		case "fan": return "mdi:fan";
		case "light": return "mdi:lightbulb-outline";
		case "lock": return "mdi:lock-outline";
		case "media_player": return "mdi:play-circle-outline";
		case "scene": return "mdi:palette-outline";
		case "script": return "mdi:script-text-outline";
		case "sensor": return "mdi:gauge";
		case "switch": return "mdi:toggle-switch-outline";
		default: return "mdi:home-assistant";
	}
}
function Qc(e, t, n) {
	return e === "Time" ? n ? `At ${n}` : "" : e === "Sun" ? n ? `Sun ${n}` : "" : e === "Event" ? n ? `Event ${n}` : "" : t ? e === "Numeric state" ? `${t} numeric state ${n || "matches threshold"}` : `${t} turns ${n || "on"}` : "";
}
function $c(e, t, n) {
	return e === "None" ? "" : e === "Time" ? n ? `Time condition: ${n}` : "" : e === "Sun" ? n ? `Sun condition: ${n}` : "" : e === "Template" ? n ? `Template condition: ${n}` : "" : t ? e === "Numeric state" ? `${t} numeric condition ${n || "matches threshold"}` : `${t} is ${n || "on"}` : "";
}
function el(e, t, n, r) {
	return e === "Delay" ? r ? `Delay ${r}` : "" : e === "Wait for trigger" ? r ? `Wait for ${r}` : "" : e === "Activate scene" ? n ? `Activate ${n}` : "" : e === "Notify" ? t || r ? `Notify using ${t || "selected notify service"}${r ? `: ${r}` : ""}` : "" : !t && !n && !r ? "" : `Call ${t || "selected service"}${n ? ` on ${n}` : ""}${r ? ` with ${r}` : ""}`;
}
function tl(e) {
	return e === "Numeric state" ? "above 20, below 50" : e === "Time" ? "07:30:00" : e === "Sun" ? "sunset offset -00:30:00" : e === "Event" ? "event_type or event data" : "on, off, home, open";
}
function nl(e) {
	return e === "Numeric state" ? "above 20" : e === "Time" ? "after 22:00 before 06:00" : e === "Sun" ? "after sunset" : e === "Template" ? "{{ condition }}" : "state value";
}
function rl(e) {
	return e === "Delay" ? "00:05:00" : e === "Wait for trigger" ? "binary_sensor.door turns off" : e === "Notify" ? "Notification message" : "Optional service data";
}
function il(e) {
	let t = e.split(".")[0];
	if (!(!t || t === "homeassistant")) return t === "scene" ? ["scene"] : t === "script" ? ["script"] : [t];
}
//#endregion
//#region src/components/ChatPanel.tsx
var al = Object.freeze([]), ol = Object.freeze([]), sl = [];
function cl(e) {
	let t = j((e) => e.activeId);
	return t ? /* @__PURE__ */ (0, A.jsx)(ll, {
		activeId: t,
		...e
	}) : /* @__PURE__ */ (0, A.jsx)(bl, {
		onNew: e.onNew,
		onGitToggle: e.onGitToggle
	});
}
function ll({ activeId: e, ...t }) {
	let n = j((t) => t.chatsById[e]), r = j((t) => t.messagesByChatId[e] || al), i = j((t) => t.drafts[e] || ""), a = j((e) => e.setDraft), o = j((e) => e.clearDraft), s = j((t) => t.contextByChatId[e] || sl), c = j((e) => e.addContextItem), l = j((e) => e.removeContextItem), u = j((e) => e.clearContext), d = j((t) => t.questionDrafts[e] || ""), f = j((e) => e.setQuestionDraft), p = j((t) => t.queuesByChatId[e] || ol), m = M((e) => e.settings), h = M((e) => e.renamingId), g = M((e) => e.renameTitle), _ = M((e) => e.setRenaming), v = (0, k.useRef)(null), y = (0, k.useRef)(null), b = (0, k.useRef)(!0), x = (0, k.useRef)({
		activeId: e,
		messageCount: 0,
		thinkingVisible: !1
	}), S = (0, k.useRef)(null), C = (0, k.useRef)(null), [w, T] = (0, k.useState)(!1), [ee, te] = (0, k.useState)(!1), [ne, re] = (0, k.useState)(!0), [ie, ae] = (0, k.useState)(e), [oe, se] = (0, k.useState)(0), ce = (0, k.useMemo)(() => gt(r), [r]), le = (0, k.useMemo)(() => n ? ft(n, r) : null, [n, r]), E = !!n?.archived, D = ht(n), ue = Yn(n), de = (0, k.useMemo)(() => Mn(n, m), [n, m]), fe = (0, k.useMemo)(() => Nn(s, m.context_budget_chars), [s, m.context_budget_chars]), pe = Xn(n), me = n?.status === "error" && !E, O = D && !le, he = (0, k.useMemo)(() => ({ Footer: () => O ? /* @__PURE__ */ (0, A.jsx)(yl, {}) : null }), [O]), ge = (0, k.useCallback)(() => {
		b.current = !0, re(!0), se((e) => e + 1);
	}, []), _e = (0, k.useCallback)((e) => {
		e && (b.current = !0), re(e);
	}, []), ve = (0, k.useCallback)((e) => {
		e.deltaY < 0 && (b.current = !1);
	}, []), ye = (0, k.useCallback)((e) => {
		S.current = e.touches[0]?.clientY ?? null;
	}, []), be = (0, k.useCallback)((e) => {
		let t = e.touches[0]?.clientY ?? null;
		S.current !== null && t !== null && t > S.current && (b.current = !1), S.current = t;
	}, []), xe = (0, k.useCallback)(() => {
		S.current = null;
	}, []), Se = (0, k.useCallback)((e) => {
		y.current = e;
	}, []), Ce = (0, k.useCallback)((e) => {
		ce.length && v.current?.scrollToIndex({
			index: ce.length - 1,
			align: "end",
			behavior: e
		}), v.current?.scrollTo({
			top: 2 ** 53 - 1,
			behavior: e
		});
		let t = y.current;
		t && (t instanceof HTMLElement ? t.scrollTo({
			top: t.scrollHeight,
			behavior: e
		}) : t.scrollTo({
			top: t.document.documentElement.scrollHeight,
			behavior: e
		}));
	}, [ce.length]), we = (0, k.useCallback)(() => {
		ce.length && (b.current = !0, re(!0), Ce("smooth"));
	}, [ce.length, Ce]);
	if ((0, k.useEffect)(() => {
		b.current = !0, re(!0), ae(e);
	}, [e]), (0, k.useEffect)(() => {
		let t = b.current || ie === e, n = x.current, r = n.activeId !== e, i = !r && ce.length > n.messageCount, a = !r && O && !n.thinkingVisible;
		if (x.current = {
			activeId: e,
			messageCount: ce.length,
			thinkingVisible: O
		}, !t && !oe || !ce.length && !O) return;
		let o = ie === e && !oe ? "auto" : oe || i || a ? "smooth" : "auto", s = 0, c = 0, l = requestAnimationFrame(() => {
			Ce(o), s = requestAnimationFrame(() => Ce(o)), c = window.setTimeout(() => Ce(o), 120), ie === e && ae(null), oe && se(0);
		});
		return () => {
			cancelAnimationFrame(l), cancelAnimationFrame(s), window.clearTimeout(c);
		};
	}, [
		e,
		ie,
		ce,
		Ce,
		oe,
		O
	]), (0, k.useEffect)(() => {
		let t = b.current || ie === e;
		if (!O || !t) return;
		let n = 0, r = requestAnimationFrame(() => {
			Ce("smooth"), n = requestAnimationFrame(() => {
				Ce("smooth");
			});
		});
		return () => {
			cancelAnimationFrame(r), cancelAnimationFrame(n);
		};
	}, [
		e,
		ie,
		Ce,
		O
	]), (0, k.useEffect)(() => {
		let e = C.current;
		e && (e.style.height = "52px", e.style.height = `${Math.min(e.scrollHeight, 180)}px`);
	}, [i]), (0, k.useEffect)(() => {
		if (!n || E || le) return;
		let e = requestAnimationFrame(() => {
			let e = C.current;
			if (!e) return;
			e.focus({ preventScroll: !0 });
			let t = e.value.length;
			e.setSelectionRange(t, t);
		});
		return () => cancelAnimationFrame(e);
	}, [
		n?.id,
		E,
		le
	]), !n) return /* @__PURE__ */ (0, A.jsx)(bl, {
		onNew: t.onNew,
		onGitToggle: t.onGitToggle
	});
	let Te = h === n.id;
	return /* @__PURE__ */ (0, A.jsxs)(A.Fragment, { children: [
		/* @__PURE__ */ (0, A.jsxs)("header", {
			className: "chat-header",
			children: [/* @__PURE__ */ (0, A.jsx)("div", {
				className: "title-area",
				children: /* @__PURE__ */ (0, A.jsxs)("div", {
					className: "title-row",
					children: [Te ? /* @__PURE__ */ (0, A.jsx)("input", {
						className: "title-input",
						name: "session-title",
						value: g,
						"aria-label": "Chat title",
						onChange: (e) => _(n.id, e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && t.onRenameSave(n.id), e.key === "Escape" && _(null);
						},
						autoFocus: !0
					}) : /* @__PURE__ */ (0, A.jsx)("h1", { children: n.title }), /* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button",
						onClick: () => Te ? t.onRenameSave(n.id) : t.onRenameStart(n.id),
						title: Te ? "Save title" : "Rename chat",
						"aria-label": Te ? "Save title" : "Rename chat",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: Te ? "mdi:content-save" : "mdi:pencil" })
					})]
				})
			}), /* @__PURE__ */ (0, A.jsxs)("div", {
				className: "header-actions",
				children: [
					E ? /* @__PURE__ */ (0, A.jsx)("button", {
						onClick: () => t.onArchive(n.id, !1),
						children: "Restore"
					}) : null,
					D ? /* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button stop-button danger",
						onClick: () => t.onCancel(n.id),
						title: "Stop",
						"aria-label": "Stop chat",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:stop" })
					}) : null,
					/* @__PURE__ */ (0, A.jsx)(ul, { onClick: t.onGitToggle })
				]
			})]
		}),
		/* @__PURE__ */ (0, A.jsxs)("div", {
			className: "transcript",
			onWheelCapture: ve,
			onTouchStartCapture: ye,
			onTouchMoveCapture: be,
			onTouchEndCapture: xe,
			onTouchCancelCapture: xe,
			children: [/* @__PURE__ */ (0, A.jsx)(Co, {
				ref: v,
				style: { height: "100%" },
				data: ce,
				scrollerRef: Se,
				followOutput: (e) => e || b.current ? "smooth" : !1,
				atBottomStateChange: _e,
				itemContent: (e, r) => /* @__PURE__ */ (0, A.jsx)(ac, {
					api: t.api,
					message: r,
					sessionId: n.id,
					canRetry: me,
					onCopy: t.onCopy,
					onRetry: t.onRetry,
					onRollback: t.onRollback,
					onValidationReload: t.onValidationReload
				}, vt(r, e)),
				components: he
			}), !ne && ce.length ? /* @__PURE__ */ (0, A.jsx)("button", {
				className: "scroll-to-bottom",
				type: "button",
				onClick: we,
				title: "Scroll to bottom",
				"aria-label": "Scroll to bottom",
				children: /* @__PURE__ */ (0, A.jsx)("svg", {
					xmlns: "http://www.w3.org/2000/svg",
					width: "16",
					height: "16",
					viewBox: "0 0 24 24",
					fill: "none",
					stroke: "#0F766E",
					strokeWidth: "2",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					"aria-hidden": "true",
					focusable: "false",
					children: /* @__PURE__ */ (0, A.jsx)("path", {
						fill: "none",
						stroke: "#0F766E",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						d: "m6 9 6 6 6-6"
					})
				})
			}) : null]
		}),
		E ? /* @__PURE__ */ (0, A.jsx)("div", {
			className: "archived-note",
			children: "Archived chat"
		}) : le ? /* @__PURE__ */ (0, A.jsx)(vl, {
			session: n,
			question: le,
			value: d,
			onChange: (e) => f(n.id, e),
			onAnswer: (e, n) => {
				ge(), t.onAnswer(e, n);
			}
		}) : /* @__PURE__ */ (0, A.jsxs)(A.Fragment, { children: [
			/* @__PURE__ */ (0, A.jsxs)("form", {
				className: "composer",
				onSubmit: (e) => {
					if (e.preventDefault(), ue || pe) return;
					let r = i.trim();
					r && (o(n.id), ge(), t.onSend(n.id, r));
				},
				children: [
					/* @__PURE__ */ (0, A.jsx)(hl, {
						session: n,
						onRunPlan: t.onRunPlan
					}),
					/* @__PURE__ */ (0, A.jsx)(gl, {
						session: n,
						onApprove: t.onApprove
					}),
					!ue && !pe ? /* @__PURE__ */ (0, A.jsxs)(A.Fragment, { children: [
						/* @__PURE__ */ (0, A.jsx)(dl, {
							settings: m,
							runSettings: de,
							onChange: (e) => t.onRunSettingsChange(n.id, {
								...de,
								...e
							})
						}),
						/* @__PURE__ */ (0, A.jsx)(fl, {
							value: de.plan_mode,
							onChange: (e) => t.onRunSettingsChange(n.id, {
								...de,
								plan_mode: e
							})
						}),
						/* @__PURE__ */ (0, A.jsx)(_l, {
							sessionId: n.id,
							queues: p,
							onEdit: t.onQueueEdit,
							onSteer: t.onQueueSteer,
							onClear: t.onQueueClear
						}),
						/* @__PURE__ */ (0, A.jsxs)("div", {
							className: "context-chip-row",
							children: [/* @__PURE__ */ (0, A.jsx)(wc, {
								items: s,
								onRemove: (e) => l(n.id, e),
								onClear: () => u(n.id)
							}), s.length ? /* @__PURE__ */ (0, A.jsx)("span", {
								className: `context-budget ${fe.level}`,
								children: fe.label
							}) : null]
						}),
						/* @__PURE__ */ (0, A.jsxs)("div", {
							className: "composer-input-row",
							children: [
								/* @__PURE__ */ (0, A.jsx)("textarea", {
									ref: C,
									name: "prompt",
									placeholder: "Ask Codex to change Home Assistant...",
									rows: 1,
									value: i,
									onChange: (e) => a(n.id, e.target.value),
									onKeyDown: (e) => {
										e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey && !e.altKey && !e.nativeEvent.isComposing && (e.preventDefault(), e.currentTarget.form?.requestSubmit());
									}
								}),
								/* @__PURE__ */ (0, A.jsxs)("button", {
									className: "context-button",
									type: "button",
									onClick: () => T(!0),
									title: "Add context",
									"aria-label": "Add context",
									children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:paperclip" }), s.length ? /* @__PURE__ */ (0, A.jsx)("b", { children: s.length }) : null]
								}),
								/* @__PURE__ */ (0, A.jsx)("button", {
									className: "builder-button",
									type: "button",
									onClick: () => te(!0),
									title: "Automation builder",
									"aria-label": "Automation builder",
									children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:robot-industrial-outline" })
								}),
								/* @__PURE__ */ (0, A.jsx)("button", {
									className: "send-button",
									type: "submit",
									title: "Send",
									"aria-label": "Send",
									children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:send" })
								})
							]
						})
					] }) : null
				]
			}),
			/* @__PURE__ */ (0, A.jsx)(Pc, {
				open: ee,
				hass: t.hass,
				contextItems: s,
				onClose: () => te(!1),
				onSubmit: (e) => {
					te(!1), ge(), t.onSend(n.id, e);
				}
			}),
			/* @__PURE__ */ (0, A.jsx)(Cc, {
				api: t.api,
				hass: t.hass,
				open: w,
				selected: s,
				onAdd: (e) => c(n.id, e),
				onRemove: (e) => l(n.id, e),
				onClear: () => u(n.id),
				onClose: () => T(!1)
			})
		] })
	] });
}
function ul({ onClick: e }) {
	let t = M((e) => e.gitPanelOpen), n = M((e) => pn(e.gitSetupStatus)), r = M((e) => e.gitChanges?.files ? sn(e.gitChanges.files) : e.gitChangedCount);
	return t || !n ? null : /* @__PURE__ */ (0, A.jsxs)("button", {
		className: "git-toggle",
		onClick: e,
		title: "Open Git panel",
		"aria-label": "Open Git panel",
		children: [
			/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:source-branch" }),
			/* @__PURE__ */ (0, A.jsx)("span", { children: "Git" }),
			r ? /* @__PURE__ */ (0, A.jsx)("b", { children: r }) : null
		]
	});
}
function dl({ settings: e, runSettings: t, onChange: n }) {
	let r = t.mode === "manual";
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: `run-controls ${r ? "manual" : "auto"}`,
		children: [
			/* @__PURE__ */ (0, A.jsx)(pl, {
				ariaLabel: "Model preset",
				value: t.model_preset_id,
				options: e.model_presets.map((e) => [e.id, e.label]),
				onChange: (e) => n({ model_preset_id: e })
			}),
			/* @__PURE__ */ (0, A.jsxs)("button", {
				type: "button",
				className: r ? "" : "active",
				onClick: () => n({ mode: r ? "auto" : "manual" }),
				children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: r ? "mdi:tune" : "mdi:auto-mode" }), /* @__PURE__ */ (0, A.jsx)("span", { children: r ? "Manual" : "Auto" })]
			}),
			r ? /* @__PURE__ */ (0, A.jsxs)("div", {
				className: "run-controls-extra",
				children: [
					/* @__PURE__ */ (0, A.jsx)(ml, {
						label: "Reasoning",
						value: t.reasoning_effort,
						options: [
							"auto",
							"minimal",
							"low",
							"medium",
							"high",
							"xhigh"
						],
						onChange: (e) => n({ reasoning_effort: e })
					}),
					/* @__PURE__ */ (0, A.jsx)(ml, {
						label: "Verbosity",
						value: t.verbosity,
						options: [
							"auto",
							"low",
							"medium",
							"high"
						],
						onChange: (e) => n({ verbosity: e })
					}),
					/* @__PURE__ */ (0, A.jsx)(ml, {
						label: "Validation",
						value: t.validation_depth,
						options: [
							"auto",
							"none",
							"full"
						],
						onChange: (e) => n({ validation_depth: e })
					}),
					/* @__PURE__ */ (0, A.jsx)(ml, {
						label: "Tools",
						value: t.tool_visibility,
						options: [
							"compact",
							"normal",
							"verbose"
						],
						onChange: (e) => n({ tool_visibility: e })
					}),
					/* @__PURE__ */ (0, A.jsx)(ml, {
						label: "Approvals",
						value: t.approval_mode,
						options: ["ask", "auto_readonly"],
						onChange: (e) => n({ approval_mode: e })
					})
				]
			}) : null
		]
	});
}
function fl({ value: e, onChange: t }) {
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "plan-mode-toggle",
		"aria-label": "Plan mode",
		children: [/* @__PURE__ */ (0, A.jsx)("span", { children: "Plan" }), /* @__PURE__ */ (0, A.jsx)("div", {
			className: "plan-mode-options",
			role: "group",
			"aria-label": "Plan mode",
			children: [
				{
					value: "auto",
					label: "Auto",
					icon: "mdi:auto-mode",
					title: "Plan automatically when Codex expects to edit files"
				},
				{
					value: "always",
					label: "On",
					icon: "mdi:clipboard-check-outline",
					title: "Always request a plan before running"
				},
				{
					value: "off",
					label: "Off",
					icon: "mdi:clipboard-off-outline",
					title: "Run without requesting a plan first"
				}
			].map((n) => /* @__PURE__ */ (0, A.jsxs)("button", {
				type: "button",
				className: e === n.value ? "active" : "",
				title: n.title,
				"aria-pressed": e === n.value,
				onClick: () => t(n.value),
				children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: n.icon }), /* @__PURE__ */ (0, A.jsx)("span", { children: n.label })]
			}, n.value))
		})]
	});
}
function pl({ ariaLabel: e, value: t, options: n, onChange: r }) {
	let [i, a] = (0, k.useState)(!1), o = (0, k.useRef)(null), s = n.find(([e]) => e === t)?.[1] || t;
	return (0, k.useEffect)(() => {
		if (!i) return;
		let e = (e) => {
			let t = o.current;
			t && (e.composedPath().includes(t) || a(!1));
		};
		return document.addEventListener("pointerdown", e), () => document.removeEventListener("pointerdown", e);
	}, [i]), /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "run-select",
		ref: o,
		children: [/* @__PURE__ */ (0, A.jsxs)("button", {
			type: "button",
			className: "run-select-button",
			"aria-label": e,
			"aria-haspopup": "listbox",
			"aria-expanded": i,
			onClick: () => a((e) => !e),
			children: [/* @__PURE__ */ (0, A.jsx)("span", { children: s }), /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:chevron-up" })]
		}), i ? /* @__PURE__ */ (0, A.jsx)("div", {
			className: "run-select-menu",
			role: "listbox",
			"aria-label": e,
			children: n.map(([e, n]) => /* @__PURE__ */ (0, A.jsx)("button", {
				type: "button",
				role: "option",
				"aria-selected": e === t,
				className: e === t ? "selected" : "",
				onClick: () => {
					r(e), a(!1);
				},
				children: n
			}, e))
		}) : null]
	});
}
function ml({ label: e, value: t, options: n, onChange: r }) {
	return /* @__PURE__ */ (0, A.jsxs)("label", { children: [/* @__PURE__ */ (0, A.jsx)("span", { children: e }), /* @__PURE__ */ (0, A.jsx)(pl, {
		ariaLabel: e,
		value: t,
		options: n.map((e) => [e, e.replace("_", " ")]),
		onChange: r
	})] });
}
function hl({ session: e, onRunPlan: t }) {
	let n = Yn(e), r = Xn(e);
	if (!n && !r) return null;
	let i = n?.id || String(e.metadata?.pending_plan?.id || "");
	return /* @__PURE__ */ (0, A.jsxs)("section", {
		className: "run-plan-review",
		"aria-label": "Run plan review",
		children: [
			/* @__PURE__ */ (0, A.jsx)("label", { children: r ? "Preparing run plan" : "Review run plan" }),
			/* @__PURE__ */ (0, A.jsx)("div", {
				className: "run-plan-copy",
				children: r ? "Codex is preparing a plan before edits begin." : "Approve the plan to create a rollback checkpoint and start execution."
			}),
			!r && i ? /* @__PURE__ */ (0, A.jsxs)("div", {
				className: "row",
				children: [
					/* @__PURE__ */ (0, A.jsxs)("button", {
						type: "button",
						onClick: () => t(e.id, i, "approve"),
						children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:check" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Approve" })]
					}),
					/* @__PURE__ */ (0, A.jsxs)("button", {
						type: "button",
						onClick: () => t(e.id, i, "revise"),
						children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:pencil" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Revise" })]
					}),
					/* @__PURE__ */ (0, A.jsxs)("button", {
						type: "button",
						className: "danger",
						onClick: () => t(e.id, i, "cancel"),
						children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:close" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Cancel" })]
					})
				]
			}) : null
		]
	});
}
function gl({ session: e, onApprove: t }) {
	let n = nt(e);
	return n.length ? /* @__PURE__ */ (0, A.jsx)("div", {
		className: "approvals",
		"aria-label": "Pending approvals",
		children: n.map((n) => /* @__PURE__ */ (0, A.jsxs)("section", {
			className: "approval",
			children: [
				/* @__PURE__ */ (0, A.jsx)("label", { children: "Approval needed" }),
				/* @__PURE__ */ (0, A.jsx)("pre", { children: n.command }),
				n.reason ? /* @__PURE__ */ (0, A.jsx)("p", {
					className: "approval-reason",
					children: n.reason.replace(/^restart_required:\s*/, "")
				}) : null,
				n.cwd ? /* @__PURE__ */ (0, A.jsx)("p", {
					className: "muted",
					children: n.cwd
				}) : null,
				/* @__PURE__ */ (0, A.jsxs)("div", {
					className: "row",
					children: [/* @__PURE__ */ (0, A.jsx)("button", {
						type: "button",
						onClick: () => t(e.id, n.id, !0),
						children: "Approve"
					}), /* @__PURE__ */ (0, A.jsx)("button", {
						type: "button",
						className: "danger",
						onClick: () => t(e.id, n.id, !1),
						children: "Reject"
					})]
				})
			]
		}, n.id))
	}) : null;
}
function _l({ sessionId: e, queues: t, onEdit: n, onSteer: r, onClear: i }) {
	return t.length ? /* @__PURE__ */ (0, A.jsx)("div", {
		className: "message-queue",
		"aria-label": "Queued messages",
		children: t.map((t) => /* @__PURE__ */ (0, A.jsxs)("div", {
			className: "queued-message",
			children: [/* @__PURE__ */ (0, A.jsx)("span", { children: t.content }), /* @__PURE__ */ (0, A.jsxs)("div", {
				className: "queued-actions",
				children: [
					/* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button queue-edit",
						type: "button",
						onClick: () => n(e, t.id),
						"data-tooltip": "Edit",
						"aria-label": "Edit queued message",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:pencil" })
					}),
					/* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button queue-steer",
						type: "button",
						onClick: () => r(e, t.id),
						"data-tooltip": "Steer",
						"aria-label": "Steer current conversation",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:send" })
					}),
					/* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button queue-clear",
						type: "button",
						onClick: () => i(e, t.id),
						"data-tooltip": "Clear",
						"aria-label": "Clear queued message",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:close" })
					})
				]
			})]
		}, t.id))
	}) : null;
}
function vl({ session: e, question: t, value: n, onChange: r, onAnswer: i }) {
	let a = (0, k.useRef)(null);
	return (0, k.useEffect)(() => {
		let e = requestAnimationFrame(() => {
			let e = a.current;
			if (!e) return;
			e.focus({ preventScroll: !0 });
			let t = e.value.length;
			e.setSelectionRange(t, t);
		});
		return () => cancelAnimationFrame(e);
	}, [e.id, t]), /* @__PURE__ */ (0, A.jsxs)("form", {
		className: "composer question-composer",
		onSubmit: (t) => {
			t.preventDefault(), i(e.id, n);
		},
		children: [
			/* @__PURE__ */ (0, A.jsx)("label", { children: "Codex needs direction" }),
			/* @__PURE__ */ (0, A.jsx)("div", {
				className: "question-text",
				children: t.question
			}),
			/* @__PURE__ */ (0, A.jsx)("div", {
				className: "question-choices",
				children: t.choices.map((t) => /* @__PURE__ */ (0, A.jsxs)("button", {
					className: "question-choice",
					type: "button",
					onClick: () => i(e.id, t.label),
					children: [/* @__PURE__ */ (0, A.jsxs)("span", {
						className: "question-info-wrap",
						children: [/* @__PURE__ */ (0, A.jsx)(X, {
							className: "question-info",
							icon: "mdi:information-outline"
						}), /* @__PURE__ */ (0, A.jsx)("span", {
							className: "question-choice-tooltip",
							role: "tooltip",
							children: t.description || "Use this answer."
						})]
					}), /* @__PURE__ */ (0, A.jsx)("span", { children: t.label })]
				}, t.label))
			}),
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "question-custom-row",
				children: [/* @__PURE__ */ (0, A.jsx)("input", {
					ref: a,
					name: "question-custom",
					value: n,
					placeholder: t.customPlaceholder,
					"aria-label": "Custom answer",
					onChange: (e) => r(e.target.value)
				}), /* @__PURE__ */ (0, A.jsx)("button", {
					className: "send-button question-send",
					type: "submit",
					title: "Send custom answer",
					"aria-label": "Send custom answer",
					children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:send" })
				})]
			})
		]
	});
}
function yl() {
	return /* @__PURE__ */ (0, A.jsx)("div", {
		className: "message-row message-row-codex",
		children: /* @__PURE__ */ (0, A.jsxs)("article", {
			className: "message assistant message-style-codex message-style-thinking",
			"aria-live": "polite",
			"aria-label": "Codex is thinking",
			children: [/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "role",
				children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:robot" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "assistant" })]
			}), /* @__PURE__ */ (0, A.jsxs)("div", {
				className: "thinking-content",
				children: [/* @__PURE__ */ (0, A.jsx)("span", { children: "Thinking" }), /* @__PURE__ */ (0, A.jsxs)("span", {
					className: "thinking-dots",
					"aria-hidden": "true",
					children: [
						/* @__PURE__ */ (0, A.jsx)("i", {}),
						/* @__PURE__ */ (0, A.jsx)("i", {}),
						/* @__PURE__ */ (0, A.jsx)("i", {})
					]
				})]
			})]
		})
	});
}
function bl({ onNew: e, onGitToggle: t }) {
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "empty",
		children: [
			/* @__PURE__ */ (0, A.jsx)("h1", { children: "Start a Codex chat" }),
			/* @__PURE__ */ (0, A.jsx)("p", { children: "Create a session to edit Home Assistant config from this console." }),
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "empty-actions",
				children: [/* @__PURE__ */ (0, A.jsx)("button", {
					onClick: e,
					children: "New chat"
				}), /* @__PURE__ */ (0, A.jsx)(ul, { onClick: t })]
			})
		]
	});
}
//#endregion
//#region src/components/SettingsModal.tsx
var xl = [
	{
		id: "account",
		label: "Account",
		icon: "mdi:account-outline"
	},
	{
		id: "git",
		label: "Git",
		icon: "mdi:source-branch"
	},
	{
		id: "run",
		label: "Run",
		icon: "mdi:play-circle-outline"
	},
	{
		id: "models",
		label: "Models",
		icon: "mdi:robot"
	},
	{
		id: "debug",
		label: "Debug",
		icon: "mdi:bug"
	},
	{
		id: "bridge-log",
		label: "Bridge Log",
		icon: "mdi:text-box-outline"
	}
];
function Sl({ onClose: e, onTab: t, onSettingsSave: n, onBridgeRestart: r, onCoreRestart: i, onBridgeLogRefresh: a, onBridgeLogClear: o, onDeviceLogin: s, onDeviceLoginCancel: c, onAccountLogout: l, onGitSetupRefresh: u, onGitSetupGenerateKey: d, onGitSetupRemoteSave: f, onGitSetupPull: p, onGitSetupBranchChange: m, onGitSetupCommitCheckout: h, onArchiveCleanup: g }) {
	let _ = M((e) => e.settingsTab), v = M((e) => e.settings), y = M((e) => e.settingsSaving), b = M((e) => e.status).runtime?.bridge_available === !0, x = M((e) => e.bridgeActionRunning), S = M((e) => e.coreActionRunning), C = b ? "Restart" : "Start";
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "modal-backdrop",
		children: [/* @__PURE__ */ (0, A.jsx)("div", {
			className: "modal-scrim",
			onClick: e
		}), /* @__PURE__ */ (0, A.jsxs)("section", {
			className: "modal settings-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "settings-title",
			children: [
				/* @__PURE__ */ (0, A.jsxs)("header", {
					className: "modal-header",
					children: [/* @__PURE__ */ (0, A.jsx)("h2", {
						id: "settings-title",
						children: "Settings"
					}), /* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button",
						onClick: e,
						title: "Close",
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:close" })
					})]
				}),
				/* @__PURE__ */ (0, A.jsxs)("div", {
					className: "modal-tabs",
					children: [
						/* @__PURE__ */ (0, A.jsx)("div", {
							className: "debug-tabs",
							role: "tablist",
							"aria-label": "Settings views",
							children: xl.map((e) => /* @__PURE__ */ (0, A.jsxs)("button", {
								className: _ === e.id ? "active" : "",
								onClick: () => t(e.id),
								role: "tab",
								"aria-selected": _ === e.id,
								children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: e.icon }), /* @__PURE__ */ (0, A.jsx)("span", { children: e.label })]
							}, e.id))
						}),
						/* @__PURE__ */ (0, A.jsx)("span", { className: "modal-tab-spacer" }),
						y ? /* @__PURE__ */ (0, A.jsx)("span", {
							className: "settings-saving",
							children: "Saving..."
						}) : null,
						/* @__PURE__ */ (0, A.jsxs)("button", {
							className: `bridge-action ${b ? "bridge-action-restart" : "bridge-action-start"}`,
							onClick: r,
							title: `${C} bridge`,
							disabled: x,
							children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: x ? "mdi:progress-clock" : b ? "mdi:restart" : "mdi:play" }), /* @__PURE__ */ (0, A.jsx)("span", { children: x ? "Working..." : `${C} Bridge` })]
						}),
						/* @__PURE__ */ (0, A.jsxs)("button", {
							className: "core-action",
							onClick: i,
							title: "Restart Home Assistant Core",
							disabled: S,
							children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: S ? "mdi:progress-clock" : "mdi:restart-alert" }), /* @__PURE__ */ (0, A.jsx)("span", { children: S ? "Working..." : "Restart HA" })]
						})
					]
				}),
				/* @__PURE__ */ (0, A.jsxs)("div", {
					className: "modal-body",
					children: [
						_ === "account" ? /* @__PURE__ */ (0, A.jsx)(Cl, {
							onDeviceLogin: s,
							onDeviceLoginCancel: c,
							onAccountLogout: l
						}) : null,
						_ === "git" ? /* @__PURE__ */ (0, A.jsx)(kl, {
							onRefresh: u,
							onGenerateKey: d,
							onRemoteSave: f,
							onPull: p,
							onBranchChange: m,
							onCommitCheckout: h
						}) : null,
						_ === "run" ? /* @__PURE__ */ (0, A.jsx)(Il, {
							settings: v,
							onSave: n,
							onArchiveCleanup: g
						}) : null,
						_ === "models" ? /* @__PURE__ */ (0, A.jsx)(zl, {
							settings: v,
							onSave: n
						}) : null,
						_ === "debug" ? /* @__PURE__ */ (0, A.jsx)(Bl, {}) : null,
						_ === "bridge-log" ? /* @__PURE__ */ (0, A.jsx)(Vl, {
							onRefresh: a,
							onClear: o
						}) : null
					]
				})
			]
		})]
	});
}
function Cl({ onDeviceLogin: e, onDeviceLoginCancel: t, onAccountLogout: n }) {
	let r = M((e) => e.account), i = M((e) => e.accountLoading), a = M((e) => e.accountActionRunning), o = M((e) => e.deviceLogin), s = M((e) => e.status).usage || {}, [c, l] = (0, k.useState)(!1), u = r?.logged_in === !0, d = o?.status === "pending" || o?.active, f = r?.error || r?.status_text || (u ? "Logged in" : "Not logged in"), p = Hn(o?.output || "").replace(/(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?/gi, ""), m = wl(o?.verification_uri) || Tl(p), h = El(o?.user_code) || Dl(p), g = d || o?.status === "failed" || o?.status === "canceled", _ = M((e) => e.showToast);
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "settings-account",
		children: [
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: `account-status-card ${u ? "success" : r?.error ? "error" : ""}`,
				children: [/* @__PURE__ */ (0, A.jsxs)("div", {
					className: "account-status-main",
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: u ? "mdi:account-check-outline" : "mdi:account-outline" }), /* @__PURE__ */ (0, A.jsxs)("div", { children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: i ? "Checking account..." : u ? "Codex account connected" : "Codex account not connected" }), /* @__PURE__ */ (0, A.jsx)("span", { children: f })] })]
				}), u ? /* @__PURE__ */ (0, A.jsxs)("button", {
					className: "danger",
					onClick: n,
					disabled: a,
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: a ? "mdi:progress-clock" : "mdi:logout" }), /* @__PURE__ */ (0, A.jsx)("span", { children: a ? "Working..." : "Log out" })]
				}) : /* @__PURE__ */ (0, A.jsxs)("button", {
					onClick: e,
					disabled: a || d,
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: a ? "mdi:progress-clock" : "mdi:cellphone-key" }), /* @__PURE__ */ (0, A.jsx)("span", { children: a ? "Starting..." : d ? "Login pending" : "Log in with device code" })]
				})]
			}),
			u ? /* @__PURE__ */ (0, A.jsxs)("div", {
				className: "account-details",
				children: [
					/* @__PURE__ */ (0, A.jsx)(Ol, {
						label: "Mode",
						value: r?.auth_mode || "ChatGPT"
					}),
					/* @__PURE__ */ (0, A.jsx)(Ol, {
						label: "Account ID",
						value: r?.account_id || "Not reported"
					}),
					/* @__PURE__ */ (0, A.jsx)(Ol, {
						label: "Last refresh",
						value: Ll(r?.last_refresh)
					}),
					/* @__PURE__ */ (0, A.jsx)(Ol, {
						label: "5-hour usage",
						value: Rl(s.five_hour_remaining_percent)
					}),
					/* @__PURE__ */ (0, A.jsx)(Ol, {
						label: "Weekly usage",
						value: Rl(s.weekly_remaining_percent)
					})
				]
			}) : null,
			g ? /* @__PURE__ */ (0, A.jsxs)("div", {
				className: `device-login-panel ${o?.status === "failed" ? "error" : ""}`,
				children: [
					/* @__PURE__ */ (0, A.jsxs)("div", {
						className: "device-login-header",
						children: [/* @__PURE__ */ (0, A.jsxs)("div", { children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: o?.status === "failed" ? "Device login failed" : o?.status === "canceled" ? "Device login canceled" : "Device login pending" }), /* @__PURE__ */ (0, A.jsx)("span", { children: o?.error || "Open the URL, enter the code, then return here." })] }), d ? /* @__PURE__ */ (0, A.jsxs)("button", {
							className: "ghost",
							onClick: t,
							children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:close-circle-outline" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Cancel" })]
						}) : null]
					}),
					m ? /* @__PURE__ */ (0, A.jsxs)("div", {
						className: "device-login-field",
						children: [/* @__PURE__ */ (0, A.jsx)("span", { children: "URL" }), /* @__PURE__ */ (0, A.jsx)("a", {
							className: "device-login-link",
							href: m,
							target: "_blank",
							rel: "noreferrer",
							children: m
						})]
					}) : null,
					h ? /* @__PURE__ */ (0, A.jsxs)("div", {
						className: "device-login-field",
						children: [/* @__PURE__ */ (0, A.jsx)("span", { children: "Code" }), /* @__PURE__ */ (0, A.jsx)("div", {
							className: "device-login-code-row",
							children: /* @__PURE__ */ (0, A.jsxs)("div", {
								className: `device-login-code ${c ? "copied" : ""}`,
								children: [/* @__PURE__ */ (0, A.jsx)("span", { children: h }), /* @__PURE__ */ (0, A.jsx)("button", {
									className: "device-login-copy",
									onClick: async () => {
										h && (await Jn(h), l(!0), window.setTimeout(() => l(!1), 1600), _("Device code copied", "success"));
									},
									title: c ? "Copied" : "Copy code",
									"aria-label": c ? "Copied" : "Copy device code",
									children: /* @__PURE__ */ (0, A.jsx)(X, { icon: c ? "mdi:check" : "mdi:content-copy" })
								})]
							})
						})]
					}) : null,
					p ? /* @__PURE__ */ (0, A.jsx)("pre", {
						className: "device-login-output",
						children: p
					}) : null
				]
			}) : null
		]
	});
}
function wl(e) {
	return Hn(e).replace(/(?:%1b|%001b|%u001b|\\x1b|\\u001b)(?:\[[0-?]*[ -/]*[@-~])?/gi, "").replace(/[.,;:]+$/g, "").trim();
}
function Tl(e) {
	let t = e.match(/https?:\/\/[^\s)>\]"']+/g) || [];
	return wl(t.find((e) => /device|openai|auth/i.test(e)) || t[0] || "");
}
function El(e) {
	return Hn(e).toUpperCase().match(/\b[A-Z0-9]{4,8}(?:-[A-Z0-9]{4,8}){1,3}\b/)?.[0] || "";
}
function Dl(e) {
	return El(e);
}
function Ol({ label: e, value: t }) {
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "account-detail",
		children: [/* @__PURE__ */ (0, A.jsx)("span", { children: e }), /* @__PURE__ */ (0, A.jsx)("strong", { children: t })]
	});
}
function kl({ onRefresh: e, onGenerateKey: t, onRemoteSave: n, onPull: r, onBranchChange: i, onCommitCheckout: a }) {
	let o = M((e) => e.gitSetupStatus), s = M((e) => e.gitSetupLoading), c = M((e) => e.gitSetupActionRunning), l = M((e) => e.gitSetupResult), u = M((e) => e.showToast), d = pn(o), f = gn(o, s), p = o?.public_key || l?.public_key || "", [m, h] = (0, k.useState)(o?.remote_url || ""), [g, _] = (0, k.useState)(o?.branch || "main"), [v, y] = (0, k.useState)(!1);
	return (0, k.useLayoutEffect)(() => {
		h(o?.remote_url || "");
	}, [o?.remote_url]), (0, k.useLayoutEffect)(() => {
		o?.repository ? o.branch ? _(o.branch) : _((e) => e.trim() || "main") : _("");
	}, [o?.branch, o?.repository]), /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "settings-git",
		children: [
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "git-setup-cards",
				children: [
					/* @__PURE__ */ (0, A.jsx)(Al, {
						loading: s,
						ready: d,
						running: c,
						summary: f,
						onRefresh: e
					}),
					/* @__PURE__ */ (0, A.jsx)(jl, {
						remoteDraft: m,
						remoteUrl: o?.remote_url || "",
						repoError: o?.repo_error || "",
						repository: o?.repository === !0,
						remoteConfigured: o?.remote_configured === !0,
						running: c,
						onRemoteChange: h,
						onRemoteSave: n
					}),
					/* @__PURE__ */ (0, A.jsx)(Ml, {
						keyCopied: v,
						publicKey: p,
						remoteUsesSsh: o?.remote_uses_ssh === !0,
						running: c,
						sshKeyExists: o?.ssh_key_exists === !0,
						onCopyPublicKey: async () => {
							p && (await Jn(p), y(!0), window.setTimeout(() => y(!1), 1600), u("Git public key copied", "success"));
						},
						onGenerateKey: t
					}),
					/* @__PURE__ */ (0, A.jsx)(Nl, {
						branch: g,
						currentBranch: o?.branch || "",
						upstream: o?.upstream || "",
						running: c,
						repository: o?.repository === !0,
						onBranchChange: _,
						onSubmit: i
					}),
					/* @__PURE__ */ (0, A.jsx)(Pl, {
						onPull: r,
						running: c,
						remoteConfigured: o?.remote_configured === !0,
						incomingCount: o?.incoming_count || 0
					})
				]
			}),
			/* @__PURE__ */ (0, A.jsx)(Fl, {
				history: o?.history || [],
				running: c,
				onCheckout: a
			}),
			/* @__PURE__ */ (0, A.jsx)(Z, { result: l })
		]
	});
}
function Al({ loading: e, ready: t, running: n, summary: r, onRefresh: i }) {
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: `runtime-card git-setup-action-card ${r.tone === "success" ? "success" : "warning"}`,
		children: [
			/* @__PURE__ */ (0, A.jsx)("span", { children: "Git" }),
			/* @__PURE__ */ (0, A.jsx)("strong", { children: r.title }),
			/* @__PURE__ */ (0, A.jsx)("small", {
				title: r.detail,
				children: r.detail
			}),
			/* @__PURE__ */ (0, A.jsxs)("button", {
				className: "ghost",
				onClick: i,
				disabled: e || n,
				children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: e ? "mdi:progress-clock" : t ? "mdi:source-branch-check" : "mdi:refresh" }), /* @__PURE__ */ (0, A.jsx)("span", { children: e ? "Checking..." : "Refresh" })]
			})
		]
	});
}
function jl({ remoteDraft: e, remoteUrl: t, repoError: n, repository: r, remoteConfigured: i, running: a, onRemoteChange: o, onRemoteSave: s }) {
	let c = i ? "Remote saved" : r ? "Initialized" : "Not initialized", l = n || t || (i ? "Origin remote is configured." : "Set the origin remote URL.");
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: `runtime-card git-setup-action-card ${r ? "success" : "warning"}`,
		children: [
			/* @__PURE__ */ (0, A.jsx)("span", { children: "Repository" }),
			/* @__PURE__ */ (0, A.jsx)("strong", { children: c }),
			/* @__PURE__ */ (0, A.jsx)("small", {
				title: l,
				children: l
			}),
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "git-remote-form",
				children: [/* @__PURE__ */ (0, A.jsx)("input", {
					value: e,
					onChange: (e) => o(e.currentTarget.value),
					placeholder: "git@github.com:owner/repository.git",
					"aria-label": "Git origin remote URL"
				}), /* @__PURE__ */ (0, A.jsxs)("button", {
					onClick: () => s(e),
					disabled: a || !e.trim(),
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: a ? "mdi:progress-clock" : "mdi:link-variant-plus" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Save remote" })]
				})]
			})
		]
	});
}
function Ml({ keyCopied: e, publicKey: t, remoteUsesSsh: n, running: r, sshKeyExists: i, onCopyPublicKey: a, onGenerateKey: o }) {
	let s = t ? "Public key ready to copy." : n ? "Generate a key for SSH remotes." : "Only needed for SSH remotes.";
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: `runtime-card git-setup-action-card ${i || !n ? "success" : "warning"}`,
		children: [
			/* @__PURE__ */ (0, A.jsx)("span", { children: "SSH key" }),
			/* @__PURE__ */ (0, A.jsx)("strong", { children: i ? "Created" : "Missing" }),
			/* @__PURE__ */ (0, A.jsx)("small", {
				title: s,
				children: s
			}),
			/* @__PURE__ */ (0, A.jsxs)("div", {
				className: "git-public-key-row",
				children: [/* @__PURE__ */ (0, A.jsxs)("button", {
					onClick: o,
					disabled: r,
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: r ? "mdi:progress-clock" : i ? "mdi:key-change" : "mdi:key-plus" }), /* @__PURE__ */ (0, A.jsx)("span", { children: i ? "Recreate key" : "Generate key" })]
				}), t ? /* @__PURE__ */ (0, A.jsxs)("div", {
					className: `git-public-key ${e ? "copied" : ""}`,
					children: [/* @__PURE__ */ (0, A.jsx)("pre", { children: t }), /* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button",
						onClick: a,
						title: e ? "Copied" : "Copy public key",
						"aria-label": e ? "Copied" : "Copy public key",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: e ? "mdi:check" : "mdi:content-copy" })
					})]
				}) : /* @__PURE__ */ (0, A.jsx)("span", {
					className: "muted",
					children: "Generate a key to show the public key."
				})]
			}),
			/* @__PURE__ */ (0, A.jsx)("a", {
				className: "git-ssh-keys-link",
				href: "https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account",
				target: "_blank",
				rel: "noreferrer",
				children: "GitHub SSH keys"
			})
		]
	});
}
function Nl({ branch: e, currentBranch: t, upstream: n, running: r, repository: i, onBranchChange: a, onSubmit: o }) {
	let s = e.trim(), c = s === t, l = n || (i ? "Enter a local or origin branch." : "Initialize a repository first.");
	return /* @__PURE__ */ (0, A.jsxs)("form", {
		className: `runtime-card git-setup-action-card ${t ? "success" : "warning"}`,
		onSubmit: (e) => {
			e.preventDefault(), o(s);
		},
		children: [
			/* @__PURE__ */ (0, A.jsx)("span", { children: "Branch" }),
			/* @__PURE__ */ (0, A.jsx)("input", {
				value: e,
				onChange: (e) => a(e.currentTarget.value),
				placeholder: "main",
				"aria-label": "Git branch name"
			}),
			/* @__PURE__ */ (0, A.jsx)("small", {
				title: l,
				children: l
			}),
			/* @__PURE__ */ (0, A.jsxs)("button", {
				type: "submit",
				disabled: r || !i || !s || c,
				children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: r ? "mdi:progress-clock" : "mdi:source-branch" }), "Checkout"]
			})
		]
	});
}
function Pl({ onPull: e, running: t, remoteConfigured: n, incomingCount: r }) {
	let i = r > 0 ? `Pull ${r} incoming ${r === 1 ? "commit" : "commits"}` : "Pull";
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: `runtime-card git-setup-action-card ${n ? "success" : "warning"}`,
		children: [
			/* @__PURE__ */ (0, A.jsx)("span", { children: "Pull" }),
			/* @__PURE__ */ (0, A.jsx)("strong", { children: n ? "Ready" : "Unavailable" }),
			/* @__PURE__ */ (0, A.jsxs)("button", {
				onClick: e,
				disabled: t || !n,
				children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: t ? "mdi:progress-clock" : "mdi:source-pull" }), i]
			})
		]
	});
}
function Fl({ history: e, running: t, onCheckout: n }) {
	let [r, i] = (0, k.useState)(0), a = _n(e, r, 6);
	return (0, k.useLayoutEffect)(() => {
		i((t) => _n(e, t, 6).page);
	}, [e]), /* @__PURE__ */ (0, A.jsxs)("section", {
		className: "settings-section git-setup-section git-history-section",
		children: [/* @__PURE__ */ (0, A.jsxs)("div", {
			className: "git-history-header",
			children: [/* @__PURE__ */ (0, A.jsx)("h3", { children: "History" }), a.pageCount > 1 ? /* @__PURE__ */ (0, A.jsxs)("div", {
				className: "git-history-pager",
				children: [
					/* @__PURE__ */ (0, A.jsxs)("span", { children: [
						a.start,
						"-",
						a.end,
						" of ",
						e.length
					] }),
					/* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button",
						onClick: () => i((e) => e - 1),
						disabled: a.page === 0,
						title: "Previous commits",
						"aria-label": "Previous commits",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:chevron-left" })
					}),
					/* @__PURE__ */ (0, A.jsx)("button", {
						className: "icon-button",
						onClick: () => i((e) => e + 1),
						disabled: a.page >= a.pageCount - 1,
						title: "Next commits",
						"aria-label": "Next commits",
						children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:chevron-right" })
					})
				]
			}) : null]
		}), e.length ? /* @__PURE__ */ (0, A.jsx)("div", {
			className: "git-history-list",
			children: a.items.map((e, r) => {
				let i = e.hash || e.short_hash || "", o = e.short_hash || i.slice(0, 7), s = a.start + r === 1;
				return /* @__PURE__ */ (0, A.jsxs)("div", {
					className: "git-history-row",
					children: [/* @__PURE__ */ (0, A.jsxs)("div", {
						className: "git-history-main",
						children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: e.subject || "Commit" }), /* @__PURE__ */ (0, A.jsxs)("span", {
							title: Kn(e.timestamp),
							children: [o, e.timestamp ? ` · ${Wn(e.timestamp)}` : ""]
						})]
					}), /* @__PURE__ */ (0, A.jsxs)("button", {
						onClick: () => n(i),
						disabled: t || !i || s,
						children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: t ? "mdi:progress-clock" : s ? "mdi:check" : "mdi:restore" }), /* @__PURE__ */ (0, A.jsx)("span", { children: s ? "Current" : "Restore" })]
					})]
				}, i || r);
			})
		}) : /* @__PURE__ */ (0, A.jsx)("span", {
			className: "muted",
			children: "No commit history reported."
		})]
	});
}
function Z({ result: e }) {
	if (!e) return null;
	let t = Q(e);
	return /* @__PURE__ */ (0, A.jsxs)("section", {
		className: `git-setup-result ${e.ok ? "success" : "error"}`,
		children: [
			/* @__PURE__ */ (0, A.jsx)("strong", { children: e.ok ? "Last Git setup action completed" : "Last Git setup action failed" }),
			e.step ? /* @__PURE__ */ (0, A.jsx)("span", { children: e.step }) : null,
			t ? /* @__PURE__ */ (0, A.jsx)("pre", { children: t }) : null
		]
	});
}
function Q(e) {
	return Hn([
		e.stdout,
		e.stderr,
		...(e.results || []).flatMap((e) => [e.stdout, e.stderr])
	].filter(Boolean).join("\n")).trim();
}
function Il({ settings: e, onSave: t, onArchiveCleanup: n }) {
	let r = e.defaults, i = j((e) => e.archivedChatIds.length), a = M((e) => e.archiveCleanupRunning);
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "settings-run",
		children: [
			/* @__PURE__ */ (0, A.jsxs)("section", {
				className: "settings-section",
				children: [/* @__PURE__ */ (0, A.jsx)("h3", { children: "Run" }), /* @__PURE__ */ (0, A.jsxs)("div", {
					className: "settings-grid",
					children: [
						/* @__PURE__ */ (0, A.jsx)(Gl, {
							label: "Default mode",
							value: r.mode,
							options: [["auto", "Auto"], ["manual", "Manual"]],
							onChange: (n) => Kl(e, t, { mode: n })
						}),
						/* @__PURE__ */ (0, A.jsx)(Gl, {
							label: "Model preset",
							value: r.model_preset_id,
							options: e.model_presets.map((e) => [e.id, e.label]),
							onChange: (n) => Kl(e, t, { model_preset_id: n })
						}),
						/* @__PURE__ */ (0, A.jsx)(Gl, {
							label: "Reasoning",
							value: r.reasoning_effort,
							options: Jl(),
							onChange: (n) => Kl(e, t, { reasoning_effort: n })
						}),
						/* @__PURE__ */ (0, A.jsx)(Gl, {
							label: "Verbosity",
							value: r.verbosity,
							options: Yl(),
							onChange: (n) => Kl(e, t, { verbosity: n })
						}),
						/* @__PURE__ */ (0, A.jsx)(Gl, {
							label: "Plan mode",
							value: r.plan_mode,
							options: Xl(),
							onChange: (n) => Kl(e, t, { plan_mode: n })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, A.jsxs)("section", {
				className: "settings-section",
				children: [/* @__PURE__ */ (0, A.jsx)("h3", { children: "Validation" }), /* @__PURE__ */ (0, A.jsxs)("div", {
					className: "settings-grid",
					children: [/* @__PURE__ */ (0, A.jsx)(Gl, {
						label: "Validation depth",
						value: r.validation_depth,
						options: Zl(),
						onChange: (n) => Kl(e, t, { validation_depth: n })
					}), /* @__PURE__ */ (0, A.jsxs)("label", {
						className: "setting-field",
						children: [/* @__PURE__ */ (0, A.jsx)("span", { children: "Context budget" }), /* @__PURE__ */ (0, A.jsx)("input", {
							type: "number",
							min: 1e3,
							max: 2e5,
							step: 1e3,
							defaultValue: e.context_budget_chars,
							onBlur: (n) => t({
								...e,
								context_budget_chars: Number(n.currentTarget.value)
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, A.jsxs)("section", {
				className: "settings-section",
				children: [/* @__PURE__ */ (0, A.jsx)("h3", { children: "Safety" }), /* @__PURE__ */ (0, A.jsxs)("div", {
					className: "settings-grid",
					children: [/* @__PURE__ */ (0, A.jsx)(Gl, {
						label: "Tool visibility",
						value: r.tool_visibility,
						options: [
							["compact", "Compact"],
							["normal", "Normal"],
							["verbose", "Verbose"]
						],
						onChange: (n) => Kl(e, t, { tool_visibility: n })
					}), /* @__PURE__ */ (0, A.jsx)(Gl, {
						label: "Approvals",
						value: r.approval_mode,
						options: [["ask", "Ask"], ["auto_readonly", "Auto read-only"]],
						onChange: (n) => Kl(e, t, { approval_mode: n })
					})]
				})]
			}),
			/* @__PURE__ */ (0, A.jsxs)("section", {
				className: "settings-section",
				children: [/* @__PURE__ */ (0, A.jsx)("h3", { children: "Maintenance" }), /* @__PURE__ */ (0, A.jsxs)("div", {
					className: "settings-maintenance-row",
					children: [/* @__PURE__ */ (0, A.jsxs)("div", { children: [/* @__PURE__ */ (0, A.jsx)("strong", { children: "Archived chats" }), /* @__PURE__ */ (0, A.jsxs)("span", { children: [i, " archived"] })] }), /* @__PURE__ */ (0, A.jsxs)("button", {
						className: "danger",
						onClick: n,
						disabled: a || i === 0,
						children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: a ? "mdi:progress-clock" : "mdi:trash-can-outline" }), /* @__PURE__ */ (0, A.jsx)("span", { children: a ? "Cleaning..." : "Clean up archived chats" })]
					})]
				})]
			})
		]
	});
}
function Ll(e) {
	if (!e) return "Not reported";
	let t = Number(e);
	return Number.isFinite(t) && t > 0 ? Wn(t) : String(e);
}
function Rl(e) {
	let t = Number(e);
	return Number.isFinite(t) ? `${Math.round(t)}% remaining` : "Not reported";
}
function zl({ settings: e, onSave: t }) {
	let [n, r] = (0, k.useState)(""), [i, a] = (0, k.useState)("");
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "settings-models",
		children: [e.model_presets.map((n) => /* @__PURE__ */ (0, A.jsxs)("div", {
			className: "settings-model-row",
			children: [
				/* @__PURE__ */ (0, A.jsx)("input", {
					"aria-label": `${n.label} label`,
					defaultValue: n.label,
					disabled: Cn.has(n.id),
					onBlur: (r) => ql(e, t, n, { label: r.currentTarget.value })
				}),
				/* @__PURE__ */ (0, A.jsx)("input", {
					"aria-label": `${n.label} model`,
					defaultValue: n.model || "",
					disabled: Cn.has(n.id),
					placeholder: "Model id",
					onBlur: (r) => ql(e, t, n, { model: r.currentTarget.value || null })
				}),
				/* @__PURE__ */ (0, A.jsx)("button", {
					className: "icon-button danger",
					disabled: Cn.has(n.id),
					onClick: () => t(jn(e, n.id)),
					title: "Delete model preset",
					"aria-label": "Delete model preset",
					children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:trash-can-outline" })
				})
			]
		}, n.id)), /* @__PURE__ */ (0, A.jsxs)("div", {
			className: "settings-model-row add",
			children: [
				/* @__PURE__ */ (0, A.jsx)("input", {
					value: n,
					onChange: (e) => r(e.currentTarget.value),
					placeholder: "Preset label",
					"aria-label": "New preset label"
				}),
				/* @__PURE__ */ (0, A.jsx)("input", {
					value: i,
					onChange: (e) => a(e.currentTarget.value),
					placeholder: "Model id",
					"aria-label": "New model id"
				}),
				/* @__PURE__ */ (0, A.jsxs)("button", {
					onClick: () => {
						let o = n.trim(), s = i.trim();
						!o || !s || (t(An(e, {
							id: Fn(o),
							label: o,
							model: s
						})), r(""), a(""));
					},
					disabled: !n.trim() || !i.trim(),
					children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:plus" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Add" })]
				})
			]
		})]
	});
}
function Bl() {
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "settings-debug",
		children: [/* @__PURE__ */ (0, A.jsx)(Ul, {}), /* @__PURE__ */ (0, A.jsx)(Hl, {})]
	});
}
function Vl({ onRefresh: e, onClear: t }) {
	return /* @__PURE__ */ (0, A.jsx)("div", {
		className: "settings-bridge-log",
		children: /* @__PURE__ */ (0, A.jsx)(Wl, {
			onRefresh: e,
			onClear: t
		})
	});
}
function Hl() {
	let e = M((e) => e.status), t = {
		...e,
		sessions: Array.isArray(e.sessions) ? e.sessions.filter((e) => !e.archived) : e.sessions
	};
	return /* @__PURE__ */ (0, A.jsx)("pre", {
		className: "result",
		children: JSON.stringify(t, null, 2)
	});
}
function Ul() {
	let e = M((e) => e.status).runtime || {};
	return /* @__PURE__ */ (0, A.jsx)("div", {
		className: "runtime-cards",
		children: [
			{
				label: "Runner",
				value: e.runner_type || "unknown",
				detail: e.codex_exec_available === !1 ? "Codex exec unavailable" : "Codex exec ready",
				tone: e.codex_exec_available === !1 ? "error" : ""
			},
			{
				label: "Bridge",
				value: e.bridge_available === !1 ? "Unavailable" : e.bridge_available ? "Available" : "Unknown",
				detail: e.bridge_url || "No bridge URL",
				tone: e.bridge_available === !1 ? "error" : e.bridge_available ? "success" : ""
			},
			{
				label: "Uptime",
				value: Gn(e.bridge_uptime_seconds) || "Not reported",
				detail: e.bridge_started_at ? `Started ${Wn(e.bridge_started_at)}` : e.bridge_health?.error || "No bridge health data",
				tone: e.bridge_health?.error ? "warning" : ""
			},
			{
				label: "Codex",
				value: e.codex_version || "No version",
				detail: e.codex_path || e.codex_command || "No command",
				tone: e.codex_path ? "" : "warning"
			},
			{
				label: "Workspace",
				value: e.workspace_exists === !1 ? "Missing" : e.workspace_exists ? "Ready" : "Unknown",
				detail: e.workspace_path || "No workspace path",
				tone: e.workspace_exists === !1 ? "error" : ""
			}
		].map((e) => /* @__PURE__ */ (0, A.jsxs)("div", {
			className: `runtime-card ${e.tone || ""}`,
			children: [
				/* @__PURE__ */ (0, A.jsx)("span", { children: e.label }),
				/* @__PURE__ */ (0, A.jsx)("strong", { children: String(e.value) }),
				/* @__PURE__ */ (0, A.jsx)("small", { children: String(e.detail) })
			]
		}, e.label))
	});
}
function Wl({ onRefresh: e, onClear: t }) {
	let n = M((e) => e.bridgeLog), r = M((e) => e.bridgeLogLoading), i = (0, k.useRef)(null), a = Hn(n?.lines || "No bridge log output.");
	return (0, k.useLayoutEffect)(() => {
		let e = i.current;
		if (!e || !n?.exists || n?.error) return;
		let t = () => {
			e.scrollTop = e.scrollHeight;
		};
		t();
		let r = window.requestAnimationFrame(t);
		return () => window.cancelAnimationFrame(r);
	}, [
		n?.exists,
		n?.error,
		a
	]), r && !n ? /* @__PURE__ */ (0, A.jsx)("div", {
		className: "loading-state",
		children: "Loading bridge log..."
	}) : n?.error ? /* @__PURE__ */ (0, A.jsx)("pre", {
		className: "result error",
		children: n.error
	}) : n?.exists ? /* @__PURE__ */ (0, A.jsxs)(A.Fragment, { children: [/* @__PURE__ */ (0, A.jsxs)("div", {
		className: "modal-toolbar",
		children: [/* @__PURE__ */ (0, A.jsx)("span", { children: [
			n.path,
			`${n.line_count || 0} lines`,
			n.truncated ? "tail only" : ""
		].filter(Boolean).join(" - ") }), /* @__PURE__ */ (0, A.jsxs)("div", {
			className: "modal-toolbar-actions",
			children: [/* @__PURE__ */ (0, A.jsxs)("button", {
				className: "ghost bridge-log-refresh",
				onClick: e,
				disabled: r,
				children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:refresh" }), /* @__PURE__ */ (0, A.jsx)("span", { children: r ? "Refreshing..." : "Refresh" })]
			}), /* @__PURE__ */ (0, A.jsxs)("button", {
				className: "ghost bridge-log-clear",
				onClick: t,
				disabled: r,
				children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:broom" }), /* @__PURE__ */ (0, A.jsx)("span", { children: "Clear Log" })]
			})]
		})]
	}), /* @__PURE__ */ (0, A.jsx)("pre", {
		className: "result bridge-log-result",
		ref: i,
		children: a
	})] }) : /* @__PURE__ */ (0, A.jsxs)("pre", {
		className: "result",
		children: [
			"Bridge log not found at ",
			n?.path || "/config/ha_codex_bridge.log",
			"."
		]
	});
}
function Gl({ label: e, value: t, options: n, onChange: r }) {
	return /* @__PURE__ */ (0, A.jsxs)("label", {
		className: "setting-field",
		children: [/* @__PURE__ */ (0, A.jsx)("span", { children: e }), /* @__PURE__ */ (0, A.jsx)("select", {
			value: t,
			onChange: (e) => r(e.currentTarget.value),
			children: n.map(([e, t]) => /* @__PURE__ */ (0, A.jsx)("option", {
				value: e,
				children: t
			}, e))
		})]
	});
}
function Kl(e, t, n) {
	t({
		...e,
		defaults: {
			...e.defaults,
			...n
		}
	});
}
function ql(e, t, n, r) {
	Cn.has(n.id) || t(An(e, {
		...n,
		...r
	}));
}
function Jl() {
	return [
		["auto", "Auto"],
		["minimal", "Minimal"],
		["low", "Low"],
		["medium", "Medium"],
		["high", "High"],
		["xhigh", "XHigh"]
	];
}
function Yl() {
	return [
		["auto", "Auto"],
		["low", "Low"],
		["medium", "Medium"],
		["high", "High"]
	];
}
function Xl() {
	return [
		["auto", "Auto"],
		["always", "Always"],
		["off", "Off"]
	];
}
function Zl() {
	return [
		["auto", "Auto"],
		["none", "None"],
		["full", "Full"]
	];
}
//#endregion
//#region src/components/ToastStack.tsx
function Ql() {
	return /* @__PURE__ */ (0, A.jsx)("div", {
		className: "toast-stack",
		"aria-live": "polite",
		children: M((e) => e.toasts).map((e) => /* @__PURE__ */ (0, A.jsxs)("div", {
			className: `toast ${e.tone}${e.entering ? " entering" : ""}${e.exiting ? " exiting" : ""}`,
			children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: e.tone === "error" ? "mdi:alert-circle" : e.tone === "success" ? "mdi:check-circle" : "mdi:information" }), /* @__PURE__ */ (0, A.jsx)("span", { children: e.message })]
		}, e.id))
	});
}
//#endregion
//#region src/components/DiscardConfirmModal.tsx
function $l({ count: e, running: t, onCancel: n, onDiscard: r }) {
	return /* @__PURE__ */ (0, A.jsxs)("div", {
		className: "modal-backdrop discard-confirm-backdrop",
		role: "presentation",
		children: [/* @__PURE__ */ (0, A.jsx)("button", {
			className: "modal-scrim",
			type: "button",
			onClick: t ? void 0 : n,
			"aria-label": "Cancel discard"
		}), /* @__PURE__ */ (0, A.jsxs)("section", {
			className: "modal discard-confirm-modal",
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "discard-confirm-title",
			children: [/* @__PURE__ */ (0, A.jsxs)("header", {
				className: "modal-header",
				children: [/* @__PURE__ */ (0, A.jsx)("h2", {
					id: "discard-confirm-title",
					children: "Discard selected changes?"
				}), /* @__PURE__ */ (0, A.jsx)("button", {
					className: "icon-button",
					type: "button",
					onClick: n,
					disabled: t,
					"aria-label": "Cancel discard",
					children: /* @__PURE__ */ (0, A.jsx)(X, { icon: "mdi:close" })
				})]
			}), /* @__PURE__ */ (0, A.jsxs)("div", {
				className: "discard-confirm-body",
				children: [/* @__PURE__ */ (0, A.jsxs)("p", {
					className: "discard-confirm-copy",
					children: [
						"This will discard ",
						e,
						" selected ",
						e === 1 ? "file" : "files",
						". Tracked files will be restored and untracked files will be removed."
					]
				}), /* @__PURE__ */ (0, A.jsxs)("div", {
					className: "discard-confirm-actions",
					children: [/* @__PURE__ */ (0, A.jsx)("button", {
						type: "button",
						className: "ghost",
						disabled: t,
						onClick: n,
						children: "Cancel"
					}), /* @__PURE__ */ (0, A.jsxs)("button", {
						type: "button",
						className: "danger",
						disabled: t,
						onClick: r,
						children: [/* @__PURE__ */ (0, A.jsx)(X, { icon: t ? "mdi:progress-clock" : "mdi:trash-can-outline" }), /* @__PURE__ */ (0, A.jsx)("span", { children: t ? "Discarding..." : "Confirm discard" })]
					})]
				})]
			})]
		})]
	});
}
//#endregion
//#region src/hooks/useSidebarBadge.ts
var eu = [], tu = "", nu = [
	"ha-sidebar",
	"home-assistant",
	"home-assistant-main",
	"ha-drawer",
	"ha-panel-lovelace",
	"partial-panel-resolver"
], ru = 50;
function iu() {
	let e = Object.values(j.getState().chatsById).filter((e) => !e.archived), t = e.filter((e) => nt(e).length > 0 || pt(e) || mt(e)).length;
	if (t > 0) return {
		count: t,
		tone: "action",
		label: `${t} chats waiting for action`
	};
	let n = e.filter((e) => e.status === "error").length;
	if (n > 0) return {
		count: n,
		tone: "error",
		label: `${n} chats with errors`
	};
	let r = e.filter((e) => [
		"planning",
		"running",
		"working"
	].includes(e.status || "")).length;
	if (r > 0) return {
		count: r,
		tone: "working",
		label: `${r} chats working`
	};
	let i = e.filter((e) => rt(e)).length;
	return i > 0 ? {
		count: i,
		tone: "restart",
		label: `${i} chats waiting for restart`
	} : null;
}
function au() {
	let e = performance.now(), t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = (e) => {
		!e || n.has(e) || (n.add(e), e.querySelectorAll?.(nu.join(",")).forEach((e) => {
			e.localName === "ha-sidebar" && e.shadowRoot && t.add(e.shadowRoot), e.shadowRoot && r(e.shadowRoot);
		}));
	};
	r(document);
	let i = performance.now() - e;
	return i > ru && console.debug(`[ha_codex] sidebar badge root lookup took ${i.toFixed(1)}ms`), [...t];
}
function ou(e) {
	return e ? `${e.tone}:${e.count}:${e.label}` : "none";
}
function su(e) {
	if (e.querySelector("style[data-ha-codex-sidebar-badge]")) return;
	let t = document.createElement("style");
	t.dataset.haCodexSidebarBadge = "true", t.textContent = "\n    #sidebar-panel-ha-codex { position: relative; }\n    #sidebar-panel-ha-codex .ha-codex-sidebar-badge[slot=\"start\"] {\n      position: absolute;\n      top: var(--ha-space-1, 4px);\n      left: 26px;\n      border-radius: var(--ha-border-radius-md, 6px);\n      font-size: 0.65em;\n      line-height: var(--ha-line-height-expanded, 1.6);\n      padding: 0 var(--ha-space-1, 4px);\n    }\n    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.action { background: #f97316; color: #111827; }\n    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.error { background: #ef4444; color: #ffffff; }\n    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.working { background: #facc15; color: #111827; }\n    #sidebar-panel-ha-codex .ha-codex-sidebar-badge.restart { background: #38bdf8; color: #0f172a; }\n  ", e.appendChild(t);
}
function cu(e, t) {
	let n = e.querySelector("#sidebar-panel-ha-codex");
	if (!n) return;
	su(e);
	let r = [...n.querySelectorAll(".ha-codex-sidebar-badge")];
	if (!t) {
		r.forEach((e) => e.remove());
		return;
	}
	["start", "end"].forEach((e) => {
		let i = r.find((t) => t.slot === e);
		i || (i = document.createElement("span"), i.slot = e, n.appendChild(i)), i.className = `badge ha-codex-sidebar-badge ${t.tone}`, i.textContent = String(t.count), i.setAttribute("aria-label", t.label), i.title = t.label;
	});
}
function lu(e = !1) {
	let t = iu(), n = ou(t);
	!e && n === tu || (tu = n, eu.forEach((e) => cu(e, t)));
}
function uu() {
	return eu.some((e) => e.host.isConnected && e.querySelector("#sidebar-panel-ha-codex"));
}
function du() {
	(0, k.useEffect)(() => {
		let e = null, t = null, n = () => {
			e === null && (e = requestAnimationFrame(() => {
				e = null, lu();
			}));
		}, r = () => {
			t === null && (t = requestAnimationFrame(() => {
				t = null, eu = au(), lu(!0);
			}));
		}, i = j.subscribe(n), a = new MutationObserver(() => {
			if (uu()) {
				n();
				return;
			}
			r();
		});
		return a.observe(document.body, {
			childList: !0,
			subtree: !0
		}), r(), n(), () => {
			i(), a.disconnect(), e !== null && cancelAnimationFrame(e), t !== null && cancelAnimationFrame(t);
		};
	}, []);
}
//#endregion
//#region src/App.tsx
var fu = new Be(), pu = 200;
function mu({ hass: e, panel: t }) {
	return /* @__PURE__ */ (0, A.jsx)(We, {
		client: fu,
		children: /* @__PURE__ */ (0, A.jsx)(hu, {
			hass: e,
			panel: t
		})
	});
}
function hu({ hass: e, panel: t }) {
	let n = (0, k.useMemo)(() => new qe(() => e), [e]), r = nr(n), i = (0, k.useRef)(r), a = M((e) => e.gitPanelOpen), o = M((e) => pn(e.gitSetupStatus)), s = M((e) => e.gitDiscardConfirming), c = M((e) => e.discardRunning), l = M((e) => un(e.gitChanges?.files || [], e.gitSelection)), u = M((e) => e.showStatusDebug), d = j((e) => e.setShowArchived), f = j((e) => e.showArchived), p = j((e) => e.setActiveId), m = j((e) => e.activeId), h = M((e) => e.setGitPanelOpen), g = M((e) => e.setGitDiscardConfirming), _ = M((e) => e.setShowStatusDebug), v = M((e) => e.setSettingsTab), y = M((e) => e.showToast);
	du(), (0, k.useEffect)(() => {
		i.current = r;
	}, [r]), (0, k.useEffect)(() => (Vn.configure(e, t), () => Vn.cleanup()), [e, t]), (0, k.useEffect)(() => {
		e && r.loadInitial().catch((e) => y(N(e), "error"));
	}, [
		e,
		r,
		y
	]), (0, k.useEffect)(() => {
		if (!m) return;
		let e = j.getState().chatsById[m], t = Math.max(0, ...(j.getState().messagesByChatId[m] || []).map((e) => Number(e.id)).filter((e) => Number.isFinite(e))), r = Number(e?.last_message_id || 0);
		if (!r || r <= t) return;
		let i = !1;
		return n.messagesAfter(m, t, t ? void 0 : pu).then((e) => {
			i || j.getState().appendMessages(m, e.messages || [], !1);
		}).catch((e) => y(N(e), "error")), () => {
			i = !0;
		};
	}, [
		m,
		n,
		y
	]), (0, k.useEffect)(() => {
		let e = window.setInterval(() => {
			i.current.maybeRunScheduledRestart();
		}, 1e3);
		return () => window.clearInterval(e);
	}, []), (0, k.useEffect)(() => {
		let e = (e) => {
			e.key === "Escape" && M.getState().showStatusDebug && _(!1);
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [_]);
	let b = (e) => (...t) => {
		Promise.resolve(e(...t)).catch((e) => y(N(e), "error"));
	};
	return /* @__PURE__ */ (0, A.jsxs)("main", {
		className: `shell ${a && o ? "git-open" : "git-closed"}`,
		children: [
			/* @__PURE__ */ (0, A.jsx)(hs, {
				onNew: b(r.createSession),
				onSelect: p,
				onArchive: b(r.archiveSession),
				onDeleteArchived: b(r.deleteArchivedSession),
				onToggleArchived: () => d(!f),
				onValidate: b(() => r.runValidation(m)),
				onRestartNow: b((e, t) => r.respondApproval(e, t, !0, "Restarting Home Assistant")),
				onRestartSchedule: r.scheduleRestartAfterChats,
				onRestartScheduleCancel: r.cancelScheduledRestart,
				onDebug: b(async () => {
					await Promise.all([r.loadStatus(), r.loadSettings()]), v("run"), _(!0);
				})
			}),
			/* @__PURE__ */ (0, A.jsx)("section", {
				className: "chat",
				children: /* @__PURE__ */ (0, A.jsx)(cl, {
					api: n,
					hass: e,
					onNew: b(r.createSession),
					onGitToggle: b(r.toggleGitPanel),
					onRenameStart: r.startRename,
					onRenameSave: b(r.saveRename),
					onArchive: b(r.archiveSession),
					onCancel: b(r.cancelSession),
					onRetry: b(r.retryContinueSession),
					onSend: b(r.sendPrompt),
					onAnswer: b(r.answerQuestion),
					onApprove: b(r.respondApproval),
					onRunPlan: b(r.respondRunPlan),
					onRollback: b(r.rollbackRun),
					onCopy: b(async (e) => {
						await Jn(e), y("Copied to clipboard", "success");
					}),
					onQueueEdit: r.editQueuedMessage,
					onQueueSteer: b(r.steerQueuedMessage),
					onQueueClear: r.clearQueuedMessage,
					onValidationReload: b(r.reloadValidationDomains),
					onRunSettingsChange: b(r.updateSessionRunSettings)
				})
			}),
			o ? /* @__PURE__ */ (0, A.jsx)(Os, {
				open: a,
				onClose: () => h(!1),
				onRefresh: b(() => r.loadGitChanges(!0)),
				onLoadMore: r.showMoreGitFiles,
				onToggleFile: b(r.toggleGitFileDiff),
				onCommit: b(r.commitAndPush)
			}) : null,
			s && l ? /* @__PURE__ */ (0, A.jsx)($l, {
				count: l,
				running: c,
				onCancel: () => g(!1),
				onDiscard: b(r.discardSelectedGitFiles)
			}) : null,
			u ? /* @__PURE__ */ (0, A.jsx)(Sl, {
				onClose: () => _(!1),
				onTab: b(async (e) => {
					v(e), e === "bridge-log" && !M.getState().bridgeLog && await r.loadBridgeLog(), e === "account" && await r.loadAccountStatus(), e === "git" && await r.loadGitSetupStatus();
				}),
				onSettingsSave: b(r.updateSettings),
				onBridgeRestart: b(r.startOrRestartBridge),
				onCoreRestart: b(r.restartHomeAssistant),
				onBridgeLogRefresh: b(r.loadBridgeLog),
				onBridgeLogClear: b(r.clearBridgeLog),
				onDeviceLogin: b(r.startDeviceLogin),
				onDeviceLoginCancel: b(r.cancelDeviceLogin),
				onAccountLogout: b(r.logoutAccount),
				onGitSetupRefresh: b(async () => {
					await r.loadGitSetupStatus();
				}),
				onGitSetupGenerateKey: b(r.generateGitSetupKey),
				onGitSetupRemoteSave: b(r.saveGitSetupRemote),
				onGitSetupPull: b(r.pullGitSetupRemote),
				onGitSetupBranchChange: b(r.changeGitSetupBranch),
				onGitSetupCommitCheckout: b(r.checkoutGitSetupCommit),
				onArchiveCleanup: b(r.cleanupArchivedSessions)
			}) : null,
			/* @__PURE__ */ (0, A.jsx)(Ql, {})
		]
	});
}
//#endregion
//#region src/features/theme/themeUtils.ts
function gu(e) {
	let t = e?.selectedTheme;
	if (t && typeof t == "object" && typeof t.dark == "boolean") return t.dark ? "dark" : "light";
	let n = e?.themes?.darkMode;
	return typeof n == "boolean" ? n ? "dark" : "light" : "dark";
}
function _u(e) {
	return `theme-${gu(e)}`;
}
//#endregion
//#region src/styles/panel.css?inline
var vu = ".ha-codex-root{--tw-bg:#0b1120;--tw-panel:#111827;--tw-panel-soft:#172033;--tw-panel-strong:#1f2937;--tw-border:#2d3748;--tw-muted:#94a3b8;--tw-text:#e5edf7;--tw-text-strong:#f8fafc;--tw-primary:#38bdf8;--tw-primary-soft:#0c344f;--tw-accent:#2dd4bf;--tw-accent-soft:#123a3a;--tw-warning:#f59e0b;--tw-danger:#ef4444;--tw-danger-soft:#3b1118;--tw-success:#22c55e;--tw-surface:#0b1120;--tw-action-soft:#123044;--tw-shadow:0 18px 50px #00000061;--tw-ring:0 0 0 3px #38bdf838;--tw-button-shadow:0 10px 24px #02061747;--tw-button-primary-shadow:0 12px 28px #38bdf842;--tw-button-danger-shadow:0 12px 28px #ef44443d;height:100%;min-height:100%;color:var(--tw-text);background:var(--tw-bg);font-family:var(--ha-font-family-body,system-ui, sans-serif);--lightningcss-light: ;--lightningcss-dark:initial;--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark;display:block}.ha-codex-root.theme-light{--tw-bg:var(--primary-background-color,#f8fafc);--tw-panel:var(--card-background-color,#fff);--tw-panel-soft:var(--secondary-background-color,#f1f5f9);--tw-panel-strong:#e2e8f0;--tw-border:var(--divider-color,#d5dde8);--tw-muted:var(--secondary-text-color,#64748b);--tw-text:var(--primary-text-color,#334155);--tw-text-strong:var(--primary-text-color,#0f172a);--tw-primary:var(--primary-color,#0284c7);--tw-primary-soft:#e0f2fe;--tw-accent:var(--accent-color,#0f766e);--tw-accent-soft:#ccfbf1;--tw-warning:#b45309;--tw-danger:#dc2626;--tw-danger-soft:#fee2e2;--tw-success:#16a34a;--tw-surface:#fff;--tw-action-soft:#e0f2fe;--tw-shadow:0 18px 50px #0f172a24;--tw-ring:0 0 0 3px #0284c733;--tw-button-shadow:0 10px 24px #0f172a24;--tw-button-primary-shadow:0 12px 28px #0284c72e;--tw-button-danger-shadow:0 12px 28px #dc262629;--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light}.ha-codex-root.theme-light .shell{background:radial-gradient(circle at 24% 0%, #0ea5e91f, transparent 30%), linear-gradient(180deg, #fff 0%, var(--tw-bg) 100%)}.ha-codex-root.theme-light .rail,.ha-codex-root.theme-light .drawer,.ha-codex-root.theme-light .chat-header,.ha-codex-root.theme-light .composer,.ha-codex-root.theme-light .archived-note,.ha-codex-root.theme-light .commit-box{background:#fffffff0}.ha-codex-root.theme-light .run-controls select,.ha-codex-root.theme-light .run-controls-extra select,.ha-codex-root.theme-light .run-select-button,.ha-codex-root.theme-light .setting-field select,.ha-codex-root.theme-light .setting-field input,.ha-codex-root.theme-light .settings-model-row input,.ha-codex-root.theme-light .archive-search input,.ha-codex-root.theme-light .plan-mode-options,.ha-codex-root.theme-light .builder-field input,.ha-codex-root.theme-light .builder-field select,.ha-codex-root.theme-light .builder-field textarea,.ha-codex-root.theme-light .context-toolbar input,.ha-codex-root.theme-light textarea,.ha-codex-root.theme-light input[name=question-custom]{background:#ffffffe6}.ha-codex-root.theme-light .message-style-command,.ha-codex-root.theme-light .message-builder-chip,.ha-codex-root.theme-light .message-context-chip,.ha-codex-root.theme-light .validation-card,.ha-codex-root.theme-light .account-status-card,.ha-codex-root.theme-light .account-detail,.ha-codex-root.theme-light .device-login-panel,.ha-codex-root.theme-light .git-setup-result,.ha-codex-root.theme-light .builder-context-chip,.ha-codex-root.theme-light .builder-context-empty,.ha-codex-root.theme-light .context-row,.ha-codex-root.theme-light .runtime-card,.ha-codex-root.theme-light .message-file-changes .diff-file{background:#ffffffb8}.ha-codex-root.theme-light .entity-combobox-chip{border-color:var(--tw-border);color:var(--tw-text-strong);background:#fff}.ha-codex-root.theme-light .entity-combobox-chip ha-icon{color:var(--tw-text-strong)}.ha-codex-root.theme-light .entity-combobox-chip-entity-icon{color:var(--tw-primary)}.ha-codex-root.theme-light .validation-output pre,.ha-codex-root.theme-light .markdown-body pre,.ha-codex-root.theme-light .device-login-code,.ha-codex-root.theme-light .device-login-output,.ha-codex-root.theme-light .git-public-key,.ha-codex-root.theme-light .git-setup-result pre,.ha-codex-root.theme-light .diff-lines,.ha-codex-root.theme-light .git-operation-result pre,.ha-codex-root.theme-light .result,.ha-codex-root.theme-light .raw-event-details pre,.ha-codex-root.theme-light .entity-combobox-menu{background:#f8fafc}.ha-codex-root.theme-light .message-style-command,.ha-codex-root.theme-light .command-text{color:var(--tw-text)}.ha-codex-root.theme-light .line-stats .added,.ha-codex-root.theme-light .diff-line.added{background:#dcfce7}.ha-codex-root.theme-light .line-stats .added,.ha-codex-root.theme-light .diff-line.added .marker,.ha-codex-root.theme-light .diff-line.added code{color:#166534}.ha-codex-root.theme-light .line-stats .deleted,.ha-codex-root.theme-light .diff-line.deleted{background:#fee2e2}.ha-codex-root.theme-light .line-stats .deleted,.ha-codex-root.theme-light .diff-line.deleted .marker,.ha-codex-root.theme-light .diff-line.deleted code,.ha-codex-root.theme-light .builder-errors,.ha-codex-root.theme-light .context-errors,.ha-codex-root.theme-light .diff-error,.ha-codex-root.theme-light .loading-state.error{color:#991b1b}.ha-codex-root.theme-light .diff-line.hunk{background:#e0f2fe}.ha-codex-root.theme-light .diff-line.hunk .marker,.ha-codex-root.theme-light .diff-line.hunk code{color:#075985}.ha-codex-root.theme-light .device-login-code.copied,.ha-codex-root.theme-light .device-login-code.copied .device-login-copy,.ha-codex-root.theme-light .modal-tabs .bridge-action-start{color:#166534}.ha-codex-root.theme-light .context-button b,.ha-codex-root.theme-light .context-row.selected .context-checkbox,.ha-codex-root.theme-light button:not(:where(.ghost,.icon-button,.archive-toggle,.git-toggle,.run-select-button,.debug-button,.validation-status-button,.session,.restart-action,.context-button,.builder-button,.question-choice,.diff-card,.git-load-more,.context-row,.secondary,.device-login-copy,.scroll-to-bottom,.modal-scrim,.context-chip,.context-clear)){color:#fff}.ha-codex-root.theme-light button.ghost,.ha-codex-root.theme-light .tabs button,.ha-codex-root.theme-light .header-actions button,.ha-codex-root.theme-light .icon-button,.ha-codex-root.theme-light .debug-button,.ha-codex-root.theme-light .archive-toggle,.ha-codex-root.theme-light .git-toggle,.ha-codex-root.theme-light .run-select-button,.ha-codex-root.theme-light .run-select-menu button,.ha-codex-root.theme-light .modal-tabs button,.ha-codex-root.theme-light .context-button,.ha-codex-root.theme-light .builder-button,.ha-codex-root.theme-light .question-choice,.ha-codex-root.theme-light .diff-card,.ha-codex-root.theme-light .git-load-more,.ha-codex-root.theme-light .context-row,.ha-codex-root.theme-light .restart-action,.ha-codex-root.theme-light .run-controls>button,.ha-codex-root.theme-light .scroll-to-bottom,.ha-codex-root.theme-light .context-chip,.ha-codex-root.theme-light .context-clear,.ha-codex-root.theme-light button.secondary,.ha-codex-root.theme-light .entity-combobox-menu button,.ha-codex-root.theme-light .session{color:var(--tw-text)}.ha-codex-root.theme-light .validation-status-button,.ha-codex-root.theme-light .plan-mode-options button{color:var(--tw-muted)}.ha-codex-root.theme-light .validation-status-button.success{color:var(--tw-success)}.ha-codex-root.theme-light .validation-status-button.error{color:var(--tw-danger)}.ha-codex-root.theme-light .validation-status-button.warning,.ha-codex-root.theme-light .validation-status-button.running{color:var(--tw-warning)}.ha-codex-root.theme-light .modal-tabs button{color:var(--tw-muted)}.ha-codex-root.theme-light .plan-mode-options button.active{color:var(--tw-text-strong)}.ha-codex-root.theme-light .run-select-menu button:hover,.ha-codex-root.theme-light .run-select-menu button.selected,.ha-codex-root.theme-light .modal-tabs button.active,.ha-codex-root.theme-light .modal-tabs button.active:hover{background:var(--tw-primary);border-color:var(--tw-primary);color:#fff}.ha-codex-root.theme-light .modal-tabs .bridge-action:not(:disabled):hover,.ha-codex-root.theme-light .modal-tabs .bridge-action-start:not(:disabled):hover,.ha-codex-root.theme-light .modal-tabs .core-action:not(:disabled):hover{color:#fff}.ha-codex-root.theme-light .modal-tabs .bridge-action:not(:disabled):hover ha-icon,.ha-codex-root.theme-light .modal-tabs .bridge-action-start:not(:disabled):hover ha-icon,.ha-codex-root.theme-light .modal-tabs .core-action:not(:disabled):hover ha-icon{color:inherit}.ha-codex-root.theme-light .archive-search{border-color:var(--tw-border);color:var(--tw-muted);background:#ffffffdb}.ha-codex-root.theme-light .archive-search:focus-within{border-color:var(--tw-primary);color:var(--tw-primary);background:#fff}.ha-codex-root.theme-light .archive-search input{color:var(--tw-text-strong);background:0 0}.ha-codex-root.theme-light .archive-search input::placeholder{color:var(--tw-muted)}.ha-codex-root.theme-light .settings-maintenance-row{border:1px solid var(--tw-border);color:var(--tw-text);background:#ffffffb8}.ha-codex-root.theme-light .settings-maintenance-row strong{color:var(--tw-text-strong)}.ha-codex-root.theme-light .settings-maintenance-row>div span{color:var(--tw-muted)}.ha-codex-root.theme-light .discard-confirm-actions button.ghost{color:var(--tw-text)}.ha-codex-root.theme-light .git-history-list,.ha-codex-root.theme-light .git-history-row{border-color:var(--tw-border);background:#ffffffb8}*{box-sizing:border-box}.shell{background:radial-gradient(circle at 24% 0%, #38bdf81f, transparent 30%), linear-gradient(180deg, #0f172a 0%, var(--tw-bg) 100%);grid-template-columns:292px minmax(0,1fr) 372px;height:100%;min-height:0;transition:grid-template-columns .22s cubic-bezier(.2,0,0,1);display:grid;position:relative;overflow:hidden}.shell.git-closed{grid-template-columns:292px minmax(0,1fr) 0}.rail,.drawer{border-right:1px solid var(--tw-border);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);background:#111827f0;min-width:0}.rail{grid-template-rows:auto minmax(0,1fr) auto;min-height:0;display:grid;overflow:hidden}.drawer{border-left:1px solid var(--tw-border);will-change:transform;border-right:0;grid-template-rows:auto minmax(0,1fr) auto;width:372px;min-height:0;transition:opacity .18s cubic-bezier(.2,0,0,1),transform .22s cubic-bezier(.2,0,0,1),visibility linear;display:grid;overflow:hidden;transform:translate(0)}.shell.git-closed .drawer{opacity:0;pointer-events:none;visibility:hidden;transition:opacity .16s cubic-bezier(.2,0,0,1),transform .2s cubic-bezier(.4,0,1,1),visibility 0s linear .2s;transform:translate(100%)}.brand{z-index:1;background:inherit;justify-content:space-between;align-items:center;padding:18px;display:flex;position:sticky;top:0}.brand button{border-radius:999px;width:34px;height:34px;min-height:34px;padding:0}.brand strong{font-size:18px;line-height:1.2;display:block}.brand span,.meta,.muted,.chat-header p{color:var(--tw-muted);font-size:12px}.sessions{flex-direction:column;align-content:start;gap:8px;min-height:0;padding:0 12px 18px;display:flex;overflow:hidden}.sessions-virtual-list{flex:auto;height:100%;min-height:0}.archive-search{border:1px solid var(--tw-border);color:var(--tw-muted);background:#0f172a94;border-radius:8px;flex:none;grid-template-columns:20px minmax(0,1fr);align-items:center;gap:8px;min-height:38px;padding:0 10px;display:grid}.archive-search ha-icon{--mdc-icon-size:18px}.archive-search:focus-within{box-shadow:var(--tw-ring);color:var(--tw-primary);border-color:#38bdf89e}.archive-search input{color:var(--tw-text);font:inherit;background:0 0;border:0;outline:0;width:100%;min-width:0;padding:8px 0}.archive-search input::placeholder{color:var(--tw-muted)}.rail-footer{background:inherit;border-top:1px solid var(--tw-border);gap:10px;padding:12px;display:grid}.usage-summary{grid-template-columns:1fr 1fr;gap:8px;display:grid}.usage-summary div{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;gap:4px;padding:7px 9px;display:grid}.usage-summary span{color:var(--tw-muted);font-size:11px}.usage-main{justify-content:space-between;align-items:center;gap:6px;min-width:0;display:flex}.usage-summary strong{color:var(--tw-text-strong);font-size:14px;line-height:1.2}.usage-summary small{color:var(--tw-muted);text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:10px;line-height:1.2;overflow:hidden}.rail-footer-actions{grid-template-columns:minmax(0,1fr) 34px 34px;gap:8px;display:grid;position:relative}.rail-footer-actions.restart-pending{grid-template-columns:minmax(0,1fr) 34px 34px 34px}.archive-toggle{border-color:var(--tw-border);color:var(--tw-text);justify-content:initial;text-align:left;background:0 0;grid-template-columns:22px minmax(0,1fr) auto;width:100%;display:grid}.archive-toggle.active{background:var(--tw-primary-soft);border-color:#38bdf86b}.archive-toggle:hover{background:var(--tw-panel-soft);color:var(--tw-text-strong);filter:none;border-color:#38bdf86b}.archive-toggle.active:hover{background:#0c344fd6;border-color:#38bdf89e}.archive-toggle ha-icon{--mdc-icon-size:18px}.restart-action-wrap{position:static}.restart-action{width:34px;height:34px;min-height:34px;padding:0}.restart-action.pending{color:var(--tw-warning);background:#f59e0b29;border-color:#f59e0b94}.restart-action.scheduled{background:var(--tw-primary-soft);color:var(--tw-primary);border-color:#38bdf89e}.restart-action:hover{background:var(--tw-panel-soft);filter:none;border-color:currentColor}.restart-action ha-icon{--mdc-icon-size:18px}.restart-action.scheduled ha-icon{animation:1.1s linear infinite restart-spin}.restart-action-menu{background:var(--tw-panel);border:1px solid var(--tw-border);box-shadow:var(--tw-shadow);z-index:15;border-radius:8px;gap:3px;width:min(260px,100%);padding:5px;display:grid;position:absolute;bottom:calc(100% + 8px);left:50%;right:auto;transform:translate(-50%)}.restart-action-menu button{color:var(--tw-text);text-align:left;background:0 0;border-color:#0000;justify-content:flex-start;width:100%;min-height:30px;padding:6px 8px}.restart-action-menu button:hover{background:var(--tw-primary-soft);color:var(--tw-text-strong);border-color:#38bdf859}@keyframes restart-spin{to{transform:rotate(-360deg)}}.archive-toggle span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.archive-toggle b{background:var(--tw-panel-soft);color:var(--tw-text);text-align:center;border-radius:999px;min-width:24px;padding:1px 7px}.validation-status-button{border-color:var(--tw-border);color:var(--tw-muted);background:0 0;width:34px;height:34px;min-height:34px;padding:0;position:relative}.validation-status-button:hover{background:var(--tw-panel-soft);border-color:currentColor}.validation-status-button[aria-disabled=true]{cursor:wait}.validation-status-button.success{color:var(--tw-success)}.validation-status-button.error{color:var(--tw-danger)}.validation-status-button.warning,.validation-status-button.running{color:var(--tw-warning)}.validation-status-button ha-icon{--mdc-icon-size:18px}.validation-tooltip{background:var(--tw-panel);border:1px solid var(--tw-border);box-shadow:var(--tw-shadow);color:var(--tw-text);pointer-events:none;text-align:left;white-space:pre-wrap;z-index:12;border-radius:8px;gap:6px;width:min(260px,100vw - 32px);max-height:min(360px,60vh);padding:10px 12px;display:none;position:absolute;bottom:calc(100% + 8px);right:-42px;overflow:auto}.validation-tooltip strong{color:var(--tw-text-strong);margin-bottom:4px;font-size:12px;line-height:18px;display:block}.validation-tooltip span{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px;display:block}.validation-status-button:hover .validation-tooltip,.validation-status-button:focus-visible .validation-tooltip{display:block}.session-row{contain:layout paint;will-change:transform;border:1px solid #0000;border-radius:8px;grid-template-columns:minmax(0,1fr) 34px;align-items:center;gap:4px;height:66px;min-height:66px;margin-bottom:8px;transition:transform .18s,background-color .14s,border-color .14s;display:grid}.session{color:inherit;cursor:pointer;text-align:left;background:0 0;border:0;border-radius:8px;min-width:0;height:100%;padding:11px 10px;display:block}.session-row.active,.session-row:hover{background:var(--tw-panel-soft);border-color:var(--tw-border)}.session-row.active{box-shadow:inset 3px 0 0 var(--tw-primary)}.session-row.archived{grid-template-columns:minmax(0,1fr) 34px 34px}.session-row.switching-1{animation:.32s cubic-bezier(.2,0,0,1) session-switch-1}.session-row.switching-2{animation:.32s cubic-bezier(.2,0,0,1) session-switch-2}@keyframes session-switch-1{0%{opacity:.72;transform:translateY(10px)scale(.985)}58%{opacity:1;transform:translateY(-2px)scale(1)}to{opacity:1;transform:translateY(0)scale(1)}}@keyframes session-switch-2{0%{opacity:.72;transform:translateY(10px)scale(.985)}58%{opacity:1;transform:translateY(-2px)scale(1)}to{opacity:1;transform:translateY(0)scale(1)}}@media (prefers-reduced-motion:reduce){.session-row.switching-1,.session-row.switching-2{animation:none}}.session-archive,.session-delete{opacity:.68}.session-archive:hover,.session-delete:hover{color:var(--tw-danger);opacity:1}.session-archive[data-action=unarchive]:hover{color:var(--tw-primary)}.session-text{place-items:flex-start start;gap:4px;width:100%;min-width:0;display:grid}.title-line{align-items:center;gap:8px;width:100%;min-width:0;display:flex}.title{text-overflow:ellipsis;white-space:nowrap;flex:auto;min-width:0;max-width:100%;overflow:hidden}.meta{text-align:left;justify-content:flex-start;align-items:center;gap:8px;min-width:0;display:flex}.status-dot{border-radius:999px;flex:0 0 8px;width:8px;height:8px;display:inline-block}.status-dot-error{background:var(--tw-danger)}.status-dot-working{background:#facc15}.status-dot-approval{background:var(--tw-warning)}.status-dot-restart{background:var(--tw-primary)}.status-dot-idle{background:var(--tw-success)}.chat{background:0 0;grid-template-rows:auto minmax(0,1fr) auto;min-width:0;min-height:0;display:grid}.chat-header{-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);border-bottom:1px solid var(--tw-border);background:#111827e0;justify-content:space-between;align-items:center;gap:16px;padding:16px 22px;display:flex}h1{margin:0;font-size:20px;line-height:1.25}.title-area{flex:auto;min-width:0}.title-row{align-items:center;gap:6px;min-width:0;display:flex}.title-row h1{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.run-controls{flex-wrap:wrap;align-items:center;gap:6px;margin-top:8px;display:flex}.composer .run-controls{margin-top:0}.run-controls select,.run-controls-extra select,.run-select-button,.setting-field select,.setting-field input,.settings-model-row input{border:1px solid var(--tw-border);color:var(--tw-text);background:#0f172ac2;border-radius:7px;min-width:0;min-height:32px;padding:5px 8px}.run-controls>select,.run-controls>.run-select{max-width:180px}.run-controls>button{gap:6px;min-height:32px;padding:5px 9px}.run-controls>button.active{background:var(--tw-primary-soft);color:var(--tw-text-strong);border-color:#38bdf87a}.run-controls-extra{flex-wrap:wrap;align-items:center;gap:6px;display:flex}.run-controls-extra label{color:var(--tw-muted);align-items:center;gap:5px;font-size:11px;display:inline-flex}.run-controls-extra select{max-width:112px;min-height:30px}.run-controls-extra .run-select{max-width:112px}.run-select{min-width:0;display:inline-flex;position:relative}.run-select-button{justify-content:space-between;align-items:center;gap:6px;width:100%;min-width:0;min-height:32px;padding:5px 8px;display:inline-flex}.run-controls-extra .run-select-button{min-height:30px}.run-select-button span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.run-select-button ha-icon{--mdc-icon-size:16px;flex:none}.run-select-menu{background:var(--tw-panel);border:1px solid var(--tw-border);box-shadow:var(--tw-shadow);z-index:16;border-radius:8px;gap:2px;width:max-content;min-width:100%;max-height:min(260px,45vh);padding:5px;display:grid;position:absolute;bottom:calc(100% + 6px);left:0;overflow:auto}.run-select-menu button{color:var(--tw-text);text-align:left;white-space:nowrap;background:0 0;border-color:#0000;justify-content:flex-start;min-height:28px;padding:5px 8px}.run-select-menu button:hover,.run-select-menu button.selected{background:var(--tw-primary-soft);color:var(--tw-text-strong);border-color:#38bdf859}.title-input{background:var(--tw-panel);border:1px solid var(--tw-primary);color:var(--tw-text-strong);font:inherit;border-radius:8px;min-width:min(320px,60vw);min-height:34px;padding:4px 8px;font-size:20px;line-height:1.25}.header-actions,.row,.tabs{gap:8px;display:flex}.header-actions{flex:none;align-items:center;margin-left:auto}.git-toggle{border-color:var(--tw-border);color:var(--tw-text);background:0 0;gap:7px;min-width:0}.git-toggle.active{background:var(--tw-primary-soft);border-color:#38bdf86b}.git-toggle:hover{background:var(--tw-panel-soft);color:var(--tw-text-strong);filter:none;border-color:#38bdf86b}.git-toggle ha-icon{--mdc-icon-size:18px}.git-toggle b{background:var(--tw-danger);color:#fff;border-radius:999px;min-width:18px;padding:0 6px;font-size:11px;line-height:18px}.transcript{--message-side-margin:clamp(20px, 8vw, 140px);scroll-behavior:smooth;min-height:0;padding:24px;position:relative;overflow:hidden}.scroll-to-bottom{background:var(--tw-panel-strong);color:var(--tw-text-strong);z-index:4;border-color:#38bdf86b;width:24px;height:18px;min-height:18px;padding:0;position:absolute;bottom:16px;left:50%;transform:translate(-50%);box-shadow:0 12px 30px #00000057}.scroll-to-bottom:hover{background:var(--tw-primary-soft);border-color:var(--tw-primary);filter:none}.scroll-to-bottom svg{width:16px;height:16px;display:block}.show-older{background:var(--tw-panel-soft);border-color:var(--tw-border);color:var(--tw-text);justify-content:center;gap:8px;width:100%;max-width:420px;margin:0 auto 18px;display:flex}.show-older span{color:var(--tw-muted)}.message{background:var(--tw-panel);border:1px solid var(--tw-border);box-sizing:border-box;color:var(--tw-text);border-radius:8px;flex:0 920px;width:100%;max-width:920px;margin:0;padding:14px 42px 14px 14px;position:relative;box-shadow:0 10px 30px #0000003d}.message-row{box-sizing:border-box;contain:layout paint;width:100%;margin:0 0 14px;display:flex}.message-row-center{justify-content:center}.message-row-user{padding-left:var(--message-side-margin);justify-content:flex-end}.message-row-codex{padding-right:var(--message-side-margin);justify-content:flex-start}.message.new-message{opacity:0;transform-origin:50% 0;will-change:opacity, transform, box-shadow;transform:translateY(18px)scale(.985)}.message.new-message.enter-active{opacity:1;transition:opacity .42s cubic-bezier(.2,.8,.2,1),transform .42s cubic-bezier(.2,.8,.2,1),box-shadow .62s;transform:translateY(0)scale(1);box-shadow:0 14px 38px #0000004d,0 0 0 1px #38bdf82e}.message-row-user .message{padding-left:42px;padding-right:14px}.message-style-user{background:var(--tw-primary-soft);border-color:#38bdf857}.message-style-command{color:#cbd5e1;background:#080d18f0;border-color:#4755696b;flex-basis:760px;max-width:760px;padding:8px 10px;font-size:12px;box-shadow:0 6px 18px #00000038}.command-line{align-items:flex-start;gap:8px;min-width:0;display:flex}.command-text{color:#cbd5e1;overflow-wrap:anywhere;white-space:pre-wrap;flex:auto;min-width:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:18px}.message-style-command .message-time{flex:none;margin-left:0;line-height:18px}.message-style-command .copy-button{flex:none;width:24px;height:24px;min-height:24px;position:static}.message-style-command .copy-button ha-icon{--mdc-icon-size:14px}.message-style-event,.message-style-system{background:var(--tw-accent-soft);border-color:#2dd4bf47}.message-style-action{background:var(--tw-action-soft);border-color:#7dd3fc4d}.message-style-error{background:var(--tw-danger-soft);border-color:#f8717157;padding-bottom:50px}.role{color:var(--tw-muted);letter-spacing:0;text-transform:uppercase;align-items:center;gap:6px;margin-bottom:8px;font-size:11px;font-weight:700;display:flex}.role ha-icon{--mdc-icon-size:15px}.role b{color:var(--tw-accent);text-transform:none;background:#2dd4bf24;border-radius:999px;padding:2px 7px;font-size:10px}.message-time{color:var(--tw-muted);text-transform:none;margin-left:auto;font-weight:600}.message-row-user .role{justify-content:flex-end}.message-row-user .message-time{order:-1;margin-left:0;margin-right:auto}.markdown-body{overflow-wrap:anywhere;line-height:1.5}.markdown-body>:first-child{margin-top:0}.markdown-body>:last-child{margin-bottom:0}.message-context-attachments,.message-builder-summary{flex-wrap:wrap;align-items:center;gap:6px;margin-top:10px;display:flex}.message-builder-chip{color:var(--tw-text);background:#0f172a6b;border:1px solid #2dd4bf38;border-radius:8px;align-items:center;gap:5px;min-width:0;max-width:260px;padding:4px 7px;font-size:12px;line-height:18px;display:inline-flex}.message-builder-chip.strong{color:var(--tw-text-strong);border-color:#38bdf857;font-weight:700}.message-builder-chip ha-icon{--mdc-icon-size:15px;color:var(--tw-primary);flex:none}.message-builder-chip b{color:var(--tw-muted);flex:none;font-weight:700}.message-builder-chip span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.message-context-chip{color:var(--tw-text);background:#0f172a6b;border:1px solid #38bdf83d;border-radius:8px;align-items:center;gap:5px;min-width:0;max-width:220px;padding:4px 7px;font-size:12px;line-height:18px;display:inline-flex}.message-context-chip ha-icon{--mdc-icon-size:15px;color:var(--tw-primary);flex:none}.message-context-chip span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.validation-card{border:1px solid var(--tw-border);border-left:4px solid var(--tw-border);background:#0f172a9e;border-radius:8px;gap:8px;min-width:0;margin-top:10px;padding:10px;display:grid}.validation-card.success{border-left-color:var(--tw-success)}.validation-card.warning{border-left-color:#f59e0b}.validation-card.error{background:var(--tw-danger-soft);border-left-color:var(--tw-danger)}.validation-card.restart{border-left-color:var(--tw-primary)}.validation-card header{grid-template-columns:22px minmax(0,1fr);align-items:center;gap:8px;display:grid}.validation-card header ha-icon{--mdc-icon-size:20px;color:var(--tw-primary)}.validation-card.error header ha-icon{color:var(--tw-danger)}.validation-card header strong,.validation-card header span{text-overflow:ellipsis;white-space:nowrap;min-width:0;display:block;overflow:hidden}.validation-card header strong{color:var(--tw-text-strong);font-size:13px;line-height:18px}.validation-card header span,.validation-meta span{color:var(--tw-muted);font-size:12px;line-height:16px}.validation-meta{gap:5px;min-width:0;display:grid}.validation-meta span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.validation-meta b,.validation-files b{color:var(--tw-text-strong);text-transform:uppercase;margin-right:6px;font-size:11px;display:inline-block}.validation-domains,.validation-actions{flex-wrap:wrap;gap:6px;display:flex}.validation-domains span{background:var(--tw-primary-soft);color:var(--tw-text);text-overflow:ellipsis;white-space:nowrap;border:1px solid #38bdf847;border-radius:999px;max-width:180px;padding:0 8px;font-size:11px;font-weight:700;line-height:22px;overflow:hidden}.validation-files{color:var(--tw-muted);gap:4px;margin:0;padding:0;font-size:12px;line-height:16px;list-style:none;display:grid}.validation-files li{overflow-wrap:anywhere;min-width:0}.validation-actions button{gap:6px;min-height:30px}.validation-output{border-top:1px solid var(--tw-border);padding-top:6px}.validation-output summary{color:var(--tw-muted);cursor:pointer;font-size:12px;font-weight:700}.validation-output pre{color:var(--tw-text);white-space:pre-wrap;background:#050914;border-radius:6px;max-height:260px;margin:7px 0 0;padding:8px;font-size:11px;line-height:16px;overflow:auto}.validation-card.compact .validation-meta,.validation-card.compact .validation-domains,.validation-card.compact .validation-actions{gap:4px}.markdown-body p{margin:0 0 10px}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{color:var(--tw-text-strong);margin:12px 0 6px;font-size:14px;line-height:20px}.markdown-body ul,.markdown-body ol{margin:0 0 10px;padding-left:22px}.markdown-body li{margin:3px 0}.markdown-body blockquote{color:var(--tw-muted);border-left:3px solid #94a3b873;margin:0 0 10px;padding:2px 0 2px 12px}.markdown-body a{color:var(--tw-primary)}.markdown-body code,.markdown-body pre{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}.markdown-body code{color:var(--tw-text-strong);background:#94a3b824;border-radius:4px;padding:1px 4px;font-size:.92em}.markdown-body pre{white-space:pre-wrap;word-break:break-word;background:#0f172a80;border:1px solid #94a3b82e;border-radius:8px;margin:0;padding:10px 12px;overflow:auto}.markdown-body pre code{color:inherit;background:0 0;border-radius:0;padding:0;font-size:12px}.markdown-body hr{border:0;border-top:1px solid var(--tw-border);margin:12px 0}.copy-button{position:absolute;top:8px;right:8px}.message-row-user .copy-button{left:8px;right:auto}.retry-button{color:var(--tw-text-strong);position:absolute;bottom:8px;left:8px}.message-style-error .retry-button{background:#f8717124;border-color:#f8717157}.message-style-error .retry-button:hover{background:#f8717138}.message-style-thinking{background:var(--tw-panel-soft);border-color:#38bdf847}.thinking-content{color:var(--tw-text);align-items:center;gap:8px;font-size:14px;line-height:20px;display:inline-flex}.thinking-dots{align-items:center;gap:4px;height:18px;display:inline-flex}.thinking-dots i{background:var(--tw-primary);opacity:.35;border-radius:999px;width:6px;height:6px;animation:1s ease-in-out infinite thinking-pulse;display:block}.thinking-dots i:nth-child(2){animation-delay:.15s}.thinking-dots i:nth-child(3){animation-delay:.3s}@keyframes thinking-pulse{0%,80%,to{opacity:.35;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}@media (prefers-reduced-motion:reduce){.message.new-message{transform:none}.message.new-message.enter-active{opacity:1;transition:opacity .18s ease-out}}.composer{border-top:1px solid var(--tw-border);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);background:#111827eb;gap:10px;padding:14px 22px 18px;display:grid;position:relative}.message-queue{gap:8px;display:grid}.context-chips{flex-wrap:wrap;align-items:center;gap:6px;display:flex}.context-chip-row,.plan-mode-toggle{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.plan-mode-toggle>span{color:var(--tw-muted);text-transform:uppercase;font-size:12px;font-weight:700;line-height:18px}.plan-mode-options{border:1px solid var(--tw-border);background:#0f172ac2;border-radius:8px;align-items:center;gap:2px;min-width:0;padding:2px;display:inline-flex}.plan-mode-options button{color:var(--tw-muted);background:0 0;border-color:#0000;gap:5px;min-height:28px;padding:4px 8px}.plan-mode-options button.active{background:var(--tw-primary-soft);color:var(--tw-text-strong);border-color:#38bdf87a}.plan-mode-options button ha-icon{--mdc-icon-size:16px;flex:none}.context-budget{border:1px solid var(--tw-border);color:var(--tw-muted);border-radius:999px;min-height:24px;padding:3px 8px;font-size:11px}.context-budget.warning{color:#fbbf24;border-color:#f59e0b8c}.context-budget.danger{color:#fca5a5;border-color:#f87171a6}.context-chip,.context-clear{background:var(--tw-panel);border-color:var(--tw-border);color:var(--tw-text);gap:5px;max-width:220px;min-height:28px;padding:4px 8px}.context-chip span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.context-chip ha-icon{--mdc-icon-size:15px;flex:none}.context-clear{color:var(--tw-muted)}.composer-input-row{position:relative}.composer-input-row textarea{padding-left:94px}.context-button,.builder-button{color:var(--tw-muted);background:0 0;border-color:#0000;width:36px;height:36px;min-height:36px;padding:0;position:absolute;bottom:8px;left:10px}.builder-button{left:50px}.context-button:hover,.builder-button:hover{background:var(--tw-panel-soft);border-color:var(--tw-border);color:var(--tw-text)}.context-button ha-icon,.builder-button ha-icon{--mdc-icon-size:18px}.context-button b{background:var(--tw-primary);color:#03111f;border-radius:999px;justify-content:center;align-items:center;min-width:16px;height:16px;padding:0 4px;font-size:10px;display:inline-flex;position:absolute;top:-2px;right:-2px}.queued-message{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:8px;min-height:38px;padding:5px 5px 5px 10px;display:grid}.queued-message span{color:var(--tw-text);text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:13px;line-height:18px;overflow:hidden}.queued-actions{flex:none;gap:2px;display:flex}.queued-actions .icon-button{width:28px;height:28px;min-height:28px;position:relative}.queued-actions .queue-edit{color:var(--tw-primary)}.queued-actions .queue-steer{color:var(--tw-success)}.queued-actions .queue-clear{color:var(--tw-danger)}.queued-actions .icon-button ha-icon{--mdc-icon-size:16px;width:16px;height:16px}.queued-actions .icon-button:after{background:var(--tw-panel-strong);border:1px solid var(--tw-border);box-shadow:var(--tw-shadow);color:var(--tw-text-strong);content:attr(data-tooltip);pointer-events:none;white-space:nowrap;z-index:15;border-radius:6px;padding:5px 8px;font-size:12px;font-weight:600;line-height:16px;display:none;position:absolute;bottom:calc(100% + 8px);left:50%;transform:translate(-50%)}.queued-actions .queue-clear:after{left:auto;right:0;transform:none}.queued-actions .icon-button:hover:after,.queued-actions .icon-button:focus-visible:after{display:block}.question-composer{gap:12px}.question-composer label{margin-bottom:0}.question-text{color:var(--tw-text-strong);font-size:14px;line-height:20px}.question-choices{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;display:grid}.question-choice{background:var(--tw-panel);border-color:var(--tw-border);color:var(--tw-text);gap:8px;justify-content:initial;text-align:left;grid-template-columns:18px minmax(0,1fr);min-height:42px;padding:8px 10px;display:grid;position:relative}.question-choice:hover{background:var(--tw-primary-soft);filter:none;border-color:#38bdf873}.question-choice ha-icon{--mdc-icon-size:18px;color:var(--tw-primary)}.question-info-wrap{align-self:start;width:18px;height:18px;display:inline-flex;position:relative}.question-choice .question-choice-tooltip{background:var(--tw-panel-strong);border:1px solid var(--tw-border);box-shadow:var(--tw-shadow);color:var(--tw-text-strong);overflow-wrap:anywhere;pointer-events:none;white-space:normal;z-index:15;border-radius:6px;min-width:180px;max-width:min(280px,100vw - 32px);padding:6px 8px;font-size:12px;font-weight:600;line-height:16px;display:none;position:absolute;bottom:calc(100% + 8px);left:-8px}.question-info-wrap:hover .question-choice-tooltip,.question-choice:focus-visible .question-choice-tooltip{display:block}.question-choice span{overflow-wrap:anywhere;min-width:0}.question-custom-row{grid-template-columns:minmax(0,1fr) 36px;gap:8px;display:grid;position:relative}.archived-note{border-top:1px solid var(--tw-border);color:var(--tw-muted);background:#111827eb;padding:15px 22px;font-size:13px}textarea,input[name=question-custom]{background:var(--tw-panel);border:1px solid var(--tw-border);color:var(--tw-text-strong);font:inherit;resize:none;border-radius:8px;width:100%;min-height:52px;padding:15px 58px 15px 14px;line-height:20px;display:block;box-shadow:0 8px 24px #00000042}input[name=question-custom]{min-height:42px;padding:10px 12px}textarea::placeholder,input[name=question-custom]::placeholder{color:var(--tw-muted)}textarea:focus,.title-input:focus,input[name=question-custom]:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:0}button{background:var(--tw-primary);color:#03111f;cursor:pointer;font:inherit;border:1px solid #0000;border-radius:8px;justify-content:center;align-items:center;min-height:34px;padding:7px 10px;transition:background-color .14s,border-color .14s,box-shadow .16s,color .14s,opacity .12s,transform .16s cubic-bezier(.2,0,0,1);display:inline-flex}button:hover{filter:brightness(.97)}button:not(:disabled):not(.modal-scrim):not(.scroll-to-bottom):hover{box-shadow:var(--tw-button-shadow);transform:translateY(-1px)}button:not(:disabled):not(.modal-scrim):not(.scroll-to-bottom):active{box-shadow:none;transition-duration:80ms;transform:translateY(0)}button:disabled{cursor:wait;opacity:.68}button.ghost,.tabs button,.header-actions button{border-color:var(--tw-border);color:var(--tw-text);background:0 0}.icon-button{color:var(--tw-text);background:0 0;border-color:#0000;justify-content:center;align-items:center;width:32px;min-height:32px;padding:5px;display:inline-flex}.icon-button:hover{background:var(--tw-panel-soft);border-color:var(--tw-border)}.icon-button ha-icon{--mdc-icon-size:18px;width:18px;height:18px}.stop-button{width:28px;height:28px;min-height:28px;padding:0}.stop-button ha-icon{--mdc-icon-size:16px;justify-content:center;align-items:center;width:16px;height:16px;line-height:1;display:inline-flex}.send-button{width:36px;height:36px;min-height:36px;padding:0;position:absolute;bottom:26px;right:32px;box-shadow:0 10px 24px #38bdf83d}.send-button:not(:disabled):hover{box-shadow:var(--tw-button-primary-shadow);filter:none;background:#67d4ff}.send-button:not(:disabled):hover ha-icon{transform:translate(1px)rotate(-6deg)}.composer-input-row .send-button{bottom:8px;right:10px}.send-button ha-icon{--mdc-icon-size:18px;transition:transform .16s cubic-bezier(.2,0,0,1)}.question-send{position:static;bottom:auto;right:auto}button.danger{background:var(--tw-danger);color:#fff}button.danger:not(:disabled):hover{box-shadow:var(--tw-button-danger-shadow);filter:none;background:#f05252}.drawer-header{background:inherit;border-bottom:1px solid var(--tw-border);justify-content:space-between;align-items:center;gap:12px;padding:14px;display:flex}.drawer-header h2{color:var(--tw-text-strong);margin:0;font-size:18px;line-height:1.2}.drawer-header span{color:var(--tw-muted);margin-top:2px;font-size:12px;display:block}.drawer-actions{gap:4px;display:flex}.drawer-body{min-height:0;padding:14px;overflow:auto}.git-review{display:block}.git-virtual-list{height:100%}.git-folder-heading{color:var(--tw-muted);letter-spacing:0;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap;margin:0 0 8px;font-size:11px;font-weight:700;line-height:16px;overflow:hidden}.diff-folder{gap:8px;min-width:0;display:grid}.diff-folder h3{color:var(--tw-muted);letter-spacing:0;text-overflow:ellipsis;text-transform:uppercase;white-space:nowrap;margin:0;font-size:11px;font-weight:700;line-height:16px;overflow:hidden}.diff-folder-files{gap:8px;min-width:0;display:grid}.git-load-more{border-color:var(--tw-border);color:var(--tw-text);background:0 0;justify-items:center;gap:2px;width:100%;min-height:44px;display:grid}.git-load-more b{color:var(--tw-muted);font-size:11px;font-weight:600}.message-file-changes{gap:8px;margin-top:10px;display:grid}.message-file-changes-head{justify-content:flex-start;align-items:center;gap:8px;min-width:0;display:flex}.message-file-changes-head span{color:var(--tw-muted);text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:12px;line-height:18px;overflow:hidden}.message-file-changes-toggle{justify-content:center;min-width:0;display:flex}.message-file-changes-toggle button{color:#000;flex:none;gap:6px;min-height:30px;padding:5px 8px}.message-file-changes-toggle button:hover{color:#000}.message-file-changes-toggle button ha-icon{--mdc-icon-size:16px}.message-file-changes .diff-file{background:#080d187a}.rollback-action,.rollback-note{align-items:center;gap:8px;margin-top:10px;display:flex}.rollback-action button{min-height:34px}.rollback-note{color:var(--tw-muted);font-size:12px}.rollback-note ha-icon{--mdc-icon-size:16px;color:var(--tw-accent)}.rollback-note.blocked ha-icon{color:var(--tw-danger)}.diff-file{background:var(--tw-panel);border:1px solid var(--tw-border);contain:layout paint;border-radius:8px;min-width:0;min-height:48px;margin-bottom:8px;display:block;overflow:visible}.diff-card{background:var(--tw-panel-soft);cursor:pointer;color:var(--tw-text);text-align:left;border:0;border-radius:8px;grid-template-columns:24px minmax(0,1fr) auto auto auto;align-items:center;gap:8px;width:100%;min-width:0;min-height:48px;padding:10px 12px;display:grid}.diff-card:focus-visible{box-shadow:var(--tw-ring);outline:0}.diff-card.no-line-stats{grid-template-columns:24px minmax(0,1fr) auto auto}.diff-card.no-select{grid-template-columns:minmax(0,1fr) auto auto auto}.diff-card.no-select.no-line-stats{grid-template-columns:minmax(0,1fr) auto auto}.diff-file.open .diff-card{border-bottom:1px solid var(--tw-border);border-radius:8px 8px 0 0}.diff-card:hover{background:var(--tw-panel-strong);filter:none}.git-file-select{justify-content:center;align-items:center;min-width:24px;height:24px;margin:0;display:inline-flex}.git-file-select input{accent-color:var(--tw-primary);cursor:pointer;width:16px;height:16px;margin:0}.diff-file-main{min-width:0;display:block;overflow:hidden}.diff-file strong{color:var(--tw-text-strong);text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:18px;display:block;overflow:hidden}.diff-file-main span{color:var(--tw-muted);text-overflow:ellipsis;white-space:nowrap;font-size:11px;line-height:16px;display:block;overflow:hidden}.line-stats{flex:none;align-items:center;gap:4px;display:flex}.line-stats span{text-align:center;border-radius:999px;min-width:30px;padding:0 6px;font-size:11px;font-weight:700;line-height:18px}.line-stats .added{color:#bbf7d0;background:#22c55e24}.line-stats .deleted{color:#fecaca;background:#ef444424}.file-status{border:1px solid var(--tw-border);color:var(--tw-muted);border-radius:999px;flex:none;justify-content:center;align-items:center;width:24px;height:24px;display:inline-flex}.file-status ha-icon{--mdc-icon-size:16px;color:inherit}.diff-open-action{border:1px solid var(--tw-border);color:var(--tw-muted);text-transform:uppercase;border-radius:999px;flex:none;align-items:center;gap:4px;height:24px;padding:0 7px 0 5px;font-size:11px;font-weight:700;line-height:18px;display:inline-flex}.diff-open-action ha-icon{--mdc-icon-size:16px;color:inherit;flex:none}.file-status.added,.file-status.untracked{color:var(--tw-success);border-color:#22c55e73}.file-status.modified{color:#fbbf24;border-color:#f59e0b73}.file-status.deleted{color:var(--tw-danger);border-color:#ef444473}.diff-lines{overscroll-behavior:contain;scrollbar-gutter:stable;background:#050914;border-radius:0 0 8px 8px;min-width:0;max-height:min(52vh,640px);overflow:auto}.diff-lines.virtualized{height:min(52vh,640px)}.diff-line{grid-template-columns:28px minmax(0,1fr);min-width:0;min-height:20px;display:grid}.diff-line .marker{color:var(--tw-muted);text-align:center;border-right:1px solid #94a3b826;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:20px}.diff-line code{color:var(--tw-text);overflow-wrap:anywhere;white-space:pre-wrap;min-width:0;padding:0 8px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:12px;line-height:20px;display:block}.diff-line.added{background:#22c55e24}.diff-line.added .marker,.diff-line.added code{color:#bbf7d0}.diff-line.deleted{background:#ef444424}.diff-line.deleted .marker,.diff-line.deleted code{color:#fecaca}.diff-line.hunk{background:#38bdf81f}.diff-line.hunk .marker,.diff-line.hunk code{color:#bae6fd}.diff-line.meta code{color:var(--tw-muted)}.diff-empty,.diff-error{color:var(--tw-muted);padding:12px;font-size:12px}.diff-error{background:var(--tw-danger-soft);color:#fecaca;overflow-wrap:anywhere;white-space:pre-wrap;border-top:1px solid #f8717147;margin:0}.commit-box{border-top:1px solid var(--tw-border);background:#111827f5;grid-template-columns:minmax(0,1fr);gap:8px;padding:12px 14px 14px;display:grid}.commit-box textarea{min-height:42px;padding:10px 12px}.commit-box button{gap:8px;width:100%}.commit-box button[type=submit]:not(:disabled):hover{box-shadow:var(--tw-button-primary-shadow);filter:none;background:#67d4ff;border-color:#bae6fd61}.commit-box button ha-icon{--mdc-icon-size:18px;transition:transform .16s cubic-bezier(.2,0,0,1)}.commit-box button:not(:disabled):hover ha-icon,.discard-confirm-actions button:not(:disabled):hover ha-icon{transform:scale(1.08)}.git-action-row{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;display:grid}.modal.discard-confirm-modal{min-width:min(420px,100vw - 44px);max-width:min(420px,100vw - 44px);height:auto;max-height:min(360px,100vh - 44px)}.discard-confirm-modal button{width:auto}.discard-confirm-modal .icon-button{width:32px}.discard-confirm-body{gap:14px;padding:14px;display:grid}.discard-confirm-copy{color:var(--tw-text);overflow-wrap:anywhere;min-width:0;margin:0;font-size:13px;line-height:18px}.discard-confirm-actions{justify-content:flex-end;gap:8px;min-width:0;display:flex}.discard-confirm-actions button{gap:8px;min-width:118px;min-height:34px}.git-operation-result{border:1px solid var(--tw-border);border-left:4px solid var(--tw-border);border-radius:8px;gap:5px;padding:9px 10px;display:grid}.git-operation-result.success{border-left-color:var(--tw-success)}.git-operation-result.error{background:var(--tw-danger-soft);border-left-color:var(--tw-danger)}.git-operation-result strong{color:var(--tw-text-strong);font-size:13px;line-height:18px}.git-operation-result span{color:var(--tw-muted);overflow-wrap:anywhere;font-size:12px;line-height:16px}.git-operation-result pre{color:var(--tw-text);white-space:pre-wrap;background:#050914;border-radius:6px;max-height:140px;margin:3px 0 0;padding:8px;font-size:11px;line-height:16px;overflow:auto}.approval{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;margin-bottom:12px;padding:12px}.run-plan-review{background:var(--tw-panel);border:1px solid var(--tw-border);border-radius:8px;gap:10px;padding:12px;display:grid}.run-plan-copy{color:var(--tw-text);font-size:13px;line-height:1.4}.run-plan-review .row button{gap:6px}.run-plan-review .row ha-icon{--mdc-icon-size:16px}.approval-reason{background:var(--tw-primary-soft);color:var(--tw-text);border:1px solid #bfdbfe;border-radius:8px;margin:10px 0;padding:9px 10px;font-size:13px;line-height:1.4}label{color:var(--tw-muted);text-transform:uppercase;margin-bottom:6px;font-size:11px;font-weight:700;display:block}.result-head{align-items:center;gap:10px;margin:12px 0 8px;display:flex}.result{border:0;border-left:4px solid var(--tw-border);color:var(--tw-text);background:#050914;border-radius:0 8px 8px 0;max-height:55vh;padding:12px;overflow:auto}.result.success{border-left-color:var(--tw-success)}.result.error{border-left-color:var(--tw-danger)}.loading-state{background:var(--tw-panel);border:1px solid var(--tw-primary);color:var(--tw-text);border-radius:8px;margin:12px 0;padding:12px}.loading-state.error{border-color:var(--tw-danger);color:#fecaca;white-space:pre-wrap}.empty{text-align:center;place-self:center;max-width:360px}.chat>.empty{grid-row:1/-1;place-self:center}.empty-actions{justify-content:center;gap:10px;display:flex}.pad{padding:10px}.debug-button{border-color:var(--tw-border);color:var(--tw-muted);background:0 0;width:34px;height:34px;min-height:34px;padding:0}.debug-button:hover{background:var(--tw-panel-soft);color:var(--tw-text);border-color:currentColor}.debug-button:focus-visible{color:var(--tw-text);border-color:currentColor}.debug-button ha-icon{--mdc-icon-size:18px}.debug-button.bridge-unavailable ha-icon{color:var(--tw-danger)}.modal-backdrop{z-index:20;justify-content:center;align-items:center;padding:22px;display:flex;position:fixed;inset:0}.modal-scrim{background:#030712b8;border:0;border-radius:0;min-height:0;padding:0;position:absolute;inset:0}.modal{background:var(--tw-panel);border:1px solid var(--tw-border);box-shadow:var(--tw-shadow);border-radius:8px;flex-direction:column;width:100%;min-width:min(620px,100vw - 44px);max-width:min(860px,100vw - 44px);height:min(720px,100vh - 44px);max-height:min(720px,100vh - 44px);display:flex;position:relative;overflow:hidden}.modal-header{border-bottom:1px solid var(--tw-border);justify-content:space-between;align-items:center;padding:12px 14px;display:flex}.modal-header h2{color:var(--tw-text-strong);margin:0;font-size:16px;line-height:1.25}.modal-tabs{border-bottom:1px solid var(--tw-border);align-items:center;gap:6px;padding:8px 14px;display:flex}.debug-tabs{gap:6px;display:flex}.debug-tabs button{align-items:center;gap:6px;display:inline-flex}.debug-tabs button ha-icon{--mdc-icon-size:16px;flex:none}.debug-tabs button span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.modal-tabs button{border-color:var(--tw-border);color:var(--tw-muted);background:0 0;min-height:32px}.modal-tabs button:hover{background:var(--tw-panel-soft);color:var(--tw-text-strong);filter:none;border-color:#38bdf861}.modal-tabs button.active{background:var(--tw-primary-soft);color:var(--tw-text-strong);border-color:#38bdf87a}.modal-tabs button.active:hover{background:#0c344fe0;border-color:#38bdf8ad}.modal-tab-spacer{flex:auto}.modal-tabs .bridge-action,.modal-tabs .core-action{align-items:center;gap:6px;display:inline-flex}.modal-tabs .bridge-action-start{color:#bbf7d0;background:#22c55e2e;border-color:#22c55e8c}.modal-tabs .bridge-action:not(:disabled):hover{background:var(--tw-primary);box-shadow:var(--tw-button-primary-shadow);color:#03111f;border-color:#0000}.modal-tabs .bridge-action-start:not(:disabled):hover{background:var(--tw-success);color:#03140a;border-color:#0000;box-shadow:0 12px 28px #22c55e3d}.modal-tabs .core-action:not(:disabled):hover{color:#fecdd3;background:#fb718529;border-color:#fb71857a}.modal-tabs .bridge-action ha-icon,.modal-tabs .core-action ha-icon{--mdc-icon-size:16px;transition:transform .16s cubic-bezier(.2,0,0,1)}.modal-tabs .bridge-action-restart:not(:disabled):hover ha-icon,.modal-tabs .core-action:not(:disabled):hover ha-icon{transform:rotate(-18deg)}.context-modal{max-width:min(980px,100vw - 44px)}.builder-modal{width:min(820px,100vw - 44px);min-width:min(820px,100vw - 44px);max-width:min(820px,100vw - 44px);height:min(720px,100vh - 44px);max-height:min(720px,100vh - 44px)}.settings-modal{max-width:min(980px,100vw - 44px)}.settings-modal .modal-body{grid-template-rows:minmax(0,1fr);overflow:auto}.settings-saving{color:var(--tw-muted);font-size:12px}.settings-grid,.settings-run,.settings-models,.settings-debug,.settings-bridge-log,.settings-git,.settings-account{gap:12px;padding:14px;display:grid}.settings-account{align-content:start}.account-status-card{border:1px solid var(--tw-border);background:#0f172aa3;border-radius:8px;justify-content:space-between;align-items:center;gap:12px;min-width:0;padding:12px;display:flex}.account-status-card.success{border-color:#22c55e70}.account-status-card.error,.device-login-panel.error{border-color:#f8717199}.account-status-main{align-items:center;gap:10px;min-width:0;display:flex}.account-status-main ha-icon{--mdc-icon-size:24px;color:var(--tw-primary);flex:none}.account-status-main div,.device-login-header div{gap:3px;min-width:0;display:grid}.account-status-main strong,.device-login-header strong{color:var(--tw-text-strong);font-size:14px;line-height:19px}.account-status-main span,.device-login-header span{color:var(--tw-muted);font-size:12px;line-height:17px}.account-details{grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:8px;display:grid}.account-detail{border:1px solid var(--tw-border);background:#0f172a75;border-radius:8px;gap:5px;min-width:0;padding:10px;display:grid}.account-detail span{color:var(--tw-muted);text-transform:uppercase;font-size:11px;font-weight:700}.account-detail strong{color:var(--tw-text-strong);text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:13px;overflow:hidden}.device-login-panel{border:1px solid var(--tw-border);background:#0f172aa3;border-radius:8px;gap:10px;min-width:0;padding:12px;display:grid}.device-login-header{justify-content:space-between;align-items:start;gap:10px;min-width:0;display:flex}.device-login-link{color:var(--tw-primary);overflow-wrap:anywhere;min-width:0;font-size:15px;font-weight:700}.device-login-field{gap:6px;min-width:0;display:grid}.device-login-field>span{color:var(--tw-muted);letter-spacing:0;text-transform:uppercase;font-size:11px;font-weight:700;line-height:14px}.device-login-code-row{flex-wrap:wrap;align-items:center;gap:8px;min-width:0;display:flex}.device-login-code{border:1px solid var(--tw-border);color:var(--tw-text-strong);letter-spacing:0;overflow-wrap:anywhere;background:#020617;border-radius:8px;align-items:center;gap:10px;width:fit-content;min-width:0;padding:8px 8px 8px 12px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:22px;font-weight:700;transition:border-color .14s,color .14s;display:inline-flex}.device-login-code.copied{color:#86efac;border-color:#22c55eb8}.device-login-code>span{min-width:0}.device-login-copy{color:var(--tw-muted);cursor:pointer;background:#94a3b81f;border:1px solid #94a3b83d;border-radius:6px;flex:none;justify-content:center;align-items:center;width:32px;height:32px;padding:0;transition:background .14s,border-color .14s,color .14s;display:inline-flex}.device-login-copy:hover{color:var(--tw-text-strong);background:#94a3b833}.device-login-code.copied .device-login-copy{color:#86efac;background:#22c55e29;border-color:#22c55e85}.device-login-copy ha-icon{--mdc-icon-size:18px}.device-login-output{border:1px solid var(--tw-border);color:var(--tw-muted);white-space:pre-wrap;background:#020617;border-radius:8px;max-height:160px;margin:0;padding:8px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px;overflow:auto}.settings-bridge-log{grid-template-rows:auto minmax(0,1fr);gap:0;min-height:0;padding:0;overflow:hidden}.settings-models{grid-auto-rows:max-content;align-content:start}.settings-run,.settings-git{align-content:start}.git-setup-cards{grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:8px;display:grid}.git-setup-section{gap:10px}.git-setup-row{flex-wrap:wrap;align-items:center;gap:8px;min-width:0;display:flex}.git-setup-row a{color:var(--tw-primary);font-size:12px;font-weight:700;text-decoration:none}.git-setup-row .muted{color:var(--tw-muted);overflow-wrap:anywhere;min-width:0;font-size:12px}.git-public-key-row{grid-template-columns:auto minmax(0,1fr);align-items:stretch;gap:8px;min-width:0;display:grid}.git-public-key-row>button{white-space:nowrap;align-self:start}.git-public-key-row .muted{color:var(--tw-muted);overflow-wrap:anywhere;align-self:center;min-width:0;font-size:12px}.git-ssh-keys-link{color:var(--tw-primary);width:fit-content;font-size:12px;font-weight:700;text-decoration:none}.git-setup-action-card input,.git-remote-form input{background:var(--tw-panel-soft);border:1px solid var(--tw-border);color:var(--tw-text-strong);font:inherit;border-radius:8px;width:100%;min-width:0;min-height:32px;padding:6px 8px}.git-setup-action-card input:focus,.git-remote-form input:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:none}.git-setup-action-card button{justify-content:center;width:100%;margin-top:2px}.git-remote-form button{width:auto;margin-top:0}.git-history-list{border:1px solid var(--tw-border);border-radius:8px;display:grid;overflow:hidden}.git-history-header{justify-content:space-between;align-items:center;gap:10px;min-width:0;display:flex}.git-history-header h3{margin:0}.git-history-pager{flex:none;align-items:center;gap:4px;display:flex}.git-history-pager span{color:var(--tw-muted);margin-right:2px;font-size:12px}.git-history-pager .icon-button{width:28px;height:28px;min-height:28px}.git-history-row{border-bottom:1px solid var(--tw-border);background:#0f172a7a;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:10px;min-width:0;padding:8px 10px;display:grid}.git-history-row:last-child{border-bottom:0}.git-history-main{gap:2px;min-width:0;display:grid}.git-history-main strong,.git-history-main span{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.git-history-main strong{color:var(--tw-text-strong);font-size:13px}.git-history-main span{color:var(--tw-muted);font-size:12px}.git-history-row button{gap:6px;min-height:30px;padding:5px 8px}.git-public-key{border:1px solid var(--tw-border);background:#020617;border-radius:8px;grid-template-columns:minmax(0,1fr) auto;align-items:stretch;gap:8px;min-width:0;padding:8px;display:grid}.git-public-key.copied{border-color:#22c55eb8}.git-public-key pre{color:var(--tw-muted);white-space:pre-wrap;word-break:break-all;min-width:0;margin:0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px;overflow:auto}.git-remote-form{grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:8px;min-width:0;display:grid}.git-remote-form input{min-width:0}.git-setup-result{border:1px solid var(--tw-border);background:#0f172aa3;border-radius:8px;gap:6px;min-width:0;padding:10px;display:grid}.git-setup-result.success{border-color:#22c55e70}.git-setup-result.error{border-color:#f8717199}.git-setup-result strong{color:var(--tw-text-strong);font-size:13px}.git-setup-result span{color:var(--tw-muted);font-size:12px}.git-setup-result pre{border:1px solid var(--tw-border);color:var(--tw-muted);white-space:pre-wrap;background:#020617;border-radius:8px;max-height:170px;margin:0;padding:8px;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:11px;line-height:16px;overflow:auto}.settings-section{border-bottom:1px solid var(--tw-border);gap:10px;padding-bottom:14px;display:grid}.settings-section:last-child{border-bottom:0;padding-bottom:0}.settings-section h3{color:var(--tw-text-strong);margin:0;font-size:13px;line-height:18px}.settings-grid{grid-template-columns:repeat(auto-fit,minmax(150px,max-content));justify-content:start;align-items:start;padding:0}.settings-maintenance-row{border:1px solid var(--tw-border);background:#0f172a7a;border-radius:8px;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:10px;max-width:520px;padding:10px;display:grid}.settings-maintenance-row div{gap:2px;min-width:0;display:grid}.settings-maintenance-row strong{color:var(--tw-text-strong);font-size:13px}.settings-maintenance-row>div span{color:var(--tw-muted);font-size:12px}.settings-maintenance-row button{white-space:nowrap;gap:6px}.setting-field{gap:6px;width:fit-content;min-width:0;display:grid}.setting-field span{color:var(--tw-muted);text-transform:uppercase;font-size:12px;font-weight:700}.settings-model-row{grid-template-columns:minmax(120px,.8fr) minmax(180px,1fr) auto;align-items:center;gap:8px;min-height:38px;display:grid}.settings-model-row.add{border-top:1px solid var(--tw-border);padding-top:12px}.settings-model-row button{gap:6px}.settings-modal select{cursor:pointer}.setting-field select,.setting-field input{width:auto;max-width:min(260px,100%)}.builder-tabs{flex-wrap:wrap}.builder-tabs button{gap:6px}.builder-tabs button ha-icon{--mdc-icon-size:16px}.builder-tabs button span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.builder-form{flex:auto;grid-template-rows:minmax(0,1fr) auto;gap:0;min-height:0;display:grid;overflow:hidden}.builder-scroll{gap:12px;min-height:0;padding:14px;display:grid;overflow:auto}.builder-errors{background:var(--tw-danger-soft);color:#fecaca;border:1px solid #f8717159;border-radius:8px;gap:3px;padding:8px 10px;display:grid}.builder-errors p{margin:0;font-size:12px;line-height:16px}.builder-fields{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;display:grid}.builder-field{gap:5px;min-width:0;display:grid}.builder-field.wide{grid-column:1/-1}.builder-field span,.builder-context>span{color:var(--tw-muted);letter-spacing:0;font-size:12px;font-weight:700}.builder-field input,.builder-field select,.builder-field textarea{background:var(--tw-panel-soft);border:1px solid var(--tw-border);box-shadow:none;color:var(--tw-text-strong);font:inherit;resize:vertical;border-radius:8px;width:100%;min-width:0;min-height:38px;padding:8px 10px;line-height:20px}.builder-field textarea{min-height:86px}.builder-field input:focus,.builder-field select:focus,.builder-field textarea:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:0}.builder-compound{gap:7px;min-width:0;display:grid}.builder-compound.action{grid-template-columns:minmax(150px,.7fr) minmax(200px,1fr)}.builder-compound.action textarea,.builder-compound.action small{grid-column:1/-1}.builder-compound small{color:var(--tw-muted);text-overflow:ellipsis;white-space:nowrap;min-width:0;min-height:15px;font-size:11px;line-height:15px;overflow:hidden}.entity-combobox{gap:6px;min-width:0;display:grid;position:relative}.entity-combobox-chips{flex-wrap:wrap;align-items:center;gap:5px;min-width:0;display:flex}.entity-combobox-chip{color:var(--tw-text);background:#3b82f61f;border:1px solid #60a5fa47;border-radius:8px;flex:180px;justify-content:flex-start;align-items:center;gap:4px;width:auto;min-width:min(180px,100%);max-width:none;min-height:28px;padding:4px 7px;font-size:12px;line-height:18px;display:inline-flex}.entity-combobox-chip span{color:inherit;font-size:inherit;text-overflow:ellipsis;text-transform:none;white-space:nowrap;flex:auto;min-width:0;font-weight:600;overflow:hidden}.entity-combobox-chip ha-icon{--mdc-icon-size:14px;flex:none}.entity-combobox-chip-entity-icon{color:var(--tw-primary)}.entity-combobox-chip-remove-icon{opacity:.78}.entity-combobox-menu{border:1px solid var(--tw-border);z-index:40;background:#0f172a;border-radius:8px;min-width:100%;max-height:248px;display:grid;position:absolute;top:calc(100% + 4px);left:0;right:0;overflow:auto;box-shadow:0 18px 50px #0000006b}.entity-combobox-menu button{color:var(--tw-text);text-align:left;background:0 0;border:0;border-radius:0;justify-items:start;gap:2px;width:100%;min-height:46px;padding:8px 10px;display:grid}.entity-combobox-menu .entity-combobox-option{grid-template-columns:22px minmax(0,1fr) auto;justify-content:stretch;place-items:stretch stretch;gap:8px}.entity-combobox-menu button:hover,.entity-combobox-menu button:focus{background:#3b82f624;outline:0}.entity-combobox-option-icon{--mdc-icon-size:18px;color:var(--tw-primary);place-self:stretch center;min-height:100%;display:inline-flex}.entity-combobox-option-main{text-align:left;align-content:center;justify-items:start;gap:2px;min-width:0;display:grid}.entity-combobox-option-badge{color:var(--tw-muted);text-overflow:ellipsis;white-space:nowrap;background:#94a3b824;border:1px solid #94a3b842;border-radius:999px;place-self:center end;min-width:0;max-width:110px;padding:2px 7px;font-size:11px;font-weight:700;line-height:16px;overflow:hidden}.entity-combobox-menu strong{color:var(--tw-text-strong);text-overflow:ellipsis;white-space:nowrap;width:100%;min-width:0;font-size:13px;font-weight:700;overflow:hidden}.entity-combobox-menu small,.entity-combobox-empty{color:var(--tw-muted);font-size:12px;line-height:16px}.entity-combobox-menu small{text-overflow:ellipsis;white-space:nowrap;width:100%;min-width:0;overflow:hidden}.entity-combobox-empty{padding:10px}@media (width<=720px){.builder-compound.action{grid-template-columns:minmax(0,1fr)}.builder-compound.action textarea,.builder-compound.action small{grid-column:auto}}.builder-context{border-top:1px solid var(--tw-border);gap:8px;padding-top:12px;display:grid}.builder-context-list{flex-wrap:wrap;align-items:center;gap:6px;min-width:0;display:flex}.builder-context-chip,.builder-context-empty{border:1px solid var(--tw-border);color:var(--tw-text);text-overflow:ellipsis;white-space:nowrap;background:#0f172ab8;border-radius:8px;align-items:center;gap:5px;min-width:0;max-width:220px;min-height:28px;padding:4px 8px;font-size:12px;line-height:18px;display:inline-flex;overflow:hidden}.builder-context-chip ha-icon{--mdc-icon-size:15px;color:var(--tw-primary);flex:none}.builder-context-empty{color:var(--tw-muted)}.builder-actions{background:var(--tw-panel);border-top:1px solid var(--tw-border);justify-content:flex-end;gap:8px;padding:12px 14px;display:flex}.builder-actions button{gap:6px}.context-tabs{flex-wrap:wrap}.context-tabs button{gap:6px}.context-tabs button ha-icon{--mdc-icon-size:16px}.context-tabs button span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.context-toolbar{border-bottom:1px solid var(--tw-border);grid-template-columns:minmax(0,1fr) auto auto;align-items:center;gap:8px;padding:10px 14px;display:grid}.context-toolbar input{background:var(--tw-panel-soft);border:1px solid var(--tw-border);color:var(--tw-text-strong);font:inherit;border-radius:8px;min-width:0;min-height:34px;padding:7px 10px}.context-toolbar input:focus{border-color:var(--tw-primary);box-shadow:var(--tw-ring);outline:0}.context-toolbar span{color:var(--tw-muted);font-size:12px}.context-errors{background:var(--tw-danger-soft);color:#fecaca;border-bottom:1px solid #f8717159;gap:3px;padding:8px 14px;display:grid}.context-errors p{overflow-wrap:anywhere;margin:0;font-size:12px;line-height:16px}.context-list{flex:auto;align-content:start;gap:6px;min-height:0;padding:10px 14px 14px;display:grid;overflow:auto}.context-row{border-color:var(--tw-border);color:var(--tw-text);align-items:center;gap:10px;justify-content:initial;text-align:left;background:#0f172ab8;grid-template-columns:20px 24px minmax(0,1fr) auto;width:100%;min-height:48px;padding:7px 10px;display:grid}.context-row:hover{background:var(--tw-panel-soft);filter:none}.context-row.selected{background:var(--tw-primary-soft);border-color:#38bdf87a}.context-row:disabled{cursor:not-allowed}.context-checkbox{border:1px solid var(--tw-border);border-radius:5px;justify-content:center;align-items:center;width:18px;height:18px;display:inline-flex}.context-row.selected .context-checkbox{background:var(--tw-primary);border-color:var(--tw-primary);color:#03111f}.context-checkbox ha-icon{--mdc-icon-size:14px}.context-kind-icon{color:var(--tw-primary)}.context-kind-icon ha-icon,.context-row>ha-icon{--mdc-icon-size:19px}.context-row-main{gap:2px;min-width:0;display:grid}.context-row-main strong{color:var(--tw-text-strong);text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:13px;line-height:18px;overflow:hidden}.context-row-main small,.context-row-status{color:var(--tw-muted);text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:11px;line-height:15px;overflow:hidden}.context-empty{color:var(--tw-muted);justify-content:center;align-items:center;min-height:160px;font-size:13px;display:flex}.modal-body{flex:auto;grid-template-rows:auto minmax(0,1fr);min-height:0;display:grid;overflow:hidden}.runtime-cards{border-bottom:1px solid var(--tw-border);grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;padding:10px 14px;display:grid}.runtime-card{border:1px solid var(--tw-border);background:#0f172aa3;border-radius:8px;gap:5px;min-width:0;padding:10px;display:grid}.runtime-card span{color:var(--tw-muted);text-transform:uppercase;font-size:11px;font-weight:700}.runtime-card strong{color:var(--tw-text-strong);text-overflow:ellipsis;white-space:nowrap;min-width:0;font-size:14px;overflow:hidden}.runtime-card small{color:var(--tw-muted);text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.runtime-card.success{border-color:#22c55e70}.runtime-card.warning{border-color:#f59e0b80}.runtime-card.error{border-color:#f8717199}.modal-toolbar{border-bottom:1px solid var(--tw-border);color:var(--tw-muted);justify-content:space-between;align-items:center;gap:10px;min-width:0;padding:8px 14px;font-size:12px;display:flex}.modal-toolbar span{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.modal-toolbar-actions{flex:none;gap:6px;display:flex}.modal-toolbar button{flex:none;gap:6px;min-height:30px;padding:5px 8px}.modal-toolbar .bridge-log-refresh:not(:disabled):hover{border-color:#38bdf8a3}.modal-toolbar .bridge-log-clear:not(:disabled):hover{color:#fecaca;border-color:#f8717194}.modal-toolbar ha-icon{--mdc-icon-size:16px}.bridge-log-end{height:0;display:block}.modal .result{border-left:0;border-radius:0;min-height:0;max-height:none;margin:0}.raw-event-details{border-top:1px solid var(--tw-border);color:var(--tw-muted);margin-top:10px;padding-top:8px}.raw-event-details summary{cursor:pointer;font-size:12px}.raw-event-details pre{border:1px solid var(--tw-border);color:var(--tw-text);white-space:pre-wrap;background:#0206176b;border-radius:7px;max-height:220px;padding:8px;overflow:auto}.tool-visibility-compact.message-style-event .markdown-body,.tool-visibility-compact.message-style-action .markdown-body{max-height:120px;overflow:hidden}.validation-panel-body{min-height:0;padding:14px;overflow:auto}.validation-panel-body .validation-card{margin-top:0}.toast-stack{--toast-slide-offset:18px;z-index:10;gap:10px;width:min(360px,100vw - 36px);max-width:calc(100% - 36px);display:grid;position:absolute;top:58px;right:18px}.toast{background:var(--tw-panel);border:1px solid var(--tw-border);border-left:4px solid var(--tw-primary);box-shadow:var(--tw-shadow);color:var(--tw-text);border-radius:8px;align-items:center;gap:10px;min-width:0;padding:11px 12px;display:flex}.toast>span{overflow-wrap:anywhere;min-width:0}.toast.entering{animation:.26s cubic-bezier(.2,0,0,1) toast-slide-in}.toast.exiting{animation:.26s cubic-bezier(.4,0,1,1) forwards toast-slide-out}@keyframes toast-slide-in{0%{opacity:0;transform:translate(-10px,-6px)scale(.98)}to{opacity:1;transform:translate(0)}}@keyframes toast-slide-out{0%{opacity:1;transform:translate(0)}to{opacity:0;transform:translateX(var(--toast-slide-offset))}}.toast.success{border-left-color:var(--tw-success)}.toast.error{border-left-color:var(--tw-danger)}.toast.restart{border-left-color:var(--tw-primary);flex-wrap:wrap;align-items:flex-start}.toast ha-icon{--mdc-icon-size:20px;flex:none}.toast-content{flex:180px;gap:3px;min-width:0;display:grid}.toast-content strong{font-size:13px}.toast-content span{color:var(--tw-muted);font-size:12px;line-height:1.35}.toast-chat-list{color:var(--tw-muted);gap:2px;margin:0;padding:0;font-size:12px;line-height:1.35;list-style:none;display:grid}.toast-chat-list li{overflow-wrap:anywhere}.toast-actions{flex-wrap:wrap;flex:none;justify-content:flex-end;gap:6px;margin-left:auto;display:flex}.toast.restart .toast-actions{margin-left:30px}.toast-actions button{min-height:30px;padding:6px 10px}.toast-actions .secondary{background:var(--tw-surface);border-color:var(--tw-border);color:var(--tw-text)}@media (prefers-reduced-motion:reduce){.shell,.drawer,button,button ha-icon{transition-duration:1ms!important}button:not(:disabled):not(.modal-scrim):not(.scroll-to-bottom):hover,.send-button:not(:disabled):hover ha-icon,.commit-box button:not(:disabled):hover ha-icon,.discard-confirm-actions button:not(:disabled):hover ha-icon,.modal-tabs .bridge-action:not(:disabled):hover ha-icon{transform:none}}@media (width<=1100px){.shell,.shell.git-closed{grid-template-columns:240px minmax(0,1fr)}.drawer{box-shadow:var(--tw-shadow);z-index:8;width:min(420px,100vw - 240px);position:fixed;top:0;bottom:0;right:0}}@media (width<=720px){.shell,.shell.git-closed{grid-template-columns:1fr}.rail{display:none}.drawer{width:min(100vw,440px)}.chat-header{align-items:center;padding:14px 16px}.header-actions{flex-wrap:nowrap}.transcript{padding:16px}.composer{padding:12px 14px 16px}.send-button{bottom:24px;right:24px}.question-choices{grid-template-columns:minmax(0,1fr)}.question-send{bottom:auto;right:auto}.queued-message{grid-template-columns:minmax(0,1fr);align-items:start}.queued-actions{justify-content:flex-end}.diff-card{grid-template-columns:24px minmax(0,1fr) auto}.diff-card.no-select{grid-template-columns:minmax(0,1fr) auto auto}.line-stats{grid-column:2/-1;justify-content:flex-start}.git-action-row{grid-template-columns:minmax(0,1fr)}.discard-confirm-actions{grid-template-columns:minmax(0,1fr);display:grid}.discard-confirm-actions button{width:100%}.diff-lines{max-height:44vh}.runtime-cards{grid-template-columns:repeat(2,minmax(0,1fr))}}", yu = class extends HTMLElement {
	root = null;
	mount;
	_hass = null;
	_panel = null;
	constructor() {
		super();
		let e = this.attachShadow({ mode: "open" }), t = document.createElement("style");
		t.textContent = vu, e.appendChild(t), this.mount = document.createElement("div"), this.updateThemeClass(), e.appendChild(this.mount);
	}
	connectedCallback() {
		this.renderReact();
	}
	disconnectedCallback() {
		this.root?.unmount(), this.root = null;
	}
	set hass(e) {
		this._hass = e, this.updateThemeClass(), this.renderReact();
	}
	get hass() {
		return this._hass;
	}
	set panel(e) {
		this._panel = e, this.renderReact();
	}
	get panel() {
		return this._panel;
	}
	renderReact() {
		this.isConnected && (this.root ||= (0, Ge.createRoot)(this.mount), this.root.render(/* @__PURE__ */ (0, A.jsx)(k.StrictMode, { children: /* @__PURE__ */ (0, A.jsx)(mu, {
			hass: this._hass,
			panel: this._panel
		}) })));
	}
	updateThemeClass() {
		this.mount.className = `ha-codex-root ${_u(this._hass)}`;
	}
};
customElements.get("ha-codex-panel") || customElements.define("ha-codex-panel", yu);
//#endregion
