import type { FiltersState } from './filter-types';

export const DEFAULT_FILTERS: FiltersState = {
    searchQuery: '',
    availability: 'all',
    timezone: 'all',
    sortBy: 'name',
};
