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
    const url = import.meta.env.DEV ? '/api/team' : '/teams.json';

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load team (${res.status})`);

    return res.json();
}
