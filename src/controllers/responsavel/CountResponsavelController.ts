import {Request, Response} from 'express'
import { CountResponsavelService } from '../../services/responsavel/CountResponsavelService'

class CountResponsavelController{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;

    const countResponsavel = new CountResponsavelService();

    const count = await countResponsavel.execute({
      usuario_id
    })

    return response.json(count);

  }
}

export { CountResponsavelController }