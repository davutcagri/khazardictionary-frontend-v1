import React, { useEffect, useState } from 'react';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import { Link } from 'react-router-dom';

const UserListItem = (props) => {
    const { user } = props;
    const { username, displayName, image, roleName } = user;

    const [hasAdminRole, setHasAdminRole] = useState();
    const [verifiedAccount, setVerifiedAccount] = useState();

    useEffect(() => {
        if (roleName.includes("ROLE_ADMIN")) {
            setHasAdminRole(true);
        }
        else {
            setHasAdminRole(false);
        }
    }, []);

    return (
        <div>
            <Link to={`/user/${username}`} className='list-group-item list-group-item-action p-2'>
                <div className='d-flex'>
                    <ProfileImageWithDefaults className='rounded-circle ' width='35' height='35' alt={`${username} profile image`} image={image} />
                <span className='ms-2 mt-1'>{displayName}</span>
                {verifiedAccount && <i className='material-icons text-primary-emphasis ms-2 mt-1' >verified</i>}
                {hasAdminRole && <div className='ms-2 mt-1'><span className="badge bg-primary">ADMIN</span></div>}
                </div>
            </Link>
        </div>
    );
}

export default UserListItem;