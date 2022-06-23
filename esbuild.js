import { dtsPlugin } from "esbuild-plugin-d.ts";
import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outdir: "dist",
    bundle: true,
    sourcemap: true,
    minify: true,
    splitting: true,
    format: "esm",
    target: ["esnext"],
    treeShaking: true,
    sourcesContent: false,
    plugins: [dtsPlugin()]
  })
  // eslint-disable-next-line no-undef
  .catch(() => process.exit(1));
