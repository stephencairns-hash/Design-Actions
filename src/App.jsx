import { useState, useCallback, useEffect, useRef } from "react";

const GROUPS = [
  { color: "#BEBEAA" },
  { color: "#5AA8F2" },
  { color: "#D94F28" },
  { color: "#7DD4C0" },
  { color: "#848095" },
];

const CUES = ["sense","describe","recognise","analyse","interpret","evaluate","spark","mull","imagine","craft","configure","cultivate","empower","inform","inspire"];
const CONTOURS = ["lifeworlds","needs","aspirations","evidence","constraints","potentials","ideas","concepts","scenarios","media","forms","ecologies","participants","stakeholders","coalitions"];
const NATURAL_PAIRS = CUES.map((c, i) => [c, CONTOURS[i]]);

const GROUP_FOR = {};
NATURAL_PAIRS.forEach(([c, co], i) => { GROUP_FOR[c] = Math.floor(i/3); GROUP_FOR[co] = Math.floor(i/3); });

const PAIR_GROUPS = [
  NATURAL_PAIRS.slice(0, 3),
  NATURAL_PAIRS.slice(3, 6),
  NATURAL_PAIRS.slice(6, 9),
  NATURAL_PAIRS.slice(9, 12),
  NATURAL_PAIRS.slice(12, 15),
];

const WORDS = {
  sense: { strap: "Attending to what is immediately present.", desc: "To sense is to be receptive to the world as it presents itself — not yet interpreted or evaluated, but encountered. It is the ground of all design action." },
  describe: { strap: "Giving form to what is seen.", desc: "To describe is to articulate what is observed, to give it shape in language or image, to make it available for shared reflection." },
  recognise: { strap: "Seeing again what was already there.", desc: "Recognition is the act of finding the familiar within the new — a way of locating the present situation within a wider frame of knowing." },
  lifeworlds: { strap: "The lived context of everyday experience.", desc: "Lifeworlds are the taken-for-granted horizons of daily life — the conditions within which people act, make meaning, and dwell." },
  needs: { strap: "What a situation requires.", desc: "Needs are not simply given but must be surfaced through careful inquiry. They are the gap between what is and what matters." },
  aspirations: { strap: "What people reach toward.", desc: "Aspirations are the orienting hopes and desires that give direction to action — the conditions of a better life as imagined by those living it." },
  analyse: { strap: "Breaking the situation open.", desc: "Analysis is the act of decomposition — making the parts of a situation legible so that relations, tensions, and structures can be seen." },
  interpret: { strap: "Making meaning from evidence.", desc: "Interpretation moves beyond description toward significance — asking not just what is there, but what it means for those involved." },
  evaluate: { strap: "Weighing what matters.", desc: "To evaluate is to apply criteria to a situation — to assess, compare, and judge in the light of values that have been made explicit." },
  evidence: { strap: "The traces that a situation leaves.", desc: "Evidence is what can be gathered, examined, and brought into argument. It is the material basis for claims about what is the case." },
  constraints: { strap: "The limits that shape possibility.", desc: "Constraints are not only obstacles but also conditions — the frame within which design must work and from which creativity often emerges." },
  potentials: { strap: "What the situation makes possible.", desc: "Potentials are latent capacities — the unrealised opportunities that careful inquiry can surface and design can begin to realise." },
  spark: { strap: "The ignition of new possibility.", desc: "To spark is to introduce a new element — a provocation, an image, an unexpected connection — that opens new directions for thought." },
  mull: { strap: "Holding ideas without forcing them.", desc: "To mull is to allow thinking to proceed without premature resolution — to sit with complexity until something clarifies." },
  imagine: { strap: "Projecting beyond the present.", desc: "Imagination is the capacity to see what is not yet there — to project alternative futures and inhabit them speculatively." },
  ideas: { strap: "The raw material of design thinking.", desc: "Ideas are provisional formulations — not yet proposals or solutions, but possibilities that deserve to be taken seriously and tested." },
  concepts: { strap: "Ideas that have found their form.", desc: "A concept is an idea that has been worked — given internal coherence, connected to evidence, and made communicable to others." },
  scenarios: { strap: "Possible futures made tangible.", desc: "Scenarios are structured imaginings of alternative conditions — tools for making the future available for inspection and critique." },
  craft: { strap: "Making with care and skill.", desc: "Craft is the disciplined practice of making — attending to materials, tools, and processes with a quality of attention that respects what is being made." },
  configure: { strap: "Arranging the parts into a whole.", desc: "Configuration is the act of composition — bringing elements into relation so that they form a coherent and functional ensemble." },
  cultivate: { strap: "Tending what grows over time.", desc: "To cultivate is to create conditions for development — not imposing a form but nurturing the conditions under which something can emerge." },
  media: { strap: "The means through which design acts.", desc: "Media are the materials, channels, and platforms through which design is made present — not neutral conduits but active shapers of what can be communicated." },
  forms: { strap: "The shapes that design gives to the world.", desc: "Forms are the material outcomes of design action — objects, spaces, systems, and images that persist in the world and structure experience." },
  ecologies: { strap: "The interconnected systems design enters.", desc: "Ecologies are the webs of relation — between people, environments, technologies, and institutions — within which design always acts and which it inevitably affects." },
  empower: { strap: "Creating the conditions for agency.", desc: "To empower is to enlarge the capacity of people to act in their own lives — to distribute resources, knowledge, and capability." },
  inform: { strap: "Making knowledge available.", desc: "To inform is to bring knowledge into a situation — not as instruction but as resource, made available for others to use in their own terms." },
  inspire: { strap: "Opening new directions for thought and action.", desc: "To inspire is to introduce a new possibility into someone's horizon — to shift what seems possible and invite a different orientation." },
  participants: { strap: "Those who are present in the situation.", desc: "Participants are not passive recipients of design but active presences — people whose knowledge, experience, and judgement are essential resources." },
  stakeholders: { strap: "Those with an interest in the outcome.", desc: "Stakeholders are those whose lives are shaped by what design does — a wider circle than participants, whose interests must be held in view." },
  coalitions: { strap: "Groups gathered around a shared concern.", desc: "Coalitions are the assembled collectives that form around common purposes — alliances built across difference in the service of shared goals." },
};

