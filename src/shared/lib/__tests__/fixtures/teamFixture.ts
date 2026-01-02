import type { TeamMember } from '../../../../entities/team/model/team';

export const teamFixture: TeamMember[] = [
    {
        id: '1',
        name: 'Alice Johnson',
        role: 'Frontend Developer',
        timezoneOffset: 1,
        availability: 'available',
        skills: ['React', 'TypeScript'],
    },
    {
        id: '2',
        name: 'Bob Stone',
        role: 'Backend Engineer',
        timezoneOffset: -5,
        availability: 'in_meeting',
        skills: ['Node.js', 'PostgreSQL'],
    },
    {
        id: '3',
        name: 'Chen Li',
        role: 'Product Designer',
        timezoneOffset: 8,
        availability: 'focus',
        skills: ['Figma', 'UX Research'],
    },
    {
        id: '4',
        name: 'Dana Fox',
        role: 'QA Engineer',
        timezoneOffset: 3,
        availability: 'in_meeting',
        skills: ['Playwright', 'Testing'],
    },
    {
        id: '5',
        name: 'Trevor Bob Rust',
        role: 'Product Designer',
        timezoneOffset: 2,
        availability: 'offline',
        skills: ['UI Design', 'Prototyping', 'User Testing'],
    },
];
