const express = require('express');
const cors = require('cors');

const routerCadastro = require('./route/routeCadastro.js');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routerCadastro);

app.listen(8000, ()=>{
    console.log('SERVIDOR RODANDO EM - http://localhost:8000');
});