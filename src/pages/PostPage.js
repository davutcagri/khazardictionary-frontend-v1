import React from 'react';
import PostView from '../components/PostView';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { getCommentsByPost, getPost } from '../api/apiCalls';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from '../components/Spinner';
import CommentView from '../components/CommentView';

const PostPage = (props) => {

    const [post, setPost] = useState({});
    const [author, setAuthor] = useState({});
    const [notFound, setNotFound] = useState();
    const [commentPage, setCommentPage] = useState({ content: [], size: 5, number: 0 });
    const { id } = useParams();
    const { t } = useTranslation();

    const { content, first, last } = commentPage;

    const pendingApiCallForPost = useApiProgress('get', `/api/posts/view/${id}`, true);
    const pendingApiCallForComments = useApiProgress('get', `/api/posts/${id}/comments?page=`);

    const getPostComments = async (page) => {
        setCommentPage({ content: [], size: 5, number: 0 });
        try {
            const response = await getCommentsByPost(id, page);
            setCommentPage(response.data);
        } catch (error) { }
    };

    const onClickPrevious = async () => {
        const previousPage = commentPage.number - 1;
        getPostComments(previousPage);
    };

    const onClickNext = async () => {
        const nextPage = commentPage.number + 1;
        getPostComments(nextPage);
    };

    useEffect(() => {
        const loadPost = async () => {
            setPost({})
            setAuthor({})
            try {
                setNotFound(false)
                const response = await getPost(id);
                setPost(response.data);
                setAuthor(response.data.author);
            } catch (error) { setNotFound(true) }
        };
        loadPost();
    }, [id]);

    useEffect(() => {
        getPostComments();
    }, [id]);

    if (notFound) {
        return (
            <div className='container'>
                <div className="alert alert-danger text-center" role="alert">
                    <div><i className='material-icons' style={{ fontSize: '48px' }}>error</i></div>
                    {t('postNotFound')}
                </div>
            </div>
        );
    }

    if (pendingApiCallForPost || pendingApiCallForComments) {
        return (<Spinner />);
    }

    let actionDiv = (
        <div className='text-center mb-5'>
            {first === false &&
                <button
                    className='btn btn-primary me-1'
                    onClick={onClickPrevious}>{t('previous')}</button>}
            {last === false &&
                <button
                    className='btn btn-primary ms-1'
                    onClick={onClickNext}>{t('next')}</button>}
        </div>
    );

    return (

        <div className='container'>
            <PostView post={post} author={author} push={props.history.push} />
            {content.map(comment => {
                return <CommentView key={comment.id} comment={comment} push={props.history.push} />
            })}
            {actionDiv}
        </div>

    );
}

export default PostPage;