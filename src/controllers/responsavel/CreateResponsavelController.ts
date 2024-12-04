import { Request, Response } from 'express'

import { CreateResponsavelService } from '../../services/responsavel/CreateResponsavelService'

class CreateResponsavelController {
  async handle(request: Request, response: Response) {
    const { nome, telefone, endereco } = request.body;
    const usuario_id = request.usuario_id

    const createResponsavelService = new CreateResponsavelService();

    const responsavel = await createResponsavelService.execute({
      usuario_id,
      nome,
      telefone,
      endereco,
    })

    return response.json(responsavel)
  }
}

export { CreateResponsavelController }