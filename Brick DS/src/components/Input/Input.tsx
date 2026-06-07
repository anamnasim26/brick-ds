import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Plus, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── State token maps ────────────────────────────────────────────────────────

const boxVariants = cva(
  'flex items-center gap-8 px-12 py-8 rounded-12 border-[1.5px] min-h-[44px] max-h-[44px] w-full transition-colors',
  {
    variants: {
      state: {
        'Default-Unfilled': 'bg-brick-grey-white border-brick-blue-200',
        Hover:              'bg-brick-grey-white border-brick-blue-400',
        Filled:             'bg-brick-grey-white border-brick-blue-200',
        Focus:              'bg-brick-grey-white border-active-blue-500',
        Error:              'bg-brick-grey-white border-error-red-500',
        Disabled:           'bg-brick-grey-200 border-brick-grey-400',
      },
    },
    defaultVariants: { state: 'Default-Unfilled' },
  }
);

const textVariants = cva(
  'flex-1 min-w-0 text-16 font-normal font-heading leading-24 bg-transparent outline-none border-none truncate',
  {
    variants: {
      state: {
        'Default-Unfilled': 'text-brick-blue-300 placeholder:text-brick-blue-300',
        Hover:              'text-brick-blue-300 placeholder:text-brick-blue-300',
        Filled:             'text-brick-blue-500 placeholder:text-brick-blue-300',
        Focus:              'text-brick-blue-500 placeholder:text-brick-blue-300',
        Error:              'text-brick-blue-500 placeholder:text-brick-blue-300',
        Disabled:           'text-brick-grey-600 placeholder:text-brick-grey-600 cursor-not-allowed',
      },
    },
    defaultVariants: { state: 'Default-Unfilled' },
  }
);

const iconVariants = cva('shrink-0 size-24', {
  variants: {
    state: {
      'Default-Unfilled': 'text-brick-blue-300',
      Hover:              'text-brick-blue-300',
      Filled:             'text-brick-blue-500',
      Focus:              'text-brick-blue-500',
      Error:              'text-error-red-500',
      Disabled:           'text-brick-grey-400',
    },
  },
  defaultVariants: { state: 'Default-Unfilled' },
});

const helperVariants = cva('text-12 font-normal font-heading leading-16 truncate w-full', {
  variants: {
    state:    { 'Default-Unfilled': '', Hover: '', Filled: '', Focus: '', Error: 'text-error-red-500', Disabled: '' },
    location: { Left: 'text-left', Right: 'text-right' },
  },
  compoundVariants: [
    { state: ['Default-Unfilled', 'Hover', 'Filled', 'Focus', 'Disabled'], className: 'text-brick-grey-black' },
  ],
  defaultVariants: { state: 'Default-Unfilled', location: 'Left' },
});

// ─── Types ───────────────────────────────────────────────────────────────────

export type InputState = 'Default-Unfilled' | 'Hover' | 'Filled' | 'Focus' | 'Error' | 'Disabled';

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<'input'>, 'size'>,
    VariantProps<typeof boxVariants> {
  state?:              InputState;
  label?:              boolean;
  inputLabel?:         string;
  required?:           boolean;
  showLeftIcon?:       boolean;
  showRightIcon?:      boolean;
  leftIcon?:           ReactNode;
  rightIcon?:          ReactNode;
  helperText?:         boolean;
  helperTextContent?:  string;
  helperTextLocation?: 'Left' | 'Right';
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Input({
  state               = 'Default-Unfilled',
  label               = true,
  inputLabel          = 'Label',
  required            = true,
  showLeftIcon        = true,
  showRightIcon       = true,
  leftIcon,
  rightIcon,
  helperText          = true,
  helperTextContent   = 'This is a hint text to help user',
  helperTextLocation  = 'Left',
  placeholder         = 'Input text',
  className,
  ...props
}: InputProps) {
  const isDisabled = state === 'Disabled';

  return (
    <div className={cn('flex flex-col gap-8 w-[300px] min-w-[120px]', className)}>

      {/* Label row */}
      {(label || required) && (
        <div className="flex items-center gap-4 text-16 font-normal font-heading leading-24 text-brick-grey-black">
          {label    && <span>{inputLabel}</span>}
          {required && <span>*</span>}
        </div>
      )}

      {/* Input box */}
      <div className={boxVariants({ state })}>
        {showLeftIcon && (
          <span className={iconVariants({ state })}>
            {leftIcon ?? <Plus className="size-24" strokeWidth={1.5} />}
          </span>
        )}

        <input
          className={cn(textVariants({ state }), 'focus:placeholder-transparent')}
          placeholder={placeholder}
          disabled={isDisabled}
          aria-invalid={state === 'Error'}
          {...props}
        />

        {showRightIcon && (
          <span className={iconVariants({ state })}>
            {rightIcon ?? <Info className="size-24" strokeWidth={1.5} />}
          </span>
        )}
      </div>

      {/* Helper text */}
      {helperText && (
        <span className={helperVariants({ state, location: helperTextLocation })}>
          {helperTextContent}
        </span>
      )}
    </div>
  );
}
