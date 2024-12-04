import { Request, Response } from 'express'

import { CreateServicoService } from '../../services/servico/CreateServicoService'

class CreateServicoController {
  async handle(request: Request, response: Response) {
    const { nome, preco } = request.body;
    const usuario_id = request.usuario_id

    const createServicoService = new CreateServicoService()

    const servico = await createServicoService.execute({
      usuario_id,
      nome,
      preco
    })

    return response.json(servico)
  }
}

export { CreateServicoController }