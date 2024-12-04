import { Request, Response } from "express";
import { CreateConsultaService } from "../../services/consulta/CreateConsultaService";

class CreateConsultaController {
  async handle(req: Request, res: Response) {
    const {  servico_id, pet_id, veterinario_id, responsavel_id } = req.body;
    const usuario_id = req.usuario_id;

    const createConsultaService = new CreateConsultaService();

    try {
      const consulta = await createConsultaService.execute({
        usuario_id,
        servico_id,
        pet_id,
        veterinario_id,
        responsavel_id,
      });

      return res.status(201).json(consulta);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateConsultaController };
