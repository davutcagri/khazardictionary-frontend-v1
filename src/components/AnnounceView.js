import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const AnnounceView = (props) => {

    const { announcePage, onClickDeleteAnnnounce } = props;
    const { type, content } = announcePage;
    const { adminRole } = useSelector((store) => ({ adminRole: store.roleName.includes('ROLE_ADMIN') }));

    const [hasAdminRole, setHasAdminRole] = useState(false);

    let cardClassName = `alert alert-${type}`

    useEffect(() => {
        if(adminRole) {
            setHasAdminRole(true);
        }
    }, []);

    return (
        <div className='container'>

            <div className={cardClassName}>
                <div className='flex-fill'>
                    {hasAdminRole && <button className='btn btn-sm' onClick={onClickDeleteAnnnounce}>
                        <i className='material-icons'>delete</i>
                    </button>}
                    {content}
                    <button className='btn-close float-end' data-bs-dismiss='alert'></button>
                </div>
            </div>

        </div>
    );
}

export default AnnounceView;