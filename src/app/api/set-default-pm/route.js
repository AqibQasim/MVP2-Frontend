import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function POST(req) {
    try {
        const { customerId, paymentMethodId } = await req.json(); // Get customerId and paymentMethodId from the request body

        // Update the customer's default payment method
        const customer = await stripe.customers.update(customerId, {
            invoice_settings: {
                default_payment_method: paymentMethodId,
            },
        });

        console.log('Customer updated:', customer); // Log the updated customer
        return NextResponse.json({ customer }, { status: 200 });
    } catch (error) {
        console.error('Error updating customer:', error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
