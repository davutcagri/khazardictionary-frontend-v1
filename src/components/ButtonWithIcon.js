import React from 'react';

const ButtonWithIcon = (props) => {
    const { name, className, icon, label, onClick, toPage } = props;

    return (
        <div className='d-grid gap-2 mb-3'>
            <button name={name} className={className} to={toPage} style={{ fontSize: '20px' }} onClick={onClick}>
                <i className='material-icons me-1' style={{ fontSize: '30px' }}>{icon}</i>{label}
            </button>
        </div>
    );
}

export default ButtonWithIcon;