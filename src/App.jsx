// @spec RESP-UI-003
import { useState } from "react";
import { useIsMobile } from "./hooks/useIsMobile";

const B = {
  navy: "#032046", navy2: "#021432", red: "#C8102E", red2: "#a00d23",
  bg: "#F7F9FC", surface: "#FFFFFF", border: "#E1E6EF", border2: "#CBD3DF",
  text: "#1a2535", text2: "#4a5568", text3: "#718096",
  green: "#1A8F60", greenBg: "#E6F4EF",
};

const FACILITIES = [
  {
    id: "buckhead", name: "Buckhead - Peachtree Rd",
    addr: "1244 Collier Road NW, Atlanta, GA 30318", phone: "(404) 355-1890",
    dist: "0.8 mi", units: 12, rating: "4.8 stars",
    access: "Every day 6:00 AM - 10:00 PM",
    office: "Tues-Fri 9:00 AM - 5:30 PM, Sat 9:00 AM - 4:00 PM",
    since: "Serving the community since 1986",
    tags: ["24/7 Gate Access", "Climate-Controlled", "Drive-Up Available", "Ground Floor Units"],
  },
  {
    id: "midtown", name: "Midtown - Spring St",
    addr: "750 Spring St NW, Atlanta, GA 30308", phone: "(404) 555-0210",
    dist: "2.1 mi", units: 8, rating: "4.7 stars",
    access: "Every day 6:00 AM - 10:00 PM",
    office: "Mon-Fri 9:00 AM - 6:00 PM, Sat 9:00 AM - 4:00 PM",
    since: "Serving Midtown Atlanta",
    tags: ["24/7 Gate Access", "Climate-Controlled", "Indoor Access"],
  },
  {
    id: "eastatlanta", name: "East Atlanta - Glenwood",
    addr: "2050 Glenwood Ave SE, Atlanta, GA 30316", phone: "(404) 555-0334",
    dist: "3.4 mi", units: 5, rating: "4.6 stars",
    access: "Every day 6:00 AM - 10:00 PM",
    office: "Mon-Sat 9:00 AM - 5:00 PM",
    since: "Serving East Atlanta Village",
    tags: ["24/7 Gate Access", "Drive-Up Available", "Ground Floor Units"],
  },
];

const UNIT_GROUPS = [
  {
    id: "5x10", size: "Small", dim: "5x10", sqft: 50,
    analogy: "Similar in size to a walk-in closet. Fits a studio or 1-bedroom apartment.",
    units: [
      { tier: "Good", tierColor: "#8499AF", price: 59, label: "Standard", detail: "Back of facility, upper floor, drive-up access", features: ["Drive-up", "Upper floor", "Lock included"], promo: true },
      { tier: "Better", tierColor: "#5B789E", price: 74, was: 89, label: "Convenient", detail: "Mid-facility, ground floor, interior hallway access", features: ["Interior access", "Ground floor", "Lock included"] },
      { tier: "Best", tierColor: "#5A9176", price: 89, label: "Premium", detail: "Near entrance, ground floor, wide drive-up aisle", features: ["Near entrance", "Drive-up", "Ground floor", "Lock included"], popular: true },
    ],
  },
  {
    id: "10x10", size: "Medium", dim: "10x10", sqft: 100,
    analogy: "Similar in size to a small bedroom. Fits a 2-bedroom house or typical garage.",
    units: [
      { tier: "Good", tierColor: "#8499AF", price: 89, label: "Standard", detail: "Back of facility, upper floor, interior access", features: ["Interior access", "Upper floor", "Lock included"] },
      { tier: "Better", tierColor: "#5B789E", price: 109, was: 129, label: "Climate-Controlled", detail: "Climate-controlled, ground floor, interior hallway", features: ["Climate-controlled", "Ground floor", "Interior access", "Lock included"], popular: true, promo: true },
      { tier: "Best", tierColor: "#5A9176", price: 129, label: "Climate-Controlled Premium", detail: "Climate-controlled, near elevator, ground floor, wide aisle", features: ["Climate-controlled", "Near elevator", "Ground floor", "Wide aisle", "Lock included"] },
    ],
  },
  {
    id: "10x20", size: "Large", dim: "10x20", sqft: 200,
    analogy: "Similar in size to a one-car garage. Fits a 3-4 bedroom house, plus garage.",
    units: [
      { tier: "Good", tierColor: "#8499AF", price: 129, label: "Standard Drive-Up", detail: "Back of facility, ground level, drive-up access", features: ["Drive-up", "Ground floor", "Lock included"] },
      { tier: "Better", tierColor: "#5B789E", price: 159, was: 179, label: "Climate-Controlled", detail: "Climate-controlled, ground floor, interior access", features: ["Climate-controlled", "Ground floor", "Interior access", "Lock included"], popular: true },
      { tier: "Best", tierColor: "#5A9176", price: 189, label: "Climate-Controlled Premium", detail: "Climate-controlled, nearest to loading dock, oversized door", features: ["Climate-controlled", "Near loading dock", "Oversized door", "Ground floor", "Lock included"], promo: true },
    ],
  },
  {
    id: "10x30", size: "XL", dim: "10x30", sqft: 300,
    analogy: "Similar in size to a 1.5-car garage. Ideal for vehicles, large moves, business storage.",
    units: [
      { tier: "Good", tierColor: "#8499AF", price: 179, label: "Standard Drive-Up", detail: "Ground level, drive-up access, back of facility", features: ["Drive-up", "Ground floor", "Lock included"] },
      { tier: "Better", tierColor: "#5B789E", price: 209, label: "Wide Drive-Up", detail: "Wider aisle, mid-facility, ground level drive-up", features: ["Drive-up", "Wide aisle", "Ground floor", "Lock included"], popular: true },
      { tier: "Best", tierColor: "#5A9176", price: 239, label: "Premium Drive-Up", detail: "Nearest to facility entrance, extra-wide aisle, ground floor", features: ["Near entrance", "Extra-wide aisle", "Drive-up", "Ground floor", "Lock included"] },
    ],
  },
];

const STEPS = [
  { n: "1", title: "Choose a location and select a unit", body: "Find the facility nearest to you and pick the perfect size to fit your needs." },
  { n: "2", title: "Complete the easy online rental", body: "Rent your unit in just a few minutes right on your phone." },
  { n: "3", title: "Download the app and move in", body: "Verify your identity, get your personal access code, and move in right away." },
];

