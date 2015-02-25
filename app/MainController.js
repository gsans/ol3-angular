(function() {
'use strict';

/**
 * Main Controller
 */
angular
  .module('app')
  .controller('mainController', Controller);

Controller.$inject = [
    'mapService', 
    '$timeout', 
    '$rootScope'
];

function Controller(mapService, $timeout, $rootScope) {
  var vm = this;

  // map initialisation
  mapService.init({
      extractStylesKml: false,
      popupOffset: [-4,-43],
      featurePropertiesMap: ['name', 'description'], //override default mapping
      onFeatureSelected: onFeatureSelected //override default event handler
  });

  vm.staticTabs = { search: true, details: false };
  vm.features = mapService.getFeatures();
  vm.selectFeature = selectFeature;
  vm.hideFeatures = hideFeatures;
  vm.cancelSearch = cancelSearch;


  ///////////////////////////////////////////////////////////
  // map to view interactions

  /**
   * Event handler triggered when a feature is selected
   *
   * @param {Object} feature - feature selected. 
   * 
   * Feature properties are defined by config.featurePropertiesMap.
   */
  function onFeatureSelected(feature) {
    console.log("feature selected", feature);
    // safely run after digest cycle
    // needed to handle list selection 
    $timeout(function(){
      vm.feature = feature;
      selectTab("details");
    });
  }

  /**
   * Activates tab
   *
   * @param {String} key - tab id 
   */
  function selectTab(key){
    if (vm.staticTabs.hasOwnProperty(key))
      vm.staticTabs[key] = true;
  }

  ///////////////////////////////////////////////////////////
  // view to map interactions
  
  // subscribe to event
  $rootScope.$on("global.hide-features", vm.hideFeatures);

  /**
   * Selects a single feature on the map
   *
   * @param {String} id - feature id 
   */
  function selectFeature(id){
    mapService.selectFeature(id, true);
  }  
  
  /**
   * Hides features on the map
   *
   * @param {Event} event       - event object
   * @param {Array} features    - feature ids that should be shown
   */
  function hideFeatures(event, features){
    mapService.hideFeatures(features, vm.search);
  };

  /**
   * Cancels search and zoom to extent
   */
  function cancelSearch(){
    var undefined, 
      zoomToExtent = true;
      
    selectTab("search");
    vm.search = "";
    vm.feature = undefined;
    mapService.unselectFeature(zoomToExtent);
  };
}

})();