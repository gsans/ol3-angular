(function() {

'use strict';
angular.module('app').controller('MainController',
  ['mapService', '$timeout', '$rootScope', controller]);

function controller(mapService, $timeout, $rootScope) {
  var vm = this;
  mapService.init({
      extractStylesKml: false,
      popupOffset: [-4,-43],
      featurePropertiesMap: ['name', 'description', 'Enlace a la ruta'], //override default mapping
      onFeatureSelected: onFeatureSelected, //override default event handler
      setFeatureDetails: setFeatureDetails
  });
  vm.staticTabs = { search: true, details: false };
  vm.features = mapService.getFeatures();

  
  // private
  function setFeatureDetails(feature){
    // safely run after digest cycle
    // needed to handle user list selection 
    $timeout(function(){
      vm.feature = feature;
    });
  }
  
  function selectTab(key){
    if (vm.staticTabs.hasOwnProperty(key))
      vm.staticTabs[key] = true;
  }
  
  function onFeatureSelected(feature) {
    console.log("feature selected", feature);
    selectTab("details");
  }
  
  //public
  vm.selectFeature = function(name){
    mapService.selectFeature(name, true);
  }  
  
  vm.hideFeatures = function(event, features){
    mapService.hideFeatures(features, vm.search);
  };

  //subscribe to events
  $rootScope.$on("global.hide-features", vm.hideFeatures);
}

})();