# Avatar Component Cache

## Figma Source
- File: `VBYwAGNFNHpEFc8a8RivIY`
- Node: `9:610`

## Variants
- `type`: `Image` | `Initials` | `Icon`
- `size`: `'24'` | `'32'` | `'40'` | `'56'` (numeric string, rendered as px)
- `state`: `Available` | `Away` | `Busy` | `Offline`
- `showStatus`: boolean (default true)
- `initials`: string (default "AN", Initials type only)
- `src`: string (optional, Image type)

## Tokens Used
| Token class | Value |
|---|---|
| `bg-brick-blue-50` | #eaeef1 — avatar background (Initials/Icon) |
| `border-brick-grey-white` | #ffffff — avatar ring border |
| `text-brick-blue-500` | #425563 — initials & icon color |
| `bg-success-green-500` | #1a7f37 — Available dot |
| `bg-warning-yellow-500` | #f3c200 — Away dot |
| `bg-error-red-500` | #cf222e — Busy dot |
| `bg-brick-grey-500` | #bfbfbf — Offline dot |
| `rounded-rounded` | 9999px — fully circular |
| `text-12/14/16/24` | size scale by avatar size |

## Status Dot Sizes
| Avatar | Dot |
|---|---|
| 24px | 6px |
| 32px | 8px |
| 40px | 10px |
| 56px | 12px |

## Files Written
- `src/components/Avatar/Avatar.tsx`
- `src/components/Avatar/index.ts`
- `src/pages/components/AvatarPage.tsx`

## Files Updated
- `src/pages/components/ComponentsLayout.tsx` — removed "Soon" badge from Avatar
- `src/App.tsx` — added `/components/avatar` route

## Token Police Audit
All colour classes map to design tokens. No raw hex values used. Icon rendered with `lucide-react` `User` to avoid expiring Figma image URLs.

## Notes
- Image type with no `src` shows a placeholder (brick-blue-100 bg + User icon in brick-blue-300)
- Status dot uses `border-2 border-brick-grey-white` ring to lift off the avatar edge
- `size-24 / size-32 / size-40` resolve correctly via `--spacing-N` token overrides in Tailwind v4
- `size-[56px]` uses arbitrary value — no spacing-56 token defined
