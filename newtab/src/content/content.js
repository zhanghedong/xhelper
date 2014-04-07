/**
 * Created by zhanghd on 2014/4/7 0:34
 * Copyright 2013 ND, Inc. All rights reserved.
 *
 *
 */
(function () {

    var port = chrome.runtime.connect();
    var helper = {}, process = {}, htmlLayout = {}, params = {};
    params = {
        timer: 0,
        countdown:10
    };
    helper = {
        getGUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    };
    htmlLayout = {
        favoritePanel: function (categories, colors) {
            var html = [], i, j, cls = 'czmin-active';
            html.push('<div id="czmin_favorite_panel_1396849815874" class="czmin_favorite_open">');
            html.push('     <a class="czmin-favorite-panel-close" href="#" data-action="close">close</a>');
            html.push(' <h4 class="czmin-favorite-panel-title">Add to your favorites</h4>');
            html.push(' <p class="czmin-favorite-input-wrap">');
            html.push('    <input type="text" placeholder="title" name="czmin_favorite_title" value="' + document.title + '" class="czmin-favorite-input czmin-ipt" />');
            html.push('     </p>');
            html.push(' <p class="czmin-favorite-input-wrap">');
            html.push('      <select class="czmin-ipt" name="czmin_favorite_cateogry">');
            for (i = 0 , j = categories.length; i < j; i++) {
                html.push(' <option value="' + categories[i].id + '">' + categories[i]['name'] + '</option>');
            }
            html.push('  </select>');
            html.push(' </p>');
            html.push('<p class="czmin-favorite-input-wrap czmin-color-select">');
            for (i = 0 , j = colors.length; i < j; i++) {
                html.push('    <span class="czmin-color ' + cls + '" data-action="select-color" data-value="' + colors[i] + '" style="background-color: ' + colors[i] + '"></span>');
                cls = '';
            }
            html.push('</p>');
            html.push(' <div class="czmin-option">');
            html.push('    <input type="button" class="czmin-button" value="save" data-action="submit" />');
//            html.push('    <span class="czmin-auto-save-tip">Automatically saved after <em>10</em> seconds</span>');
            html.push(' </div>');
            html.push(' </div>');
            return html.join('');
        }
    };
    process = {

        init: function () {
            process.onMessage();

        },
        buildPanel: function (categories, colors) {
            var panel = $('#czmin_favorite_panel_1396849815874');
            if (!panel.length) {
                var html = htmlLayout.favoritePanel(categories, colors);
                $('body').append(html);
                process.bind();
            } else {
                process.panelShow();
            }
        },
        onMessage: function () {
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
//                        sendResponse({farewell: "再见"});
                    if (request.action === 'addToFavorite') {
                        process.buildPanel(request.categories, request.colors);
//                        params.timer = setTimeout(function(){
//                            params.countdown--;
//
//                        },1000);
                    }
                });

        },
        submit: function () {
            var panel = $('#czmin_favorite_panel_1396849815874');
            var title = panel.find('input[name="czmin_favorite_title"]').val(),
                categoryId = panel.find('select[name="czmin_favorite_cateogry"]').val(),
                color = panel.find('.czmin-active').attr('data-value'),
                url = location.href;
            var obj = {
                "title": title,
                "url": url,
                "icon": "",//ICON TODO
                "parentId": categoryId,
                "id": helper.getGUID(),
                "guid": helper.getGUID(),
                "letter": title && title.length > 2 && title.substr(0, 2),
                "bgColor": color
            };
            chrome.runtime.sendMessage({action: 'insertFavorite', item: obj}, function (response) {
            });
            process.panelClose();
        },
        panelShow: function () {
            var panel = $('#czmin_favorite_panel_1396849815874');
            panel.show();
        },
        panelClose: function () {
            var panel = $('#czmin_favorite_panel_1396849815874');
            panel.hide();
        },
        bind: function () {
            var panel = $('#czmin_favorite_panel_1396849815874');
            panel.on('click', function (e) {
                var _this = $(e.target),
                    action = _this.attr('data-action');
                if (action) {
                    switch (action) {
                        case 'close':
                            process.panelClose();
                            break;
                        case 'submit':
                            process.submit();
                            break;
                        case 'select-color':
                            _this.addClass('czmin-active').siblings().removeClass('czmin-active');
                            break;
                        default:
                            break;
                    }
                    return false;
                }
            })
        }
    };
    process.init();
}());
