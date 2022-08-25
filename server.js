const express=require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')
const bodyParser = require('body-parser')
const path=require('path')
var session = require('express-session')

//connect to database
const connectDB=require('./server/database/connection')

const app=express();

dotenv.config({path:'config.env'})
const PORT=process.env.PORT || 8080;

app.use(express.static("assets"))

//log request
app.use(morgan('tiny'))

//mongodb connection
connectDB()

//parse request to body-parser
app.use(bodyParser.urlencoded({ extended:true}))
app.use(express.json())

// clear the browser
app.use((req, res, next) => {
    if (!req.user) {
      res.header("cache-control", "private,no-cache,no-store,mustrevalidate");
      res.header("Express", "-3");
    }
    next();
  });


//set view engine
app.set('view engine', 'ejs')
// app.set('views', path.resolve(__dirname, 'views/ejs')); 


// load assets(public)
// app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
// app.use('/images',express.static(path.resolve(__dirname,'assets/images')))
// app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

// session
app.use(
    session({
      secret: "key", //to create a secreat key
      saveUninitialized: true,
      cookie: { maxAge: 600000 },
      resave: false,
    })
  );

//loading router
app.use('/',require('./server/routers/router'))

app.listen(PORT,()=>{
    console.log(`Server is running port no:${PORT}`);
})