import React, { useState } from 'react';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import { sendComment } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';

const CommentSumbit = (props) => {

    const { userLogged, id, setCommentSumbitEnabled } = props;

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({});

    const { t } = useTranslation();

    //ON CLICK COMMENT SEND
    const onClickCommentSend = async () => {

        try {

            const body = {
                content: comment
            }

            await sendComment(body, id);
            setComment('')
            setErrors({})
            setCommentSumbitEnabled(false);

        } catch (error) {
            if (error.response.data.validationError) {
                setErrors(error.response.data.validationError);
            }
        }

    };

    let commentInputError = 'form-control ';
    if (errors.content) {
        commentInputError += 'is-invalid';
    }

    return (
        <div className='card mx-5 mt-3'>

            <div className='card-header d-flex'>

                {/* LOGGED IN USER PROFILE IMAGE */}
                <ProfileImageWithDefaults
                    className='rounded-circle shadow mt-1 mx-1'
                    image={userLogged.image}
                    width='32'
                    height='32'
                />

                {/* LOGGED IN USER DISPLAYNAME */}
                <span className='mt-2 mx-1'>{userLogged.displayName}</span>

            </div>

            <div className='card-body'>

                {/* COMMENT INPUT */}
                <textarea
                    className={commentInputError}
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                />

                <div className='invalid-feedback'>{errors.content}</div>

                <div className='d-flex'>
      
                {/* COMMENT SEND BUTTON */}
                <button className='btn btn-primary mt-3 mx-1 d-flex' onClick={onClickCommentSend}>
                    <i className='material-icons mx-1'>send</i>
                    {t('sumbit')}
                </button>

                {/* COMMET CANCEL BUTTON */}
                <button className='btn btn-secondary mt-3 mx-1 d-flex' onClick={() => setCommentSumbitEnabled(false)}>
                    <i className='material-icons mx-1'>close</i>
                    {t('cancel')}
                </button>

</div>

            </div>

        </div>
    );
}

export default CommentSumbit;