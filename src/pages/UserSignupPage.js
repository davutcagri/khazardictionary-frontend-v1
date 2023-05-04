import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { signupHandler } from '../redux/authActions';
import { deleteProfile, deleteVerification, getVerificationCode, sendVerificationCode, signup } from '../api/apiCalls';
import Input from '../components/Input';
import ButtonWithProgress from '../components/ButtonWithProgress';
import ModalWithInput from '../components/ModalWithInput';

const UserSignupPage = (props) => {
    const [form, setForm] = useState({
        email: null,
        username: null,
        displayName: null,
        password: null,
        passwordRepeat: null
    });
    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalInputValue, setModalInputValue] = useState();
    const [modalError, setModalError] = useState();
    const [customerEmail, setCustomerEmail] = useState();
    const [agreementChecked, seteAgreementChecked] = useState(false);

    const dispatch = useDispatch();
    const { t } = useTranslation();
    const pendingApiCallSignup = useApiProgress('post', '/api/users');
    const pendingApiCallAuth = useApiProgress('post', '/api/auth/token');
    const pendingApiCall = pendingApiCallSignup || pendingApiCallAuth;
    const { email: emailError, username: usernameError, displayName: displayNameError, password: passwordError } = errors;

    let passwordRepeatError;

    const onChange = event => {
        const { name, value } = event.target;

        setErrors((previousError) => ({ ...previousError, [name]: undefined }));
        setForm((previousForm) => ({ ...previousForm, [name]: value }));
    };

    const onChangeCheckBox = () => {
        if (agreementChecked === false) {
            seteAgreementChecked(true);
        }
        else {
            seteAgreementChecked(false);
        }
    };

    const onClickSignup = async event => {
        event.preventDefault();
        const { email, username, displayName, password } = form;
        const body = {
            email,
            username,
            displayName,
            password
        }
        let canJoin = false;
        try {
            await signup(body);
            canJoin = true
            await deleteProfile(username);
        } catch (error) {
            if (error.response.data.validationError) {
                setErrors(error.response.data.validationError);
            }
        }

        if (canJoin) {
            setModalVisible(true);
            setCustomerEmail(email);
            await sendVerificationCode(email);
        }
        else {
            console.log('no')
        }
    };

    const onClickAcceptModal = async () => {
        const { history } = props;
        const { push } = history;
        const { email, username, displayName, password } = form;
        const body = {
            email,
            username,
            displayName,
            password
        }
        const response = await getVerificationCode(customerEmail);
        if (modalInputValue === response.data.verificationCode) {
            setModalVisible(false);
            await dispatch(signupHandler(body));
            push('/')
            await deleteVerification(email);
        }
        else {
            setModalError(t('verificationCodeError'));
        }
    };

    const onClickCancelModal = async () => {
        const { email } = form;
        await deleteVerification(email);
        setModalVisible(false);
    };

    if (form.password !== form.passwordRepeat) {
        passwordRepeatError = t('passwordMismatch');
    }

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
                                        <h1 className='display-4 text-center mb-5'>{t('signUp')}</h1>
                                        <Input name='email' placeholder={t('khazarEmail')} error={emailError} onChange={onChange} />
                                        <Input name='username' placeholder={t('username')} error={usernameError} onChange={onChange} />
                                        <Input name='displayName' placeholder={t('displayName')} error={displayNameError} onChange={onChange} />
                                        <div className='row'>
                                            <div className='col'><Input name='password' placeholder={t('password')} error={passwordError} onChange={onChange} type={'password'} /></div>
                                            <div className='col'><Input name='passwordRepeat' placeholder={t('passwordRepeat')} error={passwordRepeatError} onChange={onChange} type={'password'} /></div>
                                        </div>

                                        <div className='form-check'>
                                            <input className='form-check-input' type='checkbox' onChange={onChangeCheckBox} />
                                            <label className='form-check-label'>
                                                {t('agreementCheck1')} <Link to={'/termsofuse'}>{t('agreementCheck2')}</Link>
                                            </label>
                                        </div>

                                        <div className='text-center mt-4'>
                                            {t('haveAnAccount')} <Link className='text-muted' to={'/login'}>{t('login')}</Link>
                                        </div>
                                        <div className='text-center'>
                                            <ButtonWithProgress
                                                className='btn btn-primary btn-lg mt-3'
                                                onClick={onClickSignup}
                                                disabled={pendingApiCall || passwordRepeatError !== undefined || !agreementChecked}
                                                pendingApiCall={pendingApiCall}
                                                text={t('signUp')} />
                                        </div>
                                    </form>
                                    <ModalWithInput
                                        visible={modalVisible}
                                        setModalInputValue={setModalInputValue}
                                        onClickOk={onClickAcceptModal}
                                        onClickCancel={onClickCancelModal}
                                        modalError={modalError}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserSignupPage;