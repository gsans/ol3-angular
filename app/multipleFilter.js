(function() {
'use strict';

/**
 * Multiple terms search filter
 */
angular
  .module('app')
  .filter('multiple', filter);

/**
 * Creates a filter that takes into account multiple search terms
 *
 * @param {$rootScope} $rootScope
 * @returns {Function} multiple filter
 *
 * Credits [multiple filter]{@link http://stackoverflow.com/questions/23504757/angular-js-filter-by-logical-and-using-multiple-terms}
 */
filter.$inject = [
    '$rootScope'
];

function filter($rootScope) {
  return multiple;

  /**
   * Multiple filter
   * @param  {String} items - filter expression
   * @param  {String} searchTerms - search 
   */
  function multiple(items, searchTerms) {
    // return all items if searchTerms is empty
    if (!searchTerms) {
      triggerHideFeatures([], $rootScope);
      return items; 
    }

    var terms = searchTerms.split(' '),
      matchingItems = [],
      passTest;

    items.forEach(function(item){ 
      passTest = true;
      terms.forEach(function(term){ 
        // we check the default KML properties
        passTest = passTest && ( 
            (item.name.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
            (item.description.toLowerCase().indexOf(term.toLowerCase()) > -1)
          );
      });
      // Add item to return array only if passTest is true,
      // all search terms were found in item
      if (passTest) { matchingItems.push(item); }
    });
    
    triggerHideFeatures(matchingItems, $rootScope);

    return matchingItems;
  }

  /**
   * Notifies the application with the matching features
   * @param  {Array} matchingItems - filtered features
   * @param  {Object} $rootScope - $rootScope 
   */
  function triggerHideFeatures(matchingItems, $rootScope){
    var featuresArray = matchingItems.map(function(feature){
      return feature.name;
    })
    $rootScope.$broadcast("global.hide-features", featuresArray);
  }
}

})();