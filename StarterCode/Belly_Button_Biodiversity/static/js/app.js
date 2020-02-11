function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    var url = "/metadata/"+sample;
    
    console.log("url is            ", url)

    var output = d3.select("#sample-metadata");
    output.html("")

    d3.json(url).then(data => {
      Object.entries(data).forEach(([key, value]) => {
        var li = output.append("div").text(`${key}: ${value}`);
      });
    })
    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  console.log("sample = ", sample)
  var url = "/samples/"+sample;
  
    d3.json(url).then(data => {
        let layout = {
            //title: 'Pie Chart'
        }
        
        trace = {
          labels : data["otu_ids"].slice(0,10),
          values: data["sample_values"].slice(0,10),
          type: "pie"
      }

        Plotly.newPlot('pie', [trace], layout)
      
         var trace1 = {
          x: data["otu_ids"],
          y: data["sample_values"],
          mode: 'markers',
          text: data["otu_labels"] ,
          
          marker: {
            size: data["sample_values"],
            color: data["otu_ids"], colorscale: 'Rainbow'
            
          }
        };
        
        var data1 = [trace1];
        
        var layout1 = {
      //    title: 'Marker Size',
          showlegend: false,
            height: 600,
            width: 1200
        };
        
        Plotly.newPlot('bubble', data1, layout1)

    })
    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}
var url1 = "/metadata/"+sample;
      
        d3.json(url1).then(metadata => {

          console.log("metadata = ", metadata["WFREQ"])
          //   let layout = {
          //       title: 'Belly Button Washing Frequency'
          //   }
            
          // trace = {
          //     //domain : {y: [0, 10], x: metadata["WFREQ"]},
          //     value: metadata["WFREQ"],
          //     type: "indicator",
          //     mode: "gauge+delta"
          // }


        var data = [
  
          {
           domain: {
             x: [0, 1], y: [0, 1]}, 
          value: metadata["WFREQ"], title: {text: "Scrubs Per Week"},
          type: "indicator", mode: "gauge+number", //delta: {reference: 400}, 
          gauge: 
            {   axis:
                {range: [0, 10]}, 
                bar:{color:"darkblue"}, 
                steps: [
                      {range: [0, 1],color: "coral"}, 
                      {range: [1, 2], color: "lightblue"}, 
                      {range: [2, 3], color: "lightgreen"}, 
                      {range: [3, 4], color: "pink"}, 
                      {range: [4, 5], color: "orange"}, 
                      {range: [5, 6], color: "lightblue"}, 
                      {range: [6, 7], color: "yellow"}, 
                      {range: [7, 8], color: "royalblue"}, 
                      {range: [8, 9], color: "grey"}, 
                    ], 
                //threshold: { line: {color: "red", width: 4}, thickness: 0.8, value: 490 }
            }
          }
          
          ];
        
        var layout = { title: 'Belly Button Washing Frequency',
          //width: 500, height: 500, 
          // margin: {t: 25, r: 25, l: 25, b: 25},
          //   shapes: [{type: "rect", x0: -0.03, x1: 0.56, y0: 0.55, y1: 1,
          //   line: {color: "gray", width: 1}}]
          };
        

          Plotly.newPlot('gauge',data,layout);
          //Plotly.newPlot('gauge', [trace], layout)             

        })
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
