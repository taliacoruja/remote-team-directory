import './EmptyState.style.css';
import type { FiltersState } from '../../../features/filters/model/filter-types';
import { BlinkingEyes } from '../BlinkingEyes/BlinkingEyes.component';

type Props = {
    filters: FiltersState;
    onReset: () => void;
    onClearSearch: () => void;
};

function formatActiveFilters(filters: FiltersState): string[] {
    const items: string[] = [];

    if (filters.availability !== 'all') items.push(`Availability: ${filters.availability}`);
    if (filters.timezone !== 'all') items.push(`Timezone: ${filters.timezone}`);
    if (filters.sortBy !== 'name') items.push(`Sort: ${filters.sortBy}`);

    return items;
}

export function EmptyState({ filters, onReset, onClearSearch }: Props) {
    const query = filters.searchQuery.trim();
    const hasQuery = query.length > 0;

    const active = formatActiveFilters(filters);
    const hasAnyNonDefault = hasQuery || active.length > 0;

    const cta =
        hasQuery && active.length === 0
            ? { label: 'Clear search', onClick: onClearSearch }
            : { label: 'Reset filters', onClick: onReset };

    return (
        <section className='empty' aria-labelledby='empty-title' data-testid='empty-state'>
            <div className='empty__card'>
                <BlinkingEyes />

                <h2 id='empty-title' className='empty__title'>
                    {hasQuery ? `No matches for “${query}”` : 'No results'}
                </h2>

                <p className='empty__text'>No matches. Try fewer filters. Or hire more people.</p>

                {hasAnyNonDefault && (
                    <p className='empty__meta'>
                        <span className='empty__meta-label'>Active filters:</span>{' '}
                        {[...(hasQuery ? [`Query: “${query}”`] : []), ...active].join(', ')}
                    </p>
                )}

                <div className='empty__actions'>
                    <button type='button' className='empty__btn' onClick={cta.onClick}>
                        {cta.label}
                    </button>
                </div>
            </div>
        </section>
    );
}
