/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 ND, Inc. All rights reserved.
 */

angular.module('blog', ['config', 'ngSanitize']).controller('blogCtrl', ['$scope', '$sce', '$timeout', '_', function ($scope, $sce, $timeout, _) {
    var process = {};
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
            ntp.localData.getBlog(function (data) {
                $timeout(function () {
                    if (data.length) {
                        $scope.blogs = data;
                    }
                });
            });
        },
        deleteBlog: function (url) {
            ntp.localData.getBlog(function (data) {
                for (var i = 0, j = data.length; i < j; i++) {
                    if (data[i].url === url) {
                        data.splice(i, 1);
                        break;
                    }
                }
                $timeout(function () {
                    $scope.blogs = data;
                    ntp.localData.setBlog(data);
                });
            });
        }
    };
    process.init();
    $scope.process = process;
}]);
