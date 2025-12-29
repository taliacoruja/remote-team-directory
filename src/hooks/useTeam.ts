import { useEffect, useState } from 'react';
import { fetchTeam } from '../entities/team/model/team';
import type { TeamMember } from '../entities/team/model/team';
import { delay } from '../shared/lib/delay';

export type LoadStatus = 'loading' | 'ready' | 'error';

export function useTeam() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [status, setStatus] = useState<LoadStatus>('loading');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadTeam(): Promise<void> {
            try {
                setStatus('loading');
                await delay(400);
                const teamData = await fetchTeam();
                setTeam(teamData);
                setStatus('ready');
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : 'Unknow error';
                setError(message);
                setStatus('error');
            }
        }

        loadTeam();
    }, []);

    return { team, status, error };
}
