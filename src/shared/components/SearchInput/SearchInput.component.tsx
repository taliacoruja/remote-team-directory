import './SearchInput.style.css';

type InputProps = {
    value: string;
    onChange: (next: string) => void;
    placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = 'Start typing name' }: InputProps) {
    const id = 'team-search';

    return (
        <div className='search'>
            <label className='search__label' htmlFor={id}>
                Search team members
            </label>

            <div className='search__control'>
                <input
                    id={id}
                    className='search__input'
                    type='search'
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />

                {value.length > 0 && (
                    <button
                        type='button'
                        className='search__clear'
                        onClick={() => onChange('')}
                        aria-label='Clear search'
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
}
