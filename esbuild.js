// import { dtsPlugin } from "esbuild-plugin-d.ts";
// import { nodeExternalsPlugin } from "esbuild-node-externals";
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
    plugins: [
      // nodeExternalsPlugin(),
      // dtsPlugin()
    ],
  })
  // eslint-disable-next-line no-undef
  .catch(() => process.exit(1));
