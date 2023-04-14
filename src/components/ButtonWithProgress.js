import React from 'react';

const ButtonWithProgress = (props) => {
    const { className, onClick, pendingApiCall, disabled, text, icon } = props;

    return (
        <button
            className={className}
            style={{ color: 'white' }}
            onClick={onClick}
            disabled={disabled}>
            {pendingApiCall && <span className='spinner-border spinner-border-sm'></span>}
            <i className='material-icons me-1' >{icon}</i>
            {text}
        </button>
    );
};

export default ButtonWithProgress;