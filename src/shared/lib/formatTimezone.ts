export function formatTimezone(offset: number): string {
    const sign = offset >= 0 ? '+' : '';
    return `UTC${sign}${offset}`;
}
