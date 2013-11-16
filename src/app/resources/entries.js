angular.module('resources.entries', [])

/*
 * Entries
 *
 * Manages entries from the Google Drive spreadsheet.
 *
 */
.factory('Entries', ['$http', function($http){
  return {
    get: function(callback) {
      $http({
        cache: true,
        method: 'GET',
        url: 'https://spreadsheets.google.com/feeds/list/0AjQnTCpoDlgXdGV0SHJoQlFsb1IyUTYzTGkxNEJtalE/od6/public/values?alt=json'
      })
      .success(function(data) {
        var food;
        data = _.filter(data.feed.entry, function(entry) { return entry['gsx$publish']['$t'] === 'TRUE'; });
        data = _.map(data, function(entry) {
          if (entry['gsx$foodpairing']['$t'] !== 'n/a') { food = entry['gsx$foodpairing']['$t']; }
          return {
            date: entry['gsx$date']['$t'],
            foodPairing: food,
            impression: entry['gsx$impression']['$t'],
            tastingNotes: entry['gsx$tastingnotes']['$t'],
            name: entry['gsx$name']['$t'],
            rank: entry['gsx$rank']['$t']
            // type: entry['gsx$type']['$t']
          };
        });
        callback(data);
      });
    }
  };
}])
;