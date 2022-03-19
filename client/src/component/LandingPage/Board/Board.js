import React, { Fragment, useEffect, useState } from 'react'
import Pagination from './Pagination';
import Post from './Post';
import {getPost, searchPost} from '../../../_actions/post_action'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import SearchBox from '../../SearchPage/SearchBox';
import axios from 'axios';

const Center = styled.div`
    
    display: grid;
    justify-items: center;justify-items: center;
    min-height: 100vh;
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
const StyledDiv = styled.div`
    height: 400px;
    width: 85%;
`
const LogoutDiv = styled(StyledDiv)`
    height: 50px;
    width: 85%;
`



function Board({params, userId}) {
    const [Skip, setSkip] = useState(0)
    const Limit = 8;// 한페이지에 post 몇개 나오게할건지

    const [CurrentPage, setCurrentPage] = useState(1);
    const [Posts, setPosts] = useState([])

    const dispatch = useDispatch()
    const navigate=useNavigate()
    // console.log(params)
    useEffect(() => {
        const body = {
            skip: Skip,
            limit: Limit
        }
        if(params) {
            searchPostData(body);
        } else {
            getPostData(body);
        }
        
    
    
    }, [CurrentPage, Skip, Limit, params])

    const logoutkHandler = async () => {
        const request = await axios.get('/api/users/logout');
        console.log(request.data)
        if(request.data.logoutSuccess === false) {
            alert('failed to logout')
        } else {
            navigate('/posts')
        }
        
    }
    const searchPostData = () => {
        const body = {
            keyword: params.keyword,
            search_type: params.search_type,
            skip: Skip,
            limit: Limit
        }
        

        dispatch(searchPost(body))
            .then(res => {
                setPosts(res.payload.posts)
            })
    }
    
    const getPostData = (body) => {
        // axios.post('/api/post/getPosts', body).then(
        //     res => console.log(res.data)
        // )
        dispatch(getPost(body))
            .then(res => {
                // console.log(res.payload.posts)
                setPosts(res.payload.posts)
            })
    }
    const onPageChange = (pageNum) => {
        setCurrentPage(pageNum)
        setSkip((pageNum - 1) * Limit)
        //2페이지를 눌럿으면 스킵이 3이 되어야함 3번째 post부터 가져와야하기때문에
    }
    
    // console.log(userId)

    const Loginbtn = () => {
        return (
            userId ?
            <Fragment>
                <Link to='/posts'><Button>전체글</Button></Link>
                <Link to='/posts/write'><Button>글쓰기</Button></Link>
                <Button onClick={logoutkHandler}>로그아웃</Button>
            </Fragment>
            
            :<Link to='/posts'><Button>전체글</Button></Link>
        )
    }
    const Logoutbtn =() => {
        return (
            userId ?
            null
            :<Fragment>
                <Link to='/users/login'><Button>로그인</Button></Link>
                <Link to='/users/register'><Button>회원가입</Button></Link>
            </Fragment>
        )
    }
    return (
        <Center>
            <LogoutDiv>
                {
                    Logoutbtn()
                }
            </LogoutDiv>
            
            {/* params는 searchbox.js 에서 출발한거 */}
            <Post posts={Posts}/>
            
            <StyledDiv>
                {
                    Loginbtn()
                }
                <Pagination currentPage={CurrentPage} onPageChange={onPageChange} limit={Limit} params={params}/>
                
                <SearchBox />
            </StyledDiv>
        </Center>
        
    )
}
export default Board