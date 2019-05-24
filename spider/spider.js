var request = require('sync-request');
var spider = {};
var parser = require('./htmlparser');
var urls = require('./urls');
var fs = require('fs');
/*
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// 自定义的简单记录器。
const logger = new Console({
    stdout: output,
    stderr: errorOutput
});
*/
spider.get = () => {
    var url = urls.get();
    if (url == false||url == undefined) {
        //console.log('当前挂起')
        return;
    } else if (url.match(/(\.pdf|.word|.txt|.xls|.doc)/)) {
        //分析url类型,截取pdf,docx等文件下载并解析
        // if (url.test(/(\.doc)|(\.pdf)|(\.xls)|(\.word)/)) {
        //     //在此处下载并传至fileparser
        // }
        return;
    }
    try {
        var html = request('get', url).getBody().toString();
    } catch (err) {
        //logger.log('new speder error :' + err);
    }
    parser.parse(html, url);
}

module.exports = spider;