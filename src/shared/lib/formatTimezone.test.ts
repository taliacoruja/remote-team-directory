import { describe, it, expect } from 'vitest';
import { formatTimezone } from './formatTimezone';

describe('formatTimezone', () => {
    /**
     * UTC offset formatting should be stable and predictable:
     * - positive offsets use a "+" sign
     * - negative offsets keep the "-" sign
     * - zero is explicitly shown as UTC+0 (not just UTC0)
     */
    it('formats zero offset', () => {
        expect(formatTimezone(0)).toBe('UTC+0');
    });

    /**
     * Positive offsets should include a "+" sign.
     */
    it('formats positive offsets with + sign', () => {
        expect(formatTimezone(2)).toBe('UTC+2');
        expect(formatTimezone(4)).toBe('UTC+4');
    });

    /**
     * Negative offsets should preserve the "-" sign.
     */
    it('formats negative offsets with - sign', () => {
        expect(formatTimezone(-1)).toBe('UTC-1');
        expect(formatTimezone(-5)).toBe('UTC-5');
    });
});
