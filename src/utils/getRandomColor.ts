// Adapted from https://stackoverflow.com/a/44134328
function hslToHex(h: number, s: number, l: number) {
  const a = s * Math.min(l, 1 - l);

  const f = (n: number) => {
    const k = (n + h * 12) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

    // convert to Hex and prefix "0" if needed
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };

  return `#${f(0)}${f(8)}${f(4)}`;
}

// Generates vibrant colours
export default function getRandomColor(): string {
  const h = Math.random();
  const s = 0.5 + Math.random() / 2;
  const l = 0.5;

  return hslToHex(h, s, l);
}