const STORAGE_TYPES = [
  { label: "Drive-Up Storage", body: "Pull your vehicle right up to the unit door to load or unload hassle-free. Great for frequent access and large items." },
  { label: "Climate-Controlled Storage", body: "Regulated temperatures year-round for items susceptible to heat, cold, or humidity. Brightly lit, single-floor indoor access." },
  { label: "Boat and RV Storage", body: "Find peace of mind and convenience when you rent vehicle storage with USA Storage Centers." },
];

const FEATURES = [
  { title: "24/7 Video Surveillance", sub: "State-of-the-art cameras at every facility" },
  { title: "Controlled Gate Access", sub: "Keypad entry for convenient, secure access" },
  { title: "Well-Lit Premises", sub: "Visible, safe facilities - not dark basements" },
  { title: "Online Payments", sub: "Rent or pay right from your smartphone" },
  { title: "Competitive Prices", sub: "Fair monthly rates so you save for what matters" },
  { title: "Contact-Free Rentals", sub: "Rent safely and securely online, start to finish" },
];

const STATES = ["Alabama", "Florida", "Georgia", "Louisiana", "Mississippi", "North Carolina", "South Carolina", "Tennessee", "Texas", "Virginia"];

const SIZE_GUIDE = [
  { size: "Small", dims: "5x5 to 5x10", use: "Similar in size to a walk-in closet" },
  { size: "Medium", dims: "10x10 to 10x15", use: "Similar in size to a small bedroom or condo" },
  { size: "Large", dims: "10x20 to 10x25", use: "Similar in size to a one-car garage" },
  { size: "XL", dims: "10x30+", use: "Similar in size to a 1.5-car garage" },
];

