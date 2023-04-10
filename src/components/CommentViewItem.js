import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { format } from 'timeago.js';
import { useApiProgress } from '../shared/ApiProgress';
import { deleteComment } from '../api/apiCalls';
import { useSelector } from 'react-redux';
import Modal from '../components/Modal';
import ProfileImageWithDefaults from './ProfileImageWithDefault';

const CommentViewItem = (props) => {

    const [modalEnabled, setModalEnabled] = useState(false);

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

    return (
        <div className='container'>

            <div className='card mx-5 mt-1 mb-3'>

                <div className='card-header d-flex'>

                    {/* PROFILE IMAGE */}
                    <ProfileImageWithDefaults
                        className='rounded-circle shadow mt-1 mx-1'
                        image={comment.user.image}
                        width='32'
                        height='32'
                    />

                    {/* USER DISPLAYNAME */}
                    <Link className='mt-1 mx-1 text-dark' style={{ textDecoration: 'none' }} to={`/user/${comment.user.username}`}>
                        {comment.user.displayName}
                    </Link>

                    <a className='text-muted mt-1' style={{ textDecoration: 'none' }}> - {formatted}</a>
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
                    {ownedbyLoggedInUser && <button className='btn btn-delete-link btn-sm mt-1 float-end' onClick={() => { setModalEnabled(true) }}>
                        <i className='material-icons'>delete_outline</i>
                    </button>}

                </div>

            </div>

            <Modal
                visible={modalEnabled}
                onClickCancel={() => setModalEnabled(false)}
                onClickOk={onClickDelete}
                pendingApiCall={pendingApiCall}
                message={
                    <div>
                        <div><strong>{t('modalDeleteCommentParagraph')}</strong></div>
                        <span>{comment.content}</span>
                    </div>
                }
            />

        </div>
    );
}

export default CommentViewItem;