import path from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-webpack5';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    {
      name: '@storybook/addon-react-native-web',
      options: {
        // nativewind/babel is a preset (returns { plugins: [...] }) — it
        // must go in babelPresets so NativeWind's cssInterop transform
        // runs on web and className is applied as real CSS classes.
        babelPresets: ['nativewind/babel'],
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  webpackFinal: async webpackConfig => {
    // Module path aliases — mirrors babel.config.js module-resolver
    if (webpackConfig.resolve) {
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@features': path.resolve(__dirname, '../src/features'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@navigation': path.resolve(__dirname, '../src/navigation'),
        '@store': path.resolve(__dirname, '../src/store'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@utils': path.resolve(__dirname, '../src/utils'),
        '@types': path.resolve(__dirname, '../src/types'),
        '@constants': path.resolve(__dirname, '../src/constants'),
        '@assets': path.resolve(__dirname, '../src/assets'),
        // Stub test-only packages so __tests__ files compile without errors
        '@testing-library/react-native': path.resolve(
          __dirname,
          'mocks/empty.js',
        ),
        'react-test-renderer': path.resolve(__dirname, 'mocks/empty.js'),
      };

      // Prefer .web.* extensions so RN-Web overrides are picked up first
      webpackConfig.resolve.extensions = [
        '.web.tsx',
        '.web.ts',
        '.web.js',
        ...(webpackConfig.resolve.extensions ?? []),
      ];
    }

    // Add explicit PostCSS pipeline so @tailwind directives in global.css
    // are expanded into real utility classes. Storybook's implicit CSS loaders
    // do NOT run PostCSS, so without this the Tailwind classes are never
    // generated and components appear unstyled.
    // First, remove any implicit CSS rule Storybook may have added so we
    // don't double-process the same .css files.
    if (webpackConfig.module?.rules) {
      type RuleLike = {
        test?: { toString: () => string } | RegExp;
        use?: unknown;
      };
      webpackConfig.module.rules = (
        webpackConfig.module.rules as unknown[]
      ).filter((rule: unknown) => {
        const r = rule as RuleLike;
        const isCss = !!(r.test && r.test.toString().includes('.css'));
        const hasCssLoader =
          Array.isArray(r.use) &&
          (r.use as unknown[]).some(
            u => typeof u === 'string' && u.includes('css-loader'),
          );
        return !isCss && !hasCssLoader;
      });
    }

    webpackConfig.module?.rules?.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        // postcss-loader auto-discovers postcss.config.js at project root,
        // which runs tailwindcss + autoprefixer to expand @tailwind directives.
        'postcss-loader',
      ],
      include: path.resolve(__dirname, '..'),
    });

    return webpackConfig;
  },
};

export default config;
