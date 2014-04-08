/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 , Inc. All rights reserved.
 */

angular.module('search', ['config', 'ngSanitize']).controller('searchCtrl', ['$scope', '$sce', '$timeout', '_', 'LocalData', function ($scope, $sce, $timeout, _, localDataModule) {
    var process = {}, helper = {}, config = {};
    config = {
        readyCount: 2,
        bookmarksCount: 3,
        searchCount: 5
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
//            helper.getLocalBlog(function (data) {
//                var i, j;
//                for (i = 0, j = data.length; i < j; i++) {
//
//                }
//            });
        },
        search: function () {
            var sugList = [], i, j, keyword = $scope.keyword || '', nextSug = true, reg = /:\/\/(.[^/]+)/, domain,readyCount=0,bookmarkCount=0;
            if (keyword !== '') {
                helper.getLocalBlog(function (data) {
                    for (i = 0, j = data.length; i < j; i++) {
                        domain = data[i].url.match(reg);
                        domain = domain && domain[1] || '';
                        if (data[i].title.indexOf(keyword) !== -1 || domain.indexOf(keyword) !== -1) {
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
                });
                nextSug && chrome.topSites.get(function (data) {
                    for (i = 0, j = data.length; i < j; i++) {
                        domain = data[i].url.match(reg);
                        domain = domain && domain[1] || '';
                        if (data[i].title.indexOf(keyword) !== -1 || domain.indexOf(keyword) !== -1) {
                            sugList.push(data[i]);
                            bookmarkCount++;
                            if (bookmarkCount >=config.bookmarksCount) {
                                nextSug = false;
                                break;
                            }
                        }
                    }
                    $timeout(function () {
                        $scope.searchSuggest = sugList;
                    });
                    nextSug && helper.getLocalSites(function (data) {
                        for (i = 0, j = data.length; i < j; i++) {
                            domain = data[i].url.match(reg);
                            domain = domain && domain[1] || '';
                            if (data[i].title.indexOf(keyword) !== -1 || domain.indexOf(keyword) !== -1) {
                                sugList.push(data[i]);
                                bookmarkCount++;
                                if (bookmarkCount >=config.bookmarksCount) {
                                    nextSug = false;
                                    break;
                                }
                            }
                        }
                        $timeout(function () {
                            $scope.searchSuggest = sugList;
                        });
                    });
                });
            } else {
                $scope.searchSuggest = [];
            }
        }
    };
    process.init();
    $scope.process = process;
}]);
