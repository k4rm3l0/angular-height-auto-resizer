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
                bottom:'@bottomOffset',
                fixedHeight:'=fixedHeight'
            },
            link:fnLink
        };

        //////////////////////////////////////////////////////////////

        function fnLink(scope, element) {

            // Bottom offset defined by user
            var parentBottom = scope.bottom && angular.isNumber(parseFloat(scope.bottom)) ? parseFloat(scope.bottom) :0;

            // Resize on page loaded
            changeHeight(); 

            // Windows resize listener
            angular.element($window).on('resize', function () {
                changeHeight();
            });

            ///////////////////////////

            function changeHeight(){
                scope.$applyAsync(
                    function () {

                        if(scope.fixedHeight && angular.isNumber( parseInt(scope.fixedHeight) )){
                            element.css('height', scope.fixedHeight);
                            return;
                        }

                        var newHeight = angular.element($window).height() - element[0].getBoundingClientRect().top -
                                        parentBottom;
                        element.css('height', newHeight +'px');
                    }
                );
            }
        }
    }
})();