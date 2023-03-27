import React from 'react';
import { useTranslation } from 'react-i18next';


const ClubsPage = () => {
    const { t } = useTranslation();

    const items = [
        'List Item 1',
        'List Item 2',
        'List Item 3',
        'List Item 4',
    ]

    return (
        <div className='container'>
            <div className='card shadow'>
                <div className='card-header text-center fs-1'>{t('schoolClubs')}</div>
                <div className='card-body'>
                    {/* <ul className='list-group'>
                        <li className='list-group-item'>List Item 1</li>
                        <li className='list-group-item'>List Item 2</li>
                        <li className='list-group-item'>List Item 3</li>
                        <li className='list-group-item'>List Item 4</li>
                    </ul> */}
                    {items.map((item) => {
                        return <li className='list-group-items'>{item}</li>
                    })}
                </div>
            </div>
        </div>
    );
}

export default ClubsPage;