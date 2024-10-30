// /src/app/api/create-invoice/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');

export async function POST(request) {
  try {
    const { customerId, amount, description } = await request.json();

    // Step 1: Create an Invoice Item with the specified amount
    await stripe.invoiceItems.create({
      customer: customerId,
      amount: Math.round(parseFloat(amount) * 100), // Convert dollar amount to cents
      currency: 'usd',
      description: description,
    });

    // Step 2: Create the Invoice with `auto_advance: false` for manual finalization and sending
    const invoice = await stripe.invoices.create({
      customer: customerId,
      auto_advance: false,       // Prevents automatic finalization
      collection_method: 'send_invoice', // Ensures it's set for manual payment
      days_until_due: 30,       // Optional: Set a due date
    });

    // Step 3: Finalize the Invoice
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // Step 4: Manually send the invoice email
    const sentInvoice = await stripe.invoices.sendInvoice(finalizedInvoice.id);

    return NextResponse.json(sentInvoice, { status: 200 });
  } catch (error) {
    console.error('Error creating, finalizing, and sending invoice:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
