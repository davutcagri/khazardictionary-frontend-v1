import React from 'react';
import '../css/AutoUploadImage.css';

const AutoUploadImage = ({ image }) => {
    return (
        <div className='text-center'>
            <img className='rounded-square' style={{ width: '80%', borderRadius: '10px' }} src={image} alt='post-attachment' />
        </div>
    );
}

export default AutoUploadImage;