(function() {

'use strict';
angular.module('app').filter('highlight', ['$sce', filter]);

function filter($sce) {
  return function(text, query) {
    if (!query) return text;
    var terms = query.split(' ') || [query]; //split query terms by space character
    
    terms.forEach(function(item){
      if (text)
        text = text.replace(new RegExp('('+item+')', 'gi'),
          '<span class="highlighted">$1</span>')
    });
    
    return $sce.trustAsHtml(text);
  }
}

})();