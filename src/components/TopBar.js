import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/authActions';
import logo from '../images/KhazarDictionary_logo_transparent.png';
import ProfileImageWithDefault from './ProfileImageWithDefault';

const TopBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);

    const { t } = useTranslation();
    const { isLoggedIn, username, displayName, image } = useSelector((store) => ({
        isLoggedIn: store.isLoggedIn,
        username: store.username,
        displayName: store.displayName,
        image: store.image
    }));

    const dispatch = useDispatch();

    const onLogoutSuccess = () => {
        dispatch(logoutSuccess());
    }

    const menuArea = useRef(null);

    const menuClickTracker = (event) => {
        if (menuArea.current === null || !menuArea.current.contains(event.target)) {
            setMenuVisible(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', menuClickTracker);
        return () => {
            document.removeEventListener('click', menuClickTracker);
        };
    }, [isLoggedIn]);

    let dropdownClass = 'dropdown-menu p-0 shadow';
    if (isLoggedIn === true) {
        if (menuVisible) {
            dropdownClass += ' show';
        }
    }

    return (
        <>
            {isLoggedIn && <div className='shadow-lg bg-light mb-3'>
                <nav className='navbar navbar-light container navbar-expand'>
                    <Link className='navbar-brand' to='/'>
                        <img className='ms-2' src={logo} width='25%' alt='Khazar Dictionary Logo' />
                    </Link>
                    <ul className='navbar-nav ms-auto' ref={menuArea} >
                        <li className='nav-item dropdown'>
                            <div className='d-flex' style={{ cursor: 'pointer' }} onClick={() => setMenuVisible(true)} >
                                <ProfileImageWithDefault className='rounded-circle m-auto' image={image} width='32' height='32' />
                                <span className='nav-link dropdown-toggle'>{displayName}</span>
                            </div>
                            <div className={dropdownClass}>
                                <span>
                                    <Link className='dropdown-item d-flex p-2' to={`/user/${username}`} onClick={() => setMenuVisible(false)}>
                                        <i className='material-icons text-info-emphasis mr-2'>person</i> {t('myProfile')}
                                    </Link>
                                </span>
                                <span>
                                    <Link className='dropdown-item d-flex p-2' to='/login' onClick={onLogoutSuccess}>
                                        <i className='material-icons text-danger mr-2'>power_settings_new</i> {t('logout')}
                                    </Link>
                                </span>
                                <span>
                                    <Link className='dropdown-item d-flex p-2' to='/termsofuse' onClick={() => setMenuVisible(false)}>
                                        <i className='material-icons text-muted mr-2'>info</i> {t('info')}
                                    </Link>
                                </span>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>}
        </>
    );
}


export default TopBar;