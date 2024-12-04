import prismaClient from "../../prisma";

class UserDetailService{
    async execute(usuario_id: string){

        const user = await prismaClient.usuario.findFirst({
          where:{
            id: usuario_id
          },
          select:{
            id: true,
            nome: true,
            email: true,
            endereco: true,
            assinaturas:{
              select:{
                id: true,
                precoId: true,
                status: true,
              }
            }
          }
        })
    
        return user;
    
      }
}

export { UserDetailService }