var express = require('express'),
        mysql = require('mysql'),
        productModel = require('./model/product');

var app = express();

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(application_root, "public")));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/product/:product_code', function(req, res) {
    this.pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            throw err;
        }
        var product = (new this.productModel.Product(
                connection)).getProductByCode(req.code);
        connection.end();
        res.send(product);
    });
});

process.on('SIGTERM', function () {
    console.log("Closing");
    app.close();
});

/**
 * Disconnect any connections when app closes.
 * @param {type} param1
 * @param {type} param2
 */
app.on('close', function () {
    connection.end(function(err) {
        if (err) {
            console.error(err);
        }
    });
});

app.listen(8080);
console.log('Listening on port 3000');