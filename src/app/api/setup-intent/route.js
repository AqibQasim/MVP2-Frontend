import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function POST(req) {
    try {
        const { customer_id } = await req.json(); // Get the customer ID from the request body

        // Create a Setup Intent
        const setupIntent = await stripe.setupIntents.create({
            customer: customer_id,
            payment_method_types: ['card'], // Specify payment method types
        });

        console.log('Setup Intent created:', setupIntent); // Log the created Setup Intent
        return NextResponse.json({ clientSecret: setupIntent.client_secret }, { status: 200 });
    } catch (error) {
        console.error('Error creating Setup Intent:', error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
