import prismaClient from "../../prisma";

interface CountRequest{
  usuario_id: string;
}

class CountResponsavelService{
  async execute({ usuario_id }: CountRequest){

    const count = await prismaClient.responsavel.count({
      where:{
        usuario_id: usuario_id
      }
    })

    return count;

  }
}

export { CountResponsavelService }