import { z } from "zod";

export const playerSchema = z.object({
  // Personal
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "First name can only contain letters"),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s'-]+$/, "Last name can only contain letters"),

  age: z
    .number({ invalid_type_error: "Age is required" })
    .int()
    .min(10, "Player must be at least 10 years old")
    .max(60, "Age seems too high"),

  dateOfBirth: z.string().min(1, "Date of birth is required"),

  gender: z.enum(["Male", "Female"], {
    required_error: "Please select a gender",
  }),

  nationality: z.string().min(2, "Nationality is required"),

  // Location
  region: z.enum(
    [
      "Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Thika",
      "Malindi","Kitale","Garissa","Kakamega","Nyeri","Machakos",
      "Meru","Kisii","Kericho","Other",
    ],
    { required_error: "Please select your region" }
  ),

  county: z.string().min(2, "County is required"),
  town: z.string().min(2, "Town/City is required"),

  // Contact
  contactNumber: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Phone number is too long")
    .regex(/^[\+]?[0-9\s\-()]+$/, "Invalid phone number format"),

  email: z.string().email("Enter a valid email address"),

  contactPersonName: z
    .string()
    .min(2, "Contact person name is required")
    .max(100),

  contactPersonNumber: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[\+]?[0-9\s\-()]+$/, "Invalid phone number format"),

  contactPersonRelation: z.string().min(2, "Relation is required"),

  // Football Info
  position: z.enum(
    ["Goalkeeper", "Fixo (Defender)", "Ala (Winger)", "Pivot (Forward)", "Universal"],
    { required_error: "Please select a position" }
  ),

  preferredFoot: z.enum(["Left", "Right", "Both"], {
    required_error: "Please select preferred foot",
  }),

  yearsExperience: z
    .number({ invalid_type_error: "Years of experience is required" })
    .int()
    .min(0, "Cannot be negative")
    .max(40, "Value seems too high"),

  previousClub: z.string().optional(),
});

export type PlayerSchemaType = z.infer<typeof playerSchema>;
