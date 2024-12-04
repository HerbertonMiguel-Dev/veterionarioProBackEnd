import { Request, Response } from 'express'
import { CreatePortalService } from '../../services/assinaturas/CreatePortalService'

class CreatePortalController{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;

    const createPortal = new CreatePortalService();

    const portal = await createPortal.execute({
      usuario_id
    })

    return response.json(portal);

  }
}

export { CreatePortalController }