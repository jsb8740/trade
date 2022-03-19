import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components'


const Styledli = styled.li`
    display: inline-block;
    color: black;
    padding: 8px 16px;
    border-radius: 5px;
    &:hover{
        background-color: ${(props)=>props.theme.color.navy};
        color: ${(props)=>props.theme.color.white};
    }

    ${(props) => {
        if(props.selected === 'selected') {
            return `background-color: ${props.theme.color.navy};
                color: ${props.theme.color.white};`
        } else {
            return `color: ${props.theme.color.navy};`
        }
    }}
`

const StyledUl = styled.ul`
    text-align: center;
    list-style:none;
`

function Pagination({currentPage, onPageChange, limit, params}) {

    const [totalPage, settotalPage] = useState(0)  //몇 페이지까지 있는지 저장하는 배열 ,전체 페이지말하는거
    const [Page, setPage] = useState([])  
    //1부터 totalpage까지의 수가 저장된 배열
    //ex) totalpage = 3이면 배열에 1,2,3저장

    const navigate = useNavigate();
    const goTolist =  (num) => {
        if(params) {
            
            navigate({ pathname: `/posts/search/${num}`, search:`?${createSearchParams(params)}`}, {replace:true})
        } else {
            navigate(`/posts/${num}`)
        }
        
        
    }
    
    useEffect(() => {
        async function pagination() {
            const response = await axios.get('/api/post/pagination')
            let length;
            if(params) {
                length = params.postslength;
            } else {
                length = response.data.postLength;
            }
            // console.log(response.data)
            

            const total = Math.ceil(length / limit);
            settotalPage(total);

            
            //페이지에 저장하기위한 임시배열
            const temArr = []
            for(var i=1; i<=total; i++) {
                temArr.push(i);
            } 
            setPage(temArr);
        }
        
        pagination()
    
    }, [params])
    

    return <div>
        <StyledUl>
            {
                Page.map(number => {
                    if(Page.length > 0) {

                        return (
                            <Styledli selected={currentPage === number 
                            ?'selected':
                            'noselected'}
                                key={number} onClick={() => {onPageChange(number);goTolist(number)}
                            }>
                                {number}
                            </Styledli>
                        )
                    }
                    
                })
            }
        </StyledUl>

    </div>;
}

export default Pagination;
