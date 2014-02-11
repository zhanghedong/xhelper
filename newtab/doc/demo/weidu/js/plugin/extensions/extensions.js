(function ($) {
    $.extensions = function () {
        return new extensions()
    };
    var extensions = (function () {
        var extensions = function () {
            var self = this;
            self.init()
        };
        extensions.prototype = {content: '', installApps: [], init: function () {
            var self = this
        }, template: function (extensions) {
            var self = this;
            self.installApps = [];
            var normalWebSites = PDI.get('dialBoxes', 'normal');
            $.each(normalWebSites, function (i, n) {
                if (!n.isDel && typeof n.isApp != 'undefined' && n.isApp) {
                    self.installApps.push(n.isApp)
                }
            });
            var quickWebSites = PDI.get('dialBoxes', 'quick');
            $.each(quickWebSites, function (i, n) {
                if (!n.isDel && typeof n.isApp != 'undefined' && n.isApp) {
                    self.installApps.push(n.isApp)
                }
            });
            self.content = $('<div class="extensionsContainer"><div class="extensionsHeader"><div class="headerIcon"></div>' + getI18nMsg('extensionsAppTitle') + '<div class="extensionsManage">' + getI18nMsg('extensionsManage') + '</div><div class="extensionsAddMore">' + getI18nMsg('appItemGetMore') + '</div></div><div class="extensionsBody"><div class="extensionsClass"><div class="classItem exist" type="exist">' + getI18nMsg('appItemExist') + '</div><div class="classItem notExist" type="notExist">' + getI18nMsg('appItemNotExist') + '</div><div class="classItem all selected" type="all">' + getI18nMsg('all') + '</div></div></div></div>');
            self.content.find(".extensionsManage").bind("click", function () {
                url = getChromeUrl("extensions");
                openTab(false, url, tabID, ctrlKey)
            });
            self.content.find(".extensionsAddMore").bind("click", function () {
                url = "https://chrome.google.com/webstore";
                openTab(false, url, tabID, ctrlKey)
            });
            if (extensions instanceof Array && extensions.length > 0) {
                $.each(extensions, function (i, n) {
                    if (n.id != document.location.host) {
                        self.addExtensionItem(n)
                    }
                })
            }
            self.content.find(".classItem").bind("click", function () {
                self.content.find(".classItem").removeClass("selected");
                $(this).addClass("selected");
                if ($(this).attr("type") == "all") {
                    self.content.find(".extensionsItem").show()
                } else {
                    self.content.find(".extensionsItem").hide();
                    self.content.find(".extensionsItem[type=" + $(this).attr("type") + "]").show()
                }
            });
            self.content.find('.extensionsBody').unbind('scroll').bind('scroll', function () {
                self.content.find('#refresh').remove();
                self.content.find('.extensionsBody').append('<div id="refresh"></div>')
            });
            self.content.find(".extensionsItem").show();
            return self.content
        }, addExtensionItem: function (extension) {
            var self = this;
            var extensionItem = $('<div class="extensionsItem' + (extension.enabled ? '' : ' unabled') + '" type="' + ((extension.isApp && self.installApps.indexOf(extension.id) == -1) ? "notExist" : (extension.isApp && self.installApps.indexOf(extension.id) > -1) ? "exist" : "") + '" style="display:none;"><div class="extensionsLogo" style="background:url(chrome://extension-icon/' + extension.id + '/128/0);background-size:100%;background-position:center;"></div><div class="extensionsContent"><div class="extensionsTitle">' + extension.name + '<div class="extensionsStatus' + (extension.enabled ? ' enabled' : '') + '">' + (extension.enabled ? getI18nMsg('appItemEnabled') : getI18nMsg('appItemOpen')) + '</div></div><div class="extensionsMemo" title="' + extension.description + '">' + title_fix(truncate(extension.description, 0, 72)) + '</div><div class="extensionsAct"><div class="actButton delete">' + getI18nMsg('appItemDelete') + '</div>' + ((extension.isApp && self.installApps.indexOf(extension.id) == -1) ? '<div class="actButton addTo">' + getI18nMsg('appItemSave') + '</div>' : '') + '' + (((typeof extension.appLaunchUrl != "undefined" && extension.appLaunchUrl != "") || extension.type == "packaged_app") ? '<div class="actButton goTo">' + getI18nMsg('openWeb') + '</div>' : '') + '</div></div></div>');
            extensionItem.find(".extensionsStatus").unbind('click').bind('click', function () {
                if (!$(this).hasClass('enabled')) {
                    extensionItem.removeClass("unabled");
                    $(this).addClass('enabled');
                    $(this).html(getI18nMsg('appItemEnabled'));
                    var enabled = true
                } else {
                    extensionItem.removeClass("unabled").addClass("unabled");
                    $(this).removeClass('enabled');
                    $(this).html(getI18nMsg('appItemOpen'));
                    var enabled = false
                }
                chrome.management.setEnabled(extension.id, enabled, function () {
                })
            });
            extensionItem.find(".extensionsLogo").unbind('click').bind('click', function () {
                if (extension.type == "packaged_app") {
                    chrome.management.launchApp(extension.id)
                } else {
                    openTab(targetSwitch, extension.appLaunchUrl, tabID, ctrlKey)
                }
            });
            extensionItem.find(".actButton.goTo").unbind('click').bind('click', function () {
                if (extension.type == "packaged_app") {
                    chrome.management.launchApp(extension.id)
                } else {
                    openTab(targetSwitch, extension.appLaunchUrl, tabID, ctrlKey)
                }
            });
            extensionItem.find(".actButton.delete").unbind('click').bind('click', function () {
                if (confirm(getI18nMsg('appItemDelete_confirm'))) {
                    chrome.management.uninstall(extension.id, function () {
                        extensionItem.remove()
                    })
                }
            });
            extensionItem.find(".actButton.addTo").unbind('click').bind('click', function () {
                if (DBOX.getLastDialbox() == "cloud") {
                    var toIndex = DBOX.getDialboxIndex('normal', 'cloud');
                    PDI.appendDialbox('normal', toIndex, {title: extension.name, img: 'chrome://extension-icon/' + extension.id + '/128/0', url: extension.appLaunchUrl, desc: extension.description, isApp: extension.id, appType: extension.type, isNew: true})
                } else {
                    PDI.insertDialbox('normal', {title: extension.name, img: 'chrome://extension-icon/' + extension.id + '/128/0', url: extension.appLaunchUrl, desc: extension.description, isApp: extension.id, appType: extension.type, isNew: true})
                }
                self.installApps.push(extension.id);
                _isRefresh = "lastPage";
                $('#extensionsDialog').find('.close').get(0).click()
            });
            self.content.find('.extensionsBody').append(extensionItem)
        }};
        return extensions
    })()
})(jq);
var extensions = $.extensions();