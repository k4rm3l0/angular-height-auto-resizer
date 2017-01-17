(function () {
    'use strict';

    angular.module('heightAutoResizer',[])
        .directive('heightAutoResizer', heightResizer);

    //******************************************************************************************************************
    // AUTO RESIZER DIRECTIVE
    // -----------------------------------------------------------------------------------------------------------------
    // Example: <div height-auto-resizer bottom-offset="50" parent-id="'#parent'"><div>
    //******************************************************************************************************************
    heightResizer.$inject = ['$window'];
    /* @ngInject */
    function heightResizer ($window){

        function refreshHeight( scope, element ) {
            scope.$applyAsync(
                function () {

                    var newHeight = angular.element($window).height();
                    var parent = angular.element(document.querySelector(scope.parentId));

                    if (scope.fixedHeight && angular.isNumber(parseInt(scope.fixedHeight))) {
                        element.css('height', scope.fixedHeight);
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
                    refreshHeight(scope, element);
                });

                // Resize on page loaded
                refreshHeight(scope, element);
            }
        }
    }
})();