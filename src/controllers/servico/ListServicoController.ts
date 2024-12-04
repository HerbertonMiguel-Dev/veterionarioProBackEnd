import { Request, Response } from 'express'

import { ListServicoService } from '../../services/servico/ListServicoService'

class ListServicoController {
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;
    const status = request.query.status as string;

    const listServicos = new ListServicoService();

    const servicos = await listServicos.execute({
      usuario_id,
      status,
    })

    return response.json(servicos);
  }

}

export { ListServicoController }