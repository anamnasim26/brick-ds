import { useState } from 'react';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { ComponentTabs, UsageDoc, BulletList, type ChangelogEntry } from '@/components/layout/ComponentTabs';
import { Radio, type RadioProps } from '@/components/Radio/Radio';

type RadioType = NonNullable<RadioProps['type']>;
const TYPES: RadioType[] = ['Default', 'Selected', 'Disabled'];

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
  type:        'Default' as RadioType,
  label:       true,
  labelText:   'Radio Button Label',
  caption:     true,
  captionText: 'This is a caption or a description',
};

export function RadioPage() {
  const [type,        setType]        = useState<RadioType>(DEFAULTS.type);
  const [label,       setLabel]       = useState(DEFAULTS.label);
  const [labelText,   setLabelText]   = useState(DEFAULTS.labelText);
  const [caption,     setCaption]     = useState(DEFAULTS.caption);
  const [captionText, setCaptionText] = useState(DEFAULTS.captionText);

  const reset = () => {
    setType(DEFAULTS.type);
    setLabel(DEFAULTS.label);
    setLabelText(DEFAULTS.labelText);
    setCaption(DEFAULTS.caption);
    setCaptionText(DEFAULTS.captionText);
  };


  const changelog: ChangelogEntry[] = [
    {
      version: 'v1.0',
      date: 'June 2026',
      changes: [
        { type: 'Added', items: ['Initial release — 5 semantic types matching the design system palette', '4 interactive states: Default, Hover, Focused, Disabled', 'Selected and Unselected selection modes', '2 sizes: Default (20px), Small (16px)', 'Optional label and caption text'] },
      ],
    },
  ];

  const usageContent = (
    <UsageDoc sections={[
      { title: 'Usage', body: <><p className="text-16 text-brick-grey-700 leading-28 mb-8">Radio buttons allow users to select exactly one option from a set. All options are visible at once, making the full choice set immediately apparent.</p><BulletList items={['Use when exactly one option must be selected from a small set (2–7 options).','For larger sets, consider a select dropdown instead.','Never use a single radio button — use a checkbox for a binary on/off choice.','One option should always be pre-selected as a sensible default.']}/></> },
      { title: 'Accessibility', body: <BulletList items={['Wrap radio groups in a <fieldset> with a <legend> that describes the group question.','Radio buttons within a group should share the same name attribute for native grouping.','Keyboard: Arrow keys navigate within the group; Space selects the focused option.','Don\'t disable all options in a group — if no option is valid, remove the field.']}/> },
      { title: 'Best practices', body: <BulletList items={['List options vertically — horizontal radio lists are harder to scan and label-associate.','Pre-select the most common or safest option to reduce decision fatigue.','Avoid using radio buttons for settings that take immediate effect — use a select or switch.','Caption text is ideal for explaining the implications of an option (e.g. pricing tier differences).']}/> },
      { title: 'Content guidelines', body: <BulletList items={['Labels should be parallel in structure: all noun phrases or all verb phrases, not mixed.','Keep labels short — the caption is where you add detail.','Caption text should be 1 sentence maximum and explain the consequence or context of the option.','Avoid negative framing: \"Allow notifications\" not \"Don\'t block notifications\".']}/> },
    ]} />
  );
  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">radio button</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          3 states · optional label and caption · 2 sizes for the inner button.
        </p>
      </div>

      <ComponentTabs usage={usageContent} changelog={changelog} playground={<div className="flex flex-1 min-h-0">
        {/* Controls */}
        <div className="w-[600px] shrink-0 border-r border-brick-grey-300 bg-brick-grey-white p-24 flex flex-col overflow-y-auto min-h-0">
          <div className="flex items-center justify-between mb-16">
            <p className="text-12 font-semibold text-brick-grey-600 uppercase tracking-[0.08em]">Playground</p>
            <button onClick={reset} className="text-12 text-brick-grey-600 hover:text-brick-grey-950 underline transition-colors">
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
          `import { Radio } from '@/components/Radio';`,
          ``,
          `export default function Example() {`,
          `  return (`,
          `    <Radio`,
          `      type="${type}"`,
          `      label={${label}}`,
          label ? `      labelText="${labelText}"` : null,
          `      caption={${caption}}`,
          caption ? `      captionText="${captionText}"` : null,
          `    />`,
          `  );`,
          `}`,
        ].filter(l => l !== null).join('\n')}>
          <Radio type={type} label={label} labelText={labelText} caption={caption} captionText={captionText} />
        </PreviewPanel>
      </div>} />
    </div>
  );
}
