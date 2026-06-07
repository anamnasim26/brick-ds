import { useNavigate } from 'react-router-dom';

// ─── Text placeholder ──────────────────────────────────────────────────────────
// Replaces any text content with a grey rounded bar
function T({ w = 'w-full', h = 'h-[8px]', className = '' }: { w?: string; h?: string; className?: string }) {
  return <div className={`${w} ${h} rounded-full bg-brick-grey-300 shrink-0 ${className}`} />;
}

function PreviewBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center bg-brick-grey-100 rounded-t-12 h-[180px] overflow-hidden px-24 py-16">
      {children}
    </div>
  );
}

// ─── Alert ────────────────────────────────────────────────────────────────────
const TAlert = () => (
  <div className="w-full max-w-[280px] flex flex-col gap-8">
    {/* failure variant */}
    <div className="flex items-start gap-8 p-12 rounded-12 border border-error-red-500 bg-error-red-50">
      <div className="w-[20px] h-[20px] rounded-full bg-error-red-500 shrink-0" />
      <div className="flex flex-col gap-5 flex-1 pt-1">
        <T w="w-3/4" h="h-[8px]" className="bg-error-red-400 opacity-80" />
        <T w="w-full" h="h-[6px]" className="bg-error-red-400 opacity-40" />
        <T w="w-2/3" h="h-[6px]" className="bg-error-red-400 opacity-40" />
        <div className="flex gap-6 mt-4">
          <div className="h-[22px] w-[56px] rounded-8 bg-error-red-500 opacity-80" />
          <div className="h-[22px] w-[48px] rounded-8 border border-error-red-500 opacity-60" />
        </div>
      </div>
    </div>
    {/* success variant */}
    <div className="flex items-start gap-8 p-10 rounded-12 border border-success-green-500 bg-success-green-50">
      <div className="w-[16px] h-[16px] rounded-full bg-success-green-500 shrink-0 mt-[1px]" />
      <div className="flex flex-col gap-4 flex-1">
        <T w="w-2/3" h="h-[7px]" className="bg-success-green-600 opacity-70" />
        <T w="w-full" h="h-[6px]" className="bg-success-green-600 opacity-30" />
      </div>
    </div>
  </div>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────
const TAvatar = () => (
  <div className="flex items-end gap-12">
    {[
      { size: 56, bg: '#425563', dot: '#22c55e' },
      { size: 44, bg: '#e91e8c', dot: '#f59e0b' },
      { size: 36, bg: '#0d8bff', dot: '#ef4444' },
    ].map(({ size, bg, dot }, i) => (
      <div key={i} className="relative shrink-0 rounded-full border-2 border-brick-grey-white"
        style={{ width: size, height: size, backgroundColor: bg }}>
        {/* initials replaced by a lighter circle */}
        <div className="absolute inset-0 rounded-full flex items-center justify-center">
          <div className="rounded-full opacity-40 bg-white" style={{ width: size * 0.45, height: size * 0.45 }} />
        </div>
        <div className="absolute bottom-0 right-0 rounded-full border-2 border-white"
          style={{ width: size * 0.3, height: size * 0.3, backgroundColor: dot }} />
      </div>
    ))}
  </div>
);

// ─── Badge ────────────────────────────────────────────────────────────────────
const TBadge = () => (
  <div className="flex flex-wrap gap-8 justify-center">
    {[
      { bg: 'bg-brick-blue-50',     border: 'border-brick-blue-500',     bar: 'bg-brick-blue-400'      },
      { bg: 'bg-success-green-50',  border: 'border-success-green-500',  bar: 'bg-success-green-500'   },
      { bg: 'bg-error-red-50',      border: 'border-error-red-500',      bar: 'bg-error-red-400'       },
      { bg: 'bg-warning-yellow-50', border: 'border-warning-yellow-700', bar: 'bg-warning-yellow-600'  },
      { bg: 'bg-active-blue-50',    border: 'border-active-blue-700',    bar: 'bg-active-blue-700'     },
    ].map(({ bg, border, bar }, i) => (
      <div key={i} className={`inline-flex items-center gap-4 px-8 py-4 rounded-4 border ${bg} ${border}`}>
        <div className={`w-[6px] h-[6px] rounded-full shrink-0 ${bar}`} />
        <div className={`h-[6px] w-[36px] rounded-full ${bar} opacity-70`} />
      </div>
    ))}
  </div>
);

// ─── Button ───────────────────────────────────────────────────────────────────
const TButton = () => (
  <div className="flex flex-col gap-10 items-center">
    <div className="flex gap-10">
      <div className="h-[44px] px-20 rounded-12 bg-brick-blue-400 flex items-center justify-center">
        <T w="w-[60px]" h="h-[8px]" className="bg-white opacity-80" />
      </div>
      <div className="h-[44px] px-20 rounded-12 border-2 border-brick-blue-400 bg-brick-grey-white flex items-center justify-center">
        <T w="w-[60px]" h="h-[8px]" className="bg-brick-blue-400" />
      </div>
    </div>
    <div className="flex gap-10">
      <div className="h-[44px] px-20 rounded-12 bg-success-green-400 flex items-center justify-center">
        <T w="w-[52px]" h="h-[8px]" className="bg-white opacity-80" />
      </div>
      <div className="h-[44px] px-20 rounded-12 bg-error-red-500 flex items-center justify-center">
        <T w="w-[52px]" h="h-[8px]" className="bg-white opacity-80" />
      </div>
    </div>
  </div>
);

// ─── Checkbox ─────────────────────────────────────────────────────────────────
const TCheckbox = () => (
  <div className="flex flex-col gap-10">
    {[
      { state: 'checked',        boxClass: 'bg-brick-blue-500 border-brick-blue-500' },
      { state: 'indeterminate',  boxClass: 'bg-brick-blue-500 border-brick-blue-500' },
      { state: 'unchecked',      boxClass: 'bg-white border-brick-grey-400' },
    ].map(({ state, boxClass }, i) => (
      <div key={i} className="flex items-center gap-10">
        <div className={`w-[18px] h-[18px] rounded-4 border-2 flex items-center justify-center shrink-0 ${boxClass}`}>
          {state === 'checked' && (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
          {state === 'indeterminate' && <div className="w-[8px] h-[2px] bg-white rounded-full" />}
        </div>
        <T w="w-[110px]" h="h-[7px]" />
      </div>
    ))}
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const TEmptyState = () => (
  <div className="flex flex-col items-center gap-10 text-center w-full max-w-[220px] border border-brick-grey-300 rounded-12 bg-brick-grey-white p-16">
    <div className="w-[44px] h-[44px] rounded-12 bg-brick-blue-50 border border-brick-blue-100 flex items-center justify-center">
      {/* image placeholder */}
      <div className="w-[24px] h-[20px] rounded-4 bg-brick-blue-200" />
    </div>
    <div className="flex flex-col gap-5 items-center w-full">
      <T w="w-3/4" h="h-[8px]" className="bg-brick-grey-700" />
      <T w="w-full" h="h-[6px]" />
      <T w="w-4/5" h="h-[6px]" />
    </div>
    <div className="flex gap-6 mt-2">
      <div className="h-[30px] px-14 rounded-8 bg-brick-blue-400 flex items-center">
        <T w="w-[48px]" h="h-[7px]" className="bg-white opacity-80" />
      </div>
      <div className="h-[30px] px-14 rounded-8 border border-brick-grey-400 flex items-center">
        <T w="w-[40px]" h="h-[7px]" />
      </div>
    </div>
  </div>
);

// ─── Input ────────────────────────────────────────────────────────────────────
const TInput = () => (
  <div className="w-full max-w-[220px] flex flex-col gap-10">
    {/* Default */}
    <div className="flex flex-col gap-5">
      <T w="w-[44px]" h="h-[7px]" className="bg-brick-grey-600" />
      <div className="h-[40px] rounded-12 border-[1.5px] border-brick-blue-200 bg-white flex items-center px-12 gap-8">
        <T w="w-2/3" h="h-[7px]" className="bg-brick-grey-300" />
      </div>
    </div>
    {/* Focus */}
    <div className="flex flex-col gap-5">
      <T w="w-[32px]" h="h-[7px]" className="bg-brick-grey-600" />
      <div className="h-[40px] rounded-12 border-[1.5px] border-active-blue-500 bg-white flex items-center px-12 gap-8 ring-2 ring-active-blue-500 ring-opacity-20">
        <T w="w-1/2" h="h-[7px]" className="bg-brick-grey-400" />
        <div className="w-[1.5px] h-[14px] bg-active-blue-500 rounded-full shrink-0" />
      </div>
    </div>
    {/* Error */}
    <div className="flex flex-col gap-4">
      <div className="h-[40px] rounded-12 border-[1.5px] border-error-red-500 bg-white flex items-center px-12">
        <T w="w-3/4" h="h-[7px]" className="bg-brick-grey-300" />
      </div>
      <T w="w-[130px]" h="h-[6px]" className="bg-error-red-400 opacity-70" />
    </div>
  </div>
);

// ─── Radio ────────────────────────────────────────────────────────────────────
const TRadio = () => (
  <div className="flex flex-col gap-6 w-full max-w-[200px]">
    {[true, false, false].map((selected, i) => (
      <div key={i}
        className={`flex items-center gap-10 px-12 py-8 rounded-8 border ${selected ? 'border-brick-blue-500 bg-brick-blue-50' : 'border-brick-grey-300 bg-white'}`}>
        <div className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center shrink-0 ${selected ? 'border-brick-blue-500' : 'border-brick-grey-400'}`}>
          {selected && <div className="w-[7px] h-[7px] rounded-full bg-brick-blue-500" />}
        </div>
        <T w="w-full" h="h-[7px]" className={selected ? 'bg-brick-blue-400 opacity-60' : ''} />
      </div>
    ))}
  </div>
);

// ─── Switch ───────────────────────────────────────────────────────────────────
const TSwitch = () => (
  <div className="flex flex-col gap-10 w-full max-w-[200px]">
    {[true, true, false].map((on, i) => (
      <div key={i} className="flex items-center justify-between gap-12">
        <T w="w-[110px]" h="h-[7px]" className={on ? 'bg-brick-grey-700' : 'bg-brick-grey-300'} />
        <div className={`w-[40px] h-[22px] rounded-full flex items-center px-[3px] shrink-0 ${on ? 'bg-brick-blue-500' : 'bg-brick-grey-400'}`}>
          <div className={`w-[16px] h-[16px] rounded-full bg-white shadow transition-transform ${on ? 'translate-x-[18px]' : ''}`} />
        </div>
      </div>
    ))}
  </div>
);

// ─── Tooltip ──────────────────────────────────────────────────────────────────
const TTooltip = () => (
  <div className="flex flex-col items-center gap-10">
    {/* Tooltip bubble */}
    <div className="relative px-12 py-7 rounded-8 bg-brick-grey-900 shadow-lg">
      <T w="w-[100px]" h="h-[7px]" className="bg-white opacity-60" />
      <div className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-0 h-0"
        style={{ borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid var(--color-brick-grey-900)' }} />
    </div>
    {/* Trigger button */}
    <div className="h-[36px] px-16 rounded-8 border border-brick-grey-300 bg-white flex items-center">
      <T w="w-[60px]" h="h-[7px]" />
    </div>
  </div>
);

// ─── Card data ─────────────────────────────────────────────────────────────────

const COMPONENTS = [
  { to: '/components/alert',       label: 'Alert',       description: 'Inline alert with 4 colour variants, optional leading and trailing icons, and up to 2 action buttons.',        preview: <TAlert />      },
  { to: '/components/avatar',      label: 'Avatar',      description: 'Circular avatar in 3 modes — image, icon, or initials — in 4 sizes with optional status dot.',                 preview: <TAvatar />     },
  { to: '/components/badge',       label: 'Badge',       description: 'Pill-shaped badge with 5 tones and optional leading icon or number bubble.',                                    preview: <TBadge />      },
  { to: '/components/button',      label: 'Button',      description: '6 semantic variants · 3 sizes · 5 states · optional left/right icons.',                                         preview: <TButton />     },
  { to: '/components/checkbox',    label: 'Checkbox',    description: 'Three-state checkbox — selected, indeterminate, and unselected — at two sizes.',                               preview: <TCheckbox />   },
  { to: '/components/empty-state', label: 'Empty State', description: 'Empty-state card with illustration, heading, description, and primary/secondary actions.',                     preview: <TEmptyState /> },
  { to: '/components/input',       label: 'Input',       description: 'Input with 4 types — text, number, textbox, OTP. Focused, error, and disabled states.',                       preview: <TInput />      },
  { to: '/components/radio',       label: 'Radio',       description: 'Radio button at two sizes with selected, unselected, and disabled states.',                                     preview: <TRadio />      },
  { to: '/components/switch',      label: 'Switch',      description: 'Toggle switch with on/off states, hover, focus, and disabled variants.',                                       preview: <TSwitch />     },
  { to: '/components/tooltip',     label: 'Tooltip',     description: 'Lightweight tooltip with configurable placement and arrow.',                                                    preview: <TTooltip />    },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export function ComponentsIndexPage() {
  const navigate = useNavigate();

  return (
    <div className="p-48">
      <h1 className="text-40 font-bold text-brick-grey-950 leading-44 mb-8">Components</h1>
      <p className="text-16 text-brick-grey-600 leading-24 mb-48 max-w-[560px]">
        Production-ready React components built with CVA and Tailwind. Click any card to open its interactive playground.
      </p>

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-24">
        {COMPONENTS.map(({ to, label, description, preview }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className="text-left bg-brick-grey-white rounded-12 border border-brick-grey-300 overflow-hidden hover:border-brick-blue-300 hover:shadow-sm transition-all cursor-pointer group"
          >
            <PreviewBox>{preview}</PreviewBox>
            <div className="p-20 border-t border-brick-grey-300">
              <h3 className="text-16 font-bold text-brick-grey-950 mb-4 group-hover:text-brick-blue-500 transition-colors">
                {label}
              </h3>
              <p className="text-13 text-brick-grey-600 leading-20">{description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
