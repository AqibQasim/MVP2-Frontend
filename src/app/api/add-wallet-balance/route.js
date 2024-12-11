import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn",
);

export async function POST(req) {
  try {
    const { customer_id, amount } = await req.json(); // Get the customer ID from the request body

    // Create a Setup Intent
    const walletBalance = await stripe.customers.createBalanceTransaction(customer_id, {
        amount:amount,
        currency:'usd',
    });

    console.log("wallet Balance created:", walletBalance); // Log the created Setup Intent
    return NextResponse.json(
      { data: walletBalance },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error adding balance to wallet:", error); // Log the error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
