import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-futsal-navy text-white mt-auto border-t-4 border-futsal-red">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-futsal-red flex items-center justify-center text-white font-black text-sm shadow">
                FK
              </div>
              <div>
                <span className="font-black text-base tracking-tight block">FUTSAL UK</span>
                <span className="text-futsal-red text-[10px] font-bold tracking-[0.2em] uppercase block -mt-0.5">
                  Kenya
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Official player registration portal for Futsal UK Kenya — developing
              futsal talent across all 47 counties.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-futsal-red mb-4">
              Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/register" className="hover:text-futsal-red transition-colors">Player Registration</Link></li>
              <li><Link href="/about" className="hover:text-futsal-red transition-colors">About Us</Link></li>
              <li>
                <a href="https://futsal.com" target="_blank" rel="noopener noreferrer" className="hover:text-futsal-red transition-colors">
                  futsal.com
                </a>
              </li>
              <li>
                <a href="https://www.englandfutsal.com" target="_blank" rel="noopener noreferrer" className="hover:text-futsal-red transition-colors">
                  England Futsal
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-futsal-red mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-futsal-red flex-shrink-0" />
                Nairobi, Kenya
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-futsal-red flex-shrink-0" />
                +254 700 000 000
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-futsal-red flex-shrink-0" />
                info@futsalukkenya.co.ke
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Futsal UK Kenya. All rights reserved.</p>
          <Link href="/admin/login" className="hover:text-futsal-red transition-colors">
            Admin Portal →
          </Link>
        </div>
      </div>
    </footer>
  );
}
