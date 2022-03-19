import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../../_actions/user_action';

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


function RegisterPage() {
    const [Id, setId] = useState("");
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch(); //생성한 action을 useDispatch를 통해 발생시킬 수 있다
    const navigate = useNavigate();

    const onIdHandler = (event) => {
        setId(event.target.value);
    }
    const onNameHandler = (event) => {
        setName(event.target.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.target.value);
    }   
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.target.value);
    }   

    
    const onSubmitHandler =(event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) { //비번이 다르면
            return alert('Password와 Confirm Password는 같아야 합니다');
        }

        let body = {
            id: Id,
            name:Name,
            password: Password,
        }

        dispatch(registerUser(body))
            .then(response => {
                console.log(response)
                if(response.payload.success === true) {
                    navigate('/');
                } else {
                    alert('failed to sign up');
                }
            })
    }
    return <div style={{
        display:'flex', justifyContent:'center', alignItems:'center'
        , width:'100%', height:'100vh'
    }}>
        <form style={{display:'flex', flexDirection:'column'}}
            onSubmit={onSubmitHandler}
        >
            <label>Id</label>
            <StyledInput type='text' value={Id} onChange={onIdHandler} />
            <label>Name</label>
            <StyledInput type='text' value={Name} onChange={onNameHandler} />
            <label>Password</label>
            <StyledInput type='password' value={Password} onChange={onPasswordHandler} />
            <label>Confirm Password</label>
            <StyledInput type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
            
            
            <br/>
            <Button>Sign Up</Button>
        </form>
    </div>;
}

export default RegisterPage;
