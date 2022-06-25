import typescript from "@rollup/plugin-typescript";
import commonjs from "rollup-plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import copy from "rollup-plugin-copy";

export default [
  {
    input: ["src/main.ts"],
    output: {
      dir: "dist",
      format: "iife",
      sourcemap: true,
    },
    plugins: [
      copy({
        targets: [
          { src: "index.html", dest: "dist" },
          { src: "logo.svg", dest: "dist" },
        ],
      }),
      nodeResolve({
        browser: true,
        preferBuiltins: true,
      }),
      commonjs(),
      typescript({ sourceMap: true }),
    ],
  },
];
