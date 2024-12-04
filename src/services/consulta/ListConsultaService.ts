import prismaClient from "../../prisma";

interface ListConsultaRequest {
  usuario_id: string;
}

class ListConsultaService {
  async execute({ usuario_id }: ListConsultaRequest) {
    // Busca as consultas do usuário com os relacionamentos detalhados
    const consultas = await prismaClient.consulta.findMany({
      where: {
        usuario_id: usuario_id, // Filtro para retornar apenas as consultas do usuário específico
      },
      select: {
        id: true,
        criado_em: true,
        atualizado_em: true,
        servico: {
          select: {
            id: true,
            nome: true,
            preco: true,
            status: true,
          },
        },
        pet: {
          select: {
            id: true,
            nome: true,
            tipo: true,
            raca: true,
            idade: true,
            peso: true,
            cadastro: true,
          },
        },
        veterinario: {
          select: {
            id: true,
            nome: true,
            crmv: true,
            status: true,
          },
        },
        responsavel: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            endereco: true,
            cadastro: true,
          },
        },
      },
    });

   // Converter o campo `telefone` (BigInt) para `string` em todas as consultas
   const consultasFormatadas = consultas.map((consulta) => {
    if (consulta.responsavel) {
      return {
        ...consulta,
        responsavel: {
          ...consulta.responsavel,
          telefone: consulta.responsavel.telefone
            ? consulta.responsavel.telefone.toString()
            : null, // Caso o telefone seja nulo
        },
      };
    }
    return consulta;
  });

  return consultasFormatadas;
}
}


export { ListConsultaService };
