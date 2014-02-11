(function ($) {
    $.cloud = function () {
        return new cloud()
    };
    var cloud = (function () {
        var cloud = function () {
        };
        cloud.prototype = {categorys: {'Bookmark': 1, 'Recent': 2, 'User': 3, 'History': 4, 'Search': 5, 'Hot': 1000, 'Popular': 1010, 'Video': 1011, 'Music': 1012, 'Game': 1013, 'Book': 1014, 'Shopping': 1015, 'Life': 1016, 'Geek': 1017, 'News': 1018, 'Sns': 1019, 'Tour': 1020, 'Economy': 1021}, contentClass: 'cloudContainer', content: '', init: function () {
            var self = this;
            if (self.content != '') {
                return self.content
            }
            var template = $(this.template());
            template.find('.categoryNav').append(self.loadCategoryMenu());
            template.find('#searchForm').bind('submit', function () {
                cloudWebsite.initSearchWebsiteContainer(template.find('#searchKeyword').val());
                return false
            });
            template.find(".cloudSwitch").bind("click", function () {
                if (template.find('.container.createWebsite').hasClass("show")) {
                    $(this).text(getI18nMsg('websiteAdd'));
                    template.find(".menu").removeClass('hide');
                    if (template.find(".menu .navItem.selected").attr("category") == "myApps") {
                        self.toggleContainer('appList')
                    } else {
                        self.toggleContainer('websiteList')
                    }
                } else {
                    $(this).text(getI18nMsg('cloudAppTitle'));
                    template.find(".menu").addClass('hide');
                    self.toggleContainer('createWebsite')
                }
            });
            self.content = template;
            return template
        }, loadCategoryMenu: function () {
            var self = this;
            var categoryMenus = '';
            var index = 0;
            $.each(self.categorys, function (i, n) {
                if (n >= 1000) {
                    categoryMenus += '<li class="navItem' + (n == 1000 ? " selected" : "") + '" category="' + i + '"><div>' + getI18nMsg('websiteCategory' + i) + '</div></li>';
                    index++
                }
                if (index == 1) {
                    categoryMenus += '<li class="navItem" category="myApps"><div>' + getI18nMsg('myApps') + '</div><div class="hot"></div></li>'
                }
            });
            categoryMenus = $(categoryMenus);
            categoryMenus.siblings('li').unbind('click').bind('click', function () {
                $('.navItem').removeClass('selected');
                $(this).addClass('selected');
                if ($(this).attr("category") == "myApps") {
                    self.toggleContainer("appList")
                } else {
                    self.toggleContainer("websiteList");
                    $("." + self.contentClass).find("#searchKeyword").val('');
                    cloudWebsite.initWebsiteContainer($(this).attr('category'), 1)
                }
            });
            return categoryMenus
        }, toggleContainer: function (className) {
            var self = this;
            var targetObj = $("." + self.contentClass).find(".container." + className);
            if (!targetObj.hasClass("show")) {
                var hideObj = $("." + self.contentClass).find(".container.show");
                hideObj.removeClass("show");
                targetObj.addClass("show")
            }
        }, template: function () {
            var self = this;
            return'<div class="' + self.contentClass + '"><div class="cloudHeader"><div class="headerIcon"></div>' + getI18nMsg('cloudAppTitle') + '<div class="cloudSwitch">' + getI18nMsg('websiteAdd') + '</div></div><div class="cloudBody"><div class="menu"><ul class="categoryNav"></ul><div class="etc"><input type="checkbox" id="multipleSelect" value="1" /><label class="multipleSelectTitle" for="multipleSelect">' + getI18nMsg('multi') + '</label></div></div><div class="main"><div class="container websiteList show"><div class="search"><form id="searchForm"><input id="searchKeyword" type="text" maxlength="60" placeholder="' + getI18nMsg('websiteSearch') + '"/><input type="submit" class="searchBtn" value="" /></form></div><ul class="websiteItemList"></ul></div><div class="container appList"><div class="pluginsTitle">' + getI18nMsg('pluginsTitle') + '</div><ul class="pluginsList"></ul><div class="shortcutsTitle new">' + getI18nMsg('shortcutsTitle') + '</div><ul class="shortcutsList"></ul></div><div class="container createWebsite"><form id="websiteForm"><div class="infoContainer"><div class="textInfo"><div class="webSiteUrl"><span class="itemTitle">' + getI18nMsg('webSiteUrl') + '</span><input id="webSiteUrl" name="webSiteUrl" type="text" placeholder="http://" v=""/><div id="webSiteUrlSuggest" class="suggest" style="width:438px;left:80px;top:91px;"></div><span class="message">' + getI18nMsg('webSiteUrlMessage') + '</span></div><div class="webSiteTitle"><span class="itemTitle">' + getI18nMsg('webSiteTitle') + '</span><input id="webSiteTitle" type="text" name="webSiteTitle" v=""/><span class="message">' + getI18nMsg('webSiteTitleMessage') + '</span></div></div><div class="logoInfo"><div class="logoBox"><div class="logo"></div><div class="selectArrow"><div class="arrow"></div></div></div><div class="logoContainer"><input type="file" name="logoData" id="logoData" style="visibility:hidden;width:0px;height:0px;" accept="image/*" /></div><input id="webSiteLogo" type="hidden" name="webSiteLogo"></div></div><div class="aboutContainer"><div class="aboutTabs"><div class="topTab selected">' + getI18nMsg('topVisited') + '</div><div class="currentTab">' + (isApp ? '' : getI18nMsg('currentVisiting')) + '</div></div><div class="visiteContainer selected" tab="topTab"></div><div class="visiteContainer" tab="currentTab"></div></div><div class="classificationsContainer"><div class="classificationsTabs"><div class="classificationsTab">' + getI18nMsg('classificationAppTitle') + '</div></div><div class="classificationsList"></div></div><div class="btnContainer"><input type="button" id="resetBtn" name="resetBtn" class="btn" value="' + getI18nMsg('cancel') + '"><input type="submit" id="submitBtn" name="submitBtn" class="btn" value="' + getI18nMsg('determine') + '"></div></form></div><div class="loading"><img src="img/skin_0/loading2.gif" /></div></div></div></div>'
        }};
        return cloud
    })()
})(jq);
var cloud = $.cloud();