import prismaClient from "../../prisma";
import Stripe from "stripe";

interface CreatePortalRequest{
  usuario_id: string;
}

class CreatePortalService{
  async execute({ usuario_id }: CreatePortalRequest){

    const stripe = new Stripe(
      process.env.STRIPE_API_KEY,
      {
        apiVersion: '2024-11-20.acacia',
        appInfo: {
          name: 'veterinariopro',
          version: '1'
        }
      }
    )


    const findUser = await prismaClient.usuario.findFirst({
      where:{
        id: usuario_id
      }
    })

    let sessionId = findUser.stripe_customer_id;

    if(!sessionId){
      console.log("NAO TEM ID")
      return { message: 'User not found' }
    }

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sessionId,
      return_url: process.env.STRIPE_SUCCESS_URL
    })

    return { sessionId: portalSession.url }

  }
}

export { CreatePortalService }