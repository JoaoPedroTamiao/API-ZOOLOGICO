import { Request, Response } from "express";
import { Atracao } from "../model/Atracao";

class AtracaoController extends Atracao {

    public async listar(req: Request, res: Response) {
        try {
            const atracoes = JSON.stringify(await Atracao.listarAtracoes());

            return res.status(200).json(atracoes);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    public async cadastrar(req: Request, res: Response) {
        try {
            const { nomeAtracao, idHabitat } = req.body;
            const novaAtracao = new Atracao(nomeAtracao);
            let result = false;

            if (idHabitat !== undefined) {
                result = await Atracao.cadastrarAtracao(novaAtracao, idHabitat);
            } else {
                result = await Atracao.cadastrarAtracao(novaAtracao);
            }

            if (result) {
                return res.status(200).json('Atração cadastrada com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar a atração no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar a atração: ${error}`);
            return res.status(400).json('Erro ao cadastrar a atração');
        }
    }

    public async remover(req: Request, res: Response) {
        try {
            const idAtracao = parseInt(req.query.idAtracao as string);
            const resultado = await Atracao.removerAtracao(idAtracao);

            if (resultado) {
                return res.status(200).json('Atração foi removida com sucesso');
            } else {
                return res.status(401).json('Erro ao remover atração');
            }
        } catch (error) {
            console.log(`Erro ao remover atração: ${error}`);
            return res.status(400).json('Erro ao remover atração');
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const { nomeAtracao } = req.body;
            const idAtracao = parseInt(req.query.idAtracao as string);
            const novaAtracao = new Atracao(nomeAtracao);

            const resultado = await Atracao.atualizarAtracao(novaAtracao, idAtracao);

            if (resultado) {
                return res.status(200).json('Atração foi atualizada com sucesso');
            } else {
                return res.status(401).json('Erro ao atualizar atração');
            }
        } catch (error) {
            console.log(`Erro ao atualizar atração: ${error}`);
            return res.status(400).json('Erro ao atualizar atração');
        }
    }
}

export default AtracaoController;
