import React from 'react';
import PostsListView from './PostsListView';
import Spinner from './Spinner';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getPost, getNewHoaxCount, getNewPosts, getOldPosts, getPostsByCategory } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';

const PostFeed = (props) => {
    const [postPage, setPostPage] = useState({ content: [], last: true, number: 0 });
    const [newPostCount, setNewPostCount] = useState(0);
    const { username } = useParams();
    const { t } = useTranslation();
    const { content, last } = postPage;
    const { postCategory } = props;

    let lastPostId = 0;
    let firstPostId = 0;

    if (postPage.content.length > 0) {
        firstPostId = postPage.content[0].id;

        const lastPostIndex = postPage.content.length - 1;
        lastPostId = postPage.content[lastPostIndex].id;
    }

    const path = username ? `/api"/users/${username}/posts?page=` : `/api/posts?page=`;
    const initialPostLoadProgress = useApiProgress('get', path);

    const oldPostPath = username ? `/api/users/${username}/posts/${lastPostId}` : `/api/posts/${lastPostId}`
    const loadOldPostProgress = useApiProgress('get', oldPostPath, true);

    const postCategoryPath = `/api/posts/${postCategory}`;
    const loadPostCategoryProgress = useApiProgress('get', postCategoryPath, true);

    const newPostPath = username ? `/api/users/${username}/posts/${firstPostId}?direction=after` : `/api/posts/${firstPostId}?direction=after`
    const loadNewPostProgress = useApiProgress('get', newPostPath, true);

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

    useEffect(() => {
        if (postCategory === 'allPosts') {
            const getCount = async () => {
                const response = await getNewHoaxCount(firstPostId, username);
                setNewPostCount(response.data.count);
            }

            let looper = setInterval(getCount, 5000);

            return function cleanUp() {
                clearInterval(looper);
            }
        }
    }, [firstPostId, username, postCategory]);

    useEffect(() => {
        if (postCategory !== 'allPosts') {
            const loadPostsByCategory = async () => {
                setPostPage({ content: [], last: true, number: 0 });
                try {
                    const response = await getPostsByCategory(postCategory);
                    setPostPage(() => ({
                        ...response.data,
                        content: [...response.data.content]
                    }));
                } catch (error) { }
            };
            loadPostsByCategory();
        }
        else {
            const loadPosts = async (page) => {
                setPostPage({ content: [], last: true, number: 0 });
                try {
                    const response = await getPost(username, page);
                    setPostPage(previousPostPage => ({
                        ...response.data,
                        content: [...previousPostPage.content, ...response.data.content]
                    }));
                } catch (error) { }
            };
            loadPosts();
        }
    }, [username, postCategory]);

    if (content.length === 0) {
        return (
            <div>
                <div className='alert alert-secondary text-center'>{initialPostLoadProgress || loadPostCategoryProgress ? <Spinner /> : t('noPost')}</div>
            </div>
        )
    }

    return (
        <div>
            {newPostCount > 0 && <div
                className='alert alert-secondary text-center mb-1'
                onClick={loadNewPostProgress ? () => { } : loadNewPosts}
                style={{ cursor: loadNewPostProgress ? 'not-allowed' : 'pointer' }}>
                {loadNewPostProgress ? <Spinner /> : t('loadNewPosts')}
            </div>}
            {content.map(post => {
                return <PostsListView key={post.id} post={post} push={props.push} />
            })}
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