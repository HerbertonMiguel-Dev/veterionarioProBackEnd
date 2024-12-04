import prismaClient from "../../prisma";

interface UserRequest{
  usuario_id: string;
  nome: string;
  endereco: string;
}

class UpdateUserService{
  async execute({ usuario_id, nome, endereco }: UserRequest){

    try{
      const usuarioJaExiste = await prismaClient.usuario.findFirst({
        where:{
          id: usuario_id,
        }
      })

      if(!usuarioJaExiste){
        throw new Error("User not exists!");
      }

      const userUpdated = await prismaClient.usuario.update({
        where:{
          id: usuario_id
        },
        data:{
          nome,
          endereco,
        },
        select:{
          nome: true,
          email: true,
          endereco: true,
        }
      })

      return userUpdated;

    }catch(err){
      console.log(err);
      throw new Error("Error an update the user!")
    }

  }
}

export { UpdateUserService }