import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {
    const priceForStrip = price * 100
    const publishableKey = 'pk_test_IIEDjFrkVPXTIEOv2UqHHLzH00GXubVALR'

const onToken = token => {
    console.log(token);
    alert('Payment Success')
    
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