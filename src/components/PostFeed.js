import React from 'react';
import { useState } from 'react';
import { getNewPosts, getNewPostsCount, getOldPosts, getPosts, getPostsByCategory } from '../api/apiCalls';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import PostListView from './PostListView';
import Spinner from './Spinner';

const PostFeed = (props) => {

    const [postPage, setPostPage] = useState({ content: [], last: true, number: 0 })
    const [noPost, setNoPost] = useState(false);
    const [newPostCount, setNewPostCount] = useState(0);
    const { username } = useParams();
    const { t } = useTranslation();
    const { content, last } = postPage;
    const { postCategory, push } = props;

    let lastPostId = 0;
    let firstPostId = 0;

    if (postPage.content.length > 0) {
        firstPostId = postPage.content[0].id;

        const lastPostIndex = postPage.content.length - 1;
        lastPostId = postPage.content[lastPostIndex].id;
    }

    const getAllPostsPath = username ? `/api/users/${username}/posts?page=` : `/api/posts?page=`;
    const pendingApiCallForGetAll = useApiProgress('get', getAllPostsPath);

    const getPostsByCategoryPath = `/api/${postCategory}/posts`;
    const pendingApiCallForGetByCategory = useApiProgress('get', getPostsByCategoryPath);

    const newPostPath = username ? `/api/users/${username}/posts/${firstPostId}?direction=after` : `/api/posts/${firstPostId}?direction=after`
    const loadNewPostProgress = useApiProgress('get', newPostPath, true);

    const oldPostPath = username ? `/api/users/${username}/posts/${lastPostId}` : `/api/posts/${lastPostId}`
    const loadOldPostProgress = useApiProgress('get', oldPostPath, true);

    const loadNewPosts = async () => {
        const response = await getNewPosts(firstPostId, username);
        setPostPage(previousPostPage => ({
            ...previousPostPage,
            content: [...response.data, ...previousPostPage.content]
        }));
        setNewPostCount(0);
    };

    const loadOldPosts = async () => {
        const response = await getOldPosts(lastPostId, username);
        setPostPage(previousPostPage => ({
            ...response.data,
            content: [...previousPostPage.content, ...response.data.content]
        }));
    };

    //LOAD POSTS
    useEffect(() => {
        if (postCategory !== 'allPosts') {
            const loadPostsByCategory = async () => {
                setNoPost(false);
                setPostPage({ content: [], last: true, number: 0 });
                try {
                    const response = await getPostsByCategory(postCategory);
                    setPostPage(post => ({
                        ...response.data,
                        content: [...post.content, ...response.data.content]
                    }));
                    if (response.data.content.length === 0) {
                        setNoPost(true);
                    }
                } catch (error) { }
            };
            loadPostsByCategory();
        }
        else {
            const loadAllPosts = async (page) => {
                setNoPost(false);
                setPostPage({ content: [], last: true, number: 0 });
                try {
                    const response = await getPosts(username, page);
                    setPostPage(post => ({
                        ...response.data,
                        content: [...post.content, ...response.data.content]
                    }));
                } catch (error) { }
            };
            loadAllPosts();
        }
    }, [username, postCategory]);

    useEffect(() => {
        if (postCategory === 'allPosts') {
            const getCountsOfPosts = async () => {
                const response = await getNewPostsCount(firstPostId, username);
                setNewPostCount(response.data.count);
            }
            let looper = setInterval(getCountsOfPosts, 5000);

            return function cleanUp() {
                clearInterval(looper);
            }
        }
    }, [firstPostId, username, postCategory]);

    //NO POST WARNING
    if (noPost) {
        return (
            <div className='container'>
                <div className="alert alert-info text-center" role="alert">
                    <div><i className='material-icons' style={{ fontSize: '48px' }}>info</i></div>
                    {t('noPost')}
                </div>
            </div>
        );
    }

    //SPINNER FOR PENDING API CALL
    if (pendingApiCallForGetAll || pendingApiCallForGetByCategory) {
        return (<Spinner />);
    }


    return (
        <div>
            {/* GET NEW POSTS */}
            {newPostCount > 0 && <div
                className='alert alert-secondary text-center mb-1'
                onClick={loadNewPostProgress ? () => { } : loadNewPosts}
                style={{ cursor: loadNewPostProgress ? 'not-allowed' : 'pointer' }}>
                {loadNewPostProgress ? <Spinner /> : t('loadNewPosts')}
            </div>}

            {content.map(post => {
                return <PostListView key={post.id} post={post} push={push} />
            })}

            {/* GET OLD POSTS */}
            {!last && <div
                className='alert alert-secondary text-center'
                onClick={loadOldPostProgress ? () => { } : loadOldPosts}
                style={{ cursor: loadOldPostProgress ? 'not-allowed' : 'pointer' }}>
                {loadOldPostProgress ? <Spinner /> : t('loadOldPosts')}
            </div>}
        </div>
    );
}

export default PostFeed;