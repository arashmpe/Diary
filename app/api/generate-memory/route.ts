import { fal } from '@ai-sdk/fal';
import { groq } from '@ai-sdk/groq';
import { experimental_generateImage as generateImage, generateText } from 'ai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { memoryText } = await request.json();

    if (!memoryText) {
      return NextResponse.json({ error: 'Memory text is required' }, { status: 400 });
    }

    const [imageGenerationResult, textGenerationResult] = await Promise.all([
      generateImage({
        model: fal.image('fal-ai/fast-sdxl'),
        prompt: `A cinematic, highly-detailed digital painting illustrating the memory: "${memoryText}". Capture the mood, setting, atmosphere, and emotional tone. Use vibrant colors, dynamic lighting, and rich textures to create an immersive, storytelling scene.`,
      }),

      generateText({
        model: groq('llama3-8b-8192'),
        prompt: `Based on the following memory, create a suitable title and a one-sentence caption.
        Your response MUST be in this exact format:
        Title: [The generated title]
        Caption: [The generated caption]

        Memory: "${memoryText}"`,
      }),
    ]);

    const rawText = textGenerationResult.text;
    let title = 'AI-Generated Art';
    let caption = 'A visual representation of a memory.';

    const titleMatch = rawText.match(/Title: (.*)/);
    const captionMatch = rawText.match(/Caption: (.*)/);

    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1].trim();
    }
    if (captionMatch && captionMatch[1]) {
      caption = captionMatch[1].trim();
    }

    return NextResponse.json({
      image: imageGenerationResult.image.base64,
      title: title,
      caption: caption,
    });
  } catch (error) {
    console.error('Error in generate-memory API:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
      { error: `Failed to generate memory: ${errorMessage}` },
      { status: 500 }
    );
  }
}
