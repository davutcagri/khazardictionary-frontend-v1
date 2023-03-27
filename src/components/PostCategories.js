import React from 'react';
import { useTranslation } from 'react-i18next';
import ButtonWithIcon from './ButtonWithIcon';

const PostCategories = (props) => {
    const { t } = useTranslation();
    const { onClick } = props;

    return (
        <div className='card m-2'>
            <div className='card-body'>
                <ButtonWithIcon name='allPosts' className='btn d-inline-flex' icon='newspaper' label={t('allPosts')} onClick={onClick} />
                <ButtonWithIcon name='questions' className='btn d-inline-flex' icon='help' label={t('questions')} onClick={onClick} />
                <ButtonWithIcon name='schoolClubs' className='btn d-inline-flex' icon='groups' label={t('schoolClubs')} toPage='/schoolClubs' />
                <ButtonWithIcon name='houseMate' className='btn d-inline-flex' icon='roofing' label={t('houseMate')} onClick={onClick} />
                <ButtonWithIcon name='dormitories' className='btn d-inline-flex' icon='night_shelter' label={t('dormitories')} onClick={onClick} />
                <ButtonWithIcon name='lostItems' className='btn d-inline-flex' icon='backpack' label={t('lostItems')} onClick={onClick} />
                <ButtonWithIcon name='studentStore' className='btn d-inline-flex' icon='payments' label={t('studentStore')} onClick={onClick} />
                <ButtonWithIcon name='others' className='btn d-inline-flex' icon='category' label={t('others')} onClick={onClick} />
            </div>
        </div>
    );
}

export default PostCategories;