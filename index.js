const {url, urls, terminator, headers, regex} = require("./helperConsts.js");
const fetch = require('node-fetch');
const puppet = require('puppeteer');


module.exports = execute;

async function execute(options) {
    if (!options.Treatment) {
        console.log('Enter a treatment');
        return;
    } 
    if (!options.Trials) {
        console.log('Give me some comma separated trials with no spaces like this "CONTROL,POTATO,TOMATO"');
        return;
    }
    let trialResultUrls = {};
    let trials = options.Trials.split(',');

    let trialCount = trials.length;
    let count;
    // Create trial object to hold our urls
    for (let i = 0; i < trialCount; i++) {
        trialResultUrls[trials[i]] = [];
    }
    // fetch might work with zillow business urls/vpn, but will fail at home
    // await fetch(url)
    //     .then(res => {
    //         console.log(res.clone().url)
    //         return res.text()}
    //     )
    //     .then(resText => {
    //         resFind = resText.match(regex)[0].replace(terminator, '');
    //         resJSON = JSON.parse(`{${resFind}}`)
    //         console.log(resJSON)
    //     })
    //     .catch(err => console.log(err))

    try {
        
        var browser = await puppet.launch({headless: false});

        // for testing if repeated visits to the same url return the same seo buckets 
        // let j = 0;
        // while(j < 5) {
        //     for (let i = 0; i < trialCount; i++) {
        //         trialResultUrls[trials[i]] = [];
        //     }

        // loop through the urls
        for (let i = 0; i < urls.length; i++) {
            // if(i % 10 == 0) {
            //     console.log(trialResultUrls)
            // }
            var page = await browser.newPage();
            let myUrl = urls[i];
            await page.goto(myUrl)
                .then(page => page.text()
                )
                .then(resText => {
                    let resAbTreatmentsAndTrials;
                    try {
                        // pull the abTrials object data out
                        resAbTreatmentsAndTrials = resText.match(regex)[0].replace(terminator, '');
                    }
                    catch {
                        console.log('Anti scraper has you')
                        return;
                    }
                    // generate the abTrials object
                    resJSONTreatmentsAndTrials = JSON.parse(`{${resAbTreatmentsAndTrials}}`)

                    let resTrial = resJSONTreatmentsAndTrials["abTrials"][options.Treatment];

                    if (!resTrial) {
                        console.log(`Your treatment wasn't found. These are the treatments and trials: ${resJSONTreatmentsAndTrials}`);
                        return;
                    }
                    if (trialResultUrls[resTrial]) {
                        trialResultUrls[resTrial].push(myUrl);
                        // check how many urls we have for each trial
                        count = 0;
                        for (let i = 0; i < trialCount; i++) {
                            if(trialResultUrls[trials[i]].length > 2) {
                                count += 1;
                            }
                        }
                    } else {
                        console.log(`${resTrial} was found at ${myUrl}`)
                    }
            }).then(() => {
                page.close();
            });

            // If we have 3 of each trial Url, end the canonical search
            if (count == trialCount) {
                console.log(trialResultUrls)
                break;
            }
            try {
                // timeout between searches
                const sleep = m => new Promise(r => setTimeout(r, m))
                await sleep(options.Milliseconds || 5000);
                console.log(`Working... ${i + 1} of ${urls.length}`)

            }
            catch(err) {
                console.log(err)

            }
        }
    // for testing if repeated visits to the same url return the same seo buckets 
    //     j++;
    // }
        await browser.close().then(
            console.log(trialResultUrls)
        )
    }
    catch (err) {
        console.log('inError', err)
    }
}
