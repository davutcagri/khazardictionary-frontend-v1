import React from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../api/apiCalls';

const LanguageSelector = (props) => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    
    const onChangeLanguage = language => {
        localStorage.setItem('language', language);
        const localStorageLanguageValue = localStorage.getItem('language');
        i18n.changeLanguage(localStorageLanguageValue);
        changeLanguage(localStorageLanguageValue);
    };

    let classNameButton = 'fw-semibold d-flex btn btn-outline-primary m-1';
    let classNameImage = 'mx-2';

    return (
        <div className='container text-center'>
            <h1 className='display-6'>{t('languages')}</h1>
            <div className='btn-group-vertical'>
                <button className={classNameButton} onClick={() => onChangeLanguage('en')} style={{ cursor: 'pointer' }}>
                    <img
                        className={classNameImage}
                        src='https://flagsapi.com/GB/flat/24.png'
                        alt='GB Flag' /> {t('english')}
                </button>
                <button className={classNameButton} onClick={() => onChangeLanguage('az')} style={{ cursor: 'pointer' }}>
                    <img
                        className={classNameImage}
                        src='https://flagsapi.com/AZ/flat/24.png'
                        alt='GB Flag' /> {t('azerbaijani')}
                </button>
                <button className={classNameButton} onClick={() => onChangeLanguage('ru')} style={{ cursor: 'pointer' }}>
                    <img
                        className={classNameImage}
                        src='https://flagsapi.com/RU/flat/24.png'
                        alt='GB Flag' /> {t('russian')}
                </button>
                <button className={classNameButton} onClick={() => onChangeLanguage('tr')} style={{ cursor: 'pointer' }}>
                    <img
                        className={classNameImage}
                        src='https://flagsapi.com/TR/flat/24.png'
                        alt='TR Flag' /> {t('turkish')}
                </button>
            </div>
        </div>
    );
}

export default LanguageSelector;