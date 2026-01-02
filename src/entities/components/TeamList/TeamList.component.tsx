import type { TeamMember } from '../../team/model/team';
import { TeamCard } from '../TeamCard/TeamCard.component';
import './TeamList.style.css';

type Props = {
    team: TeamMember[];
    highlightQuery?: string;
};

export function TeamList({ team, highlightQuery }: Props) {
    return (
        <section className='grid' aria-label='Team members' data-testid='members-list'>
            {team.map((member) => (
                <TeamCard key={member.id} member={member} highlightQuery={highlightQuery} />
            ))}
        </section>
    );
}
