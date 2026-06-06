# Badge Component Cache

## Figma Source
- File: `VBYwAGNFNHpEFc8a8RivIY`
- Node: `9:2895`

## Variants
- `type`: `Primary` | `Success` | `Failure` | `Warning` | `Info`
- `text`: string (default "Badge")
- `showLeftIcon`: boolean (default true)
- `showRightIcon`: boolean (default true)
- `leftIcon`: ReactNode (custom override for left icon)
- `rightIcon`: ReactNode (custom override for right icon)

## Tokens Used
| Token class | Value | Used for |
|---|---|---|
| `bg-brick-blue-50` / `border-brick-blue-500` / `text-brick-blue-500` | #eaeef1 / #425563 | Primary |
| `bg-success-green-50` / `border-success-green-500` / `text-success-green-500` | #dafbe1 / #1a7f37 | Success |
| `bg-error-red-50` / `border-error-red-500` / `text-error-red-500` | #ffebe9 / #cf222e | Failure |
| `bg-warning-yellow-50` / `border-warning-yellow-700` / `text-warning-yellow-700` | #fef9e6 / #ad8a00 | Warning |
| `bg-active-blue-50` / `border-active-blue-700` / `text-active-blue-700` | #e7f3ff / #0963b5 | Info |
| `rounded-4` | 4px | Border radius |
| `px-8 py-4 h-24` | 8/4/24px | Sizing |
| `text-12 leading-16` | 12/16px | Typography (B3/Regular) |

## Files Written
- `src/components/Badge/Badge.tsx`
- `src/components/Badge/index.ts`
- `src/pages/components/BadgePage.tsx`

## Files Updated
- `src/pages/components/ComponentsLayout.tsx` — removed "Soon" badge from Badge nav item
- `src/App.tsx` — added `/components/badge` route

## Token Police Audit
All colour classes use design tokens. Icons replaced with `lucide-react` `Minus` and `Plus` (replacing expiring Figma mask images).

## Notes
- `leftIcon` / `rightIcon` props accept any ReactNode for custom icon override
- Text truncates with ellipsis at `max-w-[120px]`
- Icon size is 12px (slightly smaller than 16px Figma container — lucide stroke weight makes them visually equivalent)
