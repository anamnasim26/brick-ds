import { cva } from 'class-variance-authority';
import { type ComponentPropsWithoutRef } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

type AvatarSize = '24' | '32' | '40' | '56';
type AvatarState = 'Available' | 'Away' | 'Busy' | 'Offline';
type AvatarType = 'Image' | 'Initials' | 'Icon';

const containerVariants = cva(
  'relative flex items-center justify-center rounded-rounded shrink-0 border border-brick-grey-white',
  {
    variants: {
      size: {
        '24': 'size-24',
        '32': 'size-32',
        '40': 'size-40',
        '56': 'size-[56px]',
      },
      type: {
        Image: '',
        Initials: 'bg-brick-blue-50',
        Icon: 'bg-brick-blue-50',
      },
    },
  }
);

const statusDotVariants = cva(
  'absolute bottom-0 right-0 rounded-rounded border-2 border-brick-grey-white',
  {
    variants: {
      state: {
        Available: 'bg-success-green-500',
        Away: 'bg-warning-yellow-500',
        Busy: 'bg-error-red-500',
        Offline: 'bg-brick-grey-500',
      },
      size: {
        '24': 'size-[6px]',
        '32': 'size-[8px]',
        '40': 'size-[10px]',
        '56': 'size-[12px]',
      },
    },
  }
);

const initialsTextVariants = cva(
  'font-heading font-semibold text-brick-blue-500 text-center leading-none select-none',
  {
    variants: {
      size: {
        '24': 'text-12',
        '32': 'text-14',
        '40': 'text-16',
        '56': 'text-24',
      },
    },
  }
);

const iconSizeVariants = cva('text-brick-blue-500', {
  variants: {
    size: {
      '24': 'size-[14px]',
      '32': 'size-[16px]',
      '40': 'size-[20px]',
      '56': 'size-[28px]',
    },
  },
});

export interface AvatarProps extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  type?: AvatarType;
  size?: AvatarSize;
  state?: AvatarState;
  showStatus?: boolean;
  initials?: string;
  src?: string;
  alt?: string;
}

export function Avatar({
  type = 'Image',
  size = '40',
  state = 'Available',
  showStatus = true,
  initials = 'AN',
  src,
  alt = 'Avatar',
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(containerVariants({ size, type }), className)}
      role="img"
      aria-label={alt}
      {...props}
    >
      {/* Inner clip layer — only covers the avatar face, not the status dot */}
      <div className="absolute inset-0 rounded-rounded overflow-hidden flex items-center justify-center">
        {type === 'Image' && (
          src ? (
            <img src={src} alt={alt} className="size-full object-cover" />
          ) : (
            <div className="size-full bg-brick-blue-100 flex items-center justify-center">
              <User className={cn(iconSizeVariants({ size }), 'text-brick-blue-300')} />
            </div>
          )
        )}

        {type === 'Initials' && (
          <span className={initialsTextVariants({ size })}>{initials}</span>
        )}

        {type === 'Icon' && (
          <User className={iconSizeVariants({ size })} />
        )}
      </div>

      {showStatus && (
        <span
          className={statusDotVariants({ state, size })}
          aria-label={`Status: ${state}`}
        />
      )}
    </div>
  );
}
