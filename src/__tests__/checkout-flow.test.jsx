// @spec CHKOUT-UI-001, CHKOUT-UI-002, CHKOUT-UI-003, CHKOUT-UI-004, CHKOUT-UI-005,
//       CHKOUT-UI-006, CHKOUT-LEAD-001, CHKOUT-LEAD-002, CHKOUT-LEAD-003,
//       CHKOUT-PAY-001, CHKOUT-PAY-002, CHKOUT-ORD-001, CHKOUT-ORD-002,
//       CHKOUT-ORD-003, CHKOUT-ORD-004, CHKOUT-ORD-005,
//       CHKOUT-NAV-000, CHKOUT-NAV-001, CHKOUT-NAV-002, CHKOUT-NAV-003,
//       CHKOUT-CONF-001, CHKOUT-CONF-002, CHKOUT-CONF-003, CHKOUT-CONF-004
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CheckoutView, ConfirmView } from '../App';

// ─── Step order & initial state ───────────────────────────────────────────────

describe('CheckoutView — step order and initial state', () => {
  // @spec CHKOUT-NAV-000
  it('opens on Step 1 (Contact) by default', () => {
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);
    expect(screen.getByTestId('checkout-step-1')).toBeInTheDocument();
    expect(screen.queryByTestId('checkout-step-2')).not.toBeInTheDocument();
  });

  // @spec CHKOUT-UI-001
  it('presents checkout in Contact → Payment → Confirmation order', async () => {
    const user = userEvent.setup();
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);

    // Step 1 visible first
    expect(screen.getByTestId('checkout-step-1')).toBeInTheDocument();

    // Advance to step 2
    await user.click(screen.getByTestId('checkout-continue-btn'));
    expect(screen.getByTestId('checkout-step-2')).toBeInTheDocument();
    expect(screen.queryByTestId('checkout-step-1')).not.toBeInTheDocument();
  });

  // @spec CHKOUT-UI-006
  it('advances to Step 2 when the Continue control is activated on Step 1', async () => {
    const user = userEvent.setup();
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);
    await user.click(screen.getByTestId('checkout-continue-btn'));
    expect(screen.getByTestId('checkout-step-2')).toBeInTheDocument();
  });
});

// ─── Progress indicator ───────────────────────────────────────────────────────

describe('CheckoutView — progress indicator', () => {
  // @spec CHKOUT-UI-002
  it('displays three segments labeled Contact, Payment, Done', () => {
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);
    const bar = screen.getByTestId('progress-bar');
    expect(within(bar).getByText('Contact')).toBeInTheDocument();
    expect(within(bar).getByText('Payment')).toBeInTheDocument();
    expect(within(bar).getByText('Done')).toBeInTheDocument();
  });

  // @spec CHKOUT-UI-003
  it('highlights Contact segment on Step 1', () => {
    const { container } = render(
      <CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />
    );
    const contactBar = container.querySelector('[data-testid="progress-seg-contact"]');
    expect(contactBar).toHaveStyle({ background: '#fbbf24' });
  });

  // @spec CHKOUT-UI-004
  it('highlights Payment segment on Step 2', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />
    );
    await user.click(screen.getByTestId('checkout-continue-btn'));
    const paymentBar = container.querySelector('[data-testid="progress-seg-payment"]');
    expect(paymentBar).toHaveStyle({ background: '#fbbf24' });
  });

  // @spec CHKOUT-UI-003, CHKOUT-UI-004
  it('dims non-active progress segments', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />
    );
    // On step 1: Payment and Done should be dimmed (not gold)
    const payBar = container.querySelector('[data-testid="progress-seg-payment"]');
    expect(payBar).not.toHaveStyle({ background: '#fbbf24' });

    await user.click(screen.getByTestId('checkout-continue-btn'));
    // On step 2: Contact should be dimmed
    const contactBar = container.querySelector('[data-testid="progress-seg-contact"]');
    expect(contactBar).not.toHaveStyle({ background: '#fbbf24' });
  });
});

