const SCALE = [
  { token: 'radius-0', px: 0 },
  { token: 'radius-2', px: 2 },
  { token: 'radius-4', px: 4 },
  { token: 'radius-6', px: 6 },
  { token: 'radius-8', px: 8 },
  { token: 'radius-10', px: 10 },
  { token: 'radius-12', px: 12 },
  { token: 'radius-16', px: 16 },
  { token: 'radius-20', px: 20 },
  { token: 'radius-24', px: 24 },
  { token: 'radius-rounded', px: 9999 },
];

export function Radius() {
  return (
    <div className="flex flex-col">
      <div className="bg-brick-grey-white border-b border-brick-grey-300 px-16 pt-24 pb-24 sm:px-32 md:px-48 md:pt-40 md:pb-32">
        <p className="text-12 font-semibold text-brick-grey-500 uppercase tracking-[0.08em] mb-8">Foundations</p>
        <h1 className="text-32 font-bold text-brick-grey-950 mb-4">Radius</h1>
        <p className="text-16 text-brick-grey-600 leading-24 max-w-[560px]">
          Corner radius tokens from 0 to 24px, plus <code className="text-14 font-mono bg-brick-grey-200 px-6 py-2 rounded-4">rounded</code> for full pills and avatars.
        </p>
      </div>
      <div className="bg-brick-grey-100 px-16 py-24 sm:px-32 sm:py-32 md:px-48 md:py-40">
        <div className="grid grid-cols-4 gap-16">
          {SCALE.map(({ token, px }) => (
            <div key={token} className="flex flex-col items-start gap-12">
              <div
                className="w-[72px] h-[72px] bg-brick-blue-100 border-2 border-brick-blue-400"
                style={{ borderRadius: `${Math.min(px, 36)}px` }}
              />
              <div>
                <p className="text-14 font-semibold text-brick-grey-900">{token}</p>
                <p className="text-12 text-brick-grey-500">{px === 9999 ? '9999px' : `${px}px`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
