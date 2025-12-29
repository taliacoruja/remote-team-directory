import React from 'react';

export function highlightMatches(text: string, query: string): React.ReactNode {
    const q = query.trim();
    if (!q) return text;

    const lowerText = text.toLowerCase();
    const lowerQ = q.toLowerCase();

    const parts: React.ReactNode[] = [];
    let start = 0;

    while (true) {
        const index = lowerText.indexOf(lowerQ, start);
        if (index === -1) break;

        if (index > start) {
            parts.push(text.slice(start, index));
        }

        const match = text.slice(index, index + q.length);
        parts.push(
            <mark key={`${index}-${match}`} className='hl'>
                {match}
            </mark>
        );

        start = index + q.length;
    }

    if (start < text.length) {
        parts.push(text.slice(start));
    }

    return parts.length ? parts : text;
}
