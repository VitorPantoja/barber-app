import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { BrandPanel } from "@/components/auth/brand-panel"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-2">
      {/* Left: Form panel */}
      <div className="flex flex-col px-6 py-10 lg:px-13">
        {/* Desktop brand logo */}
        <Link
          href="/"
          className="hidden items-center gap-2.5 lg:flex w-fit"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0a"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M6 3v18M18 3v18M6 12h12" />
            </svg>
          </div>
          <span className="font-[var(--font-syne)] text-[16px] font-bold text-foreground">
            BarberApp
          </span>
        </Link>

        {/* Mobile back button */}
        <div className="lg:hidden">
          <Link
            href="/"
            className="inline-flex size-[34px] items-center justify-center rounded-[10px] border border-border bg-secondary text-foreground"
            aria-label="Voltar"
          >
            <ChevronLeft className="size-4" />
          </Link>
        </div>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[370px] animate-fade-up">{children}</div>
        </div>
      </div>

      {/* Right: Brand panel (desktop only) */}
      <BrandPanel />
    </div>
  )
}
