import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { sharePost, sharePostAttachment } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import ProfileImageWithDefaults from './ProfileImageWithDefault';
import ButtonWithProgress from './ButtonWithProgress';
import AutoUploadImage from './AutoUploadImage';
import Select from 'react-select';
import Input from './Input';

const PostSumbit = (props) => {
    //POST SUMBIT'S MAIN STATES
    const [modalVisible, setModalVisible] = useState(false);
    const [focused, setFocused] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');
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

    //CREATE POST BUTTON ON CLICK
    const onClickCreatePostButton = () => {
        if (!modalVisible) {
            setModalVisible(true);
        }
        else {
            setModalVisible(false);
        }
    };

    //POST ON CLICK
    const onClickPost = async () => {
        const body = {
            title: postTitle,
            content: postContent,
            category: selectedCategory,
            attachmentId: attachmentId
        }

        if (selectedCategory !== undefined) {
            try {
                await sharePost(body);
                setModalVisible(false);
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
        setModalVisible(false);
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
            setPostContent('');
            setErrors({})
            setSelectedCategory();
            setCategoryError();
            setAttachmentId();
        }
    }, [focused]);

    useEffect(() => {
        setErrors({});
        setCategoryError();
    }, [postContent]);

    return (
        <>

            <div className='d-flex mb-3'>

                <h2>{t(props.postCategory)}</h2>
                <button className='btn btn-primary ms-auto' onClick={onClickCreatePostButton}>{t('createPost')}</button>

            </div>

            {modalVisible && <div className='modal fade show d-block' tabIndex='-1' style={{ backgroundColor: '#000000b0' }}>

                <div className='modal-dialog'>

                    <div className='modal-content p-3 flex-row shadow mb-2'>

                        <div className='flex-fill'>

                            <div className='modal-header mb-3'>

                                {/* CREATE POST TITLE */}
                                <h3 className='mt-2'>{t('createPost')}</h3>

                                {/* PROFILE IMAGE */}
                                <ProfileImageWithDefaults
                                    className='rounded-circle mx-1 shadow'
                                    image={image}
                                    width='50'
                                    height='50' />
                            </div>

                            <div className='modal-body'>

                                {/* TITLE INPUT */}
                                <Input
                                    label={t('postTitle')}
                                    onChange={(event) => setPostTitle(event.target.value)}
                                    value={postTitle}
                                    error={errors.title}
                                />

                                {/* CONTENT INPUT */}
                                <label>{t('postContent')}</label>

                                <textarea
                                    className={textAreaClass}
                                    rows={focused ? '3' : '1'}
                                    onFocus={() => setFocused(true)}
                                    onChange={(event) => setPostContent(event.target.value)}
                                    value={postContent}
                                />

                                <div className='invalid-feedback'>{errors.content}</div>

                                {/* CATEGORY */}
                                <Select
                                    className={categoryClass}
                                    onChange={(choice) => setSelectedCategory(choice.value)}
                                    placeholder={t('category')}
                                    options={options}
                                />

                                <div className='invalid-feedback'>{categoryError}</div>

                                {/* OTHERS */}
                                <div className='mt-3'>

                                    <div className='mt-1'>

                                        {/* ACTIONS */}
                                        <label className='m-1'>

                                            <i className='material-icons' style={{ cursor: 'pointer' }}>
                                                image
                                                <input type='file' style={{ display: 'none' }} onChange={onChangeFile} />
                                            </i>

                                        </label>

                                        {newImage && <AutoUploadImage image={newImage} />}

                                        {/* CANCEL BUTTON */}
                                        <button
                                            className='mt-3 btn btn-dark float-end d-inline-flex ms-1'
                                            onClick={onClickCancel}
                                            data-bs-dismiss='modal'
                                            disabled={pendingApiCall}>
                                            <i className='material-icons' >close</i>{t('cancel')}
                                        </button>

                                        {/* SHARE BUTTON */}
                                        <ButtonWithProgress
                                            className='mt-3 btn btn-primary float-end d-inline-flex'
                                            onClick={onClickPost}
                                            pendingApiCall={pendingApiCall}
                                            disabled={pendingApiCall}
                                            icon={'send'}
                                            text={t('share')}>
                                        </ButtonWithProgress>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div >}

        </>
    );
}

export default PostSumbit;