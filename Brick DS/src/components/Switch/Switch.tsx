import { cn } from '@/lib/utils';
import { SwitchToggle, type SwitchState } from './SwitchToggle';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SwitchProps {
  pressed?:   boolean;
  state?:     SwitchState;
  label?:     boolean;
  labelText?: string;
  onChange?:  (v: boolean) => void;
  className?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Switch({
  pressed   = false,
  state     = 'Default',
  label     = true,
  labelText = 'Label',
  onChange,
  className,
}: SwitchProps) {
  const isDisabled = state === 'Disabled';

  return (
    <div className={cn('flex items-center gap-8', className)}>
      {label && (
        <span className={cn(
          'text-14 font-normal font-heading leading-20 whitespace-nowrap select-none',
          isDisabled ? 'text-brick-grey-500' : 'text-brick-grey-black',
        )}>
          {labelText}
        </span>
      )}
      <SwitchToggle pressed={pressed} state={state} onChange={onChange} />
    </div>
  );
}
