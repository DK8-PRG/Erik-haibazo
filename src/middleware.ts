import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const preferred = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q] = lang.trim().split(";q=");
      return {
        code: code.split("-")[0].toLowerCase(),
        q: q ? parseFloat(q) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of preferred) {
    if (locales.includes(code as (typeof locales)[number])) {
      return code;
    }
  }

  return defaultLocale;
}

function basicAuth(request: NextRequest): NextResponse | null {
  const sitePassword = process.env.SITE_PASSWORD;
  // Pokud není heslo nastaveno, ochrana je vypnutá
  if (!sitePassword) return null;

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    const encoded = authHeader.split(" ")[1] ?? "";
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const [, password] = decoded.split(":");
    if (password === sitePassword) return null; // OK
  }

  return new NextResponse("Přístup odepřen", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Haibazo — preview", charset="UTF-8"',
    },
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip studio, api, _next, static files, and /links (clean share URL)
  if (
    pathname.startsWith("/studio") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/links" ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Basic Auth ochrana (aktivní pokud je nastaven SITE_PASSWORD v env)
  const authResponse = basicAuth(request);
  if (authResponse) return authResponse;

  // Check if pathname already starts with a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to locale-prefixed URL
  const locale = getLocaleFromHeaders(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|studio|api|.*\\..*).*)"],
};
