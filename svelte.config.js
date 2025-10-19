import adapter from "@jesterkit/exe-sveltekit";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			binaryName: "csvimg",
			// target: "linux-x64",
		}),
	},
};

export default config;
