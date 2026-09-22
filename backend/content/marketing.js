// Content update data for: Prompt-Based AI for Marketing and Content Strategy
// Matched to production by exact course/module/lesson TITLE — see scripts/updateCourseContent.js
// Do not rename titles here without also updating them in the live DB, or the match will silently skip.

export default {
  courseTitle: 'Prompt-Based AI for Marketing and Content Strategy',
  modules: [
    {
      title: 'Foundations of Prompt-Based AI in Marketing',
      lessons: [
        {
          title: 'Introduction to AI in Marketing',
          duration: 7,
          content: `AI has moved from an experimental add-on to a daily tool for marketing teams. Instead of replacing marketers, generative AI acts as a fast, tireless collaborator: it can draft ten headline options while you're still finishing your coffee, summarize a week of customer feedback in seconds, or turn a rough campaign idea into a structured brief. The shift that matters isn't "AI vs. human" — it's "AI-assisted vs. AI-unaided" marketers, and the gap between them is widening quickly.\n\nIn this course, "prompt-based AI" means using natural-language instructions (prompts) to direct a language model toward a specific marketing output — an email, a social caption, a positioning statement, a competitor summary. The quality of what you get back depends almost entirely on the quality of what you ask for, which is exactly the skill this course builds.\n\nExample: instead of asking an AI tool "write a product description," a marketer who has taken this course would ask: "Write a 60-word product description for a reusable water bottle, targeting eco-conscious millennials, emphasizing durability and a lifetime warranty, in a confident and friendly tone." Same tool, dramatically different output.`,
          keyPoints: [
            'Generative AI is a force-multiplier for marketing output, not a replacement for marketing judgment.',
            'Prompt quality is the single biggest lever on output quality.',
            'The same AI tool can produce beginner-level or expert-level results depending on how it’s instructed.',
            'This course teaches the instruction skill (prompting), not just the tools.'
          ],
          learningObjectives: [
            'Explain how prompt-based AI fits into a modern marketing workflow.',
            'Identify the difference between a vague prompt and a well-specified one.'
          ],
        },
        {
          title: 'Understanding Prompt-Based Marketing Workflows',
          duration: 7,
          content: `A prompt-based marketing workflow has three repeatable stages: brief, generate, and refine. The "brief" stage is where most quality is won or lost — it's where you hand the AI context (audience, goal, tone, constraints) before asking for anything. Skipping this and jumping straight to "write me an ad" is the single most common mistake new users make.\n\nOnce the brief is set, "generate" is the fast part — asking for multiple variations rather than a single answer, since AI output is cheap to produce and comparing options is often more useful than accepting the first draft. "Refine" is where a human marketer edits, fact-checks, and adjusts tone — AI output should almost always be treated as a strong first draft, not a finished asset.\n\nA useful mental model: think of the AI as a very fast junior copywriter who has read everything but knows nothing about your specific brand until you tell it. The workflow's job is to transfer just enough brand and campaign context, every time, so the junior copywriter's drafts need less and less correction.`,
          keyPoints: [
            'Brief → Generate → Refine is the core repeatable workflow.',
            'Most quality problems trace back to a missing or vague brief, not a "bad" AI tool.',
            'Ask for 3–5 variations, not one — selection is often faster than iteration.',
            'AI drafts still need human fact-checking and brand-voice editing before publishing.'
          ],
          learningObjectives: [
            'Describe the brief-generate-refine workflow.',
            'Apply the workflow to a simple marketing task.'
          ],
        },
        {
          title: 'Marketing Tasks Supported by AI',
          duration: 6,
          content: `AI tools are strongest on marketing tasks that are language-heavy, high-volume, or repetitive — and weakest on tasks that require real customer relationships, original strategic bets, or approval authority. Knowing which is which saves you from either over-trusting or under-using the tool.\n\nStrong fits: first-draft copywriting (ads, emails, product descriptions), brainstorming (headline variations, campaign angles, content calendar ideas), summarizing (customer reviews, survey responses, competitor pages), and repurposing (turning one blog post into five social captions).\n\nWeak fits: setting overall brand strategy, making final creative or budget decisions, anything requiring live customer data you haven't provided, and anything where a factual error would be costly — AI can state incorrect statistics or outdated information confidently, so claims involving numbers, laws, or competitor specifics always need a human check before publishing.\n\nA simple filter: if the task is "produce many drafts of something explainable in one sentence," AI is a strong fit. If the task is "decide what we stand for as a brand," it's a support tool at best.`,
          keyPoints: [
            'AI excels at high-volume, language-heavy tasks: drafting, brainstorming, summarizing, repurposing.',
            'AI is weak at strategic judgment calls and anything needing verified, current facts.',
            'Numbers, statistics, and competitor claims generated by AI must always be verified before use.',
            'A simple test: "many drafts of one clear idea" = good fit; "decide our strategy" = human call.'
          ],
          learningObjectives: [
            'Categorize marketing tasks as strong or weak fits for AI assistance.',
            'Recognize when AI output requires mandatory fact-checking.'
          ],
        },
        {
          title: 'Benefits and Limitations of AI in Marketing',
          duration: 7,
          content: `The honest case for AI in marketing rests on three benefits: speed (a first draft in seconds instead of an hour), volume (testing ten headline variants costs nothing extra), and consistency (a well-built prompt applies the same brand guardrails every time, unlike a rushed human draft at 6pm on a Friday).\n\nThe honest limitations matter just as much. AI models can "hallucinate" — state false information with complete confidence, including fake statistics, made-up customer quotes, or incorrect product claims. They have no live knowledge of your business unless you provide it, so anything about your actual pricing, inventory, or this week's promotion has to come from you, not the model's memory. And they have no legal accountability — if AI-generated copy makes a misleading claim, your business owns that risk, not the AI vendor.\n\nThis course's approach: use AI aggressively for drafting and ideation, where speed matters and mistakes are cheap to catch, and keep a human firmly in charge of anything factual, legal, or brand-defining, where mistakes are expensive.`,
          keyPoints: [
            'Real benefits: speed, volume of variations, and consistent application of guidelines.',
            'Real limitation: AI can state false information (hallucination) with total confidence.',
            'AI has no live knowledge of your business unless you supply it in the prompt.',
            'Legal and factual risk from AI-generated claims belongs to your business, not the AI tool.'
          ],
          learningObjectives: [
            'Summarize the core benefits AI brings to marketing work.',
            'Identify hallucination risk and explain why it demands human review.'
          ],
          resources: [
            {
              title: 'Module 1 Cheat Sheet: The Brief-Generate-Refine Prompt Template',
              type: 'download',
              description: 'A copy-paste prompt template that forces you to fill in audience, goal, tone, and constraints before asking the AI for marketing copy.',
              content: `MARKETING BRIEF TEMPLATE (fill in every line before generating):\n\nTask: [what you want produced — e.g., "3 Instagram captions"]\nAudience: [who this is for — age range, interests, awareness level]\nGoal: [what action or feeling this should produce]\nTone: [3 adjectives — e.g., "confident, warm, no jargon"]\nKey facts to include: [product name, offer, deadline, must-mention detail]\nThings to avoid: [claims, words, or comparisons that are off-limits]\nLength/format: [word count, platform, character limit]\nExample of a piece we liked (optional): [paste a past post/ad that hit the right tone]\n\nPROMPT TO USE:\n"Using the brief above, generate [X] distinct options for [task]. Keep every fact accurate to what's listed — do not invent statistics, prices, or claims. Flag anything you're unsure about instead of guessing."`
            }
          ]
        },
      ],
    },
    {
      title: 'Understanding Audience and Marketing Objectives',
      lessons: [
        {
          title: 'Identifying Target Audiences',
          duration: 8,
          content: `AI can't guess who your audience is — it can only work with what you tell it, so defining your audience precisely is the first real prompting skill in this module. A vague audience ("everyone who likes coffee") produces vague, generic copy. A specific audience ("busy working parents who buy coffee to save time, not for flavor exploration") produces copy that sounds like it was written for a real person.\n\nA useful audience description for prompting includes: a demographic anchor (age range, role, or life stage), a motivation (why they'd want this product), and a friction point (what's stopping them from buying today). You don't need a full buyer persona document — two or three sentences of real specificity outperforms a generic label every time.\n\nExample prompt fragment: "Audience: small business owners, 30–50, who know they should be marketing on social media but feel too busy and unsure what to post. They're skeptical of anything that sounds like a big-agency pitch." That one sentence will shape tone, vocabulary, and even which pain points the AI leads with.`,
          keyPoints: [
            'AI has no audience insight of its own — all specificity has to come from you.',
            'A strong audience description includes a demographic anchor, a motivation, and a friction point.',
            'Two or three specific sentences beat a generic label like "everyone" every time.',
            'Audience detail shapes tone and vocabulary, not just topic.'
          ],
          learningObjectives: [
            'Write a specific, prompt-ready audience description.',
            'Explain why vague audience input produces generic output.'
          ],
        },
        {
          title: 'Defining Marketing Objectives',
          duration: 6,
          content: `Every prompt should carry a clear objective, because "write something about our product" and "write something that gets a first-time visitor to sign up for a free trial" produce very different copy, even for the same product. Common marketing objectives include awareness (get noticed), consideration (get compared favorably), conversion (get a sign-up or purchase), and retention (get an existing customer to come back or upgrade).\n\nEach objective changes what "good" copy looks like. Awareness copy can be broad and memorable. Conversion copy needs a specific, low-friction call to action and usually benefits from urgency or a clear next step. Retention copy should reference the relationship that already exists ("since you've been using X for 3 months...") rather than pitching from scratch.\n\nWhen prompting, name the objective explicitly and ask the AI to optimize for it: "The goal is conversion — end with a single, clear call to action, not multiple competing ones." Without that instruction, AI tends to default to generic, awareness-style copy regardless of what you actually need.`,
          keyPoints: [
            'Name your objective (awareness, consideration, conversion, retention) directly in the prompt.',
            'Conversion copy needs one clear call to action, not several competing ones.',
            'Retention copy should reference the existing customer relationship, not start from zero.',
            'Without a stated objective, AI defaults to generic, broad copy.'
          ],
          learningObjectives: [
            'Match a marketing objective to the right copy style.',
            'Write a prompt that explicitly states the desired outcome.'
          ],
        },
        {
          title: 'Writing Effective Marketing Prompts',
          duration: 8,
          content: `A strong marketing prompt combines four elements you've already practiced separately: audience, objective, tone, and constraints. Put together, a well-formed prompt reads less like a search query and more like a creative brief you'd hand a freelancer.\n\nWeak prompt: "Write an email about our sale."\nStrong prompt: "Write a 150-word promotional email announcing our end-of-season sale (30% off, ends Sunday) to existing customers who haven't purchased in 60+ days. Objective: get them back to the site. Tone: friendly, low-pressure, not pushy. Include one clear CTA button label. Don't use the words 'act now' or 'don't miss out' — we've overused them."\n\nNotice the strong version does four things at once: sets the topic and key facts, states the audience and objective, specifies tone, and rules out clichés that would make the brand sound like everyone else. This is the level of specificity to aim for once audience and objective become second nature — by the end of this module, writing prompts like this should take under a minute.`,
          keyPoints: [
            'Strong prompts combine audience + objective + tone + constraints in one instruction.',
            'Treat the prompt like a brief you’d hand a freelancer, not a search query.',
            'Naming what to avoid (clichés, banned phrases) is as useful as naming what to include.',
            'Specificity should become fast and habitual, not a slow checklist every time.'
          ],
          learningObjectives: [
            'Combine audience, objective, tone, and constraints into a single effective prompt.',
            'Compare a weak prompt to a strong one and identify the differences.'
          ],
        },
        {
          title: 'Common Prompting Mistakes in Marketing',
          duration: 6,
          content: `Four mistakes account for most disappointing AI output. First, being too vague ("write something engaging") — "engaging" means nothing to a model without context on what your audience finds engaging. Second, accepting the first draft instead of asking for 3–5 variations and picking or blending the best elements.\n\nThird, forgetting to state what to avoid — AI models default to generic marketing clichés ("unlock your potential," "game-changing") unless explicitly told not to use them. Fourth, not providing real examples — pasting in one or two pieces of copy you actually liked and saying "match this tone" is far more reliable than describing tone in adjectives alone.\n\nA fifth, quieter mistake: forgetting to re-state constraints in follow-up prompts. If you're refining copy across several back-and-forth messages, the model can drift from your original brief — periodically re-pasting the key constraints keeps output on track during longer editing sessions.`,
          keyPoints: [
            'Vague requests ("engaging," "creative") produce vague results — be concrete instead.',
            'Always request multiple variations rather than accepting the first draft.',
            'State what to avoid, not just what to include — AI defaults to marketing clichés otherwise.',
            'Pasting a real example of tone you like outperforms describing tone in adjectives.'
          ],
          learningObjectives: [
            'Identify the four most common marketing prompting mistakes.',
            'Apply a fix for each identified mistake to an example prompt.'
          ],
          resources: [
            {
              title: 'Module 2 Cheat Sheet: Audience & Objective Prompt Builder',
              type: 'download',
              description: 'A fill-in-the-blank prompt builder for turning an audience and objective into a ready-to-use marketing prompt.',
              content: `AUDIENCE + OBJECTIVE PROMPT BUILDER\n\n"Write [format: email/ad/caption/etc.] for [audience: demographic + motivation + friction point].\nObjective: [awareness/consideration/conversion/retention] — optimize specifically for this.\nTone: [3 adjectives].\nMust include: [key facts — offer, price, deadline].\nAvoid: [banned words/clichés/claims].\nGive me 4 distinct variations, then briefly explain which one best fits the stated objective and why."`
            }
          ]
        },
      ],
    },
    {
      title: 'Creating Marketing Content Using AI',
      lessons: [
        {
          title: 'AI for Content Ideation',
          duration: 7,
          content: `Ideation is where AI's volume advantage shows up most clearly. Instead of staring at a blank content calendar, you can generate 20–30 topic angles in the time it used to take to think of three — the skill is in filtering, not generating.\n\nA reliable ideation prompt structure: give the model your topic area, your audience, and a specific angle-generation technique. For example: "Generate 15 blog post topic ideas about [topic] for [audience]. For each, use a different angle: one myth-busting, one how-to, one comparison, one case-study style, one contrarian take." Naming the angle types prevents the AI from producing 15 near-identical variations of the same idea, which is the most common ideation complaint.\n\nOnce you have a list, ask a follow-up prompt to rank or filter: "Which 5 of these would most likely resonate with someone who is price-sensitive and time-poor?" This turns raw idea volume into a shortlist a human can act on quickly, which is the actual point of using AI for ideation — not the ideas themselves, but the speed of getting to a good shortlist.`,
          keyPoints: [
            'AI’s ideation advantage is volume — use it to generate many options, then filter.',
            'Naming distinct angle types (myth-busting, how-to, comparison, etc.) prevents repetitive ideas.',
            'Follow up with a ranking/filtering prompt to turn volume into a usable shortlist.',
            'The goal is a fast shortlist, not accepting AI ideas wholesale.'
          ],
          learningObjectives: [
            'Generate a diverse list of content ideas using angle-based prompting.',
            'Use a follow-up prompt to filter ideas down to a shortlist.'
          ],
        },
        {
          title: 'AI for Copywriting and Messaging',
          duration: 8,
          content: `Copywriting is where the brief-generate-refine workflow earns its keep. Start with the brief elements from Module 2 (audience, objective, tone, constraints), generate 3–5 variations, then refine by combining the strongest line from one draft with the strongest structure from another — AI is good at this kind of remix when you point out specifically what you want combined.\n\nFor messaging (taglines, value propositions, headlines), specificity about what makes the product different matters more than adjectives. "Write a tagline that's punchy" is weak. "Write a tagline that communicates we're the only meal kit service with zero-prep ingredients — no chopping, no measuring" gives the model an actual differentiator to work with, which almost always produces sharper copy than asking for a vague quality like "punchy" or "memorable."\n\nA useful refinement prompt once you have a draft you mostly like: "Keep this structure but make the second sentence punchier and cut any word that isn't doing real work." This targets the edit instead of regenerating from scratch, which tends to preserve what was already working.`,
          keyPoints: [
            'Use brief-generate-refine: generate several drafts, then remix the best parts.',
            'Naming a real product differentiator beats asking for vague qualities like "punchy."',
            'Targeted refinement prompts ("keep the structure, tighten sentence 2") preserve what’s working.',
            'Copywriting output is a strong first draft, always reviewed by a human before it ships.'
          ],
          learningObjectives: [
            'Draft copy variations using a full brief and refine them through targeted edits.',
            'Write a differentiator-based prompt for a tagline or value proposition.'
          ],
        },
        {
          title: 'Social Media Content Generation',
          duration: 7,
          content: `Social content has two extra constraints copy for other channels doesn't: platform-specific format (character limits, hashtag norms, caption length conventions) and repurposing efficiency (one piece of source content often needs to become five or six platform-native posts).\n\nWhen prompting for social content, always state the platform by name rather than asking for "a social post" — a LinkedIn post, an Instagram caption, and a tweet-length post have different length, tone, and structure norms, and naming the platform lets the model apply them correctly. Example: "Turn this blog post into: (1) a 3-sentence LinkedIn post with a professional but conversational tone, (2) an Instagram caption under 150 characters with 3 relevant hashtags, (3) a punchy one-line hook suitable for a short-form video."\n\nFor repurposing specifically, paste the source content into the prompt and ask the model to extract the single strongest idea for each new format, rather than trying to compress the whole piece — a good social post usually carries one idea well, not five ideas poorly.`,
          keyPoints: [
            'Always name the specific platform — format and tone norms differ by platform.',
            'Repurposing works best when you extract one strong idea per new post, not the whole source.',
            'Paste the actual source content into the prompt rather than describing it from memory.',
            'One piece of long-form content can efficiently become several platform-native posts.'
          ],
          learningObjectives: [
            'Write platform-specific prompts for at least three different social formats.',
            'Repurpose a piece of long-form content into short-form social posts.'
          ],
        },
        {
          title: 'Content Planning and Calendars',
          duration: 6,
          content: `AI is well suited to the structural, repetitive parts of calendar planning: mapping topics to dates, ensuring variety across content types, and flagging gaps (e.g., "you have five promotional posts this week and zero educational ones"). It's poorly suited to deciding what actually matters to publish this month — that still requires business judgment about launches, seasonality, and priorities.\n\nA practical planning prompt: "Here are 12 approved content topics for this month [paste list]. Build a 4-week posting calendar across LinkedIn (2x/week) and Instagram (4x/week), balancing promotional, educational, and behind-the-scenes content roughly 20/50/30. Flag any week that's unbalanced." This offloads the tedious arranging work while keeping topic selection — the actually strategic part — in human hands.\n\nA good habit: once the calendar is drafted, ask the AI to audit it for repetition ("Are any two posts making a very similar point? Flag them") — this is a fast, cheap sanity check that catches accidental redundancy before it goes live.`,
          keyPoints: [
            'AI handles the structural/repetitive parts of calendar planning well: arranging, balancing, gap-flagging.',
            'Topic selection and business priorities remain a human decision.',
            'State your content-type ratio (e.g., 20/50/30) explicitly for the AI to balance against.',
            'Use a follow-up audit prompt to catch accidental repetition before publishing.'
          ],
          learningObjectives: [
            'Build a balanced content calendar prompt with a stated content-type ratio.',
            'Use AI to audit a draft calendar for redundancy.'
          ],
          resources: [
            {
              title: 'Module 3 Cheat Sheet: Repurposing & Calendar Prompts',
              type: 'download',
              description: 'Ready-to-use prompts for turning one piece of content into a week of platform-native posts, plus a calendar-balancing prompt.',
              content: `REPURPOSING PROMPT:\n"Here is a [blog post/video transcript/etc.]: [paste content]. Extract the single strongest idea and turn it into: (1) a LinkedIn post (3–5 sentences, professional-conversational), (2) an Instagram caption (under 150 characters + 3 hashtags), (3) a one-line video hook."\n\nCALENDAR PROMPT:\n"Approved topics: [paste list]. Build a [X]-week posting calendar across [platforms + frequency]. Balance content types roughly [X/Y/Z ratio]. Flag any week that’s unbalanced or repetitive versus other weeks."`
            }
          ]
        },
      ],
    },
    {
      title: 'Responsible and Ethical Use of AI in Marketing',
      lessons: [
        {
          title: 'Ensuring Content Accuracy',
          duration: 6,
          content: `AI-generated marketing content can be confidently wrong in ways that are easy to miss because the writing itself sounds polished and authoritative. The most common accuracy failures in marketing specifically are: invented statistics ("studies show 73% of customers prefer..."), outdated pricing or product details, and fabricated customer quotes or reviews.\n\nThe fix isn't to distrust AI broadly — it's to build a specific verification habit: any number, date, price, or claim attributed to a third party ("studies show," "according to...") gets checked against a real source or removed before publishing. A useful prompting habit is to instruct the model directly: "Do not include statistics or studies unless I've provided them in this conversation. If you're unsure of a fact, say so instead of guessing."\n\nTreat this the same way you'd treat a new freelance writer's first drafts — talented, fast, but unfamiliar with your specific facts until you provide them, and not yet trusted to publish without a review pass.`,
          keyPoints: [
            'AI can state false statistics, outdated prices, or fake quotes with total confidence.',
            'Never publish a number, date, or third-party claim from AI without independently verifying it.',
            'Instruct the model explicitly not to invent statistics or sources.',
            'Treat AI drafts like a new freelancer’s work: fast and capable, but requiring a review pass.'
          ],
          learningObjectives: [
            'Identify the most common AI accuracy failures in marketing content.',
            'Apply a verification habit before publishing AI-assisted content.'
          ],
        },
        {
          title: 'Avoiding Bias and Misleading Content',
          duration: 6,
          content: `AI models are trained on large amounts of internet text and can reproduce stereotypes or skewed assumptions present in that data — for example, defaulting to certain genders or ethnicities in example customer personas, or making assumptions about who "typically" uses a product category. This isn't intentional on the model's part, but it's the marketer's responsibility to catch it before it reaches an audience.\n\nMisleading content is a related but distinct risk: AI can produce copy that's technically not false but creates an unfair impression — exaggerated comparisons to competitors, vague superlatives ("the best on the market") without support, or implied claims about results ("customers see results fast") that aren't backed by evidence.\n\nA practical review checklist before publishing: does this content make an assumption about who our customer is that we didn't intend? Does any claim need a source we don't have? Would this copy survive a skeptical reading from a customer or a regulator? If any answer is uncertain, revise before it goes live.`,
          keyPoints: [
            'AI can reproduce stereotypes or skewed assumptions from its training data — review for this actively.',
            'Misleading content can be technically true but still create an unfair impression.',
            'Vague superlatives and unsupported comparisons are a common source of misleading claims.',
            'Before publishing, ask: would this survive a skeptical customer or regulator’s reading?'
          ],
          learningObjectives: [
            'Recognize potential bias in AI-generated personas or examples.',
            'Apply a pre-publish checklist to catch misleading claims.'
          ],
        },
        {
          title: 'Data Privacy and Customer Trust',
          duration: 6,
          content: `A specific, practical risk: pasting real customer data — names, emails, purchase history, support conversations — into a public AI tool can expose that data outside your organization, depending on the tool's data-retention and training policies. Treat any AI tool the way you'd treat a third-party vendor: know what happens to data you paste in before you paste in anything sensitive.\n\nSafe practice for this course's purposes: when you want AI help analyzing or summarizing real customer feedback, anonymize it first — remove names, emails, and identifying details, or use placeholder labels ("Customer A," "Customer B"). The insight ("customers are frustrated with shipping speed") doesn't require the identity attached to it.\n\nThis also protects customer trust on the output side: if customers later learn a "personalized" email was AI-generated using their private purchase history in ways they didn't expect, that can damage trust even if nothing was technically mishandled. Being thoughtful about how personalization is sourced and disclosed matters as much as the mechanics of data handling.`,
          keyPoints: [
            'Know an AI tool’s data-retention policy before pasting in real customer data.',
            'Anonymize customer feedback (remove names/emails) before using it in prompts.',
            'The insight from feedback rarely requires the customer’s identity attached.',
            'How personalization is sourced and disclosed affects customer trust, not just data security.'
          ],
          learningObjectives: [
            'Apply anonymization practices before using customer data in AI prompts.',
            'Explain the trust risk of undisclosed AI-driven personalization.'
          ],
        },
        {
          title: 'Maintaining Brand Voice and Authenticity',
          duration: 7,
          content: `Left unguided, AI-generated copy tends toward a generic, slightly over-enthusiastic "AI voice" — lots of exclamation points, phrases like "unlock," "elevate," and "game-changing," and a sameness that makes different brands' copy start to sound alike. Protecting brand voice takes deliberate prompting, not hope.\n\nThe most effective technique is providing real examples: paste 2–3 pieces of copy that already sound like your brand and instruct the model to match that voice specifically, including sentence rhythm and word choice, not just general tone. "Match this voice" with real examples attached outperforms "be professional but friendly" every time, because the model has something concrete to pattern-match against instead of guessing.\n\nIt's also worth maintaining a short "brand voice don'ts" list — words, phrases, or structures your brand specifically avoids — and including it in prompts for anything customer-facing. Over time, teams that do this consistently end up needing far less editing per draft, because the AI's baseline output has been trained, through repeated good prompting, toward the brand's actual voice.`,
          keyPoints: [
            'Unguided AI output defaults to a generic, over-enthusiastic "AI voice."',
            'Pasting real brand copy examples is the most reliable way to match voice.',
            'Maintain a short "brand voice don’ts" list and include it in customer-facing prompts.',
            'Consistent good prompting reduces editing time on every future draft.'
          ],
          learningObjectives: [
            'Use example-based prompting to match a specific brand voice.',
            'Build a reusable "brand voice don’ts" list for prompting.'
          ],
          resources: [
            {
              title: 'Module 4 Cheat Sheet: Pre-Publish Responsible-AI Checklist',
              type: 'download',
              description: 'A short checklist to run any AI-generated marketing content through before it goes live.',
              content: `PRE-PUBLISH CHECKLIST\n\n☐ Every statistic, price, and third-party claim has been independently verified or removed.\n☐ No assumptions about customer identity/demographics that we didn’t intend.\n☐ No vague superlatives or comparisons we can’t support ("the best," "#1").\n☐ No real customer data (names, emails) was pasted into the AI tool unanonymized.\n☐ The copy matches our brand voice examples, not generic "AI voice."\n☐ A human has read the final version end-to-end before publishing.`
            }
          ]
        },
      ],
    },
    {
      title: 'Applying AI in Marketing Strategy',
      lessons: [
        {
          title: 'Using AI for Campaign Planning',
          duration: 7,
          content: `Campaign planning benefits from AI in the same way calendar planning does: it's strong on structure and coverage, weak on strategic bets. A useful application is using AI to stress-test a campaign brief before execution — asking it to list what's missing, what's ambiguous, or what could be misread.\n\nExample prompt: "Here's our campaign brief: [paste brief]. Acting as a skeptical creative director, list 5 questions this brief doesn't answer that a copywriter or designer would need clarified before starting work." This catches planning gaps (unclear audience, missing success metric, undefined tone) before they cause wasted creative work downstream.\n\nAI can also help draft the supporting scaffolding of a campaign quickly — messaging pillars, a one-page campaign summary for stakeholders, or a FAQ anticipating internal questions — freeing up planning time for the parts that actually require strategic judgment: budget allocation, channel prioritization, and timing decisions tied to business context the AI doesn't have.`,
          keyPoints: [
            'Use AI to stress-test a campaign brief for gaps before execution begins.',
            'A "skeptical creative director" prompt persona is effective for finding brief weaknesses.',
            'AI can quickly draft supporting materials: messaging pillars, summaries, internal FAQs.',
            'Budget, channel, and timing decisions remain strategic calls for the human planner.'
          ],
          learningObjectives: [
            'Use AI to identify gaps in a campaign brief.',
            'Delegate supporting campaign documentation to AI while retaining strategic decisions.'
          ],
        },
        {
          title: 'Measuring Marketing Performance',
          duration: 7,
          content: `AI is useful for the analysis-summary layer of performance measurement, not for generating the underlying numbers — it should never be asked to guess metrics it wasn't given. The right pattern is: pull real numbers from your analytics/ad platform, paste them in, and ask AI to summarize, spot patterns, or draft a stakeholder-friendly explanation.\n\nExample: "Here's last month's campaign performance data: [paste numbers]. Summarize the three most important takeaways in plain language for a non-marketing executive, and flag anything that looks like an outlier worth investigating." This turns a spreadsheet a marketer understands into a narrative a broader team can act on, quickly.\n\nA safeguard worth stating explicitly in the prompt: "Only reference numbers I've provided — do not estimate or infer additional statistics." Without this instruction, models can sometimes fill gaps with plausible-sounding but invented figures, which is especially dangerous in a performance-reporting context where the numbers are meant to inform real decisions.`,
          keyPoints: [
            'Only give AI real performance data to summarize — never ask it to estimate metrics.',
            'AI is strong at turning data into a plain-language narrative for stakeholders.',
            'Explicitly instruct the model not to infer or invent additional statistics.',
            'Use AI to flag outliers worth human investigation, not to make the final call on them.'
          ],
          learningObjectives: [
            'Use AI to summarize real performance data for a non-technical audience.',
            'Apply a safeguard prompt against invented statistics in reporting contexts.'
          ],
        },
        {
          title: 'Integrating AI into Marketing Workflows',
          duration: 6,
          content: `The teams that get the most value from AI don't treat it as an occasional novelty — they build it into specific, recurring steps of their existing workflow. Rather than "we use AI sometimes," the goal is "AI drafts the first version of every weekly newsletter" or "AI generates the first-pass social captions every Monday, then a human edits."\n\nA practical way to start: pick one recurring task that currently takes 30+ minutes and is fairly formulaic (a weekly recap email, a monthly report summary, first-draft ad variations for every new product). Build a reusable prompt template for that specific task, test it for a few cycles, and refine the template based on what needed editing each time.\n\nOver a few months, this produces a small library of tested, reliable prompt templates for your team's most common tasks — which is a far more durable source of value than one-off clever prompts, because it compounds: every team member benefits from templates refined by everyone's usage.`,
          keyPoints: [
            'Value compounds when AI is built into specific recurring workflow steps, not used ad hoc.',
            'Start with one formulaic, time-consuming recurring task and build a reusable template for it.',
            'Refine templates over several cycles based on what needed manual editing.',
            'A shared library of tested templates benefits the whole team, not just one person.'
          ],
          learningObjectives: [
            'Identify a recurring marketing task suitable for a reusable AI prompt template.',
            'Explain why a template library compounds in value over ad hoc prompting.'
          ],
        },
        {
          title: 'Future Trends in AI Marketing',
          duration: 6,
          content: `Three trends are worth tracking, though this course focuses on skills that stay useful regardless of which specific tools win: deeper personalization (AI tailoring messaging per-segment or even per-individual at a scale that was previously too expensive), tighter integration into existing marketing platforms (AI features built directly into email, ad, and CRM tools rather than requiring a separate step), and rising AI-generated content volume across the internet, which will likely make genuinely distinctive, well-researched, human-verified content more valuable, not less, simply because there will be more generic AI content to stand out from.\n\nThe durable skill underneath all of these trends is the same one this course teaches: knowing how to direct AI precisely, verify its output, and keep a human accountable for judgment calls. Specific tools and interfaces will keep changing; the discipline of clear briefing, critical review, and responsible use transfers to whatever comes next.\n\nA practical takeaway: don't over-invest in mastering any one tool's quirks. Invest in the underlying skill — structured prompting, verification habits, and workflow integration — which is portable across tools and will keep paying off as the landscape shifts.`,
          keyPoints: [
            'Watch for deeper personalization, tighter platform integration, and rising AI content volume online.',
            'More generic AI content online likely raises the value of distinctive, verified human-reviewed content.',
            'The durable skill is directing and verifying AI, not mastering any single tool’s interface.',
            'Invest in transferable skills (briefing, verification, workflow integration) over tool-specific tricks.'
          ],
          learningObjectives: [
            'Identify major trends shaping AI’s role in marketing.',
            'Explain why prompting and verification skills remain valuable as tools change.'
          ],
        },
      ],
    },
    {
      title: 'Advanced Prompt Strategies for Research and Competitive Intelligence',
      lessons: [
        {
          title: 'Structuring Prompts for Complex Research Tasks',
          duration: 8,
          content: `Complex marketing research tasks — understanding a new market segment, synthesizing customer feedback across sources, mapping a competitive landscape — overwhelm a single vague prompt. The fix is decomposition: break one big ask into a short sequence of smaller, connected prompts, each building on the last.\n\nExample decomposition for "understand our competitor's positioning": Step 1, "Summarize what this competitor's homepage claims are their key differentiators: [paste text]." Step 2, "Based on that summary, what customer pain points is this positioning designed to address?" Step 3, "How does that compare to our own positioning: [paste your positioning]? Where do we overlap, and where do we differ?" Each step is easy for the model to do well; the full task, asked all at once, tends to produce a shallow, generic answer.\n\nA structuring habit worth building: before writing the first prompt, sketch the 3–4 sub-questions that together answer the real question. This planning step, done by the human, is what actually makes AI-assisted research rigorous rather than superficial.`,
          keyPoints: [
            'Break complex research asks into a short sequence of smaller, connected prompts.',
            'Each step should build on the previous step’s output.',
            'One large vague research prompt tends to produce a shallow, generic answer.',
            'Sketch the 3–4 sub-questions before prompting — this planning is the human’s job.'
          ],
          learningObjectives: [
            'Decompose a complex research question into a sequence of prompts.',
            'Apply multi-step prompting to a competitive research task.'
          ],
        },
        {
          title: 'Using AI for Comparative Analysis',
          duration: 7,
          content: `Comparative analysis — "how do we stack up against competitor X, Y, Z" — works best when you give the AI a consistent structure to compare against, rather than asking an open-ended "compare these companies" question, which tends to produce a shallow, uneven summary.\n\nA reliable format: define 4–6 comparison dimensions upfront (e.g., pricing model, target audience, core feature set, brand tone, customer complaints found in reviews), then ask the model to fill in that structure for each competitor using content you provide (their website copy, review excerpts, pricing pages). "Compare these 3 competitors across: pricing model, target audience, and top 3 customer complaints from these reviews: [paste reviews]" produces a genuinely useful side-by-side, because the structure forces even coverage instead of the model picking whatever's easiest to discuss.\n\nAlways paste real source material rather than asking the AI to describe competitors "from what it knows" — AI training data can be outdated or simply wrong about specific companies, especially smaller or newer ones, so real, current source text is essential for accuracy.`,
          keyPoints: [
            'Define fixed comparison dimensions upfront rather than asking an open-ended comparison.',
            'A consistent structure forces even coverage across all competitors being compared.',
            'Paste real, current source material — don’t rely on the model’s memory of competitors.',
            'Model knowledge about specific companies can be outdated or inaccurate, especially for smaller brands.'
          ],
          learningObjectives: [
            'Design a structured comparison framework for competitive analysis.',
            'Use real source material in prompts rather than relying on model memory.'
          ],
        },
        {
          title: 'Generating Strategic Insights from AI Research',
          duration: 7,
          content: `Raw research output — summaries, comparisons, data — isn't yet a strategic insight. The gap between "here's what we found" and "here's what we should do" is where a lot of AI-assisted research stalls, because that gap requires business judgment the AI doesn't have. But AI can help bridge it if you ask the right follow-up question.\n\nA useful pattern: after gathering research, prompt specifically for implications rather than more summary: "Based on this competitive research, what are 3 strategic implications for our positioning? For each, note the confidence level (high/medium/low) and what additional information would strengthen it." Asking for confidence levels is important — it keeps the model from presenting speculative implications with the same authority as well-supported ones.\n\nTreat AI-generated implications as hypotheses to test or discuss, not conclusions to act on directly. The most useful output of this kind of prompting is often a sharper set of questions for your next team discussion, not a final answer — which is a legitimate and valuable outcome, not a failure of the exercise.`,
          keyPoints: [
            'Raw research summaries aren’t strategic insights — explicitly prompt for implications.',
            'Ask the model to state a confidence level for each implication it offers.',
            'Treat AI-generated implications as hypotheses to discuss, not conclusions to act on directly.',
            'A sharper set of questions for a team discussion is a legitimate, valuable outcome.'
          ],
          learningObjectives: [
            'Prompt for strategic implications with stated confidence levels.',
            'Distinguish between AI-generated hypotheses and validated conclusions.'
          ],
        },
        {
          title: 'Continuous Improvement of Prompt Techniques',
          duration: 6,
          content: `Prompting is a skill that improves with a specific habit: keeping a running record of prompts that worked well, and why. Most people who plateau at "okay" prompting results never build this habit — they solve each problem fresh instead of building on what already worked.\n\nA simple system: whenever a prompt produces an unusually good result, save it in a shared document with a one-line note on what made it work (e.g., "naming the specific platform mattered," "asking for confidence levels stopped overconfident claims"). Over a few months, this becomes a genuinely useful internal playbook, tailored to your team's actual work, rather than generic advice from an online article.\n\nThe other half of continuous improvement is noticing failure patterns: if a certain type of prompt reliably produces output you have to heavily rewrite, that's a signal to add a constraint, an example, or a structuring step next time — the fixes covered throughout this course. Treat every disappointing output as a diagnosable problem with a specific missing ingredient, not as a reason to distrust the tool generally.`,
          keyPoints: [
            'Keep a running record of prompts that worked well, with a note on why.',
            'A team playbook of proven prompts compounds in value over time.',
            'Notice failure patterns and diagnose the missing ingredient (constraint, example, structure).',
            'Treat disappointing output as a specific, fixable problem, not a reason to distrust AI broadly.'
          ],
          learningObjectives: [
            'Build a personal or team system for saving effective prompts.',
            'Diagnose a disappointing AI output for its likely missing ingredient.'
          ],
          resources: [
            {
              title: 'Module 6 Cheat Sheet: Research Decomposition & Comparison Template',
              type: 'download',
              description: 'A step-by-step template for breaking down a research question and running a structured competitive comparison.',
              content: `RESEARCH DECOMPOSITION TEMPLATE\nReal question: [your actual research goal]\nSub-question 1: [ ]\nSub-question 2: [ ]\nSub-question 3: [ ]\nPrompt each sub-question separately, feeding each answer into the next.\n\nCOMPARISON TEMPLATE\n"Compare [competitors] across these dimensions: [list 4–6 dimensions]. Use only the source material provided here: [paste real content]. For each dimension, note what’s actually stated in the source vs. what’s unclear."\n\nINSIGHT TEMPLATE\n"Based on the research above, list 3 strategic implications. For each: state a confidence level (high/medium/low) and what evidence would raise that confidence."`
            }
          ]
        },
      ],
    },
  ],
  quiz: {
    title: 'Prompt-Based AI for Marketing and Content Strategy — Final Assessment',
    description: 'A 10-question assessment covering prompt structure, marketing workflows, and responsible AI use in marketing.',
    passingScore: 70,
    questions: [
      {
        type: 'multiple-choice',
        question: 'What is the single biggest lever on the quality of AI-generated marketing copy?',
        options: [
          { text: 'Which AI tool or vendor you use', isCorrect: false },
          { text: 'The quality and specificity of the prompt', isCorrect: true },
          { text: 'How long the prompt is', isCorrect: false },
          { text: 'The time of day the prompt is submitted', isCorrect: false },
        ],
        explanation: 'Prompt quality — specificity about audience, objective, tone, and constraints — is the primary driver of output quality, more than the specific tool used.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'What are the three stages of the core prompt-based marketing workflow taught in this course?',
        options: [
          { text: 'Research, Draft, Publish', isCorrect: false },
          { text: 'Brief, Generate, Refine', isCorrect: true },
          { text: 'Plan, Execute, Report', isCorrect: false },
          { text: 'Ideate, Test, Launch', isCorrect: false },
        ],
        explanation: 'Brief-Generate-Refine is the repeatable workflow: provide context first, generate multiple options, then have a human refine the output.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'true-false',
        question: 'It is safe to publish a statistic generated by AI without independently verifying it, as long as the writing sounds confident.',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true },
        ],
        correctAnswer: 'False',
        explanation: 'AI can "hallucinate" — state false statistics or facts with complete confidence. Any number or third-party claim must be independently verified before publishing.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'Which marketing objective should typically end with ONE clear, low-friction call to action?',
        options: [
          { text: 'Awareness', isCorrect: false },
          { text: 'Conversion', isCorrect: true },
          { text: 'Retention', isCorrect: false },
          { text: 'Brand storytelling', isCorrect: false },
        ],
        explanation: 'Conversion-focused copy needs a single, clear call to action rather than multiple competing options, which reduces friction toward the desired action.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What is the most reliable way to get AI-generated copy to match your specific brand voice?',
        options: [
          { text: 'Ask the AI to "be professional but friendly"', isCorrect: false },
          { text: 'Use longer prompts with more adjectives', isCorrect: false },
          { text: 'Paste real examples of copy that already sound like your brand', isCorrect: true },
          { text: 'Avoid giving the AI any tone instructions', isCorrect: false },
        ],
        explanation: 'Providing real examples gives the model something concrete to pattern-match against, which is far more reliable than describing tone with adjectives alone.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'true-false',
        question: 'Before pasting real customer data (names, emails, purchase history) into an AI tool, you should understand that tool’s data-retention policy or anonymize the data first.',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false },
        ],
        correctAnswer: 'True',
        explanation: 'Pasting real customer data into a public AI tool can expose it outside your organization depending on the tool’s data policies — anonymize first or confirm the policy.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'When asking AI to summarize marketing performance data, what instruction reduces the risk of invented statistics?',
        options: [
          { text: '"Make the summary sound impressive"', isCorrect: false },
          { text: '"Only reference numbers I’ve provided — do not estimate or infer additional statistics"', isCorrect: true },
          { text: '"Use as many numbers as possible"', isCorrect: false },
          { text: '"Compare our numbers to industry averages"', isCorrect: false },
        ],
        explanation: 'Explicitly restricting the model to provided data prevents it from filling gaps with plausible-sounding but invented figures.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'Why should complex research tasks be broken into a sequence of smaller prompts instead of one large prompt?',
        options: [
          { text: 'It uses fewer characters overall', isCorrect: false },
          { text: 'A single large, vague prompt tends to produce a shallow, generic answer', isCorrect: true },
          { text: 'AI tools cannot process more than one question at a time', isCorrect: false },
          { text: 'It is required by most AI platforms’ terms of service', isCorrect: false },
        ],
        explanation: 'Decomposing a complex research question into connected sub-prompts produces more rigorous, specific answers than one broad, all-at-once request.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'When using AI to generate strategic implications from research, what should you always ask the model to include?',
        options: [
          { text: 'A joke to lighten the tone', isCorrect: false },
          { text: 'A confidence level for each implication', isCorrect: true },
          { text: 'A guarantee that the implication is correct', isCorrect: false },
          { text: 'A comparison to unrelated industries', isCorrect: false },
        ],
        explanation: 'Asking for a confidence level (high/medium/low) prevents speculative implications from being presented with unwarranted authority.',
        points: 1, difficulty: 'hard',
      },
      {
        type: 'multiple-choice',
        question: 'What is the recommended way to build long-term value from AI in a marketing team’s workflow?',
        options: [
          { text: 'Use AI only occasionally, for special projects', isCorrect: false },
          { text: 'Rely on one person’s memorized clever prompts', isCorrect: false },
          { text: 'Build a shared library of tested, reusable prompt templates for recurring tasks', isCorrect: true },
          { text: 'Avoid documenting what works, to keep flexibility', isCorrect: false },
        ],
        explanation: 'A shared, refined library of prompt templates for recurring tasks compounds in value across the whole team, unlike one-off or undocumented prompting.',
        points: 1, difficulty: 'easy',
      },
    ],
  },
};
