import { Response, Request } from "express";
import { ListConsultaService } from "../../services/consulta/ListConsultaService";

class ListConsultaController {
  async handle(request: Request, response: Response) {
    try {
      // Obtendo o ID do usuário autenticado (injetado por middleware)
      const usuario_id = request.usuario_id;

      // Instanciando o serviço
      const listConsultaService = new ListConsultaService();

      // Chamando o serviço para listar consultas
      const consultas = await listConsultaService.execute({ usuario_id });

      // Retornando o resultado
      return response.json(consultas);
    } catch (error) {
      console.error("Erro ao listar consultas:", error);

      // Retornando mensagem de erro em caso de falha
      return response.status(500).json({
        error: "Erro ao listar consultas. Tente novamente mais tarde.",
      });
    }
  }
}

export { ListConsultaController };
