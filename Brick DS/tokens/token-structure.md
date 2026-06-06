# Token Structure — 3-Tier Hierarchy

## Tier 1: Primitive tokens
Raw values — never used directly in components.
Defined as CSS custom properties in `src/index.css`.

## Tier 2: Semantic tokens
Named by purpose, not value. These are the tokens components reference.
Mapped via shadcn's CSS variable convention using HSL channels.

| Token             | CSS Variable            | Purpose                          |
|-------------------|-------------------------|----------------------------------|
| background        | --background            | Page / app background            |
| foreground        | --foreground            | Default body text                |
| primary           | --primary               | Primary action fill              |
| primary-foreground| --primary-foreground    | Text on primary fill             |
| secondary         | --secondary             | Secondary action fill            |
| secondary-foreground | --secondary-foreground | Text on secondary fill         |
| muted             | --muted                 | Subtle background                |
| muted-foreground  | --muted-foreground      | Subdued text                     |
| accent            | --accent                | Hover / highlight state          |
| accent-foreground | --accent-foreground     | Text on accent                   |
| destructive       | --destructive           | Error / danger fill              |
| destructive-foreground | --destructive-foreground | Text on destructive          |
| card              | --card                  | Card surface                     |
| card-foreground   | --card-foreground       | Text on card                     |
| popover           | --popover               | Popover / dropdown surface       |
| popover-foreground| --popover-foreground    | Text on popover                  |
| border            | --border                | Default border                   |
| input             | --input                 | Form input border                |
| ring              | --ring                  | Focus ring colour                |

## Tier 3: Component tokens
Scoped overrides for individual components. Added to `tailwind.config.js` when a
component needs a colour not covered by Tier 2. Prefix with the component name:
e.g. `--badge-new-background`, `--nav-active-indicator`.

## Tailwind mapping convention
Tailwind classes reference CSS variables via the `hsl()` function in `tailwind.config.js`:
```js
primary: 'hsl(var(--primary))',
```
Components use semantic class names: `bg-primary`, `text-primary-foreground`, etc.
