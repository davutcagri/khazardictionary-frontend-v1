import React, { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import { addLike, changeCommentsLockStatus, deletePost } from '../api/apiCalls';
import { ipv4 } from './IpForImages';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import Modal from './Modal';
import CommentSumbit from './CommentSumbit';

const PostView = (props) => {

    const [post, setPost] = useState({});
    const [author, setAuthor] = useState({});
    const [likeCounter, setLikeCounter] = useState(0);
    const [commentCounter, setCommentCounter] = useState(0);
    const [isAuthor, setIsAuthor] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [commentSumbitVisible, setCommentSumbitVisible] = useState(false);
    const [commentSumbitButtonVisible, setCommentSumbitButtonVisible] = useState(true);
    const [isVerifiedAccount, setIsVerifiedAccount] = useState(false);
    const [iLiked, setILiked] = useState(false);

    const { t, i18n } = useTranslation();
    const { id, title, content, category, timestamp, fileAttachment, commentsLocked } = post;
    const formatted = format(timestamp, i18n.language);

    const { username: loggedInUsername } = useSelector((store) => ({ username: store.username }));

    useEffect(() => {
        setPost(props.post);
    }, [props.post]);

    useEffect(() => {
        setAuthor(props.author);
    }, [props.author]);

    useEffect(() => {
        setLikeCounter(props.post.likeCount);
        setCommentCounter(props.post.commentCount)
    }, [props.post.likeCounter, props.post.commentCounter]);

    useEffect(() => {
        if (props.author.username === loggedInUsername) {
            setIsAuthor(true);
        }
        else {
            setIsAuthor(false);
        }
    }, [loggedInUsername]);

    useEffect(() => {
        if (props.post.iliked) {
            setILiked(true);
        }
        else {
            setILiked(false);
        }
    }, [props.post.iliked]);

    useEffect(() => {
        if (props.author.verifiedAccount) {
            setIsVerifiedAccount(true);
        }
        else {
            setIsVerifiedAccount(false);
        }
    }, [props.author.verifiedAccount]);

    const onClickAcceptDeletePost = async () => {
        await deletePost(post.id);
        setDeleteModalVisible(false);
        props.push('/')
    };

    const onClickLike = async () => {
        await addLike(id)
        window.location.reload(false);
        if (!iLiked) {
            setILiked(true);
        }
        else {
            setILiked(false);
        }
    };

    const onClickComment = async () => {
        if (!commentSumbitVisible) {
            setCommentSumbitVisible(true);
        }
        else {
            setCommentSumbitVisible(false);
        }
    };

    const onClickChangeCommentLockStatus = async () => {
        await changeCommentsLockStatus(id);
        window.location.reload(false);
    }

    let likeButtonClassName = 'btn btn-like-link btn-sm float-end mt-1';
    if (iLiked) {
        likeButtonClassName = 'btn btn-liked-link btn-sm float-end mt-1'
    }

    return (
        <>
            <div className='container d-flex'>
                {/* USER DETAILS CARD */}
                <div className='col-2 card text-center pt-3' onClick={() => { props.push(`/user/${author.username}`) }} style={{ cursor: 'pointer' }}>

                    {/* AUTHOR PROFILE IMAGE */}
                    <div className='text-center' >
                        <ProfileImageWithDefaults
                            className='rounded-circle shadow'
                            width='100'
                            height='100'
                            alt={`${author.username} profile image`}
                            image={author.image} />
                    </div>

                    {/* AUTHOR DISPLAY NAME */}
                    <div className='text-center'>
                        <h3>{author.displayName}</h3>
                        {isVerifiedAccount && <i className='material-icons text-primary-emphasis' >verified</i>}
                    </div>

                    {/* TIMESTAMP */}
                    <h6 className='text-muted'>{formatted}</h6>

                    {/* CATEGORY */}
                    <h6 className='text-muted'>{t(category)}</h6>

                    {/* LIKE COUNTER */}
                    <h6 className='text-muted'>{likeCounter} {t('like')}</h6>

                    {/* COMMENT COUNTER */}
                    <h6 className='text-muted'>{commentCounter} {t('comment')}</h6>

                </div>

                {/* POST DETAILS CARD */}
                <div className='col-9 card ms-3'>
                    {/* POST TITLE */}
                    <div className='card-header'>
                        <h4 style={{ marginBottom: '0' }}>{title}</h4>
                    </div>

                    {/* POST CONTENT */}
                    <div className='card-body'>
                        <p>{content}</p>
                    </div>

                    {/* IMAGE */}
                    {fileAttachment && (
                        <div className='my-3 text-center'>
                            {fileAttachment.fileType.startsWith('image') && (
                                <img className='rounded-square' style={{ width: '40%', borderRadius: '8px' }}
                                    src={ipv4 + '/images/attachments/' + fileAttachment.name} alt={content} />
                            )}

                            {!fileAttachment.fileType.startsWith('image') && (
                                <strong>{t('unkownFileType')}</strong>
                            )}
                        </div>
                    )}

                    {/* POST ACTIONS */}
                    <div className='card-footer'>

                        {/* DELETE BUTTON */}
                        {isAuthor &&
                            <button className='btn btn-delete-link btn-sm float-start mt-1' onClick={() => { setDeleteModalVisible(true) }}>
                                <i className='material-icons'>delete_outline</i>
                            </button>
                        }

                        {/* COMMENTS LOCKED BUTTON */}
                        {isAuthor && commentsLocked &&
                            <button className='btn btn-locked-link btn-sm float-start mt-1' onClick={onClickChangeCommentLockStatus}>
                                <i className='material-icons'>lock</i>
                            </button>
                        }

                        {/* COMMENTS UNLOCKED BUTTON */}
                        {isAuthor && !commentsLocked &&
                            <button className='btn btn-unlocked-link btn-sm float-start mt-1' onClick={onClickChangeCommentLockStatus}>
                                <i className='material-icons'>lock_open</i>
                            </button>
                        }

                        {/* COMMENT BUTTON */}
                        {!commentsLocked && <button className='btn btn-comment-link btn-sm float-end mt-1 ms-2' onClick={onClickComment} visible={commentSumbitButtonVisible}>
                            <i className='material-icons'>comment</i>
                        </button>}

                        {/* LIKE BUTTON */}
                        <button className={likeButtonClassName} onClick={onClickLike}>
                            <i className='material-icons'>favorite</i>
                        </button>

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
            </div>
            <div className='mt-3'>
                {commentSumbitVisible && <CommentSumbit postId={id} />}
                {commentCounter > 0 &&
                    <h3 className='container mt-2'>{t('comments')}</h3>
                }
            </div>
        </>
    );
}

export default PostView;