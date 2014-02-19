/**
 * Created by zhanghd on 14-2-17 下午4:14
 * Copyright 2013 ND, Inc. All rights reserved.
 */

angular.module('note', ['config']).controller('noteCtrl', ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
    var process = {};

    process = {
        saveNote: function () {
            var note = $sce.trustAsHtml($scope.noteContent);
            ntp.localData.setNote(note);
        },
        getNote: function () {
             ntp.localData.getNote(function(data){
                 return $sce.trustAsHtml(data) || '下班，去市场带条鱼~~';
             })
        }

    };
    $scope.noteContent = process.getNote();// '下班，去市场带条鱼。';
    $scope.process = process;


}]);
