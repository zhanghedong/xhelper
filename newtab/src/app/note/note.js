/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 ND, Inc. All rights reserved.
 */

angular.module('note', ['config', 'ngSanitize']).controller('noteCtrl', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
    var process = {};

    process = {
        saveNote: function ($event) {
            var note = $event.target.innerHTML;
            ntp.localData.setNote(note);
        },
        getNote: function (callback) {
            ntp.localData.getNote(function (data) {
                callback(data);
            });
        }

    };
    process.getNote(function (data) {
        $timeout(function () {
            $scope.noteContent = data || '晚上陪老婆吃饭!';
        });
    });
//    $scope.noteContent = '晚上陪老婆吃饭!';
    $scope.process = process;


}]);
