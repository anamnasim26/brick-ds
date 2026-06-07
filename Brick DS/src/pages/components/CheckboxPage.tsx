import { useState } from 'react';
import { Checkbox, type CheckboxProps } from '@/components/Checkbox';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { ComponentTabs, UsageDoc, BulletList, type ChangelogEntry } from '@/components/layout/ComponentTabs';

type CbType      = NonNullable<CheckboxProps['type']>;
type CbSelection = NonNullable<CheckboxProps['selection']>;
type CbState     = NonNullable<CheckboxProps['state']>;
type CbSize      = NonNullable<CheckboxProps['size']>;

const TYPES:      CbType[]      = ['Primary', 'Failure', 'Success', 'Warning', 'Info'];
const SELECTIONS: CbSelection[] = ['Unchecked', 'Checked', 'Indeterminate'];
const STATES:     CbState[]     = ['Default', 'Hover', 'Pressed', 'Disabled'];
const SIZES:      CbSize[]      = ['16', '20'];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors cursor-pointer ${checked ? 'bg-active-blue-500' : 'bg-brick-grey-400'}`}
    >
      <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  );
}

function ControlRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-16 py-12 border-b border-brick-grey-300 last:border-none">
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
      className="w-[360px] text-14 text-brick-grey-900 border border-brick-grey-400 rounded-8 px-8 py-4 focus:outline-none focus:border-active-blue-500 bg-brick-grey-white"
    />
  );
}

const DEFAULTS = {
  type:        'Primary'   as CbType,
  selection:   'Unchecked' as CbSelection,
  state:       'Default'   as CbState,
  size:        '16'        as CbSize,
  label:       true,
  labelText:   'Checkbox Label',
  caption:     true,
  captionText: 'This is a caption or a description',
};

export function CheckboxPage() {
  const [type,        setType]        = useState<CbType>(DEFAULTS.type);
  const [selection,   setSelection]   = useState<CbSelection>(DEFAULTS.selection);
  const [state,       setState]       = useState<CbState>(DEFAULTS.state);
  const [size,        setSize]        = useState<CbSize>(DEFAULTS.size);
  const [label,       setLabel]       = useState(DEFAULTS.label);
  const [labelText,   setLabelText]   = useState(DEFAULTS.labelText);
  const [caption,     setCaption]     = useState(DEFAULTS.caption);
  const [captionText, setCaptionText] = useState(DEFAULTS.captionText);

  const reset = () => {
    setType(DEFAULTS.type); setSelection(DEFAULTS.selection); setState(DEFAULTS.state);
    setSize(DEFAULTS.size); setLabel(DEFAULTS.label); setLabelText(DEFAULTS.labelText);
    setCaption(DEFAULTS.caption); setCaptionText(DEFAULTS.captionText);
  };


  const changelog: ChangelogEntry[] = [
    {
      version: 'v1.0',
      date: 'June 2026',
      changes: [
        { type: 'Added', items: ['Initial release — 5 semantic types', '4 interactive states: Default, Hover, Focused, Disabled', '3 selection modes: Selected, Unselected, Indeterminate', '2 sizes: Default (20px), Small (16px)', 'Optional label and caption text slots'] },
      ],
    },
  ];

  const usageContent = (
    <UsageDoc sections={[
      { title: 'Usage', body: <><p className="text-16 text-brick-grey-700 leading-28 mb-8">Checkboxes allow users to select one or more items from a list, or to toggle a single binary option on or off.</p><BulletList items={['Checked: the option is selected.','Unchecked: the option is not selected.','Indeterminate: used in parent checkboxes when only some children are selected — never set this manually as an initial state.']}/></> },
      { title: 'Accessibility', body: <BulletList items={['Always associate a visible label with the checkbox using htmlFor / id pairing or aria-labelledby.','Group related checkboxes inside a <fieldset> with a <legend> describing the group.','The indeterminate state must be set via the indeterminate DOM property — it cannot be set with a CSS class alone.','Provide caption text for complex options that need additional explanation.']}/> },
      { title: 'Best practices', body: <BulletList items={['Use checkboxes for multi-select. For a single binary toggle in a settings context, consider a Switch instead.','List options vertically when possible — horizontal checkbox lists are harder to scan.','Avoid pre-checking options that have privacy or cost implications.','Use indeterminate only for parent \"select all\" controls, never as an ambiguous initial state.']}/> },
      { title: 'Content guidelines', body: <BulletList items={['Label text should describe the selected state: \"Receive email updates\" (not \"Email updates\").','Keep labels short and parallel in structure across a group.','Caption text should explain consequences or constraints, not repeat the label.']}/> },
    ]} />
  );
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">checkbox</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          5 semantic types · 4 states · 3 selection modes · 2 sizes · optional label and caption.
        </p>
      </div>

      <ComponentTabs usage={usageContent} changelog={changelog} playground={<div className="flex flex-1 min-h-0">
        {/* Controls */}
        <div className="w-[600px] shrink-0 border-r border-brick-grey-300 bg-brick-grey-white p-24 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-16">
            <p className="text-12 font-semibold text-brick-grey-600 uppercase tracking-[0.08em]">Playground</p>
            <button onClick={reset} className="text-12 text-brick-grey-600 hover:text-brick-grey-950 underline transition-colors">Reset</button>
          </div>

          <ControlRow label="Type">
            <div className="flex flex-wrap gap-8 justify-end">
              {TYPES.map(t => <ChipButton key={t} active={type === t} onClick={() => setType(t)}>{t}</ChipButton>)}
            </div>
          </ControlRow>

          <ControlRow label="Selection">
            <div className="flex flex-wrap gap-8 justify-end">
              {SELECTIONS.map(s => <ChipButton key={s} active={selection === s} onClick={() => setSelection(s)}>{s}</ChipButton>)}
            </div>
          </ControlRow>

          <ControlRow label="State">
            <div className="flex flex-wrap gap-8 justify-end">
              {STATES.map(s => <ChipButton key={s} active={state === s} onClick={() => setState(s)}>{s}</ChipButton>)}
            </div>
          </ControlRow>

          <ControlRow label="Size">
            <div className="flex flex-wrap gap-8 justify-end">
              {SIZES.map(s => <ChipButton key={s} active={size === s} onClick={() => setSize(s)}>{s}px</ChipButton>)}
            </div>
          </ControlRow>

          <ControlRow label="Show Label">
            <Toggle checked={label} onChange={setLabel} />
          </ControlRow>

          {label && (
            <ControlRow label="Label text">
              <TextInput value={labelText} onChange={setLabelText} />
            </ControlRow>
          )}

          <ControlRow label="Show Caption">
            <Toggle checked={caption} onChange={setCaption} />
          </ControlRow>

          {caption && (
            <ControlRow label="Caption text">
              <TextInput value={captionText} onChange={setCaptionText} />
            </ControlRow>
          )}
        </div>

        {/* Preview */}
        <PreviewPanel code={[
          `import { Checkbox } from '@/components/Checkbox';`,
          ``,
          `export default function Example() {`,
          `  return (`,
          `    <Checkbox`,
          `      type="${type}"`,
          `      selection="${selection}"`,
          `      state="${state}"`,
          `      size="${size}"`,
          `      label={${label}}`,
          label ? `      labelText="${labelText}"` : null,
          `      caption={${caption}}`,
          caption ? `      captionText="${captionText}"` : null,
          `    />`,
          `  );`,
          `}`,
        ].filter(l => l !== null).join('\n')}>
          <Checkbox type={type} selection={selection} state={state} size={size} label={label} labelText={labelText} caption={caption} captionText={captionText} />
        </PreviewPanel>
      </div>} />
    </div>
  );
}
