const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const Usuario = require('../models/usuario');
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

        await Promise.all(userList.map(async (item) => {
            await Usuario.create({
                nome: item.nome,
                email: item.email,
                senha: await bcrypt.hash(item.senha, 10),
                admin: item.admin,
            });
        }));


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

        await Promise.all(filmeList.map(async (item) => {
            await Filme.create({
                titulo: item.titulo,
                diretor: item.diretor,
                anoLancamento: item.anoLancamento,
                categoria: item.categoria,
            });
        }));

        // Contadores externos para manter a ordem de inserção
        let usuarioCounter = 1;
        let filmeCounter = 1;

        // Função para obter IDs automaticamente pela ordem de inserção
        const getObjectIdByOrder = async (model, counter) => {
            const result = await model.findOne().sort({ _id: 1 }).skip(counter - 1).lean();
            return result ? result._id : null;
        };


        const aluguelList = [
            {
                usuario: null,
                filme: null,
                dataInicio: new Date('2023-02-29'),
                dataFim: new Date('2023-03-02'),
            },
            {
                usuario: null,
                filme: null,
                dataInicio: new Date('2023-05-11'),
                dataFim: new Date('2023-05-014'),
            },
            {
                usuario: null,
                filme: null,
                dataInicio: new Date('2023-08-25'),
                dataFim: new Date('2023-08-28'),
            },
            {
                usuario: null,
                filme: null,
                dataInicio: new Date('2023-11-28'),
                dataFim: new Date('2023-12-02'),
            },
            {
                usuario: null,
                filme: null,
                dataInicio: new Date('2023-06-26'),
                dataFim: new Date('2023-07-01'),
            },
        ]

        // Preencher os IDs automaticamente na lista de Aluguéis
        await Promise.all(aluguelList.map(async (item) => {
            item.usuario = await getObjectIdByOrder(Usuario, usuarioCounter++);
            item.filme = await getObjectIdByOrder(Filme, filmeCounter++);
        }));

        await Promise.all(aluguelList.map(async (item) => {
            await Aluguel.create({
                usuario: item.usuario,
                filme: item.filme,
                dataInicio: item.dataInicio,
                dataFim: item.dataFim,
            });
        }));
    }

    return res.status(422).json("Todos os campo preenchidos");
});



module.exports = router;