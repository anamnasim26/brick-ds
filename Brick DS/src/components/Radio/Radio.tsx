import { cn } from '@/lib/utils';
import { RadioButton } from './RadioButton';

// ─── Types ───────────────────────────────────────────────────────────────────

export type RadioType = 'Default' | 'Selected' | 'Disabled';

export interface RadioProps {
  type?:        RadioType;
  label?:       boolean;
  labelText?:   string;
  caption?:     boolean;
  captionText?: string;
  className?:   string;
}

// ─── Token maps ──────────────────────────────────────────────────────────────

const CARD_BORDER: Record<RadioType, string> = {
  Default:  'border-brick-blue-100',
  Selected: 'border-brick-blue-500',
  Disabled: 'border-brick-grey-600',
};

const LABEL_COLOR: Record<RadioType, string> = {
  Default:  'text-brick-grey-black',
  Selected: 'text-brick-blue-500',
  Disabled: 'text-brick-grey-600',
};

const CAPTION_COLOR: Record<RadioType, string> = {
  Default:  'text-brick-grey-600',
  Selected: 'text-brick-blue-400',
  Disabled: 'text-brick-grey-500',
};

// ─── Component ───────────────────────────────────────────────────────────────

export function Radio({
  type        = 'Default',
  label       = true,
  labelText   = 'Radio Button Label',
  caption     = true,
  captionText = 'This is a caption or a description',
  className,
}: RadioProps) {
  const isDisabled = type === 'Disabled';
  const isSelected = type === 'Selected';

  return (
    <div
      className={cn(
        'flex gap-8 items-start p-8 rounded-8 border bg-brick-grey-white min-w-[180px] max-w-[300px] w-[300px]',
        CARD_BORDER[type],
        className,
      )}
    >
      {/* Radio button dot
          Figma: inside the card the disabled ring is white bg + grey-600 border,
          whereas the standalone RadioButton disabled state uses grey-200 bg.
          We override bg here so the card matches the Figma spec exactly. */}
      <div className="flex items-center p-4 shrink-0">
        <RadioButton
          size="16"
          state={isDisabled ? 'Disabled' : 'Default'}
          selected={isSelected}
          className={isDisabled ? 'bg-brick-grey-white' : undefined}
        />
      </div>

      {/* Label + caption */}
      <div className="flex flex-col gap-4 flex-1 min-w-0 justify-center self-stretch">
        {label && (
          <p className={cn(
            'text-16 font-semibold font-heading leading-24 truncate w-full',
            LABEL_COLOR[type],
          )}>
            {labelText}
          </p>
        )}
        {caption && (
          <p className={cn(
            'text-14 font-normal font-heading leading-20 truncate w-full',
            CAPTION_COLOR[type],
          )}>
            {captionText}
          </p>
        )}
      </div>
    </div>
  );
}
