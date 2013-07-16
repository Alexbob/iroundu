(function (e, t, n) {
    function i(e) {
        return e
    }
    function s(e) {
        return decodeURIComponent(e.replace(r, " "))
    }
    var r = /\+/g;
    e.cookie = function (r, o, u) {
        if (o !== n && !/Object/.test(Object.prototype.toString.call(o))) {
            u = e.extend({}, e.cookie.defaults, u), o === null && (u.expires = -1);
            if (typeof u.expires == "number") {
                var a = u.expires,
                    f = u.expires = new Date;
                f.setDate(f.getDate() + a)
            }
            return o = String(o), t.cookie = [encodeURIComponent(r), "=", u.raw ? o : encodeURIComponent(o), u.expires ? "; expires=" + u.expires.toUTCString() : "", u.path ? "; path=" + u.path : "", u.domain ? "; domain=" + u.domain : "", u.secure ? "; secure" : ""].join("")
        }
        u = o || e.cookie.defaults || {};
        var l = u.raw ? i : s,
            c = t.cookie.split("; ");
        for (var h = 0, p; p = c[h] && c[h].split("="); h++) if (l(p.shift()) === r) return l(p.join("="));
        return null
    }, e.cookie.defaults = {}, e.removeCookie = function (t, n) {
        return e.cookie(t, n) !== null ? (e.cookie(t, null, n), !0) : !1
    }
})(jQuery, document),
function (e) {
    var t = "hidden",
        n = "border-box",
        r = "lineHeight",
        i = '<textarea tabindex="-1" style="position:absolute; top:-9999px; left:-9999px; right:auto; bottom:auto; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden;">',
        s = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"],
        o = "oninput",
        u = "onpropertychange",
        a = e(i)[0];
    a.setAttribute(o, "return"), e.isFunction(a[o]) || u in a ? (e(a).css(r, "99px"), e(a).css(r) === "99px" && s.push(r), e.fn.autosize = function (r) {
        return this.each(function () {
            function g() {
                var e, n;
                p || (p = !0, l.value = a.value, l.style.overflowY = a.style.overflowY, l.style.width = f.css("width"), l.scrollTop = 0, l.scrollTop = 9e4, e = l.scrollTop, n = t, e > h ? (e = h, n = "scroll") : e < c && (e = c), a.style.overflowY = n, a.style.height = e + m + "px", setTimeout(function () {
                    p = !1
                }, 1))
            }
            var a = this,
                f = e(a),
                l, c = f.height(),
                h = parseInt(f.css("maxHeight"), 10),
                p, d = s.length,
                v, m = 0;
            if (f.css("box-sizing") === n || f.css("-moz-box-sizing") === n || f.css("-webkit-box-sizing") === n) m = f.outerHeight() - f.height();
            if (f.data("mirror") || f.data("ismirror")) return;
            l = e(i).data("ismirror", !0).addClass(r || "autosizejs")[0], v = f.css("resize") === "none" ? "none" : "horizontal", f.data("mirror", e(l)).css({
                overflow: t,
                overflowY: t,
                wordWrap: "break-word",
                resize: v
            }), h = h && h > 0 ? h : 9e4;
            while (d--) l.style[s[d]] = f.css(s[d]);
            e("body").append(l), u in a ? o in a ? a[o] = a.onkeyup = g : a[u] = g : a[o] = g, e(window).resize(g), f.bind("autosize", g), f.text(f.text()), g()
        })
    }) : e.fn.autosize = function () {
        return this
    }
}(jQuery),
function (e) {
    typeof define == "function" && define.amd ? define(["jquery"], e) : e(jQuery)
}(function (e) {
    var t = [],
        n = e(document),
        r = e.browser.msie && parseInt(e.browser.version) === 6 && typeof window.XMLHttpRequest != "object",
        i = e.browser.msie && parseInt(e.browser.version) === 7,
        s = null,
        o = e(window),
        u = [];
    e.modal = function (t, n) {
        return e.modal.impl.init(t, n)
    }, e.modal.close = function () {
        e.modal.impl.close()
    }, e.modal.focus = function (t) {
        e.modal.impl.focus(t)
    }, e.modal.setContainerDimensions = function () {
        e.modal.impl.setContainerDimensions()
    }, e.modal.setPosition = function () {
        e.modal.impl.setPosition()
    }, e.modal.update = function (t, n) {
        e.modal.impl.update(t, n)
    }, e.fn.modal = function (t) {
        return e.modal.impl.init(this, t)
    }, e.modal.defaults = {
        appendTo: "body",
        focus: !0,
        opacity: 50,
        overlayId: "simplemodal-overlay",
        overlayCss: {},
        containerId: "simplemodal-container",
        containerCss: {},
        dataId: "simplemodal-data",
        dataCss: {},
        minHeight: null,
        minWidth: null,
        maxHeight: null,
        maxWidth: null,
        autoResize: !1,
        autoPosition: !0,
        zIndex: 1e3,
        close: !0,
        closeHTML: '<a class="modalCloseImg" title="Close"></a>',
        closeClass: "simplemodal-close",
        escClose: !0,
        overlayClose: !1,
        fixed: !0,
        position: null,
        persist: !1,
        modal: !0,
        onOpen: null,
        onShow: null,
        onClose: null
    }, e.modal.impl = {
        d: {},
        init: function (t, n) {
            var r = this;
            if (r.d.data) return !1;
            s = e.browser.msie && !e.boxModel, r.o = e.extend({}, e.modal.defaults, n), r.zIndex = r.o.zIndex, r.occb = !1;
            if (typeof t == "object") t = t instanceof jQuery ? t : e(t), r.d.placeholder = !1, t.parent().parent().size() > 0 && (t.before(e("<span></span>").attr("id", "simplemodal-placeholder").css({
                    display: "none"
                })), r.d.placeholder = !0, r.display = t.css("display"), r.o.persist || (r.d.orig = t.clone(!0)));
            else {
                if (typeof t != "string" && typeof t != "number") return alert("SimpleModal Error: Unsupported data type: " + typeof t), r;
                t = e("<div></div>").html(t)
            }
            return r.create(t), t = null, r.open(), e.isFunction(r.o.onShow) && r.o.onShow.apply(r, [r.d]), r
        },
        create: function (n) {
            var i = this;
            i.getDimensions(), i.o.modal && r && (i.d.iframe = e('<iframe src="javascript:false;"></iframe>').css(e.extend(i.o.iframeCss, {
                display: "none",
                opacity: 0,
                position: "fixed",
                height: u[0],
                width: u[1],
                zIndex: i.o.zIndex,
                top: 0,
                left: 0
            })).appendTo(i.o.appendTo)), i.d.overlay = e("<div></div>").attr("id", i.o.overlayId).addClass("simplemodal-overlay").css(e.extend(i.o.overlayCss, {
                display: "none",
                opacity: i.o.opacity / 100,
                height: i.o.modal ? t[0] : 0,
                width: i.o.modal ? t[1] : 0,
                position: "fixed",
                left: 0,
                top: 0,
                zIndex: i.o.zIndex + 1
            })).appendTo(i.o.appendTo), i.d.container = e("<div></div>").attr("id", i.o.containerId).addClass("simplemodal-container").css(e.extend({
                position: i.o.fixed ? "fixed" : "absolute"
            }, i.o.containerCss, {
                display: "none",
                zIndex: i.o.zIndex + 2
            })).append(i.o.close && i.o.closeHTML ? e(i.o.closeHTML).addClass(i.o.closeClass) : "").appendTo(i.o.appendTo), i.d.wrap = e("<div></div>").attr("tabIndex", -1).addClass("simplemodal-wrap").css({
                height: "100%",
                outline: 0,
                width: "100%"
            }).appendTo(i.d.container), i.d.data = n.attr("id", n.attr("id") || i.o.dataId).addClass("simplemodal-data").css(e.extend(i.o.dataCss, {
                display: "none"
            })).appendTo("body"), n = null, i.setContainerDimensions(), i.d.data.appendTo(i.d.wrap), (r || s) && i.fixIE()
        },
        bindEvents: function () {
            var i = this;
            e("." + i.o.closeClass).bind("click.simplemodal", function (e) {
                e.preventDefault(), i.close()
            }), i.o.modal && i.o.close && i.o.overlayClose && i.d.overlay.bind("click.simplemodal", function (e) {
                e.preventDefault(), i.close()
            }), n.bind("keydown.simplemodal", function (e) {
                i.o.modal && e.keyCode === 9 ? i.watchTab(e) : i.o.close && i.o.escClose && e.keyCode === 27 && (e.preventDefault(), i.close())
            }), o.bind("resize.simplemodal orientationchange.simplemodal", function () {
                i.getDimensions(), i.o.autoResize ? i.setContainerDimensions() : i.o.autoPosition && i.setPosition(), r || s ? i.fixIE() : i.o.modal && (i.d.iframe && i.d.iframe.css({
                    height: u[0],
                    width: u[1]
                }), i.d.overlay.css({
                    height: t[0],
                    width: t[1]
                }))
            })
        },
        unbindEvents: function () {
            e("." + this.o.closeClass).unbind("click.simplemodal"), n.unbind("keydown.simplemodal"), o.unbind(".simplemodal"), this.d.overlay.unbind("click.simplemodal")
        },
        fixIE: function () {
            var t = this,
                n = t.o.position;
            e.each([t.d.iframe || null, t.o.modal ? t.d.overlay : null, t.d.container.css("position") === "fixed" ? t.d.container : null], function (e, t) {
                if (t) {
                    var r = "document.body.clientHeight",
                        i = "document.body.clientWidth",
                        s = "document.body.scrollHeight",
                        o = "document.body.scrollLeft",
                        u = "document.body.scrollTop",
                        a = "document.body.scrollWidth",
                        f = "document.documentElement.clientHeight",
                        l = "document.documentElement.clientWidth",
                        c = "document.documentElement.scrollLeft",
                        h = "document.documentElement.scrollTop",
                        d = t[0].style;
                    d.position = "absolute";
                    if (e < 2) d.removeExpression("height"), d.removeExpression("width"), d.setExpression("height", "" + s + " > " + r + " ? " + s + " : " + r + ' + "px"'), d.setExpression("width", "" + a + " > " + i + " ? " + a + " : " + i + ' + "px"');
                    else {
                        var v, m;
                        if (n && n.constructor === Array) {
                            var g = n[0] ? typeof n[0] == "number" ? n[0].toString() : n[0].replace(/px/, "") : t.css("top").replace(/px/, "");
                            v = g.indexOf("%") === -1 ? g + " + (t = " + h + " ? " + h + " : " + u + ') + "px"' : parseInt(g.replace(/%/, "")) + " * ((" + f + " || " + r + ") / 100) + (t = " + h + " ? " + h + " : " + u + ') + "px"';
                            if (n[1]) {
                                var y = typeof n[1] == "number" ? n[1].toString() : n[1].replace(/px/, "");
                                m = y.indexOf("%") === -1 ? y + " + (t = " + c + " ? " + c + " : " + o + ') + "px"' : parseInt(y.replace(/%/, "")) + " * ((" + l + " || " + i + ") / 100) + (t = " + c + " ? " + c + " : " + o + ') + "px"'
                            }
                        } else v = "(" + f + " || " + r + ") / 2 - (this.offsetHeight / 2) + (t = " + h + " ? " + h + " : " + u + ') + "px"', m = "(" + l + " || " + i + ") / 2 - (this.offsetWidth / 2) + (t = " + c + " ? " + c + " : " + o + ') + "px"';
                        d.removeExpression("top"), d.removeExpression("left"), d.setExpression("top", v), d.setExpression("left", m)
                    }
                }
            })
        },
        focus: function (t) {
            var n = this,
                r = t && e.inArray(t, ["first", "last"]) !== -1 ? t : "first",
                i = e(":input:enabled:visible:" + r, n.d.wrap);
            setTimeout(function () {
                i.length > 0 ? i.focus() : n.d.wrap.focus()
            }, 10)
        },
        getDimensions: function () {
            var r = this,
                i = e.browser.opera && e.browser.version > "9.5" && e.fn.jquery < "1.3" || e.browser.opera && e.browser.version < "9.5" && e.fn.jquery > "1.2.6" ? o[0].innerHeight : o.height();
            t = [n.height(), n.width()], u = [i, o.width()]
        },
        getVal: function (e, t) {
            return e ? typeof e == "number" ? e : e === "auto" ? 0 : e.indexOf("%") > 0 ? parseInt(e.replace(/%/, "")) / 100 * (t === "h" ? u[0] : u[1]) : parseInt(e.replace(/px/, "")) : null
        },
        update: function (e, t) {
            var n = this;
            if (!n.d.data) return !1;
            n.d.origHeight = n.getVal(e, "h"), n.d.origWidth = n.getVal(t, "w"), n.d.data.hide(), e && n.d.container.css("height", e), t && n.d.container.css("width", t), n.setContainerDimensions(), n.d.data.show(), n.o.focus && n.focus(), n.unbindEvents(), n.bindEvents()
        },
        setContainerDimensions: function () {
            var t = this,
                n = r || i,
                s = t.d.origHeight ? t.d.origHeight : e.browser.opera ? t.d.container.height() : t.getVal(n ? t.d.container[0].currentStyle.height : t.d.container.css("height"), "h"),
                o = t.d.origWidth ? t.d.origWidth : e.browser.opera ? t.d.container.width() : t.getVal(n ? t.d.container[0].currentStyle.width : t.d.container.css("width"), "w"),
                a = t.d.data.outerHeight(!0),
                f = t.d.data.outerWidth(!0);
            t.d.origHeight = t.d.origHeight || s, t.d.origWidth = t.d.origWidth || o;
            var l = t.o.maxHeight ? t.getVal(t.o.maxHeight, "h") : null,
                c = t.o.maxWidth ? t.getVal(t.o.maxWidth, "w") : null,
                h = l && l < u[0] ? l : u[0],
                p = c && c < u[1] ? c : u[1],
                d = t.o.minHeight ? t.getVal(t.o.minHeight, "h") : "auto";
            s ? s = t.o.autoResize && s > h ? h : s < d ? d : s : a ? a > h ? s = h : t.o.minHeight && d !== "auto" && a < d ? s = d : s = a : s = d;
            var v = t.o.minWidth ? t.getVal(t.o.minWidth, "w") : "auto";
            o ? o = t.o.autoResize && o > p ? p : o < v ? v : o : f ? f > p ? o = p : t.o.minWidth && v !== "auto" && f < v ? o = v : o = f : o = v, t.d.container.css({
                height: s,
                width: o
            }), t.d.wrap.css({
                overflow: a > s || f > o ? "auto" : "visible"
            }), t.o.autoPosition && t.setPosition()
        },
        setPosition: function () {
            var e = this,
                t, n, r = u[0] / 2 - e.d.container.outerHeight(!0) / 2,
                i = u[1] / 2 - e.d.container.outerWidth(!0) / 2,
                s = e.d.container.css("position") !== "fixed" ? o.scrollTop() : 0;
            e.o.position && Object.prototype.toString.call(e.o.position) === "[object Array]" ? (t = s + (e.o.position[0] || r), n = e.o.position[1] || i) : (t = s + r, n = i), e.d.container.css({
                left: n,
                top: t
            })
        },
        watchTab: function (t) {
            var n = this;
            if (e(t.target).parents(".simplemodal-container").length > 0) {
                n.inputs = e(":input:enabled:visible:first, :input:enabled:visible:last", n.d.data[0]);
                if (!t.shiftKey && t.target === n.inputs[n.inputs.length - 1] || t.shiftKey && t.target === n.inputs[0] || n.inputs.length === 0) {
                    t.preventDefault();
                    var r = t.shiftKey ? "last" : "first";
                    n.focus(r)
                }
            } else t.preventDefault(), n.focus()
        },
        open: function () {
            var t = this;
            t.d.iframe && t.d.iframe.show(), e.isFunction(t.o.onOpen) ? t.o.onOpen.apply(t, [t.d]) : (t.d.overlay.show(), t.d.container.show(), t.d.data.show()), t.o.focus && t.focus(), t.bindEvents()
        },
        close: function () {
            var t = this;
            if (!t.d.data) return !1;
            t.unbindEvents();
            if (e.isFunction(t.o.onClose) && !t.occb) t.occb = !0, t.o.onClose.apply(t, [t.d]);
            else {
                if (t.d.placeholder) {
                    var n = e("#simplemodal-placeholder");
                    t.o.persist ? n.replaceWith(t.d.data.removeClass("simplemodal-data").css("display", t.display)) : (t.d.data.hide().remove(), n.replaceWith(t.d.orig))
                } else t.d.data.hide().remove();
                t.d.container.hide().remove(), t.d.overlay.hide(), t.d.iframe && t.d.iframe.hide().remove(), t.d.overlay.remove(), t.d = {}
            }
        }
    }
}),
function (e, t) {
    e.fn.jPlayer = function (n) {
        var r = "jPlayer",
            i = typeof n == "string",
            s = Array.prototype.slice.call(arguments, 1),
            o = this;
        return n = !i && s.length ? e.extend.apply(null, [!0, n].concat(s)) : n, i && n.charAt(0) === "_" ? o : (i ? this.each(function () {
            var i = e.data(this, r),
                u = i && e.isFunction(i[n]) ? i[n].apply(i, s) : i;
            if (u !== i && u !== t) return o = u, !1
        }) : this.each(function () {
            var t = e.data(this, r);
            t ? t.option(n || {}) : e.data(this, r, new e.jPlayer(n, this))
        }), o)
    }, e.jPlayer = function (t, n) {
        if (arguments.length) {
            this.element = e(n), this.options = e.extend(!0, {}, this.options, t);
            var r = this;
            this.element.bind("remove.jPlayer", function () {
                r.destroy()
            }), this._init()
        }
    }, e.jPlayer.emulateMethods = "load play pause", e.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate", e.jPlayer.emulateOptions = "muted volume", e.jPlayer.reservedEvent = "ready flashreset resize repeat error warning", e.jPlayer.event = {
        ready: "jPlayer_ready",
        flashreset: "jPlayer_flashreset",
        resize: "jPlayer_resize",
        repeat: "jPlayer_repeat",
        click: "jPlayer_click",
        error: "jPlayer_error",
        warning: "jPlayer_warning",
        loadstart: "jPlayer_loadstart",
        progress: "jPlayer_progress",
        suspend: "jPlayer_suspend",
        abort: "jPlayer_abort",
        emptied: "jPlayer_emptied",
        stalled: "jPlayer_stalled",
        play: "jPlayer_play",
        pause: "jPlayer_pause",
        loadedmetadata: "jPlayer_loadedmetadata",
        loadeddata: "jPlayer_loadeddata",
        waiting: "jPlayer_waiting",
        playing: "jPlayer_playing",
        canplay: "jPlayer_canplay",
        canplaythrough: "jPlayer_canplaythrough",
        seeking: "jPlayer_seeking",
        seeked: "jPlayer_seeked",
        timeupdate: "jPlayer_timeupdate",
        ended: "jPlayer_ended",
        ratechange: "jPlayer_ratechange",
        durationchange: "jPlayer_durationchange",
        volumechange: "jPlayer_volumechange"
    }, e.jPlayer.htmlEvent = ["loadstart", "abort", "emptied", "stalled", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "ratechange"], e.jPlayer.pause = function () {
        e.each(e.jPlayer.prototype.instances, function (e, t) {
            t.data("jPlayer").status.srcSet && t.jPlayer("pause")
        })
    }, e.jPlayer.timeFormat = {
        showHour: !1,
        showMin: !0,
        showSec: !0,
        padHour: !1,
        padMin: !0,
        padSec: !0,
        sepHour: ":",
        sepMin: ":",
        sepSec: ""
    }, e.jPlayer.convertTime = function (t) {
        var n = new Date(t * 1e3),
            r = n.getUTCHours(),
            i = n.getUTCMinutes(),
            s = n.getUTCSeconds(),
            o = e.jPlayer.timeFormat.padHour && r < 10 ? "0" + r : r,
            u = e.jPlayer.timeFormat.padMin && i < 10 ? "0" + i : i,
            a = e.jPlayer.timeFormat.padSec && s < 10 ? "0" + s : s;
        return (e.jPlayer.timeFormat.showHour ? o + e.jPlayer.timeFormat.sepHour : "") + (e.jPlayer.timeFormat.showMin ? u + e.jPlayer.timeFormat.sepMin : "") + (e.jPlayer.timeFormat.showSec ? a + e.jPlayer.timeFormat.sepSec : "")
    }, e.jPlayer.uaBrowser = function (e) {
        var t = e.toLowerCase(),
            n = /(webkit)[ \/]([\w.]+)/,
            r = /(opera)(?:.*version)?[ \/]([\w.]+)/,
            i = /(msie) ([\w.]+)/,
            s = /(mozilla)(?:.*? rv:([\w.]+))?/,
            o = n.exec(t) || r.exec(t) || i.exec(t) || t.indexOf("compatible") < 0 && s.exec(t) || [];
        return {
            browser: o[1] || "",
            version: o[2] || "0"
        }
    }, e.jPlayer.uaPlatform = function (e) {
        var t = e.toLowerCase(),
            n = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/,
            r = /(ipad|playbook)/,
            i = /(android)/,
            s = /(mobile)/,
            o = n.exec(t) || [],
            u = r.exec(t) || !s.exec(t) && i.exec(t) || [];
        return o[1] && (o[1] = o[1].replace(/\s/g, "_")), {
            platform: o[1] || "",
            tablet: u[1] || ""
        }
    }, e.jPlayer.browser = {}, e.jPlayer.platform = {};
    var n = e.jPlayer.uaBrowser(navigator.userAgent);
    n.browser && (e.jPlayer.browser[n.browser] = !0, e.jPlayer.browser.version = n.version);
    var r = e.jPlayer.uaPlatform(navigator.userAgent);
    r.platform && (e.jPlayer.platform[r.platform] = !0, e.jPlayer.platform.mobile = !r.tablet, e.jPlayer.platform.tablet = !! r.tablet), e.jPlayer.prototype = {
        count: 0,
        version: {
            script: "2.2.0",
            needFlash: "2.2.0",
            flash: "unknown"
        },
        options: {
            swfPath: "http://s.ppsrc.com/w/js/plugins/jplayer/Jplayer_2_2_0.swf",
            solution: "html, flash",
            supplied: "mp3",
            preload: "metadata",
            volume: .8,
            muted: !1,
            wmode: "opaque",
            backgroundColor: "#000000",
            cssSelectorAncestor: "#jp_container_1",
            cssSelector: {
                videoPlay: ".jp-video-play",
                play: ".jp-play",
                pause: ".jp-pause",
                stop: ".jp-stop",
                seekBar: ".jp-seek-bar",
                playBar: ".jp-play-bar",
                mute: ".jp-mute",
                unmute: ".jp-unmute",
                volumeBar: ".jp-volume-bar",
                volumeBarValue: ".jp-volume-bar-value",
                volumeMax: ".jp-volume-max",
                currentTime: ".jp-current-time",
                duration: ".jp-duration",
                fullScreen: ".jp-full-screen",
                restoreScreen: ".jp-restore-screen",
                repeat: ".jp-repeat",
                repeatOff: ".jp-repeat-off",
                gui: ".jp-gui",
                noSolution: ".jp-no-solution"
            },
            fullScreen: !1,
            autohide: {
                restored: !1,
                full: !0,
                fadeIn: 200,
                fadeOut: 600,
                hold: 1e3
            },
            loop: !1,
            repeat: function (t) {
                t.jPlayer.options.loop ? e(this).unbind(".jPlayerRepeat").bind(e.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function () {
                    e(this).jPlayer("play")
                }) : e(this).unbind(".jPlayerRepeat")
            },
            nativeVideoControls: {},
            noFullScreen: {
                msie: /msie [0-6]/,
                ipad: /ipad.*?os [0-4]/,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android [0-3](?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                webos: /webos/
            },
            noVolume: {
                ipad: /ipad/,
                iphone: /iphone/,
                ipod: /ipod/,
                android_pad: /android(?!.*?mobile)/,
                android_phone: /android.*?mobile/,
                blackberry: /blackberry/,
                windows_ce: /windows ce/,
                webos: /webos/,
                playbook: /playbook/
            },
            verticalVolume: !1,
            idPrefix: "jp",
            noConflict: "jQuery",
            emulateHtml: !1,
            errorAlerts: !1,
            warningAlerts: !1
        },
        optionsAudio: {
            size: {
                width: "0px",
                height: "0px",
                cssClass: ""
            },
            sizeFull: {
                width: "0px",
                height: "0px",
                cssClass: ""
            }
        },
        optionsVideo: {
            size: {
                width: "480px",
                height: "270px",
                cssClass: "jp-video-270p"
            },
            sizeFull: {
                width: "100%",
                height: "100%",
                cssClass: "jp-video-full"
            }
        },
        instances: {},
        status: {
            src: "",
            media: {},
            paused: !0,
            format: {},
            formatType: "",
            waitForPlay: !0,
            waitForLoad: !0,
            srcSet: !1,
            video: !1,
            seekPercent: 0,
            currentPercentRelative: 0,
            currentPercentAbsolute: 0,
            currentTime: 0,
            duration: 0,
            readyState: 0,
            networkState: 0,
            playbackRate: 1,
            ended: 0
        },
        internal: {
            ready: !1
        },
        solution: {
            html: !0,
            flash: !0
        },
        format: {
            mp3: {
                codec: 'audio/mpeg; codecs="mp3"',
                flashCanPlay: !0,
                media: "audio"
            },
            m4a: {
                codec: 'audio/mp4; codecs="mp4a.40.2"',
                flashCanPlay: !0,
                media: "audio"
            },
            oga: {
                codec: 'audio/ogg; codecs="vorbis"',
                flashCanPlay: !1,
                media: "audio"
            },
            wav: {
                codec: 'audio/wav; codecs="1"',
                flashCanPlay: !1,
                media: "audio"
            },
            webma: {
                codec: 'audio/webm; codecs="vorbis"',
                flashCanPlay: !1,
                media: "audio"
            },
            fla: {
                codec: "audio/x-flv",
                flashCanPlay: !0,
                media: "audio"
            },
            rtmpa: {
                codec: 'audio/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "audio"
            },
            m4v: {
                codec: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
                flashCanPlay: !0,
                media: "video"
            },
            ogv: {
                codec: 'video/ogg; codecs="theora, vorbis"',
                flashCanPlay: !1,
                media: "video"
            },
            webmv: {
                codec: 'video/webm; codecs="vorbis, vp8"',
                flashCanPlay: !1,
                media: "video"
            },
            flv: {
                codec: "video/x-flv",
                flashCanPlay: !0,
                media: "video"
            },
            rtmpv: {
                codec: 'video/rtmp; codecs="rtmp"',
                flashCanPlay: !0,
                media: "video"
            }
        },
        _init: function () {
            var n = this;
            this.element.empty(), this.status = e.extend({}, this.status), this.internal = e.extend({}, this.internal), this.internal.domNode = this.element.get(0), this.formats = [], this.solutions = [], this.require = {}, this.htmlElement = {}, this.html = {}, this.html.audio = {}, this.html.video = {}, this.flash = {}, this.css = {}, this.css.cs = {}, this.css.jq = {}, this.ancestorJq = [], this.options.volume = this._limitValue(this.options.volume, 0, 1), e.each(this.options.supplied.toLowerCase().split(","), function (t, r) {
                var i = r.replace(/^\s+|\s+$/g, "");
                if (n.format[i]) {
                    var s = !1;
                    e.each(n.formats, function (e, t) {
                        if (i === t) return s = !0, !1
                    }), s || n.formats.push(i)
                }
            }), e.each(this.options.solution.toLowerCase().split(","), function (t, r) {
                var i = r.replace(/^\s+|\s+$/g, "");
                if (n.solution[i]) {
                    var s = !1;
                    e.each(n.solutions, function (e, t) {
                        if (i === t) return s = !0, !1
                    }), s || n.solutions.push(i)
                }
            }), this.internal.instance = "jp_" + this.count, this.instances[this.internal.instance] = this.element, this.element.attr("id") || this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count), this.internal.self = e.extend({}, {
                id: this.element.attr("id"),
                jq: this.element
            }), this.internal.audio = e.extend({}, {
                id: this.options.idPrefix + "_audio_" + this.count,
                jq: t
            }), this.internal.video = e.extend({}, {
                id: this.options.idPrefix + "_video_" + this.count,
                jq: t
            }), this.internal.flash = e.extend({}, {
                id: this.options.idPrefix + "_flash_" + this.count,
                jq: t,
                swf: this.options.swfPath + (this.options.swfPath.toLowerCase().slice(-4) !== ".swf" ? (this.options.swfPath && this.options.swfPath.slice(-1) !== "/" ? "/" : "") + "Jplayer.swf" : "")
            }), this.internal.poster = e.extend({}, {
                id: this.options.idPrefix + "_poster_" + this.count,
                jq: t
            }), e.each(e.jPlayer.event, function (e, r) {
                n.options[e] !== t && (n.element.bind(r + ".jPlayer", n.options[e]), n.options[e] = t)
            }), this.require.audio = !1, this.require.video = !1, e.each(this.formats, function (e, t) {
                n.require[n.format[t].media] = !0
            }), this.require.video ? this.options = e.extend(!0, {}, this.optionsVideo, this.options) : this.options = e.extend(!0, {}, this.optionsAudio, this.options), this._setSize(), this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls), this.status.noFullScreen = this._uaBlocklist(this.options.noFullScreen), this.status.noVolume = this._uaBlocklist(this.options.noVolume), this._restrictNativeVideoControls(), this.htmlElement.poster = document.createElement("img"), this.htmlElement.poster.id = this.internal.poster.id, this.htmlElement.poster.onload = function () {
                (!n.status.video || n.status.waitForPlay) && n.internal.poster.jq.show()
            }, this.element.append(this.htmlElement.poster), this.internal.poster.jq = e("#" + this.internal.poster.id), this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            }), this.internal.poster.jq.hide(), this.internal.poster.jq.bind("click.jPlayer", function () {
                n._trigger(e.jPlayer.event.click)
            }), this.html.audio.available = !1, this.require.audio && (this.htmlElement.audio = document.createElement("audio"), this.htmlElement.audio.id = this.internal.audio.id, this.html.audio.available = !! this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio)), this.html.video.available = !1, this.require.video && (this.htmlElement.video = document.createElement("video"), this.htmlElement.video.id = this.internal.video.id, this.html.video.available = !! this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video)), this.flash.available = this._checkForFlash(10), this.html.canPlay = {}, this.flash.canPlay = {}, e.each(this.formats, function (e, t) {
                n.html.canPlay[t] = n.html[n.format[t].media].available && "" !== n.htmlElement[n.format[t].media].canPlayType(n.format[t].codec), n.flash.canPlay[t] = n.format[t].flashCanPlay && n.flash.available
            }), this.html.desired = !1, this.flash.desired = !1, e.each(this.solutions, function (t, r) {
                if (t === 0) n[r].desired = !0;
                else {
                    var i = !1,
                        s = !1;
                    e.each(n.formats, function (e, t) {
                        n[n.solutions[0]].canPlay[t] && (n.format[t].media === "video" ? s = !0 : i = !0)
                    }), n[r].desired = n.require.audio && !i || n.require.video && !s
                }
            }), this.html.support = {}, this.flash.support = {}, e.each(this.formats, function (e, t) {
                n.html.support[t] = n.html.canPlay[t] && n.html.desired, n.flash.support[t] = n.flash.canPlay[t] && n.flash.desired
            }), this.html.used = !1, this.flash.used = !1, e.each(this.solutions, function (t, r) {
                e.each(n.formats, function (e, t) {
                    if (n[r].support[t]) return n[r].used = !0, !1
                })
            }), this._resetActive(), this._resetGate(), this._cssSelectorAncestor(this.options.cssSelectorAncestor), !this.html.used && !this.flash.used ? (this._error({
                type: e.jPlayer.error.NO_SOLUTION,
                context: "{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}",
                message: e.jPlayer.errorMsg.NO_SOLUTION,
                hint: e.jPlayer.errorHint.NO_SOLUTION
            }), this.css.jq.noSolution.length && this.css.jq.noSolution.show()) : this.css.jq.noSolution.length && this.css.jq.noSolution.hide();
            if (this.flash.used) {
                var r, i = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume + "&muted=" + this.options.muted;
                if (e.jPlayer.browser.msie && Number(e.jPlayer.browser.version) <= 8) {
                    var s = '<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0"></object>',
                        o = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + i + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
                    r = document.createElement(s);
                    for (var u = 0; u < o.length; u++) r.appendChild(document.createElement(o[u]))
                } else {
                    var a = function (e, t, n) {
                        var r = document.createElement("param");
                        r.setAttribute("name", t), r.setAttribute("value", n), e.appendChild(r)
                    };
                    r = document.createElement("object"), r.setAttribute("id", this.internal.flash.id), r.setAttribute("data", this.internal.flash.swf), r.setAttribute("type", "application/x-shockwave-flash"), r.setAttribute("width", "1"), r.setAttribute("height", "1"), a(r, "flashvars", i), a(r, "allowscriptaccess", "always"), a(r, "bgcolor", this.options.backgroundColor), a(r, "wmode", this.options.wmode)
                }
                this.element.append(r), this.internal.flash.jq = e(r)
            }
            this.html.used && (this.html.audio.available && (this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio), this.element.append(this.htmlElement.audio), this.internal.audio.jq = e("#" + this.internal.audio.id)), this.html.video.available && (this._addHtmlEventListeners(this.htmlElement.video, this.html.video), this.element.append(this.htmlElement.video), this.internal.video.jq = e("#" + this.internal.video.id), this.status.nativeVideoControls ? this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            }) : this.internal.video.jq.css({
                width: "0px",
                height: "0px"
            }), this.internal.video.jq.bind("click.jPlayer", function () {
                n._trigger(e.jPlayer.event.click)
            }))), this.options.emulateHtml && this._emulateHtmlBridge(), this.html.used && !this.flash.used && setTimeout(function () {
                n.internal.ready = !0, n.version.flash = "n/a", n._trigger(e.jPlayer.event.repeat), n._trigger(e.jPlayer.event.ready)
            }, 100), this._updateNativeVideoControls(), this._updateInterface(), this._updateButtons(!1), this._updateAutohide(), this._updateVolume(this.options.volume), this._updateMute(this.options.muted), this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), e.jPlayer.prototype.count++
        },
        destroy: function () {
            this.clearMedia(), this._removeUiClass(), this.css.jq.currentTime.length && this.css.jq.currentTime.text(""), this.css.jq.duration.length && this.css.jq.duration.text(""), e.each(this.css.jq, function (e, t) {
                t.length && t.unbind(".jPlayer")
            }), this.internal.poster.jq.unbind(".jPlayer"), this.internal.video.jq && this.internal.video.jq.unbind(".jPlayer"), this.options.emulateHtml && this._destroyHtmlBridge(), this.element.removeData("jPlayer"), this.element.unbind(".jPlayer"), this.element.empty(), delete this.instances[this.internal.instance]
        },
        enable: function () {},
        disable: function () {},
        _testCanPlayType: function (e) {
            try {
                return e.canPlayType(this.format.mp3.codec), !0
            } catch (t) {
                return !1
            }
        },
        _uaBlocklist: function (t) {
            var n = navigator.userAgent.toLowerCase(),
                r = !1;
            return e.each(t, function (e, t) {
                if (t && t.test(n)) return r = !0, !1
            }), r
        },
        _restrictNativeVideoControls: function () {
            this.require.audio && this.status.nativeVideoControls && (this.status.nativeVideoControls = !1, this.status.noFullScreen = !0)
        },
        _updateNativeVideoControls: function () {
            this.html.video.available && this.html.used && (this.htmlElement.video.controls = this.status.nativeVideoControls, this._updateAutohide(), this.status.nativeVideoControls && this.require.video ? (this.internal.poster.jq.hide(), this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            })) : this.status.waitForPlay && this.status.video && (this.internal.poster.jq.show(), this.internal.video.jq.css({
                width: "0px",
                height: "0px"
            })))
        },
        _addHtmlEventListeners: function (t, n) {
            var r = this;
            t.preload = this.options.preload, t.muted = this.options.muted, t.volume = this.options.volume, t.addEventListener("progress", function () {
                n.gate && (r._getHtmlStatus(t), r._updateInterface(), r._trigger(e.jPlayer.event.progress))
            }, !1), t.addEventListener("timeupdate", function () {
                n.gate && (r._getHtmlStatus(t), r._updateInterface(), r._trigger(e.jPlayer.event.timeupdate))
            }, !1), t.addEventListener("durationchange", function () {
                n.gate && (r._getHtmlStatus(t), r._updateInterface(), r._trigger(e.jPlayer.event.durationchange))
            }, !1), t.addEventListener("play", function () {
                n.gate && (r._updateButtons(!0), r._html_checkWaitForPlay(), r._trigger(e.jPlayer.event.play))
            }, !1), t.addEventListener("playing", function () {
                n.gate && (r._updateButtons(!0), r._seeked(), r._trigger(e.jPlayer.event.playing))
            }, !1), t.addEventListener("pause", function () {
                n.gate && (r._updateButtons(!1), r._trigger(e.jPlayer.event.pause))
            }, !1), t.addEventListener("waiting", function () {
                n.gate && (r._seeking(), r._trigger(e.jPlayer.event.waiting))
            }, !1), t.addEventListener("seeking", function () {
                n.gate && (r._seeking(), r._trigger(e.jPlayer.event.seeking))
            }, !1), t.addEventListener("seeked", function () {
                n.gate && (r._seeked(), r._trigger(e.jPlayer.event.seeked))
            }, !1), t.addEventListener("volumechange", function () {
                n.gate && (r.options.volume = t.volume, r.options.muted = t.muted, r._updateMute(), r._updateVolume(), r._trigger(e.jPlayer.event.volumechange))
            }, !1), t.addEventListener("suspend", function () {
                n.gate && (r._seeked(), r._trigger(e.jPlayer.event.suspend))
            }, !1), t.addEventListener("ended", function () {
                n.gate && (e.jPlayer.browser.webkit || (r.htmlElement.media.currentTime = 0), r.htmlElement.media.pause(), r._updateButtons(!1), r._getHtmlStatus(t, !0), r._updateInterface(), r._trigger(e.jPlayer.event.ended))
            }, !1), t.addEventListener("error", function () {
                n.gate && (r._updateButtons(!1), r._seeked(), r.status.srcSet && (clearTimeout(r.internal.htmlDlyCmdId), r.status.waitForLoad = !0, r.status.waitForPlay = !0, r.status.video && !r.status.nativeVideoControls && r.internal.video.jq.css({
                    width: "0px",
                    height: "0px"
                }), r._validString(r.status.media.poster) && !r.status.nativeVideoControls && r.internal.poster.jq.show(), r.css.jq.videoPlay.length && r.css.jq.videoPlay.show(), r._error({
                    type: e.jPlayer.error.URL,
                    context: r.status.src,
                    message: e.jPlayer.errorMsg.URL,
                    hint: e.jPlayer.errorHint.URL
                })))
            }, !1), e.each(e.jPlayer.htmlEvent, function (i, s) {
                t.addEventListener(this, function () {
                    n.gate && r._trigger(e.jPlayer.event[s])
                }, !1)
            })
        },
        _getHtmlStatus: function (e, t) {
            var n = 0,
                r = 0,
                i = 0,
                s = 0;
            isFinite(e.duration) && (this.status.duration = e.duration), n = e.currentTime, r = this.status.duration > 0 ? 100 * n / this.status.duration : 0, typeof e.seekable == "object" && e.seekable.length > 0 ? (i = this.status.duration > 0 ? 100 * e.seekable.end(e.seekable.length - 1) / this.status.duration : 100, s = this.status.duration > 0 ? 100 * e.currentTime / e.seekable.end(e.seekable.length - 1) : 0) : (i = 100, s = r), t && (n = 0, s = 0, r = 0), this.status.seekPercent = i, this.status.currentPercentRelative = s, this.status.currentPercentAbsolute = r, this.status.currentTime = n, this.status.readyState = e.readyState, this.status.networkState = e.networkState, this.status.playbackRate = e.playbackRate, this.status.ended = e.ended
        },
        _resetStatus: function () {
            this.status = e.extend({}, this.status, e.jPlayer.prototype.status)
        },
        _trigger: function (t, n, r) {
            var i = e.Event(t);
            i.jPlayer = {}, i.jPlayer.version = e.extend({}, this.version), i.jPlayer.options = e.extend(!0, {}, this.options), i.jPlayer.status = e.extend(!0, {}, this.status), i.jPlayer.html = e.extend(!0, {}, this.html), i.jPlayer.flash = e.extend(!0, {}, this.flash), n && (i.jPlayer.error = e.extend({}, n)), r && (i.jPlayer.warning = e.extend({}, r)), this.element.trigger(i)
        },
        jPlayerFlashEvent: function (t, n) {
            if (t === e.jPlayer.event.ready) if (!this.internal.ready) this.internal.ready = !0, this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    }), this.version.flash = n.version, this.version.needFlash !== this.version.flash && this._error({
                        type: e.jPlayer.error.VERSION,
                        context: this.version.flash,
                        message: e.jPlayer.errorMsg.VERSION + this.version.flash,
                        hint: e.jPlayer.errorHint.VERSION
                    }), this._trigger(e.jPlayer.event.repeat), this._trigger(t);
                else if (this.flash.gate) {
                if (this.status.srcSet) {
                    var r = this.status.currentTime,
                        i = this.status.paused;
                    this.setMedia(this.status.media), r > 0 && (i ? this.pause(r) : this.play(r))
                }
                this._trigger(e.jPlayer.event.flashreset)
            }
            if (this.flash.gate) switch (t) {
                case e.jPlayer.event.progress:
                    this._getFlashStatus(n), this._updateInterface(), this._trigger(t);
                    break;
                case e.jPlayer.event.timeupdate:
                    this._getFlashStatus(n), this._updateInterface(), this._trigger(t);
                    break;
                case e.jPlayer.event.play:
                    this._seeked(), this._updateButtons(!0), this._trigger(t);
                    break;
                case e.jPlayer.event.pause:
                    this._updateButtons(!1), this._trigger(t);
                    break;
                case e.jPlayer.event.ended:
                    this._updateButtons(!1), this._trigger(t);
                    break;
                case e.jPlayer.event.click:
                    this._trigger(t);
                    break;
                case e.jPlayer.event.error:
                    this.status.waitForLoad = !0, this.status.waitForPlay = !0, this.status.video && this.internal.flash.jq.css({
                        width: "0px",
                        height: "0px"
                    }), this._validString(this.status.media.poster) && this.internal.poster.jq.show(), this.css.jq.videoPlay.length && this.status.video && this.css.jq.videoPlay.show(), this.status.video ? this._flash_setVideo(this.status.media) : this._flash_setAudio(this.status.media), this._updateButtons(!1), this._error({
                        type: e.jPlayer.error.URL,
                        context: n.src,
                        message: e.jPlayer.errorMsg.URL,
                        hint: e.jPlayer.errorHint.URL
                    });
                    break;
                case e.jPlayer.event.seeking:
                    this._seeking(), this._trigger(t);
                    break;
                case e.jPlayer.event.seeked:
                    this._seeked(), this._trigger(t);
                    break;
                case e.jPlayer.event.ready:
                    break;
                default:
                    this._trigger(t)
            }
            return !1
        },
        _getFlashStatus: function (e) {
            this.status.seekPercent = e.seekPercent, this.status.currentPercentRelative = e.currentPercentRelative, this.status.currentPercentAbsolute = e.currentPercentAbsolute, this.status.currentTime = e.currentTime, this.status.duration = e.duration, this.status.readyState = 4, this.status.networkState = 0, this.status.playbackRate = 1, this.status.ended = !1
        },
        _updateButtons: function (e) {
            e !== t && (this.status.paused = !e, this.css.jq.play.length && this.css.jq.pause.length && (e ? (this.css.jq.play.hide(), this.css.jq.pause.show()) : (this.css.jq.play.show(), this.css.jq.pause.hide()))), this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length && (this.status.noFullScreen ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.hide()) : this.options.fullScreen ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.show()) : (this.css.jq.fullScreen.show(), this.css.jq.restoreScreen
                .hide())), this.css.jq.repeat.length && this.css.jq.repeatOff.length && (this.options.loop ? (this.css.jq.repeat.hide(), this.css.jq.repeatOff.show()) : (this.css.jq.repeat.show(), this.css.jq.repeatOff.hide()))
        },
        _updateInterface: function () {
            this.css.jq.seekBar.length && this.css.jq.seekBar.width(this.status.seekPercent + "%"), this.css.jq.playBar.length && this.css.jq.playBar.width(this.status.currentPercentRelative + "%"), this.css.jq.currentTime.length && this.css.jq.currentTime.text(e.jPlayer.convertTime(this.status.currentTime)), this.css.jq.duration.length && this.css.jq.duration.text(e.jPlayer.convertTime(this.status.duration))
        },
        _seeking: function () {
            this.css.jq.seekBar.length && this.css.jq.seekBar.addClass("jp-seeking-bg")
        },
        _seeked: function () {
            this.css.jq.seekBar.length && this.css.jq.seekBar.removeClass("jp-seeking-bg")
        },
        _resetGate: function () {
            this.html.audio.gate = !1, this.html.video.gate = !1, this.flash.gate = !1
        },
        _resetActive: function () {
            this.html.active = !1, this.flash.active = !1
        },
        setMedia: function (t) {
            var n = this,
                r = !1,
                i = this.status.media.poster !== t.poster;
            this._resetMedia(), this._resetGate(), this._resetActive(), e.each(this.formats, function (i, s) {
                var o = n.format[s].media === "video";
                e.each(n.solutions, function (e, i) {
                    if (n[i].support[s] && n._validString(t[s])) {
                        var u = i === "html";
                        return o ? (u ? (n.html.video.gate = !0, n._html_setVideo(t), n.html.active = !0) : (n.flash.gate = !0, n._flash_setVideo(t), n.flash.active = !0), n.css.jq.videoPlay.length && n.css.jq.videoPlay.show(), n.status.video = !0) : (u ? (n.html.audio.gate = !0, n._html_setAudio(t), n.html.active = !0) : (n.flash.gate = !0, n._flash_setAudio(t), n.flash.active = !0), n.css.jq.videoPlay.length && n.css.jq.videoPlay.hide(), n.status.video = !1), r = !0, !1
                    }
                });
                if (r) return !1
            }), r ? ((!this.status.nativeVideoControls || !this.html.video.gate) && this._validString(t.poster) && (i ? this.htmlElement.poster.src = t.poster : this.internal.poster.jq.show()), this.status.srcSet = !0, this.status.media = e.extend({}, t), this._updateButtons(!1), this._updateInterface()) : this._error({
                type: e.jPlayer.error.NO_SUPPORT,
                context: "{supplied:'" + this.options.supplied + "'}",
                message: e.jPlayer.errorMsg.NO_SUPPORT,
                hint: e.jPlayer.errorHint.NO_SUPPORT
            })
        },
        _resetMedia: function () {
            this._resetStatus(), this._updateButtons(!1), this._updateInterface(), this._seeked(), this.internal.poster.jq.hide(), clearTimeout(this.internal.htmlDlyCmdId), this.html.active ? this._html_resetMedia() : this.flash.active && this._flash_resetMedia()
        },
        clearMedia: function () {
            this._resetMedia(), this.html.active ? this._html_clearMedia() : this.flash.active && this._flash_clearMedia(), this._resetGate(), this._resetActive()
        },
        load: function () {
            this.status.srcSet ? this.html.active ? this._html_load() : this.flash.active && this._flash_load() : this._urlNotSetError("load")
        },
        play: function (e) {
            e = typeof e == "number" ? e : NaN, this.status.srcSet ? this.html.active ? this._html_play(e) : this.flash.active && this._flash_play(e) : this._urlNotSetError("play")
        },
        videoPlay: function () {
            this.play()
        },
        pause: function (e) {
            e = typeof e == "number" ? e : NaN, this.status.srcSet ? this.html.active ? this._html_pause(e) : this.flash.active && this._flash_pause(e) : this._urlNotSetError("pause")
        },
        pauseOthers: function () {
            var t = this;
            e.each(this.instances, function (e, n) {
                t.element !== n && n.data("jPlayer").status.srcSet && n.jPlayer("pause")
            })
        },
        stop: function () {
            this.status.srcSet ? this.html.active ? this._html_pause(0) : this.flash.active && this._flash_pause(0) : this._urlNotSetError("stop")
        },
        playHead: function (e) {
            e = this._limitValue(e, 0, 100), this.status.srcSet ? this.html.active ? this._html_playHead(e) : this.flash.active && this._flash_playHead(e) : this._urlNotSetError("playHead")
        },
        _muted: function (t) {
            this.options.muted = t, this.html.used && this._html_mute(t), this.flash.used && this._flash_mute(t), !this.html.video.gate && !this.html.audio.gate && (this._updateMute(t), this._updateVolume(this.options.volume), this._trigger(e.jPlayer.event.volumechange))
        },
        mute: function (e) {
            e = e === t ? !0 : !! e, this._muted(e)
        },
        unmute: function (e) {
            e = e === t ? !0 : !! e, this._muted(!e)
        },
        _updateMute: function (e) {
            e === t && (e = this.options.muted), this.css.jq.mute.length && this.css.jq.unmute.length && (this.status.noVolume ? (this.css.jq.mute.hide(), this.css.jq.unmute.hide()) : e ? (this.css.jq.mute.hide(), this.css.jq.unmute.show()) : (this.css.jq.mute.show(), this.css.jq.unmute.hide()))
        },
        volume: function (t) {
            t = this._limitValue(t, 0, 1), this.options.volume = t, this.html.used && this._html_volume(t), this.flash.used && this._flash_volume(t), !this.html.video.gate && !this.html.audio.gate && (this._updateVolume(t), this._trigger(e.jPlayer.event.volumechange))
        },
        volumeBar: function (e) {
            if (this.css.jq.volumeBar.length) {
                var t = this.css.jq.volumeBar.offset(),
                    n = e.pageX - t.left,
                    r = this.css.jq.volumeBar.width(),
                    i = this.css.jq.volumeBar.height() - e.pageY + t.top,
                    s = this.css.jq.volumeBar.height();
                this.options.verticalVolume ? this.volume(i / s) : this.volume(n / r)
            }
            this.options.muted && this._muted(!1)
        },
        volumeBarValue: function (e) {
            this.volumeBar(e)
        },
        _updateVolume: function (e) {
            e === t && (e = this.options.volume), e = this.options.muted ? 0 : e, this.status.noVolume ? (this.css.jq.volumeBar.length && this.css.jq.volumeBar.hide(), this.css.jq.volumeBarValue.length && this.css.jq.volumeBarValue.hide(), this.css.jq.volumeMax.length && this.css.jq.volumeMax.hide()) : (this.css.jq.volumeBar.length && this.css.jq.volumeBar.show(), this.css.jq.volumeBarValue.length && (this.css.jq.volumeBarValue.show(), this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](e * 100 + "%")), this.css.jq.volumeMax.length && this.css.jq.volumeMax.show())
        },
        volumeMax: function () {
            this.volume(1), this.options.muted && this._muted(!1)
        },
        _cssSelectorAncestor: function (t) {
            var n = this;
            this.options.cssSelectorAncestor = t, this._removeUiClass(), this.ancestorJq = t ? e(t) : [], t && this.ancestorJq.length !== 1 && this._warning({
                type: e.jPlayer.warning.CSS_SELECTOR_COUNT,
                context: t,
                message: e.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.",
                hint: e.jPlayer.warningHint.CSS_SELECTOR_COUNT
            }), this._addUiClass(), e.each(this.options.cssSelector, function (e, t) {
                n._cssSelector(e, t)
            })
        },
        _cssSelector: function (t, n) {
            var r = this;
            if (typeof n == "string") if (e.jPlayer.prototype.options.cssSelector[t]) {
                    this.css.jq[t] && this.css.jq[t].length && this.css.jq[t].unbind(".jPlayer"), this.options.cssSelector[t] = n, this.css.cs[t] = this.options.cssSelectorAncestor + " " + n, n ? this.css.jq[t] = e(this.css.cs[t]) : this.css.jq[t] = [];
                    if (this.css.jq[t].length) {
                        var i = function (n) {
                            return r[t](n), e(this).blur(), !1
                        };
                        this.css.jq[t].bind("click.jPlayer", i)
                    }
                    n && this.css.jq[t].length !== 1 && this._warning({
                        type: e.jPlayer.warning.CSS_SELECTOR_COUNT,
                        context: this.css.cs[t],
                        message: e.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[t].length + " found for " + t + " method.",
                        hint: e.jPlayer.warningHint.CSS_SELECTOR_COUNT
                    })
                } else this._warning({
                        type: e.jPlayer.warning.CSS_SELECTOR_METHOD,
                        context: t,
                        message: e.jPlayer.warningMsg.CSS_SELECTOR_METHOD,
                        hint: e.jPlayer.warningHint.CSS_SELECTOR_METHOD
                    });
                else this._warning({
                        type: e.jPlayer.warning.CSS_SELECTOR_STRING,
                        context: n,
                        message: e.jPlayer.warningMsg.CSS_SELECTOR_STRING,
                        hint: e.jPlayer.warningHint.CSS_SELECTOR_STRING
                    })
        },
        seekBar: function (e) {
            if (this.css.jq.seekBar) {
                var t = this.css.jq.seekBar.offset(),
                    n = e.pageX - t.left,
                    r = this.css.jq.seekBar.width(),
                    i = 100 * n / r;
                this.playHead(i)
            }
        },
        playBar: function (e) {
            this.seekBar(e)
        },
        repeat: function () {
            this._loop(!0)
        },
        repeatOff: function () {
            this._loop(!1)
        },
        _loop: function (t) {
            this.options.loop !== t && (this.options.loop = t, this._updateButtons(), this._trigger(e.jPlayer.event.repeat))
        },
        currentTime: function () {},
        duration: function () {},
        gui: function () {},
        noSolution: function () {},
        option: function (n, r) {
            var i = n;
            if (arguments.length === 0) return e.extend(!0, {}, this.options);
            if (typeof n == "string") {
                var s = n.split(".");
                if (r === t) {
                    var o = e.extend(!0, {}, this.options);
                    for (var u = 0; u < s.length; u++) {
                        if (o[s[u]] === t) return this._warning({
                                type: e.jPlayer.warning.OPTION_KEY,
                                context: n,
                                message: e.jPlayer.warningMsg.OPTION_KEY,
                                hint: e.jPlayer.warningHint.OPTION_KEY
                            }), t;
                        o = o[s[u]]
                    }
                    return o
                }
                i = {};
                var a = i;
                for (var f = 0; f < s.length; f++) f < s.length - 1 ? (a[s[f]] = {}, a = a[s[f]]) : a[s[f]] = r
            }
            return this._setOptions(i), this
        },
        _setOptions: function (t) {
            var n = this;
            return e.each(t, function (e, t) {
                n._setOption(e, t)
            }), this
        },
        _setOption: function (t, n) {
            var r = this;
            switch (t) {
            case "volume":
                this.volume(n);
                break;
            case "muted":
                this._muted(n);
                break;
            case "cssSelectorAncestor":
                this._cssSelectorAncestor(n);
                break;
            case "cssSelector":
                e.each(n, function (e, t) {
                    r._cssSelector(e, t)
                });
                break;
            case "fullScreen":
                this.options[t] !== n && (this._removeUiClass(), this.options[t] = n, this._refreshSize());
                break;
            case "size":
                !this.options.fullScreen && this.options[t].cssClass !== n.cssClass && this._removeUiClass(), this.options[t] = e.extend({}, this.options[t], n), this._refreshSize();
                break;
            case "sizeFull":
                this.options.fullScreen && this.options[t].cssClass !== n.cssClass && this._removeUiClass(), this.options[t] = e.extend({}, this.options[t], n), this._refreshSize();
                break;
            case "autohide":
                this.options[t] = e.extend({}, this.options[t], n), this._updateAutohide();
                break;
            case "loop":
                this._loop(n);
                break;
            case "nativeVideoControls":
                this.options[t] = e.extend({}, this.options[t], n), this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls), this._restrictNativeVideoControls(), this._updateNativeVideoControls();
                break;
            case "noFullScreen":
                this.options[t] = e.extend({}, this.options[t], n), this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls), this.status.noFullScreen = this._uaBlocklist(this.options.noFullScreen), this._restrictNativeVideoControls(), this._updateButtons();
                break;
            case "noVolume":
                this.options[t] = e.extend({}, this.options[t], n), this.status.noVolume = this._uaBlocklist(this.options.noVolume), this._updateVolume(), this._updateMute();
                break;
            case "emulateHtml":
                this.options[t] !== n && (this.options[t] = n, n ? this._emulateHtmlBridge() : this._destroyHtmlBridge())
            }
            return this
        },
        _refreshSize: function () {
            this._setSize(), this._addUiClass(), this._updateSize(), this._updateButtons(), this._updateAutohide(), this._trigger(e.jPlayer.event.resize)
        },
        _setSize: function () {
            this.options.fullScreen ? (this.status.width = this.options.sizeFull.width, this.status.height = this.options.sizeFull.height, this.status.cssClass = this.options.sizeFull.cssClass) : (this.status.width = this.options.size.width, this.status.height = this.options.size.height, this.status.cssClass = this.options.size.cssClass), this.element.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _addUiClass: function () {
            this.ancestorJq.length && this.ancestorJq.addClass(this.status.cssClass)
        },
        _removeUiClass: function () {
            this.ancestorJq.length && this.ancestorJq.removeClass(this.status.cssClass)
        },
        _updateSize: function () {
            this.internal.poster.jq.css({
                width: this.status.width,
                height: this.status.height
            }), !this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls ? this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            }) : !this.status.waitForPlay && this.flash.active && this.status.video && this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })
        },
        _updateAutohide: function () {
            var e = this,
                t = "mousemove.jPlayer",
                n = ".jPlayerAutohide",
                r = t + n,
                i = function () {
                    e.css.jq.gui.fadeIn(e.options.autohide.fadeIn, function () {
                        clearTimeout(e.internal.autohideId), e.internal.autohideId = setTimeout(function () {
                            e.css.jq.gui.fadeOut(e.options.autohide.fadeOut)
                        }, e.options.autohide.hold)
                    })
                };
            this.css.jq.gui.length && (this.css.jq.gui.stop(!0, !0), clearTimeout(this.internal.autohideId), this.element.unbind(n), this.css.jq.gui.unbind(n), this.status.nativeVideoControls ? this.css.jq.gui.hide() : this.options.fullScreen && this.options.autohide.full || !this.options.fullScreen && this.options.autohide.restored ? (this.element.bind(r, i), this.css.jq.gui.bind(r, i), this.css.jq.gui.hide()) : this.css.jq.gui.show())
        },
        fullScreen: function () {
            this._setOption("fullScreen", !0)
        },
        restoreScreen: function () {
            this._setOption("fullScreen", !1)
        },
        _html_initMedia: function () {
            this.htmlElement.media.src = this.status.src, this.options.preload !== "none" && this._html_load(), this._trigger(e.jPlayer.event.timeupdate)
        },
        _html_setAudio: function (t) {
            var n = this;
            e.each(this.formats, function (e, r) {
                if (n.html.support[r] && t[r]) return n.status.src = t[r], n.status.format[r] = !0, n.status.formatType = r, !1
            }), this.htmlElement.media = this.htmlElement.audio, this._html_initMedia()
        },
        _html_setVideo: function (t) {
            var n = this;
            e.each(this.formats, function (e, r) {
                if (n.html.support[r] && t[r]) return n.status.src = t[r], n.status.format[r] = !0, n.status.formatType = r, !1
            }), this.status.nativeVideoControls && (this.htmlElement.video.poster = this._validString(t.poster) ? t.poster : ""), this.htmlElement.media = this.htmlElement.video, this._html_initMedia()
        },
        _html_resetMedia: function () {
            this.htmlElement.media && (this.htmlElement.media.id === this.internal.video.id && !this.status.nativeVideoControls && this.internal.video.jq.css({
                width: "0px",
                height: "0px"
            }), this.htmlElement.media.pause())
        },
        _html_clearMedia: function () {
            this.htmlElement.media && (this.htmlElement.media.src = "", this.htmlElement.media.load())
        },
        _html_load: function () {
            this.status.waitForLoad && (this.status.waitForLoad = !1, this.htmlElement.media.load()), clearTimeout(this.internal.htmlDlyCmdId)
        },
        _html_play: function (e) {
            var t = this;
            this._html_load(), this.htmlElement.media.play();
            if (!isNaN(e)) try {
                    this.htmlElement.media.currentTime = e
            } catch (n) {
                this.internal.htmlDlyCmdId = setTimeout(function () {
                    t.play(e)
                }, 100);
                return
            }
            this._html_checkWaitForPlay()
        },
        _html_pause: function (e) {
            var t = this;
            e > 0 ? this._html_load() : clearTimeout(this.internal.htmlDlyCmdId), this.htmlElement.media.pause();
            if (!isNaN(e)) try {
                    this.htmlElement.media.currentTime = e
            } catch (n) {
                this.internal.htmlDlyCmdId = setTimeout(function () {
                    t.pause(e)
                }, 100);
                return
            }
            e > 0 && this._html_checkWaitForPlay()
        },
        _html_playHead: function (e) {
            var t = this;
            this._html_load();
            try {
                if (typeof this.htmlElement.media.seekable == "object" && this.htmlElement.media.seekable.length > 0) this.htmlElement.media.currentTime = e * this.htmlElement.media.seekable.end(this.htmlElement.media.seekable.length - 1) / 100;
                else {
                    if (!(this.htmlElement.media.duration > 0 && !isNaN(this.htmlElement.media.duration))) throw "e";
                    this.htmlElement.media.currentTime = e * this.htmlElement.media.duration / 100
                }
            } catch (n) {
                this.internal.htmlDlyCmdId = setTimeout(function () {
                    t.playHead(e)
                }, 100);
                return
            }
            this.status.waitForLoad || this._html_checkWaitForPlay()
        },
        _html_checkWaitForPlay: function () {
            this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.video.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _html_volume: function (e) {
            this.html.audio.available && (this.htmlElement.audio.volume = e), this.html.video.available && (this.htmlElement.video.volume = e)
        },
        _html_mute: function (e) {
            this.html.audio.available && (this.htmlElement.audio.muted = e), this.html.video.available && (this.htmlElement.video.muted = e)
        },
        _flash_setAudio: function (t) {
            var n = this;
            try {
                e.each(this.formats, function (e, r) {
                    if (n.flash.support[r] && t[r]) {
                        switch (r) {
                        case "m4a":
                        case "fla":
                            n._getMovie().fl_setAudio_m4a(t[r]);
                            break;
                        case "mp3":
                            n._getMovie().fl_setAudio_mp3(t[r]);
                            break;
                        case "rtmpa":
                            n._getMovie().fl_setAudio_rtmp(t[r])
                        }
                        return n.status.src = t[r], n.status.format[r] = !0, n.status.formatType = r, !1
                    }
                }), this.options.preload === "auto" && (this._flash_load(), this.status.waitForLoad = !1)
            } catch (r) {
                this._flashError(r)
            }
        },
        _flash_setVideo: function (t) {
            var n = this;
            try {
                e.each(this.formats, function (e, r) {
                    if (n.flash.support[r] && t[r]) {
                        switch (r) {
                        case "m4v":
                        case "flv":
                            n._getMovie().fl_setVideo_m4v(t[r]);
                            break;
                        case "rtmpv":
                            n._getMovie().fl_setVideo_rtmp(t[r])
                        }
                        return n.status.src = t[r], n.status.format[r] = !0, n.status.formatType = r, !1
                    }
                }), this.options.preload === "auto" && (this._flash_load(), this.status.waitForLoad = !1)
            } catch (r) {
                this._flashError(r)
            }
        },
        _flash_resetMedia: function () {
            this.internal.flash.jq.css({
                width: "0px",
                height: "0px"
            }), this._flash_pause(NaN)
        },
        _flash_clearMedia: function () {
            try {
                this._getMovie().fl_clearMedia()
            } catch (e) {
                this._flashError(e)
            }
        },
        _flash_load: function () {
            try {
                this._getMovie().fl_load()
            } catch (e) {
                this._flashError(e)
            }
            this.status.waitForLoad = !1
        },
        _flash_play: function (e) {
            try {
                this._getMovie().fl_play(e)
            } catch (t) {
                this._flashError(t)
            }
            this.status.waitForLoad = !1, this._flash_checkWaitForPlay()
        },
        _flash_pause: function (e) {
            try {
                this._getMovie().fl_pause(e)
            } catch (t) {
                this._flashError(t)
            }
            e > 0 && (this.status.waitForLoad = !1, this._flash_checkWaitForPlay())
        },
        _flash_playHead: function (e) {
            try {
                this._getMovie().fl_play_head(e)
            } catch (t) {
                this._flashError(t)
            }
            this.status.waitForLoad || this._flash_checkWaitForPlay()
        },
        _flash_checkWaitForPlay: function () {
            this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.flash.jq.css({
                width: this.status.width,
                height: this.status.height
            })))
        },
        _flash_volume: function (e) {
            try {
                this._getMovie().fl_volume(e)
            } catch (t) {
                this._flashError(t)
            }
        },
        _flash_mute: function (e) {
            try {
                this._getMovie().fl_mute(e)
            } catch (t) {
                this._flashError(t)
            }
        },
        _getMovie: function () {
            return document[this.internal.flash.id]
        },
        _checkForFlash: function (e) {
            var t = !1,
                n;
            if (window.ActiveXObject) try {
                    n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + e), t = !0
            } catch (r) {} else if (navigator.plugins && navigator.mimeTypes.length > 0) {
                n = navigator.plugins["Shockwave Flash"];
                if (n) {
                    var i = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1");
                    i >= e && (t = !0)
                }
            }
            return t
        },
        _validString: function (e) {
            return e && typeof e == "string"
        },
        _limitValue: function (e, t, n) {
            return e < t ? t : e > n ? n : e
        },
        _urlNotSetError: function (t) {
            this._error({
                type: e.jPlayer.error.URL_NOT_SET,
                context: t,
                message: e.jPlayer.errorMsg.URL_NOT_SET,
                hint: e.jPlayer.errorHint.URL_NOT_SET
            })
        },
        _flashError: function (t) {
            var n;
            this.internal.ready ? n = "FLASH_DISABLED" : n = "FLASH", this._error({
                type: e.jPlayer.error[n],
                context: this.internal.flash.swf,
                message: e.jPlayer.errorMsg[n] + t.message,
                hint: e.jPlayer.errorHint[n]
            }), this.internal.flash.jq.css({
                width: "1px",
                height: "1px"
            })
        },
        _error: function (t) {
            this._trigger(e.jPlayer.event.error, t), this.options.errorAlerts && this._alert("Error!" + (t.message ? "\n\n" + t.message : "") + (t.hint ? "\n\n" + t.hint : "") + "\n\nContext: " + t.context)
        },
        _warning: function (n) {
            this._trigger(e.jPlayer.event.warning, t, n), this.options.warningAlerts && this._alert("Warning!" + (n.message ? "\n\n" + n.message : "") + (n.hint ? "\n\n" + n.hint : "") + "\n\nContext: " + n.context)
        },
        _alert: function (e) {
            alert("jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + e)
        },
        _emulateHtmlBridge: function () {
            var t = this;
            e.each(e.jPlayer.emulateMethods.split(/\s+/g), function (e, n) {
                t.internal.domNode[n] = function (e) {
                    t[n](e)
                }
            }), e.each(e.jPlayer.event, function (n, r) {
                var i = !0;
                e.each(e.jPlayer.reservedEvent.split(/\s+/g), function (e, t) {
                    if (t === n) return i = !1, !1
                }), i && t.element.bind(r + ".jPlayer.jPlayerHtml", function () {
                    t._emulateHtmlUpdate();
                    var e = document.createEvent("Event");
                    e.initEvent(n, !1, !0), t.internal.domNode.dispatchEvent(e)
                })
            })
        },
        _emulateHtmlUpdate: function () {
            var t = this;
            e.each(e.jPlayer.emulateStatus.split(/\s+/g), function (e, n) {
                t.internal.domNode[n] = t.status[n]
            }), e.each(e.jPlayer.emulateOptions.split(/\s+/g), function (e, n) {
                t.internal.domNode[n] = t.options[n]
            })
        },
        _destroyHtmlBridge: function () {
            var t = this;
            this.element.unbind(".jPlayerHtml");
            var n = e.jPlayer.emulateMethods + " " + e.jPlayer.emulateStatus + " " + e.jPlayer.emulateOptions;
            e.each(n.split(/\s+/g), function (e, n) {
                delete t.internal.domNode[n]
            })
        }
    }, e.jPlayer.error = {
        FLASH: "e_flash",
        FLASH_DISABLED: "e_flash_disabled",
        NO_SOLUTION: "e_no_solution",
        NO_SUPPORT: "e_no_support",
        URL: "e_url",
        URL_NOT_SET: "e_url_not_set",
        VERSION: "e_version"
    }, e.jPlayer.errorMsg = {
        FLASH: "jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",
        FLASH_DISABLED: "jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ",
        NO_SOLUTION: "No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",
        NO_SUPPORT: "It is not possible to play any media format provided in setMedia() on this browser using your current options.",
        URL: "Media URL could not be loaded.",
        URL_NOT_SET: "Attempt to issue media playback commands, while no media url is set.",
        VERSION: "jPlayer " + e.jPlayer.prototype.version.script + " needs Jplayer.swf version " + e.jPlayer.prototype.version.needFlash + " but found "
    }, e.jPlayer.errorHint = {
        FLASH: "Check your swfPath option and that Jplayer.swf is there.",
        FLASH_DISABLED: "Check that you have not display:none; the jPlayer entity or any ancestor.",
        NO_SOLUTION: "Review the jPlayer options: support and supplied.",
        NO_SUPPORT: "Video or audio formats defined in the supplied option are missing.",
        URL: "Check media URL is valid.",
        URL_NOT_SET: "Use setMedia() to set the media URL.",
        VERSION: "Update jPlayer files."
    }, e.jPlayer.warning = {
        CSS_SELECTOR_COUNT: "e_css_selector_count",
        CSS_SELECTOR_METHOD: "e_css_selector_method",
        CSS_SELECTOR_STRING: "e_css_selector_string",
        OPTION_KEY: "e_option_key"
    }, e.jPlayer.warningMsg = {
        CSS_SELECTOR_COUNT: "The number of css selectors found did not equal one: ",
        CSS_SELECTOR_METHOD: "The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",
        CSS_SELECTOR_STRING: "The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",
        OPTION_KEY: "The option requested in jPlayer('option') is undefined."
    }, e.jPlayer.warningHint = {
        CSS_SELECTOR_COUNT: "Check your css selector and the ancestor.",
        CSS_SELECTOR_METHOD: "Check your method name.",
        CSS_SELECTOR_STRING: "Check your css selector is a string.",
        OPTION_KEY: "Check your option name."
    }
}(jQuery);