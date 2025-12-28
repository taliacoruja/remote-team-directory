import type { TeamMember } from '../../team/model/team';
import { TeamAvatar } from '../TeamAvatar/TeamAvatar';
import { formatTimezone } from '../../../shared/lib/formatTimezone';
import './TeamCard.css';

type MemberProps = {
    member: TeamMember;
};

export function TeamCard({ member }: MemberProps) {
    const timezone = formatTimezone(member.timezoneOffset);

    return (
        <article className='card'>
            <header className='card__header'>
                <TeamAvatar id={member.id} name={member.name} />

                <div className='card__title'>
                    <h3 className='card__name'>{member.name}</h3>
                    <p className='card__role'>{member.role}</p>
                </div>

                <span className={`status status--${member.availability}`}>
                    {member.availability.replace('_', ' ')}
                </span>
            </header>

            <span className={`card__badge badge--${member.availability}`}></span>
            <div className='card__meta'>
                <span className='meta-pill'>
                    <span className='meta-pill__label'>Timezone</span>
                    <span className='meta-pill__value'>{timezone}</span>
                </span>
            </div>

            <ul className='chips' aria-label='Skills'>
                {member.skills.map((skill) => (
                    <li className='chip' key={skill}>
                        {skill}
                    </li>
                ))}
            </ul>
        </article>
    );
}
