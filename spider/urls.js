var fs = require('fs');
var elastic = require('./elasticSearch')
var urls = {
    a: {
        urls: [],
        finish: [],
    },
    load: (path) => {
        path = path || "url.txt";
        var data = fs.readFileSync(path);
        this.a = JSON.parse(data);
    },
    get: () => {
        if (this.a.urls.length == 0)
            return false;
        else {
            let u = this.a.urls.pop();
            this.a.finish.push(u);
            return u;
        }
    },
    add: (e) => {
        /*
            判断url重复的方法
        */
        if (typeof e == "string" && (!e == '')) {
            if (this.a.finish.indexOf(e) == -1 && /(ncepu|huadian)/.test(e)) {
                if (!elastic.exist(e)) {//判断url是否已经抓取过
                    this.a.urls.push(e)
                    elastic.saveurl(e);
                }
            }
        } else if (typeof e == "Array") {//整个数组的url添加还没有进行数据库查重，需要用bulk查重后再进行爬取
            for (i in e) {
                this.a.urls.push(e[i]);
            }
        }
    },
    save: (path) => {
        // var p = path || "url.txt";
        // fs.writeFileSync(JSON.stringify(this.a), p);
        elastic.saveall(this.a.urls)
    },
    delete: () => {
        this.a.urls = [];
    },
    exists: (url) => {
        return elastic.exist(url);
    }
}

module.exports = urls;