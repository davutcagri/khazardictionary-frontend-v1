import React from 'react';
import defaultPicture from '../images/no-profile-picture.png';
import { ipv4 } from './IpForImages';

const ProfileImageWithDefaults = (props) => {
    const { image, tempimage } = props;
    let imageSource = defaultPicture;

    if (image) {
        imageSource = ipv4 + '/images/profile/' + image;
    }

    return (
        <img
            alt='Profile'
            src={tempimage || imageSource} {...props}
            onError={(event) => {
                event.target.src = defaultPicture
            }} />
    );
}

export default ProfileImageWithDefaults;