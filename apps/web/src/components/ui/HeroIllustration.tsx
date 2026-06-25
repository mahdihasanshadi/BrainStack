export function HeroIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-[4/5] max-w-sm sm:max-w-md lg:aspect-square lg:max-w-none"
    >
      <div className="absolute inset-0 rounded-playful-xl bg-white/60 shadow-float backdrop-blur-sm" />

      <div className="absolute inset-3 rounded-playful-lg bg-dot-grid bg-dot-grid sm:inset-4" />

      <div className="absolute left-[6%] top-[10%] animate-float motion-reduce:animate-none">
        <div className="rounded-playful border border-paddy/15 bg-white p-4 shadow-card sm:p-5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rickshaw" />
            <span className="h-2.5 w-2.5 rounded-full bg-turmeric" />
            <span className="h-2.5 w-2.5 rounded-full bg-paddy" />
          </div>
          <div className="mt-3 space-y-2 font-mono text-xs text-ink-muted sm:text-sm">
            <p>
              <span className="text-monsoon">when</span>{" "}
              <span className="text-rickshaw">flag</span> clicked
            </p>
            <p className="pl-3">
              <span className="text-paddy">move</span> 10 steps
            </p>
            <p className="pl-3">
              <span className="text-paddy">play</span> sound pop
            </p>
          </div>
        </div>
      </div>

      <div className="absolute right-[4%] top-[18%] animate-float-delayed motion-reduce:animate-none">
        <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 border-turmeric bg-gradient-to-br from-turmeric/30 to-white shadow-band sm:h-24 sm:w-24">
          <span className="text-2xl sm:text-3xl">🐱</span>
          <span className="mt-0.5 font-display text-label font-bold text-paddy">
            Sprite
          </span>
        </div>
      </div>

      <div className="absolute bottom-[22%] left-[8%] animate-float motion-reduce:animate-none">
        <div className="rounded-full bg-paddy px-4 py-2 font-display text-body-sm font-bold text-white shadow-band-lg sm:px-5 sm:py-3">
          Level 3 unlocked!
        </div>
      </div>

      <div className="absolute bottom-[8%] right-[6%] max-w-[52%] rounded-playful-lg border border-monsoon/20 bg-white/95 p-4 shadow-card sm:p-5">
        <p className="font-display text-label font-bold uppercase tracking-wider text-monsoon">
          This week
        </p>
        <ul className="mt-2 space-y-1.5 font-display text-body-sm font-semibold text-ink">
          <li className="flex items-center gap-2">
            <span className="text-turmeric">★</span> Build a maze game
          </li>
          <li className="flex items-center gap-2">
            <span className="text-paddy">★</span> Learn loops
          </li>
          <li className="flex items-center gap-2">
            <span className="text-rickshaw">★</span> Show your project
          </li>
        </ul>
      </div>

      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-glow blur-2xl" />
    </div>
  );
}
