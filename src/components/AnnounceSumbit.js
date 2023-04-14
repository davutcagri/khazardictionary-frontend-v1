import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAnnounces, sendAnnounce } from '../api/apiCalls';
import Select from 'react-select';
import ButtonWithProgress from './ButtonWithProgress';

const AnnounceSumbit = (props) => {

    const [focused, setFocused] = useState(false);
    const [content, setContent] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const { t } = useTranslation();

    const { push } = props;

    const options = [
        { value: 'warning', label: 'Warning' },
        { value: 'danger', label: 'Danger' },
        { value: 'info', label: 'Info' },
        { value: 'success', label: 'Success' },
    ];

    let contentClassName = 'form-control mb-3';

    const onClickSend = async () => {

        try {

            const body = {
                type: selectedType,
                content: content
            }

            await sendAnnounce(body);
            setFocused(false);
            setContent('');
            setSelectedType('');
            push('/');

        } catch (error) { }

    };

    useEffect(() => {
        if (!focused) {
            setContent('');
            setSelectedType('');
        }
    }, [focused]);


    return (

        <div className='card'>

            <div className='card-body'>

                {/* CONTENT TEXT AREA */}
                {focused && <label>{t('announceContent')}</label>}
                <textarea
                    className={contentClassName}
                    onFocus={() => (setFocused(true))}
                    onChange={(event) => { setContent(event.target.value) }}
                    value={content}
                />

                {focused &&

                    <>

                        {/* TYPE */}
                        <label>{t('announceType')}</label>
                        <Select
                            onChange={(choice) => setSelectedType(choice.value)}
                            options={options}
                        />

                        <div className='flex-fill mt-3'>

                            {/* CANCEL BUTTON */}
                            <button className='btn btn-secondary d-flex float-end ms-2' onClick={() => { setFocused(false) }}>
                                <i className='material-icons'>close</i> {t('cancel')}
                            </button>

                            {/* SEND BUTTON */}
                            <ButtonWithProgress
                                className='btn btn-primary d-flex float-end'
                                icon='send'
                                text={t('sumbit')}
                                onClick={onClickSend}
                            />

                        </div>

                    </>
                }

            </div>

        </div>

    );
}

export default AnnounceSumbit;