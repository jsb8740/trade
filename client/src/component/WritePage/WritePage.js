import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {write, uploadFile} from '../../_actions/post_action'

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
`

const StyledInput = styled.input`
    background-color: white;
    border-radius: 10px;
    border:2px solid ${(props) => props.theme.color.navy};
    outline: none;
`
const StyledTextarea = styled.textarea`
    height: ${(props) => props.theme.areaSize.height};
    width: ${(props) => props.theme.areaSize.width};
    resize: none;
`

function WritePage({ userId }) {
    //auth에서 userId를 보낸거임
    console.log(userId)
    //React.StrictMode 때문에 2번씩 콘솔에 찍힘
    const [Title, setTitle] = useState("");
    const [Desc, setDesc] = useState("");
    const [Price, setPrice] = useState("");
    const [File, setFile] = useState("");

    const onTitleHandler = (event) => {
        setTitle(event.target.value);
    }
    const onDescHandler = (event) => {
        setDesc(event.target.value);
    }
    const onPriceeHandler = (event) => {
        setPrice(event.target.value);
    }
    const onFileHandler = (event) => {
        // if(event.target.files.length > 1) {
        //     event.preventDefault();
        //     console.log('1')
        //     alert('Cannot upload files more than 7');
        
        //     return;
        // };
        // console.log(event.target.files);
        setFile(event.target.files);
        // console.log(File);
    }

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {    //body가 query로감
            title: Title,
            description: Desc,
            price: Price,
            writer: userId,
        }
        
        dispatch(write(body)).then(response => {
            //이부분은 body에 fileId가없어서 save는 안하고 데이터만 옴
            // console.log(response)
            // console.log(File)

            let formData = new FormData();
            // console.log(File)
            for(var i=0; i<File.length; i++) {  //이부분은 서버의 req.files로 
                formData.append('files', File[i])
            }

            // 이 부분들은 req.body로 간다 <-- text가 있는경우에 body로 감
            formData.append('writer', userId)
            formData.append('postId', response.payload.post._id)

            dispatch(uploadFile(formData)).then(response => {
                console.log(response)
                
                var tmpArr =[]; //이미지 파일 arr
                for(var i=0; i<response.payload.files.length; i++){
                    tmpArr.push(response.payload.files[i]._id)
                }
                // body.fileId = response.payload.files[0]._id;

                body.fileId = tmpArr;
                
                dispatch(write(body)).then(response => {
                    console.log(response)
                    if(response.payload.writeSuccess) {     //write가 성공하면
                        navigate('/posts')
                    } else {
                        alert('글쓰기에 실패')
                    }
                })//여기서 db에 save함
                
            })
        })
    }
    
    return <div style={{
        display:'flex', justifyContent:'center', alignItems:'center'
        , width:'100%', height:'100vh'
    }}>
        {/* multer는 (multipart/form-data)가 아닌 폼에서는 동작하지 않는다 */}
        <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler} encType='multipart/form-data'>
            <label>제목</label>
            <StyledInput type='text' value={Title} onChange={onTitleHandler}/>
            <label>내용</label>
            <StyledTextarea value={Desc} onChange={onDescHandler}/>
            <label>가격</label>
            <StyledInput type='number' value={Price} onChange={onPriceeHandler}/>

            <br/>

            <label>이미지</label>
            <StyledInput type='file'accept='.jpg, .jpeg, .png, .gif'
                onChange={onFileHandler} multiple/>

            <br/>
            <br/>
            <Button>글쓰기</Button>
        </form>
    </div>;
}

export default WritePage;
