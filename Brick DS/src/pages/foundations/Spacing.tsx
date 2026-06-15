const SCALE = [0, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48];

export function Spacing() {
  return (
    <div className="flex flex-col">
      <div className="bg-brick-grey-white border-b border-brick-grey-300 px-16 pt-24 pb-24 sm:px-32 md:px-48 md:pt-40 md:pb-32">
        <p className="text-12 font-semibold text-brick-grey-500 uppercase tracking-[0.08em] mb-8">Foundations</p>
        <h1 className="text-32 font-bold text-brick-grey-950 mb-4">Spacing</h1>
        <p className="text-16 text-brick-grey-600 leading-24 max-w-[560px]">
          An 8-point scale from 0 to 48px. All padding, margin, and gap values in the system come from these steps.
        </p>
      </div>
      <div className="bg-brick-grey-100 px-16 py-24 sm:px-32 sm:py-32 md:px-48 md:py-40">
        <div className="flex flex-col gap-16">
          {SCALE.map(px => (
            <div key={px} className="flex items-center gap-24">
              <div className="w-[80px] shrink-0 text-right">
                <p className="text-14 font-mono text-brick-grey-700">{px}px</p>
              </div>
              <div
                className="bg-brick-blue-400 rounded-4 h-[24px]"
                style={{ width: `${Math.max(px, 2)}px` }}
              />
              <p className="text-14 text-brick-grey-700">spacing-{px}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
