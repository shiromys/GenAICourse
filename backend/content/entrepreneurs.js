// Content update data for: AI Prompting for Entrepreneurs and Startup Builders
// Matched to production by exact course/module/lesson TITLE — see scripts/updateCourseContent.js

export default {
  courseTitle: 'AI Prompting for Entrepreneurs and Startup Builders',
  modules: [
    {
      title: 'Introduction to AI Prompting for Startups',
      lessons: [
        {
          title: 'The Role of AI in Entrepreneurship',
          duration: 7,
          content: `Early-stage founders wear every hat — product, marketing, finance, hiring — often with no team to delegate to. AI prompting is most valuable here not as a novelty but as a way to get a capable first pass on tasks outside a founder's core expertise, fast enough to keep moving instead of stalling on something unfamiliar.\n\nA solo founder with a strong product background but no marketing experience can get a workable first-draft positioning statement, a launch email, or a set of customer interview questions in minutes rather than losing a day to unfamiliar territory or paying for help they can't yet afford. This doesn't replace the judgment of knowing what to build or who to sell to — it compresses the time cost of producing the supporting material that judgment requires.\n\nThroughout this course, "AI prompting" means directing a language model with clear, specific instructions to produce startup-relevant drafts — a business model summary, investor talking points, a competitor teardown — that a founder then reviews, fact-checks, and adapts to their actual business reality.`,
          keyPoints: [
            'AI prompting helps founders get a competent first pass on tasks outside their core expertise.',
            'This is especially valuable for solo or small founding teams without specialists to delegate to.',
            'AI compresses the time cost of producing supporting material, not the judgment behind decisions.',
            'Every AI-assisted draft still needs founder review and adaptation to real business context.'
          ],
          learningObjectives: [
            'Explain how AI prompting supports founders working outside their core expertise.',
            'Describe the review responsibility that applies to AI-assisted startup materials.'
          ],
        },
        {
          title: 'Understanding AI Prompting',
          duration: 6,
          content: `A startup-context prompt works best with the same core structure used throughout this course series: context (what's the business, stage, and situation), a specific ask (not "help with marketing" but a defined deliverable), and constraints (budget, timeline, what's already been tried).\n\nWeak prompt: "Help me think about my startup's marketing." Strong prompt: "We're a pre-launch B2B SaaS tool for small accounting firms, bootstrapped with a $500/month marketing budget. Draft 3 low-cost customer acquisition tactics we could test in the next 30 days, given our budget and that we have no existing audience yet." The strong version gives the model your actual constraints, which shapes genuinely useful, realistic suggestions instead of generic advice that assumes resources you don't have.\n\nA founder-specific habit worth building early: keep a short, reusable "business context" paragraph (stage, product, audience, constraints) to paste into every prompt, so you're not re-explaining your business from scratch each time — this alone saves meaningful time across dozens of prompts per week.`,
          keyPoints: [
            'Startup prompts need context (business, stage, situation), a specific ask, and real constraints.',
            'Naming actual constraints (budget, timeline) produces realistic suggestions, not generic advice.',
            'Keep a reusable "business context" paragraph to paste into prompts, saving repeated re-explanation.',
            'A specific deliverable ask outperforms a vague "help me think about X" request.'
          ],
          learningObjectives: [
            'Write a startup-context prompt including business context, ask, and constraints.',
            'Build a reusable business-context paragraph for repeated use.'
          ],
        },
        {
          title: 'Startup Tasks Supported by AI',
          duration: 6,
          content: `AI is strongest on startup tasks that are language-heavy and don't require live proprietary data: drafting (pitch content, emails, job posts), structuring (turning a rough idea into a business model canvas format), brainstorming (feature ideas, positioning angles, acquisition channels to test), and first-pass research synthesis (given real source material you provide).\n\nAI is weakest on tasks requiring judgment about your specific, unique situation: deciding whether to pivot, evaluating a cofounder relationship, or making a final call on product-market fit — these require context, intuition, and stakes-awareness no prompt can substitute for, however well-crafted.\n\nA useful filter specific to early-stage founders: if the task is "produce a competent draft of something I could review and adjust," AI is a strong fit and a real time-saver. If the task is "make a judgment call that defines our company's direction," treat AI output as one input to your thinking, not a substitute for it.`,
          keyPoints: [
            'AI excels at drafting, structuring, brainstorming, and synthesizing research you provide.',
            'AI is weak on judgment calls unique to your specific situation — pivots, cofounder issues, PMF calls.',
            'A simple filter: "produce a draft to review" fits AI well; "make a defining judgment call" does not.',
            'Treat AI output on strategic decisions as one input, not a substitute for founder judgment.'
          ],
          learningObjectives: [
            'Categorize startup tasks as strong or weak fits for AI assistance.',
            'Apply the draft-vs-judgment-call filter to a real startup task.'
          ],
        },
        {
          title: 'Advantages and Limitations of AI in Startups',
          duration: 7,
          content: `The advantages for founders specifically: speed (a first draft of almost anything in minutes), access (a solo founder gets a reasonable first pass at tasks they'd otherwise need to hire out or learn from scratch), and low cost relative to hiring specialist help for every unfamiliar task at an early, cash-constrained stage.\n\nThe limitations matter just as much for a founder as for a large company: AI has no knowledge of your specific traction, customers, or internal data unless you provide it — it cannot tell you if your idea will work, and a confident-sounding AI response about market size or competitive advantage can be entirely wrong if not grounded in real data you supply. There's also a subtler risk specific to founders: over-relying on AI-generated business plans or pitches can produce polished-sounding but generic material that doesn't actually reflect deep, first-hand understanding of your customer — something experienced investors and customers can often sense.\n\nThe balance this course teaches: use AI aggressively to produce fast, competent first drafts and to compress research time, while keeping the founder's own direct customer knowledge and judgment as the actual source of truth behind any of it.`,
          keyPoints: [
            'Key advantages for founders: speed, access to skills you don’t have in-house, and low cost.',
            'AI can’t tell you if your idea will work and can state confident but ungrounded market claims.',
            'Over-relying on AI can produce polished but generic material lacking real customer understanding.',
            'AI compresses drafting and research time; founder judgment and customer knowledge remain the source of truth.'
          ],
          learningObjectives: [
            'Summarize the core advantages AI offers early-stage founders.',
            'Identify the risk of generic, AI-polished material lacking genuine customer insight.'
          ],
          resources: [
            {
              title: 'Module 1 Cheat Sheet: Reusable Business Context Block',
              type: 'download',
              description: 'A fill-in-once business context paragraph to paste into every startup-related AI prompt.',
              content: `REUSABLE BUSINESS CONTEXT BLOCK (fill in once, paste into every prompt):\n\n"We are a [stage: pre-launch/early-stage/post-revenue] [product type] for [target audience]. Our current traction: [users/revenue/waitlist size, or 'none yet']. Our budget/resource constraints: [$ or team size]. What we've already tried: [brief list, or 'nothing yet']. Our biggest current challenge: [one sentence]."\n\nAppend your specific task and ask after this block in every prompt.`
            }
          ]
        },
      ],
    },
    {
      title: 'Startup Idea Generation and Validation',
      lessons: [
        {
          title: 'Generating Startup Ideas with AI',
          duration: 6,
          content: `AI is a genuinely useful brainstorming partner for the volume phase of idea generation — producing many variations quickly, which you then filter, rather than expecting it to hand you a single validated, ready-to-build idea. Treat every AI-generated idea as an unvalidated starting point, not a signal that the idea is any good.\n\nA useful prompt: "I'm interested in solving problems related to [broad area, e.g., 'small business bookkeeping']. Generate 15 potential product ideas, varying in scope from a simple tool to a full platform. For each, note who specifically would use it and what problem it solves." Naming a broad area of interest, rather than asking for "startup ideas" in general, keeps output relevant to where you actually have some context or passion to sustain the work.\n\nThe real value is quantity-to-quality filtering: from 15 generated ideas, most founders find 1-2 worth exploring further — which is still much faster than staring at a blank page, even though 13 of 15 ideas will reasonably get discarded.`,
          keyPoints: [
            'AI is useful for volume brainstorming — generate many ideas, then filter, rather than expecting one perfect idea.',
            'Every AI-generated idea is an unvalidated starting point, not a signal of quality.',
            'Anchor brainstorming to a broad area you have context or passion for, not a fully generic request.',
            'Expect most generated ideas to be discarded — the value is a fast path to the 1-2 worth exploring.'
          ],
          learningObjectives: [
            'Generate a diverse list of startup ideas within a chosen problem area.',
            'Explain why AI-generated ideas require independent validation.'
          ],
        },
        {
          title: 'Identifying Market Problems',
          duration: 7,
          content: `A startup idea is only as good as the real problem it solves, and AI can help you probe whether a problem is likely to be real and significant enough — though it can't confirm this for certain; only real customer conversations can. Use AI to sharpen your thinking before those conversations, not to replace them.\n\nUseful prompt: "I believe [target audience] struggles with [problem]. What questions should I ask in customer interviews to validate whether this is a real, significant, and frequent problem for them — versus a minor annoyance they've already found workarounds for?" This produces a sharper interview guide than winging it, and specifically targets the distinction between a real pain point and a minor inconvenience, which is one of the most common places first-time founders overestimate a problem's significance.\n\nAfter real interviews, a useful follow-up prompt: "Here's what I heard from 5 customer interviews: [paste notes]. Does this sound like a significant, frequent problem worth building a product around, or a minor annoyance? What in the interview notes supports your read?" This is AI helping you interpret real data you've gathered — a much more trustworthy use than asking it to guess at problem significance from scratch.`,
          keyPoints: [
            'AI can help sharpen thinking before customer conversations, but can’t confirm a problem is real on its own.',
            'A good interview guide probes whether a problem is significant and frequent, not just present.',
            'First-time founders commonly overestimate problem significance — distinguish pain points from minor annoyances.',
            'Feeding real interview notes to AI for interpretation is more trustworthy than asking it to guess from scratch.'
          ],
          learningObjectives: [
            'Generate a customer interview guide to validate a suspected market problem.',
            'Use AI to interpret real interview data rather than to guess at problem significance.'
          ],
        },
        {
          title: 'Using AI for Market Research',
          duration: 6,
          content: `Startup market research follows the same gather-first discipline covered in this course series' research-focused course: supply real sources (competitor sites, industry reports, forum discussions where your target customer hangs out) and use AI to synthesize and structure them, rather than asking the AI to state market facts from memory.\n\nA useful startup-specific research prompt: "Here's what I found about existing solutions to [problem]: [paste competitor descriptions, reviews]. What gaps or unmet needs do customer reviews suggest, based only on this material?" Real customer reviews of existing (even imperfect) solutions are often a goldmine for identifying what people wish existed but doesn't — more reliable than speculation.\n\nAs with all market statistics in this course series, never accept a market-size or growth-rate number from AI without a stated source — for a founder about to make major resource decisions based on market opportunity, an invented or outdated statistic is a genuinely risky input to build a business case on.`,
          keyPoints: [
            'Supply real competitor and customer-review sources; don’t rely on AI memory for market facts.',
            'Real reviews of existing imperfect solutions often reveal genuine unmet needs.',
            'Never accept a market-size or growth statistic from AI without a stated, verifiable source.',
            'Market research errors are especially risky for founders making major resource decisions on them.'
          ],
          learningObjectives: [
            'Use real customer reviews as source material to identify unmet market needs.',
            'Apply source-verification discipline to any market statistic used in startup planning.'
          ],
        },
        {
          title: 'Common Prompting Mistakes in Startup Planning',
          duration: 6,
          content: `Three mistakes show up repeatedly in founder prompting. First, asking AI to validate an idea directly ("is this a good startup idea?") — AI tends toward generically encouraging responses and has no access to the real-world signal (actual customer reactions) that validation actually requires; ask it to help you design validation instead, not to perform validation itself.\n\nSecond, treating AI-generated market research as confirmed fact without checking sources — covered throughout this course, but worth repeating specifically for planning documents that might go to investors or guide real spending decisions. Third, skipping the business-context block (Module 1) and getting generic startup advice that doesn't account for your actual stage, budget, or market — advice that would apply to almost any startup is rarely useful for yours specifically.\n\nA fourth, subtler mistake: using AI-generated language directly in investor-facing or customer-facing materials without editing it into your own authentic voice — polished-but-generic pitch language is a pattern experienced investors recognize quickly, and it can undercut trust in exactly the moment you most need to build it.`,
          keyPoints: [
            'Don’t ask AI to validate an idea directly — ask it to help design real validation instead.',
            'Never treat AI market research as confirmed fact, especially for investor-facing planning documents.',
            'Always include your business-context block to avoid generic, one-size-fits-all advice.',
            'Edit AI-generated language into your authentic voice before investor or customer-facing use — polish without substance is recognizable.'
          ],
          learningObjectives: [
            'Identify the most common AI prompting mistakes founders make in planning.',
            'Apply a fix for each identified mistake to a founder’s workflow.'
          ],
          resources: [
            {
              title: 'Module 2 Cheat Sheet: Idea Validation Prompt Set',
              type: 'download',
              description: 'A sequence of prompts for generating, probing, and validating a startup idea using real customer input.',
              content: `IDEA GENERATION: "Interested in [broad area]. Generate 15 product ideas, varying in scope. For each, note who specifically would use it and what problem it solves."\n\nINTERVIEW GUIDE: "I believe [audience] struggles with [problem]. What interview questions would validate whether this is real, significant, and frequent — versus a minor annoyance?"\n\nINTERVIEW INTERPRETATION: "Here's what I heard from [N] interviews: [paste notes]. Does this sound like a significant problem worth building around? What in the notes supports your read?"`
            }
          ]
        },
      ],
    },
    {
      title: 'Product Development and Business Planning',
      lessons: [
        {
          title: 'AI for Product Idea Development',
          duration: 6,
          content: `Once you have a validated problem, AI can help structure the solution space — generating feature ideas, prioritizing an MVP scope, or stress-testing whether a proposed feature actually addresses the validated problem or is scope creep dressed up as a good idea.\n\nA useful MVP-scoping prompt: "Our validated problem: [paste it]. Here are 10 feature ideas we're considering: [list them]. Which 3 would form the leanest possible MVP that still meaningfully tests our core hypothesis, and which should we explicitly defer?" This applies real discipline to a common early-stage trap — building too much before learning whether the core idea resonates with real users.\n\nA useful stress-test prompt for any proposed feature: "Does this feature directly address our validated problem, or is it solving a different, adjacent problem?" Asked honestly, this catches a meaningful share of scope creep before it consumes development time that should go toward testing the core hypothesis first.`,
          keyPoints: [
            'Use AI to help scope a lean MVP that tests the core hypothesis, not build every possible feature.',
            'A stress-test prompt can catch scope creep by checking whether a feature addresses the validated problem.',
            'MVP scoping discipline prevents the common early-stage trap of building too much before learning anything.',
            'AI helps structure and prioritize; founder judgment decides what the MVP actually needs to prove.'
          ],
          learningObjectives: [
            'Use AI to scope a lean MVP around a validated problem.',
            'Apply a scope-creep stress test to a proposed product feature.'
          ],
        },
        {
          title: 'Creating a Business Model',
          duration: 7,
          content: `AI is well suited to structuring a business model into a standard framework (like a business model canvas) once you supply the real inputs — it can't invent your actual revenue model, cost structure, or customer segments from nothing, but it can help you think through each component systematically and spot gaps.\n\nA useful prompt: "Here's what I know about my business: [paste your business context block plus specifics on how you plan to make money]. Help me draft a business model canvas covering: customer segments, value proposition, channels, revenue streams, cost structure, and key resources. For any section where my input is thin, flag it as a gap to think through further, rather than filling it in generically." That last instruction matters — an AI-invented cost structure or revenue projection is not useful input; an honest flag that you haven't thought through a section yet is.\n\nOnce drafted, a useful stress-test question: "Looking at this business model, what's the biggest unvalidated assumption it depends on?" This surfaces the riskiest part of your model — usually the thing most worth testing or validating next, before investing further in the rest.`,
          keyPoints: [
            'AI structures a business model framework well but can’t invent your real revenue or cost data.',
            'Ask AI to flag thin or unclear sections as gaps rather than filling them in generically.',
            'A generic AI-invented cost structure or projection is not useful — honesty about gaps is.',
            'Ask what the biggest unvalidated assumption is to identify what to test next.'
          ],
          learningObjectives: [
            'Draft a business model canvas using real business inputs and AI structuring.',
            'Identify the riskiest unvalidated assumption in a drafted business model.'
          ],
        },
        {
          title: 'Writing a Startup Business Plan',
          duration: 7,
          content: `A business plan first draft is a strong AI use case for the same reason a research report draft is: turning organized thinking into readable, structured prose — as long as the actual substance (market understanding, financial assumptions, strategy) comes from the founder's real knowledge, not from the AI inventing plausible-sounding numbers.\n\nA useful drafting prompt: "Using this information about my business [paste business model canvas, validated problem, target market research], draft a business plan section on [specific section, e.g., 'Market Opportunity']. Only use the facts and figures I've provided — flag anywhere you'd need more information from me to make this section stronger." Drafting one section at a time, with real inputs each time, produces a far more grounded document than asking for an entire business plan in one shot from a brief prompt.\n\nBefore finalizing any financial projections specifically, treat AI-generated numbers as placeholder structure only, to be replaced with your own researched or modeled figures — investors and lenders will scrutinize financial assumptions closely, and generic AI-generated projections rarely hold up to that scrutiny.`,
          keyPoints: [
            'Draft a business plan section by section with real inputs, not the whole document from a brief prompt.',
            'Substance (market understanding, financial assumptions) must come from real founder knowledge.',
            'Ask AI to flag where more founder input would strengthen a section, rather than filling gaps generically.',
            'Never finalize AI-generated financial projections — replace them with your own researched figures before use.'
          ],
          learningObjectives: [
            'Draft a business plan section grounded in real business inputs.',
            'Explain why AI-generated financial projections require independent verification and replacement.'
          ],
        },
        {
          title: 'Branding and Startup Identity',
          duration: 6,
          content: `AI can help generate name options, tagline variations, and brand voice descriptions quickly — genuinely useful for compressing the brainstorming phase of branding, which can otherwise consume disproportionate founder time relative to its importance at the earliest stage.\n\nA useful prompt: "Our business: [paste context]. Generate 20 potential startup names, varying in style from descriptive/literal to abstract/evocative. For each, note the general impression it creates." Wide variation across styles, rather than 20 similar-sounding options, gives you a genuinely useful range to react to.\n\nAn important practical step AI can't do for you: checking trademark availability and domain availability for any name you're seriously considering — always verify these independently before getting attached to a name, since AI has no ability to confirm real-world legal or domain availability, and a name that seems available can turn out to be already trademarked or in active use elsewhere.`,
          keyPoints: [
            'AI compresses the brainstorming phase for names, taglines, and brand voice descriptions.',
            'Ask for wide style variation (literal to abstract) rather than many similar-sounding options.',
            'AI cannot check real-world trademark or domain availability — always verify independently.',
            'Don’t get attached to a name before confirming it’s actually legally and practically available.'
          ],
          learningObjectives: [
            'Generate a varied set of brand name options using AI brainstorming.',
            'Explain why trademark and domain availability require independent verification.'
          ],
          resources: [
            {
              title: 'Module 3 Cheat Sheet: Business Model & Branding Prompts',
              type: 'download',
              description: 'Prompts for structuring a business model canvas and generating a diverse set of brand name options.',
              content: `BUSINESS MODEL CANVAS PROMPT\n"[Business context]. Draft a business model canvas: customer segments, value proposition, channels, revenue streams, cost structure, key resources. Flag thin sections as gaps rather than filling generically."\n\nBRAND NAME PROMPT\n"[Business context]. Generate 20 potential names, varying from descriptive/literal to abstract/evocative. Note the impression each creates. (Remember: verify trademark and domain availability independently before deciding.)"`
            }
          ]
        },
      ],
    },
    {
      title: 'Responsible AI Use in Entrepreneurship',
      lessons: [
        {
          title: 'Ensuring Accuracy in AI-Generated Insights',
          duration: 6,
          content: `For a founder, an inaccurate AI-generated insight carries outsized risk — resources are scarce, and a decision based on a wrong market size, an invented competitor detail, or a fabricated customer statistic can waste months of limited runway. The verification discipline from this course series applies with extra weight here.\n\nThe practical habit: any number, market claim, or competitor fact that will inform a real spending or strategic decision gets checked against a real, current source before you act on it — not just before you publish it externally. This includes internal planning, not just investor-facing material; a founder can mislead themselves just as easily as they can mislead an investor with an unverified statistic.\n\nA useful prompting safeguard, consistent with the research course in this series: explicitly instruct "only use facts I've provided; if you don't have real data for something, say so rather than estimating" — and take that flag seriously as a signal to go find the real data before proceeding, not as a formality to route around.`,
          keyPoints: [
            'Inaccurate insights carry outsized risk for founders given scarce time and resources.',
            'Verify facts before acting on them internally, not just before publishing externally.',
            'A founder can mislead themselves with an unverified statistic just as easily as misleading investors.',
            'Take an AI’s "I don’t have real data for this" flag seriously as a signal to research further.'
          ],
          learningObjectives: [
            'Apply verification discipline to internal planning decisions, not just external communications.',
            'Recognize the outsized risk of acting on unverified AI-generated insights with limited runway.'
          ],
        },
        {
          title: 'Avoiding Bias in Startup Research',
          duration: 6,
          content: `Founders face a specific bias risk beyond general AI training-data bias: motivated reasoning about their own idea. It's natural to unconsciously prompt in ways that confirm optimism about your own startup — asking "why will my product succeed" rather than "what evidence suggests my product might fail."\n\nA useful counter-practice: deliberately prompt for the disconfirming case. "Here's my business plan: [paste it]. Play devil's advocate — what are the 5 strongest reasons this could fail?" This is uncomfortable by design, but catching a weak assumption in an AI conversation costs nothing; catching the same weak assumption after months of building costs a great deal.\n\nBeyond founder-specific motivated reasoning, the general AI training-data bias risk from other courses in this series still applies — AI knowledge may be weaker on niche markets, non-English-speaking regions, or very new companies, so treat findings in those areas with extra scrutiny and independent verification.`,
          keyPoints: [
            'Founders face motivated-reasoning bias: unconsciously prompting to confirm optimism about their own idea.',
            'Deliberately prompt for the disconfirming case — the strongest reasons an idea might fail.',
            'Catching a weak assumption early via prompting is far cheaper than catching it after months of building.',
            'General AI training-data bias (weaker on niche markets, new companies) still applies to founder research.'
          ],
          learningObjectives: [
            'Apply a devil’s-advocate prompt to stress-test a business plan for weaknesses.',
            'Recognize motivated reasoning as a specific bias risk in founder self-research.'
          ],
        },
        {
          title: 'Protecting Sensitive Business Information',
          duration: 6,
          content: `Early-stage founders often work with genuinely sensitive material — unfiled patent ideas, financial projections shared only with a small circle, cap table details, or early product code. Before pasting any of this into an AI tool, apply the same vendor-trust diligence covered elsewhere in this course series: know the tool's data-retention and training policies before sharing anything you wouldn't want to see outside your control.\n\nA particular founder-specific risk: pasting a genuinely novel, unfiled idea into a public AI tool before any legal protection is in place. If you're concerned about idea protection (which matters more for some businesses — deep IP-dependent ones — than others), consider discussing general market or business-model questions without revealing the specific novel technical mechanism, or consult a lawyer about timing before disclosing sensitive IP anywhere outside a controlled, trusted context.\n\nFor typical early-stage business planning (market research, customer personas, generic business model structuring), this risk is often lower than founders assume — the sensitive part is usually the specific execution detail, not the general business concept, which is rarely novel or valuable enough on its own to need this level of caution.`,
          keyPoints: [
            'Know an AI tool’s data-retention and training policy before sharing sensitive business material.',
            'Consider IP protection timing before disclosing a genuinely novel, unfiled technical mechanism.',
            'General business concepts are usually not sensitive enough to warrant extreme caution — specific execution detail often is.',
            'Consult a lawyer about disclosure timing for deep-IP-dependent businesses if concerned.'
          ],
          learningObjectives: [
            'Apply data-handling diligence to sensitive startup material before using AI tools.',
            'Distinguish between business concepts that typically need less caution and technical mechanisms that may need more.'
          ],
        },
        {
          title: 'Maintaining Authentic Startup Vision',
          duration: 6,
          content: `A specific risk worth naming directly for founders: over-using AI to shape core vision and positioning can result in a startup that sounds like every other AI-optimized pitch — technically polished, but missing the distinctive, first-hand insight that usually comes from a founder's direct, sometimes messy understanding of a real problem.\n\nThe practical boundary this course recommends: use AI heavily for structure, drafting speed, and research synthesis (the mechanical work), while keeping the actual vision — why this problem, why now, why you — as something you articulate yourself, in your own words, informed by AI-assisted research but not generated by it. Investors and early customers are often responding to conviction and authentic understanding as much as to the polish of the material presenting it.\n\nA useful self-check before any pitch or key positioning document goes out: does this sound like something only I (or my specific team) could have written, given our specific experience with this problem? Or could this exact document have been generated for almost any startup in this space? If it's the latter, the vision section specifically needs a rewrite in your own authentic voice, informed by AI's structural help but not replaced by it.`,
          keyPoints: [
            'Over-reliance on AI for vision and positioning can produce generic-sounding, indistinct startup material.',
            'Use AI heavily for structure and drafting speed; keep core vision articulation in your own authentic voice.',
            'Investors and customers often respond to conviction and first-hand understanding, not just polish.',
            'Self-check: could this document apply to almost any startup, or does it reflect our specific experience?'
          ],
          learningObjectives: [
            'Distinguish which parts of startup material benefit from heavy AI use versus authentic founder voice.',
            'Apply a self-check to detect generic, indistinct positioning in pitch material.'
          ],
          resources: [
            {
              title: 'Module 4 Cheat Sheet: Devil’s Advocate & Vision Authenticity Checks',
              type: 'download',
              description: 'A stress-test prompt and a self-check for keeping AI-assisted planning grounded and authentic.',
              content: `DEVIL'S ADVOCATE PROMPT\n"Here's my business plan: [paste it]. Play devil's advocate — what are the 5 strongest reasons this could fail? Be genuinely critical, not encouraging."\n\nVISION AUTHENTICITY SELF-CHECK\nBefore sending any pitch or positioning document, ask:\n☐ Does this reflect our specific, first-hand experience with this problem?\n☐ Could this exact document apply to almost any startup in this space? (If yes — rewrite the vision section yourself.)\n☐ Have I verified every number and claim against real data, not AI-generated estimates?`
            }
          ]
        },
      ],
    },
    {
      title: 'Applying AI in Startup Growth Strategies',
      lessons: [
        {
          title: 'AI for Startup Marketing Strategies',
          duration: 6,
          content: `Early-stage marketing benefits from the same AI applications covered in this course series' marketing-focused course — drafting, brainstorming, and structuring — applied with startup-specific constraints: minimal budget, minimal existing audience, and the need to test cheaply before committing resources to any one channel.\n\nA useful prompt: "[Business context, including budget]. We have zero existing audience. Suggest 5 low-cost or free marketing tactics we could realistically test in the next 30 days, and for each, note what success would look like so we know whether to double down or move on." Asking for a success signal per tactic matters — early-stage marketing should be treated as a series of cheap experiments, not a single big bet.\n\nAs the business grows and specific channels show traction, marketing prompting shifts toward more channel-specific tactics (covered in more depth in the marketing-focused course in this series) — but the early-stage discipline of cheap, measurable tests remains the right starting posture regardless of which channels eventually work.`,
          keyPoints: [
            'Early-stage marketing prompting should account for minimal budget and no existing audience.',
            'Ask for a defined success signal per tactic to treat marketing as cheap, measurable experiments.',
            'Cheap testing before committing resources is the right early-stage posture, regardless of eventual channel fit.',
            'This builds on general AI marketing applications, applied with startup-specific resource constraints.'
          ],
          learningObjectives: [
            'Generate low-cost, testable marketing tactics appropriate to an early-stage budget.',
            'Define success signals for marketing experiments before running them.'
          ],
        },
        {
          title: 'Customer Acquisition Strategies',
          duration: 7,
          content: `Customer acquisition strategy for a startup is fundamentally about finding a repeatable, sustainable way to reach the people who have the validated problem from earlier modules — AI can help structure and brainstorm channel options, but the actual signal on what's working has to come from real data you gather as you test.\n\nA useful prompt for channel brainstorming: "[Business context, target customer description]. Where does our target customer likely already spend time — online communities, events, other tools they use? Suggest acquisition channels based on meeting them there, not just generic advertising." This grounds channel suggestions in where your specific customer actually is, rather than generic advice applicable to any business.\n\nOnce you have real acquisition data (even from a small test), a useful analysis prompt: "Here's what we tried and the results: [paste real data — channel, cost, signups, conversions]. Which channel shows the best early signal relative to cost? What would you want to see before scaling any of these further?" This is AI helping interpret real data, the most trustworthy use of AI in this specific area.`,
          keyPoints: [
            'Effective acquisition strategy starts with brainstorming where your specific target customer already is.',
            'Ground channel suggestions in your actual customer description, not generic advertising advice.',
            'Real signal on what’s working must come from actual test data, not AI speculation.',
            'AI is most trustworthy here when interpreting real results you’ve already gathered.'
          ],
          learningObjectives: [
            'Brainstorm customer acquisition channels grounded in a specific target customer description.',
            'Use AI to interpret real acquisition test data rather than to predict outcomes.'
          ],
        },
        {
          title: 'Monitoring Startup Performance',
          duration: 6,
          content: `As a startup gains traction, tracking the right metrics becomes important — and AI can help synthesize and communicate performance data, though it should never be the source of the actual numbers, which must come from your real analytics, sales, or financial systems.\n\nA useful prompt: "Here's our performance data for the last month: [paste real numbers — signups, revenue, churn, etc.]. Summarize the 3 most important takeaways in plain language, and flag anything that looks concerning or worth investigating further." This is the same "real data in, plain-language summary out" pattern used throughout this course series for performance reporting, applied to startup metrics specifically.\n\nA founder-specific caution: it's tempting to selectively highlight only positive metrics, especially in investor updates. Use AI to help present data clearly, but resist the temptation to ask it to "make this look better" — investors generally value founders who present balanced, honest metrics over consistently rosy-sounding updates, and AI polish can't substitute for genuine performance.`,
          keyPoints: [
            'AI synthesizes and communicates real performance data; it should never be the source of the numbers themselves.',
            'The "real data in, plain-language summary out" pattern applies to startup metrics reporting.',
            'Resist using AI to make weak metrics "look better" — investors value balanced, honest updates.',
            'AI polish on presentation can’t substitute for genuine underlying performance.'
          ],
          learningObjectives: [
            'Use AI to summarize real startup performance data in plain language.',
            'Recognize the risk of using AI to misleadingly polish weak metrics.'
          ],
        },
        {
          title: 'Future of AI in Startup Ecosystems',
          duration: 6,
          content: `Several trends are worth watching, understanding this course focuses on durable skills over specific tools: AI-native startups building AI capability directly into their core product (not just their internal workflow), increasing investor familiarity with AI-assisted planning materials (meaning generic AI-polished pitches are increasingly recognizable and less differentiating), and growing availability of AI tools built specifically for startup tasks (financial modeling, market research, pitch feedback).\n\nThe second trend deserves particular attention: as AI-assisted planning becomes the norm rather than the exception, the competitive advantage shifts from "did you use AI" to "how well did you combine AI's speed with genuine, first-hand founder insight" — reinforcing the authenticity principle from Module 4 as a durable advantage rather than an optional nicety.\n\nAs with the other courses in this series, the practical takeaway is to invest in the transferable skill — structured prompting, verification discipline, and knowing where to keep human judgment central — rather than over-indexing on any single tool, since the specific tools available to founders will keep evolving rapidly.`,
          keyPoints: [
            'Watch for AI-native products, more AI-literate investors, and startup-specific AI tools.',
            'As AI-assisted planning becomes the norm, differentiation shifts to combining AI speed with genuine founder insight.',
            'Authentic, first-hand founder insight becomes a durable competitive advantage, not just a nicety.',
            'Invest in transferable prompting and verification skills over mastering any single tool.'
          ],
          learningObjectives: [
            'Identify trends shaping AI’s role in startup ecosystems.',
            'Explain why authentic founder insight becomes more, not less, valuable as AI-assisted planning normalizes.'
          ],
          resources: [
            {
              title: 'Module 5 Cheat Sheet: Growth Metrics & Acquisition Test Prompts',
              type: 'download',
              description: 'Prompts for brainstorming acquisition channels and interpreting real growth data honestly.',
              content: `ACQUISITION CHANNEL PROMPT\n"[Business context + target customer]. Where does our target customer likely already spend time? Suggest acquisition channels based on meeting them there, not generic advertising."\n\nPERFORMANCE SUMMARY PROMPT\n"Performance data: [paste real numbers]. Summarize the 3 most important takeaways in plain language and flag anything concerning. Do not make weak metrics sound better than they are — present them honestly."`
            }
          ]
        },
      ],
    },
    {
      title: 'Fundraising and Investor Communication with AI',
      lessons: [
        {
          title: 'Preparing Investor Pitch Ideas with AI',
          duration: 6,
          content: `Pitch preparation benefits from AI's structuring strengths — organizing your story into a clear narrative arc, generating anticipated investor questions to prepare for, and stress-testing your core argument — while the actual substance (your traction, your market understanding, your vision) has to come from the real business, per Module 4's authenticity principle.\n\nA useful prompt: "[Business context, validated problem, traction so far]. Investors typically ask tough questions about [market size / competition / unit economics / team]. Generate 10 likely tough questions I should be prepared to answer, based on my specific business." Preparing for real, business-specific tough questions is far more useful than generic pitch advice, and catches gaps in your own understanding before an actual investor does.\n\nA useful stress-test: "Here's my core pitch argument: [paste it]. What's the weakest link in this argument, and what evidence would strengthen it?" Investors are professionally skilled at finding the weak link in a pitch — finding it yourself first, with AI's help, means you arrive prepared rather than surprised.`,
          keyPoints: [
            'AI helps structure pitch narrative and generate business-specific anticipated tough questions.',
            'Pitch substance — traction, market understanding, vision — must come from the real business.',
            'Business-specific tough questions are far more useful preparation than generic pitch advice.',
            'Stress-testing your core argument yourself means arriving prepared rather than surprised by investors.'
          ],
          learningObjectives: [
            'Generate business-specific anticipated investor questions for pitch preparation.',
            'Stress-test a pitch argument to identify and strengthen its weakest link.'
          ],
        },
        {
          title: 'Creating Startup Pitch Deck Content',
          duration: 7,
          content: `AI can draft first-pass content for standard pitch deck sections (problem, solution, market, business model, traction, team, ask) once given real business inputs — genuinely useful for overcoming a blank-slide problem, though every section needs founder review for accuracy and, per Module 4, authentic voice.\n\nA useful prompt, one section at a time: "[Business context and specific data for this section]. Draft content for the 'Traction' slide of a pitch deck, covering our key metrics so far. Keep it factual and specific — use only the numbers I've provided, and flag if you think this section needs stronger evidence." Drafting section by section with real data, rather than the whole deck from a brief prompt, keeps every slide grounded rather than generic.\n\nA useful design-adjacent prompt, since AI drafts text rather than visual slides: "What's the single most important number or statement for this slide? A pitch deck slide should communicate its main point in seconds — what would that be here?" This helps distill dense content into the punchy, visual-friendly language actual pitch decks need, which is different from prose written for a document.`,
          keyPoints: [
            'Draft pitch deck content section by section with real data, not the whole deck from one prompt.',
            'Every drafted section needs founder review for accuracy and authentic voice before use.',
            'Ask what the single most important point of a slide is — pitch slides need punchy, distilled language.',
            'AI drafts text content; actual visual slide design remains a separate, human-led step.'
          ],
          learningObjectives: [
            'Draft grounded pitch deck section content using real business data.',
            'Distill dense content into punchy, slide-appropriate language.'
          ],
        },
        {
          title: 'Identifying Potential Investors',
          duration: 6,
          content: `AI can help structure your thinking about what kind of investor fits your business (stage, sector focus, check size, geography) even though it can't provide a current, accurate list of specific investors and their contact details — that kind of current, verified information requires real research tools or investor databases, not AI's general training knowledge.\n\nA useful prompt: "[Business context: stage, sector, funding amount sought]. What criteria should I use to identify investors who'd be a good fit for this specific raise? Consider stage focus, sector focus, and typical check size." This produces a useful filtering framework you then apply using real, current investor research tools or databases.\n\nAs with competitor identification in the research course of this series, treat any specific investor names or details an AI provides as unverified and likely outdated — always confirm current investment focus, active status, and contact information through a real, current source (a professional network, an investor database, or the investor's own current public materials) before reaching out.`,
          keyPoints: [
            'AI can help define fit criteria (stage, sector, check size) for investor targeting.',
            'AI cannot provide a current, accurate list of specific investors — that needs real research tools.',
            'Treat any specific investor names from AI as unverified and possibly outdated.',
            'Always confirm current investor focus and contact details through real, current sources before outreach.'
          ],
          learningObjectives: [
            'Build a filtering framework for identifying investor fit.',
            'Explain why specific investor details from AI require independent, current verification.'
          ],
        },
        {
          title: 'Improving Investor Communication',
          duration: 6,
          content: `Ongoing investor communication — update emails, follow-up notes after a meeting, responses to due-diligence questions — benefits from AI drafting speed the same way other startup communication does, with the same review discipline: accuracy of every figure, and authentic voice over generic polish.\n\nA useful prompt for investor updates: "[Real performance data and key developments this period]. Draft a monthly investor update covering: key metrics, wins, challenges, and specific asks (intros, advice, etc.) we need help with. Be honest about challenges, not just wins — investors value transparency." Explicitly requesting honesty about challenges counters the natural tendency (covered in the Monitoring Startup Performance lesson) to present an overly rosy picture.\n\nFor due-diligence question responses specifically, accuracy matters even more than usual — these responses often become part of a formal record investors rely on for a funding decision. Treat any AI-drafted due-diligence response as a first draft requiring careful fact-checking against your actual data before it's sent, never as a final answer to send directly.`,
          keyPoints: [
            'Investor update drafting benefits from AI speed, with the same accuracy and authenticity discipline.',
            'Explicitly request honesty about challenges, not just wins, in investor updates.',
            'Due-diligence responses require extra care since they often become part of a formal funding record.',
            'Never send an AI-drafted due-diligence response without careful fact-checking against real data first.'
          ],
          learningObjectives: [
            'Draft an honest, balanced investor update using real performance data.',
            'Apply extra verification rigor to AI-drafted due-diligence responses.'
          ],
          resources: [
            {
              title: 'Module 6 Cheat Sheet: Pitch Prep & Investor Update Prompts',
              type: 'download',
              description: 'Prompts for stress-testing a pitch and drafting honest, balanced investor updates.',
              content: `TOUGH QUESTIONS PROMPT\n"[Business context, traction]. Generate 10 likely tough investor questions about market size, competition, unit economics, or team — specific to my business, not generic."\n\nPITCH STRESS-TEST PROMPT\n"Core pitch argument: [paste it]. What's the weakest link, and what evidence would strengthen it?"\n\nINVESTOR UPDATE PROMPT\n"[Real performance data + developments this period]. Draft a monthly update: key metrics, wins, challenges, and specific asks. Be honest about challenges, not just wins."`
            }
          ]
        },
      ],
    },
  ],
  quiz: {
    title: 'AI Prompting for Entrepreneurs and Startup Builders — Final Assessment',
    description: 'A 10-question assessment covering founder-focused prompting, validation, and responsible AI use in startup building.',
    passingScore: 70,
    questions: [
      {
        type: 'multiple-choice',
        question: 'What is the main value of AI prompting for early-stage founders, per this course?',
        options: [
          { text: 'It replaces the need for founder judgment entirely', isCorrect: false },
          { text: 'It compresses the time cost of producing supporting material outside a founder’s core expertise', isCorrect: true },
          { text: 'It guarantees a startup idea will succeed', isCorrect: false },
          { text: 'It eliminates the need for customer interviews', isCorrect: false },
        ],
        explanation: 'AI helps founders get a competent first pass on unfamiliar tasks quickly, compressing time cost — it does not replace judgment or real validation.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'true-false',
        question: 'Asking AI "is this a good startup idea?" is a reliable way to validate a business idea.',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true },
        ],
        correctAnswer: 'False',
        explanation: 'AI tends toward generically encouraging responses and has no access to real-world customer signal — use it to design validation, not to perform validation itself.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What should you do when using AI to help scope an MVP?',
        options: [
          { text: 'Ask AI to include every feature you can think of', isCorrect: false },
          { text: 'Ask which features form the leanest MVP that still tests the core hypothesis', isCorrect: true },
          { text: 'Skip MVP scoping entirely and build the full product first', isCorrect: false },
          { text: 'Let AI decide the final feature list without founder review', isCorrect: false },
        ],
        explanation: 'MVP scoping should focus on the leanest set of features that meaningfully test the core hypothesis, avoiding the common trap of building too much too early.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'Why should AI-generated financial projections never be finalized as-is in a business plan?',
        options: [
          { text: 'AI cannot format numbers correctly', isCorrect: false },
          { text: 'They should be treated as placeholder structure, replaced with real researched or modeled figures', isCorrect: true },
          { text: 'Financial projections are not needed in business plans', isCorrect: false },
          { text: 'AI always overestimates financial figures', isCorrect: false },
        ],
        explanation: 'Investors and lenders scrutinize financial assumptions closely — generic AI-generated projections rarely hold up and must be replaced with real figures.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What is "motivated reasoning" bias, as it applies to founders using AI for research?',
        options: [
          { text: 'AI training data being biased toward certain regions', isCorrect: false },
          { text: 'Unconsciously prompting in ways that confirm optimism about your own idea', isCorrect: true },
          { text: 'AI refusing to answer certain questions', isCorrect: false },
          { text: 'A bias present only in large companies, not startups', isCorrect: false },
        ],
        explanation: 'Founders can unconsciously prompt to confirm their own optimism — countered by deliberately prompting for the disconfirming case (devil’s advocate).',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'true-false',
        question: 'General business concepts typically require the same level of confidentiality caution as a novel, unfiled technical mechanism.',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true },
        ],
        correctAnswer: 'False',
        explanation: 'General business concepts are usually not sensitive enough to need extreme caution — the specific execution detail or novel technical mechanism is what typically warrants more care.',
        points: 1, difficulty: 'hard',
      },
      {
        type: 'multiple-choice',
        question: 'What is the risk of over-relying on AI to shape a startup’s core vision and positioning?',
        options: [
          { text: 'It makes the pitch too short', isCorrect: false },
          { text: 'It can produce polished but generic material lacking authentic, first-hand insight', isCorrect: true },
          { text: 'It automatically increases funding chances', isCorrect: false },
          { text: 'There is no real risk to this approach', isCorrect: false },
        ],
        explanation: 'Investors and customers often respond to conviction and genuine understanding — over-reliance on AI for vision can produce generic material missing that authenticity.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'When using AI to summarize real startup performance data for investors, what should founders avoid asking AI to do?',
        options: [
          { text: 'Summarize the data in plain language', isCorrect: false },
          { text: 'Flag concerning metrics worth investigating', isCorrect: false },
          { text: '"Make weak metrics look better" than they actually are', isCorrect: true },
          { text: 'Present real numbers clearly', isCorrect: false },
        ],
        explanation: 'Investors value balanced, honest updates — using AI to misleadingly polish weak metrics undermines the trust founders need to build.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'Why should specific investor names and contact details from AI always be independently verified?',
        options: [
          { text: 'AI training data may be outdated and cannot confirm current, real-time investor details', isCorrect: true },
          { text: 'AI never has any information about investors', isCorrect: false },
          { text: 'It is legally required in all jurisdictions', isCorrect: false },
          { text: 'Investor details never change once published anywhere', isCorrect: false },
        ],
        explanation: 'AI cannot provide current, accurate investor details from its general training knowledge — confirm current focus and contact info through real, current sources before outreach.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What extra care should be applied to AI-drafted responses to investor due-diligence questions?',
        options: [
          { text: 'None — they can be sent directly since AI is usually accurate', isCorrect: false },
          { text: 'Careful fact-checking against real data before sending, since they may become part of a formal funding record', isCorrect: true },
          { text: 'They should always be made shorter than the AI draft', isCorrect: false },
          { text: 'They only need review if the investor specifically asks for it', isCorrect: false },
        ],
        explanation: 'Due-diligence responses often become part of a formal record investors rely on — they require careful fact-checking before being sent, never treated as a final answer.',
        points: 1, difficulty: 'hard',
      },
    ],
  },
};
