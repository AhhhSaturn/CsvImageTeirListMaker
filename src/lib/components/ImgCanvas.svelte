<script lang="ts">
import { onMount } from "svelte";
import html2canvas from "html2canvas";

const {
	size,
	textSize,
	bg,
	fg,
	text,
}: {
	size: number;
	bg: string;
	fg: string;
	text: string;
	textSize: number;
} = $props();

onMount(async () => {
	const divElem = document.getElementById(text) as HTMLDivElement;
	const textElem = document.createElement("p");
	textElem.innerText = text;
	textElem.style.color = fg;
	divElem.style.aspectRatio = "1";
	divElem.style.width = `${size}px`;
	divElem.style.fontSize = `${textSize}px`;
	divElem.style.display = "grid";
	divElem.style.placeContent = "center";
	divElem.style.textAlign = "center";
	divElem.style.overflowWrap = "anywhere";
	divElem.style.backgroundColor = `${bg}`;
	divElem.appendChild(textElem);
});
</script>

<div class="w-[{size}px] h-[{size}px]" id={text}></div>
