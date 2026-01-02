import { describe, it, expect } from 'vitest';
import { matchTimezone } from './timezoneRanges';
import type { TimezoneRange } from '../../features/filters/model/filter-types';

describe('matchTimezone', () => {
    /**
     * America includes all timezones with UTC offset <= -3.
     *
     * We explicitly test:
     * - a value below the boundary
     * - the boundary value itself
     * - a value just outside the boundary
     *
     * This protects against off-by-one errors (<= vs <),
     * which are very common in range-based logic.
     */

    it('america: offset <= -3', () => {
        const amRange: TimezoneRange = 'america';
        expect(matchTimezone(-4, amRange)).toBe(true);
        expect(matchTimezone(-3, amRange)).toBe(true);
        expect(matchTimezone(-2, amRange)).toBe(false);
    });

    /**
     * Europe is defined as UTC offsets from -2 to +3 inclusive.
     *
     * We test:
     * - both boundary values (-2 and +3)
     * - a value inside the range (0)
     * - values just outside the range (-3 and +4)
     *
     * This ensures the range is inclusive and correctly limited on both sides.
     */
    it('europe: -2..+3 inclusive', () => {
        const euRange: TimezoneRange = 'europe';

        expect(matchTimezone(-2, euRange)).toBe(true);
        expect(matchTimezone(0, euRange)).toBe(true);
        expect(matchTimezone(3, euRange)).toBe(true);

        expect(matchTimezone(-3, euRange)).toBe(false);
        expect(matchTimezone(4, euRange)).toBe(false);
    });

    /**
     * Asia includes all timezones with UTC offset >= +4.
     *
     * We test:
     * - the boundary value (+4)
     * - a value well inside the range
     * - a value just before the boundary
     *
     * This again protects against >= vs > mistakes.
     */
    it('asia: offset <= +4', () => {
        const asiaRange: TimezoneRange = 'asia';

        expect(matchTimezone(4, asiaRange)).toBe(true);
        expect(matchTimezone(10, asiaRange)).toBe(true);
        expect(matchTimezone(3, asiaRange)).toBe(false);
    });

    /**
     * Unknown range:
     *
     * This test verifies the fail-safe behaviour of matchTimezone.
     *
     * If an unknown or invalid range is provided (for example due to:
     * - a typo in FiltersState
     * - frontend/backend mismatch
     * - a newly introduced range not yet handled here),
     * the function should NOT filter out team members.
     *
     * Returning `true` ensures that no data is accidentally hidden
     * when the filter configuration is invalid.
     */
    it('unknown range -> returns true (fail-safe behaviour)', () => {
        expect(matchTimezone(0, 'unknown' as TimezoneRange)).toBe(true);
        expect(matchTimezone(-10, 'invalid' as TimezoneRange)).toBe(true);
        expect(matchTimezone(10, 'future-range' as TimezoneRange)).toBe(true);
    });
});
