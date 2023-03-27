import React, { useState } from 'react';
import PostFeed from '../components/PostFeed';
import PostSumbit from '../components/PostSumbit';
import UserList from '../components/UserList';
import PostCategories from '../components/PostCategories';
import { useSelector } from 'react-redux';

const HomePage = () => {
    const { isLoggedIn } = useSelector((store) => ({ isLoggedIn: store.isLoggedIn }));
    const [postCategory, setPostCategory] = useState('allPosts');

    const onClick = async (event) => {
        setPostCategory(event.target.name);
    };

    return (
        <div className='container'>
            <div className='row justify-content-end'>
                <div className='col-3'>
                    <PostCategories
                        onClick={onClick}
                    />
                </div>
                <div className='col-6'>
                    {isLoggedIn &&
                        <div className='mb-2'>
                            <PostSumbit />
                            <PostFeed postCategory={postCategory} />
                        </div>
                    }
                </div>
                <div className='col-3'><UserList /></div>
            </div>
        </div>
    );
}

export default HomePage;