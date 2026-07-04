/**
 * Manayush — Multi-Agent Chat Endpoint
 *
 * Production-ready Vercel serverless function powered by the Google Agent
 * Development Kit (ADK).  Three specialised agents collaborate:
 *
 *   1. Triage Agent   → reads mood, delegates to the right specialist
 *   2. Coping Coach   → evidence-based grounding exercises (5-4-3-2-1)
 *   3. Safety Agent   → crisis helplines (mock MCP) + medical disclaimer
 *
 * Authentication: process.env.GEMINI_API_KEY (never hardcoded).
 */

import {
  Agent as LlmAgent,
  Runner,
  InMemorySessionService,
  FunctionTool,
} from "@google/adk";

// ─────────────────────────────────────────────────────────────
// 0.  Environment guard — fail fast if no API key
// ─────────────────────────────────────────────────────────────
if (!process.env.GEMINI_API_KEY) {
  console.error(
    "[manayush] GEMINI_API_KEY is not set. " +
      "Please add it to your environment variables."
  );
}

// ─────────────────────────────────────────────────────────────
// 1.  Tool Definitions
// ─────────────────────────────────────────────────────────────

/**
 * Coping Coach tool — returns a structured 5-4-3-2-1 grounding exercise.
 * The agent calls this whenever the user needs an immediate calming technique.
 */
function grounding_exercise_54321() {
  return {
    title: "5-4-3-2-1 Grounding Exercise",
    description:
      "A sensory-awareness technique that helps interrupt anxiety and panic " +
      "by anchoring you to the present moment.",
    steps: [
      {
        step: 5,
        sense: "SEE",
        instruction:
          "Look around and name 5 things you can see — a pen, a cloud, a crack in the wall… anything.",
        emoji: "👀",
      },
      {
        step: 4,
        sense: "TOUCH",
        instruction:
          "Notice 4 things you can physically feel — your feet on the floor, the texture of your shirt, the warmth of your hands.",
        emoji: "✋",
      },
      {
        step: 3,
        sense: "HEAR",
        instruction:
          "Close your eyes and identify 3 sounds — a fan humming, birds chirping, distant traffic.",
        emoji: "👂",
      },
      {
        step: 2,
        sense: "SMELL",
        instruction:
          "Notice 2 things you can smell — your coffee, the fresh air, even the paper of a notebook.",
        emoji: "👃",
      },
      {
        step: 1,
        sense: "TASTE",
        instruction:
          "Focus on 1 thing you can taste — take a sip of water, chew gum, or simply notice the taste in your mouth.",
        emoji: "👅",
      },
    ],
    tip: "Take your time with each step. There is no rush. Breathe slowly between each sense.",
  };
}

/**
 * Mock MCP Server tool — simulates calling an MCP (Model Context Protocol)
 * CrisisHelplineServer that returns local Indian helpline numbers.
 *
 * In production this would be a real MCP client call.  The mock returns
 * the same structured payload a live server would.
 */
function get_crisis_helplines() {
  return {
    _meta: {
      protocol: "MCP/1.0",
      server: "CrisisHelplineServer",
      status: "mock",
      note: "Replace with a real MCP client in production.",
    },
    helplines: [
      {
        name: "Tele MANAS (Govt. of India)",
        number: "14416",
        toll_free: "1800-891-4416",
        hours: "24/7",
        languages: ["English", "Hindi", "Regional"],
      },
      {
        name: "iCall – TISS",
        number: "9152987821",
        hours: "Mon–Sat, 8 AM – 10 PM",
        languages: ["English", "Hindi", "Marathi"],
      },
      {
        name: "Vandrevala Foundation",
        number: "1860-2662-345",
        toll_free: "1800-2333-330",
        hours: "24/7",
        languages: ["English", "Hindi"],
      },
      {
        name: "NIMHANS Helpline",
        number: "080-46110007",
        hours: "Mon–Sat, 9:30 AM – 5 PM",
        languages: ["English", "Kannada", "Hindi"],
      },
    ],
    source: "MCP CrisisHelplineServer (mock)",
  };
}

