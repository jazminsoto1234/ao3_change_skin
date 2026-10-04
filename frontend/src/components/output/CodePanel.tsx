'use client';

// F5-1: CSS de un skin guardado en bloque oscuro con resaltado hecho a mano
// línea por línea (sin dependencia externa). − pliega el código a las
// primeras líneas, + lo despliega completo.
import type { ReactNode } from 'react';
import { useCopy } from '@/hooks/useCopy';
import { ColorDots } from '@/components/ui/ColorDots';
import { Button } from '@/components/ui/Button';

const COLLAPSED_LINES = 16;

function highlightLine(line: string, key: number) {
  const trimmed = line.trim();
  const indent = line.slice(0, line.length - trimmed.length);
  let content: ReactNode = line || ' ';

  if (trimmed.startsWith('/*')) {
    content = <span className="text-[#7d8c7a]">{line}</span>;
  } else if (trimmed === '}') {
    content = <span className="text-[#d8d2d4]">{line}</span>;
  } else if (trimmed.endsWith('{') || trimmed.endsWith(',')) {
    const brace = line.lastIndexOf('{');
    content =
      brace === -1 ? (
        <span className="text-[#e58fc0]">{line}</span>
      ) : (
        <>
          <span className="text-[#e58fc0]">{line.slice(0, brace)}</span>
          <span className="text-[#d8d2d4]">{line.slice(brace)}</span>
        </>
      );
  } else {
    const declaration = trimmed.match(/^([a-zA-Z-]+)(\s*:\s*)(.+?)(;?)$/);
    if (declaration) {
      const [, property, colon, value, semicolon] = declaration;
      content = (
        <>
          {indent}
          <span className="text-[#8fd3d6]">{property}</span>
          <span className="text-[#d8d2d4]">{colon}</span>
          <span className="text-[#f4a06b]">{value}</span>
          <span className="text-[#d8d2d4]">{semicolon}</span>
        </>
      );
    }
  }

  return <div key={key}>{content}</div>;
}

interface CodePanelProps {
  name: string;
  updatedLabel: string;
  colors: string[];
  css: string;
  expanded: boolean;
  onToggle: (expanded: boolean) => void;
}

export function CodePanel({ name, updatedLabel, colors, css, expanded, onToggle }: CodePanelProps) {
  const { copied, copy } = useCopy();
  const lines = css.split('\n');
  const visible = expanded ? lines : lines.slice(0, COLLAPSED_LINES);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-4 px-6 pb-5 pt-6">
        <ColorDots colors={colors} size={30} overlap ringClassName="border-white" />
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-serif text-lg font-semibold">{name}</h2>
          <p className="truncate text-[13px] text-soft">{updatedLabel}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="red"
            size="square"
            aria-label="Collapse code"
            disabled={!expanded}
            onClick={() => onToggle(false)}
          >
            −
          </Button>
          <Button
            variant="dark"
            size="square"
            aria-label="Expand code"
            disabled={expanded}
            onClick={() => onToggle(true)}
          >
            +
          </Button>
        </div>
      </div>
      <div className="bg-code px-6 pb-5 pt-6">
        <pre className="overflow-x-auto font-mono text-[13px] leading-[1.6] text-[#e9e4e6]">
          <code>{visible.map((line, i) => highlightLine(line, i))}</code>
        </pre>
        {!expanded && lines.length > COLLAPSED_LINES && (
          <button
            type="button"
            onClick={() => onToggle(true)}
            className="mt-1 font-mono text-[13px] text-[#9d9497] hover:text-white"
          >
            … {lines.length - COLLAPSED_LINES} more lines
          </button>
        )}
        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-xs text-[#e9e4e6]">CSS</span>
          <Button variant="red" size="sm" onClick={() => void copy(css)}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>
    </div>
  );
}
