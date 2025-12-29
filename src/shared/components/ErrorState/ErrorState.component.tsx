import './ErrorState.style.css';

type Props = {
    title?: string;
    message: string;
    onRetry: () => void;
    onResetFilters?: () => void;
};

export function ErrorState({
    title = 'Something went wrong',
    message,
    onRetry,
    onResetFilters,
}: Props) {
    return (
        <section className='error' role='alert' aria-label='Error'>
            <div className='error__bg' aria-hidden='true'>
                <span className='error__blob error__blob--a' />
                <span className='error__blob error__blob--b' />
            </div>

            <div className='error__content'>
                <p className='error__eyebrow'>Error</p>
                <h2 className='error__title'>{title}</h2>

                <p className='error__text'>{message}</p>

                <div className='error__actions'>
                    <button
                        type='button'
                        className='error__btn error__btn--primary'
                        onClick={onRetry}
                    >
                        Retry
                    </button>

                    {onResetFilters && (
                        <button type='button' className='error__btn' onClick={onResetFilters}>
                            Reset filters
                        </button>
                    )}
                </div>

                <p className='error__hint'>
                    Tip: If this keeps happening, check your connection or try refreshing the page.
                </p>
            </div>
        </section>
    );
}
