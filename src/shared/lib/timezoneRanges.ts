import type { TimezoneRange } from '../../features/filters/model/filter-types';

export function matchTimezone(offset: number, range: TimezoneRange): boolean {
    switch (range) {
        case 'america':
            return offset <= -3;
        case 'europe':
            return offset >= -2 && offset <= 3;
        case 'asia':
            return offset >= 4;
        default:
            return true;
    }
}
