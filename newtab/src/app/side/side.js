/**
 * Created by zhanghd on 14-2-24 下午5:58
 * Copyright 2013 ND, Inc. All rights reserved.
 */
angular.module('side', ['ngSanitize']).controller('sideCtrl', ['$scope', '$sce', '$timeout', '$location', function ($scope, $sce, $timeout, $location) {
    var process = {};
    process = {
        onClick: function (idx) {
            $scope.selectedItem = idx;
        },
        init: function () {
            $timeout(function () {
                var i, j,path, items = [
                    {
                        href: '#/note',
                        text: 'note',
                        cls: 'note',
                        title: 'tickler'
                    },
                    {
                        href: '#/blog',
                        text: 'read later',
                        cls: 'ready',
                        title: 'read later'
                    },
                    {
                        href: '#/apps',
                        text: 'apps',
                        cls: 'apps',
                        title: 'chrome apps'
                    },
                    {
                        href: '#/chrome',
                        text: 'chrome',
                        cls: 'chrome',
                        title: 'chrome menu'
                    }
                ];
                 path = '#' + $location.$$path;
                for (i = 0, j = items.length; i < j; i++) {
                    if (items[i].href === path) {
                        $scope.selectedItem = i;//default note
                    }
                }
                $scope.sides = items;
            });
        }
    };
    process.init();
    $scope.process = process;
}]);
