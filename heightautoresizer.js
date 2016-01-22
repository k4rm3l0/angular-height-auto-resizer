(function () {
    'use strict';

    angular.module('heightAutoResizer',[])
        .directive('heightAutoResizer', heightResizer);

    //******************************************************************************************************************
    // AUTO RESIZER DIRECTIVE
    // -----------------------------------------------------------------------------------------------------------------
    // Example: <div height-auto-resizer bottom-offset="50"><div>
    //******************************************************************************************************************
    heightResizer.$inject = ['$window'];
    /* @ngInject */
    function heightResizer ($window){
        return {
            restrict:'A',
            scope:{
                bottom:'@bottomOffset'
            },
            link:fnLink
        };

        //////////////////////////////////////////////////////////////

        function fnLink(scope, element) {

            var parentBottom = scope.bottom && angular.isNumber(parseInt(scope.bottom)) ? parseInt(scope.bottom) : 0;

            changeHeight(); // on page loaded

            angular.element($window).on('resize', function () {
                changeHeight();   // on windows resize
            });

            ///////////////////////////

            function changeHeight(){
                $timeout(
                    function () {

                        var newHeight = angular.element($window).height() -
                                        element[0].getBoundingClientRect().top -
                                        parentBottom;

                        element.css('height', newHeight +'px');
                    }
                );
            }
        }
    }
})();