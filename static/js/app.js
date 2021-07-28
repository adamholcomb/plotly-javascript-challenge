// Read in data
d3.json("data/samples.json").then(data => {
    console.log(data)

    // var samples = Object.values(data.samples)
    // console.log(samples)

    // Get sample values
    var samplevalues = data.samples.map(samples => samples.sample_values)
    // console.log(samplevalues)

    // Make sure data is sorted in descending order
    let samplesort = samplevalues.sort((a,b)=>b-a)
    console.log(samplesort)


})