import React from 'react';
import { useTranslation } from 'react-i18next';
import { useClock } from 'react-use-clock';

const ClockComponent = () => {

    const clock = useClock();
    const { t } = useTranslation();

    return (
        <div className='text-center'>
            <div className='card'>
                <h1 className='display-6'>{t('clock')}</h1>
                <strong className='display-5'>
                    {clock.hours.toString().padStart(2, '0')}:
                    {clock.minutes.toString().padStart(2, '0')}:
                    {clock.seconds.toString().padStart(2, '0')}
                </strong>
                <div
                    style={{
                        '--hours': `${clock.hours}`,
                        '--minutes': `${clock.minutes}`,
                        '--seconds': `${clock.seconds}`,
                    }}
                />
            </div>
        </div>
    );
}

export default ClockComponent;