const btn = { background: B.navy, color: "#fff", border: "none", borderRadius: 4, padding: "12px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" };
const btnSec = { background: "transparent", color: B.navy, border: "1.5px solid " + B.navy, borderRadius: 4, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" };
const inp = { width: "100%", border: "1.5px solid " + B.border2, borderRadius: 4, padding: "10px 13px", fontSize: 15, fontFamily: "inherit", color: B.text, background: "#fff", outline: "none", boxSizing: "border-box" };
const lbl = { fontSize: 11, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: B.text3, display: "block", marginBottom: 6 };
const card = { background: B.surface, border: "1.5px solid " + B.border, borderRadius: 8, overflow: "hidden" };
const chipBase = { borderRadius: 20, padding: "7px 15px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", border: "1.5px solid " + B.border2, background: B.surface, color: B.text2 };
const chipOn = { borderRadius: 20, padding: "7px 15px", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", cursor: "pointer", border: "1.5px solid " + B.navy, background: B.navy, color: "#fff" };
const ctr = { maxWidth: 1120, margin: "0 auto", padding: "0 24px" };
const ctrNarrow = { maxWidth: 760, margin: "0 auto", padding: "0 24px" };

const tierBg = { Good: "#F3F5F7", Better: "#EEF3F8", Best: "#EDF4F1" };

const Fonts = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { margin: 0; }
    @media (max-width: 768px) { .hide-mobile { display: none !important; } }
    @media (min-width: 769px) { .hide-desktop { display: none !important; } }
  `}</style>
);

const Logo = ({ onClick }) => (
  <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 10 }}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="4" width="36" height="34" rx="1" stroke={B.navy} strokeWidth="1.5" fill="none"/>
      <rect x="5" y="7" width="30" height="28" fill={B.navy}/>
      <rect x="5" y="7" width="30" height="5" fill={B.red}/>
      <line x1="5" y1="17" x2="35" y2="17" stroke="white" strokeWidth="1.5"/>
      <line x1="5" y1="22" x2="35" y2="22" stroke="white" strokeWidth="1.5"/>
      <line x1="5" y1="27" x2="35" y2="27" stroke="white" strokeWidth="1.5"/>
      <rect x="14" y="29" width="12" height="6" fill={B.red}/>
    </svg>
    <div style={{ lineHeight: 1.15 }}>
      <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 14, fontWeight: 700, color: B.navy }}>
        USA<span style={{ color: B.red }}>STORAGE</span>
      </div>
      <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 10, fontWeight: 400, color: B.navy, letterSpacing: "2.5px" }}>CENTERS</div>
    </div>
  </button>
);

const Nav = ({ onHome, onSearch }) => (
  <nav style={{ background: "#fff", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid " + B.border, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
    <div style={{ ...ctr, display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
      <Logo onClick={onHome} />
      <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 4 }}>
        {["Find Storage", "Climate Control", "Boat and RV", "Pay Bill"].map(l => (
          <button key={l} style={{ background: "none", border: "none", color: B.navy, fontSize: 14, fontWeight: 600, cursor: "pointer", padding: "8px 12px", fontFamily: "inherit" }}>{l}</button>
        ))}
      </div>
      <button onClick={onSearch} style={{ ...btn, padding: "9px 20px", fontSize: 14 }}>Rent Now</button>
    </div>
  </nav>
);

const PromoBar = () => (
  <div style={{ background: "#0a3460", color: "#fff", textAlign: "center", padding: "9px 16px", fontSize: 13, fontWeight: 500 }}>
    First Month Free on select units. Contact us to learn more.
  </div>
);

// @spec RESP-HOME-001, RESP-HOME-002, RESP-HOME-003, RESP-HOME-004,
//       RESP-HOME-005, RESP-HOME-006, RESP-HOME-007, RESP-HOME-008,
//       RESP-HOME-009, RESP-HOME-010
export const HomeView = ({ isMobile, onSearch }) => {
  const [loc, setLoc] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ background: B.navy, position: "relative" }}>
        <div
          data-testid="hero-grid"
          style={{ ...ctr, paddingTop: 60, paddingBottom: 80, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 48, alignItems: "center" }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#fbbf24", marginBottom: 14 }}>57 locations across the Southeast</div>
            <h1 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 12 }}>
              Rent Online. Move In Today!
            </h1>
            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Make room for what matters with USA Storage Centers.</p>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.6, marginBottom: 28 }}>Local storage across the Southeast. 57 facilities. Month-to-month rentals. Move in today.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              {["No long-term contract", "Month-to-month rentals", "Lock included"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.75)", fontSize: 13 }}>
                  <span style={{ color: B.green, fontWeight: 700 }}>+</span> {t}
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 8, padding: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: B.navy, marginBottom: 20 }}>Find a storage unit</div>
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>City, ZIP, or address</label>
              <input style={inp} type="text" placeholder="e.g. Atlanta, GA or 30318" value={loc} onChange={e => setLoc(e.target.value)} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={lbl}>Size</label>
                <select style={{ ...inp }} value={size} onChange={e => setSize(e.target.value)}>
                  <option value="">Any size</option>
                  <option>Small - 5x5 to 5x10</option>
                  <option>Medium - 10x10 to 10x15</option>
                  <option>Large - 10x20 to 10x25</option>
                  <option>XL - 10x30+</option>
                </select>
              </div>
              <div>
                <label style={lbl}>Type</label>
                <select style={{ ...inp }} value={type} onChange={e => setType(e.target.value)}>
                  <option value="">Any type</option>
                  <option>Climate-controlled</option>
                  <option>Drive-up</option>
                  <option>Boat and RV</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={lbl}>Your phone <span style={{ color: B.text3, fontWeight: 400, letterSpacing: 0, textTransform: "none" }}>(for unit availability alerts)</span></label>
              <input style={inp} type="tel" placeholder="(555) 000-0000" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <button onClick={onSearch} style={{ ...btn, width: "100%", padding: 14, fontSize: 16 }}>Find your unit</button>
            <p style={{ textAlign: "center", fontSize: 12, color: B.text3, marginTop: 12 }}>No credit card required to browse</p>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: B.bg }} />
      </div>

      <div style={{ background: B.surface, borderBottom: "1px solid " + B.border }}>
        <div style={{ ...ctr, padding: "48px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: B.text3, marginBottom: 8 }}>How it works</div>
            <h2 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(20px,3vw,30px)", fontWeight: 400, color: B.text }}>Make your self storage journey easy.</h2>
          </div>
          <div
            data-testid="steps-grid"
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 32 }}
          >
            {STEPS.map(step => (
              <div key={step.n} style={{ textAlign: "center" }}>
                <div style={{ width: 52, height: 52, background: B.navy, color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, margin: "0 auto 16px" }}>{step.n}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: B.navy, marginBottom: 8 }}>{step.title}</div>
                <div style={{ fontSize: 14, color: B.text2, lineHeight: 1.6 }}>{step.body}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={onSearch} style={{ ...btn, padding: "12px 32px" }}>Find your unit</button>
          </div>
        </div>
      </div>

      <div style={{ ...ctr, padding: "48px 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(20px,3vw,30px)", fontWeight: 400, color: B.text }}>Our Storage Types</h2>
        </div>
        <div
          data-testid="storage-types-grid"
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 24 }}
        >
          {STORAGE_TYPES.map(t => (
            <div key={t.label} style={{ ...card, padding: 24 }}>
              <div style={{ width: 48, height: 48, background: B.bg, border: "1.5px solid " + B.border, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontSize: 11, fontWeight: 700, color: B.navy, letterSpacing: 1 }}>SVG</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: B.navy, marginBottom: 10 }}>{t.label}</div>
              <div style={{ fontSize: 14, color: B.text2, lineHeight: 1.65, marginBottom: 14 }}>{t.body}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: B.red, cursor: "pointer" }}>Learn more &gt;</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: B.surface, borderTop: "1px solid " + B.border, borderBottom: "1px solid " + B.border }}>
        <div style={{ ...ctr, padding: "48px 24px" }}>
          <div
            data-testid="size-guide-outer"
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 48, alignItems: "center" }}
          >
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: B.text3, marginBottom: 8 }}>Not sure how much space you need?</div>
              <h2 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 400, marginBottom: 16, color: B.text }}>Use our size guide to find the right unit.</h2>
              <ul style={{ paddingLeft: 18, color: B.text2, fontSize: 14, lineHeight: 2.1 }}>
                <li>Well-lit, highly secure facilities with gated entry at all locations</li>
                <li>Indoor climate-controlled and outdoor drive-up units</li>
                <li>RV, boat, and vehicle parking at many locations</li>
                <li>Lock included, month-to-month rentals, ground floor options</li>
              </ul>
              <button onClick={onSearch} style={{ ...btnSec, marginTop: 20 }}>View size guide</button>
            </div>
            <div data-testid="size-guide-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {SIZE_GUIDE.map(item => (
                <button key={item.size} onClick={onSearch} style={{ background: B.bg, border: "1.5px solid " + B.border, padding: 16, textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: B.navy, marginBottom: 2 }}>{item.size}</div>
                  <div style={{ fontSize: 11, color: B.text3, fontFamily: "monospace", fontWeight: 600, marginBottom: 6 }}>{item.dims}</div>
                  <div style={{ fontSize: 12, color: B.text2, lineHeight: 1.4 }}>{item.use}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: B.navy, padding: "48px 0" }}>
        <div style={{ ...ctr, padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Open Sans', sans-serif", color: "#fff", fontWeight: 400, fontSize: "clamp(20px,3vw,28px)" }}>Self Storage Features</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: 8 }}>We want to provide you with the best self storage experience possible.</p>
          </div>
          <div
            data-testid="features-grid"
            style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 20 }}
          >
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.07)", padding: "20px 22px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{f.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: B.surface, borderTop: "1px solid " + B.border }}>
        <div style={{ ...ctr, padding: "40px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h2 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: 22, fontWeight: 400, color: B.text }}>Take a Look at Our Facilities</h2>
            <p style={{ color: B.text3, fontSize: 14, marginTop: 6 }}>We are proud to serve communities in a wide range of states.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
            {STATES.map(state => (
              <button key={state} onClick={onSearch} style={{ background: B.bg, border: "1px solid " + B.border, padding: "8px 18px", fontSize: 14, fontWeight: 600, color: B.navy, cursor: "pointer", fontFamily: "inherit" }}>{state}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// @spec RESP-FILT-001, RESP-FILT-002,
//       RESP-SRCH-001, RESP-SRCH-002, RESP-SRCH-003, RESP-SRCH-004,
//       RESP-SRCH-005, RESP-SRCH-006, RESP-SRCH-007, RESP-SRCH-008
export const SearchView = ({ isMobile, onFacility, onSelectUnit }) => {
  const [activeSize, setActiveSize] = useState("All");
  const [activeType, setActiveType] = useState("All types");
  const [activeFacId, setActiveFacId] = useState("buckhead");
  const typeChips = ["All types", "Climate-controlled", "Drive-up", "Boat and RV"];
  const activeFac = FACILITIES.find(f => f.id === activeFacId);

  const TYPE_FEATURE = { "Climate-controlled": "Climate-controlled", "Drive-up": "Drive-up", "Boat and RV": "Boat" };

  const visibleGroups = UNIT_GROUPS
    .map(g => ({
      ...g,
      units: activeType === "All types"
        ? g.units
        : g.units.filter(u => u.features.some(f => f.toLowerCase().includes(TYPE_FEATURE[activeType]?.toLowerCase() ?? ""))),
    }))
    .filter(g => (activeSize === "All" || g.size === activeSize) && g.units.length > 0);

  return (
    <div style={{ ...ctr, padding: "32px 24px", fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(20px,3vw,28px)", fontWeight: 400, color: B.text, marginBottom: 4 }}>Units near Atlanta, GA</h2>
        <p style={{ color: B.text3, fontSize: 14 }}>{UNIT_GROUPS.reduce((a, g) => a + g.units.length, 0)} units available - Showing closest facilities first</p>
      </div>

      {/* Filter bar — size and type chips, always above unit list */}
      <div style={{ background: B.surface, border: "1px solid " + B.border, padding: "10px 16px", marginBottom: 20 }}>
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: B.text3, marginBottom: 7 }}>Size</div>
          <div data-testid="size-chip-row" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["All", "Small", "Medium", "Large", "XL"].map(c => (
              <button key={c} onClick={() => setActiveSize(c)} style={activeSize === c ? { ...chipOn, padding: "4px 11px", fontSize: 12 } : { ...chipBase, padding: "4px 11px", fontSize: 12 }}>
                {c === "All" ? "All sizes" : c + " (" + (UNIT_GROUPS.find(g => g.size === c) || {}).dim + ")"}
              </button>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid " + B.border, paddingTop: 10 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: B.text3, marginBottom: 7 }}>Type</div>
          <div data-testid="type-chip-row" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {typeChips.map(c => (
              <button key={c} onClick={() => setActiveType(c)} style={activeType === c ? { ...chipOn, padding: "4px 11px", fontSize: 12 } : { ...chipBase, padding: "4px 11px", fontSize: 12 }}>{c}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: sticky facility chip row */}
      {isMobile && (
        <div
          data-testid="facility-chip-row"
          style={{ position: "sticky", top: "68px", zIndex: 90, background: B.bg, borderBottom: "1px solid " + B.border, padding: "10px 0", marginBottom: 16 }}
        >
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
            {FACILITIES.map(f => (
              <button
                key={f.id}
                data-testid="facility-chip"
                onClick={() => setActiveFacId(f.id)}
                style={activeFacId === f.id ? { ...chipOn, padding: "4px 11px", fontSize: 12 } : { ...chipBase, padding: "4px 11px", fontSize: 12 }}
              >
                {f.name} · {f.dist}
              </button>
            ))}
          </div>
          <button
            data-testid="view-details-btn"
            onClick={() => onFacility(activeFac)}
            style={{ ...btnSec, fontSize: 12, padding: "6px 14px" }}
          >
            View details
          </button>
        </div>
      )}

      {/* Layout grid: sidebar (desktop) + unit list */}
      <div
        data-testid="search-layout"
        style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "196px 1fr", gap: 20, alignItems: "start" }}
      >
        {/* Desktop: facility sidebar */}
        {!isMobile && (
          <div data-testid="facility-sidebar" style={{ position: "sticky", top: 80 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: B.text3, marginBottom: 10 }}>Nearby facilities</div>
            {FACILITIES.map(f => {
              const active = f.id === activeFacId;
              return (
                <button key={f.id} onClick={() => setActiveFacId(f.id)} style={{ ...card, display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", marginBottom: 8, cursor: "pointer", width: "100%", textAlign: "left", border: active ? "2px solid " + B.navy : "1.5px solid " + B.border, background: active ? "#F0F4FF" : B.surface }}>
                  <div style={{ width: 28, height: 28, background: active ? B.navy : B.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, color: active ? "#fff" : B.text3, fontWeight: 700 }}>+</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: B.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{f.name}</div>
                    <div style={{ fontSize: 11, color: B.text3, marginTop: 1 }}>{f.dist} - {f.units} units</div>
                  </div>
                  {active && <div style={{ fontSize: 10, fontWeight: 700, color: B.navy, background: "#dce8ff", padding: "2px 6px", borderRadius: 3, flexShrink: 0 }}>On</div>}
                </button>
              );
            })}
            <button
              data-testid="view-details-btn"
              onClick={() => onFacility(activeFac)}
              style={{ ...btnSec, width: "100%", marginTop: 4, fontSize: 12, padding: "8px 0" }}
            >
              View details
            </button>
          </div>
        )}

        {/* Unit list */}
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: B.text3, marginBottom: 16 }}>
            Available units - {activeFac.name}
          </div>
          {visibleGroups.length === 0 && (
            <div style={{ padding: "48px 0", textAlign: "center", color: B.text3 }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No units match your filters</div>
              <div style={{ fontSize: 13 }}>Try clearing the type filter to see all available units.</div>
            </div>
          )}
          {visibleGroups.map(group => (
            <div key={group.id} style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12, borderBottom: "2px solid " + B.navy, paddingBottom: 10 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: B.navy }}>{group.size}</div>
                <div style={{ fontSize: 13, color: B.text3, fontFamily: "monospace", fontWeight: 600 }}>{group.dim} - {group.sqft} sq ft</div>
                <div style={{ fontSize: 13, color: B.text2, flex: 1 }}>{group.analogy}</div>
              </div>
              <div
                data-testid="unit-cards-grid"
                style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 14 }}
              >
                {group.units.map(unit => (
                  <div key={unit.tier} style={{ ...card, border: unit.popular ? "2px solid " + B.navy : "1.5px solid " + B.border, display: "flex", flexDirection: "column" }}>
                    {unit.promo && (
                      <div style={{ background: "#fde68a", padding: "5px 14px", fontSize: 11, fontWeight: 700, color: B.navy, letterSpacing: "0.3px" }}>
                        🎉 First Month Free
                      </div>
                    )}
                    <div style={{ padding: "10px 14px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", color: B.text3 }}>{unit.tier}</span>
                      {unit.popular && <span style={{ fontSize: 10, fontWeight: 700, background: "#FEE2E2", color: "#991B1B", padding: "2px 7px", borderRadius: 3 }}>Popular</span>}
                    </div>
                    <div style={{ padding: "6px 14px 14px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: B.navy, marginBottom: 10 }}>{unit.label}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 14 }}>
                        {unit.features.map(f => (
                          <span key={f} style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20, background: B.bg, color: B.text2, border: "1px solid " + B.border }}>{f}</span>
                        ))}
                      </div>
                      <div style={{ marginTop: "auto" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 3, marginBottom: 4 }}>
                          <span style={{ fontSize: 24, fontWeight: 700, color: B.navy }}>${unit.price}</span>
                          <span style={{ fontSize: 13, color: B.text3 }}>/mo</span>
                          {unit.was && <span style={{ fontSize: 12, color: B.text3, textDecoration: "line-through", marginLeft: 4 }}>${unit.was}</span>}
                        </div>
                        <button onClick={() => onSelectUnit({ ...unit, size: group.size, dim: group.dim, facilityName: activeFac.name })} style={{ ...(unit.popular ? btn : btnSec), width: "100%", padding: "9px 0", fontSize: 13 }}>Reserve</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// @spec RESP-FAC-001, RESP-FAC-002, RESP-FAC-003, RESP-FAC-004
export const FacilityView = ({ facility, isMobile, onBack, onSelectUnit }) => {
  const f = facility || FACILITIES[0];
  const [activeSize, setActiveSize] = useState("All");
  const [activeType, setActiveType] = useState("All types");
  const typeChips = ["All types", "Climate-controlled", "Drive-up", "Boat and RV"];
  const TYPE_FEATURE = { "Climate-controlled": "Climate-controlled", "Drive-up": "Drive-up", "Boat and RV": "Boat" };

  const visibleGroups = UNIT_GROUPS
    .map(g => ({
      ...g,
      units: activeType === "All types"
        ? g.units
        : g.units.filter(u => u.features.some(feat => feat.toLowerCase().includes(TYPE_FEATURE[activeType]?.toLowerCase() ?? ""))),
    }))
    .filter(g => (activeSize === "All" || g.size === activeSize) && g.units.length > 0);

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ background: B.navy, padding: "40px 0 32px" }}>
        <div style={ctr}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 16, fontFamily: "inherit" }}>
            &lt; Back to results
          </button>
          <h1 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(22px,4vw,36px)", fontWeight: 700, color: "#fff", marginBottom: 6 }}>{f.name}</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>{f.addr}</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 20 }}>{f.since} - {f.phone}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {f.tags.map(tag => (
              <span key={tag} style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 3 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: B.surface, borderBottom: "1px solid " + B.border }}>
        <div
          data-testid="stats-bar"
          style={{ ...ctr, display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", textAlign: "center" }}
        >
          {[
            { val: f.rating, key: "Google reviews" },
            { val: f.dist, key: "from you" },
            { val: "6am - 10pm", key: "access, every day" },
            { val: f.units + " units", key: "available" },
          ].map(item => (
            <div key={item.key} style={{ padding: "20px 0", borderRight: "1px solid " + B.border }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: B.navy }}>{item.val}</div>
              <div style={{ fontSize: 12, color: B.text3, marginTop: 2 }}>{item.key}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ ...ctr, padding: "32px 24px" }}>
        <div style={{ background: B.greenBg, border: "1px solid " + B.green, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
          <span style={{ fontSize: 18, color: B.green, fontWeight: 700 }}>+</span>
          <div>
            <div style={{ fontWeight: 700, color: B.green, fontSize: 14 }}>Office hours: {f.office}</div>
            <div style={{ fontSize: 13, color: B.text3 }}>{f.phone} - Self-service kiosk available outside office hours</div>
          </div>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: B.text, marginBottom: 16 }}>Available at this location</h3>

        {/* Filter bar */}
        <div style={{ background: B.surface, border: "1px solid " + B.border, padding: "10px 16px", marginBottom: 24 }}>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: B.text3, marginBottom: 7 }}>Size</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["All", "Small", "Medium", "Large", "XL"].map(c => (
                <button key={c} onClick={() => setActiveSize(c)} style={activeSize === c ? { ...chipOn, padding: "4px 11px", fontSize: 12 } : { ...chipBase, padding: "4px 11px", fontSize: 12 }}>
                  {c === "All" ? "All sizes" : c + " (" + (UNIT_GROUPS.find(g => g.size === c) || {}).dim + ")"}
                </button>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid " + B.border, paddingTop: 10 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.6px", textTransform: "uppercase", color: B.text3, marginBottom: 7 }}>Type</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {typeChips.map(c => (
                <button key={c} onClick={() => setActiveType(c)} style={activeType === c ? { ...chipOn, padding: "4px 11px", fontSize: 12 } : { ...chipBase, padding: "4px 11px", fontSize: 12 }}>{c}</button>
              ))}
            </div>
          </div>
        </div>

        {visibleGroups.length === 0 && (
          <div style={{ padding: "48px 0", textAlign: "center", color: B.text3 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No units match your filters</div>
            <div style={{ fontSize: 13 }}>Try clearing the filters to see all available units.</div>
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {visibleGroups.map(group => (
            <div key={group.id}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12, borderBottom: "2px solid " + B.navy, paddingBottom: 8 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: B.navy }}>{group.size}</div>
                <div style={{ fontSize: 12, color: B.text3, fontFamily: "monospace", fontWeight: 600 }}>{group.dim} - {group.sqft} sq ft</div>
              </div>
              <div
                data-testid="unit-cards-grid"
                style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12 }}
              >
                {group.units.map(unit => (
                  <div key={unit.tier} style={{ ...card, border: unit.popular ? "2px solid " + B.navy : "1.5px solid " + B.border }}>
                    {unit.promo && (
                      <div style={{ background: "#fde68a", padding: "5px 14px", fontSize: 11, fontWeight: 700, color: B.navy, letterSpacing: "0.3px" }}>
                        🎉 First Month Free
                      </div>
                    )}
                    <div style={{ padding: "10px 14px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.7px", color: B.text3 }}>{unit.tier}</span>
                      {unit.popular && <span style={{ fontSize: 10, fontWeight: 700, background: "#FEE2E2", color: "#991B1B", padding: "2px 7px", borderRadius: 3 }}>Popular</span>}
                    </div>
                    <div style={{ padding: "6px 14px 14px" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: B.navy, marginBottom: 10 }}>{unit.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 700, color: B.navy, marginBottom: 8 }}>${unit.price}<span style={{ fontSize: 12, fontWeight: 400, color: B.text3 }}>/mo</span></div>
                      <button onClick={() => onSelectUnit({ ...unit, size: group.size, dim: group.dim, facilityName: f.name })} style={{ ...(unit.popular ? btn : btnSec), width: "100%", padding: "8px 0", fontSize: 13 }}>Reserve</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CheckoutView = ({ isMobile, onBack, onConfirm, unit }) => {
  const [form, setForm] = useState({ email: "", fullName: "", card: "", expiry: "", cvv: "", nameOnCard: "", protection: "basic" });
  const [acceptedUpgrade, setAcceptedUpgrade] = useState(false);
  const [upsellDismissed, setUpsellDismissed] = useState(false);
  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }));

  const PROTECTION_PLANS = [
    { id: "basic", label: "Basic Coverage", price: 12, desc: "Up to $2,000 contents value" },
    { id: "premium", label: "Premium Coverage", price: 20, desc: "Up to $5,000 contents value" },
  ];
  const selectedPlan = PROTECTION_PLANS.find(p => p.id === form.protection) || PROTECTION_PLANS[0];

  // Upgrade logic — find next tier in the same size group
  const tierOrder = ["Good", "Better", "Best"];
  const currentTierIdx = unit ? tierOrder.indexOf(unit.tier) : -1;
  const currentGroup = unit ? UNIT_GROUPS.find(g => g.size === unit.size) : null;
  const upgradeUnit = (currentGroup && currentTierIdx >= 0 && currentTierIdx < tierOrder.length - 1)
    ? currentGroup.units[currentTierIdx + 1]
    : null;
  const priceDiff = upgradeUnit ? upgradeUnit.price - (unit?.price ?? 0) : 0;
  const activeUnit = acceptedUpgrade && upgradeUnit
    ? { ...upgradeUnit, size: unit.size, dim: unit.dim, facilityName: unit.facilityName }
    : unit;

  const monthlyRent = activeUnit?.price ?? 119;
  const unitLabel = activeUnit?.label ?? "Medium Climate-Controlled";
  const unitDesc = activeUnit ? `${activeUnit.size} · ${activeUnit.dim}` : "Medium · 10x10";
  const unitFacility = activeUnit?.facilityName ?? "Buckhead, Peachtree Rd";
  const hasPromo = activeUnit?.promo ?? false;
  const adminFee = 25;
  const promoDiscount = hasPromo ? monthlyRent : 0;
  const total = monthlyRent - promoDiscount + adminFee + selectedPlan.price;

  const SectionHeader = ({ title, sub }) => (
    <div style={{ padding: "14px 18px", borderBottom: "1px solid " + B.border }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: B.navy, textTransform: "uppercase", letterSpacing: "0.5px" }}>{title}</div>
      {sub && <div style={{ fontSize: 12, color: B.text3, marginTop: 3 }}>{sub}</div>}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div style={{ background: B.navy, padding: "20px 0 24px" }}>
        <div style={{ ...ctrNarrow, padding: "0 24px" }}>
          <button
            data-testid="checkout-back-btn"
            onClick={onBack}
            style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, marginBottom: 14, fontFamily: "inherit" }}
          >
            &lt; Back to results
          </button>
          <h2 style={{ fontFamily: "'Open Sans', sans-serif", color: "#fff", fontSize: 22 }}>Reserve your unit</h2>
        </div>
      </div>

      <div style={{ ...ctrNarrow, padding: "32px 24px" }}>
        <div
          data-testid="checkout-layout"
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 320px", gap: 28, alignItems: "start" }}
        >
          {/* ── Form column ───────────────────────────────────────── */}
          <div data-testid="checkout-form">

            {/* Upsell card — shown when next tier is available and user hasn't dismissed */}
            {!upsellDismissed && upgradeUnit && !acceptedUpgrade && (
              <div style={{ marginBottom: 16, border: "2px solid " + B.navy, borderRadius: 8, overflow: "hidden" }}>
                <div style={{ background: B.navy, padding: "10px 18px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#fbbf24", fontSize: 15 }}>↑</span>
                  <span style={{ color: "#fff", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>Upgrade available</span>
                  <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.45)", fontSize: 11 }}>Limited availability</span>
                </div>
                <div style={{ background: "#EEF3FF", padding: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 28px 1fr", gap: 10, alignItems: "center", marginBottom: 14 }}>
                    {/* Current unit */}
                    <div style={{ background: "#fff", borderRadius: 6, padding: "12px 14px", border: "1.5px solid " + B.border }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: B.text3, letterSpacing: "0.5px", marginBottom: 6 }}>Your selection</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: B.navy, marginBottom: 2 }}>{unit.label}</div>
                      <div style={{ fontSize: 13, color: B.text3, marginBottom: 8 }}>${unit.price}/mo</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {unit.features.slice(0, 3).map(f => (
                          <div key={f} style={{ fontSize: 11, color: B.text3, display: "flex", alignItems: "center", gap: 5 }}>
                            <span>·</span>{f}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Arrow */}
                    <div style={{ fontSize: 18, color: B.navy, fontWeight: 700, textAlign: "center", opacity: 0.5 }}>
                      {isMobile ? "↓" : "→"}
                    </div>
                    {/* Upgrade unit */}
                    <div style={{ background: "#fff", borderRadius: 6, padding: "12px 14px", border: "2px solid " + B.navy, position: "relative" }}>
                      <div style={{ position: "absolute", top: -1, right: 10, background: "#fbbf24", fontSize: 10, fontWeight: 700, color: B.navy, padding: "2px 8px", borderRadius: "0 0 4px 4px" }}>
                        +${priceDiff}/mo
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", color: upgradeUnit.tierColor, letterSpacing: "0.5px", marginBottom: 6 }}>{upgradeUnit.tier}</div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: B.navy, marginBottom: 2 }}>{upgradeUnit.label}</div>
                      <div style={{ fontSize: 13, color: B.navy, fontWeight: 600, marginBottom: 8 }}>${upgradeUnit.price}/mo</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                        {upgradeUnit.features.slice(0, 4).map(f => (
                          <div key={f} style={{ fontSize: 11, color: B.text2, display: "flex", alignItems: "center", gap: 5 }}>
                            <span style={{ color: B.green, fontWeight: 700 }}>✓</span>{f}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setAcceptedUpgrade(true)}
                    style={{ ...btn, width: "100%", marginBottom: 10 }}
                  >
                    Upgrade to {upgradeUnit.label} — only ${priceDiff} more/mo
                  </button>
                  <div style={{ textAlign: "center" }}>
                    <button
                      onClick={() => setUpsellDismissed(true)}
                      style={{ background: "none", border: "none", color: B.text3, fontSize: 13, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline" }}
                    >
                      No thanks, keep my {unit.label}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Upgrade accepted confirmation */}
            {acceptedUpgrade && upgradeUnit && (
              <div style={{ background: B.greenBg, border: "1.5px solid " + B.green, borderRadius: 8, padding: "12px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: B.green, fontSize: 16, fontWeight: 700 }}>✓</span>
                <div style={{ flex: 1, fontSize: 13 }}>
                  <span style={{ fontWeight: 700, color: B.green }}>Upgraded to {upgradeUnit.label}</span>
                  <span style={{ color: B.text3, marginLeft: 8 }}>+${priceDiff}/mo</span>
                </div>
                <button
                  onClick={() => setAcceptedUpgrade(false)}
                  style={{ background: "none", border: "none", color: B.text3, fontSize: 12, cursor: "pointer", fontFamily: "inherit", textDecoration: "underline", flexShrink: 0 }}
                >
                  Undo
                </button>
              </div>
            )}

            {/* 1 — Contact */}
            <div style={{ ...card, marginBottom: 14 }}>
              <SectionHeader title="Contact" sub="We'll send your confirmation here." />
              <div style={{ padding: 18 }}>
                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="checkout-email" style={lbl}>Email</label>
                  <input id="checkout-email" style={inp} type="email" placeholder="you@email.com" value={form.email} onChange={set("email")} />
                </div>
                <div>
                  <label htmlFor="checkout-fullName" style={lbl}>Full name</label>
                  <input id="checkout-fullName" style={inp} type="text" placeholder="First and last name" value={form.fullName} onChange={set("fullName")} />
                </div>
              </div>
            </div>

            {/* 2 — Protection plan */}
            <div style={{ ...card, marginBottom: 14 }}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid " + B.border, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: B.navy, textTransform: "uppercase", letterSpacing: "0.5px" }}>Protection Plan</div>
                <span
                  data-testid="required-badge"
                  style={{ fontSize: 10, fontWeight: 700, background: "#FEF2F2", color: "#991B1B", border: "1px solid #FCA5A5", borderRadius: 4, padding: "2px 7px" }}
                >
                  Required
                </span>
              </div>
              <div style={{ padding: 18 }}>
                <p style={{ fontSize: 13, color: B.text3, marginBottom: 14, lineHeight: 1.5 }}>All units require contents protection. Choose the coverage level that fits your needs.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {PROTECTION_PLANS.map(plan => {
                    const selected = form.protection === plan.id;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => setForm(p => ({ ...p, protection: plan.id }))}
                        style={{
                          display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                          background: selected ? "#EEF3FF" : B.bg,
                          border: selected ? "2px solid " + B.navy : "1.5px solid " + B.border,
                          borderRadius: 4, cursor: "pointer", textAlign: "left", fontFamily: "inherit", width: "100%",
                        }}
                      >
                        <div style={{ width: 18, height: 18, borderRadius: "50%", flexShrink: 0, border: selected ? "5px solid " + B.navy : "2px solid " + B.border2, background: "#fff" }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: B.navy }}>{plan.label}</div>
                          <div style={{ fontSize: 12, color: B.text3, marginTop: 2 }}>{plan.desc}</div>
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: B.navy, flexShrink: 0 }}>${plan.price}/mo</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 3 — Payment */}
            <div style={{ ...card, marginBottom: 20 }}>
              <SectionHeader title="Payment" sub="Charged only after you confirm your rental." />
              <div style={{ padding: 18 }}>
                <div style={{ marginBottom: 14 }}>
                  <label htmlFor="checkout-card" style={lbl}>Card number</label>
                  <input id="checkout-card" style={inp} type="text" placeholder="1234 5678 9012 3456" value={form.card} onChange={set("card")} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  <div>
                    <label htmlFor="checkout-expiry" style={lbl}>Expiry</label>
                    <input id="checkout-expiry" style={inp} type="text" placeholder="MM / YY" value={form.expiry} onChange={set("expiry")} />
                  </div>
                  <div>
                    <label htmlFor="checkout-cvv" style={lbl}>CVV</label>
                    <input id="checkout-cvv" style={inp} type="text" placeholder="···" value={form.cvv} onChange={set("cvv")} />
                  </div>
                </div>
                <div>
                  <label htmlFor="checkout-nameOnCard" style={lbl}>Name on card</label>
                  <input id="checkout-nameOnCard" style={inp} type="text" placeholder="Full name" value={form.nameOnCard} onChange={set("nameOnCard")} />
                </div>
              </div>
            </div>

            {/* CTA — desktop only (mobile CTA lives in order summary, after the total) */}
            {!isMobile && (
              <>
                <button data-testid="pay-button" onClick={() => onConfirm(activeUnit)} style={{ ...btn, width: "100%", padding: 15, fontSize: 16, marginBottom: 10 }}>
                  Reserve &amp; Pay ${total}.00
                </button>
                <div style={{ textAlign: "center", fontSize: 12, color: B.text3, marginBottom: 5 }}>256-bit SSL · Charged only after you confirm</div>
                <div style={{ textAlign: "center", fontSize: 11, color: B.text3 }}>Account created automatically after payment</div>
              </>
            )}
          </div>

          {/* ── Order summary column ──────────────────────────────── */}
          <div
            data-testid="order-summary-wrapper"
            style={{ position: isMobile ? "static" : "sticky", top: 80 }}
          >
            <div data-testid="order-summary" style={card}>
              <div style={{ padding: "14px 18px", borderBottom: "1px solid " + B.border }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: B.navy, textTransform: "uppercase", letterSpacing: "0.5px" }}>Order summary</div>
              </div>
              <div style={{ padding: "16px 18px" }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: B.navy, marginBottom: 2 }}>{unitLabel}</div>
                <div style={{ fontSize: 13, color: B.text3, marginBottom: 16 }}>{unitDesc} · {unitFacility}</div>
                {hasPromo && (
                  <div style={{ background: "#fde68a", borderRadius: 4, padding: "6px 10px", marginBottom: 14, fontSize: 12, fontWeight: 700, color: B.navy }}>
                    🎉 First Month Free applied
                  </div>
                )}
                <div style={{ borderTop: "1px solid " + B.border, paddingTop: 12 }}>
                  {[
                    { label: "Monthly rent", val: `$${monthlyRent}.00` },
                    ...(hasPromo ? [{ label: "First Month Free", val: `-$${monthlyRent}.00`, promo: true }] : []),
                    { label: "Admin fee (one-time)", val: `$${adminFee}.00` },
                    { label: "Protection plan", val: `$${selectedPlan.price}.00` },
                  ].map(row => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid " + B.border }}>
                      <span style={{ color: row.promo ? B.green : B.text2, fontSize: 14, fontWeight: row.promo ? 600 : 400 }}>{row.label}</span>
                      <span style={{ fontWeight: 600, fontSize: 14, color: row.promo ? B.green : "inherit" }}>{row.val}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 4px", fontWeight: 700, fontSize: 16 }}>
                    <span>First month total</span>
                    <span>${total}.00</span>
                  </div>
                </div>
                {/* Mobile CTA lives here, after the total */}
                {isMobile && (
                  <>
                    <button data-testid="pay-button" onClick={onConfirm} style={{ ...btn, width: "100%", padding: 15, fontSize: 16, marginTop: 14, marginBottom: 10 }}>
                      Reserve &amp; Pay ${total}.00
                    </button>
                    <div style={{ textAlign: "center", fontSize: 12, color: B.text3, marginBottom: 5 }}>256-bit SSL · Charged only after you confirm</div>
                    <div style={{ textAlign: "center", fontSize: 11, color: B.text3 }}>Account created automatically after payment</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// @spec CHKOUT-CONF-001, CHKOUT-CONF-002, CHKOUT-CONF-003, CHKOUT-CONF-004
export const ConfirmView = ({ onHome, unit }) => (
  <div style={{ fontFamily: "'Open Sans', sans-serif" }}>
    <div style={{ background: B.navy, padding: "48px 0", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, background: B.green, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28, color: "#fff", fontWeight: 700 }}>+</div>
      <h1 style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "clamp(26px,4vw,40px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>You're in.</h1>
      <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>{unit?.label ?? "Medium Climate-Controlled"} · {unit?.facilityName ?? "Buckhead"} · Move-in starts today</p>
    </div>
    <div style={{ ...ctrNarrow, padding: "40px 24px" }}>
      <div style={{ ...card, border: "2px solid " + B.navy, marginBottom: 24, padding: 22 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: B.text3, marginBottom: 10 }}>Your gate access code</div>
        {/* @spec CHKOUT-CONF-001 */}
        <div data-testid="access-code" style={{ fontSize: 52, fontWeight: 700, color: B.navy, fontFamily: "monospace", letterSpacing: 10, marginBottom: 8 }}>4872</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: B.text2, marginBottom: 4 }}>Unit B-24 - Ground floor, single-floor indoor access</div>
        <div style={{ fontSize: 13, color: B.text3 }}>Works at the gate immediately. Your confirmation email has this code too.</div>
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: B.text }}>Move-in checklist</h3>
      {/* @spec CHKOUT-CONF-002 */}
      <div data-testid="movein-checklist" role="list" style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {[
          { n: 1, title: "Head to the facility", sub: "1244 Collier Road NW, Atlanta - gate is open 6am-10pm with your code" },
          { n: 2, title: "Enter code 4872 at the keypad", sub: "Your unit is B-24, ground floor, left wing" },
          { n: 3, title: "Bring your own lock", sub: "Or pick one up at the office - open Tues-Fri 9am-5:30pm, Sat 9am-4pm" },
          { n: 4, title: "You're in - start moving", sub: "Need help? Call (404) 355-1890 or chat in the app" },
        ].map(step => (
          <div key={step.n} role="listitem" style={{ ...card, display: "flex", alignItems: "flex-start", gap: 16, padding: "16px 20px" }}>
            <div style={{ width: 32, height: 32, background: B.navy, color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{step.n}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: B.text }}>{step.title}</div>
              <div style={{ fontSize: 13, color: B.text3, marginTop: 3 }}>{step.sub}</div>
            </div>
          </div>
        ))}
      </div>
      {/* @spec CHKOUT-CONF-003 — app install CTA after checklist */}
      <div data-testid="app-install-cta" style={{ background: B.navy, padding: "22px 26px", display: "flex", alignItems: "center", gap: 18, marginBottom: 32 }}>
        <div style={{ width: 52, height: 52, background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0, color: "#fff", fontWeight: 700 }}>[ ]</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Add the app to your phone</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>Pay your bill, unlock the gate, and manage your unit</div>
        </div>
        <button style={{ ...btn, flexShrink: 0 }}>Get the app</button>
      </div>
      <div style={{ textAlign: "center" }}>
        <button onClick={onHome} style={{ background: "none", border: "none", color: B.text3, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>Back to home</button>
      </div>
    </div>
  </div>
);

// @spec RESP-FOOT-001, RESP-FOOT-002
export const Footer = ({ isMobile }) => (
  <footer style={{ background: "#021432", padding: "40px 0 24px", marginTop: "auto", fontFamily: "'Open Sans', sans-serif" }}>
    <div
      data-testid="footer-grid"
      style={{ ...ctr, display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 32, paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.1)" }}
    >
      {[
        { heading: "Find Storage", links: ["Storage near me", "By state", "Climate-controlled", "Drive-up storage"] },
        { heading: "About", links: ["57 locations", "About us", "Careers", "Investor relations"] },
        { heading: "Help", links: ["Size guide", "Storage tips", "FAQs", "Contact us"] },
        { heading: "Tenant", links: ["Pay my bill", "Manage account", "Download the app", "Gate access"] },
      ].map(col => (
        <div key={col.heading}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.7px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>{col.heading}</div>
          {col.links.map(l => (
            <div key={l} style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 8, cursor: "pointer" }}>{l}</div>
          ))}
        </div>
      ))}
    </div>
    <div style={{ ...ctr, paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>2025 USA Storage Centers. All rights reserved.</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Make room for what matters</div>
    </div>
  </footer>
);

// @spec RESP-UI-003
export default function App() {
  const isMobile = useIsMobile();
  const [view, setView] = useState("home");
  const [selectedFacility, setSelectedFacility] = useState(FACILITIES[0]);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const go = v => { setView(v); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleFacility = fac => { setSelectedFacility(fac); go("facility"); };
  const handleSelectUnit = unit => { setSelectedUnit(unit); go("checkout"); };

  return (
    <div style={{ minHeight: "100vh", background: "#F7F9FC", fontFamily: "'Open Sans', sans-serif", color: B.text, fontSize: 15, display: "flex", flexDirection: "column" }}>
      <Fonts />
      <PromoBar />
      <Nav onHome={() => go("home")} onSearch={() => go("search")} />
      <div style={{ flex: 1 }}>
        {view === "home"     && <HomeView isMobile={isMobile} onSearch={() => go("search")} />}
        {view === "search"   && <SearchView isMobile={isMobile} onFacility={handleFacility} onSelectUnit={handleSelectUnit} />}
        {view === "facility" && <FacilityView isMobile={isMobile} facility={selectedFacility} onBack={() => go("search")} onSelectUnit={handleSelectUnit} />}
        {view === "checkout" && <CheckoutView isMobile={isMobile} unit={selectedUnit} onBack={() => go("search")} onConfirm={(activeUnit) => { if (activeUnit) setSelectedUnit(activeUnit); go("confirm"); }} />}
        {view === "confirm"  && <ConfirmView unit={selectedUnit} onHome={() => go("home")} />}
      </div>
      <Footer isMobile={isMobile} />
    </div>
  );
}
