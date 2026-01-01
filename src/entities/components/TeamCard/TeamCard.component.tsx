import type { TeamMember } from '../../team/model/team';
import { TeamAvatar } from '../TeamAvatar/TeamAvatar.component';
import { formatTimezone } from '../../../shared/lib/formatTimezone';
import './TeamCard.style.css';
import { highlightMatches } from '../../../shared/lib/highlightText';
import { getSkillsMatch } from '../../../shared/lib/getSkillsMatch';
import { getAvailabilitySubtitle } from '../../../shared/lib/getAvailabilitySubtitle';
import { useRef } from 'react';

type MemberProps = {
    member: TeamMember;
    highlightQuery?: string;
};

export function TeamCard({ member, highlightQuery = '' }: MemberProps) {
    const { id, name, role, availability, timezoneOffset, skills } = member;
    const timezone = formatTimezone(timezoneOffset);

    const cardRef = useRef<HTMLElement | null>(null);

    const isAnnoyed = availability !== 'available';
    const isOffline = availability === 'offline';

    const skillMatch = getSkillsMatch(member, highlightQuery);

    const handleClick = () => {
        const el = cardRef.current;
        if (!el) return;

        if (isOffline) {
            el.classList.remove('card--runaway');
            void el.offsetWidth;
            el.classList.add('card--runaway');
            return;
        }

        if (isAnnoyed) {
            el.classList.remove('card--annoyed');
            void el.offsetWidth;
            el.classList.add('card--annoyed');
        }
    };

    return (
        <article
            className='card'
            ref={cardRef}
            tabIndex={0}
            onClick={handleClick}
            data-availability={availability}
            aria-label={`Team member ${name}`}
            onAnimationEnd={(e) => {
                const el = e.currentTarget;
                el.classList.remove('card--annoyed', 'card--runaway');
            }}
        >
            <header className='card__header'>
                <TeamAvatar id={id} name={name} />

                <div className='card__title'>
                    <h3 className='card__name'>{highlightMatches(name, highlightQuery)}</h3>
                    <p className='card__role'>{highlightMatches(role, highlightQuery)}</p>
                    <p className='card__subtitle'>{getAvailabilitySubtitle(availability)}</p>
                </div>

                <span className={`status status--${availability}`}>
                    {availability.replace('_', ' ')}
                </span>
            </header>
            {skillMatch && (
                <p className='card__match'>
                    Matched: <mark className='card__match-skill'>{skillMatch}</mark>
                </p>
            )}
            <span className={`card__badge badge--${availability}`}></span>
            <div className='card__meta'>
                <span className='meta-pill'>
                    <span className='meta-pill__label'>Timezone</span>
                    <span className='meta-pill__value'>{timezone}</span>
                </span>
            </div>

            <ul className='chips' aria-label='Skills'>
                {skills.map((skill) => (
                    <li className='chip' key={skill}>
                        {skill}
                    </li>
                ))}
            </ul>
        </article>
    );
}
