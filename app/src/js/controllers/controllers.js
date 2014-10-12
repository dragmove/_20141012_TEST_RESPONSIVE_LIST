define(['angular', 'tram'], function(angular, tram) {
    'use strict';

    var controllers = angular.module('controllers', [])

    //const
    .constant('constant.responsiveScreenMinWidth', {
        mobile: 0,
        tablet: 769,
        desktop: 1201
    })

    //global variables
    .value('value.responsiveScreenState', {
        state: ''
    })
    // value('value.depth1', -1).

    /*
     * AppController
     */
    .controller('AppController', ['$scope', 
    '$rootScope',
    '$broadcastControlNavi',
    '$broadcastSwitchResponsiveState',
    '$broadcastSwitchDepth',
    'constant.responsiveScreenMinWidth',
    'value.responsiveScreenState',
    function($scope, 
        $rootScope, 
        broadcastControlNavi, 
        broadcastSwitchResponsiveState,
        broadcastSwitchDepth,
        responsiveScreenMinWidth, 
        responsiveScreenState) {

        //resize
        $rootScope.$watch('windowWidth', function(newValue, oldValue) {
            if(newValue < responsiveScreenMinWidth.tablet) {
                if(responsiveScreenState.state === 'mobile') return;
                responsiveScreenState.state = 'mobile';
                broadcastSwitchResponsiveState.broadcastSwitchResponsiveState('mobile');
                //console.log('mobile');
            }else if(newValue < responsiveScreenMinWidth.desktop) {
                if(responsiveScreenState .state=== 'tablet') return;
                responsiveScreenState.state = 'tablet';
                broadcastSwitchResponsiveState.broadcastSwitchResponsiveState('tablet');
                //console.log('tablet');
            }else{
                if(responsiveScreenState.state === 'desktop') return;
                responsiveScreenState.state = 'desktop';
                broadcastSwitchResponsiveState.broadcastSwitchResponsiveState('desktop');
                //console.log('desktop');
            }
        });
    }])
    
    /*
     * NaviController
     */
    .controller('NaviController', ['$scope', 
        '$location',
        'value.responsiveScreenState', 
        '$broadcastControlNavi', 
        function($scope, $location, responsiveScreenState, broadcastControlNavi) {

        $scope.screenState = responsiveScreenState.state;

        $scope.MAX_LIST_NUM = 20;
        $scope.LIST_WIDTH = 100;
        $scope.LIST_MIN_WIDTH = 50;

        $scope.menus = [{
            'title': 'PROFILE'
        }, {
            'title': 'PORTFOLIO'
        }, {
            'title': 'BLOG'
        }, {
            'title': 'PROFILE'
        }, {
            'title': 'PORTFOLIO'
        }, {
            'title': 'BLOG'
        }];

        $scope.addListByClick = function() {
            $scope.$apply(function() {
                $scope.menus.push({
                    'title': Math.floor(Math.random() * 100000000) + 1
                });
            });
        };

        $scope.removeListByClick = function() {
            $scope.$apply(function() {
                $scope.menus.pop();
            });
        };
        /*
        ul의 width는 가변된다.

        li는 기본 width가 있다.
        ul 안의 li의 최대 갯수는 정해져야 한다.
        */

        //events
        $scope.$on('SWITCH_RESPONSIVE_STATE', function(evt, data) {
            switchResponsiveState(data.state);
        });

        function switchResponsiveState(screenState) {
            broadcastControlNavi.broadcastCloseNavi();

            $scope.screenState = screenState;
        }
    }])

    /*
     * MainController
     */
    .controller('MainController', ['$scope', '$rootScope', 'value.responsiveScreenState', function($scope, $rootScope, responsiveScreenState) {
        $scope.isMobileScreenWidth = false;

        $scope.init = function() {
            resize(responsiveScreenState.state);
        };

        $scope.$on('SWITCH_RESPONSIVE_STATE', function(evt, data) {
            resize(data.state);
        });

        function resize(screenState) {
            switch(screenState) {
                case 'mobile' :
                    $scope.isMobileScreenWidth = true;
                break;

                case 'tablet' :
                    $scope.isMobileScreenWidth = false;
                break;

                case 'desktop' :
                    $scope.isMobileScreenWidth = false;
                break;
            }
        }
    }])

    /*
     * ProfileController
     */
    .controller('ProfileController', ['$scope', '$careers', '$projects', '$author', function($scope, careers, projects, author) {
        $scope.subtitle = 'PROFILE';
        $scope.careers = careers.get();
        $scope.projects = projects.get();
        $scope.email = author.email;
        $scope.phone = {
            calling: author.phone,
            display: getDisplayPhone()
        };

        function getDisplayPhone() {
            return author.phone.split('-').join('.');
        }
    }])

    /*
     * ProfileController
     */
    .controller('PortfolioController', ['$scope', '$portfolios', function($scope, portfolios) {
        $scope.subtitle = 'PORTFOLIO';
        $scope.portfolios = portfolios.get();
    }]);

    return controllers; //angular.module('controllers', []);
});