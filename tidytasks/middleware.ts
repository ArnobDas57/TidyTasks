import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh the session (important!)
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return res;
}

// Apply middleware only to these protected routes
export const config = {
  matcher: [
    /**
     * Match all routes EXCEPT:
     * - /
     * - /login
     * - /register
     * - static files (/_next, /favicon, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|login|register|$).*)",
  ],
};
