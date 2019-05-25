//var request = require('request');
var search_url = "http://192.144.161.67:9200/index_no/new/_search?size=10&from=";

module.exports = (query,page)=>{
    return {
        url: search_url + ((parseInt(page)-1)*10 || 0),
        body: {
            "query": {
                "bool": {
                    "should": [{
                            "match_phrase": {
                                "title": {
                                    "query": query,
                                    "slop": 1
                                }
                            }
                        },
                        {
                            "match_phrase": {
                                "article": {
                                    "query": query,
                                    "slop": 10
                                }
                            }
                        }
                    ]
                }
            }
        },
        json: true,
    }
}











/*====================================================================================*/
// search = async function (query, page) {
//     return request.get({
//         url: search_url + (parseInt(page) * 10 - 1 || 0),
//         body: {
//             "query": {
//                 "bool": {
//                     "should": [{
//                             "match_phrase": {
//                                 "title": {
//                                     "query": query,
//                                     "slop": 1
//                                 }
//                             }
//                         },
//                         {
//                             "match_phrase": {
//                                 "article": {
//                                     "query": query,
//                                     "slop": 10
//                                 }
//                             }
//                         }
//                     ]
//                 }
//             }
//         },
//         json: true,
//     }, (err, req, body) = {

//     })
// }

// search1 = async function (query, page) {
//     return new Promise(function (resolve, reject) {
//         request.get({
//             url: search_url + (parseInt(page) * 10 - 1 || 0),
//             body: {
//                 "query": {
//                     "bool": {
//                         "should": [{
//                                 "match_phrase": {
//                                     "title": {
//                                         "query": query,
//                                         "slop": 1
//                                     }
//                                 }
//                             },
//                             {
//                                 "match_phrase": {
//                                     "article": {
//                                         "query": query,
//                                         "slop": 10
//                                     }
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             },
//             json: true,
//         }, (err, req, body) => {
//             if(err){
//                 reject(err);
//             }
//             else resolve(body);
//         })
//     })
// }
/*
var options = {
    url: search_url,
    method: "GET",
    body: {
        "query": {
            "bool": {
                "should": [{
                        "match_phrase": {
                            "title": {
                                "query": "",
                                "slop": 1
                            }
                        }
                    },
                    {
                        "match_phrase": {
                            "article": {
                                "query": "",
                                "slop": 10
                            }
                        }
                    }
                ]
            }
        }
    },
    json: true,
}
*/