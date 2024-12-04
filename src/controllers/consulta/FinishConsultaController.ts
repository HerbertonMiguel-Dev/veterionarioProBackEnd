import { Response, Request } from "express";
import { FinishConsultaService } from '../../services/consulta/FinishConsultaService'

class FinishConsultaController{

  async handle(request: Request, response: Response){
    const usuario_id = request.usuario_id;
    const agendamento_id = request.query.agendamento_id as string;

    const finalizarServico = new FinishConsultaService();

    const consulta = await finalizarServico.execute({
      usuario_id,
      agendamento_id,
  });

    return response.json(consulta);
  }

}

export { FinishConsultaController }