angular.module('resources.baidu', ['ngResource']);
angular.module('resources.baidu').factory('Baidu', function ($resource) {
    return $resource('http://unionsug.baidu.com/su?wd=abc&cb=&_=1397047412695', {}, {
        query: {method: 'JSON', params: {}, isArray: true},
        get: {method: 'JSON', params: {}, isArray: true},
        save: {method: 'JSON', params: {}, isArray: true},
        remove: {method: 'JSON', params: {}, isArray: true}
    });
});


