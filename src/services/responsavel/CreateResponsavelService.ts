import prismaClient from "../../prisma/index"

interface ResponsavelRequest {
  usuario_id: string;
  nome: string;
  telefone: number;
  endereco: string
}

class CreateResponsavelService {
  async execute({ usuario_id, nome, telefone, endereco }: ResponsavelRequest) {

    if (nome === "" || telefone == null || endereco === "") {
      throw new Error("Preencha todos os campos")
    }

    // Verifiicar quantos responsaveis tem cadastrador
    const myResponsaveis = await prismaClient.responsavel.count({
      where: {
        usuario_id: usuario_id
      }
    })

    const usuario = await prismaClient.usuario.findFirst({
      where: {
        id: usuario_id,
      },
      include: {
        assinaturas: true,
      }
    })

    //validação de limite
    if (myResponsaveis >= 5 && usuario?.assinaturas?.status !== 'active') {
      throw new Error("Usuario Não autorizado")
    }

    const createResponsavel = await prismaClient.responsavel.create({
      data: {
        usuario_id: usuario_id,
        nome: nome,
        telefone: telefone,
        endereco: endereco
      }
    })

    return {
      id: createResponsavel.id, // Retorna o ID do responsável criado
      telefone: createResponsavel.telefone.toString(),
      nome: createResponsavel.nome,
    };
  }

}

export { CreateResponsavelService }