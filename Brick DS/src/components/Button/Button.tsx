import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Minus, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-8 rounded-12',
    'font-heading font-semibold text-16 leading-24',
    'transition-colors cursor-pointer select-none',
    'focus-visible:outline-none',
    'min-w-[64px] max-w-[287px]',
  ],
  {
    variants: {
      variant: {
        Primary:   'bg-brick-blue-400   text-brick-grey-white',
        Secondary: 'bg-brick-grey-white text-brick-blue-500',
        Success:   'bg-success-green-400 text-brick-grey-white',
        Warning:   'bg-warning-yellow-400 text-brick-grey-black',
        Failure:   'bg-error-red-500    text-brick-grey-white',
        Info:      'bg-active-blue-500  text-brick-grey-white',
      },
      size: {
        Small:  'h-[44px] px-20 py-8',
        Medium: 'h-[48px] px-20 py-12',
        Large:  'h-[52px] px-20 py-16',
      },
      state: {
        Default:  '',
        Hover:    '',
        Pressed:  '',
        Loading:  '',
        Disabled: 'cursor-not-allowed pointer-events-none',
      },
    },
    // Each variant × state pair overrides the base background/border
    compoundVariants: [
      // ── Primary ──────────────────────────────────────────
      { variant: 'Primary', state: 'Default',  className: 'hover:bg-brick-blue-500 active:bg-brick-blue-600 active:border-2 active:border-brick-blue-800' },
      { variant: 'Primary', state: 'Hover',    className: 'bg-brick-blue-500' },
      { variant: 'Primary', state: 'Pressed',  className: 'bg-brick-blue-600 border-2 border-brick-blue-800' },
      { variant: 'Primary', state: 'Loading',  className: 'bg-brick-blue-400' },
      { variant: 'Primary', state: 'Disabled', className: 'bg-brick-grey-500 text-brick-grey-700' },
      // ── Secondary ────────────────────────────────────────
      { variant: 'Secondary', state: 'Default',  className: 'hover:bg-brick-blue-50 active:bg-brick-blue-100' },
      { variant: 'Secondary', state: 'Hover',    className: 'bg-brick-blue-50' },
      { variant: 'Secondary', state: 'Pressed',  className: 'bg-brick-blue-100' },
      { variant: 'Secondary', state: 'Loading',  className: 'bg-brick-grey-white' },
      { variant: 'Secondary', state: 'Disabled', className: 'bg-brick-grey-white text-brick-grey-600' },
      // ── Success ──────────────────────────────────────────
      { variant: 'Success', state: 'Default',  className: 'hover:bg-success-green-500 active:bg-success-green-600 active:border-2 active:border-success-green-800' },
      { variant: 'Success', state: 'Hover',    className: 'bg-success-green-500' },
      { variant: 'Success', state: 'Pressed',  className: 'bg-success-green-600 border-2 border-success-green-800' },
      { variant: 'Success', state: 'Loading',  className: 'bg-success-green-400' },
      { variant: 'Success', state: 'Disabled', className: 'bg-brick-grey-500 text-brick-grey-700' },
      // ── Warning ──────────────────────────────────────────
      { variant: 'Warning', state: 'Default',  className: 'hover:bg-warning-yellow-500 active:bg-warning-yellow-600 active:border-2 active:border-warning-yellow-800' },
      { variant: 'Warning', state: 'Hover',    className: 'bg-warning-yellow-500' },
      { variant: 'Warning', state: 'Pressed',  className: 'bg-warning-yellow-600 border-2 border-warning-yellow-800' },
      { variant: 'Warning', state: 'Loading',  className: 'bg-warning-yellow-400' },
      { variant: 'Warning', state: 'Disabled', className: 'bg-brick-grey-500 text-brick-grey-700' },
      // ── Failure ──────────────────────────────────────────
      { variant: 'Failure', state: 'Default',  className: 'hover:bg-error-red-600 active:bg-error-red-800 active:border-2 active:border-error-red-800' },
      { variant: 'Failure', state: 'Hover',    className: 'bg-error-red-600' },
      { variant: 'Failure', state: 'Pressed',  className: 'bg-error-red-800 border-2 border-error-red-800' },
      { variant: 'Failure', state: 'Loading',  className: 'bg-error-red-500' },
      { variant: 'Failure', state: 'Disabled', className: 'bg-brick-grey-500 text-brick-grey-700' },
      // ── Info ─────────────────────────────────────────────
      { variant: 'Info', state: 'Default',  className: 'hover:bg-active-blue-600 active:bg-active-blue-800 active:border-2 active:border-active-blue-800' },
      { variant: 'Info', state: 'Hover',    className: 'bg-active-blue-600' },
      { variant: 'Info', state: 'Pressed',  className: 'bg-active-blue-800 border-2 border-active-blue-800' },
      { variant: 'Info', state: 'Loading',  className: 'bg-active-blue-500' },
      { variant: 'Info', state: 'Disabled', className: 'bg-brick-grey-500 text-brick-grey-700' },
    ],
    defaultVariants: { variant: 'Primary', size: 'Small', state: 'Default' },
  }
);

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children'>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  withText?: boolean;
}

export function Button({
  variant = 'Primary',
  size = 'Small',
  state = 'Default',
  label = 'Button',
  showLeftIcon = true,
  showRightIcon = true,
  leftIcon,
  rightIcon,
  withText = true,
  className,
  ...props
}: ButtonProps) {
  const isLoading  = state === 'Loading';
  const isDisabled = state === 'Disabled';

  return (
    <button
      className={cn(buttonVariants({ variant, size, state }), className)}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="size-[20px] shrink-0 animate-spin" />
      ) : (
        showLeftIcon && (leftIcon ?? <Minus className="size-[20px] shrink-0" strokeWidth={2.5} />)
      )}

      {withText && <span className="truncate">{label}</span>}

      {!isLoading && showRightIcon && (
        rightIcon ?? <Plus className="size-[20px] shrink-0" strokeWidth={2.5} />
      )}
    </button>
  );
}
