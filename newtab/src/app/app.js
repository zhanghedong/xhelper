angular.module('app', [
    'ngRoute',
    'templates.app',
    'home'
]);

angular.module('app').config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        //$locationProvider.html5Mode(true);
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