import prismaClient from "../../prisma";

interface DetailRequest{
  veterinario_id: string;
}

class DetailVeterinarioService{
  async execute({ veterinario_id }:DetailRequest ){

    const veterinario = await prismaClient.veterinario.findFirst({
      where:{
        id: veterinario_id
      }
    })


    return veterinario;

  }
}

export { DetailVeterinarioService }