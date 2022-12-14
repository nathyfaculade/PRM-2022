import { Category } from '../entity/Category';
import{Request, Response} from "express";
import { TypeORMError } from 'typeorm';
import { create } from 'domain';

class CategoryController{

    public async index(request: Request, response: Response){
        try {
            // Carrego TODOS os registros do banco
            const categories = await Category.find();

            // Retorna a lista
            return response.json(categories);
        } catch (e) {
            const error = e as TypeORMError;

            return response.status(500).json({message: error.message});
        }
    }

    public async create(request: Request, response: Response){
        try {
            // Salvo no banco a intidade que veio na requisição
            const category = await Category.save(request.body);
    
            // Retorno a entidade inserida
            return response.status(201).json(category);
        } catch (e) {
            const error = e as TypeORMError;
    
            return response.status(500).json({message: error.message});
        }
    }

    public async show(request: Request, response: Response){
        try {
            //Pego o ID que foi enviado por request param
            const {id} = request.params;

            //Verifico se veio o parametro ID
            if(!id){
                return response.status(400).json({message: 'Parametro ID não informado'})
            }

            // Busco a entity no banco pelo ID
            const found = await Category.findOneBy({
                id: Number(id)
            });

            //Verifica se encontrou a Category
            if(!found){
                return response.status(400).json({message: 'Recurso não encontrado'})
            }

            // Retorna a lista
            return response.json(found);
        } catch (e) {
            const error = e as TypeORMError;

            return response.status(500).json({message: error.message});
        }
    }

    public async update(request: Request, response: Response){
        try {
            //Pego o ID que foi enviado por request param
            const {id} = request.params;

            //Verifico se veio o parametro ID
            if(!id){
                return response.status(400).json({message: 'Parametro ID não informado'})
            }

            // Busco a entity no banco pelo ID
            const found = await Category.findOneBy({
                id: Number(id)
            });

            //Verifica se encontrou a Category
            if(!found){
                return response.status(400).json({message: 'Recurso não encontrado'})
            }

            //Atualizo com os novos dados 
            await Category.update(found.id, request.body);

            const novo = request.body;

            //Altero o ID para o que veio no request 
            novo.id = found.id;


            // Retorna a lista
            return response.json(novo);
        } catch (e) {
            const error = e as TypeORMError;

            return response.status(500).json({message: error.message});
        }
    }

    public async remove(request: Request, response: Response){
        try {
            //Pego o ID que foi enviado por request param
            const {id} = request.params;

            //Verifico se veio o parametro ID
            if(!id){
                return response.status(400).json({message: 'Parametro ID não informado'})
            }

            // Busco a entity no banco pelo ID
            const found = await Category.findOneBy({
                id: Number(id)
            });

            //Verifica se encontrou a Category
            if(!found){
                return response.status(400).json({message: 'Recurso não encontrado'})
            }

            // Removo o registro baseado no ID
            await found.remove();

            // Retorna o status 204 que é sem retorno
            return response.status(204).json();
        } catch (e) {
            const error = e as TypeORMError;

            return response.status(500).json({message: error.message});
        }
    }

}



export default new CategoryController();
