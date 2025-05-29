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
router.get('/listagemItens/:id_prato', (req, res)=>{

    let { id_prato } = req.params;

    modelCardapio.findByPk(id_prato)
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

router.put('/alterarItem', (req, res)=>{

    let { id_prato, nome_prato, valor_prato, descricao_prato } = req.body;

    modelCardapio.update(
        {
            nome_prato,
            valor_prato,
            descricao_prato
        },
        {where:{id_prato}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'ITEM ALTERADO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO ALTERAR O ITEM',
                errorObject:error
            }
        );
    });

});

router.delete('/deletarItem/:id_prato', (req, res) => {

    let { id_prato } = req.params;

    modelCardapio.destroy(
        {where:{id_prato}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'ITEM EXCLUIDO COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO EXCLUIR O ITEM',
                errorObject:error
            }
        );
    });

});


module.exports = router;