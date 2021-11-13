const pool = require("./conexion");
pool.connect();

async function getTiendas() {
    const result = await pool.query(`SELECT store_name FROM stores`);
    return result.rows;
}

async function getCategorias() {
    const result = await pool.query(`SELECT category_name FROM categories`);
    return result.rows;
}

async function getMarcas() {
    const result = await pool.query(`SELECT brand_name FROM brands`);
    return result.rows;
}

async function getTodos(tienda, categoria, marca) {
    const result = await pool.query(`
    SELECT a.store_name, p.product_id, p.product_name, sum(t.quantity) as inv
    FROM stores as a inner JOIN stocks as t ON a.store_id = t.store_id inner JOIN products as p ON t.product_id = p.product_id inner JOIN categories as c inner JOIN brands as g ON p.brand_id = g.brand_id where a.store_name = '${tienda}'
    and c.category_name = '${categoria}'
    and brand_name = '${marca}'
    group by p.product_id, p.product_name, c.category_name, g.brand_name
    `);
    return result.rows;
}

async function getTiendaCat(tienda, categoria) {
    const result = await pool.query(`
    SELECT a.store_name, p.product_id, p.product_name, sum(t.quantity) FROM stores as a 
    inner JOIN stocks as t ON a.store_id = t.store_id inner JOIN products as p ON t.product_id = p.product_id 
    inner JOIN categories as c ON p.category_id = c.category_id 
    where a.store_name = '${tienda}' and c.category_name='${categoria}' 
    group by p.product_id, p.product_name, c.category_name`);
    return result.rows;
}


async function getTiendaProd(tienda) {
    const result = await pool.query(`
    SELECT a.store_name, p.product_id, p.product_name, sum(t.quantity) FROM stores as a 
    inner JOIN stocks as t ON a.store_id = t.store_id inner JOIN products as p ON t.product_id = p.product_id 
    where a.store_name = '${tienda}'
    group by p.product_id, p.product_name`);
    return result.rows;
}

module.exports = { getTiendas, getCategorias, getMarcas, getTodos, getTiendaCat, getTiendaProd }