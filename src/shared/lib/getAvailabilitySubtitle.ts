import type { Availability } from '../../entities/team/model/team';

export function getAvailabilitySubtitle(a: Availability): string {
    switch (a) {
        case 'available':
            return 'Can talk now (and will)';
        case 'focus':
            return 'Deep work. Approach quietly.';
        case 'in_meeting':
            return 'In a meeting. Probably muted.';
        case 'offline':
            return 'Away from keyboard. Living their best life.';
        default:
            return '';
    }
}