// ─── Lead capture (Step 1) ────────────────────────────────────────────────────

describe('CheckoutView — Step 1 lead capture', () => {
  // @spec CHKOUT-LEAD-001
  it('shows email and phone fields on Step 1 before payment fields', () => {
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);
    const step1 = screen.getByTestId('checkout-step-1');
    expect(within(step1).getByLabelText(/email/i)).toBeInTheDocument();
    expect(within(step1).getByLabelText(/phone/i)).toBeInTheDocument();
  });

  // @spec CHKOUT-LEAD-002
  it('shows correct Step 1 header copy', () => {
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);
    expect(screen.getByText(/Step 1 - Contact info/i)).toBeInTheDocument();
    expect(screen.getByText(/No credit card yet/i)).toBeInTheDocument();
  });

  // @spec CHKOUT-LEAD-003
  it('does not display any password or account creation fields at any step', async () => {
    const user = userEvent.setup();
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);

    // Step 1
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/create account/i)).not.toBeInTheDocument();

    // Step 2
    await user.click(screen.getByTestId('checkout-continue-btn'));
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/create account/i)).not.toBeInTheDocument();
  });
});

// ─── Payment (Step 2) ─────────────────────────────────────────────────────────

describe('CheckoutView — Step 2 payment', () => {
  async function goToStep2() {
    const user = userEvent.setup();
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);
    await user.click(screen.getByTestId('checkout-continue-btn'));
    return user;
  }

  // @spec CHKOUT-PAY-001
  it('shows card number, expiry, CVV, and name fields on Step 2', async () => {
    await goToStep2();
    const step2 = screen.getByTestId('checkout-step-2');
    expect(within(step2).getByLabelText(/card number/i)).toBeInTheDocument();
    expect(within(step2).getByLabelText(/expiry/i)).toBeInTheDocument();
    expect(within(step2).getByLabelText(/cvv/i)).toBeInTheDocument();
    expect(within(step2).getByLabelText(/name on card/i)).toBeInTheDocument();
  });

  // @spec CHKOUT-PAY-002
  it('shows correct Step 2 header copy', async () => {
    await goToStep2();
    expect(screen.getByText(/Step 2 - Payment info/i)).toBeInTheDocument();
    expect(screen.getByText(/charged only after you review/i)).toBeInTheDocument();
  });
});

// ─── Order summary ────────────────────────────────────────────────────────────

