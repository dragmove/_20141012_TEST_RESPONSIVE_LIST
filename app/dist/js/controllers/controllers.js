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

        //eventHandler
        /*
        $scope.$on('ACTIVATE_NAVI', function(event, index) {
            event.stopPropagation();
            console.log('index from NaviController :', index);
        });
        */

        $scope.$on('OPEN_NAVI', function(event) {
            $scope.displayNaviOpenedIcon(true);
            $scope.setContainerClickInteraction(true);
        });

        $scope.$on('CLOSE_NAVI', function(event) {
            $scope.displayNaviOpenedIcon(false);
            $scope.setContainerClickInteraction(false);
        });

        //events from directive.displayNaviBtn
        $scope.toggleNavi = function() {
            broadcastControlNavi.broadcastToggleNavi();
            // $rootScope.$broadcast('TOGGLE_NAVI', {data:null});
        };

        $scope.closeNavi = function() {
            broadcastControlNavi.broadcastCloseNavi();
            // $rootScope.$broadcast('CLOSE_NAVI', {data:null});
        };

        $scope.clickLogo = function() {
            broadcastSwitchDepth.broadcastGoMainPage();
            // $rootScope.$broadcast('GO_MAIN_PAGE', {data:null});
        };

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

        $scope.locationPath = $location.path().substr(1);
        $scope.screenState = responsiveScreenState.state;
        $scope.isOpenNavi = false;
        $scope.menus = [{
            'class': 'profile',
            'href': '#/profile',
            'target': '_self',
            'title': 'PROFILE'
        }, {
            'class': 'portfolio',
            'href': '#/portfolio',
            'target': '_self',
            'title': 'PORTFOLIO'
        }, {
            'class': 'blog',
            'href': 'http://blog.naver.com/dragmove',
            'target': '_blank',
            'title': 'BLOG'
        }];

        //methods
        $scope.getLowerCaseTitle = function(str) {
            return angular.lowercase(str);
        };

        $scope.getFlagOpenNavi = function() {
            return $scope.isOpenNavi;
        };

        /*
        $scope.emitActivateNavi = function(index) {
            $scope.$emit('ACTIVATE_NAVI', index);
        };
        */

        //events
        $scope.$on('TOGGLE_NAVI', function(evt, data) {
            $scope.openNavi(!$scope.isOpenNavi);
            $scope.isOpenNavi = !$scope.isOpenNavi;

            if($scope.isOpenNavi) {
                broadcastControlNavi.broadcastOpenNavi();
            }else{
                broadcastControlNavi.broadcastCloseNavi();
            }
        });

        $scope.$on('CLOSE_NAVI', function(evt, data) {
            $scope.openNavi(false);
            $scope.isOpenNavi = false;
        });

        $scope.$on('SWITCH_RESPONSIVE_STATE', function(evt, data) {
            switchResponsiveState(data.state);
        });

        $scope.$on('GO_MAIN_PAGE', function(evt, data) {
            $scope.activateNavi(-1, '_self');
        });

        $scope.$on('$locationChangeStart', function(event) {
            $scope.locationPath = $location.path().substr(1);
        });

        function switchResponsiveState(screenState) {
            broadcastControlNavi.broadcastCloseNavi();

            $scope.restoreNavi(screenState);
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