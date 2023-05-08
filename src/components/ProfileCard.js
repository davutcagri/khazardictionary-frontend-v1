import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteProfile, updateUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import { deleteProfileSuccess, logoutSuccess, updateSuccess } from '../redux/authActions';
import LanguageSelector from '../components/LanguageSelector';
import Modal from './Modal';
import ButtonWithProgress from './ButtonWithProgress';
import Input from '../components/Input';
import ProfileImageWithDefaults from './ProfileImageWithDefault';

const ProfileCard = (props) => {
    const [inEditMode, setInEditMode] = useState(false);
    const [user, setUser] = useState({});
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const [editable, setEditable] = useState(false);
    const [newImage, setNewImage] = useState();
    const [validationError, setValidationError] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [settingsMode, setSettingsMode] = useState(false);

    const dispatch = useDispatch();

    const { username: loggedInUsername } = useSelector((store) => ({ username: store.username }));
    const { username, displayName, image } = user;
    const { displayName: displayNameError, image: imageError } = validationError;


    const { t } = useTranslation();
    const history = useHistory();

    const routParams = useParams();
    const pathUsername = routParams.username;

    const pendingApiCall = useApiProgress('put', `/api/1.0/users/${username}`);
    const pendingApiCallDeleteProfile = useApiProgress('delete', `/api/1.0/users/${username}`);

    const onClickSave = async () => {
        let image = undefined;
        if (newImage) {
            image = newImage.split(',')[1];
        }
        const body = {
            displayName: updatedDisplayName,
            image: image
        }

        try {
            const response = await updateUser(username, body);
            setInEditMode(false);
            setUser(response.data);
            dispatch(updateSuccess(response.data));
        } catch (error) {
            setValidationError(error.response.data.validationError);
        }
    };

    const onChangeFile = (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    };

    const onClickCancel = () => {
        setModalVisible(false);
    };

    const onClickDeleteUser = async () => {
        await deleteProfile(username);
        await dispatch(deleteProfileSuccess());
        setModalVisible(false);
        history.push('/');
    };

    useEffect(() => {
        setValidationError(previousValidationError => ({ ...previousValidationError, displayName: undefined }));
    }, [updatedDisplayName]);

    useEffect(() => {
        setValidationError(previousValidationError => ({ ...previousValidationError, image: undefined }));
    }, [newImage]);

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    useEffect(() => {
        setEditable(pathUsername === loggedInUsername);
    }, [pathUsername, loggedInUsername]);

    useEffect(() => {
        if (!inEditMode) {
            setUpdatedDisplayName(undefined);
            setNewImage(undefined);
        } else {
            setUpdatedDisplayName(displayName)
        }
    }, [inEditMode, displayName]);

    return (
        <div className='card text-center shadow'>
            <div className='card-header'>
                <ProfileImageWithDefaults
                    className='rounded-circle shadow'
                    width='200'
                    height='200'
                    alt={`${username} profile image`}
                    image={image}
                    tempimage={newImage} />
            </div>
            <div className='card-body'>
                {!inEditMode && !settingsMode && (
                    <>
                        <div className='card mb-3'>
                            <h3 className='display-6'>{displayName}</h3>
                            <h3 className='display-6 fst-italic fs-4'>@{username}</h3>
                        </div>
                        {editable && (
                            <>
                                <div className='btn-group-vertical'>
                                    <button className='btn btn-success d-inline-flex mb-2 justify-content-center' onClick={() => setInEditMode(true)} >
                                        <i className='material-icons' >edit</i>
                                        {t('editProfile')}
                                    </button>
                                    <button className='btn btn-dark d-inline-flex mb-2 justify-content-center' onClick={() => setSettingsMode(true)}>
                                        <i className='material-icons' >settings</i>
                                        {t('settings')}
                                    </button>
                                    <button className='btn btn-danger d-inline-flex justify-content-center' onClick={() => setModalVisible(true)} >
                                        <i className='material-icons' >delete</i>
                                        {t('deleteProfile')}
                                    </button>
                                </div>
                                <Modal
                                    visible={modalVisible}
                                    onClickCancel={onClickCancel}
                                    onClickOk={onClickDeleteUser}
                                    pendingApiCall={pendingApiCallDeleteProfile}
                                    message={t('modalDeleteAccountParagraph')}
                                />
                            </>
                        )}
                    </>
                )}

                {inEditMode && (
                    <div>
                        <Input
                            label={t('changeDisplayName')}
                            defaultValue={displayName}
                            onChange={(event) => { setUpdatedDisplayName(event.target.value) }}
                            error={displayNameError} />
                        <Input type='file' onChange={onChangeFile} error={imageError} />
                        <div>
                            <ButtonWithProgress
                                className='btn btn-success d-inline-flex mx-1'
                                onClick={onClickSave}
                                disabled={pendingApiCall}
                                pendingApiCall={pendingApiCall}
                                text={<><i className='material-icons' >save</i>{t('save')}</>}
                            />
                            <button className='btn btn-danger d-inline-flex ms-1' onClick={() => setInEditMode(false)} disabled={pendingApiCall}>
                                <i className='material-icons' >close</i>{t('cancel')}
                            </button>
                        </div>
                    </div>
                )}

                {settingsMode && (
                    <div>
                        <LanguageSelector />
                        <button className='btn btn-dark d-inline-flex ms-1 mt-4' onClick={() => setSettingsMode(false)}>
                            <i className='material-icons' >arrow_back_ios</i>{t('back')}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileCard;