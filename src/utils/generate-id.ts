export function generateId(prefix = 'rush'): string {
  return `${prefix}-${crypto.randomUUID()}`;
}
