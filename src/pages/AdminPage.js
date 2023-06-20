import React from 'react';
import UserList from '../components/UserList';
import ClockComponent from '../components/ClockComponent';

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

                    {/* ANNOUNCE */}

                </div>

                <div className='col-3'>
                    <ClockComponent />
                </div>

            </div>

        </div>
    );
}

export default AdminPages;