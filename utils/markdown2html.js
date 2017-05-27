let fs = require('fs'),
    markdown = require("markdown"),
    fileContent;

let mdFilePath = '../public/notes/md/flex.md';
let outputHTMLPath = '../public/notes/html/flex.html';


// 读入 Markdown 源文件
console.log(markdown.markdown.toHTML);
fileContent = fs.readFileSync(mdFilePath, 'utf8');
// 使用 MarkdownJS 模块把源文件转换为 HTML 源代码
fileContent = markdown.markdown.toHTML(fileContent);
// 保存
fs.writeFileSync(outputHTMLPath, fileContent);
console.log('Done!');