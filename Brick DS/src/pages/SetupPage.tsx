import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft, ChevronDown, ChevronRight, Pen,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Audience = 'developers' | 'designers';


// ─── Prose primitives ─────────────────────────────────────────────────────────

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="text-24 font-bold text-brick-grey-950 mt-32 mb-8 scroll-mt-24 first:mt-0">{children}</h2>;
}
function H3({ id, children }: { id: string; children: React.ReactNode }) {
  return <h3 id={id} className="text-16 font-semibold text-brick-grey-900 mt-18 mb-4 scroll-mt-24">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-16 text-brick-grey-800 leading-[1.65] mb-12">{children}</p>;
}
function A({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noreferrer" className="text-active-blue-600 underline underline-offset-2 hover:text-active-blue-700">{children}</a>;
}
function IC({ children }: { children: React.ReactNode }) {
  return <code className="bg-brick-grey-200 border border-brick-grey-400 text-brick-grey-900 text-[12px] font-mono px-[5px] py-[1px] rounded-4">{children}</code>;
}
function UL({ children }: { children: React.ReactNode }) {
  return <ul className="mb-10 flex flex-col gap-[5px]">{children}</ul>;
}
function OL({ children }: { children: React.ReactNode }) {
  return <ol className="mb-10 flex flex-col gap-[8px]">{children}</ol>;
}
function LI({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-[10px] text-16 text-brick-grey-800 leading-[1.65]">
      <span className="mt-[9px] w-[4px] h-[4px] rounded-full bg-brick-grey-500 shrink-0" />
      <span>{children}</span>
    </li>
  );
}
function NLI({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-[12px] text-16 text-brick-grey-800 leading-[1.65]">
      <span className="w-[20px] h-[20px] rounded-full bg-brick-grey-900 text-brick-grey-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-[2px]">{n}</span>
      <span>{children}</span>
    </li>
  );
}
function Strong({ children }: { children: React.ReactNode }) {
  return <strong className="font-semibold text-brick-grey-950">{children}</strong>;
}
function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 flex gap-[8px] bg-active-blue-50 border border-active-blue-200 rounded-6 px-12 py-8 text-16 text-active-blue-800 leading-[1.6]">
      <span className="font-semibold shrink-0 text-active-blue-700">Note —</span>
      <span>{children}</span>
    </div>
  );
}

function CodeBlock({ code }: { code: string }) {
  const lines = code.split('\n');
  return (
    <div className="mb-12 rounded-6 border border-brick-grey-400 overflow-hidden text-[12px] font-mono">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="select-none w-[36px] shrink-0 text-right pr-[12px] py-[4px] text-brick-grey-500 bg-brick-grey-200 border-r border-brick-grey-400 leading-[1.7]">
            {i + 1}
          </span>
          <span className="px-[14px] py-[4px] text-brick-grey-900 leading-[1.7] whitespace-pre bg-brick-grey-100">{line || ' '}</span>
        </div>
      ))}
    </div>
  );
}

function FileTree({ lines }: { lines: string[] }) {
  return (
    <div className="mb-12 rounded-6 border border-brick-grey-400 overflow-x-auto bg-brick-grey-200">
      {lines.map((line, i) => (
        <div key={i} className={`px-14 py-[2px] font-mono text-[12px] leading-[1.7] ${line.trimStart().startsWith('#') ? 'text-brick-grey-500' : 'text-brick-grey-800'}`}>
          {line || ' '}
        </div>
      ))}
    </div>
  );
}

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <div className="mb-12 rounded-6 border border-brick-grey-400 overflow-hidden">
      {rows.map(([cmd, desc], i) => (
        <div key={cmd} className={`flex ${i < rows.length - 1 ? 'border-b border-brick-grey-300' : ''}`}>
          <div className="w-[190px] shrink-0 bg-brick-grey-200 border-r border-brick-grey-400 px-12 py-8 font-mono text-[12px] text-brick-grey-900">{cmd}</div>
          <div className="px-12 py-8 text-16 text-brick-grey-700 leading-[1.5] flex items-center">{desc}</div>
        </div>
      ))}
    </div>
  );
}

// ─── Left sidebar ─────────────────────────────────────────────────────────────

interface NavSection { title: string; items: { id: string; label: string }[] }

