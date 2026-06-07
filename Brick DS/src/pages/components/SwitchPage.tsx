import { useState } from 'react';
import { Switch, type SwitchProps } from '@/components/Switch/Switch';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { ComponentTabs, UsageDoc, BulletList, type ChangelogEntry } from '@/components/layout/ComponentTabs';
import { type SwitchState } from '@/components/Switch/SwitchToggle';

const STATES: SwitchState[] = ['Default', 'Hover', 'Focus', 'Disabled'];

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

const DEFAULTS: Required<Omit<SwitchProps, 'onChange' | 'className'>> = {
  pressed:   false,
  state:     'Default',
  label:     true,
  labelText: 'Label',
};

export function SwitchPage() {
  const [pressed,   setPressed]   = useState(DEFAULTS.pressed);
  const [state,     setState]     = useState<SwitchState>(DEFAULTS.state);
  const [label,     setLabel]     = useState(DEFAULTS.label);
  const [labelText, setLabelText] = useState(DEFAULTS.labelText);

  const reset = () => {
    setPressed(DEFAULTS.pressed);
    setState(DEFAULTS.state);
    setLabel(DEFAULTS.label);
    setLabelText(DEFAULTS.labelText);
  };


  const changelog: ChangelogEntry[] = [
    {
      version: 'v1.0',
      date: 'June 2026',
      changes: [
        { type: 'Added', items: ['Initial release — 5 colour variants', '4 interactive states: Default, Hover, Focused, Disabled', 'Pressed (on) and Unpressed (off) modes', '2 sizes: Default and Small', 'Optional label aligned left or right'] },
      ],
    },
  ];

  const usageContent = (
    <UsageDoc sections={[
      { title: 'Usage', body: <><p className="text-16 text-brick-grey-700 leading-28 mb-8">Switches toggle a single setting on or off. Unlike checkboxes, switches take immediate effect without requiring a form submission.</p><BulletList items={['Use for settings that apply instantly — e.g. enabling notifications, toggling dark mode.','Use a checkbox instead when the change is part of a form that requires a Save action.','Use a checkbox instead when the user is selecting items from a list, not toggling settings.']}/></> },
      { title: 'Accessibility', body: <BulletList items={['The switch should use role=\"switch\" with aria-checked reflecting the current state.','The label must be programmatically associated — use htmlFor or aria-labelledby.','State change should be announced to screen readers; ensure the aria-checked value updates.','Don\'t use colour alone to convey state — the thumb position must also communicate on vs. off.']}/> },
      { title: 'Best practices', body: <BulletList items={['The switch label should describe what is being toggled, not the state: \"Email notifications\" not \"On\".','Apply changes immediately on toggle — never require a submit button paired with a switch.','Avoid groups of more than 5–6 switches on a single screen without sectioning.','Show a loading state if the toggle triggers an async operation before it completes.']}/> },
      { title: 'Content guidelines', body: <BulletList items={['Labels: noun phrases describing the feature — \"Push notifications\", \"Auto-save\", \"Two-factor authentication\".','Avoid labels that only make sense in one state: \"Enabled\" is ambiguous when the switch is off.','Don\'t add \"Enable\" or \"Turn on\" to the label — the switch affordance communicates this.']}/> },
    ]} />
  );
  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">switch</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          4 states · on / off · optional label text.
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

          <ControlRow label="State">
            <div className="flex flex-wrap gap-8 justify-end">
              {STATES.map(s => (
                <ChipButton key={s} active={state === s} onClick={() => setState(s)}>{s}</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="Pressed">
            <Toggle checked={pressed} onChange={setPressed} />
          </ControlRow>

          <ControlRow label="Show Label">
            <Toggle checked={label} onChange={setLabel} />
          </ControlRow>

          {label && (
            <ControlRow label="Label text">
              <TextInput value={labelText} onChange={setLabelText} />
            </ControlRow>
          )}
        </div>

        {/* Preview */}
        <PreviewPanel code={[
          `import { useState } from 'react';`,
          `import { Switch } from '@/components/Switch/Switch';`,
          ``,
          `export default function Example() {`,
          `  const [pressed, setPressed] = useState(${pressed});`,
          ``,
          `  return (`,
          `    <Switch`,
          `      pressed={pressed}`,
          `      state="${state}"`,
          `      label={${label}}`,
          label ? `      labelText="${labelText}"` : null,
          `      onChange={setPressed}`,
          `    />`,
          `  );`,
          `}`,
        ].filter(l => l !== null).join('\n')}>
          <Switch pressed={pressed} state={state} label={label} labelText={labelText} onChange={setPressed} />
        </PreviewPanel>
      </div>} />
    </div>
  );
}
