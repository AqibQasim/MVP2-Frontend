export const createStripeAccount = async (form, type, user_role, result) => {
  try {
    // Call the Stripe customer creation API
    const stripeResponse = await fetch("/api/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: form.email,
        name: (type!=="invitation")? form.firstName + " " + form.lastName: form.name,
        metadata:
          user_role == "customer"
            ? { customer: 1, customer_id: result?.data?.customer_id }
            : { customer: 0, client_id: result?.data?.client_id },
      }),
    });
    const stripeData = await stripeResponse.json();
    if (stripeResponse.status !== 200) {
      throw new Error(stripeData.error);
    }
    console.log("Stripe customer created successfully:", stripeData.customer);
    let createAccountData;
    if (user_role === "client") {
      const createAccountResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-stripe-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: result.data.client_id,
            stripe_id: stripeData.customer.id,
          }),
        },
      );
      createAccountData = await createAccountResponse.json();
      if (createAccountResponse.status !== 200) {
        throw new Error(createAccountData.error);
      }
      console.log("Stripe account created successfully:", createAccountData);
    } else {
      const createAccountResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/create-customer-stripe-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer_id: result.data.customer_id,
            stripe_id: stripeData.customer.id,
          }),
        },
      );
      createAccountData = await createAccountResponse.json();
      if (createAccountResponse.status !== 200) {
        throw new Error(createAccountData.error);
      }
      console.log("Stripe account created successfully:", createAccountData);
    }
  } catch (error) {
    console.error("Error during signup:", error);
  }
};