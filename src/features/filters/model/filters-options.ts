import type { Availability } from '../../../entities/team/model/team';
import type { SortBy, TimezoneRange } from './filter-types';
import type { ListboxOption } from '../../../shared/components/Listbox/Listbox.component';

export const availabilityOptions: Array<ListboxOption<Availability | 'all'>> = [
    { value: 'all', label: 'All' },
    { value: 'available', label: 'Available' },
    { value: 'focus', label: 'Focus' },
    { value: 'in_meeting', label: 'In meeting' },
    { value: 'offline', label: 'Offline' },
];

export const timezoneOptions: Array<ListboxOption<TimezoneRange>> = [
    { value: 'all', label: 'All' },
    { value: 'america', label: 'America (UTC ≤ -3)' },
    { value: 'europe', label: 'Europe (UTC -2…+3)' },
    { value: 'asia', label: 'Asia (UTC ≥ +4)' },
];

export const sortOptions: Array<ListboxOption<SortBy>> = [
    { value: 'name', label: 'Name (A–Z)' },
    { value: 'timezone', label: 'Timezone (ASC)' },
];
