import React, { useEffect, useState } from 'react';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import { Link, useLocation } from 'react-router-dom';
import { addAdminRole, deleteAdminRole } from '../api/apiCalls';

const UserListItem = (props) => {
    const { user } = props;
    const { username, displayName, image } = user;

    const [canBeAdmin, setCanBeAdmin] = useState(false);
    const [canBeUserAgain, setCanBeUserAgain] = useState(false);
    const [noAdminPage, setNoAdminPage] = useState();

    const location = useLocation();

    const onClickBeAdmin = async () => {
        try {
            await addAdminRole(user.username);
            setCanBeAdmin(false);
            setCanBeUserAgain(true);
        } catch (error) { }
    };

    const onClickBeUser = async () => {
        try {
            await deleteAdminRole(user.username);
            setCanBeAdmin(true);
            setCanBeUserAgain(false);
        } catch (error) { }
    };
    
    useEffect(() => {
        if (location.pathname === '/adminPanel' && !user.roleName.includes('ROLE_ADMIN')) {
            setNoAdminPage(false);
            if (username === 'davutcagri') {
                setCanBeAdmin(false);
            }
            else {
                setCanBeAdmin(true);
            }
        }
        else if (location.pathname === '/adminPanel' && user.roleName.includes('ROLE_ADMIN')) {
            setNoAdminPage(false);
            if (username === 'davutcagri') {
                setCanBeUserAgain(false);
            }
            else {
                setCanBeUserAgain(true);
            }
        }
        else if (user.roleName.includes('ROLE_ADMIN')) {
            setNoAdminPage(true);
        }
    }, []);


    return (
        <div>
            <div className='d-flex'>
                <Link to={`/user/${username}`} className='list-group-item list-group-item-action'>
                    <ProfileImageWithDefaults className='rounded-circle' width='32' height='32' alt={`${username} profile image`} image={image} />
                    <span className='ps-2'>
                        {displayName}
                    </span>
                    {noAdminPage && <span className="mx-2 badge bg-primary">ADMIN</span>}
                </Link>
                {canBeAdmin && <button className='btn btn-primary float-end' onClick={onClickBeAdmin}>ADMIN</button>}
                {canBeUserAgain && <button className='btn btn-primary float-end' onClick={onClickBeUser}>USER</button>}
            </div>
        </div>
    );
}

export default UserListItem;