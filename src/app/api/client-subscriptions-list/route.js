// /src/app/api/client-subscriptions-list/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function POST(req) {
  try {
    const { customer_id } = await req.json();
    const subscriptions = await stripe.subscriptions.list({
      customer: customer_id,
      limit: 100
    });

    return NextResponse.json({ data: subscriptions.data }, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
