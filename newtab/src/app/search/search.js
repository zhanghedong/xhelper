/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 , Inc. All rights reserved.
 */

angular.module('search', ['config', 'ngSanitize']).controller('searchCtrl', ['$scope', '$sce', '$timeout', '_', 'LocalData',  '$http', '$templateCache', function ($scope, $sce, $timeout, _, localDataModule,$http, $templateCache) {
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
            $scope.selectedItem = 0;
            process.watch();
//            helper.getLocalBlog(function (data) {
//                var i, j;
//                for (i = 0, j = data.length; i < j; i++) {
//
//                }
//            });
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
                        nextSug && chrome.topSites.get(function (data) {
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
                        nextSug && helper.getLocalSites(function (data) {
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
                        });

                    });


                } else {
                    $scope.searchSuggest = [];
                }
            })
        },
        nextFocusItem: function () {
            if ($scope.selectedItem >= $scope.searchSuggest.length-1) {
                $scope.selectedItem = 0;
            } else {
                $scope.selectedItem++;
            }
        },
        prevFocusItem: function () {
            if ($scope.selectedItem > 0) {
                $scope.selectedItem--;
            } else {
                $scope.selectedItem = $scope.searchSuggest.length-1;
            }
        },
        searchClick:function(item){
            console.log(item);
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
                    $scope.searchSuggest && ($scope.searchSuggest = null, e.stopPropagation());
            }
        }
    };
    process.init();
    $scope.process = process;
}]);
