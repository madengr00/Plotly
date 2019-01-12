/// @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);


function buildMetadata(sample) {
  // Grab a reference to the dropdown select element
  // var selector = d3.select("#sample-metadata");

  // Use the list of sample names to populate the select options
  
  /* data route */
  var url = "/metadata/<sample>";
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(response){
    var metadata = response;
    
    // The data should come from a list of dictionaries (key/value pairs)
    console.log(metadata);
    var list = d3.select(`#sample-metadata`).html(`<div> ${metadata} </div>`);
  //   //map values from response
  //   var sample = metadata.map(data => data.sample);
  //   var ethnicity = metadata.map(data => data.ethnicity);
  //   var gender = metadata.map(data => data.gender);
  //   var age = metadata.map(data => data.age);
  //   var location = metadata.map(data => data.location);
  //   var bbtype = metadata.map(data => data.bbtype);
  //   var wfreq = metadata.map(data => data.wfreq);

  //   console.log(sample);
  //   console.log(ethnicity);
  //   console.log(gender);
  //   console.log(age);
  //   console.log(location);
  //   console.log(bbtype);
  //   console.log(wfreq);
  });  
}


  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
function buildCharts(sample) {
    /* data route */
  var url = "/samples/<sample>";
  // Use `d3.json` to fetch the data
  d3.json(url).then(function(response){
    // Create a Pie Chart 
    var data = [response];
    console.log(data);
    
    // Slice the first 10 records
    var trace1 = {
      labels: data.map(data => data.otu_labels.slice(0,10);
      values: data.map(data => data.sample_values.slice(0,10);
      type: 'pie'
    }
    var data = [trace1]
    var layout = {
      title: "Top 10 Samples"
  };

  Plotly.newPlot("pie",left,layout);
});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
