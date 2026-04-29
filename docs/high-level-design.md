# High-Level Design: USA Storage Centers — Mobile-First Rental Flow

## Problem

USC's current site is a client-rendered SPA that fails tenants at three critical moments:

1. **Load** — 30+ JS bundles before interior pages render. On cellular, tenants see a blank screen mid-journey and abandon. Google's mobile-first indexer sees the same blank page, suppressing organic rank monthly.
2. **Capture** — No email or phone is collected before checkout begins. Every abandoned cart is permanently unrecoverable. Aggregators (SpareFoot, StorageCafe) have mobile-optimized flows; USC does not.
3. **Taxonomy** — Unit cards display dimensions (10×20); the filter UI uses labels (sm/md/lg/xlg). There is no bridge. A tenant who knows they need a 10×20 cannot filter to it. A tenant who searches "large" cannot know what square footage that means.

These defects suppress organic ranking, make abandoned carts unrecoverable, and create decision friction at the moment of highest tenant intent.

*Source: Desktop & Mobile SWOT Analysis, April 2026, prepared for Highline Storage Partners.*

## Approach

Rebuild the public-facing rental flow as a mobile-first React prototype with three anchoring improvements:

### 1. Payment-first checkout with lead capture at step 1
Collect email + phone before the payment form. Card before account creation. Removes the two primary mobile abandonment triggers and enables Monument's abandoned-cart SMS sequences.

### 2. Unified human-readable size taxonomy
One system throughout: human-readable labels ("Small", "Medium", "Large", "XL") paired with dimensions and an analogy ("about the size of a walk-in closet"). Filter chips and unit cards speak the same language.

### 3. Mobile-optimized browsing
- Filter chips above the unit list, not buried below
- Swipeable Good/Better/Best unit cards with analogy copy replacing raw dimensions
- Storage type context carried through from homepage into the search and facility views
- App install prompt post-rental (at peak intent), not mid-checkout

## Target Users

**Storage tenants** — high-urgency, mobile-first. The archetypal session: "I'm moving this weekend and need a unit today." Zero patience for slow loads or confusing flows. The back button is one tap away and aggregators are one result above.

Secondary: **facility managers** reviewing the public-facing representation of their location.

## Goals

- Checkout step order corrected: lead capture → payment → account creation
- Email + phone collected at step 1, enabling abandoned-cart recovery
- Single size taxonomy used consistently across filter UI and unit cards
- Filter chips rendered above the unit list on both mobile and desktop
- Good/Better/Best tier display present on mobile (not dimension-only)
- Post-rental confirmation delivers: access code, move-in checklist, app install prompt
- Protection plan labeled as required inline at checkout
- Mobile layout passes visual review at 375px, 390px, and 428px viewport widths

## Non-Goals

- Backend / SiteLink integration (prototype only — all data is static)
- SSR / Nuxt migration (noted as a launch prerequisite in the research; out of scope for this prototype)
- Native app development
- Multi-facility CMS or templated page generation
- Payment processing (checkout form is UI-only)

## System Design

Single-page React app (Vite + React 18) with explicit view-state navigation. No router — view transitions are state-driven with `window.scrollTo` on change.

```
┌─────────────────────────────────────────┐
│  App (view state machine)               │
│                                         │
│  PromoBar  ──────────────────────────── │
│  Nav (sticky, links home / rent now)    │
│                                         │
│  ┌──────────┐  ┌──────────────────────┐ │
│  │ HomeView │  │ SearchView           │ │
│  │          │  │  FilterBar (above)   │ │
│  │ HeroForm │  │  FacilitySidebar     │ │
│  │ HowItWrks│  │  UnitGroups          │ │
│  │ SizeGuide│  │    Good/Better/Best  │ │
│  │ Features │  └──────────────────────┘ │
│  └──────────┘                           │
│  ┌────────────────┐  ┌───────────────┐  │
│  │ FacilityView   │  │ CheckoutView  │  │
│  │ Stats bar      │  │ Step 1: Lead  │  │
│  │ Unit grid      │  │ Step 2: Pay   │  │
│  └────────────────┘  │ Order summary │  │
│                      └───────────────┘  │
│  ┌─────────────────────────────────────┐ │
│  │ ConfirmView                         │ │
│  │ Access code · Checklist · App CTA   │ │
│  └─────────────────────────────────────┘ │
│  Footer                                 │
└─────────────────────────────────────────┘
```

**Data model:** All facility and unit data is static constants in `src/App.jsx`. No network calls in the prototype.

**Breakpoints:** Single breakpoint at 768px. Below: single-column, filter chips scroll horizontally, unit cards stack. Above: multi-column grid layouts.

## Key Design Decisions

### 1. Payment-first checkout order
**Chosen:** Lead capture (email + phone) → Payment → Done  
**Rejected:** Sign-up → Payment (current state)  
**Rationale:** Account creation before card entry is the single biggest abandonment trigger identified in the research. Payment-first is the industry standard for high-urgency purchases. Lead capture at step 1 is the prerequisite for Monument's abandoned-cart SMS sequences (HSP modeled 60–67% conversion lift).

### 2. Single size taxonomy: labels + dimensions + analogy
**Chosen:** "Medium (10×10) — about the size of a small bedroom"  
**Rejected:** Two parallel systems (filter=labels, cards=dimensions)  
**Rationale:** The current taxonomy mismatch means a tenant searching "large" cannot correlate to a unit card. One system eliminates the translation gap. Analogies ("about the size of a walk-in closet") reduce cognitive load at decision time.

### 3. Filter chips above unit list
**Chosen:** Filter bar rendered above the unit list, sticky on mobile scroll  
**Rejected:** Filter buried below unit list header  
**Rationale:** Mobile eye-tracking convention — users expect filtering controls at the top of a results page, not embedded mid-content. Matches aggregator patterns tenants already know.

### 4. App install prompt placement: post-rental only
**Chosen:** PWA install prompt in ConfirmView after successful rental  
**Rejected:** Mid-checkout prompt  
**Rationale:** Tenant is committed at confirmation. Interrupting checkout with an install prompt raises abandonment risk. Post-rental is peak intent and maximum trust.

## Success Metrics

- Checkout completion rate (lead capture step → confirmation): target improvement vs. current sign-up-first flow
- Abandoned cart recovery rate: enabled when email/phone captured at step 1
- Mobile task completion: tenant can filter, select, and reach checkout in ≤3 taps from SearchView
- Zero taxonomy mismatches: no view shows dimensions-only without a label and analogy

## References

- Desktop & Mobile SWOT Analysis, April 2026 — Highline Storage Partners
- Google Slides: `https://docs.google.com/presentation/d/1useANeBUYwYVKApVFIAaig8E0PohprTReaWD80xoKPI`
- Existing prototype: `src/App.jsx`
