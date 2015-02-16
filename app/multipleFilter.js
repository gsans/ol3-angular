//http://stackoverflow.com/questions/23504757/angular-js-filter-by-logical-and-using-multiple-terms
(function() {

'use strict';
angular.module('app').filter('multiple', filter);

function filter() {
  return function(items, query, scope) {
    if (!query) {
      scope.hideFeatures([], query);
      return items; // return all items if nothing in query box
    }

    var terms = query.split(' '); //split query terms by space character
    var arrayToReturn = [];

    items.forEach(function(item){ // iterate through array of items
      var passTest = true;
      terms.forEach(function(term){ // iterate through terms found in query box

        passTest = passTest && ( 
            (item.name.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
            (item.description.toLowerCase().indexOf(term.toLowerCase()) > -1)
          );
      });
      // Add item to return array only if passTest is true -- all search terms were found in item
      if (passTest) { arrayToReturn.push(item); }
    });
    
    var f = arrayToReturn.map(function(feature){
      return feature.name;
    })
    scope.hideFeatures(f, query);

    return arrayToReturn;
  }
}

})();