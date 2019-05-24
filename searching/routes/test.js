var request = require("request-promise");
var req_options = require("./elastic");
module.exports = async function (query, page) {
    return request.post(req_options(query, page))
}