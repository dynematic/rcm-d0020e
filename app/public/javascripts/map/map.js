/**
 * The main Leaflet map gets created with a defined view, 'mapid' is a id to a div in index.ejs, the map will be located there
 */
const map = L.map('mapid').setView([62.97519757003264, 15.864257812499998], 5);

var averageData = [];
var markedStations = [];
var geoJson;
/**
 * The layer for the Leaflet map
 */
var mapboxURL = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnVnbWFuYSIsImEiOiJjanJhbXVqbmowcmQzNDRuMHZhdzNxbjkxIn0.x1rFh-zIo8WfBRfpj2HsjA';
var standardTileLayer = L.TileLayer.boundaryCanvas(mapboxURL, {
    maxZoom: 9,
    minZoom: 5,
    maxBoundsViscosity: 1.0,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
    boundary: countyData
});
standardTileLayer.addTo(map);


/**
 * Restrict the map movement
 */
var southWest = L.latLng(54,9),
    northEast = L.latLng(72, 32);
var bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);
map.on('drag', function () {
    map.panInsideBounds(bounds, { animate: false });
});


map.on('zoomend', function() {
    // Difference between zoom level and group number = 5
    addMarkerOnZoom(map.getZoom()-5);
    removeMarkerOnZoom(map.getZoom()-5);

});

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info thingy');
    this.update();
    return this._div;
};
info.update = function (props) {
    this._div.innerHTML = '<h4>Sverige medeltemperatur per län</h4>' +  (props ?
        '<b>' + props.name + '</b><br />'   + averageData[props.countyCode][1].toFixed(1) + '\xB0C'
        : 'Hovra över län');
};
info.addTo(map);

function getColor(d) {
    return  d > 35  ? '#990000' :
            d > 30  ? '#CC0000' :
            d > 25 ? '#FF0000' :
            d > 20  ? '#FF3333' :
            d > 15   ? '#FF6666' :
            d > 10   ? '#FF9999' :
            d > 5   ? '#FFCCCC' :
            d > 0  ? '#FFDCDC' :


            d > -5  ? '#CCE5FF' :
            d > -10 ? '#99CCFF' :
            d > -15  ? '#66B2FF' :
            d > -20   ? '#3399FF' :
            d > -25   ? '#0080FF' :
            d > -30   ? '#0066CC' :
            d > -35   ? '#004C99' :
                        '#003366';
}

function style(feature) {
    var avg = averageData[feature.properties.countyCode];
    return {
        weight: 2,
        opacity: 0.2,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(avg[1])
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

//Adds the Swedish countys to the map with some css styling
function drawMap() {
    geojson = L.geoJson(countyData, {
        style: style,
        onEachFeature: onEachFeature
    }).addTo(map);
}
//Draw functionality
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw({
    draw : {
        polyline : false,
        marker : false,
        circlemarker : false,
        polygon : false,
        rectangle : {
            shapeOptions: {
                color: 'purple'
               },
        },
        circle : {
            shapeOptions: {
                color: 'purple'
               },
        },
    },
  edit: {
    featureGroup: drawnItems,
    edit : true
  }
});
map.addControl(drawControl);
 
//TODO: Edit now empties list for both rectangle and circle, needs a separate list for both types
map.on(L.Draw.Event.EDITED, function (event) {
    var layers = event.layers;
    layers.eachLayer(function (layer) {
        if(layer instanceof L.Rectangle) {
            var lat_lngs = [layer._latlngs[0],layer._latlngs[2]];
            removeStationsOutsideRect(lat_lngs);
            getStationbyDrawRect(lat_lngs);
        }else if(layer instanceof L.Circle) {
            getStationbyDrawCircle(layer);
        }
    });
});

map.on(L.Draw.Event.DELETED, function (event) {
    removeAllStations();
    markedStations = [];
});
    
map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    var type = event.layerType;

    if(type == 'circle') {
        getStationbyDrawCircle(layer);
    }
    if(type == 'rectangle') {
        var lat_lngs = [layer._latlngs[0],layer._latlngs[2]];
        getStationbyDrawRect(lat_lngs);
        
    }

    drawnItems.addLayer(layer);
});
var lats = [];
function removeStationsOutsideRect(lat_lngs) {
    var temp = [];
    lats.push(lat_lngs)
    console.log(lats);
    for(var i = 0; i < layerGroups.length; i++) {
        let layer_group = layerGroups[i];
        layer_group.eachLayer(function(layer_elem){
            if(L.latLngBounds(lat_lngs).contains(layer_elem.getLatLng())){
                if(layer_elem instanceof L.Marker) {
                    if(markedStations.includes(layer_elem)) {
                        temp.push(layer_elem);
                        markedStations.pop(layer_elem);
                        
                    }
                }
            }
        });
    }
    for(var i = 0; i < markedStations.length; i++) {
        let layer_elem = markedStations[i];
        let stationID = layer_elem._popup._content.lastChild.id;
        var button = layer_elem._popup._content.lastChild;
        var station = stationByID(stationID);
        removeStation(station, layer_elem, button);
    }
    markedStations = temp;

}

