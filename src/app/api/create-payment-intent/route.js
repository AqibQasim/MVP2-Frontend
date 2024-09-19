import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function POST(req) {
    try {
        const { amount } = await req.json(); // Get the amount from the request body

        // Validate the amount
        if (!amount || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        // Create a Payment Intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd', // Change to your desired currency
        });

        console.log('Payment Intent created:', paymentIntent); // Log the created Payment Intent
        return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
    } catch (error) {
        console.error('Error creating Payment Intent:', error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
