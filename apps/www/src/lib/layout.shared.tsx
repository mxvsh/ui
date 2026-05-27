import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName, gitConfig } from './shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: appName,
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
    links: [
      {
        text: 'Get started',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Theming',
        url: '/docs/theming',
        active: 'nested-url',
      },
      {
        text: 'Components',
        url: '/docs/components/button',
        active: 'nested-url',
      },
    ],
  };
}