function getStationbyDrawRect(lat_lngs) {
    for(var i = 0; i < layerGroups.length; i++) {
        let layer_group = layerGroups[i];
        layer_group.eachLayer(function(layer_elem){
            if(L.latLngBounds(lat_lngs).contains(layer_elem.getLatLng())){
                if(layer_elem instanceof L.Marker) {
                    //StationID and button from the marker object
                    let stationID = layer_elem._popup._content.lastChild.id;
                    var button = layer_elem._popup._content.lastChild;
                    var station = stationByID(stationID);
                    if(markedStations.length > 0) {
                        if(!markedStations.includes(layer_elem)) {
                            markedStations.push(layer_elem);
                            addStation(station, layer_elem, button);
                            showStationBar();

                        } else {
                            console.log("already in");
                        }    
                    } else {
                        markedStations.push(layer_elem);
                        addStation(station, layer_elem, button);
                        showStationBar();
                    }
                }
            }
         });
    }
}
function getStationbyDrawCircle(circleLayer) {
    var radius = circleLayer.getRadius();
    var circleCenter = circleLayer.getLatLng();
    for(var i = 0; i < layerGroups.length; i++) {
        let layer_group = layerGroups[i];
        layer_group.eachLayer(function(layer_elem){
            if(Math.abs(circleCenter.distanceTo(layer_elem.getLatLng())) <= radius){
                if(layer_elem instanceof L.Marker) {
                    //StationID and button from the marker object
                    let stationID = layer_elem._popup._content.lastChild.id;
                    var button = layer_elem._popup._content.lastChild;
                    var station = stationByID(stationID);
                    if(!(chosenStations.find(x => x.id === station.id))) {
                        button.addEventListener("click" , function() {
                            handleChosenStations(station, marker, stationID);
                        });
                        addStation(station, layer_elem, button);
                        showStationBar();              
                    }
                }
            }
         });
    }

}
function stationByID(stationID) {
    for(var i = 0; i < stationsData.length; i++) {
        if(stationsData[i].id == stationID) {
            return stationsData[i];
        }
    }
}

var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        scales = [35, 30, 25, 20, 15, 10, 5, 0, -5, -10, -15, -20, -25, -30, -35],
        labels = [];
    for (var i = 0; i < scales.length; i++) {
        if(i == 0){
            div.innerHTML +=  '<i style="background:' + getColor(scales[i]) + '"></i>' + scales[i] + '+ <br> ';
        }else if(i == scales.length -1) {
            div.innerHTML +=  '<i style="background:' + getColor(scales[i]) + '"></i>' + scales[i] + '- ';
        }else {
            div.innerHTML +=  '<i style="background:' + getColor(scales[i]) + '"></i>' + (scales[i]) + '<br>';
    }
}
    return div;
};
legend.addTo(map);

