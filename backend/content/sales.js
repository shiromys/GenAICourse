// Content update data for: Prompt Engineering for Sales and Customer Acquisition
// Matched to production by exact course/module/lesson TITLE — see scripts/updateCourseContent.js

export default {
  courseTitle: 'Prompt Engineering for Sales and Customer Acquisition',
  modules: [
    {
      title: 'Introduction to AI and Prompt Engineering in Sales',
      lessons: [
        {
          title: 'The Role of AI in Modern Sales',
          duration: 7,
          content: `Sales is a volume-and-personalization business — reps need to reach many prospects while making each interaction feel individually considered, which is exactly the tension AI helps resolve. A well-prompted AI tool can draft a personalized-feeling outreach email in the time it used to take to write a generic template, freeing reps to spend saved time on actual conversations and relationship-building, which no AI tool replaces.\n\nThe realistic framing: AI doesn't sell for you — it can't build trust in a live conversation, read a prospect's hesitation, or close a deal. What it does well is compress the drafting and research time around sales activity: personalizing outreach, drafting follow-ups, summarizing account research, and preparing for objections — the preparation and administrative layer that surrounds actual selling.\n\nThroughout this course, "prompt engineering for sales" means directing AI tools with clear, specific instructions to produce sales-relevant drafts and research summaries that a rep reviews, personalizes further with real relationship knowledge, and sends — always with the human relationship at the center of the actual sale.`,
          keyPoints: [
            'AI helps resolve the tension between sales volume and personalization by speeding up drafting.',
            'AI doesn’t sell for you — it can’t build trust or read a live conversation.',
            'AI compresses drafting, research, and preparation time around actual selling activity.',
            'The human relationship stays central to the actual sale; AI supports the surrounding work.'
          ],
          learningObjectives: [
            'Explain how AI addresses the volume-versus-personalization tension in sales.',
            'Distinguish between sales activities AI supports and the relationship work it cannot replace.'
          ],
        },
        {
          title: 'Understanding Prompt Engineering',
          duration: 6,
          content: `A sales-context prompt needs three core ingredients: the prospect/account context (who they are, what you know about their business or situation), the sales stage or goal (first outreach, follow-up, objection response, proposal), and the desired tone (consultative, direct, warm — matched to your relationship and industry norms).\n\nWeak prompt: "Write a sales email." Strong prompt: "Prospect: VP of Operations at a 200-person logistics company, recently posted on LinkedIn about supply chain delays. Goal: first outreach email referencing their specific pain point, inviting a 15-minute call. Tone: consultative, not pushy — we're offering to share relevant insight, not hard-selling in the first touch."\n\nThe strong version gives the AI genuine context to work with, producing something that reads as informed rather than templated — prospects can tell the difference between an email that references something specific about them and one that could have been sent to anyone in their industry.`,
          keyPoints: [
            'Sales prompts need prospect/account context, the sales stage or goal, and a matched tone.',
            'Specific context (a real detail about the prospect) produces emails that read as informed, not templated.',
            'Prospects can tell the difference between genuinely researched outreach and generic mass-email language.',
            'The tone should match your relationship stage and industry norms, not a generic "professional" default.'
          ],
          learningObjectives: [
            'Write a sales prompt including prospect context, goal, and tone.',
            'Explain why specific prospect detail improves outreach quality.'
          ],
        },
        {
          title: 'Sales Tasks Supported by AI',
          duration: 6,
          content: `AI is strongest on sales tasks that are language-heavy and preparation-focused: drafting (outreach emails, follow-ups, proposal sections), research synthesis (summarizing a prospect's public information you've gathered, preparing account briefs), objection preparation (anticipating likely pushback and drafting response frameworks), and internal documentation (call notes, CRM updates, deal summaries).\n\nAI is weakest on tasks requiring real-time human judgment: reading a prospect's tone and hesitation in a live call, building genuine rapport, negotiating final terms, and making a judgment call about whether a deal is worth pursuing further given everything a rep has learned through the relationship that isn't captured in any CRM field.\n\nA useful filter: if the task is "prepare something before or after a human interaction," AI is a strong fit. If the task is "the human interaction itself," AI supports preparation for it but doesn't replace it.`,
          keyPoints: [
            'AI excels at drafting, research synthesis, objection preparation, and documentation around sales activity.',
            'AI is weak at real-time judgment: reading tone, building rapport, negotiating, and relationship-based decisions.',
            'A simple filter: "prepare for an interaction" fits AI well; "the interaction itself" does not.',
            'AI supports the human interaction with preparation; it doesn’t replace the interaction.'
          ],
          learningObjectives: [
            'Categorize sales tasks as strong or weak fits for AI assistance.',
            'Apply the preparation-versus-interaction filter to a sales workflow.'
          ],
        },
        {
          title: 'Advantages and Limitations of AI in Sales',
          duration: 7,
          content: `The advantages: speed (drafting outreach and follow-ups in a fraction of the time), scalable personalization (referencing real prospect details across many emails without each one taking as long as fully custom writing), and consistency (a well-built prompt applies the same quality bar regardless of how rushed or tired a rep is at the end of a long day).\n\nThe limitations carry real sales-specific risk: AI has no knowledge of your actual deal history, relationship nuances, or what's already been discussed with a specific prospect unless you provide it — sending a follow-up that contradicts or repeats an earlier conversation because the AI wasn't given that context damages credibility. AI can also generate confident-sounding claims about your product's capabilities that aren't accurate, which is a serious risk in a sales context where over-promising creates real problems for the customer relationship and for whoever has to deliver on the commitment later.\n\nThe practical balance: use AI for drafting speed and structure, always feeding it real deal and relationship context, and always reviewing for accuracy of any product claim before it reaches a prospect — the same discipline covered throughout this course series, with sales-specific stakes.`,
          keyPoints: [
            'Key advantages: drafting speed, scalable personalization, and consistent quality regardless of rep fatigue.',
            'AI has no knowledge of your specific deal history or prior conversations unless you provide it.',
            'A follow-up that contradicts an earlier conversation (because AI lacked that context) damages credibility.',
            'Never let AI generate unverified product capability claims — over-promising creates real downstream problems.'
          ],
          learningObjectives: [
            'Summarize the core advantages AI offers in a sales context.',
            'Identify the risk of AI-generated product claims that aren’t accurate.'
          ],
          resources: [
            {
              title: 'Module 1 Cheat Sheet: Sales Prompt Context Template',
              type: 'download',
              description: 'A reusable template for turning prospect context into a personalized, on-tone sales prompt.',
              content: `SALES PROMPT TEMPLATE\n\nProspect/Account: [role, company, size, relevant detail you know about them]\nSales stage/goal: [first outreach / follow-up / objection response / proposal]\nWhat's already been discussed: [prior conversation context, or "none yet"]\nTone: [consultative / direct / warm — matched to relationship stage]\nAccurate product facts to reference: [only real, verified capabilities/features]\n\nInstruction: "Using the above, draft [deliverable]. Reference the specific context given — don't write something generic that could apply to any prospect. Only claim product capabilities I've listed above."`
            }
          ]
        },
      ],
    },
    {
      title: 'Identifying Target Customers and Sales Opportunities',
      lessons: [
        {
          title: 'Understanding Customer Segmentation',
          duration: 6,
          content: `Effective outreach starts with knowing who you're actually talking to — segmentation groups prospects by shared characteristics (industry, company size, role, pain point) so messaging can be tailored to what actually resonates with each group, rather than one generic pitch sent to everyone.\n\nAI can help structure segmentation thinking once you provide real data about your existing customers or target market: "Here's data on our best current customers: [paste details — industry, size, use case]. What patterns or segments do you see that we could use to prioritize outreach?" This turns scattered customer data into structured segments faster than manual analysis, though the underlying data quality determines how useful the output is.\n\nOnce segments are defined, they become the "prospect context" ingredient from Module 1's prompt template — knowing which segment a prospect belongs to lets you draft outreach that speaks to that segment's specific, common pain points rather than generic value propositions.`,
          keyPoints: [
            'Segmentation groups prospects by shared characteristics to enable tailored, resonant messaging.',
            'AI can help identify patterns in real customer data to define useful segments.',
            'Segment definition feeds directly into the prospect-context prompt template from Module 1.',
            'Output quality depends on the quality of the real customer data provided.'
          ],
          learningObjectives: [
            'Use real customer data to identify meaningful segmentation patterns.',
            'Connect segment definitions to more targeted outreach prompting.'
          ],
        },
        {
          title: 'Building Customer Personas with AI',
          duration: 6,
          content: `A customer persona translates a segment into a specific, relatable profile — a shorthand a whole sales team can reference when crafting outreach, without each rep re-deriving the target customer's likely priorities from scratch every time.\n\nA useful prompt: "Based on this segment description [paste segment data/patterns], draft a customer persona including: likely job priorities, common pain points, what they'd be skeptical of in a sales pitch, and what would make them take a first call." Including "what they'd be skeptical of" is a useful addition beyond a standard persona template — anticipating skepticism helps reps prepare more honest, credible outreach rather than generic enthusiasm.\n\nTreat AI-generated personas as a structured starting hypothesis, refined over time with real feedback from actual sales conversations — a persona that hasn't been checked against real prospect reactions is an educated guess, useful for getting started but not a substitute for the pattern-recognition a sales team builds through real experience.`,
          keyPoints: [
            'A persona translates a segment into a specific, relatable profile the whole team can reference.',
            'Including likely skepticism in a persona helps reps prepare honest, credible outreach.',
            'Treat AI-generated personas as a starting hypothesis, refined by real sales conversation feedback.',
            'Real experience-based pattern recognition should continually refine and correct initial personas.'
          ],
          learningObjectives: [
            'Draft a customer persona including likely priorities and anticipated skepticism.',
            'Explain why personas should be refined with real sales feedback over time.'
          ],
        },
        {
          title: 'Writing Effective Sales Prompts',
          duration: 7,
          content: `Combining segmentation, persona, and the Module 1 prompt template produces a genuinely effective sales prompt. Example: "Prospect fits our 'Ops Director, mid-size logistics' persona [paste persona summary]. This specific prospect: [name/company/real detail you found]. Goal: first outreach referencing their likely priority around delivery reliability. Tone: consultative. Draft a 4-sentence email with a soft call-to-action for a 15-minute call."\n\nNotice this layers three things: the general persona (what this type of prospect usually cares about), the specific individual detail (what makes this particular email personalized, not just segment-generic), and the tactical ask (goal, tone, length, CTA). All three layers matter — persona alone produces segment-generic outreach; specific detail alone, without persona context, can feel like trivia without a clear point.\n\nA useful discipline: always include at least one specific, real detail about the individual prospect (not just their segment) so the output can't be mistaken for a mass-email template, even by the prospect receiving it.`,
          keyPoints: [
            'Effective sales prompts layer persona context, a specific individual detail, and a tactical ask.',
            'Persona alone produces segment-generic outreach — specific detail is what makes it feel personal.',
            'Specific detail without persona context can feel like trivia without a clear connecting point.',
            'Always include at least one real, specific detail about the individual prospect, not just their segment.'
          ],
          learningObjectives: [
            'Combine persona, specific prospect detail, and tactical goals into an effective sales prompt.',
            'Explain why both general persona and specific detail are needed for genuinely personalized outreach.'
          ],
        },
        {
          title: 'Common Prompt Mistakes in Sales',
          duration: 6,
          content: `Four recurring mistakes in sales prompting. First, segment-only personalization — referencing only generic segment traits ("as an operations leader...") without any specific, individual detail, which prospects can recognize as templated even when it's technically accurate to their role.\n\nSecond, letting AI state unverified product claims — asking for a "compelling pitch" without providing accurate feature/capability facts can produce confident-sounding but inaccurate claims about what your product does, a serious risk in sales specifically since it can create commitments the company then has to honor or walk back.\n\nThird, ignoring deal history — drafting a follow-up without providing what was already discussed, risking repetition or contradiction that damages credibility with a prospect who's tracking the conversation more carefully than a generic prompt assumes. Fourth, over-lengthy first-touch outreach — AI can produce a thorough, detailed email when a busy prospect actually needs 3-4 punchy sentences; always specify length constraints explicitly for outreach, since unconstrained AI drafts tend toward comprehensive rather than concise.`,
          keyPoints: [
            'Avoid segment-only personalization — prospects can recognize outreach lacking any specific individual detail.',
            'Never let AI state unverified product capability claims — always provide accurate facts to reference.',
            'Always provide deal history context to avoid repetitive or contradictory follow-ups.',
            'Specify length constraints explicitly — unconstrained AI drafts tend toward comprehensive, not concise.'
          ],
          learningObjectives: [
            'Identify the four most common sales prompting mistakes.',
            'Apply a fix for each identified mistake to a sales outreach prompt.'
          ],
          resources: [
            {
              title: 'Module 2 Cheat Sheet: Persona-Based Outreach Prompt',
              type: 'download',
              description: 'A layered prompt template combining persona, specific detail, and tactical goals for personalized outreach.',
              content: `PERSONA-BASED OUTREACH PROMPT\n\n"Persona: [paste persona summary — priorities, pain points, skepticism].\nThis specific prospect: [real name/company/detail you found].\nDeal history: [what's already been discussed, or 'first contact'].\nGoal: [first outreach / follow-up / etc.].\nTone: [consultative/direct/warm].\nLength: [X sentences — be specific].\nOnly reference these accurate product facts: [list].\nDraft the email now."`
            }
          ]
        },
      ],
    },
    {
      title: 'AI-Assisted Sales Communication',
      lessons: [
        {
          title: 'Generating Sales Email Drafts',
          duration: 6,
          content: `Email drafting is where the full Module 2 prompt template comes together in practice — persona, specific detail, deal history, goal, tone, and length constraints, applied to whichever email type is needed (first outreach, follow-up, re-engagement of a cold lead).\n\nFor different email types, adjust the goal and tone specifically: first outreach should feel low-pressure and value-first ("here's something relevant, want to talk?"), follow-ups should reference the prior conversation specifically and add new value rather than just "checking in," and re-engagement emails for cold leads should acknowledge time has passed and offer a genuine reason the timing might now be different.\n\nA useful practice across all email types: generate 2-3 variations and choose or blend the best elements, the same brief-generate-refine pattern from earlier courses in this series — the first AI draft is rarely the final send-ready version, and comparing options is often faster than trying to perfect one draft through multiple rounds of editing.`,
          keyPoints: [
            'Email drafting applies the full prompt template: persona, detail, history, goal, tone, length.',
            'Adjust goal and tone by email type: first outreach (low-pressure), follow-up (reference prior context), re-engagement (acknowledge time passed).',
            'Generate multiple variations and select or blend the best elements rather than accepting the first draft.',
            'Comparing options is often faster than perfecting one draft through repeated editing rounds.'
          ],
          learningObjectives: [
            'Draft different email types (outreach, follow-up, re-engagement) with appropriately adjusted tone and goal.',
            'Apply a generate-and-select approach across multiple email draft variations.'
          ],
        },
        {
          title: 'Creating Sales Pitch Content',
          duration: 7,
          content: `Pitch content — whether a short verbal talking-point outline or written proposal sections — benefits from the same accuracy discipline emphasized throughout this course: only reference real, verified product capabilities and pricing, never AI-generated assumptions about what your product might do.\n\nA useful prompt: "Prospect's stated priority: [what they told you they care about, from real conversation]. Our relevant, verified capabilities: [list accurate features/benefits]. Draft 3 key talking points connecting their priority to our capabilities, in order of likely impact for them specifically." Grounding the pitch in what the prospect actually said they care about, rather than a generic feature list, produces something that feels responsive rather than templated.\n\nFor written proposal sections specifically, treat AI drafts as first-pass structure requiring the same fact-check as any other AI output in this course series — pricing, terms, and capability claims in a proposal can become part of what a customer expects to be honored, so accuracy here carries real downstream weight.`,
          keyPoints: [
            'Pitch content must only reference real, verified capabilities and pricing — never AI-assumed features.',
            'Ground pitch talking points in what the prospect actually stated they care about, not a generic feature list.',
            'Order talking points by likely impact for that specific prospect’s stated priorities.',
            'Proposal sections carry real downstream weight — fact-check pricing, terms, and claims carefully.'
          ],
          learningObjectives: [
            'Draft pitch talking points connecting verified capabilities to a prospect’s stated priorities.',
            'Apply accuracy discipline to AI-drafted proposal content.'
          ],
        },
        {
          title: 'AI for Social Selling',
          duration: 6,
          content: `Social selling — engaging prospects through platforms like LinkedIn before or alongside direct outreach — benefits from AI drafting help for comments, connection requests, and share-worthy posts, with the same platform-awareness principle from the marketing-focused course in this series: name the specific platform and match its norms.\n\nA useful prompt: "I want to comment thoughtfully on this prospect's LinkedIn post: [paste post content]. Draft a genuine, specific comment that adds real value or perspective — not generic praise like 'great post!' or a disguised sales pitch." Explicitly ruling out generic praise and disguised pitching matters, since both are common, easily-recognized patterns that can actually hurt credibility rather than build it.\n\nFor connection requests specifically, personalization based on something real (a shared connection, a specific post, a common interest) significantly outperforms generic "I'd like to add you to my network" messages — the same specific-detail principle from earlier modules, applied to a shorter format.`,
          keyPoints: [
            'Social selling engagement should add genuine value, not generic praise or a disguised pitch.',
            'Explicitly instruct AI to avoid generic phrases like "great post!" which read as low-effort.',
            'Personalize connection requests with a real, specific detail rather than a generic networking message.',
            'The specific-detail principle from earlier modules applies to short-format social engagement too.'
          ],
          learningObjectives: [
            'Draft a genuine, value-adding social media comment for prospect engagement.',
            'Personalize a connection request using a specific, real detail.'
          ],
        },
        {
          title: 'Handling Customer Objections',
          duration: 7,
          content: `Objection handling benefits from AI's preparation strengths — brainstorming likely objections in advance and drafting response frameworks — though the live handling of an objection in a real conversation is a human skill involving tone, timing, and reading the prospect that no draft response can fully substitute for.\n\nA useful preparation prompt: "Our product: [real description]. Likely prospect profile: [persona]. What are the 5 most likely objections this type of prospect would raise, and for each, what's a thoughtful response framework — not a script to recite, but the key points to hit?" Requesting a "framework, not a script" matters — a memorized script can sound robotic in a live conversation, while internalized key points let a rep respond naturally in their own words.\n\nFor written objection responses (email-based sales, not live calls), the same accuracy discipline applies: only address objections with real, verified information — an objection about pricing or capability deserves an honest, accurate answer, not a reassuring-sounding but inaccurate one that creates a bigger problem later.`,
          keyPoints: [
            'AI helps prepare for objections in advance; live objection handling remains a human conversational skill.',
            'Ask for a response framework (key points), not a script to recite word-for-word.',
            'A memorized script can sound robotic; internalized key points allow natural, individual responses.',
            'Written objection responses still require accuracy — honest answers over reassuring-but-inaccurate ones.'
          ],
          learningObjectives: [
            'Prepare a framework-based response to likely customer objections.',
            'Explain why a response framework is preferable to a memorized script for live conversations.'
          ],
          resources: [
            {
              title: 'Module 3 Cheat Sheet: Pitch & Objection Prep Prompts',
              type: 'download',
              description: 'Prompts for grounding pitch content in verified facts and preparing objection response frameworks.',
              content: `PITCH TALKING POINTS PROMPT\n"Prospect's stated priority: [real, from conversation]. Our verified capabilities: [list]. Draft 3 talking points connecting their priority to our capabilities, ordered by likely impact for them."\n\nOBJECTION PREP PROMPT\n"Product: [real description]. Prospect profile: [persona]. What are the 5 most likely objections, and for each, a response framework (key points, not a script)?"`
            }
          ]
        },
      ],
    },
    {
      title: 'Responsible Use of AI in Sales',
      lessons: [
        {
          title: 'Maintaining Honest Sales Communication',
          duration: 6,
          content: `Sales carries a specific accuracy risk this course has flagged repeatedly: AI-generated content can state confident-sounding claims about product capabilities, pricing, or results that aren't accurate — and in sales specifically, an inaccurate claim that reaches a prospect can become an expectation the business has to honor, refund, or awkwardly walk back.\n\nThe practical discipline: every product capability, pricing detail, or results claim (like a customer success statistic) in AI-drafted sales content must be checked against your actual, current, verified information before it's sent — never accepted because it sounds plausible or matches what you generally believe your product does. A useful prompting safeguard: "Only reference the specific product facts and pricing I've provided below — do not add capabilities or claims I haven't listed."\n\nThis matters beyond individual deal risk — a pattern of over-promising sales content, even if unintentional, damages broader customer trust and can create legal or contractual exposure for the business, making this one of the highest-stakes accuracy applications covered across this entire course series.`,
          keyPoints: [
            'An inaccurate AI-generated claim reaching a prospect can become an expectation the business must honor.',
            'Every capability, pricing, and results claim in sales content must be checked against real, current facts.',
            'Use an explicit safeguard instruction limiting AI to only the facts you’ve provided.',
            'Over-promising sales content creates real legal and contractual exposure, not just an awkward conversation.'
          ],
          learningObjectives: [
            'Apply strict fact-verification to AI-drafted sales content before it reaches a prospect.',
            'Explain the business risk of over-promising claims in sales communication.'
          ],
        },
        {
          title: 'Avoiding Bias in Customer Targeting',
          duration: 6,
          content: `AI-assisted segmentation and persona-building (Module 2) can unintentionally encode bias — for example, if historical "best customer" data reflects who your sales team happened to reach in the past rather than who genuinely fits your product best, AI trained on that data can reinforce and scale that same narrow targeting rather than identifying a broader, equally-valid addressable market.\n\nA useful check: when reviewing AI-generated segments or personas, ask explicitly whether the underlying data reflects genuine product fit or just historical reach — "Based on this customer data, are we potentially missing segments that would also be a good fit but aren't well-represented in our existing customer base?" This surfaces blind spots a purely pattern-matching analysis of existing customers might miss.\n\nMore broadly, be cautious about AI-generated personas making unwarranted assumptions tied to protected characteristics (age, gender, ethnicity) rather than genuine business-relevant traits (role, company size, stated priorities) — targeting should be grounded in business fit, not demographic stereotyping, both as a matter of fairness and because demographic assumptions are often simply inaccurate predictors of actual product fit.`,
          keyPoints: [
            'AI-assisted segmentation can encode bias from historical "best customer" data reflecting past reach, not true fit.',
            'Explicitly check whether segments reflect genuine product fit or just who was historically well-served.',
            'Watch for personas making unwarranted assumptions tied to protected characteristics rather than business traits.',
            'Targeting should be grounded in business-relevant fit (role, size, priorities), not demographic stereotyping.'
          ],
          learningObjectives: [
            'Check AI-generated segments for bias toward historical reach versus genuine product fit.',
            'Identify inappropriate demographic assumptions in AI-generated personas.'
          ],
        },
        {
          title: 'Protecting Customer Data',
          duration: 6,
          content: `Sales workflows routinely involve sensitive prospect and customer data — contact details, deal size, internal notes about a prospect's business challenges, sometimes competitive intelligence they've shared in confidence. The same data-handling discipline from this course series applies: know your AI tool's data-retention policy before pasting in real prospect or customer information.\n\nPractical safeguards specific to sales: avoid pasting a prospect's confidential business information (something they shared assuming discretion) into a general AI tool without considering whether that violates the trust of the conversation; be especially careful with any information covered by an NDA or confidentiality agreement, which may have specific contractual restrictions on how it can be stored or processed; and when using AI to summarize call notes or CRM data in bulk, consider whether the task needs full customer names and identifiers or could work with de-identified account references.\n\nA prospect who learns their confidential comments were pasted into a public AI tool, even innocently, may reasonably feel that trust was violated — protecting this information carefully is both a compliance matter and a relationship-trust matter central to sales specifically.`,
          keyPoints: [
            'Know your AI tool’s data-retention policy before pasting real prospect or customer information.',
            'Be especially careful with information covered by an NDA, which may have specific handling restrictions.',
            'Consider whether bulk summarization tasks need full identifiers or could use de-identified references.',
            'Mishandling a prospect’s confidential information can violate the trust central to the sales relationship itself.'
          ],
          learningObjectives: [
            'Apply data-handling safeguards to prospect and customer information used in AI prompts.',
            'Recognize NDA-covered information as requiring extra handling care.'
          ],
        },
        {
          title: 'Maintaining Brand Voice in Sales Messaging',
          duration: 6,
          content: `Sales messaging is often a prospect's first direct interaction with how your company actually communicates — inconsistent voice across reps, or a voice that doesn't match your marketing and product positioning, can create a subtle but real disconnect that undermines trust before a deal even starts.\n\nThe same example-based technique from the marketing course applies here: maintain a shared set of real sales emails or talking points the team considers strong examples of the right voice, and instruct AI to match that voice specifically when drafting new content. This also helps newer reps sound consistent with experienced team members faster than they would by developing their own voice from scratch through trial and error alone.\n\nA useful team practice: periodically compare AI-assisted outreach across different reps for the same type of prospect, checking both for accuracy (per this module's earlier lessons) and voice consistency — treating this as a living practice that improves the shared example set over time, not a one-time style guide nobody revisits.`,
          keyPoints: [
            'Inconsistent sales voice across reps, or voice that doesn’t match marketing positioning, undermines trust.',
            'Maintain a shared set of strong example emails/talking points for AI to match voice against.',
            'This helps newer reps sound consistent with experienced team members faster.',
            'Periodically review outreach across reps for both accuracy and voice consistency, refining examples over time.'
          ],
          learningObjectives: [
            'Use example-based prompting to maintain consistent sales voice across a team.',
            'Explain how shared voice examples accelerate ramp-up for newer sales reps.'
          ],
          resources: [
            {
              title: 'Module 4 Cheat Sheet: Sales Accuracy & Targeting Bias Checklist',
              type: 'download',
              description: 'A checklist for verifying accuracy and checking for targeting bias before sales content goes out.',
              content: `PRE-SEND ACCURACY CHECKLIST\n☐ Every product capability claim is verified against real, current specs.\n☐ Every pricing detail matches actual current pricing.\n☐ No results/success statistics were invented or unverified.\n☐ Deal history context was provided and reflected accurately.\n\nTARGETING BIAS CHECK\n☐ Does this segment/persona reflect genuine product fit, or just historical sales reach?\n☐ Are any assumptions tied to protected characteristics rather than business-relevant traits?\n☐ Have we considered segments that might be a good fit but are underrepresented in past data?`
            }
          ]
        },
      ],
    },
    {
      title: 'Applying AI to Improve Sales Performance',
      lessons: [
        {
          title: 'Using AI for Lead Generation',
          duration: 6,
          content: `AI supports lead generation primarily through research synthesis — helping structure and prioritize a list of prospects once you've gathered real information about them, rather than inventing leads from nothing (which isn't something AI can do reliably or accurately for current, real companies and contacts).\n\nA useful prompt: "Here's a list of companies matching our target segment [paste company names/basic info you've gathered from real sources]. Based on our persona [paste persona], which of these seem like the strongest-fit prospects, and why?" This helps prioritize outreach effort toward the most promising leads first, using real company information as the input.\n\nAs with investor identification in the entrepreneurship-focused course in this series, treat any specific contact names, titles, or details AI provides as unverified — current, accurate contact information requires real, up-to-date data sources (a CRM, a prospecting tool, LinkedIn) rather than AI's general training knowledge, which can be outdated for a specific person's current role or company.`,
          keyPoints: [
            'AI supports lead generation through prioritizing and structuring real prospect information, not inventing leads.',
            'Use real company/prospect data as the input; AI helps rank and prioritize based on persona fit.',
            'Treat any specific contact names or titles from AI as unverified — confirm through current real sources.',
            'AI training knowledge about specific people’s current roles can be outdated.'
          ],
          learningObjectives: [
            'Use AI to prioritize a real list of prospects based on persona fit.',
            'Explain why specific contact details from AI require independent, current verification.'
          ],
        },
        {
          title: 'AI for Sales Strategy Development',
          duration: 6,
          content: `AI can help structure sales strategy thinking — analyzing what's working across deals, identifying patterns in won versus lost deals, and drafting strategy documents — as long as it's working from real deal data you provide, not general sales advice disconnected from your actual pipeline.\n\nA useful prompt: "Here's data on our last 20 deals — won and lost, with notes on what happened: [paste real data]. What patterns do you see between won and lost deals? What does this suggest about where we should focus?" This turns scattered deal history into structured pattern analysis faster than manual review, though the strategic decision about what to actually change requires sales leadership judgment informed by more context than any dataset alone captures.\n\nA useful habit: treat AI-identified patterns as hypotheses to validate with the sales team's own experience — a pattern that shows up in the data but contradicts what experienced reps have observed firsthand is worth a real discussion, not an automatic strategy change based on the data alone.`,
          keyPoints: [
            'AI can identify patterns in real won/lost deal data to inform sales strategy discussions.',
            'Strategic decisions require sales leadership judgment beyond what any dataset alone captures.',
            'Treat AI-identified patterns as hypotheses to validate against the team’s real firsthand experience.',
            'A data pattern contradicting experienced reps’ observations deserves discussion, not automatic adoption.'
          ],
          learningObjectives: [
            'Use AI to identify patterns in real deal data for strategy discussions.',
            'Apply a validation step before acting on AI-identified strategic patterns.'
          ],
        },
        {
          title: 'Evaluating Sales Performance',
          duration: 6,
          content: `Sales performance reporting follows the "real data in, plain-language summary out" pattern used throughout this course series — AI should never generate the underlying performance numbers, only help synthesize and communicate real numbers pulled from your CRM or sales reporting tools.\n\nA useful prompt: "Here's this quarter's real performance data: [paste numbers — deals closed, pipeline, conversion rates by stage]. Summarize the 3 most important takeaways for a team meeting, and flag anything that looks like it needs attention." This produces a fast, communicable summary from data that might otherwise sit in a spreadsheet without being clearly surfaced to the team.\n\nAs with the entrepreneurship course's caution about investor updates, resist using AI to make underperformance look better than it is — a sales team benefits far more from an honest, clear-eyed read of what's working and what isn't than from a polished-sounding summary that obscures a real problem needing attention.`,
          keyPoints: [
            'Sales performance summaries must be based on real data, with AI only handling the synthesis step.',
            'A good summary surfaces the 3 most important takeaways and flags what needs attention.',
            'Resist using AI to make underperformance look better than it actually is.',
            'An honest, clear-eyed performance read serves the team better than a polished but misleading one.'
          ],
          learningObjectives: [
            'Summarize real sales performance data into actionable, honest takeaways.',
            'Recognize the risk of using AI to obscure underperformance in reporting.'
          ],
        },
        {
          title: 'Future of AI in Sales and Customer Acquisition',
          duration: 6,
          content: `Trends worth watching: deeper CRM integration (AI features built directly into sales tools rather than a separate copy-paste step), more sophisticated personalization at scale (though the specific-detail discipline from this course remains essential regardless of how automated the process becomes), and increasing prospect awareness of AI-generated outreach — meaning generic, obviously-automated messages are becoming easier for prospects to spot and increasingly likely to be ignored or distrusted.\n\nThat last trend has a direct practical implication: as AI-assisted outreach becomes more common, the outreach that stands out will be the outreach that clearly reflects genuine research and specific understanding of the individual prospect — reinforcing, not replacing, the specific-detail principle emphasized throughout this course. Generic AI use becomes a competitive disadvantage precisely because it becomes more common and more recognizable.\n\nAs with the other courses in this series, the durable skill is the discipline — specific, accurate, well-verified prompting — not any particular tool. Tools and integrations will keep evolving; the discipline of grounding every piece of sales communication in real context and real facts remains the actual differentiator.`,
          keyPoints: [
            'Watch for deeper CRM integration and increasing prospect awareness of generic AI-generated outreach.',
            'As AI outreach becomes common, genuinely researched, specific outreach becomes the differentiator, not a nicety.',
            'Generic AI use becomes a competitive disadvantage as it becomes more common and recognizable.',
            'The durable skill is grounded, accurate, specific prompting — not any particular tool.'
          ],
          learningObjectives: [
            'Identify trends shaping AI’s role in sales and customer acquisition.',
            'Explain why specific, well-researched outreach becomes more valuable as generic AI use increases.'
          ],
          resources: [
            {
              title: 'Module 5 Cheat Sheet: Deal Pattern & Performance Summary Prompts',
              type: 'download',
              description: 'Prompts for finding real patterns in deal data and summarizing performance honestly.',
              content: `DEAL PATTERN ANALYSIS PROMPT\n"Data on our last [N] deals — won and lost, with notes: [paste real data]. What patterns do you see between won and lost deals? What does this suggest for focus areas?"\n\nPERFORMANCE SUMMARY PROMPT\n"This quarter's real data: [paste numbers]. Summarize the 3 most important takeaways for a team meeting and flag anything needing attention. Present underperformance honestly, don't soften it."`
            }
          ]
        },
      ],
    },
    {
      title: 'Evaluating and Improving AI Prompt Results',
      lessons: [
        {
          title: 'Evaluating AI-Generated Research Outputs',
          duration: 7,
          content: `Closing this course, it's worth building a consistent habit for evaluating any AI-generated sales research or content before using it: does it reference real, specific, verified information about this prospect or deal? Does it match your brand voice? Is every claim about your product accurate?\n\nA useful evaluation prompt to run on your own drafts: "Review this draft I'm about to send: [paste it]. Does it read as generic or specifically tailored to this prospect? Are there any claims that sound like they need fact-checking?" Using AI to review AI-generated content, with a specifically critical prompt, can catch generic-sounding patterns a rushed human read-through might miss.\n\nOver time, this evaluation habit — checking specificity, voice, and accuracy every time — is what separates sales teams that get genuine value from AI from those that get a volume of forgettable, generic-sounding outreach that technically went out faster but converts no better than what came before.`,
          keyPoints: [
            'Evaluate AI-generated sales content for specificity, voice match, and claim accuracy before sending.',
            'A critical review prompt on your own draft can catch generic patterns a rushed read-through misses.',
            'Consistent evaluation is what separates teams getting real value from AI versus generic-output volume.',
            'Faster generic outreach doesn’t convert better — specificity and accuracy remain the differentiators.'
          ],
          learningObjectives: [
            'Apply a structured evaluation process to AI-generated sales drafts before sending.',
            'Use AI itself as a critical reviewer of its own generated content.'
          ],
        },
        {
          title: 'Refining Prompts for Better Results',
          duration: 6,
          content: `Prompt refinement is iterative — when a draft isn't quite right, the fastest path is rarely starting over, but identifying specifically what's missing (a detail, a constraint, an example) and adding it to the next attempt, the same diagnostic habit from the marketing and research courses in this series applied to sales.\n\nCommon sales-specific refinements: if outreach feels generic, add a more specific prospect detail; if the tone feels off, paste a real example of the right tone; if a pitch feels too feature-heavy, explicitly ask it to connect features to the specific prospect's stated priority instead; if a follow-up feels repetitive, make sure deal history was actually included in the prompt.\n\nBuilding a personal or team log of prompt refinements that worked — similar to the template libraries recommended throughout this course series — turns each individual fix into a reusable lesson, compounding into genuinely better sales prompting over weeks and months rather than re-solving the same issues repeatedly from scratch.`,
          keyPoints: [
            'Refine, don’t restart — diagnose specifically what’s missing (detail, constraint, example) and add it.',
            'Common fixes: add specific detail for genericness, paste a tone example, connect features to stated priorities.',
            'Missing deal history is a common cause of repetitive-feeling follow-ups.',
            'Log prompt refinements that worked to build a compounding, reusable improvement habit over time.'
          ],
          learningObjectives: [
            'Diagnose a disappointing sales prompt output and apply a targeted refinement.',
            'Build a habit of logging effective prompt refinements for reuse.'
          ],
        },
        {
          title: 'Integrating AI Insights into Workflows',
          duration: 6,
          content: `As a closing lesson, this brings the course together into a repeatable sales workflow: segment and persona definition (Module 2) feeding into personalized outreach (Modules 2-3), grounded in accuracy and data-handling discipline (Module 4), informed by real performance and deal-pattern analysis (Module 5), and continuously refined through evaluation and iteration (this module).\n\nSales teams that get durable value from AI build this as standard practice — shared prompt templates per email type and objection category, a maintained persona/segment reference, and a habit of periodic pattern review — rather than ad hoc, one-off prompting that doesn't compound across the team. Each cheat sheet from this course's modules is a starting point for that shared team library.\n\nThe transferable skill across this entire course, consistent with the other courses in this series: specific, grounded, verified prompting, with human relationship-building and judgment kept firmly at the center of the actual sale. AI compresses the preparation and drafting time around selling — the selling itself, and the trust it depends on, remains human work.`,
          keyPoints: [
            'The full workflow: segmentation/persona → personalized outreach → accuracy discipline → performance analysis → refinement.',
            'Durable value comes from shared team templates and references, not one-off ad hoc prompting.',
            'Each module’s cheat sheet is a starting point for a team’s shared prompt library.',
            'AI compresses preparation time; the actual selling and relationship trust remain human work.'
          ],
          learningObjectives: [
            'Describe the full AI-assisted sales workflow taught across this course.',
            'Explain why human relationship-building remains central despite AI’s role in preparation.'
          ],
          resources: [
            {
              title: 'Module 6 Cheat Sheet: Sales Prompt Evaluation & Refinement Guide',
              type: 'download',
              description: 'A checklist for evaluating drafts and a diagnostic guide for refining underperforming prompts.',
              content: `DRAFT EVALUATION PROMPT\n"Review this draft: [paste it]. Does it read as generic or specifically tailored to this prospect? Are there any claims that need fact-checking? Rate its specificity from 1–5 and explain why."\n\nREFINEMENT DIAGNOSTIC\nIf output feels generic → add a specific prospect detail.\nIf tone feels off → paste a real example of the right tone.\nIf too feature-heavy → ask to connect features to the prospect's stated priority.\nIf follow-up feels repetitive → check that deal history was included in the prompt.`
            }
          ]
        },
      ],
    },
  ],
  quiz: {
    title: 'Prompt Engineering for Sales and Customer Acquisition — Final Assessment',
    description: 'A 10-question assessment covering sales prompting, personalization, and responsible AI use in sales.',
    passingScore: 70,
    questions: [
      {
        type: 'multiple-choice',
        question: 'What is the realistic role of AI in the sales process, per this course?',
        options: [
          { text: 'It fully replaces the need for a human sales rep', isCorrect: false },
          { text: 'It compresses drafting and preparation time around actual selling activity', isCorrect: true },
          { text: 'It builds trust with prospects automatically', isCorrect: false },
          { text: 'It negotiates final deal terms', isCorrect: false },
        ],
        explanation: 'AI supports the preparation and drafting layer around sales — it cannot build trust, read live conversation cues, or negotiate, which remain human skills.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'Why does segment-only personalization often fail to convince a prospect the outreach is genuinely personal?',
        options: [
          { text: 'It uses too many words', isCorrect: false },
          { text: 'Prospects can recognize outreach lacking any specific individual detail as templated', isCorrect: true },
          { text: 'It is against most companies’ policies', isCorrect: false },
          { text: 'Segmentation data is always inaccurate', isCorrect: false },
        ],
        explanation: 'Referencing only generic segment traits without a specific, individual detail can be recognized by prospects as templated, even when the traits are accurate.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'true-false',
        question: 'It is acceptable to let AI generate a compelling but unverified claim about your product’s capabilities in a sales email, as long as it sounds convincing.',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true },
        ],
        correctAnswer: 'False',
        explanation: 'An inaccurate claim reaching a prospect can become an expectation the business has to honor — every capability and pricing claim must be verified before sending.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'When preparing for customer objections, what should you ask AI to provide?',
        options: [
          { text: 'A word-for-word script to recite', isCorrect: false },
          { text: 'A response framework of key points, not a script', isCorrect: true },
          { text: 'A list of reasons to avoid the objection entirely', isCorrect: false },
          { text: 'Nothing — objections should never be prepared for in advance', isCorrect: false },
        ],
        explanation: 'A framework of key points allows natural, individual responses in a live conversation, while a memorized script can sound robotic.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What is a risk of AI-assisted customer segmentation based purely on historical "best customer" data?',
        options: [
          { text: 'It always produces perfectly accurate segments', isCorrect: false },
          { text: 'It can reinforce narrow targeting reflecting past sales reach rather than genuine product fit', isCorrect: true },
          { text: 'It eliminates the need for any further sales strategy', isCorrect: false },
          { text: 'It has no meaningful risks', isCorrect: false },
        ],
        explanation: 'Historical data may reflect who the sales team happened to reach in the past, not who genuinely fits the product — this can scale a narrow blind spot rather than reveal the true addressable market.',
        points: 1, difficulty: 'hard',
      },
      {
        type: 'true-false',
        question: 'Information covered by an NDA may have specific contractual restrictions on how it can be stored or processed, including in AI tools.',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false },
        ],
        correctAnswer: 'True',
        explanation: 'NDA-covered information requires extra care, since contractual restrictions may govern how it can be stored or processed, including in third-party AI tools.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What is the most reliable way to maintain consistent sales voice across a team’s AI-assisted outreach?',
        options: [
          { text: 'Let every rep develop their own voice independently with no shared reference', isCorrect: false },
          { text: 'Maintain a shared set of real, strong example emails for AI to match voice against', isCorrect: true },
          { text: 'Avoid giving any tone instructions to the AI', isCorrect: false },
          { text: 'Use only very long, formal prompts', isCorrect: false },
        ],
        explanation: 'Real examples give AI something concrete to match, helping maintain consistency and accelerating ramp-up for newer reps.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'When using AI to analyze sales performance, what should always be true of the underlying numbers?',
        options: [
          { text: 'AI should estimate them for speed', isCorrect: false },
          { text: 'They should be real data pulled from your CRM or sales reporting tools', isCorrect: true },
          { text: 'They should be rounded up to look more favorable', isCorrect: false },
          { text: 'It doesn’t matter where the numbers come from', isCorrect: false },
        ],
        explanation: 'AI should only synthesize and communicate real performance data — it should never generate or estimate the underlying numbers itself.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'As AI-assisted outreach becomes more common, what does this course predict will become the real differentiator?',
        options: [
          { text: 'Sending the highest possible volume of outreach', isCorrect: false },
          { text: 'Outreach that clearly reflects genuine research and specific understanding of the prospect', isCorrect: true },
          { text: 'Using the newest available AI tool before anyone else', isCorrect: false },
          { text: 'Avoiding AI entirely to seem more authentic', isCorrect: false },
        ],
        explanation: 'As generic AI-generated outreach becomes more recognizable and common, genuinely specific, well-researched outreach becomes the actual competitive differentiator.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What is the recommended first step when an AI-drafted sales prompt output isn’t quite right?',
        options: [
          { text: 'Abandon AI assistance for that task entirely', isCorrect: false },
          { text: 'Diagnose what’s specifically missing (detail, constraint, example) and refine the prompt', isCorrect: true },
          { text: 'Send it anyway since it’s close enough', isCorrect: false },
          { text: 'Always start completely over with a totally different prompt', isCorrect: false },
        ],
        explanation: 'Refining a prompt by identifying the specific missing ingredient is usually faster and more effective than starting over from scratch.',
        points: 1, difficulty: 'medium',
      },
    ],
  },
};
