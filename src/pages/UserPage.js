import React, { useEffect, useState } from 'react';
import { getUser } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import PostFeed from '../components/PostFeed';
import Spinner from '../components/Spinner';
import ProfileCard from '../components/ProfileCard';

const UserPage = (props) => {
    const [user, setUser] = useState({});
    const [notFound, setNotFound] = useState(false);

    const { history } = props;
    const { push } = history;

    const { username } = useParams();
    const { t } = useTranslation();
    const pendingApiCall = useApiProgress('get', `/api/1.0/users/${username}`, true);

    useEffect(() => {
        setNotFound(false);
    }, [user]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const response = await getUser(username);
                setUser(response.data);
            } catch (error) { setNotFound(true) }
        }

        loadUser();
    }, [username]);

    if (notFound) {
        return (
            <div className='container'>
                <div className="alert alert-danger text-center" role="alert">
                    <div><i className='material-icons' style={{ fontSize: '48px' }}>error</i></div>
                    {t('userNotFound')}
                </div>
            </div>
        );
    }

    if (pendingApiCall || user.username !== username) {
        return <Spinner />
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <ProfileCard user={user} />
                </div>
                <div className='col'>
                    <PostFeed postCategory='allPosts' push={push} />
                </div>
            </div>
        </div>
    );
}

export default UserPage;