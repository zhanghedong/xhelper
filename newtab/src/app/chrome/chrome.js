/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 ND, Inc. All rights reserved.
 */

angular.module('chrome', ['ngSanitize']).controller('chromeCtrl', ['$scope', '$sce', '$timeout', 'LocalData', function ($scope, $sce, $timeout, localDataModule) {
    var process = {}, helper = {},localData={};
    helper = {
        sendMessage: function (msg, callback) {
            chrome.runtime.sendMessage(msg, function (response) {
                callback(response && response.data);
            });
        }

    };
    process = {
        init:function(){
            process.chromeMenu();

        },
        chromeMenu:function(){
            var menu = [
                {
                    href: 'chrome://bookmarks',
                    text: chrome.i18n.getMessage('bookmarks')
                },
                {
                    href: 'chrome://downloads',
                    text: chrome.i18n.getMessage('downloads')
                },
                {
                    href: 'chrome://history',
                    text: chrome.i18n.getMessage('history')
                },
                {
                    href: 'chrome://extensions',
                    text: chrome.i18n.getMessage('extensions')
                },
                {
                    href: 'chrome://settings',
                    text: chrome.i18n.getMessage('settings')
                },
                {
                    href: 'chrome://settings/clearBrowserData',
                    text: chrome.i18n.getMessage('clearHistory')
                }

            ];
            $scope.chromeMenu = menu;
        },
        chromeMenuClick: function (item) {
            $scope.showChromeMenu = !$scope.showChromeMenu;
            helper.sendMessage({action: 'goChromeUrl', data: {url: item.href }}, function () {});
        }
    };
    process.init();
    $scope.process = process;
}]);
