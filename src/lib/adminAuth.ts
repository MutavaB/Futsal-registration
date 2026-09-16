// Client-side admin auth using sessionStorage
// Password is set via NEXT_PUBLIC_ADMIN_PASSWORD env var on Vercel
// Falls back to "futsal2026" for local dev

const SESSION_KEY = "futsal_admin_authed";

function getAdminPassword(): string {
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "futsal2026";
}

export function adminLogin(password: string): boolean {
  const correct = getAdminPassword();
  if (password === correct) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, "true");
    }
    return true;
  }
  return false;
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function adminLogout(): void {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(SESSION_KEY);
  }
}
