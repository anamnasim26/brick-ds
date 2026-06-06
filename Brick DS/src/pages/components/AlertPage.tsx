import { useState } from 'react';
import { Alert, type AlertProps } from '@/components/Alert';

type Variant = NonNullable<AlertProps['variant']>;
const VARIANTS: Variant[] = ['general', 'success', 'warning', 'failure', 'info'];

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
  variant: 'general' as Variant,
  heading: 'Alert message goes here.',
  supportingText: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
  showSupportingText: true,
  showActions: true,
  showCloseIcon: true,
  primaryLabel: 'Button',
  secondaryLabel: 'Button',
};

export function AlertPage() {
  const [variant, setVariant] = useState<Variant>(DEFAULTS.variant);
  const [heading, setHeading] = useState(DEFAULTS.heading);
  const [supportingText, setSupportingText] = useState(DEFAULTS.supportingText);
  const [showSupportingText, setShowSupportingText] = useState(DEFAULTS.showSupportingText);
  const [showActions, setShowActions] = useState(DEFAULTS.showActions);
  const [showCloseIcon, setShowCloseIcon] = useState(DEFAULTS.showCloseIcon);
  const [primaryLabel, setPrimaryLabel] = useState(DEFAULTS.primaryLabel);
  const [secondaryLabel, setSecondaryLabel] = useState(DEFAULTS.secondaryLabel);

  const reset = () => {
    setVariant(DEFAULTS.variant);
    setHeading(DEFAULTS.heading);
    setSupportingText(DEFAULTS.supportingText);
    setShowSupportingText(DEFAULTS.showSupportingText);
    setShowActions(DEFAULTS.showActions);
    setShowCloseIcon(DEFAULTS.showCloseIcon);
    setPrimaryLabel(DEFAULTS.primaryLabel);
    setSecondaryLabel(DEFAULTS.secondaryLabel);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">alert</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          Inline alert with 5 colour variants, optional supporting text, actions, and close icon.
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

          <ControlRow label="Variant">
            <div className="flex flex-wrap gap-8 justify-end">
              {VARIANTS.map(v => (
                <ChipButton key={v} active={variant === v} onClick={() => setVariant(v)}>{v}</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="Heading">
            <TextInput value={heading} onChange={setHeading} />
          </ControlRow>

          <ControlRow label="Supporting text">
            <Toggle checked={showSupportingText} onChange={setShowSupportingText} />
          </ControlRow>

          {showSupportingText && (
            <ControlRow label="Description">
              <TextInput value={supportingText} onChange={setSupportingText} />
            </ControlRow>
          )}

          <ControlRow label="Actions">
            <Toggle checked={showActions} onChange={setShowActions} />
          </ControlRow>

          {showActions && (
            <>
              <ControlRow label="Primary label">
                <TextInput value={primaryLabel} onChange={setPrimaryLabel} />
              </ControlRow>
              <ControlRow label="Secondary label">
                <TextInput value={secondaryLabel} onChange={setSecondaryLabel} />
              </ControlRow>
            </>
          )}

          <ControlRow label="Close icon">
            <Toggle checked={showCloseIcon} onChange={setShowCloseIcon} />
          </ControlRow>
        </div>

        {/* Preview */}
        <div className="flex-1 bg-brick-grey-100 flex items-center justify-center p-48">
          <Alert
            variant={variant}
            heading={heading}
            supportingText={supportingText}
            showSupportingText={showSupportingText}
            showActions={showActions}
            showCloseIcon={showCloseIcon}
            primaryActionLabel={primaryLabel}
            secondaryActionLabel={secondaryLabel}
          />
        </div>
      </div>
    </div>
  );
}
