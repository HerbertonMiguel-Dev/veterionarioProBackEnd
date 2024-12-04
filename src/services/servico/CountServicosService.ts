import prismaClient from "../../prisma";

interface CountRequest{
  usuario_id: string;
}

class CountServicosService{
  async execute({ usuario_id }: CountRequest){

    const count = await prismaClient.servico.count({
      where:{
        usuario_id: usuario_id
      }
    })

    return count;

  }
}

export { CountServicosService }