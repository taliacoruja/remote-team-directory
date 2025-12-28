import type { TeamMember } from '../../team/model/team';
import { TeamCard } from '../TeamCard/TeamCard';
import './TeamList.css';
type Props = {
    team: TeamMember[];
};

export function TeamList({ team }: Props) {
    return (
        <section className='grid' aria-label='Team members'>
            {team.map((member) => (
                <TeamCard key={member.id} member={member} />
            ))}
        </section>
    );
}
