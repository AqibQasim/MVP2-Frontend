import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function POST(req) {
    try {
        const { name, email } = await req.json(); // Get the name and email from the request body

        // Create a new customer in Stripe
        const customer = await stripe.customers.create({
            name,
            email,
        });

        // Return the created customer object
        return NextResponse.json({ customer }, { status: 200 });
    } catch (error) {
        console.error('Error creating customer:', error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
