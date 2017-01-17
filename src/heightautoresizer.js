(function () {
    'use strict';

    var module = angular.module('heightAutoResizer',[]);

    //******************************************************************************************************************
    // HEIGHT AUTO RESIZER DIRECTIVE
    // -----------------------------------------------------------------------------------------------------------------
    // Example: <div height-auto-resizer bottom-offset="50" parent-id="'#parent'"><div>
    //******************************************************************************************************************
    module.directive('heightAutoResizer', heightResizerDirectiveFunction);

    heightResizerDirectiveFunction.$inject = ['$window','heightAutoResizer'];
    /* @ngInject */
    function heightResizerDirectiveFunction ($window, heightAutoResizer){

        function refreshHeight( scope, element, bottom ) {
            scope.$applyAsync(
                function () {

                    var newHeight = angular.element($window).height();
                    var parent = angular.element(document.querySelector(scope.parentId));

                    if (scope.fixedHeight && angular.isNumber(parseInt(scope.fixedHeight))) {
                        newHeight = scope.fixedHeight - element[0].getBoundingClientRect().top - bottom;
                        element.css('height', newHeight);
                        return;
                    }

                    if (scope.parentId && scope.parentId.length > 0 && parent) {
                        newHeight = parent.height();
                    }

                    newHeight = newHeight - element[0].getBoundingClientRect().top - bottom;

                    element.css('height', newHeight + 'px');
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

                // Bottom offset defined by user
                var parsedBottom = parseFloat(scope.bottom);
                var bottom = scope.bottom && angular.isNumber(parsedBottom) ? parsedBottom : 0;

                // Windows resize listener
                angular.element($window).on('resize', function () {
                    refreshHeight(scope, element, bottom);
                });

                // Resize on page loaded
                refreshHeight(scope, element, bottom);
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
                    return provider.bottom();
                },
                fixedHeight:function () {
                    return provider.fixedHeight();
                },
                parentId:function () {
                    return provider.parentId();
                }
            }
        };

        //////////////////////////////////////////////////////////
        // Getters and Setters
        //////////////////////////////////////////////////////////

        this.bottom = function ( value ) {
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