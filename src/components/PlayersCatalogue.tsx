"use client";

import { useState, useEffect, useMemo } from "react";
import { getPlayers, deletePlayer } from "@/lib/storage";
import { Player, KenyaRegion, PlayerPosition } from "@/types/player";
import PlayerCard from "@/components/PlayerCard";
import { Search, SlidersHorizontal, UserPlus } from "lucide-react";
import Link from "next/link";

const ALL = "All";

const regions: (KenyaRegion | "All")[] = [
  ALL,"Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Thika",
  "Malindi","Kitale","Garissa","Kakamega","Nyeri","Machakos",
  "Meru","Kisii","Kericho","Other",
];

const positions: (PlayerPosition | "All")[] = [
  ALL,"Goalkeeper","Fixo (Defender)","Ala (Winger)","Pivot (Forward)","Universal",
];

export default function PlayersCatalogue() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState<string>(ALL);
  const [position, setPosition] = useState<string>(ALL);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setPlayers(getPlayers());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Remove this player from the catalogue?")) {
      deletePlayer(id);
      setPlayers(getPlayers());
    }
  };

  const filtered = useMemo(() => {
    return players.filter((p) => {
      const matchSearch =
        search === "" ||
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        p.registrationNumber.toLowerCase().includes(search.toLowerCase()) ||
        p.town.toLowerCase().includes(search.toLowerCase());

      const matchRegion = region === ALL || p.region === region;
      const matchPosition = position === ALL || p.position === position;

      return matchSearch && matchRegion && matchPosition;
    });
  }, [players, search, region, position]);

  const activeFilters = [region !== ALL, position !== ALL].filter(Boolean).length;

  return (
    <div>
      {/* Search + Filter Bar */}
      <div className="card p-4 mb-6 border-t-4 border-futsal-red">
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, reg no, or town..."
              className="input-field pl-9"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg border font-semibold text-sm transition-colors ${
              showFilters || activeFilters > 0
                ? "bg-futsal-navy text-white border-futsal-navy"
                : "bg-white text-gray-600 border-gray-300 hover:border-futsal-navy"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilters > 0 && (
              <span className="bg-futsal-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="input-field text-sm">
                {regions.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">Position</label>
              <select value={position} onChange={(e) => setPosition(e.target.value)} className="input-field text-sm">
                {positions.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing <strong className="text-futsal-navy">{filtered.length}</strong> of {players.length} player{players.length !== 1 ? "s" : ""}
        </p>
        {(search || region !== ALL || position !== ALL) && (
          <button
            onClick={() => { setSearch(""); setRegion(ALL); setPosition(ALL); }}
            className="text-xs text-futsal-red hover:underline font-semibold"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((player) => (
            <PlayerCard key={player.id} player={player} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="card p-16 text-center border-t-4 border-futsal-red">
          {players.length === 0 ? (
            <>
              <div className="text-6xl mb-4">⚽</div>
              <h3 className="text-xl font-black text-futsal-navy mb-2">No players yet</h3>
              <p className="text-gray-400 mb-6">Be the first to register as a Futsal UK Kenya player.</p>
              <Link href="/register" className="btn-primary inline-flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> Register Now
              </Link>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-futsal-navy mb-2">No matches found</h3>
              <p className="text-gray-400">Try adjusting your search or filters.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
