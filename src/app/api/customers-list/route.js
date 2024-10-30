// /src/app/api/customers-list/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit')) || 100;
  const starting_after = searchParams.get('starting_after') || null;

  try {
    let customers;
    if(starting_after != null){

       customers = await stripe.customers.list({
        limit,
        starting_after,
      });
    }else{
       customers = await stripe.customers.list({
        limit,
      });
    }

    return NextResponse.json({ data: customers.data, has_more: customers.has_more }, { status: 200 });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
