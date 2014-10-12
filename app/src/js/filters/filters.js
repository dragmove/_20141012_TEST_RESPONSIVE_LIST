define(['angular', 'underscore'], function(angular, _) {
	'use strict';
	return angular.module('filters', []).

	filter('filterSwitchToOverDoubleFigure', function() {
		return function(input) {
			if(input.length <= 0) return '';

			input = (input + 1).toString();
			if(input.length <= 1) return '0' + input;
			return input;
		};
	}).

	filter('filterPushWhitespaceToCenter', function() {
		return function(input) {
			input = input.toString() || '';
			if(input.length <= 1) return input;

			var output = input,
				centerLength = Math.floor(input.length / 2);
			output = input.substr(0, centerLength) + ' ' + input.substr(centerLength);
			return output;
		};
	});
	
});