import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import path from "path";
import homeRouter from "./routes/home.route";
import productrouter from "./routes/product.router";
import signuprouter from "./routes/auth.route";
import loginrouter from './routes/login.route';
import cartrouter from './routes/cart.route';
import orderrouter from './routes/order.route'
import flash from "connect-flash"


import bodyParser from "body-parser";

import session from "express-session";
import connectmongoDBsession from "connect-mongodb-session";

const mongoDBstore = connectmongoDBsession(session);

const STORE = new mongoDBstore({
    uri: "mongodb://localhost:27017/online-shop",
    collection: "Session",
    });

const app = express();

app.use(session({
    secret : "this is my secret way to hash express session .. ",
    saveUninitialized : false,
    store: STORE
}));

app.use(express.static(path.join(__dirname , "assets")));
app.use(express.static(path.join(__dirname , "images")));
app.use(flash());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine' ,'ejs');
app.set('views' , 'views');


app.use('/' , homeRouter)
app.use('/product' ,productrouter )
app.use('/signup' ,signuprouter )
app.use('/login' ,loginrouter )
app.use('/cart' ,cartrouter )
app.use('/orders',orderrouter)


app.listen(process.env.PORT || 3000 , () => {
    console.log("server is listening on port" , process.env.PORT || 3000)
});