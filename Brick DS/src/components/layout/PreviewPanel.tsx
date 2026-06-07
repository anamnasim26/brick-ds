import { useState } from 'react';
import { Check, Copy, Eye, Code } from 'lucide-react';

// ─── Syntax highlighter ────────────────────────────────────────────────────────
// Tokenises JSX source into coloured spans — no external deps needed.

type Token = { type: 'tag' | 'prop' | 'string' | 'expr' | 'punct' | 'plain'; text: string };

function tokenise(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // String value  "..."
    if (code[i] === '"') {
      const end = code.indexOf('"', i + 1);
      if (end === -1) { tokens.push({ type: 'string', text: code.slice(i) }); break; }
      tokens.push({ type: 'string', text: code.slice(i, end + 1) });
      i = end + 1;
      continue;
    }
    // JSX expression  {...}
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
    // Opening tag  <ComponentName  or  </ComponentName  or  />  or  >
    if (code[i] === '<') {
      // self-close or close bracket
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
      // tag name (PascalCase or lowercase)
      let j = i;
      while (j < code.length && /[A-Za-z0-9._-]/.test(code[j])) j++;
      if (j > i) { tokens.push({ type: 'tag', text: code.slice(i, j) }); i = j; }
      continue;
    }
    // self-close  />
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
    // Prop name:  word followed by =  or  standalone (boolean shorthand)
    if (/[a-z_]/i.test(code[i])) {
      let j = i;
      while (j < code.length && /[A-Za-z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);
      // is next char '=' or space/newline/> — treat as prop name
      const next = code[j];
      if (next === '=' || next === '\n' || next === ' ' || next === '\r') {
        tokens.push({ type: 'prop', text: word });
      } else {
        tokens.push({ type: 'plain', text: word });
      }
      i = j;
      continue;
    }
    // Everything else (whitespace, =, newlines)
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

function CodeBlock({ code }: { code: string }) {
  const tokens = tokenise(code);
  return (
    <div className="w-full h-full flex flex-col bg-brick-grey-white">
      <pre className="flex-1 overflow-auto p-24 pt-20 text-13 leading-[1.7] font-mono">
        {tokens.map((t, i) => (
          <span key={i} className={TOKEN_CLASS[t.type]}>{t.text}</span>
        ))}
      </pre>
    </div>
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

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      {/* Top-right controls */}
      <div className="absolute top-16 right-16 z-20 flex items-center gap-8">

        {/* Copy button — only shown on code tab */}
        {tab === 'code' && (
          <button
            onClick={copy}
            title="Copy code"
            className="flex items-center gap-5 px-8 py-[5px] rounded-8 border border-brick-grey-300 bg-brick-grey-white text-brick-grey-600 hover:text-brick-grey-950 hover:bg-brick-grey-100 transition-colors text-11 font-medium shadow-sm"
          >
            {copied
              ? <><Check className="size-[11px]" />Copied</>
              : <><Copy className="size-[11px]" />Copy</>
            }
          </button>
        )}

        {/* Preview / Code toggle */}
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
        </div>{/* end toggle pill */}
      </div>{/* end top-right controls */}

      {/* Preview */}
      {tab === 'preview' && (
        <div className="flex-1 bg-brick-grey-100 flex items-center justify-center p-48">
          {children}
        </div>
      )}

      {/* Code */}
      {tab === 'code' && (
        <div className="flex-1 overflow-hidden">
          <CodeBlock code={code} />
        </div>
      )}
    </div>
  );
}
