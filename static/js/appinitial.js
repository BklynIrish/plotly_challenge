function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    //buildCharts(firstSample);
    //buildMetadata(firstSample);
  });
}
init()
d3.json("samples.json").then((data) => {
var metadata = data.metadata;
var resultArray = metadata.filter(sampleObj => sampleObj.id == 940)
console.log(resultArray)
var metadatapanel = d3.select("#sample-metadata")
// metadatapanel.append("div").text(resultArray[0].id)
// metadatapanel.append("div").text(resultArray[0].ethnicity)
// metadatapanel.append("div").text(resultArray[0].age)
// metadatapanel.append("div").text(resultArray[0].gender)
// metadatapanel.append("div").text(resultArray[0].location)
// metadatapanel.append("div").text(resultArray[0].bbtype)
// metadatapanel.append("div").text(resultArray[0].wfreq)
Object.entries(resultArray[0]).forEach(([key, value]) => {
  //var row doesn't have to be in each iteration, the alternative would be to remofe at 139 and replace at 134
  metadatapanel.append("p").text(`${key} : ${value}`)
  
})
});
var idValue = String(d3.select("#selDataset").node().value)
console.log(idValue);
function optionChanged(x) {
  var metadatapanel = d3.select("#sample-metadata")
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == x)
    console.log(x);
    d3.select("#sample-metadata").selectAll("p").remove();
    Object.entries(resultArray[0]).forEach(([key, value]) => {
      //var row doesn't have to be in each iteration, the alternative would be to remove at 139 and replace at 134
      metadatapanel.append("p").text(`${key} : ${value}`)  
    
    })
  })
}



