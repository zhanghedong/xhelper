angular.module('resources.sites', ['ngResource']);
angular.module('resources.sites').factory('Sites', function ($resource) {
    return $resource('http://d.com/apps/newtab/xhr/sites.php?id=:site_id', {}, {
        query: {method: 'JSON', params: {}, isArray: true},
        get: {method: 'JSON', params: {}, isArray: true},
        save: {method: 'JSON', params: {}, isArray: true},
        remove: {method: 'JSON', params: {}, isArray: true}
    });
});


