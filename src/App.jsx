import { useState } from "react";

const R = "18px";
const G = "2px";
const GL = "#ffffff";

const GROUPS = [
  { id: 1, label: "sense",   color: "#9aa89a", tint: "#dde0db", text: "#1a1a1a" },
  { id: 2, label: "analyse", color: "#8a95a8", tint: "#d8dce4", text: "#1a1a1a" },
  { id: 3, label: "imagine", color: "#b5a48a", tint: "#e5ddd0", text: "#1a1a1a" },
  { id: 4, label: "make",    color: "#9aaa9e", tint: "#d8e0db", text: "#1a1a1a" },
  { id: 5, label: "act",     color: "#8a96a8", tint: "#d4d8e0", text: "#1a1a1a" },
];
const getGroup = (id) => GROUPS.find(g => g.id === id);

// Natural companion lookup by item id
const NATURAL_PAIR = {
  "sense":"lifeworlds","describe":"needs","recognise":"aspirations",
  "analyse":"evidence","interpret":"constraints","evaluate":"potentials",
  "spark":"ideas","mull":"concepts","imagine":"scenarios",
  "craft":"media","configure":"forms","cultivate":"ecologies",
  "empower":"participants","inform":"stakeholders","inspire":"coalitions",
  "lifeworlds":"sense","needs":"describe","aspirations":"recognise",
  "evidence":"analyse","constraints":"interpret","potentials":"evaluate",
  "ideas":"spark","concepts":"mull","scenarios":"imagine",
  "media":"craft","forms":"configure","ecologies":"cultivate",
  "participants":"empower","stakeholders":"inform","coalitions":"inspire",
};


const rowPos = (i) => i === 0 ? "top" : i === 2 ? "bot" : "mid";

const cr = (pos, side) => {
  const tl = pos === "top" && side === "left"  ? R : "0";
  const tr = pos === "top" && side === "right" ? R : "0";
  const br = pos === "bot" && side === "right" ? R : "0";
  const bl = pos === "bot" && side === "left"  ? R : "0";
  return `${tl} ${tr} ${br} ${bl}`;
};
const fr = (pos) =>
  pos === "top" ? `${R} ${R} 0 0` : pos === "bot" ? `0 0 ${R} ${R}` : "0";

const getItemPos = (item, type) => {
  const list = type === "cue" ? CUES : CONTOURS;
  const gi = list.filter(x => x.group === item.group);
  return rowPos(gi.findIndex(x => x.id === item.id));
};

