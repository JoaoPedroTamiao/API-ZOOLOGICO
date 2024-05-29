import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import { Ave } from './model/Ave';
import { Habitat } from './model/Habitat';
import { Atracao } from './model/Atracao';
import AveController from './controller/AveController';
import HabitatController from './controller/HabitatController';
import AtracaoController from './controller/AtracaoController';
import { DatabaseModel } from './model/DatabaseModel';

const server = express();
const port = 3000;

server.use(express.json());
server.use(cors());

const aveController = new AveController('',0,'',0);
const habitatController = new HabitatController('');
const atracaoController = new AtracaoController('');

// Rota padrão para testes (NÃO USAR EM AMBIENTE PRODUÇÃO)
server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    console.log(`Informações: ${username} - ${password}`);
});

/**
 * Listar informações cadastradas no banco de dados
 */
server.get('/listar-aves', aveController.todos);
server.get('/habitats', habitatController.listar);
server.get('/atracoes', atracaoController.listar);

/**
 * Cadastrar informações no sistema
 */
server.post('/novo/ave', aveController.novo);
server.post('/novo/habitat', habitatController.cadastrar);
server.post('/novo/atracao', atracaoController.cadastrar);

/**
 * Remover informações do sistema
 */
server.delete('/remover/animal', aveController.remover);
server.delete('/remover/atracao', atracaoController.remover);
server.delete('/remover/habitat', habitatController.remover);

/**
 * Atualizar informações no sistema
 */
server.put('/atualizar/animal', aveController.atualizar);
server.put('/atualizar/atracao', atracaoController.atualizar);
server.put('/atualizar/habitat', habitatController.atualizar);

new DatabaseModel().testeConexao().then((resbd) => {
    if (resbd) {
        server.listen(port, () => {
            console.info(`Servidor executando no endereço http://localhost:${port}/`);
        });
    } else {
        console.log(`Não foi possível conectar ao banco de dados`);
    }
});
