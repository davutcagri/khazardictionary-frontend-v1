import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { addLike, deletePost, getPostByUsernameAndId, getUser, sendComment } from '../api/apiCalls';
import { format } from 'timeago.js';
import { useTranslation } from 'react-i18next';
import { ipv4 } from '../components/IpForImages';
import { useSelector } from 'react-redux';
import { useApiProgress } from '../shared/ApiProgress';
import Modal from '../components/Modal';
import ProfileImageWithDefaults from '../components/ProfileImageWithDefault';
import CommentSumbit from './CommentSumbit';
import CommentView from './CommentView';
import Spinner from './Spinner';

const PostView = (props) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [commentSumbitEnabled, setCommentSumbitEnabled] = useState(false);
    const [hasComment, setHasComment] = useState(false);
    const [post, setPost] = useState('');
    const [user, setUser] = useState('');
    const [likes, setLikes] = useState('');
    const [iLiked, setILiked] = useState('');
    const [userLogged, setUserLogged] = useState('');
    const [errors, setErrors] = useState({});
    const [accountVerified, setAccountVerified] = useState(false);

    const { username, id } = useParams();

    const { t, i18n } = useTranslation();

    const formatted = format(post.timestamp, i18n.language);
    const loggedInUser = useSelector(store => store.username);
    const ownedbyLoggedInUser = loggedInUser === username;
    const pendingApiCallDelete = useApiProgress('delete', `/api/posts/${id}`, true);
    const pendingApiCallLoadPost = useApiProgress('get', `/api/posts/${username}/${id}`);


    //ON CLICK DELETE
    const onClickDelete = async () => {
        const { history } = props;
        const { push } = history;
        await deletePost(id);
        setModalVisible(false);
        push('/')
    };

    //ON CLICK MODAL CANCEL
    const onClickCancel = () => {
        setModalVisible(false);
    };

    //ON CLICK LIKE
    const onClickLike = async () => {
        await addLike(id, username);
        if (iLiked === false) {
            if (likes !== post.likeCount) {
                setLikes(post.likeCount);
            }
            else {
                const newLikeCount = post.likeCount + 1;
                setLikes(newLikeCount);
            }
            setILiked(true);
        }
        else if (iLiked === true) {
            if (likes !== post.likeCount) {
                setLikes(post.likeCount);
            }
            else {
                const newLikeCount = post.likeCount - 1;
                setLikes(newLikeCount);
            }
            setILiked(false);
        }
    };

    //ON CLICK COMMENT
    const onClickComment = () => {

        if (!commentSumbitEnabled) {
            setCommentSumbitEnabled(true);
        }
        else {
            setCommentSumbitEnabled(false);
        }

    };

    useEffect(() => {
        const getPost = async () => {

            try {
                const postResponse = await getPostByUsernameAndId(username, id);
                const userResponse = await getUser(username);
                const loggedInUserResponse = await getUser(loggedInUser);

                setUserLogged(loggedInUserResponse.data);
                setUser(userResponse.data);
                setPost(postResponse.data.content[0]);
                setILiked(postResponse.data.content[0].iliked);
                setLikes(postResponse.data.content[0].likeCount);

                if (post.commentCount !== 0) {
                    setHasComment(true);
                }
                else {
                    setHasComment(false);
                }
            } catch (error) { }

        };
        getPost();
    }, [username, id]);

    useEffect(() => {
        if (user.verifiedAccount === true) {
            setAccountVerified(true);
        }
        else {
            setAccountVerified(false);
        }
    }, [user.verifiedAccount]);

    let likeButtonClassName = 'btn btn-like-link btn-sm mt-1';
    if (iLiked === true) {
        likeButtonClassName = 'btn btn-liked-link btn-sm mt-1';
    }

    if (pendingApiCallLoadPost) {
        return <Spinner />
    }

    return (
        <div className='container'>

            {/* NOT FOUND WARNING */}
            {!errors &&
                <div className='alert alert-primary text-center mb-1'>
                    <i className='material-icons'>warning</i>
                </div>
            }

            <div className='card mx-5'>
                <div className='card-header flex-fill'>
                    <div className='d-inline-flex'>

                        {/* PROFILE IMAGE */}
                        <ProfileImageWithDefaults
                            className='rounded-circle shadow mt-1 mx-1'
                            image={user.image}
                            width='90'
                            height='90'
                        />

                        <div className='row'>

                            {/* USERNAME */}
                            <Link className='d-flex mt-2 mx-2' to={`/user/${username}`} style={{ textDecoration: 'none', color: 'black', fontSize: '25px' }} >
                                {user.displayName} {accountVerified && <i className='material-icons text-primary-emphasis ms-2 mt-2' >verified</i>}
                            </Link>

                            {/* TIMESTAMP */}
                            <a className='mx-2 text-muted'>{formatted}</a>

                        </div>
                    </div>

                    {/* COUNTERS */}
                    <div className='float-end mt-3'>

                        <div className='text-muted text-end' style={{ textDecoration: 'none' }}>{likes} {t('like')}</div>
                        <div className='text-muted text-end' style={{ textDecoration: 'none' }}>{post.commentCount} {t('comment')}</div>

                    </div>
                </div>

                <div className='card-body'>

                    {/* POST TITLE */}
                    <h3>{post.title} </h3>

                    {/* POST CONTENT */}
                    <a>{post.content}</a>

                    {/* IMAGE */}
                    {post.fileAttachment && (
                        <div className='my-3'>
                            {post.fileAttachment.fileType.startsWith('image') && (
                                <img className='rounded-square' style={{ width: '40%', borderRadius: '8px' }}
                                    src={ipv4 + '/images/attachments/' + post.fileAttachment.name} alt={post.content} />
                            )}

                            {!post.fileAttachment.fileType.startsWith('image') && (
                                <strong>{t('unkownFileType')}</strong>
                            )}
                        </div>
                    )}

                </div>
                <div className='card-footer'>

                    {/* DELETE POST BUTTON */}
                    {ownedbyLoggedInUser && (
                        <button className='btn btn-delete-link btn-sm mt-1 float-end' onClick={() => setModalVisible(true)}>
                            <i className='material-icons'>delete_outline</i>
                        </button>
                    )}

                    {/* LIKE BUTTON */}
                    <button className={likeButtonClassName} onClick={onClickLike}>
                        <i className='material-icons'>favorite</i>
                    </button>

                    {/* COMMENT BUTTON */}
                    <button className='btn btn-comment-link btn-sm mt-1 mx-1' onClick={onClickComment}>
                        <i className='material-icons'>message</i>
                    </button>

                </div>

                <Modal
                    title={t('deletePost')}
                    button1={t('accept')}
                    button2={t('cancel')}
                    visible={modalVisible}
                    onClickCancel={onClickCancel}
                    onClickOk={onClickDelete}
                    pendingApiCall={pendingApiCallDelete}
                    message={t('deletePostParagraph')}
                />

            </div>

            {commentSumbitEnabled && <CommentSumbit userLogged={userLogged} id={id} setCommentSumbitEnabled={setCommentSumbitEnabled} />}
            {hasComment &&
                <div>
                    <h3 className='mx-5 mt-2 mb-2'>{t('comments')}</h3>
                    <CommentView id={id} />
                </div>
            }

        </div>
    );
}

export default PostView;