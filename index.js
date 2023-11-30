const express = require('express');
const mongoose = require('mongoose');
const app = express();
const filmeRoutes = require('./routes/filmeRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const aluguelRoutes = require('./routes/aluguelRoutes');
const install = require('./routes/install')

// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rota inicial / endpoint
app.get('/', (req, res) => {

    res.json({message: 'Oi Express!'})
})

//Conectando ao MongoDB
mongoose.connect('mongodb+srv://matheusp6378:Matheus00@apicluster.7vmz3an.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))

// Rotas

app.use(filmeRoutes);
app.use(usuarioRoutes);
app.use(aluguelRoutes);
app.use(install);