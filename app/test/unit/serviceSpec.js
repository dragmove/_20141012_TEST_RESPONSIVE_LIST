define(['angular', 'angular-mocks', 'app'], function(angular, mocks, app) {
	'use strict';

	describe('service', function() {

		/*
		 * test compare values
		 */
		describe('$author', function() {
			beforeEach(mocks.module('services'));

			it('should has nick "dragmove"', mocks.inject(function($author) {
				expect($author.nick).toEqual('dragmove');
			}));

			it('should has email "dragmove@naver.com', mocks.inject(function($author) {
				expect($author.email).toEqual('dragmove@naver.com');
			}));
		});

		describe('$careers', function() {
			var $httpBackend,
				scope,
				careersSvc,
				createController;

			beforeEach(function(){
				mocks.module('controllers');
				mocks.module('services');
			});

			beforeEach(mocks.inject(function($controller, $rootScope, $careers, $projects, $author, _$httpBackend_) {
				scope = $rootScope.$new();
				careersSvc = $careers;
				$httpBackend = _$httpBackend_;

				$httpBackend.when('GET', 'data/careers.json').respond(200, [{company:'브이더블유'}, {company:'브릭스 리퍼블릭'}, {company:'솔트케이크'}]);
				$httpBackend.when('GET', 'data/projects.json').respond(201, '');

				createController = function() {
					return $controller('ProfileController', {
						$scope: scope,
						$careers: careersSvc,
						$projects: $projects,
						$author: $author
					});
				};
			}));

			afterEach(function() {
	        	$httpBackend.verifyNoOutstandingExpectation();
	        	$httpBackend.verifyNoOutstandingRequest();
			});

			it('should scope.careers not defined, before get data/careers.json', function() {
				expect(scope.careers).not.toBeDefined();
			});

			it('should set scope.careers, if get data from data/careers.json', function() {
				$httpBackend.expectGET('data/careers.json');
		        var controller = createController();
		        $httpBackend.flush();

		        expect(scope.careers.length).toEqual(3);
		        expect(scope.careers[0].company).toEqual('브이더블유');
			});

			
/*
			beforeEach(mocks.inject(function($controller, $careers, _$httpBackend_) {
				$httpBackend = _$httpBackend_;
				$httpBackend.when('GET', 'data/careers.json').respond(200, '');
			}));

			it('should equals data/careers.json', function() {
		    	$httpBackend.expectGET('data/careers.json').respond(200, '');
		    	$httpBackend.flush();
		    });
*/
		});


		// beforeEach(inject(function(_$httpBackend_, $rootScope) {
		// 	console.log('_$httpBackend_:', _$httpBackend_);
		// 	console.log('$rootScope :', $rootScope);
		// }));

		






/*
		factory('$careers', ['$resource', function($resource) {
			return $resource('data/careers.json', {}, {
				'get': {
					method: 'GET',
					params: '',
					isArray: true
				}
			});
		}]).
*/

	});
});