import { NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN as string,
    });
    
    const model = "cjwbw/rembg:fb8af171cfa1616ddcf1242c093f9c46bcada5ad4cf6f2fbe8b81b330ec5c003";
    const input = { image: req.image };
    
    const output = await replicate.run(model, { input });
    
    if (!output) {
      console.error("Replicate returned null output");
      return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
    }
    
    console.log("OUTPUT: ", output);
    return NextResponse.json({ output }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ 
      error: "An error occurred", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}