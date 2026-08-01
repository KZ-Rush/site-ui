export function classNames(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes
    .filter(Boolean)
    .join(' ');
}