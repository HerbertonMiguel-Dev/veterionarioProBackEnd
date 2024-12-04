import prismaClient from "../../prisma/index"

interface PetRequest {
  usuario_id: string;
  nome: string;
  tipo: string;
  raca: string;
  idade: number
  peso: number
  responsavel_id: string
}

class CreatePetService {

  async execute({ usuario_id, nome, tipo, raca, idade, peso, responsavel_id }: PetRequest) {

    if (nome === "" || tipo === "" || responsavel_id === "") {
      throw new Error("Preencha os campos nome, especie e responsavel")
    }

    // Verifiicar quantos pets tem cadastrados
    const myPets = await prismaClient.pet.count({
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
    if(myPets >= 10 && usuario?.assinaturas?.status !== 'active'){
      throw new Error("Usuario Não autorizado")
    }

    const createPet = await prismaClient.pet.create({
      data: {
        usuario_id: usuario_id,
        nome: nome,
        tipo: tipo,
        raca: raca,
        idade: idade,
        peso: peso,
        responsaveis: {
          create: {
            responsavel_id: responsavel_id
          }
        }
      }
    })

    return createPet;

  }
}

export { CreatePetService }