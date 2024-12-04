import {Request, Response } from 'express'
import { AssinaturaServiceBasic } from '../../services/assinaturas/AssinaturaServiceBasic'

class SubscribeControllerBasic{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id

    const assinaturaServiceBasic = new AssinaturaServiceBasic()

    const assinaturaBasic = await assinaturaServiceBasic.execute({
      usuario_id
    })

    return response.json(assinaturaBasic);

  }
}

export { SubscribeControllerBasic }