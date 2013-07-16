$(function () {
    function C() {
        var r = $(".post");
        e = !1, n = parseInt(r.attr("data-cmt-count"), 10), t = r.attr("data-uuid"), Global.isWeiboApp || (e ? initLogout() : $.cookie("c", window.location.href, {
            domain: ".papa.me",
            path: "/"
        })), F(), Z(), $.browser.msie && $.browser.version == "6.0" && H(), k(), Global.isWeiboApp && $.weiboAppReady()
    }
    function k() {
        g = $(".post-favs");
        if (g.length === 0) return;
        g.data("data", []), $(".favs-next", g).bind("click", {
            action: "next"
        }, L), $(".favs-prev", g).bind("click", {
            action: "prev"
        }, L), g.bind("appendData", function (e, t) {
            var n = g.data("data");
            g.trigger("gotoByIndex", n.length - 1)
        }), g.bind("gotoByIndex", function (e, t) {
            var n = g.data("index") || 0,
                r = g.data("data")[t],
                i;
            n > t ? i = "prev" : n < t ? i = "next" : i = "current", P(r, t, i)
        }), M()
    }
    function L(e) {
        var t = $(e.target);
        if (t.hasClass("favs-disabled")) return;
        A();
        var n = e.data.action,
            r = g.data("index") || 0,
            i = g.data("data");
        if (n === "next") if (i[r + 1]) g.trigger("gotoByIndex", r + 1);
            else {
                var s = i[r].nextCursorId;
                M(s)
            } else n === "prev" && g.trigger("gotoByIndex", r - 1)
    }
    function A() {
        $(".favs-next", g).addClass("favs-disabled"), $(".favs-prev", g).addClass("favs-disabled")
    }
    function O(e) {
        var t = g.data("data");
        t.push(e), g.data("data", t), g.trigger("appendData", e)
    }
    function M(e, n) {
        var r = {
            limit: 7
        };
        !n || (r.limit = 7 - n.length), !e || (r.cursor = e), s ? $.ajax({
            type: "post",
            url: Global.origin + "/favs/" + t,
            data: r,
            success: function (e) {
                e.stateCode >= 0 ? (n && (e.data.favs = n.concat(e.data.favs)), O(e.data)) : B(e.message)
            }
        }) : D()
    }
    function D() {
        var e = Global.postAtJson.length,
            t = Global.postAtJson.splice(0, 7),
            n = {
                favs: [],
                hasNext: !0
            };
        $(t).each(function (e, t) {
            t.isAt = !0, n.favs.push({
                userId: t
            })
        }), 0 == Global.postAtJson.length && (s = !0, 0 == Global.favCount && (n.hasNext = !1)), t.length < 7 ? M(0, n.favs) : O(n)
    }
    function P(e, t, n) {
        var r = [],
            i = e.favs;
        $(i).each(function (e, t) {
            r.push(m({
                pic: t.userId.headImg.s38,
                name: _.escape(t.userId.rawName),
                isAt: t.userId.isAt || !1
            }))
        }), g.data("index", t), t === 0 ? $(".favs-prev", g).addClass("favs-disabled") : $(".favs-prev", g).removeClass("favs-disabled"), e.hasNext ? $(".favs-next", g).removeClass("favs-disabled") : $(".favs-next", g).addClass("favs-disabled"), $(".favs-list", g).html(r.join(""))
    }
    function H() {
        $(window).scroll(function () {
            $(".side").css("top", $(window).scrollTop())
        })
    }
    function B(e) {
        if (!e) return;
        $.modal(e, {
            minWidth: 250
        })
    }
    function j(e, t) {
        function r() {
            var t = (new Date).getTime();
            return e.data.url + "?t=" + t
        }
        function i(e) {
            var t = e.data.dialog
        }
        var n = d({
            pic: r(),
            title: e.message
        });
        $.modal(n, {
            minWidth: 350,
            minHeight: 160,
            onShow: function (e) {
                var n = $(".captcha-dialog");
                $(".captcha-submit", n).click(function () {
                    var e = $(".captcha-code", n),
                        r = $.trim(e.val());
                    if (!r) {
                        e.focus();
                        return
                    }
                    t === "favToggle" ? favToggle(r) : t === "addComment" && K(r), $.modal.close()
                }), $(".captcha-img", n).click(function () {
                    $(this).html('<img src="' + r() + '" />')
                }), $(".captcha-code", n).keydown(function (e) {
                    e.which === 13 && $(".captcha-submit", n).click()
                })
            },
            onClose: function (e) {
                $.modal.close()
            }
        })
    }
    function F() {
        T = $('<div id="audio-jplayer" class="jplayer-container"></div>');
        var e = $("#post-player"),
            t = $(".btn-play", e),
            n = e.data("src"),
            r = {
                audioJplayer: T,
                postPlayer: e,
                playButton: t,
                audioSrc: n
            };
        $.jPlayer.prototype && ($.jPlayer.prototype.seekBar = function () {}), t.hover(function () {
            e.addClass("post-player-hover")
        }, function () {
            e.removeClass("post-player-hover")
        });
        var i = $.jPlayer.event;
        T.jPlayer({
            cssSelectorAncestor: "",
            cssSelector: {
                seekBar: ".audio-seek-bar",
                playBar: ".audio-play-bar"
            },
            solution: "flash,html",
            supplied: "mp3",
            preload: "metadata",
            wmode: "window",
            ready: function () {
                t.click(r, I)
            }
        }), T.bind(i.play, r, q), T.bind(i.pause, r, U), T.bind(i.ended, r, U), T.appendTo(e)
    }
    function I(e) {
        var t = e.data,
            n = t.audioJplayer,
            i = t.audioSrc,
            s = t.playButton;
        s.hasClass("audio-play") ? (r || (W(s, !0), n.jPlayer("setMedia", {
            mp3: i
        })), n.jPlayer("play")) : n.jPlayer("pause")
    }
    function q(e) {
        var n = e.data,
            i = n.playButton,
            s = Global.origin + "/play/" + t;
        W(i, !1), z(i, "pause"), $(this).jPlayer("pauseOthers"), r || ($.post(s, function (e) {
            0 == e.stateCode && R(e.data.playedCount)
        }), r = !0)
    }
    function R(e) {
        var t = $("#play-count"),
            n = $(".play-count-number", t);
        n.text(e), t.removeClass("play-count-zero")
    }
    function U(e) {
        var t = e.data.playButton;
        z(t, "play")
    }
    function z(e, t) {
        t === "play" ? e.removeClass("audio-pause").addClass("audio-play") : t === "pause" && e.removeClass("audio-play").addClass("audio-pause")
    }
    function W(e, t) {
        var n = "audio-loading";
        $("." + n).removeClass(n), t && e.addClass(n)
    }
    function X(e) {
        var t = e.keyCode;
        if (224 === t || 91 === t || 93 === t) i = "keydown" === e.type
    }
    function V(e) {
        if (!e.ctrlKey && !i || e.keyCode != "13") return;
        K()
    }
    function J(e, t) {
        if (!e || !t) return;
        var n = function (e) {
            if (!e.ctrlKey && !i || e.keyCode != "13") return;
            K()
        };
        on(e, "focus", function () {
            on(e, "keydown", n)
        }), on(e, "blur", function () {
            Event.remove(e, "keydown", n)
        })
    }
    function K(e) {
        var n = $(".comment-content"),
            r = n.val(),
            i = $(".comment-submit"),
            s = "\u56de\u5e94",
            o = "\u53d1\u5e03\u4e2d";
        if (i.hasClass("comment-submit-disabled")) return;
        if (!$.trim(r)) {
            n.focus();
            return
        }
        var u = "comment-content-warning",
            a = !! $("#sync-weibo").prop("checked");
        $.cookie("w_sync", a, {
            domain: ".papa.me",
            path: "/",
            expires: 365
        }), i.addClass("comment-submit-disabled"), n.addClass("comment-content-readonly"), i.text(o), n.prop("readonly", !0);
        var f = {
            text: r,
            sync: a,
            at: ""
        }, l = [],
            c = $("#reply-container .reply-user");
        c.each(function (e, t) {
            l.push($(t).data("userid"))
        }), f.at = l.join(","), e && (f.icode = e), $.ajax({
            type: "post",
            url: "/comment/" + t,
            data: f,
            success: function (e) {
                e.stateCode >= 0 ? (n.val("").trigger("autosize"), Q(e.data.comment), rt()) : e.stateCode === -9 ? j(e, "addComment") : B(e.message)
            },
            complete: function () {
                i.removeClass("comment-submit-disabled"), n.removeClass("comment-content-readonly"), i.text(s), n.prop("readonly", !1)
            }
        })
    }
    function Q(t) {
        var n = $(".comment-list"),
            r = vt(+(new Date), t.createTime),
            i = G(t.at),
            s = _.escape(t.author.name),
            o = $(u({
                comment: t,
                _: _,
                is_logined: e,
                pretty_time: r,
                reply_users: i,
                safe_name: s,
                studioEnabled: Global.studioEnabled
            }));
        o.css("display", "none"), o.prependTo(n), o.slideDown(200)
    }
    function G(e) {
        var t = [];
        return e.length > 0 && $(e).each(function (e, n) {
            t.push(n.name)
        }), t.join(" , ")
    }
    function Y() {
        $(".fav-tips").fadeIn(200)
    }
    function Z() {
        a = $(".comment-list"), f = Global.origin + "/comments/" + t, a.delegate(".item-delete", "click", pt), a.delegate(".more-comments", "click", ct);
        var e = $("#reply-container");
        a.delegate(".item-reply", "click", {
            replyContainer: e
        }, nt), e.delegate(".reply-close", "click", tt), a.delegate(".item-accuse", "click", it), a.delegate(".comment-item", "mouseenter mouseleave", et), st(a), n > 0 && ht()
    }
    function et(e) {
        var t = $(e.currentTarget),
            n = t.find(".item-delete").add(t.find(".item-accuse")).add(t.find(".studio-dl-comment"));
        e.type == "mouseenter" ? n.fadeIn(10) : n.fadeOut(10)
    }
    function tt(e) {
        var t = $(e.delegateTarget),
            n = $(e.currentTarget),
            r = t.find(".reply-user");
        r.size() == 1 && t.slideUp(200), n.parent().remove()
    }
    function nt(e) {
        var t = e.data.replyContainer,
            n = $(e.currentTarget),
            r = n.closest(".comment-item"),
            i = r.find(".item-author"),
            s = i.data("userid"),
            o = i.data("name");
        if ($("#id-" + s).size() > 0) return;
        var u = h({
            userId: s,
            _: _,
            userName: o
        });
        t.append(u), t.slideDown(200)
    }
    function rt() {
        var e = $("#reply-container"),
            t = e.find(".reply-user");
        e.slideUp(200, function () {
            t.remove()
        })
    }
    function it(e) {
        var t = $(e.currentTarget),
            n = t.closest(".comment-item"),
            r = n.attr("data-id"),
            i = Global.origin + "/report/comment";
        if (!confirm("\u786e\u5b9a\u8981\u4e3e\u62a5\u8fd9\u6761\u8bc4\u8bba\u5417\uff1f")) return;
        $.ajax({
            type: "post",
            url: i,
            data: {
                cmtUuid: r
            },
            success: function (e) {
                e.stateCode >= 0 ? B("\u4e3e\u62a5\u6210\u529f!") : B(e.message)
            }
        })
    }
    function st(e) {
        var t = "#audio-cmt-jplayer";
        N.init(t), N.dom.on("audio::play", ut), N.dom.on("audio::pause", at), N.dom.on("audio::ended", at), e.delegate(".item-player", "click", ot)
    }
    function ot(e) {
        var t = $(e.currentTarget),
            n = t.closest(".comment-item"),
            r = n.attr("data-id"),
            i = t.attr("data-src"),
            s = $(".item-player-btn", t);
        s.hasClass("item-btn-play") ? (W(s, !0), N.play({
            source: i,
            label: r
        })) : N.pause()
    }
    function ut() {
        var e = N.label,
            t = N.prevLabel;
        T && T.jPlayer("pause"), t && e !== t && ft(t), W("btn", !1), lt(e)
    }
    function at() {
        var e = N.label;
        ft(e)
    }
    function ft(e) {
        var t = $("#comment-" + e),
            n = $(".item-player-btn", t);
        n.removeClass("item-btn-pause").addClass("item-btn-play").removeClass("item-btn-loading")
    }
    function lt(e) {
        var t = $("#comment-" + e),
            n = $(".item-player-btn", t);
        n.removeClass("item-btn-play").addClass("item-btn-pause").removeClass("item-btn-loading")
    }
    function ct() {
        var e = "\u52a0\u8f7d\u4e2d...";
        if ($(".more-comments").html() === e) return;
        $(".more-comments").html(e);
        var t = a.data("cursor");
        ht(t)
    }
    function ht(e) {
        var t = {
            limit: 20
        };
        e && (t.cmtUuid = e), $.ajax({
            type: "post",
            url: f,
            data: t,
            success: function (e) {
                e.stateCode >= 0 ? dt(e.data) : B(e.message)
            }
        })
    }
    function pt(e) {
        var t = $(e.currentTarget),
            n = t.closest(".comment-item"),
            r = n.attr("data-id"),
            i = Global.origin + "/comment/del";
        if (!confirm("\u786e\u5b9a\u8981\u5220\u9664\u8fd9\u6761\u8bc4\u8bba\u5417\uff1f")) return;
        $.ajax({
            type: "post",
            url: i,
            data: {
                cmtUuid: r
            },
            success: function (e) {
                e.stateCode >= 0 ? (t.hide(), $(n).slideUp(200, function () {
                    $(n).remove()
                })) : B(e.message)
            }
        })
    }
    function dt(t) {
        var n = $(".comment-list"),
            r = t.comments,
            i = [],
            s, o = +(new Date);
        r && r.length > 0 && $(r).each(function (t, n) {
            var r = vt(o, n.createTime),
                s = G(n.at),
                a = _.escape(n.author.name),
                f = u({
                    comment: n,
                    _: _,
                    pretty_time: r,
                    is_logined: e,
                    reply_users: s,
                    safe_name: a,
                    studioEnabled: Global.studioEnabled
                });
            i.push(f)
        }), s = i.join(""), $(".comment-item", n).length < 1 ? n.html(s) : n.append(s), $(".more-comments").remove(), t.hasNext && n.append(l), a.data("cursor", null), t.nextCmtId && a.data("cursor", t.nextCmtId)
    }
    function vt(e, t) {
        var n = Math.abs(e - t),
            r;
        return n >= x ? r = Math.floor(n / x) + "\u5e74\u524d" : n >= S ? r = Math.floor(n / S) + "\u6708\u524d" : n >= E ? r = Math.floor(n / E) + "\u5929\u524d" : n >= w ? r = Math.floor(n / w) + "\u5c0f\u65f6\u524d" : n >= b ? r = Math.floor(n / b) + "\u5206\u949f\u524d" : r = Math.floor(n / y) + "\u79d2\u524d", r || alert(e + "--" + t), r
    }
    var e, t, n, r = !1,
        i = !1,
        s = !1,
        o = '<div id="comment-<%= comment.id %>" data-id="<%= comment.id %>" class="comment-item"><img class="item-avatar" src="<%= comment.author.headImg.s38 %>" /><span class="item-author" data-userid="<%= comment.author.id%>" data-name="<%= safe_name %>"><%= comment.author.name %><% if (reply_users) { %><span calss="item-reply-users"> \u56de\u590d <%= reply_users %></span><% } %> : </span><% if (comment.type === "Text") { %><span class="item-content"><%= comment.extra %></span><% } else if (comment.type === "Audio") { %><span class="item-player" data-src="<%= comment.extra.url %>" style="width:<%= 70 + comment.extra.length * 1.5 %>px;"><span class="item-player-inner"><span class="item-player-length"><%= comment.extra.length %>"</span></span><span class="item-player-btn item-btn-play"></span><span class="item-player-corner"></span></span><% } %><span class="item-datetime"><%= pretty_time %></span><div class="item-action"><% if (comment.userCanDel) { %><span class="item-delete" title="\u5220\u9664">\u5220\u9664</span><% } %><% if (comment.type === "Audio" && studioEnabled) { %><a class="studio-dl-comment" target="_blank" href="<%= comment.extra.url %>">\u4e0b\u8f7d</a><% } %><% if (is_logined && comment.canReply ) { %><span class="item-accuse" title="\u4e3e\u62a5">\u4e3e\u62a5</span><span class="item-reply" title="\u56de\u5e94">\u56de\u5e94</span><% } %></div></div>',
        u = _.template(o),
        a, f, l = '<div class="more-comments">\u52a0\u8f7d\u66f4\u591a\u8bc4\u8bba</div>',
        c = '<div class="reply-user" id="id-<%= userId%>" data-userid="<%= userId%>"><%= userName%><span class="reply-close"></span></div>',
        h = _.template(c),
        p = '<div class="captcha-dialog"><div class="title"><%= title %></div><div class="captcha-ct clearfix"><div class="captcha-img"><img src="<%= pic %>" /></div><input class="captcha-code" type="text" /></div><div class="dialog-submit captcha-submit">\u786e\u5b9a</div></div>',
        d = _.template(p),
        v = '<% if (isAt == true) { %><div class="at-item"><img src="<%= pic %>" title="<%= name %>" /><span class="at-icon">@</span></div><% } else { %><div class="favs-item"><img src="<%= pic %>" title="<%= name %>" /><span class="favs-icon">\u559c\u6b22</span></div><% } %>',
        m = _.template(v),
        g, y = 1e3,
        b = 60 * y,
        w = 60 * b,
        E = 24 * w,
        S = 30 * E,
        x = 365 * S,
        T = null,
        N = function () {
            var e = {
                inited: !1,
                source: null,
                label: null,
                prevLabel: null,
                dom: null
            };
            return e.init = function (t) {
                e.dom = $(t), e.dom.jPlayer({
                    ready: function () {
                        e.inited = !0
                    },
                    cssSelectorAncestor: "",
                    supplied: "mp3",
                    preload: "metadata",
                    wmode: "window"
                }), e.dom.bind($.jPlayer.event.play, function () {
                    e.dom.trigger("audio::play")
                }), e.dom.bind($.jPlayer.event.pause, function () {
                    e.dom.trigger("audio::pause")
                }), e.dom.bind($.jPlayer.event.ended, function () {
                    e.dom.trigger("audio::ended")
                })
            }, e.play = function (t) {
                t = t || {}, t.source && e.setSource(t.source), t.label && (e.prevLabel = e.label, e.label = t.label)
            }, e.setSource = function (t) {
                e.source = t, e.dom.jPlayer("setMedia", {
                    mp3: t
                }), e.dom.jPlayer("play")
            }, e.pause = function () {
                e.dom.jPlayer("pause"), e.dom.jPlayer("pauseOthers")
            }, e
        }();
    C()
});