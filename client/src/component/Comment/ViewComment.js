import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteComment, getComments } from '../../_actions/comment_action';
import ModifyComment from './ModifyComment';
import WriteComment from './WriteComment';
import styled from 'styled-components'

const TextDiv = styled.div`
    ${(props) => {
        if(props.type === 'writer') {
            return `font-size:${props.theme.fontSizes.xl}; font-weight: 600; padding-bottom:7px;`
        } else if(props.type === 'createdAt') {
            return `font-size:${props.theme.fontSizes.small}; color: ${props.theme.color.grey};`
        } else {
            return `font-size:${props.theme.fontSizes.base};`
        }
    }}
`
const DeleteComment = styled(TextDiv)`
    color:${(props) => props.theme.color.grey};
`

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
`
const DeleteButton = styled(Button)`
    background-color: ${(props) =>{ 
        return props.theme.color.red
    }};
`
const Reply = styled.div`
    position: relative;
    left: 50px;
    
`


function ViewComment({userId}) {
    const params = useParams();

    const state = useSelector((state) => {return state});
    
    console.log(state)
    const dispatch = useDispatch();
    const [Comment, setComment] = useState([])  //comment 배열 담을 객체
    const [Clicked, setClicked] = useState(false)   //클릭한 상태인지 확인
    const [addComment, setaddComment] = useState([])  //내가 누른 댓글이 몇번째인지 저장하는 배열
    const [commentId, setcommentId] = useState('')// 대댓글을 위해서 상위 댓글 id저장
    const [check, setcheck] = useState('')  //수정 or 댓글쓰기 상태인지 확인
    const [comment_render, setcomment_render] = useState('')    //글을 쓰면 댓글 부분 다시 랜더링이 안되서 제어하기 위해서 사용
    const commentDiv = () => {
        return Comment.map((comment, index) => (

            comment.parentComment ?
            null
            :<div key={index}>
                
                <div>
                    {
                        comment.isDeleted === true ?
                        <DeleteComment type='delete'>삭제된 댓글입니다</DeleteComment>
                        :<Fragment>
                            <TextDiv type='writer'>{comment.writer.name}</TextDiv>
                            <TextDiv type='text'>{comment.text}</TextDiv>
                        </Fragment>
                        
                    }
                    <TextDiv type='createdAt'>{comment.createdAt.slice(0, 10) } {comment.createdAt.slice(11, 16) }</TextDiv>
                </div>


                {
                    comment.isDeleted === false ?
                        comment.writer._id === userId ?
                            <Fragment>
                                <Button onClick={() => clickHandler(index, 'add')}>답글</Button>
                                <Button onClick={() => clickHandler(index, 'modify')}>수정</Button>
                                <DeleteButton onClick={() => deleteClick(index)}>삭제</DeleteButton>
                            </Fragment>
                        :null
                    :null
                        
                }
                <br></br>
                
                    {//답글 누르면 밑에 writecomment 생김
                        
                        addComment.map((Clicked_comment) => (
                            Clicked_comment === index  ?
                                check==='add' ?
                                <WriteComment key={index} parent={commentId} render={setcomment_render}/>
                                :<ModifyComment key={index} index={Clicked_comment} render={setcomment_render}/>
                            
                            : null
                        ))
                    }
                    {
                        Comment.map((comment2, index2) => (
                            comment2.parentComment === comment._id?
                            <Reply key={index2}>
                                <br></br>
                                {
                                    comment2.isDeleted === true ?
                                    <DeleteComment type='delete'>삭제된 댓글입니다</DeleteComment>
                                    :<Fragment>
                                        <TextDiv type='writer'>{comment2.writer.name}</TextDiv>
                                        <TextDiv type='text'>{comment2.text}</TextDiv>
                                    </Fragment>
                                }

                                <TextDiv type='createdAt'>{comment2.createdAt.slice(0, 10) } {comment2.createdAt.slice(11, 16) }</TextDiv>
                                
                                {
                                    comment2.isDeleted === false ?
                                        comment2.writer._id === userId ?
                                        <Fragment>
                                            <Button onClick={() => clickHandler(index2, 'modify')}>수정</Button>
                                            <DeleteButton onClick={() => deleteClick(index2)}>삭제</DeleteButton>
                                        </Fragment>
                                        :null
                                    :null
                                }
                                <br></br>
                                <br></br>
                                {
                                    addComment.map((Clicked_comment) => (
                                        Clicked_comment === index2  ?
                                        <ModifyComment key={index2} index={Clicked_comment} render={setcomment_render}/>
                                        : null
                                    ))
                                }
                                
                            </Reply>
                            :null
                    ))}
                    
            </div>

        ))
    }


    useEffect(() => {
        
        const body = {
            postId: params.postId
        }
        dispatch(getComments(body))
            .then(res => {
                // console.log(res.payload.commentData)
                setComment(res.payload.commentData)
                
            })

        return () => {  //다 랜더링하고 끝날때 실행함
            setcomment_render('')
            
        }
    
    }, [dispatch, comment_render, params.postId ])

    const deleteClick = (index) => {
        console.log(index)
        if(window.confirm("댓글을 삭제하시겠습니까?")){
            console.log(state.comment.view_comment.commentData[index]._id)
            const body = {
                _id: state.comment.view_comment.commentData[index]._id
            }

            dispatch(deleteComment(body)).then(res => {setcomment_render('change')})
        }
    }

    const clickHandler = (index, checkMod) => {
        // console.log(index)

        if(Clicked === false) {
            if(checkMod === 'add') {
                setcheck('add')
            } else {
                setcheck('modify')
            }
            const tmparr = [];
            tmparr.push(index);
            // console.log(tmparr)
            setcommentId(state.comment.view_comment.commentData[index]._id)
            setaddComment(tmparr) //몇번째 댓글인지 배열에 넣음
            setClicked(true)
        } else {
            setcheck('')
            setcommentId('')
            setaddComment([]) //다시 누르면 댓글입력하는게 사리지고 배열도 초기화
            setClicked(false)
        }
    }
    return (

        <div>
            {
                state?
                <Fragment>
                    {commentDiv()}
                    <WriteComment render={setcomment_render}/>
                </Fragment>  
                :null
            }
        </div>
    )
}
export default ViewComment
