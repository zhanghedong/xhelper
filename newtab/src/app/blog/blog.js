/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 , Inc. All rights reserved.
 */

angular.module('blog', ['config', 'ngSanitize']).controller('blogCtrl', ['$scope', '$sce', '$timeout', '_', 'LocalData', function ($scope, $sce, $timeout, _, localDataModule) {
    var process = {}, helper = {};
    helper = {
        getLocalBlog: function (callback) {
            localDataModule.getUserDataById('blog', function (data) {
                data = data && data.data || [];
                callback(data);
            });
        },
        setLocalBlog:function(data){
            localDataModule.putUserData({id: 'blog', data: data});
        }
    };
    process = {
        onClick: function () {
        },
        init: function () {
            process.resetBlog();
            process.onMessage();
        },
        onMessage: function () {
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    if (request.action === 'updateToReadBlog') {
                        process.resetBlog();
                    }
                    return true;
                });

        },
        resetBlog: function () {
            helper.getLocalBlog(function (data) {
                $timeout(function () {
                    if (data.length) {
                        $scope.blogs = data;
                    }
                });
            });
        },
        deleteBlog: function (url) {
            helper.getLocalBlog(function (data) {
                for (var i = 0, j = data.length; i < j; i++) {
                    if (data[i].url === url) {
                        data.splice(i, 1);
                        break;
                    }
                }
                $timeout(function () {
                    $scope.blogs = data;
                    helper.setLocalBlog(data);
                });
            });
        }
    };
    process.init();
    $scope.process = process;
}]);
