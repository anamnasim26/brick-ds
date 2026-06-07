import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export type RadioState = 'Default' | 'Hover' | 'Pressed' | 'Disabled';
export type RadioSize  = '16' | '20';

export interface RadioButtonProps {
  size?:     RadioSize;
  state?:    RadioState;
  selected?: boolean;
  className?: string;
}

// ─── Variants ────────────────────────────────────────────────────────────────

const ringVariants = cva(
  'relative rounded-full border flex items-center justify-center shrink-0 transition-colors p-4',
  {
    variants: {
      size: {
        '16': 'size-16',
        '20': 'size-20',
      },
      state: {
        Default:  'bg-brick-grey-white border-brick-blue-500',
        Hover:    'bg-brick-blue-50 border-brick-blue-500',
        Pressed:  'bg-brick-blue-100 border-brick-blue-700',
        Disabled: 'bg-brick-grey-200 border-brick-grey-600',
      },
    },
    defaultVariants: { size: '16', state: 'Default' },
  }
);

// Inner dot colour per state
const DOT_COLOR: Record<RadioState, string> = {
  Default:  'bg-brick-blue-500',
  Hover:    'bg-brick-blue-500',
  Pressed:  'bg-brick-blue-700',
  Disabled: 'bg-brick-grey-500',
};

// ─── Component ───────────────────────────────────────────────────────────────

export function RadioButton({
  size     = '16',
  state    = 'Default',
  selected = false,
  className,
}: RadioButtonProps) {
  return (
    <div className={cn(ringVariants({ size, state }), className)}>
      {selected && (
        <div className={cn('rounded-full w-full h-full', DOT_COLOR[state])} />
      )}
    </div>
  );
}
