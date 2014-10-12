define(['angular', 'tram', 'underscore'], function(angular, tram, _) {
    'use strict';

    var directives = angular.module('directives', [])

    /*
     * header
     */
    .directive('directiveHeader', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var logoBtn = element.find('.logo a');

                init();

                function init() {
                    setScopeEvents();
                }

                function setScopeEvents() {
                    logoBtn.bind('click', function(evt) {
                        scope.clickLogo();
                    });
                }
            }
        };
    })

    .directive('directiveContainer', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var contents = element.find('.contents'),
                    footer = element.find('.footer');

                scope.setContainerClickInteraction = function(flag) {
                    setContentsClickInteraction(false);
                    setFooterClickInteraction(false);
                    if(flag === true) {
                        setContentsClickInteraction(flag);
                        setFooterClickInteraction(flag);
                    }
                };
                
                function setContentsClickInteraction(flag) {
                    contents.unbind();

                    if(flag === true) {
                        contents.bind('click', function(evt) {
                            scope.closeNavi();
                        });
                    }
                }

                function setFooterClickInteraction(flag) {
                    footer.unbind();

                    if(flag === true) {
                        footer.bind('click', function(evt) {
                            scope.closeNavi();
                        });
                    }
                }
            }
        };
    })

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
    .directive('directive.displayNaviBtn', function() {
        //directive.display-navi-btn
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            templateUrl: './partials/common/displayNaviBtn.html',
            link: function(scope, element, attrs) {
                var displayNaviBtn = element;

                init();

                function init() {
                    setEvents();
                    setScopeEvents();
                }

                function setEvents() {
                    displayNaviBtn.bind('click', function(evt) {
                        evt.preventDefault();
                        scope.toggleNavi();
                    });
                }

                function setScopeEvents() {
                    scope.displayNaviOpenedIcon = function(flag) {
                        displayNaviOpenedIcon(flag);
                    };
                }

                function displayNaviOpenedIcon(flag) {
                    displayNaviBtn.removeClass('on');
                    if(flag === true) displayNaviBtn.addClass('on');
                }
            }
        };
    })

    .directive('directiveMenu', function() {
        return {
            restrict: 'A',
            replace: false,
            link: function(scope, element, attrs) {
                if(scope.$last) scope.activateNaviBySwitchLocationPath();
            }
        };
    })

    .directive('directiveProject', function() {
        return {
            restrict: 'A',
            replace: false,
            link: function(scope, element, attrs) {
                init();

                function init() {
                    setContents();
                }

                function setContents() {
                    var btn = element.find('.link-project');
                    btn.bind('click', function(evt) {
                        evt.preventDefault();
                        //console.log(scope.project.title);
                    });
                }
            }
        };
    })

    .directive('directive.navigation', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            templateUrl: './partials/common/navi.html',
            link: function(scope, element, attrs) {
                var naviContainer = element,
                    dummyBird = null,
                    birdTmpl = element.find('.bird'),
                    twitterBtn = element.find('.twitter a');

                init();

                function init() {
                    setEvents();
                    setScopeEvents();
                }

                function setEvents() {
                    twitterBtn.bind('mouseover', function(evt) {
                        evt.preventDefault();
                        displayBird();
                    });
                    twitterBtn.bind('mouseout', function(evt) {
                        evt.preventDefault();
                        removeBird();
                    });
                }

                function displayBird() {
                    if(!birdTmpl) return;
                }

                function removeBird() {
                    if(!birdTmpl) return;
                    dummyBird = birdTmpl.clone();

                    var headerElm = element.parent(),
                        twitterBtnRect = twitterBtn.get(0).getBoundingClientRect();

                    var tmpBird, targetRight, targetTop, direction, scaleX;
                    if(scope.screenState !== 'mobile') {
                        dummyBird.css({ top:'42px', right:'5px'});
                        headerElm.prepend(dummyBird);

                        tmpBird = dummyBird;
                        targetRight = _.random(-100, 100);
                        targetTop = -dummyBird.height();
                        direction = (targetRight >= 0) ? 'left' : 'right';
                        scaleX = (direction === 'left') ? -1 : 1;

                        tram(tmpBird)
                            .set({scaleX:scaleX})
                            .add('top 700ms ease-in-out')
                            .add('right 1000ms ease-in-out')
                            .start({top:targetTop, right:targetRight})
                            .then(function() {
                                tmpBird.remove();
                            });
                    }else{
                        dummyBird.css({ top:'138px', right:'78px'});
                        naviContainer.prepend(dummyBird);

                        tmpBird = dummyBird;
                        targetRight = _.random(-100, -25);
                        targetTop = _.random(0, 200);
                        direction = 'right';
                        scaleX = 1;

                        tram(tmpBird)
                            .set({scaleX:scaleX})
                            .add('top 700ms ease-in-out')
                            .add('right 1000ms ease-in-out')
                            .start({top:targetTop, right:targetRight})
                            .then(function() {
                                tmpBird.remove();
                            });
                    }
                    dummyBird = null;
                }

                function activateBtn(index) {
                    var btns = element.find('ul li'),
                        btn;
                    for(var i=0,max=btns.length; i<max; i++) {
                        btn = angular.element( btns.get(i) );
                        if(index !== btn.index()) {
                            btn.find('a').removeClass('on');
                        }else{
                            btn.find('a').addClass('on');
                        }
                    }
                }

                function openNavi(flag) {
                    if(flag) {
                        naviContainer.addClass('on');
                        
                        tram(naviContainer)
                        .stop('height')
                        .add('height 500ms ease-out-expo')
                        .start({height:188})
                        .then(function() {
                            naviContainer.attr('style', '');
                            naviContainer.css('height', 188);
                        });
                    }else{
                        naviContainer.removeClass('on');

                        tram(naviContainer)
                        .stop('height')
                        .add('height 500ms ease-out-expo')
                        .start({height:0})
                        .then(function() {
                            naviContainer.attr('style', '');
                        });
                    }
                }

                function activateNaviByLocationPath(loactionPath) {
                    var obj = _.findWhere( scope.menus, {title:loactionPath.toUpperCase()} ),
                        objIndex = (obj) ? scope.menus.indexOf(obj) : -1;
                    activateBtn(objIndex);
                }

                function restoreNavi(screenState) {
                    naviContainer.removeClass('on');
                    tram(naviContainer).stop('height');
                    naviContainer.css('height', '');
                }

                function setScopeEvents() {
                    scope.activateNavi = function(index, linkTarget) {
                        if(linkTarget !== '_self') return;
                        activateBtn(index);
                        /*
                        scope.emitActivateNavi(index);
                        */
                    };

                    scope.openNavi = function(flag) {
                        openNavi(flag);
                    };

                    scope.restoreNavi = function(screenState) {
                        restoreNavi(screenState);
                    };

                    scope.activateNaviBySwitchLocationPath = function() {
                        activateNaviByLocationPath(scope.locationPath);
                    };

                    scope.$watch('locationPath',function(newValue, oldValue) {
                        activateNaviByLocationPath(newValue);
                    });
                }
            }
        };
    });

    return directives;
});