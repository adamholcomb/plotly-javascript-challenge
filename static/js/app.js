
// Create charts function
function Charts(ID) {

    // Read in data
    d3.json("Data/samples.json").then((data)=> {
        // console.log(data)
     
        // Filter down to ID data 
        var samp = data.samples.filter(sampleName => sampleName.id.toString() == ID)[0]
        console.log(samp)


        // Get sample values
        var samplevalues = samp.sample_values.slice(0, 10).reverse()
        console.log(samplevalues)
  
        // Get IDs 
        var otutop10 = samp.otu_ids.slice(0, 10)
        var otuids = (otutop10.map(otu => `OTU ${otu}`)).reverse()
        console.log(otuids)

        // Get labels
        var otulabels = samp.otu_labels.slice(0, 10);
        console.log(otulabels)

        // Get wash frequency
        var metadata = data.metadata.filter(md => md.id == ID)[0]
        console.log(metadata)
        var wfreq = metadata.wfreq
        console.log(wfreq)

        //----------------------------------------------------------------

        // Create bar graph
        var bar = [{
            x: samplevalues,
            y: otuids,
            text: otulabels,
            type:"bar",
            orientation: "h",
        }];
        Plotly.newPlot("bar", bar);

        //----------------------------------------------------------------

        // Create bubble chart
        var bubble = [{
            x: samp.otu_ids,
            y: samp.sample_values,
            mode: "markers",
            marker: {
                size: samp.sample_values,
                color: samp.otu_ids
            },
            text: samp.otu_labels
        }];
        Plotly.newPlot("bubble", bubble);

        //----------------------------------------------------------------
        
        // Create gauge
        var gauge = [{
              domain: { x: [0, 1], y: [0, 1] },
              value: wfreq,
              title: { text: "Wash Frequency" },
              type: "indicator",
              mode: "gauge+number",
              bgcolor: "lavender",
              gauge: {
                axis: { range: [0, 9], tickwidth: 1, tickcolor: "lavender"  },
                bar:{color: 'black'},
                steps: [
                  { range: [0, 1], color: "HoneyDew" },
                  { range: [1, 2], color: "palegreen" },
                  { range: [2, 3], color: "lightgreen" },
                  { range: [3, 4], color: "limegreen" },
                  { range: [4, 5], color: "mediumseagreen" },
                  { range: [5, 6], color: "seagreen" },
                  { range: [6, 7], color: "green" },
                  { range: [7, 8], color: "green" },
                  { range: [8, 9], color: "darkslategray" }],
              },
              threshold: {
                line: { color: "gray", width: 4 },
                thickness: 0.75,
                value: wfreq
              },
            }
          ];
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', gauge, layout);
    });
}

//----------------------------------------------------------------

// Populate dropdown menu
function init() {
    // Select dropdown menu 
    let dropdownmenu = d3.select("#selDataset")

    // Get IDs 
    d3.json("Data/samples.json").then(data => {
        data.names.forEach(name => {
            dropdownmenu.append("option").text(name).property("value")
        });

        // Display the changes
        Charts(data.names[0]);
        Table(data.names[0]);
    });
}

//----------------------------------------------------------------

function optionChanged(ID) {
    Charts(ID);
    Table(ID);
}

//----------------------------------------------------------------

// Populate data table
function Table(ID) {
    //Select datatable
    let datatable = d3.select("#sample-metadata")
    datatable.html("")
    
    // Get demographic data
    d3.json("Data/samples.json").then((data1)=> {
        
        // Filter down to data 
        var metadata = data1.metadata.filter(md => md.id == ID)[0]

        // Insert data
        Object.entries(metadata).forEach(([key, value]) => {
            datatable.append("p").text(`${key}: ${value}`)
        })
    })
}

init();

        //--------------------------------------------------------
        // Get sample values
        // var samplevalues = samples.map(samples => samples.sample_values)
        // let samplesort = samplevalues.sort((a,b)=>b-a)
        // var sampletop10 = samplesort.map(sampleslice=>sampleslice.slice(0,10))
        
        // Get IDs
        // var otu_id = data.samples.map(ids => ids.otu_ids)
        // var otutop10 = otu_id.map(idslice => idslice.slice(0,10))
        // var otuidtop10 = otutop10[0].map(otuslice => `OTU ${otuslice}`)

        // Get labels
        // var otu_label = data.samples.map(labels => labels.otu_labels)
        // var labeltop10 = otu_label.map(labelslice => labelslice.slice(0,10))
        //----------------------------------------------------------