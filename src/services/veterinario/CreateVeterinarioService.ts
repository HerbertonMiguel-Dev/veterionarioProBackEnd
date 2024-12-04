import prismaClient from "../../prisma/index"

interface VeterinarioRequest {
  usuario_id: string;
  nome: string;
  crmv: string;
}

class CreateVeterinarioService {
  async execute({usuario_id, nome, crmv}:VeterinarioRequest){
    if (nome === "" || crmv === "") {
      throw new Error("Preencha os campos nome, especie e responsavel")
    }

    // Verifiicar quantos veterinarios tem cadastrados
    const myVeterinarios = await prismaClient.veterinario.count({
      where:{
        usuario_id: usuario_id
      }
    })

    const usuario = await prismaClient.usuario.findFirst({
      where:{
        id: usuario_id,
      },
      include:{
        assinaturas: true,
      }
    })

    //validação de limite
    if(myVeterinarios >= 2 && usuario?.assinaturas?.status !== 'active'){
      throw new Error("Não autorizado")
    }

    const createVeterinario = await prismaClient.veterinario.create({
      data: {
        usuario_id: usuario_id,
        nome: nome,
        crmv: crmv
      }
    })

    return createVeterinario;
  }
}

export { CreateVeterinarioService }