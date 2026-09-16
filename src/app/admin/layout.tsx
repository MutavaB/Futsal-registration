// Admin routes use their own layout — no public Navbar or Footer
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
