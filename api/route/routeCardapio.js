const express = require('express');

const modelCardapio = require('../model/modelCardapio');

const router = express.Router();

router.post('/cadastrarPratos', (req, res)=>{

    let {id_prato, nome_prato, valor_prato, descricao_prato, deletado = false} = req.body;

    modelCardapio.create(
        {
            id_prato,
            nome_prato,
            valor_prato,
            descricao_prato,
            deletado
        }
    )
    .then(
        () => {
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:"ITEM CADASTRADO COM SUCESSO"
                }
            );
        }
    )
    .catch((error) => {
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:"HOUVE UM ERRO AO CADASTRAR O ITEM",
                errorObject:error
            }
        )
    })
})

router.get('/listagemItens', async (req, res) => {
    try {
        const response = await modelCardapio.findAll();

        const dadosFormatados = response.map(item => {
            // Formata valor_prato como "R$ 23,00"
            const valorFormatado = Number(item.valor_prato).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2
            });

            return {
                ...item.toJSON(), // Converte Sequelize Model para objeto literal
                valor_prato: valorFormatado
            };
        });

        return res.status(200).json({
            errorStatus: false,
            mensageStatus: 'ITENS LISTADOS COM SUCESSO',
            data: dadosFormatados
        });
    } catch (error) {
        return res.status(400).json({
            errorStatus: true,
            mensageStatus: 'HOUVE UM ERRO AO LISTAR OS ITENS DE CARDÁPIO',
            errorObject: error
        });
    }
});


/* ROTA DE LISTAGEM DE ITEM DO CARDÁPIO POR CÓDIGO DE ITEM*/
router.get('/listagemItens/:cod_item', (req, res)=>{

    let { cod_item } = req.params;

    modelCardapio.findByPk(cod_item)
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'ITEM DO CARDÁPIO RECUPERADO COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO RECUPERAR O ITEM DO CARDÁPIO',
                errorObject:error
            }
        );
    });

});


module.exports = router;