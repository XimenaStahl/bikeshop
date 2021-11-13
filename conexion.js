const { Pool } = require('pg');
require('dotenv').config()

const config = {
    user: process.env.SMTP_USER,
    host: "localhost",
    database: "bikeshop",
    password: process.env.SMTP_PASSWORD,
    port: 5432,
};
const pool = new Pool(config);

module.exports = pool;