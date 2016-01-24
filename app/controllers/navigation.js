myApp.controller('navController',
		['$scope', '$location', 'Authentication',
			function($scope, $location, Authentication) {
		$scope.$location = $location;
    console.log($scope.$location);
}]);
