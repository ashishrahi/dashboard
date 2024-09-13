import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'; // Optional: for minification

export default {
  input: 'src/index.tsx', // Your entry point
  output: {
    dir: 'output',
    format: 'esm', // or 'cjs', 'iife', etc.
  },
  plugins: [
    resolve(), // Resolves node modules
    commonjs(), // Converts CommonJS modules to ES6
    typescript(), // Transpiles TypeScript to JavaScript
    terser(), // Optional: minify the output
  ],
};
