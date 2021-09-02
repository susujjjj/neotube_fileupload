import React, {useState} from 'react'
import Axios from 'axios'
import { useSelector } from 'react-redux';

function Comment(props) {

    const videoId = props.postId
    const user = useSelector(state => state.user);

    console.log(props.postId, "props.postId");

    const [ commentValue, setCommentValue ] =useState("")

    console.log(commentValue, "commentValue");

    const handleClick = (event) => {
        setCommentValue(event.currentTarget.value)
    }

        const onSubmit = (event) => {
            event.preventDefault();

            const variables = {
                content: commentValue,
                writer: user.userData._id,
                postId:  videoId    
            }

            Axios.post('/api/comment/saveComment', variables)
            .then (response => {
                if (response.data.success) {
                    console.log(response.data.result, "response.data.result");
                } else {
                    alert('커멘트를 저장하지 못했습니다.')
                }
            })
        };


    
    return (
        <div>
            <br />
            <p> Replies </p>
            <hr />
            {/* Comment Lists */}

            {/* Root Comment Form */}
            <form style={{display: "flex"}} onSubmit={onSubmit}>
                <textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해주세요"
                />
                <br/> 
                <button style={{width: '20%', height: '52px' }}>Submit</button>
            </form>
        </div>
    )
}

export default Comment
