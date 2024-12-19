// app/api/payout/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn",
);

export async function POST(req) {
  try {
    const { accountId, amount } = await req.json();

    if (!accountId || !amount) {
      return NextResponse.json(
        { error: "Invalid accountId or amount" },
        { status: 400 },
      );
    }

    // Create a payout to the connected account
    const payout = await stripe.transfers.create({
      amount,
      currency: "usd",
      destination: accountId,
    });

    return NextResponse.json({ success: true, payout }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
