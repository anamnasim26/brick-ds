import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// tailwind-merge doesn't know about our custom text-size tokens defined in
// tokens.css (--text-12, --text-14, --text-16 …). Without this, it treats
// `text-14` as a colour class and drops it whenever it sees a colour like
// `text-brick-blue-500` in the same cn() call — causing every component to
// silently render at the browser default 16px instead of the design spec size.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        { text: ['12', '14', '16', '20', '24', '32', '40', '48', '60'] },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
