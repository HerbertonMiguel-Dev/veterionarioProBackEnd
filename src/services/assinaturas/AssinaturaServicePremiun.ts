import prismaClient from "../../prisma";
import Stripe from 'stripe';

interface AssinaturaRequest{
  usuario_id: string;
}

class AssinaturaServicePremiun {
  async execute({ usuario_id }: AssinaturaRequest){
   
    const stripe = new Stripe(
      process.env.STRIPE_API_KEY,
      {
        apiVersion: '2024-11-20.acacia',
        appInfo:{
          name: 'veterinariopro',
          version: '1',
        }
      }
    )

    // Buscar o usuario e cadastrar ele no stripe caso nao tenha cadastrado
    const findUser = await prismaClient.usuario.findFirst({
      where:{
        id: usuario_id
      }
    })

    let customerId = findUser.stripe_customer_id

    if(!customerId){
      // Caso nao tenha criamos como cliente lá no stripe
      const stripeCustomer = await stripe.customers.create({
        email: findUser.email
      })

      await prismaClient.usuario.update({
        where:{
          id: usuario_id
        },
        data:{
          stripe_customer_id: stripeCustomer.id
        }
      })

      customerId = stripeCustomer.id

    }


    // inicializar o nosso checkout de pagamento
    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: process.env.STRIPE_PRICE, quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })

    return { sessionId: stripeCheckoutSession.id }


  }
}

export { AssinaturaServicePremiun } 