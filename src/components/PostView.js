import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { deletePost, addLike } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import { ipv4 } from './IpForImages';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import Modal from './Modal';

const PostView = (props) => {
    const { post, onDeletePost } = props;
    const { user, content, timestamp, fileAttachment, id, likeCount, iliked, category } = post;
    const { username, displayName, image } = user;

    const [modalVisible, setModalVisible] = useState(false);
    const [likes, setLikes] = useState(likeCount);
    const [iLiked, setILiked] = useState(iliked);

    const { t, i18n } = useTranslation();
    const loggedInUser = useSelector(store => store.username);

    const formatted = format(timestamp, i18n.language);

    const ownedbyLoggedInUser = loggedInUser === username;

    const pendingApiCall = useApiProgress('delete', `/api/1.0/posts/${id}`, true);

    const onClickDelete = async () => {
        await deletePost(id);
        onDeletePost(id);
    };

    const onClickCancel = () => {
        setModalVisible(false);
    };

    const onClickLike = async () => {
        await addLike(id, username);
        if (iLiked === false) {
            if (likes !== likeCount) {
                setLikes(likeCount);
            }
            else {
                const newLikeCount = likeCount + 1;
                setLikes(newLikeCount);
            }
            setILiked(true);
        }
        else if (iLiked === true) {
            if (likes !== likeCount) {
                setLikes(likeCount);
            }
            else {
                const newLikeCount = likeCount - 1;
                setLikes(newLikeCount);
            }
            setILiked(false);
        }
    };

    let likeButtonClassName = 'btn btn-like-link btn-sm float-end d-flex';
    if (iLiked === true) {
        likeButtonClassName = 'btn btn-liked-link btn-sm float-end d-flex';
    }

    let categoryName;
    if (category === 'questions') {
        categoryName = t('questions');
    }
    else if (category === 'dormitories') {
        categoryName = t('dormitories');
    }
    else if (category === 'houseMate') {
        categoryName = t('houseMate');
    }
    else if (category === 'lostItems') {
        categoryName = t('lostItems');
    }
    else if (category === 'studentStore') {
        categoryName = t('studentStore')
    }
    else if (category === 'others') {
        categoryName = t('others');
    }

    return (
        <>
            <div className='card m-3'>
                <div className='d-flex card-header'>
                    <ProfileImageWithDefaults
                        className='rounded-circle mt-1 mx-1'
                        image={image}
                        width='32'
                        height='32'
                    />
                    <div className='flex-fill m-auto mt-2 mx-2'>
                        <Link className='text-dark' to={`/user/${username}`} style={{ textDecoration: 'none' }}>
                            <h6 className='d-inline'>
                                {displayName}
                            </h6>
                            <span> - </span>
                            <span>{formatted}</span>
                        </Link>
                        {ownedbyLoggedInUser && (
                            <button className='btn btn-delete-link btn-sm float-end' onClick={() => setModalVisible(true)}>
                                <i className='material-icons'>delete_outline</i>
                            </button>
                        )}
                        <button className={likeButtonClassName} onClick={onClickLike}>
                            <strong>{likes} - </strong><i className='material-icons'>favorite</i>
                        </button>
                    </div>
                </div>
                <div className='ms-5 mt-2'>
                    <p>{content}</p>
                </div>
                {fileAttachment && (
                    <div className='text-center pb-5 px-5'>
                        {fileAttachment.fileType.startsWith('image') && (
                            <img className='rounded-square' style={{ width: '80%', borderRadius: '8px' }} src={ipv4 + '/images/attachments/' + fileAttachment.name} alt={content} />
                        )}

                        {!fileAttachment.fileType.startsWith('image') && (
                            <strong>{t('unkownFileType')}</strong>
                        )}
                    </div>
                )}
                <div className='card-footer'>
                    <span className='fw-light'>{t('category')}: {categoryName}</span>
                </div>
            </div>
            <Modal
                visible={modalVisible}
                onClickCancel={onClickCancel}
                onClickOk={onClickDelete}
                pendingApiCall={pendingApiCall}
                message={
                    <div>
                        <div><strong>{t('modalDeletePostParagraph')}</strong></div>
                        <span>{content}</span>
                    </div>
                }
            />
        </>
    );
}

export default PostView;