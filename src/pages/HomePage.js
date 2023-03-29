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
        if (event.target.name === 'allPosts') {
            setPostCategory('allPosts');
        }
        else if (event.target.name === 'questions') {
            setPostCategory('questions');
        }
        else if (event.target.name === 'dormitories') {
            setPostCategory('dormitories');
        }
        else if (event.target.name === 'houseMate') {
            setPostCategory('houseMate');
        }
        else if (event.target.name === 'lostItems') {
            setPostCategory('lostItems');
        }
        else if (event.target.name === 'studentStore') {
            setPostCategory('studentStore')
        }
        else if (event.target.name === 'others') {
            setPostCategory('others');
        }
        // setPostCategory(event.target.name);
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