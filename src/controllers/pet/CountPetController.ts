import {Request, Response} from 'express'
import { CountPetService } from '../../services/pet/CountPetService'

class CountPetController{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;

    const countPets = new CountPetService();

    const count = await countPets.execute({
      usuario_id
    })

    return response.json(count);

  }
}

export { CountPetController }