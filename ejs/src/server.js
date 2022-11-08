const express = require('express');
const path = require('path');
const viewsFolder = path.join(__dirname, 'views')
const app = express();
app.listen(8080, ()=> console.log('Servidor levantado'))

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//Configuramos nuestro motor de plantillas
app.set('views', viewsFolder)

//Definimos con que motor vamos a trabajar
app.set('view engine', 'ejs')

//Definimos las rutas de las vistas
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