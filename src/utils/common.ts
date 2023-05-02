export function isValueEmpty(value: unknown): boolean {
  if (value === undefined || value === null) {
    return true;
  }

  if (value instanceof Date) {
    return false;
  }

  if (typeof value === 'string') {
    return !!value;
  }

  if (typeof value === 'object' && Array.isArray(value)) {
    return !value.length;
  }

  if (typeof value === 'object') {
    return !Object.keys(value).length;
  }

  return false;
}
