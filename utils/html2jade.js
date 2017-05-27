let html2jade = require('html2jade');
let fs = require('fs');

let htmlPath = '../public/notes/html/flex.html';
let outputJadePath = '../public/notes/jade/flex.jade';
let html = fs.readFileSync(htmlPath, 'utf8');


html2jade.convertHtml(html, {}, (err, jade) => {
    fs.writeFileSync(outputJadePath, jade);
    console.log('Done!');
});