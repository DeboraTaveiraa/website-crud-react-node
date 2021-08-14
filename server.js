const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
// rotas
const routes = require('./src/routes');

//drive que faz conexão do servidor com banco de dados
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5000;

// conexão com banco de dados e configurações para não ocorrer erro
mongoose.connect('mongodb://localhost:27017/db-admin-ifro', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, function(err) {
    if (err) {
        console.log('Falha na conexão com MongoDB: ' + err)
    } else {
        console.log('MongoDB conectado com sucesso! Porta: ' + port)
    }
})

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(routes);

app.listen(port, function() {
    console.log('Server is running!')
})