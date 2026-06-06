import { useState } from 'react';
import { EmptyState, type EmptyStateProps, type IllustrationType } from '@/components/EmptyState';

type ESType = NonNullable<EmptyStateProps['type']>;

const TYPES: ESType[]             = ['Default', 'Outlined'];
const ILLUS: IllustrationType[]   = ['No Data', 'No Results', 'Error_404'];

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

function TextArea({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      rows={3}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-[180px] text-14 text-brick-grey-900 border border-brick-grey-400 rounded-8 px-8 py-4 focus:outline-none focus:border-active-blue-500 bg-brick-grey-white resize-none"
    />
  );
}

const DEFAULTS = {
  type:              'Default'  as ESType,
  illustrationType:  'No Data'  as IllustrationType,
  showIllustration:  true,
  showHeading:       true,
  headingText:       'Welcome to the page',
  showHelperText:    true,
  helperText:        'This page provides a place in your application to lay out information of your project, show the current status, and document things better, together.',
  showActionButtons: true,
  primaryLabel:      'Create the first page',
  secondaryLabel:    'Learn more',
};

export function EmptyStatePage() {
  const [type,              setType]              = useState<ESType>(DEFAULTS.type);
  const [illustrationType,  setIllustrationType]  = useState<IllustrationType>(DEFAULTS.illustrationType);
  const [showIllustration,  setShowIllustration]  = useState(DEFAULTS.showIllustration);
  const [showHeading,       setShowHeading]        = useState(DEFAULTS.showHeading);
  const [headingText,       setHeadingText]        = useState(DEFAULTS.headingText);
  const [showHelperText,    setShowHelperText]     = useState(DEFAULTS.showHelperText);
  const [helperText,        setHelperText]         = useState(DEFAULTS.helperText);
  const [showActionButtons, setShowActionButtons]  = useState(DEFAULTS.showActionButtons);
  const [primaryLabel,      setPrimaryLabel]       = useState(DEFAULTS.primaryLabel);
  const [secondaryLabel,    setSecondaryLabel]     = useState(DEFAULTS.secondaryLabel);

  const reset = () => {
    setType(DEFAULTS.type); setIllustrationType(DEFAULTS.illustrationType);
    setShowIllustration(DEFAULTS.showIllustration); setShowHeading(DEFAULTS.showHeading);
    setHeadingText(DEFAULTS.headingText); setShowHelperText(DEFAULTS.showHelperText);
    setHelperText(DEFAULTS.helperText); setShowActionButtons(DEFAULTS.showActionButtons);
    setPrimaryLabel(DEFAULTS.primaryLabel); setSecondaryLabel(DEFAULTS.secondaryLabel);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">empty state</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          2 variants · 3 illustration types · optional heading, helper text, and action buttons.
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
              {TYPES.map(t => <ChipButton key={t} active={type === t} onClick={() => setType(t)}>{t}</ChipButton>)}
            </div>
          </ControlRow>

          <ControlRow label="Illustration">
            <Toggle checked={showIllustration} onChange={setShowIllustration} />
          </ControlRow>

          {showIllustration && (
            <ControlRow label="Illustration type">
              <div className="flex flex-wrap gap-8 justify-end">
                {ILLUS.map(i => <ChipButton key={i} active={illustrationType === i} onClick={() => setIllustrationType(i)}>{i}</ChipButton>)}
              </div>
            </ControlRow>
          )}

          <ControlRow label="Show Heading">
            <Toggle checked={showHeading} onChange={setShowHeading} />
          </ControlRow>

          {showHeading && (
            <ControlRow label="Heading text">
              <TextInput value={headingText} onChange={setHeadingText} />
            </ControlRow>
          )}

          <ControlRow label="Show Helper Text">
            <Toggle checked={showHelperText} onChange={setShowHelperText} />
          </ControlRow>

          {showHelperText && (
            <ControlRow label="Helper text">
              <TextArea value={helperText} onChange={setHelperText} />
            </ControlRow>
          )}

          <ControlRow label="Action Buttons">
            <Toggle checked={showActionButtons} onChange={setShowActionButtons} />
          </ControlRow>

          {showActionButtons && (
            <>
              <ControlRow label="Primary label">
                <TextInput value={primaryLabel} onChange={setPrimaryLabel} />
              </ControlRow>
              <ControlRow label="Secondary label">
                <TextInput value={secondaryLabel} onChange={setSecondaryLabel} />
              </ControlRow>
            </>
          )}
        </div>

        {/* Preview */}
        <div className="flex-1 bg-brick-grey-100 flex items-center justify-center p-48 overflow-auto">
          <EmptyState
            type={type}
            illustrationType={illustrationType}
            showIllustration={showIllustration}
            showHeading={showHeading}
            headingText={headingText}
            showHelperText={showHelperText}
            helperText={helperText}
            showActionButtons={showActionButtons}
            primaryLabel={primaryLabel}
            secondaryLabel={secondaryLabel}
          />
        </div>
      </div>
    </div>
  );
}
