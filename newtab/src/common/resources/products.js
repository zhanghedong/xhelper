angular.module('resources.products', ['ngResource']);
angular.module('resources.products').factory('Products', function ($resource) {
        return $resource('http://d.com/webui/demo/ihome/server/api/product.php?callback=JSON_CALLBACK&id=:product_id', {product_id: '@product_id'}, {
            query: {method:'JSONP', params:{}, isArray:true},
            get:{method:'JSONP', params:{}, isArray:true},
            save:{method:'JSONP', params:{}, isArray:true},
            remove:{method:'JSONP', params:{}, isArray:true}

        });
});


