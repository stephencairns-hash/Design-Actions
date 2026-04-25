import { useState, useRef, useEffect } from "react";

const R = "18px";
const G = "2px";
const GL = "#f5f3ef";

const GROUPS = [
  { id: 1, label: "sense",   color: "#BEBEAA", tint: "#BEBEAA" },
  { id: 2, label: "analyse", color: "#5AA8F2", tint: "#5AA8F2" },
  { id: 3, label: "imagine", color: "#D94F28", tint: "#D94F28" },
  { id: 4, label: "make",    color: "#7DD4C0", tint: "#7DD4C0" },
  { id: 5, label: "act",     color: "#848095", tint: "#848095" },
];

const CUES = [
  { id: "sense", num:1, word: "sense",     group: 1, strap: "Sense the world even as you make sense of it", desc: "Sense through the body and through technology, tuning into the raw flow before categorisation sets in. Our senses—sight, sound, touch, smell, and taste—bring a flood of stimuli, always mediated by memory, culture, and language. Yet practice can sharpen awareness: moving, reaching, circling, attending actively rather than waiting passively.\n\nTechnologies extend this reach, from the phone in a pocket to satellites orbiting overhead. Each expands perception while also shaping it. Sense, then, is both immediate and mediated: a bodily practice of investigation and a technological condition of access.\n\nEnter the world attentively, recognising how perception is always filtered yet still capable of surprise. Sensing deepens not by reducing mediation, but by becoming more conscious of the filters through which the world arrives." },
  { id: "describe", num:2, word: "describe",  group: 1, strap: "Translate perception into shared, partial accounts", desc: "Describe to render experience communicable: shaping what you observe so others can encounter it too. Words, sketches, photographs, and measurements are not neutral—they shape what they record, highlighting some details while obscuring others.\n\nGood description is modest, dwelling on textures and specifics that might otherwise be overlooked. It is skilled, requiring practice to make observations intelligible. And it is aware, recognising how media and perspective filter what is conveyed. Description accepts that perception and expression are intertwined.\n\nMake visible what might be missed, opening encounters so that others can see, hear, and feel differently. Description also multiplies perspectives: when several accounts are placed together, we see not uniformity but a richer sense of difference. Describe with the awareness that every account is partial, yet capable of inviting dialogue." },
  { id: "recognise", num:3, word: "recognise", group: 1, strap: "Acknowledge the familiar and the unfamiliar", desc: "Recognise to connect perception with memory, bringing the past into the present. Recognition can reassure, but it can also unsettle, showing how the familiar never returns unchanged—a street revisited, a face encountered across difference, a practice that looks familiar until it doesn't.\n\nRecognition also extends outward, acknowledging the unfamiliar—those shaped by other histories and other worlds. This act is reciprocal: how we recognise others shapes how they appear to us, and how they might come to see themselves.\n\nRecognise as both cognitive and ethical practice: an act of acknowledgment that carries consequences. Keep perception open, making room for difference while situating yourself in relation. Recognising is active, not passive: it requires attentiveness to what echoes and what resists. Hold together familiarity and difference, sustaining the tension rather than resolving it." },
  { id: "analyse", num:4, word: "analyse",   group: 2, strap: "Reveal hidden structures", desc: "Analyse to probe beneath surface appearances, uncovering how things are shaped, patterned, or made to function. Analysis disrupts habit by loosening everyday ways of seeing, treating phenomena as composites rather than givens.\n\nUnpack elements and relations—like examining both the contents of a box and its design. Use cuts, maps, or samples to reveal what cannot be directly observed. Shift scale: zoom in to detail or out to systemic pattern. When phenomena are dynamic, track symptoms or signals that hint at underlying structures.\n\nWhether through dissection, mapping, or inference, the aim is the same: to reveal what ordinary perception conceals. Analyse to generate clarity through methodical exposure of form and function." },
  { id: "interpret", num:5, word: "interpret", group: 2, strap: "Shape meaning in context", desc: "Interpret to move from description to significance, asking why findings matter. Interpretation works by situating what is observed within wider frames—historical, cultural, conceptual—so that it resonates beyond its immediate context.\n\nIt links elements that analysis might leave isolated, tracing patterns and implications that only become visible in relation. Across fields, interpretation is how observations are made sense of: weaving data into narratives, symbols into cultural insight, or lived experience into shared understanding.\n\nInterpret with the awareness that meaning is not fixed by a single perspective but emerges through dialogue, shaped by standpoint, language, and exchange. Build bridges between observation and understanding, transforming what is seen into what is significant." },
  { id: "evaluate", num:6, word: "evaluate",  group: 2, strap: "Assess worth and impact", desc: "Evaluate by judging quality and effect, weighing evidence against criteria and context. Unlike interpretation, which explores meaning, evaluation addresses value: asking what works, for whom, and to what extent.\n\nAppraise strengths and limitations, reliability and relevance, immediate outcomes and longer-term consequences. Evaluation is also comparative: setting alternatives alongside each other to clarify priorities and trade-offs. It applies as much to a prototype as to a program or a policy, guiding choices about what should move forward.\n\nGood evaluation draws on multiple forms of evidence—quantitative and qualitative, objective measures and lived experience—testing them against both goals and values. Evaluation is consequential: to declare something valuable is to shape what is carried forward and what is left behind, guiding decisions about where to act next." },
  { id: "spark", num:7, word: "spark",     group: 3, strap: "Bring beginnings into view", desc: "Spark to bring potential into view, initiating movement where there was none. Beginnings are often slight and multiple, emerging as tentative connections or shifts in attention. A spark is rarely enough on its own: it depends on conditions—timing, attention, proximity—for something to take hold and develop.\n\nSparking is not only about sudden insight. It also involves preparing the ground: arranging elements so that connections can occur, noticing which beginnings persist and which fade. Most do not endure, but each attempt sharpens judgment about what can be carried forward.\n\nSpark by attending to early signals—what gathers force, what dissipates, and why. It is less about waiting for inspiration than about creating the conditions in which something can begin and be sustained." },
  { id: "mull", num:8, word: "mull",      group: 3, strap: "Let things settle and turn", desc: "Mull by working beneath the surface of directed thought, creating space for things to settle, sediment, and reorganise. Unlike rapid analysis or snap judgement, mulling requires suspension—time for possibilities to deepen before they can be clearly formed.\n\nThis is not passivity but patience: a practice of returning, circling, and allowing patterns to emerge. Resist the compulsion for quick clarity and maintain a soft vigilance that lets connections surface when ready. The challenge is to distinguish fertile uncertainty from mere confusion, and productive delay from pointless postponement.\n\nMull to accumulate nuance, sensing how fragments belong together and how latent forms wait for conditions to shift. Some designs cannot be forced into view; they ripen through duration, until recognition arrives less as invention than as something disclosed." },
  { id: "imagine", num:9, word: "imagine",   group: 3, strap: "See otherwise", desc: "Imagine to stretch beyond what is given, projecting possibilities forward through as-if rehearsal. Work through structured play, moving ideas, images, and perspectives without the constraints of immediate utility.\n\nImagine well by shifting vantage points deliberately—inhabiting unfamiliar positions, adopting alternative frameworks, or projecting different scenarios. This mobility reveals that what seems fixed is contingent, and that current arrangements are only one option among many.\n\nImagination is not escape but preparation: it expands the repertoire of what might be tried, tested, or transformed. It requires looseness to let visions proliferate, and discipline to treat them as drafts for future practice. Imagine to refuse inevitability, generating material that unsettles assumptions and opens horizons for meaningful change." },
  { id: "craft", num:10, word: "craft",     group: 4, strap: "Shape with hand and mind", desc: "Craft by joining skill with attention, creating through precision and care. It never begins from zero: every act draws on collective intelligence accumulated across apprenticeships, workshops, and traditions.\n\nCraft expresses both context and lineage—materials available, techniques developed, forms refined over generations. Craft well by understanding not only how to work something, but why methods evolved as they did and what they continue to carry. Repetition builds fluency, developing muscle memory that enables subtle manipulation while freeing thought for design decisions.\n\nTools extend intention, mediating between vision and matter. What emerges bears multiple signatures: the trace of the individual hand, the logic of material, and the weight of tradition. Craft to shape with care, extending lineages while making them your own." },
  { id: "configure", num:11, word: "configure", group: 4, strap: "Set things in relation", desc: "Configure to establish the logic by which elements connect and define each other. It makes the abstract operational, transforming loose possibilities into structured form. Unlike simple arrangement, this is architectural work—setting the rules that govern interaction.\n\nEach decision about relation propagates through the system, shaping both immediate adjacency and emergent pattern. Configure with systemic thinking and tactical precision, balancing intended outcomes with material constraints. Work across scales simultaneously: component detail, structural logic, overall coherence.\n\nConfigure to create frameworks that are both directive and adaptive—rules strong enough to hold yet flexible enough to respond. It determines not only form but how relations persist, adapt, or dissolve as conditions shift. Every configuration carries consequences: it privileges some connections while making others less visible, shaping whose relations endure and whose fall away." },
  { id: "cultivate", num:12, word: "cultivate", group: 4, strap: "Tend over time", desc: "Cultivate to prepare and sustain conditions through repeated return. This is systematic engagement rather than sudden intervention—the discipline of cycles: intervention, observation, adjustment, and return.\n\nSome elements demand constant tending; others thrive when left to establish their own rhythms. Cultivate with discernment, knowing what each situation requires and resisting uniform treatment. Build feedback loops between practitioner and practice, where each adjustment generates insight that reshapes the approach.\n\nThis is not passive patience but active care: deciding when to intervene and when to hold back. Growth is uneven—sometimes rapid, sometimes delayed—and not every effort will bear fruit. Cultivate to turn repetition into renewal, sustaining the conditions in which practices, projects, or ideas can take root and endure." },
  { id: "empower", num:13, word: "empower",   group: 5, strap: "Make room for agency", desc: "Empower by making room—for judgment, for initiative, for capacities that are already present but constrained. In design and organisational work, this means shifting from expert-led decisions to shared authority: distributing resources, tools, and knowledge in ways that expand what people can do and become.\n\nEmpowering is not the same as delegating tasks; it requires trust, transparency, and a willingness to redistribute control. Provide enough structure for action while leaving space for independent judgment, so that participants can take ownership and extend what is possible.\n\nEmpowerment is not a gift bestowed but a practice of enabling—creating frameworks in which agency is exercised and multiplied. Agency does not need to be installed; it needs room." },
  { id: "inform", num:14, word: "inform",    group: 5, strap: "Frame knowledge so it travels", desc: "Inform by giving knowledge the form it needs—rendering it relevant, usable, and able to move across contexts, communities, and practices. In research and practice, this is not passive transmission but an active process of shaping information so it matters.\n\nIt requires clarity, audience awareness, and purpose: cutting through noise to provide scaffolding for judgment and action. Inform well by contextualising—aligning knowledge with the needs of decision-makers, practitioners, or communities. This involves translation, not simplification: preserving complexity where it matters while making insights usable.\n\nInform iteratively, adapting as feedback from those who act on information reshapes how it is shared. Informing is less about delivering facts and more about enabling understanding that can be interrogated, adapted, and applied. Inform to connect evidence with action, so knowledge shapes practice rather than remaining inert." },
  { id: "inspire", num:15,   word: "inspire",   group: 5, strap: "Breathe energy into possibility", desc: "Inspire by generating energy that moves others to act or create. It is not instruction but invitation: shifting perception and opening horizons that feel possible and desirable.\n\nIn practice, inspiration works through resonance and surprise—a story, an example, a juxtaposition that unsettles the obvious and points beyond the present. Inspire well by offering cues without prescribing outcomes, leaving space for others to make meaning and act in their own way. In design and education, this creates conditions for exploration, seeding alternatives that invite elaboration.\n\nInspiration does not end at the initial impulse; it endures when its energy is carried forward, amplified, and reshaped by others. Inspire to transmit energy rather than instruction, creating conditions where momentum can gather and sustain. What inspires is what travels." },
];

