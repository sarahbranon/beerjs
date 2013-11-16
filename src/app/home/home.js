angular.module( 'beer.home', [
  'ui.router',
  'resources.entries'
])

.config(function($stateProvider) {
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
.controller( 'HomeCtrl', function($scope, Entries) {
  Entries.get(function(data){
    $scope.entries = data;
    // $scope.beerTypes = _.uniq(_.map(data, function(entry) { return entry.type; }));
    // $scope.breweries = _.uniq(_.map(data, function(entry) { return entry.brewery; }));
  });
})

.filter( 'pickFilter', function() {
  return function(entries, selected) {
    if (!selected || !(selected.silver || selected.gold)) { return entries; }
    if (selected.silver && selected.gold) {
      return _.filter(entries, function(entry) { return entry.rank; });
    } else {
      if (selected.silver) {
        return _.filter(entries, function(entry) { return entry.rank === 's'; });
      }
      if (selected.gold) {
        return _.filter(entries, function(entry) { return entry.rank === 'g'; });
      }
    }
  };
})

.filter( 'pairingFilter', function() {
  return function(entries, hasPairing) {
    if (hasPairing) {
      return _.filter(entries, function(entry) { return entry.foodPairing; });
    }
    else { return entries; }
  };
})
;

