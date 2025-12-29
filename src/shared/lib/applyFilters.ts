import type { TeamMember } from '../../entities/team/model/team';
import type { FiltersState } from '../../features/filters/model/filter-types';
import { matchTimezone } from './timezoneRanges';

export function appyFilters(team: TeamMember[], filters: FiltersState): TeamMember[] {
    const searchQuery = filters.searchQuery.trim().toLowerCase();

    return team
        .filter((member) => (searchQuery ? member.name.toLowerCase().includes(searchQuery) : true))
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
