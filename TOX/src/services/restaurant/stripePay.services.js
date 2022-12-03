 import { Alert } from "react-native";   
    
var amt=100

const fetchPaymentIntentClientSecret = async (amt,mail) => {
    const response = await fetch("https://us-central1-toxs-110d5.cloudfunctions.net/stripePay", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            amt,
            mail
        })
    });
    const { clientSecret,error } = await response.json();
    return { clientSecret,error };
}

export const handleStripePay = async(confirmPayment,mail,userName,cost) => {

    const billingDetails={
        "email": mail,
        "name": userName
    }

    try {
        const { clientSecret,error } = await fetchPaymentIntentClientSecret(cost*100,mail);
        if (error) {
            console.log("Unable to process payment");
            alert("Unable to process payment. Please try again.")
        } 
        else{
            const { paymentIntent, error } = await confirmPayment(clientSecret, {
                type: "Card",
                billingDetails: billingDetails,
                paymentMethodType:"Card",
            });
            if (error) {
                alert(`Payment Confirmation Error ${error.message}`);
            } 
            else if (paymentIntent) {
                return true
            }
        }   
    } catch (e) {
        console.log(e);
        alert("Unable to process payment. Please try again.")
    }
    return false
}