/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 , Inc. All rights reserved.
 */

angular.module('blog', [ 'ngSanitize']).controller('blogCtrl', ['$scope', '$sce', '$timeout', '_', 'LocalData', function ($scope, $sce, $timeout, _, localDataModule) {
    var process = {}, helper = {}, localData = {};
    helper = {
        sendMessage: function (msg, callback) {
            chrome.runtime.sendMessage(msg, function (response) {
                callback(response && response.data);
            });
        },
        onMessage: function () {
            chrome.runtime.onMessage.addListener(
                function (request, sender, sendResponse) {
                    if (request.action === 'updateToReadBlog') {
                        process.resetBlog();
                    }
                    return true;
                });

        }
    };
    localData = {
        getLocalBlog: function (callback) {
            helper.sendMessage({action: 'getUserDataById', data: {id: 'blog'}}, callback);
        },
        setLocalBlog: function (data, callback) {
            helper.sendMessage({action: 'putUserData', data: {id: 'blog', data: data}}, callback);
        }
    };
    process = {
        onClick: function () {
        },
        init: function () {
            process.resetBlog();
            helper.onMessage();
        },
        resetBlog: function () {
            localData.getLocalBlog(function (data) {
                $timeout(function () {
                    if (data.length) {
                        $scope.blogs = data;
                    }
                });
            });
        },
        deleteBlog: function (url) {
            localData.getLocalBlog(function (data) {
                for (var i = 0, j = data.length; i < j; i++) {
                    if (data[i].url === url) {
                        data.splice(i, 1);
                        break;
                    }
                }
                $timeout(function () {
                    $scope.blogs = data;
                    localData.setLocalBlog(data);
                });
            });
        }
    };
    process.init();
    $scope.process = process;
}]);
