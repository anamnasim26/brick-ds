import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { buttonVariants } from '@/components/Button/Button';
import { ComponentTabs, UsageDoc, BulletList, type ChangelogEntry } from '@/components/layout/ComponentTabs';
import { Tooltip, type TooltipProps } from '@/components/Tooltip/Tooltip';

type TooltipColour        = NonNullable<TooltipProps['colour']>;
type TooltipArrowPosition = NonNullable<TooltipProps['arrowPosition']>;

const COLOURS:         TooltipColour[]        = ['Brand', 'Black'];
const ARROW_POSITIONS: TooltipArrowPosition[] = [
  'Bottom Left', 'Bottom Center', 'Bottom Right',
  'Top Left',    'Top Center',    'Top Right',
  'Left',        'Right',
];

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
      <div className="flex flex-wrap items-center gap-4 justify-end">{children}</div>
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
      className="w-[200px] text-14 text-brick-grey-900 border border-brick-grey-400 rounded-8 px-8 py-4 focus:outline-none focus:border-active-blue-500 bg-brick-grey-white"
    />
  );
}

const DEFAULTS = {
  colour:        'Brand'       as TooltipColour,
  arrowPosition: 'Bottom Left' as TooltipArrowPosition,
  label:         true,
  labelText:     'Tooltip Label',
  caption:       true,
  captionText:   'This is a caption or a description',
  showCloseIcon: true,
};