const CUES = [
  { id: "sense",     word: "sense",     group: 1, strap: "Sense the world even as you make sense of it", desc: "Sense through the body and through technology, tuning into the raw flow before categorisation sets in. Our senses--sight, sound, touch, smell, and taste--bring a flood of stimuli, always mediated by memory, culture, and language. Yet practice can sharpen awareness: moving, reaching, circling, attending actively rather than waiting passively.\n\nTechnologies extend this reach, from the phone in a pocket to satellites orbiting overhead. Each expands perception while also shaping it. Sense, then, is both immediate and mediated: a bodily practice of investigation and a technological condition of access.\n\nEnter the world attentively, recognising how perception is always filtered yet still capable of surprise. Sensing deepens not by reducing mediation, but by becoming more conscious of the filters through which the world arrives." },
  { id: "describe",  word: "describe",  group: 1, strap: "Translate perception into shared, partial accounts", desc: "Describe to render experience communicable: shaping what you observe so others can encounter it too. Words, sketches, photographs, and measurements are not neutral--they shape what they record, highlighting some details while obscuring others.\n\nGood description is modest, dwelling on textures and specifics that might otherwise be overlooked. It is skilled, requiring practice to make observations intelligible. And it is aware, recognising how media and perspective filter what is conveyed. Description accepts that perception and expression are intertwined.\n\nMake visible what might be missed, opening encounters so that others can see, hear, and feel differently. Description also multiplies perspectives: when several accounts are placed together, we see not uniformity but a richer sense of difference. Describe with the awareness that every account is partial, yet capable of inviting dialogue." },
  { id: "recognise", word: "recognise", group: 1, strap: "Acknowledge the familiar and the unfamiliar", desc: "Recognise to connect perception with memory, bringing the past into the present. Recognition can reassure, but it can also unsettle, showing how the familiar never returns unchanged--a street revisited, a face encountered across difference, a practice that looks familiar until it doesn't.\n\nRecognition also extends outward, acknowledging the unfamiliar--those shaped by other histories and other worlds. This act is reciprocal: how we recognise others shapes how they appear to us, and how they might come to see themselves.\n\nRecognise as both cognitive and ethical practice: an act of acknowledgment that carries consequences. Keep perception open, making room for difference while situating yourself in relation. Recognising is active, not passive: it requires attentiveness to what echoes and what resists. Hold together familiarity and difference, sustaining the tension rather than resolving it." },
  { id: "analyse",   word: "analyse",   group: 2, strap: "Reveal hidden structures", desc: "Analyse to probe beneath surface appearances, uncovering how things are shaped, patterned, or made to function. Analysis disrupts habit by loosening everyday ways of seeing, treating phenomena as composites rather than givens.\n\nUnpack elements and relations--like examining both the contents of a box and its design. Use cuts, maps, or samples to reveal what cannot be directly observed. Shift scale: zoom in to detail or out to systemic pattern. When phenomena are dynamic, track symptoms or signals that hint at underlying structures.\n\nWhether through dissection, mapping, or inference, the aim is the same: to reveal what ordinary perception conceals. Analyse to generate clarity through methodical exposure of form and function." },
  { id: "interpret", word: "interpret", group: 2, strap: "Shape meaning in context", desc: "Interpret to move from description to significance, asking why findings matter. Interpretation works by situating what is observed within wider frames--historical, cultural, conceptual--so that it resonates beyond its immediate context.\n\nIt links elements that analysis might leave isolated, tracing patterns and implications that only become visible in relation. Across fields, interpretation is how observations are made sense of: weaving data into narratives, symbols into cultural insight, or lived experience into shared understanding.\n\nInterpret with the awareness that meaning is not fixed by a single perspective but emerges through dialogue, shaped by standpoint, language, and exchange. Build bridges between observation and understanding, transforming what is seen into what is significant." },
  { id: "evaluate",  word: "evaluate",  group: 2, strap: "Assess worth and impact", desc: "Evaluate by judging quality and effect, weighing evidence against criteria and context. Unlike interpretation, which explores meaning, evaluation addresses value: asking what works, for whom, and to what extent.\n\nAppraise strengths and limitations, reliability and relevance, immediate outcomes and longer-term consequences. Evaluation is also comparative: setting alternatives alongside each other to clarify priorities and trade-offs. It applies as much to a prototype as to a program or a policy, guiding choices about what should move forward.\n\nGood evaluation draws on multiple forms of evidence--quantitative and qualitative, objective measures and lived experience--testing them against both goals and values. Evaluation is consequential: to declare something valuable is to shape what is carried forward and what is left behind, guiding decisions about where to act next." },
  { id: "spark",     word: "spark",     group: 3, strap: "Bring beginnings into view", desc: "Spark to bring potential into view, initiating movement where there was none. Beginnings are often slight and multiple, emerging as tentative connections or shifts in attention. A spark is rarely enough on its own: it depends on conditions--timing, attention, proximity--for something to take hold and develop.\n\nSparking is not only about sudden insight. It also involves preparing the ground: arranging elements so that connections can occur, noticing which beginnings persist and which fade. Most do not endure, but each attempt sharpens judgment about what can be carried forward.\n\nSpark by attending to early signals--what gathers force, what dissipates, and why. It is less about waiting for inspiration than about creating the conditions in which something can begin and be sustained." },
  { id: "mull",      word: "mull",      group: 3, strap: "Let things settle and turn", desc: "Mull by working beneath the surface of directed thought, creating space for things to settle, sediment, and reorganise. Unlike rapid analysis or snap judgement, mulling requires suspension--time for possibilities to deepen before they can be clearly formed.\n\nThis is not passivity but patience: a practice of returning, circling, and allowing patterns to emerge. Resist the compulsion for quick clarity and maintain a soft vigilance that lets connections surface when ready. The challenge is to distinguish fertile uncertainty from mere confusion, and productive delay from pointless postponement.\n\nMull to accumulate nuance, sensing how fragments belong together and how latent forms wait for conditions to shift. Some designs cannot be forced into view; they ripen through duration, until recognition arrives less as invention than as something disclosed." },
  { id: "imagine",   word: "imagine",   group: 3, strap: "See otherwise", desc: "Imagine to stretch beyond what is given, projecting possibilities forward through as-if rehearsal. Work through structured play, moving ideas, images, and perspectives without the constraints of immediate utility.\n\nImagine well by shifting vantage points deliberately--inhabiting unfamiliar positions, adopting alternative frameworks, or projecting different scenarios. This mobility reveals that what seems fixed is contingent, and that current arrangements are only one option among many.\n\nImagination is not escape but preparation: it expands the repertoire of what might be tried, tested, or transformed. It requires looseness to let visions proliferate, and discipline to treat them as drafts for future practice. Imagine to refuse inevitability, generating material that unsettles assumptions and opens horizons for meaningful change." },
  { id: "craft",     word: "craft",     group: 4, strap: "Shape with hand and mind", desc: "Craft by joining skill with attention, creating through precision and care. It never begins from zero: every act draws on collective intelligence accumulated across apprenticeships, workshops, and traditions.\n\nCraft expresses both context and lineage--materials available, techniques developed, forms refined over generations. Craft well by understanding not only how to work something, but why methods evolved as they did and what they continue to carry. Repetition builds fluency, developing muscle memory that enables subtle manipulation while freeing thought for design decisions.\n\nTools extend intention, mediating between vision and matter. What emerges bears multiple signatures: the trace of the individual hand, the logic of material, and the weight of tradition. Craft to shape with care, extending lineages while making them your own." },
  { id: "configure", word: "configure", group: 4, strap: "Set things in relation", desc: "Configure to establish the logic by which elements connect and define each other. It makes the abstract operational, transforming loose possibilities into structured form. Unlike simple arrangement, this is architectural work--setting the rules that govern interaction.\n\nEach decision about relation propagates through the system, shaping both immediate adjacency and emergent pattern. Configure with systemic thinking and tactical precision, balancing intended outcomes with material constraints. Work across scales simultaneously: component detail, structural logic, overall coherence.\n\nConfigure to create frameworks that are both directive and adaptive--rules strong enough to hold yet flexible enough to respond. It determines not only form but how relations persist, adapt, or dissolve as conditions shift. Every configuration carries consequences: it privileges some connections while making others less visible, shaping whose relations endure and whose fall away." },
  { id: "cultivate", word: "cultivate", group: 4, strap: "Tend over time", desc: "Cultivate to prepare and sustain conditions through repeated return. This is systematic engagement rather than sudden intervention--the discipline of cycles: intervention, observation, adjustment, and return.\n\nSome elements demand constant tending; others thrive when left to establish their own rhythms. Cultivate with discernment, knowing what each situation requires and resisting uniform treatment. Build feedback loops between practitioner and practice, where each adjustment generates insight that reshapes the approach.\n\nThis is not passive patience but active care: deciding when to intervene and when to hold back. Growth is uneven--sometimes rapid, sometimes delayed--and not every effort will bear fruit. Cultivate to turn repetition into renewal, sustaining the conditions in which practices, projects, or ideas can take root and endure." },
  { id: "empower",   word: "empower",   group: 5, strap: "Make room for agency", desc: "Empower by making room--for judgment, for initiative, for capacities that are already present but constrained. In design and organisational work, this means shifting from expert-led decisions to shared authority: distributing resources, tools, and knowledge in ways that expand what people can do and become.\n\nEmpowering is not the same as delegating tasks; it requires trust, transparency, and a willingness to redistribute control. Provide enough structure for action while leaving space for independent judgment, so that participants can take ownership and extend what is possible.\n\nEmpowerment is not a gift bestowed but a practice of enabling--creating frameworks in which agency is exercised and multiplied. Agency does not need to be installed; it needs room." },
  { id: "inform",    word: "inform",    group: 5, strap: "Frame knowledge so it travels", desc: "Inform by giving knowledge the form it needs--rendering it relevant, usable, and able to move across contexts, communities, and practices. In research and practice, this is not passive transmission but an active process of shaping information so it matters.\n\nIt requires clarity, audience awareness, and purpose: cutting through noise to provide scaffolding for judgment and action. Inform well by contextualising--aligning knowledge with the needs of decision-makers, practitioners, or communities. This involves translation, not simplification: preserving complexity where it matters while making insights usable.\n\nInform iteratively, adapting as feedback from those who act on information reshapes how it is shared. Informing is less about delivering facts and more about enabling understanding that can be interrogated, adapted, and applied. Inform to connect evidence with action, so knowledge shapes practice rather than remaining inert." },
  { id: "inspire",   word: "inspire",   group: 5, strap: "Breathe energy into possibility", desc: "Inspire by generating energy that moves others to act or create. It is not instruction but invitation: shifting perception and opening horizons that feel possible and desirable.\n\nIn practice, inspiration works through resonance and surprise--a story, an example, a juxtaposition that unsettles the obvious and points beyond the present. Inspire well by offering cues without prescribing outcomes, leaving space for others to make meaning and act in their own way. In design and education, this creates conditions for exploration, seeding alternatives that invite elaboration.\n\nInspiration does not end at the initial impulse; it endures when its energy is carried forward, amplified, and reshaped by others. Inspire to transmit energy rather than instruction, creating conditions where momentum can gather and sustain. What inspires is what travels." },
];

