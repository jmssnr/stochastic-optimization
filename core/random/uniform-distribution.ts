export function uniform(min: number, max: number): number {
  return min + (max - min) * Math.random();
}
