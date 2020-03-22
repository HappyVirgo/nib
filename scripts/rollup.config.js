import babel from 'rollup-plugin-babel';
import bundleSize from 'rollup-plugin-bundle-size';
import commonjs from 'rollup-plugin-commonjs';
import copy from 'rollup-plugin-copy';
import includePaths from 'rollup-plugin-includepaths';
import json from '@rollup/plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

const external = ['react', 'react-dom'];

const getCopyConf = packageName => ({
  targets: [
    {
      dest: `packages/${packageName}/build`,
      src: `packages/${packageName}/package.json`,
    },
  ],
  verbose: true,
});

const getConfig = packageName => {
  const copyConf = getCopyConf(packageName);
  if (packageName !== 'core') {
    // globals['nib-ui'] = 'nib-ui';
    globals['@emotion/core'] = '@emotion/core';
    globals['@emotion/styled'] = '@emotion/styled';
    globals['emotion-theming'] = 'emotion-theming';
    // external.push('nib-ui');
    external.push('@emotion/core');
    external.push('@emotion/styled');
    external.push('emotion-theming');
    copyConf.targets.push({
      dest: `packages/${packageName}/build`,
      src: `packages/${packageName}/readme.md`,
    });
  } else {
    copyConf.targets.push({
      dest: `packages/${packageName}/build`,
      src: 'readme.md',
    });
  }
  return {
    input: `packages/${packageName}/index.js`,
    output: {
      file: `packages/${packageName}/build/index.js`,
      format: 'umd',
      globals,
      name: packageName,
      sourceMap: true,
    },
    external,
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
      terser(),
      json(),
      bundleSize(),
      nodeResolve({
        browser: true,
      }),
      babel({
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: [
          [
            'emotion',
            {
              hoist: true,
            },
          ],
          [
            '@babel/plugin-proposal-class-properties',
            {
              loose: true,
            },
          ],
        ],
        exclude: 'node_modules/**',
      }),
      includePaths({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs({
        include: 'node_modules/**',
      }),
      copy(copyConf),
      sourcemaps(),
    ],
  };
};

export default args => {
  return getConfig(args.name);
};
