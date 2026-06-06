import { cn } from '@/lib/utils';
import { Button } from '@/components/Button';
import { Illustration, type IllustrationType } from './Illustration';

export interface EmptyStateProps {
  type?:               'Default' | 'Outlined';
  illustrationType?:   IllustrationType;
  showIllustration?:   boolean;
  showHeading?:        boolean;
  headingText?:        string;
  showHelperText?:     boolean;
  helperText?:         string;
  showActionButtons?:  boolean;
  primaryLabel?:       string;
  secondaryLabel?:     string;
  className?:          string;
}

export function EmptyState({
  type               = 'Default',
  illustrationType   = 'No Data',
  showIllustration   = true,
  showHeading        = true,
  headingText        = 'Welcome to the page',
  showHelperText     = true,
  helperText         = 'This page provides a place in your application to lay out information of your project, show the current status, and document things better, together.',
  showActionButtons  = true,
  primaryLabel       = 'Create the first page',
  secondaryLabel     = 'Learn more',
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center gap-24 p-24 rounded-24 bg-brick-grey-200',
      'min-w-[420px] max-w-[600px] w-[600px]',
      type === 'Outlined' && 'border-[1.5px] border-brick-blue-500',
      className,
    )}>
      {showIllustration && <Illustration type={illustrationType} />}

      {(showHeading || showHelperText) && (
        <div className="flex flex-col gap-8 items-start w-full text-center">
          {showHeading && (
            <p className="text-24 font-semibold font-heading leading-32 text-brick-grey-black w-full">
              {headingText}
            </p>
          )}
          {showHelperText && (
            <p className="text-16 font-normal font-heading leading-24 text-brick-grey-black w-full">
              {helperText}
            </p>
          )}
        </div>
      )}

      {showActionButtons && (
        <div className="flex gap-12 items-center justify-center">
          <Button
            variant="Primary"
            size="Small"
            state="Default"
            label={primaryLabel}
            showLeftIcon={false}
            showRightIcon={false}
            withText
          />
          <Button
            variant="Secondary"
            size="Small"
            state="Default"
            label={secondaryLabel}
            showLeftIcon={false}
            showRightIcon={false}
            withText
          />
        </div>
      )}
    </div>
  );
}
