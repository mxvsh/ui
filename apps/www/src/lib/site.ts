export const SITE_URL = 'https://ui.mxv.sh';
export const SITE_NAME = 'mxv/ui';
export const SITE_TITLE = 'mxv/ui — a small, opinionated React UI library';
export const SITE_DESCRIPTION =
  'Drop-in React components built on Tailwind v4 and radix-ui. One npm install, oklch tokens, no CLI, no registry, no boilerplate.';
export const SITE_KEYWORDS = [
  'react',
  'ui library',
  'component library',
  'tailwind',
  'tailwind v4',
  'radix-ui',
  'design system',
  'shadcn alternative',
  'typescript',
];
export const SITE_AUTHOR = 'mxvsh';
export const SITE_TWITTER = '@mxvsh';
export const SITE_REPO = 'https://github.com/mxvsh/mxvsh-ui';
export const NPM_PACKAGE = '@mxv/ui';
export const OG_IMAGE = `${SITE_URL}/og.png`;

export function absoluteUrl(path: string): string {
  if (!path.startsWith('/')) path = `/${path}`;
  return `${SITE_URL}${path}`;
}
