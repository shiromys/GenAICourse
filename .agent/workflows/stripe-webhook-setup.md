---
description: Set up Stripe CLI for local webhook testing
---

## Step 1: Download and Install Stripe CLI

Go to https://stripe.com/docs/stripe-cli and download **Windows zip**.

Or install via Scoop (recommended):
```powershell
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

Or via winget:
```powershell
winget install Stripe.StripeCLI
```

## Step 2: Login to Stripe with CLI

```powershell
stripe login
```
This opens a browser tab. Confirm authorization.

## Step 3: Start Webhook Forwarding (while backend is running on port 5000)

```powershell
stripe listen --forward-to http://localhost:5000/api/payments/webhook
```

You will see output like:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxxxxx
```

## Step 4: Copy the Webhook Secret

Copy the `whsec_...` value shown in the terminal and paste it into your backend `.env`:
```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxx
```

Then **restart your backend server**.

## Step 5: Trigger a Test Event (optional — Stripe does this automatically when you pay in test mode)

```powershell
stripe trigger checkout.session.completed
```

## Step 6: Test Payment Flow End-to-End

1. Open your app at http://localhost:5173
2. Register/login as a student
3. Go to Courses → click "BUY NOW"
4. On checkout page, check the non-refundable checkbox
5. Click "Initialize Checkout" — you will be redirected to Stripe
6. Use test card: **4242 4242 4242 4242** | Expiry: **12/28** | CVC: **123** | ZIP: **10001**
7. Complete payment → Stripe redirects to `/payment-success?session_id=cs_xxx`
8. Page verifies payment, refreshes user context
9. Dashboard shows enrolled course count updated
10. Course card shows "CONTINUE COURSE" button

## Stripe Test Cards Reference

| Scenario | Card Number |
|---|---|
| ✅ Success | 4242 4242 4242 4242 |
| ❌ Declined | 4000 0000 0000 0002 |
| 🔐 3D Secure | 4000 0025 0000 3155 |
| Insufficient funds | 4000 0000 0000 9995 |
