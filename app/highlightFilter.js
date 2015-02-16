(function() {

'use strict';
angular.module('app').filter('highlight', ['$sce', filter]);

/**
 * Creates a filter that wraps each search term occurrence in a span element with the 'highlighted' css class
 *
 * @param {$sceProvider} $sce
 * @returns {returnedFunction} highlight filter
 * 
 * See [$sce]{@link https://docs.angularjs.org/api/ng/service/$sce}
 */
function filter($sce) {
  return highlight;

  /**
   * Highlight filter
   * @param  {String} inputText - filter expression
   * @param  {String} searchTerms - search 
   */
  function highlight(inputText, searchTerms) {
    if (!searchTerms) return inputText;
    // split search terms by space character
    var terms = searchTerms.split(' ') || [searchTerms]; 
    
    terms.forEach(function(item){
      if (inputText)
        inputText = inputText.replace(new RegExp('(' + item + ')', 'gi'),
          '<span class="highlighted">$1</span>')
    });

    return $sce.trustAsHtml(inputText);
  }
}

})();