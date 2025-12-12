import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const { POST: originalPOST, GET: originalGET } = toNextJsHandler(auth);


function withCors(response: Response, request: NextRequest) {
  const origin = request.headers.get('origin') || 'http://localhost:3001';
  const newResponse = new NextResponse(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', origin);
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  newResponse.headers.set('Access-Control-Allow-Credentials', 'true');
  return newResponse;
}


export async function GET(request: NextRequest) {
  const response = await originalGET(request);
  return withCors(response, request);
}

export async function POST(request: NextRequest) {
  const response = await originalPOST(request);
  return withCors(response, request);
}


export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || 'http://localhost:3001';
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}