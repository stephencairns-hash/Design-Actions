import { useState, useEffect, useRef, useCallback } from "react";

const COLORS = ["#BEBEAA", "#5AA8F2", "#D94F28", "#7DD4C0", "#848095"];
const CUES = ["sense", "describe", "recognise", "analyse", "interpret", "evaluate", "spark", "mull", "imagine", "craft", "configure", "cultivate", "empower", "inform", "inspire"];
const CONTOURS = ["lifeworlds", "needs", "aspirations", "evidence", "constraints", "potentials", "ideas", "concepts", "scenarios", "media", "forms", "ecologies", "participants", "stakeholders", "coalitions"];
const PAIR_GROUPS = [[["sense", "lifeworlds"], ["describe", "needs"], ["recognise", "aspirations"]], [["analyse", "evidence"], ["interpret", "constraints"], ["evaluate", "potentials"]], [["spark", "ideas"], ["mull", "concepts"], ["imagine", "scenarios"]], [["craft", "media"], ["configure", "forms"], ["cultivate", "ecologies"]], [["empower", "participants"], ["inform", "stakeholders"], ["inspire", "coalitions"]]];
const WORDS = {"sense": {"strap": "Sense the world even as you make sense of it", "desc": "Sense through the body and through technology, moving, reaching, circling, attending actively rather than waiting for the world to arrive. Try to meet what is there before naming it, before fitting it into what you already know. The interpreting mind is always reaching forward, always already framing what arrives. The discipline is to lean against that.\n\nTechnologies extend this reach, from the phone in a pocket to satellites orbiting overhead. Each expands perception while also shaping it. Sense is both immediate and mediated: a bodily practice of investigation and a technological act of access. You cannot suspend mediation, but you can hold it lightly.\n\nEnter attentively. The world is always already interpreted. Your task is to keep arriving before the interpretation closes."}, "lifeworlds": {"strap": "The complex whole of lived relations", "desc": "To enter a lifeworld is to step into the shifting weave of everyday life as it is lived and made meaningful: streets, homes, and routines, but also habits, symbols, and shared values that hold communities together and apart.\n\nLifeworlds are never purely human. They are shaped by animals, plants, infrastructures, and technologies that sustain or constrain activity. What is lived in them is always entangled, human and nonhuman, familiar and strange, woven together in patterns that hold more than any single account can contain.\n\nThis terrain is never fully mappable, and any intervention changes it from within. To work in a lifeworld is to acknowledge that others inhabit it differently, that your presence alters it, and that forces are at work whose threads you sense but cannot always follow."}, "describe": {"strap": "Translate perception into shared, partial accounts", "desc": "Describe to render what you have observed in a form that others can encounter. The work is to hold what is observed still long enough for the texture to be seen. Words, sketches, photographs, and measurements are different languages, each with its own grammar of what can and cannot be said.\n\nGood description is modest and skilled. It dwells on textures and specifics that might otherwise pass unnoticed, and it stays aware that every account is made from a particular position.\n\nDescription multiplies perspectives. When several accounts are placed alongside each other, what emerges is not uniformity but a richer sense of difference, an invitation to dialogue no single account could open."}, "needs": {"strap": "Conditions required to live well", "desc": "Needs mark the thresholds below which life cannot sustain itself with dignity. Some are immediate: food, water, shelter, safety. Others sustain longer-term flourishing: care, belonging, meaningful work, education, a stable environment.\n\nNeeds are not only physical but social, cultural, and emotional. They are interdependent: meeting one often depends on supporting others, while neglect in one area can quietly undermine the whole. And they shift. What is essential in one generation may be insufficient in the next, and urgent needs can constrain what people feel able to pursue.\n\nWhat counts as a need, who decides, and for whom: these are not preliminary questions but the design problem itself."}, "recognise": {"strap": "Acknowledge what is there, and who it matters to", "desc": "Recognise by acknowledging what is before you, bringing it into relation with what you already know. Recognition connects present experience to memory, history, and expectation, but it goes beyond identification. It grants presence. A place revisited, a practice encountered anew, a person seen beyond first impressions—recognition often begins where certainty ends.\n\nTo recognise someone is to acknowledge their history, their perspective, and their claim on attention. This act is reciprocal. How we recognise others shapes how they appear to us, and how they may come to see themselves. But recognition also changes the recogniser. To see someone differently is to become someone who sees differently. To withhold recognition is also an act, with consequences.\n\nUnderstanding begins when familiarity and strangeness remain in view together."}, "aspirations": {"strap": "Futures already acting on the present", "desc": "Aspirations open a horizon: not simply what people hope for, but what draws them forward. They orient attention, effort, and imagination toward ways of living, becoming, or contributing that do not yet exist. Aspirations belong to the future, but they act in the present. They shape what people notice, what they attempt, and what they refuse long before they are achieved.\n\nAspirations may be personal or collective, modest or transformative. They emerge from lived experience yet reach beyond it, connecting present conditions to futures that feel possible, desirable, or necessary. What people aspire to depends partly on circumstance, but also on what a society signals is achievable, legitimate, and worth pursuing. Aspirations expand and contract as horizons open and close.\n\nLife is lived forward. Aspirations give direction without guaranteeing arrival. They matter because people often act not only from what is, but from what they believe might become possible."}, "analyse": {"strap": "Reveal the hidden structures that hold things in place", "desc": "Analyse by loosening what appears compact and given, freeing elements from the whole so their relations become visible. Analysis moves backward: from effect to cause, from surface to structure, from what appears to what holds it in place. The structure was always there. Analysis makes it readable.\n\nWork with cuts, maps, samples, and comparisons. Shift scale deliberately: zoom into the detail to find what the overview obscures, pull back to the systemic pattern to find what the detail cannot show. When phenomena are dynamic, track symptoms and signals rather than waiting for structures to declare themselves.\n\nAnalysis selects, frames, and shapes what it finds. Know what kind of loosening you are performing, and what it therefore leaves still tied."}, "evidence": {"strap": "Grounds for knowledge and credibility", "desc": "Evidence is not truth. It is what allows a claim to be examined. A measurement, a testimony, a dataset, a historical case: evidence makes something available to the mind’s eye so that it can be questioned, compared, or tested. What it makes visible depends on who is looking, from where, and with what instruments.\n\nIt may be quantitative or qualitative, historical or ethnographic, direct or circumstantial. Evidence does not speak for itself; it speaks within a framework of inference that determines what it counts as evidence for. Gathering evidence does not settle questions but opens them: what is included and what is left out, whose testimony counts and whose does not, what methods were applied and what they could not reach. Weak or partial evidence can still be useful, provided its limits are honestly acknowledged.\n\nEvidence does not end an argument. It changes the quality of it. Know how it was made."}, "interpret": {"strap": "Shape meaning in context, across a gap", "desc": "Interpret to carry what is observed in one world into the language of another. The interpreter does not originate meaning but enables its passage: a go-between, working across a gap.\n\nSituate what you have found within historical, cultural, and conceptual frames so that it resonates beyond its immediate context. Link what analysis might leave isolated, tracing patterns and implications that only become visible in relation. This is how observations become understanding: weaving data into narratives, symbols into cultural insight, lived experience into something that can be shared.\n\nEvery interpretation is a translation. Something is lost; something is gained. Offer yours as a proposal, not a conclusion. Meaning is made in the exchange between your horizon and the situation’s, not before it, and not after it has closed."}, "constraints": {"strap": "Limits that define and shape", "desc": "Constraints are not merely barriers; they are forces that hold shape. The tension in a bow. The compression in an arch. What is bound can be made taut, and tautness creates form.\n\nSome constraints are physical: space, time, budget, material. Others are conceptual: rules, conventions, standards, assumptions that have hardened into apparent necessity. All of them force choices and sharpen focus. Without constraint there is no form.\n\nEvery constraint also affords. What limits one use opens another; what constrains one person may free another. The same wall that blocks passage offers shelter; the same threshold that excludes also admits. The work is to read both: what this constraint enables, for whom, and what it forecloses, for whom.\n\nConstraints are not obstacles to be eliminated but communications from the situation. What cannot move creates the conditions for everything else."}, "evaluate": {"strap": "Assess what something is worth, and for whom", "desc": "Evaluate to call forth what something is worth, not to assign value from outside but to draw it out. A proposal, prototype, policy, or practice carries value not yet visible until it is tested. Evaluation makes that worth apparent.\n\nWeigh immediate outcomes against longer-term consequences, intended effects against those not foreseen. Set alternatives alongside each other to clarify trade-offs and priorities. But attend to the criteria themselves: what counts as success, and for whom, already encodes a set of values. Draw on multiple forms of evidence: quantitative measures and lived experience, expert judgment and the testimony of those most affected. Different forms of evidence make different values visible.\n\nEvaluation is consequential in both directions. To declare something valuable shapes what is carried forward. To declare something inadequate closes a door."}, "potentials": {"strap": "Capacities not yet unfolded, already present", "desc": "Potentials are not future possibilities. They are present capacities. A seed contains the potential to grow. A neighbourhood contains the potential to organise. A material contains the potential to bend, crack, or endure. Potentials already exist, even when the conditions for their development do not. They exert pressure on what a situation can become.\n\nUnlike outcomes, potentials hold multiple directions at once. Which unfolds depends on conditions: attention, resources, timing, care. A potential is what a situation can do; what people hope for from it is a separate question. Some potentials remain dormant for years; others disappear when conditions change. The task is not to predict which future will arrive, but to recognise capacities before they become obvious, and to create conditions in which they can unfold.\n\nPotentials are fragile. Attend to what is already gathering force. Not every potential will develop, but every one that is lost was once a force."}, "spark": {"strap": "Bring beginnings into view", "desc": "A spark is rarely self-generated. It arrives at the intersection of a prepared mind and a situation that resists easy reading: a question, an image, an unexpected connection that shifts attention and opens a direction not previously visible. It is a transfer of energy, small and often accidental, dependent on conditions to take hold.\n\nBeginnings are usually slight. They emerge as tentative connections, peripheral observations, things that don’t quite fit the existing frame. Most don’t endure. Sparking is not about producing the decisive insight. It is about creating the conditions in which something can catch, and developing the judgment to recognise what is catching.\n\nAttend to early signals. What gathers force and what dissipates, and why. Less about waiting for inspiration than about preparing the ground."}, "ideas": {"strap": "Openings that give direction", "desc": "Ideas begin as orientations. They do not solve a problem or provide a destination. They suggest a way forward, bringing scattered observations, questions, or possibilities into a provisional alignment. The best ideas often feel recognised rather than invented, found in the material rather than manufactured from nothing.\n\nAn idea is not yet a solution but a direction of travel. It gives inquiry somewhere to go without being itself fully grasped, making some paths more compelling while leaving others behind. A good idea organises attention. It helps distinguish what matters from what does not, revealing connections that were previously difficult to see. Some ideas remain generative precisely because they cannot be fully realised. They continue to produce questions, experiments, and further work.\n\nIdeas are slight, provisional, and one among many. Left unattended, they fade. Carried forward, they begin to gather consequences."}, "mull": {"strap": "Let things settle and turn", "desc": "Mull by suspending directed thought and creating space for things to settle, sediment, and reorganise. Unlike analysis or rapid judgment, mulling requires patience, time for possibilities to deepen before they can be clearly formed. It is a practice of returning, circling, and allowing patterns to surface when ready.\n\nThe challenge is to distinguish fertile uncertainty from mere confusion, and productive delay from pointless postponement. Mulling is not passivity. It is soft vigilance: remaining present to a question without forcing it.\n\nSome things cannot be reached directly. They ripen through duration, until recognition arrives less as invention than as something disclosed. Hold the question. Stay with it longer than feels comfortable."}, "concepts": {"strap": "Structures that organise meaning into shared use", "desc": "Concepts gather things together so they can be thought and worked with as one. A city, a species, a market, a neighbourhood: each concept allows many individual instances to be held within a shared frame. The word carries the sense of taking hold—not just perceiving but grasping, bringing something into a form that can be used.\n\nUnlike ideas, which orient and reach, concepts stabilise. They provide shared language, make communication across difference possible, and allow a group to build on what it already holds in common. Every concept highlights some aspects of a situation while leaving others in shadow.\n\nConcepts harden. When they stop generating new thinking, they become constraints rather than tools. Keep them flexible enough to frame new situations, rigorous enough to be tested. A concept that cannot be challenged is no longer doing its work."}, "imagine": {"strap": "See otherwise, refuse the inevitability of the given", "desc": "Imagine to project possibilities forward, working through structured play with ideas, images, and perspectives free from the constraints of immediate use. The word carries the sense of working with stored likenesses: recombining what is already known into configurations that do not yet exist.\n\nImagine well by shifting vantage points deliberately, inhabiting unfamiliar positions, adopting alternative frameworks, projecting different scenarios. Current arrangements are one option among many. Imagination makes this felt rather than merely understood.\n\nIt is not escape but preparation: expanding the repertoire of what might be tried, tested, or transformed. It requires looseness to let possibilities proliferate, and discipline to treat them as drafts rather than conclusions. Imagine to refuse inevitability."}, "scenarios": {"strap": "Stories that open possible futures", "desc": "Scenarios are frames for action, not predictions but structured explorations of how conditions, decisions, and actors might combine. The word comes from the theatre: not the script but the outline, the setting within which a scene can unfold. A frame for improvisation, not a fixed account.\n\nScenarios show how trends, choices, and disruptions might interact to produce different outcomes. Contrasting alternatives make consequences visible and comparable, turning what is otherwise abstract into something that can be discussed, tested, and prepared for. They work best when treated as provisional: drafts to be rehearsed and revised, not futures to be accepted.\n\nFutures are not singular. They are multiple, contested, shaped by choices made now. A scenario does not predict. It opens a space in which consequences can be examined before they arrive."}, "craft": {"strap": "Work things into being", "desc": "Craft by staying with the work. A potter reshapes clay. A writer revises a sentence. A musician refines a phrase through repetition. Each action produces a response, and each response suggests the next move. Craft develops through this exchange between intention, material, and result.\n\nWork through attention and adjustment. Cut, test, revise, repeat. Materials resist, tools extend, situations change. The task is not to impose a finished idea but to discover possibilities as they emerge. A weaver follows the tendencies of fibres. A designer learns from a prototype. A typographer adjusts spacing one fraction at a time. Every adjustment becomes the basis for the next.\n\nCraft accumulates judgement through repeated engagement. What appears effortless often rests on countless acts of correction. It leaves traces of discernment that no specification can fully describe."}, "media": {"strap": "All design works at one remove", "desc": "Design rarely works directly on the thing itself. A building takes shape in drawings and models before it exists. A service is rehearsed in storyboards before it is delivered. A performance begins in notation before it is enacted. Every design action passes through a medium that carries intention from mind to world.\n\nMedia are not neutral carriers. Paper, cardboard, code, notation, sensors, and screens each reveal some possibilities while obscuring others. A sketch invites improvisation. A diagram clarifies relations. A model tests form. A simulation explores consequences. Media extend perception, allowing designers to see, compare, communicate, and coordinate beyond the limits of direct experience. But every medium has its own capacities, limits, and assumptions about what matters.\n\nThe medium shapes the outcome as surely as the intention does.\n\nKnow what your medium cannot show."}, "configure": {"strap": "Set things in relation", "desc": "Begin with connections. Configure by deciding what sits beside what, what speaks to what, what depends on what, and what remains apart. A melody gains force from the notes around it. A room changes with the position of a door. A conversation shifts when a new voice enters. Configuration establishes the relations from which everything else follows.\n\nWork through links rather than objects. Move elements closer, separate them, connect them, sequence them, nest them, or let them overlap. Small changes can travel far. One new connection may alter the behaviour of an entire composition, organisation, service, or place. The task is not to perfect each part in isolation, but to shape how parts define one another.\n\nConfiguration determines what can meet, combine, reinforce, or interfere, and how activity unfolds as a result.\n\nEvery configuration is also an exclusion."}, "forms": {"strap": "What gives shape and feel", "desc": "Enter a terrain of arrangements. Forms gather words into stories, sounds into music, marks into images, actions into rituals, and spaces into places. They bring separate elements into relation and hold them there long enough for a pattern to emerge. Form is what lets a whole appear.\n\nLook closely and forms reveal rhythm, proportion, sequence, repetition, and pause. Through these arrangements, certain qualities become possible while others recede. A poem feels spare, a melody feels restless, a room feels calm, a composition feels elegant, not because those qualities were added afterwards, but because the form gives them somewhere to arise. The arrangement carries the feeling.\n\nThis terrain matters because forms work before interpretation. They organise experience before anyone explains what it means."}, "cultivate": {"strap": "Tend conditions over time", "desc": "Cultivate to prepare and sustain conditions through repeated return: intervention, observation, adjustment, and return again. The word carries the sense of inhabiting as well as tending. Cultivation is not a single act but a form of sustained dwelling, a commitment to a place or practice over time.\n\nSome elements demand constant attention; others thrive when left to find their own rhythms. Cultivate with discernment, knowing what each situation requires, resisting the impulse to apply uniform treatment. Build feedback loops between practitioner and practice: each adjustment generates insight that reshapes the approach. This is not passive patience but active care, deciding when to intervene and when to hold back.\n\nGrowth is uneven and not every effort bears fruit. Cultivate anyway. The conditions you build outlast the outcomes you intended."}, "ecologies": {"strap": "Relations that sustain and transform life", "desc": "To enter an ecological frame is to accept that nothing exists outside its relations. Every element is what it is because of its connections: to other species, other systems, other scales of time and space. The unit is never the organism alone but the organism in its environment: the two are constituted together.\n\nIn design, ecologies extend beyond the biological to infrastructures, technologies, and cultural practices that sustain or disrupt conditions of living. Every intervention shifts dependencies, enabling some possibilities while foreclosing others. What changes locally ripples outward; what accumulates systemically returns as local condition.\n\nTo think ecologically is to accept that design exceeds what any designer can intend or control. The work enters a system already in motion. Attend to what you are joining, not only to what you are making."}, "empower": {"strap": "Make room for agency that is already there", "desc": "Empower by making room: for judgment, for initiative, for capacities that are already present but have not yet found conditions to act. Empowerment is not a gift and not a feeling. It is structural. It works by removing what constrains agency and building what it needs to develop, redistributing resources, tools, and knowledge so that people can do what they could not do before.\n\nIn practice this means shifting from expert-led decisions to shared authority. It requires genuine trust and a willingness to relinquish control over outcomes. Provide enough structure for action while leaving space for independent judgment, so that participants can take ownership and extend what is possible beyond what was planned.\n\nAgency does not need to be installed. It needs room."}, "participants": {"strap": "Those inside the unfolding of action", "desc": "To be a participant is to take part in what is happening, contributing something that would be absent without your involvement. Participation is not observation from a distance but engagement from within. Nor is it solitary. Action only becomes possible in the presence of others, through response, negotiation, cooperation, and disagreement. Participants help shape outcomes, but they also encounter conditions, frictions, and possibilities that remain invisible to others.\n\nParticipation varies in degree and intensity. Some contribute ideas, others make decisions, implement actions, maintain relationships, or carry responsibilities over time. What matters is not the amount of involvement but its position within the process. Those closest to the work often notice what plans overlook, what experts miss, and what abstractions conceal. Participation generates forms of knowledge that cannot be produced from outside.\n\nNo process unfolds on its own. It is always enacted through those who take part."}, "inform": {"strap": "Give knowledge the form it needs to travel", "desc": "Inform by giving knowledge a form, shaping what you know so that others can hold it, use it, and act on it. This is not transmission but formation: information that does not change how someone thinks or what they can do has not yet fully informed. The test is not whether it was communicated but whether it took form in the receiver.\n\nIt requires clarity, audience awareness, and purpose: cutting through noise to provide scaffolding for judgment and action. Inform well by situating knowledge in relation to the decisions it bears on: what does this mean for what we are trying to do? This requires translation rather than simplification, preserving complexity where it matters.\n\nInform iteratively. Knowledge shared in one form will return reshaped by those who act on it. Let that reshaping change how you inform next."}, "stakeholders": {"strap": "Those who hold an interest or stake", "desc": "A stake is something planted: a marker, a claim, something that can be lost. To be a stakeholder is not merely to have an interest but to have something at risk, a vulnerability as well as a position.\n\nStakeholders may be individuals, communities, organisations, or institutions. Not all have equal power to assert their claims: some are formally acknowledged and invited into processes of consultation; others remain invisible until they make their interests felt. Every project sits within a wider field of competing claims, and the field is never level.\n\nStakes are not only human. Other species, ecosystems, and future generations are implicated in most design decisions, even when their interests must be represented or translated by others. Every intervention stakes something that belongs to someone else."}, "inspire": {"strap": "Breathe energy into possibility", "desc": "Inspire by opening a space in which others can exercise their own judgment, not by directing what they think or feel but by disturbing what they take for granted. The word carries the sense of breath passing through: inspiration does not originate in the inspirer but in what the encounter activates. Its test is not whether people feel something but whether the feeling produces new capacity.\n\nThis is the difference between inspiration and spectacle. Spectacle produces feeling and dependency: the inspired return for more. Genuine inspiration produces independence, a shift in perception that persists after the encounter, equipping people to see and judge differently on their own terms. A work that changes what you notice, what you think possible, how you inhabit a situation: that is inspiration. A work that merely moves you is not.\n\nInspire well by offering cues without prescribing outcomes. What inspires does not close down. It opens. What travels is not the feeling but the capacity the feeling releases."}, "coalitions": {"strap": "Alliances formed around shared cause", "desc": "Coalitions grow. They are not assembled but developed over time, through the slow work of finding common ground, building trust, and creating conditions in which different actors can act together without losing what makes them distinct. The word carries the sense of growing together: a sustained proximity that produces something neither party could produce alone.\n\nThey form when individual efforts are insufficient and collective strength is needed: to amplify voice, pool resources, or coordinate action at a scale that matters. Members may not share all interests, but find enough common ground in a cause that outweighs their differences. That common ground is not pre-given. It is made, and making it is itself a design challenge.\n\nCoalitions are fragile. They depend on trust, reciprocity, and ongoing negotiation, and they can extend beyond the human to include technologies, environments, and more-than-human actors. Lasting change rarely comes from isolated effort. It comes from alliances that hold."}};

