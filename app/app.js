var myApp = angular.module('myApp',
    ['ngRoute', 'firebase', 'ngAudio'])
    .constant('FIREBASE_URL', 'https://25focus.firebaseio.com/', 'ngAudio');


myApp.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          $location.path('/login');
        } // AUTH REQUIRED
      }); //event info
  }]); //run

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'views/home.html',
    controller: 'FocusController',
    resolve: {
      currentAuth: function (Authentication) {
        return Authentication.requireAuth();
      } //current Auth
    } //resolve
  }).
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/sessions', {
      templateUrl: 'views/sessions.html',
      controller: 'FocusController',
    }).
    when('/success', {
      templateUrl: 'views/success.html',
      controller: 'SuccessController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        } //current Auth
      } //resolve
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);