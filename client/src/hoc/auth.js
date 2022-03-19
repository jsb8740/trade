import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';


export default function(SpecificComponent, option, admindRoute=null) {

    const dispatch = useDispatch();


    function AuthenticationCheck() {
        const [userId, setuserId] = useState("false");
        const navigate = useNavigate();
        useEffect(() => {

            dispatch(auth()).then(response => {
                // console.log(response)

                //로그아웃상태
                if(response.payload.isAuth === false) {
                    if(option === true) { //로그인이필요한 페이지 이동할때
                        navigate('/login')
                    }

                } else { //로그인상태
                    if(admindRoute === true && response.payload.isAdmin) {
                        navigate('/')
                    } else { //로그아웃한 유저만 들어가는 페이지 이동할때
                        if(option === false) {
                            navigate('/')
                        }
                    }
                }


                if(response.payload._id) {  //_id가 존재하면 그러니깐 로그인 상태이면
                    setuserId(response.payload._id)
                }
            })
        }, []);
        return userId === "false"
            ?<SpecificComponent />:
            <SpecificComponent userId={userId}/>;
    }


    return AuthenticationCheck;
}
