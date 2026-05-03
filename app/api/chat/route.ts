import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { getQuestionById } from "@/lib/questions";

export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    questionId,
  }: { messages: UIMessage[]; questionId: number } = await req.json();

  const question = getQuestionById(questionId);
  if (!question) {
    return new Response("Invalid question id", { status: 400 });
  }

  const correctChoice = question.choices[question.answerIndex];
  const choicesList = question.choices
    .map((c, i) => `${i + 1}. ${c}`)
    .join("\n");

  const system = `You are a friendly Minecraft trivia hint assistant inside a game called TriviaCraft. The player is currently on this question:

"${question.prompt}"

Choices:
${choicesList}

The correct answer is: "${correctChoice}".

Rules — follow strictly:
- NEVER state the correct answer directly.
- NEVER say "the answer is X", "it's choice N", "pick option N", or anything that reveals which choice is correct.
- Give Socratic hints — nudge the player toward the answer through reasoning, related Minecraft lore, or process-of-elimination cues.
- If the player explicitly asks for the answer, refuse politely and offer a stronger hint instead.
- Keep responses to 1–3 short sentences. Be playful, use Minecraft flavor.
- If the player asks something unrelated to Minecraft or this question, gently steer back to the trivia.`;

  const result = streamText({
    model: "anthropic/claude-haiku-4-5",
    system,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
