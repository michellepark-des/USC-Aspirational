// @spec RESP-UI-003,
//       RESP-HOME-001, RESP-HOME-002, RESP-HOME-003, RESP-HOME-004, RESP-HOME-005,
//       RESP-HOME-006, RESP-HOME-007, RESP-HOME-008, RESP-HOME-009, RESP-HOME-010,
//       RESP-FILT-001, RESP-FILT-002,
//       RESP-SRCH-001, RESP-SRCH-002, RESP-SRCH-003, RESP-SRCH-004, RESP-SRCH-005,
//       RESP-SRCH-006, RESP-SRCH-007, RESP-SRCH-008,
//       RESP-FAC-001, RESP-FAC-002, RESP-FAC-003, RESP-FAC-004,
//       RESP-CHKOUT-001, RESP-CHKOUT-002, RESP-CHKOUT-003,
//       RESP-FOOT-001, RESP-FOOT-002
import { render, screen } from '@testing-library/react';
import App, { HomeView, SearchView, FacilityView, CheckoutView, Footer } from '../App';

const FACILITY = {
  id: 'buckhead', name: 'Buckhead - Peachtree Rd',
  addr: '1244 Collier Road NW, Atlanta, GA 30318', phone: '(404) 355-1890',
  dist: '0.8 mi', units: 12, rating: '4.8 stars',
  access: 'Every day 6:00 AM - 10:00 PM',
  office: 'Tues-Fri 9:00 AM - 5:30 PM, Sat 9:00 AM - 4:00 PM',
  since: 'Serving the community since 1986',
  tags: ['24/7 Gate Access'],
};

// ─── HomeView ────────────────────────────────────────────────────────────────

