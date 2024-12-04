import { Request, Response } from 'express'

import { ListVeterinarioService } from '../../services/veterinario/ListVeterinarioService'

class ListVeterinarioController {
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;
    const status = request.query.status as string;

    const listVeterinarios = new ListVeterinarioService();

    const veterinarios = await listVeterinarios.execute({
      usuario_id,
      status,
    })

    return response.json(veterinarios);
  }
}

export { ListVeterinarioController }