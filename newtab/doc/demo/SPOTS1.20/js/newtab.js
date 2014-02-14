/**
 * Spots - 2014-01-28
 * http://spotsmagic.com
 *
 * Copyright (c) 2014 ironSource
 * Licensed Commercial <http://spotsmagic.com/terms>
 */
function checkIfArrayHasObject(a, b) {
    for (var c = 0; c < a.length; c++)if (a[c].id == b)return!0;
    return!1
}
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
}();
!function () {
    "use strict";
    function a(a, b, c) {
        if (1 === arguments.length && "function" == typeof arguments[0] && (c = arguments[0], a = null, b = null), 2 === arguments.length && "object" == typeof arguments[0] && "function" == typeof arguments[1] && (a = arguments[0], c = arguments[1], b = null), void 0 === c)throw"An iterator must be specified";
        "string" != typeof b && (b = "data-labels"), window.jQuery && a instanceof jQuery && (a = a.get(0)), void 0 == a && (a = document);
        var d = a.querySelectorAll(".i18n");
        Array.prototype.forEach.call(d, function (a) {
            if (a.hasAttribute(b)) {
                var d = a.getAttribute(b);
                d.trim && (d = d.trim());
                var e = d.split(" ");
                e.forEach(function (b) {
                    var d = b.split("#"), e = d[0], f = d[1], g = c(f);
                    if ("string" != typeof g && (g = ""), g.trim && (f = f.trim()), g && "innertext" == e.toLowerCase())try {
                        a.innerText = g
                    } catch (h) {
                    } else if (g && "innerhtml" == e.toLowerCase())try {
                        a.innerHTML = g
                    } catch (h) {
                    } else g && a.setAttribute(e, g)
                })
            }
        })
    }

    window.i18n = {template: function (b) {
        a(b, function (a) {
            return utils.getMessage(a)
        })
    }, translate: function (a, b) {
        var c = utils.getMessage(a.toLowerCase().replace(/\s|\,/g, ""));
        return"" != c ? c : b
    }}
}(jQuery), function () {
    "use strict";
    function a(a, b) {
        if (void 0 != chrome.extension.getBackgroundPage())chrome.runtime.getBackgroundPage(function (c) {
            b(c[a])
        }); else var c = 0, d = setInterval(function () {
            c++, c > 5 && clearInterval(d), void 0 != chrome.extension.getBackgroundPage() && (clearInterval(d), chrome.runtime.getBackgroundPage(function (c) {
                b(c[a])
            }))
        }, 200)
    }

    window.service = a
}();
var app = angular.module("spotsNewtab", ["ui.sortable"]);
app.config(["$routeProvider", function (a) {
    a.otherwise({redirectTo: "/app/newtab/newtab.html"})
}]), app.directive("ngClickOutside", ["$document", function (a) {
    var b;
    return{restrict: "A", link: function (c, d, e) {
        c.clickedOutside = function () {
            b = null
        }, d.bind("click", function (a) {
            b || (b = d);
            var c = b.find(a.target).length > 0;
            c && a.stopPropagation()
        }), a.bind("click", function () {
            b = null, c.$apply(e.ngClickOutside)
        })
    }}
}]), app.directive("ngLink", function () {
    var a, b, c = 20;
    return{restrict: "A", link: function (d, e, f) {
        e.mousedown(function (c) {
            a = c.pageX, b = c.pageY
        }), e.mouseup(function (d) {
            Math.abs(a - d.pageX) < c && Math.abs(b - d.pageY) < c && (1 == d.which ? (d.preventDefault(), config.favoritesOpenInNewTab ? tabs.openLinkInNewTab(f.ngLink) : window.location.href = urls.getFullURL(f.ngLink)) : 2 == d.which && (d.preventDefault(), tabs.openLinkInNewTab(f.ngLink)))
        })
    }}
}), app.directive("colorPicker", ["$timeout", function (a) {
    return{require: "ngModel", template: '<div class="color-picker" ng-class="{light:scheme==\'light\'}" ng-model="family"><div class="color-picker-family"><div ng-repeat="i in colors track by $index" class="color-picker-family-item" ng-style="{\'background-color\': i.f, width:(100 / colors.length)+\'%\'}" ng-class="{selected:family==$index}" ng-click="setFamily($index)"></div></div><div class="color-picker-shade"><div class="color-picker-shade-item" ng-repeat="c in colors[family].c track by $index" ng-style="{\'background-color\': c, width:(100 / colors[family].c.length)+\'%\'}" ng-class="{selected:selectedColor==c}" ng-click="setColor(c)"></div></div></div>', scope: {selectedColor: "=color", addColors: "=", ngChange: "&", model: "=ngModel"}, link: function (b, c, d) {
        b.colors = [], b.family = 0, "light" == d.colorPicker ? (b.scheme = "light", b.colors = [
            {f: "#7FAAFF", c: ["#7FAAFF", "#9DBDFF", "#BBD1FF", "#D8E5FF", "#EBF2FF"]},
            {f: "#59AEE3", c: ["#59AEE3", "#7FC0E9", "#A6D3F0", "#CCE6F6", "#E5F2FB"]},
            {f: "#59CFD0", c: ["#59CFD0", "#7FDADB", "#A6E6E6", "#CCF0F1", "#E5F8F8"]},
            {f: "#59B794", c: ["#59B794", "#7FC7AD", "#A6D8C6", "#CCE9DE", "#E5F4EE"]},
            {f: "#85CF59", c: ["#85CF59", "#A1DA7F", "#BDE5A6", "#D9F0CC", "#ECF3E5"]},
            {f: "#83B159", c: ["#83B159", "#A0C37F", "#BDD5A6", "#D9E7CC", "#ECF3E5"]},
            {f: "#F1CA59", c: ["#F1CA59", "#F4D67F", "#F8E2A6", "#FBEFCC", "#FDF7E5"]},
            {f: "#DFAC5A", c: ["#DFAC5A", "#E6BF80", "#EED3A7", "#F5E6CC", "#FAF2E5"]},
            {f: "#FFB275", c: ["#FFB275", "#FFC495", "#FFD6B5", "#FFE7D5", "#FFF3E9"]},
            {f: "#CB6E6E", c: ["#CB6E6E", "#D78F8F", "#E3B1B1", "#EFD2D2", "#F7E8E8"]},
            {f: "#FF6859", c: ["#FF6859", "#FF8B7F", "#FFAEA6", "#FFD1CC", "#FFE7E5"]},
            {f: "#F65971", c: ["#F65971", "#F87F92", "#FAA6B3", "#FCCCD3", "#FEE5E9"]},
            {f: "#FF59AC", c: ["#FF59AC", "#FF7FBF", "#FFA6D2", "#FFCCE5", "#FFE5F2"]},
            {f: "#FF97E8", c: ["#FF97E8", "#FFAFED", "#FFC7F3", "#FFDFF8", "#FFEFFB"]},
            {f: "#D687FF", c: ["#D687FF", "#DFA2FF", "#E9BEFF", "#F2DAFF", "#F9ECFF"]},
            {f: "#9070D8", c: ["#9070D8", "#A991E1", "#C3B3EA", "#DDD3F3", "#EEE9F9"]},
            {f: "#BBB6B3", c: ["#BBB6B3", "#CBC7C4", "#DBD8D6", "#EAE9E8", "#F4F4F3"]},
            {f: "#96A1A2", c: ["#96A1A2", "#AEB6B7", "#C7CCCD", "#DFE2E2", "#EFF0F0"]}
        ]) : (b.scheme = "dark", b.colors = [
            {f: "#303030", c: ["#021416", "#1A282A", "#303E40", "#465557", "#5E6E70"]},
            {f: "#777777", c: ["#352F2B", "#4C4540", "#645D58", "#7E7671", "#978F8A"]},
            {f: "#3F00DD", c: ["#00006F", "#000084", "#1E0098", "#3B0DAD", "#5424C3"]},
            {f: "#9025FF", c: ["#58009D", "#6800B3", "#9400D5", "#A528ED", "#C046FF"]},
            {f: "#FF3EC2", c: ["#7F0023", "#9E0038", "#BD004D", "#DD0065", "#FF007F"]},
            {f: "#FE0B6B", c: ["#BB0071", "#DA008B", "#F900A5", "#FF3AC1", "#FF5FDC"]},
            {f: "#C03544", c: ["#6E0012", "#8D0017", "#AD001D", "#CF0023", "#F10025"]},
            {f: "#FE1C03", c: ["#7C0003", "#6D0004", "#9C0000", "#DE0000", "#FF1700"]},
            {f: "#F73600", c: ["#660003", "#850000", "#A40000", "#C50000", "#E61F00"]},
            {f: "#FD6C05", c: ["#A21200", "#C23600", "#E25200", "#FF6B00", "#FF892B"]},
            {f: "#FEAB07", c: ["#713400", "#8F4C00", "#AD6500", "#CB7E00", "#EB9900"]},
            {f: "#FFC91E", c: ["#734800", "#916000", "#AE7900", "#CC9300", "#EAAD00"]},
            {f: "#5DA200", c: ["#002800", "#003C00", "#005500", "#1F6E00", "#418700"]},
            {f: "#30A700", c: ["#004C00", "#006400", "#007F00", "#169900", "#43B500"]},
            {f: "#00AB62", c: ["#002900", "#004117", "#00592C", "#007443", "#00905B"]},
            {f: "#00A8A9", c: ["#004C51", "#006569", "#007F82", "#009A9C", "#00B6B7"]},
            {f: "#009BF0", c: ["#002568", "#003981", "#00509B", "#0068B7", "#0082D4"]},
            {f: "#338AFF", c: ["#0023A1", "#0037BE", "#004DDA", "#0064F8", "#3B7CFF"]}
        ]), b.$watch("addColors", function (a) {
            a && _.each(a, function (a) {
                _.findWhere(b.colors, {f: a.f}) || b.colors.unshift(a)
            })
        }, !0), b.$watch("model", function (a) {
            a && _.each(b.colors, function (c, d) {
                _.each(c.c, function (c) {
                    c == a && (b.family = d, b.selectedColor = c)
                })
            })
        }, !0), b.setColor = function (c) {
            b.selectedColor = c, a(function () {
                b.ngChange()
            })
        }, b.setFamily = function (a) {
            b.family = a, b.setColor(b.colors[a].c[Math.floor(b.colors[a].c.length / 2)])
        }
    }}
}]), app.directive("fallbackSrc", function () {
    var a = {link: function (a, b, c) {
        b.bind("error", function () {
            angular.element(this).attr("src", c.fallbackSrc)
        })
    }};
    return a
}), app.directive("fallbackBg", function () {
    var a = {link: function (a, b, c) {
        b.bind("error", function () {
            b.css({"background-image": "url(" + c.fallbackSrc + ")"})
        })
    }};
    return a
}), app.filter("fromNow", [function () {
    return function (a) {
        return moment(parseInt(a, 10)).fromNow()
    }
}]), app.filter("dayOfWeek", [function () {
    return function (a) {
        return moment(parseInt(a, 10)).format("dddd")
    }
}]), app.filter("spotIconLetters", ["$cacheFactory", function (a) {
    var b = a("spotIconLetters");
    return function (a) {
        _.isObject(a) && (a.title ? a = a.title : a.url && (a = urls.getHostName(a.url, !0)));
        var c = a + "_" + config.favoritesLetterCount;
        if (!b.get(c)) {
            var d = a.substr(0, config.favoritesLetterCount);
            b.put(c, d)
        }
        return b.get(c)
    }
}]), app.filter("hexToRgba", ["$cacheFactory", function (a) {
    var b = a("hexToRgba");
    return function (a, c) {
        var d = a + "_" + c;
        if (!b.get(d)) {
            var e = graphicAssets.hexToRgba(a, c);
            b.put(d, e)
        }
        return b.get(d)
    }
}]), app.filter("normalizePhoneNumber", function () {
    return contacts.normalizePhoneNumber
}), app.filter("cleanURL", [function () {
    return function (a) {
        return urls.getHostName(a, !0)
    }
}]), app.filter("i18n", function () {
    var a = languageManager.getLangObj();
    return eventManager.addEventListener("SETTINGS", "LANGUAGE_CHANGED", function (b) {
        moment.lang(b.langName), a = b.obg, angular.element("body").scope().$apply()
    }, null, tabID), function (b) {
        return a && a[b] ? a[b] : b
    }
}), app.controller("NewtabMainCtrl", ["$scope", "$rootScope", "$user", "$eventManager", "$timeout", function (a, b, c, d) {
    "use strict";
    $(document).keyup(function (b) {
        27 == b.keyCode && a.modalPath && (a.closeModal(), a.$apply())
    }), a.config = config, a.configAPI = configAPI, config.cb = "?cb=0.1.20", a.window = window, a.getHostName = function (a) {
        return urls.getHostName(a, !0)
    };
    var e = "";
    a.googleLoginPopup = function () {
        _gaq.push(["_trackEvent", "Login", "google", "Start"]);
        var a = 600, b = 450;
        window.open(config.url_api + "/auth/google?uuid=" + config.uuid, "Google Login", e + "width=" + a + ",height=" + b + ",screenX=" + (window.screen.width / 2 - a / 2) + ",screenY=" + (window.screen.height / 2 - b / 2))
    }, a.facebookLoginPopup = function () {
        _gaq.push(["_trackEvent", "Login", "facebook", "Start"]);
        var a = 600, b = 450;
        window.open(config.url_api + "/auth/facebook?uuid=" + config.uuid, "Facebook Login", e + "width=" + a + ",height=" + b + ",screenX=" + (window.screen.width / 2 - a / 2) + ",screenY=" + (window.screen.height / 2 - b / 2))
    }, a.loginSuccessHandler = function () {
        b.doWhileClosingModal = null, a.closeModal(), a.$apply()
    }, d.addEventListener("CONFIG", "USER_LOGIN_SUCCESS", a.loginSuccessHandler, a, tabID), a.loginErrorHandler = function () {
        a.message = {text: "An error occurred while trying to login, Please restart your browser and try again. if the problem still exits please try a different identity provider.", "class": "alert-danger"}, a.$apply(), configAPI.set("guid", null), configAPI.set("token", null), configAPI.set("user", null)
    }, d.addEventListener("CONFIG", "USER_LOGIN_ERROR", a.loginErrorHandler, a, tabID), a.getUserImage = function () {
        return config && config.user ? config.user.fbid ? "https://graph.facebook.com/" + config.user.fbid + "/picture" : config.user.gpicture ? config.user.gpicture : null : null
    }, a.gae = function (a, b, c) {
        _gaq.push(["_trackEvent", a, b, c])
    }, a.openModal = function (c, d) {
        b.doWhileClosingModal = null, a.modalTitle = c, a.modalPath = d
    }, a.closeModal = function () {
        a.modalTitle = null, a.modalPath = null, b.doWhileClosingModal && b.doWhileClosingModal()
    }, a.getAndroidApp = function (b) {
        _gaq.push(["_trackEvent", "Android Notification", "Open"]), a.playUtilsAppID = b, a.openModal("android_app", "/app/newtab/partials/modals/AndroidAppModal.html" + config.cb)
    }, a.closeInstalledAndroidApp = function () {
        _gaq.push(["_trackEvent", "Android Notification", "Close"]), configAPI.set("InstalledAndroidAppCloseDate", (new Date).getTime())
    }, a.getiOSApp = function (b) {
        a.playUtilsAppID = b, a.openModal("ios_app", "/app/newtab/partials/modals/iOSAppModal.html" + config.cb)
    }, config.showFacebookRateUsModal && a.openModal(null, "/app/spots/facebook/newtab/partials/FacebookRateUsModal.html?cb=0.1.20")
}]), app.controller("NavbarCtrl", ["$scope", function () {
    "use strict"
}]), app.controller("NavbarUserPanelCtrl", ["$rootScope", "$scope", "$user", "$eventManager", function () {
    "use strict"
}]), app.controller("NavbarSearchCtrl", ["$scope", "$rootScope", "$timeout", "$spotsManager", "$search", "$window", function (a, b, c, d, e, f) {
    "use strict";
    function g() {
        var b = a.results[a.searchTerm];
        a.selectedItem++, b && (a.selectedCategory >= b.length && (a.selectedCategory = 0, a.selectedItem = 0), a.selectedItem >= b[a.selectedCategory].results.length && (a.selectedCategory++, a.selectedItem = 0, a.selectedCategory === b.length && g()), b[a.selectedCategory] && !b[a.selectedCategory].results[a.selectedItem].show && g())
    }

    function h() {
        var b = a.results[a.searchTerm];
        a.selectedItem--, a.selectedItem < 0 && (a.selectedCategory--, a.selectedCategory < 0 && (a.selectedCategory = b.length - 1), a.selectedItem = b[a.selectedCategory].results.length - 1, a.selectedItem < 0 && h()), b[a.selectedCategory] && !b[a.selectedCategory].results[a.selectedItem].show && h()
    }

    var i;
    a.results = {}, a.searchTerm = null, a.selectedCategory = 0, a.selectedItem = 0, a.Math = f.Math, a.enterEventInfo = null, a.searchKeyHandler = function (b) {
        switch (b.keyCode) {
            case 40:
                a.searchTerm && a.results[a.searchTerm].length && g();
                break;
            case 38:
                a.searchTerm && a.results[a.searchTerm].length && (h(), a.selectRange(b.target, a.searchTerm.length, a.searchTerm.length));
                break;
            case 13:
                a.searchTerm && (a.results[a.searchTerm].length ? a.enterEventInfo = {spotID: a.results[a.searchTerm][a.selectedCategory].spotID, type: a.results[a.searchTerm][a.selectedCategory].type, selectedItem: a.selectedItem} : a.resultClick("https://www.google.com/?#q=" + a.searchTerm));
                break;
            case 27:
                a.searchTerm = null
        }
    }, a.resultsLimit = Math.floor((f.innerHeight - .1 * f.innerHeight) / 60) - 1, angular.element(f).bind("resize", _.debounce(function () {
        var b = Math.floor((f.innerHeight - .1 * f.innerHeight) / 60) - 1;
        b != a.resultsLimit && (a.resultsLimit = b, a.calculateVisibleResults(), a.$apply("resultsLimit"))
    }, 200)), a.$watch("searchTerm", function (b) {
        a.searchQueryInPreviousResults(function () {
            c.cancel(i), a.enterEventInfo = null, !b || a.results[b] && a.results[b].length || (a.results[b] = a.tempResults ? a.tempResults : [], i = c(function () {
                e.search(b, a.searchResponseHandler)
            }, 200))
        })
    }), b.setSearchTerm = function (b) {
        a.searchTerm = b
    }, a.searchQueryInPreviousResults = function (b) {
        if (a.LastSearchCommited && a.searchTerm) {
            var c = a.searchTerm, d = a.getSearchRegex(c);
            a.tempResults = angular.copy(a.results[a.LastSearchCommited]), _.each(a.tempResults, function (b) {
                b.results = _.filter(b.results, function (b) {
                    return a.checkFields(b, ["givenName", "familyName", "display", "title", "url", "name", "shortName", "label"], d)
                })
            }), a.tempResults = _.reject(a.tempResults, function (a) {
                return 0 === a.results.length
            }), b()
        } else b()
    }, a.checkFields = function (a, b, c) {
        var d;
        return _.each(b, function (b) {
            !_.isUndefined(a[b]) && c.test(a[b]) && (d = !0)
        }), d
    }, a.getSearchRegex = function (a) {
        return a ? (a.length < 3 && (a = "^" + a), a = a.replace(" ", "\\s"), new RegExp(a, "i")) : void 0
    }, a.searchResponseHandler = function (b) {
        b.results.length && (a.results[b.query] || (a.results[b.query] = []), a.results[b.query] = _.reject(a.results[b.query], function (a) {
            return a.spotID == b.spotID && a.type == b.type
        }), a.results[b.query].push(b), a.results[b.query] = _.sortBy(a.results[b.query], function (a) {
            return-1 * a.priority
        }), a.calculateVisibleResults(), a.results[b.query] = _.sortBy(a.results[b.query], function (a) {
            return-1 * a.priority
        })), a.selectedCategory = 0, a.selectedItem = 0, a.LastSearchCommited = b.query, a.$$phase || a.$apply()
    }, a.calculateVisibleResults = function () {
        var b = [];
        _.each(a.results[a.searchTerm], function (c, d) {
            a.results[a.searchTerm][d].results = _.sortBy(c.results, function (a) {
                return-1 * a.score
            }), b = _.union(b, c.results)
        }), _.each(b, function (b, c) {
            b.show = c < a.resultsLimit
        })
    }, a.setSelected = function (b, c) {
        a.selectedCategory = b, a.selectedItem = c
    }, a.spotsById = function (a) {
        return d.getSpotByID(a)
    }, a.googleSearch = function () {
        a.searchTerm && (_gaq.push(["_trackEvent", "Search", "Web-Search", "Search-Btn-Click"]), _gaq.push(["_trackEvent", "Search-Term", a.searchTerm, ""]), window.location.href = "https://www.google.com/?#q=" + a.searchTerm)
    }, a.resultClick = function (a, b) {
        "chrome-apps" === b ? chromeApps.launchApp(a) : ($("html, body").addClass("spots-web-hider"), window.location.href = _.isString(a) ? a : a.link || a.url)
    }, a.selectRange = function (a, b, c) {
        if (a.setSelectionRange)a.focus(), a.setSelectionRange(b, c); else if (a.createTextRange) {
            var d = a.createTextRange();
            d.collapse(!0), d.moveEnd("character", c), d.moveStart("character", b), d.select()
        }
    }
}]), app.controller("NavbarNotificationsCtrl", ["$scope", "$notificationManager", "$eventManager", "$timeout", function (a, b, c, d) {
    "use strict";
    var e;
    a.selected = 0, a.notifications = [], a.notificationPartials = b.notificationPartials, a.notificationWidgets = b.notificationWidgets, b.getAll({newtab: !0}, function (b) {
        a.notifications = b, a.selectItem(0), a.$$phase || a.$apply("notifications")
    }), c.addEventListener("NOTIFICATIONS", "NOTIFICATION_ADDED", function (b) {
        b.newtab && (a.notifications.unshift(b), a.selected = 0, a.$$phase || a.$apply("notifications", "selected"))
    }, a, tabID), c.addEventListener("NOTIFICATIONS", "NOTIFICATION_CLEARED", function (b) {
        a.notifications = _.filter(a.notifications, function (a) {
            return a.id != b.id
        }), a.selected >= a.notifications.length && (a.selected = a.notifications.length - 1), a.$$phase || a.$apply("notifications", "selected")
    }, a, tabID), c.addEventListener("NOTIFICATIONS", "ALL_NOTIFICATIONS_CLEARED", function () {
        a.notifications = [], a.$$phase || a.$apply("notifications")
    }, a, tabID), a.removeNotification = function (c) {
        c.type && _gaq.push(["_trackEvent", "Notifications", c.type, "Close"]), a.notifications = _.filter(a.notifications, function (a) {
            return a.id != c.id
        }), a.$$phase || a.$apply("notifications"), b.clear(c.id, null)
    }, a.autoRotate = function () {
        a.selected++, a.selected >= a.notifications.length && (a.selected = 0), a.$$phase || a.$apply("selected"), e = d(function () {
            a.autoRotate()
        }, config.notificationNewtabAutoRotate)
    }, a.selectItem = function (b) {
        a.selected = b, b >= a.notifications.length ? a.selected = a.notifications.length - 1 : 0 > b && (a.selected = 0), a.$$phase || a.$apply("selected"), d.cancel(e), e = d(function () {
            a.autoRotate()
        }, config.notificationNewtabAutoRotate)
    }, a.stopRotation = function () {
        d.cancel(e), e = null
    }, a.continueRotation = function () {
        e || (e = d(function () {
            a.autoRotate()
        }, config.notificationNewtabAutoRotate))
    }, function () {
        var b = null;
        a.selectedWidgetIndex = 0, a.selectWidget = function (c) {
            c >= a.notificationWidgets.length && (c = 0), d.cancel(b), a.selectedWidgetIndex = c, b = d(function () {
                a.selectWidget(a.selectedWidgetIndex + 1)
            }, config.notificationNewtabAutoRotate)
        }
    }()
}]), app.controller("NavbarPhoneCtrl", ["$scope", "$rootScope", "$q", "$contacts", "$sms", "$timeout", "$pushService", "$spotsManager", "$eventManager", "$notificationManager", function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    b.phoneOpen = !1, a.selectedThread = null, a.threadHint = null, a.showAllThreads = !1;
    var k = h.spotID("contacts"), l = h.spotID("call_log"), m = h.spotID("sms"), n = $("#navPhone");
    $(".select-contact").keyup(function (b) {
        a.searchResults && (a.resultsLimit = 5, a.resultSetLength = a.dataArray.length, a.contactSearchTerm || (a.selected = 0), 40 == b.keyCode ? (a.selected++, a.contactSearchTerm && a.selected > a.resultSetLength - 1 && (a.selected = 0)) : 38 == b.keyCode ? (a.contactSearchTerm && $("input.contact-text", n).selectRange(a.contactSearchTerm.length, a.contactSearchTerm.length), a.selected--, a.selected < 0 && (a.selected = a.contactSearchTerm ? a.resultSetLength - 1 : 0)) : 13 == b.keyCode ? a.resultClick($("ul.contact-numbers > li.selected").text().trim()) : 27 == b.keyCode && a.closeSearch(), a.$$phase || a.$apply("selected"))
    }), $(".text-block").keydown(function (b) {
        13 == b.keyCode && (b.preventDefault(), a.sendMessage())
    }), a.init = function () {
        i.addEventListener("NOTIFICATIONS", "NOTIFICATION_ADDED", a.notificationEventReceived, a, tabID), i.addEventListener("NOTIFICATIONS", "NOTIFICATION_CLEARED", a.notificationEventReceived, a, tabID), i.addEventListener("NOTIFICATIONS", "ALL_NOTIFICATIONS_CLEARED", a.notificationEventReceived, a, tabID), i.addEventListener("MAGIC", "ITEM_UPDATED", a.magicUpdatedEventReceived, a, tabID), i.addEventListener(h.spotID("contacts"), "CACHE_UPDATE", a.updateTopContacts, a, tabID), a.updateTopContacts(), a.$watch("selectedThread", function () {
            a.selectedThread && (a.threadData = {thread: a.selectedThread, contact: a.getContactByPhoneNumber(a.selectedThread), data: null}, e.getThreadForNumber(a.selectedThread, function (b) {
                a.threadData.data = b, a.$$phase || a.$apply("threadData"), f(function () {
                    var a = document.getElementById("thread-data");
                    a.scrollHeight && (a.scrollTop = a.scrollHeight), $("#send-sms-block").focus()
                }), f(function () {
                    e.clearNotificationsForNumber(a.selectedThread), a.$apply()
                }, 1e3)
            }))
        })
    }, a.magicUpdatedEventReceived = function (b) {
        b == k && a.updateTopContacts()
    }, a.notificationEventReceived = function (b) {
        var c = b.spotID;
        (c == l || c == m) && a.updateTopContacts()
    }, a.updateTopContacts = function () {
        d.getTopMagicResults(3, function (b) {
            j.getAll({spotID: h.spotID("sms")}, function (c) {
                a.topContacts = [], _.each(b, function (b) {
                    var e = b.objectID, f = d.getContactByPhoneNumber(e);
                    f || (f = {display: "Unknown", givenName: "Unknown", image: "/img/navbar-phone/contact-default.svg"});
                    var g = _.filter(c, function (a) {
                        return a.data.number == e
                    });
                    f.badges = g.length, f.number = e, f.score = b.score, a.topContacts.push(f)
                }), a.$$phase || a.$apply("topContacts")
            })
        })
    }, $.fn.selectRange = function (a, b) {
        return b || (b = a), this.each(function () {
            if (this.setSelectionRange)this.focus(), this.setSelectionRange(a, b); else if (this.createTextRange) {
                var c = this.createTextRange();
                c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select()
            }
        })
    }, a.sendMessage = function () {
        _gaq.push(["_trackEvent", "Phone-Nav-Bar", "Send-Message", "Click"]), a.threadData.data.push({id: (new Date).getTime(), number: a.selectedThread, text: a.smsText, timestamp: (new Date).getTime().toString(), type: 3}), g.sendNotification(h.spotID("sms"), 1, {number: a.selectedThread, text: a.smsText}, function () {
        }), a.smsText = "", a.$$phase || (a.$apply("smsText"), a.$apply("threadData")), f(function () {
            var a = document.getElementById("thread-data");
            a.scrollTop = a.scrollHeight, $("#send-sms-block").focus()
        })
    }, a.callContact = function () {
        _gaq.push(["_trackEvent", "Phone-Nav-Bar", "Call-Contact", "Click"]), a.currentView = "calling", g.sendNotification(h.spotID("call_log"), 1, {number: a.selectedThread, speaker: config.phoneSpeaker}, function () {
        })
    }, a.cancelCall = function () {
        _gaq.push(["_trackEvent", "Phone-Nav-Bar", "Call-Contact", "Cancel"]), g.sendNotification(h.spotID("call_log"), 2, "", function () {
            a.currentView = "default"
        })
    }, eventManager.addEventListener(h.spotID("call_log"), 4, function () {
        a.currentView = "call_connected", f(function () {
            a.currentView = "default"
        }, 5e3)
    }, a, tabID), a.newConversation = function () {
        _gaq.push(["_trackEvent", "Phone-Nav-Bar", "New-Conversation", "Click"]), a.threads = !1, a.selectContact = !0, a.contactSearchTerm = null, a.searchResults = null, f(function () {
            $("#contact-search-box").focus()
        })
    }, a.$watch("contactSearchTerm", function () {
        a.updateSearch()
    }), a.getResultsLayout = function () {
        a.searchResults = _.sortBy(a.searchResults, function (a) {
            return-1 * a.priority
        }), a.dataArray = [], _.each(a.searchResults, function (b, c) {
            var d = 0;
            _.each(b.phones, function (b) {
                a.dataArray.push({index: c + "_" + d++, number: b})
            })
        })
    }, a.updateSearch = function () {
        a.contactSearchTerm && (a.selected = 0, a.contactSearchTerm = a.contactSearchTerm ? a.contactSearchTerm.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : null, null !== a.searchCommand && clearTimeout(a.searchCommand), a.searchCommand = setTimeout(function () {
            a.isFirst = !0, a.searchResults = [];
            var b = a.contactSearchTerm, c = a.buildSearchRegex(b);
            d.searchAsync(b, c, !1, function (b, c) {
                a.searchResults = _.union(a.searchResults, c.results), a.getResultsLayout(), a.$$phase || a.$apply("searchResults")
            }, function (b, c) {
                a.searchResults = _.union(a.searchResults, c.results), a.getResultsLayout(), a.$$phase || a.$apply("searchResults")
            }), a.searchCommand = null
        }, 500))
    }, a.setSelected = function (b) {
        _.each(a.dataArray, function (c, d) {
            c.index == b && (a.selected = d)
        })
    }, a.buildSearchRegex = function (a) {
        a && a.length < 3 && (a = "^" + a), a = a.replace(" ", "\\s");
        var b = new RegExp(a, "i");
        return b
    }, a.resultClick = function (b) {
        a.showThread(b)
    }, i.addEventListener(h.spotID("sms"), "SMS_EVENT", function (b) {
        _.each(b, function (b) {
            b.number == a.selectedThread ? (_.each(a.threadData.data, function (c, d) {
                c.text == b.text && 3 == c.type && a.threadData.data.splice(d, 1)
            }), a.threadData.data.push(b), a.$$phase || a.$apply("threadData")) : a.showAllThreads && a.threads && (_.where(a.threads, {number: b.number}).length > 0 ? a.getPreviousThreads(0, a.threads.length) : a.getPreviousThreads(0, a.threads.length + 1)), f(function () {
                var a = document.getElementById("thread-data");
                a.scrollTop = a.scrollHeight, $("#send-sms-block").focus()
            })
        })
    }, a, tabID), a.hintThread = function () {
    }, b.toggleThread = function (c) {
        c == a.selectedThread && b.phoneOpen ? a.closePhone() : b.showThread(c)
    }, b.showThread = function (c) {
        a.currentView = "default", b.phoneOpen = !0, a.showAllThreads = !1, a.selectedThread = c
    }, a.toggleAllThreads = function () {
        b.phoneOpen && !a.selectedThread ? a.closePhone() : (b.phoneOpen = !0, a.selectedThread = null, a.showAllThreads = !0, a.getPreviousThreads(0, 10))
    }, sms.getAllThreads(function (b) {
        a.totalThreadsCount = b ? b.length : 0
    }), a.getPreviousThreads = function (b, c) {
        e.getPreviousThreads(b, c, function (c) {
            j.getAll({spotID: spotsManager.spotID("sms")}, function (d) {
                angular.forEach(c, function (b, d) {
                    c[d].contact = a.getContactByPhoneNumber(b.number)
                }), d && _.each(c, function (a, b) {
                    var e = _.filter(d, function (b) {
                        return b.data.number == a.number
                    });
                    c[b].badges = e.length
                }), a.threads = 0 === b ? c : a.threads.concat(c), a.$$phase || a.$apply("threads")
            })
        })
    }, a.closePhone = function () {
        b.phoneOpen && (a.selectedThread = null, a.showAllThreads = !1, a.threadHint = null, b.phoneOpen = !1)
    }, a.getContactDefaultPhone = function (a) {
        return d.getContactDefaultPhone(a)
    }, a.getContactByPhoneNumber = function (a) {
        return d.getContactByPhoneNumber(a)
    }, a.init()
}]), app.controller("AboutModalCtrl", ["$scope", function () {
    "use strict"
}]), app.controller("FeedbackModalCtrl", ["$scope", function (a) {
    "use strict";
    userVoice.getCustomParams(function (b) {
        a.iframeSource = "http://spotsmagic.com/feedback?primary=" + config.accentColor.substring(1) + "&link=" + config.themeColor.substring(1) + "&guid=" + b.guid + "&data=" + b.data, $("#feedbackFrame").load(function () {
            $(".feedback-modal .loader").hide()
        }), a.$$phase || a.$apply("iframeSource")
    })
}]), app.controller("LoginLogoutModalCtrl", ["$scope", "$rootScope", "$user", "$eventManager", function (a, b, c) {
    "use strict";
    b.doWhileClosingModal = function () {
        _gaq.push(["_trackEvent", config.user ? "Logout" : "Login", "Panel", "Cancel"])
    }, a.logout = function () {
        b.doWhileClosingModal = null, a.closeModal(), c.logout()
    }
}]), app.controller("SettingsModalCtrl", ["$scope", "$languageManager", function (a, b) {
    "use strict";
    a.set = function (a) {
        a = angular.copy(a), configAPI.setMultiple(a)
    }, a.CheckTheme = function (a) {
        var b = a.accentColor == config.accentColor && a.bgColor == config.bgColor && a.bgFooter == config.bgFooter && a.bgFooterHeight == config.bgFooterHeight && a.bgImage == config.bgImage && a.favoritesBorder == config.favoritesBorder && a.favoritesMargin == config.favoritesMargin && a.favoritesOpacity == config.favoritesOpacity && a.themeColor == config.themeColor;
        return b
    }, a.$watch("config.selectedLanguage", function (a, c) {
        a != c && b.changeLang()
    }, !0)
}]), app.controller("AndroidAppModalCtrl", ["$scope", "$googlePlayUtils", function (a, b) {
    "use strict";
    a.appID = a.playUtilsAppID, a.appDetails = !1, a.step = 1, a.appID && $.getJSON("http://api.hoolapp.com/query.php", {type: "apps", items_key: 2, output_key: 2, items: a.appID}, function (b) {
        if (b[a.appID]) {
            a.appDetails = b[a.appID], a.appDetails.stars = [];
            for (var c = a.appDetails.rating; c > 0; c--)a.appDetails.stars.push(c > .5)
        } else a.detailsError = !0;
        a.$apply()
    }), a.doLogin = function (c, d, e) {
        b.googleLogin(c, d, e, function (b) {
            a.messages.push("google Login completed, result " + b), a.playStoreUserResponse(b, c)
        })
    }, a.confirmInstall = function (c, d, e) {
        a.step = 2, a.messages = ["--> confirmInstall"], a.messages.push("Installing: ", c), b.isSignedIn() ? b.hasDevices() ? (a.messages.push("google Login user found, ready to continue"), a.playStoreUserResponse(!0, c)) : (a.messages.push("hasDevices FALSE"), a.doLogin(c, d, e)) : (a.messages.push("User not logged in to play store, Waiting for login"), a.doLogin(c, d, e))
    }, a.playStoreUserResponse = function (c) {
        a.messages.push("--> playStoreUserResponse"), c ? b.getGoogleAccountData(function (c, d, e) {
            a.messages.push("getGoogleAccountData:", c, d, e), a.messages.push("Installing applications...."), b.doInstall(a.appID, function (b) {
                a.messages.push("Installation completed!"), a.step = b ? 4 : 3
            })
        }) : (a.messages.push("No google Login user found"), a.step = 1)
    }
}]), app.controller("DefaultNotificationCtrl", ["$scope", function () {
    "use strict"
}]), app.controller("CallLogNewtabNotificationCtrl", ["$scope", "$contacts", "$call_log", "$rootScope", "$timeout", function (a, b, c, d, e) {
    "use strict";
    a.contact = {}, a.notification.data.from ? b.getObject(a.notification.data.from, function (b) {
        a.$$phase || (a.contact = b, a.$apply("contact"))
    }) : "unknown" == a.notification.data.number.toLowerCase() && (a.notification.data.number = "Private Number"), a.showLastConversation = function (a) {
        e(function () {
            d.showThread(a), c.clearNotificationsForNumber(a)
        }, 200)
    }
}]), app.controller("SmsNewtabNotificationCtrl", ["$scope", "$contacts", function (a, b) {
    "use strict";
    a.contact = b.getContactByPhoneNumber(a.notification.data.number)
}]), app.controller("FtueCtrl", ["$scope", "$ftueAPI", "$googlePlayUtils", function (a, b, c) {
    a.isLoading = !1, _gaq.push(["_trackEvent", "ftue", "step0", "view"]), a.moveToNextStep = function (a, b) {
        var c = {currentStep: a, nextStep: b};
        eventManager.dispatchEvent("FTUE", "STEP_UPDATE", c)
    }, a.confirmInstall = function (b) {
        _gaq.push(["_trackEvent", "ftue", "step2", "android-installed"]), a.isLoading = !0, a.step = 2, a.messages = ["--> confirmInstall"], a.messages.push("Installing: ", b), c.isSignedIn() ? (a.messages.push("google Login user found, ready to continue"), a.playStoreUserResponse(!0, b)) : (a.messages.push("User not logged in to play store, Waiting for login"), c.googleLogin(b, null, null, function (c) {
            a.messages.push("google Login completed, result " + c), a.playStoreUserResponse(c, b)
        }))
    }, a.playStoreUserResponse = function (b, d) {
        a.messages.push("--> playStoreUserResponse"), b ? c.getGoogleAccountData(function (b, e, f) {
            a.messages.push("getGoogleAccountData:", b, e, f), c.hasDevices() ? (a.messages.push("Installing applications...."), c.doInstall(d, function () {
                a.isLoading = !1, eventManager.dispatchEvent("FTUE", "SPOTS_ANDROID_INSTALLED"), a.messages.push("Installation completed!")
            })) : a.messages.push("hasDevices FALSE")
        }) : a.messages.push("No google Login user found")
    }
}]), app.controller("ReviewCtrl", ["$scope", "$reviewAPI", "$utilsAPI", "$configAPI", "$googlePlayUtils", function (a, b, c, d, e) {
    config.css_list.push("/app/newtab/css/review.css"), a.reviewClass = "cat", a.hoveredStar = 5, a.selectedStar = 5, a.stars = [1, 2, 3, 4, 5], a.isFinished = !1;
    var f = {insert_date: (new Date).getTime(), action: "view"};
    d.set("reviewInfo", c.encrypt(JSON.stringify(f))), _gaq.push(["_trackEvent", "reviews", "view"]), _gaq.push(["_trackEvent", "reviews-android", "view"]), a.publishReview = function () {
        var f = a.selectedStar, g = a.reviewComment ? a.reviewComment : "";
        b.rate(f, g, null), _gaq.push(["_trackEvent", "reviews", "publish-" + f, g]);
        var h = {insert_date: (new Date).getTime(), action: "publish", rating: f};
        config.InstalledAndroidApp ? e.sendReview(f, g, function (a, b) {
            a ? (h.androidReviewSent = !0, _gaq.push(["_trackEvent", "reviews-android", "publish-" + f, g])) : _gaq.push(["_trackEvent", "reviews-android", b]), d.set("reviewInfo", c.encrypt(JSON.stringify(h)))
        }) : (_gaq.push(["_trackEvent", "reviews-android", "no-android"]), d.set("reviewInfo", c.encrypt(JSON.stringify(h)))), a.isFinished = !0
    }, a.close = function (a) {
        d.remove("showReview");
        var b = {insert_date: (new Date).getTime(), action: "cancel"};
        d.set("reviewInfo", c.encrypt(JSON.stringify(b))), a && (_gaq.push(["_trackEvent", "reviews", "cancel"]), _gaq.push(["_trackEvent", "reviews-android", "cancel"]))
    }
}]), app.controller("FacebookRateUsModalCtrl", ["$scope", "$rootScope", function (a, b) {
    "use strict";
    !function () {
        var b = "/app/spots/facebook/images/carousel/", c = b + "screenshots/";
        a.imagesPath = b, a.numberOfScreenshots = 6, a.screenshotWidth = 386, a.screenshots = _.range(a.numberOfScreenshots).map(function (a) {
            return{desktop: c + a + ".jpg", mobile: c + a + "-mobile.jpg"}
        }), a.screenshots.push(_.extend({}, a.screenshots[0])), a.numberOfScreenshots += 1
    }(), _gaq.push(["_trackEvent", "facebook-modal", "view"]), b.doWhileClosingModal = function () {
        configAPI.set("facebookRateUsModalDisplayed", !0), configAPI.remove("showFacebookRateUsModal"), _gaq.push(["_trackEvent", "facebook-modal", "close"])
    }
}]), app.controller("FavoritesAddModalCtrl", ["$scope", "$rootScope", "$favorites", function (a, b, c) {
    "use strict";
    a.newFav = {}, a.colorPalette = null, a.showLoader = !1, a.urlChange = _.debounce(function (b) {
        urls.isValidUrl(b) && (a.showLoader = !0, c.getDetailsForUrl(b, function (b) {
            var c = angular.copy(b);
            urls.getBaseDomain(c.requestedUrl) == urls.getBaseDomain(a.newFav.url) && (a.showLoader = !1, a.newFav = c.item, a.colorPalette = [
                {f: c.item.color, c: c.palette}
            ], a.$apply())
        }))
    }, 300), a.$watch("newFav.url", function (b) {
        a.isDisabled = urls.isValidUrl(b) ? !1 : !0
    }, !0), a.getBaseDomain = function (a) {
        return urls.getBaseDomain(a, !0)
    }, b.doWhileClosingModal = function () {
        _gaq.push(["_trackEvent", "Favorite", "Fav-Add", "cancel"])
    }, a.submitHandler = function () {
        a.newFav.url && (a.newFav.title || (a.newFav.title = a.getBaseDomain(a.newFav.url)), _gaq.push(["_trackEvent", "Favorite", "Fav-Add", "Save"]), _gaq.push(["_trackEvent", "Favorite", "Add-Name", a.newFav.title]), _gaq.push(["_trackEvent", "Favorite", "Add-URL", a.newFav.url]), c.addItem(a.newFav, b.newFavCategoryID, function () {
            b.doWhileClosingModal = null, a.closeModal(), a.$$phase || a.$apply()
        }))
    }
}]), app.controller("FavoritesCategoriesAddModalCtrl", ["$scope", "$favorites", "$rootScope", function (a, b, c) {
    "use strict";
    c.doWhileClosingModal = function () {
        _gaq.push(["_trackEvent", "Favorite", "Category-Add", "cancel"])
    }, a.submitHandler = function () {
        a.categoryName.length && (_gaq.push(["_trackEvent", "Favorite", "Category-Add", "Save"]), _gaq.push(["_trackEvent", "Favorite", "Category-Add-Name", a.categoryName]), b.addCategory(a.categoryName, function () {
            c.doWhileClosingModal = null, a.closeModal(), a.$$phase || a.$apply()
        }))
    }
}]), app.controller("FavoritesCategoriesDeleteModalCtrl", ["$scope", "$favorites", "$rootScope", function (a, b, c) {
    "use strict";
    c.doWhileClosingModal = function () {
        _gaq.push(["_trackEvent", "Favorite", "Category-Delete", "cancel"])
    }, a.submitHandler = function () {
        _gaq.push(["_trackEvent", "Favorite", "Category-Delete", "Yes"]), _gaq.push(["_trackEvent", "Favorite", "Category-Delete-Name", c.catDeleteID]), b.removeCategory(c.catDeleteID, function () {
            c.doWhileClosingModal = null, a.closeModal(), a.$$phase || a.$apply()
        })
    }
}]), app.controller("FavoritesCategoriesEditModalCtrl", ["$scope", "$favorites", "$rootScope", function (a, b, c) {
    "use strict";
    c.doWhileClosingModal = function () {
        _gaq.push(["_trackEvent", "Favorite", "Category-Edit", "cancel"])
    }, a.submitHandler = function () {
        _gaq.push(["_trackEvent", "Favorite", "Category-Edit", "Save"]), _gaq.push(["_trackEvent", "Favorite", "Category-Edit-Name", c.catEditItem.name]), b.editCategory(c.catEditItem, function () {
            c.doWhileClosingModal = null, a.closeModal(), a.$$phase || a.$apply()
        })
    }
}]), app.controller("FavoritesDeleteModalCtrl", ["$scope", "$favorites", "$rootScope", function (a, b, c) {
    "use strict";
    c.doWhileClosingModal = function () {
        _gaq.push(["_trackEvent", "Favorite", "Favorite-Delete", "cancel"])
    }, a.submitHandler = function () {
        _gaq.push(["_trackEvent", "Favorite", "Favorite-Delete", "Yes"]), b.removeItem(c.favDeleteItemID, function () {
            c.doWhileClosingModal = null, a.closeModal(), a.$$phase || a.$apply()
        })
    }
}]), app.controller("FavoritesEditModalCtrl", ["$scope", "$rootScope", "$favorites", function (a, b, c) {
    "use strict";
    a.newFav = {}, a.colorPalette = null, a.showLoader = !1;
    var d = a.favEditItem.id;
    a.selectedCat = b.catEditItem.id, c.getFavorites(function (b) {
        a.directory = b.DIRECTORY.directory
    }), a.saveCategory = function (d) {
        a.selectedCat != b.catEditItem.id ? c.changeItemCategory(a.favEditItem.id, a.selectedCat, d) : d()
    }, a.urlChange = _.debounce(function (b) {
        urls.isValidUrl(b) && (a.showLoader = !0, c.getDetailsForUrl(b, function (b) {
            var c = angular.copy(b);
            urls.getBaseDomain(c.requestedUrl) == urls.getBaseDomain(a.favEditItem.url) && (a.showLoader = !1, a.favEditItem = c.item, a.colorPalette = [
                {f: c.item.color, c: c.palette}
            ], a.$apply())
        }))
    }, 300), a.$watch("favEditItem.url", function (b) {
        a.isDisabled = urls.isValidUrl(b) ? !1 : !0
    }, !0), a.getBaseDomain = function (a) {
        return urls.getBaseDomain(a, !0)
    }, b.doWhileClosingModal = function () {
        _gaq.push(["_trackEvent", "Favorite", "Fav-Edit", "cancel"])
    }, a.submitHandler = function () {
        a.favEditItem.url && (a.favEditItem.title || (a.favEditItem.title = a.getBaseDomain(a.favEditItem.url)), _gaq.push(["_trackEvent", "Favorite", "Fav-Edit", "Save"]), _gaq.push(["_trackEvent", "Favorite", "Edit-Name", a.favEditItem.title]), _gaq.push(["_trackEvent", "Favorite", "Edit-URL", a.favEditItem.url]), a.favEditItem.id = d, c.editItem(a.favEditItem, function () {
            a.saveCategory(function () {
                b.doWhileClosingModal = null, a.closeModal()
            }), a.$$phase || a.$apply()
        }))
    }
}]), app.controller("FavoritesNewtabCtrl", ["$scope", "$rootScope", "$favorites", "$topSites", "$chromeApps", "$recentlyClosed", "$timeout", "$spotsManager", "$eventManager", function (a, b, c, d, e, f, g, h, i) {
    "use strict";
    a.categoriesSortableOptions = {axis: "y", distance: 5, revert: 300, handle: ".category-header", update: function () {
    }, start: function (a, b) {
        $("ul.items", b.helper).slideUp(300)
    }, beforeStop: function (a, b) {
        $("ul.items", b.helper).delay(300).slideDown(300)
    }}, a.itemsSortableOptions = {connectWith: "ul.items", cancel: "li.add-item", items: "li:not(.add-item)", revert: 300, distance: 5, change: function () {
    }, start: function (b, c) {
        c.placeholder.css("width", a.elementsStyle.item.width), $(window).bind("mousemove", function () {
            var a = 90 * -(c.helper.position().left / window.innerWidth - .5);
            c.helper.css("-webkit-transform", "perspective(500px) rotateY(" + a + "deg)")
        })
    }, beforeStop: function (a, b) {
        b.helper.css("-webkit-transform", "perspective(500px) rotateY(0deg)"), $(window).unbind("mousemove")
    }}, a.$watch("config", function () {
        a.elementsStyle = {favoritesContainer: {height: "calc(100% - 40px - " + config.bgFooterHeight + "px)", "padding-bottom": config.bgFooterHeight, "background-image": "url(" + config.bgFooter + ")", "background-position": "center bottom -" + config.bgFooterHeight / 2 + "%"}, categories: {background: graphicAssets.hexToRgba(config.themeColor, config.navbarOpacity)}, items: {margin: "0 -" + config.favoritesMargin + "px"}, item: {width: 100 / Math.round(window.innerWidth / 370) + "%", padding: config.favoritesMargin}, itemCnt: {"border-width": config.favoritesBorder, background: "rgba(255,255,255," + config.favoritesOpacity + ")", "box-shadow": "1px 3px 5px rgba(0, 0, 0, " + config.favoritesShadow + ")"}, addItemIcon: {"background-color": config.themeColor}, addItemTitle: {color: config.themeColor}}
    }, !0), a.animateBackground = function () {
        var a = config.bgFooterHeight;
        if (a) {
            var b = $(".spot-view").scrollTop(), c = $(".spot-view").prop("scrollHeight") - $(".spot-view").height(), d = c - b, e = 2;
            a * e > d && $(".favorites").css("background-position", "center bottom " + d / e + "px"), $("body").css("background-position-y", Math.sqrt(b))
        }
    }, a.updateBackgroundFooter = function () {
        g(function () {
            a.animateBackground()
        })
    }, a.getChromeApps = function () {
        a.chromeApps || e.getChromeApps(function (b) {
            a.chromeApps = b, a.$$phase || a.$apply("chromeApps")
        })
    }, a.getRecentlyClosed = function () {
        f.getItems(10, function (b) {
            a.recentlyClosed = b, a.$$phase || a.$apply("recentlyClosed")
        })
    }, a.addFavorite = function (c) {
        _gaq.push(["_trackEvent", "Favorite", "Fav-Add", "Click"]), b.newFavCategoryID = c, a.openModal("add_new_favorite", "/app/spots/favorites/newtab/partials/modals/FavoritesAddModal.html" + config.cb)
    }, a.editFavorite = function (c, d) {
        _gaq.push(["_trackEvent", "Favorite", "Fav-Edit", "Click"]), b.favEditItem = angular.copy(c), b.catEditItem = angular.copy(d), a.openModal("edit_favorite", "/app/spots/favorites/newtab/partials/modals/FavoritesEditModal.html" + config.cb)
    }, a.removeFavorite = function (c) {
        _gaq.push(["_trackEvent", "Favorite", "Fav-Remove", "Click"]), b.favDeleteItemID = c.id, a.openModal("deleting_favorite", "/app/spots/favorites/newtab/partials/modals/FavoritesDeleteModal.html" + config.cb)
    }, a.removeTopSite = function (a) {
        var b = config.mostVisitedHideList;
        b.push(a.url), configAPI.set("mostVisitedHideList", b)
    }, a.addCategory = function () {
        _gaq.push(["_trackEvent", "Favorite", "Category-Add", "Click"]), a.openModal("add_category", "/app/spots/favorites/newtab/partials/modals/FavoritesCategoriesAddModal.html" + config.cb)
    }, a.editCategory = function (c) {
        _gaq.push(["_trackEvent", "Favorite", "Category-Edit", "Click"]), b.catEditItem = angular.copy(c), a.openModal("edit_category", "/app/spots/favorites/newtab/partials/modals/FavoritesCategoriesEditModal.html" + config.cb)
    }, a.removeCategory = function (c) {
        _gaq.push(["_trackEvent", "Favorite", "Category-Remove", "Click"]), b.catDeleteID = c, a.openModal("remove_category", "/app/spots/favorites/newtab/partials/modals/FavoritesCategoriesDeleteModal.html" + config.cb)
    }, a.launchApp = function (a) {
        e.launchApp(a)
    }, $(window).resize(_.throttle(function () {
        a.elementsStyle.item.width = 100 / Math.round(window.innerWidth / 370) + "%", a.$$phase || a.$apply("elementsStyle")
    }, 100)), $("#fa .favorites-container").scroll(_.throttle(function () {
        var a = $(this).scrollTop() / ($(this).prop("scrollHeight") - $(this).height() - config.bgFooterHeight), b = -(1 - a) * (config.bgFooterHeight / 2);
        $(this).css("background-position", "center bottom " + b + "%")
    }, 1)), i.addEventListener(h.spotID("favorites"), "FAVORITES_EVENT", function (b) {
        switch (b.type) {
            case"UPDATE":
                a.favorites = b.data, a.directory = b.data.DIRECTORY.directory, a.$apply("directory", "favorites");
                break;
            case"ITEM_ADDED":
                a.favorites[b.data.id] = b.data, a.$apply("favorites"), a.updateBackgroundFooter();
                break;
            case"ITEM_UPDATED":
                a.favorites[b.data.id] = b.data, a.$apply("favorites");
                break;
            case"ITEM_REMOVED":
                delete a.favorites[b.data], a.$apply("favorites");
                break;
            case"DIRECTORY_UPDATE":
                a.directory = b.data, a.$apply("directory"), a.updateBackgroundFooter()
        }
    }, a, tabID), d.getTopSites(function (b) {
        a.topSites = b
    }), c.getFavorites(function (b) {
        a.favorites = {}, _.each(_.toArray(b), function (b) {
            "DIRECTORY" == b.id ? a.directory = _.extend({}, b.directory) : a.favorites[b.id] = _.extend({}, b)
        }), async.map(_.toArray(a.favorites), function (b, c) {
            graphicAssets.webColorPicker(b.url, function (d) {
                d && (a.favorites[b.id].picker = d), a.$apply("favorites"), c(null)
            })
        }, function () {
        })
    })
}]), app.directive("scrollToCategory", function () {
    var a = {link: function (a, b, c) {
        b.bind("click", function () {
            var a = $("#fa .favorites-container"), b = a.scrollTop(), d = a.offset().top, e = $("#" + c.scrollToCategory, a).offset().top, f = e - d, g = b + f, h = Math.abs(b - g);
            a.animate({scrollTop: g}, h)
        })
    }};
    return a
}), app.controller("FavoritesSearchResultCtrl", ["$scope", function (a) {
    "use strict";
    a.openFavorite = function () {
        a.gae("Search", "bookmarks" == a.spot.type ? "Bookmarks-Search" : "favorites" == a.spot.type ? "Favorites-Search" : "top-sites" == a.spot.type ? "TopSites-Search" : "chrome-apps" == a.spot.type ? "ChromeApps-Search" : "", "AutoComplete-Click"), a.resultClick(a.result, a.spot.type)
    }, a.$watch("enterEventInfo", function () {
        a.enterEventInfo && a.enterEventInfo.spotID == spotsManager.spotID("favorites") && a.enterEventInfo.selectedItem == a.$index && a.enterEventInfo.type == a.spot.type && a.openFavorite()
    }), a.FavoriteClick = function () {
        a.openFavorite()
    }
}]), app.controller("NewtabClockCtrl", ["$scope", "$notificationManager", "$eventManager", "$timeout", function (a, b, c, d) {
    "use strict";
    a.updateClock = function () {
        a.currentTime = (new Date).getTime(), d(a.updateClock, 6e4)
    }, a.updateClock()
}]), app.controller("NewtabContactsSearchResultCtrl", ["$rootScope", "$scope", "$spotsManager", "$pushService", "$contacts", "$timeout", function (a, b, c, d, e, f) {
    b.currentView = "default", b.$watch("enterEventInfo", function () {
        b.enterEventInfo && b.enterEventInfo.spotID == spotsManager.spotID("contacts") && b.enterEventInfo.selectedItem == b.$index && b.openThread(b.getDefaultPhone(b.result))
    }), b.getDefaultPhone = function (a) {
        return e.getContactDefaultPhone(a)
    }, b.openThread = function (c) {
        f(function () {
            _gaq.push(["_trackEvent", "Search", "Contacts-Search", "Message-Contact"]), a.setSearchTerm(null), a.showThread(c), b.clickedOutside()
        })
    }, b.toggleContact = function () {
        b.disableToggle || ("all_numbers" == b.currentView ? b.currentView = "default" : (b.currentView = "all_numbers", _gaq.push(["_trackEvent", "Search", "Contacts-Search", "AutoComplete-Click"])))
    }, b.callDialedHandler = function () {
        b.selectedItemCallItem == b.$index && (b.currentView = "call_connected", f(function () {
            b.currentView = "default", b.$$phase || b.$apply("currentView")
        }, 5e3), eventManager.removeEventListener(c.spotID("call_log"), 4, b.callDialedHandler))
    }, b.callNumber = function (a) {
        b.selectedItem == b.$index && (b.selectedItemCallItem = b.selectedItem, _gaq.push(["_trackEvent", "Search", "Contacts-Search", "Call-Contact"]), b.currentView = "calling", b.$$phase || b.$apply("currentView"), d.sendNotification(c.spotID("call_log"), 1, {number: a, speaker: config.phoneSpeaker}, function () {
        }), eventManager.addEventListener(c.spotID("call_log"), 4, b.callDialedHandler, tabID))
    }, b.cancelCall = function () {
        _gaq.push(["_trackEvent", "Search", "Contacts-Search", "Cancel-Call-Contact"]), b.currentView = "default", d.sendNotification(c.spotID("call_log"), 2, ""), eventManager.removeEventListener(c.spotID("call_log"), 4, b.callDialedHandler)
    }
}]), app.controller("NewtabSearchResultCtrl", ["$scope", function (a) {
    "use strict";
    a.openResult = function () {
        a.gae("Search", "calculator" == a.result.type ? "Calculator-Search" : "navigation" == a.result.type ? "Navigation-Search" : "web" == a.result.type ? "Web-Search" : "", "AutoComplete-Click"), "web" == a.result.type && a.gae("Search-Term", a.searchTerm, ""), a.resultClick(a.result.value)
    }, a.$watch("enterEventInfo", function () {
        a.enterEventInfo && a.enterEventInfo.spotID == spotsManager.spotID("search") && a.enterEventInfo.selectedItem == a.$index && a.enterEventInfo.type == a.spot.type && a.openResult()
    }), a.webResultClick = function () {
        a.openResult()
    }
}]), app.controller("NewtabWeatherCtrl", ["$scope", "$notificationManager", "$eventManager", "$timeout", function (a) {
    "use strict";
    function b() {
        return weather.getLocalWeather().then(function (b) {
            var c = b.weather;
            c.length && (a.weatherConditionText = c[0].main, a.weatherConditionId = c[0].id), a.temperature = Math.round(b.main.temp)
        })
    }

    a.weatherLoaded = !1, b().then(function () {
        a.weatherLoaded = !0
    }), window.setInterval(b, weather.API_REFRESH_INTERVAL)
}]), app.controller("PhoneCtrl", ["$scope", "$dynamicCSS", "$contacts", "$sms", "$call_log", "$spotsManager", "$eventManager", "$pushService", "$badgesAPI", "$timeout", function (a, b, c, d, e, f, g, h, i, j) {
    "use strict";
    b.parse(a, {".phone-wrapper": {background: {scheme: [2, .6]}}, ".sms": {"border-color": {scheme: [1]}}, ".sms .row:hover": {background: {scheme: [2, .2]}}, ".call_log": {"border-color": {scheme: [1]}}, ".call_log .row:hover": {background: {scheme: [2, .2]}}, ".row": {"border-color": {scheme: [1, .2]}}, ".details": {color: {scheme: [1, .9]}}, ".pull-right": {color: {scheme: [1]}}, ".thread_content::-webkit-scrollbar": {width: "8px", background: {scheme: [2, .05]}, "border-radius": "5px"}, ".thread_content::-webkit-scrollbar-thumb": {background: {scheme: [2, .1]}, "border-radius": "5px"}, ".thread_content::-webkit-scrollbar:hover": {background: {scheme: [2, .2]}}, ".thread_content::-webkit-scrollbar-thumb:hover": {background: {scheme: [2, .3]}}}), a.timeout = j, a.selectedThread = !1, a.removeBadges = function (a, b) {
        a && a.length > 0 && badgesAPI.removeBadges(f.spotID(b), a)
    }, a.getContactByPhoneNumber = function (a) {
        return c.getContactByPhoneNumber(a)
    }, a.smsBadges = i.getBadges()[f.spotID("sms")], a.phoneBadges = i.getBadges()[f.spotID("call_log")], g.addEventListener(f.spotID("call_log"), "BADGE_ADD", function () {
        a.phoneBadges = i.getBadges()[f.spotID("call_log")], a.$apply()
    }, a, tabID), g.addEventListener(f.spotID("sms"), "BADGE_ADD", function () {
        a.smsBadges = i.getBadges()[f.spotID("sms")], a.animation = "{show: 'fadeIn', hide:'fadeOut'}", a.$apply()
    }, a, tabID), g.addEventListener(f.spotID("call_log"), "BADGE_REMOVE", function () {
        a.phoneBadges = i.getBadges()[f.spotID("call_log")], a.$apply()
    }, a, tabID), g.addEventListener(f.spotID("sms"), "BADGE_REMOVE", function () {
        a.smsBadges = i.getBadges()[f.spotID("sms")], a.$apply()
    }, a, tabID), a.closeThread = function () {
        if (a.smsBadges && a.smsBadges.length > 0) {
            var b = _.pluck(a.selectedThread.smss, "id"), c = [];
            async.map(a.smsBadges, function (a, d) {
                _.contains(b, a) && c.push(a), d()
            }, function () {
                _.isEmpty(c) || a.removeBadges(c, "sms"), a.selectedThread = !1
            })
        } else a.selectedThread = !1
    }, a.getThread = function (b) {
        d.getThread(b, function (c) {
            b.smss = c, a.selectedThread = b;
            var d = [];
            if (a.smsBadges) {
                var e = _.pluck(b.smss, "id");
                angular.forEach(a.smsBadges, function (a) {
                    _.contains(e, a) && d.push(a)
                })
            }
            d.length > 0 && a.removeBadges(d, "sms"), a.$$phase || a.$apply()
        })
    }, a.sendSms = function (b, c) {
        if (b) {
            var d = {timestamp: String((new Date).getTime()), text: b, number: c.number, from: c.from, type: 3};
            a.selectedThread.smss.push(d), a.timeout(function () {
                $(".thread_content").scrollTop($(".thread_content")[0].scrollHeight)
            }), a.$$phase || a.$apply(), _gaq.push(["_trackEvent", "Phone", "SMS-Sent", "send"]), h.sendNotification(f.spotID("sms"), 1, {number: d.number, text: d.text}, function () {
                _gaq.push(["_trackEvent", "Phone", "SMS-Sent", "confirmed-send"])
            }, function () {
                _gaq.push(["_trackEvent", "Phone", "SMS-Sent", "failed-send"])
            })
        }
    }, j(function () {
        a.removeBadges(a.phoneBadges, "call_log")
    }, 1e4), a.$on("$destroy", function () {
        void 0 !== a.phoneBadges && a.removeBadges(a.phoneBadges, "call_log"), a.call_log = null, a.sms_threads = null, delete a.call_log, delete a.sms_threads
    }), a.call_log = [], a.sms_threads = [], a.loadingCalls = !1, a.loadingSMSs = !1, a.getPreviousCalls = function () {
        if (!a.loadingCalls) {
            a.loadingCalls = !0;
            var b = _.first(a.call_log);
            e.getPreviousCalls(b, 15, function (b) {
                return a.call_log = _.union(b, a.call_log), a.loadingCalls = !1, 0 === a.call_log.length ? (j(a.getPreviousCalls, 5e3), void 0) : (a.$$phase || a.$apply(), void 0)
            })
        }
    }, a.getNewCalls = function () {
        if (!a.loadingCalls && a.call_log.length > 0) {
            a.loadingCalls = !0;
            var b = _.last(a.call_log), c = e.getNewCalls(b);
            c.length > 0 && (a.call_log[a.call_log.length - 1].timestamp == c[c.length - 1].timestamp && (a.call_log = a.call_log.slice(0, a.call_log.length - 1)), a.call_log = _.union(a.call_log, c)), a.loadingCalls = !1, a.$$phase || a.$apply()
        }
    }, a.getPreviousThreads = function () {
        if (!a.loadingSMSs) {
            a.loadingSMSs = !0;
            var b = _.first(a.sms_threads);
            d.getPreviousThreads(b, 15, function (b) {
                return a.sms_threads = _.union(b, a.sms_threads), a.loadingSMSs = !1, 0 === a.sms_threads.length ? (j(a.getPreviousThreads, 5e3), void 0) : (a.$$phase || a.$apply(), void 0)
            })
        }
    }, a.shouldShowBadges = function (a, b) {
        return a && -1 !== a.indexOf(b.id)
    }, a.handleSMSEvent = function (b) {
        angular.forEach(b, function (b) {
            var c = _.findWhere(a.sms_threads, {number: b.number});
            if (c) {
                if (c.timestamp < b.timestamp && (c.id = b.id, c.timestamp = b.timestamp, c.text = b.text), a.selectedThread) {
                    var d = {number: b.number, text: b.text, type: 3}, e = _.findWhere(a.selectedThread.smss, d);
                    e ? (e.type = 2, _gaq.push(["_trackEvent", "Phone", "SMS-Sent", "validated-send"])) : a.selectedThread.smss.push(b)
                }
            } else a.sms_threads.push(b)
        }), a.$$phase || a.$apply()
    }, a.initData = function () {
        a.getPreviousThreads(), a.getPreviousCalls()
    }, a.initData(), g.addEventListener(f.spotID("call_log"), "CACHE_UPDATE", a.getNewCalls, a, tabID), g.addEventListener(f.spotID("sms"), "SMS_EVENT", a.handleSMSEvent, a, tabID)
}]), app.controller("PhoneSettingsPanelCtrl", ["$scope", "$dynamicCSS", function (a, b) {
    "use strict";
    b.parse(a, {".badge": {background: "none", "margin-right": "10px"}, ".badge.active": {background: {scheme: [1]}, color: {scheme: [2]}}})
}]), app.directive("smsConversation", [function () {
    return{restrict: "A", link: function (a, b) {
        a.$watch("selectedThread", function () {
            a.timeout(function () {
                $(b).scrollTop($(b)[0].scrollHeight)
            })
        })
    }}
}]), app.filter("multiSearchFilter", [function () {
    return function (a, b, c) {
        for (var d = [], e = 0; e < a.length; e++)for (var f = 0; f < c.length; f++) {
            var g;
            if (-1 !== c[f].indexOf(".")) {
                if (g = c[f].substring(0, c[f].indexOf(".")), void 0 !== a[e][g] && void 0 !== b)for (var h in a[e][g])-1 !== a[e][g][h].toLowerCase().indexOf(b.toLowerCase()) && (checkIfArrayHasObject(d, a[e].id) || d.push(a[e]))
            } else void 0 !== a[e][c[f]] && void 0 !== b && -1 !== a[e][c[f]].toLowerCase().indexOf(b.toLowerCase()) && (checkIfArrayHasObject(d, a[e].id) || d.push(a[e]))
        }
        return d
    }
}]), app.controller("SearchCtrl", ["$scope", "$rootScope", "$dynamicCSS", "$favorites", "$gallery", "$spotsManager", "$idb", function (a, b, c, d, e, f) {
    "use strict";
    a.searchType = "web", a.spotsResults = null, a.smsResults = [], a.callLogResults = [], a.productsResults = [], b.doSearch = function (c) {
        _gaq.push(["_trackEvent", "Search", "Submit", c]), a.searchResults = null, a.spotsResults = null, a.smsResults = [], a.contactsResults = [], a.$$phase || a.$apply(), b.q && (a.doWebSearch(), a.getSmsResults(), a.getContactsResults(), a.getProductsResults(b.q))
    }, angular.forEach(f.getSpots(), function (b) {
        b.searchable && (a[b.name] = window[b.name])
    }), a.doWebSearch = function () {
        a.searchAjax && a.searchAjax.abort(), a.searchAjax = $.ajax({type: "GET", url: "http://start.mysearchdial.com/results.php", data: {a: "spts1201", q: b.q, category: a.searchResults}, success: function (b) {
            function c(c, e, f) {
                var g = $(b).find('ResultSet[id="' + c + '"]').find("Listing");
                f && (g = g.slice(0, f)), g.each(function (b) {
                    var c = $(this).attr("siteHost");
                    a.searchResults.push({sponsored: e, showImage: e ? e : 3 > b, title: $(this).attr("title"), description: $(this).attr("description"), normalizedUrl: /(http(s)?):\/\/.+/.test(c) ? c : "http://" + c, siteHost: $(this).attr("siteHost"), ClickUrl: $(this).find("ClickUrl").text(), isAdded: d.reverseMatch(c).length > 0 ? !0 : !1})
                })
            }

            a.NextArgs = $(b).find("NextArgs").text(), a.PrevArgs = $(b).find("PrevArgs").text(), a.TotalHits = $(b).find("TotalHits").text(), a.searchResults = [], c("searchResults", !0, 2), c("inktomi", !1), a.searchAjax = null, a.$$phase || a.$apply()
        }})
    }, a.loadNextWebSearch = function () {
        a.searchAjax || (a.searchAjax = $.ajax({type: "GET", url: "http://start.mysearchdial.com/results.php", data: {a: "spts1201", q: b.q, hData: a.NextArgs}, success: function (b) {
            $(b).find("Listing").each(function () {
                var b = $(this).attr("siteHost");
                a.searchResults.push({title: $(this).attr("title"), description: $(this).attr("description"), normalizedUrl: /(http(s)?):\/\/.+/.test(b) ? b : "http://" + b, siteHost: b, ClickUrl: $(this).find("ClickUrl").text(), isAdded: d.reverseMatch(b).length > 0 ? !0 : !1})
            }), a.searchAjax = null
        }}))
    }, a.setSearchType = function (c) {
        a.searchType = c, a.doSearch(b.q)
    }, a.toggleFavorite = function (b) {
        var c = new RegExp(b.normalizedUrl), f = d.reverseMatch(c);
        if (f.length > 0)angular.forEach(f, function (c) {
            d.removeFavorites([c.id], function () {
                b.isAdded = !1, a.$apply()
            })
        }); else {
            var g = {url: b.normalizedUrl, title: b.title.replace(/<(?:.|\n)*?>/gm, "")};
            e.updateFavItemByDomain(b.normalizedUrl, g), d.addItem(g, null, function () {
                b.isAdded = !0, a.$apply()
            })
        }
    }, b.getContrast = function (a) {
        return c.contrast(a)
    }, a.openWebLink = function (a, b) {
        b ? _gaq.push(["_trackEvent", "Search", "Click-Paid", a]) : _gaq.push(["_trackEvent", "Search", "Click-Organic", a]), window.location.href = a
    }, a.getSmsResults = function () {
        sms.getAllObjectsArray(function (b) {
            a.smsResults = b, a.$$phase || a.$apply()
        })
    }, a.getProductsResults = function (b) {
        products.fetchResults(b, function (b) {
            a.productsResults = b
        })
    }, a.getContactsResults = function () {
        contacts.getAllObjectsArray(function (b) {
            a.contactsResults = b, a.$$phase || a.$apply()
        })
    }
}]), app.directive("webSearchResults", [function () {
    return{restrict: "A", link: function (a, b) {
        b.ready(function () {
            b.scroll(function () {
                $(b).scrollTop() > $(b).prop("scrollHeight") - $(b).height() - 100 && a.loadNextWebSearch()
            })
        })
    }}
}]);
var tabID;
!function () {
    "use strict";
    var a = function () {
        chrome.tabs.getCurrent(function (a) {
            tabID = a.id, service("languageManager", function (a) {
                moment.lang(a.getLang()), service("configAPI", function (a) {
                    window.configAPI = a, window.config = a.getConfig(), async.map(config.module_import_list, function (a, b) {
                        service(a, function (c) {
                            window[a] = c, app.factory("$" + a, function () {
                                return c
                            }), b()
                        })
                    }, function (a) {
                        a ? console.error("%c newtab :: error bootstraping", "background:#E2F0B6;") : b()
                    })
                })
            })
        })
    }, b = function () {
        _gaq.push(["_trackEvent", "Newtab", "Init-Complete"]), angular.bootstrap(document, ["spotsNewtab"])
    };
    a()
}();