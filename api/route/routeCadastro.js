const express = require('express');

const modelCadastro = require('../model/modelCadastro.js');

const router = express.Router();

router.post('/cadastrarUsuario', (req, res)=>{

    let {id_user, email, senha, deletado = false} = req.body;

    modelCadastro.create(
        {
            id_user,
            email,
            senha,
            deletado
        }
    )
    .then(
        () => {
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:"USUÁRIO CADASTRADO COM SUCESSO"
                }
            );
        }
    )
    .catch((error) => {
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:"HOUVE UM ERRO AO CADASTRAR O USUÁRIO",
                errorObject:error
            }
        )
    })
})

module.exports = router;