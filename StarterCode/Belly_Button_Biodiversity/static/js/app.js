function buildMetadata(sample) {
  /* data route */  //Note:  javascript did not recognize <sample> notation as a variable
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

    // remove previous values from the #sample-metadata panel
    d3.select("#sample-metadata").html("")

    // add values to the #sample-metadata panel
    d3.select("#sample-metadata").append("li").text(`Sample: ${sample}`);
    d3.select("#sample-metadata").append("li").text(`Ethnicity: ${ethnicity}`);
    d3.select("#sample-metadata").append("li").text(`Gender: ${gender}`);
    d3.select("#sample-metadata").append("li").text(`Age: ${age}`);
    d3.select("#sample-metadata").append("li").text(`Location: ${location}`);
    d3.select("#sample-metadata").append("li").text(`Bbtype: ${bbtype}`);
    d3.select("#sample-metadata").append("li").text(`Wfreq: ${wfreq}`);

    //Create a Gauge Chart
    // Enter a speed between 0 and 180
    var level = wfreq;

    // Trig to calc meter point
    var degrees = 9 - level,
      radius = .5;
    var radians = degrees * Math.PI / 9;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);

    // Path: may have to change to create a better triangle
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
    var path = mainPath.concat(pathX,space,pathY,pathEnd);

    var data = [{ type: 'scatter',
      x: [0], y:[0],
      marker: {size: 28, color:'850000'},
      showlegend: false,
      name: 'speed',
      text: level,
      hoverinfo: 'text+name'},
      { values: [50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50/9, 50],
      rotation: 90,
      text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3' , '1-2', '0-1',''],
      textinfo: 'text',
      textposition:'inside',
      labels: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3' , '1-2', '0-1',''],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
      }];

    var layout = {
      shapes:[{
          type: 'path',
          path: path,
          fillcolor: '850000',
          line: {
            color: '850000'
          }
        }],
      title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
      // height: 1000,
      // width: 1000,
      xaxis: {zeroline:false, showticklabels:false,
          showgrid: false, range: [-1, 1]},
      yaxis: {zeroline:false, showticklabels:false,
          showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('gauge', data, layout);

  });
  
}
  
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

function buildCharts(sample) {
  /* data route */
  var url = `/samples/${sample}`;
  // Use `d3.json` to fetch the data
  d3.json(url).then(function(response){
    console.log(response);


    // Create a Pie Chart
    console.log(response.sample_values);
    console.log(response.otu_ids);
    var trace1 = [{
      values: response.sample_values.slice(0,10),
      labels: response.otu_ids.slice(0,10),
      type: "pie",
      sort: true
    }];
    var layout = {
      title: "<b> Top 10 Samples </b>",
    }

    console.log(trace1);
    //Plot the chart to a dive tag with id "pie"
    Plotly.newPlot("pie",trace1,layout);
    

    //Create a Bubble Chart
    var trace2 = [{
      y: response.sample_values,
      x: response.otu_ids,
      text: response.otu_labels,
      mode: 'markers',
      marker: {
        size: response.sample_values,
        color: response.otu_ids
      }
    }];
    var layout = {
    sort: true,
    xaxis: {title: {text: 'OTU IDS'}},
    yaxis: {title: {text: 'Sample Values'}},
    sort: true
    }
    //Plot the chart to a dive tag with id "bubble"
    Plotly.newPlot("bubble",trace2,layout);
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
    console.log(firstSample);
  });
}

function optionChanged(newSample) {
  console.log(newSample);
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init()