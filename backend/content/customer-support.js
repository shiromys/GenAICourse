// Content update data for: Prompt-Based AI for Customer Support and Service Teams
// Matched to production by exact course/module/lesson TITLE — see scripts/updateCourseContent.js

export default {
  courseTitle: 'Prompt-Based AI for Customer Support and Service Teams',
  modules: [
    {
      title: 'Foundations of Prompt-Based AI in Customer Support',
      lessons: [
        {
          title: 'Introduction to AI in Customer Support',
          duration: 7,
          content: `Customer support is one of the areas where prompt-based AI delivers the fastest, most measurable value — a support agent handling a complex complaint at 5pm can draft a well-structured, professional response in seconds instead of ten minutes, without sacrificing the empathy or accuracy the situation needs.\n\nThe goal isn't replacing agents with AI — it's removing the repetitive, time-consuming parts of the job (drafting from scratch, looking up policy wording, summarizing a long thread for a handoff) so agents spend more of their time on judgment calls: de-escalating a frustrated customer, deciding on an exception to policy, or catching a situation that needs escalation.\n\nThroughout this course, "prompt-based AI" means giving an AI tool clear instructions to draft, summarize, or organize support-related text, with a human agent always reviewing before anything reaches a customer. Example: instead of typing a refund policy explanation from memory every time, an agent prompts: "Explain our 30-day return policy to a customer who's asking on day 35, in a warm but clear tone, and suggest one goodwill option we could offer." Same policy, personalized instantly to the actual situation.`,
          keyPoints: [
            'AI removes repetitive drafting and lookup work, freeing agents for judgment calls and de-escalation.',
            'The goal is augmenting agents, not replacing the human review step before a reply reaches a customer.',
            'Prompt-based AI in support means clear instructions to draft, summarize, or organize text.',
            'The same policy explanation can be personalized instantly to a specific customer situation.'
          ],
          learningObjectives: [
            'Explain how AI reduces repetitive work in a customer support role.',
            'Describe the human-review principle that applies to all AI-assisted support output.'
          ],
        },
        {
          title: 'Understanding Prompt-Based Interaction',
          duration: 6,
          content: `A support-specific prompt typically needs three ingredients: the customer's actual message (paste it, don't paraphrase from memory — nuance and tone cues matter), the situation context (what's already happened — is this their first contact or the fifth?), and the desired outcome (what should this response accomplish — resolve, apologize, redirect, or gather more information?).\n\nWeak prompt: "Write a response to an angry customer." Strong prompt: "Customer message: [paste it]. Context: this is their second email about a delayed order; first email was 3 days ago with no response yet. Desired outcome: apologize for the delay, give a real update on shipping status, and offer a small goodwill discount. Tone: sincere, not scripted-sounding."\n\nNotice the strong version gives the AI everything it needs to produce something genuinely useful on the first try, rather than a generic apology template that an agent then has to substantially rewrite anyway — the upfront specificity pays for itself in editing time saved.`,
          keyPoints: [
            'A strong support prompt includes the customer’s actual message, situation context, and desired outcome.',
            'Paste the real customer message rather than paraphrasing it from memory.',
            'Context (how many contacts so far, what’s already happened) shapes the appropriate response.',
            'Upfront specificity reduces editing time versus a generic response that needs heavy rewriting.'
          ],
          learningObjectives: [
            'Identify the three core ingredients of an effective support prompt.',
            'Convert a vague support prompt into a specific, context-rich one.'
          ],
        },
        {
          title: 'Benefits of AI for Service Teams',
          duration: 6,
          content: `Three benefits matter most for service teams: faster first-draft responses (cutting average handle time on complex tickets), consistency across agents (a well-built prompt template applies the same policy accuracy and tone regardless of which agent is handling the ticket), and reduced cognitive load during high-volume periods, when agents are more likely to make small errors or sound curt simply from fatigue.\n\nThese benefits compound during busy periods specifically — the value of a fast, consistent first draft is highest exactly when an agent has the least time and mental bandwidth to craft a careful response from scratch, which is often also when customers are most frustrated and least tolerant of a rushed, generic reply.\n\nIt's worth being honest about what AI doesn't fix: if underlying policies are confusing, if a product has a real quality issue, or if response times are slow due to understaffing, AI-assisted drafting speeds up the writing step but doesn't resolve the root cause driving customer frustration in the first place.`,
          keyPoints: [
            'Key benefits: faster first drafts, consistency across agents, reduced cognitive load during high volume.',
            'These benefits compound most during busy periods when agents have the least bandwidth.',
            'AI speeds up drafting but doesn’t fix root causes like confusing policy or product quality issues.',
            'Consistency comes from well-built prompt templates applied across the whole team.'
          ],
          learningObjectives: [
            'Identify the core benefits AI provides to service teams.',
            'Distinguish between problems AI-assisted drafting solves and root causes it doesn’t address.'
          ],
        },
        {
          title: 'Human Oversight and Responsible Use',
          duration: 7,
          content: `Every AI-drafted customer response needs a human review step before sending — this isn't a suggestion, it's the core safety practice of this entire course, because a wrong policy detail or an off-tone reply sent directly to a customer can damage trust in a way that's much harder to repair than the time saved by skipping review.\n\nWhat to check before sending: is every policy detail (refund amount, deadline, eligibility) accurate to your actual current policy, not a plausible-sounding but wrong version the AI generated? Does the tone match the situation — would a stressed, frustrated customer read this as genuinely caring, or as a canned corporate response? Is anything promised that the agent or company can't actually deliver?\n\nA useful team practice: build a shared, short review checklist (policy accuracy, tone fit, no over-promising) and apply it consistently, especially for new agents still calibrating how much to trust and how much to edit AI drafts. Over time, agents develop a feel for which types of responses need heavy editing and which are usually solid as-is — but that judgment is built through consistent review, not skipped by trusting the tool blindly.`,
          keyPoints: [
            'Every AI-drafted response needs human review before sending — this is the core safety practice.',
            'Check policy accuracy, tone fit, and that nothing is over-promised before sending.',
            'A wrong detail sent to a customer damages trust more than the time saved by skipping review.',
            'A shared review checklist helps agents, especially new ones, calibrate trust in AI drafts.'
          ],
          learningObjectives: [
            'Apply a review checklist to an AI-drafted customer response before sending.',
            'Explain why human oversight remains essential regardless of AI draft quality.'
          ],
          resources: [
            {
              title: 'Module 1 Cheat Sheet: Support Prompt & Review Checklist',
              type: 'download',
              description: 'A ready-to-use prompt template for support responses plus a pre-send review checklist.',
              content: `SUPPORT RESPONSE PROMPT TEMPLATE\n\nCustomer message: [paste it exactly]\nContext: [contact history, what’s already happened]\nDesired outcome: [resolve / apologize / redirect / gather info]\nTone: [e.g., "sincere, not scripted-sounding"]\nPolicy facts to use: [exact current policy details — don’t let the AI guess these]\n\nPRE-SEND REVIEW CHECKLIST\n☐ Every policy detail (amount, deadline, eligibility) matches our actual current policy.\n☐ Tone fits the situation — would a frustrated customer read this as genuinely caring?\n☐ Nothing is promised that we can’t actually deliver.\n☐ I’ve read it as if I were the customer receiving it.`
            }
          ]
        },
      ],
    },
    {
      title: 'Writing Effective Prompts for Customer Queries',
      lessons: [
        {
          title: 'Elements of a Good Customer Support Prompt',
          duration: 7,
          content: `Building on Module 1, a fully effective support prompt adds two more elements: the exact policy or product facts relevant to the situation (spelled out explicitly, never left for the AI to guess or recall), and any constraints on what can or cannot be offered (e.g., "do not offer a refund beyond our stated policy without flagging it for supervisor approval").\n\nExample: "Customer message: [paste it]. Context: first-time contact, asking about a delayed shipment. Policy facts: standard shipping is 5-7 business days; this order is on day 9. We can offer a $10 credit for delays beyond 7 days without supervisor approval, or a full refund with supervisor approval. Desired outcome: apologize, explain the delay, offer the $10 credit as a first step. Tone: warm, solution-focused."\n\nThis level of detail might feel like more work upfront than just asking the AI to "write an apology," but it's the difference between a draft that's ready to send with a quick read-through and one that needs to be substantially rewritten because it got a policy detail wrong or promised something outside the agent's authority.`,
          keyPoints: [
            'Spell out exact policy/product facts explicitly — never let the AI guess or recall them.',
            'State any constraints on what can be offered, including approval thresholds.',
            'Upfront detail produces a send-ready draft rather than one needing substantial rewriting.',
            'This is the same brief-first discipline from Module 1, applied with more precision.'
          ],
          learningObjectives: [
            'Write a fully-specified support prompt including exact policy facts and constraints.',
            'Explain why specifying constraints prevents an agent from having to override an over-promising draft.'
          ],
        },
        {
          title: 'Prompts for Responding to Customer Questions',
          duration: 6,
          content: `Straightforward informational questions ("what's your return window," "do you ship internationally") are the easiest support prompts to get right quickly, because the ingredients are simple: the question, and the accurate answer.\n\nA useful pattern for high-volume, repeatable question types: build a small reference of your actual current policies (a paragraph each) and paste the relevant one into every prompt rather than trusting the AI to know or recall your policies correctly. "Using this exact policy text: [paste your return policy], answer this customer's question in a friendly, concise way: [paste question]." This guarantees policy accuracy while still getting the speed and tone benefits of AI drafting.\n\nFor questions your policy reference doesn't cover, that's a signal to flag for a supervisor or knowledge-base update rather than letting the AI improvise an answer — an improvised-but-plausible-sounding policy answer is one of the highest-risk failure modes in support, since customers reasonably expect stated policies to be reliable.`,
          keyPoints: [
            'Build a reference of your actual current policies to paste into prompts, rather than trusting AI recall.',
            'This guarantees policy accuracy while keeping the speed and tone benefits of AI drafting.',
            'Questions outside your reference policies should be flagged, not improvised by the AI.',
            'An improvised, plausible-but-wrong policy answer is a high-risk failure mode in support.'
          ],
          learningObjectives: [
            'Use a real policy reference to ground AI-generated answers to customer questions.',
            'Recognize when a question requires escalation rather than an AI-drafted answer.'
          ],
        },
        {
          title: 'Prompts for Handling Customer Complaints',
          duration: 7,
          content: `Complaint responses carry more emotional weight than informational questions, so the prompt needs an extra ingredient: acknowledgment before resolution. A response that jumps straight to policy or a fix without first acknowledging the customer's frustration tends to land as cold, even if the resolution itself is generous.\n\nA useful structure to request explicitly: "Structure the response as: (1) acknowledge their frustration specifically — reference what actually happened, not a generic 'sorry for the inconvenience,' (2) explain what we're doing about it, (3) state the resolution clearly, (4) end with an easy way to follow up if needed." Requesting this structure by name consistently produces responses that feel considered rather than templated.\n\nA useful check on any AI-drafted complaint response: does it reference the specific thing the customer is upset about, or could this exact reply be sent to any complaint regardless of the details? If it's generic enough to send to anyone, it needs a specific detail from the actual complaint added back in before it goes out.`,
          keyPoints: [
            'Complaint responses need acknowledgment before resolution, not resolution alone.',
            'A four-part structure works well: specific acknowledgment, action taken, clear resolution, follow-up path.',
            '"Sorry for the inconvenience" is a generic phrase — reference the specific issue instead.',
            'Check: could this exact reply be sent to any complaint? If so, it needs more specific detail.'
          ],
          learningObjectives: [
            'Structure a complaint response using acknowledgment before resolution.',
            'Evaluate whether a drafted complaint response is specific enough to the actual situation.'
          ],
        },
        {
          title: 'Prompts for Explaining Policies and Procedures',
          duration: 6,
          content: `Policies are often written in formal, legalistic language that doesn't translate well into a warm customer conversation — a useful AI application is "translating" accurate policy text into plain, friendly language without changing its actual meaning.\n\nPrompt: "Here is our exact policy text: [paste it]. Rewrite this in plain, friendly language for a customer email, without changing what it actually says or promises. Keep all specific numbers, deadlines, and conditions exactly the same." That last instruction is critical — the goal is a translation of tone and readability, not a paraphrase that accidentally drops a condition or softens a deadline in a way that misrepresents the actual policy.\n\nFor procedures involving multiple steps (like a return process), asking for a numbered, customer-facing walkthrough tends to reduce follow-up questions: "Turn this internal return process into a simple 4-step guide a customer could follow without needing to ask us anything else." Clarity upfront reduces support volume downstream, which is a quieter but real benefit of this kind of prompting.`,
          keyPoints: [
            'AI can translate formal policy language into plain, friendly tone without changing its actual meaning.',
            'Explicitly instruct that specific numbers, deadlines, and conditions must stay exactly the same.',
            'For multi-step procedures, a clear numbered customer walkthrough reduces follow-up questions.',
            'Clearer upfront explanations reduce downstream support volume.'
          ],
          learningObjectives: [
            'Translate formal policy text into plain language while preserving its exact meaning.',
            'Write a clear, numbered customer-facing procedure from an internal process.'
          ],
          resources: [
            {
              title: 'Module 2 Cheat Sheet: Complaint Response & Policy Translation Prompts',
              type: 'download',
              description: 'Structured prompts for handling complaints with empathy and translating policy language into plain English.',
              content: `COMPLAINT RESPONSE PROMPT\n"Customer message: [paste it]. Structure the response as: (1) acknowledge their specific frustration — reference what happened, not a generic apology, (2) explain what we’re doing about it, (3) state the resolution clearly, (4) offer an easy way to follow up."\n\nPOLICY TRANSLATION PROMPT\n"Exact policy text: [paste it]. Rewrite in plain, friendly language for a customer email. Do not change any numbers, deadlines, or conditions — keep them exactly the same, just make the wording clearer and warmer."`
            }
          ]
        },
      ],
    },
    {
      title: 'Using AI to Draft Customer Support Responses',
      lessons: [
        {
          title: 'Generating Professional Response Drafts',
          duration: 6,
          content: `"Professional" in a support context means clear, accurate, and appropriately warm — not stiff or overly formal, which can actually read as cold in a customer service setting. A useful instruction to include: "Professional but warm — avoid corporate-sounding phrases like 'we apologize for any inconvenience this may have caused.'"\n\nAsking for that specific kind of phrase to be avoided matters because AI models, like many customer service scripts, default toward these over-used corporate phrases unless told otherwise — naming a few specific phrases to avoid, drawn from what your team has noticed sounding stale, tends to work better than a vague "sound less corporate" instruction.\n\nA practical habit: keep a short, evolving list of phrases your team has decided to retire (either because they sound canned, or because customers have specifically reacted badly to them) and include that list in prompt templates. This is a small, cheap habit that compounds into noticeably better response quality over time.`,
          keyPoints: [
            '"Professional" in support should mean clear and warm, not stiff or overly formal.',
            'Name specific corporate-sounding phrases to avoid rather than giving a vague instruction.',
            'AI defaults toward common customer-service clichés unless told otherwise.',
            'Maintain an evolving "retired phrases" list and include it in prompt templates.'
          ],
          learningObjectives: [
            'Write a prompt that avoids generic corporate-sounding phrases.',
            'Maintain a reusable list of phrases to exclude from support responses.'
          ],
        },
        {
          title: 'Maintaining Brand Voice in Customer Communication',
          duration: 6,
          content: `Support communication is often a customer's most direct interaction with your brand's actual personality — more so than marketing copy, because it happens during a real moment of need. Keeping that voice consistent across every agent, and across every AI-assisted draft, matters for trust.\n\nThe same technique from the marketing content applies here: paste 2-3 real examples of support responses your team is proud of, and instruct the AI to match that voice specifically. "Match the tone and style of these example responses: [paste 2-3 good examples]. Write a response to this new situation in the same voice." Real examples outperform describing voice in adjectives, especially for something as nuanced as "warm but not overly casual" or "confident but not dismissive."\n\nA useful team exercise: periodically review a batch of recent AI-assisted responses together and flag any that felt "off-voice," then add the corrected version to your example set — this turns voice consistency into a living, improving reference rather than a one-time guideline document nobody revisits.`,
          keyPoints: [
            'Support interactions are often a customer’s most direct experience of brand personality.',
            'Paste real examples of good support responses to guide AI voice-matching, not just adjectives.',
            'Voice inconsistency across agents and AI drafts erodes customer trust over time.',
            'Periodically review responses as a team and refine the example set based on what felt off-voice.'
          ],
          learningObjectives: [
            'Use example-based prompting to maintain consistent brand voice in support.',
            'Build a team process for refining voice examples over time.'
          ],
        },
        {
          title: 'Simplifying Technical Explanations',
          duration: 6,
          content: `Technical support questions often require translating an internal, jargon-heavy explanation into something a non-technical customer can actually follow and act on. AI is genuinely strong at this specific translation task, given the accurate technical detail to start from.\n\nPrompt: "Here's the technical explanation of the issue: [paste it]. Rewrite this for a customer with no technical background. Use a simple analogy if it helps. Keep the actual troubleshooting steps in the same order, just explain each one in plain language." Requesting the steps stay in the same order matters — reordering troubleshooting steps, even while simplifying language, risks changing what actually needs to happen and in what sequence.\n\nA useful check before sending a simplified technical explanation: would someone with zero technical background be able to follow these steps without getting confused or stuck? If a term still needs a customer to already know something technical, it likely needs one more simplification pass.`,
          keyPoints: [
            'AI is strong at translating jargon-heavy technical explanations into plain customer language.',
            'Always start from an accurate technical explanation as the source material.',
            'Instruct the AI to keep troubleshooting steps in the same order while simplifying the wording.',
            'Check: could someone with zero technical background actually follow these steps?'
          ],
          learningObjectives: [
            'Translate a technical explanation into plain language while preserving step order and accuracy.',
            'Evaluate a simplified explanation for remaining jargon or unclear steps.'
          ],
        },
        {
          title: 'Personalizing Customer Responses',
          duration: 7,
          content: `A response that references real details from the customer's actual situation — their order number, what they specifically said, how long they've been a customer — reads as genuinely attentive in a way a well-written but generic response never does, even if the generic version is technically accurate and polite.\n\nThe practical technique: always paste the customer's exact message and any relevant account context (order history, how long they've been a customer, prior contacts) into the prompt, and explicitly instruct the AI to reference specific details rather than writing generically. "Reference their specific order number and the fact that this is their third contact about this issue — don't write a generic response that could apply to any customer."\n\nBe mindful of the flip side: over-personalization that feels surveillance-like (referencing details the customer wouldn't expect you to know or mention) can feel invasive rather than attentive. Personalize based on information directly relevant to resolving their issue, not everything available in their account history.`,
          keyPoints: [
            'Referencing real, specific details makes a response feel attentive rather than generic.',
            'Paste the customer’s exact message and relevant account context into the prompt.',
            'Explicitly instruct the AI to reference specifics rather than writing a generic response.',
            'Avoid over-personalization that feels surveillance-like — stick to details relevant to the issue.'
          ],
          learningObjectives: [
            'Write a personalized response that references specific, relevant customer details.',
            'Distinguish helpful personalization from over-personalization that feels invasive.'
          ],
          resources: [
            {
              title: 'Module 3 Cheat Sheet: Voice-Matching & Personalization Prompts',
              type: 'download',
              description: 'Prompts for keeping responses on-brand, technically clear, and genuinely personalized.',
              content: `VOICE-MATCHING PROMPT\n"Match the tone and style of these example responses: [paste 2–3 good examples]. Write a response to this new situation in the same voice: [paste new situation]."\n\nTECHNICAL SIMPLIFICATION PROMPT\n"Technical explanation: [paste it]. Rewrite for a customer with no technical background, using a simple analogy if helpful. Keep the troubleshooting steps in the same order, just explain each in plain language."\n\nPERSONALIZATION PROMPT\n"Customer message: [paste it]. Relevant context: [order number, contact history, tenure]. Reference these specific details — don’t write a response that could apply to any customer."`
            }
          ]
        },
      ],
    },
    {
      title: 'AI for Managing Customer Support Workflows',
      lessons: [
        {
          title: 'Summarizing Customer Conversations',
          duration: 6,
          content: `Long support threads — especially ones that get escalated or handed off between agents — are one of the clearest wins for AI summarization, since reading a full 15-message thread before responding is slow, and skimming risks missing an important detail.\n\nPrompt: "Here's the full conversation thread: [paste it]. Summarize: (1) what the customer originally wanted, (2) what's been tried so far, (3) the current status, (4) any commitments already made to the customer that need to be honored." That fourth point matters specifically for handoffs — a new agent who doesn't know a discount or exception was already promised can accidentally contradict a colleague, which reads as disorganized to the customer.\n\nFor internal handoff notes specifically, a good summary should let the next agent respond confidently without re-reading the entire thread — that's the practical bar for whether a summary is actually doing its job.`,
          keyPoints: [
            'Long threads are a clear win for AI summarization before an agent responds or takes a handoff.',
            'A good summary includes original request, what’s been tried, current status, and prior commitments.',
            'Tracking prior commitments prevents a new agent from accidentally contradicting a colleague.',
            'The practical bar for a good summary: can the next agent respond confidently without re-reading everything?'
          ],
          learningObjectives: [
            'Summarize a long support thread for an effective agent handoff.',
            'Identify why tracking prior commitments matters specifically in handoff summaries.'
          ],
        },
        {
          title: 'Categorizing Customer Issues',
          duration: 6,
          content: `Consistent issue categorization (billing, technical, shipping, account access, etc.) makes reporting and trend-spotting possible — but manual categorization is tedious and inconsistent across agents. AI can apply a defined category scheme quickly and consistently, once you've defined the categories.\n\nPrompt: "Here are our issue categories: [list them, with a one-line definition of each]. Categorize this customer message into exactly one category, and briefly explain why: [paste message]." Providing your own category definitions, rather than asking the AI to invent categories, ensures the output matches whatever reporting system your team already uses.\n\nFor batches of tickets (say, categorizing a week's backlog), process them with the same category list applied consistently, and spot-check a sample against your own read of a few tickets to confirm the categorization logic is actually working as intended before trusting it at scale.`,
          keyPoints: [
            'Provide your own defined category list rather than letting AI invent categories.',
            'Consistent categorization enables reliable reporting and trend-spotting across the team.',
            'Ask for a brief explanation alongside each categorization to check the model’s reasoning.',
            'Spot-check a sample of AI categorizations against your own judgment before trusting it at scale.'
          ],
          learningObjectives: [
            'Categorize customer issues using a predefined category scheme.',
            'Apply a spot-check process to validate AI categorization accuracy.'
          ],
        },
        {
          title: 'Creating Knowledge Base Content',
          duration: 7,
          content: `Frequently-asked questions and common troubleshooting scenarios are natural candidates for knowledge base articles, and AI can turn a pattern you've noticed in support tickets into a first-draft article quickly — though accuracy review here matters as much as anywhere else in this course, since a knowledge base article, once published, gets reused far more times than a single customer reply.\n\nPrompt: "We get frequent questions about [topic]. Here are 3 example support tickets showing how customers ask about this and how we've resolved it: [paste examples]. Draft a knowledge base article answering this question clearly, including any steps a customer would need to follow." Grounding the article in real examples, rather than a general description of the topic, keeps it practically useful rather than abstract.\n\nBecause knowledge base content gets reused repeatedly and often reduces incoming ticket volume when it's good, it's worth the extra step of having a second team member review any AI-drafted article for accuracy before publishing — the verification cost is small relative to how many customers (or agents referencing it internally) will rely on it being correct.`,
          keyPoints: [
            'Real support tickets showing a recurring question are strong source material for KB articles.',
            'A knowledge base article gets reused far more than a single reply, raising the accuracy stakes.',
            'Ground articles in real examples rather than an abstract description of the topic.',
            'Have a second reviewer check AI-drafted KB articles before publishing, given their reuse volume.'
          ],
          learningObjectives: [
            'Draft a knowledge base article grounded in real support ticket examples.',
            'Explain why KB articles warrant extra review relative to a single customer reply.'
          ],
        },
        {
          title: 'Drafting Internal Support Notes',
          duration: 6,
          content: `Internal notes — case summaries, escalation notes, notes for a manager review — have a different audience than customer-facing responses, so the prompt should reflect that: more direct, more technical detail allowed, and explicit inclusion of anything a reviewer would need to make a decision (what was tried, what the customer is asking for, what the agent recommends).\n\nPrompt: "Draft an internal escalation note for a manager. Include: what the customer is asking for, what's already been tried, why this needs escalation, and my recommendation for how to resolve it. Be direct and factual — this isn't customer-facing." Explicitly flagging that it's not customer-facing helps the AI adjust tone and detail level appropriately, rather than defaulting to the softer, more diplomatic phrasing appropriate for an external message.\n\nA useful habit: always include a clear recommendation, not just a summary of facts, in escalation notes — a manager reviewing a busy queue of escalations can move faster when the agent has already done the thinking and stated a specific proposed resolution.`,
          keyPoints: [
            'Internal notes need a different tone than customer-facing responses — more direct, more detail.',
            'Explicitly tell the AI the note is internal, not customer-facing, to get the right tone.',
            'Include what was tried, what’s being asked, why escalation is needed, and a recommendation.',
            'A stated recommendation, not just a fact summary, helps reviewers move faster.'
          ],
          learningObjectives: [
            'Draft an internal escalation note with a clear recommendation.',
            'Adjust tone and detail level appropriately for an internal versus customer-facing audience.'
          ],
          resources: [
            {
              title: 'Module 4 Cheat Sheet: Summarization, Categorization & Escalation Prompts',
              type: 'download',
              description: 'Templates for thread summaries, ticket categorization, and internal escalation notes.',
              content: `THREAD SUMMARY PROMPT\n"Full conversation: [paste it]. Summarize: (1) what the customer originally wanted, (2) what’s been tried, (3) current status, (4) any commitments already made."\n\nCATEGORIZATION PROMPT\n"Categories: [list with one-line definitions]. Categorize this message into exactly one category and briefly explain why: [paste message]."\n\nESCALATION NOTE PROMPT\n"Draft an internal escalation note for a manager. Include: what the customer wants, what’s been tried, why this needs escalation, and my recommendation. Direct and factual — not customer-facing."`
            }
          ]
        },
      ],
    },
    {
      title: 'Improving Customer Experience with AI Assistance',
      lessons: [
        {
          title: 'Writing Empathetic Customer Responses',
          duration: 7,
          content: `Empathy in a written response is specific, not generic — "I understand your frustration" is a phrase, while "waiting three weeks for a replacement part when you needed it for a client deadline is genuinely frustrating, and I'm sorry we let that happen" demonstrates actual understanding of the specific situation. AI can help generate the second kind, if given the specific situation to respond to.\n\nPrompt: "Customer situation: [paste details of what happened and why it matters to them]. Write a response that demonstrates specific understanding of their situation — not generic sympathy phrases. Reference what actually happened and why it would be frustrating." Asking the model to reference the actual situation, rather than just "be empathetic," is what produces something that doesn't sound like a template.\n\nA good test for empathy in a draft: read it and ask, could this exact sentence be sent to a customer with a completely different complaint, and would it still technically make sense? If yes, it's probably too generic and needs a specific detail from this situation added back in.`,
          keyPoints: [
            'Specific empathy references the actual situation; generic empathy uses interchangeable phrases.',
            'Give the AI the specific situation details to generate genuinely responsive empathy.',
            'Ask for reference to what actually happened rather than just instructing "be empathetic."',
            'Test: could this sentence apply to any complaint? If so, it needs more situation-specific detail.'
          ],
          learningObjectives: [
            'Write a specific, situation-grounded empathetic response.',
            'Apply a genericness test to evaluate whether an empathetic response is truly specific.'
          ],
        },
        {
          title: 'Reducing Response Time with AI Support',
          duration: 6,
          content: `The speed benefit of AI-assisted drafting is real, but it's worth being precise about where the time savings actually come from: it's the first-draft generation step, not the review step, which should never be rushed regardless of how fast the draft was produced.\n\nA practical workflow for high-volume periods: use saved prompt templates (like the cheat sheets from this course) for your most common ticket types, so generating a relevant first draft takes seconds rather than requiring the agent to construct a prompt from scratch each time. This is where template libraries, mentioned throughout this course, pay off most concretely — recognizable ticket type, matching template, fast accurate draft, quick human review.\n\nA caution: speed pressure can tempt agents to skip the review step during busy periods, which is exactly when review matters most, since rushed situations are also when small AI errors (a wrong policy detail, an off-tone phrase) are most likely to slip through unnoticed. Protect review time as non-negotiable, even when volume is high.`,
          keyPoints: [
            'Time savings come from faster first-draft generation, not from skipping review.',
            'Saved prompt templates for common ticket types speed up draft generation significantly.',
            'Review time should be protected as non-negotiable, especially during high-volume periods.',
            'Busy periods are exactly when small AI errors are most likely to slip through unnoticed.'
          ],
          learningObjectives: [
            'Use template libraries to speed up first-draft generation during high volume.',
            'Explain why review time must stay protected even under speed pressure.'
          ],
        },
        {
          title: 'Handling Difficult Customer Situations',
          duration: 7,
          content: `Difficult situations — a very angry customer, a situation with no good resolution available, a customer making an unreasonable demand — need more careful human judgment than routine tickets, and AI's role here shifts from "draft the response" to "help think through the response," which is a subtly different, equally valuable use.\n\nA useful prompt for thinking through a hard situation: "Here's a difficult customer situation: [paste details]. What are 2-3 different ways I could respond, with the trade-offs of each? I want to de-escalate without over-promising something we can't deliver." This gives the agent options and trade-offs to consider rather than a single draft to accept or reject — closer to a thinking partner than an autopilot for genuinely hard calls.\n\nFor situations involving policy exceptions, legal risk, or a genuinely unreasonable customer demand, AI-assisted drafting should happen after a human decision about how to handle it, not instead of that decision — use AI to help word the response once the actual approach is decided, not to decide the approach itself.`,
          keyPoints: [
            'For difficult situations, AI’s role shifts from drafting a response to helping think through options.',
            'Ask for multiple response options with trade-offs rather than a single draft to accept or reject.',
            'For policy exceptions or legal risk, the human decides the approach first; AI helps word it after.',
            'AI works best as a thinking partner for hard calls, not an autopilot.'
          ],
          learningObjectives: [
            'Use AI to generate response options with trade-offs for a difficult situation.',
            'Distinguish when AI should draft a response versus support a human decision first.'
          ],
        },
        {
          title: 'Consistency in Customer Communication',
          duration: 6,
          content: `Customers notice inconsistency — different agents giving different answers to the same policy question, or the same agent sounding different across two interactions with the same customer. Template libraries and shared policy references (built throughout this course) are the practical fix, since they make it easy for every agent to draw from the same accurate, on-voice source material.\n\nA team habit worth building: periodically audit a sample of recent AI-assisted responses across different agents for the same or similar ticket type, checking for consistency in both policy accuracy and tone. Inconsistencies found this way are a signal to update the shared template or policy reference, not just to correct the individual response.\n\nConsistency doesn't mean robotic sameness — a good template still allows room for genuine personalization (Module 3) while anchoring the policy facts and overall tone so customers get a coherent brand experience regardless of which agent, or how much AI assistance, was involved in their specific interaction.`,
          keyPoints: [
            'Inconsistent answers to the same question across agents erode customer trust.',
            'Shared template libraries and policy references are the practical fix for consistency.',
            'Periodically audit responses across agents for the same ticket type to catch drift.',
            'Consistency means coherent policy and tone, not robotic sameness — personalization still applies.'
          ],
          learningObjectives: [
            'Explain how shared templates and policy references improve cross-agent consistency.',
            'Audit a sample of responses for consistency in policy and tone.'
          ],
          resources: [
            {
              title: 'Module 5 Cheat Sheet: Empathy & Difficult-Situation Prompts',
              type: 'download',
              description: 'Prompts for writing specific empathetic responses and thinking through hard customer situations.',
              content: `EMPATHY PROMPT\n"Customer situation: [paste details of what happened and why it matters to them]. Write a response demonstrating specific understanding — reference what actually happened, not generic sympathy phrases."\n\nDIFFICULT SITUATION PROMPT\n"Difficult situation: [paste details]. What are 2–3 different ways I could respond, with trade-offs for each? I want to de-escalate without over-promising."`
            }
          ]
        },
      ],
    },
    {
      title: 'Responsible and Effective Use of AI in Customer Support',
      lessons: [
        {
          title: 'Reviewing AI-Generated Responses',
          duration: 6,
          content: `This closing module consolidates the review discipline built throughout the course into one final, practical system. Before any AI-drafted response is sent, three questions: is it factually accurate (policy, order details, any specifics)? Is the tone appropriate to the situation? Does it actually resolve or meaningfully progress what the customer needs?\n\nA useful escalating-scrutiny principle: routine, low-stakes responses (a simple policy question) need a quick accuracy scan; emotionally-charged or high-stakes responses (a complaint, a policy exception, anything involving money beyond standard thresholds) need a slower, more careful read, ideally by an agent who isn't rushing to close the ticket quickly.\n\nOver time, as agents build a track record of which types of AI drafts are reliably solid and which types need more editing, review speed naturally increases for the reliable categories — but the review step itself should never be skipped entirely, regardless of how much trust has been built with the tool.`,
          keyPoints: [
            'Three review questions: factually accurate, appropriately toned, and does it resolve the need?',
            'Scale review scrutiny to stakes — routine questions need a scan, high-stakes situations need care.',
            'Review speed can naturally increase with experience, but the step itself should never be skipped.',
            'This is a consolidation of the review discipline built throughout the whole course.'
          ],
          learningObjectives: [
            'Apply a three-question review system before sending any AI-drafted response.',
            'Scale review scrutiny appropriately to the stakes of the situation.'
          ],
        },
        {
          title: 'Protecting Customer Data and Privacy',
          duration: 6,
          content: `Support interactions routinely involve sensitive customer data — order history, payment details, addresses, sometimes health or other personal information relevant to a case. Before pasting a customer's message or account details into an AI tool, apply the same data-handling discipline you'd apply to any system touching customer PII.\n\nPractical safeguards: know your organization's policy and the AI tool's data-retention terms before pasting customer information; never paste full payment card numbers or other highly sensitive identifiers into an AI prompt, even if they appear in the original customer message — redact them first; and when summarizing or categorizing tickets in bulk, consider whether the task actually requires personally identifying details or whether it can be done with de-identified information.\n\nThis matters both for compliance (many industries have specific data-handling regulations) and for customer trust — customers share sensitive information with support expecting it to be handled with the same care as any other part of your business, not treated more loosely just because a new tool is involved.`,
          keyPoints: [
            'Apply the same PII-handling discipline to AI tools that applies to any system touching customer data.',
            'Never paste full payment card numbers or highly sensitive identifiers into an AI prompt — redact first.',
            'Consider whether a task actually requires personally identifying details or can use de-identified data.',
            'Data handling matters for both regulatory compliance and customer trust.'
          ],
          learningObjectives: [
            'Apply data redaction practices before using customer information in AI prompts.',
            'Evaluate whether a support task requires personally identifying details.'
          ],
        },
        {
          title: 'Recognizing AI Limitations',
          duration: 6,
          content: `AI-assisted support has real limits worth naming plainly: it doesn't know your live systems (order status, account state) unless you provide that data — it can't check anything in real time on its own. It can generate a policy-sounding answer that's actually wrong if not grounded in your real policy text. And it has no authority to make exceptions or commitments on the company's behalf — every commitment in an AI-drafted response is really the agent's commitment once it's sent.\n\nA good mental model: AI is a fast writing and thinking assistant, not a system of record and not a decision-maker. Anything requiring live data, real authority, or accountability stays with the human agent, every time — AI supports that work, it doesn't replace the responsibility that comes with it.\n\nBeing clear-eyed about these limits isn't a knock against using AI in support — it's what makes the usage sustainable and safe. Teams that treat AI output as infallible eventually get burned by a confidently-wrong response; teams that treat it as a fast, capable assistant that still needs oversight get the speed benefits without the risk.`,
          keyPoints: [
            'AI has no live access to your systems (order status, account state) unless you provide the data.',
            'AI can generate a plausible-sounding but wrong policy answer if not grounded in real policy text.',
            'AI has no authority to make commitments — every commitment in a sent response is the agent’s.',
            'Treating AI as infallible eventually leads to a confidently-wrong response reaching a customer.'
          ],
          learningObjectives: [
            'Identify the core limitations of AI in a support context.',
            'Explain why accountability for commitments always remains with the human agent.'
          ],
        },
        {
          title: 'Integrating AI into Customer Support Strategy',
          duration: 6,
          content: `As a closing lesson, this brings the course's habits together into a team-level practice: build and maintain a shared prompt template library for common ticket types (Modules 2-5), maintain an accurate, current policy reference to ground every prompt (Module 2), apply consistent review discipline scaled to stakes (this module), and periodically audit for consistency and voice drift across agents (Module 5).\n\nTeams that build this as standard infrastructure — not a one-off training, but living templates and references that get updated as policies change — see AI-assisted support settle into a genuine productivity gain rather than an occasional novelty a few agents happen to use well. The templates from each module's cheat sheet in this course are a starting point; the real value comes from your team customizing and maintaining them against your actual policies and voice over time.\n\nThe transferable skill, as with the earlier courses in this series, is the discipline: specific prompts, grounded in real policy and context, reviewed appropriately for the stakes involved, and continuously refined as a team. That discipline outlasts any single AI tool or interface.`,
          keyPoints: [
            'Build a shared, living template library and policy reference as standard team infrastructure.',
            'This becomes a genuine productivity gain only when maintained, not treated as a one-off training.',
            'Combine templates, grounded policy references, scaled review, and periodic consistency audits.',
            'The transferable skill is the discipline itself, not any single AI tool.'
          ],
          learningObjectives: [
            'Describe how to build AI-assisted support practices into standard team infrastructure.',
            'Explain why living, maintained templates outperform a one-off training approach.'
          ],
          resources: [
            {
              title: 'Module 6 Cheat Sheet: Team Support Playbook Starter',
              type: 'download',
              description: 'A starter structure for a team-wide AI-assisted support playbook, tying together every module’s templates.',
              content: `TEAM SUPPORT PLAYBOOK STARTER\n\n1. Policy Reference: maintain exact, current policy text for your top 10 question types (Module 2).\n2. Template Library: save your best prompts per ticket type — question, complaint, technical, escalation (Modules 2–4).\n3. Voice Examples: keep 3–5 example responses your team is proud of, update quarterly (Module 3).\n4. Review Checklist: policy accuracy → tone fit → no over-promising → scaled to stakes (Modules 1, 6).\n5. Data Handling: know your AI tool’s data policy; redact sensitive identifiers before pasting (Module 6).\n6. Consistency Audit: monthly spot-check of responses across agents for the same ticket types (Module 5).`
            }
          ]
        },
      ],
    },
  ],
  quiz: {
    title: 'Prompt-Based AI for Customer Support and Service Teams — Final Assessment',
    description: 'A 10-question assessment covering support prompting, empathetic responses, and responsible AI use in customer service.',
    passingScore: 70,
    questions: [
      {
        type: 'multiple-choice',
        question: 'What are the three core ingredients of an effective support prompt?',
        options: [
          { text: 'Length, formality, and speed', isCorrect: false },
          { text: 'The customer’s actual message, situation context, and desired outcome', isCorrect: true },
          { text: 'A greeting, a signature, and a closing line', isCorrect: false },
          { text: 'The agent’s name, the date, and the ticket number', isCorrect: false },
        ],
        explanation: 'Pasting the real customer message, providing context, and stating the desired outcome gives the AI what it needs to produce a genuinely useful first draft.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'true-false',
        question: 'It is safe to send an AI-drafted customer response directly without human review, as long as it sounds professional.',
        options: [
          { text: 'True', isCorrect: false },
          { text: 'False', isCorrect: true },
        ],
        correctAnswer: 'False',
        explanation: 'Every AI-drafted response needs human review before sending — a wrong policy detail or off-tone reply can damage customer trust significantly.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'Why should exact policy facts always be spelled out in a support prompt rather than left for the AI to recall?',
        options: [
          { text: 'It makes the prompt longer, which is always better', isCorrect: false },
          { text: 'AI may generate a plausible-sounding but incorrect policy detail if not grounded in real text', isCorrect: true },
          { text: 'It has no real effect on accuracy', isCorrect: false },
          { text: 'Policies never change, so this step is unnecessary', isCorrect: false },
        ],
        explanation: 'An improvised-but-plausible policy answer is a high-risk failure mode — always ground responses in your actual, current policy text.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What should a complaint response include before jumping to a resolution?',
        options: [
          { text: 'A discount code', isCorrect: false },
          { text: 'A specific acknowledgment of the customer’s frustration', isCorrect: true },
          { text: 'A link to the company’s terms of service', isCorrect: false },
          { text: 'A request for a positive review', isCorrect: false },
        ],
        explanation: 'Acknowledging the customer’s specific frustration before offering a resolution makes the response land as considered rather than cold or templated.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'What is a good test for whether an AI-drafted empathetic response is genuinely specific?',
        options: [
          { text: 'Whether it uses the word "sorry" at least twice', isCorrect: false },
          { text: 'Whether the exact sentence could be sent to any complaint regardless of details', isCorrect: true },
          { text: 'Whether it is longer than 100 words', isCorrect: false },
          { text: 'Whether it includes a discount offer', isCorrect: false },
        ],
        explanation: 'If a response could apply to any complaint unchanged, it’s too generic — genuine empathy references the specific situation.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'When drafting an internal escalation note for a manager, what should be included beyond a summary of facts?',
        options: [
          { text: 'A joke to keep it light', isCorrect: false },
          { text: 'A clear recommendation for how to resolve it', isCorrect: true },
          { text: 'The customer’s full payment card number', isCorrect: false },
          { text: 'A copy of the company’s entire policy manual', isCorrect: false },
        ],
        explanation: 'A stated recommendation, not just a fact summary, helps a manager reviewing a busy queue move faster on escalations.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'true-false',
        question: 'Full payment card numbers appearing in a customer message should be redacted before pasting the message into an AI tool.',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false },
        ],
        correctAnswer: 'True',
        explanation: 'Highly sensitive identifiers like full payment card numbers should always be redacted before being included in an AI prompt.',
        points: 1, difficulty: 'easy',
      },
      {
        type: 'multiple-choice',
        question: 'For a difficult customer situation involving a possible policy exception, what is the correct order of AI use and human decision-making?',
        options: [
          { text: 'Let the AI decide the approach, then have a human word the response', isCorrect: false },
          { text: 'A human decides the approach first; AI then helps word the response', isCorrect: true },
          { text: 'AI should never be used for difficult situations at all', isCorrect: false },
          { text: 'It doesn’t matter which comes first', isCorrect: false },
        ],
        explanation: 'For policy exceptions or high-stakes calls, the human decides the approach first, and AI assists with wording the response afterward — not the reverse.',
        points: 1, difficulty: 'hard',
      },
      {
        type: 'multiple-choice',
        question: 'What is the most effective way to maintain consistent brand voice across a support team’s AI-assisted responses?',
        options: [
          { text: 'Describe the desired tone using several adjectives each time', isCorrect: false },
          { text: 'Paste real examples of responses the team is proud of and match that voice', isCorrect: true },
          { text: 'Let each agent decide their own tone independently', isCorrect: false },
          { text: 'Avoid giving any tone instructions to keep things natural', isCorrect: false },
        ],
        explanation: 'Real examples give the AI something concrete to pattern-match against, which is more reliable than describing tone with adjectives alone.',
        points: 1, difficulty: 'medium',
      },
      {
        type: 'multiple-choice',
        question: 'Which of the following is a true limitation of AI in customer support, per this course?',
        options: [
          { text: 'AI has live access to your order and account systems by default', isCorrect: false },
          { text: 'AI has no authority to make commitments — every commitment sent is the agent’s', isCorrect: true },
          { text: 'AI never makes factual errors once trained', isCorrect: false },
          { text: 'AI review can be safely skipped once an agent trusts the tool', isCorrect: false },
        ],
        explanation: 'AI has no live system access unless provided and no authority of its own — accountability for any commitment made in a sent response stays with the human agent.',
        points: 1, difficulty: 'medium',
      },
    ],
  },
};
