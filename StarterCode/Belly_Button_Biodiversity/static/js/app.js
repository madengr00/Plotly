function buildMetadata(sample) {
  /* data route */
  var url = "/metadata/" + sample;
  console.log(url);
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(response) {
    var metadata = [response];
    console.log(metadata);
    //map values from response
    var sample = metadata.map(data => data.sample);
    var ethnicity = metadata.map(data => data.ETHNICITY);
    var gender = metadata.map(data => data.GENDER);
    var age = metadata.map(data => data.AGE);
    var location = metadata.map(data => data.LOCATION);
    var bbtype = metadata.map(data => data.BBTYPE);
    var wfreq = metadata.map(data => data.WFREQ);

    console.log(sample);
    console.log(ethnicity);
    console.log(gender);
    console.log(age);
    console.log(location);
    console.log(bbtype);
    console.log(wfreq);

    // add values to the #sample-metadata panel
    d3.select("#sample-metadata").html("")
    d3.select("#sample-metadata").append("li").text(`Sample: ${sample}`);
    d3.select("#sample-metadata").append("li").text(`Ethnicity: ${ethnicity}`);
    d3.select("#sample-metadata").append("li").text(`Gender: ${gender}`);
    d3.select("#sample-metadata").append("li").text(`Age: ${age}`);
    d3.select("#sample-metadata").append("li").text(`Location: ${location}`);
    d3.select("#sample-metadata").append("li").text(`Bbtype: ${bbtype}`);
    d3.select("#sample-metadata").append("li").text(`Wfreq: ${wfreq}`);
  });  
}


  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
// function buildCharts(sample) {
//     /* data route */
//   var url = "/samples/<sample>";
//   // Use `d3.json` to fetch the data
//   d3.json(url).then(function(response){
//     // Create a Pie Chart 
//     var data = [response];
//     console.log(data);
    
//     // Slice the first 10 records
//     var trace1 = {
//       labels: data.map(data => data.otu_labels.slice(0,10);
//       values: data.map(data => data.sample_values.slice(0,10);
//       type: 'pie'
//     }
//     var data = [trace1]
//     var layout = {
//       title: "Top 10 Samples"
//   };

//   Plotly.newPlot("pie",left,layout);
// });
// }

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
    //buildCharts(firstSample);
    buildMetadata(firstSample);
    console.log(firstSample);
  });
}

function optionChanged(newSample) {
  console.log(newSample);
  // Fetch new data each time a new sample is selected
  //buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init()
