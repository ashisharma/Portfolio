import { useState, useCallback, useEffect, useRef } from 'react';

export interface UseClipboardOptions {
  timeout?: number;
}

export interface UseClipboardReturn {
  copied: boolean;
  error: string | null;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

/**
 * Robust, memory-safe hook for copying text to the user's clipboard.
 * Features automatic timeout reset, fallback for legacy contexts,
 * and leak-free unmount cleanup.
 */
export function useClipboard(options: UseClipboardOptions = {}): UseClipboardReturn {
  const { timeout = 2000 } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!text) return false;

      // Clear pending timeout if user clicks multiple times rapidly
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else if (typeof document !== 'undefined') {
          // Hardened non-intrusive fallback
          const textArea = document.createElement('textarea');
          textArea.value = text;
          textArea.setAttribute('readonly', '');
          textArea.style.position = 'fixed';
          textArea.style.top = '-9999px';
          textArea.style.left = '-9999px';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          if (!successful) {
            throw new Error('Fallback copy failed');
          }
        } else {
          throw new Error('Clipboard unsupported');
        }

        setCopied(true);
        setError(null);

        timeoutRef.current = window.setTimeout(() => {
          setCopied(false);
        }, timeout);

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Copy failed');
        setCopied(false);
        return false;
      }
    },
    [timeout]
  );

  const reset = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setCopied(false);
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { copied, error, copy, reset };
}
