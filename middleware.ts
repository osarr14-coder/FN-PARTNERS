import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // L'espace admin (/admin) reste hors i18n — outil interne, une seule langue —
  // et gère sa propre session Supabase plutôt que le routing next-intl.
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return updateSession(request);
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
