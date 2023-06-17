import React, { useEffect, useState } from 'react';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import { Link, useLocation } from 'react-router-dom';
import { addAdminRole, deleteAdminRole } from '../api/apiCalls';

const UserListItem = (props) => {
    const { user } = props;
    const { username, displayName, image, roleName, verifiedAccount } = user;

    const [hasAdminRole, setHasAdminRole] = useState();
    const [accountVerified, setAccountVerified] = useState();
    const [onAdminPanel, setOnAdminPanel] = useState(false);

    const location = useLocation();

    const onClickAddAdminRole = async () => {
        await addAdminRole(username);
        setHasAdminRole(true);
    };
    
    const onClickDeleteAdminRole = async () => {
        if(username !== 'davutcagri') {
            await deleteAdminRole(username);
            setHasAdminRole(false);
        }
    };

    useEffect(() => {
        if (roleName.includes("ROLE_ADMIN")) {
            setHasAdminRole(true);
        }
        else {
            setHasAdminRole(false);
        }
    }, []);

    useEffect(() => {
        if (verifiedAccount === true) {
            setAccountVerified(true);
        }
        else {
            setAccountVerified(false);
        }
    }, [verifiedAccount]);

    useEffect(() => {
        if (location.pathname === "/adminpanel") {
            setOnAdminPanel(true);
        }
        else {
            setOnAdminPanel(false);
        }
    }, []);

    return (
        <div className='d-flex'>
            <Link to={`/user/${username}`} className='list-group-item list-group-item-action p-2'>
                <div className='d-flex'>
                    <ProfileImageWithDefaults className='rounded-circle ' width='35' height='35' alt={`${username} profile image`} image={image} />
                    <span className='ms-2 mt-1'>{displayName}</span>
                    {accountVerified && !onAdminPanel && <i className='material-icons text-primary-emphasis ms-2 mt-1' >verified</i>}
                    {hasAdminRole && !onAdminPanel && <div className='ms-2 mt-1'><span className="badge bg-primary">ADMIN</span></div>}
                </div>
            </Link>
            <div className='m-auto'>
                {onAdminPanel && !hasAdminRole &&
                    <button className='btn btn-success d-inline-flex ms-auto justify-content-center' onClick={onClickAddAdminRole}>
                        <i className='material-icons'>military_tech</i>
                    </button>
                }
                {onAdminPanel && hasAdminRole &&
                    <button className='btn btn-danger d-inline-flex ms-auto justify-content-center' onClick={onClickDeleteAdminRole}>
                        <i className='material-icons'>person_remove</i>
                    </button>
                }
            </div>
        </div>
    );
}

export default UserListItem;