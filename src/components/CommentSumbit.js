import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUser, sendComment } from '../api/apiCalls';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import ButtonWithProgress from './ButtonWithProgress';
import { useTranslation } from 'react-i18next';
import { useApiProgress } from '../shared/ApiProgress';

const CommentSumbit = (props) => {

    const [user, setUser] = useState({});
    const [comment, setComment] = useState();
    const [errors, setErrors] = useState({});
    const { username: loggedInUsername } = useSelector((store) => ({ username: store.username }));
    const { t } = useTranslation();

    const { username, displayName, image, verifiedAccount } = user;

    const pendingApiCall = useApiProgress('post', `/api/posts/${props.postId}/comments`, true);

    useEffect(() => {
        const loadUser = async () => {
            const response = await getUser(loggedInUsername);
            setUser(response.data);
        };
        loadUser();
    }, [loggedInUsername]);

    const onClickCommentSumbit = async () => {
        try {
            const body = {
                content: comment
            }
            await sendComment(body, props.postId);
            window.location.reload(false);
        } catch (error) {
            if (error.response.data.validationError) {
                setErrors(error.response.data.validationError);
            }
        }
    };

    let inputClassName = 'form-control';
    if (errors.content) {
        inputClassName += ' is-invalid';
    }


    return (
        <div className='container d-flex'>

            {/* USER DETAILS CARD */}
            <div className='col-2 card text-center pt-3'>

                <div className='text-center'>
                    <ProfileImageWithDefaults
                        className='rounded-circle shadow'
                        width='100'
                        height='100'
                        alt={`${username} profile image`}
                        image={image} />
                </div>

                {/* AUTHOR DISPLAY NAME */}
                <div className='text-center'>
                    <h3>{displayName}</h3>
                    {verifiedAccount && <i className='material-icons text-primary-emphasis' >verified</i>}
                </div>

            </div>

            {/* COMMENT TEXT-PLAIN */}
            <div className='col-9 ms-3'>
                <textarea
                    style={{ height: '100px' }}
                    className={inputClassName}
                    onChange={(event) => {setComment(event.target.value)}}
                    value={comment}
                />
                <div className='invalid-feedback'>{errors.content}</div>

                {/* Send button */}
                <ButtonWithProgress
                    className='btn btn-primary float-end d-inline-flex mt-2'
                    text={t('sumbit')}
                    icon='done'
                    onClick={onClickCommentSumbit}
                    pendingApiCall={pendingApiCall} />
            </div>

        </div>
    );
}

export default CommentSumbit;