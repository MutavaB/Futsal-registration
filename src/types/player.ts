export type KenyaRegion =
  | "Nairobi"
  | "Mombasa"
  | "Kisumu"
  | "Nakuru"
  | "Eldoret"
  | "Thika"
  | "Malindi"
  | "Kitale"
  | "Garissa"
  | "Kakamega"
  | "Nyeri"
  | "Machakos"
  | "Meru"
  | "Kisii"
  | "Kericho"
  | "Other";

export type PlayerPosition =
  | "Goalkeeper"
  | "Fixo (Defender)"
  | "Ala (Winger)"
  | "Pivot (Forward)"
  | "Universal";

export type PlayerStatus = "Active" | "Inactive" | "Pending";

export interface Player {
  id: string;
  // Personal Info
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  gender: "Male" | "Female";
  nationality: string;

  // Location
  region: KenyaRegion;
  county: string;
  town: string;

  // Contact
  contactNumber: string;
  email: string;
  contactPersonName: string;
  contactPersonNumber: string;
  contactPersonRelation: string;

  // Football Info
  position: PlayerPosition;
  preferredFoot: "Left" | "Right" | "Both";
  yearsExperience: number;
  previousClub?: string;

  // Status
  status: PlayerStatus;
  registrationDate: string;
  registrationNumber: string;
}

export type PlayerFormData = Omit<Player, "id" | "status" | "registrationDate" | "registrationNumber">;
