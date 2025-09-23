export function parseFraction(input: string): number | null {
  if (!input || input.trim() === '') return null;
  
  const trimmed = input.trim();
  
  // Handle decimal numbers
  if (/^\d+\.?\d*$/.test(trimmed)) {
    const num = parseFloat(trimmed);
    return isNaN(num) ? null : num;
  }
  
  // Handle fractions with optional whole numbers
  const fractionMatch = trimmed.match(/^(\d+)?\s*(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const [, wholeStr, numeratorStr, denominatorStr] = fractionMatch;
    const whole = wholeStr ? parseInt(wholeStr) : 0;
    const numerator = parseInt(numeratorStr);
    const denominator = parseInt(denominatorStr);
    
    if (denominator === 0) return null;
    
    return whole + (numerator / denominator);
  }
  
  // Handle just whole numbers
  const wholeMatch = trimmed.match(/^\d+$/);
  if (wholeMatch) {
    return parseInt(trimmed);
  }
  
  return null;
}

export function formatMeasurement(decimal: number): string {
  // Convert decimal to mixed number fraction for display
  const whole = Math.floor(decimal);
  const fractional = decimal - whole;
  
  if (fractional === 0) {
    return whole.toString();
  }
  
  // Find closest common fraction (up to 16ths)
  const sixteenths = Math.round(fractional * 16);
  
  if (sixteenths === 0) {
    return whole.toString();
  }
  
  if (sixteenths === 16) {
    return (whole + 1).toString();
  }
  
  // Simplify the fraction
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(sixteenths, 16);
  const simplifiedNum = sixteenths / divisor;
  const simplifiedDen = 16 / divisor;
  
  if (whole === 0) {
    return `${simplifiedNum}/${simplifiedDen}`;
  }
  
  return `${whole} ${simplifiedNum}/${simplifiedDen}`;
}