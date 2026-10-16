// Number of bytes `str` takes when UTF-8 encoded. Same result as
// `new TextEncoder().encode(str).length`, without depending on TextEncoder
// (missing in jsdom and some SSR/edge runtimes).
export function utf8Length (str) {
  let bytes = 0;
  for (const char of str) {
    const code = char.codePointAt(0);
    bytes += code < 0x80 ? 1 : code < 0x800 ? 2 : code < 0x10000 ? 3 : 4;
  }
  return bytes;
}
