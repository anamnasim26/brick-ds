import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, TrendingUp, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Search index ─────────────────────────────────────────────────────────────

type SearchEntry = {
  label:       string;
  description: string;
  path:        string;
  category:    'Component' | 'Foundation';
  tags:        string[];
};

const SEARCH_INDEX: SearchEntry[] = [
  { label: 'Alert',       path: '/components/alert',       category: 'Component',  description: 'Inline message strip with five variants — general, success, warning, failure, and info.', tags: ['alert', 'notification', 'message', 'banner', 'warning', 'error', 'info', 'success'] },
  { label: 'Avatar',      path: '/components/avatar',      category: 'Component',  description: 'Shows a person or entity in image, initials, or icon mode across four sizes.',            tags: ['avatar', 'user', 'profile', 'image', 'initials', 'icon', 'person'] },
  { label: 'Badge',       path: '/components/badge',       category: 'Component',  description: 'Small inline label for status, category, or priority. Five colour variants.',               tags: ['badge', 'tag', 'label', 'status', 'chip', 'pill'] },
  { label: 'Button',      path: '/components/button',      category: 'Component',  description: 'Six variants, three sizes, five states, and optional left/right icon slots.',               tags: ['button', 'cta', 'action', 'click', 'primary', 'secondary', 'submit'] },
  { label: 'Checkbox',    path: '/components/checkbox',    category: 'Component',  description: 'Three-state input — checked, unchecked, and indeterminate. Two sizes.',                     tags: ['checkbox', 'check', 'tick', 'select', 'form', 'input', 'indeterminate'] },
  { label: 'Empty State', path: '/components/empty-state', category: 'Component',  description: 'Placeholder for screens with no content yet. Includes illustration and actions.',           tags: ['empty', 'empty state', 'placeholder', 'no data', 'no results', '404'] },
  { label: 'Input',       path: '/components/input',       category: 'Component',  description: 'Single-line text input with six states and optional label, helper text, and icons.',        tags: ['input', 'text field', 'form', 'text', 'field', 'entry'] },
  { label: 'Radio',       path: '/components/radio',       category: 'Component',  description: 'Single-select input for mutually exclusive options with label and caption.',                 tags: ['radio', 'radio button', 'select', 'form', 'option', 'choice'] },
  { label: 'Switch',      path: '/components/switch',      category: 'Component',  description: 'Binary toggle for on/off settings. Changes apply immediately.',                              tags: ['switch', 'toggle', 'on', 'off', 'boolean', 'setting'] },
  { label: 'Tooltip',     path: '/components/tooltip',     category: 'Component',  description: 'Small popover on hover. Two colour styles with eight arrow positions.',                     tags: ['tooltip', 'popover', 'hover', 'help', 'hint', 'info'] },
  { label: 'Tabs',        path: '/components/tabs',        category: 'Component',  description: 'Tab navigation for switching between related views.',                                        tags: ['tabs', 'tab', 'navigation', 'section', 'panel'] },
  { label: 'Colours',     path: '/foundations/colours',    category: 'Foundation', description: 'Six palettes, ten shades each. Backgrounds, borders, text, and icon tokens.',              tags: ['colour', 'color', 'palette', 'tokens', 'shade', 'tint', 'hue', 'brand'] },
  { label: 'Typography',  path: '/foundations/typography', category: 'Foundation', description: 'Type scale, font families, weights, and line-height tokens.',                               tags: ['typography', 'font', 'type', 'text', 'heading', 'body', 'size', 'weight'] },
  { label: 'Spacing',     path: '/foundations/spacing',    category: 'Foundation', description: 'An 8-point scale from 0 to 48px for padding, margin, and gap.',                            tags: ['spacing', 'space', 'gap', 'padding', 'margin', '8pt', 'grid'] },
  { label: 'Radius',      path: '/foundations/radius',     category: 'Foundation', description: 'Corner radius tokens from 0 to 24px, plus rounded for pills and avatars.',                 tags: ['radius', 'border radius', 'rounded', 'corner', 'pill', 'round'] },
];

