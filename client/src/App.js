import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import LandingPage from "./component/LandingPage/LandingPage";
import LoginPage from "./component/LoginPage/LoginPage";
import RegisterPage from "./component/RegisterPage/RegisterPage";

import Auth from "./hoc/auth";
import WritePage from "./component/WritePage/WritePage";
import ViewPost from "./component/LandingPage/Board/ViewPost";
import ModifyPost from "./component/ModifyPage/ModifyPost";
import SearchPage from "./component/SearchPage/SearchPage";
import { ThemeProvider } from "styled-components";
import theme from "./styled/theme";


//null 이면 아무나
//true이면 로그인한 유저만
//false면 로그아웃한 유저만

function App() {
  const AuthLandingPage = Auth(LandingPage, null)
  const AuthLoginPagee = Auth(LoginPage, false)
  const AuthRegisterPage = Auth(RegisterPage, false)
  const AuthWritePage = Auth(WritePage, true)
  const AuthViwePost = Auth(ViewPost, null)
  const AuthModifyPost = Auth(ModifyPost, true)
  const AuthSearchPage = Auth(SearchPage, null)
  
  
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/*" element={<AuthLandingPage/>} />
            <Route path='/posts/:page' element={<AuthLandingPage/>} />
            <Route path='/posts' element={<AuthLandingPage/>} />
            <Route path='/posts/search/' element={<AuthSearchPage/>} />
            <Route path='/posts/search/:page' element={<AuthSearchPage/>} />
            <Route path='/posts/view/:postId' element={<AuthViwePost/>} />
            <Route path='/posts/modify/:postId' element={<AuthModifyPost/>} />
            <Route path="/posts/write" element={<AuthWritePage/>} />
            <Route path="/users" >
              <Route path="register" element={<AuthRegisterPage/>}></Route>
              <Route path='login' element={<AuthLoginPagee/>}></Route>
            </Route>  
          </Routes>
        </Router>
      </ThemeProvider>
      {/* redux-thunk는 리덕스에서 비동기 작업을 처리 할 때 가장 많이 사용하는 미들웨어입니다. 
      이 미들웨어를 사용하면 액션 객체가 아닌 함수를 디스패치 할 수 있습니다. */}
    </div>
  );
}

export default App;