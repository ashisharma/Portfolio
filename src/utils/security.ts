/**
 * Comprehensive Security Utilities
 * Protects against XSS, reverse tabnabbing, protocol injection, and malicious input.
 */

// Permitted URI protocols for external & internal web application navigation
export const ALLOWED_PROTOCOLS = Object.freeze(['https:', 'http:', 'mailto:', 'tel:']);

/**
 * Checks whether an unknown input is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates an email address against standard RFC-compliant format,
 * preventing email header injection (e.g. carriage return or newline characters).
 */
export function isValidEmail(email: unknown): boolean {
  if (!isNonEmptyString(email)) return false;

  const trimmed = email.trim();

  // Guard against CRLF injection
  if (/[\r\n]/.test(trimmed)) return false;

  // Strict email regex: user@domain.tld
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Validates whether a URL is secure and uses an approved scheme.
 * Strictly forbids dangerous schemes such as javascript:, vbscript:, data:, file:, etc.
 */
export function isSafeUrl(url: unknown): boolean {
  if (!isNonEmptyString(url)) return false;

  const trimmed = url.trim();

  // Check for null bytes or control characters
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Allow same-origin relative links & anchors (#section or /path)
  if (trimmed.startsWith('#') || trimmed.startsWith('/') || trimmed.startsWith('./')) {
    // Ensure no hidden protocol injection (e.g. '/\javascript:...')
    return !trimmed.toLowerCase().includes('javascript:') && !trimmed.toLowerCase().includes('data:');
  }

  try {
    const parsed = new URL(trimmed);
    const protocol = parsed.protocol.toLowerCase();
    return ALLOWED_PROTOCOLS.includes(protocol);
  } catch {
    // Malformed URL
    return false;
  }
}

/**
 * Sanitizes an arbitrary URL string, returning the clean string if safe,
 * or an optional fallback string (defaults to empty) if unsafe.
 */
export function sanitizeUrl(url: unknown, fallback = ''): string {
  if (isSafeUrl(url)) {
    return (url as string).trim();
  }
  return fallback;
}

/**
 * Generates secure anchor tag attributes for outbound links.
 * Enforces `rel="noopener noreferrer"` to eliminate reverse tabnabbing vulnerabilities
 * and window.opener hijacking.
 */
export interface SecureLinkProps {
  href: string;
  target?: '_blank' | '_self';
  rel?: 'noopener noreferrer';
}

export function getSecureLinkProps(
  url: unknown, 
  target: '_blank' | '_self' = '_blank'
): SecureLinkProps {
  const safeUrl = sanitizeUrl(url, '#');
  const isExternal = safeUrl.startsWith('http://') || safeUrl.startsWith('https://');

  if (isExternal && target === '_blank') {
    return {
      href: safeUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return {
    href: safeUrl,
    target: '_self',
  };
}

/**
 * Strips HTML tags and unescaped dangerous characters from input text,
 * preventing XSS when rendering arbitrary strings.
 */
export function sanitizePlainText(text: unknown): string {
  if (typeof text !== 'string') return '';
  return text
    .replace(/[<>]/g, '') // remove brackets
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // remove control chars
    .trim();
}
