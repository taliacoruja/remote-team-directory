export function getInitials(name: string): string {
    return name
        .split(/\s+/)
        .map((part) => part[0])
        .join('')
        .toUpperCase();
}
