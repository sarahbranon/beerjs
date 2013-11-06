angular.module( 'beer.home', [
  'ui.router',
  'resources.entries'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'Home' }
  });
})

/**
 * Controllers
 */
.controller( 'HomeCtrl', function HomeController( $scope, Entries ) {
  Entries.get(function(data){
    $scope.entries = data;
    $scope.beerTypes = _.uniq(_.map(data, function(entry) { return entry.type; }));
    $scope.breweries = _.uniq(_.map(data, function(entry) { return entry.brewery; }));
  });
})

.filter( 'pickFilter', function(){
  return function(entries, shouldPick) {
    if (shouldPick) {
      return _.filter(entries, function(entry) { return entry.pick; });
    } else { return entries; }
  };
})

;

