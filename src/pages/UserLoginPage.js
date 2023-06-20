import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import { loginHandler } from '../redux/authActions';
import { useDispatch } from 'react-redux';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from '../components/Input';

const UserLoginPage = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const pendingApiCall = useApiProgress('post', '/api/auth/token');
    const buttonEnabled = username && password && error == null;

    useEffect(() => {
        setError(undefined);
    }, [username, password]);

    const onClickLogin = async event => {
        event.preventDefault();

        const { history } = props;
        const { push } = history;
        const creds = {
            username,
            password
        }

        setError(undefined);

        try {
            await dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {
            setError(t('unauthorized'))
        }
    };

    return (
        <div className='mt-5 px-4 py-3 px-md-5 text-center text-lg-start' style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
            <div>

                {/* COLUMN 1 */}
                <div className='row gx-lg-5 align-items-center'>
                    <div className='col-lg-6 mb-5 mb-lg-0'>ü

                        {/* AUTH TITLE */}
                        <h1 className='my-5 display-3 fw-bold ls-tight'>
                            {t('authPageTitle1')} <br />
                            <span className='text-primary'>{t('authPageTitle2')}</span>
                        </h1>

                        {/* AUTH PARAGRAPH */}
                        <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>{t('authParagraph')}</p>
                        
                    </div>

                    {/* COLUMN 2 */}
                    <div className='col-lg-6 mb-5 mb-lg-0'>
                        <div className='card shadow'>
                            <div className='card-body py-5 px-md-5'>

                                <form className='text-center'>

                                    {/* LOGIN TITLE */}
                                    <h1 className='display-4 text-center mb-5'>{t('login')}</h1>

                                    {/* USERNAME INPUT */}
                                    <Input placeholder={t('username')} onChange={(event) => { setUsername(event.target.value) }} />

                                    {/* PASSWORD INPUT */}
                                    <Input placeholder={t('password')} onChange={(event) => { setPassword(event.target.value) }} type='password' />
                                    {error && <div className='alert alert-danger'>{error}</div>}

                                    {/* FORGOT PASSWORD */}
                                    <Link className='text-primary-emphasis' to={'/forgotpassword'}>{t('forgotPassword')}</Link>

                                    {/* DONT HAVE ACCOUNT */}
                                    <div className='mt-4'>
                                        {t('dontHaveAccount')} <Link className='text-muted' to={'/signup'}>{t('signUp')}</Link>
                                    </div>

                                    {/* LOGIN BUTTON */}
                                    <ButtonWithProgress
                                        className='btn btn-primary btn-lg mt-3'
                                        onClick={onClickLogin}
                                        disabled={!buttonEnabled || pendingApiCall}
                                        pendingApiCall={pendingApiCall}
                                        text={t('login')} />

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default UserLoginPage;