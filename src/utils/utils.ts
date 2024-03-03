export function splitCamelCase(str: string) {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function findMinMax(array: number[]) {
  const min = Math.min(...array);
  const max = Math.max(...array);

  return { min, max };
}
