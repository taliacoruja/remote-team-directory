import { describe, it, expect } from 'vitest';
import { getAvailabilitySubtitle } from './getAvailabilitySubtitle';
import type { Availability } from '../../entities/team/model/team';
import { teamFixture } from './__tests__/fixtures/teamFixture';

describe('getAvailabilitySubtitle', () => {
    /**
     * We verify that each availability status maps to the exact subtitle
     * expected by the UI copy. This prevents accidental regressions when
     * changing text content or refactoring the switch.
     */
    it('returns correct subtitle for each availability value', () => {
        expect(getAvailabilitySubtitle(teamFixture[0].availability)).toBe(
            'Can talk now (and will)'
        );
        expect(getAvailabilitySubtitle(teamFixture[2].availability)).toBe(
            'Deep work. Approach quietly.'
        );
        expect(getAvailabilitySubtitle(teamFixture[3].availability)).toBe(
            'In a meeting. Probably muted.'
        );
        expect(getAvailabilitySubtitle(teamFixture[4].availability)).toBe(
            'Away from keyboard. Living their best life.'
        );
    });

    /**
     * Fail-safe behaviour:
     * if an unexpected value is passed, we return an empty string
     * so the UI doesn't crash and can omit the subtitle gracefully.
     */
    it('returns empty string for unknown availability (fail-safe)', () => {
        expect(getAvailabilitySubtitle('unknown' as Availability)).toBe('');
    });
});
