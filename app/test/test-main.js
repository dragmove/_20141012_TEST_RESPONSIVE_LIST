// we get all the test files automatically

var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/spec\.js$/i.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
  baseUrl: '/base/src/js',

  paths: {
    'jquery': './lib/jquery-1.11.0.min',
    'tram': './lib/tram-amd',
    'underscore': './lib/underscore-1.6.0',
    'angular': './lib/angular',
    'angular-route': './lib/angular-route',
    'angular-resource': './lib/angular-resource',
    'angular-mocks': './lib/angular-mocks',

    //paths
    filters: './filters'
  },

  shim: {
    'angular': {
      exports: 'angular'
    },
    'angular-route': {
      deps:['angular']
    },
    'angular-resource': {
      deps:['angular']
    },
    'angular-mocks': {
      deps:['angular'],
      exports: 'angular.mock'
    }
  },

  deps: tests,
  callback: window.__karma__.start
});

/*
requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src/js',

    paths: {
        'angular': './lib/angular',
        'angular-route': './lib/angular-route',
        'angular-resource': './lib/angular-resource',
        'angular-mocks': './lib/angular-mocks',
        'app': './app',

        //paths
        controllers: './controllers',
        directives: './directives',
        filters: './filters',
        services: './services'
    },

    shim: {
      'angular': {
        exports: 'angular'
      },
      'angular-route': {
        deps: ['angular']
      },
      'angular-resource': {
        deps: ['angular']
      },
      'angular-mocks': {
        deps: ['angular'],
        exports: 'angular.mock'
      },
      'underscore': {
        exports: 'underscore'
      }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});
*/
