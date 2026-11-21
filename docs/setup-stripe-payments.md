# Taking client payments with Stripe

Clients pay through Stripe's dashboard, not through the website. There is no checkout code to build or maintain: you send invoices and a payment link, and Stripe handles the monthly charges, receipts and retries.

| Plan | Setup fee | Monthly |
|---|---|---|
| Website only | $500 (50% deposit + 50% at launch) | $50 care plan |
| Website + automations | $750 (50% deposit + 50% at launch) | $100 care plan |

Prices live in `src/site.config.ts`. If they change there, update the Stripe products below to match.

## Fees (Stripe standard US rates)
- **Bank payment (ACH):** 0.8%, capped at $5. **Card:** 2.9% + 30¢.
- **Invoices:** +0.4% per paid invoice. **Subscriptions:** +0.7% of what's billed.
- About $6 on a $500 setup paid by bank (about $17 by card). About $0.75/month on $50 by bank (about $2.10 by card).
- No monthly fee. Ask clients to pay by bank.

## One-time setup (about 30 minutes)
1. **Create the account** at stripe.com. Business type: individual / sole proprietor. Business name **Askale**, website **askale.app**, support email **hello@askale.app**. Add the bank account for payouts and turn on two-factor login.
2. **Public details** (Settings → Business → Public details): statement descriptor `ASKALE`, so the charge is easy to recognize on the client's statement.
3. **Branding** (Settings → Branding): upload the logo mark (`Personal Website/logos/askale-mark.svg` in the project files), brand color terracotta, accent coffee. This styles invoices, receipts and the payment page.
4. **Payment methods** (Settings → Payments → Payment methods): turn on **Cards** and **ACH Direct Debit**. Leave the rest off to keep the payment page simple.
5. **Invoice defaults** (Settings → Billing → Invoices): payment terms **Due in 7 days**; default footer (see templates below); turn on **reminders** (3 days before due, on due date, 7 days after).
6. **Subscription emails** (Settings → Billing → Subscriptions and emails): turn on **Smart Retries**, **emails for failed payments**, and **emails for expiring cards**. After all retries fail: **mark the subscription unpaid** (don't cancel automatically; you'll talk to the client first).
7. **Products** (Product catalog → Add product). Create these once and reuse them for every client:

   | Product | Price | Type |
   |---|---|---|
   | Website setup: deposit (50%) | $250 | One-time |
   | Website setup: final (50%) | $250 | One-time |
   | Website + automations setup: deposit (50%) | $375 | One-time |
   | Website + automations setup: final (50%) | $375 | One-time |
   | Website care plan | $50 / month | Recurring |
   | Website + automations care plan | $100 / month | Recurring |

8. **Payment links for the care plans** (Payment Links → New, one per recurring product): turn on **collect customer's business name** and **phone number**; after payment, show the confirmation message from the templates below. Save both links in your notes. They're reusable for every client.

Test the whole flow once in **test mode** (toggle top right) with Stripe's test bank account before using it with a real client.

## Per client
1. **Signed agreement.** 50% deposit, 2 revision rounds, 30-day cancel notice on the care plan (terms are in the Agency Workflow doc). Sign with any free e-sign tool.
2. **Deposit invoice.** Customers → Add customer (business name, contact email). Then Invoices → Create invoice → that customer → add the matching *deposit* product → Send. Start work when it's paid. A bank payment takes about 4 business days to clear.
3. **Final invoice at launch.** Same steps with the *final* product. Hand over the site once it's paid.
4. **Start the care plan** at launch: email the client the matching care-plan payment link. They pay the first month and save their bank account, and Stripe charges them on the same day each month after that.
5. **Cancelling.** Customers → the client → subscription → Cancel → *at end of period*, so they keep the month they paid for.

If a client won't pay online, you can still record a check or Zelle payment: open the invoice → **Mark as paid** → *Paid outside of Stripe*.

## Templates

**Invoice footer (default)**
> Thanks for working with Askale! Paying by bank (ACH) is preferred and keeps costs low. Questions? Reply to this email or write hello@askale.app.

**Deposit invoice memo**
> 50% deposit for your new website. Work starts as soon as this is paid, and the remaining 50% is due at launch.

**Final invoice memo**
> Final 50% for your website. Your site goes live and is handed over once this is paid.

**Care plan email (with the payment link)**
> Hi {name}, your site is live! Your monthly care plan ({$50 or $100}/month) covers hosting, updates, fixes and small changes. Use this link to start it: {link}. Paying by bank is preferred. You'll be billed on the same day each month, and you can cancel with 30 days' notice.

**Payment link confirmation message**
> Thanks! Your care plan is active. You'll get a receipt by email each month.

## Taxes and records
- Stripe sends a 1099-K at the end of the year, and you can export payouts for your taxes (Reports → Payouts).
- Before your first client, check whether Texas sales tax applies to the monthly care plan. Hosting can count as a taxable data processing service in Texas, but one-time design work usually doesn't. Stripe Tax isn't needed at this size.

## For client sites
Most clients take payments in person or through their own tools. If a client wants online payments or deposits on *their* site, start with a Stripe Payment Link or a Cal.com paid booking before building any checkout code. Their Stripe account is theirs, not Askale's.
