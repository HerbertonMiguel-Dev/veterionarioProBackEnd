import { Request, Response } from "express";
import { SearchPetByPhoneService } from "../../services/pet/SearchPetByPhoneService";

class SearchPetByPhoneController {
  async handle(req: Request, res: Response) {
    const { telefone, usuario_id } = req.query;

    if (!telefone) {
      return res.status(400).json({ error: "Telefone é obrigatório para busca." });
    }

    // Verifica se o usuario_id está presente nos query params
    if (!usuario_id || typeof usuario_id !== 'string') {
      return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const searchPetByPhoneService = new SearchPetByPhoneService();

    try {
      // Passa o telefone e o usuário autenticado ao serviço
      const pets = await searchPetByPhoneService.execute({
        telefone: telefone.toString(),
        usuario_id: usuario_id,
      });

      return res.json(pets);
    } catch (error) {
      console.error("Erro ao buscar pets:", error);
      return res.status(500).json({ error: "Erro ao buscar pets." });
    }
  }
}

export { SearchPetByPhoneController };
