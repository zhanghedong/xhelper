var ntp = {};
angular.module('app', [
    'underscore',
    'ngRoute',
    'templates.app',
    'resources.sites',
    'bgDirectives',
    'favorites',
    'note',
    'buy'
]);


var process = {
    onClick:function(){
        alert('s');
    }
};

angular.module('app').config(['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', function ($routeProvider, $locationProvider, $httpProvider, $compileProvider) {
        //$locationProvider.html5Mode(true);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|chrome-extension):|data:image\//);
        $routeProvider.when('/note', {
            templateUrl: 'note/note.tpl.html',
            controller: 'noteCtrl'
        }).when('/buy', {
                templateUrl: 'buy/buy.tpl.html',
                controller: 'buyCtrl'
            }).otherwise({redirectTo: '/note'});
    }]).run(function ($route, $http, $templateCache) {
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, {cache: $templateCache});
            }

        });
    })
    .controller('AppCtrl', function ($scope, $location, $window) {
    });