# Mobile Responsive Layout Specs

Specs for responsive layout behavior across all views. Breakpoint: 768px. Minimum supported viewport: 360px.

## Hook & Breakpoint

- [x] **RESP-UI-001**: The system shall expose a `useIsMobile` hook that returns `true` when `window.innerWidth` is less than 768 and `false` otherwise.
- [x] **RESP-UI-002**: When the viewport width crosses the 768px threshold (in either direction), the system shall update the `isMobile` value and re-render affected views.
- [x] **RESP-UI-003**: The system shall call `useIsMobile` once at the `App` component level and pass `isMobile` as a prop to views that require layout switching.

## HomeView — Responsive Layout

- [x] **RESP-HOME-001**: While `isMobile` is true, the HomeView hero section shall render as a single-column layout with the search card below the headline text.
- [x] **RESP-HOME-002**: While `isMobile` is false, the HomeView hero section shall render as a two-column grid (`1fr 1fr`).
- [x] **RESP-HOME-003**: While `isMobile` is true, the "How it works" steps section shall render as a single-column stack.
- [x] **RESP-HOME-004**: While `isMobile` is false, the "How it works" steps section shall render as a three-column grid.
- [x] **RESP-HOME-005**: While `isMobile` is true, the "Our Storage Types" section shall render as a single-column stack.
- [x] **RESP-HOME-006**: While `isMobile` is false, the "Our Storage Types" section shall render as a three-column grid.
- [x] **RESP-HOME-007**: While `isMobile` is true, the "Self Storage Features" section shall render as a single-column stack.
- [x] **RESP-HOME-008**: While `isMobile` is false, the "Self Storage Features" section shall render as a three-column grid.
- [x] **RESP-HOME-009**: While `isMobile` is true, the size guide section shall render with the explanatory text and size card grid stacked vertically (outer single column).
- [x] **RESP-HOME-010**: The size guide card grid shall render as two columns (`1fr 1fr`) on both mobile and desktop.

## Filter Chips — Both Breakpoints

- [x] **RESP-FILT-001**: The system shall render size and type filter chip rows with `flexWrap: wrap` on both mobile and desktop viewports.
- [x] **RESP-FILT-002**: Filter chips shall wrap to additional lines within their container when the viewport is too narrow to display all chips in a single row.

## SearchView — Responsive Layout

- [x] **RESP-SRCH-001**: While `isMobile` is false, the SearchView shall render as a two-column grid with a 196px sticky facility sidebar and a flexible unit list column.
- [x] **RESP-SRCH-002**: While `isMobile` is true, the SearchView shall render as a single column; the facility sidebar layout shall not be used.
- [x] **RESP-SRCH-003**: While `isMobile` is true, the system shall render the facility selector as a horizontal chip row above the unit list.
- [x] **RESP-SRCH-004**: While `isMobile` is true, the facility chip row shall be sticky at `top: 68px` (below the global nav) so it remains visible while the user scrolls the unit list.
- [x] **RESP-SRCH-005**: The facility chip row shall use the same chip visual style (`chipBase` / `chipOn`) as the size and type filter chips.
- [x] **RESP-SRCH-006**: While `isMobile` is true, the "View details" button shall render below the facility chip row.
- [x] **RESP-SRCH-007**: While `isMobile` is true, unit cards within each size group shall render as a single-column stack.
- [x] **RESP-SRCH-008**: While `isMobile` is false, unit cards within each size group shall render as a three-column grid.

## FacilityView — Responsive Layout

- [x] **RESP-FAC-001**: While `isMobile` is true, the FacilityView stats bar shall render as a two-column grid (`repeat(2, 1fr)`).
- [x] **RESP-FAC-002**: While `isMobile` is false, the FacilityView stats bar shall render as a four-column grid (`repeat(4, 1fr)`).
- [x] **RESP-FAC-003**: While `isMobile` is true, unit cards within each size group in FacilityView shall render as a single-column stack.
- [x] **RESP-FAC-004**: While `isMobile` is false, unit cards within each size group in FacilityView shall render as a three-column grid.

## CheckoutView — Responsive Layout

- [x] **RESP-CHKOUT-001**: While `isMobile` is false, the CheckoutView shall render as a two-column layout with the form on the left and the order summary sticky on the right.
- [x] **RESP-CHKOUT-002**: While `isMobile` is true, the CheckoutView shall render as a single column with the order summary below the form fields.
- [x] **RESP-CHKOUT-003**: While `isMobile` is true, the pay button shall be rendered inside the order summary block, below the protection plan Required badge.

## Footer — Responsive Layout

- [x] **RESP-FOOT-001**: While `isMobile` is true, the footer link columns shall render as a two-column grid (`repeat(2, 1fr)`).
- [x] **RESP-FOOT-002**: While `isMobile` is false, the footer link columns shall render as a four-column grid (`repeat(4, 1fr)`).
