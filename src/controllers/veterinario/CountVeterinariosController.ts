import {Request, Response} from 'express'
import { CountVeterinariosService } from '../../services/veterinario/CountVeterinariosService'

class CountVeterinariosController{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;

    const countVeterinarios = new CountVeterinariosService();

    const count = await countVeterinarios.execute({
      usuario_id
    })

    return response.json(count);

  }
}

export { CountVeterinariosController }