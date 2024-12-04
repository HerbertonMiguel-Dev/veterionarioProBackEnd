import {Request, Response} from 'express'
import { UpdateServicoService } from '../../services/servico/UpdateServicoService'

class UpdateServicoController{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;
    const { nome, preco, status, servico_id } = request.body;

    const updateServicoService = new UpdateServicoService();

    const servico = await updateServicoService.execute({
      usuario_id,
      nome,
      preco,
      status,
      servico_id
    })

    return response.json(servico);

  }
}

export { UpdateServicoController }