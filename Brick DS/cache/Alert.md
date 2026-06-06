# Alert — Component Cache
**Built:** 2026-06-06
**Figma source:** https://www.figma.com/design/VBYwAGNFNHpEFc8a8RivIY/Assignment-6--10-components?node-id=7-1453
**Workflow:** A — Unorganised → Full Build

## Variant Properties
| Property           | Values                                          |
|--------------------|-------------------------------------------------|
| variant            | general, success, warning, failure, info        |
| showSupportingText | boolean (default: true)                         |
| showActions        | boolean (default: true)                         |
| showCloseIcon      | boolean (default: true)                         |
| primaryActionLabel | string (default: "Button")                      |
| secondaryActionLabel | string (default: "Button")                    |

## Tailwind Tokens Applied
| Context                          | Tailwind Class                                         |
|----------------------------------|--------------------------------------------------------|
| general — background             | `bg-brick-blue-50`                                     |
| general — border                 | `border-brick-blue-500`                                |
| general — icon + close           | `text-brick-blue-500`                                  |
| general — primary button         | `bg-brick-blue-400 text-brick-grey-white`              |
| success — background             | `bg-success-green-50`                                  |
| success — border                 | `border-success-green-500`                             |
| success — icon + close           | `text-success-green-500`                               |
| success — primary button         | `bg-success-green-400 text-brick-grey-white`           |
| warning — background             | `bg-warning-yellow-50`                                 |
| warning — border                 | `border-warning-yellow-700`                            |
| warning — icon + close           | `text-warning-yellow-700`                              |
| warning — primary button         | `bg-warning-yellow-400 text-brick-grey-black`          |
| failure — background             | `bg-error-red-50`                                      |
| failure — border                 | `border-error-red-500`                                 |
| failure — icon + close           | `text-error-red-500`                                   |
| failure — primary button         | `bg-error-red-500 text-brick-grey-white`               |
| info — background                | `bg-active-blue-50`                                    |
| info — border                    | `border-active-blue-700`                               |
| info — icon + close              | `text-active-blue-700`                                 |
| info — primary button            | `bg-active-blue-500 text-brick-grey-white`             |
| secondary button (all variants)  | `bg-brick-grey-white text-brick-blue-500`              |
| body text (all variants)         | `text-brick-grey-black`                                |
| layout                           | `gap-8 p-16 rounded-12 gap-16 gap-8 px-20 py-8`       |

## Token Police Audit
- ✅ 20/20 colour classes use correct design system tokens
- ℹ️ All colours confirmed in `tokens/Mode 1.tokens.json` and output to `src/tokens.css`
- 🔧 Icons: replaced expiring Figma image URLs with `lucide-react` `Info` + `X` — more maintainable
- 💡 Warning primary button uses `text-brick-grey-black` (dark text on yellow) — correct per design

## Files Written
- `src/components/Alert/Alert.tsx`
- `src/components/Alert/index.ts`
- `cache/Alert.md`

## Notes
- Icon colours inherit from the variant via `iconVariants` CVA — close button uses same variant colour
- Secondary button is always `bg-brick-grey-white text-brick-blue-500` regardless of variant
- `role="alert"` applied to container for accessibility
- Close button has `aria-label="Close alert"`
- Font family uses `font-heading` (maps to `--font-heading: Instrument Sans` from our tokens)
- Spacing classes (`gap-8`, `p-16`, `px-20`, `rounded-12`) use our token scale, not Tailwind defaults
