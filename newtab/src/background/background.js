(function () {
    var process, helper, localData, g = {}, userData;
    g.params = {
        rootMenuId: "6375ac11-3e03-49a0-b6ae-9564d10e7ee3"
    };
    g.config = {
        defaultColor: ['#2F09FF', '#E82C2A', '#FFC53B', '#56E82A', '#00C0FF'],
        searchEngine: {baidu: 'http://unionsug.baidu.com/su?cb=JSON_CALLBACK&_=' + ((new Date()).valueOf()) + '&wd=', google: 'http://google.com/complete/search?client=chrome-omni&ie=utf-8&oe=utf-8&hl=en-US&q='}
    };
    localData = {
        getUserData: function (callback) {
            NTP.IDB.getUserData(function (data) {
                callback(data);
            });
        },
        setUserData: function (data, callback) {
            NTP.IDB.putUserData(data, function (data) {
                callback(data)
            })
        }
    };
    helper = {
        timestamp: function () {
            return (new Date()).valueOf();
        },
        getGUID: function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        getRandColor: function () {
            var idx = Math.floor(Math.random() * 5);
            return g.config.defaultColor[idx];
        },
        notification: function (option) {
            if (option) {
                if (webkitNotifications) {
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
                }
//                var tt = {
//                    type : "basic",
//                    title: "Basic Notification",
//                    iconUrl:'http://i.stack.imgur.com/dmHl0.png',
//                    message:'创建成功'
//                };
//                chrome.notifications.create("abced", tt, function(id){
//                    console.log('success'+id);
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
        getResultByUrl: function (url, callback) {
            $.ajax({
                type: "get",        //使用get方法访问后台
                dataType: "text",  //返回text格式的数据
                url: url,   //要访问的后台地址
                async: false,
                success: function (data) {
                    callback(data);
                }
            });
        },
        messageListener: function () {
            chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
                if (msg.action) {
                    switch (msg.action) {
                        case 'insertFavorite':
                            var item = msg.item;
                            if (item.url !== '') {
                                localData.getUserData(function (data) {
                                    var sites = [], i, j, noIn = true;
                                    for (i = 0, j = data.length; i < j; i++) {
                                        if (data[i].id === 'sites') {
                                            sites = data[i].data;
                                            break;
                                        }
                                    }

                                    sites.push(item);
                                    localData.setUserData({id: 'sites', data: sites}, function () {
                                        console.log('insert favorite success ');
                                    });
                                });
                            }
                            break;
                        case 'getSuggestFromEngine' :
                            var engine = msg.engine || 'google',
                                queryUrl = g.config.searchEngine[engine],
                                list = null;
                            if (msg.keyword) {
                                process.getResultByUrl(queryUrl + encodeURIComponent(msg.keyword), function (data) {
                                    if (engine === 'baidu') {
                                        list = data.split(',s:')[1].split('}')[0];
                                        console.log(list);
                                        list = list && JSON.parse(list);
                                        if (list) {
                                            sendResponse({engine: engine, resultList: list});
                                        }
                                    } else {
                                        list = JSON.parse(data)[1] || [];

                                        sendResponse({engine: engine, resultList: list});
                                    }
                                });
                            }
                            break;
                        case 'putUserData':
                            NTP.IDB.putUserData(msg.data, function (data) {
                                sendResponse(data);
                            });
                            break;
                        case 'getTopSites':
                            NTP.IDB.getTopSites(function (data) {
                                sendResponse(data);
                            });
                            break;
                        case 'getUserDataById':
                            NTP.IDB.getUserDataById(msg.data.id, function (data) {
                                sendResponse(data);
                            });
                            break;
                    }
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
                case 'addToReadLater':
                    (function () {
                        var blog = {
                            "title": data.title,
                            "url": data.url,
                            "guid": helper.getGUID(),
                            "timestamp": helper.timestamp()
                        }, option = {};
                        localData.getUserData(function (data) {
                            var localBlog = [], i, j, noIn = true;
                            for (i = 0, j = data.length; i < j; i++) {
                                if (data[i].id === 'blog') {
                                    localBlog = data[i].data;
                                }
                            }
                            for (i = 0, j = localBlog.length; i < j; i++) {
                                var t = localBlog[i];
                                if (t.url === blog.url) {
                                    noIn = false;
                                }
                            }
                            if (noIn) {
                                localBlog.splice(0, 0, blog);
                                // localData.setBlog(localBlog);
                                localData.setUserData({id: 'blog', data: localBlog}, function () {
                                });
                                option = {
                                    title: chrome.i18n.getMessage('notifySuccess'),
                                    desc: chrome.i18n.getMessage('notifyBlogDesc')
                                };
                                process.sendMessage({"action": "updateToReadBlog"});
                            } else {
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
                        chrome.tabs.getSelected(null, function (tab) {
                            chrome.tabs.insertCSS(tab.id, {file: 'content/style.css'}, function () {
                                chrome.tabs.executeScript(tab.id, {file: "lib/jquery.js"}, function () {
                                    chrome.tabs.executeScript(tab.id, {file: "content/content.js"}, function () {
                                        localData.getUserData(function (data) {
                                            var categories = [], i, j, noIn = true;
                                            for (i = 0, j = data.length; i < j; i++) {
                                                if (data[i].id === 'categories') {
                                                    categories = data[i].data;
                                                }
                                            }
                                            chrome.tabs.sendMessage(tab.id, {action: 'addToFavorite', categories: categories, colors: g.config.defaultColor}, function (response) {
                                                console.log(response);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    }());
                    break;
            }
        },
        installed: function () {
            chrome.contextMenus.removeAll(function () {
                chrome.contextMenus.create({"title": chrome.i18n.getMessage('menuBlogTitle'), "id": "addToReadLater", "contexts": ["all"], "onclick": process.onClick});
                chrome.contextMenus.create({"title": chrome.i18n.getMessage("menuBookmarkTitle"), "id": "addToBookmark", "contexts": ["all"], "onclick": process.onClick});
            });
            //因为监听器本身只在事件页面的环境中存在，您必须每次在事件页面加载时使用 addListener，仅仅在 runtime.onInstalled 这么做是不够的。

            //记录 geolocation
            NTP.PREF.get('location') || process.setGeolocation();
        },
        setGeolocation: function () {
            $.get(NTP.PREF.get('geolocationServiceUrl'), function (data) {
                NTP.PREF.set('location', data);
                process.setWeather(data);
                process.setForecastWeather(data);
            })
        },
        tempUnit: function () {

            var location = NTP.PREF.get('location');
            var code = location.countryCode || 'US';
            if (["US", "JM", "PR", "GU", "VI", "KY", "PW", "BS", "BZ"].indexOf(code) != -1) {
                return  "imperial";
            } else {
                return "metric";
            }
        },
        tempSymbol:function(){
            var location = NTP.PREF.get('location');
            if(process.tempUnit() === "imperial"){
                return '°F';
            }else{
                return '℃';
            }
        },
        setWeather: function (location) {
            var params = {
                lat: location.lat,
                lon: location.lon,
                units: process.tempUnit(),
                lang: NTP.PREF.get('lang').replace('-', '_')
            };
            $.get(NTP.PREF.get('weatherAPI'), params, function (data) {
                NTP.PREF.set('weather', data);
            });
        },
        setForecastWeather: function (location) {
            var params = {
                lat: location.lat,
                lon: location.lon,
                units: process.tempUnit(location),
                lang: NTP.PREF.get('lang').replace('-', '_'),
                mode: 'json',
                cnt: 5
            };
            $.get(NTP.PREF.get('weatherForecastAPI'), params, function (data) {
                NTP.PREF.set('weatherForecast', data);
            });
        }
    };
    process.installed();
    process.messageListener();
}());