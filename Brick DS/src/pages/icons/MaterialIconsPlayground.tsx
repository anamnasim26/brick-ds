import { useState, useEffect, useRef, useCallback } from 'react';
import { ExternalLink, Grid2x2, Palette, Sliders, Code, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/Button/Button';


// ── Shared doc components ────────────────────────────────────────────────────

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-24 font-bold text-brick-grey-950 mt-32 mb-8 first:mt-0">{children}</h2>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-16 text-brick-grey-800 leading-[1.65] mb-12">{children}</p>;
}
function IC({ children }: { children: React.ReactNode }) {
  return <code className="bg-brick-grey-200 border border-brick-grey-400 text-brick-grey-900 text-[12px] font-mono px-[5px] py-[1px] rounded-4">{children}</code>;
}
function UL({ items }: { items: string[] }) {
  return (
    <ul className="mb-10 flex flex-col gap-[5px]">
      {items.map((item, i) => (
        <li key={i} className="flex gap-[10px] text-16 text-brick-grey-800 leading-[1.65]">
          <span className="mt-[9px] w-[4px] h-[4px] rounded-full bg-brick-grey-500 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
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

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-16 p-20 rounded-6 border border-brick-grey-400 bg-brick-grey-white">
      <div className="size-[36px] rounded-6 bg-brick-blue-50 flex items-center justify-center text-brick-blue-500 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-14 font-semibold text-brick-grey-950 mb-2">{title}</p>
        <p className="text-14 text-brick-grey-600 leading-[1.5]">{description}</p>
      </div>
    </div>
  );
}

// ── Left nav (mirrors SetupPage) ─────────────────────────────────────────────

type NavItem    = { id: string; label: string };
type NavSection = { title: string; items: NavItem[] };

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { id: 'why-material',   label: 'Why Material Symbols' },
      { id: 'installation',   label: 'Installation' },
      { id: 'usage',          label: 'Usage' },
    ],
  },
  {
    title: 'Guidelines',
    items: [
      { id: 'accessibility',  label: 'Accessibility' },
      { id: 'best-practices', label: 'Best practices' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { id: 'resources',      label: 'Resources' },
    ],
  },
];

function LeftNav({ activeId, onNav }: { activeId: string; onNav: (id: string) => void }) {
  return (
    <aside className="hidden md:flex w-[260px] lg:w-[280px] shrink-0 h-full overflow-y-auto border-r border-brick-grey-300 bg-brick-grey-white pt-4 pb-24 flex-col">
      <Link
        to="/"
        className="flex items-center gap-4 px-16 h-[40px] text-12 text-brick-grey-500 hover:text-brick-grey-800 transition-colors group"
      >
        <ArrowLeft className="size-[12px] transition-transform group-hover:-translate-x-1" />
        Back
      </Link>
      <div className="border-b border-brick-grey-300 mb-4" />

      <div className="flex flex-col">
        {NAV_SECTIONS.flatMap(s => s.items).map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            className={`w-full text-left py-[6px] px-16 text-13 leading-[1.4] transition-colors border-l-2 ${
              activeId === item.id
                ? 'border-brick-blue-500 bg-brick-blue-50 text-brick-blue-600 font-semibold'
                : 'border-transparent text-brick-grey-700 hover:bg-brick-grey-100 hover:text-brick-grey-950 font-normal'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

// ── Page content ─────────────────────────────────────────────────────────────

export function MaterialIconsPlayground() {
  const allItems = NAV_SECTIONS.flatMap(s => s.items);
  const [activeId, setActiveId] = useState(allItems[0].id);
  const contentRef = useRef<HTMLDivElement>(null);

  const isProgrammaticScroll = useRef(false);

  const scrollTo = useCallback((id: string) => {
    const target    = document.getElementById(id);
    const container = contentRef.current;
    if (!target || !container) return;
    setActiveId(id);
    isProgrammaticScroll.current = true;
    const offset =
      target.getBoundingClientRect().top -
      container.getBoundingClientRect().top +
      container.scrollTop -
      24;
    container.scrollTo({ top: offset, behavior: 'smooth' });
    setTimeout(() => { isProgrammaticScroll.current = false; }, 700);
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handler = () => {
      if (isProgrammaticScroll.current) return;
      const ids = allItems.map(s => s.id);
      for (const id of [...ids].reverse()) {
        const t = document.getElementById(id);
        if (t && t.getBoundingClientRect().top <= 80) { setActiveId(id); return; }
      }
      setActiveId(ids[0]);
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, [allItems]);

  return (
    <div className="flex h-[calc(100vh-56px)]">

      <LeftNav activeId={activeId} onNav={scrollTo} />

      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Sticky header */}
        <div className="shrink-0 bg-brick-grey-white border-b border-brick-grey-300 px-16 pt-24 pb-24 sm:px-32 md:px-48 md:pt-40 md:pb-32">
          <p className="text-12 font-semibold text-brick-grey-500 uppercase tracking-[0.08em] mb-8">Icons</p>
          <h1 className="text-32 font-bold text-brick-grey-950 mb-4">Material Symbols</h1>
          <p className="text-16 text-brick-grey-600 leading-24 mb-24 max-w-[560px]">
            Brick DS uses Google's Material Symbols — a variable font with 2,900+ icons and full CSS customisation via a single file request.
          </p>
          <a
            href="https://fonts.google.com/icons"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: 'Primary', size: 'Small' })}
          >
            Browse all icons
            <ExternalLink className="size-[20px] shrink-0" />
          </a>
        </div>

        {/* Scrollable content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto bg-brick-grey-100">
        <div className="px-16 py-24 sm:px-32 sm:py-32 md:px-48 md:py-40">


          {/* Why Material Symbols */}
          <section id="why-material" className="mb-48">
            <H2>Why Material Symbols</H2>
            <P>
              Material Symbols is the evolution of the original Material Icons. Unlike a traditional icon set shipped as individual SVGs, Material Symbols are delivered as a single variable font — the entire library is one HTTP request, and every visual property is controlled through CSS.
            </P>
            <div className="grid sm:grid-cols-2 gap-12 mt-16">
              <FeatureCard icon={<Grid2x2 className="size-[18px]" />} title="2,900+ icons" description="Covers navigation, actions, communication, content, media, and more — across five styles." />
              <FeatureCard icon={<Sliders className="size-[18px]" />} title="Variable font axes" description="Customise weight, fill, grade, and optical size entirely through CSS font-variation-settings." />
              <FeatureCard icon={<Palette className="size-[18px]" />} title="CSS colourable" description="Icons inherit the current text colour, so they respond to Tailwind colour utilities and dark mode." />
              <FeatureCard icon={<Code className="size-[18px]" />} title="Ligature-based" description="Render any icon by writing its name as plain text inside a span. No SVG imports, no build step." />
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="mb-48">
            <H2>Installation</H2>
            <P>Load the variable font from Google Fonts by adding this link to your <IC>&lt;head&gt;</IC>:</P>
            <CodeBlock code={`<link\n  rel="stylesheet"\n  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"\n/>`} />
            <P>Then add the base CSS class:</P>
            <CodeBlock code={`.material-symbols-outlined {\n  font-family: 'Material Symbols Outlined';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-feature-settings: 'liga';\n  -webkit-font-smoothing: antialiased;\n}`} />
          </section>

          {/* Usage */}
          <section id="usage" className="mb-48">
            <H2>Usage</H2>
            <P>Render an icon by placing its name (in snake_case) as text inside a <IC>&lt;span&gt;</IC>:</P>
            <CodeBlock code={`<span class="material-symbols-outlined">home</span>\n<span class="material-symbols-outlined">search</span>\n<span class="material-symbols-outlined">settings</span>`} />
            <P>Customise axes with <IC>font-variation-settings</IC>:</P>
            <CodeBlock code={`/* Filled, heavy weight */\n.icon-filled {\n  font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 48;\n}\n\n/* Light, outlined */\n.icon-light {\n  font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24;\n}`} />
            <P>In Tailwind, colour and size use standard utilities:</P>
            <CodeBlock code={`<span class="material-symbols-outlined text-24 text-brick-blue-500">favorite</span>\n<span class="material-symbols-outlined text-16 text-brick-grey-600">close</span>`} />
          </section>

          {/* Accessibility */}
          <section id="accessibility" className="mb-48">
            <H2>Accessibility</H2>
            <P>Icon fonts are invisible to screen readers by default. Always handle accessibility explicitly:</P>
            <UL items={[
              'Decorative icons (next to a visible label): add aria-hidden="true" so screen readers skip them.',
              'Standalone icons (no visible label): wrap in a button with an aria-label describing the action.',
              'Never rely on the icon name as the accessible label — "home" means nothing out of context.',
              'Ensure sufficient colour contrast between the icon and its background (minimum 3:1 for UI components).',
            ]} />
            <CodeBlock code={`<!-- Decorative -->\n<button>\n  <span class="material-symbols-outlined" aria-hidden="true">send</span>\n  Send message\n</button>\n\n<!-- Standalone -->\n<button aria-label="Send message">\n  <span class="material-symbols-outlined" aria-hidden="true">send</span>\n</button>`} />
          </section>

          {/* Best practices */}
          <section id="best-practices" className="mb-48">
            <H2>Best practices</H2>
            <UL items={[
              'Use the Outlined style as the default — it reads cleanly at all sizes on light and dark backgrounds.',
              'Switch to Filled (FILL: 1) to indicate a selected or active state, e.g. a filled bookmark when saved.',
              'Keep icon sizes consistent: 20px for dense UIs, 24px for standard controls, 40px+ for illustrations.',
              'Pair every icon with a visible text label wherever space allows. Icon-only controls should be reserved for well-established conventions (close, search, menu).',
              'Use Grade (GRAD) to fine-tune visual weight on dark backgrounds — a negative grade (−25) compensates for the halation effect.',
            ]} />
          </section>

          {/* Resources */}
          <section id="resources" className="mb-48">
            <H2>Resources</H2>
            <div className="flex flex-col gap-12">
              {[
                { label: 'Browse all 2,900+ icons', href: 'https://fonts.google.com/icons', desc: 'Search, preview, and copy code for any Material Symbol.' },
                { label: 'Material Symbols guide', href: 'https://developers.google.com/fonts/docs/material_symbols', desc: 'Full documentation on variable axes, styles, and ligature rendering.' },
                { label: 'GitHub — material-design-icons', href: 'https://github.com/google/material-design-icons', desc: 'Source repository with SVG assets and font files for self-hosting.' },
              ].map(({ label, href, desc }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between gap-16 p-16 rounded-6 border border-brick-grey-400 bg-brick-grey-white hover:border-brick-blue-300 hover:shadow-sm transition-all group"
                >
                  <div>
                    <p className="text-14 font-semibold text-brick-grey-950 group-hover:text-brick-blue-600 transition-colors mb-2">{label}</p>
                    <p className="text-14 text-brick-grey-600">{desc}</p>
                  </div>
                  <ExternalLink className="size-[14px] text-brick-grey-400 group-hover:text-brick-blue-500 shrink-0 mt-2 transition-colors" />
                </a>
              ))}
            </div>
          </section>

        </div>
        </div>
      </div>
    </div>
  );
}
