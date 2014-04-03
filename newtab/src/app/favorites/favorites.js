/**
 * Created by zhanghd on 13-10-11 下午4:39
 * Copyright 2013 17173, Inc. All rights reserved.
 */
angular.module('favorites', ['config', 'ngModal', 'ngSanitize']).controller('favoritesCtrl', ['$scope', '$sce', '$timeout', 'Sites', '_', '$location', '$anchorScroll', 'LocalData',
    function ($scope, $sce, $timeout, sites, _, $location, $anchorScroll, localDataModule) {
        var helper = null, g = {}, configIcon = null, localSites = [], dataModule, process = {};
        g.params = {
            addTileToCategoryID: 0
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
                localDataModule.putUserData({id: 'favorites', data: data});
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
            getLocalSites: function (id, callback) {
                localDataModule.getUserDataById(id, function (data) {
                    data = data && data.data || [];
                    if (!data.length) {//本地木有数据
                        console.log('本地木有数据');
                        localDataModule.getTopSites(function (d) {
                            var localSites = [], guid = helper.getGUID(), domain, i, j;
                            d = d || [];
                            d.length = d.length > 10 ? 10 : d.length;
                            for (i = 0, j = d.length; i < j; i++) {
                                domain = helper.getDomain(d[i].url);
                                d[i].letter = domain.substr(0, 2);
                                d[i].icon = configIcon[domain] && configIcon[domain].icon || '';
                                d[i].bgColor = configIcon[domain] && configIcon[domain].bgColor || '';
                            }
                            localSites = [
                                {
                                    "id": guid,
                                    "name": chrome.i18n.getMessage('recommend'),
                                    "items": d
                                }
                            ];
                            $scope.localSites = localSites;
                            //初次加载时添加到右击菜单

                            process.sendMessage({action: "updateContextMenu", option: 'insert', title: chrome.i18n.getMessage('recommend'), id: guid});
                            ///这里取服务器数据
                            var tempSites = localSites[0].items;
                            $scope.localSites = localSites;
                            process.loadBookmarks(function(data){
                                var dd = _.union(localSites,data);
                                console.log('data============'.data);
                                console.log('dd===========',dd);
                                callback(dd);
                            });
                        });
                    } else {
                        callback(data);
                    }
                });
            },
            loadBookmarks: function (callback) {

                //取本地数据
                chrome.bookmarks.getTree(function (data) {
                    var count = 0;
                    var count1 = 0;
                    var leaf = [], categorys = [], oo = {};

                    function iterate(obj) {
                        if (!obj['url'] && obj.children && obj.children.length) {
                            oo = {
                                "id": obj.id,
                                "name": obj.title,
                                "items": []
                            };
                            if(obj.title!=''){
                                categorys.push(oo);
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
                                    "letter": obj.title.substr(0, 2),
                                    "bgColor": helper.getRandColor()
                                };
                                leaf.push(le);
                                le = {};
                                count++;
                            }
                            if (typeof elem === "object") {
                                iterate(elem);
                            }
                        }
                    }

                    iterate(data); // start iterating the topmost element (`data`)
                    for (var i = 0, j = categorys.length; i < j; i++) {
                        var category = categorys[i];
                        for (var k = 0, m = leaf.length; k < m; k++) {
                            var le = leaf[k];
                            if (category.id === le.parentId) {
                                category.items.push(le);
                            }
                        }
                    }
                    callback(categorys);
                })
            },
            resetFavorites: function () {
                process.getLocalSites('favorites', function (data) {
                    var localSites = data;
                    $timeout(function () {
                        $scope.localSites = localSites;
                    });
                });
            },
            showDeleteCategory: function (category_id, category_name) {
                $scope.updateCategoryInfo = {
                    id: category_id || '',
                    name: category_name || '',
                    deleteMsg: $sce.trustAsHtml('Delete <em>' + category_name + '</em> will delete all of it`s favorites items,Are you shure?')
                };
                $scope.modalShownDeleteCategory = !$scope.modalShownDeleteCategory;
            },
            confirmDeleteCategory: function (flag) {
                var categoryID = $scope.updateCategoryInfo.id;
                if ('yes' === flag) {
                    process.getLocalSites('favorites', function (data) {
                        for (var i = 0, j = data.length; i < j; i++) {
                            if (data[i].id === categoryID) {
                                data.splice(i, 1);
                                break;
                            }
                        }
                        process.sendMessage({action: "deleteContextMenu", id: $scope.updateCategoryInfo.id});
                        helper.setLocalSites(data);
                        $timeout(function () {
                            $scope.localSites = data;
                        });
                    });
                }
                $scope.modalShownDeleteCategory = false;
            },
            showEditCategory: function (category_id, category_name) {
                $scope.updateCategoryInfo = {
                    id: category_id || '',
                    name: category_name || ''
                };
                $scope.modalShownCategory = !$scope.modalShownCategory;
            },
            updateCategory: function () {
                process.getLocalSites('favorites', function (data) {
                    var categoryInfo = {}, optionID = $scope.updateCategoryInfo.id || helper.getGUID(), option = '';
                    if ($scope.updateCategoryInfo.id) {
                        option = 'update';
                        //修改操作
                        for (var i = 0, j = data.length; i < j; i++) {
                            if (data[i].id === $scope.updateCategoryInfo.id) {
                                data[i].name = $scope.updateCategoryInfo.name;
                                break;
                            }
                        }
                    } else {
                        option = 'insert';
                        //添加操作
                        categoryInfo = {
                            "id": optionID,
                            "name": $scope.updateCategoryInfo.name,
                            "items": []
                        };
                        data.push(categoryInfo);
                    }
                    helper.setLocalSites(data);
                    $timeout(function () {
                        $scope.localSites = data;
                    });
                    $scope.modalShownCategory = false;
                    process.sendMessage({action: "updateContextMenu", option: option, title: $scope.updateCategoryInfo.name, id: optionID});
                    $timeout(function () {
                        process.scrollTo(optionID);
                    });
                });

            },
            deleteFavorite: function (categoryID, favorite, event, idx) {
                event.preventDefault();
                event.stopPropagation();
                process.getLocalSites('favorites', function (data) {
                    var i, j, items;
                    for (i = 0, j = data.length; i < j; i++) {
                        if (data[i].id === categoryID) {
                            items = data[i].items;
                            data[i].items.splice(idx, 1);
                        }
                    }
                    $timeout(function () {
                        $scope.localSites = data;
                        $timeout(function () {
                            helper.setLocalSites($scope.localSites);
                        }, 50);
                    });
                });
            },
            showEditFavorite: function (categoryID, favorite, event, idx) {
                event.preventDefault();
                event.stopPropagation();
                g.params.addTileToCategoryID = categoryID;
                $scope.editFavoriteInfo = favorite || {
                    url: 'http://',
                    title: ''
                };
                $scope.editFavoriteInfo.idx = idx ? idx : 0;
                $scope.modalShownFavorite = !$scope.modalShownFavorite;
            },
            updateFavorite: function () {
                var favorite = {
                    "title": $scope.editFavoriteInfo.title,
                    "url": $scope.editFavoriteInfo.url,
                    "icon": "",//ICON TODO
                    "letter": $scope.editFavoriteInfo.title.substr(0, 2),
                    "bgColor": $scope.editFavoriteInfo.bgColor || helper.getRandColor()
                };
                var parentCategoryID = g.params.addTileToCategoryID;
                process.getLocalSites('favorites', function (data) {
                    var i, j, items;
                    if (!$scope.editFavoriteInfo.idx) {
                        for (i = 0, j = data.length; i < j; i++) {
                            if (data[i].id === parentCategoryID) {
                                data[i].items.push(favorite);
                            }
                        }
                    } else {
                        for (i = 0, j = data.length; i < j; i++) {
                            if (data[i].id === parentCategoryID) {
                                items = data[i].items;
                                data[i].items[$scope.editFavoriteInfo.idx] = favorite;
                            }
                        }
                    }
                    $timeout(function () {
                        $scope.localSites = data;
                        $timeout(function () {
                            helper.setLocalSites($scope.localSites);
                        }, 50);
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
