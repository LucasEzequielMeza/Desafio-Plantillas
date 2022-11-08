const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const viewsFolder = path.join(__dirname, 'views')

const app = express();
app.listen(8080, () => console.log('Servidor Levantado'))

//Interpretar la informacion de tipo json que venga por solicitud de
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));
//Inicializamos el motor de plantillas
app.engine("handlebars", handlebars.engine())

//Donde tengo las vistas
app.set("views", viewsFolder)

//Motor de plantillas a utilizar
app.set("view engine", "handlebars")

const productos = []

app.get('/', (req, res) => {
    res.render('home')
})

app.post('/productos', (req, res) => {
    productos.push(req.body)
    res.redirect('/')
})

app.get('/productos', (req, res) => {
    if(productos.length !== 0) {
        res.render('productos', {
            productos: productos
        })
    } else {
        res.json({
            msg: 'No hay productos agregados'
        })
    }
})