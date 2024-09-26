import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function POST(req) {
    try {
        const { customerId, price, paymentMethodId } = await req.json(); // Get the customerId, custom price, and paymentMethodId from the request body

        // Validate the inputs
        if (!customerId || !price || !paymentMethodId) {
            return NextResponse.json({ error: 'Invalid customerId, price, or paymentMethodId' }, { status: 400 });
        }

        // Create a product and price on the fly (if not already created in your Stripe dashboard)
        const product = await stripe.products.create({
            name: 'Custom Subscription',
        });

        const stripePrice = await stripe.prices.create({
            unit_amount: price, // The custom price in cents
            currency: 'usd',
            recurring: { interval: 'month' },
            product: product.id,
        });

        // Create a subscription
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [
                {
                    price: stripePrice.id,
                },
            ],
            default_payment_method: paymentMethodId,
            expand: ['latest_invoice.payment_intent'],
        });

        console.log('Subscription created:', subscription); // Log the created subscription
        return NextResponse.json({ subscriptionId: subscription.id, clientSecret: subscription.latest_invoice.payment_intent.client_secret }, { status: 200 });
    } catch (error) {
        console.error('Error creating subscription:', error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
