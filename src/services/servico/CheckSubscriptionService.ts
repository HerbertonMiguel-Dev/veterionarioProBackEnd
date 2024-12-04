import prismaClient from "../../prisma";

interface CheckSubscription{
  usuario_id: string;
}

class CheckSubscriptionService{
  async execute({ usuario_id }: CheckSubscription){

    const status = await prismaClient.usuario.findFirst({
      where:{
        id: usuario_id
      },
      select:{
        assinaturas:{
          select:{
            id: true,
            status: true,
            precoId: true,
          }
        }
      }
    })

    return status;

  }
}

export { CheckSubscriptionService }