import { Request, Response } from "express";
import { DetailPetService } from "../../services/pet/DetailPetService";

class DetailPetController {
  async handle(request: Request, response: Response) {
    // Obtém o 'pet_id' da query string
    const pet_id = request.query.pet_id as string;

    if (!pet_id) {
      return response.status(400).json({ error: "O parâmetro 'pet_id' é obrigatório." });
    }

    const detailPet = new DetailPetService();

    try {
      const pet = await detailPet.execute({ pet_id });
      return response.json(pet); // Retorna o resultado em formato JSON
    } catch (error) {
      return response.status(400).json({ error: error.message }); // Retorna erro caso aconteça
    }
  }
}

export { DetailPetController };