const CONTOURS = [
  { id: "lifeworlds",  word: "lifeworlds",  group: 1, strap: "The complex whole of lived relations", desc: "Lifeworlds are the shifting weave of everyday life as it is lived and made meaningful. They include streets, homes, and routines, but also habits, symbols, and shared values that hold communities together.\n\nLifeworlds are never purely human: they are shaped by animals, plants, infrastructures, and technologies that sustain or constrain activity. Experience is always entangled--human and nonhuman, familiar and strange--woven together in patterns that cannot be reduced to single parts.\n\nTo enter a lifeworld is to step into complexity, sensing how people and other beings inhabit and interpret environments in overlapping, sometimes conflicting ways. Lifeworlds remind us that to inhabit a world is always to share it--with others whose presence shapes what is possible, and with forces whose threads we sense but cannot always follow." },
  { id: "needs",       word: "needs",       group: 1, strap: "Conditions required to live well", desc: "Needs are the conditions required for people and communities to live with dignity. Some are immediate--food, water, shelter, safety--while others sustain longer-term well-being: care, belonging, meaningful work, education, and a stable environment.\n\nNeeds are not only physical but also social, cultural, and emotional. They vary across contexts yet mark thresholds for survival and flourishing. They are interdependent: meeting one often depends on supporting others, while neglect can undermine the whole.\n\nNeeds are also contested: whose needs are prioritised, who defines them, and what happens when resources are scarce? They shift over time--what is essential in one generation may be insufficient in the next. Urgent needs can weigh against future aspirations, constraining what people feel able to pursue. Needs remind us that design must address what sustains life while enabling conditions for growth beyond the basics." },
  { id: "aspirations", word: "aspirations", group: 1, strap: "Hopes that point beyond the present", desc: "Aspirations are hopes and ambitions that point beyond the present. They express what people and communities want to achieve, become, or contribute, extending beyond immediate needs into visions of what might be.\n\nAspirations may be personal--linked to growth, creativity, or success--or collective, tied to shared progress or social change. They give purpose and direction, motivating effort toward what matters most. Yet they are never fixed: they shift with circumstances, opportunities, and cultural expectations.\n\nAspirations are shaped unequally. Some communities have greater resources and freedoms to aspire than others. They are influenced by what societies signal is possible, and constrained when pressing needs remain unmet. They are not simply individual desires but socially embedded, opening questions about which futures are pursued, by whom, and for whose benefit. Aspirations remind us that life is lived forward, even when hopes collide with present necessities." },
  { id: "evidence",    word: "evidence",    group: 2, strap: "Grounds for knowledge and credibility", desc: "Evidence is the material that supports conclusions, showing why an observation or account should be taken seriously. It may be quantitative--numbers, measurements, statistics--or qualitative--descriptions, testimonies, observations.\n\nEvidence is never raw: it is gathered, selected, and presented through methods that shape what counts as credible. It may be historical, tracing patterns across time, or ethnographic, capturing lived experience. Collection does not end the process; it raises questions about what is included and what is left out.\n\nStrong evidence is not only accurate but also relevant to the questions at hand. Weak or partial evidence can still be useful if its limits are acknowledged. Evidence provides grounding, but it also invites challenge: what counts, for whom, and in what context?" },
  { id: "constraints", word: "constraints", group: 2, strap: "Limits that define and shape", desc: "Constraints are the limits within which work and life take place. They can be physical--space, time, resources--or conceptual--rules, conventions, or standards.\n\nConstraints may feel restrictive, yet they also give definition, forcing choices and sharpening focus. They set horizons of what is possible, determining not only what can be done but also what cannot. Some are rigid and unavoidable, while others are negotiable or even productive, prompting new ways of thinking.\n\nConstraints also mark where caution is needed: outcomes hold only within the boundaries they set. Understanding them is as much about recognising opportunities as recognising limits. Constraints remind us that freedom is never absolute--it is always framed by conditions that shape what emerges." },
  { id: "potentials",  word: "potentials",  group: 2, strap: "Capacities not yet unfolded", desc: "Potentials are latent capacities, qualities, or resources that could be activated under the right conditions. They may exist as untapped skills, unused materials, unrecognised connections, or dormant energies.\n\nUnlike outcomes, potentials are not yet fixed; they hold multiple possible futures. They require both imagination and grounding: seeing beyond the present while remaining attentive to what could plausibly develop. In social contexts, they point toward futures a community may aspire to, even if not yet achievable.\n\nPotentials are fragile. They can be overlooked, ignored, or wasted if conditions do not support their growth, and may fade if neglected, closing off futures that once seemed possible. Potentials remind us to attend not only to what exists, but also to what might still become." },
  { id: "ideas",       word: "ideas",       group: 3, strap: "Openings that reveal possibilities", desc: "Ideas are brief shifts in thought that reveal what might be possible. They often arise suddenly, bringing connections or patterns into view and suggesting directions not previously visible. In their earliest sense, ideas were forms or appearances--the shapes through which something is first grasped. They still work that way: recognitions of underlying patterns that give form to what was vague or unseen.\n\nAn idea is not yet a solution but a beginning--often slight, provisional, and one among many. Some emerge from reframing the familiar, others from noticing what has been overlooked. Their value lies not in completeness but in the movement they initiate, pointing forward, however tentatively.\n\nIdeas remind us that creativity rarely begins with answers but with shifts that open new lines of thought. Many do not endure. Left unattended, they fade; carried forward, they may take shape as concepts." },
  { id: "concepts",    word: "concepts",    group: 3, strap: "Structures that organise meaning", desc: "Concepts are the tools we use to organise the world. They group phenomena, reveal patterns, and frame relationships that help us make sense of complexity. The term carries the sense of grasping together--holding things in relation so they can be thought and worked with.\n\nUnlike ideas, which may be fleeting, concepts are more enduring. They stabilise thought, provide shared language, and make communication possible. Yet they are never neutral: they highlight some aspects of reality while obscuring others, shaping both what we notice and how we act.\n\nConcepts evolve through use, refined when they clarify and abandoned when they constrain. A good concept is rigorous enough to be tested yet generative enough to support further invention. They remind us that understanding is always mediated through the lenses we build. When concepts harden, they can limit imagination; when kept flexible, they can frame scenarios." },
  { id: "scenarios",   word: "scenarios",   group: 3, strap: "Stories that open possible futures", desc: "Scenarios are sketches of how futures might unfold, outlining scenes in which different actors, conditions, and contexts interact. In theatre, a scenario was a rough outline of action and characters--not a full script, but a frame for improvisation.\n\nIn the same way, scenarios in design, policy, or foresight are not predictions but explorations. They show how trends, decisions, and disruptions might combine to produce multiple outcomes. Often contrasting alternatives, they make consequences visible and open to comparison.\n\nScenarios give form to uncertainty by making it discussable, allowing groups to test assumptions and prepare for change. They work best when treated as provisional--drafts to be rehearsed, compared, and revised. Futures are never singular but multiple, shaped by shifting contexts and choices. By sketching futures, scenarios can unsettle established concepts and open new lines of thought." },
  { id: "media",       word: "media",       group: 4, strap: "Mediums through which design works", desc: "Media are the instruments and channels through which design takes shape at a distance from the thing itself. Architects use drawings, models, and digital renderings long before a building is realised; landscape designers work with plans and simulations before earth is moved.\n\nMedia extend beyond the human hand and eye: sensors register air quality, satellites capture landscapes, machines map flows. None are neutral. Each frames what can be seen, tested, or valued, highlighting some possibilities while obscuring others.\n\nThey extend perception and make design communicable, but also impose their own logics. A sketch invites improvisation, a 3D model suggests fixity, a diagram abstracts function. Working across media means translating between these affordances, never escaping the gap between representation and reality. Design is always mediated, acting through frames that shape both process and outcome." },
  { id: "forms",       word: "forms",       group: 4, strap: "Structures that order and affect life", desc: "Forms are the structures and patterns that give order to what we encounter. They operate as systems of organisation--geometries, typologies, layouts--but also carry force in how they move, attract, or repel.\n\nForms elicit responses: they can be beautiful, elegant, charming, awkward, even unsettling. These reactions are not trivial but part of how forms act in the world, shaping attention and behaviour as much as function. They are never pure; they are conditioned by conventions, histories, and technologies that guide what feels appropriate or desirable.\n\nForms are not solely human concerns. They shape habitats, species interactions, and technological arrangements as much as they influence cultural taste. To work with form is to engage both structure and response, balancing order with resonance, system with sensibility. No pattern stands alone--every form acts within wider ecologies of life." },
  { id: "ecologies",   word: "ecologies",   group: 4, strap: "Relations that sustain and transform life", desc: "Ecologies are interdependent systems through which forms and lives connect. They are not single entities but webs of relations linking elements through flows of energy, material, and meaning.\n\nIn natural systems, ecologies describe interactions between species and environments; in design, they extend to infrastructures, technologies, and cultural practices that sustain or disrupt conditions of living. Nothing exists in isolation: every intervention shifts dependencies, enabling some possibilities while foreclosing others.\n\nEcologies demand attention to scale and feedback--how local changes ripple outward and how accumulated effects return. To think ecologically is to see design as part of larger patterns, functional and symbolic, biological and cultural. They remind us that design exceeds what can be fully represented or ordered, unfolding within wider systems of relation." },
  { id: "participants",word: "participants", group: 5, strap: "Those who take part directly", desc: "Participants are those actively involved in a process, project, or event. The term is broad: it can refer to individuals, groups, or organisations shaping an activity.\n\nParticipation varies in degree and intensity--from attending or providing input to co-creating, deciding, or implementing. What matters is engagement: participants are not outside observers, but contributors within a defined process. Involvement may be fleeting or sustained, informed or constrained, voluntary or imposed, enthusiastic or reluctant.\n\nThe quality of participation often shapes the quality of outcomes, as those most directly involved bring perspectives others may overlook. No process is abstract; it is always enacted through those who take part. Participation may also extend beyond humans, as technologies, species, or environments shape how a process unfolds." },
  { id: "stakeholders",word: "stakeholders",group: 5, strap: "Those who hold an interest or stake", desc: "Stakeholders are those with a recognised interest in the outcome of a project, decision, or system. A stake may be direct--financial, professional, personal--or indirect, such as environmental impact, cultural value, or reputational risk.\n\nThey may be individuals, communities, organisations, or institutions, and not all have equal power to assert their claims. Some are formally acknowledged and invited into processes of consultation or negotiation; others remain overlooked or excluded until they make their interests visible.\n\nStakeholders can support, resist, or reshape outcomes depending on how their interests align or clash. Every project sits within a wider field of claims and consequences, where interests intersect. Stakes are not only human: other species, ecosystems, and technologies are also implicated, even if their interests must be represented or translated by others." },
  { id: "coalitions",  word: "coalitions",  group: 5, strap: "Alliances formed around shared cause", desc: "Coalitions are alliances of actors who come together to pursue a common goal. They may be temporary or enduring, formal or informal, small or broad.\n\nThey often form when individual efforts are insufficient and collective strength is needed to amplify voice, pool resources, or coordinate action. Members may not share all interests, but find common ground in a cause that outweighs their differences.\n\nCoalitions can be fragile--held together by trust, reciprocity, and ongoing negotiation--yet also powerful in shaping agendas and shifting systems. Lasting change often depends less on isolated effort than on how alliances are built, maintained, and transformed. Coalitions may extend beyond the human, drawing in technologies, environments, or more-than-human actors whose presence reshapes the field of alliance." },
];

