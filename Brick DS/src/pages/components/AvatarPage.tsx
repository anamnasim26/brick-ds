import { useState } from 'react';
import { Avatar, type AvatarProps } from '@/components/Avatar';
import { PreviewPanel } from '@/components/layout/PreviewPanel';
import { ComponentTabs, UsageDoc, BulletList, type ChangelogEntry } from '@/components/layout/ComponentTabs';

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
      className="w-[360px] text-14 text-brick-grey-900 border border-brick-grey-400 rounded-8 px-8 py-4 focus:outline-none focus:border-active-blue-500 bg-brick-grey-white"
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


  const changelog: ChangelogEntry[] = [
    {
      version: 'v1.0',
      date: 'June 2026',
      changes: [
        { type: 'Added', items: ['Initial release — Image, Initials, and Icon modes', '4 sizes: 24px, 32px, 40px, 56px', 'Optional online / offline / busy / away status dot', 'Automatic initials truncation to 2 characters'] },
      ],
    },
  ];

  const usageContent = (
    <UsageDoc sections={[
      { title: 'Usage', body: <><p className="text-16 text-brick-grey-700 leading-28 mb-8">Avatars represent a person or entity visually. Use them wherever identity context is important — in comments, assignees, mentions, and profile areas.</p><BulletList items={['Image: use when a real photo is available. Always provide a fallback.','Initials: derive from the user\'s first and last name. Use two characters maximum.','Icon: fallback when no image or name is known — e.g. an anonymous or deleted account.']}/></> },
      { title: 'Accessibility', body: <BulletList items={['Always supply an alt attribute for image avatars describing who the person is.','Icon and Initials avatars should have an aria-label with the person\'s name.','The status dot communicates availability — pair it with a visually hidden text label, e.g. \"Available\".','Don\'t rely solely on the status colour; the label is required for screen reader users.']}/> },
      { title: 'Best practices', body: <BulletList items={['Choose the size appropriate to context: 56px for profile headers, 40px for cards, 32px for lists, 24px for dense rows.','Show the status dot only when the availability state is relevant to the user\'s current task.','In a group of avatars, use consistent sizes and types — don\'t mix image and icon avatars in the same list.','Use a coloured background for initials avatars to aid quick identification across a group.']}/> },
      { title: 'Content guidelines', body: <BulletList items={['Initials should be 1–2 uppercase characters derived from the person\'s name.','For unnamed users, use the Icon variant rather than \"?\" or \"N/A\" as initials.','Status labels: Available, Away, Busy, Offline — keep these consistent across your product.']}/> },
    ]} />
  );
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

      <ComponentTabs usage={usageContent} changelog={changelog} playground={<div className="flex flex-1">
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
        </div>

        {/* Preview */}
        <PreviewPanel code={[
          `import { Avatar } from '@/components/Avatar';`,
          ``,
          `export default function Example() {`,
          `  return (`,
          `    <Avatar`,
          `      type="${type}"`,
          `      size="${size}"`,
          `      state="${state}"`,
          `      showStatus={${showStatus}}`,
          type === 'Initials' ? `      initials="${initials}"` : null,
          type === 'Image'    ? `      src="${src}"` : null,
          `    />`,
          `  );`,
          `}`,
        ].filter(l => l !== null).join('\n')}>
          <Avatar type={type} size={size} state={state} showStatus={showStatus} initials={initials} src={type === 'Image' ? src : undefined} />
        </PreviewPanel>
      </div>} />
    </div>
  );
}
