
import fs from "fs-extra";
import { build } from "esbuild";
import pkg from "./package.json" with { type: "json" };

const name = pkg.name;
const version = pkg.version;

const baseConfig = {
  	entryPoints: ["src/index.js"],
  	bundle: true,
  	sourcemap: true,
};

await build({
	...baseConfig,
	format: "esm",
	outfile: `dist/${version}/library.esm.js`,
	banner: {
		js: `// ${name} v${version}`
	}
});

await build({
	...baseConfig,
	format: "iife",
	globalName: name,
	outfile: `dist/${version}/library.umd.js`,
	banner: {
		js: `// ${name} v${version}`
	}
});

await fs.copy(
  `dist/${version}`,
  `dist/latest`
);