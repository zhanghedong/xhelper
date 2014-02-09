/**
 * Created by zhanghd on 13-10-11 下午4:39
 * Copyright 2013 17173, Inc. All rights reserved.
 */
angular.module('home', ['resources.products'], ['$routeProvider', function ($routeProvider) {

}]);
angular.module('home',['config']).controller('homeCtrl', ['$scope', '$http', 'Products','ENV','API', function ($scope, $http, products,ENV,API) {
    console.log(ENV);
    $scope.ENV = API.HOST;
    $scope.sportImages = [];
    products.query(function (products) {
//        $scope.products = products;
    });
//    products.get({'product_id':3},function(data){
//        console.log(data);
//        $scope.product = data;
//    });
    for (var j=1; j<5; j++) {
        $scope.sportImages.push('images/pic/' + j + '.jpg');
    }
}]);
