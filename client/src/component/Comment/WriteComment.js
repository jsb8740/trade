import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { writeComment } from '../../_actions/comment_action';
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


function WriteComment({ parent, render }) {
    const params = useParams();

    const [Text, setText] = useState("")

    const state = useSelector((state) => state);
    // console.log(state)
    
    const dispatch = useDispatch();
    const onSubmitHandler = (event) => {
        event.preventDefault();


        const body = {
            writer: state.user.userData._id,
            postId: params.postId,
            text: Text
        }

        if(parent) {    //parent가있으면
            body.parentComment = parent
        }

        dispatch(writeComment(body)).then(res => {
            if(res.payload.commentSave) {
                setText('')
                if(render) {
                    render('change')
                }
            }
        })
    }

    const onTextHandler = (event) => {
        setText(event.target.value)
    }
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <br></br>
                <StyledTextarea value={Text} onChange={onTextHandler}/>
                <Button>등록</Button>
            </form>
            
        </div>
    )
}

export default WriteComment
