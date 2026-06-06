import { cva, type VariantProps } from 'class-variance-authority';
import { Info, X } from 'lucide-react';
import { type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

// Audited by Token Police — all colour classes reference design system tokens from src/tokens.css

// ─── Variant map ──────────────────────────────────────────────────────────────

const alertVariants = cva(
  [
    'flex items-start gap-8 p-16 w-full max-w-[640px] min-w-[320px]',
    'border border-solid rounded-12',
  ],
  {
    variants: {
      variant: {
        general: 'bg-brick-blue-50 border-brick-blue-500',
        success: 'bg-success-green-50 border-success-green-500',
        warning: 'bg-warning-yellow-50 border-warning-yellow-700',
        failure: 'bg-error-red-50 border-error-red-500',
        info:    'bg-active-blue-50 border-active-blue-700',
      },
    },
    defaultVariants: { variant: 'general' },
  },
);

const iconVariants = cva('size-6 shrink-0', {
  variants: {
    variant: {
      general: 'text-brick-blue-500',
      success: 'text-success-green-500',
      warning: 'text-warning-yellow-700',
      failure: 'text-error-red-500',
      info:    'text-active-blue-700',
    },
  },
  defaultVariants: { variant: 'general' },
});

const primaryButtonVariants = cva(
  [
    'inline-flex items-center justify-center px-20 py-8 h-[44px] rounded-12',
    'font-heading font-semibold text-16 leading-24 whitespace-nowrap',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'transition-opacity hover:opacity-90',
  ],
  {
    variants: {
      variant: {
        general: 'bg-brick-blue-400 text-brick-grey-white focus-visible:ring-brick-blue-500',
        success: 'bg-success-green-400 text-brick-grey-white focus-visible:ring-success-green-500',
        warning: 'bg-warning-yellow-400 text-brick-grey-black focus-visible:ring-warning-yellow-700',
        failure: 'bg-error-red-500 text-brick-grey-white focus-visible:ring-error-red-500',
        info:    'bg-active-blue-500 text-brick-grey-white focus-visible:ring-active-blue-700',
      },
    },
    defaultVariants: { variant: 'general' },
  },
);

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AlertProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'title'>,
    VariantProps<typeof alertVariants> {
  heading?: string;
  supportingText?: string;
  showSupportingText?: boolean;
  showActions?: boolean;
  showCloseIcon?: boolean;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onClose?: () => void;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Alert({
  variant = 'general',
  heading = 'Alert message goes here.',
  supportingText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.',
  showSupportingText = true,
  showActions = true,
  showCloseIcon = true,
  primaryActionLabel = 'Button',
  secondaryActionLabel = 'Button',
  onClose,
  onPrimaryAction,
  onSecondaryAction,
  className,
  ...props
}: AlertProps) {
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {/* Status icon */}
      <Info className={cn(iconVariants({ variant }))} aria-hidden="true" />

      {/* Body */}
      <div className="flex flex-col gap-16 flex-1 min-w-0">

        {/* Text block */}
        <div className="flex flex-col gap-8">
          <p className="font-heading font-semibold text-16 leading-20 text-brick-grey-black truncate">
            {heading}
          </p>
          {showSupportingText && (
            <p className="font-heading text-16 leading-24 text-brick-grey-black">
              {supportingText}
            </p>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-16">
            <button
              className={cn(primaryButtonVariants({ variant }))}
              onClick={onPrimaryAction}
            >
              {primaryActionLabel}
            </button>
            <button
              className="inline-flex items-center justify-center px-20 py-8 h-[44px] rounded-12 bg-brick-grey-white text-brick-blue-500 font-heading font-semibold text-16 leading-24 whitespace-nowrap transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brick-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </button>
          </div>
        )}
      </div>

      {/* Close button */}
      {showCloseIcon && (
        <button
          className={cn(
            iconVariants({ variant }),
            'rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-current',
          )}
          onClick={onClose}
          aria-label="Close alert"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
