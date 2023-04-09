import React from 'react';
import PostView from '../components/PostView';

const PostPage = (props) => {

    const { history } = props;

    return (

        <div className='container'>

            <PostView history={history} />

        </div>

    );
}

export default PostPage;