const GROUP_FOR = {};
CUES.forEach((c, i) => { GROUP_FOR[c] = Math.floor(i / 3); GROUP_FOR[CONTOURS[i]] = Math.floor(i / 3); });
const getColor = w => COLORS[GROUP_FOR[w]] || "#ccc";
const isCue = w => CUES.includes(w);
const partnerOf = w => {
  for (const [c, co] of PAIR_GROUPS.flat()) { if (c === w) return co; if (co === w) return c; }
  return null;
};

// Unified line system — one weight throughout
const B_OUTER = "1px solid #1a1a1a";       // outer frame: header/footer top/bottom
const B_INNER = "1px solid rgba(0,0,0,0.15)"; // inner dividers: consistent everywhere

// Cell height — tighter, more instrument-like
const CELL_H = 80;
const HDR_H = 96;
const FTR_H = 96;

function Drawer({ word }) {
  const w = WORDS[word] || {};
  const color = getColor(word);
  const idx = isCue(word) ? CUES.indexOf(word) : CONTOURS.indexOf(word);
  const label = (isCue(word) ? "CUE " : "CONTOUR ") + (idx + 1);
  return (
    <div data-drawer="true" style={{ gridColumn: "1 / -1", background: color, borderTop: B_INNER, padding: "28px 24px 40px" }}>
      <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)", marginBottom: 14, fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </div>
      {w.strap ? (
        <div style={{ fontSize: 19, fontStyle: "italic", color: "#1a1a1a", opacity: 0.9, lineHeight: 1.5, fontFamily: "Georgia, serif", marginBottom: 22 }}>
          {w.strap}
        </div>
      ) : null}
      {w.desc ? w.desc.split("\n\n").map((para, i) => (
        <p key={i} style={{ fontSize: 19, color: "#1a1a1a", lineHeight: 1.7, fontFamily: "Georgia, serif", opacity: 0.9, marginBottom: 18 }}>
          {para}
        </p>
      )) : null}
    </div>
  );
}

