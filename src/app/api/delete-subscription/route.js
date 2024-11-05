import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function DELETE(req) {
    try {
        const { subscriptionId } = await req.json(); // Get the subscriptionId from the request body

        // Validate the input
        if (!subscriptionId) {
            return NextResponse.json({ error: 'Invalid subscriptionId' }, { status: 400 });
        }

        // Delete the subscription
        const deletedSubscription = await stripe.subscriptions.cancel(subscriptionId);

        console.log('Subscription deleted:', deletedSubscription); // Log the deleted subscription
        return NextResponse.json({ success: true, deletedSubscription }, { status: 200 });
    } catch (error) {
        console.error('Error deleting subscription:', error); // Log the error
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, { status: 200 });
}
