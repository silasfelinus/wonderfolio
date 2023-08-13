export const randomColor = (): string => {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 50 + 50); // keep saturation between 50 and 100
  const l = Math.floor(Math.random() * 40 + 30); // keep lightness between 30 and 70
  return `hsl(${h},${s}%,${l}%)`;
};

// Analogous color generator
export const analogousColor = (hsl: string): string => {
  const hslMatch = hsl.match(/\d+/g);
  if (!hslMatch || hslMatch.length !== 3) {
    throw new Error("Invalid color format");
  }
  const [h, s, l] = hslMatch.map(Number);
  let newH = (h + 30) % 360;
  return `hsl(${newH},${s}%,${l}%)`;
};

// Complementary color generator
export const complementaryColor = (hsl: string): string => {
  const hslMatch = hsl.match(/\d+/g);
  if (!hslMatch || hslMatch.length !== 3) {
    throw new Error("Invalid color format");
  }
  const [h, s, l] = hslMatch.map(Number);
  let newH = (h + 180) % 360;
  return `hsl(${newH},${s}%,${l}%)`;
};
