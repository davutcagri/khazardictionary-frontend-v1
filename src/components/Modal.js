import React from 'react';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useTranslation } from 'react-i18next';

const Modal = (props) => {
    const { t } = useTranslation();

    const { visible, onClickCancel, onClickOk, message, pendingApiCall } = props;

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
                            <h5 className="modal-title">{t('modalDeletePostTitle')}</h5>
                        </div>
                        <div className="modal-body">{message}</div>
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

export default Modal;