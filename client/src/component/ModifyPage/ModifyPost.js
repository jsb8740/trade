import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { modifyPost, uploadFile } from '../../_actions/post_action';
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

function ModifyPost() {
    const location = useLocation();
    const navigate =useNavigate();
    console.log(location.state)
    const [Title, setTitle] = useState(location.state.title);
    const [Desc, setDesc] = useState(location.state.description);
    const [Price, setPrice] = useState(location.state.price);
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
        setFile(event.target.files);
    }

    const dispatch = useDispatch()
    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log(location.state)
        var tmpArr=[];
        for(var i=0; i<location.state.fileId.length; i++) {
            tmpArr.push(location.state.fileId[i]._id)
        }
        let body = {    //body가 query로감
            title: Title,
            description: Desc,
            price: Price,
            writer: location.state.writer._id,
            postId: location.state._id,
            delete_filesId: tmpArr
        }
        console.log(body.delete_filesId)
        let formData = new FormData();
        //사진부터 저장하고 db에 저장
        // dispatch(modifyPost(location.state))
        for(var j=0; j<File.length; j++) {  //이부분은 서버의 req.files로 
            formData.append('files', File[j])
        }

        // 이 부분들은 req.body로 간다 <-- text가 있는경우에 body로 감
        formData.append('writer', location.state.writer._id)
        formData.append('postId', location.state._id)
        
        //dispatch(modifyPost(body))
        dispatch(uploadFile(formData)).then(response => {
            console.log(response)
            if(response.payload.uploadSuccess) {
                var tmpArr =[]; //이미지 파일 arr
                for(var i=0; i<response.payload.files.length; i++){
                    tmpArr.push(response.payload.files[i]._id)
                }
                
                body.fileId = tmpArr;
                dispatch(modifyPost(body)).then(res => {
                    if(res.payload.success) {
                        navigate(`/posts`)
                    }
                    // console.log(res)
                })

            } else {
                alert('사진 업로드 오류')
            }
        })
    }


    return (
        <div style={{
            display:'flex', justifyContent:'center', alignItems:'center'
            , width:'100%', height:'100vh'
        }}>
            {/* multer는 (multipart/form-data)가 아닌 폼에서는 동작하지 않는다 */}
            <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler} encType='multipart/form-data'>
                <label>제목</label>
                <StyledInput type='text' value={Title} onChange={onTitleHandler}/>
                <label>내용</label>
                <textarea value={Desc} onChange={onDescHandler}/>
                <label>가격</label>
                <StyledInput type='number' value={Price} onChange={onPriceeHandler}/>
    
                <br/>
    
                <label>이미지</label>
                <StyledInput type='file'accept='.jpg, .jpeg, .png, .gif' onChange={onFileHandler} multiple/>
    
                <br/>
                <br/>
                <Button>수정</Button>
            </form>
        </div>
    )
}

export default ModifyPost