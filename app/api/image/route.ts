import { gateway, generateImage } from "ai";
import { getQuestionById } from "@/lib/questions";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { questionId }: { questionId: number } = await req.json();

  const question = getQuestionById(questionId);
  if (!question) {
    return new Response("Invalid question id", { status: 400 });
  }

  const answer = question.choices[question.answerIndex];
  const prompt = `Voxel pixel-art illustration of: ${answer}. Blocky cube-game aesthetic, vibrant saturated colors, centered subject on a simple flat background. No text or letters in the image.`;

  try {
    const result = await generateImage({
      model: gateway.imageModel("openai/gpt-image-1-mini"),
      prompt,
      size: "1024x1024",
    });

    return Response.json({
      dataUrl: `data:${result.image.mediaType};base64,${result.image.base64}`,
      caption: answer,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Image generation failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
