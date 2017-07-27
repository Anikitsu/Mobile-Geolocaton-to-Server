var http = require('http');
var url = require('url');
var querystring = require('querystring');
var fs = require('fs');
var port = 8010;
// 解析cookie
var parseCookie = function(cookie) {
    var cookies={};
    if (!cookie) {
        return cookie;
    }
    var list = cookie.split(';');
    for (var i = 0; i < list.length; i++) {
        var pair = list[i].split('=');
        cookies[pair[0].trim()]=pair[1];
    }
    return cookies;
};
var handle = function(req,res) {
// 校验cookie
    if (req.cookies==undefined) {
        getout(res);
    } else {
         if (req.cookies.name!="aniki") {
            getout(res,true);
        } else {
// 处理post
            var possage = '';
            var posobj;
            req.on('data', function (chunk) {
                possage += chunk;
            });
            req.on('end', function () {
                posobj = JSON.parse(possage);
                possage = '';
// 写入文件
                fs.open('geotrack.txt', 'a', function(err, fd){
                    if (err) {
                        return console.error(err);
                    }
                    fs.appendFileSync(fd, '时间: '+posobj.dateflag+posobj.timeflag);
                    fs.appendFileSync(fd, ' 地址: '+posobj.address+' 纬度'+posobj.lat+' 经度'+posobj.longt);
                    fs.appendFileSync(fd, ' 移动方向: '+posobj.heading+'速度: '+posobj.speed);
                    fs.appendFileSync(fd, '\r\n');
                    fs.closeSync(fd);
// 响应回执
                    res.writeHead(200, {'Content-Type': 'text/plain'});
                    res.end();
                })
            });
            req.on('error', function(e) {
                console.log('---error---',e);
            });
            
        }
    }
};

function getout (res,q) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end();
    if (q) {
        console.log('request got with wrong cookie');
    } else {
        console.log('request got without cookie');        
    }
};

http.createServer(function (req, res) {
//    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//    res.setHeader('Access-Control-Allow-Credentials', true);
//    res.setHeader('Access-Control-Allow-Methods', 'POST');
    req.cookies=parseCookie(req.headers.cookie);
    handle(req, res);


}).listen(port);
console.log("Server Started port:" + port);