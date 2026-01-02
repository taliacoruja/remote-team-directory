import { describe, it, expect } from 'vitest';
import { getSkillsMatch } from './getSkillsMatch';
import { teamFixture } from './__tests__/fixtures/teamFixture';

describe('getSkillsMatch', () => {
    /**
     * Empty or whitespace-only queries should not produce a skills match.
     * In this case the function should behave as if no search is applied.
     */
    it('returns null for empty query', () => {
        expect(getSkillsMatch(teamFixture[0], '')).toBeNull();
        expect(getSkillsMatch(teamFixture[0], '  ')).toBeNull();
    });

    /**
     * If the query matches the team member's name,
     * we intentionally do NOT return a skill match.
     *
     * This prevents duplicate or confusing highlights when
     * name/role already satisfy the search condition.
     */
    it('returns null if query matches name', () => {
        expect(getSkillsMatch(teamFixture[0], 'alice')).toBeNull();
    });

    /**
     * If the query matches the team member's role.
     * we intentionally do NOT return a skill match.
     */
    it('returns null if query matches role', () => {
        expect(getSkillsMatch(teamFixture[0], 'frontend')).toBeNull();
    });

    /**
     * When neither name nor role match the query,
     * the function should return the first matching skill.
     *
     * This allows the UI to highlight the most relevant skill
     * as an additional hint for the user.
     */
    it('returns matched skill if name/role do not match', () => {
        expect(getSkillsMatch(teamFixture[0], 'type')).toBe('TypeScript');
        expect(getSkillsMatch(teamFixture[1], 'node')).toBe('Node.js');
    });

    /**
     * Search matching should be case-insensitive
     * to provide a more forgiving and user-friendly search experience.
     */
    it('is case-insensitive', () => {
        expect(getSkillsMatch(teamFixture[0], 'tYpE')).toBe('TypeScript');
    });

    /**
     * If the query does not match name, role, or any skill,
     * the function should return null to indicate no skill highlight.
     */
    it('returns null if nothing matches', () => {
        expect(getSkillsMatch(teamFixture[0], 'sjdh;as')).toBeNull();
    });
});