const getColor = w => GROUPS[GROUP_FOR[w]]?.color || "#ccc";
const isCue = w => CUES.includes(w);
const naturalPartner = w => {
  for (const [c, co] of NATURAL_PAIRS) { if (c === w) return co; if (co === w) return c; }
  return null;
};

function Cell({ word, selCue, selContour, openWord, onTap }) {
  const color = getColor(word);
  const isSelected = word === selCue || word === selContour;
  const isOpen = word === openWord;
  const partner = naturalPartner(word);
  const isComp = !isSelected &&
    ((selCue && !selContour && partner === selCue) ||
     (selContour && !selCue && partner === selContour));
  // Is this word's pair partner currently open?
  const pairPartnerOpen = !isOpen && openWord && (
    (word === selContour && openWord === selCue) ||
    (word === selCue && openWord === selContour)
  );

  let bg = "#fff";
  if (isOpen) bg = color;                          // open → full colour
  else if (pairPartnerOpen) bg = color + "44";     // partner open → tint back
  else if (isSelected) bg = color;                 // selected, no drawer → full colour
  else if (isComp) bg = color + "22";              // natural companion hint

  return (
    <div
      onClick={() => onTap(word)}
      style={{
        height: 56, display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", background: bg, transition: "background .18s",
        userSelect: "none", WebkitTapHighlightColor: "transparent",
      }}
    >
      <span style={{ fontSize: 21, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.02em", fontFamily: "'DM Sans', sans-serif" }}>
        {word}
      </span>
    </div>
  );
}

function Drawer({ word }) {
  const w = WORDS[word] || {};
  const color = getColor(word);
  return (
    <div data-drawer="true" style={{ gridColumn: "1/-1", background: color, borderTop: "0.5px solid rgba(0,0,0,0.12)", padding: "18px 20px 24px" }}>
      <div style={{ fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)", marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>
        {isCue(word) ? "cue" : "contour"}
      </div>
      {w.strap && <div style={{ fontSize: 16, fontStyle: "italic", color: "#1a1a1a", opacity: .7, lineHeight: 1.55, fontFamily: "Georgia, serif", marginBottom: 12 }}>{w.strap}</div>}
      {w.desc && <div style={{ fontSize: 14, color: "#1a1a1a", lineHeight: 1.65, fontFamily: "Georgia, serif", opacity: .82 }}>{w.desc}</div>}
    </div>
  );
}

export default function App() {
  const [selCue, setSelCue] = useState(null);
  const [selContour, setSelContour] = useState(null);
  const [openWord, setOpenWord] = useState(null);
  const [screen, setScreen] = useState("theory"); // theory | brief
  const [showInfo, setShowInfo] = useState(false);
  const scrollRef = useRef(null);

  const tapWord = useCallback((word) => {
    const isSelected = word === selCue || word === selContour;
    const isOpen = word === openWord;

    if (!isSelected) {
      if (openWord && scrollRef.current) {
        // Measure the open drawer height before it closes
        const drawerEl = scrollRef.current.querySelector("[data-drawer]");
        const drawerHeight = drawerEl ? drawerEl.getBoundingClientRect().height : 0;
        // Find if the tapped word is BELOW the current open drawer
        const tappedEl = document.getElementById("cell-" + word);
        const openEl = document.getElementById("cell-" + openWord);
        if (tappedEl && openEl) {
          const tappedBelow = tappedEl.getBoundingClientRect().top > openEl.getBoundingClientRect().bottom;
          if (tappedBelow) {
            // Word is below drawer — after close, content shifts up by drawerHeight
            // Pre-compensate by saving scroll minus that shift
            savedScroll.current = scrollRef.current.scrollTop - drawerHeight;
          } else {
            savedScroll.current = scrollRef.current.scrollTop;
          }
        } else {
          savedScroll.current = scrollRef.current.scrollTop;
        }
      }
      if (isCue(word)) setSelCue(word);
      else setSelContour(word);
      setOpenWord(null);
    } else if (!isOpen) {
      setOpenWord(word);
    } else {
      if (scrollRef.current) savedScroll.current = scrollRef.current.scrollTop;
      setOpenWord(null);
    }
  }, [selCue, selContour, openWord]);

    const prevScrollTop = useRef(0);

  const savedScroll = useRef(null);

  // When closing a drawer, restore scroll position immediately
  useEffect(() => {
    if (!openWord && savedScroll.current !== null && scrollRef.current) {
      scrollRef.current.scrollTop = savedScroll.current;
      savedScroll.current = null;
    }
    if (openWord && scrollRef.current) {
      // Opening: scroll word to top of container
      setTimeout(() => {
        const el = document.getElementById("cell-" + openWord);
        if (el && scrollRef.current) {
          const containerTop = scrollRef.current.getBoundingClientRect().top;
          const elTop = el.getBoundingClientRect().top;
          scrollRef.current.scrollBy({ top: elTop - containerTop, behavior: "smooth" });
        }
      }, 30);
    }
  }, [openWord]);

  const bothSelected = selCue && selContour;
  const color = getColor;

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#e8e5e0", fontFamily: "'DM Sans', sans-serif", padding: "20px 0" }}>
      <div style={{ width: "min(390px, 100vw)", height: "min(844px, 90vh)", display: "flex", flexDirection: "column", background: "#fff", boxShadow: "0 24px 80px rgba(0,0,0,0.2)", overflow: "hidden", position: "relative", borderRadius: 12 }}>

        {/* HEADER — same treatment as footer, aligned to grid columns */}
        <div style={{ flexShrink: 0, borderBottom: "1px solid #1a1a1a", display: "flex", alignItems: "stretch", height: 96, background: "#fff" }}>
          {/* Left half — single line title */}
          <div style={{ flex: 1, display: "flex", alignItems: "flex-start", paddingLeft: 18, paddingTop: 20, borderRight: "1px solid rgba(0,0,0,0.15)" }}>
            <span style={{ fontSize: 16, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 500, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>Design Actions</span>
          </div>
          {/* Right half — i button, right-aligned */}
          <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "flex-end", paddingRight: 18, paddingTop: 22, borderLeft: "1px solid rgba(0,0,0,0.15)" }}>
<span onClick={() => setShowInfo(true)} style={{ fontFamily: "Georgia, serif", fontSize: 15, color: "#1a1a1a", cursor: "pointer", opacity: 0.6, paddingRight: 2 }}>i</span>
          </div>
        </div>

        {/* THEORY SCREEN */}
        {screen === "theory" && <>
          <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", background: "#fff" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              {PAIR_GROUPS.map((pairs, gi) => (
                <div key={gi} style={{ display: "contents" }}>
                  {gi > 0 && <div style={{ gridColumn: "1/-1", height: 1, background: "rgba(0,0,0,0.15)" }} />}
                  {pairs.map(([cue, contour]) => {
                     return (
                      <div key={cue} style={{ display: "contents" }}>
                        <div data-word={cue} id={"cell-"+cue}><Cell word={cue} selCue={selCue} selContour={selContour} openWord={openWord} onTap={tapWord} /></div>
                        <div data-word={contour} id={"cell-"+contour}><Cell word={contour} selCue={selCue} selContour={selContour} openWord={openWord} onTap={tapWord} /></div>

                        {(openWord === cue || openWord === contour) && <Drawer word={openWord} />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
          {/* FOOTER BAR — mirrors header, aligned to grid columns */}
          <div style={{ flexShrink: 0, borderTop: "1px solid #1a1a1a", display: "flex", alignItems: "stretch", height: 96, background: "#fff" }}>

            {/* Left half — ✕, spans full left column */}
            <div
              onClick={() => { setSelCue(null); setSelContour(null); setOpenWord(null); }}
              style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 20, borderRight: "1px solid #1a1a1a", cursor: "pointer", maxWidth: "25%" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>

            {/* Right half — cue | contour | here now */}
            <div style={{ flex: 3, display: "flex", alignItems: "flex-start" }}>
              {/* Cue field — tints when its drawer is open */}
              <div style={{ flex: 1, alignSelf: "stretch", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 20, borderRight: "1px solid rgba(0,0,0,0.15)", background: "#fff" }}>
                <span style={{
                  fontSize: selCue ? 16 : 10, fontWeight: selCue ? 500 : 400,
                  color: selCue ? "#1a1a1a" : "rgba(0,0,0,0.25)",
                  letterSpacing: selCue ? "-.01em" : ".1em",
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: selCue ? "none" : "uppercase",
                }}>
                  {selCue || "cue"}
                </span>
              </div>

              {/* Contour field — tints when its drawer is open */}
              <div style={{ flex: 1, alignSelf: "stretch", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 20, borderRight: "1px solid rgba(0,0,0,0.15)", background: "#fff" }}>
                <span style={{
                  fontSize: selContour ? 16 : 10, fontWeight: selContour ? 500 : 400,
                  color: selContour ? "#1a1a1a" : "rgba(0,0,0,0.25)",
                  letterSpacing: selContour ? "-.01em" : ".1em",
                  fontFamily: "'DM Sans', sans-serif",
                  textTransform: selContour ? "none" : "uppercase",
                }}>
                  {selContour || "contour"}
                </span>
              </div>

              {/* Here now */}
              <div
                onClick={() => bothSelected && setScreen("brief")}
                style={{
                  flex: 1, alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
                  paddingTop: 20,
                  background: bothSelected ? "#1a1a1a" : "#fff",
                  cursor: bothSelected ? "pointer" : "not-allowed",
                  transition: "background .2s", lineHeight: 1.3,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: bothSelected ? "#fff" : "rgba(0,0,0,0.22)", letterSpacing: ".08em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>here</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: bothSelected ? "#fff" : "rgba(0,0,0,0.22)", letterSpacing: ".08em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>now</span>
              </div>
            </div>
          </div>
        </>}

        {/* BRIEF SCREEN */}
        {screen === "brief" && <>
          <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ height: 56, background: selCue ? getColor(selCue) : "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 21, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.02em" }}>{selCue}</span>
              </div>
              <div style={{ height: 56, background: selContour ? getColor(selContour) : "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 21, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.02em" }}>{selContour}</span>
              </div>
            </div>
            <div style={{ padding: "24px 20px", fontFamily: "Georgia, serif", fontSize: 16, lineHeight: 1.75, color: "#1a1a1a", opacity: .85 }}>
              A brief for <strong>{selCue}</strong> and <strong>{selContour}</strong>.<br /><br />
              The combination of <em>{selCue}</em> and <em>{selContour}</em> opens a particular angle of attention — engaged with the specific conditions of this place, this moment, this challenge.<br /><br />
              This is where the generated brief will appear, reading your cue–contour pair in relation to where you are.
            </div>
          </div>
          <div style={{ flexShrink: 0, borderTop: "1px solid #1a1a1a", display: "flex", alignItems: "stretch", height: 96, background: "#fff" }}>
            {/* Left cell — plain arrow */}
            <div
              onClick={() => setScreen("theory")}
              style={{ flex: 1, maxWidth: "25%", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 20, borderRight: "1px solid rgba(0,0,0,0.15)", cursor: "pointer" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </div>
            {/* Right 75% — empty */}
            <div style={{ flex: 3 }} />
          </div>
        </>}

        {/* INFO OVERLAY */}
        {showInfo && (
          <div
            style={{ position: "absolute", top: 96, left: 0, right: 0, bottom: 0, zIndex: 100 }}
          >
            <div
              style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "#fff", overflowY: "auto", borderTop: "1px solid #1a1a1a" }}
            >
              {/* Close button */}
              <div
                onClick={() => setShowInfo(false)}
                style={{ position: "sticky", top: 0, display: "flex", justifyContent: "flex-end", padding: "16px 20px 0", background: "#fff", zIndex: 1 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" style={{ cursor: "pointer" }}>
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </div>
              <div style={{ padding: "16px 24px 48px" }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.75, color: "#1a1a1a", marginBottom: 20 }}>
                  A toolkit to help engage complex challenges.
                </p>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 15, lineHeight: 1.75, color: "#1a1a1a", marginBottom: 28 }}>
                  Fifteen <em>cues</em> — verbs that orient design action — and fifteen <em>contours</em> — nouns that name the terrain of inquiry. Tap a word to select it. Tap again to read its description. Tap again to close. When you have a cue and a contour, tap{" "}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", fontWeight: 500, border: "1px solid #1a1a1a", padding: "2px 7px" }}>here now</span>
                  {" "}to generate a brief that interprets your pair for the place and moment where you are. Tap{" "}
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}>←</span>
                  {" "}to return to the word list.
                </p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(0,0,0,0.38)", letterSpacing: ".04em", lineHeight: 1.8 }}>
                  Stephen Cairns · David Neudecker<br />
                  Joshua Vargas · Denise Lee<br />
                  beta · Design Issues · MIT Press
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
