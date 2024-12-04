
import prismaClient from "../../prisma";

interface CountRequest{
  usuario_id: string;
}

class CountVeterinariosService{
  async execute({ usuario_id }: CountRequest){

    const count = await prismaClient.veterinario.count({
      where:{
        usuario_id: usuario_id
      }
    })

    return count;

  }
}

export { CountVeterinariosService }