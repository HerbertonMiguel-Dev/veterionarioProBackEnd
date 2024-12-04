import prismaClient from "../../prisma/index"

interface PetRequest {
  telefone?: string;
  usuario_id: string;
  cadastro: boolean | string;
}

class ListPetService{

  async execute({ telefone, usuario_id, cadastro }: PetRequest){

    // Condição para busca pelo telefone
    if (telefone) {
      const pets = await prismaClient.pet.findMany({
        where: {
          responsaveis: {
            some: {
              responsavel: {
                telefone: BigInt(telefone), // Busca pelo telefone como BigInt
              },
            },
          },
        },
        include: {
          responsaveis: {
            include: {
              responsavel: true,
            },
          },
        },
      });

      // Formate a resposta se necessário
      const petsWithResponsaveis = pets.map((pet) => ({
        ...pet,
        responsaveis: pet.responsaveis.map((relacao) => ({
          ...relacao.responsavel,
          telefone: relacao.responsavel.telefone
            ? relacao.responsavel.telefone.toString()
            : null,
        })),
      }));

      return petsWithResponsaveis;
    }

    const pets = await prismaClient.pet.findMany({
      where:{
        usuario_id: usuario_id,
        cadastro: cadastro === 'true' ? true : false
        
      },
      include: {
        responsaveis: { // Inclui o relacionamento muitos-para-muitos
          include: {
            responsavel: true, // Inclui os detalhes do responsável
          },
        },
      },
    })

    // Converte BigInt para string

    // Ajuste opcional para formatar a resposta (exemplo simplificado)
    const petsWithResponsaveis = pets.map((pet) => ({
      ...pet,
      responsaveis: pet.responsaveis.map((relacao) => ({
        ...relacao.responsavel,
        telefone: relacao.responsavel.telefone
        ? relacao.responsavel.telefone.toString()
          : null,
        })),
    }));

    return petsWithResponsaveis;
  }
}

export { ListPetService }