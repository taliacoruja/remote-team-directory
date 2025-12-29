import { useEffect, useState } from 'react';
import './LoadingState.style.css';

const STEPS = [
    'Fetching team…',
    'Syncing timezones…',
    'Checking availability…',
    'Building directory…',
];

export function LoadingState() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const id = window.setInterval(() => {
            setStep((s) => (s + 1) % STEPS.length);
        }, 950);
        return () => window.clearInterval(id);
    }, []);

    return (
        <section className='lava' aria-label='Loading team'>
            <div className='lava__bg' aria-hidden='true'>
                <span className='lava__blob lava__blob--a' />
                <span className='lava__blob lava__blob--b' />
                <span className='lava__blob lava__blob--c' />
            </div>

            <div className='lava__content'>
                <p className='lava__title'>Loading</p>
                <p className='lava__step' aria-live='polite'>
                    {STEPS[step]}
                </p>
            </div>
        </section>
    );
}
