/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 , Inc. All rights reserved.
 */

angular.module('weather', ['ngSanitize']).controller('weatherCtrl', ['$scope', '$sce', '$timeout', '_', 'LocalData', '$http', '$templateCache', function ($scope, $sce, $timeout, _, localDataModule, $http, $templateCache) {
    var process = {}, helper = {};
    $scope.weather = {};
    $scope.tomorrow = {};
    $scope.afterTomorrow = {};
    helper = {
        sendMessage: function (msg, callback) {
            chrome.runtime.sendMessage(msg, function (response) {
                callback(response);
            });
        },
        getSymbol: function (unit) {
            if (unit === "imperial") {
                return '°F';
            } else {
                return '℃';
            }
        }
    };
    process = {
        init: function () {
            process.setWeather();
        },
        setWeather: function () {
            helper.sendMessage({action: 'getWeather'}, function (data) {
                $timeout(function () {
//                    $scope.weather = data;
                    $scope.weather.temp = data.main.temp + helper.getSymbol(data.tempUnit);
                    $scope.weather.desc = data.weather[0].description;
                    $scope.weather.id = data.weather[0].id;
//                    console.log($scope.weather);
                });
            });
            helper.sendMessage({action: 'getForecastWeather'}, function (data) {
                $timeout(function () {
                    $scope.tomorrow.min = parseInt(data.list[0].temp.min) + helper.getSymbol(data.tempUnit);
                    $scope.tomorrow.max = parseInt(data.list[0].temp.max) + helper.getSymbol(data.tempUnit);
                    $scope.tomorrow.desc = data.list[1].weather[0].description;
                    $scope.tomorrow.id= data.list[1].weather[0].id;
                    $scope.afterTomorrow.min = parseInt(data.list[1].temp.min) + helper.getSymbol(data.tempUnit);
                    $scope.afterTomorrow.max = parseInt(data.list[1].temp.max) + helper.getSymbol(data.tempUnit);
                    $scope.afterTomorrow.desc = data.list[1].weather[0].description;
                    $scope.afterTomorrow.id= data.list[1].weather[0].id;
                });
                console.log(data);
            });
        }
    };
    process.init();
//    $scope.process = process;
}]);
