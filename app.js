var sampleData = "data/samples.json"

//get bacteriaIDs so we can populate the pull down list.
var data = {};
d3.json(sampleData).then(function(data) {
        var bacteriaIDs = data.names;

        updateIDList(bacteriaIDs);
        var selectedID = d3.select("#selDataset");
        //selectedID.on("change", runFilter);
        document.getElementById("selDataset").addEventListener("change", runFilter);
        var bactId = {}

        function runFilter() {

            var idValue = d3.select("#selDataset").node().value;

            //line 20 is filtering the data corresponding to the id that the user selects
            var metaData = data.metadata.filter(
                (sampleObj) => sampleObj.id == idValue
            )[0];

            var bactId = data.samples.filter(
                (sampleObj) => sampleObj.id == idValue
            )[0];



            populateDemo(metaData);

            var topSampleValues = bactId.sample_values.slice(0, 10).reverse();
            var topOTUIDs = bactId.otu_ids.slice(0, 10).reverse();
            var otuString = "OTU ";
            var topStringOTUIDS = topOTUIDs.map(function(item) {
                return otuString.concat(item.toString());
            })
            var topOTULabels = bactId.otu_labels.slice(0, 10).reverse();

            var trace1 = {
                y: topStringOTUIDS,
                x: topSampleValues,
                type: "bar",
                orientation: "h",
                text: topOTULabels,
                marker: {
                    color: 'magenta'
                }
            }
            var layout1 = {
                title: "",
                xaxis: { title: "Sample Values" }
            };
            var graphData = [trace1];
            Plotly.newPlot("bar", graphData, layout1)

            allColors = randomColor(bactId.otu_ids.length)


            function randomColor(countVar) {
                var allC = [];
                for (var j = 0; j < countVar; j++) {
                    var c = "";
                    color1 = (Math.floor(Math.random() * 256).toString());
                    color2 = (Math.floor(Math.random() * 256).toString());
                    color3 = (Math.floor(Math.random() * 256).toString());
                    c = `rgb(${color1}, ${color2}, ${color3})`
                    allC.push(c);

                }
                return allC;
            }

            var trace2 = {
                y: bactId.sample_values,
                x: bactId.otu_ids,
                text: bactId.otu_labels,
                mode: 'markers',
                marker: {
                    color: allColors,
                    size: bactId.sample_values,
                    sizeref: 2.0 * Math.max(bactId.sample_values) / 50 ** 2

                }
            }
            var layout = {
                title: "",
                width: 1000,
                height: 500,
                margin: { t: 100, b: 100 },
                xaxis: { title: "OTU ID" }
            };
            var graphData2 = [trace2];
            Plotly.newPlot('bubble', graphData2, layout);

            var graphData3 = [{
                domain: { x: [0, 1], y: [0, 1] },
                value: metaData.wfreq,
                title: { text: "Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    type: 'pie',
                    shape: "angular",
                    'bar': { 'color': "red" },
                    'axis': {
                        'range': [0, 10],
                        'tick0': 0,
                        'dtick': 1,
                        'ticklen': 10,
                        'tickwidth': 5,
                        'tickfont': { 'size': 20 }
                    },
                    'steps': [
                        { 'range': [0, 1], 'color': 'rgb(0,0,If )' },
                        { 'range': [1, 2], 'color': 'rgb(25,25,255)' },
                        { 'range': [2, 3], 'color': 'rgb(50,50,255)' },
                        { 'range': [3, 4], 'color': 'rgb(75,75,255)' },
                        { 'range': [4, 5], 'color': 'rgb(100,100,255)' },
                        { 'range': [5, 6], 'color': 'rgb(125,125,255)' },
                        { 'range': [6, 7], 'color': 'rgb(150,150,255)' },
                        { 'range': [7, 8], 'color': 'rgb(175,175,255)' },
                        { 'range': [8, 9], 'color': 'rgb(200,200,255)' },
                        { 'range': [9, 10], 'color': 'rgb(225,225,255)' }

                    ],

                }
            }];
            var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
            Plotly.newPlot('gauge', graphData3, layout);
        }





    })
    //this is analagous to appinitial.js lines 24-32
function populateDemo(values) {


    d3.select("#sample-metadata").selectAll("p").remove();
    Object.entries(values).forEach(([key, value]) => {
        //var row doesn't have to be in each iteration, the alternative would be to remove at 139 and replace at 134
        var row = d3.select("#sample-metadata");
        row.append("p").text(`${key}: ${value}`);
    })
}


function updateIDList(bacteriaIDs) {
    d3.select("#selDataset").selectAll("option").remove();
    d3.select('#ID').append("option").text("empty");
    bacteriaIDs.forEach(function(id) {
        var row = d3.select("#selDataset");
        row.append("option").text(id);
    })
}