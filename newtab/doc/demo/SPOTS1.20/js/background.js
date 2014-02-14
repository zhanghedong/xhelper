/**
 * Spots - 2014-01-28
 * http://spotsmagic.com
 *
 * Copyright (c) 2014 ironSource
 * Licensed Commercial <http://spotsmagic.com/terms>
 */
function getUrlParam(a, b) {
    var c = new RegExp(b + "=[-a-z0-9]+");
    if (!c.exec(a))return!1;
    var d = c.exec(a)[0].split("=")[1];
    return d
}
var configAPI = function () {
    function a(a) {
        j = new IDBStore({dbVersion: "3", storeName: "CONFIG", keyPath: "id", onStoreReady: function () {
            j.getAll(function (b) {
                angular.forEach(b, function (a) {
                    config[a.id] = a.value
                }), a && a()
            })
        }})
    }

    function b(a) {
        return config[a]
    }

    function c(a, b) {
        config[a] = b, j.put({id: a, value: b})
    }

    function d(a, c) {
        _.isUndefined(b(a)) && (config[a] = c)
    }

    function e(a) {
        _.each(a, function (a, b) {
            c(b, a)
        })
    }

    function f(a) {
        _.each(a, function (a, b) {
            d(b, a)
        })
    }

    function g() {
        return config
    }

    function h(a) {
        delete config[a], j.remove(a)
    }

    function i() {
        j.clear()
    }

    var j;
    return{init: a, get: b, set: c, remove: h, restoreDefaults: i, setDefault: d, setMultiple: e, setMultipleDefault: f, getConfig: g}
}(), config = {};
configAPI.setDefault("version", chrome.runtime.getManifest().version), configAPI.setDefault("spots_android_app_id", "com.friedcookie.spots"), configAPI.setDefault("analytics_account", "UA-43049468-1"), configAPI.setDefault("cb", "?cb=0.1.20"), configAPI.setDefault("spots_list",
    ["favorites", "phone", "search", "gallery", "facebook", "weather"]),
    configAPI.setDefault("module_import_list",
        ["idb", "tabs", "spotsAPI", "spotsManager", "pushService", "eventManager", "user", "googlePlayUtils", "_gaq",
            "ftueAPI", "graphicAssets", "urls", "notificationManager", "reviewAPI", "utilsAPI", "configAPI", "userVoice",
            "weather", "languageManager"]),
    configAPI.setDefault("enable_encryption", !0),
    configAPI.setDefault("token_valid_time", 6048e5),
    configAPI.setDefault("token_renew_attempts", 10),
    configAPI.setDefault("XcuKmtcfTV", "3E79D1AF7DB595d7"),
    configAPI.setDefault("GiAkudhLmD", "o6kitqcp710opjwh"),
    configAPI.setDefault("YWqhdVVDwi", "6xpslt05kh8ofm7h"),
    configAPI.setDefault("idp", ""),
    configAPI.setDefault("hasAndroidDevices", !1),
    configAPI.setDefault("didLogin", !1),
    configAPI.setDefault("InstalledAndroidApp", !1),
    configAPI.setDefault("cleanupEventListenersInterval", 3e5),
    configAPI.setDefault("idb_version", 19),
    configAPI.setDefault("idb_tables", ["SPOTS_DATA", "SERVER_QUEUE", "MAGIC_DATA", "COLOR_PICKER_CACHE", "NOTIFICATIONS"]),
    configAPI.setDefault("opentab_enabled", !0), configAPI.setDefault("opentab_toggle_key_code", 27),
    configAPI.setDefault("opentab_toggle_key_timeout", 500), configAPI.setDefault("opentab_sensitivity_L", .2),
    configAPI.setDefault("opentab_sensitivity_R", .2),
    configAPI.setDefault("opentabCSS", {before: ["/app/opentab/css/opentab.css", "/app/opentab/css/ftue.css"],
        after: ["/app/opentab/css/opentab_images.css"]}),
    configAPI.setDefault("showPhone", !0), configAPI.setDefault("url_www", "http://spotsmagic.com"),
    configAPI.setDefault("baseUpdatePageUrl", "http://spotsmagic.com/updates/chrome/"),
    configAPI.setDefault("url_api", "https://api.spotsmagic.com"),
    configAPI.setDefault("url_pushServer", "http://push.spotsmagic.com/subscribe?events="),
    configAPI.setDefault("url_auth_complete", "https?://(www.)?api.spotsmagic.com/auth_complete.*"),
    configAPI.setDefault("static_redirects_json", "https://s3.amazonaws.com/static.addon.speedial.com/spt/config/redirects.json"),
    configAPI.setDefault("redirects_autopull_interval", 864e5), configAPI.setDefault("url_hoolapp", "http://api.hoolapp.com/query.php"),
    configAPI.setDefault("url_products_search", "http://hamstersprd.spotsmagic.com/search/"),
    configAPI.setDefault("color_picker_api", "http://picker.spotsmagic.com/?cb=" + config.version + "&url=http://"),
    configAPI.setDefault("privacyPolicyLink", "http://spotsmagic.com/privacy-policy"),
    configAPI.setDefault("termsOfUseLink", "http://spotsmagic.com/terms-of-use"),
    configAPI.setDefault("geolocationServiceUrl", "http://ip-api.com/json"),
    configAPI.setDefault("weatherAPI", "http://api.openweathermap.org/data/2.5/weather"),
    configAPI.setDefault("api_autoPostTimer", 6e3), configAPI.setDefault("themes", [
    {thumb: "/img/themes/strips/thumb.png", settings: {bgColor: "#03DDDD", themeColor: "#00B6B7", accentColor: "#C046FF", bgImage: "/img/themes/strips/bg.png", bgFooter: "/img/themes/strips/footer.png", bgFooterHeight: 300, favoritesOpacity: .8, favoritesMargin: 10, favoritesBorder: 0}},
    {thumb: "/img/themes/fishing/thumb.png", settings: {bgColor: "#FEE7CA", themeColor: "#C046FF", accentColor: "#00B6B7", bgImage: "/img/themes/fishing/bg.png", bgFooter: "/img/themes/fishing/footer.png", bgFooterHeight: 457, favoritesOpacity: .8, favoritesMargin: 6, favoritesBorder: 2}},
    {thumb: "/img/themes/space/thumb.png", settings: {bgColor: "#88A5ED", themeColor: "#978F8A", accentColor: "#3B7CFF", bgImage: "/img/themes/space/bg.png", bgFooter: "/img/themes/space/footer.png", bgFooterHeight: 365, favoritesOpacity: 1, favoritesMargin: 11, favoritesBorder: 4}},
    {thumb: "/img/themes/forest/thumb.png", settings: {bgColor: "#77A1ED", themeColor: "#009A9C", accentColor: "#00006F", bgImage: "/img/themes/forest/bg.png", bgFooter: "/img/themes/forest/footer.png", bgFooterHeight: 282, favoritesOpacity: .9, favoritesMargin: 6, favoritesBorder: 2}},
    {thumb: "/img/themes/bubbles/thumb.png", settings: {bgColor: "#85E0D7", themeColor: "#C046FF", accentColor: "#FF5FDC", bgImage: "/img/themes/bubbles/bg.png", bgFooter: "/img/themes/bubbles/footer.png", bgFooterHeight: 341, favoritesOpacity: .5, favoritesMargin: 10, favoritesBorder: 0}},
    {thumb: "/img/themes/sunset/thumb.png", settings: {bgColor: "#BDE5A6", themeColor: "#FF6B00", accentColor: "#3B7CFF", bgImage: "/img/themes/sunset/bg.png", bgFooter: "/img/themes/sunset/footer.png", bgFooterHeight: 300, favoritesOpacity: 1, favoritesMargin: 0, favoritesBorder: 1}},
    {thumb: "/img/themes/disco/thumb.png", settings: {bgColor: "#C57FE2", themeColor: "#00B6B7", accentColor: "#FF007F", bgImage: "/img/themes/disco/bg.png", bgFooter: "/img/themes/disco/footer.png", bgFooterHeight: 407, favoritesOpacity: 1, favoritesMargin: 11, favoritesBorder: 2}},
    {thumb: "/img/themes/mountains/thumb.png", settings: {bgColor: "#BBD1FF", themeColor: "#3B7CFF", accentColor: "#FF007F", bgImage: "/img/themes/mountains/bg.png", bgFooter: "/img/themes/mountains/footer.png", bgFooterHeight: 300, favoritesOpacity: .8, favoritesMargin: 2, favoritesBorder: 0}},
    {thumb: "/img/themes/city/thumb.png", settings: {bgColor: "#BEEFFC", themeColor: "#E25200", accentColor: "#3B7CFF", bgImage: "/img/themes/city/bg.png", bgFooter: "/img/themes/city/footer.png", bgFooterHeight: 350, favoritesOpacity: .75, favoritesMargin: 6, favoritesBorder: 2}},
    {thumb: "/img/themes/buttons/thumb.png", settings: {bgColor: "#F2E9D3", themeColor: "#DD0065", accentColor: "#00B6B7", bgImage: "/img/themes/buttons/bg.png", bgFooter: "/img/themes/buttons/footer.png", bgFooterHeight: 234, favoritesOpacity: .9, favoritesMargin: 6, favoritesBorder: 2}},
    {thumb: "/img/themes/sea/thumb.png", settings: {bgColor: "#DBEAE3", themeColor: "#00B6B7", accentColor: "#E61F00", bgImage: "/img/themes/sea/bg.png", bgFooter: "/img/themes/sea/footer.png", bgFooterHeight: 370, favoritesOpacity: .9, favoritesMargin: 10, favoritesBorder: 0}},
    {thumb: "/img/themes/planets/thumb.png", settings: {bgColor: "#FFCB27", themeColor: "#FF007F", accentColor: "#FF892B", bgImage: "/img/themes/planets/bg.png", bgFooter: "/img/themes/planets/footer.png", bgFooterHeight: 358, favoritesOpacity: 1, favoritesMargin: 2, favoritesBorder: 0}}
]), configAPI.setDefault("css_list", []), configAPI.setDefault("clockHourFormat", "H:mm"), configAPI.setMultipleDefault(config.themes[0].settings), configAPI.setDefault("bgImage", null), configAPI.setDefault("bgColor", "#efefef"), configAPI.setDefault("bgFooter", null), configAPI.setDefault("themeColor", "#0082D4"), configAPI.setDefault("accentColor", "#4C4540"), configAPI.setDefault("phoneSpeaker", !0), configAPI.setDefault("favoritesOpacity", .8), configAPI.setDefault("navbarOpacity", 1), configAPI.setDefault("favoritesMargin", 10), configAPI.setDefault("favoritesBorder", 0), configAPI.setDefault("favoritesShadow", .07), configAPI.setDefault("favoritesLetterCount", 2), configAPI.setDefault("topSitesItems", 10), configAPI.setDefault("favoritesOpenInNewTab", !1), configAPI.setDefault("notificationNewtabAutoRotate", 5e3), configAPI.setDefault("hidePhone", !1), configAPI.setDefault("opentabSearchHandlePosition", .08), configAPI.setDefault("phone_call_notifications", "all"), configAPI.setDefault("phone_sms_notifications", !0), configAPI.setDefault("gallery_local_data_path", "/app/spots/gallery/data/gallery.json"), configAPI.setDefault("gallery_remote_data_path", "https://s3.amazonaws.com/IL-spots-gallery/gallery_v4.json"), configAPI.setDefault("gallery_autopull_interval", 864e5), configAPI.setDefault("gallery_min_updateFailTimeout", 5e3), configAPI.setDefault("gallery_max_updateFailTimeout", 216e5), configAPI.setDefault("languagesOptions", ["de", "en", "es", "fr", "he", "it", "ja", "nl", "pl", "pt", "ru", "tr"]), configAPI.setDefault("mostVisitedHideList", []), configAPI.setDefault("ftueOpentab", {isShow: !1, step: 1});
var utils = function () {
    "use strict";
    var a = chrome.app.getDetails(), b = a.version, c = a.id, d = chrome.i18n.getMessage("@@ui_locale"), e = d.substr(0, 2), f = function () {
        var a = navigator.userAgent.toLowerCase();
        return/windows nt 5.0/.test(a) ? "win2K" : /windows nt 5.0/.test(a) ? "winXP" : /windows nt 6.0/.test(a) ? "vista" : /windows nt 6.1/.test(a) ? "win7" : void 0
    }();
    return{os: function () {
        return f
    }, getMessage: function (a) {
        return chrome.i18n.getMessage(a)
    }, getOrigin: function () {
        return chrome.extension.getURL("")
    }, getURL: function (a) {
        return chrome.extension.getURL(a)
    }, getPage: function (a) {
        return this.getURL("/content/" + a + ".html")
    }, getFileURL: function (a) {
        return"filesystem:chrome-extension://" + c + "/persistent/" + a
    }, getFavIconURL: function (a) {
        return"chrome://favicon/" + a
    }, id: function () {
        return c
    }, version: function () {
        return b
    }, locale: function () {
        return d
    }, language: function () {
        return e
    }, get: function (a) {
        return localStorage["data." + a]
    }, set: function (a, b) {
        localStorage["data." + a] = b
    }, remove: function (a) {
        delete localStorage["data." + a]
    }}
}(), urls = function () {
    function a(a) {
        return/^(http:\/\/|https:\/\/|ftp:\/\/)/.test(a)
    }

    function b(a) {
        var b = a.replace(" ", "");
        return/^[a-zA-Z0-9_]+$/.test(b) && (b += ".com"), b = b.replace(/\/$/, "")
    }

    function c(a) {
        var b = h(a);
        S(b).startsWith("www.") && (b = b.substr(4));
        var c = b.length, d = b.substr(c - 4), e = b.substr(c - 7, 5), f = b.substr(c - 6, 4);
        return[".com", ".net", ".org", ".gov", ".edu"].indexOf(d) >= 0 ? b = b.substring(0, c - 4) : [".com.", ".net.", ".org.", ".gov", ".edu."].indexOf(e) >= 0 ? b = b.substring(0, c - 7) : [".co.", ".ac.", ".org.", ".gov", ".edu."].indexOf(f) >= 0 && (b = b.substring(0, c - 6)), b = S(b).contains(".") ? S(b).replaceAll(".", " ").humanize().capitalize().s : 3 == b.length ? b.toUpperCase() : S(b).replaceAll(".", " ").humanize().capitalize().s
    }

    function d(b) {
        var c = b;
        return/^[a-zA-Z0-9_]+$/.test(c) && (c += ".com"), c = c.replace(/\/$/, ""), a(c) || (c = "http://" + c), c
    }

    function e(a) {
        var b = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
        return b.test(a) ? !0 : !1
    }

    function f(a) {
        var b = a.match(/\[(.*?)\]/g);
        if ("object" == typeof b)for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d = d.substr(1, d.length - 2);
            var e = config[d];
            void 0 == e && (e = "");
            var f = new RegExp("\\[" + d + "\\]", "gi");
            a = a.replace(f, e)
        }
        var b = a.match(/\((.*?)\)/g);
        if ("object" == typeof b)for (var c = 0; c < b.length; c++) {
            var d = b[c];
            d = d.substr(1, d.length - 2);
            var e = user[d];
            void 0 == e && (e = "");
            var f = new RegExp("\\(" + d + "\\)", "gi");
            a = a.replace(f, e)
        }
        return a
    }

    function g(b) {
        return a(b) ? b : "http://" + b
    }

    function h(a, b) {
        a = g(a);
        var c = document.createElement("a");
        c.href = a;
        var d = c.hostname;
        return b && d.indexOf("www.") >= 0 ? d.substr(4) : d
    }

    function i(a, b) {
        var c = new RegExp(b + "=[-A-Za-z0-9]+");
        if (!c.exec(a))return!1;
        var d = c.exec(a)[0].split("=")[1];
        return d
    }

    function j(a) {
        var b = urls.getHostName(a);
        b = b.replace("www.", "");
        for (var c = !1; !c && -1 !== b.lastIndexOf(".");) {
            var d = b.lastIndexOf(".");
            b.length - d <= 4 ? b = b.substr(0, d) : c = !0
        }
        return b
    }

    function k(a, b) {
        var c = j(a), d = c.split("").join("\\s?");
        d = new RegExp(d, "i");
        var e = d.exec(b);
        return e ? e[0] : b = b.split("|")[0]
    }

    function l(a, b) {
        m && m.abort(), a = g(a), m = $.ajax(a, {dataType: "text", type: "GET", success: function (c) {
            var d = c.match(/<title>(.*?)<\/title>/);
            if (d) {
                var e = d[1];
                if (e) {
                    var f = urls.getPrettyTitle(a, e);
                    f ? b(f) : b(e)
                } else b(j(a))
            } else b(j(a))
        }, error: function () {
            b(null)
        }})
    }

    var m;
    return{hasProtocol: a, name2host: b, url2name: c, getFullURL: d, isValidUrl: e, buildURL: f, ensureURL: g, getHostName: h, urlParameter: i, getBaseDomain: j, getPrettyTitle: k, getTitleByUrl: l}
}(), window = this;
!function () {
    window.stats = 0 == Math.floor(100 * Math.random() / configAPI.get("ga.samplerate")) ? !0 : !1, window.trackEvent = function (a, b, c, d) {
        if (!d || window.stats) {
            window._gaq = window._gaq || [];
            var b = null == b || "" == b ? "-" : b, c = null == c || "" == c ? null : c + "";
            try {
                _gaq.push(["_trackEvent", a, b, c])
            } catch (e) {
            }
        }
    }
}(), function () {
    var a = function () {
        var a = "v" + parseFloat(utils.version()).toFixed(1), b = configAPI.get("uref") ? " (" + configAPI.get("uref") + ")" : "";
        return a + b
    }(), b = function () {
        return utils.id().substring(0, 4) + " " + a
    }();
    window.trackUrefEvent = function (b, c) {
        trackEvent(b, a, c, !0)
    }, window.trackBuildEvent = function (a, c) {
        trackEvent(a, b, c, !0)
    }
}();
var _gaq = _gaq || [];
_gaq.push(["_setAccount", config.analytics_account]), _gaq.push(["_setDomainName", "none"]), _gaq.push(["_setSessionCookieTimeout", 18e5]);
var trackBackgroundPage = function () {
    _gaq.push(["_setCustomVar", 1, "UUID", config.uuid, 1]), _gaq.push(["_setCustomVar", 2, "Logged In", config.didLogin.toString(), 1]), _gaq.push(["_setCustomVar", 3, "Has Devices", config.hasAndroidDevices.toString(), 1]), _gaq.push(["_setCustomVar", 4, "Installed Spots App", config.InstalledAndroidApp.toString(), 1]), _gaq.push(["_setCustomVar", 5, "Referred By", config.ReferredBy, 1]), _gaq.push(["_trackPageview"]), _gaq.push(["_trackEvent", "Background", "version", config.version])
};
setInterval(function () {
    trackBackgroundPage()
}, 15e5), trackBackgroundPage(), function () {
    var a = document.createElement("script");
    a.type = "text/javascript", a.async = !0, a.src = "https://ssl.google-analytics.com/ga.js";
    var b = document.getElementsByTagName("script")[0];
    b.parentNode.insertBefore(a, b)
}();
var storage = function () {
    "use strict";
    return{get: function (a, b) {
        chrome.storage.local.get(a, function (c) {
            b(c[a])
        })
    }, set: function (a, b, c) {
        var d = {};
        d[a] = b, chrome.storage.local.set(d, c)
    }, remove: function (a, b) {
        chrome.storage.local.remove(a, b)
    }}
}(), fsUtils = function () {
    "use strict";
    function a(a) {
        var b = "";
        switch (a.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                b = "QUOTA_EXCEEDED_ERR";
                break;
            case FileError.NOT_FOUND_ERR:
                b = "NOT_FOUND_ERR";
                break;
            case FileError.SECURITY_ERR:
                b = "SECURITY_ERR";
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                b = "INVALID_MODIFICATION_ERR";
                break;
            case FileError.INVALID_STATE_ERR:
                b = "INVALID_STATE_ERR";
                break;
            default:
                b = "Unknown Error"
        }
    }

    function b(a) {
        for (var b = ";base64,", c = a.indexOf(b) + b.length, d = a.substring(c), e = window.atob(d), f = e.length, g = new Uint8Array(new ArrayBuffer(f)), h = 0; f > h; h++)g[h] = e.charCodeAt(h);
        return g
    }

    function c(b, c, d, e, f) {
        var g = window.requestFileSystem || window.webkitRequestFileSystem;
        g(window.PERSISTENT, null, function (g) {
            g.root.getDirectory(b, {create: !0}, function (b) {
                b.getFile(c, {create: !0}, function (b) {
                    b.createWriter(function (a) {
                        a.onwriteend = function () {
                            e && e()
                        }, a.onerror = function () {
                            f && f()
                        }, a.write(d)
                    }, a)
                }, a)
            }, a)
        }, a)
    }

    return{listFiles: function (b, c) {
        var d = window.requestFileSystem || window.webkitRequestFileSystem;
        d(window.PERSISTENT, null, function (d) {
            d.root.getDirectory(b, {create: !0}, function (b) {
                var d = b.createReader();
                d.readEntries(function (a) {
                    for (var b = Array.prototype.slice.call(a || [], 0), d = [], e = 0; e < b.length; e++)d.push(b[e].name);
                    c(d)
                }, a)
            }, a)
        }, a)
    }, saveImage: function (a, d, e, f, g) {
        var h = b(e), i = new Blob([h.buffer], {type: "image/png"});
        c(a, d, i, f, g)
    }, removeDir: function (b) {
        var c = window.requestFileSystem || window.webkitRequestFileSystem;
        c(window.PERSISTENT, null, function (c) {
            c.root.getDirectory(b, {create: !1}, function (b) {
                b.removeRecursively(function () {
                }, a)
            }, a)
        }, a)
    }, rename: function (b, c, d) {
        var e = window.requestFileSystem || window.webkitRequestFileSystem;
        e(window.PERSISTENT, null, function (e) {
            e.root.getDirectory(b, {create: !0}, function (b) {
                b.getFile(c, {}, function (a) {
                    a.moveTo(b, d)
                }, a)
            })
        }, a)
    }, removeFile: function (b, c) {
        var d = window.requestFileSystem || window.webkitRequestFileSystem;
        d(window.PERSISTENT, null, function (d) {
            d.root.getDirectory(b, {create: !0}, function (b) {
                b.getFile(c, {create: !1}, function (b) {
                    b.remove(function () {
                    }, a)
                }, a)
            }, a)
        }, a)
    }}
}(), browserUtils = function () {
    "use strict";
    function a(a) {
        k = !0;
        for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b].id;
            null != g[d] && chrome.windows.remove(d)
        }
        setTimeout(function () {
            k = !1
        }, 2e3)
    }

    function b(a, b, c) {
        if (null != g[a] && null != g[a].callback) {
            var d = g[a].callback;
            delete g[a].callback, setTimeout(function () {
                d(b, c)
            }, 0)
        }
    }

    function c(a) {
        null != g[a] && (chrome.windows.remove(a), setTimeout(function () {
            d()
        }, 100), window.clearTimeout(g[a].timeout))
    }

    function d(a) {
        if (null == a && i >= 3)return setTimeout(d, 5e3), void 0;
        if (null != a || 0 != h.length) {
            var a = a || h.shift(), e = a.url, f = a.ref, k = a.callback;
            i++, chrome.windows.create({url: e, focused: !1, type: "popup", left: 9999, top: 9999, height: 1, width: 1}, function (a) {
                var d = setTimeout(function () {
                    b(a.id, null, null), c(a.id)
                }, 9e4);
                j[f] = a.id, g[a.id] = {timeout: d, ref: f, callback: k}, chrome.windows.update(a.id, {top: 9999, left: 9999})
            })
        }
    }

    function e(a) {
        var d = a.windowId;
        null != g[d] && chrome.tabs.executeScript(a.id, {file: "/content/browser/misc/screenshot.inject.js"}, function () {
            null != g[d] && chrome.windows.update(d, {width: 1240, height: 885}, function () {
                setTimeout(function () {
                    null != g[d] && chrome.tabs.captureVisibleTab(d, {format: "png", quality: 100}, function (e) {
                        b(d, a.title, e), c(d)
                    })
                }, 1500)
            })
        })
    }

    function f(a) {
        if ("complete" == a.status) {
            var b = a.windowId;
            null != g[b] && chrome.tabs.query({windowId: a.windowId}, function (b) {
                1 == b.length && e(a)
            })
        }
    }

    var g = {}, h = [], i = 0, j = {}, k = !1;
    return chrome.windows.onRemoved.addListener(function (b) {
        if (null != g[b]) {
            if (null != g[b].callback) {
                var c = g[b].callback;
                delete g[b].callback, setTimeout(c, 0)
            }
            return i--, delete j[g[b].ref], delete g[b], void 0
        }
        if (!k) {
            var d = !1;
            chrome.windows.getAll({populate: !1}, function (b) {
                for (var c = 0, e = b.length; e > c; c++) {
                    var f = b[c].id;
                    if (null == g[f]) {
                        d = !0;
                        break
                    }
                }
                d || a(b)
            })
        }
    }), chrome.tabs.onUpdated.addListener(function (a, b, c) {
        f(c)
    }), {cancelCaptureURL: function (a) {
        null != j[a] && c(j[a])
    }, captureURL: function (a, b) {
        var c = a.url, e = a.force, f = pfCdKTvBBb.MZvBtJLOIe(c + (new Date).getTime()).toString(), g = {ref: f, url: c, callback: b};
        return e ? d(g) : (h.push(g), d()), f
    }, captureTab: function (a, b) {
        chrome.tabs.getSelected(null, function (c) {
            chrome.tabs.update(a, {active: !0}, function (a) {
                chrome.tabs.captureVisibleTab(a.windowId, {format: "png", quality: 100}, function (d) {
                    chrome.tabs.update(c.id, {active: !0}, function () {
                        b(a.title, a.url, d)
                    })
                })
            })
        })
    }}
}(), extensionUtils = function () {
    "use strict";
    return{getDetails: function (a) {
        a(chrome.app.getDetails())
    }, uninstall: function (a) {
        var b = chrome.app.getDetails().id;
        chrome.management.uninstall(b, a)
    }}
}(), webappsUtils = function () {
    "use strict";
    return{list: function (a) {
        chrome.management.getAll(function (b) {
            var c = _.filter(b, function (a) {
                return a.isApp && a.enabled
            });
            _.each(c, function (a) {
                a.icon = _.max(a.icons,function (a) {
                    return a.size
                }).url
            }), a(c)
        })
    }, launch: function (a) {
        chrome.management.launchApp(a.id)
    }, uninstall: function (a, b) {
        chrome.management.uninstall(a, b)
    }}
}(), readitlater = function () {
    "use strict";
    function a() {
        var a = {}, b = [
            ["http://www.jamieoliver.com/recipes/risotto", "Risotto Recipes | Mushroom risotto, cheese risotto & more"],
            ["http://www.digitaltrends.com/mobile/cell-phone-buying-guide/", "How to choose a smartphone | Cell phone buying guide"],
            ["http://gizmodo.com/5949625/how-to-get-the-most-out-of-google-chrome", "How to Get the Most Out of Google Chrome"],
            ["http://www.travelsmith.com/webapp/wcs/stores/servlet/TravelSmith/US/TravelCenter/guide-packing-checklist/landing-path?redirect=y", "What To Pack - Travel Packing Checklist"]
        ], c = new Date;
        c = c.setDate(c.getDate() - 10), c = new Date(c).toDateString();
        for (var d = 0; d < b.length; d++) {
            var e = b[d], f = e[0], g = e[1], h = pfCdKTvBBb.MZvBtJLOIe(f).toString();
            a[h] = {title: g, url: f, date: c}
        }
        return a
    }

    function b(b) {
        storage.get("rit", function (c) {
            void 0 === c ? b(a()) : b(c)
        })
    }

    function c(a, b) {
        storage.set("rit", a, b)
    }

    function d() {
        return(new Date).toDateString()
    }

    function e(a, e, f) {
        b(function (b) {
            var g = pfCdKTvBBb.MZvBtJLOIe(e).toString(), h = d();
            b[g] = {title: a, url: e, date: h}, c(b, f)
        })
    }

    return{add: function (a, b, c) {
        e(a, b, c)
    }, update: function (a, d, e, f) {
        b(function (b) {
            try {
                var g = pfCdKTvBBb.MZvBtJLOIe(a).toString();
                b[g][d] = e, c(b, f)
            } catch (h) {
            }
        })
    }, remove: function (a, d) {
        b(function (b) {
            try {
                var e = pfCdKTvBBb.MZvBtJLOIe(a).toString();
                delete b[e], c(b, d)
            } catch (f) {
            }
        })
    }, get: function (a) {
        b(function (b) {
            var c = [];
            for (var d in b) {
                var e = b[d], f = {url: e.url, title: e.title, date: e.date, favIconUrl: utils.getFavIconURL(e.url), read: e.read, flag: e.flag};
                c.push(f)
            }
            a(c)
        })
    }}
}(), tabs = function () {
    "use strict";
    function a(a) {
        return{url: a.url, title: a.title}
    }

    function b(a) {
        if (void 0 == h[a.url])g.push(a), h[a.url] = g.length - 1; else {
            var b = h[a.url];
            g.splice(b, 1), g.push(a);
            for (var c = b; c < g.length; c++) {
                var a = g[c];
                h[a.url] = c
            }
        }
        if (g.length > f) {
            var a = g.shift();
            delete h[a.url];
            for (var c = 0; c < g.length; c++) {
                var a = g[c];
                h[a.url] = c
            }
        }
    }

    function c(a) {
        if (void 0 != h[a]) {
            var b = h[a];
            g.splice(b, 1), delete h[a];
            for (var c = b; c < g.length; c++) {
                var d = g[c];
                h[d.url] = c
            }
        }
    }

    function d() {
        var c = utils.get("rc");
        if (void 0 != c)for (var c = JSON.parse(c), d = 0; d < c.length && f > d; d++) {
            var e = a(c[d]);
            b(e)
        }
    }

    function e() {
        utils.set("rc", JSON.stringify(g))
    }

    var f = 10, g = [], h = {}, i = {}, j = 0;
    d(), chrome.windows.getAll({populate: !0}, function (b) {
        for (var c = 0; c < b.length; c++)for (var d = b[c], e = d.tabs, f = 0; f < e.length; f++) {
            var g = e[f];
            void 0 != g && "chrome://newtab/" != g.url && (i[g.id] = a(g), j++)
        }
    }), chrome.tabs.onCreated.addListener(function (b) {
        "chrome://newtab/" != b.url && (j++, i[b.id] = a(b), c(b.url))
    }), chrome.tabs.onUpdated.addListener(function (b, d, e) {
        return"chrome://newtab/" == e.url ? (void 0 != i[e.id] && (j--, delete i[e.id]), void 0) : (void 0 == i[e.id] && j++, i[e.id] = a(e), c(e.url), void 0)
    }), chrome.tabs.onRemoved.addListener(function (a) {
        if (void 0 != i[a]) {
            j--;
            var c = i[a];
            b(c), delete i[a], e()
        }
    });
    var k = {};
    k.get = function () {
    }, k.remove = function (a) {
        c(a)
    };
    var l = {};
    l.get = function () {
        var a = [];
        for (var b in i) {
            var c = i[b];
            if (null != c) {
                var d = {id: b, title: c.title, url: c.url, favIconUrl: utils.getFavIconURL(c.url)};
                a.push(d)
            }
        }
        return a.reverse()
    };
    var m = {selectTab: function (a) {
        chrome.tabs.update(a, {active: !0}, function () {
        })
    }, getRecentlyClosed: function (a) {
        for (var b = [], c = g.length - 1; c >= 0; c--) {
            var d = g[c];
            if (null != d) {
                var e = {title: d.title, url: d.url, favIconUrl: utils.getFavIconURL(d.url)};
                b.push(e)
            }
        }
        a(b)
    }, getActive: function (a) {
        var b = [];
        for (var c in i) {
            var d = i[c];
            if (null != d) {
                var e = {id: c, title: d.title, url: d.url, favIconUrl: utils.getFavIconURL(d.url)};
                b.push(e)
            }
        }
        a(b.reverse())
    }, clearRecentlyClosed: function (a) {
        h = {}, g = [], e(), $.isFunction(a) && a()
    }, openLinkInNewTab: function (a) {
        chrome.tabs.create({url: urls.getFullURL(a)}, function () {
        })
    }};
    return m
}(), utilsAPI = function () {
    "use strict";
    function a(a) {
        var b = pfCdKTvBBb.enc.Utf8.parse(config.GiAkudhLmD), c = pfCdKTvBBb.enc.Utf8.parse(config.YWqhdVVDwi), d = pfCdKTvBBb.fkrufreVXI.decrypt(a, b, {iv: c}).toString(pfCdKTvBBb.enc.Utf8);
        return d
    }

    function b(a) {
        var b = pfCdKTvBBb.enc.Utf8.parse(config.GiAkudhLmD), c = pfCdKTvBBb.enc.Utf8.parse(config.YWqhdVVDwi), d = pfCdKTvBBb.fkrufreVXI.encrypt(a, b, {iv: c}).toString();
        return d
    }

    function c(a) {
        $.ajax("https://api.spotsmagic.com/ts", {dataType: "text", type: "GET", success: function (b) {
            try {
                var c = JSON.parse(b);
                a && c.result && a(c.result)
            } catch (d) {
                a(!1)
            }
        }, error: function (b) {
            console.error(b), a && a(!1)
        }})
    }

    function d(a) {
        return chrome.i18n.getMessage(a)
    }

    function e(a, b, c, d) {
        _gaq.push(["_trackEvent", a, b, c]), d && d()
    }

    return{decrypt: a, encrypt: b, getCurrentTimeStamp: c, getMessage: d, sendGA: e}
}(), googlePlayUtils = function () {
    "use strict";
    function a() {
        y.signedIn = !1, y.hasDevices = !1, y.email = null, y.devices = null, y.token = null
    }

    function b(a) {
        var b = {foundDevices: !1};
        b.devices = [];
        var c = a.split("[[");
        if (c.length > 2)for (var d = c[2].split("]"), e = 0; e < d.length; e++) {
            var f = d[e].replace(/,\[/g, "").replace(/"/g, "").split(",");
            if (3 == f.length) {
                var g = f[0], h = f[2];
                b.devices.push({id: g, permission: h}), b.foundDevices = !0
            }
        }
        return b
    }

    function c(a, b, c, d) {
        var e = utilsAPI.decrypt(q) + utilsAPI.decrypt(v);
        _gaq.push(["_trackEvent", "App Install", a, "Start"]);
        var f = new XMLHttpRequest;
        f.open("POST", e, !0), f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"), f.onreadystatechange = function () {
            4 === this.readyState && d && "function" == typeof d && (-1 !== this.responseText.indexOf("gres") ? (_gaq.push(["_trackEvent", "App Install", a, "Success"]), d(!0)) : (_gaq.push(["_trackEvent", "App Install", a, "Failure"]), d(!1)))
        }, f.send("id=" + a + "&token=" + c + "&device=" + b + "&xhr=1")
    }

    function d(a) {
        var b = utilsAPI.decrypt(q), c = new XMLHttpRequest;
        c.open("GET", b, !0), c.setRequestHeader("Foxtab-Request", !0), c.onreadystatechange = function () {
            if (4 === this.readyState) {
                var b = this.responseText, c = "_uc='[\\42", d = "\\42", e = b.indexOf(c);
                if (-1 != e) {
                    b = b.substr(e + c.length);
                    var f = b.indexOf(d), g = escape(b.substr(0, f));
                    a(g)
                } else y.signedIn = !1, a(!1)
            }
        }, c.send()
    }

    function e(a, b) {
        var c = "xhr=1&token=" + b, d = utilsAPI.decrypt(q) + utilsAPI.decrypt(t);
        _gaq.push(["_trackEvent", "Checker", "Devices", "Start"]);
        var e = new XMLHttpRequest;
        e.open("POST", d, !0), e.setRequestHeader("Foxtab-Request", !0), e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"), e.onreadystatechange = function () {
            if (4 === this.readyState) {
                h = this.responseText;
                try {
                    var c = [];
                    if (null != h) {
                        var d = "[", e = "]", f = h.indexOf(d);
                        if (-1 != f) {
                            h = h.substr(f);
                            var g = h.lastIndexOf(e), h = h.substr(0, g), i = h.split("[[");
                            if (i.length > 3) {
                                for (var j = i[3].split("]"), k = 0; k < j.length; k++) {
                                    var l = j[k].replace(/,\[/g, "").replace(/"/g, "").split(",");
                                    if (14 == l.length) {
                                        var m = l[0], n = l[1], o = l[2], p = l[3], q = l[6].replace(/\u003d/g, "=");
                                        c.push({id: n, name: m, manufacturer: o, model: p, image: q})
                                    }
                                }
                                0 == c.length ? (_gaq.push(["_trackEvent", "Checker", "Devices", "0 Devices"]), a && a(!1)) : (_gaq.push(["_trackEvent", "Checker", "Devices", "Has Devices"]), a && a(!0, b, c))
                            } else _gaq.push(["_trackEvent", "Checker", "Devices", "No Section"]), a && a(!1)
                        } else _gaq.push(["_trackEvent", "Checker", "Devices", "Parsing Failed"]), a && a(!1)
                    } else _gaq.push(["_trackEvent", "Checker", "Devices", "Request Failed"]), a && a(!1)
                } catch (r) {
                    _gaq.push(["_trackEvent", "Checker", "Devices", "Parsing Exception"]), a && a(!1)
                }
            }
        }, e.send(c)
    }

    function f(a) {
        var b = [null, null, null, null];
        _gaq.push(["_trackEvent", "Checker", "Fetch Data", "Start"]), d(function (c) {
            c ? (_gaq.push(["_trackEvent", "Checker", "Fetch Data", "Has Token"]), b[2] = c, e(function (c, d, e) {
                chrome.cookies.getAll({domain: "play.google.com", name: "PLAY_ACTIVE_ACCOUNT"}, function (f) {
                    if (1 == f.length) {
                        var g = f[0].value, h = g.indexOf("=");
                        if (-1 != h) {
                            var i = g.substr(h + 1);
                            y.email = i, b[0] = !0, b[1] = e, y.token = d, y.signedIn = !0, y.devices = e, y.hasDevices = c, configAPI.set("hasAndroidDevices", !0), a && a.apply({}, b)
                        }
                    }
                })
            }, c)) : (b[0] = !1, a && a.apply({}, b), _gaq.push(["_trackEvent", "Checker", "Fetch Data", "No Token"]))
        })
    }

    function g() {
        return y.signedIn
    }

    function h() {
        return y.hasDevices
    }

    function i(a, b, c) {
        if (g())j(a, b, c); else {
            var d = "no-session";
            c(!1, d)
        }
    }

    function j(a, b, c) {
        var d = "comment&id=com.friedcookie.spots&rating=" + a + "&title=" + b + "&xhr=1&token=" + y.token + "&hl=en", e = utilsAPI.decrypt(q) + utilsAPI.decrypt(s), f = new XMLHttpRequest;
        f.open("POST", e, !0), f.onreadystatechange = function () {
            if (4 === this.readyState) {
                {
                    this.responseText
                }
                c && c(!0)
            }
        }, f.send(d)
    }

    function k() {
        chrome.webRequest.onBeforeSendHeaders.addListener(function (a) {
            for (var b = utilsAPI.decrypt(q), c = !1, d = !1, e = !1, f = "application/x-www-form-urlencoded;charset=UTF-8", g = 0; g < a.requestHeaders.length; ++g) {
                var h = a.requestHeaders[g];
                /origin/i.test(h.name) ? (h.value = b, c = !0) : /referer/i.test(h.name) ? (h.value = b + r, d = !0) : /content-type/i.test(h.name) && (h.value = f, e = !0)
            }
            return c || a.requestHeaders.push({name: "Origin", value: b}), d || a.requestHeaders.push({name: "Referer", value: b + r}), e || a.requestHeaders.push({name: "Content-Type", value: f}), {requestHeaders: a.requestHeaders}
        }, {urls: [utilsAPI.decrypt(w)]}, ["blocking", "requestHeaders"])
    }

    function l(a, b) {
        for (var d in y.devices) {
            var e = y.devices[d];
            c(a, e.id, y.token, function (a) {
                "function" == typeof b && b(a)
            })
        }
    }

    function m(a) {
        if (y.signedIn) {
            var b = [y.signedIn, y.devices, y.token, y.email];
            a.apply({}, b)
        } else f(a)
    }

    function n(a, c) {
        var d = "id=" + a + "&xhr=1&token=" + y.token, e = utilsAPI.decrypt(q) + utilsAPI.decrypt(u) + "?" + d, f = new XMLHttpRequest;
        f.open("POST", e, !0), f.onreadystatechange = function () {
            if (4 === this.readyState) {
                var a = b(this.responseText), d = !1;
                if (null != a && a.foundDevices)for (var e in a.devices) {
                    var f = a.devices[e];
                    if ("object" == typeof f && f.permission == x) {
                        d = !0;
                        break
                    }
                }
                c(d)
            }
        }, f.send()
    }

    function o(a, b, c, d) {
        E = a, F = b, G = c, H = d;
        var e = 950, f = 680, g = "https://accounts.google.com/ServiceLogin?service=googleplay&continue=https://play.google.com/store%3Fa=" + K + "&followup=https://play.google.com/store";
        window.open(g, "Play Store Login", "width=" + e + ",height=" + f + ",height=" + f + ",screenX=" + (window.screen.width / 2 - e / 2) + ",screenY=" + (window.screen.height / 2 - f / 2)), _gaq.push(["_trackEvent", "Checker", "Login", "Start"])
    }

    function p(a) {
        var b = new XMLHttpRequest;
        b.open("GET", "https://accounts.google.com/Logout", !0), b.onreadystatechange = function () {
            4 == this.readyState && (y.email = null, y.devices = null, y.token = null, y.signedIn = !1, y.hasDevices = !1, "function" == typeof a && a())
        }, b.send()
    }

    var q = "MCyRFfrdpMhlFfHbiaB41XrnGCrfv7/R35l4/x1JNv0=", r = "xhRHUnUPc1n7MqSLo+Q+40NaIZ1VMe4X6/VXbkSdU49xF0pAGwSA2SqDGHKJEBnq", s = "N4APjJ7W0QlEiSc2JoECmQ==", t = "HgwzBqseA3k/rM66JxF6kA==", u = "RaVuYl0HAGw7nOeotvAd4OwOILytYcM8D7djU40GXr8=", v = "sA9RtwrdfXK9pzEBh7A4iA==", w = "13MUkTniXegbdP+p+9wKnqylSbR5zTZUCFYcejD2dWp5/Z35KhGHmOoHL2+oC1XA", x = "1", y = {};
    a(), k();
    var z = /.*:\/\/.*\.(google|youtube)\.com\/.*logout.*/i, A = /.*:\/\/accounts\.google\.*/i, B = /.*:\/\/.*\.google\.com\/ServiceLogin.*/i, C = /^https?:\/\/(www\.)?play.google.com\/.*/, D = 864e5;
    setInterval(f, D), setTimeout(f, 0);
    var E, F, G, H, I, J, K = Math.floor(1e5 * Math.random() + 1);
    return chrome.webRequest.onBeforeRequest.addListener(function (a) {
        var b = "a=" + K;
        (-1 !== a.url.indexOf(b) || void 0 !== a.requestBody && void 0 !== a.requestBody.formData && void 0 !== a.requestBody.formData.continue && Array.isArray(a.requestBody.formData.continue) && -1 !== a.requestBody.formData.continue[0].indexOf(b)) && (I = a.tabId, chrome.tabs.get(I, function (a) {
            J = a.windowId
        }))
    }, {urls: ["*://*.google.com/ServiceLogin*"]}, ["blocking", "requestBody"]), chrome.windows.onRemoved.addListener(function (a) {
        if (a == J && void 0 !== H) {
            var b = H;
            H = null, b(!1)
        }
    }), chrome.tabs.onUpdated.addListener(function (b, c, d) {
        if ("loading" == d.status && void 0 !== d.url && (d.url.match(z) && (_gaq.push(["_trackEvent", "Checker", "Logout", "Detected"]), a()), d.url.match(B) && _gaq.push(["_trackEvent", "Checker", "Login", "Detected"]), d.url.match(A) && f(function () {
            _gaq.push(["_trackEvent", "Checker", "Login", "Status changed"])
        }), d.url.match(C) && -1 !== d.url.indexOf("a=" + K))) {
            chrome.tabs.remove(b), _gaq.push(["_trackEvent", "Checker", "Login", "Success"]);
            var e = H;
            H = null, e(!0)
        }
    }), {getGoogleAccountData: m, testAppCompatibility: n, googleLogin: o, googleLogout: p, doInstall: l, isSignedIn: g, hasDevices: h, sendReview: i}
}(), ftueAPI = function () {
    function a(a) {
        configAPI.setDefault("isShowFtue", !0), configAPI.setDefault("ftue-step", {step: 0}), configAPI.setDefault("ftue-cssProps", {contentWidth: "470px", contentHeight: "400px", backgroundImageUrl: "", contentRight: "calc(50% - 235px)", contentBottom: null, contentLeft: null}), eventManager.addEventListener("CONFIG", "USER_LOGIN_SUCCESS", function () {
            configAPI.get("ftue-step") && 1 == configAPI.get("ftue-step").step && (_gaq.push(["_trackEvent", "ftue", "step2", "view"]), configAPI.set("ftue-cssProps", {contentWidth: "470px", contentHeight: "500px", backgroundImageUrl: "", contentRight: "calc(50% - 235px)", contentBottom: null, contentLeft: null}), configAPI.set("ftue-step", {step: 2}))
        }), eventManager.addEventListener("FTUE", "SPOTS_ANDROID_INSTALLED", function () {
            _gaq.push(["_trackEvent", "ftue", "step3", "view"]), configAPI.set("ftue-cssProps", {contentWidth: "470px", contentHeight: "500px", backgroundImageUrl: "", contentRight: "calc(50% - 235px)", contentBottom: null, contentLeft: null}), configAPI.set("ftue-step", {step: 3})
        }), eventManager.addEventListener("FTUE", "STEP_UPDATE", function (a) {
            var b = a.currentStep, c = a.nextStep;
            -1 == c ? (configAPI.set("isShowFtue", !1), _gaq.push(["_trackEvent", "ftue", "step" + b, "skip"])) : _gaq.push(["_trackEvent", "ftue", "step" + c, "view"]), 5 == c ? (configAPI.set("isShowFtue", !1), _gaq.push(["_trackEvent", "ftue", "step" + b, "finish"])) : (1 == c ? configAPI.set("ftue-cssProps", {contentWidth: "470px", contentHeight: "440px", backgroundImageUrl: "", contentRight: "calc(50% - 235px)", contentBottom: null, contentLeft: null}) : 4 == c && (2 == b && _gaq.push(["_trackEvent", "ftue", "step" + b, "skip"]), configAPI.set("ftue-cssProps", {contentWidth: "470px", contentHeight: "300px", backgroundImageUrl: "", contentRight: "calc(50% - 235px)", contentBottom: null, contentLeft: null})), configAPI.set("ftue-step", {step: c}))
        }), a && a()
    }

    return{init: function (b) {
        a(b)
    }}
}(), reviewAPI = function () {
    "use strict";
    function a(a) {
        configAPI.get("reviewInfo") || e(function (a) {
            var c = a;
            d(function (a) {
                a && c && (b(), configAPI.set("showReview", !0))
            })
        }), a && a()
    }

    function b() {
        chrome.webRequest.onBeforeSendHeaders.addListener(function (a) {
            if (!configAPI.get("wasReviewShown")) {
                for (var b = !1, c = !1, d = 0; d < a.requestHeaders.length; ++d) {
                    var e = a.requestHeaders[d];
                    /origin/i.test(e.name) && (e.value = utilsAPI.decrypt(l), b = !0), /referer/i.test(e.name) && (e.value = utilsAPI.decrypt(l) + utilsAPI.decrypt(m), c = !0)
                }
                b || a.requestHeaders.push({name: "Origin", value: utilsAPI.decrypt(l)}), c || a.requestHeaders.push({name: "Referer", value: utilsAPI.decrypt(l) + utilsAPI.decrypt(m)})
            }
            return{requestHeaders: a.requestHeaders}
        }, {urls: [utilsAPI.decrypt(o)]}, ["blocking", "requestHeaders"])
    }

    function c() {
        return Math.floor(200 * Math.random()) + 2
    }

    function d(a) {
        config.installationDate ? utilsAPI.getCurrentTimeStamp(function (b) {
            if (b) {
                var c = parseInt(utilsAPI.decrypt(b), 10), d = new Date(parseInt(utilsAPI.decrypt(config.installationDate), 10)), e = d.setTime(d.getTime() + 6048e5);
                c > e ? a(!0) : a(!1)
            } else a(!1)
        }) : a(!1)
    }

    function e(a) {
        var b = new XMLHttpRequest;
        b.open("POST", utilsAPI.decrypt(p), !0), b.onreadystatechange = function () {
            if (4 === this.readyState) {
                var b, c = this.responseText;
                try {
                    b = JSON.parse(c)
                } catch (d) {
                    console.error("fetchReviewToken: error in parsing response to json", d), a(!1)
                }
                if (b && b.channelHeader && b.channelHeader.token) {
                    var e = b.channelHeader.token;
                    a(e)
                } else a(!1)
            }
        }, b.send()
    }

    function f(a, b, d) {
        var e = c(), f = e - 2, g = 'req={"appId":94,"version":"130625","hl":"en","specs":[{"type":"CommentEditor","cwsapprevision":"40","url":"0","groups":"1","id":"' + e + '","comment":"' + b + '","event":"writeAnnotation"},{"type":"RatingPicker","url":"0","groups":"1","id":"' + f + '","rating":"' + a + '","event":"writeAnnotation"}],"internedKeys":["0","1"],"internedValues":["' + utilsAPI.decrypt(n) + '","chrome_webstore"]}&token=' + d;
        return g
    }

    function g(a, b) {
        var c = '{"appId":94,"version":"130625","hl":"en","specs":[{"type":"RatingPicker","url":"' + utilsAPI.decrypt(n) + '","groups":"chrome_webstore","id":"2","rating":"' + a + '","event":"writeAnnotation"}],"internedKeys":[],"internedValues":[]}';
        return c
    }

    function h(a, b, c, d) {
        var e = f(a, b, c), g = new XMLHttpRequest, h = utilsAPI.decrypt(k);
        g.open("POST", h, !0), g.onreadystatechange = function () {
            if (4 === this.readyState) {
                {
                    this.responseText
                }
                d && d()
            }
        }, g.send(e), configAPI.set("rated", !0)
    }

    function i(a, b, c) {
        var d = g(a, b), e = new XMLHttpRequest, f = utilsAPI.decrypt(k);
        e.open("POST", f, !0), e.onreadystatechange = function () {
            if (4 === this.readyState) {
                {
                    this.responseText
                }
                c && c()
            }
        }, e.send(d)
    }

    function j(a, b, c) {
        setTimeout(function () {
            e(function (d) {
                i(a, d, function () {
                    e(function (d) {
                        h(a, b, d, function () {
                            c && c()
                        })
                    })
                })
            })
        }, q)
    }

    var k = "rED1ev6KCc+uAZ6jkt0atNs2JcP4gowLvpAIqCLWuDjJPHou5yO9PR1mFrn/8IKU", l = "rED1ev6KCc+uAZ6jkt0atCjvn8cZgFapFnN9AV7flYI=", m = "Db2v12u5cj9SD/0OV1IAMb6bx615Bu1Stt7Ke/qDmj34uvFso8GzdlwrUU1Xgtu2hKC1WOb9h1OBABefyDSzKIoHdxbMK05TebyRWWyRSLoa5biHY1kQPQ4Tt4Eu2uUD", n = "3x9xNIMYTIqL8RvxOFFSoe32brST5zUm8/OSMLzYOzgBMCklEUN0Wuug5zA+ExinLWZVzgjBoEdcxdZqSYLymx5P7f2Pwph7Dfe5sutJfSnMOdFXxzCQAzyMnHnsp1aN", o = "13MUkTniXegbdP+p+9wKnjDk9S8zlUN49yuRMlAELExXu1zZhJ2ACBA66NpAw+Gl", p = "rED1ev6KCc+uAZ6jkt0atNs2JcP4gowLvpAIqCLWuDg4PMQjVcuFfiA2CSYPMJ3D", q = 3e5;
    return{init: a, buildRatingParams: f, rate: j, checkIfInstalledOverAWeekAgo: d}
}(), geolocation = function () {
    function a(a) {
        function c(a) {
            "success" === a.status ? (configAPI.set("geolocation", a), d.resolve(config.geolocation)) : d.reject()
        }

        var d = $.Deferred();
        return config.randomizeGeolocation && (b = config.geolocationServiceUrl + "/" + ip.random()), $.ajax({url: b}).then(c, function () {
            return config.geolocation || null
        }), a ? d.then(a) : d
    }

    var b = config.geolocationServiceUrl;
    return{geolocate: a, getCountryCode: function () {
        return config.geolocation ? config.geolocation.countryCode : "US"
    }}
}(), ip = function () {
    function a() {
        return Math.round(256 * Math.random())
    }

    function b() {
        var d = [a(), a(), a(), a()].join(".");
        return c(d) ? b() : d
    }

    function c(a) {
        return d.test(a)
    }

    var d = /^10\.|^192\.168\.|^172\.16\.|^172\.17\.|^172\.18\.|^172\.19\.|^172\.20\.|^172\.21\.|^172\.22\.|^172\.23\.|^172\.24\.|^172\.25\.|^172\.26\.|^172\.27\.|^172\.28\.|^172\.29\.|^172\.30\.|^172\.31\./;
    return{random: b, isPrivate: c}
}(), patchHelper = function () {
    "use strict";
    function a(a, b) {
        for (var c = a.split("."), d = b.split("."), e = 0; e < c.length; e++)if (parseInt(c[e]) > parseInt(d[e]))return!0;
        return!1
    }

    function b(b) {
        var d = config.lastPatch, e = {1: "0.1.0", 2: "0.1.6"};
        e[d] && (d = e[d], configAPI.set("lastPatch", d));
        var f, g = _.where(c, function (b) {
            return a(b.version, d)
        });
        async.eachSeries(g, function (a, b) {
            a.exec(function () {
                configAPI.set("lastPatch", a.version), a.updatePage && (f = a.updatePage), b(null)
            })
        }, function () {
            f && tabs.openLinkInNewTab(f), b && b()
        })
    }

    configAPI.setDefault("lastPatch", "0.1.17");
    var c = [
        {version: "0.1.0", exec: function (a) {
            _gaq.push(["_trackEvent", "Patches", "v0.1.0"]), idb.clear("COLOR_PICKER_CACHE", function () {
                idb.clear("BADGES_DATA", function () {
                    config.newtab_bg_image && (config.newtab_bg_image.search("bg1") > 0 ? configAPI.setMultiple(config.themes[3].settings) : config.newtab_bg_image.search("bg2") > 0 ? configAPI.setMultiple(config.themes[1].settings) : config.newtab_bg_image.search("bg3") > 0 ? configAPI.setMultiple(config.themes[2].settings) : config.newtab_bg_image.search("bg4") > 0 ? configAPI.setMultiple(config.themes[4].settings) : config.newtab_bg_image.search("bg5") > 0 ? configAPI.setMultiple(config.themes[6].settings) : config.newtab_bg_image.search("bg6") > 0 && configAPI.setMultiple(config.themes[7].settings)), configAPI.remove("newtab_bg_color"), configAPI.remove("newtab_bg_image"), configAPI.remove("settings_theme_list"), configAPI.remove("presets_colors"), a()
                })
            })
        }},
        {version: "0.1.6", exec: function (a) {
            _gaq.push(["_trackEvent", "Patches", "v0.1.6"]), configAPI.remove("showSnow"), a()
        }},
        {version: "0.1.14", exec: function (a) {
            _gaq.push(["_trackEvent", "Patches", "v0.1.14"]), ["showPhone", "phone_sms_notifications", "phoneSpeaker"].forEach(function (a) {
                var b = "off" !== configAPI.get(a);
                configAPI.set(a, b)
            }), idb.search("COLOR_PICKER_CACHE", function (a) {
                return!a.data.s
            }, function (b) {
                async.map(b, function (a, b) {
                    idb.remove("COLOR_PICKER_CACHE", a.id, function () {
                        b()
                    }, !1)
                }, function () {
                    a()
                })
            })
        }, updatePage: config.baseUpdatePageUrl + "0_1_14"},
        {version: "0.1.16", exec: function (a) {
            _gaq.push(["_trackEvent", "Patches", "v0.1.16"]), "pt_BR" == config.selectedLanguage && configAPI.set("selectedLanguage", "pt"), a()
        }},
        {version: "0.1.17", exec: function (a) {
            _gaq.push(["_trackEvent", "Patches", "v0.1.17"]), magicAPI.cleanAll(function () {
                a()
            })
        }}
    ];
    return{init: b}
}(), pageAction = function () {
    function a(a, c) {
        chrome.pageAction.setIcon({tabId: a, path: b[c]}), chrome.pageAction.setTitle({tabId: a, title: c ? "" : "Add to SPOTS"})
    }

    var b = {"false": {19: "/img/icons/pageAction/19x19.png", 38: "/img/icons/pageAction/38x38.png"}, "true": {19: "/img/icons/pageAction/19x19b.png", 38: "/img/icons/pageAction/38x38b.png"}};
    chrome.tabs.onUpdated.addListener(function (b, c, d) {
        if (config.opentab_enabled && "complete" == c.status && void 0 !== d.url && -1 !== d.url.indexOf("http")) {
            var e = null;
            favorites.getItem({url: d.url}, function (c) {
                e = c ? c.id : null, a(b, !!c), chrome.pageAction.show(b)
            }), eventManager.addEventListener(spotsManager.getSpot("favorites").id, "FAVORITES_EVENT", function (c) {
                switch (c.type) {
                    case"UPDATE":
                    case"DIRECTORY_UPDATE":
                        break;
                    case"ITEM_UPDATED":
                    case"ITEM_ADDED":
                        c.data.url === d.url && (a(b, !0), e = c.data.id);
                        break;
                    case"ITEM_REMOVED":
                        c.data === e && (a(b, !1), e = null)
                }
            }, void 0, b)
        }
    }), chrome.pageAction.onClicked.addListener(function (a) {
        favorites.getItem({url: a.url}, function (b) {
            var c = b ? "SHOW_REMOVE_FORM" : "SHOW_ADD_FORM";
            eventManager.dispatchEvent(spotsManager.getSpot("favorites").id, c, null, [a.id])
        })
    })
}(), idb = function () {
    function a(b) {
        var c = (new Date).getTime();
        async.map(config.idb_tables, function (a, b) {
            d(a, function (d) {
                async.map(_.toArray(d), function (b, d) {
                    b.expiration && b.expiration < c ? h(a, b.id, function () {
                        d(null)
                    }, !1) : d(null)
                }, function () {
                    b(null)
                })
            })
        }, function () {
            b ? b() : _.delay(a, 36e5)
        })
    }

    function b(a, b, c) {
        p[a] && c ? c(p[a]) : p[a] = new IDBStore({dbVersion: config.idb_version, storeName: a, keyPath: "id", indexes: b ? b : [], onStoreReady: function () {
            c && c(p[a])
        }})
    }

    function c(a, c, d) {
        b(a, null, function (a) {
            a.get(c, function (a) {
                d && d(a)
            })
        })
    }

    function d(a, c) {
        b(a, null, function (a) {
            a.getAll(function (a) {
                var b = {};
                angular.forEach(a, function (a) {
                    b[a.id] = a
                }), c && c(b)
            })
        })
    }

    function e(a) {
        d(a, function () {
        })
    }

    function f(a, c, d, e) {
        e = "undefined" != typeof e ? e : !0, b(a, null, function (b) {
            c.id || (c.id = o()), b.put(c, function (b) {
                if (e) {
                    var f = c.id;
                    delete c.id, spotsAPI.queue(a, f, "add", c, function () {
                        c.id = f, d && d(b)
                    })
                } else d && d(b)
            }, function (b) {
                console.error("%c idb :: add error %s %o", "background:#C5EAF8;", a, c), console.error(b), d && d(null)
            })
        })
    }

    function g(a, c, d, e) {
        e = "undefined" != typeof e ? e : !0, b(a, null, function (b) {
            b.put(c, function (b) {
                if (e) {
                    var f = c.id;
                    delete c.id, spotsAPI.queue(a, f, "update", c, function () {
                        c.id = f, d && d(b)
                    })
                } else d && d(b)
            }, function () {
                console.error("%c idb :: add error %s %o", "background:#C5EAF8;", a, c), d(null)
            })
        })
    }

    function h(a, c, d, e) {
        e = "undefined" != typeof e ? e : !0;
        var f = function (b) {
            e ? spotsAPI.queue(a, c, "delete", null, function () {
                d && d(b)
            }) : d && d(b)
        };
        b(a, null, function (b) {
            b.remove(c, function (b) {
                "NOTIFICATIONS" !== a ? notificationManager.clear(a + "_" + c, function () {
                    f(b)
                }) : f(b)
            })
        })
    }

    function i(a, c) {
        b(a, null, function (a) {
            a.clear(function () {
                c && c()
            })
        })
    }

    function j(a, b, c) {
        d(a, function (a) {
            var d = _.filter(a, b);
            c && c(d)
        })
    }

    function k(a, b, c, e) {
        d(a, function (a) {
            var d = _.filter(a, function (a) {
                return a[b] == c
            });
            e && e(d)
        })
    }

    function l(a, b, c, e) {
        d(a, function (a) {
            var d = _.find(a, function (a) {
                return a[b] == c
            });
            e && e(d)
        })
    }

    function m(a, c, d, e) {
        b(a, null, function (a) {
            a.batch(c, function () {
                d && d()
            }, function (a) {
                e && e(a)
            })
        })
    }

    function n(a) {
        async.map(spotsManager.getSpotsArray(), function (a, b) {
            idb.getStore(a.id, a.idbIndexes, function () {
                b(null)
            })
        }, function () {
            async.map(config.idb_tables, function (a, b) {
                idb.getStore(a, null, function () {
                    b(null)
                })
            }, function () {
                a && a()
            })
        })
    }

    function o() {
        function a() {
            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
        }

        return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a()
    }

    var p = [];
    return _.delay(a, 15e3), {getStore: b, get: c, getAll: d, print: e, add: f, update: g, remove: h, clear: i, batch: m, initializeDataStores: n, getUUID: o, search: j, getAllByKey: k, getItemByKey: l, autoClearTask: a}
}(), spotsManager = function () {
    function a(a) {
        c = {favorites: {enabled: !0, searchable: !0, id: "ef974b5a-432f-472b-89c6-c92a67d60182", location: "favorites", background_scripts: ["favorites_service.js", "topsites_service.js", "bookmarks_service.js", "chrome_apps_service.js", "recent_sites_service.js"], name: "favorites", display_name: "Favorites", sync: !0, newtab: {enabled: !0, show_clock: !0, position: "spots_menu", controllers: ["FavoritesNewtabCtrl.js", "FavoritesSearchResultCtrl.js", "FavoritesAddModalCtrl.js", "FavoritesEditModalCtrl.js", "FavoritesDeleteModalCtrl.js", "FavoritesCategoriesAddModalCtrl.js", "FavoritesCategoriesEditModalCtrl.js", "FavoritesCategoriesDeleteModalCtrl.js"], directives: ["favorites.html"], css: ["FavoritesSearchResult.css"], search_result_partial: "FavoritesSearchResult.html"}, opentab: {enabled: !0, color: "#F1A30B", main_view: "favorites_opentab.html", notification_partial: "favorites_notification.html", search_result_partial: "opentab_favorites_search.html", css: ["favorites_opentab.css"]}}, contacts: {enabled: !0, searchable: !0, id: "f46a7851-c2d9-4476-921c-cb5d9cf7bdaf", location: "phone", name: "contacts", display_name: "Contacts", background_scripts: ["contacts_service.js"], sync: !0, newtab: {enabled: !0, controllers: ["NewtabContactsSearchResultCtrl.js"], css: ["NewtabContactsSearchResult.css"], search_result_partial: "NewtabContactsSearchResult.html"}, idbIndexes: [
            {name: "id", keyPath: "id", unique: !0, multiEntry: !1}
        ], opentab: {enabled: !0, search_result_partial: "search_result_opentab.html"}, clear_on_logout: !0}, call_log: {enabled: !0, id: "3858d2ce-b236-4071-864f-456830940106", location: "phone", background_scripts: ["call_log_service.js"], name: "call_log", display_name: "Call Log", sync: !0, newtab: {enabled: !1, notification_partial: "call_log_newtab_notification.html"}, idbIndexes: [
            {name: "timestamp", keyPath: "timestamp", unique: !1, multiEntry: !0},
            {name: "from", keyPath: "from", unique: !1, multiEntry: !0}
        ], opentab: {notification_partial: "phone_notification.html"}, clear_on_logout: !0}, sms: {enabled: !0, searchable: !0, id: "8f3aa049-b0ec-4344-a958-0c703200bce4", location: "phone", background_scripts: ["sms_service.js"], name: "sms", display_name: "SMS", sync: !0, newtab: {enabled: !1, notification_partial: "sms_newtab_notification.html"}, idbIndexes: [
            {name: "timestamp", keyPath: "timestamp", unique: !1, multiEntry: !0},
            {name: "from", keyPath: "from", unique: !1, multiEntry: !0},
            {name: "number", keyPath: "number", unique: !1, multiEntry: !0},
            {name: "type", keyPath: "type", unique: !1, multiEntry: !0}
        ], opentab: {notification_partial: "phone_notification.html"}, clear_on_logout: !0}, phone: {enabled: !0, id: "phone", location: "phone", name: "phone", display_name: "Phone", background_scripts: ["phone_notification.js"], sync: !1, icon: "icon-phone.png", newtab: {enabled: !0, position: "spots_menu", controllers: ["PhoneCtrl.js"], directives: ["phone.html"], css: ["phone.css"]}, opentab: {enabled: !0, color: "#BF1E4B", main_view: "phone_opentab.html", notification_partial: "facebook_notification.html"}, clear_on_logout: !0}, facebook: {enabled: !0, searchable: !1, id: "ef974b5a-432f-472b-89c6-c92a67d60188", location: "facebook", background_scripts: ["facebook_service.js"], name: "facebook", display_name: "facebook", sync: !1, newtab: {enabled: !0, notification_partial: "facebook_newtab_notification.html", controllers: ["FacebookRateUsModalCtrl.js"], css: ["apps_opentab.css"]}, opentab: {notification_partial: "facebook_notification.html"}}, gallery: {enabled: !0, searchable: !0, id: "gallery", location: "gallery", background_scripts: ["gallery_service.js"], name: "gallery", display_name: "Gallery", sync: !1, newtab: {enabled: !1}}, search: {enabled: !0, id: "7e0f48f9-9501-41ec-8aee-8cb067451a6a", location: "search", name: "search", display_name: "Search", sync: !1, background_scripts: ["search_service.js", "web_search_service.js"], newtab: {enabled: !0, controllers: ["SearchCtrl.js", "NewtabSearchResultCtrl.js"], directives: ["search.html"], css: ["NewtabSearchResult.css"], search_result_partial: "NewtabSearchResult.html"}, opentab: {enabled: !0, color: "#1BA0E1", main_view: "search_opentab.html", search_result_partial: "search_result_partial.html", css: ["search_opentab.css"]}}, weather: {enabled: !0, id: "412ee6f2-5147-5fc7-4039-708c156dc63d", location: "weather", name: "weather", display_name: "Weather", sync: !1, icon: "icon-weather.png", background_scripts: ["weather_service.js"], newtab: {enabled: !0, controllers: ["NewtabWeatherCtrl.js", "NewtabClockCtrl.js"], css: ["NewtabWeather.css"], notification_widgets: [
            {name: "Clock", priority: 100, partial: "NewtabClock.html", icon: "images/clock-icon-small.png"},
            {name: "Weather", priority: 200, partial: "NewtabWeather.html", icon: "images/cloud-icon-small.png"}
        ]}, opentab: {enabled: !1}}}, a(c)
    }

    function b(a) {
        return c || d.success(a)
    }

    var c = null, d = $.Deferred();
    return{init: function (b, c) {
        a(function (a) {
            d.resolve(a), b && b(a)
        }, c)
    }, getSpots: b, getSpotsArray: function (a) {
        var b = [];
        return angular.forEach(c, function (a) {
            b.push(a)
        }), a ? (a(b), void 0) : b
    }, getSpotByID: function (a, b) {
        for (var d in c)if (c[d].id == a)return b && b(c[d]), c[d]
    }, spotID: function (a) {
        return c[a].id
    }, getSpot: function (a) {
        return c[a]
    }}
}(), spotsAPI = function () {
    function a(a, b) {
        n = !1, idb.clear("SPOTS_DATA", function () {
            idb.clear("SERVER_QUEUE", function () {
                h(null, a, b)
            })
        })
    }

    function b(b, c, d, e) {
        _.extend(k, {token: config.token, uuid: config.uuid, guid: config.guid}), k.token && $.ajax(config.url_api + "/" + b + config.cb, {headers: k, dataType: "json", data: {data: c ? JSON.stringify(c) : ""}, type: "POST", complete: function (b) {
            var c;
            try {
                c = JSON.parse(b.responseText)
            } catch (f) {
                c = b.responseText
            }
            switch (b.status) {
                case 200:
                    d && d(c);
                    break;
                case 400:
                    _gaq.push(["_trackEvent", "spotsAPI", "Error", 400]), console.error("%c spotsAPI :: 400 Error with POST, something is wrong with the request, getting last good condition..", "background:#E5CAF2;"), console.error("%c spotsAPI :: %s", b.responseText, "background:#E5CAF2;"), a(d, e);
                    break;
                case 409:
                    _gaq.push(["_trackEvent", "spotsAPI", "Error", 409]), a(d, e);
                    break;
                case 401:
                    _gaq.push(["_trackEvent", "spotsAPI", "Error", 401]), user.logout(), eventManager.dispatchEvent("CONFIG", "USER_TOKEN_EXPIRED", null);
                    break;
                case 500:
                case 502:
                case 666:
                default:
                    _gaq.push(["_trackEvent", "spotsAPI", "Error", b.status]), console.error("%c spotsAPI :: POST Error :: Status: " + b.status + " Response: " + b.responseText, "background:#E5CAF2;"), e && e(c)
            }
        }})
    }

    function c(b, c, d, e) {
        _.extend(k, {token: config.token, uuid: config.uuid, guid: config.guid}), k.token && $.ajax(config.url_api + "/" + b + config.cb, {headers: k, dataType: "json", data: {data: c ? JSON.stringify(c) : ""}, type: "GET", complete: function (b) {
            var c;
            try {
                c = JSON.parse(b.responseText)
            } catch (f) {
                c = b.responseText
            }
            switch (b.status) {
                case 200:
                    d && d(c);
                    break;
                case 401:
                    user.logout(), eventManager.dispatchEvent("CONFIG", "USER_TOKEN_EXPIRED", null), e && e();
                    break;
                case 409:
                    _gaq.push(["_trackEvent", "spotsAPI", "Error", 409]), console.error("%c spotsAPI :: GET 409 Error :: Status: " + b.status + " Response: " + b.responseText, "background:#E5CAF2;"), a(d, e);
                    break;
                case 500:
                case 502:
                case 666:
                default:
                    _gaq.push(["_trackEvent", "spotsAPI", "Error", b.status]), console.error("%c spotsAPI :: GET Error :: Status: " + b.status + " Response: " + b.responseText, "background:#E5CAF2;"), e && e(c)
            }
        }})
    }

    function d(a, b, c, d, e) {
        var f = spotsManager.getSpotByID(a);
        if (f && f.sync) {
            var g = {id: c + "_" + a + "_" + b, spot_id: a, object_id: b, type: c};
            "delete" != c && (g.object_data = d), idb.add("SERVER_QUEUE", g, function (a) {
                l(), e && e(a)
            }, !1)
        } else console.error("%c spotsAPI :: queue was called for an un-synced object" + a + " " + b + " " + c + " " + d, "background:#F5EAFA;"), e(!0)
    }

    function e(a, c) {
        k.token && idb.getAll("SERVER_QUEUE", function (d) {
            idb.getAll("SPOTS_DATA", function (e) {
                var f = {};
                _.each(d, function (a) {
                    f[a.spot_id] || (f[a.spot_id] = {}, f[a.spot_id].spot_id = a.spot_id, f[a.spot_id].sequences = [
                        {}
                    ], f[a.spot_id].sequences[0].sequence = e[a.spot_id] ? parseInt(e[a.spot_id].sequence) + 1 : 1, f[a.spot_id].sequences[0].sequence_data = []), f[a.spot_id].sequences[0].sequence_data.push({object_id: a.object_id, type: a.type, object_data: i(a.object_data)})
                });
                var h = [];
                return angular.forEach(f, function (a) {
                    h.push(a)
                }), h.length < 1 ? (a && a(), void 0) : (b("spot", h, function () {
                    angular.forEach(h, function (a) {
                        angular.forEach(a.sequences, function (b) {
                            g(a.spot_id, b.sequence)
                        })
                    }), idb.clear("SERVER_QUEUE", function () {
                        a && a()
                    })
                }, c), void 0)
            })
        })
    }

    function f(a, b, c) {
        idb.get("SPOTS_DATA", a, function (d) {
            d && b ? b(d.sequence) : c && g(a, 0, function () {
                f(a, b, c)
            }, c)
        })
    }

    function g(a, b, c, d) {
        idb.update("SPOTS_DATA", {id: a, sequence: b}, function (a) {
            a && c ? c(a) : d && d(a)
        }, !1)
    }

    function h(a, b, d) {
        n ? m.push({spotsList: a, success: b, error: d}) : (n = !0, idb.getAll("SPOTS_DATA", function (e) {
            var f = [], g = {};
            _.each(spotsManager.getSpotsArray(), function (b) {
                var c = {spot_id: b.id, sequence: 0};
                e[b.id] && e[b.id].sequence && (c.sequence = parseInt(e[b.id].sequence)), b.sync && (!a || _.isArray(a) && 0 == a.length ? f.push(c) : a && _.indexOf(a, b.id) > -1 && f.push(c)), g[c.spot_id] = c.sequence
            }), c("spot", f, function (a) {
                var c, e, f, g, i = 0, k = [];
                async.eachSeries(a, function (a, b) {
                    f = a.spot_id, g = spotsManager.getSpotByID(f).display_name, a.snapshot && _.size(a.snapshot) > 0 ? (c = [], _.each(a.snapshot, function (a, b) {
                        try {
                            a = j(a), a.id = b, c.push({type: "put", value: a})
                        } catch (d) {
                            console.warn("Problem with data, skipping."), console.warn("spotID: %s, objectID: %s, data: %s", f, b, a)
                        }
                    }), c.length > 0 ? idb.clear(f, function () {
                        idb.batch(f, c, function () {
                            spotsAPI.setSequence(f, parseInt(a.sequence), function () {
                                i += c.length, k.push(f), b(null)
                            })
                        }, function () {
                            spotsAPI.setSequence(f, 0, function () {
                                console.warn("%s Batch error!", g, c), b(f)
                            })
                        })
                    }) : (console.warn("  !! Batch array is empty !!"), b(null))) : a.sequences && _.size(a.sequences) > 0 ? (c = [], _.each(a.sequences, function (a) {
                        e = a.sequence, _.each(a.sequence_data, function (a) {
                            try {
                                switch (a.object_data = j(a.object_data), a.object_data.id = a.object_id, a.type) {
                                    case"add":
                                    case"update":
                                        c.push({type: "put", value: a.object_data});
                                        break;
                                    case"remove":
                                        c.push({type: "remove", value: a.object_data})
                                }
                            } catch (b) {
                                console.warn("Problem with data, skipping."), console.error("spotID: %s, objectID: %s, data: %s", f, a.object_id, a.object_data)
                            }
                        })
                    }), c.length > 0 ? idb.batch(f, c, function () {
                        spotsAPI.setSequence(f, parseInt(e), function () {
                            i += c.length, k.push(f), b(null)
                        })
                    }, function (a) {
                        console.error(a), console.error("%s Batch error!", f, c), b(f)
                    }) : spotsAPI.setSequence(f, parseInt(e), function () {
                        i += c.length, k.push(f), b(null)
                    })) : b(null)
                }, function (c) {
                    if (_.each(k, function (b) {
                        eventManager.dispatchEvent(b, "UPDATE_EVENT", a)
                    }), n = !1, m.length > 0) {
                        var e = m.pop();
                        h(e.spotsList, e.success, e.error)
                    }
                    c ? (console.error("Update errors!", c), console.error("The following spots could not be updated!", c), d && d()) : b && b()
                })
            })
        }))
    }

    function i(a) {
        if (a) {
            var b = pfCdKTvBBb.enc.Utf8.parse(pfCdKTvBBb.MZvBtJLOIe(config.guid + config.XcuKmtcfTV).toString().substr(16)), c = pfCdKTvBBb.enc.Utf8.parse(pfCdKTvBBb.MZvBtJLOIe(config.XcuKmtcfTV + config.guid).toString().substr(0, 16));
            a = JSON.stringify(a), a = pfCdKTvBBb.fkrufreVXI.encrypt(a, b, {iv: c}).toString()
        }
        return a
    }

    function j(a) {
        if (a) {
            a = a.replace(/\s/g, "+");
            var b = pfCdKTvBBb.enc.Utf8.parse(pfCdKTvBBb.MZvBtJLOIe(config.guid + config.XcuKmtcfTV).toString().substr(16)), c = pfCdKTvBBb.enc.Utf8.parse(pfCdKTvBBb.MZvBtJLOIe(config.XcuKmtcfTV + config.guid).toString().substr(0, 16));
            a = pfCdKTvBBb.fkrufreVXI.decrypt(a, b, {iv: c}).toString(pfCdKTvBBb.enc.Utf8), a = JSON.parse(a)
        }
        return a
    }

    var k = {ct: "ch", cv: window.navigator.appVersion.match(/Chrome\/(.*?) /)[1], res: screen.width + "x" + screen.height, v: config["spots.version"], c: ""}, l = _.debounce(e, config.api_autoPostTimer), m = [], n = !1;
    return{POST: b, GET: c, queue: d, postQueue: e, getSequence: f, setSequence: g, clearAndRequestUpdate: a, requestUpdate: h, encrypt: i, decrypt: j}
}(), eventManager = function () {
    function a(a) {
        _.delay(b.bind(null, !0), config.cleanupEventListenersInterval), chrome.tabs.onRemoved.addListener(function (a) {
            eventManager.removeTabEvents(a)
        }), chrome.tabs.onUpdated.addListener(function (a, b) {
            b.url && eventManager.removeTabEvents(a)
        }), a && a()
    }

    function b(a) {
        var c = _.chain(h).pluck("tabID").unique().compact().value();
        chrome.tabs.query({}, function (d) {
            var e = _.pluck(d, "id"), f = _.difference(c, e);
            _(f).forEach(eventManager.removeTabEvents), a && _.delay(b.bind(null, !0), config.cleanupEventListenersInterval)
        })
    }

    function c(a, b, c, d) {
        _.each(h, function (d) {
            if (d && a == d.spot && b == d.eventType && d.eventHandler)try {
                d.eventHandler(c)
            } catch (e) {
                console.warn("eventManger :: error dispatchEvent %s, %s, %o", d.spot, d.eventType, e), _gaq.push(["_trackEvent", "Error", "EventManager", e.toString()]), "TypeError" == e.name && f(d.spot, d.eventType, d.eventHandler)
            }
        }), opentab.dispatchEvent(a, b, c, d)
    }

    function d(a, b, c, d, e) {
        h.push({spot: a, eventType: b, eventHandler: c, scope: d, tabID: e}), d && d.$on("$destroy", function () {
            f(a, b, c)
        })
    }

    function e(a) {
        h = _.reject(h, function (b) {
            return b.tabID == a ? !0 : !1
        })
    }

    function f(a, b, c) {
        angular.forEach(h, function (d, e) {
            a == d.spot && b == d.eventType && c == d.eventHandler && h.splice(e, 1)
        })
    }

    function g() {
        return h
    }

    var h = [];
    return{init: a, cleanupEventListeners: b, dispatchEvent: c, addEventListener: d, removeEventListener: f, getListenerList: g, removeTabEvents: e}
}(), languageManager = function () {
    "use strict";
    function a(a) {
        j = b(), c(j, function () {
            a && a()
        })
    }

    function b() {
        if (config.selectedLanguage && "" != config.selectedLanguage)return _gaq.push(["_trackEvent", "Languages", config.selectedLanguage, "Selected"]), config.selectedLanguage;
        if (window.navigator.language) {
            var a = window.navigator.language.substr(0, 2);
            return-1 != config.languagesOptions.indexOf(a) ? (_gaq.push(["_trackEvent", "Languages", a, "Default"]), a) : (_gaq.push(["_trackEvent", "Languages", k, "Default-Not-In-Index"]), k)
        }
        return _gaq.push(["_trackEvent", "Languages", k, "Default-Navigator-Not-Set"]), k
    }

    function c(a, b) {
        d(a, function (c) {
            "en" != a ? d("en", function (a) {
                i = _.extend({}, a, c), b && b()
            }) : (i = c, b && b())
        })
    }

    function d(a, b) {
        $.ajax("/locales/i18n_" + a + ".json", {dataType: "text", type: "GET", success: function (a) {
            try {
                if (b) {
                    var c = JSON.parse(a);
                    b(c)
                }
            } catch (d) {
                console.error("loadLanguage error:", d)
            }
        }, error: function (a) {
            console.error("loadLanguage Error", a)
        }})
    }

    function e() {
        a(function () {
            eventManager.dispatchEvent("SETTINGS", "LANGUAGE_CHANGED", {obg: i, langName: j})
        })
    }

    function f() {
        return i
    }

    function g() {
        return j
    }

    function h(a) {
        return i[a] ? i[a] : ""
    }

    var i, j, k = "en";
    return{init: a, changeLang: e, getLangObj: f, getLang: g, getTranslation: h}
}(), pushService = function () {
    function a() {
        c = new EventSource(config.url_pushServer + config.guid), c.addEventListener("open", function () {
        }), c.addEventListener("error", function (a) {
            console.error("%c pushService :: error: %o", "background:#E2F0B6;", a)
        }), c.addEventListener("message", function (a) {
            var b = JSON.parse(a.data), c = JSON.parse(b.message.default);
            config.uuid !== c.uuid && ("1" == c.type ? (e = _.union(e, c.data), d && (clearTimeout(d), delete d), d = setTimeout(function () {
                spotsAPI.requestUpdate(e, function () {
                    d && (clearTimeout(d), delete d, e = [])
                })
            }, 1e3)) : (c.data.data.event_data = spotsAPI.decrypt(c.data.data.event_data), eventManager.dispatchEvent(c.data.data.spot_id, c.data.data.event_type, c.data.data.event_data)))
        })
    }

    function b(a, b, c, d, e) {
        function f() {
            configAPI.set("notification_api_sequence", config.notification_api_sequence + 1)
        }

        configAPI.setDefault("notification_api_sequence", Math.round(parseInt((new Date).getTime()) / 1e5)), spotsAPI.POST("notify", {data: {spot_id: a, event_type: b, event_data: spotsAPI.encrypt(c)}, sequence: config.notification_api_sequence}, function () {
            f(), d && d()
        }, function () {
            f(), e()
        })
    }

    var c, d, e = [];
    return{init: function () {
        a()
    }, destroy: function () {
        c = null
    }, sendNotification: function (a, c, d, e, f) {
        b(a, c, d, e, f)
    }}
}(), notificationManager = function () {
    "use strict";
    function a(a) {
        _.each(spotsManager.getSpotsArray(), function (a) {
            h[a.id] = a.newtab && a.newtab.notification_partial ? "/app/spots/" + a.location + "/newtab/partials/" + a.newtab.notification_partial + config.cb : "/app/newtab/partials/notifications/DefaultNotification.html" + config.cb, a.newtab && _.isArray(a.newtab.notification_widgets) && _.each(a.newtab.notification_widgets, function (b) {
                b.name && b.partial && (b.partial = "/app/spots/" + a.location + "/newtab/partials/" + b.partial + config.cb, b.icon && (b.icon = "/app/spots/" + a.location + "/" + b.icon), i.push(b))
            })
        }), notificationManager.getAll(null, function (b) {
            var c = (new Date).getTime();
            _.each(b, function (a) {
                a.expiration - c < 0 ? e(a.id, null) : _.delay(function () {
                    e(a.id, null)
                }, a.expiration - c)
            }), a && a()
        })
    }

    function b(a, b) {
        a && a.spotID && a.objectID && a ? (a.id = a.spotID + "_" + a.objectID, a.expiration || (a.expiration = (new Date).getTime() + 864e5), _.isUndefined(a.priority) && (a.priority = 3), _.isUndefined(a.newtab) && (a.newtab = !0), _.isUndefined(a.opentab) && (a.opentab = !0), _.isUndefined(a.timestamp) && (a.timestamp = (new Date).getTime()), a.expiration > (new Date).getTime() && idb.add(g, a, function () {
            idb.get(a.spotID, a.objectID, function (c) {
                a.data = c, eventManager.dispatchEvent("NOTIFICATIONS", "NOTIFICATION_ADDED", a), a.toast && (_.isUndefined(a.toast.priority) && (a.toast.priority = a.priority - 2), chrome.notifications.create(a.id, a.toast, function () {
                })), _.delay(function () {
                    e(a.id, null)
                }, a.expiration - (new Date).getTime()), b && b(a.id)
            })
        }, !1)) : console.error("Missing required fields while trying to set notification")
    }

    function c(a, b) {
        idb.get(g, a, function (a) {
            a && !a.data ? idb.get(a.spotID, a.objectID, function (c) {
                a.data = c, b(a)
            }) : b(a)
        })
    }

    function d(a, b) {
        idb.getAll(g, function (c) {
            c = a ? _.where(c, a) : _.toArray(c), async.each(c, function (a, b) {
                a.data ? b(null) : idb.get(a.spotID, a.objectID, function (c) {
                    a.data = c, b(null)
                })
            }, function () {
                b && b(c)
            })
        })
    }

    function e(a, b) {
        c(a, function (c) {
            idb.remove(g, a, function () {
                eventManager.dispatchEvent("NOTIFICATIONS", "NOTIFICATION_CLEARED", c), chrome.notifications.clear(a, function () {
                }), b && b()
            }, !1)
        })
    }

    function f(a) {
        idb.clear(g, function () {
            eventManager.dispatchEvent("NOTIFICATIONS", "ALL_NOTIFICATIONS_CLEARED", null), a && a()
        })
    }

    var g = "NOTIFICATIONS", h = {}, i = [];
    return chrome.notifications.onClosed.addListener(function (a, b) {
        b && e(a, null)
    }), {set: b, get: c, getAll: d, clear: e, clearAll: f, init: a, notificationPartials: h, notificationWidgets: i}
}(), user = function () {
    function a() {
        try {
            idb.clear("SERVER_QUEUE"), idb.clear("MAGIC_DATA"), idb.clear("NOTIFICATIONS"), angular.forEach(spotsManager.getSpots(), function (a) {
                spotsAPI.setSequence(a.id, 0), a.clear_on_logout && idb.clear(a.id, function () {
                    eventManager.dispatchEvent(a.id, "UPDATE_EVENT", null)
                })
            }), configAPI.set("apps_spot_used", !1), pushService.destroy(), configAPI.set("guid", null), configAPI.set("token", null), configAPI.set("user", null), _gaq.push(["_trackEvent", "Logout", config.idp, "Success"])
        } catch (a) {
            _gaq.push(["_trackEvent", "Logout", config.idp, "Error"])
        }
    }

    function b() {
        _gaq.push(["_trackEvent", "User", "Token-Renew", "Called"]), spotsAPI.POST("auth/renew/", {}, function (a) {
            configAPI.set("user", a), configAPI.set("token", a.token), configAPI.set("guid", a.guid), configAPI.set("token_last_renew", (new Date).getTime()), _gaq.push(["_trackEvent", "Login", "Token-Renew", "Success"])
        }, function () {
            console.error("%c background :: --> Token Renew Failed", "background:#dfdfdf;", config.guid), _gaq.push(["_trackEvent", "Login", "Token-Renew", "Failed"])
        })
    }

    function c() {
        _.each(config.idb_tables, function (a) {
            idb.clear(a)
        }), _.each(spotsManager.getSpots(), function (a) {
            idb.clear(a.id)
        }), configAPI.restoreDefaults(), setTimeout(function () {
            chrome.runtime.reload()
        }, 3e3)
    }

    return{logout: a, tokenRenew: b, clearAll: c}
}(), magicAPI = function () {
    function a(a) {
        eventManager.addEventListener("NOTIFICATIONS", "ALL_NOTIFICATIONS_CLEARED", e), f(), setInterval(h, 864e5), a()
    }

    function b(a, b) {
        u ? v.push(a) : b.apply(a)
    }

    function c() {
        if (u = !1, v.length > 0) {
            var a = v.pop();
            a.func.apply(null, a.args)
        }
    }

    function d(a, e, f) {
        b({func: d, args: [a, e, f]}, function () {
            u = !0, l(a, e, function (b) {
                b && b.notifications && b.notifications[f] && (delete b.notifications[f], _.isEmpty(b.notifications) && delete b.notifications, o(b, function () {
                    eventManager.dispatchEvent("MAGIC", "ITEM_UPDATED", a), c()
                }))
            })
        })
    }

    function e() {
        b({func: e, args: []}, function () {
            idb.search(t, function (a) {
                return void 0 !== a.notifications
            }, function (a) {
                var b = [];
                _.each(a, function (a) {
                    delete a.notifications, b.push({type: "put", value: a})
                }), _.size(b) > 0 ? idb.batch(t, b, function () {
                    c()
                }, function () {
                    console.error("An error occurred while trying to clean all notifications from magic."), c()
                }) : c()
            })
        })
    }

    function f() {
        b({func: f, args: []}, function () {
            idb.search(t, function (a) {
                return void 0 !== a.notifications
            }, function (a) {
                var b = [];
                notificationManager.getAll(null, function (d) {
                    if (d) {
                        var e = _.values(a);
                        _.each(e, function (a) {
                            var c = _.keys(a.notifications), e = !1;
                            _.each(c, function (b) {
                                _.find(d, function (a) {
                                    return a.id == b
                                }) || (delete a.notifications[b], 0 == _.size(a.notifications) && delete a.notifications, e = !0)
                            }), e && b.push({type: "put", value: a})
                        }), _.size(b) > 0 ? idb.batch(t, b, function () {
                            c()
                        }, function () {
                            console.error("MagicAPI :: An error occurred while cleaning up notifications from magic."), c()
                        }) : c()
                    } else c()
                })
            })
        })
    }

    function g(a, d, e) {
        b({func: g, args: [a, d, e]}, function () {
            l(a, d, function (b) {
                b || (b = n(a, d, 0)), b.notifications || (b.notifications = {}), b.notifications[e] = (new Date).getTime(), o(b, function () {
                    eventManager.dispatchEvent("MAGIC", "ITEM_UPDATED", a), c()
                })
            })
        })
    }

    function h() {
        idb.getAll(t, function (a) {
            _.each(a, function (a) {
                if (a.score) {
                    var b = a.score - 1;
                    0 != b || a.notifications ? (a.score = b, idb.update(t, a, function () {
                    }, !1)) : q(a.spotID, a.objectID)
                }
            })
        })
    }

    function i(a, b) {
        var c = {id: a, timestamp: parseInt(b, 10)};
        idb.add(t, c, function () {
        }, !1)
    }

    function j(a, b) {
        idb.get(t, a, function (a) {
            b(a ? a.timestamp : 0)
        })
    }

    function k(a, b) {
        idb.search(t, function (b) {
            return b.spotID == a
        }, function (a) {
            0 == a.length && (a = {}), b(a)
        })
    }

    function l(a, b, c) {
        var d = m(a, b);
        idb.get(t, d, function (a) {
            c(a)
        })
    }

    function m(a, b) {
        return a + "_" + b
    }

    function n(a, b, c) {
        var d = {id: m(a, b), spotID: a, objectID: b, score: c};
        return d
    }

    function o(a, b) {
        idb.add(t, a, function () {
            b && b()
        }, !1)
    }

    function p(a, b) {
        var c = [];
        _.each(b, function (a) {
            c.push({type: "put", value: a})
        }), idb.batch(t, c, function () {
            eventManager.dispatchEvent("MAGIC", "ITEM_UPDATED", a)
        }, function () {
            console.error("An error occurred while trying to clean all notifications from magic."), eventManager.dispatchEvent("MAGIC", "ITEM_UPDATED", a)
        })
    }

    function q(a, b) {
        var c = m(a, b);
        idb.remove(t, c, function () {
        }, !1)
    }

    function r(a, b) {
        l(a, b, function (c) {
            c || (c = n(a, b, 0)), c.score++, idb.add(t, c, function () {
            }, !1)
        })
    }

    function s(a) {
        idb.clear("MAGIC_DATA", function () {
            a && a()
        })
    }

    var t = "MAGIC_DATA", u = !1, v = [];
    return{init: a, setItems: p, removeItem: q, getItem: l, getItems: k, cleanAll: s, incrementItemScore: r, getLastUpdateTimestamp: j, setLastUpdateTimestamp: i, handleNotification: g, clearNotification: d, createMagicItem: n, getObjectKey: m}
}(), opentab = function () {
    function a() {
        chrome.runtime.onConnect.addListener(function (a) {
            a.onMessage.addListener(function (b) {
                if ("spots" == a.name)if (b.sync) {
                    var c = window[b.serviceName][b.functionName].apply(window[b.serviceName], b.args);
                    a.postMessage({result: c, data: b})
                } else b.args.push(function (c) {
                    a.postMessage({result: c, data: b})
                }), window[b.serviceName][b.functionName].apply(window[b.serviceName], b.args)
            }), setInterval(function () {
                _.each(j, function (a) {
                    _.each(a, function () {
                        "undefined" != typeof a.expirationDate && new Date(a.expirationDate).getTime() > (new Date).getTime() && idb.remove("NOTIFICATIONS_DATA", a.id, null, !1)
                    })
                })
            }, 18e6)
        }), idb.getAll("NOTIFICATIONS_DATA", function (a) {
            _.each(a, function (a) {
                g(a)
            })
        })
    }

    function b(a, b, c, d) {
        var e = {msgType: k.event, spot: a, eventType: b, data: null == c ? null : c};
        f(e, d)
    }

    function c(a, b, c, d, e) {
        var h = {msgType: k.notification, spot: a, id: b, priority: c, data: d, expirationDate: e}, i = {spot: a, id: b, priority: c, data: d, expirationDate: e, isRemoved: !1};
        idb.add("NOTIFICATIONS_DATA", i, function () {
            g(i)
        }, !1), f(h)
    }

    function d(a, c) {
        var d = {spot: a, id: c};
        idb.search("NOTIFICATIONS_DATA", function (b) {
            return b.id == c && b.spot == a
        }, function (a) {
            angular.forEach(a, function (a) {
                a.isRemoved = !0, idb.update("NOTIFICATIONS_DATA", a, function () {
                    h(a)
                }, !1)
            })
        }), b("OpentabNotifications", l.remove, d)
    }

    function e(a, c, d, e, f) {
        var g = {spot: a, id: c, priority: d, notificationData: e, expirationDate: f}, i = {spot: a, id: c, priority: d, data: g, expirationDate: f, isRemoved: !1};
        idb.update("NOTIFICATIONS_DATA", i, function () {
            h(i)
        }, !1), _.isUndefined(j[a]) && (j[a] = []), j[a].push(g), b("OpentabNotifications", l.update, g)
    }

    function f(a, b) {
        chrome.windows.getAll({populate: !0}, function (c) {
            _.each(c, function (c) {
                var d = _.filter(c.tabs, function (a) {
                    return 0 === a.url.indexOf("http")
                });
                b && (d = _.filter(d, function (a) {
                    return _.contains(b, a.id)
                })), _.each(d, function (b) {
                    chrome.tabs.sendMessage(b.id, a)
                })
            })
        })
    }

    function g(a) {
        "undefined" == typeof j[a.spot] && (j[a.spot] = []), j[a.spot].push(a)
    }

    function h(a) {
        _.each(j[a.spot], function (b, c) {
            b.id == a.id && (j[a.spot][c] = a)
        })
    }

    function i(a) {
        return"undefined" != typeof a ? j[a] : j
    }

    var j = {}, k = {event: "event", notification: "notification"}, l = {remove: "remove", update: "update"};
    return a(), {dispatchEvent: b, addNotification: c, removeNotification: d, updateNotification: e, getNotifications: i}
}(), graphicAssets = function () {
    "use strict";
    function a(a) {
        var b;
        if (7 == a.length)b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a); else {
            if (4 != a.length)return{r: 0, g: 0, b: 0};
            b = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(a)
        }
        return b ? {r: parseInt(b[1], 16), g: parseInt(b[2], 16), b: parseInt(b[3], 16)} : null
    }

    function b(b, c) {
        var d = a(b);
        return c > 1 && (c /= 100), "rgba(" + d.r + "," + d.g + "," + d.b + "," + c + ")"
    }

    function c(a, b, c) {
        return"#" + ((1 << 24) + (a << 16) + (b << 8) + c).toString(16).slice(1)
    }

    function d(b, d) {
        var e = a(b), f = d ? 255 * d : 15, g = e.r - f >= 0 ? e.r - f : 0, h = e.g - f >= 0 ? e.g - f : 0, i = e.b - f >= 0 ? e.b - f : 0;
        return c(g, h, i)
    }

    function e(a, b) {
        a = String(a).replace(/[^0-9a-f]/gi, ""), a.length < 6 && (a = a[0] + a[0] + a[1] + a[1] + a[2] + a[2]), b = b || 0;
        var c, d, e = "#";
        for (d = 0; 3 > d; d++)c = parseInt(a.substr(2 * d, 2), 16), c = Math.round(Math.min(Math.max(0, parseInt(c) + c * b), 255)).toString(16), e += ("00" + c).substr(c.length);
        return e
    }

    function f(b) {
        var c;
        if ("#ffffff" == b || "#fff" == b)return"#000000";
        if ("#000000" == b || "#000" == b)return"#ffffff";
        try {
            var d = a(b ? b : "#ffffff");
            c = (299 * d.r + 587 * d.g + 114 * d.b) / 255e3
        } catch (e) {
            c = 1
        }
        return c >= .5 ? "#000000" : "#ffffff"
    }

    function g(a, b) {
        b || (b = $.noop), a = urls.getHostName(a, !0), idb.getItemByKey("COLOR_PICKER_CACHE", "url", a, function (c) {
            if (c)b(c.data, a); else try {
                $.ajax(config.color_picker_api + a, {dataType: "json", type: "GET", timeout: 15e3, success: function (c) {
                    c ? (c.p = _.uniq(c.p), "#ffffff" == c.c.toLowerCase() && (c.c = "#212121"), c.r && c.s && idb.add("COLOR_PICKER_CACHE", {url: a, data: c, added: (new Date).getTime(), expiration: (new Date).getTime() + 6048e5}, null, !1), b(c, a), _gaq.push(["_trackEvent", "colorPicker", a, "Success"])) : (console.warn("ColorPicker :: Error fetching color for domain %s", a), b(), _gaq.push(["_trackEvent", "colorPicker", a, "Failure"]))
                }, error: function () {
                    console.warn("ColorPicker :: Error fetching color for domain %s", a), b()
                }})
            } catch (d) {
                console.warn("ColorPicker :: Error fetching color for domain %s", a), b()
            }
        })
    }

    return{hexToRgb: a, hexToRgba: b, rgbToHex: c, shadowColor: d, colorLuminance: e, contrastFilter: f, webColorPicker: g}
}(), userVoice = function () {
    "use strict";
    function a(a) {
        var b = config.guid ? config.guid : (new Date).getTime();
        idb.getAll("SPOTS_DATA", function (c) {
            var d = [];
            _.each(c, function (a) {
                var b = spotsManager.getSpotByID(a.id);
                b && b.sync && d.push(spotsManager.getSpotByID(a.id).name + "-" + a.sequence)
            });
            var e = d.join("|"), f = {version: config.version, token: config.token, uuid: config.uuid, didLogin: config.didLogin, installedAndroidApp: config.installedAndroidApp, hasAndroidDevices: config.hasAndroidDevices, userSize: _.size(config.user), token_last_renew: config.token_last_renew, installationDate: config.installationDate, idp: config.idp, sequences: e};
            f = JSON.stringify(f), f = spotsAPI.encrypt(f);
            var g = {guid: b, data: f};
            a(g)
        })
    }

    return{getCustomParams: a}
}(), init = function () {
    configAPI.init(function () {
        config.uuid || (configAPI.set("uuid", idb.getUUID()), configAPI.set("baseVersion", config.version)), configAPI.setDefault("guid", null), configAPI.setDefault("user", null), trackExtensionEvents()
    })
}, trackExtensionEvents = function () {
    var a = function (a) {
        var b = ["id", "name", "version", "enabled", "disabledReason", "type"], c = [];
        return a && _.each(b, function (b) {
            a[b] && c.push(a[b])
        }), c.join("_")
    };
    chrome.management.onInstalled.addListener(function (b) {
        _gaq.push(["_trackEvent", "Extension", "Installed", a(b)])
    }), chrome.management.onUninstalled.addListener(function (a) {
        _gaq.push(["_trackEvent", "Extension", "Uninstalled", a])
    }), chrome.management.onEnabled.addListener(function (b) {
        _gaq.push(["_trackEvent", "Extension", "Enabled", a(b)])
    }), chrome.management.onDisabled.addListener(function (b) {
        _gaq.push(["_trackEvent", "Extension", "Disabled", a(b)])
    }), chrome.runtime.onStartup.addListener(function () {
        _gaq.push(["_trackEvent", "Extension", "Startup"])
    }), addLoginWindowListener(), initSpotsManager()
}, addLoginWindowListener = function () {
    var a = new RegExp(config.url_auth_complete, "i");
    chrome.tabs.onUpdated.addListener(function (b, c, d) {
        if ("loading" == d.status && d.url && a.test(d.url)) {
            var e = d.url;
            chrome.tabs.remove(b);
            var f = urls.urlParameter(e, "success"), g = urls.urlParameter(e, "token"), h = urls.urlParameter(e, "platform"), i = urls.urlParameter(e, "fbAccessToken");
            "true" == f ? (configAPI.set("didLogin", !0), configAPI.set("idp", h), _gaq.push(["_trackEvent", "Login", h, "Success"]), configAPI.set("token", g), configAPI.set("token_last_renew", (new Date).getTime()), i && configAPI.set("fbAccessToken", i), initUser(!1, function (a) {
                a ? eventManager.dispatchEvent("CONFIG", "USER_LOGIN_SUCCESS", h) : (_gaq.push(["_trackEvent", "Login", h, "Init-User"]), eventManager.dispatchEvent("CONFIG", "USER_LOGIN_ERROR", e))
            })) : (_gaq.push(["_trackEvent", "Login", h, "Failure"]), eventManager.dispatchEvent("CONFIG", "USER_LOGIN_ERROR", e))
        }
    })
}, initSpotsManager = function () {
    spotsManager.init(function () {
        initDataStores()
    })
}, initDataStores = function () {
    idb.initializeDataStores(function () {
        eventManagerCleaner()
    })
}, eventManagerCleaner = function () {
    eventManager.init(function () {
        initNotificationManager()
    })
}, initNotificationManager = function () {
    notificationManager.init(function () {
        initMagic()
    })
}, initMagic = function () {
    magicAPI.init(function () {
        initFtue()
    })
}, initFtue = function () {
    ftueAPI.init(function () {
        initPatchHelper()
    })
}, initPatchHelper = function () {
    patchHelper.init(function () {
        initLanguages()
    })
}, initLanguages = function () {
    languageManager.init(function () {
        initSpotData()
    })
}, initSpotData = function () {
    idb.getAll("SPOTS_DATA", function (a) {
        $.isEmptyObject(a) ? async.map(spotsManager.getSpotsArray(), function (a, b) {
            idb.add("SPOTS_DATA", {id: a.id, sequence: 0}, function () {
                b(null)
            }, !1)
        }, function () {
            initUser(!0)
        }) : initUser(!0)
    })
}, initUser = function (a, b) {
    config.token ? 0 !== _.size(config.user) && config.user.guid && config.user.token ? (pullUpdates(a), b && b(config.user)) : spotsAPI.GET("user", null, function (c) {
        configAPI.set("user", c), configAPI.set("token", c.token), configAPI.set("guid", c.guid), pullUpdates(a), b && b(config.user)
    }, function () {
        a && pullStaticRedirects(), b && b(!1)
    }) : (configAPI.remove("user"), configAPI.remove("guid"), a && (pullStaticRedirects(), b && b(!1)))
}, pullUpdates = function (a) {
    spotsAPI.requestUpdate(null, function () {
        spotsAPI.postQueue(function () {
        }, function () {
            console.error("%c background :: --> pushUpdates error", "background:#dfdfdf;")
        })
    }, function () {
        console.error("%c background :: --> pullUpdates Error", "background:#dfdfdf;")
    }), initPushService(a)
}, initPushService = function (a) {
    pushService.init(), userTokenRenew(a)
}, userTokenRenew = function (a) {
    configAPI.setDefault("token_last_renew", 0);
    var b = config.token_valid_time / config.token_renew_attempts, c = config.token_valid_time - ((new Date).getTime() - config.token_last_renew);
    b > c && user.tokenRenew(), setTimeout(function () {
        user.tokenRenew(), userTokenRenew()
    }, b), a && pullStaticRedirects()
}, pullStaticRedirects = function () {
    getReferralSource()
}, getReferralSource = function () {
    config.referredBy || chrome.tabs.query({url: "<all_urls>"}, function (a) {
        var b = _.find(a, function (a) {
            return a.url && "spots" == urls.urlParameter(a.url.toLowerCase(), "p") && urls.urlParameter(a.url.toLowerCase(), "r")
        });
        b ? (b = urls.urlParameter(b.url.toLowerCase(), "r"), configAPI.set("referredBy", b)) : (b = "none", configAPI.set("referredBy", b)), _gaq.push(["_trackEvent", "New User", "Referral", b])
    }), getInstallationDate()
}, getInstallationDate = function () {
    config.installationDate ? initReview() : utilsAPI.getCurrentTimeStamp(function (a) {
        a && configAPI.set("installationDate", a), initReview()
    })
}, initReview = function () {
    reviewAPI.init(), loadNotificationHandlers()
}, loadNotificationHandlers = function () {
    refreshExtension(), window.facebook = function () {
        "use strict";
        function a(a) {
            if (config.fbAccessToken && config.user && config.user.fbid && (c(), f(3), b()), !config.facebookRateUsModalDisplayed) {
                var d = moment(Number(utilsAPI.decrypt(config.installationDate)));
                moment().isAfter(d.add(n, "d")) && configAPI.set("showFacebookRateUsModal", !0)
            }
            a && a()
        }

        function b() {
            setInterval(function () {
                idb.getAll(l, function (a) {
                    _.each(a, function (a) {
                        a.expirationDate < (new Date).getTime() && idb.remove(l, a.id, function () {
                        })
                    })
                })
            }, 108e5)
        }

        function c() {
            e(d);
            var a = new Date((new Date).setDate((new Date).getDate() + 1)), b = new Date(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0, 0) - new Date;
            setTimeout(function () {
                c()
            }, b)
        }

        function d(a) {
            _.each(a, function (a) {
                idb.search(l, function (b) {
                    return b.id == a.uid
                }, function (b) {
                    if (0 === b.length) {
                        var c = {id: a.uid, name: a.name, Date: new Date(a.birthday_date).getTime(), expirationDate: new Date((new Date).setDate(new Date(a.birthday_date).getDate() + 1)).setHours(0, 0, 0, 0), image: a.pic_square, firstName: a.first_name};
                        idb.add(l, c, function () {
                        }, !1), notificationManager.set({spotID: l, type: "Facebook-Birthday", objectID: c.id, expiration: c.expirationDate, priority: 2, newtab: !0, opentab: !0, toast: !1}, null)
                    }
                })
            })
        }

        function e(a) {
            var b = "SELECT uid,name,pic_square,birthday_date,first_name FROM user WHERE(substr(birthday_date, 0, 2)=" + ((new Date).getMonth() + 1) + ")AND(substr(birthday_date, 3, 2)=" + (new Date).getDate() + ")AND uid IN(SELECT uid2 FROM friend WHERE uid1= me()) order by name", c = m + "fql?q=" + b + "&access_token=" + config.fbAccessToken;
            jQuery.ajax({url: c, dataType: "json", xhrFields: {withCredentials: !0}, crossDomain: !0, success: function (b) {
                a && a(b.data)
            }})
        }

        function f(a) {
            g(a, h), setInterval(function () {
                g(a, h)
            }, 108e5)
        }

        function g(a, b) {
            var c = new Date, d = new Date((new Date).setDate((new Date).getDate() + a)), e = i(c), f = i(d), g = "SELECT name,eid, pic_small,venue, location, start_time FROM event WHERE eid IN (SELECT eid FROM event_member WHERE uid =  me()) AND start_time >='" + e + "' AND start_time <='" + f + "'", h = m + "fql?q=" + g + "&access_token=" + config.fbAccessToken;
            jQuery.ajax({url: h, dataType: "json", xhrFields: {withCredentials: !0}, crossDomain: !0, success: function (a) {
                b && b(a.data)
            }})
        }

        function h(a) {
            _.each(a, function (a) {
                idb.search(l, function (b) {
                    return b.id == a.eid
                }, function (b) {
                    if (0 === b.length) {
                        var c = {id: a.eid, name: a.name, Date: new Date(a.start_time).getTime(), location: a.location, expirationDate: (new Date).setDate(new Date(a.start_time).getDate()), image: a.pic_small};
                        idb.add(l, c, function () {
                        }, !1), notificationManager.set({spotID: l, type: "Facebook-Event", objectID: c.id, expiration: c.expirationDate, priority: 2, newtab: !0, opentab: !0, toast: !1}, null)
                    }
                })
            })
        }

        function i(a) {
            Math.abs(a.getTimezoneOffset() / 60).toString();
            return a.getUTCFullYear() + "-" + k(a.getUTCMonth() + 1) + "-" + k(a.getUTCDate()) + "T" + k(a.getUTCHours()) + ":" + k(a.getUTCMinutes()) + ":" + k(a.getUTCSeconds()) + encodeURIComponent(j(a))
        }

        function j(a) {
            var b = a.getTimezoneOffset() > 0 ? "-" : "+", c = Math.abs(a.getTimezoneOffset()), d = k(Math.floor(c / 60)), e = k(c % 60);
            return b + d + e
        }

        function k(a) {
            return 10 > a ? "0" + a : a
        }

        config.module_import_list.push("facebook");
        var l = spotsManager.spotID("facebook"), m = "https://graph.facebook.com/", n = 2;
        return a(), {init: a, getTodaysBirthdays: e, setBirthdaysNotifications: c, getUpcomingEvents: g, clearExpiredItems: b}
    }(), window.bookmarks = function () {
        "use strict";
        function a(a, b, c) {
            chrome.bookmarks.search(a, function (d) {
                d = _.first(d, b), c && c({query: a, spotID: spotsManager.spotID("favorites"), type: "bookmarks", priority: 200, results: d})
            })
        }

        return{search: a}
    }(), window.chromeApps = function () {
        "use strict";
        function a(a) {
            _.size(d) > 0 ? a(d) : chrome.management.getAll(function (b) {
                d = [], _.each(b, function (a) {
                    a.enabled && a.isApp && (_.size(a.icons) > 0 && (a.icon = a.icons[a.icons.length - 1].url), d.push(a))
                }), a(d)
            })
        }

        function b(b, c, d) {
            a(function (a) {
                var f = window.search.buildSearchRegex(b), g = _.filter(a, function (a) {
                    return f.test(a.name) || f.test(a.shortName)
                });
                g = _.first(g, c);
                var h = g.map(function (a) {
                    return e(a.icon).then(function (b) {
                        return a.icon = b, a
                    })
                });
                $.when.apply($, h).done(function () {
                    d && d({query: b, spotID: spotsManager.spotID("favorites"), type: "chrome-apps", priority: 400, results: g})
                })
            })
        }

        function c(a) {
            webappsUtils.launch(a)
        }

        config.module_import_list.push("chromeApps");
        var d, e = _.memoize(function (a) {
            return $.Deferred(function (b) {
                var c = new XMLHttpRequest;
                c.onreadystatechange = function () {
                    if (4 == this.readyState && 200 == this.status) {
                        var a = new FileReader;
                        a.onload = function (a) {
                            b.resolve(a.target.result)
                        }, a.readAsDataURL(this.response)
                    }
                }, c.open("GET", a), c.responseType = "blob", c.send()
            })
        });
        return{getChromeApps: a, search: b, launchApp: c}
    }(), window.favorites = function () {
        "use strict";
        function a() {
            idb.getAll(s, function (a) {
                a.DIRECTORY ? (t = !1, r = a, eventManager.dispatchEvent(s, "FAVORITES_EVENT", {type: "UPDATE", data: r}), n()) : b(function (a) {
                    r = a, eventManager.dispatchEvent(s, "FAVORITES_EVENT", {type: "UPDATE", data: r})
                })
            })
        }

        function b(a) {
            gallery.getGallery(function (b) {
                var c = {DIRECTORY: {id: "DIRECTORY", directory: b.presets.directory}};
                _.each(c.DIRECTORY.directory, function (a) {
                    _.each(a.items, function (a) {
                        var d = b.items[a];
                        c[a] = {id: a, gallery_id: a, title: d.title, url: d.web && d.web.urls && d.web.urls["default"] ? "http://" + String(d.web.urls["default"]).replace(/(http|https):\/\//, "") : null, icon: d.assets.logo ? d.assets.logo : null, color: d.assets.color}
                    })
                }), a(c)
            })
        }

        function c(a) {
            a || (a = $.noop), t ? async.map(_.toArray(r), function (a, b) {
                idb.add(s, a, b, !0)
            }, function () {
                t = !1, a()
            }) : a()
        }

        function d(a) {
            r ? a && a(r) : _.delay(function () {
                d(a)
            }, 100)
        }

        function e(a, b) {
            _.isObject(a) || (a = {id: a}), d(function (c) {
                var d = a.id ? c[a.id] : _.find(c, a);
                b(d || null)
            })
        }

        function f(a, b, c) {
            var d = _.reject(_.toArray(r), function (a) {
                return"DIRECTORY" == a.id
            }), e = window.search.buildSearchRegex(a), f = _.filter(d, function (a) {
                return e.test(a.title) || e.test(a.url)
            });
            f = _.first(f, b), c && c({query: a, spotID: s, type: "favorites", priority: 800, results: f})
        }

        function g(a, b, d) {
            if (d || (d = $.noop), a = angular.copy(a)) {
                var e = 0;
                if (b && _.isNumber(b))e = b; else if (b && _.isString(b)) {
                    var f = _.findWhere(r.DIRECTORY.directory, {id: b});
                    e = _.indexOf(r.DIRECTORY.directory, f)
                } else if (b && _.isObject(b)) {
                    var g = _.findWhere(r.DIRECTORY.directory, {id: b.id});
                    e = _.indexOf(r.DIRECTORY.directory, g)
                }
                c(function () {
                    idb.add(s, a, function (b) {
                        a.id = b, r[b] = a, r.DIRECTORY.directory[e].items.push(b), o(function () {
                            eventManager.dispatchEvent(s, "FAVORITES_EVENT", {type: "ITEM_ADDED", data: a}), d(a)
                        })
                    }, !0)
                })
            } else d(!1)
        }

        function h(a, b) {
            b || (b = $.noop), a = angular.copy(a), a ? idb.update(s, a, function () {
                eventManager.dispatchEvent(s, "FAVORITES_EVENT", {type: "ITEM_UPDATED", data: a}), b(a)
            }, !0) : b(!1)
        }

        function i(a, b) {
            if (b || (b = $.noop), a = angular.copy(a)) {
                var d = a;
                _.isObject(a) && (d = a.id), c(function () {
                    idb.remove(s, d, function () {
                        delete r[d], _.map(r.DIRECTORY.directory, function (a) {
                            return a.items = _.without(a.items, d), a
                        }), o(function () {
                            eventManager.dispatchEvent(s, "FAVORITES_EVENT", {type: "ITEM_REMOVED", data: d}), b()
                        })
                    }, !0)
                })
            } else b(!1)
        }

        function j(a, b) {
            b || (b = $.noop), r.DIRECTORY.directory.push({id: idb.getUUID(), name: a, items: []}), c(function () {
                o(b)
            })
        }

        function k(a, b) {
            if (b || (b = $.noop), a = angular.copy(a), !a || _.isUndefined(a.id))b(!1); else {
                var d = _.findWhere(r.DIRECTORY.directory, {id: a.id}), e = _.indexOf(r.DIRECTORY.directory, d);
                r.DIRECTORY.directory[e] = a, c(function () {
                    o(b)
                })
            }
        }

        function l(a, b) {
            b || (b = $.noop), a = angular.copy(a);
            var d = a;
            _.isObject(a) && (d = a.id);
            var e = _.findWhere(r.DIRECTORY.directory, {id: d}), f = _.indexOf(r.DIRECTORY.directory, e), g = r.DIRECTORY.directory[f].items;
            r.DIRECTORY.directory = _.filter(r.DIRECTORY.directory, function (a) {
                return a.id != d
            }), _.size(g) > 0 ? async.map(g, function (a, b) {
                idb.remove(s, a, function () {
                    delete r[a], b(null)
                }, !0)
            }, function () {
                c(function () {
                    o(b)
                })
            }) : c(function () {
                o(b)
            })
        }

        function m(a, b) {
            b || (b = $.noop);
            var c = urls.getHostName(a, !0);
            if (u[c])u[c].requestedUrl = a, b(u[c]); else {
                u[c] = {item: {url: a}, requestedUrl: a, prettyUrl: c, palette: [], gallery: null};
                var d = gallery.searchByDomain(c);
                d ? (u[c].item.gallery_id = d.id, u[c].item.title = d.title, u[c].item.icon = d.assets.logo ? d.assets.logo : null, u[c].item.color = d.assets.color, u[c].gallery = d, u[c].palette = d.assets.palette, u[c].palette.unshift(d.assets.color), b(u[c])) : graphicAssets.webColorPicker(c, function (a) {
                    a && a.r && (u[c].item.color = a.c, u[c].palette = a.p, u[c].palette.unshift(a.c)), urls.getTitleByUrl(c, function (a) {
                        a && (u[c].item.title = a), b(u[c])
                    })
                })
            }
        }

        function n() {
            idb.getAll(s, function (a) {
                if (a) {
                    var b = 0;
                    _.each(a.DIRECTORY.directory, function (c) {
                        c.items = _.filter(c.items, function (c) {
                            return _.isUndefined(a[c]) ? (b++, !1) : !0
                        }), c.id || (console.error("favorites :: found a category without an id", c), c.id = idb.getUUID(), b++)
                    }), b > 0 && idb.update(s, a.DIRECTORY, function () {
                        r = a, eventManager.dispatchEvent(s, "FAVORITES_EVENT", {type: "DIRECTORY_UPDATE", data: a.DIRECTORY.directory})
                    }, !0)
                }
            })
        }

        function o(a) {
            a || (a = $.noop), r.DIRECTORY.id = "DIRECTORY", idb.update(s, r.DIRECTORY, function () {
                eventManager.dispatchEvent(s, "FAVORITES_EVENT", {type: "DIRECTORY_UPDATE", data: r.DIRECTORY.directory}), a()
            }, !0)
        }

        function p(a) {
            a || (a = $.noop), d(function (b) {
                var c = _.map(b.DIRECTORY.directory, function (a) {
                    return{name: a.name, id: a.id}
                });
                a(c)
            })
        }

        function q(a, b, c) {
            var d, e;
            _.each(r.DIRECTORY.directory, function (c, f) {
                -1 != c.items.indexOf(a) && (d = f), b == c.id && (e = f)
            }), r.DIRECTORY.directory[d].id !== b && (r.DIRECTORY.directory[d].items = _.reject(r.DIRECTORY.directory[d].items, function (b) {
                return b == a
            }), r.DIRECTORY.directory[e].items.push(a), o(c))
        }

        config.module_import_list.push("favorites");
        var r, s = spotsManager.spotID("favorites"), t = !0, u = {};
        return a(), eventManager.addEventListener(s, "UPDATE_EVENT", a), {addItem: g, editItem: h, removeItem: i, addCategory: j, editCategory: k, removeCategory: l, getItem: e, getFavorites: d, search: f, getDetailsForUrl: m, getCategories: p, changeItemCategory: q}
    }(), window.recentlyClosed = function () {
        "use strict";
        function a(a, b) {
            tabs.getRecentlyClosed(function (c) {
                b && b(_.first(c, a))
            })
        }

        return config.module_import_list.push("recentlyClosed"), {getItems: a}
    }(), window.topSites = function () {
        "use strict";
        function a(a) {
            a || (a = $.noop), chrome.topSites.get(function (b) {
                async.map(b, function (a, b) {
                    try {
                        gallery.updateFavItemByDomain(a.url, a);
                        var c = urls.getPrettyTitle(a.url, a.title);
                        c && (a.title = c), graphicAssets.webColorPicker(a.url, function (c) {
                            c && (a.picker = c, a.color || (a.color = c.c)), b(null)
                        })
                    } catch (d) {
                        b(null), console.error(" error in getTopSites: ", d)
                    }
                }, function () {
                    _.size(b) > 0 && (d = b, e = (new Date).getTime()), a(b)
                })
            })
        }

        function b(b) {
            d ? (b(d), (new Date).getTime() - e > 6e5 && a()) : a(b)
        }

        function c(a, c, d) {
            b(function (b) {
                var e = window.search.buildSearchRegex(a), f = _.filter(b, function (a) {
                    return e.test(a.title) || e.test(a.url)
                });
                f = _.first(f, c), d && d({query: a, spotID: spotsManager.spotID("favorites"), type: "top-sites", priority: 600, results: f})
            })
        }

        config.module_import_list.push("topSites");
        var d, e;
        return{getTopSites: b, search: c}
    }(), window.gallery = function () {
        function a() {
            idb.getAll(spotsManager.spotID("gallery"), function (a) {
                !a || $.isEmptyObject(a) ? $.ajax(config.gallery_local_data_path + config.cb, {dataType: "text", type: "GET", success: function (a) {
                    e(a, function () {
                        b(!0)
                    })
                }, error: function (a) {
                    console.error(a)
                }}) : (angular.forEach(a, function (a) {
                    i[a.id] = a.value
                }), b(!1))
            })
        }

        function b(a) {
            h = angular.copy(i.items), $.ajax(config.gallery_remote_data_path + config.cb, {dataType: "text", type: "GET", success: function (f) {
                e(f, function (e) {
                    e ? (j = config.gallery_min_updateFailTimeout, configAPI.set("gallery_last_update", (new Date).getTime()), a || c(h), setTimeout(b, config.gallery_autopull_interval)) : d()
                })
            }, error: d})
        }

        function c(a) {
            var b = [];
            angular.forEach(i.items, function (c, d) {
                !a[d] && c.assets && c.assets.icon && c.description && b.push(d)
            }), b.length > 0
        }

        function d() {
            j += j, j > config.gallery_max_updateFailTimeout && (j = config.gallery_max_updateFailTimeout), setTimeout(function () {
                b()
            }, j)
        }

        function e(a, b) {
            var c = null;
            try {
                var d = utilsAPI.decrypt(a);
                c = JSON.parse(d)
            } catch (e) {
                console.error("Decrypt error:", e), b(!1)
            }
            if (c && (!i.version || i.version < c.version))try {
                idb.clear(spotsManager.spotID("gallery")), i = {};
                var f = [];
                angular.forEach(c, function (a, b) {
                    i[b] = a, f.push({type: "put", value: {id: b, value: a}})
                }), idb.batch(spotsManager.spotID("gallery"), f, function () {
                    b(!0)
                }, function () {
                    b(!1)
                })
            } catch (e) {
                console.error("Handle data Error:", e), b(!1)
            }
        }

        function f(a) {
            return a = urls.getHostName(a, !0), _.find(i.items, function (b, c) {
                var d = new RegExp(b.web.match);
                return d.test(a) ? (b.id = c, b) : !1
            })
        }

        function g(a) {
            i && i.items ? a(i) : _.delay(function () {
                g(a)
            }, 100)
        }

        config.module_import_list.push("gallery");
        var h, i = {}, j = config.gallery_min_updateFailTimeout;
        return a(), {updateRepository: function (a) {
            b(a)
        }, gallery: function () {
            return i
        }, discoveryItemsArray: function () {
            var a = [];
            return _.each(i.items, function (b, c) {
                b.assets && b.assets.icon && b.description && (b.id = c, a.push(b))
            }), a
        }, searchByDomain: f, updateFavItemByDomain: function (a, b) {
            var c = f(a);
            c ? (b.gallery_id = c.id, b.title = c.title, c.assets && (b.color = c.assets.color ? c.assets.color : "#ffffff", c.assets.logo && (b.icon = c.assets.logo))) : delete b.icon
        }, getFavItemColorPalette: function (a) {
            var b = f(a);
            return b.assets.palette
        }, getGallery: g}
    }(), window.call_log = function () {
        "use strict";
        function a() {
            idb.getAll(k, function (a) {
                d(a), eventManager.dispatchEvent(k, "CACHE_UPDATE"), _.isEmpty(j) || configAPI.set("hidePhone", !1)
            }), b()
        }

        function b() {
            magicAPI.getLastUpdateTimestamp(k, function (a) {
                magicAPI.getItems(l, function (b) {
                    c(a, b)
                })
            })
        }

        function c(a, b) {
            var c = 0;
            idb.search(k, function (b) {
                return b.from && b.timestamp > a
            }, function (a) {
                if (a.length > 0) {
                    var d = [];
                    _.each(a, function (a) {
                        var e = a.number, f = _.find(d, function (a) {
                            return magicAPI.getObjectKey(l, e) == a.id
                        });
                        f || (f = _.find(b, function (a) {
                            return magicAPI.getObjectKey(l, e) == a.id
                        })), f ? f.score++ : f = magicAPI.createMagicItem(l, e, 1), d.push(f), a.timestamp > c && (c = a.timestamp)
                    }), magicAPI.setItems(l, d), magicAPI.setLastUpdateTimestamp(k, parseInt(c, 10))
                }
            })
        }

        function d(a) {
            a = _.sortBy(a, function (a) {
                return a.timestamp
            }), j = [];
            var b;
            angular.forEach(a, function (a) {
                b && b.number == a.number || (b = a, b.calls = [], j.push(b)), b.calls.push({type: a.type, timestamp: a.timestamp})
            })
        }

        function e(a, b, c) {
            if (j) {
                var d = j.length;
                if (a) {
                    d = -1;
                    for (var f = j.length - 1; f >= 0; f--)if (j[f].timestamp == a.timestamp) {
                        d = f;
                        break
                    }
                    0 >= d && c([])
                }
                var g = d - b > 0 ? d - b : 0;
                c(j.slice(g, d))
            } else setTimeout(function () {
                e(a, b, c)
            }, 100)
        }

        function f(a) {
            if (j && a) {
                for (var b, c = j.length - 1; c >= 0; c--)if (j[c].timestamp == a.timestamp) {
                    b = c + 1;
                    break
                }
                var d = [];
                if (b && b < j.length) {
                    var e = j.length;
                    d = j.slice(b, e)
                }
                return b > 0 && a.calls.length < j[b - 1].calls.length && d.unshift(j[b - 1]), d
            }
            return console.warn("Calls have not been loaded yet or an item has not been sent, returning an empty array."), []
        }

        function g(a) {
            idb.getAll(k, function (b) {
                a(b)
            })
        }

        function h(a, b) {
            idb.get(k, a, function (a) {
                b(a)
            })
        }

        function i(a) {
            notificationManager.getAll({spotID: k}, function (b) {
                b && _.each(b, function (b) {
                    b.data.number == a && notificationManager.clear(b.id, null)
                })
            })
        }

        config.module_import_list.push("call_log");
        var j, k = spotsManager.spotID("call_log"), l = spotsManager.spotID("contacts");
        return a(), eventManager.addEventListener(k, "UPDATE_EVENT", function () {
            a()
        }), {getObject: h, getAllObjects: g, getAllObjectsArray: function (a) {
            g(function (b) {
                a(_.toArray(b))
            })
        }, getPreviousCalls: e, getNewCalls: f, clearNotificationsForNumber: i}
    }(), window.contacts = function () {
        "use strict";
        function a() {
            idb.getAll(o, function (a) {
                _.each(a, function (a) {
                    _.each(a.phones, function (b) {
                        p[b] = a
                    })
                }), eventManager.dispatchEvent(o, "CACHE_UPDATE", null), contacts.getAllObjects(function (a) {
                    _.isEmpty(a) || (configAPI.set("InstalledAndroidApp", !0), configAPI.set("hidePhone", !1))
                })
            })
        }

        function b(a) {
            if (p[a])return p[a];
            var b = a.toString().replace(/\D/g, "");
            if (b = parseInt(b, 10), b.length >= 5) {
                var c = _.keys(p), d = _.find(c, function (a) {
                    return-1 !== a.indexOf(b) ? !0 : void 0
                });
                if (d) {
                    var e = p[d];
                    return p[a] = e, e
                }
            }
            return null
        }

        function c(a) {
            idb.getAll(o, function (b) {
                a(b)
            })
        }

        function d(a) {
            c(function (b) {
                a(_.toArray(b))
            })
        }

        function e(a, b) {
            idb.get(o, a, function (a) {
                b(a)
            })
        }

        function f(a, b) {
            var c = _.sortBy(a, function (a) {
                if (a.notifications) {
                    var b = _.max(a.notifications, function (a) {
                        return a
                    });
                    return a.score = b, b
                }
                return"number" == typeof a.score ? a.score : -1
            });
            b(c)
        }

        function g(a, b, c) {
            magicAPI.getItems(o, function (d) {
                _.each(a, function (a) {
                    var b = _.find(this, function (b) {
                        var c = _.find(a.phones, function (a) {
                            return b.objectID == a
                        });
                        return c
                    });
                    a.score = b ? b.score : 0
                }, d), f(a, function (a) {
                    b && (a = _.last(a, b));
                    for (var d = 0; d < a.length; d++)a[d].score = d;
                    c(a)
                })
            })
        }

        function h(a, b, c, d, e) {
            idb.search(o, function (a) {
                return b.test(a.givenName) || b.test(a.familyName) || b.test(a.display)
            }, function (a) {
                g(a, null, function (a) {
                    var b = {spotID: o, priority: 1, results: []};
                    _.each(a, function (a) {
                        b.results.push({phones: a.phones, label: a.display, givenName: a.givenName, image: a.image, priority: a.score, "class": "contacts-search"})
                    }), e(null, b)
                })
            })
        }

        function i() {
            n = null
        }

        function j(a, b) {
            _.size(n) >= a ? b(_.last(n, a)) : magicAPI.getItems(o, function (c) {
                f(c, function (c) {
                    n = _.last(c, a), b(n)
                })
            })
        }

        function k(a) {
            return a.defaultNumber || _.find(a.phones, function (a, b) {
                return"mobile" == b.toLowerCase()
            }) || _.toArray(a.phones)[0]
        }

        function l(a, b, c) {
            var d = window.search.buildSearchRegex(a);
            idb.search(o, function (a) {
                return d.test(a.givenName) || d.test(a.familyName) || d.test(a.display)
            }, function (d) {
                g(d, q, function (d) {
                    d = _.first(d, b), c && c({query: a, spotID: spotsManager.spotID("contacts"), type: "contacts", priority: 1e3, results: d})
                })
            })
        }

        function m(a) {
            return phoneformat.formatLocal(geolocation.getCountryCode(), a)
        }

        config.module_import_list.push("contacts");
        var n, o = spotsManager.spotID("contacts"), p = {}, q = 3;
        return eventManager.addEventListener(o, "UPDATE_EVENT", a), eventManager.addEventListener("MAGIC", "ITEM_UPDATED", i), a(), {getObject: e, getAllObjects: c, getAllObjectsArray: d, getContactByPhoneNumber: b, searchAsync: h, getTopMagicResults: j, getContactDefaultPhone: k, search: l, normalizePhoneNumber: _.memoize(m)}
    }(), function () {
        function a(a) {
            a.spotID == c && a.data && magicAPI.clearNotification(contactsSpotID, a.data.number, a.id)
        }

        window.contactsSpotID = spotsManager.spotID("contacts");
        var b = spotsManager.spotID("call_log"), c = spotsManager.spotID("sms");
        eventManager.addEventListener("NOTIFICATIONS", "NOTIFICATION_CLEARED", a), eventManager.addEventListener(b, 1, function (a) {
            (new Date).getTime() - a.timestamp > 12e4 || (a.contact = contacts.getContactByPhoneNumber(a.number), a.contact || (a.contact = {}), a.contact.display || (a.contact.display = languageManager.getTranslation("unknown")), a.contact.image ? a.contact.toastImage = a.contact.image : (a.contact.image = "/img/default-image.svg", a.contact.toastImage = "/img/default-image-grey.png"), notificationManager.set({spotID: b, objectID: a.timestamp, expiration: (new Date).getTime() + 3e4, priority: 5, newtab: !1, opentab: !1, toast: {type: "basic", title: a.contact.display, message: languageManager.getTranslation("incoming_call"), contextMessage: a.number, iconUrl: a.contact.toastImage, eventTime: parseInt(a.timestamp, 10)}}, null), _gaq.push(["_trackEvent", "Phone", "Call-Notifications", "Incoming Call"]))
        }), eventManager.addEventListener(b, 2, function (a) {
            notificationManager.clear(b + "_" + a.timestamp), _gaq.push(["_trackEvent", "Phone", "Call-Notifications", "Answered Call"])
        }), eventManager.addEventListener(b, 3, function (a) {
            notificationManager.clear(b + "_" + a.timestamp), _gaq.push(["_trackEvent", "Phone", "Call-Notifications", languageManager.getTranslation("missed_call")])
        }), eventManager.addEventListener(b, 4, function () {
            _gaq.push(["_trackEvent", "Phone", "Call-Notifications", "Outgoing Call"])
        }), eventManager.addEventListener(b, "UPDATE_EVENT", function (a) {
            var c = _.findWhere(a, {spot_id: b}).sequences;
            _.each(c, function (c) {
                var d = _.where(c.sequence_data, {type: "add"});
                _.each(d, function (c) {
                    a = c.object_data, a.contact = contacts.getContactByPhoneNumber(a.number), a.contact || (a.contact = {}), a.contact.display || (a.contact.display = languageManager.getTranslation("unknown")), a.contact.image ? a.contact.toastImage = a.contact.image : (a.contact.image = "/img/default-image.svg", a.contact.toastImage = "/img/default-image-grey.png"), "3" == a.type ? (notificationManager.set({spotID: b, type: "Missed-Call", objectID: a.id, expiration: parseInt(a.timestamp, 10) + 288e5, priority: 5, newtab: !0, opentab: !0, toast: {type: "basic", title: a.contact.display, contextMessage: a.number, message: languageManager.getTranslation("missed_call"), iconUrl: a.contact.toastImage}}, function () {
                    }), _gaq.push(["_trackEvent", "Phone", "Call", "Missed"])) : call_log.clearNotificationsForNumber(a.number)
                })
            })
        }), eventManager.addEventListener(c, "UPDATE_EVENT", function (a) {
            var b = _.findWhere(a, {spot_id: c}).sequences;
            _.each(b, function (a) {
                var b = _.where(a.sequence_data, {type: "add"});
                _.each(b, function (a) {
                    var b = a.object_data;
                    "1" == b.type ? (b.contact = contacts.getContactByPhoneNumber(b.number), b.contact || (b.contact = {}), b.contact.display || (b.contact.display = languageManager.getTranslation("unknown")), b.contact.image ? b.contact.toastImage = b.contact.image : (b.contact.image = "/img/default-image.svg", b.contact.toastImage = "/img/default-image-grey.png"), notificationManager.set({spotID: c, objectID: b.id, expiration: parseInt(b.timestamp, 10) + 864e5, priority: 4, newtab: !1, opentab: !0, toast: {type: "basic", title: b.contact.display, contextMessage: b.number, message: b.text, iconUrl: b.contact.image}}, function (a) {
                        magicAPI.handleNotification(contactsSpotID, b.number, a)
                    }), _gaq.push(["_trackEvent", "Phone", "SMS-Received", "Incoming sms"])) : (_gaq.push(["_trackEvent", "Phone", "SMS-Received", "Outgoing sms"]), a.clearNotificationsForNumber(b.number))
                })
            })
        })
    }(), window.sms = function () {
        "use strict";
        function a() {
            g(), b()
        }

        function b() {
            magicAPI.getLastUpdateTimestamp(p, function (a) {
                magicAPI.getItems(q, function (b) {
                    c(a, b)
                })
            })
        }

        function c(a, b) {
            var c = 0;
            idb.search(p, function (b) {
                return b.from && b.timestamp > a
            }, function (a) {
                if (a.length > 0) {
                    var d = [];
                    _.each(a, function (a) {
                        var e = a.number, f = _.find(d, function (a) {
                            return magicAPI.getObjectKey(q, e) == a.id
                        });
                        f || (f = _.find(b, function (a) {
                            return magicAPI.getObjectKey(q, e) == a.id
                        })), f ? f.score++ : f = magicAPI.createMagicItem(q, e, 1), d.push(f), a.timestamp > c && (c = a.timestamp)
                    }), magicAPI.setItems(q, d), magicAPI.setLastUpdateTimestamp(p, parseInt(c, 10))
                }
            })
        }

        function d(a) {
            var b = _.filter(a, function (a) {
                return a.spot_id == p && (a.snapshot || a.sequences.length > 0)
            });
            b.length > 0 && g(function () {
                e(a)
            })
        }

        function e(a) {
            var b = [];
            _.each(a, function (a) {
                _.each(a.sequences, function (a) {
                    _.each(a.sequence_data, function (a) {
                        if (a.type = "add") {
                            var c = a.object_data;
                            b.push(c);
                            var d = c.number;
                            magicAPI.incrementItemScore(q, d), magicAPI.setLastUpdateTimestamp(p, c.timestamp)
                        }
                    })
                })
            }), eventManager.dispatchEvent(p, "SMS_EVENT", b)
        }

        function f(a) {
            notificationManager.getAll({spotID: p}, function (b) {
                b && _.each(b, function (b) {
                    b.data.number == a && notificationManager.clear(b.id, null)
                })
            })
        }

        function g(a) {
            idb.getAll(p, function (b) {
                var c = {};
                _.each(b, function (a) {
                    c[a.number] ? c[a.number].timestamp < a.timestamp && (c[a.number] = a) : c[a.number] = a
                }), o = [], _.each(c, function (a) {
                    o.push(a)
                }), o = _.sortBy(o, function (a) {
                    return a.timestamp
                }), _.isEmpty(o) || configAPI.set("hidePhone", !1), a && a()
            })
        }

        function h(a, b, c) {
            if (o) {
                var d = _.sortBy(o, function (a) {
                    return-1 * a.timestamp
                });
                if (d[a]) {
                    var e = a, f = a + b + 1 > d.length ? d.length : a + b;
                    c && c(d.slice(e, f))
                } else c && c([])
            } else setTimeout(function () {
                h(lastThreadFetched, threadFetchCount, c)
            }, 100)
        }

        function i(a) {
            return a ? (a(o), void 0) : o
        }

        function j(a, b) {
            idb.search(p, function (b) {
                return b.number == a.number || b.from && a.from && b.from == a.from
            }, function (a) {
                b(a)
            })
        }

        function k(a, b) {
            idb.search(p, function (b) {
                return b.number == a
            }, function (a) {
                b(a)
            })
        }

        function l(a) {
            idb.getAll(p, function (b) {
                a(b)
            })
        }

        function m(a) {
            l(function (b) {
                a(_.toArray(b))
            })
        }

        function n(a, b) {
            idb.get(p, a, function (a) {
                b(a)
            })
        }

        config.module_import_list.push("sms");
        var o, p = spotsManager.spotID("sms"), q = spotsManager.spotID("contacts");
        return a(), eventManager.addEventListener(p, "UPDATE_EVENT", d), {getObject: n, getAllObjects: l, getAllObjectsArray: m, getPreviousThreads: h, getAllThreads: i, getThread: j, getThreadForNumber: k, initMagic: b, clearNotificationsForNumber: f}
    }(), window.search = function () {
        "use strict";
        function a(a) {
            a.length < 3 && (a = "^" + a), a = a.replace(" ", "\\s");
            var b = new RegExp(a, "i");
            return b
        }

        function b(a, b) {
            c[a] ? b && _.each(c[a], function (a) {
                b(a)
            }) : a && (c[a] = {}, _.each(d, function (d) {
                window[d.service] && window[d.service].search && window[d.service].search(a, d.limit, function (d) {
                    d && (c[a][d.spotID + "_" + d.type] = d, b && b(d))
                })
            }))
        }

        config.module_import_list.push("search"), eventManager.addEventListener(spotsManager.spotID("search"), 1, function (a) {
            tabs.openLinkInNewTab(a.link)
        });
        var c = {}, d = [
            {service: "webSearch", limit: 4},
            {service: "favorites", limit: 3},
            {service: "topSites", limit: 3},
            {service: "bookmarks", limit: 3},
            {service: "chromeApps", limit: 3},
            {service: "contacts", limit: 3}
        ];
        return{search: b, buildSearchRegex: a}
    }(), window.webSearch = function () {
        function a(a, c, d) {
            if (a.length > 0) {
                var f = {label: a, score: 0, value: e + a, type: "web-default"}, g = {query: a, spotID: spotsManager.spotID("search"), type: "web-search", priority: 100, results: [f]};
                b(a, c, function (a, b) {
                    d && (a || (g.results = b.concat(g.results)), d(g))
                })
            } else d && d(null)
        }

        function b(a, b, h) {
            g[a] ? h(null, g[a]) : (c(), d = $.ajax({url: f, dataType: "json", data: {client: "chrome-omni", ie: "utf-8", oe: "utf-8", hl: "en-US", q: a}, success: function (c) {
                var d = [];
                if (c[1].length > 0) {
                    var f = c[1].reverse(), i = c[2].reverse(), j = c[4]["google:suggesttype"].reverse(), k = c[4]["google:suggestrelevance"].reverse();
                    _.each(j, function (a, b) {
                        var c = {label: f[b], score: k[b], value: e + f[b], type: "web"};
                        "NAVIGATION" == a ? (c.type = "navigation", c.value = f[b], i[b] && (c.label = i[b])) : "CALCULATOR" == a && (c.type = "calculator"), d.push(c)
                    }), d = _.last(d, b), g[a] = d
                }
                h(null, d)
            }, error: function (a, b, c) {
                h(c, [])
            }}))
        }

        function c() {
            d && (d.abort(), d = null)
        }

        var d, e = "https://www.google.com/?#q=", f = "http://google.com/complete/search", g = {};
        return{search: a}
    }(), window.weather = function () {
        function a() {
            return b(config.geolocation.lat, config.geolocation.lon)
        }

        function b(a, b) {
            return $.ajax({url: c, data: {lat: a, lon: b, units: f() ? "imperial" : "metric"}})
        }

        var c = config.weatherAPI, d = 6e5, e = null;
        unitSystem = null;
        var f = _.once(function () {
            var a = geolocation.getCountryCode();
            return _.some(["US", "JM", "PR", "GU", "VI", "KY", "PW", "BS", "BZ"], function (b) {
                return b === a
            })
        });
        return e = _.debounce(a, d, !0), {API_REFRESH_INTERVAL: d, getLocalWeather: function (a) {
            return geolocation.geolocate().then(function () {
                return e().then(a)
            })
        }}
    }(), addLoginWindowListener()
}, refreshExtension = function () {
    chrome.tabs.query({}, function (a) {
        _.each(a, function (a) {
            "chrome://newtab/" == a.url && chrome.tabs.reload(a.id)
        })
    }), _gaq.push(["_trackEvent", "Background", "Init-Complete"])
};
init();