//  Mini tick 
function MiniTick({ color }) {
  return (
    <span style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:10, height:10, borderRadius:"50%", background:color, flexShrink:0 }}>
      <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
        <path d="M1 3L2.5 4.5L5 1.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </span>
  );
}

//  Select circle 
function SelectCircle({ selected, onSelect }) {
  return (
    <button onClick={onSelect} style={{ width:34, height:34, borderRadius:"50%", background:selected?"#1a1a1a":"transparent", border:"1.5px solid #1a1a1a", opacity:selected?0.75:0.25, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", transition:"all .15s", flexShrink:0 }}>
      {selected && (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="#f0ede8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

//  Home card row -- tab interface 
function CardRow({ cue, contour, pos, group, selCue, selContour, onSelect, openItem, onOpen }) {
  const g = group;
  const isOpen = !!openItem;
  const displayItem = openItem;
  const displayType = openItem ? (openItem.id === cue.id ? "cue" : "contour") : null;
  const activeType = displayType;
  const activeItem = displayItem;
  const sel = activeType === "cue" ? selCue?.id === activeItem?.id : selContour?.id === activeItem?.id;
  const otherSelected = activeType === "cue" ? selContour : selCue;
  const otherLabel = activeType === "cue" ? "contour" : "cue";
  const cueSelected = selCue?.id === cue.id;
  const contourSelected = selContour?.id === contour?.id;

  if (isOpen && displayItem) {
    const tabLeftRadius  = pos === "top" ? `${R} 0 0 0` : "0";
    const tabRightRadius = pos === "top" ? `0 ${R} 0 0` : "0";
    const contentRadius  = pos === "bot" ? `0 0 ${R} ${R}` : "0";

    return (
      <div style={{ gridColumn:"1/-1", overflow:"hidden", animation:"openCard .25s ease" }}>
        {/* Tab row -- 2px dark gap between tabs */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:G, background:GL }}>
          {/* Cue tab */}
          <button onClick={() => activeType !== "cue" ? onOpen(cue) : null} style={{
            background: g.tint,
            borderRadius: tabLeftRadius,
            height:44, border:"none",
            cursor: activeType === "cue" ? "default" : "pointer",
            display:"flex", alignItems:"center", justifyContent:"center", gap:6,
            borderBottom: activeType === "cue" ? "2px solid transparent" : "2px solid #fff",
          }}>
            <span style={{ fontSize:15, fontWeight:400, color:"#1a1a1a", letterSpacing:"-0.01em" }}>{cue.word}</span>
            {cueSelected && <span style={{ opacity:0.35 }}><MiniTick color="#1a1a1a"/></span>}
          </button>
          {/* Contour tab */}
          {contour && (
            <button onClick={() => activeType !== "contour" ? onOpen(contour) : null} style={{
              background: g.tint,
              borderRadius: tabRightRadius,
              height:44, border:"none",
              cursor: activeType === "contour" ? "default" : "pointer",
              display:"flex", alignItems:"center", justifyContent:"center", gap:6,
              borderBottom: activeType === "contour" ? "2px solid transparent" : "2px solid #fff",
            }}>
              <span style={{ fontSize:15, fontWeight:400, color:"#1a1a1a", letterSpacing:"-0.01em" }}>{contour.word}</span>
              {contourSelected && <span style={{ opacity:0.35 }}><MiniTick color="#1a1a1a"/></span>}
            </button>
          )}
        </div>

       
        {/* TOP ZONE — tint: label + word + strap */}
        <div style={{ background:g.tint, padding:"16px 18px 14px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <p style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:"#888", marginBottom:3 }}>{activeType}</p>
              <div style={{ fontSize:24, fontWeight:400, color:"#1a1a1a", letterSpacing:"-0.02em", lineHeight:1 }}>{activeItem.word}</div>
            </div>
            <button onClick={() => onOpen(null)} style={{ background:"none", border:"none", color:"#999", fontSize:20, cursor:"pointer", padding:0, marginTop:2 }}>×</button>
          </div>
          <p style={{ fontSize:12, fontStyle:"italic", color:"#555", lineHeight:1.45, marginTop:10 }}>{activeItem.strap}</p>
        </div>

        {/* MIDDLE ZONE — white: scrollable description */}
        <div style={{ background:"#fff", overflowY:"auto", padding:"18px 18px 24px", maxHeight:"52vh", WebkitOverflowScrolling:"touch" }}>
          {activeItem.desc.split("\n\n").map((para, i) => (
            <p key={i} style={{ fontSize:13, fontWeight:300, color:"#333", lineHeight:1.75, marginBottom: i < activeItem.desc.split("\n\n").length - 1 ? 12 : 0 }}>{para}</p>
          ))}
        </div>

        {/* BOTTOM ZONE — tint: select + save */}
        <div style={{ background:g.tint, borderRadius:contentRadius, padding:"14px 18px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontSize:10, color:"#888", display:"flex", alignItems:"center", gap:6 }}>
            {sel && otherSelected ? (
              <span style={{ display:"flex", alignItems:"center", gap:5 }}>
                <MiniTick color="#1a1a1a"/><span>{activeItem.word}</span>
                <span style={{ opacity:0.4 }}>—</span>
                <MiniTick color="#1a1a1a"/><span>{otherSelected.word}</span>
              </span>
            ) : sel ? (
              <span style={{ display:"flex", alignItems:"center", gap:5 }}>
                <MiniTick color="#1a1a1a"/><span>select a {otherLabel}</span>
              </span>
            ) : (
              <span>select as {activeType}</span>
            )}
          </div>
          <SelectCircle selected={sel} onSelect={() => onSelect(activeType, activeItem)}/>
        </div>
        {sel && otherSelected && (
          <div style={{ background:g.tint, borderRadius:contentRadius, padding:"0 18px 18px" }}>
            <button onClick={() => onSelect("save", null)} style={{ width:"100%", background:"#1a1a1a", color:"#ffffff", border:"none", borderRadius:4, padding:10, fontSize:11, letterSpacing:"0.06em", cursor:"pointer" }}>
              save to journey →
            </button>
          </div>
        )}
      </div>
    );
  }

  // Closed -- tinted cells, black text
  return (
    <>
      <button onClick={() => onOpen(cue)} style={{ background:g.tint, borderRadius:cr(pos,"left"), height:50, border:"none", cursor:"pointer", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", transition:"opacity .1s" }}
        onMouseDown={e=>e.currentTarget.style.opacity=".7"} onMouseUp={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
        <span style={{ fontSize:15, fontWeight:400, color:"#1a1a1a", letterSpacing:"-0.01em" }}>{cue.word}</span>
        {cueSelected && <span style={{ position:"absolute", top:8, right:7, opacity:0.5 }}><MiniTick color="#1a1a1a"/></span>}
      </button>
      {contour && (
        <button onClick={() => onOpen(contour)} style={{ background:g.tint, borderRadius:cr(pos,"right"), height:50, border:"none", cursor:"pointer", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", transition:"opacity .1s" }}
          onMouseDown={e=>e.currentTarget.style.opacity=".7"} onMouseUp={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
          <span style={{ fontSize:15, fontWeight:400, color:"#1a1a1a", letterSpacing:"-0.01em" }}>{contour.word}</span>
          {contourSelected && <span style={{ position:"absolute", top:8, left:7, opacity:0.5 }}><MiniTick color="#1a1a1a"/></span>}
        </button>
      )}
    </>
  );
}

//  Journey cell — simple flip showing word then strap
function JCell({ item, type, pos, side, onRemove, showRemove }) {
  const [flipped, setFlipped] = useState(false);
  const g = getGroup(item.group);
  return (
    <div onClick={() => setFlipped(f=>!f)} style={{ background:g.tint, borderRadius:cr(pos,side), minHeight:50, cursor:"pointer", display:"flex", flexDirection:"column", justifyContent:flipped?"flex-start":"center", alignItems:flipped?"flex-start":"center", padding:flipped?"14px 12px 14px":"0 8px", transition:"padding .2s ease", overflow:"hidden" }}>
      {!flipped ? (
        <span style={{ fontSize:15, fontWeight:400, color:"#1a1a1a", letterSpacing:"-0.01em", textAlign:"center" }}>{item.word}</span>
      ) : (
        <>
          <p style={{ fontSize:9, letterSpacing:"0.16em", textTransform:"uppercase", color:"#888", marginBottom:6 }}>{type}</p>
          <div style={{ fontSize:16, fontWeight:400, color:"#1a1a1a", letterSpacing:"-0.015em", marginBottom:8, lineHeight:1.1 }}>{item.word}</div>
          <p style={{ fontSize:12, fontStyle:"italic", color:"#555", lineHeight:1.5, marginBottom:showRemove?12:0 }}>{item.strap}</p>
          {showRemove && (
            <button onClick={e=>{e.stopPropagation();onRemove();}} style={{ background:"none", color:"#aaa", border:"1px solid #ddd", borderRadius:3, padding:"5px 12px", fontSize:9, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer" }}>remove pair</button>
          )}
        </>
      )}
    </div>
  );
}


//  Journey grid
function JourneyGrid({ journey, onRemove }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:G, background:GL }}>
      {journey.map(step => {
        const cueMeta     = { pos:getItemPos(step.cue,     "cue"),     side:"left"  };
        const contourMeta = { pos:getItemPos(step.contour, "contour"), side:"right" };
        return [
          <JCell key={`c-${step.id}`}  item={step.cue}     type="cue"     pos={cueMeta.pos}     side={cueMeta.side}     onRemove={() => onRemove(step.id)} showRemove={true}  />,
          <JCell key={`co-${step.id}`} item={step.contour} type="contour" pos={contourMeta.pos} side={contourMeta.side} onRemove={() => onRemove(step.id)} showRemove={false} />,
        ];
      })}
      <HereNowTab journey={journey} />
    </div>
  );
}


// ─── Here Now tab pair ────────────────────────────────────────────────────────
const HN_BG   = "#1a1a1a";
const HN_TEXT = "#e8e4de";

function HereNowTab({ journey }) {
  const [open, setOpen]           = useState(false);
  const [activeTab, setActiveTab] = useState("here");
  const [placeName, setPlaceName] = useState("");
  const [locLoading, setLocLoading] = useState(false);
  const [aiText, setAiText]       = useState("");
  const [aiStatus, setAiStatus]   = useState("idle");

  const getLocation = async () => {
    if (placeName) return placeName;
    setLocLoading(true);
    let name = "your current location";
    try {
      const pos = await new Promise((res, rej) =>
        navigator.geolocation.getCurrentPosition(res, rej, { timeout: 6000 })
      );
      const { latitude: lat, longitude: lon } = pos.coords;
      try {
        const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const d = await r.json();
        const a = d.address || {};
        name = [a.suburb, a.city || a.town || a.village, a.country].filter(Boolean).join(", ");
      } catch { name = `${lat.toFixed(3)}, ${lon.toFixed(3)}`; }
    } catch {
      try {
        const r = await fetch("https://ipapi.co/json/");
        const d = await r.json();
        name = [d.city, d.country_name].filter(Boolean).join(", ");
      } catch {}
    }
    setPlaceName(name);
    setLocLoading(false);
    return name;
  };

  const generateBrief = async () => {
    if (aiStatus === "thinking") return;
    setAiStatus("thinking");
    setAiText("");
    const place = await getLocation();
    const pairNames = journey.map(s => `${s.cue.word} — ${s.contour.word}`).join(", ");
    const pairs = journey.map(s =>
      `${s.cue.word} (cue): ${s.cue.desc.replace(/\n\n/g, " ")}\n${s.contour.word} (contour): ${s.contour.desc.replace(/\n\n/g, " ")}`
    ).join("\n\n");
    const prompt = `You are a design advisor working with a toolkit called Design Actions. Cues are verbs that orient design action. Contours are nouns that define the terrain of inquiry. Together they frame a design situation.\n\nThe user is currently at: ${place}.\n\nTheir selected design action pairs are: ${pairNames}\n\nHere are the full definitions of each:\n\n${pairs}\n\nUsing these definitions as your conceptual foundation, write a short, evocative, place-specific text of around 150-200 words that interprets these design actions for this specific location right now. Be concrete and grounded in the actual place — its character, its challenges, its possibilities. Do not write generic design advice. Write as if you are standing there with the user. Use a thoughtful, direct tone. Write as flowing prose with no bullet points or headers.`;
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!response.ok) throw new Error(`API error ${response.status}`);
      const data = await response.json();
      const result = data.content?.find(b => b.type === "text")?.text || "";
      if (!result) throw new Error("empty response");
      setAiText(result);
      setAiStatus("done");
    } catch {
      setAiText("Something went wrong. Tap again to retry.");
      setAiStatus("error");
    }
  };

  const handleTabOpen = (tab) => {
    if (!open) {
      setOpen(true);
      setActiveTab(tab);
      if (tab === "here") getLocation();
      if (tab === "now") generateBrief();
    } else if (activeTab !== tab) {
      setActiveTab(tab);
      if (tab === "here" && !placeName) getLocation();
      if (tab === "now" && aiStatus === "idle") generateBrief();
    } else {
      setOpen(false);
    }
  };

  return (
    <div style={{ gridColumn:"1/-1" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:G, background:GL }}>
        <button onClick={() => handleTabOpen("here")} style={{
          background:HN_BG, color:HN_TEXT,
          borderRadius: open ? "0" : `0 0 0 ${R}`,
          border:`1px solid #333`, height:44, cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:15, fontWeight:400, letterSpacing:"-0.01em",
          position:"relative", overflow:"hidden",
          borderBottom: open && activeTab !== "here" ? `2px solid ${HN_TEXT}` : "none",
        }}>
          {open && activeTab !== "here" && <span style={{ position:"absolute", inset:0, background:"rgba(80,80,80,0.35)" }}/>}
          <span style={{ position:"relative" }}>here</span>
        </button>
        <button onClick={() => handleTabOpen("now")} style={{
          background:HN_BG, color:HN_TEXT,
          borderRadius: open ? "0" : `0 0 ${R} 0`,
          border:`1px solid #333`, height:44, cursor:"pointer",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:15, fontWeight:400, letterSpacing:"-0.01em",
          position:"relative", overflow:"hidden",
          borderBottom: open && activeTab !== "now" ? `2px solid ${HN_TEXT}` : "none",
        }}>
          {open && activeTab !== "now" && <span style={{ position:"absolute", inset:0, background:"rgba(80,80,80,0.35)" }}/>}
          <span style={{ position:"relative" }}>now</span>
        </button>
      </div>
      {open && (
        <div style={{ background:HN_BG, borderRadius:`0 0 ${R} ${R}`, border:`1px solid #333`, borderTop:"none", padding:"16px 18px 20px", maxHeight:"55vh", overflowY:"auto", WebkitOverflowScrolling:"touch" }}>
          {activeTab === "here" && (
            <>
              <p style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:HN_TEXT, opacity:0.35, marginBottom:8 }}>location</p>
              {locLoading
                ? <p style={{ fontSize:13, fontWeight:300, color:HN_TEXT, opacity:0.4 }}>locating…</p>
                : <p style={{ fontSize:15, fontWeight:400, color:HN_TEXT, lineHeight:1.45 }}>{placeName || "tap now to generate a brief"}</p>
              }
            </>
          )}
          {activeTab === "now" && (
            <>
              <p style={{ fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase", color:HN_TEXT, opacity:0.35, marginBottom:8 }}>design brief</p>
              {aiStatus === "thinking" && (
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:HN_TEXT, opacity:0.3, animation:"pulse 1s infinite" }}/>
                  <p style={{ fontSize:12, fontWeight:300, color:HN_TEXT, opacity:0.4 }}>thinking…</p>
                </div>
              )}
              {(aiStatus === "done" || aiStatus === "error") && (
                <>
                  <p style={{ fontSize:13, fontWeight:300, color:HN_TEXT, opacity:0.85, lineHeight:1.8 }}>{aiText}</p>
                  <button onClick={generateBrief} style={{ marginTop:14, background:"none", border:`1px solid #333`, borderRadius:4, padding:"6px 12px", fontSize:10, color:HN_TEXT, opacity:0.4, cursor:"pointer", letterSpacing:"0.08em" }}>regenerate →</button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Uniform home grid ─────────────────────────────────────────────────────────
function UniformGrid({ selCue, selContour, onSelect, openItem, onOpen }) {
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:G, background:GL }}>
      {GROUPS.map(g => {
        const cues     = CUES.filter(c => c.group === g.id);
        const contours = CONTOURS.filter(c => c.group === g.id);
        return cues.map((cue, i) => {
          const contour = contours[i];
          const pos = rowPos(i);
          const rowOpenItem = (openItem?.id === cue.id || openItem?.id === contour?.id) ? openItem : null;
          return (
            <CardRow key={`${g.id}-${i}`} cue={cue} contour={contour} pos={pos} group={g}
              selCue={selCue} selContour={selContour} onSelect={onSelect}
              openItem={rowOpenItem} onOpen={onOpen}
            />
          );
        });
      })}
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function DesignActions() {
  const [screen, setScreen]         = useState("home");
  const [openItem, setOpenItem]     = useState(null);
  const [selCue, setSelCue]         = useState(null);
  const [selContour, setSelContour] = useState(null);
  const [journey, setJourney]       = useState([]);

  const bg = "#ffffff", fg = "#1a1a1a";

  const handleOpen = (item) => setOpenItem(prev => prev?.id === item?.id ? null : item);

  const handleSelect = (type, item) => {
    if (type === "save") {
      if (selCue && selContour && journey.length < 6) {
        setJourney(p => [...p, { cue:selCue, contour:selContour, id:Date.now() }]);
        setSelCue(null); setSelContour(null); setOpenItem(null);
        setScreen("journey");
      }
      return;
    }
    if (type === "cue") setSelCue(p => p?.id === item.id ? null : item);
    else setSelContour(p => p?.id === item.id ? null : item);
  };

  const randomPair = () => {
    if (journey.length >= 6) return;
    const c  = CUES[Math.floor(Math.random() * CUES.length)];
    const co = CONTOURS[Math.floor(Math.random() * CONTOURS.length)];
    setJourney(p => [...p, { cue:c, contour:co, id:Date.now() }]);
    setScreen("journey");
  };

  return (
    <div style={{ background:bg, minHeight:"100vh", color:fg, maxWidth:390, margin:"0 auto", fontFamily:"Inter,sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        button{cursor:pointer;font-family:Inter,sans-serif;}
        ::-webkit-scrollbar{display:none;}
        @keyframes openCard{from{opacity:0;transform:scaleY(0.94)}to{opacity:1;transform:scaleY(1)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
      `}</style>

      {/* HOME */}
      {screen === "home" && (
        <div style={{ paddingBottom:84 }}>
          <div style={{ padding:"52px 24px 28px" }}>
            <h1 style={{ fontSize:36, fontWeight:300, color:"#1a1a1a", letterSpacing:"-0.03em", lineHeight:1.0, marginBottom:10 }}>
              Design<br/>Actions
            </h1>
            <p style={{ fontSize:11, fontWeight:300, color:"#888", letterSpacing:"0.12em", textTransform:"uppercase", lineHeight:1.7 }}>
              creative rigour<br/>for complex challenges
            </p>
            <p style={{ fontSize:10, fontWeight:300, color:"#555", letterSpacing:"0.08em", textTransform:"uppercase", marginTop:14 }}>
              tap to read · select to pair
            </p>
          </div>
          <div style={{ padding:"0 24px" }}>
            <UniformGrid selCue={selCue} selContour={selContour} onSelect={handleSelect} openItem={openItem} onOpen={handleOpen}/>
          </div>
        </div>
      )}

      {/* JOURNEY */}
      {screen === "journey" && (
        <div style={{ paddingBottom:84 }}>
          <div style={{ padding:"52px 24px 20px", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div>
              <h2 style={{ fontSize:28, fontWeight:300, color:"#1a1a1a", letterSpacing:"-0.025em", lineHeight:1.0, marginBottom:6 }}>journey</h2>
              <p style={{ fontSize:11, fontWeight:300, color:"#888", letterSpacing:"0.02em" }}>
                tap cards to read · here now to generate
              </p>
            </div>
            <button onClick={randomPair} style={{ fontSize:11, color:"#888", border:"1px solid #ccc", borderRadius:4, padding:"6px 12px", background:"none", marginTop:4 }}>+ random</button>
          </div>
          <div style={{ padding:"0 24px" }}>
            {journey.length === 0 ? (
              <div style={{ padding:"72px 0" }}>
                <div style={{ fontSize:20, fontWeight:300, color:"#1a1a1a", marginBottom:10, letterSpacing:"-0.02em" }}>no pairs yet</div>
                <div style={{ fontSize:12, fontWeight:300, color:"#999", lineHeight:1.8 }}>select a cue and contour<br/>from the grid to begin</div>
              </div>
            ) : (
              <JourneyGrid journey={journey} onRemove={(id) => setJourney(j => j.filter(x => x.id !== id))}/>
            )}
          </div>
        </div>
      )}

      {/* NAV */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:390, zIndex:100, background:"#ffffff", borderTop:"1px solid #e0ddd8", padding:"10px 28px 28px", display:"flex", justifyContent:"space-around" }}>
        {[["home","cues & contours"],["journey", journey.length > 0 ? `journey · ${journey.length}` : "journey"]].map(([s,label]) => (
          <button key={s} onClick={() => setScreen(s)} style={{ background:"none", border:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{ width:3, height:3, borderRadius:"50%", background:screen===s?"#1a1a1a":"transparent" }}/>
            <span style={{ fontWeight:screen===s?400:300, fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:screen===s?"#1a1a1a":"#aaa" }}>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
