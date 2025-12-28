import { getEnv } from '../../../shared/lib/env';

export type Availability = 'available' | 'focus' | 'in_meeting' | 'offline';

export type TeamMember = {
    id: string;
    name: string;
    role: string;
    timezoneOffset: number;
    availability: Availability;
    skills: string[];
};

export async function fetchTeam(): Promise<TeamMember[]> {
    const url = getEnv().VITE_TEAM_API_URL ?? 'teams.json';

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to load team: ${res.status}`);
    }

    const data = (await res.json()) as TeamMember[];
    return data;
}
