const atob = require('atob')

const parseJwt = function (token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace('-', '+').replace('_', '/')
    var userdata = atob(base64)
    return (JSON.parse(userdata))
}


module.exports={
    parseJwt
}