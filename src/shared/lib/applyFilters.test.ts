import { describe, it, expect } from 'vitest';
import { applyFilters } from './applyFilters';
import { teamFixture } from './__tests__/fixtures/teamFixture';
import type { FiltersState } from '../../features/filters/model/filter-types';

/**
 * Default filter state used as a baseline for most test cases.
 * Using `satisfies FiltersState` to valide the object shape.
 */
const defaultFilters = {
    searchQuery: '',
    availability: 'all',
    timezone: 'all',
    sortBy: 'name',
} satisfies FiltersState;

/**
 * Helper function overriding only the relevant fields
 */
function createFilters(overrides: Partial<FiltersState> = {}): FiltersState {
    return {
        ...defaultFilters,
        ...overrides,
    };
}

describe('applyFilters', () => {
    /**
     * With default filters applied, no filtering should occur.
     * The function should return the full team list.
     */
    it('returns all when filters are default', () => {
        const result = applyFilters(teamFixture, createFilters());
        expect(result).toHaveLength(teamFixture.length);
    });

    /**
     * Search query should match against multiple fields:
     * - name
     * - role
     * - skills
     *
     * If any of these fields match, the team member should be included.
     */
    it('filters by searchQuery name/role/skills', () => {
        expect(applyFilters(teamFixture, createFilters({ searchQuery: 'alice' }))).toHaveLength(1);
        expect(applyFilters(teamFixture, createFilters({ searchQuery: 'designer' }))).toHaveLength(
            2
        );
        expect(
            applyFilters(teamFixture, createFilters({ searchQuery: 'playwright' }))
        ).toHaveLength(1);
    });

    /**
     * Search query handling should be resilient:
     * - leading and trailing whitespace is ignored
     * - matching is case-insensitive
     */
    it('searchQuery is trimmed and case-insensitive', () => {
        const result = applyFilters(teamFixture, createFilters({ searchQuery: '  REACT ' }));
        expect(result.map((member) => member.id)).toEqual(['1']);
    });

    /**
     * Availability filter should include only members
     * whose availability matches the selected value.
     */
    it('filters by availability', () => {
        const result = applyFilters(teamFixture, createFilters({ availability: 'focus' }));
        expect(result.map((member) => member.id)).toEqual(['3']);
    });

    /**
     * Timezone filter should correctly delegate to timezone range logic.
     * In this case, "america" includes members with UTC offset <= -3.
     */
    it('filters by timezone range', () => {
        // america should keep Bob (-5)
        const result = applyFilters(teamFixture, createFilters({ timezone: 'america' }));
        expect(result.map((member) => member.id)).toEqual(['2']);
    });

    /**
     * When sortBy is set to "name",
     * the resulting list should be sorted alphabetically by name.
     */
    it("sorts by name when sortBy === 'name'", () => {
        const result = applyFilters(teamFixture, createFilters({ sortBy: 'name' }));
        expect(result.map((member) => member.name)).toEqual([
            'Alice Johnson',
            'Bob Stone',
            'Chen Li',
            'Dana Fox',
            'Trevor Bob Rust',
        ]);
    });

    /**
     * For timezoneOffset sort option,
     * the list should be sorted by timezone offset in ascending order.
     */
    it('sorts by timezoneOffset otherwise', () => {
        const result = applyFilters(teamFixture, createFilters({ sortBy: 'timezone' }));
        expect(result.map((member) => member.timezoneOffset)).toEqual([-5, 1, 2, 3, 8]);
    });

    /**
     * applyFilters should be a pure function with respect to its inputs.
     * It must not mutate the original team array.
     */
    it('does not mutate input array', () => {
        const copy = [...teamFixture];
        applyFilters(teamFixture, createFilters({ sortBy: 'timezone' }));
        expect(teamFixture).toEqual(copy);
    });
});
