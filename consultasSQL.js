const Cursor = require("pg-cursor");
const yargs = require('yargs')
const pool = require("./conexion");
pool.connect();


// listado de productos con sus precios, de aquellos productos cuyo modelo es 2016, ordenado alfabéticamente por nombre

// pool.connect((error_conexion, client, release) => {
//     const consulta = new Cursor(`SELECT product_id, product_name, model_year, list_price FROM products WHERE model_year=2016`);
//     const cursor = client.query(consulta);
//     cursor.read(20, (err, rows) => {
//         console.log(rows);
//         cursor.close();
//         release();
//         pool.end();
//     });
// });


// listado de productos productos para mujeres

// pool.connect((error_conexion, client, release) => {
//     const consulta = new Cursor(`SELECT product_id, product_name, model_year, list_price FROM products WHERE product_name like '%Women%' order by list_price desc`);
//     const cursor = client.query(consulta);
//     cursor.read(20, (err, rows) => {
//         console.log(rows);
//         cursor.close();
//         release();
//         pool.end();
//     });
// });

// cantidad de productos de cada categoría, ordenado de mayor a menor cantidad

// pool.connect((error_conexion, client, release) => {
//     const consulta = new Cursor(`SELECT p.category_id, c.category_name, sum(t.quantity) FROM products as p inner JOIN stocks as t ON p.product_id = t.product_id inner JOIN categories as c ON p.category_id = c.category_id group by p.category_id, c.category_name order by sum(t.quantity) desc`);
//     const cursor = client.query(consulta);
//     cursor.read(20, (err, rows) => {
//         console.log(rows);
//         cursor.close();
//         release();
//         pool.end();
//     });
// });

// cantidad de inventario de productos por marca, ordenado descendentemente

// pool.connect((error_conexion, client, release) => {
//     const consulta = new Cursor(`SELECT p.brand_id, a.brand_name, sum(t.quantity) FROM products as p inner JOIN stocks as t         ON p.product_id = t.product_id inner JOIN brands as a ON p.brand_id = a.brand_id group by p.brand_id, a.brand_name order by sum(t.quantity) desc`);
//     const cursor = client.query(consulta);
//     cursor.read(20, (err, rows) => {
//         console.log(rows);
//         cursor.close();
//         release();
//         pool.end();
//     });
// });

// inventario para la tienda Santa Cruz Bike de los productos que tienen en existencia en la categoría Electric Bikes

pool.connect((error_conexion, client, release) => {
    const consulta = new Cursor(`SELECT p.product_id, p.product_name, sum(t.quantity) FROM stores as a inner JOIN stocks as t     ON a.store_id = t.store_id inner JOIN products as p ON t.product_id = p.product_id inner JOIN categories as c ON p.category_id = c.category_id where a.store_name = 'Santa Cruz Bikes' and c.category_name='Electric Bikes' group by p.product_id, p.product_name, c.category_name`);
    const cursor = client.query(consulta);
    cursor.read(20, (err, rows) => {
        console.log(rows);
        cursor.close();
        release();
        pool.end();
    });
});