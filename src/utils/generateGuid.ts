export function generateGUID(): string {
  const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let output = "";

  for (const c of template) {
    output += generateGUIDChar(c);
  }

  return output;
}

function generateGUIDChar(c: string): string {
  if (c === "-") {
    return "-";
  }

  const r = (Math.random() * 16) | 0;

  const v = c === "x" ? r : (r & 0x3) | 0x8;

  return v.toString(16);
}
