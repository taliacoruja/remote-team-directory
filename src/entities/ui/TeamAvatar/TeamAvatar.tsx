import { useState } from 'react';
import { getInitials } from '../../../shared/lib/getInitials';
import './TeamAvatar.css';

type Props = {
    id: string;
    name: string;
};

export function TeamAvatar({ id, name }: Props) {
    const avatarUrl = `https://picsum.photos/200?random=${id}`;
    const [imageError, setImageError] = useState(false);
    const initials = getInitials(name);

    return (
        <div className='card__avatar-wrap'>
            {!imageError ? (
                <img
                    className='card__avatar avatar'
                    src={avatarUrl}
                    alt={`${name} avatar`}
                    loading='lazy'
                    onError={() => setImageError(true)}
                />
            ) : (
                <span className='card__avatar-fallback'>{initials}</span>
            )}
        </div>
    );
}
