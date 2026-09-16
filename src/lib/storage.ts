"use client";
import { Player } from "@/types/player";

const STORAGE_KEY = "futsal_kenya_players";

export function getPlayers(): Player[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Player[]) : [];
  } catch {
    return [];
  }
}

export function savePlayer(player: Player): void {
  const players = getPlayers();
  players.unshift(player); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}

export function generateRegNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `FKUK-${year}-${rand}`;
}

export function deletePlayer(id: string): void {
  const players = getPlayers().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
}
