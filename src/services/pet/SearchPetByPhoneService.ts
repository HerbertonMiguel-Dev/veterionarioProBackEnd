import prismaClient from "../../prisma";

interface SearchPetByPhoneRequest {
  telefone: string;
  usuario_id: string; // ID do usuário autenticado
}

class SearchPetByPhoneService {
  async execute({ telefone, usuario_id }: SearchPetByPhoneRequest) {
    // Validação simples para garantir que o telefone seja um número válido
    if (isNaN(Number(telefone))) {
      throw new Error("Telefone inválido.");
    }

    // Converte o telefone para BigInt, caso necessário
    const phoneAsBigInt = BigInt(telefone);

    const pets = await prismaClient.pet.findMany({
      where: {
        responsaveis: {
          some: {
            responsavel: {
              telefone: phoneAsBigInt,
              usuario_id: usuario_id, // Filtra pelo usuário autenticado
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
