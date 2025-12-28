import type { Theme } from '../../../hooks/useTheme';
import './ThemeToggle.css';

export function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
    return (
        <button
            className='theme-toggle'
            onClick={onToggle}
            aria-pressed={theme === 'dark'}
            aria-label='Toggle theme'
            title='Toggle theme'
        >
            {theme === 'dark' ? 'Dark' : 'Light'}
        </button>
    );
}
