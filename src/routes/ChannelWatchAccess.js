// Contract shared by the viewer UI and the future server endpoint.
// IMPORTANT: this is a display-only shape; never authorize paid playback client-side.
// GET /api/watch/:id/access must independently verify Firebase ID token,
// entitlement, session limits and payment status, and return a short-lived URL.
// Response: { allowed: boolean, playbackUrl?: string, access?: 'free'|'credits'|'subscription', reason?: string }.
export function isTrustedPlaybackUrl(value) {
  if (typeof value !== 'string') return false
  try {
    const url = new URL(value)
    return url.protocol === 'https:' && url.hostname === 'iframe.videodelivery.net'
  } catch {
    return false
  }
}
