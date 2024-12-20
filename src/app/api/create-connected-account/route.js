import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn",
);

export async function POST(req) {
  try {
    const {
      email,
      accountHolderName,
      accountHolderType,
      accountNumber,
      routingNumber,
      representativeDetails,
      ipAddress,
    } = await req.json();

    if (
      !email ||
      !accountHolderName ||
      !accountHolderType ||
      !accountNumber ||
      !routingNumber ||
      // !businessWebsite ||
      !representativeDetails ||
      !ipAddress
    ) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 },
      );
    }

    // Create a connected account
    const account = await stripe.accounts.create({
      type: "custom",
      country: "US",
      email,
      business_type: accountHolderType,
      business_profile: {
        name: accountHolderName,
        url: 'https://www.testwebsite.com', // Provide business website
      },
      capabilities: {
        transfers: { requested: true }, // Request transfers capability
      },
      tos_acceptance: {
        date: Math.floor(Date.now() / 1000),
        ip: ipAddress, // Accept terms of service
      },
    });

    // Create a bank account token
    const bankAccountToken = await stripe.tokens.create({
      bank_account: {
        country: "US",
        currency: "usd",
        account_holder_name: accountHolderName,
        account_holder_type: accountHolderType,
        routing_number: routingNumber,
        account_number: accountNumber,
      },
    });

    // Attach the bank account to the connected account
    const bankAccount = await stripe.accounts.createExternalAccount(
      account.id,
      {
        external_account: bankAccountToken.id,
      },
    );

    // Add representative details
    await stripe.accounts.update(account.id, {
      individual: {
        first_name: representativeDetails.firstName,
        last_name: representativeDetails.lastName,
        email: email,
      },
    });

    return NextResponse.json(
      { success: true, accountId: account.id, bankAccount },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
