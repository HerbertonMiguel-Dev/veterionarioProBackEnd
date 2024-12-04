import { Request, Response } from "express";
import { SearchPetByPhoneService } from "../../services/pet/SearchPetByPhoneService";

class SearchPetByPhoneController {
  async handle(req: Request, res: Response) {
    const { telefone } = req.query;

    if (!telefone) {
      return res.status(400).json({ error: "Telefone é obrigatório para busca." });
    }

    const searchPetByPhoneService = new SearchPetByPhoneService();

    try {
      const pets = await searchPetByPhoneService.execute({ telefone: telefone.toString() });
      return res.json(pets);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
      return res.status(500).json({ error: "Erro ao buscar pets." });
    }
  }
}

export { SearchPetByPhoneController };
