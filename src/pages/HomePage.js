import React, { useState } from 'react';
import PostFeed from '../components/PostFeed';
import UserList from '../components/UserList';
import PostCategories from '../components/PostCategories';
import PostSumbit from '../components/PostSumbit';

const HomePage = (props) => {
    const [postCategory, setPostCategory] = useState('allPosts');

    const { history } = props;
    const { push } = history;

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
    };

    return (
        <div className='container'>
            <div className='row justify-content-end'>

                {/* COLUMN 1 */}
                <div className='col-3'>
                    <PostCategories onClick={onClick} />
                </div>

                {/* COLUMN 2 */}
                <div className='col-6'>

                    <div className='mb-2'>
                        <PostSumbit postCategory={postCategory} />
                        <PostFeed postCategory={postCategory} push={push} />
                    </div>

                </div>

                {/* COLUMN 3 */}
                <div className='col-3'>
                    <UserList />
                </div>

            </div>
        </div>
    );
}

export default HomePage;