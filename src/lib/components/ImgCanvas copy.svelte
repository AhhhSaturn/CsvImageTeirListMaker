<script lang="ts">
import { onMount } from "svelte";

const {
	size,
	textSize,
	font,
	bg,
	fg,
	text,
}: {
	size: number;
	bg: string;
	fg: string;
	text: string;
	textSize: number;
	font: string;
} = $props();

onMount(async () => {
	const canvas = document.getElementById(text) as HTMLCanvasElement;
	const ctx = canvas?.getContext("2d");
	if (!canvas || !ctx) throw new Error();

	ctx.fillStyle = bg;
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.font = `${textSize}px ${font}`;

	ctx.fillStyle = fg;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width);
});
</script>

<canvas id={text} width={size} height={size} ></canvas>