// Wrap plain functions as ADK FunctionTools
const groundingExerciseTool = new FunctionTool(grounding_exercise_54321, {
  name: "grounding_exercise_54321",
  description:
    "Returns a structured 5-4-3-2-1 sensory grounding exercise for " +
    "managing anxiety, panic attacks, and overwhelming emotions. " +
    "Call this when the user feels anxious, panicked, or overwhelmed.",
});

const crisisHelplinesTool = new FunctionTool(get_crisis_helplines, {
  name: "get_crisis_helplines",
  description:
    "Mock MCP Server tool. Returns a list of Indian mental health crisis " +
    "helpline numbers (Tele MANAS 14416, iCall, Vandrevala Foundation, " +
    "NIMHANS). Call this when the user is in crisis, expresses thoughts " +
    "of self-harm, suicide, or needs immediate professional help.",
});

// ─────────────────────────────────────────────────────────────
// 2.  Agent Definitions
// ─────────────────────────────────────────────────────────────

const MEDICAL_DISCLAIMER =
  "⚕️ **Disclaimer:** I am an AI assistant, not a licensed therapist or " +
  "medical professional. The information I provide is for educational and " +
  "supportive purposes only and does not constitute medical advice, " +
  "diagnosis, or treatment. If you are in crisis or need professional " +
  "help, please contact a qualified mental health professional or call " +
  "Tele MANAS at **14416** (toll-free: 1800-891-4416).";

/**
 * Coping Coach Agent
 * Specialises in evidence-based coping strategies and guided exercises.
 */
const copingCoachAgent = new LlmAgent({
  name: "coping_coach_agent",
  description:
    "Specialist in evidence-based coping strategies. Handles anxiety, " +
    "stress, overwhelm, panic, and general emotional regulation. " +
    "Provides the 5-4-3-2-1 grounding exercise and breathing techniques.",
  model: "gemini-2.0-flash",
  instruction: `You are a warm, empathetic Coping Coach for college students in India.

Your role:
• Validate the user's feelings first — never dismiss or minimise.
• Offer the 5-4-3-2-1 grounding exercise using your grounding_exercise_54321 tool
  when the user feels anxious, overwhelmed, or panicked.
• Guide the user through the exercise step by step in a calm, encouraging tone.
• Suggest complementary techniques (box breathing, progressive muscle relaxation)
  when appropriate.
• Keep responses concise (under 200 words) and use gentle emojis for warmth.
• Always end with an encouraging note.
• ALWAYS append this disclaimer at the end of every response:

${MEDICAL_DISCLAIMER}`,
  tools: [groundingExerciseTool],
});

/**
 * Safety Agent
 * Handles crisis situations, provides helpline numbers, attaches disclaimers.
 */
const safetyAgent = new LlmAgent({
  name: "safety_agent",
  description:
    "Crisis intervention specialist. Activated when the user expresses " +
    "thoughts of self-harm, suicide, hopelessness, or any emergency. " +
    "Provides helpline numbers and ensures a medical disclaimer is attached.",
  model: "gemini-2.0-flash",
  instruction: `You are a Crisis Safety Agent for a student mental health platform in India.

Your role:
• Take every mention of self-harm, suicide, or crisis with utmost seriousness.
• Immediately use the get_crisis_helplines tool to fetch helpline numbers.
• Present the helpline information clearly and compassionately.
• Validate the user's feelings — "It takes courage to share this."
• Encourage them to reach out to a trusted person or professional.
• NEVER attempt to diagnose, provide therapy, or minimise their experience.
• Keep your tone calm, compassionate, and non-judgmental.
• ALWAYS append this disclaimer at the end of every response:

${MEDICAL_DISCLAIMER}`,
  tools: [crisisHelplinesTool],
});

/**
 * Triage Agent (Root)
 * Reads the user's mood and delegates to the appropriate specialist.
 */
