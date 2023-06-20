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

    if (language === 'az') {
        return (<TermsContentAZ />);
    }
    else if (language === 'ru') {
        return (<TermsContentRU />);
    }
    else if (language === 'tr') {
        return (<TermsContentTR />);
    }
    else {
        return (<TermsContentEN />);
    }


}

export default TermsOfUse;