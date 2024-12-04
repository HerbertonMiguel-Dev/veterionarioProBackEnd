import prismaClient from "../../prisma";

interface ServicoRequest{
  usuario_id: string;
  servico_id: string;
  nome: string;
  preco: number;
  status: boolean | string;
}

class UpdateServicoService{
  async execute({ usuario_id, servico_id, nome, preco, status = true}:ServicoRequest){

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

    const servico = await prismaClient.servico.update({
      where:{
        id: servico_id,
      },
      data:{
        nome: nome,
        preco: preco,
        status: status === true ? true : false,
      }
    })

    return servico;

  }
}

export { UpdateServicoService }