/**
 * Created by zhanghd on 13-10-11 下午4:39
 * Copyright 2013 17173, Inc. All rights reserved.
 *
 */
angular.module('tax', ['resources.categories'], ['$routeProvider', function ($routeProvider) {

}]);
angular.module('tax',['config']).controller('taxCtrl', ['$scope', '$http', 'Categories','ENV','API', function ($scope, $http, categories,ENV,API) {
    $scope.host= API.HOST;
    console.log(API.HOST);
    categories.getAllCate.query(function(data) {
        if(data.status === 'ok'){
            $scope.taxs = data.data;
        }
    });
}]);
