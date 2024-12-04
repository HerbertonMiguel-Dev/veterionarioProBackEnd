import { Request, Response } from 'express';
import { UpdatePetService } from '../../services/pet/UpdatePetService';

class UpdatePetController {
  async handle(request: Request, response: Response) {
    const usuario_id = request.usuario_id;
    const { pet_id, nome, tipo, raca, idade, peso, responsavel_id,cadastro } = request.body;

    // Verificar se todos os campos necessários estão presentes
    if (!pet_id || !usuario_id) {
      return response.status(400).json({ error: "Campos obrigatórios não fornecidos." });
    }

    const updatePetService = new UpdatePetService();

    try {
      const pet = await updatePetService.execute({
        usuario_id,
        pet_id,
        nome,
        tipo,
        raca,
        idade,
        peso,
        cadastro,
        responsavel_id,
      });

      return response.json(pet);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao atualizar o pet. Tente novamente mais tarde." });
    }
  }
}

export { UpdatePetController };