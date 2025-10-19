<script lang="ts">
import ImgCanvas from "$lib/components/ImgCanvas.svelte";
import * as InputGroup from "$lib/components/ui/input-group/index.js";
import * as Card from "$lib/components/ui/card/index.js";
import TextIcon from "@lucide/svelte/icons/a-large-small";
import BracketsIcon from "@lucide/svelte/icons/brackets";
import BgIcon from "@lucide/svelte/icons/paint-roller";
import FgIcon from "@lucide/svelte/icons/brush";
import SizeIcon from "@lucide/svelte/icons/maximize";
import FileIcon from "@lucide/svelte/icons/file-text";
import Button, {
	buttonVariants,
} from "$lib/components/ui/button/button.svelte";
import html2canvas from "html2canvas";
import JSZip from "jszip";
import FileSaver from "file-saver";

let fg = $state("#000000");
let bg = $state("#dce0e6");
let size = $state(200);
let textSize = $state(40);
let words = $state("");
let wordsArray: string[] = $state([]);

const readFile = async (
	event: Event & { currentTarget: EventTarget & HTMLInputElement },
) => {
	if (!event.target) return;
	const file = event.target.files.item(0);
	words = await file.text();
};

const generate = () => {
	wordsArray.push(...words.replaceAll(", ", ",").split(","));
	const zip = new JSZip();
	const promises = [];
	for (const word of wordsArray) {
		const html = genImg(word);
		document.getElementById("imgContainer")?.appendChild(html);

		promises.push(
			new Promise<void>((resolve) => {
				html2canvas(html).then((canvas) => {
					canvas.toBlob((blob) => {
						console.log(blob);
						const reader = new FileReader();
						reader.readAsDataURL(blob);
						reader.onloadend = () => {
							zip.file(`${word}.png`, reader.result.split(",")[1], {
								base64: true,
							});
							resolve();
						};
					});
				});
			}),
		);
	}

	Promise.all(promises).then(() => {
		zip.generateAsync({ type: "blob" }).then((img) => {
			FileSaver.saveAs(img, "images.zip");
		});
	});
};

const genImg = (text: string) => {
	const divElem = document.createElement("div");
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

	return divElem;
};
</script>

<div class="flex justify-center mt-10">
<Card.Root class="w-1/2 h-fit">
    <Card.Header>
        <Card.Title>Configuration</Card.Title>
    </Card.Header>
    <Card.Content class="[&>div]:mb-2">
        <InputGroup.Root>
            <InputGroup.Input bind:value={textSize} placeholder="Font Size" />
            <InputGroup.Addon>
            <TextIcon />
            </InputGroup.Addon>
            <InputGroup.Addon align="inline-end">
            <InputGroup.Text><i>px</i></InputGroup.Text>
            </InputGroup.Addon>
        </InputGroup.Root>
        <InputGroup.Root>
            <InputGroup.Input bind:value={size} placeholder="Image Size" />
            <InputGroup.Addon>
            <SizeIcon />
            </InputGroup.Addon>
            <InputGroup.Addon align="inline-end">
            <InputGroup.Text><i>px</i></InputGroup.Text>
            </InputGroup.Addon>
        </InputGroup.Root>
        <InputGroup.Root>
            <InputGroup.Input class="outline-none" bind:value={bg} type="color" />
            <InputGroup.Addon>
            <BgIcon />
            </InputGroup.Addon>
            <InputGroup.Addon align="inline-start">
            <InputGroup.Text><i>Background</i></InputGroup.Text>
            </InputGroup.Addon>
        </InputGroup.Root>
        <InputGroup.Root>
            <InputGroup.Input bind:value={fg} type="color" />
            <InputGroup.Addon>
            <FgIcon />
            </InputGroup.Addon>
            <InputGroup.Addon align="inline-start">
            <InputGroup.Text><i>Foreground</i></InputGroup.Text>
            </InputGroup.Addon>
        </InputGroup.Root>
        <div class="flex flex-row gap-4">
        <InputGroup.Root>
            <InputGroup.Input bind:value={words} placeholder="Words" />
            <InputGroup.Addon>
            <BracketsIcon />
            </InputGroup.Addon>
            <InputGroup.Addon align="inline-end">
            <InputGroup.Text><i>comma seperated</i></InputGroup.Text>
            </InputGroup.Addon>
        </InputGroup.Root>
        <InputGroup.Root>
            <InputGroup.Input onchange={readFile} type="file" />
            <InputGroup.Addon>
            <FileIcon />
            </InputGroup.Addon>
            <InputGroup.Addon align="inline-end">
            <InputGroup.Text><i>comma seperated</i></InputGroup.Text>
            </InputGroup.Addon>
        </InputGroup.Root>
        </div>
    </Card.Content>
    <Card.Footer class="flex flex-row justify-around">
        <Button onclick={generate} class="px-10">Generate</Button>
        <a href="/stop" class={buttonVariants({variant: 'destructive'})}>End</a>
    </Card.Footer>
</Card.Root>
</div>


<div id="imgContainer" class="opacity-0 overflow-hidden"></div>
