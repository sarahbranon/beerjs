angular.module( 'beer', [
  'templates-app',
  'templates-common',
  'beer.home',
  'beer.about',
  'ui.router',
  'ngAnimate'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {

})

;

