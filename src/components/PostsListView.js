import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import ProfileImageWithDefaults from './ProfileImageWithDefault';

const PostsListView = (props) => {


    const [hasAdminRole, setHasAdminRole] = useState(false);

    const { post } = props;
    const { user, timestamp, id, category, title, commentCount } = post;
    const { username, image, roleName } = user;

    const { t, i18n } = useTranslation();

    const formatted = format(timestamp, i18n.language);

    const onClickOpen = () => {
        props.push(`/posts/${username}/${id}`);
    };

    useEffect(() => {
        if (roleName.includes('ROLE_ADMIN')) {
            setHasAdminRole(true);
        }
    }, [hasAdminRole]);


    return (
        <div className='list-group m-3'>
            <button className='list-group-item list-group-item-action' onClick={onClickOpen}>
                <div className='d-flex'>

                    {/* PROFILE IMAGE */}
                    <ProfileImageWithDefaults
                        className='rounded-circle shadow mt-1 mx-1'
                        image={image}
                        width='32'
                        height='32'
                    />

                    <div className='flex-fill mx-2'>
                        <div className='d-inline-flex row'>
                            <div>

                                {/* POST TITLE */}
                                <a style={{ fontSize: '20px' }}>{title}</a>

                                {/* ADMIN TAG */}
                                {hasAdminRole && <span className="mx-2 badge bg-primary">ADMIN</span>}

                            </div>
                            <div className='text-muted' style={{ fontSize: '14px' }}>

                                {/* USER'S DISPLAYNAME */}
                                <a>{username} </a>

                                {/* TIMESTAMP */}
                                <a>• {formatted} </a>

                                {/* CATEGORY */}
                                <a>• {t(category)} </a>

                                {/* COMMENT COUNTER */}
                                <a>• {commentCount} {t('comment')}</a>

                            </div>
                        </div>
                    </div>
                </div>
            </button>
        </div>
    );
}

export default PostsListView;