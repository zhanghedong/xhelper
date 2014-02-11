var _minClassificationHideFun = "";
(function ($) {
    $.classification = function () {
        return new classification()
    };
    var classification = (function () {
        var classification = function () {
        };
        classification.prototype = {content: '', num: 7, lineNum: 8, width: 110, height: 130, containerWidth: 0, containerHeight: 0, changeSwitch: true, minClassificationSwitch: false, minClassificationTargetObj: '', classifications: PDI.get("classifications"), defaultDialBoxes: {normal: [
            {"title": getI18nMsg('cloudAppTitle'), "img": "js/plugin/cloud/img/logo.png", "isApp": "cloud", "isFixed": true}
        ], quick: [
            {"title": getI18nMsg('classificationAppTitle'), "img": "js/plugin/classification/img/logo.png", "isApp": "classification", "isFixed": true},
            {"title": getI18nMsg('skinsAppTitle'), "img": "js/plugin/skins/img/logo.png", "isApp": "skins"},
            {"title": getI18nMsg('setupAppTitle'), "img": "js/plugin/setup/img/logo.png", "isApp": "setup", "isFixed": true}
        ]}, init: function (force) {
            var self = this;
            if (force == true) {
                self.content = ""
            }
            if (self.content != '') {
                return self.content
            }
            self.content = $(this.template());
            self.measurement();
            self.content.unbind("click").bind('click', function (e) {
                if (!isContainsClass(e.target, "classification")) {
                    if (self.isClear()) {
                        self.content.parent().parent().find(".close").get(0).click();
                        app.loadAppContent($('.appBox[appId=classification]'), 'classification')
                    }
                }
            });
            self.content.bind('contextmenu', function (e) {
                if (self.isClear()) {
                    if (self.content.find(".classificationList").hasClass("edit")) {
                        self.content.find(".classificationList").removeClass("edit");
                        self.content.find(".classificationNotice").text(getI18nMsg("classificationNotice"));
                        var _classificationList = self.content.find(".classification");
                        for (var i = 0; i < _classificationList.length; i++) {
                            $(_classificationList[i]).attr("title", $(_classificationList[i]).attr("selectTitle"))
                        }
                    } else {
                        self.content.find(".classificationList").addClass("edit");
                        self.content.find(".classificationNotice").text(getI18nMsg("classificationEditNotice"));
                        var _classificationList = self.content.find(".classification");
                        for (var i = 0; i < _classificationList.length; i++) {
                            $(_classificationList[i]).attr("title", $(_classificationList[i]).attr("editTitle"))
                        }
                    }
                }
                return false
            });
            $(document).unbind("keyup.classificationSwitch").bind("keyup.classificationSwitch", function (e) {
                if ($("#classificationDialog").hasClass("dialog-visible") && !self.content.find(".classificationList").hasClass("edit")) {
                    if (e.keyCode == 192 || (e.keyCode >= 49 && e.keyCode < 56)) {
                        var index = 0;
                        if (e.keyCode != 192) {
                            index = e.keyCode - 48
                        }
                        var classificationObj = $(self.content.find(".classification").get(index));
                        if (classificationObj.length > 0 && classificationObj.attr("cId") != "add") {
                            self.change(classificationObj);
                            setTimeout(function () {
                                self.content.parent().parent().find(".close").get(0).click();
                                app.loadAppContent($('.appBox[appId=classification]'), 'classification')
                            }, 400)
                        }
                    }
                }
            });
            var classificationList = self.content.find(".classification");
            for (var p = 0; p < classificationList.length; p++) {
                self.initClassification($(classificationList[p]))
            }
            return self.content
        }, initClassificationApp: function (targetObj) {
            var self = this;
            self.minClassificationTargetObj = targetObj;
            $.each(PDI.get("classifications"), function (i, n) {
                if (n.id == PDI.get("setup", "cId")) {
                    if (targetObj.hasClass('quick')) {
                        if (n.logo.indexOf(urlImg) == 0 && n.logo.indexOf('/m/') > -1) {
                            n.logo = n.logo.replace('/m/', '/s/')
                        }
                    } else {
                        if (n.logo.indexOf(urlImg) == 0 && n.logo.indexOf('/s/') > -1) {
                            n.logo = n.logo.replace('/s/', '/m/')
                        }
                    }
                    targetObj.find(".boxLogo").css("backgroundImage", "url(" + n.logo + ")");
                    targetObj.find(".boxTitle a").text(n.title);
                    return
                }
            });
            $(".minClassificationContainer").remove();
            var minClassificationList = $('<div class="minClassificationContainer"><div class="minClassificationArrow"></div><div class="minClassification' + (cId == "" ? " selected" : "") + '" cId=""><img title="' + getI18nMsg('classificationMain') + '" src="js/plugin/classification/img/skin_0/main.png" border="0">' + (cId == "" ? '<div class="selected"></div>' : '') + '</div></div>');
            if (self.classifications.length > 0) {
                $.each(self.classifications, function (i, n) {
                    minClassificationList.append('<div class="minClassification' + (n.id == cId ? " selected" : "") + '" cId="' + n.id + '"><img title="' + n.title + '" src="' + n.logo + '" border="0">' + (n.id == cId ? '<div class="selected"></div>' : '') + '</div>')
                })
            }
            minClassificationList.find(".minClassification").css({"width": (DBOX.QWidth - 26) + "px", "height": (DBOX.QHeight - 26) + "px"});
            minClassificationList.find(".minClassificationArrow").css({"left": parseInt(((self.classifications.length + 1) * (DBOX.QWidth - 26) + (self.classifications.length + 2) * 10) / 2 - 8) + "px"});
            minClassificationList.css({"bottom": (DBOX.QHeight + 15) + "px"});
            minClassificationList.find(".minClassification").unbind("click").bind("click", function () {
                if (!$(this).hasClass('selected')) {
                    self.hideMinClassification(true);
                    self.change($(this).attr("cId"))
                }
            });
            $("body").append(minClassificationList);
            self.minClassificationTargetObj.unbind("mouseover").bind("mouseover",function (e) {
                if (self.minClassificationTargetObj.hasClass("quick") && !isMouseMoveContains(e, this)) {
                    self.showMinClassification()
                }
            }).unbind("mouseout").bind("mouseout", function (e) {
                if (self.minClassificationTargetObj.hasClass("quick") && !isMouseMoveContains(e, this)) {
                    self.hideMinClassification()
                }
            });
            $('.minClassificationContainer').unbind("mouseover").bind("mouseover",function (e) {
                if (!isMouseMoveContains(e, this)) {
                    clearTimeout(_minClassificationHideFun)
                }
            }).unbind("mouseout").bind("mouseout", function (e) {
                if (!isMouseMoveContains(e, this)) {
                    self.hideMinClassification()
                }
            })
        }, showMinClassification: function () {
            var self = this;
            if (!_move && !_edit && $('.dialog-visible').length == 0) {
                clearTimeout(_minClassificationHideFun);
                self.minClassificationTargetObj.find('.boxTitle').addClass("transparent");
                var _offset = self.minClassificationTargetObj.offset();
                var _left = _offset.left;
                $('.minClassificationContainer').css({"left": Math.round(_left + ((DBOX.QWidth + DBOX.QSpacing - ((self.classifications.length + 1) * (DBOX.QWidth - 26) + (self.classifications.length + 2) * 10)) / 2)) + "px"});
                $('.minClassificationContainer').show();
                self.minClassificationSwitch = true
            }
        }, hideMinClassification: function (force) {
            var self = this;
            if (force == true) {
                $('.minClassificationContainer').hide();
                self.minClassificationTargetObj.find('.boxTitle').removeClass("transparent");
                self.minClassificationSwitch = false
            } else {
                _minClassificationHideFun = setTimeout(function () {
                    $('.minClassificationContainer').hide();
                    self.minClassificationTargetObj.find('.boxTitle').removeClass("transparent");
                    self.minClassificationSwitch = false
                }, 150)
            }
        }, measurement: function () {
            var self = this;
            if (self.classifications.length >= self.num) {
                self.containerWidth = (self.classifications.length + 1) * self.width
            } else {
                self.containerWidth = (self.classifications.length + 2) * self.width
            }
            self.containerHeight = self.height;
            self.content.find(".classificationList").css({"width": self.containerWidth + "px", "marginLeft": "-" + parseInt(self.containerWidth / 2) + "px", "height": self.containerHeight + "px", "marginTop": "-" + parseInt(self.containerHeight / 2) + "px"})
        }, initClassification: function (classificationObj) {
            var self = this;
            classificationObj.attr("title", classificationObj.attr("selectTitle"));
            classificationObj.unbind('click').bind('click', function (e) {
                if (classificationObj.attr("cId") == "add") {
                    if (self.classifications.length >= self.num) {
                        showNotice(getI18nMsg("classificationLimit").replace('%s', self.num));
                        return false
                    }
                    if (self.isClear(2)) {
                        var newClassification = {"id": new Date().getTime(), "title": getI18nMsg("classificationNew"), "logo": urlImg + "classification/images/" + Math.floor(Math.random() * 8) + ".png"};
                        storage.relative = false;
                        self.classifications.push(newClassification);
                        PDI.set("classifications", "", self.classifications);
                        PDI.set("dialBoxes_" + newClassification.id, "", self.defaultDialBoxes);
                        PDI.set("privateSetup_" + newClassification.id, "", PDI.get("privateSetup"));
                        PDI.set("privateSetup_" + newClassification.id, "dialBoxCloudBoxSwitch", true);
                        PDI.set("skins_" + newClassification.id, "", PDI.get("skins"));
                        storage.relative = true;
                        oauth.updateMsgId();
                        oauth.synchronize();
                        self.measurement();
                        var newClassificationHtml = $('<div class="classification" cId="' + newClassification.id + '" selectTitle="' + getI18nMsg('classificationSelect').replace('%s', newClassification.title) + '" editTitle="' + getI18nMsg('classificationEdit') + '"><img class="classificationLogo" src="' + newClassification.logo + '" border="0"><span class="classificationTitle">' + newClassification.title + '</span><div class="classificationMark">' + (self.classifications.length) + '</div><div class="classificationDel" title="' + getI18nMsg('classificationDel') + '"></div></div>');
                        if (self.classifications.length >= self.num) {
                            $(this).addClass("hide")
                        }
                        newClassificationHtml.insertBefore($(this));
                        self.initClassification(newClassificationHtml);
                        self.change(newClassificationHtml);
                        self.content.find(".classificationList").addClass("edit")
                    }
                } else {
                    if (self.content.find(".classificationList").hasClass("edit")) {
                        var _index = self.content.find(".classification").indexOf(classificationObj.get(0)) - 1;
                        var _cId = classificationObj.attr("cId");
                        if (_index >= 0 && _cId != "") {
                            if (isContainsClass(e.target, "classificationDel")) {
                                if (self.isClear(2)) {
                                    if (confirm(getI18nMsg("classificationDelete_confirm"))) {
                                        storage.relative = false;
                                        $.each(storage.privateKeys, function (i, n) {
                                            storage.remove(n + "_" + _cId)
                                        });
                                        storage.relative = true;
                                        self.classifications.splice(_index, 1);
                                        PDI.set("classifications", "", self.classifications);
                                        oauth.updateMsgId();
                                        oauth.synchronize();
                                        setTimeout(function () {
                                            classificationObj.remove();
                                            if (self.classifications.length < self.num) {
                                                self.content.find(".classification[cId=add]").removeClass("hide")
                                            }
                                            self.measurement();
                                            var _classificationList = self.content.find(".classification");
                                            for (var i = 1; i < _classificationList.length; i++) {
                                                if ($(_classificationList[i]).attr("cId") != "" && $(_classificationList[i]).attr("cId") != "add") {
                                                    $(_classificationList[i]).find('.classificationMark').text(i)
                                                }
                                            }
                                            if (_cId == cId) {
                                                self.change($(self.content.find('.classification').get(0)))
                                            }
                                        }, 100)
                                    }
                                }
                            } else if (isContainsClass(e.target, "classificationLogo")) {
                                if (self.isClear(2)) {
                                    self.content.find(".classificationLogoList").css({"left": classificationObj.get(0).offsetLeft + self.content.find(".classificationList").get(0).offsetLeft - 22 - 300 + parseInt(self.width / 2) + "px", "top": classificationObj.get(0).offsetTop + self.content.find(".classificationList").get(0).offsetTop + 10 - 120 + "px"});
                                    var logoNo = 0;
                                    var classificationLogoItemList = self.content.find(".classificationLogoItem");
                                    for (var i = 0; i < classificationLogoItemList.length; i++) {
                                        if (classificationObj.find(".classificationLogo").attr("src") == urlImg + "classification/images/" + logoNo + ".png") {
                                            logoNo++
                                        }
                                        $(classificationLogoItemList[i]).css("backgroundImage", "url(" + urlImg + "classification/images/" + logoNo + ".png)");
                                        logoNo++;
                                        $(classificationLogoItemList[i]).unbind('click').bind('click', function () {
                                            var selectedLogoUrl = $(this).css('backgroundImage').replace("url(", "").replace(")", "").replace(/\"/g, "");
                                            classificationObj.find('.classificationLogo').attr("src", selectedLogoUrl);
                                            self.classifications[_index]['logo'] = selectedLogoUrl;
                                            PDI.set("classifications", "", self.classifications);
                                            oauth.updateMsgId();
                                            oauth.synchronize()
                                        })
                                    }
                                    classificationObj.siblings(".classification").addClass("mask");
                                    self.content.find(".classificationLogoList").addClass('show')
                                }
                            } else if (isContainsClass(e.target, "classificationTitle")) {
                                if (self.isClear(2)) {
                                    classificationObj.find(".classificationTitle").hide();
                                    $('<input class="classificationTitleEdit" value="' + classificationObj.find(".classificationTitle").text() + '" maxlength="8" />').unbind("blur").bind("blur",function () {
                                        if ($(this).siblings(".classificationTitle").text() != $(this).val()) {
                                            $(this).siblings(".classificationTitle").text($(this).val());
                                            self.classifications[_index]['title'] = $(this).val();
                                            PDI.set("classifications", "", self.classifications);
                                            oauth.updateMsgId();
                                            oauth.synchronize()
                                        }
                                    }).unbind("keyup").bind("keyup",function (e) {
                                        if (e.keyCode == 13) {
                                            this.blur();
                                            self.isClear(2)
                                        }
                                    }).insertAfter($(this).find(".classificationTitle"));
                                    classificationObj.siblings(".classification").addClass("mask");
                                    classificationObj.find(".classificationTitleEdit").get(0).setSelectionRange(8, 8)
                                }
                            }
                        }
                    } else {
                        self.change(classificationObj);
                        setTimeout(function () {
                            self.content.parent().parent().find(".close").get(0).click();
                            app.loadAppContent($('.appBox[appId=classification]'), 'classification')
                        }, 400)
                    }
                }
            })
        }, change: function (classificationObj) {
            var self = this;
            var _cId = typeof classificationObj == "string" ? classificationObj : classificationObj.attr("cId");
            if (self.changeSwitch && _cId != cId) {
                self.changeSwitch = false;
                if (typeof classificationObj != "string") {
                    self.content.find(".classificationTitle").removeClass("selected");
                    classificationObj.find(".classificationTitle").addClass("selected")
                }
                var cIndex = false;
                $.each(self.classifications, function (i, n) {
                    if (n.id == _cId) {
                        cIndex = i;
                        return
                    }
                });
                if (_cId != "" && cIndex === false) {
                    self.changeSwitch = true;
                    showNotice(getI18nMsg('classificationNotExist'))
                } else {
                    if (cIndex !== false && typeof self.classifications[cIndex].dataUrl != "undefined" && self.classifications[cIndex].dataUrl != "" && typeof self.classifications[cIndex].LTime != "undefined" && self.classifications[cIndex].LTime == 0) {
                        $.getJSON(self.classifications[cIndex].dataUrl + "&t=" + new Date().getTime(), function (result) {
                            var urlImgList = ['http://hao.weidunewtab.com/', 'http://hao.newtabplus.com/', 'http://www.94994.com/', 'http://en.94994.com/'];
                            var loadDatakey = ['privateSetup', 'dialBoxes', 'weather', 'skins'];
                            if (result && typeof result == 'object') {
                                cId = _cId;
                                PDI.set("setup", "cId", cId);
                                storage.relative = false;
                                storage.clear(['privateSetup_' + cId, 'dialBoxes_' + cId, 'weather_' + cId, 'skins_' + cId]);
                                $.each(result, function (k, v) {
                                    if (loadDatakey.indexOf(k) > -1) {
                                        PDI.set(k + "_" + cId, '', v)
                                    }
                                });
                                if (typeof result["rssOptions"] != "undefined") {
                                    if (typeof result["rssOptions"]['dialBoxStyle'] != "undefined" && result["rssOptions"]['dialBoxStyle'] == "square") {
                                        var _screenDialboxOption = screenDialboxOptions['default'];
                                        if (typeof screenDialboxOptions[screenWidth + "*" + screenHeight] != 'undefined') {
                                            var _screenDialboxOption = screenDialboxOptions[screenWidth + "*" + screenHeight]
                                        }
                                        PDI.set("privateSetup_" + cId, 'dialBoxWidth', _screenDialboxOption["height"]);
                                        PDI.set("privateSetup_" + cId, 'dialBoxHeight', _screenDialboxOption["height"])
                                    }
                                }
                                storage.relative = true;
                                self.classifications[cIndex]['LTime'] = new Date().getTime();
                                PDI.set("classifications", "", self.classifications);
                                self.changeBody(cId)
                            } else {
                                self.changeSwitch = true;
                                showNotice(getI18nMsg('classificationGetDataError'))
                            }
                        })
                    } else {
                        cId = _cId;
                        PDI.set("setup", "cId", cId);
                        self.changeBody(cId)
                    }
                }
            }
        }, changeBody: function (cId) {
            var self = this;
            $(".body").addClass("farAway");
            setTimeout(function () {
                storage = new $.storage(cId);
                targetSwitch = PDI.get('privateSetup', 'targetSwitch');
                $('#baseTarget').attr('target', targetSwitch ? "_self" : "_blank");
                $('#searchForm').attr('target', targetSwitch ? "_self" : "_blank");
                DBOX.container = $('.normalDialbox');
                DBOX.QContainer = $('.quickDialbox');
                DBOX.QBContainer = $('.QBannerContainer');
                DBOX.num = PDI.get('privateSetup', 'dialBoxNum');
                DBOX.page = 1;
                DBOX.opacity = PDI.get('privateSetup', 'dialBoxOpacity');
                DBOX.spacing = PDI.get('privateSetup', 'dialBoxSpacing');
                DBOX.titleShow = PDI.get('privateSetup', 'dialBoxTitleSwitch');
                DBOX.cloudBoxShow = PDI.get('privateSetup', 'dialBoxCloudBoxSwitch');
                DBOX.pageSwitcherShow = PDI.get('privateSetup', 'dialBoxPageSwitcher');
                DBOX.page3DSwitcherOpen = support3D() ? PDI.get('privateSetup', 'dialBoxPage3DSwitcher') : false;
                DBOX.dialBoxQuickHide = PDI.get('privateSetup', 'dialBoxQuickSwitcher');
                DBOX.width = PDI.get('privateSetup', 'dialBoxWidth');
                DBOX.height = PDI.get('privateSetup', 'dialBoxHeight');
                DBOX.radius = PDI.get('privateSetup', 'dialBoxRadius');
                DBOX.maxTop = PDI.get('privateSetup', 'dialBoxMaxTop');
                DBOX.QBContainerWidth = PDI.get('privateSetup', 'dialBoxQBCWidth');
                DBOX.init();
                DBOX.pageNotice();
                _classificationOpen = false;
                var skin = PDI.get('privateSetup', 'skin');
                if (skin != "" && PDI.getSkin(skin, 'style') != '') {
                    $('.wallpaper').css(PDI.getSkin(skin, 'style').background);
                    $(".wallpaper").css(PDI.getStyle('background'))
                }
            }, 150);
            setTimeout(function () {
                $(".body").removeClass("farAway");
                self.changeSwitch = true
            }, 610);
            oauth.updateMsgId();
            oauth.synchronize()
        }, isClear: function (level, force) {
            var self = this;
            level = typeof level == "undefined" ? 3 : level;
            force = typeof force == "undefined" ? false : true;
            if (level >= 1) {
                if (self.content.find(".classificationLogoList").hasClass("show")) {
                    self.content.find(".classification").removeClass("mask");
                    self.content.find(".classificationLogoList").removeClass('show');
                    if (!force) {
                        return false
                    }
                }
            }
            if (level >= 2) {
                if (self.content.find(".classificationTitleEdit").length > 0) {
                    self.content.find(".classification").removeClass("mask");
                    setTimeout(function () {
                        self.content.find(".classificationTitleEdit").remove();
                        self.content.find(".classificationTitle").show()
                    }, 100);
                    if (!force) {
                        return false
                    }
                }
            }
            if (level >= 3) {
                if (self.content.find(".classificationList").hasClass("edit")) {
                    self.content.find(".classificationList").removeClass("edit");
                    self.content.find(".classificationNotice").text(getI18nMsg("classificationNotice"));
                    var _classificationList = self.content.find(".classification");
                    for (var i = 0; i < _classificationList.length; i++) {
                        $(_classificationList[i]).attr("title", $(_classificationList[i]).attr("selectTitle"))
                    }
                    if (!force) {
                        return false
                    }
                }
            }
            return true
        }, template: function () {
            var self = this;
            var classificationListHtml = '<div class="classification" cId="" selectTitle="' + getI18nMsg('classificationSelect').replace('%s', getI18nMsg('classificationMain')) + '" editTitle=""><img class="classificationLogo" src="js/plugin/classification/img/skin_0/main.png" border="0"><span class="classificationTitle' + (cId == "" ? " selected" : "") + '">' + getI18nMsg('classificationMain') + '</span><div class="classificationMark">~</div></div>';
            if (self.classifications.length > 0) {
                $.each(self.classifications, function (i, n) {
                    classificationListHtml += '<div class="classification" cId="' + n.id + '" selectTitle="' + getI18nMsg('classificationSelect').replace('%s', n.title) + '" editTitle="' + getI18nMsg('classificationEdit') + '"><img class="classificationLogo" src="' + n.logo + '" border="0"><span class="classificationTitle' + (cId == n.id ? " selected" : "") + '">' + n.title + '</span><div class="classificationMark">' + (i + 1) + '</div><div class="classificationDel" title="' + getI18nMsg('classificationDel') + '"></div></div>'
                })
            }
            classificationListHtml += '<div class="classification' + (self.classifications.length >= self.num ? " hide" : "") + '" cId="add" selectTitle="' + getI18nMsg('classificationAdd') + '" editTitle=""><img class="classificationLogo" src="js/plugin/classification/img/skin_0/add.png" border="0"><span class="classificationTitle' + (cId == "add" ? " selected" : "") + '">' + getI18nMsg('classificationAdd') + '</span></div>';
            return'<div class="classificationContainer"><div class="classificationNotice">' + getI18nMsg("classificationNotice") + '</div><div class="classificationList">' + classificationListHtml + '</div><div class="classificationLogoList"><div class="classificationLogoListArrow"></div><div class="classificationLogoItem"></div><div class="classificationLogoItem"></div><div class="classificationLogoItem"></div><div class="classificationLogoItem"></div><div class="classificationLogoItem"></div><div class="classificationLogoItem"></div><div class="classificationLogoItem"></div><div class="classificationLogoItem"></div><div class="title">' + getI18nMsg("classificationLogoEdit") + '</div></div></div>'
        }};
        return classification
    })()
})(jq);
var classification = $.classification();