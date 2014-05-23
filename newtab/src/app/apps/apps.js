/**
 * Created by zhanghd on 14-2-24 下午5:58
 * Copyright 2013 ND, Inc. All rights reserved.
 */
angular.module('apps', ['ngSanitize']).controller('appsCtrl', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
    var process = {};
    process = {
        onClick:function(){
        },
        init: function () {
            chrome.management.getAll(function(data){
                $timeout(function(){
                    var i,j,item,items=[];
                    for(i = 0,j = data.length;i<j;i++){
                        item = data[i];
                        if(item.isApp == 'true'){
                            item.icon = item.icons[item.icons.length - 1].url;
                        }
                        items.push(item);

                    }
                    console.log(items);
                    $scope.apps = items;

                });
            });
        },
        launchApp:function(id,event){
            chrome.management.launchApp(id, function(){
            });
        }
    };
    process.init();
    $scope.process = process;
}]);
