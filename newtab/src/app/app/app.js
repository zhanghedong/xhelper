/**
 * Created by zhanghd on 14-2-24 下午5:58
 * Copyright 2013 ND, Inc. All rights reserved.
 */
angular.module('app', ['config', 'ngSanitize']).controller('appCtrl', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
    var process = {};
    process = {
        onClick:function(){
        },
        init: function () {
        }
    };
    process.init();
    $scope.process = process;
}]);
