(function () {
    'use strict';

    var module = angular.module('heightAutoResizer',[]);

    //******************************************************************************************************************
    // HEIGHT AUTO RESIZER DIRECTIVE
    //******************************************************************************************************************
    module.directive('heightAutoResizer', heightResizerDirectiveFunction);

    heightResizerDirectiveFunction.$inject = ['$window','heightAutoResizer'];
    /* @ngInject */
    function heightResizerDirectiveFunction ($window, heightAutoResizer){

        function refreshHeight( scope, element ) {

            function setHeight( height) {
                element.css('height', height + 'px');
            }

            scope.$applyAsync(
                function () {
                    var fixedHeight = heightAutoResizer.fixedHeight()   || scope.fixedHeight,
                        parentId    = heightAutoResizer.parentId()      || scope.parentId,
                        bottom      = heightAutoResizer.bottom()        || scope.bottom         || 0;

                    var newHeight = angular.element($window).height();
                    var parentSelector = document.querySelector(parentId);
                    var parent = parentSelector != null ? angular.element(parentSelector) : undefined;

                    if(angular.isDefined(fixedHeight) && angular.isNumber(parseFloat(fixedHeight))) {
                        newHeight = parseFloat(fixedHeight);
                    }

                    if(angular.isDefined(parent)) {
                        newHeight = parent.height() + parent[0].getBoundingClientRect().top;
                    }

                    newHeight = newHeight - element[0].getBoundingClientRect().top - parseFloat(bottom);

                    setHeight(newHeight);
                }
            );
        }

        return {
            restrict: 'A',
            scope: {
                bottom: '@bottomOffset',
                fixedHeight: '=fixedHeight',
                parentId: '@'
            },
            link: function (scope, element) {

                // Windows resize listener
                angular.element($window).on('resize', function () {
                    refreshHeight(scope, element);
                });

                // Resize on page loaded
                refreshHeight(scope, element);
            }
        }
    }

    //******************************************************************************************************************
    // CONFIG PROVIDER
    //******************************************************************************************************************
    module.provider('heightAutoResizer', function () {

        var provider = this;

        var bottom, fixedHeight, parentId;

        this.$get = function () {
            return{
                bottom:function () {
                    return angular.copy(bottom);
                },
                fixedHeight:function () {
                    return angular.copy(fixedHeight);
                },
                parentId:function () {
                    return angular.copy(parentId);
                }
            }
        };

        //////////////////////////////////////////////////////////
        // Getters and Setters
        //////////////////////////////////////////////////////////

        this.bottom = function (value) {
            if(value && angular.isNumber(parseFloat(value))){
                bottom = parseFloat(value);
            }
            return bottom;
        };

        this.fixedHeight = function (value) {
            if(value && angular.isNumber(parseFloat(value))){
                fixedHeight = parseFloat(value);
            }
            return fixedHeight;
        };

        this.parentId = function (value) {
            if(value && value.length > 0){
                parentId = value;
            }
            return parentId;
        };
    });
})();