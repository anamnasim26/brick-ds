import { useState, useRef, useEffect } from 'react';
import { Check, Copy, Eye, Code } from 'lucide-react';
import { Button } from '@/components/Button';

// ─── Syntax highlighter ────────────────────────────────────────────────────────

type Token = { type: 'tag' | 'prop' | 'string' | 'expr' | 'punct' | 'plain'; text: string };

function tokenise(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    if (code[i] === '"') {
      const end = code.indexOf('"', i + 1);
      if (end === -1) { tokens.push({ type: 'string', text: code.slice(i) }); break; }
      tokens.push({ type: 'string', text: code.slice(i, end + 1) });
      i = end + 1;
      continue;
    }
    if (code[i] === '{') {
      let depth = 0, j = i;
      while (j < code.length) {
        if (code[j] === '{') depth++;
        if (code[j] === '}') { depth--; if (depth === 0) { j++; break; } }
        j++;
      }
      tokens.push({ type: 'expr', text: code.slice(i, j) });
      i = j;
      continue;
    }
    if (code[i] === '<') {
      if (code[i + 1] === '/') {
        const end = code.indexOf('>', i);
        if (end === -1) { tokens.push({ type: 'punct', text: code.slice(i) }); break; }
        tokens.push({ type: 'punct', text: '</' });
        const name = code.slice(i + 2, end);
        tokens.push({ type: 'tag', text: name });
        tokens.push({ type: 'punct', text: '>' });
        i = end + 1;
        continue;
      }
      tokens.push({ type: 'punct', text: '<' });
      i++;
      let j = i;
      while (j < code.length && /[A-Za-z0-9._-]/.test(code[j])) j++;
      if (j > i) { tokens.push({ type: 'tag', text: code.slice(i, j) }); i = j; }
      continue;
    }
    if (code[i] === '/' && code[i + 1] === '>') {
      tokens.push({ type: 'punct', text: '/>' });
      i += 2;
      continue;
    }
    if (code[i] === '>') {
      tokens.push({ type: 'punct', text: '>' });
      i++;
      continue;
    }
    if (/[a-z_]/i.test(code[i])) {
      let j = i;
      while (j < code.length && /[A-Za-z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);
      const next = code[j];
      if (next === '=' || next === '\n' || next === ' ' || next === '\r') {
        tokens.push({ type: 'prop', text: word });
      } else {
        tokens.push({ type: 'plain', text: word });
      }
      i = j;
      continue;
    }
    tokens.push({ type: 'plain', text: code[i] });
    i++;
  }
  return tokens;
}

const TOKEN_CLASS: Record<Token['type'], string> = {
  tag:    'text-sky-600',
  prop:   'text-violet-600',
  string: 'text-amber-600',
  expr:   'text-blue-600',
  punct:  'text-brick-grey-500',
  plain:  'text-brick-grey-800',
};

// ─── CodeBlock ─────────────────────────────────────────────────────────────────

function CodeBlock({ code, changedLines }: { code: string; changedLines: Set<number> }) {
  const lines = code.split('\n');

  return (
    <pre className="flex-1 overflow-auto p-24 text-13 leading-[1.7] font-mono">
      {lines.map((line, lineIdx) => {
        const isChanged = changedLines.has(lineIdx);
        const lineTokens = tokenise(line);
        return (
          <div
            key={lineIdx}
            className="rounded-4 transition-colors duration-100"
            style={isChanged ? { backgroundColor: 'rgba(13, 139, 255, 0.08)' } : undefined}
          >
            {lineTokens.map((t, i) => (
              <span key={i} className={TOKEN_CLASS[t.type]}>{t.text}</span>
            ))}
            {'\n'}
          </div>
        );
      })}
    </pre>
  );
}

// ─── PreviewPanel ──────────────────────────────────────────────────────────────

interface PreviewPanelProps {
  code: string;
  children: React.ReactNode;
}

export function PreviewPanel({ code, children }: PreviewPanelProps) {
  const [tab, setTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const [changedLines, setChangedLines] = useState<Set<number>>(new Set());
  const prevCodeRef = useRef<string>(code);
  const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prev = prevCodeRef.current;
    if (prev === code) return;

    const prevLines = prev.split('\n');
    const nextLines = code.split('\n');
    const changed = new Set<number>();
    const maxLen = Math.max(prevLines.length, nextLines.length);
    for (let i = 0; i < maxLen; i++) {
      if (prevLines[i] !== nextLines[i]) changed.add(i);
    }

    prevCodeRef.current = code;
    if (changed.size === 0) return;

    setChangedLines(changed);
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
    clearTimerRef.current = setTimeout(() => setChangedLines(new Set()), 1200);
  }, [code]);

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Shared header bar */}
      <div className="flex items-center justify-between px-12 py-[3px] border-b border-brick-grey-300 bg-brick-grey-white shrink-0">
        {/* Left: copy button (code tab only) or spacer */}
        {tab === 'code' ? (
          <Button
            variant="Secondary"
            size="Small"
            state={copied ? 'Default' : 'Default'}
            label={copied ? 'Copied' : 'Copy'}
            leftIcon={copied ? <Check className="size-[16px]" /> : <Copy className="size-[16px]" />}
            showLeftIcon
            showRightIcon={false}
            withText
            onClick={copy}
          />
        ) : (
          <span className="text-12 font-semibold text-brick-grey-500 uppercase tracking-[0.08em]">Preview</span>
        )}

        {/* Right: Preview / Code toggle */}
        <div className="flex items-center bg-brick-grey-white border border-brick-grey-300 rounded-8 p-[3px] shadow-sm">
          {([
            { id: 'preview', icon: Eye,  label: 'Preview' },
            { id: 'code',    icon: Code, label: 'Code'    },
          ] as const).map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-label={label}
              title={label}
              className={`size-[30px] flex items-center justify-center rounded-6 transition-colors ${
                tab === id
                  ? 'bg-brick-grey-950 text-brick-grey-white'
                  : 'text-brick-grey-600 hover:text-brick-grey-950'
              }`}
            >
              <Icon className="size-[14px]" />
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {tab === 'preview' && (
        <div className="ds-preview flex-1 bg-brick-grey-100 flex items-center justify-center p-48">
          {children}
        </div>
      )}

      {/* Code */}
      {tab === 'code' && (
        <div className="flex-1 overflow-hidden">
          <CodeBlock code={code} changedLines={changedLines} />
        </div>
      )}
    </div>
  );
}
