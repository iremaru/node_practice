const express = require('express'), hbs = require("hbs"), fs = require("fs");

const port = process.env.PORT || 3000;

const app = express()

//CONFIGURAR EL MOTOR VISUAL:
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");    //Registramos la ruta de los partials.

//Registrando funciones recurrentes.
hbs.registerHelper("annoActual", () => new Date().getFullYear());

hbs.registerHelper("gritar", (texto) => texto.toUpperCase());

//Usando MIDDLEWARE:

app.use((req, rest, next) => {
    const ahora = new Date().toString();
    const log = `FECHA: ${ahora}
    MÉTODO: ${req.method}
    RUTA: ${req.url} //
    `;
    
    console.log(log);
    fs.appendFile("server.log", log + "\n", err => {
        if (err) {
            console.log("Incapaz de crear server.log.")
        }
    });
    
    next()
});
//USANDO RUTAS ESTÁTICAS
//express.static(root, [options])

//Accede a los archivos que están dentro de la carpeta public, en el "dirname".
app.use(express.static(__dirname + "/public"));
//Ejemplo, el archivo que está en la ruta "node_pruebas/public/imagenes/gatitos.jpg"
    //será accesible desde "localhost:3000/imagenes/gatitos.jpg"
    
//Crea un prefijo virtual de la ruta:
app.use("/cositas", express.static(__dirname + "/public"))
// "node_pruebas/public/imagenes/gatitos.jpg" => "localhost:3000/cositas/imagenes/gatitos.jpg"

//USANDO RUTAS VIRTUALES

app.get('/', function (req, res) {
  res.render("home.hbs", {
        tituloPagina: "Inicio",
        mensajeBienvenida: "Bienvenido a la página"
    });   
})

app.get("/about", (req, res) => {
    res.render("about.hbs", {
        tituloPagina: "About",
    });   
});

app.get("/projects", (req, res) => {
    res.render("projects.hbs", {
        tituloPagina: "Projects"
    })
})
 
app.listen(port, process.env.IP, () => console.log(`El servidor se está ejecutando en el puerto ${port}.`));





