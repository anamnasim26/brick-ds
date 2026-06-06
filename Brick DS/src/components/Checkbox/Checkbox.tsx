import { cn } from '@/lib/utils';
import { CheckboxBox, type CheckboxBoxProps } from './CheckboxBox';

export interface CheckboxProps extends CheckboxBoxProps {
  label?:       boolean;
  labelText?:   string;
  caption?:     boolean;
  captionText?: string;
}

export function Checkbox({
  type        = 'Primary',
  selection   = 'Unchecked',
  state       = 'Default',
  size        = '16',
  label       = true,
  labelText   = 'Checkbox Label',
  caption     = true,
  captionText = 'This is a caption or a description',
  className,
}: CheckboxProps) {
  const isSelected = selection !== 'Unchecked';
  const isDisabled = state === 'Disabled';

  const cardBorder = isDisabled
    ? 'border-brick-grey-300'
    : isSelected
    ? 'border-brick-blue-500'
    : 'border-brick-blue-100';

  const labelColor = isDisabled
    ? 'text-brick-grey-500'
    : isSelected
    ? 'text-brick-blue-500'
    : 'text-brick-grey-black';

  const captionColor = isDisabled
    ? 'text-brick-grey-400'
    : isSelected
    ? 'text-brick-blue-400'
    : 'text-brick-grey-600';

  return (
    <div className={cn(
      'flex gap-8 items-start p-8 rounded-8 border bg-brick-grey-white',
      'min-w-[180px] max-w-[300px] w-[300px]',
      cardBorder,
      className,
    )}>
      {/* checkbox */}
      <div className="p-4 shrink-0">
        <CheckboxBox type={type} selection={selection} state={state} size={size} />
      </div>

      {/* text */}
      <div className="flex-1 flex flex-col gap-4 min-w-0 justify-center self-stretch">
        {label && (
          <span className={cn('text-16 font-semibold font-heading leading-24 truncate', labelColor)}>
            {labelText}
          </span>
        )}
        {caption && (
          <span className={cn('text-14 font-normal font-heading leading-20 truncate', captionColor)}>
            {captionText}
          </span>
        )}
      </div>
    </div>
  );
}
