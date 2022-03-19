import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { deletePost } from '../../../_actions/post_action';
import styled from 'styled-components'
import ViewComment from '../../Comment/ViewComment'

const PostDiv = styled.div`
    padding: 3px;

    ${(props) => {
        switch(props.type) {
            case 'title' :
                return `font-size:${props.theme.fontSizes.xxxl}; font-weight: 600;`
            case 'price' :
                return `font-size:${props.theme.fontSizes.xl};`
            case 'writer' :
                return `font-size:${props.theme.fontSizes.lg};`
            case 'createdAt' :
                return `font-size:${props.theme.fontSizes.small}; color: ${props.theme.color.grey};`
            case 'description' :
                return `font-size:${props.theme.fontSizes.base}; padding: 20px; padding-top:40px;`
        }
    }}
`
const Container  = styled.div`
    margin: 80px;
    display: flex;
    flex-direction:column;
    justify-items: center;
    background-color: ${(props)=>props.theme.color.lightgrey};
    padding : 10px;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 10px;
`

const Hr = styled.div`
    border-bottom: 1px solid ${(props)=>props.theme.color.navy};
    padding-bottom: 10px;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    border-radius: 7px;
    background-color: ${(props) =>{ 
            return props.theme.color.navy
        }
    }};
    color:${(props) => props.theme.color.white};
    padding: 8px 16px;
    font-size: ${(props) => props.theme.fontSizes.base};
    text-align: center;
    cursor: pointer;
    margin: 5px;
`
const DeleteButton = styled(Button)`
    background-color: ${(props) =>{ 
        return props.theme.color.red
    }};
`

function ViewPost({userId,}) {
    const location = useLocation();
    const url = `http://localhost:5000/images/`

    
    // const userId = state.user.userData
    const navigate = useNavigate();
    const goToList = () => {
        navigate('/posts')
    }
    // console.log(state)
    console.log(location.state)
    // console.log(location.state.writer._id)
    const goToModify = () => {
        navigate(`/posts/modify/${location.state._id}`, {state: location.state})
    }

    const dispatch = useDispatch()
    const goToDelete = () => {


        let tmpArr = [];
        for(var i=0; i<location.state.fileId.length; i++){
            tmpArr.push(location.state.fileId[i]._id)
        }
        const body = {
            postId: location.state._id,
            delete_filesId: tmpArr
        }
        // console.log(body)
        dispatch(deletePost(body)).then(response => {
            if(response.payload.postDelete) {   //post가 삭제가 성공했으면
                navigate('/posts');
            } else {
                alert('삭제 실패했습니다')
            }
        })
    }
    // console.log(location.state)
    return (
        <Container>
            <PostDiv type='title'>{location.state.title}</PostDiv>
            <PostDiv type='price'>{location.state.price}원</PostDiv>
            
            <PostDiv type='writer'>{location.state.writer.name}</PostDiv>
            <PostDiv type='createdAt'>{location.state.createdAt.slice(0, 10)}&nbsp;&nbsp;{location.state.createdAt.slice(11, 16) }</PostDiv>
            <Hr />

            
            {
                location.state.fileId.map((file, index) => (
                    <img key={index} src={url+file.serverFilename} alt='failed' style={{maxWidth:'65%', height:'auto'}} />
                    
                ))
            }
            <PostDiv type='description'>{location.state.description}</PostDiv>
            
            {
                userId
                ?
                    userId === location.state.writer._id
                    ?
                    <div>
                        <Button onClick={() => goToList()}>전체글</Button>
                        <Button onClick={() => goToModify()}>수정</Button>
                        <DeleteButton onClick={() => goToDelete()}>삭제</DeleteButton>
                    </div>
                    : null
                : <div><Button onClick={() => goToList()}>전체글</Button></div>
            }


            <Hr />
            <ViewComment userId={userId} />
        </Container>
    )
}

export default ViewPost