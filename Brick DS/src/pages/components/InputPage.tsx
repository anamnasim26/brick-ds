import { useState } from 'react';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { ComponentTabs, UsageDoc, BulletList, type ChangelogEntry } from '@/components/layout/ComponentTabs';
import { Input, type InputState } from '@/components/Input';

const STATES: InputState[]       = ['Default-Unfilled', 'Hover', 'Filled', 'Focus', 'Error', 'Disabled'];
const LOCATIONS: ('Left'|'Right')[] = ['Left', 'Right'];

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
  state:              'Default-Unfilled' as InputState,
  helperTextLocation: 'Left'             as 'Left' | 'Right',
  label:              true,
  inputLabel:         'Label',
  required:           true,
  showLeftIcon:       true,
  showRightIcon:      true,
  helperText:         true,
  helperTextContent:  'This is a hint text to help user',
  placeholder:        'Input text',
};

export function InputPage() {
  const [state,              setState]              = useState<InputState>(DEFAULTS.state);
  const [helperTextLocation, setHelperTextLocation] = useState<'Left'|'Right'>(DEFAULTS.helperTextLocation);
  const [label,              setLabel]              = useState(DEFAULTS.label);
  const handleLabelChange = (v: boolean) => { setLabel(v); if (!v) setRequired(false); };
  const [inputLabel,         setInputLabel]         = useState(DEFAULTS.inputLabel);
  const [required,           setRequired]           = useState(DEFAULTS.required);
  const [showLeftIcon,       setShowLeftIcon]       = useState(DEFAULTS.showLeftIcon);
  const [showRightIcon,      setShowRightIcon]      = useState(DEFAULTS.showRightIcon);
  const [helperText,         setHelperText]         = useState(DEFAULTS.helperText);
  const [helperTextContent,  setHelperTextContent]  = useState(DEFAULTS.helperTextContent);
  const [placeholder,        setPlaceholder]        = useState(DEFAULTS.placeholder);

  const reset = () => {
    setState(DEFAULTS.state); setHelperTextLocation(DEFAULTS.helperTextLocation);
    setLabel(DEFAULTS.label); setInputLabel(DEFAULTS.inputLabel);
    setRequired(DEFAULTS.required); setShowLeftIcon(DEFAULTS.showLeftIcon);
    setShowRightIcon(DEFAULTS.showRightIcon); setHelperText(DEFAULTS.helperText);
    setHelperTextContent(DEFAULTS.helperTextContent); setPlaceholder(DEFAULTS.placeholder);
  };


  const changelog: ChangelogEntry[] = [
    {
      version: 'v1.0',
      date: 'June 2026',
      changes: [
        { type: 'Added', items: ['Initial release — Text, Number, Textbox, and OTP input types', '6 states: Default-Unfilled, Hover, Filled, Focus, Error, Disabled', 'Optional label, left icon, right icon, helper text, and required marker', 'Character counter and error message slots'] },
      ],
    },
  ];

  const usageContent = (
    <UsageDoc sections={[
      { title: 'Usage', body: <><p className="text-16 text-brick-grey-700 leading-28 mb-8">Inputs collect short-form text from users. Use the correct type to trigger appropriate mobile keyboards and enable browser auto-fill.</p><BulletList items={['Text: general string input for names, titles, search terms.','Number: numeric values — enables numeric keyboard on mobile.','Textbox: multi-line input for longer free-form text like descriptions or notes.','OTP: one-time password entry — auto-advances focus between digit fields.']}/></> },
      { title: 'Accessibility', body: <BulletList items={['Every input must have a visible label — never rely on placeholder text as the only label.','Use aria-required=\"true\" for required fields; don\'t only use a visual asterisk.','Link helper text to the input with aria-describedby so screen readers announce it.','Error messages should be associated with the input via aria-describedby and role=\"alert\".','Autocomplete attributes improve both usability and accessibility — use them on common fields.']}/> },
      { title: 'Best practices', body: <BulletList items={['Set input width to reflect the expected length of content — a postcode field shouldn\'t be full-width.','Left icons provide input type context (e.g. search icon, email icon). Right icons for actions (e.g. clear, reveal password).','Show helper text proactively for fields with constraints (character limits, format rules).','Validate on blur, not on every keystroke — premature errors are frustrating.','Mark required fields explicitly rather than marking optional ones.']}/> },
      { title: 'Content guidelines', body: <BulletList items={['Labels: noun phrases in sentence case — \"Email address\", \"First name\", \"Date of birth\".','Placeholders: show format examples, not the label — \"DD/MM/YYYY\", \"you@example.com\". Never required content.','Error messages: specific and actionable — \"Enter a valid email address\", not \"Invalid input\".','Helper text: explain format, constraints, or context proactively — \"Must be 8–20 characters\".']}/> },
    ]} />
  );
  return (
    <div className="flex flex-col h-full">
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">input field</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          6 states · left / right helper text · optional label, icons, and required marker.
        </p>
      </div>

      <ComponentTabs usage={usageContent} changelog={changelog} playground={<div className="flex flex-1 min-h-0">
        {/* Controls */}
        <div className="w-[600px] shrink-0 border-r border-brick-grey-300 bg-brick-grey-white p-24 flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between mb-16">
            <p className="text-12 font-semibold text-brick-grey-600 uppercase tracking-[0.08em]">Playground</p>
            <button onClick={reset} className="text-12 text-brick-grey-600 hover:text-brick-grey-950 underline transition-colors">Reset</button>
          </div>

          {/* State */}
          <ControlRow label="State">
            <div className="flex flex-wrap gap-8 justify-end">
              {STATES.map(s => <ChipButton key={s} active={state === s} onClick={() => setState(s)}>{s}</ChipButton>)}
            </div>
          </ControlRow>

          {/* Label + label text + required — grouped */}
          <ControlRow label="Show Label">
            <Toggle checked={label} onChange={handleLabelChange} />
          </ControlRow>

          {label && (
            <ControlRow label="Label text">
              <TextInput value={inputLabel} onChange={setInputLabel} />
            </ControlRow>
          )}

          <ControlRow label="Required">
            <div className={label ? '' : 'opacity-40 pointer-events-none'}>
              <Toggle checked={required} onChange={setRequired} />
            </div>
          </ControlRow>

          {/* Input content */}
          <ControlRow label="Placeholder text">
            <TextInput value={placeholder} onChange={setPlaceholder} />
          </ControlRow>

          {/* Icons */}
          <ControlRow label="Show Left Icon">
            <Toggle checked={showLeftIcon} onChange={setShowLeftIcon} />
          </ControlRow>

          <ControlRow label="Show Right Icon">
            <Toggle checked={showRightIcon} onChange={setShowRightIcon} />
          </ControlRow>

          {/* Helper text + content + location — grouped */}
          <ControlRow label="Show Helper Text">
            <Toggle checked={helperText} onChange={setHelperText} />
          </ControlRow>

          {helperText && (
            <>
              <ControlRow label="Helper text">
                <TextInput value={helperTextContent} onChange={setHelperTextContent} />
              </ControlRow>
              <ControlRow label="Helper text location">
                <div className="flex gap-8">
                  {LOCATIONS.map(l => <ChipButton key={l} active={helperTextLocation === l} onClick={() => setHelperTextLocation(l)}>{l}</ChipButton>)}
                </div>
              </ControlRow>
            </>
          )}
        </div>

        {/* Preview */}
        <PreviewPanel code={[
          `import { Input } from '@/components/Input';`,
          ``,
          `export default function Example() {`,
          `  return (`,
          `    <Input`,
          `      state="${state}"`,
          `      label={${label}}`,
          label ? `      inputLabel="${inputLabel}"` : null,
          `      required={${required}}`,
          `      showLeftIcon={${showLeftIcon}}`,
          `      showRightIcon={${showRightIcon}}`,
          `      placeholder="${placeholder}"`,
          `      helperText={${helperText}}`,
          helperText ? `      helperTextContent="${helperTextContent}"` : null,
          helperText ? `      helperTextLocation="${helperTextLocation}"` : null,
          `    />`,
          `  );`,
          `}`,
        ].filter(l => l !== null).join('\n')}>
          <Input state={state} label={label} inputLabel={inputLabel} required={required} showLeftIcon={showLeftIcon} showRightIcon={showRightIcon} helperText={helperText} helperTextContent={helperTextContent} helperTextLocation={helperTextLocation} placeholder={placeholder} />
        </PreviewPanel>
      </div>} />
    </div>
  );
}
