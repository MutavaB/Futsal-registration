import { Globe, Trophy, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="bg-futsal-gray min-h-screen">
      <div className="bg-futsal-navy text-white py-16 border-b-4 border-futsal-red">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">About Futsal UK Kenya</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Bringing world-class futsal to every corner of Kenya, in partnership with England Futsal.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <section className="card p-8 border-t-4 border-futsal-red">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-futsal-red/10 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-futsal-red" />
            </div>
            <h2 className="text-2xl font-black text-futsal-navy">Our Mission</h2>
          </div>
          <p className="text-gray-600 leading-relaxed text-lg">
            Futsal UK Kenya exists to develop, promote, and grow futsal across all 47 counties of Kenya.
            We provide structured competition, coaching development, and clear talent pathways for players
            of all ages and abilities — from grassroots to elite level.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-futsal-navy/10 p-2 rounded-lg">
              <Globe className="w-6 h-6 text-futsal-navy" />
            </div>
            <h2 className="text-2xl font-black text-futsal-navy">What is Futsal?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Players per side", value: "5" },
              { label: "Court surface",    value: "Hard court (indoor)" },
              { label: "Ball",             value: "Weighted low-bounce ball" },
              { label: "Match duration",   value: "2 × 20 minute halves" },
              { label: "Global players",   value: "30 million+" },
              { label: "FIFA recognised",  value: "Yes — since 1989" },
            ].map((item) => (
              <div key={item.label} className="card p-5 border border-gray-100 flex justify-between items-center">
                <span className="text-gray-500 text-sm">{item.label}</span>
                <span className="font-bold text-futsal-navy">{item.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card p-8 border-t-4 border-futsal-red">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-futsal-red/10 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-futsal-red" />
            </div>
            <h2 className="text-2xl font-black text-futsal-navy">Our Partnership</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-3">
            Futsal UK Kenya operates in partnership with{" "}
            <a href="https://www.englandfutsal.com" target="_blank" rel="noopener noreferrer"
              className="text-futsal-red font-semibold hover:underline">England Futsal</a>{" "}
            and{" "}
            <a href="https://futsal.com" target="_blank" rel="noopener noreferrer"
              className="text-futsal-red font-semibold hover:underline">futsal.com</a>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Through these partnerships, Kenyan players and coaches benefit from elite coaching resources,
            webinar series, youth development programmes, and exposure to the global game.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-futsal-navy/10 p-2 rounded-lg">
              <Users className="w-6 h-6 text-futsal-navy" />
            </div>
            <h2 className="text-2xl font-black text-futsal-navy">Playing Positions</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { pos: "Goalkeeper",   desc: "Last line of defence. Key to quick counter-attacks.",    emoji: "🧤" },
              { pos: "Fixo",         desc: "Defensive anchor. Controls positioning and set pieces.", emoji: "🛡️" },
              { pos: "Ala (Winger)", desc: "Wide players who create width and opportunities.",       emoji: "⚡" },
              { pos: "Pivot",        desc: "Target striker. Holds ball and creates chances.",        emoji: "🎯" },
            ].map((item) => (
              <div key={item.pos} className="card p-5 border border-gray-100 text-center hover:border-futsal-red/30 transition-colors">
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-bold text-futsal-navy mb-2">{item.pos}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center py-6">
          <h3 className="text-2xl font-black text-futsal-navy mb-4">Ready to join?</h3>
          <Link href="/register" className="btn-primary text-base px-10 py-4 rounded-full">
            Register as a Player →
          </Link>
        </div>
      </div>
    </div>
  );
}
