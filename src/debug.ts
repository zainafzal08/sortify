const DEBUG = true;

export function debugLog(s: string) {
  if (!DEBUG) return;
  console.log(s);
}
