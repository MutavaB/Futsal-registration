import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-futsal-navy flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-futsal-red flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg">
            FK
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">FUTSAL UK</h1>
          <p className="text-futsal-red font-bold text-sm tracking-widest uppercase mt-1">Kenya — Admin Portal</p>
        </div>

        <AdminLoginForm />

        <p className="text-center text-gray-500 text-xs mt-6">
          This area is restricted to authorised administrators only.
        </p>
      </div>
    </div>
  );
}
