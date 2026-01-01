import './FiltersBar.style.css';
import type { FiltersState } from '../../../features/filters/model/filter-types';
import { SearchInput } from '../../../shared/components/SearchInput/SearchInput.component';
import { Listbox } from '../Listbox/Listbox.component';
import {
    availabilityOptions,
    timezoneOptions,
    sortOptions,
} from '../../../features/filters/model/filters-options';

type Props = {
    value: FiltersState;
    onChange: (next: FiltersState) => void;
    onReset: () => void;
};

export function FiltersBar({ value, onChange, onReset }: Props) {
    const update = <K extends keyof FiltersState>(key: K, next: FiltersState[K]) => {
        onChange({ ...value, [key]: next });
    };

    return (
        <form className='filters' role='search' aria-label='Team filters'>
            <div className='filters__row'>
                <SearchInput value={value.searchQuery} onChange={(q) => update('searchQuery', q)} />
            </div>

            <div className='filters__row filters__row--controls'>
                <Listbox
                    label='Availability'
                    hint='Set to ‘Focus’ if you fear productivity.'
                    value={value.availability}
                    options={availabilityOptions}
                    onChange={(v) => update('availability', v)}
                />

                <Listbox
                    label='Timezone'
                    hint='Because ‘ping at 3am’ is not a culture.'
                    value={value.timezone}
                    options={timezoneOptions}
                    onChange={(v) => update('timezone', v)}
                />

                <Listbox
                    label='Sort by'
                    hint='Because ‘random order’ is a lifestyle.'
                    value={value.sortBy}
                    options={sortOptions}
                    onChange={(v) => update('sortBy', v)}
                />

                <button type='button' className='filters__reset' onClick={onReset}>
                    Reset
                </button>
            </div>
        </form>
    );
}
