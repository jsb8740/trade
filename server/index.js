const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(cookieParser(
    {sameSite: "none"}
));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/images', express.static('images'));   //클라이언트에서 접근할수 있게함

app.use('/api/users', require('./routes/user'))
app.use('/api/post', require('./routes/post'))
app.use('/api/comment', require('./routes/comment'))

const config = require('./config/dev')
mongoose.connect(config.MongoURI, {
    useNewUrlParser: true
}).then(() => console.log('DB Connected!'));

app.listen(5000, function () {
    console.log('Example app listening on port 5000!');
});
