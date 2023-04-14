import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import AnnounceSumbit from '../components/AnnounceSumbit';
import ClockComponent from '../components/ClockComponent';
import AnnounceView from '../components/AnnounceView';
import { deleteAnnounce, getAnnounces } from '../api/apiCalls';

const AdminPages = (props) => {
    const { history } = props;
    const { push } = history;

    return (
        <div className='container'>

            <div className='row justify-content-end'>

                <div className='col-3'>

                    <UserList push={push} />

                </div>

                <div className='col-6'>

                    <div className='mb-3'><AnnounceSumbit push={push} /></div>

                </div>

                <div className='col-3'>
                    <ClockComponent />
                </div>

            </div>

        </div>
    );
}

export default AdminPages;