import React from 'react';
import { useEffect } from 'react';

const CommentViewItem = (props) => {

    useEffect(() => {

    });

    return ( 
        <div className='container d-flex mt-3'>
            {/* COMMENT AUTHOR DETAILS */}
            <div className='col-2 card text-center pt-3'></div>

            {/* COMMENT DETAILS */}
            <div className='col-9 card ms-3'></div>
        </div>
     );
}
 
export default CommentViewItem;