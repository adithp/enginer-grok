import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    // Step 1: Rephrase the prompt for technical accuracy
    const rephraseModel = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp" 
    });
    
    const rephrasePrompt = `Rephrase the following user query to optimize it for Technical Accuracy and Engineering Context. Make it more precise, technical, and engineering-focused. Only return the rephrased query, nothing else.

User Query: ${message}`;

    const rephraseResult = await rephraseModel.generateContent(rephrasePrompt);
    const rephrasedQuery = rephraseResult.response.text().trim();

    // Step 2: Generate response with engineering persona
    const responseModel = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp" 
    });

    const engineerPrompt = `You are a Senior Professional AI Software Engineer with extensive experience in system design, software architecture, and engineering best practices. Your responses should be:
- Technical and precise
- Efficient and to-the-point
- Based on engineering principles and best practices
- Professional and expert-level

User Query: ${rephrasedQuery}

Provide a comprehensive, technically accurate response:`;

    const responseResult = await responseModel.generateContentStream(engineerPrompt);

    // Create a readable stream for the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // First, send the rephrased query
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              type: "rephrase",
              content: rephrasedQuery,
            }) + "\n"
          )
        );

        // Then stream the response
        for await (const chunk of responseResult.stream) {
          const text = chunk.text();
          controller.enqueue(
            encoder.encode(
              JSON.stringify({
                type: "response",
                content: text,
              }) + "\n"
            )
          );
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
