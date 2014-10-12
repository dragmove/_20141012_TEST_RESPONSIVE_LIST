define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
	'use strict';

	describe('ProfileController', function() {
		var scope, careersSvc, authorSvc;

		beforeEach(function(){
			//angular.mock.module('controllers');
			module('controllers');
			module('services');
		});

		beforeEach(mocks.inject(function($controller, $rootScope, $careers, $projects, $author) {
			console.log('$controller:', $controller);
			console.log('$careers :', $careers);
			console.log('$projects :', $projects);
			console.log('$author :', $author);

			scope = $rootScope.$new();
			careersSvc = $careers;
			authorSvc = $author;

			$controller('ProfileController', {
				$scope: scope,
				$careers: careersSvc,
				$projects: $projects,
				$author: authorSvc
			});
		}));

		describe('inject $author service', function() {
			it('should $scope.phone.calling equals $author.phone', function() {
				expect(scope.phone.calling).toEqual(authorSvc.phone);
				expect(scope.phone.calling).toBeDefined();
			});
		});

	});
});