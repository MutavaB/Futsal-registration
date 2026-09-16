"use client";

const SESSION_KEY = "futsal_admin_authed";
const ADMIN_PASSWORD = "futsal2026"; // change this to a strong password

export function adminLogin(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "true");
    return true;
  }
  return false;
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

export function adminLogout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
