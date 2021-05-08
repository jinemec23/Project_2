d3.json("api/wine_data").then((importedData) => {
    console.log(importedData)
    
    d3.select("tbody")
        .selectAll("tr")
        .data(winedata_jn)
        .enter()
        .append("tr")
        .html(function(d) {
        return `<td>${d.Country}</td><td>${d.County}</td><td>${d.Designation}</td><td>${d.Points}</td><td>${d.Price}</td><td>${d.Province}</td><td>${d.Title}</td><td>${d.Variety}</td><td>${d.Winery}</td><td>${d.Year}</td>`;
        });
});

function runEnter() {
    // Prevent the page from refreshing
    if (d3.event) {
        d3.event.preventDefault();
    }
    
    var inputElement = d3.select("#input");
    var inputValue = inputElement.property("value");

    var filteredData = winedata_jn.filter(date => date.Country === inputValue 
        // ||
        // date.County === inputValue ||
        // date.Designation === inputValue ||
        // date.Points === inputValue ||
        // date.Price === inputValue ||
        // date.Province === inputValue ||
        // date.Title === inputValue ||
        // date.Variety === inputValue ||
        // date.Winery === inputValue ||
        // date.Year === inputValue
        );
    
    filteredData.forEach(function(date) {
      var tbody=  d3.select("tbody")
        // .selectAll("tr")
        // .data(winedata_jn)
        // .enter()
        // .append("tr")
        // .html(function(d) {
        //     return `<td>${d.Country}</td><td>${d.County}</td><td>${d.Designation}</td><td>${d.Points}</td><td>${d.Price}</td><td>${d.Province}</td><td>${d.Title}</td><td>${d.Variety}</td><td>${d.Winery}</td><td>${d.Year}</td>`;
        //   });
        var row = tbody.append("tr");
        Object.entries(date).forEach(function([key, value]) {
            // console.log(key, value);
            var cell = row.append("td");
            cell.text(value);
        });
    });
};

runEnter()

// Create event handlers 
var button = d3.select("#filter-btn");
var form = d3.select("#form");
button.on("click", runEnter);
form.on("submit", runEnter);
