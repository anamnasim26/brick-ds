import { useState } from 'react';
import { Button, type ButtonProps } from '@/components/Button';

type Variant = NonNullable<ButtonProps['variant']>;
type State   = NonNullable<ButtonProps['state']>;
type Size    = NonNullable<ButtonProps['size']>;

const VARIANTS: Variant[] = ['Primary', 'Secondary', 'Success', 'Warning', 'Failure', 'Info'];
const STATES:   State[]   = ['Default', 'Hover', 'Pressed', 'Loading', 'Disabled'];
const SIZES:    Size[]    = ['Large', 'Small', 'Medium'];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors cursor-pointer ${checked ? 'bg-active-blue-500' : 'bg-brick-grey-400'}`}
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
      className={`px-12 py-4 rounded-8 text-14 font-medium border transition-colors ${
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
  variant:       'Primary'  as Variant,
  state:         'Default'  as State,
  size:          'Small'    as Size,
  label:         'Button',
  showLeftIcon:  true,
  showRightIcon: true,
  withText:      true,
};

export function ButtonPage() {
  const [variant,       setVariant]       = useState<Variant>(DEFAULTS.variant);
  const [state,         setState]         = useState<State>(DEFAULTS.state);
  const [size,          setSize]          = useState<Size>(DEFAULTS.size);
  const [label,         setLabel]         = useState(DEFAULTS.label);
  const [showLeftIcon,  setShowLeftIcon]  = useState(DEFAULTS.showLeftIcon);
  const [showRightIcon, setShowRightIcon] = useState(DEFAULTS.showRightIcon);
  const [withText,      setWithText]      = useState(DEFAULTS.withText);

  const reset = () => {
    setVariant(DEFAULTS.variant); setState(DEFAULTS.state); setSize(DEFAULTS.size);
    setLabel(DEFAULTS.label); setShowLeftIcon(DEFAULTS.showLeftIcon);
    setShowRightIcon(DEFAULTS.showRightIcon); setWithText(DEFAULTS.withText);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">button</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          6 semantic variants · 3 sizes · 5 states · optional left/right icons.
        </p>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Controls */}
        <div className="w-1/2 shrink-0 border-r border-brick-grey-300 bg-brick-grey-white p-24 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-16">
            <p className="text-12 font-semibold text-brick-grey-600 uppercase tracking-[0.08em]">Playground</p>
            <button onClick={reset} className="text-12 text-brick-grey-500 hover:text-brick-grey-900 underline transition-colors">Reset</button>
          </div>

          <ControlRow label="Type">
            <div className="flex flex-wrap gap-8 justify-end">
              {VARIANTS.map(v => (
                <ChipButton key={v} active={variant === v} onClick={() => setVariant(v)}>{v}</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="State">
            <div className="flex flex-wrap gap-8 justify-end">
              {STATES.map(s => (
                <ChipButton key={s} active={state === s} onClick={() => setState(s)}>{s}</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="Size">
            <div className="flex flex-wrap gap-8 justify-end">
              {SIZES.map(s => (
                <ChipButton key={s} active={size === s} onClick={() => setSize(s)}>{s}</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="Show Left Icon">
            <Toggle checked={showLeftIcon} onChange={setShowLeftIcon} />
          </ControlRow>

          <ControlRow label="Show Right Icon">
            <Toggle checked={showRightIcon} onChange={setShowRightIcon} />
          </ControlRow>

          <ControlRow label="With Text">
            <Toggle checked={withText} onChange={setWithText} />
          </ControlRow>

          <ControlRow label="Label">
            <TextInput value={label} onChange={setLabel} />
          </ControlRow>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-brick-grey-100 flex items-center justify-center p-48">
          <Button
            variant={variant}
            state={state}
            size={size}
            label={label}
            showLeftIcon={showLeftIcon}
            showRightIcon={showRightIcon}
            withText={withText}
          />
        </div>
      </div>
    </div>
  );
}
