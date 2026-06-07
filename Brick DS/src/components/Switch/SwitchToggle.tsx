import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

export type SwitchState = 'Default' | 'Hover' | 'Focus' | 'Disabled';

export interface SwitchToggleProps {
  pressed?:   boolean;
  state?:     SwitchState;
  onChange?:  (v: boolean) => void;
  className?: string;
}

// ─── Token maps ──────────────────────────────────────────────────────────────

// Track background: keyed by [state][pressed]
const TRACK_BG: Record<SwitchState, { on: string; off: string }> = {
  Default:  { on: 'bg-brick-blue-500', off: 'bg-brick-grey-400' },
  Hover:    { on: 'bg-brick-blue-600', off: 'bg-brick-grey-500' },
  Focus:    { on: 'bg-brick-blue-500', off: 'bg-brick-grey-400' },
  Disabled: { on: 'bg-brick-grey-400', off: 'bg-brick-grey-300' },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function SwitchToggle({
  pressed   = false,
  state     = 'Default',
  onChange,
  className,
}: SwitchToggleProps) {
  const isDisabled = state === 'Disabled';
  const trackBg    = TRACK_BG[state][pressed ? 'on' : 'off'];

  return (
    <div
      role="switch"
      aria-checked={pressed}
      aria-disabled={isDisabled}
      onClick={() => !isDisabled && onChange?.(!pressed)}
      className={cn(
        // Track — 32 × 16 px pill
        'relative w-[32px] h-[16px] rounded-rounded transition-colors shrink-0',
        trackBg,
        // Focus ring
        state === 'Focus' && 'outline outline-2 outline-offset-2 outline-active-blue-500',
        // Disabled
        isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
        className,
      )}
    >
      {/* Thumb — 12 × 12 px white circle, slides left↔right */}
      <div
        className={cn(
          'absolute top-[2px] size-[12px] rounded-full bg-white',
          'shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-all duration-200',
          pressed ? 'left-[18px]' : 'left-[2px]',
        )}
      />
    </div>
  );
}
