import { Request, Response } from 'express'
import { AuthUserService } from '../../services/usuario/AuthUserService'

class AuthUserController{
  async handle(request: Request, response: Response){
    const { email, senha } = request.body;

    const authUserService = new AuthUserService();

    const sessao = await authUserService.execute({
      email,
      senha
    })

    return response.json(sessao);

  }
}

export { AuthUserController }