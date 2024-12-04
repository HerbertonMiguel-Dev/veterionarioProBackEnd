import prismaClient from "../../prisma";

interface DetailRequest {
  responsavel_id: string;
}

class DetailResponsavelService {
  async execute({ responsavel_id }: DetailRequest) {

    const responsavel = await prismaClient.responsavel.findFirst({
      where: {
        id: responsavel_id
      }
    })

    if (!responsavel) {
      throw new Error("Responsável não encontrado");
    }

    // Converte BigInt para string
    const serializedResponsavel = {
      ...responsavel,
      telefone: responsavel.telefone ? responsavel.telefone.toString() : null,
    };

    return serializedResponsavel;

  }
}

export { DetailResponsavelService }