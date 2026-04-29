# Checkout Flow Specs

Specs for the checkout conversion flow: step order, lead capture, protection plan disclosure, back navigation, and post-rental confirmation.

## Step Order & Structure

- [x] **CHKOUT-UI-001**: The system shall present checkout in the order: Step 1 (Contact) → Step 2 (Payment) → Confirmation.
- [x] **CHKOUT-UI-002**: The system shall display a three-segment progress indicator at the top of the checkout header labeled "Contact", "Payment", and "Done".
- [x] **CHKOUT-UI-003**: While Step 1 is active, the system shall highlight the "Contact" progress segment with a gold (`#fbbf24`) bar and full-opacity label; "Payment" and "Done" shall appear dimmed.
- [x] **CHKOUT-UI-004**: While Step 2 is active, the system shall highlight the "Payment" progress segment with a gold bar and full-opacity label; "Contact" and "Done" shall appear dimmed.
- [x] **CHKOUT-UI-005**: The progress indicator shall remain on a single line at a minimum viewport width of 360px.
- [x] **CHKOUT-UI-006**: When the user activates the "Continue" control on Step 1, the system shall advance to Step 2.

## Step 1 — Lead Capture

- [x] **CHKOUT-LEAD-001**: The system shall display email and phone input fields in Step 1 before any payment fields are shown.
- [x] **CHKOUT-LEAD-002**: The Step 1 header copy shall read "Step 1 - Contact info" with subtext "We'll hold your unit and send you a confirmation. No credit card yet."
- [x] **CHKOUT-LEAD-003**: The system shall not display any account creation or password fields at any step in the checkout flow.

## Step 2 — Payment

- [x] **CHKOUT-PAY-001**: The system shall display card number, expiry, CVV, and name-on-card fields in Step 2.
- [x] **CHKOUT-PAY-002**: The Step 2 header copy shall read "Step 2 - Payment info" with subtext "Your card is charged only after you review the rental agreement."

## Order Summary

- [x] **CHKOUT-ORD-001**: The system shall display an order summary containing: unit name, location, monthly rent, admin fee (labeled "one-time"), protection plan fee, and first-month total.
- [x] **CHKOUT-ORD-002**: The protection plan line item shall display an inline badge labeled "Required" with a red background, visible in the order summary before the pay button.
- [x] **CHKOUT-ORD-003**: While `isMobile` is false, the order summary shall render as a sticky sidebar to the right of the form fields.
- [x] **CHKOUT-ORD-004**: While `isMobile` is true, the order summary shall render below the form fields in DOM order, with the pay button inside the order summary block.
- [x] **CHKOUT-ORD-005**: While `isMobile` is true, the protection plan Required badge shall appear above the pay button in DOM order, so the user must scroll past it to reach the pay button.

## Step State

- [x] **CHKOUT-NAV-000**: The system shall initialize `CheckoutView` on Step 1 (Contact); there is no mechanism to enter checkout on Step 2.

## Back Navigation

- [x] **CHKOUT-NAV-001**: When the user activates the back control while on Step 2 (Payment), the system shall navigate to Step 1 (Contact) without clearing any form field values.
- [x] **CHKOUT-NAV-002**: When the user activates the back control while on Step 1 (Contact), the system shall exit checkout and navigate to SearchView.
- [x] **CHKOUT-NAV-003**: When navigating from Step 2 back to Step 1, the progress indicator shall update to reflect Step 1 as the active step.

## Confirmation View

- [x] **CHKOUT-CONF-001**: After the user submits payment, the system shall display a confirmation view with a gate access code rendered in large monospace type.
- [x] **CHKOUT-CONF-002**: The confirmation view shall display a numbered move-in checklist with four steps: (1) head to facility, (2) enter gate code, (3) bring lock, (4) start moving.
- [x] **CHKOUT-CONF-003**: The confirmation view shall display an app install CTA after the move-in checklist.
- [x] **CHKOUT-CONF-004**: The system shall not display an app install prompt at any point during the checkout steps (Steps 1 or 2).
