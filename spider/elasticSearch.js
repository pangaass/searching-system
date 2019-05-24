const http = require('http');
const request = require('request');
const syncrequest = request = require("sync-request")
const create_url = "http://192.144.161.67:9200/index_no/new/"
const search_url = "http://192.144.161.67:9200/index/_doc/_search"


// const create_options = {
//     url: create_url,
//     method: "POST",
//     body: create_data,
//     json: true,
// }
// var search_options = {
//     url: search_url,
//     method: "POST",
//     body: search_data,
//     json: true,
// }

var elastic = {
    create: (create_data) => {
        uri = create_data.url.replace(/(\[|\]|\:|\!|\~|\`|\;|\"|\'|\\|\/|\?|\.|\>|\<|\,|\@|\$|\%|\#|\^|\&|\*|\(|\))/g, '')
        request.post({
            url: create_url + uri,
            method: "POST",
            body: create_data,
            json: true,
        }, (err, req, body) => {
            if (err) {} else {
                console.log('成功爬取一个网页:' + create_data.url);
                console.log(body);
            }
        })
    },
    search: (search_data) => {
        var res = request('GET', docurl, data).getBody().toString();
    },
    testUrl: (urls) => {
        let reqUrl = url + "_mget";
        let data = {

        }
        var res = request('GET', docurl, data).getBody().toString();
    },
    exist: (str) => {
        let res = syncrequest({
            url: "http://192.144.161.67:9200/index_no/new/",
            method: "GET",
            body: {
                "query": {
                    "multi_match": {
                        "query": str,
                        "fields": ["url"]
                    }
                },
                "_source": "url"
            },
            json: true,
        }, data).getBody().toString();
        let res = JSON.parse(res);
        if (res.hits.hits[0]._source.url == str) {
            return true;
        } else return false;
    },
    saveall:(u)=>{/*


        *===============================================================
        *
        * 
        * 还没有实现，当node进程关闭时将所有缓存区的url存储到数据库中，
        * 还是采用另一种方法，每隔一段时间就将新增加的url存储。
        * 需要就此讨论一下
        * 
        * 
        * ==============================================================
        console.log("正在保存缓存区的域名");
        var saveall_options = {
            url:"http://192.144.161.67:9200/url/url/",
            method:"POST",
            body:undefined,
            json:"true",
        }
        while(u){
            let ui = [];
            for(i = 0;i<500;i++){
                if(!u)return;
                ui.push(u.pop());
            }
            
        }

        
        request()*/
    },
    saveurl: (e)=>{
        //将单挑或者定长的多条url存入/url/url数据库中
        //后期完善。
    }
}
module.exports = elastic;

/*  
search = function () {
    request.get(search_options, (err, req, body) => {
        if (err) {

        } else {}
    })
    const search_data = {
    "query": {
        "match": {}
    },
    "highlight": {
        "pre_tags": ["<tag1>", "<tag2>"],
        "post_tags": ["</tag1>", "</tag2>"],
        "fields": {}
    }
}
const search_options = {
    url: create_url,
    method: "POST",
    body: search_data,
    json: true,
}
*/


