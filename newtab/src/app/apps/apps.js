/**
 * Created by zhanghd on 14-2-24 下午5:58
 * Copyright 2013 ND, Inc. All rights reserved.
 */
angular.module('apps', ['config', 'ngSanitize']).controller('appsCtrl', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
    var process = {};
    process = {
        onClick:function(){
        },
        init: function () {
            chrome.management.getAll(function(data){
                $timeout(function(){
                    $scope.apps = data;
                });
            });
        },
        launchApp:function(id,event){
            chrome.management.launchApp(id, function(){
            });
        }
    };
    process.init();
    $scope.process = process;
}]);
