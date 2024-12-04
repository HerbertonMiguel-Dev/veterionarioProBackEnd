import prismaClient from "../../prisma/index"

interface VeterinarioRequest {
  usuario_id: string;
  status: boolean | string;
}

class ListVeterinarioService{

  async execute({ usuario_id, status }: VeterinarioRequest){

    const veterinario = await prismaClient.veterinario.findMany({
      where:{
        usuario_id: usuario_id,
        status: status === 'true' ? true : false
      }
    })

    return veterinario;
  }
}

export { ListVeterinarioService }