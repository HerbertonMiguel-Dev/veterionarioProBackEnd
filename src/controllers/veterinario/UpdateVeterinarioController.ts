import {Request, Response} from 'express'
import { UpdateVeterinarioService } from '../../services/veterinario/UpdateVeterinarioService'

class UpdateVeterinarioController{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;
    const { nome, crmv, status, veterinario_id } = request.body;

    const updateVeterinarioService = new UpdateVeterinarioService();

    const veterinario = await updateVeterinarioService.execute({
      usuario_id,
      nome,
      crmv,
      status,
      veterinario_id
    })

    return response.json(veterinario);
  }
}

export { UpdateVeterinarioController }