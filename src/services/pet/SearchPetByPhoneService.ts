import prismaClient from "../../prisma";

interface SearchPetByPhoneRequest {
  telefone: string;
}

class SearchPetByPhoneService {
  async execute({ telefone }: SearchPetByPhoneRequest) {
    // Converte o telefone para BigInt, caso necessário
    const phoneAsBigInt = BigInt(telefone);

    const pets = await prismaClient.pet.findMany({
      where: {
        responsaveis: {
          some: {
            responsavel: {
              telefone: phoneAsBigInt,
            },
          },
        },
      },
      include: {
        responsaveis: {
          include: {
            responsavel: true, // Inclui detalhes do responsável
          },
        },
      },
    });

    // Formata os dados para retornar o telefone como string
    const formattedPets = pets.map((pet) => ({
      ...pet,
      responsaveis: pet.responsaveis.map((relacao) => ({
        ...relacao.responsavel,
        telefone: relacao.responsavel.telefone
          ? relacao.responsavel.telefone.toString()
          : null,
      })),
    }));

    return formattedPets;
  }
}

export { SearchPetByPhoneService };
