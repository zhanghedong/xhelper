(function ($) {
    $.skins = function () {
        return new skins()
    };
    var skins = (function () {
        var skins = function () {
        };
        skins.prototype = {content: '', init: function () {
            var self = this;
            if (self.content != '') {
                return self.content
            }
            var template = $(this.template());
            if (PDI.getStyle('background', 'backgroundRepeat') == "repeat repeat") {
                template.find(".bgButton[layout='tensile']").addClass("selected")
            } else if (PDI.getStyle('background', 'backgroundSize') == "100% 100%") {
                template.find(".bgButton[layout='tile']").addClass("selected")
            } else if (PDI.getStyle('background', 'backgroundSize') == "100% auto") {
                template.find(".bgButton[layout='autowidth']").addClass("selected")
            } else if (PDI.getStyle('background', 'backgroundSize') == "auto 100%") {
                template.find(".bgButton[layout='autoheight']").addClass("selected")
            } else if (PDI.getStyle('background', 'backgroundPosition') != "") {
                template.find(".bgButton[layout='" + PDI.getStyle('background', 'backgroundPosition') + "']").addClass("selected")
            }
            template.find(".bgButton[layout]").bind("click", function () {
                if ($(".wallpaper").css('backgroundImage') == 'none') {
                    return false
                }
                var layout = $(this).attr('layout');
                template.find(".bgButton[layout]").removeClass("selected");
                $(this).addClass("selected");
                if (layout == "tile") {
                    PDI.setStyle('background', 'backgroundRepeat', 'repeat repeat');
                    PDI.setStyle('background', 'backgroundSize', '');
                    PDI.setStyle('background', 'backgroundPosition', '')
                } else if (layout == "autowidth") {
                    PDI.setStyle('background', 'backgroundRepeat', 'no-repeat');
                    PDI.setStyle('background', 'backgroundSize', '100% auto');
                    PDI.setStyle('background', 'backgroundPosition', '50% 50%')
                } else if (layout == "autoheight") {
                    PDI.setStyle('background', 'backgroundRepeat', 'no-repeat');
                    PDI.setStyle('background', 'backgroundSize', 'auto 100%');
                    PDI.setStyle('background', 'backgroundPosition', '50% 50%')
                } else if (layout == "tensile") {
                    PDI.setStyle('background', 'backgroundRepeat', 'no-repeat');
                    PDI.setStyle('background', 'backgroundSize', '100% 100%');
                    PDI.setStyle('background', 'backgroundPosition', '')
                } else {
                    PDI.setStyle('background', 'backgroundRepeat', 'no-repeat');
                    PDI.setStyle('background', 'backgroundSize', '');
                    PDI.setStyle('background', 'backgroundPosition', layout)
                }
                oauth.updateMsgId();
                oauth.synchronize();
                $(".wallpaper").css(PDI.getStyle('background'))
            });
            template.find(".bgColor").find("button").bind("click", function () {
                if (!$(this).hasClass('selected')) {
                    var tmp_color = $(this).attr('class').substr(1);
                    storage.remove('skins');
                    PDI.setSkin('skin_local', 'style', {"background": {"backgroundColor": '#' + tmp_color, "backgroundImage": ""}});
                    PDI.set('privateSetup', 'skin', 'skin_local');
                    oauth.updateMsgId();
                    oauth.synchronize();
                    $('.wallpaper').css(PDI.getSkin('skin_local', 'style').background)
                }
            });
            template.find('.bgImport').bind('click', function () {
                importFile.click();
                return false
            });
            template.find('.moreSettings').bind('click', function () {
                template.find('.moreSettingsContainer').toggle()
            });
            template.bind('click', function (e) {
                if (!isContainsClass(e.target, "moreSettingsContainer") && !isContainsClass(e.target, "moreSettings")) {
                    template.find('.moreSettingsContainer').hide()
                }
            });
            template.find("#importFile").bind('change', function () {
                var file = this.files[0];
                if (file.type != "" && !/image\/\w+/.test(file.type)) {
                    showNotice(getI18nMsg('filterImages'));
                    return false
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    if (file.size > 1048576) {
                        showNotice(getI18nMsg('localSkinsLarge'));
                        return false
                    }
                    var _skin = PDI.get('privateSetup', 'skin');
                    var _style = PDI.getSkin(_skin, 'style');
                    var tmp_color = (_style['background'] && _style['background']['backgroundColor'] && _style['background']['backgroundColor'] != "") ? _style['background']['backgroundColor'] : "";
                    storage.remove('skins');
                    PDI.setSkin('skin_local', 'style', {"background": {"backgroundColor": tmp_color, "backgroundImage": "url(" + this.result + ")"}});
                    PDI.set('privateSetup', 'skin', 'skin_local');
                    $('.wallpaper').css(PDI.getSkin('skin_local', 'style').background)
                };
                $(this).val('');
                this.files = null
            });
            self.content = template;
            return template
        }, template: function () {
            return'<div class="skinsContainer"><div class="skinsHeader dragArea"><div class="headerIcon"></div>' + getI18nMsg('skinsAppTitle') + '</div><div class="skinsBody"><div class="wallpaperCategorysContainer"><div class="cloudWallpaperCategorys"></div><div class="moreSettings">' + getI18nMsg('moreSettings') + '</div></div><div class="cloudWallpaperContainer"></div><div class="loading"><img src="img/skin_0/loading2.gif"></div></div><div class="moreSettingsContainer"><div class="arrowBorder"></div><div class="arrow"></div><div class="bgLayoutContainer"><div class="bgLayoutTitle">' + getI18nMsg('bgLayout') + '</div><div class="bgLayout"><div class="bgButton left" layout="left">' + getI18nMsg('bgLayoutLeft') + '</div><div class="bgButton center" layout="center">' + getI18nMsg('bgLayoutCenter') + '</div><div class="bgButton right" layout="right">' + getI18nMsg('bgLayoutRight') + '</div></div><div class="bgLayout"><div class="bgButton tile" layout="tile">' + getI18nMsg('bgLayoutTile') + '</div><div class="bgButton autowidth" layout="autowidth">' + getI18nMsg('bgLayoutAutoWidth') + '</div><div class="bgButton autoheight" layout="autoheight">' + getI18nMsg('bgLayoutAutoHeight') + '</div><div class="bgButton tensile" layout="tensile">' + getI18nMsg('bgLayoutTensile') + '</div></div></div><div class="bgColorContainer"><div class="bgColorTitle">' + getI18nMsg('bgColor') + '</div><div class="bgColor"><button class="CE7E7E7"></button><button class="Cf8b500"></button><button class="C008000"></button><button class="C418b89"></button><button class="Cd2b48c"></button><button class="C0866A4"></button><button class="CAAD930"></button><button class="C686868"></button><button class="C0F204E"></button><button class="CFFFFFF"></button></div></div><div class="bgImportContainer" ' + ((_browser.msie && _browser.msie <= 9) ? 'style="display: none;"' : '') + '><div class="bgImportTitle"></div><div class="bgImport">' + getI18nMsg('bgImportFile') + '</div><input type="file" name="importFile" id="importFile" style="visibility:hidden;width:0px;height:0px;" accept="image/*" /></div></div></div>'
        }};
        return skins
    })()
})(jq);
var skins = $.skins();