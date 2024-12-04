import {Request, Response } from 'express'
import { AssinaturaServicePremiun } from '../../services/assinaturas/AssinaturaServicePremiun'

class SubscribeControllerPremiun{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id

    const assinaturaService = new AssinaturaServicePremiun()

    const assinatura = await assinaturaService.execute({
      usuario_id
    })

    return response.json(assinatura);

  }
}

export { SubscribeControllerPremiun }