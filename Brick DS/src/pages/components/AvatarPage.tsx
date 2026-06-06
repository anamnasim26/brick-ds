import { useState } from 'react';
import { Avatar, type AvatarProps } from '@/components/Avatar';

type AvatarSize = NonNullable<AvatarProps['size']>;
type AvatarState = NonNullable<AvatarProps['state']>;
type AvatarType = NonNullable<AvatarProps['type']>;

const TYPES: AvatarType[] = ['Image', 'Initials', 'Icon'];
const STATES: AvatarState[] = ['Available', 'Away', 'Busy', 'Offline'];
const SIZES: AvatarSize[] = ['24', '32', '40', '56'];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus-visible:outline-none cursor-pointer ${checked ? 'bg-active-blue-500' : 'bg-brick-grey-400'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-brick-grey-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-16 py-12 border-b border-brick-grey-200 last:border-none">
      <span className="text-14 font-semibold text-brick-grey-800 shrink-0">{label}</span>
      <div className="flex items-center gap-8 flex-wrap justify-end">{children}</div>
    </div>
  );
}

function ChipButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-12 py-4 rounded-8 text-14 font-medium border transition-colors focus-visible:outline-none ${
        active
          ? 'bg-active-blue-50 border-active-blue-700 text-active-blue-700'
          : 'bg-brick-grey-white border-brick-grey-400 text-brick-grey-700 hover:border-brick-grey-600'
      }`}
    >
      {children}
    </button>
  );
}

function TextInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-[180px] text-14 text-brick-grey-900 border border-brick-grey-400 rounded-8 px-8 py-4 focus:outline-none focus:border-active-blue-500 bg-brick-grey-white"
    />
  );
}

const DEFAULTS = {
  type: 'Image' as AvatarType,
  size: '40' as AvatarSize,
  state: 'Available' as AvatarState,
  showStatus: true,
  initials: 'AN',
  src: 'https://i.pravatar.cc/150?img=5',
};

export function AvatarPage() {
  const [type, setType] = useState<AvatarType>(DEFAULTS.type);
  const [size, setSize] = useState<AvatarSize>(DEFAULTS.size);
  const [state, setState] = useState<AvatarState>(DEFAULTS.state);
  const [showStatus, setShowStatus] = useState(DEFAULTS.showStatus);
  const [initials, setInitials] = useState(DEFAULTS.initials);
  const [src, setSrc] = useState(DEFAULTS.src);

  const reset = () => {
    setType(DEFAULTS.type);
    setSize(DEFAULTS.size);
    setState(DEFAULTS.state);
    setShowStatus(DEFAULTS.showStatus);
    setInitials(DEFAULTS.initials);
    setSrc(DEFAULTS.src);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">avatar</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          Circular user representation with image, initials, or icon — plus an optional presence status indicator.
        </p>
      </div>

      {/* Playground */}
      <div className="flex flex-1">
        {/* Controls */}
        <div className="w-1/2 shrink-0 border-r border-brick-grey-300 bg-brick-grey-white p-24 flex flex-col">
          <div className="flex items-center justify-between mb-16">
            <p className="text-12 font-semibold text-brick-grey-600 uppercase tracking-[0.08em]">Playground</p>
            <button onClick={reset} className="text-12 text-brick-grey-500 hover:text-brick-grey-900 underline transition-colors">
              Reset
            </button>
          </div>

          <ControlRow label="Type">
            <div className="flex flex-wrap gap-8 justify-end">
              {TYPES.map(t => (
                <ChipButton key={t} active={type === t} onClick={() => setType(t)}>{t}</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="Size">
            <div className="flex flex-wrap gap-8 justify-end">
              {SIZES.map(s => (
                <ChipButton key={s} active={size === s} onClick={() => setSize(s)}>{s}px</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="State">
            <div className="flex flex-wrap gap-8 justify-end">
              {STATES.map(st => (
                <ChipButton key={st} active={state === st} onClick={() => setState(st)}>{st}</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="Show status">
            <Toggle checked={showStatus} onChange={setShowStatus} />
          </ControlRow>

          {type === 'Image' && (
            <ControlRow label="Image URL">
              <TextInput value={src} onChange={setSrc} />
            </ControlRow>
          )}

          {type === 'Initials' && (
            <ControlRow label="Initials">
              <TextInput value={initials} onChange={v => setInitials(v.slice(0, 3).toUpperCase())} />
            </ControlRow>
          )}
        </div>

        {/* Preview */}
        <div className="flex-1 bg-brick-grey-100 flex items-center justify-center p-48">
          <Avatar
            type={type}
            size={size}
            state={state}
            showStatus={showStatus}
            initials={initials}
            src={type === 'Image' ? src : undefined}
          />
        </div>
      </div>
    </div>
  );
}
