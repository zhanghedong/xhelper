/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 ND, Inc. All rights reserved.
 */

angular.module('note', ['config', 'ngSanitize']).controller('noteCtrl', ['$scope', '$sce', '$timeout', 'LocalData', function ($scope, $sce, $timeout, localDataModule) {
    var process = {}, helper = {};
    helper = {
        getLocalNote: function (callback) {
            localDataModule.getUserDataById('note', function (data) {
                data = data && data.data || [];
                callback(data);
            });
        },
        setLocalNote: function (data) {
            localDataModule.putUserData({id: 'note', data: data});
        }

    };
    process = {
        saveNote: function ($event) {
            var note = $event.target.innerHTML;
            helper.setLocalNote(note);
        },
        getNote: function (callback) {
            helper.getLocalNote(function (data) {
                callback(data);
            });
        }
    };
    process.getNote(function (data) {
        $timeout(function () {
            $scope.noteContent = data || '!';
        });
    });
    $scope.process = process;
}]);
