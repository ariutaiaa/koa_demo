const http = require('http');
const fs=require('fs');

const Koa_Logger = require("koa-logger");
const Koa = require('koa');
const Moment = require("moment");
const cors = require('koa2-cors');
const koa_json=require('koa-json');
const koa_body=require('koa-body');
const convert = require('koa-convert');

const app = new Koa();

const logger = Koa_Logger((str) => {
    console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str);
    let sum = Moment().format('YYYY-MM-DD HH:mm:ss') + str;
    Write_In('./journal/request.txt', sum)
});

const routes_Index = require('./router');

app.use(logger);
app.use(convert(koa_body({
    'formLimit':'100mb',
    'jsonLimit':'100mb',
    'textLimit':'100mb',
})));

app.use(cors());
app.use(koa_json());
app.use(routes_Index.routes(), routes_Index.allowedMethods());

//错误处理  记录日志
app.on('error', (err) => {
    Write_In('./error/error.txt', err)
});

http.createServer(app.callback()).listen(3000);

//录入日志流
function Write_In(route_write, data_write) {
    fs.readFile(route_write, function (err, data) {
        if (err) {
            return console.error(err);
        }
        let txtData = data.toString();
        txtData = txtData + "\n" + data_write;
        fs.writeFile(route_write, txtData, function (err, str) {
        })
    })
}

