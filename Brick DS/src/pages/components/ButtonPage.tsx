import { useState } from 'react';
import { Button, type ButtonProps } from '@/components/Button';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { ComponentTabs, UsageDoc, BulletList, type ChangelogEntry } from '@/components/layout/ComponentTabs';

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

  const changelog: ChangelogEntry[] = [
    {
      version: 'v1.0',
      date: 'June 2026',
      changes: [
        { type: 'Added', items: ['Initial release — 6 semantic variants (Primary, Secondary, Success, Warning, Failure, Info)', '3 sizes: Large, Medium, Small', '5 interactive states: Default, Hover, Pressed, Loading, Disabled', 'Optional left and right icon slots', 'Icon-only mode via withText toggle'] },
      ],
    },
  ];

  const usageContent = (
    <UsageDoc sections={[
      {
        title: 'Usage',
        body: <><p className="text-16 text-brick-grey-700 leading-28">Buttons trigger actions or navigate users through a flow. Each button variant communicates a different level of importance — use them consistently so users always know what to expect.</p><BulletList items={['Use Primary for the single most important action on a page or in a section.','Use Secondary for supporting actions that sit alongside a Primary.','Use Success, Warning, and Failure variants only for context-specific outcomes — e.g. a destructive confirm dialog.','Use Info for neutral, low-emphasis actions that don\'t belong to a semantic state.']}/></>,
      },
      {
        title: 'Accessibility',
        body: <BulletList items={['Every button must have a visible, descriptive label. If icon-only, supply an aria-label.','Avoid disabling buttons wherever possible — prefer showing an error or explaining why the action is unavailable.','Disabled buttons are not focusable by default; do not place tooltips on them.','The Loading state suppresses the click handler — always pair it with an accessible loading announcement.','Buttons use a native <button> element and are keyboard-focusable by default.']}/>,
      },
      {
        title: 'Best practices',
        body: <BulletList items={['Limit each view to one Primary button. Multiple primaries compete for attention.','Don\'t use a button when a link is more appropriate (navigating to a URL with no side effects).','Keep button labels short — one to three words is ideal.','Pair Left Icon with context-setting glyphs (e.g. Plus for Add), Right Icon for directional affordance (e.g. ChevronRight).','Size consistently within a single surface: don\'t mix Large and Small in the same control group.']}/>,
      },
      {
        title: 'Content guidelines',
        body: <><p className="text-16 text-brick-grey-700 leading-28 mb-8">Write button labels as imperative verb phrases that describe the outcome of the action.</p><BulletList items={['✓ Save changes · ✗ Saving / Save', '✓ Delete account · ✗ Account deletion', '✓ Add member · ✗ New member', 'Avoid filler words: "Click here", "Please", "OK"', 'Sentence case only — no ALL CAPS or Title Case Unless Brand Name']}/></>,
      },
    ]} />
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-48 pt-40 pb-32 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
        <h1 className="text-48 font-bold text-brick-grey-950 leading-48 mb-12">button</h1>
        <p className="text-16 text-brick-grey-600 leading-24">
          6 semantic variants · 3 sizes · 5 states · optional left/right icons.
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

          <ControlRow label="With Text">
            <Toggle checked={withText} onChange={setWithText} />
          </ControlRow>

          {withText && (
            <ControlRow label="Label">
              <TextInput value={label} onChange={setLabel} />
            </ControlRow>
          )}

          <ControlRow label="Show Left Icon">
            <Toggle checked={showLeftIcon} onChange={setShowLeftIcon} />
          </ControlRow>

          <ControlRow label="Show Right Icon">
            <Toggle checked={showRightIcon} onChange={setShowRightIcon} />
          </ControlRow>
        </div>

        {/* Preview */}
        <PreviewPanel code={[
          `import { Button } from '@/components/Button';`,
          ``,
          `export default function Example() {`,
          `  return (`,
          `    <Button`,
          `      variant="${variant}"`,
          `      state="${state}"`,
          `      size="${size}"`,
          withText ? `      label="${label}"` : null,
          `      showLeftIcon={${showLeftIcon}}`,
          `      showRightIcon={${showRightIcon}}`,
          `      withText={${withText}}`,
          `    />`,
          `  );`,
          `}`,
        ].filter(l => l !== null).join('\n')}>
          <Button
            variant={variant}
            state={state}
            size={size}
            label={label}
            showLeftIcon={showLeftIcon}
            showRightIcon={showRightIcon}
            withText={withText}
          />
        </PreviewPanel>
      </div>} />
    </div>
  );
}
