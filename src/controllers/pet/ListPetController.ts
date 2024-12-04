import { Request, Response } from 'express';
import { ListPetService } from '../../services/pet/ListPetService';

class ListPetController {
  async handle(request: Request, response: Response) {
    try {
      const usuario_id = request.usuario_id;
      const cadastro = request.query.cadastro as string;
      const telefone = request.query.telefone as string | undefined;

      const listPets = new ListPetService();

      const pets = await listPets.execute({
        usuario_id,
        cadastro,
        telefone,
      });

      return response.status(200).json(pets);
    } catch (error) {
      console.error('Error listing pets:', error);
      return response
        .status(500)
        .json({ error: 'Erro ao listar os pets. Tente novamente mais tarde.' });
    }
  }
}

export { ListPetController };
