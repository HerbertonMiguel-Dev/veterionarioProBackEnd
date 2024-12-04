import {Request, Response} from 'express'
import { UpdateResponsavelService } from '../../services/responsavel/UpdateResponsavelService'

class UpdateResponsavelController{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;
    const { nome, telefone, endereco, cadastro, responsavel_id } = request.body;

    const updateResponsaveService = new UpdateResponsavelService();

    const responsavel = await updateResponsaveService.execute({
      usuario_id,
      nome,
      telefone,
      cadastro,
      endereco,
      responsavel_id
    })

    return response.json(responsavel);
  }
}

export { UpdateResponsavelController }