import prismaClient from "../../prisma";

interface CountRequest{
  usuario_id: string;
}

class CountPetService{
  async execute({ usuario_id }: CountRequest){

    const count = await prismaClient.pet.count({
      where:{
        usuario_id: usuario_id
      }
    })

    return count;

  }
}

export { CountPetService }