import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const boxVariants = cva(
  'relative flex items-center justify-center border-[1.5px] rounded-2 shrink-0 transition-colors select-none',
  {
    variants: {
      size: {
        '16': 'size-16',
        '20': 'size-20',
      },
      type: {
        Primary: '',
        Failure: '',
        Success: '',
        Warning: '',
        Info:    '',
      },
      state: {
        Default:  '',
        Hover:    '',
        Pressed:  '',
        Disabled: 'bg-brick-grey-200 border-brick-grey-500 text-brick-grey-500 cursor-not-allowed',
      },
    },
    compoundVariants: [
      // Primary
      { type: 'Primary', state: 'Default', className: 'border-brick-blue-500 text-brick-blue-500' },
      { type: 'Primary', state: 'Hover',   className: 'border-brick-blue-500 bg-brick-blue-50 text-brick-blue-500' },
      { type: 'Primary', state: 'Pressed', className: 'border-brick-blue-700 bg-brick-blue-100 text-brick-blue-700' },
      // Failure
      { type: 'Failure', state: 'Default', className: 'border-error-red-500 text-error-red-500' },
      { type: 'Failure', state: 'Hover',   className: 'border-error-red-500 bg-error-red-50 text-error-red-500' },
      { type: 'Failure', state: 'Pressed', className: 'border-error-red-700 bg-error-red-100 text-error-red-700' },
      // Success
      { type: 'Success', state: 'Default', className: 'border-success-green-500 text-success-green-500' },
      { type: 'Success', state: 'Hover',   className: 'border-success-green-500 bg-success-green-50 text-success-green-500' },
      { type: 'Success', state: 'Pressed', className: 'border-success-green-700 bg-success-green-100 text-success-green-700' },
      // Warning
      { type: 'Warning', state: 'Default', className: 'border-warning-yellow-500 text-warning-yellow-500' },
      { type: 'Warning', state: 'Hover',   className: 'border-warning-yellow-500 bg-warning-yellow-50 text-warning-yellow-500' },
      { type: 'Warning', state: 'Pressed', className: 'border-warning-yellow-700 bg-warning-yellow-100 text-warning-yellow-700' },
      // Info
      { type: 'Info', state: 'Default', className: 'border-active-blue-500 text-active-blue-500' },
      { type: 'Info', state: 'Hover',   className: 'border-active-blue-500 bg-active-blue-50 text-active-blue-500' },
      { type: 'Info', state: 'Pressed', className: 'border-active-blue-700 bg-active-blue-100 text-active-blue-700' },
    ],
    defaultVariants: { type: 'Primary', state: 'Default', size: '16' },
  }
);

function CheckIcon() {
  return (
    <svg viewBox="0 0 10 7" fill="none" className="w-full h-full">
      <path d="M1 3.5L3.5 6L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg viewBox="0 0 10 2" fill="none" className="w-full h-full">
      <path d="M1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export interface CheckboxBoxProps extends VariantProps<typeof boxVariants> {
  selection?: 'Unchecked' | 'Checked' | 'Indeterminate';
  className?: string;
}

export function CheckboxBox({
  type      = 'Primary',
  size      = '16',
  state     = 'Default',
  selection = 'Unchecked',
  className,
}: CheckboxBoxProps) {
  const hasIcon = selection === 'Checked' || selection === 'Indeterminate';

  return (
    <div className={cn(boxVariants({ type, size, state }), className)}>
      {hasIcon && (
        <span className="p-4 flex items-center justify-center w-full h-full">
          {selection === 'Checked'       ? <CheckIcon /> : <DashIcon />}
        </span>
      )}
    </div>
  );
}
