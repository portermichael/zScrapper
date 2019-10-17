const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

const url = "https://www.zillow.com/seattle-wa/";


// requestPromise(url)
//     .then((html) => {
//         console.log(html);
//     })
//     .catch((err) => {
//         console.log(err, 'error');
//     });


async function myFunc() {
    const data = await fetch(url);
    console.log(data);
}
myFunc();