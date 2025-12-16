/**
 * Theme TypeScript types for Pokemon Collection App
 */

export type Theme = 'light' | 'dark' | 'auto';
export type PresetTheme = 'aura' | 'lara' | 'material' | 'nora';
export type ThemeColor = 'emerald' | 'green' | 'lime' | 'red' | 'orange' | 'amber' | 'yellow' | 'teal' | 'cyan' | 'sky' | 'blue' | 'indigo' | 'violet' | 'purple' | 'fuchsia' | 'pink' | 'rose' | 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone';
export type FontFamily = 'inter' | 'roboto' | 'montserrat' | 'raleway' | 'source-sans-pro' | 'oswald' | 'merriweather' | 'playfair-display' | 'lora' | 'crimson-text' | 'bebas-neue' | 'jetbrains-mono' | 'system';

/**
 * Theme color options for UI theming
 */
export const THEME_COLORS: Record<ThemeColor, { name: string; icon: string; description: string }> = {
  emerald: { name: 'Emerald', icon: 'pi-circle-fill', description: 'Fresh and natural' },
  green: { name: 'Green', icon: 'pi-circle-fill', description: 'Balanced and calm' },
  lime: { name: 'Lime', icon: 'pi-circle-fill', description: 'Bright and fresh' },
  red: { name: 'Red', icon: 'pi-circle-fill', description: 'Bold and powerful' },
  orange: { name: 'Orange', icon: 'pi-circle-fill', description: 'Energetic and vibrant' },
  amber: { name: 'Amber', icon: 'pi-circle-fill', description: 'Warm and golden' },
  yellow: { name: 'Yellow', icon: 'pi-circle-fill', description: 'Bright and cheerful' },
  teal: { name: 'Teal', icon: 'pi-circle-fill', description: 'Sophisticated and calm' },
  cyan: { name: 'Cyan', icon: 'pi-circle-fill', description: 'Cool and modern' },
  sky: { name: 'Sky', icon: 'pi-circle-fill', description: 'Light and airy' },
  blue: { name: 'Blue', icon: 'pi-circle-fill', description: 'Classic and professional' },
  indigo: { name: 'Indigo', icon: 'pi-circle-fill', description: 'Deep and sophisticated' },
  violet: { name: 'Violet', icon: 'pi-circle-fill', description: 'Rich and elegant' },
  purple: { name: 'Purple', icon: 'pi-circle-fill', description: 'Creative and modern' },
  fuchsia: { name: 'Fuchsia', icon: 'pi-circle-fill', description: 'Vibrant and bold' },
  pink: { name: 'Pink', icon: 'pi-circle-fill', description: 'Playful and fun' },
  rose: { name: 'Rose', icon: 'pi-circle-fill', description: 'Warm and inviting' },
  slate: { name: 'Slate', icon: 'pi-circle-fill', description: 'Cool and neutral' },
  gray: { name: 'Gray', icon: 'pi-circle-fill', description: 'Balanced neutral' },
  zinc: { name: 'Zinc', icon: 'pi-circle-fill', description: 'Modern neutral' },
  neutral: { name: 'Neutral', icon: 'pi-circle-fill', description: 'True neutral' },
  stone: { name: 'Stone', icon: 'pi-circle-fill', description: 'Warm neutral' },
} as const;

/**
 * Font family options for typography theming
 */
export const FONT_FAMILIES: Record<FontFamily, {
  name: string;
  value: string;
  icon: string;
  description: string;
  preview: string;
}> = {
  'inter': {
    name: 'Inter',
    value: 'Inter',
    icon: 'pi-align-left',
    description: 'Clean sans-serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'roboto': {
    name: 'Roboto',
    value: 'Roboto',
    icon: 'pi-android',
    description: 'Material Design',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'montserrat': {
    name: 'Montserrat',
    value: 'Montserrat',
    icon: 'pi-building',
    description: 'Geometric sans',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'raleway': {
    name: 'Raleway',
    value: 'Raleway',
    icon: 'pi-circle',
    description: 'Elegant sans',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'source-sans-pro': {
    name: 'Source Sans Pro',
    value: '"Source Sans Pro"',
    icon: 'pi-box',
    description: 'Humanist sans',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'oswald': {
    name: 'Oswald',
    value: 'Oswald',
    icon: 'pi-bars',
    description: 'Condensed bold',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'merriweather': {
    name: 'Merriweather',
    value: 'Merriweather',
    icon: 'pi-book',
    description: 'Classic serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'playfair-display': {
    name: 'Playfair Display',
    value: '"Playfair Display"',
    icon: 'pi-crown',
    description: 'Elegant serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'lora': {
    name: 'Lora',
    value: 'Lora',
    icon: 'pi-pencil',
    description: 'Readable serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'crimson-text': {
    name: 'Crimson Text',
    value: '"Crimson Text"',
    icon: 'pi-file',
    description: 'Traditional serif',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
  'bebas-neue': {
    name: 'Bebas Neue',
    value: '"Bebas Neue"',
    icon: 'pi-bolt',
    description: 'Bold display',
    preview: 'THE QUICK BROWN FOX'
  },
  'jetbrains-mono': {
    name: 'JetBrains Mono',
    value: '"JetBrains Mono"',
    icon: 'pi-code',
    description: 'Monospace code',
    preview: 'The quick brown fox 0O1l'
  },
  'system': {
    name: 'System Default',
    value: 'system-ui',
    icon: 'pi-desktop',
    description: 'Use system font',
    preview: 'The quick brown fox jumps over the lazy dog'
  },
} as const;
