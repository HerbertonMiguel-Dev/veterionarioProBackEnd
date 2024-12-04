import prismaClient from "../../prisma";

interface DetailRequest {
  pet_id: string;
}

class DetailPetService {
  async execute({ pet_id }: DetailRequest) {
    const pet = await prismaClient.pet.findFirst({
      where: {
        id: pet_id,
      },
      include: {
        responsaveis: { // Incluindo os responsáveis relacionados
          include: {
            responsavel: { // Inclui os dados do responsável
              select: {
                id: true, // Adicionado o 'id'
                nome: true,
                telefone: true,
                endereco: true,
              },
            },
          }
        },
      },
    });

    if (!pet) {
      throw new Error("Pet não encontrado.");
    }

     // Formatando os dados para retornar apenas os responsáveis com suas informações
     const formattedPet = {
      ...pet,
      responsaveis: pet.responsaveis.map((resp) => ({
        id: resp.responsavel.id,
        nome: resp.responsavel.nome,
        telefone: resp.responsavel.telefone?.toString(), // Conversão de BigInt para string
        endereco: resp.responsavel.endereco,
      })),
    };

    

    return formattedPet;
  }
}

export { DetailPetService };
