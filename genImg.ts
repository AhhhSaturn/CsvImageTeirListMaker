import { createCanvas } from "canvas";

const genImg = (text: string, size: number, bg: string, fg: string) => {
  console.time(text);
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = `#${bg}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = "40px Arial"; // Adjust font size and family as needed
  ctx.fillStyle = `#${fg}`; // Text color
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, canvas.width / 2, canvas.height / 2, canvas.width);

  console.timeEnd(text);
  return canvas.toBuffer();
};

export default genImg;
