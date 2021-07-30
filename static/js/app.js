// Read in data

function BarCharts(ID) {

    d3.json("data/samples.json").then(data => {
        console.log(data)

        // var samples = Object.values(data.samples)
        // console.log(samples)

        // Get sample values
        var samplevalues = data.samples.map(samples => samples.sample_values)
        // console.log(samplevalues)

        // Make sure data is sorted in descending order
        let samplesort = samplevalues.sort((a,b)=>b-a)
        // console.log(samplesort)

        // Slice down to top 10 samples for each person
        var sampletop10 = samplesort.map(sampleslice=>sampleslice.slice(0,10))
        console.log(sampletop10[0]);

        
        // Get IDs
        var otu_id = data.samples.map(ids => ids.otu_ids)
        // console.log(otu_id)

        // Slice down to top 10 ids
        var otutop10 = otu_id.map(idslice => idslice.slice(0,10))
        console.log(otutop10[0])

        var otuidtop10 = otutop10[0].map(otuslice => `OTU ${otuslice}`)
        console.log(otuidtop10)


        // Get labels
        var otu_label = data.samples.map(labels => labels.otu_labels)
        // console.log(otu_label)

        // Slice down to top 10 lables
        var labeltop10 = otu_label.map(labelslice => labelslice.slice(0,10))
        console.log(labeltop10)

        let filteredSample = data.samples.filter(sampleName => sampleName.id == ID)[0]
        console.log(filteredSample)

        let otu_ids = filteredSample.otu_ids.slice(0, 10)
        console.log(otu_ids)

        let yticksBar = otu_ids.map(otuID => `OTU ${otuID}`)
        console.log(yticksBar)


        // Create trace
        function init() {
            data1 = [{
                X: sampletop10[0],
                // x: [1,2,3],
                y: otuidtop10,
                // y: [3,2,1],
                text: labeltop10[0],
                type: 'bar',
                orientation: 'h'
            }]
            Plotly.newPlot("bar", data1)
        } 
        init()

    })
}
BarCharts(940)