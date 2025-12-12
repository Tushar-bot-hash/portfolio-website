import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const { POST: originalPOST, GET: originalGET } = toNextJsHandler(auth);

// Helper to add CORS headers
function withCors(response: Response) {
  const newResponse = new NextResponse(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', 'http://localhost:3001');
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  newResponse.headers.set('Access-Control-Allow-Credentials', 'true');
  return newResponse;
}

// Export wrapped handlers with CORS
export async function GET(request: NextRequest) {
  const response = await originalGET(request);
  return withCors(response);
}

export async function POST(request: NextRequest) {
  const response = await originalPOST(request);
  return withCors(response);
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3001',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}