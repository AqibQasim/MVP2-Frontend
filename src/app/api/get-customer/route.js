// /src/app/api/get-customer/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn",
);

export async function POST(request) {
  try {
    const { customerId } = await request.json();
    if (!customerId) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 },
      );
    }

    const customer = await stripe.customers.retrieve(customerId);
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    console.error("Error fetching customer:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