const POPULAR: string[] = ['Button', 'Input', 'Alert', 'Colours', 'Typography'];

const MAX_RECENT = 5;
const RECENT_KEY = 'brick-ds:recent-searches';

function loadRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? '[]'); }
  catch { return []; }
}

function saveRecent(label: string) {
  const prev = loadRecent().filter(l => l !== label);
  localStorage.setItem(RECENT_KEY, JSON.stringify([label, ...prev].slice(0, MAX_RECENT)));
}

function removeRecent(label: string) {
  const next = loadRecent().filter(l => l !== label);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

// ─── Query highlighter ────────────────────────────────────────────────────────

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent font-bold text-brick-grey-950">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ─── Result row ───────────────────────────────────────────────────────────────

function ResultRow({
  entry, active, onSelect, query,
}: {
  entry: SearchEntry; active: boolean; onSelect: (e: SearchEntry) => void; query: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (active) ref.current?.scrollIntoView({ block: 'nearest' }); }, [active]);

  return (
    <button
      ref={ref}
      onClick={() => onSelect(entry)}
      className={cn(
        'w-full text-left rounded-10 px-12 py-8 flex items-center justify-between gap-8 transition-colors',
        active ? 'bg-active-blue-50' : 'bg-brick-grey-100 hover:bg-brick-grey-200',
      )}
    >
      <span className="text-14 leading-20 text-brick-grey-950 min-w-0">
        <Highlight text={entry.label} query={query} />
      </span>
      <ChevronRight className="size-16 text-brick-grey-500 shrink-0" />
    </button>
  );
}

// ─── Shared list row (recent + popular) ──────────────────────────────────────

