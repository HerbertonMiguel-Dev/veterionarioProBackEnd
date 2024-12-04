import {Request, Response} from 'express'
import { UserDetailService } from '../../services/usuario/DetailUserService'

class DetailUserController{
  async handle(request: Request, response: Response){

    const usuario_id = request.usuario_id;

    const userDetailService = new UserDetailService();

    const detalheUsuario= await userDetailService.execute(usuario_id);

    return response.json(detalheUsuario);

  }
}

export { DetailUserController }