/**
 * Created by zhanghd on 13-10-11 下午4:39
 * Copyright 2013 17173, Inc. All rights reserved.
 */
angular.module('home', ['resources.sites'], ['$routeProvider', function ($routeProvider) {

}]);
angular.module('home', ['config']).controller('homeCtrl', ['$scope', '$timeout', 'Sites', function ($scope, $timeout, sites) {
        var helper = null, configIcon = null, localSites = [], dataModule;
        helper = {
            getDomain: function (url) {
                var r = /:\/\/(.[^/]+)/;
                return url.match(r)[1];
            },
            getLocalSites: function (callback) {
                ntp.localData.getLocalSites(function (data) {
                    if (!data.length) {//本地有数据
                        ntp.localData.getTopSites(function (d) {
                            d.length = d.length > 10 ? 10: d.length;
                            for (var i = 0, j = d.length; i < j; i++) {
                                var domain = helper.getDomain(d[i].url);
                                d[i].icon = configIcon[domain] && configIcon[domain].icon || '';
                                d[i].bgColor = configIcon[domain] && configIcon[domain].bgColor || '';
                            }
                            var localSites = [{
                                "id": 1,
                                "name": "Recommended",
                                "items": d
                            }];
                            ntp.localData.setLocalSites(localSites);
                            ///这里取服务器数据
                            callback(localSites)
                        });
                    } else {
                        console.log(data);
                        callback(data);
                    }
                });
            }
        };
        configIcon = {
            "www.google.com": {"icon": "/resource/logo/google.svg", "bgColor": "#3369E8"},
            "microsoft.com": { "bgColor": "#7CBB00"}
        };

        helper.getLocalSites(function (data) {
            data = data[0].items;
            localSites = data;
            sites.query(function (data) {
                for (var i = 0, j = data.length; i < j; i++) {
                    var domain = helper.getDomain(data[i].url);
                    data[i].letter = domain.substr(0, 2);
                    localSites.push(data[i]);
                }
                $timeout(function () {
                    $scope.items = localSites;
                });
            });
//            $timeout(function () {
//                $scope.items = localSites;
//            });
        });

    }]);
