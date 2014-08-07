require.config({
	paths: {
		angular: 				'../bower_components/angular/angular.min',
		angularRoute: 			'../bower_components/angular-route/angular-route',
		angularMocks: 			'../bower_components/angular-mocks/angular-mocks',
		angularResource: 		'../bower_components/angular-resource/angular-resource.min',
	// TODO: remove from bower.json
	//	requirejstext: 			'../bower_components/requirejs-text/text',
    	bootstrap:				'../bower_components/angular-strap/dist/angular-strap.min',
    	bootstraptpl:			'../bower_components/angular-strap/dist/angular-strap.tpl.min',
    	angular_frfr:			'../bower_components/angular-i18n/angular-locale_fr-fr',	
    	angularGettext: 		'../bower_components/angular-gettext/dist/angular-gettext',
		angularAuth: 			'../bower_components/angular-http-auth/src/http-auth-interceptor',
		paginateAnything:		'../bower_components/angular-paginate-anything/src/paginate-anything',
		passwordStrength: 		'../bower_components/angular-password-strength/build/angular-password-strength.min',
		angularAnimate:			'../bower_components/angular-animate/angular-animate.min'		 
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		},
		'angularResource': ['angular'],
		'angularAuth':['angular'],
		'bootstrap': ['angular'],
		'bootstraptpl': ['angular'],
		'angularGettext' : ['angular'],
		'translation': ['angularGettext'],
		'paginateAnything': ['angular'],
		'passwordStrength': ['angular'],
		'angular_frfr': ['angular'],
		'angularAnimate': ['angular']
	},
	priority: ["angular"]
});





//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
	'angular',
	'app',
	'routes',
	'bootstrap',
	'bootstraptpl',
	'angular_frfr',
	'angularAnimate'
	], 
	function(angular, app, routes) {
	
		'use strict';
		angular.element().ready(function() {
			angular.resumeBootstrap([app['name']]);
		});	
	});


