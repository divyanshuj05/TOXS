const functions = require("firebase-functions");

const Stripe=require("stripe")
const key=functions.config().stripe.key
const stripeClient=Stripe(key,{apiVersion:"2022-08-01"})

exports.stripePay = functions.https.onRequest(async(request, response) => {

    const body = JSON.parse(JSON.stringify(request.body));
    const { amt,mail } = body;
    try{
        const paymentIntent=await stripeClient.paymentIntents.create({
            amount:amt,
            currency:"INR",
            payment_method_types:["card"]
        })
        const clientSecret=paymentIntent.client_secret
        response.json({
            clientSecret:clientSecret
        })
    }catch(e)
    {
        console.log(e.message)
        response.json({error:e.message})
    }
});