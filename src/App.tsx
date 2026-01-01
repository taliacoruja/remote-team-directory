import './App.css';
import { useTeam } from './hooks/useTeam';
import { TeamList } from './entities/components/TeamList/TeamList.component';
import { ThemeToggle } from './shared/components/ThemeToggle/ThemeToggle.component';
import { useTheme } from './hooks/useTheme';
import { useMemo, useState } from 'react';
import { FiltersBar } from './shared/components/FiltersBar/FiltersBar.component';
import { DEFAULT_FILTERS } from './features/filters/model/filter-defaults';
import type { FiltersState } from './features/filters/model/filter-types';
import { appyFilters } from './shared/lib/applyFilters';
import { EmptyState } from './shared/components/EmptyState/EmptyState.component';
import { LoadingState } from './shared/components/LoadingState/LoadingState.component';
import { ErrorState } from './shared/components/ErrorState/ErrorState.component';

function App() {
    const { team, status, error } = useTeam();
    const { theme, toggle } = useTheme();

    const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);

    const filteredTeam = useMemo(() => appyFilters(team, filters), [team, filters]);

    const resetFilters = () => setFilters(DEFAULT_FILTERS);
    const clearSearch = () => setFilters((prev) => ({ ...prev, searchQuery: '' }));

    if (status === 'loading') return <LoadingState />;
    if (status === 'error')
        return (
            <ErrorState
                message={error ?? 'Unknown error'}
                onRetry={() => window.location.reload()}
            />
        );

    const membersAmount = status === 'ready' ? filteredTeam.length : '-';

    return (
        <main className='page'>
            <div className='container'>
                <header className='topbar'>
                    <div className='topbar__wrap'>
                        <h1 className='topbar__title'>Before You Ping</h1>
                        <p className='topbar__text'>A human-friendly team directory.</p>
                        <FiltersBar
                            value={filters}
                            onChange={setFilters}
                            onReset={() => setFilters(DEFAULT_FILTERS)}
                        />
                        <p className='subtle'>Results: {membersAmount}</p>
                    </div>

                    <ThemeToggle theme={theme} onToggle={toggle} />
                </header>

                {filteredTeam.length === 0 ? (
                    <EmptyState
                        filters={filters}
                        onReset={resetFilters}
                        onClearSearch={clearSearch}
                    />
                ) : (
                    <TeamList team={filteredTeam} highlightQuery={filters.searchQuery} />
                )}
            </div>
        </main>
    );
}

export default App;
