import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

// Only run on the admin back-office (public site needs no auth).
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
