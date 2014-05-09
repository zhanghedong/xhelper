/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 , Inc. All rights reserved.
 */

angular.module('search', ['ngSanitize']).controller('searchCtrl', ['$scope', '$sce', '$timeout', '_', 'LocalData', '$http', '$templateCache', function ($scope, $sce, $timeout, _, localDataModule, $http, $templateCache) {
    var process = {}, helper = {}, config = {};
    config = {
        readyCount: 2,
        bookmarksCount: 3,
        searchCount: 5,
        baiduGo: 'http://www.baidu.com/baidu?tn=98012088_3_dg&ch=2&ie=utf-8&word=',
        googleGo: 'http://www.google.com.hk/search?ix=seb&sourceid=chrome&ie=UTF-8&q='
    };
    helper = {
        getLocalBlog: function (callback) {
            localDataModule.getUserDataById('blog', function (data) {
                data = data && data.data || [];
                callback(data);
            });
        },
        getLocalSites: function (callback) {
            localDataModule.getUserDataById('sites', function (data) {
                data = data && data.data || [];
                callback(data);

            });
        }
    };
    process = {
        onClick: function () {
        },
        init: function () {
            $scope.keywordPlaceholder = 'favorites、google、baidu、bing';
            $scope.selectedItem = 0;
            process.watch();
            localDataModule.getConfigById('custom', function (data) {
                if (!data) {
                    //根据用户所在国家设置默认搜索引擎 TODO
                    localDataModule.getConfigById('location', function (data) {
                        if (data.data.countryCode.toLocaleString() == 'cn') {
                            localDataModule.putConfig({id: 'custom', data: {defaultEngine: ['baidu'], target: '_blank'}});
                        } else {
                            localDataModule.putConfig({id: 'custom', data: {defaultEngine: ['google'], target: '_blank'}});
                        }
                    });
                } else {
                    angular.forEach(data.data.defaultEngine, function (item) {
                        if (item === 'baidu') {
                            $scope.activeBaidu = true;
                        } else if (item == 'google') {
                            $scope.activeGoogle = true;
                        }
                    });
                }
            });
        },
        setDefaultEngine: function (engine) {
            if (engine === 'baidu') {
                $scope.activeBaidu = !$scope.activeBaidu;
            } else if (engine == 'google') {
                $scope.activeGoogle = !$scope.activeGoogle;
            }
            //保存数据到本地 TODO
        },
        watch: function () {
            $scope.$watch("keyword", function (keyword) {
                // keyword = $scope.keyword || '';
                var sugList = [], i, j, nextSug = true, reg = /:\/\/(.[^/]+)/, domain, readyCount = 0, bookmarkCount = 0;
                if (keyword !== '') {
                    helper.getLocalBlog(function (data) {
                        for (i = 0, j = data.length; i < j; i++) {
                            domain = data[i].url.match(reg);
                            domain = domain && domain[1] || '';
                            if (data[i].title.indexOf(keyword) !== -1 || domain.indexOf(keyword) !== -1) {
                                data[i].itemType = 'blog';
                                sugList.push(data[i]);
                                readyCount++;
                                if (readyCount >= config.readyCount) {
                                    break;
                                }
                            }
                        }
                        $timeout(function () {
                            $scope.searchSuggest = sugList;
                        });
                        if (nextSug) {
                            chrome.topSites.get(function (data) {
                                for (i = 0, j = data.length; i < j; i++) {
                                    domain = data[i].url.match(reg);
                                    domain = domain && domain[1] || '';
                                    if (data[i].title.indexOf(keyword) !== -1 || domain.indexOf(keyword) !== -1) {
                                        data[i].itemType = 'topSite';
                                        sugList.push(data[i]);
                                        bookmarkCount++;
                                        if (bookmarkCount >= config.bookmarksCount) {
                                            nextSug = false;
                                            break;
                                        }
                                    }
                                }
                                $timeout(function () {
                                    $scope.searchSuggest = sugList;
                                });
                            });
                        }
                        if (nextSug) {
                            helper.getLocalSites(function (data) {
                                for (i = 0, j = data.length; i < j; i++) {
                                    domain = data[i].url.match(reg);
                                    domain = domain && domain[1] || '';
                                    if (data[i].title.indexOf(keyword) !== -1 || domain.indexOf(keyword) !== -1) {
                                        data[i].itemType = 'favorite';
                                        sugList.push(data[i]);
                                        bookmarkCount++;
                                        if (bookmarkCount >= config.bookmarksCount) {
                                            nextSug = false;
                                            break;
                                        }
                                    }
                                }
                                $timeout(function () {
                                    $scope.searchSuggest = sugList;
                                });
                                chrome.runtime.sendMessage({action: 'getSuggestFromEngine', engine: 'baidu', keyword: keyword}, function (response) {
                                    var list = response.resultList, i, j, data = [], item = {};
                                    for (i = 0, j = list.length; i < j; i++) {
                                        item.itemType = 'engineKeyword';
                                        item.title = list[i];
                                        data.push(item);
                                        item = {};
                                    }
                                    $timeout(function () {
                                        $scope.searchSuggest = _.union($scope.searchSuggest, data);
                                    });
                                });
                            });
                        }
                    });
                } else {
                    $scope.searchSuggest = [];
                }
            });
        },
        nextFocusItem: function () {
            if ($scope.selectedItem >= $scope.searchSuggest.length - 1) {
                $scope.selectedItem = 0;
            } else {
                $scope.selectedItem++;
            }
        },
        prevFocusItem: function () {
            if ($scope.selectedItem > 0) {
                $scope.selectedItem--;
            } else {
                $scope.selectedItem = $scope.searchSuggest.length - 1;
            }
        },
        searchClick: function (item) {
            var openUrl = function (url) {
                location.href = url; //默认当前面打开 ，通过配置完成 TODO
            };
            switch (item.itemType) {
                case 'engineKeyword':
                    if ('baidu') {//根据配置文件确认搜索地址 TODO
                        console.log(item);
                        var url = config.baiduGo + encodeURIComponent(item.title);
                        openUrl(url);
                    }
                    break;
                case 'blog':
                    openUrl(item.url);
                    break;
                case 'topSite':
                    openUrl(item.url);
                    break;
                case 'favorite':
                    openUrl(item.url);
                    break;
            }
        },
        search: function (e) {
            var g = {DOWN: 40, UP: 38, ENTER: 13, ESC: 27};
            switch (e.keyCode) {
                case g.DOWN:
                    process.nextFocusItem();
                    break;
                case g.UP:
                    process.prevFocusItem();
//                    e(), a.searchTerm && a.selectRange(b.target, a.searchTerm.length, a.searchTerm.length);
                    break;
                case g.ENTER:
                    process.searchClick($scope.searchSuggest[$scope.selectedItem]);
//                    a.searchTerm ? a.results[a.searchTerm].length ? a.enterEventInfo = {spotID: a.results[a.searchTerm][a.selectedCategory].spotID, type: a.results[a.searchTerm][a.selectedCategory].type, selectedItem: a.selectedItem} : a.resultClick({link: a.buildGoogleSearchURL(a.searchTerm)}) : a.enterEventInfo = {spotID: a.defaultResults[0].spotID, type: a.defaultResults[0].type, selectedItem: a.selectedItem};
                    break;
                case g.ESC:
                    if ($scope.searchSuggest) {
                        $scope.searchSuggest = null;
                        e.stopPropagation();
                    }
            }
        }
    };
    process.init();
    $scope.process = process;
}]);
