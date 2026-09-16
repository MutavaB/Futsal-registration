import { supabase } from "@/lib/supabase";
import { Player } from "@/types/player";

export async function getPlayers(): Promise<Player[]> {
  const { data, error } = await supabase
    .from("players")
    .select("*")
    .order("registration_date", { ascending: false });

  if (error) {
    console.error("Error fetching players:", error.message);
    return [];
  }
  return (data ?? []).map(dbToPlayer);
}

export async function savePlayer(player: Player): Promise<void> {
  const { error } = await supabase.from("players").insert([playerToDb(player)]);
  if (error) throw new Error(error.message);
}

export async function deletePlayer(id: string): Promise<void> {
  const { error } = await supabase.from("players").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function updatePlayerStatus(
  id: string,
  status: Player["status"]
): Promise<void> {
  const { error } = await supabase
    .from("players")
    .update({ status })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export function generateRegNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `FKUK-${year}-${rand}`;
}

// ── Map DB snake_case → Player camelCase ──────────────────────────────────────
function dbToPlayer(row: Record<string, unknown>): Player {
  return {
    id:                    row.id as string,
    firstName:             row.first_name as string,
    lastName:              row.last_name as string,
    age:                   row.age as number,
    dateOfBirth:           row.date_of_birth as string,
    gender:                row.gender as Player["gender"],
    nationality:           row.nationality as string,
    region:                row.region as Player["region"],
    county:                row.county as string,
    town:                  row.town as string,
    contactNumber:         row.contact_number as string,
    email:                 row.email as string,
    contactPersonName:     row.contact_person_name as string,
    contactPersonNumber:   row.contact_person_number as string,
    contactPersonRelation: row.contact_person_relation as string,
    position:              row.position as Player["position"],
    preferredFoot:         row.preferred_foot as Player["preferredFoot"],
    yearsExperience:       row.years_experience as number,
    previousClub:          (row.previous_club as string) ?? undefined,
    status:                row.status as Player["status"],
    registrationDate:      row.registration_date as string,
    registrationNumber:    row.registration_number as string,
  };
}

// ── Map Player camelCase → DB snake_case ──────────────────────────────────────
function playerToDb(p: Player): Record<string, unknown> {
  return {
    id:                     p.id,
    first_name:             p.firstName,
    last_name:              p.lastName,
    age:                    p.age,
    date_of_birth:          p.dateOfBirth,
    gender:                 p.gender,
    nationality:            p.nationality,
    region:                 p.region,
    county:                 p.county,
    town:                   p.town,
    contact_number:         p.contactNumber,
    email:                  p.email,
    contact_person_name:    p.contactPersonName,
    contact_person_number:  p.contactPersonNumber,
    contact_person_relation: p.contactPersonRelation,
    position:               p.position,
    preferred_foot:         p.preferredFoot,
    years_experience:       p.yearsExperience,
    previous_club:          p.previousClub ?? null,
    status:                 p.status,
    registration_date:      p.registrationDate,
    registration_number:    p.registrationNumber,
  };
}
