import { describe, it, expect } from 'vitest';
import { getInitials } from './getInitials';
import { teamFixture } from './__tests__/fixtures/teamFixture';

describe('getInitials', () => {
    /**
     * For a regular "first last" name we expect two initials.
     */
    it('returns initials for first and last name', () => {
        expect(getInitials('Alice Johnson')).toBe('AJ');
        expect(getInitials(teamFixture[3].name)).toBe('DF');
    });

    /**
     * For multi-part names we take the first letter of each part.
     * This keeps the logic predictable for longer names.
     */
    it('returns initials for multi-part name', () => {
        expect(getInitials('Mary Jane Watson')).toBe('MJW');
        expect(getInitials(teamFixture[4].name)).toBe('TBR');
    });

    /**
     * Extra whitespace should not affect the result.
     * Users and APIs often provide names with inconsistent spacing.
     */
    it('ignores extra spaces', () => {
        expect(getInitials('  Alice   Johnson  ')).toBe('AJ');
    });

    /**
     * Single-word names should return a single initial.
     */
    it('handles single-word name', () => {
        expect(getInitials('Alice')).toBe('A');
    });

    /**
     * Empty input should not crash and should return an empty string.
     * This is a safe fallback for incomplete data.
     */
    it('returns empty string for empty input', () => {
        expect(getInitials('')).toBe('');
        expect(getInitials('   ')).toBe('');
    });
});
