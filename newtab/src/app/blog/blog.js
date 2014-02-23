/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 ND, Inc. All rights reserved.
 */

angular.module('blog', ['config', 'ngSanitize']).controller('blogCtrl', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
    var process = {};
    process = {
        onClick:function(){
        },
        init: function () {
        }
    };


    ntp.localData.getBlog(function(data){
        console.log(data);
        $timeout(function(){
            if(data.length){
                $scope.blogs = data.reverse();
            }
        });
    });
    process.init();
    $scope.process = process;
}]);
