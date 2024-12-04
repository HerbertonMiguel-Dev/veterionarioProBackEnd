import prismaClient from "../../prisma";

interface DetailRequest{
  servico_id: string;
}

class DetailServicoService{
  async execute({ servico_id }:DetailRequest ){

    const servico = await prismaClient.servico.findFirst({
      where:{
        id: servico_id
      }
    })


    return servico;

  }
}

export { DetailServicoService }