export function TooltipPage() {
  const [colour,        setColour]        = useState<TooltipColour>(DEFAULTS.colour);
  const [arrowPosition, setArrowPosition] = useState<TooltipArrowPosition>(DEFAULTS.arrowPosition);
  const [label,         setLabel]         = useState(DEFAULTS.label);
  const [labelText,     setLabelText]     = useState(DEFAULTS.labelText);
  const [caption,       setCaption]       = useState(DEFAULTS.caption);
  const [captionText,   setCaptionText]   = useState(DEFAULTS.captionText);
  const [showCloseIcon, setShowCloseIcon] = useState(DEFAULTS.showCloseIcon);

  const reset = () => {
    setColour(DEFAULTS.colour);
    setArrowPosition(DEFAULTS.arrowPosition);
    setLabel(DEFAULTS.label);
    setLabelText(DEFAULTS.labelText);
    setCaption(DEFAULTS.caption);
    setCaptionText(DEFAULTS.captionText);
    setShowCloseIcon(DEFAULTS.showCloseIcon);
  };


  const changelog: ChangelogEntry[] = [
    {
      version: 'v1.0',
      date: 'June 2026',
      changes: [
        { type: 'Added', items: ['Initial release — Dark and Light colour variants', '4 placements: Top, Bottom, Left, Right', 'Optional arrow indicator', 'Optional close icon for persistent tooltips', 'Primary text and secondary caption slots'] },
      ],
    },
  ];

  const usageContent = (
    <UsageDoc sections={[
      { title: 'Usage', body: <><p className="text-16 text-brick-grey-700 leading-28 mb-8">Tooltips reveal supplementary information when a user hovers or focuses on an element. They provide non-essential context that would clutter the main UI if always visible.</p><BulletList items={['Use to explain icon-only buttons that lack a visible label.','Use to surface keyboard shortcuts or command names.','Use to show the full text of a truncated string.','Don\'t use for critical or required information — tooltips are not visible on touch devices.']}/></> },
      { title: 'Accessibility', body: <BulletList items={['Tooltips must be triggered by a focusable element — never attach them to non-interactive elements like a plain <div>.','Use role=\"tooltip\" and connect it to the trigger via aria-describedby.','Never put actionable content (links, buttons) inside a tooltip.','Tooltip content must be accessible on focus, not just on hover.','Don\'t place tooltips on disabled elements — disabled buttons cannot receive focus.']}/> },
      { title: 'Best practices', body: <BulletList items={['Keep tooltip content very short — 1–2 lines maximum.','Don\'t repeat content already visible on screen.','Choose placement thoughtfully to avoid clipping against viewport edges.','Add a short delay (150–300ms) before showing to prevent accidental triggering during mouse movement.','The close icon is for persistent tooltips only — standard hover tooltips should dismiss automatically.']}/> },
      { title: 'Content guidelines', body: <BulletList items={['Write in sentence case. No trailing full stops for short fragments.','Be specific: \"Delete this project permanently\" not \"Delete\".','Caption text adds a second line of context — don\'t pad a single-line tooltip with an empty caption.','Avoid \"Click to...\" or \"Hover to...\" — describe the outcome, not the interaction.']}/> },
    ]} />
  );
  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="px-16 pt-24 pb-20 sm:px-32 sm:pt-32 sm:pb-24 md:px-48 md:pt-40 md:pb-32 border-b border-brick-grey-300 bg-brick-grey-white flex flex-wrap items-start justify-between gap-16 md:gap-24">
        <div>
          <p className="text-12 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-8">Component · V 1.0</p>
          <h1 className="text-32 sm:text-40 md:text-48 font-bold text-brick-grey-950 leading-tight mb-8 md:mb-12">tooltip</h1>
          <p className="text-16 text-brick-grey-600 leading-24">
            Small popover that appears on hover. Two colour styles — brand and black — with eight arrow positions.
          </p>
        </div>
        <a
          href="https://brick-ds-storybook.vercel.app/?path=/docs/components-tooltip--docs"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: 'Secondary', size: 'Small' }) + ' shrink-0 mt-8'}
        >
          <span className="truncate">Storybook</span>
          <ExternalLink className="size-[20px] shrink-0" />
        </a>
      </div>

      <ComponentTabs usage={usageContent} changelog={changelog} playground={<div className="flex flex-col-reverse md:flex-row flex-1 min-h-0">
        {/* Controls */}
        <div className="w-full md:w-[560px] md:shrink-0 border-t md:border-t-0 md:border-r border-brick-grey-300 bg-brick-grey-white p-24 flex flex-col overflow-y-auto min-h-0">
          <div className="flex items-center justify-between mb-16">
            <p className="text-12 font-semibold text-brick-grey-600 uppercase tracking-[0.08em]">Playground</p>
            <button onClick={reset} className="text-12 text-brick-grey-600 hover:text-brick-grey-950 underline transition-colors">
              Reset
            </button>
          </div>

          <ControlRow label="Colour">
            <div className="flex gap-8">
              {COLOURS.map(c => (
                <ChipButton key={c} active={colour === c} onClick={() => setColour(c)}>{c}</ChipButton>
              ))}
            </div>
          </ControlRow>

          <ControlRow label="Arrow position">
            <div className="flex flex-wrap gap-4 justify-end">
              {ARROW_POSITIONS.map(p => (
                <ChipButton key={p} active={arrowPosition === p} onClick={() => setArrowPosition(p)}>{p}</ChipButton>
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

          <ControlRow label="Close icon">
            <Toggle checked={showCloseIcon} onChange={setShowCloseIcon} />
          </ControlRow>
        </div>

        {/* Preview */}
        <PreviewPanel code={[
          `import { Tooltip } from '@/components/Tooltip';`,
          ``,
          `export default function Example() {`,
          `  return (`,
          `    <Tooltip`,
          `      colour="${colour}"`,
          `      arrowPosition="${arrowPosition}"`,
          `      label={${label}}`,
          label ? `      labelText="${labelText}"` : null,
          `      caption={${caption}}`,
          caption ? `      captionText="${captionText}"` : null,
          `      showCloseIcon={${showCloseIcon}}`,
          `    />`,
          `  );`,
          `}`,
        ].filter(l => l !== null).join('\n')}>
          <Tooltip colour={colour} arrowPosition={arrowPosition} label={label} labelText={labelText} caption={caption} captionText={captionText} showCloseIcon={showCloseIcon} />
        </PreviewPanel>
      </div>} />
    </div>
  );
}
