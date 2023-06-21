import React, { useState } from 'react';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deletePost } from '../api/apiCalls';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import Modal from './Modal';

const PostListView = (props) => {

    const { post, push } = props;
    const { id, author, title, category, likeCount, commentCount, timestamp } = post

    const { currentUserUsername } = useSelector((store) => ({ currentUserUsername: store.username }));
    const { t, i18n } = useTranslation();
    const formatted = format(timestamp, i18n.language);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const [isAuthor, setIsAuthor] = useState(currentUserUsername === author.username);

    const onClickAcceptDeletePost = async () => {
        await deletePost(id);
        setDeleteModalVisible(false);
        window.location.reload(false);
    }

    return (
        <>
            <div className='card mb-3'>
                <div className='card-body'>
                    <button className='list-group-item list-group-item-action' onClick={() => { push(`/posts/${author.username}/${id}`) }}>
                        <div className='d-inline-flex'>
                            {/* AUTHOR PROFILE IMAGE */}
                            <ProfileImageWithDefaults
                                className='rounded-circle shadow'
                                width='32'
                                height='32'
                                alt={`${author.username} profile image`}
                                image={author.image} />

                            {/* AUTHOR DISPLAY NAME */}
                            <h6 className='mt-1 ms-2'>{title}</h6>
                        </div>
                    </button>
                </div>

                <div className='card-footer'>
                    <div className='text-muted'>
                        {/* INFO ABOUT POST */}
                        <a>{author.username} </a>
                        <a>• {formatted} </a>
                        <a>• {t(category)} </a>
                        <a>• {commentCount} {t('comment')} </a>
                        <a>• {likeCount} {t('like')}</a>

                        {/* DELETE BUTTON FOR AUTHOR */}
                        {isAuthor &&
                            <button className='btn btn-delete-link btn-sm float-end' onClick={() => { setDeleteModalVisible(true) }}>
                                <i className='material-icons'>delete_outline</i>
                            </button>
                        }
                    </div>
                </div>
            </div>
            <Modal
                visible={deleteModalVisible}
                title={t('deletePost')}
                message={t('deletePostParagraph')}
                button1={t('accept')}
                button2={t('cancel')}
                onClickOk={onClickAcceptDeletePost}
                onClickCancel={() => { setDeleteModalVisible(false) }} />
        </>
    );
}

export default PostListView;