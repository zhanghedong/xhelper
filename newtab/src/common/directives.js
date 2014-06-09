/**
 * Created by zhanghd on 13-10-9 下午7:50
 * Copyright 2014 , Inc. All rights reserved.
 */
angular.module('app').directive('focusMe', function($timeout, $parse) {
    return {
        //scope: true,   // optionally create a child scope
        link: function(scope, element, attrs) {
            var model = $parse(attrs.focusMe);
            scope.$watch(model, function(value) {
                console.log('value=',value);
                if(value === true) {
                    $timeout(function() {
                        element[0].focus();
                        console.log(element[0]);
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            element.bind('blur', function() {
                console.log('blur');
//                scope.$apply(model.assign(scope, false));
            });
        }
    };
});