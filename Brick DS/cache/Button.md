# Button Component Cache

## Figma Source
- File: `VBYwAGNFNHpEFc8a8RivIY`
- Node: `5:63`

## Variants
- `variant`: `Primary` | `Secondary` | `Success` | `Warning` | `Failure` | `Info`
- `size`: `Small` (44px) | `Medium` (48px) | `Large` (52px)
- `label`: string (default "Button")
- `showLeftIcon` / `showRightIcon`: boolean (default true)
- `leftIcon` / `rightIcon`: ReactNode (custom icon override)
- `withText`: boolean (default true — false for icon-only)
- `loading`: boolean — shows Loader2 spinner, disables button
- `disabled`: boolean — applies disabled styles

## Tokens Used
| Variant | Default bg | Hover bg | Active bg | Text | Disabled bg |
|---|---|---|---|---|---|
| Primary | brick-blue-400 | brick-blue-500 | brick-blue-600 | white | brick-grey-500 / text-brick-grey-700 |
| Secondary | brick-grey-white + border-brick-blue-500 | brick-blue-50 | brick-blue-100 | brick-blue-500 | border-brick-grey-500 / text-brick-grey-600 |
| Success | success-green-400 | success-green-500 | success-green-600 | white | brick-grey-500 |
| Warning | warning-yellow-400 | warning-yellow-500 | warning-yellow-600 | brick-grey-black | brick-grey-500 |
| Failure | error-red-500 | error-red-600 | error-red-800 | white | brick-grey-500 |
| Info | active-blue-500 | active-blue-600 | active-blue-800 | white | brick-grey-500 |

## Sizing
| Size | Height | px | py | gap |
|---|---|---|---|---|
| Small | 44px | px-20 | py-8 | gap-8 |
| Medium | 48px | px-20 | py-12 | gap-8 |
| Large | 52px | px-20 | py-16 | gap-8 |

Common: `rounded-12`, `min-w-[64px]`, `max-w-[287px]`
Typography: `text-16 font-semibold font-heading leading-24`

## Files Written
- `src/components/Button/Button.tsx`
- `src/components/Button/index.ts`
- `src/pages/components/ButtonPage.tsx`

## Files Updated
- `src/pages/components/ComponentsLayout.tsx` — removed "Soon" from Button
- `src/App.tsx` — added `/components/button` route

## Token Police Audit
All colour classes use design tokens. Icons from `lucide-react` (Minus, Plus, Loader2).

## Notes
- `loading` disables the button and replaces icons with an animated `Loader2` spinner
- `withText=false` gives an icon-only button
- Secondary variant uses `border border-brick-blue-500` for its outline appearance
- Warning uses `text-brick-grey-black` (#000) for contrast on yellow background
