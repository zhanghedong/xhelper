/**
 * Created by zhanghd on 13-10-11 下午4:39
 * Copyright 2013 17173, Inc. All rights reserved.
 */
angular.module('home', [], ['$routeProvider', function ($routeProvider) {

}]);
angular.module('home',['config']).controller('homeCtrl', ['$scope', function ($scope) {
    $scope.items = [{
        bgColor:'#51B46D'
    },{
        bgColor:'#9D8AC7'
    },{
        bgColor:'#62707D'
    },{
        bgColor:'#62707D'
    },{
        bgColor:'#B7C0C7'
    }];
}]);
