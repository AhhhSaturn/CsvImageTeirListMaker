export const GET = () => {
	if (!Bun.env.SERVER_EDITION) {
		process.exit(0);
	}
};
