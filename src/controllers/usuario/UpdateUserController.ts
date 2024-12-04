import {Request, Response} from 'express'
import { UpdateUserService } from '../../services/usuario/UpdateUserService'

class UpdateUserController{
  async handle(request: Request, response: Response){
    const { nome, endereco } = request.body;
    const usuario_id = request.usuario_id;

    const atualizarUsuario = new UpdateUserService();

    const usuario = await atualizarUsuario.execute({
      usuario_id,
      nome,
      endereco
    })

    return response.json(usuario);

  }
}

export { UpdateUserController }