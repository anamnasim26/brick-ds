import { useNavigate } from 'react-router-dom';
import { Layers, Box, BookOpen } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';

// ─── Cursor ───────────────────────────────────────────────────────────────────
//
// Matches the Figma "Group 1" (node 49:745) layout exactly:
//   • The cursor arrow sits at (0,0) of the container (absolute)
//   • The name label is a ROUNDED RECTANGLE (not a pill), offset down-right
//     so the cursor tip appears to point into its upper-left corner
//   • Both arrow and label share the same fill colour
//
// Scale = 2× the Figma base:
//   Figma: arrow ≈ 24px, label px-32 py-24 text-56 rounded-20
//   2× here: arrow SVG 44×60, label px-20 py-12 text-18 rounded-[14px]
//
// `mirror` flips the whole component horizontally (CSS double-flip trick so
// the label text stays readable) — use this for right-side cursors so the
// arrow tip points toward the hero centre.

interface CursorProps {
  name: string;
  color: string;
  textColor?: string;
  /** Flip the component so cursor tip points the other way (for right-side placement) */
  mirror?: boolean;
  style?: React.CSSProperties;
}

function Cursor({ name, color, textColor = '#ffffff', mirror = false, style }: CursorProps) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={style}
    >
      {/* Outer wrapper — flipped for mirror mode */}
      <div style={{ display: 'inline-block', position: 'relative', transform: mirror ? 'scaleX(-1)' : undefined }}>

        {/*
          Name label — rounded rectangle.
          marginLeft  > cursor body right edge  → label text is never covered.
          marginTop   > 0                       → cursor tip shows above label.
          The label background (same colour as arrow) fills the overlap zone,
          so cursor + label look seamlessly joined at their corner.

          Cursor SVG is 40 × 54 px.
          Arrow body right edge ≈ 15.5/16 × 40 = 38.75 px → use marginLeft 44 px.
          Arrow tip top         ≈  2/22  × 54 =  4.9  px → marginTop 32 px gives
          a clean diagonal gap between tip and label top edge.
        */}
        <div
          style={{
            marginLeft: '44px',
            marginTop: '32px',
            backgroundColor: color,
            color: textColor,
            borderRadius: '12px',
            padding: '8px 16px',
            fontSize: '16px',
            fontWeight: '700',
            letterSpacing: '-0.2px',
            whiteSpace: 'nowrap',
            lineHeight: '1.2',
            // Un-flip text so it reads correctly in mirror mode
            transform: mirror ? 'scaleX(-1)' : undefined,
          }}
        >
          {name}
        </div>

        {/* Cursor arrow — absolutely on top, tip at upper-left */}
        <svg
          width="40"
          height="54"
          viewBox="0 0 16 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <path
            d="M2 2 L2 19 L6.5 14.5 L9.5 21.5 L12.5 20.5 L9.5 13.5 L15.5 13.5 Z"
            fill={color}
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

      </div>
    </div>
  );
}

// ─── Cards ────────────────────────────────────────────────────────────────────

const CARDS = [
  {
    to: '/foundations',
    icon: Layers,
    title: 'Foundations',
    description:
      'Design tokens, colour palettes, typography scales, spacing, and border radius — the building blocks every component is built on.',
    iconClass: 'bg-brick-blue-50 text-brick-blue-500',
    border: 'hover:border-brick-blue-300',
  },
  {
    to: '/components',
    icon: Box,
    title: 'Components',
    description:
      'Production-ready React components built with CVA and Tailwind. Each component ships with an interactive playground.',
    iconClass: 'bg-success-green-50 text-success-green-500',
    border: 'hover:border-success-green-300',
  },
  {
    to: '/setup',
    icon: BookOpen,
    title: 'Get set up',
    description:
      'Step-by-step setup guides for developers and designers — from cloning the repo to importing your first component.',
    iconClass: 'bg-warning-yellow-50 text-warning-yellow-700',
    border: 'hover:border-warning-yellow-300',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section
        className="relative flex items-center justify-center overflow-hidden border-b border-brick-grey-300 bg-brick-grey-white px-48 min-h-[60vh]"
        style={{
          backgroundImage:
            'radial-gradient(circle, var(--color-brick-grey-400) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        {/*
          Cursors — all use the standard NW-pointing arrow.
          mirror=true flips the component so the tip reads as pointing
          toward the hero centre from the right side.
          Positions are tightened so cursors sit close to the heading.
        */}

        {/* Priya · top-left */}
        <Cursor
          name="Priya"
          color="#f3c200"
          textColor="#1a1a1a"
          style={{
            top: '16%', left: '12%',
            animation: 'cursor-float-1 7s ease-in-out infinite',
          }}
        />

        {/* You · top-right — mirrored so cursor tip faces centre */}
        <Cursor
          name="You"
          color="#0d8bff"
          mirror
          style={{
            top: '12%', right: '12%',
            animation: 'cursor-float-2 9s ease-in-out infinite',
          }}
        />

        {/* Jamie · bottom-left */}
        <Cursor
          name="Jamie"
          color="#1a7f37"
          style={{
            bottom: '18%', left: '10%',
            animation: 'cursor-float-3 8s ease-in-out infinite',
          }}
        />

        {/* Ravi · bottom-right — mirrored */}
        <Cursor
          name="Ravi"
          color="#425563"
          style={{
            bottom: '14%', right: '10%',
            animation: 'cursor-float-4 6s ease-in-out infinite',
          }}
        />

        {/* ── Centre content ── */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-[760px]">
          <p className="text-14 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-20">
            Brick Design System
          </p>

          <h1
            className="font-bold text-brick-grey-950 leading-[1.05] mb-24"
            style={{ fontSize: '76px' }}
          >
            Design and develop<br />
            with{' '}
            <span className="text-active-blue-500">confidence.</span>
          </h1>

          <p className="text-20 text-brick-grey-600 leading-28 max-w-[480px]">
            Ship consistent interfaces using quality foundations,
            flexible components, and powerful tools.
          </p>
        </div>
      </section>

      {/* ── Get started cards ── */}
      <section className="px-48 py-48 bg-brick-grey-100">
        <h2 className="text-24 font-bold text-brick-grey-950 mb-32">Get started</h2>
        <div className="grid grid-cols-3 gap-24 max-w-[1200px]">
          {CARDS.map(({ to, icon: Icon, title, description, iconClass, border }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className={[
                'text-left bg-brick-grey-white rounded-12 border border-brick-grey-300',
                'p-32 flex flex-col gap-20 transition-all hover:shadow-sm cursor-pointer group',
                border,
              ].join(' ')}
            >
              <div className={`w-[48px] h-[48px] rounded-12 flex items-center justify-center ${iconClass}`}>
                <Icon className="size-6" />
              </div>
              <div className="flex flex-col gap-8">
                <h3 className="text-20 font-bold text-brick-grey-950 group-hover:text-brick-blue-500 transition-colors">
                  {title}
                </h3>
                <p className="text-14 text-brick-grey-600 leading-22">{description}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <Footer />

    </div>
  );
}
