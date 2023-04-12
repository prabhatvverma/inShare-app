const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3000

const connectDb = require("./config/config")
connectDb();

//cors
// const corsOptions = {
//     origin: process.env.ALLOWED_CLINTS.split(',')

// }
// app.use(cors(corsOptions));

//Templet Engine

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'pug');

//Set static path

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
/**---------------------------------------Routes ------------------------------- */
// const fileRouter = require("./routes/files")
// app.use('/api/files', fileRouter);

// const downloadRouter = require("./routes/downloadFile")
// app.use('/files', downloadRouter);


//alternate
app.use('/api/files', require('./routes/uploadFile'));
app.use('/files', require("./routes/showFile"));
app.use('/home', require('./routes/home'))
app.use('/files/download', require('./routes/downloadFile'))



app.listen(PORT, () => {
    console.log("connected");
})