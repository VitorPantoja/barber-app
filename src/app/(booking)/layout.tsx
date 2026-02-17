export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-muted/10">
      <header className="border-b bg-background p-4 text-center">
        <h1 className="text-lg font-semibold">Book Appointment</h1>
      </header>
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-8">
        {children}
      </main>
    </div>
  )
}
