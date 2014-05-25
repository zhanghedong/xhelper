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
            $scope.keywordPlaceholder =chrome.i18n.getMessage('searchPlaceholder');
            $scope.selectedItem = -1;
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
            localDataModule.getConfigById('custom', function (data) {
                var idx = data.data.defaultEngine.indexOf(engine);
                if (idx != -1) {
                    data.data.defaultEngine.splice(idx, 1);
                } else {
                    data.data.defaultEngine.push(engine);
                }
                localDataModule.putConfig({id: 'custom', data: {defaultEngine: data.data.defaultEngine, target: '_blank'}});
            });

        },
        watch: function () {
            $scope.$watch("keyword", function (keyword) {
                var sugList = [], i, j, nextSug = true, reg = /:\/\/(.[^/]+)/, domain, readyCount = 0, bookmarkCount = 0;
//                $scope.selectedItem = -1;
                if (keyword !== '') {
                    if ($scope.searchSuggest) {
                        for (i = 0, j = $scope.searchSuggest.length; i < j; i++) {
                            var item = $scope.searchSuggest[i];
                            if (item.title == keyword) {
                                return false;
                            }
                        }
                    }
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
                                localDataModule.getConfigById('custom', function (data) {//
                                    if (data.data.defaultEngine.length) {
                                        console.log('abcdef');
                                        localDataModule.getConfigById('location', function (location) {
                                            var engine = location.data.countryCode == 'CN' ? 'baidu' : 'google';
                                            chrome.runtime.sendMessage({action: 'getSuggestFromEngine', engine: engine, keyword: keyword}, function (response) {
                                                var list = response.resultList, i, j, data = [], item = {};
                                                for (i = 0, j = list.length; i < config.searchCount && i < j; i++) {
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
            $scope.keyword = $scope.searchSuggest[$scope.selectedItem].title;
        },
        prevFocusItem: function () {
            if ($scope.selectedItem > 0) {
                $scope.selectedItem--;
            } else {
                $scope.selectedItem = $scope.searchSuggest.length - 1;
            }
            $scope.keyword = $scope.searchSuggest[$scope.selectedItem].title;
        },
        searchClick: function (item) {
            var openUrl = function (url, target) {
                if (target === '_self') {
                    location.href = url; //默认当前面打开 ，通过配置完成 TODO
                } else {
                    window.open(url);
                }
            };
            switch (item.itemType) {
                case 'engineKeyword':
                    localDataModule.getConfigById('custom', function (data) {
                        var queryStr = [];
                        if (data.data.defaultEngine.length) {
                            angular.forEach(data.data.defaultEngine, function (engine, idx) {
                                if (engine === 'baidu') {
                                    queryStr.push(config.baiduGo + encodeURIComponent(item.title));
                                } else if (engine == 'google') {
                                    queryStr.push(config.googleGo + encodeURIComponent(item.title));
                                }
                            });
                            if (queryStr.length) {
                                angular.forEach(queryStr, function (url, idx) {
                                    if (idx === queryStr.length - 1) {
                                        openUrl(url, '_self');
                                    } else {
                                        openUrl(url, '_blank');
                                    }
                                });
                            }
                        }
                    });
                    break;
                case 'blog':
                    openUrl(item.url, '_self');
                    break;
                case 'topSite':
                    openUrl(item.url, '_self');
                    break;
                case 'favorite':
                    openUrl(item.url, '_self');
                    break;
            }
        },
        search: function (e) {
            var g = {DOWN: 40, UP: 38, ENTER: 13, ESC: 27}, item = {};
            switch (e.keyCode) {
                case g.DOWN:
                    process.nextFocusItem();
                    break;
                case g.UP:
                    process.prevFocusItem();
                    break;
                case g.ENTER:
                    if ($scope.selectedItem != -1) {
                        process.searchClick($scope.searchSuggest[$scope.selectedItem]);
                    } else {
                        item.itemType = 'engineKeyword';
                        item.title = e.target.value;
                        process.searchClick(item);
                    }
                    break;
                case g.ESC:
                    if ($scope.searchSuggest) {
                        $scope.searchSuggest = [];
                        e.stopPropagation();
                    }
                    break;
                default:
                    $scope.selectedItem = -1;
            }
        }
    };
    process.init();
    $scope.process = process;
}]);
