import { Request, Response } from "express";
import { DetailVeterinarioService } from '../../services/veterinario/DetailVeterinarioService'

class DetailVeterinarioController{
  async handle(request: Request, response: Response){
    const veterinario_id = request.query.veterinario_id as string;

    const detailVeterinario = new DetailVeterinarioService();

    const veterinario = await detailVeterinario.execute({
      veterinario_id,
    })

    return response.json(veterinario)

  }
}

export { DetailVeterinarioController }