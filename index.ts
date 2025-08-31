import { parseArgs } from "util";
import genImg from "./genImg";

const { values: args } = parseArgs({
  args: Bun.argv,
  options: {
    bg: {
      type: "string",
      default: "ffffff",
    },
    fg: {
      type: "string",
      default: "000000",
    },
    file: {
      type: "string",
      short: "f",
      default: "list.csv",
    },
    size: {
      type: "string",
      short: "s",
      default: "400",
    },
    out: {
      type: "string",
      short: "o",
      default: "out",
    },
  },
  allowPositionals: true,
});

console.time("Completed");
const list = (await Bun.file(args.file).text()).split(", ");

for (const item of list) {
  const buffer = genImg(item, parseInt(args.size, 10), args.bg, args.fg);
  Bun.write(`${args.out}/${item}.png`, buffer);
}
console.timeEnd("Completed");
