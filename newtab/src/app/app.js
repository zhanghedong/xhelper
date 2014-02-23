var ntp = {};
angular.module('app', [
    'underscore',
    'ngRoute',
    'templates.app',
    'resources.sites',
    'bgDirectives',
    'favorites',
    'note',
    'buy',
    'blog'
]);


var process = {
    onClick: function () {
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
            }).when('/blog', {
                templateUrl: 'blog/blog.tpl.html',
                controller: 'blogCtrl'
            }).otherwise({redirectTo: '/note'});
    }]).run(function ($route, $http, $templateCache) {
        angular.forEach($route.routes, function (r) {
            if (r.templateUrl) {
                $http.get(r.templateUrl, {cache: $templateCache});
            }

        });
    })
    .controller('AppCtrl', function ($scope, $location, $window) {
        $scope.title = chrome.i18n.getMessage('title');
        console.log(chrome.i18n.getMessage('title'));
//        chrome.runtime.getBackgroundPage(function(bgScript){
//            console.log(bgScript);
//
//            bgScript.backgroundProcess.installed();
//        });
//        chrome.runtime.sendMessage({getCounters: true}, function (response) {
//            log("In-memory counter is: " + response.counter);
//            log("Persisted counter is: " + response.persistentCounter);
//        });
//        chrome.notifications.create(
//            "id1", {
//                type: "basic",
//                iconUrl: "image1.png",
//                title: "Althe Frazon",
//                message: "Hi, what's going on tonight?",
//                buttons: [
//                    { title: "Call",
//                        iconUrl: "call.png"},
//                    { title: "Send Email",
//                        iconUrl: "email.png"}
//                ],
//                priority: 0},
//            function () {
//            }
//
//        );
    });