/* eslint-disable import/no-anonymous-default-export */
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import commonjs from 'rollup-plugin-commonjs';

export default {
	input: './src/package/index.js',
	output: {
		file: 'lib/index.js',
		format: 'cjs',
	},
	external: ['react', 'react-dom'],
	plugins: [
		replace({ 'process.env.NODE_ENV': `"production"`, preventAssignment: true }),
		resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
		babel({
			babelrc: true,
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			exclude: 'node_modules/**',
		}),
		terser(),
		commonjs({
			namedExports: {
				'lodash.isempty': ['isValidElementType'],
				react: Object.keys(require('react')),
				'react-is': Object.keys(require('react-is')),
			},
		}),
	],
};

/* export default {
	input: './src/package/index.js',
	output: {
		file: 'lib/index.js',
		format: 'cjs',
	},
	external: ['react', 'react-dom'],
	plugins: [
		resolve({ extensions: ['.jsx', '.js', '.tsx'] }),
		babel({
			extensions: ['.jsx', '.js', '.tsx'],
			exclude: 'node_modules/**',
			presets: ['@babel/env', '@babel/preset-react'],
			plugins: ['babel-plugin-styled-components', '@babel/plugin-syntax-jsx'],
		}),
		commonjs({
			ignoreGlobal: true,
			include: /\/node_modules\//,
			namedExports: {
				react: Object.keys(require('react')),
				'react-is': Object.keys(require('react-is')),
			},
		}),
		generatePackageJson({
			outputFolder: 'lib',
			baseContents: (pkg) => ({
				name: pkg.name,
				main: 'index.js',
				peerDependencies: {
					react: '>=16.8.0',
					'react-dom': '>=16.8.0',
				},
			}),
		}),
	],
};
 */
