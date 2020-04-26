import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import babel from 'rollup-plugin-babel';
import  { uglify } from 'rollup-plugin-uglify'
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import pkg  from './package.json'
module.exports = {
    input:'src/index.js',
    output:[
        {
            file: pkg.main,
            format: 'umd',
            sourcemap: true,
            name:"network"
        }
    ],
    global:{
        'axios':'axios',
        'qs':'Qs'
    },
    plugins: [
        babel({
            runtimeHelpers: true,

        }),
        // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
        commonjs(),
        // Allow node_modules resolution, so you can use 'external' to control
        // which external modules to include in the bundle
        // https://github.com/rollup/rollup-plugin-node-resolve#usage
        resolve(),

        // Resolve source maps to the original source
        sourceMaps(),
        json(),
        builtins()
    ],
}