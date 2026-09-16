"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { isAdminAuthed, adminLogout } from "@/lib/adminAuth";
import { getPlayers, deletePlayer } from "@/lib/storage";
import { Player, KenyaRegion, PlayerPosition } from "@/types/player";
import {
  Users, LogOut, Search, SlidersHorizontal,
  Trash2, Phone, Mail, MapPin, CalendarDays,
  Shirt, User, TrendingUp, Globe, Trophy, RefreshCw
} from "lucide-react";

const ALL = "All";

const regions: (KenyaRegion | "All")[] = [
  ALL,"Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Thika",
  "Malindi","Kitale","Garissa","Kakamega","Nyeri","Machakos",
  "Meru","Kisii","Kericho","Other",
];

const positions: (PlayerPosition | "All")[] = [
  ALL,"Goalkeeper","Fixo (Defender)","Ala (Winger)","Pivot (Forward)","Universal",
];

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

export default function AdminDashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState(ALL);
  const [position, setPosition] = useState(ALL);
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState<Player | null>(null);

  useEffect(() => {
    if (!isAdminAuthed()) {
      router.replace("/admin/login");
      return;
    }
    setPlayers(getPlayers());
    setReady(true);
  }, [router]);

  const refresh = () => setPlayers(getPlayers());

  const handleDelete = (id: string) => {
    if (confirm("Permanently remove this player?")) {
      deletePlayer(id);
      setPlayers(getPlayers());
      if (selected?.id === id) setSelected(null);
    }
  };

  const handleLogout = () => {
    adminLogout();
    router.push("/admin/login");
  };

  const filtered = useMemo(() => players.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q ||
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
      p.registrationNumber.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.contactNumber.includes(q) ||
      p.town.toLowerCase().includes(q);
    const matchRegion = region === ALL || p.region === region;
    const matchPos = position === ALL || p.position === position;
    return matchSearch && matchRegion && matchPos;
  }), [players, search, region, position]);

  // Stats
  const stats = useMemo(() => {
    const regionMap: Record<string, number> = {};
    players.forEach((p) => { regionMap[p.region] = (regionMap[p.region] || 0) + 1; });
    const topRegion = Object.entries(regionMap).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "-";
    const pending = players.filter((p) => p.status === "Pending").length;
    const active  = players.filter((p) => p.status === "Active").length;
    return { total: players.length, pending, active, topRegion };
  }, [players]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-futsal-navy flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-futsal-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-semibold">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-futsal-gray">
      {/* Admin Navbar */}
      <header className="bg-futsal-navy border-b-4 border-futsal-red sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-futsal-red flex items-center justify-center text-white font-black text-sm shadow">
              FK
            </div>
            <div>
              <span className="font-black text-white text-base tracking-tight">FUTSAL UK KENYA</span>
              <span className="text-futsal-red text-[10px] font-bold tracking-widest uppercase block -mt-0.5">
                Admin Dashboard
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={refresh} className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-futsal-red px-4 py-2 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Players",  value: stats.total,     icon: Users,     color: "text-futsal-navy" },
            { label: "Pending Review", value: stats.pending,   icon: TrendingUp, color: "text-orange-500" },
            { label: "Active Players", value: stats.active,    icon: Trophy,    color: "text-green-600"  },
            { label: "Top Region",     value: stats.topRegion, icon: Globe,     color: "text-futsal-red" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card p-5 border border-gray-100 border-l-4 border-l-futsal-red">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</p>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className={`text-3xl font-black ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Players list */}
          <div className="flex-1 min-w-0">
            <div className="card p-4 mb-4 border-t-4 border-futsal-red">
              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[180px] relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search name, reg no, email, phone..."
                    className="input-field pl-9 text-sm"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm transition-colors ${
                    showFilters || region !== ALL || position !== ALL
                      ? "bg-futsal-navy text-white border-futsal-navy"
                      : "bg-white text-gray-600 border-gray-300 hover:border-futsal-navy"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {(region !== ALL || position !== ALL) && (
                    <span className="bg-futsal-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {[region !== ALL, position !== ALL].filter(Boolean).length}
                    </span>
                  )}
                </button>
              </div>
              {showFilters && (
                <div className="mt-4 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Region</label>
                    <select value={region} onChange={(e) => setRegion(e.target.value)} className="input-field text-sm">
                      {regions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wide">Position</label>
                    <select value={position} onChange={(e) => setPosition(e.target.value)} className="input-field text-sm">
                      {positions.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500">
                <strong className="text-futsal-navy">{filtered.length}</strong> of {players.length} players
              </p>
              {(search || region !== ALL || position !== ALL) && (
                <button onClick={() => { setSearch(""); setRegion(ALL); setPosition(ALL); }}
                  className="text-xs text-futsal-red hover:underline font-semibold">
                  Clear filters
                </button>
              )}
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
              <div className="card p-12 text-center border-t-4 border-futsal-red">
                <div className="text-5xl mb-3"></div>
                <h3 className="font-black text-futsal-navy text-lg mb-1">No players found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters.</p>
              </div>
            ) : (
              <div className="card overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-futsal-navy text-white">
                        <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wide">Player</th>
                        <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wide hidden md:table-cell">Reg No.</th>
                        <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wide hidden lg:table-cell">Region</th>
                        <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wide hidden lg:table-cell">Position</th>
                        <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wide">Status</th>
                        <th className="text-left px-4 py-3 font-bold text-xs uppercase tracking-wide">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filtered.map((p) => (
                        <tr
                          key={p.id}
                          onClick={() => setSelected(p)}
                          className={`cursor-pointer hover:bg-futsal-red/5 transition-colors ${selected?.id === p.id ? "bg-futsal-red/10" : ""}`}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-futsal-navy text-white text-xs font-black flex items-center justify-center flex-shrink-0">
                                {p.firstName[0]}{p.lastName[0]}
                              </div>
                              <div>
                                <p className="font-bold text-futsal-navy">{p.firstName} {p.lastName}</p>
                                <p className="text-gray-400 text-xs">{p.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-gray-500 hidden md:table-cell">{p.registrationNumber}</td>
                          <td className="px-4 py-3 hidden lg:table-cell text-gray-600">{p.region}</td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <span className={`badge text-xs ${positionColors[p.position] || "bg-gray-100 text-gray-700"}`}>
                              {p.position}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`badge text-xs ${statusColors[p.status]}`}>{p.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDelete(p.id); }}
                              className="text-red-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition-colors"
                              title="Delete player"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Player detail panel */}
          {selected && (
            <div className="w-80 flex-shrink-0 hidden xl:block">
              <div className="card border-t-4 border-futsal-red sticky top-24">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-futsal-red uppercase tracking-wide">Player Details</span>
                    <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">×</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-futsal-navy text-white font-black text-xl flex items-center justify-center border-2 border-futsal-red">
                      {selected.firstName[0]}{selected.lastName[0]}
                    </div>
                    <div>
                      <h3 className="font-black text-futsal-navy text-base">{selected.firstName} {selected.lastName}</h3>
                      <p className="text-xs font-mono text-gray-400">{selected.registrationNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-3 text-sm">
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    <span className={`badge text-xs ${positionColors[selected.position] || "bg-gray-100"}`}>
                      <Shirt className="w-3 h-3 mr-1" />{selected.position}
                    </span>
                    <span className={`badge text-xs ${statusColors[selected.status]}`}>{selected.status}</span>
                  </div>

                  <Row icon={<CalendarDays className="w-4 h-4 text-futsal-red" />} label="Age" value={`${selected.age} yrs`} />
                  <Row icon={<CalendarDays className="w-4 h-4 text-futsal-red" />} label="DOB" value={selected.dateOfBirth} />
                  <Row icon={<Globe className="w-4 h-4 text-futsal-red" />} label="Nationality" value={selected.nationality} />
                  <Row icon={<MapPin className="w-4 h-4 text-futsal-red" />} label="Location" value={`${selected.town}, ${selected.region}`} />
                  <Row icon={<Phone className="w-4 h-4 text-futsal-red" />} label="Phone" value={selected.contactNumber} />
                  <Row icon={<Mail className="w-4 h-4 text-futsal-red" />} label="Email" value={selected.email} />

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Contact Person</p>
                    <Row icon={<User className="w-4 h-4 text-futsal-red" />} label="Name" value={selected.contactPersonName} />
                    <Row icon={<Phone className="w-4 h-4 text-futsal-red" />} label="Phone" value={selected.contactPersonNumber} />
                    <Row icon={<User className="w-4 h-4 text-futsal-red" />} label="Relation" value={selected.contactPersonRelation} />
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Football</p>
                    <Row icon={<Trophy className="w-4 h-4 text-futsal-red" />} label="Foot" value={selected.preferredFoot} />
                    <Row icon={<TrendingUp className="w-4 h-4 text-futsal-red" />} label="Experience" value={`${selected.yearsExperience} years`} />
                    {selected.previousClub && (
                      <Row icon={<Trophy className="w-4 h-4 text-futsal-red" />} label="Prev Club" value={selected.previousClub} />
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400">
                      Registered: {new Date(selected.registrationDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="w-full mt-2 flex items-center justify-center gap-2 text-sm font-semibold text-red-500 hover:text-white hover:bg-red-500 border border-red-200 hover:border-red-500 py-2 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" /> Remove Player
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-start gap-2 py-0.5">
      <div className="mt-0.5 flex-shrink-0">{icon}</div>
      <div className="min-w-0">
        <span className="text-gray-400 text-xs">{label}: </span>
        <span className="font-semibold text-futsal-navy text-xs break-all">{value}</span>
      </div>
    </div>
  );
}
