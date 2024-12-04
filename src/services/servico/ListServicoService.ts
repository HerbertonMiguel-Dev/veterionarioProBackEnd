import prismaClient from "../../prisma/index"

interface ServicoRequest{
  usuario_id: string;
  status: boolean | string;
}

class ListServicoService{

  async execute({ usuario_id, status }: ServicoRequest){

    const servico = await prismaClient.servico.findMany({
      where:{
        usuario_id: usuario_id,
        status: status === 'true' ? true : false
      }
    })

    return servico;
  }
}

export { ListServicoService }