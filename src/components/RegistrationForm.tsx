"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { playerSchema, PlayerSchemaType } from "@/lib/schema";
import { savePlayer, generateRegNumber } from "@/lib/storage";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Player, KenyaRegion, PlayerPosition } from "@/types/player";
import { v4 as uuidv4 } from "uuid";
import FormField from "@/components/FormField";
import { CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";

const regions: KenyaRegion[] = [
  "Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Thika",
  "Malindi","Kitale","Garissa","Kakamega","Nyeri","Machakos",
  "Meru","Kisii","Kericho","Other",
];

const positions: PlayerPosition[] = [
  "Goalkeeper","Fixo (Defender)","Ala (Winger)","Pivot (Forward)","Universal",
];

const steps = [
  { id: 1, title: "Personal Info",  desc: "Basic details about you"   },
  { id: 2, title: "Location",       desc: "Your region in Kenya"       },
  { id: 3, title: "Contact",        desc: "How to reach you"           },
  { id: 4, title: "Football Info",  desc: "Your playing profile"       },
];

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<Player | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<PlayerSchemaType>({
    resolver: zodResolver(playerSchema),
    mode: "onBlur",
    defaultValues: { nationality: "Kenyan", yearsExperience: 0 },
  });

  const stepFields: Record<number, (keyof PlayerSchemaType)[]> = {
    1: ["firstName","lastName","age","dateOfBirth","gender","nationality"],
    2: ["region","county","town"],
    3: ["contactNumber","email","contactPersonName","contactPersonNumber","contactPersonRelation"],
    4: ["position","preferredFoot","yearsExperience"],
  };

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, 4));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: PlayerSchemaType) => {
    setSubmitting(true);
    try {
      if (!isSupabaseConfigured()) {
        throw new Error("Database not configured. Please contact the administrator.");
      }
      const player: Player = {
        ...data,
        id: uuidv4(),
        status: "Pending",
        registrationDate: new Date().toISOString(),
        registrationNumber: generateRegNumber(),
      };
      await savePlayer(player);
      setSuccess(player);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Registration failed. Please try again.";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success Screen ── */
  if (success) {
    return (
      <div className="card p-10 text-center max-w-lg mx-auto border-t-4 border-futsal-red">
        <div className="w-20 h-20 bg-futsal-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-futsal-red" />
        </div>
        <h2 className="text-2xl font-black text-futsal-navy mb-2">Registration Successful!</h2>
        <p className="text-gray-500 mb-6">
          Welcome to Futsal UK Kenya,{" "}
          <strong className="text-futsal-navy">{success.firstName} {success.lastName}</strong>!
        </p>
        <div className="bg-futsal-gray rounded-xl p-5 text-left space-y-2 mb-8 border border-futsal-red/20">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Registration No.</span>
            <span className="font-mono font-bold text-futsal-navy">{success.registrationNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status</span>
            <span className="text-orange-600 font-semibold">Pending Review</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Region</span>
            <span className="font-semibold">{success.region}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Contact</span>
            <span className="font-semibold">{success.contactNumber}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Email</span>
            <span className="font-semibold truncate max-w-[200px]">{success.email}</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Keep your registration number safe. Our team will be in touch shortly.
        </p>
        <Link href="/register" className="btn-primary inline-block">
          Register Another Player
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-futsal-red z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-1.5">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
                s.id < step  ? "bg-futsal-red border-futsal-red text-white"
                : s.id === step ? "bg-futsal-navy border-futsal-navy text-white ring-4 ring-futsal-navy/20"
                : "bg-white border-gray-300 text-gray-400"
              }`}>
                {s.id < step ? "✓" : s.id}
              </div>
              <span className={`text-xs font-semibold hidden sm:block ${s.id === step ? "text-futsal-navy" : "text-gray-400"}`}>
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card p-6 md:p-8 border-t-4 border-futsal-red">
          <div className="mb-6">
            <p className="text-xs font-bold text-futsal-red uppercase tracking-widest mb-1">
              Step {step} of {steps.length}
            </p>
            <h2 className="text-2xl font-black text-futsal-navy">{steps[step - 1].title}</h2>
            <p className="text-gray-400 text-sm">{steps[step - 1].desc}</p>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="First Name" required error={errors.firstName?.message}>
                <input {...register("firstName")} className={`input-field ${errors.firstName ? "input-error" : ""}`} placeholder="e.g. James" />
              </FormField>
              <FormField label="Last Name" required error={errors.lastName?.message}>
                <input {...register("lastName")} className={`input-field ${errors.lastName ? "input-error" : ""}`} placeholder="e.g. Kamau" />
              </FormField>
              <FormField label="Age" required error={errors.age?.message}>
                <input type="number" {...register("age", { valueAsNumber: true })} className={`input-field ${errors.age ? "input-error" : ""}`} placeholder="e.g. 22" min={10} max={60} />
              </FormField>
              <FormField label="Date of Birth" required error={errors.dateOfBirth?.message}>
                <input type="date" {...register("dateOfBirth")} className={`input-field ${errors.dateOfBirth ? "input-error" : ""}`} />
              </FormField>
              <FormField label="Gender" required error={errors.gender?.message}>
                <select {...register("gender")} className={`input-field ${errors.gender ? "input-error" : ""}`}>
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </FormField>
              <FormField label="Nationality" required error={errors.nationality?.message}>
                <input {...register("nationality")} className={`input-field ${errors.nationality ? "input-error" : ""}`} placeholder="e.g. Kenyan" />
              </FormField>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Region" required error={errors.region?.message}>
                <select {...register("region")} className={`input-field ${errors.region ? "input-error" : ""}`}>
                  <option value="">Select your region</option>
                  {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </FormField>
              <FormField label="County" required error={errors.county?.message}>
                <input {...register("county")} className={`input-field ${errors.county ? "input-error" : ""}`} placeholder="e.g. Nairobi County" />
              </FormField>
              <FormField label="Town / City" required error={errors.town?.message} hint="Your nearest major town">
                <input {...register("town")} className={`input-field ${errors.town ? "input-error" : ""}`} placeholder="e.g. Westlands" />
              </FormField>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Your Phone Number" required error={errors.contactNumber?.message} hint="Include country code e.g. +254...">
                <input {...register("contactNumber")} className={`input-field ${errors.contactNumber ? "input-error" : ""}`} placeholder="+254 700 000 000" />
              </FormField>
              <FormField label="Email Address" required error={errors.email?.message}>
                <input type="email" {...register("email")} className={`input-field ${errors.email ? "input-error" : ""}`} placeholder="james@email.com" />
              </FormField>
              <div className="sm:col-span-2">
                <div className="bg-futsal-navy/5 border border-futsal-navy/10 rounded-xl p-4">
                  <p className="text-sm font-bold text-futsal-navy mb-1">Emergency / Contact Person</p>
                  <p className="text-xs text-gray-500">Someone we can reach if we cannot contact you directly.</p>
                </div>
              </div>
              <FormField label="Contact Person Name" required error={errors.contactPersonName?.message}>
                <input {...register("contactPersonName")} className={`input-field ${errors.contactPersonName ? "input-error" : ""}`} placeholder="e.g. Grace Kamau" />
              </FormField>
              <FormField label="Contact Person Number" required error={errors.contactPersonNumber?.message}>
                <input {...register("contactPersonNumber")} className={`input-field ${errors.contactPersonNumber ? "input-error" : ""}`} placeholder="+254 711 000 000" />
              </FormField>
              <FormField label="Relation to Contact Person" required error={errors.contactPersonRelation?.message}>
                <select {...register("contactPersonRelation")} className={`input-field ${errors.contactPersonRelation ? "input-error" : ""}`}>
                  <option value="">Select relation</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Coach">Coach</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </FormField>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="Playing Position" required error={errors.position?.message}>
                <select {...register("position")} className={`input-field ${errors.position ? "input-error" : ""}`}>
                  <option value="">Select position</option>
                  {positions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </FormField>
              <FormField label="Preferred Foot" required error={errors.preferredFoot?.message}>
                <select {...register("preferredFoot")} className={`input-field ${errors.preferredFoot ? "input-error" : ""}`}>
                  <option value="">Select foot</option>
                  <option value="Right">Right</option>
                  <option value="Left">Left</option>
                  <option value="Both">Both (Ambidextrous)</option>
                </select>
              </FormField>
              <FormField label="Years of Experience" required error={errors.yearsExperience?.message}>
                <input type="number" {...register("yearsExperience", { valueAsNumber: true })} className={`input-field ${errors.yearsExperience ? "input-error" : ""}`} placeholder="0" min={0} max={40} />
              </FormField>
              <FormField label="Previous Club (optional)" error={errors.previousClub?.message} hint="Leave blank if none">
                <input {...register("previousClub")} className="input-field" placeholder="e.g. Nairobi FC" />
              </FormField>

              {/* Summary */}
              <div className="sm:col-span-2 bg-futsal-navy rounded-xl p-5 text-white">
                <h4 className="font-bold text-sm mb-3 uppercase tracking-wide text-futsal-red">Registration Summary</h4>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  <span className="text-gray-400">Name</span>
                  <span className="font-semibold">{watch("firstName")} {watch("lastName")}</span>
                  <span className="text-gray-400">Age</span>
                  <span className="font-semibold">{watch("age")}</span>
                  <span className="text-gray-400">Region</span>
                  <span className="font-semibold">{watch("region")}</span>
                  <span className="text-gray-400">Phone</span>
                  <span className="font-semibold">{watch("contactNumber")}</span>
                  <span className="text-gray-400">Email</span>
                  <span className="font-semibold truncate">{watch("email")}</span>
                  <span className="text-gray-400">Contact Person</span>
                  <span className="font-semibold">{watch("contactPersonName")}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
            <button type="button" onClick={prevStep} disabled={step === 1}
              className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed">
              ← Back
            </button>
            {step < 4 ? (
              <button type="button" onClick={nextStep} className="btn-primary">Continue →</button>
            ) : (
              <button type="submit" disabled={submitting}
                className="btn-primary flex items-center gap-2 min-w-[180px] justify-center">
                {submitting
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</>
                  : "Submit Registration ✓"}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
