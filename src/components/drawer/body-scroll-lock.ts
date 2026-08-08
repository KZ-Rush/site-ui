let lockCount = 0;
let originalOverflow: string | null = null;

export function lockBodyScroll(): void {
  if (typeof document === 'undefined') {
    return;
  }

  if (lockCount === 0) {
    originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      'hidden';
  }

  lockCount += 1;
}

export function unlockBodyScroll(): void {
  if (
    typeof document === 'undefined'
    || lockCount === 0
  ) {
    return;
  }

  lockCount -= 1;

  if (lockCount > 0) {
    return;
  }

  document.body.style.overflow =
    originalOverflow ?? '';

  originalOverflow = null;
}