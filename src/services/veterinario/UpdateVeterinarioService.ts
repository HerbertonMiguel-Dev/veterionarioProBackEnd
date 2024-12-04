import prismaClient from "../../prisma";

interface VeterinarioRequest {
  usuario_id: string;
  veterinario_id: string;
  nome: string;
  crmv: string;
  status: boolean | string;
}

class UpdateVeterinarioService{

  async execute({ usuario_id, veterinario_id, nome, crmv, status = true}:VeterinarioRequest){

    const usuario = await prismaClient.usuario.findFirst({
      where:{
        id: usuario_id
      },
      include:{
        assinaturas:true,
      }
    })

    if(usuario?.assinaturas?.status !== 'active'){
      throw new Error("Não autorizado")
    }

    const veterinario = await prismaClient.veterinario.update({
      where:{
        id: veterinario_id,
      },
      data:{
        nome: nome,
        crmv: crmv,
        status: status === true ? true : false,
      }
    })

    return veterinario;
  }
}

export { UpdateVeterinarioService }