(function() {
'use strict';

/**
 * Map Service
 */
angular
  .module('app')
  .factory('mapService', [
    '$compile', 
    service
  ]);

function service($compile){
  var ms = {},
    defaults = {
      zoom: 15,
      startLocation: [0,40],
      extractStylesKml: false,
      popupOffset: [0,0],
      featurePropertiesMap: ['name', 'description', 'address', 'phoneNumber', 'styleUrl'],
      onFeatureSelected: function(feature) { console.log("feature selected", feature);}
    },
    zIndex = 9999, 
    popup, 
    selectedFeature;
  
  ms.map = {};
  
  //check openlayers is available on service instantiation
  if (!ol) return ms;

  ms.hideFeatures = function(features, search){
    //hide any popups
    var element = angular.element('#popup');
    $(element).popover('destroy');
    	  
    if (!features || features.length===0) {
      if (search && search.length>0)
        //search with no results: filters all
         $("#map path.icon").hide();
      else
        //reset after having results
         $("#map path.icon").show();
      return;
    }

	  features.forEach(function(item){
	    $("#map path[feature!='" + escape(item) + "'].icon").hide();
	  });
	  features.forEach(function(item){
	    $("#map path[feature='" + escape(item) + "'].icon").show();
	  });
  }
  
  ms.selectFeature = function(name, pan){
    var feature;
    if (!name) return;
    var target = $("#map path[feature='" + escape(name) + "']")[0];
    
    //search for feature
    ms.map	//ol.Map
    .getLayers()	//ol.Collection
    .getArray()[1]	//ol.layer.Vector
    	.getSource()	//ol.source.KML
  		  .getFeatures()
  		  .forEach(function(item, i) {
  		    var f = item.get('name');
  		    if (name==f)
  		      feature = item;
  	  });
  	  selectedFeature = feature;
  	  
  	  if (feature) {
  	    $("#map path").each(function(index, item){
  	      item.setAttribute("class", "icon");
  	    });
  	    target.setAttribute("class", "icon selected");
  	    
  	    //put on top
        $(target.parentNode.parentNode)
          .parent().parent()
          .css('z-index', ++zIndex);
  	  }

  	  //display feature details and pan
  	  if (pan && feature) {
        ms.onFeatureSelected(feature);
			  ms.panToFeature(feature, ms.map.getView().getZoom());
			
  	    var element = angular.element('#popup');
    	  $(element).popover('destroy');
  			//show popup for feature or hide any previous one
  			if (feature) {
  				setTimeout(function(){
  					var coord = feature.getGeometry().getCoordinates();
            var title = feature.get('name');
    				popup.setPosition(coord);
    				$(element).popover({
    				  'title': title, 
    				  'placement': 'top',
              'animation': false,
              'html': true
    				  //'content': feature.get('description')
    				});
    				$(element).popover('show');	
  				}, 1000);
  			}
			}
			return feature;
  }
  
  ms.mapFeatureProperties = function(feature, olFeature) {
    if (!olFeature) return feature;
    if (!feature) feature = {};
    defaults.featurePropertiesMap.forEach(function(key){
        feature[key] = olFeature.get(key);
    });
    return feature;
  }
  
  ms.onFeatureSelected = function(olFeature) {
    if (!olFeature) return;
    var feature = ms.mapFeatureProperties({}, olFeature);
    if(defaults.onFeatureSelected)
      defaults.onFeatureSelected(feature);
  }
  
  ms.getFeatures = function () {
    var f = []; 
    ms.map	//ol.Map
  	  .getLayers()	//ol.Collection
  	  .getArray()[1]	//ol.layer.Vector
  	  	.getSource()	//ol.source.KML
  			  .getFeatures()  //ol.Feature
  			  .forEach(function(olFeature, i) {
  			    var feature = {id: olFeature.getId()};
  			    f.push(ms.mapFeatureProperties(feature, olFeature));
  			  });
    return f;
  }
  
  // Creates an overlays in the given coordinates
  function createSVGOverlay(position, feature) {
      if (defaults.extractStylesKml) return;
      
      var elem = document.createElement('div');
      var svg = angular.element('#svgmarker ng-md-icon').clone();

      //change path attributes
      var path = svg.find('path');
      path.attr('class', 'icon');
      path.attr('filter', 'url(#blur)');
      path.attr('feature', escape(feature.get('name')) );
      
      var filter = document.createElement('filter');
      var fe = document.createElement('feGaussianBlur');
      filter.setAttribute('id', 'blur');
      fe.setAttribute('stdDeviation', 3);
      filter.appendChild(fe);
      svg.find('svg')[0].appendChild(filter);
      
      elem.appendChild(svg[0]);
      
      return new ol.Overlay({
        offset: [-2, 12],
        element: elem,
        position: position,
        positioning: 'bottom-center',
        stopEvent: false,
      });
  }
  
  ms.renderSVGFeatures = function(){
    if (defaults.extractStylesKml) return;
    
    //wait till directive renders svg element
    setTimeout(function() {
      ms.map	//ol.Map
    	  .getLayers()	//ol.Collection
    	  .getArray()[1]	//ol.layer.Vector
    	  	.getSource()	//ol.source.KML
    			  .getFeatures()
    			  .forEach(function(item, i, arr){
    			    var hidden = item.get('hidden');
    			    if (!hidden) {
                var coordinates = item.getGeometry().getCoordinates();
                var overlay = createSVGOverlay(coordinates, item);
                ms.map.addOverlay(overlay);
    			    }
            });      
    }, 0);
  }
  
  ms.popupSetup = function() {
    var element = angular.element('#popup');
    
    // Add popup showing the position the user clicked
    popup = new ol.Overlay({
      element: element,
      stopEvent: true,
			offset: defaults.popupOffset
    });
    ms.map.addOverlay(popup);
    
    var displayPopup = function(evt){
      var element = popup.getElement();
      var coordinate = evt.coordinate;
      var hdms = ol.coordinate.toStringHDMS(ol.proj.transform(
          coordinate, 'EPSG:3857', 'EPSG:4326'));
    
      $(element).popover('destroy');
      popup.setPosition(coordinate);
      // the keys are quoted to prevent renaming in ADVANCED mode.
      $(element).popover({
        'placement': 'top',
        'animation': false,
        'html': true,
        'content': '<p>The location you clicked was:</p><code>' + hdms + '</code>'
      });
      $(element).popover('show');
    }
    
		// display popup on click
		ms.map.on('click', function(evt) {
		  if (defaults.extractStylesKml) {
		    // Regular rendered feature find on click coordinates
  			var feature = ms.map.forEachFeatureAtPixel(evt.pixel,
  				function(feature, layer) {
  					return feature;
  			});
		  } else {
        // SVG marker. Search at element attributes
  		  if (!feature && evt.originalEvent.target && evt.originalEvent.target.nodeName == "path") {
          var target = evt.originalEvent.target;
          var featureId = unescape(target.getAttribute('feature'));
          feature = ms.selectFeature(featureId, false);
  		  };
		  };
		  
		  //trigger onFeatureSelected event
		  selectedFeature = feature;
		  ms.onFeatureSelected(feature);
			
			$(element).popover('destroy');
			//show popup for feature or hide any previous one
			if (feature) {
				
				setTimeout(function(){
					var coord = feature.getGeometry().getCoordinates();
  				popup.setPosition(coord);
  				var title = feature.get('name');
  				$(element).popover({
  				  'title': title, 
  				  'placement': 'top',
            'animation': false,
            'html': true
  				  //'content': feature.get('description')
  				});
  				$(element).popover('show');			  
				}, 1000);
			}
			
			if (feature) {
			  ms.panToFeature(feature, ms.map.getView().getZoom());
			} 
		});
		
  }
  
  ms.panToFeature = function(feature, zoom) {
		var lonLat = feature.getGeometry().getCoordinates()
		
		var olPixel = ms.map.getPixelFromCoordinate(lonLat);
		olPixel[1] -= 40;
		lonLat = ms.map.getCoordinateFromPixel(olPixel);
		
		if (ms.map.getView().getZoom() < zoom) 
			ms.map.getView().setZoom(zoom);
		
		var animation = ol.animation.pan({
		  duration: 1000,
			easing: eval(ol.easing.inAndOut),
			source: ms.map.getView().getCenter()
		});
			
		// Add animation to the render pipeline
		ms.map.beforeRender(animation);
		// Change center location
		ms.map.getView().setCenter(lonLat);
	};
  
  ms.init = function(c){
    var config = angular.extend(defaults, c);
    
    // map initialisation
    ms.map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.MapQuest({layer: 'osm'})
        })
      ],
      view: new ol.View({
        center: ol.proj.transform(config.startLocation, 'EPSG:4326', 'EPSG:3857'),
        zoom: config.zoom
      }),
		  controls: ol.control.defaults().extend([
		    new MyZoomToExtentControl({tipLabel: "Fit to extent"}),
				new ol.control.ScaleLine()
			])
    });
    
    ms.popupSetup();
    ms.loadKML();
    ms.zoomToExtend();
  }
  
  ms.zoomToExtend = function() {
		var bounds = ol.extent.createEmpty();
		
		 ms.map	//ol.Map
    	  .getLayers()	//ol.Collection
    	  .getArray()[1]	//ol.layer.Vector
    	  	.getSource()	//ol.source.KML
    	  	.getFeatures()
    			  .forEach(function(item, i, arr){
              var ext = ol.extent.createEmpty();
				      ext = item.getGeometry().getExtent();
				      bounds = ol.extent.extend(bounds, ext);
            });
            
		if (bounds) {
		  // increase bounds using a tenth of the 
			// maximum distance between coordinates
			var incX = Math.abs(bounds[2] - bounds[0]);
			var incY = Math.abs(bounds[3] - bounds[1]);
			var buffer = (incX>incY)? incX: incY;
			var bounds10 = ol.extent.createEmpty();
			ol.extent.buffer(bounds, buffer/5, bounds10);
			
			var animation = ol.animation.pan({
				easing: eval(ol.easing.inAndOut),
				source: ms.map.getView().getCenter()
			});
			ms.map.beforeRender(animation);
			
			ms.map.getView().fitExtent(bounds10, ms.map.getSize());
		}	  
	};
  
  ms.loadKML = function(){
    var kml = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://earth.google.com/kml/2.2"><Document><name><![CDATA[Coworking spaces]]></name><description><![CDATA[]]></description><Style id="style1"><IconStyle><Icon><href>http://geoklubb.se/foursquare-lists-kml-export/img/geoklubb-pin.png</href></Icon></IconStyle></Style><Placemark><name><![CDATA[Ziferblat]]></name><description><![CDATA[<a href="http://london.ziferblat.net">Venue URL</a><br />Phone: 07984 693440<br />]]></description><styleUrl>#style1</styleUrl><Point><coordinates>-0.078374147415161,51.526985282303,0</coordinates></Point></Placemark><Placemark><name><![CDATA[Campus London]]></name><description><![CDATA[<a href="http://campuslondon.com">Venue URL</a><br />]]></description><styleUrl>#style1</styleUrl><Point><coordinates>-0.085487365722656,51.522703131223,0</coordinates></Point></Placemark><Placemark><name><![CDATA[Rainmaking Loft]]></name><description><![CDATA[<a href="http://www.rainmakingloft.com">Venue URL</a><br />]]></description><styleUrl>#style1</styleUrl><Point><coordinates>-0.073642730712891,51.50764732314,0</coordinates></Point></Placemark><Placemark><name><![CDATA[TechHub]]></name><description><![CDATA[Phone: 020 7490 0764<br />]]></description><styleUrl>#style1</styleUrl><Point><coordinates>-0.087708234786987,51.525032831563,0</coordinates></Point></Placemark><Placemark><name><![CDATA[Innovation Warehouse London]]></name><description><![CDATA[<a href="http://innovationwarehouse.org">Venue URL</a><br />Phone: 020 7248 0199<br />]]></description><styleUrl>#style1</styleUrl><Point><coordinates>-0.10269641876221,51.518998061413,0</coordinates></Point></Placemark><Placemark><name><![CDATA[Hub Westminster]]></name><description><![CDATA[<a href="http://westminster.impacthub.net">Venue URL</a><br />Phone: 020 7148 6720<br />]]></description><styleUrl>#style1</styleUrl><Point><coordinates>-0.13124592579464,51.507792367419,0</coordinates></Point></Placemark></Document></kml>';
    var kmlSource = new ol.source.KML({
        projection: 'EPSG:3857',
        text: kml,
        extractStyles: defaults.extractStylesKml
    });
    
    var vectorLayer = new ol.layer.Vector({
        source: kmlSource,
        style: kmlStyle
    });
    
    function kmlStyle(feature, resolution){
      // use default styles if using kml icons
      if (!defaults.extractStylesKml) return [];
      
      return [new ol.style.Style({
        image: new ol.style.Circle({
          radius: 5,
          fill: new ol.style.Fill({
            color: 'rgba(123, 152, 188, 0)'
          }),
          stroke: new ol.style.Stroke({
            color: 'rgba(123, 152, 188, 0)',
            width: 1
          })
        })
      })];
    }
    
    // Add vectory layer to map
    ms.map.addLayer(vectorLayer);
    
    //render custom markers
    ms.renderSVGFeatures();
  }
  
	/**
   * @constructor
   * @extends {ol.control.Control}
   * @param {Object=} opt_options Control options.
   */
  var MyZoomToExtentControl = function(opt_options) {

    var options = opt_options || {};

    var button = document.createElement('button');
    button.id = 'zoom-to-extent';
    button.setAttribute("title","Zoom to Extent");

    var span = document.createElement('span');
    
    //span.setAttribute("class", "glyphicon glyphicon-record");
    span.innerHTML = 'E';
    button.appendChild(span);

    var this_ = this;
    var handler = function(e) {
      e.preventDefault(); //cancel click event
      ms.zoomToExtend();
      document.getElementById("zoom-to-extent").disabled = true;
      setTimeout(function() {
        document.getElementById("zoom-to-extent").disabled = false;
      }, 1);
    };

    button.addEventListener('click', handler, true);
    button.addEventListener('touchstart', handler, true);

    var element = document.createElement('div');
    element.className = 'zoom-to-extent ol-zoom-extent ol-unselectable ol-control';
    element.appendChild(button);

    ol.control.Control.call(this, {
      element: element,
      target: options.target
    });

  };
	ol.inherits(MyZoomToExtentControl, ol.control.ZoomToExtent);
  
  return ms;
}


})();