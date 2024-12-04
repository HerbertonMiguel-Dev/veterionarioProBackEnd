import { stripe } from './stipe'
import prismaClient from '../prisma/index'

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
){

  const findUser = await prismaClient.usuario.findFirst({
    where:{
      stripe_customer_id: customerId,
    },
    include:{
      assinaturas: true,
    }
  })

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    usuarioId: findUser.id,
    status: subscription.status,
    precoId: subscription.items.data[0].price.id,
  }

  if(createAction){
    console.log(subscriptionData);

    try{

      await prismaClient.assinatura.create({
        data: subscriptionData
      })

    }catch(err){
      console.log("ERRO CREATE")
      console.log(err);
    }

  }else{
    // Se nao estiver criando apenas atualizamos as informaçoes

    if(deleteAction){
      await prismaClient.assinatura.delete({
        where:{
          id: subscriptionId,
        }
      })

      return;
    }

    try{

     await prismaClient.assinatura.update({
      where:{
        id: subscriptionId
      },
      data:{
        status: subscription.status,
        precoId: subscription.items.data[0].price.id,
      }
     }) 

    }catch(err){
      console.log("ERRO UPDATE HOOK")
      console.log(err);
    }

  }

}