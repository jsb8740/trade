## 거래게시판 ##

기존에 만들었던 게시판의 v2          
댓글기능과 이미지를 추가했음          
react router dom을 5에서 6으로 올렸음 




## 사용한 기술 ##

react, redux, nodejs-express, mongoose, styled-components




## 파일구조 ##
```
client
📦src
 ┣ 📂component
 ┃ ┣ 📂Comment
 ┃ ┃ ┣ 📜ModifyComment.js
 ┃ ┃ ┣ 📜ViewComment.js
 ┃ ┃ ┗ 📜WriteComment.js
 ┃ ┣ 📂LandingPage
 ┃ ┃ ┣ 📂Board
 ┃ ┃ ┃ ┣ 📜Board.js
 ┃ ┃ ┃ ┣ 📜Pagination.js
 ┃ ┃ ┃ ┣ 📜Post.js
 ┃ ┃ ┃ ┗ 📜ViewPost.js
 ┃ ┃ ┗ 📜LandingPage.js
 ┃ ┣ 📂LoginPage
 ┃ ┃ ┗ 📜LoginPage.js
 ┃ ┣ 📂ModifyPage
 ┃ ┃ ┗ 📜ModifyPost.js
 ┃ ┣ 📂RegisterPage
 ┃ ┃ ┗ 📜RegisterPage.js
 ┃ ┣ 📂SearchPage
 ┃ ┃ ┣ 📜SearchBox.js
 ┃ ┃ ┗ 📜SearchPage.js
 ┃ ┗ 📂WritePage
 ┃ ┃ ┗ 📜WritePage.js
 ┣ 📂hoc
 ┃ ┗ 📜auth.js
 ┣ 📂styled
 ┃ ┗ 📜theme.js
 ┣ 📂_actions
 ┃ ┣ 📜comment_action.js
 ┃ ┣ 📜post_action.js
 ┃ ┣ 📜types.js
 ┃ ┗ 📜user_action.js
 ┣ 📂_reducers
 ┃ ┣ 📜comment_reducer.js
 ┃ ┣ 📜index.js
 ┃ ┣ 📜post_reducer.js
 ┃ ┗ 📜user_reducer.js
 ┣ 📜App.js
 ┣ 📜index.css
 ┣ 📜index.js
 ┗ 📜setupProxy.js

📦server
 ┣ 📂config
 ┃ ┗ 📜dev.js
 ┣ 📂images
 ┣ 📂middleware
 ┃ ┗ 📜auth.js
 ┣ 📂models
 ┃ ┣ 📜Comment.js
 ┃ ┣ 📜File.js
 ┃ ┣ 📜Post.js
 ┃ ┗ 📜User.js
 ┣ 📂routes
 ┃ ┣ 📜comment.js
 ┃ ┣ 📜post.js
 ┃ ┗ 📜user.js
 ┣ 📜.gitignore
 ┣ 📜index.js
```

## 문제가 된곳 ##

```javascript
router.post('/deletePost', SeverimgDelete, dbImgDelete, (req, res) => {
    // console.log(req.body)
    const filter = {_id: req.body.postId}
    Post.deleteOne(filter, function(err) {
        if(err) return res.status(400).json({postDelete:false, err})

        return res.status(200).json({postDelete: true})
    }) 
})
```
이 부분은 post를 삭제하고 서버의 이미지를 삭제하고 그다음에 db의 이미지를 삭제하는 것인데
db의 이미지를 삭제하는 부분에서 자꾸만 에러가 났다. db에서 찾을수 없다고 나오는 

```javascript
const dbImgDelete = (req, res, next) => {
    console.log(req.body)
    for(var i=0; i<req.body.delete_filesId.length; i++) {
        const filter = {_id: req.body.delete_filesId[i]}
        //console.log(filter)
        File.findOneAndUpdate(filter, {isDeleted: true}, function(err) {
            if(err) return res.status(400).json({imgDelete:false, err})
        })
    }
    
    next()
}
```
새로운 db에 imgDelete를 추가해서 해결


## 이미지 ##
메인화면<br>
![image](https://user-images.githubusercontent.com/84906961/159139513-193ad0e3-3f3a-4c45-b543-f0100c7a8563.png)

---

게시글에 들어갔을 때<br>
![캡처](https://user-images.githubusercontent.com/84906961/159139478-dc723229-0a17-44e4-924a-f67a66d69a50.PNG)

---

글을 쓸때<br>
![image](https://user-images.githubusercontent.com/84906961/159139565-47242b3a-b265-425f-87b1-488d3b6c8c81.png)

---

쓰고 난뒤<br>
![image](https://user-images.githubusercontent.com/84906961/159139576-c5cc2937-8e1f-4ac9-b87b-607232bcf3b3.png)

---

글을 수정<br>
![image](https://user-images.githubusercontent.com/84906961/159139622-fa13c664-97e1-4d08-ae67-261f883c94a1.png)

---

수정하고 난뒤<br>
![image](https://user-images.githubusercontent.com/84906961/159139644-3ed2d0ad-c594-4746-94f9-75344dcd629c.png)

---

글을 삭제<br>
![image](https://user-images.githubusercontent.com/84906961/159139719-8d4c3536-ed76-4c46-90aa-543bdff779ea.png)

---

댓글 달기<br>
![image](https://user-images.githubusercontent.com/84906961/159139739-2701fca1-69cb-460a-b9ab-73151701e290.png)
![image](https://user-images.githubusercontent.com/84906961/159139750-3ac42e88-948b-4dca-b644-c70aadda62cc.png)

---

댓글 수정<br>
![image](https://user-images.githubusercontent.com/84906961/159139775-2e083d1c-636b-49ff-aff5-81687fb7112c.png)
![image](https://user-images.githubusercontent.com/84906961/159139784-91d285aa-5cd3-4682-9a1a-dcc848fa2a2a.png)

---

대댓글 달기<br>
![image](https://user-images.githubusercontent.com/84906961/159139810-48370ef5-90b6-4357-9b05-727a68c44117.png)
![image](https://user-images.githubusercontent.com/84906961/159139829-1c951dfa-6b74-434b-a688-98a7218c878e.png)
![image](https://user-images.githubusercontent.com/84906961/159139830-4e1091a0-9d0c-436c-833f-754347540c09.png)

---

댓글 삭제<br>
![image](https://user-images.githubusercontent.com/84906961/159139834-632b28e2-ea0d-451b-b017-1a9b96240cd5.png)
![image](https://user-images.githubusercontent.com/84906961/159139836-1edb2837-99ce-4969-9b66-aa26b74440e0.png)

---






