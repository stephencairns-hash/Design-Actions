import { useState, useEffect, useRef, useCallback } from "react";

const COLORS = ["#BEBEAA", "#5AA8F2", "#D94F28", "#7DD4C0", "#848095"];
const CUES = ["sense", "describe", "recognise", "analyse", "interpret", "evaluate", "spark", "mull", "imagine", "craft", "configure", "cultivate", "empower", "inform", "inspire"];
const CONTOURS = ["lifeworlds", "needs", "aspirations", "evidence", "constraints", "potentials", "ideas", "concepts", "scenarios", "media", "forms", "ecologies", "participants", "stakeholders", "coalitions"];
const PAIR_GROUPS = [[["sense", "lifeworlds"], ["describe", "needs"], ["recognise", "aspirations"]], [["analyse", "evidence"], ["interpret", "constraints"], ["evaluate", "potentials"]], [["spark", "ideas"], ["mull", "concepts"], ["imagine", "scenarios"]], [["craft", "media"], ["configure", "forms"], ["cultivate", "ecologies"]], [["empower", "participants"], ["inform", "stakeholders"], ["inspire", "coalitions"]]];
const WORDS = {"sense": {"strap": "Sense the world even as you make sense of it", "desc": "Sense through the body and through technology, tuning into the raw flow before categorisation sets in. Our senses—sight, sound, touch, smell, and taste—bring a flood of stimuli, always mediated by memory, culture, and language. Yet practice can sharpen awareness: moving, reaching, circling, attending actively rather than waiting passively.\n\nTechnologies extend this reach, from the phone in a pocket to satellites orbiting overhead. Each expands perception while also shaping it. Sense, then, is both immediate and mediated: a bodily practice of investigation and a technological condition of access.\n\nEnter the world attentively, recognising how perception is always filtered yet still capable of surprise. Sensing deepens not by reducing mediation, but by becoming more conscious of the filters through which the world arrives."}, "describe": {"strap": "Translate perception into shared, partial accounts", "desc": "Describe to render experience communicable: shaping what you observe so others can encounter it too. Words, sketches, photographs, and measurements are not neutral—they shape what they record, highlighting some details while obscuring others.\n\nGood description is modest, dwelling on textures and specifics that might otherwise be overlooked. It is skilled, requiring practice to make observations intelligible. And it is aware, recognising how media and perspective filter what is conveyed. Description accepts that perception and expression are intertwined.\n\nMake visible what might be missed, opening encounters so that others can see, hear, and feel differently. Description also multiplies perspectives: when several accounts are placed together, we see not uniformity but a richer sense of difference. Describe with the awareness that every account is partial, yet capable of inviting dialogue."}, "recognise": {"strap": "Acknowledge the familiar and the unfamiliar", "desc": "Recognise to connect perception with memory, bringing the past into the present. Recognition can reassure, but it can also unsettle, showing how the familiar never returns unchanged—a street revisited, a face encountered across difference, a practice that looks familiar until it doesn't.\n\nRecognition also extends outward, acknowledging the unfamiliar—those shaped by other histories and other worlds. This act is reciprocal: how we recognise others shapes how they appear to us, and how they might come to see themselves.\n\nRecognise as both cognitive and ethical practice: an act of acknowledgment that carries consequences. Keep perception open, making room for difference while situating yourself in relation. Recognising is active, not passive: it requires attentiveness to what echoes and what resists. Hold together familiarity and difference, sustaining the tension rather than resolving it."}, "analyse": {"strap": "Reveal hidden structures", "desc": "Analyse to probe beneath surface appearances, uncovering how things are shaped, patterned, or made to function. Analysis disrupts habit by loosening everyday ways of seeing, treating phenomena as composites rather than givens.\n\nUnpack elements and relations—like examining both the contents of a box and its design. Use cuts, maps, or samples to reveal what cannot be directly observed. Shift scale: zoom in to detail or out to systemic pattern. When phenomena are dynamic, track symptoms or signals that hint at underlying structures.\n\nWhether through dissection, mapping, or inference, the aim is the same: to reveal what ordinary perception conceals. Analyse to generate clarity through methodical exposure of form and function."}, "interpret": {"strap": "Shape meaning in context", "desc": "Interpret to move from description to significance, asking why findings matter. Interpretation works by situating what is observed within wider frames—historical, cultural, conceptual—so that it resonates beyond its immediate context.\n\nIt links elements that analysis might leave isolated, tracing patterns and implications that only become visible in relation. Across fields, interpretation is how observations are made sense of: weaving data into narratives, symbols into cultural insight, or lived experience into shared understanding.\n\nInterpret with the awareness that meaning is not fixed by a single perspective but emerges through dialogue, shaped by standpoint, language, and exchange. Build bridges between observation and understanding, transforming what is seen into what is significant."}, "evaluate": {"strap": "Assess worth and impact", "desc": "Evaluate by judging quality and effect, weighing evidence against criteria and context. Unlike interpretation, which explores meaning, evaluation addresses value: asking what works, for whom, and to what extent.\n\nAppraise strengths and limitations, reliability and relevance, immediate outcomes and longer-term consequences. Evaluation is also comparative: setting alternatives alongside each other to clarify priorities and trade-offs. It applies as much to a prototype as to a program or a policy, guiding choices about what should move forward.\n\nGood evaluation draws on multiple forms of evidence—quantitative and qualitative, objective measures and lived experience—testing them against both goals and values. Evaluation is consequential: to declare something valuable is to shape what is carried forward and what is left behind, guiding decisions about where to act next."}, "spark": {"strap": "Bring beginnings into view", "desc": "Spark to bring potential into view, initiating movement where there was none. Beginnings are often slight and multiple, emerging as tentative connections or shifts in attention. A spark is rarely enough on its own: it depends on conditions—timing, attention, proximity—for something to take hold and develop.\n\nSparking is not only about sudden insight. It also involves preparing the ground: arranging elements so that connections can occur, noticing which beginnings persist and which fade. Most do not endure, but each attempt sharpens judgment about what can be carried forward.\n\nSpark by attending to early signals—what gathers force, what dissipates, and why. It is less about waiting for inspiration than about creating the conditions in which something can begin and be sustained."}, "mull": {"strap": "Let things settle and turn", "desc": "Mull by working beneath the surface of directed thought, creating space for things to settle, sediment, and reorganise. Unlike rapid analysis or snap judgement, mulling requires suspension—time for possibilities to deepen before they can be clearly formed.\n\nThis is not passivity but patience: a practice of returning, circling, and allowing patterns to emerge. Resist the compulsion for quick clarity and maintain a soft vigilance that lets connections surface when ready. The challenge is to distinguish fertile uncertainty from mere confusion, and productive delay from pointless postponement.\n\nMull to accumulate nuance, sensing how fragments belong together and how latent forms wait for conditions to shift. Some designs cannot be forced into view; they ripen through duration, until recognition arrives less as invention than as something disclosed."}, "imagine": {"strap": "See otherwise", "desc": "Imagine to stretch beyond what is given, projecting possibilities forward through as-if rehearsal. Work through structured play, moving ideas, images, and perspectives without the constraints of immediate utility.\n\nImagine well by shifting vantage points deliberately—inhabiting unfamiliar positions, adopting alternative frameworks, or projecting different scenarios. This mobility reveals that what seems fixed is contingent, and that current arrangements are only one option among many.\n\nImagination is not escape but preparation: it expands the repertoire of what might be tried, tested, or transformed. It requires looseness to let visions proliferate, and discipline to treat them as drafts for future practice. Imagine to refuse inevitability, generating material that unsettles assumptions and opens horizons for meaningful change."}, "craft": {"strap": "Shape with hand and mind", "desc": "Craft by joining skill with attention, creating through precision and care. It never begins from zero: every act draws on collective intelligence accumulated across apprenticeships, workshops, and traditions.\n\nCraft expresses both context and lineage—materials available, techniques developed, forms refined over generations. Craft well by understanding not only how to work something, but why methods evolved as they did and what they continue to carry. Repetition builds fluency, developing muscle memory that enables subtle manipulation while freeing thought for design decisions.\n\nTools extend intention, mediating between vision and matter. What emerges bears multiple signatures: the trace of the individual hand, the logic of material, and the weight of tradition. Craft to shape with care, extending lineages while making them your own."}, "configure": {"strap": "Set things in relation", "desc": "Configure to establish the logic by which elements connect and define each other. It makes the abstract operational, transforming loose possibilities into structured form. Unlike simple arrangement, this is architectural work—setting the rules that govern interaction.\n\nEach decision about relation propagates through the system, shaping both immediate adjacency and emergent pattern. Configure with systemic thinking and tactical precision, balancing intended outcomes with material constraints. Work across scales simultaneously: component detail, structural logic, overall coherence.\n\nConfigure to create frameworks that are both directive and adaptive—rules strong enough to hold yet flexible enough to respond. It determines not only form but how relations persist, adapt, or dissolve as conditions shift. Every configuration carries consequences: it privileges some connections while making others less visible, shaping whose relations endure and whose fall away."}, "cultivate": {"strap": "Tend over time", "desc": "Cultivate to prepare and sustain conditions through repeated return. This is systematic engagement rather than sudden intervention—the discipline of cycles: intervention, observation, adjustment, and return.\n\nSome elements demand constant tending; others thrive when left to establish their own rhythms. Cultivate with discernment, knowing what each situation requires and resisting uniform treatment. Build feedback loops between practitioner and practice, where each adjustment generates insight that reshapes the approach.\n\nThis is not passive patience but active care: deciding when to intervene and when to hold back. Growth is uneven—sometimes rapid, sometimes delayed—and not every effort will bear fruit. Cultivate to turn repetition into renewal, sustaining the conditions in which practices, projects, or ideas can take root and endure."}, "empower": {"strap": "Make room for agency", "desc": "Empower by making room—for judgment, for initiative, for capacities that are already present but constrained. In design and organisational work, this means shifting from expert-led decisions to shared authority: distributing resources, tools, and knowledge in ways that expand what people can do and become.\n\nEmpowering is not the same as delegating tasks; it requires trust, transparency, and a willingness to redistribute control. Provide enough structure for action while leaving space for independent judgment, so that participants can take ownership and extend what is possible.\n\nEmpowerment is not a gift bestowed but a practice of enabling—creating frameworks in which agency is exercised and multiplied. Agency does not need to be installed; it needs room."}, "inform": {"strap": "Frame knowledge so it travels", "desc": "Inform by giving knowledge the form it needs—rendering it relevant, usable, and able to move across contexts, communities, and practices. In research and practice, this is not passive transmission but an active process of shaping information so it matters.\n\nIt requires clarity, audience awareness, and purpose: cutting through noise to provide scaffolding for judgment and action. Inform well by contextualising—aligning knowledge with the needs of decision-makers, practitioners, or communities. This involves translation, not simplification: preserving complexity where it matters while making insights usable.\n\nInform iteratively, adapting as feedback from those who act on information reshapes how it is shared. Informing is less about delivering facts and more about enabling understanding that can be interrogated, adapted, and applied. Inform to connect evidence with action, so knowledge shapes practice rather than remaining inert."}, "inspire": {"strap": "Breathe energy into possibility", "desc": "Inspire by generating energy that moves others to act or create. It is not instruction but invitation: shifting perception and opening horizons that feel possible and desirable.\n\nIn practice, inspiration works through resonance and surprise—a story, an example, a juxtaposition that unsettles the obvious and points beyond the present. Inspire well by offering cues without prescribing outcomes, leaving space for others to make meaning and act in their own way. In design and education, this creates conditions for exploration, seeding alternatives that invite elaboration.\n\nInspiration does not end at the initial impulse; it endures when its energy is carried forward, amplified, and reshaped by others. Inspire to transmit energy rather than instruction, creating conditions where momentum can gather and sustain. What inspires is what travels."}, "lifeworlds": {"strap": "The complex whole of lived relations", "desc": "Lifeworlds are the shifting weave of everyday life as it is lived and made meaningful. They include streets, homes, and routines, but also habits, symbols, and shared values that hold communities together.\n\nLifeworlds are never purely human: they are shaped by animals, plants, infrastructures, and technologies that sustain or constrain activity. Experience is always entangled—human and nonhuman, familiar and strange—woven together in patterns that cannot be reduced to single parts.\n\nTo enter a lifeworld is to step into complexity, sensing how people and other beings inhabit and interpret environments in overlapping, sometimes conflicting ways. Lifeworlds remind us that to inhabit a world is always to share it—with others whose presence shapes what is possible, and with forces whose threads we sense but cannot always follow."}, "needs": {"strap": "Conditions required to live well", "desc": "Needs are the conditions required for people and communities to live with dignity. Some are immediate—food, water, shelter, safety—while others sustain longer-term well-being: care, belonging, meaningful work, education, and a stable environment.\n\nNeeds are not only physical but also social, cultural, and emotional. They vary across contexts yet mark thresholds for survival and flourishing. They are interdependent: meeting one often depends on supporting others, while neglect can undermine the whole.\n\nNeeds are also contested: whose needs are prioritised, who defines them, and what happens when resources are scarce? They shift over time—what is essential in one generation may be insufficient in the next. Urgent needs can weigh against future aspirations, constraining what people feel able to pursue.\n\nNeeds remind us that design must address what sustains life while enabling conditions for growth beyond the basics."}, "aspirations": {"strap": "Hopes that point beyond the present", "desc": "Aspirations are hopes and ambitions that point beyond the present. They express what people and communities want to achieve, become, or contribute, extending beyond immediate needs into visions of what might be.\n\nAspirations may be personal—linked to growth, creativity, or success—or collective, tied to shared progress or social change. They give purpose and direction, motivating effort toward what matters most. Yet they are never fixed: they shift with circumstances, opportunities, and cultural expectations.\n\nAspirations are shaped unequally. Some communities have greater resources and freedoms to aspire than others. They are influenced by what societies signal is possible, and constrained when pressing needs remain unmet. They are not simply individual desires but socially embedded, opening questions about which futures are pursued, by whom, and for whose benefit.\n\nAspirations remind us that life is lived forward, even when hopes collide with present necessities."}, "evidence": {"strap": "Grounds for knowledge and credibility", "desc": "Evidence is the material that supports conclusions, showing why an observation or account should be taken seriously. It may be quantitative—numbers, measurements, statistics—or qualitative—descriptions, testimonies, observations.\n\nEvidence is never raw: it is gathered, selected, and presented through methods that shape what counts as credible. It may be historical, tracing patterns across time, or ethnographic, capturing lived experience. Collection does not end the process; it raises questions about what is included and what is left out.\n\nStrong evidence is not only accurate but also relevant to the questions at hand. Weak or partial evidence can still be useful if its limits are acknowledged. Evidence provides grounding, but it also invites challenge: what counts, for whom, and in what context?"}, "constraints": {"strap": "Limits that define and shape", "desc": "Constraints are the limits within which work and life take place. They can be physical—space, time, resources—or conceptual—rules, conventions, or standards.\n\nConstraints may feel restrictive, yet they also give definition, forcing choices and sharpening focus. They set horizons of what is possible, determining not only what can be done but also what cannot. Some are rigid and unavoidable, while others are negotiable or even productive, prompting new ways of thinking.\n\nConstraints also mark where caution is needed: outcomes hold only within the boundaries they set. Understanding them is as much about recognising opportunities as recognising limits. Constraints remind us that freedom is never absolute—it is always framed by conditions that shape what emerges."}, "potentials": {"strap": "Capacities not yet unfolded", "desc": "Potentials are latent capacities, qualities, or resources that could be activated under the right conditions. They may exist as untapped skills, unused materials, unrecognised connections, or dormant energies.\n\nUnlike outcomes, potentials are not yet fixed; they hold multiple possible futures. They require both imagination and grounding: seeing beyond the present while remaining attentive to what could plausibly develop. In social contexts, they point toward futures a community may aspire to, even if not yet achievable.\n\nPotentials are fragile. They can be overlooked, ignored, or wasted if conditions do not support their growth, and may fade if neglected, closing off futures that once seemed possible. Potentials remind us to attend not only to what exists, but also to what might still become."}, "ideas": {"strap": "Openings that reveal possibilities", "desc": "Ideas are brief shifts in thought that reveal what might be possible. They often arise suddenly, bringing connections or patterns into view and suggesting directions not previously visible. In their earliest sense, ideas were forms or appearances—the shapes through which something is first grasped. They still work that way: recognitions of underlying patterns that give form to what was vague or unseen.\n\nAn idea is not yet a solution but a beginning—often slight, provisional, and one among many. Some emerge from reframing the familiar, others from noticing what has been overlooked. Their value lies not in completeness but in the movement they initiate, pointing forward, however tentatively.\n\nIdeas remind us that creativity rarely begins with answers but with shifts that open new lines of thought. Many do not endure. Left unattended, they fade; carried forward, they may take shape as concepts."}, "concepts": {"strap": "Structures that organise meaning", "desc": "Concepts are the tools we use to organise the world. They group phenomena, reveal patterns, and frame relationships that help us make sense of complexity. The term carries the sense of \\u201cgrasping together\\u201d—holding things in relation so they can be thought and worked with.\n\nUnlike ideas, which may be fleeting, concepts are more enduring. They stabilise thought, provide shared language, and make communication possible. Yet they are never neutral: they highlight some aspects of reality while obscuring others, shaping both what we notice and how we act.\n\nConcepts evolve through use, refined when they clarify and abandoned when they constrain. A good concept is rigorous enough to be tested yet generative enough to support further invention. They remind us that understanding is always mediated through the lenses we build. When concepts harden, they can limit imagination; when kept flexible, they can frame scenarios."}, "scenarios": {"strap": "Stories that open possible futures", "desc": "Scenarios are sketches of how futures might unfold, outlining scenes in which different actors, conditions, and contexts interact. In theatre, a scenario was a rough outline of action and characters—not a full script, but a frame for improvisation.\n\nIn the same way, scenarios in design, policy, or foresight are not predictions but explorations. They show how trends, decisions, and disruptions might combine to produce multiple outcomes. Often contrasting alternatives, they make consequences visible and open to comparison.\n\nScenarios give form to uncertainty by making it discussable, allowing groups to test assumptions and prepare for change. They work best when treated as provisional—drafts to be rehearsed, compared, and revised. Futures are never singular but multiple, shaped by shifting contexts and choices. By sketching futures, scenarios can unsettle established concepts and open new lines of thought."}, "media": {"strap": "Mediums through which design works", "desc": "Media are the instruments and channels through which design takes shape at a distance from the thing itself. Architects use drawings, models, and digital renderings long before a building is realised; landscape designers work with plans and simulations before earth is moved.\n\nMedia extend beyond the human hand and eye: sensors register air quality, satellites capture landscapes, machines map flows. None are neutral. Each frames what can be seen, tested, or valued, highlighting some possibilities while obscuring others.\n\nThey extend perception and make design communicable, but also impose their own logics. A sketch invites improvisation, a 3D model suggests fixity, a diagram abstracts function. Working across media means translating between these affordances, never escaping the gap between representation and reality. Design is always mediated, acting through frames that shape both process and outcome."}, "forms": {"strap": "Structures that order and affect life", "desc": "Forms are the structures and patterns that give order to what we encounter. They operate as systems of organisation—geometries, typologies, layouts—but also carry force in how they move, attract, or repel.\n\nForms elicit responses: they can be beautiful, elegant, charming, awkward, even unsettling. These reactions are not trivial but part of how forms act in the world, shaping attention and behaviour as much as function. They are never pure; they are conditioned by conventions, histories, and technologies that guide what feels appropriate or desirable.\n\nForms are not solely human concerns. They shape habitats, species interactions, and technological arrangements as much as they influence cultural taste. To work with form is to engage both structure and response, balancing order with resonance, system with sensibility. No pattern stands alone—every form acts within wider ecologies of life."}, "ecologies": {"strap": "Relations that sustain and transform life", "desc": "Ecologies are interdependent systems through which forms and lives connect. They are not single entities but webs of relations linking elements through flows of energy, material, and meaning.\n\nIn natural systems, ecologies describe interactions between species and environments; in design, they extend to infrastructures, technologies, and cultural practices that sustain or disrupt conditions of living. Nothing exists in isolation: every intervention shifts dependencies, enabling some possibilities while foreclosing others.\n\nEcologies demand attention to scale and feedback—how local changes ripple outward and how accumulated effects return. To think ecologically is to see design as part of larger patterns, functional and symbolic, biological and cultural. They remind us that design exceeds what can be fully represented or ordered, unfolding within wider systems of relation."}, "participants": {"strap": "Those who take part directly", "desc": "Participants are those actively involved in a process, project, or event. The term is broad: it can refer to individuals, groups, or organisations shaping an activity.\n\nParticipation varies in degree and intensity—from attending or providing input to co-creating, deciding, or implementing. What matters is engagement: participants are not outside observers, but contributors within a defined process. Involvement may be fleeting or sustained, informed or constrained, voluntary or imposed, enthusiastic or reluctant.\n\nThe quality of participation often shapes the quality of outcomes, as those most directly involved bring perspectives others may overlook. No process is abstract; it is always enacted through those who take part. Participation may also extend beyond humans, as technologies, species, or environments shape how a process unfolds."}, "stakeholders": {"strap": "Those who hold an interest or stake", "desc": "Stakeholders are those with a recognised interest in the outcome of a project, decision, or system. A stake may be direct—financial, professional, personal—or indirect, such as environmental impact, cultural value, or reputational risk.\n\nThey may be individuals, communities, organisations, or institutions, and not all have equal power to assert their claims. Some are formally acknowledged and invited into processes of consultation or negotiation; others remain overlooked or excluded until they make their interests visible.\n\nStakeholders can support, resist, or reshape outcomes depending on how their interests align or clash. Every project sits within a wider field of claims and consequences, where interests intersect. Stakes are not only human: other species, ecosystems, and technologies are also implicated, even if their interests must be represented or translated by others."}, "coalitions": {"strap": "Alliances formed around shared cause", "desc": "Coalitions are alliances of actors who come together to pursue a common goal. They may be temporary or enduring, formal or informal, small or broad.\n\nThey often form when individual efforts are insufficient and collective strength is needed to amplify voice, pool resources, or coordinate action. Members may not share all interests, but find common ground in a cause that outweighs their differences.\n\nCoalitions can be fragile—held together by trust, reciprocity, and ongoing negotiation—yet also powerful in shaping agendas and shifting systems. Lasting change often depends less on isolated effort than on how alliances are built, maintained, and transformed. Coalitions may extend beyond the human, drawing in technologies, environments, or more-than-human actors whose presence reshapes the field of alliance."}};

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
        fetch("https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lon + "&format=json")
          .then(r => r.json())
          .then(data => {
            const a = data.address || {};
            const place = a.neighbourhood || a.suburb || a.village || a.town || a.city || a.county || (lat + ", " + lon);
            setLocation(place); setReady(true);
          })
          .catch(() => { setLocation(lat + ", " + lon); setReady(true); });
      },
      () => { setReady(true); }
    );
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff", display: "flex", flexDirection: "column", zIndex: 50 }}>
      <div style={{ flexShrink: 0, height: HDR_H, borderBottom: B_OUTER, display: "flex", alignItems: "stretch", background: "#fff" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-start", paddingLeft: 18, paddingTop: 20, borderRight: B_INNER, fontSize: 18, letterSpacing: ".06em", textTransform: "uppercase", fontWeight: 500, color: "#1a1a1a", fontFamily: "'DM Sans', sans-serif" }}>
          Design Actions
        </div>
        <div style={{ flex: 1 }} />
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
        <p style={{ fontSize: 22, fontStyle: "italic", lineHeight: 1.6, fontFamily: "Georgia, serif", color: "#1a1a1a", opacity: 0.9, marginBottom: 28 }}>
          {cueCapital} {selContour} in {location} at {timeStr}, {dateStr}.
          {!ready ? <span style={{ animation: "daBlink 1.6s ease-in-out infinite", fontSize: 18, marginLeft: 3, fontWeight: 200 }}>|</span> : null}
        </p>
        <p style={{ fontSize: 19, fontFamily: "Georgia, serif", lineHeight: 1.7, color: "#1a1a1a", opacity: 0.4, fontStyle: "italic" }}>
          Brief generating&hellip;
        </p>
      </div>

      <div style={{ flexShrink: 0, height: FTR_H, borderTop: B_OUTER, display: "grid", gridTemplateColumns: "1fr 2fr 1fr", background: "#fff" }}>
        {/* Arrow — 25% */}
        <div onClick={onBack} style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 20, borderRight: B_INNER, cursor: "pointer", minWidth: 0 }}>
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
        {/* Copy icon — 25% */}
        <div onClick={onCopy} title="copy brief"
          style={{ display: "flex", alignItems: "flex-start",
            justifyContent: "center", paddingTop: 20,
            cursor: "pointer", opacity: copied ? 1 : 0.5, transition: "opacity .2s", minWidth: 0 }}>
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

  useEffect(() => {
    const scroll = scrollRef.current;
    if (openWord && scroll) {
      const t = setTimeout(() => {
        const el = document.getElementById("cell-" + openWord);
        if (el && scroll) {
          const offset = el.getBoundingClientRect().top - scroll.getBoundingClientRect().top;
          scroll.scrollBy({ top: offset, behavior: "smooth" });
        }
      }, 40);
      return () => clearTimeout(t);
    }
  }, [openWord]);

  const bothSelected = selCue && selContour;

  return (
    <div style={{ position: "fixed", inset: 0, background: "#fff", display: "flex", flexDirection: "column",
      fontFamily: "'DM Sans', sans-serif", WebkitFontSmoothing: "antialiased",
      paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}>

      {/* HEADER */}
      <div style={{ flexShrink: 0, height: HDR_H, borderBottom: B_OUTER, display: "flex", alignItems: "stretch", background: "#fff" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-start", paddingLeft: 18, paddingTop: 20,
          borderRight: B_INNER, fontSize: 18, letterSpacing: ".06em", textTransform: "uppercase",
          fontWeight: 500, color: "#1a1a1a" }}>
          Design Actions
        </div>
        <div onClick={() => setShowInfo(v => !v)}
          style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
            paddingRight: 18, paddingTop: 20, fontFamily: "Georgia, serif",
            fontSize: 22, color: "#1a1a1a", cursor: "pointer" }}>
          i
        </div>
      </div>

      {/* WORD GRID */}
      <div ref={scrollRef} style={{ flex: 1, minHeight: 0, overflowY: "auto", WebkitOverflowScrolling: "touch", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {PAIR_GROUPS.map((pairs, gi) => (
            <div key={gi} style={{ display: "contents" }}>
              {gi > 0 ? <div style={{ gridColumn: "1 / -1", height: 1, background: "rgba(0,0,0,0.15)" }} /> : null}
              {pairs.map(([cue, contour]) => {
                const showDrawer = openWord === cue || openWord === contour;
                return (
                  <div key={cue} style={{ display: "contents" }}>
                    <div id={"cell-" + cue}>
                      <Cell word={cue} selCue={selCue} selContour={selContour} openWord={openWord} onTap={tapWord} />
                    </div>
                    <div id={"cell-" + contour}>
                      <Cell word={contour} selCue={selCue} selContour={selContour} openWord={openWord} onTap={tapWord} />
                    </div>
                    {showDrawer ? <Drawer word={openWord} /> : null}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER — 4 equal grid columns at exactly 25% each */}
      <div style={{ flexShrink: 0, height: FTR_H, borderTop: B_OUTER, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#fff" }}>
        {/* ✕ */}
        <div onClick={() => { setSelCue(null); setSelContour(null); setOpenWord(null); }}
          style={{ display: "flex", alignItems: "flex-start",
            justifyContent: "center", paddingTop: 20, borderRight: B_INNER, cursor: "pointer", minWidth: 0 }}>
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
        {/* HERE·NOW */}
        <div onClick={() => bothSelected && setScreen("brief")}
          style={{ display: "flex", flexDirection: "column", alignItems: "flex-start",
            justifyContent: "flex-start", paddingTop: 20, paddingLeft: 10,
            background: bothSelected ? "#1a1a1a" : "#fff",
            cursor: bothSelected ? "pointer" : "not-allowed", transition: "background .2s", minWidth: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".12em", textTransform: "uppercase",
            color: bothSelected ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)",
            fontFamily: "'DM Sans', sans-serif", lineHeight: 1, whiteSpace: "nowrap" }}>
            here&middot;now
          </span>
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
            padding: "32px 24px 60px" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 19, lineHeight: 1.7, color: "#1a1a1a", marginBottom: 22 }}>
            Design Actions is a toolkit to help engage complex challenges.
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 19, lineHeight: 1.7, color: "#1a1a1a", marginBottom: 28 }}>
            Fifteen <em>cues</em> — verbs that activate inquiry — and fifteen <em>contours</em> — nouns
            that frame the terrain of action. Tap one to select it. Tap again to read its description.
            Pair a cue and a contour to activate the{" "}
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
              letterSpacing: ".1em", textTransform: "uppercase", border: "1px solid #1a1a1a",
              padding: "2px 8px" }}>here&middot;now</span>
            {" "}prompt, generating a situated brief for action. Use the arrow to return to the word list and explore again.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(0,0,0,0.38)", letterSpacing: ".04em", lineHeight: 1.8 }}>
            Stephen Cairns &middot; David Neudecker<br />
            Joshua Vargas &middot; Denise Lee<br />
            beta &middot; Design Issues &middot; MIT Press
          </p>
        </div>
      ) : null}
    </div>
  );
}
