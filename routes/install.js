const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

router.get('/install', async (req, res) => {
    {

        const userList = [
            {
                nome: "admin",
                email: "admin@admin.com",
                senha: "admin",
                admin: true,
            },
            {
                nome: "gustavo",
                email: "gust@vo.com",
                senha: "123321@"
            },
            {
                nome: "batata",
                email: "email@suco.com",
                senha: "arvore@312"
            }
        ]

        await Promise.all(userList.map(async (item) => {
            await Usuario.create({
              nome: item.nome,
              email: item.email,
              senha: await bcrypt.hash(item.senha, 10),
              admin: item.admin,
            });
        }));
    }

    return res.status(422).json("Todos os campo preenchidos");
});



module.exports = router;