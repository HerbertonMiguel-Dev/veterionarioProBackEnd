import { Request, Response } from "express";
import { DetailServicoService } from '../../services/servico/DetailServicoService'

class DetailServicoController{
  async handle(request: Request, response: Response){
    const servico_id = request.query.servico_id as string;

    const detailServico = new DetailServicoService();

    const servico = await detailServico.execute({
      servico_id,
    })

    return response.json(servico)

  }
}

export { DetailServicoController }