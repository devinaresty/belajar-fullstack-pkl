export function getSessionId(): string {
  const KEY = 'sessionId'
  let s = localStorage.getItem(KEY)
  if (!s) {
    s = 'guest-' + Math.random().toString(36).slice(2, 8)
    localStorage.setItem(KEY, s)
  }
  return s
}
