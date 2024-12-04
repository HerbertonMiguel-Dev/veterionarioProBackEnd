import { Request, Response } from 'express'

import { CreateVeterinarioService } from '../../services/veterinario/CreateVeterinarioService'

class CreateVeterinarioController {
  async handle(request: Request, response: Response) {
    const { nome, crmv } = request.body;
    const usuario_id = request.usuario_id

    const createVeterinarioService = new CreateVeterinarioService();

    const veterinario = await createVeterinarioService.execute({
      usuario_id,
      nome,
      crmv
    })

    return response.json(veterinario)
  }

}

export { CreateVeterinarioController }