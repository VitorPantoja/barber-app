export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40 hidden md:block">
        <div className="p-6">
          <h2 className="font-semibold">Dashboard</h2>
          {/* Sidebar Navigation Placeholder */}
        </div>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
