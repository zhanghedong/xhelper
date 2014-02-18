var ntp = {};
angular.module('app', [
    'underscore',
    'ngRoute',
    'templates.app',
    'resources.sites',
    'home',
    'bgDirectives'
]);
//app.config(['$compileProvider', function($compileProvider) {
//    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel):/);
//}]);
angular.module('app').config(['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', function ($routeProvider, $locationProvider, $httpProvider, $compileProvider) {
        //$locationProvider.html5Mode(true);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|chrome-extension):|data:image\//);
        $routeProvider.when('/home', {
            templateUrl: 'home/home.tpl.html',
            controller: 'homeCtrl'
        }).otherwise({redirectTo: '/home'});
    }]).run(function ($route, $http, $templateCache) {
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, {cache: $templateCache});
            }
        });
    })
    .controller('AppCtrl', function ($scope, $location, $window) {
    });