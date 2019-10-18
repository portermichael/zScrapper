const {url, urls, terminator, headers, regex} = require("./helperConsts.js");
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const puppet = require('puppeteer');

async function myFunc() {
    // console.log(url, urls, terminator, regex);
    // await fetch(url, {
    //     method  : 'GET', 
    //     headers : headers 
    // })
    //     .then(res => {
    //         console.log(res.clone().url)
    //         return res.text()}
    //     )
    //     .then(resText => {
            // resFind = resText.match(regex)[0].replace(terminator, '');
            // resJSON = JSON.parse(`{${resFind}}`)
            // console.log(resJSON)
    //     })
    //     .catch(err => console.log(err))

    try {
        var browser = await puppet.launch({headless: false});
        var page = await browser.newPage();
        // await page.setRequestInterceptionEnabled(true)
        // page.on('response', response => {
        //     // var response2 = response.clone();
        //     response.text()
        //     .then(text => {
        //     console.log('response', text)
        //     })
        // });


        await page.goto(url)
        .then(page => page.text()
        )
        .then(resText => {
            resFind = resText.match(regex)[0].replace(terminator, '');
            resJSON = JSON.parse(`{${resFind}}`)
            console.log(resJSON)
        })

            // .then(

            // )
    }
    catch {}
    }
myFunc();

