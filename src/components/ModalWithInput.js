import React from 'react';
import ButtonWithProgress from '../components/ButtonWithProgress';
import Input from './Input';
import { useTranslation } from 'react-i18next';

const ModalWithInput = (props) => {
    const { t } = useTranslation();

    const { visible, onClickCancel, onClickOk, pendingApiCall, setModalInputValue, modalError } = props;

    const onChange = (event) => {
        setModalInputValue(event.target.value);
    };

    let className = "modal fade";
    if (visible) {
        className += "show d-block";
    }
    return (
        <div>
            <div className={className} style={{ backgroundColor: '#000000b0' }} >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{t('verificationCodeTitle')}</h5>
                        </div>
                        <div className="modal-body">
                            <Input label={t('verificationCodeLabel')} onChange={onChange} error={modalError} />
                        </div>
                        <div className="modal-footer">
                            <ButtonWithProgress
                                type="button"
                                className="btn btn-primary"
                                onClick={onClickOk}
                                pendingApiCall={pendingApiCall}
                                disabled={pendingApiCall}
                                text={t('modalDeletePostAcceptButton')}
                            />
                            <button type="button" className="btn btn-secondary" onClick={onClickCancel} disabled={pendingApiCall}>{t('cancel')}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalWithInput;