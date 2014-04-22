/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 , Inc. All rights reserved.
 */

angular.module('weather', ['ngSanitize']).controller('weatherCtrl', ['$scope', '$sce', '$timeout', '_', 'LocalData', '$http', '$templateCache', function ($scope, $sce, $timeout, _, localDataModule, $http, $templateCache) {
   var process = {};
    process.init();
    $scope.process = process;
}]);
