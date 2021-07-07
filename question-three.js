const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

const argv = process.argv.slice(2)[0];

nightmare
    .goto('https://codequiz.azurewebsites.net/')
    .click("input[value='Accept']")
    .evaluate(() => {
        let table = document.querySelector('table');
        let rows = table.getElementsByTagName('tr');

        let heading = table.getElementsByTagName('tr')[0];
        let data = [];

        for(let i = 1; i < rows.length; i++){
            let tds = rows[i].getElementsByTagName('td');
            let obj = {};
            for(let j = 0; j < tds.length; j++){
                obj[heading.getElementsByTagName('th')[j].innerHTML.replace(/\s/g, '')] = tds[j].innerHTML.replace(/\s/g, '');
            }
            data.push(obj);
        }

        return data;
    })
    .end()
    .then(res => {
        let obj = res.find(o => o.FundName === argv);
        obj ? console.log(obj.Nav) : console.log('Not found');
    })
    .catch(error => {
        console.error('Scraping failed:', error)
    })