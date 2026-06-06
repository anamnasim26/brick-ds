import StyleDictionary from 'style-dictionary';

// ─── Name mapping: token path → Tailwind v4 CSS var name ────────────────────

function toKebab(str) {
  return str.toLowerCase().replace(/\s+/g, '-');
}

function tailwindName(path) {
  const [category, ...rest] = path;

  if (category === 'Color') {
    // ['Color', 'Brand-Colors', 'Brick-Blue', '50'] → 'color-brick-blue-50'
    // ['Color', 'Expressive-Colors', 'Error-Red', '50'] → 'color-error-red-50'
    const [_group, colorName, scale] = rest;
    const name = toKebab(colorName);
    return scale !== undefined ? `color-${name}-${scale}` : `color-${name}`;
  }

  if (category === 'Typography') {
    const [subcat, key] = rest;
    if (subcat === 'Family') return `font-${toKebab(key)}`;
    if (subcat === 'Weight') return `font-weight-${key}`;
    if (subcat === 'Size') return `text-${key.replace('size-', '')}`;
    if (subcat === 'Line-Height') return `leading-${key.replace('line-height-', '')}`;
  }

  if (category === 'Sizing-Scale') {
    // '4-px' → 'spacing-4'
    const [val] = rest;
    return `spacing-${val.replace('-px', '')}`;
  }

  if (category === 'Corner-Radius') {
    const [val] = rest;
    return `radius-${val}`;
  }

  return path.map(toKebab).join('-');
}

// ─── Style Dictionary config ─────────────────────────────────────────────────

const sd = new StyleDictionary({
  source: ['tokens/Mode 1.tokens.json'],
  usesDtcg: true,

  hooks: {
    transforms: {
      // Figma exports color $value as an object { colorSpace, components, alpha, hex }
      // Extract the hex string so SD can process it as a normal color value.
      'color/figma-hex': {
        type: 'value',
        filter: token => token.$type === 'color',
        transform: token => {
          const v = token.$value;
          return typeof v === 'object' && v?.hex
            ? v.hex.toLowerCase()
            : String(v);
        },
      },

      // Add px units to all number tokens (spacing, radius, font-size, line-height)
      'number/px': {
        type: 'value',
        filter: token => token.$type === 'number',
        transform: token => `${token.$value}px`,
      },

      // Map the token path to a Tailwind v4 @theme CSS variable name
      'name/tailwind': {
        type: 'name',
        transform: token => tailwindName(token.path),
      },
    },
  },

  platforms: {
    css: {
      transforms: ['color/figma-hex', 'number/px', 'name/tailwind'],
      buildPath: 'src/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            selector: '@theme',
            outputReferences: false,
          },
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
console.log('✅ Tokens built → src/tokens.css');
