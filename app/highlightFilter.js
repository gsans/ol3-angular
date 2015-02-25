(function() {
'use strict';

/**
 * Highlight filter
 */
angular
  .module('app')
  .filter('highlight', filter);

/**
 * Creates a filter that wraps each search term occurrence in a span element with the 'highlighted' css class
 *
 * @param {$sceProvider} $sce
 * @returns {returnedFunction} highlight filter
 * 
 * See [$sce]{@link https://docs.angularjs.org/api/ng/service/$sce}
 * Credits [higlight filter]{@link http://stackoverflow.com/questions/15519713/highlighting-a-filtered-result-in-angularjs/27798600#27798600}
 */
filter.$inject = [
  '$sce'
];

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
      // avoid messing with HTML tags
      // needs a clever regular expression that skips HTML tags matches altogether
      if (inputText && inputText.indexOf("<")===-1)
        inputText = inputText.replace(new RegExp('(' + item + ')', 'gi'),
          '<span class="highlighted">$1</span>')
    });

    return $sce.trustAsHtml(inputText);
  }
}

})();