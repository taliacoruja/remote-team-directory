type ViteEnv = {
    VITE_TEAM_API_URL?: string;
};

export function getEnv(): ViteEnv {
    return (import.meta as unknown as { env?: ViteEnv }).env ?? {};
}
