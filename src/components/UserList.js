import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsers } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';
import UserListItem from './UserListItem';

const UserList = (props) => {
    const [page, setPage] = useState({
        content: [],
        size: 5,
        number: 0
    });

    const [loadFailure, setLoadFailure] = useState(false);

    const pendingApiCall = useApiProgress('get', '/api/1.0/users?page');

    const { push } = props


    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async (page) => {
        setLoadFailure(false);
        try {
            const response = await getUsers(page);
            setPage(response.data);
        } catch (error) {
            setLoadFailure(true);
        }
    };

    const onClickPrevious = () => {
        const previousPage = page.number - 1;
        loadUsers(previousPage);
    };

    const onClickNext = () => {
        const nextPage = page.number + 1;
        loadUsers(nextPage);
    };

    const { content: users, first, last } = page;
    const { t } = useTranslation();

    let actionDiv = (
        <div>
            {first === false &&
                <button
                    className='btn btn-sm btn-light float-start'
                    onClick={onClickPrevious}>{t('previous')}</button>}
            {last === false &&
                <button
                    className='btn btn-sm btn-light float-end'
                    onClick={onClickNext}>{t('next')}</button>}
        </div>
    );

    if (pendingApiCall) {
        actionDiv = <Spinner />;
    }

    return (
        <div className='card shadow'>
            <h1 className='card-header text-center'>{t('users_list')}</h1>
            <div className='list-group flush'>
                {users.map((user) => (
                    <UserListItem user={user} key={user.username} />
                ))}
            </div>
            {actionDiv}
            {loadFailure && <div className='text-center text-danger'>{t('loadFailure')}</div>}
        </div>
    );
}

export default UserList;