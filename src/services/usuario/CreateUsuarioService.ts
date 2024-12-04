import prismaClient from "../../prisma/index"
import { hash } from 'bcryptjs'

interface UsuarioRequest{
  nome: string 
  email: string 
  senha: string 
}

class CreateUsuarioService{
  async execute({nome, email, senha}: UsuarioRequest){
    if(!email){
      throw new Error("Email incorrect");
    }

    const usuarioJaExiste = await prismaClient.usuario.findFirst({
      where:{
        email: email
      }
    })

    if (usuarioJaExiste){
      throw new Error("createUsuarioService/Email already exists");
    }

    const hashDeSenha = await hash(senha, 8)

    const createUsuarioService = await prismaClient.usuario.create({
      data:{
        nome: nome,
        email: email,
        senha: hashDeSenha
      },
      select:{
        id: true,
        nome:true,
        email: true,
      }
    })

    return createUsuarioService;

  }
}

export {CreateUsuarioService}