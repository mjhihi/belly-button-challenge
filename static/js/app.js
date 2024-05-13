// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    // Filter the metadata for the object with the desired sample number
    // Use d3 to select the panel with id of `#sample-metadata`
    // Use `.html("") to clear any existing metadata
    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

    var metaData = data.metadata;
    var resultArr = metaData.filter(metaDataObj => metaDataObj.id == sample);
    var result = resultArr[0];

    var panel = d3.select("#sample-metadata");
    panel.html("");

    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });


  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    // Filter the samples for the object with the desired sample number
    // Get the otu_ids, otu_labels, and sample_values
    // Build a Bubble Chart
    // Render the Bubble Chart
    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    // Render the Bar Chart

    var samples = data.samples;
    var resultArr = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArr[0];

  
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;

    // baplot trace and data
    var yticks = otu_ids
      .slice(0, 10)
      .map(otu_id => `OTU ${otu_id}`)
      .reverse();
    var barData = [
      {
        x: sample_values.slice(0, 10).reverse(),
        y: yticks,
        type: "bar",
        orientation: "h",
        text: otu_labels.slice(0, 10).reverse()
      }
    ];

    // barplot layout
    var barLayout = {
      showlegend: false,
      title: `Top Ten OTU IDs for ${sample}`,
      margin: { t: 25, l: 130 }
    };
    // barplot
    Plotly.newPlot("bar", barData, barLayout);

    // bubble data
    var bubbleData = [
      {
        x: otu_ids.reverse(),
        y: sample_values.reverse(),
        orientation: "h",
        mode: "markers",
        text: otu_labels.reverse(),
        marker: {
          color: otu_ids.reverse(),
          size: sample_values.reverse()
        }
      }
    ];

    // bubble layout
    var bubbleLayout = {
      title: `Top Ten Measurements for Sample ${sample}`
    };

    // bubble plot
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);




  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    // Use d3 to select the dropdown with id of `#selDataset`
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    // Get the first sample from the list
    // Build charts and metadata panel with the first sample

    var names = data.names;
    var selector = d3.select("#selDataset");
    names.forEach(sample => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    const first = names[0];
    buildCharts(first);
    buildMetadata(first);

  });
}

// Function for event listener
function optionChanged(newSample) {
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