function ListRow({
  label, onSelect, onRemove,
}: {
  label: string; onSelect: () => void; onRemove?: () => void;
}) {
  return (
    <div className="group flex items-center gap-8">
      <button
        onClick={onSelect}
        className="flex-1 min-w-0 rounded-10 px-12 py-8 flex items-center justify-between gap-8 hover:bg-brick-grey-200 transition-colors"
      >
        <span className="text-14 leading-20 text-brick-grey-950">{label}</span>
        <ChevronRight className="size-16 text-brick-grey-500 shrink-0" />
      </button>
      {onRemove && (
        <button
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 p-4 rounded-4 text-brick-grey-500 hover:text-brick-grey-900 hover:bg-brick-grey-200 transition-all shrink-0"
          aria-label={`Remove ${label}`}
        >
          <X className="size-12" />
        </button>
      )}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-8 mb-8">
      <span className="text-brick-grey-700">{icon}</span>
      <span className="text-16 leading-24 font-semibold text-brick-grey-950">{label}</span>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export function SearchModal({ onClose }: { onClose: () => void }) {
  const navigate                  = useNavigate();
  const [query, setQuery]         = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [recent, setRecent]       = useState<string[]>(loadRecent);
  const inputRef                  = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const results = query.trim()
    ? SEARCH_INDEX.filter(entry => {
        const q = query.toLowerCase();
        return (
          entry.label.toLowerCase().includes(q) ||
          entry.description.toLowerCase().includes(q) ||
          entry.tags.some(t => t.includes(q))
        );
      })
    : [];

  const handleSelect = useCallback((entry: SearchEntry) => {
    saveRecent(entry.label);
    onClose();
    navigate(entry.path);
  }, [navigate, onClose]);

  const handleRemoveRecent = useCallback((label: string) => {
    removeRecent(label);
    setRecent(loadRecent());
  }, []);

  useEffect(() => { setActiveIdx(0); }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); handleSelect(results[activeIdx]); }
  };

  const recentEntries  = recent.map(l => SEARCH_INDEX.find(e => e.label === l)!).filter(Boolean);
  const popularEntries = POPULAR.map(l => SEARCH_INDEX.find(e => e.label === l)!).filter(Boolean);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-brick-grey-black/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="fixed inset-0 z-[101] flex items-start justify-center pt-[10vh] px-16 pointer-events-none"
      >
        <div
          className="w-full max-w-[600px] bg-brick-grey-white rounded-16 shadow-2xl overflow-hidden pointer-events-auto flex flex-col animate-in fade-in zoom-in-95 duration-150"
          style={{ maxHeight: '76vh' }}
          onClick={e => e.stopPropagation()}
        >

          {/* ── Header ── */}
          <div className="border-b border-brick-grey-400 px-16 pt-16 pb-12 flex flex-col gap-12 shrink-0">

            {/* Input row */}
            <div className="flex items-center gap-12">
              <Search className="size-20 text-brick-grey-600 shrink-0" strokeWidth={2} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search components, foundations…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 text-16 leading-24 text-brick-grey-950 placeholder:text-brick-grey-500 bg-transparent focus:outline-none"
              />
              <button
                onClick={onClose}
                className="size-20 flex items-center justify-center text-brick-grey-500 hover:text-brick-grey-950 transition-colors shrink-0"
                aria-label="Close search"
              >
                <X className="size-20" />
              </button>
            </div>

            {/* Keyboard hints */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <span className="text-12 leading-16 text-brick-grey-600">Navigate</span>
                <kbd className="bg-brick-grey-200 border border-brick-grey-400 rounded-4 px-8 py-[1px] text-12 leading-16 text-brick-grey-700">↑</kbd>
                <kbd className="bg-brick-grey-200 border border-brick-grey-400 rounded-4 px-8 py-[1px] text-12 leading-16 text-brick-grey-700">↓</kbd>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-12 leading-16 text-brick-grey-600">Close</span>
                <kbd className="bg-brick-grey-200 border border-brick-grey-400 rounded-4 px-8 py-[1px] text-12 leading-16 text-brick-grey-700">esc</kbd>
              </div>
            </div>
          </div>

          {/* ── Body ── */}
          <div className="overflow-y-auto flex-1 px-16 pt-20 pb-20 flex flex-col gap-20">

            {/* Results */}
            {results.length > 0 && (
              <div className="flex flex-col gap-4">
                {results.map((entry, i) => (
                  <ResultRow
                    key={entry.path}
                    entry={entry}
                    active={i === activeIdx}
                    onSelect={handleSelect}
                    query={query}
                  />
                ))}
              </div>
            )}

            {/* No results */}
            {query.trim() && results.length === 0 && (
              <div className="flex flex-col items-center justify-center py-40">
                <Search className="size-28 mb-12 text-brick-grey-400" strokeWidth={1.5} />
                <p className="text-14 leading-20 font-semibold text-brick-grey-800">No results for "{query}"</p>
                <p className="text-14 leading-20 text-brick-grey-600 mt-4">Try a component name or foundation token</p>
              </div>
            )}

            {/* Idle state */}
            {!query.trim() && (
              <>
                {/* Recent */}
                {recentEntries.length > 0 && (
                  <div>
                    <SectionHeading icon={<Clock className="size-16" strokeWidth={2} />} label="Recent" />
                    <div className="flex flex-col gap-4">
                      {recentEntries.map(entry => (
                        <ListRow
                          key={entry.path}
                          label={entry.label}
                          onSelect={() => handleSelect(entry)}
                          onRemove={() => handleRemoveRecent(entry.label)}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular */}
                <div>
                  <SectionHeading icon={<TrendingUp className="size-16" strokeWidth={2} />} label="Popular" />
                  <div className="flex flex-col gap-4">
                    {popularEntries.map(entry => (
                      <ListRow
                        key={entry.path}
                        label={entry.label}
                        onSelect={() => handleSelect(entry)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
