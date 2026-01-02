import type { TeamMember } from '../../entities/team/model/team';
import type { FiltersState } from '../../features/filters/model/filter-types';
import { matchTimezone } from './timezoneRanges';

function matchesSearch(member: TeamMember, search: string): boolean {
    if (!search) return true;

    const searchFields = [member.name, member.role, ...member.skills].join(' ').toLowerCase();
    return searchFields.includes(search);
}

export function applyFilters(team: TeamMember[], filters: FiltersState): TeamMember[] {
    const searchQuery = filters.searchQuery.trim().toLowerCase();

    return team
        .filter((member) => matchesSearch(member, searchQuery))
        .filter((member) =>
            filters.availability === 'all' ? true : member.availability === filters.availability
        )
        .filter((member) => matchTimezone(member.timezoneOffset, filters.timezone))
        .slice()
        .sort((a, b) => {
            if (filters.sortBy === 'name') {
                return a.name.localeCompare(b.name);
            }
            return a.timezoneOffset - b.timezoneOffset;
        });
}
