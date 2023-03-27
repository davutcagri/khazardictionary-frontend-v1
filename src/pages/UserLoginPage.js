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
        <section className='mt-5'>
            <div className='px-4 py-3 px-md-5 text-center text-lg-start' style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
                <div>
                    <div className='row gx-lg-5 align-items-center'>
                        <div className='col-lg-6 mb-5 mb-lg-0'>
                            <h1 className='my-5 display-3 fw-bold ls-tight'>
                                {t('authPageTitle1')} <br />
                                <span className='text-primary'>{t('authPageTitle2')}</span>
                            </h1>
                            <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>{t('authParagraph')}</p>
                        </div>
                        <div className='col-lg-6 mb-5 mb-lg-0'>
                            <div className='card shadow'>
                                <div className='card-body py-5 px-md-5'>
                                    <form>
                                        <h1 className='display-4 text-center mb-5'>{t('login')}</h1>
                                        <Input placeholder={t('username')} onChange={(event) => { setUsername(event.target.value) }} />
                                        <Input placeholder={t('password')} onChange={(event) => { setPassword(event.target.value) }} type='password' />
                                        {error && <div className='alert alert-danger'>{error}</div>}
                                        <div className='text-center mt-4'>
                                                {t('dontHaveAccount')} <Link className='text-muted' to={'/signup'}>{t('signUp')}</Link>
                                        </div>
                                        <div className='text-center'>
                                            <ButtonWithProgress
                                                className='btn btn-primary btn-lg mt-3'
                                                onClick={onClickLogin}
                                                disabled={!buttonEnabled || pendingApiCall}
                                                pendingApiCall={pendingApiCall}
                                                text={t('login')} />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default UserLoginPage;