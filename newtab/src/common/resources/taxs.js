angular.module('resources.taxs', ['ngResource']);
angular.module('resources.taxs').factory('Taxs', function ($resource) {
        return $resource('http://d.com/webui/demo/ihome/server/api/tax.php?callback=JSON_CALLBACK&id=:tax_id', {tax_id: '@tax_id'}, {
            query: {method:'JSONP', params:{}, isArray:true},
            get:{method:'JSONP', params:{}, isArray:true},
            save:{method:'JSONP', params:{}, isArray:true},
            remove:{method:'JSONP', params:{}, isArray:true}
        });
});

