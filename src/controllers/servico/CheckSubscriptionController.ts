import {Request, Response} from 'express'
import { CheckSubscriptionService } from '../../services/servico/CheckSubscriptionService'

class CheckSubscriptionController{
  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;

    const checkSubscription = new CheckSubscriptionService();

    const status = await checkSubscription.execute({
      usuario_id
    })

    return response.json(status);

  }
}

export { CheckSubscriptionController }