require.config({
    baseUrl: 'js',
    
    paths: {
        //.js
        'jquery': './lib/jquery-1.11.0.min',
        'tram': './lib/tram-amd',
        'underscore': './lib/underscore-1.6.0',
        'angular': './lib/angular',
        'angular-route': './lib/angular-route',
        'angular-resource': './lib/angular-resource',
        'angular-animate': './lib/angular-animate',
        'app': './app',

        //paths
        controllers: './controllers',
        directives: './directives',
        filters: './filters',
        services: './services'
    },

    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'underscore': {
            exports: 'underscore'
        }
    }
});

require([
    'app',
    'angular'
    ], function(app, angular) {
        'use strict';

        /*
         * config setting
         */
        app.config(function($routeProvider, $locationProvider) {
            $routeProvider.
            when('/', {
                templateUrl: 'partials/main/main.html',
                controller: 'MainController'
            }).
            when('/profile', {
                templateUrl: 'partials/profile/profile.html',
                controller: 'ProfileController'
            }).
            when('/portfolio', {
                templateUrl: 'partials/portfolio/portfolio.html',
                controller: 'PortfolioController'
            }).
            otherwise({
                redirectTo: '/'
            });
        });

        angular.element(document).ready(function() {
            angular.bootstrap(document, ['MyApp']);
        });
    }
);




