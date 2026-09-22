// Content update data for: AI Prompt Engineering for Research and Competitive Intelligence
// Matched to production by exact course/module/lesson TITLE — see scripts/updateCourseContent.js

export default {
  courseTitle: 'AI Prompt Engineering for Research and Competitive Intelligence',
  modules: [
    {
      title: 'Foundations of AI in Research and Competitive Intelligence',
      lessons: [
        {
          title: 'Introduction to Competitive Intelligence',
          duration: 7,
          content: `Competitive intelligence (CI) is the disciplined practice of gathering and analyzing information about competitors, markets, and industry trends to inform business decisions — it's distinct from casual "checking out what competitors are doing" because it's structured, repeatable, and tied to specific decisions.\n\nGood CI answers concrete questions: How is a competitor positioning a new product? What are customers complaining about that we could address better? Where are pricing gaps in the market? Traditionally, this work was slow — manually reading competitor sites, review sections, and industry reports. AI changes the speed at which the gathering and first-pass synthesis can happen, though it doesn't replace the judgment needed to decide what the findings mean.\n\nThroughout this course, you'll build prompt-engineering skills specifically for CI: extracting structured information from unstructured text (a competitor's About page, a batch of reviews), comparing findings across sources, and generating first-draft insights that a human researcher then verifies and interprets.`,
          keyPoints: [
            'Competitive intelligence is structured, repeatable research tied to specific business decisions.',
            'AI primarily accelerates gathering and first-pass synthesis, not final interpretation.',
            'This course builds prompting skills for extraction, comparison, and insight generation.',
            'Human judgment remains essential for deciding what research findings actually mean.'
          ],
          learningObjectives: [
            'Define competitive intelligence and distinguish it from casual competitor-watching.',
            'Explain where AI adds speed value in the CI research process.'
          ],
        },
        {
          title: 'Role of AI in Research Activities',
          duration: 6,
          content: `AI supports research across four recurring activities: gathering (pulling together information from text you provide), summarizing (condensing long documents into key points), comparing (structuring similarities and differences across sources), and drafting (turning findings into a first-pass report or brief).\n\nA critical boundary: AI tools without live internet access can only work with information you provide in the conversation, or their training data, which has a cutoff date and can be outdated or simply wrong about specific facts. This means for genuinely current information — a competitor's latest pricing, a just-released feature — you need to fetch that information yourself (from the competitor's site, a review platform, a recent article) and paste it into the prompt, rather than asking the AI to "tell me about competitor X" from memory alone.\n\nThis "gather first, then ask AI to process" pattern is the single most important habit in this course — it turns AI from an unreliable narrator of possibly-outdated facts into a fast, reliable processor of facts you've verified yourself.`,
          keyPoints: [
            'AI’s core research roles: gathering, summarizing, comparing, and drafting.',
            'AI tools without live browsing can only use what you provide plus training data with a cutoff.',
            'Fetch current information yourself, then paste it in — don’t ask AI to recall it from memory.',
            'The "gather first, then process" pattern is the most important habit in this course.'
          ],
          learningObjectives: [
            'List the four core research activities AI supports.',
            'Explain the "gather first, then ask AI to process" pattern and why it matters.'
          ],
        },
        {
          title: 'Understanding Prompt Engineering',
          duration: 7,
          content: `Prompt engineering, in a research context, is the practice of structuring your instructions so the AI produces a specific, usable, verifiable output rather than a vague general response. Three elements matter most for research prompts: source material (the actual text you're asking about), a structured ask (a specific format or set of questions, not "tell me about this"), and scope limits (explicitly restricting the model to your provided source rather than its general knowledge).\n\nCompare: "What do you know about the meal-kit delivery market?" (vague, relies on possibly outdated training data) versus "Based on this market report I'm pasting below, summarize the three fastest-growing segments and their stated growth rates. Only use information from this text." (structured, scoped, verifiable against a real source).\n\nThe second version is slower to write but produces something you can trust and act on. As this course progresses, structuring prompts this way — source, structure, scope — should become close to automatic.`,
          keyPoints: [
            'Effective research prompts combine source material, a structured ask, and explicit scope limits.',
            'Restricting the model to provided source text makes output verifiable, not just plausible.',
            'A vague "what do you know about X" prompt relies on possibly outdated training data.',
            'Source + structure + scope should become an automatic prompting habit.'
          ],
          learningObjectives: [
            'Identify the three key elements of a well-engineered research prompt.',
            'Rewrite a vague research question into a structured, scoped prompt.'
          ],
        },
        {
          title: 'Responsible Use of AI in Research',
          duration: 6,
          content: `Research has a particular responsibility risk: findings often feed directly into business decisions, so errors compound. Three responsible-use habits matter most: verify anything the AI states as fact against your original source material, distinguish clearly between "what the source says" and "what the AI infers," and disclose in your own reporting when a summary or comparison was AI-assisted, so colleagues know to apply appropriate scrutiny.\n\nA useful practice: when asking AI to summarize or extract from a document, follow up with "Quote the exact sentence from the source that supports each point you just made." This forces traceability — if the model can't produce a supporting quote for a claim, that's a signal the claim may be an inference or an error rather than something actually stated in your source.\n\nTreat AI-assisted research output the way a careful analyst treats any single source: useful, but one input that gets checked against others before it drives a real decision.`,
          keyPoints: [
            'Research errors compound because findings feed directly into business decisions.',
            'Distinguish clearly between what a source states and what the AI infers.',
            'Ask the model to quote supporting text for its claims to check traceability.',
            'Disclose when research summaries were AI-assisted so colleagues apply appropriate scrutiny.'
          ],
          learningObjectives: [
            'Apply a traceability check (source quoting) to AI-generated research claims.',
            'Explain why disclosure of AI assistance matters in research reporting.'
          ],
          resources: [
            {
              title: 'Module 1 Cheat Sheet: Source-Structure-Scope Prompt Template',
              type: 'download',
              description: 'A reusable template for turning any research question into a scoped, verifiable AI prompt.',
              content: `RESEARCH PROMPT TEMPLATE\n\nSource: [paste the actual text/document/data you're asking about]\nStructured ask: [specific question or format — not "tell me about this"]\nScope limit: "Only use information from the source text above. Do not use outside knowledge."\nTraceability check: "For each point, quote the exact sentence from the source that supports it. If you can't find support, say so instead of guessing."`
            }
          ]
        },
      ],
    },
    {
      title: 'Designing Effective Prompts for Research',
      lessons: [
        {
          title: 'Elements of an Effective Research Prompt',
          duration: 7,
          content: `Building on Module 1's source-structure-scope framework, a fully effective research prompt also specifies the desired output format and the level of depth needed. "Summarize this" leaves the model to guess whether you want three bullet points or three pages — specifying "give me 5 bullet points, each under 20 words" removes that ambiguity entirely.\n\nDepth matters too: "give me a high-level overview" and "give me a detailed breakdown including every number mentioned" produce very different research value, and only you know which one your next step requires. State it directly.\n\nPutting it together: "Source: [paste text]. Give me a detailed breakdown of every pricing tier mentioned, including the exact price and what's included in each. Format as a table. Only use information from the source text." This single prompt specifies source, structured ask, format, depth, and scope — the full toolkit for a reliable research prompt.`,
          keyPoints: [
            'Specify output format explicitly (bullets, table, paragraph) rather than leaving it to guesswork.',
            'State the desired depth (high-level overview vs. detailed breakdown) directly.',
            'A fully effective prompt combines source, structure, scope, format, and depth.',
            'Ambiguity about format or depth is a common, easily-fixed source of unhelpful output.'
          ],
          learningObjectives: [
            'Write a research prompt that specifies format and depth explicitly.',
            'Combine all five prompt elements into a single effective research request.'
          ],
        },
        {
          title: 'Prompts for Information Gathering',
          duration: 6,
          content: `Information-gathering prompts extract specific facts from unstructured text — pulling names, numbers, dates, or claims out of a messy document into a clean, usable list. This is one of AI's strongest research capabilities because it's a pattern-matching task the model handles quickly and (with proper scoping) accurately.\n\nExample: "From this competitor press release, extract: (1) the product name, (2) the launch date, (3) every stated feature, (4) any pricing mentioned. List as a simple bulleted set of facts, nothing else." This kind of prompt turns a dense paragraph of marketing language into a scannable fact list in seconds.\n\nFor gathering across multiple documents (say, five competitor pages), process them one at a time rather than pasting all five at once — this reduces the chance of the model mixing up which fact came from which source, a common error when documents are combined into one long prompt.`,
          keyPoints: [
            'Information-gathering prompts extract specific facts into a clean, scannable list.',
            'This is one of AI’s strongest capabilities: fast, structured extraction from unstructured text.',
            'Process multiple source documents one at a time to avoid the model mixing up sources.',
            'Ask for facts only, explicitly, to avoid unwanted commentary mixed into the extraction.'
          ],
          learningObjectives: [
            'Write an extraction prompt that pulls specific facts from unstructured text.',
            'Explain why processing multiple sources separately reduces error risk.'
          ],
        },
        {
          title: 'Prompts for Summarizing Research Materials',
          duration: 6,
          content: `Summarization prompts condense long material while preserving what actually matters — the risk is a summary that's shorter but has quietly dropped the most important nuance. Specifying what "matters" explicitly prevents this: "Summarize this report, prioritizing anything related to pricing strategy and customer complaints. It's fine to omit sections unrelated to those topics."\n\nA useful technique for long documents: ask for a summary at two levels — "First, a 2-sentence executive summary. Then, a more detailed summary organized by section." This gives you a fast skim option and a deeper option in one pass, rather than having to choose one length upfront and regenerate if it's wrong.\n\nAlways sanity-check a summary against the source for anything that seems surprising or important — summarization can occasionally soften or slightly misstate a nuanced point, especially in longer documents, so treat a summary as a strong starting point for understanding, not a guaranteed-accurate final reference.`,
          keyPoints: [
            'Specify what matters most in a summary to avoid losing important nuance.',
            'Request a two-level summary (brief + detailed) to cover both skimming and depth needs.',
            'Summaries can occasionally soften or slightly misstate nuanced points — sanity-check surprises.',
            'Treat a summary as a strong starting point, not a guaranteed-accurate final reference.'
          ],
          learningObjectives: [
            'Write a prioritized summarization prompt for a long document.',
            'Apply a sanity-check habit to AI-generated summaries.'
          ],
        },
        {
          title: 'Prompts for Generating Research Questions',
          duration: 6,
          content: `Before diving into a research task, it's often more valuable to spend five minutes generating a sharp set of questions than to jump straight into gathering information — a clear question set focuses the research and prevents wasted effort on tangents.\n\nAI is genuinely useful here: "I'm researching whether we should enter the mid-market segment of [industry]. Generate 8 specific research questions I should answer before making this decision, covering competitors, pricing, customer needs, and risks." This produces a structured starting checklist faster than brainstorming alone, especially for someone newer to a particular research area.\n\nOnce you have a question list, prioritize before gathering: which 3–4 questions, if answered, would most change the decision? Research time is limited, and not every generated question is equally important — use AI to generate broadly, then apply human judgment to narrow down to what actually matters for the decision at hand.`,
          keyPoints: [
            'Generating a sharp question set before gathering research focuses effort and avoids tangents.',
            'AI can quickly produce a structured starting checklist of research questions.',
            'Prioritize which generated questions would most change the eventual decision.',
            'Use AI to generate broadly, then apply human judgment to narrow down.'
          ],
          learningObjectives: [
            'Generate a structured set of research questions for a business decision.',
            'Prioritize research questions by decision impact.'
          ],
          resources: [
            {
              title: 'Module 2 Cheat Sheet: Extraction & Summarization Prompts',
              type: 'download',
              description: 'Ready-to-use prompt templates for extracting facts and summarizing research documents.',
              content: `EXTRACTION PROMPT:\n"From this document: [paste text]. Extract: [list the specific facts you need]. List as bullet points, facts only, no commentary. Only use information stated in the text."\n\nSUMMARIZATION PROMPT:\n"Summarize this document: [paste text]. Prioritize anything related to [your priority topics]. First give a 2-sentence executive summary, then a detailed summary organized by section."\n\nQUESTION-GENERATION PROMPT:\n"I'm researching [decision/topic]. Generate 8 specific research questions covering [categories, e.g., competitors, pricing, customer needs, risks]."`
            }
          ]
        },
      ],
    },
    {
      title: 'AI for Market and Industry Research',
      lessons: [
        {
          title: 'Understanding Market Research with AI',
          duration: 6,
          content: `Market research answers questions about the broader landscape a business operates in: market size, growth rate, key trends, and customer segments. AI's role here follows the same "gather first, then process" pattern from earlier modules — you supply real market reports, articles, or data, and AI helps synthesize and organize them, rather than generating market statistics from its own memory.\n\nA critical guardrail specific to market research: market-size and growth-rate figures change frequently and vary significantly between sources depending on methodology. Never accept a market statistic an AI states without a source — always ask "what is this number based on?" and if the AI can't point to something you provided, treat the number as unverified and exclude it from anything you publish or present.\n\nA solid market research prompt: "Here are 3 market reports on [industry]: [paste excerpts]. Where do they agree on market size and growth rate? Where do they disagree, and by how much? Present as a comparison table with the source cited for each figure."`,
          keyPoints: [
            'Market research follows the same gather-first pattern: supply real data, don’t rely on AI memory.',
            'Market-size and growth-rate figures vary significantly between sources — never accept an unsourced number.',
            'Always ask the AI what a stated statistic is based on before trusting it.',
            'Comparing multiple real sources reveals both agreement and meaningful disagreement.'
          ],
          learningObjectives: [
            'Apply source-based prompting to market research questions.',
            'Verify market statistics by requiring a cited source for every figure.'
          ],
        },
        {
          title: 'Identifying Industry Trends',
          duration: 6,
          content: `Trend identification benefits from processing multiple recent sources (industry articles, reports, competitor announcements) and looking for recurring themes — a single article mentioning something isn't a trend; the same theme appearing across several independent sources is a much stronger signal.\n\nA useful prompt pattern: "Here are 5 recent articles about [industry]: [paste excerpts or summaries]. What themes appear in 3 or more of these sources? For each recurring theme, note which sources mention it." This surfaces genuine patterns rather than one writer's opinion dressed up as an industry trend.\n\nBe skeptical of AI over-eagerly finding "trends" in thin evidence — language models are pattern-completion tools and can sometimes present a single data point as a broader trend if asked leadingly ("what trends do you see here?" on one article). Providing multiple independent sources and asking specifically for recurrence across them is the safeguard against this.`,
          keyPoints: [
            'A theme appearing across multiple independent sources is a much stronger trend signal than one mention.',
            'Ask AI to identify themes appearing in 3+ sources, and to cite which sources mention each.',
            'Be skeptical of AI presenting a single data point as a broader trend.',
            'Providing multiple sources and requiring recurrence is the safeguard against overclaiming trends.'
          ],
          learningObjectives: [
            'Identify genuine trends by requiring recurrence across multiple independent sources.',
            'Recognize the risk of AI overclaiming a trend from thin evidence.'
          ],
        },
        {
          title: 'Analyzing Market Opportunities',
          duration: 7,
          content: `Opportunity analysis combines market research findings with a specific evaluation lens: is there a gap, and is it one your business is actually positioned to fill? AI can help structure this analysis once you've gathered real research, though the final judgment about fit and feasibility is a human call informed by internal context (capabilities, resources, risk appetite) the AI doesn't have.\n\nA structuring prompt: "Based on this market research [paste findings], identify potential opportunities using this framework for each: (1) What's the gap? (2) What evidence supports it exists? (3) What would be required to pursue it? (4) What's the biggest risk?" This forces even, comparable analysis across multiple opportunity candidates rather than an unstructured brainstorm.\n\nA useful discipline: for every opportunity the AI surfaces, ask it to also list reasons the opportunity might not be real or might be harder than it looks — "steelmanning" the counter-case surfaces risks that an optimism-biased brainstorm tends to skip.`,
          keyPoints: [
            'Combine real market research with a structured framework to evaluate opportunities evenly.',
            'Business fit and feasibility judgment requires internal context the AI doesn’t have.',
            'A four-part framework (gap, evidence, requirements, risk) enables comparable analysis.',
            'Ask AI to also argue against each opportunity to surface risks an optimistic brainstorm might skip.'
          ],
          learningObjectives: [
            'Apply a structured framework to evaluate market opportunities.',
            'Use a "steelman the counter-case" prompt to surface overlooked risks.'
          ],
        },
        {
          title: 'Comparing Market Segments',
          duration: 6,
          content: `Segment comparison — evaluating which customer segment to prioritize — works best with the same structured-comparison approach used for competitors: fixed dimensions applied evenly across each segment, rather than an open-ended discussion of each one separately.\n\nUseful comparison dimensions for market segments include: size/addressable market, growth rate, competitive intensity (how crowded is this segment already), willingness to pay, and fit with your current capabilities. A prompt: "Compare these 3 customer segments [name them] across: size, growth rate, competitive intensity, and fit with our current product. Use only the research data provided here: [paste data]. Present as a table."\n\nOnce the table is built, ask a synthesis follow-up: "Based on this comparison, which segment would you deprioritize first, and why?" Forcing a ranking, even a debatable one, tends to surface the real trade-offs faster than an open discussion where every segment sounds equally appealing.`,
          keyPoints: [
            'Apply fixed, consistent dimensions across all segments being compared for a fair evaluation.',
            'Useful segment dimensions: size, growth rate, competitive intensity, willingness to pay, capability fit.',
            'Base comparisons only on real provided research data.',
            'A forced ranking follow-up surfaces trade-offs faster than open-ended discussion.'
          ],
          learningObjectives: [
            'Design a structured comparison of market segments using consistent dimensions.',
            'Use a forced-ranking prompt to surface trade-offs between segments.'
          ],
          resources: [
            {
              title: 'Module 3 Cheat Sheet: Market & Segment Comparison Table Prompt',
              type: 'download',
              description: 'A structured template for comparing market segments or opportunities using consistent dimensions.',
              content: `SEGMENT/OPPORTUNITY COMPARISON PROMPT\n"Compare [segments/opportunities] across these dimensions: [size, growth rate, competitive intensity, willingness to pay, fit]. Use only this data: [paste research]. Present as a table, one row per dimension.\n\nFollow-up: Based on this comparison, which would you deprioritize first, and why? Then, argue the strongest case against your own top pick."`
            }
          ]
        },
      ],
    },
    {
      title: 'Competitive Analysis Using AI Prompts',
      lessons: [
        {
          title: 'Identifying Competitors',
          duration: 6,
          content: `Competitor identification has a scope trap: it's easy to list only the obvious direct competitors (same product, same market) and miss indirect competitors (different product, same customer need) that may matter just as much. A structured prompt helps widen the net deliberately.\n\nPrompt: "Based on this description of our business [paste description], list potential competitors in three categories: (1) direct competitors — same product, same audience, (2) indirect competitors — different product, but solving the same underlying need, (3) potential future competitors — companies that could plausibly expand into this space. For each, note your confidence level, since you may not have current information on smaller or newer companies."\n\nThat confidence-level instruction matters: AI training data has a cutoff and can be weak on newer, smaller, or region-specific companies. Treat any competitor list from AI as a starting hypothesis to verify with a quick real search, not a confirmed, complete list.`,
          keyPoints: [
            'Widen competitor identification beyond obvious direct competitors to include indirect ones.',
            'Three useful categories: direct, indirect (same need, different product), and potential future competitors.',
            'Ask AI to state confidence level, since its knowledge of newer/smaller companies may be weak or outdated.',
            'Treat an AI-generated competitor list as a starting hypothesis to verify, not a confirmed list.'
          ],
          learningObjectives: [
            'Generate a categorized list of direct, indirect, and potential future competitors.',
            'Apply a verification step to AI-generated competitor lists.'
          ],
        },
        {
          title: 'Comparing Competitor Strategies',
          duration: 7,
          content: `Strategy comparison goes deeper than feature or pricing comparison — it asks what a competitor seems to be betting on: are they competing on price, on premium positioning, on a specific niche, on speed/convenience, or on ecosystem lock-in? Identifying the underlying bet, not just surface-level facts, is what makes this analysis strategically useful.\n\nA useful prompt, fed with real source material: "Based on this competitor's website, pricing page, and recent announcements [paste content], what strategic bet does their positioning suggest they're making? What evidence in the text supports that read?" Requiring supporting evidence keeps the analysis grounded rather than speculative.\n\nOnce you have a read on 2–3 competitors' strategic bets, a synthesis question adds real value: "Given these different bets, where is there a strategic gap or contested space in the market?" This is exactly the kind of higher-order synthesis that turns individual competitor profiles into an actual competitive strategy input.`,
          keyPoints: [
            'Strategy comparison asks what a competitor is betting on, not just what features they offer.',
            'Common strategic bets: price, premium positioning, niche focus, convenience, ecosystem lock-in.',
            'Require the AI to cite supporting evidence from real source text for any strategic read.',
            'Synthesize individual competitor reads into a question about market gaps or contested space.'
          ],
          learningObjectives: [
            'Identify a competitor’s likely strategic bet from real source material.',
            'Synthesize multiple competitor strategy reads into a market-gap analysis.'
          ],
        },
        {
          title: 'SWOT Analysis Using AI',
          duration: 6,
          content: `SWOT (Strengths, Weaknesses, Opportunities, Threats) is a familiar framework AI can help populate quickly — but only well if fed real information; asked to "do a SWOT on competitor X" with no source material, the model will produce generic, forgettable output that could apply to almost any company in the category.\n\nA grounded prompt: "Based on this information about [competitor]: [paste reviews, website content, news], build a SWOT analysis. For each point, cite what in the source material supports it. If you don't have enough information for a category, say so rather than guessing." That last instruction matters — a SWOT with a weak "Threats" section because the source material didn't cover threats well is more honest and more useful than a SWOT with four confidently-invented threats.\n\nSWOT output is a starting structure for discussion, not a finished strategic document — the real value comes from a follow-up: "Which of these points would most change our strategy if true? Which are we least confident about?"`,
          keyPoints: [
            'SWOT prompts need real source material — without it, output is generic and forgettable.',
            'Require citations from source material for each SWOT point.',
            'Allow (and expect) the AI to say "insufficient information" rather than invent content for a weak category.',
            'Use a follow-up to identify which SWOT points matter most and which are least certain.'
          ],
          learningObjectives: [
            'Build a source-grounded SWOT analysis for a competitor.',
            'Apply a confidence-check follow-up to prioritize SWOT findings.'
          ],
        },
        {
          title: 'Monitoring Competitor Activities',
          duration: 6,
          content: `Ongoing competitor monitoring is different from a one-time analysis — it's about efficiently processing a recurring stream of new information (announcements, reviews, pricing changes) rather than a single deep-dive. AI is well suited to the recurring-summary part of this: turning a batch of new material into a quick "what changed" update.\n\nA useful recurring prompt: "Here's everything new I found about [competitor] this month: [paste announcements, review excerpts, etc.]. Summarize what's changed since last month, and flag anything that seems significant enough to alert the team about." Running this consistently, on a set cadence, turns competitor monitoring from an occasional scramble into a lightweight, sustainable habit.\n\nA practical tip: keep a simple running log of past monthly summaries and feed the previous month's summary into the prompt alongside new material — "Compare this month's findings to last month's summary [paste it]: what's genuinely new versus already known?" This prevents re-flagging the same old news as if it were fresh.`,
          keyPoints: [
            'Ongoing monitoring processes a recurring stream of updates, not a one-time deep dive.',
            'AI is well suited to producing regular "what changed" summaries from new material.',
            'A consistent monthly cadence turns monitoring into a sustainable habit rather than a scramble.',
            'Feed the previous summary into new prompts to avoid re-flagging old news as new.'
          ],
          learningObjectives: [
            'Design a recurring competitor-monitoring prompt with a consistent cadence.',
            'Use prior summaries to distinguish genuinely new findings from repeats.'
          ],
          resources: [
            {
              title: 'Module 4 Cheat Sheet: Grounded SWOT & Monitoring Prompts',
              type: 'download',
              description: 'Templates for building a source-grounded SWOT analysis and a recurring competitor monitoring update.',
              content: `GROUNDED SWOT PROMPT\n"Based on this information about [competitor]: [paste source material], build a SWOT analysis. Cite the supporting source text for each point. If a category lacks sufficient information, say so instead of guessing."\n\nMONITORING PROMPT\n"New material this month on [competitor]: [paste new content]. Previous month's summary: [paste it]. Summarize what has genuinely changed since last month and flag anything significant enough to alert the team about."`
            }
          ]
        },
      ],
    },
    {
      title: 'Generating Research Insights and Reports',
      lessons: [
        {
          title: 'Organizing Research Findings',
          duration: 6,
          content: `After a research push, raw findings are often scattered across notes, extracted facts, and comparison tables. Before writing insights or a report, organizing this material into a consistent structure makes everything downstream easier — both for AI assistance and for your own thinking.\n\nA useful organizing prompt: "Here are my raw research notes: [paste everything]. Organize this into categories: Market Context, Competitor Findings, Customer Insights, and Open Questions. Keep all original details, just group them logically." This doesn't lose any information — it just imposes structure on what's already there, which is exactly the kind of tedious-but-valuable task AI handles well.\n\nOnce organized, review for gaps: does every category have real content, or is "Customer Insights" suspiciously thin? A gap like that is a signal for what to research next, which is a genuinely useful output of the organizing step beyond just tidiness.`,
          keyPoints: [
            'Organize scattered research notes into a consistent structure before drafting insights.',
            'A good organizing prompt preserves all original detail — it only imposes structure, not summarization.',
            'Review organized findings for suspiciously thin categories, which signal research gaps.',
            'This organizing step benefits both AI-assisted next steps and your own thinking.'
          ],
          learningObjectives: [
            'Organize raw research notes into a consistent categorical structure.',
            'Identify research gaps by reviewing organized findings for thin categories.'
          ],
        },
        {
          title: 'Generating Research Insights',
          duration: 7,
          content: `This lesson builds directly on the earlier "Generating Strategic Insights" skill (Module 3) but applies it to your full organized research set rather than a single comparison. The goal is moving from "here's what we found" to "here's what it means and why it matters."\n\nA useful synthesis prompt: "Based on this organized research [paste it], generate 5 key insights. For each: state the insight in one sentence, note the supporting evidence, note a confidence level, and note one implication for our strategy." This produces insight statements that are traceable back to real findings, rated by confidence, and connected to action — far more useful than a loose list of interesting facts.\n\nA good habit before finalizing insights: ask "Which of these 5 insights would I bet the most money on being true and important? Which am I least sure about?" This forces prioritization, since not every generated insight deserves equal weight in a final report or presentation.`,
          keyPoints: [
            'Insight generation means moving from "what we found" to "what it means and why it matters."',
            'A strong insight statement includes the claim, supporting evidence, a confidence level, and an implication.',
            'Ground every insight in traceable evidence from the organized research.',
            'Prioritize insights by confidence and importance rather than treating them as equally weighted.'
          ],
          learningObjectives: [
            'Generate confidence-rated, evidence-linked insights from organized research.',
            'Prioritize insights for inclusion in a final report or presentation.'
          ],
        },
        {
          title: 'Drafting Research Reports',
          duration: 7,
          content: `A research report's first draft is a strong use of AI — turning organized findings and prioritized insights into readable prose with a clear structure — as long as a human writes the framing (why this research was done, what decision it informs) and does a final accuracy pass before it circulates.\n\nA useful drafting prompt: "Using this organized research and these prioritized insights [paste both], draft a report with these sections: Executive Summary, Key Findings, Strategic Implications, Recommended Next Steps. Keep it under 800 words. Write for an audience of non-specialist executives — avoid jargon." Specifying audience and length upfront saves significant editing time versus generating an unconstrained draft and cutting it down afterward.\n\nBefore circulating any AI-drafted report, do a full read-through checking every factual claim against your original source material — a report is a higher-stakes document than an internal note, since it may directly shape a business decision, so the verification bar should be correspondingly higher.`,
          keyPoints: [
            'AI drafting a report first pass is efficient, but framing and final accuracy checks stay human.',
            'Specify audience and length upfront to avoid heavy post-hoc editing.',
            'A standard useful structure: Executive Summary, Key Findings, Implications, Next Steps.',
            'Verify every factual claim in a report against source material before circulation — high stakes demand a high verification bar.'
          ],
          learningObjectives: [
            'Draft a structured research report using AI with specified audience and length.',
            'Apply a rigorous verification pass before circulating an AI-drafted report.'
          ],
        },
        {
          title: 'Visualizing Research Results',
          duration: 6,
          content: `Not every finding needs a chart, but comparisons, trends over time, and rankings usually communicate faster visually than in a paragraph. AI can help you decide what kind of visualization fits your data and can generate the underlying table or description you'd hand to a designer or plug into charting software.\n\nA useful prompt: "I have this data: [paste data]. What's the most appropriate chart type to communicate it clearly — bar, line, pie, or table — and why? Then format the data as a clean table I can paste into a spreadsheet to build that chart." This offloads the "what chart type fits this data" decision-support step, though the actual chart-building typically still happens in a spreadsheet or design tool.\n\nA word of caution: don't ask AI to fabricate a chart description with numbers it wasn't given — always base visualizations on real data you provide, for the same accuracy reasons covered throughout this course.`,
          keyPoints: [
            'Comparisons, trends, and rankings usually communicate faster visually than in prose.',
            'AI can recommend an appropriate chart type and format data for a charting tool.',
            'Base every visualization on real data you provide — never on numbers the AI might invent.',
            'Chart-type selection is decision support; actual chart-building typically happens in dedicated tools.'
          ],
          learningObjectives: [
            'Use AI to select an appropriate visualization type for a research finding.',
            'Format research data for use in charting or spreadsheet tools.'
          ],
          resources: [
            {
              title: 'Module 5 Cheat Sheet: Insight & Report Drafting Prompts',
              type: 'download',
              description: 'Templates for turning organized research into confidence-rated insights and a structured draft report.',
              content: `INSIGHT GENERATION PROMPT\n"Based on this organized research: [paste it]. Generate 5 key insights. For each: the insight (1 sentence), supporting evidence, confidence level (high/medium/low), and one strategic implication."\n\nREPORT DRAFTING PROMPT\n"Using this research and these prioritized insights: [paste both]. Draft a report with sections: Executive Summary, Key Findings, Strategic Implications, Recommended Next Steps. Under [X] words. Audience: non-specialist executives, no jargon."`
            }
          ]
        },
      ],
    },
    {
      title: 'Responsible and Effective AI Use in Research',
      lessons: [
        {
          title: 'Verifying AI-Generated Information',
          duration: 7,
          content: `This course has returned repeatedly to verification because it's the single most important discipline in AI-assisted research — this lesson consolidates it into one practical system you can apply to any research output before it's used.\n\nA three-tier verification approach: Tier 1 (always) — any number, date, or named claim gets checked against your original source. Tier 2 (for anything going into a decision or report) — cross-check key findings against at least one independent source beyond what you originally fed the AI. Tier 3 (for high-stakes decisions) — have a second person independently review the research findings before they inform a major decision, the same way you'd want a second set of eyes on any important analysis regardless of whether AI was involved.\n\nThe underlying principle: AI-assisted research should be held to the same verification standard as human-assisted research, not a lower one just because it was fast to produce. Speed of production doesn't change the stakes of being wrong.`,
          keyPoints: [
            'A three-tier verification system: always check facts, cross-check key findings, get a second review for high stakes.',
            'AI-assisted research should meet the same verification bar as any other research, not a lower one.',
            'Speed of production doesn’t reduce the stakes of an error in the findings.',
            'Verification effort should scale with how consequential the resulting decision is.'
          ],
          learningObjectives: [
            'Apply a tiered verification system scaled to decision importance.',
            'Explain why AI-assisted speed shouldn’t lower the verification standard.'
          ],
        },
        {
          title: 'Avoiding Bias in AI-Assisted Research',
          duration: 6,
          content: `Two distinct bias risks apply to AI-assisted research: bias in the AI's training data (which can reflect skewed representation of certain regions, industries, or company sizes) and confirmation bias in how you prompt (unconsciously asking questions that lead toward a conclusion you already expect or want).\n\nFor the first risk, be aware that AI knowledge may be weaker or skewed for smaller markets, non-English-language sources, or newer companies — treat findings in these areas with extra skepticism and extra verification. For the second risk, a useful self-check is reviewing your own prompts: are you asking neutral questions ("what does this data show?") or leading ones ("doesn't this data show that we should do X?")? The second framing can nudge the AI toward confirming what you already believe rather than surfacing what's actually there.\n\nA practical habit: occasionally ask a deliberately opposing question — "What evidence in this research would argue against my current hypothesis?" — as a check against unconsciously steering the research toward a predetermined conclusion.`,
          keyPoints: [
            'AI training data can be weaker or skewed for smaller markets, non-English sources, or newer companies.',
            'Leading prompts can nudge AI toward confirming a pre-existing belief rather than neutral analysis.',
            'Review your own prompts for neutral versus leading framing.',
            'Occasionally prompt for the opposing case to check against confirmation bias.'
          ],
          learningObjectives: [
            'Identify sources of bias in both AI training data and prompt framing.',
            'Apply a self-check for confirmation bias in research prompting.'
          ],
        },
        {
          title: 'Protecting Confidential Information',
          duration: 6,
          content: `Research often involves sensitive material — internal strategy documents, unreleased product plans, confidential customer data, or proprietary analysis. Before pasting anything into an AI tool, apply the same test you'd apply to any external vendor: would you be comfortable if this exact information were stored or reviewed outside your organization?\n\nPractical safeguards: know your organization's policy (or the AI tool's data-handling terms) before pasting confidential material; when possible, anonymize or generalize sensitive details ("Company X's internal roadmap" rather than pasting the actual leaked roadmap document verbatim); and for genuinely sensitive competitive intelligence, consider whether the analysis can be done with publicly available information instead, which sidesteps the confidentiality question entirely.\n\nThis isn't about avoiding AI for sensitive research — it's about applying the same information-handling discipline you'd already apply to email, shared drives, or any other tool that touches confidential material.`,
          keyPoints: [
            'Apply the same vendor-trust test to AI tools that you’d apply to any external service handling sensitive data.',
            'Know your organization’s data-handling policy before pasting confidential material into AI tools.',
            'Anonymize or generalize sensitive details where possible.',
            'Consider whether public information alone can answer the research question, sidestepping confidentiality risk.'
          ],
          learningObjectives: [
            'Apply confidentiality safeguards before using sensitive material in AI prompts.',
            'Evaluate whether a research task can rely on public information instead of confidential sources.'
          ],
        },
        {
          title: 'Integrating AI into Research Workflows',
          duration: 6,
          content: `As a closing lesson, this brings together the course's habits into a repeatable end-to-end workflow: (1) define specific research questions, (2) gather real source material, (3) extract and organize findings using scoped prompts, (4) generate confidence-rated insights, (5) verify at a tier appropriate to the decision's stakes, (6) draft a report with human framing and a final accuracy pass.\n\nThe teams that get durable value from AI-assisted research build this workflow into their standard process rather than reinventing it each time — with saved prompt templates (like the cheat sheets from each module in this course) for each stage, a research project that used to take days of manual reading and drafting can often move through the gathering-to-report pipeline substantially faster, without sacrificing rigor, because the verification and structuring steps are built in rather than skipped under time pressure.\n\nThe skill that transfers beyond any specific tool is the discipline itself: specific questions, real sources, scoped prompts, rated confidence, tiered verification. That discipline is what separates genuinely useful AI-assisted research from research that merely looks fast and polished.`,
          keyPoints: [
            'The full workflow: define questions, gather sources, extract/organize, generate insights, verify, draft.',
            'Building this into a standard, template-driven process compounds value over reinventing it each time.',
            'Built-in verification and structuring steps prevent rigor from being skipped under time pressure.',
            'The transferable skill is the discipline itself, not any single AI tool.'
          ],
          learningObjectives: [
            'Describe the full end-to-end AI-assisted research workflow taught in this course.',
            'Explain why building this workflow into standard practice sustains research rigor at higher speed.'
          ],
          resources: [
            {
              title: 'Module 6 Cheat Sheet: End-to-End Research Workflow Checklist',
              type: 'download',
              description: 'A one-page checklist covering the full research process from question to verified report, tying together every module’s techniques.',
              content: `END-TO-END RESEARCH WORKFLOW\n\n1. Define specific research questions (Module 2).\n2. Gather real source material — don’t rely on AI memory (Module 1–3).\n3. Extract & organize findings using scoped prompts (Modules 2, 5).\n4. Generate confidence-rated insights with supporting evidence (Module 5).\n5. Verify: Tier 1 (always check facts) → Tier 2 (cross-check key findings) → Tier 3 (second reviewer for high stakes) (Module 6).\n6. Draft report with human framing + final accuracy pass (Module 5).\n7. Check for bias: leading prompts, weak-coverage sources, confirmation bias (Module 6).\n8. Handle confidential material with the same discipline as any external vendor (Module 6).`
            }
          ]
        },
      ],
    },
  ],
  quiz: {
    title: 'AI Prompt Engineering for Research and Competitive Intelligence — Final Assessment',
    description: 'A 10-question assessment covering research prompting, competitive analysis, and responsible AI use in research.',
    passingScore: 70,
    questions: [
      {
        type: 'multiple-choice',
        question: 'What is the most important habit for using AI reliably in research?',
        options: [
          { text: 'Asking the AI to recall facts from memory for speed', isCorrect: false },
          { text: 'Gathering real source material first, then asking AI to process it', isCorrect: true },
          { text: 'Using the longest possible prompt', isCorrect: false },
          { text: 'Avoiding any scope limits so the AI has full flexibility', isCorrect: false },
        ],
        explanation: 'The "gather first, then process" pattern turns AI from an unreliable narrator of possibly outdated facts into a fast processor of information you’ve verified yourself.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'Which three elements make up a well-engineered research prompt, per this course?',
        options: [
          { text: 'Length, tone, and creativity', isCorrect: false },
          { text: 'Source material, a structured ask, and scope limits', isCorrect: true },
          { text: 'Speed, brevity, and simplicity', isCorrect: false },
          { text: 'Humor, formality, and length', isCorrect: false },
        ],
        explanation: 'Source, structure, and scope are the core elements that make a research prompt verifiable and useful, later extended with format and depth.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'true-false',
        question: 'A theme mentioned in a single article should be treated as a confirmed industry trend.',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true },
        ],
        correctAnswer: 'False',
        explanation: 'A genuine trend signal requires a theme to appear across multiple independent sources, not just one article.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What should you do if an AI-generated SWOT analysis has a weak "Threats" section due to limited source material?',
        options: [
          { text: 'Ask the AI to invent plausible threats to fill the gap', isCorrect: false },
          { text: 'Accept a thin or "insufficient information" answer rather than invented content', isCorrect: true },
          { text: 'Delete the Threats category entirely', isCorrect: false },
          { text: 'Ignore the issue since SWOT is just a formality', isCorrect: false },
        ],
        explanation: 'An honest "insufficient information" response is more useful and accurate than confidently invented content for a category the source material didn’t cover.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'Why should you ask AI to cite a confidence level when generating strategic insights?',
        options: [
          { text: 'It makes the report longer', isCorrect: false },
          { text: 'It prevents speculative implications from being presented with unwarranted authority', isCorrect: true },
          { text: 'It is required by law', isCorrect: false },
          { text: 'It has no real purpose, it’s just a formality', isCorrect: false },
        ],
        explanation: 'Confidence levels distinguish well-supported implications from speculative ones, preventing overconfident claims from misleading decision-makers.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'true-false',
        question: 'AI-assisted research should be held to a lower verification standard than manually-produced research, since it was generated faster.',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true },
        ],
        correctAnswer: 'False',
        explanation: 'Speed of production doesn’t change the stakes of being wrong — AI-assisted research should meet the same verification bar as any other research.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'What is a practical check against confirmation bias when prompting AI for research analysis?',
        options: [
          { text: 'Always ask leading questions to get a clear answer', isCorrect: false },
          { text: 'Occasionally ask for the evidence that would argue against your current hypothesis', isCorrect: true },
          { text: 'Only research topics you already agree with', isCorrect: false },
          { text: 'Avoid stating any hypothesis at all', isCorrect: false },
        ],
        explanation: 'Deliberately prompting for the opposing case checks whether you’re unconsciously steering the research toward a predetermined conclusion.',
        points: 1, difficulty: 'hard',
      },
      {
        type: 'multiple-choice',
        question: 'Before pasting confidential internal documents into an AI tool, what should you do?',
        options: [
          { text: 'Nothing — AI tools are always safe for confidential material', isCorrect: false },
          { text: 'Know the tool’s data-handling policy and anonymize sensitive details where possible', isCorrect: true },
          { text: 'Paste the full document without changes for maximum context', isCorrect: false },
          { text: 'Only use AI for confidential material, never for public information', isCorrect: false },
        ],
        explanation: 'Confidential material requires the same vendor-trust diligence as any external service — check data policies and anonymize where possible.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'When comparing competitors, why is it useful to identify what strategic "bet" each one is making?',
        options: [
          { text: 'It’s required by most business templates', isCorrect: false },
          { text: 'It reveals more strategically useful insight than surface-level feature comparisons alone', isCorrect: true },
          { text: 'It has no real value over a feature comparison', isCorrect: false },
          { text: 'It replaces the need for any other research', isCorrect: false },
        ],
        explanation: 'Identifying the underlying strategic bet (price, premium, niche, convenience, etc.) provides deeper strategic insight than comparing surface-level features alone.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What is Tier 3 in the three-tier verification approach for research?',
        options: [
          { text: 'Ignoring verification to save time', isCorrect: false },
          { text: 'A second person independently reviewing findings before they inform a major decision', isCorrect: true },
          { text: 'Asking the AI to double-check its own work only', isCorrect: false },
          { text: 'Publishing findings immediately without review', isCorrect: false },
        ],
        explanation: 'Tier 3 verification, reserved for high-stakes decisions, involves an independent second reviewer — the same rigor you’d want for any important analysis.',
        points: 1, difficulty: 'hard',
      },
    ],
  },
};
