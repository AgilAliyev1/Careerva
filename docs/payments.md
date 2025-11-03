# Payment Processing with Paddle

This project routes paid subscriptions through [Paddle](https://www.paddle.com/), a merchant-of-record platform that supports sellers in Azerbaijan. The checkout links used on the Subscription page are configurable so you can connect the live site to your Paddle products without code changes.

## 1. Create Paddle products and checkout links
1. Sign up for a Paddle account and complete the seller verification flow using your Azerbaijani business or individual documentation.
2. Create three products or subscription plans in the Paddle dashboard that match the Starter, Growth, and Unlimited tiers. For subscription products, Paddle automatically handles recurring billing and tax compliance in supported regions.
3. For each product, copy the **Hosted Checkout** URL. These URLs are used to redirect authenticated users from the web app to Paddle's secure payment flow.

## 2. Configure environment variables
Add the checkout URLs to your `.env` file (or the hosting provider's environment configuration):

```bash
VITE_PADDLE_STARTER_CHECKOUT_URL="https://checkout.paddle.com/your-starter-plan"
VITE_PADDLE_GROWTH_CHECKOUT_URL="https://checkout.paddle.com/your-growth-plan"
VITE_PADDLE_UNLIMITED_CHECKOUT_URL="https://checkout.paddle.com/your-unlimited-plan"
```

Restart the Vite dev server after changing environment variables so the new values are available to the client.

## 3. Test the redirect flow
With the env vars in place:
1. Sign in to the app.
2. Navigate to `/subscription` and select a plan. The app now redirects to the matching Paddle checkout page and pre-fills the user's email where possible.
3. Complete a test purchase using Paddle's sandbox mode to ensure the redirect returns to your success page.

## 4. Record fulfilled subscriptions in Supabase
To keep Supabase in sync with paid customers:
1. Set the **Return URL** in each Paddle product to a route you control (for example, `/payment-success`). Paddle appends query parameters such as `checkout_id` and `passthrough` that you can use to confirm the transaction.
2. Configure a Paddle webhook pointing to a Supabase Edge Function (for example, `https://<project>.functions.supabase.co/paddle-webhook`). Enable events like `subscription_created`, `subscription_payment_succeeded`, and `subscription_cancelled`.
3. In the webhook handler, verify Paddle's signature, parse the payload, and use the Supabase Admin client to upsert rows into the `subscriptions` table based on the payer email or Paddle's `passthrough` metadata.
4. Optionally, store the Paddle subscription ID on the Supabase record so you can process cancellations or upgrades from your dashboard.

## 5. Payouts to your Azerbaijani account
Paddle aggregates customer payments, manages taxes, and pays out to you on a schedule (typically monthly). In the Paddle dashboard:
1. Open **Settings → Payouts** and add your preferred payout method (for Azerbaijan you can use an international bank account or a supported e-wallet such as Payoneer).
2. Make sure the payout currency and bank details match your local banking requirements.
3. Review Paddle's minimum payout thresholds and fees so you can plan cash flow.

## 6. Going live
- Switch from Paddle's sandbox to live environment by replacing the checkout URLs with the production versions.
- Double-check that webhooks are updated to use the live endpoint and that your Edge Function uses the live Paddle API key for signature verification.
- Run an end-to-end live purchase with a low-price plan to ensure funds arrive in your payout account as expected.

Following these steps ensures users are redirected to a compliant payment page and that completed payments are recorded back in Supabase while funds settle into your Azerbaijani payout account.
