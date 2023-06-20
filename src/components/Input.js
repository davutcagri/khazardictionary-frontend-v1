import React from 'react';

const Input = (props) => {
    const { label, error, name, onChange, type, defaultValue, placeholder, disabled, value } = props;

    let className = 'form-control';
    if (error !== undefined) {
        className = 'is-invalid form-control';
    }

    return (
        <div className='mb-3'>
            <label>{label}</label>
            <input className={className} name={name} onChange={onChange} type={type} defaultValue={defaultValue} placeholder={placeholder} disabled={disabled} value={value} />
            <div className='invalid-feedback'>{error}</div>
        </div>
    )
}

export default Input;