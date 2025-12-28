import type { TeamMember } from '../entities/team/model/team';

export async function fetchTeam(): Promise<TeamMember[]> {
    const url = import.meta.env.DEV ? '/api/team' : '/teams.json';

    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Failed to load team (${res.status})`);
    }

    return res.json();
}
