const Sequelize = require('sequelize');

const connection = require('../database/database.js');
const sequelize = require('sequelize');

const modelCadastro = connection.define(
    'tbl_usuario',
    {
        id_user:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        email:{
            type:Sequelize.STRING(100),
            allowNull:false
        },
        senha:{
            type:sequelize.STRING(10),
            allowNull:false
        },
        deletado: {
            type: sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }          
    }
);

// modelCadastro.sync({force:true});

module.exports = modelCadastro;