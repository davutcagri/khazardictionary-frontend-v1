import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sharePost, sharePostAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import ButtonWithProgress from './ButtonWithProgress';
import AutoUploadImage from './AutoUploadImage';
import Select from 'react-select';

const PostSumbit = () => {
    //POST SUMBIT'S MAIN STATES
    const [focused, setFocused] = useState(false);
    const [post, setPost] = useState('');
    const [newImage, setNewImage] = useState();
    const [attachmentId, setAttachmentId] = useState();
    const [selectedCategory, setSelectedCategory] = useState();
    const [errors, setErrors] = useState({});
    const [categoryError, setCategoryError] = useState();

    const { image } = useSelector((store) => ({ image: store.image }));
    const { t } = useTranslation();

    const pendingApiCall = useApiProgress('post', '/api/posts', true);

    const options = [
        { value: 'questions', label: t('questions') },
        { value: 'houseMate', label: t('houseMate') },
        { value: 'dormitories', label: t('dormitories') },
        { value: 'studentStore', label: t('studentStore') },
        { value: 'lostItems', label: t('lostItems') },
        { value: 'others', label: t('others') },
    ];

    let textAreaClass = 'form-control';
    let categoryClass = 'mt-3';

    if (errors.content) {
        textAreaClass += ' is-invalid';
    }

    if (categoryError) {
        categoryClass += ' is-invalid';
    }

    //POST ON CLICK
    const onClickPost = async () => {
        const body = {
            content: post,
            category: selectedCategory,
            attachmentId: attachmentId
        }

        if(selectedCategory !== undefined) {
            try {
                await sharePost(body);
                setFocused(false);
            } catch (error) {
                if (error.response.data.validationError) {
                    setErrors(error.response.data.validationError);
                }
            }
        }
        else {
            setCategoryError(t('categoryError'))
        }
    };

    //CANCEL ON CLICK
    const onClickCancel = async () => {
        setFocused(false);
    };

    //FILE ON CHANGE
    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
            uploadFile(file);
        }
        fileReader.readAsDataURL(file);
    };


    //FILE UPLOAD
    const uploadFile = async (file) => {
        const attachment = new FormData();
        attachment.append('file', file);
        const response = await sharePostAttachment(attachment);
        setAttachmentId(response.data.id);
    };

    useEffect(() => {
        if (!focused) {
            setPost('');
            setErrors({})
            setSelectedCategory();
            setCategoryError();
            setAttachmentId();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
        setCategoryError();
    }, [post]);

    return (
        <div className='card p-3 flex-row shadow mb-2'>
            <ProfileImageWithDefaults
                className='rounded-circle mx-1'
                image={image}
                width='32'
                height='32' />
            <div className='flex-fill'>
                <textarea
                    className={textAreaClass}
                    rows={focused ? '3' : '1'}
                    onFocus={() => setFocused(true)}
                    onChange={(event) => setPost(event.target.value)}
                    value={post}
                />
                <div className="invalid-feedback">{errors.content}</div>
                {focused &&
                    <div className='mt-1'>
                        <>

                            {/* ACTIONS */}
                            <label className='m-1'>
                                <i className='material-icons' style={{ cursor: 'pointer' }}>
                                    image
                                    <input type='file' style={{ display: 'none' }} onChange={onChangeFile} />
                                </i>
                            </label>
                            {/* <label className='m-1'>
                                <i className='material-icons' style={{ cursor: 'pointer' }}>event</i>
                            </label> */}
                            {newImage && <AutoUploadImage image={newImage} />}
                            <Select
                                className={categoryClass}
                                onChange={(choice) => setSelectedCategory(choice.value)}
                                placeholder={t('category')}
                                options={options}
                            />
                            <div className="invalid-feedback">{categoryError}</div>
                            <div className='mt-3'>
                                <button
                                    className='btn btn-light float-end d-inline-flex ms-1'
                                    onClick={onClickCancel}
                                    disabled={pendingApiCall}>
                                    <i className='material-icons' >close</i>{t('cancel')}
                                </button>

                                <ButtonWithProgress
                                    className='btn btn-primary float-end'
                                    onClick={onClickPost}
                                    pendingApiCall={pendingApiCall}
                                    disabled={pendingApiCall}
                                    text={t('share')}>
                                </ButtonWithProgress>
                            </div>
                        </>
                    </div>
                }
            </div>
        </div>

    );
}

export default PostSumbit;