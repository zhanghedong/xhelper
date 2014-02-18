/**
 * Created by zhanghd on 13-10-11 下午4:39
 * Copyright 2013 17173, Inc. All rights reserved.
 */
angular.module('home', ['config', 'ngModal', 'ngSanitize']).controller('homeCtrl', ['$scope', '$sce', '$timeout', 'Sites', '_', function ($scope, $sce, $timeout, sites, _) {
    var helper = null, g = {}, configIcon = null, localSites = [], dataModule, process = {};
    g.params = {
        addTileToCategoryID: 0
    };
    g.config = {
        defaultColor: '#222'
    };
    configIcon = {
        "www.google.com": {"icon": "/resource/logo/google.svg", "bgColor": "#3369E8"},
        "microsoft.com": { "bgColor": "#7CBB00"}
    };

    helper = {
        getDomain: function (url) {
            var r = /:\/\/(.[^/]+)/;
            return url.match(r)[1];
        },
        getLocalSites: function (callback) {
            ntp.localData.getLocalSites(function (data) {
                if (!data.length) {//本地有数据
                    ntp.localData.getTopSites(function (d) {
                        d = d || [];
                        d.length = d.length > 10 ? 10 : d.length;
                        for (var i = 0, j = d.length; i < j; i++) {
                            var domain = helper.getDomain(d[i].url);
                            d[i].letter = domain.substr(0, 2);
                            d[i].icon = configIcon[domain] && configIcon[domain].icon || '';
                            d[i].bgColor = configIcon[domain] && configIcon[domain].bgColor || '';
                        }
                        var localSites = [
                            {
                                "id": 1,
                                "name": "Recommended",
                                "items": d
                            }
                        ];
                        $scope.localSites = localSites;
                        ///这里取服务器数据
                        var tempSites = localSites[0].items;
                        sites.query(function (data) {
                            for (var i = 0, j = data.length; i < j; i++) {
                                var domain = helper.getDomain(data[i].url), exist = false, tempDomain = '';
                                //判断本地与服务端数据是否有重复
                                for (var m = 0, n = tempSites.length; m < n; m++) {
                                    tempDomain = helper.getDomain(tempSites[m].url);
                                    if (tempDomain === domain) {
                                        exist = true;
                                        break;
                                    }
                                }
                                if (!exist) {
                                    data[i].letter = domain.substr(0, 2);
                                    localSites[0].items.push(data[i]);
                                }
                                exist = false;
                            }
                            $timeout(function () {
                                $scope.localSites = localSites;
                                ntp.localData.setLocalSites($scope.localSites);
                            });
                        });
                        $scope.localSites = localSites;
                        callback(localSites);
                    });
                } else {
                    callback(data);
                }
            });
        },
        setLocalSites: function (data, callback) {
            ntp.localData.setLocalSites(data, callback)
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
            helper.getLocalSites(function (data) {
                console.log(JSON.stringify(data));
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
                helper.getLocalSites(function (data) {
                    for (var i = 0, j = data.length; i < j; i++) {
                        if (data[i].id === categoryID) {
                            data.splice(i, 1);
                            break;
                        }
                    }
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
            helper.getLocalSites(function (data) {
                var categoryInfo = {};
                if ($scope.updateCategoryInfo.id) {
                    //修改操作
                    for (var i = 0, j = data.length; i < j; i++) {
                        if (data[i].id === $scope.updateCategoryInfo.id) {
                            data[i].name = $scope.updateCategoryInfo.name;
                        }
                    }
                } else {
                    //添加操作
                    categoryInfo = {
                        "id": data.length + 1,
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
            });
        },
        showEditFavorite: function (categoryID, favorite, event,idx) {
            console.log(idx);
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
                "bgColor": $scope.editFavoriteInfo.bgColor || g.config.defaultColor
            };
            var parentCategoryID = g.params.addTileToCategoryID;
            helper.getLocalSites(function (data) {
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
                console.log(data);
                $timeout(function () {
                    $scope.localSites = data;
                    $timeout(function () {
                        helper.setLocalSites($scope.localSites);
                    }, 50);
                });
            });

            $scope.modalShownFavorite = false;
            return false;
        }
    };
    $scope.process = process;
    process.init();
}]);
