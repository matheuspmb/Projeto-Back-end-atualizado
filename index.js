const express = require('express');
const mongoose = require('mongoose');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const filmeRoutes = require('./routes/filmeRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const aluguelRoutes = require('./routes/aluguelRoutes');

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

// Defina as opções do Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API da Locadora de Filmes',
        version: '1.0.0',
        description: 'API para gerenciar uma locadora de filmes',
      },
      servers: [
        {
          url: `http://localhost:3000`,
        },
      ],
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos que contêm as rotas
  };
  
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas

app.use(filmeRoutes);
app.use(usuarioRoutes);
app.use(aluguelRoutes);