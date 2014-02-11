(function ($) {
    $.lastVisited = function () {
        return new lastVisited()
    };
    var lastVisited = (function () {
        var urlList;
        var lastVisited = function () {
        };
        lastVisited.prototype = {content: '', init: function () {
        }, template: function (visitedTemplate) {
            var self = this;
            var contentObj = $('<div class="lastVisitedContainer"><div class="lastVisitedHeader"><div class="headerIcon"></div>' + getI18nMsg('lastVisitedAppTitle') + '<div id="removeAll" class="lastVisitedBtn removeAll">' + getI18nMsg('removeAll') + '</div><div id="openAll" class="lastVisitedBtn openAll">' + getI18nMsg('openAll') + '</div></div><div class="lastVisitedBody">' + visitedTemplate + '</div></div>');
            contentObj.find('.visitedItemAdd').unbind('click').bind('click', function () {
                var url = $(this).siblings('a').attr('href');
                var title = $(this).siblings('a').text();
                $('#lastVisitedDialog').find('.close').get(0).click();
                if (DBOX.getLastDialbox() == "cloud") {
                    var toIndex = DBOX.getDialboxIndex('normal', 'cloud');
                    PDI.appendDialbox('normal', toIndex, {title: title_fix(title), url: url, isApp: false, isNew: true})
                } else {
                    PDI.insertDialbox('normal', {title: title_fix(title), url: url, isApp: false, isNew: true})
                }
                DBOX.getBoxes();
                setTimeout(function () {
                    DBOX.loadBoxes(DBOX.totalPage)
                }, 350)
            });
            contentObj.find('.visitedItemDel').unbind('click').bind('click', function () {
                if (confirm(getI18nMsg('lastVisitedDelete_confirm'))) {
                    var delUrl = $(this).parent().attr("url");
                    if (typeof chrome.history != "undefined") {
                        chrome.history.deleteUrl({"url": delUrl}, function () {
                            self.content.find('.lastVisitedItem[url="' + delUrl + '"]').remove()
                        })
                    }
                }
            });
            contentObj.find('#removeAll').unbind('click').bind('click', function () {
                contentObj.find('.lastVisitedBody').html('<div class="lastVisitedItem"><a>' + getI18nMsg('lastVisitedNull') + '</a></div>');
                if (typeof chrome.history != "undefined") {
                    chrome.history.deleteAll(function () {
                    })
                }
            });
            contentObj.find('#openAll').unbind('click').bind('click', function () {
                for (var i = 0, l = urlList.length; i < l; i++) {
                    openTab(false, urlList[i], tabID, ctrlKey)
                }
            });
            self.content = contentObj;
            return contentObj
        }, visitedTemplate: function (data) {
            var visitedTemplate = '';
            urlList = new Array();
            if (data instanceof Array && data.length > 0) {
                $.each(data, function (i, n) {
                    if (n !== undefined) {
                        if ((/^(http|https|ftp|ftps|file|chrome|chrome-extension|chrome-devtools)\:\/\/(.*)/).test(n.title) == false && (/^(ftp|ftps|file|chrome|chrome-extension)\:\/\/(.*)/).test(n.url) == false) {
                            var title = n.title;
                            if (title == '') {
                                return
                            }
                            var url = n.url;
                            urlList.push(url);
                            var furl = 'chrome://favicon/' + n.url;
                            title = truncate(title, 0, 36);
                            visitedTemplate += '<div class="lastVisitedItem" url="' + n.url + '"><a href="' + n.url + '" style="background-image: url(' + furl + ');">' + title_fix(title) + '</a><div class="visitedItemAdd" title="' + getI18nMsg('addToDialbox') + '"></div><div class="visitedItemDel" title="' + getI18nMsg('delete') + '"></div></div>'
                        }
                    }
                })
            } else {
                visitedTemplate = '<div class="lastVisitedItem"><a>' + getI18nMsg('lastVisitedNull') + '</a></div>'
            }
            return visitedTemplate
        }};
        return lastVisited
    })()
})(jq);
var lastVisited = $.lastVisited();