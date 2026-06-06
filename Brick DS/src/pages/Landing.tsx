import { useNavigate } from 'react-router-dom';
import { Layers, Box } from 'lucide-react';

const CARDS = [
  {
    to: '/foundations',
    icon: Layers,
    title: 'Foundations',
    description: 'Design tokens, colour palettes, typography scales, spacing, and border radius — the building blocks every component is built on.',
    color: 'bg-brick-blue-50 text-brick-blue-500',
    border: 'hover:border-brick-blue-300',
  },
  {
    to: '/components',
    icon: Box,
    title: 'Components',
    description: 'Production-ready React components built with CVA and Tailwind. Each component ships with an interactive playground.',
    color: 'bg-success-green-50 text-success-green-500',
    border: 'hover:border-success-green-300',
  },
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="px-48 pt-64 pb-48 border-b border-brick-grey-300 bg-brick-grey-white">
        <p className="text-14 font-semibold text-brick-blue-500 uppercase tracking-[0.1em] mb-16">Brick Design System</p>
        <h1 className="text-60 font-bold text-brick-grey-950 leading-64 mb-20 max-w-[640px]">
          Design and develop with confidence.
        </h1>
        <p className="text-20 text-brick-grey-600 leading-28 max-w-[540px]">
          Ship consistent interfaces using quality foundations, flexible components, and powerful tools.
        </p>
      </section>

      {/* Cards */}
      <section className="px-48 py-48 bg-brick-grey-100">
        <h2 className="text-24 font-bold text-brick-grey-950 mb-32">Get started</h2>
        <div className="grid grid-cols-2 gap-24 max-w-[800px]">
          {CARDS.map(({ to, icon: Icon, title, description, color, border }) => (
            <button
              key={to}
              onClick={() => navigate(to)}
              className={`text-left bg-brick-grey-white rounded-12 border border-brick-grey-300 p-32 flex flex-col gap-20 transition-all hover:shadow-sm cursor-pointer group ${border}`}
            >
              <div className={`w-[48px] h-[48px] rounded-12 flex items-center justify-center ${color}`}>
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
    </div>
  );
}
