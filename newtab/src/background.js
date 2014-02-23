//chrome.app.runtime.onLaunched.addListener(function (launchData) {
//});
var backgroundProcess = {};
(function () {
    var process, helper, localData, g = {};

    g.params = {
        rootMenuId: "6375ac11-3e03-49a0-b6ae-9564d10e7ee3"
    };
    g.config = {
        defaultColor: ['#2F09FF', '#E82C2A', '#FFC53B', '#56E82A', '#00C0FF']
    };
    localData = {
        getData: function (callback) {
            chrome.storage.local.get(function (data) {
                callback(data);
            });
        },
        getNtpSite: function (callback) {
            chrome.storage.local.get(function (data) {
                callback(data);
            });
        },
        setNtpSite: function (data, callback) {
            chrome.storage.local.set({'ntp_sites': data}, function (data) {
            });
        },
        getWaitBuy: function (callback) {

        },
        setWaitBuy: function (data, callback) {

        },
        setBlog: function (data, callback) {
            chrome.storage.local.set({'ntp_blog': data}, function (data) {
            });
        }
    };
    helper = {
        timestamp:function(){
            return (new Date()).valueOf();
        },
        getRandColor: function () {
            var idx = Math.floor(Math.random() * 5);
            return g.config.defaultColor[idx];
        },
        notification: function (option) {
            if (option) {
                var havePermission = window.webkitNotifications.checkPermission();
                if (havePermission === 0) {
                    var notification = window.webkitNotifications.createNotification(
                        'http://i.stack.imgur.com/dmHl0.png',
                        option.title,
                        option.desc
                    );
                    notification.onclick = function () {
                        notification.close();
                    };
                    notification.show();
                    setTimeout(function () {
                        notification.cancel();
                    }, 5000);
                } else {
                    window.webkitNotifications.requestPermission();
                }
//                var tt = {
//                    type : "basic",
//                    title: "Basic Notification",
//                    message: "Short message part",
//                    expandedMessage: "Longer part of the message"
//                };
//                chrome.notifications.create("id11233", tt, function(){
//                    console.log('success');
//                });
//                var xx = chrome.notifications.create('abcd', option, function () {
//                    console.log('xxxxx');
//                });
//                console.log(xx);
            }
        }
    };
    process = {
        onClick: function (info, data) {
            if (data.url.indexOf('chrome://newtab') === -1) {
                process.updateLocalData(info, data);
            }
        },
        messageListener: function () {
            chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
                if (msg.action === 'updateContextMenu') {
                    if (msg.option === 'update') {
                        //修改操作
                        chrome.contextMenus.update(msg.id, {
                            "title": msg.title
                        });
                    } else {
                        //增加操作
                        var menu = {
                            "title": msg.title,
                            "id": msg.id,
                            "parentId": g.params.rootMenuId,
                            "contexts": ["all"],
                            "onclick": process.onClick
                        };
                        console.log(menu);
                        chrome.contextMenus.create(menu);
                    }
                } else if (msg.action === 'deleteContextMenu') {
                    chrome.contextMenus.remove(msg.id, function () {
                    });
                }
                return true;
            });
        },
        sendMessage: function (msg) {
            chrome.tabs.query({title: chrome.i18n.getMessage('title'), url: "chrome://newtab/"}, function (tabs) {
                var tab = null;
                if (tabs.length > 0) {
                    for (var i = 0, j = tabs.length; i < j; i++) {
                        tab = tabs[i];
                        chrome.tabs.sendMessage(tab['id'], msg);
                    }
                }
            });
        },
        updateLocalData: function (info, data) {
            switch (info.menuItemId) {
                case 'addToBuyList':
                    process.sendMessage({"action": "updateBuy"});
                    break;
                case 'addToReadBlog':
                    (function () {
                        var blog = {
                            "title": data.title,
                            "url": data.url,
                            "timestamp":helper.timestamp()
                        },option={};
                        localData.getData(function (sites) {
                            var localBlog = sites.ntp_blog || [],noIn = true;
                            for(var i = 0,j=localBlog.length ; i<j; i++){
                               var t = localBlog[i];
                                if(t.url === blog.url){

                                }
                            }
                            if(noIn){
                                localBlog.push(blog);
                                localData.setBlog(localBlog);
                                option = {
                                    title: chrome.i18n.getMessage('notifySuccess'),
                                    desc: chrome.i18n.getMessage('notifyBlogDesc')
                                };
                                process.sendMessage({"action": "updateToReadBlog"});
                            }else{
                                option = {
                                    title: chrome.i18n.getMessage('notifySuccess'),
                                    desc: chrome.i18n.getMessage('notifyExistDesc')
                                };
                            }
                            helper.notification(option);
                        });
                    }());
                    break;
                default:
                    (function () {
                        var favorite = {
                            "title": data.title,
                            "url": data.url,
                            "icon": "",//ICON TODO
                            "letter": data.title.substr(0, 2),
                            "bgColor": helper.getRandColor()
                        }, categoryName = '';
                        localData.getData(function (sites) {
                            var categories = sites.ntp_sites || [], items, category, favorites, noIn = true, option;
                            for (var i = 0, j = categories.length; i < j; i++) {
                                if (categories[i].id === info.menuItemId) {
                                    categoryName = categories[i].name;
                                    items = categories[i].items;
                                    //重复添加判断 TODO
                                    for (var m = 0, n = items.length; m < n; m++) {
                                        if (items[m].url === data.url) {
                                            noIn = false;
                                        }
                                    }
                                    if (noIn) {
                                        categories[i].items.push(favorite);
                                        option = {
                                            title: chrome.i18n.getMessage('notifySuccess'),
                                            desc: chrome.i18n.getMessage('notifySuccessDesc', [categoryName])
                                        };
                                    } else {
                                        option = {
                                            title: chrome.i18n.getMessage('notifyTip'),
                                            desc: chrome.i18n.getMessage('notifyExistDesc', [categoryName])
                                        };
                                    }
                                    break;
                                }
                            }

                            localData.setNtpSite(categories, function () {
                            });
                            helper.notification(option);
                            process.sendMessage({"action": "updateFavorite"});
                        });
                    }());
                    break;
            }
        },
        installed: function () {
            chrome.runtime.onInstalled.addListener(function () {
                chrome.contextMenus.create({"title": chrome.i18n.getMessage("title"), "id": g.params.rootMenuId, "contexts": ["all"]});
                var child1 = chrome.contextMenus.create({
                    "title": chrome.i18n.getMessage('menuBuyTitle'),
                    "id": "addToBuyList",
                    "parentId": g.params.rootMenuId,
                    "contexts": ["all"],
                    "onclick": process.onClick
                });
                var child2 = chrome.contextMenus.create({
                    "title": chrome.i18n.getMessage('menuBlogTitle'),
                    "id": "addToReadBlog",
                    "parentId": g.params.rootMenuId,
                    "contexts": ["all"],
                    "onclick": process.onClick
                });
                localData.getData(function (data) {
                    var categories = data.ntp_sites, category;
                    for (var i = 0, j = categories.length; i < j; i++) {
                        category = categories[i];
                        chrome.contextMenus.create({
                            "title": category.name || ' ',
                            "id": category.id,
                            "parentId": g.params.rootMenuId,
                            "contexts": ["all"],
                            "onclick": process.onClick
                        });
                    }
                });

            });
            //https://crxdoc-zh.appspot.com/extensions/event_pages
            //因为监听器本身只在事件页面的环境中存在，您必须每次在事件页面加载时使用 addListener，仅仅在 runtime.onInstalled 这么做是不够的。
        }
    };
    process.installed();
    process.messageListener();
    backgroundProcess = process;
}());
