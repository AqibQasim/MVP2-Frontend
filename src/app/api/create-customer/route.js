import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

// Initialize Stripe with your secret key
const stripe = new Stripe('sk_test_51OfPQBCtLGKA7fQGrCJBt8ahBHMTm4H533SgJpd9FnRkHa1PtJrwE73OeJkLsfAmAjgz8q5rE97n88fCyG67RtqI00644WGokn');


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email } = req.body;

  try {
    const customer = await stripe.customers.create({
      name,
      email,
    });
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
