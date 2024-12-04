import {Request, Response} from 'express'

import { CreateUsuarioService } from '../../services/usuario/CreateUsuarioService'

class CreateUsuarioController{
  async handle(request: Request, response: Response){
    const {nome, email, senha} = request.body;
    const createUsuarioService = new CreateUsuarioService();

    const usuario = await createUsuarioService.execute({
      nome,
      email, 
      senha,
    })

    return response.json(usuario)
  }
}

export {CreateUsuarioController}