const CONTOURS = [
  { id: "lifeworlds", num:1,  word: "lifeworlds",  group: 1, strap: "The complex whole of lived relations", desc: "Lifeworlds are the shifting weave of everyday life as it is lived and made meaningful. They include streets, homes, and routines, but also habits, symbols, and shared values that hold communities together.\n\nLifeworlds are never purely human: they are shaped by animals, plants, infrastructures, and technologies that sustain or constrain activity. Experience is always entangled—human and nonhuman, familiar and strange—woven together in patterns that cannot be reduced to single parts.\n\nTo enter a lifeworld is to step into complexity, sensing how people and other beings inhabit and interpret environments in overlapping, sometimes conflicting ways. Lifeworlds remind us that to inhabit a world is always to share it—with others whose presence shapes what is possible, and with forces whose threads we sense but cannot always follow." },
  { id: "needs", num:2,       word: "needs",       group: 1, strap: "Conditions required to live well", desc: "Needs are the conditions required for people and communities to live with dignity. Some are immediate—food, water, shelter, safety—while others sustain longer-term well-being: care, belonging, meaningful work, education, and a stable environment.\n\nNeeds are not only physical but also social, cultural, and emotional. They vary across contexts yet mark thresholds for survival and flourishing. They are interdependent: meeting one often depends on supporting others, while neglect can undermine the whole.\n\nNeeds are also contested: whose needs are prioritised, who defines them, and what happens when resources are scarce? They shift over time—what is essential in one generation may be insufficient in the next. Urgent needs can weigh against future aspirations, constraining what people feel able to pursue. Needs remind us that design must address what sustains life while enabling conditions for growth beyond the basics." },
  { id: "aspirations", num:3, word: "aspirations", group: 1, strap: "Hopes that point beyond the present", desc: "Aspirations are hopes and ambitions that point beyond the present. They express what people and communities want to achieve, become, or contribute, extending beyond immediate needs into visions of what might be.\n\nAspirations may be personal—linked to growth, creativity, or success—or collective, tied to shared progress or social change. They give purpose and direction, motivating effort toward what matters most. Yet they are never fixed: they shift with circumstances, opportunities, and cultural expectations.\n\nAspirations are shaped unequally. Some communities have greater resources and freedoms to aspire than others. They are influenced by what societies signal is possible, and constrained when pressing needs remain unmet. They are not simply individual desires but socially embedded, opening questions about which futures are pursued, by whom, and for whose benefit. Aspirations remind us that life is lived forward, even when hopes collide with present necessities." },
  { id: "evidence", num:4, word: "evidence",    group: 2, strap: "Grounds for knowledge and credibility", desc: "Evidence is the material that supports conclusions, showing why an observation or account should be taken seriously. It may be quantitative—numbers, measurements, statistics—or qualitative—descriptions, testimonies, observations.\n\nEvidence is never raw: it is gathered, selected, and presented through methods that shape what counts as credible. It may be historical, tracing patterns across time, or ethnographic, capturing lived experience. Collection does not end the process; it raises questions about what is included and what is left out.\n\nStrong evidence is not only accurate but also relevant to the questions at hand. Weak or partial evidence can still be useful if its limits are acknowledged. Evidence provides grounding, but it also invites challenge: what counts, for whom, and in what context?" },
  { id: "constraints", num:5, word: "constraints", group: 2, strap: "Limits that define and shape", desc: "Constraints are the limits within which work and life take place. They can be physical—space, time, resources—or conceptual—rules, conventions, or standards.\n\nConstraints may feel restrictive, yet they also give definition, forcing choices and sharpening focus. They set horizons of what is possible, determining not only what can be done but also what cannot. Some are rigid and unavoidable, while others are negotiable or even productive, prompting new ways of thinking.\n\nConstraints also mark where caution is needed: outcomes hold only within the boundaries they set. Understanding them is as much about recognising opportunities as recognising limits. Constraints remind us that freedom is never absolute—it is always framed by conditions that shape what emerges." },
  { id: "potentials", num:6, word: "potentials",  group: 2, strap: "Capacities not yet unfolded", desc: "Potentials are latent capacities, qualities, or resources that could be activated under the right conditions. They may exist as untapped skills, unused materials, unrecognised connections, or dormant energies.\n\nUnlike outcomes, potentials are not yet fixed; they hold multiple possible futures. They require both imagination and grounding: seeing beyond the present while remaining attentive to what could plausibly develop. In social contexts, they point toward futures a community may aspire to, even if not yet achievable.\n\nPotentials are fragile. They can be overlooked, ignored, or wasted if conditions do not support their growth, and may fade if neglected, closing off futures that once seemed possible. Potentials remind us to attend not only to what exists, but also to what might still become." },
  { id: "ideas", num:7,       word: "ideas",       group: 3, strap: "Openings that reveal possibilities", desc: "Ideas are brief shifts in thought that reveal what might be possible. They often arise suddenly, bringing connections or patterns into view and suggesting directions not previously visible. In their earliest sense, ideas were forms or appearances—the shapes through which something is first grasped. They still work that way: recognitions of underlying patterns that give form to what was vague or unseen.\n\nAn idea is not yet a solution but a beginning—often slight, provisional, and one among many. Some emerge from reframing the familiar, others from noticing what has been overlooked. Their value lies not in completeness but in the movement they initiate, pointing forward, however tentatively.\n\nIdeas remind us that creativity rarely begins with answers but with shifts that open new lines of thought. Many do not endure. Left unattended, they fade; carried forward, they may take shape as concepts." },
  { id: "concepts", num:8, word: "concepts",    group: 3, strap: "Structures that organise meaning", desc: "Concepts are the tools we use to organise the world. They group phenomena, reveal patterns, and frame relationships that help us make sense of complexity. The term carries the sense of grasping together—holding things in relation so they can be thought and worked with.\n\nUnlike ideas, which may be fleeting, concepts are more enduring. They stabilise thought, provide shared language, and make communication possible. Yet they are never neutral: they highlight some aspects of reality while obscuring others, shaping both what we notice and how we act.\n\nConcepts evolve through use, refined when they clarify and abandoned when they constrain. A good concept is rigorous enough to be tested yet generative enough to support further invention. They remind us that understanding is always mediated through the lenses we build. When concepts harden, they can limit imagination; when kept flexible, they can frame scenarios." },
  { id: "scenarios", num:9,   word: "scenarios",   group: 3, strap: "Stories that open possible futures", desc: "Scenarios are sketches of how futures might unfold, outlining scenes in which different actors, conditions, and contexts interact. In theatre, a scenario was a rough outline of action and characters—not a full script, but a frame for improvisation.\n\nIn the same way, scenarios in design, policy, or foresight are not predictions but explorations. They show how trends, decisions, and disruptions might combine to produce multiple outcomes. Often contrasting alternatives, they make consequences visible and open to comparison.\n\nScenarios give form to uncertainty by making it discussable, allowing groups to test assumptions and prepare for change. They work best when treated as provisional—drafts to be rehearsed, compared, and revised. Futures are never singular but multiple, shaped by shifting contexts and choices. By sketching futures, scenarios can unsettle established concepts and open new lines of thought." },
  { id: "media", num:10,       word: "media",       group: 4, strap: "Mediums through which design works", desc: "Media are the instruments and channels through which design takes shape at a distance from the thing itself. Architects use drawings, models, and digital renderings long before a building is realised; landscape designers work with plans and simulations before earth is moved.\n\nMedia extend beyond the human hand and eye: sensors register air quality, satellites capture landscapes, machines map flows. None are neutral. Each frames what can be seen, tested, or valued, highlighting some possibilities while obscuring others.\n\nThey extend perception and make design communicable, but also impose their own logics. A sketch invites improvisation, a 3D model suggests fixity, a diagram abstracts function. Working across media means translating between these affordances, never escaping the gap between representation and reality. Design is always mediated, acting through frames that shape both process and outcome." },
  { id: "forms", num:11,       word: "forms",       group: 4, strap: "Structures that order and affect life", desc: "Forms are the structures and patterns that give order to what we encounter. They operate as systems of organisation—geometries, typologies, layouts—but also carry force in how they move, attract, or repel.\n\nForms elicit responses: they can be beautiful, elegant, charming, awkward, even unsettling. These reactions are not trivial but part of how forms act in the world, shaping attention and behaviour as much as function. They are never pure; they are conditioned by conventions, histories, and technologies that guide what feels appropriate or desirable.\n\nForms are not solely human concerns. They shape habitats, species interactions, and technological arrangements as much as they influence cultural taste. To work with form is to engage both structure and response, balancing order with resonance, system with sensibility. No pattern stands alone—every form acts within wider ecologies of life." },
  { id: "ecologies", num:12,   word: "ecologies",   group: 4, strap: "Relations that sustain and transform life", desc: "Ecologies are interdependent systems through which forms and lives connect. They are not single entities but webs of relations linking elements through flows of energy, material, and meaning.\n\nIn natural systems, ecologies describe interactions between species and environments; in design, they extend to infrastructures, technologies, and cultural practices that sustain or disrupt conditions of living. Nothing exists in isolation: every intervention shifts dependencies, enabling some possibilities while foreclosing others.\n\nEcologies demand attention to scale and feedback—how local changes ripple outward and how accumulated effects return. To think ecologically is to see design as part of larger patterns, functional and symbolic, biological and cultural. They remind us that design exceeds what can be fully represented or ordered, unfolding within wider systems of relation." },
  { id: "participants", num:13,word: "participants", group: 5, strap: "Those who take part directly", desc: "Participants are those actively involved in a process, project, or event. The term is broad: it can refer to individuals, groups, or organisations shaping an activity.\n\nParticipation varies in degree and intensity—from attending or providing input to co-creating, deciding, or implementing. What matters is engagement: participants are not outside observers, but contributors within a defined process. Involvement may be fleeting or sustained, informed or constrained, voluntary or imposed, enthusiastic or reluctant.\n\nThe quality of participation often shapes the quality of outcomes, as those most directly involved bring perspectives others may overlook. No process is abstract; it is always enacted through those who take part. Participation may also extend beyond humans, as technologies, species, or environments shape how a process unfolds." },
  { id: "stakeholders", num:14,word: "stakeholders",group: 5, strap: "Those who hold an interest or stake", desc: "Stakeholders are those with a recognised interest in the outcome of a project, decision, or system. A stake may be direct—financial, professional, personal—or indirect, such as environmental impact, cultural value, or reputational risk.\n\nThey may be individuals, communities, organisations, or institutions, and not all have equal power to assert their claims. Some are formally acknowledged and invited into processes of consultation or negotiation; others remain overlooked or excluded until they make their interests visible.\n\nStakeholders can support, resist, or reshape outcomes depending on how their interests align or clash. Every project sits within a wider field of claims and consequences, where interests intersect. Stakes are not only human: other species, ecosystems, and technologies are also implicated, even if their interests must be represented or translated by others." },
  { id: "coalitions", num:15, word: "coalitions",  group: 5, strap: "Alliances formed around shared cause", desc: "Coalitions are alliances of actors who come together to pursue a common goal. They may be temporary or enduring, formal or informal, small or broad.\n\nThey often form when individual efforts are insufficient and collective strength is needed to amplify voice, pool resources, or coordinate action. Members may not share all interests, but find common ground in a cause that outweighs their differences.\n\nCoalitions can be fragile—held together by trust, reciprocity, and ongoing negotiation—yet also powerful in shaping agendas and shifting systems. Lasting change often depends less on isolated effort than on how alliances are built, maintained, and transformed. Coalitions may extend beyond the human, drawing in technologies, environments, or more-than-human actors whose presence reshapes the field of alliance." },
];

