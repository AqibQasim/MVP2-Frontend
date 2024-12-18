import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn",
);

export async function DELETE(req) {
  try {
    const { paymentMethodId } = await req.json(); // Get the paymentMethodId from the request body

    // Validate the input
    if (!paymentMethodId) {
      return NextResponse.json(
        { error: "Invalid paymentMethodId" },
        { status: 400 },
      );
    }

    // Detach the payment method
    const detachedPaymentMethod =
      await stripe.paymentMethods.detach(paymentMethodId);

    console.log("Payment method detached:", detachedPaymentMethod); // Log the detached payment method
    return NextResponse.json(
      { success: true, detachedPaymentMethod },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error detaching payment method:", error); // Log the error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
