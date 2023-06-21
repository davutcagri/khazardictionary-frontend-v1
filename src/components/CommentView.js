import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { deleteComment } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import Modal from './Modal';
import { format } from 'timeago.js';

const CommentView = (props) => {

    const [isVerifiedAccount, setIsVerifiedAccount] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const { username: loggedInUsername } = useSelector((store) => ({ username: store.username }));
    const { t, i18n } = useTranslation();

    const { id, content, author, timestamp } = props.comment;
    const formatted = format(timestamp, i18n.language);

    useEffect(() => {
        if (author.verifiedAccount) {
            setIsVerifiedAccount(true);
        }
        else {
            setIsVerifiedAccount(false);
        }
    }, [author.verifiedAccount]);

    useEffect(() => {
        if (author.username === loggedInUsername) {
            setIsAuthor(true);
        }
        else {
            setIsAuthor(false);
        }
    }, [loggedInUsername]);

    const onClickAcceptDeletePost = async () => {
        await deleteComment(id);
        window.location.reload(false);
    };

    return (
        <div className='container d-flex mb-5'>
            {/* COMMENT AUTHOR DETAILS */}
            <div className='col-2 card text-center pt-3'>
                <div className='text-center' onClick={() => { props.push(`/user/${author.username}`) }} style={{ cursor: 'pointer' }} >
                    {/* AUTHOR PROFILE IMAGE */}
                    <ProfileImageWithDefaults
                        className='rounded-circle shadow'
                        width='100'
                        height='100'
                        alt={`${author.username} profile image`}
                        image={author.image} />

                    {/* AUTHOR DISPLAY NAME */}
                    <div className='text-center'>
                        <h3>{author.displayName}</h3>
                        {isVerifiedAccount && <i className='material-icons text-primary-emphasis' >verified</i>}
                    </div>

                    {/* TIMESTAMP */}
                    <h6 className='text-muted'>{formatted}</h6>

                </div>
            </div>

            {/* COMMENT DETAILS */}
            <div className='col-9 card ms-3'>

                {/* CONTENT */}
                <div className='card-body'>
                    <p>{content}</p>
                </div>

                {/* COMMENT FOOTER */}
                <div className='card-footer'>

                    {/* DELETE BUTTON */}
                    {isAuthor &&
                        <button className='btn btn-delete-link btn-sm float-start mt-1' onClick={() => { setDeleteModalVisible(true) }}>
                            <i className='material-icons'>delete_outline</i>
                        </button>
                    }

                </div>
            </div>
            <Modal
                visible={deleteModalVisible}
                title={t('deleteComment')}
                message={t('deleteCommentParagraph')}
                button1={t('accept')}
                button2={t('cancel')}
                onClickOk={onClickAcceptDeletePost}
                onClickCancel={() => { setDeleteModalVisible(false) }} />
        </div>
    );
}

export default CommentView;