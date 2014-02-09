angular.module('app', [
    'ngRoute',
    'templates.app',
    'angular-gestures',
    'resources.products',
    'resources.categories',
    'tax',
    'home'
]);

angular.module('app').config(['$routeProvider', '$locationProvider', '$httpProvider', function ($routeProvider, $locationProvider, $httpProvider) {
        //$locationProvider.html5Mode(true);
        $routeProvider.when('/home', {
            templateUrl: 'home/home.tpl.html',
            controller: 'homeCtrl'
        }).when('/tax', {
                templateUrl: 'tax/tax.tpl.html',
                controller: 'taxCtrl'
            }).otherwise({redirectTo: '/home'});


    }]).run(function ($route, $http, $templateCache) {
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, {cache: $templateCache});
            }
        });
    })
    .controller('AppCtrl', function ($scope, $location, $window) {
        var g = {}, process = {}, helper = {};
        $scope.$location = $location;
        $scope.$back = function () {
            window.history.back();
        };
        g.config = {
            offsetLeftWidth: 0.5,
            offsetRightWidth: 0.6
        };
        g.params = {
            winWidth: $window.innerWidth,
            activeOpen: 0 //当前打开状态：  0未打开 1左侧打开 2右侧打开
        };
        helper = {
            getMaxOffset: function (direction) {
                return ( direction === 'left' ? parseInt(g.params.winWidth * g.config.offsetLeftWidth, 10) : parseInt(g.params.winWidth * g.config.offsetRightWidth, 10) );
            }
        };
        process = {

        };
    });