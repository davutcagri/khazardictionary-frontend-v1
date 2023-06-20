import React from 'react';
import { useTranslation } from 'react-i18next';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';

const ForgotPassword = (props) => {

    const { t } = useTranslation();

    return (
        <div className='mt-5 px-4 py-3 px-md-5 text-center text-lg-start' style={{ backgroundColor: 'hsl(0, 0%, 96%)' }}>
            <div>

                {/* COLUMN 1 */}
                <div className='row gx-lg-5 align-items-center'>
                    <div className='col-lg-6 mb-5 mb-lg-0'>
                        {/* TITLE */}
                        <h1 className='my-5 display-3 fw-bold ls-tight'>

                            {t('authPageTitle1')} <br />
                            <span className='text-primary'>{t('authPageTitle2')}</span>

                        </h1>

                        {/* PARAGRAPH */}
                        <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>{t('authParagraph')}</p>
                    </div>

                    {/* COLUMN 2 */}
                    <div className='col-lg-6 mb-5 mb-lg-0'>
                        <div className='card shadow'>
                            <div className='card-body py-5 px-md-5'>

                                <form className='text-center'>

                                    {/* TITLE */}
                                    <h1 className='display-4 text-center mb-5'>{t('forgotPassword')}</h1>

                                    {/* E-MAIL */}
                                    <Input placeholder={t('khazarEmail')} />

                                    {/* ACCEPT BUTTON */}
                                    <ButtonWithProgress
                                        className='btn btn-primary btn-lg mt-3'
                                        // onClick={onClickLogin}
                                        // disabled={!buttonEnabled || pendingApiCall}
                                        // pendingApiCall={pendingApiCall}
                                        text={t('accept')} />

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;