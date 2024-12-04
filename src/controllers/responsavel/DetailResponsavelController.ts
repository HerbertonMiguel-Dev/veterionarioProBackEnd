import { Request, Response } from "express";
import { DetailResponsavelService } from '../../services/responsavel/DetailResponsavelService'

class DetailResponsavelController{
  async handle(request: Request, response: Response){
    const responsavel_id = request.query.responsavel_id as string;

    const detailResponsavel = new DetailResponsavelService();

    const responsavel = await detailResponsavel.execute({
      responsavel_id,
    })

    return response.json(responsavel)

  }
}

export { DetailResponsavelController }