import { useCallback, useState } from 'react';

export function useCopyButton(
  duration: number,
  onCopy?: (value: string) => void,
) {
  const [isCopied, setCopied] = useState(false);

  const copy = useCallback(async (value: string) => {
    await navigator.clipboard.writeText(value);

    setCopied(true);

    onCopy?.(value);

    window.setTimeout(() => {
      setCopied(false);
    }, duration);

  }, [duration, onCopy]);

  return {
    copy,
    isCopied,
  };
}