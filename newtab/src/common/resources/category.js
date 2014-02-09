angular.module('resources.categories', ['ngResource']);

angular.module('resources.categories', ['config']).factory('Categories', ['$resource', 'API', function ($resource, API) {
    var host = API.HOST;
    return {
        getAllCate: (function () {
            return $resource(host + 'product/get_tags/?callback=JSON_CALLBACK', {}, {
                query: {method:'JSONP', params:{}}
            });
        })()
    };
}]);

