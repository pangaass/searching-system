var spider = require('./spider');
var url = require('./urls');
//配置文件
config ={
    urlpath:'./url.txt',
}

url.load(config.urlpath);
var time = 200;
// setspider = function(){
//     setTimeout(setspider(), time);
//     spider.get()
// }
// (setTimeout(setspider(), time))();
setInterval(spider.get,time);
//spider.get()
process.exit(
    url.save()
)