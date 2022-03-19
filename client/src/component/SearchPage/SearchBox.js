import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { searchPost } from '../../_actions/post_action'
import styled from 'styled-components'

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
    position: relative;
    top: 2px;
`
const StyledInput = styled.input`
    background-color: white;
    border-radius: 10px;
    width:400px;
    height:30px;
    border:2px solid ${(props) =>{ 
        return props.theme.color.navy
    }};
    outline: none;
`

const Styledselect = styled.select`
    width: 100px;
    height: 34px;
    border-radius: 10px;
    border:2px solid ${(props) =>{ 
        return props.theme.color.navy
    }};
    outline: none;
`

function SearchBox() {
    const [keyWord, setkeyWord] = useState("")
    const [Selected, setSelected] = useState("title_content")
    const onSelectedeHandler = (event) => {
        setSelected(event.target.value)
    }

    const onTextHandler = (event) => {
        setkeyWord(event.target.value)
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmitHandler = (event) => {
        event.preventDefault();

        const params = { keyword: keyWord, search_type: Selected}
        
        dispatch(searchPost(createSearchParams(params))).then(res => {
            params.postslength = res.payload.posts.length
            // console.log(params)
            navigate({ pathname: `/posts/search/`, search:`?${createSearchParams(params)}`})
        })
        
    }
    
    return (
        <div style={{textAlign:'center'}}>
            <form onSubmit={onSubmitHandler}>
                <Styledselect onChange={onSelectedeHandler}>
                    <option value='title_content'>제목 + 내용</option>
                    <option value='title'>제목</option>
                </Styledselect>
                <StyledInput type='text' value={keyWord} onChange={onTextHandler} />
                <Button>검색</Button>
            </form>
            
        </div>
    )
}

export default SearchBox