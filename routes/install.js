const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const Usuario = require('../models/Usuario');
const Filme = require('../models/filme');
const Aluguel = require('../models/aluguel');
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
            },
            {
                nome: "marcio",
                email: "marcioluiz@hotmail.com",
                senha: "193@!13#*9"
            },
            {
                nome: "Cleber",
                email: "clebinho132@hotmail.com",
                senha: "cleber@*!&91"
            }
        ]

        const filmeList = [
            {
                titulo: "Cidade de Deus",
                diretor: "Fernando Meirelles",
                anoLancamento: "2002",
                categoria: "Crime/Drama",
            },

            {
                titulo: "Tropa de Elite",
                diretor: "José Padilha",
                anoLancamento: "2007",
                categoria: "Ação/Drama",
            },

            {
                titulo: "O Auto da Compadecida",
                diretor: "Guel Arraes",
                anoLancamento: "2000",
                categoria: "Comédia/Drama",
            },

            {
                titulo: "Cabra Marcado Para Morrer",
                diretor: "Eduardo Coutinho",
                anoLancamento: "1084",
                categoria: "Documentário/Drama",
            },

            {
                titulo: "Aquarius",
                diretor: "Kleber Mendonça Filho",
                anoLancamento: "2016",
                categoria: "Drama",
            }
        ]

       /* const aluguelList = [
            {
                usuario:  ,
                filme: ,
                dataInicio: ,
                dataFim: ,
            },
            {
                usuario: ,
                filme: ,
                dataInicio: ,
                dataFim: ,
            },
            {
                usuario: ,
                filme: ,
                dataInicio: ,
                dataFim: ,
            },
            {
                usuario: ,
                filme: ,
                dataInicio: ,
                dataFim: ,
            },
            {
                usuario: ,
                filme: ,
                dataInicio: ,
                dataFim: ,
            },
        ] */

        await Promise.all(userList.map(async (item) => {
            await Usuario.create({
              nome: item.nome,
              email: item.email,
              senha: await bcrypt.hash(item.senha, 10),
              admin: item.admin,
            });
        }));

        await Promise.all(filmeList.map(async (item) => {
            await Filme.create({
              titulo: item.titulo,
              diretor: item.diretor,
              anoLancamento: item.anoLancamento,
              categoria: item.categoria,
            });
        }));

       /* await Promise.all(aluguelList.map(async (item) => {
            await Aluguel.create({
              usuario: item.usuario,
              filme: item.filme,
              dataInicio: item.dataInicio,
              dataFim: item.dataFim,
            });
        })); */
    }

    return res.status(422).json("Todos os campo preenchidos");
});



module.exports = router;