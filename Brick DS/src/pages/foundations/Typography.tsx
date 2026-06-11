const SIZES = [
  { name: 'size-60', px: 60, lh: 72, usage: 'Display' },
  { name: 'size-48', px: 48, lh: 64, usage: 'H1' },
  { name: 'size-40', px: 40, lh: 44, usage: 'H2' },
  { name: 'size-32', px: 32, lh: 36, usage: 'H3' },
  { name: 'size-24', px: 24, lh: 30, usage: 'H4' },
  { name: 'size-20', px: 20, lh: 28, usage: 'H5' },
  { name: 'size-16', px: 16, lh: 24, usage: 'Body' },
  { name: 'size-14', px: 14, lh: 20, usage: 'Small' },
  { name: 'size-12', px: 12, lh: 18, usage: 'Caption' },
];

export function Typography() {
  return (
    <div className="p-16 sm:p-32 md:p-48">
      <h1 className="text-40 font-bold text-brick-grey-950 leading-44 mb-8">Typography</h1>
      <p className="text-16 text-brick-grey-600 leading-24 mb-12">
        Font family: <span className="font-semibold text-brick-grey-900">Instrument Sans</span>
      </p>
      <p className="text-16 text-brick-grey-600 leading-24 mb-48">
        Weights: <span className="font-normal text-brick-grey-900">Regular (400)</span> · <span className="font-semibold text-brick-grey-900">Semibold (600)</span> · <span className="font-bold text-brick-grey-900">Bold (700)</span>
      </p>

      <div className="flex flex-col divide-y divide-brick-grey-300 border border-brick-grey-300 rounded-12 overflow-hidden">
        {SIZES.map(({ name, px, lh, usage }) => (
          <div key={name} className="flex items-center gap-32 px-24 py-20 bg-brick-grey-white">
            <div className="w-[100px] shrink-0">
              <p className="text-12 font-mono text-brick-grey-600">{name}</p>
              <p className="text-12 text-brick-grey-600">{px}px / {lh}px</p>
              <p className="text-12 text-brick-grey-600">{usage}</p>
            </div>
            <p
              className="text-brick-grey-950 font-semibold truncate"
              style={{ fontSize: `${Math.min(px, 40)}px`, lineHeight: `${lh}px` }}
            >
              Instrument Sans
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
