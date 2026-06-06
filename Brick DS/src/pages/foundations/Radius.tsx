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
    <div className="p-48">
      <h1 className="text-40 font-bold text-brick-grey-950 leading-44 mb-8">Radius</h1>
      <p className="text-16 text-brick-grey-600 leading-24 mb-48 max-w-[560px]">
        Border radius tokens used across all components. Use <code className="text-14 font-mono bg-brick-grey-200 px-6 py-2 rounded-4">rounded</code> for fully circular elements.
      </p>

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
  );
}
