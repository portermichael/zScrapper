const {url, urls, terminator, headers, regex} = require("./helperConsts.js");
const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function myFunc() {
    // console.log(url, urls, terminator, regex);
    await fetch(url, {
        method  : 'GET', 
        headers : headers 
    })
        .then(res => {
            console.log(res.clone().url)
            return res.text()}
        )
        .then(resText => {
            resFind = resText.match(regex)[0].replace(terminator, '');
            resJSON = JSON.parse(`{${resFind}}`)
            console.log(resJSON)
        })
        .catch(err => console.log(err))
    }
myFunc();

