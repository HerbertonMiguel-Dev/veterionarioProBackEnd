import prismaClient from "../../prisma";

interface PetRequest {
  usuario_id: string;
  pet_id: string;
  nome?: string;
  tipo?: string;
  raca?: string;
  idade?: number;
  peso?: number;
  cadastro: boolean | string;
  responsavel_id?: string;
}

class UpdatePetService {
  async execute({
    usuario_id,
    pet_id,
    nome,
    tipo,
    raca,
    idade,
    peso,
    responsavel_id,
    cadastro = true,
  }: PetRequest) {
    // Verifica se o usuário tem uma assinatura ativa
    const usuario = await prismaClient.usuario.findFirst({
      where: {
        id: usuario_id,
      },
      include: {
        assinaturas: true,
      },
    });

    if (usuario?.assinaturas?.status !== "active") {
      throw new Error("Não autorizado");
    }

    // Atualiza os dados do pet
    const pet = await prismaClient.pet.update({
      where: {
        id: pet_id,
      },
      data: {
        nome,
        tipo,
        raca,
        idade,
        peso,
        cadastro: Boolean(cadastro),
      },
    });

    // Se o responsavel_id for fornecido, gerencia o relacionamento
    if (responsavel_id) {
      await prismaClient.responsaveisPet.upsert({
        where: {
          responsavel_id_pet_id: {
            responsavel_id,
            pet_id,
          },
        },
        update: {
          responsavel_id,
        },
        create: {
          responsavel_id,
          pet_id,
        },
      });
    }

    return pet;
  }
}

export { UpdatePetService };
