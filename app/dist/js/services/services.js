define(['angular', 'angular-resource'], function(angular, $resource) {
	'use strict';

	var services = angular.module('services', ['ngResource']).

	/*
	 * constant
	 */
	constant('$author', {
		nick: 'dragmove',
		email: 'dragmove@naver.com',
		phone: '010-8863-2191'
	}).

	/*
	 * factory
	 */
	factory('$broadcastSwitchDepth', function($rootScope) {
		function broadcastGoMainPage() {
			$rootScope.$broadcast('GO_MAIN_PAGE', {data:null});
		}
		
		return {
			broadcastGoMainPage: broadcastGoMainPage
		};
	}).

	factory('$broadcastSwitchResponsiveState', function($rootScope) {
		function broadcastSwitchResponsiveState(screenState) {
			$rootScope.$broadcast('SWITCH_RESPONSIVE_STATE', {state:screenState});
		}

		return {
			broadcastSwitchResponsiveState: broadcastSwitchResponsiveState
		};
	}).

	factory('$broadcastControlNavi', function($rootScope) {
		function broadcastToggleNavi() {
			$rootScope.$broadcast('TOGGLE_NAVI', {data:null});
		}

		function broadcastOpenNavi() {
			$rootScope.$broadcast('OPEN_NAVI', {data:null});
		}

		function broadcastCloseNavi() {
			$rootScope.$broadcast('CLOSE_NAVI', {data:null});
		}

		return {
			broadcastToggleNavi: broadcastToggleNavi,
			broadcastOpenNavi: broadcastOpenNavi,
			broadcastCloseNavi: broadcastCloseNavi
		};
	}).

	factory('$careers', ['$resource', function($resource) {
		return $resource('http://agile-oasis-5771.herokuapp.com/data/careers', {}, {
			'get': {
				method: 'GET',
				params: '',
				isArray: true
			}
		});
	}]).

	factory('$projects', ['$resource', function($resource) {
		return $resource('http://agile-oasis-5771.herokuapp.com/data/awards', {}, {
			'get': {
				method: 'GET',
				params: '',
				isArray: true
			}
		});
	}]).

	factory('$portfolios', ['$resource', function($resource) {
		return $resource('data/portfolios.json', {}, {
			'get': {
				method: 'GET',
				params: '',
				isArray: true
			}
		});
	}]);

	return services;
});