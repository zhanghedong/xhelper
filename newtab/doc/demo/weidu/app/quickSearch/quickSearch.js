var searchSiteOptions = {"baidu": ["http://www.baidu.com/s", "wd", "tn=16046049_dg;ie=utf-8"], "taobao": ["http://s8.taobao.com/search", "q", "ie=utf-8;pid=mm_13164080_2437641_9653920"], "google": ["http://www.google.com/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:5358528477"], "google_cn": ["http://www.google.com.hk/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:5358528477"], "google_de": ["http://www.google.de/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:1609216070"], "google_ru": ["http://www.google.ru/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:1609216070"], "google_pt_BR": ["http://www.google.com.bz/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:1609216070"], "google_pt_PT": ["http://www.google.pt/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:1609216070"], "google_es": ["http://www.google.es/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:1609216070"], "google_es_419": ["http://www.google.com/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:1609216070"], "google_zh_TW": ["http://www.google.com.tw/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:5358528477"], "google_ja": ["http://www.google.co.jp/cse", "q", "ie=utf-8;cx=partner-pub-6463892505403669:5358528477"], "yahoo": ["http://search.yahoo.com/search", "p", "ie=utf-8"], "yahoo_de": ["http://de.search.yahoo.com/search", "p", "ie=utf-8"], "yahoo_ru": ["http://ru.search.yahoo.com/search", "p", "ie=utf-8"], "yahoo_pt_BR": ["http://br.search.yahoo.com/search", "p", "ie=utf-8"], "yahoo_pt_PT": ["http://search.yahoo.com/search", "p", "ie=utf-8"], "yahoo_es": ["http://es.search.yahoo.com/search", "p", "ie=utf-8"], "yahoo_es_419": ["http://search.yahoo.com/search", "p", "ie=utf-8"], "yahoo_zh_TW": ["http://tw.search.yahoo.com/search", "p", "ie=utf-8"], "yahoo_ja": ["http://search.yahoo.co.jp/search", "p", "ie=utf-8"], "bing": ["http://www.bing.com/search", "q", "ie=utf-8"], "bing_de": ["http://www.bing.com/search", "q", "ie=utf-8"], "bing_ru": ["http://www.bing.com/search", "q", "ie=utf-8"], "bing_pt_BR": ["http://www.bing.com/search", "q", "ie=utf-8"], "bing_pt_PT": ["http://www.bing.com/search", "q", "ie=utf-8"], "bing_es": ["http://www.bing.com/search", "q", "ie=utf-8"], "bing_es_419": ["http://www.bing.com/search", "q", "ie=utf-8"], "bing_zh_TW": ["http://www.bing.com/search", "q", "ie=utf-8"], "bing_ja": ["http://www.bing.com/search", "q", "ie=utf-8"]};
var searchSites = ['google', 'yahoo', 'bing'];
var _searchSites = {'de': ['google_de', 'yahoo_de', 'bing_de'], 'ru': ['google_ru', 'yahoo_ru', 'bing_ru'], 'pt_BR': ['google_pt_BR', 'yahoo_pt_BR', 'bing_pt_BR'], 'pt_PT': ['google_pt_PT', 'yahoo_pt_PT', 'bing_pt_PT'], 'es': ['google_es', 'yahoo_es', 'bing_es'], 'es_419': ['google_es_419', 'yahoo_es_419', 'bing_es_419'], 'zh_CN': ['baidu', 'taobao', 'google_cn'], 'zh_TW': ['google_zh_TW', 'yahoo_zh_TW', 'bing_zh_TW'], 'ja': ['google_ja', 'yahoo_ja', 'bing_ja']};
if (typeof _searchSites[ui_locale] != "undefined") {
    searchSites = _searchSites[ui_locale]
}
var _minSearchForce = false;
var _quickSearchTransformFun = '';
(function ($) {
    $.quickSearch = function () {
        return new quickSearch()
    };
    var quickSearch = (function () {
        var quickSearch = function () {
        };
        quickSearch.prototype = {width: 700, content: '', searchFormObj: '', searchKeywordObj: '', searchSuggestObj: '', searchKeywordsObj: '', hotKeywordsContent: '', init: function (force) {
            var self = this;
            if (force == true) {
                self.content = ""
            }
            if (self.content != '') {
                return self.content
            }
            var contentObj = $(this.template());
            contentObj.find('.pageSwitcherItem').unbind('click').bind('click', function () {
                contentObj.find('.pageSwitcherItem').removeClass('selected');
                $(this).addClass('selected');
                contentObj.find("#searchIframe_" + $(this).attr('searchSite')).show();
                contentObj.find('.main').css("left", -1 * $(this).attr('left') + 'px');
                PDI.set("privateSetup", "searchSite", $(this).attr('searchSite'))
            });
            self.content = contentObj;
            return self.content
        }, initQuickSearchApp: function (targetObj) {
            var self = this;
            if (DBOX.radius < 32 && DBOX.width >= 135 && DBOX.height >= 120) {
                targetObj.find('.boxLogo').attr("bgHidden", "true");
                if (!targetObj.hasClass('quick')) {
                    targetObj.find('.boxLogo').addClass("hidden");
                    if (DBOX.radius < 30) {
                        targetObj.find('.boxLogo').css('borderBottomColor', 'rgba(150, 150, 150, .6)');
                        if (!DBOX.titleShow) {
                            targetObj.find('.boxTitle').css('backgroundColor', 'rgba(150, 150, 150, .4)')
                        }
                    }
                } else {
                    targetObj.find('.boxLogo').removeClass("hidden")
                }
                var searchItemHtml = '';
                var searchSite = PDI.get("privateSetup", "searchSite");
                searchSite = searchSites.indexOf(searchSite) == -1 ? searchSites[0] : searchSite;
                $.each(searchSites, function (i, n) {
                    searchItemHtml += '<div class="searchItem ' + n + (n == searchSite ? " selected" : "") + '" searchSite="' + n + '"></div>'
                });
                var searchSiteOption = searchSiteOptions[searchSite];
                var hideTxt = searchSiteOption[2];
                var hideNum = hideTxt.split(";");
                var hideHtml = "";
                var length = hideNum.length;
                for (var i = 0; i < length; i++) {
                    var hidenName = hideNum[i].split("=");
                    var input = "<input type=\"hidden\" name=\"" + hidenName[0] + "\" value=\"" + hidenName[1] + "\" /> ";
                    hideHtml += input
                }
                var quickSearchAppTop = parseInt(DBOX.height * 0.1);
                var quickSearchAppBigHeight = DBOX.titleShow == true ? parseInt(DBOX.height * 2 + DBOX.spacing + 2 + 64) : parseInt(DBOX.height * 2 + DBOX.spacing + 2);
                var searchSuggestMaxHeight = parseInt((quickSearchAppBigHeight - quickSearchAppTop - 60 - 30 - 32) / 38) * 38;
                if (targetObj.find('.quickSearchApp').length > 0) {
                    targetObj.find('.quickSearchApp').remove()
                }
                targetObj.append('<div class="quickSearchApp" style="top: ' + quickSearchAppTop + 'px"><form id="quickSearchForm" action="' + searchSiteOption[0] + '" target="' + (targetSwitch ? "_self" : "_blank") + '"><div class="searchList">' + searchItemHtml + '</div><div class="searchCenter"><div class="arrowBorder" style="left:' + (searchSites.indexOf(searchSite) * 40 + 8) + 'px"></div><div class="arrow" style="left:' + (searchSites.indexOf(searchSite) * 40 + 8) + 'px"></div><div class="searchHidden">' + hideHtml + '</div><input type="text" name="' + searchSiteOption[1] + '" class="searchKeyword" placeholder="' + getI18nMsg('minSearchPlaceHolder') + '" autocomplete="off"/><input type="submit" class="searchBtn" value=""/></div><div class="searchSuggest" style="max-height:' + searchSuggestMaxHeight + 'px"></div><div class="searchHotKeywords" style="max-height:' + searchSuggestMaxHeight + 'px"></div></form></div>');
                targetObj.find('.searchKeyword').unbind('keydown').bind('keydown', function (e) {
                    if (Math.abs(targetObj.get(0).offsetWidth - DBOX.width) >= parseInt(DBOX.width / 2)) {
                        if (e.keyCode == 38 || e.keyCode == 40) {
                            if (targetObj.find('.searchSuggest').css('display') != 'none') {
                                var index = -1;
                                if (targetObj.find('.searchSuggest').find('li.selected').length != 0) {
                                    index = targetObj.find('.searchSuggest').find('li').indexOf(targetObj.find('.searchSuggest').find('li.selected').get(0))
                                }
                                if (e.keyCode == 38 || e.keyCode == 40) {
                                    var nextIndex = 0;
                                    if (index == -1) {
                                        if (e.keyCode == 38) {
                                            nextIndex = targetObj.find('.searchSuggest').find('li').length - 1
                                        }
                                    } else {
                                        nextIndex = e.keyCode == 38 ? (index - 1) : (index + 1)
                                    }
                                    targetObj.find('.searchSuggest').find('li').removeClass('selected');
                                    var nextObj = targetObj.find('.searchSuggest').find('li')[nextIndex];
                                    if (typeof nextObj != 'undefined') {
                                        $(nextObj).addClass('selected');
                                        targetObj.find('.searchKeyword').val(S2S($(nextObj).attr('keyword')))
                                    }
                                }
                            }
                        }
                    }
                });
                targetObj.find('.searchKeyword').unbind('keyup').bind('keyup', function (e) {
                    if (Math.abs(targetObj.get(0).offsetWidth - DBOX.width) >= parseInt(DBOX.width / 2)) {
                        if (e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13 || e.keyCode == 27) {
                            if (e.keyCode == 27) {
                                targetObj.find('.searchSuggest').hide()
                            }
                            return false
                        }
                        var searchSite = PDI.get("privateSetup", "searchSite");
                        searchSite = searchSites.indexOf(searchSite) == -1 ? searchSites[0] : searchSite;
                        var keyword = targetObj.find('.searchKeyword').val();
                        $.ajax({url: urlImg + "myapp/quickSearch/suggestData/index.php?t=" + searchSite + "&q=" + encodeURIComponent(keyword), success: function (data) {
                            if (keyword != "") {
                                if (data) {
                                    try {
                                        var firMatches = data.match(/(.*?)\[\[(.*)\]\]\,/);
                                        if (firMatches) {
                                            var matche = firMatches[2];
                                            if (matche) {
                                                data = JSON.parse("[[" + matche + "]]")
                                            }
                                        } else {
                                            var firMatches = data.match(/(.*?)\[\[(.*)\]\]/);
                                            if (firMatches) {
                                                var matche = firMatches[2];
                                                if (matche) {
                                                    data = JSON.parse("[[" + matche + "]]")
                                                }
                                            } else {
                                                firMatches = data.match(/(.*?)\[(.*)\]/);
                                                if (firMatches) {
                                                    var matche = firMatches[2]
                                                }
                                                var secMatches = matche.match(/(.*?)\[\{(.*)\}\]/);
                                                if (secMatches) {
                                                    matche = secMatches[2];
                                                    if (matche) {
                                                        data = JSON.parse("[{" + matche + "}]")
                                                    }
                                                } else {
                                                    if (matche && matche.indexOf("[]") == -1) {
                                                        data = JSON.parse("[" + matche + "]")
                                                    }
                                                }
                                            }
                                        }
                                        if (typeof data != "string" && data.length > 0) {
                                            var suggestContent = '<ul>';
                                            $.each(data, function (i, n) {
                                                if (i < 5) {
                                                    if (typeof n == 'object') {
                                                        var firVal = '';
                                                        var secVal = '';
                                                        $.each(n, function (p, q) {
                                                            if (firVal == '' && secVal == '') {
                                                                firVal = q.replace(/<\/?b>(.*?)/g, '\1')
                                                            } else if (secVal == '') {
                                                                secVal = q
                                                            }
                                                        });
                                                        suggestContent += '<li keyword="' + firVal + '">' + firVal.replace(keyword, '<label>' + keyword + '</label>') + '</li>'
                                                    } else {
                                                        n = n.replace(/<\/?b>(.*?)/g, '\1');
                                                        suggestContent += '<li keyword="' + n + '">' + n.replace(keyword, '<label>' + keyword + '</label>') + '</li>'
                                                    }
                                                }
                                            });
                                            suggestContent += '</ul>';
                                            targetObj.find('.searchHotKeywords').hide();
                                            targetObj.find('.searchSuggest').html(suggestContent);
                                            if (keyword != "" && Math.abs(targetObj.get(0).offsetWidth - DBOX.width) >= parseInt(DBOX.width / 2)) {
                                                targetObj.find('.searchSuggest').show()
                                            }
                                            targetObj.find('.searchSuggest').find('li').unbind('click').bind('click',function () {
                                                targetObj.find('.searchKeyword').val(S2S($(this).attr('keyword')));
                                                targetObj.find('.searchKeyword').get(0).focus();
                                                setTimeout(function () {
                                                    targetObj.find("#quickSearchForm").get(0).submit()
                                                }, 200)
                                            }).unbind('mouseover').bind('mouseover', function () {
                                                targetObj.find('.searchSuggest').find('li').removeClass('selected');
                                                $(this).addClass('selected')
                                            })
                                        } else {
                                            targetObj.find('.searchSuggest').hide()
                                        }
                                    } catch (err) {
                                        targetObj.find('.searchSuggest').hide()
                                    }
                                } else {
                                    targetObj.find('.searchSuggest').hide()
                                }
                            } else {
                                targetObj.find('.searchSuggest').hide();
                                if (Math.abs(targetObj.get(0).offsetWidth - DBOX.width) >= parseInt(DBOX.width / 2)) {
                                    targetObj.find('.searchHotKeywords').show()
                                }
                            }
                        }})
                    }
                });
                targetObj.find('.searchItem').unbind('click').bind('click', function () {
                    targetObj.find('.searchItem').removeClass('selected');
                    $(this).addClass('selected');
                    var searchSiteOption = searchSiteOptions[$(this).attr("searchSite")];
                    var hideTxt = searchSiteOption[2];
                    var hideNum = hideTxt.split(";");
                    var hideHtml = "";
                    var length = hideNum.length;
                    for (var i = 0; i < length; i++) {
                        var hidenName = hideNum[i].split("=");
                        var input = "<input type=\"hidden\" name=\"" + hidenName[0] + "\" value=\"" + hidenName[1] + "\" /> ";
                        hideHtml += input
                    }
                    targetObj.find("#quickSearchForm").find(".searchHidden").html(hideHtml);
                    targetObj.find("#quickSearchForm").attr("action", searchSiteOption[0]);
                    targetObj.find('.searchKeyword').attr("name", searchSiteOption[1]);
                    var searchItemIndex = targetObj.find('.searchItem').indexOf(this);
                    targetObj.find(".arrowBorder").css("left", (searchItemIndex * 40 + 8) + "px");
                    targetObj.find(".arrow").css("left", (searchItemIndex * 40 + 8) + "px");
                    PDI.set("privateSetup", "searchSite", $(this).attr("searchSite"))
                });
                targetObj.find('.searchKeyword').unbind('click').bind('click',function (e) {
                    if (!DBOX.page3DSwitcherOpen && !_edit && !_move && !targetObj.hasClass('quick') && Math.abs(targetObj.get(0).offsetWidth - DBOX.width) < parseInt(DBOX.width / 2)) {
                        var n = 2;
                        if (DBOX.width == DBOX.height) {
                            n = 3
                        }
                        var curIndex = $(".normalDialbox .appBox").indexOf(targetObj.get(0));
                        var rowIndex = parseInt(curIndex / DBOX.cols) + 1;
                        var colIndex = curIndex % DBOX.cols + 1;
                        var targetLeft = targetObj.get(0).offsetLeft, targetTop = targetObj.get(0).offsetTop;
                        targetObj.attr("curLeft", targetLeft);
                        targetObj.attr("curTop", targetTop);
                        if (rowIndex > (DBOX.rows % 2 == 0 ? parseInt(DBOX.rows / 2) : (parseInt(DBOX.rows / 2) + 1))) {
                            targetTop = DBOX.titleShow == true ? (targetObj.get(0).offsetTop - DBOX.height - DBOX.spacing - 2 - 32) : (targetObj.get(0).offsetTop - DBOX.height - DBOX.spacing - 2)
                        }
                        if (colIndex > (DBOX.cols % 2 == 0 ? parseInt(DBOX.cols / 2) : (parseInt(DBOX.cols / 2) + 1))) {
                            targetLeft = (targetObj.get(0).offsetLeft - DBOX.width * (n - 1) - DBOX.spacing * (n - 1) - (n - 1) * 2)
                        }
                        var zIndex = getMaxZindex(targetObj) + 1;
                        targetObj.css({"WebkitTransition": "all .15s ease-in"});
                        setTimeout(function () {
                            targetObj.css({"left": targetLeft + 'px', "top": targetTop + 'px', "width": parseInt(DBOX.width * n + DBOX.spacing * (n - 1) + (n - 1) * 2) + 'px', "height": (DBOX.titleShow == true ? parseInt(DBOX.height * 2 + DBOX.spacing + 2 + 64) : parseInt(DBOX.height * 2 + DBOX.spacing + 2)) + 'px', "zIndex": zIndex});
                            _quickSearchTransformFun = setTimeout(function () {
                                if (targetObj.find('.searchKeyword').val() == "") {
                                    if (self.hotKeywordsContent == '' || targetObj.find('.iframeSearchHotKeywords').length == 0) {
                                        var iframeSrc = "http://" + iframeDomain + "/myapp/quickSearch/keywords/index.html?langPre=" + _langPre + "&targetSwitch=" + targetSwitch;
                                        self.hotKeywordsContent = "<iframe class='iframeSearchHotKeywords' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' src='" + iframeSrc + "'>";
                                        targetObj.find('.searchHotKeywords').empty();
                                        targetObj.find('.searchHotKeywords').html(self.hotKeywordsContent)
                                    }
                                    if (targetObj.find('.searchSuggest').css("display") == "none" && Math.abs(targetObj.get(0).offsetWidth - DBOX.width) >= parseInt(DBOX.width / 2)) {
                                        targetObj.find('.searchHotKeywords').show()
                                    }
                                } else {
                                    targetObj.find('.searchHotKeywords').hide();
                                    if (Math.abs(targetObj.get(0).offsetWidth - DBOX.width) >= parseInt(DBOX.width / 2)) {
                                        targetObj.find('.searchSuggest').show()
                                    }
                                }
                            }, 150)
                        }, 0)
                    }
                }).unbind('focus').bind('focus',function () {
                    _minSearchForce = true
                }).unbind('blur').bind('blur', function () {
                    _minSearchForce = false
                });
                targetObj.unbind('mouseout').bind('mouseout', function (e) {
                    if (!targetObj.hasClass('quick') && !isMouseMoveContains(e, this) && Math.abs(targetObj.get(0).offsetWidth - DBOX.width) >= parseInt(DBOX.width / 2)) {
                        if (typeof _quickSearchTransformFun != '') {
                            clearTimeout(_quickSearchTransformFun)
                        }
                        targetObj.find('.searchKeyword').get(0).blur();
                        targetObj.find('.searchSuggest').hide();
                        targetObj.find('.searchHotKeywords').hide();
                        targetObj.css({"left": targetObj.attr("curLeft") + 'px', "top": targetObj.attr("curTop") + 'px', "width": DBOX.width + 'px', "height": (DBOX.titleShow == true ? (DBOX.height + 32) : DBOX.height) + "px", "zIndex": "none"});
                        targetObj.removeAttr('curLeft');
                        targetObj.removeAttr('curTop')
                    }
                })
            }
        }, template: function () {
            var self = this;
            var searchIframeContent = '', searchPageSwitcher = '', index = 0;
            var searchSite = PDI.get("privateSetup", "searchSite");
            if (searchSites.indexOf(searchSite) > -1) {
                searchIframeContent += '<div class="iframeContainer"><iframe id="searchIframe_' + searchSite + '" style="display:block" searchSite="' + searchSite + '" src="http://' + iframeDomain + '/myapp/quickSearch/s_' + searchSite + '.html#show" width="700" height="400" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe></div>';
                searchPageSwitcher += '<div class="pageSwitcherItem selected" searchSite="' + searchSite + '" left="' + index * self.width + '"><img src="http://' + iframeDomain + '/myapp/quickSearch/s_' + searchSite + '/img/button.png" width="40" height="40"></div>';
                index++
            }
            $.each(searchSites, function (i, n) {
                if (n != searchSite) {
                    searchIframeContent += '<div class="iframeContainer"><iframe id="searchIframe_' + n + '" ' + (index == 0 ? 'style="dispaly:block;"' : 'style="display:none"') + ' searchSite="' + n + '" src="http://' + iframeDomain + '/myapp/quickSearch/s_' + n + '.html" width="700" height="400" marginwidth="0" marginheight="0" hspace="0" vspace="0" frameborder="0" scrolling="no"></iframe></div>';
                    searchPageSwitcher += '<div class="pageSwitcherItem' + (index == 0 ? ' selected' : '') + '" searchSite="' + n + '" left="' + index * self.width + '"><img src="http://' + iframeDomain + '/myapp/quickSearch/s_' + n + '/img/button.png" width="40" height="40"></div>';
                    index++
                }
            });
            return'<div class="quickSearchContainer"><div class="quickSearchHeader"><div class="headerIcon"></div>' + getI18nMsg('quickSearchAppTitle') + '</div><div class="quickSearchBody"><div class="main" style="width:' + searchSites.length * self.width + 'px">' + searchIframeContent + '</div><div class="pageSwitcher">' + searchPageSwitcher + '</div></div></div>'
        }};
        return quickSearch
    })()
})(jq);
var quickSearch = $.quickSearch();