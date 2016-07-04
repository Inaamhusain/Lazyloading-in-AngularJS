var app = angular.module('lazyLoadApp', ['ui.router', 'oc.lazyLoad']);

app.config(['$ocLazyLoadProvider', '$stateProvider', '$urlRouterProvider' , function($ocLazyLoadProvider, $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/state1");
	
	//Config For ocLazyLoading
	$ocLazyLoadProvider.config({
		'debug': true, // For debugging 'true/false'
		'events': true, // For Event 'true/false'
		'modules': [{ // Set modules initially
			name : 'state1', // State1 module
			files: ['app/components/state1/state1Module.js']
		},{
			name : 'state2', // State2 module
			files: ['app/components/state2/state2Module.js']
		}]
	});

	//Config/states of UI Router
	$stateProvider
	.state('state1', {
		url: "/state1",
		views : {
			"" : {
				templateUrl:"app/components/state1/state1View.html"
			}
		},
		resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load('state1'); // Resolve promise and load before view 
			}]
		}
	})
	.state('state2', {
		url: "/state2",
		views : {
			"" : {
				templateUrl:"app/components/state2/state2View.html"
			}
		},
		resolve: {
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load('state2'); // Resolve promise and load before view 
			}]
		}
	});
}]);