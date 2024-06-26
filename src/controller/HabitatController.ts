import { Request, Response } from "express";
import { Habitat } from "../model/Habitat";

class HabitatController extends Habitat {

    public async listar(req: Request, res: Response) {
        try {
            const habitats = JSON.stringify(await Habitat.listarHabitats());

            return res.status(200).json(habitats);
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return res.status(400).json(`Erro ao acessar as informações`);
        }
    }

    public async cadastrar(req: Request, res: Response) {
        try {
            const { nomeHabitat } = req.body;
            const novoHabitat = new Habitat(nomeHabitat);
            const result = await Habitat.cadastrarHabitat(novoHabitat);

            if (result) {
                return res.status(200).json('Habitat cadastrado com sucesso');
            } else {
                return res.status(400).json('Não foi possível cadastrar o habitat no banco de dados');
            }
        } catch (error) {
            console.log(`Erro ao cadastrar o habitat: ${error}`);
            return res.status(400).json('Erro ao cadastrar o habitat');
        }
    }

    public async remover(req: Request, res: Response) {
        try {
            const idHabitat = parseInt(req.query.idHabitat as string);
            const resultado = await Habitat.removerHabitat(idHabitat);

            if (resultado) {
                return res.status(200).json('Habitat foi removido com sucesso');
            } else {
                return res.status(401).json('Erro ao remover habitat');
            }
        } catch (error) {
            console.log(`Erro ao remover habitat: ${error}`);
            return res.status(400).json('Erro ao remover habitat');
        }
    }

    public async atualizar(req: Request, res: Response) {
        try {
            const { nomeHabitat } = req.body;
            const idHabitat = parseInt(req.query.idHabitat as string);
            const novoHabitat = new Habitat(nomeHabitat);
            const resultado = await Habitat.atualizarHabitat(novoHabitat, idHabitat);

            if (resultado) {
                return res.status(200).json('Habitat foi atualizado com sucesso');
            } else {
                return res.status(401).json('Erro ao atualizar habitat');
            }
        } catch (error) {
            console.log(`Erro ao atualizar habitat: ${error}`);
            return res.status(400).json('Erro ao atualizar habitat');
        }
    }
}

export default HabitatController;
