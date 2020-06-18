import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'

const StripeCheckoutButton = ({ price }) => {
    const priceForStrip = price * 100
    const publishableKey = 'pk_test_IIEDjFrkVPXTIEOv2UqHHLzH00GXubVALR'	
   
    

const onToken = token => {
    axios({
        url: 'payment',
        method: 'post',
        data: {
            amount: priceForStrip,
            token
        }
    }).then(response => {
        alert('Payment Successful')
    }).catch(error => {
        console.log('Payment error: ', JSON.parse(error))
        alert('There was an issue with the payment. please make sure you use the providers credit card')
    })
}
    return (
        <StripeCheckout 
        label = 'Pay Now'
        name = 'Crown Clothings LTD'
        billingAddress
        shippingAddress
        image = 'https://svgshare.com/i/CUz.svg'
        description = {`Your total is $${ price }`}
        amount = { priceForStrip }
        panelLabel = 'Pay Now'
        token = { onToken }
        stripeKey = { publishableKey }
        />
    )

}

export default StripeCheckoutButton