// Content update data for: Prompt-Based AI for Personal Productivity and Knowledge Work
// Matched to production by exact course/module/lesson TITLE — see scripts/updateCourseContent.js
// NOTE: every course already has a course.quizId set in production, so
// updateCourseContent.js will skip quiz creation for all 6 (it never creates or
// overwrites a quiz). The `quiz` block below — and the equivalent block in every
// other content file — is instead applied by scripts/upgradeQuizzes.js, which
// replaces an existing quiz's questions/title/passingScore IN PLACE (same quiz
// _id, same course link) rather than creating a new quiz document.

export default {
  courseTitle: 'Prompt-Based AI for Personal Productivity and Knowledge Work',
  modules: [
    {
      title: 'Introduction to Prompt-Based AI for Productivity',
      lessons: [
        {
          title: 'Understanding AI in Knowledge Work',
          duration: 7,
          content: `Knowledge work — research, analysis, writing, planning, decision support — is largely language-based, which is exactly why prompt-based AI has such an outsized impact on it compared to more physical or hands-on work. Tasks that used to require sitting down and grinding through a first draft, a summary, or an outline can now start from a solid AI-generated first pass in seconds.\n\nThis doesn't mean knowledge work becomes less valuable — it means the valuable part shifts. Anyone can now get a competent first draft; the differentiator becomes judgment: knowing what's actually worth writing, which summary correctly captures what matters, and which AI-generated idea is genuinely good versus plausible-sounding but shallow. That judgment is still entirely human, and this course is built around sharpening the prompting skill that feeds it well.\n\nExample: instead of manually reading and summarizing a 20-page report before a meeting, you can prompt: "Summarize this report's 3 most important points for someone who needs to make a decision in the next hour: [paste report]." Same underlying skill (reading comprehension, prioritization) that used to take you 30 minutes, compressed to a 2-minute review of a solid draft.`,
          keyPoints: [
            'Knowledge work is largely language-based, which is why AI has outsized impact here.',
            'AI produces competent first drafts quickly; human judgment about quality and relevance remains the differentiator.',
            'The valuable skill shifts from producing a first draft to evaluating and directing one well.',
            'This course builds the prompting skill that feeds good judgment, not a replacement for it.'
          ],
          learningObjectives: [
            'Explain why knowledge work is particularly well-suited to AI assistance.',
            'Describe how the valuable skill in knowledge work shifts with AI assistance available.'
          ],
        },
        {
          title: 'What is Prompt-Based Interaction',
          duration: 6,
          content: `Prompt-based interaction means directing an AI tool through natural-language instructions rather than clicking through a fixed set of menus or features — you describe what you want, in as much or as little detail as the task requires, and the tool responds accordingly.\n\nThe skill isn't learning special commands or syntax — it's learning to communicate what you actually want clearly enough that the AI doesn't have to guess. Two people can use the exact same AI tool and get dramatically different results because one communicates vague requests ("make this better") and the other communicates specific ones ("shorten this to 3 sentences, keep the key statistic, make the tone more confident").\n\nA useful early habit: whenever you're about to type a vague request, pause and ask yourself what "good" would actually look like for this specific task — length, tone, what to keep, what to cut. Converting that mental picture into words is most of what prompt-based interaction actually is.`,
          keyPoints: [
            'Prompt-based interaction is natural-language direction, not special commands or fixed menus.',
            'The skill is communicating what you want clearly enough that the AI doesn’t have to guess.',
            'The same tool can produce very different results depending on request specificity.',
            'Before prompting, picture what "good" looks like for this task, then put that picture into words.'
          ],
          learningObjectives: [
            'Explain what distinguishes prompt-based interaction from traditional software interaction.',
            'Apply a "what does good look like" check before writing a prompt.'
          ],
        },
        {
          title: 'Applications of AI in Personal Productivity',
          duration: 6,
          content: `AI supports personal productivity across several recurring task types: drafting (emails, notes, first-draft documents), summarizing (long articles, meeting transcripts, reports), organizing (turning scattered notes into structured outlines), and planning support (breaking a vague goal into concrete steps).\n\nThe common thread across all of these: they're tasks where getting from a blank page or a messy starting point to a usable structure is the hard, slow part, and AI compresses that specific step significantly. The remaining work — deciding if the structure is right, adding your actual expertise and judgment, finalizing details — stays with you.\n\nA useful way to think about where to apply this in your own work: notice which recurring tasks make you procrastinate because of the blank-page problem (a report you need to start, an email you're dreading writing) — those are usually the best candidates for AI-assisted first drafts, since getting past the blank page is often the actual bottleneck, not the thinking itself.`,
          keyPoints: [
            'Core applications: drafting, summarizing, organizing, and planning support.',
            'AI compresses the "blank page to usable structure" step, which is often the slowest part of a task.',
            'Final judgment, accuracy, and expertise application remain the human’s responsibility.',
            'Tasks causing blank-page procrastination are often the best candidates for AI-assisted starts.'
          ],
          learningObjectives: [
            'Identify personal productivity tasks well-suited to AI assistance.',
            'Recognize the blank-page problem as a signal for where AI assistance helps most.'
          ],
          resources: [
            {
              title: 'Module 1 Cheat Sheet: Blank-Page Task Finder',
              type: 'download',
              description: 'A short exercise to identify which of your recurring tasks are the best early candidates for AI-assisted drafting.',
              content: `BLANK-PAGE TASK FINDER\n\nList 3 recurring tasks you tend to procrastinate on:\n1. ____________________\n2. ____________________\n3. ____________________\n\nFor each, ask: is the hard part getting started (blank page), or is it deciding what's actually right (judgment)? Tasks where the hard part is getting started are strong candidates for an AI-assisted first draft — try prompting for a first pass next time before starting from scratch.`
            }
          ]
        },
      ],
    },
    {
      title: 'Writing Effective Prompts for Work Tasks',
      lessons: [
        {
          title: 'Structure of an Effective Prompt',
          duration: 7,
          content: `An effective work prompt has three core parts: the task (what you want produced), the input (the actual material to work from — paste it, don't describe it from memory), and the constraints (format, length, tone, what to keep or avoid). Missing any one of these tends to produce a usable-but-generic result that needs more editing than necessary.\n\nWeak prompt: "Summarize this." Strong prompt: "Summarize this meeting transcript [paste it] into 5 bullet points covering decisions made and action items with owners. Skip small talk and tangents." The strong version tells the AI exactly what shape the output should take, which matters enormously for how much editing you'll need to do afterward.\n\nAs this becomes habitual, you'll find yourself specifying task, input, and constraints almost automatically — at that point, prompting stops feeling like a separate skill you have to think about and becomes just how you communicate requests, the same way clear writing becomes automatic with practice.`,
          keyPoints: [
            'Three core parts of an effective prompt: task, input material, and constraints.',
            'Paste real input material rather than describing it from memory.',
            'Missing any of the three parts tends to produce generic results needing more editing.',
            'With practice, specifying all three becomes automatic rather than a deliberate extra step.'
          ],
          learningObjectives: [
            'Identify the three core components of an effective work prompt.',
            'Convert a vague prompt into one with clear task, input, and constraints.'
          ],
        },
        {
          title: 'Prompting for Information Retrieval',
          duration: 6,
          content: `Retrieval prompts extract specific information from material you already have — a document, an email thread, your own notes — rather than asking the AI to recall facts from its general training, which (as covered in other courses in this series) can be outdated or simply wrong for anything specific to your situation.\n\nA useful prompt: "From this document [paste it], find and list every deadline mentioned, along with what each deadline is for." This turns a dense document into a scannable list of exactly what you need, much faster than manually re-reading for that specific detail.\n\nFor retrieval across multiple documents, the same guidance from the research-focused course in this series applies: process documents separately rather than combining many into one prompt, to avoid the AI mixing up which detail came from which source — a small extra step that meaningfully improves accuracy when you're pulling specific facts you'll actually rely on.`,
          keyPoints: [
            'Retrieval prompts extract specific information from real material you provide, not from AI memory.',
            'A well-scoped retrieval prompt turns a dense document into a fast, scannable list of exactly what you need.',
            'Process multiple source documents separately to avoid the AI mixing up which detail came from where.',
            'This mirrors the "gather first" discipline used throughout this course series for reliable results.'
          ],
          learningObjectives: [
            'Write a retrieval prompt that extracts specific information from a real document.',
            'Apply single-source processing for multi-document retrieval tasks to improve accuracy.'
          ],
        },
        {
          title: 'Prompting for Writing Assistance',
          duration: 6,
          content: `Writing assistance covers a spectrum from a first full draft to targeted editing of something you've already written — and the right prompt differs depending on where you are on that spectrum. For a first draft: "Draft an email to [audience] explaining [topic], in [tone], under [length]." For editing: "Here's my draft: [paste it]. Tighten the second paragraph and make the closing line more direct — don't change anything else."\n\nThat second example matters: targeted editing prompts ("don't change anything else") preserve your own voice and the parts that were already working, rather than regenerating the whole piece and losing what you'd gotten right. This is a subtle but important distinction from asking for a full rewrite every time you want an improvement.\n\nA useful habit for anything you'll send under your own name: after getting an AI-assisted draft, do a final read-through and adjust at least a few phrases into language that sounds like you specifically — this keeps your communication feeling authentic rather than uniformly AI-polished in a way that colleagues might start to notice over time.`,
          keyPoints: [
            'Writing assistance ranges from full first drafts to targeted editing — use different prompts for each.',
            'Targeted editing prompts ("don’t change anything else") preserve your voice and what’s already working.',
            'Avoid requesting a full rewrite every time — it discards parts that were already good.',
            'Adjust AI-assisted drafts with a few phrases in your own voice before sending under your name.'
          ],
          learningObjectives: [
            'Write both first-draft and targeted-editing prompts appropriately.',
            'Apply a final personal-voice pass to AI-assisted writing before sending.'
          ],
        },
        {
          title: 'Avoiding Common Prompting Mistakes',
          duration: 6,
          content: `Three mistakes show up repeatedly for knowledge workers new to prompting. First, being too vague ("make this good") — the AI has no way to know what "good" means for your specific context without you specifying it. Second, not providing real source material and instead describing it from memory, which introduces your own memory errors or omissions into the process, or invites the AI to fill gaps with plausible-sounding invention.\n\nThird, accepting the first draft without iterating — the first AI response is a starting point, and a quick follow-up ("make the tone warmer" or "cut this by half") often gets you much closer to what you actually need than trying to write the perfect prompt on the first attempt. Treating prompting as a quick back-and-forth conversation, rather than a one-shot request that must be perfect, is usually faster overall.\n\nA fourth, quieter mistake: forgetting to fact-check anything the AI states as fact rather than restates from your provided material — the distinction matters, and this course's later module on accuracy covers it in more depth.`,
          keyPoints: [
            'Vague requests ("make this good") don’t give the AI enough information to know what you actually want.',
            'Always provide real source material rather than describing it from memory.',
            'Iterate with quick follow-ups rather than trying to perfect a single one-shot prompt.',
            'Fact-check anything the AI states as new fact, distinct from what it restates from your provided material.'
          ],
          learningObjectives: [
            'Identify the most common prompting mistakes made by knowledge workers.',
            'Apply an iterative follow-up approach instead of over-engineering a single prompt.'
          ],
          resources: [
            {
              title: 'Module 2 Cheat Sheet: Retrieval & Editing Prompt Templates',
              type: 'download',
              description: 'Ready-to-use templates for extracting information and editing existing drafts without losing your voice.',
              content: `RETRIEVAL PROMPT\n"From this document: [paste it]. Find and list [specific info needed — deadlines, decisions, names, etc.]."\n\nTARGETED EDITING PROMPT\n"Here's my draft: [paste it]. [Specific change needed, e.g., 'tighten paragraph 2, make the closing line more direct']. Don't change anything else."\n\nITERATION HABIT\nFirst response not quite right? Don't restart — follow up: "Make the tone warmer" / "Cut this by half" / "Add a specific example."`
            }
          ]
        },
      ],
    },
    {
      title: 'Using AI for Research and Knowledge Management',
      lessons: [
        {
          title: 'AI-Assisted Research',
          duration: 7,
          content: `Personal research — understanding a new topic before a meeting, catching up on background before a project — benefits from the same gather-first discipline as the dedicated research course in this series, scaled down to individual, everyday use: provide real source material, ask structured questions, and verify anything stated as fact.\n\nA useful everyday prompt: "I'm meeting with [role/team] about [topic] tomorrow and need to get up to speed. Here's what I have: [paste any background material, emails, or notes]. What are the 3-4 things I most need to understand before this meeting?" This is a fast way to convert scattered background material into a focused prep list, much faster than reading everything cover to cover.\n\nFor topics where you have no source material yet and need general background, treat AI's response as a starting orientation to verify, not a final answer — the same "AI training data can be outdated or wrong" caution from this course series applies just as much to personal research as to any other use case, even when the stakes feel lower for a routine work task.`,
          keyPoints: [
            'Personal research benefits from the same gather-first, verify-facts discipline as formal research.',
            'A focused "what do I need to know before this meeting" prompt converts background material into prep fast.',
            'Without provided source material, treat AI’s general knowledge as a starting orientation to verify.',
            'The outdated-training-data caution applies to everyday personal research, not just formal projects.'
          ],
          learningObjectives: [
            'Use AI to convert scattered background material into a focused meeting-prep summary.',
            'Apply verification discipline to AI-assisted research even for routine, everyday tasks.'
          ],
        },
        {
          title: 'Organizing Knowledge with AI',
          duration: 6,
          content: `Many knowledge workers accumulate scattered notes, saved articles, and half-formed ideas that never get organized into anything usable — a classic case where the organizing step, not the original thinking, is the actual bottleneck. AI can help impose structure on this kind of scattered material quickly.\n\nA useful prompt: "Here are my raw notes from the last month on [topic]: [paste them]. Organize this into logical categories, keeping all the original content — just group it sensibly and give each group a clear heading." This preserves everything you've captured while making it navigable, rather than requiring you to manually sort through weeks of scattered notes.\n\nFor an ongoing knowledge base (notes on a long-running project, a research area you track regularly), periodically running this organizing prompt on newly accumulated notes keeps the whole collection usable over time, rather than letting it become an unsearchable pile that's easier to ignore than to sort through.`,
          keyPoints: [
            'The organizing step, not the original thinking, is often the actual bottleneck for scattered notes.',
            'A good organizing prompt preserves all original content while imposing a navigable structure.',
            'Periodically re-running an organizing pass keeps an ongoing knowledge base usable over time.',
            'This is the same organizing technique from the research course, applied to personal notes.'
          ],
          learningObjectives: [
            'Organize scattered personal notes into a structured, navigable format.',
            'Apply periodic re-organization to maintain a usable ongoing knowledge base.'
          ],
        },
        {
          title: 'Generating Insights from Information',
          duration: 6,
          content: `Once information is organized, moving from "here's what I have" to "here's what it means for what I should do" is where real value gets created — and it's a step AI can support once given organized material and a specific decision or question to help think through.\n\nA useful prompt: "Based on these organized notes [paste them], what are 2-3 things I should probably do next, and why?" This is more useful than a general "what do you think" prompt because it's anchored to action — the point of most personal knowledge work is eventually doing something with what you've learned, not just accumulating organized information for its own sake.\n\nAs with the research course's guidance on strategic insights, treat AI-generated "what to do next" suggestions as options to weigh with your own judgment and context, not instructions to follow automatically — the AI doesn't know your full situation, priorities, or constraints unless you've included them in what you provided.`,
          keyPoints: [
            'Moving from organized information to actionable insight is where real personal-productivity value is created.',
            'Anchor insight-generation prompts to a specific decision or "what should I do next" question.',
            'The point of most knowledge work is eventually doing something with what’s been learned.',
            'Treat AI-suggested next steps as options to weigh with your own judgment, not automatic instructions.'
          ],
          learningObjectives: [
            'Generate actionable next-step suggestions from organized personal notes.',
            'Apply independent judgment to AI-suggested next steps rather than following them automatically.'
          ],
          resources: [
            {
              title: 'Module 3 Cheat Sheet: Research Prep & Note Organization Prompts',
              type: 'download',
              description: 'Prompts for fast meeting prep and turning scattered notes into an organized, actionable knowledge base.',
              content: `MEETING PREP PROMPT\n"Meeting with [role/team] about [topic] tomorrow. Background: [paste notes/emails]. What are the 3–4 things I most need to understand before this meeting?"\n\nNOTE ORGANIZATION PROMPT\n"Raw notes from the last month on [topic]: [paste them]. Organize into logical categories, keeping all original content — group sensibly with clear headings."\n\nNEXT-STEPS PROMPT\n"Based on these organized notes: [paste them]. What are 2–3 things I should probably do next, and why?"`
            }
          ]
        },
      ],
    },
    {
      title: 'AI for Task Management and Planning',
      lessons: [
        {
          title: 'AI for Task Planning',
          duration: 6,
          content: `Breaking a vague goal into concrete, actionable tasks is a common productivity bottleneck — it's easy to know you want to "improve the onboarding process" and much harder to know what the actual first three tasks should be. AI can help bridge that gap quickly once given real context about the goal and constraints.\n\nA useful prompt: "My goal: [paste goal]. Context: [relevant constraints — deadline, resources, what's already been tried]. Break this into a concrete task list, with the first 3 tasks I should start with clearly identified." Asking specifically for the first 3 tasks, not just a full list, helps overcome the paralysis of a long undifferentiated to-do list by highlighting where to actually begin.\n\nAs with all planning-support prompts in this course, treat the generated task list as a strong starting structure to adjust based on what you actually know about your specific situation — AI doesn't know your calendar, your team's real capacity, or organizational context that might reorder priorities in ways a generic breakdown wouldn't anticipate.`,
          keyPoints: [
            'Breaking a vague goal into concrete tasks is a common bottleneck AI can help bridge quickly.',
            'Ask specifically for the first 3 tasks to overcome the paralysis of an undifferentiated to-do list.',
            'Treat a generated task list as a starting structure to adjust with real situational knowledge.',
            'AI doesn’t know your calendar, team capacity, or organizational context — factor those in yourself.'
          ],
          learningObjectives: [
            'Break a vague goal into a concrete, actionable task list using AI assistance.',
            'Adjust an AI-generated task list based on real situational constraints.'
          ],
        },
        {
          title: 'AI for Project Planning',
          duration: 7,
          content: `Project planning benefits from AI's structuring strengths — drafting a project timeline, identifying dependencies between tasks, and surfacing risks you might not have considered — while the final plan should reflect your actual, specific project context rather than a generic template.\n\nA useful prompt: "Project: [description]. Deadline: [date]. Key deliverables: [list]. Draft a project timeline with major milestones and flag any dependencies between tasks I should be aware of." Asking specifically about dependencies is valuable — it's a common planning blind spot to sequence tasks without noticing that task B genuinely can't start until task A finishes, which AI can help catch by systematically reviewing the task list.\n\nA useful risk-surfacing follow-up: "What are 3 risks to this timeline that I might not have considered?" This is similar to the devil's-advocate technique from the entrepreneurship course in this series — deliberately prompting for what could go wrong surfaces planning gaps that an optimistic first pass tends to miss.`,
          keyPoints: [
            'AI helps structure project timelines and identify dependencies between tasks.',
            'Explicitly ask about task dependencies, a common planning blind spot.',
            'A risk-surfacing follow-up prompt catches gaps an optimistic first plan tends to miss.',
            'The final plan should reflect your specific project context, not a generic template.'
          ],
          learningObjectives: [
            'Draft a project timeline with AI-identified task dependencies.',
            'Use a risk-surfacing prompt to identify planning gaps.'
          ],
        },
        {
          title: 'AI for Meeting Preparation',
          duration: 6,
          content: `Meeting preparation follows the same pattern as the earlier "AI-Assisted Research" lesson but applied specifically to producing a ready-to-use agenda or talking points, not just background understanding. Given real context, AI can draft a structured meeting prep document quickly.\n\nA useful prompt: "I have a meeting about [topic] with [attendees/roles]. Goal of the meeting: [what needs to be decided or accomplished]. Draft an agenda with time allocations, and 2-3 key questions I should make sure get addressed." Specifying the actual goal of the meeting (not just the topic) helps the AI produce an agenda oriented toward actually accomplishing something, rather than a generic topic-list agenda that could drift without a clear endpoint.\n\nFor recurring meetings specifically, a useful habit: paste last meeting's notes or action items into the prep prompt — "Last meeting's action items: [paste them]. Include a check-in on these in this meeting's agenda." This prevents recurring meetings from losing track of prior commitments, a common and frustrating failure mode of poorly-prepared recurring meetings.`,
          keyPoints: [
            'Specify the actual meeting goal, not just the topic, for an agenda oriented toward real outcomes.',
            'A good prep prompt produces an agenda with time allocations and key questions to address.',
            'For recurring meetings, include prior action items in the prep prompt to maintain continuity.',
            'Losing track of prior commitments is a common, frustrating failure mode this habit prevents.'
          ],
          learningObjectives: [
            'Draft a goal-oriented meeting agenda with time allocations and key questions.',
            'Maintain continuity in recurring meetings by including prior action items in prep prompts.'
          ],
        },
        {
          title: 'Automating Routine Work Tasks',
          duration: 6,
          content: `Some work tasks are repetitive enough that building a reusable prompt template, rather than writing a fresh prompt each time, is worth the small upfront investment — a weekly status update, a recurring report summary, a standard meeting recap format.\n\nThe practical approach: the first time you do one of these tasks with AI assistance, save the prompt that worked well, noting what you had to adjust to get a good result. The next time the same task comes up, start from that saved template instead of from scratch — this is the same template-library habit recommended throughout this course series, applied to individual routine work.\n\nOver time, a personal library of 5-10 templates for your most common recurring tasks can meaningfully compound — each one saves a small amount of time individually, but applied across weeks and months of repeated use, the cumulative effect on how much routine drafting work you're doing manually becomes substantial.`,
          keyPoints: [
            'Repetitive tasks are strong candidates for reusable prompt templates rather than fresh prompts each time.',
            'Save prompts that worked well, noting what adjustments were needed, for future reuse.',
            'A personal library of 5–10 templates for common tasks compounds meaningfully over time.',
            'This mirrors the template-library habit recommended throughout this course series, applied individually.'
          ],
          learningObjectives: [
            'Build a personal template library for recurring routine work tasks.',
            'Explain how small individual time savings compound into significant value over time.'
          ],
          resources: [
            {
              title: 'Module 4 Cheat Sheet: Planning & Meeting Prep Prompts',
              type: 'download',
              description: 'Templates for task breakdown, project timelines, and goal-oriented meeting agendas.',
              content: `TASK BREAKDOWN PROMPT\n"Goal: [paste it]. Context: [constraints]. Break into a concrete task list, with the first 3 tasks clearly identified."\n\nPROJECT TIMELINE PROMPT\n"Project: [description]. Deadline: [date]. Deliverables: [list]. Draft a timeline with milestones and flag task dependencies. Follow-up: what are 3 risks to this timeline I might not have considered?"\n\nMEETING PREP PROMPT\n"Meeting about [topic] with [attendees]. Goal: [what needs deciding/accomplishing]. Draft an agenda with time allocations and 2–3 key questions to address. Last meeting's action items: [paste them, if recurring]."`
            }
          ]
        },
      ],
    },
    {
      title: 'Responsible Use of AI in Knowledge Work',
      lessons: [
        {
          title: 'Ensuring Accuracy of AI Outputs',
          duration: 6,
          content: `The verification discipline from throughout this course series applies to everyday knowledge work with the same weight, even though the stakes can feel lower for routine tasks than for a formal business report — a wrong detail in a meeting summary or an inaccurate "fact" in a work email still creates real, if smaller, problems.\n\nThe practical habit for everyday use: anything AI states as a new fact (not something you provided) gets a quick mental flag — is this something I actually know to be true, or am I about to repeat something the AI generated that might be wrong? For low-stakes personal use this might be a quick gut-check; for anything going to colleagues, clients, or into a decision, it deserves an actual verification step.\n\nA useful habit that scales this appropriately: ask yourself "what happens if this specific detail is wrong?" If the answer is "nothing much," a light check is fine. If the answer involves real consequences — a wrong number in a report, a misstated deadline in a client email — verify properly before it goes out, the same scaled-scrutiny principle used throughout this course series.`,
          keyPoints: [
            'Verification discipline applies to everyday knowledge work, not just formal, high-stakes documents.',
            'Mentally flag anything AI states as a new fact you haven’t independently confirmed.',
            'Scale verification effort to consequences: "what happens if this detail is wrong?"',
            'Low-stakes personal use needs a light check; anything reaching colleagues or clients needs real verification.'
          ],
          learningObjectives: [
            'Apply a consequence-scaled verification habit to everyday AI-assisted work.',
            'Distinguish between AI restating provided information and stating new, unverified facts.'
          ],
        },
        {
          title: 'Avoiding Bias in AI Responses',
          duration: 6,
          content: `AI responses can reflect biases present in training data — skewed assumptions about roles, industries, or "typical" scenarios that don't match your actual, more diverse reality. In everyday knowledge work, this can show up subtly: a generated example defaulting to certain assumptions about who holds a particular job, or a "typical customer" description that doesn't match your actual varied customer base.\n\nA practical awareness habit: when AI generates examples, personas, or illustrative scenarios as part of a work task, do a quick check — does this reflect an actual, accurate picture of my situation, or a generic assumption the AI defaulted to? If the latter, adjust it rather than passing it along unchanged, especially for anything that will be seen by others.\n\nThis isn't about distrusting AI broadly — it's the same practical review habit applied throughout this course series, extended to noticing when a generated example carries an assumption worth catching before it goes further, whether that's in a work document, a presentation, or a comment shared with a team.`,
          keyPoints: [
            'AI responses can reflect training-data biases in generated examples, personas, or scenarios.',
            'Check whether a generated example reflects your actual situation or a generic default assumption.',
            'Adjust biased or inaccurate defaults rather than passing them along unchanged, especially to others.',
            'This is a practical review habit, not a reason to distrust AI broadly.'
          ],
          learningObjectives: [
            'Identify potential bias in AI-generated examples or scenarios within routine work tasks.',
            'Apply a review habit to catch and correct biased defaults before sharing work with others.'
          ],
        },
        {
          title: 'Protecting Sensitive Information',
          duration: 6,
          content: `Everyday knowledge work often involves sensitive material — internal strategy notes, colleague performance discussions, unreleased plans, or client-confidential details — and the same data-handling discipline from throughout this course series applies at the individual level, not just for formal organizational processes.\n\nA practical personal habit: before pasting anything into an AI tool, a quick self-check — would I be comfortable if this exact text were stored or reviewed outside my organization? If genuinely unsure, check your organization's specific policy on AI tool usage (many organizations now have one) rather than assuming it's fine, and when possible, generalize or anonymize sensitive specifics rather than pasting them verbatim.\n\nThis individual-level discipline matters because knowledge workers handle sensitive information constantly as part of ordinary work — the responsibility for protecting it doesn't only apply to formal, high-visibility projects; it applies to the routine, everyday use of AI tools that this entire course has focused on making efficient and habitual.`,
          keyPoints: [
            'Everyday knowledge work routinely involves sensitive material requiring the same handling discipline.',
            'Apply a self-check before pasting: would I be comfortable if this were stored outside my organization?',
            'Check your organization’s specific AI tool usage policy if genuinely unsure.',
            'Data protection responsibility applies to routine, everyday AI use, not just formal high-visibility projects.'
          ],
          learningObjectives: [
            'Apply a practical self-check before including sensitive information in AI prompts.',
            'Recognize organizational AI usage policy as a resource to check when uncertain.'
          ],
          resources: [
            {
              title: 'Module 5 Cheat Sheet: Everyday Accuracy & Privacy Self-Checks',
              type: 'download',
              description: 'Quick self-check questions to apply before sending or sharing AI-assisted work.',
              content: `ACCURACY SELF-CHECK\nDid the AI state something as fact that I haven't independently confirmed?\nWhat happens if this specific detail is wrong? (Low consequence → light check. Real consequence → verify properly.)\n\nBIAS SELF-CHECK\nDoes this generated example/persona reflect my actual situation, or a generic default assumption?\n\nPRIVACY SELF-CHECK\nWould I be comfortable if this exact text were stored or reviewed outside my organization? If unsure, check your org's AI usage policy before pasting.`
            }
          ]
        },
      ],
    },
    {
      title: 'Integrating AI into Daily Workflows',
      lessons: [
        {
          title: 'Designing an AI-Assisted Workflow',
          duration: 6,
          content: `As this course closes, the goal is moving from "occasionally trying AI for a task" to a deliberately designed personal workflow — specific recurring tasks where you reliably reach for AI assistance, with saved templates (Module 4) ready to go, rather than reinventing your approach each time a familiar task comes up.\n\nA practical exercise: list your 5 most time-consuming recurring knowledge-work tasks (status updates, meeting prep, research summaries, email drafting, whatever applies to your role). For each, decide: is this a good AI-assistance candidate (per the blank-page test from Module 1)? If yes, what would a saved template for it look like, informed by what you've learned in this course?\n\nThis deliberate design step — rather than ad hoc, occasional use — is what turns AI from an interesting tool you sometimes remember to use into a genuine, reliable part of how you work day to day.`,
          keyPoints: [
            'The goal is a deliberately designed personal workflow, not occasional, ad hoc AI use.',
            'Identify your most time-consuming recurring tasks and evaluate each as an AI-assistance candidate.',
            'Saved templates for recurring tasks (from Module 4) are the practical building blocks of this workflow.',
            'Deliberate design turns AI into a reliable daily habit rather than an occasionally-remembered tool.'
          ],
          learningObjectives: [
            'Identify personal recurring tasks suitable for a designed AI-assisted workflow.',
            'Build a plan for integrating saved templates into daily work habits.'
          ],
        },
        {
          title: 'Combining AI with Human Expertise',
          duration: 6,
          content: `The most effective use of AI in knowledge work isn't AI alone or human alone, but a specific division of labor: AI handles the fast, structural, first-draft work; you apply the expertise, judgment, and final accountability that only you can provide, informed by context and experience no prompt fully captures.\n\nA useful mental model, consistent with the framing used throughout this course series: think of AI as a very capable, very fast junior collaborator who has broad general knowledge but no specific knowledge of your actual situation until you provide it, and no accountability for the final result — that accountability stays entirely with you.\n\nThis division of labor is durable specifically because it plays to genuine relative strengths — AI's speed and breadth, your judgment and accountability — rather than trying to have AI replace expertise it doesn't have, or ignoring AI's genuine speed advantage out of an instinct to do everything manually.`,
          keyPoints: [
            'Effective AI use is a division of labor: AI for fast structural work, human for expertise and judgment.',
            'AI is a fast, capable collaborator without specific knowledge of your situation until you provide it.',
            'Final accountability for the result always stays with the human, never the AI tool.',
            'This division plays to genuine relative strengths rather than over- or under-using AI.'
          ],
          learningObjectives: [
            'Describe the appropriate division of labor between AI assistance and human expertise.',
            'Explain why final accountability remains with the human regardless of AI involvement.'
          ],
        },
        {
          title: 'Measuring Productivity Improvements',
          duration: 6,
          content: `It's worth periodically checking whether your AI-assisted workflow is actually saving meaningful time, rather than assuming it is — sometimes a new tool adds a different kind of overhead (crafting prompts, reviewing output) that partially offsets its speed benefit, especially early on before habits and templates are well-established.\n\nA simple practical check: for 2-3 of your template-supported recurring tasks (Module 6), roughly compare how long the task takes now (prompt + review + edit) versus your memory of how long it took before. If the time savings are real and meaningful, that confirms the workflow is working; if they're marginal, that's useful information suggesting either the templates need refinement or that particular task wasn't actually a good AI-assistance candidate.\n\nBeyond raw time, it's also worth noticing qualitative changes — do you procrastinate less on tasks that used to trigger blank-page avoidance? Does routine drafting feel less draining, freeing mental energy for the judgment-heavy parts of your work? These are real productivity gains even when harder to measure precisely than a simple time comparison.`,
          keyPoints: [
            'Periodically check whether an AI-assisted workflow is actually saving meaningful time, don’t just assume it.',
            'Compare current task time (prompt + review + edit) against remembered prior time for a rough check.',
            'Marginal time savings suggest templates need refinement or the task wasn’t a good AI-assistance candidate.',
            'Qualitative gains — less procrastination, less draining routine work — count as real productivity value too.'
          ],
          learningObjectives: [
            'Apply a simple time-comparison check to evaluate AI-assisted workflow effectiveness.',
            'Recognize qualitative productivity gains alongside quantitative time savings.'
          ],
        },
        {
          title: 'Future of AI in Knowledge Work',
          duration: 6,
          content: `Trends worth watching: deeper integration of AI directly into everyday work tools (rather than a separate copy-paste step), growing capability for AI to work with larger amounts of context at once (more of your actual documents and history informing each response), and — consistent with the other courses in this series — rising baseline expectations that knowledge workers use AI assistance effectively, making the prompting skill built in this course increasingly a standard professional competency rather than a specialized or optional one.\n\nAs tools evolve, the specific interfaces and integrations will keep changing, but the underlying discipline this course has built stays constant: clear task-input-constraint prompting, real source material over AI memory, iterative refinement over one-shot perfectionism, scaled verification and privacy awareness, and a clear division of labor that keeps human judgment and accountability central.\n\nThe practical takeaway for finishing this course: the specific tools you use today will likely look different in a year or two, but the prompting discipline itself — communicating clearly, verifying appropriately, and knowing where AI assistance ends and your own judgment begins — is what actually compounds in value over a career, regardless of which specific tool interface you're using at any given time.`,
          keyPoints: [
            'Watch for deeper tool integration, larger context capability, and rising baseline expectations for AI fluency.',
            'AI prompting is becoming a standard professional competency, not a specialized or optional skill.',
            'The underlying discipline (task-input-constraint prompting, verification, human judgment) outlasts any specific tool.',
            'This discipline compounds in value over a career regardless of which tool interface is current.'
          ],
          learningObjectives: [
            'Identify trends shaping AI’s role in knowledge work going forward.',
            'Explain why the underlying prompting discipline remains valuable as specific tools change.'
          ],
          resources: [
            {
              title: 'Module 6 Cheat Sheet: Personal AI Workflow Design Worksheet',
              type: 'download',
              description: 'A worksheet for designing a personal AI-assisted workflow around your own most time-consuming recurring tasks.',
              content: `PERSONAL WORKFLOW DESIGN WORKSHEET\n\nMy 5 most time-consuming recurring tasks:\n1. ____________ 2. ____________ 3. ____________ 4. ____________ 5. ____________\n\nFor each: Is this a good AI-assistance candidate? (Blank-page problem, or judgment problem?)\nIf yes — draft a reusable prompt template: Task / Input / Constraints.\n\nMonthly check-in: Am I actually saving time on template-supported tasks? Do I procrastinate less on tasks I used to avoid?`
            }
          ]
        },
      ],
    },
  ],
  // Reference quiz — will be SKIPPED by the update script since this course already has course.quizId set.
  quiz: {
    title: 'Prompt-Based AI for Personal Productivity and Knowledge Work — Final Assessment',
    description: 'A 10-question assessment covering productivity prompting, knowledge management, and responsible AI use at work.',
    passingScore: 70,
    questions: [
      {
        type: 'multiple-choice',
        question: 'Why does AI have an outsized impact on knowledge work specifically, per this course?',
        options: [
          { text: 'Knowledge work requires no human judgment at all', isCorrect: false },
          { text: 'Knowledge work is largely language-based, which AI handles well', isCorrect: true },
          { text: 'Knowledge workers have more free time than other workers', isCorrect: false },
          { text: 'AI tools are only designed for knowledge work', isCorrect: false },
        ],
        explanation: 'Because knowledge work (research, writing, analysis, planning) is language-based, prompt-based AI can meaningfully accelerate it — while human judgment about quality and relevance remains essential.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'What are the three core parts of an effective work prompt, per this course?',
        options: [
          { text: 'Greeting, request, and sign-off', isCorrect: false },
          { text: 'Task, input material, and constraints', isCorrect: true },
          { text: 'Length, font, and formatting', isCorrect: false },
          { text: 'Date, time, and location', isCorrect: false },
        ],
        explanation: 'Task, real input material, and constraints (format, length, tone) together produce a prompt that needs minimal editing afterward.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'true-false',
        question: 'When editing an existing draft, asking AI to "rewrite this completely" is usually better than a targeted edit instruction.',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true },
        ],
        correctAnswer: 'False',
        explanation: 'Targeted editing prompts ("don’t change anything else") preserve your voice and the parts that were already working, unlike a full rewrite.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What should you do if the first AI response to a prompt isn’t quite right?',
        options: [
          { text: 'Give up on using AI for that task', isCorrect: false },
          { text: 'Iterate with a quick follow-up rather than trying to perfect a single one-shot prompt', isCorrect: true },
          { text: 'Accept it anyway to save time', isCorrect: false },
          { text: 'Always start with a completely different tool', isCorrect: false },
        ],
        explanation: 'Treating prompting as a quick back-and-forth conversation, rather than requiring a perfect one-shot prompt, is usually faster overall.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'When processing multiple source documents for information retrieval, what is the recommended approach?',
        options: [
          { text: 'Combine all documents into one large prompt for efficiency', isCorrect: false },
          { text: 'Process documents separately to avoid mixing up which detail came from which source', isCorrect: true },
          { text: 'Only process one document total, ignoring the rest', isCorrect: false },
          { text: 'Ask the AI to guess which document is most important', isCorrect: false },
        ],
        explanation: 'Processing documents separately reduces the risk of the AI mixing up which specific detail came from which source, improving accuracy.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What is a useful self-check for scaling how much you verify an AI-stated fact?',
        options: [
          { text: '"Does this sound impressive?"', isCorrect: false },
          { text: '"What happens if this specific detail is wrong?"', isCorrect: true },
          { text: '"Is this the longest possible answer?"', isCorrect: false },
          { text: '"Did the AI respond quickly?"', isCorrect: false },
        ],
        explanation: 'Scaling verification effort to the real consequences of an error is the practical habit recommended throughout this course — light checks for low stakes, real verification for real consequences.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'true-false',
        question: 'AI-generated examples or personas can reflect biases from training data and should be reviewed before being passed along to others.',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false },
        ],
        correctAnswer: 'True',
        explanation: 'Generated examples can carry generic or skewed default assumptions — review and adjust them to reflect your actual situation before sharing with others.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'Before pasting sensitive work information into an AI tool, what practical self-check does this course recommend?',
        options: [
          { text: 'Whether the AI tool has a friendly interface', isCorrect: false },
          { text: 'Whether you’d be comfortable if this exact text were stored or reviewed outside your organization', isCorrect: true },
          { text: 'Whether the information is longer than 500 words', isCorrect: false },
          { text: 'Whether a colleague has used the same tool before', isCorrect: false },
        ],
        explanation: 'This self-check, along with checking your organization’s AI usage policy, is the practical safeguard for handling sensitive information appropriately.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'In the recommended division of labor between AI and human expertise, who retains final accountability for the result?',
        options: [
          { text: 'The AI tool', isCorrect: false },
          { text: 'The human, always', isCorrect: true },
          { text: 'Whichever produced the faster output', isCorrect: false },
          { text: 'No one — accountability doesn’t apply to AI-assisted work', isCorrect: false },
        ],
        explanation: 'AI provides speed and breadth; the human provides judgment, expertise, and retains full accountability for the final result.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'What does this course recommend as a way to check whether an AI-assisted workflow is actually saving meaningful time?',
        options: [
          { text: 'Assume it is, since AI is always faster', isCorrect: false },
          { text: 'Roughly compare current task time (prompt + review + edit) against remembered prior time', isCorrect: true },
          { text: 'Only judge by how enjoyable the tool is to use', isCorrect: false },
          { text: 'Never evaluate it — just keep using the tool regardless', isCorrect: false },
        ],
        explanation: 'A simple time comparison for template-supported tasks helps confirm real savings, or signals that templates need refinement or a task wasn’t a good AI-assistance candidate.',
        points: 1, difficulty: 'medium',
      },
    ],
  },
};
