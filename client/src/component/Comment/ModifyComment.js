import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { modifyComment } from '../../_actions/comment_action'
import styled from 'styled-components'
const Button = styled.button`
    border: none;
    border-radius: 7px;
    background-color: ${(props) =>{ 
            return props.theme.color.navy
        }
    }};
    color:${(props) => props.theme.color.white};
    padding: 4px 8px;
    font-size: ${(props) => props.theme.fontSizes.small};
    text-align: center;
    cursor: pointer;
    margin: 1px;
    position: relative;
    bottom: 5px;
    left: 10px;
`

const StyledTextarea = styled.textarea`
    height: ${(props) => props.theme.areaSize.height};
    width: ${(props) => props.theme.areaSize.width};
    resize: none;
`


function ModifyComment({index, render}) {
    // console.log(location.state)
    // console.log(params.postId)
    const state = useSelector((state) => state);
    // console.log(state)
    // console.log(state.comment.view_comment.commentData[index]._id)

    const [Text, setText] = useState(state.comment.view_comment.commentData[index].text)


    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const body = {
            _id: state.comment.view_comment.commentData[index]._id,
            text: Text
        }
        
        dispatch(modifyComment(body))
            .then(res => {
                render('change')
            }
        )
    
    }

    const onTextHandler = (event) => {
        setText(event.target.value)
    }
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <br></br>
                <StyledTextarea value={Text} onChange={onTextHandler}/>
                <Button>수정</Button>
            </form>
        </div>
    )
}

export default ModifyComment