const NATURAL_PAIRS = [
  { cue: CUES.find(c => c.id === "sense"),     contour: CONTOURS.find(c => c.id === "lifeworlds") },
  { cue: CUES.find(c => c.id === "describe"),  contour: CONTOURS.find(c => c.id === "needs") },
  { cue: CUES.find(c => c.id === "recognise"), contour: CONTOURS.find(c => c.id === "aspirations") },
  { cue: CUES.find(c => c.id === "analyse"),   contour: CONTOURS.find(c => c.id === "evidence") },
  { cue: CUES.find(c => c.id === "interpret"), contour: CONTOURS.find(c => c.id === "constraints") },
  { cue: CUES.find(c => c.id === "evaluate"),  contour: CONTOURS.find(c => c.id === "potentials") },
  { cue: CUES.find(c => c.id === "spark"),     contour: CONTOURS.find(c => c.id === "ideas") },
  { cue: CUES.find(c => c.id === "mull"),      contour: CONTOURS.find(c => c.id === "concepts") },
  { cue: CUES.find(c => c.id === "imagine"),   contour: CONTOURS.find(c => c.id === "scenarios") },
  { cue: CUES.find(c => c.id === "craft"),     contour: CONTOURS.find(c => c.id === "media") },
  { cue: CUES.find(c => c.id === "configure"), contour: CONTOURS.find(c => c.id === "forms") },
  { cue: CUES.find(c => c.id === "cultivate"), contour: CONTOURS.find(c => c.id === "ecologies") },
  { cue: CUES.find(c => c.id === "empower"),   contour: CONTOURS.find(c => c.id === "participants") },
  { cue: CUES.find(c => c.id === "inform"),    contour: CONTOURS.find(c => c.id === "stakeholders") },
  { cue: CUES.find(c => c.id === "inspire"),   contour: CONTOURS.find(c => c.id === "coalitions") },
];

