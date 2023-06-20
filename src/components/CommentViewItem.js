import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'timeago.js';
import { useApiProgress } from '../shared/ApiProgress';
import { deleteComment, getUser } from '../api/apiCalls';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal';
import ProfileImageWithDefaults from './ProfileImageWithDefault';

const CommentViewItem = (props) => {

    const [modalEnabled, setModalEnabled] = useState(false);
    const [hasAdminRole, setHasAdminRole] = useState(false);
    const [accountVerified, setAccountVerified] = useState(false);

    const { comment, getPostCommet } = props;
    const { t, i18n } = useTranslation();
    const loggedInUser = useSelector(store => store.username);
    const ownedbyLoggedInUser = loggedInUser === comment.user.username;

    const pendingApiCall = useApiProgress('delete', `/api/comments/${comment.id}`, true);

    const formatted = format(comment.timestamp, i18n.language);

    //COMMET DELETE
    const onClickDelete = async () => {
        await deleteComment(comment.id);
        setModalEnabled(false);
        getPostCommet();
    };

    useEffect(() => {
        if (comment.user.roleName.includes('ROLE_ADMIN')) {
            setHasAdminRole(true);
        }
    }, [hasAdminRole]);

    useEffect(() => {
        if (comment.user.verifiedAccount === true) {
            setAccountVerified(true);
        }
        else {
            setAccountVerified(false);
        }
    }, [comment.user.verifiedAccount]);

    return (
        <div className='container'>

            <div className='card mx-5 mt-1 mb-3'>

                <div className='card-header d-flex'>

                    {/* PROFILE IMAGE */}
                    <ProfileImageWithDefaults
                        className='rounded-circle shadow mt-1 mx-1'
                        image={comment.user.image}
                        width='35'
                        height='35'
                    />

                    {/* USER DISPLAYNAME */}
                    <Link className='mt-2 text-dark' style={{ textDecoration: 'none' }} to={`/user/${comment.user.username}`}>
                        <span className='ms-2'>
                            {comment.user.displayName}
                        </span>
                    </Link>

                    {/* VERIFIED LOGO */}
                    {accountVerified && <i className='material-icons text-primary-emphasis ms-2 mt-2' >verified</i>}

                    {/* ADMIN TAG */}
                    <div className='mt-2'>
                        {hasAdminRole &&
                            <span className="mx-2 badge bg-primary">ADMIN</span>
                        }
                    </div>

                    {/* TIMESTAMP */}
                    <a className='text-muted mt-2' style={{ textDecoration: 'none' }}> - {formatted}</a>

                </div>

                <div className='card-body'>

                    <a>{comment.content}</a>

                </div>

                <div className='card-footer'>

                    {/* LIKE BUTTON */}
                    {/* <button className='btn btn-like-link btn-sm mt-1 mx-1'>
                        <i className='material-icons'>favorite</i>
                    </button> */}

                    {/* DELETE BUTTON */}
                    {ownedbyLoggedInUser &&
                        <button className='btn btn-delete-link btn-sm mt-1 float-end' onClick={() => { setModalEnabled(true) }}>
                            <i className='material-icons'>delete_outline</i>
                        </button>
                    }

                </div>

            </div>

            <Modal
                visible={modalEnabled}
                title={t('deleteComment')}
                button1={t('accept')}
                button2={t('cancel')}
                onClickCancel={() => setModalEnabled(false)}
                onClickOk={onClickDelete}
                pendingApiCall={pendingApiCall}
                message={t('deleteCommentParaagraph')}
            />

        </div>
    );
}

export default CommentViewItem;