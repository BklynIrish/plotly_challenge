var sampleData = "../../../data/samples.json"

//get subjectIDs so we can populate the pull down list.
var data = {};
d3.json(sampleData).then(function(data) {
        console.log(this);
        var subjectIDs = data.names;
        console.log(subjectIDs);
        updateIDList(subjectIDs);
        var selectedID = d3.select("#selDataset");
        //selectedID.on("change", runFilter);
        document.getElementById("selDataset").addEventListener("change", runFilter);
        var theRow = {}

        function runFilter() {
            //the code on line 16 cqptures users demographic input
            var idValue = String(d3.select("#selDataset").node().value);
            console.log("runfilter", d3.select("#selDataset"));
            console.log("here", idValue);
            //line 20 is filtering the data corresponding to the id that the user selects
            data.metadata.forEach(function(row) {
                    if (row.id == idValue) {
                        metaData = row
                        console.log(row)
                    }
                })
                // this can also be accomplished by filtering as we did in line 22
            data.samples.forEach(function(name) {
                if (name.id == idValue) {
                    theRow = name
                    console.log(name)
                }
            })
            console.log(theRow)

            console.log("print keys ", Object.entries(metaData));
            populateDemo(metaData);

            var topSampleValues = theRow.sample_values.slice(0, 10).reverse();
            var topOTUIDs = theRow.otu_ids.slice(0, 10).reverse();
            var otuString = "OTU ";
            var topStringOTUIDS = topOTUIDs.map(function(item) {
                return otuString.concat(item.toString());
            })
            var topOTULabels = theRow.otu_labels.slice(0, 10).reverse();
            console.log(topSampleValues);
            console.log(topStringOTUIDS);
            console.log(topOTULabels);
            var trace1 = {
                y: topStringOTUIDS,
                x: topSampleValues,
                type: "bar",
                orientation: "h",
                text: topOTULabels
            }
            var layout1 = {
                title: "",
                xaxis: { title: "Sample Values" }
            };
            var graphData = [trace1];
            Plotly.newPlot("bar", graphData, layout1)

            allColors = randomColor(theRow.otu_ids.length)
            console.log(allColors);

            function randomColor(countVar) {
                var allC = [];
                for (var j = 0; j < countVar; j++) {
                    var c = "";
                    color1 = (Math.floor(Math.random() * 256).toString());
                    color2 = (Math.floor(Math.random() * 256).toString());
                    color3 = (Math.floor(Math.random() * 256).toString());
                    c = `rgb(${color1}, ${color2}, ${color3})`
                    allC.push(c);
                    console.log("allC ", allC);
                }
                return allC;
            }
            console.log("all colors ", allColors);
            var trace2 = {
                y: theRow.sample_values,
                x: theRow.otu_ids,
                text: theRow.otu_labels,
                mode: 'markers',
                marker: {
                    color: allColors,
                    size: theRow.sample_values,
                    sizeref: 2.0 * Math.max(theRow.sample_values) / 50 ** 2
                        //color: theRow.otu_ids
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
                        { 'range': [0, 1], 'color': 'rgb(255,230,255)' },
                        { 'range': [1, 2], 'color': 'rgb(255,200,255)' },
                        { 'range': [2, 3], 'color': 'rgb(255,170,255)' },
                        { 'range': [3, 4], 'color': 'rgb(255,140,255)' },
                        { 'range': [4, 5], 'color': 'rgb(255,100,255)' },
                        { 'range': [5, 6], 'color': 'rgb(255,50,255)' },
                        { 'range': [6, 7], 'color': 'rgb(255,0,255)' },
                        { 'range': [7, 8], 'color': 'rgb(200,0,200)' },
                        { 'range': [8, 9], 'color': 'rgb(150,0,150)' },
                        { 'range': [9, 10], 'color': 'rgb(100,0,100)' }

                    ],

                }
            }];
            var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
            Plotly.newPlot('gauge', graphData3, layout);
        }





    })
    //this is analagous to appinitial lines 24-32
function populateDemo(values) {
    //d3.event.preventDefault();
    console.log(d3.select("#selDataset"));
    d3.select("#sample-metadata").selectAll("p").remove();
    Object.entries(values).forEach(([key, value]) => {
        //var row doesn't have to be in each iteration, the alternative would be to remofe at 139 and replace at 134
        var row = d3.select("#sample-metadata");
        row.append("p").text(`${key}: ${value}`);
    })
}


function updateIDList(subjectIDs) {
    //d3.event.preventDefault();
    console.log(d3.select("#selDataset"));
    d3.select("#selDataset").selectAll("option").remove();
    d3.select('#ID').append("option").text("empty");
    subjectIDs.forEach(function(id) {
        var row = d3.select("#selDataset");
        row.append("option").text(id);
    })
}