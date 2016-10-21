/**
 * Created by myeongju.jung on 2016. 10. 12..
 */
var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("./"));
app.listen(5000);