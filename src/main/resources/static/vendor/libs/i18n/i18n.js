!function(e, t) {
    if ("object" == typeof exports && "object" == typeof module)
        module.exports = t();
    else if ("function" == typeof define && define.amd)
        define([], t);
    else {
        var n = t();
        for (var o in n)
            ("object" == typeof exports ? exports : e)[o] = n[o]
    }
}(self, (function() {
        return function() {
            var e, t, n = {
                4098: function(e, t) {
                    var n = "undefined" != typeof self ? self : this
                        , o = function() {
                        function e() {
                            this.fetch = !1,
                                this.DOMException = n.DOMException
                        }
                        return e.prototype = n,
                            new e
                    }();
                    !function(e) {
                        !function(t) {
                            var n = "URLSearchParams"in e
                                , o = "Symbol"in e && "iterator"in Symbol
                                , r = "FileReader"in e && "Blob"in e && function() {
                                try {
                                    return new Blob,
                                        !0
                                } catch (e) {
                                    return !1
                                }
                            }()
                                , i = "FormData"in e
                                , a = "ArrayBuffer"in e;
                            if (a)
                                var s = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"]
                                    , u = ArrayBuffer.isView || function(e) {
                                        return e && s.indexOf(Object.prototype.toString.call(e)) > -1
                                    }
                                ;
                            function c(e) {
                                if ("string" != typeof e && (e = String(e)),
                                    /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))
                                    throw new TypeError("Invalid character in header field name");
                                return e.toLowerCase()
                            }
                            function l(e) {
                                return "string" != typeof e && (e = String(e)),
                                    e
                            }
                            function f(e) {
                                var t = {
                                    next: function() {
                                        var t = e.shift();
                                        return {
                                            done: void 0 === t,
                                            value: t
                                        }
                                    }
                                };
                                return o && (t[Symbol.iterator] = function() {
                                        return t
                                    }
                                ),
                                    t
                            }
                            function p(e) {
                                this.map = {},
                                    e instanceof p ? e.forEach((function(e, t) {
                                            this.append(t, e)
                                        }
                                    ), this) : Array.isArray(e) ? e.forEach((function(e) {
                                            this.append(e[0], e[1])
                                        }
                                    ), this) : e && Object.getOwnPropertyNames(e).forEach((function(t) {
                                            this.append(t, e[t])
                                        }
                                    ), this)
                            }
                            function h(e) {
                                if (e.bodyUsed)
                                    return Promise.reject(new TypeError("Already read"));
                                e.bodyUsed = !0
                            }
                            function d(e) {
                                return new Promise((function(t, n) {
                                        e.onload = function() {
                                            t(e.result)
                                        }
                                            ,
                                            e.onerror = function() {
                                                n(e.error)
                                            }
                                    }
                                ))
                            }
                            function g(e) {
                                var t = new FileReader
                                    , n = d(t);
                                return t.readAsArrayBuffer(e),
                                    n
                            }
                            function y(e) {
                                if (e.slice)
                                    return e.slice(0);
                                var t = new Uint8Array(e.byteLength);
                                return t.set(new Uint8Array(e)),
                                    t.buffer
                            }
                            function v() {
                                return this.bodyUsed = !1,
                                    this._initBody = function(e) {
                                        var t;
                                        this._bodyInit = e,
                                            e ? "string" == typeof e ? this._bodyText = e : r && Blob.prototype.isPrototypeOf(e) ? this._bodyBlob = e : i && FormData.prototype.isPrototypeOf(e) ? this._bodyFormData = e : n && URLSearchParams.prototype.isPrototypeOf(e) ? this._bodyText = e.toString() : a && r && (t = e) && DataView.prototype.isPrototypeOf(t) ? (this._bodyArrayBuffer = y(e.buffer),
                                                this._bodyInit = new Blob([this._bodyArrayBuffer])) : a && (ArrayBuffer.prototype.isPrototypeOf(e) || u(e)) ? this._bodyArrayBuffer = y(e) : this._bodyText = e = Object.prototype.toString.call(e) : this._bodyText = "",
                                        this.headers.get("content-type") || ("string" == typeof e ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : n && URLSearchParams.prototype.isPrototypeOf(e) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
                                    }
                                    ,
                                r && (this.blob = function() {
                                        var e = h(this);
                                        if (e)
                                            return e;
                                        if (this._bodyBlob)
                                            return Promise.resolve(this._bodyBlob);
                                        if (this._bodyArrayBuffer)
                                            return Promise.resolve(new Blob([this._bodyArrayBuffer]));
                                        if (this._bodyFormData)
                                            throw new Error("could not read FormData body as blob");
                                        return Promise.resolve(new Blob([this._bodyText]))
                                    }
                                        ,
                                        this.arrayBuffer = function() {
                                            return this._bodyArrayBuffer ? h(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(g)
                                        }
                                ),
                                    this.text = function() {
                                        var e, t, n, o = h(this);
                                        if (o)
                                            return o;
                                        if (this._bodyBlob)
                                            return e = this._bodyBlob,
                                                n = d(t = new FileReader),
                                                t.readAsText(e),
                                                n;
                                        if (this._bodyArrayBuffer)
                                            return Promise.resolve(function(e) {
                                                for (var t = new Uint8Array(e), n = new Array(t.length), o = 0; o < t.length; o++)
                                                    n[o] = String.fromCharCode(t[o]);
                                                return n.join("")
                                            }(this._bodyArrayBuffer));
                                        if (this._bodyFormData)
                                            throw new Error("could not read FormData body as text");
                                        return Promise.resolve(this._bodyText)
                                    }
                                    ,
                                i && (this.formData = function() {
                                        return this.text().then(w)
                                    }
                                ),
                                    this.json = function() {
                                        return this.text().then(JSON.parse)
                                    }
                                    ,
                                    this
                            }
                            p.prototype.append = function(e, t) {
                                e = c(e),
                                    t = l(t);
                                var n = this.map[e];
                                this.map[e] = n ? n + ", " + t : t
                            }
                                ,
                                p.prototype.delete = function(e) {
                                    delete this.map[c(e)]
                                }
                                ,
                                p.prototype.get = function(e) {
                                    return e = c(e),
                                        this.has(e) ? this.map[e] : null
                                }
                                ,
                                p.prototype.has = function(e) {
                                    return this.map.hasOwnProperty(c(e))
                                }
                                ,
                                p.prototype.set = function(e, t) {
                                    this.map[c(e)] = l(t)
                                }
                                ,
                                p.prototype.forEach = function(e, t) {
                                    for (var n in this.map)
                                        this.map.hasOwnProperty(n) && e.call(t, this.map[n], n, this)
                                }
                                ,
                                p.prototype.keys = function() {
                                    var e = [];
                                    return this.forEach((function(t, n) {
                                            e.push(n)
                                        }
                                    )),
                                        f(e)
                                }
                                ,
                                p.prototype.values = function() {
                                    var e = [];
                                    return this.forEach((function(t) {
                                            e.push(t)
                                        }
                                    )),
                                        f(e)
                                }
                                ,
                                p.prototype.entries = function() {
                                    var e = [];
                                    return this.forEach((function(t, n) {
                                            e.push([n, t])
                                        }
                                    )),
                                        f(e)
                                }
                                ,
                            o && (p.prototype[Symbol.iterator] = p.prototype.entries);
                            var m = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
                            function b(e, t) {
                                var n, o, r = (t = t || {}).body;
                                if (e instanceof b) {
                                    if (e.bodyUsed)
                                        throw new TypeError("Already read");
                                    this.url = e.url,
                                        this.credentials = e.credentials,
                                    t.headers || (this.headers = new p(e.headers)),
                                        this.method = e.method,
                                        this.mode = e.mode,
                                        this.signal = e.signal,
                                    r || null == e._bodyInit || (r = e._bodyInit,
                                        e.bodyUsed = !0)
                                } else
                                    this.url = String(e);
                                if (this.credentials = t.credentials || this.credentials || "same-origin",
                                !t.headers && this.headers || (this.headers = new p(t.headers)),
                                    this.method = (o = (n = t.method || this.method || "GET").toUpperCase(),
                                        m.indexOf(o) > -1 ? o : n),
                                    this.mode = t.mode || this.mode || null,
                                    this.signal = t.signal || this.signal,
                                    this.referrer = null,
                                ("GET" === this.method || "HEAD" === this.method) && r)
                                    throw new TypeError("Body not allowed for GET or HEAD requests");
                                this._initBody(r)
                            }
                            function w(e) {
                                var t = new FormData;
                                return e.trim().split("&").forEach((function(e) {
                                        if (e) {
                                            var n = e.split("=")
                                                , o = n.shift().replace(/\+/g, " ")
                                                , r = n.join("=").replace(/\+/g, " ");
                                            t.append(decodeURIComponent(o), decodeURIComponent(r))
                                        }
                                    }
                                )),
                                    t
                            }
                            function O(e, t) {
                                t || (t = {}),
                                    this.type = "default",
                                    this.status = void 0 === t.status ? 200 : t.status,
                                    this.ok = this.status >= 200 && this.status < 300,
                                    this.statusText = "statusText"in t ? t.statusText : "OK",
                                    this.headers = new p(t.headers),
                                    this.url = t.url || "",
                                    this._initBody(e)
                            }
                            b.prototype.clone = function() {
                                return new b(this,{
                                    body: this._bodyInit
                                })
                            }
                                ,
                                v.call(b.prototype),
                                v.call(O.prototype),
                                O.prototype.clone = function() {
                                    return new O(this._bodyInit,{
                                        status: this.status,
                                        statusText: this.statusText,
                                        headers: new p(this.headers),
                                        url: this.url
                                    })
                                }
                                ,
                                O.error = function() {
                                    var e = new O(null,{
                                        status: 0,
                                        statusText: ""
                                    });
                                    return e.type = "error",
                                        e
                                }
                            ;
                            var k = [301, 302, 303, 307, 308];
                            O.redirect = function(e, t) {
                                if (-1 === k.indexOf(t))
                                    throw new RangeError("Invalid status code");
                                return new O(null,{
                                    status: t,
                                    headers: {
                                        location: e
                                    }
                                })
                            }
                                ,
                                t.DOMException = e.DOMException;
                            try {
                                new t.DOMException
                            } catch (e) {
                                t.DOMException = function(e, t) {
                                    this.message = e,
                                        this.name = t;
                                    var n = Error(e);
                                    this.stack = n.stack
                                }
                                    ,
                                    t.DOMException.prototype = Object.create(Error.prototype),
                                    t.DOMException.prototype.constructor = t.DOMException
                            }
                            function x(e, n) {
                                return new Promise((function(o, i) {
                                        var a = new b(e,n);
                                        if (a.signal && a.signal.aborted)
                                            return i(new t.DOMException("Aborted","AbortError"));
                                        var s = new XMLHttpRequest;
                                        function u() {
                                            s.abort()
                                        }
                                        s.onload = function() {
                                            var e, t, n = {
                                                status: s.status,
                                                statusText: s.statusText,
                                                headers: (e = s.getAllResponseHeaders() || "",
                                                    t = new p,
                                                    e.replace(/\r?\n[\t ]+/g, " ").split(/\r?\n/).forEach((function(e) {
                                                            var n = e.split(":")
                                                                , o = n.shift().trim();
                                                            if (o) {
                                                                var r = n.join(":").trim();
                                                                t.append(o, r)
                                                            }
                                                        }
                                                    )),
                                                    t)
                                            };
                                            n.url = "responseURL"in s ? s.responseURL : n.headers.get("X-Request-URL");
                                            var r = "response"in s ? s.response : s.responseText;
                                            o(new O(r,n))
                                        }
                                            ,
                                            s.onerror = function() {
                                                i(new TypeError("Network request failed"))
                                            }
                                            ,
                                            s.ontimeout = function() {
                                                i(new TypeError("Network request failed"))
                                            }
                                            ,
                                            s.onabort = function() {
                                                i(new t.DOMException("Aborted","AbortError"))
                                            }
                                            ,
                                            s.open(a.method, a.url, !0),
                                            "include" === a.credentials ? s.withCredentials = !0 : "omit" === a.credentials && (s.withCredentials = !1),
                                        "responseType"in s && r && (s.responseType = "blob"),
                                            a.headers.forEach((function(e, t) {
                                                    s.setRequestHeader(t, e)
                                                }
                                            )),
                                        a.signal && (a.signal.addEventListener("abort", u),
                                                s.onreadystatechange = function() {
                                                    4 === s.readyState && a.signal.removeEventListener("abort", u)
                                                }
                                        ),
                                            s.send(void 0 === a._bodyInit ? null : a._bodyInit)
                                    }
                                ))
                            }
                            x.polyfill = !0,
                            e.fetch || (e.fetch = x,
                                e.Headers = p,
                                e.Request = b,
                                e.Response = O),
                                t.Headers = p,
                                t.Request = b,
                                t.Response = O,
                                t.fetch = x,
                                Object.defineProperty(t, "__esModule", {
                                    value: !0
                                })
                        }({})
                    }(o),
                        o.fetch.ponyfill = !0,
                        delete o.fetch.polyfill;
                    var r = o;
                    (t = r.fetch).default = r.fetch,
                        t.fetch = r.fetch,
                        t.Headers = r.Headers,
                        t.Request = r.Request,
                        t.Response = r.Response,
                        e.exports = t
                },
                3154: function(e, t, n) {
                    var o;
                    if ("function" == typeof fetch && (o = void 0 !== n.g && n.g.fetch ? n.g.fetch : "undefined" != typeof window && window.fetch ? window.fetch : fetch),
                    "undefined" == typeof window || void 0 === window.document) {
                        var r = o || n(4098);
                        r.default && (r = r.default),
                            t.default = r,
                            e.exports = t.default
                    }
                }
            }, o = {};
            function r(e) {
                var t = o[e];
                if (void 0 !== t)
                    return t.exports;
                var i = o[e] = {
                    exports: {}
                };
                return n[e].call(i.exports, i, i.exports, r),
                    i.exports
            }
            t = Object.getPrototypeOf ? function(e) {
                    return Object.getPrototypeOf(e)
                }
                : function(e) {
                    return e.__proto__
                }
                ,
                r.t = function(n, o) {
                    if (1 & o && (n = this(n)),
                    8 & o)
                        return n;
                    if ("object" == typeof n && n) {
                        if (4 & o && n.__esModule)
                            return n;
                        if (16 & o && "function" == typeof n.then)
                            return n
                    }
                    var i = Object.create(null);
                    r.r(i);
                    var a = {};
                    e = e || [null, t({}), t([]), t(t)];
                    for (var s = 2 & o && n; "object" == typeof s && !~e.indexOf(s); s = t(s))
                        Object.getOwnPropertyNames(s).forEach((function(e) {
                                a[e] = function() {
                                    return n[e]
                                }
                            }
                        ));
                    return a.default = function() {
                        return n
                    }
                        ,
                        r.d(i, a),
                        i
                }
                ,
                r.d = function(e, t) {
                    for (var n in t)
                        r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
                            enumerable: !0,
                            get: t[n]
                        })
                }
                ,
                r.g = function() {
                    if ("object" == typeof globalThis)
                        return globalThis;
                    try {
                        return this || new Function("return this")()
                    } catch (e) {
                        if ("object" == typeof window)
                            return window
                    }
                }(),
                r.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                ,
                r.r = function(e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
                        value: "Module"
                    }),
                        Object.defineProperty(e, "__esModule", {
                            value: !0
                        })
                }
            ;
            var i = {};
            return function() {
                "use strict";
                function e(t) {
                    return e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        }
                        : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }
                        ,
                        e(t)
                }
                function t(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }
                function n(t) {
                    var n = function(t, n) {
                        if ("object" !== e(t) || null === t)
                            return t;
                        var o = t[Symbol.toPrimitive];
                        if (void 0 !== o) {
                            var r = o.call(t, "string");
                            if ("object" !== e(r))
                                return r;
                            throw new TypeError("@@toPrimitive must return a primitive value.")
                        }
                        return String(t)
                    }(t);
                    return "symbol" === e(n) ? n : String(n)
                }
                function o(e, t) {
                    for (var o = 0; o < t.length; o++) {
                        var r = t[o];
                        r.enumerable = r.enumerable || !1,
                            r.configurable = !0,
                        "value"in r && (r.writable = !0),
                            Object.defineProperty(e, n(r.key), r)
                    }
                }
                function a(e, t, n) {
                    return t && o(e.prototype, t),
                    n && o(e, n),
                        Object.defineProperty(e, "prototype", {
                            writable: !1
                        }),
                        e
                }
                function s(e) {
                    if (void 0 === e)
                        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return e
                }
                function u(e, t) {
                    return u = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
                        return e.__proto__ = t,
                            e
                    }
                        ,
                        u(e, t)
                }
                function c(e, t) {
                    if ("function" != typeof t && null !== t)
                        throw new TypeError("Super expression must either be null or a function");
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            writable: !0,
                            configurable: !0
                        }
                    }),
                        Object.defineProperty(e, "prototype", {
                            writable: !1
                        }),
                    t && u(e, t)
                }
                function l(t, n) {
                    if (n && ("object" === e(n) || "function" == typeof n))
                        return n;
                    if (void 0 !== n)
                        throw new TypeError("Derived constructors may only return object or undefined");
                    return s(t)
                }
                function f(e) {
                    return f = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(e) {
                        return e.__proto__ || Object.getPrototypeOf(e)
                    }
                        ,
                        f(e)
                }
                function p(e, t, o) {
                    return (t = n(t))in e ? Object.defineProperty(e, t, {
                        value: o,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : e[t] = o,
                        e
                }
                function h(e, t) {
                    (null == t || t > e.length) && (t = e.length);
                    for (var n = 0, o = new Array(t); n < t; n++)
                        o[n] = e[n];
                    return o
                }
                function d(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            }
                        ))),
                            n.push.apply(n, o)
                    }
                    return n
                }
                function g(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? d(Object(n), !0).forEach((function(t) {
                                p(e, t, n[t])
                            }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : d(Object(n)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                            }
                        ))
                    }
                    return e
                }
                r.r(i),
                    r.d(i, {
                        i18NextHttpBackend: function() {
                            return Ae
                        },
                        i18next: function() {
                            return he
                        },
                        languageDetector: function() {
                            return Ze
                        }
                    });
                var y = {
                    type: "logger",
                    log: function(e) {
                        this.output("log", e)
                    },
                    warn: function(e) {
                        this.output("warn", e)
                    },
                    error: function(e) {
                        this.output("error", e)
                    },
                    output: function(e, t) {
                        console && console[e] && console[e].apply(console, t)
                    }
                }
                    , v = function() {
                    function e(n) {
                        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        t(this, e),
                            this.init(n, o)
                    }
                    return a(e, [{
                        key: "init",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            this.prefix = t.prefix || "i18next:",
                                this.logger = e || y,
                                this.options = t,
                                this.debug = t.debug
                        }
                    }, {
                        key: "setDebug",
                        value: function(e) {
                            this.debug = e
                        }
                    }, {
                        key: "log",
                        value: function() {
                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                                t[n] = arguments[n];
                            return this.forward(t, "log", "", !0)
                        }
                    }, {
                        key: "warn",
                        value: function() {
                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                                t[n] = arguments[n];
                            return this.forward(t, "warn", "", !0)
                        }
                    }, {
                        key: "error",
                        value: function() {
                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                                t[n] = arguments[n];
                            return this.forward(t, "error", "")
                        }
                    }, {
                        key: "deprecate",
                        value: function() {
                            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
                                t[n] = arguments[n];
                            return this.forward(t, "warn", "WARNING DEPRECATED: ", !0)
                        }
                    }, {
                        key: "forward",
                        value: function(e, t, n, o) {
                            return o && !this.debug ? null : ("string" == typeof e[0] && (e[0] = "".concat(n).concat(this.prefix, " ").concat(e[0])),
                                this.logger[t](e))
                        }
                    }, {
                        key: "create",
                        value: function(t) {
                            return new e(this.logger,g(g({}, {
                                prefix: "".concat(this.prefix, ":").concat(t, ":")
                            }), this.options))
                        }
                    }, {
                        key: "clone",
                        value: function(t) {
                            return (t = t || this.options).prefix = t.prefix || this.prefix,
                                new e(this.logger,t)
                        }
                    }]),
                        e
                }()
                    , m = new v
                    , b = function() {
                    function e() {
                        t(this, e),
                            this.observers = {}
                    }
                    return a(e, [{
                        key: "on",
                        value: function(e, t) {
                            var n = this;
                            return e.split(" ").forEach((function(e) {
                                    n.observers[e] = n.observers[e] || [],
                                        n.observers[e].push(t)
                                }
                            )),
                                this
                        }
                    }, {
                        key: "off",
                        value: function(e, t) {
                            this.observers[e] && (t ? this.observers[e] = this.observers[e].filter((function(e) {
                                    return e !== t
                                }
                            )) : delete this.observers[e])
                        }
                    }, {
                        key: "emit",
                        value: function(e) {
                            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
                                n[o - 1] = arguments[o];
                            if (this.observers[e]) {
                                var r = [].concat(this.observers[e]);
                                r.forEach((function(e) {
                                        e.apply(void 0, n)
                                    }
                                ))
                            }
                            if (this.observers["*"]) {
                                var i = [].concat(this.observers["*"]);
                                i.forEach((function(t) {
                                        t.apply(t, [e].concat(n))
                                    }
                                ))
                            }
                        }
                    }]),
                        e
                }();
                function w() {
                    var e, t, n = new Promise((function(n, o) {
                            e = n,
                                t = o
                        }
                    ));
                    return n.resolve = e,
                        n.reject = t,
                        n
                }
                function O(e) {
                    return null == e ? "" : "" + e
                }
                function k(e, t, n) {
                    e.forEach((function(e) {
                            t[e] && (n[e] = t[e])
                        }
                    ))
                }
                function x(e, t, n) {
                    function o(e) {
                        return e && e.indexOf("###") > -1 ? e.replace(/###/g, ".") : e
                    }
                    function r() {
                        return !e || "string" == typeof e
                    }
                    for (var i = "string" != typeof t ? [].concat(t) : t.split("."); i.length > 1; ) {
                        if (r())
                            return {};
                        var a = o(i.shift());
                        !e[a] && n && (e[a] = new n),
                            e = Object.prototype.hasOwnProperty.call(e, a) ? e[a] : {}
                    }
                    return r() ? {} : {
                        obj: e,
                        k: o(i.shift())
                    }
                }
                function S(e, t, n) {
                    var o = x(e, t, Object);
                    o.obj[o.k] = n
                }
                function j(e, t) {
                    var n = x(e, t)
                        , o = n.obj
                        , r = n.k;
                    if (o)
                        return o[r]
                }
                function P(e, t, n) {
                    var o = j(e, n);
                    return void 0 !== o ? o : j(t, n)
                }
                function L(e, t, n) {
                    for (var o in t)
                        "__proto__" !== o && "constructor" !== o && (o in e ? "string" == typeof e[o] || e[o]instanceof String || "string" == typeof t[o] || t[o]instanceof String ? n && (e[o] = t[o]) : L(e[o], t[o], n) : e[o] = t[o]);
                    return e
                }
                function R(e) {
                    return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                }
                var E = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                    "/": "&#x2F;"
                };
                function C(e) {
                    return "string" == typeof e ? e.replace(/[&<>"'\/]/g, (function(e) {
                            return E[e]
                        }
                    )) : e
                }
                var N = "undefined" != typeof window && window.navigator && void 0 === window.navigator.userAgentData && window.navigator.userAgent && window.navigator.userAgent.indexOf("MSIE") > -1
                    , T = [" ", ",", "?", "!", ";"];
                function D(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            }
                        ))),
                            n.push.apply(n, o)
                    }
                    return n
                }
                function A(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? D(Object(n), !0).forEach((function(t) {
                                p(e, t, n[t])
                            }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : D(Object(n)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                            }
                        ))
                    }
                    return e
                }
                function I(e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : ".";
                    if (e) {
                        if (e[t])
                            return e[t];
                        for (var o = t.split(n), r = e, i = 0; i < o.length; ++i) {
                            if (!r)
                                return;
                            if ("string" == typeof r[o[i]] && i + 1 < o.length)
                                return;
                            if (void 0 === r[o[i]]) {
                                for (var a = 2, s = o.slice(i, i + a).join(n), u = r[s]; void 0 === u && o.length > i + a; )
                                    a++,
                                        u = r[s = o.slice(i, i + a).join(n)];
                                if (void 0 === u)
                                    return;
                                if (null === u)
                                    return null;
                                if (t.endsWith(s)) {
                                    if ("string" == typeof u)
                                        return u;
                                    if (s && "string" == typeof u[s])
                                        return u[s]
                                }
                                var c = o.slice(i + a).join(n);
                                return c ? I(u, c, n) : void 0
                            }
                            r = r[o[i]]
                        }
                        return r
                    }
                }
                var F = function(e) {
                    c(i, e);
                    var n, o, r = (n = i,
                            o = function() {
                                if ("undefined" == typeof Reflect || !Reflect.construct)
                                    return !1;
                                if (Reflect.construct.sham)
                                    return !1;
                                if ("function" == typeof Proxy)
                                    return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                                    ))),
                                        !0
                                } catch (e) {
                                    return !1
                                }
                            }(),
                            function() {
                                var e, t = f(n);
                                if (o) {
                                    var r = f(this).constructor;
                                    e = Reflect.construct(t, arguments, r)
                                } else
                                    e = t.apply(this, arguments);
                                return l(this, e)
                            }
                    );
                    function i(e) {
                        var n, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                            ns: ["translation"],
                            defaultNS: "translation"
                        };
                        return t(this, i),
                            n = r.call(this),
                        N && b.call(s(n)),
                            n.data = e || {},
                            n.options = o,
                        void 0 === n.options.keySeparator && (n.options.keySeparator = "."),
                        void 0 === n.options.ignoreJSONStructure && (n.options.ignoreJSONStructure = !0),
                            n
                    }
                    return a(i, [{
                        key: "addNamespaces",
                        value: function(e) {
                            this.options.ns.indexOf(e) < 0 && this.options.ns.push(e)
                        }
                    }, {
                        key: "removeNamespaces",
                        value: function(e) {
                            var t = this.options.ns.indexOf(e);
                            t > -1 && this.options.ns.splice(t, 1)
                        }
                    }, {
                        key: "getResource",
                        value: function(e, t, n) {
                            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}
                                , r = void 0 !== o.keySeparator ? o.keySeparator : this.options.keySeparator
                                , i = void 0 !== o.ignoreJSONStructure ? o.ignoreJSONStructure : this.options.ignoreJSONStructure
                                , a = [e, t];
                            n && "string" != typeof n && (a = a.concat(n)),
                            n && "string" == typeof n && (a = a.concat(r ? n.split(r) : n)),
                            e.indexOf(".") > -1 && (a = e.split("."));
                            var s = j(this.data, a);
                            return s || !i || "string" != typeof n ? s : I(this.data && this.data[e] && this.data[e][t], n, r)
                        }
                    }, {
                        key: "addResource",
                        value: function(e, t, n, o) {
                            var r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {
                                silent: !1
                            }
                                , i = this.options.keySeparator;
                            void 0 === i && (i = ".");
                            var a = [e, t];
                            n && (a = a.concat(i ? n.split(i) : n)),
                            e.indexOf(".") > -1 && (o = t,
                                t = (a = e.split("."))[1]),
                                this.addNamespaces(t),
                                S(this.data, a, o),
                            r.silent || this.emit("added", e, t, n, o)
                        }
                    }, {
                        key: "addResources",
                        value: function(e, t, n) {
                            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {
                                silent: !1
                            };
                            for (var r in n)
                                "string" != typeof n[r] && "[object Array]" !== Object.prototype.toString.apply(n[r]) || this.addResource(e, t, r, n[r], {
                                    silent: !0
                                });
                            o.silent || this.emit("added", e, t, n)
                        }
                    }, {
                        key: "addResourceBundle",
                        value: function(e, t, n, o, r) {
                            var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {
                                silent: !1
                            }
                                , a = [e, t];
                            e.indexOf(".") > -1 && (o = n,
                                n = t,
                                t = (a = e.split("."))[1]),
                                this.addNamespaces(t);
                            var s = j(this.data, a) || {};
                            o ? L(s, n, r) : s = A(A({}, s), n),
                                S(this.data, a, s),
                            i.silent || this.emit("added", e, t, n)
                        }
                    }, {
                        key: "removeResourceBundle",
                        value: function(e, t) {
                            this.hasResourceBundle(e, t) && delete this.data[e][t],
                                this.removeNamespaces(t),
                                this.emit("removed", e, t)
                        }
                    }, {
                        key: "hasResourceBundle",
                        value: function(e, t) {
                            return void 0 !== this.getResource(e, t)
                        }
                    }, {
                        key: "getResourceBundle",
                        value: function(e, t) {
                            return t || (t = this.options.defaultNS),
                                "v1" === this.options.compatibilityAPI ? A(A({}, {}), this.getResource(e, t)) : this.getResource(e, t)
                        }
                    }, {
                        key: "getDataByLanguage",
                        value: function(e) {
                            return this.data[e]
                        }
                    }, {
                        key: "hasLanguageSomeTranslations",
                        value: function(e) {
                            var t = this.getDataByLanguage(e);
                            return !!(t && Object.keys(t) || []).find((function(e) {
                                    return t[e] && Object.keys(t[e]).length > 0
                                }
                            ))
                        }
                    }, {
                        key: "toJSON",
                        value: function() {
                            return this.data
                        }
                    }]),
                        i
                }(b)
                    , U = {
                    processors: {},
                    addPostProcessor: function(e) {
                        this.processors[e.name] = e
                    },
                    handle: function(e, t, n, o, r) {
                        var i = this;
                        return e.forEach((function(e) {
                                i.processors[e] && (t = i.processors[e].process(t, n, o, r))
                            }
                        )),
                            t
                    }
                };
                function _(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            }
                        ))),
                            n.push.apply(n, o)
                    }
                    return n
                }
                function B(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? _(Object(n), !0).forEach((function(t) {
                                p(e, t, n[t])
                            }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : _(Object(n)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                            }
                        ))
                    }
                    return e
                }
                var M = {}
                    , H = function(n) {
                    c(u, n);
                    var o, r, i = (o = u,
                            r = function() {
                                if ("undefined" == typeof Reflect || !Reflect.construct)
                                    return !1;
                                if (Reflect.construct.sham)
                                    return !1;
                                if ("function" == typeof Proxy)
                                    return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                                    ))),
                                        !0
                                } catch (e) {
                                    return !1
                                }
                            }(),
                            function() {
                                var e, t = f(o);
                                if (r) {
                                    var n = f(this).constructor;
                                    e = Reflect.construct(t, arguments, n)
                                } else
                                    e = t.apply(this, arguments);
                                return l(this, e)
                            }
                    );
                    function u(e) {
                        var n, o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        return t(this, u),
                            n = i.call(this),
                        N && b.call(s(n)),
                            k(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], e, s(n)),
                            n.options = o,
                        void 0 === n.options.keySeparator && (n.options.keySeparator = "."),
                            n.logger = m.create("translator"),
                            n
                    }
                    return a(u, [{
                        key: "changeLanguage",
                        value: function(e) {
                            e && (this.language = e)
                        }
                    }, {
                        key: "exists",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                interpolation: {}
                            };
                            if (null == e)
                                return !1;
                            var n = this.resolve(e, t);
                            return n && void 0 !== n.res
                        }
                    }, {
                        key: "extractFromKey",
                        value: function(e, t) {
                            var n = void 0 !== t.nsSeparator ? t.nsSeparator : this.options.nsSeparator;
                            void 0 === n && (n = ":");
                            var o = void 0 !== t.keySeparator ? t.keySeparator : this.options.keySeparator
                                , r = t.ns || this.options.defaultNS || []
                                , i = n && e.indexOf(n) > -1
                                , a = !(this.options.userDefinedKeySeparator || t.keySeparator || this.options.userDefinedNsSeparator || t.nsSeparator || function(e, t, n) {
                                t = t || "",
                                    n = n || "";
                                var o = T.filter((function(e) {
                                        return t.indexOf(e) < 0 && n.indexOf(e) < 0
                                    }
                                ));
                                if (0 === o.length)
                                    return !0;
                                var r = new RegExp("(".concat(o.map((function(e) {
                                        return "?" === e ? "\\?" : e
                                    }
                                )).join("|"), ")"))
                                    , i = !r.test(e);
                                if (!i) {
                                    var a = e.indexOf(n);
                                    a > 0 && !r.test(e.substring(0, a)) && (i = !0)
                                }
                                return i
                            }(e, n, o));
                            if (i && !a) {
                                var s = e.match(this.interpolator.nestingRegexp);
                                if (s && s.length > 0)
                                    return {
                                        key: e,
                                        namespaces: r
                                    };
                                var u = e.split(n);
                                (n !== o || n === o && this.options.ns.indexOf(u[0]) > -1) && (r = u.shift()),
                                    e = u.join(o)
                            }
                            return "string" == typeof r && (r = [r]),
                                {
                                    key: e,
                                    namespaces: r
                                }
                        }
                    }, {
                        key: "translate",
                        value: function(t, n, o) {
                            var r = this;
                            if ("object" !== e(n) && this.options.overloadTranslationOptionHandler && (n = this.options.overloadTranslationOptionHandler(arguments)),
                            n || (n = {}),
                            null == t)
                                return "";
                            Array.isArray(t) || (t = [String(t)]);
                            var i = void 0 !== n.returnDetails ? n.returnDetails : this.options.returnDetails
                                , a = void 0 !== n.keySeparator ? n.keySeparator : this.options.keySeparator
                                , s = this.extractFromKey(t[t.length - 1], n)
                                , c = s.key
                                , l = s.namespaces
                                , f = l[l.length - 1]
                                , p = n.lng || this.language
                                , h = n.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
                            if (p && "cimode" === p.toLowerCase()) {
                                if (h) {
                                    var d = n.nsSeparator || this.options.nsSeparator;
                                    return i ? (g.res = "".concat(f).concat(d).concat(c),
                                        g) : "".concat(f).concat(d).concat(c)
                                }
                                return i ? (g.res = c,
                                    g) : c
                            }
                            var g = this.resolve(t, n)
                                , y = g && g.res
                                , v = g && g.usedKey || c
                                , m = g && g.exactUsedKey || c
                                , b = Object.prototype.toString.apply(y)
                                , w = ["[object Number]", "[object Function]", "[object RegExp]"]
                                , O = void 0 !== n.joinArrays ? n.joinArrays : this.options.joinArrays
                                , k = !this.i18nFormat || this.i18nFormat.handleAsObject
                                , x = "string" != typeof y && "boolean" != typeof y && "number" != typeof y;
                            if (k && y && x && w.indexOf(b) < 0 && ("string" != typeof O || "[object Array]" !== b)) {
                                if (!n.returnObjects && !this.options.returnObjects) {
                                    this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                                    var S = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(v, y, B(B({}, n), {}, {
                                        ns: l
                                    })) : "key '".concat(c, " (").concat(this.language, ")' returned an object instead of string.");
                                    return i ? (g.res = S,
                                        g) : S
                                }
                                if (a) {
                                    var j = "[object Array]" === b
                                        , P = j ? [] : {}
                                        , L = j ? m : v;
                                    for (var R in y)
                                        if (Object.prototype.hasOwnProperty.call(y, R)) {
                                            var E = "".concat(L).concat(a).concat(R);
                                            P[R] = this.translate(E, B(B({}, n), {
                                                joinArrays: !1,
                                                ns: l
                                            })),
                                            P[R] === E && (P[R] = y[R])
                                        }
                                    y = P
                                }
                            } else if (k && "string" == typeof O && "[object Array]" === b)
                                (y = y.join(O)) && (y = this.extendTranslation(y, t, n, o));
                            else {
                                var C = !1
                                    , N = !1
                                    , T = void 0 !== n.count && "string" != typeof n.count
                                    , D = u.hasDefaultValue(n)
                                    , A = T ? this.pluralResolver.getSuffix(p, n.count, n) : ""
                                    , I = n["defaultValue".concat(A)] || n.defaultValue;
                                !this.isValidLookup(y) && D && (C = !0,
                                    y = I),
                                this.isValidLookup(y) || (N = !0,
                                    y = c);
                                var F = n.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey
                                    , U = F && N ? void 0 : y
                                    , _ = D && I !== y && this.options.updateMissing;
                                if (N || C || _) {
                                    if (this.logger.log(_ ? "updateKey" : "missingKey", p, f, c, _ ? I : y),
                                        a) {
                                        var M = this.resolve(c, B(B({}, n), {}, {
                                            keySeparator: !1
                                        }));
                                        M && M.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.")
                                    }
                                    var H = []
                                        , q = this.languageUtils.getFallbackCodes(this.options.fallbackLng, n.lng || this.language);
                                    if ("fallback" === this.options.saveMissingTo && q && q[0])
                                        for (var V = 0; V < q.length; V++)
                                            H.push(q[V]);
                                    else
                                        "all" === this.options.saveMissingTo ? H = this.languageUtils.toResolveHierarchy(n.lng || this.language) : H.push(n.lng || this.language);
                                    var K = function(e, t, o) {
                                        var i = D && o !== y ? o : U;
                                        r.options.missingKeyHandler ? r.options.missingKeyHandler(e, f, t, i, _, n) : r.backendConnector && r.backendConnector.saveMissing && r.backendConnector.saveMissing(e, f, t, i, _, n),
                                            r.emit("missingKey", e, f, t, y)
                                    };
                                    this.options.saveMissing && (this.options.saveMissingPlurals && T ? H.forEach((function(e) {
                                            r.pluralResolver.getSuffixes(e, n).forEach((function(t) {
                                                    K([e], c + t, n["defaultValue".concat(t)] || I)
                                                }
                                            ))
                                        }
                                    )) : K(H, c, I))
                                }
                                y = this.extendTranslation(y, t, n, g, o),
                                N && y === c && this.options.appendNamespaceToMissingKey && (y = "".concat(f, ":").concat(c)),
                                (N || C) && this.options.parseMissingKeyHandler && (y = "v1" !== this.options.compatibilityAPI ? this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? "".concat(f, ":").concat(c) : c, C ? y : void 0) : this.options.parseMissingKeyHandler(y))
                            }
                            return i ? (g.res = y,
                                g) : y
                        }
                    }, {
                        key: "extendTranslation",
                        value: function(e, t, n, o, r) {
                            var i = this;
                            if (this.i18nFormat && this.i18nFormat.parse)
                                e = this.i18nFormat.parse(e, B(B({}, this.options.interpolation.defaultVariables), n), o.usedLng, o.usedNS, o.usedKey, {
                                    resolved: o
                                });
                            else if (!n.skipInterpolation) {
                                n.interpolation && this.interpolator.init(B(B({}, n), {
                                    interpolation: B(B({}, this.options.interpolation), n.interpolation)
                                }));
                                var a, s = "string" == typeof e && (n && n.interpolation && void 0 !== n.interpolation.skipOnVariables ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
                                if (s) {
                                    var u = e.match(this.interpolator.nestingRegexp);
                                    a = u && u.length
                                }
                                var c = n.replace && "string" != typeof n.replace ? n.replace : n;
                                if (this.options.interpolation.defaultVariables && (c = B(B({}, this.options.interpolation.defaultVariables), c)),
                                    e = this.interpolator.interpolate(e, c, n.lng || this.language, n),
                                    s) {
                                    var l = e.match(this.interpolator.nestingRegexp);
                                    a < (l && l.length) && (n.nest = !1)
                                }
                                !1 !== n.nest && (e = this.interpolator.nest(e, (function() {
                                        for (var e = arguments.length, o = new Array(e), a = 0; a < e; a++)
                                            o[a] = arguments[a];
                                        return r && r[0] === o[0] && !n.context ? (i.logger.warn("It seems you are nesting recursively key: ".concat(o[0], " in key: ").concat(t[0])),
                                            null) : i.translate.apply(i, o.concat([t]))
                                    }
                                ), n)),
                                n.interpolation && this.interpolator.reset()
                            }
                            var f = n.postProcess || this.options.postProcess
                                , p = "string" == typeof f ? [f] : f;
                            return null != e && p && p.length && !1 !== n.applyPostProcessor && (e = U.handle(p, e, t, this.options && this.options.postProcessPassResolved ? B({
                                i18nResolved: o
                            }, n) : n, this)),
                                e
                        }
                    }, {
                        key: "resolve",
                        value: function(e) {
                            var t, n, o, r, i, a = this, s = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            return "string" == typeof e && (e = [e]),
                                e.forEach((function(e) {
                                        if (!a.isValidLookup(t)) {
                                            var u = a.extractFromKey(e, s)
                                                , c = u.key;
                                            n = c;
                                            var l = u.namespaces;
                                            a.options.fallbackNS && (l = l.concat(a.options.fallbackNS));
                                            var f = void 0 !== s.count && "string" != typeof s.count
                                                , p = f && !s.ordinal && 0 === s.count && a.pluralResolver.shouldUseIntlApi()
                                                , h = void 0 !== s.context && ("string" == typeof s.context || "number" == typeof s.context) && "" !== s.context
                                                , d = s.lngs ? s.lngs : a.languageUtils.toResolveHierarchy(s.lng || a.language, s.fallbackLng);
                                            l.forEach((function(e) {
                                                    a.isValidLookup(t) || (i = e,
                                                    !M["".concat(d[0], "-").concat(e)] && a.utils && a.utils.hasLoadedNamespace && !a.utils.hasLoadedNamespace(i) && (M["".concat(d[0], "-").concat(e)] = !0,
                                                        a.logger.warn('key "'.concat(n, '" for languages "').concat(d.join(", "), '" won\'t get resolved as namespace "').concat(i, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")),
                                                        d.forEach((function(n) {
                                                                if (!a.isValidLookup(t)) {
                                                                    r = n;
                                                                    var i, u = [c];
                                                                    if (a.i18nFormat && a.i18nFormat.addLookupKeys)
                                                                        a.i18nFormat.addLookupKeys(u, c, n, e, s);
                                                                    else {
                                                                        var l;
                                                                        f && (l = a.pluralResolver.getSuffix(n, s.count, s));
                                                                        var d = "".concat(a.options.pluralSeparator, "zero");
                                                                        if (f && (u.push(c + l),
                                                                        p && u.push(c + d)),
                                                                            h) {
                                                                            var g = "".concat(c).concat(a.options.contextSeparator).concat(s.context);
                                                                            u.push(g),
                                                                            f && (u.push(g + l),
                                                                            p && u.push(g + d))
                                                                        }
                                                                    }
                                                                    for (; i = u.pop(); )
                                                                        a.isValidLookup(t) || (o = i,
                                                                            t = a.getResource(n, e, i, s))
                                                                }
                                                            }
                                                        )))
                                                }
                                            ))
                                        }
                                    }
                                )),
                                {
                                    res: t,
                                    usedKey: n,
                                    exactUsedKey: o,
                                    usedLng: r,
                                    usedNS: i
                                }
                        }
                    }, {
                        key: "isValidLookup",
                        value: function(e) {
                            return !(void 0 === e || !this.options.returnNull && null === e || !this.options.returnEmptyString && "" === e)
                        }
                    }, {
                        key: "getResource",
                        value: function(e, t, n) {
                            var o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                            return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(e, t, n, o) : this.resourceStore.getResource(e, t, n, o)
                        }
                    }], [{
                        key: "hasDefaultValue",
                        value: function(e) {
                            var t = "defaultValue";
                            for (var n in e)
                                if (Object.prototype.hasOwnProperty.call(e, n) && t === n.substring(0, t.length) && void 0 !== e[n])
                                    return !0;
                            return !1
                        }
                    }]),
                        u
                }(b);
                function q(e) {
                    return e.charAt(0).toUpperCase() + e.slice(1)
                }
                var V = function() {
                    function e(n) {
                        t(this, e),
                            this.options = n,
                            this.supportedLngs = this.options.supportedLngs || !1,
                            this.logger = m.create("languageUtils")
                    }
                    return a(e, [{
                        key: "getScriptPartFromCode",
                        value: function(e) {
                            if (!e || e.indexOf("-") < 0)
                                return null;
                            var t = e.split("-");
                            return 2 === t.length ? null : (t.pop(),
                                "x" === t[t.length - 1].toLowerCase() ? null : this.formatLanguageCode(t.join("-")))
                        }
                    }, {
                        key: "getLanguagePartFromCode",
                        value: function(e) {
                            if (!e || e.indexOf("-") < 0)
                                return e;
                            var t = e.split("-");
                            return this.formatLanguageCode(t[0])
                        }
                    }, {
                        key: "formatLanguageCode",
                        value: function(e) {
                            if ("string" == typeof e && e.indexOf("-") > -1) {
                                var t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"]
                                    , n = e.split("-");
                                return this.options.lowerCaseLng ? n = n.map((function(e) {
                                        return e.toLowerCase()
                                    }
                                )) : 2 === n.length ? (n[0] = n[0].toLowerCase(),
                                    n[1] = n[1].toUpperCase(),
                                t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = q(n[1].toLowerCase()))) : 3 === n.length && (n[0] = n[0].toLowerCase(),
                                2 === n[1].length && (n[1] = n[1].toUpperCase()),
                                "sgn" !== n[0] && 2 === n[2].length && (n[2] = n[2].toUpperCase()),
                                t.indexOf(n[1].toLowerCase()) > -1 && (n[1] = q(n[1].toLowerCase())),
                                t.indexOf(n[2].toLowerCase()) > -1 && (n[2] = q(n[2].toLowerCase()))),
                                    n.join("-")
                            }
                            return this.options.cleanCode || this.options.lowerCaseLng ? e.toLowerCase() : e
                        }
                    }, {
                        key: "isSupportedCode",
                        value: function(e) {
                            return ("languageOnly" === this.options.load || this.options.nonExplicitSupportedLngs) && (e = this.getLanguagePartFromCode(e)),
                            !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(e) > -1
                        }
                    }, {
                        key: "getBestMatchFromCodes",
                        value: function(e) {
                            var t, n = this;
                            return e ? (e.forEach((function(e) {
                                    if (!t) {
                                        var o = n.formatLanguageCode(e);
                                        n.options.supportedLngs && !n.isSupportedCode(o) || (t = o)
                                    }
                                }
                            )),
                            !t && this.options.supportedLngs && e.forEach((function(e) {
                                    if (!t) {
                                        var o = n.getLanguagePartFromCode(e);
                                        if (n.isSupportedCode(o))
                                            return t = o;
                                        t = n.options.supportedLngs.find((function(e) {
                                                if (0 === e.indexOf(o))
                                                    return e
                                            }
                                        ))
                                    }
                                }
                            )),
                            t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
                                t) : null
                        }
                    }, {
                        key: "getFallbackCodes",
                        value: function(e, t) {
                            if (!e)
                                return [];
                            if ("function" == typeof e && (e = e(t)),
                            "string" == typeof e && (e = [e]),
                            "[object Array]" === Object.prototype.toString.apply(e))
                                return e;
                            if (!t)
                                return e.default || [];
                            var n = e[t];
                            return n || (n = e[this.getScriptPartFromCode(t)]),
                            n || (n = e[this.formatLanguageCode(t)]),
                            n || (n = e[this.getLanguagePartFromCode(t)]),
                            n || (n = e.default),
                            n || []
                        }
                    }, {
                        key: "toResolveHierarchy",
                        value: function(e, t) {
                            var n = this
                                , o = this.getFallbackCodes(t || this.options.fallbackLng || [], e)
                                , r = []
                                , i = function(e) {
                                e && (n.isSupportedCode(e) ? r.push(e) : n.logger.warn("rejecting language code not found in supportedLngs: ".concat(e)))
                            };
                            return "string" == typeof e && e.indexOf("-") > -1 ? ("languageOnly" !== this.options.load && i(this.formatLanguageCode(e)),
                            "languageOnly" !== this.options.load && "currentOnly" !== this.options.load && i(this.getScriptPartFromCode(e)),
                            "currentOnly" !== this.options.load && i(this.getLanguagePartFromCode(e))) : "string" == typeof e && i(this.formatLanguageCode(e)),
                                o.forEach((function(e) {
                                        r.indexOf(e) < 0 && i(n.formatLanguageCode(e))
                                    }
                                )),
                                r
                        }
                    }]),
                        e
                }()
                    , K = [{
                    lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
                    nr: [1, 2],
                    fc: 1
                }, {
                    lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
                    nr: [1, 2],
                    fc: 2
                }, {
                    lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
                    nr: [1],
                    fc: 3
                }, {
                    lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
                    nr: [1, 2, 5],
                    fc: 4
                }, {
                    lngs: ["ar"],
                    nr: [0, 1, 2, 3, 11, 100],
                    fc: 5
                }, {
                    lngs: ["cs", "sk"],
                    nr: [1, 2, 5],
                    fc: 6
                }, {
                    lngs: ["csb", "pl"],
                    nr: [1, 2, 5],
                    fc: 7
                }, {
                    lngs: ["cy"],
                    nr: [1, 2, 3, 8],
                    fc: 8
                }, {
                    lngs: ["fr"],
                    nr: [1, 2],
                    fc: 9
                }, {
                    lngs: ["ga"],
                    nr: [1, 2, 3, 7, 11],
                    fc: 10
                }, {
                    lngs: ["gd"],
                    nr: [1, 2, 3, 20],
                    fc: 11
                }, {
                    lngs: ["is"],
                    nr: [1, 2],
                    fc: 12
                }, {
                    lngs: ["jv"],
                    nr: [0, 1],
                    fc: 13
                }, {
                    lngs: ["kw"],
                    nr: [1, 2, 3, 4],
                    fc: 14
                }, {
                    lngs: ["lt"],
                    nr: [1, 2, 10],
                    fc: 15
                }, {
                    lngs: ["lv"],
                    nr: [1, 2, 0],
                    fc: 16
                }, {
                    lngs: ["mk"],
                    nr: [1, 2],
                    fc: 17
                }, {
                    lngs: ["mnk"],
                    nr: [0, 1, 2],
                    fc: 18
                }, {
                    lngs: ["mt"],
                    nr: [1, 2, 11, 20],
                    fc: 19
                }, {
                    lngs: ["or"],
                    nr: [2, 1],
                    fc: 2
                }, {
                    lngs: ["ro"],
                    nr: [1, 2, 20],
                    fc: 20
                }, {
                    lngs: ["sl"],
                    nr: [5, 1, 2, 3],
                    fc: 21
                }, {
                    lngs: ["he", "iw"],
                    nr: [1, 2, 20, 21],
                    fc: 22
                }]
                    , z = {
                    1: function(e) {
                        return Number(e > 1)
                    },
                    2: function(e) {
                        return Number(1 != e)
                    },
                    3: function(e) {
                        return 0
                    },
                    4: function(e) {
                        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
                    },
                    5: function(e) {
                        return Number(0 == e ? 0 : 1 == e ? 1 : 2 == e ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5)
                    },
                    6: function(e) {
                        return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2)
                    },
                    7: function(e) {
                        return Number(1 == e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
                    },
                    8: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3)
                    },
                    9: function(e) {
                        return Number(e >= 2)
                    },
                    10: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4)
                    },
                    11: function(e) {
                        return Number(1 == e || 11 == e ? 0 : 2 == e || 12 == e ? 1 : e > 2 && e < 20 ? 2 : 3)
                    },
                    12: function(e) {
                        return Number(e % 10 != 1 || e % 100 == 11)
                    },
                    13: function(e) {
                        return Number(0 !== e)
                    },
                    14: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3)
                    },
                    15: function(e) {
                        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2)
                    },
                    16: function(e) {
                        return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2)
                    },
                    17: function(e) {
                        return Number(1 == e || e % 10 == 1 && e % 100 != 11 ? 0 : 1)
                    },
                    18: function(e) {
                        return Number(0 == e ? 0 : 1 == e ? 1 : 2)
                    },
                    19: function(e) {
                        return Number(1 == e ? 0 : 0 == e || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3)
                    },
                    20: function(e) {
                        return Number(1 == e ? 0 : 0 == e || e % 100 > 0 && e % 100 < 20 ? 1 : 2)
                    },
                    21: function(e) {
                        return Number(e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0)
                    },
                    22: function(e) {
                        return Number(1 == e ? 0 : 2 == e ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3)
                    }
                }
                    , J = ["v1", "v2", "v3"]
                    , X = {
                    zero: 0,
                    one: 1,
                    two: 2,
                    few: 3,
                    many: 4,
                    other: 5
                };
                function $() {
                    var e = {};
                    return K.forEach((function(t) {
                            t.lngs.forEach((function(n) {
                                    e[n] = {
                                        numbers: t.nr,
                                        plurals: z[t.fc]
                                    }
                                }
                            ))
                        }
                    )),
                        e
                }
                var G = function() {
                    function e(n) {
                        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        t(this, e),
                            this.languageUtils = n,
                            this.options = o,
                            this.logger = m.create("pluralResolver"),
                        this.options.compatibilityJSON && "v4" !== this.options.compatibilityJSON || "undefined" != typeof Intl && Intl.PluralRules || (this.options.compatibilityJSON = "v3",
                            this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")),
                            this.rules = $()
                    }
                    return a(e, [{
                        key: "addRule",
                        value: function(e, t) {
                            this.rules[e] = t
                        }
                    }, {
                        key: "getRule",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            if (this.shouldUseIntlApi())
                                try {
                                    return new Intl.PluralRules(e,{
                                        type: t.ordinal ? "ordinal" : "cardinal"
                                    })
                                } catch (e) {
                                    return
                                }
                            return this.rules[e] || this.rules[this.languageUtils.getLanguagePartFromCode(e)]
                        }
                    }, {
                        key: "needsPlural",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                                , n = this.getRule(e, t);
                            return this.shouldUseIntlApi() ? n && n.resolvedOptions().pluralCategories.length > 1 : n && n.numbers.length > 1
                        }
                    }, {
                        key: "getPluralFormsOfKey",
                        value: function(e, t) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            return this.getSuffixes(e, n).map((function(e) {
                                    return "".concat(t).concat(e)
                                }
                            ))
                        }
                    }, {
                        key: "getSuffixes",
                        value: function(e) {
                            var t = this
                                , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                                , o = this.getRule(e, n);
                            return o ? this.shouldUseIntlApi() ? o.resolvedOptions().pluralCategories.sort((function(e, t) {
                                    return X[e] - X[t]
                                }
                            )).map((function(e) {
                                    return "".concat(t.options.prepend).concat(e)
                                }
                            )) : o.numbers.map((function(o) {
                                    return t.getSuffix(e, o, n)
                                }
                            )) : []
                        }
                    }, {
                        key: "getSuffix",
                        value: function(e, t) {
                            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                                , o = this.getRule(e, n);
                            return o ? this.shouldUseIntlApi() ? "".concat(this.options.prepend).concat(o.select(t)) : this.getSuffixRetroCompatible(o, t) : (this.logger.warn("no plural rule found for: ".concat(e)),
                                "")
                        }
                    }, {
                        key: "getSuffixRetroCompatible",
                        value: function(e, t) {
                            var n = this
                                , o = e.noAbs ? e.plurals(t) : e.plurals(Math.abs(t))
                                , r = e.numbers[o];
                            this.options.simplifyPluralSuffix && 2 === e.numbers.length && 1 === e.numbers[0] && (2 === r ? r = "plural" : 1 === r && (r = ""));
                            var i = function() {
                                return n.options.prepend && r.toString() ? n.options.prepend + r.toString() : r.toString()
                            };
                            return "v1" === this.options.compatibilityJSON ? 1 === r ? "" : "number" == typeof r ? "_plural_".concat(r.toString()) : i() : "v2" === this.options.compatibilityJSON || this.options.simplifyPluralSuffix && 2 === e.numbers.length && 1 === e.numbers[0] ? i() : this.options.prepend && o.toString() ? this.options.prepend + o.toString() : o.toString()
                        }
                    }, {
                        key: "shouldUseIntlApi",
                        value: function() {
                            return !J.includes(this.options.compatibilityJSON)
                        }
                    }]),
                        e
                }();
                function W(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            }
                        ))),
                            n.push.apply(n, o)
                    }
                    return n
                }
                function Y(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? W(Object(n), !0).forEach((function(t) {
                                p(e, t, n[t])
                            }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : W(Object(n)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                            }
                        ))
                    }
                    return e
                }
                var Q = function() {
                    function e() {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        t(this, e),
                            this.logger = m.create("interpolator"),
                            this.options = n,
                            this.format = n.interpolation && n.interpolation.format || function(e) {
                                return e
                            }
                            ,
                            this.init(n)
                    }
                    return a(e, [{
                        key: "init",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            e.interpolation || (e.interpolation = {
                                escapeValue: !0
                            });
                            var t = e.interpolation;
                            this.escape = void 0 !== t.escape ? t.escape : C,
                                this.escapeValue = void 0 === t.escapeValue || t.escapeValue,
                                this.useRawValueToEscape = void 0 !== t.useRawValueToEscape && t.useRawValueToEscape,
                                this.prefix = t.prefix ? R(t.prefix) : t.prefixEscaped || "{{",
                                this.suffix = t.suffix ? R(t.suffix) : t.suffixEscaped || "}}",
                                this.formatSeparator = t.formatSeparator ? t.formatSeparator : t.formatSeparator || ",",
                                this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-",
                                this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || "",
                                this.nestingPrefix = t.nestingPrefix ? R(t.nestingPrefix) : t.nestingPrefixEscaped || R("$t("),
                                this.nestingSuffix = t.nestingSuffix ? R(t.nestingSuffix) : t.nestingSuffixEscaped || R(")"),
                                this.nestingOptionsSeparator = t.nestingOptionsSeparator ? t.nestingOptionsSeparator : t.nestingOptionsSeparator || ",",
                                this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3,
                                this.alwaysFormat = void 0 !== t.alwaysFormat && t.alwaysFormat,
                                this.resetRegExp()
                        }
                    }, {
                        key: "reset",
                        value: function() {
                            this.options && this.init(this.options)
                        }
                    }, {
                        key: "resetRegExp",
                        value: function() {
                            var e = "".concat(this.prefix, "(.+?)").concat(this.suffix);
                            this.regexp = new RegExp(e,"g");
                            var t = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
                            this.regexpUnescape = new RegExp(t,"g");
                            var n = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
                            this.nestingRegexp = new RegExp(n,"g")
                        }
                    }, {
                        key: "interpolate",
                        value: function(e, t, n, o) {
                            var r, i, a, s = this, u = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
                            function c(e) {
                                return e.replace(/\$/g, "$$$$")
                            }
                            var l = function(e) {
                                if (e.indexOf(s.formatSeparator) < 0) {
                                    var r = P(t, u, e);
                                    return s.alwaysFormat ? s.format(r, void 0, n, Y(Y(Y({}, o), t), {}, {
                                        interpolationkey: e
                                    })) : r
                                }
                                var i = e.split(s.formatSeparator)
                                    , a = i.shift().trim()
                                    , c = i.join(s.formatSeparator).trim();
                                return s.format(P(t, u, a), c, n, Y(Y(Y({}, o), t), {}, {
                                    interpolationkey: a
                                }))
                            };
                            this.resetRegExp();
                            var f = o && o.missingInterpolationHandler || this.options.missingInterpolationHandler
                                , p = o && o.interpolation && void 0 !== o.interpolation.skipOnVariables ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
                            return [{
                                regex: this.regexpUnescape,
                                safeValue: function(e) {
                                    return c(e)
                                }
                            }, {
                                regex: this.regexp,
                                safeValue: function(e) {
                                    return s.escapeValue ? c(s.escape(e)) : c(e)
                                }
                            }].forEach((function(t) {
                                    for (a = 0; r = t.regex.exec(e); ) {
                                        var n = r[1].trim();
                                        if (void 0 === (i = l(n)))
                                            if ("function" == typeof f) {
                                                var u = f(e, r, o);
                                                i = "string" == typeof u ? u : ""
                                            } else if (o && o.hasOwnProperty(n))
                                                i = "";
                                            else {
                                                if (p) {
                                                    i = r[0];
                                                    continue
                                                }
                                                s.logger.warn("missed to pass in variable ".concat(n, " for interpolating ").concat(e)),
                                                    i = ""
                                            }
                                        else
                                            "string" == typeof i || s.useRawValueToEscape || (i = O(i));
                                        var c = t.safeValue(i);
                                        if (e = e.replace(r[0], c),
                                            p ? (t.regex.lastIndex += i.length,
                                                t.regex.lastIndex -= r[0].length) : t.regex.lastIndex = 0,
                                        ++a >= s.maxReplaces)
                                            break
                                    }
                                }
                            )),
                                e
                        }
                    }, {
                        key: "nest",
                        value: function(e, t) {
                            var n, o, r = this, i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}, a = Y({}, i);
                            function s(e, t) {
                                var n = this.nestingOptionsSeparator;
                                if (e.indexOf(n) < 0)
                                    return e;
                                var o = e.split(new RegExp("".concat(n, "[ ]*{")))
                                    , r = "{".concat(o[1]);
                                e = o[0];
                                var i = (r = this.interpolate(r, a)).match(/'/g)
                                    , s = r.match(/"/g);
                                (i && i.length % 2 == 0 && !s || s.length % 2 != 0) && (r = r.replace(/'/g, '"'));
                                try {
                                    a = JSON.parse(r),
                                    t && (a = Y(Y({}, t), a))
                                } catch (t) {
                                    return this.logger.warn("failed parsing options string in nesting for key ".concat(e), t),
                                        "".concat(e).concat(n).concat(r)
                                }
                                return delete a.defaultValue,
                                    e
                            }
                            for (a.applyPostProcessor = !1,
                                     delete a.defaultValue; n = this.nestingRegexp.exec(e); ) {
                                var u = []
                                    , c = !1;
                                if (-1 !== n[0].indexOf(this.formatSeparator) && !/{.*}/.test(n[1])) {
                                    var l = n[1].split(this.formatSeparator).map((function(e) {
                                            return e.trim()
                                        }
                                    ));
                                    n[1] = l.shift(),
                                        u = l,
                                        c = !0
                                }
                                if ((o = t(s.call(this, n[1].trim(), a), a)) && n[0] === e && "string" != typeof o)
                                    return o;
                                "string" != typeof o && (o = O(o)),
                                o || (this.logger.warn("missed to resolve ".concat(n[1], " for nesting ").concat(e)),
                                    o = ""),
                                c && (o = u.reduce((function(e, t) {
                                        return r.format(e, t, i.lng, Y(Y({}, i), {}, {
                                            interpolationkey: n[1].trim()
                                        }))
                                    }
                                ), o.trim())),
                                    e = e.replace(n[0], o),
                                    this.regexp.lastIndex = 0
                            }
                            return e
                        }
                    }]),
                        e
                }();
                function Z(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            }
                        ))),
                            n.push.apply(n, o)
                    }
                    return n
                }
                function ee(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? Z(Object(n), !0).forEach((function(t) {
                                p(e, t, n[t])
                            }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Z(Object(n)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                            }
                        ))
                    }
                    return e
                }
                var te = function() {
                    function e() {
                        var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        t(this, e),
                            this.logger = m.create("formatter"),
                            this.options = n,
                            this.formats = {
                                number: function(e, t, n) {
                                    return new Intl.NumberFormat(t,n).format(e)
                                },
                                currency: function(e, t, n) {
                                    return new Intl.NumberFormat(t,ee(ee({}, n), {}, {
                                        style: "currency"
                                    })).format(e)
                                },
                                datetime: function(e, t, n) {
                                    return new Intl.DateTimeFormat(t,ee({}, n)).format(e)
                                },
                                relativetime: function(e, t, n) {
                                    return new Intl.RelativeTimeFormat(t,ee({}, n)).format(e, n.range || "day")
                                },
                                list: function(e, t, n) {
                                    return new Intl.ListFormat(t,ee({}, n)).format(e)
                                }
                            },
                            this.init(n)
                    }
                    return a(e, [{
                        key: "init",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                interpolation: {}
                            }
                                , n = t.interpolation;
                            this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ","
                        }
                    }, {
                        key: "add",
                        value: function(e, t) {
                            this.formats[e.toLowerCase().trim()] = t
                        }
                    }, {
                        key: "format",
                        value: function(e, t, n, o) {
                            var r = this;
                            return t.split(this.formatSeparator).reduce((function(e, t) {
                                    var i = function(e) {
                                        var t = e.toLowerCase().trim()
                                            , n = {};
                                        if (e.indexOf("(") > -1) {
                                            var o = e.split("(");
                                            t = o[0].toLowerCase().trim();
                                            var r = o[1].substring(0, o[1].length - 1);
                                            "currency" === t && r.indexOf(":") < 0 ? n.currency || (n.currency = r.trim()) : "relativetime" === t && r.indexOf(":") < 0 ? n.range || (n.range = r.trim()) : r.split(";").forEach((function(e) {
                                                    if (e) {
                                                        var t = function(e) {
                                                            return function(e) {
                                                                if (Array.isArray(e))
                                                                    return e
                                                            }(e) || function(e) {
                                                                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                                                                    return Array.from(e)
                                                            }(e) || function(e, t) {
                                                                if (e) {
                                                                    if ("string" == typeof e)
                                                                        return h(e, t);
                                                                    var n = Object.prototype.toString.call(e).slice(8, -1);
                                                                    return "Object" === n && e.constructor && (n = e.constructor.name),
                                                                        "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? h(e, t) : void 0
                                                                }
                                                            }(e) || function() {
                                                                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                                                            }()
                                                        }(e.split(":"))
                                                            , o = t[0]
                                                            , r = t.slice(1).join(":").trim().replace(/^'+|'+$/g, "");
                                                        n[o.trim()] || (n[o.trim()] = r),
                                                        "false" === r && (n[o.trim()] = !1),
                                                        "true" === r && (n[o.trim()] = !0),
                                                        isNaN(r) || (n[o.trim()] = parseInt(r, 10))
                                                    }
                                                }
                                            ))
                                        }
                                        return {
                                            formatName: t,
                                            formatOptions: n
                                        }
                                    }(t)
                                        , a = i.formatName
                                        , s = i.formatOptions;
                                    if (r.formats[a]) {
                                        var u = e;
                                        try {
                                            var c = o && o.formatParams && o.formatParams[o.interpolationkey] || {}
                                                , l = c.locale || c.lng || o.locale || o.lng || n;
                                            u = r.formats[a](e, l, ee(ee(ee({}, s), o), c))
                                        } catch (e) {
                                            r.logger.warn(e)
                                        }
                                        return u
                                    }
                                    return r.logger.warn("there was no format function for ".concat(a)),
                                        e
                                }
                            ), e)
                        }
                    }]),
                        e
                }();
                function ne(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            }
                        ))),
                            n.push.apply(n, o)
                    }
                    return n
                }
                function oe(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? ne(Object(n), !0).forEach((function(t) {
                                p(e, t, n[t])
                            }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ne(Object(n)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                            }
                        ))
                    }
                    return e
                }
                var re = function(e) {
                    c(i, e);
                    var n, o, r = (n = i,
                            o = function() {
                                if ("undefined" == typeof Reflect || !Reflect.construct)
                                    return !1;
                                if (Reflect.construct.sham)
                                    return !1;
                                if ("function" == typeof Proxy)
                                    return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                                    ))),
                                        !0
                                } catch (e) {
                                    return !1
                                }
                            }(),
                            function() {
                                var e, t = f(n);
                                if (o) {
                                    var r = f(this).constructor;
                                    e = Reflect.construct(t, arguments, r)
                                } else
                                    e = t.apply(this, arguments);
                                return l(this, e)
                            }
                    );
                    function i(e, n, o) {
                        var a, u = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                        return t(this, i),
                            a = r.call(this),
                        N && b.call(s(a)),
                            a.backend = e,
                            a.store = n,
                            a.services = o,
                            a.languageUtils = o.languageUtils,
                            a.options = u,
                            a.logger = m.create("backendConnector"),
                            a.waitingReads = [],
                            a.maxParallelReads = u.maxParallelReads || 10,
                            a.readingCalls = 0,
                            a.maxRetries = u.maxRetries >= 0 ? u.maxRetries : 5,
                            a.retryTimeout = u.retryTimeout >= 1 ? u.retryTimeout : 350,
                            a.state = {},
                            a.queue = [],
                        a.backend && a.backend.init && a.backend.init(o, u.backend, u),
                            a
                    }
                    return a(i, [{
                        key: "queueLoad",
                        value: function(e, t, n, o) {
                            var r = this
                                , i = {}
                                , a = {}
                                , s = {}
                                , u = {};
                            return e.forEach((function(e) {
                                    var o = !0;
                                    t.forEach((function(t) {
                                            var s = "".concat(e, "|").concat(t);
                                            !n.reload && r.store.hasResourceBundle(e, t) ? r.state[s] = 2 : r.state[s] < 0 || (1 === r.state[s] ? void 0 === a[s] && (a[s] = !0) : (r.state[s] = 1,
                                                o = !1,
                                            void 0 === a[s] && (a[s] = !0),
                                            void 0 === i[s] && (i[s] = !0),
                                            void 0 === u[t] && (u[t] = !0)))
                                        }
                                    )),
                                    o || (s[e] = !0)
                                }
                            )),
                            (Object.keys(i).length || Object.keys(a).length) && this.queue.push({
                                pending: a,
                                pendingCount: Object.keys(a).length,
                                loaded: {},
                                errors: [],
                                callback: o
                            }),
                                {
                                    toLoad: Object.keys(i),
                                    pending: Object.keys(a),
                                    toLoadLanguages: Object.keys(s),
                                    toLoadNamespaces: Object.keys(u)
                                }
                        }
                    }, {
                        key: "loaded",
                        value: function(e, t, n) {
                            var o = e.split("|")
                                , r = o[0]
                                , i = o[1];
                            t && this.emit("failedLoading", r, i, t),
                            n && this.store.addResourceBundle(r, i, n),
                                this.state[e] = t ? -1 : 2;
                            var a = {};
                            this.queue.forEach((function(n) {
                                    !function(e, t, n, o) {
                                        var r = x(e, t, Object)
                                            , i = r.obj
                                            , a = r.k;
                                        i[a] = i[a] || [],
                                            i[a].push(n)
                                    }(n.loaded, [r], i),
                                        function(e, t) {
                                            void 0 !== e.pending[t] && (delete e.pending[t],
                                                e.pendingCount--)
                                        }(n, e),
                                    t && n.errors.push(t),
                                    0 !== n.pendingCount || n.done || (Object.keys(n.loaded).forEach((function(e) {
                                            a[e] || (a[e] = {});
                                            var t = n.loaded[e];
                                            t.length && t.forEach((function(t) {
                                                    void 0 === a[e][t] && (a[e][t] = !0)
                                                }
                                            ))
                                        }
                                    )),
                                        n.done = !0,
                                        n.errors.length ? n.callback(n.errors) : n.callback())
                                }
                            )),
                                this.emit("loaded", a),
                                this.queue = this.queue.filter((function(e) {
                                        return !e.done
                                    }
                                ))
                        }
                    }, {
                        key: "read",
                        value: function(e, t, n) {
                            var o = this
                                , r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0
                                , i = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : this.retryTimeout
                                , a = arguments.length > 5 ? arguments[5] : void 0;
                            return e.length ? this.readingCalls >= this.maxParallelReads ? void this.waitingReads.push({
                                lng: e,
                                ns: t,
                                fcName: n,
                                tried: r,
                                wait: i,
                                callback: a
                            }) : (this.readingCalls++,
                                this.backend[n](e, t, (function(s, u) {
                                        if (o.readingCalls--,
                                        o.waitingReads.length > 0) {
                                            var c = o.waitingReads.shift();
                                            o.read(c.lng, c.ns, c.fcName, c.tried, c.wait, c.callback)
                                        }
                                        s && u && r < o.maxRetries ? setTimeout((function() {
                                                o.read.call(o, e, t, n, r + 1, 2 * i, a)
                                            }
                                        ), i) : a(s, u)
                                    }
                                ))) : a(null, {})
                        }
                    }, {
                        key: "prepareLoading",
                        value: function(e, t) {
                            var n = this
                                , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
                                , r = arguments.length > 3 ? arguments[3] : void 0;
                            if (!this.backend)
                                return this.logger.warn("No backend was added via i18next.use. Will not load resources."),
                                r && r();
                            "string" == typeof e && (e = this.languageUtils.toResolveHierarchy(e)),
                            "string" == typeof t && (t = [t]);
                            var i = this.queueLoad(e, t, o, r);
                            if (!i.toLoad.length)
                                return i.pending.length || r(),
                                    null;
                            i.toLoad.forEach((function(e) {
                                    n.loadOne(e)
                                }
                            ))
                        }
                    }, {
                        key: "load",
                        value: function(e, t, n) {
                            this.prepareLoading(e, t, {}, n)
                        }
                    }, {
                        key: "reload",
                        value: function(e, t, n) {
                            this.prepareLoading(e, t, {
                                reload: !0
                            }, n)
                        }
                    }, {
                        key: "loadOne",
                        value: function(e) {
                            var t = this
                                , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ""
                                , o = e.split("|")
                                , r = o[0]
                                , i = o[1];
                            this.read(r, i, "read", void 0, void 0, (function(o, a) {
                                    o && t.logger.warn("".concat(n, "loading namespace ").concat(i, " for language ").concat(r, " failed"), o),
                                    !o && a && t.logger.log("".concat(n, "loaded namespace ").concat(i, " for language ").concat(r), a),
                                        t.loaded(e, o, a)
                                }
                            ))
                        }
                    }, {
                        key: "saveMissing",
                        value: function(e, t, n, o, r) {
                            var i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {};
                            this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(t) ? this.logger.warn('did not save key "'.concat(n, '" as the namespace "').concat(t, '" was not yet loaded'), "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!") : null != n && "" !== n && (this.backend && this.backend.create && this.backend.create(e, t, n, o, null, oe(oe({}, i), {}, {
                                isUpdate: r
                            })),
                            e && e[0] && this.store.addResource(e[0], t, n, o))
                        }
                    }]),
                        i
                }(b);
                function ie() {
                    return {
                        debug: !1,
                        initImmediate: !0,
                        ns: ["translation"],
                        defaultNS: ["translation"],
                        fallbackLng: ["dev"],
                        fallbackNS: !1,
                        supportedLngs: !1,
                        nonExplicitSupportedLngs: !1,
                        load: "all",
                        preload: !1,
                        simplifyPluralSuffix: !0,
                        keySeparator: ".",
                        nsSeparator: ":",
                        pluralSeparator: "_",
                        contextSeparator: "_",
                        partialBundledLanguages: !1,
                        saveMissing: !1,
                        updateMissing: !1,
                        saveMissingTo: "fallback",
                        saveMissingPlurals: !0,
                        missingKeyHandler: !1,
                        missingInterpolationHandler: !1,
                        postProcess: !1,
                        postProcessPassResolved: !1,
                        returnNull: !0,
                        returnEmptyString: !0,
                        returnObjects: !1,
                        joinArrays: !1,
                        returnedObjectHandler: !1,
                        parseMissingKeyHandler: !1,
                        appendNamespaceToMissingKey: !1,
                        appendNamespaceToCIMode: !1,
                        overloadTranslationOptionHandler: function(t) {
                            var n = {};
                            if ("object" === e(t[1]) && (n = t[1]),
                            "string" == typeof t[1] && (n.defaultValue = t[1]),
                            "string" == typeof t[2] && (n.tDescription = t[2]),
                            "object" === e(t[2]) || "object" === e(t[3])) {
                                var o = t[3] || t[2];
                                Object.keys(o).forEach((function(e) {
                                        n[e] = o[e]
                                    }
                                ))
                            }
                            return n
                        },
                        interpolation: {
                            escapeValue: !0,
                            format: function(e, t, n, o) {
                                return e
                            },
                            prefix: "{{",
                            suffix: "}}",
                            formatSeparator: ",",
                            unescapePrefix: "-",
                            nestingPrefix: "$t(",
                            nestingSuffix: ")",
                            nestingOptionsSeparator: ",",
                            maxReplaces: 1e3,
                            skipOnVariables: !0
                        }
                    }
                }
                function ae(e) {
                    return "string" == typeof e.ns && (e.ns = [e.ns]),
                    "string" == typeof e.fallbackLng && (e.fallbackLng = [e.fallbackLng]),
                    "string" == typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]),
                    e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])),
                        e
                }
                function se(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var o = Object.getOwnPropertySymbols(e);
                        t && (o = o.filter((function(t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable
                            }
                        ))),
                            n.push.apply(n, o)
                    }
                    return n
                }
                function ue(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2 ? se(Object(n), !0).forEach((function(t) {
                                p(e, t, n[t])
                            }
                        )) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : se(Object(n)).forEach((function(t) {
                                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                            }
                        ))
                    }
                    return e
                }
                function ce() {}
                function le(e) {
                    Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((function(t) {
                            "function" == typeof e[t] && (e[t] = e[t].bind(e))
                        }
                    ))
                }
                var fe = function(n) {
                    c(u, n);
                    var o, r, i = (o = u,
                            r = function() {
                                if ("undefined" == typeof Reflect || !Reflect.construct)
                                    return !1;
                                if (Reflect.construct.sham)
                                    return !1;
                                if ("function" == typeof Proxy)
                                    return !0;
                                try {
                                    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], (function() {}
                                    ))),
                                        !0
                                } catch (e) {
                                    return !1
                                }
                            }(),
                            function() {
                                var e, t = f(o);
                                if (r) {
                                    var n = f(this).constructor;
                                    e = Reflect.construct(t, arguments, n)
                                } else
                                    e = t.apply(this, arguments);
                                return l(this, e)
                            }
                    );
                    function u() {
                        var e, n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, o = arguments.length > 1 ? arguments[1] : void 0;
                        if (t(this, u),
                            e = i.call(this),
                        N && b.call(s(e)),
                            e.options = ae(n),
                            e.services = {},
                            e.logger = m,
                            e.modules = {
                                external: []
                            },
                            le(s(e)),
                        o && !e.isInitialized && !n.isClone) {
                            if (!e.options.initImmediate)
                                return e.init(n, o),
                                    l(e, s(e));
                            setTimeout((function() {
                                    e.init(n, o)
                                }
                            ), 0)
                        }
                        return e
                    }
                    return a(u, [{
                        key: "init",
                        value: function() {
                            var e = this
                                , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                                , n = arguments.length > 1 ? arguments[1] : void 0;
                            "function" == typeof t && (n = t,
                                t = {}),
                            !t.defaultNS && !1 !== t.defaultNS && t.ns && ("string" == typeof t.ns ? t.defaultNS = t.ns : t.ns.indexOf("translation") < 0 && (t.defaultNS = t.ns[0]));
                            var o = ie();
                            function r(e) {
                                return e ? "function" == typeof e ? new e : e : null
                            }
                            if (this.options = ue(ue(ue({}, o), this.options), ae(t)),
                            "v1" !== this.options.compatibilityAPI && (this.options.interpolation = ue(ue({}, o.interpolation), this.options.interpolation)),
                            void 0 !== t.keySeparator && (this.options.userDefinedKeySeparator = t.keySeparator),
                            void 0 !== t.nsSeparator && (this.options.userDefinedNsSeparator = t.nsSeparator),
                                !this.options.isClone) {
                                var i;
                                this.modules.logger ? m.init(r(this.modules.logger), this.options) : m.init(null, this.options),
                                    this.modules.formatter ? i = this.modules.formatter : "undefined" != typeof Intl && (i = te);
                                var a = new V(this.options);
                                this.store = new F(this.options.resources,this.options);
                                var s = this.services;
                                s.logger = m,
                                    s.resourceStore = this.store,
                                    s.languageUtils = a,
                                    s.pluralResolver = new G(a,{
                                        prepend: this.options.pluralSeparator,
                                        compatibilityJSON: this.options.compatibilityJSON,
                                        simplifyPluralSuffix: this.options.simplifyPluralSuffix
                                    }),
                                !i || this.options.interpolation.format && this.options.interpolation.format !== o.interpolation.format || (s.formatter = r(i),
                                    s.formatter.init(s, this.options),
                                    this.options.interpolation.format = s.formatter.format.bind(s.formatter)),
                                    s.interpolator = new Q(this.options),
                                    s.utils = {
                                        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
                                    },
                                    s.backendConnector = new re(r(this.modules.backend),s.resourceStore,s,this.options),
                                    s.backendConnector.on("*", (function(t) {
                                            for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
                                                o[r - 1] = arguments[r];
                                            e.emit.apply(e, [t].concat(o))
                                        }
                                    )),
                                this.modules.languageDetector && (s.languageDetector = r(this.modules.languageDetector),
                                    s.languageDetector.init(s, this.options.detection, this.options)),
                                this.modules.i18nFormat && (s.i18nFormat = r(this.modules.i18nFormat),
                                s.i18nFormat.init && s.i18nFormat.init(this)),
                                    this.translator = new H(this.services,this.options),
                                    this.translator.on("*", (function(t) {
                                            for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), r = 1; r < n; r++)
                                                o[r - 1] = arguments[r];
                                            e.emit.apply(e, [t].concat(o))
                                        }
                                    )),
                                    this.modules.external.forEach((function(t) {
                                            t.init && t.init(e)
                                        }
                                    ))
                            }
                            if (this.format = this.options.interpolation.format,
                            n || (n = ce),
                            this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
                                var u = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                                u.length > 0 && "dev" !== u[0] && (this.options.lng = u[0])
                            }
                            this.services.languageDetector || this.options.lng || this.logger.warn("init: no languageDetector is used and no lng is defined");
                            var c = ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
                            c.forEach((function(t) {
                                    e[t] = function() {
                                        var n;
                                        return (n = e.store)[t].apply(n, arguments)
                                    }
                                }
                            ));
                            var l = ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"];
                            l.forEach((function(t) {
                                    e[t] = function() {
                                        var n;
                                        return (n = e.store)[t].apply(n, arguments),
                                            e
                                    }
                                }
                            ));
                            var f = w()
                                , p = function() {
                                var t = function(t, o) {
                                    e.isInitialized && !e.initializedStoreOnce && e.logger.warn("init: i18next is already initialized. You should call init just once!"),
                                        e.isInitialized = !0,
                                    e.options.isClone || e.logger.log("initialized", e.options),
                                        e.emit("initialized", e.options),
                                        f.resolve(o),
                                        n(t, o)
                                };
                                if (e.languages && "v1" !== e.options.compatibilityAPI && !e.isInitialized)
                                    return t(null, e.t.bind(e));
                                e.changeLanguage(e.options.lng, t)
                            };
                            return this.options.resources || !this.options.initImmediate ? p() : setTimeout(p, 0),
                                f
                        }
                    }, {
                        key: "loadResources",
                        value: function(e) {
                            var t = this
                                , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ce
                                , o = n
                                , r = "string" == typeof e ? e : this.language;
                            if ("function" == typeof e && (o = e),
                            !this.options.resources || this.options.partialBundledLanguages) {
                                if (r && "cimode" === r.toLowerCase())
                                    return o();
                                var i = []
                                    , a = function(e) {
                                    e && t.services.languageUtils.toResolveHierarchy(e).forEach((function(e) {
                                            i.indexOf(e) < 0 && i.push(e)
                                        }
                                    ))
                                };
                                if (r)
                                    a(r);
                                else {
                                    var s = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
                                    s.forEach((function(e) {
                                            return a(e)
                                        }
                                    ))
                                }
                                this.options.preload && this.options.preload.forEach((function(e) {
                                        return a(e)
                                    }
                                )),
                                    this.services.backendConnector.load(i, this.options.ns, (function(e) {
                                            e || t.resolvedLanguage || !t.language || t.setResolvedLanguage(t.language),
                                                o(e)
                                        }
                                    ))
                            } else
                                o(null)
                        }
                    }, {
                        key: "reloadResources",
                        value: function(e, t, n) {
                            var o = w();
                            return e || (e = this.languages),
                            t || (t = this.options.ns),
                            n || (n = ce),
                                this.services.backendConnector.reload(e, t, (function(e) {
                                        o.resolve(),
                                            n(e)
                                    }
                                )),
                                o
                        }
                    }, {
                        key: "use",
                        value: function(e) {
                            if (!e)
                                throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
                            if (!e.type)
                                throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
                            return "backend" === e.type && (this.modules.backend = e),
                            ("logger" === e.type || e.log && e.warn && e.error) && (this.modules.logger = e),
                            "languageDetector" === e.type && (this.modules.languageDetector = e),
                            "i18nFormat" === e.type && (this.modules.i18nFormat = e),
                            "postProcessor" === e.type && U.addPostProcessor(e),
                            "formatter" === e.type && (this.modules.formatter = e),
                            "3rdParty" === e.type && this.modules.external.push(e),
                                this
                        }
                    }, {
                        key: "setResolvedLanguage",
                        value: function(e) {
                            if (e && this.languages && !(["cimode", "dev"].indexOf(e) > -1))
                                for (var t = 0; t < this.languages.length; t++) {
                                    var n = this.languages[t];
                                    if (!(["cimode", "dev"].indexOf(n) > -1) && this.store.hasLanguageSomeTranslations(n)) {
                                        this.resolvedLanguage = n;
                                        break
                                    }
                                }
                        }
                    }, {
                        key: "changeLanguage",
                        value: function(e, t) {
                            var n = this;
                            this.isLanguageChangingTo = e;
                            var o = w();
                            this.emit("languageChanging", e);
                            var r = function(e) {
                                n.language = e,
                                    n.languages = n.services.languageUtils.toResolveHierarchy(e),
                                    n.resolvedLanguage = void 0,
                                    n.setResolvedLanguage(e)
                            }
                                , i = function(i) {
                                e || i || !n.services.languageDetector || (i = []);
                                var a = "string" == typeof i ? i : n.services.languageUtils.getBestMatchFromCodes(i);
                                a && (n.language || r(a),
                                n.translator.language || n.translator.changeLanguage(a),
                                n.services.languageDetector && n.services.languageDetector.cacheUserLanguage(a)),
                                    n.loadResources(a, (function(e) {
                                            !function(e, i) {
                                                i ? (r(i),
                                                    n.translator.changeLanguage(i),
                                                    n.isLanguageChangingTo = void 0,
                                                    n.emit("languageChanged", i),
                                                    n.logger.log("languageChanged", i)) : n.isLanguageChangingTo = void 0,
                                                    o.resolve((function() {
                                                            return n.t.apply(n, arguments)
                                                        }
                                                    )),
                                                t && t(e, (function() {
                                                        return n.t.apply(n, arguments)
                                                    }
                                                ))
                                            }(e, a)
                                        }
                                    ))
                            };
                            return e || !this.services.languageDetector || this.services.languageDetector.async ? !e && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect(i) : i(e) : i(this.services.languageDetector.detect()),
                                o
                        }
                    }, {
                        key: "getFixedT",
                        value: function(t, n, o) {
                            var r = this
                                , i = function t(n, i) {
                                var a;
                                if ("object" !== e(i)) {
                                    for (var s = arguments.length, u = new Array(s > 2 ? s - 2 : 0), c = 2; c < s; c++)
                                        u[c - 2] = arguments[c];
                                    a = r.options.overloadTranslationOptionHandler([n, i].concat(u))
                                } else
                                    a = ue({}, i);
                                a.lng = a.lng || t.lng,
                                    a.lngs = a.lngs || t.lngs,
                                    a.ns = a.ns || t.ns,
                                    a.keyPrefix = a.keyPrefix || o || t.keyPrefix;
                                var l = r.options.keySeparator || "."
                                    , f = a.keyPrefix ? "".concat(a.keyPrefix).concat(l).concat(n) : n;
                                return r.t(f, a)
                            };
                            return "string" == typeof t ? i.lng = t : i.lngs = t,
                                i.ns = n,
                                i.keyPrefix = o,
                                i
                        }
                    }, {
                        key: "t",
                        value: function() {
                            var e;
                            return this.translator && (e = this.translator).translate.apply(e, arguments)
                        }
                    }, {
                        key: "exists",
                        value: function() {
                            var e;
                            return this.translator && (e = this.translator).exists.apply(e, arguments)
                        }
                    }, {
                        key: "setDefaultNamespace",
                        value: function(e) {
                            this.options.defaultNS = e
                        }
                    }, {
                        key: "hasLoadedNamespace",
                        value: function(e) {
                            var t = this
                                , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                            if (!this.isInitialized)
                                return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages),
                                    !1;
                            if (!this.languages || !this.languages.length)
                                return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages),
                                    !1;
                            var o = this.resolvedLanguage || this.languages[0]
                                , r = !!this.options && this.options.fallbackLng
                                , i = this.languages[this.languages.length - 1];
                            if ("cimode" === o.toLowerCase())
                                return !0;
                            var a = function(e, n) {
                                var o = t.services.backendConnector.state["".concat(e, "|").concat(n)];
                                return -1 === o || 2 === o
                            };
                            if (n.precheck) {
                                var s = n.precheck(this, a);
                                if (void 0 !== s)
                                    return s
                            }
                            return !(!this.hasResourceBundle(o, e) && this.services.backendConnector.backend && (!this.options.resources || this.options.partialBundledLanguages) && (!a(o, e) || r && !a(i, e)))
                        }
                    }, {
                        key: "loadNamespaces",
                        value: function(e, t) {
                            var n = this
                                , o = w();
                            return this.options.ns ? ("string" == typeof e && (e = [e]),
                                e.forEach((function(e) {
                                        n.options.ns.indexOf(e) < 0 && n.options.ns.push(e)
                                    }
                                )),
                                this.loadResources((function(e) {
                                        o.resolve(),
                                        t && t(e)
                                    }
                                )),
                                o) : (t && t(),
                                Promise.resolve())
                        }
                    }, {
                        key: "loadLanguages",
                        value: function(e, t) {
                            var n = w();
                            "string" == typeof e && (e = [e]);
                            var o = this.options.preload || []
                                , r = e.filter((function(e) {
                                    return o.indexOf(e) < 0
                                }
                            ));
                            return r.length ? (this.options.preload = o.concat(r),
                                this.loadResources((function(e) {
                                        n.resolve(),
                                        t && t(e)
                                    }
                                )),
                                n) : (t && t(),
                                Promise.resolve())
                        }
                    }, {
                        key: "dir",
                        value: function(e) {
                            return e || (e = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)),
                                e ? ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"].indexOf(this.services.languageUtils.getLanguagePartFromCode(e)) > -1 || e.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr" : "rtl"
                        }
                    }, {
                        key: "cloneInstance",
                        value: function() {
                            var e = this
                                , t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                                , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ce
                                , o = ue(ue(ue({}, this.options), t), {
                                isClone: !0
                            })
                                , r = new u(o);
                            void 0 === t.debug && void 0 === t.prefix || (r.logger = r.logger.clone(t));
                            var i = ["store", "services", "language"];
                            return i.forEach((function(t) {
                                    r[t] = e[t]
                                }
                            )),
                                r.services = ue({}, this.services),
                                r.services.utils = {
                                    hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
                                },
                                r.translator = new H(r.services,r.options),
                                r.translator.on("*", (function(e) {
                                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
                                            n[o - 1] = arguments[o];
                                        r.emit.apply(r, [e].concat(n))
                                    }
                                )),
                                r.init(o, n),
                                r.translator.options = r.options,
                                r.translator.backendConnector.services.utils = {
                                    hasLoadedNamespace: r.hasLoadedNamespace.bind(r)
                                },
                                r
                        }
                    }, {
                        key: "toJSON",
                        value: function() {
                            return {
                                options: this.options,
                                store: this.store,
                                language: this.language,
                                languages: this.languages,
                                resolvedLanguage: this.resolvedLanguage
                            }
                        }
                    }]),
                        u
                }(b);
                p(fe, "createInstance", (function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                            , t = arguments.length > 1 ? arguments[1] : void 0;
                        return new fe(e,t)
                    }
                ));
                var pe = fe.createInstance();
                pe.createInstance = fe.createInstance,
                    pe.createInstance,
                    pe.init,
                    pe.loadResources,
                    pe.reloadResources,
                    pe.use,
                    pe.changeLanguage,
                    pe.getFixedT,
                    pe.t,
                    pe.exists,
                    pe.setDefaultNamespace,
                    pe.hasLoadedNamespace,
                    pe.loadNamespaces,
                    pe.loadLanguages;
                var he = pe;
                function de(e) {
                    return de = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        }
                        : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }
                        ,
                        de(e)
                }
                var ge = []
                    , ye = ge.forEach
                    , ve = ge.slice;
                function me(e) {
                    return ye.call(ve.call(arguments, 1), (function(t) {
                            if (t)
                                for (var n in t)
                                    void 0 === e[n] && (e[n] = t[n])
                        }
                    )),
                        e
                }
                function be() {
                    return "function" == typeof XMLHttpRequest || "object" === ("undefined" == typeof XMLHttpRequest ? "undefined" : de(XMLHttpRequest))
                }
                var we, Oe, ke, xe = r(3154), Se = r.t(xe, 2);
                function je(e) {
                    return je = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                            return typeof e
                        }
                        : function(e) {
                            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                        }
                        ,
                        je(e)
                }
                "function" == typeof fetch && (we = "undefined" != typeof global && global.fetch ? global.fetch : "undefined" != typeof window && window.fetch ? window.fetch : fetch),
                be() && ("undefined" != typeof global && global.XMLHttpRequest ? Oe = global.XMLHttpRequest : "undefined" != typeof window && window.XMLHttpRequest && (Oe = window.XMLHttpRequest)),
                "function" == typeof ActiveXObject && ("undefined" != typeof global && global.ActiveXObject ? ke = global.ActiveXObject : "undefined" != typeof window && window.ActiveXObject && (ke = window.ActiveXObject)),
                we || !Se || Oe || ke || (we = xe || Se),
                "function" != typeof we && (we = void 0);
                var Pe = function(e, t) {
                    if (t && "object" === je(t)) {
                        var n = "";
                        for (var o in t)
                            n += "&" + encodeURIComponent(o) + "=" + encodeURIComponent(t[o]);
                        if (!n)
                            return e;
                        e = e + (-1 !== e.indexOf("?") ? "&" : "?") + n.slice(1)
                    }
                    return e
                }
                    , Le = function(e, t, n) {
                    we(e, t).then((function(e) {
                            if (!e.ok)
                                return n(e.statusText || "Error", {
                                    status: e.status
                                });
                            e.text().then((function(t) {
                                    n(null, {
                                        status: e.status,
                                        data: t
                                    })
                                }
                            )).catch(n)
                        }
                    )).catch(n)
                }
                    , Re = !1
                    , Ee = function(e, t, n, o) {
                    return "function" == typeof n && (o = n,
                        n = void 0),
                        o = o || function() {}
                        ,
                        we ? function(e, t, n, o) {
                            e.queryStringParams && (t = Pe(t, e.queryStringParams));
                            var r = me({}, "function" == typeof e.customHeaders ? e.customHeaders() : e.customHeaders);
                            n && (r["Content-Type"] = "application/json");
                            var i = "function" == typeof e.requestOptions ? e.requestOptions(n) : e.requestOptions
                                , a = me({
                                method: n ? "POST" : "GET",
                                body: n ? e.stringify(n) : void 0,
                                headers: r
                            }, Re ? {} : i);
                            try {
                                Le(t, a, o)
                            } catch (e) {
                                if (!i || 0 === Object.keys(i).length || !e.message || e.message.indexOf("not implemented") < 0)
                                    return o(e);
                                try {
                                    Object.keys(i).forEach((function(e) {
                                            delete a[e]
                                        }
                                    )),
                                        Le(t, a, o),
                                        Re = !0
                                } catch (e) {
                                    o(e)
                                }
                            }
                        }(e, t, n, o) : be() || "function" == typeof ActiveXObject ? function(e, t, n, o) {
                            n && "object" === je(n) && (n = Pe("", n).slice(1)),
                            e.queryStringParams && (t = Pe(t, e.queryStringParams));
                            try {
                                var r;
                                (r = Oe ? new Oe : new ke("MSXML2.XMLHTTP.3.0")).open(n ? "POST" : "GET", t, 1),
                                e.crossDomain || r.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                                    r.withCredentials = !!e.withCredentials,
                                n && r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                                r.overrideMimeType && r.overrideMimeType("application/json");
                                var i = e.customHeaders;
                                if (i = "function" == typeof i ? i() : i)
                                    for (var a in i)
                                        r.setRequestHeader(a, i[a]);
                                r.onreadystatechange = function() {
                                    r.readyState > 3 && o(r.status >= 400 ? r.statusText : null, {
                                        status: r.status,
                                        data: r.responseText
                                    })
                                }
                                    ,
                                    r.send(n)
                            } catch (e) {
                                console && console.log(e)
                            }
                        }(e, t, n, o) : void o(new Error("No fetch and no xhr implementation found!"))
                };
                function Ce(e, t) {
                    if (!(e instanceof t))
                        throw new TypeError("Cannot call a class as a function")
                }
                function Ne(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var o = t[n];
                        o.enumerable = o.enumerable || !1,
                            o.configurable = !0,
                        "value"in o && (o.writable = !0),
                            Object.defineProperty(e, o.key, o)
                    }
                }
                var Te = function() {
                    return {
                        loadPath: "/locales/{{lng}}/{{ns}}.json",
                        addPath: "/locales/add/{{lng}}/{{ns}}",
                        allowMultiLoading: !1,
                        parse: function(e) {
                            return JSON.parse(e)
                        },
                        stringify: JSON.stringify,
                        parsePayload: function(e, t, n) {
                            return function(e, t, n) {
                                return t in e ? Object.defineProperty(e, t, {
                                    value: n,
                                    enumerable: !0,
                                    configurable: !0,
                                    writable: !0
                                }) : e[t] = n,
                                    e
                            }({}, t, n || "")
                        },
                        request: Ee,
                        reloadInterval: "undefined" == typeof window && 36e5,
                        customHeaders: {},
                        queryStringParams: {},
                        crossDomain: !1,
                        withCredentials: !1,
                        overrideMimeType: !1,
                        requestOptions: {
                            mode: "cors",
                            credentials: "same-origin",
                            cache: "default"
                        }
                    }
                }
                    , De = function() {
                    function e(t) {
                        var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                            , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                        Ce(this, e),
                            this.services = t,
                            this.options = n,
                            this.allOptions = o,
                            this.type = "backend",
                            this.init(t, n, o)
                    }
                    var t, n;
                    return t = e,
                        n = [{
                            key: "init",
                            value: function(e) {
                                var t = this
                                    , n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                                    , o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                                this.services = e,
                                    this.options = me(n, this.options || {}, Te()),
                                    this.allOptions = o,
                                this.services && this.options.reloadInterval && setInterval((function() {
                                        return t.reload()
                                    }
                                ), this.options.reloadInterval)
                            }
                        }, {
                            key: "readMulti",
                            value: function(e, t, n) {
                                this._readAny(e, e, t, t, n)
                            }
                        }, {
                            key: "read",
                            value: function(e, t, n) {
                                this._readAny([e], e, [t], t, n)
                            }
                        }, {
                            key: "_readAny",
                            value: function(e, t, n, o, r) {
                                var i, a = this, s = this.options.loadPath;
                                "function" == typeof this.options.loadPath && (s = this.options.loadPath(e, n)),
                                    (s = function(e) {
                                        return !!e && "function" == typeof e.then
                                    }(i = s) ? i : Promise.resolve(i)).then((function(i) {
                                            if (!i)
                                                return r(null, {});
                                            var s = a.services.interpolator.interpolate(i, {
                                                lng: e.join("+"),
                                                ns: n.join("+")
                                            });
                                            a.loadUrl(s, r, t, o)
                                        }
                                    ))
                            }
                        }, {
                            key: "loadUrl",
                            value: function(e, t, n, o) {
                                var r = this;
                                this.options.request(this.options, e, void 0, (function(i, a) {
                                        if (a && (a.status >= 500 && a.status < 600 || !a.status))
                                            return t("failed loading " + e + "; status code: " + a.status, !0);
                                        if (a && a.status >= 400 && a.status < 500)
                                            return t("failed loading " + e + "; status code: " + a.status, !1);
                                        if (!a && i && i.message && i.message.indexOf("Failed to fetch") > -1)
                                            return t("failed loading " + e + ": " + i.message, !0);
                                        if (i)
                                            return t(i, !1);
                                        var s, u;
                                        try {
                                            s = "string" == typeof a.data ? r.options.parse(a.data, n, o) : a.data
                                        } catch (t) {
                                            u = "failed parsing " + e + " to json"
                                        }
                                        if (u)
                                            return t(u, !1);
                                        t(null, s)
                                    }
                                ))
                            }
                        }, {
                            key: "create",
                            value: function(e, t, n, o, r) {
                                var i = this;
                                if (this.options.addPath) {
                                    "string" == typeof e && (e = [e]);
                                    var a = this.options.parsePayload(t, n, o)
                                        , s = 0
                                        , u = []
                                        , c = [];
                                    e.forEach((function(n) {
                                            var o = i.options.addPath;
                                            "function" == typeof i.options.addPath && (o = i.options.addPath(n, t));
                                            var l = i.services.interpolator.interpolate(o, {
                                                lng: n,
                                                ns: t
                                            });
                                            i.options.request(i.options, l, a, (function(t, n) {
                                                    s += 1,
                                                        u.push(t),
                                                        c.push(n),
                                                    s === e.length && r && r(u, c)
                                                }
                                            ))
                                        }
                                    ))
                                }
                            }
                        }, {
                            key: "reload",
                            value: function() {
                                var e = this
                                    , t = this.services
                                    , n = t.backendConnector
                                    , o = t.languageUtils
                                    , r = t.logger
                                    , i = n.language;
                                if (!i || "cimode" !== i.toLowerCase()) {
                                    var a = []
                                        , s = function(e) {
                                        o.toResolveHierarchy(e).forEach((function(e) {
                                                a.indexOf(e) < 0 && a.push(e)
                                            }
                                        ))
                                    };
                                    s(i),
                                    this.allOptions.preload && this.allOptions.preload.forEach((function(e) {
                                            return s(e)
                                        }
                                    )),
                                        a.forEach((function(t) {
                                                e.allOptions.ns.forEach((function(e) {
                                                        n.read(t, e, "read", null, null, (function(o, i) {
                                                                o && r.warn("loading namespace ".concat(e, " for language ").concat(t, " failed"), o),
                                                                !o && i && r.log("loaded namespace ".concat(e, " for language ").concat(t), i),
                                                                    n.loaded("".concat(t, "|").concat(e), o, i)
                                                            }
                                                        ))
                                                    }
                                                ))
                                            }
                                        ))
                                }
                            }
                        }],
                    n && Ne(t.prototype, n),
                        Object.defineProperty(t, "prototype", {
                            writable: !1
                        }),
                        e
                }();
                De.type = "backend";
                var Ae = De
                    , Ie = []
                    , Fe = Ie.forEach
                    , Ue = Ie.slice;
                function _e(e) {
                    return Fe.call(Ue.call(arguments, 1), (function(t) {
                            if (t)
                                for (var n in t)
                                    void 0 === e[n] && (e[n] = t[n])
                        }
                    )),
                        e
                }
                var Be = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/
                    , Me = function(e, t, n) {
                    var o = n || {};
                    o.path = o.path || "/";
                    var r = encodeURIComponent(t)
                        , i = "".concat(e, "=").concat(r);
                    if (o.maxAge > 0) {
                        var a = o.maxAge - 0;
                        if (Number.isNaN(a))
                            throw new Error("maxAge should be a Number");
                        i += "; Max-Age=".concat(Math.floor(a))
                    }
                    if (o.domain) {
                        if (!Be.test(o.domain))
                            throw new TypeError("option domain is invalid");
                        i += "; Domain=".concat(o.domain)
                    }
                    if (o.path) {
                        if (!Be.test(o.path))
                            throw new TypeError("option path is invalid");
                        i += "; Path=".concat(o.path)
                    }
                    if (o.expires) {
                        if ("function" != typeof o.expires.toUTCString)
                            throw new TypeError("option expires is invalid");
                        i += "; Expires=".concat(o.expires.toUTCString())
                    }
                    if (o.httpOnly && (i += "; HttpOnly"),
                    o.secure && (i += "; Secure"),
                        o.sameSite)
                        switch ("string" == typeof o.sameSite ? o.sameSite.toLowerCase() : o.sameSite) {
                            case !0:
                                i += "; SameSite=Strict";
                                break;
                            case "lax":
                                i += "; SameSite=Lax";
                                break;
                            case "strict":
                                i += "; SameSite=Strict";
                                break;
                            case "none":
                                i += "; SameSite=None";
                                break;
                            default:
                                throw new TypeError("option sameSite is invalid")
                        }
                    return i
                }
                    , He = {
                    name: "cookie",
                    lookup: function(e) {
                        var t;
                        if (e.lookupCookie && "undefined" != typeof document) {
                            var n = function(e) {
                                for (var t = "".concat(e, "="), n = document.cookie.split(";"), o = 0; o < n.length; o++) {
                                    for (var r = n[o]; " " === r.charAt(0); )
                                        r = r.substring(1, r.length);
                                    if (0 === r.indexOf(t))
                                        return r.substring(t.length, r.length)
                                }
                                return null
                            }(e.lookupCookie);
                            n && (t = n)
                        }
                        return t
                    },
                    cacheUserLanguage: function(e, t) {
                        t.lookupCookie && "undefined" != typeof document && function(e, t, n, o) {
                            var r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : {
                                path: "/",
                                sameSite: "strict"
                            };
                            n && (r.expires = new Date,
                                r.expires.setTime(r.expires.getTime() + 60 * n * 1e3)),
                            o && (r.domain = o),
                                document.cookie = Me(e, encodeURIComponent(t), r)
                        }(t.lookupCookie, e, t.cookieMinutes, t.cookieDomain, t.cookieOptions)
                    }
                }
                    , qe = {
                    name: "querystring",
                    lookup: function(e) {
                        var t;
                        if ("undefined" != typeof window) {
                            var n = window.location.search;
                            !window.location.search && window.location.hash && window.location.hash.indexOf("?") > -1 && (n = window.location.hash.substring(window.location.hash.indexOf("?")));
                            for (var o = n.substring(1).split("&"), r = 0; r < o.length; r++) {
                                var i = o[r].indexOf("=");
                                i > 0 && o[r].substring(0, i) === e.lookupQuerystring && (t = o[r].substring(i + 1))
                            }
                        }
                        return t
                    }
                }
                    , Ve = null
                    , Ke = function() {
                    if (null !== Ve)
                        return Ve;
                    try {
                        Ve = "undefined" !== window && null !== window.localStorage;
                        var e = "i18next.translate.boo";
                        window.localStorage.setItem(e, "foo"),
                            window.localStorage.removeItem(e)
                    } catch (e) {
                        Ve = !1
                    }
                    return Ve
                }
                    , ze = {
                    name: "localStorage",
                    lookup: function(e) {
                        var t;
                        if (e.lookupLocalStorage && Ke()) {
                            var n = window.localStorage.getItem(e.lookupLocalStorage);
                            n && (t = n)
                        }
                        return t
                    },
                    cacheUserLanguage: function(e, t) {
                        t.lookupLocalStorage && Ke() && window.localStorage.setItem(t.lookupLocalStorage, e)
                    }
                }
                    , Je = null
                    , Xe = function() {
                    if (null !== Je)
                        return Je;
                    try {
                        Je = "undefined" !== window && null !== window.sessionStorage;
                        var e = "i18next.translate.boo";
                        window.sessionStorage.setItem(e, "foo"),
                            window.sessionStorage.removeItem(e)
                    } catch (e) {
                        Je = !1
                    }
                    return Je
                }
                    , $e = {
                    name: "sessionStorage",
                    lookup: function(e) {
                        var t;
                        if (e.lookupSessionStorage && Xe()) {
                            var n = window.sessionStorage.getItem(e.lookupSessionStorage);
                            n && (t = n)
                        }
                        return t
                    },
                    cacheUserLanguage: function(e, t) {
                        t.lookupSessionStorage && Xe() && window.sessionStorage.setItem(t.lookupSessionStorage, e)
                    }
                }
                    , Ge = {
                    name: "navigator",
                    lookup: function(e) {
                        var t = [];
                        if ("undefined" != typeof navigator) {
                            if (navigator.languages)
                                for (var n = 0; n < navigator.languages.length; n++)
                                    t.push(navigator.languages[n]);
                            navigator.userLanguage && t.push(navigator.userLanguage),
                            navigator.language && t.push(navigator.language)
                        }
                        return t.length > 0 ? t : void 0
                    }
                }
                    , We = {
                    name: "htmlTag",
                    lookup: function(e) {
                        var t, n = e.htmlTag || ("undefined" != typeof document ? document.documentElement : null);
                        return n && "function" == typeof n.getAttribute && (t = n.getAttribute("lang")),
                            t
                    }
                }
                    , Ye = {
                    name: "path",
                    lookup: function(e) {
                        var t;
                        if ("undefined" != typeof window) {
                            var n = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
                            if (n instanceof Array)
                                if ("number" == typeof e.lookupFromPathIndex) {
                                    if ("string" != typeof n[e.lookupFromPathIndex])
                                        return;
                                    t = n[e.lookupFromPathIndex].replace("/", "")
                                } else
                                    t = n[0].replace("/", "")
                        }
                        return t
                    }
                }
                    , Qe = {
                    name: "subdomain",
                    lookup: function(e) {
                        var t = "number" == typeof e.lookupFromSubdomainIndex ? e.lookupFromSubdomainIndex + 1 : 1
                            , n = "undefined" != typeof window && window.location && window.location.hostname && window.location.hostname.match(/^(\w{2,5})\.(([a-z0-9-]{1,63}\.[a-z]{2,6})|localhost)/i);
                        if (n)
                            return n[t]
                    }
                }
                    , Ze = function() {
                    function e(n) {
                        var o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                        t(this, e),
                            this.type = "languageDetector",
                            this.detectors = {},
                            this.init(n, o)
                    }
                    return a(e, [{
                        key: "init",
                        value: function(e) {
                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
                                , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            this.services = e,
                                this.options = _e(t, this.options || {}, {
                                    order: ["querystring", "cookie", "localStorage", "sessionStorage", "navigator", "htmlTag"],
                                    lookupQuerystring: "lng",
                                    lookupCookie: "i18next",
                                    lookupLocalStorage: "i18nextLng",
                                    lookupSessionStorage: "i18nextLng",
                                    caches: ["localStorage"],
                                    excludeCacheFor: ["cimode"]
                                }),
                            this.options.lookupFromUrlIndex && (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
                                this.i18nOptions = n,
                                this.addDetector(He),
                                this.addDetector(qe),
                                this.addDetector(ze),
                                this.addDetector($e),
                                this.addDetector(Ge),
                                this.addDetector(We),
                                this.addDetector(Ye),
                                this.addDetector(Qe)
                        }
                    }, {
                        key: "addDetector",
                        value: function(e) {
                            this.detectors[e.name] = e
                        }
                    }, {
                        key: "detect",
                        value: function(e) {
                            var t = this;
                            e || (e = this.options.order);
                            var n = [];
                            return e.forEach((function(e) {
                                    if (t.detectors[e]) {
                                        var o = t.detectors[e].lookup(t.options);
                                        o && "string" == typeof o && (o = [o]),
                                        o && (n = n.concat(o))
                                    }
                                }
                            )),
                                this.services.languageUtils.getBestMatchFromCodes ? n : n.length > 0 ? n[0] : null
                        }
                    }, {
                        key: "cacheUserLanguage",
                        value: function(e, t) {
                            var n = this;
                            t || (t = this.options.caches),
                            t && (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(e) > -1 || t.forEach((function(t) {
                                    n.detectors[t] && n.detectors[t].cacheUserLanguage(e, n.options)
                                }
                            )))
                        }
                    }]),
                        e
                }();
                Ze.type = "languageDetector"
            }(),
                i
        }()
    }
));
