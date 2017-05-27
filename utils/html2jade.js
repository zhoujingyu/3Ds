let html2jade = require('html2jade');
let fs = require('fs');

let htmlPath = '../views/flex.html';
let outputJadePath = '../views/flex.jade';
let html = fs.readFileSync(htmlPath, 'utf8');


html2jade.convertHtml(html, {}, (err, jade) => {
    fs.writeFileSync(outputJadePath, jade);
    console.log('Done!');
});