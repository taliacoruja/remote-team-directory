import './BlinkingEyes.style.css';

type Props = {
    className?: string;
};

export function BlinkingEyes({ className }: Props) {
    return (
        <div className={['eyes', className].filter(Boolean).join(' ')} aria-hidden='true'>
            <span className='eyes__eye'>
                <span className='eyes__pupil' />
            </span>
            <span className='eyes__eye eyes__eye--right'>
                <span className='eyes__pupil' />
            </span>
        </div>
    );
}
