const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');

(async () => {

    //let url = "https://trends24.in/germany"
    let url = "https://trends24.in/germany/bremen"
    //let url = "https://trends24.in/" // Worldwide
    let maxPanels = 3 // Up to 23 for 1 day

    console.log("\nFetching ", url)

    let { data } = await axios.get(url);

    let $ = await cheerio.load(data);

    let title = $("title").text();
    console.log("Title:", title);

    let panels = $(".trend-card").toArray().slice(0, maxPanels)

    // Wir bauen ein Array von Arrays
    var results = []

    panels.forEach((v,i) => {

        let panel = $(v).find("li")

        var hashtags = panel.toArray().map( (v) => {
            return $(v).children().first().text()
        })

        results.push(hashtags)
    })

    //console.log(results)

    // Aggregieren durch Mischen und Filtern von Duplikaten:

    var alle = []
    for (j = 0; j < 10; j++) {
        results.forEach( (v,i) => {
            alle.push(v[j])
        })
    }

    //console.log(alle)

    let uniq = _.uniqWith(alle, (i, j) => {
        return _.lowerCase(i) == _.lowerCase(j)
    })
    console.log(uniq)


})()