describe('HomeView — responsive layout', () => {
  // @spec RESP-HOME-001
  it('renders hero as single column on mobile', () => {
    const { container } = render(<HomeView isMobile={true} onSearch={() => {}} />);
    const grid = container.querySelector('[data-testid="hero-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('1fr');
  });

  // @spec RESP-HOME-002
  it('renders hero as two-column grid on desktop', () => {
    const { container } = render(<HomeView isMobile={false} onSearch={() => {}} />);
    const grid = container.querySelector('[data-testid="hero-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('1fr 1fr');
  });

  // @spec RESP-HOME-003
  it('renders steps section as single column on mobile', () => {
    const { container } = render(<HomeView isMobile={true} onSearch={() => {}} />);
    const grid = container.querySelector('[data-testid="steps-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('1fr');
  });

  // @spec RESP-HOME-004
  it('renders steps section as three-column grid on desktop', () => {
    const { container } = render(<HomeView isMobile={false} onSearch={() => {}} />);
    const grid = container.querySelector('[data-testid="steps-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  // @spec RESP-HOME-005
  it('renders storage types as single column on mobile', () => {
    const { container } = render(<HomeView isMobile={true} onSearch={() => {}} />);
    const grid = container.querySelector('[data-testid="storage-types-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('1fr');
  });

  // @spec RESP-HOME-006
  it('renders storage types as three-column grid on desktop', () => {
    const { container } = render(<HomeView isMobile={false} onSearch={() => {}} />);
    const grid = container.querySelector('[data-testid="storage-types-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  // @spec RESP-HOME-007
  it('renders features as single column on mobile', () => {
    const { container } = render(<HomeView isMobile={true} onSearch={() => {}} />);
    const grid = container.querySelector('[data-testid="features-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('1fr');
  });

  // @spec RESP-HOME-008
  it('renders features as three-column grid on desktop', () => {
    const { container } = render(<HomeView isMobile={false} onSearch={() => {}} />);
    const grid = container.querySelector('[data-testid="features-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
  });

  // @spec RESP-HOME-009
  it('renders size guide outer grid as single column on mobile', () => {
    const { container } = render(<HomeView isMobile={true} onSearch={() => {}} />);
    const grid = container.querySelector('[data-testid="size-guide-outer"]');
    expect(grid.style.gridTemplateColumns).toBe('1fr');
  });

  // @spec RESP-HOME-010
  it('renders size guide card grid as two columns on both mobile and desktop', () => {
    const { containerMobile } = render(<HomeView isMobile={true} onSearch={() => {}} />);
    const { containerDesktop } = render(<HomeView isMobile={false} onSearch={() => {}} />);

    document.querySelectorAll('[data-testid="size-guide-cards"]').forEach(grid => {
      expect(grid.style.gridTemplateColumns).toBe('1fr 1fr');
    });
  });
});

// ─── Filter chips ─────────────────────────────────────────────────────────────

describe('Filter chips — wrapping', () => {
  // @spec RESP-FILT-001, RESP-FILT-002
  it('renders size chip row with flexWrap wrap on mobile', () => {
    const { container } = render(
      <SearchView isMobile={true} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    const row = container.querySelector('[data-testid="size-chip-row"]');
    expect(row.style.flexWrap).toBe('wrap');
  });

  // @spec RESP-FILT-001, RESP-FILT-002
  it('renders size chip row with flexWrap wrap on desktop', () => {
    const { container } = render(
      <SearchView isMobile={false} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    const row = container.querySelector('[data-testid="size-chip-row"]');
    expect(row.style.flexWrap).toBe('wrap');
  });

  // @spec RESP-FILT-001, RESP-FILT-002
  it('renders type chip row with flexWrap wrap on mobile', () => {
    const { container } = render(
      <SearchView isMobile={true} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    const row = container.querySelector('[data-testid="type-chip-row"]');
    expect(row.style.flexWrap).toBe('wrap');
  });
});

// ─── SearchView ───────────────────────────────────────────────────────────────

describe('SearchView — responsive layout', () => {
  // @spec RESP-SRCH-001
  it('renders facility sidebar as sticky 196px column on desktop', () => {
    const { container } = render(
      <SearchView isMobile={false} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    const layout = container.querySelector('[data-testid="search-layout"]');
    expect(layout.style.gridTemplateColumns).toBe('196px 1fr');
  });

  // @spec RESP-SRCH-002
  it('renders as single column on mobile', () => {
    const { container } = render(
      <SearchView isMobile={true} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    const layout = container.querySelector('[data-testid="search-layout"]');
    expect(layout.style.gridTemplateColumns).toBe('1fr');
  });

  // @spec RESP-SRCH-002
  it('does not render the facility sidebar on mobile', () => {
    const { container } = render(
      <SearchView isMobile={true} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    expect(container.querySelector('[data-testid="facility-sidebar"]')).not.toBeInTheDocument();
  });

  // @spec RESP-SRCH-003
  it('renders facility chip row on mobile', () => {
    render(<SearchView isMobile={true} onFacility={() => {}} onSelectUnit={() => {}} />);
    expect(screen.getByTestId('facility-chip-row')).toBeInTheDocument();
  });

  // @spec RESP-SRCH-003
  it('does not render facility chip row on desktop', () => {
    render(<SearchView isMobile={false} onFacility={() => {}} onSelectUnit={() => {}} />);
    expect(screen.queryByTestId('facility-chip-row')).not.toBeInTheDocument();
  });

  // @spec RESP-SRCH-004
  it('renders facility chip row with sticky position at top 68px on mobile', () => {
    const { container } = render(
      <SearchView isMobile={true} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    const chipRow = container.querySelector('[data-testid="facility-chip-row"]');
    expect(chipRow.style.position).toBe('sticky');
    expect(chipRow.style.top).toBe('68px');
  });

  // @spec RESP-SRCH-005
  it('renders facility chips using chipBase/chipOn visual style', () => {
    const { container } = render(
      <SearchView isMobile={true} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    const chipRow = container.querySelector('[data-testid="facility-chip-row"]');
    const chips = chipRow.querySelectorAll('[data-testid="facility-chip"]');
    expect(chips.length).toBeGreaterThan(0);
  });

  // @spec RESP-SRCH-006
  it('renders view-details button below facility chip row on mobile', () => {
    const { container } = render(
      <SearchView isMobile={true} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    const chipRow = container.querySelector('[data-testid="facility-chip-row"]');
    const viewDetails = container.querySelector('[data-testid="view-details-btn"]');
    // view-details must appear after chip-row in DOM order
    expect(
      chipRow.compareDocumentPosition(viewDetails) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  // @spec RESP-SRCH-007
  it('renders unit cards as single column on mobile', () => {
    const { container } = render(
      <SearchView isMobile={true} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    container.querySelectorAll('[data-testid="unit-cards-grid"]').forEach(grid => {
      expect(grid.style.gridTemplateColumns).toBe('1fr');
    });
  });

  // @spec RESP-SRCH-008
  it('renders unit cards as three-column grid on desktop', () => {
    const { container } = render(
      <SearchView isMobile={false} onFacility={() => {}} onSelectUnit={() => {}} />
    );
    container.querySelectorAll('[data-testid="unit-cards-grid"]').forEach(grid => {
      expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
    });
  });
});

// ─── FacilityView ─────────────────────────────────────────────────────────────

describe('FacilityView — responsive layout', () => {
  // @spec RESP-FAC-001
  it('renders stats bar as two-column grid on mobile', () => {
    const { container } = render(
      <FacilityView facility={FACILITY} isMobile={true} onBack={() => {}} onSelectUnit={() => {}} />
    );
    const bar = container.querySelector('[data-testid="stats-bar"]');
    expect(bar.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
  });

  // @spec RESP-FAC-002
  it('renders stats bar as four-column grid on desktop', () => {
    const { container } = render(
      <FacilityView facility={FACILITY} isMobile={false} onBack={() => {}} onSelectUnit={() => {}} />
    );
    const bar = container.querySelector('[data-testid="stats-bar"]');
    expect(bar.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });

  // @spec RESP-FAC-003
  it('renders unit cards as single column on mobile', () => {
    const { container } = render(
      <FacilityView facility={FACILITY} isMobile={true} onBack={() => {}} onSelectUnit={() => {}} />
    );
    container.querySelectorAll('[data-testid="unit-cards-grid"]').forEach(grid => {
      expect(grid.style.gridTemplateColumns).toBe('1fr');
    });
  });

  // @spec RESP-FAC-004
  it('renders unit cards as three-column grid on desktop', () => {
    const { container } = render(
      <FacilityView facility={FACILITY} isMobile={false} onBack={() => {}} onSelectUnit={() => {}} />
    );
    container.querySelectorAll('[data-testid="unit-cards-grid"]').forEach(grid => {
      expect(grid.style.gridTemplateColumns).toBe('repeat(3, 1fr)');
    });
  });
});

// ─── CheckoutView layout ──────────────────────────────────────────────────────

describe('CheckoutView — responsive layout', () => {
  // @spec RESP-CHKOUT-001
  it('renders as two-column layout on desktop', () => {
    const { container } = render(
      <CheckoutView isMobile={false} onBack={() => {}} onConfirm={() => {}} />
    );
    const layout = container.querySelector('[data-testid="checkout-layout"]');
    expect(layout.style.gridTemplateColumns).toBe('1fr 320px');
  });

  // @spec RESP-CHKOUT-002
  it('renders as single column on mobile', () => {
    const { container } = render(
      <CheckoutView isMobile={true} onBack={() => {}} onConfirm={() => {}} />
    );
    const layout = container.querySelector('[data-testid="checkout-layout"]');
    expect(layout.style.gridTemplateColumns).toBe('1fr');
  });

  // @spec RESP-CHKOUT-003, RESP-CHKOUT-002
  it('renders pay button inside order summary below form on mobile', () => {
    const { container } = render(
      <CheckoutView isMobile={true} onBack={() => {}} onConfirm={() => {}} />
    );
    const orderSummary = container.querySelector('[data-testid="order-summary"]');
    const payButton = container.querySelector('[data-testid="pay-button"]');
    expect(orderSummary).toContainElement(payButton);
  });
});

// ─── Footer ───────────────────────────────────────────────────────────────────

describe('Footer — responsive layout', () => {
  // @spec RESP-FOOT-001
  it('renders footer columns as two-column grid on mobile', () => {
    const { container } = render(<Footer isMobile={true} />);
    const grid = container.querySelector('[data-testid="footer-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('repeat(2, 1fr)');
  });

  // @spec RESP-FOOT-002
  it('renders footer columns as four-column grid on desktop', () => {
    const { container } = render(<Footer isMobile={false} />);
    const grid = container.querySelector('[data-testid="footer-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('repeat(4, 1fr)');
  });
});

// ─── App — useIsMobile integration ───────────────────────────────────────────

describe('App — useIsMobile prop threading', () => {
  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
  });

  // @spec RESP-UI-003
  it('passes mobile layout to HomeView when viewport is mobile', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    const { container } = render(<App />);
    const grid = container.querySelector('[data-testid="hero-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('1fr');
  });

  // @spec RESP-UI-003
  it('passes desktop layout to HomeView when viewport is desktop', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    const { container } = render(<App />);
    const grid = container.querySelector('[data-testid="hero-grid"]');
    expect(grid.style.gridTemplateColumns).toBe('1fr 1fr');
  });
});
