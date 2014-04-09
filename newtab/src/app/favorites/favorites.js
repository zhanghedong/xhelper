/**
 * Created by zhanghd on 13-10-11 下午4:39
 * Copyright 2013 17173, Inc. All rights reserved.
 */
angular.module('favorites', ['config', 'ngModal', 'ngSanitize']).controller('favoritesCtrl', ['$scope', '$sce', '$timeout', 'Sites', '_', '$location', '$anchorScroll', 'LocalData',
    function ($scope, $sce, $timeout, sites, _, $location, $anchorScroll, localDataModule) {
        var helper = null, g = {}, configIcon = null, localSites = [], dataModule, process = {};
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
            setLocalSites: function (data, callback) {
                localDataModule.putUserData({id: 'favorites', data: data}, callback);
            },
            setCategories: function (data, callback) {
                localDataModule.putUserData({id: 'categories', data: data}, callback);
            },
            setSites: function (data, callback) {
                localDataModule.putUserData({id: 'sites', data: data}, callback);
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
                process.onMessage();
            },
            sendMessage: function (obj) {
                chrome.runtime.sendMessage(obj);
                //
            },
            onMessage: function () {
                chrome.runtime.onMessage.addListener(
                    function (request, sender, sendResponse) {
                        if (request.action === 'updateFavorite') {
                            process.resetFavorites();
                        }
                        return true;
                    });

            },
            getRecommend: function (callback) {
                localDataModule.getTopSites(function (d) {
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
                    helper.setCategories(categories);
                    helper.setSites(sites);
                    setTimeout(function () {
                        callback(categories);
                    }, 300);
                });

            },
            getCategories: function (callback) {
                localDataModule.getUserDataById('categories', function (data) {
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
                localDataModule.getUserDataById('sites', function (data) {
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
                localDataModule.getUserDataById('sites', function (data) {
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
//                    if (data.length) {
//                        process.goCategory(data[0]);
//                    }
                    $timeout(function () {
                        $scope.categories = data;
                    });
                });
            },
            showDeleteCategory: function (category_id, category_name) {
                $scope.updateCategoryInfo = {
                    id: category_id || '',
                    name: category_name || '',
                    deleteMsg: $sce.trustAsHtml('')
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
//                        process.sendMessage({action: "deleteContextMenu", id: $scope.updateCategoryInfo.id});
                        helper.setCategories(data);
                        $timeout(function () {
                            $scope.categories = data;

                        });
                    });
                    process.getSites(function (sites) {
                        for (var i = 0, j = sites.length; i < j; i++) {
                            if (sites[i].parentId === categoryID) {
                                sites.splice(i, 1);
                                break;
                            }
                        }
                        helper.setSites(sites);
                    });
                }
                $scope.modalShownDeleteCategory = false;
            },
            showEditCategory: function (category) {
                $scope.updateCategoryInfo = category || {
                    id: ''
                };
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
                        helper.setCategories(categories);
                    } else {//添加操作
                        categoryInfo = {
                            "id": GUID,
                            "guid": GUID,
                            "name": $scope.updateCategoryInfo.name,
                            "items": []
                        };
                        console.log(categoryInfo);
                        categories.push(categoryInfo);
                    }
                    helper.setCategories(categories);
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
                    helper.setSites(data, function () {
                    });
                });
            },
            showEditFavorite: function (category, favorite, event, idx) {
                event.preventDefault();
                event.stopPropagation();
                g.params.addTileToCategory = category;
                $scope.editFavoriteInfo = favorite || {
                    url: 'http://',
                    title: ''
                };
                $scope.dialogTitle = favorite ? chrome.i18n.getMessage('updateSiteTitle') : chrome.i18n.getMessage('addSiteTitle');
                $scope.editFavoriteInfo.idx = idx ? idx : 0;
                $scope.modalShownFavorite = !$scope.modalShownFavorite;
            },
            updateFavorite: function () {
                var guid = helper.getGUID();
                var favorite = {
                    "id": $scope.editFavoriteInfo.id || guid,
                    "guid": $scope.editFavoriteInfo.guid || guid,
                    "title": $scope.editFavoriteInfo.title,
                    "parentId": g.params.addTileToCategory.id,
                    "url": $scope.editFavoriteInfo.url,
                    "icon": "",//ICON TODO
                    "letter": $scope.editFavoriteInfo.title.substr(0, 2),
                    "bgColor": $scope.editFavoriteInfo.bgColor || helper.getRandColor()
                };
                process.getSites(function (sites) {
                    var i, j;
                    if ($scope.editFavoriteInfo.id) {
                        console.log('update', favorite);
                        for (i = 0, j = sites.length; i < j; i++) {
                            if (sites[i].guid === favorite.guid) {
                                sites[i] = favorite;
                                break;
                            }
                        }
                    } else {
                        console.log('insert', favorite);
                        sites.push(favorite);
                    }
                    helper.setSites(sites, function () {
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
            /**
             * 显示系统快速导航
             */
            chromeMenu: function () {

            },
            /**
             * 显示最近关闭
             */
            recentlyClosed: function () {

            }
        };
        $scope.process = process;
        process.init();
    }]);
