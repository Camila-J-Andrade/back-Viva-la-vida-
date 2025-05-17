const Sequelize = require('sequelize');

const connection = require('../database/database.js');

const modelCardapio = connection.define(
    'tbl_cardapios',
    {
        id_prato:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        nome_prato:{
            type:Sequelize.STRING(50),
            allowNull:false
        },
        valor_prato:{
            type:Sequelize.DECIMAL(10,2),
            allowNull:false
        },
        descricao_prato:{
            type:Sequelize.STRING(180),
            allowNull:false
        },
        deletado:{
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }


)
// modelCardapio.sync({force:true});

module.exports = modelCardapio;