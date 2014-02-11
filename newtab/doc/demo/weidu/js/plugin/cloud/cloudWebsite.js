(function ($) {
    $.cloudWebsite = function (opt) {
        return new cloudWebsite(opt)
    };
    var cloudWebsite = (function (opt) {
        var cloudWebsite = function (opt) {
            var self = this;
            $.each(opt, function (i, n) {
                self[i] = n
            });
            self.init()
        };
        cloudWebsite.prototype = {langs: {'zh_CN': 0, 'zh_TW': 1000, 'en': 2000, 'de': 2000, 'ru': 2000, 'pt_BR': 2000, 'pt_PT': 2000, 'es': 2000, 'es_419': 2000, 'ja': 2000}, categorys: {'Bookmark': 1, 'Recent': 2, 'User': 3, 'History': 4, 'Search': 5, 'Hot': 1000, 'Popular': 1010, 'Video': 1011, 'Music': 1012, 'Game': 1013, 'Book': 1014, 'Shopping': 1015, 'Life': 1016, 'Geek': 1017, 'News': 1018, 'Sns': 1019, 'Tour': 1020, 'Economy': 1021}, page: 1, num: 30, lang: 'zh_CN', category: 'Hot', isSearch: false, loadCacheData: false, loadDataIndex: 1, container: '', installWebSites: [], init: function () {
            var self = this;
            self.installWebSites = [];
            var normalWebSites = PDI.get('dialBoxes', 'normal');
            $.each(normalWebSites, function (i, n) {
                if (!n.isDel && (typeof n.isApp == 'undefined' || n.isApp == false)) {
                    var url = n.url;
                    if (url.substring(0, 4) !== "http") {
                        url = "http://" + url
                    }
                    self.installWebSites.push(url.toLowerCase())
                }
            });
            var quickWebSites = PDI.get('dialBoxes', 'quick');
            $.each(quickWebSites, function (i, n) {
                if (!n.isDel && (typeof n.isApp == 'undefined' || n.isApp == false)) {
                    var url = n.url;
                    if (url.substring(0, 4) !== "http") {
                        url = "http://" + url
                    }
                    self.installWebSites.push(url.toLowerCase())
                }
            });
            self.initWebsiteContainer(self.category, 1)
        }, initWebsiteContainer: function (category, page) {
            var self = this;
            self.container.unbind('scroll');
            if (typeof category != 'undefined') {
                self.category = category
            }
            if (typeof page != 'undefined') {
                self.page = page
            }
            self.loadCacheData = false;
            self.loadDataIndex = 1;
            self.isSearch = false;
            self.container.empty();
            self.container.parent().siblings('.loading').css("visibility", "visible");
            self.loadWebsiteData()
        }, initSearchWebsiteContainer: function (keyword) {
            var self = this;
            self.isSearch = true;
            keyword = typeof keyword == 'undefined' ? '' : keyword;
            self.container.empty();
            self.container.parent().siblings('.loading').css("visibility", "visible");
            self.page = 1;
            var dataUrl = urlImg + 'weidu/site.json.php?a=search';
            $.post(dataUrl, {"lang": self.lang, "keyword": keyword}, function (data) {
                if (data) {
                    data = JSON.parse(data);
                    if (data.length > 0) {
                        self.loadCacheData = data;
                        self.loadWebsite(0, data.length)
                    }
                } else {
                    self.loadCacheData = [];
                    self.container.parent().siblings('.loading').css("visibility", "hidden");
                    self.container.html(getI18nMsg('noResult'))
                }
            })
        }, loadWebsiteData: function (force) {
            var self = this;
            var start = (self.page - 1) * self.num, end = start + self.num;
            if (typeof force == 'undefined' || force !== false) {
                force = true
            }
            if (self.loadCacheData === false) {
                var dataUrl = urlImg + 'cloudapp/' + (self.categorys[self.category] + self.langs[self.lang]) + (self.loadDataIndex == 1 ? '' : '-' + self.loadDataIndex) + '.json';
                $.getJSON(dataUrl, function (data) {
                    if (data.length > 0) {
                        self.loadCacheData = data;
                        if (force === true) {
                            self.loadWebsite(start, end)
                        }
                        self.loadDataIndex++
                    } else {
                        self.loadCacheData = [];
                        self.loadWebsite(start, end)
                    }
                })
            } else {
                self.loadWebsite(start, end);
                if (end >= self.loadCacheData.length && self.category == 'Hot') {
                    self.page = 1;
                    self.loadCacheData = false;
                    self.loadWebsiteData(false)
                }
            }
        }, loadWebsite: function (start, end) {
            var self = this;
            var container = self.container;
            self.container.parent().siblings('.loading').css("visibility", "hidden");
            if (self.loadCacheData.length > 0) {
                if (start < self.loadCacheData.length) {
                    $.each(self.loadCacheData, function (i, n) {
                        if (i >= start && i < end) {
                            var img = '';
                            if (typeof n.i != 'undefined') {
                                img = n.i.trim()
                            } else {
                                img = n.u.trim();
                                if (img == '') {
                                    img = urlImg + 'images/ie_logo.png'
                                } else {
                                    img = img.toLowerCase().replace(/%3a%2f%2f/ig, '://');
                                    var imgMatch = img.match(/:\/\/[^\/]+/g);
                                    if (imgMatch == null) {
                                        img = "http://" + img;
                                        imgMatch = img.match(/:\/\/[^\/]+/g)
                                    }
                                    img = imgMatch.pop();
                                    img = img.substr(3);
                                    img = img.replace(/^www\./, '');
                                    if (img == '' || img.indexOf('.') == -1 || img.indexOf('.') == img.length - 1) {
                                        img = urlImg + 'images/ie_logo.png'
                                    } else {
                                        img = urlImg + 'm/' + img + '.png'
                                    }
                                }
                            }
                            var url = n.u.trim();
                            if (n.u != '') {
                                url = url.toLowerCase().replace(/%3a%2f%2f/ig, '://');
                                var index = url.indexOf("://");
                                if (index <= 0 || index >= 20) {
                                    if (url.substring(0, 4) !== "http") {
                                        url = "http://" + url
                                    }
                                }
                            }
                            var websiteItem = $('<li class="websiteItem"><div class="itemWindow"  title="' + getI18nMsg('itemAdd') + '"></div><div class="itemBottom"><a class="openWeb" title="' + getI18nMsg('openWeb') + '"></a></div><div class="itemData"><div class="itemLogo" style="background-image:url(' + img + ');"></div><div class="itemDesc"><a>' + n.t + ':' + n.d + '</a></div></div><div class="itemInstall' + (self.installWebSites.indexOf(url.toLowerCase()) >= 0 ? ' selected' : '') + '"><div class="installBar"></div><div class="selected"></div></div></li>');
                            websiteItem.find('.openWeb').unbind('click').bind('click', function () {
                                openTab(false, url, tabID)
                            });
                            websiteItem.find('.itemWindow').unbind('click').bind('click', function () {
                                if ($(this).siblings('.itemInstall').hasClass('selected')) {
                                    return false
                                } else {
                                    if (DBOX.getLastDialbox() == "cloud") {
                                        var toIndex = DBOX.getDialboxIndex('normal', 'cloud');
                                        PDI.appendDialbox('normal', toIndex, {title: n.t, url: n.u, desc: n.d, html: n.h, isApp: false, isNew: true})
                                    } else {
                                        PDI.insertDialbox('normal', {title: n.t, url: n.u, desc: n.d, html: n.h, isApp: false, isNew: true})
                                    }
                                    self.installWebSites.push(url);
                                    $(this).siblings('.itemInstall').addClass('selected');
                                    _isRefresh = "lastPage";
                                    $.post(urlImg + 'weidu/site.json.php?a=add', {"ids": n.id}, function (data) {
                                    });
                                    if ($('#cloudDialog').find('#multipleSelect:checked').length == 0) {
                                        $('#cloudDialog').find('.close').get(0).click()
                                    }
                                }
                            });
                            container.append(websiteItem)
                        }
                    });
                    self.page++;
                    if (!self.isSearch) {
                        self.container.unbind('scroll').bind('scroll', function () {
                            self.container.find('#refresh').remove();
                            self.container.append('<div id="refresh"></div>');
                            if (this.scrollHeight - this.scrollTop - this.offsetHeight < 180) {
                                if (self.container.parent().siblings('.loading').css("visibility") == "hidden") {
                                    self.container.parent().siblings('.loading').css("visibility", "visible");
                                    setTimeout(function () {
                                        self.loadWebsiteData()
                                    }, 1500)
                                }
                            }
                        });
                        return
                    }
                    self.container.unbind('scroll')
                }
            }
            self.container.unbind('scroll');
            setTimeout(function () {
                self.container.parent().siblings('.loading').css("visibility", "hidden")
            }, 1000)
        }};
        return cloudWebsite
    })()
})(jq);
var cloudWebsite = $.cloudWebsite({"container": $('.websiteItemList'), "lang": _config['lang']});