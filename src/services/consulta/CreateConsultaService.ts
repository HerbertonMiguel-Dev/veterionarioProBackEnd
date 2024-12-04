import prismaClient from "../../prisma/index";

interface ConsultaRequest {
  usuario_id: string;
  servico_id: string;
  pet_id?: string;
  veterinario_id?: string;
  responsavel_id?: string;
}

class CreateConsultaService {
  async execute({ usuario_id, servico_id, pet_id, veterinario_id, responsavel_id }: ConsultaRequest) {
    if(usuario_id === '' || servico_id === '' || pet_id === '' || veterinario_id === '' || responsavel_id === ''){
      throw new Error("não foi possivel algum campo vazio no back-end");
    }
    
    // Criar a consulta
    const consulta = await prismaClient.consulta.create({
      data: {
        usuario_id,
        servico_id,
        pet_id,
        veterinario_id,
        responsavel_id,
      },
    });

    return consulta;
  }
}

export { CreateConsultaService };


