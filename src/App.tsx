import './App.css';
import { useTeam } from './hooks/useTeam';
import { TeamList } from './entities/ui/TeamList/TeamList';
import { ThemeToggle } from './shared/ui/ThemeToggle/ThemeToggle';
import { useTheme } from './hooks/useTheme';

function App() {
    const { team, status, error } = useTeam();
    const { theme, toggle } = useTheme();

    if (status === 'loading') return <p>Loading Team</p>;
    if (status === 'error') return <p role='alert'>Error: {error}</p>;

    const membersAmount = status === 'ready' ? team.length : '-';

    return (
        <main className='page'>
            <div className='container'>
                <header className='topbar'>
                    <div className='topbar__wrap'>
                        <h1 className='topbar__title'>Remote Team</h1>

                        <p className='subtle'>Results: {membersAmount}</p>
                    </div>

                    <ThemeToggle theme={theme} onToggle={toggle} />
                </header>

                <TeamList team={team} />
            </div>
        </main>
    );
}

export default App;
