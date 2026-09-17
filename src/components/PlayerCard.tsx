"use client";
import { Player } from "@/types/player";
import { Phone, Mail, MapPin, User, Trash2, CalendarDays, Shirt } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  onDelete?: (id: string) => void | Promise<void>;
}

const positionColors: Record<string, string> = {
  "Goalkeeper":      "bg-yellow-100 text-yellow-800",
  "Fixo (Defender)": "bg-blue-100 text-blue-800",
  "Ala (Winger)":    "bg-green-100 text-green-800",
  "Pivot (Forward)": "bg-red-100 text-red-800",
  "Universal":       "bg-purple-100 text-purple-800",
};

const statusColors: Record<string, string> = {
  Active:   "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-600",
  Pending:  "bg-orange-100 text-orange-700",
};

export default function PlayerCard({ player, onDelete }: PlayerCardProps) {
  const initials = `${player.firstName[0]}${player.lastName[0]}`.toUpperCase();

  return (
    <div className="card border-t-4 border-futsal-red flex flex-col gap-4 p-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-futsal-navy flex items-center justify-center text-white font-black text-xl flex-shrink-0 border-2 border-futsal-red">
            {initials}
          </div>
          <div>
            <h3 className="font-black text-futsal-navy text-lg leading-tight">
              {player.firstName} {player.lastName}
            </h3>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              {player.registrationNumber}
            </p>
          </div>
        </div>
        <span className={`badge ${statusColors[player.status]}`}>
          {player.status}
        </span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className={`badge ${positionColors[player.position] || "bg-gray-100 text-gray-700"}`}>
          <Shirt className="w-3 h-3 mr-1" />
          {player.position}
        </span>
        <span className="badge bg-futsal-navy/10 text-futsal-navy">
          <CalendarDays className="w-3 h-3 mr-1" />
          Age {player.age}
        </span>
        <span className="badge bg-futsal-red/10 text-futsal-red">
          ⚽ {player.yearsExperience}yr exp
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-600 border-t pt-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-futsal-red flex-shrink-0" />
          <span>{player.town}, {player.region}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-futsal-red flex-shrink-0" />
          <span>{player.contactNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-futsal-red flex-shrink-0" />
          <span className="truncate">{player.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-futsal-red flex-shrink-0" />
          <span>Contact: {player.contactPersonName} ({player.contactPersonRelation})</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t text-xs text-gray-400">
        <span>
          Registered{" "}
          {new Date(player.registrationDate).toLocaleDateString("en-GB", {
            day: "numeric", month: "short", year: "numeric",
          })}
        </span>
        {onDelete && (
          <button
            onClick={() => onDelete(player.id)}
            className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded"
          >
            <Trash2 className="w-3.5 h-3.5" /> Remove
          </button>
        )}
      </div>
    </div>
  );
}
