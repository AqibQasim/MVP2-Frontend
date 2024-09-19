import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function POST(req) {
    try {
        const { customer_id } = await req.json(); // Get the customer ID from the request body
        console.log("CUSTOMER ID PASSED ", customer_id);

        // Fetch the payment methods
        const paymentMethods = await stripe.paymentMethods.list({
            type: 'card',
            customer: customer_id,
             // Adjust the limit as needed
        });

        return NextResponse.json({ data: paymentMethods.data }, { status: 200 });
    } catch (error) {
        console.error('Error fetching payment methods:', error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}