import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export type TooltipColour        = 'Brand' | 'Black';
export type TooltipArrowPosition =
  | 'Bottom Left' | 'Bottom Center' | 'Bottom Right'
  | 'Top Left'    | 'Top Center'    | 'Top Right'
  | 'Left'        | 'Right';

export interface TooltipProps {
  colour?:         TooltipColour;
  arrowPosition?:  TooltipArrowPosition;
  label?:          boolean;
  labelText?:      string;
  caption?:        boolean;
  captionText?:    string;
  showCloseIcon?:  boolean;
  className?:      string;
}

// ─── Arrow SVGs ───────────────────────────────────────────────────────────────
// Inline SVGs so there are no expiring Figma image assets.
// Each arrow fill colour matches the tooltip box background exactly —
// this, combined with the wrapper drop-shadow, makes them look like one shape.

function ArrowDown({ fill }: { fill: string }) {
  return (
    <svg width="18" height="9" viewBox="0 0 17.321 9" fill="none">
      <path d="M8.6603 9L0 0L17.3205 0L8.6603 9Z" fill={fill} />
    </svg>
  );
}

function ArrowUp({ fill }: { fill: string }) {
  return (
    <svg width="18" height="9" viewBox="0 0 17.321 9" fill="none">
      <path d="M8.6603 0L17.3205 9L0 9L8.6603 0Z" fill={fill} />
    </svg>
  );
}

function ArrowLeft({ fill }: { fill: string }) {
  return (
    <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
      <path d="M0 7L9 0L9 14L0 7Z" fill={fill} />
    </svg>
  );
}

function ArrowRight({ fill }: { fill: string }) {
  return (
    <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
      <path d="M9 7L0 0L0 14L9 7Z" fill={fill} />
    </svg>
  );
}

// ─── Token maps ──────────────────────────────────────────────────────────────

// Box background — no explicit border; the drop-shadow on the wrapper makes
// the Brand (white) tooltip visible on light backgrounds without a border
// that would only wrap the rectangle and not the arrow.
const BOX_CLASS: Record<TooltipColour, string> = {
  Brand: 'bg-brick-grey-white',
  Black: 'bg-brick-grey-black',
};

// Arrow fill — must match box bg exactly so they look like one piece
const ARROW_FILL: Record<TooltipColour, string> = {
  Brand: '#ffffff',  // brick-grey-white
  Black: '#000000',  // brick-grey-black
};

// Label text
const LABEL_CLASS: Record<TooltipColour, string> = {
  Brand: 'text-brick-blue-500',   // #425563 — dark navy
  Black: 'text-brick-grey-white', // white on black
};

// Caption text
const CAPTION_CLASS: Record<TooltipColour, string> = {
  Brand: 'text-brick-blue-400',   // #5c768a — medium navy
  Black: 'text-brick-grey-white', // white on black (same as label — no separate caption colour in black mode)
};

// Close icon
const CLOSE_CLASS: Record<TooltipColour, string> = {
  Brand: 'text-brick-blue-500',   // matches label colour
  Black: 'text-brick-grey-white', // white on black
};

// Arrow alignment for bottom/top positions
const BOTTOM_ALIGN: Record<'Bottom Left' | 'Bottom Center' | 'Bottom Right', string> = {
  'Bottom Left':   'items-start',
  'Bottom Center': 'items-center',
  'Bottom Right':  'items-end',
};

const TOP_ALIGN: Record<'Top Left' | 'Top Center' | 'Top Right', string> = {
  'Top Left':   'items-start',
  'Top Center': 'items-center',
  'Top Right':  'items-end',
};

// Drop-shadow applied on the wrapper div so it traces the combined silhouette
// of both the box AND the arrow triangle. Using inline style for reliability
// (Tailwind arbitrary class syntax can mangle spaces/parens in filter values).
const SHADOW_STYLE: React.CSSProperties = {
  filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))',
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Tooltip({
  colour         = 'Brand',
  arrowPosition  = 'Bottom Left',
  label          = true,
  labelText      = 'Tooltip Label',
  caption        = true,
  captionText    = 'This is a caption or a description',
  showCloseIcon  = true,
  className,
}: TooltipProps) {
  const arrowFill = ARROW_FILL[colour];

  // ── Tooltip box ──
  const box = (
    <div className={cn(
      'flex gap-8 items-center p-8 rounded-8 min-w-[180px] max-w-[300px] w-[300px]',
      BOX_CLASS[colour],
    )}>
      <div className="flex flex-col gap-4 flex-1 min-w-0 justify-center self-stretch">
        {label && (
          <p className={cn(
            'text-14 font-semibold font-heading leading-20 truncate w-full whitespace-nowrap',
            LABEL_CLASS[colour],
          )}>
            {labelText}
          </p>
        )}
        {caption && (
          <p className={cn(
            'text-12 font-normal font-heading leading-16 w-full',
            CAPTION_CLASS[colour],
          )}>
            {captionText}
          </p>
        )}
      </div>
      {showCloseIcon && (
        <X className={cn('shrink-0 size-20', CLOSE_CLASS[colour])} strokeWidth={1.5} />
      )}
    </div>
  );

  // ── Bottom: box above, arrow below pointing down ──
  if (arrowPosition === 'Bottom Left' || arrowPosition === 'Bottom Center' || arrowPosition === 'Bottom Right') {
    return (
      <div className={cn('flex flex-col w-[300px]', className)} style={SHADOW_STYLE}>
        {box}
        <div className={cn('flex px-20', BOTTOM_ALIGN[arrowPosition])}>
          <ArrowDown fill={arrowFill} />
        </div>
      </div>
    );
  }

  // ── Top: arrow above pointing up, box below ──
  if (arrowPosition === 'Top Left' || arrowPosition === 'Top Center' || arrowPosition === 'Top Right') {
    return (
      <div className={cn('flex flex-col w-[300px]', className)} style={SHADOW_STYLE}>
        <div className={cn('flex px-20', TOP_ALIGN[arrowPosition])}>
          <ArrowUp fill={arrowFill} />
        </div>
        {box}
      </div>
    );
  }

  // ── Left: arrow on left pointing left, box on right ──
  if (arrowPosition === 'Left') {
    return (
      <div className={cn('flex items-center', className)} style={SHADOW_STYLE}>
        <ArrowLeft fill={arrowFill} />
        {box}
      </div>
    );
  }

  // ── Right: box on left, arrow on right pointing right ──
  return (
    <div className={cn('flex items-center', className)} style={SHADOW_STYLE}>
      {box}
      <ArrowRight fill={arrowFill} />
    </div>
  );
}
