import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-4 px-8 py-4 rounded-4 border border-solid text-12 font-body font-normal leading-16 max-w-[120px] min-w-[41px]',
  {
    variants: {
      type: {
        Primary: 'bg-brick-blue-50 border-brick-blue-500 text-brick-blue-500',
        Success: 'bg-success-green-50 border-success-green-500 text-success-green-500',
        Failure: 'bg-error-red-50 border-error-red-500 text-error-red-500',
        Warning: 'bg-warning-yellow-50 border-warning-yellow-700 text-warning-yellow-700',
        Info:    'bg-active-blue-50 border-active-blue-700 text-active-blue-700',
      },
    },
    defaultVariants: { type: 'Primary' },
  }
);

export interface BadgeProps
  extends Omit<ComponentPropsWithoutRef<'span'>, 'children'>,
    VariantProps<typeof badgeVariants> {
  text?: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export function Badge({
  type = 'Primary',
  text = 'Badge',
  showLeftIcon = true,
  showRightIcon = true,
  leftIcon,
  rightIcon,
  className,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ type }), className)} {...props}>
      {showLeftIcon && (
        leftIcon ?? <Minus className="size-[12px] shrink-0" strokeWidth={2.5} />
      )}
      <span className="text-center">
        {text}
      </span>
      {showRightIcon && (
        rightIcon ?? <Plus className="size-[12px] shrink-0" strokeWidth={2.5} />
      )}
    </span>
  );
}
