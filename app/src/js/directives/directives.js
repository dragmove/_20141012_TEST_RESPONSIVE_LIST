define(['angular', 'tram', 'underscore'], function(angular, tram, _) {
    'use strict';

    var directives = angular.module('directives', [])

    /*
     * resize
     */
    .directive('directiveResize', function($window, $rootScope) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var global = angular.element($window),
                    rootScope = $rootScope;

                //set rootScope variables
                rootScope.windowWidth = 0;
                rootScope.windowHeight = 0;

                scope.getWindowDimension = function() {
                    return {
                        'width': global.width(),
                        'height': global.height()
                    };
                };

                scope.$watch(scope.getWindowDimension, function(newValue, oldValue) {
                    rootScope.windowWidth = newValue.width;
                    rootScope.windowHeight = newValue.height;
                }, true);

                init();

                function init() {
                    global.bind('resize', function() {
                        scope.$apply();
                    });
                }
            }
        };
    })

    /*
     * navigation
     */
    .directive('directive.navigation', function($timeout, $rootScope) {
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            templateUrl: './partials/common/navi.html',
            link: function(scope, element, attrs) {
                var naviContainer = element,
                    addListBtn = null,
                    removeListBtn = null;

                init();

                function init() {
                    addListBtn = element.find('.add-list-btn');
                    addListBtn.bind('click', function(evt) {
                        evt.preventDefault();
                        scope.addListByClick();
                    });

                    removeListBtn = element.find('.remove-list-btn');
                    removeListBtn.bind('click', function(evt) {
                        evt.preventDefault();
                        scope.removeListByClick();
                    });

                    var listContainer = element.find('ul');
                    scope.$watch('menus', function(newValue, oldValue) {
                        // console.log('newValue :', newValue, ', oldValue :', oldValue);
                        // console.log( 'scope.getWindowDimension() :', scope.getWindowDimension() );
                        $timeout(function() {
                            arrangeLists();
                        });
                    }, true);

                    scope.$watch(scope.getWindowDimension, function(newValue, oldValue) {
                        $timeout(function() {
                            arrangeLists();
                        });
                    }, true);

                    function arrangeLists() {
                        var lists = element.find('ul li');

                        var totalListWidth = 0;
                        totalListWidth = lists.length * scope.LIST_WIDTH;
                        // console.log('listContainer.width() :', listContainer.width(), ', totalListWidth:', totalListWidth);

                        if(totalListWidth > listContainer.width()) {
                            // console.log('big');
                            var widthPercentage = parseFloat(100/lists.length).toFixed(3),
                                tmpList;
                            for(var i=0,max=lists.length; i<max; i++) {
                                tmpList = lists[i];
                                angular.element(tmpList).width(widthPercentage + '%');
                            }
                        }else{
                            // console.log('small');
                            var tmpList;
                            for(var i=0,max=lists.length; i<max; i++) {
                                tmpList = lists[i];
                                angular.element(tmpList).width('');
                            }
                        }
                    }
                }
            }
        };
    });

    return directives;
});