describe('CheckoutView — order summary', () => {
  // @spec CHKOUT-ORD-001
  it('displays unit name, location, monthly rent, admin fee, protection plan, and total', () => {
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);
    const summary = screen.getByTestId('order-summary');
    expect(within(summary).getByText(/monthly rent/i)).toBeInTheDocument();
    expect(within(summary).getByText(/admin fee/i)).toBeInTheDocument();
    expect(within(summary).getByText(/protection plan/i)).toBeInTheDocument();
    expect(within(summary).getByText(/first month total/i)).toBeInTheDocument();
  });

  // @spec CHKOUT-ORD-001
  it('labels admin fee as one-time', () => {
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);
    expect(screen.getByText(/admin fee.*one-time/i)).toBeInTheDocument();
  });

  // @spec CHKOUT-ORD-002
  it('displays a Required badge inline on the protection plan line item', () => {
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);
    const badge = screen.getByTestId('required-badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent(/required/i);
  });

  // @spec CHKOUT-ORD-003
  it('renders order summary as sticky sidebar on desktop', () => {
    const { container } = render(
      <CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />
    );
    const summary = container.querySelector('[data-testid="order-summary-wrapper"]');
    expect(summary.style.position).toBe('sticky');
  });

  // @spec CHKOUT-ORD-004
  it('renders order summary below form fields on mobile', () => {
    const { container } = render(
      <CheckoutView isMobile={true} onBack={() => {}} onConfirm={() => {}} />
    );
    const form = container.querySelector('[data-testid="checkout-form"]');
    const summary = container.querySelector('[data-testid="order-summary-wrapper"]');
    // Summary must appear after form in DOM order
    expect(
      form.compareDocumentPosition(summary) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  // @spec CHKOUT-ORD-005
  it('renders Required badge above pay button in DOM order on mobile', () => {
    const { container } = render(
      <CheckoutView isMobile={true} onBack={() => {}} onConfirm={() => {}} />
    );
    const badge = container.querySelector('[data-testid="required-badge"]');
    const payBtn = container.querySelector('[data-testid="pay-button"]');
    // Badge must precede pay button in DOM order
    expect(
      badge.compareDocumentPosition(payBtn) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});

// ─── Back navigation ──────────────────────────────────────────────────────────

describe('CheckoutView — back navigation', () => {
  // @spec CHKOUT-NAV-001
  it('navigates from Step 2 to Step 1 on back without calling onBack', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(<CheckoutView isMobile={false} onBack={onBack} onConfirm={() => {}} />);

    await user.click(screen.getByTestId('checkout-continue-btn'));
    expect(screen.getByTestId('checkout-step-2')).toBeInTheDocument();

    await user.click(screen.getByTestId('checkout-back-btn'));
    expect(screen.getByTestId('checkout-step-1')).toBeInTheDocument();
    expect(onBack).not.toHaveBeenCalled();
  });

  // @spec CHKOUT-NAV-001
  it('preserves form field values when navigating back from Step 2 to Step 1', async () => {
    const user = userEvent.setup();
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);

    // Type email on step 1
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.click(screen.getByTestId('checkout-continue-btn'));

    // Go back to step 1
    await user.click(screen.getByTestId('checkout-back-btn'));
    expect(screen.getByLabelText(/email/i)).toHaveValue('test@example.com');
  });

  // @spec CHKOUT-NAV-002
  it('calls onBack when back is activated on Step 1', async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();
    render(<CheckoutView isMobile={false} onBack={onBack} onConfirm={() => {}} />);

    await user.click(screen.getByTestId('checkout-back-btn'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  // @spec CHKOUT-NAV-003
  it('updates progress indicator to Step 1 when navigating back from Step 2', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />
    );

    await user.click(screen.getByTestId('checkout-continue-btn'));
    await user.click(screen.getByTestId('checkout-back-btn'));

    const contactBar = container.querySelector('[data-testid="progress-seg-contact"]');
    expect(contactBar).toHaveStyle({ background: '#fbbf24' });
  });
});

// ─── Confirmation view ────────────────────────────────────────────────────────

describe('ConfirmView', () => {
  // @spec CHKOUT-CONF-001
  it('displays a gate access code', () => {
    render(<ConfirmView onHome={() => {}} />);
    expect(screen.getByTestId('access-code')).toBeInTheDocument();
  });

  // @spec CHKOUT-CONF-002
  it('displays a numbered move-in checklist with four steps', () => {
    render(<ConfirmView onHome={() => {}} />);
    const checklist = screen.getByTestId('movein-checklist');
    const steps = within(checklist).getAllByRole('listitem');
    expect(steps).toHaveLength(4);
  });

  // @spec CHKOUT-CONF-003
  it('displays an app install CTA after the move-in checklist', () => {
    const { container } = render(<ConfirmView onHome={() => {}} />);
    const checklist = container.querySelector('[data-testid="movein-checklist"]');
    const appCta = container.querySelector('[data-testid="app-install-cta"]');
    expect(appCta).toBeInTheDocument();
    expect(
      checklist.compareDocumentPosition(appCta) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  // @spec CHKOUT-CONF-004
  it('does not render app install CTA inside CheckoutView at any step', async () => {
    const user = userEvent.setup();
    render(<CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />);

    // Step 1
    expect(screen.queryByTestId('app-install-cta')).not.toBeInTheDocument();

    // Step 2
    await user.click(screen.getByTestId('checkout-continue-btn'));
    expect(screen.queryByTestId('app-install-cta')).not.toBeInTheDocument();
  });
});
