import React from 'react';
import ButtonWithProgress from '../components/ButtonWithProgress';

const Modal = (props) => {

    const { title, button1, button2, message, visible, onClickCancel, onClickOk, pendingApiCall } = props;

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
                            <h5 className="modal-title">{title}</h5>
                        </div>
                        <div className="modal-body">{message}</div>
                        <div className="modal-footer">

                            {/* ACCEPT BUTTON */}
                            <ButtonWithProgress
                                className="mt-3 btn btn-primary float-end d-inline-flex"
                                onClick={onClickOk}
                                pendingApiCall={pendingApiCall}
                                disabled={pendingApiCall}
                                icon={'done'}
                                text={button1}
                            />

                            {/* CANCEL BUTTON */}
                            <button className="mt-3 btn btn-secondary float-end d-inline-flex ms-1" onClick={onClickCancel} disabled={pendingApiCall}>
                                <i className='material-icons' >close</i>{button2}
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;