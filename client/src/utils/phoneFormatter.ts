export function formatPhoneNumber(value: string): string {
  // Remove all non-digits
  const cleaned = value.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length >= 10) {
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  }
  
  // Partial formatting for incomplete numbers
  if (cleaned.length >= 6) {
    const match = cleaned.match(/^(\d{3})(\d{3})(\d*)$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
  }
  
  if (cleaned.length >= 3) {
    const match = cleaned.match(/^(\d{3})(\d*)$/);
    if (match) {
      return `(${match[1]}) ${match[2]}`;
    }
  }
  
  return cleaned;
}

export function cleanPhoneNumber(formatted: string): string {
  return formatted.replace(/\D/g, '');
}

export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = cleanPhoneNumber(phone);
  return cleaned.length === 10 && /^\d{10}$/.test(cleaned);
}