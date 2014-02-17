/**
 * Created by zhanghd on 13-10-11 下午4:39
 * Copyright 2013 17173, Inc. All rights reserved.
 */
angular.module('home', ['resources.sites'], ['$routeProvider', function ($routeProvider) {

}]);
angular.module('home', ['config']).controller('homeCtrl', ['$scope', '$timeout', 'Sites', function ($scope, $timeout, sites) {
    var helper = null, configIcon = null, localSites = [], dataModule, process = {};
    configIcon = {
        "www.google.com": {"icon": "/resource/logo/google.svg", "bgColor": "#3369E8"},
        "microsoft.com": { "bgColor": "#7CBB00"}
    };

    helper = {
        getDomain: function (url) {
            var r = /:\/\/(.[^/]+)/;
            return url.match(r)[1];
        },
        getLocalSites: function (callback) {
            ntp.localData.getLocalSites(function (data) {
                if (!data.length) {//本地有数据
                    ntp.localData.getTopSites(function (d) {
                        d = d || [];
                        d.length = d.length > 10 ? 10 : d.length;
                        for (var i = 0, j = d.length; i < j; i++) {
                            var domain = helper.getDomain(d[i].url);
                            d[i].letter = domain.substr(0, 2);
                            d[i].icon = configIcon[domain] && configIcon[domain].icon || '';
                            d[i].bgColor = configIcon[domain] && configIcon[domain].bgColor || '';
                        }
                        var localSites = [
                            {
                                "id": 1,
                                "name": "Recommended",
                                "items": d
                            }
                        ];
                        ///这里取服务器数据
                        var tempSites = localSites[0].items;
                        sites.query(function (data) {
                            for (var i = 0, j = data.length; i < j; i++) {
                                var domain = helper.getDomain(data[i].url), exist = false, tempDomain = '';
                                //判断本地与服务端数据是否有重复
                                for (var m = 0, n = tempSites.length; m < n; m++) {
                                    tempDomain = helper.getDomain(tempSites[m].url);
                                    if (tempDomain == domain) {
                                        exist = true;
                                        break;
                                    }
                                }
                                if (!exist) {
                                    data[i].letter = domain.substr(0, 2);
                                    localSites[0].items.push(data[i]);
                                }
                                exist = false;
                            }
                            ntp.localData.setLocalSites(localSites);
                        });
                        callback(localSites);
                    });
                } else {
                    callback(data);
                }
            });
        }
    };
    //获取数据
    helper.getLocalSites(function (data) {
        var localSites = data;
        $timeout(function () {
            $scope.localSites = localSites;
        });
    });

    process = {
        insertCategory: function () {
        }
    };
    $scope.process = process;

}]);
