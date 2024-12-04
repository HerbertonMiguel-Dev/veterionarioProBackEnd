import {Request, Response} from 'express'
import { CountServicosService } from '../../services/servico/CountServicosService'

class CountServicosController{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;

    const countServicos = new CountServicosService();

    const count = await countServicos.execute({
      usuario_id
    })

    return response.json(count);

  }
}

export { CountServicosController }