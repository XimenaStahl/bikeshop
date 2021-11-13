const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;

const { getTiendas, getCategorias, getMarcas, getTodos, getTiendaCat } = require("./consultas");

// Servidor
app.listen(PORT, () => {
    console.log("El servidor está inicializado en el puerto " + PORT);
});

// Middlewares
app.use(express.json()); // Este comando reemplaza al deprecated body-parser
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.engine("handlebars", exphbs({
    defaultLayout: "main",
    layoutsDir: `${__dirname}/views/mainLayout`,
}));

app.set("view engine", "handlebars");

// Rutas
app.get("/", (req, res) => { res.render("Home") })


// Recupera listas
app.get("/tiendas", async(req, res) => {
    const respuesta = await getTiendas();
    res.send(respuesta);
});

app.get("/categorias", async(req, res) => {
    const respuesta = await getCategorias();
    res.send(respuesta);
});

app.get("/marcas", async(req, res) => {
    const respuesta = await getMarcas();
    res.send(respuesta);
});

app.get("/tdacatmarca", async(req, res) => {
    const { tienda, categoria, marca } = req.body;
    const respuesta = await getTodos(tienda, categoria, marca);
    res.send(respuesta);
});

app.get("/tdacat", async(req, res) => {
    const { tienda, categoria } = req.body;
    const respuesta = await getTiendaCat(tienda, categoria);
    res.send(respuesta);
});

app.get("/tienda", async(req, res) => {
    const { tienda } = req.body;
    const respuesta = await getTiendaProd(tienda);
    res.send(respuesta);
});