function LeftNav({
  sections, activeId, onNav,
}: {
  sections: NavSection[];
  activeId: string;
  onNav: (id: string) => void;
}) {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map(s => [s.title, true]))
  );

  // Re-open all groups when sections change (audience switch)
  useEffect(() => {
    setOpenGroups(Object.fromEntries(sections.map(s => [s.title, true])));
  }, [sections]);

  return (
    <aside className="hidden md:flex w-[280px] lg:w-[360px] shrink-0 h-full overflow-y-auto border-r border-brick-grey-300 bg-brick-grey-white pt-12 pb-24 flex-col">
      <Link
        to="/"
        className="flex items-center gap-8 px-16 py-8 mb-4 text-13 text-brick-grey-600 hover:text-brick-grey-950 transition-colors group"
      >
        <ArrowLeft className="size-[14px] transition-transform group-hover:-translate-x-1" />
        Back
      </Link>

      {sections.map(section => {
        const isOpen = openGroups[section.title] ?? true;
        return (
          <div key={section.title} className="mb-4">
            <button
              onClick={() => setOpenGroups(p => ({ ...p, [section.title]: !isOpen }))}
              className="w-full flex items-center gap-6 px-16 py-[5px] text-[10px] font-semibold text-brick-grey-500 uppercase tracking-[0.06em] hover:text-brick-grey-700 transition-colors"
            >
              {isOpen
                ? <ChevronDown className="size-[11px] shrink-0" />
                : <ChevronRight className="size-[11px] shrink-0" />}
              {section.title}
            </button>
            {isOpen && (
              <div className="flex flex-col mt-1">
                {section.items.map(item => (
                  <button key={item.id} onClick={() => onNav(item.id)}
                    className={`w-full text-left py-[5px] px-16 text-[13px] leading-[1.4] transition-colors border-l-2 ${
                      activeId === item.id
                        ? 'border-active-blue-500 bg-active-blue-50 text-active-blue-700 font-semibold'
                        : 'border-transparent text-brick-grey-700 hover:bg-brick-grey-200 hover:text-brick-grey-950 font-normal'
                    }`}>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

// ─── Developer content ────────────────────────────────────────────────────────

const DEV_NAV: NavSection[] = [
  {
    title: 'Get started',
    items: [
      { id: 'dev-prerequisites', label: 'Prerequisites' },
      { id: 'dev-clone',         label: 'Clone & install' },
      { id: 'dev-structure',     label: 'Project structure' },
      { id: 'dev-server',        label: 'Dev server' },
    ],
  },
  {
    title: 'Using the system',
    items: [
      { id: 'dev-components', label: 'Using components' },
      { id: 'dev-tokens',     label: 'Design tokens' },
      { id: 'dev-extend',     label: 'Extending components' },
      { id: 'dev-darkmode',   label: 'Dark mode' },
    ],
  },
];

function DeveloperContent() {
  return (
    <article className="min-w-0">

      <H2 id="dev-prerequisites">Prerequisites</H2>
      <P>Before you start, make sure your machine has the following installed. Brick Design System works out of the box once these are in place — no extra configuration required.</P>

      <H3 id="dev-node">Node.js</H3>
      <P>Brick Design System requires <Strong>Node.js 18 or later</Strong>. We recommend the latest LTS release. Check your version:</P>
      <CodeBlock code={`node --version\n# should print v18.0.0 or higher`} />
      <P>If you don't have Node installed, download it from <A href="https://nodejs.org">nodejs.org</A> or use a version manager like <IC>nvm</IC> or <IC>fnm</IC>.</P>

      <H3 id="dev-git">Git</H3>
      <P>Git is required to clone the repository. Most machines ship with it pre-installed. Verify with:</P>
      <CodeBlock code={`git --version`} />

      <H3 id="dev-editor">Code editor</H3>
      <P>We recommend <Strong>VS Code</Strong> with these extensions for the best experience:</P>
      <UL>
        <LI><Strong>Tailwind CSS IntelliSense</Strong> — autocompletes Tailwind utility classes and previews token values on hover.</LI>
        <LI><Strong>ESLint</Strong> — surfaces linting errors inline as you type.</LI>
        <LI><Strong>Prettier</Strong> — auto-formats files on save. The project includes a Prettier config.</LI>
        <LI><Strong>TypeScript (built-in)</Strong> — full type-checking and autocompletion for all component props.</LI>
      </UL>

      <H2 id="dev-clone">Clone & install</H2>
      <P>Clone the repository to your local machine, then install all dependencies with npm. The install step takes about 30 seconds.</P>
      <CodeBlock code={`git clone https://github.com/your-org/brick-ds.git\ncd brick-ds\nnpm install`} />
      <Note>If your team uses pnpm or yarn, both work fine — replace <IC>npm install</IC> with <IC>pnpm install</IC> or <IC>yarn</IC>.</Note>

      <H2 id="dev-structure">Project structure</H2>
      <P>Here's a map of the most important folders and files. You'll spend most of your time in <IC>src/components</IC> and <IC>src/pages</IC>.</P>
      <FileTree lines={[
        'brick-ds/',
        '├── src/',
        '│   ├── components/          # All UI components',
        '│   │   ├── Button/          # Each component in its own folder',
        '│   │   │   └── Button.tsx',
        '│   │   ├── layout/          # App chrome (TopNav, SideNav, Footer…)',
        '│   │   └── …',
        '│   ├── pages/               # Route-level pages',
        '│   │   ├── Landing.tsx',
        '│   │   ├── components/      # Component playground pages',
        '│   │   └── foundations/     # Token documentation pages',
        '│   ├── lib/',
        '│   │   ├── utils.ts         # cn() helper (clsx + tailwind-merge)',
        '│   │   └── theme.tsx        # ThemeProvider + useTheme hook',
        '│   ├── tokens.css           # All design tokens (@theme {})',
        '│   ├── index.css            # Global styles + Tailwind imports',
        '│   └── main.tsx             # App entry point',
        '├── public/',
        '├── vite.config.ts',
        '└── package.json',
      ]} />
      <P>Key conventions to be aware of:</P>
      <UL>
        <LI><Strong>Component folders</Strong> — each component lives in its own folder so related files stay grouped.</LI>
        <LI><Strong>Path aliases</Strong> — use <IC>@/components</IC>, <IC>@/lib</IC>, <IC>@/pages</IC>. Configured in <IC>vite.config.ts</IC> and <IC>tsconfig.json</IC>. Avoid relative imports that cross directory boundaries.</LI>
        <LI><Strong>CVA for variants</Strong> — all component variants are defined with <IC>class-variance-authority</IC>. This keeps conditional class logic co-located and type-safe.</LI>
        <LI><Strong>No barrel re-exports</Strong> — import directly from <IC>@/components/Button</IC>, not from <IC>@/components</IC>.</LI>
      </UL>

      <H2 id="dev-server">Dev server</H2>
      <P>Start the Vite development server. It opens at <IC>http://localhost:5173</IC> and supports hot module replacement — changes to components and tokens update in the browser instantly.</P>
      <CodeBlock code={`npm run dev`} />
      <P>Other available scripts:</P>
      <Table rows={[
        ['npm run build',   'Compiles and bundles the app for production into dist/.'],
        ['npm run preview', 'Serves the production build locally — useful for a final check before deploying.'],
        ['npm run lint',    'Runs ESLint across the entire src/ directory.'],
      ]} />

      <H2 id="dev-components">Using components</H2>
      <P>Every component is a named export from its own file. Import what you need, pass props, and you're done. The fastest way to get the exact props for a given variant is to open the component's playground page on this site, configure it, then copy the generated snippet from the <Strong>Code</Strong> tab.</P>
      <CodeBlock code={`import { Button } from '@/components/Button';\n\nexport default function SavePage() {\n  return (\n    <Button\n      variant="Primary"\n      size="Medium"\n      label="Save changes"\n      showLeftIcon={false}\n      showRightIcon={false}\n    />\n  );\n}`} />
      <P>Each component also exports its prop type so you can type wrapper components without losing type safety:</P>
      <CodeBlock code={`import { Button, type ButtonProps } from '@/components/Button';\n\ninterface ConfirmButtonProps extends ButtonProps {\n  onConfirm: () => void;\n}\n\nexport function ConfirmButton({ onConfirm, ...rest }: ConfirmButtonProps) {\n  return <Button {...rest} onClick={onConfirm} variant="Success" />;\n}`} />
      <P>Every component page on this site includes:</P>
      <UL>
        <LI>An interactive <Strong>Playground</Strong> where you can toggle every prop live.</LI>
        <LI>A <Strong>Code</Strong> tab that generates a ready-to-paste import snippet matching your current playground state.</LI>
        <LI>A <Strong>Usage</Strong> tab with guidance on when and how to use each variant.</LI>
        <LI>A <Strong>Changelog</Strong> tab tracking what changed between versions.</LI>
      </UL>

      <H2 id="dev-tokens">Design tokens</H2>
      <P>All visual constants — colours, spacing, typography, radii — are defined as CSS custom properties inside <IC>src/tokens.css</IC> using Tailwind v4's <IC>@theme {'{}'}</IC> block. They're automatically available as Tailwind utility classes everywhere in the project.</P>
      <CodeBlock code={`/* tokens.css */\n@theme {\n  --color-brick-blue-500:     #0d8bff;\n  --color-brick-grey-950:     #0f1117;\n  --color-brick-grey-white:   #ffffff;\n  --color-success-green-500:  #1a7f37;\n  --color-error-red-500:      #cf222e;\n  --color-warning-yellow-700: #9a6700;\n}`} />
      <P>Use them in JSX just like any Tailwind colour:</P>
      <CodeBlock code={`<div className="bg-brick-grey-100 text-brick-grey-950 border border-brick-blue-500" />`} />
      <P>Font sizes follow a numeric pixel scale: <IC>text-12</IC> = 12px, <IC>text-14</IC> = 14px, up to <IC>text-76</IC>. Spacing is the same — <IC>p-8</IC> = 8px, <IC>gap-24</IC> = 24px.</P>
      <P>To change a token globally, update the value in <IC>tokens.css</IC> — every component using that token updates automatically:</P>
      <CodeBlock code={`@theme {\n  /* Override the primary brand blue globally */\n  --color-brick-blue-500: #7c3aed;\n}`} />
      <Note>Never hardcode raw hex values in component files. Always use a token. This is what makes the system themeable end-to-end.</Note>

      <H2 id="dev-extend">Extending components</H2>
      <P>Components are built with CVA (<IC>class-variance-authority</IC>), which makes adding variants straightforward. Add a key to the <IC>variants</IC> object in the <IC>cva()</IC> call and update the prop type.</P>
      <P>For example, adding a <IC>Ghost</IC> variant to Button:</P>
      <CodeBlock code={`const buttonVariants = cva(\n  'inline-flex items-center gap-8 rounded-8 font-medium transition-colors',\n  {\n    variants: {\n      variant: {\n        Primary:   'bg-brick-blue-500 text-white hover:bg-brick-blue-600',\n        Secondary: 'bg-transparent border border-brick-grey-400 text-brick-grey-800',\n        Ghost:     'bg-transparent text-brick-grey-700 hover:bg-brick-grey-100', // new\n      },\n    },\n  }\n);\n\ntype Variant = 'Primary' | 'Secondary' | 'Ghost'; // add Ghost to the union`} />
      <P>To create a brand-new component, add a folder under <IC>src/components/</IC> and follow the same pattern:</P>
      <CodeBlock code={`// src/components/Chip/Chip.tsx\nimport { cva, type VariantProps } from 'class-variance-authority';\nimport { cn } from '@/lib/utils';\n\nconst chipVariants = cva(\n  'inline-flex items-center px-10 py-4 rounded-full text-13 font-medium',\n  {\n    variants: {\n      variant: {\n        default:  'bg-brick-grey-100 text-brick-grey-700',\n        selected: 'bg-brick-blue-500 text-white',\n      },\n    },\n    defaultVariants: { variant: 'default' },\n  }\n);\n\nexport interface ChipProps\n  extends React.ComponentPropsWithoutRef<'span'>,\n    VariantProps<typeof chipVariants> {\n  label: string;\n}\n\nexport function Chip({ variant, label, className, ...props }: ChipProps) {\n  return (\n    <span className={cn(chipVariants({ variant }), className)} {...props}>\n      {label}\n    </span>\n  );\n}`} />

      <H2 id="dev-darkmode">Dark mode</H2>
      <P>Brick Design System ships with a full dark mode implementation. The <IC>ThemeProvider</IC> in <IC>src/lib/theme.tsx</IC> manages the current theme via localStorage and respects the OS-level preference on first load.</P>
      <CodeBlock code={`import { useTheme } from '@/lib/theme';\n\nexport function ThemeToggle() {\n  const { theme, setTheme } = useTheme();\n  return (\n    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>\n      Switch to {theme === 'dark' ? 'light' : 'dark'} mode\n    </button>\n  );\n}`} />
      <P>Dark mode works by overriding token values inside a <IC>.dark {'{}'}</IC> selector in <IC>tokens.css</IC>. You don't need <IC>dark:</IC> prefixes in components — token values swap automatically:</P>
      <CodeBlock code={`/* tokens.css */\n@theme {\n  --color-brick-grey-white: #ffffff;\n  --color-brick-grey-950:   #0f1117;\n}\n\n.dark {\n  --color-brick-grey-white: #0f1117;  /* flips in dark mode */\n  --color-brick-grey-950:   #f5f6f7;\n}`} />
      <Note>Always use semantic token names like <IC>bg-brick-grey-white</IC> rather than <IC>bg-white</IC>. Only token-based classes adapt automatically in dark mode.</Note>

    </article>
  );
}

// ─── Designer content ─────────────────────────────────────────────────────────

const DESIGN_NAV: NavSection[] = [
  {
    title: 'Get started',
    items: [
      { id: 'ds-overview',  label: 'Overview' },
      { id: 'ds-access',    label: 'Accessing the file' },
      { id: 'ds-structure', label: 'Library structure' },
      { id: 'ds-publish',   label: 'Publishing the library' },
    ],
  },
  {
    title: 'Day-to-day use',
    items: [
      { id: 'ds-use',        label: 'Using in a new file' },
      { id: 'ds-tokens',     label: 'Working with tokens' },
      { id: 'ds-components', label: 'Working with components' },
      { id: 'ds-handoff',    label: 'Designer–dev handoff' },
    ],
  },
];

function DesignerContent() {
  return (
    <article className="min-w-0">

      <H2 id="ds-overview">Overview</H2>
      <P>Brick Design System has a Figma library that mirrors this site's component set exactly. Every component, token, and variant in the code has a corresponding element in Figma — so what you design is what gets built, without gaps in translation.</P>
      <P>The library is designed to work for everyone — from a junior designer exploring variants for the first time, to a design lead maintaining consistency across a large product. You don't need to understand Figma variables to start using components, but learning them will make you significantly faster.</P>

      <H2 id="ds-access">Accessing the Figma file</H2>
      <P>The Brick Design System Figma library is available at the link below. You'll need a Figma account to access it — a free account is enough to view and duplicate. An Editor seat is required to publish it to a team.</P>
      <div className="mb-16 flex items-center gap-10 bg-brick-grey-100 border border-brick-grey-300 rounded-6 px-14 py-10">
        <Pen className="size-[14px] text-brick-grey-500 shrink-0" />
        <a href="https://www.figma.com/design/VBYwAGNFNHpEFc8a8RivIY/Assignment-6--10-components?node-id=5-3104" target="_blank" rel="noreferrer"
          className="text-16 text-active-blue-600 underline underline-offset-2 hover:text-active-blue-700 break-all">
          Brick Design System — Main Library (Figma)
        </a>
      </div>
      <P>If you see a "Request access" prompt, click it and the file owner will be notified. Alternatively, ask your team lead to add you to the project directly.</P>
      <P>To get your own editable copy, click the file title in Figma and choose <Strong>Duplicate to your drafts</Strong>. This creates an independent copy you can modify freely without affecting the shared library.</P>
      <Note>Don't edit the shared library file directly unless you are the designated library maintainer. Accidental changes can break linked components across your entire team.</Note>

      <H2 id="ds-structure">Library structure</H2>
      <P>The file is organised into pages. Each page covers a specific layer of the system:</P>
      <Table rows={[
        ['🎨  Tokens',      'All colour, typography, spacing, and radius variables. The source of truth — token changes here flow to code.'],
        ['🧱  Foundations', 'Visual documentation of token scales — colour palettes, type ramp, spacing grid, radius examples.'],
        ['⚙️  Components',  'The main component library. Every component has properties matching the code (variant, size, state, etc.).'],
        ['📐  Templates',   'Page-level layouts showing how components compose into common UI patterns.'],
        ['🔍  Playground',  'A scratch space for exploration. Nothing here affects team-shared instances.'],
      ]} />

      <H2 id="ds-publish">Publishing the library to your team</H2>
      <P>Publishing makes Brick Design System available to everyone in your Figma team — they can use components and tokens without needing access to the library file itself. You only need to do this once, and again whenever the library is updated.</P>
      <P>You need an <Strong>Editor seat</Strong> and access to a Figma team to publish.</P>
      <OL>
        <NLI n={1}><Strong>Open the library file.</Strong> Make sure you have edit access — if you can only view, you won't see the publish option.</NLI>
        <NLI n={2}><Strong>Open the Assets panel.</Strong> Press <IC>Option + 2</IC> (Mac) or <IC>Alt + 2</IC> (Windows), or click the grid icon in the left sidebar.</NLI>
        <NLI n={3}><Strong>Click the library (book) icon</Strong> at the top of the Assets panel to open Library settings.</NLI>
        <NLI n={4}><Strong>Click "Publish".</Strong> You'll see a summary of components and variables ready to publish. Add a description of what changed (optional), then confirm.</NLI>
        <NLI n={5}><Strong>Notify teammates.</Strong> Team members will see an update prompt the next time they open a file using the library. They can accept to get the latest components.</NLI>
      </OL>

      <H2 id="ds-use">Using Brick Design System in a new file</H2>
      <P>Once the library is published, enabling it in any Figma file takes seconds:</P>
      <OL>
        <NLI n={1}>Create a new Figma file or open an existing project file.</NLI>
        <NLI n={2}>Open the Assets panel (<IC>Option + 2</IC> / <IC>Alt + 2</IC>).</NLI>
        <NLI n={3}>Click the library icon at the top of the panel.</NLI>
        <NLI n={4}>Find <Strong>Brick Design System — Main Library</Strong> and toggle it on.</NLI>
        <NLI n={5}>Components and variables from Brick Design System are now available in this file.</NLI>
      </OL>
      <P>In the Assets panel, search by component name (e.g. "Button", "Badge"). Drag a component into your frame, then use the right sidebar to change its properties — variant, size, state, and content are all exposed as Figma properties.</P>
      <Note>Never detach a component unless you have a very specific reason to. Detaching breaks the link to the library and means you'll miss future updates. Use component properties and layer overrides within the linked instance instead.</Note>

      <H2 id="ds-tokens">Working with tokens</H2>
      <H3 id="ds-token-why">Why tokens matter</H3>
      <P>Using a raw colour like <IC>#0d8bff</IC> in your design means that if the brand colour ever changes, every frame using that value needs to be updated manually. Using the <IC>brick/blue/500</IC> variable means updating the token once updates everything — in Figma and in the codebase — automatically.</P>
      <P>To apply a colour token, select a layer, open Fill in the right sidebar, click the colour chip, then switch to <Strong>Libraries</Strong> in the colour picker. Browse to the Brick Design System collection and choose a token. The fill is now linked.</P>

      <H3 id="ds-token-names">Token naming reference</H3>
      <Table rows={[
        ['brick/grey/950',       'Nearest to black — primary text, headings.'],
        ['brick/grey/white',     'Background surfaces, card fills.'],
        ['brick/grey/100',       'Subtle backgrounds, hover states, sidebars.'],
        ['brick/blue/500',       'Primary brand blue — links, active states.'],
        ['success/green/500',    'Positive outcomes, success states.'],
        ['error/red/500',        'Errors, destructive actions.'],
        ['warning/yellow/700',   'Caution states, warnings.'],
        ['active/blue/500',      'Interactive focus, info states.'],
      ]} />

      <H2 id="ds-components">Working with components</H2>
      <P>All Brick Design System components in Figma are built with Auto Layout and exposed properties, so resizing, swapping content, and toggling states work without detaching anything.</P>
      <UL>
        <LI><Strong>Changing a variant</Strong> — select a component instance. In the right sidebar under the component name you'll see properties (Variant, Size, State, toggle switches). Click a dropdown to change the variant.</LI>
        <LI><Strong>Overriding text</Strong> — double-click any text layer inside an instance to edit it. The override is preserved when the library updates.</LI>
        <LI><Strong>Swapping icons</Strong> — select an icon layer inside the instance, then use the component swap panel in the right sidebar to search and select a replacement.</LI>
        <LI><Strong>Using states</Strong> — interactive components have a State property (Default, Hover, Focused, Disabled, Loading). Always use the correct state rather than manually adjusting fills and borders.</LI>
      </UL>
      <Note>When designing error or disabled states, always use the component's State property. States are defined to match coded behaviour exactly — manually recreating them drifts from the implementation.</Note>

      <H2 id="ds-handoff">Designer–developer handoff</H2>
      <P>A design built with Brick Design System components and tokens is already most of the way to a clean handoff — developers can look up any component on this site for the exact props, code snippet, and usage guidance. These practices make the process even smoother:</P>
      <UL>
        <LI><Strong>Name your frames clearly.</Strong> Use descriptive names like <em>Account Settings / Mobile / Error state</em> rather than <em>Frame 24</em>. Developers navigate the file by frame name.</LI>
        <LI><Strong>Design all states explicitly.</Strong> Don't leave error, disabled, or loading states implied. The component's State property makes showing them take seconds.</LI>
        <LI><Strong>Annotate non-obvious decisions.</Strong> If a spacing or visibility rule isn't obvious from inspection — for example, padding that adapts on scroll — add a Figma annotation explaining it.</LI>
        <LI><Strong>Don't detach components.</Strong> Developers use the component name in inspect mode to match it to the coded implementation. A detached component loses that signal.</LI>
        <LI><Strong>Link to this site.</Strong> When writing a spec or leaving a comment, link to the relevant component page here. The Usage and Changelog tabs provide context that would otherwise have to be written out manually.</LI>
      </UL>

    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const TABS: { id: Audience; label: string }[] = [
  { id: 'developers', label: 'Developers' },
  { id: 'designers',  label: 'Designers'  },
];

export function SetupPage() {
  const [audience, setAudience] = useState<Audience>('developers');
  const navSections = audience === 'developers' ? DEV_NAV : DESIGN_NAV;

  const allItems = navSections.flatMap(s => s.items);
  const [activeId, setActiveId] = useState(allItems[0].id);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    const container = contentRef.current;
    if (!target || !container) return;
    const offset = target.getBoundingClientRect().top
      - container.getBoundingClientRect().top
      + container.scrollTop
      - 24;
    container.scrollTo({ top: offset, behavior: 'smooth' });
    setActiveId(id);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = () => {
      const ids = allItems.map(s => s.id);
      for (const id of [...ids].reverse()) {
        const t = document.getElementById(id);
        if (t && t.getBoundingClientRect().top <= 80) {
          setActiveId(id);
          return;
        }
      }
      setActiveId(ids[0]);
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, [allItems]);

  // Reset on audience change
  useEffect(() => {
    const firstId = navSections[0].items[0].id;
    setActiveId(firstId);
    contentRef.current?.scrollTo({ top: 0 });
  }, [audience]);

  return (
    <div className="flex h-[calc(100vh-56px)]">

      {/* ── Left nav ── */}
      <LeftNav
        sections={navSections}
        activeId={activeId}
        onNav={scrollTo}
      />

      {/* ── Right column ── */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header + tab bar — sticky, never scrolls away */}
        <div className="shrink-0 bg-brick-grey-white border-b border-brick-grey-300 px-16 pt-24 sm:px-32 sm:pt-32 md:px-48 md:pt-40 pb-0">
          <p className="text-12 font-semibold text-brick-grey-500 uppercase tracking-[0.08em] mb-8">
            Setup guide
          </p>
          <h1 className="text-32 font-bold text-brick-grey-950 mb-4">How to use Brick Design System</h1>
          <p className="text-16 text-brick-grey-600 leading-24 mb-24 max-w-[560px]">
            Everything you need to start using the design system — whether you're writing code or designing in Figma.
          </p>

          {/* Tab bar — identical style to ComponentTabs */}
          <div className="flex items-end gap-0">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setAudience(t.id)}
                className={`relative py-12 mr-24 text-14 font-medium transition-colors focus:outline-none ${
                  audience === t.id
                    ? 'text-brick-blue-500'
                    : 'text-brick-grey-600 hover:text-brick-grey-950'
                }`}
              >
                {t.label}
                {audience === t.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brick-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto">
          <div className="max-w-[680px] px-16 py-24 sm:px-32 sm:py-32 md:px-48 md:py-40">
            {audience === 'developers' ? <DeveloperContent /> : <DesignerContent />}
          </div>
        </div>

      </div>
    </div>
  );
}
