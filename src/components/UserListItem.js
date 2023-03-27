import React from 'react';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
    const { user } = props;
    const { username, displayName, image } = user;

    return (
        <Link to={`/user/${username}`} className='list-group-item list-group-item-action'>
            <ProfileImageWithDefaults className='rounded-circle' width='32' height='32' alt={`${username} profile image`} image={image} />
            <span className='ps-2'>
                {displayName}
            </span>
        </Link>
    );
}

export default UserListItem;