function Cell({ word, selCue, selContour, openWord, onTap }) {
  const color = getColor(word);
  const isSelected = word === selCue || word === selContour;
  const isOpen = word === openWord;
  const partner = partnerOf(word);
  const isComp = !isSelected && ((selCue && !selContour && partner === selCue) || (selContour && !selCue && partner === selContour));
  const pairPartnerOpen = !isOpen && openWord && ((word === selContour && openWord === selCue) || (word === selCue && openWord === selContour));

  let bg = "#fff";
  if (isOpen) bg = color;
  else if (pairPartnerOpen) bg = color + "44";
  else if (isSelected) bg = color;
  else if (isComp) bg = color + "22";

  return (
    <div
      onClick={() => onTap(word)}
      style={{ height: CELL_H, display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", background: bg, transition: "background .18s",
        userSelect: "none", WebkitTapHighlightColor: "transparent" }}
    >
      <span style={{ fontSize: 24, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.02em", fontFamily: "'DM Sans', sans-serif" }}>
        {word}
      </span>
    </div>
  );
}

function BriefPage({ selCue, selContour, onBack }) {
  const [location, setLocation] = useState("your location");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    const text = cueCapital + " " + selContour + " in " + location + " at " + timeStr + ", " + dateStr + ".";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
    }
  };
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr = now.toLocaleDateString([], { weekday: "long", day: "numeric", month: "long" });
  const cueCapital = selCue ? selCue.charAt(0).toUpperCase() + selCue.slice(1) : "";
  const cueCapRef = cueCapital; // stable ref for onCopy closure

  useEffect(() => {
    if (!navigator.geolocation) { setReady(true); return; }
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        fetch("https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lon + "&format=json", {
            headers: { "Accept-Language": "en", "User-Agent": "DesignActions/1.0" }
          })
          .then(r => r.json())
          .then(data => {
            const a = data.address || {};
            const place = a.neighbourhood || a.suburb || a.quarter || a.village || a.town || a.city_district || a.city || a.county || (lat + ", " + lon);
            setLocation(place); setReady(true);
          })
          .catch(() => { setLocation(lat + ", " + lon); setReady(true); });
      },
      () => { setReady(true); }
    );
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", display: "flex", flexDirection: "column", zIndex: 50 }}>
      <div style={{ flexShrink: 0, height: HDR_H, borderBottom: B_OUTER, display: "grid", gridTemplateColumns: "1fr 1fr", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "flex-start", paddingLeft: 18, paddingTop: 20, borderRight: B_INNER, fontSize: 18, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif", minWidth: 0 }}>
          Design Actions
        </div>
        <div style={{ minWidth: 0 }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", flexShrink: 0 }}>
        <div style={{ height: CELL_H, background: selCue ? getColor(selCue) : "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 24, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.02em", fontFamily: "'DM Sans', sans-serif" }}>{selCue}</span>
        </div>
        <div style={{ height: CELL_H, background: selContour ? getColor(selContour) : "#eee", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 24, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.02em", fontFamily: "'DM Sans', sans-serif" }}>{selContour}</span>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "28px 24px 40px" }}>
        <p style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.7, fontFamily: "Georgia, serif", color: "#1a1a1a", opacity: 0.9, marginBottom: 28 }}>
          {cueCapital} {selContour} in {location} at {timeStr}, {dateStr}.
          {!ready ? <span style={{ animation: "daBlink 1.6s ease-in-out infinite", fontSize: 18, marginLeft: 3, fontWeight: 200 }}>|</span> : null}
        </p>
        {/* TEXT */}
        <p style={{ fontSize: 19, fontFamily: "Georgia, serif", lineHeight: 1.7, color: "#1a1a1a", opacity: 0.35, marginBottom: 18 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>

        {/* IMAGE */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ width: "100%", aspectRatio: "4/3", background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(0,0,0,0.2)", fontFamily: "'DM Sans', sans-serif" }}>image</span>
          </div>
          <div style={{ padding: "6px 0 0", fontSize: 11, letterSpacing: ".04em", color: "rgba(0,0,0,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
            What do you see from where you stand?
          </div>
        </div>

        {/* TEXT */}
        <p style={{ fontSize: 19, fontFamily: "Georgia, serif", lineHeight: 1.7, color: "#1a1a1a", opacity: 0.35, marginBottom: 18 }}>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        {/* PROVOCATION */}
        <div style={{ border: "1px solid #1a1a1a", padding: 20, marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 80 }}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 19, fontStyle: "italic", color: "#1a1a1a", textAlign: "center", lineHeight: 1.5 }}>
            Who else inhabits this world right now?
          </span>
        </div>

        {/* TEXT */}
        <p style={{ fontSize: 19, fontFamily: "Georgia, serif", lineHeight: 1.7, color: "#1a1a1a", opacity: 0.35, marginBottom: 18 }}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae ab illo inventore veritatis et quasi architecto.
        </p>

        {/* IMAGE square */}
        <div style={{ marginBottom: 18 }}>
          <div style={{ width: "100%", aspectRatio: "1/1", background: "rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(0,0,0,0.2)", fontFamily: "'DM Sans', sans-serif" }}>image</span>
          </div>
          <div style={{ padding: "6px 0 0", fontSize: 11, letterSpacing: ".04em", color: "rgba(0,0,0,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
            A detail worth attending to.
          </div>
        </div>

        {/* TEXT */}
        <p style={{ fontSize: 19, fontFamily: "Georgia, serif", lineHeight: 1.7, color: "#1a1a1a", opacity: 0.35, marginBottom: 18 }}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>

        {/* GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid rgba(0,0,0,0.15)", borderLeft: "1px solid rgba(0,0,0,0.15)", marginBottom: 32 }}>
          {["What persists here?", "What is temporary?", "What is absent?", "What surprises you?"].map((q, i) => (
            <div key={i} style={{ borderRight: "1px solid rgba(0,0,0,0.15)", borderBottom: "1px solid rgba(0,0,0,0.15)", padding: "14px 12px", fontFamily: "Georgia, serif", fontSize: 16, fontStyle: "italic", color: "#1a1a1a", lineHeight: 1.5 }}>
              {q}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flexShrink: 0, height: FTR_H, borderTop: B_OUTER, display: "grid", gridTemplateColumns: "1fr 2fr 1fr", background: "#fff" }}>
        {/* Arrow — fills cell, TE-style */}
        <div onClick={onBack} style={{ display: "flex", alignItems: "flex-start", justifyContent: "center",
          paddingTop: 20, borderRight: B_INNER, cursor: "pointer", minWidth: 0, overflow: "hidden" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </div>
        {/* Location + date — 50% */}
        <div style={{ display: "flex", alignItems: "flex-start", paddingTop: 20, paddingLeft: 12, borderRight: B_INNER, minWidth: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(0,0,0,0.45)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1 }}>
              {location}
            </span>
            <span style={{ fontSize: 11, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(0,0,0,0.3)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1 }}>
              {timeStr}&ensp;{dateStr}
            </span>
          </div>
        </div>
        {/* Copy icon — centred, same as arrow */}
        <div onClick={onCopy} title="copy brief"
          style={{ display: "flex", alignItems: "flex-start",
            justifyContent: "center", paddingTop: 20,
            cursor: "pointer", opacity: copied ? 1 : 0.45, transition: "opacity .2s",
            minWidth: 0, overflow: "hidden" }}>
          {copied ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </div>
      </div>

      <style>{"@keyframes daBlink { 0%,100%{opacity:.9} 50%{opacity:0} }"}</style>
    </div>
  );
}

export default function App() {
  const [selCue, setSelCue] = useState(null);
  const [selContour, setSelContour] = useState(null);
  const [openWord, setOpenWord] = useState(null);
  const [screen, setScreen] = useState("theory");
  const [showInfo, setShowInfo] = useState(false);
  const scrollRef = useRef(null);

  const tapWord = useCallback((word) => {
    const isSelected = word === selCue || word === selContour;
    const isOpen = word === openWord;
    const scroll = scrollRef.current;

    if (!isSelected) {
      let anchorTopBefore = null;
      if (openWord && scroll) {
        const tEl = document.getElementById("cell-" + word);
        if (tEl) anchorTopBefore = tEl.getBoundingClientRect().top;
      }
      if (isCue(word)) setSelCue(word); else setSelContour(word);
      setOpenWord(null);
      if (anchorTopBefore !== null && scroll) {
        requestAnimationFrame(() => {
          const tEl = document.getElementById("cell-" + word);
          if (tEl) {
            const anchorTopAfter = tEl.getBoundingClientRect().top;
            scroll.scrollTop += (anchorTopAfter - anchorTopBefore);
          }
        });
      }
    } else if (!isOpen) {
      setOpenWord(word);
    } else {
      setOpenWord(null);
    }
  }, [selCue, selContour, openWord]);

  // No auto-scroll when drawer opens. The tapped cell stays in place;
  // the drawer pushes content below it down. If the drawer extends past
  // the bottom of the visible area, the user can scroll manually.

  const bothSelected = selCue && selContour;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#fff", display: "flex", flexDirection: "column",
      fontFamily: "'DM Sans', sans-serif", WebkitFontSmoothing: "antialiased",
      paddingTop: "env(safe-area-inset-top)",
      paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}>

      {/* HEADER */}
      <div style={{ flexShrink: 0, height: HDR_H, borderBottom: B_OUTER, display: "grid", gridTemplateColumns: "1fr 1px 1fr", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "flex-start", paddingLeft: 18, paddingTop: 20,
          fontSize: 18, letterSpacing: ".06em", textTransform: "uppercase",
          fontWeight: 500, color: "#1a1a1a", minWidth: 0 }}>
          Design Actions
        </div>
        <div style={{ background: "rgba(0,0,0,0.15)" }} />
        <div onClick={() => setShowInfo(v => !v)}
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr",
            cursor: "pointer", minWidth: 0 }}>
          <div />
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center",
            paddingTop: 22,
            fontFamily: "Georgia, serif", fontSize: 20, color: "#1a1a1a" }}>
            i
          </div>
        </div>
      </div>

      {/* WORD GRID */}
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {PAIR_GROUPS.flatMap((pairs, gi) => {
            const items = [];
            if (gi > 0) {
              items.push(
                <div key={"div-" + gi} style={{ gridColumn: "1 / -1", height: 1, background: "rgba(0,0,0,0.15)" }} />
              );
            }
            pairs.forEach(([cue, contour]) => {
              const showDrawer = openWord === cue || openWord === contour;
              items.push(
                <div key={"cue-" + cue} id={"cell-" + cue}>
                  <Cell word={cue} selCue={selCue} selContour={selContour} openWord={openWord} onTap={tapWord} />
                </div>
              );
              items.push(
                <div key={"con-" + contour} id={"cell-" + contour}>
                  <Cell word={contour} selCue={selCue} selContour={selContour} openWord={openWord} onTap={tapWord} />
                </div>
              );
              if (showDrawer) {
                items.push(<Drawer key={"drawer-" + openWord} word={openWord} />);
              }
            });
            return items;
          })}
        </div>
      </div>

      {/* FOOTER — 4 equal grid columns at exactly 25% each */}
      <div style={{ flexShrink: 0, height: FTR_H, borderTop: B_OUTER, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#fff" }}>
        {/* ✕ — classic, centred */}
        <div onClick={() => { setSelCue(null); setSelContour(null); setOpenWord(null); }}
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "center",
            paddingTop: 20, borderRight: B_INNER, cursor: "pointer", minWidth: 0 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        {/* CUE */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start",
          justifyContent: "flex-start", paddingTop: 20, paddingLeft: 10, paddingRight: 4,
          borderRight: B_INNER, overflow: "hidden", minWidth: 0 }}>
          <span style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase",
            color: "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1, whiteSpace: "nowrap" }}>
            {selCue ? "CUE " + (CUES.indexOf(selCue) + 1) : "CUE"}
          </span>
          {selCue ? (
            <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.01em",
              fontFamily: "'DM Sans', sans-serif", marginTop: 5, lineHeight: 1,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
              {selCue}
            </span>
          ) : null}
        </div>
        {/* CONTOUR */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start",
          justifyContent: "flex-start", paddingTop: 20, paddingLeft: 10, paddingRight: 4,
          borderRight: B_INNER, overflow: "hidden", minWidth: 0 }}>
          <span style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase",
            color: "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1, whiteSpace: "nowrap" }}>
            {selContour ? "CONTOUR " + (CONTOURS.indexOf(selContour) + 1) : "CONTOUR"}
          </span>
          {selContour ? (
            <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.01em",
              fontFamily: "'DM Sans', sans-serif", marginTop: 5, lineHeight: 1,
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", width: "100%" }}>
              {selContour}
            </span>
          ) : null}
        </div>
        {/* HERE·NOW — circle button, TE-style */}
        <div onClick={() => bothSelected && setScreen("brief")}
          style={{ display: "flex", alignItems: "flex-start", justifyContent: "center",
            paddingTop: 0, cursor: bothSelected ? "pointer" : "not-allowed", minWidth: 0, overflow: "hidden" }}>
          <div style={{
            width: "100%", aspectRatio: "1", borderRadius: "50%",
            background: bothSelected ? "#1a1a1a" : "transparent",
            border: bothSelected ? "none" : "1px solid rgba(0,0,0,0.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background .2s, border .2s", marginTop: 0,
            maxHeight: FTR_H
          }}>
            <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase",
              color: bothSelected ? "#fff" : "rgba(0,0,0,0.3)",
              fontFamily: "'DM Sans', sans-serif", lineHeight: 1, whiteSpace: "nowrap",
              textAlign: "center" }}>
              here&middot;now
            </span>
          </div>
        </div>
      </div>

      {/* BRIEF PAGE */}
      {screen === "brief" ? (
        <BriefPage selCue={selCue} selContour={selContour} onBack={() => setScreen("theory")} />
      ) : null}

      {/* INFO OVERLAY */}
           {showInfo ? (
        <div onClick={() => setShowInfo(false)}
          style={{ position: "absolute", top: HDR_H, left: 0, right: 0, bottom: 0,
            background: "#fff", overflowY: "auto", borderTop: B_OUTER, zIndex: 100,
            padding: "32px 0 60px" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 19, lineHeight: 1.7, color: "#1a1a1a", marginBottom: 22, padding: "0 24px" }}>
            Design Actions is a toolkit to help engage complex challenges.
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 19, lineHeight: 1.7, color: "#1a1a1a", marginBottom: 22, padding: "0 24px" }}>
            Fifteen <em>cues</em> — verbs that activate inquiry — and fifteen <em>contours</em> — nouns
            that frame the terrain of action. Tap one to select. Tap again to read the description.
            Tap ✕ to clear. Pair a cue and a contour to activate the <em>here&middot;now</em> prompt:
          </p>
          <div style={{ marginBottom: 22 }}>
            <div style={{ borderTop: B_INNER, borderLeft: B_INNER, borderRight: B_INNER }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: B_OUTER }}>
                <div style={{ height: 64, background: "#BEBEAA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 500, letterSpacing: "-.02em", fontFamily: "'DM Sans', sans-serif" }}>sense</div>
                <div style={{ height: 64, background: "#BEBEAA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 500, letterSpacing: "-.02em", fontFamily: "'DM Sans', sans-serif" }}>lifeworlds</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
                <div style={{ borderRight: B_INNER, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 0" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
                <div style={{ borderRight: B_INNER, display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "14px 0 0 8px" }}>
                  <span style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1 }}>CUE</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.01em", marginTop: 4, lineHeight: 1, fontFamily: "'DM Sans', sans-serif" }}>sense</span>
                </div>
                <div style={{ borderRight: B_INNER, display: "flex", flexDirection: "column", justifyContent: "flex-start", padding: "14px 0 0 8px" }}>
                  <span style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1 }}>CONTOUR</span>
                  <span style={{ fontSize: 13, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-.01em", marginTop: 4, lineHeight: 1, fontFamily: "'DM Sans', sans-serif" }}>lifeworlds</span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
                  <div style={{ width: 88, height: 88, borderRadius: "50%", background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "#fff", textAlign: "center", lineHeight: 1.4 }}>
                      here&middot;now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 19, lineHeight: 1.7, color: "#1a1a1a", marginBottom: 28, padding: "0 24px" }}>
            This will generate a situated brief for action on the next page. Use the arrow to return to the word list and explore again.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(0,0,0,0.38)", letterSpacing: ".04em", lineHeight: 1.8, padding: "0 24px" }}>
            Stephen Cairns &middot; David Neudecker<br />
            Joshua Vargas &middot; Denise Lee<br />
            beta &middot; location data &copy; OpenStreetMap
          </p>
        </div>
      ) : null}
    </div>
  );
}
