/**
 * Created by zhanghd on 13-10-11 下午4:39
 * Copyright 2013 17173, Inc. All rights reserved.
 */
angular.module('home', [], ['$routeProvider', function ($routeProvider) {

}]);
angular.module('home', ['config']).controller('homeCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        chrome.topSites.get(function (d) {
            $timeout(function(){
                d.length = 10;
                $scope.items = d;
            })
        });

    }]).directive('getTopSites', function () {

    });
