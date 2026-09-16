import RegistrationForm from "@/components/RegistrationForm";
import { ClipboardList } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="bg-futsal-gray min-h-screen">
      {/* Page Header */}
      <div className="bg-futsal-navy text-white py-12 border-b-4 border-futsal-red">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-futsal-red/20 p-2 rounded-lg">
              <ClipboardList className="w-6 h-6 text-futsal-red" />
            </div>
            <span className="text-futsal-red text-sm font-bold uppercase tracking-widest">
              Player Registration
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-2 tracking-tight">
            Join Futsal UK Kenya
          </h1>
          <p className="text-gray-400 max-w-xl">
            Fill in the form below to register as an official Futsal UK Kenya
            player. Fields marked <span className="text-futsal-red">*</span> are required.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <RegistrationForm />
      </div>
    </div>
  );
}
