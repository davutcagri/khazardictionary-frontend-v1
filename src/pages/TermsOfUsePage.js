import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/KhazarDictionary_logo_transparent.png';
import TermsContentEN from '../termscontents/TermsContentEN';
import TermsContentAZ from '../termscontents/TermsContentAZ';
import TermsContentRU from '../termscontents/TermsContentRU';
import TermsContentTR from '../termscontents/TermsContentTR';
import { useTranslation } from 'react-i18next';

const TermsOfUse = () => {

    const localStorageLanguageValue = localStorage.getItem('language');
    const [language, setLanguage] = useState(localStorageLanguageValue);
    const {t} = useTranslation();

    useEffect(() => {
        setLanguage(localStorageLanguageValue);
    }, [t]);

    if (language === 'en') {
        return (<TermsContentEN />);
    }
    else if (language === 'az') {
        return (<TermsContentAZ />);
    }
    else if (language === 'ru') {
        return (<TermsContentRU />);
    }
    else if (language === 'tr') {
        return (<TermsContentTR />);
    }
    else {
        return (
            <div className='container'>
                <div className='text-center'>
                    <Link to='/'>
                        <img className='pb-2 mt-5 border-bottom' src={logo} width='25%' alt='Khazar Dictionary Logo' />
                    </Link>
                </div>
            </div>
        );
    }


}

export default TermsOfUse;