// Creating map object
var myMap = L.map("map", {
  center: [34.0522, -118.2437],
  zoom: 8
});


// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Load in data
var wineData = "Data/Wines_updated.csv";
var worldJSON = "custom.geo.json"

d3.csv(wineData).then(loadedData => {
  console.log(loadedData)
})


d3.json(worldJSON).then(data => {
console.log(data.features);
var Country = L.geoJSON(data.features.name, {
  onEachFeature: (feature, layer) => {
    layer.bindPopup(`<h3>${data.features.name}</h3>`)
  }
})
.addTo(myMap)

map = L.choropleth(data, {
  valueProperty: 'Country',
  scale: ['white', 'purple'],
  steps: 10, // number of breaks or steps in range
  mode: 'q', // q for quantile, e for equidistant, k for k-means
  style: {
    color: '#fff', // border color
    weight: 2,
    fillOpacity: 0.8
  },
  //onEachFeature: function(columns, layer) {
    //layer.bindPopup(`Winery: ${columns.Winery}`)
  //}
}).addTo(myMap)

});

var Country = worldJSON.properties

//Convert to JSON
var parsedCSV = Papa.parse("Data/Wines_updated.csv", {
download: true,
header: true,
complete: function(results) { //everything below runs only after the CSV has been loaded and processed.
    CountryHolder = L.geoJson(Country, { //defining the leaflet overlay layer that will house this data; polygons with location data is loaded in Country variable.,
            onEachFeature: function PBpopulate(feature, layer) { //will be executed for each item in the layer
                var popupText = "";
                var labelText = "";
                if (features.properties && features.properties.name) {
                    popupText += "<b>" + features.properties.name.toString() + "</b>";
                    labelText = features.properties.name.toString();
                    //look up the CSV data for a row having the same name as the map item's name
                    var filtered = results.data.filter(function(data){return data.name == this;}, feature.properties.name.toString());
                    console.log(JSON.stringify(filtered));
                    popupText += "<br>" + JSON.stringify(filtered);
                    }
                if (feature.properties && feature.properties.description) {
                    popupText += "<br>" + feature.properties.description.toString();
                    }
                layer.bindPopup(popupText).bindLabel(labelText);
            }   //closing onEachFeature function
        }).addTo(myMap); //map layer created, added to "country" overlay layer
}   //Papa.parse's complete: section over
}); // Papa.parse function over.
console.log(parsedCSV)

// Create a new choropleth layer
// Binding a pop-up to each layer

// map = L.choropleth(data, {
//     valueProperty: 'Country',
//     scale: ['white', 'purple'],
//     steps: 10, // number of breaks or steps in range
//     mode: 'q', // q for quantile, e for equidistant, k for k-means
//     style: {
//       color: '#fff', // border color
//       weight: 2,
//       fillOpacity: 0.8
//     },
//     //onEachFeature: function(columns, layer) {
//       //layer.bindPopup(`Winery: ${columns.Winery}`)
//     //}
//   }).addTo(myMap)


//add legend
var legend = L.control({ position: "bottomright"});