import type { TeamMember } from '../../entities/team/model/team';

export function getSkillsMatch(member: TeamMember, searchQuery: string): string | null {
    const search = searchQuery.trim().toLowerCase();

    if (!search) return null;

    const nameMatch = member.name.toLowerCase().includes(search);
    const roleMatch = member.role.toLowerCase().includes(search);

    if (nameMatch || roleMatch) return null;

    const skill = member.skills.find((skill) => skill.toLowerCase().includes(search));

    return skill ?? null;
}
