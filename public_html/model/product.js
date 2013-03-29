var connection;

var Product = function(connection) {
    this.connection = connection;
};

Product.prototype.getProductByCode = function(productCode) {
    this.connection.query(
            'SELECT prd_id, prd_code, prd_name, prd_product_type, prd_description' +
            ' FROM v_product' +
            ' WHERE prd_code = ?' +
            ' AND prd_status = ?' +
            ' LIMIT 1', [productCode, 'active'], function(err, rows) {
        if (err) {
            throw err;
        }

        for (i = 0; i < rows.length; i++) {
            console.log(rows[i]);
        }
    });
};

module.exports = Product;