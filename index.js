// Importar librerías necesarias
const express = require('express');

const app = express();

// Crear servidor corriendo en puerto 3000
app.listen(3000, () => {
    console.log(`Server running on port 3000 and PID: ${process.pid}`)
})

// Definir carpeta assets como carpeta pública del servidor
app.use(express.static('assets'));

// Ruta raíz
app.get('/',(req,res) => {
    res.sendFile(__dirname + '/index.html')
})

// Arreglo de nombres
const usuarios = {
    usuarios: [
        'Juan',
        'Jocelyn',
        'Astrid',
        'María',
        'Ignacia',
        'Javier',
        'Brian'
    ]
}

// Ruta GET para devolver arreglo de usuarios en formato JSON
app.get('/abracadabra/usuarios',(req,res) => {
    res.send(JSON.stringify(usuarios,null,1))
})


// Middleware 
app.use('/abracadabra/juego/:usuario', (req,res,next) => {

    const nombre = req.params.usuario;

    const usuario = usuarios.usuarios.find((elemento) => {
        
        return elemento == nombre;
    }) 

    usuario == undefined
        ? res.sendFile(__dirname + '/assets/who.jpeg')
        : next()
})
// Ruta GET
app.get('/abracadabra/juego/:usuario', (req,res) => {

    const nombre = req.params.usuario;
    res.send(`<center><h1>Usuario/a: ${nombre} autentificado/a</h1></center>`)
})

// Ruta GET
app.get('/abracadabra/conejo/:n',(req,res) => {

    const n = Math.floor(Math.random() * (5-1)) + 1;

    const numero = req.params.n;

    numero == n
    ? res.sendFile(__dirname + '/assets/conejito.jpg')
    : res.sendFile(__dirname + '/assets/voldemort.jpg')
})

// Ruta genérica para responder a peticiones de rutas no definidas 
// en el servidor
app.get('*', (req,res) => {
    res.send("<center><h1>Esta página no existe...</h1></center>")
})