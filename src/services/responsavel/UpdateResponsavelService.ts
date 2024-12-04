import prismaClient from "../../prisma";

interface ResponsavelRequest {
  usuario_id: string;
  responsavel_id: string;
  nome: string;
  cadastro: boolean | string;
  telefone: number;
  endereco: string
}

class UpdateResponsavelService {

  async execute({ usuario_id, responsavel_id, nome, telefone, endereco, cadastro = true }: ResponsavelRequest) {
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
    
    const responsavel = await prismaClient.responsavel.update({
      where: {
        id: responsavel_id,
      },
      data: {
        nome: nome,
        cadastro: Boolean(cadastro),
        telefone: telefone,
        endereco: endereco
      }
    })
    const serializedResponsavel = {
      ...responsavel,
      telefone: responsavel.telefone ? responsavel.telefone.toString() : null,  // Convertendo telefone para string
    };
    return serializedResponsavel;
  }
}

export { UpdateResponsavelService }