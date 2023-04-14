import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostFeed from '../components/PostFeed';
import UserList from '../components/UserList';
import PostCategories from '../components/PostCategories';
import PostSumbit from '../components/PostSumbit';

const HomePage = (props) => {
    const { isLoggedIn } = useSelector((store) => ({ isLoggedIn: store.isLoggedIn }));
    const { adminRole } = useSelector((store) => ({ adminRole: store.roleName }));
    const [postCategory, setPostCategory] = useState('allPosts');
    const [hasAdminRole, setHasAdminRole] = useState(false);

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

    useEffect(() => {
        if (adminRole.includes('ROLE_ADMIN')) {
            setHasAdminRole(true);
        }
        
    }, [adminRole]);

    return (
        <div className='container'>
            <div className='row justify-content-end'>
                <div className='col-3'>
                    {hasAdminRole && <button className='btn btn-warning mx-2 flex-fill' onClick={() => {push('/adminPanel')}}>ADMIN PANEL</button>}
                    <PostCategories
                        onClick={onClick}
                    />
                </div>
                <div className='col-6'>
                    {isLoggedIn &&
                        <div className='mb-2'>
                            <PostSumbit postCategory={postCategory} />
                            <PostFeed postCategory={postCategory} push={push} />
                        </div>
                    }
                </div>
                <div className='col-3'><UserList /></div>
            </div>
        </div>
    );
}

export default HomePage;