// // Build the metadata panel

const url =
    "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";


const dataPromise = d3.json(url);
    console.log("Data Promise: ", dataPromise);

//get the metadata field
d3.json(url).then(function(data){
    console.log(data);
});

//Filter the metadata for the object with the desired sample number
var samples;
var meta_data;
d3.json(url).then(function (data) {
    let selector = d3.select("#selDataset");
    meta_data = data.metadata;
    samples = data.samples;
    data.names.forEach((id) => {
        selector.append("option").text(id).property("value", id);
    });
    metaData(meta_data[0]);
    hbarChart(samples[0]);
    bubbleChart(samples[0]);
});


    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
function optionChanged(value) {
    const selectedId = samples.find((item) => item.id === value);
    const demographicInfo = meta_data.find((item) => item.id == value);

    // Demographic Data
    metaData(demographicInfo);

    // Bar Chart
    hbarChart(selectedId);

    // Bubble Chart
    bubbleChart(selectedId);

}
// // function to build both charts
// function buildCharts(sample) {
//   d3.json(url).then((data) => {
function metaData(demographicInfo) {
    let demoSelect = d3.select("#sample-metadata");

    demoSelect.html(
        `id: ${demographicInfo.id} <br> 
      ethnicity: ${demographicInfo.ethnicity} <br>
    gender: ${demographicInfo.gender} <br>
    age: ${demographicInfo.age} <br>
    location: ${demographicInfo.location} <br>
    bbtype: ${demographicInfo.bbtype} <br>
    wfreq: ${demographicInfo.wfreq}`
    );
}
//     // Get the samples field
//     // Filter the samples for the object with the desired sample number

//     // Get the otu_ids, otu_labels, and sample_values






//     // Render the Bubble Chart

function bubbleChart(selectedId) {
    let x_axis = selectedId.otu_ids;
    let y_axis = selectedId.sample_values;
    let marker_size = selectedId.sample_values;
    let color = selectedId.otu_ids;
    let text = selectedId.otu_labels;
//     // Build a Bubble Chart
    bubble = {
        x: x_axis,
        y: y_axis,
        text: text,
        mode: "markers",
        marker: {
            color: color,
            colorscale: "Earth",
            size: marker_size,
        },
        type: "scatter",
    };
    let chart = [bubble];

    let layout = {
        xaxis: {
            title: { text: "OTU ID" },
        },
    };

    Plotly.newPlot("bubble", chart, layout);
}


//     // For the Bar Chart, map the otu_ids to a list of strings for your yticks
// Function for event listener
    
function hbarChart(selectedId) {
    let x_axis = selectedId.sample_values.slice(0, 10).reverse();
    let y_axis = selectedId.otu_ids
        .slice(0, 10)
        .reverse()
        .map((item) => `OTU ${item}`);
    let text = selectedId.otu_labels.slice(0, 10).reverse();
//Build a Bar Chart

    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [barChart];
//Don't forget to slice and reverse the input data appropriately
    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600,
    };
// Build charts and metadata panel each time a new sample is selected
// Render the Bar Chart
    Plotly.newPlot("bar", chart, layout);
}







// Function to run on page load
function init() {

// Get the names field


// Use d3 to select the dropdown with id of `#selDataset`


// Use the list of sample names to populate the select option
// Hint: Inside a loop, you will need to use d3 to append a new
// option for each sample name.


// Get the first sample from the list



}
// Initialize the dashboard
init();