const GROUP_IMAGES = {
  1: "/images/diagram-sense.png",
  2: "/images/diagram-analyse.png",
  3: "/images/diagram-imagine.png",
  4: "/images/diagram-make.png",
  5: "/images/diagram-act.png",
};

function getGroup(id) { return GROUPS.find(g => g.id === id) || GROUPS[0]; }
function rowPos(i) { return i === 0 ? "top" : i === 2 ? "bot" : "mid"; }
function getItemPos(item, type) {
  const arr = type === "cue" ? CUES : CONTOURS;
  const group = arr.filter(c => c.group === item.group);
  const i = group.findIndex(c => c.id === item.id);
  return rowPos(i);
}

function GridRow({ cue, contour, pos, group, selCue, selContour, onSelect, openItem, onOpen, readOnly, clearKey }) {
  const g = group;
  const cueSelected     = selCue?.id === cue.id;
  const contourSelected = selContour?.id === contour?.id;
  const isOpen     = openItem?.id === cue.id || openItem?.id === contour?.id;
  const activeType = openItem?.id === contour?.id ? "contour" : "cue";
  const activeItem = activeType === "cue" ? cue : contour;
  const rowRef = useRef(null);
  const [cuePrimed, setCuePrimed]         = useState(false);
  const [contourPrimed, setContourPrimed] = useState(false);

  useEffect(() => {
    if (isOpen && rowRef.current) {
      rowRef.current.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [isOpen]);

  useEffect(() => {
    setCuePrimed(false);
    setContourPrimed(false);
  }, [clearKey]);

  const handleCueTap = () => {
    if (isOpen && activeType === "cue") { if (!readOnly) onSelect("cue", cue); }
    else onOpen(cue);
  };
  const handleContourTap = () => {
    if (isOpen && activeType === "contour") { if (!readOnly) onSelect("contour", contour); }
    else onOpen(contour);
  };


  return (
    <>
      <button ref={rowRef} onClick={handleCueTap} style={{
        background: isOpen && activeType === "cue" ? g.color : "#fff",
        border: "none",
        cursor: "pointer", height: 60, display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 0, position: "relative", transition: "background .15s",
      }}>
        <span style={{ fontSize: 22, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-0.02em", fontFamily: "DM Sans, sans-serif",
          borderBottom: cueSelected ? "2.5px solid #1a1a1a" : "none" }}>{cue.word}</span>
      </button>

      {contour && (
        <button onClick={handleContourTap} style={{
          background: isOpen && activeType === "contour" ? g.color : "#fff",
          border: "none", cursor: "pointer",
          height: 60, display: "flex", alignItems: "center", justifyContent: "center",
          marginBottom: 0, position: "relative", transition: "background .15s",
        }}>
          <span style={{ fontSize: 22, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-0.02em", fontFamily: "DM Sans, sans-serif",
            borderBottom: contourSelected ? "2.5px solid #1a1a1a" : "none" }}>{contour.word}</span>
        </button>
      )}

      {isOpen && (
        <div style={{ gridColumn: "1/-1", animation: "openCard .25s ease" }}>
          <div style={{ background: g.tint, padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#1a1a1a", opacity: 0.5, marginBottom: 6,
                  fontFamily: "Inter, sans-serif", textAlign: activeType === "contour" ? "right" : "left" }}>
                  {activeType === "cue" ? "CUE " + activeItem.num : "CONTOUR " + activeItem.num}
                </p>
                <p style={{ fontSize: 17, fontStyle: "italic", color: "#1a1a1a", opacity: 0.7, lineHeight: 1.6,
                  fontFamily: "Georgia, serif", textAlign: activeType === "contour" ? "right" : "left" }}>{activeItem.strap}</p>
              </div>
              <button onClick={() => onOpen(null)} style={{ background: "none", border: "none", color: "#444", fontSize: 20, cursor: "pointer", padding: 0, flexShrink: 0 }}>&#215;</button>
            </div>
          </div>
          <div style={{ background: g.tint }}>
            <div style={{ padding: "18px 18px 24px" }}>
              {activeItem.desc.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: 17, fontWeight: 400, color: "#1a1a1a", lineHeight: 1.6, fontFamily: "Georgia, serif",
                  marginBottom: i < activeItem.desc.split("\n\n").length - 1 ? 14 : 0, opacity: 0.85 }}>{para}</p>
              ))}
            </div>
            <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
              <img src={GROUP_IMAGES[g.id]} alt="" onError={e => e.target.style.display = "none"}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)" }} />
              <div style={{ position: "absolute", inset: 0, background: g.tint, mixBlendMode: "multiply", opacity: 0.55 }} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FullGrid({ openItem, onOpen, selCue, selContour, onSelect, readOnly, clearKey }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "#fff", borderTop: "1px solid #ddd8d0", borderBottom: "1px solid #ddd8d0", paddingBottom: 20 }}>
      {GROUPS.map(g => {
        const cues     = CUES.filter(c => c.group === g.id);
        const contours = CONTOURS.filter(c => c.group === g.id);
        return [
          <div key={g.id + "-label"} style={{ gridColumn: "1/-1", position: "relative", height: g.id === 1 ? 20 : 40 }}>
            {g.id > 1 && <div style={{ position: "absolute", top: "50%", left: 0, right: 0, borderTop: "1px solid #ddd8d0" }} />}
            <span style={{ position: "absolute", top: g.id === 1 ? 5 : "50%", left: 0, marginTop: g.id === 1 ? 0 : 5,
              fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#bbb", fontFamily: "Inter, sans-serif", lineHeight: 1 }}>
              {cues[0].word} {contours[0].word}
            </span>
          </div>,
          ...cues.map((cue, i) => {
            const contour = contours[i];
            const pos     = rowPos(i);
            const rowOpen = (openItem?.id === cue.id || openItem?.id === contour?.id) ? openItem : null;
            return (
              <GridRow key={g.id + "-" + i} cue={cue} contour={contour} pos={pos} group={g}
                selCue={selCue} selContour={selContour} onSelect={onSelect}
                openItem={rowOpen} onOpen={onOpen} readOnly={readOnly} clearKey={clearKey}
              />
            );
          })
        ];
      })}
    </div>
  );
}

