/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 ND, Inc. All rights reserved.
 */

angular.module('note', ['ngSanitize']).controller('noteCtrl', ['$scope', '$sce', '$timeout', 'LocalData', function ($scope, $sce, $timeout, localDataModule) {
    var process = {}, helper = {},localData={};
    helper = {
        sendMessage: function (msg, callback) {
            chrome.runtime.sendMessage(msg, function (response) {
                callback(response.data);
            });
        }

    };
    localData = {
        getLocalNote: function (callback) {
            helper.sendMessage({action: 'getUserDataById', data: {id: 'note'}}, callback);
        },
        setLocalNote: function (data,callback) {
            helper.sendMessage({action: 'putUserData', data: {id: 'note', data: data}}, callback);
        }
    };
    process = {
        saveNote: function ($event) {
            var note = $event.target.innerHTML;
            localData.setLocalNote(note);
        },
        getNote: function (callback) {
            localData.getLocalNote(function (data) {
                callback(data);
            });
        }
    };
    process.getNote(function (data) {
        $timeout(function () {
            $scope.noteContent = data|| '!';
        });
    });
    $scope.process = process;
}]);
