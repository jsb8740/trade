import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const PostDiv = styled.div`
    display:gird;
    font-size:${(props)=> {
        if(props.type === 'createdAt') {
            return `${props.theme.fontSizes.small};`
        } else if(props.type === 'price') {
            return `${props.theme.fontSizes.base};`
        } else {
            return `${props.theme.fontSizes.lg};`
        }
    }};
    ${(props) => {
        if(props.type === 'createdAt') {
            return `color: ${props.theme.color.grey};`
        } else if(props.type === 'title') {
            return `font-weight: 600`;
        }
    }}
`
const Table = styled.div`
    width: 90%;
    height: 100%;
`

const Container  = styled.div`
    margin: 0 80px 0 80px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 20px;
    column-gap: 20px;
    justify-items: center;
    background-color: ${(props)=>props.theme.color.lightgrey};
    padding : 10px;
    padding-top: 50px;
    padding-bottom: 50px;
    border-radius: 10px;
`

function Post({posts}) {
    // console.log(posts)
    const url = `http://localhost:5000/images/`
    
    // console.log(state)

    const navigate = useNavigate();
    const goToPost = (post) => {
        // console.log(post)
        navigate(`/posts/view/${post._id}`, {state: post})
    }
    // console.log(posts)
    return (
        <div>
            <Container>
                    {
                        //자꾸 오류가 이미지파일을 찾을수 없다고 오류가 났었는데
                        //서버쪽에서 static으로 폴더에 공유할수있게 했어야했음
                        //app.use('/images', express.static('images'));이런식
                        posts.map((post, index) => (
                            <Table key={index}>
                                <a onClick={() => {goToPost(post)}} style={{cursor:'pointer'}}><img alt='없음' src={url+post.fileId[0].serverFilename} style={{ width:'100%', objectFit:'cover'}}/>
                                <PostDiv type='title'>{
                                    post.title.length > 22 ?
                                    `${post.title.slice(0,21)}. . . . . `
                                    :post.title
                                }</PostDiv></a>
                                <PostDiv type='price'>{post.price}원</PostDiv>
                                <PostDiv type='writer'>{post.writer.name}</PostDiv>
                                
                                <PostDiv type='createdAt'>{post.createdAt.slice(5, 10)}&nbsp;&nbsp;{post.createdAt.slice(11, 16) }</PostDiv>
                            </Table>
                        ))
                    }
            </Container>
            
        </div>
    )
}

export default Post