/**
 * Created by zhanghd on 14-2-24 下午5:58
 * Copyright 2013 ND, Inc. All rights reserved.
 */
angular.module('side', ['ngSanitize']).controller('sideCtrl', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
    var process = {};
    process = {
        onClick: function (idx) {
            $scope.selectedItem = idx;
        },
        init: function () {
            $scope.selectedItem = 0;//default note
            $timeout(function () {
                var i, j, items = [
                    {
                        href: '#/note',
                        text: 'note',
                        cls:'note',
                        title: 'tickler'
                    },
                    {
                        href: '#/blog',
                        text: 'read later',
                        cls:'ready',
                        title: 'read later'
                    },
                    {
                        href: '#/apps',
                        text: 'apps',
                        cls:'apps',
                        title: 'chrome apps'
                    },
                    {
                        href:'#/chrome',
                        text:'chrome',
                        cls:'chrome',
                        title:'chrome menu'
                    }
                ];
                $scope.sides = items;
            });
        }
    };
    process.init();
    $scope.process = process;
}]);
