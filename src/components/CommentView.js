import React, { useEffect, useState } from 'react';
import { getCommentsByPost } from '../api/apiCalls';
import { useParams } from 'react-router-dom';
import { useApiProgress } from '../shared/ApiProgress';
import CommentViewItem from './CommentViewItem';
import Spinner from '../components/Spinner';

const CommentView = (props) => {

    const [page, setPage] = useState({
        content: [],
        size: 5,
        number: 0
    });

    const { content: comments } = page;

    //GET POST COMMET
    const getPostComment = async (page) => {
        try {
            const response = await getCommentsByPost(props.id, page);
            setPage(response.data);
        } catch (error) { }

    };

    useEffect(() => {
        let looper = setInterval(getPostComment, 2000);

        return function cleanUp() {
            clearInterval(looper);
        }
    }, []);

    return (
        <>

            {comments.map((comment) => (
                <CommentViewItem comment={comment} key={comment.id} getPostCommet={getPostComment} />
            ))
            }

        </>
    );
}

export default CommentView;