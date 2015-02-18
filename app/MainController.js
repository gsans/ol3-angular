(function() {
'use strict';

/**
 * Main Controller
 */
angular
  .module('app')
  .controller('mainController', [
    'mapService', 
    '$timeout', 
    '$rootScope', 
    Controller
  ]);

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


  ///////////////////////////////////////////////////////////
  // map to view interaction

  /**
   * Event handler triggered when a feature is selected
   *
   * @param {feature} feature selected. 
   * 
   * Feature properties are defined by config.featurePropertiesMap.
   */
  function onFeatureSelected(feature) {
    console.log("feature selected", feature);
    // safely run after digest cycle
    // needed to handle user list selection 
    $timeout(function(){
      vm.feature = feature;
      selectTab("details");
    });
  }

  /**
   * Activates tab
   *
   * @param {key} tab id 
   */
  function selectTab(key){
    if (vm.staticTabs.hasOwnProperty(key))
      vm.staticTabs[key] = true;
  }

  ///////////////////////////////////////////////////////////
  // view to map interaction
  
  // subscribe to event
  $rootScope.$on("global.hide-features", vm.hideFeatures);

  /**
   * Selects a single feature on the map
   *
   * @param {name} feture id 
   */
  function selectFeature(id){
    mapService.selectFeature(id, true);
  }  
  
  /**
   * Hides features on the map
   *
   * @param {event} event object
   * @param {Array} feature ids that should be shown
   */
  function hideFeatures(event, features){
    mapService.hideFeatures(features, vm.search);
  };
}

})();