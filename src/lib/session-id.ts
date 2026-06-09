export function getClientSessionId(): string {
  if (typeof document === "undefined") return "guest";
  const match = document.cookie.match(/(?:^|;\s*)session_id=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "guest";
}
