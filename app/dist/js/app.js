define([
	'angular',
	'angular-route',
	'angular-animate',
	'controllers/controllers',
	'services/services',
	'filters/filters',
	'directives/directives'
	], function(angular) {
		/*
		console.log('# app.js');
		console.log('angular :', angular);
		console.log('controllers :', controllers);
		console.log('services :', services);
		console.log('filters:', filters);
		console.log('directives:', directives);
		*/

		return angular.module('MyApp', [
				'ngRoute',
				'ngAnimate',
				'controllers',
				'services',
				'filters',
				'directives'
			]
		);
	}
);