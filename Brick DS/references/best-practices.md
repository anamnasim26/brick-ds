# Best Practices — Brick Design System

## Component conventions

### File structure
Every component lives in its own folder:
```
src/components/{ComponentName}/
  {ComponentName}.tsx   — component + CVA variants
  index.ts              — re-exports
```

### Variant pattern
All components use `cva` from `class-variance-authority` and `cn` from `@/lib/utils`.
Never use raw `classnames` or string concatenation for conditional classes.

### Semantic HTML
| Use case          | Element                         |
|-------------------|---------------------------------|
| Clickable action  | `<button>`                      |
| Navigation link   | `<a href="...">`                |
| Text input        | `<input type="text">`           |
| Display container | `<div>` or `<section>`          |
| Icon-only button  | `<button aria-label="...">`     |

### Props API
- `variant` — visual style (`primary | secondary | ghost | danger`)
- `size` — sizing (`sm | md | lg`)
- Interactive states (hover, focus, active, disabled) → Tailwind pseudo-classes, NOT props
- `className` — always forwarded for composition
- `...props` — always spread for native HTML attribute pass-through

### Accessible patterns
- Focus ring on every interactive element:
  `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- Disabled state:
  `disabled:pointer-events-none disabled:opacity-50`
- Icon-only buttons must have `aria-label`

## Token rules (enforced by Token Police)
- **Never** use raw hex arbitrary values in the final component: `bg-[#3B82F6]` ❌
- **Never** use Tailwind named palette classes: `bg-blue-500`, `text-gray-900` ❌
- **Always** use shadcn semantic tokens: `bg-primary`, `text-muted-foreground` ✅
- Layout, spacing, and type-scale classes are exempt: `px-4`, `h-10`, `text-sm` ✅

## Naming conventions
- Component names: PascalCase (`Button`, `InputField`, `CardHeader`)
- Variant values: lowercase kebab (`primary`, `ghost`, `icon-only`)
- Cache files: match component name (`Button.md`, `InputField.md`)

## Import paths
```ts
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
```
