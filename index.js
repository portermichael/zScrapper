const requestPromise = require('request-promise');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

// requestPromise(url)
//     .then((html) => {
//         console.log(html);
//     })
//     .catch((err) => {
//         console.log(err, 'error');
//     });


async function myFunc() {
    // const data = await fetch(url);
    await fetch(url)
        .then(res => res.text()
            // const resHolder = res.clone();
            // await console.log(resHolder.text());
            // console.log("************************");
            // // console.log(resHolder.text());
            // console.log("************************");
            // return resHolder.text();
        )
        .then(resText => {
            // const resText2 = resText.clone();
            resFind = JSON.parse(resText.match(regex)[0].replace(abTerminator, ''));
            console.log(resFind)
        })
        .catch(err => console.log(err))
    }
myFunc();

