/**
 * Created by zhanghd on 13-10-11 下午4:35
 * Copyright 2014 , Inc. All rights reserved.
 *
 */
angular.module('favorites', ['ngModal', 'ngSanitize']).controller('favoritesCtrl', ['$scope', '$sce', '$timeout', 'Sites', '_', '$location', '$anchorScroll',
    function ($scope, $sce, $timeout, sites, _, $location, $anchorScroll) {
        var helper = null, g = {}, configIcon = null, localData = null, process = {}, message = {};
        g.params = {
            addTileToCategory: null,
            recommendId: '2fcd9d39-77b7-4435-ad6a-82b3d2a12498'//最常访问ID
        };
        g.config = {
            defaultColor: ['#2F09FF', '#E82C2A', '#FFC53B', '#56E82A', '#00C0FF']
        };
        configIcon = {
            "www.google.com": {"icon": "/resource/logo/google.svg", "bgColor": "#3369E8"},
            "microsoft.com": { "bgColor": "#7CBB00"}
        };
        helper = {
            getRandColor: function () {
                var idx = Math.floor(Math.random() * 5);
                return g.config.defaultColor[idx];
            },
            getDomain: function (url) {
                var r = /:\/\/(.[^/]+)/;
                return url.match(r)[1];
            },
            getGUID: function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },
//            setLocalSites: function (data, callback) {
//                localDataModule.putUserData({id: 'favorites', data: data}, callback);
//
//            },
            sendMessage: function (msg, callback) {
                chrome.runtime.sendMessage(msg, function (response) {
                    callback(response);
                });
            },
            onMessage: function () {
                chrome.runtime.onMessage.addListener(
                    function (request, sender, sendResponse) {
                        if (request.action === 'updateFavorite') {
                            process.resetFavorites();
                        }
                        return true;
                    });

            }
        };
        localData = {
            //分类
            setCategories: function (data, callback) {
                helper.sendMessage({action: 'putUserData', data: {id: 'categories', data: data}}, callback);
            },
            //网址
            setSites: function (data, callback) {
                helper.sendMessage({action: 'putUserData', data: {id: 'sites', data: data}}, callback);
            },
            //最常访问
            getTopSites: function (callback) {
                helper.sendMessage({action: 'getTopSites'}, callback);
            },
            //用户数据
            getUserDataById: function (id, callback) {
                helper.sendMessage({action: 'getUserDataById', data: {id: id}}, callback);
            }
        };

        $scope.modalShownFavorite = false;
        $scope.modalShownCategory = false;
        $scope.modalShownDeleteCategory = false;
        $scope.favoriteInfo = {
            url: 'http://',
            title: '',
            bgColor: '#222'
        };
        process = {
            init: function () {
                //获取数据
                process.resetFavorites();
                helper.onMessage();
                $scope.defaultColors = g.config.defaultColor;
                $scope.colorSelectIdx = 0;
                $scope.showChromeMenu = false;
                $scope.showChromeRecentlyClosed = false;
            },
            sendMessage: function (obj) {
                chrome.runtime.sendMessage(obj);
                //
            },

            getRecommend: function (callback) {
                localData.getTopSites(function (d) {
                    var recommended = [], guid = helper.getGUID(), domain, i, j;
                    d = d || [];
//                        d.length = (d.length > 19 ? 19 : d.length);
                    for (i = 0, j = d.length; i < j; i++) {
                        domain = helper.getDomain(d[i].url);
                        d[i].letter = domain.substr(0, 2);
                        d[i].parentId = guid;
                        d[i].icon = configIcon[domain] && configIcon[domain].icon || '';
                        d[i].bgColor = configIcon[domain] && configIcon[domain].bgColor || '';
                        d[i].guid = helper.getGUID();
                    }
                    recommended = [
                        {
                            "id": g.params.recommendId,
                            "guid": g.params.recommendId,
                            "name": chrome.i18n.getMessage('recommend'),
                            "type": "recommend",
                            "items": d
                        }
                    ];
                    callback(recommended);
                });
            },
            initFavorites: function (callback) {
//                            process.sendMessage({action: "updateContextMenu", option: 'insert', title: chrome.i18n.getMessage('recommend'), id: guid});
                ///这里取服务器数据

                process.loadBookmarks(function (categories, sites) {
//                        var categories = _.union(recommended, cate);
//                        var sites = _.union(d, site);
                    localData.setCategories(categories);
                    localData.setSites(sites);
                    setTimeout(function () {
                        callback(categories);
                    }, 300);
                });
            },
            getCategories: function (callback) {
                localData.getUserDataById('categories', function (data) {
                    data = data && data.data || [];
                    if (!data.length) {//本地木有数据
                        process.initFavorites(function (categories) {
                            callback(categories);
                        });
                    } else {
                        callback(data);
                    }
                });
            },
            getSitesByCategoryId: function (cid, callback) {
                localData.getUserDataById('sites', function (data) {
                    data = (data && data.data || []);
                    var sites = [];
                    for (var i = 0, j = data.length; i < j; i++) {
                        if (data[i].parentId === cid) {
                            sites.push(data[i]);
                        }
                    }
                    callback(sites);
                });
            },
            getSites: function (callback) {
                localData.getUserDataById('sites', function (data) {
                    data = (data && data.data || []);
                    callback(data);
                });
            },
            loadBookmarks: function (callback) {
                //取本地数据
                chrome.bookmarks.getTree(function (data) {
                    var leaf = [], categories = [], oo = {};

                    function iterate(obj) {
                        if (!obj['url'] && obj.children && obj.children.length) {
                            oo = {
                                "id": obj.id,
                                "name": obj.title,
                                "guid": helper.getGUID()
                            };
                            if (obj.title !== '') {
                                categories.push(oo);
                            }
                            oo = {};
                        }
                        for (var key in obj) {
                            var elem = obj[key];
                            if (key === "url" && elem) {
                                var le = {
                                    "title": obj.title,
                                    "url": obj.url,
                                    "icon": "",//ICON TODO
                                    "parentId": obj.parentId,
                                    "id": obj.id,
                                    "guid": helper.getGUID(),
                                    "letter": obj.title && obj.title.length > 2 && obj.title.substr(0, 2),
                                    "bgColor": helper.getRandColor()
                                };
                                leaf.push(le);
                                le = {};
                            }
                            if (typeof elem === "object") {
                                iterate(elem);
                            }
                        }
                    }

                    iterate(data); // start iterating the topmost element (`data`)
//                    for (var i = 0, j = categories.length; i < j; i++) {
//                        var category = categories[i];
//                        for (var k = 0, m = leaf.length; k < m; k++) {
//                            var le = leaf[k];
//                            if (category.id === le.parentId && le.title != '' && le.url != '') {
//                                category.items.push(le);
////                                count1++
//                            }
//                        }
//                    }
                    callback(categories, leaf);
                });
            },
            goCategory: function (category) {
                var currentSites = [];
                currentSites.push(category);////记录上次点击 TODO
                if (category.id === g.params.recommendId) {
                    process.getRecommend(function (data) {
                        $timeout(function () {
                            $scope.currentSites = data;
                        });
                    });
                } else {
                    process.getSitesByCategoryId(currentSites[0].id, function (data) {
                        currentSites[0].items = data;
                        $timeout(function () {
                            $scope.currentSites = currentSites;
                        });
                    });
                }
            },
            resetFavorites: function () {
                //最常访问
                process.getRecommend(function (data) {
                    $scope.currentSites = data;
                    $scope.recommend = data;
                });
                process.getCategories(function (data) {
                    $timeout(function () {
                        $scope.categories = data;
                    });
                });
            },
            showDeleteCategory: function (category_id, category_name) {
                $scope.updateCategoryInfo = {
                    id: category_id || '',
                    name: category_name || '',
                    deleteMsg: $sce.trustAsHtml(chrome.i18n.getMessage('deleteCategoryMessage', [category_name]))
                };
                $scope.dialogTitle = chrome.i18n.getMessage('deleteCategoryTitle');
                $scope.modalShownDeleteCategory = !$scope.modalShownDeleteCategory;
            },
            confirmDeleteCategory: function (flag) {
                var categoryID = $scope.updateCategoryInfo.id;
                if ('yes' === flag) {
                    process.getCategories(function (data) {
                        process.getRecommend(function (data) {
                            $scope.currentSites = data;
                            $scope.recommend = data;
                        });
                        for (var i = 0, j = data.length; i < j; i++) {
                            if (data[i].id === categoryID) {
                                data.splice(i, 1);
                                break;
                            }
                        }
                        localData.setCategories(data, function () {
                            process.resetFavorites();
                        });
                    });
                    process.getSites(function (sites) {
                        for (var i = 0, j = sites.length; i < j; i++) {
                            if (sites[i].parentId === categoryID) {
                                sites.splice(i, 1);
                                break;
                            }
                        }
                        localData.setSites(sites);
                    });
                }
                $scope.modalShownDeleteCategory = false;
            },
            showEditCategory: function (category) {
                $scope.updateCategoryInfo = category || {
                    id: ''
                };
                $scope.dialogTitle = category ? chrome.i18n.getMessage('updateCategoryTitle') : chrome.i18n.getMessage('addCategoryTitle');
                $scope.modalShownCategory = !$scope.modalShownCategory;
            },
            updateCategory: function () {
                process.getCategories(function (categories) {
                    var i, j, GUID = helper.getGUID(), categoryInfo;
                    if ($scope.updateCategoryInfo.id) {//修改操作
                        for (i = 0, j = categories.length; i < j; i++) {
                            if (categories[i].guid === $scope.updateCategoryInfo.guid) {
                                categories[i] = $scope.updateCategoryInfo;
                                break;
                            }
                        }
                        localData.setCategories(categories);
                    } else {//添加操作
                        categoryInfo = {
                            "id": GUID,
                            "guid": GUID,
                            "name": $scope.updateCategoryInfo.name,
                            "items": []
                        };
                        categories.push(categoryInfo);
                    }
                    localData.setCategories(categories);
                    $timeout(function () {
                        $scope.categories = categories;
                    });
                });
                $scope.modalShownCategory = false;

            },
            deleteFavorite: function (category, item, event, idx) {
                event.preventDefault();
                event.stopPropagation();
                category.items.splice(idx, 1);
                $timeout(function () {
                    $scope.currentSites = category;
                });
                process.getSites(function (data) {
                    var items, i, j;
                    for (i = 0, j = data.length; i < j; i++) {
                        if (data[i].guid === item.guid) {
                            data.splice(i, 1);
                            break;
                        }
                    }
                    localData.setSites(data, function () {
                    });
                });
            },
            showEditFavorite: function (category, favorite, event, idx) {
                event.preventDefault();
                event.stopPropagation();
                g.params.addTileToCategory = category;
                $scope.addSiteToCategory = category;
                $scope.editFavoriteInfo = favorite || {
                    url: 'http://',
                    title: ''
                };
                $scope.dialogTitle = favorite ? chrome.i18n.getMessage('updateSiteTitle') : chrome.i18n.getMessage('addSiteTitle');
                $scope.editFavoriteInfo.idx = idx ? idx : 0;
                $scope.modalShownFavorite = !$scope.modalShownFavorite;
            },
            setBackgroundColor:function(color,idx){
                $scope.editFavoriteInfo.bgColor = color;
                $scope.colorSelectIdx = idx;
            },
            updateFavorite: function () {
                var guid = helper.getGUID();
                var favorite = {
                    "id": $scope.editFavoriteInfo.id || guid,
                    "guid": $scope.editFavoriteInfo.guid || guid,
                    "title": $scope.editFavoriteInfo.title,
                    "parentId": $scope.editFavoriteInfo.parentId ||  $scope.addSiteToCategory.id,//添加是
                    "url": $scope.editFavoriteInfo.url,
                    "icon": "",//ICON TODO
                    "letter": $scope.editFavoriteInfo.title.substr(0, 2),
                    "bgColor": $scope.editFavoriteInfo.bgColor || g.config.defaultColor[0]
                };
                process.getSites(function (sites) {
                    var i, j;
                    if ($scope.editFavoriteInfo.id) {
                        for (i = 0, j = sites.length; i < j; i++) {
                            if (sites[i].guid === favorite.guid) {
                                sites[i] = favorite;
                                break;
                            }
                        }
                    } else {
                        sites.push(favorite);
                    }

                    localData.setSites(sites, function () {
                        process.goCategory(g.params.addTileToCategory);
                    });
                });
                $scope.modalShownFavorite = false;
                return false;
            },
            scrollTo: function (anchor) {
                $location.hash(anchor);
                $anchorScroll();

            },
            chromeMenuClick: function (item) {
                $scope.showChromeMenu = !$scope.showChromeMenu;
                helper.sendMessage({action: 'goChromeUrl', data: {url: item.href }}, function () {});

            },
            bodyClick:function(){
//                $scope.showChromeMenu = false;
//                $scope.showChromeRecentlyClosed = false;
            },
            /**
             * 显示系统快速导航
             */
//            chromeMenu: function () {
//                $scope.showChromeRecentlyClosed = false;
//                $scope.showChromeMenu = !$scope.showChromeMenu;
//                var menu = [
//                    {
//                        href: 'chrome://bookmarks',
//                        text: chrome.i18n.getMessage('bookmarks')
//                    },
//                    {
//                        href: 'chrome://downloads',
//                        text: chrome.i18n.getMessage('downloads')
//                    },
//                    {
//                        href: 'chrome://history',
//                        text: chrome.i18n.getMessage('history')
//                    },
//                    {
//                        href: 'chrome://extensions',
//                        text: chrome.i18n.getMessage('extensions')
//                    },
//                    {
//                        href: 'chrome://settings',
//                        text: chrome.i18n.getMessage('settings')
//                    },
//                    {
//                        href: 'chrome://settings/clearBrowserData',
//                        text: chrome.i18n.getMessage('clearHistory')
//                    }
//
//                ];
//                console.log(menu);
//                $scope.chromeMenu = menu;

//            },
            /**
             * 显示最近关闭
             */
            recentlyClosed: function () {
                $scope.showChromeMenu = false;
                $scope.showChromeRecentlyClosed = !$scope.showChromeRecentlyClosed;
                helper.sendMessage({action: 'goRecentlyClosed', data: {}}, function (data) {
                    var i, j,site = {}, sites = [];
                    for (i = 0, j = data.length; i < j; i++) {
                        site = {};
                        site.href = data[i].tab.url;
                        site.text = data[i].tab.title.substr(0,16);
                        sites.push(site);
                    }
                    $timeout(function () {
                        $scope.chromeRecentlyClosed = sites;
                    });
                });
            }
        };
        $scope.process = process;
        process.init();
    }]);
