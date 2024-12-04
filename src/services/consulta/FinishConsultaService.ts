import prismaClient from "../../prisma";

interface FinishRequest {
  agendamento_id: string;
  usuario_id: string;
}

class FinishConsultaService {
  async execute({ agendamento_id, usuario_id }: FinishRequest) {
    if (agendamento_id === '' || usuario_id === '') {
      throw new Error('Error.');
    }

    try {
      const pertenceAoUsuario = await prismaClient.consulta.findFirst({
        where: {
          id: agendamento_id,
          usuario_id: usuario_id
        }
      });

      if(!pertenceAoUsuario){
        throw new Error("não autorizado")
      }

      await prismaClient.consulta.delete({
        where:{
          id: agendamento_id
        }
      })

      return {message: "Finalizado com sucessso"}


    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}

export { FinishConsultaService };