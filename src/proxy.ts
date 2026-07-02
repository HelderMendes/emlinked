import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import redirectsData from './redirects.json'

const redirectsMap = redirectsData as Record<string, { destination: string; status: number }>

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  
  // Normalize the pathname (force lowercase and strip trailing slash)
  let pathname = url.pathname.toLowerCase()
  if (pathname.endsWith('/') && pathname !== '/') {
    pathname = pathname.slice(0, -1)
  }

  // Also build absolute URL matching keys for both domains
  const host = request.headers.get('host') || ''
  const isLegacyDomain = host.includes('emlinked.nl')

  // Bypass root homepage redirects unless visiting the legacy domain
  if (pathname === '/' && !isLegacyDomain) {
    return NextResponse.next()
  }
  
  // Resolve mapping key (relative or absolute)
  const legacyAbsoluteUrl = `https://www.emlinked.nl${pathname}${url.search}`
  const legacyAbsoluteUrlNoSearch = `https://www.emlinked.nl${pathname}`
  
  // Check for matches in redirectsMap
  let redirect = redirectsMap[legacyAbsoluteUrl] || 
                 redirectsMap[legacyAbsoluteUrlNoSearch] || 
                 redirectsMap[pathname]

  if (redirect) {
    // If it's a 410 (Gone) status code, return it directly
    if (redirect.status === 410) {
      return new NextResponse(null, { status: 410 })
    }

    if (redirect.destination) {
      const destinationUrl = new URL(redirect.destination, 'https://www.emlinked.com')
      // Preserve query parameters if target doesn't override them
      if (!redirect.destination.includes('?')) {
        destinationUrl.search = url.search
      }
      return NextResponse.redirect(destinationUrl, {
        status: redirect.status,
      })
    }
  }

  // Handle global domain-level fallback from .nl to .com for non-mapped URLs
  if (isLegacyDomain) {
    const targetUrl = new URL(url.pathname + url.search, 'https://www.emlinked.com')
    return NextResponse.redirect(targetUrl, 301)
  }

  return NextResponse.next()
}

export const config = {
  // Run proxy on all pathnames except assets, api, and next internals
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - studio (Sanity Studio routes)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|studio).*)',
  ],
}
