import React, { useState } from 'react';

const TestPage = () => {
    const [count, setCount] = useState(0);

    const onClick = () => {
        setCount(count+1);
    };

    const onClick2 = () => {
        setCount(count-1);
    };

    return ( 
        <div>
            <div className='text-center'>
                <h1>{count}</h1>
                <button onClick={onClick}>Yükselt</button>
                <button onClick={onClick2}>Azalt</button>
            </div>
        </div>
     );
}
 
export default TestPage;