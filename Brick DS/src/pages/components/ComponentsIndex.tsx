import { useNavigate } from 'react-router-dom';
import { Info, X, Minus, Plus, FolderOpen } from 'lucide-react';

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-center rounded-t-12 h-[190px] overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #ffffff 0%, #d6e4f0 100%)' }}
    >
      {children}
    </div>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────────────
const TAlert = () => (
  <div className="scale-[0.62] origin-center">
    <div className="flex items-start gap-8 p-16 rounded-12 border border-brick-blue-500 bg-brick-blue-50 w-[380px] shadow-md">
      <Info className="size-6 shrink-0 text-brick-blue-500" aria-hidden="true" />
      <div className="flex flex-col gap-16 flex-1 min-w-0">
        <div className="flex flex-col gap-8">
          <p className="font-semibold text-16 leading-20 text-brick-grey-black">Alert message goes here.</p>
          <p className="text-16 leading-24 text-brick-grey-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur.</p>
        </div>
        <div className="flex items-center gap-16">
          <button className="inline-flex items-center justify-center px-20 py-8 h-[44px] rounded-12 bg-brick-blue-400 text-brick-grey-white font-semibold text-16">Button</button>
          <button className="inline-flex items-center justify-center px-20 py-8 h-[44px] rounded-12 bg-brick-grey-white text-brick-blue-500 font-semibold text-16">Button</button>
        </div>
      </div>
      <X className="size-6 shrink-0 text-brick-blue-500" aria-hidden="true" />
    </div>
  </div>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────
const TAvatar = () => (
  <div className="flex items-center justify-center gap-20">
    {/* Initials 56px + Available */}
    <div className="relative shrink-0">
      <div className="size-[72px] rounded-full bg-brick-blue-100 flex items-center justify-center shadow-lg">
        <span className="text-24 font-semibold text-brick-blue-500 leading-none select-none">AN</span>
      </div>
      <span className="absolute bottom-[2px] right-[2px] size-[14px] rounded-full bg-success-green-500 border-2 border-brick-grey-white" />
    </div>
    {/* Initials 56px + Away */}
    <div className="relative shrink-0">
      <div className="size-[56px] rounded-full bg-brick-blue-200 flex items-center justify-center shadow-lg">
        <span className="text-20 font-semibold text-brick-blue-600 leading-none select-none">RK</span>
      </div>
      <span className="absolute bottom-[1px] right-[1px] size-[12px] rounded-full bg-warning-yellow-500 border-2 border-brick-grey-white" />
    </div>
    {/* Initials 40px + Busy */}
    <div className="relative shrink-0">
      <div className="size-[40px] rounded-full bg-brick-blue-50 flex items-center justify-center shadow-lg">
        <span className="text-16 font-semibold text-brick-blue-400 leading-none select-none">JP</span>
      </div>
      <span className="absolute bottom-0 right-0 size-[10px] rounded-full bg-error-red-500 border-2 border-brick-grey-white" />
    </div>
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────
const TBadge = () => (
  <div className="flex flex-col gap-8 items-center">
    <div className="flex gap-6 items-center flex-wrap justify-center">
      {[
        { bg: '#eaeef1', border: '#425563', text: '#3c4d5a',  label: 'Primary' },
        { bg: '#dafbe1', border: '#1a7f37', text: '#044f1e',  label: 'Success' },
        { bg: '#ffebe9', border: '#cf222e', text: '#a40e26',  label: 'Failure' },
      ].map(({ bg, border, text, label }) => (
        <div key={label}
          className="inline-flex items-center gap-4 px-8 py-[4px] rounded-4 border text-[10px] font-medium shadow-sm"
          style={{ backgroundColor: bg, borderColor: border, color: text }}>
          <span style={{ color: border }}>–</span>
          {label}
          <span style={{ color: border }}>+</span>
        </div>
      ))}
    </div>
    <div className="flex gap-6">
      {[
        { bg: '#fef9e6', border: '#9a6700', text: '#7a5200',  label: 'Warning' },
        { bg: '#e7f3ff', border: '#0969da', text: '#0550ae',  label: 'Info'    },
      ].map(({ bg, border, text, label }) => (
        <div key={label}
          className="inline-flex items-center gap-4 px-8 py-[4px] rounded-4 border text-[10px] font-medium shadow-sm"
          style={{ backgroundColor: bg, borderColor: border, color: text }}>
          <span style={{ color: border }}>–</span>
          {label}
          <span style={{ color: border }}>+</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Button ───────────────────────────────────────────────────────────────────
const TButton = () => (
  <div className="scale-[0.72] origin-center flex flex-col items-center gap-16">
    {/* Row 1: Primary + Secondary */}
    <div className="flex gap-12 items-center">
      <button className="inline-flex items-center justify-center gap-8 rounded-12 font-semibold text-16 h-[44px] px-20 bg-brick-blue-400 text-brick-grey-white shadow-md">
        <Minus className="size-[20px] shrink-0" strokeWidth={2.5} />
        <span>Primary</span>
        <Plus className="size-[20px] shrink-0" strokeWidth={2.5} />
      </button>
      <button className="inline-flex items-center justify-center gap-8 rounded-12 font-semibold text-16 h-[44px] px-20 bg-brick-grey-white text-brick-blue-500 shadow-md">
        <Minus className="size-[20px] shrink-0" strokeWidth={2.5} />
        <span>Secondary</span>
        <Plus className="size-[20px] shrink-0" strokeWidth={2.5} />
      </button>
    </div>
    {/* Row 2: Success + Failure + Warning */}
    <div className="flex gap-12 items-center">
      <button className="inline-flex items-center justify-center gap-8 rounded-12 font-semibold text-16 h-[44px] px-20 bg-success-green-400 text-brick-grey-white shadow-md">
        <Minus className="size-[20px] shrink-0" strokeWidth={2.5} />
        <span>Success</span>
        <Plus className="size-[20px] shrink-0" strokeWidth={2.5} />
      </button>
      <button className="inline-flex items-center justify-center gap-8 rounded-12 font-semibold text-16 h-[44px] px-20 bg-error-red-500 text-brick-grey-white shadow-md">
        <Minus className="size-[20px] shrink-0" strokeWidth={2.5} />
        <span>Failure</span>
        <Plus className="size-[20px] shrink-0" strokeWidth={2.5} />
      </button>
      <button className="inline-flex items-center justify-center gap-8 rounded-12 font-semibold text-16 h-[44px] px-20 bg-warning-yellow-400 text-brick-grey-black shadow-md">
        <Minus className="size-[20px] shrink-0" strokeWidth={2.5} />
        <span>Warning</span>
        <Plus className="size-[20px] shrink-0" strokeWidth={2.5} />
      </button>
    </div>
  </div>
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────
const TCheckbox = () => (
  <div className="flex flex-col gap-8 w-[200px]">
    {[
      { checked: true,  indeterminate: false, label: 'Enable dark mode',   caption: 'Applies to all surfaces' },
      { checked: false, indeterminate: true,  label: 'Send notifications', caption: 'Some items selected'    },
      { checked: false, indeterminate: false, label: 'Auto-save drafts',   caption: 'Every 30 seconds'       },
    ].map(({ checked, indeterminate, label, caption }, i) => (
      <div key={i} className={`flex gap-8 items-start p-8 rounded-8 border bg-white shadow-md
        ${checked || indeterminate ? 'border-brick-blue-400' : 'border-brick-grey-300'}`}>
        <div className={`w-[16px] h-[16px] rounded-[3px] border-[2px] flex items-center justify-center shrink-0 mt-[1px]
          ${checked || indeterminate ? 'bg-brick-blue-500 border-brick-blue-500' : 'bg-white border-brick-grey-400'}`}>
          {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2.5 2.5L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          {indeterminate && <div className="w-[7px] h-[2px] bg-white rounded-full" />}
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className={`text-[10px] font-semibold leading-none ${checked || indeterminate ? 'text-brick-blue-600' : 'text-brick-grey-800'}`}>{label}</span>
          <span className={`text-[9px] ${checked || indeterminate ? 'text-brick-blue-400' : 'text-brick-grey-500'}`}>{caption}</span>
        </div>
      </div>
    ))}
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const TEmptyState = () => (
  <div className="scale-[0.72] origin-center flex items-center gap-20 p-20 rounded-16 bg-brick-grey-white border border-brick-grey-300 shadow-md w-[380px]">
    {/* Illustration */}
    <div className="w-[72px] h-[72px] rounded-12 bg-brick-blue-100 flex items-center justify-center shrink-0">
      <FolderOpen className="size-[36px] text-brick-blue-400" strokeWidth={1.25} />
    </div>
    {/* Text + actions */}
    <div className="flex flex-col gap-10 flex-1 min-w-0">
      <div className="flex flex-col gap-4">
        <p className="text-14 font-semibold text-brick-grey-950 leading-none">Welcome to the page</p>
        <p className="text-12 text-brick-grey-600 leading-[1.5]">This page provides a place to lay out information and document things better.</p>
      </div>
      <div className="flex gap-8">
        <button className="inline-flex items-center justify-center rounded-8 font-semibold text-12 h-[32px] px-12 bg-brick-blue-400 text-brick-grey-white">Create page</button>
        <button className="inline-flex items-center justify-center rounded-8 font-semibold text-12 h-[32px] px-12 bg-brick-grey-white text-brick-blue-500 border border-brick-grey-300">Learn more</button>
      </div>
    </div>
  </div>
);

// ─── Input ────────────────────────────────────────────────────────────────────
const TInput = () => (
  <div className="scale-[0.72] origin-center flex flex-col gap-20 w-[320px]">
    {/* Default – Unfilled */}
    <div className="flex flex-col gap-8">
      <span className="text-16 font-normal text-brick-grey-black">Email address *</span>
      <div className="flex items-center gap-8 px-12 py-8 rounded-12 border-[1.5px] border-brick-blue-200 bg-brick-grey-white min-h-[44px] shadow-md">
        <Plus className="size-24 shrink-0 text-brick-blue-300" strokeWidth={1.5} />
        <span className="flex-1 text-16 text-brick-blue-300">you@example.com</span>
        <Info className="size-24 shrink-0 text-brick-blue-300" strokeWidth={1.5} />
      </div>
      <span className="text-12 text-brick-grey-black">This is a hint text to help user</span>
    </div>
    {/* Focus */}
    <div className="flex flex-col gap-8">
      <span className="text-16 font-normal text-brick-grey-black">Password *</span>
      <div className="flex items-center gap-8 px-12 py-8 rounded-12 border-[1.5px] border-active-blue-500 bg-brick-grey-white min-h-[44px] shadow-[0_0_0_3px_rgba(13,139,255,0.12),0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <Plus className="size-24 shrink-0 text-brick-blue-500" strokeWidth={1.5} />
        <span className="flex-1 text-16 text-brick-blue-500">••••••••</span>
        <Info className="size-24 shrink-0 text-brick-blue-500" strokeWidth={1.5} />
      </div>
      <span className="text-12 text-brick-grey-black">This is a hint text to help user</span>
    </div>
  </div>
);

// ─── Radio ────────────────────────────────────────────────────────────────────
const TRadio = () => (
  <div className="flex flex-col gap-8 w-[200px]">
    {[
      { selected: true,  label: 'Yearly',   caption: '$99 / year — save 30%' },
      { selected: false, label: 'Monthly',  caption: '$12 / month'           },
      { selected: false, label: 'One-time', caption: '$199 total'            },
    ].map(({ selected, label, caption }, i) => (
      <div key={i} className={`flex items-center gap-8 p-8 rounded-8 border bg-white shadow-md
        ${selected ? 'border-brick-blue-400' : 'border-brick-grey-300'}`}>
        <div className={`w-[16px] h-[16px] rounded-full border-[2px] flex items-center justify-center shrink-0
          ${selected ? 'border-brick-blue-500' : 'border-brick-grey-400'}`}>
          {selected && <div className="w-[7px] h-[7px] rounded-full bg-brick-blue-500" />}
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className={`text-[10px] font-semibold leading-none ${selected ? 'text-brick-blue-600' : 'text-brick-grey-800'}`}>{label}</span>
          <span className={`text-[9px] ${selected ? 'text-brick-blue-400' : 'text-brick-grey-500'}`}>{caption}</span>
        </div>
      </div>
    ))}
  </div>
);

// ─── Switch ───────────────────────────────────────────────────────────────────
const TSwitch = () => (
  <div className="flex flex-col gap-8 w-[200px]">
    {[
      { on: true,  label: 'Email notifications' },
      { on: true,  label: 'Dark mode'           },
      { on: false, label: 'Auto-update'         },
    ].map(({ on, label }, i) => (
      <div key={i} className="flex items-center justify-between px-12 py-8 rounded-8 border border-brick-grey-300 bg-white shadow-md">
        <span className={`text-[10px] font-medium ${on ? 'text-brick-grey-800' : 'text-brick-grey-500'}`}>{label}</span>
        <div className={`w-[34px] h-[20px] rounded-full flex items-center shrink-0 ${on ? 'bg-brick-blue-500' : 'bg-brick-grey-400'}`}
          style={{ padding: '2px' }}>
          <div className={`w-[16px] h-[16px] rounded-full bg-white shadow-sm transition-transform ${on ? 'translate-x-[14px]' : ''}`} />
        </div>
      </div>
    ))}
  </div>
);

// ─── Tooltip ──────────────────────────────────────────────────────────────────
const TTooltip = () => (
  <div className="scale-[0.78] origin-center flex flex-col gap-8 w-[300px]">
    <span className="text-16 font-normal text-brick-grey-black">Email address *</span>
    {/* Input row with tooltip anchored to the info icon */}
    <div className="relative flex items-center gap-8 px-12 py-8 rounded-12 border-[1.5px] border-brick-blue-200 bg-brick-grey-white min-h-[44px]">
      <Plus className="size-24 shrink-0 text-brick-blue-300" strokeWidth={1.5} />
      <span className="flex-1 text-16 text-brick-blue-300">you@example.com</span>
      {/* Info icon — hovered state */}
      <div className="relative flex items-center justify-center">
        <Info className="size-24 shrink-0 text-brick-blue-500" strokeWidth={1.5} />
        {/* Tooltip bubble above the icon */}
        <div className="absolute bottom-[calc(100%+10px)] right-0 z-10">
          <div className="relative px-12 py-8 rounded-8 shadow-lg whitespace-nowrap" style={{ backgroundColor: '#242424' }}>
            <p className="text-12 font-semibold text-brick-grey-white leading-none mb-[4px]">Why we need this</p>
            <p className="text-12 text-brick-grey-500 leading-none">Used to send account updates</p>
            {/* Arrow */}
            <div className="absolute -bottom-[6px] right-[8px]"
              style={{ width: 0, height: 0, borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid #242424' }} />
          </div>
        </div>
      </div>
    </div>
    <span className="text-12 text-brick-grey-black">This is a hint text to help user</span>
  </div>
);

// ─── Card data ─────────────────────────────────────────────────────────────────

const COMPONENTS = [
  { to: '/components/alert',       label: 'Alert',       description: 'Inline alert with 5 colour variants, optional supporting text, actions, and close icon.',           preview: <TAlert />      },
  { to: '/components/avatar',      label: 'Avatar',      description: 'Circular avatar in 3 modes — image, icon, or initials — in 4 sizes with optional status dot.',      preview: <TAvatar />     },
  { to: '/components/badge',       label: 'Badge',       description: '5 semantic colour variants with optional leading and trailing icons.',                               preview: <TBadge />      },
  { to: '/components/button',      label: 'Button',      description: '6 semantic variants · 3 sizes · 5 states · optional left/right icons.',                             preview: <TButton />     },
  { to: '/components/checkbox',    label: 'Checkbox',    description: 'Three-state checkbox — checked, indeterminate, unchecked — at two sizes with label and caption.',   preview: <TCheckbox />   },
  { to: '/components/empty-state', label: 'Empty State', description: 'Empty-state card with illustration, heading, description, and primary/secondary actions.',          preview: <TEmptyState /> },
  { to: '/components/input',       label: 'Input',       description: 'Text input with default, focused, error, and disabled states plus optional label and helper text.', preview: <TInput />      },
  { to: '/components/radio',       label: 'Radio',       description: 'Radio button group with selected, default, and disabled states, label and caption support.',        preview: <TRadio />      },
  { to: '/components/switch',      label: 'Switch',      description: 'Toggle switch with on/off states and optional label. Supports disabled and hover variants.',        preview: <TSwitch />     },
  { to: '/components/tooltip',     label: 'Tooltip',     description: 'Lightweight tooltip in Brand and Black colours with 8 arrow positions.',                            preview: <TTooltip />    },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export function ComponentsIndexPage() {
  const navigate = useNavigate();

  return (
    <div className="p-48">
      <h1 className="text-40 font-bold text-brick-grey-950 mb-8">Components</h1>
      <p className="text-16 text-brick-grey-700 leading-24 mb-48 max-w-[560px]">
        Ten components, each with a live playground, usage notes, and a changelog. Built with CVA and Tailwind v4.
      </p>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-24">
        {COMPONENTS.map(({ to, label, description, preview }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="text-left bg-brick-grey-white rounded-12 border border-brick-grey-300 overflow-hidden hover:border-brick-blue-300 hover:shadow-lg transition-all cursor-pointer group flex flex-col"
          >
            <PreviewBox>{preview}</PreviewBox>
            <div className="px-20 py-16 border-t border-brick-grey-300 flex flex-col flex-1">
              <h3 className="text-16 font-bold text-brick-grey-950 mb-4 group-hover:text-brick-blue-500 transition-colors">
                {label}
              </h3>
              <p className="text-13 text-brick-grey-600 leading-20 line-clamp-2">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
