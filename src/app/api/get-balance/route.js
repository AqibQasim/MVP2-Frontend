// /src/app/api/stripe-balance/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function GET() {
  try {
    const balance = await stripe.balance.retrieve();
    return NextResponse.json(balance, { status: 200 });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
