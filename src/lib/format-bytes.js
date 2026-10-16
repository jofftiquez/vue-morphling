import { filesize } from 'filesize';

// filesize >= 10 defaults to SI units (1000 B = 1 kB). Keep morphling's
// established output (1024 B = 1 KB) unless the caller picks a base or standard.
export function formatBytes (bytes, options = {}) {
  const legacy = options.base === undefined && options.standard === undefined
    ? { base: 2, standard: 'jedec' }
    : {};
  return filesize(bytes, { ...legacy, ...options });
}