function HereNowTab({ journey }) {
  const [active, setActive] = useState(false);
  const [placeName, setPlaceName] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [aiText, setAiText] = useState("");
  const [aiStatus, setAiStatus] = useState("idle");
  const step = journey[0];

  const getLocation = async () => {
    if (placeName) return placeName;
    let name = "your location";
    try {
      const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, { timeout:6000 }));
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      try {
        const r = await fetch("https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lon + "&format=json");
        const d = await r.json();
        const a = d.address || {};
        name = [a.suburb, a.city || a.town || a.village, a.country].filter(Boolean).join(", ");
      } catch(e) {
        name = lat.toFixed(3) + ", " + lon.toFixed(3);
      }
    } catch(e) {
      try {
        const r = await fetch("https://ipapi.co/json/");
        const d = await r.json();
        name = [d.city, d.country_name].filter(Boolean).join(", ");
      } catch(e2) {}
    }
    const now = new Date();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    setDateStr(months[now.getMonth()] + " " + now.getFullYear());
    setPlaceName(name);
    return name;
  };

  const generate = async () => {
    if (aiStatus === "thinking") return;
    setAiStatus("thinking");
    setAiText("");
    const place = await getLocation();
    const cueDesc = step.cue.desc.split("\n\n").join(" ");
    const contDesc = step.contour.desc.split("\n\n").join(" ");
    const pairs = step.cue.word + " (cue): " + cueDesc + "\n" + step.contour.word + " (contour): " + contDesc;
    const apiPrompt = "You are a design advisor using Design Actions, a toolkit where cues (verbs) orient design action and contours (nouns) define the terrain of inquiry.\n\nThe user is at: " + place + ".\nTheir selected pair: " + step.cue.word + " -- " + step.contour.word + "\n\nFull definitions:\n" + pairs + "\n\nWrite a short, evocative, place-specific text of around 150-200 words that interprets this design action pair for this specific location right now. Be concrete and grounded. Write as flowing prose, no bullet points.";
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1000, messages:[{ role:"user", content:apiPrompt }] }),
      });
      if (!response.ok) throw new Error("API error " + response.status);
      const data = await response.json();
      const result = (data.content || []).find(b => b.type === "text");
      if (!result) throw new Error("empty");
      setAiText(result.text);
      setAiStatus("done");
    } catch(e) {
      setAiText("Something went wrong. Tap to retry.");
      setAiStatus("error");
    }
  };

  const handleTap = () => {
    if (!active) {
      setActive(true);
      if (aiStatus === "idle") generate();
    } else {
      setActive(false);
    }
  };

  const copyText = () => {
    if (!navigator.clipboard) return;
    const cueCapital = step.cue.word.charAt(0).toUpperCase() + step.cue.word.slice(1);
    const sentence = cueCapital + " " + step.contour.word + (placeName ? " in " + placeName : "") + (dateStr ? ", " + dateStr : "");
    const text = [
      step.cue.word.toUpperCase() + " - cue",
      step.cue.strap,
      step.cue.desc,
      "",
      step.contour.word.toUpperCase() + " - contour",
      step.contour.strap,
      step.contour.desc,
      "",
      sentence,
      "",
      aiText,
    ].join("\n");
    navigator.clipboard.writeText(text);
  };

  const cueCapital = step.cue.word.charAt(0).toUpperCase() + step.cue.word.slice(1);
  const sentence = cueCapital + " " + step.contour.word + (placeName ? " in " + placeName : "") + (dateStr ? ", " + dateStr : "");

  return (
    <div style={{ marginTop:16 }}>
      <div
        onClick={handleTap}
        style={{
          border:"1.5px solid #ccc",
          padding:"20px 18px",
          minHeight: active ? "auto" : 60,
          cursor: active ? "default" : "pointer",
        }}>
        {!active && (
          <p style={{ fontSize:17, fontWeight:400, color:"#aaa", fontFamily:"Georgia, serif", fontStyle:"italic" }}>
            Here and now<span style={{ animation:"blink 1s step-end infinite", marginLeft:2 }}>|</span>
          </p>
        )}
        {active && (
          <div>
            <p style={{ fontSize:17, fontWeight:400, color:"#1a1a1a", lineHeight:1.5, fontFamily:"Georgia, serif", fontStyle:"italic", marginBottom: aiText ? 16 : 0 }}>
              {sentence}
            </p>
            {aiStatus === "thinking" && (
              <p style={{ fontSize:17, color:"#bbb", fontFamily:"Georgia, serif", fontStyle:"italic" }}>
                <span style={{ animation:"blink 1s step-end infinite" }}>|</span>
              </p>
            )}
            {(aiStatus === "done" || aiStatus === "error") && (
              <div>
                <p style={{ fontSize:17, fontWeight:400, color:"#1a1a1a", lineHeight:1.6, fontFamily:"Georgia, serif" }}>{aiText}</p>
                <div style={{ display:"flex", justifyContent:"flex-end", marginTop:12 }}>
                  <button onClick={copyText} style={{ background:"none", border:"none", cursor:"pointer", padding:4, color:"#bbb", display:"flex", alignItems:"center" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {aiStatus === "done" && (
        <div style={{ display:"flex", gap:10, marginTop:12 }}>
          <button onClick={generate} style={{ background:"none", border:"1px solid #e0ddd8", borderRadius:20, padding:"6px 14px", fontSize:10, color:"#888", cursor:"pointer", fontFamily:"Inter, sans-serif" }}>regenerate</button>
        </div>
      )}
      <style>{"@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }"}</style>
    </div>
  );
}


export default function DesignActions() {
  const [screen, setScreen]         = useState("prompt");
  const [openItem, setOpenItem]     = useState(null);
  const [selCue, setSelCue]         = useState(NATURAL_PAIRS[0].cue);
  const [selContour, setSelContour] = useState(NATURAL_PAIRS[0].contour);
  const [clearKey, setClearKey]     = useState(0);
  const [showInfo, setShowInfo]     = useState(false);

  const fg = "#1a1a1a";
  const bothSelected = !!(selCue && selContour);

  const handleOpen   = (item) => setOpenItem(prev => prev?.id === item?.id ? null : item);
  const handleSelect = (type, item) => {
    if (type === "cue")     setSelCue(prev => prev?.id === item.id ? null : item);
    if (type === "contour") setSelContour(prev => prev?.id === item.id ? null : item);
  };

  const handleTouchStart = (e) => { window._touchStartY = e.touches[0].clientY; };
  const handleTouchEnd = (e) => {
    const dy = window._touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) > 40) setNatural(dy > 0 ? 1 : -1);
  };

  const setNatural = (offset) => {
    const idx  = NATURAL_PAIRS.findIndex(p => p.cue.id === selCue?.id);
    const base = idx < 0 ? 0 : idx;
    const next = NATURAL_PAIRS[(base + offset + NATURAL_PAIRS.length) % NATURAL_PAIRS.length];
    setSelCue(next.cue);
    setSelContour(next.contour);
  };

  return (
    <div style={{ background: "#fff", height: "100vh", display: "flex", flexDirection: "column", color: fg, maxWidth: 390, margin: "0 auto", fontFamily: "Inter, sans-serif", animation: "appEntry .6s ease both" }}>
      <style>{"* { box-sizing: border-box; margin: 0; padding: 0; } button { cursor: pointer; font-family: Inter, sans-serif; } ::-webkit-scrollbar { display: none; } @keyframes openCard { from { opacity: 0; } to { opacity: 1; } } @keyframes appEntry { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }"}</style>

      {/* HEADER */}
      <div data-header style={{ background: "#fff", padding: "0 16px", height: 48, display: "flex", alignItems: "center", marginBottom: 20, flexShrink: 0 }}>
        <h1 style={{ fontSize: 16, fontWeight: 500, color: fg, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Sans, sans-serif" }}>Design Actions</h1>
        <button onClick={() => setShowInfo(true)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center", padding: 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
          </svg>
        </button>
      </div>

      {/* INFO OVERLAY */}
      {showInfo && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(255,255,255,0.96)", display: "flex", flexDirection: "column", padding: "60px 28px 40px", maxWidth: 390, margin: "0 auto", overflowY: "auto" }}>
          <button onClick={() => setShowInfo(false)} style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "#aaa" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <h2 style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "DM Sans, sans-serif", marginBottom: 28 }}>Design Actions</h2>
          <p style={{ fontSize: 17, fontWeight: 400, color: "#1a1a1a", lineHeight: 1.4, fontFamily: "Georgia, serif", marginBottom: 16 }}>
            A toolkit for tackling complex challenges. Fifteen cues -- verbs that orient action -- paired with fifteen contours -- nouns that define the terrain of inquiry. Select a pair, generate a place-specific brief, take it further in conversation.
          </p>
          <p style={{ fontSize: 17, fontWeight: 400, color: "#1a1a1a", lineHeight: 1.4, fontFamily: "Georgia, serif", marginBottom: 16 }}>
            Tap any word to open its description. Tap again to select it. Find another word to pair -- both words underline. Then tap prompt to generate a response here and now.
          </p>
          <div style={{ marginTop: 32 }}>
            <p style={{ fontSize: 11, color: "#aaa", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em", marginBottom: 4 }}>Stephen Cairns</p>
            <p style={{ fontSize: 11, color: "#aaa", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em", marginBottom: 4 }}>David Neudecker</p>
            <p style={{ fontSize: 11, color: "#aaa", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em", marginBottom: 4 }}>Joshua Vargas</p>
            <p style={{ fontSize: 11, color: "#aaa", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em", marginBottom: 16 }}>Denise Lee</p>
            <p style={{ fontSize: 11, color: "#aaa", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em", marginBottom: 4 }}>beta</p>
            <p style={{ fontSize: 11, color: "#aaa", fontFamily: "Inter, sans-serif", letterSpacing: "0.04em" }}>Location via OpenStreetMap</p>
          </div>
        </div>
      )}

      {/* PROMPT PAGE */}
      {screen === "prompt" && (
        <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
          <div style={{ padding: "0 12px 90px" }}>
            {selCue && selContour ? (
              <div>
                <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, background: "#fff", borderTop: "1px solid #ddd8d0", borderBottom: "1px solid #ddd8d0", paddingBottom: 0 }}>
                  <div style={{ background: getGroup(selCue.group).color, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 22, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-0.02em", fontFamily: "DM Sans, sans-serif", borderBottom: "2.5px solid #1a1a1a", paddingBottom: 1 }}>{selCue.word}</span>
                  </div>
                  <div style={{ background: getGroup(selContour.group).color, height: 60, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 22, fontWeight: 500, color: "#1a1a1a", letterSpacing: "-0.02em", fontFamily: "DM Sans, sans-serif", borderBottom: "2.5px solid #1a1a1a", paddingBottom: 1 }}>{selContour.word}</span>
                  </div>
                  <div style={{ background: "#fff", padding: "5px 0" }}>
                    <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#bbb", fontFamily: "Inter, sans-serif" }}>{"CUE " + selCue.num}</p>
                  </div>
                  <div style={{ background: "#fff", padding: "5px 0", textAlign: "right" }}>
                    <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#bbb", fontFamily: "Inter, sans-serif" }}>{"CONTOUR " + selContour.num}</p>
                  </div>
                </div>
                <HereNowTab key={selCue.id + "-" + selContour.id} journey={[{ cue: selCue, contour: selContour, id: 1 }]} />
              </div>
            ) : (
              <div style={{ padding: "32px 0", textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#ccc", letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>no pair selected</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* READ PAGE */}
      {screen === "home" && (
        <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
          <div style={{ padding: "0 12px 90px" }}>
            <FullGrid openItem={openItem} onOpen={handleOpen} selCue={selCue} selContour={selContour} onSelect={handleSelect} readOnly={false} clearKey={clearKey} />
          </div>
        </div>
      )}

      {/* NAV */}
      <div style={{ flexShrink:0, background:"#fff", padding:"10px 16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        {screen === "prompt" && (
          <div style={{ display:"flex", alignItems:"center", gap:8, width:"100%", justifyContent:"space-between" }}>
            <button onClick={() => setScreen("home")} style={{ fontSize:15, color:"#888", border:"1px solid #e0ddd8", borderRadius:20, padding:"10px 22px", background:"none", cursor:"pointer", fontWeight:500, letterSpacing:"0.04em" }}>theory</button>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => { setSelCue(CUES[Math.floor(Math.random()*CUES.length)]); setSelContour(CONTOURS[Math.floor(Math.random()*CONTOURS.length)]); }} style={{ fontSize:15, color:"#888", border:"1px solid #e0ddd8", borderRadius:20, padding:"10px 22px", background:"none", cursor:"pointer", fontWeight:500, letterSpacing:"0.04em" }}>scramble</button>
              <button onClick={() => setNatural(1)} style={{ background:"#1a1a2e", color:"#fff", border:"none", borderRadius:20, padding:"10px 22px", fontSize:15, fontWeight:500, letterSpacing:"0.04em", cursor:"pointer" }}>next</button>
            </div>
          </div>
        )}
        {screen === "home" && (
          <div style={{ display:"flex", alignItems:"center", gap:8, width:"100%", justifyContent:"space-between" }}>
            <button onClick={() => { setSelCue(null); setSelContour(null); setOpenItem(null); setClearKey(k => k+1); }} style={{ fontSize:15, color:"#aaa", border:"1px solid #e0ddd8", borderRadius:20, padding:"10px 22px", background:"none", cursor:"pointer", fontWeight:500, letterSpacing:"0.04em" }}>clear</button>
            <button onClick={() => setScreen("prompt")} style={{ background:"#1a1a2e", color:"#fff", border:"none", borderRadius:20, padding:"10px 22px", fontSize:15, fontWeight:500, letterSpacing:"0.04em", cursor:"pointer" }}>&#8592;</button>
          </div>
        )}
      </div>
    </div>
  );
}
