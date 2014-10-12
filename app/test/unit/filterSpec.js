define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
	'use strict';

	describe('filters', function() {
		var $filter;

		beforeEach(mocks.module('filters'));
		beforeEach(mocks.inject(function(_$filter_) {
			$filter = _$filter_;
		}));

		describe('filterSwitchToOverDoubleFigure', function() {
			it('should return (input + 1).toString()', function() {
				var input = 0, 
					result = $filter('filterSwitchToOverDoubleFigure')(input);
				expect(result).toEqual('01');
			});

			it('should return empty string, if input no value', function() {
				var input = '',
					result = $filter('filterSwitchToOverDoubleFigure')(input);
				expect(result).toEqual('');
			});
		});

		describe('filterPushWhitespaceToCenter', function() {
			it('should return center whitespace string', function() {
				var input = 2014,
					result = $filter('filterPushWhitespaceToCenter')(input);
				expect(result).toEqual('20 14');
			});

			it('should return input string intactly, if input value length <= 1', function() {
				var input = 9,
					result = $filter('filterPushWhitespaceToCenter')(input);
				expect(result).toEqual('9');
			});
		});
	});
});