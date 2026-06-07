const SCALE = [0, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48];

export function Spacing() {
  return (
    <div className="p-48">
      <h1 className="text-40 font-bold text-brick-grey-950 leading-44 mb-8">Spacing</h1>
      <p className="text-16 text-brick-grey-600 leading-24 mb-48 max-w-[560px]">
        An 8-point spacing scale. All layout gaps, paddings, and margins are derived from these values.
      </p>

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
  );
}