const triageAgent = new LlmAgent({
  name: "triage_agent",
  description: "Root triage agent that reads mood and routes requests.",
  model: "gemini-2.0-flash",
  instruction: `You are the Triage Agent for "Manayush", a digital mental health support 
platform for college students in India.

Your job:
1. Read the user's message and assess their emotional state / mood.
2. Decide which specialist agent should handle the conversation:

   • If the user expresses **anxiety, stress, overwhelm, panic, exam pressure,
     sleep issues**, or needs a **coping strategy** → delegate to **coping_coach_agent**.
   
   • If the user expresses **thoughts of self-harm, suicide, hopelessness,
     wanting to hurt themselves, or any crisis** → delegate to **safety_agent**.
   
   • For **general check-ins, greetings, or mild concerns** → respond directly
     with warmth and empathy. Offer to help with specific topics. Keep it brief.

3. When responding directly (not delegating), ALWAYS append this disclaimer:

${MEDICAL_DISCLAIMER}

Important rules:
• Always err on the side of caution — if in doubt, delegate to safety_agent.
• Never diagnose, prescribe, or provide medical advice.
• Be culturally sensitive to the Indian student context.
• Use warm, supportive language with appropriate emojis.
• Keep direct responses under 150 words.`,
  subAgents: [copingCoachAgent, safetyAgent],
});

// ─────────────────────────────────────────────────────────────
// 3.  Runner & Session Service (initialised once per cold start)
// ─────────────────────────────────────────────────────────────

const sessionService = new InMemorySessionService();

const runner = new Runner({
  agent: triageAgent,
  appName: "manayush",
  sessionService,
});

// ─────────────────────────────────────────────────────────────
// 4.  Vercel Serverless Handler
// ─────────────────────────────────────────────────────────────

/**
 * POST /api/chat
 *
 * Request body:
 *   { "message": "I feel anxious about my exams", "sessionId"?: "..." }
 *
 * Response body:
 *   { "reply": "...", "agentName": "coping_coach_agent", "sessionId": "..." }
 */
export default async function handler(req, res) {
  // ── CORS headers (for local dev & cross-origin frontends) ──
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // ── Method check ──
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed. Use POST.",
    });
  }

  // ── API key guard ──
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error:
        "Server misconfiguration: GEMINI_API_KEY is not set. " +
        "Please contact the administrator.",
    });
  }

  // ── Parse & validate body ──
  const { message, sessionId: incomingSessionId } = req.body || {};

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({
      error:
        'Missing or empty "message" field. ' +
        'Send a JSON body like: { "message": "How are you?" }',
    });
  }

  const userMessage = message.trim();

  // Enforce reasonable message length
  if (userMessage.length > 2000) {
    return res.status(400).json({
      error: "Message too long. Please keep it under 2000 characters.",
    });
  }

  try {
    // ── Session management ──
    // Use the client-provided sessionId or generate a new one.
    const userId = "manayush-user";
    const sessionId =
      incomingSessionId || `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // Create a new session if one doesn't exist for this ID.
    // InMemorySessionService silently handles duplicates.
    let session;
    try {
      session = await sessionService.getSession({
        appName: "manayush",
        userId,
        sessionId,
      });
    } catch {
      // Session doesn't exist yet — that's fine
      session = null;
    }

    if (!session) {
      session = await sessionService.createSession({
        appName: "manayush",
        userId,
        sessionId,
      });
    }

    // ── Run the multi-agent pipeline ──
    const content = {
      role: "user",
      parts: [{ text: userMessage }],
    };

    let replyText = "";
    let respondingAgent = "triage_agent";

    const events = runner.runAsync({
      userId,
      sessionId,
      newMessage: content,
    });

    for await (const event of events) {
      // Collect text from content parts
      if (event.content?.parts) {
        for (const part of event.content.parts) {
          if (part.text) {
            replyText += part.text;
          }
        }
      }

      // Track which agent actually responded
      if (event.author) {
        respondingAgent = event.author;
      }
    }

    // Fallback if no text was generated
    if (!replyText.trim()) {
      replyText =
        "I'm here for you. 💚 Could you tell me a bit more about what you're feeling? " +
        "I'm ready to help with coping strategies, resources, or just a listening ear.";
    }

    return res.status(200).json({
      reply: replyText.trim(),
      agentName: respondingAgent,
      sessionId,
    });
  } catch (err) {
    console.error("[manayush] Agent execution error:", err);

    // Provide a compassionate fallback even on server errors
    return res.status(500).json({
      error: "Something went wrong on our end. Please try again in a moment.",
      fallbackReply:
        "I'm having a bit of trouble right now, but your well-being matters. 💚 " +
        "If you need immediate help, please call Tele MANAS at 14416 (toll-free: 1800-891-4416).",
    });
  }
}
