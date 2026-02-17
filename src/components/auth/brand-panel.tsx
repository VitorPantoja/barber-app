export function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden bg-[#111] lg:block">
      {/* Subtle gradient atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 65% 25%, rgba(0,200,212,0.1) 0%, transparent 65%), radial-gradient(ellipse 40% 55% at 30% 75%, rgba(0,200,212,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#272727 1px, transparent 1px), linear-gradient(90deg, #272727 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Barber pole */}
      <div className="absolute right-11 top-11 h-[180px] w-1.5 overflow-hidden rounded-full opacity-55">
        <div
          className="absolute inset-0 animate-barber-pole"
          style={{
            background:
              "repeating-linear-gradient(-45deg, #00c8d4 0, #00c8d4 7px, #fff 7px, #fff 14px, #e05a5a 14px, #e05a5a 21px, #fff 21px, #fff 28px)",
          }}
        />
      </div>

      {/* Glow rings */}
      <div className="absolute left-1/2 top-[30%] size-[300px] -translate-x-1/2 -translate-y-1/2 animate-glow-ring rounded-full border border-primary/[0.12]" />
      <div className="absolute left-1/2 top-[30%] size-[460px] -translate-x-1/2 -translate-y-1/2 animate-glow-ring rounded-full border border-primary/[0.12] opacity-60 [animation-delay:1.2s]" />

      {/* Scissors watermark */}
      <svg
        className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-[54%] -rotate-12 opacity-[0.035]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="0.4"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-12">
        <h2 className="mb-3.5 max-w-[360px] font-[var(--font-syne)] text-[32px] font-extrabold leading-tight text-foreground">
          Seu corte perfeito,
          <br />
          a <em className="not-italic text-primary">um clique</em>
          <br />
          {"de distância."}
        </h2>
        <p className="max-w-[320px] text-[13.5px] leading-relaxed text-muted-foreground">
          Agende com os melhores barbeiros da sua cidade sem sair de casa.
        </p>
      </div>
    </div>
  )
}
