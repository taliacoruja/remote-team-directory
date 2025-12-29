import type { Availability } from '../../../entities/team/model/team';

export type TimezoneRange = 'all' | 'america' | 'europe' | 'asia';
export type SortBy = 'name' | 'timezone';

export type FiltersState = {
    searchQuery: string;
    availability: Availability | 'all';
    timezone: TimezoneRange;
    sortBy: SortBy;
};
