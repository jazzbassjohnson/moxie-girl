'use strict';


// Main module of the application

angular
	.module('moxieApp',  [
		'ui.router',
	])
	.config(['$stateProvider', '$urlRouterProvider', '$provide', function($stateProvider, $urlRouterProvider, $provide){

		//Using Ui-router. For more info: https://github.com/angular-ui/ui-router
		$stateProvider
			.state('app', {
				url: '/',
				views: {
					'body': {
						controller: 'MainController',
						templateUrl: 'templates/main-page.html'
					}
				}
			})
			.state('app.test', {
				url: 'test',
				views: {
					'body@': {
						templateUrl: 'templates/test-page.html',
						controller: 'MainController'
					}
				}
			});

			$provide.decorator('$q', function($delegate) {
			    // Extend promises with non-returning handlers
			    function decoratePromise(promise) {
			      promise._then = promise.then;
			      promise.then = function(thenFn, errFn, notifyFn) {
			        var p = promise._then(thenFn, errFn, notifyFn);
			        return decoratePromise(p);
			      };
			 
			      promise.success = function (fn) {
			        promise.then(function (value) {
			          fn(value);
			        });
			        return promise;
			      };
			      promise.error = function (fn) {
			        promise.then(null, function (value) {
			          fn(value);
			        });
			        return promise;
			      };
			      return promise;
			    }
			 
			    var defer = $delegate.defer,
			        when = $delegate.when,
			        reject = $delegate.reject,
			        all = $delegate.all;
			    $delegate.defer = function() {
			      var deferred = defer();
			      decoratePromise(deferred.promise);
			      return deferred;
			    };
			    $delegate.when = function() {
			      var p = when.apply(this, arguments);
			      return decoratePromise(p);
			    };
			    $delegate.reject = function() {
			      var p = reject.apply(this, arguments);
			      return decoratePromise(p);
			    };
			    $delegate.all = function() {
			      var p = all.apply(this, arguments);
			      return decoratePromise(p);
			    };
			 
			    return $delegate;
			  });

			$urlRouterProvider.otherwise('/');


	}]);