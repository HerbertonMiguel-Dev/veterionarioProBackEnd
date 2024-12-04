import prismaClient from "../../prisma/index"

interface ServicoRequest {
    usuario_id: string;
    nome: string;
    preco: number;
}


class CreateServicoService {
  async execute({usuario_id, nome, preco}:ServicoRequest){
    if (nome === "" || preco === null) {
      throw new Error("Preencha os campos nome e preço")
    }

    // Verifiicar quantos veterinarios tem cadastrados
    const myServicos = await prismaClient.servico.count({
      where:{
        usuario_id: usuario_id
      }
    })

    const usuario = await prismaClient.usuario.findFirst({
      where:{
        id: usuario_id,
      },
      include:{
        assinaturas: true,
      }
    })

    //validação de limite
    if(myServicos >= 3 && usuario?.assinaturas?.status !== 'active'){
      throw new Error("Não autorizado")
    }

    const createServico = await prismaClient.servico.create({
      data: {
        usuario_id: usuario_id,
        nome: nome,
        preco: preco
      }
    })
    return createServico;
  }
}

export { CreateServicoService }