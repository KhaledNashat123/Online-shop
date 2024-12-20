import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import path from "path";
import homeRouter from "./routes/home.route";
import productrouter from "./routes/product.router";
import signuprouter from "./routes/auth.route";
import bodyParser from "body-parser";


const app = express();
app.use(express.static(path.join(__dirname , "assets")));
app.use(express.static(path.join(__dirname , "images")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine' ,'ejs');
app.set('views' , 'views');


app.use('/' , homeRouter)
app.use('/product' ,productrouter )
app.use('/signup' ,signuprouter )


app.listen(process.env.PORT || 3000 , () => {
    console.log("server is listening on port " , process.env.PORT || 3000)
});