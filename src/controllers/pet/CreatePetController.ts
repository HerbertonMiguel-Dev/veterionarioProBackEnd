import { Request, Response } from 'express';
import { CreatePetService } from '../../services/pet/CreatePetService';


class CreatePetController {
  async handle(request: Request, response: Response) {
    const { nome, tipo, raca, idade, peso, responsavel_id } = request.body;
    const usuario_id = request.usuario_id;

    const createPetService = new CreatePetService();

    const pet = await createPetService.execute({
      usuario_id,
      nome,
      tipo,
      raca,
      idade,
      peso,
      responsavel_id,
    });

    return response.json(pet);
  }
}

export { CreatePetController };
