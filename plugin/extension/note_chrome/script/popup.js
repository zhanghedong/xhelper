(function ($) {
    "use strict";

    var g = {};
    g.params = {
        sid:''
    };
    g.node = {
        closeBtn:$('#close_btn'),
        cleanBtn:$('#clean_btn'),
        loginOut:$('#login_out'),
        userStatus:$('#user_status'),
        inspector:$('#mouse_select'),
        sidebar:$('#sidebar'),
        content:$('#content'),
        title:$('#title_panel'),
        subDir:$('#subdir_panel'),
        detail:$('#detail_panel'),
        loginPanel:$('#login_panel'),
        labelUserName:$('#label_user_name'),
        labelPassword:$('#label_password'),
        iptUserName:$('#ipt_user_name'),
        iptPassword:$('#ipt_password'),
        btnLogin:$('#btn_login'),
        loginNotice:$('#login_notice'),
        save:$('#save'),
        doc:$(document),
        body:$(document.body)
    };
    g.helper = {
        mouseSelectTip:function (str) {
            if (!noteConfig.getLocalStorage('mouseSelectTip')) {
                if (!g.node.tip) {
                    var html = '<div class="mouse-tip">' + str + '<a class="close" href="#">×</a></div>';
                    g.node.tip = $(html).appendTo(document.body);
                    g.node.tip.show();
                    noteConfig.setLocalStorage('mouseSelectTip', true);
                    g.node.tip.find('.close').click(function () {
                        g.node.tip.remove();
                    })
                }
                setTimeout(function () {
                    if (g.node.tip) {
                        g.node.tip.remove();
                    }
                }, 5000)
            }
        }
    };
    var process = {

        init:function () {
            g.node.body.find('#loading').show();
            process.addEvents();
            process.initExtensionRequest();
            process.autoContentHeight();
            /*//屏蔽鼠标选取功能
             var flag = noteConfig.getInspectorSwitch();
             if(flag == 'true'){
             g.node.inspector.addClass('active');
             parent.postMessage({name:'actionfrompopupinspecotr'}, '*');
             }
             */
        },
        autoContentHeight:function () {
            var winHeight = $(window).height();
            var titleHeight = g.node.title.outerHeight();
            var subDirHeight = g.node.subDir.outerHeight();
            var detailHeight = winHeight - titleHeight - subDirHeight;
            g.node.detail.css('height', detailHeight);
        },
        addEvents:function () {
            g.node.title.bind('keyup', function () {
                process.autoContentHeight();
            });
            g.node.closeBtn.bind('click', function (e) {
                parent.postMessage({name:'closefromnotepopup'}, '*');
                return false;
            });
            g.node.cleanBtn.bind('click', function (e) {
//                g.node.title.html('');
                g.node.detail.html('');
                parent.postMessage({name:'actionfrompopupclearinspecotr'}, '*');
                return false;
            });
            g.node.userStatus.bind('click', function (e) {
                if (!noteConfig.getSid()) {
                    chrome.extension.sendRequest({name:'openloginwin'});
                } else {
                    noteConfig.setSid('');
                    noteConfig.setUserName('');
                    noteConfig.setTicket('');
                    noteConfig.setBlowFish('');
                    location.href = "http://note.91.com/Logout.aspx";
                    parent.postMessage({name:'closefromnotepopup'}, '*');
                }
                return false;
            });
            g.node.inspector.bind('click', function (e) {
                g.node.tip && g.node.tip.remove();
                $(this).toggleClass('active');
//                    noteConfig.setInspectorSwitch('false');
                if ($(this).hasClass('active')) {
                    parent.postMessage({name:'actionfrompopupinspecotr'}, '*');
                } else {
                    parent.postMessage({name:'actionfrompopupremoveinspecotr'}, '*');
                }
                return false;
            });
            g.node.save.bind('click', function (e) {
                g.node.body.find('#mask').show();
                g.node.detail.find('div[note91clip=true]').removeAttr('id').removeAttr('note91clip');
                var title = g.node.title.text();
                var contentClone = g.node.detail.clone();
                var belongTo = g.node.subDir.find('select').val();
                var noteData = {
                    title:title,
                    content:contentClone.html(),
                    belong_to:belongTo,
                    tags:''
                };
                parent.postMessage({name:'actionfrompopupsavenote', noteData:noteData}, '*');
                return false;
            });
            window.onload = function () {
//                process.loginInit();
//                parent.postMessage({name:'checkloginfromnotepopup'}, '*');
                chrome.extension.sendRequest({name:'checkloginfromnotepopup'});
                return false;
            }
        },
        loginInit:function () {
            g.node.sidebar.find('.is-login').show();
            g.node.content.show();
            process.getSubDir(function (data) {//读取分类列表
                process.subDirLayout(data);
                parent.postMessage({name:'getpagecontentfromnotepopup'}, '*');
            });
            if (noteConfig.getLocalStorage('note91sid')) {
                g.node.userStatus.removeClass('no-login');
                var title = noteConfig.getLocalStorage('nickName') ? ' " ' + noteConfig.getLocalStorage('nickName') + ' " ' : '';
                g.node.save.attr('title', '保存笔记到' + title);
                g.node.userStatus.attr('title', '点击退出 ' + title);
            } else {
                g.node.userStatus.addClass('no-login');
                g.node.userStatus.attr('title', '点击登录');
            }
        },
        subDirLayout:function (items) {
            var html = '<span>分类：</span><select id="subdir">';
            html += '<option value="00000000-0000-0000-0000-000000000000">未分类</option>';
            if (items && items.length) {
                var lastBelongTo = noteConfig.getBelongTo();
                console.log(lastBelongTo);
                for (var i = 0, j = items.length; i < j; i++) {
                    html += '<option value="' + items[i]['id'] + '"';
                    if (items[i]['id'] == lastBelongTo) {
                        html += ' selected="selected" ';
                    }
                    html += '>';
                    html += items[i]['name'];
                    html += '</option>';
                }
            }
            html += '</select>';
            html += '<a href="http://note.91.com" target="_blank" class="manager-subdir">管理分类</a>';
            if (noteConfig.getLocalStorage('nickName')) {
                html += '<p class="welcome"><span>欢迎：</span><a href="http://note.91.com/NoteMain/Index.aspx" target="_blank">' + noteConfig.getLocalStorage('nickName') + '</a></p>';
            }
            g.node.subDir.html(html);
        },
        loginLayout:function (callback) {
            g.node.labelUserName.text(chrome.i18n.getMessage("label_user_name"));
            g.node.labelPassword.text(chrome.i18n.getMessage("label_password"));
            g.node.btnLogin.val(chrome.i18n.getMessage("btn_login_label"));
            g.node.sidebar.find('.is-login').hide();
            g.node.content.hide();
            g.node.loginPanel.show();
            g.node.btnLogin.bind('click', function () {
                process.login();
            });
            g.node.iptUserName.bind('keydown', function () {
                g.node.loginNotice.html('');
            });
            g.node.iptPassword.bind('keydown', function () {
                g.node.loginNotice.html('');
            });
            g.node.iptPassword.bind('keyup', function (e) {
                if (e.keyCode == 13) {
                    process.login();
                }
            });
        },
        getSubDir:function (successCallback, failCallback) {
            if (!noteConfig.getSid()) {
                var data = noteConfig.getLocalStorage('note91chromesubdir') || [];
                successCallback(data);
            } else {
                $.ajax({ //由于登录方式修改,改到登录后再取
                    url:noteConfig.url.getSubDir + '?1=1' + noteConfig.getVerifierQueryStr(),
                    type:"POST",
                    success:function (data) {
                        if (data.code != 200) {
                            if (failCallback) {
                                failCallback(true);
                            }
                            return;
                        }
                        if (successCallback) {
                            successCallback(data.items);
                        }
                    },
                    error:function (jqXHR, textStatus, errorThrown) {
                        var data = noteConfig.getLocalStorage('note91chromesubdir') || [];
                        successCallback(data);
                    }
                });
            }
        },
        login:function () {
            var userName = $.trim(g.node.iptUserName.val());
            var password = $.trim(g.node.iptPassword.val());
            var blowFish = noteConfig.getBlowFish();//获取blowFish用与票据登录使用
            if (userName == '') {
                g.node.loginNotice.html(chrome.i18n.getMessage("notice_user_name"));
                return false;
            }
            if (password == '') {
                g.node.loginNotice.html(chrome.i18n.getMessage("notice_password"));
                return false;
            }
            var dataObj = {
                username:userName,
                password:password,
                blowfish:blowFish
            };
            $.ajax({
                headers:{
                    'X-Requested-With':'XMLHttpRequest'
                },
                type:'POST',
                url:noteConfig.url.login,
                data:JSON.stringify(dataObj),
                dataType:'json',
                success:function (data) {
                    if (data.code == 200) {
                        noteConfig.setUserName(userName);
                        noteConfig.setSid(data.sid);
                        noteConfig.setTicket(data.ticket);
                        noteConfig.setBlowFish(blowFish);
                        g.node.loginPanel.hide();
                        g.node.sidebar.find('.is-login').show();
                        g.node.content.show();
                        g.node.btnLogin.unbind('click');
                        g.node.iptUserName.unbind('keydown');
                        g.node.iptPassword.unbind('keydown');
                        g.node.iptPassword.unbind('keyup');
                        process.getSubDir(function (data) {//读取分类列表
                            process.subDirLayout(data);
                        });
                        parent.postMessage({name:'getpagecontentfromnotepopup'}, '*');
                        parent.postMessage({name:'signinhandlerfrompopup'}, '*');
                    } else {
                        g.node.loginNotice.html(data.msg);
                    }
                },
                error:function (jqXHR, textStatus, errorThrown) {

                }
            });
        },
        setPopupContent:function (data) {
            if (data.isAppend) {
                g.node.detail.append($('<div note91clip="true" id="' + data.uid + '"></div>').append(data.content));
                if (data.title) {
                    g.node.title.html(data.title);
                }
            } else {
                if (data.title) {
                    g.node.title.html(data.title);
                }
                if (data.uid) {
                    $('#' + data.uid).remove();
                } else {
                    if (data.content == '') {
                        g.helper.mouseSelectTip(chrome.i18n.getMessage('mouse_select_tip'));
                    }
                    g.node.detail.html(data.content);
                }
            }
            process.autoContentHeight();
            g.node.body.find('#loading') && g.node.body.find('#loading').hide();
        },
        removeMask:function () {
            g.node.body.find('#mask').hide();
        },
        initExtensionRequest:function () {
            chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
                if (!sender || sender.id !== chrome.i18n.getMessage("@@extension_id")) {
                    return;
                }
                switch (request.name) {
                    case 'actionsetpopupcontent':
                        process.setPopupContent(request.data);
                        break;
                    case 'resizedetailpanel':
                        process.autoContentHeight();
                        break;
                    case 'openloginwin':
                        process.loginLayout(request.callback);
                        break;
                    case 'removemask':
                        process.removeMask();
                        break;
                    case 'checkloginedreturn':
                        process.loginInit();
                        break;
                    default:
                        break;
                }
            })
        }
    };
    process.init();
})
    (jQuery);