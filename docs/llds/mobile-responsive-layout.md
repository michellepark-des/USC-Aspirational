# Mobile Responsive Layout

## Context and Design Philosophy

The app uses inline React styles (`style={{ ... }}`) for all layout. This is fast to prototype but creates a responsive-design problem: CSS media queries cannot target inline styles. The chosen approach is a hybrid: a `useIsMobile` hook provides a boolean at runtime, and the Fonts component hosts CSS class definitions for cases where class toggling is more ergonomic than prop threading.

Breakpoint: **768px** (single threshold — below is mobile, above is desktop). This matches the existing `.hide-mobile` / `.hide-desktop` class definitions already in `Fonts`.

## Breakpoint Strategy

One hook, one value, passed down only where needed:

```jsx
function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}
```

Called once at `App` level; `isMobile` passed as a prop to views that need it. Views that only use CSS classes (filter chips, footer) do not receive the prop.

## Grid Collapse Map

Every multi-column grid that needs to collapse at 768px:

| View | Desktop columns | Mobile columns | Method |
|---|---|---|---|
| HomeView hero | `1fr 1fr` | `1fr` | `isMobile` prop |
| HomeView steps | `repeat(3, 1fr)` | `1fr` | `isMobile` prop |
| HomeView storage types | `repeat(3, 1fr)` | `1fr` | `isMobile` prop |
| HomeView size guide | `1fr 1fr` + `1fr 1fr` inner | `1fr` outer, `1fr 1fr` inner | `isMobile` prop |
| HomeView features | `repeat(3, 1fr)` | `1fr` | `isMobile` prop |
| SearchView layout | `196px 1fr` | `1fr` (sidebar stacks above list) | `isMobile` prop |
| SearchView unit cards | `repeat(3, 1fr)` | `1fr` | `isMobile` prop |
| FacilityView stats bar | `repeat(4, 1fr)` | `repeat(2, 1fr)` | `isMobile` prop |
| FacilityView unit cards | `repeat(3, 1fr)` | `1fr` | `isMobile` prop |
| CheckoutView layout | `1fr 320px` | `1fr` (order summary below form) | `isMobile` prop |
| Footer columns | `repeat(4, 1fr)` | `repeat(2, 1fr)` | `isMobile` prop |

## Filter Chips — Wrapping on Mobile

On mobile, filter chips wrap within their container — no horizontal scroll. The existing `flexWrap: "wrap"` style is preserved on both mobile and desktop. No additional CSS class needed for the chip rows.

## HomeView Hero — Mobile Stack

On mobile, the hero grid collapses to a single column with the search card below the headline text:

```
┌────────────────────────┐
│  57 locations          │
│  Rent Online.          │
│  Move In Today!        │
│                        │
│  No contract · Mo-to-mo│
└────────────────────────┘
┌────────────────────────┐
│  Find a storage unit   │
│  [City, ZIP, address ] │
│  [Size ▼] [Type ▼]     │
│  [Phone              ] │
│  [ Find your unit    ] │
└────────────────────────┘
```

## SearchView — Mobile Layout

On mobile the `196px 1fr` sidebar+content grid collapses to a single column. The facility selector becomes a **sticky chip row** that pins to the top of the scroll area (below the global nav, below the filter bar). Facility chips scroll the same way size/type chips do — wrapping within the container.

The sticky chip row uses `position: sticky; top: {filterBarBottom}px` so it remains in view while the user scrolls the unit list.

```
┌────────────────────────┐  ← sticky nav (68px)
│ PromoBar + Nav         │
└────────────────────────┘
┌────────────────────────┐  ← filter bar (non-sticky, scrolls away)
│ Size: [All][Sm][Md]    │
│       [Lg][XL]         │  ← wraps
│ Type: [All][CC][DU]    │
│       [Boat+RV]        │  ← wraps
└────────────────────────┘
┌────────────────────────┐  ← sticky facility chip row (top: 68px)
│ [Buckhead ✓][Midtown]  │
│ [East ATL]             │  ← wraps
└────────────────────────┘
┌────────────────────────┐
│ Available units        │
│ Small 5×10             │
│ [Good ] [Better] [Best]│  ← single column stacked
└────────────────────────┘
```

The "View details" button (currently below the facility list in the sidebar) moves inline below the facility chip row on mobile.

## CheckoutView — Mobile Stack

On mobile, the order summary card moves below the form fields (rendered after in DOM order):

```
┌────────────────────────┐
│ Step 1 — Contact info  │
│ [Email               ] │
│ [Phone               ] │
└────────────────────────┘
  ──── THEN ────
┌────────────────────────┐
│ Step 2 — Payment info  │
│ [Card number         ] │
│ [MM/YY] [CVV]          │
│ [Name on card        ] │
└────────────────────────┘
┌────────────────────────┐
│ Your unit              │
│ Medium Climate-Ctrl    │
│ Monthly rent   $119.00 │
│ Admin fee       $25.00 │
│ Protection       $12.00│
│ First month    $156.00 │
│ [Pay $156 — Secure  ]  │
└────────────────────────┘
```

## Decisions & Alternatives

| Decision | Chosen | Alternatives Considered | Rationale |
|---|---|---|---|
| Breakpoint mechanism | `useIsMobile` hook at App level + CSS classes for chip rows / footer | CSS-only with class toggling throughout | Inline-style codebase can't use media queries on most elements; a single hook is the minimal addition. Pure CSS would require converting most layout to class-based. |
| Single vs. multiple breakpoints | Single threshold at 768px | 375px / 768px / 1024px (3-tier) | Prototype scope. Single threshold matches existing `.hide-mobile` convention. |
| Hook location | Called in `App`, `isMobile` passed as prop | Called in each view | Single source of state; avoids multiple event listeners. |
| Filter chip wrap | `flexWrap: "wrap"` on both breakpoints — no scroll | Horizontal scroll with hidden scrollbar | Wrapping is simpler and avoids scroll discoverability problem; confirmed by user. |
| Facility selector on mobile | Sticky chip row below filter bar | Stack full sidebar above unit list, drawer/modal | Sticky chip row keeps facility selection always accessible while scrolling units; consistent chip pattern with size/type filters. |
| Footer responsive mechanism | `isMobile` prop passed to `Footer` | CSS class in `Fonts` component | Consistent with every other view; avoids a separate CSS class for a single layout switch. |
| Facility chip row sticky offset | `top: 68px` (Nav height only) | `top: {navHeight + promoBarHeight}` | PromoBar is not sticky and scrolls away before Nav pins; sticky offset is always relative to pinned Nav at `top: 0`. |

## Open Questions & Future Decisions

### Resolved
1. ✅ Single breakpoint at 768px — matches existing convention in this codebase.
2. ✅ 196px sidebar width is sufficient at 768px — confirmed.
3. ✅ Filter chips wrap within container, no horizontal scroll — confirmed.
4. ✅ Facility selector on mobile: sticky chip row pinned below nav, not a collapsing sidebar.
5. ✅ Minimum supported viewport: 360px.

### Deferred
1. Touch swipe for Good/Better/Best cards on mobile — noted in research as an opportunity but adds JS gesture handling; deferred to a follow-on pass.
2. SSR / hydration mismatch risk for `useIsMobile` — `window` is not available on the server. Not relevant for Vite+client SPA; flag if SSR is added later.

## References

- `src/App.jsx` — current layout implementation
- `docs/high-level-design.md § Mobile-optimized browsing`
- Research: WEBSITE · MOBILE · USER EXPERIENCE SWOT — "Filter above fold as horizontal chip row"
