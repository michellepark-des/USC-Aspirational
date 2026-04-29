# Checkout Flow

## Context and Design Philosophy

The checkout flow is the highest-value conversion surface in the app. Research identified three specific defects in the current USC site: sign-up before payment (the primary abandonment trigger), no contact capture before checkout (making abandoned carts unrecoverable), and no required label on the protection plan (trust gap + regulatory exposure). The prototype's goal is to demonstrate the corrected flow.

The checkout is UI-only — no payment processing, no real API calls. It validates the interaction design, not the backend contract.

## Step Order

```
Step 1: Contact (email + phone)  →  Step 2: Payment  →  Confirmation
```

Not: ~~Sign-up → Payment~~ (current USC site order, primary abandonment trigger).

Lead capture at step 1 is the prerequisite for Monument's abandoned-cart SMS sequences. The phone field at step 1 makes every started checkout recoverable.

## Step 1 — Contact Info

Fields: email, phone.

No password. No account creation. The copy explicitly says "We'll hold your unit — no credit card yet."

Progress indicator: three segments (Contact highlighted, Payment and Done dimmed).

## Step 2 — Payment Info

Fields: card number, expiry, CVV, name on card.

The order summary is visible alongside the form (sticky on desktop, below the form on mobile). The summary must show:
- Monthly rent
- Admin fee (one-time), labeled as such
- Protection plan with a **"Required" badge** inline — red background, labeled required, not hidden in fine print
- First month total

The "Required" badge on the protection plan resolves the trust gap identified in the research. It must be visible before the pay button is tapped, not revealed post-payment.

## Confirmation View

After payment, the confirmation view delivers:

1. **Access code** — large monospace display, immediately usable at the gate
2. **Move-in checklist** — 4 numbered steps: head to facility → enter code → bring lock → start moving
3. **App install CTA** — placed here (post-rental), not mid-checkout

The app install CTA at confirmation is intentional. The tenant is committed and at peak intent. Mid-checkout placement would raise abandonment risk.

## Progress Indicator

Three labeled segments at the top of the checkout header: Contact / Payment / Done.

- Active segment: gold (`#fbbf24`) highlight bar, full-opacity label
- Inactive segments: 20% white bar, 40% white label

On mobile, the progress indicator must remain visible and not overflow the header.

## Step State

`CheckoutView` maintains a `currentStep` state variable (integer). Initial value: `1`. Valid values: `1` (Contact) and `2` (Payment). `CheckoutView` always opens on Step 1 — there is no mechanism to deep-link to Step 2.

## Back Navigation

Within checkout, the back button steps through the form stages rather than exiting to SearchView:

- From Step 2 (Payment) → back → Step 1 (Contact), fields preserved
- From Step 1 (Contact) → back → exits checkout to SearchView

State for both steps is held in a single `form` object in `CheckoutView`. Stepping back does not clear the form — the user's typed values persist.

The progress indicator updates to reflect the active step.

## Minimum Viewport

The checkout layout is designed for a minimum viewport width of **360px**. Below 360px, layout may degrade; it is out of scope for this prototype.

The progress indicator ("Contact / Payment / Done") must remain on one line at 360px. Labels may be shortened if needed (e.g., "Contact" → "Contact", "Payment" → "Payment", "Done" → "Done" — all three fit at 360px at `fontSize: 11`).

## Protection Plan Disclosure on Mobile

On mobile, the order summary (including the Required protection plan badge) is rendered below the payment form in DOM order. The pay button is inside the order summary, below the Required badge.

A user must scroll to the order summary to reach the pay button — the Required badge is always encountered before the pay action is available. This satisfies pre-payment disclosure without requiring a duplicate label near the button.

## Validation Behavior

The prototype does not enforce field validation (no real backend). The pay button calls `onConfirm` unconditionally on Step 2. This is intentional for the prototype — validation design is out of scope.

## Decisions & Alternatives

| Decision | Chosen | Alternatives Considered | Rationale |
|---|---|---|---|
| Step order | Contact → Payment → Confirmation | Payment → Contact, Account → Payment | Contact-first captures the lead before any drop-off. Account creation removed entirely from the flow. |
| Protection plan disclosure | "Required" badge inline in order summary at step 2 | Footnote below pay button, disclosed post-payment | Inline visibility before payment is the only approach that resolves both the trust gap and regulatory exposure simultaneously. |
| App install placement | Post-rental confirmation only | Mid-checkout, homepage sticky | Post-rental is peak intent + maximum trust. Mid-checkout raises abandonment risk. |
| Account creation | Removed from prototype flow | Before payment, after confirmation | No account creation in prototype — the research finding is that it's the primary abandonment trigger. Removed entirely. |
| Order summary position | Sticky sidebar on desktop, below form on mobile | Always below, always sidebar | Sidebar on desktop keeps total visible while filling payment fields; below on mobile avoids the form being pushed below the fold. |

## Open Questions & Future Decisions

### Resolved
1. ✅ No account creation step — removed per research finding (primary abandonment trigger).
2. ✅ Protection plan badge visible before payment — inline in order summary; pay button is below Required badge in DOM, so mobile users must scroll past it.
3. ✅ Back navigation steps through form stages (Step 2 → Step 1 → exits to Search); form state preserved on back.
4. ✅ Minimum viewport 360px.
5. ✅ Pre-payment disclosure satisfied on mobile by DOM order: Required badge above pay button.

### Deferred
1. OTP login (phone-number-based sign-in) — mentioned in mobile research as an opportunity. Deferred; adds auth complexity out of scope for prototype.
2. Real-time unit hold / reservation timeout — prototype shows no timer. In production, a held unit should expire.
3. Monument webhook integration for abandoned-cart SMS — requires backend; out of scope for prototype.

## References

- `src/App.jsx` — CheckoutView, ConfirmView components
- `docs/high-level-design.md § Payment-first checkout`
- Research: WEBSITE · MOBILE · E-COMMERCE SWOT — "OTP login + payment-first checkout", "Lead capture before checkout"
- Research: WEBSITE · DESKTOP · E-COMMERCE SWOT — "Checkout step order is wrong", "Protection plan required, not labeled"
