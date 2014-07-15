define(['angular',  'angularResource'], function (angular) {
	'use strict';
	
	/* Services */
	
	angular.module('inga.services', ['ngResource'])
	
	
		
	/**
	 * Populate a select box with collections
	 */  
	.factory('loadCollectionsOptions', ['$http', function($http) {
		
		return function(scope) {
			$http.get('/rest/admin/collections')
				.then(function(result) {
					scope.collections = result.data;
					scope.collections.unshift({ name: '', _id:'' });
			});
		};
	}])
	
	/**
	 * Populate a select box with departments
	 */  
	.factory('loadDepartmentsOptions', ['$http', function($http) {
		
		return function(scope) {
			$http.get('/rest/admin/departments')
				.then(function(result) {
					scope.departments = result.data;
					scope.departments.unshift({ name: '', _id:'' });
			});
		};
	}])
	
	
	


	/**
	 * Create a resource to an object or to a collection
	 * the object resource is created only if the angular route contain a :id
	 */ 
	.factory('IngaResource', ['$resource', '$routeParams', '$rootScope', function($resource, $routeParams, $rootScope){
		
		
		return function(collectionPath)
		{
			var ingaSave = function() {
				this.$save(function(data) {
					// receive 400 bad request on missing parameters
					$rootScope.pageAlerts = data.alert;
				});
			};
			
			
			if ($routeParams['id'])
			{
				var item = $resource(collectionPath+'/:id', $routeParams, {
					'save': { method:'PUT' }  // overwrite default save method (POST)
				});
				
				item.loadRouteId = function() {
					return this.get(function(data) {
						data.ingaSave = ingaSave;
					});
				};
				
				return item;
			}
			
			var collection = $resource(collectionPath);
			
			collection.loadRouteId = function() {
				// scope will be loaded with an empty instance
				
				var inst = new collection;
				inst.ingaSave = ingaSave;

				return inst;
			};
			
			return collection;
		};

	}])


	
	;
	
	
	
});
