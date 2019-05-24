var cheerio = require('cheerio');
var elastic = require('./elasticSearch');
var url = require('./urls')
var urljs = require('url')

var data = {};
var parser = {};
//几种正文提取算法在OneNote上面有;
parser.parse = async (e, sourceurl) => {
    if (e == undefined) return;
    var urls = e.match(/<a.*?<\/a>/gi);
    //seturls(urls, url)
    getcontent(e,sourceurl);
    seturls(urls,sourceurl);
}
seturls = async function (e, sourceurl) {
    var absoluteUrl = urljs.parse(sourceurl);
    let regTestUrl = /(javascript:void\(0\)|#)/;
    e = Array.from(new Set(e))
    for (i in e) {
        if (!/href/.test(e[i])) {
            continue;
        }
        e[i] = e[i].match(/(?<=href=").*?(?=")/)[0];
        if (!regTestUrl.test(e[i])) {
            if (!/http/.test(e[i]))
                e[i] = urljs.resolve(absoluteUrl, e[i]);
            url.add(e[i]);
        } else continue;
    }

}
getcontent = async (e, url) => {
    var regRm = [];
    regRm.push(/<(script|style)(.|\s)*?<\/(style|script)>/gi);
    regRm.push(/<(link|img)[^>]*>/gi);
    regRm.push(/<(?!br).*?>/gi);
    regRm.push(/\s/g);
    var $ = cheerio.load(e);
    data.title = unescape($('title').toString().replace(/&#x/g,'%u').replace(/;/g,'').replace(/\<title\>/g,'').replace(/\<\/title\>/g,''));
    data.url = url;
    
    for (i in regRm) {
        e = e.replace(regRm[i],'')
    }
    data.article = e;
    elastic.create(data);
    //获取pdf,docx等文档的url
    //使用算法获取文章正文
    //正文和url存入elasticsearch
}

module.exports = parser;