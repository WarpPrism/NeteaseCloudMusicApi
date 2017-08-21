const express = require('express')
const http = require('http')
const app = express();

const baseUrl = '163api';
const router = require('./router');

// 跨域设置
app.all('*', function (req, res, next) {
    var url = req.url;
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    if (url === '/') {
        res.header("Content-Type", "text/html;charset=utf-8");
    } else {
        res.header("Content-Type", "application/json;charset=utf-8");
    }
    next()
 })

app.use(express.static('public'));

app.use(baseUrl, router);


app.use(function(err, req, res, next) {
  if (err) {
    console.log('Err Happens', err.stack);
    res.status(500).send({
      msg: 'Server Down T_T'
    })
  }
})

process.on('uncaughtException', function (err) {
    console.log('Caught exception:\n', err);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`server running @${port}`)
})

module.exports = app;
