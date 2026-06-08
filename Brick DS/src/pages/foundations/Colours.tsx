type Swatch = { name: string; hex: string };
type Palette = { label: string; swatches: Swatch[] };

const PALETTES: Palette[] = [
  {
    label: 'Brick Blue',
    swatches: [
      { name: '50',  hex: '#EAEEF1' },
      { name: '100', hex: '#D6DEE3' },
      { name: '200', hex: '#ACBCC8' },
      { name: '300', hex: '#839BAC' },
      { name: '400', hex: '#5C768A' },
      { name: '500', hex: '#425563' },
      { name: '600', hex: '#3C4D5A' },
      { name: '700', hex: '#2F3C46' },
      { name: '800', hex: '#242F36' },
      { name: '900', hex: '#1C242A' },
    ],
  },
  {
    label: 'Brick Grey',
    swatches: [
      { name: '100', hex: '#FAFAFA' },
      { name: '200', hex: '#F5F5F5' },
      { name: '300', hex: '#F0F0F0' },
      { name: '400', hex: '#D9D9D9' },
      { name: '500', hex: '#BFBFBF' },
      { name: '600', hex: '#8C8C8C' },
      { name: '700', hex: '#595959' },
      { name: '800', hex: '#434343' },
      { name: '900', hex: '#2E2E2E' },
      { name: '950', hex: '#242424' },
    ],
  },
  {
    label: 'Error Red',
    swatches: [
      { name: '50',  hex: '#FFEBE9' },
      { name: '100', hex: '#FFCECB' },
      { name: '200', hex: '#FFABA8' },
      { name: '300', hex: '#FF8182' },
      { name: '400', hex: '#FA4549' },
      { name: '500', hex: '#CF222E' },
      { name: '600', hex: '#A40E26' },
      { name: '700', hex: '#82071E' },
      { name: '800', hex: '#660018' },
      { name: '900', hex: '#4C0014' },
    ],
  },
  {
    label: 'Success Green',
    swatches: [
      { name: '50',  hex: '#DAFBE1' },
      { name: '100', hex: '#ACEEBB' },
      { name: '200', hex: '#6FDD8B' },
      { name: '300', hex: '#4AC26B' },
      { name: '400', hex: '#2DA44E' },
      { name: '500', hex: '#1A7F37' },
      { name: '600', hex: '#116329' },
      { name: '700', hex: '#044F1E' },
      { name: '800', hex: '#003D16' },
      { name: '900', hex: '#002D11' },
    ],
  },
  {
    label: 'Warning Yellow',
    swatches: [
      { name: '50',  hex: '#FEF9E6' },
      { name: '100', hex: '#FBECB0' },
      { name: '200', hex: '#F9E38A' },
      { name: '300', hex: '#F7D654' },
      { name: '400', hex: '#F5CE33' },
      { name: '500', hex: '#F3C200' },
      { name: '600', hex: '#DDB100' },
      { name: '700', hex: '#AD8A00' },
      { name: '800', hex: '#806600' },
      { name: '900', hex: '#665100' },
    ],
  },
  {
    label: 'Active Blue',
    swatches: [
      { name: '50',  hex: '#E7F3FF' },
      { name: '100', hex: '#B4DBFF' },
      { name: '200', hex: '#90CAFF' },
      { name: '300', hex: '#5DB1FF' },
      { name: '400', hex: '#3DA2FF' },
      { name: '500', hex: '#0D8BFF' },
      { name: '600', hex: '#0C7EE8' },
      { name: '700', hex: '#0963B5' },
      { name: '800', hex: '#074C8C' },
      { name: '900', hex: '#053A6B' },
    ],
  },
];

export function Colours() {
  return (
    <div className="p-48">
      <h1 className="text-40 font-bold text-brick-grey-950 leading-44 mb-8">Colours</h1>
      <p className="text-16 text-brick-grey-600 leading-24 mb-48 max-w-[560px]">
          Six palettes, ten shades each. Lighter values are for backgrounds and borders; darker ones are for text and icons.
      </p>

      <div className="flex flex-col gap-48">
        {PALETTES.map(({ label, swatches }) => (
          <div key={label}>
            <h2 className="text-16 font-semibold text-brick-grey-950 mb-16">{label}</h2>
            <div className="flex gap-4">
              {swatches.map(({ name, hex }) => (
                <div key={name} className="flex-1 min-w-0">
                  <div className="h-[64px] rounded-8 mb-8" style={{ backgroundColor: hex }} />
                  <p className="text-12 font-semibold text-brick-grey-800">{name}</p>
                  <p className="text-12 text-brick-grey-700 font-mono">{hex}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
