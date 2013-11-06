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
        url: 'https://spreadsheets.google.com/feeds/list/0AjQnTCpoDlgXdEVXaUdFNGRLTy1RUXI3MUN1LUpSNVE/od6/public/values?alt=json'
      })
      .success(function(data) {
        data = _.filter(data.feed.entry, function(entry) { return entry['gsx$publish']['$t'] === 'Yes'; });
        data = _.map(data, function(entry) {
          return {
            brewery: entry['gsx$brewery']['$t'],
            flavorNotes: entry['gsx$flavornotes']['$t'],
            name: entry['gsx$name']['$t'],
            pick: entry['gsx$pick']['$t'] === 'Yes',
            title: entry['title']['$t'],
            type: entry['gsx$type']['$t']
          };
        });
        callback(data);
      });
    }
  };
}])
;